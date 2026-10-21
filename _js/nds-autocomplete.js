/* NDS.Autocomplete — public surface
 * Rides: nds-dropmenu (menu shell, open/close, positioning, outside-click)
 *      · nds-forms (loading chrome via data-state="loading", the field's clear button)
 *      · nds-empty (the "no results" placeholder; soft — the menu just closes without it)
 * Methods:
 *   NDS.Autocomplete.init() / .reinit()      arm the delegated focusin builder
 *   NDS.Autocomplete.create(el, options)     build one field now; options {filter, renderItem}.
 *                                            Null when the markup is incomplete; the live one if started
 *   NDS.Autocomplete.validate(el, opts)  a data-strict field's check → {valid, message, picked}; opts {showMessage}
 *   NDS.Autocomplete.destroy(el)             undo create() before you discard the field
 * Events (bubble from the .nds-form-container):
 *   nds:autocomplete:fetch    detail {query, results} — after every result set is rendered
 *   nds:autocomplete:select   detail {item, text} — a suggestion was picked
 *   nds:autocomplete:clear    detail {} — the field's clear button was used
 * Hooks (all on the .nds-form-container):
 *   data-url · data-name (result field to display, default "Title") · data-min-chars (3)
 *   data-query-param (q) · data-results-path · data-fetch="each|once"
 *   data-empty-message · data-empty-icon · data-strict (typed text must match a pick)
 * Gotchas:
 *   - data-strict adds a hidden NAMELESS .nds-autocomplete-value carrier at build: a pick
 *     fills it, typing or clear empties it, and NDS.Form.validate() rejects text that
 *     doesn't match it ("Choose from the suggestions"). It never changes what submits.
 *     Text already in the field when it builds (server-prefilled) counts as picked.
 *   - Activates on an input[autocomplete="on"] inside .nds-form-container[data-url], built
 *     on the field's FIRST FOCUS.
 *   - renderItem() output is inserted as HTML — you own the escaping. The default renderer
 *     escapes and highlights the match.
 *   - Only the first 20 results render; data-fetch="once" caches the list and filters it
 *     in the browser.
 *   - Inside a .nds-search-box, picking a suggestion clicks the .nds-search-btn.
 *   - No results shows the empty state only under data-strict; otherwise the menu closes.
 */

(function () {
    'use strict';

    // State helpers — delegated to NDS.state (nds-core.js)
    const { add: addState, remove: removeState } = NDS.state;

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const ariaAttributes = ['role', 'aria-expanded', 'aria-autocomplete', 'aria-controls', 'aria-activedescendant'];

    const strings = NDS.i18n.getStrings('autocomplete', {
        no_results: 'No results',
        load_failed: 'Could not load suggestions',
        pick_suggestion: 'Choose from the suggestions',
    });

    // ==============================================
    // DEBOUNCE
    // ==============================================

    const DEBOUNCE_MS = 300;



    // ==============================================
    // AUTOCOMPLETE CLASS
    // ==============================================

    class NdsAutocomplete {
        constructor(containerElement, options) {
            if (!containerElement) return;
            if (containerElement.hasAttribute('data-nds-autocomplete-initialized')) return;
            // Programmatic hooks. Pass via NDS.Autocomplete.create(el, opts).
            //   filter(items, query)     → array  // overrides the default
            //                                       substring match. Used in
            //                                       both fetch="once" and
            //                                       fetch="each" (after fetch).
            //   renderItem(item, query)  → string // HTML for one dropdown row's
            //                                       label. Overrides the default
            //                                       displayFields.join(' · ').
            //                                       Developer owns escaping.
            options = options || {};
            this._customFilter = typeof options.filter === 'function' ? options.filter : null;
            this._customRender = typeof options.renderItem === 'function' ? options.renderItem : null;

            this._container = containerElement;
            this._formControl = containerElement.querySelector('.nds-form-control');
            this._input = containerElement.querySelector('input[autocomplete="on"]');

            if (!this._formControl || !this._input) return;

            this._clearButton = this._formControl.querySelector('.nds-form-action .nds-clear');
            // Loading UX is delegated to forms' form-scope state hook: we just
            // flip data-state="loading" on the container and forms handles the
            // spinner shell + sibling swap + restore. Zero consumer markup.

            // Config from container attributes
            this._url = containerElement.getAttribute('data-url');
            this._nameField = containerElement.getAttribute('data-name') || 'Title';
            this._minChars = parseInt(containerElement.getAttribute('data-min-chars'), 10) || 3;
            this._queryParam = containerElement.getAttribute('data-query-param') || 'q';
            this._resultsPath = containerElement.getAttribute('data-results-path') || '';
            // Fetch mode:
            //   "each" (default) — fetch URL?q=value on every keystroke,
            //                      trust the server to filter
            //   "once"           — fetch URL once on first input, cache the
            //                      full list, then filter the cache client-side
            //                      per keystroke. Use for small static datasets
            //                      (countries, currencies, departments, etc.)
            this._fetchMode = containerElement.getAttribute('data-fetch') || 'each';

            // State
            this._cache = null;
            this._results = [];
            this._activeIndex = -1;
            // Rendered items — keyboard nav reads this on every arrow keypress,
            // so re-querying per keydown is waste. Reset at the start of _renderResults.
            this._items = [];
            // Two lifetimes: abortController spans the instance and releases every
            // listener; fetchAbortController is re-armed per request to cancel the
            // in-flight suggestion fetch when a newer keystroke supersedes it.
            this.abortController = new AbortController();
            this.fetchAbortController = null;
            this._selectedItem = null;
            this._dropmenu = null;

            // data-strict: typed text must match a picked suggestion. The pick
            // is runtime state (_selectedItem), invisible to forms' submit
            // validation — mirror it into a hidden NAMELESS carrier the strict
            // check reads. Nameless on purpose: it must never change what the
            // form submits.
            this._strict = containerElement.hasAttribute('data-strict');
            this._carrier = null;
            if (this._strict) {
                this._carrier = document.createElement('input');
                this._carrier.type = 'hidden';
                this._carrier.className = 'nds-autocomplete-value';
                // Text already in the field (server-written, or a host's restored pick) counts as picked,
                // so focusing it without a change doesn't turn it invalid.
                this._carrier.value = this._input.value.trim();
                this._formControl.appendChild(this._carrier);
            }

            this.init();
            containerElement.setAttribute('data-nds-autocomplete-initialized', 'true');
            // NDS.init.destroy(view) reaches an instance only through its nds* backref.
            containerElement.ndsAutocomplete = this;
        }

        // ==============================================
        // INITIALIZATION
        // ==============================================

        init() {
            this._setupDropmenu();
            this._setupAria();
            this._addEventListeners();

            // Disable browser native autocomplete
            this._input.setAttribute('autocomplete', 'off');
        }

        _setupDropmenu() {
            // Create and append the menu
            var menu = document.createElement('div');
            menu.className = 'nds-dropmenu-menu nds-autocomplete-menu';
            menu.setAttribute('role', 'listbox');
            menu.setAttribute('hidden', '');

            var menuId = 'nds-ac-' + (this._input.id || NDS.getUniqueId());
            menu.id = menuId;

            // Scrollable container for items — an .nds-empty container so a
            // strict query matching nothing shows a "no results" placeholder
            // instead of silently closing (a dead-field read in strict mode).
            // data-empty-message / data-empty-icon on the [data-url] container
            // forward through, so consumers customize per field.
            var scroll = document.createElement('div');
            scroll.className = 'nds-dropmenu-scroll nds-empty';
            const emptyMessage = this._container.getAttribute('data-empty-message');
            if (emptyMessage) scroll.setAttribute('data-empty-message', emptyMessage);
            else strings.set(scroll, 'data-empty-message', 'no_results');
            scroll.setAttribute('data-empty-icon',
                this._container.getAttribute('data-empty-icon') || 'nds-icon nds-hgi-search-01');
            menu.appendChild(scroll);

            this._formControl.appendChild(menu);
            this._menu = menu;
            this._scroll = scroll;
            this._menuId = menuId;

            // The form-control is the wrapper; open/close is programmatic, so no click-to-toggle.
            this._dropmenu = NDS.Dropmenu.create(this._formControl, { click: false });
        }

        _setupAria() {
            // destroy() removes only what the author did not write.
            this._authoredAria = ariaAttributes.filter((attribute) => this._input.hasAttribute(attribute));
            this._input.setAttribute('role', 'combobox');
            NDS.aria.expanded(this._input, false);
            this._input.setAttribute('aria-autocomplete', 'list');
            this._input.setAttribute('aria-controls', this._menuId);
            this._input.removeAttribute('aria-activedescendant');
        }

        // ==============================================
        // EVENT LISTENERS
        // ==============================================

        _addEventListeners() {
            // Debounced input handler
            this._debouncedFetch = NDS.debounce((value) => {
                this._fetchResults(value);
            }, DEBOUNCE_MS);

            // Track held keys to prevent fetch spam (e.g. holding backspace)
            this._keyHeld = false;
            // Set only while _selectItem dispatches its own input event (below)
            this._suppressFetch = false;

            const { signal } = this.abortController;

            // Input handler. The only input event that must NOT fetch is the one
            // _selectItem dispatches to sync forms after writing the picked value,
            // and it flags that itself — every other input event fetches, whether
            // the user typed it or the consumer dispatched it.
            this._onInput = () => {
                if (this._suppressFetch) return;
                if (this._keyHeld) return;

                var value = this._input.value.trim();
                this._selectedItem = null;
                if (this._carrier) this._carrier.value = '';

                if (value.length >= this._minChars) {
                    this._debouncedFetch(value);
                } else {
                    this._close();
                    this._results = [];
                }
            };
            // Kept as a field, not inlined — the keyup handler below re-runs it directly.
            this._input.addEventListener('input', this._onInput, { signal });

            // Prevent dropmenu's trigger click-to-toggle on the input
            // (we control open/close via typing, not clicking)
            this._input.addEventListener('click', (e) => e.stopPropagation(), { signal });

            // Keyboard navigation — stopPropagation prevents dropmenu's trigger keydown
            this._input.addEventListener('keydown', (e) => {
                // An IME's Enter or arrows pick its own candidate, not a suggestion.
                if (e.isComposing || e.keyCode === 229) return;
                this._keyHeld = e.repeat;
                this._handleKeyDown(e);
            }, { signal });

            // Fetch after held key is released
            this._input.addEventListener('keyup', () => {
                if (!this._keyHeld) return;
                this._keyHeld = false;
                this._onInput();
            }, { signal });

            // Delegated click for dropdown items — one listener for the instance
            // lifetime instead of 20 fresh listeners per render (torn down by
            // the next innerHTML='').
            this._scroll.addEventListener('click', (e) => {
                var btn = e.target.closest('.nds-dropmenu-item');
                if (!btn || !this._scroll.contains(btn)) return;
                e.preventDefault();
                e.stopPropagation();
                var index = parseInt(btn.getAttribute('data-index'), 10);
                if (this._results[index]) this._selectItem(this._results[index]);
            }, { signal });

            // Clear button — extends existing forms clear behavior
            if (this._clearButton) {
                this._clearButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this._handleClear();
                }, { signal });
            }

            // A form reset: the restored text counts as picked, as at build, and old results go.
            NDS.field.onReset(this._input.form, () => {
                this._selectedItem = null;
                this._results = [];
                if (this._carrier) this._carrier.value = this._input.value.trim();
                this._close();
            }, { signal });

            // Open on focus if results exist; a request that failed tries again.
            this._input.addEventListener('focus', () => {
                if (this._fetchFailed) this._onInput();
                else if (this._results.length > 0 && !this._dropmenu.isOpen && !this._selectedItem) {
                    this._renderResults(this._results, this._input.value.trim());
                }
            }, { signal });

            // Sync aria-expanded when dropmenu opens/closes
            this._container.addEventListener('nds:dropmenu:opened', () => {
                NDS.aria.expanded(this._input, true);
            }, { signal });
            this._container.addEventListener('nds:dropmenu:closed', () => {
                NDS.aria.expanded(this._input, false);
                this._input.removeAttribute('aria-activedescendant');
                this._activeIndex = -1;
            }, { signal });
        }

        // ==============================================
        // FETCH
        // ==============================================

        async _fetchResults(query) {
            // Skip if input value has changed since this fetch was queued (stale debounce)
            if (this._input.value.trim() !== query) return;

            if (this._fetchMode === 'once') {
                await this._fetchOnceAndFilter(query);
            } else {
                await this._fetchEach(query);
            }
        }

        // Fetch URL?q=value on every call — server is expected to filter.
        async _fetchEach(query) {
            if (this.fetchAbortController) this.fetchAbortController.abort();
            this.fetchAbortController = new AbortController();
            var { signal } = this.fetchAbortController;

            this._setLoading(true);

            try {
                var separator = this._url.includes('?') ? '&' : '?';
                var fetchUrl = this._url + separator + this._queryParam + '=' + encodeURIComponent(query);
                var data = (await NDS.request(fetchUrl, { signal, json: true })).data;
                this._results = this._extractResults(data);
                this._fetchFailed = false;
                if (this._customFilter) this._results = this._customFilter(this._results, query) || [];
                this._renderResults(this._results, query);
                this._dispatchEvent('nds:autocomplete:fetch', { query: query, results: this._results });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.warn('NDS Autocomplete: Fetch failed', error);
                    this._results = [];
                    this._loadFailed();
                }
            } finally {
                // Only the current request clears loading. A superseding keystroke
                // aborts this one, and its rejection settles AFTER the new request
                // has already set loading — clearing here would kill a live spinner.
                if (this.fetchAbortController?.signal === signal) this._setLoading(false);
            }
        }

        // Fetch the full list once, cache it, filter the cache client-side
        // on every subsequent call.
        async _fetchOnceAndFilter(query) {
            if (!this._cache) {
                if (this.fetchAbortController) this.fetchAbortController.abort();
                this.fetchAbortController = new AbortController();
                var { signal } = this.fetchAbortController;
                this._setLoading(true);
                try {
                    var data = (await NDS.request(this._url, { signal, json: true })).data;
                    this._cache = this._extractResults(data);
                    this._fetchFailed = false;
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        // No cache: the next input retries.
                        console.warn('NDS Autocomplete: Fetch failed', error);
                        this._loadFailed();
                    }
                    return;
                } finally {
                    // See _fetchEach — only the current request clears loading.
                    if (this.fetchAbortController?.signal === signal) this._setLoading(false);
                }
            }

            if (this._customFilter) {
                this._results = this._customFilter(this._cache, query) || [];
            } else {
                var lowerQuery = query.toLowerCase();
                var field = this._nameField;
                this._results = this._cache.filter(function (item) {
                    var value = item && item[field];
                    return value != null && String(value).toLowerCase().indexOf(lowerQuery) !== -1;
                });
            }
            this._renderResults(this._results, query);
            this._dispatchEvent('nds:autocomplete:fetch', { query: query, results: this._results });
        }

        // Extract the array of results from a parsed JSON response, honoring
        // data-results-path if set.
        _extractResults(data) {
            var list = this._resultsPath
                ? this._resultsPath.split('.').reduce(function (current, key) { return current && current[key]; }, data)
                : Array.isArray(data) ? data : (data && (data.results || data.data));
            // One null row would throw in the renderer and drop the whole set.
            return Array.isArray(list) ? list.filter(Boolean) : [];
        }

        // Silent failure looked like "no suggestions": say so, and try again on the next focus.
        _loadFailed() {
            this._fetchFailed = true;
            this._close();
            NDS.announce(strings.text('load_failed'));
        }

        // ==============================================
        // LOADING STATE
        // ==============================================

        _setLoading(isLoading) {
            // Delegated to forms' state hook — see nds-form.js loading branch.
            if (isLoading) addState(this._container, 'loading');
            else removeState(this._container, 'loading');
        }

        // ==============================================
        // RENDERING
        // ==============================================

        _renderResults(data, query) {
            this._scroll.innerHTML = '';
            this._activeIndex = -1;
            this._items = [];

            if (!data || data.length === 0) {
                // Only strict needs "no results": elsewhere any typed text is valid.
                if (!this._strict) { this._close(); return; }
                NDS.Empty.refresh(this._scroll);
                NDS.announce(strings.text('no_results'));
                this._open();
                return;
            }

            // Limit displayed results to 20
            var limited = data.slice(0, 20);
            // Compile the highlight regex once per render, not once per item.
            var highlightRegex = query
                ? new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi')
                : null;
            var fragment = document.createDocumentFragment();

            limited.forEach((item, index) => {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'nds-btn nds-subtle nds-dropmenu-item';
                btn.setAttribute('role', 'option');
                btn.setAttribute('data-index', index);
                NDS.aria.selected(btn, false);
                btn.id = this._menuId + '-item-' + index;

                var labelSpan = document.createElement('span');
                labelSpan.className = 'nds-label';
                if (this._customRender) {
                    // Developer owns escaping in the custom render path.
                    labelSpan.innerHTML = this._customRender(item, query);
                } else {
                    var text = String(item[this._nameField] || '');
                    labelSpan.innerHTML = this._highlightMatch(text, highlightRegex);
                }
                btn.appendChild(labelSpan);

                fragment.appendChild(btn);
            });

            this._scroll.appendChild(fragment);
            this._items = this._scroll.querySelectorAll('.nds-dropmenu-item');

            this._open();
        }

        // Regex is precompiled per render in _renderResults — passing it in
        // (instead of the raw query) means the hot path skips 20 regex compiles.
        // Match the raw text, escape each piece: matching escaped text splits entities ("o" in &quot;).
        _highlightMatch(text, regex) {
            if (!regex) return NDS.escapeHtml(text);
            return text.split(regex).map((part, i) =>
                i % 2 ? '<mark>' + NDS.escapeHtml(part) + '</mark>' : NDS.escapeHtml(part)).join('');
        }

        // ==============================================
        // OPEN / CLOSE (delegates to NDS.Dropmenu)
        // ==============================================

        _open() {
            if (!this._dropmenu || this._dropmenu.isOpen) return;
            // Results that land after focus left stay closed.
            if (document.activeElement !== this._input) return;
            // Width tracks the form-control via the dropmenu's --dropmenu-min-width
            // hook (_autocomplete.scss), same as custom-select — no inline
            // width-fighting here (the dropmenu wipes inline styles on close).
            this._dropmenu.open();
        }

        _close() {
            if (!this._dropmenu || !this._dropmenu.isOpen) return;
            this._dropmenu.close();
        }

        // ==============================================
        // SELECTION
        // ==============================================

        _selectItem(itemData) {
            var text = String(itemData[this._nameField] || '');

            this._selectedItem = itemData;
            if (this._carrier) this._carrier.value = text;

            // Trigger input/change events so forms JS updates state. Fetching on
            // the value we just picked would reopen the menu — suppress just this
            // one dispatch (setValue is synchronous, so the flag can't leak).
            this._suppressFetch = true;
            NDS.setValue(this._input, text);
            this._suppressFetch = false;

            this._close();
            this._input.focus();

            this._dispatchEvent('nds:autocomplete:select', {
                item: itemData,
                text: text
            });

            // Auto-submit in search box context only
            if (this._container.classList.contains('nds-search-box')) {
                const searchBtn = this._container.querySelector('.nds-search-btn') ||
                                  this._container.closest('.nds-search-content')?.querySelector('.nds-search-btn');
                if (searchBtn) {
                    searchBtn.click();
                }
            }
        }

        _handleClear() {
            this._selectedItem = null;
            if (this._carrier) this._carrier.value = '';
            this._results = [];
            this._activeIndex = -1;

            this._close();
            this._dispatchEvent('nds:autocomplete:clear', {});
        }

        // ==============================================
        // KEYBOARD NAVIGATION
        // ==============================================

        _handleKeyDown(e) {
            var isOpen = this._dropmenu && this._dropmenu.isOpen;
            var items = this._items;
            var itemCount = items.length;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    e.stopPropagation();
                    if (!isOpen && this._results.length > 0) {
                        this._renderResults(this._results, this._input.value.trim());
                        return;
                    }
                    if (isOpen && itemCount > 0) {
                        this._navigateItems(1, items);
                    }
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    e.stopPropagation();
                    if (isOpen && itemCount > 0) {
                        this._navigateItems(-1, items);
                    }
                    break;

                case 'Enter':
                    e.stopPropagation();
                    if (isOpen && this._activeIndex >= 0 && this._activeIndex < this._results.length) {
                        e.preventDefault();
                        this._selectItem(this._results[this._activeIndex]);
                    } else if (isOpen) {
                        this._close();
                    }
                    break;

                case ' ':
                    e.stopPropagation();
                    break;

                case 'Escape':
                    if (isOpen) {
                        e.preventDefault();
                        e.stopPropagation();
                        this._close();
                    }
                    break;

                case 'Tab':
                    if (isOpen) {
                        this._close();
                    }
                    break;

                case 'Home':
                    if (isOpen && itemCount > 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        this._setActiveItem(0, items);
                    }
                    break;

                case 'End':
                    if (isOpen && itemCount > 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        this._setActiveItem(itemCount - 1, items);
                    }
                    break;

            }
        }

        _navigateItems(direction, items) {
            var count = items.length;
            var newIndex = this._activeIndex + direction;
            if (newIndex < 0) newIndex = count - 1;
            if (newIndex >= count) newIndex = 0;

            this._setActiveItem(newIndex, items);
        }

        _setActiveItem(index, items) {
            // Clear previous
            if (this._activeIndex >= 0 && items[this._activeIndex]) {
                NDS.aria.selected(items[this._activeIndex], false);
                removeState(items[this._activeIndex], 'active');
            }

            this._activeIndex = index;

            NDS.aria.selected(items[index], true);
            addState(items[index], 'active');
            items[index].scrollIntoView({ block: 'nearest' });
            this._input.setAttribute('aria-activedescendant', items[index].id);
        }

        // ==============================================
        // EVENTS & CLEANUP
        // ==============================================

        _dispatchEvent(name, detail) {
            this._container.dispatchEvent(new CustomEvent(name, {
                detail: detail,
                bubbles: true
            }));
        }

        destroy() {
            // An incomplete field's constructor bails before it wires anything.
            if (!this.abortController) return;
            this.abortController.abort();
            this.fetchAbortController?.abort();
            this._debouncedFetch?.cancel(); // a keystroke inside the 300ms window would still fetch

            if (this._dropmenu) {
                this._dropmenu.destroy();
            }

            if (this._menu && this._menu.parentNode) {
                this._menu.parentNode.removeChild(this._menu);
            }

            if (this._carrier && this._carrier.parentNode) {
                this._carrier.parentNode.removeChild(this._carrier);
            }

            // Restore the markup the focusin builder matches, so the field can build again.
            this._input.setAttribute('autocomplete', 'on');
            ariaAttributes.filter((attribute) => !this._authoredAria?.includes(attribute))
                .forEach((attribute) => this._input.removeAttribute(attribute));
            this._container.removeAttribute('data-nds-autocomplete-initialized');
            if (this._container.ndsAutocomplete === this) delete this._container.ndsAutocomplete;
        }
    }

    // ==============================================
    // AUTO-INITIALIZATION
    // ==============================================

    var delegationWired = false;

    // Delegated + lazy (custom-select / voice-input pattern): instead of sweeping
    // and constructing every [data-url] container up front, build a container's
    // instance on its FIRST focusin. focusin fires before the first keystroke, so
    // the input/keydown listeners are wired before the user types, and
    // dynamically-added containers are covered for free. The instance itself
    // stays per-element — it holds results / _activeIndex / in-flight abort,
    // runtime state that (unlike the custom-select's value) isn't in the DOM.
    function setupAutocompletes() {
        if (delegationWired) return;
        delegationWired = true;
        document.addEventListener('focusin', function (e) {
            var target = e.target;
            if (!target || !target.closest) return;
            // The constructor skips an incomplete field itself.
            var container = target.closest('.nds-form-container[data-url]');
            if (container && !container.ndsAutocomplete && !container.closest('code')) new NdsAutocomplete(container);
        });
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    // The field's check: NDS.validation runs it at submit, validate(el) is its public face.
    // data-strict: typed text must match a picked suggestion. The carrier holds the last pick and exists
    // only on a built field; no carrier, so its text is the prefilled pick. Empty text is required's business.
    const checkField = (container) => {
        const carrier = container.querySelector('.nds-autocomplete-value');
        const input = container.ndsAutocomplete?._input;
        const text = input ? input.value.trim() : '';
        const valid = !carrier || text === '' || carrier.value === text;
        return { valid, message: valid ? '' : strings.text('pick_suggestion'), picked: !!(carrier && carrier.value) };
    };
    // Taginput in assist mode shares the container and owns its own rejection at add time.
    NDS.validation.addRule('.nds-form-container[data-strict]',
        (container) => (container.classList.contains('nds-taginput') ? null : Object.assign(checkField(container), { focus: container.ndsAutocomplete?._input || null })),
        { on: ['input'] });

    NDS.Autocomplete = {
        init: setupAutocompletes,
        reinit: setupAutocompletes,
        validate: (el, opts) => NDS.Form.validateField(el.closest('.nds-form-container') || el, checkField, opts),
        destroy: (element) => element?.ndsAutocomplete?.destroy(),
        // Programmatic construction. Pass { filter, renderItem } to override
        // the default substring match and dropdown-row renderer.
        create: function (element, options) {
            if (!element) return null;
            if (element.ndsAutocomplete) return element.ndsAutocomplete;
            // The constructor sets the backref only once the field is complete.
            var instance = new NdsAutocomplete(element, options);
            return element.ndsAutocomplete === instance ? instance : null;
        }
    };

})();
