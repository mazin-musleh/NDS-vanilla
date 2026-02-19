/**
 * NDS Dropmenu Component
 * Unified dropdown menu functionality with accessibility support
 * Handles click outside, keyboard navigation, ARIA attributes,
 * direction-aware positioning, and boundary detection
 */

(function() {
    'use strict';

    // ==============================================
    // STATE MANAGEMENT HELPERS
    // ==============================================

    const parseStates = (el) =>
        new Set((el.getAttribute('data-state') || '').split(/\s+/).filter(Boolean));

    const addState = (element, ...states) => {
        if (!element) return;
        const current = parseStates(element);
        states.forEach(s => current.add(s));
        element.setAttribute('data-state', [...current].join(' '));
    };

    const removeState = (element, ...states) => {
        if (!element) return;
        const current = parseStates(element);
        states.forEach(s => current.delete(s));
        current.size ? element.setAttribute('data-state', [...current].join(' '))
                     : element.removeAttribute('data-state');
    };

    // ==============================================
    // DROPMENU CLASS
    // ==============================================

    class NDSDropmenu {
        constructor(dropmenuElement) {
            this.dropmenu = dropmenuElement;
            this.trigger = dropmenuElement.querySelector('.nds-dropmenu-trigger');
            this.menu = dropmenuElement.querySelector('.nds-dropmenu-menu');
            this.isOpen = false;

            if (!this.trigger || !this.menu) {
                console.warn('NDS Dropmenu: Missing trigger or menu element');
                return;
            }

            if (dropmenuElement.hasAttribute('data-nds-dropmenu-initialized')) return;

            // Cache references
            this.contentLayout = dropmenuElement.closest('.nds-content-layout')
                || document.querySelector('.nds-content-layout');
            this.isRTL = NDS.isRTL;

            this.init();
        }

        // ==============================================
        // UTILITY METHODS
        // ==============================================

        /** Check if an element is a text input */
        isInputElement(el) {
            return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA');
        }

        /** Get all focusable elements in the menu in DOM order */
        getFocusableElements() {
            const focusable = [];

            const walk = (el) => {
                if (el.nodeType !== 1) return;

                const tag = el.tagName;
                const isInput = (tag === 'INPUT' || tag === 'TEXTAREA')
                    && el.type !== 'hidden' && !el.disabled;
                const isItem = (tag === 'BUTTON' || tag === 'A')
                    && el.classList.contains('nds-dropmenu-item') && !el.disabled;

                if (!el.closest('.nds-form-action')) {
                    if (isInput || isItem) {
                        focusable.push(el);
                        if (isItem) return; // Don't traverse children of items
                    }
                }

                Array.from(el.children).forEach(walk);
            };

            Array.from(this.menu.children).forEach(walk);
            return focusable;
        }

        /**
         * Navigate through focusable elements with wrapping
         * @param {Element[]} elements - Focusable elements
         * @param {number} currentIndex - Current focused index
         * @param {number} direction - 1 for next, -1 for previous
         */
        navigateToIndex(elements, currentIndex, direction) {
            if (!elements.length) return;

            let nextIndex;
            if (direction === 1) {
                nextIndex = (currentIndex === -1 || currentIndex >= elements.length - 1)
                    ? 0 : currentIndex + 1;
            } else {
                nextIndex = (currentIndex <= 0)
                    ? elements.length - 1 : currentIndex - 1;
            }

            elements[nextIndex]?.focus();
        }

        /** Resolve the current focus index within focusable elements */
        resolveCurrentIndex(elements) {
            const active = document.activeElement;
            let index = elements.indexOf(active);

            // If not found, check if active is inside a menu item
            if (index === -1 && active) {
                const parent = active.closest('.nds-dropmenu-item');
                if (parent) index = elements.indexOf(parent);
            }

            return index;
        }

        // ==============================================
        // INITIALIZATION
        // ==============================================

        init() {
            this.setupAria();
            this.setupEventListeners();
            this.dropmenu.setAttribute('data-nds-dropmenu-initialized', 'true');
        }

        setupAria() {
            const setDefault = (el, attr, val) => {
                if (!el.hasAttribute(attr)) el.setAttribute(attr, val);
            };

            setDefault(this.trigger, 'aria-expanded', 'false');
            setDefault(this.trigger, 'aria-haspopup', 'true');
            setDefault(this.menu, 'role', 'menu');
            setDefault(this.menu, 'aria-hidden', 'true');

            // Set role for menu items (skip form controls)
            this.menu.querySelectorAll('.nds-dropmenu-item').forEach(item => {
                if (!item.classList.contains('nds-form-control')) {
                    setDefault(item, 'role', 'menuitem');
                }
            });
        }

        // ==============================================
        // EVENT LISTENERS
        // ==============================================

        setupEventListeners() {
            // Trigger click
            this.trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            });

            // Outside click
            this.handleOutsideClick = (e) => {
                if (this.isOpen && !this.dropmenu.contains(e.target)) this.close();
            };
            document.addEventListener('click', this.handleOutsideClick);

            // Trigger keyboard
            this.trigger.addEventListener('keydown', (e) => this.handleTriggerKeydown(e));

            // Menu keyboard (event delegation)
            this.menu.addEventListener('keydown', (e) => {
                // For inputs: only handle Tab and Alt+Arrow
                if (this.isInputElement(e.target)) {
                    const isNavKey = e.key === 'Tab'
                        || (e.altKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp'));
                    if (!isNavKey) return;
                }
                this.handleMenuKeydown(e);
            });

            // Escape (scoped to dropmenu)
            this.dropmenu.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    e.stopPropagation();
                    this.close();
                    this.trigger.focus();
                }
            });

            // Item click auto-close
            this.menu.addEventListener('click', (e) => {
                const item = e.target.closest('.nds-dropmenu-item');
                if (item && !item.hasAttribute('data-no-auto-close')) {
                    setTimeout(() => this.close(), 100);
                }
            });
        }

        // ==============================================
        // KEYBOARD HANDLERS
        // ==============================================

        handleTriggerKeydown(e) {
            const elements = this.getFocusableElements();

            switch (e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.toggle();
                    if (this.isOpen && elements.length) elements[0].focus();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.open();
                    if (elements.length) elements[0].focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.open();
                    if (elements.length) elements[elements.length - 1].focus();
                    break;
            }
        }

        handleMenuKeydown(e) {
            const elements = this.getFocusableElements();
            const currentIndex = this.resolveCurrentIndex(elements);
            const isInput = this.isInputElement(document.activeElement);

            switch (e.key) {
                case 'ArrowDown':
                case 'ArrowUp': {
                    // In inputs, require Alt key for navigation
                    if (isInput && !e.altKey) return;
                    e.preventDefault();
                    const dir = e.key === 'ArrowDown' ? 1 : -1;
                    this.navigateToIndex(elements, currentIndex, dir);
                    break;
                }
                case 'Home':
                    if (isInput && !e.ctrlKey) return;
                    e.preventDefault();
                    elements[0]?.focus();
                    break;
                case 'End':
                    if (isInput && !e.ctrlKey) return;
                    e.preventDefault();
                    elements[elements.length - 1]?.focus();
                    break;
                case 'Tab':
                    e.preventDefault();
                    if (e.shiftKey) {
                        if (currentIndex > 0) {
                            elements[currentIndex - 1]?.focus();
                        } else {
                            this.close();
                            this.trigger.focus();
                        }
                    } else {
                        if (currentIndex === -1) {
                            elements[0]?.focus();
                        } else if (currentIndex < elements.length - 1) {
                            elements[currentIndex + 1]?.focus();
                        } else {
                            this.close();
                        }
                    }
                    break;
            }
        }

        // ==============================================
        // OPEN / CLOSE / TOGGLE
        // ==============================================

        toggle() {
            this.isOpen ? this.close() : this.open();
        }

        open() {
            // Close any other open dropmenus
            document.querySelectorAll('.nds-dropmenu[data-state~="open"]').forEach(el => {
                if (el !== this.dropmenu && el.ndsDropmenuInstance) {
                    el.ndsDropmenuInstance.close();
                }
            });

            this.isOpen = true;

            // Step 1: Set vertical position (only needs trigger rect, no menu)
            this.adjustVerticalPosition();

            // Step 2: 'open' + 'opening' → display: block at opacity 0
            addState(this.dropmenu, 'open', 'opening');
            addState(this.trigger, 'open');
            this.trigger.setAttribute('aria-expanded', 'true');
            this.menu.setAttribute('aria-hidden', 'false');

            // Step 3: Set horizontal position (needs menu width)
            this.adjustHorizontalPosition();

            // Step 4: Next frame → remove 'opening' → transition fires
            requestAnimationFrame(() => {
                removeState(this.dropmenu, 'opening');
            });

            this.emitEvent('nds:dropmenu:opened');
        }

        close() {
            this.isOpen = false;

            // Move focus out before hiding to prevent aria-hidden warning
            if (this.menu.contains(document.activeElement)) {
                this.trigger.focus();
            }

            addState(this.dropmenu, 'closing');
            this.trigger.setAttribute('aria-expanded', 'false');

            let done = false;
            const cleanup = () => {
                if (done) return;
                done = true;

                removeState(this.dropmenu, 'open', 'opening', 'closing');
                removeState(this.trigger, 'open');
                this.dropmenu.removeAttribute('data-position-vertical');
                this.dropmenu.removeAttribute('data-position-horizontal');
                this.menu.style.top = '';
                this.menu.style.bottom = '';
                this.menu.setAttribute('aria-hidden', 'true');
                this.menu.removeEventListener('transitionend', onEnd);
                this.emitEvent('nds:dropmenu:closed');
            };

            const onEnd = (e) => {
                if (e.target === this.menu) cleanup();
            };

            this.menu.addEventListener('transitionend', onEnd);
            setTimeout(cleanup, 200); // Fallback
        }

        // ==============================================
        // POSITION CALCULATION
        // ==============================================

        /** Vertical position — uses trigger height for precise placement */
        adjustVerticalPosition() {
            this.dropmenu.removeAttribute('data-position-vertical');
            this.menu.style.top = '';
            this.menu.style.bottom = '';

            const triggerRect = this.trigger.getBoundingClientRect();
            const triggerHeight = this.trigger.offsetHeight;
            const vh = window.innerHeight;
            const cr = this.contentLayout?.getBoundingClientRect();
            const boundsTop = Math.max(cr?.top ?? 0, 0);
            const boundsBottom = Math.min(cr?.bottom ?? vh, vh);

            const spaceBelow = boundsBottom - triggerRect.bottom;
            const spaceAbove = triggerRect.top - boundsTop;

            if (spaceBelow < spaceAbove && spaceBelow < 200) {
                this.dropmenu.setAttribute('data-position-vertical', 'top');
                this.menu.style.bottom = triggerHeight + 'px';
            } else {
                this.menu.style.top = triggerHeight + 'px';
            }
        }

        /** Horizontal position — needs menu width, runs after display:block */
        adjustHorizontalPosition() {
            this.dropmenu.removeAttribute('data-position-horizontal');

            const menuRect = this.menu.getBoundingClientRect();
            const triggerRect = this.trigger.getBoundingClientRect();
            const vw = window.innerWidth;
            const cr = this.contentLayout?.getBoundingClientRect();
            const boundsLeft = Math.max(cr?.left ?? 0, 0);
            const boundsRight = Math.min(cr?.right ?? vw, vw);

            const menuWidth = menuRect.width;
            let hPos = this.isRTL ? 'right' : 'left';

            if (hPos === 'left') {
                if ((triggerRect.left + menuWidth) > boundsRight) hPos = 'right';
            } else {
                if ((triggerRect.right - menuWidth) < boundsLeft) hPos = 'left';
            }

            this.dropmenu.setAttribute('data-position-horizontal', hPos);
        }

        // ==============================================
        // EVENTS & CLEANUP
        // ==============================================

        emitEvent(name) {
            this.dropmenu.dispatchEvent(new CustomEvent(name, {
                detail: {
                    dropmenu: this.dropmenu,
                    trigger: this.trigger,
                    menu: this.menu,
                    isOpen: this.isOpen
                },
                bubbles: true
            }));
        }

        destroy() {
            if (this.handleOutsideClick) {
                document.removeEventListener('click', this.handleOutsideClick);
            }
            const clone = this.dropmenu.cloneNode(true);
            this.dropmenu.replaceWith(clone);
        }
    }

    // ==============================================
    // AUTO-INITIALIZATION
    // ==============================================

    function initializeDropmenus() {
        document.querySelectorAll('.nds-dropmenu').forEach(el => {
            if (el.closest('code, .code-example')) return;
            if (el.hasAttribute('data-nds-dropmenu-initialized')) return;

            el.ndsDropmenuInstance = new NDSDropmenu(el);
        });
    }

    // Expose global API (called by nds-loader.js unified system)
    if (typeof window !== 'undefined') {
        window.NDSDropmenu = {
            init: initializeDropmenus,
            reinit: initializeDropmenus,
            create: (element) => new NDSDropmenu(element)
        };
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSDropmenu;
    }
})();
