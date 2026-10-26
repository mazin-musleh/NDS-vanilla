/* NDS.Accordion — public surface
 * Rides: (none — base component)
 * Requires:
 *   .nds-accordion needs one .nds-accordion-collapse per .nds-accordion-btn — a button without its collapse toggles nothing
 * Methods:
 *   NDS.Accordion.init() / .reinit()   scan .nds-accordion; a live root adopts new items
 *   NDS.Accordion.create(container)    instance one accordion — returns the live controller
 *                                      when there already is one, null when it has no buttons
 *   NDS.Accordion.destroy(container)   undo create()
 *   instance.openItem(i) / .closeItem(i) / .toggleItem(i)
 *   instance.closeAll()
 *   instance.getOpenItems()            [{index, button, collapse, isOpen}]
 *   instance.refresh()                 adopt items added to this root since construction
 *   instance.destroy()                 the same, on the controller create() returned; open items stay open
 * Events (bubble from the .nds-accordion, AFTER the animation):
 *   nds:accordion:opened   detail {index, button, collapse, accordion}
 *   nds:accordion:closed   detail {index, button, collapse, accordion}
 * Hooks:
 *   (none — the structure is markup: .nds-accordion-btn and .nds-accordion-collapse pairs
 *    matched BY POSITION; aria-expanded on the button says which item is open)
 * Gotchas:
 *   - An item that starts open needs BOTH aria-expanded="true" on the button and
 *     data-state="open" on the button and the collapse. This component ships in a
 *     deferred bundle, so CSS has to paint the open item before the JS runs.
 *   - data-state="always-open" on the container lets several items stay open at once.
 *     Without it, opening one closes the rest.
 *   - The instance lives on the root as el.ndsAccordion.
 *   - An opened item whose heading ends above the sticky nav scrolls back below it
 *     (--accordion-scroll-offset on the root, 120px default).
 */
/**
 * NDS Accordion Component
 * Collapsible accordion functionality with accessibility support
 * Based on WAI-ARIA Authoring Practices Guide
 */

(function() {
    'use strict';

    // Own parts only. A .nds-accordion-collapse holds arbitrary consumer content,
    // so a nested .nds-accordion is legal — and its buttons/collapses match the
    // same selectors. An unguarded walk claims them: the outer controller wires
    // and index-pairs nodes the nested controller already drives.
    const findOwnParts = (container, selector) => NDS.findOwnParts(container, selector, '.nds-accordion');

    class NdsAccordion {
        constructor(accordionContainer) {
            this._accordionContainer = accordionContainer;
            this._buttons = findOwnParts(accordionContainer, '.nds-accordion-btn');
            this._collapses = findOwnParts(accordionContainer, '.nds-accordion-collapse');
            this._isAnimating = false; // Simple flag to prevent clicks during animation
            this._pendingEnds = new Map(); // collapse → cancel of its running transition end

            if (this._buttons.length === 0) {
                console.warn('NDS Accordion: No accordion buttons found');
                return;
            }

            this.abortController = new AbortController();
            this._wiredButtons = new WeakSet();
            this._valid = true;
            this.init();
        }

        init() {
            this._addEventListeners();
            this._setupInitialState();
            this._setupKeyboardNavigation();
        }

        get _isAlwaysOpen() {
            return NDS.state.has(this._accordionContainer, 'always-open');
        }

        _setupInitialState() {
            // The init-time 0fr → 1fr transition is suppressed by a CSS
            // gate keyed on `:not([data-nds-accordion-initialized])` on the
            // container. activate() defers the marker stamp by one
            // rAF so the browser commits the state change in a paint where
            // the rule still applies; the marker then lands in the next
            // paint and future user clicks animate normally.
            this._buttons.forEach((button, index) => this._syncItem(button, this._collapses[index]));
        }

        // Put one item's collapse + button state in sync with its aria-expanded.
        // Shared by init and refresh so an item added later lands in the same
        // state an initial one would.
        _syncItem(button, collapse) {
            if (!collapse) return;

            if (button.ariaExpanded === 'true') {
                NDS.state.set(collapse, 'open');
                NDS.state.set(button, 'open');
            } else {
                NDS.state.clear(collapse);
                NDS.state.clear(button);
                NDS.aria.expanded(button, false);
            }
        }

        _addEventListeners() {
            this._buttons.forEach(button => this._addButtonListeners(button));
        }

        // The index is resolved at click time rather than captured at bind time:
        // refresh() can adopt an item inserted anywhere in the root, which would
        // leave every earlier closure pointing at the wrong panel.
        //
        // The guard is per instance, not on the button: destroy() aborts this
        // instance's listeners, so a later controller on the same DOM must be
        // free to re-bind — a mark on the button would leave it click-dead.
        _addButtonListeners(button) {
            if (this._wiredButtons.has(button)) return;
            this._wiredButtons.add(button);
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this._toggle(this._buttons.indexOf(button));
            }, { signal: this.abortController.signal });
        }

        // Adopt items added to this root after construction — a filter building
        // its groups across two passes, a consumer injecting an item. Only
        // unbound buttons are wired and only they are state-synced: re-syncing
        // the whole set would collapse panels the user has already opened.
        refresh() {
            this._buttons = findOwnParts(this._accordionContainer, '.nds-accordion-btn');
            this._collapses = findOwnParts(this._accordionContainer, '.nds-accordion-collapse');
            this._buttons.forEach((button, index) => {
                if (this._wiredButtons.has(button)) return;
                this._syncItem(button, this._collapses[index]);
                this._addButtonListeners(button);
            });
        }

        _setupKeyboardNavigation() {
            this._accordionContainer.addEventListener('keydown', (e) => {
                this._handleKeyDown(e);
            }, { signal: this.abortController.signal });
        }

        _handleKeyDown(e) {
            const currentButton = e.target;
            const currentIndex = this._buttons.indexOf(currentButton);
            // A nested accordion's keys bubble here; they are not this accordion's.
            if (currentIndex === -1) return;
            let targetIndex = currentIndex;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    targetIndex = currentIndex < this._buttons.length - 1 ? currentIndex + 1 : 0;
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    targetIndex = currentIndex > 0 ? currentIndex - 1 : this._buttons.length - 1;
                    break;

                case 'Home':
                    e.preventDefault();
                    targetIndex = 0;
                    break;

                case 'End':
                    e.preventDefault();
                    targetIndex = this._buttons.length - 1;
                    break;

                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this._toggle(currentIndex);
                    return;

                default:
                    return;
            }

            this._focusButton(targetIndex);
        }

        _focusButton(index) {
            if (index >= 0 && index < this._buttons.length) {
                this._buttons[index].focus();
            }
        }

        _toggle(index) {
            const button = this._buttons[index];
            const collapse = this._collapses[index];
            
            if (!button || !collapse) return;
            
            // Prevent toggling while animation is in progress
            if (this._isAnimating) return;

            const isCurrentlyExpanded = button.ariaExpanded === 'true';
            
            if (isCurrentlyExpanded) {
                this._hide(index);
            } else {
                this._show(index);
            }
        }

        _show(index) {
            const button = this._buttons[index];
            const collapse = this._collapses[index];

            if (!button || !collapse) return;

            // If not always-open mode, hide other panels first
            if (!this._isAlwaysOpen) {
                this._hideAll(index);
            }

            // Set animation flag — skip lock when reduced motion is active
            if (NDS.prefersReducedMotion) {
                this._isAnimating = false;
            } else {
                this._isAnimating = true;
                setTimeout(() => {
                    this._isAnimating = false;
                }, NDS.transitionSpeed() + 50);
            }

            // Update button state immediately
            NDS.aria.expanded(button, true);
            NDS.state.set(button, 'open');

            // Set collapse to opening, then open after animation
            NDS.state.set(collapse, 'opening');

            // Animate and dispatch event after
            this._animate(collapse, () => {
                NDS.state.set(collapse, 'open');
                // A long item closing above this one pulls its heading up past the nav.
                NDS.scrollBelowNav(button, {
                    offsetVar: '--accordion-scroll-offset',
                    offsetEl: this._accordionContainer,
                });
                // Dispatch custom event
                this._dispatchToggleEvent(index, button, collapse, true);
            });
        }

        _hide(index) {
            const button = this._buttons[index];
            const collapse = this._collapses[index];

            if (!button || !collapse) return;

            // Set animation flag — skip lock when reduced motion is active
            if (NDS.prefersReducedMotion) {
                this._isAnimating = false;
            } else {
                this._isAnimating = true;
                setTimeout(() => {
                    this._isAnimating = false;
                }, NDS.transitionSpeed() + 50);
            }

            // Update button state immediately
            NDS.aria.expanded(button, false);
            NDS.state.clear(button);

            // Set collapse to closing, then remove after animation
            NDS.state.set(collapse, 'closing');

            this._animate(collapse, () => {
                NDS.state.clear(collapse);

                // Dispatch custom event
                this._dispatchToggleEvent(index, button, collapse, false);
            });
        }

        _hideAll(excludeIndex = -1) {
            this._buttons.forEach((button, index) => {
                if (index !== excludeIndex && button.ariaExpanded === 'true') {
                    this._hide(index);
                }
            });
        }

        _animate(collapse, callback) {
            // openItem() then closeItem() mid-transition: only the last one's end runs.
            this._pendingEnds.get(collapse)?.();
            if (NDS.prefersReducedMotion) { callback(); return; }
            this._pendingEnds.set(collapse, NDS.onTransitionEnd(collapse, callback));
        }

        _dispatchToggleEvent(index, button, collapse, isShown) {
            const eventType = isShown ? 'nds:accordion:opened' : 'nds:accordion:closed';
            const event = new CustomEvent(eventType, {
                detail: {
                    index: index,
                    button: button,
                    collapse: collapse,
                    accordion: this._accordionContainer
                },
                bubbles: true
            });

            this._accordionContainer.dispatchEvent(event);
        }

        // Public API methods
        openItem(index) {
            if (index >= 0 && index < this._buttons.length) {
                this._show(index);
            }
        }

        closeItem(index) {
            if (index >= 0 && index < this._buttons.length) {
                this._hide(index);
            }
        }

        toggleItem(index) {
            if (index >= 0 && index < this._buttons.length) {
                this._toggle(index);
            }
        }

        closeAll() {
            this._hideAll();
        }

        getOpenItems() {
            return this._buttons
                .map((button, index) => ({
                    index,
                    button,
                    collapse: this._collapses[index],
                    isOpen: button.ariaExpanded === 'true'
                }))
                .filter(item => item.isOpen);
        }

        destroy() {
            if (this.abortController) this.abortController.abort();
            // Release the container backref + init stamp so create()/init() can
            // rebuild — without this, create() returns the dead controller and
            // init() calls refresh() on it. Identity-guard the delete: a later
            // controller may already own the root.
            if (this._accordionContainer.ndsAccordion === this) {
                delete this._accordionContainer.ndsAccordion;
            }
            this._accordionContainer.removeAttribute('data-nds-accordion-initialized');
        }
    }

    // Auto-initialize accordions on page load
    function setupAccordions() {
        const accordionContainers = document.querySelectorAll('.nds-accordion');
        
        accordionContainers.forEach(container => {
            // Skip elements inside code examples
            if (container.closest('code')) {
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
                activate(container, new NdsAccordion(container));
            }
        });
    }

    // Register a freshly constructed instance on its root. Stamps only successful
    // constructions — buttons that render late stay eligible for the next
    // reinit(). The backref lands synchronously so a reinit in the same tick sees
    // it; the marker is deferred by one rAF so the browser commits
    // _setupInitialState's state change in a paint where the CSS gate
    // (.nds-accordion:not([data-nds-accordion-initialized])) still applies,
    // suppressing the init-time animation. The timer races the rAF: a hidden
    // tab runs no rAF, and the stamp also releases the skeleton.
    function activate(container, instance) {
        if (!instance._valid) return;
        container.ndsAccordion = instance;
        let stamped = false;
        const stamp = () => {
            // A destroy() in between owns the root now.
            if (stamped || container.ndsAccordion !== instance) return;
            stamped = true;
            container.setAttribute('data-nds-accordion-initialized', 'true');
        };
        requestAnimationFrame(stamp);
        // Hidden only: on a busy visible page the timer could beat the first paint.
        if (document.hidden) setTimeout(stamp, 100);
    }

    // Assigned at module eval so the loader's lazy stub resolves.
    NDS.Accordion = {
        init: setupAccordions,
        reinit: setupAccordions,
        // Reuse a live controller rather than building a second one on the same
        // root: both would bind a click listener to every button, so one click
        // toggles twice — open then straight back closed. Registering here also
        // lets a later reinit() find the instance instead of duplicating it.
        create: (container) => {
            if (!container) return null;
            if (container.ndsAccordion) return container.ndsAccordion;
            const instance = new NdsAccordion(container);
            activate(container, instance);
            return instance._valid ? instance : null;
        },
        destroy: (container) => container?.ndsAccordion?.destroy(),
    };

    // Note: Initialization now handled by nds-loader.js unified system
})();

