/**
 * NDS Stepper Component
 *
 * Critical (rides nds-main.min.js, critical:true so the loader fires init()
 * during the reveal-gating pass). First-paint work is cold (no layout reads):
 *   - data-state stamping on every .nds-stepper-step (radial CSS hides any
 *     non-current step via display:none — without this, radial paints EMPTY).
 *   - Responsive variant translation: toggles canonical nds-vertical /
 *     nds-radial to match the current breakpoint, sourced from the authored
 *     marker classes (nds-{variant}-{sm|md|lg}).
 *   - Progress display: --current-step / --total-steps style props +
 *     .nds-progress-number + .nds-progress-steps text — so the radial arc +
 *     percentage + "1 / 4" label paint complete on first frame.
 *   - One delegated document click listener for [data-stepper-control].
 *   - NDSStepper per-instance construction + the data-current/data-total
 *     NDS.onAttrChange observer (all cold — DOM writes only, no forced layout).
 */

(function () {
    'use strict';

    let _globalsWired = false;
    const steppers = new Map();
    let _offDataAttrChange;

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
    // AND by create(el) so dynamically-injected steppers get the same
    // treatment as authored ones. Idempotent; safe to re-run.
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
        // <button type="submit"> from submitting the surrounding form.
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
            control(stepperId, btn.dataset.stepperControl, btn.dataset.stepperValue);
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

    class NDSStepper {
        constructor(element) {
            this.element = element;
            this.steps = element.querySelectorAll('.nds-stepper-step');
            this.progressNumber = element.querySelector('.nds-progress-number');
            this.progressText = element.querySelector('.nds-progress-steps');

            this.currentStep = this.getCurrentStep();
            this.totalSteps = this.steps.length;
            // Recursion guard for the data-current/data-total NDS.onAttrChange
            // observer below — flipped true during updateProgress() writes,
            // reset on the next microtask.
            this.isInternalUpdate = false;
            // Authored fallback — _stamp captured it on el._ndsStepperFallback
            // BEFORE _applyResponsiveLayout toggled the canonical class (so the
            // read is the AUTHORED intent, not the breakpoint-resolved paint).
            // Fall back to the class-state read for elements created dynamically
            // via NDS.Stepper.create(el) on un-stamped markup.
            this._fallback = element._ndsStepperFallback
                          || (element.classList.contains('nds-radial') ? 'radial'
                             : element.classList.contains('nds-vertical') ? 'vertical'
                             : 'horizontal');

            // Reconcile state with the first-paint stamping. Idempotent when
            // already stamped correctly; needed when authors mutate data-current
            // after init or when an instance is created dynamically via
            // NDS.Stepper.create(el) on un-stamped markup.
            this.updateProgress();
            this.syncStepStates();
        }

        // Live getter — reads the always-on canonical class (authored intent),
        // not the breakpoint-resolved paint. CSS @media rules drive the
        // breakpoint variant in _sass/components/_stepper.scss. For combos
        // like nds-radial + nds-vertical-lg, isRadial returns true at every
        // viewport even though desktop paints vertical — consumers either
        // tolerate that or guard explicitly (see templates/form-template.md).
        get isRadial() {
            return this.element.classList.contains('nds-radial');
        }

        isValidStep(stepNumber) {
            return stepNumber >= 1 && stepNumber <= this.totalSteps;
        }

        destroy() {
            const el = this.element;
            if (el.id) steppers.delete(el.id);
            delete el.ndsStepper;
            delete el._ndsStepperFallback;
            el.removeAttribute('data-nds-stepper-initialized');
            el.removeAttribute('data-nds-stepper-stamped');
            // Shared module-level data-current observer stays — it serves
            // remaining steppers. _initInstances releases it en bloc on its
            // next call (reinit / SPA navigation).
        }

        // Change the authored fallback at runtime. Used by the showcase
        // Fallback dropmenu + Simplify button. Updates the cached fallback
        // (instance field + element JS prop _stamp reads), then re-resolves the
        // canonical class for the current viewport via _applyResponsiveLayout
        // (the breakpoint translation owner).
        setFallback(variant) {
            if (!['horizontal', 'vertical', 'radial'].includes(variant)) return;
            this._fallback = variant;
            this.element._ndsStepperFallback = variant;
            _applyResponsiveLayout(this.element);
        }

        getCurrentStep() {
            const dataStep = parseInt(this.element.dataset.current);
            if (dataStep >= 1) {
                // Radial steppers clamp to totalSteps; linear steppers allow
                // exceeding for completion state.
                return this.isRadial ? Math.min(dataStep, this.steps.length) : dataStep;
            }
            const currentIndex = Array.from(this.steps).findIndex(step => NDS.State.has(step, 'current'));
            return currentIndex >= 0 ? currentIndex + 1 : 1;
        }

        updateProgress() {
            this.isInternalUpdate = true;
            this.element.dataset.current = this.currentStep;
            this.element.dataset.total = this.totalSteps;
            this.updateProgressDisplay();
            Promise.resolve().then(() => { this.isInternalUpdate = false; });
        }

        updateProgressDisplay() {
            const percentage = Math.min(100, Math.round((this.currentStep / this.totalSteps) * 100));

            this.element.style.setProperty('--current-step', this.currentStep);
            this.element.style.setProperty('--total-steps', this.totalSteps);

            // Only mark as completed if not radial
            if (!this.isRadial && this.currentStep >= this.totalSteps) {
                NDS.State.add(this.element, 'completed');
            } else {
                NDS.State.remove(this.element, 'completed');
            }

            if (this.progressNumber) {
                this.progressNumber.textContent = percentage;
            }

            if (this.progressText) {
                const displayCurrent = Math.min(this.currentStep, this.totalSteps);
                this.progressText.textContent = `${displayCurrent} / ${this.totalSteps}`;
            }
        }

        syncStepStates() {
            const allCompleted = !this.isRadial && this.currentStep > this.totalSteps;

            this.steps.forEach((step, index) => {
                const stepNumber = index + 1;

                if (allCompleted || stepNumber < this.currentStep) {
                    NDS.State.set(step, 'completed');
                } else if (stepNumber === this.currentStep) {
                    NDS.State.set(step, 'current');
                } else {
                    NDS.State.set(step, 'upcoming');
                }
            });
        }

        goTo(stepNumber) {
            if (!this.isValidStep(stepNumber)) return false;
            this.currentStep = stepNumber;
            this.updateProgress();
            this.syncStepStates();
            this.dispatchEvent();
            return true;
        }

        next() {
            const isLastStep = this.currentStep === this.totalSteps;

            // Mark last step as completed (linear steppers only)
            if (isLastStep && !this.isRadial) {
                const lastStep = this.steps[this.totalSteps - 1];
                if (!NDS.State.has(lastStep, 'completed')) {
                    NDS.State.set(lastStep, 'completed');
                    NDS.State.add(this.element, 'completed');
                    this.dispatchEvent();
                }
                return true;
            }
            return this.goTo(this.currentStep + 1);
        }

        previous() {
            const isLastStep = this.currentStep === this.totalSteps;

            // Un-complete last step instead of going back (linear steppers only)
            if (isLastStep && !this.isRadial) {
                const lastStep = this.steps[this.totalSteps - 1];
                if (lastStep && NDS.State.has(lastStep, 'completed')) {
                    NDS.State.set(lastStep, 'current');
                    NDS.State.remove(this.element, 'completed');
                    this.dispatchEvent();
                    return true;
                }
            }
            return this.goTo(this.currentStep - 1);
        }

        dispatchEvent() {
            this.element.dispatchEvent(new CustomEvent('nds:stepper:change', {
                detail: {
                    currentStep: this.currentStep,
                    totalSteps: this.totalSteps,
                    progressPercentage: Math.round((this.currentStep / this.totalSteps) * 100)
                },
                bubbles: true
            }));
        }

        // Simple getters
        get current() { return this.currentStep; }
        get total() { return this.totalSteps; }
        get progress() { return Math.round((this.currentStep / this.totalSteps) * 100); }
    }

    // Walk every .nds-stepper not yet wired to a class instance, construct,
    // register on the element + id-keyed map, then (re-)register the shared
    // data-current/data-total NDS.onAttrChange observer. Stored handle is
    // released before re-register so re-running this (via reinit / SPA
    // navigation) doesn't stack subscriptions.
    function _initInstances() {
        document.querySelectorAll('.nds-stepper:not([data-nds-stepper-initialized])').forEach(element => {
            if (element.closest('code, .code-example')) return;

            const stepper = new NDSStepper(element);
            element.setAttribute('data-nds-stepper-initialized', 'true');
            element.ndsStepper = stepper;

            if (element.id) {
                steppers.set(element.id, stepper);
            }
        });

        if (_offDataAttrChange) _offDataAttrChange();
        _offDataAttrChange = NDS.onAttrChange('.nds-stepper', ['data-current', 'data-total'], els => {
            els.forEach(el => {
                const stepper = el.ndsStepper;
                if (!stepper || stepper.isInternalUpdate) return;

                const newCurrent = parseInt(el.dataset.current);
                const newTotal = parseInt(el.dataset.total);
                let changed = false;

                if (newTotal > 0 && newTotal !== stepper.totalSteps) {
                    stepper.totalSteps = newTotal;
                    stepper.steps = el.querySelectorAll('.nds-stepper-step');
                    changed = true;
                }

                if (newCurrent >= 1 && newCurrent !== stepper.currentStep) {
                    stepper.currentStep = stepper.isRadial ? Math.min(newCurrent, stepper.totalSteps) : newCurrent;
                    changed = true;
                }

                if (changed) {
                    stepper.updateProgressDisplay();
                    stepper.syncStepStates();
                    stepper.dispatchEvent();
                }
            });
        });
    }

    function get(id) {
        return steppers.get(id);
    }

    function getFallback(id) {
        const s = get(id);
        return s ? s._fallback : null;
    }

    function control(id, action, value) {
        const stepper = get(id);
        if (!stepper) return false;

        switch (action) {
            case 'next': return stepper.next();
            case 'previous': return stepper.previous();
            case 'goto': return stepper.goTo(parseInt(value));
            default: return false;
        }
    }

    // Construct a per-element instance, route through the first-paint stamper
    // so dynamically-injected steppers get responsive translation + data-state
    // + progress-display in one call. Registers on the element + id-keyed Map
    // so subsequent get(id)/control(id, …) work.
    function create(el) {
        _stamp(el);
        const stepper = new NDSStepper(el);
        el.setAttribute('data-nds-stepper-initialized', 'true');
        el.ndsStepper = stepper;
        if (el.id) steppers.set(el.id, stepper);
        return stepper;
    }

    function init() {
        document.querySelectorAll('.nds-stepper:not([data-nds-stepper-stamped])').forEach(el => {
            if (el.closest('code, .code-example')) return;
            _stamp(el);
        });
        _wireGlobals();
        _initInstances();
    }

    NDS.Stepper = {
        init,
        reinit:      _initInstances,
        create,
        get,
        getFallback,
        next:        (id) => control(id, 'next'),
        previous:    (id) => control(id, 'previous'),
        goTo:        (id, step) => control(id, 'goto', step),
        control,
        setFallback: (id, variant) => {
            const s = get(id);
            if (s) s.setFallback(variant);
        },

        // Kept on the public surface for back-compat with any consumer that
        // reached the shell-private stamping helpers.
        _applyLayout: _applyResponsiveLayout,
        _stamp,
    };
})();
