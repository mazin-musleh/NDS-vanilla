/**
 * NDS Filter Component
 * Flexible filtration system for filtering card items based on search and dynamic criteria
 *
 * Usage:
 * - Add .nds-filter with data-filter-target="targetContainerId" to filter container
 * - Add data-filter="search" to search input containers
 * - Add data-filter="[name]" to any element in cards to mark filterable content
 * - Add data-filter="[name]" data-filter-type="checkbox|radio" to auto-generate filter inputs
 *
 * Dynamic Filter Names:
 * - Use any name: data-filter="tags", data-filter="role", data-filter="department"
 * - Multiple filters can be used together
 * - Each filter name creates its own criteria group
 *
 * Auto-generate Filter Inputs:
 * - data-filter-type="checkbox" - Multiple selections (OR logic)
 * - data-filter-type="radio" - Single selection
 * - data-filter-type="switch" - Toggle switches (OR logic, same as checkbox)
 * - data-filter-legend="Title" - Sets the fieldset legend
 * - data-filter-variant="nds-primary" - Adds class to inputs
 *
 * Search Behavior:
 * - Inside dropmenu: requires Apply button click
 * - Outside dropmenu: applies on Enter key or search button click
 */

(function() {
    'use strict';

    class NDSFilter {
        constructor(filterContainer) {
            this.filterContainer = filterContainer;
            this.targetId = filterContainer.getAttribute('data-filter-target');
            this.targetContainer = this.targetId ? document.getElementById(this.targetId) : null;

            // Get all filterable items (empty array if no target)
            this.items = this.targetContainer
                ? Array.from(this.targetContainer.querySelectorAll(this.getItemSelector()))
                : [];

            // Filter criteria storage - dynamic structure.
            // Sort state lives inside the NDS.Sort instance (this.sort); read via this.sort.getState().
            this.criteria = {
                search: '',
                filters: {}  // { filterName: [selectedValues] }
            };

            // Filter inputs storage - dynamic structure
            this.filterInputs = {};  // { filterName: { inputs: [], type: 'checkbox'|'radio' } }

            // Search inputs storage
            this.searchInputs = {
                direct: null,
                dropmenu: null
            };

            // Form submission mode detection.
            // .nds-filter is always a pure anchor; form mode is driven by a separate
            // <form data-filter-target="X" data-filter-submit> element linked via the
            // same target id. Add data-ajax on that form for AJAX submission.
            this.submissionForm = this.targetId
                ? document.querySelector(`form[data-filter-target="${this.targetId}"][data-filter-submit]`)
                : null;

            this.isFormMode = !!this.submissionForm;
            this.isAjaxMode = this.isFormMode && this.submissionForm.hasAttribute('data-ajax');

            // Hidden inputs container for form mode
            this.hiddenInputsContainer = null;

            // Resolve applied-chips container: inside filter first, then external with matching target
            this.appliedContainer = filterContainer.querySelector('.nds-filter-applied')
                || (this.targetId && document.querySelector(`.nds-filter-applied[data-filter-target="${this.targetId}"]`));

            // Resolve external search box linked by data-filter-target
            this.searchBoxElement = this.targetId
                ? document.querySelector(`.nds-search-box[data-filter-target="${this.targetId}"]`)
                : null;

            // Resolve external auto-fill linked by data-filter-target
            this.autoFillElement = this.targetId
                ? document.querySelector(`.nds-auto-fill[data-filter-target="${this.targetId}"]`)
                : null;

            // Resolve search-query slot via data-filter-target linking (same pattern as
            // .nds-filter-applied / .nds-search-box). When present, the search keyword is
            // routed into this slot instead of the applied-chips row.
            this.searchQuerySlot = this.targetId
                ? document.querySelector(
                    `[data-filter-query][data-filter-target="${this.targetId}"],`
                    + ` [data-filter-target="${this.targetId}"] [data-filter-query]`
                )
                : null;

            this.filterLabels = {};  // { filterName: { value: label } } — auto-built from data-filter-value

            this._ac = new AbortController();
            this.init();
        }

        getItemSelector() {
            return this.targetContainer?.getAttribute('data-filter-items') || '.nds-card';
        }

        getFilterValue(el) {
            return el.getAttribute('data-filter-value') || el.textContent.trim();
        }

        /**
         * Find all elements matching `selector` that belong to this filter instance.
         * Matches either descendants of the .nds-filter container OR any elements
         * across the document linked via data-filter-target. Elements inside the
         * target container (e.g. <span data-filter> markers on cards) are excluded.
         *
         * Multi-selectors ("a, b, c") are handled correctly — the target scope is
         * applied to each comma-separated branch, not just the last one.
         */
        queryAll(selector) {
            const inside = Array.from(this.filterContainer.querySelectorAll(selector));
            let matches = inside;

            if (this.targetId) {
                const parts = selector.split(',').map(s => s.trim()).filter(Boolean);
                const scoped = parts.flatMap(p => [
                    `${p}[data-filter-target="${this.targetId}"]`,
                    `[data-filter-target="${this.targetId}"] ${p}`
                ]).join(', ');
                const external = Array.from(document.querySelectorAll(scoped));
                matches = Array.from(new Set([...inside, ...external]));
            }

            if (this.targetContainer) {
                matches = matches.filter(el => !this.targetContainer.contains(el));
            }

            return matches;
        }

        query(selector) {
            return this.queryAll(selector)[0] || null;
        }

        init() {
            // Trailing-edge debounce for the loading-class cleanup at the end of
            // applyFilters(). One wrapper per instance so rapid filter passes
            // share the same 500ms timer.
            this._clearLoadingDebounced = NDS.debounce(() => {
                if (this.targetContainer) this.targetContainer.classList.remove('nds-loading');
            }, 500);

            this.setupFilterElements();
            this.setupResetButton();
            this.setupActionButtons();
            this.setupChipStyle();
            this.applyUrlParams();

            // Create the sort engine AFTER applyUrlParams so its URL-read DOM reorder
            // happens on items whose filter visibility is already settled.
            this.setupSort();

            // Setup form submission mode
            if (this.isFormMode) {
                this.setupFormSubmission();
            }

            // Populate filter-count slots on first load even without URL params
            this.updateFilterCount();
        }

        setupChipStyle() {
            // Get chip classes from data-chip-class attribute on .nds-filter-applied
            const chipClass = this.appliedContainer?.getAttribute('data-chip-class') || 'nds-primary nds-lg';
            this.chipClass = chipClass;
        }

        // ==============================================
        // FORM SUBMISSION MODE
        // ==============================================

        /**
         * Setup form submission handlers
         */
        setupFormSubmission() {
            // Create hidden inputs container inside the form that will be submitted
            this.hiddenInputsContainer = document.createElement('div');
            this.hiddenInputsContainer.className = 'nds-filter-hidden-inputs';
            this.hiddenInputsContainer.style.display = 'none';
            this.submissionForm.appendChild(this.hiddenInputsContainer);

            // Handle form submission
            this.submissionForm.addEventListener('submit', (e) => {
                if (this.isAjaxMode) {
                    e.preventDefault();
                    this.handleAjaxSubmit();
                } else {
                    this.handleFormSubmit(e);
                }
            });
        }

        /**
         * Handle standard form submission
         */
        handleFormSubmit(e) {
            // Validate the submission form (may differ from the anchor)
            const result = NDS.Forms.validateForm(this.submissionForm, {
                showMessages: true,
                focusFirst: true
            });

            if (!result.valid) {
                e.preventDefault();
                this.filterContainer.dispatchEvent(new CustomEvent('nds:formInvalid', {
                    detail: { invalidFields: result.invalidFields, errors: result.errors }
                }));
                return;
            }

            // Dispatch preventable event
            const submitEvent = new CustomEvent('nds:filterFormSubmit', {
                detail: {
                    criteria: this.criteria,
                    form: this.submissionForm
                },
                cancelable: true
            });

            const shouldContinue = this.filterContainer.dispatchEvent(submitEvent);

            if (!shouldContinue) {
                e.preventDefault();
                return;
            }

            // Update hidden inputs before submission
            this.updateHiddenInputs();

            // Set submitting state
            NDS.State.set(this.filterContainer, 'submitting');

            // Dispatch valid event
            this.filterContainer.dispatchEvent(new CustomEvent('nds:formValid', {
                detail: {}
            }));
        }

        /**
         * Handle AJAX form submission
         */
        handleAjaxSubmit() {
            // Update hidden inputs, URL params, and UI state
            this.updateHiddenInputs();
            this.updateUrlParams();
            this.updateFilterButtonLabel();
            this.updateAppliedChips();

            // Unified change event (fires in all modes)
            this.dispatchFilterEvent();

            // Dispatch preventable AJAX submit event
            const ajaxEvent = new CustomEvent('nds:filterFormAjax', {
                detail: {
                    criteria: this.criteria,
                    form: this.submissionForm,
                    hiddenInputsContainer: this.hiddenInputsContainer
                },
                cancelable: true
            });

            const shouldContinue = this.filterContainer.dispatchEvent(ajaxEvent);

            if (!shouldContinue) {
                return;
            }

            // Set submitting state
            NDS.State.set(this.filterContainer, 'submitting');
            NDS.Status.clear(this.filterContainer);

            // Add loading class to target container (similar to client-side filter)
            if (this.targetContainer) {
                this.targetContainer.classList.add('nds-loading');
            }

            // Build request URL and options (read from the submission form)
            const method = this.submissionForm.method.toUpperCase() || 'GET';
            let action = this.submissionForm.action || window.location.href;

            // Handle # or empty action - use current page URL without hash
            if (!action || action === '#' || action.endsWith('#')) {
                action = window.location.origin + window.location.pathname;
            }

            let url = action;
            let options = {
                method: method,
                headers: {}
            };

            // Collect form data from the submission form (respects HTML `form="id"`
            // attribute on scattered inputs associated with this form).
            const formData = new FormData(this.submissionForm);

            if (method === 'GET') {
                // Build query string from form data
                const params = new URLSearchParams(formData);
                url = action + (action.includes('?') ? '&' : '?') + params.toString();
            } else {
                // POST/PUT - send FormData in body
                options.body = formData;
            }

            // Send AJAX request
            fetch(url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }

                    // Detect response type from Content-Type header
                    const contentType = response.headers.get('Content-Type') || '';
                    const isJson = contentType.includes('application/json');

                    return isJson
                        ? response.json().then(data => ({ isJson: true, data }))
                        : response.text().then(data => ({ isJson: false, data }));
                })
                .then(({ isJson, data }) => {
                    let eventDetail = {
                        success: true,
                        form: this.filterContainer,
                        isJson: isJson
                    };

                    if (isJson) {
                        // JSON response — dispatch raw data via event for developer rendering
                        eventDetail.data = data;

                        if (this.targetContainer) {
                            this.targetContainer.removeAttribute('hidden');
                            if (this.targetContainer.style.display === 'none') {
                                this.targetContainer.style.display = '';
                            }
                        }
                    } else {
                        // HTML response — inject into target container
                        eventDetail.html = data;
                        eventDetail.fullHtml = data;

                        if (this.targetContainer && this.targetId) {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(data, 'text/html');
                            const targetInResponse = doc.getElementById(this.targetId);

                            if (targetInResponse) {
                                const newContainer = targetInResponse.cloneNode(true);
                                this.targetContainer.replaceWith(newContainer);
                                this.targetContainer = newContainer;
                                this.items = Array.from(this.targetContainer.querySelectorAll(this.getItemSelector()));

                                this.targetContainer.removeAttribute('hidden');
                                if (this.targetContainer.style.display === 'none') {
                                    this.targetContainer.style.display = '';
                                }

                                eventDetail.html = newContainer.innerHTML;
                            } else {
                                console.warn(`[NDS Filter AJAX] Target container #${this.targetId} not found in server response. Emptying target container.`);
                                this.targetContainer.innerHTML = '';

                                const id = this.targetContainer.id;
                                while (this.targetContainer.attributes.length > 0) {
                                    this.targetContainer.removeAttribute(this.targetContainer.attributes[0].name);
                                }
                                this.targetContainer.id = id;
                                this.targetContainer.setAttribute('hidden', '');

                                eventDetail.html = '';
                            }
                        }
                    }

                    // Remove loading class from target container
                    if (this.targetContainer) {
                        this.targetContainer.classList.remove('nds-loading');
                    }

                    // Set success state
                    NDS.Status.set(this.filterContainer, 'success');
                    NDS.State.clear(this.filterContainer);

                    // Update UI elements
                    this.updateUrlParams();
                    this.updateFilterButtonLabel();
                    this.updateAppliedChips();

                    // Dispatch complete event
                    this.filterContainer.dispatchEvent(new CustomEvent('nds:filterFormComplete', {
                        detail: eventDetail
                    }));

                    // JSON developers render inside the complete-event handler and may set
                    // data-total-count on the target container there — re-run the count so
                    // the slots reflect their updates.
                    if (isJson) {
                        this.updateFilterCount();
                    }

                    // Clear success state after 3 seconds
                    setTimeout(() => {
                        NDS.Status.clear(this.filterContainer);
                    }, 3000);
                })
                .catch(error => {
                    console.error('Filter AJAX submission failed:', error);

                    // Remove loading class from target container
                    if (this.targetContainer) {
                        this.targetContainer.classList.remove('nds-loading');
                    }

                    // Set error state
                    NDS.Status.set(this.filterContainer, 'error');
                    NDS.State.clear(this.filterContainer);

                    // Dispatch error event
                    this.filterContainer.dispatchEvent(new CustomEvent('nds:filterFormError', {
                        detail: {
                            error: error.message,
                            form: this.filterContainer
                        }
                    }));

                    // Clear error state after 5 seconds
                    setTimeout(() => {
                        NDS.Status.clear(this.filterContainer);
                    }, 5000);
                });
        }

        /**
         * Get the custom name for search input or return default
         */
        getSearchInputName() {
            // Check direct search input first
            if (this.searchInputs.direct && this.searchInputs.direct.input.name) {
                return this.searchInputs.direct.input.name;
            }

            // Check dropmenu search input
            if (this.searchInputs.dropmenu && this.searchInputs.dropmenu.input.name) {
                return this.searchInputs.dropmenu.input.name;
            }

            // Default to 'search'
            return 'search';
        }

        /**
         * Update hidden inputs for form submission
         * In form mode, we don't create hidden inputs since the actual form inputs
         * (search input, checkboxes) already have the correct 'name' attributes
         * and will be submitted by the browser automatically.
         */
        updateHiddenInputs() {
            // No hidden inputs needed in form mode
            // The browser will submit the actual form inputs (search, checkboxes, radios)
            // based on their 'name' attributes
            return;
        }

        /**
         * Clear hidden inputs (no-op in current implementation)
         */
        clearHiddenInputs() {
            // No hidden inputs to clear - form inputs are cleared directly
            return;
        }

        // ==============================================
        // URL PARAMETERS
        // ==============================================

        sanitizeInput(str) {
            if (!str) return '';
            return str
                .replace(/<[^>]*>/g, '')
                .replace(/[<>"'&]/g, '')
                .substring(0, 100);
        }

        applyUrlParams() {
            const params = new URLSearchParams(window.location.search);
            let hasParams = false;

            // Each filter reads its own input's `name` as the URL key. Multi-filter
            // pages are responsible for using distinct input names; there is no
            // automatic URL namespacing.
            const searchParamName = this.getSearchInputName();
            const searchParam = params.get(searchParamName);

            if (searchParam) {
                const sanitized = this.sanitizeInput(searchParam);
                this.criteria.search = sanitized.trim().toLowerCase();

                if (this.searchInputs.direct) {
                    this.searchInputs.direct.input.value = sanitized;
                    if (this.searchInputs.direct.clearBtn) {
                        this.searchInputs.direct.clearBtn.hidden = false;
                    }
                }

                if (this.searchInputs.dropmenu) {
                    this.searchInputs.dropmenu.input.value = sanitized;
                    if (this.searchInputs.dropmenu.clearBtn) {
                        this.searchInputs.dropmenu.clearBtn.hidden = false;
                    }
                }

                hasParams = true;
            }

            // Sort URL params (?sort=…&dir=…) are owned by NDS.Sort (see setupSort);
            // it reads them in its init which runs after applyUrlParams completes.

            // Apply dynamic filter params — plain input names as URL keys
            for (const [key, value] of params.entries()) {
                if (key === searchParamName || key === 'sort' || key === 'dir') continue;

                if (this.filterInputs[key]) {
                    const values = value.split(',').map(v => this.sanitizeInput(v).trim());
                    const filterData = this.filterInputs[key];

                    filterData.inputs.forEach(input => {
                        if (values.some(v => v.toLowerCase() === input.value.toLowerCase())) {
                            input.checked = true;
                        }
                    });

                    this.updateFilterCriteria(key);
                    hasParams = true;
                }
            }

            if (hasParams) {
                this.updateApplyButtonLabel();

                if (this.isFormMode) {
                    // In form mode, only update UI — don't rewrite the URL we just read from
                    this.updateHiddenInputs();
                    this.updateFilterButtonLabel();
                    this.updateAppliedChips();
                } else {
                    this.applyFilters();
                }
            }
        }

        /**
         * Re-apply URL params for a specific filter after dynamic inputs are added
         */
        reapplyUrlParamsForFilter(filterName) {
            const params = new URLSearchParams(window.location.search);
            const value = params.get(filterName);
            if (!value) return;

            // Re-scan the element for current inputs (handles async/dynamic content)
            const filterData = this.filterInputs[filterName];
            if (!filterData) return;
            this.setupManualFilter(filterData.element, filterName);

            const freshData = this.filterInputs[filterName];
            const values = value.split(',').map(v => this.sanitizeInput(v).trim());

            freshData.inputs.forEach(input => {
                if (values.some(v => v.toLowerCase() === input.value.toLowerCase())) {
                    input.checked = true;
                }
            });

            this.updateFilterCriteria(filterName);

            this.updateApplyButtonLabel();

            if (this.isFormMode) {
                this.updateHiddenInputs();
                this.updateFilterButtonLabel();
                this.updateAppliedChips();
            } else {
                this.applyFilters();
            }
        }

        updateUrlParams() {
            // Preserve existing params not managed by this filter
            const params = new URLSearchParams(window.location.search);
            const searchParamName = this.getSearchInputName();

            // Managed param keys: this filter's own search + filter names.
            // Sort/dir are owned by NDS.Sort and preserved untouched here.
            // Other filters' params (distinct names) are also left untouched.
            const managedKeys = new Set([searchParamName]);
            for (const key of Object.keys(this.filterInputs)) {
                managedKeys.add(key);
            }

            // Clear only managed params
            for (const key of managedKeys) {
                params.delete(key);
            }

            // Add search param
            if (this.criteria.search) {
                params.set(searchParamName, this.criteria.search);
            }

            // Add dynamic filter params
            for (const [filterName, values] of Object.entries(this.criteria.filters)) {
                if (values.length > 0) {
                    params.set(filterName, values.join(','));
                }
            }

            const newUrl = params.toString()
                ? `${window.location.pathname}?${params.toString()}`
                : window.location.pathname;

            window.history.replaceState({}, '', newUrl);
        }

        setupActionButtons() {
            const actionButtons = this.queryAll('[data-filter-action]');
            const { signal } = this._ac;

            actionButtons.forEach(button => {
                const action = button.getAttribute('data-filter-action');

                switch (action) {
                    case 'apply':
                        this.applyButton = button;
                        // Tag as the dropmenu's primary action so Enter inside
                        // any filter dropmenu panel triggers Apply.
                        button.setAttribute('data-dropmenu-primary', '');
                        const labelEl = button.querySelector('.nds-label');
                        this.applyButtonBaseLabel = labelEl ? labelEl.textContent : 'Apply';

                        // In form mode, turn the apply button into a submit for the
                        // submission form — works whether the button is inside the form
                        // or externally associated via HTML's `form="id"` attribute.
                        if (this.isFormMode && button.type !== 'submit') {
                            button.type = 'submit';
                        }
                        if (this.isFormMode && this.submissionForm.id && button.form !== this.submissionForm) {
                            button.setAttribute('form', this.submissionForm.id);
                        }

                        button.addEventListener('click', (e) => {
                            // Update search criteria from dropmenu input
                            if (this.searchInputs.dropmenu) {
                                this.criteria.search = this.searchInputs.dropmenu.input.value.trim().toLowerCase();
                                if (this.searchInputs.direct) {
                                    this.searchInputs.direct.input.value = this.searchInputs.dropmenu.input.value;
                                    this.updateClearButtonVisibility(
                                        this.searchInputs.direct.input,
                                        this.searchInputs.direct.clearBtn
                                    );
                                }
                            }

                            // In form mode, update hidden inputs then trigger submission.
                            // We submit programmatically so it works even if the button
                            // isn't natively form-associated.
                            if (this.isFormMode) {
                                e.preventDefault();
                                this.updateHiddenInputs();
                                this.submitForm();
                                return;
                            }

                            // Standard client-side filtering mode
                            e.preventDefault();
                            this.applyFilters();
                        }, { signal });
                        break;
                    case 'clear':
                        button.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.clearDropmenuFilters();
                        }, { signal });
                        break;
                    case 'reset':
                        button.addEventListener('click', (e) => {
                            e.preventDefault();
                            this.reset();
                        }, { signal });
                        break;
                }
            });
        }

        // ==============================================
        // SORT (delegated to NDS.Sort)
        // ==============================================

        setupSort() {
            if (!this.targetContainer) return;

            // Sort buttons may live inside the filter container OR externally
            // via data-filter-target="<id>". queryAll() spans both; pass a live
            // getter so NDS.Sort resolves triggers with the same scope rules.
            if (!this.queryAll('[data-sort]').length) return;

            this.sort = NDS.Sort.create(this.filterContainer, {
                items: () => this.items,
                reorderIn: this.targetContainer,
                triggers: () => this.queryAll('[data-sort]'),
                mode: 'direct',
                a11y: 'pressed',
                accessor: (item, key) => item.getAttribute('data-sort-' + key),
                keyFrom: (trigger) => trigger.getAttribute('data-sort') || '',
                urlSync: { keyParam: 'sort', dirParam: 'dir' },
                onChange: ({ orderedItems }) => {
                    this.items = orderedItems;

                    // Synchronous pagination refresh — bypasses the 50ms setTimeout in
                    // updatePagination() that would otherwise leave pagination-hidden
                    // items sitting at the wrong DOM positions (visible as gaps) until
                    // the deferred refresh caught up.
                    if (NDS.Pagination && NDS.Pagination.refresh) {
                        const pagedContent = this.targetContainer.closest('.nds-paged-content') ||
                                             this.targetContainer.parentElement?.closest('.nds-paged-content');
                        NDS.Pagination.refresh(pagedContent || this.targetContainer);
                    }

                    this.dispatchFilterEvent();
                }
            });
        }

        getActiveFilterCount() {
            let count = 0;
            if (this.searchInputs.dropmenu && this.searchInputs.dropmenu.input.value.trim()) {
                count++;
            }
            for (const values of Object.values(this.criteria.filters)) {
                count += values.length;
            }
            return count;
        }

        getAppliedFilterCount() {
            let count = 0;
            for (const values of Object.values(this.criteria.filters)) {
                count += values.length;
            }
            return count;
        }

        updateApplyButtonLabel() {
            if (!this.applyButton) return;

            const count = this.getActiveFilterCount();
            const labelEl = this.applyButton.querySelector('.nds-label');

            if (labelEl) {
                labelEl.textContent = count > 0
                    ? `${this.applyButtonBaseLabel} (${count})`
                    : this.applyButtonBaseLabel;
            }
        }

        updateFilterButtonLabel() {
            // Cache the button ref on first call; this method fires on every
            // filter change, so we avoid re-walking the DOM each time.
            if (this.filterButtonEl === undefined) {
                this.filterButtonEl = this.query('.nds-filter-btn, [data-filter-btn], .filter-btn');
            }

            const filterBtn = this.filterButtonEl;
            if (!filterBtn) return;

            if (!this.filterButtonBaseLabel) {
                const labelEl = filterBtn.querySelector('.nds-label');
                this.filterButtonBaseLabel = labelEl ? labelEl.textContent : '';
            }

            const count = this.getAppliedFilterCount();
            const labelEl = filterBtn.querySelector('.nds-label');

            if (labelEl && this.filterButtonBaseLabel) {
                labelEl.textContent = count > 0
                    ? `${this.filterButtonBaseLabel} (${count})`
                    : this.filterButtonBaseLabel;
            }

            if (count > 0) {
                NDS.State.set(filterBtn, 'has-filters');
            } else {
                NDS.State.clear(filterBtn);
            }
        }

        updateAppliedChips() {
            // Refresh filter-count slots (query + count) regardless of whether
            // an applied-chips container exists on this page.
            this.updateFilterCount();

            const appliedContainer = this.appliedContainer;
            if (!appliedContainer) return;

            // Find chips container inside applied container
            const chipsContainer = appliedContainer.querySelector('.nds-chips');
            if (!chipsContainer) return;

            // Find auto-fill container (optional): external first, then internal
            const autoFillContainer = this.autoFillElement
                || this.filterContainer.querySelector('.nds-auto-fill');

            // Clear chips container
            chipsContainer.innerHTML = '';

            // When a [data-filter-query] slot is present, the search keyword is routed
            // into that slot (via updateFilterCount) instead of rendering as a chip here.
            const searchInChips = !!(this.criteria.search && !this.searchQuerySlot);
            const hasFilters = searchInChips ||
                Object.values(this.criteria.filters).some(arr => arr.length > 0);

            if (!hasFilters) {
                appliedContainer.setAttribute('hidden', '');
                // Show auto-fill when no filters
                if (autoFillContainer) {
                    autoFillContainer.removeAttribute('hidden');
                }
                return;
            }

            appliedContainer.removeAttribute('hidden');
            // Hide auto-fill when filters are applied
            if (autoFillContainer) {
                autoFillContainer.setAttribute('hidden', '');
            }

            // Add search chip (skipped when routed to [data-filter-query])
            if (searchInChips) {
                const searchChip = this.createFilterChip('search', this.criteria.search, () => {
                    this.removeSearchFilter();
                });
                chipsContainer.appendChild(searchChip);
            }

            // Add chips for all dynamic filters
            for (const [filterName, values] of Object.entries(this.criteria.filters)) {
                values.forEach(value => {
                    const filterData = this.filterInputs[filterName];
                    const displayLabel = filterData?.labels?.[value.toLowerCase()] || value;
                    const chip = this.createFilterChip(filterName, value, () => {
                        this.removeFilterValue(filterName, value);
                    }, displayLabel);
                    chipsContainer.appendChild(chip);
                });
            }
        }

        updateFilterCount() {
            // Query slot — quoted keyword; empty when no search
            if (this.searchQuerySlot) {
                const q = this.criteria.search || '';
                this.searchQuerySlot.textContent = q ? '\u201C' + q + '\u201D' : '';
            }

            // Count slot resolution via data-filter-target linking
            const countSlot = this.targetId
                ? document.querySelector(
                    `[data-filter-count][data-filter-target="${this.targetId}"],`
                    + ` [data-filter-target="${this.targetId}"] [data-filter-count]`
                )
                : null;
            if (!countSlot || !this.targetContainer) return;

            // Count source priority:
            //   1. Server-provided: data-total-count on the target container
            //      (for SSR pages or JSON-AJAX developers)
            //   2. DOM enumeration: visible (non-filtered-out) items
            const totalAttr = this.targetContainer.getAttribute('data-total-count');
            if (totalAttr !== null && totalAttr !== '') {
                countSlot.textContent = parseInt(totalAttr, 10) || 0;
                return;
            }

            // Count from the cached item list (refreshed on init and after AJAX
            // injection) so transient UI like the no-results alert — which also
            // carries .nds-card — isn't counted as a result. `item.hidden` is
            // pagination-driven for non-current-page items; those are still matches.
            let visible = 0;
            for (const item of this.items) {
                if (!NDS.State.has(item, 'filtered-out')) visible++;
            }
            countSlot.textContent = visible;
        }

        createFilterChip(type, value, onRemove, displayLabel) {
            const chip = document.createElement('button');
            chip.className = `nds-chip ${this.chipClass || 'nds-primary nds-lg'}`;
            chip.setAttribute('type', 'button');
            chip.setAttribute('data-filter-type', type);
            chip.setAttribute('data-filter-value', value);

            const icon = document.createElement('i');
            icon.className = 'nds-icon nds-hgi-cancel-01';

            const label = document.createElement('span');
            label.className = 'nds-label';
            label.textContent = displayLabel || value;

            chip.appendChild(label);
            chip.appendChild(icon);

            chip.addEventListener('click', (e) => {
                e.preventDefault();
                onRemove();
            });

            return chip;
        }

        removeSearchFilter() {
            this.criteria.search = '';

            if (this.searchInputs.direct) {
                this.searchInputs.direct.input.value = '';
                this.updateClearButtonVisibility(
                    this.searchInputs.direct.input,
                    this.searchInputs.direct.clearBtn
                );
            }

            if (this.searchInputs.dropmenu) {
                this.searchInputs.dropmenu.input.value = '';
                this.updateClearButtonVisibility(
                    this.searchInputs.dropmenu.input,
                    this.searchInputs.dropmenu.clearBtn
                );
                this.updateApplyButtonLabel();
            }

            // In AJAX mode, resubmit form to get updated results
            if (this.isAjaxMode) {
                this.submitForm();
            } else {
                this.applyFilters();
            }
        }

        removeFilterValue(filterName, value) {
            const filterData = this.filterInputs[filterName];
            if (!filterData) return;

            filterData.inputs.forEach(input => {
                if (input.value.toLowerCase() === value.toLowerCase()) {
                    input.checked = false;
                }
            });

            this.updateFilterCriteria(filterName);
            this.updateApplyButtonLabel();

            // In AJAX mode, resubmit form to get updated results
            if (this.isAjaxMode) {
                this.submitForm();
            } else {
                this.applyFilters();
            }
        }

        setupFilterElements() {
            // queryAll already excludes elements inside the target container
            // (e.g. <span data-filter> markers on cards).
            const filterElements = this.queryAll('[data-filter]');

            filterElements.forEach(element => {
                const filterName = element.getAttribute('data-filter');
                const filterType = element.getAttribute('data-filter-type');

                if (filterName === 'search') {
                    this.setupSearchFilter(element);
                } else if (filterType === 'checkbox' || filterType === 'radio' || filterType === 'switch') {
                    // Check for explicit values via data-filter-values (array or object)
                    const staticValues = element.getAttribute('data-filter-values');
                    if (staticValues) {
                        const raw = JSON.parse(staticValues);
                        let values;
                        if (Array.isArray(raw)) {
                            values = raw;
                        } else {
                            // Object form: keys = values, values = labels
                            values = Object.keys(raw);
                            this.filterLabels[filterName] = raw;
                        }
                        this.setupDynamicFilter(element, filterName, filterType, values);
                    } else {
                        this.setupDynamicFilter(element, filterName, filterType);
                    }
                } else {
                    this.setupManualFilter(element, filterName);
                }
            });

            // Auto-detect direct search input (anywhere linked to this filter).
            // Merges what was previously two branches (inside filter, then external search-box).
            if (!this.searchInputs.direct) {
                const candidates = this.queryAll('input.nds-search-input, input[name="search"], input[type="search"]');

                for (const input of candidates) {
                    if (input.hasAttribute('data-filter-ignore') || input.closest('[data-filter-ignore]')) continue;
                    if (input.closest('.nds-dropmenu-menu')) continue;

                    const wrapper = input.closest('.nds-form-control') || input.parentElement;
                    const clearBtn = wrapper?.querySelector('.nds-clear, [aria-label*="مسح"], [aria-label*="clear"]');

                    this.searchInputs.direct = {
                        input: input,
                        clearBtn: clearBtn,
                        element: wrapper || input
                    };

                    this.setupDirectSearch(input, clearBtn);
                    break;
                }
            }
        }

        // ==============================================
        // SEARCH FILTER
        // ==============================================

        setupSearchFilter(element) {
            let searchInput;
            if (element.matches('input')) {
                searchInput = element;
            } else {
                searchInput = element.querySelector(
                    'input.nds-search-input, ' +
                    'input[name="search"], ' +
                    'input[type="search"], ' +
                    'input[type="text"]'
                );
            }

            if (!searchInput) {
                console.warn('NDS Filter: No search input found in search filter element', element);
                return;
            }

            const isInsideDropmenu = element.closest('.nds-dropmenu-menu') !== null;
            const searchContainer = element.matches('input') ? element.parentElement : element;
            const clearBtn = searchContainer.querySelector('.nds-clear, [aria-label*="مسح"], [aria-label*="clear"]');

            const searchRef = { input: searchInput, clearBtn: clearBtn, element: element };

            if (isInsideDropmenu) {
                this.searchInputs.dropmenu = searchRef;
                this.setupDropmenuSearch(searchInput, clearBtn);
            } else {
                this.searchInputs.direct = searchRef;
                this.setupDirectSearch(searchInput, clearBtn);
            }
        }

        setupDropmenuSearch(searchInput, clearBtn) {
            searchInput.addEventListener('input', () => {
                if (clearBtn) {
                    this.updateClearButtonVisibility(searchInput, clearBtn);
                }
                this.updateApplyButtonLabel();
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();

                    this.criteria.search = searchInput.value.trim().toLowerCase();
                    if (this.searchInputs.direct) {
                        this.searchInputs.direct.input.value = searchInput.value;
                        this.updateClearButtonVisibility(
                            this.searchInputs.direct.input,
                            this.searchInputs.direct.clearBtn
                        );
                    }

                    // In form mode, submit the form
                    if (this.isFormMode) {
                        this.submitForm();
                        return;
                    }

                    // Client-side mode: apply filters
                    this.applyFilters();
                }
            });

            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    searchInput.value = '';
                    this.updateClearButtonVisibility(searchInput, clearBtn);
                    this.updateApplyButtonLabel();
                });
            }
        }

        setupDirectSearch(searchInput, clearBtn) {
            const searchContainer = searchInput.closest('.nds-search-box, .nds-form-control')?.parentElement ||
                                   searchInput.closest('.nds-search-content')?.parentElement ||
                                   searchInput.parentElement;
            const searchBtn = searchContainer?.querySelector(
                'button.nds-search-btn, button[type="submit"], button:has(.nds-hgi-search-01)'
            );

            searchInput.addEventListener('input', () => {
                if (clearBtn) {
                    this.updateClearButtonVisibility(searchInput, clearBtn);
                }
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();

                    // Centralized logic: applyDirectSearch → applyFilters (handles both modes)
                    this.applyDirectSearch(searchInput);
                }
            });

            if (searchBtn) {
                searchBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.applyDirectSearch(searchInput);
                });
            }

            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    searchInput.value = '';
                    this.criteria.search = '';
                    this.updateClearButtonVisibility(searchInput, clearBtn);
                    if (this.searchInputs.dropmenu) {
                        this.searchInputs.dropmenu.input.value = '';
                        this.updateClearButtonVisibility(
                            this.searchInputs.dropmenu.input,
                            this.searchInputs.dropmenu.clearBtn
                        );
                        this.updateApplyButtonLabel();
                    }

                    // In AJAX mode, resubmit form to get updated results
                    if (this.isAjaxMode) {
                        this.submitForm();
                    } else {
                        this.applyFilters();
                    }
                });
            }
        }

        applyDirectSearch(searchInput) {
            this.criteria.search = searchInput.value.trim().toLowerCase();
            if (this.searchInputs.dropmenu) {
                this.searchInputs.dropmenu.input.value = searchInput.value;
                this.updateClearButtonVisibility(
                    this.searchInputs.dropmenu.input,
                    this.searchInputs.dropmenu.clearBtn
                );
                this.updateApplyButtonLabel();
            }

            // In form mode, submit the form directly
            if (this.isFormMode) {
                this.submitForm();
                return;
            }

            // Client-side mode: apply filters
            this.applyFilters();
        }

        /**
         * Submit the form (only called from user actions, not programmatically)
         */
        submitForm() {
            if (!this.submissionForm) return;

            // Dismiss any feedback in filter container
            if (NDS.Feedback) {
                NDS.Feedback.dismissAll(this.filterContainer);
            }

            // Trigger form submission on the actual form element
            if (this.submissionForm.requestSubmit) {
                this.submissionForm.requestSubmit();
            } else {
                this.submissionForm.submit();
            }
        }

        updateClearButtonVisibility(input, clearBtn) {
            if (!clearBtn) return;
            if (input.value.trim()) {
                clearBtn.hidden = false;
            } else {
                clearBtn.hidden = true;
            }
        }

        // ==============================================
        // DYNAMIC FILTER (AUTO-GENERATED)
        // ==============================================

        setupDynamicFilter(element, filterName, inputType, explicitValues = null) {
            // Generate filter inputs (may replace element with fieldset)
            const actualElement = this.generateFilterInputs(element, filterName, inputType, explicitValues) || element;

            // Setup the filter after generation
            this.setupManualFilter(actualElement, filterName);
        }

        setupManualFilter(element, filterName) {
            const inputs = element.querySelectorAll('input[type="checkbox"], input[type="radio"], .nds-switch-input');

            // Always set up the DOM observer, even with 0 inputs (handles cascading/async filters)
            if (!element._ndsFilterObserver) {
                element._ndsFilterObserver = true;
                NDS.onDOMAdd('input[type="checkbox"], input[type="radio"], .nds-switch-input', (nodes) => {
                    // Ignore nodes that already have listeners bound — they are
                    // being moved (portal open/close), not genuinely inserted.
                    const fresh = nodes.filter(n => element.contains(n) && !n._ndsFilterBound);
                    if (fresh.length > 0) {
                        this.setupManualFilter(element, filterName);
                        this.reapplyUrlParamsForFilter(filterName);
                    }
                });
            }

            if (inputs.length === 0) {
                return;
            }

            // Determine input type (switch inputs are checkboxes but treated specially)
            const firstInput = inputs[0];
            let inputType;
            if (firstInput.classList.contains('nds-switch-input')) {
                inputType = 'switch';
            } else {
                inputType = firstInput.type;
            }

            // Initialize criteria for this filter
            if (!this.criteria.filters[filterName]) {
                this.criteria.filters[filterName] = [];
            }

            // Get custom name from data-filter-name attribute if present
            const customName = element.getAttribute('data-filter-name');

            // Build value-to-label map (resolves display labels from associated <label> elements)
            const labels = {};
            inputs.forEach(input => {
                const container = input.closest('.nds-form-container');
                if (container) {
                    const labelEl = container.querySelector('.nds-form-header .nds-label');
                    if (labelEl) {
                        labels[input.value.toLowerCase()] = labelEl.textContent.trim();
                    }
                }
            });

            // Store reference
            this.filterInputs[filterName] = {
                inputs: inputs,
                type: inputType,
                element: element,
                customName: customName,  // Store custom name if provided
                labels: labels           // Store value-to-label map
            };

            inputs.forEach(input => {
                if (input._ndsFilterBound) return;
                input._ndsFilterBound = true;
                input.addEventListener('change', () => {
                    this.updateFilterCriteria(filterName);
                    this.updateApplyButtonLabel();
                });
            });
        }

        // ==============================================
        // AUTO-GENERATION
        // ==============================================

        collectFilterValues(filterName) {
            const values = new Set();
            const labelMap = {};

            this.items.forEach(card => {
                const filterElements = card.querySelectorAll(`[data-filter="${filterName}"]`);
                const itemHasFilter = card.getAttribute('data-filter') === filterName;

                if (filterElements.length > 0 || itemHasFilter) {
                    filterElements.forEach(el => {
                        const value = this.getFilterValue(el);
                        if (value) {
                            values.add(value);
                            // Auto-map label when data-filter-value provides a machine value
                            const machineValue = el.getAttribute('data-filter-value');
                            if (machineValue) {
                                labelMap[machineValue] = el.textContent.trim();
                            }
                        }
                    });
                    // Also check the item itself (Gap 4)
                    if (itemHasFilter) {
                        const value = this.getFilterValue(card);
                        if (value) {
                            values.add(value);
                            const machineValue = card.getAttribute('data-filter-value');
                            if (machineValue) {
                                labelMap[machineValue] = card.textContent.trim();
                            }
                        }
                    }
                } else if (filterName === 'tags') {
                    // Fallback for tags: traditional .nds-card-tags structure
                    const cardTags = card.querySelector('.nds-card-tags');
                    if (cardTags) {
                        const tagElements = cardTags.querySelectorAll('.nds-tag .nds-label');
                        tagElements.forEach(el => {
                            const value = el.textContent.trim();
                            if (value) {
                                values.add(value);
                            }
                        });
                    }
                }
            });

            // Store auto-collected labels for use by generateFilterInputs
            if (Object.keys(labelMap).length > 0) {
                this.filterLabels[filterName] = labelMap;
            }

            return Array.from(values).sort((a, b) => a.localeCompare(b, 'ar'));
        }

        generateFilterInputs(container, filterName, inputType, explicitValues = null) {
            // Use explicit values if provided, otherwise collect from cards
            const values = explicitValues || this.collectFilterValues(filterName);

            if (values.length === 0) {
                if (!explicitValues) {
                    console.warn(`NDS Filter: No values found for filter "${filterName}". Use data-filter-values or populateFilter() to provide values.`);
                }
                return;
            }

            const legendText = container.getAttribute('data-filter-legend') || '';
            const variant = container.getAttribute('data-filter-variant') || '';

            // Create the wrapper structure
            let wrapper = container;
            let fieldset;

            // Check if container should get dropmenu-group spacing
            const isInDropmenu = container.closest('.nds-dropmenu-menu') !== null;

            if (container.tagName === 'FIELDSET') {
                fieldset = container;
                // Add nds-dropmenu-group if in dropmenu and not already has it
                if (isInDropmenu && !fieldset.classList.contains('nds-dropmenu-group')) {
                    fieldset.classList.add('nds-dropmenu-group');
                }
                // Clear existing content
                const existingLegend = fieldset.querySelector('legend');
                fieldset.innerHTML = '';
                if (existingLegend || legendText) {
                    const legend = document.createElement('legend');
                    legend.className = 'nds-label';
                    legend.textContent = legendText || (existingLegend ? existingLegend.textContent : '');
                    fieldset.appendChild(legend);
                }
            } else if (values.length > 1) {
                // Multiple values: convert to fieldset for semantic grouping
                fieldset = document.createElement('fieldset');
                // Copy classes from container
                fieldset.className = container.className;
                // Copy data attributes
                Array.from(container.attributes).forEach(attr => {
                    if (attr.name !== 'class' && attr.name !== 'id') {
                        fieldset.setAttribute(attr.name, attr.value);
                    }
                });
                if (container.id) fieldset.id = container.id;
                if (isInDropmenu && !fieldset.classList.contains('nds-dropmenu-group')) {
                    fieldset.classList.add('nds-dropmenu-group');
                }
                // Add form classes since placeholder only has dropmenu classes
                fieldset.classList.add('nds-form-group');
                if (legendText) {
                    const legend = document.createElement('legend');
                    legend.className = 'nds-label';
                    legend.textContent = legendText;
                    fieldset.appendChild(legend);
                }
                container.replaceWith(fieldset);
                wrapper = fieldset;
            } else {
                // Single value: keep as div, treat as dropmenu item
                fieldset = container;
                if (isInDropmenu) {
                    fieldset.classList.remove('nds-dropmenu-group');
                    if (!fieldset.classList.contains('nds-dropmenu-item')) {
                        fieldset.classList.add('nds-dropmenu-item');
                    }
                }
                container.innerHTML = '';
            }

            // Add group class for groups (multiple inputs) — match input type
            if (values.length > 1) {
                const groupClass = inputType === 'radio'
                    ? 'nds-radio-group'
                    : inputType === 'switch'
                        ? 'nds-switch-group'
                        : 'nds-check-group';
                if (!fieldset.classList.contains(groupClass)) {
                    fieldset.classList.add(groupClass);
                }
            }

            // Add data-no-auto-close if in dropmenu
            if (isInDropmenu) {
                fieldset.setAttribute('data-no-auto-close', '');
            }

            // Determine input class and structure based on type
            const groupName = `filter-${filterName}-${NDS.uniqueId()}`;
            const labelMap = this.filterLabels[filterName] || {};

            // Generate input for each unique value
            values.forEach((value, index) => {
                const id = `${groupName}-${index}`;

                const formContainer = document.createElement('div');
                formContainer.className = inputType === 'switch'
                    ? 'nds-form-container nds-switch-container'
                    : inputType === 'radio'
                        ? 'nds-form-container nds-radio-container'
                        : 'nds-form-container nds-check-container';

                const formHeader = document.createElement('div');
                formHeader.className = 'nds-form-header';

                const label = document.createElement('label');
                label.setAttribute('for', id);

                const labelSpan = document.createElement('span');
                labelSpan.className = 'nds-label';
                labelSpan.textContent = labelMap[value] || value;

                label.appendChild(labelSpan);
                formHeader.appendChild(label);

                const formControl = document.createElement('div');
                formControl.className = 'nds-form-control';

                if (inputType === 'switch') {
                    // Create switch structure
                    const switchWrapper = document.createElement('div');
                    switchWrapper.className = 'nds-switch';
                    if (variant) {
                        switchWrapper.classList.add(variant);
                    }

                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.id = id;
                    input.name = `filter-${filterName}`;
                    input.value = value;
                    input.className = 'nds-switch-input';

                    const track = document.createElement('div');
                    track.className = 'nds-switch-track';

                    const thumb = document.createElement('div');
                    thumb.className = 'nds-switch-thumb';

                    track.appendChild(thumb);
                    switchWrapper.appendChild(input);
                    switchWrapper.appendChild(track);
                    formControl.appendChild(switchWrapper);
                } else {
                    // Create checkbox or radio
                    const inputClass = inputType === 'radio' ? 'nds-radio' : 'nds-check';
                    const input = document.createElement('input');
                    input.type = inputType;
                    input.id = id;
                    input.name = inputType === 'radio' ? groupName : `filter-${filterName}`;
                    input.value = value;
                    input.className = inputClass;
                    if (variant) {
                        input.classList.add(variant);
                    }

                    formControl.appendChild(input);
                }

                formContainer.appendChild(formHeader);
                formContainer.appendChild(formControl);
                fieldset.appendChild(formContainer);
            });

            return fieldset;
        }

        updateFilterCriteria(filterName) {
            const filterData = this.filterInputs[filterName];
            if (!filterData) return;

            this.criteria.filters[filterName] = Array.from(filterData.inputs)
                .filter(input => input.checked && input.value !== '')
                .map(input => input.value);
        }

        // ==============================================
        // FILTER APPLICATION
        // ==============================================

        applyFilters() {
            // Dismiss any feedback in filter container
            if (NDS.Feedback) {
                NDS.Feedback.dismissAll(this.filterContainer);
            }

            // In form mode, just update state (don't submit form programmatically)
            // Form submission only happens from explicit user actions via submitForm()
            if (this.isFormMode) {
                this.updateHiddenInputs();
                this.updateUrlParams();
                this.updateFilterButtonLabel();
                this.updateAppliedChips();
                this.dispatchFilterEvent();
                return;
            }

            // Check if there are any active criteria
            const hasSearch = this.criteria.search && this.criteria.search.trim() !== '';
            const hasFilters = Object.values(this.criteria.filters).some(arr => arr.length > 0);
            const hasCriteria = hasSearch || hasFilters;

            // If no criteria, show all items and update UI
            if (!hasCriteria) {
                // Remove any filter-related attributes/classes from all items
                this.items.forEach(item => {
                    item.removeAttribute('data-filtered');
                    NDS.State.remove(item, 'filtered-out');
                    item.style.display = '';
                });

                // Update hidden inputs if in form mode
                if (this.isFormMode) {
                    this.clearHiddenInputs();
                }

                // Dismiss no-results alert if exists
                this.dismissNoResultsAlert();

                this.updateUrlParams();
                this.updateFilterButtonLabel();
                this.updateAppliedChips();
                this.updatePagination();

                // Always dispatch change event, even when clearing all criteria
                this.dispatchFilterEvent(this.items.length);
                return;
            }

            if (this.targetContainer) this.targetContainer.classList.add('nds-loading');

            let visibleCount = 0;

            this.items.forEach(item => {
                const isVisible = this.itemMatchesCriteria(item);

                if (isVisible) {
                    this.showItem(item);
                    visibleCount++;
                } else {
                    this.hideItem(item);
                }
            });

            this.dispatchFilterEvent(visibleCount);
            this.updatePagination();
            this.updateNoResultsAlert(visibleCount);
            this.updateUrlParams();
            this.updateFilterButtonLabel();
            this.updateAppliedChips();

            // Update hidden inputs if in form mode
            if (this.isFormMode) {
                this.updateHiddenInputs();
            }

            this._clearLoadingDebounced();
        }

        updateNoResultsAlert(visibleCount) {
            if (!this.targetContainer) return;

            if (visibleCount === 0) {
                this.showNoResultsAlert();
            } else {
                this.dismissNoResultsAlert();
            }
        }

        showNoResultsAlert() {
            const alertId = `nds-filter-no-results-${this.targetId}`;
            if (document.getElementById(alertId) || !NDS.Alert) return;

            const isArabic = NDS.isArabic;
            const self = this;

            // If the target container is a <table>/<tbody>, wrap the alert in a
            // full-width <tr><td colspan=N> so it spans the table instead of
            // collapsing into a single cell.
            let insertTarget = this.targetContainer;
            const tag = this.targetContainer.tagName;
            if (tag === 'TBODY' || tag === 'TABLE') {
                const tbody = tag === 'TBODY'
                    ? this.targetContainer
                    : (this.targetContainer.querySelector('tbody') || this.targetContainer);
                const table = tbody.closest('table') || tbody;
                const headerRow = table.querySelector('tr');
                const colspan = headerRow ? headerRow.querySelectorAll('th, td').length : 1;

                const row = document.createElement('tr');
                row.className = 'nds-filter-no-results-row';
                const cell = document.createElement('td');
                if (colspan > 1) cell.setAttribute('colspan', colspan);
                row.appendChild(cell);
                tbody.appendChild(row);
                insertTarget = cell;
            }

            NDS.Alert.create({
                variant: 'warning',
                description: isArabic ? 'لا توجد نتائج لمعايير التصفية الحالية' : 'No result for current filter criteria',
                target: insertTarget,
                title: isArabic ? 'لا توجد نتائج' : 'No Result',
                id: alertId,
                closable: false,
                actions: [
                    {
                        label: isArabic ? 'مسح التصفية' : 'Clear Filter',
                        variant: 'neutral',
                        onClick: () => {
                            self.reset();
                        }
                    }
                ]
            });
        }

        dismissNoResultsAlert() {
            const alertId = `nds-filter-no-results-${this.targetId}`;
            const existingAlert = document.getElementById(alertId);
            if (!existingAlert) return;

            const tableRow = existingAlert.closest('tr.nds-filter-no-results-row');
            if (NDS.Alert) NDS.Alert.dismiss(existingAlert);
            if (tableRow && tableRow.isConnected) tableRow.remove();
        }

        itemMatchesCriteria(item) {
            // Check search criteria
            if (this.criteria.search && !this.itemMatchesSearch(item)) {
                return false;
            }

            // Check all dynamic filter criteria
            for (const [filterName, selectedValues] of Object.entries(this.criteria.filters)) {
                if (selectedValues.length > 0 && !this.itemMatchesFilter(item, filterName, selectedValues)) {
                    return false;
                }
            }

            return true;
        }

        itemMatchesSearch(item) {
            const searchText = this.criteria.search;
            if (!searchText) return true;

            // Try .nds-card-content first, fall back to full item text
            const textSource = item.querySelector('.nds-card-content') || item;
            return textSource.textContent.toLowerCase().includes(searchText);
        }

        itemMatchesFilter(item, filterName, selectedValues) {
            if (selectedValues.length === 0) return true;

            // Look for elements with data-filter attribute
            const filterElements = item.querySelectorAll(`[data-filter="${filterName}"]`);
            const itemHasFilter = item.getAttribute('data-filter') === filterName;

            let itemValues = [];

            if (filterElements.length > 0 || itemHasFilter) {
                itemValues = Array.from(filterElements).map(el => this.getFilterValue(el).toLowerCase());
                if (itemHasFilter) {
                    itemValues.push(this.getFilterValue(item).toLowerCase());
                }
            } else if (filterName === 'tags') {
                // Fallback for tags: traditional .nds-card-tags structure
                const cardTags = item.querySelector('.nds-card-tags');
                if (!cardTags) return false;

                const tagElements = cardTags.querySelectorAll('.nds-tag .nds-label');
                itemValues = Array.from(tagElements).map(tag => tag.textContent.trim().toLowerCase());
            }

            if (itemValues.length === 0) return false;

            // Check filter type for logic (radio = AND, checkbox = OR)
            const filterData = this.filterInputs[filterName];
            if (filterData && filterData.type === 'radio') {
                // Radio: item must match the single selected value
                return selectedValues.some(val => itemValues.includes(val.toLowerCase()));
            } else {
                // Checkbox: item must match ANY of the selected values (OR logic)
                return selectedValues.some(val => itemValues.includes(val.toLowerCase()));
            }
        }

        // ==============================================
        // ITEM VISIBILITY
        // ==============================================

        showItem(item) {
            item.style.display = '';
            item.removeAttribute('data-filtered');
            NDS.State.remove(item, 'filtered-out');
        }

        hideItem(item) {
            item.style.display = 'none';
            item.setAttribute('data-filtered', 'true');
            NDS.State.add(item, 'filtered-out');
        }

        // ==============================================
        // RESET FUNCTIONALITY
        // ==============================================

        setupResetButton() {
            const resetBtn = this.filterContainer.querySelector('[class*="refresh"], button:has(.nds-hgi-refresh)');
            const resetByIcon = this.filterContainer.querySelector('.nds-hgi-refresh-ccw-02, .nds-hgi-refresh');
            const resetButton = resetBtn || (resetByIcon ? resetByIcon.closest('button') : null);

            if (resetButton) {
                resetButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.reset();
                });
            }
        }

        clearDropmenuFilters() {
            if (this.searchInputs.dropmenu) {
                this.searchInputs.dropmenu.input.value = '';
                if (this.searchInputs.dropmenu.clearBtn) {
                    this.searchInputs.dropmenu.clearBtn.hidden = true;
                }
            }

            // Clear all filter inputs
            for (const [filterName, filterData] of Object.entries(this.filterInputs)) {
                filterData.inputs.forEach(input => {
                    input.checked = false;
                });
                this.criteria.filters[filterName] = [];
            }

            this.updateApplyButtonLabel();
            this.dispatchClearEvent();

            // In AJAX mode, resubmit to re-fetch results with cleared filters
            if (this.isAjaxMode) {
                this.submitForm();
            } else {
                this.applyFilters();
            }
        }

        clear() {
            if (this.searchInputs.direct) {
                this.searchInputs.direct.input.value = '';
                if (this.searchInputs.direct.clearBtn) {
                    this.searchInputs.direct.clearBtn.hidden = true;
                }
            }

            if (this.searchInputs.dropmenu) {
                this.searchInputs.dropmenu.input.value = '';
                if (this.searchInputs.dropmenu.clearBtn) {
                    this.searchInputs.dropmenu.clearBtn.hidden = true;
                }
            }

            this.criteria.search = '';

            // Clear all filter inputs
            for (const [filterName, filterData] of Object.entries(this.filterInputs)) {
                filterData.inputs.forEach(input => {
                    input.checked = false;
                });
                this.criteria.filters[filterName] = [];
            }

            // Clear sort and restore original DOM order (NDS.Sort handles snapshot + restore + a11y)
            if (this.sort && this.sort.getState().key) {
                this.sort.reset();
            }

            // Clear hidden inputs and form state if in form mode
            if (this.isFormMode) {
                this.clearHiddenInputs();
                NDS.State.clear(this.filterContainer);
                NDS.Status.clear(this.filterContainer);
            }

            this.updateApplyButtonLabel();
            this.dispatchClearEvent();
        }

        reset() {
            this.clear();
            this.items.forEach(item => this.showItem(item));

            this.dismissNoResultsAlert();

            // Dismiss any feedback in filter container
            if (NDS.Feedback) {
                NDS.Feedback.dismissAll(this.filterContainer);
            }

            this.dispatchResetEvent();

            // In AJAX mode, resubmit to re-fetch results with cleared criteria
            if (this.isAjaxMode) {
                this.submitForm();
                return;
            }

            this.updateUrlParams();
            this.updatePagination();
            this.updateFilterButtonLabel();
            this.updateAppliedChips();
        }

        // ==============================================
        // EVENTS
        // ==============================================

        dispatchFilterEvent(visibleCount) {
            const hasCount = arguments.length > 0;
            const event = new CustomEvent('nds:filter:change', {
                detail: {
                    filter: this,
                    criteria: { ...this.criteria },
                    totalItems: hasCount ? this.items.length : null,
                    visibleItems: hasCount ? visibleCount : null,
                    hiddenItems: hasCount ? this.items.length - visibleCount : null
                },
                bubbles: true
            });

            this.filterContainer.dispatchEvent(event);
        }

        dispatchResetEvent() {
            const event = new CustomEvent('nds:filter:reset', {
                detail: {
                    filter: this,
                    totalItems: this.items.length
                },
                bubbles: true
            });

            this.filterContainer.dispatchEvent(event);
        }

        dispatchClearEvent() {
            const event = new CustomEvent('nds:filter:clear', {
                detail: {
                    filter: this
                },
                bubbles: true
            });

            this.filterContainer.dispatchEvent(event);
        }

        // ==============================================
        // PAGINATION INTEGRATION
        // ==============================================

        updatePagination() {
            if (!this.targetContainer) return;

            if (NDS.Pagination && NDS.Pagination.refresh) {
                // Walk up to find the .nds-paged-content wrapper (pagination expects this as the container)
                const pagedContent = this.targetContainer.closest('.nds-paged-content') ||
                                     this.targetContainer.parentElement?.closest('.nds-paged-content');
                const container = pagedContent || this.targetContainer;
                const paginationNav = container.parentElement?.querySelector('.nds-pagination[data-auto-pagination]');
                if (paginationNav) {
                    setTimeout(() => {
                        NDS.Pagination.refresh(container);
                    }, 50);
                }
            }
        }

        // ==============================================
        // PUBLIC API
        // ==============================================

        getVisibleItems() {
            return this.items.filter(item => !item.hasAttribute('data-filtered'));
        }

        getHiddenItems() {
            return this.items.filter(item => item.hasAttribute('data-filtered'));
        }

        getCriteria() {
            return { ...this.criteria, filters: { ...this.criteria.filters } };
        }

        /**
         * Refresh items list and regenerate filters
         */
        refresh() {
            // Re-resolve targetContainer in case it was null at init or replaced
            if (this.targetId) {
                this.targetContainer = document.getElementById(this.targetId);
            }

            // Update items list
            this.items = this.targetContainer
                ? Array.from(this.targetContainer.querySelectorAll(this.getItemSelector()))
                : [];

            // Regenerate auto-scanned filters only (skip data-filter-values — those have their own source)
            const filterElements = this.queryAll('[data-filter-type]');
            filterElements.forEach(element => {
                if (element.hasAttribute('data-filter-values')) return;

                const filterName = element.getAttribute('data-filter');
                const filterType = element.getAttribute('data-filter-type');

                // Clear existing inputs first
                element.innerHTML = '';

                // Regenerate (may replace element with fieldset)
                const actualEl = this.generateFilterInputs(element, filterName, filterType) || element;
                this.setupManualFilter(actualEl, filterName);
            });

            // Reapply current filters
            this.applyFilters();
        }

        setSearchValue(value) {
            this.criteria.search = value.trim().toLowerCase();

            if (this.searchInputs.direct) {
                this.searchInputs.direct.input.value = value;
                this.updateClearButtonVisibility(
                    this.searchInputs.direct.input,
                    this.searchInputs.direct.clearBtn
                );
            }

            if (this.searchInputs.dropmenu) {
                this.searchInputs.dropmenu.input.value = value;
                this.updateClearButtonVisibility(
                    this.searchInputs.dropmenu.input,
                    this.searchInputs.dropmenu.clearBtn
                );
            }

            this.updateApplyButtonLabel();
            this.applyFilters();
        }

        setFilterValues(filterName, values) {
            const filterData = this.filterInputs[filterName];
            if (!filterData) return;

            const valuesLower = values.map(v => v.toLowerCase());
            filterData.inputs.forEach(input => {
                input.checked = valuesLower.includes(input.value.toLowerCase());
            });

            this.updateFilterCriteria(filterName);
            this.updateApplyButtonLabel();
            this.applyFilters();
        }

        populateFilter(filterName, values, inputType = null) {
            // Find the container element for this filter
            const container = this.filterContainer.querySelector(`[data-filter="${filterName}"]`);
            if (!container) return;

            // Determine input type from data attribute or parameter
            const type = inputType || container.getAttribute('data-filter-type') || 'checkbox';

            // Generate inputs with explicit values
            const actualElement = this.generateFilterInputs(container, filterName, type, values) || container;

            // Re-setup the filter listeners
            this.setupManualFilter(actualElement, filterName);
        }

        // Legacy API for backward compatibility
        setSelectedTags(tags) {
            this.setFilterValues('tags', tags);
        }

        destroy() {
            this._ac.abort();
            this.items.forEach(item => this.showItem(item));
            this.filterContainer.removeAttribute('data-nds-filter-initialized');
        }
    }

    // ==============================================
    // AUTO-INITIALIZATION
    // ==============================================

    function initializeFilters() {
        const filterContainers = document.querySelectorAll('.nds-filter');

        filterContainers.forEach(container => {
            if (container.hasAttribute('data-nds-filter-initialized')) {
                return;
            }

            if (container.closest('code, .code-example')) {
                return;
            }

            const filterInstance = new NDSFilter(container);
            container.ndsFilter = filterInstance;
            container.setAttribute('data-nds-filter-initialized', 'true');
            container.dispatchEvent(new CustomEvent('nds:filter:ready', {
                detail: filterInstance,
                bubbles: true
            }));
        });
    }

    function reinitializeFilters() {
        initializeFilters();
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    if (typeof window !== 'undefined') {
        NDS.Filter = {
            init: initializeFilters,
            reinit: reinitializeFilters,
            create: (container) => new NDSFilter(container),

            getInstance: (container) => {
                if (typeof container === 'string') {
                    container = document.querySelector(container);
                }
                return container?.ndsFilter || null;
            },

            getByTarget: (targetId) => {
                const filterContainer = document.querySelector(`.nds-filter[data-filter-target="${targetId}"]`);
                return filterContainer?.ndsFilter || null;
            },

            /**
             * Execute callback when a filter is ready, handling the race condition
             * where the filter may already be initialized before the listener is added.
             * @param {string|Element} container - Selector or element
             * @param {Function} callback - Receives the filter instance
             */
            whenReady: (container, callback) => {
                if (typeof container === 'string') {
                    container = document.querySelector(container);
                }
                if (!container) return;

                // Already initialized — call immediately
                if (container.ndsFilter) {
                    callback(container.ndsFilter);
                    return;
                }

                // Not yet — wait for the event
                container.addEventListener('nds:filter:ready', (e) => {
                    callback(e.detail);
                }, { once: true });
            }
        };
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSFilter;
    }

    // Note: Initialization handled by nds-loader.js unified system
})();

/**
 * ==============================================
 * USAGE EXAMPLES
 * ==============================================
 *
 * BASIC STRUCTURE
 * ---------------
 * <div class="nds-filter" data-filter-target="cardList">
 *     <div class="nds-dropmenu">
 *         <button class="nds-btn nds-neutral nds-dropmenu-trigger">
 *             <span class="nds-label">Filter</span>
 *         </button>
 *         <div class="nds-dropmenu-menu">
 *             <!-- Filter content here -->
 *             <button data-filter-action="apply">Apply</button>
 *         </div>
 *     </div>
 * </div>
 *
 * MARKING FILTERABLE CONTENT IN CARDS
 * ------------------------------------
 * Add data-filter="[name]" to any element inside cards:
 *
 * <div id="cardList">
 *     <div class="nds-card">
 *         <h3>John Doe</h3>
 *         <span data-filter="role">Manager</span>
 *         <span data-filter="department">Engineering</span>
 *         <span data-filter="tags">Active</span>
 *     </div>
 * </div>
 *
 * AUTO-GENERATE FILTER CHECKBOXES
 * --------------------------------
 * Use data-filter-type="checkbox" for multiple selection (OR logic):
 *
 * <div class="nds-dropmenu-menu">
 *     <div data-filter="role"
 *          data-filter-type="checkbox"
 *          data-filter-legend="Filter by Role">
 *     </div>
 *     <div data-filter="department"
 *          data-filter-type="checkbox"
 *          data-filter-legend="Filter by Department">
 *     </div>
 * </div>
 *
 * AUTO-GENERATE FILTER RADIO BUTTONS
 * -----------------------------------
 * Use data-filter-type="radio" for single selection:
 *
 * <div class="nds-dropmenu-menu">
 *     <div data-filter="status"
 *          data-filter-type="radio"
 *          data-filter-legend="Filter by Status">
 *     </div>
 * </div>
 *
 * AUTO-GENERATE FILTER SWITCHES
 * ------------------------------
 * Use data-filter-type="switch" for toggle switches (OR logic):
 *
 * <div class="nds-dropmenu-menu">
 *     <div data-filter="features"
 *          data-filter-type="switch"
 *          data-filter-legend="Filter by Features">
 *     </div>
 * </div>
 *
 * COMPLETE EXAMPLE
 * -----------------
 * <div class="nds-filter" data-filter-target="employeeList">
 *     <!-- Search -->
 *     <div class="nds-search-box">
 *         <input type="text" class="nds-search-input" placeholder="Search...">
 *     </div>
 *
 *     <!-- Filter Dropdown -->
 *     <div class="nds-dropmenu">
 *         <button class="nds-btn nds-neutral nds-dropmenu-trigger">
 *             <span class="nds-label">تصفية</span>
 *         </button>
 *         <div class="nds-dropmenu-menu" style="min-width: 300px;">
 *             <!-- Auto-generated role filter (checkbox) -->
 *             <div data-filter="role"
 *                  data-filter-type="checkbox"
 *                  data-filter-legend="الوظيفة">
 *             </div>
 *
 *             <!-- Auto-generated department filter (radio) -->
 *             <div data-filter="department"
 *                  data-filter-type="radio"
 *                  data-filter-legend="القسم">
 *             </div>
 *
 *             <hr class="nds-divider">
 *             <div class="nds-dropmenu-action nds-grid">
 *                 <button class="nds-btn nds-secondary" data-filter-action="clear">
 *                     <span class="nds-label">إعادة تعيين</span>
 *                 </button>
 *                 <button class="nds-btn nds-primary" data-filter-action="apply">
 *                     <span class="nds-label">تصفية</span>
 *                 </button>
 *             </div>
 *         </div>
 *     </div>
 *
 *     <!-- Applied filter chips -->
 *     <div class="nds-filter-applied" hidden></div>
 * </div>
 *
 * <!-- Cards with filterable data -->
 * <div id="employeeList">
 *     <div class="nds-card">
 *         <div class="nds-card-content">
 *             <h3>أحمد محمد</h3>
 *             <span class="nds-tag" data-filter="role">مدير</span>
 *             <span class="nds-badge" data-filter="department">الهندسة</span>
 *         </div>
 *     </div>
 *     <div class="nds-card">
 *         <div class="nds-card-content">
 *             <h3>سارة أحمد</h3>
 *             <span class="nds-tag" data-filter="role">مطور</span>
 *             <span class="nds-badge" data-filter="department">التسويق</span>
 *         </div>
 *     </div>
 * </div>
 *
 * OPTIONAL ATTRIBUTES
 * --------------------
 * data-filter-legend="Title"     - Sets the fieldset legend text
 * data-filter-variant="nds-..."  - Adds class to generated inputs
 *
 * URL PARAMETERS
 * ---------------
 * Filters are automatically synced to URL:
 * ?search=term&role=manager,developer&department=engineering
 *
 * JAVASCRIPT API
 * ---------------
 * const filter = NDSFilter.getByTarget('employeeList');
 *
 * // Set filter values programmatically
 * filter.setFilterValues('role', ['Manager', 'Developer']);
 * filter.setFilterValues('department', ['Engineering']);
 * filter.setSearchValue('john');
 *
 * // Get current criteria
 * const criteria = filter.getCriteria();
 * // Returns: { search: '', filters: { role: [], department: [] } }
 *
 * // Reset all filters
 * filter.reset();
 *
 * // Listen for changes
 * document.addEventListener('nds:filter:change', (e) => {
 *     console.log(e.detail.criteria);
 *     console.log(e.detail.visibleItems);
 * });
 *
 * AJAX FORM SUBMISSION
 * ---------------------
 * Add data-filter-submit and data-ajax to use AJAX instead of page navigation:
 *
 * <form class="nds-filter" data-filter-target="results"
 *       data-filter-submit data-ajax
 *       method="GET" action="https://api.example.com/search">
 *     <div class="nds-search-box" data-url="https://api.example.com/search"
 *          data-name="Title" data-query-param="searchKeyword">
 *         <input type="text" class="nds-search-input" name="search">
 *     </div>
 *     <div class="nds-dropmenu">
 *         <button class="nds-btn nds-neutral nds-dropmenu-trigger">
 *             <span class="nds-label">Filter</span>
 *         </button>
 *         <div class="nds-dropmenu-menu">
 *             <fieldset data-filter="category">
 *                 <legend class="nds-label">Category</legend>
 *                 <input type="radio" name="category" value="" checked> All
 *                 <input type="radio" name="category" value="news"> News
 *             </fieldset>
 *             <button data-filter-action="apply">Apply</button>
 *         </div>
 *     </div>
 *     <div class="nds-filter-applied" hidden></div>
 * </form>
 *
 * <div id="results"></div>
 *
 * RESPONSE HANDLING:
 * - HTML responses are auto-injected into the target container
 * - JSON responses dispatch the raw data via event (developer handles rendering)
 *
 * // Listen for AJAX responses
 * document.querySelector('.nds-filter').addEventListener('nds:filterFormComplete', (e) => {
 *     const { success, isJson, data, html, form } = e.detail;
 *
 *     if (isJson) {
 *         // JSON response — render data yourself
 *         const container = document.getElementById('results');
 *         container.innerHTML = '';
 *         data.Records.forEach(item => {
 *             const card = document.createElement('div');
 *             card.className = 'nds-card';
 *             card.innerHTML = `<h3>${item.Title}</h3><p>${item.Description}</p>`;
 *             container.appendChild(card);
 *         });
 *     }
 *     // HTML responses are already injected into the target container
 * });
 *
 * AJAX EVENTS:
 * - nds:filterFormSubmit  — Before any form submission
 * - nds:filterFormAjax    — Before AJAX request (cancelable)
 * - nds:filterFormComplete — AJAX response received { success, isJson, data?, html?, form }
 * - nds:filterFormError   — AJAX error { error, form }
 */
