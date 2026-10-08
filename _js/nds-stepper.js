/* NDS.Stepper — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Stepper.init() / .reinit()        stamp the steps, wire the delegated control listener
 *   NDS.Stepper.create(el)                instance one stepper
 *   NDS.Stepper.get(id)                   the instance for that stepper id
 *   NDS.Stepper.next(id) / .previous(id)  move one step
 *   NDS.Stepper.goTo(id, step)            move to a step number
 *   NDS.Stepper.control(id, action, val)  the same entry point the buttons use
 *                                         (action: next | previous | goto)
 * Events (bubble from the .nds-stepper):
 *   nds:stepper:change   detail {currentStep, totalSteps, progressPercentage}
 * Hooks:
 *   data-current · data-total   on the .nds-stepper — live: write either and the display
 *                               re-stamps itself
 *   data-stepper-control        on a button: next | previous | goto
 *   data-stepper-target         the stepper id that button drives
 *   data-stepper-value          the step number for a goto
 * Gotchas:
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
 *     The form owns that click. NDS.Init.audit() reports the shape.
 *   - Radial HIDES every step but the current one (or the last, once completed), so a
 *     stepper with no JS would paint EMPTY. _stepper.scss carries a pre-init skeleton keyed on the stepper's
 *     own data-nds-stepper-initialized stamp, which force-shows the first step until init
 *     lands. Do not remove that stamp or the guard rules that read it.
 */
/**
 * NDS Stepper Component
 *
 * Delegated (rides nds-delegated.min.js, injected after the reveal). First paint
 * is CSS-owned via the pre-init skeleton; init swaps placeholders for the stamped
 * states in place. All of its work is cold (no layout reads):
 *   - data-state stamping on every .nds-stepper-step (radial CSS hides any
 *     non-current step via display:none — without this, radial paints EMPTY).
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

    function _stampSteps(el) {
        const current = parseInt(el.dataset.current) || 1;
        const steps = el.querySelectorAll('.nds-stepper-step');
        for (let i = 0; i < steps.length; i++) {
            const n = i + 1;
            const state = n < current ? 'completed' : (n === current ? 'current' : 'upcoming');
            if (NDS.State.get(steps[i]) !== state) NDS.State.set(steps[i], state);
        }
    }

    // Write the progress display onto `el`: --current-step / --total-steps CSS
    // vars + the .nds-progress-number percentage + the "n / total" label. Shared
    // by first-paint _stampProgress (queries the targets fresh) and the instance
    // updateProgressDisplay (passes its cached refs) so both stay in lockstep.
    function _writeProgress(el, current, total, number, text) {
        el.style.setProperty('--current-step', Math.min(current, total));
        el.style.setProperty('--total-steps', total);
        if (number) number.textContent = Math.min(100, Math.round((current / total) * 100));
        if (text) text.textContent = `${Math.min(current, total)} / ${total}`;
    }

    function _stampProgress(el) {
        const current = parseInt(el.dataset.current) || 1;
        const total = parseInt(el.dataset.total) || el.querySelectorAll('.nds-stepper-step').length;
        if (!total) return;
        _writeProgress(el, current, total,
            el.querySelector('.nds-progress-number'),
            el.querySelector('.nds-progress-steps'));
    }

    // Stamp every first-paint visual on `el`. Used by init() at page load
    // AND by create(el) so dynamically-injected steppers get the same
    // treatment as authored ones. Idempotent; safe to re-run.
    function _stamp(el) {
        _stampSteps(el);
        _stampProgress(el);
        el.setAttribute('data-nds-stepper-stamped', '');
    }

    function _wireGlobals() {
        if (_globalsWired) return;
        _globalsWired = true;

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

            // Reconcile state with the first-paint stamping. Idempotent when
            // already stamped correctly; needed when authors mutate data-current
            // after init or when an instance is created dynamically via
            // NDS.Stepper.create(el) on un-stamped markup.
            this.updateProgress();
            this.syncStepStates();
        }

        isValidStep(stepNumber) {
            return stepNumber >= 1 && stepNumber <= this.totalSteps;
        }

        destroy() {
            const el = this.element;
            if (el.id) steppers.delete(el.id);
            delete el.ndsStepper;
            el.removeAttribute('data-nds-stepper-initialized');
            el.removeAttribute('data-nds-stepper-stamped');
            // Shared module-level data-current observer stays — it serves
            // remaining steppers. _initInstances releases it en bloc on its
            // next call (reinit / SPA navigation).
        }

        getCurrentStep() {
            const dataStep = parseInt(this.element.dataset.current);
            // One past the last step is the completed flow.
            if (dataStep >= 1) return Math.min(dataStep, this.steps.length + 1);
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
            // Past the last step only: arriving on it leaves it current. next() marks it done.
            if (this.currentStep > this.totalSteps) {
                NDS.State.add(this.element, 'completed');
            } else {
                NDS.State.remove(this.element, 'completed');
            }

            _writeProgress(this.element, this.currentStep, this.totalSteps,
                this.progressNumber, this.progressText);
        }

        syncStepStates() {
            const allCompleted = this.currentStep > this.totalSteps;

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

            // On the last step, next() completes the flow
            if (isLastStep) {
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

            // Un-complete last step instead of going back
            if (isLastStep) {
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

    // Walk every .nds-stepper not yet wired to a class instance, construct,
    // register on the element + id-keyed map, then (re-)register the shared
    // data-current/data-total NDS.onAttrChange observer. Stored handle is
    // released before re-register so re-running this (via reinit / SPA
    // navigation) doesn't stack subscriptions.
    function _initInstances() {
        document.querySelectorAll('.nds-stepper:not([data-nds-stepper-initialized])').forEach(element => {
            if (element.closest('code')) return;

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

    function get(id) {
        return steppers.get(id);
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
    // so dynamically-injected steppers get data-state + progress-display in one call.
    // Registers on the element + id-keyed Map so subsequent get(id)/control(id, …) work.
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
            if (el.closest('code')) return;
            _stamp(el);
        });
        _wireGlobals();
        _initInstances();
    }

    NDS.Stepper = {
        init,
        // init is idempotent end to end (stamp loop, _wireGlobals guard, and
        // _initInstances all self-skip), and an injected stepper needs the stamp
        // and the delegated [data-stepper-control] listener, not just an instance.
        reinit:      init,
        create,
        get,
        next:        (id) => control(id, 'next'),
        previous:    (id) => control(id, 'previous'),
        goTo:        (id, step) => control(id, 'goto', step),
        control,
    };
})();
