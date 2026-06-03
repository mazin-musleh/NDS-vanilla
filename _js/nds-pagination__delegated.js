/**
 * NDS Pagination Component — Lazy behavior half
 *
 * SPLIT COMPONENT — LAZY BEHAVIOR HALF
 * ─────────────────────────────────────────────────────────────────────────────
 * Ships in nds-delegated.min.js; loaded post-reveal via NDS.loadSplit('Pagination'),
 * triggered by either a trapped NDS.Pagination.refresh() call (filter path), the
 * shell's queued behavior._wireAutoNav (one entry per auto-pagination painted
 * during the critical pass), or the shell's capture-phase kick listener firing
 * on any pagination click.
 *
 * Owns:
 *   - The global delegated click listener for manual pagination
 *     (prev/next, direct page, portaled dropmenu items) — module-lifetime, no
 *     teardown; pagination has none.
 *   - Per-nav click handler for auto-pagination (wireAutoClicks)
 *   - goToPage (setActivePage + updatePrevNextStates + showPage + scrollToContent)
 *   - scrollToContent (sticky-nav-aware smooth scroll after a click)
 *   - refreshAutoPagination (filter-driven; the NDS.Pagination.refresh entry)
 *   - The per-container --per-page ResizeObserver + the .nds-paged-content
 *     NDS.onDOMRemove cleanup that releases pooled observer entries
 *
 * Eager shell (nds-pagination.js) owns first-paint HTML construction (HTML
 * builders, NDSPagination collapse path, lockTableColumns, the initial
 * active-state stamp), the capture-phase kick + auto-anchor preventDefault
 * listener, and the public NDS.Pagination trap surface. See its banner for
 * the contract.
 *
 * Contract: the IIFE wires the global manual-pagination click listener
 * synchronously, then calls NDS.Pagination._installBehavior(factory) — the
 * factory's __deferred array names every method trapped in the shell (build
 * asserts trap coverage both directions). The install replays the shell's
 * pending queue (one _wireAutoNav per auto-pagination + any refresh calls
 * dispatched during init). NEVER reassigns NDS.Pagination (build assert
 * assert_splits_valid! enforces this).
 */

(function() {
    'use strict';

    if (!NDS.Pagination || !NDS.Pagination._installBehavior) return;

    // Shell internals — captured at module eval. Used by every handler below.
    const {
        _updateAutoPagination: updateAutoPagination,
        _generatePaginationHTML: generatePaginationHTML,
        _showPage: showPage,
        _wireGeneratedPagination: wireGeneratedPagination,
        _setActivePage: setActivePage,
        _updatePrevNextStates: updatePrevNextStates,
        _getAllPageElements: getAllPageElements,
        _getCurrentPage: getCurrentPage,
        _pageNumberOf: pageNumberOf,
        _readPerPage: readPerPage,
    } = NDS.Pagination;

    // One-shot guard for the auto-pagination DOM-removal listener.
    let _autoCleanupReady = false;

    // Scroll the target back into view after a page change. Reads
    // getBoundingClientRect once, early-returns when already in view (so the
    // no-scroll path skips the getComputedStyle recalc), and only resolves the
    // sticky-nav offset when we know we'll actually scroll.
    function scrollToContent(pagination) {
        const paginationNav = pagination.closest('.nds-pagination');
        if (!paginationNav) return;

        const contentContainer = paginationNav.previousElementSibling;
        const targetElement = (contentContainer && contentContainer.classList.contains('nds-paged-content'))
            ? contentContainer
            : paginationNav;

        const nav = document.querySelector('.nds-main-nav');
        const navHeight = nav ? nav.offsetHeight : 72;
        const targetTop = targetElement.getBoundingClientRect().top;
        if (targetTop >= navHeight) return;

        // Tunable gap between the sticky nav and the pagination scroll target.
        // Override per-page or globally via `--pagination-scroll-offset`.
        const offsetVar = parseFloat(getComputedStyle(paginationNav).getPropertyValue('--pagination-scroll-offset'));
        const offset = Number.isFinite(offsetVar) ? offsetVar : 120;
        window.scrollTo({
            top: targetTop + window.pageYOffset - navHeight - offset,
            behavior: 'smooth',
        });
    }

    function goToPage(pagination, items, pageNumber, perPage, totalPages) {
        // Set active page with aria-current
        setActivePage(pagination, pageNumber);

        // Update prev/next button states
        updatePrevNextStates(pagination, pageNumber, 1, totalPages);

        // Show page items
        showPage(items, pageNumber, perPage);

        // Scroll to top of content
        scrollToContent(pagination);
    }

    // Per-nav click handler for an auto-pagination's <ul>. getItems() returns
    // the current page-item set live (each call); totalPages is derived from it
    // per click so a post-init filter change is reflected in the next/prev
    // bounds without re-wiring. Portaled dropmenu items reach this via the
    // wrapper's re-dispatched click (see nds-dropmenu.js).
    //
    // Idempotent on the pagination element: Filter (registered before Pagination)
    // calls refresh during its init; refresh queues, then Pagination shell queues
    // _wireAutoNav. The half drains in FIFO order — refresh wires first, then
    // _wireAutoNav would re-wire the same nav. The flag stops the second pass
    // from double-wiring (every click would otherwise fire goToPage twice).
    function wireAutoClicks(newPagination, getItems, perPage) {
        if (newPagination._ndsAutoClickWired) return;
        newPagination._ndsAutoClickWired = true;
        newPagination.addEventListener('click', (e) => {
            const pageElement = e.ndsDropmenuItem
                || e.target.closest('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a, .nds-dropmenu-item');

            if (pageElement) {
                if (pageElement.tagName.toLowerCase() === 'a') e.preventDefault();
                const pageNumber = pageNumberOf(pageElement);
                if (!pageNumber) return;
                const items = getItems();
                goToPage(newPagination, items, pageNumber, perPage, Math.ceil(items.length / perPage));
                return;
            }

            // Prev/next (button or anchor).
            const prevElement = e.target.closest('.nds-pagination-prev button, .nds-pagination-prev a');
            const nextElement = e.target.closest('.nds-pagination-next button, .nds-pagination-next a');
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
        });
    }

    // Wire one auto-pagination's interaction layer: per-nav click handler +
    // the --per-page ResizeObserver + (once) the shared .nds-paged-content
    // onDOMRemove cleanup. Replayed from the shell's pending queue at install
    // (one entry per auto-pagination painted during the critical pass), and
    // called directly for any auto-pagination registered after install.
    function _wireAutoNav(spec) {
        const { paginationNav, contentContainer, perPage } = spec;

        // Live item set: re-queried each click + each resize so a filter
        // change after init (Filter calls refresh; refresh replaces the list
        // + the OLD click closure with it, but THIS resize observer survives
        // unaltered) doesn't paginate over a stale snapshot.
        const liveItems = () => Array.from(contentContainer.querySelectorAll('.nds-page-item'))
            .filter(it => !it.hasAttribute('data-filtered'));

        const pagination = paginationNav.querySelector('.nds-pagination-list');
        if (pagination) wireAutoClicks(pagination, liveItems, perPage);

        // Watch for --per-page changes on resize. Stored handle lets the
        // shared .nds-paged-content removal listener release the pooled
        // ResizeObserver entry when this container leaves the DOM.
        let lastPerPage = perPage;
        contentContainer._offResize = NDS.onElementResize(contentContainer, NDS.debounce(() => {
            const currentPerPage = readPerPage(contentContainer);
            if (currentPerPage === lastPerPage) return;
            lastPerPage = currentPerPage;
            contentContainer._ndsPerPage = currentPerPage;
            const currentItems = liveItems();
            updateAutoPagination(paginationNav, currentItems, currentPerPage);
            // innerHTML replace just created a fresh <ul> with no listener; re-wire.
            const newPag = paginationNav.querySelector('.nds-pagination-list');
            if (newPag) wireAutoClicks(newPag, liveItems, currentPerPage);
        }, 150));

        // Release pooled ResizeObserver subscriptions when paged-content
        // containers leave the DOM. Wired once per page; idempotent.
        if (!_autoCleanupReady) {
            _autoCleanupReady = true;
            NDS.onDOMRemove('.nds-paged-content', removed => {
                removed.forEach(el => {
                    if (el._offResize) {
                        el._offResize();
                        delete el._offResize;
                    }
                });
            });
        }
    }

    // Refresh auto-pagination for a specific content container (used by filters).
    // Resets to page 1 over the visible (non-[data-filtered]) subset.
    function refreshAutoPagination(contentContainer) {
        if (!contentContainer) return;

        // Find the pagination nav associated with this content container
        const paginationNav = contentContainer.parentElement?.querySelector('.nds-pagination[data-auto-pagination]');
        if (!paginationNav) return;

        // Get only visible (non-filtered) items
        const allItems = Array.from(contentContainer.querySelectorAll('.nds-page-item'));
        const visibleItems = allItems.filter(item => !item.hasAttribute('data-filtered'));

        const perPage = contentContainer._ndsPerPage || readPerPage(contentContainer);
        const totalPages = Math.ceil(visibleItems.length / perPage);

        // If no pagination needed (0 or 1 page), hide pagination and show all visible items
        if (totalPages <= 1) {
            visibleItems.forEach(item => item.hidden = false);
            paginationNav.innerHTML = '';
            paginationNav.style.display = 'none';
            return;
        }

        // Show pagination
        paginationNav.style.display = '';

        // Generate the collapsed list directly (no build-all-then-collapse)
        paginationNav.innerHTML = generatePaginationHTML(totalPages, 1, true);

        // Show first page items
        showPage(visibleItems, 1, perPage);

        // Wire the ellipsis dropmenu + stamp active state
        wireGeneratedPagination(paginationNav, 1);

        // Wire clicks; re-filter the item set on each click in case the
        // filter changed since this nav was generated. totalPages is derived
        // from the live items inside wireAutoClicks (same getItems closure).
        const newPagination = paginationNav.querySelector('.nds-pagination-list');
        wireAutoClicks(
            newPagination,
            () => Array.from(contentContainer.querySelectorAll('.nds-page-item'))
                .filter(item => !item.hasAttribute('data-filtered')),
            perPage
        );
    }

    // Shared apply step for manual paginations: stamp active, refresh prev/next
    // bounds from the portal-aware page set, scroll if needed. Both branches of
    // the document click handler land here once they've resolved a target page.
    function _applyManualPageChange(pagination, targetPageNum, allPageElements) {
        setActivePage(pagination, targetPageNum);
        const pageNumbers = allPageElements.map(el => pageNumberOf(el)).filter(n => !isNaN(n));
        updatePrevNextStates(pagination, targetPageNum, Math.min(...pageNumbers), Math.max(...pageNumbers));
        scrollToContent(pagination);
    }

    // Global click handler for manual pagination (not auto-pagination).
    // Module-lifetime — pagination has no teardown, so a plain listener
    // (no AbortController) is correct here.
    document.addEventListener('click', (e) => {
        // Early-exit for clicks outside any pagination. Portaled dropmenu
        // re-dispatch (nds-dropmenu fires a synthetic click on the wrapper,
        // which sits inside .nds-pagination-list and carries
        // `e.ndsDropmenuItem`) still satisfies this gate, so portaled items
        // aren't filtered out. The captured `pagination` is reused below as
        // the resolved container — closest() from any descendant resolves to
        // the same ancestor (paginations don't nest), so no second walk.
        const pagination = e.target.closest?.('.nds-pagination-list');
        if (!pagination) return;

        const portaledItem = e.ndsDropmenuItem || null;
        const pageElement = e.target.closest('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a');
        const dropdownItem = portaledItem || e.target.closest('.nds-pagination-list .nds-dropmenu-item');
        const prevElement = e.target.closest('.nds-pagination-prev button, .nds-pagination-prev a');
        const nextElement = e.target.closest('.nds-pagination-next button, .nds-pagination-next a');

        const clickedElement = pageElement || dropdownItem;
        if (!clickedElement && !prevElement && !nextElement) return;

        // Skip if this is an auto-pagination (handled by its own listener).
        const paginationNav = pagination.closest('.nds-pagination');
        if (paginationNav?.hasAttribute('data-nds-auto-pagination-initialized')) return;

        // Resolve target page once; portal-aware element set serves both
        // bounds-finding (prev/next) and the post-change prev/next reconcile.
        const allPageElements = getAllPageElements(pagination);

        if (prevElement || nextElement) {
            const currentActive = allPageElements.find(el => el.ariaCurrent === 'page');
            if (!currentActive) return;
            const currentPageNum = pageNumberOf(currentActive);
            if (isNaN(currentPageNum)) return;
            const targetPageNum = prevElement ? currentPageNum - 1 : currentPageNum + 1;
            // Confirm the target exists (in-list or in the portaled dropmenu).
            if (!allPageElements.some(el => pageNumberOf(el) === targetPageNum)) return;
            _applyManualPageChange(pagination, targetPageNum, allPageElements);
            return;
        }

        const clickedPageNum = pageNumberOf(clickedElement);
        if (isNaN(clickedPageNum)) return;
        _applyManualPageChange(pagination, clickedPageNum, allPageElements);
    });

    NDS.Pagination._installBehavior(function () {
        return {
            // Build-only contract: every name here MUST match a trap on the
            // shell's `behavior` dispatch (assert_trap_coverage! enforces it
            // both directions). _installBehavior strips this array before
            // Object.assigning so it never leaks onto the public surface.
            __deferred: ['refresh', '_wireAutoNav'],

            refresh: refreshAutoPagination,
            _wireAutoNav,
        };
    });
})();
