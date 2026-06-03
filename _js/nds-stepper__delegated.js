/**
 * NDS Stepper Component — Lazy behavior half
 *
 * SPLIT COMPONENT — LAZY BEHAVIOR HALF
 * ─────────────────────────────────────────────────────────────────────────────
 * Ships in nds-delegated.min.js; loaded post-reveal via NDS.loadSplit('Stepper'),
 * triggered by either a trapped NDS.Stepper.* call or the shell's delegated
 * click listener firing on a [data-stepper-control] button.
 *
 * Owns:
 *   - NDSStepper class (per-instance state + reconciliation methods:
 *     getCurrentStep, updateProgress, updateProgressDisplay, syncStepStates,
 *     goTo, next, previous, dispatchEvent, isRadial, setFallback, destroy)
 *   - The `steppers` Map for id → instance lookup
 *   - The data-current/data-total NDS.onAttrChange observer that mirrors
 *     external dataset mutations onto the matching instance
 *
 * Eager shell (nds-stepper.js) owns first-paint data-state stamping + the
 * delegated click listener + the public NDS.Stepper trap surface. See its
 * banner for the contract.
 *
 * Contract: the IIFE runs full instance init synchronously, then calls
 * NDS.Stepper._installBehavior(factory) — the factory return's __deferred
 * array names every method trapped in the shell (build asserts trap
 * coverage both directions). NEVER reassigns NDS.Stepper (build assert
 * assert_splits_valid! enforces this).
 */

(function () {
    'use strict';

    if (!NDS.Stepper || !NDS.Stepper._installBehavior) return;

    const steppers = new Map();
    let _offDataAttrChange;

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
            // Authored fallback — the shell captured it on el._ndsStepperFallback
            // at init BEFORE _applyResponsiveLayout toggled the canonical class
            // (so the read is the AUTHORED intent, not the breakpoint-resolved
            // paint). Fall back to the class-state read for elements created
            // dynamically via NDS.Stepper.create(el) on un-stamped markup.
            this._fallback = element._ndsStepperFallback
                          || (element.classList.contains('nds-radial') ? 'radial'
                             : element.classList.contains('nds-vertical') ? 'vertical'
                             : 'horizontal');

            // Reconcile state with the shell's first-paint stamping. Idempotent
            // when the shell already stamped correctly; needed when authors
            // mutate data-current after init or when an instance is created
            // dynamically via NDS.Stepper.create(el) on un-stamped markup.
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
        // (instance field + element JS prop the shell reads), then asks the
        // shell to re-resolve the canonical class for the current viewport
        // — the half does NOT touch nds-vertical / nds-radial directly,
        // because the shell owns the breakpoint translation.
        setFallback(variant) {
            if (!['horizontal', 'vertical', 'radial'].includes(variant)) return;
            this._fallback = variant;
            this.element._ndsStepperFallback = variant;
            if (NDS.Stepper._applyLayout) NDS.Stepper._applyLayout(this.element);
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
    // released before re-register so re-running this (via reinit / new
    // half-load on SPA navigation) doesn't stack subscriptions.
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

    // Construct a per-element instance, route through the shell's first-paint
    // stamper so dynamically-injected steppers get responsive translation +
    // data-state + progress-display in one call. Registers on the element +
    // id-keyed Map so subsequent get(id)/control(id, …) work.
    function create(el) {
        if (NDS.Stepper._stamp) NDS.Stepper._stamp(el);
        const stepper = new NDSStepper(el);
        el.setAttribute('data-nds-stepper-initialized', 'true');
        el.ndsStepper = stepper;
        if (el.id) steppers.set(el.id, stepper);
        return stepper;
    }

    // Run full instance init synchronously on half-load BEFORE _installBehavior
    // so the replayed methods can find instances via the `steppers` Map.
    _initInstances();

    NDS.Stepper._installBehavior(function (target) {
        return {
            // Build-only contract: every name here MUST match a trap on the
            // shell's `behavior` dispatch (assert_trap_coverage! enforces it
            // both directions). _installBehavior strips this array before
            // Object.assigning so it never leaks onto the public surface.
            __deferred: ['reinit', 'create', 'get', 'getFallback', 'next', 'previous', 'goTo', 'control', 'setFallback'],

            reinit: _initInstances,
            create,
            get,
            getFallback,
            control,
            next:        (id) => control(id, 'next'),
            previous:    (id) => control(id, 'previous'),
            goTo:        (id, step) => control(id, 'goto', step),
            setFallback: (id, variant) => {
                const s = get(id);
                if (s) s.setFallback(variant);
            },
        };
    });
})();
