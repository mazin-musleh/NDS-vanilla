/* NDS.Stepper — public surface
 * Rides: (none — base component)
 * Requires:
 *   .nds-stepper needs .nds-stepper-step — there are no steps
 * Methods:
 *   NDS.Stepper.init() / .reinit()        instance every stepper, wire the delegated control listener
 *   NDS.Stepper.create(el)                instance one stepper
 *   NDS.Stepper.destroy(el)               undo create(); an id works too
 *   NDS.Stepper.getInstance(idOrEl)       the stepper's instance, or null
 *   NDS.Stepper.next(idOrEl) / .prev(idOrEl)  move one step
 *   NDS.Stepper.goTo(idOrEl, step)        move to a step number; one past the last completes the flow
 *   NDS.Stepper.control(idOrEl, action, val)  the same entry point the buttons use
 *                                         (action: next | previous | goto)
 *   instance.current / .total / .progress   read-only: step number, step count, percent
 * Events (bubble from the .nds-stepper):
 *   nds:stepper:change   detail {currentStep, totalSteps, progressPercentage}
 *                        (currentStep is totalSteps + 1 once the flow is completed)
 * Hooks:
 *   data-current · data-total   on the .nds-stepper — live: write either and the display
 *                               re-stamps itself
 *   data-stepper-control        on a button: next | previous | goto
 *   data-stepper-target         the stepper id that button drives
 *   data-stepper-value          the step number for a goto
 * Gotchas:
 *   - nds-static gets no step states: data-current and the movers change nothing on screen.
 *   - Give the stepper an id. A control resolves its target from data-stepper-target, then
 *     the closest .nds-stepper, then the first one on the page.
 *   - The layout is CSS alone: nds-vertical / nds-radial (the desktop layout), overridden on
 *     phones and tablets by nds-{horizontal|vertical|radial}-{sm|md}. The script never reads or writes them,
 *     so completion behaves the same in every layout.
 *   - data-stepper-control is an UNCONDITIONAL mover: click, move, no question asked.
 *     Right for Back, demos and walkthroughs. For a move something can refuse —
 *     validation, a request, a server check — call NDS.Stepper.next() from whatever
 *     knows the answer. Forms are always that case.
 *   - A submit-typed control inside a form is HANDED OFF: no preventDefault, no move.
 *     The form owns that click. NDS.init.audit() reports the shape.
 *   - Radial HIDES every step but the current one (or the last, once completed), so a
 *     stepper with no JS would paint EMPTY. _stepper.scss carries a pre-init skeleton keyed on the stepper's
 *     own data-nds-stepper-initialized stamp, which force-shows the first step until init
 *     lands. Do not remove that stamp or the guard rules that read it.
 */
/**
 * NDS Stepper Component
 *
 * Delegated (rides nds-delegated.min.js, injected after the reveal). First paint
 * is CSS-owned via the pre-init skeleton; the constructor swaps placeholders for
 * the stamped states in place. All of its work is cold (no layout reads):
 *   - data-state stamping on every .nds-stepper-step (radial CSS hides any
 *     non-current step via display:none — without this, radial paints EMPTY).
 *   - Progress display: --progress-value on the ring, when there is one (Progress draws the arc) +
 *     .nds-progress-number + .nds-progress-steps text.
 *   - One delegated document click listener for [data-stepper-control] and one
 *     data-current/data-total NDS.onAttributeChange observer, shared by every stepper.
 */

(function () {
    'use strict';

    let globalsWired = false;

    // Page-wide and shared by every stepper, so create(el) wires them too.
    function addGlobalListeners() {
        if (globalsWired) return;
        globalsWired = true;

        // Delegated click listener — one per page.
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-stepper-control]');
            if (!btn) return;
            // A submit-typed control inside a form belongs to that form, not to us.
            // btn.type is 'submit' for a <button> with no type, which is why this is
            // scoped to btn.form — a bare demo button outside a form still works.
            if (btn.form && btn.type === 'submit') return;
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

        // The instance's own writes match its fields, so they change nothing here.
        NDS.onAttributeChange('.nds-stepper', ['data-current', 'data-total'], elements => {
            elements.forEach(el => {
                const stepper = el.ndsStepper;
                if (!stepper) return;

                const newCurrent = parseInt(el.dataset.current);
                const newTotal = parseInt(el.dataset.total);
                let changed = false;

                if (newTotal > 0 && newTotal !== stepper._totalSteps) {
                    stepper._totalSteps = newTotal;
                    stepper._steps = el.querySelectorAll('.nds-stepper-step');
                    changed = true;
                }

                if (newCurrent >= 1 && newCurrent !== stepper._currentStep) {
                    stepper._currentStep = Math.min(newCurrent, stepper._totalSteps + 1);
                    changed = true;
                }

                if (changed) {
                    stepper._syncProgressDisplay();
                    stepper._syncStepStates();
                    stepper._dispatchEvent();
                }
            });
        });
    }

    class NdsStepper {
        constructor(element) {
            this._element = element;
            this._steps = element.querySelectorAll('.nds-stepper-step');
            this._ring = element.querySelector('.nds-progress-circle');
            this._progressNumber = element.querySelector('.nds-progress-number');
            this._progressText = element.querySelector('.nds-progress-steps');

            this._currentStep = this._getCurrentStep();
            this._totalSteps = this._steps.length;

            // First paint: the step states and the progress display.
            this._syncProgress();
            this._syncStepStates();
        }

        // One past the last step is the completed flow, the same state data-current writes.
        _isValidStep(stepNumber) {
            return stepNumber >= 1 && stepNumber <= this._totalSteps + 1;
        }

        destroy() {
            const el = this._element;
            delete el.ndsStepper;
            el.removeAttribute('data-nds-stepper-initialized');
            // The shared control listener and data-current observer stay — they serve every stepper.
        }

        _getCurrentStep() {
            const dataStep = parseInt(this._element.dataset.current);
            // One past the last step is the completed flow.
            return dataStep >= 1 ? Math.min(dataStep, this._steps.length + 1) : 1;
        }

        _syncProgress() {
            this._element.dataset.current = this._currentStep;
            this._element.dataset.total = this._totalSteps;
            this._syncProgressDisplay();
        }

        _syncProgressDisplay() {
            // Past the last step only: arriving on it leaves it current. next() moves past it.
            if (this._currentStep > this._totalSteps) {
                NDS.state.add(this._element, 'completed');
            } else {
                NDS.state.remove(this._element, 'completed');
            }

            const percent = Math.min(100, (this._currentStep / this._totalSteps) * 100);
            // Only the radial ring draws it, so a stepper with no ring carries no inline style.
            if (this._ring) this._ring.style.setProperty('--progress-value', percent);
            if (this._progressNumber) this._progressNumber.textContent = Math.round(percent);
            if (this._progressText) this._progressText.textContent = `${Math.min(this._currentStep, this._totalSteps)} / ${this._totalSteps}`;
        }

        _syncStepStates() {
            if (this._element.classList.contains('nds-static')) return;
            const allCompleted = this._currentStep > this._totalSteps;

            this._steps.forEach((step, index) => {
                const stepNumber = index + 1;

                if (allCompleted || stepNumber < this._currentStep) {
                    NDS.state.set(step, 'completed');
                } else if (stepNumber === this._currentStep) {
                    NDS.state.set(step, 'current');
                } else {
                    NDS.state.set(step, 'upcoming');
                }
            });
        }

        goTo(stepNumber) {
            if (!this._isValidStep(stepNumber)) return false;
            this._currentStep = stepNumber;
            this._syncProgress();
            this._syncStepStates();
            this._dispatchEvent();
            return true;
        }

        next() {
            return this.goTo(this._currentStep + 1);
        }

        prev() {
            return this.goTo(this._currentStep - 1);
        }

        _dispatchEvent() {
            this._element.dispatchEvent(new CustomEvent('nds:stepper:change', {
                detail: {
                    currentStep: this._currentStep,
                    totalSteps: this._totalSteps,
                    progressPercentage: this.progress
                },
                bubbles: true
            }));
        }

        // Simple getters
        get current() { return this._currentStep; }
        get total() { return this._totalSteps; }
        get progress() { return Math.min(100, Math.round((this._currentStep / this._totalSteps) * 100)); }
    }

    // Read off the element, so an unmounted stepper (a framework removing it without destroy()) is gone.
    function getInstance(target) {
        return (typeof target === 'string' ? document.getElementById(target) : target)?.ndsStepper || null;
    }

    function control(target, action, value) {
        const stepper = getInstance(target);
        if (!stepper) return false;

        switch (action) {
            case 'next': return stepper.next();
            case 'previous': return stepper.prev();
            case 'goto': return stepper.goTo(parseInt(value));
            default: return false;
        }
    }

    // A page with no stepper at load never runs init(), so this wires the globals too.
    function create(el) {
        if (el.ndsStepper) return el.ndsStepper;
        addGlobalListeners();
        const stepper = new NdsStepper(el);
        el.setAttribute('data-nds-stepper-initialized', 'true');
        el.ndsStepper = stepper;
        return stepper;
    }

    function init() {
        addGlobalListeners();
        document.querySelectorAll('.nds-stepper:not([data-nds-stepper-initialized])').forEach(el => {
            if (!el.closest('code')) create(el);
        });
    }

    NDS.Stepper = {
        init,
        // init is idempotent (the sweep skips started steppers, addGlobalListeners runs once).
        reinit:      init,
        create,
        destroy: (target) => getInstance(target)?.destroy(),
        getInstance,
        next:        (target) => control(target, 'next'),
        prev:        (target) => control(target, 'previous'),
        goTo:        (target, step) => control(target, 'goto', step),
        control,
    };
})();
