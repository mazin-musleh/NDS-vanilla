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
        constructor(filterContainer, surfaces = null) {
            this.filterContainer = filterContainer;
            this.targetId = filterContainer.getAttribute('data-filter-target');
            this.targetContainer = this.targetId ? document.getElementById(this.targetId) : null;

            // Every element carrying this filter's data-filter-target — the
            // filter's surfaces (search box, dropmenu, applied-chips, auto-fill,
            // sort toolbar). The representative element passed to the constructor
            // is included too; there is no privileged "container", just the target
            // set. queryAll searches these subtrees instead of sweeping the whole
            // document. Recomputed in refresh() for the dynamic-DOM path.
            // `surfaces` (when passed by the loader) is this target's already-grouped
            // surface set, so the constructor skips re-scanning the document for them.
            this._targetRoots = this.resolveTargetRoots(surfaces);

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
            // Surface lookups resolve from _targetRoots (the elements carrying
            // this filter's data-filter-target) rather than re-scanning the whole
            // document — a root IS the linked element, so .matches() on the small
            // root set replaces a document-wide attribute query per surface.
            this.submissionForm = this._targetRoots.find(r => r.matches('form[data-filter-submit]')) || null;

            this.isFormMode = !!this.submissionForm;
            this.isAjaxMode = this.isFormMode && this.submissionForm.hasAttribute('data-ajax');

            // Hidden inputs container for form mode
            this.hiddenInputsContainer = null;

            // Resolve applied-chips container: inside filter first, then a linked root.
            this.appliedContainer = filterContainer.querySelector('.nds-filter-applied')
                || this._targetRoots.find(r => r.matches('.nds-filter-applied'))
                || null;

            // Resolve external auto-fill linked by data-filter-target.
            this.autoFillElement = this._targetRoots.find(r => r.matches('.nds-auto-fill')) || null;

            // Resolve search-query slot — a root carrying [data-filter-query] or one
            // holding it as a descendant. When present, the search keyword is routed
            // into this slot instead of the applied-chips row.
            this.searchQuerySlot = this.query('[data-filter-query]');

            this.filterLabels = {};  // { filterName: { value: label } } — auto-built from data-filter-value

            this.abortController = new AbortController();
            // Pool subscriber handles from setupManualFilter's NDS.onDOMAdd
            // calls; released atomically in destroy() so the per-element
            // closures don't outlive the filter instance.
            this._offDOMAdds = [];
            // Per-filter-element AbortControllers stored on the elements
            // themselves (element._ndsFilterAC); tracked here so destroy()
            // can release them all in one sweep.
            this._filterElementACs = new Set();
            // In-flight AJAX submission controller. Re-created per submit so a
            // newer Apply click aborts the prior request before it can replace
            // fresh results with stale ones.
            this.fetchAbortController = null;

            // Per-item match cache (_ndsFilterValues + _ndsSearchText) is
            // built lazily on the first applyFilters() pass that has criteria
            // — pages where the user never interacts with the filter skip the
            // cost entirely. Flipped to false whenever this.items is
            // reassigned (AJAX HTML inject, refresh()).
            this._cacheBuilt = false;

            // Auto-populated filters (data-filter-type without data-filter-values)
            // whose options come from a full item scan via collectFilterValues.
            // When such a filter is hidden at rest (inside a dropmenu, or behind a
            // search input) AND not active in the URL, its option build is deferred
            // here and triggered on first engagement (buildDeferredFilters). Manual,
            // static-values, and URL-active filters build eagerly during init.
            this._deferredFilters = [];

            this.init();
        }

        getItemSelector() {
            return this.targetContainer?.getAttribute('data-filter-items') || '.nds-card';
        }

        getFilterValue(el) {
            return el.getAttribute('data-filter-value') || el.textContent.trim();
        }

        // Resolve this filter's surfaces: every element carrying its
        // data-filter-target. The representative element is always included (it
        // carries the target too, but unshift guarantees it even if markup ever
        // diverges) so a query never misses the element the instance was built on.
        // `surfaces`, when supplied (loader init path), is the pre-grouped set for
        // this target — used as-is to avoid a redundant document scan; refresh()
        // and create() pass nothing, so they re-scan for the current DOM.
        resolveTargetRoots(surfaces = null) {
            const roots = surfaces
                ? surfaces.slice()
                : (this.targetId
                    ? Array.from(document.querySelectorAll(`[data-filter-target="${this.targetId}"]`))
                    : []);
            if (!roots.includes(this.filterContainer)) roots.unshift(this.filterContainer);
            return roots;
        }

        /**
         * Find all elements matching `selector` that belong to this filter instance.
         * A filter is the set of elements carrying its data-filter-target (its
         * surfaces); this searches each surface's subtree uniformly — there is no
         * privileged container. Elements inside the target list (e.g. <span
         * data-filter> markers on cards) are excluded so they aren't mistaken for
         * controls.
         *
         * Searches the small linked subtrees (this._targetRoots) rather than
         * sweeping the whole document, so cost scales with the filter's own UI
         * regions, not the page.
         */
        queryAll(selector) {
            const set = new Set();
            for (const root of this._targetRoots) {
                if (root.matches(selector)) set.add(root);
                root.querySelectorAll(selector).forEach(el => set.add(el));
            }

            let matches = Array.from(set);
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
            }, { signal: this.abortController.signal });
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

            NDS.State.set(this.filterContainer, 'submitting');

            this.filterContainer.dispatchEvent(new CustomEvent('nds:formValid', {
                detail: {}
            }));
        }

        /**
         * Handle AJAX form submission. Thin orchestrator — each step lives in
         * a private helper so the fetch chain stays scannable. Only form-mode
         * AJAX filters reach this; it never runs at first paint.
         */
        handleAjaxSubmit() {
            // Update URL params and UI state
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
            if (!this.filterContainer.dispatchEvent(ajaxEvent)) return;

            NDS.State.set(this.filterContainer, 'submitting');
            NDS.Status.clear(this.filterContainer);
            if (this.targetContainer) this.targetContainer.classList.add('nds-loading');

            const { url, options } = this._buildAjaxRequest();
            fetch(url, options)
                .then(response => this._parseAjaxResponse(response))
                .then(({ isJson, data }) => {
                    const eventDetail = this._applyAjaxResponse({ isJson, data });
                    this._finishAjaxSubmit(eventDetail, isJson);
                })
                .catch(error => this._handleAjaxError(error));
        }

        /**
         * Build the fetch URL + options for the current form state. Resets
         * this.fetchAbortController so a previous in-flight submission can be aborted
         * before the new one starts.
         */
        _buildAjaxRequest() {
            const method = this.submissionForm.method.toUpperCase() || 'GET';
            let action = this.submissionForm.action || window.location.href;

            // Handle # or empty action - use current page URL without hash
            if (!action || action === '#' || action.endsWith('#')) {
                action = window.location.origin + window.location.pathname;
            }

            // Abort any in-flight submission so a faster second Apply click
            // can't be overtaken by the slower first response (replaceWith
            // in _applyAjaxResponse would otherwise install stale results).
            if (this.fetchAbortController) this.fetchAbortController.abort();
            this.fetchAbortController = new AbortController();

            const options = {
                method,
                headers: {},
                signal: this.fetchAbortController.signal
            };

            // Collect form data from the submission form (respects HTML `form="id"`
            // attribute on scattered inputs associated with this form).
            const formData = new FormData(this.submissionForm);

            let url = action;
            if (method === 'GET') {
                const params = new URLSearchParams(formData);
                url = action + (action.includes('?') ? '&' : '?') + params.toString();
            } else {
                options.body = formData;
            }

            return { url, options };
        }

        /**
         * Validate response status and branch on Content-Type. Throws on
         * non-OK so the catch handler routes through _handleAjaxError.
         */
        _parseAjaxResponse(response) {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            const contentType = response.headers.get('Content-Type') || '';
            const isJson = contentType.includes('application/json');
            return isJson
                ? response.json().then(data => ({ isJson: true, data }))
                : response.text().then(data => ({ isJson: false, data }));
        }

        /**
         * Apply the parsed response to the DOM. JSON leaves rendering to the
         * consumer (via the complete event); HTML swaps the target container
         * with the response's matching #id subtree. Returns the eventDetail
         * object that _finishAjaxSubmit will dispatch.
         */
        _applyAjaxResponse({ isJson, data }) {
            const eventDetail = {
                success: true,
                form: this.filterContainer,
                isJson
            };

            if (isJson) {
                eventDetail.data = data;
                this._revealTargetContainer();
                return eventDetail;
            }

            // HTML response — inject into target container
            eventDetail.html = data;
            eventDetail.fullHtml = data;

            if (!this.targetContainer || !this.targetId) return eventDetail;

            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const targetInResponse = doc.getElementById(this.targetId);

            if (targetInResponse) {
                const newContainer = targetInResponse.cloneNode(true);
                this.targetContainer.replaceWith(newContainer);
                this.targetContainer = newContainer;
                this.items = Array.from(this.targetContainer.querySelectorAll(this.getItemSelector()));
                this._cacheBuilt = false;
                this._revealTargetContainer();
                eventDetail.html = newContainer.innerHTML;
            } else {
                console.warn(`NDS Filter: target container #${this.targetId} not found in server response. Emptying target container.`);
                this.targetContainer.innerHTML = '';
                const id = this.targetContainer.id;
                while (this.targetContainer.attributes.length > 0) {
                    this.targetContainer.removeAttribute(this.targetContainer.attributes[0].name);
                }
                this.targetContainer.id = id;
                this.targetContainer.setAttribute('hidden', '');
                eventDetail.html = '';
            }

            return eventDetail;
        }

        /**
         * Ensure the target container is visible (server responses sometimes
         * keep hidden/display:none on the placeholder shell).
         */
        _revealTargetContainer() {
            if (!this.targetContainer) return;
            this.targetContainer.removeAttribute('hidden');
            if (this.targetContainer.style.display === 'none') {
                this.targetContainer.style.display = '';
            }
        }

        /**
         * Settle UI state after a successful response: clear loading, set
         * success status, refresh dependent UI, fire the complete event,
         * schedule status auto-clear.
         */
        _finishAjaxSubmit(eventDetail, isJson) {
            if (this.targetContainer) {
                this.targetContainer.classList.remove('nds-loading');
            }

            NDS.Status.set(this.filterContainer, 'success');
            NDS.State.clear(this.filterContainer);

            this.updateUrlParams();
            this.updateFilterButtonLabel();
            this.updateAppliedChips();

            this.filterContainer.dispatchEvent(new CustomEvent('nds:filterFormComplete', {
                detail: eventDetail
            }));

            // JSON developers render inside the complete-event handler and may set
            // data-total-count on the target container there — re-run the count so
            // the slots reflect their updates.
            if (isJson) this.updateFilterCount();

            setTimeout(() => NDS.Status.clear(this.filterContainer), 3000);
        }

        /**
         * Settle UI state on AJAX failure. AbortError is silent — the newer
         * request that aborted us owns the loading state.
         */
        _handleAjaxError(error) {
            if (error.name === 'AbortError') return;

            console.error('NDS Filter: AJAX submission failed:', error);

            if (this.targetContainer) {
                this.targetContainer.classList.remove('nds-loading');
            }

            NDS.Status.set(this.filterContainer, 'error');
            NDS.State.clear(this.filterContainer);

            this.filterContainer.dispatchEvent(new CustomEvent('nds:filterFormError', {
                detail: {
                    error: error.message,
                    form: this.filterContainer
                }
            }));

            setTimeout(() => NDS.Status.clear(this.filterContainer), 5000);
        }

        /**
         * Get the custom name for search input or return default
         */
        getSearchInputName() {
            if (this.searchInputs.direct && this.searchInputs.direct.input.name) {
                return this.searchInputs.direct.input.name;
            }

            if (this.searchInputs.dropmenu && this.searchInputs.dropmenu.input.name) {
                return this.searchInputs.dropmenu.input.name;
            }

            return 'search';
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

        // Sanitize a URL-supplied value for *matching* against existing DOM
        // input values (filter checkboxes/radios/switches). Unlike sanitizeInput
        // — which strips & " ' < > for free-text search — this keeps characters
        // that are legitimately part of a filter value (e.g. "Healthcare & Social")
        // so the equality match against input.value succeeds. Safe because the
        // value is only compared, never rendered as HTML (stored criteria come
        // from input.value itself).
        sanitizeFilterValue(str) {
            if (!str) return '';
            return str.replace(/<[^>]*>/g, '').substring(0, 100);
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
                    this._checkInputsForValues(this.filterInputs[key], value);
                    this.updateFilterCriteria(key);
                    hasParams = true;
                }
            }

            if (hasParams) {
                this._settleAfterCriteriaChange();
            }
        }

        // Check every input in a filter group whose value matches one of the
        // comma-separated values in `rawValue` (URL-param sourced). Values are
        // length-capped via sanitizeFilterValue but keep their literal chars so
        // matching against trusted input.value succeeds (e.g. "Healthcare & Social").
        _checkInputsForValues(filterData, rawValue) {
            const values = rawValue.split(',').map(v => this.sanitizeFilterValue(v).trim());
            filterData.inputs.forEach(input => {
                if (values.some(v => v.toLowerCase() === input.value.toLowerCase())) {
                    input.checked = true;
                }
            });
        }

        // Settle filter UI after a criteria change sourced from URL params.
        // In form mode we update UI only — calling applyFilters() would run
        // updateUrlParams() and rewrite the URL we just read from.
        _settleAfterCriteriaChange() {
            this.updateApplyButtonLabel();
            if (this.isFormMode) {
                this.updateFilterButtonLabel();
                this.updateAppliedChips();
            } else {
                this.applyFilters();
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

            this._checkInputsForValues(this.filterInputs[filterName], value);
            this.updateFilterCriteria(filterName);
            this._settleAfterCriteriaChange();
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

            actionButtons.forEach(button => {
                const action = button.getAttribute('data-filter-action');

                switch (action) {
                    case 'apply':  this._bindApplyButton(button); break;
                    case 'clear':  this._bindClearButton(button); break;
                    case 'reset':  this._bindResetButton(button); break;
                }
            });
        }

        _bindApplyButton(button) {
            const { signal } = this.abortController;

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
                this._syncSearchFromDropmenu();

                // In form mode, trigger submission programmatically so it works
                // even if the button isn't natively form-associated.
                if (this.isFormMode) {
                    e.preventDefault();
                    this.submitForm();
                    return;
                }

                // Standard client-side filtering mode
                e.preventDefault();
                this.applyFilters();
            }, { signal });
        }

        _bindClearButton(button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.clearDropmenuFilters();
            }, { signal: this.abortController.signal });
        }

        _bindResetButton(button) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.reset();
            }, { signal: this.abortController.signal });
        }

        // Mirror the dropmenu search input's value into criteria.search and the
        // direct search box (when both exist). No-op when there is no dropmenu
        // search input. Used by the apply button and any other path that needs
        // to settle search state from the dropmenu surface.
        _syncSearchFromDropmenu() {
            if (!this.searchInputs.dropmenu) return;
            this.criteria.search = this.searchInputs.dropmenu.input.value.trim().toLowerCase();
            if (this.searchInputs.direct) {
                this.searchInputs.direct.input.value = this.searchInputs.dropmenu.input.value;
                this.updateClearButtonVisibility(
                    this.searchInputs.direct.input,
                    this.searchInputs.direct.clearBtn
                );
            }
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

            // Root the sort instance on the items container — that's the
            // canonical scope across the filter component (queryAll/URL params
            // already key off targetId). Side effects: nds:sort:change
            // dispatches from the items container (bubbles to document
            // unchanged), and two filter controls pointing at the same target
            // share one sort instance via NDS.Sort's root.ndsSort dedup cache.
            this.sort = NDS.Sort.create(this.targetContainer, {
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
                    this.updatePagination();
                    this.dispatchFilterEvent();
                }
            });
        }

        getActiveFilterCount() {
            const searchActive = this.searchInputs.dropmenu
                && this.searchInputs.dropmenu.input.value.trim();
            return this.getAppliedFilterCount() + (searchActive ? 1 : 0);
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

            // Count slot — a linked root carrying [data-filter-count] or holding it.
            const countSlot = this.query('[data-filter-count]');
            if (!countSlot || !this.targetContainer) return;

            // Count source priority:
            //   1. Server-provided: data-total-count on the target container
            //      (for SSR pages or JSON-AJAX developers)
            //   2. DOM enumeration: visible (non-`[data-filtered]`) items
            const totalAttr = this.targetContainer.getAttribute('data-total-count');
            if (totalAttr !== null && totalAttr !== '') {
                countSlot.textContent = parseInt(totalAttr, 10) || 0;
                return;
            }

            // No active criteria → nothing is filtered out, so the visible count
            // is just the item total. Skip the per-item scan (it would only
            // ever return items.length here) — this is the common first-load case.
            const hasCriteria = (this.criteria.search && this.criteria.search.trim() !== '')
                || Object.values(this.criteria.filters).some(arr => arr.length > 0);
            if (!hasCriteria) {
                countSlot.textContent = this.items.length;
                return;
            }

            // Filtered: count from the cached item list (refreshed on init and after
            // AJAX injection) so transient UI like the no-results alert — which also
            // carries .nds-card — isn't counted as a result. `item.hidden` is
            // pagination-driven for non-current-page items; those are still matches.
            let visible = 0;
            for (const item of this.items) {
                if (!item.hasAttribute('data-filtered')) visible++;
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

            this._mirrorSearchInputs('');
            if (this.searchInputs.dropmenu) this.updateApplyButtonLabel();

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
            const params = new URLSearchParams(window.location.search);

            // Dropmenus that will defer an auto-populated filter (hidden + not
            // URL-active). Their first open already pays a prepare/delay pass, so a
            // static-values filter in the same menu can defer its DOM build onto that
            // same hook for free. A static filter in a menu that wouldn't otherwise
            // defer stays eager — deferring it would add a needless first-open delay
            // for no real init saving (static builds skip the collectFilterValues scan).
            const deferringMenus = new Set();
            filterElements.forEach(element => {
                const type = element.getAttribute('data-filter-type');
                if (!type || element.hasAttribute('data-filter-values')) return;
                const name = element.getAttribute('data-filter');
                const menu = element.closest('.nds-dropmenu-menu');
                if (menu && !params.has(name)) deferringMenus.add(menu);
            });

            filterElements.forEach(element => {
                const filterName = element.getAttribute('data-filter');
                const filterType = element.getAttribute('data-filter-type');

                if (filterName === 'search') {
                    this.setupSearchFilter(element);
                } else if (filterType === 'checkbox' || filterType === 'radio' || filterType === 'switch') {
                    // Check for explicit values via data-filter-values (array or object)
                    const staticValues = element.getAttribute('data-filter-values');
                    let values = null;
                    if (staticValues) {
                        const raw = JSON.parse(staticValues);
                        if (Array.isArray(raw)) {
                            values = raw;
                        } else {
                            // Object form: keys = values, values = labels
                            values = Object.keys(raw);
                            this.filterLabels[filterName] = raw;
                        }
                    }

                    // Hidden at rest (inside a dropmenu) and not URL-active: defer the
                    // option build to first engagement. Auto-populated filters defer the
                    // collectFilterValues scan; static-values filters defer the DOM build
                    // but only when their menu already defers an auto filter (see
                    // deferringMenus above). The parsed `values` ride along so the prepare
                    // hook builds without re-reading the attribute. URL-active filters fall
                    // through to the eager build so applyUrlParams can check inputs on load.
                    const menu = element.closest('.nds-dropmenu-menu');
                    const canDefer = !!menu && !params.has(filterName)
                        && (!values || deferringMenus.has(menu));
                    if (canDefer) {
                        this._deferredFilters.push({ element, filterName, filterType, values });
                    } else {
                        this.setupDynamicFilter(element, filterName, filterType, values);
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

            // Build deferred auto-populated filters via the dropmenu's delayed-open
            // mode: mark the dropmenu data-delay="500" so the user's first open
            // shows a loading state and waits before opening, and build the options
            // on the nds:dropmenu:prepare hook it fires just before opening. The menu
            // therefore opens already populated and correctly measured — the build
            // never races the open animation, and the dropmenu clears data-delay
            // after the first open so later opens are immediate. Released via the
            // shared abort signal in destroy().
            if (this._deferredFilters.length) {
                const { signal } = this.abortController;
                const dropmenus = new Set();
                this._deferredFilters.forEach(({ element }) => {
                    const dm = element.closest('.nds-dropmenu');
                    if (dm) dropmenus.add(dm);
                });
                dropmenus.forEach(dm => {
                    dm.setAttribute('data-delay', '500');
                    dm.addEventListener('nds:dropmenu:prepare', () => this.buildDeferredFilters(), { signal });
                });
            }
        }

        // Build options for filters whose option build was deferred at init (see
        // setupFilterElements) — auto-populated (collectFilterValues scan) and
        // static-values (DOM build) alike. Idempotent: the first engagement event
        // builds the whole set; later events no-op. Deferred filters are never
        // URL-active, so there is no URL state to re-apply after building.
        buildDeferredFilters() {
            if (!this._deferredFilters.length) return;
            const deferred = this._deferredFilters;
            this._deferredFilters = [];
            deferred.forEach(({ element, filterName, filterType, values }) => {
                // Skip if already built (e.g. refresh() rebuilt it eagerly before
                // first engagement) — re-running would scan + wire into a stale node.
                if (this.filterInputs[filterName]) return;
                this.setupDynamicFilter(element, filterName, filterType, values || null);
            });
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
            const signal = this.abortController.signal;
            searchInput.addEventListener('input', () => {
                if (clearBtn) {
                    this.updateClearButtonVisibility(searchInput, clearBtn);
                }
                this.updateApplyButtonLabel();
            }, { signal });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    // Same flow as the Apply button: settle search state from the
                    // dropmenu surface, then submit (form mode) or apply.
                    this._syncSearchFromDropmenu();

                    if (this.isFormMode) {
                        this.submitForm();
                        return;
                    }

                    this.applyFilters();
                }
            }, { signal });

            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    searchInput.value = '';
                    this.updateClearButtonVisibility(searchInput, clearBtn);
                    this.updateApplyButtonLabel();
                }, { signal });
            }
        }

        setupDirectSearch(searchInput, clearBtn) {
            const signal = this.abortController.signal;
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
            }, { signal });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();

                    // Centralized logic: applyDirectSearch → applyFilters (handles both modes)
                    this.applyDirectSearch(searchInput);
                }
            }, { signal });

            if (searchBtn) {
                searchBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.applyDirectSearch(searchInput);
                }, { signal });
            }

            if (clearBtn) {
                // removeSearchFilter clears criteria, mirrors both search inputs
                // (incl. this one) + clear buttons, then resubmits/reapplies.
                clearBtn.addEventListener('click', () => this.removeSearchFilter(), { signal });
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
            // Soft dependency — filter skips feedback dismissal if NDS.Feedback isn't bundled.
            if (NDS.Feedback) {
                NDS.Feedback.dismissAll(this.filterContainer);
            }

            // Trigger form submission on the actual form element.
            // Fallback gap: .submit() skips the submit event, so without
            // requestSubmit (pre-2022 engines) the setupFormSubmission listener
            // never fires — validation is bypassed and AJAX mode degrades to a
            // full-page navigation.
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

        // Write `value` into whichever search inputs exist (direct + dropmenu) and
        // sync each one's clear button. Callers handle apply-label / filter
        // application / form submission separately.
        _mirrorSearchInputs(value) {
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
                this._offDOMAdds.push(NDS.onDOMAdd('input[type="checkbox"], input[type="radio"], .nds-switch-input', (nodes) => {
                    // Ignore nodes that already have listeners bound — they are
                    // being moved (portal open/close), not genuinely inserted.
                    const fresh = nodes.filter(n => element.contains(n) && !n._ndsFilterBound);
                    if (fresh.length > 0) {
                        this.setupManualFilter(element, filterName);
                        this.reapplyUrlParamsForFilter(filterName);
                    }
                }));
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

            this.filterInputs[filterName] = {
                inputs: inputs,
                type: inputType,
                element: element,
                customName: customName,  // Store custom name if provided
                labels: labels           // Store value-to-label map
            };

            // Per-filter-element controller: refresh()/populateFilter()/onDOMAdd
            // cascades may re-call setupManualFilter on the same element with a
            // fresh input set (or the same set after innerHTML='' rebuild).
            // Aborting+resetting here releases the prior listener-target entries
            // atomically so they don't accumulate on the long-lived this.abortController.signal
            // until destroy(). The per-input _ndsFilterBound flag is preserved
            // (it's used by the onDOMAdd filter above to distinguish moves from
            // genuine inserts), but it no longer gates the bind itself — every
            // call re-wires every current input.
            if (element._ndsFilterAC) element._ndsFilterAC.abort();
            element._ndsFilterAC = new AbortController();
            this._filterElementACs.add(element);

            inputs.forEach(input => {
                input._ndsFilterBound = true;
                input.addEventListener('change', () => {
                    this.updateFilterCriteria(filterName);
                    this.updateApplyButtonLabel();
                }, { signal: element._ndsFilterAC.signal });
            });
        }

        // ==============================================
        // AUTO-GENERATION
        // ==============================================

        collectFilterValues(filterName) {
            const values = new Set();
            const labelMap = {};

            // Record one marker element's value; map machine value → display
            // label when data-filter-value provides one.
            const harvest = el => {
                const value = this.getFilterValue(el);
                if (!value) return;
                values.add(value);
                const machineValue = el.getAttribute('data-filter-value');
                if (machineValue) labelMap[machineValue] = el.textContent.trim();
            };

            this.items.forEach(card => {
                const filterElements = card.querySelectorAll(`[data-filter="${filterName}"]`);
                const itemHasFilter = card.getAttribute('data-filter') === filterName;

                if (!filterElements.length && !itemHasFilter) {
                    // Fallback for tags: traditional .nds-card-tags structure
                    if (filterName === 'tags') {
                        this._collectCardTagLabels(card).forEach(value => values.add(value));
                    }
                    return;
                }

                filterElements.forEach(harvest);
                // The item itself can carry the marker too
                if (itemHasFilter) harvest(card);
            });

            // Store auto-collected labels for use by generateFilterInputs
            if (Object.keys(labelMap).length > 0) {
                this.filterLabels[filterName] = labelMap;
            }

            return Array.from(values).sort((a, b) => a.localeCompare(b, 'ar'));
        }

        // Harvest legacy .nds-card-tags labels from a card: the trimmed
        // .nds-tag .nds-label text of each tag, original case. Shared by
        // collectFilterValues (option build) and _buildItemCache (match cache);
        // callers lowercase as needed.
        _collectCardTagLabels(card) {
            const cardTags = card.querySelector('.nds-card-tags');
            if (!cardTags) return [];
            const labels = [];
            cardTags.querySelectorAll('.nds-tag .nds-label').forEach(el => {
                const value = el.textContent.trim();
                if (value) labels.push(value);
            });
            return labels;
        }

        generateFilterInputs(container, filterName, inputType, explicitValues = null) {
            // Use explicit values if provided, otherwise collect from cards
            const collectedValues = explicitValues || this.collectFilterValues(filterName);

            if (collectedValues.length === 0) {
                if (!explicitValues) {
                    console.warn(`NDS Filter: No values found for filter "${filterName}". Use data-filter-values or populateFilter() to provide values.`);
                }
                return;
            }

            const legendText = container.getAttribute('data-filter-legend') || '';
            const variant = container.getAttribute('data-filter-variant') || '';

            // Radios cannot be deselected once chosen, so auto-prepend an "All"
            // option with value="" — updateFilterCriteria already excludes empty
            // values, so selecting it clears the filter.
            const includeAllOption = inputType === 'radio'
                && !container.hasAttribute('data-filter-no-all');
            const allLabel = container.getAttribute('data-filter-all-label')
                || (NDS.isArabic ? 'الكل' : 'All');
            const values = includeAllOption ? ['', ...collectedValues] : collectedValues;

            const isInDropmenu = container.closest('.nds-dropmenu-menu') !== null;
            const multiple = values.length > 1;

            const fieldset = this._resolveFilterFieldset(container, { legendText, isInDropmenu, multiple });

            // Add group class for groups (multiple inputs) — match input type
            if (multiple) {
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

            const ctx = {
                inputType,
                groupName: `filter-${filterName}-${NDS.uniqueId()}`,
                filterName,
                variant,
                includeAllOption,
                allLabel,
                labelMap: this.filterLabels[filterName] || {},
            };

            values.forEach((value, index) => {
                fieldset.appendChild(this._buildFilterInput(value, index, ctx));
            });

            return fieldset;
        }

        // Resolve the element that will hold the generated inputs. Three shapes:
        //   - container is already a <fieldset> → clear it, re-add legend
        //   - multiple values → build a real <fieldset>, copy the placeholder's
        //     class/data attributes onto it, and replace the placeholder
        //   - single value → keep the placeholder div as a dropmenu item
        // Returns the element to append inputs into.
        _resolveFilterFieldset(container, { legendText, isInDropmenu, multiple }) {
            if (container.tagName === 'FIELDSET') {
                const fieldset = container;
                if (isInDropmenu && !fieldset.classList.contains('nds-dropmenu-group')) {
                    fieldset.classList.add('nds-dropmenu-group');
                }
                const existingLegend = fieldset.querySelector('legend');
                fieldset.innerHTML = '';
                if (existingLegend || legendText) {
                    const legend = document.createElement('legend');
                    legend.className = 'nds-label';
                    legend.textContent = legendText || (existingLegend ? existingLegend.textContent : '');
                    fieldset.appendChild(legend);
                }
                return fieldset;
            }

            if (multiple) {
                const fieldset = document.createElement('fieldset');
                fieldset.className = container.className;
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
                return fieldset;
            }

            // Single value: keep as div, treat as dropmenu item
            if (isInDropmenu) {
                container.classList.remove('nds-dropmenu-group');
                if (!container.classList.contains('nds-dropmenu-item')) {
                    container.classList.add('nds-dropmenu-item');
                }
            }
            container.innerHTML = '';
            return container;
        }

        // Build one .nds-form-container holding a single checkbox / radio /
        // switch input for `value`. `index` drives the id and "All"-option
        // detection; `ctx` carries the shared per-group settings.
        _buildFilterInput(value, index, ctx) {
            const { inputType, groupName, filterName, variant, includeAllOption, allLabel, labelMap } = ctx;
            const id = `${groupName}-${index}`;
            const isAllOption = includeAllOption && index === 0;

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
            labelSpan.textContent = isAllOption ? allLabel : (labelMap[value] || value);

            label.appendChild(labelSpan);
            formHeader.appendChild(label);

            const formControl = document.createElement('div');
            formControl.className = 'nds-form-control';

            if (inputType === 'switch') {
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
                if (isAllOption) {
                    input.checked = true;
                }

                formControl.appendChild(input);
            }

            formContainer.appendChild(formHeader);
            formContainer.appendChild(formControl);
            return formContainer;
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
            // Soft dependency — filter skips feedback dismissal if NDS.Feedback isn't bundled.
            if (NDS.Feedback) {
                NDS.Feedback.dismissAll(this.filterContainer);
            }

            // In form mode, just update state (don't submit form programmatically)
            // Form submission only happens from explicit user actions via submitForm()
            if (this.isFormMode) {
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
                // Un-hide every item — same as showItem() (used by reset()/destroy()).
                this.items.forEach(item => this.showItem(item));

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

            this._ensureCacheBuilt();

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
            // Soft dependency — filter skips no-results alert banner if NDS.Alert isn't bundled.
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
            NDS.Alert.dismiss(existingAlert);
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

        // Build the cache on demand — the first applyFilters() with criteria
        // triggers it via _ensureCacheBuilt. Sites that reassign this.items
        // flip _cacheBuilt to false; this method then re-runs on the next
        // applyFilters pass.
        _ensureCacheBuilt() {
            if (this._cacheBuilt) return;
            this._buildItemCache();
            this._cacheBuilt = true;
        }

        // Walk each item once and stash its filter values + lowercased search
        // text on the element itself. applyFilters() then matches against the
        // cache instead of re-querying every item's [data-filter] descendants
        // and re-walking textContent on every pass.
        _buildItemCache() {
            for (const item of this.items) {
                const filterValues = {};

                const filterEls = item.querySelectorAll('[data-filter]');
                for (let i = 0; i < filterEls.length; i++) {
                    const el = filterEls[i];
                    const name = el.getAttribute('data-filter');
                    if (!filterValues[name]) filterValues[name] = [];
                    filterValues[name].push(this.getFilterValue(el).toLowerCase());
                }

                const itemFilter = item.getAttribute('data-filter');
                if (itemFilter) {
                    if (!filterValues[itemFilter]) filterValues[itemFilter] = [];
                    filterValues[itemFilter].push(this.getFilterValue(item).toLowerCase());
                }

                // Legacy .nds-card-tags fallback — only contributes when no
                // data-filter="tags" markers exist on this card.
                if (!filterValues.tags) {
                    const tagLabels = this._collectCardTagLabels(item);
                    if (tagLabels.length) {
                        filterValues.tags = tagLabels.map(v => v.toLowerCase());
                    }
                }

                item._ndsFilterValues = filterValues;

                const textSource = item.querySelector('.nds-card-content') || item;
                item._ndsSearchText = textSource.textContent.toLowerCase();
            }
        }

        itemMatchesSearch(item) {
            const searchText = this.criteria.search;
            if (!searchText) return true;
            return (item._ndsSearchText || '').includes(searchText);
        }

        itemMatchesFilter(item, filterName, selectedValues) {
            if (selectedValues.length === 0) return true;

            const itemValues = item._ndsFilterValues?.[filterName];
            if (!itemValues || itemValues.length === 0) return false;

            // Radio (AND-style single selection) and checkbox (OR) share the
            // same expression — at least one selected value matches one of the
            // item's values. Radio's "single selection" constraint is enforced
            // at the input layer, not here.
            return selectedValues.some(val => itemValues.includes(val.toLowerCase()));
        }

        // ==============================================
        // ITEM VISIBILITY
        // ==============================================

        showItem(item) {
            // Visual hide is owned by CSS: `[data-filtered]{display:none!important}`
            // in the critical layer. Clearing the attribute un-hides; no inline style.
            item.removeAttribute('data-filtered');
        }

        hideItem(item) {
            item.setAttribute('data-filtered', 'true');
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
                }, { signal: this.abortController.signal });
            }
        }

        // Uncheck every filter input, zero out the criteria entries, and
        // re-check the "All" radio (value="") so radio groups keep a valid
        // selection after clearing. Shared by clear() and clearDropmenuFilters().
        _resetFilterInputs() {
            for (const [filterName, filterData] of Object.entries(this.filterInputs)) {
                filterData.inputs.forEach(input => {
                    input.checked = false;
                });
                if (filterData.type === 'radio') {
                    // filterData.inputs is a NodeList (querySelectorAll) — wrap
                    // before .find, matching updateFilterCriteria's Array.from use.
                    const allInput = Array.from(filterData.inputs).find(i => i.value === '');
                    if (allInput) allInput.checked = true;
                }
                this.criteria.filters[filterName] = [];
            }
        }

        clearDropmenuFilters() {
            if (this.searchInputs.dropmenu) {
                this.searchInputs.dropmenu.input.value = '';
                if (this.searchInputs.dropmenu.clearBtn) {
                    this.searchInputs.dropmenu.clearBtn.hidden = true;
                }
            }

            this._resetFilterInputs();

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
            this._mirrorSearchInputs('');

            this.criteria.search = '';

            this._resetFilterInputs();

            // Clear sort and restore original DOM order (NDS.Sort handles snapshot + restore + a11y)
            if (this.sort && this.sort.getState().key) {
                this.sort.reset();
            }

            // Clear form state if in form mode
            if (this.isFormMode) {
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
            // Soft dependency — filter skips feedback dismissal if NDS.Feedback isn't bundled.
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

            // Walk up to find the .nds-paged-content wrapper (pagination expects this as the container)
            const pagedContent = this.targetContainer.closest('.nds-paged-content') ||
                                 this.targetContainer.parentElement?.closest('.nds-paged-content');
            const container = pagedContent || this.targetContainer;
            const paginationNav = container.parentElement?.querySelector('.nds-pagination[data-auto-pagination]');
            if (paginationNav) {
                NDS.Pagination.refresh(container);
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

            // Re-resolve target surfaces in case the surrounding UI changed
            this._targetRoots = this.resolveTargetRoots();

            // Update items list
            this.items = this.targetContainer
                ? Array.from(this.targetContainer.querySelectorAll(this.getItemSelector()))
                : [];
            this._cacheBuilt = false;

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

            this._mirrorSearchInputs(value);

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
            this.abortController.abort();
            if (this.fetchAbortController) this.fetchAbortController.abort();
            // Release pooled NDS.onDOMAdd subscribers registered per filter
            // element by setupManualFilter; without this, each filter instance
            // would leak one closure per filter element for the page lifetime.
            this._offDOMAdds.forEach(off => off());
            this._offDOMAdds.length = 0;
            this._filterElementACs.forEach(el => {
                if (el._ndsFilterAC) { el._ndsFilterAC.abort(); delete el._ndsFilterAC; }
            });
            this._filterElementACs.clear();
            this.items.forEach(item => this.showItem(item));
            // Only release shared registry/backref state when THIS instance owns it.
            // A raw NDS.Filter.create() duplicate on an already-registered target
            // shares the representative element + targetId; destroying it must not
            // clobber the registered instance's backref, init attribute, or map entry.
            if (this.filterContainer.ndsFilter === this) {
                this.filterContainer.removeAttribute('data-nds-filter-initialized');
                delete this.filterContainer.ndsFilter;
            }
            if (this.targetId && _instancesByTarget.get(this.targetId) === this) {
                _instancesByTarget.delete(this.targetId);
            }
        }
    }

    // ==============================================
    // AUTO-INITIALIZATION
    // ==============================================

    // A filter is identified by its data-filter-target, not by a container.
    // Tracks the live instances so init is idempotent per target and so
    // getByTarget/getInstance can resolve without depending on a .nds-filter
    // element existing (e.g. a search-only filter).
    const _instancesByTarget = new Map();

    // Construct an instance on `representative` (the element that carries the
    // backref, init-guard attribute, and dispatches the filter's events) and
    // register it by target id.
    function createInstance(representative, surfaces) {
        const instance = new NDSFilter(representative, surfaces);
        representative.ndsFilter = instance;
        representative.setAttribute('data-nds-filter-initialized', 'true');
        if (instance.targetId) {
            _instancesByTarget.set(instance.targetId, instance);
        }
        representative.dispatchEvent(new CustomEvent('nds:filter:ready', {
            detail: instance,
            bubbles: true
        }));
        return instance;
    }

    function initializeFilters() {
        // One filter per unique data-filter-target. Group every linked surface
        // (search box, dropmenu, applied-chips, auto-fill, sort toolbar) by target,
        // then build once per target. The representative is the .nds-filter surface
        // when present — keeping events, backref, and the init guard on it preserves
        // backward compatibility — otherwise the first surface (e.g. a lone search
        // box), so a filter needs no .nds-filter element at all.
        const groups = new Map();
        document.querySelectorAll('[data-filter-target]').forEach(el => {
            if (el.closest('code, .code-example')) return;
            const id = el.getAttribute('data-filter-target');
            if (!id || _instancesByTarget.has(id)) return;
            if (!groups.has(id)) groups.set(id, []);
            groups.get(id).push(el);
        });

        groups.forEach(surfaces => {
            const representative = surfaces.find(el => el.classList.contains('nds-filter')) || surfaces[0];
            createInstance(representative, surfaces);
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
                if (!container) return null;
                // Direct backref (representative element), else resolve via the
                // element's target linkage so any surface element works.
                if (container.ndsFilter) return container.ndsFilter;
                const id = container.getAttribute('data-filter-target');
                return id ? (_instancesByTarget.get(id) || null) : null;
            },

            getByTarget: (targetId) => _instancesByTarget.get(targetId) || null,

            /**
             * Execute callback when a filter is ready, handling the race condition
             * where the filter may already be initialized before the listener is added.
             * @param {string|Element} container - Selector or element (any surface)
             * @param {Function} callback - Receives the filter instance
             */
            whenReady: (container, callback) => {
                if (typeof container === 'string') {
                    container = document.querySelector(container);
                }
                if (!container) return;

                // Already initialized — resolve immediately (backref or target map)
                const existing = NDS.Filter.getInstance(container);
                if (existing) {
                    callback(existing);
                    return;
                }

                // Not yet — ready bubbles from the representative element
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
