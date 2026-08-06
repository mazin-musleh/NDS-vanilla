/* NDS.Pagination — public surface
 * Rides: nds-dropmenu (ellipsis menu + per-page picker; soft — plain markup without it)
 * Methods:
 *   NDS.Pagination.init() / .reinit()          scan + initialize navs (reinit also runs initAuto)
 *   NDS.Pagination.initAuto()                  initialize auto-pagination containers only
 *   NDS.Pagination.create(nav)                 instance one .nds-pagination nav
 *   NDS.Pagination.refresh(contentContainer)   recompute an auto-pagination after its items
 *                                              change — takes the .nds-paged-content, not the nav
 *   NDS.Pagination.destroy(nav)                explicit teardown for SPA consumers
 *   NDS.Pagination.setPage(nav, page)          move a manual nav to a page
 *   NDS.Pagination.setTotalPages(nav, total, activePage)   rebuild a manual / data-driven list
 *   NDS.Pagination.scrollToContent(nav)        scroll to the paged content
 *   NDS.Pagination.updateRecords(listOrId, {from, to, count})   stamp the record slots
 * Events (bubble from the .nds-pagination nav):
 *   nds:pagination:change   detail {page, previousPage, totalPages, pagination} — user-initiated
 *                           page changes only
 * Hooks:
 *   data-auto-pagination · data-total-pages · data-paged-target · data-per-page-target
 *   data-page-param · data-page-url · data-pagination-no-scroll
 *   data-paged-count · data-paged-from · data-paged-to (record slots the component fills)
 * Gotchas:
 *   - setPage() moves the nav but fires no event — dispatch your own if listeners depend on it.
 *   - scrollToContent() ignores data-pagination-no-scroll: the explicit call is the intent.
 *   - setTotalPages() is for manual / data-driven navs; on an auto-pagination it warns and
 *     no-ops — add/remove .nds-page-item items or call refresh() instead.
 */
// fixture stub — the banner above is the surface under test; real logic lives in the template.
