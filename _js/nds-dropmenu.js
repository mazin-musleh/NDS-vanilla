/* NDS.Dropmenu — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Dropmenu.init() / .reinit()      scan + initialize dropmenu wrappers
 *   NDS.Dropmenu.create(el)              instance one .nds-dropmenu wrapper
 *   NDS.Dropmenu.destroy(el)             tear one down before you discard its wrapper
 *   NDS.Dropmenu.from(el)                the wrapper that owns any element inside it
 *   NDS.Dropmenu.menuOf(dropmenu)        the wrapper's menu
 * Events (bubble from the .nds-dropmenu wrapper):
 *   nds:dropmenu:prepare   detail {dropmenu, trigger, menu, isOpen} — before lazy content builds
 *   nds:dropmenu:opened    detail {dropmenu, trigger, menu, isOpen}
 *   nds:dropmenu:closed    detail {dropmenu, trigger, menu, isOpen}
 *   nds:dropmenu:selected  detail {dropmenu, item, value}
 * Hooks:
 *   data-anchor · data-anchor-cursor · data-position-vertical
 *   data-delay
 *   data-no-auto-close · data-dropmenu-no-click · data-dropmenu-no-keys · data-dropmenu-primary
 *   data-search · data-search-empty · data-search-item · data-search-value
 *   data-select-name · data-select-value · data-required · data-trigger-label · data-value
 * Gotchas:
 *   - An instance holds a document-level click listener, so dropping its wrapper from
 *     the DOM (replacing a table row, closing a view) leaks it and the detached subtree.
 *     Call destroy(el) first. reinit() covers the other side: wrappers you ADD.
 *   - nds:dropmenu:prepare is the lazy-content hook; opened fires after placement.
 *   - Opt-in lazy menu: an own <template> child holding the menu is stamped +
 *     constructed on the first trigger click. Self-owned menus only — never one
 *     that filter/share read at init or multiselect builds into.
 *   - data-position-vertical is written by the component (a CSS hook), never set it yourself.
 *   - The open menu sits in the browser's top layer (popover="manual", stamped at init):
 *     nothing clips it and it stays in place in the DOM, so closest(), bubbling and the
 *     wrapper's knobs and theme reach it. Page scroll carries it; it closes when its trigger
 *     leaves view or, outside a modal, when it reaches the sticky nav. Without popover support
 *     (Safari < 17, Firefox < 125) it is fixed and follows every scroll, so a scroll box cannot cut it.
 */

/**
 * NDS Dropmenu Component
 * Unified dropdown menu functionality with accessibility support
 * Handles click outside, keyboard navigation, ARIA attributes,
 * direction-aware positioning, and boundary detection
 */

(function() {
    'use strict';

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.strings('dropmenu', {
        search: 'Search items',
        search_placeholder: 'Search…',
        clear_search: 'Clear search',
        no_results: 'No results',
    });

    // State helpers — delegated to NDS.State (nds-core.js)
    const { add: addState, remove: removeState } = NDS.State;

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

            if (!this.menu) {
                console.warn('NDS Dropmenu: Missing menu element');
                return;
            }

            if (dropmenuElement.hasAttribute('data-nds-dropmenu-initialized')) return;

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
         *  nested sub-dropmenu. Wrapper-boundary form, for parts that live on
         *  the WRAPPER: the constructor's trigger/menu lookup (`this.menu`
         *  doesn't exist yet there) and select mode's hidden input. Everything
         *  scoped to the MENU uses the menu-boundary readers below. */
        _findOwnDescendant(root, selector) {
            const candidates = root.querySelectorAll(selector);
            for (let i = 0; i < candidates.length; i++) {
                if (candidates[i].closest('.nds-dropmenu') === root) return candidates[i];
            }
            return null;
        }

        // ── Ownership ─────────────────────────────────────────────
        // A menu may host a nested `.nds-dropmenu` whose parts match every
        // selector this component owns (the date-picker's calendar contains
        // month/year sub-dropmenus). A bare `this.menu.querySelector(All)`
        // therefore claims the CHILD instance's items, scroll region and
        // focusables. Every post-init derivation of "elements this instance
        // owns" routes through these three, so a new call site can't
        // re-derive the set unguarded.

        /** True when `el`'s nearest `.nds-dropmenu-menu` is our own menu. */
        _owns(el) {
            return !!el && el.closest('.nds-dropmenu-menu') === this.menu;
        }

        /** Every own element matching `selector`, in DOM order. */
        _ownItems(selector = '.nds-dropmenu-item') {
            return Array.from(this.menu.querySelectorAll(selector)).filter(el => this._owns(el));
        }

        /** First own element matching `selector`, or null. */
        _ownFirst(selector) {
            const candidates = this.menu.querySelectorAll(selector);
            for (let i = 0; i < candidates.length; i++) {
                if (this._owns(candidates[i])) return candidates[i];
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

        /** Get all focusable elements in the menu in DOM order. [hidden]
         *  elements are skipped — focus() on them silently fails, which would
         *  wedge the Tab walk on their neighbor. */
        getFocusableElements() {
            return this._ownItems(
                'input:not([type="hidden"]):not(:disabled):not([hidden]), textarea:not(:disabled):not([hidden]), :is(a, button).nds-dropmenu-item:not(:disabled):not([hidden])'
            );
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
            // One controller for every listener this instance attaches, so destroy()
            // releases them atomically without touching consumer-attached listeners.
            this.abortController = new AbortController();
            this.menu.setAttribute('popover', 'manual');
            // No popover (Safari < 17, Firefox < 125): fixed, so a scroll box cannot cut it off.
            // Set here, not in CSS: Safari 16.4 parses :popover-open but has no popover.
            if (!this.menu.showPopover) this.menu.style.position = 'fixed';
            this.setupAria();
            this.setupEventListeners();
            this.setupSelectMode();
            this.setupSearch();
            this.dropmenu.setAttribute('data-nds-dropmenu-initialized', 'true');
        }

        // ==============================================
        // SEARCH MODE (opt-in filter box)
        // ==============================================
        // `data-search`         — always show the search box.
        // `data-search="50"`    — show only when the menu holds ≥ 50 filterable items.
        // `data-search-empty="…"` — override the default "No results" text.
        //
        // Item selector — a single attribute drives both opt-in and opt-out:
        //   default: every `.nds-dropmenu-item` is filterable.
        //   `[data-search-item]`         opts a custom wrapper INTO the filter
        //                                 (checkbox labels, group rows).
        //   `[data-search-item="false"]` opts a specific item OUT (e.g. a persistent
        //                                 "Select all" row that must always show).
        //
        // Per-item `data-search-value="…"` appends extra tokens to the haystack
        // (English aliases next to an Arabic label, IDs, keywords).

        setupSearch() {
            const attr = this.dropmenu.getAttribute('data-search');
            if (attr === null) return;

            const itemSelector = ':is(.nds-dropmenu-item, [data-search-item]):not([data-search-item="false"])';
            // Nesting-aware: a plain querySelector would grab the scroll of a
            // nested sub-dropmenu and inject this menu's search box into it.
            const scroll = this._ownFirst('.nds-dropmenu-scroll');
            if (!scroll) return;
            const { signal } = this.abortController;

            // The scroll's items only: footer buttons (Apply, Reset) are .nds-dropmenu-item too.
            const items = () => this._ownItems(itemSelector).filter(el => scroll.contains(el));
            const threshold = parseInt(attr, 10) || 0;
            if (threshold && items().length < threshold) return;

            // Search box — canonical `.nds-form-container > .nds-form-control` so
            // nds-forms.js wires the .nds-clear button (auto show/hide + reset)
            // for free. The `nds-dropmenu-search` modifier is a menu-scoped
            // padding/border tweak, not a new component.
            const searchHTML = `<div class="nds-form-container nds-dropmenu-search">
                <div class="nds-form-control">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <input type="text" class="nds-search-input">
                    <div class="nds-form-action">
                        <button type="button" class="nds-btn nds-subtle nds-clear nds-icon-only" hidden>
                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>`;
            this.menu.insertAdjacentHTML('afterbegin', searchHTML);
            // Hold the node we just injected — destroy() removes exactly this one,
            // rather than re-querying (which can mis-hit a nested menu's box).
            const searchBox = this.menu.firstElementChild;
            const searchInput = searchBox.querySelector('.nds-search-input');
            strings.set(searchInput, 'aria-label', 'search');
            strings.set(searchInput, 'placeholder', 'search_placeholder');
            strings.set(searchBox.querySelector('.nds-clear'), 'aria-label', 'clear_search');
            // Wire the .nds-clear button — forms init ran before this injection,
            // so the injected .nds-form-control needs its own pass. Soft
            // dependency — the search box stays a plain input if NDS.Forms
            // isn't bundled (no clear button, no container interaction states).
            NDS.Forms?.initializeContainer(searchBox);

            // Empty state — reuses .nds-empty-placeholder for the visual grammar
            // (shared with NDS.Empty via _empty.scss) and carries
            // data-nds-empty-placeholder so if someone ever wraps the scroll in
            // nds-empty it's recognized as an existing placeholder (not counted
            // as a real child, not re-injected). JS toggles [hidden] directly
            // — NDS.Empty's own detection triggers on CHILD absence, not
            // VISIBILITY, so hidden-item filtering would never fire it.
            // Injected at TOP of scroll so the "No results" message sits under
            // the search input (it IS the search's response). Also reads
            // correctly when opt-out items (data-search-item="false") are
            // pinned — they stay visible as a footer of always-available
            // actions below the empty message.
            const emptyHTML = `<div class="nds-empty-placeholder" data-nds-empty-placeholder hidden aria-live="polite">
                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                <span class="nds-empty-message"></span>
            </div>`;
            scroll.insertAdjacentHTML('afterbegin', emptyHTML);
            const emptyMsg = scroll.querySelector('[data-nds-empty-placeholder] .nds-empty-message');
            const customEmpty = this.dropmenu.getAttribute('data-search-empty');
            if (customEmpty) emptyMsg.textContent = customEmpty; else strings.set(emptyMsg, 'text', 'no_results');

            this.searchInput = this._ownFirst('.nds-dropmenu-search .nds-search-input');
            const emptyEl = scroll.querySelector('[data-nds-empty-placeholder]');

            // Case-insensitive + diacritic-stripped so "مطار" matches "المَطار"
            // and "cafe" matches "café". Arabic harakat are in the Unicode
            // Diacritic category, so \p{Diacritic} covers both scripts in one pass.
            const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

            const filter = () => {
                // The debounced input handler can still fire after destroy()
                // tore the search box down — abort() can't cancel its timer.
                if (!this.searchInput) return;
                const q = norm(this.searchInput.value.trim());
                let visible = 0;
                for (const item of items()) {
                    const haystack = norm(item.textContent + ' ' + (item.getAttribute('data-search-value') || ''));
                    const match = !q || haystack.includes(q);
                    item.hidden = !match;
                    if (match) visible++;
                }
                // A group with no match hides, and so does a divider left with nothing on one side.
                for (const group of this._ownItems('.nds-dropmenu-group')) {
                    const rows = group.querySelectorAll(itemSelector);
                    group.hidden = !!q && rows.length > 0 && Array.prototype.every.call(rows, r => r.hidden);
                }
                let prev = null;
                for (const el of scroll.children) {
                    if (el === emptyEl || (el.hidden && el.tagName !== 'HR')) continue;
                    if (el.tagName === 'HR') el.hidden = !!q && (!prev || prev.tagName === 'HR');
                    if (!el.hidden) prev = el;
                }
                if (q && prev && prev.tagName === 'HR') prev.hidden = true;
                emptyEl.hidden = visible > 0 || !q;
            };

            // destroy() calls this: replay the filter with an empty query (its own
            // semantics, not a blanket [hidden] sweep) then drop both injected nodes.
            this._teardownSearch = () => {
                this.searchInput.value = '';
                filter();
                searchBox.remove();
                emptyEl.remove();
                this.searchInput = null;
                this._teardownSearch = null;
            };

            // nds-forms.js's clear button dispatches an `input` event on the
            // field, so this same handler covers both typing AND clear-click.
            // Debounced: filter() re-walks every item and normalizes its text
            // (NFD + \p{Diacritic}), and the search box only appears once the
            // menu is large — running that per keystroke is the INP cost.
            // Escape / clear-on-close / teardown call filter() directly, so
            // only the typing path waits.
            this.searchInput.addEventListener('input', NDS.debounce(filter, 120), { signal });

            this.searchInput.addEventListener('keydown', (e) => {
                // Two-stage Escape: first press clears the query, second closes
                // the menu (falls through to the existing menu-scope onEscape).
                if (e.key === 'Escape') {
                    if (this.searchInput.value) {
                        e.stopPropagation();
                        e.preventDefault();
                        this.searchInput.value = '';
                        filter();
                    }
                    return;
                }
                // Both branches read the filtered set, but `input` is debounced
                // and keydown precedes it — so a key pressed inside the window
                // would act on the PREVIOUS query's matches. Settle first; this
                // is one pass per keypress-to-act, not per keystroke.
                if (e.key === 'ArrowDown' || e.key === 'Enter') filter();
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    items().find(el => !el.hidden)?.focus();
                    return;
                }
                if (e.key === 'Enter') {
                    e.preventDefault();
                    items().find(el => !el.hidden)?.click();
                }
            }, { signal });

            // Autofocus on open, reset on close — each open is a fresh state.
            this.dropmenu.addEventListener('nds:dropmenu:opened', () => this.searchInput.focus(), { signal });
            this.dropmenu.addEventListener('nds:dropmenu:closed', () => {
                if (!this.searchInput.value) return;
                this.searchInput.value = '';
                filter();
            }, { signal });
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
        //   - Events: hidden input fires `input` + `change`; dropmenu fires
        //     `nds:dropmenu:selected` with { item, value } in detail.

        setupSelectMode() {
            const name = this.dropmenu.getAttribute('data-select-name');
            if (!name) return;
            const { signal } = this.abortController;

            // Wrapper-boundary lookup: a nested select-mode dropmenu keeps its
            // own hidden input inside our menu, and a bare querySelector would
            // adopt it (renaming the child's field) on a destroy → re-init.
            let hidden = this._findOwnDescendant(this.dropmenu, 'input[type="hidden"][data-nds-select-value]');
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
                initialItem = this._ownItems()
                    .find(el => el.getAttribute('data-value') === initialValue) || null;
            }
            if (!initialItem) {
                initialItem = this._ownItems()
                    .find(el => NDS.State.has(el, 'selected')) || null;
            }
            if (initialItem) this.applySelection(initialItem, { silent: true });

            this.menu.addEventListener('click', (e) => {
                const item = e.target.closest('.nds-dropmenu-item');
                // Ownership guard, same as the auto-close handler below: a
                // nested sub-dropmenu's items match this selector and carry
                // data-value (date-picker's month/year), so without it the
                // CHILD's value lands in THIS picker's hidden input, trigger
                // label and nds:dropmenu:selected payload.
                if (!this._owns(item)) return;
                if (item.hasAttribute('data-value')) this.applySelection(item);
            }, { signal });
        }

        applySelection(item, opts = {}) {
            const value = item.getAttribute('data-value') || '';
            if (this.selectHidden && opts.silent) this.selectHidden.value = value;

            // Trigger label: prefer per-item data-trigger-label for cases
            // where the dropdown row is descriptive ("Saudi Arabia (+966)")
            // but the trigger slot needs something compact ("+966").
            const triggerAttr = item.getAttribute('data-trigger-label');
            const itemLabel = item.querySelector('.nds-label');
            const labelText = triggerAttr != null
                ? triggerAttr
                : (itemLabel ? itemLabel.textContent : item.textContent.trim());

            // Skip when the trigger fell back to the wrapper (no
            // .nds-dropmenu-trigger in the markup): the .nds-label lookup would
            // then hit the first menu ITEM's label, and the textContent branch
            // would wipe the wrapper, menu included.
            if (this.trigger !== this.dropmenu) {
                const triggerLabel = this.trigger.querySelector('.nds-label');
                if (triggerLabel) triggerLabel.textContent = labelText;
                else this.trigger.textContent = labelText;
            }

            this._ownItems().forEach((o) => {
                if (o !== item) NDS.State.clear(o);
            });
            NDS.State.set(item, 'selected');

            if (!opts.silent) {
                if (this.selectHidden) NDS.setValue(this.selectHidden, value);
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
            this._ownItems().forEach(item => {
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
            const { signal } = this.abortController;
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
                }, { signal });
            }

            // Trigger + menu keyboard (skip if the consumer owns its own
            // keyboard navigation — date-picker uses 2D grid keys for the
            // day cells; autocomplete already stopPropagation's its own).
            // Escape stays bound below in either case so close-on-escape
            // remains uniform across dropmenus.
            if (!this.dropmenu.hasAttribute('data-dropmenu-no-keys')) {
                this.trigger.addEventListener('keydown', (e) => this.handleTriggerKeydown(e), { signal });

                this.menu.addEventListener('keydown', (e) => {
                    // A nested sub-menu's keys bubble here; that menu handles its own.
                    if (e.target.closest('.nds-dropmenu-menu') !== this.menu) return;
                    // For inputs: only handle Tab and Alt+Arrow
                    if (this.isInputElement(e.target)) {
                        const isNavKey = e.key === 'Tab'
                            || (e.altKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp'));
                        if (!isNavKey) return;
                    }
                    this.handleMenuKeydown(e);
                }, { signal });
            }

            // Escape — the menu is inside the wrapper, so one listener hears both.
            const onEscape = (e) => {
                if (e.key !== 'Escape') return;
                // preventDefault too: a <dialog> around the menu reads an unhandled Escape as its own close.
                if (this._cancelDelayedOpen()) {
                    e.stopPropagation();
                    e.preventDefault();
                    return;
                }
                if (this.isOpen) {
                    e.stopPropagation();
                    e.preventDefault();
                    this.close();
                    this.trigger.focus();
                }
            };
            this.dropmenu.addEventListener('keydown', onEscape, { signal });
            this._onEscape = onEscape;
            // Something else hid the menu (a closing modal): close with it, so the state follows.
            this.menu.addEventListener('toggle', (e) => { if (e.newState === 'closed' && this.isOpen) this.close(); }, { signal });

            // Item click auto-close.
            this.menu.addEventListener('click', (e) => {
                const item = e.target.closest('.nds-dropmenu-item');
                // A nested sub-dropmenu's item (date-picker month/year) leaves its parent open.
                if (!item || !this._owns(item)) return;
                if (!item.hasAttribute('data-no-auto-close')) {
                    setTimeout(() => this.close(), 100);
                }
            }, { signal });
        }

        // On document only while open or opening: a closed menu has nothing to close, and a
        // page with a hundred menus ran a hundred listeners on every click and keypress.
        _listenDocument() {
            if (this._docAC) return;
            this._docAC = new AbortController();
            const { signal } = this._docAC;
            // Outside click, at CAPTURE: another menu's trigger stops its click at bubble,
            // and that click must still close this one.
            document.addEventListener('click', (e) => {
                if (this.dropmenu.contains(e.target)) return;
                // Clicking away during a delayed first-open cancels it — otherwise
                // the menu would still pop open once the timer fired.
                if (this._cancelDelayedOpen()) return;
                if (this.isOpen) this.close();
            }, { capture: true, signal });
            // Safari leaves focus on the page or the modal around a clicked trigger: Escape there closes
            // the newest open menu, before a <dialog> around it reads the key as its own close.
            document.addEventListener('keydown', (e) => {
                if (e.key !== 'Escape' || [..._openDropmenus].pop() !== this.dropmenu
                    || this.dropmenu.contains(e.target) || !e.target.contains?.(this.dropmenu)) return;
                e.stopImmediatePropagation();
                this._onEscape(e);
            }, { capture: true, signal });
        }

        _unlistenDocument() {
            this._docAC?.abort();
            this._docAC = null;
        }

        // ==============================================
        // KEYBOARD HANDLERS
        // ==============================================

        // The item representing the menu's current value — a row a component
        // stamped data-state active (pagination's current page, sort's active
        // option) or selected (picker mode, custom select). Keyboard-open lands
        // focus there instead of the list edge.
        getCurrentItem() {
            return this._ownFirst('.nds-dropmenu-item:is([data-state~="active"], [data-state~="selected"]):not(:disabled):not([hidden])');
        }

        handleTriggerKeydown(e) {
            // Focusables are enumerated AFTER toggle()/open() — lazily-populated
            // menus (pagination's ellipsis, data-delay consumers) have no items
            // until open() has run.
            switch (e.key) {
                case 'Enter':
                case ' ': {
                    e.preventDefault();
                    this.toggle();
                    const elements = this.getFocusableElements();
                    if (this.isOpen && elements.length) (this.getCurrentItem() || elements[0]).focus();
                    break;
                }
                case 'ArrowDown': {
                    e.preventDefault();
                    this.open();
                    const elements = this.getFocusableElements();
                    if (elements.length) (this.getCurrentItem() || elements[0]).focus();
                    break;
                }
                case 'ArrowUp': {
                    e.preventDefault();
                    this.open();
                    const elements = this.getFocusableElements();
                    if (elements.length) (this.getCurrentItem() || elements[elements.length - 1]).focus();
                    break;
                }
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
                    const primary = this._ownFirst('[data-dropmenu-primary]:not(:disabled)');
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
            if (!this.isOpen) this._unlistenDocument();
            return true;
        }


        open() {
            // Already open: a second open() would overwrite _offScroll and
            // _unsubResize, stranding the pooled subscribers the first one
            // registered (close() only releases the last pair). Reachable via
            // handleTriggerKeydown, which calls open() unconditionally on
            // Arrow keys. Reposition with applyPosition(), not a re-open.
            if (this.isOpen) return;
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
                this._listenDocument();
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
                if (this._isNestedIn(el)) return; // ancestor — keep open
                if (el.ndsDropmenu) el.ndsDropmenu.close();
            });

            removeState(this.dropmenu, 'closing');
            removeState(this.menu,     'closing');
            this.isOpen = true;
            _openDropmenus.add(this.dropmenu);
            this._listenDocument();

            // A % width (`--dropmenu-min-width: 100%` on custom-select, autocomplete,
            // filter, …) means the wrapper's width, but the top layer resolves it
            // against the viewport. Convert to px while the menu is still closed.
            // Read all three before writing any: a write between reads re-flushes style.
            const wrapperWidth = this.dropmenu.getBoundingClientRect().width;
            const mcs = getComputedStyle(this.menu);
            const widthVars = ['--dropmenu-width', '--dropmenu-min-width', '--dropmenu-max-width'];
            const widthVals = widthVars.map(v => mcs.getPropertyValue(v).trim());
            for (let i = 0; i < widthVars.length; i++) {
                if (widthVals[i].endsWith('%')) {
                    this.menu.style.setProperty(widthVars[i], (wrapperWidth * parseFloat(widthVals[i]) / 100) + 'px');
                }
            }

            // A modal covers the sticky nav; anywhere else the menu would paint over
            // it, so placement keeps clear of it and the menu closes when it gets there.
            // ponytail: a Panel raised over the nav with its own --panel-z is not
            // detected; read the trigger's layer if one ever needs it.
            this._respectNav = !this.trigger.closest('.nds-modal, dialog:modal');
            const nav = this._respectNav && document.querySelector('.nds-main-nav');
            this._nav = nav && !nav.contains(this.trigger)
                && this.trigger.getBoundingClientRect().bottom > nav.getBoundingClientRect().top ? nav : null;

            this.menu.removeAttribute('hidden');
            NDS.topLayer(this.menu, true);

            addState(this.dropmenu, 'open', 'opening');
            addState(this.menu,     'open', 'opening');
            addState(this.trigger,  'open');
            NDS.aria.expanded(this.trigger, true);
            NDS.aria.hidden(this.menu, false);

            this.applyPosition();

            // Absolute in the top layer: page scroll carries the menu with no JS. Only a
            // scroll box around the trigger moves one without the other. rAF-throttled.
            // Without popover the menu is fixed, so page scroll moves it too.
            const reposition = NDS.rafThrottle(() => this.trackPosition());
            const fixed = !this.menu.showPopover;
            const onScroll = (e) => { if (e.target === document ? fixed : e.target.contains?.(this.trigger)) reposition(); };
            document.addEventListener('scroll', onScroll, { capture: true, passive: true });
            this._offScroll = () => document.removeEventListener('scroll', onScroll, { capture: true });
            // Close when the trigger leaves view (its scroll box hid it) or the menu reaches the sticky nav.
            const leave = () => { if (this.isOpen) this.close(); };
            this._offView = [NDS.onIntersect(this.trigger, (e) => { if (!e.isIntersecting) leave(); })];
            if (this._nav) {
                // The nav's stuck bottom: until it sticks it scrolls with the menu and never meets it.
                // ponytail: a nav that hides on scroll would need a live line, not one read at open.
                const navBottom = (parseFloat(getComputedStyle(this._nav).top) || 0) + this._nav.offsetHeight;
                // Only the top edge counts: the huge margins keep the rest of the menu "in view".
                this._offView.push(NDS.onIntersect(this.menu, (e) => { if (e.intersectionRatio < 1) leave(); },
                    { threshold: 1, rootMargin: `${-navBottom}px 100000px 100000px 100000px` }));
            }
            // Resize-reposition (not close) — mobile browsers fire resize as
            // the address bar shows/hides during scroll, which would close
            // the menu mid-interaction otherwise. NDS.onResize is debounced
            // 150ms so the heavy applyPosition only runs once resize settles.
            this._unsubResize = NDS.onResize(() => this.applyPosition());
            // Keep scroll momentum off the page (its scroll closes the menu), but only while
            // the list scrolls: on a list that fits, `contain` swallows the page's wheel.
            // Watched while open, since search, results and populate change its length.
            const list = this._ownFirst('.nds-dropmenu-scroll');
            if (list) this._offListSize = NDS.onElementResize(list, () => {
                const value = list.scrollHeight > list.clientHeight ? 'contain' : '';
                return () => { list.style.overscrollBehavior = value; };
            });

            requestAnimationFrame(() => {
                removeState(this.dropmenu, 'opening');
                removeState(this.menu,     'opening');
            });
            this.emitEvent('nds:dropmenu:opened');
        }

        close() {
            this.isOpen = false;
            _openDropmenus.delete(this.dropmenu);
            this._unlistenDocument();
            // A nested open menu (date-picker month/year) is its own popover: it
            // would stay in the top layer after this one leaves.
            _openDropmenus.forEach(el => {
                if (this.dropmenu.contains(el)) el.ndsDropmenu?.close();
            });
            this._lastClickX = null;

            if (this.menu.contains(document.activeElement)) this.trigger.focus();

            addState(this.dropmenu, 'closing');
            addState(this.menu,     'closing');
            NDS.aria.expanded(this.trigger, false);

            if (this._offScroll) { this._offScroll(); this._offScroll = null; }
            if (this._offView) { this._offView.forEach((off) => off()); this._offView = null; }
            if (this._unsubResize) { this._unsubResize(); this._unsubResize = null; }
            if (this._offListSize) { this._offListSize(); this._offListSize = null; }

            // Stored so open() can call this._cancelClose() to abort the
            // in-flight close if the user re-opens before the transition
            // finishes. Cleared at the end of the cleanup body.
            // Cancel first — close() has no re-entry guard, and re-arming over a
            // live handle strands it: both fire, so _finishClose() runs twice.
            this._cancelClose?.();
            this._cancelClose = NDS.onTransitionEnd(this.menu, () => this._finishClose());
        }

        /** Post-transition close cleanup. Split out of close() so destroy()
         *  can run it synchronously instead of leaving it queued: a queued
         *  run lands after teardown and would strip the state of whatever
         *  instance owns the wrapper by then (a reinit sweep in that window
         *  builds a new one). */
        _finishClose() {
            removeState(this.dropmenu, 'open', 'opening', 'closing');
            removeState(this.menu,     'open', 'opening', 'closing');
            removeState(this.trigger, 'open');
            this.dropmenu.removeAttribute('data-position-vertical');
            this.menu.removeAttribute('data-position-vertical');
            this.menu.style.cssText = '';
            const scroll = this._ownFirst('.nds-dropmenu-scroll');
            if (scroll) scroll.style.maxHeight = '';
            NDS.aria.hidden(this.menu, true);
            NDS.topLayer(this.menu, false);
            // Restore the intrinsic [hidden] state so the menu can't
            // flash on the next paint if it re-enters the viewport.
            this.menu.setAttribute('hidden', '');
            this.emitEvent('nds:dropmenu:closed');
            this._cancelClose = null;
        }

        /** Is this dropmenu nested inside `el`? */
        _isNestedIn(el) {
            return el.contains(this.dropmenu);
        }

        // ==============================================
        // POSITION CALCULATION
        // ==============================================

        /**
         * Compute placement in viewport coords; NDS.place writes them for the
         * absolute menu in the top layer. Vertical flips up when space below is tight;
         * horizontal prefers trigger-edge alignment (RTL-aware) then clamps
         * to the viewport.
         */
        applyPosition() {
            const gap = 4, pad = 8;

            // Own scroll region only — a bare querySelector would grab a
            // NESTED dropmenu's scroll (the date-picker calendar contains
            // month/year sub-dropmenus) and clamp another instance's list.
            const scroll = this._ownFirst('.nds-dropmenu-scroll');
            if (scroll) scroll.style.maxHeight = '';

            // Lock width in px before measurement. fit-content/max-content
            // are unreliable for a positioned block when children use
            // flex/grid or width:100%.
            this.menu.style.width = '';
            // Same for a previous run's own-height clamp, or the menu measures
            // at the size the last placement squeezed it to.
            this.menu.style.maxHeight = '';
            this.menu.style.overflowY = '';
            const vw = document.documentElement.clientWidth;
            const w = Math.min(this.menu.offsetWidth, vw - pad * 2);
            this.menu.style.width = w + 'px';

            // NDS.flipPosition returns raw space values + topEdge using the
            // sticky mainnav as the top boundary. We clamp topEdge to `pad`
            // for pages without the nav and subtract our own gap/pad from
            // the raw space values.
            // The sticky nav is a ceiling only for a menu that paints BELOW it.
            // In a modal the menu is over the nav, so reserving nav height there
            // is phantom margin — and it lands on ONE side: the up side loses
            // ~nav height while the down side only gives up `pad`, so a tall menu
            // reads "less room above", stays down, and runs off the viewport with
            // real space going unused above it.
            const p = NDS.flipPosition(this.trigger, this.menu, {
                respectNav: this._respectNav
            });
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

            // Last resort, after the flip has already picked the roomier side:
            // the menu still doesn't fit, so give it a scrollbar rather than let
            // it run off the edge. An off-edge part is unreachable — page scroll carries the menu along
            // with its trigger and never reveals it.
            let clamped = false;
            if (p.menuRect.height > available) {
                if (scroll) {
                    // Preferred: shrink the inner list so the menu's own chrome
                    // (search box, footer actions) stays pinned and visible.
                    const chrome = p.menuRect.height - scroll.getBoundingClientRect().height;
                    scroll.style.maxHeight = Math.max(80, available - chrome) + 'px';
                } else {
                    // No inner scroll region to give back — the date-picker
                    // calendar is one rigid block. Scroll the whole menu.
                    this.menu.style.maxHeight = Math.max(80, available) + 'px';
                    this.menu.style.overflowY = 'auto';
                }
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

            // Glued to the trigger edge, no vertical viewport clamp on the
            // POSITION: everything was already shrunk to `available` above, so
            // the menu fits the side it was placed on and must never slide over
            // its own trigger — a covered input never recovers.
            // Matches trackPosition(), which never clamped.
            const top = flipUp ? p.triggerRect.top - mr2.height - gap : p.triggerRect.bottom + gap;

            // Pass the vw read at the top — re-reading it here, after the
            // data-position-vertical writes above, would force a second layout.
            const leftPx = this._leftFor(p.triggerRect, mr2.width, vw);

            // Cache flip direction so the scroll-tracker can reuse it without
            // re-running flip math (and without re-clamping the menu to the
            // viewport — clamping would desync the menu from a trigger that
            // scrolled off-screen).
            this._flipUp = flipUp;

            NDS.place(this.menu, top, leftPx);
        }

        /**
         * Horizontal placement in viewport coords, shared by applyPosition()
         * and trackPosition() so an open menu can't re-place itself by a
         * different rule on the first scroll frame than the one that opened
         * it (the cursor anchor and the edge-flip used to live only in
         * applyPosition, so a tracked menu jumped on first scroll).
         *
         * Default anchors the menu on click x (so wide triggers open near
         * where the user clicked), falling back to trigger center for
         * keyboard / programmatic opens. Opt-in `data-anchor="start|end"` on
         * the wrapper pins the menu's matching edge to the trigger's edge
         * instead — RTL-aware via the trigger's computed direction (useful
         * for multiselect, where the menu should line up with the field's
         * start edge, not float centered on a wide input); if that edge
         * would clip past the viewport it flips to the opposite edge, same
         * idea as the vertical flipUp. When the menu fits inside the trigger
         * (narrow menu, wide trigger), centered menus are additionally
         * clamped inside the trigger's horizontal bounds so they never
         * overshoot its edges. Then clamp to the viewport.
         *
         * `vw` is a parameter so a caller that already read it can avoid
         * forcing a second layout.
         */
        _leftFor(triggerRect, menuWidth, vw = document.documentElement.clientWidth) {
            const pad = 8;
            const anchor = this.dropmenu.getAttribute('data-anchor');
            let left;
            if (anchor === 'start' || anchor === 'end') {
                const startAtLeft = (getComputedStyle(this.trigger).direction !== 'rtl') === (anchor === 'start');
                const primary = startAtLeft ? triggerRect.left : triggerRect.right - menuWidth;
                const flipped = startAtLeft ? triggerRect.right - menuWidth : triggerRect.left;
                const primaryFits = primary >= pad && primary + menuWidth <= vw - pad;
                left = primaryFits ? primary : flipped;
            } else {
                const anchorX = (this._lastClickX != null)
                    ? this._lastClickX
                    : triggerRect.left + triggerRect.width / 2;
                left = anchorX - menuWidth / 2;
                if (menuWidth <= triggerRect.width) {
                    left = Math.max(triggerRect.left, Math.min(left, triggerRect.right - menuWidth));
                }
            }
            return Math.max(pad, Math.min(left, vw - menuWidth - pad));
        }

        // Placement while a scroll box around the trigger scrolls. Reuses the
        // flip direction cached by applyPosition() and only re-reads the
        // trigger rect + menu size, so each frame is a single read + write
        // pair. Critically: no vertical viewport clamp — letting the menu
        // follow the trigger off-screen is what "tracking" means; clamping
        // would freeze the menu against a viewport edge while the trigger
        // scrolled past.
        trackPosition() {
            const gap = 4;
            const tRect = this.trigger.getBoundingClientRect();
            const mRect = this.menu.getBoundingClientRect();
            const top = this._flipUp
                ? tRect.top - mRect.height - gap
                : tRect.bottom + gap;
            // Same horizontal rule as the opening placement, including its
            // viewport clamp — users can't scroll sideways to recover
            // off-screen content.
            NDS.place(this.menu, top, this._leftFor(tRect, mRect.width));
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
            // A constructor bail (missing menu, or a wrapper someone else already
            // initialized) never runs init(), so this instance owns nothing. Bail
            // before the deletes below — they'd strip the REAL instance's stamp and
            // expando while its listeners stayed live, and the next reinit() sweep
            // would then attach a second instance on top.
            if (!this.abortController) return;
            // Cancel a pending delayed-open timer so it can't fire after teardown.
            // Via the helper, not a bare clearTimeout: it also drops the `loading`
            // state open() stamped on the trigger, which would otherwise stay
            // stuck there after a destroy mid-delay.
            this._cancelDelayedOpen();
            // Drain the open-lifecycle subscriptions before releasing the rest.
            // close() releases this._offScroll, this._offView (NDS.onIntersect) and
            // this._unsubResize (NDS.onResize) synchronously at the top of its
            // body — without this guard, destroy-while-open strands both pooled
            // subscribers for the page lifetime.
            if (this.isOpen) this.close();
            // close() queues its cleanup on NDS.onTransitionEnd. Cancel that
            // and run it now: settling synchronously restores [hidden], the
            // inline styles and the top layer before teardown returns,
            // and a queued run would otherwise fire ~transitionSpeed later —
            // stripping the state of whatever instance owns the wrapper by
            // then. No-op when the menu was never opened.
            if (this._cancelClose) { this._cancelClose(); this._finishClose(); }
            // One abort releases every listener this instance attached — and only
            // those. The former cloneNode/replaceWith swap also destroyed listeners
            // consumers had attached to the wrapper, and its clone inherited
            // data-nds-dropmenu-initialized while losing the .ndsDropmenu expando,
            // which left the element permanently ineligible for re-init.
            this.abortController.abort();
            // Undo setupSearch's injection and its filtering. The clone used to
            // discard both for free; now that the wrapper survives, a destroy →
            // re-init would otherwise stack a second search box and leave items
            // hidden behind a search field that reads as empty.
            this._teardownSearch?.();
            // Only release the shared registration when THIS instance still owns it.
            // A stale instance destroyed after the wrapper was re-initialized would
            // otherwise strip the new instance's expando and stamp.
            if (this.dropmenu.ndsDropmenu !== this) return;
            this.menu.removeAttribute('popover');
            if (!this.menu.showPopover) this.menu.style.position = '';
            delete this.dropmenu.ndsDropmenu;
            this.dropmenu.removeAttribute('data-nds-dropmenu-initialized');
        }
    }

    // ==============================================
    // LAZY AUTHORED MENU (opt-in <template>)
    // ==============================================
    // A consumer may ship a big self-owned menu inert:
    //   <div class="nds-dropmenu">
    //     <button class="nds-dropmenu-trigger">…</button>
    //     <template><div class="nds-dropmenu-menu">…</div></template>
    //   </div>
    // The wrapper is skipped at scan; the first trigger click stamps the
    // template, runs the normal constructor on now-real DOM, and opens — so
    // init (aria, listeners, select mode, search) is never split, just late.
    // ONLY for menus dropmenu alone drives: a menu another component reads at
    // ITS init (filter, share) or builds into (multiselect) must stay live,
    // and menu content is invisible to search engines until stamped.

    // Module-level twin of _findOwnDescendant (needed before an instance exists).
    function _ownFirstIn(root, selector) {
        const candidates = root.querySelectorAll(selector);
        for (let i = 0; i < candidates.length; i++) {
            if (candidates[i].closest('.nds-dropmenu') === root) return candidates[i];
        }
        return null;
    }

    function _ownMenuTemplate(wrapper) {
        const tpls = wrapper.querySelectorAll('template');
        for (let i = 0; i < tpls.length; i++) {
            if (tpls[i].closest('.nds-dropmenu') === wrapper
                && tpls[i].content.querySelector('.nds-dropmenu-menu')) return tpls[i];
        }
        return null;
    }

    // Stamp the wrapper's menu template in place and wake what arrived.
    // NDS.Init.refresh may construct this wrapper too (a nested sub-dropmenu
    // re-enters the scan), so callers read wrapper.ndsDropmenu afterwards.
    function _stampMenuTemplate(wrapper) {
        const tpl = _ownMenuTemplate(wrapper);
        if (!tpl) return null;
        tpl.replaceWith(tpl.content);
        const menu = _ownFirstIn(wrapper, '.nds-dropmenu-menu');
        if (menu) NDS.Init.refresh(menu);
        return menu;
    }

    // One-shot arm on the trigger. Enter/Space on a button trigger synthesize a
    // click, so keyboard opens work; ArrowDown-to-open no-ops once and recovers
    // after construction (the established pre-wire-gap pattern).
    function _armTemplateDropmenu(wrapper) {
        if (wrapper._ndsDropmenuArmed) return;
        wrapper._ndsDropmenuArmed = true;
        const trigger = _ownFirstIn(wrapper, '.nds-dropmenu-trigger') || wrapper;
        trigger.addEventListener('click', (e) => {
            _stampMenuTemplate(wrapper);
            if (!wrapper.ndsDropmenu) new NDSDropmenu(wrapper);
            const instance = wrapper.ndsDropmenu;
            if (!instance) return;
            // Mirror the real trigger handler for this one click.
            e.preventDefault();
            e.stopPropagation();
            instance._lastClickX = (wrapper.hasAttribute('data-anchor-cursor')
                && typeof e.clientX === 'number' && e.clientX > 0) ? e.clientX : null;
            instance.toggle();
        }, { once: true });
    }

    // ==============================================
    // AUTO-INITIALIZATION
    // ==============================================

    function initializeDropmenus() {
        document.querySelectorAll('.nds-dropmenu').forEach(el => {
            if (el.closest('code')) return;
            if (el.hasAttribute('data-nds-dropmenu-initialized')) return;

            // Menu asleep in an own <template> → arm instead of constructing.
            // no-click wrappers are the consumer's to create() programmatically.
            if (!_ownFirstIn(el, '.nds-dropmenu-menu') && _ownMenuTemplate(el)) {
                if (!el.hasAttribute('data-dropmenu-no-click')) _armTemplateDropmenu(el);
                return;
            }

            // Expando is self-assigned post-guard in the ctor — never stamp a bailed construction.
            new NDSDropmenu(el);
        });
    }

    // Expose global API (called by nds-loader.js unified system)
    NDS.Dropmenu = {
        init: initializeDropmenus,
        reinit: initializeDropmenus,
        create: (element) => {
            // A templated menu stamps immediately on programmatic creation —
            // the consumer is instancing NOW, so there is nothing to defer.
            if (element && !_ownFirstIn(element, '.nds-dropmenu-menu')) _stampMenuTemplate(element);
            // Prefer the live instance: refresh inside the stamp (or an earlier
            // create) may already have constructed this wrapper.
            return element?.ndsDropmenu || new NDSDropmenu(element);
        },
        destroy: (element) => element?.ndsDropmenu?.destroy(),
        from: (el) => el?.closest('.nds-dropmenu') || null,
        // First match is the wrapper's own menu: a nested one sits inside it.
        menuOf: (dropmenu) => dropmenu?.querySelector('.nds-dropmenu-menu') || null,
    };
})();
