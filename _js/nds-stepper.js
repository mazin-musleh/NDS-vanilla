/**
 * NDS Stepper Component - Simplified Version
 * Cleaner, more straightforward stepper functionality
 */

(function () {
    'use strict';

    let _stepperControlsAC = null;

    class NDSStepper {
        constructor(element) {
            this.element = element;
            this.steps = element.querySelectorAll('.nds-stepper-step');
            this.progressNumber = element.querySelector('.nds-progress-number');
            this.progressText = element.querySelector('.nds-progress-steps');

            this.currentStep = this.getCurrentStep();
            this.totalSteps = this.steps.length;

            this.init();
        }

        // Live getter so responsive class toggling stays consistent with
        // completion logic — setupResponsiveLayout flips the class on resize.
        get isRadial() {
            return this.element.classList.contains('nds-radial');
        }

        init() {
            this.setupObserver();
            this.updateProgress();
            this.syncStepStates();
            this.setupControls();
            this.setupResponsiveLayout();
        }

        setupObserver() {
            this.isInternalUpdate = false;
        }

        isValidStep(stepNumber) {
            return stepNumber >= 1 && stepNumber <= this.totalSteps;
        }

        destroy() {
            if (this._offLayoutResize) this._offLayoutResize();
        }

        // Responsive variant swap. Authors opt in by adding breakpoint-scoped
        // variant classes on the root, mirroring the nds-tableView-sm/-md/-lg
        // convention for consistency across components:
        //
        //   class="nds-stepper nds-radial-sm nds-vertical-lg"
        //     → radial on mobile (≤600px), vertical on desktop (≥961px),
        //       horizontal as the fallback (no matching breakpoint).
        //
        //   class="nds-stepper nds-vertical nds-radial-sm"
        //     → always vertical, except radial on mobile. The always-on
        //       nds-vertical / nds-radial class seeds the fallback.
        //
        // The marker classes have no CSS rules of their own; apply() reads
        // the live classList on every tick so runtime mutations (e.g. a demo
        // toggle swapping nds-radial-sm for nds-vertical-sm) take effect
        // immediately. A MutationObserver re-triggers apply() when the
        // breakpoint-scoped classes change. Critical-CSS guard in
        // _skeleton.scss hides the stepper until the first apply lands
        // data-layout-ready on the element.
        setupResponsiveLayout() {
            const el = this.element;

            // Capture the authored fallback from the always-on variant class.
            // Stored on the instance so apply() can read it back without being
            // fooled by its own live nds-vertical / nds-radial toggles. Update
            // via the setFallback() method (e.g. from the showcase Fallback
            // dropmenu or the Simplify button).
            if (el.classList.contains('nds-radial')) this._fallback = 'radial';
            else if (el.classList.contains('nds-vertical')) this._fallback = 'vertical';
            else this._fallback = 'horizontal';

            const bpVariant = (bp) => {
                const m = el.className.match(new RegExp('\\bnds-(horizontal|vertical|radial)-' + bp + '\\b'));
                return m ? m[1] : null;
            };

            const apply = () => {
                const fallback = this._fallback || 'horizontal';
                let pick = fallback;
                if (window.matchMedia('(max-width: 600px)').matches) pick = bpVariant('sm') || fallback;
                else if (window.matchMedia('(min-width: 601px) and (max-width: 960px)').matches) pick = bpVariant('md') || fallback;
                else if (window.matchMedia('(min-width: 961px)').matches) pick = bpVariant('lg') || fallback;

                el.classList.toggle('nds-vertical', pick === 'vertical');
                el.classList.toggle('nds-radial',   pick === 'radial');

                // Radial CSS hides non-current steps; if a linear variant had
                // overshot totalSteps (the form "all completed" trick) and we
                // flip into radial, re-clamp so a step stays marked current.
                if (pick === 'radial' && this.currentStep > this.totalSteps) {
                    this.currentStep = this.totalSteps;
                }
                this.updateProgress();
                this.syncStepStates();

                el.setAttribute('data-layout-ready', 'true');
            };

            this._applyLayout = apply;

            // Track the breakpoint-scoped class set so we can ignore apply()'s
            // own toggles of nds-vertical / nds-radial. Class-attribute changes
            // on .nds-stepper are delivered by the shared NDS.onAttrChange
            // registration below (module-level init) which calls back into
            // this._reapplyLayoutIfChanged. Set up for every stepper so that
            // adding a breakpoint class at runtime activates responsive
            // behavior without requiring reinitialization.
            const bpRe = /^nds-(?:horizontal|vertical|radial)-(?:sm|md|lg)$/;
            const snapshot = () => [...el.classList].filter(c => bpRe.test(c)).sort().join(' ');
            let lastSnapshot = snapshot();

            this._reapplyLayoutIfChanged = () => {
                const current = snapshot();
                if (current !== lastSnapshot) {
                    lastSnapshot = current;
                    apply();
                }
            };

            apply();
            this._offLayoutResize = NDS.onResize(apply);
        }

        // Change the fallback variant at runtime. Updates the always-on
        // class (nds-radial / nds-vertical, or none for horizontal), records
        // the new fallback on the instance, and re-runs the responsive apply
        // so the live variant class updates immediately.
        setFallback(variant) {
            if (!['horizontal', 'vertical', 'radial'].includes(variant)) return;
            const el = this.element;
            el.classList.remove('nds-vertical', 'nds-radial');
            if (variant !== 'horizontal') el.classList.add(`nds-${variant}`);
            this._fallback = variant;
            if (this._applyLayout) this._applyLayout();
        }

        getCurrentStep() {
            const dataStep = parseInt(this.element.dataset.current);
            if (dataStep >= 1) {
                // Radial steppers clamp to totalSteps; linear steppers allow exceeding for completion state
                return this.isRadial ? Math.min(dataStep, this.steps.length) : dataStep;
            }

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
            // Global event delegation — one-time module-level binding with abortable signal
            if (_stepperControlsAC) return;
            _stepperControlsAC = new AbortController();
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

                const stepperInstance = targetStepper?.ndsStepper;
                if (!stepperInstance) return;

                switch (action) {
                    case 'next': stepperInstance.next(); break;
                    case 'previous': stepperInstance.previous(); break;
                    case 'goto': stepperInstance.goTo(parseInt(value)); break;
                }
            }, { signal: _stepperControlsAC.signal });
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
            // Release the critical-CSS visibility guard for every stepper, not
            // just responsive ones — otherwise a non-responsive stepper that
            // later gains a breakpoint class (via a runtime toggle) would be
            // caught by the guard with data-layout-ready still missing, and
            // would disappear until the page reloads.
            element.setAttribute('data-layout-ready', 'true');
            element.ndsStepper = stepper;

            if (element.id) {
                steppers.set(element.id, stepper);
            }
        });

        // Shared attribute observer for all steppers
        NDS.onAttrChange('.nds-stepper', ['data-current', 'data-total'], els => {
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

        // Class changes on a stepper re-evaluate responsive layout so runtime
        // breakpoint-variant swaps (e.g. demo toggles flipping nds-radial-sm
        // for nds-vertical-sm) apply immediately. Pooled through the same
        // body-level MutationObserver that drives data-current/total above.
        NDS.onAttrChange('.nds-stepper', ['class'], els => {
            els.forEach(el => {
                const stepper = el.ndsStepper;
                if (stepper && stepper._reapplyLayoutIfChanged) stepper._reapplyLayoutIfChanged();
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
 *       <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="3"
 *         stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
 *     </svg>
 *     <div class="nds-progress-info">
 *       <span class="nds-progress-percentage">
 *         <span class="nds-progress-number">0</span>
 *       </span>
 *       <span class="nds-progress-steps"></span>
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