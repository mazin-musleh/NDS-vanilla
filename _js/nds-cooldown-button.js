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
 *   nds:cooldown:loading    — loading phase begins
 *   nds:cooldown:triggered  — loading ends, cooldown starts (fire toasts here)
 *   nds:cooldown:tick       — every second during cooldown; detail.remaining
 *   nds:cooldown:end        — cooldown finished or reset(); button restored
 *
 * Attributes:
 *   data-cooldown           seconds (required to opt in)
 *   data-cooldown-loading   seconds to hold loading state first (default 0)
 *   data-cooldown-label     countdown text; {s} → remaining seconds (default "{s}")
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
    const WIRED_ATTR = 'data-cooldown-wired';
    const DEFAULT_TEMPLATE = '{s}';

    // Per-button runtime: { loadingTimer, tickTimer, labelEl, originalLabel }
    const active = new WeakMap();

    // Per-button frozen config: { cooldown, loading }. Populated on wire(),
    // read on start(). Prevents DevTools attribute edits from shortening
    // the cooldown mid-session.
    const config = new WeakMap();

    function configFor(btn) {
        let cfg = config.get(btn);
        if (!cfg) {
            cfg = {
                cooldown: seconds(btn.getAttribute('data-cooldown'), 0),
                loading: seconds(btn.getAttribute('data-cooldown-loading'), 0)
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
            position: 'bottom',
            duration: 4000
        });
    }

    function render(ctx, template, remaining) {
        if (ctx.labelEl) ctx.labelEl.textContent = template.replace('{s}', remaining);
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

    function wire(btn) {
        if (!btn || btn.hasAttribute(WIRED_ATTR)) return;
        btn.setAttribute(WIRED_ATTR, '');
        configFor(btn); // freeze cooldown durations at wire time
        btn.addEventListener('click', () => {
            if (btn.disabled || active.has(btn)) return;
            start(btn);
        });
    }

    const CooldownButton = {
        init() {
            document.querySelectorAll(SEL).forEach(wire);
            NDS.onDOMAdd(SEL, (nodes) => nodes.forEach(wire));
        },
        start,
        reset
    };

    if (typeof window !== 'undefined') {
        NDS.CooldownButton = CooldownButton;
    }
})();
