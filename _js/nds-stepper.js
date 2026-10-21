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
 *     data-current/data-total NDS.onAttrChange observer, shared by every stepper.
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
        NDS.onAttrChange('.nds-stepper', ['data-current', 'data-total'], elements => {
            elements.forEach(el => {
                const stepper = el.ndsStepper;
                if (!stepper) return;

                const newCurrent = parseInt(el.dataset.current);
                const newTotal = parseInt(el.dataset.total);
                let changed = false;

                if (newTotal > 0 && newTotal !== stepper.totalSteps) {
                    stepper.totalSteps = newTotal;
                    stepper.steps = el.querySelectorAll('.nds-stepper-step');
                    changed = true;
                }

                if (newCurrent >= 1 && newCurrent !== stepper.currentStep) {
                    stepper.currentStep = Math.min(newCurrent, stepper.totalSteps + 1);
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

    class NdsStepper {
        constructor(element) {
            this.element = element;
            this.steps = element.querySelectorAll('.nds-stepper-step');
            this.ring = element.querySelector('.nds-progress-circle');
            this.progressNumber = element.querySelector('.nds-progress-number');
            this.progressText = element.querySelector('.nds-progress-steps');

            this.currentStep = this.getCurrentStep();
            this.totalSteps = this.steps.length;

            // First paint: the step states and the progress display.
            this.updateProgress();
            this.syncStepStates();
        }

        // One past the last step is the completed flow, the same state data-current writes.
        isValidStep(stepNumber) {
            return stepNumber >= 1 && stepNumber <= this.totalSteps + 1;
        }

        destroy() {
            const el = this.element;
            delete el.ndsStepper;
            el.removeAttribute('data-nds-stepper-initialized');
            // The shared control listener and data-current observer stay — they serve every stepper.
        }

        getCurrentStep() {
            const dataStep = parseInt(this.element.dataset.current);
            // One past the last step is the completed flow.
            return dataStep >= 1 ? Math.min(dataStep, this.steps.length + 1) : 1;
        }

        updateProgress() {
            this.element.dataset.current = this.currentStep;
            this.element.dataset.total = this.totalSteps;
            this.updateProgressDisplay();
        }

        updateProgressDisplay() {
            // Past the last step only: arriving on it leaves it current. next() moves past it.
            if (this.currentStep > this.totalSteps) {
                NDS.state.add(this.element, 'completed');
            } else {
                NDS.state.remove(this.element, 'completed');
            }

            const percent = Math.min(100, (this.currentStep / this.totalSteps) * 100);
            // Only the radial ring draws it, so a stepper with no ring carries no inline style.
            if (this.ring) this.ring.style.setProperty('--progress-value', percent);
            if (this.progressNumber) this.progressNumber.textContent = Math.round(percent);
            if (this.progressText) this.progressText.textContent = `${Math.min(this.currentStep, this.totalSteps)} / ${this.totalSteps}`;
        }

        syncStepStates() {
            if (this.element.classList.contains('nds-static')) return;
            const allCompleted = this.currentStep > this.totalSteps;

            this.steps.forEach((step, index) => {
                const stepNumber = index + 1;

                if (allCompleted || stepNumber < this.currentStep) {
                    NDS.state.set(step, 'completed');
                } else if (stepNumber === this.currentStep) {
                    NDS.state.set(step, 'current');
                } else {
                    NDS.state.set(step, 'upcoming');
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
            return this.goTo(this.currentStep + 1);
        }

        prev() {
            return this.goTo(this.currentStep - 1);
        }

        dispatchEvent() {
            this.element.dispatchEvent(new CustomEvent('nds:stepper:change', {
                detail: {
                    currentStep: this.currentStep,
                    totalSteps: this.totalSteps,
                    progressPercentage: this.progress
                },
                bubbles: true
            }));
        }

        // Simple getters
        get current() { return this.currentStep; }
        get total() { return this.totalSteps; }
        get progress() { return Math.min(100, Math.round((this.currentStep / this.totalSteps) * 100)); }
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
