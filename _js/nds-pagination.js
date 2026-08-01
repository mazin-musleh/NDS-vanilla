/**
 * NDS Pagination Component
 *
 * Delegated (ships in nds-delegated.min.js, loader-INJECTED after the reveal —
 * NOT critical:true). Pre-init paint is owned by the data-paged-initialized
 * crit-CSS skeleton, which hides items past the default page size (and collapses
 * table rows) until init stamps data-paged-initialized — so init landing
 * post-reveal inserts the list without shifting content. The state init sets:
 *   - HTML builders + the manual-collapse path (NDSPagination →
 *     reconcileCollapse): more than 5 pages collapse to
 *     [Prev] 1 2 3 [ellipsis] N [Next] so author-written full lists never
 *     paint then collapse (horizontal CLS).
 *   - Auto-pagination initial paint (setupAutoContainer → updateAutoPagination):
 *     generates the collapsed list from data-total-pages, hides items past
 *     --per-page via showPage, locks table column widths from the all-rows
 *     skeleton, stamps data-paged-initialized so the skeleton reveals.
 *   - Initial active-state stamping (setActivePage + updatePrevNextStates +
 *     initializePaginationStates) so the active page is highlighted and the
 *     prev/next disabled states are correct on first frame.
 *
 * Interaction (wired at init, runs on click/resize — no forced layout at init):
 *   - Per-nav click handler for manual pagination (_wireManualNavClicks),
 *     scoped via paginationNav._ndsClickAC; DOM removal GCs it automatically.
 *   - Per-nav click handler for auto-pagination (wireAutoClicks).
 *   - goToPage / scrollToContent (sticky-nav-aware smooth scroll; opt out per nav
 *     via data-pagination-no-scroll)
 *   - refreshAutoPagination (filter-driven; the NDS.Pagination.refresh entry)
 *   - The per-container --per-page ResizeObserver + the .nds-paged-content
 *     onDOMRemove cleanup
 *
 * Lifecycle:
 *   - Shared NDS.onDOMRemove('.nds-pagination') sweep aborts the click AC
 *     and releases _offResize for navs torn down without an explicit destroy.
 *   - NDS.Pagination.destroy(nav) — explicit teardown for SPA consumers
 *     (aborts the click AC, releases _offResize, clears the init stamps)
 *   - NDS.Pagination.updateRecords(listOrId, {from, to, count}) — stamp the
 *     records slots ("x of y") from server/manual pagination
 *
 * Display pattern: [Prev] 1 2 3 ... [Last] [Next]
 * - Always shows first 3 pages and last page
 * - All middle pages (4 to second-to-last) grouped in dropdown menu (...)
 * - Generated dropdowns render LAZILY: an empty shell at build time, a
 *   scroll-windowed slice of rows on open (_wireEllipsisLazy) — DOM stays
 *   bounded no matter how large totalPages gets. Author-written menus
 *   (reconcileCollapse) stay eager.
 *
 * Supports both <button> and <a> elements for pagination items.
 *
 * URL sync (opt-in): data-page-param on the nav reads ?page=N at init (applied
 * silently — no event, no scroll) and mirrors page changes back with
 * replaceState, Filter/Sort-style. See _readPageParam/_writePageParam.
 */

(function() {
    'use strict';

    let _autoCleanupReady = false;
    let _navCleanupReady = false;
    let _autoRefreshWatchReady = false;
    let _collapseWatchReady = false;

    // Read --per-page for a paged-content container. Prefers the inline style —
    // the common case is a consumer setting style="--per-page:N", and an inline
    // read costs nothing. Only media-query-driven values (no inline) fall through
    // to getComputedStyle, which forces a style recalc on the (laid-out) container.
    // Defaults to 5. The container itself isn't display:none pre-init — the
    // skeleton hides individual items past --per-page, so the read is not free.
    // Synchronous at init by necessity — the page split must settle before data-paged-initialized reveals, or items flash all → paginated.
    function readPerPage(el) {
        const inline = el.style.getPropertyValue('--per-page');
        const v = parseInt(inline || getComputedStyle(el).getPropertyValue('--per-page'), 10);
        return v > 0 ? v : 5;
    }

    // THE paged-item set for a container: the .nds-page-item elements it owns,
    // minus anything a filter removed. Every scheduling, counting and records
    // path reads through here, so a sixth caller can't re-derive it differently.
    // Container shape decides breadth, mirroring nds-filter.js resolveItems: a
    // grid or list may legally nest its items under a wrapper, but a <tbody>
    // owns only its direct <tr> children — a sub-row's nested paged table has
    // its own .nds-paged-content and must not be paged by this nav.
    function _pagedItems(content) {
        const items = Array.from(content.querySelectorAll('.nds-page-item'))
            .filter(item => !item.hasAttribute('data-filtered'));
        if (content.tagName !== 'TBODY') return items;
        return items.filter(el =>
            el.parentElement === content && !el.classList.contains('nds-sub'));
    }

    // THE page controls a nav owns. The ellipsis exclusion is load-bearing, not
    // cosmetic: the trigger sits in an .nds-pagination-item too, and when it
    // holds the active page its label IS a page number — without the exclusion
    // a trigger click resolves to a page change (scroll jump + a no-op
    // :change event). Today only Dropmenu's stopPropagation hides that, which
    // the documented soft-dependency path (wireGeneratedPagination) doesn't get.
    const _PAGE_ITEM_SEL = '.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next):not(.nds-pagination-ellipsis)';
    const _PAGE_CTRL_SEL = `${_PAGE_ITEM_SEL} button, ${_PAGE_ITEM_SEL} a`;

    // The list element inside a nav, tolerating a bare .nds-pagination-list used
    // as the root. Every path that stamps state or reads controls resolves the
    // list through here, so the standalone-root contract lives in one place.
    function _listOf(el) {
        return el.querySelector('.nds-pagination-list') || el;
    }

    // Page number from a clickable page element: prefer the `.nds-label`
    // text, fall back to the element's own text (prev/next, bare anchors).
    function pageNumberOf(el) {
        return parseInt(el.querySelector('.nds-label')?.textContent || el.textContent);
    }

    // Min/max page numbers across a set of page elements. Returns
    // { min: Infinity, max: -Infinity } when none are numeric.
    function pageBounds(els) {
        const nums = els.map(pageNumberOf).filter(n => !isNaN(n));
        return { min: Math.min(...nums), max: Math.max(...nums) };
    }

    class NDSPagination {
        constructor(paginationNav) {
            this.paginationNav = paginationNav;
            const list = _listOf(paginationNav);

            // Silently skip empty pagination (likely auto-pagination that will be populated)
            if (!list.querySelector('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next)')) return;

            this.valid = true;
            this.init();
        }

        init() {
            // Initial collapse runs through the same re-runnable reconcile the
            // dynamic watcher uses, so the markup-preserving collapse logic lives
            // in exactly one place.
            reconcileCollapse(this.paginationNav);
        }
    }

    // ── Live ellipsis collapse (any manual mode) ─────────────────────────
    // Author page controls are MOVED between the visible strip and the ellipsis
    // dropdown, never re-serialized — class, href, label markup, custom
    // attributes and any consumer-attached listener survive collapse intact.
    // Only what the collapse owns is re-stamped: the dropdown marker class,
    // aria-current, and data-state (NDS.State-managed, never a literal attribute).
    // Local fork of NDS.escapeHtml — also escapes quotes for the attribute
    // context (a data-page-url href); core's version doesn't. Do not swap.
    const _escAttr = v => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    // data-page-url template ("?page={page}") → page-to-href function, or null.
    const _urlFn = pageUrl => pageUrl ? (p => _escAttr(pageUrl.replace('{page}', p))) : null;

    // Capture the ordered page-control set from a manual nav's list, whether it
    // is currently flat or already collapsed (visible buttons + ellipsis
    // dropdown items). Entries carry the LIVE element, so the rebuild reparents
    // the author's own node instead of reconstructing it from captured fields.
    function _capturePageModel(list) {
        const seen = new Set();
        const model = [];
        const push = el => {
            const num = pageNumberOf(el);
            if (isNaN(num) || seen.has(num)) return;
            seen.add(num);
            model.push({ num, el, active: el.ariaCurrent === 'page' || NDS.State.has(el, 'active') });
        };
        list.querySelectorAll(_PAGE_CTRL_SEL).forEach(push);
        getPaginationDropmenuItems(list).forEach(push);
        return model.sort((a, b) => a.num - b.num);
    }

    // Re-stamp the collapse-owned bits on a captured control and hand back the
    // live node for reparenting. data-state is cleared here and re-set by
    // activateGeneratedPage. type is collapse-owned, not author markup: every
    // <button> is pinned to type="button" so a nav inside a <form> can't submit
    // on a page click.
    function _stampControl(e, activeNum, dropdownItem) {
        const el = e.el;
        el.classList.toggle('nds-dropmenu-item', !!dropdownItem);
        NDS.aria.current(el, e.num === activeNum ? 'page' : null);
        NDS.State.clear(el);
        if (el.tagName === 'BUTTON') el.setAttribute('type', 'button');
        return el;
    }

    // One page <li> wrapping the author's own control node.
    function _pageLiM(e, activeNum) {
        const li = document.createElement('li');
        li.className = `nds-pagination-item page_${e.num}`;
        li.appendChild(_stampControl(e, activeNum, false));
        return li;
    }

    // The ellipsis <li>: an EMPTY dropmenu shell, one definition for both
    // consumers so a dropmenu-markup change can't drift between them.
    // Generated navs (generatePaginationHTML) leave it empty — the collapsed
    // range never materializes eagerly, _wireEllipsisLazy windows rows in on
    // open. reconcileCollapse parses it and reparents the author's controls
    // into the scroll container, which stays eager.
    function _ellipsisShell() {
        return `<li class="nds-pagination-item nds-pagination-ellipsis"><div class="nds-dropmenu"><button type="button" class="nds-btn nds-subtle nds-ellipsis nds-indicator nds-dropmenu-trigger" aria-label="${_t('more')}"><span class="nds-label"></span></button><div class="nds-dropmenu-menu nds-pagination-menu" aria-hidden="true"><div class="nds-dropmenu-scroll"></div></div></div></li>`;
    }

    // Ellipsis <li> whose dropdown holds the collapsed range — reparents each
    // hidden page's author control into the shell's scroll container.
    function _ellipsisLiM(entries, activeNum) {
        const tpl = document.createElement('template');
        tpl.innerHTML = _ellipsisShell();
        const li = tpl.content.firstElementChild;
        const scroll = li.querySelector('.nds-dropmenu-scroll');
        entries.forEach(e => scroll.appendChild(_stampControl(e, activeNum, true)));
        return li;
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
        if (_lazyRange(list)) return;
        const model = _capturePageModel(list);
        if (!model.length) return;

        const sig = model.map(e => e.num).join(',');
        if (nav._ndsCollapseSig === sig) return; // unchanged set (incl. our own collapse) → loop guard
        nav._ndsCollapseSig = sig;

        // <=5 and already flat → leave the author's exact markup untouched.
        const isCollapsed = !!list.querySelector('.nds-pagination-ellipsis');
        if (model.length <= 5 && !isCollapsed) return;

        const activeNum = (model.find(e => e.active) || {}).num;
        const prevLi = list.querySelector('.nds-pagination-prev');
        const nextLi = list.querySelector('.nds-pagination-next');

        // Build the new page area first: each builder MOVES the author's control
        // out of its old row into the fragment, so replaceChildren below only
        // discards the emptied <li> shells.
        const pages = document.createDocumentFragment();
        if (model.length > 5) {
            for (let i = 0; i < 3; i++) pages.appendChild(_pageLiM(model[i], activeNum));
            pages.appendChild(_ellipsisLiM(model.slice(3, -1), activeNum));
            pages.appendChild(_pageLiM(model[model.length - 1], activeNum));
        } else {
            model.forEach(e => pages.appendChild(_pageLiM(e, activeNum)));
        }

        list.replaceChildren(pages); // page area only…
        if (prevLi) list.insertAdjacentElement('afterbegin', prevLi); // …prev/next are the author's, preserved
        if (nextLi) list.insertAdjacentElement('beforeend', nextLi);

        wireGeneratedPagination(nav, activeNum || model[0].num); // ellipsis dropmenu + active stamp
        initializePaginationStates(nav);                          // prev/next disabled at the ends
    }

    // Wire the live collapse watcher once per page. Re-collapses a manual nav
    // when its page buttons change. Runs SYNCHRONOUSLY — onChildrenChange is a
    // MutationObserver microtask, so a button added in a click handler collapses
    // before the browser paints, and never flashes uncollapsed. Adds within one
    // task (a loop or a fragment) already arrive as a single batch, so no debounce
    // is needed to coalesce them; loop-safety is reconcileCollapse's signature
    // guard. Auto navs manage their own collapse (updateAutoPagination) — skipped.
    function _wireCollapseWatch() {
        if (_collapseWatchReady) return;
        _collapseWatchReady = true;
        NDS.onChildrenChange('.nds-pagination-list', lists => {
            lists.forEach(list => {
                const nav = list.closest('.nds-pagination') || list;
                if (nav.hasAttribute('data-auto-pagination')) return;
                reconcileCollapse(nav);
            });
        });
    }

    // Tear down the ellipsis dropmenu instance before its nav is rebuilt via
    // innerHTML: closes an open menu (the setTotalPages-while-open case) and
    // aborts the instance's document-level listeners, which a bare innerHTML
    // would orphan. Safe when absent, closed, or mid-transition.
    function _destroyEllipsisMenu(nav) {
        nav.querySelector('.nds-pagination-ellipsis .nds-dropmenu')?.ndsDropmenu?.destroy();
    }

    // Release everything pagination attached to a nav: the click AbortController
    // (manual), the content-side resize observer whose closure references this
    // nav (auto), the instance backref, and the init stamps. Idempotent — re-
    // invoked on the same nav no-ops once the stash is gone. Item visibility
    // (`item.hidden`) is left untouched: a teardown of the UI shouldn't decide
    // what to render in its absence.
    function _destroyPaginationNav(nav) {
        if (!nav) return;
        // Already torn down (explicit destroy() before the removal sweep) or
        // never initialized — nothing to release.
        if (!nav.ndsPagination
            && !nav.hasAttribute('data-nds-pagination-initialized')
            && !nav.hasAttribute('data-nds-auto-pagination-initialized')) return;

        if (nav._ndsClickAC) {
            nav._ndsClickAC.abort();
            delete nav._ndsClickAC;
        }

        // Auto path: the .nds-paged-content removal sweep also releases this,
        // but destroy() may run while the content is still in the DOM (consumer
        // tearing down a region without removing it). Releasing here avoids a
        // resize callback firing into a torn-down nav. Quiet resolve: on the
        // removal-sweep path the content may already be detached with the nav,
        // and that miss is teardown, not misconfiguration.
        const content = contentForNav(nav, true);
        if (content && content._offResize) {
            content._offResize();
            delete content._offResize;
        }

        delete nav.ndsPagination;
        nav.removeAttribute('data-nds-pagination-initialized');
        nav.removeAttribute('data-nds-auto-pagination-initialized');
    }

    // Shared DOM-removal sweep: any pagination nav leaving the document gets
    // _destroyPaginationNav. Belt-and-suspenders for the implicit GC path —
    // catches navs torn down without an explicit destroy() call. Wired once
    // per page; idempotent.
    function _wireNavCleanup() {
        if (_navCleanupReady) return;
        _navCleanupReady = true;
        NDS.onDOMRemove('.nds-pagination', removed => {
            removed.forEach(_destroyPaginationNav);
        });
    }

    // Initialization function (called by nds-loader.js)
    function initializePagination() {
        _wireNavCleanup();
        const paginationContainers = document.querySelectorAll('.nds-pagination, .nds-pagination-list');

        paginationContainers.forEach(container => {
            // Skip elements inside code examples
            if (container.closest('code, .code-example')) {
                return;
            }

            // Skip .nds-pagination-list elements that are children of .nds-pagination
            // (they will be initialized via their parent container)
            if (container.classList.contains('nds-pagination-list') && container.closest('.nds-pagination')) {
                return;
            }

            if (!container.hasAttribute('data-nds-pagination-initialized')) {
                // Check if auto-generation is requested via data-total-pages
                const totalPages = parseInt(container.dataset.totalPages);
                const activePage = parseInt(container.dataset.activePage) || 1;

                // Only auto-generate if data-total-pages is set AND container doesn't already have .nds-pagination-list
                const hasPaginationList = container.classList.contains('nds-pagination-list') ||
                                         container.querySelector('.nds-pagination-list');

                if (totalPages && totalPages > 0 && !hasPaginationList) {
                    // Auto-generate pagination HTML, collapsed directly (no
                    // build-all-then-collapse round trip). data-page-url (a
                    // "?page={page}" template) makes the controls navigable links
                    // for no-JS, server-reload pagination; without it they're buttons.
                    container.innerHTML = generatePaginationHTML(totalPages, activePage, container.getAttribute('data-page-url'));
                    wireGeneratedPagination(container, activePage, totalPages);
                }

                const paginationInstance = new NDSPagination(container);
                // Stamp only successful constructions — a bailed (empty) nav stays
                // eligible for the next reinit() instead of being skipped forever.
                if (paginationInstance.valid) {
                    container.ndsPagination = paginationInstance;
                    container.setAttribute('data-nds-pagination-initialized', 'true');
                }

                initializePaginationStates(container);

                // Wire the per-nav click handler. Auto-paginations are wired
                // separately by _wireAutoNav (with a live items getter) and skip
                // this path. Listener is scoped to the nav — DOM removal GCs it
                // automatically; the AbortController stash on the element is the
                // explicit handle a future destroy() can abort.
                if (!container.hasAttribute('data-auto-pagination')) {
                    _wireManualNavClicks(container);
                    _wireCollapseWatch(); // live ellipsis re-collapse on dynamic <li> changes

                    _restoreUrlPage(container);
                }

                // Universal reveal: a non-auto pagination releases its paged-content's
                // skeleton hold at init. Auto navs are skipped here — setupAutoContainer
                // stamps after it collapses, so pre-collapse content stays held.
                if (container.classList.contains('nds-pagination') &&
                    !container.hasAttribute('data-auto-pagination')) {
                    const content = contentForNav(container);
                    if (content) content.setAttribute('data-paged-initialized', '');
                }
            }
        });
    }

    // Collect the dropmenu items inside a pagination's ellipsis menus. The
    // ellipsis dropmenu renders in place (it never opts into data-portal), so
    // each menu is a direct descendant. On a lazy menu this is the rendered
    // window only — callers needing the true page span use _lazyRange /
    // the always-visible 1,2,3,N strip buttons.
    function getPaginationDropmenuItems(pagination) {
        return Array.from(pagination.querySelectorAll('.nds-dropmenu-menu .nds-dropmenu-item'));
    }

    // All clickable page elements (in-list buttons + dropmenu items).
    // Excludes prev/next.
    function getAllPageElements(pagination) {
        const inList = Array.from(pagination.querySelectorAll(_PAGE_CTRL_SEL));
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
            if (el.ariaCurrent === 'page' || NDS.State.has(el, 'active')) {
                NDS.State.clear(el);
                NDS.aria.current(el, null);
            }
            // First page element (never a trigger) whose number matches.
            if (target === null && !el.classList.contains('nds-dropmenu-trigger') &&
                pageNumberOf(el) === pageNumber) {
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
            const range = _lazyRange(pagination);
            if (range && pageNumber >= range.from && pageNumber <= range.to) {
                _stampTriggerActive(pagination, pageNumber);
            }
            return;
        }

        // Activate the target; if it lives in the dropdown, also light the
        // ellipsis trigger and show the active page number on it.
        NDS.State.set(target, 'active');
        NDS.aria.current(target, 'page');
        if (target.classList.contains('nds-dropmenu-item')) {
            const ellipsisTrigger = target.closest('.nds-dropmenu')?.querySelector('.nds-dropmenu-trigger');
            if (ellipsisTrigger) {
                NDS.State.set(ellipsisTrigger, 'active');
                const ellipsisLabel = ellipsisTrigger.querySelector('.nds-label');
                if (ellipsisLabel) ellipsisLabel.textContent = pageNumber;
            }
        }
    }

    // Shared function to update prev/next button states
    function updatePrevNextStates(pagination, currentPageNum, minPage, maxPage) {
        const prevBtn = pagination.querySelector('.nds-pagination-prev button, .nds-pagination-prev a');
        const nextBtn = pagination.querySelector('.nds-pagination-next button, .nds-pagination-next a');
        applyEdgeState(prevBtn, currentPageNum === minPage);
        applyEdgeState(nextBtn, currentPageNum === maxPage);
    }

    // Apply edge (first/last page) disabled state to a prev/next control —
    // <button> uses the native `disabled` property; <a> can't be disabled
    // natively, so encode the state via aria + data-state for the SCSS.
    function applyEdgeState(btn, isEdge) {
        if (!btn) return;
        if (btn.tagName.toLowerCase() === 'button') {
            btn.disabled = isEdge;
            return;
        }
        NDS.aria.disabled(btn, isEdge || null);
        if (isEdge) NDS.State.add(btn, 'disabled');
        else NDS.State.remove(btn, 'disabled');
    }

    // Initialize prev/next button states based on active page
    function initializePaginationStates(paginationNav) {
        const pagination = _listOf(paginationNav);

        const allPageElements = getAllPageElements(pagination);
        if (allPageElements.length === 0) return;

        const { min: minPage, max: maxPage } = pageBounds(allPageElements);
        if (!Number.isFinite(minPage)) return;

        // Current page — trigger-aware (a lazy nav's mid-range active page lives
        // on the ellipsis trigger, not on a rendered item); defaults to minPage.
        const currentPageNum = _currentPageOrNull(pagination) || minPage;

        // Always call setActivePage to ensure ellipsis trigger gets active class if needed
        setActivePage(pagination, currentPageNum);
        updatePrevNextStates(pagination, currentPageNum, minPage, maxPage);
    }

    // Lock a paged table's column widths before pagination hides its rows.
    // The skeleton collapses overflow rows with `visibility: collapse` (not
    // display:none), so they stay in the layout tree and the column widths
    // already reflect every row's content — this read is free, no un-hide
    // reflow. Once showPage hides the off-page rows, the explicit widths stop
    // columns jumping page to page. No-op for non-table (card) paged content.
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
        const widths = [];
        for (let i = 0; i < headers.length; i++) widths.push(headers[i].getBoundingClientRect().width);
        // Nothing laid out to read (unrendered container — collapsed accordion,
        // inactive tab panel, never-painted background tab): writing these would
        // pin every column to 0px. Skip the lock; pages just size themselves.
        if (!widths.some(w => w > 0)) return;
        for (let i = 0; i < headers.length; i++) headers[i].style.width = widths[i] + 'px';
    }

    // The .nds-paged-content a nav controls. Explicit binding wins:
    // data-auto-pagination="gridId" (the content's id). With no value, falls back
    // to the legacy adjacency contract — the nav's immediately-preceding sibling.
    function contentForNav(paginationNav, quiet) {
        const ref = paginationNav.getAttribute('data-auto-pagination');
        if (ref) {
            const el = NDS.resolveEl(ref);
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
    function navForContent(contentContainer) {
        if (contentContainer.id) {
            const navs = document.querySelectorAll('.nds-pagination[data-auto-pagination]');
            for (const nav of navs) {
                const ref = nav.getAttribute('data-auto-pagination');
                if (ref && NDS.resolveEl(ref) === contentContainer) return nav;
            }
        }
        // Adjacency fallback: a descendant search from the shared parent, so for a
        // <tbody> it reaches inside every cell. A nav must share the container's
        // sub-row context — one parked in a sub-row drives that row's own nested
        // paged table, and a nested container's nav lives in the same sub as it.
        const parent = contentContainer.parentElement;
        if (!parent) return null;
        const ownSub = contentContainer.closest('tr.nds-sub');
        for (const nav of parent.querySelectorAll('.nds-pagination[data-auto-pagination]')) {
            if (nav.closest('tr.nds-sub') === ownSub) return nav;
        }
        return null;
    }

    // Per-page picker: any nds-dropmenu carrying `data-per-page-target="<id>"`
    // rewires the linked .nds-paged-content's --per-page from its selected
    // value. Dropmenu SELECT MODE (data-select-name) already emits the event,
    // maintains the trigger label + `selected` state, and closes the menu —
    // this delegate only reacts. One document-level listener covers every
    // widget on the page; guarded so re-init doesn't duplicate.
    let _perPageWired = false;
    function _wirePerPagePickers() {
        if (_perPageWired) return;
        _perPageWired = true;
        document.addEventListener('nds:dropmenu:selected', (e) => {
            const { dropmenu, value } = e.detail;
            const ref = dropmenu.getAttribute('data-per-page-target');
            if (!ref) return;
            const target = NDS.resolveEl(ref);
            if (!target || !target.classList.contains('nds-paged-content')) return;
            const perPage = parseInt(value, 10);
            if (!(perPage > 0)) return;
            target.style.setProperty('--per-page', perPage);
            target._ndsPerPage = perPage;
            refreshAutoPagination(target);
        });
    }

    // Auto-Pagination Generator for content-based pagination
    function initializeAutoPagination() {
        document.querySelectorAll('.nds-pagination[data-auto-pagination]').forEach(setupAutoContainer);
        _wirePerPagePickers();
    }

    // Wire one auto-pagination container: paginate to final state now, then
    // call _wireAutoNav for click handlers + the --per-page resize observer.
    // Skips already-initialized navs and code-example fixtures; the content
    // container is the previous sibling.
    function setupAutoContainer(paginationNav) {
        if (paginationNav.hasAttribute('data-nds-auto-pagination-initialized') ||
            paginationNav.closest('code, .code-example')) {
            return;
        }

        const contentContainer = contentForNav(paginationNav);
        if (!contentContainer) {
            return;
        }

        // Filter-aware: skip [data-filtered] items so a URL-active filter at
        // page open doesn't paint a full-items nav now, then trim it to
        // display:none post-paint → CLS. Filter is registered
        // before Pagination in nds-loader.js so applyUrlParams() has already
        // stamped data-filtered by the time we get here; on plain pages this
        // filter is a no-op (no items carry the attribute).
        const items = _pagedItems(contentContainer);

        // Build the paginated UI in final state — no all-items → paginated
        // flash. For a table, lockTableColumns first freezes column widths
        // from the full-content layout (the collapsed skeleton rows still
        // size columns) so they don't jump page to page. data-paged-initialized
        // is released only AFTER paginating, so the collapse — and thus the
        // all-rows column sizing — survives through the lock.
        const paginate = () => {
            const perPage = readPerPage(contentContainer);
            contentContainer._ndsPerPage = perPage;
            lockTableColumns(items);
            updateAutoPagination(paginationNav, items, perPage);

            // Opt-in URL restore: land on ?page=N before the skeleton reveal —
            // silent (no event, no scroll), clamped to the page count.
            const urlPage = _readPageParam(paginationNav);
            if (urlPage && urlPage > 1) {
                const totalPages = Math.ceil(items.length / perPage);
                const page = Math.min(urlPage, Math.max(1, totalPages));
                const list = paginationNav.querySelector('.nds-pagination-list');
                if (list && page > 1) {
                    setActivePage(list, page);
                    updatePrevNextStates(list, page, 1, totalPages);
                    showPage(items, page, perPage);
                }
            }

            contentContainer.setAttribute('data-paged-initialized', '');

            // Wire interaction: clicks + the --per-page ResizeObserver.
            // _wireAutoNav re-queries items live (per click, per resize), so it
            // takes only the per-container handles + the perPage baseline
            // (which the resize observer detects changes against).
            _wireAutoNav(paginationNav, contentContainer, perPage);
        };

        // Tables defer one frame: by the next paint the collapsed table is
        // already laid out, so lockTableColumns' width read is free — no
        // pre-paint forced reflow. The skeleton shows the first rows in the
        // meantime, so the one-frame defer is invisible. Grids have no column
        // lock, so they paginate synchronously.
        // A hidden document never runs rAF, so a timer races it behind a
        // one-shot latch: in the foreground rAF wins and keeps the free read
        // (the timer then no-ops), while a tab opened in the background still
        // paginates and releases its skeleton instead of waiting for focus.
        if (items[0] && items[0].tagName === 'TR') {
            let kicked = false;
            const kick = () => { if (kicked) return; kicked = true; paginate(); };
            requestAnimationFrame(kick);
            setTimeout(kick, 100);
        } else paginate();

        // Re-paginate automatically when items are added/removed. Default for all
        // auto-pagination; wired once per page, subsequent calls no-op.
        _wireAutoRefreshWatch();

        paginationNav.setAttribute('data-nds-auto-pagination-initialized', 'true');
    }

    // THE rebuild step for an auto nav — both rebuild paths (updateAutoPagination's
    // --per-page change, refreshAutoPagination's filter/add/remove) route here, so
    // the two can't drift. Tears down the old ellipsis menu, then either collapses
    // to nothing (≤1 page: every item shown, records stamped, and the empty nav
    // self-hides via .nds-pagination:not(:has(>.nds-pagination-list)) — no inline
    // display to track) or emits the collapsed list, pages the items and wires the
    // ellipsis. `desiredPage` is clamped into the new range here, so callers pass
    // intent, not arithmetic. Returns the page actually rendered, or 0 when it took
    // the no-pagination path — callers key their own extras (URL param, click
    // wiring) off that. Read any live state off the old list BEFORE calling: the
    // first thing this does is destroy it.
    function _rebuildAutoNav(nav, content, items, perPage, desiredPage) {
        const totalPages = Math.ceil(items.length / perPage);
        _destroyEllipsisMenu(nav); // nav is rebuilt either way

        if (totalPages <= 1) {
            items.forEach(item => item.hidden = false);
            nav.innerHTML = '';
            updateRecordSlots(content, items.length, 1, perPage); // showPage is bypassed
            return 0;
        }

        const page = Math.min(Math.max(1, desiredPage), totalPages);
        // Generate the collapsed list directly (no build-all-then-collapse),
        // show the page's items, wire the ellipsis dropmenu + active state.
        nav.innerHTML = generatePaginationHTML(totalPages, page);
        showPage(items, page, perPage);
        wireGeneratedPagination(nav, page, totalPages);
        return page;
    }

    // Rebuild an auto-pagination nav for the given --per-page, preserving the
    // current page. Callers (setupAutoContainer's initial paint, _wireAutoNav's
    // resize callback) are responsible for wiring click handlers afterwards via
    // wireAutoClicks; refreshAutoPagination rebuilds independently.
    function updateAutoPagination(paginationNav, items, perPage) {
        // Preserve the current page across a --per-page change — read it before
        // _rebuildAutoNav destroys the list it lives on.
        const pagination = paginationNav.querySelector('.nds-pagination-list');
        const currentPage = pagination ? getCurrentPage(pagination) : 1;
        _rebuildAutoNav(paginationNav, contentForNav(paginationNav), items, perPage, currentPage);
    }

    // ── HTML builders ────────────────────────────────────────────────
    // data-state for the active page is NOT baked into the template — it stays
    // inside NDS.State.set (activateGeneratedPage / _layoutLazy) so the State
    // vocab never leaks into a literal attribute. aria-current IS emitted; it's
    // semantic and valid pre-JS.
    // Generated strings are ar/en pairs picked by page language (the
    // tables/editor convention) — full component localization is a later pass.
    const _T = {
        prev: { en: 'Previous page', ar: 'الصفحة السابقة' },
        next: { en: 'Next page', ar: 'الصفحة التالية' },
        page: { en: 'Page', ar: 'صفحة' },
        more: { en: 'More pages', ar: 'المزيد من الصفحات' },
        jump: { en: 'Jump to page', ar: 'الانتقال إلى صفحة' },
    };
    const _t = k => (NDS.isArabic ? _T[k].ar : _T[k].en);
    // url (when set) is a page→href function — the controls become navigable
    // anchors for no-JS, server-reload pagination (data-page-url). A disabled
    // prev/next anchor drops its href; CSS pointer-events handles the rest.
    const _prevLi = (disabled, url, prevPage) => {
        const inner = url
            ? `<a class="nds-btn nds-subtle" aria-label="${_t('prev')}"${disabled ? ' aria-disabled="true"' : ` href="${url(prevPage)}"`}><i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"></i></a>`
            : `<button type="button" class="nds-btn nds-subtle" aria-label="${_t('prev')}"${disabled ? ' disabled' : ''}><i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"></i></button>`;
        return `<li class="nds-pagination-item nds-pagination-prev">${inner}</li>`;
    };
    const _nextLi = (disabled, url, nextPage) => {
        const inner = url
            ? `<a class="nds-btn nds-subtle" aria-label="${_t('next')}"${disabled ? ' aria-disabled="true"' : ` href="${url(nextPage)}"`}><i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i></a>`
            : `<button type="button" class="nds-btn nds-subtle" aria-label="${_t('next')}"${disabled ? ' disabled' : ''}><i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i></button>`;
        return `<li class="nds-pagination-item nds-pagination-next">${inner}</li>`;
    };
    const _pageLi = (i, activePage, url) => {
        const cur = i === activePage ? ' aria-current="page"' : '';
        const inner = url
            ? `<a class="nds-btn nds-subtle nds-indicator" href="${url(i)}"${cur} aria-label="${_t('page')} ${i}"><span class="nds-label">${i}</span></a>`
            : `<button type="button" class="nds-btn nds-subtle nds-indicator"${cur} aria-label="${_t('page')} ${i}"><span class="nds-label">${i}</span></button>`;
        return `<li class="nds-pagination-item page_${i}">${inner}</li>`;
    };

    // One generated page row for the ellipsis menu. role="menuitem" is baked in
    // because rows are inserted lazily, AFTER Dropmenu.create's aria pass ran
    // against the (then empty) menu.
    function _menuItem(i, activePage, url) {
        const cur = i === activePage ? ' aria-current="page"' : '';
        return url
            ? `<a class="nds-btn nds-subtle nds-indicator nds-dropmenu-item" role="menuitem" href="${url(i)}"${cur} aria-label="${_t('page')} ${i}"><span class="nds-label">${i}</span></a>`
            : `<button type="button" class="nds-btn nds-subtle nds-indicator nds-dropmenu-item" role="menuitem" aria-label="${_t('page')} ${i}"${cur}><span class="nds-label">${i}</span></button>`;
    }

    // Build a pagination list. Above 5 pages, emits the collapsed shape directly
    // — [Prev] 1 2 3 [ellipsis of 4..N-1] N [Next] — so every generated nav skips
    // a build-all-then-collapse round-trip (no NDSPagination needed).
    // Author-written markup takes the separate reconcileCollapse path, which
    // preserves the href/label markup this data-driven builder doesn't carry.
    // pageUrl (a "?page={page}" template) makes every control a navigable <a href>.
    function generatePaginationHTML(totalPages, activePage = 1, pageUrl = null) {
        activePage = Math.max(1, Math.min(activePage, totalPages));
        const url = _urlFn(pageUrl);
        let html = '<ul class="nds-pagination-list">' + _prevLi(activePage === 1, url, activePage - 1);
        if (totalPages > 5) {
            html += _pageLi(1, activePage, url) + _pageLi(2, activePage, url) + _pageLi(3, activePage, url);
            html += _ellipsisShell(); // empty — _wireEllipsisLazy windows rows in on open
            html += _pageLi(totalPages, activePage, url);
        } else {
            for (let i = 1; i <= totalPages; i++) html += _pageLi(i, activePage, url);
        }
        html += _nextLi(activePage === totalPages, url, activePage + 1) + '</ul>';
        return html;
    }

    // Wire a directly-generated collapsed list: create the ellipsis dropmenu (if
    // present) and stamp active state. Replaces `new NDSPagination` for the
    // auto-pagination paths — the collapse already lives in the markup.
    // totalPages marks the menu as lazily windowed: the collapsed range lands as
    // an element property on the scroll container (dies with the node on any
    // rebuild — never a consumer-facing attribute) BEFORE activateGeneratedPage,
    // which reads it. reconcileCollapse (author markup, eager menu) passes none.
    function wireGeneratedPagination(paginationNav, activePage, totalPages) {
        const dm = paginationNav.querySelector('.nds-pagination-ellipsis .nds-dropmenu');
        if (dm && totalPages > 5) {
            const scroll = dm.querySelector('.nds-dropmenu-scroll');
            if (scroll) scroll._ndsRange = { from: 4, to: totalPages - 1 };
            _wireEllipsisLazy();
        }
        // Soft dependency — ellipsis stays plain markup if NDS.Dropmenu isn't bundled.
        if (dm && NDS.Dropmenu) NDS.Dropmenu.create(dm);
        activateGeneratedPage(paginationNav, activePage);
    }

    // Stamp data-state active for the current page on a freshly generated list:
    // a visible page button, or — when the page is collapsed into the ellipsis —
    // the dropmenu item plus the ellipsis trigger (whose label then shows the number).
    // On a lazy menu the item usually isn't rendered — the trigger alone carries it.
    function activateGeneratedPage(host, activePage) {
        const visibleBtn = host.querySelector(`.page_${activePage} .nds-btn`);
        if (visibleBtn) { NDS.State.set(visibleBtn, 'active'); return; }
        const items = host.querySelectorAll('.nds-pagination-ellipsis .nds-dropmenu-item');
        for (let i = 0; i < items.length; i++) {
            if (parseInt(items[i].querySelector('.nds-label')?.textContent) === activePage) {
                NDS.State.set(items[i], 'active');
                _stampTriggerActive(host, activePage);
                return;
            }
        }
        const range = _lazyRange(host);
        if (range && activePage >= range.from && activePage <= range.to) {
            _stampTriggerActive(host, activePage);
        }
    }

    // Light the ellipsis trigger as the active-page holder (its label shows the
    // page number — the CSS reveals it on data-state active).
    function _stampTriggerActive(host, pageNumber) {
        const trigger = host.querySelector('.nds-pagination-ellipsis .nds-dropmenu-trigger');
        if (!trigger) return;
        NDS.State.set(trigger, 'active');
        const label = trigger.querySelector('.nds-label');
        if (label) label.textContent = pageNumber;
    }

    // The lazily-windowed page range stamped on a generated ellipsis menu's
    // scroll container, or null for an eager (author-markup) menu.
    function _lazyRange(host) {
        const scroll = host.querySelector('.nds-pagination-ellipsis .nds-dropmenu-scroll');
        return (scroll && scroll._ndsRange) || null;
    }

    // Whether page n is reachable on this nav: numeric via the lazy range
    // (range.to + 1 = last page), DOM presence on eager/author navs.
    function _pageExists(pagination, n) {
        const range = _lazyRange(pagination);
        if (range) return n >= 1 && n <= range.to + 1;
        return getAllPageElements(pagination).some(el => pageNumberOf(el) === n);
    }

    // ── URL sync (opt-in) ─────────────────────────────────────────────────
    // data-page-param on the nav opts into Filter/Sort-style URL state: the
    // param (default "page"; set a value for distinct names on multi-nav pages —
    // like Filter, there is no automatic namespacing) is read once at init and
    // applied silently, and page changes write it back with replaceState (no
    // history entries, matching Sort). Page 1 — the default — deletes the param.
    function _readPageParam(nav) {
        const attr = nav.getAttribute('data-page-param');
        if (attr === null) return null;
        const n = parseInt(new URLSearchParams(window.location.search).get(attr || 'page'), 10);
        return n > 0 ? n : null;
    }

    function _writePageParam(nav, page) {
        const attr = nav.getAttribute('data-page-param');
        if (attr == null) return;
        const params = new URLSearchParams(window.location.search);
        if (page > 1) params.set(attr || 'page', page);
        else params.delete(attr || 'page');
        const qs = params.toString();
        window.history.replaceState({}, '', qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
    }

    // Land a manual nav on ?page=N at init, silently — no event (not user
    // intent), no scroll. Clamped on data-driven navs; ignored on author navs
    // when the page doesn't exist. No-op without data-page-param.
    function _restoreUrlPage(nav) {
        const urlPage = _readPageParam(nav);
        if (!urlPage) return;
        const pagination = _listOf(nav);
        const total = parseInt(nav.dataset.totalPages);
        const page = total > 0 ? Math.min(urlPage, total) : urlPage;
        if (!_pageExists(pagination, page)) return;
        setActivePage(pagination, page);
        const { min, max } = pageBounds(getAllPageElements(pagination));
        updatePrevNextStates(pagination, page, min, max);
    }

    // ── Lazy ellipsis menu (windowed) ─────────────────────────────────────
    // Generated menus ship an empty shell; on open a fixed-size window of rows
    // around the active page renders into the scroll container, re-windowed
    // from scrollTop as the user scrolls. Spacer divs keep scrollHeight exact
    // (rows are a uniform 40px — .nds-pagination-ellipsis pins min-height so
    // every size variant matches), so the DOM stays bounded at ~2×LAZY_OVERSCAN
    // rows regardless of totalPages. Keyboard nav needs no extra wiring:
    // dropmenu re-enumerates focusables per keypress, and focusing a row near
    // the window edge auto-scrolls it into view, which extends the window.
    const LAZY_ROW = 40;      // assumed pitch; re-measured on open
    const LAZY_OVERSCAN = 25; // rows rendered beyond each viewport edge
    const LAZY_SLACK = 10;    // scroll drift (rows) tolerated before re-windowing

    // One document-level delegate for every lazy ellipsis menu; the dropmenu
    // events bubble from the wrapper. Wired on first lazy nav; idempotent.
    let _lazyWired = false;
    function _wireEllipsisLazy() {
        if (_lazyWired) return;
        _lazyWired = true;

        document.addEventListener('nds:dropmenu:opened', (e) => {
            const scroll = _lazyScrollOf(e);
            if (scroll) _openLazyMenu(e.detail.dropmenu, scroll);
        });

        // Drop the window on close — reopen rebuilds around the then-current
        // page. Reopen-before-transition-end SKIPS this (dropmenu cancels the
        // close), which is why _openLazyMenu wipes first instead of assuming empty.
        document.addEventListener('nds:dropmenu:closed', (e) => {
            const scroll = _lazyScrollOf(e);
            if (!scroll) return;
            scroll.innerHTML = '';
            scroll.scrollTop = 0;
            delete scroll._ndsWin;
            // Reset the jump input (it lives outside the scroll and survives).
            const jump = e.detail.menu.querySelector('.nds-pagination-jump input');
            if (jump) jump.value = '';
        });
    }

    // The lazy scroll container for a dropmenu event, or null if the event
    // belongs to another dropmenu (per-page picker, author menus, other components).
    function _lazyScrollOf(e) {
        const menu = e.detail && e.detail.menu;
        if (!menu || !menu.classList.contains('nds-pagination-menu')) return null;
        const scroll = menu.querySelector('.nds-dropmenu-scroll');
        return (scroll && scroll._ndsRange) ? scroll : null;
    }

    // Open-time render: window centered on the active page, then re-position the
    // menu (open() measured it empty) and scroll the active row into mid-view.
    // Runs synchronously inside the opened event — same task as open(), pre-paint.
    function _openLazyMenu(wrapper, scroll) {
        const nav = wrapper.closest('.nds-pagination');
        const list = nav ? _listOf(nav) : null;
        const { from, to } = scroll._ndsRange;
        const active = list ? getCurrentPage(list) : from;

        scroll.innerHTML = ''; // rapid-toggle leftovers (see closed handler)
        scroll._ndsWin = {
            start: 0, end: 0, pitch: LAZY_ROW, active,
            url: _urlFn(nav && nav.getAttribute('data-page-url')),
        };

        const center = Math.max(from, Math.min(active, to));
        const start = Math.max(from, center - LAZY_OVERSCAN);
        const end = Math.min(to, center + LAZY_OVERSCAN);
        _layoutLazy(scroll, start, end);
        scroll._ndsWin.start = start;
        scroll._ndsWin.end = end;

        // Jump input for large ranges — injected BEFORE applyPosition so the
        // menu is positioned/clamped with its real height.
        if (to - from + 1 > LAZY_JUMP_MIN) _ensureJumpBox(nav, scroll);

        // open() positioned/clamped the menu while empty — re-run against the
        // real content (applyPosition self-clears its inline width/maxHeight).
        const inst = wrapper.ndsDropmenu;
        if (inst && inst.applyPosition) inst.applyPosition();

        // True pitch (40 by CSS contract; measured to avoid a JS↔CSS constant).
        const row = scroll.querySelector('.nds-dropmenu-item');
        const pitch = (row && row.offsetHeight) || LAZY_ROW;
        if (pitch !== scroll._ndsWin.pitch) {
            scroll._ndsWin.pitch = pitch;
            _layoutLazy(scroll, start, end); // spacers were sized at the assumed pitch
        }

        _scrollToPage(scroll, center);

        if (!scroll._ndsScrollWired) {
            scroll._ndsScrollWired = true;
            scroll.addEventListener('scroll', NDS.rafThrottle(() => _shiftWindow(scroll)), { passive: true });
        }
    }

    // Center a page's row in the scroll viewport (clamped by the browser).
    // Pure scroll write — the scroll handler re-windows on the next frame;
    // sync=true materializes the row in the same task (Enter-commit needs it).
    function _scrollToPage(scroll, page, sync) {
        const pitch = scroll._ndsWin.pitch;
        const viewportRows = Math.ceil(scroll.clientHeight / pitch) || 1;
        scroll.scrollTop = Math.max(0, (page - scroll._ndsRange.from - (viewportRows >> 1)) * pitch);
        if (sync) _shiftWindow(scroll);
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
    function _ensureJumpBox(nav, scroll) {
        const menu = scroll.closest('.nds-dropmenu-menu');
        if (!menu || menu.querySelector('.nds-pagination-jump')) return;
        menu.insertAdjacentHTML('afterbegin', `<div class="nds-form-container nds-dropmenu-search nds-pagination-jump">
            <div class="nds-form-control">
                <input type="text" inputmode="numeric" dir="ltr" aria-label="${_t('jump')}" placeholder="${scroll._ndsRange.to + 1}">
            </div>
        </div>`);
        const box = menu.firstElementChild;
        // Soft dependency — the jump box stays a plain input if NDS.Forms isn't
        // bundled (no clear button, no container interaction states).
        NDS.Forms?.initializeContainer(box);
        const input = box.querySelector('input');

        input.addEventListener('input', () => {
            const digits = input.value.replace(/\D+/g, '');
            if (digits !== input.value) input.value = digits; // numbers only
            const { from, to } = scroll._ndsRange;
            const n = parseInt(digits, 10);
            if (!(n > 0)) return;
            _scrollToPage(scroll, Math.max(from, Math.min(n, to)));
        });

        input.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            const { from, to } = scroll._ndsRange;
            const n = parseInt(input.value, 10);
            if (!(n > 0)) return;
            const page = Math.min(n, to + 1); // clamp into 1..last
            let btn;
            if (page >= from && page <= to) {
                _scrollToPage(scroll, page, true); // materialize the row this task
                btn = Array.from(scroll.querySelectorAll('.nds-dropmenu-item')).find(el => pageNumberOf(el) === page);
            } else {
                btn = nav && nav.querySelector(`.page_${page} .nds-btn`); // strip pages (1–3, last)
            }
            if (btn) btn.click();
        });
    }

    // Re-window from scrollTop. Uniform pitch → index math is exact; SLACK keeps
    // row-by-row keyboard scrolling from re-rendering on every step.
    function _shiftWindow(scroll) {
        const win = scroll._ndsWin, range = scroll._ndsRange;
        if (!win || !range || !scroll.isConnected) return;
        const first = range.from + Math.floor(scroll.scrollTop / win.pitch);
        const viewportRows = Math.ceil(scroll.clientHeight / win.pitch) || 1;
        const start = Math.max(range.from, first - LAZY_OVERSCAN);
        const end = Math.min(range.to, first + viewportRows + LAZY_OVERSCAN);
        if (Math.abs(start - win.start) < LAZY_SLACK && Math.abs(end - win.end) < LAZY_SLACK) return;
        _layoutLazy(scroll, start, end);
        win.start = start;
        win.end = end;
    }

    // Materialize exactly the rows [start..end] (page numbers) plus a focused
    // row we must not detach (removal OR re-append kills focus — kept rows are
    // never moved, only neighbors change around them). Spacers are cheap
    // unfocused divs, so they're rebuilt from scratch each pass: one per gap in
    // page coverage, sized gap×pitch — scrollHeight stays exact even with a
    // retained out-of-window focused row.
    function _layoutLazy(scroll, start, end) {
        const { from, to } = scroll._ndsRange;
        const { pitch, active, url } = scroll._ndsWin;

        const focusedEl = document.activeElement;
        const keepFocused = focusedEl && scroll.contains(focusedEl) &&
            focusedEl.classList.contains('nds-dropmenu-item') ? pageNumberOf(focusedEl) : null;

        // 1. Trim: drop all spacers and every row outside the keep-set.
        const rows = [];
        Array.from(scroll.children).forEach(el => {
            if (!el.classList.contains('nds-dropmenu-item')) { el.remove(); return; }
            const p = pageNumberOf(el);
            if ((p >= start && p <= end) || p === keepFocused) rows.push(el);
            else el.remove();
        });

        // 2. Fill the window's gaps around kept rows (rows are in page order).
        let ri = 0;
        while (ri < rows.length && pageNumberOf(rows[ri]) < start) ri++; // retained focused row above the window
        let chunk = '';
        for (let p = start; p <= end; p++) {
            if (ri < rows.length && pageNumberOf(rows[ri]) === p) {
                if (chunk) { rows[ri].insertAdjacentHTML('beforebegin', chunk); chunk = ''; }
                ri++;
            } else {
                chunk += _menuItem(p, active, url);
            }
        }
        if (chunk) {
            if (ri < rows.length) rows[ri].insertAdjacentHTML('beforebegin', chunk);
            else scroll.insertAdjacentHTML('beforeend', chunk);
        }

        // 3. Fresh spacers: one per uncovered gap.
        let prev = from - 1;
        scroll.querySelectorAll('.nds-dropmenu-item').forEach(rowEl => {
            const p = pageNumberOf(rowEl);
            const gap = p - prev - 1;
            if (gap > 0) rowEl.insertAdjacentHTML('beforebegin', `<div style="height:${gap * pitch}px"></div>`);
            prev = p;
        });
        if (prev < to) scroll.insertAdjacentHTML('beforeend', `<div style="height:${(to - prev) * pitch}px"></div>`);

        // 4. Active row: aria-current is baked by _menuItem; data-state stays
        //    NDS.State-managed (never a literal attribute).
        const cur = scroll.querySelector('[aria-current="page"]');
        if (cur) NDS.State.set(cur, 'active');
    }

    // ── Records slots ("x of y") ──────────────────────────────────────
    // Author-owned counter widgets: an element with data-paged-target="<list id>"
    // holds [data-paged-from]/[data-paged-to]/[data-paged-count] slots that get
    // the current window and item count. Pagination pages the post-filter item
    // set, so the count tracks active filters by construction. Sentence
    // structure and language stay in the author's markup. Manual/server
    // pagination doesn't route here — those slots stay author-owned.
    function stampRecordSlots(listId, from, to, count) {
        document.querySelectorAll(`[data-paged-target="${listId}"]`).forEach(wrap => {
            // querySelectorAll: a wrapper may repeat a slot across views
            // (e.g. data-paged-count in both the paged and selection lines).
            const stamp = (sel, v) => wrap.querySelectorAll(sel).forEach(el => { el.textContent = NDS.formatNumber(v); });
            stamp('[data-paged-from]', from);
            stamp('[data-paged-to]', to);
            stamp('[data-paged-count]', count);
        });
    }

    function updateRecordSlots(list, count, pageNumber, perPage) {
        if (!list || !list.id) return;
        const from = count ? (pageNumber - 1) * perPage + 1 : 0;
        const to = Math.min(pageNumber * perPage, count);
        stampRecordSlots(list.id, from, to, count);
    }

    // Write-only visibility (no layout read) — settles synchronously so the page swap never flashes all-items then hides.
    function showPage(items, pageNumber, perPage) {
        const start = (pageNumber - 1) * perPage;
        const end = start + perPage;

        items.forEach((item, index) => {
            item.hidden = index < start || index >= end;
        });

        if (items[0]) updateRecordSlots(items[0].closest('.nds-paged-content'), items.length, pageNumber, perPage);
    }

    // Active page number, or null when nothing carries it. Rendered elements
    // first (in-list + rendered dropmenu items), then the ellipsis trigger —
    // on a lazy nav with a mid-range active page the trigger (label = page
    // number) is the only holder while the menu is closed or windowed away.
    function _currentPageOrNull(pagination) {
        const active = getAllPageElements(pagination).find(el => el.ariaCurrent === 'page');
        if (active) return pageNumberOf(active) || null;
        const trigger = pagination.querySelector('.nds-pagination-ellipsis .nds-dropmenu-trigger');
        if (trigger && NDS.State.has(trigger, 'active')) {
            const n = parseInt(trigger.querySelector('.nds-label')?.textContent);
            if (!isNaN(n)) return n;
        }
        return null;
    }

    function getCurrentPage(pagination) {
        return _currentPageOrNull(pagination) || 1;
    }

    // ── Interaction layer (wired at init; runs on click / resize) ─────────

    // Scroll the target back into view after a page change — no-op when it
    // already sits below the sticky nav. Tunable gap between the sticky nav
    // and the scroll target: override per-page or globally via
    // `--pagination-scroll-offset` (read off the nav element).
    function scrollToContent(pagination) {
        const paginationNav = pagination.closest('.nds-pagination');
        if (!paginationNav) return;

        const contentContainer = contentForNav(paginationNav);
        NDS.scrollBelowNav(contentContainer || paginationNav, {
            offsetVar: '--pagination-scroll-offset',
            offsetEl: paginationNav,
        });
    }

    // Page-change scroll is on by default; opt out per nav with
    // data-pagination-no-scroll. Server-driven pages get it from setPage(), which
    // the consumer calls once its fetch resolves — real response timing, no delay
    // to guess. NDS.Pagination.scrollToContent() ignores the attribute: calling it
    // explicitly is the intent.
    function _scrollOnPageChange(pagination) {
        const nav = pagination.closest('.nds-pagination');
        if (nav?.hasAttribute('data-pagination-no-scroll')) return;
        scrollToContent(pagination);
    }

    // Dispatch nds:pagination:change after a user-initiated page change. detail
    // mirrors the sibling :change family (filter/sort/stepper/tab): new value +
    // previous + total + the component element. Fired on the .nds-pagination nav,
    // bubbling. setPage() (programmatic) stays silent to avoid feedback loops.
    function _dispatchPageChange(pagination, page, previousPage, totalPages) {
        const nav = pagination.closest('.nds-pagination') || pagination;
        nav.dispatchEvent(new CustomEvent('nds:pagination:change', {
            detail: { page, previousPage, totalPages, pagination: nav },
            bubbles: true
        }));
    }

    function goToPage(pagination, items, pageNumber, perPage, totalPages) {
        const previousPage = _currentPageOrNull(pagination);

        setActivePage(pagination, pageNumber);
        updatePrevNextStates(pagination, pageNumber, 1, totalPages);
        showPage(items, pageNumber, perPage);
        _scrollOnPageChange(pagination);

        _dispatchPageChange(pagination, pageNumber, previousPage, totalPages);
        _writePageParam(pagination.closest('.nds-pagination') || pagination, pageNumber);
    }

    // Per-nav click handler for an auto-pagination's <ul>. getItems() returns
    // the current page-item set live (each call); totalPages is derived from it
    // per click so a post-init filter change is reflected in the next/prev
    // bounds without re-wiring. Portaled dropmenu items reach this via the
    // wrapper's re-dispatched click (see nds-dropmenu.js).
    //
    // Idempotent on the pagination element: Filter (registered before Pagination)
    // calls refresh on interaction; refresh re-wires the nav. The flag stops a
    // second pass from double-wiring (every click would otherwise fire goToPage
    // twice).
    function wireAutoClicks(newPagination, getItems, perPage) {
        if (newPagination._ndsAutoClickWired) return;
        newPagination._ndsAutoClickWired = true;
        newPagination.addEventListener('click', (e) => {
            const pageElement = e.target.closest(`${_PAGE_CTRL_SEL}, .nds-dropmenu-item`);

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
    // onDOMRemove cleanup. Called from setupAutoContainer's initial paint and
    // for any auto-pagination registered after init.
    function _wireAutoNav(paginationNav, contentContainer, perPage) {
        // Live item set: re-queried each click + each resize so a filter
        // change after init (Filter calls refresh; refresh replaces the list
        // + the OLD click closure with it, but THIS resize observer survives
        // unaltered) doesn't paginate over a stale snapshot.
        const liveItems = () => _pagedItems(contentContainer);

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

    // Refresh auto-pagination for a specific content container (used by filters
    // and the auto-refresh watcher). Resets to page 1 over the
    // visible (non-[data-filtered]) subset. With { keepPage: true } it stays on
    // the current page instead (clamped to the new last page) — for add/remove,
    // where snapping back to page 1 would lose the user's place.
    function refreshAutoPagination(contentContainer, options = {}) {
        if (!contentContainer) return;

        const paginationNav = navForContent(contentContainer);
        if (!paginationNav) return;

        // Skip refreshes that land BEFORE this nav's first-paint setup. At page
        // load Filter (registered before Pagination) calls refresh during its
        // init, ahead of setupAutoContainer — but setupAutoContainer already
        // paints the same filter-aware (visible-only) nav from data-filtered, so
        // the pre-setup refresh is redundant. Running it here would also hide
        // off-page rows before lockTableColumns could measure the all-rows table.
        // Once initialized, interaction-time refreshes run normally.
        if (!paginationNav.hasAttribute('data-nds-auto-pagination-initialized')) return;

        // Get only visible (non-filtered) items
        const visibleItems = _pagedItems(contentContainer);

        const perPage = contentContainer._ndsPerPage || readPerPage(contentContainer);

        // Resolve the desired page BEFORE the nav is rebuilt: keepPage reads the
        // live active page off the current list (_rebuildAutoNav clamps it into
        // the new range); otherwise reset to 1 (the filter default).
        let desiredPage = 1;
        if (options.keepPage) {
            const list = paginationNav.querySelector('.nds-pagination-list');
            if (list) desiredPage = getCurrentPage(list);
        }

        const page = _rebuildAutoNav(paginationNav, contentContainer, visibleItems, perPage, desiredPage);

        // Keep the opted-in URL param truthful across filter/refresh resets
        // (collapsed or reset → 1 deletes it; keepPage clamps update it). Never
        // runs at init — pre-init refreshes bail above.
        if (!page) {
            _writePageParam(paginationNav, 1);
            return;
        }

        // Wire clicks; re-filter the item set on each click in case the
        // filter changed since this nav was generated. totalPages is derived
        // from the live items inside wireAutoClicks (same getItems closure).
        wireAutoClicks(
            paginationNav.querySelector('.nds-pagination-list'),
            () => _pagedItems(contentContainer),
            perPage
        );

        _writePageParam(paginationNav, page);
    }

    // Auto-refresh: every auto-pagination re-paginates itself when .nds-page-item
    // nodes are added/removed anywhere in its content — no NDS.Pagination.refresh()
    // call needed, at ANY nesting (grid/list direct children, table rows under
    // <tbody>, any wrapper). Wired once per page (on the first auto container's
    // setup), riding the shared body MutationObserver via onDOMAdd/onDOMRemove —
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
    function _wireAutoRefreshWatch() {
        if (_autoRefreshWatchReady) return;
        _autoRefreshWatchReady = true;

        const pending = new Set();
        const flush = NDS.debounce(() => {
            pending.forEach(c => refreshAutoPagination(c, { keepPage: true }));
            pending.clear();
        }, 150);

        NDS.onDOMAdd('.nds-page-item', added => {
            // Dedupe to containers first — a bulk insert reports N added nodes, but
            // the pre-paint visibility pass need only run once per container.
            const containers = new Set();
            added.forEach(item => { const c = item.closest('.nds-paged-content'); if (c) containers.add(c); });
            let queued = false;
            containers.forEach(content => {
                const nav = navForContent(content);
                if (!nav) return;
                _applyCurrentPageVisibility(content, nav);
                pending.add(content);
                queued = true;
            });
            if (queued) flush();
        });

        NDS.onDOMRemove('.nds-page-item', () => {
            const navs = document.querySelectorAll('.nds-pagination[data-nds-auto-pagination-initialized]');
            let queued = false;
            navs.forEach(nav => { const content = contentForNav(nav); if (content) { pending.add(content); queued = true; } });
            if (queued) flush();
        });
    }

    // Re-apply the current page's visibility over the live (non-filtered) item
    // set without touching the nav controls — the cheap half of a refresh,
    // safe to run synchronously per mutation. Clamps to the new last page.
    function _applyCurrentPageVisibility(content, nav) {
        const list = nav.querySelector('.nds-pagination-list');
        if (!list) return;
        const perPage = content._ndsPerPage || readPerPage(content);
        const items = _pagedItems(content);
        const totalPages = Math.max(1, Math.ceil(items.length / perPage));
        showPage(items, Math.min(getCurrentPage(list), totalPages), perPage);
    }

    // Shared apply step for manual paginations: stamp active, refresh prev/next
    // bounds from the page set, scroll if needed. Both branches of
    // the document click handler land here once they've resolved a target page.
    function _applyManualPageChange(pagination, targetPageNum, allPageElements) {
        const previousPage = _currentPageOrNull(pagination);
        setActivePage(pagination, targetPageNum);
        const { min, max } = pageBounds(allPageElements);
        updatePrevNextStates(pagination, targetPageNum, min, max);
        _scrollOnPageChange(pagination);
        _dispatchPageChange(pagination, targetPageNum, previousPage, max);
        _writePageParam(pagination.closest('.nds-pagination') || pagination, targetPageNum);
    }

    // Per-nav click handler for manual pagination. Scoped to the nav element,
    // so DOM removal releases the listener automatically — the AbortController
    // stash on the element is the explicit handle a future destroy() can abort.
    // Idempotent: a re-wire on an already-wired nav no-ops, so init()/create()
    // are safe to repeat. Auto-paginations are wired separately by _wireAutoNav
    // and skip this path.
    function _wireManualNavClicks(paginationNav) {
        if (paginationNav._ndsClickAC) return;
        const ac = new AbortController();
        paginationNav._ndsClickAC = ac;
        paginationNav.addEventListener('click', (e) => {
            // The list inside the nav, or the nav itself when used as a standalone
            // .nds-pagination-list. Reused below for getAllPageElements + the
            // apply step (which call setActivePage / updatePrevNextStates against
            // the list element).
            const pagination = _listOf(paginationNav);

            const pageElement = e.target.closest(_PAGE_CTRL_SEL);
            const dropdownItem = e.target.closest('.nds-pagination-list .nds-dropmenu-item');
            const prevElement = e.target.closest('.nds-pagination-prev button, .nds-pagination-prev a');
            const nextElement = e.target.closest('.nds-pagination-next button, .nds-pagination-next a');

            const clickedElement = pageElement || dropdownItem;
            if (!clickedElement && !prevElement && !nextElement) return;

            // Defensive: if auto-pagination wiring landed on this nav after init
            // (a `data-auto-pagination` resolved late), let its own handler
            // own the click.
            if (paginationNav.hasAttribute('data-nds-auto-pagination-initialized')) return;

            // Resolve target page once; the element set serves both
            // bounds-finding (prev/next) and the post-change prev/next reconcile.
            const allPageElements = getAllPageElements(pagination);

            if (prevElement || nextElement) {
                const currentPageNum = _currentPageOrNull(pagination);
                if (currentPageNum === null) return;
                const targetPageNum = prevElement ? currentPageNum - 1 : currentPageNum + 1;
                // Confirm the target exists — numeric on a lazy nav (most pages
                // aren't in the DOM), DOM presence on author navs.
                if (!_pageExists(pagination, targetPageNum)) return;
                _applyManualPageChange(pagination, targetPageNum, allPageElements);
                return;
            }

            const clickedPageNum = pageNumberOf(clickedElement);
            if (isNaN(clickedPageNum)) return;
            _applyManualPageChange(pagination, clickedPageNum, allPageElements);
        }, { signal: ac.signal });
    }

    // Update a manual / data-driven nav's total page count and rebuild its
    // controls. Manual content lives on the server, so its count can't be
    // observed — the consumer calls this from the fetch handler when a new
    // query changes the result size. activePage defaults to the current page
    // clamped to the new range; pass it to jump (e.g. 1 on a fresh query).
    // The nav-level click handler reads elements live, so it survives the
    // innerHTML swap untouched (_wireManualNavClicks below is just a safety
    // net for a nav that was never inited).
    function setTotalPages(paginationNav, totalPages, activePage) {
        if (!paginationNav) return;
        if (paginationNav.hasAttribute('data-auto-pagination')) {
            console.warn('NDS Pagination: setTotalPages is for manual / data-driven navs. For auto-pagination, add/remove .nds-page-item items (auto-refreshes) or call refresh().', paginationNav);
            return;
        }
        totalPages = parseInt(totalPages);
        if (!(totalPages > 0)) return;

        const list = paginationNav.querySelector('.nds-pagination-list');
        const current = list ? getCurrentPage(list) : 1;
        const target = Math.min(Math.max(1, parseInt(activePage) || current), totalPages);

        paginationNav.dataset.totalPages = totalPages; // keep the attribute truthful
        _destroyEllipsisMenu(paginationNav); // also closes a picker left open across the total change
        paginationNav.innerHTML = generatePaginationHTML(totalPages, target, paginationNav.getAttribute('data-page-url'));
        wireGeneratedPagination(paginationNav, target, totalPages); // ellipsis dropmenu + active stamp (prev/next come baked)
        _wireManualNavClicks(paginationNav);
    }

    // Expose global API for unified init system
    NDS.Pagination = {
        init: initializePagination,
        reinit: () => { initializePagination(); initializeAutoPagination(); },
        initAuto: initializeAutoPagination,
        create: (container) => {
            const inst = new NDSPagination(container);
            // Match initializePagination: wire the per-nav click handler for
            // manual navs; auto-paginations are wired by _wireAutoNav.
            if (!container.hasAttribute('data-auto-pagination')) {
                _wireManualNavClicks(container);
                _wireCollapseWatch();
            }
            return inst;
        },
        refresh: refreshAutoPagination,
        destroy: _destroyPaginationNav,
        setPage: function(container, pageNumber) {
            const pagination = _listOf(container);
            const { min, max } = pageBounds(getAllPageElements(pagination));
            if (!Number.isFinite(min)) return;
            setActivePage(pagination, pageNumber);
            updatePrevNextStates(pagination, pageNumber, min, max);
            _scrollOnPageChange(pagination);
            _writePageParam(container, pageNumber);
        },
        // Manual scroll for consumers driving their own page changes. Ignores
        // data-pagination-no-scroll — the explicit call is the intent.
        scrollToContent: function(container) {
            scrollToContent(_listOf(container));
        },
        // Server/manual pagination hook: push your own numbers through the same
        // [data-paged-target] slot grammar the auto path stamps.
        // NDS.Pagination.updateRecords('listId', { from: 21, to: 30, count: 214 })
        updateRecords: function(listOrId, { from = 0, to = 0, count = 0 } = {}) {
            const id = typeof listOrId === 'string' ? listOrId : (listOrId && listOrId.id);
            if (id) stampRecordSlots(id, from, to, count);
        },
        setTotalPages,
    };

    // Note: Initialization now handled by nds-loader.js unified system
})();
