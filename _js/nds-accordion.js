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

            this.init();
        }

        init() {
            this.setupEventListeners();
            this.setupInitialState();
            this.setupKeyboardNavigation();
        }

        get isAlwaysOpen() {
            return this.accordionContainer.classList.contains('always-open');
        }

        getTransitionDuration() {
            return parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue('--nds-transition-speed')
            ) * 1000 || 300;
        }

        setupInitialState() {
            // Ensure proper initial state for all accordion items
            this.buttons.forEach((button, index) => {
                const collapse = this.collapses[index];
                if (!collapse) return;

                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                
                if (isExpanded) {
                    collapse.classList.add('show');
                    button.classList.remove('collapsed');
                    button.classList.add('selected');
                } else {
                    collapse.classList.remove('show');
                    button.classList.add('collapsed');
                    button.classList.remove('selected');
                    button.setAttribute('aria-expanded', 'false');
                }
            });
        }

        setupEventListeners() {
            this.buttons.forEach((button, index) => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggle(index);
                });
            });
        }

        setupKeyboardNavigation() {
            this.accordionContainer.addEventListener('keydown', (e) => {
                this.handleKeyDown(e);
            });
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

            const isCurrentlyExpanded = button.getAttribute('aria-expanded') === 'true';
            
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

            // Set animation flag with timeout
            this.isAnimating = true;
            setTimeout(() => {
                this.isAnimating = false;
            }, this.getTransitionDuration() + 50); // CSS transition duration + 50ms buffer

            // Update button state immediately
            button.setAttribute('aria-expanded', 'true');
            button.classList.remove('collapsed');
            button.classList.add('selected');

            // Show the target panel
            this.animateShow(collapse, () => {
                collapse.classList.add('show');
                
                // Dispatch custom event
                this.dispatchToggleEvent(index, button, collapse, true);
            });
        }

        hide(index) {
            const button = this.buttons[index];
            const collapse = this.collapses[index];
            
            if (!button || !collapse) return;

            // Set animation flag with timeout
            this.isAnimating = true;
            setTimeout(() => {
                this.isAnimating = false;
            }, this.getTransitionDuration() + 50); // CSS transition duration + 50ms buffer

            // Update button state immediately
            button.setAttribute('aria-expanded', 'false');
            button.classList.add('collapsed');
            button.classList.remove('selected');

            this.animateHide(collapse, () => {
                collapse.classList.remove('show');
                
                // Dispatch custom event
                this.dispatchToggleEvent(index, button, collapse, false);
            });
        }

        hideAll(excludeIndex = -1) {
            this.buttons.forEach((button, index) => {
                if (index !== excludeIndex && button.getAttribute('aria-expanded') === 'true') {
                    this.hide(index);
                }
            });
        }

        animateShow(collapse, callback) {
            // If reduced motion is preferred, skip animation
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                callback();
                return;
            }

            // Set initial state for animation
            collapse.style.height = '0px';
            collapse.classList.add('collapsing');
            collapse.classList.remove('show');
            
            // Force layout calculation
            collapse.offsetHeight;
            
            // Get the full height
            const scrollHeight = collapse.scrollHeight;
            
            // Start animation
            collapse.style.height = scrollHeight + 'px';
            
            // Clean up after animation
            const handleTransitionEnd = () => {
                collapse.removeEventListener('transitionend', handleTransitionEnd);
                collapse.classList.remove('collapsing');
                collapse.style.height = '';
                callback();
            };
            
            collapse.addEventListener('transitionend', handleTransitionEnd);
            
            // Fallback in case transitionend doesn't fire
            setTimeout(() => {
                if (collapse.classList.contains('collapsing')) {
                    handleTransitionEnd();
                }
            }, this.getTransitionDuration());
        }

        animateHide(collapse, callback) {
            // If reduced motion is preferred, skip animation
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                callback();
                return;
            }

            // Set initial height
            collapse.style.height = collapse.scrollHeight + 'px';
            collapse.classList.add('collapsing');
            
            // Force layout calculation
            collapse.offsetHeight;
            
            // Start animation
            collapse.style.height = '0px';
            
            // Clean up after animation
            const handleTransitionEnd = () => {
                collapse.removeEventListener('transitionend', handleTransitionEnd);
                collapse.classList.remove('collapsing');
                collapse.style.height = '';
                callback();
            };
            
            collapse.addEventListener('transitionend', handleTransitionEnd);
            
            // Fallback in case transitionend doesn't fire
            setTimeout(() => {
                if (collapse.classList.contains('collapsing')) {
                    handleTransitionEnd();
                }
            }, this.getTransitionDuration());
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
                    isOpen: button.getAttribute('aria-expanded') === 'true'
                }))
                .filter(item => item.isOpen);
        }

        destroy() {
            // Remove event listeners and clean up
            this.buttons.forEach(button => {
                button.replaceWith(button.cloneNode(true));
            });
        }
    }

    // Auto-initialize accordions on page load
    function initializeAccordions() {
        const accordionContainers = document.querySelectorAll('.nds-accordion');
        
        accordionContainers.forEach(container => {
            if (!container.hasAttribute('data-nds-accordion-initialized')) {
                const accordionInstance = new NDSAccordion(container);
                container.ndsAccordionInstance = accordionInstance;
                container.setAttribute('data-nds-accordion-initialized', 'true');
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAccordions);
    } else {
        initializeAccordions();
    }

    // Re-initialize when new content is added
    function reinitializeAccordions() {
        initializeAccordions();
    }

    // Public API
    window.NDSAccordion = {
        init: initializeAccordions,
        reinit: reinitializeAccordions,
        create: (container) => new NDSAccordion(container)
    };

    // Export for modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSAccordion;
    }
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