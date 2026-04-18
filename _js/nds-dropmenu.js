/**
 * NDS Dropmenu Component
 * Unified dropdown menu functionality with accessibility support
 * Handles click outside, keyboard navigation, ARIA attributes,
 * direction-aware positioning, and boundary detection
 */

(function() {
    'use strict';

    // State helpers — delegated to NDS.State (nds-core.js)
    const { add: addState, remove: removeState } = NDS.State;

    // ==============================================
    // DROPMENU CLASS
    // ==============================================

    class NDSDropmenu {
        constructor(dropmenuElement) {
            this.dropmenu = dropmenuElement;
            this.trigger = dropmenuElement.querySelector('.nds-dropmenu-trigger') || dropmenuElement;
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

            // Set role for menu items (skip form controls and groups)
            this.menu.querySelectorAll('.nds-dropmenu-item').forEach(item => {
                if (!item.classList.contains('nds-form-control')
                    && !item.classList.contains('nds-dropmenu-group')) {
                    setDefault(item, 'role', 'menuitem');
                }
            });
        }

        // ==============================================
        // EVENT LISTENERS
        // ==============================================

        setupEventListeners() {
            // Trigger click (skip if programmatic-only mode)
            if (!this.dropmenu.hasAttribute('data-dropmenu-no-click')) {
                this.trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggle();
                });
            }

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
            this._closeCancelled = true;

            document.querySelectorAll('.nds-dropmenu[data-state~="open"]').forEach(el => {
                if (el !== this.dropmenu && el.ndsDropmenu) el.ndsDropmenu.close();
            });

            removeState(this.dropmenu, 'closing');
            this.isOpen = true;

            addState(this.dropmenu, 'open', 'opening');
            addState(this.trigger, 'open');
            this.trigger.setAttribute('aria-expanded', 'true');
            this.menu.setAttribute('aria-hidden', 'false');

            this.applyPosition();

            // Close on external scroll/resize. Ignore scrolls inside the menu
            // itself so filters/scrollable content keep working.
            this._onScroll = (e) => {
                if (e?.target?.nodeType && this.menu.contains(e.target)) return;
                this.close();
            };
            document.addEventListener('scroll', this._onScroll, { capture: true, passive: true });
            this._unsubResize = NDS.onResize(() => this.close());

            requestAnimationFrame(() => removeState(this.dropmenu, 'opening'));
            this.emitEvent('nds:dropmenu:opened');
        }

        close() {
            this.isOpen = false;
            this._closeCancelled = false;

            if (this.menu.contains(document.activeElement)) this.trigger.focus();

            addState(this.dropmenu, 'closing');
            this.trigger.setAttribute('aria-expanded', 'false');

            if (this._onScroll) {
                document.removeEventListener('scroll', this._onScroll, { capture: true });
                this._onScroll = null;
            }
            if (this._unsubResize) { this._unsubResize(); this._unsubResize = null; }

            let done = false;
            const cleanup = () => {
                if (done || this._closeCancelled) return;
                done = true;

                removeState(this.dropmenu, 'open', 'opening', 'closing');
                removeState(this.trigger, 'open');
                this.dropmenu.removeAttribute('data-position-vertical');
                this.menu.style.cssText = '';
                const scroll = this.menu.querySelector('.nds-dropmenu-scroll');
                if (scroll) scroll.style.maxHeight = '';
                this.menu.setAttribute('aria-hidden', 'true');
                this.menu.removeEventListener('transitionend', onEnd);
                this.emitEvent('nds:dropmenu:closed');
            };

            const onEnd = (e) => { if (e.target === this.menu) cleanup(); };

            this.menu.addEventListener('transitionend', onEnd);
            setTimeout(cleanup, 200);
        }

        // ==============================================
        // POSITION CALCULATION
        // ==============================================

        /**
         * Viewport-pixel placement; menu is `position: fixed` so it escapes
         * any clipping ancestor (tables, modals, cards). Vertical flips up
         * when below is tight; horizontal prefers trigger-edge alignment
         * (RTL-aware) then clamps to the viewport.
         */
        applyPosition() {
            const tr = this.trigger.getBoundingClientRect();
            const doc = document.documentElement;
            const vw = doc.clientWidth, vh = doc.clientHeight;
            const gap = 4, pad = 8;

            // Treat the sticky mainnav as the top edge so the menu can't
            // open behind it.
            const nav = document.querySelector('.nds-main-nav');
            const navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
            const topEdge = Math.max(pad, navBottom + 16);

            const scroll = this.menu.querySelector('.nds-dropmenu-scroll');
            if (scroll) scroll.style.maxHeight = '';

            // Lock width in px. fit-content/max-content are unreliable for
            // position:fixed + block when children use flex/grid or width:100%.
            this.menu.style.width = '';
            const w = Math.min(this.menu.offsetWidth, vw - pad * 2);
            this.menu.style.width = w + 'px';

            const mr = this.menu.getBoundingClientRect();
            const spaceBelow = vh - tr.bottom - gap - pad;
            const spaceAbove = tr.top - gap - topEdge;
            // Flip up when space below is tight AND above has more room.
            const flipUp = spaceBelow < 400 && spaceAbove > spaceBelow;
            const available = flipUp ? spaceAbove : spaceBelow;

            if (scroll && mr.height > available) {
                const chrome = mr.height - scroll.getBoundingClientRect().height;
                scroll.style.maxHeight = Math.max(80, available - chrome) + 'px';
            }

            const mr2 = this.menu.getBoundingClientRect();
            if (flipUp) this.dropmenu.setAttribute('data-position-vertical', 'top');
            else this.dropmenu.removeAttribute('data-position-vertical');

            let top = flipUp ? tr.top - mr2.height - gap : tr.bottom + gap;
            top = Math.max(topEdge, Math.min(top, vh - mr2.height - pad));

            let leftPx = this.isRTL ? tr.right - mr2.width : tr.left;
            leftPx = Math.max(pad, Math.min(leftPx, vw - mr2.width - pad));

            this.menu.style.top = top + 'px';
            this.menu.style.left = leftPx + 'px';
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

            el.ndsDropmenu = new NDSDropmenu(el);
        });
    }

    // Expose global API (called by nds-loader.js unified system)
    if (typeof window !== 'undefined') {
        NDS.Dropmenu = {
            init: initializeDropmenus,
            reinit: initializeDropmenus,
            create: (element) => new NDSDropmenu(element)
        };
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSDropmenu;
    }
})();
