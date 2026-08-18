/* NDS.CooldownButton — public surface
 * Rides: nds-alert (the optional "sent" toast; soft — no toast without it)
 * Methods:
 *   NDS.CooldownButton.init()        wire every .nds-cooldown, now and later
 *   NDS.CooldownButton.start(btn)    begin the cycle by hand
 *   NDS.CooldownButton.reset(btn)    end it early and restore the button
 * Events (bubble from the button):
 *   nds:cooldown:loading     the loading phase begins — only fires when data-cooldown-loading > 0
 *   nds:cooldown:triggered   loading ends and the countdown starts — fire your request here
 *   nds:cooldown:tick        detail {remaining} — once a second during the countdown
 *   nds:cooldown:end         the countdown finished, or reset() was called
 * Hooks (on the .nds-cooldown button):
 *   data-cooldown           seconds — REQUIRED to opt in
 *   data-cooldown-loading   seconds to hold the loading state first, default 0
 *   data-cooldown-label     countdown text; every {s} becomes the remaining seconds
 *   data-resend-label       the label to restore from the second cycle on
 *   data-sent-title · data-sent-message   either one fires a success toast when the
 *                                         countdown starts
 * Gotchas:
 *   - data-cooldown and data-cooldown-loading are read ONCE, when the button is wired,
 *     and cached. Editing them later has no effect. The label and toast attributes are
 *     re-read every cycle.
 *   - The button needs a <span class="nds-label"> for the countdown text to land in.
 *   - That label holds itself open at the widest of its three texts (first label,
 *     countdown, resend) from first paint, so the button never resizes mid-cycle.
 *     It looks wider than its text at rest — shorten the wording, not the CSS. The
 *     data-cooldown-sizes stamp is the component's own; do not set or style it.
 *   - It is language-agnostic: write the attribute text in the page's own language.
 *   - {s} is the only token, and every occurrence of it substitutes — a bilingual label
 *     naming it twice fills both. This is not printf: %s and %d render literally, and a
 *     label naming no {s} warns at wire time rather than failing silently on first click.
 *   - The "sent" toast fires when the countdown starts — on the click, not on your
 *     request succeeding. If the request can fail, leave the two toast attributes off
 *     and call NDS.Alert.create() yourself from the request's own success path;
 *     otherwise the built-in toast contradicts your error toast. Same escape hatch
 *     for a different variant or position — fire it from nds:cooldown:triggered.
 */
/**
 * NDS Cooldown Button
 * Reusable button pattern: click → optional loading phase → live countdown → restore.
 *
 * Declarative:
 *   <button class="nds-btn nds-subtle nds-cooldown"
 *           data-cooldown="30"
 *           data-cooldown-loading="3"
 *           data-cooldown-label="Resend in {s}s"
 *           data-resend-label="Resend">
 *     <span class="nds-label">Send code</span>
 *   </button>
 *
 * Programmatic:
 *   NDS.CooldownButton.start(btn);
 *   NDS.CooldownButton.reset(btn);
 *
 * Events (fired on the button, bubble):
 *   nds:cooldown:loading    — loading phase begins (only when data-cooldown-loading > 0)
 *   nds:cooldown:triggered  — loading ends, cooldown starts (fire toasts here)
 *   nds:cooldown:tick       — every second during cooldown; detail.remaining
 *   nds:cooldown:end        — cooldown finished or reset(); button restored
 *
 * Attributes:
 *   data-cooldown           seconds (required to opt in)
 *   data-cooldown-loading   seconds to hold loading state first (default 0)
 *   data-cooldown-label     countdown text; every {s} → remaining seconds (default "{s}")
 *   data-resend-label       label to restore AFTER the first completed cycle
 *                           (e.g. initial "Send" becomes "Resend" from cycle 2 on).
 *                           Absent = keep the initial label across cycles.
 *                           Mid-loading reset() always keeps the initial label.
 *   data-sent-title         optional — toast title fired when cooldown begins
 *   data-sent-message       optional — toast description fired when cooldown
 *                           begins. Either attribute present triggers a
 *                           success toast via NDS.Alert.create; no-op if
 *                           NDS.Alert is not loaded. For custom variants or
 *                           positions, listen for `nds:cooldown:triggered`
 *                           and call NDS.Alert.create yourself.
 *
 * The component is language-agnostic: the author writes whichever language the
 * page serves in the attributes and in the .nds-label span. Loading visual
 * and disabled styling are inherited from _sass/components/_buttons.scss
 * ([data-state~="loading"], :disabled).
 *
 * data-cooldown and data-cooldown-loading are READ ONCE at wire time and
 * cached per element. Editing those attributes via DevTools after the page
 * has loaded has no effect — the cached durations stand. Label and toast
 * attributes are still read at each cycle, so copy edits reflect live.
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

    // Per-button runtime: { loadingTimer, tickTimer, labelEl, originalLabel }
    const active = new WeakMap();

    // Per-button frozen config: { cooldown, loading }. Populated on wire(),
    // read on start(). Prevents DevTools attribute edits from shortening
    // the cooldown mid-session.
    const config = new WeakMap();

    function configFor(btn) {
        let cfg = config.get(btn);
        if (!cfg) {
            const labelEl = btn.querySelector('.nds-label');
            cfg = {
                cooldown: seconds(btn.getAttribute('data-cooldown'), 0),
                loading: seconds(btn.getAttribute('data-cooldown-loading'), 0),
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

    function sendToast(btn) {
        const title = btn.getAttribute('data-sent-title');
        const message = btn.getAttribute('data-sent-message');
        if (!title && !message) return;
        // Soft dependency — component no-ops the toast if Alert isn't bundled.
        if (!NDS.Alert || typeof NDS.Alert.create !== 'function') return;
        NDS.Alert.create({
            variant: 'success',
            title: title || '',
            description: message || '',
            display: 'toast',
            position: 'top',
            duration: 4000
        });
    }

    // Hand the CSS every text this label can show — the one it was authored with, the
    // countdown at its starting number (its longest), and data-resend-label — so the
    // label reserves the widest of them from first paint and the button never resizes
    // mid-cycle. Writing one attribute; nothing is measured, nothing reflows.
    function stampSizers(btn) {
        const labelEl = btn.querySelector('.nds-label');
        if (!labelEl) return;
        const cfg = configFor(btn);
        const texts = [cfg.label, labelTemplate(btn).replace(TOKEN, cfg.cooldown), resendLabel(btn)];
        labelEl.setAttribute('data-cooldown-sizes', texts.filter((t) => t).join('\n'));
    }

    function render(ctx, template, remaining) {
        if (ctx.labelEl) ctx.labelEl.textContent = template.replace(TOKEN, remaining);
    }

    function start(btn) {
        if (!btn || active.has(btn)) return;

        const cfg = configFor(btn);
        if (cfg.cooldown <= 0) return;

        const cooldownSec = cfg.cooldown;
        const loadingSec = cfg.loading;
        const labelEl = btn.querySelector('.nds-label');
        const ctx = {
            labelEl,
            originalLabel: labelEl ? labelEl.textContent : '',
            loadingTimer: null,
            tickTimer: null,
            triggered: false
        };

        // The label + toast attributes are re-read every cycle, so re-stamp the
        // width sizers in case the page changed the countdown or resend text.
        stampSizers(btn);
        active.set(btn, ctx);

        const beginCooldown = () => {
            ctx.loadingTimer = null;
            ctx.triggered = true;
            NDS.State.remove(btn, 'loading');
            NDS.State.add(btn, 'cooldown');
            btn.disabled = true;
            fire(btn, 'nds:cooldown:triggered');
            sendToast(btn);

            const template = labelTemplate(btn);
            let remaining = cooldownSec;
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
        };

        if (loadingSec > 0) {
            NDS.State.add(btn, 'loading');
            fire(btn, 'nds:cooldown:loading');
            ctx.loadingTimer = setTimeout(beginCooldown, loadingSec * 1000);
        } else {
            beginCooldown();
        }
    }

    function finish(btn) {
        const ctx = active.get(btn);
        if (!ctx) return;
        if (ctx.tickTimer) clearInterval(ctx.tickTimer);
        if (ctx.loadingTimer) clearTimeout(ctx.loadingTimer);
        NDS.State.remove(btn, 'loading', 'cooldown');
        btn.disabled = false;
        if (ctx.labelEl) {
            // If the cooldown phase actually ran, prefer the post-send label.
            // A mid-loading reset leaves the original label in place.
            const resend = ctx.triggered ? resendLabel(btn) : null;
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
