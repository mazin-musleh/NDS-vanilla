/* NDS.Dropmenu — public surface
 * Rides: (none — base component)
 * Requires:
 *   .nds-dropmenu-footer sits outside .nds-dropmenu-scroll — the footer scrolls away with the list, and search hides its buttons
 * Methods:
 *   NDS.Dropmenu.init() / .reinit()      scan + initialize dropmenu wrappers
 *   NDS.Dropmenu.create(el, opts?)       instance one .nds-dropmenu wrapper; null when it has no menu.
 *                                        opts adopt a field: {menu, menuClass, click, keys, anchor}
 *   NDS.Dropmenu.validate(el, opts)  a select-mode picker's check → {valid, message, value}; opts {showMessage}
 *   NDS.Dropmenu.destroy(el)             tear one down before you discard its wrapper; undoes what opts wrote
 *   NDS.Dropmenu.from(el)                the wrapper that owns any element inside it
 *   NDS.Dropmenu.getMenu(dropmenu)       the wrapper's menu
 *   instance.open() / .close() / .toggle(event?)   a click event anchors the menu under the
 *                                        pointer when the wrapper has data-anchor-cursor
 *   instance.syncPosition()             place the open menu again
 *   instance.setSelection(item)        pick an item in a select-mode picker
 *   instance.isOpen / .trigger / .dropmenu   read-only state; dropmenu is the wrapper
 * Events (bubble from the .nds-dropmenu wrapper):
 *   nds:dropmenu:prepare   detail {dropmenu, trigger, menu, isOpen, waitUntil(promise)} — before lazy content builds
 *   nds:dropmenu:opened    detail {dropmenu, trigger, menu, isOpen}
 *   nds:dropmenu:closed    detail {dropmenu, trigger, menu, isOpen}
 *   nds:dropmenu:select    detail {dropmenu, item, value}
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
 *     waitUntil(promise) keeps the spinner until it settles; call it in the listener, not
 *     after an await. Cancelled meanwhile (click away, Escape), the next open waits on it again.
 *   - Opt-in lazy menu: an own <template> child holding the menu is stamped +
 *     constructed on the first trigger click. Self-owned menus only — never one
 *     that filter/share read at init or multiselect builds into.
 *   - data-position-vertical is written by the component (a CSS hook), never set it yourself.
 *   - The open menu sits in the browser's top layer (popover="manual", stamped at init):
 *     nothing clips it and it stays in place in the DOM, so closest(), bubbling and the
 *     wrapper's knobs and theme reach it. Page scroll carries it. With CSS anchors (Chrome 125,
 *     Safari 26) it is anchored to its trigger, so the browser follows a scroll box too, and a
 *     trigger in a fixed or sticky box (a panel) gets a fixed menu; without them JS follows.
 *     It rides over the sticky nav and closes when its trigger leaves view. Without popover
 *     (Safari < 17, Firefox < 125) it is fixed and follows every scroll.
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
    const strings = NDS.i18n.getStrings('dropmenu', {
        search: 'Search items',
        search_placeholder: 'Search…',
        clear_search: 'Clear search',
        no_results: 'No results',
        select_option: 'Please select an option',
    });

    // State helpers — delegated to NDS.state (nds-core.js)
    const { add: addState, remove: removeState } = NDS.state;

    // Currently-open dropmenu wrappers, tracked module-locally so open() can
    // close peers without a DOM sweep by attribute selector. Maintained in
    // open()/close(); also cleared by destroy() via the close() it dispatches.
    const openDropmenus = new Set();


    // ==============================================
    // DROPMENU CLASS
    // ==============================================

    class NdsDropmenu {
        constructor(dropmenuElement) {
            this.dropmenu = dropmenuElement;
            // Find the trigger that belongs to THIS dropmenu — not one nested
            // inside a child `.nds-dropmenu` (e.g. the date-picker's calendar
            // contains month/year sub-dropmenus, and a naive querySelector
            // would grab the first sub-trigger instead of falling back to the
            // wrapper). Same nesting-aware pattern as the menu click handler.
            this.trigger = findOwnFirstIn(dropmenuElement, '.nds-dropmenu-trigger')
                || dropmenuElement;
            this._menu = findOwnFirstIn(dropmenuElement, '.nds-dropmenu-menu');
            this.isOpen = false;

            if (!this._menu) {
                console.warn('NDS Dropmenu: Missing menu element');
                return;
            }

            if (dropmenuElement.hasAttribute('data-nds-dropmenu-initialized')) return;

            // Expose the instance on the wrapper so the auto-close-others
            // loop in open() can find every NdsDropmenu, including those
            // built via `NDS.Dropmenu.create()` (autocomplete, date-picker
            // month/year, multiselect). Without this, manually-created
            // dropmenus stayed open when another one was opened.
            dropmenuElement.ndsDropmenu = this;

            this.init();
        }

        // ==============================================
        // UTILITY METHODS
        // ==============================================

        // ── Ownership ─────────────────────────────────────────────
        // A menu may host a nested `.nds-dropmenu` whose parts match every
        // selector this component owns (the date-picker's calendar contains
        // month/year sub-dropmenus). A bare `this._menu.querySelector(All)`
        // therefore claims the CHILD instance's items, scroll region and
        // focusables. Every post-init derivation of "elements this instance
        // owns" routes through these three, so a new call site can't
        // re-derive the set unguarded.

        /** True when `el`'s nearest `.nds-dropmenu-menu` is our own menu. */
        _isOwnItem(el) {
            return !!el && el.closest('.nds-dropmenu-menu') === this._menu;
        }

        /** Every own element matching `selector`, in DOM order. */
        _getOwnItems(selector = '.nds-dropmenu-item') {
            return NDS.findOwnParts(this._menu, selector, '.nds-dropmenu-menu');
        }

        /** First own element matching `selector`, or null. */
        _findOwnItem(selector) {
            return this._getOwnItems(selector)[0] || null;
        }

        /** Check if an element is a text-entry input that consumes arrow/Home/End keys.
         *  Checkbox/radio/button inputs don't use these for editing, so they should
         *  fall through to menu navigation. */
        _isInputElement(el) {
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
        _getFocusableElements() {
            return this._getOwnItems(
                'input:not([type="hidden"]):not(:disabled):not([hidden]), textarea:not(:disabled):not([hidden]), :is(a, button).nds-dropmenu-item:not(:disabled):not([hidden])'
            );
        }

        /**
         * Navigate through focusable elements with wrapping
         * @param {Element[]} elements - Focusable elements
         * @param {number} currentIndex - Current focused index
         * @param {number} direction - 1 for next, -1 for previous
         */
        _navigateToIndex(elements, currentIndex, direction) {
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
        _resolveCurrentIndex(elements) {
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
            this._menu.setAttribute('popover', 'manual');
            // No popover (Safari < 17, Firefox < 125): fixed, so a scroll box cannot cut it off.
            // Set here, not in CSS: Safari 16.4 parses :popover-open but has no popover.
            if (!this._menu.showPopover) this._menu.style.position = 'fixed';
            this._setupAria();
            this._addEventListeners();
            this._setupSelectMode();
            this._setupSearch();
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

        _setupSearch() {
            const attribute = this.dropmenu.getAttribute('data-search');
            if (attribute === null) return;

            const itemSelector = ':is(.nds-dropmenu-item, [data-search-item]):not([data-search-item="false"])';
            // Nesting-aware: a plain querySelector would grab the scroll of a
            // nested sub-dropmenu and inject this menu's search box into it.
            const scroll = this._findOwnItem('.nds-dropmenu-scroll');
            if (!scroll) return;
            const { signal } = this.abortController;

            // The scroll's items only: footer buttons (Apply, Reset) are .nds-dropmenu-item too.
            const getItems = () => this._getOwnItems(itemSelector).filter(el => scroll.contains(el));
            const threshold = parseInt(attribute, 10) || 0;
            if (threshold && getItems().length < threshold) return;

            // Search box — canonical `.nds-form-container > .nds-form-control` so
            // nds-form.js wires the .nds-clear button (auto show/hide + reset)
            // for free. The `nds-dropmenu-search` modifier is a menu-scoped
            // padding/border tweak, not a new component.
            const searchHtml = `<div class="nds-form-container nds-dropmenu-search">
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
            this._menu.insertAdjacentHTML('afterbegin', searchHtml);
            // Hold the node we just injected — destroy() removes exactly this one,
            // rather than re-querying (which can mis-hit a nested menu's box).
            const searchBox = this._menu.firstElementChild;
            const searchInput = searchBox.querySelector('.nds-search-input');
            strings.set(searchInput, 'aria-label', 'search');
            strings.set(searchInput, 'placeholder', 'search_placeholder');
            strings.set(searchBox.querySelector('.nds-clear'), 'aria-label', 'clear_search');
            // Wire the .nds-clear button — forms init ran before this injection,
            // so the injected .nds-form-control needs its own pass.
            NDS.Form.create(searchBox);

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
            const emptyHtml = `<div class="nds-empty-placeholder" data-nds-empty-placeholder hidden aria-live="polite">
                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                <span class="nds-empty-message"></span>
            </div>`;
            scroll.insertAdjacentHTML('afterbegin', emptyHtml);
            const emptyEl = scroll.firstElementChild;
            const emptyMessage = emptyEl.querySelector('.nds-empty-message');
            const customEmpty = this.dropmenu.getAttribute('data-search-empty');
            if (customEmpty) emptyMessage.textContent = customEmpty; else strings.set(emptyMessage, 'text', 'no_results');

            this._searchInput = searchInput;

            // Case-insensitive + diacritic-stripped so "مطار" matches "المَطار"
            // and "cafe" matches "café". Arabic harakat are in the Unicode
            // Diacritic category, so \p{Diacritic} covers both scripts in one pass.
            const normalizeText = (text) => (text || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

            const filter = () => {
                // The debounced input handler can still fire after destroy()
                // tore the search box down — abort() can't cancel its timer.
                if (!this._searchInput) return;
                const query = normalizeText(this._searchInput.value.trim());
                let visible = 0;
                const items = getItems();
                for (const item of items) {
                    const haystack = normalizeText(item.textContent + ' ' + (item.getAttribute('data-search-value') || ''));
                    const match = !query || haystack.includes(query);
                    item.hidden = !match;
                    if (match) visible++;
                }
                // A group with no match hides, and so does a divider left with nothing on one side.
                for (const group of this._getOwnItems('.nds-dropmenu-group')) {
                    // Own rows only: a menu nested in the group keeps its items unfiltered.
                    const rows = items.filter(el => el !== group && group.contains(el));
                    group.hidden = !!query && rows.length > 0 && rows.every(row => row.hidden);
                }
                let prev = null;
                for (const el of scroll.children) {
                    if (el === emptyEl || (el.hidden && el.tagName !== 'HR')) continue;
                    if (el.tagName === 'HR') el.hidden = !!query && (!prev || prev.tagName === 'HR');
                    if (!el.hidden) prev = el;
                }
                if (query && prev && prev.tagName === 'HR') prev.hidden = true;
                emptyEl.hidden = visible > 0 || !query;
            };

            // destroy() calls this: replay the filter with an empty query (its own
            // semantics, not a blanket [hidden] sweep) then drop both injected nodes.
            this._teardownSearch = () => {
                this._searchInput.value = '';
                filter();
                searchBox.remove();
                emptyEl.remove();
                this._searchInput = null;
                this._teardownSearch = null;
            };

            // nds-form.js's clear button dispatches an `input` event on the
            // field, so this same handler covers both typing AND clear-click.
            // Debounced: filter() re-walks every item and normalizes its text
            // (NFD + \p{Diacritic}), and the search box only appears once the
            // menu is large — running that per keystroke is the INP cost.
            // Escape / clear-on-close / teardown call filter() directly, so
            // only the typing path waits.
            this._searchInput.addEventListener('input', NDS.debounce(filter, 120), { signal });

            this._searchInput.addEventListener('keydown', (e) => {
                // Two-stage Escape: first press clears the query, second closes
                // the menu (falls through to the existing menu-scope handleEscape).
                if (e.key === 'Escape') {
                    if (this._searchInput.value) {
                        e.stopPropagation();
                        e.preventDefault();
                        this._searchInput.value = '';
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
                    getItems().find(el => !el.hidden)?.focus();
                    return;
                }
                if (e.key === 'Enter') {
                    e.preventDefault();
                    getItems().find(el => !el.hidden)?.click();
                }
            }, { signal });

            // Autofocus on open, reset on close — each open is a fresh state.
            this.dropmenu.addEventListener('nds:dropmenu:opened', () => this._searchInput.focus(), { signal });
            this.dropmenu.addEventListener('nds:dropmenu:closed', () => {
                if (!this._searchInput.value) return;
                this._searchInput.value = '';
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
        //     `nds:dropmenu:select` with { item, value } in detail.

        _setupSelectMode() {
            const name = this.dropmenu.getAttribute('data-select-name');
            if (!name) return;
            const { signal } = this.abortController;

            // Wrapper-boundary lookup: a nested select-mode dropmenu keeps its
            // own hidden input inside our menu, and a bare querySelector would
            // adopt it (renaming the child's field) on a destroy → re-init.
            let hidden = findOwnFirstIn(this.dropmenu, 'input[type="hidden"][data-nds-select-value]');
            const builtHidden = !hidden;
            if (!hidden) {
                hidden = document.createElement('input');
                hidden.type = 'hidden';
                hidden.setAttribute('data-nds-select-value', '');
                this.dropmenu.appendChild(hidden);
            }
            hidden.name = name;
            if (this.dropmenu.hasAttribute('data-required')) hidden.required = true;
            this._selectHidden = hidden;

            // Initial selection: data-select-value beats any pre-rendered
            // [data-state~="selected"] item, so consumers can drive it from
            // data without editing the item markup.
            const initialValue = this.dropmenu.getAttribute('data-select-value');
            let initialItem = null;
            if (initialValue != null) {
                initialItem = this._getOwnItems()
                    .find(el => el.getAttribute('data-value') === initialValue) || null;
            }
            if (!initialItem) {
                initialItem = this._getOwnItems()
                    .find(el => NDS.state.has(el, 'selected')) || null;
            }
            // The trigger's own text, before a pick replaces it: what a form reset with no first pick shows.
            const triggerLabel = this.trigger !== this.dropmenu && (this.trigger.querySelector('.nds-label') || this.trigger);
            const startLabel = triggerLabel ? triggerLabel.textContent : '';
            // destroy(): the field this built goes and the trigger reads as written. The pick stays
            // on its item (selected), so a re-create picks it again.
            this._undoSelect = () => {
                if (builtHidden) hidden.remove();
                if (triggerLabel) triggerLabel.textContent = startLabel;
            };
            if (initialItem) this.setSelection(initialItem, { silent: true });
            // A form reset never touches a hidden input or a label: go back to the first pick.
            NDS.field.onReset(hidden.form, () => {
                if (initialItem) { this.setSelection(initialItem, { silent: true }); return; }
                hidden.value = '';
                this._getOwnItems().forEach((entry) => NDS.state.clear(entry));
                if (triggerLabel) triggerLabel.textContent = startLabel;
            }, { signal });

            this._menu.addEventListener('click', (e) => {
                const item = e.target.closest('.nds-dropmenu-item');
                // Ownership guard, same as the auto-close handler below: a
                // nested sub-dropmenu's items match this selector and carry
                // data-value (date-picker's month/year), so without it the
                // CHILD's value lands in THIS picker's hidden input, trigger
                // label and nds:dropmenu:select payload.
                if (!this._isOwnItem(item)) return;
                if (item.hasAttribute('data-value')) this.setSelection(item);
            }, { signal });
        }

        setSelection(item, opts = {}) {
            const value = item.getAttribute('data-value') || '';
            if (this._selectHidden && opts.silent) this._selectHidden.value = value;

            // Trigger label: prefer per-item data-trigger-label for cases
            // where the dropdown row is descriptive ("Saudi Arabia (+966)")
            // but the trigger slot needs something compact ("+966").
            const triggerAttribute = item.getAttribute('data-trigger-label');
            const itemLabel = item.querySelector('.nds-label');
            const labelText = triggerAttribute != null
                ? triggerAttribute
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

            this._getOwnItems().forEach((other) => {
                if (other !== item) NDS.state.clear(other);
            });
            NDS.state.set(item, 'selected');

            if (!opts.silent) {
                if (this._selectHidden) NDS.setValue(this._selectHidden, value);
                this.dropmenu.dispatchEvent(new CustomEvent('nds:dropmenu:select', {
                    detail: { dropmenu: this.dropmenu, item, value },
                    bubbles: true
                }));
            }
        }

        // Only where the author wrote none; destroy() takes back what this wrote.
        _setDefault(el, attribute, value) {
            if (el.hasAttribute(attribute)) return;
            el.setAttribute(attribute, value);
            (this._ariaWritten ||= []).push([el, attribute]);
        }

        _setupAria() {
            this._setDefault(this.trigger, 'aria-expanded', 'false');
            this._setDefault(this.trigger, 'aria-haspopup', 'true');
            this._setDefault(this._menu, 'role', 'menu');
            this._setDefault(this._menu, 'aria-hidden', 'true');

            this._stampItemRoles();
        }

        // Also on open: rows built in nds:dropmenu:prepare came after init.
        _stampItemRoles() {
            // Skip form controls and groups
            this._getOwnItems().forEach(item => {
                if (!item.hasAttribute('role')
                    && !item.classList.contains('nds-form-control')
                    && !item.classList.contains('nds-dropmenu-group')) {
                    item.setAttribute('role', 'menuitem');
                    // A WeakSet: menus rebuilt on every open would grow a list.
                    (this._roleWritten ||= new WeakSet()).add(item);
                }
            });
        }

        // ==============================================
        // EVENT LISTENERS
        // ==============================================

        _addEventListeners() {
            const { signal } = this.abortController;
            // Trigger click (skip if programmatic-only mode)
            if (!this.dropmenu.hasAttribute('data-dropmenu-no-click')) {
                this.trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggle(e);
                }, { signal });
            }

            // Trigger + menu keyboard (skip if the consumer owns its own
            // keyboard navigation — date-picker uses 2D grid keys for the
            // day cells; autocomplete already stopPropagation's its own).
            // Escape stays bound below in either case so close-on-escape
            // remains uniform across dropmenus.
            if (!this.dropmenu.hasAttribute('data-dropmenu-no-keys')) {
                this.trigger.addEventListener('keydown', (e) => this._handleTriggerKeydown(e), { signal });

                this._menu.addEventListener('keydown', (e) => {
                    // A nested sub-menu's keys bubble here; that menu handles its own.
                    if (!this._isOwnItem(e.target)) return;
                    // A control in the menu already used the key (a rating's arrows).
                    if (e.defaultPrevented) return;
                    // For inputs: only handle Tab and Alt+Arrow
                    if (this._isInputElement(e.target)) {
                        const isNavKey = e.key === 'Tab'
                            || (e.altKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp'));
                        if (!isNavKey) return;
                    }
                    this._handleMenuKeydown(e);
                }, { signal });
            }

            // Escape — the menu is inside the wrapper, so one listener hears both.
            const handleEscape = (e) => {
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
            this.dropmenu.addEventListener('keydown', handleEscape, { signal });
            this._onEscape = handleEscape;
            // Something else hid the menu (a closing modal): close with it, so the state follows.
            this._menu.addEventListener('toggle', (e) => { if (e.newState === 'closed' && this.isOpen) this.close(); }, { signal });

            // Item click auto-close.
            this._menu.addEventListener('click', (e) => {
                const item = e.target.closest('.nds-dropmenu-item');
                // A nested sub-dropmenu's item (date-picker month/year) leaves its parent open.
                if (!item || !this._isOwnItem(item)) return;
                if (!item.hasAttribute('data-no-auto-close')) {
                    // destroy() inside the wait: a late close() would strip a re-inited wrapper's state.
                    setTimeout(() => { if (!signal.aborted) this.close(); }, 100);
                }
            }, { signal });
        }

        // On document only while open or opening: a closed menu has nothing to close, and a
        // page with a hundred menus ran a hundred listeners on every click and keypress.
        _listenDocument() {
            if (this.documentAbortController) return;
            this.documentAbortController = new AbortController();
            const { signal } = this.documentAbortController;
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
            // the newest open menu, or cancels a pending open, before a <dialog> around it reads the key as its own close.
            document.addEventListener('keydown', (e) => {
                if (e.key !== 'Escape' || (!this._delaying && [...openDropmenus].pop() !== this.dropmenu)
                    || this.dropmenu.contains(e.target) || !e.target.contains?.(this.dropmenu)) return;
                e.stopImmediatePropagation();
                this._onEscape(e);
            }, { capture: true, signal });
        }

        _unlistenDocument() {
            this.documentAbortController?.abort();
            this.documentAbortController = null;
        }

        // ==============================================
        // KEYBOARD HANDLERS
        // ==============================================

        // The item representing the menu's current value — a row a component
        // stamped data-state active (pagination's current page, sort's active
        // option) or selected (picker mode, custom select). Keyboard-open lands
        // focus there instead of the list edge.
        _getCurrentItem() {
            return this._findOwnItem('.nds-dropmenu-item:is([data-state~="active"], [data-state~="selected"]):not(:disabled):not([hidden])');
        }

        _handleTriggerKeydown(e) {
            // Focusables are enumerated AFTER toggle()/open() — lazily-populated
            // menus (pagination's ellipsis, data-delay consumers) have no items
            // until open() has run.
            // A button inside the trigger (Autocomplete's clear) keeps its own Enter and Space.
            const control = e.target.closest('button, a[href]');
            if (control && control !== this.trigger) return;
            switch (e.key) {
                case 'Enter':
                case ' ': {
                    e.preventDefault();
                    this.toggle();
                    const elements = this._getFocusableElements();
                    if (this.isOpen && elements.length) (this._getCurrentItem() || elements[0]).focus();
                    break;
                }
                case 'ArrowDown': {
                    e.preventDefault();
                    this.open();
                    const elements = this._getFocusableElements();
                    if (elements.length) (this._getCurrentItem() || elements[0]).focus();
                    break;
                }
                case 'ArrowUp': {
                    e.preventDefault();
                    this.open();
                    const elements = this._getFocusableElements();
                    if (elements.length) (this._getCurrentItem() || elements[elements.length - 1]).focus();
                    break;
                }
            }
        }

        _handleMenuKeydown(e) {
            const elements = this._getFocusableElements();
            const currentIndex = this._resolveCurrentIndex(elements);
            const isInput = this._isInputElement(document.activeElement);

            // Enter inside the menu triggers the primary action (if tagged).
            // Buttons/anchors keep native Enter-to-click, and text inputs
            // keep Enter for their own submit handlers.
            if (e.key === 'Enter') {
                const tag = e.target.tagName;
                const isActionable = tag === 'BUTTON' || tag === 'A';
                const isTextInput = isInput && !e.altKey;
                if (!isActionable && !isTextInput) {
                    const primary = this._findOwnItem('[data-dropmenu-primary]:not(:disabled)');
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
                    this._navigateToIndex(elements, currentIndex, dir);
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

        toggle(event) {
            // A second click during a delayed first-open aborts it rather than
            // being swallowed by open()'s _delaying guard.
            if (this._cancelDelayedOpen()) return;
            if (this.isOpen) return this.close();
            // data-anchor-cursor: a click opens the menu under the pointer (wide triggers);
            // keys and code open it at the trigger's centre. close() clears it.
            this._lastClickX = this.dropmenu.hasAttribute('data-anchor-cursor') && event?.clientX > 0 ? event.clientX : null;
            this.open();
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

        // The content is ready: open, unless the user cancelled meanwhile.
        _finishDelay() {
            if (!this._delaying) return;
            this._delaying = false;
            removeState(this.trigger, 'loading');
            this.open();
        }


        open() {
            // Already open: a second open() would overwrite _offView and
            // _unsubResize, stranding the pooled subscribers the first one
            // registered (close() only releases the last pair). Reachable via
            // _handleTriggerKeydown, which calls open() unconditionally on
            // Arrow keys. Reposition with syncPosition(), not a re-open.
            if (this.isOpen) return;
            // Delayed-first-open mode (opt-in via data-delay="<ms>"). The first
            // open shows a loading state on the trigger, waits <ms>, emits nds:dropmenu:prepare
            // so a consumer can populate the menu (waitUntil(promise) holds the open), then opens. One-shot:
            // data-delay is removed once it fires, so later opens are immediate.
            // Lets components build menu content lazily without the open animation
            // racing a fast re-click or briefly showing an empty/mis-sized menu.
            if (this._delaying) return;   // a delayed open is already in flight
            const delayed = this.dropmenu.hasAttribute('data-delay');
            if (delayed || this._preparing) {
                this._delaying = true;
                this._listenDocument();
                addState(this.trigger, 'loading');
                // A cancelled open whose waitUntil() is still running waits for it again.
                if (!delayed) return;
                const delay = parseInt(this.dropmenu.getAttribute('data-delay'), 10) || 0;
                this._delayTimer = setTimeout(() => {
                    this.dropmenu.removeAttribute('data-delay');
                    const waits = [];
                    this._dispatchEvent('nds:dropmenu:prepare', { waitUntil: (promise) => { waits.push(promise); } });
                    if (!waits.length) return this._finishDelay();
                    this._preparing = Promise.allSettled(waits).then(() => { this._preparing = null; this._finishDelay(); });
                }, delay);
                return;
            }

            // Abort any in-flight close so its cleanup doesn't tear down the
            // menu we're about to re-open. No-op when no close is pending.
            this._cancelClose?.();

            // Close other open dropmenus — but skip ancestors of this one.
            // Date-picker has month/year sub-dropmenus inside the calendar's
            // dropmenu; opening a sub-dropmenu must not close its parent.
            openDropmenus.forEach(el => {
                if (el === this.dropmenu) return;
                if (el.contains(this.dropmenu)) return; // ancestor — keep open
                if (el.ndsDropmenu) el.ndsDropmenu.close();
            });

            removeState(this.dropmenu, 'closing');
            removeState(this._menu,     'closing');
            this.isOpen = true;
            openDropmenus.add(this.dropmenu);
            this._listenDocument();

            // A % width (`--dropmenu-min-width: 100%` on custom-select, autocomplete,
            // filter, …) means the wrapper's width, but the top layer resolves it
            // against the viewport. Convert to px while the menu is still closed.
            // Read all three before writing any: a write between reads re-flushes style.
            const wrapperWidth = this.dropmenu.getBoundingClientRect().width;
            const menuComputedStyle = getComputedStyle(this._menu);
            const widthVars = ['--dropmenu-width', '--dropmenu-min-width', '--dropmenu-max-width'];
            const widthValues = widthVars.map(variable => menuComputedStyle.getPropertyValue(variable).trim());
            for (let i = 0; i < widthVars.length; i++) {
                if (widthValues[i].endsWith('%')) {
                    this._menu.style.setProperty(widthVars[i], (wrapperWidth * parseFloat(widthValues[i]) / 100) + 'px');
                }
            }

            // A modal covers the sticky nav; anywhere else placement keeps clear of it.
            // ponytail: a Panel raised over the nav with its own --panel-z is not
            // detected; read the trigger's layer if one ever needs it.
            this._respectNav = !this.trigger.closest('.nds-modal, dialog[data-nds-modal]');

            this._stampItemRoles();
            this._menu.removeAttribute('hidden');
            NDS.setTopLayer(this._menu, true);

            addState(this.dropmenu, 'open', 'opening');
            addState(this._menu,     'open', 'opening');
            addState(this.trigger,  'open');
            NDS.aria.expanded(this.trigger, true);
            NDS.aria.hidden(this._menu, false);

            this.syncPosition();
            const { signal } = this.documentAbortController;   // close() aborts it with the other document listeners

            // Anchored, the browser keeps the menu on its trigger through every scroll, with no script.
            // Otherwise it is absolute in the top layer: page scroll carries it, and JS follows a
            // scroll box around the trigger, rAF-throttled. Without popover it is fixed and follows every scroll.
            if (!this._anchored) {
                const reposition = NDS.throttleToFrame(() => this._trackPosition());
                const fixed = !this._menu.showPopover;
                // A trigger in a fixed or sticky box (a panel, a bar) stays put while the page scrolls under it.
                const pinned = NDS.isPinned(this.trigger);
                // The box may move a frame later (a panel tracks the sticky header): place once more when scroll settles.
                const settle = NDS.debounce(reposition, 100);
                const handleScroll = (e) => {
                    if (e.target === document ? fixed || pinned : e.target.contains?.(this.trigger)) { reposition(); if (pinned) settle(); }
                };
                document.addEventListener('scroll', handleScroll, { capture: true, passive: true, signal });
                signal.addEventListener('abort', settle.cancel);
            }
            // Close when the trigger leaves view (its scroll box hid it). A page scroll carries the
            // menu over the sticky nav, as the top layer paints it: closing there threw away a Filter's ticks.
            const leave = () => { if (this.isOpen) this.close(); };
            // Only a change counts: the first report is the state at open, and a script can
            // open a menu whose trigger is off screen (it never left view).
            let shown = false;
            this._offView = [NDS.onIntersect(this.trigger, (e) => {
                if (e.isIntersecting) shown = true; else if (shown) leave();
            })];
            // Resize-reposition (not close) — mobile browsers fire resize as
            // the address bar shows/hides during scroll, which would close
            // the menu mid-interaction otherwise. NDS.onResize is debounced
            // 150ms so the heavy syncPosition only runs once resize settles.
            // The visual viewport also resizes for the on-screen keyboard and a pinch zoom,
            // which fire no window resize; the page-wide bus stays off them.
            const viewport = window.visualViewport;
            if (viewport) {
                const handleViewportResize = NDS.debounce(() => this.syncPosition(), 150);
                viewport.addEventListener('resize', handleViewportResize, { signal });
                this._unsubResize = handleViewportResize.cancel;
            } else this._unsubResize = NDS.onResize(() => this.syncPosition());
            // Keep scroll momentum off the page (its scroll closes the menu), but only while
            // the list scrolls: on a list that fits, `contain` swallows the page's wheel.
            // Watched while open, since search, results and populate change its length.
            const list = this._findOwnItem('.nds-dropmenu-scroll');
            if (list) this._offListSize = NDS.onElementResize(list, () => {
                const value = list.scrollHeight > list.clientHeight ? 'contain' : '';
                return () => { list.style.overscrollBehavior = value; };
            });

            requestAnimationFrame(() => {
                removeState(this.dropmenu, 'opening');
                removeState(this._menu,     'opening');
            });
            this._dispatchEvent('nds:dropmenu:opened');
        }

        close() {
            this.isOpen = false;
            openDropmenus.delete(this.dropmenu);
            this._unlistenDocument();
            // A nested open menu (date-picker month/year) is its own popover: it
            // would stay in the top layer after this one leaves.
            openDropmenus.forEach(el => {
                if (this.dropmenu.contains(el)) el.ndsDropmenu?.close();
            });
            this._lastClickX = null;

            if (this._menu.contains(document.activeElement)) {
                this.trigger.focus();
                // A trigger that takes no focus (Date Picker's field box): its first own control,
                // else let go. Focus left in the menu would sit under its aria-hidden.
                if (this._menu.contains(document.activeElement)) {
                    const own = [...this.trigger.querySelectorAll(NDS.focusableSel)].find(el => !this._menu.contains(el));
                    if (own) own.focus(); else document.activeElement.blur();
                }
            }

            addState(this.dropmenu, 'closing');
            addState(this._menu,     'closing');
            NDS.aria.expanded(this.trigger, false);

            if (this._offView) { this._offView.forEach((off) => off()); this._offView = null; }
            if (this._unsubResize) { this._unsubResize(); this._unsubResize = null; }
            if (this._offListSize) { this._offListSize(); this._offListSize = null; }

            // Stored so open() can call this._cancelClose() to abort the
            // in-flight close if the user re-opens before the transition
            // finishes. Cleared at the end of the cleanup body.
            // Cancel first — close() has no re-entry guard, and re-arming over a
            // live handle strands it: both fire, so _finishClose() runs twice.
            this._cancelClose?.();
            this._cancelClose = NDS.onTransitionEnd(this._menu, () => this._finishClose());
        }

        /** Post-transition close cleanup. Split out of close() so destroy()
         *  can run it synchronously instead of leaving it queued: a queued
         *  run lands after teardown and would strip the state of whatever
         *  instance owns the wrapper by then (a reinit sweep in that window
         *  builds a new one). */
        _finishClose() {
            removeState(this.dropmenu, 'open', 'opening', 'closing');
            removeState(this._menu,     'open', 'opening', 'closing');
            removeState(this.trigger, 'open');
            this.dropmenu.removeAttribute('data-position-vertical');
            this._menu.removeAttribute('data-position-vertical');
            // Only what open() wrote: an authored style and the no-popover position stay.
            ['top', 'left', 'width', 'max-height', 'overflow-y', '--dropmenu-width', '--dropmenu-min-width', '--dropmenu-max-width']
                .forEach(property => this._menu.style.removeProperty(property));
            if (this._anchored) NDS.unplace(this._menu, this.trigger);
            this._anchored = undefined;
            const scroll = this._findOwnItem('.nds-dropmenu-scroll');
            if (scroll) scroll.style.maxHeight = '';
            NDS.aria.hidden(this._menu, true);
            NDS.setTopLayer(this._menu, false);
            // Restore the intrinsic [hidden] state so the menu can't
            // flash on the next paint if it re-enters the viewport.
            this._menu.setAttribute('hidden', '');
            this._dispatchEvent('nds:dropmenu:closed');
            this._cancelClose = null;
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
        syncPosition() {
            const gap = 4, pad = 8;
            // Kept for the scroll follower: a read there, after its own writes, would force a style pass.
            const edge = this._edge = NDS.getViewportPadding(this._menu);

            // Own scroll region only — a bare querySelector would grab a
            // NESTED dropmenu's scroll (the date-picker calendar contains
            // month/year sub-dropmenus) and clamp another instance's list.
            const scroll = this._findOwnItem('.nds-dropmenu-scroll');
            if (scroll) scroll.style.maxHeight = '';

            // Lock width in px before measurement. fit-content/max-content
            // are unreliable for a positioned block when children use
            // flex/grid or width:100%.
            this._menu.style.width = '';
            // Same for a previous run's own-height clamp, or the menu measures
            // at the size the last placement squeezed it to.
            this._menu.style.maxHeight = '';
            this._menu.style.overflowY = '';
            const vw = document.documentElement.clientWidth;
            const width = Math.min(this._menu.offsetWidth, vw - edge * 2);
            this._menu.style.width = width + 'px';

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
            const placement = NDS.flipPosition(this.trigger, this._menu, {
                respectNav: this._respectNav
            });
            // No popover (Safari 16): the part of a fixed menu outside the modal's scroll box takes
            // no clicks, so the menu flips and shrinks inside that box.
            const clip = this._menu.showPopover ? null : this._getModalClip();
            const topEdge = Math.max(placement.box.top + pad, placement.topEdge, clip ? clip.top + pad : -Infinity);
            const spaceBelow = (clip ? Math.min(placement.spaceBelow, clip.bottom - placement.triggerRect.bottom) : placement.spaceBelow) - gap - pad;
            // Recompute spaceAbove from triggerRect rather than reusing
            // p.spaceAbove because p.spaceAbove uses the unclamped p.topEdge
            // (which is 0 when no nav is present); we need the clamped value.
            const spaceAbove = placement.triggerRect.top - gap - topEdge;
            // Flip up when the menu doesn't fit below AND above has more room
            // (real measured height, not a fixed threshold — a fits-below menu
            // must never flip, a taller-than-threshold one must not stay down).
            const flipUp = spaceBelow < placement.menuRect.height && spaceAbove > spaceBelow;
            const available = flipUp ? spaceAbove : spaceBelow;

            // Last resort, after the flip has already picked the roomier side:
            // the menu still doesn't fit, so give it a scrollbar rather than let
            // it run off the edge. An off-edge part is unreachable — page scroll carries the menu along
            // with its trigger and never reveals it.
            let clamped = false;
            if (placement.menuRect.height > available) {
                if (scroll) {
                    // Preferred: shrink the inner list so the menu's own chrome
                    // (search box, footer actions) stays pinned and visible.
                    const chrome = placement.menuRect.height - scroll.getBoundingClientRect().height;
                    scroll.style.maxHeight = Math.max(80, available - chrome) + 'px';
                } else {
                    // No inner scroll region to give back — the date-picker
                    // calendar is one rigid block. Scroll the whole menu.
                    this._menu.style.maxHeight = Math.max(80, available) + 'px';
                    this._menu.style.overflowY = 'auto';
                }
                clamped = true;
            }

            // Re-measure only when the clamp changed the height; otherwise the
            // menu is unchanged since p.menuRect (no DOM write since), so reuse
            // it and skip a forced reflow.
            const currentMenuRect = clamped ? this._menu.getBoundingClientRect() : placement.menuRect;
            if (flipUp) {
                this.dropmenu.setAttribute('data-position-vertical', 'top');
                this._menu.setAttribute('data-position-vertical', 'top');
            } else {
                this.dropmenu.removeAttribute('data-position-vertical');
                this._menu.removeAttribute('data-position-vertical');
            }

            // Glued to the trigger edge, no vertical viewport clamp on the
            // POSITION: everything was already shrunk to `available` above, so
            // the menu fits the side it was placed on and must never slide over
            // its own trigger — a covered input never recovers.
            // Matches _trackPosition(), which never clamped.
            const top = flipUp ? placement.triggerRect.top - currentMenuRect.height - gap : placement.triggerRect.bottom + gap;

            // Pass the box read at the top — re-reading it here, after the
            // data-position-vertical writes above, would force a second layout.
            const leftPx = this._getLeft(placement.triggerRect, currentMenuRect.width, placement.box, edge);

            // Cache flip direction so the scroll-tracker can reuse it without
            // re-running flip math (and without re-clamping the menu to the
            // viewport — clamping would desync the menu from a trigger that
            // scrolled off-screen).
            this._flipUp = flipUp;

            this._place(top, leftPx);
        }

        // Anchored to the trigger where the browser can; after one miss, plain coords until close.
        _place(top, left) {
            this._anchored = NDS.place(this._menu, top, left, this._anchored === false ? null : this.trigger);
        }

        // The nearest scroll box around the menu inside an open <dialog>, or null.
        // ponytail: vertical only; a menu wider than a narrow modal can still overhang its sides.
        _getModalClip() {
            const dialog = this.dropmenu.closest('dialog[open]');
            if (!dialog) return null;
            for (let el = this.dropmenu.parentElement; el && el !== dialog.parentElement; el = el.parentElement) {
                if (/auto|scroll|hidden/.test(getComputedStyle(el).overflowY)) return el.getBoundingClientRect();
            }
            return null;
        }

        /**
         * Horizontal placement in viewport coords, shared by syncPosition()
         * and _trackPosition() so an open menu can't re-place itself by a
         * different rule on the first scroll frame than the one that opened
         * it (the cursor anchor and the edge-flip used to live only in
         * syncPosition, so a tracked menu jumped on first scroll).
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
         * `box` (NDS.getVisibleBox) is a parameter so a caller that already read
         * it can avoid forcing a second layout.
         */
        _getLeft(triggerRect, menuWidth, box = NDS.getVisibleBox(), pad) {
            const anchor = this.dropmenu.getAttribute('data-anchor');
            const min = box.left + pad, max = box.right - pad;
            let left;
            if (anchor === 'start' || anchor === 'end') {
                const startAtLeft = (getComputedStyle(this.trigger).direction !== 'rtl') === (anchor === 'start');
                const primary = startAtLeft ? triggerRect.left : triggerRect.right - menuWidth;
                const flipped = startAtLeft ? triggerRect.right - menuWidth : triggerRect.left;
                const primaryFits = primary >= min && primary + menuWidth <= max;
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
            return Math.max(min, Math.min(left, max - menuWidth));
        }

        // Placement while a scroll box around the trigger scrolls. Reuses the
        // flip direction cached by syncPosition() and only re-reads the
        // trigger rect + menu size, so each frame is a single read + write
        // pair. Critically: no vertical viewport clamp — letting the menu
        // follow the trigger off-screen is what "tracking" means; clamping
        // would freeze the menu against a viewport edge while the trigger
        // scrolled past.
        _trackPosition() {
            const gap = 4;
            const tRect = this.trigger.getBoundingClientRect();
            const mRect = this._menu.getBoundingClientRect();
            const top = this._flipUp
                ? tRect.top - mRect.height - gap
                : tRect.bottom + gap;
            // Same horizontal rule as the opening placement, including its
            // viewport clamp — users can't scroll sideways to recover
            // off-screen content.
            this._place(top, this._getLeft(tRect, mRect.width, undefined, this._edge));
        }

        // ==============================================
        // EVENTS & CLEANUP
        // ==============================================

        _dispatchEvent(name, extra) {
            this.dropmenu.dispatchEvent(new CustomEvent(name, {
                detail: {
                    dropmenu: this.dropmenu,
                    trigger: this.trigger,
                    menu: this._menu,
                    isOpen: this.isOpen,
                    ...extra
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
            // close() aborts the document listeners, releases this._offView (NDS.onIntersect) and
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
            // those: listeners consumers attached to the wrapper survive.
            this.abortController.abort();
            // Undo _setupSearch's injection and its filtering: the wrapper survives, so a
            // destroy → re-init would otherwise stack a second search box and leave items
            // hidden behind a search field that reads as empty.
            this._teardownSearch?.();
            // Only release the shared registration when THIS instance still owns it.
            // A stale instance destroyed after the wrapper was re-initialized would
            // otherwise strip the new instance's expando and stamp.
            if (this.dropmenu.ndsDropmenu !== this) return;
            this._menu.removeAttribute('popover');
            if (!this._menu.showPopover) this._menu.style.position = '';
            delete this.dropmenu.ndsDropmenu;
            this.dropmenu.removeAttribute('data-nds-dropmenu-initialized');
            this._ariaWritten?.forEach(([el, attribute]) => el.removeAttribute(attribute));
            this._undoSelect?.();
            this._getOwnItems().forEach(item => { if (this._roleWritten?.has(item)) item.removeAttribute('role'); });
            this._unstamp?.();
        }
    }

    // create(el, opts) adopts a field another component owns. What it writes, destroy()
    // takes back; a class or flag the author wrote stays.
    function stampField(el, { menu, menuClass, click = true, keys = true, anchor } = {}) {
        const undo = [];
        const addClass = (node, className) => {
            if (!node.classList.contains(className)) { node.classList.add(className); undo.push(() => node.classList.remove(className)); }
        };
        const setFlag = (name, value = '') => {
            if (!el.hasAttribute(name)) { el.setAttribute(name, value); undo.push(() => el.removeAttribute(name)); }
        };
        addClass(el, 'nds-dropmenu');
        if (menu) addClass(menu, 'nds-dropmenu-menu');
        if (menu && menuClass) addClass(menu, menuClass);
        if (!click) setFlag('data-dropmenu-no-click');
        if (!keys) setFlag('data-dropmenu-no-keys');
        if (anchor === 'cursor') setFlag('data-anchor-cursor');
        else if (anchor) setFlag('data-anchor', anchor);
        return () => undo.forEach(fn => fn());
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

    // The first part on the WRAPPER that is this dropmenu's, not a nested sub-dropmenu's:
    // trigger, menu, select mode's hidden input, and the scan before an instance exists.
    // Everything scoped to the MENU uses the menu-boundary readers (_getOwnItems / _findOwnItem).
    function findOwnFirstIn(root, selector) {
        return NDS.findOwnParts(root, selector, '.nds-dropmenu')[0] || null;
    }

    function findOwnMenuTemplate(wrapper) {
        return NDS.findOwnParts(wrapper, 'template', '.nds-dropmenu')
            .find(template => template.content.querySelector('.nds-dropmenu-menu')) || null;
    }

    // Stamp the wrapper's menu template in place and wake what arrived.
    // NDS.init.refresh may construct this wrapper too (a nested sub-dropmenu
    // re-enters the scan), so callers read wrapper.ndsDropmenu afterwards.
    function stampMenuTemplate(wrapper) {
        const template = findOwnMenuTemplate(wrapper);
        if (!template) return null;
        template.replaceWith(template.content);
        const menu = findOwnFirstIn(wrapper, '.nds-dropmenu-menu');
        if (menu) NDS.init.refresh(menu);
        return menu;
    }

    // One-shot arm on the trigger. Enter/Space on a button trigger synthesize a
    // click, so keyboard opens work; ArrowDown-to-open no-ops once and recovers
    // after construction (the established pre-wire-gap pattern).
    function armTemplateDropmenu(wrapper) {
        if (wrapper.ndsDropmenuArm) return;
        const trigger = findOwnFirstIn(wrapper, '.nds-dropmenu-trigger') || wrapper;
        const arm = new AbortController();
        // NDS.init.destroy(view) disarms a menu never opened through this backref.
        wrapper.ndsDropmenuArm = { destroy: () => { arm.abort(); delete wrapper.ndsDropmenuArm; } };
        trigger.addEventListener('click', (e) => {
            wrapper.ndsDropmenuArm.destroy();
            stampMenuTemplate(wrapper);
            if (!wrapper.ndsDropmenu) new NdsDropmenu(wrapper);
            const instance = wrapper.ndsDropmenu;
            if (!instance) return;
            // Mirror the real trigger handler for this one click.
            e.preventDefault();
            e.stopPropagation();
            instance.toggle(e);
        }, { signal: arm.signal });
    }

    // ==============================================
    // AUTO-INITIALIZATION
    // ==============================================

    function setupDropmenus() {
        document.querySelectorAll('.nds-dropmenu').forEach(el => {
            if (el.closest('code')) return;
            if (el.hasAttribute('data-nds-dropmenu-initialized')) return;

            // Menu asleep in an own <template> → arm instead of constructing.
            // no-click wrappers are the consumer's to create() programmatically.
            if (!findOwnFirstIn(el, '.nds-dropmenu-menu') && findOwnMenuTemplate(el)) {
                if (!el.hasAttribute('data-dropmenu-no-click')) armTemplateDropmenu(el);
                return;
            }

            // Expando is self-assigned post-guard in the ctor — never stamp a bailed construction.
            new NdsDropmenu(el);
        });
    }

    // A select-mode picker's check: NDS.validation runs it at submit, validate(el) is its public face.
    // The pick lives in a hidden carrier; its own only, a picker nested in its menu holds its own.
    const checkField = (dropmenu) => {
        const carrier = findOwnFirstIn(dropmenu, 'input[data-nds-select-value]');
        const valid = !NDS.validation.isRequired(dropmenu) || !!(carrier && carrier.value.trim());
        return { valid, message: valid ? '' : strings.text('select_option'), empty: true, value: carrier ? carrier.value : '' };
    };
    NDS.validation.addRule('.nds-dropmenu[data-select-name][data-required], .nds-dropmenu[data-select-name].nds-required',
        (dropmenu) => Object.assign(checkField(dropmenu), { focus: findOwnFirstIn(dropmenu, '.nds-dropmenu-trigger') || dropmenu }),
        { on: ['nds:dropmenu:select'] });

    // Expose global API (called by nds-loader.js unified system)
    NDS.Dropmenu = {
        init: setupDropmenus,
        reinit: setupDropmenus,
        validate: (el, opts) => NDS.Form.validateField(el.closest('.nds-dropmenu') || el, checkField, opts),
        create: (element, opts) => {
            if (!element) return null;
            if (element.ndsDropmenu) return element.ndsDropmenu;
            const unstamp = opts && stampField(element, opts);
            // A templated menu stamps immediately on programmatic creation —
            // the consumer is instancing NOW, so there is nothing to defer.
            if (!findOwnFirstIn(element, '.nds-dropmenu-menu')) stampMenuTemplate(element);
            // Prefer the live instance: refresh inside the stamp may already have
            // constructed this wrapper. The constructor publishes el.ndsDropmenu
            // only on success → null on a bail.
            if (!element.ndsDropmenu) new NdsDropmenu(element);
            const instance = element.ndsDropmenu || null;
            if (unstamp && instance) instance._unstamp = unstamp;
            else if (unstamp) unstamp();
            return instance;
        },
        destroy: (element) => element?.ndsDropmenu?.destroy(),
        from: (el) => el?.closest('.nds-dropmenu') || null,
        // First match is the wrapper's own menu: a nested one sits inside it.
        getMenu: (dropmenu) => dropmenu?.querySelector('.nds-dropmenu-menu') || null,
    };
})();
