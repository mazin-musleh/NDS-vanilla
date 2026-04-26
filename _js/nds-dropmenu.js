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

    // Custom properties consumers can set on a dropmenu wrapper to customize
    // the popup. Snapshotted onto the menu before portaling so the cascade
    // survives the move to <body>. Kept as a module-level const (not a static
    // class field) for older-Safari compatibility.
    const PORTAL_VARS = [
        '--menu-padding',
        '--dropmenu-width',
        '--dropmenu-min-width',
        '--dropmenu-max-width',
        '--dropmenu-slide',
    ];


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

            // Backrefs so consumers walking up from a menu item can still
            // reach the wrapper after the menu is portaled to <body>. With
            // these, `el.closest('.nds-dropmenu-menu')?._ownerDropmenu`
            // works whether the menu is in original or portaled position.
            this.menu._ownerDropmenu = this.dropmenu;
            this.dropmenu._ownerMenu = this.menu;

            this.init();
        }

        // ==============================================
        // UTILITY METHODS
        // ==============================================

        /** Check if an element is a text-entry input that consumes arrow/Home/End keys.
         *  Checkbox/radio/button inputs don't use these for editing, so they should
         *  fall through to menu navigation. */
        isInputElement(el) {
            if (!el) return false;
            if (el.tagName === 'TEXTAREA') return true;
            if (el.tagName !== 'INPUT') return false;
            const textLike = ['text', 'search', 'tel', 'url', 'email', 'password',
                'number', 'date', 'datetime-local', 'month', 'time', 'week', 'range'];
            return textLike.includes(el.type);
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

                // Scope is already the menu subtree (walk starts at this.menu.children
                // and only recurses downward), so any input or dropmenu-item we reach
                // is by definition inside the menu. No external-boundary check needed.
                if (isInput || isItem) {
                    focusable.push(el);
                    if (isItem) return; // Don't traverse children of items
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
            this.setupSelectMode();
            this.dropmenu.setAttribute('data-nds-dropmenu-initialized', 'true');
        }

        // ==============================================
        // SELECT MODE (opt-in picker)
        // ==============================================
        // Any dropmenu with `data-select-name="..."` becomes a value picker:
        //   - A hidden <input name="..."> is appended so the selection ships
        //     with the enclosing form.
        //   - Clicking an item with `data-value` writes its value to the
        //     hidden input, updates the trigger label, and marks the item
        //     selected (clears siblings).
        //   - Optional attributes on the dropmenu:
        //       data-select-value="..."  pre-select a value
        //       data-required             add `required` to the hidden input
        //   - Optional per-item override:
        //       data-trigger-label="..."  custom short label for the trigger
        //                                 (falls back to the item's .nds-label)
        //   - Events: hidden input fires `change`; dropmenu fires
        //     `nds:dropmenu:selected` with { item, value } in detail.

        setupSelectMode() {
            const name = this.dropmenu.getAttribute('data-select-name');
            if (!name) return;
            this.isSelect = true;

            let hidden = this.dropmenu.querySelector('input[type="hidden"][data-nds-select-value]');
            if (!hidden) {
                hidden = document.createElement('input');
                hidden.type = 'hidden';
                hidden.setAttribute('data-nds-select-value', '');
                this.dropmenu.appendChild(hidden);
            }
            hidden.name = name;
            if (this.dropmenu.hasAttribute('data-required')) hidden.required = true;
            this.selectHidden = hidden;

            // Initial selection: data-select-value beats any pre-rendered
            // [data-state~="selected"] item, so consumers can drive it from
            // data without editing the item markup.
            const initialValue = this.dropmenu.getAttribute('data-select-value');
            let initialItem = null;
            if (initialValue != null) {
                this.menu.querySelectorAll('.nds-dropmenu-item').forEach((el) => {
                    if (!initialItem && el.getAttribute('data-value') === initialValue) {
                        initialItem = el;
                    }
                });
            }
            if (!initialItem) {
                initialItem = this.menu.querySelector('.nds-dropmenu-item[data-state~="selected"]');
            }
            if (initialItem) this.applySelection(initialItem, { silent: true });

            this.menu.addEventListener('click', (e) => {
                const item = e.target.closest('.nds-dropmenu-item');
                if (item && item.hasAttribute('data-value')) this.applySelection(item);
            });
        }

        applySelection(item, opts = {}) {
            const value = item.getAttribute('data-value') || '';
            if (this.selectHidden) this.selectHidden.value = value;

            // Trigger label: prefer per-item data-trigger-label for cases
            // where the dropdown row is descriptive ("Saudi Arabia (+966)")
            // but the trigger slot needs something compact ("+966").
            const triggerAttr = item.getAttribute('data-trigger-label');
            const itemLabel = item.querySelector('.nds-label');
            const labelText = triggerAttr != null
                ? triggerAttr
                : (itemLabel ? itemLabel.textContent : item.textContent.trim());

            const triggerLabel = this.trigger.querySelector('.nds-label');
            if (triggerLabel) triggerLabel.textContent = labelText;
            else this.trigger.textContent = labelText;

            this.menu.querySelectorAll('.nds-dropmenu-item').forEach((o) => {
                if (o !== item) NDS.State.clear(o);
            });
            NDS.State.set(item, 'selected');

            if (!opts.silent) {
                if (this.selectHidden) {
                    this.selectHidden.dispatchEvent(new Event('change', { bubbles: true }));
                }
                this.dropmenu.dispatchEvent(new CustomEvent('nds:dropmenu:selected', {
                    detail: { dropmenu: this.dropmenu, item, value },
                    bubbles: true
                }));
            }
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

            // Outside click — portal-aware: while open the menu lives at
            // <body> level, so events from menu items don't bubble through
            // .nds-dropmenu. Treat clicks inside the menu as inside.
            this.handleOutsideClick = (e) => {
                if (this.isOpen
                    && !this.dropmenu.contains(e.target)
                    && !this.menu.contains(e.target)) this.close();
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

            // Escape — listen on both dropmenu (for trigger focus) and menu
            // (for focus inside the portaled menu, which no longer bubbles
            // up to the dropmenu wrapper).
            const onEscape = (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    e.stopPropagation();
                    this.close();
                    this.trigger.focus();
                }
            };
            this.dropmenu.addEventListener('keydown', onEscape);
            this.menu.addEventListener('keydown', onEscape);

            // Item click auto-close + portal-aware re-dispatch.
            // When the menu is portaled to <body>, native click events on items
            // bubble through <body>, not through the wrapper — so listeners on
            // ancestors (e.g. `.nds-pagination-list`) never see them. Dispatch
            // a synthetic bubbling click on the wrapper to restore that path.
            // The original item is attached as `event.ndsDropmenuItem` so
            // listeners can identify which item was clicked.
            this.menu.addEventListener('click', (e) => {
                const item = e.target.closest('.nds-dropmenu-item');
                if (!item) return;

                if (!item.hasAttribute('data-no-auto-close')) {
                    setTimeout(() => this.close(), 100);
                }

                // Skip re-dispatch when the menu is still nested inside the
                // wrapper (natural bubbling reaches ancestors), or when this
                // click is itself a re-dispatch (avoid feedback loops).
                if (this.dropmenu.contains(this.menu)) return;
                if (e.ndsDropmenuRedispatch) return;

                const synthetic = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                    view: window,
                    button: e.button,
                    buttons: e.buttons,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    screenX: e.screenX,
                    screenY: e.screenY,
                    ctrlKey: e.ctrlKey,
                    shiftKey: e.shiftKey,
                    altKey: e.altKey,
                    metaKey: e.metaKey,
                });
                synthetic.ndsDropmenuRedispatch = true;
                synthetic.ndsDropmenuItem = item;
                this.dropmenu.dispatchEvent(synthetic);
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

            // Enter inside the menu triggers the primary action (if tagged).
            // Buttons/anchors keep native Enter-to-click, and text inputs
            // keep Enter for their own submit handlers.
            if (e.key === 'Enter') {
                const tag = e.target.tagName;
                const isActionable = tag === 'BUTTON' || tag === 'A';
                const isTextInput = isInput && !e.altKey;
                if (!isActionable && !isTextInput) {
                    const primary = this.menu.querySelector('[data-dropmenu-primary]:not(:disabled)');
                    if (primary) {
                        e.preventDefault();
                        primary.click();
                        return;
                    }
                }
            }

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
            removeState(this.menu,     'closing');
            this.isOpen = true;

            // Portal first so subsequent measurement happens in <body>'s
            // containing block, free of any container-type/transform ancestor.
            // `data-portal-scope` on the wrapper opts in to mirroring parent
            // context as classes on the portaled menu, so SCSS that scoped
            // styles via descendant selectors (e.g.
            // `.nds-pagination-ellipsis .nds-dropmenu-menu`) keeps working
            // by adding a parallel `.nds-dropmenu-menu.nds-pagination-ellipsis`
            // selector.
            const scopeAttr = this.dropmenu.dataset.portalScope;
            const scopeClasses = scopeAttr
                ? scopeAttr.trim().split(/\s+/).filter(Boolean)
                : null;
            NDS.portal(this.menu, { snapshotVars: PORTAL_VARS, scopeClasses });

            addState(this.dropmenu, 'open', 'opening');
            addState(this.menu,     'open', 'opening');
            addState(this.trigger,  'open');
            this.trigger.setAttribute('aria-expanded', 'true');
            this.menu.setAttribute('aria-hidden', 'false');

            this.applyPosition();

            // Close on external scroll/resize. NDS.onOutsideScroll ignores
            // scrolls inside the menu itself so filters/scrollable content
            // keep working.
            this._offScroll = NDS.onOutsideScroll(this.menu, () => this.close());
            this._unsubResize = NDS.onResize(() => this.close());

            requestAnimationFrame(() => {
                removeState(this.dropmenu, 'opening');
                removeState(this.menu,     'opening');
            });
            this.emitEvent('nds:dropmenu:opened');
        }

        close() {
            this.isOpen = false;
            this._closeCancelled = false;

            if (this.menu.contains(document.activeElement)) this.trigger.focus();

            addState(this.dropmenu, 'closing');
            addState(this.menu,     'closing');
            this.trigger.setAttribute('aria-expanded', 'false');

            if (this._offScroll) { this._offScroll(); this._offScroll = null; }
            if (this._unsubResize) { this._unsubResize(); this._unsubResize = null; }

            let done = false;
            const cleanup = () => {
                if (done || this._closeCancelled) return;
                done = true;

                removeState(this.dropmenu, 'open', 'opening', 'closing');
                removeState(this.menu,     'open', 'opening', 'closing');
                removeState(this.trigger, 'open');
                this.dropmenu.removeAttribute('data-position-vertical');
                this.menu.removeAttribute('data-position-vertical');
                this.menu.style.cssText = '';
                const scroll = this.menu.querySelector('.nds-dropmenu-scroll');
                if (scroll) scroll.style.maxHeight = '';
                this.menu.setAttribute('aria-hidden', 'true');
                this.menu.removeEventListener('transitionend', onEnd);
                // Restore the menu to its original location so authored
                // markup queries (e.g. `dropmenu.querySelector(...)`) still
                // resolve while closed.
                NDS.unportal(this.menu);
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
            const gap = 4, pad = 8;

            const scroll = this.menu.querySelector('.nds-dropmenu-scroll');
            if (scroll) scroll.style.maxHeight = '';

            // Lock width in px before measurement. fit-content/max-content
            // are unreliable for position:fixed + block when children use
            // flex/grid or width:100%.
            this.menu.style.width = '';
            const vw = document.documentElement.clientWidth;
            const w = Math.min(this.menu.offsetWidth, vw - pad * 2);
            this.menu.style.width = w + 'px';

            // NDS.flipPosition returns raw space values + topEdge using the
            // sticky mainnav as the top boundary. We clamp topEdge to `pad`
            // for pages without the nav and subtract our own gap/pad from
            // the raw space values.
            const p = NDS.flipPosition(this.trigger, this.menu);
            const topEdge = Math.max(pad, p.topEdge);
            const spaceBelow = p.spaceBelow - gap - pad;
            // Recompute spaceAbove from triggerRect rather than reusing
            // p.spaceAbove because p.spaceAbove uses the unclamped p.topEdge
            // (which is 0 when no nav is present); we need the clamped value.
            const spaceAbove = p.triggerRect.top - gap - topEdge;
            // Flip up when space below is tight AND above has more room.
            const flipUp = spaceBelow < 400 && spaceAbove > spaceBelow;
            const available = flipUp ? spaceAbove : spaceBelow;

            if (scroll && p.menuRect.height > available) {
                const chrome = p.menuRect.height - scroll.getBoundingClientRect().height;
                scroll.style.maxHeight = Math.max(80, available - chrome) + 'px';
            }

            // Re-measure after the max-height clamp so placement uses the
            // final size.
            const mr2 = this.menu.getBoundingClientRect();
            if (flipUp) {
                this.dropmenu.setAttribute('data-position-vertical', 'top');
                this.menu.setAttribute('data-position-vertical', 'top');
            } else {
                this.dropmenu.removeAttribute('data-position-vertical');
                this.menu.removeAttribute('data-position-vertical');
            }

            let top = flipUp ? p.triggerRect.top - mr2.height - gap : p.triggerRect.bottom + gap;
            top = Math.max(topEdge, Math.min(top, p.viewportHeight - mr2.height - pad));

            let leftPx = this.isRTL ? p.triggerRect.right - mr2.width : p.triggerRect.left;
            leftPx = Math.max(pad, Math.min(leftPx, vw - mr2.width - pad));

            NDS.placeFixed(this.menu, top, leftPx);
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
            create: (element) => new NDSDropmenu(element),
            // Walks up from `el` to find the .nds-dropmenu wrapper. Falls
            // back to the menu's `_ownerDropmenu` backref when the menu has
            // been portaled to <body> (so closest can't reach the wrapper
            // through the DOM ancestor chain).
            from: (el) => {
                if (!el) return null;
                return el.closest('.nds-dropmenu')
                    || el.closest('.nds-dropmenu-menu')?._ownerDropmenu
                    || null;
            },
            // Returns the menu element for a wrapper, regardless of whether
            // the menu is currently nested inside or portaled to <body>.
            menuOf: (dropmenu) => dropmenu?.querySelector('.nds-dropmenu-menu')
                || dropmenu?._ownerMenu || null,
        };
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSDropmenu;
    }
})();
