/**
 * NDS Stepper Component - Simplified Version
 * Cleaner, more straightforward stepper functionality
 */

(function () {
    'use strict';

    class NDSStepper {
        constructor(element) {
            this.element = element;
            this.steps = element.querySelectorAll('.nds-stepper-step');
            this.progressNumber = element.querySelector('.nds-progress-number');
            this.progressText = element.querySelector('.nds-progress-text');

            // Cache radial check
            this.isRadial = element.classList.contains('nds-radial');

            this.currentStep = this.getCurrentStep();
            this.totalSteps = this.steps.length;

            this.init();
        }

        init() {
            this.setupObserver();
            this.updateProgress();
            this.syncStepStates();
            this.setupControls();
        }

        setupObserver() {
            this.isInternalUpdate = false;

            this.observer = new MutationObserver(() => {
                if (this.isInternalUpdate) return;

                const newCurrent = parseInt(this.element.dataset.current);
                const newTotal = parseInt(this.element.dataset.total);
                let changed = false;

                // Check if total steps changed externally first
                if (newTotal > 0 && newTotal !== this.totalSteps) {
                    this.totalSteps = newTotal;
                    this.steps = this.element.querySelectorAll('.nds-stepper-step');
                    changed = true;
                }

                // Check if current step changed externally
                if (newCurrent >= 1 && newCurrent !== this.currentStep) {
                    // For radial steppers: clamp to totalSteps
                    // For non-radial: allow currentStep > totalSteps for completion state
                    this.currentStep = this.isRadial ? Math.min(newCurrent, this.totalSteps) : newCurrent;
                    changed = true;
                }

                if (changed) {
                    this.updateProgressDisplay();
                    this.syncStepStates();
                    this.dispatchEvent();
                }
            });

            this.observer.observe(this.element, {
                attributes: true,
                attributeFilter: ['data-current', 'data-total']
            });
        }

        isValidStep(stepNumber) {
            return stepNumber >= 1 && stepNumber <= this.totalSteps;
        }

        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
        }

        getCurrentStep() {
            const dataStep = parseInt(this.element.dataset.current);
            if (dataStep >= 1 && dataStep <= this.steps.length) return dataStep;

            const currentElement = this.element.querySelector('[data-state~="current"]');
            return currentElement ? Array.from(this.steps).indexOf(currentElement) + 1 : 1;
        }

        updateProgress() {
            this.isInternalUpdate = true;
            this.element.dataset.current = this.currentStep;
            this.element.dataset.total = this.totalSteps;
            this.updateProgressDisplay();

            // Reset flag using microtask queue
            Promise.resolve().then(() => {
                this.isInternalUpdate = false;
            });
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
                const isRTL = NDS.isRTL;
                const displayCurrent = Math.min(this.currentStep, this.totalSteps);
                this.progressText.innerHTML = isRTL ?
                    `${displayCurrent} / ${this.totalSteps}` :
                    `${displayCurrent} / ${this.totalSteps}`;
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
            default: return false;
        }
    }

    // Expose simplified global API
    NDS.Stepper = {
        init,
        get,
        control,
        // Convenience methods
        next: (id) => control(id, 'next'),
        previous: (id) => control(id, 'previous'),
        goTo: (id, step) => control(id, 'goto', step)
    };

    // Auto-initialize on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

/**
 * NDS Stepper Usage Guide
 *
 * ========================================
 * BASIC HTML STRUCTURE
 * ========================================
 *
 * Linear/Vertical Stepper:
 * <div class="nds-stepper" id="my-stepper" data-current="1" data-total="3">
 *   <div class="nds-stepper-step">
 *     <div class="nds-stepper-base">
 *       <div class="nds-stepper-circle" data-step-text="1"></div>
 *     </div>
 *     <div class="nds-stepper-content">
 *       <div class="nds-stepper-text">
 *         <span class="nds-stepper-title">Step Title</span>
 *         <span class="nds-stepper-description">Step description</span>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
 * Radial Stepper (with progress circle):
 * <div class="nds-stepper nds-radial" id="radial-stepper" data-current="1" data-total="4">
 *   <div class="nds-progress-circle">
 *     <svg width="64" height="64" viewBox="0 0 24 24">
 *       <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
 *       <circle class="nds-progress-bar" cx="12" cy="12" r="10" fill="none" stroke-width="3"
 *         stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
 *     </svg>
 *     <div class="nds-progress-info">
 *       <span class="nds-progress-percentage">
 *         <span class="nds-progress-number">0</span>
 *       </span>
 *       <span class="nds-progress-text"></span>
 *     </div>
 *   </div>
 *   <!-- Steps here -->
 * </div>
 *
 * ========================================
 * JAVASCRIPT API
 * ========================================
 *
 * Method 1: Global API (Recommended)
 * NDSStepper.next('my-stepper');
 * NDSStepper.previous('my-stepper');
 * NDSStepper.goTo('my-stepper', 3);
 *
 * Method 2: Get instance by ID
 * const stepper = NDSStepper.get('my-stepper');
 * stepper.next();
 * stepper.previous();
 * stepper.goTo(3);
 * console.log(stepper.current, stepper.total, stepper.progress);
 *
 * ========================================
 * DATA ATTRIBUTE CONTROL (NEW!)
 * ========================================
 *
 * Control stepper via data attributes (automatically synced):
 * const stepper = document.getElementById('my-stepper');
 *
 * // Update current step
 * stepper.dataset.current = '2';  // Moves to step 2
 *
 * // Complete stepper (linear only - sets all steps completed)
 * stepper.dataset.current = '4';  // On 3-step stepper = all completed
 *
 * // Note: Radial steppers clamp to totalSteps
 * radialStepper.dataset.current = '4';  // On 3-step = clamped to 3
 *
 * ========================================
 * CONTROL BUTTONS
 * ========================================
 *
 * Inside stepper (automatic targeting):
 * <button data-stepper-control="next">Next</button>
 * <button data-stepper-control="previous">Previous</button>
 *
 * Outside stepper (explicit targeting):
 * <button data-stepper-control="next" data-stepper-target="stepper-1">
 *   Next for Stepper 1
 * </button>
 * <button data-stepper-control="goto" data-stepper-value="3" data-stepper-target="stepper-2">
 *   Go to Step 3
 * </button>
 *
 * ========================================
 * EVENT LISTENERS
 * ========================================
 *
 * Listen for step changes:
 * document.addEventListener('nds:stepper:change', (e) => {
 *   console.log('Current Step:', e.detail.currentStep);
 *   console.log('Total Steps:', e.detail.totalSteps);
 *   console.log('Progress:', e.detail.progressPercentage + '%');
 * });
 *
 * ========================================
 * LINEAR vs RADIAL BEHAVIOR
 * ========================================
 *
 * LINEAR STEPPERS:
 * - Allow currentStep > totalSteps (marks all completed)
 * - Clicking next() on last step marks it completed
 * - Clicking previous() on completed last step un-completes it
 * - Perfect for multi-step forms and registration flows
 *
 * RADIAL STEPPERS (.nds-radial):
 * - Clamp currentStep to totalSteps (cannot exceed)
 * - Normal next/previous navigation only
 * - No automatic completion behavior
 * - Maintains controlled circular progression
 *
 * ========================================
 * PERFORMANCE FEATURES
 * ========================================
 *
 * - Cached radial check (no repeated classList.contains())
 * - MutationObserver for automatic data-attribute sync
 * - Efficient microtask queue flag management
 * - Optimized for multiple steppers on same page
 * - Zero infinite loops with isInternalUpdate flag
 */