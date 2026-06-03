// ==============================================
// SPLIT COMPONENT — LAZY BEHAVIOR HALF (ships in nds-delegated.min.js)
// ==============================================
// The deferred behavior of NDS.Filter (the AJAX form-submission cluster). Loaded
// after the page reveal and grafted onto NDSFilter.prototype through
// NDS.Filter._installBehavior. Only form-mode AJAX filters reach this code, and
// never at first paint — the eager shell `nds-filter.js` owns construction,
// URL-active filtering, and all client-side matching. A submit landing before
// this half attaches is captured by the shell's trap, queued, and replayed here.
// RULES: attach ONLY via _installBehavior — never reassign NDS.Filter; keep
// anything that touches first paint or the primary interaction in the shell.
// Pattern: CLAUDE.md → "JS Bundles & Shrinking the Critical Bundle".
(function () {
    'use strict';
    if (!NDS.Filter || !NDS.Filter._installBehavior) return;
    NDS.Filter._installBehavior(function (NDSFilter) {
        return {
        /**
         * Handle AJAX form submission. Thin orchestrator — each step lives in
         * a private helper so the fetch chain stays scannable.
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
        },

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
        },

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
        },

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
        },

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
        },

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
        },

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
        },
        };
    });
})();
