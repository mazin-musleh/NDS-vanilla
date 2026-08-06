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
 * Events (bubble from the filter surface element):
 *   nds:filter:ready       detail = the instance
 *   nds:filter:change      detail {filter, criteria, totalItems, visibleItems, hiddenItems}
 *   nds:filter:reset       detail {filter, totalItems}
 *   nds:filter:clear       detail {filter}
 *   nds:filterFormSubmit   detail {criteria, form} — cancelable, before a normal form submit
 *   nds:filterFormAjax     detail {criteria, form, hiddenInputsContainer, rollback} — cancelable;
 *                          preventDefault() to send the request yourself, and call
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
 *   - Every surface (search box, dropmenu, chips, sort toolbar) carries the same
 *     data-filter-target — there is no privileged container element.
 *   - data-filtered is written by the filter to hide an item; CSS owns the hiding. Count
 *     visible items by its absence, never by inline styles.
 */
// fixture stub — the banner above is the surface under test; real logic lives in the template.
