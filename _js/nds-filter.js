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
                ? Array.from(this.targetContainer.querySelectorAll('.nds-card'))
                : [];

            // Filter criteria storage - dynamic structure
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

            // Form submission mode detection
            this.isFormMode = filterContainer.tagName === 'FORM' &&
                              filterContainer.hasAttribute('data-filter-submit');
            this.isAjaxMode = this.isFormMode && filterContainer.hasAttribute('data-ajax');

            // Hidden inputs container for form mode
            this.hiddenInputsContainer = null;

            this.init();
        }

        init() {
            this.setupFilterElements();
            this.setupResetButton();
            this.setupActionButtons();
            this.setupChipStyle();
            this.applyUrlParams();

            // Setup form submission mode
            if (this.isFormMode) {
                this.setupFormSubmission();
            }
        }

        setupChipStyle() {
            // Get chip classes from data-chip-class attribute on .nds-filter-applied
            const appliedContainer = this.filterContainer.querySelector('.nds-filter-applied');
            const chipClass = appliedContainer?.getAttribute('data-chip-class') || 'nds-primary nds-lg';
            this.chipClass = chipClass;
        }

        // ==============================================
        // FORM SUBMISSION MODE
        // ==============================================

        /**
         * Setup form submission handlers
         */
        setupFormSubmission() {
            // Create hidden inputs container
            this.hiddenInputsContainer = document.createElement('div');
            this.hiddenInputsContainer.className = 'nds-filter-hidden-inputs';
            this.hiddenInputsContainer.style.display = 'none';
            this.filterContainer.appendChild(this.hiddenInputsContainer);

            // Handle form submission
            this.filterContainer.addEventListener('submit', (e) => {
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
            // Validate form if NDS.Forms is available
            if (window.NDS && window.NDS.Forms && window.NDS.Forms.validateForm) {
                const result = NDS.Forms.validateForm(this.filterContainer, {
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
            }

            // Dispatch preventable event
            const submitEvent = new CustomEvent('nds:filterFormSubmit', {
                detail: {
                    criteria: this.criteria,
                    form: this.filterContainer
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
            this.filterContainer.setAttribute('data-state', 'submitting');

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

            // Dispatch preventable AJAX submit event
            const ajaxEvent = new CustomEvent('nds:filterFormAjax', {
                detail: {
                    criteria: this.criteria,
                    form: this.filterContainer,
                    hiddenInputsContainer: this.hiddenInputsContainer
                },
                cancelable: true
            });

            const shouldContinue = this.filterContainer.dispatchEvent(ajaxEvent);

            if (!shouldContinue) {
                return;
            }

            // Set submitting state
            this.filterContainer.setAttribute('data-state', 'submitting');
            this.filterContainer.removeAttribute('data-status');

            // Add loading class to target container (similar to client-side filter)
            if (this.targetContainer) {
                this.targetContainer.classList.add('nds-loading');
            }

            // Build request URL and options
            const method = this.filterContainer.method.toUpperCase() || 'GET';
            let action = this.filterContainer.action || window.location.href;

            // Handle # or empty action - use current page URL without hash
            if (!action || action === '#' || action.endsWith('#')) {
                action = window.location.origin + window.location.pathname;
            }

            let url = action;
            let options = {
                method: method,
                headers: {}
            };

            // Collect form data
            const formData = new FormData(this.filterContainer);

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
                                this.items = Array.from(this.targetContainer.querySelectorAll('.nds-card'));

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
                    this.filterContainer.setAttribute('data-status', 'success');
                    this.filterContainer.removeAttribute('data-state');

                    // Update UI elements
                    this.updateUrlParams();
                    this.updateFilterButtonLabel();
                    this.updateAppliedChips();

                    // Dispatch complete event
                    this.filterContainer.dispatchEvent(new CustomEvent('nds:filterFormComplete', {
                        detail: eventDetail
                    }));

                    // Clear success state after 3 seconds
                    setTimeout(() => {
                        this.filterContainer.removeAttribute('data-status');
                    }, 3000);
                })
                .catch(error => {
                    console.error('Filter AJAX submission failed:', error);

                    // Remove loading class from target container
                    if (this.targetContainer) {
                        this.targetContainer.classList.remove('nds-loading');
                    }

                    // Set error state
                    this.filterContainer.setAttribute('data-status', 'error');
                    this.filterContainer.removeAttribute('data-state');

                    // Dispatch error event
                    this.filterContainer.dispatchEvent(new CustomEvent('nds:filterFormError', {
                        detail: {
                            error: error.message,
                            form: this.filterContainer
                        }
                    }));

                    // Clear error state after 5 seconds
                    setTimeout(() => {
                        this.filterContainer.removeAttribute('data-status');
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

            // Get the custom search param name
            const searchParamName = this.getSearchInputName();

            // Apply search param (try custom name first, then fallback to 'search')
            let searchParam = params.get(searchParamName);
            if (!searchParam && searchParamName !== 'search') {
                // Fallback to 'search' for backward compatibility
                searchParam = params.get('search');
            }

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

            // Apply dynamic filter params
            for (const [key, value] of params.entries()) {
                if (key === searchParamName || key === 'search') continue;

                // Check if we have inputs for this filter
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

            const filterData = this.filterInputs[filterName];
            if (!filterData) return;

            const values = value.split(',').map(v => this.sanitizeInput(v).trim());

            filterData.inputs.forEach(input => {
                if (values.some(v => v.toLowerCase() === input.value.toLowerCase())) {
                    input.checked = true;
                }
            });

            this.updateFilterCriteria(filterName);

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

            // Managed param keys: search + all known filter names
            const managedKeys = new Set([searchParamName, 'search']);
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
            const actionButtons = this.filterContainer.querySelectorAll('[data-filter-action]');

            actionButtons.forEach(button => {
                const action = button.getAttribute('data-filter-action');

                switch (action) {
                    case 'apply':
                        this.applyButton = button;
                        const labelEl = button.querySelector('.label');
                        this.applyButtonBaseLabel = labelEl ? labelEl.textContent : 'Apply';

                        // Change button type to submit if in form mode
                        if (this.isFormMode && button.type !== 'submit') {
                            button.type = 'submit';
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

                            // In form mode, let form submission handle it
                            if (this.isFormMode) {
                                // Update hidden inputs before form submission
                                this.updateHiddenInputs();
                                // Don't prevent default - let form submit
                                return;
                            }

                            // Standard client-side filtering mode
                            e.preventDefault();
                            this.applyFilters();
                        });
                        break;
                    case 'clear':
                        button.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.clearDropmenuFilters();
                        });
                        break;
                    case 'reset':
                        button.addEventListener('click', (e) => {
                            e.preventDefault();
                            this.reset();
                        });
                        break;
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
            const labelEl = this.applyButton.querySelector('.label');

            if (labelEl) {
                labelEl.textContent = count > 0
                    ? `${this.applyButtonBaseLabel} (${count})`
                    : this.applyButtonBaseLabel;
            }
        }

        updateFilterButtonLabel() {
            const filterBtn = this.filterContainer.querySelector(
                '.nds-dropmenu-trigger, [data-filter-btn], .filter-btn'
            );

            if (!filterBtn) return;

            if (!this.filterButtonBaseLabel) {
                const labelEl = filterBtn.querySelector('.label');
                this.filterButtonBaseLabel = labelEl ? labelEl.textContent : '';
            }

            const count = this.getAppliedFilterCount();
            const labelEl = filterBtn.querySelector('.label');

            if (labelEl && this.filterButtonBaseLabel) {
                labelEl.textContent = count > 0
                    ? `${this.filterButtonBaseLabel} (${count})`
                    : this.filterButtonBaseLabel;
            }

            if (count > 0) {
                filterBtn.classList.add('has-filters');
            } else {
                filterBtn.classList.remove('has-filters');
            }
        }

        updateAppliedChips() {
            const appliedContainer = this.filterContainer.querySelector('.nds-filter-applied');
            if (!appliedContainer) return;

            // Find chips container inside applied container
            const chipsContainer = appliedContainer.querySelector('.nds-chips');
            if (!chipsContainer) return;

            // Find auto-fill container (optional)
            const autoFillContainer = this.filterContainer.querySelector('.nds-auto-fill');

            // Clear chips container
            chipsContainer.innerHTML = '';

            const hasFilters = this.criteria.search ||
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

            // Add search chip
            if (this.criteria.search) {
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

        createFilterChip(type, value, onRemove, displayLabel) {
            const chip = document.createElement('button');
            chip.className = `nds-chip ${this.chipClass || 'nds-primary nds-lg'}`;
            chip.setAttribute('type', 'button');
            chip.setAttribute('data-filter-type', type);
            chip.setAttribute('data-filter-value', value);

            const icon = document.createElement('i');
            icon.className = 'hgi hgi-stroke hgi-cancel-01 icon';

            const label = document.createElement('span');
            label.className = 'label';
            label.textContent = displayLabel || value;

            chip.appendChild(icon);
            chip.appendChild(label);

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
            const filterElements = this.filterContainer.querySelectorAll('[data-filter]');

            filterElements.forEach(element => {
                const filterName = element.getAttribute('data-filter');
                const filterType = element.getAttribute('data-filter-type');

                if (filterName === 'search') {
                    this.setupSearchFilter(element);
                } else if (filterType === 'checkbox' || filterType === 'radio' || filterType === 'switch') {
                    // Auto-generate filter inputs
                    this.setupDynamicFilter(element, filterName, filterType);
                } else {
                    // Skip data markers inside the target container (e.g. <span data-filter="x"> in cards)
                    const isDataMarker = this.targetContainer && this.targetContainer.contains(element);
                    if (!isDataMarker) {
                        this.setupManualFilter(element, filterName);
                    }
                }
            });

            // Auto-detect direct search input
            if (!this.searchInputs.direct) {
                const allSearchInputs = this.filterContainer.querySelectorAll(
                    'input.nds-search-input, input[name="search"], input[type="search"]'
                );

                for (const input of allSearchInputs) {
                    if (!input.closest('.nds-dropmenu-menu')) {
                        const wrapper = input.closest('.nds-form-control') || input.parentElement;
                        const clearBtn = wrapper?.querySelector('.clear, [aria-label*="مسح"], [aria-label*="clear"]');

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
            const clearBtn = searchContainer.querySelector('.clear, [aria-label*="مسح"], [aria-label*="clear"]');

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
                'button.nds-search-btn, button[type="submit"], button:has(.hgi-search-01)'
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
            // Dismiss any feedback in filter container
            if (window.NDSFeedback) {
                NDSFeedback.dismissAll(this.filterContainer);
            }


            // Trigger form submission
            if (this.filterContainer.requestSubmit) {
                this.filterContainer.requestSubmit();
            } else {
                // Fallback for older browsers
                this.filterContainer.submit();
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

        setupDynamicFilter(element, filterName, inputType) {
            // Generate filter inputs from card data
            this.generateFilterInputs(element, filterName, inputType);

            // Setup the filter after generation
            this.setupManualFilter(element, filterName);
        }

        setupManualFilter(element, filterName) {
            const inputs = element.querySelectorAll('input[type="checkbox"], input[type="radio"], .nds-switch-input');

            // Always set up the DOM observer, even with 0 inputs (handles cascading/async filters)
            if (!element._ndsFilterObserver && typeof NDS !== 'undefined' && NDS.onDOMAdd) {
                element._ndsFilterObserver = true;
                NDS.onDOMAdd('input[type="checkbox"], input[type="radio"], .nds-switch-input', (nodes) => {
                    if (nodes.some(n => element.contains(n))) {
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
                    const labelEl = container.querySelector('.nds-form-header .label');
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

            this.items.forEach(card => {
                const filterElements = card.querySelectorAll(`[data-filter="${filterName}"]`);

                if (filterElements.length > 0) {
                    filterElements.forEach(el => {
                        const value = el.textContent.trim();
                        if (value) {
                            values.add(value);
                        }
                    });
                } else if (filterName === 'tags') {
                    // Fallback for tags: traditional .nds-card-tags structure
                    const cardTags = card.querySelector('.nds-card-tags');
                    if (cardTags) {
                        const tagElements = cardTags.querySelectorAll('.nds-tag .label');
                        tagElements.forEach(el => {
                            const value = el.textContent.trim();
                            if (value) {
                                values.add(value);
                            }
                        });
                    }
                }
            });

            return Array.from(values).sort((a, b) => a.localeCompare(b, 'ar'));
        }

        generateFilterInputs(container, filterName, inputType) {
            // Skip auto-generation in form submission mode
            if (this.isFormMode) {
                console.warn(`NDS Filter: Auto-generation not supported in form submission mode. Use manual filter inputs for filter "${filterName}".`);
                return;
            }

            // Auto-collect values from cards
            const values = this.collectFilterValues(filterName);

            if (values.length === 0) {
                console.warn(`NDS Filter: No values found for filter "${filterName}". No cards with data-filter="${filterName}" found.`);
                return;
            }

            const legendText = container.getAttribute('data-filter-legend') || '';
            const variant = container.getAttribute('data-filter-variant') || '';

            // Create the wrapper structure
            let wrapper = container;
            let fieldset;

            // Check if container should be wrapped in nds-dropmenu-item
            const isInDropmenu = container.closest('.nds-dropmenu-menu') !== null;

            if (container.tagName === 'FIELDSET') {
                fieldset = container;
                // Add nds-dropmenu-item if in dropmenu and not already has it
                if (isInDropmenu && !fieldset.classList.contains('nds-dropmenu-item')) {
                    fieldset.classList.add('nds-dropmenu-item');
                }
                // Clear existing content
                const existingLegend = fieldset.querySelector('legend');
                fieldset.innerHTML = '';
                if (existingLegend || legendText) {
                    const legend = document.createElement('legend');
                    legend.className = 'label';
                    legend.textContent = legendText || (existingLegend ? existingLegend.textContent : '');
                    fieldset.appendChild(legend);
                }
            } else {
                // Create fieldset inside container
                fieldset = document.createElement('fieldset');
                fieldset.className = 'nds-check-group';
                if (isInDropmenu) {
                    fieldset.classList.add('nds-dropmenu-item');
                }
                if (legendText) {
                    const legend = document.createElement('legend');
                    legend.className = 'label';
                    legend.textContent = legendText;
                    fieldset.appendChild(legend);
                }
                container.innerHTML = '';
                container.appendChild(fieldset);
            }

            // Add nds-check-group class
            if (!fieldset.classList.contains('nds-check-group')) {
                fieldset.classList.add('nds-check-group');
            }

            // Add data-no-auto-close if in dropmenu
            if (isInDropmenu) {
                fieldset.setAttribute('data-no-auto-close', '');
            }

            // Determine input class and structure based on type
            const groupName = `filter-${filterName}-${this.generateId()}`;

            // Generate input for each unique value
            values.forEach((value, index) => {
                const id = `${groupName}-${index}`;

                const formContainer = document.createElement('div');
                formContainer.className = inputType === 'switch'
                    ? 'nds-form-container nds-switch-container'
                    : 'nds-form-container nds-check-container';

                const formHeader = document.createElement('div');
                formHeader.className = 'nds-form-header';

                const label = document.createElement('label');
                label.setAttribute('for', id);

                const labelSpan = document.createElement('span');
                labelSpan.className = 'label';
                labelSpan.textContent = value;

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
        }

        generateId() {
            return Math.random().toString(36).substring(2, 9);
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
            if (window.NDSFeedback) {
                NDSFeedback.dismissAll(this.filterContainer);
            }

            // In form mode, just update state (don't submit form programmatically)
            // Form submission only happens from explicit user actions via submitForm()
            if (this.isFormMode) {
                this.updateHiddenInputs();
                this.updateUrlParams();
                this.updateFilterButtonLabel();
                this.updateAppliedChips();
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
                    item.classList.remove('nds-filtered-out');
                    item.style.display = '';
                });

                // Update hidden inputs if in form mode
                if (this.isFormMode) {
                    this.clearHiddenInputs();
                }

                // Dismiss no-results alert if exists
                const alertId = `nds-filter-no-results-${this.targetId}`;
                const existingAlert = document.getElementById(alertId);
                if (existingAlert && window.NDSAlert) {
                    NDSAlert.dismiss(existingAlert);
                }

                this.updateUrlParams();
                this.updateFilterButtonLabel();
                this.updateAppliedChips();
                this.updatePagination();
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

            clearTimeout(this.targetLoadingTimer);
            this.targetLoadingTimer = setTimeout(() => {
                if (this.targetContainer) this.targetContainer.classList.remove('nds-loading');
            }, 500);
        }

        updateNoResultsAlert(visibleCount) {
            if (!this.targetContainer) return;

            const alertId = `nds-filter-no-results-${this.targetId}`;

            if (visibleCount === 0) {
                if (!document.getElementById(alertId) && window.NDSAlert) {
                    const isArabic = document.documentElement.lang === 'ar';
                    const self = this;
                    NDSAlert.warning(isArabic ? 'لا توجد نتائج لمعايير التصفية الحالية' : 'No result for current filter criteria', {
                        target: this.targetContainer,
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
            } else {
                const existingAlert = document.getElementById(alertId);
                if (existingAlert) {
                    NDSAlert.dismiss(existingAlert);
                }
            }
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

            const cardContent = item.querySelector('.nds-card-content');
            if (cardContent) {
                const textContent = cardContent.textContent.toLowerCase();
                if (textContent.includes(searchText)) {
                    return true;
                }
            }

            return false;
        }

        itemMatchesFilter(item, filterName, selectedValues) {
            if (selectedValues.length === 0) return true;

            // Look for elements with data-filter attribute
            const filterElements = item.querySelectorAll(`[data-filter="${filterName}"]`);

            let itemValues = [];

            if (filterElements.length > 0) {
                itemValues = Array.from(filterElements).map(el => el.textContent.trim().toLowerCase());
            } else if (filterName === 'tags') {
                // Fallback for tags: traditional .nds-card-tags structure
                const cardTags = item.querySelector('.nds-card-tags');
                if (!cardTags) return false;

                const tagElements = cardTags.querySelectorAll('.nds-tag .label');
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
            item.classList.remove('nds-filtered-out');
        }

        hideItem(item) {
            item.style.display = 'none';
            item.setAttribute('data-filtered', 'true');
            item.classList.add('nds-filtered-out');
        }

        // ==============================================
        // RESET FUNCTIONALITY
        // ==============================================

        setupResetButton() {
            const resetBtn = this.filterContainer.querySelector('[class*="refresh"], button:has(.hgi-refresh)');
            const resetByIcon = this.filterContainer.querySelector('.hgi-refresh-ccw-02, .hgi-refresh');
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

            // Clear hidden inputs and form state if in form mode
            if (this.isFormMode) {
                this.clearHiddenInputs();
                this.filterContainer.removeAttribute('data-state');
                this.filterContainer.removeAttribute('data-status');
            }

            this.updateApplyButtonLabel();
            this.dispatchClearEvent();
        }

        reset() {
            this.clear();
            this.items.forEach(item => this.showItem(item));

            const alertId = `nds-filter-no-results-${this.targetId}`;
            const existingAlert = document.getElementById(alertId);
            if (existingAlert && window.NDSAlert) {
                NDSAlert.dismiss(existingAlert);
            }

            // Dismiss any feedback in filter container
            if (window.NDSFeedback) {
                NDSFeedback.dismissAll(this.filterContainer);
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
            const event = new CustomEvent('nds:filter:change', {
                detail: {
                    filter: this,
                    criteria: { ...this.criteria },
                    totalItems: this.items.length,
                    visibleItems: visibleCount,
                    hiddenItems: this.items.length - visibleCount
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

            if (window.NDSPagination && window.NDSPagination.refresh) {
                const paginationNav = this.targetContainer.parentElement?.querySelector('.nds-pagination-nav, .nds-auto-pagination');
                if (paginationNav) {
                    setTimeout(() => {
                        window.NDSPagination.refresh(this.targetContainer);
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
         * Only works for client-side filtering (not form submission mode)
         */
        refresh() {
            if (this.isFormMode) {
                console.warn('NDS Filter: refresh() not supported in form submission mode. Use manual filter inputs.');
                return;
            }

            // Update items list
            this.items = this.targetContainer
                ? Array.from(this.targetContainer.querySelectorAll('.nds-card'))
                : [];

            // Regenerate auto-generated filters
            const filterElements = this.filterContainer.querySelectorAll('[data-filter-type]');
            filterElements.forEach(element => {
                const filterName = element.getAttribute('data-filter');
                const filterType = element.getAttribute('data-filter-type');

                // Clear existing inputs first
                element.innerHTML = '';

                // Regenerate
                this.generateFilterInputs(element, filterName, filterType);
                this.setupManualFilter(element, filterName);
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

        // Legacy API for backward compatibility
        setSelectedTags(tags) {
            this.setFilterValues('tags', tags);
        }

        destroy() {
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
            container.ndsFilterInstance = filterInstance;
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
        window.NDSFilter = {
            init: initializeFilters,
            reinit: reinitializeFilters,
            create: (container) => new NDSFilter(container),

            getInstance: (container) => {
                if (typeof container === 'string') {
                    container = document.querySelector(container);
                }
                return container?.ndsFilterInstance || null;
            },

            getByTarget: (targetId) => {
                const filterContainer = document.querySelector(`.nds-filter[data-filter-target="${targetId}"]`);
                return filterContainer?.ndsFilterInstance || null;
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
                if (container.ndsFilterInstance) {
                    callback(container.ndsFilterInstance);
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
 *             <span class="label">Filter</span>
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
 *             <span class="label">تصفية</span>
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
 *             <hr class="nds-dropmenu-divider">
 *             <div class="nds-dropmenu-action nds-grid">
 *                 <button class="nds-btn nds-secondary" data-filter-action="clear">
 *                     <span class="label">إعادة تعيين</span>
 *                 </button>
 *                 <button class="nds-btn nds-primary" data-filter-action="apply">
 *                     <span class="label">تصفية</span>
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
 *             <span class="label">Filter</span>
 *         </button>
 *         <div class="nds-dropmenu-menu">
 *             <fieldset data-filter="category">
 *                 <legend class="label">Category</legend>
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
