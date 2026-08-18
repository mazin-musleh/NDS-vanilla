/* NDS.CooldownButton — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.CooldownButton.init()        wire every .nds-cooldown, now and later
 *   NDS.CooldownButton.start(btn, opts?)  begin the cycle by hand
 *                                    opts.seconds  run this long instead of data-cooldown
 *                                    opts.silent   skip nds:cooldown:triggered
 *   NDS.CooldownButton.reset(btn)    end it early and restore the button
 * Events (bubble from the button):
 *   nds:cooldown:triggered   the countdown starts — issue your request here
 *   nds:cooldown:tick        detail {remaining} — once a second during the countdown
 *   nds:cooldown:end         the countdown finished, or reset() was called
 * Hooks (on the .nds-cooldown button):
 *   data-cooldown           seconds — REQUIRED, unless start() passes opts.seconds
 *   data-cooldown-label     countdown text; every {s} becomes the remaining seconds
 *   data-resend-label       the label to restore from the second cycle on
 * Gotchas:
 *   - data-cooldown is read ONCE, when the button is wired, and cached. Editing it
 *     later has no effect. The label attributes are re-read every cycle.
 *   - The button needs a <span class="nds-label"> for the countdown text to land in.
 *   - That label holds itself open at the widest of its three texts (first label,
 *     countdown, resend) from first paint, so the button never resizes mid-cycle.
 *     It looks wider than its text at rest — shorten the wording, not the CSS. The
 *     data-cooldown-sizes stamp is the component's own; do not set or style it.
 *   - It is language-agnostic: write the attribute text in the page's own language.
 *   - {s} is the only token, and every occurrence of it substitutes — a bilingual label
 *     naming it twice fills both. This is not printf: %s and %d render literally, and a
 *     label naming no {s} warns at wire time rather than failing silently on first click.
 *   - start() drives the whole cycle, so the two flows it does NOT own are options on
 *     it: a send that happened elsewhere passes silent (no nds:cooldown:triggered, so
 *     your request handler does not run twice), and a cooldown the page is RESUMING
 *     after a reload passes the remainder as seconds. With seconds set, data-cooldown
 *     is not required at all — the button can be driven entirely from JS.
 *   - The countdown starts on the click, because that is when the endpoint was hit.
 *     It does NOT wait for your request, and the component owns no loading phase —
 *     a timer cannot know how long a response takes. For a real one, stamp the
 *     button's own loading state from nds:cooldown:triggered and clear it when the
 *     response lands:
 *       btn.addEventListener('nds:cooldown:triggered', () => {
 *         NDS.State.add(btn, 'loading');
 *         send().finally(() => NDS.State.remove(btn, 'loading'));
 *       });
 *     [data-state~="loading"] hides the label, so the countdown ticks under the
 *     spinner and is already at the right number when the state comes off. The
 *     component never sets or clears 'loading' — it is the page's, start to finish.
 *   - It fires no toast of its own. Raise one from the same handler's success or
 *     failure path via NDS.Alert.create(), so a failed send never reports success.
 */
/**
 * NDS Cooldown Button
 * Reusable button pattern: click → live countdown → restore.
 *
 * Declarative:
 *   <button class="nds-btn nds-subtle nds-cooldown"
 *           data-cooldown="30"
 *           data-cooldown-label="Resend in {s}s"
 *           data-resend-label="Resend">
 *     <span class="nds-label">Send code</span>
 *   </button>
 *
 * Programmatic:
 *   NDS.CooldownButton.start(btn);
 *   NDS.CooldownButton.start(btn, { silent: true });        // send already happened
 *   NDS.CooldownButton.start(btn, { seconds: 20, silent: true });  // resume a remainder
 *   NDS.CooldownButton.reset(btn);
 *
 * Events (fired on the button, bubble):
 *   nds:cooldown:triggered  — cooldown starts; issue the request here
 *   nds:cooldown:tick       — every second during cooldown; detail.remaining
 *   nds:cooldown:end        — cooldown finished or reset(); button restored
 *
 * Attributes:
 *   data-cooldown           seconds (required to opt in)
 *   data-cooldown-label     countdown text; every {s} → remaining seconds (default "{s}")
 *   data-resend-label       label to restore AFTER the first completed cycle
 *                           (e.g. initial "Send" becomes "Resend" from cycle 2 on).
 *                           Absent = keep the initial label across cycles.
 *
 * The component owns the throttle and the label. The request, its loading state
 * and its confirmation are the page's, all wired from `nds:cooldown:triggered`.
 *
 * The component is language-agnostic: the author writes whichever language the
 * page serves in the attributes and in the .nds-label span. Loading visual
 * and disabled styling are inherited from _sass/components/_buttons.scss
 * ([data-state~="loading"], :disabled).
 *
 * data-cooldown is READ ONCE at wire time and cached per element. Editing it
 * via DevTools after the page has loaded has no effect — the cached duration
 * stands. The label attributes are still read at each cycle, so copy edits
 * reflect live.
 */
(function() {
    'use strict';

    const SEL = '.nds-cooldown';
    const WIRED_ATTR = 'data-nds-cooldown-button-initialized';
    const DEFAULT_TEMPLATE = '{s}';
    // Global: a bilingual label names the token once per language.
    const TOKEN = /\{s\}/g;

    // One-shot init guard. A re-run of init (e.g. NDS.Init.initialize())
    // would otherwise re-stack the two pool subscriptions in init() — onDOMAdd
    // and onDOMRemove push unconditionally with no (selector, fn) dedup in core.
    // The single init at page load wires the subscribers; subsequent button
    // mutations are already handled by those long-lived subscribers.
    let _initDone = false;

    // Per-button runtime: { tickTimer, labelEl, originalLabel }
    const active = new WeakMap();

    // Per-button frozen config: { cooldown, label }. Populated on wire(),
    // read on start(). Prevents DevTools attribute edits from shortening
    // the cooldown mid-session.
    const config = new WeakMap();

    function configFor(btn) {
        let cfg = config.get(btn);
        if (!cfg) {
            const labelEl = btn.querySelector('.nds-label');
            cfg = {
                cooldown: seconds(btn.getAttribute('data-cooldown'), 0),
                // Authored label, frozen before any swap can overwrite it — the width
                // reservation needs it for every later cycle.
                label: labelEl ? labelEl.textContent.trim() : ''
            };
            config.set(btn, cfg);
        }
        return cfg;
    }

    function seconds(val, fallback) {
        const n = parseInt(val, 10);
        return Number.isFinite(n) && n >= 0 ? n : fallback;
    }

    function fire(btn, type, detail) {
        btn.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: detail || {} }));
    }

    function labelTemplate(btn) {
        return btn.getAttribute('data-cooldown-label') || DEFAULT_TEMPLATE;
    }

    function resendLabel(btn) {
        return btn.getAttribute('data-resend-label');
    }

    // Hand the CSS every text this label can show — the one it was authored with, the
    // countdown at its starting number (its longest), and data-resend-label — so the
    // label reserves the widest of them from first paint and the button never resizes
    // mid-cycle. Writing one attribute; nothing is measured, nothing reflows.
    // total: the duration this cycle will actually run, so a start({ seconds }) override
    // reserves for ITS starting number rather than the attribute's.
    function stampSizers(btn, total) {
        const labelEl = btn.querySelector('.nds-label');
        if (!labelEl) return;
        const cfg = configFor(btn);
        const start = total == null ? cfg.cooldown : total;
        const texts = [cfg.label, labelTemplate(btn).replace(TOKEN, start), resendLabel(btn)];
        labelEl.setAttribute('data-cooldown-sizes', texts.filter((t) => t).join('\n'));
    }

    function render(ctx, template, remaining) {
        if (ctx.labelEl) ctx.labelEl.textContent = template.replace(TOKEN, remaining);
    }

    // opts.seconds  run for this many seconds instead of data-cooldown — the remainder
    //               of a cooldown the page is resuming, or a duration the server chose.
    // opts.silent   skip nds:cooldown:triggered, for a send that already happened
    //               elsewhere. tick and end still fire: a resumed cooldown still has to
    //               render its seconds and re-enable the button.
    function start(btn, opts) {
        if (!btn || active.has(btn)) return;

        const cfg = configFor(btn);
        opts = opts || {};
        // An explicit duration is its own opt-in, so a button with no data-cooldown
        // can still be driven entirely from JS.
        const total = opts.seconds == null ? cfg.cooldown : seconds(opts.seconds, cfg.cooldown);
        if (total <= 0) return;

        const labelEl = btn.querySelector('.nds-label');
        const ctx = {
            labelEl,
            originalLabel: labelEl ? labelEl.textContent : '',
            tickTimer: null
        };

        // The label attributes are re-read every cycle, so re-stamp the width
        // sizers in case the page changed the countdown or resend text.
        stampSizers(btn, total);
        active.set(btn, ctx);

        NDS.State.add(btn, 'cooldown');
        btn.disabled = true;
        // Fired before the first render so a listener can stamp its own 'loading'
        // state — the countdown then ticks underneath the spinner and is already
        // at the right number when the request resolves and the state comes off.
        if (!opts.silent) fire(btn, 'nds:cooldown:triggered');

        const template = labelTemplate(btn);
        let remaining = total;
        render(ctx, template, remaining);
        fire(btn, 'nds:cooldown:tick', { remaining });

        ctx.tickTimer = setInterval(() => {
            remaining -= 1;
            if (remaining <= 0) {
                finish(btn);
            } else {
                render(ctx, template, remaining);
                fire(btn, 'nds:cooldown:tick', { remaining });
            }
        }, 1000);
    }

    function finish(btn) {
        const ctx = active.get(btn);
        if (!ctx) return;
        if (ctx.tickTimer) clearInterval(ctx.tickTimer);
        // 'loading' is the page's to set and clear — the component never touches it,
        // so a request still in flight keeps its spinner past the countdown.
        NDS.State.remove(btn, 'cooldown');
        btn.disabled = false;
        if (ctx.labelEl) {
            const resend = resendLabel(btn);
            ctx.labelEl.textContent = resend != null ? resend : ctx.originalLabel;
        }
        active.delete(btn);
        fire(btn, 'nds:cooldown:end');
    }

    function reset(btn) {
        if (btn && active.has(btn)) finish(btn);
    }

    // An authored label with no token never counts down — it just sits there. Say so at
    // wire time; the alternative is finding out on the first click in production, which
    // is how %s went unnoticed in the field. search() ignores TOKEN's /g flag, so there
    // is no lastIndex to carry between buttons.
    function warnUnknownToken(btn) {
        const label = btn.getAttribute('data-cooldown-label');
        if (label && label.search(TOKEN) === -1) {
            console.warn('NDS CooldownButton: data-cooldown-label has no {s} token, so the countdown will not show. Label: ' + JSON.stringify(label), btn);
        }
    }

    function wire(btn) {
        if (!btn || btn.hasAttribute(WIRED_ATTR)) return;
        btn.setAttribute(WIRED_ATTR, '');
        configFor(btn); // freeze cooldown durations at wire time
        warnUnknownToken(btn);
        stampSizers(btn); // reserve the label width before the first click
        btn._cooldownAC = new AbortController();
        btn.addEventListener('click', () => {
            if (btn.disabled || active.has(btn)) return;
            start(btn);
        }, { signal: btn._cooldownAC.signal });
    }

    // Paired with onDOMRemove so a detached + re-added button gets a clean
    // re-wire rather than having the old closure state persist behind the
    // WIRED_ATTR guard.
    function unwire(btn) {
        if (!btn || !btn.hasAttribute(WIRED_ATTR)) return;
        if (btn._cooldownAC) {
            btn._cooldownAC.abort();
            btn._cooldownAC = null;
        }
        btn.removeAttribute(WIRED_ATTR);
    }

    const CooldownButton = {
        init() {
            if (_initDone) return;
            _initDone = true;
            document.querySelectorAll(SEL).forEach(wire);
            NDS.onDOMAdd(SEL, (nodes) => nodes.forEach(wire));
            NDS.onDOMRemove(SEL, (nodes) => nodes.forEach(unwire));
        },
        start,
        reset
    };

    if (typeof window !== 'undefined') {
        NDS.CooldownButton = CooldownButton;
    }
})();
