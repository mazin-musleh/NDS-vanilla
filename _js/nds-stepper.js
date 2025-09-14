/**
 * NDS Stepper Component
 * Progress stepper functionality with radial progress support
 * Updates progress numbers and stepper states dynamically
 */

(function() {
    'use strict';

    class NDSStepper {
        constructor(stepperContainer) {
            this.stepperContainer = stepperContainer;
            this.steps = Array.from(stepperContainer.querySelectorAll('.nds-stepper-step'));
            this.progressCircle = stepperContainer.querySelector('.progress-circle');
            this.progressNumber = stepperContainer.querySelector('.progress-number');
            this.progressText = stepperContainer.querySelector('.progress-text');
            this.progressBar = stepperContainer.querySelector('.progress-bar');

            if (this.steps.length === 0) {
                console.warn('NDS Stepper: No steps found');
                return;
            }

            this.currentStep = this.getCurrentStepIndex();
            this.totalSteps = this.steps.length;
            this.init();
        }

        init() {
            this.updateStepperData();
            this.updateProgressDisplay();
            this.setupEventListeners();
            this.syncStepStates();
        }

        getCurrentStepIndex() {
            // First check if data-current attribute exists on container
            const dataCurrentStep = parseInt(this.stepperContainer.getAttribute('data-current'), 10);
            if (dataCurrentStep && dataCurrentStep >= 1 && dataCurrentStep <= this.steps.length) {
                return dataCurrentStep;
            }

            // Fallback to finding element with 'current' class
            const currentStepElement = this.steps.find(step => step.classList.contains('current'));
            return currentStepElement ? this.steps.indexOf(currentStepElement) + 1 : 1;
        }

        updateStepperData() {
            // Calculate progress percentage
            const progressPercentage = Math.round((this.currentStep / this.totalSteps) * 100);

            // Update CSS custom properties for radial stepper
            this.stepperContainer.style.setProperty('--current-step', this.currentStep);
            this.stepperContainer.style.setProperty('--total-steps', this.totalSteps);
            this.stepperContainer.style.setProperty('--progress-percentage', progressPercentage);

            // Update data attributes for compatibility
            this.stepperContainer.setAttribute('data-current', this.currentStep);
            this.stepperContainer.setAttribute('data-total', this.totalSteps);
        }

        updateProgressDisplay() {
            // Calculate progress percentage for progress bar
            const progressPercentage = Math.round((this.currentStep / this.totalSteps) * 100);

            // Simple check for Arabic - delay to handle language switching
            setTimeout(() => {
                const isArabic = document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl';
                const stepDisplay = isArabic
                    ? `<span class="step-number">${this.currentStep}</span><span class="step-text">من</span><span class="step-number">${this.totalSteps}</span>`
                    : `<span class="step-number">${this.currentStep}</span><span class="step-text">of</span><span class="step-number">${this.totalSteps}</span>`;

                if (this.progressNumber) {
                    this.progressNumber.textContent = progressPercentage;
                }
                if (this.progressText) {
                    this.progressText.innerHTML = stepDisplay;
                }
            }, 100);

            // Update radial progress bar if present
            if (this.progressBar) {
                const circumference = 2 * Math.PI * 10; // radius is 10 from SVG
                const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;
                this.progressBar.style.strokeDashoffset = strokeDashoffset;
            }
        }

        syncStepStates() {
            // Ensure step states are correctly applied based on current step
            this.steps.forEach((step, index) => {
                step.classList.remove('completed', 'current', 'upcoming');

                if (index + 1 < this.currentStep) {
                    step.classList.add('completed');
                } else if (index + 1 === this.currentStep) {
                    step.classList.add('current');
                } else {
                    step.classList.add('upcoming');
                }
            });
        }

        goToStep(stepIndex) {
            if (stepIndex < 1 || stepIndex > this.totalSteps || stepIndex === this.currentStep) {
                return;
            }

            this.currentStep = stepIndex;
            this.syncStepStates();
            this.updateStepperData();
            this.updateProgressDisplay();
            this.dispatchStepChangeEvent();
        }

        nextStep() {
            if (this.currentStep < this.totalSteps) {
                this.goToStep(this.currentStep + 1);
            }
        }

        previousStep() {
            if (this.currentStep > 1) {
                this.goToStep(this.currentStep - 1);
            }
        }

        setStepState(stepIndex, state) {
            if (stepIndex < 1 || stepIndex > this.totalSteps) {
                return;
            }

            const step = this.steps[stepIndex - 1];
            if (!step) return;

            // Remove existing state classes
            step.classList.remove('completed', 'current', 'upcoming', 'error', 'warning');

            // Add new state
            if (['completed', 'current', 'upcoming', 'error', 'warning'].includes(state)) {
                step.classList.add(state);
            }

            this.dispatchStepChangeEvent();
        }

        setupEventListeners() {
            // Listen for stepper control events using event delegation
            document.addEventListener('click', (e) => {
                // Find the closest element with data-stepper-control (supports nested elements like spans)
                const controlButton = e.target.closest('[data-stepper-control]');

                if (controlButton) {
                    e.preventDefault();
                    const action = controlButton.getAttribute('data-stepper-control');
                    const value = controlButton.getAttribute('data-stepper-value');

                    // Find the associated stepper - check if button is in the same demo card
                    const demoCard = controlButton.closest('.nds-demo-card');
                    const associatedStepper = demoCard ? demoCard.querySelector('.nds-stepper') : null;

                    // Only handle if this is the associated stepper for the clicked button
                    if (associatedStepper === this.stepperContainer) {
                        switch (action) {
                            case 'goto':
                                this.goToStep(parseInt(value, 10));
                                break;
                            case 'next':
                                this.nextStep();
                                break;
                            case 'previous':
                                this.previousStep();
                                break;
                            case 'state':
                                const stepIndex = parseInt(controlButton.getAttribute('data-step-index'), 10);
                                this.setStepState(stepIndex, value);
                                break;
                        }
                    }
                }
            });
        }

        dispatchStepChangeEvent() {
            const event = new CustomEvent('nds:stepper:change', {
                detail: {
                    currentStep: this.currentStep,
                    totalSteps: this.totalSteps,
                    currentStepElement: this.steps[this.currentStep - 1],
                    progressPercentage: Math.round((this.currentStep / this.totalSteps) * 100)
                },
                bubbles: true
            });

            this.stepperContainer.dispatchEvent(event);
        }

        // Public API methods
        getCurrentStep() {
            return this.currentStep;
        }

        getTotalSteps() {
            return this.totalSteps;
        }

        getProgressPercentage() {
            return Math.round((this.currentStep / this.totalSteps) * 100);
        }

        destroy() {
            // Remove event listeners and clean up
            this.stepperContainer.replaceWith(this.stepperContainer.cloneNode(true));
        }
    }

    // Auto-initialize steppers on page load
    function initializeSteppers() {
        const stepperContainers = document.querySelectorAll('.nds-stepper');

        stepperContainers.forEach(container => {
            // Skip elements inside code examples
            if (container.closest('code, .code-example')) {
                return;
            }

            if (!container.hasAttribute('data-nds-stepper-initialized')) {
                const stepperInstance = new NDSStepper(container);
                container.ndsStepperInstance = stepperInstance;
                container.setAttribute('data-nds-stepper-initialized', 'true');
            }
        });
    }

    // Re-initialize when new content is added
    function reinitializeSteppers() {
        initializeSteppers();
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.NDSStepper = {
            init: initializeSteppers,
            reinit: reinitializeSteppers,
            create: (container) => new NDSStepper(container)
        };
    }

    // Export for modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSStepper;
    }

    // Note: Initialization now handled by nds-init.js unified system
})();

/**
 * Usage Examples:
 *
 * // Auto-initialization (happens automatically)
 * // Just add the HTML structure with .nds-stepper class
 *
 * // Manual initialization
 * const stepperElement = document.querySelector('#myStepper');
 * const stepperInstance = NDSStepper.create(stepperElement);
 *
 * // Navigation methods
 * stepperInstance.nextStep();
 * stepperInstance.previousStep();
 * stepperInstance.goToStep(3);
 *
 * // State management
 * stepperInstance.setStepState(2, 'error');
 * stepperInstance.setStepState(1, 'completed');
 *
 * // Get current state
 * const currentStep = stepperInstance.getCurrentStep();
 * const totalSteps = stepperInstance.getTotalSteps();
 * const progress = stepperInstance.getProgressPercentage();
 *
 * // Listen for step changes
 * document.addEventListener('nds:stepper:change', (e) => {
 *     console.log('Step changed to:', e.detail.currentStep);
 *     console.log('Progress:', e.detail.progressPercentage + '%');
 *     console.log('Current element:', e.detail.currentStepElement);
 * });
 *
 * // Control buttons (data attributes)
 * // <button data-stepper-control="next">Next</button>
 * // <button data-stepper-control="previous">Previous</button>
 * // <button data-stepper-control="goto" data-stepper-value="3">Go to Step 3</button>
 * // <button data-stepper-control="state" data-step-index="2" data-stepper-value="error">Mark Error</button>
 *
 * // Reinitialize after dynamic content changes
 * NDSStepper.reinit();
 */