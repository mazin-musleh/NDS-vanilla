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
            // Fields used for client-side substring matching in fetch="once".
            // Defaults to nameField. Set to a comma-separated list to match
            // across multiple fields — e.g. data-search-fields="Name,NameAr"
            // lets the user find a city by typing either language while the
            // dropdown still displays nameField.

            // State
            this.cache = null;
            this.results = [];
            this.activeIndex = -1;
            this.abortController = null;
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

            var menuId = 'nds-ac-' + (this.input.id || Math.random().toString(36).substring(2, 11));
            menu.id = menuId;

            // Scrollable container for items
            var scroll = document.createElement('div');
            scroll.className = 'nds-dropmenu-scroll';
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
            this.input.setAttribute('aria-expanded', 'false');
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
            this.input.addEventListener('input', this._onInput);

            // Prevent dropmenu's trigger click-to-toggle on the input
            // (we control open/close via typing, not clicking)
            this._onInputClick = (e) => e.stopPropagation();
            this.input.addEventListener('click', this._onInputClick);

            // Keyboard navigation — stopPropagation prevents dropmenu's trigger keydown
            this._onKeydown = (e) => {
                this._keyHeld = e.repeat;
                this.handleKeydown(e);
            };
            this.input.addEventListener('keydown', this._onKeydown);

            // Fetch after held key is released
            this._onKeyup = () => {
                if (!this._keyHeld) return;
                this._keyHeld = false;
                this._onInput();
            };
            this.input.addEventListener('keyup', this._onKeyup);

            // Clear button — extends existing forms clear behavior
            if (this.clearBtn) {
                this._onClear = (e) => { e.stopPropagation(); this.handleClear(); };
                this.clearBtn.addEventListener('click', this._onClear);
            }

            // Open on focus if results exist
            this._onFocus = () => {
                if (this.results.length > 0 && !this.dropmenuInstance.isOpen && !this.selectedItem) {
                    this.renderResults(this.results, this.input.value.trim());
                }
            };
            this.input.addEventListener('focus', this._onFocus);

            // Sync aria-expanded when dropmenu opens/closes
            this.container.addEventListener('nds:dropmenu:opened', () => {
                this.input.setAttribute('aria-expanded', 'true');
            });
            this.container.addEventListener('nds:dropmenu:closed', () => {
                this.input.setAttribute('aria-expanded', 'false');
                this.input.removeAttribute('aria-activedescendant');
                this.activeIndex = -1;
            });
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
            if (this.abortController) this.abortController.abort();
            this.abortController = new AbortController();

            this.setLoading(true);

            try {
                var separator = this.url.includes('?') ? '&' : '?';
                var fetchUrl = this.url + separator + this.queryParam + '=' + encodeURIComponent(query);
                var response = await fetch(fetchUrl, { signal: this.abortController.signal });
                var data = await this._readJsonLimited(response);
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
                this.setLoading(false);
            }
        }

        // Fetch the full list once, cache it, filter the cache client-side
        // on every subsequent call.
        async _fetchOnceAndFilter(query) {
            if (!this.cache) {
                if (this.abortController) this.abortController.abort();
                this.abortController = new AbortController();
                this.setLoading(true);
                try {
                    var response = await fetch(this.url, { signal: this.abortController.signal });
                    var data = await this._readJsonLimited(response);
                    this.cache = this._extractResults(data);
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.warn('NDS Autocomplete: Fetch failed', error);
                        this.cache = [];
                        this.close();
                    }
                    this.setLoading(false);
                    return;
                } finally {
                    this.setLoading(false);
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

        // Read a fetch response as JSON with a 1MB size cap.
        async _readJsonLimited(response) {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            var MAX_SIZE = 1024 * 1024;
            var contentLength = response.headers.get('Content-Length');
            if (contentLength && parseInt(contentLength, 10) > MAX_SIZE) {
                throw new Error('Response too large');
            }
            var text = '';
            var reader = response.body.getReader();
            var decoder = new TextDecoder();
            var totalBytes = 0;
            while (true) {
                var chunk = await reader.read();
                if (chunk.done) break;
                totalBytes += chunk.value.length;
                if (totalBytes > MAX_SIZE) {
                    reader.cancel();
                    throw new Error('Response too large');
                }
                text += decoder.decode(chunk.value, { stream: true });
            }
            return JSON.parse(text);
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
            if (!this.clearBtn) return;

            if (isLoading) {
                this.clearBtn.removeAttribute('hidden');
                addState(this.clearBtn, 'loading');
            } else {
                removeState(this.clearBtn, 'loading');
                var hasValue = this.input.value.trim() !== '';
                this.clearBtn.toggleAttribute('hidden', !hasValue);
            }
        }

        // ==============================================
        // RENDERING
        // ==============================================

        renderResults(data, query) {
            this.scroll.innerHTML = '';
            this.activeIndex = -1;

            if (!data || data.length === 0) {
                this.close();
                return;
            }

            // Limit displayed results to 20
            var limited = data.slice(0, 20);

            limited.forEach((item, index) => {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'nds-btn nds-subtle nds-dropmenu-item';
                btn.setAttribute('role', 'option');
                btn.setAttribute('aria-selected', 'false');
                btn.id = this.menuId + '-item-' + index;

                var labelSpan = document.createElement('span');
                labelSpan.className = 'nds-label';
                if (this.customRender) {
                    // Developer owns escaping in the custom render path.
                    labelSpan.innerHTML = this.customRender(item, query);
                } else {
                    var text = String(item[this.nameField] || '');
                    labelSpan.innerHTML = this.highlightMatch(text, query);
                }
                btn.appendChild(labelSpan);

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.selectItem(item);
                });

                this.scroll.appendChild(btn);
            });

            this.open();
        }

        highlightMatch(text, query) {
            if (!query) return this.escapeHtml(text);

            var escaped = this.escapeHtml(text);
            var escapedQuery = this.escapeHtml(query);
            var regex = new RegExp('(' + escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
            return escaped.replace(regex, '<mark>$1</mark>');
        }

        escapeHtml(str) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(str));
            return div.innerHTML;
        }

        // ==============================================
        // OPEN / CLOSE (delegates to NDSDropmenu)
        // ==============================================

        open() {
            if (!this.dropmenuInstance || this.dropmenuInstance.isOpen) return;
            // Match the menu width to the form-control before opening so the
            // fixed-positioned dropmenu sizes to the input rather than to the
            // viewport.
            var menu = this.formControl.querySelector('.nds-autocomplete-menu');
            if (menu) menu.style.minWidth = this.formControl.offsetWidth + 'px';
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
            this.input.dispatchEvent(new Event('input', { bubbles: true }));
            this.input.dispatchEvent(new Event('change', { bubbles: true }));

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
            var items = this.menu.querySelectorAll('.nds-dropmenu-item');
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
                items[this.activeIndex].setAttribute('aria-selected', 'false');
                removeState(items[this.activeIndex], 'active');
            }

            this.activeIndex = index;

            if (index >= 0 && items[index]) {
                items[index].setAttribute('aria-selected', 'true');
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
            if (this.abortController) this.abortController.abort();

            this.input.removeEventListener('input', this._onInput);
            this.input.removeEventListener('click', this._onInputClick);
            this.input.removeEventListener('keydown', this._onKeydown);
            this.input.removeEventListener('keyup', this._onKeyup);
            this.input.removeEventListener('focus', this._onFocus);

            if (this.clearBtn && this._onClear) {
                this.clearBtn.removeEventListener('click', this._onClear);
            }

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

    function initializeAutocompletes() {
        var containers = document.querySelectorAll('.nds-form-container[data-url]');

        containers.forEach(function (container) {
            if (container.hasAttribute('data-nds-autocomplete-initialized')) return;
            if (container.closest('code') || container.closest('.code-example')) return;

            var input = container.querySelector('input[autocomplete="on"]');
            if (!input) return;

            new NDSAutocomplete(container);
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
