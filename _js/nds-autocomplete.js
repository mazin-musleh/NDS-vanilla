/**
 * NDS Autocomplete Component
 * Enhances form inputs with remote typeahead/autocomplete functionality
 * Uses NDSDropmenu component for dropdown behavior (open/close, positioning, animation, outside-click)
 * Activated on inputs with autocomplete="on" inside .nds-form-container[data-url]
 */

(function () {
    'use strict';

    // State helpers — delegated to NDS.State (nds-core.js)
    const { add: addState, remove: removeState } = NDS.State;

    const STRINGS = {
        en: { noResults: 'No results' },
        ar: { noResults: 'لا توجد نتائج' }
    };

    // ==============================================
    // DEBOUNCE
    // ==============================================

    const DEBOUNCE_MS = 300;



    // ==============================================
    // AUTOCOMPLETE CLASS
    // ==============================================

    class NDSAutocomplete {
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
            this.customFilter = typeof options.filter === 'function' ? options.filter : null;
            this.customRender = typeof options.renderItem === 'function' ? options.renderItem : null;

            this.container = containerElement;
            this.formControl = containerElement.querySelector('.nds-form-control');
            this.input = containerElement.querySelector('input[autocomplete="on"]');

            if (!this.formControl || !this.input) return;

            this.clearBtn = this.formControl.querySelector('.nds-form-action .nds-clear');
            // Loading UX is delegated to forms' form-scope state hook: we just
            // flip data-state="loading" on the container and forms handles the
            // spinner shell + sibling swap + restore. Zero consumer markup.

            // Config from container attributes
            this.url = containerElement.getAttribute('data-url');
            this.nameField = containerElement.getAttribute('data-name') || 'Title';
            this.minChars = parseInt(containerElement.getAttribute('data-min-chars'), 10) || 3;
            this.queryParam = containerElement.getAttribute('data-query-param') || 'q';
            this.resultsPath = containerElement.getAttribute('data-results-path') || '';
            // Fetch mode:
            //   "each" (default) — fetch URL?q=value on every keystroke,
            //                      trust the server to filter
            //   "once"           — fetch URL once on first input, cache the
            //                      full list, then filter the cache client-side
            //                      per keystroke. Use for small static datasets
            //                      (countries, currencies, departments, etc.)
            this.fetchMode = containerElement.getAttribute('data-fetch') || 'each';

            // State
            this.cache = null;
            this.results = [];
            this.activeIndex = -1;
            // Cached NodeList of rendered items — keyboard nav reads this on
            // every arrow keypress, so re-querying per keydown is waste.
            // Refreshed at the end of renderResults, invalidated at its start.
            this._items = null;
            // Two lifetimes: abortController spans the instance and releases every
            // listener; fetchAbortController is re-armed per request to cancel the
            // in-flight suggestion fetch when a newer keystroke supersedes it.
            this.abortController = new AbortController();
            this.fetchAbortController = null;
            this.selectedItem = null;
            this.dropmenuInstance = null;

            this.init();
            containerElement.setAttribute('data-nds-autocomplete-initialized', 'true');
        }

        // ==============================================
        // INITIALIZATION
        // ==============================================

        init() {
            this.setupDropmenu();
            this.setupAria();
            this.setupEventListeners();

            // Disable browser native autocomplete
            this.input.setAttribute('autocomplete', 'off');
        }

        setupDropmenu() {
            // Autocomplete dropmenu is scoped to form-control
            this.formControl.classList.add('nds-dropmenu');

            // Create and append the menu
            var menu = document.createElement('div');
            menu.className = 'nds-dropmenu-menu nds-autocomplete-menu';
            menu.setAttribute('role', 'listbox');
            menu.setAttribute('hidden', '');

            var menuId = 'nds-ac-' + (this.input.id || NDS.uniqueId());
            menu.id = menuId;

            // Scrollable container for items — an .nds-empty container so a
            // query matching nothing shows a "no results" placeholder instead
            // of silently closing (a dead-field read in taginput strict mode).
            // data-empty-message / data-empty-icon on the [data-url] container
            // forward through, so consumers customize per field.
            var scroll = document.createElement('div');
            scroll.className = 'nds-dropmenu-scroll nds-empty';
            scroll.setAttribute('data-empty-message',
                this.container.getAttribute('data-empty-message') || STRINGS[NDS.langKey].noResults);
            scroll.setAttribute('data-empty-icon',
                this.container.getAttribute('data-empty-icon') || 'nds-icon nds-hgi-search-01');
            menu.appendChild(scroll);

            this.formControl.appendChild(menu);
            this.menu = menu;
            this.scroll = scroll;
            this.menuId = menuId;

            // Initialize NDSDropmenu on form-control (no click-to-toggle, open/close is programmatic)
            this.formControl.setAttribute('data-dropmenu-no-click', '');
            this.dropmenuInstance = NDS.Dropmenu.create(this.formControl);
        }

        setupAria() {
            this.input.setAttribute('role', 'combobox');
            NDS.aria.expanded(this.input, false);
            this.input.setAttribute('aria-autocomplete', 'list');
            this.input.setAttribute('aria-controls', this.menuId);
            this.input.removeAttribute('aria-activedescendant');
        }

        // ==============================================
        // EVENT LISTENERS
        // ==============================================

        setupEventListeners() {
            // Debounced input handler
            this._debouncedFetch = NDS.debounce((value) => {
                this.fetchResults(value);
            }, DEBOUNCE_MS);

            // Track held keys to prevent fetch spam (e.g. holding backspace)
            this._keyHeld = false;

            const { signal } = this.abortController;

            // Input typing — only process when 'typing' state is set by forms JS
            this._onInput = () => {
                if (!NDS.State.has(this.container, 'typing')) return;
                if (this._keyHeld) return;

                var value = this.input.value.trim();
                this.selectedItem = null;

                if (value.length >= this.minChars) {
                    this._debouncedFetch(value);
                } else {
                    this.close();
                    this.results = [];
                }
            };
            // Kept as a field, not inlined — the keyup handler below re-runs it directly.
            this.input.addEventListener('input', this._onInput, { signal });

            // Prevent dropmenu's trigger click-to-toggle on the input
            // (we control open/close via typing, not clicking)
            this.input.addEventListener('click', (e) => e.stopPropagation(), { signal });

            // Keyboard navigation — stopPropagation prevents dropmenu's trigger keydown
            this.input.addEventListener('keydown', (e) => {
                this._keyHeld = e.repeat;
                this.handleKeydown(e);
            }, { signal });

            // Fetch after held key is released
            this.input.addEventListener('keyup', () => {
                if (!this._keyHeld) return;
                this._keyHeld = false;
                this._onInput();
            }, { signal });

            // Delegated click for dropdown items — one listener for the instance
            // lifetime instead of 20 fresh listeners per render (torn down by
            // the next innerHTML='').
            this.scroll.addEventListener('click', (e) => {
                var btn = e.target.closest('.nds-dropmenu-item');
                if (!btn || !this.scroll.contains(btn)) return;
                e.preventDefault();
                e.stopPropagation();
                var index = parseInt(btn.getAttribute('data-index'), 10);
                if (this.results[index]) this.selectItem(this.results[index]);
            }, { signal });

            // Clear button — extends existing forms clear behavior
            if (this.clearBtn) {
                this.clearBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.handleClear();
                }, { signal });
            }

            // Open on focus if results exist
            this.input.addEventListener('focus', () => {
                if (this.results.length > 0 && !this.dropmenuInstance.isOpen && !this.selectedItem) {
                    this.renderResults(this.results, this.input.value.trim());
                }
            }, { signal });

            // Sync aria-expanded when dropmenu opens/closes
            this.container.addEventListener('nds:dropmenu:opened', () => {
                NDS.aria.expanded(this.input, true);
            }, { signal });
            this.container.addEventListener('nds:dropmenu:closed', () => {
                NDS.aria.expanded(this.input, false);
                this.input.removeAttribute('aria-activedescendant');
                this.activeIndex = -1;
            }, { signal });
        }

        // ==============================================
        // FETCH
        // ==============================================

        async fetchResults(query) {
            // Skip if input value has changed since this fetch was queued (stale debounce)
            if (this.input.value.trim() !== query) return;

            if (this.fetchMode === 'once') {
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

            this.setLoading(true);

            try {
                var separator = this.url.includes('?') ? '&' : '?';
                var fetchUrl = this.url + separator + this.queryParam + '=' + encodeURIComponent(query);
                var data = (await NDS.request(fetchUrl, { signal, json: true })).data;
                this.results = this._extractResults(data);
                if (this.customFilter) this.results = this.customFilter(this.results, query) || [];
                this.renderResults(this.results, query);
                this.emitEvent('nds:autocomplete:fetch', { query: query, results: this.results });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.warn('NDS Autocomplete: Fetch failed', error);
                    this.results = [];
                    this.close();
                }
            } finally {
                // Only the current request clears loading. A superseding keystroke
                // aborts this one, and its rejection settles AFTER the new request
                // has already set loading — clearing here would kill a live spinner.
                if (this.fetchAbortController?.signal === signal) this.setLoading(false);
            }
        }

        // Fetch the full list once, cache it, filter the cache client-side
        // on every subsequent call.
        async _fetchOnceAndFilter(query) {
            if (!this.cache) {
                if (this.fetchAbortController) this.fetchAbortController.abort();
                this.fetchAbortController = new AbortController();
                var { signal } = this.fetchAbortController;
                this.setLoading(true);
                try {
                    var data = (await NDS.request(this.url, { signal, json: true })).data;
                    this.cache = this._extractResults(data);
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.warn('NDS Autocomplete: Fetch failed', error);
                        this.cache = [];
                        this.close();
                    }
                    return;
                } finally {
                    // See _fetchEach — only the current request clears loading.
                    if (this.fetchAbortController?.signal === signal) this.setLoading(false);
                }
            }

            if (this.customFilter) {
                this.results = this.customFilter(this.cache, query) || [];
            } else {
                var q = query.toLowerCase();
                var field = this.nameField;
                this.results = this.cache.filter(function (item) {
                    var value = item && item[field];
                    return value != null && String(value).toLowerCase().indexOf(q) !== -1;
                });
            }
            this.renderResults(this.results, query);
            this.emitEvent('nds:autocomplete:fetch', { query: query, results: this.results });
        }

        // Extract the array of results from a parsed JSON response, honoring
        // data-results-path if set.
        _extractResults(data) {
            if (this.resultsPath) {
                return this.resultsPath.split('.').reduce(function (obj, key) {
                    return obj && obj[key];
                }, data) || [];
            }
            return Array.isArray(data) ? data : (data.results || data.data || []);
        }

        // ==============================================
        // LOADING STATE
        // ==============================================

        setLoading(isLoading) {
            // Delegated to forms' state hook — see nds-forms.js loading branch.
            if (isLoading) addState(this.container, 'loading');
            else removeState(this.container, 'loading');
        }

        // ==============================================
        // RENDERING
        // ==============================================

        renderResults(data, query) {
            this.scroll.innerHTML = '';
            this.activeIndex = -1;
            this._items = null;

            if (!data || data.length === 0) {
                // Soft dependency — NDS.Empty ships in the main bundle; without
                // it the menu closes silently as before.
                if (!NDS.Empty) { this.close(); return; }
                NDS.Empty.refresh(this.scroll);
                NDS.announce(STRINGS[NDS.langKey].noResults);
                this.open();
                return;
            }

            // Limit displayed results to 20
            var limited = data.slice(0, 20);
            // Compile the highlight regex once per render, not once per item.
            var highlightRegex = query
                ? new RegExp('(' + NDS.escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi')
                : null;
            var fragment = document.createDocumentFragment();

            limited.forEach((item, index) => {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'nds-btn nds-subtle nds-dropmenu-item';
                btn.setAttribute('role', 'option');
                btn.setAttribute('data-index', index);
                NDS.aria.selected(btn, false);
                btn.id = this.menuId + '-item-' + index;

                var labelSpan = document.createElement('span');
                labelSpan.className = 'nds-label';
                if (this.customRender) {
                    // Developer owns escaping in the custom render path.
                    labelSpan.innerHTML = this.customRender(item, query);
                } else {
                    var text = String(item[this.nameField] || '');
                    labelSpan.innerHTML = this.highlightMatch(text, highlightRegex);
                }
                btn.appendChild(labelSpan);

                fragment.appendChild(btn);
            });

            this.scroll.appendChild(fragment);
            this._items = this.scroll.querySelectorAll('.nds-dropmenu-item');

            this.open();
        }

        // Regex is precompiled per render in renderResults — passing it in
        // (instead of the raw query) means the hot path skips 20 regex compiles.
        highlightMatch(text, regex) {
            var escaped = NDS.escapeHtml(text);
            return regex ? escaped.replace(regex, '<mark>$1</mark>') : escaped;
        }

        // ==============================================
        // OPEN / CLOSE (delegates to NDSDropmenu)
        // ==============================================

        open() {
            if (!this.dropmenuInstance || this.dropmenuInstance.isOpen) return;
            // Width tracks the form-control via the dropmenu's --dropmenu-min-width
            // hook (_autocomplete.scss), same as custom-select — no inline
            // width-fighting here (the dropmenu wipes inline styles on close).
            this.dropmenuInstance.open();
        }

        close() {
            if (!this.dropmenuInstance || !this.dropmenuInstance.isOpen) return;
            this.dropmenuInstance.close();
        }

        // ==============================================
        // SELECTION
        // ==============================================

        selectItem(itemData) {
            var text = String(itemData[this.nameField] || '');

            this.input.value = text;
            this.selectedItem = itemData;

            // Remove 'typing' so _onInput handler skips the fetch
            removeState(this.container, 'typing');
            // Trigger input/change events so forms JS updates state
            NDS.triggerEvents(this.input);

            this.close();
            this.input.focus();

            this.emitEvent('nds:autocomplete:select', {
                item: itemData,
                text: text
            });

            // Auto-submit in search box context only
            if (this.container.classList.contains('nds-search-box')) {
                const searchBtn = this.container.querySelector('.nds-search-btn') ||
                                  this.container.closest('.nds-search-content')?.querySelector('.nds-search-btn');
                if (searchBtn) {
                    searchBtn.click();
                }
            }
        }

        handleClear() {
            this.selectedItem = null;
            this.results = [];
            this.activeIndex = -1;

            this.close();
            this.emitEvent('nds:autocomplete:clear', {});
        }

        // ==============================================
        // KEYBOARD NAVIGATION
        // ==============================================

        handleKeydown(e) {
            var isOpen = this.dropmenuInstance && this.dropmenuInstance.isOpen;
            // Cached from renderResults; falls back to a fresh query if the
            // menu opened without a prior render (defensive, never seen in practice).
            var items = this._items || this.menu.querySelectorAll('.nds-dropmenu-item');
            var itemCount = items.length;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    e.stopPropagation();
                    if (!isOpen && this.results.length > 0) {
                        this.renderResults(this.results, this.input.value.trim());
                        return;
                    }
                    if (isOpen && itemCount > 0) {
                        this.navigateItems(1, items);
                    }
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    e.stopPropagation();
                    if (isOpen && itemCount > 0) {
                        this.navigateItems(-1, items);
                    }
                    break;

                case 'Enter':
                    e.stopPropagation();
                    if (isOpen && this.activeIndex >= 0 && this.activeIndex < this.results.length) {
                        e.preventDefault();
                        this.selectItem(this.results[this.activeIndex]);
                    } else if (isOpen) {
                        this.close();
                    }
                    break;

                case ' ':
                    e.stopPropagation();
                    break;

                case 'Escape':
                    if (isOpen) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.close();
                    }
                    break;

                case 'Tab':
                    if (isOpen) {
                        this.close();
                    }
                    break;

                case 'Home':
                    if (isOpen && itemCount > 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.setActiveItem(0, items);
                    }
                    break;

                case 'End':
                    if (isOpen && itemCount > 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.setActiveItem(itemCount - 1, items);
                    }
                    break;

            }
        }

        navigateItems(direction, items) {
            var count = items.length;
            if (count === 0) return;

            var newIndex = this.activeIndex + direction;
            if (newIndex < 0) newIndex = count - 1;
            if (newIndex >= count) newIndex = 0;

            this.setActiveItem(newIndex, items);
        }

        setActiveItem(index, items) {
            // Clear previous
            if (this.activeIndex >= 0 && items[this.activeIndex]) {
                NDS.aria.selected(items[this.activeIndex], false);
                removeState(items[this.activeIndex], 'active');
            }

            this.activeIndex = index;

            if (index >= 0 && items[index]) {
                NDS.aria.selected(items[index], true);
                addState(items[index], 'active');
                items[index].scrollIntoView({ block: 'nearest' });
                this.input.setAttribute('aria-activedescendant', items[index].id);
            } else {
                this.input.removeAttribute('aria-activedescendant');
            }
        }

        // ==============================================
        // EVENTS & CLEANUP
        // ==============================================

        emitEvent(name, detail) {
            this.container.dispatchEvent(new CustomEvent(name, {
                detail: detail,
                bubbles: true
            }));
        }

        destroy() {
            // Optional-chained: create() can hand back a half-constructed instance.
            this.abortController?.abort();
            this.fetchAbortController?.abort();

            if (this.dropmenuInstance) {
                this.dropmenuInstance.destroy();
            }

            if (this.menu && this.menu.parentNode) {
                this.menu.parentNode.removeChild(this.menu);
            }

            this.container.classList.remove('nds-dropmenu');
            this.formControl.classList.remove('nds-dropmenu-trigger');
            this.container.removeAttribute('data-nds-autocomplete-initialized');
        }
    }

    // ==============================================
    // AUTO-INITIALIZATION
    // ==============================================

    // Build a container's autocomplete instance (once). Shared by the delegated
    // focusin and the programmatic create().
    function buildAutocomplete(container) {
        if (!container || container.hasAttribute('data-nds-autocomplete-initialized')) return;
        if (container.closest('code') || container.closest('.code-example')) return;
        if (!container.querySelector('input[autocomplete="on"]')) return;
        new NDSAutocomplete(container);
    }

    var _initDone = false;

    // Delegated + lazy (custom-select / voice-input pattern): instead of sweeping
    // and constructing every [data-url] container up front, build a container's
    // instance on its FIRST focusin. focusin fires before the first keystroke, so
    // the input/keydown listeners are wired before the user types, and
    // dynamically-added containers are covered for free. The instance itself
    // stays per-element — it holds results / activeIndex / in-flight abort,
    // runtime state that (unlike the custom-select's value) isn't in the DOM.
    function initializeAutocompletes() {
        if (_initDone) return;
        _initDone = true;
        document.addEventListener('focusin', function (e) {
            var t = e.target;
            if (!t || !t.closest) return;
            buildAutocomplete(t.closest('.nds-form-container[data-url]'));
        });
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    NDS.Autocomplete = {
        init: initializeAutocompletes,
        reinit: initializeAutocompletes,
        // Programmatic construction. Pass { filter, renderItem } to override
        // the default substring match and dropdown-row renderer.
        create: function (element, options) { return new NDSAutocomplete(element, options); }
    };

})();
