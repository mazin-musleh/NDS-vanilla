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
    // Only consulted when the dropmenu opts in via `data-portal`; in-place
    // dropmenus inherit naturally and need no snapshot.
    const PORTAL_VARS = [
        '--menu-padding',
        '--dropmenu-width',
        '--dropmenu-min-width',
        '--dropmenu-max-width',
        '--dropmenu-slide',
    ];

    // Currently-open dropmenu wrappers, tracked module-locally so open() can
    // close peers without a DOM sweep by attribute selector. Maintained in
    // open()/close(); also cleared by destroy() via the close() it dispatches.
    const _openDropmenus = new Set();


    // ==============================================
    // DROPMENU CLASS
    // ==============================================

    class NDSDropmenu {
        constructor(dropmenuElement) {
            this.dropmenu = dropmenuElement;
            // Find the trigger that belongs to THIS dropmenu — not one nested
            // inside a child `.nds-dropmenu` (e.g. the date-picker's calendar
            // contains month/year sub-dropmenus, and a naive querySelector
            // would grab the first sub-trigger instead of falling back to the
            // wrapper). Same nesting-aware pattern as the menu click handler.
            this.trigger = this._findOwnDescendant(dropmenuElement, '.nds-dropmenu-trigger')
                || dropmenuElement;
            this.menu = this._findOwnDescendant(dropmenuElement, '.nds-dropmenu-menu');
            this.isOpen = false;

            if (!this.trigger || !this.menu) {
                console.warn('NDS Dropmenu: Missing trigger or menu element');
                return;
            }

            if (dropmenuElement.hasAttribute('data-nds-dropmenu-initialized')) return;

            // Cache references
            this.contentLayout = dropmenuElement.closest('.nds-content-layout')
                || document.querySelector('.nds-content-layout');

            // Portal opt-in. Authors add `data-portal` on the wrapper when the
            // menu needs to escape an ancestor stacking context (cards/modals
            // with z-index, transform/filter wrappers). Default is in-place
            // `position: absolute` so the menu scrolls with the trigger — no
            // close-on-scroll, no DOM reparenting.
            this.shouldPortal = dropmenuElement.hasAttribute('data-portal');

            // Backrefs so consumers walking up from a menu item can still
            // reach the wrapper after the menu is portaled to <body>. With
            // these, `el.closest('.nds-dropmenu-menu')?._ownerDropmenu`
            // works whether the menu is in original or portaled position.
            // Harmless when not portaled.
            this.menu._ownerDropmenu = this.dropmenu;
            this.dropmenu._ownerMenu = this.menu;

            // Expose the instance on the wrapper so the auto-close-others
            // loop in open() can find every NDSDropmenu, including those
            // built via `NDS.Dropmenu.create()` (autocomplete, date-picker
            // month/year, multiselect). Without this, manually-created
            // dropmenus stayed open when another one was opened.
            dropmenuElement.ndsDropmenu = this;

            this.init();
        }

        // ==============================================
        // UTILITY METHODS
        // ==============================================

        /** Find the first descendant matching `selector` whose nearest
         *  `.nds-dropmenu` ancestor is `root` — i.e. it isn't inside a
         *  nested sub-dropmenu. */
        _findOwnDescendant(root, selector) {
            const candidates = root.querySelectorAll(selector);
            for (let i = 0; i < candidates.length; i++) {
                if (candidates[i].closest('.nds-dropmenu') === root) return candidates[i];
            }
            return null;
        }

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
            return Array.from(this.menu.querySelectorAll(
                'input:not([type="hidden"]):not(:disabled), textarea:not(:disabled), :is(a, button).nds-dropmenu-item:not(:disabled)'
            ));
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
                initialItem = Array.from(this.menu.querySelectorAll('.nds-dropmenu-item'))
                    .find(el => NDS.State.has(el, 'selected')) || null;
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
                    // Cursor anchoring is opt-in via `data-anchor-cursor`: when
                    // set, stash the click x so applyPosition() anchors the menu
                    // under the cursor (useful for wide triggers). Default — and
                    // keyboard / programmatic opens — fall back to trigger-center.
                    // Cleared in close(). no-click consumers opt in by stashing
                    // instance._lastClickX themselves before toggle()/open() —
                    // see date-picker.
                    this._lastClickX = (this.dropmenu.hasAttribute('data-anchor-cursor')
                        && typeof e.clientX === 'number' && e.clientX > 0)
                        ? e.clientX
                        : null;
                    this.toggle();
                });
            }

            // Outside click — registered at CAPTURE phase so it fires before
            // any other dropmenu's trigger handler can `stopPropagation` and
            // block this listener at bubble. Without capture, clicking trigger
            // B doesn't close the already-open dropmenu A (A.open() does run
            // an auto-close-others loop, but only after A's trigger handler
            // returns — by then A is still "open").
            // Portal-aware: while open the menu may live at <body> level, so
            // events from menu items don't bubble through .nds-dropmenu —
            // treat clicks inside the menu as inside.
            this.handleOutsideClick = (e) => {
                if (this.dropmenu.contains(e.target) || this.menu.contains(e.target)) return;
                // Clicking away during a delayed first-open cancels it — otherwise
                // the menu would still pop open once the timer fired.
                if (this._cancelDelayedOpen()) return;
                if (this.isOpen) this.close();
            };
            document.addEventListener('click', this.handleOutsideClick, true);

            // Trigger + menu keyboard (skip if the consumer owns its own
            // keyboard navigation — date-picker uses 2D grid keys for the
            // day cells; autocomplete already stopPropagation's its own).
            // Escape stays bound below in either case so close-on-escape
            // remains uniform across dropmenus.
            if (!this.dropmenu.hasAttribute('data-dropmenu-no-keys')) {
                this.trigger.addEventListener('keydown', (e) => this.handleTriggerKeydown(e));

                this.menu.addEventListener('keydown', (e) => {
                    // For inputs: only handle Tab and Alt+Arrow
                    if (this.isInputElement(e.target)) {
                        const isNavKey = e.key === 'Tab'
                            || (e.altKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp'));
                        if (!isNavKey) return;
                    }
                    this.handleMenuKeydown(e);
                });
            }

            // Escape — listen on both dropmenu (for trigger focus) and menu
            // (for focus inside the portaled menu, which no longer bubbles
            // up to the dropmenu wrapper).
            const onEscape = (e) => {
                if (e.key !== 'Escape') return;
                if (this._cancelDelayedOpen()) {
                    e.stopPropagation();
                    return;
                }
                if (this.isOpen) {
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
                // Skip items that belong to a nested sub-dropmenu. Without
                // this guard a parent dropmenu (e.g. the date-picker's calendar)
                // auto-closes when the user picks an item from a child
                // dropmenu inside it (month/year selectors).
                if (item.closest('.nds-dropmenu-menu') !== this.menu) return;

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
            // A second click during a delayed first-open aborts it rather than
            // being swallowed by open()'s _delaying guard.
            if (this._cancelDelayedOpen()) return;
            this.isOpen ? this.close() : this.open();
        }

        // Abort a delayed first-open that hasn't fired yet: the user asked for the
        // menu, then changed their mind (clicked the trigger again, clicked away,
        // pressed Escape). data-delay stays put, so the next open still defers and
        // gives its consumer the nds:dropmenu:prepare hook. Returns true when a
        // pending open was actually cancelled.
        _cancelDelayedOpen() {
            if (!this._delaying) return false;
            clearTimeout(this._delayTimer);
            this._delaying = false;
            removeState(this.trigger, 'loading');
            return true;
        }


        open() {
            // Delayed-first-open mode (opt-in via data-delay="<ms>"). The first
            // open shows a loading state on the trigger, emits nds:dropmenu:prepare
            // so a consumer can populate the menu, then opens after <ms>. One-shot:
            // data-delay is removed once it fires, so later opens are immediate.
            // Lets components build menu content lazily without the open animation
            // racing a fast re-click or briefly showing an empty/mis-sized menu.
            if (this._delaying) return;   // a delayed open is already in flight
            if (this.dropmenu.hasAttribute('data-delay')) {
                const delay = parseInt(this.dropmenu.getAttribute('data-delay'), 10) || 0;
                this._delaying = true;
                addState(this.trigger, 'loading');
                this._delayTimer = setTimeout(() => {
                    this._delaying = false;
                    this.dropmenu.removeAttribute('data-delay');
                    this.emitEvent('nds:dropmenu:prepare');   // consumer builds content now
                    removeState(this.trigger, 'loading');
                    this.open();                              // real open — content is ready
                }, delay);
                return;
            }

            // Abort any in-flight close so its cleanup doesn't tear down the
            // menu we're about to re-open. No-op when no close is pending.
            this._cancelClose?.();

            // Close other open dropmenus — but skip ancestors of this one.
            // Date-picker has month/year sub-dropmenus inside the calendar's
            // dropmenu; opening a sub-dropmenu must not close its parent.
            _openDropmenus.forEach(el => {
                if (el === this.dropmenu) return;
                if (el.contains(this.dropmenu)) return; // ancestor — keep open
                if (el.ndsDropmenu) el.ndsDropmenu.close();
            });

            removeState(this.dropmenu, 'closing');
            removeState(this.menu,     'closing');
            this.isOpen = true;
            _openDropmenus.add(this.dropmenu);

            // Menu ships with [hidden] (intrinsic-state markup) — drop it
            // before measurement so applyPosition() reads real dimensions.
            // Park it out of flow first: at its `left: auto` static position a
            // menu wider than the space beside its trigger hangs past the
            // document edge, growing scrollWidth for the one layout pass before
            // applyPosition() runs. In RTL the browser then re-anchors the
            // scroll origin, so every rect applyPosition() reads is offset by
            // the overflow and the page keeps a phantom horizontal scrollbar.
            // Non-portal: park as absolute inside the wrapper so consumers
            //   that set --dropmenu-min-width: 100% (autocomplete, select)
            //   resolve % against the wrapper, not the viewport. Fixed-park
            //   inflated min-width:100% to 100vw, which applyPosition then
            //   locked into an inline width — the menu stayed viewport-wide
            //   until the next resize re-measured it as absolute.
            // Portal: menu goes to <body> and is fixed anyway; park stays fixed.
            this.menu.style.position = this.shouldPortal ? 'fixed' : 'absolute';
            this.menu.style.left = '0px';
            this.menu.style.top = '0px';
            this.menu.removeAttribute('hidden');

            // Portal (opt-in). When `data-portal` is set, move the menu to
            // <body> so it escapes any ancestor stacking context. `force: true`
            // bypasses NDS.portal's needsPortal heuristic — the author asked
            // explicitly. Mirror the attribute onto the menu so SCSS can
            // switch positioning to `fixed` (the menu's CSS targets
            // `.nds-dropmenu-menu[data-portal]`).
            if (this.shouldPortal) {
                this.menu.setAttribute('data-portal', '');
                NDS.portal(this.menu, { snapshotVars: PORTAL_VARS, force: true });
            }

            addState(this.dropmenu, 'open', 'opening');
            addState(this.menu,     'open', 'opening');
            addState(this.trigger,  'open');
            NDS.aria.expanded(this.trigger, true);
            NDS.aria.hidden(this.menu, false);

            this.applyPosition();

            // Viewport tracking on scroll only when portaled (menu is detached
            // from trigger via position:fixed so it'd drift otherwise). rAF-
            // throttled so the CPU cost is bounded to one read+write per frame
            // — cheap, and matches the original date-picker's track-on-scroll
            // behavior so users don't see the menu close mid-scroll.
            // In-place dropmenus scroll naturally with their wrapper; no
            // listener needed.
            if (this.shouldPortal) {
                const reposition = NDS.rafThrottle(() => this.trackPosition());
                this._offScroll = NDS.onOutsideScroll(this.menu, reposition);
            }
            // Resize-reposition (not close) — mobile browsers fire resize as
            // the address bar shows/hides during scroll, which would close
            // the menu mid-interaction otherwise. NDS.onResize is debounced
            // 150ms so the heavy applyPosition only runs once resize settles.
            this._unsubResize = NDS.onResize(() => this.applyPosition());

            requestAnimationFrame(() => {
                removeState(this.dropmenu, 'opening');
                removeState(this.menu,     'opening');
            });
            this.emitEvent('nds:dropmenu:opened');
        }

        close() {
            this.isOpen = false;
            _openDropmenus.delete(this.dropmenu);
            this._lastClickX = null;

            if (this.menu.contains(document.activeElement)) this.trigger.focus();

            addState(this.dropmenu, 'closing');
            addState(this.menu,     'closing');
            NDS.aria.expanded(this.trigger, false);

            if (this._offScroll) { this._offScroll(); this._offScroll = null; }
            if (this._unsubResize) { this._unsubResize(); this._unsubResize = null; }

            // Stored so open() can call this._cancelClose() to abort the
            // in-flight close if the user re-opens before the transition
            // finishes. Cleared at the end of the cleanup body.
            this._cancelClose = NDS.onTransitionEnd(this.menu, () => {
                removeState(this.dropmenu, 'open', 'opening', 'closing');
                removeState(this.menu,     'open', 'opening', 'closing');
                removeState(this.trigger, 'open');
                this.dropmenu.removeAttribute('data-position-vertical');
                this.menu.removeAttribute('data-position-vertical');
                this.menu.style.cssText = '';
                const scroll = this.menu.querySelector('.nds-dropmenu-scroll');
                if (scroll) scroll.style.maxHeight = '';
                NDS.aria.hidden(this.menu, true);
                // Restore the menu to its original location so authored
                // markup queries (e.g. `dropmenu.querySelector(...)`) still
                // resolve while closed. No-op when the menu wasn't portaled
                // (NDS.unportal returns early if there's no state).
                if (this.shouldPortal) {
                    NDS.unportal(this.menu);
                    this.menu.removeAttribute('data-portal');
                }
                // Restore the intrinsic [hidden] state so the menu can't
                // flash on the next paint if it re-enters the viewport.
                this.menu.setAttribute('hidden', '');
                this.emitEvent('nds:dropmenu:closed');
                this._cancelClose = null;
            });
        }

        // ==============================================
        // POSITION CALCULATION
        // ==============================================

        /**
         * Compute placement in viewport coords, then write either:
         *   - `position: fixed` viewport pixels (portaled mode), or
         *   - `position: absolute` offsetParent-relative pixels (default).
         * Vertical flips up when space below is tight; horizontal prefers
         * trigger-edge alignment (RTL-aware) then clamps to the viewport.
         * Same flip/clamp math in both modes — only the final coordinate
         * system differs.
         */
        applyPosition() {
            const gap = 4, pad = 8;

            // Own scroll region only — a bare querySelector would grab a
            // NESTED dropmenu's scroll (the date-picker calendar contains
            // month/year sub-dropmenus) and clamp another instance's list.
            let scroll = null;
            for (const s of this.menu.querySelectorAll('.nds-dropmenu-scroll')) {
                if (s.closest('.nds-dropmenu-menu') === this.menu) { scroll = s; break; }
            }
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
            // Flip up when the menu doesn't fit below AND above has more room
            // (real measured height, not a fixed threshold — a fits-below menu
            // must never flip, a taller-than-threshold one must not stay down).
            const flipUp = spaceBelow < p.menuRect.height && spaceAbove > spaceBelow;
            const available = flipUp ? spaceAbove : spaceBelow;

            let clamped = false;
            if (scroll && p.menuRect.height > available) {
                const chrome = p.menuRect.height - scroll.getBoundingClientRect().height;
                scroll.style.maxHeight = Math.max(80, available - chrome) + 'px';
                clamped = true;
            }

            // Re-measure only when the clamp changed the height; otherwise the
            // menu is unchanged since p.menuRect (no DOM write since), so reuse
            // it and skip a forced reflow.
            const mr2 = clamped ? this.menu.getBoundingClientRect() : p.menuRect;
            if (flipUp) {
                this.dropmenu.setAttribute('data-position-vertical', 'top');
                this.menu.setAttribute('data-position-vertical', 'top');
            } else {
                this.dropmenu.removeAttribute('data-position-vertical');
                this.menu.removeAttribute('data-position-vertical');
            }

            // Glued to the trigger edge, no vertical viewport clamp:
            // scrollable menus were already shrunk to `available` (they fit),
            // and a rigid menu (calendar) that fits neither side must overflow
            // the viewport edge rather than slide over its own trigger — page
            // scroll can reveal an off-edge menu, a covered input never
            // recovers. Matches trackPosition(), which never clamped.
            const top = flipUp ? p.triggerRect.top - mr2.height - gap : p.triggerRect.bottom + gap;

            // Horizontal: default anchors the menu on click x (so wide
            // triggers open near where the user clicked), falling back to
            // trigger center for keyboard / programmatic opens. Opt-in
            // `data-anchor="start|end"` on the wrapper pins the menu's
            // matching edge to the trigger's edge instead — RTL-aware via
            // the trigger's computed direction (useful for multiselect
            // where the menu should line up with the field's start edge,
            // not float centered on a wide input). When the menu fits
            // inside the trigger (narrow menu, wide trigger), additionally
            // clamp centered menus inside the trigger's horizontal bounds
            // so they never overshoot past the trigger edges. Then clamp
            // to the viewport.
            const anchor = this.dropmenu.getAttribute('data-anchor');
            let leftPx;
            if (anchor === 'start' || anchor === 'end') {
                // Try the requested edge first; if it would clip past the
                // viewport, flip to the opposite edge (same idea as the
                // vertical flipUp above). Keeps the menu edge-aligned to
                // the trigger instead of sliding out of alignment on clip.
                // The final viewport clamp below still catches trigger-at-
                // edge cases where both sides don't fit.
                const startAtLeft = (getComputedStyle(this.trigger).direction !== 'rtl') === (anchor === 'start');
                const primary = startAtLeft ? p.triggerRect.left : p.triggerRect.right - mr2.width;
                const flipped = startAtLeft ? p.triggerRect.right - mr2.width : p.triggerRect.left;
                const primaryFits = primary >= pad && primary + mr2.width <= vw - pad;
                leftPx = primaryFits ? primary : flipped;
            } else {
                const anchorX = (this._lastClickX != null)
                    ? this._lastClickX
                    : p.triggerRect.left + p.triggerRect.width / 2;
                leftPx = anchorX - mr2.width / 2;
                if (mr2.width <= p.triggerRect.width) {
                    leftPx = Math.max(p.triggerRect.left, Math.min(leftPx, p.triggerRect.right - mr2.width));
                }
            }
            leftPx = Math.max(pad, Math.min(leftPx, vw - mr2.width - pad));

            // Cache flip direction so the scroll-tracker can reuse it without
            // re-running flip math (and without re-clamping the menu to the
            // viewport — clamping would desync the menu from a trigger that
            // scrolled off-screen).
            this._flipUp = flipUp;

            if (this.shouldPortal) {
                // The [data-portal] rule already makes the menu fixed; drop the
                // inline park so the stylesheet governs.
                this.menu.style.position = '';
                NDS.placeFixed(this.menu, top, leftPx);
            } else {
                // Absolute: anchor to offsetParent (the dropmenu wrapper via
                // `position: relative`). Convert viewport coords by subtracting
                // the parent's rect. offsetParent is null while the menu is
                // parked as fixed (see open()), so fall back to the wrapper —
                // which is the real offsetParent once position is restored.
                // Read the rect BEFORE unparking: the moment the menu goes back
                // to `absolute` with no offsets it snaps to its static position
                // and can overflow the document, which would skew this read.
                const op = this.menu.offsetParent || this.dropmenu;
                const opRect = op.getBoundingClientRect();
                this.menu.style.position = '';
                this.menu.style.top = (top - opRect.top) + 'px';
                this.menu.style.left = (leftPx - opRect.left) + 'px';
            }
        }

        // Lightweight scroll-time placement for portaled mode. Reuses the
        // flip direction cached by applyPosition() and only re-reads the
        // trigger rect + menu size, so each frame is a single read + write
        // pair. Critically: no viewport clamp — letting the menu follow the
        // trigger off-screen is what "tracking" means; clamping would freeze
        // the menu against a viewport edge while the trigger scrolled past.
        trackPosition() {
            const gap = 4;
            const tRect = this.trigger.getBoundingClientRect();
            const mRect = this.menu.getBoundingClientRect();
            const top = this._flipUp
                ? tRect.top - mRect.height - gap
                : tRect.bottom + gap;
            const anchor = this.dropmenu.getAttribute('data-anchor');
            let left;
            if (anchor === 'start' || anchor === 'end') {
                const startAtLeft = (getComputedStyle(this.trigger).direction !== 'rtl') === (anchor === 'start');
                left = startAtLeft ? tRect.left : tRect.right - mRect.width;
            } else {
                left = tRect.left + (tRect.width - mRect.width) / 2;
            }
            // Keep the horizontal viewport clamp — users can't scroll
            // sideways to recover off-screen content.
            const pad = 8;
            const vw = document.documentElement.clientWidth;
            left = Math.max(pad, Math.min(left, vw - mRect.width - pad));
            NDS.placeFixed(this.menu, top, left);
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
            // Cancel a pending delayed-open timer so it can't fire on the
            // detached/cloned wrapper after teardown.
            clearTimeout(this._delayTimer);
            // Drain the open-lifecycle subscriptions before tearing the
            // wrapper down. close() releases this._offScroll (NDS.onOutsideScroll)
            // and this._unsubResize (NDS.onResize) synchronously at the top of
            // its body — without this guard, destroy-while-open strands both
            // pooled subscribers for the page lifetime.
            if (this.isOpen) this.close();
            // close() schedules NDS.unportal via setTimeout 200ms later;
            // calling it synchronously here ensures the menu is restored to
            // its original parent before replaceWith detaches that parent —
            // otherwise the late unportal reparents into a detached node.
            // No-op when shouldPortal is false (unportal returns early).
            if (this.shouldPortal) NDS.unportal(this.menu);
            if (this.handleOutsideClick) {
                document.removeEventListener('click', this.handleOutsideClick, true);
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
