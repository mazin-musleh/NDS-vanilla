/* NDS.Filter — public surface
 * Rides: nds-dropmenu (portal, positioning, search, auto-close knobs) · nds-forms (validation)
 *      · nds-pagination · nds-sort · nds-slider · nds-date-picker · nds-accordion
 *        (soft — driven only when present on the filter surface)
 * Methods:
 *   NDS.Filter.init() / .reinit()      scan + initialize filter surfaces
 *   NDS.Filter.create(container)       instance one surface — idempotent, registers the instance
 *   NDS.Filter.getInstance(elOrSel)    resolve the instance from any surface element
 *   NDS.Filter.getByTarget(targetId)   resolve the instance by its data-filter-target id
 *   NDS.Filter.whenReady(el, cb)       run cb with the instance, now or on ready
 *   NDS.Filter.refresh(root)           re-resolve items + regenerate auto filters for every
 *                                      CLIENT-SIDE instance whose target is root, sits inside
 *                                      it, or wraps it — no getByTarget() lookup first. Omit
 *                                      root for all. Form-mode filters are skipped, AJAX or
 *                                      not: the server owns their result set. Prefer
 *                                      NDS.Init.refresh(root),
 *                                      which calls this and every other affected component
 * Events (bubble from the filter surface element):
 *   nds:filter:ready       detail = the instance
 *   nds:filter:change      detail {filter, criteria, totalItems, visibleItems, hiddenItems}
 *   nds:filter:reset       detail {filter, totalItems}
 *   nds:filter:clear       detail {filter}
 *   nds:filterFormSubmit   detail {criteria, form} — cancelable, before a normal form submit
 *   nds:filterFormAjax     detail {criteria, form, hiddenInputsContainer, rollback} — cancelable;
 *                          preventDefault() to send the request yourself (via NDS.request), and call
 *                          detail.rollback() if it fails (chips, badge and URL are already
 *                          committed by then)
 *   nds:filterFormComplete detail {success, form, isJson, data?} — after a successful AJAX apply
 *   nds:filterFormError    detail {error, form} — cancelable; preventDefault() suppresses the toast
 *   nds:formValid          detail {} — dispatched on nds-forms' behalf, so form-level
 *                          listeners work on a filter too
 *   nds:formInvalid        detail {invalidFields, errors} — same, on failed validation
 * Hooks:
 *   data-filter-target · data-filter-items · data-filter · data-filter-type · data-filter-value
 *   data-filter-values · data-filter-legend · data-filter-variant · data-filter-action
 *   data-filter-submit · data-filter-btn · data-filter-query · data-filter-count
 *   data-filter-all-label · data-filter-no-all · data-filter-ignore · data-filter-accordion
 *   data-filter-min · data-filter-max · data-filter-step · data-filter-currency · data-filter-unit
 *   data-filtered · data-total-count · data-ajax · data-chip-class
 * Gotchas:
 *   - Always NDS.Filter.create(); a bare `new NDSFilter` skips the registry, the init stamp
 *     and the ready event, so getInstance/getByTarget/whenReady never see it.
 *   - NDS.Filter rides the delegated bundle, so until that bundle lands NDS.Filter is the
 *     loader's lazy stub and EVERY call on it returns a Promise. getInstance()/getByTarget()
 *     are synchronous reads, so in that gap they hand back a Promise, not an instance —
 *     truthy, with every method undefined. Only whenReady(el, cb) survives it: the stub
 *     bridges the call and the real whenReady runs the callback with the instance. Resolve
 *     through whenReady() from module or deferred script code.
 *   - Every surface (search box, dropmenu, chips, sort toolbar) carries the same
 *     data-filter-target — there is no privileged container element.
 *   - data-filtered is written by the filter to hide an item; CSS owns the hiding. Count
 *     visible items by its absence, never by inline styles.
 *   - nds:filter:change's criteria is NESTED: named filters live under criteria.filters,
 *     the search string under criteria.search — criteria.<name> at the top level reads
 *     undefined.
 *   - Declare data-filter-items only where a live filter exists: a crit rule holds such a
 *     container as skeleton until an instance stamps data-nds-filter-initialized, with no
 *     console warning — NDS.Init.audit() is what reports an unclaimed one. The same audit
 *     flags a .nds-filter carrying no data-filter-target: a surface no instance ever binds,
 *     so its options never render.
 *   - A hidden auto-populated filter defers its option build to first open (data-delay="500"
 *     on the dropmenu, options built on nds:dropmenu:prepare). An empty option list right
 *     after load has not run yet — it is not a broken filter. Open the menu to see it.
 *   - .nds-filter is a pure anchor; submit mode is a SEPARATE form carrying the same target:
 *       <form data-filter-target="results" data-filter-submit method="get">
 *       <div class="nds-filter" data-filter-target="results">…</div>
 *     Without data-ajax the browser submits and the server returns the filtered page; add
 *     data-ajax on that form for AJAX submission instead. The filter stamps form="<that
 *     form's id>" on its own controls, so surfaces outside the form still submit — give
 *     the form an id or the criteria never leave the page.
 *     Criteria that no control carries — a range filter's encoded value, an unnamed
 *     search box — are written into .nds-filter-hidden-inputs on each submit, keyed
 *     like the URL param, so the request matches this.criteria. A filter whose own
 *     inputs are named is left alone (auto-generated options submit `filter-{name}`,
 *     not `{name}`). nds:filterFormAjax exposes that container as
 *     hiddenInputsContainer; add your own fields to it there.
 *   - Sort is NOT criteria and never rides the request — by design, not a gap.
 *     ONE question decides who owns the order: does the server return all matching
 *     rows, or one page? All rows (the client pages them via data-auto-pagination)
 *     → CLIENT sort: author data-sort triggers, which ARE the client-side engine.
 *     One page (a data-page-url nav) → SERVER sort: author no data-sort at all
 *     (with no triggers setupSort() returns early and no engine is created) and
 *     give the form your own named control — <select name="sort"> rides FormData
 *     like any criterion, and the server's row order arrives untouched.
 *     The presence of data-sort IS the switch, so the two cannot conflict; author
 *     both and a client reorder lands on top of a server-paged response, sorting
 *     that page only. Measured in scripts/check-filter-sort-ownership.mjs.
 *   - Auto-generated options come from _buildFilterInput(): div.nds-form-container plus
 *     nds-{check,radio,switch}-container, wrapping div.nds-form-header > label[for] >
 *     span.nds-label and div.nds-form-control > the input. Hand-written options must match
 *     that shape — read the generator, do not guess it.
 *   - Resetting is markup, not JS: a [data-filter-action="reset"] button inside the surface
 *     clears every input and re-emits nds:filter:change. Hand-clearing fields + syncState
 *     repaints only — it dispatches nothing.
 */

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
 * - Inside dropmenu: applies on the Apply button, or on Enter in the dropmenu search
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

            // Portal-safe identifier on the filter's own dropmenu menu (rule: a
            // component-owned menu names itself so styling/hooks survive the menu
            // portaling to <body>). The .nds-filter anchor IS the dropmenu wrapper
            // when filters render in a dropdown; the own-descendant check skips a
            // nested sub-component's menu (e.g. a multiselect used as a control).
            this._targetRoots.forEach(root => {
                if (!root.matches || !root.matches('.nds-dropmenu')) return;
                root.querySelectorAll('.nds-dropmenu-menu').forEach(m => {
                    if (m.closest('.nds-dropmenu') === root) m.classList.add('nds-filter-menu');
                });
            });

            // Get all filterable items (empty array if no target)
            this.items = this.resolveItems();

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

        // Items belong to the container itself, so the caller never has to write a
        // defensive selector. For a <tbody> that means its own rows: a nested table
        // inside an expanded sub-row has rows of its own that are never this table's
        // items, and a detail row is part of its parent rather than an item in its
        // own right. Non-table containers are untouched, where a wrapper between the
        // container and its cards is normal.
        resolveItems() {
            if (!this.targetContainer) return [];
            const items = Array.from(this.targetContainer.querySelectorAll(this.getItemSelector()));
            if (this.targetContainer.tagName !== 'TBODY') return items;
            return items.filter(el =>
                el.parentElement === this.targetContainer && !el.classList.contains('nds-sub'));
        }

        getItemSelector() {
            const ref = this.targetContainer?.getAttribute('data-filter-items');
            if (!ref) return '.nds-card';
            // Canonical form is a bare class (matches data-filter-target / data-auto-pagination
            // style). Selectors with punctuation pass through unchanged for back-compat; bare
            // tokens resolve as a class first, then fall back to a tag selector (e.g. "tr").
            if (/[.#\[:\s>+~,*=]/.test(ref)) return ref;
            return this.targetContainer.querySelector(`.${ref}`) ? `.${ref}` : ref;
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
         * regions, not the page. NDS.queryAll rather than root.querySelectorAll:
         * a filter dropmenu may carry data-portal, which moves its menu to
         * <body> while open — every control inside it would otherwise drop out
         * of every post-init re-resolve (refresh, sort triggers, count slot).
         */
        queryAll(selector) {
            const set = new Set();
            for (const root of this._targetRoots) {
                if (root.matches(selector)) set.add(root);
                NDS.queryAll(root, selector).forEach(el => set.add(el));
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
                // Both branches read the form's named controls — AJAX through
                // FormData, native through the browser — so criteria that no
                // control carries must exist as real inputs before either runs.
                this._writeCriteriaInputs();

                if (this.isAjaxMode) {
                    e.preventDefault();
                    this.handleAjaxSubmit();
                } else {
                    this.handleFormSubmit(e);
                }
            }, { signal: this.abortController.signal });
        }

        /**
         * Fill .nds-filter-hidden-inputs so the submission carries everything
         * this.criteria claims. A range filter renders two unnamed thumbs for one
         * encoded value, so nothing about it reaches the server otherwise — while
         * its chip, badge and URL param all say it is applied. Rebuilt on every
         * submit; the key is the one updateUrlParams writes, so the request and
         * the URL agree.
         *
         * Only fills genuine gaps. A filter whose own controls already put
         * something in the form is left alone even when they use a different key
         * (auto-generated options submit `filter-{name}`) — reconciling that key
         * would rename a parameter consumers may already read.
         */
        _writeCriteriaInputs() {
            const box = this.hiddenInputsContainer;
            if (!box) return;
            box.textContent = '';

            const add = (name, value) => {
                if (!name) return;
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = value;
                box.appendChild(input);
            };

            for (const [name, values] of Object.entries(this.criteria.filters)) {
                if (values.length && !this._filterReachesForm(name)) {
                    add(name, values.join(','));
                }
            }

            // The direct search box is the form-associated one (setupDirectSearch);
            // an unnamed one submits nothing, so carry the keyword here instead.
            if (this.criteria.search && !this.searchInputs.direct?.input.name) {
                add(this.getSearchInputName(), this.criteria.search);
            }
        }

        // Does this filter's own markup put anything in the form, under any key?
        // A range never does — two thumbs, no name, one encoded value between them.
        _filterReachesForm(filterName) {
            const fd = this.filterInputs[filterName];
            if (!fd || fd.type === 'range') return false;
            return Array.from(fd.inputs || []).some(input => input.name);
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
                    detail: { invalidFields: result.invalidFields, errors: result.errors },
                    bubbles: true
                }));
                return;
            }

            // Dispatch preventable event
            const submitEvent = new CustomEvent('nds:filterFormSubmit', {
                detail: {
                    criteria: this.criteria,
                    form: this.submissionForm
                },
                cancelable: true,
                bubbles: true
            });

            const shouldContinue = this.filterContainer.dispatchEvent(submitEvent);

            if (!shouldContinue) {
                e.preventDefault();
                return;
            }

            NDS.State.set(this.filterContainer, 'submitting');
            this._showTriggerLoading();

            this.filterContainer.dispatchEvent(new CustomEvent('nds:formValid', {
                detail: {},
                bubbles: true
            }));
        }

        /**
         * Handle AJAX form submission. Thin orchestrator — each step lives in
         * a private helper so the fetch chain stays scannable. Only form-mode
         * AJAX filters reach this; it never runs at first paint.
         */
        handleAjaxSubmit() {
            // Snapshot the applied state BEFORE updateUrlParams overwrites it. The
            // URL is the component's own record of what is currently applied, and
            // applyUrlParams() can rebuild criteria + controls + chips from it — so
            // one string is the whole rollback. Taken here, after a reset() has
            // already cleared the controls but before the URL is rewritten, so a
            // failed Clear restores the filters it was about to drop.
            const appliedUrl = window.location.search;

            this._commitAppliedUi();

            // Unified change event (fires in all modes)
            this.dispatchFilterEvent();

            // Dispatch preventable AJAX submit event
            const ajaxEvent = new CustomEvent('nds:filterFormAjax', {
                detail: {
                    criteria: this.criteria,
                    form: this.submissionForm,
                    hiddenInputsContainer: this.hiddenInputsContainer,
                    // Chips, badge and URL are already committed above, so a
                    // consumer who preventDefaults and then fails has no way back
                    // to the state the displayed results represent. Same rollback
                    // the built-in path runs — theirs to call from a .catch.
                    rollback: () => this._rollbackApplied(appliedUrl)
                },
                cancelable: true,
                bubbles: true
            });
            if (!this.filterContainer.dispatchEvent(ajaxEvent)) return;

            NDS.State.set(this.filterContainer, 'submitting');
            this._showTriggerLoading();
            if (this.targetContainer) this.targetContainer.classList.add('nds-loading');

            const { url, options } = this._buildAjaxRequest();
            // 4MB — an HTML fragment is legitimately larger than a JSON payload,
            // so the shared default is raised here rather than for everyone. A
            // ceiling against a runaway response, not a target.
            NDS.request(url, { ...options, maxBytes: 4194304 })
                .then(({ isJson, data }) => {
                    const eventDetail = this._applyAjaxResponse({ isJson, data });
                    this._finishAjaxSubmit(eventDetail, isJson);
                })
                .catch(error => this._handleAjaxError(error, appliedUrl));
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
                this.items = this.resolveItems();
                this._cacheBuilt = false;
                this._resyncSort();
                this._revealTargetContainer();
                eventDetail.html = newContainer.innerHTML;
            } else {
                // A 200 with no usable container is a server/config fault, not a
                // result. Throwing routes it to _handleAjaxError, which settles the
                // UI exactly like a timeout — the previous results stay on screen
                // rather than being wiped for a response that carried nothing.
                console.warn(`NDS Filter: response contained no #${this.targetId}. Leaving the target untouched.`);
                throw new Error(`Response contained no #${this.targetId}`);
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
            // A swapped-in container arrives without the init stamp, and the crit
            // hold in _skeleton.scss keys on exactly that attribute — so a fresh
            // result set would render visibility:hidden and never come back.
            this.targetContainer.setAttribute('data-nds-filter-initialized', 'true');
        }

        /**
         * Settle UI state after a successful response: clear loading, refresh
         * dependent UI, fire the complete event.
         */
        _finishAjaxSubmit(eventDetail, isJson) {
            if (this.targetContainer) {
                this.targetContainer.classList.remove('nds-loading');
            }

            NDS.State.clear(this.filterContainer);
            if (this._triggerBtn) { NDS.State.remove(this._triggerBtn, 'loading'); this._triggerBtn = null; }

            this._commitAppliedUi();

            this.filterContainer.dispatchEvent(new CustomEvent('nds:filterFormComplete', {
                detail: eventDetail,
                bubbles: true
            }));

            // JSON developers render inside the complete-event handler and may set
            // data-total-count on the target container there — re-run the count so
            // the slots reflect their updates.
            if (isJson) this.updateFilterCount();
        }

        /**
         * Settle UI state on AJAX failure. AbortError is silent — the newer
         * request that aborted us owns the loading state. A timeout is NOT
         * silent: NDS.request aborts it with a TimeoutError, so it lands here
         * and releases the UI instead of parking it in `submitting` forever.
         */
        _handleAjaxError(error, appliedUrl) {
            if (error.name === 'AbortError') return;

            console.error('NDS Filter: AJAX submission failed:', error);

            if (this.targetContainer) {
                this.targetContainer.classList.remove('nds-loading');
            }

            if (appliedUrl !== undefined) this._rollbackApplied(appliedUrl);

            NDS.State.clear(this.filterContainer);
            if (this._triggerBtn) { NDS.State.remove(this._triggerBtn, 'loading'); this._triggerBtn = null; }

            // Cancelable so a consumer with its own error UI can suppress the
            // toast — same opt-out idiom as nds:filterFormAjax.
            const shouldToast = this.filterContainer.dispatchEvent(new CustomEvent('nds:filterFormError', {
                detail: {
                    error: error.message,
                    form: this.filterContainer
                },
                cancelable: true,
                bubbles: true
            }));
            if (shouldToast) this._showAjaxErrorToast();
        }

        /**
         * Put the applied-filter state back where it was before a failed submission.
         * The results on screen never changed, so the chips, badge, controls and URL
         * must not either — a failed Clear that still emptied the chips would claim
         * no filters while filtered results are displayed.
         *
         * Restores from the snapshotted URL because applyUrlParams() is the same
         * path that rebuilds this state on page load, so every control type it
         * already handles (checkbox, radio, range) is covered for free. Clear first:
         * applyUrlParams only sets what the params contain, it never unsets.
         */
        _rollbackApplied(appliedUrl) {
            window.history.replaceState({}, '', (appliedUrl
                ? `${window.location.pathname}${appliedUrl}`
                : window.location.pathname) + window.location.hash);

            this._mirrorSearchInputs('');
            this.criteria.search = '';
            this._resetFilterInputs();
            this.applyUrlParams();

            // applyUrlParams re-renders these only when the URL had params; call
            // them unconditionally so a rollback to "nothing applied" lands too.
            // Both are pure renders, so the double call when params exist is free.
            this.updateFilterButtonBadge();
            this.updateAppliedChips();
            this.updateApplyButtonLabel();
        }

        /**
         * Announce an AJAX failure. Without this the only signal is a border tint
         * on the search input, which reads as "nothing happened" — and since the
         * results are deliberately left in place, nothing else on screen moves.
         * The message stays generic: the actionable detail (a bad endpoint, a
         * response missing the target) is a server fault the end user can't fix,
         * so it goes to console.error above and no further.
         */
        _showAjaxErrorToast() {
            const alertId = `nds-filter-ajax-error-${this.targetId}`;
            // Soft dependency + id dedupe, both mirroring showNoResultsAlert: skip
            // if NDS.Alert isn't bundled, and don't stack a duplicate id when a
            // retry fails while the first toast is still up.
            if (document.getElementById(alertId) || !NDS.Alert) return;

            const isArabic = NDS.isArabic;
            NDS.Alert.create({
                display: 'toast',
                variant: 'error',
                title: isArabic ? 'تعذر تحديث النتائج' : 'Could not update results',
                description: isArabic
                    ? 'حدث خطأ أثناء تطبيق التصفية. النتائج المعروضة لم تتغير.'
                    : 'Something went wrong applying the filter. The results shown are unchanged.',
                id: alertId,
                // The toast is the only failure signal — the results on screen
                // are unchanged, so nothing else marks the page.
                duration: 5000
            });
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
                this._mirrorSearchInputs(sanitized);
                hasParams = true;
            }

            // Sort URL params (?sort=…&dir=…) are owned by NDS.Sort (see setupSort);
            // it reads them in its init which runs after applyUrlParams completes.

            // Apply dynamic filter params — plain input names as URL keys
            for (const [key, value] of params.entries()) {
                if (key === searchParamName || key === 'sort' || key === 'dir') continue;

                if (this.filterInputs[key]) {
                    if (this.filterInputs[key].type === 'range') {
                        this._applyRangeFromUrl(key, value);
                    } else {
                        this._checkInputsForValues(this.filterInputs[key], value);
                        this.updateFilterCriteria(key);
                    }
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
        //
        // Only checkbox/switch groups hold several values, so only their param is
        // a comma-joined list. A radio group carries one value or none — its param
        // is whatever updateUrlParams wrote for the single checked input, matched
        // whole. Splitting it broke options whose own value contains commas
        // (value="1,2,3", one option standing for a group of ids). Comma-bearing
        // values stay unsupported on checkbox/switch, where comma is the delimiter.
        _checkInputsForValues(filterData, rawValue) {
            const values = filterData.type === 'radio'
                ? [this.sanitizeFilterValue(rawValue).trim()]
                : rawValue.split(',').map(v => this.sanitizeFilterValue(v).trim());
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
                this.updateFilterButtonBadge();
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

            for (const key of managedKeys) {
                params.delete(key);
            }

            if (this.criteria.search) {
                params.set(searchParamName, this.criteria.search);
            }

            for (const [filterName, values] of Object.entries(this.criteria.filters)) {
                if (values.length > 0) {
                    params.set(filterName, values.join(','));
                }
            }

            // Keep the hash: a hash-routed app stores its route there, and rebuilding
            // the URL from pathname+search alone drops it on every filter change.
            const newUrl = (params.toString()
                ? `${window.location.pathname}?${params.toString()}`
                : window.location.pathname) + window.location.hash;

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
                // even if the button isn't natively form-associated. Spin the
                // always-visible filter trigger, not this apply button — the
                // dropmenu closes on apply and hides it.
                if (this.isFormMode) {
                    e.preventDefault();
                    this.submitForm(this._resolveFilterBtn() || this.applyButton);
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

        // Re-root the sort engine when the container it was created on is no longer
        // the live one — an AJAX response and refresh() both replace or re-resolve
        // targetContainer, leaving the old instance driving a detached node while
        // its triggers still fire. Both paths route here so only one has to remember.
        _resyncSort() {
            if (this.sort && this.sort.root !== this.targetContainer) {
                this.sort.destroy();
                this.sort = null;
            }
            if (!this.sort) this.setupSort();
        }

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

        // The always-visible filter dropmenu trigger (.nds-filter-btn). Cached on
        // first resolve — walked once, not on every filter change.
        _resolveFilterBtn() {
            if (this.filterButtonEl === undefined) {
                this.filterButtonEl = this.query('.nds-filter-btn, [data-filter-btn], .filter-btn');
            }
            return this.filterButtonEl;
        }

        updateFilterButtonBadge() {
            const filterBtn = this._resolveFilterBtn();
            if (!filterBtn) return;

            NDS.badge(filterBtn, this.getAppliedFilterCount());
        }

        updateAppliedChips() {
            // Refresh filter-count slots (query + count) regardless of whether
            // an applied-chips container exists on this page.
            this.updateFilterCount();
            this._updateAccordionCounts();

            const appliedContainer = this.appliedContainer;
            if (!appliedContainer) return;

            // Find chips container inside applied container
            const chipsContainer = appliedContainer.querySelector('.nds-chips');
            if (!chipsContainer) return;

            // Find auto-fill container (optional): external first, then internal.
            // Portal-aware: an auto-fill nested inside the menu leaves the
            // wrapper's subtree while a data-portal dropmenu is open.
            const autoFillContainer = this.autoFillElement
                || NDS.querySelector(this.filterContainer, '.nds-auto-fill');

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
                const filterData = this.filterInputs[filterName];
                // Range filters render one chip for the whole span; removing it
                // restores the full bounds rather than unchecking an input.
                if (filterData?.type === 'range') {
                    if (values.length) {
                        const chip = this.createFilterChip(filterName, values[0], () => {
                            this.resetRangeFilter(filterName);
                        }, this._buildRangeChipLabel(filterName, values[0]));
                        chipsContainer.appendChild(chip);
                    }
                    continue;
                }
                values.forEach(value => {
                    const displayLabel = filterData?.labels?.[value.toLowerCase()] || value;
                    const chip = this.createFilterChip(filterName, value, () => {
                        this.removeFilterValue(filterName, value);
                    }, displayLabel);
                    chipsContainer.appendChild(chip);
                });
            }
        }

        // Whether anything is filtering right now. One derivation for both
        // readers — the count slot (which skips its scan when nothing filters)
        // and applyFilters (which skips filtering entirely). If they disagree,
        // the slot reports the unfiltered total beside a filtered grid.
        _hasActiveCriteria() {
            return !!(this.criteria.search && this.criteria.search.trim() !== '')
                || Object.values(this.criteria.filters).some(arr => arr.length > 0);
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
            if (!this._hasActiveCriteria()) {
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

        // displayLabel may be a DOM node (range chips render formatted
        // nds-number-format price nodes) or a plain string — NDS.buildChip
        // accepts both.
        createFilterChip(type, value, onRemove, displayLabel) {
            return NDS.buildChip(displayLabel || value, {
                chipClass: this.chipClass,
                data: { filterType: type, filterValue: value },
                onRemove,
            });
        }

        removeSearchFilter() {
            this.criteria.search = '';

            this._mirrorSearchInputs('');
            if (this.searchInputs.dropmenu) this.updateApplyButtonLabel();

            this._commitCriteriaChange();
        }

        removeFilterValue(filterName, value) {
            const filterData = this.filterInputs[filterName];
            if (!filterData) return;

            filterData.inputs.forEach(input => {
                if (input.value.toLowerCase() === value.toLowerCase()) {
                    input.checked = false;
                }
            });
            this._recheckAllRadio(filterData);

            this.updateFilterCriteria(filterName);
            this.updateApplyButtonLabel();

            this._commitCriteriaChange();
        }

        // A radio group must never sit with nothing checked: unchecking its
        // chosen option restores the auto-prepended "All" (value=""), which
        // updateFilterCriteria then reads as no filter. No-op for the other
        // types — only radios get an All option, and only radios can't self-clear.
        _recheckAllRadio(filterData) {
            if (filterData.type !== 'radio') return;
            // inputs is a NodeList (querySelectorAll) — wrap before .some/.find,
            // matching updateFilterCriteria's Array.from use.
            const inputs = Array.from(filterData.inputs);
            // Only the empty group needs restoring: setFilterValues may have just
            // checked a real option, and checking All would silently unselect it
            // (same-name radios are mutually exclusive in the DOM).
            if (inputs.some(input => input.checked)) return;
            const allInput = inputs.find(input => input.value === '');
            if (allInput) allInput.checked = true;
        }

        setupFilterElements() {
            // queryAll already excludes elements inside the target container
            // (e.g. <span data-filter> markers on cards).
            const filterElements = this.queryAll('[data-filter]');
            const params = new URLSearchParams(window.location.search);
            const deferringMenus = this._classifyDeferringMenus(filterElements, params);
            filterElements.forEach(element => this._dispatchFilterElement(element, params, deferringMenus));
            this._flushAccordionInit();
            this._autoDetectDirectSearch();
            this._wireDeferredFilterDropmenus();
        }

        // Dropmenus that will defer an auto-populated filter (hidden + not
        // URL-active). Their first open already pays a prepare/delay pass, so a
        // static-values filter in the same menu can defer its DOM build onto that
        // same hook for free. A static filter in a menu that wouldn't otherwise
        // defer stays eager — deferring it would add a needless first-open delay
        // for no real init saving (static builds skip the collectFilterValues scan).
        _classifyDeferringMenus(filterElements, params) {
            const deferringMenus = new Set();
            filterElements.forEach(element => {
                const type = element.getAttribute('data-filter-type');
                if (!type || type === 'slider' || element.hasAttribute('data-filter-values')) return;
                const name = element.getAttribute('data-filter');
                const menu = element.closest('.nds-dropmenu-menu');
                if (menu && !params.has(name)) deferringMenus.add(menu);
            });
            return deferringMenus;
        }

        _dispatchFilterElement(element, params, deferringMenus) {
            const filterName = element.getAttribute('data-filter');
            const filterType = element.getAttribute('data-filter-type');

            if (filterName === 'search') {
                this.setupSearchFilter(element);
                return;
            }
            if (filterType === 'slider') {
                this.setupRangeFilter(element, filterName);
                return;
            }
            if (filterType === 'checkbox' || filterType === 'radio' || filterType === 'switch') {
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
                // _classifyDeferringMenus above). The parsed `values` ride along so
                // the prepare hook builds without re-reading the attribute. URL-active
                // filters fall through to the eager build so applyUrlParams can check
                // inputs on load.
                const menu = element.closest('.nds-dropmenu-menu');
                const canDefer = !!menu && !params.has(filterName)
                    && (!values || deferringMenus.has(menu));
                if (canDefer) {
                    this._deferredFilters.push({ element, filterName, filterType, values });
                } else {
                    this.setupDynamicFilter(element, filterName, filterType, values);
                }
                return;
            }
            this.setupManualFilter(element, filterName);
        }

        // Auto-detect direct search input (anywhere linked to this filter).
        _autoDetectDirectSearch() {
            if (this.searchInputs.direct) return;
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
                return;
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
        _wireDeferredFilterDropmenus() {
            if (!this._deferredFilters.length) return;
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
            this._flushAccordionInit();
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
            // Both entry paths land here — the explicit data-filter="search"
            // element and _autoDetectDirectSearch — so the form association is
            // set once. The dropmenu search is deliberately left out: its value
            // is mirrored onto this input before submit, and naming both would
            // put two `search` entries in the same FormData.
            this._associateWithForm(searchInput);
            const searchContainer = searchInput.closest('.nds-search-box, .nds-form-control')?.parentElement ||
                                   searchInput.closest('.nds-search-content')?.parentElement ||
                                   searchInput.parentElement;
            const searchBtn = searchContainer?.querySelector(
                'button.nds-search-btn, button[type="submit"], button:has(.nds-hgi-search-01)'
            );
            this.directSearchBtn = searchBtn || null;

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

            // In form mode, submit the form directly (spinner on the search button)
            if (this.isFormMode) {
                this.submitForm(this.directSearchBtn);
                return;
            }

            // Client-side mode: apply filters
            this.applyFilters();
        }

        // Spin the current trigger button, first clearing any other trigger that
        // was left spinning by an overlapping submit — only one spins at a time.
        // Clear-then-add are adjacent here so the current button always ends up
        // stamped (never removed-without-re-add).
        _showTriggerLoading() {
            [this.filterButtonEl, this.directSearchBtn].forEach(btn => {
                if (btn && btn !== this._triggerBtn) NDS.State.remove(btn, 'loading');
            });
            if (this._triggerBtn) NDS.State.add(this._triggerBtn, 'loading');
        }

        /**
         * Submit the form (only called from user actions, not programmatically)
         */
        submitForm(triggerBtn) {
            if (!this.submissionForm) return;
            // This call is the submission, so drop any commit queued in the same
            // tick — a setter followed by submitForm() sends one request.
            this._commitQueued = false;
            // Track which button triggered this submit so its spinner shows at
            // submit and clears via the AJAX lifecycle (native submits self-clear
            // on navigation). null for programmatic submits with no button.
            this._triggerBtn = triggerBtn || null;

            // Dismiss any feedback in filter container
            // Soft dependency — filter skips feedback dismissal if NDS.Feedback isn't bundled.
            if (NDS.Feedback) {
                NDS.Feedback.dismissAll(this.filterContainer);
            }

            // requestSubmit, never .submit(): .submit() skips the submit event, so
            // setupFormSubmission's listener never fires — validation is bypassed and
            // AJAX mode silently degrades to a full-page navigation. The old fallback
            // only ever reached Safari 15.4–15.6 (this file already requires :has()
            // in querySelector), where it submitted wrongly instead of failing loudly.
            this.submissionForm.requestSubmit();
        }

        updateClearButtonVisibility(input, clearBtn) {
            if (!clearBtn) return;
            clearBtn.hidden = !input.value.trim();
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
                this._associateWithForm(input);
                input.addEventListener('change', () => {
                    this.updateFilterCriteria(filterName);
                    this.updateApplyButtonLabel();
                }, { signal: element._ndsFilterAC.signal });
            });
        }

        // ==============================================
        // SLIDER FILTER (numeric range — data-filter-type="slider")
        // ==============================================
        // A slider (NDS.Slider) acting as a filter input. Mode is inferred from the
        // bounds: data-filter-min + data-filter-max → dual range (two thumbs);
        // data-filter-max alone → single "up to" (one thumb, floor 0). Each item
        // carries its numeric value on a [data-filter="name" data-filter-value="N"]
        // marker. Criteria holds one encoded "lo-hi" string (single pins lo to the
        // floor) when narrower than full bounds (empty = inactive), so the existing
        // count / chip / URL machinery treats it like a single-value filter.

        setupRangeFilter(element, filterName) {
            const root = this.generateRangeControl(element, filterName);
            if (!root) return;

            const container = root.querySelector('.nds-slider-container');
            // Single ("up to") has one .nds-slider thumb; dual has .nds-slider-min/-max.
            const single = !container.classList.contains('nds-slider-range');
            const minInput = single ? null : container.querySelector('.nds-slider-min');
            const maxInput = single ? container.querySelector('.nds-slider') : container.querySelector('.nds-slider-max');

            if (!this.criteria.filters[filterName]) this.criteria.filters[filterName] = [];

            this.filterInputs[filterName] = {
                type: 'range',
                single,
                element: root,
                controlContainer: container,
                minInput,
                maxInput,
                min: parseFloat(maxInput.min),
                max: parseFloat(maxInput.max),
                currency: root.getAttribute('data-filter-currency') || '',
                unit: root.getAttribute('data-filter-unit') || ''
            };

            // Per-element controller mirrors setupManualFilter so destroy()
            // releases the thumb listener(s) atomically.
            if (root._ndsFilterAC) root._ndsFilterAC.abort();
            root._ndsFilterAC = new AbortController();
            this._filterElementACs.add(root);

            const onInput = () => {
                this.updateRangeCriteria(filterName);
                this.updateApplyButtonLabel();
            };
            if (minInput) minInput.addEventListener('input', onInput, { signal: root._ndsFilterAC.signal });
            maxInput.addEventListener('input', onInput, { signal: root._ndsFilterAC.signal });

            // Filter builds the slider, so it kicks off Slider for it (the loader
            // only auto-inits Slider when a static .nds-slider exists at load).
            // init() is idempotent. Cross-bundle safe via the loader's lazy stub:
            // same bundle = synchronous paint; separate bundle = the stub auto-loads
            // Slider and paints async. Fire-and-forget — never a sync read of NDS.Slider.
            if (NDS.Slider && NDS.Slider.init) NDS.Slider.init();
        }

        // Replace the placeholder with a fieldset holding the canonical slider
        // markup (see components/slider.md). Mode is inferred from the bounds:
        // both data-filter-min + data-filter-max → dual range (two thumbs);
        // data-filter-max alone → single "up to" (one thumb, floor 0).
        generateRangeControl(placeholder, filterName) {
            const hasMin = placeholder.hasAttribute('data-filter-min');
            const hasMax = placeholder.hasAttribute('data-filter-max');
            const min = hasMin ? parseFloat(placeholder.getAttribute('data-filter-min')) : 0;
            const max = parseFloat(placeholder.getAttribute('data-filter-max'));
            if (!hasMax || isNaN(min) || isNaN(max) || max <= min) {
                console.warn(`NDS Filter: slider filter "${filterName}" needs data-filter-max (add data-filter-min for a dual range; max alone = single "up to").`);
                return null;
            }
            const single = !hasMin;
            const step = placeholder.getAttribute('data-filter-step') || '1';
            const legendText = placeholder.getAttribute('data-filter-legend') || '';
            const currency = placeholder.getAttribute('data-filter-currency') || '';
            const unit = placeholder.getAttribute('data-filter-unit') || '';
            const isInDropmenu = placeholder.closest('.nds-dropmenu-menu') !== null;

            const fieldset = document.createElement('fieldset');
            fieldset.className = 'nds-form-group nds-filter-range';
            if (currency) fieldset.setAttribute('data-filter-currency', currency);
            if (unit) fieldset.setAttribute('data-filter-unit', unit);
            if (isInDropmenu) {
                fieldset.classList.add('nds-dropmenu-group');
                fieldset.setAttribute('data-no-auto-close', '');
            }
            if (legendText) {
                const legend = document.createElement('legend');
                legend.className = 'nds-label';
                legend.textContent = legendText;
                fieldset.appendChild(legend);
            }

            const container = document.createElement('div');
            container.className = 'nds-slider-container nds-form-container nds-stacked' + (single ? '' : ' nds-slider-range');

            const fmt = { currency, unit };
            const control = document.createElement('div');
            control.className = 'nds-form-control';
            const track = document.createElement('div');
            track.className = 'nds-slider-track';

            if (single) {
                // One thumb resting at max — the filter is off until dragged down.
                track.appendChild(this._buildRangeInput(null, min, max, step, max, NDS.isArabic ? 'القيمة القصوى' : 'Maximum value'));
                control.appendChild(track);
                control.appendChild(this._buildRangeOutput(null, fmt, max));
            } else {
                control.appendChild(this._buildRangeOutput('min', fmt, min));
                track.appendChild(this._buildRangeInput('min', min, max, step, min, NDS.isArabic ? 'الحد الأدنى' : 'Minimum'));
                track.appendChild(this._buildRangeInput('max', min, max, step, max, NDS.isArabic ? 'الحد الأقصى' : 'Maximum'));
                control.appendChild(track);
                control.appendChild(this._buildRangeOutput('max', fmt, max));
            }
            container.appendChild(control);
            fieldset.appendChild(container);

            placeholder.replaceWith(fieldset);
            return fieldset;
        }

        _buildRangeOutput(which, fmt, value) {
            const out = document.createElement('output');
            const formatted = fmt.currency || fmt.unit;
            out.className = `nds-slider-value${which ? ' nds-slider-value-' + which : ''}${formatted ? ' nds-number-format' : ''}`;
            if (fmt.currency) out.setAttribute('data-currency', fmt.currency);
            if (fmt.unit) out.setAttribute('data-unit', fmt.unit);
            out.textContent = String(value);
            return out;
        }

        _buildRangeInput(which, min, max, step, value, ariaLabel) {
            const input = document.createElement('input');
            input.type = 'range';
            input.className = which ? `nds-slider nds-slider-${which}` : 'nds-slider';
            input.min = min;
            input.max = max;
            input.step = step;
            input.value = value;
            input.setAttribute('aria-label', ariaLabel);
            return input;
        }

        // Read both thumbs into criteria. Empty (inactive) when the span covers the
        // full bounds; otherwise one "lo-hi" encoded string.
        updateRangeCriteria(filterName) {
            const fd = this.filterInputs[filterName];
            if (!fd || fd.type !== 'range') return;
            let lo, hi;
            if (fd.single) {
                // "Up to": lo pinned to the floor, hi = the single thumb.
                lo = fd.min;
                hi = parseFloat(fd.maxInput.value);
                if (isNaN(hi)) hi = fd.max;
            } else {
                lo = parseFloat(fd.minInput.value);
                hi = parseFloat(fd.maxInput.value);
                if (isNaN(lo)) lo = fd.min;
                if (isNaN(hi)) hi = fd.max;
                if (lo > hi) { const t = lo; lo = hi; hi = t; }
            }
            this.criteria.filters[filterName] = (lo <= fd.min && hi >= fd.max) ? [] : [lo + '-' + hi];
        }

        // Write both thumbs and repaint the slider fill. NDS.Slider is a soft
        // dependency — when absent the values still land on the inputs and the
        // slider paints from them on its own init.
        _setRangeValues(filterName, lo, hi) {
            const fd = this.filterInputs[filterName];
            if (!fd || fd.type !== 'range') return;
            if (fd.single) {
                fd.maxInput.value = hi;          // single: only the cutoff thumb (lo is pinned)
            } else {
                fd.minInput.value = lo;
                fd.maxInput.value = hi;
            }
            if (NDS.Slider && NDS.Slider.reinit) NDS.Slider.reinit(fd.controlContainer);
            this.updateRangeCriteria(filterName);
        }

        // Decode "lo-hi"; '-' is the delimiter, so each bound may carry its own
        // leading '-' (negative ranges). null if not a numeric pair.
        _parseEncodedRange(str) {
            const m = /^(-?\d*\.?\d+)-(-?\d*\.?\d+)$/.exec(str || '');
            return m ? [parseFloat(m[1]), parseFloat(m[2])] : null;
        }

        _applyRangeFromUrl(filterName, raw) {
            const fd = this.filterInputs[filterName];
            if (!fd || fd.type !== 'range') return;
            const pair = this._parseEncodedRange(this.sanitizeFilterValue(raw));
            if (!pair) return;
            let [lo, hi] = pair;
            lo = Math.min(Math.max(lo, fd.min), fd.max);
            hi = Math.min(Math.max(hi, fd.min), fd.max);
            if (lo > hi) { const t = lo; lo = hi; hi = t; }
            this._setRangeValues(filterName, lo, hi);
        }

        _itemMatchesRange(item, filterName, encoded) {
            const pair = this._parseEncodedRange(encoded);
            if (!pair) return true;
            const [lo, hi] = pair;
            const itemValues = item._ndsFilterValues?.[filterName];
            if (!itemValues || !itemValues.length) return false;
            const v = parseFloat(itemValues[0]);
            if (isNaN(v)) return false;
            return v >= lo && v <= hi;
        }

        // Build the chip label as nds-number-format nodes so a range chip renders
        // exactly like the card tags / slider outputs — currency icon (CSS ::after
        // on [data-currency]) + thousand separators (NDS.Numbers) — not a string.
        _buildRangeChipLabel(filterName, encoded) {
            const fd = this.filterInputs[filterName];
            // Same decoder the URL and matching paths use, so a negative floor
            // ("-20-15") splits at the delimiter rather than the leading sign.
            const pair = this._parseEncodedRange(encoded);
            if (!pair) return null;  // chip falls back to the raw encoded value
            const frag = document.createDocumentFragment();
            // Single ("up to") shows just the cutoff with a ≤ prefix; dual shows lo – hi.
            if (fd && fd.single) {
                const le = document.createElement('span');
                le.textContent = '≤ ';
                frag.appendChild(le);
                frag.appendChild(this._buildRangeValueNode(String(pair[1]), fd));
                return frag;
            }
            frag.appendChild(this._buildRangeValueNode(String(pair[0]), fd));
            const sep = document.createElement('span');
            sep.textContent = ' – ';
            frag.appendChild(sep);
            frag.appendChild(this._buildRangeValueNode(String(pair[1]), fd));
            return frag;
        }

        _buildRangeValueNode(value, fd) {
            const span = document.createElement('span');
            span.className = 'nds-number-format';
            if (fd && fd.currency) span.setAttribute('data-currency', fd.currency);
            if (fd && fd.unit) span.setAttribute('data-unit', fd.unit);
            span.textContent = value;
            // Soft dependency — range chips render unformatted if NDS.Numbers isn't bundled.
            if (NDS.Numbers && NDS.Numbers.format) NDS.Numbers.format(span);
            return span;
        }

        // Chip-remove / clear handler for a range filter: restore the full span.
        resetRangeFilter(filterName) {
            const fd = this.filterInputs[filterName];
            if (!fd || fd.type !== 'range') return;
            this._setRangeValues(filterName, fd.min, fd.max);
            this.updateApplyButtonLabel();
            this._commitCriteriaChange();
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
            // Per-group opt-in: turn this fieldset into a collapsible
            // accordion item (legend → header button, fields → body). Reuse
            // the closest .nds-accordion ancestor if the author grouped
            // several under one; otherwise each group gets its own root.
            const collapsible = container.hasAttribute('data-filter-accordion');

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
                // Row-level search opt-in gated on the parent dropmenu opting in.
                searchable: isInDropmenu && !!container.closest('.nds-dropmenu[data-search]'),
            };

            values.forEach((value, index) => {
                fieldset.appendChild(this._buildFilterInput(value, index, ctx));
            });

            if (collapsible) {
                this._wrapAsAccordionItem(fieldset, legendText);
            }

            return fieldset;
        }

        // Wrap a generated fieldset in nds-accordion-item markup (header
        // button + collapse + content + body). If the fieldset already sits
        // inside a .nds-accordion (author grouping), reuse that root;
        // otherwise synthesize a per-group root. Init is deferred to
        // _flushAccordionInit so every group's button is in place first.
        _wrapAsAccordionItem(fieldset, legendText) {
            const legend = fieldset.querySelector(':scope > legend');
            const title = legendText || (legend ? legend.textContent : '');
            if (legend) legend.remove();
            fieldset.classList.remove('nds-dropmenu-group');

            // Already wrapped — refresh()/populateFilter() replaced this group's
            // inputs in place, so the header, collapse and count tag still hold.
            // Building a second item here would nest it inside the old one's body.
            // Keyed on our own marker rather than the parent's class: an author
            // may legitimately place a filter placeholder inside their own
            // .nds-accordion-body, and that one still needs its first wrap.
            if (fieldset.hasAttribute('data-filter-wrapped')) return;
            fieldset.setAttribute('data-filter-wrapped', '');

            const filterName = fieldset.getAttribute('data-filter') || '';
            const id = `nds-filter-acc-${NDS.uniqueId()}`;
            const item = document.createElement('div');
            item.className = 'nds-accordion-item';
            item.innerHTML =
                `<h3 class="nds-accordion-header">` +
                    `<button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" type="button" ` +
                        `aria-expanded="false" aria-controls="${id}" data-no-auto-close>` +
                        `<span class="nds-accordion-title">${NDS.escapeHtml(title)}</span>` +
                        `<span class="nds-tag nds-green nds-rounded" ` +
                            `data-filter-count-for="${NDS.escapeHtml(filterName)}" hidden></span>` +
                    `</button>` +
                `</h3>` +
                `<div class="nds-accordion-collapse" id="${id}">` +
                    `<div class="nds-accordion-content">` +
                        `<div class="nds-accordion-body"></div>` +
                    `</div>` +
                `</div>`;
            const existingRoot = fieldset.parentNode.closest('.nds-accordion');
            if (existingRoot) {
                fieldset.parentNode.insertBefore(item, fieldset);
            } else {
                const root = document.createElement('div');
                root.className = 'nds-accordion';
                fieldset.parentNode.insertBefore(root, fieldset);
                root.appendChild(item);
            }
            item.querySelector('.nds-accordion-body').appendChild(fieldset);

            this._accordionInitPending = true;
        }

        // Hand off to accordion.js's own initializer — it wires listeners,
        // stamps data-nds-accordion-initialized (clears the skeleton), and sets
        // .ndsAccordion on the container.
        //
        // Once per build pass, never per group: NDSAccordion snapshots its
        // buttons at construction and the initializer skips a root that already
        // has .ndsAccordion, so initializing after the first of several groups
        // sharing one author-supplied .nds-accordion root (the documented
        // multi-group shape) leaves every later group's header button unwired.
        // Soft dependency — groups render expanded, uncollapsible, if
        // NDS.Accordion isn't bundled.
        _flushAccordionInit() {
            if (!this._accordionInitPending) return;
            this._accordionInitPending = false;
            NDS.Accordion?.reinit();
        }

        // Sync applied-count tags on filter-accordion headers with the current
        // criteria. Hidden at 0, shows the number of selected values otherwise.
        _updateAccordionCounts() {
            // Portal-aware: the count tags sit inside the generated fieldsets,
            // which travel with the menu when the dropmenu carries data-portal.
            const tags = NDS.queryAll(this.filterContainer, '[data-filter-count-for]');
            tags.forEach(tag => {
                const name = tag.getAttribute('data-filter-count-for');
                const count = (this.criteria.filters[name] || []).length;
                if (count > 0) {
                    tag.textContent = count;
                    tag.removeAttribute('hidden');
                } else {
                    tag.textContent = '';
                    tag.setAttribute('hidden', '');
                }
            });
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

        // Form mode: a filter's surfaces are linked by data-filter-target, not
        // by nesting, so its controls — authored or generated — may live
        // anywhere on the page. Associate them with the submission form via
        // HTML's native `form` attribute so FormData/GET submissions include
        // them (matching the Apply button's association in _bindApplyButton).
        // No-op outside form mode, when the form has no id to reference, or
        // when the input already belongs to it.
        _associateWithForm(input) {
            if (!this.isFormMode || !this.submissionForm.id) return;
            if (input.form !== this.submissionForm) {
                input.setAttribute('form', this.submissionForm.id);
            }
        }

        // Build one .nds-form-container holding a single checkbox / radio /
        // switch input for `value`. `index` drives the id and "All"-option
        // detection; `ctx` carries the shared per-group settings.
        _buildFilterInput(value, index, ctx) {
            const { inputType, groupName, filterName, variant, includeAllOption, allLabel, labelMap, searchable } = ctx;
            const id = `${groupName}-${index}`;
            const isAllOption = includeAllOption && index === 0;

            const formContainer = document.createElement('div');
            formContainer.className = inputType === 'switch'
                ? 'nds-form-container nds-switch-container'
                : inputType === 'radio'
                    ? 'nds-form-container nds-radio-container'
                    : 'nds-form-container nds-check-container';
            if (searchable) formContainer.setAttribute('data-search-item', '');

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

            if (filterData.type === 'range') {
                this.updateRangeCriteria(filterName);
                return;
            }

            this.criteria.filters[filterName] = Array.from(filterData.inputs)
                .filter(input => input.checked && input.value !== '')
                .map(input => input.value);
        }

        // ==============================================
        // FILTER APPLICATION
        // ==============================================

        // The "commit applied UI + URL" triple: six sites route through here so a
        // path that omits one call can't silently desync the URL from the chips.
        _commitAppliedUi() {
            this.updateUrlParams();
            this.updateFilterButtonBadge();
            this.updateAppliedChips();
        }

        // How a criteria change gets committed. AJAX mode re-fetches from the
        // server; every other mode filters the items already on the page. One
        // definition so a new commit path can't pick the wrong half — the chip,
        // clear and range-reset paths all route here.
        _commitCriteriaChange() {
            if (!this.isAjaxMode) {
                this.applyFilters();
                return;
            }

            // Coalesce. Setting three filters in a row is one intent, but each
            // submit is a server round-trip, so queue on a microtask and let a
            // run of criteria changes collapse into one request. An explicit
            // submitForm() in the same tick supersedes the queued one — it
            // clears the flag, so the consumer's own call is the one that goes.
            this._commitQueued = true;
            if (this._commitScheduled) return;
            this._commitScheduled = true;
            Promise.resolve().then(() => {
                this._commitScheduled = false;
                // destroy() aborts this signal; without the check a queued
                // commit would fetch on behalf of a dead instance.
                if (!this._commitQueued || this.abortController.signal.aborted) return;
                this._commitQueued = false;
                this.submitForm();
            });
        }

        applyFilters() {
            // Dismiss any feedback in filter container
            // Soft dependency — filter skips feedback dismissal if NDS.Feedback isn't bundled.
            if (NDS.Feedback) {
                NDS.Feedback.dismissAll(this.filterContainer);
            }

            // In form mode, just update state (don't submit form programmatically)
            // Form submission only happens from explicit user actions via submitForm()
            if (this.isFormMode) {
                this._commitAppliedUi();
                this.dispatchFilterEvent();
                return;
            }

            // If no criteria, show all items and update UI
            if (!this._hasActiveCriteria()) {
                // Un-hide every item — same as showItem() (used by reset()/destroy()).
                this.items.forEach(item => this.showItem(item));

                // Dismiss no-results alert if exists
                this.dismissNoResultsAlert();

                this._commitAppliedUi();
                this.updatePagination(this._pageOptions());

                // Always dispatch change event, even when clearing all criteria
                this.dispatchFilterEvent(this.items.length);
                return;
            }

            if (this.targetContainer) this.targetContainer.classList.add('nds-loading');

            this._ensureCacheBuilt();

            let visibleCount = 0;

            // Settles synchronously by design: the body is a write-only
            // data-filtered toggle with no layout reads, and it paints the
            // final filtered set. Chunking it across frames would show every
            // item first and collapse to the matches after — do not defer.
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
            this.updatePagination(this._pageOptions());
            this.updateNoResultsAlert(visibleCount);
            this._commitAppliedUi();

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
            // Public entry point (form/AJAX modes call it directly) — no container
            // to render into means no alert, not a crash on targetContainer.tagName.
            if (!this.targetContainer) return;
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

            // Range: numeric in-bounds test against the item's cached value.
            if (this.filterInputs[filterName]?.type === 'range') {
                return this._itemMatchesRange(item, filterName, selectedValues[0]);
            }

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
                if (filterData.type === 'range') {
                    // Restore the full span (updateRangeCriteria clears the criteria).
                    this._setRangeValues(filterName, filterData.min, filterData.max);
                    continue;
                }
                filterData.inputs.forEach(input => {
                    input.checked = false;
                });
                this._recheckAllRadio(filterData);
                this.criteria.filters[filterName] = [];
            }
        }

        clearDropmenuFilters() {
            // Emptying the dropmenu search box has to zero criteria.search with it.
            // Clearing the value alone left the keyword applied: the box read empty
            // and the Apply count dropped, while the results stayed filtered and the
            // search chip stayed up until the next Apply. _mirrorSearchInputs is the
            // same pair every other clear path uses, and keeps the direct box in step.
            if (this.searchInputs.dropmenu) {
                this.criteria.search = '';
                this._mirrorSearchInputs('');
            }

            this._resetFilterInputs();

            this.updateApplyButtonLabel();
            this.dispatchClearEvent();

            this._commitCriteriaChange();
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

            this._commitAppliedUi();
            this.updatePagination();
        }

        // ==============================================
        // EVENTS
        // ==============================================

        dispatchFilterEvent(visibleCount) {
            const hasCount = arguments.length > 0;
            const event = new CustomEvent('nds:filter:change', {
                detail: {
                    filter: this,
                    // getCriteria(), not a shallow spread: the spread handed out the
                    // live criteria.filters object, so a consumer holding an old
                    // detail.criteria saw it track later changes and every
                    // what-changed comparison read as unchanged.
                    criteria: this.getCriteria(),
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

        // options is forwarded to pagination. A criteria CHANGE resets to page 1, which
        // is right: the result set is different, so the old page number is meaningless.
        // A refresh() is not a criteria change — the rows moved under an unchanged filter
        // — so it passes { keepPage: true } and the user stays where they were.
        updatePagination(options = {}) {
            if (!this.targetContainer) return;

            // Walk up to find the .nds-paged-content wrapper (pagination expects this as the container).
            // Pagination resolves the nav itself (explicit data-auto-pagination="#id" or adjacency) and
            // no-ops when there's none, so we just hand it the wrapper.
            const pagedContent = this.targetContainer.closest('.nds-paged-content') ||
                                 this.targetContainer.parentElement?.closest('.nds-paged-content');
            if (pagedContent) NDS.Pagination.refresh(pagedContent, options);
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
            this.items = this.resolveItems();
            this._cacheBuilt = false;
            this._resyncSort();

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
            this._flushAccordionInit();

            // Reapply current filters. The criteria did not change, only the rows, so
            // pagination must hold the user's page — see _pageOptions/updatePagination.
            // A row edited on page 3 that snapped the list back to page 1 was the bug.
            this._refreshing = true;
            try {
                this.applyFilters();
            } finally {
                this._refreshing = false;
            }
        }

        // Page-1 reset belongs to a criteria change, not to a re-scan of the same filter.
        _pageOptions() {
            return this._refreshing ? { keepPage: true } : {};
        }

        setSearchValue(value) {
            this.criteria.search = value.trim().toLowerCase();

            this._mirrorSearchInputs(value);

            this.updateApplyButtonLabel();
            // Not applyFilters(): in AJAX mode that repaints chips, badge and URL
            // from the new criteria without fetching, so the page would state a
            // keyword the displayed results were never filtered by. Same commit
            // path as removeFilterValue — the closest sibling, also a programmatic
            // criteria change.
            this._commitCriteriaChange();
        }

        setFilterValues(filterName, values) {
            const filterData = this.filterInputs[filterName];
            if (!filterData) return;

            const valuesLower = values.map(v => v.toLowerCase());
            filterData.inputs.forEach(input => {
                input.checked = valuesLower.includes(input.value.toLowerCase());
            });
            // setFilterValues(name, []) is the per-filter clear — a radio group
            // lands back on "All" rather than empty, same as the chip and clear paths.
            this._recheckAllRadio(filterData);

            this.updateFilterCriteria(filterName);
            this.updateApplyButtonLabel();
            // See setSearchValue — commit, don't just repaint, so AJAX mode
            // re-fetches instead of showing chips for an unrequested filter.
            this._commitCriteriaChange();
        }

        populateFilter(filterName, values, inputType = null) {
            // Find the container element for this filter. Portal-aware: a
            // data-portal dropmenu moves the whole menu — and every placeholder
            // in it — to <body> while open, which is exactly when a cascading
            // filter calls this from an nds:filter:change handler.
            const container = NDS.querySelector(this.filterContainer, `[data-filter="${filterName}"]`);
            if (!container) return;

            // Determine input type from data attribute or parameter
            const type = inputType || container.getAttribute('data-filter-type') || 'checkbox';

            // Generate inputs with explicit values
            const actualElement = this.generateFilterInputs(container, filterName, type, values) || container;

            // Re-setup the filter listeners
            this.setupManualFilter(actualElement, filterName);
            this._flushAccordionInit();
        }

        // Legacy API for backward compatibility
        setSelectedTags(tags) {
            this.setFilterValues('tags', tags);
        }

        destroy() {
            this.abortController.abort();
            if (this.fetchAbortController) this.fetchAbortController.abort();
            // Sort is created by this filter, so it dies with it — its trigger
            // listeners live on surfaces that outlive the target container.
            if (this.sort) { this.sort.destroy(); this.sort = null; }
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
            // A stale reference — destroyed, then re-inited on the same element —
            // shares the representative and targetId with the live instance, so its
            // destroy must not clobber that one's backref, stamps, or map entry.
            if (this.filterContainer.ndsFilter === this) {
                // _targetRoots covers every stamped surface (incl. the
                // representative); the target container is stamped separately.
                this._targetRoots?.forEach(r => r.removeAttribute('data-nds-filter-initialized'));
                this.filterContainer.removeAttribute('data-nds-filter-initialized');
                this.targetContainer?.removeAttribute('data-nds-filter-initialized');
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

    // Resolve the LIVE instance for a target id, or null. A framework view
    // unmounted without NDS.Init.destroy() leaves a detached instance squatting
    // its id: every claim below would then skip the remount and the crit hold
    // (data-nds-filter-initialized) would keep the new region hidden forever.
    // A detached representative means that filter is gone — destroy it (which
    // releases its pooled NDS.onDOMAdd/listener subscriptions) and free the id.
    function liveInstance(id) {
        const instance = _instancesByTarget.get(id);
        if (!instance) return null;
        if (instance.filterContainer?.isConnected) return instance;
        console.warn(`NDS Filter: reclaiming target "${id}" — its instance was removed from the DOM without NDS.Init.destroy(). Call destroy() on unmount.`);
        instance.destroy();
        _instancesByTarget.delete(id);
        return null;
    }

    // Construct an instance on `representative` (the element that carries the
    // backref, init-guard attribute, and dispatches the filter's events) and
    // register it by target id.
    function createInstance(representative, surfaces) {
        const instance = new NDSFilter(representative, surfaces);
        representative.ndsFilter = instance;
        // Stamp every linked surface + the target container: the constructor's
        // init has applied URL params by now, so this releases the crit holds
        // (items region, auto-fill row) — including holds keyed on ancestor
        // surfaces (the search-box wrapper, a form-mode <form>), which would
        // otherwise pin a nested auto-fill hidden forever. The data-nds-loaded
        // pattern, per element; the representative's stamp doubles as the
        // public init marker.
        // _targetRoots, not the passed-in surfaces: it is the authoritative set in
        // both paths — the loader's grouped surfaces, or the document scan a manual
        // create() falls back to — so neither leaves a linked surface unstamped.
        (instance._targetRoots || [representative]).forEach(s => s.setAttribute('data-nds-filter-initialized', 'true'));
        instance.targetContainer?.setAttribute('data-nds-filter-initialized', 'true');
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
            if (!id || liveInstance(id)) return;
            if (!groups.has(id)) groups.set(id, []);
            groups.get(id).push(el);
        });

        groups.forEach(surfaces => {
            const representative = surfaces.find(el => el.classList.contains('nds-filter')) || surfaces[0];
            createInstance(representative, surfaces);
        });
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    NDS.Filter = {
        init: initializeFilters,
        reinit: initializeFilters,
        // Idempotent, and registers exactly like the loader path — matching
        // NDS.Sort.create / NDS.DatePicker.create. Constructing bare skipped the
        // init stamp (the crit hold then kept the target hidden), the backref,
        // the target registry and the ready event, so getInstance/getByTarget/
        // whenReady all missed an instance that was otherwise working.
        create: (container) => {
            if (!container) return null;
            if (container.ndsFilter) return container.ndsFilter;
            const id = container.getAttribute('data-filter-target');
            const live = id && liveInstance(id);
            if (live) return live;
            return createInstance(container);
        },

        getInstance: (container) => {
            if (typeof container === 'string') {
                container = document.querySelector(container);
            }
            if (!container) return null;
            // Direct backref (representative element), else resolve via the
            // element's target linkage so any surface element works.
            if (container.ndsFilter) return container.ndsFilter;
            const id = container.getAttribute('data-filter-target');
            return id ? liveInstance(id) : null;
        },

        getByTarget: (targetId) => liveInstance(targetId),

        /**
         * Re-resolve items and regenerate auto-scanned filters for every instance
         * whose target container is `root`, sits inside it, or contains it. This is
         * the NDS.Init.refresh(container) entry point: a filter is identified by its
         * data-filter-target, never by the mutated container, so the caller cannot be
         * expected to resolve the instance first — that lookup is the trap this
         * removes. No arg (or document) refreshes every live filter.
         *
         * AJAX-mode instances are SKIPPED. The server owns the result set there: it
         * ran the query, chose the rows and returned exactly one page of them.
         * instance.refresh() would re-filter those rows client-side against criteria
         * the server has already applied — and client matching (data-filter-value
         * equality) is not server matching (full-text, joins, collation), so rows the
         * server deliberately returned can be hidden. It also regenerates the filter
         * options from the visible page only, shrinking a server-supplied option list
         * to whatever the current 20 rows happen to contain. A server-driven filter
         * refetches through its own submit path; nothing here should second-guess it.
         * @param {Element|Document} [root] - the container whose contents changed
         */
        refresh: (root) => {
            // Claim any filter surface that did not exist at page load FIRST. The walk
            // dispatches an owner's refresh INSTEAD of its init, so without this an
            // injected [data-filter-target] region is never instanced — and the crit
            // hold keyed on data-nds-filter-initialized would keep it hidden forever.
            // Idempotent: createInstance skips a target already in the registry.
            initializeFilters();

            const scope = root && root !== document ? root : null;
            _instancesByTarget.forEach(instance => {
                // isFormMode, not isAjaxMode: a <form data-filter-submit> WITHOUT
                // data-ajax is server-driven too — the browser submits and the server
                // returns the filtered page. Re-scanning it would rebuild the option
                // list from the rows currently rendered and hand back unchecked inputs,
                // so the next real submit would silently drop the applied filter.
                if (instance.isFormMode) return;
                // Reap an instance whose surfaces left the DOM (route change with
                // no NDS.Init.destroy()) instead of refreshing a detached filter.
                if (!liveInstance(instance.targetId)) return;
                const target = instance.targetId
                    ? document.getElementById(instance.targetId)
                    : instance.targetContainer;
                // No scope: refresh all. Scoped: the target is root, inside it, or
                // wraps it (a tbody handed in for a table-level target).
                if (scope && target && !(scope === target || scope.contains(target) || target.contains(scope))) return;
                instance.refresh();
            });
        },

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

            // Not yet. Ready fires on the representative surface only, and bubbling
            // never reaches siblings — a search box sitting beside the .nds-filter
            // would wait forever. Match at the document by target id instead; an
            // element without one (an ancestor wrapper) still gets the bubble.
            const id = container.getAttribute('data-filter-target');
            if (id) {
                const onReady = (e) => {
                    if (e.detail?.targetId !== id) return;
                    document.removeEventListener('nds:filter:ready', onReady);
                    callback(e.detail);
                };
                document.addEventListener('nds:filter:ready', onReady);
                return;
            }
            container.addEventListener('nds:filter:ready', (e) => {
                callback(e.detail);
            }, { once: true });
        }
    };

    // Note: Initialization handled by nds-loader.js unified system
})();
