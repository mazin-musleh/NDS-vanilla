/**
 * NDS Accordion Component
 * Collapsible accordion functionality with accessibility support
 * Based on WAI-ARIA Authoring Practices Guide
 */

(function() {
    'use strict';

    class NDSAccordion {
        constructor(accordionContainer) {
            this.accordionContainer = accordionContainer;
            this.buttons = Array.from(accordionContainer.querySelectorAll('.nds-accordion-btn'));
            this.collapses = Array.from(accordionContainer.querySelectorAll('.nds-accordion-collapse'));
            this.isAnimating = false; // Simple flag to prevent clicks during animation
            
            if (this.buttons.length === 0) {
                console.warn('NDS Accordion: No accordion buttons found');
                return;
            }

            this.abortController = new AbortController();
            this.init();
        }

        init() {
            this.setupEventListeners();
            this.setupInitialState();
            this.setupKeyboardNavigation();
        }

        get isAlwaysOpen() {
            return NDS.State.has(this.accordionContainer, 'always-open');
        }

        get prefersReducedMotion() {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }

        setupInitialState() {
            // The init-time 0fr → 1fr transition is suppressed by a CSS
            // gate keyed on `:not([data-nds-accordion-initialized])` on the
            // container. initializeAccordions defers the marker stamp by two
            // rAFs so the browser commits the state change in a paint where
            // the rule still applies; the marker then lands in the next
            // paint and future user clicks animate normally.
            this.buttons.forEach((button, index) => {
                const collapse = this.collapses[index];
                if (!collapse) return;

                const isExpanded = button.ariaExpanded === 'true';

                if (isExpanded) {
                    NDS.State.set(collapse, 'open');
                    NDS.State.set(button, 'open');
                } else {
                    NDS.State.clear(collapse);
                    NDS.State.clear(button);
                    NDS.aria.expanded(button, false);
                }
            });
        }

        setupEventListeners() {
            this.buttons.forEach((button, index) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggle(index);
                }, { signal: this.abortController.signal });
            });
        }

        setupKeyboardNavigation() {
            this.accordionContainer.addEventListener('keydown', (e) => {
                this.handleKeyDown(e);
            }, { signal: this.abortController.signal });
        }

        handleKeyDown(e) {
            const currentButton = e.target;
            if (!currentButton.classList.contains('nds-accordion-btn')) return;

            const currentIndex = this.buttons.indexOf(currentButton);
            let targetIndex = currentIndex;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    targetIndex = currentIndex < this.buttons.length - 1 ? currentIndex + 1 : 0;
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    targetIndex = currentIndex > 0 ? currentIndex - 1 : this.buttons.length - 1;
                    break;

                case 'Home':
                    e.preventDefault();
                    targetIndex = 0;
                    break;

                case 'End':
                    e.preventDefault();
                    targetIndex = this.buttons.length - 1;
                    break;

                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.toggle(currentIndex);
                    return;

                default:
                    return;
            }

            this.focusButton(targetIndex);
        }

        focusButton(index) {
            if (index >= 0 && index < this.buttons.length) {
                this.buttons[index].focus();
            }
        }

        toggle(index) {
            const button = this.buttons[index];
            const collapse = this.collapses[index];
            
            if (!button || !collapse) return;
            
            // Prevent toggling while animation is in progress
            if (this.isAnimating) return;

            const isCurrentlyExpanded = button.ariaExpanded === 'true';
            
            if (isCurrentlyExpanded) {
                this.hide(index);
            } else {
                this.show(index);
            }
        }

        show(index) {
            const button = this.buttons[index];
            const collapse = this.collapses[index];

            if (!button || !collapse) return;

            // If not always-open mode, hide other panels first
            if (!this.isAlwaysOpen) {
                this.hideAll(index);
            }

            // Set animation flag — skip lock when reduced motion is active
            if (this.prefersReducedMotion) {
                this.isAnimating = false;
            } else {
                this.isAnimating = true;
                setTimeout(() => {
                    this.isAnimating = false;
                }, NDS.transitionSpeed() + 50);
            }

            // Update button state immediately
            NDS.aria.expanded(button, true);
            NDS.State.set(button, 'open');

            // Set collapse to opening, then open after animation
            NDS.State.set(collapse, 'opening');

            // Animate and dispatch event after
            this.animateShow(collapse, () => {
                NDS.State.set(collapse, 'open');
                // Dispatch custom event
                this.dispatchToggleEvent(index, button, collapse, true);
            });
        }

        hide(index) {
            const button = this.buttons[index];
            const collapse = this.collapses[index];

            if (!button || !collapse) return;

            // Set animation flag — skip lock when reduced motion is active
            if (this.prefersReducedMotion) {
                this.isAnimating = false;
            } else {
                this.isAnimating = true;
                setTimeout(() => {
                    this.isAnimating = false;
                }, NDS.transitionSpeed() + 50);
            }

            // Update button state immediately
            NDS.aria.expanded(button, false);
            NDS.State.clear(button);

            // Set collapse to closing, then remove after animation
            NDS.State.set(collapse, 'closing');

            this.animateHide(collapse, () => {
                NDS.State.clear(collapse);

                // Dispatch custom event
                this.dispatchToggleEvent(index, button, collapse, false);
            });
        }

        hideAll(excludeIndex = -1) {
            this.buttons.forEach((button, index) => {
                if (index !== excludeIndex && button.ariaExpanded === 'true') {
                    this.hide(index);
                }
            });
        }

        animateShow(collapse, callback) {
            // If reduced motion is preferred, skip animation
            if (this.prefersReducedMotion) {
                callback();
                return;
            }

            // Clean up after animation
            const handleTransitionEnd = () => {
                collapse.removeEventListener('transitionend', handleTransitionEnd);
                callback();
            };

            collapse.addEventListener('transitionend', handleTransitionEnd);

            // Fallback in case transitionend doesn't fire
            setTimeout(() => {
                if (NDS.State.has(collapse, 'opening')) {
                    handleTransitionEnd();
                }
            }, NDS.transitionSpeed());
        }

        animateHide(collapse, callback) {
            // If reduced motion is preferred, skip animation
            if (this.prefersReducedMotion) {
                callback();
                return;
            }

            // Clean up after animation
            const handleTransitionEnd = () => {
                collapse.removeEventListener('transitionend', handleTransitionEnd);
                callback();
            };

            collapse.addEventListener('transitionend', handleTransitionEnd);

            // Fallback in case transitionend doesn't fire
            setTimeout(() => {
                if (NDS.State.has(collapse, 'closing')) {
                    handleTransitionEnd();
                }
            }, NDS.transitionSpeed());
        }

        dispatchToggleEvent(index, button, collapse, isShown) {
            const eventType = isShown ? 'nds:accordion:shown' : 'nds:accordion:hidden';
            const event = new CustomEvent(eventType, {
                detail: {
                    index: index,
                    button: button,
                    collapse: collapse,
                    accordion: this.accordionContainer
                },
                bubbles: true
            });

            this.accordionContainer.dispatchEvent(event);
        }

        // Public API methods
        openItem(index) {
            if (index >= 0 && index < this.buttons.length) {
                this.show(index);
            }
        }

        closeItem(index) {
            if (index >= 0 && index < this.buttons.length) {
                this.hide(index);
            }
        }

        toggleItem(index) {
            if (index >= 0 && index < this.buttons.length) {
                this.toggle(index);
            }
        }

        closeAll() {
            this.hideAll();
        }

        getOpenItems() {
            return this.buttons
                .map((button, index) => ({
                    index,
                    button,
                    collapse: this.collapses[index],
                    isOpen: button.ariaExpanded === 'true'
                }))
                .filter(item => item.isOpen);
        }

        destroy() {
            if (this.abortController) this.abortController.abort();
        }
    }

    // Auto-initialize accordions on page load
    function initializeAccordions() {
        const accordionContainers = document.querySelectorAll('.nds-accordion');
        
        accordionContainers.forEach(container => {
            // Skip elements inside code examples
            if (container.closest('code, .code-example')) {
                return;
            }
            
            if (!container.hasAttribute('data-nds-accordion-initialized')) {
                const accordionInstance = new NDSAccordion(container);
                container.ndsAccordion = accordionInstance;
                // Defer the marker by one rAF so the browser commits the
                // setupInitialState state change in a paint where the CSS
                // gate (.nds-accordion:not([data-nds-accordion-initialized]))
                // still applies — suppressing the init-time animation.
                requestAnimationFrame(() => {
                    container.setAttribute('data-nds-accordion-initialized', 'true');
                });
            }
        });
    }

    // Re-initialize when new content is added
    function reinitializeAccordions() {
        initializeAccordions();
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        NDS.Accordion = {
            init: initializeAccordions,
            reinit: reinitializeAccordions,
            create: (container) => new NDSAccordion(container)
        };
    }

    // Export for modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSAccordion;
    }

    // Note: Initialization now handled by nds-loader.js unified system
})();

/**
 * Usage Examples:
 * 
 * // Auto-initialization (happens automatically)
 * // Just add the HTML structure with .nds-accordion class
 * 
 * // Manual initialization
 * const accordionElement = document.querySelector('#myAccordion');
 * const accordionInstance = NDSAccordion.create(accordionElement);
 * 
 * // Programmatic control
 * accordionInstance.openItem(0);     // Open first item
 * accordionInstance.closeItem(1);    // Close second item
 * accordionInstance.toggleItem(2);   // Toggle third item
 * accordionInstance.closeAll();      // Close all items
 * 
 * // Get current state
 * const openItems = accordionInstance.getOpenItems();
 * 
 * // Listen for accordion events
 * document.addEventListener('nds:accordion:shown', (e) => {
 *     console.log('Accordion item opened:', e.detail.index);
 *     console.log('Button:', e.detail.button);
 *     console.log('Collapse:', e.detail.collapse);
 * });
 * 
 * document.addEventListener('nds:accordion:hidden', (e) => {
 *     console.log('Accordion item closed:', e.detail.index);
 * });
 * 
 * // Reinitialize after dynamic content changes
 * NDSAccordion.reinit();
 */