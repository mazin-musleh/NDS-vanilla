/**
 * NDS Stepper Component - Simplified Version
 * Cleaner, more straightforward stepper functionality
 */

(function() {
    'use strict';

    class NDSStepper {
        constructor(element) {
            this.element = element;
            this.steps = element.querySelectorAll('.nds-stepper-step');
            this.progressNumber = element.querySelector('.progress-number');
            this.progressText = element.querySelector('.progress-text');

            this.currentStep = this.getCurrentStep();
            this.totalSteps = this.steps.length;

            this.init();
        }

        init() {
            this.updateProgress();
            this.syncStepStates();
            this.setupControls();
        }

        getCurrentStep() {
            const dataStep = parseInt(this.element.dataset.current);
            if (dataStep >= 1 && dataStep <= this.steps.length) return dataStep;

            const currentElement = this.element.querySelector('.current');
            return currentElement ? Array.from(this.steps).indexOf(currentElement) + 1 : 1;
        }

        updateProgress() {
            const percentage = Math.round((this.currentStep / this.totalSteps) * 100);

            // Update data attributes
            this.element.dataset.current = this.currentStep;
            this.element.dataset.total = this.totalSteps;

            // Update CSS custom properties for calculations
            this.element.style.setProperty('--current-step', this.currentStep);
            this.element.style.setProperty('--total-steps', this.totalSteps);

            // Update progress display
            if (this.progressNumber) {
                this.progressNumber.textContent = percentage;
            }

            if (this.progressText) {
                const isRTL = document.documentElement.dir === 'rtl';
                const stepText = isRTL ?
                    `${this.currentStep} من ${this.totalSteps}` :
                    `${this.currentStep} of ${this.totalSteps}`;
                this.progressText.innerHTML = stepText;
            }
        }

        syncStepStates() {
            this.steps.forEach((step, index) => {
                const stepNumber = index + 1;

                // Remove all state classes
                step.classList.remove('completed', 'current', 'upcoming');

                // Add appropriate state
                if (stepNumber < this.currentStep) {
                    step.classList.add('completed');
                } else if (stepNumber === this.currentStep) {
                    step.classList.add('current');
                } else {
                    step.classList.add('upcoming');
                }
            });
        }

        goTo(stepNumber) {
            if (stepNumber < 1 || stepNumber > this.totalSteps) return false;

            this.currentStep = stepNumber;
            this.updateProgress();
            this.syncStepStates();
            this.dispatchEvent();
            return true;
        }

        next() {
            return this.goTo(this.currentStep + 1);
        }

        previous() {
            return this.goTo(this.currentStep - 1);
        }

        setState(stepNumber, state) {
            const step = this.steps[stepNumber - 1];
            if (!step) return false;

            step.classList.remove('error', 'warning');
            if (state === 'error' || state === 'warning') {
                step.classList.add(state);
            }
            return true;
        }

        setupControls() {
            // Global event delegation for stepper controls
            if (!window.ndsStepperControlsSetup) {
                document.addEventListener('click', (e) => {
                    const control = e.target.closest('[data-stepper-control]');
                    if (!control) return;

                    e.preventDefault();
                    const action = control.dataset.stepperControl;
                    const value = control.dataset.stepperValue;

                    // Find the target stepper with enhanced targeting
                    let targetStepper;
                    const targetId = control.dataset.stepperTarget;

                    if (targetId) {
                        // Explicit targeting with data-stepper-target
                        targetStepper = document.getElementById(targetId);
                    } else {
                        // Fallback: closest stepper or first stepper on page
                        targetStepper = control.closest('.nds-stepper') || document.querySelector('.nds-stepper');
                    }

                    const stepperInstance = targetStepper?.ndsStepperInstance;
                    if (!stepperInstance) return;

                    switch (action) {
                        case 'next': stepperInstance.next(); break;
                        case 'previous': stepperInstance.previous(); break;
                        case 'goto': stepperInstance.goTo(parseInt(value)); break;
                    }
                });
                window.ndsStepperControlsSetup = true;
            }
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

    // Simple global API
    const steppers = new Map();

    function init() {
        document.querySelectorAll('.nds-stepper:not([data-initialized])').forEach(element => {
            if (element.closest('code, .code-example')) return;

            const stepper = new NDSStepper(element);
            element.setAttribute('data-initialized', 'true');
            element.ndsStepperInstance = stepper;

            if (element.id) {
                steppers.set(element.id, stepper);
            }
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
            case 'state': return stepper.setState(value.step, value.state);
            default: return false;
        }
    }

    // Expose simplified global API
    window.NDSStepper = {
        init,
        get,
        control,
        // Convenience methods
        next: (id) => control(id, 'next'),
        previous: (id) => control(id, 'previous'),
        goTo: (id, step) => control(id, 'goto', step),
        setState: (id, step, state) => control(id, 'state', { step, state })
    };

    // Auto-initialize on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

/**
 * Simplified Usage:
 *
 * // HTML: <div class="nds-stepper" id="my-stepper">...</div>
 *
 * // Method 1: Global API (Recommended)
 * NDSStepper.next('my-stepper');
 * NDSStepper.previous('my-stepper');
 * NDSStepper.goTo('my-stepper', 3);
 * NDSStepper.setState('my-stepper', 2, 'error');
 *
 * // Method 2: Get instance by ID
 * const stepper = NDSStepper.get('my-stepper');
 * stepper.next();
 * stepper.goTo(3);
 * console.log(stepper.current, stepper.total, stepper.progress);
 *
 * // Control Buttons with Targeting
 * // Inside stepper (automatic targeting)
 * // <button data-stepper-control="next">Next</button>
 *
 * // Outside stepper (explicit targeting)
 * // <button data-stepper-control="next" data-stepper-target="stepper-1">Next for Stepper 1</button>
 * // <button data-stepper-control="goto" data-stepper-value="3" data-stepper-target="stepper-2">Go to Step 3</button>
 *
 * // Listen for changes
 * document.addEventListener('nds:stepper:change', (e) => {
 *     console.log('Step:', e.detail.currentStep);
 * });
 */