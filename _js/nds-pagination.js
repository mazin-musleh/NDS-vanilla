/* NDS.Pagination — public surface
 * Rides: nds-dropmenu (ellipsis menu + per-page picker)
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
 *   NDS.Pagination.setRecords(listOrId, {from, to, count})   stamp the record slots
 * Events (bubble from the .nds-pagination nav):
 *   nds:pagination:change   detail {page, previousPage, totalPages, pagination} — user-initiated
 *                           page changes only
 * Hooks:
 *   data-auto-pagination · data-total-pages · data-paged-target · data-per-page-target
 *   data-active-page (read at init; the script keeps it current on a data-driven nav)
 *   data-page-param · data-page-url · data-pagination-no-scroll
 *   data-per-page-param (picker: ?per-page=; the loader reads it at load, before the split)
 *   data-per-page-default (picker: the size that drops ?per-page=; the loader writes it from
 *                         data-select-value unless the server did)
 *   data-paged-count · data-paged-from · data-paged-to (record slots the component fills)
 *   data-paged-split (loader-stamped at init: items past --per-page, else 6, are hidden)
 * Gotchas:
 *   - setPage() moves the nav but fires no event — dispatch your own if listeners depend on it.
 *   - scrollToContent() ignores data-pagination-no-scroll: the explicit call is the intent.
 *   - setTotalPages() is for manual / data-driven navs; on an auto-pagination it warns and
 *     no-ops — add/remove .nds-page-item items or call refresh() instead.
 *   - A data-driven count of 0 or 1 builds no list, and CSS hides the nav.
 */

/**
 * NDS Pagination Component
 *
 * Delegated (ships in nds-delegated.min.js, loader-INJECTED after the reveal —
 * NOT critical:true). Pre-init paint is owned by the data-paged-initialized
 * crit-CSS skeleton, which hides items past the default page size — or past the
 * container's --per-page, once the loader's init-time split stamped data-paged-split —
 * until init stamps data-paged-initialized, so init landing
 * post-reveal inserts the list without shifting content. The state init sets:
 *   - HTML builders + the manual-collapse path (NdsPagination →
 *     reconcileCollapse): more than 5 pages collapse to
 *     [Prev] 1 2 3 [ellipsis] N [Next] so author-written full lists never
 *     paint then collapse (horizontal CLS).
 *   - Auto-pagination initial paint (setupAutoContainer → rebuildAutoNav):
 *     generates the collapsed list from the item count, hides items past
 *     --per-page via showPage, which pins table column widths grow-only,
 *     stamps data-paged-initialized so the skeleton reveals.
 *   - Initial active-state stamping (setActivePage + setPrevNextStates +
 *     setupPaginationStates) so the active page is highlighted and the
 *     prev/next disabled states are correct on first frame.
 *
 * Interaction (wired at init, runs on click/resize — no forced layout at init):
 *   - Per-nav click handler for manual pagination (addManualNavClickListeners),
 *     scoped via clickAbortControllers; DOM removal GCs it automatically.
 *   - Per-nav click handler for auto-pagination (addAutoClickListeners).
 *   - goToPage / scrollToContent (sticky-nav-aware smooth scroll; opt out per nav
 *     via data-pagination-no-scroll)
 *   - syncAutoPagination (filter-driven; the NDS.Pagination.refresh entry)
 *   - The per-container --per-page ResizeObserver + the .nds-paged-content
 *     onDomRemove cleanup
 *
 * Lifecycle:
 *   - Shared NDS.onDomRemove('.nds-pagination') sweep aborts the click AC
 *     and releases offResizes for navs torn down without an explicit destroy.
 *   - NDS.Pagination.destroy(nav) — explicit teardown for SPA consumers
 *     (aborts the click AC, releases offResizes, clears the init stamps)
 *   - NDS.Pagination.setRecords(listOrId, {from, to, count}) — stamp the
 *     records slots ("x of y") from server/manual pagination
 *
 * Display pattern: [Prev] 1 2 3 ... [Last] [Next]
 * - Always shows first 3 pages and last page
 * - All middle pages (4 to second-to-last) grouped in dropdown menu (...)
 * - Generated dropdowns render LAZILY: an empty shell at build time, a
 *   scroll-windowed slice of rows on open (addEllipsisLazyListeners) — DOM stays
 *   bounded no matter how large totalPages gets. Author-written menus
 *   (reconcileCollapse) stay eager.
 *
 * Supports both <button> and <a> elements for pagination items.
 *
 * URL sync (opt-in): data-page-param on the nav reads ?page=N at init (applied
 * silently — no event, no scroll) and mirrors page changes back with
 * replaceState, Filter/Sort-style. See readPageParam/writePageParam.
 */

(function() {
    'use strict';

    let autoCleanupReady = false;
    let navCleanupReady = false;
    let autoRefreshWatchReady = false;
    let collapseWatchReady = false;

    const collapseSignatures = new WeakMap(); // nav → page-number signature last collapsed
    const perPageSizes = new WeakMap(); // paged content → current --per-page
    const lazyRanges = new WeakMap(); // ellipsis scroll container → { from, to }
    const lazyWindows = new WeakMap(); // ellipsis scroll container → open window state (cleared on close)
    const scrollWiredMenus = new WeakSet(); // scroll containers with the window scroll listener
    const offResizes = new WeakMap(); // paged content → onElementResize unsubscribe
    const clickAbortControllers = new WeakMap(); // manual nav → click listener AbortController

    // Read --per-page for a paged-content container. Prefers the inline style —
    // the common case is a consumer setting style="--per-page:N", and an inline
    // read costs nothing. Only media-query-driven values (no inline) fall through
    // to getComputedStyle, which forces a style recalc on the (laid-out) container.
    // Defaults to 6. The container itself isn't display:none pre-init — the
    // skeleton hides individual items past --per-page, so the read is not free.
    // Synchronous at init by necessity — the page split must settle before data-paged-initialized reveals, or items flash all → paginated.
    function readPerPage(el) {
        const inline = el.style.getPropertyValue('--per-page');
        const perPage = parseInt(inline || getComputedStyle(el).getPropertyValue('--per-page'), 10);
        return perPage > 0 ? perPage : 6;
    }

    // THE paged-item set for a container: the .nds-page-item elements it owns,
    // minus anything a filter removed. Every scheduling, counting and records
    // path reads through here, so a sixth caller can't re-derive it differently.
    // Breadth is NDS.findOwnItems': a sub-row's nested paged table has its own
    // .nds-paged-content and must not be paged by this nav.
    function getPagedItems(content) {
        return NDS.findOwnItems(content, content.querySelectorAll('.nds-page-item'))
            .filter(item => !item.hasAttribute('data-filtered'));
    }

    // THE page controls a nav owns. The ellipsis exclusion is load-bearing, not
    // cosmetic: the trigger sits in an .nds-pagination-item too, and when it
    // holds the active page its label IS a page number — without the exclusion
    // a trigger click resolves to a page change (scroll jump + a no-op
    // :change event). Today only Dropmenu's stopPropagation hides that, which
    // the documented soft-dependency path (setupGeneratedPagination) doesn't get.
    const PAGE_ITEM_SELECTOR = '.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next):not(.nds-pagination-ellipsis)';
    const PAGE_CONTROL_SELECTOR = `${PAGE_ITEM_SELECTOR} button, ${PAGE_ITEM_SELECTOR} a`;

    // The list element inside a nav, tolerating a bare .nds-pagination-list used
    // as the root. The manual/author paths resolve the list through here, so the
    // standalone-root contract lives in one place. The auto paths query
    // .nds-pagination-list raw on purpose: they need null once a <=1-page rebuild
    // has emptied the nav, where this would hand back the nav itself.
    function resolveList(el) {
        return el.querySelector('.nds-pagination-list') || el;
    }

    // The nav for a list-or-nav element — resolveList's mirror. Without it the
    // standalone .nds-pagination-list root setupPagination accepts loses
    // whatever the caller hangs off the nav: the skeleton release, the scroll,
    // the no-scroll opt-out, the URL param.
    function resolveNav(el) {
        return el.closest('.nds-pagination') || el;
    }

    // Page number from a clickable page element: prefer the `.nds-label`
    // text, fall back to the element's own text (prev/next, bare anchors).
    function readPageNumber(el) {
        return parseInt(el.querySelector('.nds-label')?.textContent || el.textContent);
    }

    // Min/max page numbers across a set of page elements. Returns
    // { min: Infinity, max: -Infinity } when none are numeric.
    function getPageBounds(elements) {
        const pageNumbers = elements.map(readPageNumber).filter(pageNumber => !isNaN(pageNumber));
        return { min: Math.min(...pageNumbers), max: Math.max(...pageNumbers) };
    }

    class NdsPagination {
        constructor(paginationNav) {
            this._paginationNav = paginationNav;
            const list = resolveList(paginationNav);

            // Silently skip empty pagination (likely auto-pagination that will be populated)
            if (!list.querySelector('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next)')) return;

            this._valid = true;
            // Registered here, not in the sweep, so every construction path —
            // sweep, reinit() and programmatic create() — reaches destroy() and is stamped.
            paginationNav.ndsPagination = this;
            this.init();
            paginationNav.setAttribute('data-nds-pagination-initialized', 'true');
        }

        init() {
            // Initial collapse runs through the same re-runnable reconcile the
            // dynamic watcher uses, so the markup-preserving collapse logic lives
            // in exactly one place.
            reconcileCollapse(this._paginationNav);
            // A re-create after destroy() finds the ellipsis built but its menu torn down.
            const dropmenu = this._paginationNav.querySelector('.nds-pagination-ellipsis .nds-dropmenu');
            if (dropmenu) NDS.Dropmenu.create(dropmenu);
        }

        destroy() {
            destroyPaginationNav(this._paginationNav);
        }
    }

    // ── Live ellipsis collapse (any manual mode) ─────────────────────────
    // Author page controls are MOVED between the visible strip and the ellipsis
    // dropdown, never re-serialized — class, href, label markup, custom
    // attributes and any consumer-attached listener survive collapse intact.
    // Only what the collapse owns is re-stamped: the dropdown marker class,
    // aria-current, and data-state (NDS.state-managed, never a literal attribute).
    // data-page-url template ("?page={page}") → page-to-href function, or null.
    // A javascript: template gives buttons. Fixed base, not the page: a relative template must pass on file:// too.
    const isSafeTemplate = (template) => { try { return /^(https?|mailto|tel):$/.test(new URL(template, 'http://x/').protocol); } catch { return false; } };
    const toUrlFunction = pageUrl => pageUrl && isSafeTemplate(pageUrl) ? (page => NDS.escapeHtml(pageUrl.replace('{page}', page))) : null;

    // Capture the ordered page-control set from a manual nav's list, whether it
    // is currently flat or already collapsed (visible buttons + ellipsis
    // dropdown items). Entries carry the LIVE element, so the rebuild reparents
    // the author's own node instead of reconstructing it from captured fields.
    function capturePageModel(list) {
        const seen = new Set();
        const model = [];
        const push = el => {
            const pageNumber = readPageNumber(el);
            if (isNaN(pageNumber) || seen.has(pageNumber)) return;
            seen.add(pageNumber);
            model.push({ num: pageNumber, el, active: el.ariaCurrent === 'page' || NDS.state.has(el, 'active') });
        };
        list.querySelectorAll(PAGE_CONTROL_SELECTOR).forEach(push);
        getPaginationDropmenuItems(list).forEach(push);
        return model.sort((left, right) => left.num - right.num);
    }

    // Re-stamp the collapse-owned bits on a captured control and hand back the
    // live node for reparenting. data-state is cleared here and re-set by
    // activateGeneratedPage. type is collapse-owned, not author markup: every
    // <button> is pinned to type="button" so a nav inside a <form> can't submit
    // on a page click.
    function stampControl(e, activePageNumber, dropdownItem) {
        const el = e.el;
        el.classList.toggle('nds-dropmenu-item', !!dropdownItem);
        NDS.aria.current(el, e.num === activePageNumber ? 'page' : null);
        NDS.state.clear(el);
        if (el.tagName === 'BUTTON') el.setAttribute('type', 'button');
        return el;
    }

    // One page <li> wrapping the author's own control node.
    function buildWrappedPageItem(e, activePageNumber) {
        const item = document.createElement('li');
        item.className = `nds-pagination-item page_${e.num}`;
        item.appendChild(stampControl(e, activePageNumber, false));
        return item;
    }

    // The ellipsis <li>: an EMPTY dropmenu shell, one definition for both
    // consumers so a dropmenu-markup change can't drift between them.
    // Generated navs (buildPaginationHtml) leave it empty — the collapsed
    // range never materializes eagerly, addEllipsisLazyListeners windows rows in on
    // open. reconcileCollapse parses it and reparents the author's controls
    // into the scroll container, which stays eager.
    function buildEllipsisShell() {
        return `<li class="nds-pagination-item nds-pagination-ellipsis"><div class="nds-dropmenu"><button type="button" class="nds-btn nds-subtle nds-ellipsis nds-indicator nds-dropmenu-trigger" aria-label="${getLabelHtml('more')}" data-i18n-aria-label="pagination.more"><span class="nds-label"></span></button><div class="nds-dropmenu-menu nds-pagination-menu" aria-hidden="true"><div class="nds-dropmenu-scroll"></div></div></div></li>`;
    }

    // Ellipsis <li> whose dropdown holds the collapsed range — reparents each
    // hidden page's author control into the shell's scroll container.
    function buildEllipsisItem(entries, activePageNumber) {
        const template = document.createElement('template');
        template.innerHTML = buildEllipsisShell();
        const item = template.content.firstElementChild;
        const scroll = item.querySelector('.nds-dropmenu-scroll');
        entries.forEach(e => scroll.appendChild(stampControl(e, activePageNumber, true)));
        return item;
    }

    // Collapse (or expand) a manual nav's page buttons to the canonical shape —
    // flat at <=5, [1 2 3 … N] above. Idempotent: keyed on the page-number set,
    // so re-running it on its own output is a no-op. That is what makes the live
    // watcher loop-safe — collapsing only shuffles buttons between the visible
    // row and the dropdown, leaving the number SET unchanged, so the signature
    // matches and the re-triggered pass returns early (the rebuild it causes is
    // the loop's terminating microtask, not a debounce). Only a real author
    // add/remove changes the set and triggers exactly one rebuild.
    function reconcileCollapse(nav) {
        const list = nav.matches('.nds-pagination-list') ? nav : nav.querySelector('.nds-pagination-list');
        if (!list) return;
        // Generated lazy navs are builder-owned: a capture here would see only
        // the rendered window and destroy the menu on rebuild.
        if (getLazyRange(list)) return;
        const model = capturePageModel(list);
        if (!model.length) return;

        const signature = model.map(e => e.num).join(',');
        if (collapseSignatures.get(nav) === signature) return; // unchanged set (incl. our own collapse) → loop guard
        collapseSignatures.set(nav, signature);

        // <=5 and already flat → leave the author's exact markup untouched.
        const isCollapsed = !!list.querySelector('.nds-pagination-ellipsis');
        if (model.length <= 5 && !isCollapsed) return;

        // Committed to rebuilding — tear the old ellipsis menu down, as both other
        // rebuild paths do (rebuildAutoNav, setTotalPages). Runs AFTER the capture
        // above, which needs the live menu items: destroy() takes an open menu out of
        // the top layer before replaceChildren discards its shell.
        destroyEllipsisMenu(nav);

        const activePageNumber = (model.find(e => e.active) || {}).num;
        const prevItem = list.querySelector('.nds-pagination-prev');
        const nextItem = list.querySelector('.nds-pagination-next');

        // Build the new page area first: each builder MOVES the author's control
        // out of its old row into the fragment, so replaceChildren below only
        // discards the emptied <li> shells.
        const pages = document.createDocumentFragment();
        if (model.length > 5) {
            for (let i = 0; i < 3; i++) pages.appendChild(buildWrappedPageItem(model[i], activePageNumber));
            pages.appendChild(buildEllipsisItem(model.slice(3, -1), activePageNumber));
            pages.appendChild(buildWrappedPageItem(model[model.length - 1], activePageNumber));
        } else {
            model.forEach(e => pages.appendChild(buildWrappedPageItem(e, activePageNumber)));
        }

        list.replaceChildren(pages); // page area only…
        if (prevItem) list.insertAdjacentElement('afterbegin', prevItem); // …prev/next are the author's, preserved
        if (nextItem) list.insertAdjacentElement('beforeend', nextItem);

        setupGeneratedPagination(nav, activePageNumber || model[0].num); // ellipsis dropmenu + active stamp
        setupPaginationStates(nav);                          // prev/next disabled at the ends
    }

    // Wire the live collapse watcher once per page. Re-collapses a manual nav
    // when its page buttons change. Runs SYNCHRONOUSLY — onChildrenChange is a
    // MutationObserver microtask, so a button added in a click handler collapses
    // before the browser paints, and never flashes uncollapsed. Adds within one
    // task (a loop or a fragment) already arrive as a single batch, so no debounce
    // is needed to coalesce them; loop-safety is reconcileCollapse's signature
    // guard. Auto navs manage their own collapse (rebuildAutoNav) — skipped.
    function addCollapseWatchListeners() {
        if (collapseWatchReady) return;
        collapseWatchReady = true;
        NDS.onChildrenChange('.nds-pagination-list', lists => {
            lists.forEach(list => {
                const nav = resolveNav(list);
                if (nav.hasAttribute('data-auto-pagination')) return;
                reconcileCollapse(nav);
            });
        });
    }

    // Tear down the ellipsis dropmenu instance before its nav is rebuilt via
    // innerHTML: closes an open menu (the setTotalPages-while-open case) and
    // aborts the instance's document-level listeners, which a bare innerHTML
    // would orphan. Safe when absent, closed, or mid-transition.
    function destroyEllipsisMenu(nav) {
        nav.querySelector('.nds-pagination-ellipsis .nds-dropmenu')?.ndsDropmenu?.destroy();
    }

    // Release everything pagination attached to a nav: the click AbortController
    // (manual), the content-side resize observer whose closure references this
    // nav (auto), the instance backref, and the init stamps. Idempotent — re-
    // invoked on the same nav no-ops once the stash is gone. Item visibility
    // (`item.hidden`) is left untouched: a teardown of the UI shouldn't decide
    // what to render in its absence.
    function destroyPaginationNav(nav) {
        if (!nav) return;
        // Already torn down (explicit destroy() before the removal sweep) or
        // never initialized — nothing to release.
        if (!nav.ndsPagination
            && !nav.hasAttribute('data-nds-pagination-initialized')
            && !nav.hasAttribute('data-nds-auto-pagination-initialized')) return;

        if (clickAbortControllers.has(nav)) {
            clickAbortControllers.get(nav).abort();
            clickAbortControllers.delete(nav);
        }

        // Auto path: the .nds-paged-content removal sweep also releases this,
        // but destroy() may run while the content is still in the DOM (consumer
        // tearing down a region without removing it). Releasing here avoids a
        // resize callback firing into a torn-down nav. Quiet resolve: on the
        // removal-sweep path the content may already be detached with the nav,
        // and that miss is teardown, not misconfiguration.
        const content = findNavContent(nav, true);
        if (content && offResizes.has(content)) {
            offResizes.get(content)();
            offResizes.delete(content);
        }

        // An open menu's document listeners would outlive the nav; the signature would
        // make a re-create skip its collapse.
        destroyEllipsisMenu(nav);
        collapseSignatures.delete(nav);
        // data-paged-initialized stays on the content: it releases the crit hold, so
        // removing it would hide the items.
        delete nav.ndsPagination;
        nav.removeAttribute('data-nds-pagination-initialized');
        nav.removeAttribute('data-nds-auto-pagination-initialized');
    }

    // Shared DOM-removal sweep: any pagination nav leaving the document gets
    // destroyPaginationNav. Belt-and-suspenders for the implicit GC path —
    // catches navs torn down without an explicit destroy() call. Wired once
    // per page; idempotent.
    function addNavCleanupListeners() {
        if (navCleanupReady) return;
        navCleanupReady = true;
        NDS.onDomRemove('.nds-pagination', removed => {
            removed.forEach(destroyPaginationNav);
        });
    }

    // Initialization function (called by nds-loader.js)
    function setupPagination() {
        addNavCleanupListeners();
        addPerPagePickerListeners();
        const paginationContainers = document.querySelectorAll('.nds-pagination, .nds-pagination-list');

        paginationContainers.forEach(container => {
            // Skip elements inside code examples
            if (container.closest('code')) {
                return;
            }

            // Skip .nds-pagination-list elements that are children of .nds-pagination
            // (they will be initialized via their parent container)
            if (container.classList.contains('nds-pagination-list') && container.closest('.nds-pagination')) {
                return;
            }

            if (!container.hasAttribute('data-nds-pagination-initialized')) setupNav(container);
        });
    }

    // One nav's full init path, shared by the init sweep and create().
    function setupNav(container) {
        // Check if auto-generation is requested via data-total-pages
        const totalPages = parseInt(container.dataset.totalPages);
        const activePage = parseInt(container.dataset.activePage) || 1;

        // Only auto-generate if data-total-pages is set AND container doesn't already have .nds-pagination-list
        const hasPaginationList = container.classList.contains('nds-pagination-list') ||
                                 container.querySelector('.nds-pagination-list');

        // One page or none builds nothing: CSS hides a nav with no list, as on an auto nav.
        if (totalPages > 1 && !hasPaginationList) {
            // Auto-generate pagination HTML, collapsed directly (no
            // build-all-then-collapse round trip). data-page-url (a
            // "?page={page}" template) makes the controls navigable links
            // for no-JS, server-reload pagination; without it they're buttons.
            container.innerHTML = buildPaginationHtml(totalPages, activePage, container.getAttribute('data-page-url'));
            setupGeneratedPagination(container, activePage, totalPages);
        }

        // Only a valid construction stamps, so a bailed (empty) nav stays eligible.
        const instance = new NdsPagination(container);
        // A data-driven nav left empty (0 or 1 page) is done too: the stamp releases its placeholder.
        if (container.hasAttribute('data-total-pages')) container.setAttribute('data-nds-pagination-initialized', 'true');

        setupPaginationStates(container);

        // Wire the per-nav click handler. Auto-paginations are wired
        // separately by rebuildAutoNav (with a live items getter) and skip
        // this path. Listener is scoped to the nav — DOM removal GCs it
        // automatically; destroy() aborts its clickAbortControllers entry.
        if (!container.hasAttribute('data-auto-pagination')) {
            addManualNavClickListeners(container);
            addCollapseWatchListeners(); // live ellipsis re-collapse on dynamic <li> changes

            restoreUrlPage(container);
        }

        // Universal reveal: a non-auto pagination releases its paged-content's
        // skeleton hold at init. Auto navs are skipped here — setupAutoContainer
        // stamps after it collapses, so pre-collapse content stays held.
        // No .nds-pagination class gate: a standalone .nds-pagination-list root
        // owns paged content the same way, and gating on the class left its
        // items past --per-page hidden by the crit skeleton forever.
        if (!container.hasAttribute('data-auto-pagination')) {
            const content = findNavContent(container);
            if (content) content.setAttribute('data-paged-initialized', '');
        }
        return instance;
    }

    // Collect the dropmenu items inside a pagination's ellipsis menus. On a lazy
    // menu this is the rendered window only — callers needing the true page span
    // use getLazyRange / the always-visible 1,2,3,N strip buttons.
    function getPaginationDropmenuItems(pagination) {
        return Array.from(pagination.querySelectorAll('.nds-dropmenu-menu .nds-dropmenu-item'));
    }

    // All clickable page elements (in-list buttons + dropmenu items).
    // Excludes prev/next.
    function getAllPageElements(pagination) {
        const inList = Array.from(pagination.querySelectorAll(PAGE_CONTROL_SELECTOR));
        return [...inList, ...getPaginationDropmenuItems(pagination)];
    }

    // Shared function to set active page and aria-current. One pass over every
    // clickable: clears stale active state ONLY where it exists (at
    // most the old active page + its ellipsis trigger — the hundreds of inactive
    // dropmenu items on a large auto-pagination pay no write) and, in the same
    // visit, captures the page element matching the target.
    function setActivePage(pagination, pageNumber) {
        const dropmenuItems = getPaginationDropmenuItems(pagination);
        const clickables = pagination.querySelectorAll('.nds-pagination-item button, .nds-pagination-item a, .nds-dropmenu-trigger');

        let target = null;
        [...clickables, ...dropmenuItems].forEach(el => {
            if (el.ariaCurrent === 'page' || NDS.state.has(el, 'active')) {
                NDS.state.clear(el);
                NDS.aria.current(el, null);
            }
            // First page element (never a trigger) whose number matches.
            if (target === null && !el.classList.contains('nds-dropmenu-trigger') &&
                readPageNumber(el) === pageNumber) {
                target = el;
            }
        });

        // Reset all ellipsis trigger labels (icon is CSS ::after, just clear the
        // page number). Bounded — one label per ellipsis.
        pagination.querySelectorAll('.nds-ellipsis .nds-label').forEach(label => {
            label.textContent = '';
        });

        if (!target) {
            // Lazy nav: the page's row isn't rendered — the trigger carries it.
            const range = getLazyRange(pagination);
            if (range && pageNumber >= range.from && pageNumber <= range.to) {
                stampTriggerActive(pagination, pageNumber);
            }
            return;
        }

        // Activate the target; if it lives in the dropdown, also light the
        // ellipsis trigger and show the active page number on it.
        NDS.state.set(target, 'active');
        NDS.aria.current(target, 'page');
        if (target.classList.contains('nds-dropmenu-item')) {
            // Without it the trigger never carries the active page, and once the
            // menu closes and drops its rows nothing holds it at all.
            const ellipsisTrigger = target.closest('.nds-dropmenu')?.querySelector('.nds-dropmenu-trigger');
            if (ellipsisTrigger) {
                NDS.state.set(ellipsisTrigger, 'active');
                const ellipsisLabel = ellipsisTrigger.querySelector('.nds-label');
                if (ellipsisLabel) ellipsisLabel.textContent = pageNumber;
            }
        }
    }

    // Shared function to update prev/next button states
    function setPrevNextStates(pagination, currentPageNumber, minPage, maxPage) {
        const prevBtn = pagination.querySelector('.nds-pagination-prev button, .nds-pagination-prev a');
        const nextBtn = pagination.querySelector('.nds-pagination-next button, .nds-pagination-next a');
        setEdgeState(prevBtn, currentPageNumber === minPage);
        setEdgeState(nextBtn, currentPageNumber === maxPage);
    }

    // Apply edge (first/last page) disabled state to a prev/next control —
    // <button> uses the native `disabled` property; <a> can't be disabled
    // natively, so encode the state via aria + data-state for the SCSS.
    function setEdgeState(btn, isEdge) {
        if (!btn) return;
        if (btn.tagName.toLowerCase() === 'button') {
            btn.disabled = isEdge;
            return;
        }
        NDS.aria.disabled(btn, isEdge || null);
        if (isEdge) NDS.state.add(btn, 'disabled');
        else NDS.state.remove(btn, 'disabled');
    }

    // Initialize prev/next button states based on active page
    function setupPaginationStates(paginationNav) {
        const pagination = resolveList(paginationNav);

        const allPageElements = getAllPageElements(pagination);
        if (allPageElements.length === 0) return;

        const { min: minPage, max: maxPage } = getPageBounds(allPageElements);
        if (!Number.isFinite(minPage)) return;

        // Current page — trigger-aware (a lazy nav's mid-range active page lives
        // on the ellipsis trigger, not on a rendered item); defaults to minPage.
        const currentPageNumber = findCurrentPage(pagination) || minPage;

        // Always call setActivePage to ensure ellipsis trigger gets active class if needed
        setActivePage(pagination, currentPageNumber);
        setPrevNextStates(pagination, currentPageNumber, minPage, maxPage);
    }

    // Pin a paged table's columns to the widest the shown pages needed, so a
    // column never narrows page to page; a later page with longer text widens
    // it once. Measuring every row instead styled all of them at setup (~430 ms
    // for 100 rich rows at CPU ×6.6). No-op for card paged content.
    function lockTableColumns(items) {
        const first = items[0];
        if (!first || first.tagName !== 'TR') return;
        const table = first.closest('table');
        // Own header row only. A sub-row's nested <table> has its own thead whose
        // cells sit inside a hidden row and measure 0 — and since the outer
        // widths are non-zero, the all-zero guard below wouldn't catch it, so
        // every nested column got pinned to 0px.
        const headers = table && table.querySelectorAll(':scope > thead th');
        if (!headers || !headers.length) return;
        // Read at width:auto: the stretch to 100% would pin spare room into every
        // column, and a wider page would then overflow instead of sharing it.
        const authored = table.style.width;
        table.style.width = 'auto';
        const widths = [];
        for (let i = 0; i < headers.length; i++) widths.push(headers[i].getBoundingClientRect().width);
        table.style.width = authored;
        // Nothing laid out to read (unrendered container — collapsed accordion,
        // inactive tab panel, never-painted background tab): writing these would
        // pin every column to 0px. Skip the lock; pages just size themselves.
        if (!widths.some(width => width > 0)) return;
        // min-width, not width: an overflowing table treats a cell's width as a
        // preference and narrows it when another column grows.
        for (let i = 0; i < headers.length; i++) headers[i].style.minWidth = widths[i] + 'px';
    }

    // The .nds-paged-content a nav controls. Explicit binding wins:
    // data-auto-pagination="gridId" (the content's id). With no value, falls back
    // to the legacy adjacency contract — the nav's immediately-preceding sibling.
    function findNavContent(paginationNav, quiet) {
        const ref = paginationNav.getAttribute('data-auto-pagination');
        if (ref) {
            const el = NDS.resolveElement(ref);
            if (el && el.classList.contains('nds-paged-content')) return el;
            if (!quiet) console.warn(`NDS Pagination: data-auto-pagination="${ref}" matched no .nds-paged-content element.`, paginationNav);
            return null;
        }
        const sibling = paginationNav.previousElementSibling;
        return sibling && sibling.classList.contains('nds-paged-content') ? sibling : null;
    }

    // The auto nav controlling a given .nds-paged-content. Explicit binding wins:
    // a nav whose ref resolves to this element (only when it has an id). Else the
    // legacy adjacency lookup — the first auto nav under the shared parent.
    function findContentNav(contentContainer) {
        if (contentContainer.id) {
            const navs = document.querySelectorAll('.nds-pagination[data-auto-pagination]');
            for (const nav of navs) {
                const ref = nav.getAttribute('data-auto-pagination');
                if (ref && NDS.resolveElement(ref) === contentContainer) return nav;
            }
        }
        // Adjacency fallback: a descendant search from the shared parent, so for a
        // <tbody> it reaches inside every cell. A nav must share the container's
        // sub-row context — one parked in a sub-row drives that row's own nested
        // paged table, and a nested container's nav lives in the same sub as it.
        const parent = contentContainer.parentElement;
        if (!parent) return null;
        const ownSub = contentContainer.closest('tr.nds-sub');
        let firstNav = null;
        for (const nav of parent.querySelectorAll('.nds-pagination[data-auto-pagination]')) {
            if (nav.closest('tr.nds-sub') !== ownSub) continue;
            // Two adjacency pairs under one parent: the nav right after this container is its own.
            if (findNavContent(nav, true) === contentContainer) return nav;
            firstNav ||= nav;
        }
        return firstNav;
    }

    // Per-page picker: any nds-dropmenu carrying `data-per-page-target="<id>"`
    // rewires the linked .nds-paged-content's --per-page from its selected
    // value. Dropmenu SELECT MODE (data-select-name) already emits the event,
    // maintains the trigger label + `selected` state, and closes the menu —
    // this delegate only reacts. One document-level listener covers every
    // widget on the page; guarded so re-init doesn't duplicate.
    let perPageWired = false;
    function addPerPagePickerListeners() {
        if (perPageWired) return;
        perPageWired = true;
        document.addEventListener('nds:dropmenu:select', (e) => {
            const { dropmenu, value } = e.detail;
            writePerPageParam(dropmenu, value);
            const ref = dropmenu.getAttribute('data-per-page-target');
            if (!ref) return;
            const target = NDS.resolveElement(ref);
            if (!target || !target.classList.contains('nds-paged-content')) return;
            const perPage = parseInt(value, 10);
            if (!(perPage > 0)) return;
            target.style.setProperty('--per-page', perPage);
            perPageSizes.set(target, perPage);
            syncAutoPagination(target);
        });
    }

    // Auto-Pagination Generator for content-based pagination
    function initAuto() {
        document.querySelectorAll('.nds-pagination[data-auto-pagination]').forEach(setupAutoContainer);
        addPerPagePickerListeners();
    }

    // Wire one auto-pagination container: paginate to final state now (the
    // rebuild wires clicks), then addAutoNavListeners for the --per-page resize observer.
    // Skips already-initialized navs and navs inside <code>; findNavContent
    // finds the content (its id binding, else the previous sibling).
    function setupAutoContainer(paginationNav) {
        if (paginationNav.hasAttribute('data-nds-auto-pagination-initialized') ||
            paginationNav.closest('code')) {
            return;
        }

        const contentContainer = findNavContent(paginationNav);
        if (!contentContainer) {
            return;
        }

        // Filter-aware: skip [data-filtered] items so a URL-active filter at
        // page open doesn't paint a full-items nav now, then trim it to
        // display:none post-paint → CLS. Filter is registered
        // before Pagination in nds-loader.js so its _readUrlParams() has already
        // stamped data-filtered by the time we get here; on plain pages this
        // filter is a no-op (no items carry the attribute).
        const items = getPagedItems(contentContainer);

        // Build the paginated UI in final state — no all-items → paginated
        // flash. The stamp releases the pre-init hold; all of this runs in one
        // task, so nothing paints between the release and showPage.
        const perPage = readPerPage(contentContainer);
        perPageSizes.set(contentContainer, perPage);
        contentContainer.setAttribute('data-paged-initialized', '');

        // Opt-in URL restore: land on ?page=N before the skeleton reveal — silent
        // (no event, no scroll), clamped by rebuildAutoNav. One build, so the counter's
        // first stamp is the page loading and a screen reader hears nothing.
        const list = paginationNav.querySelector('.nds-pagination-list');
        const page = readPageParam(paginationNav) || (list ? getCurrentPage(list) : 1);
        rebuildAutoNav(paginationNav, contentContainer, items, perPage, page);

        // Clicks were wired by the rebuild above; add the --per-page ResizeObserver.
        addAutoNavListeners(paginationNav, contentContainer);

        // Re-paginate automatically when items are added/removed. Default for all
        // auto-pagination; wired once per page, subsequent calls no-op.
        addAutoRefreshWatchListeners();

        paginationNav.setAttribute('data-nds-auto-pagination-initialized', 'true');
    }

    // THE rebuild step for an auto nav — the first paint (setupAutoContainer) and both
    // rebuild paths (setAutoPagination's --per-page change, syncAutoPagination's
    // filter/add/remove) route here, so they can't drift. Tears down the old ellipsis menu, then either collapses
    // to nothing (≤1 page: every item shown, records stamped, and the empty nav
    // self-hides via .nds-pagination:not(:has(>.nds-pagination-list)) — no inline
    // display to track) or emits the collapsed list, pages the items and wires the
    // ellipsis. `desiredPage` is clamped into the new range here, so callers pass
    // intent, not arithmetic. Returns the page actually rendered, or 0 when it took
    // the no-pagination path — callers key their own extras (URL param, click
    // wiring) off that. Read any live state off the old list BEFORE calling: the
    // first thing this does is destroy it.
    function rebuildAutoNav(nav, content, items, perPage, desiredPage) {
        const totalPages = Math.ceil(items.length / perPage);
        destroyEllipsisMenu(nav); // nav is rebuilt either way

        if (totalPages <= 1) {
            items.forEach(item => item.hidden = false);
            nav.innerHTML = '';
            setRecordSlots(content, items.length, 1, perPage); // showPage is bypassed
            return 0;
        }

        const page = Math.min(Math.max(1, desiredPage), totalPages);
        // Generate the collapsed list directly (no build-all-then-collapse),
        // show the page's items, wire the ellipsis dropmenu + active state.
        nav.innerHTML = buildPaginationHtml(totalPages, page);
        showPage(items, page, perPage);
        setupGeneratedPagination(nav, page, totalPages);
        // The fresh <ul> has no listener. Items are re-read per click, so a later filter change counts.
        addAutoClickListeners(nav.querySelector('.nds-pagination-list'), () => getPagedItems(content), perPage);
        return page;
    }

    // Rebuild an auto-pagination nav for the given --per-page, preserving the
    // current page. Caller: addAutoNavListeners's resize callback; setupAutoContainer
    // and syncAutoPagination call rebuildAutoNav directly.
    function setAutoPagination(paginationNav, items, perPage) {
        // Preserve the current page across a --per-page change — read it before
        // rebuildAutoNav destroys the list it lives on.
        const pagination = paginationNav.querySelector('.nds-pagination-list');
        const currentPage = pagination ? getCurrentPage(pagination) : 1;
        rebuildAutoNav(paginationNav, findNavContent(paginationNav), items, perPage, currentPage);
    }

    // ── HTML builders ────────────────────────────────────────────────
    // data-state for the active page is NOT baked into the template — it stays
    // inside NDS.state.set (activateGeneratedPage / renderLazyRows) so the State
    // vocab never leaks into a literal attribute. aria-current IS emitted; it's
    // semantic and valid pre-JS.
    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('pagination', {
        prev: 'Previous page',
        next: 'Next page',
        page: 'Page {n}',
        more: 'More pages',
        jump: 'Jump to page',
    });
    // Escaped: the pack is site-editable, and these land in innerHTML.
    const getLabelHtml = (key, vars) => NDS.escapeHtml(strings.text(key, vars));
    // Prev, next, more and jump carry markers. A page label holds its number, so it cannot:
    // the ones generated before the pack landed are re-labelled once it does.
    let relabelArmed = false;
    function relabel() {
        const defaults = strings.defaults;
        document.querySelectorAll('.nds-pagination-item .nds-btn[aria-label]').forEach(btn => {
            const pageNumber = btn.textContent.trim();
            if (btn.getAttribute('aria-label') === NDS.i18n.format(defaults.page, { n: pageNumber })) btn.setAttribute('aria-label', strings.text('page', { n: pageNumber }));
        });
    }
    // url (when set) is a page→href function — the controls become navigable
    // anchors for no-JS, server-reload pagination (data-page-url). A disabled
    // prev/next anchor drops its href and keeps role="link" (an <a> with no href
    // has no role, so its label is prohibited); CSS pointer-events handles the rest.
    const buildPrevItem = (disabled, url, prevPage) => {
        const inner = url
            ? `<a class="nds-btn nds-subtle nds-icon-only" aria-label="${getLabelHtml('prev')}" data-i18n-aria-label="pagination.prev"${disabled ? ' role="link" aria-disabled="true"' : ` href="${url(prevPage)}"`}><i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"></i></a>`
            : `<button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="${getLabelHtml('prev')}" data-i18n-aria-label="pagination.prev"${disabled ? ' disabled' : ''}><i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"></i></button>`;
        return `<li class="nds-pagination-item nds-pagination-prev">${inner}</li>`;
    };
    const buildNextItem = (disabled, url, nextPage) => {
        const inner = url
            ? `<a class="nds-btn nds-subtle nds-icon-only" aria-label="${getLabelHtml('next')}" data-i18n-aria-label="pagination.next"${disabled ? ' role="link" aria-disabled="true"' : ` href="${url(nextPage)}"`}><i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i></a>`
            : `<button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="${getLabelHtml('next')}" data-i18n-aria-label="pagination.next"${disabled ? ' disabled' : ''}><i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i></button>`;
        return `<li class="nds-pagination-item nds-pagination-next">${inner}</li>`;
    };
    const buildPageItem = (i, activePage, url) => {
        const ariaCurrent = i === activePage ? ' aria-current="page"' : '';
        const inner = url
            ? `<a class="nds-btn nds-subtle nds-indicator" href="${url(i)}"${ariaCurrent} aria-label="${getLabelHtml('page', { n: i })}"><span class="nds-label">${i}</span></a>`
            : `<button type="button" class="nds-btn nds-subtle nds-indicator"${ariaCurrent} aria-label="${getLabelHtml('page', { n: i })}"><span class="nds-label">${i}</span></button>`;
        return `<li class="nds-pagination-item page_${i}">${inner}</li>`;
    };

    // One generated page row for the ellipsis menu. role="menuitem" is baked in
    // because rows are inserted lazily, AFTER Dropmenu.create's aria pass ran
    // against the (then empty) menu.
    function buildMenuItem(i, activePage, url) {
        const ariaCurrent = i === activePage ? ' aria-current="page"' : '';
        return url
            ? `<a class="nds-btn nds-subtle nds-indicator nds-dropmenu-item" role="menuitem" href="${url(i)}"${ariaCurrent} aria-label="${getLabelHtml('page', { n: i })}"><span class="nds-label">${i}</span></a>`
            : `<button type="button" class="nds-btn nds-subtle nds-indicator nds-dropmenu-item" role="menuitem" aria-label="${getLabelHtml('page', { n: i })}"${ariaCurrent}><span class="nds-label">${i}</span></button>`;
    }

    // Build a pagination list. Above 5 pages, emits the collapsed shape directly
    // — [Prev] 1 2 3 [ellipsis of 4..N-1] N [Next] — so every generated nav skips
    // a build-all-then-collapse round-trip (no NdsPagination needed).
    // Author-written markup takes the separate reconcileCollapse path, which
    // preserves the href/label markup this data-driven builder doesn't carry.
    // pageUrl (a "?page={page}" template) makes every control a navigable <a href>.
    function buildPaginationHtml(totalPages, activePage = 1, pageUrl = null) {
        if (!relabelArmed) { relabelArmed = true; strings.load().then(relabel); }
        activePage = Math.max(1, Math.min(activePage, totalPages));
        const url = toUrlFunction(pageUrl);
        let html = '<ul class="nds-pagination-list">' + buildPrevItem(activePage === 1, url, activePage - 1);
        if (totalPages > 5) {
            html += buildPageItem(1, activePage, url) + buildPageItem(2, activePage, url) + buildPageItem(3, activePage, url);
            html += buildEllipsisShell(); // empty — addEllipsisLazyListeners windows rows in on open
            html += buildPageItem(totalPages, activePage, url);
        } else {
            for (let i = 1; i <= totalPages; i++) html += buildPageItem(i, activePage, url);
        }
        html += buildNextItem(activePage === totalPages, url, activePage + 1) + '</ul>';
        return html;
    }

    // Wire a directly-generated collapsed list: create the ellipsis dropmenu (if
    // present) and stamp active state. Replaces `new NdsPagination` for the
    // auto-pagination paths — the collapse already lives in the markup.
    // totalPages marks the menu as lazily windowed: the collapsed range lands in
    // lazyRanges, keyed by the scroll container (dies with the node on any
    // rebuild — never a consumer-facing attribute) BEFORE activateGeneratedPage,
    // which reads it. reconcileCollapse (author markup, eager menu) passes none.
    function setupGeneratedPagination(paginationNav, activePage, totalPages) {
        const dropmenu = paginationNav.querySelector('.nds-pagination-ellipsis .nds-dropmenu');
        if (dropmenu && totalPages > 5) {
            const scroll = dropmenu.querySelector('.nds-dropmenu-scroll');
            if (scroll) lazyRanges.set(scroll, { from: 4, to: totalPages - 1 });
            addEllipsisLazyListeners();
        }
        if (dropmenu) NDS.Dropmenu.create(dropmenu);
        activateGeneratedPage(paginationNav, activePage);
    }

    // Stamp data-state active for the current page on a freshly generated list:
    // a visible page button, or — when the page is collapsed into the ellipsis —
    // the dropmenu item plus the ellipsis trigger (whose label then shows the number).
    // On a lazy menu the item usually isn't rendered — the trigger alone carries it.
    function activateGeneratedPage(host, activePage) {
        const visibleBtn = host.querySelector(`.page_${activePage} .nds-btn`);
        if (visibleBtn) { NDS.state.set(visibleBtn, 'active'); return; }
        const items = host.querySelectorAll('.nds-pagination-ellipsis .nds-dropmenu-item');
        for (let i = 0; i < items.length; i++) {
            if (parseInt(items[i].querySelector('.nds-label')?.textContent) === activePage) {
                NDS.state.set(items[i], 'active');
                stampTriggerActive(host, activePage);
                return;
            }
        }
        const range = getLazyRange(host);
        if (range && activePage >= range.from && activePage <= range.to) {
            stampTriggerActive(host, activePage);
        }
    }

    // Light the ellipsis trigger as the active-page holder (its label shows the
    // page number — the CSS reveals it on data-state active).
    function stampTriggerActive(host, pageNumber) {
        const trigger = host.querySelector('.nds-pagination-ellipsis .nds-dropmenu-trigger');
        if (!trigger) return;
        NDS.state.set(trigger, 'active');
        const label = trigger.querySelector('.nds-label');
        if (label) label.textContent = pageNumber;
    }

    // The lazily-windowed page range stamped on a generated ellipsis menu's
    // scroll container, or null for an eager (author-markup) menu.
    function getLazyRange(host) {
        const menu = host.querySelector('.nds-pagination-menu');
        const scroll = menu && menu.querySelector('.nds-dropmenu-scroll');
        return (scroll && lazyRanges.get(scroll)) || null;
    }

    // Whether page n is reachable on this nav: numeric via the lazy range
    // (range.to + 1 = last page), DOM presence on eager/author navs.
    function hasPage(pagination, pageNumber) {
        const range = getLazyRange(pagination);
        if (range) return pageNumber >= 1 && pageNumber <= range.to + 1;
        return getAllPageElements(pagination).some(el => readPageNumber(el) === pageNumber);
    }

    // ── URL sync (opt-in) ─────────────────────────────────────────────────
    // data-page-param on the nav opts into Filter/Sort-style URL state: the
    // param (default "page"; set a value for distinct names on multi-nav pages —
    // like Filter, there is no automatic namespacing) is read once at init and
    // applied silently, and page changes write it back with replaceState (no
    // history entries, matching Sort). Page 1 — the default — deletes the param.
    function readPageParam(nav) {
        const attribute = nav.getAttribute('data-page-param');
        if (attribute === null) return null;
        const page = parseInt(new URLSearchParams(window.location.search).get(attribute || 'page'), 10);
        return page > 0 ? page : null;
    }

    function writePageParam(nav, page) {
        const attribute = nav.getAttribute('data-page-param');
        if (attribute != null) writeParam(attribute || 'page', page > 1 ? page : null);
    }

    // The loader read ?per-page= at load; a pick of the size the HTML wrote drops it.
    function writePerPageParam(picker, value) {
        const attribute = picker.getAttribute('data-per-page-param');
        if (attribute != null) writeParam(attribute || 'per-page', value === picker.getAttribute('data-per-page-default') ? null : value);
    }

    // null deletes the param.
    function writeParam(name, value) {
        const params = new URLSearchParams(window.location.search);
        if (value != null) params.set(name, value);
        else params.delete(name);
        NDS.writeUrlParams(params);
    }

    // Every manual page move ends here: the URL param, and on a data-driven nav
    // data-active-page, which is where the app reads the open page back (a lazy
    // nav holds it on no rendered button).
    function syncPage(nav, page) {
        if (nav.hasAttribute('data-total-pages')) nav.dataset.activePage = page;
        writePageParam(nav, page);
    }

    // Land a manual nav on ?page=N at init, silently — no event (not user
    // intent), no scroll. Clamped on data-driven navs; ignored on author navs
    // when the page doesn't exist. No-op without data-page-param.
    function restoreUrlPage(nav) {
        const urlPage = readPageParam(nav);
        if (!urlPage) return;
        const pagination = resolveList(nav);
        const total = parseInt(nav.dataset.totalPages);
        const page = total > 0 ? Math.min(urlPage, total) : urlPage;
        if (!hasPage(pagination, page)) {
            // An empty data-driven nav keeps the page for the app's first request and setTotalPages().
            if (nav.hasAttribute('data-total-pages') && !getAllPageElements(pagination).length) nav.dataset.activePage = page;
            return;
        }
        setActivePage(pagination, page);
        const { min, max } = getPageBounds(getAllPageElements(pagination));
        setPrevNextStates(pagination, page, min, max);
        syncPage(nav, page);
    }

    // ── Lazy ellipsis menu (windowed) ─────────────────────────────────────
    // Generated menus ship an empty shell; on open a fixed-size window of rows
    // around the active page renders into the scroll container, re-windowed
    // from scrollTop as the user scrolls. Spacer divs keep scrollHeight exact
    // (rows are a uniform 40px — .nds-pagination-menu .nds-dropmenu-item pins min-height so
    // every size variant matches), so the DOM stays bounded at ~2×LAZY_OVERSCAN
    // rows regardless of totalPages. Keyboard nav needs no extra wiring:
    // dropmenu re-enumerates focusables per keypress, and focusing a row near
    // the window edge auto-scrolls it into view, which extends the window.
    const LAZY_ROW = 40;      // assumed pitch; re-measured on open
    const LAZY_OVERSCAN = 25; // rows rendered beyond each viewport edge
    const LAZY_SLACK = 10;    // scroll drift (rows) tolerated before re-windowing

    // One document-level delegate for every lazy ellipsis menu; the dropmenu
    // events bubble from the wrapper. Wired on first lazy nav; idempotent.
    let lazyWired = false;
    function addEllipsisLazyListeners() {
        if (lazyWired) return;
        lazyWired = true;

        document.addEventListener('nds:dropmenu:opened', (e) => {
            const scroll = findLazyScroll(e);
            if (scroll) openLazyMenu(e.detail.dropmenu, scroll);
        });

        // Drop the window on close — reopen rebuilds around the then-current
        // page. Reopen-before-transition-end SKIPS this (dropmenu cancels the
        // close), which is why openLazyMenu wipes first instead of assuming empty.
        document.addEventListener('nds:dropmenu:closed', (e) => {
            const scroll = findLazyScroll(e);
            if (!scroll) return;
            scroll.innerHTML = '';
            scroll.scrollTop = 0;
            lazyWindows.delete(scroll);
            // Reset the jump input (it lives outside the scroll and survives).
            const jump = e.detail.menu.querySelector('.nds-pagination-jump input');
            if (jump) jump.value = '';
        });
    }

    // The lazy scroll container for a dropmenu event, or null if the event
    // belongs to another dropmenu (per-page picker, author menus, other components).
    function findLazyScroll(e) {
        const menu = e.detail && e.detail.menu;
        if (!menu || !menu.classList.contains('nds-pagination-menu')) return null;
        const scroll = menu.querySelector('.nds-dropmenu-scroll');
        return (scroll && lazyRanges.has(scroll)) ? scroll : null;
    }

    // Open-time render: window centered on the active page, then re-position the
    // menu (open() measured it empty) and scroll the active row into mid-view.
    // Runs synchronously inside the opened event — same task as open(), pre-paint.
    function openLazyMenu(wrapper, scroll) {
        // Resolve the list first: the wrapper always sits in an ellipsis <li>, so
        // this holds for a standalone .nds-pagination-list root too, where a
        // .nds-pagination lookup finds nothing and the menu opened at the range
        // start instead of the current page.
        const list = wrapper.closest('.nds-pagination-list');
        const nav = list ? resolveNav(list) : null;
        const { from, to } = lazyRanges.get(scroll);
        const active = list ? getCurrentPage(list) : from;

        scroll.innerHTML = ''; // rapid-toggle leftovers (see closed handler)
        const lazyWindow = {
            start: 0, end: 0, pitch: LAZY_ROW, active,
            url: toUrlFunction(nav && nav.getAttribute('data-page-url')),
        };
        lazyWindows.set(scroll, lazyWindow);

        const center = Math.max(from, Math.min(active, to));
        const start = Math.max(from, center - LAZY_OVERSCAN);
        const end = Math.min(to, center + LAZY_OVERSCAN);
        renderLazyRows(scroll, start, end);
        lazyWindow.start = start;
        lazyWindow.end = end;

        // Jump input for large ranges — injected BEFORE syncPosition so the
        // menu is positioned/clamped with its real height.
        if (to - from + 1 > LAZY_JUMP_MIN) ensureJumpBox(nav, scroll);

        // open() positioned/clamped the menu while empty — re-run against the
        // real content (syncPosition self-clears its inline width/maxHeight).
        const instance = wrapper.ndsDropmenu;
        if (instance && instance.syncPosition) instance.syncPosition();

        // True pitch (40 by CSS contract; measured to avoid a JS↔CSS constant).
        const row = scroll.querySelector('.nds-dropmenu-item');
        const pitch = (row && row.offsetHeight) || LAZY_ROW;
        if (pitch !== lazyWindow.pitch) {
            lazyWindow.pitch = pitch;
            renderLazyRows(scroll, start, end); // spacers were sized at the assumed pitch
        }

        scrollToPage(scroll, center);

        if (!scrollWiredMenus.has(scroll)) {
            scrollWiredMenus.add(scroll);
            scroll.addEventListener('scroll', NDS.throttleToFrame(() => shiftWindow(scroll)), { passive: true });
        }
    }

    // Center a page's row in the scroll viewport (clamped by the browser).
    // Pure scroll write — the scroll handler re-windows on the next frame;
    // sync=true materializes the row in the same task (Enter-commit needs it).
    function scrollToPage(scroll, page, sync) {
        const pitch = lazyWindows.get(scroll).pitch;
        const viewportRows = Math.ceil(scroll.clientHeight / pitch) || 1;
        scroll.scrollTop = Math.max(0, (page - lazyRanges.get(scroll).from - (viewportRows >> 1)) * pitch);
        if (sync) shiftWindow(scroll);
    }

    // Range size beyond which the picker earns a jump-to-page input — small
    // ranges scroll comfortably; hundreds of rows shouldn't be scrolled through.
    const LAZY_JUMP_MIN = 30;

    // Inject the jump box once per menu instance (first open; dies with the nav
    // on any rebuild). Canonical plain .nds-form-container field with the
    // .nds-dropmenu-search pinned-top margin — digits only. Typing live-scrolls
    // the window to the page; Enter commits by clicking the REAL page control
    // (menu row, or strip button for pages outside the collapsed range), so
    // state, events, URL sync and auto-close all ride the existing click contract.
    function ensureJumpBox(nav, scroll) {
        const menu = scroll.closest('.nds-dropmenu-menu');
        if (!menu || menu.querySelector('.nds-pagination-jump')) return;
        menu.insertAdjacentHTML('afterbegin', `<div class="nds-form-container nds-dropmenu-search nds-pagination-jump">
            <div class="nds-form-control">
                <input type="text" inputmode="numeric" dir="ltr" aria-label="${getLabelHtml('jump')}" data-i18n-aria-label="pagination.jump" placeholder="${lazyRanges.get(scroll).to + 1}">
            </div>
        </div>`);
        const box = menu.firstElementChild;
        // Forms init ran before this injection: wire the jump box's clear button and states.
        NDS.Form.create(box);
        const input = box.querySelector('input');

        input.addEventListener('input', () => {
            const digits = input.value.replace(/\D+/g, '');
            if (digits !== input.value) input.value = digits; // numbers only
            const { from, to } = lazyRanges.get(scroll);
            const pageNumber = parseInt(digits, 10);
            if (!(pageNumber > 0)) return;
            scrollToPage(scroll, Math.max(from, Math.min(pageNumber, to)));
        });

        input.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const { from, to } = lazyRanges.get(scroll);
            const pageNumber = parseInt(input.value, 10);
            if (!(pageNumber > 0)) return;
            const page = Math.min(pageNumber, to + 1); // clamp into 1..last
            let btn;
            if (page >= from && page <= to) {
                scrollToPage(scroll, page, true); // materialize the row this task
                btn = Array.from(scroll.querySelectorAll('.nds-dropmenu-item')).find(el => readPageNumber(el) === page);
            } else {
                btn = nav && nav.querySelector(`.page_${page} .nds-btn`); // strip pages (1–3, last)
            }
            if (btn) btn.click();
        });
    }

    // Re-window from scrollTop. Uniform pitch → index math is exact; SLACK keeps
    // row-by-row keyboard scrolling from re-rendering on every step.
    function shiftWindow(scroll) {
        const lazyWindow = lazyWindows.get(scroll), range = lazyRanges.get(scroll);
        if (!lazyWindow || !range || !scroll.isConnected) return;
        const first = range.from + Math.floor(scroll.scrollTop / lazyWindow.pitch);
        const viewportRows = Math.ceil(scroll.clientHeight / lazyWindow.pitch) || 1;
        const start = Math.max(range.from, first - LAZY_OVERSCAN);
        const end = Math.min(range.to, first + viewportRows + LAZY_OVERSCAN);
        if (Math.abs(start - lazyWindow.start) < LAZY_SLACK && Math.abs(end - lazyWindow.end) < LAZY_SLACK) return;
        renderLazyRows(scroll, start, end);
        lazyWindow.start = start;
        lazyWindow.end = end;
    }

    // Height via CSSOM, never a style attribute — a strict style-src blocks the
    // attribute form, which would collapse every spacer and break the scroll math.
    function buildSpacer(height) {
        const el = document.createElement('div');
        el.style.height = height + 'px';
        return el;
    }

    // Materialize exactly the rows [start..end] (page numbers) plus a focused
    // row we must not detach (removal OR re-append kills focus — kept rows are
    // never moved, only neighbors change around them). Spacers are cheap
    // unfocused divs, so they're rebuilt from scratch each pass: one per gap in
    // page coverage, sized gap×pitch — scrollHeight stays exact even with a
    // retained out-of-window focused row.
    function renderLazyRows(scroll, start, end) {
        const { from, to } = lazyRanges.get(scroll);
        const { pitch, active, url } = lazyWindows.get(scroll);

        const focusedEl = document.activeElement;
        const keepFocused = focusedEl && scroll.contains(focusedEl) &&
            focusedEl.classList.contains('nds-dropmenu-item') ? readPageNumber(focusedEl) : null;

        // 1. Trim: drop all spacers and every row outside the keep-set.
        const rows = [];
        Array.from(scroll.children).forEach(el => {
            if (!el.classList.contains('nds-dropmenu-item')) { el.remove(); return; }
            const pageNumber = readPageNumber(el);
            if ((pageNumber >= start && pageNumber <= end) || pageNumber === keepFocused) rows.push(el);
            else el.remove();
        });

        // 2. Fill the window's gaps around kept rows (rows are in page order).
        let rowIndex = 0;
        while (rowIndex < rows.length && readPageNumber(rows[rowIndex]) < start) rowIndex++; // retained focused row above the window
        let chunk = '';
        for (let pageNumber = start; pageNumber <= end; pageNumber++) {
            if (rowIndex < rows.length && readPageNumber(rows[rowIndex]) === pageNumber) {
                if (chunk) { rows[rowIndex].insertAdjacentHTML('beforebegin', chunk); chunk = ''; }
                rowIndex++;
            } else {
                chunk += buildMenuItem(pageNumber, active, url);
            }
        }
        if (chunk) {
            if (rowIndex < rows.length) rows[rowIndex].insertAdjacentHTML('beforebegin', chunk);
            else scroll.insertAdjacentHTML('beforeend', chunk);
        }

        // 3. Fresh spacers: one per uncovered gap.
        let prev = from - 1;
        scroll.querySelectorAll('.nds-dropmenu-item').forEach(rowEl => {
            const pageNumber = readPageNumber(rowEl);
            const gap = pageNumber - prev - 1;
            if (gap > 0) rowEl.insertAdjacentElement('beforebegin', buildSpacer(gap * pitch));
            prev = pageNumber;
        });
        if (prev < to) scroll.insertAdjacentElement('beforeend', buildSpacer((to - prev) * pitch));

        // 4. Active row: aria-current is baked by buildMenuItem; data-state stays
        //    NDS.state-managed (never a literal attribute).
        const activeRow = scroll.querySelector('[aria-current="page"]');
        if (activeRow) NDS.state.set(activeRow, 'active');
    }

    // ── Records slots ("x of y") ──────────────────────────────────────
    // Author-owned counter widgets: an element with data-paged-target="<list id>"
    // holds [data-paged-from]/[data-paged-to]/[data-paged-count] slots that get
    // the current window and item count. Pagination pages the post-filter item
    // set, so the count tracks active filters by construction. Sentence
    // structure and language stay in the author's markup. Manual/server
    // pagination doesn't route here — those slots stay author-owned.
    // A screen reader hears the counter when a page or a filter changes it; the first stamp is the page loading.
    const counterText = new WeakMap();
    function stampRecordSlots(listId, from, to, count) {
        document.querySelectorAll(`[data-paged-target="${listId}"]`).forEach(wrap => {
            // querySelectorAll: a wrapper may repeat a slot across views
            // (e.g. data-paged-count in both the paged and selection lines).
            const stamp = (selector, value) => wrap.querySelectorAll(selector).forEach(el => { el.textContent = NDS.formatNumber(value); });
            stamp('[data-paged-from]', from);
            stamp('[data-paged-to]', to);
            stamp('[data-paged-count]', count);
            const before = counterText.get(wrap), text = wrap.textContent;
            counterText.set(wrap, text);
            // innerText: only the line in view, not one a hidden view repeats.
            if (before !== undefined && before !== text) NDS.announce(wrap.innerText.trim());
        });
    }

    function setRecordSlots(list, count, pageNumber, perPage) {
        if (!list || !list.id) return;
        const from = count ? (pageNumber - 1) * perPage + 1 : 0;
        const to = Math.min(pageNumber * perPage, count);
        stampRecordSlots(list.id, from, to, count);
    }

    // Settles synchronously so the page swap never flashes all-items then hides. Layout reads: lockTableColumns, and the counter's innerText when its text changes.
    function showPage(items, pageNumber, perPage) {
        const start = (pageNumber - 1) * perPage;
        const end = start + perPage;

        items.forEach((item, index) => {
            item.hidden = index < start || index >= end;
        });
        lockTableColumns(items);

        if (items[0]) setRecordSlots(items[0].closest('.nds-paged-content'), items.length, pageNumber, perPage);
    }

    // Active page number, or null when nothing carries it. Rendered elements
    // first (in-list + rendered dropmenu items), then the ellipsis trigger —
    // on a lazy nav with a mid-range active page the trigger (label = page
    // number) is the only holder while the menu is closed or windowed away.
    function findCurrentPage(pagination) {
        const active = getAllPageElements(pagination).find(el => el.ariaCurrent === 'page');
        if (active) return readPageNumber(active) || null;
        const trigger = pagination.querySelector('.nds-pagination-ellipsis .nds-dropmenu-trigger');
        if (trigger && NDS.state.has(trigger, 'active')) {
            const pageNumber = parseInt(trigger.querySelector('.nds-label')?.textContent);
            if (!isNaN(pageNumber)) return pageNumber;
        }
        return null;
    }

    function getCurrentPage(pagination) {
        return findCurrentPage(pagination) || 1;
    }

    // ── Interaction layer (wired at init; runs on click / resize) ─────────

    // Scroll the target back into view after a page change — no-op when it
    // already sits below the sticky nav. Tunable gap between the sticky nav
    // and the scroll target: override per-page or globally via
    // `--pagination-scroll-offset` (read off the nav element).
    function scrollToContent(pagination) {
        const paginationNav = resolveNav(pagination);
        const contentContainer = findNavContent(paginationNav);
        NDS.scrollBelowNav(contentContainer || paginationNav, {
            offsetVar: '--pagination-scroll-offset',
            offsetEl: paginationNav,
        });
    }

    // Page-change scroll is on by default; opt out per nav with
    // data-pagination-no-scroll. A click scrolls at once, server-driven or not;
    // setPage() scrolls too. NDS.Pagination.scrollToContent() ignores the
    // attribute: calling it explicitly is the intent.
    function scrollOnPageChange(pagination) {
        const nav = resolveNav(pagination);
        if (nav.hasAttribute('data-pagination-no-scroll')) return;
        scrollToContent(pagination);
    }

    // Dispatch nds:pagination:change after a user-initiated page change. detail
    // mirrors the sibling :change family (filter/sort/stepper/tab): new value +
    // previous + total + the component element. Fired on the .nds-pagination nav,
    // bubbling. setPage() (programmatic) stays silent to avoid feedback loops.
    function dispatchPageChange(pagination, page, previousPage, totalPages) {
        const nav = resolveNav(pagination);
        nav.dispatchEvent(new CustomEvent('nds:pagination:change', {
            detail: { page, previousPage, totalPages, pagination: nav },
            bubbles: true
        }));
    }

    function goToPage(pagination, items, pageNumber, perPage, totalPages) {
        const previousPage = findCurrentPage(pagination);

        setActivePage(pagination, pageNumber);
        setPrevNextStates(pagination, pageNumber, 1, totalPages);
        showPage(items, pageNumber, perPage);
        scrollOnPageChange(pagination);
        // Before the event: a listener reads ?page= for its request.
        writePageParam(resolveNav(pagination), pageNumber);
        dispatchPageChange(pagination, pageNumber, previousPage, totalPages);
    }

    // Per-nav click handler for an auto-pagination's <ul>. getItems() returns
    // the current page-item set live (each call); totalPages is derived from it
    // per click so a post-init filter change is reflected in the next/prev
    // bounds without re-wiring. Called once per list: only rebuildAutoNav calls
    // it, right after it creates the <ul>.
    function addAutoClickListeners(newPagination, getItems, perPage) {
        // The nav's controller, so destroy() releases this listener too. A fresh one per list:
        // the old list's listener would otherwise stay on the signal until destroy().
        const nav = resolveNav(newPagination);
        clickAbortControllers.get(nav)?.abort();
        const abortController = new AbortController();
        clickAbortControllers.set(nav, abortController);
        newPagination.addEventListener('click', (e) => {
            const { page: pageElement, prev: prevElement, next: nextElement } = resolveClickedControl(newPagination, e.target);

            if (pageElement) {
                if (pageElement.tagName.toLowerCase() === 'a') e.preventDefault();
                const pageNumber = readPageNumber(pageElement);
                if (!pageNumber) return;
                const items = getItems();
                goToPage(newPagination, items, pageNumber, perPage, Math.ceil(items.length / perPage));
                return;
            }

            if (!prevElement && !nextElement) return;

            e.preventDefault();
            const items = getItems();
            const totalPages = Math.ceil(items.length / perPage);
            const currentPage = getCurrentPage(newPagination);
            if (prevElement && currentPage > 1) {
                goToPage(newPagination, items, currentPage - 1, perPage, totalPages);
            } else if (nextElement && currentPage < totalPages) {
                goToPage(newPagination, items, currentPage + 1, perPage, totalPages);
            }
        }, { signal: abortController.signal });
    }

    // What a click on a list hit, shared by the auto and manual handlers: a page
    // (a strip control, or a row of this list's own ellipsis menu), prev or next.
    // The page match excludes .nds-pagination-ellipsis (PAGE_ITEM_SELECTOR).
    function resolveClickedControl(list, target) {
        const row = target.closest('.nds-dropmenu-item');
        return {
            page: target.closest(PAGE_CONTROL_SELECTOR) ||
                (row && list.contains(row.closest('.nds-dropmenu')) ? row : null),
            prev: target.closest('.nds-pagination-prev button, .nds-pagination-prev a'),
            next: target.closest('.nds-pagination-next button, .nds-pagination-next a'),
        };
    }

    // Wire one auto-pagination's --per-page ResizeObserver + (once) the shared
    // .nds-paged-content onDomRemove cleanup. Click wiring rides rebuildAutoNav.
    // Called from setupAutoContainer's initial paint and when syncAutoPagination adopts a swapped-in container.
    function addAutoNavListeners(paginationNav, contentContainer) {
        // Watch for --per-page changes on resize. Stored handle lets the
        // shared .nds-paged-content removal listener release the pooled
        // ResizeObserver entry when this container leaves the DOM.
        // perPageSizes is the baseline: the picker writes it too, so a pick never reads as a resize change.
        offResizes.set(contentContainer, NDS.onElementResize(contentContainer, NDS.debounce(() => {
            const currentPerPage = readPerPage(contentContainer);
            if (currentPerPage === perPageSizes.get(contentContainer)) return;
            perPageSizes.set(contentContainer, currentPerPage);
            // Items re-queried live, so a filter change since init is respected.
            setAutoPagination(paginationNav, getPagedItems(contentContainer), currentPerPage);
        }, 150)));

        // Release pooled ResizeObserver subscriptions when paged-content
        // containers leave the DOM. Wired once per page; idempotent.
        if (!autoCleanupReady) {
            autoCleanupReady = true;
            NDS.onDomRemove('.nds-paged-content', removed => {
                removed.forEach(el => {
                    if (offResizes.has(el)) {
                        offResizes.get(el)();
                        offResizes.delete(el);
                    }
                });
            });
        }
    }

    // Refresh auto-pagination for a specific content container (used by filters
    // and the auto-refresh watcher). Resets to page 1 over the
    // visible (non-[data-filtered]) subset. With { keepPage: true } it stays on
    // the current page instead (clamped to the new last page) — for add/remove,
    // where snapping back to page 1 would lose the user's place.
    function syncAutoPagination(contentContainer, options = {}) {
        if (!contentContainer) return;

        const paginationNav = findContentNav(contentContainer);
        if (!paginationNav) return;

        // Skip refreshes that land BEFORE this nav's first-paint setup. At page
        // load Filter (registered before Pagination) calls refresh during its
        // init, ahead of setupAutoContainer — but setupAutoContainer already
        // paints the same filter-aware (visible-only) nav from data-filtered, so
        // the pre-setup refresh is redundant. Once initialized, interaction-time
        // refreshes run normally.
        if (!paginationNav.hasAttribute('data-nds-auto-pagination-initialized')) return;

        // Get only visible (non-filtered) items
        const visibleItems = getPagedItems(contentContainer);

        // Read fresh: a --per-page set inline before refresh() must split the pages again.
        const perPage = readPerPage(contentContainer);
        perPageSizes.set(contentContainer, perPage);

        // Resolve the desired page BEFORE the nav is rebuilt: keepPage reads the
        // live active page off the current list (rebuildAutoNav clamps it into
        // the new range); otherwise reset to 1 (the filter default).
        let desiredPage = 1;
        if (options.keepPage) {
            const list = paginationNav.querySelector('.nds-pagination-list');
            // No list: init saw too few items to page, so ?page= is still unread; the write below consumes it.
            if (list) desiredPage = getCurrentPage(list);
            else desiredPage = readPageParam(paginationNav) || 1;
        }

        const page = rebuildAutoNav(paginationNav, contentContainer, visibleItems, perPage, desiredPage);

        // A container swapped in after setup (an AJAX filter's results) is adopted as
        // setupAutoContainer does at load: its hold released, its --per-page watched.
        if (!contentContainer.hasAttribute('data-paged-initialized')) {
            contentContainer.setAttribute('data-paged-initialized', '');
            addAutoNavListeners(paginationNav, contentContainer);
        }

        // Keep the opted-in URL param truthful across filter/refresh resets
        // (collapsed or reset → 1 deletes it; keepPage clamps update it). Never
        // runs at init — pre-init refreshes bail above.
        writePageParam(paginationNav, page || 1);
    }

    // Auto-refresh: every auto-pagination re-paginates itself when .nds-page-item
    // nodes are added/removed anywhere in its content — no NDS.Pagination.refresh()
    // call needed, at ANY nesting (grid/list direct children, table rows under
    // <tbody>, any wrapper). Wired once per page (on the first auto container's
    // setup), riding the shared body MutationObserver via onDomAdd/onDomRemove —
    // no new observer. Watches the items themselves, not a parent selector, so it
    // is content-shape agnostic.
    //
    // Adds: the node is attached → route each to its .nds-paged-content via
    // closest(), and hide off-page items NOW (this callback is a microtask → runs
    // before paint) so fresh items don't flash during the debounce window.
    // Removes: the node is detached (no closest()) → re-check every initialized
    // auto nav; each recomputes from its own live items, and a removal adds nothing
    // visible so no pre-paint pass is needed. Only the costly nav rebuild is debounced.
    //
    // No feedback loop: pagination's own writes are item.hidden (attribute) and nav
    // innerHTML (.nds-pagination-item children, not .nds-page-item) — neither is a
    // .nds-page-item add/remove.
    function addAutoRefreshWatchListeners() {
        if (autoRefreshWatchReady) return;
        autoRefreshWatchReady = true;

        const pending = new Set();
        const flush = NDS.debounce(() => {
            pending.forEach(content => syncAutoPagination(content, { keepPage: true }));
            pending.clear();
        }, 150);

        NDS.onDomAdd('.nds-page-item', added => {
            // Dedupe to containers first — a bulk insert reports N added nodes, but
            // the pre-paint visibility pass need only run once per container.
            const containers = new Set();
            added.forEach(item => { const content = item.closest('.nds-paged-content'); if (content) containers.add(content); });
            let queued = false;
            containers.forEach(content => {
                const nav = findContentNav(content);
                if (!nav) return;
                syncCurrentPageVisibility(content, nav);
                pending.add(content);
                queued = true;
            });
            if (queued) flush();
        });

        NDS.onDomRemove('.nds-page-item', () => {
            const navs = document.querySelectorAll('.nds-pagination[data-nds-auto-pagination-initialized]');
            let queued = false;
            navs.forEach(nav => { const content = findNavContent(nav); if (content) { pending.add(content); queued = true; } });
            if (queued) flush();
        });
    }

    // Re-apply the current page's visibility over the live (non-filtered) item
    // set without touching the nav controls — the cheap half of a refresh,
    // safe to run synchronously per mutation. Clamps to the new last page.
    function syncCurrentPageVisibility(content, nav) {
        const list = nav.querySelector('.nds-pagination-list');
        if (!list) return;
        const perPage = perPageSizes.get(content) || readPerPage(content);
        const items = getPagedItems(content);
        const totalPages = Math.max(1, Math.ceil(items.length / perPage));
        showPage(items, Math.min(getCurrentPage(list), totalPages), perPage);
    }

    // Shared apply step for manual paginations: stamp active, refresh prev/next
    // bounds from the page set, scroll if needed. Both branches of
    // the nav's click handler land here once they've resolved a target page.
    function setManualPage(pagination, targetPageNumber, allPageElements) {
        const previousPage = findCurrentPage(pagination);
        setActivePage(pagination, targetPageNumber);
        const { min, max } = getPageBounds(allPageElements);
        setPrevNextStates(pagination, targetPageNumber, min, max);
        scrollOnPageChange(pagination);
        // Before the event: a listener reads data-active-page or ?page= for its request.
        syncPage(resolveNav(pagination), targetPageNumber);
        dispatchPageChange(pagination, targetPageNumber, previousPage, max);
    }

    // Per-nav click handler for manual pagination. Scoped to the nav element,
    // so DOM removal releases the listener automatically; destroy() aborts its
    // clickAbortControllers entry. Idempotent: a re-wire on an already-wired nav
    // no-ops, so init()/create() are safe to repeat. Auto-paginations are wired
    // separately by rebuildAutoNav and skip this path.
    function addManualNavClickListeners(paginationNav) {
        if (clickAbortControllers.has(paginationNav)) return;
        const abortController = new AbortController();
        clickAbortControllers.set(paginationNav, abortController);
        paginationNav.addEventListener('click', (e) => {
            // The list inside the nav, or the nav itself when used as a standalone
            // .nds-pagination-list. Reused below for getAllPageElements + the
            // apply step (which call setActivePage / setPrevNextStates against
            // the list element).
            const pagination = resolveList(paginationNav);

            const { page: clickedElement, prev: prevElement, next: nextElement } = resolveClickedControl(pagination, e.target);
            if (!clickedElement && !prevElement && !nextElement) return;

            // Defensive: if auto-pagination wiring landed on this nav after init
            // (a `data-auto-pagination` resolved late), let its own handler
            // own the click.
            if (paginationNav.hasAttribute('data-nds-auto-pagination-initialized')) return;

            // Resolve target page once; the element set serves both
            // bounds-finding (prev/next) and the post-change prev/next reconcile.
            const allPageElements = getAllPageElements(pagination);

            if (prevElement || nextElement) {
                const currentPageNumber = findCurrentPage(pagination);
                if (currentPageNumber === null) return;
                const targetPageNumber = prevElement ? currentPageNumber - 1 : currentPageNumber + 1;
                // Confirm the target exists — numeric on a lazy nav (most pages
                // aren't in the DOM), DOM presence on author navs.
                if (!hasPage(pagination, targetPageNumber)) return;
                setManualPage(pagination, targetPageNumber, allPageElements);
                return;
            }

            const clickedPageNumber = readPageNumber(clickedElement);
            if (isNaN(clickedPageNumber)) return;
            setManualPage(pagination, clickedPageNumber, allPageElements);
        }, { signal: abortController.signal });
    }

    // Update a manual / data-driven nav's total page count and rebuild its
    // controls. Manual content lives on the server, so its count can't be
    // observed — the consumer calls this from the fetch handler when a new
    // query changes the result size. activePage defaults to the current page
    // clamped to the new range; pass it to jump (e.g. 1 on a fresh query).
    // The nav-level click handler reads elements live, so it survives the
    // innerHTML swap untouched (addManualNavClickListeners below is just a safety
    // net for a nav that was never inited).
    function setTotalPages(paginationNav, totalPages, activePage) {
        if (!paginationNav) return;
        if (paginationNav.hasAttribute('data-auto-pagination')) {
            console.warn('NDS Pagination: setTotalPages is for manual / data-driven navs. For auto-pagination, add/remove .nds-page-item items (auto-refreshes) or call refresh().', paginationNav);
            return;
        }
        totalPages = parseInt(totalPages);
        if (!(totalPages >= 0)) return;
        // A page with no pagination at load never ran init(), as in create().
        addNavCleanupListeners();
        addPerPagePickerListeners();

        const list = paginationNav.querySelector('.nds-pagination-list');
        // No list yet: the page init or the app wrote, then ?page= for a nav init never saw.
        const current = list ? getCurrentPage(list) : (parseInt(paginationNav.dataset.activePage) || readPageParam(paginationNav) || 1);
        const target = Math.min(Math.max(1, parseInt(activePage) || current), Math.max(1, totalPages));

        if (list && parseInt(paginationNav.dataset.totalPages) === totalPages) {
            // Same count: move the page only — a rebuild drops the button the user just pressed.
            if (target !== current) {
                setActivePage(list, target);
                setPrevNextStates(list, target, 1, totalPages);
            }
        } else {
            paginationNav.dataset.totalPages = totalPages; // keep the attribute truthful
            destroyEllipsisMenu(paginationNav); // also closes a picker left open across the total change
            if (totalPages <= 1) {
                paginationNav.replaceChildren(); // CSS hides a nav with no list
            } else {
                paginationNav.innerHTML = buildPaginationHtml(totalPages, target, paginationNav.getAttribute('data-page-url'));
                setupGeneratedPagination(paginationNav, target, totalPages); // ellipsis dropmenu + active stamp (prev/next come baked)
            }
            addManualNavClickListeners(paginationNav);
        }
        // A nav init left empty (count known only after the first request) still holds its placeholder.
        paginationNav.setAttribute('data-nds-pagination-initialized', 'true');
        syncPage(paginationNav, target);
    }

    // Expose global API for unified init system
    NDS.Pagination = {
        init: setupPagination,
        reinit: () => { setupPagination(); initAuto(); },
        initAuto,
        create: (container) => {
            // A live nav is returned as-is — re-wiring its click handler would
            // stack a second listener on the same element.
            if (container.ndsPagination) return container.ndsPagination;
            // A page with no pagination at load never runs init(), so create() wires the cleanup and picker too.
            addNavCleanupListeners();
            addPerPagePickerListeners();
            // Manual navs take init's full path (URL page, states, reveal); auto-paginations
            // are wired by reinit() (setupAutoContainer).
            const instance = container.hasAttribute('data-auto-pagination')
                ? new NdsPagination(container)
                : setupNav(container);
            return instance._valid ? instance : null;
        },
        refresh: syncAutoPagination,
        destroy: destroyPaginationNav,
        setPage: function(container, pageNumber) {
            const pagination = resolveList(container);
            const { min, max } = getPageBounds(getAllPageElements(pagination));
            if (!Number.isFinite(min)) return;
            setActivePage(pagination, pageNumber);
            setPrevNextStates(pagination, pageNumber, min, max);
            scrollOnPageChange(pagination);
            syncPage(resolveNav(container), pageNumber);
        },
        // Manual scroll for consumers driving their own page changes. Ignores
        // data-pagination-no-scroll — the explicit call is the intent.
        scrollToContent: function(container) {
            scrollToContent(resolveList(container));
        },
        // Server/manual pagination hook: push your own numbers through the same
        // [data-paged-target] slot grammar the auto path stamps.
        // NDS.Pagination.setRecords('listId', { from: 21, to: 30, count: 214 })
        setRecords: function(listOrId, { from = 0, to = 0, count = 0 } = {}) {
            const id = typeof listOrId === 'string' ? listOrId : (listOrId && listOrId.id);
            if (id) stampRecordSlots(id, from, to, count);
        },
        setTotalPages,
    };

    // Note: Initialization now handled by nds-loader.js unified system
})();
