/**
 * NDS Stepper Component — Eager shell
 *
 * SPLIT COMPONENT — EAGER SHELL
 * ─────────────────────────────────────────────────────────────────────────────
 * Owns at first paint (rides nds-main.min.js, critical:true so the loader
 * fires init() during the reveal-gating pass):
 *   - data-state stamping on every .nds-stepper-step (radial CSS hides any
 *     non-current step via display:none — without this, radial paints EMPTY
 *     until the half attaches).
 *   - Responsive variant translation: toggles canonical nds-vertical /
 *     nds-radial to match the current breakpoint, sourced from the authored
 *     marker classes (nds-{variant}-{sm|md|lg}).
 *   - Progress display: --current-step / --total-steps style props +
 *     .nds-progress-number + .nds-progress-steps text — so the radial arc +
 *     percentage + "1 / 4" label paint complete on first frame.
 *   - One delegated document click listener for [data-stepper-control] that
 *     traps into behavior.control.
 *
 * Defers to the lazy half (nds-stepper__delegated.js, joins
 * nds-delegated.min.js, loads via NDS.loadSplit('Stepper')):
 *   - NDSStepper class + per-instance reconciliation methods
 *   - Navigation methods (next/previous/goTo/control/get/setFallback)
 *   - data-current/data-total NDS.onAttrChange observer
 *
 * Contract: public NDS.Stepper.* methods route through the closure-scoped
 * `behavior` dispatch. Pre-attach, each entry on `behavior` is a trap
 * (queue + NDS.loadSplit + promise). The half installs via
 * NDS.Stepper._installBehavior(factory) and Object.assigns its `spec` over
 * `behavior`; spec.__deferred names every trapped method (build asserts
 * cover both directions). See CLAUDE.md "JS Bundles & Shrinking the
 * Critical Bundle" for the broader split-component rules.
 */

(function () {
    'use strict';

    let _globalsWired = false;
    let _behaviorInstalled = false;
    let _pendingBehavior = null;

    // Per-element BP-class snapshot — class observer dedupes on this so the
    // shell's own canonical-class toggles in _applyResponsiveLayout don't
    // re-trigger reapply (canonical classes aren't in the BP snapshot).
    const _bpSnapshots = new WeakMap();

    // Pre-compiled bp-variant regexes — _applyResponsiveLayout fires per
    // resize event per stepper, so hoist out of the call path.
    const _BP_RES = {
        sm: /\bnds-(horizontal|vertical|radial)-sm\b/,
        md: /\bnds-(horizontal|vertical|radial)-md\b/,
        lg: /\bnds-(horizontal|vertical|radial)-lg\b/,
    };
    const _BP_CLASS_RE = /^nds-(?:horizontal|vertical|radial)-(?:sm|md|lg)$/;

    function _stampSteps(el) {
        const current = parseInt(el.dataset.current) || 1;
        const steps = el.querySelectorAll('.nds-stepper-step');
        for (let i = 0; i < steps.length; i++) {
            const n = i + 1;
            const state = n < current ? 'completed' : (n === current ? 'current' : 'upcoming');
            if (NDS.State.get(steps[i]) !== state) NDS.State.set(steps[i], state);
        }
    }

    function _stampProgress(el) {
        const current = parseInt(el.dataset.current) || 1;
        const total = parseInt(el.dataset.total) || el.querySelectorAll('.nds-stepper-step').length;
        if (!total) return;

        el.style.setProperty('--current-step', current);
        el.style.setProperty('--total-steps', total);

        const percentage = Math.min(100, Math.round((current / total) * 100));
        const number = el.querySelector('.nds-progress-number');
        if (number) number.textContent = percentage;

        const text = el.querySelector('.nds-progress-steps');
        if (text) {
            const displayCurrent = Math.min(current, total);
            text.textContent = `${displayCurrent} / ${total}`;
        }
    }

    function _resolveFallback(el) {
        if (el.classList.contains('nds-radial')) return 'radial';
        if (el.classList.contains('nds-vertical')) return 'vertical';
        return 'horizontal';
    }

    function _resolveBpVariant(el, bp) {
        const m = el.className.match(_BP_RES[bp]);
        return m ? m[1] : null;
    }

    function _applyResponsiveLayout(el) {
        const fallback = el._ndsStepperFallback || 'horizontal';
        let pick = fallback;
        if (window.matchMedia(NDS.breakpoints.mobile).matches) pick = _resolveBpVariant(el, 'sm') || fallback;
        else if (window.matchMedia(NDS.breakpoints['tablet-max']).matches) pick = _resolveBpVariant(el, 'md') || fallback;
        else pick = _resolveBpVariant(el, 'lg') || fallback;

        el.classList.toggle('nds-vertical', pick === 'vertical');
        el.classList.toggle('nds-radial', pick === 'radial');
    }

    function _snapshotBp(el) {
        return [...el.classList].filter(c => _BP_CLASS_RE.test(c)).sort().join(' ');
    }

    // Stamp every first-paint visual on `el`. Used by init() at page load
    // AND by the half's create(el) so dynamically-injected steppers get the
    // same treatment as authored ones. Idempotent; safe to re-run.
    function _stamp(el) {
        if (el._ndsStepperFallback === undefined) {
            el._ndsStepperFallback = _resolveFallback(el);
        }
        _applyResponsiveLayout(el);
        _bpSnapshots.set(el, _snapshotBp(el));
        _stampSteps(el);
        _stampProgress(el);
        el.setAttribute('data-nds-stepper-stamped', '');
    }

    function _wireGlobals() {
        if (_globalsWired) return;
        _globalsWired = true;

        // Delegated click listener — one per page. preventDefault stops a
        // <button type="submit"> from submitting the surrounding form on a
        // click that lands before the half attaches (it queues + replays).
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-stepper-control]');
            if (!btn) return;
            e.preventDefault();
            const targetId = btn.dataset.stepperTarget;
            let stepperId;
            if (targetId) {
                stepperId = targetId;
            } else {
                const closestStepper = btn.closest('.nds-stepper') || document.querySelector('.nds-stepper');
                stepperId = closestStepper && closestStepper.id;
            }
            if (!stepperId) return;
            NDS.Stepper.control(stepperId, btn.dataset.stepperControl, btn.dataset.stepperValue);
        });

        NDS.onResize(() => {
            document.querySelectorAll('.nds-stepper[data-nds-stepper-stamped]').forEach(_applyResponsiveLayout);
        });

        // External BP-class mutations (showcase Simplify re-adding
        // nds-radial-sm etc.) change the snapshot → trigger reapply.
        // Our own canonical toggles in _applyResponsiveLayout don't change
        // the BP snapshot, so they don't loop.
        NDS.onAttrChange('.nds-stepper', ['class'], els => {
            els.forEach(el => {
                const current = _snapshotBp(el);
                if (current !== _bpSnapshots.get(el)) {
                    _bpSnapshots.set(el, current);
                    _applyResponsiveLayout(el);
                }
            });
        });
    }

    function init() {
        document.querySelectorAll('.nds-stepper:not([data-nds-stepper-stamped])').forEach(el => {
            if (el.closest('code, .code-example')) return;
            _stamp(el);
        });
        _wireGlobals();
    }

    // ─── Split-behavior bridge ───────────────────────────────────────────
    // Each entry on `behavior` is initially a trap: queue + NDS.loadSplit +
    // promise. The half's _installBehavior Object.assigns real methods over
    // `behavior`; _flushPendingBehavior replays the queue. Per-entry
    // try/catch keeps one throw from sinking siblings.
    const _deferBehavior = (name, args) => new Promise((resolve, reject) => {
        (_pendingBehavior || (_pendingBehavior = [])).push({ name, args, resolve, reject });
        NDS.loadSplit('Stepper');
    });

    const _flushPendingBehavior = () => {
        const q = _pendingBehavior;
        if (!q) return;
        _pendingBehavior = null;
        for (const c of q) {
            try {
                c.resolve(behavior[c.name].apply(behavior, c.args));
            } catch (e) {
                console.warn(`NDS Stepper: split replay failed for ${c.name}:`, e);
                c.reject(e);
            }
        }
    };

    const behavior = {
        reinit:      function () { return _deferBehavior('reinit', arguments); },
        create:      function () { return _deferBehavior('create', arguments); },
        get:         function () { return _deferBehavior('get', arguments); },
        getFallback: function () { return _deferBehavior('getFallback', arguments); },
        next:        function () { return _deferBehavior('next', arguments); },
        previous:    function () { return _deferBehavior('previous', arguments); },
        goTo:        function () { return _deferBehavior('goTo', arguments); },
        control:     function () { return _deferBehavior('control', arguments); },
        setFallback: function () { return _deferBehavior('setFallback', arguments); },
    };

    NDS.Stepper = {
        init,
        reinit:      () => behavior.reinit(),
        create:      (el) => behavior.create(el),
        get:         (id) => behavior.get(id),
        getFallback: (id) => behavior.getFallback(id),
        next:        (id) => behavior.next(id),
        previous:    (id) => behavior.previous(id),
        goTo:        (id, step) => behavior.goTo(id, step),
        control:     (id, action, value) => behavior.control(id, action, value),
        setFallback: (id, variant) => behavior.setFallback(id, variant),

        // Shell-private surface for the half — _applyLayout re-resolves the
        // canonical class after setFallback updates the cached fallback;
        // _stamp lets the half's create(el) give a dynamically-injected
        // stepper the same first-paint treatment as authored markup.
        _applyLayout: _applyResponsiveLayout,
        _stamp,

        _installBehavior: (factory) => {
            if (_behaviorInstalled) return;
            _behaviorInstalled = true;
            const spec = factory(NDS.Stepper);
            delete spec.__deferred;
            Object.assign(behavior, spec);
            _flushPendingBehavior();
        },
    };
})();
