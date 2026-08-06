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
            this.valid = true;
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

        setupInitialState() {
            // The init-time 0fr → 1fr transition is suppressed by a CSS
            // gate keyed on `:not([data-nds-accordion-initialized])` on the
            // container. initializeAccordions defers the marker stamp by two
            // rAFs so the browser commits the state change in a paint where
            // the rule still applies; the marker then lands in the next
            // paint and future user clicks animate normally.
            this.buttons.forEach((button, index) => this._syncItem(button, this.collapses[index]));
        }

        // Put one item's collapse + button state in sync with its aria-expanded.
        // Shared by init and refresh so an item added later lands in the same
        // state an initial one would.
        _syncItem(button, collapse) {
            if (!collapse) return;

            if (button.ariaExpanded === 'true') {
                NDS.State.set(collapse, 'open');
                NDS.State.set(button, 'open');
            } else {
                NDS.State.clear(collapse);
                NDS.State.clear(button);
                NDS.aria.expanded(button, false);
            }
        }

        setupEventListeners() {
            this.buttons.forEach(button => this._bindButton(button));
        }

        // The index is resolved at click time rather than captured at bind time:
        // refresh() can adopt an item inserted anywhere in the root, which would
        // leave every earlier closure pointing at the wrong panel.
        //
        // The guard records the OWNING instance, not a boolean: destroy() aborts
        // this instance's listeners, so a later controller on the same DOM must
        // be free to re-bind — a boolean would leave it click-dead.
        _bindButton(button) {
            if (button._ndsAcc === this) return;
            button._ndsAcc = this;
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle(this.buttons.indexOf(button));
            }, { signal: this.abortController.signal });
        }

        // Adopt items added to this root after construction — a filter building
        // its groups across two passes, a consumer injecting an item. Only
        // unbound buttons are wired and only they are state-synced: re-syncing
        // the whole set would collapse panels the user has already opened.
        refresh() {
            this.buttons = Array.from(this.accordionContainer.querySelectorAll('.nds-accordion-btn'));
            this.collapses = Array.from(this.accordionContainer.querySelectorAll('.nds-accordion-collapse'));
            this.buttons.forEach((button, index) => {
                if (button._ndsAcc === this) return;
                this._syncItem(button, this.collapses[index]);
                this._bindButton(button);
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
            if (NDS.prefersReducedMotion) {
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
            this._animate(collapse, () => {
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
            if (NDS.prefersReducedMotion) {
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

            this._animate(collapse, () => {
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

        _animate(collapse, callback) {
            if (NDS.prefersReducedMotion) { callback(); return; }
            NDS.onTransitionEnd(collapse, callback);
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
            // Release the ownership marks too, so the buttons don't pin this
            // instance after its listeners are gone.
            this.buttons.forEach(button => {
                if (button._ndsAcc === this) delete button._ndsAcc;
            });
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
            
            // Already live: adopt any items added since construction rather
            // than skipping the root. Buttons are snapshotted at construction,
            // so without this a group built in a later pass — into a root an
            // earlier group already initialized — never wires.
            if (container.ndsAccordion) {
                container.ndsAccordion.refresh();
                return;
            }

            // The init flag is stamped in a rAF (below) to preserve the CSS
            // gate. If a caller runs reinit() synchronously between two
            // wraps, an already-inited root looks un-stamped and would be
            // double-constructed — a second click listener toggles the
            // panel back closed on the first click. Guard on the instance
            // property above, which lands synchronously.
            if (!container.hasAttribute('data-nds-accordion-initialized')) {
                activate(container, new NDSAccordion(container));
            }
        });
    }

    // Register a freshly constructed instance on its root. Stamps only successful
    // constructions — buttons that render late stay eligible for the next
    // reinit(). The backref lands synchronously so a reinit in the same tick sees
    // it; the marker is deferred by one rAF so the browser commits
    // setupInitialState's state change in a paint where the CSS gate
    // (.nds-accordion:not([data-nds-accordion-initialized])) still applies,
    // suppressing the init-time animation.
    function activate(container, instance) {
        if (!instance.valid) return;
        container.ndsAccordion = instance;
        requestAnimationFrame(() => {
            container.setAttribute('data-nds-accordion-initialized', 'true');
        });
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    NDS.Accordion = {
        init: initializeAccordions,
        reinit: initializeAccordions,
        // Reuse a live controller rather than building a second one on the same
        // root: both would bind a click listener to every button, so one click
        // toggles twice — open then straight back closed. Registering here also
        // lets a later reinit() find the instance instead of duplicating it.
        create: (container) => {
            if (!container) return null;
            if (container.ndsAccordion) return container.ndsAccordion;
            const instance = new NDSAccordion(container);
            activate(container, instance);
            return instance;
        }
    };

    // Note: Initialization now handled by nds-loader.js unified system
})();

