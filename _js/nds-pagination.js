/**
 * NDS Pagination Component
 *
 * Delegated (ships in nds-delegated.min.js, loader-INJECTED after the reveal —
 * NOT critical:true). Pre-init paint is owned by the data-paged-initialized
 * crit-CSS skeleton, which hides items past the default page size (and collapses
 * table rows) until init stamps data-paged-initialized — so init landing
 * post-reveal inserts the list without shifting content. The state init sets:
 *   - HTML builders + the manual-collapse path (NDSPagination →
 *     reconcileCollapse): 5+ pages collapse to
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
 *   - goToPage / scrollToContent (sticky-nav-aware smooth scroll)
 *   - refreshAutoPagination (filter-driven; the NDS.Pagination.refresh entry)
 *   - The per-container --per-page ResizeObserver + the .nds-paged-content
 *     onDOMRemove cleanup
 *
 * Lifecycle:
 *   - Shared NDS.onDOMRemove('.nds-pagination') sweep aborts the click AC
 *     and releases _offResize for navs torn down without an explicit destroy.
 *   - NDS.Pagination.destroy(nav) — explicit teardown for SPA consumers
 *     (aborts the click AC, releases _offResize, clears the init stamps).
 *
 * Display pattern: [Prev] 1 2 3 ... [Last] [Next]
 * - Always shows first 3 pages and last page
 * - All middle pages (4 to second-to-last) grouped in dropdown menu (...)
 *
 * Supports both <button> and <a> elements for pagination items.
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
    function readPerPage(el) {
        const inline = el.style.getPropertyValue('--per-page');
        const v = parseInt(inline || getComputedStyle(el).getPropertyValue('--per-page'), 10);
        return v > 0 ? v : 5;
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
            this.pagination = paginationNav.querySelector('.nds-pagination-list') || paginationNav;
            this.items = Array.from(this.pagination.querySelectorAll('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next)'));

            if (this.items.length === 0) {
                // Silently skip empty pagination (likely auto-pagination that will be populated)
                return;
            }

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
    // Attributes the builders own — everything else on an author page button is
    // preserved verbatim through collapse. data-state stays NDS.State-managed
    // (never a literal attribute); class/href/type/aria-current are emitted by
    // the builder from dedicated model fields.
    const _MANAGED_ATTRS = new Set(['class', 'href', 'type', 'aria-current', 'data-state']);
    const _escAttr = v => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    const _attrStr = attrs => { let s = ''; for (const n in attrs) s += ` ${n}="${_escAttr(attrs[n])}"`; return s; };

    // Capture the full ordered page-button set from a manual nav's list, whether
    // it is currently flat or already collapsed (visible buttons + ellipsis
    // dropdown items). Each entry is a faithful round-trip of the author's control
    // — element type (button/anchor), href, label markup, class, and any extra
    // attributes (data-*, title, custom aria) — so collapse preserves custom
    // markup, not just the page number.
    function _capturePageModel(list) {
        const seen = new Set();
        const model = [];
        const push = el => {
            const num = pageNumberOf(el);
            if (isNaN(num) || seen.has(num)) return;
            seen.add(num);
            const attrs = {};
            for (let i = 0; i < el.attributes.length; i++) {
                const a = el.attributes[i];
                if (!_MANAGED_ATTRS.has(a.name)) attrs[a.name] = a.value;
            }
            model.push({
                num,
                tag: el.tagName.toLowerCase() === 'a' ? 'a' : 'button',
                href: el.getAttribute('href'),
                // Class minus the positional dropdown marker — the ellipsis builder
                // re-adds nds-dropmenu-item when this page collapses in.
                className: (el.getAttribute('class') || '').split(/\s+/).filter(c => c && c !== 'nds-dropmenu-item').join(' '),
                attrs,
                labelHTML: el.innerHTML,
                active: el.ariaCurrent === 'page' || NDS.State.has(el, 'active'),
            });
        };
        list.querySelectorAll('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next):not(.nds-pagination-ellipsis) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next):not(.nds-pagination-ellipsis) a').forEach(push);
        getPaginationDropmenuItems(list).forEach(push);
        return model.sort((a, b) => a.num - b.num);
    }

    // Render one captured page control (button or anchor), preserving the author's
    // class + pass-through attributes. dropdownItem=true re-adds the dropmenu marker.
    function _control(e, activeNum, dropdownItem) {
        const cls = dropdownItem ? `${e.className} nds-dropmenu-item` : e.className;
        const cur = e.num === activeNum ? ' aria-current="page"' : '';
        const extra = _attrStr(e.attrs);
        return e.tag === 'a'
            ? `<a class="${cls}"${e.href != null ? ` href="${_escAttr(e.href)}"` : ''}${cur}${extra}>${e.labelHTML}</a>`
            : `<button type="button" class="${cls}"${cur}${extra}>${e.labelHTML}</button>`;
    }

    // One page <li> from a model entry — preserves the author's control markup
    // (class/attrs/href/label) the data-driven _pageLi builder doesn't carry.
    function _pageLiM(e, activeNum) {
        return `<li class="nds-pagination-item page_${e.num}">${_control(e, activeNum, false)}</li>`;
    }

    // Shared ellipsis <li> chrome — the dropmenu shell both ellipsis builders wrap
    // around their own items (number-only _ellipsisLi, markup-preserving _ellipsisLiM).
    // One definition so a dropmenu-markup change can't drift between the two.
    function _ellipsisShell(itemsHTML) {
        return `<li class="nds-pagination-item nds-pagination-ellipsis"><div class="nds-dropmenu"><button type="button" class="nds-btn nds-subtle nds-ellipsis nds-indicator nds-dropmenu-trigger" aria-label="More pages"><span class="nds-label"></span></button><div class="nds-dropmenu-menu" aria-hidden="true"><div class="nds-dropmenu-scroll">${itemsHTML}</div></div></div></li>`;
    }

    // Ellipsis <li> whose dropdown holds the collapsed range — entry-based twin
    // of _ellipsisLi, carrying each hidden page's author markup.
    function _ellipsisLiM(entries, activeNum) {
        return _ellipsisShell(entries.map(e => _control(e, activeNum, true)).join(''));
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

        const pages = model.length > 5
            ? _pageLiM(model[0], activeNum) + _pageLiM(model[1], activeNum) + _pageLiM(model[2], activeNum)
              + _ellipsisLiM(model.slice(3, -1), activeNum) + _pageLiM(model[model.length - 1], activeNum)
            : model.map(e => _pageLiM(e, activeNum)).join('');

        list.innerHTML = pages; // page area only…
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

    // Release everything pagination attached to a nav: the click AbortController
    // (manual), the content-side resize observer whose closure references this
    // nav (auto), the instance backref, and the init stamps. Idempotent — re-
    // invoked on the same nav no-ops once the stash is gone. Item visibility
    // (`item.hidden`) is left untouched: a teardown of the UI shouldn't decide
    // what to render in its absence.
    function _destroyPaginationNav(nav) {
        if (!nav) return;

        if (nav._ndsClickAC) {
            nav._ndsClickAC.abort();
            delete nav._ndsClickAC;
        }

        // Auto path: the .nds-paged-content removal sweep also releases this,
        // but destroy() may run while the content is still in the DOM (consumer
        // tearing down a region without removing it). Releasing here avoids a
        // resize callback firing into a torn-down nav.
        const content = contentForNav(nav);
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
                    // Auto-generate pagination HTML. data-page-url (a "?page={page}"
                    // template) makes the controls navigable links for no-JS,
                    // server-reload pagination; without it they're buttons.
                    const paginationHTML = generatePaginationHTML(totalPages, activePage, false, container.getAttribute('data-page-url'));
                    container.innerHTML = paginationHTML;
                    markActivePage(container, activePage);
                }

                const paginationInstance = new NDSPagination(container);
                container.ndsPagination = paginationInstance;
                container.setAttribute('data-nds-pagination-initialized', 'true');

                // Initialize button states after pagination is ready
                initializePaginationStates(container);

                // Wire the per-nav click handler. Auto-paginations are wired
                // separately by _wireAutoNav (with a live items getter) and skip
                // this path. Listener is scoped to the nav — DOM removal GCs it
                // automatically; the AbortController stash on the element is the
                // explicit handle a future destroy() can abort.
                if (!container.hasAttribute('data-auto-pagination')) {
                    _wireManualNavClicks(container);
                    _wireCollapseWatch(); // live ellipsis re-collapse on dynamic <li> changes
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
    // each menu is a direct descendant.
    function getPaginationDropmenuItems(pagination) {
        const items = [];
        pagination.querySelectorAll('.nds-dropmenu-menu').forEach(menu => {
            items.push(...menu.querySelectorAll('.nds-dropmenu-item'));
        });
        return items;
    }

    // All clickable page elements (in-list buttons + dropmenu items).
    // Excludes prev/next.
    function getAllPageElements(pagination) {
        const inList = Array.from(pagination.querySelectorAll(
            '.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, ' +
            '.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a'
        ));
        return [...inList, ...getPaginationDropmenuItems(pagination)];
    }

    // Shared function to set active page and aria-current. One pass over every
    // clickable: clears stale active state ONLY where it exists (at
    // most the old active page + its ellipsis trigger — the hundreds of inactive
    // dropmenu items on a large auto-pagination pay no write) and, in the same
    // visit, captures the page element matching the target. Replaces the prior
    // clear-all + find-all double scan, each O(total pages) per page change.
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

        if (!target) return;

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
        const pagination = paginationNav.querySelector('.nds-pagination-list') || paginationNav;

        // Get all page elements and numbers
        const allPageElements = getAllPageElements(pagination);
        if (allPageElements.length === 0) return;

        const { min: minPage, max: maxPage } = pageBounds(allPageElements);
        if (!Number.isFinite(minPage)) return;

        // Find the active page
        const activePage = allPageElements.find(el => el.ariaCurrent === 'page');

        // Get current page number (or default to first page if none active)
        let currentPageNum;
        if (activePage) {
            currentPageNum = pageNumberOf(activePage);
        } else {
            currentPageNum = minPage;
        }

        if (isNaN(currentPageNum)) return;

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
        const headers = table && table.querySelectorAll('thead th');
        if (!headers || !headers.length) return;
        const widths = [];
        for (let i = 0; i < headers.length; i++) widths.push(headers[i].getBoundingClientRect().width);
        for (let i = 0; i < headers.length; i++) headers[i].style.width = widths[i] + 'px';
    }

    // Resolve a data-auto-pagination ref to its element. Canonical form is a bare
    // id (matches filter's data-filter-target); a #id or any selector also works.
    function resolveContentRef(ref) {
        const byId = document.getElementById(ref.replace(/^#/, ''));
        if (byId) return byId;
        try { return document.querySelector(ref); } catch (e) { return null; }
    }

    // The .nds-paged-content a nav controls. Explicit binding wins:
    // data-auto-pagination="gridId" (the content's id). With no value, falls back
    // to the legacy adjacency contract — the nav's immediately-preceding sibling.
    function contentForNav(paginationNav) {
        const ref = paginationNav.getAttribute('data-auto-pagination');
        if (ref) {
            const el = resolveContentRef(ref);
            if (el && el.classList.contains('nds-paged-content')) return el;
            console.warn(`NDS Pagination: data-auto-pagination="${ref}" matched no .nds-paged-content element.`, paginationNav);
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
                if (ref && resolveContentRef(ref) === contentContainer) return nav;
            }
        }
        return contentContainer.parentElement?.querySelector('.nds-pagination[data-auto-pagination]') || null;
    }

    // Auto-Pagination Generator for content-based pagination
    function initializeAutoPagination() {
        document.querySelectorAll('.nds-pagination[data-auto-pagination]').forEach(setupAutoContainer);
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
        const items = Array.from(contentContainer.querySelectorAll('.nds-page-item'))
            .filter(item => !item.hasAttribute('data-filtered'));

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
            contentContainer.setAttribute('data-paged-initialized', '');

            // Wire interaction: clicks + the --per-page ResizeObserver.
            // _wireAutoNav re-queries items live (per click, per resize), so the
            // spec carries only the per-container handles + the perPage baseline
            // (which the resize observer detects changes against).
            _wireAutoNav({ paginationNav, contentContainer, perPage });
        };

        // Tables defer one frame: by the next paint the collapsed table is
        // already laid out, so lockTableColumns' width read is free — no
        // pre-paint forced reflow. The skeleton shows the first rows in the
        // meantime, so the one-frame defer is invisible. Grids have no column
        // lock, so they paginate synchronously.
        if (items[0] && items[0].tagName === 'TR') requestAnimationFrame(paginate);
        else paginate();

        // Re-paginate automatically when items are added/removed. Default for all
        // auto-pagination; wired once per page, subsequent calls no-op.
        _wireAutoRefreshWatch();

        paginationNav.setAttribute('data-nds-auto-pagination-initialized', 'true');
    }

    // Rebuild an auto-pagination nav for the given --per-page, preserving the
    // current page. Callers (setupAutoContainer's initial paint, _wireAutoNav's
    // resize callback) are responsible for wiring click handlers afterwards via
    // wireAutoClicks; refreshAutoPagination rebuilds independently.
    function updateAutoPagination(paginationNav, items, perPage) {
        const totalPages = Math.ceil(items.length / perPage);

        // Preserve the current page across a --per-page change.
        const pagination = paginationNav.querySelector('.nds-pagination-list');
        const currentPage = pagination ? getCurrentPage(pagination) : 1;

        // No pagination needed — show every item.
        if (totalPages <= 1) {
            items.forEach(item => item.hidden = false);
            paginationNav.innerHTML = '';
            return;
        }

        const newCurrentPage = Math.min(currentPage, totalPages);

        // Generate the collapsed list directly (no build-all-then-collapse),
        // show the page's items, wire the ellipsis dropmenu + active state.
        paginationNav.innerHTML = generatePaginationHTML(totalPages, newCurrentPage, true);
        showPage(items, newCurrentPage, perPage);
        wireGeneratedPagination(paginationNav, newCurrentPage);
    }

    // Stamp data-state="active" on the active page button after innerHTML.
    // Paired with generatePaginationHTML which intentionally omits the attr.
    function markActivePage(host, activePage) {
        if (!host) return;
        const btn = host.querySelector(`.page_${activePage} .nds-btn`);
        if (btn) NDS.State.set(btn, 'active');
    }

    // ── HTML builders ────────────────────────────────────────────────
    // data-state for the active page is NOT baked into the template — it stays
    // inside NDS.State.set (markActivePage / activateGeneratedPage) so the State
    // vocab never leaks into a literal attribute. aria-current IS emitted; it's
    // semantic and valid pre-JS.
    // url (when set) is a page→href function — the controls become navigable
    // anchors for no-JS, server-reload pagination (data-page-url). A disabled
    // prev/next anchor drops its href; CSS pointer-events handles the rest.
    const _prevLi = (disabled, url, prevPage) => {
        const inner = url
            ? `<a class="nds-btn nds-subtle" aria-label="Previous page"${disabled ? ' aria-disabled="true"' : ` href="${url(prevPage)}"`}><i class="nds-icon nds-hgi-arrow-right-01" aria-hidden="true"></i></a>`
            : `<button type="button" class="nds-btn nds-subtle" aria-label="Previous page"${disabled ? ' disabled' : ''}><i class="nds-icon nds-hgi-arrow-right-01" aria-hidden="true"></i></button>`;
        return `<li class="nds-pagination-item nds-pagination-prev">${inner}</li>`;
    };
    const _nextLi = (disabled, url, nextPage) => {
        const inner = url
            ? `<a class="nds-btn nds-subtle" aria-label="Next page"${disabled ? ' aria-disabled="true"' : ` href="${url(nextPage)}"`}><i class="nds-icon nds-hgi-arrow-left-01" aria-hidden="true"></i></a>`
            : `<button type="button" class="nds-btn nds-subtle" aria-label="Next page"${disabled ? ' disabled' : ''}><i class="nds-icon nds-hgi-arrow-left-01" aria-hidden="true"></i></button>`;
        return `<li class="nds-pagination-item nds-pagination-next">${inner}</li>`;
    };
    const _pageLi = (i, activePage, url) => {
        const cur = i === activePage ? ' aria-current="page"' : '';
        const inner = url
            ? `<a class="nds-btn nds-subtle nds-indicator" href="${url(i)}"${cur} aria-label="Page ${i}"><span class="nds-label">${i}</span></a>`
            : `<button type="button" class="nds-btn nds-subtle nds-indicator"${cur} aria-label="Page ${i}"><span class="nds-label">${i}</span></button>`;
        return `<li class="nds-pagination-item page_${i}">${inner}</li>`;
    };

    // Ellipsis <li>: a dropmenu whose items are the collapsed page range
    // [from, to]. Structure mirrors _ellipsisLiM (the markup-preserving twin)
    // exactly, so NDS.Dropmenu.create and the click handler treat them the same.
    function _ellipsisLi(from, to, activePage, url) {
        let items = '';
        for (let i = from; i <= to; i++) {
            const cur = i === activePage ? ' aria-current="page"' : '';
            items += url
                ? `<a class="nds-btn nds-subtle nds-indicator nds-dropmenu-item" href="${url(i)}"${cur} aria-label="Page ${i}"><span class="nds-label">${i}</span></a>`
                : `<button type="button" class="nds-btn nds-subtle nds-indicator nds-dropmenu-item" aria-label="Page ${i}"${cur}><span class="nds-label">${i}</span></button>`;
        }
        return _ellipsisShell(items);
    }

    // Build a pagination list. With collapse=true and >5 pages, emits the
    // collapsed shape directly — [Prev] 1 2 3 [ellipsis of 4..N-1] N [Next] — so
    // auto-pagination skips the build-all-then-collapse round-trip (no
    // NDSPagination needed). The manual path passes collapse=false and collapses
    // via reconcileCollapse (which preserves author href/label markup). pageUrl
    // (a "?page={page}" template) makes every control a navigable <a href>.
    function generatePaginationHTML(totalPages, activePage = 1, collapse = false, pageUrl = null) {
        activePage = Math.max(1, Math.min(activePage, totalPages));
        const url = pageUrl ? (p => _escAttr(pageUrl.replace('{page}', p))) : null;
        let html = '<ul class="nds-pagination-list">' + _prevLi(activePage === 1, url, activePage - 1);
        if (collapse && totalPages > 5) {
            html += _pageLi(1, activePage, url) + _pageLi(2, activePage, url) + _pageLi(3, activePage, url);
            html += _ellipsisLi(4, totalPages - 1, activePage, url);
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
    function wireGeneratedPagination(paginationNav, activePage) {
        const dm = paginationNav.querySelector('.nds-pagination-ellipsis .nds-dropmenu');
        // Soft dependency — ellipsis stays plain markup if NDS.Dropmenu isn't bundled.
        if (dm && NDS.Dropmenu) NDS.Dropmenu.create(dm);
        activateGeneratedPage(paginationNav, activePage);
    }

    // Stamp data-state active for the current page on a freshly generated list:
    // a visible page button, or — when the page is collapsed into the ellipsis —
    // the dropmenu item plus the ellipsis trigger (whose label then shows the number).
    function activateGeneratedPage(host, activePage) {
        const visibleBtn = host.querySelector(`.page_${activePage} .nds-btn`);
        if (visibleBtn) { NDS.State.set(visibleBtn, 'active'); return; }
        const items = host.querySelectorAll('.nds-pagination-ellipsis .nds-dropmenu-item');
        for (let i = 0; i < items.length; i++) {
            if (parseInt(items[i].querySelector('.nds-label')?.textContent) === activePage) {
                NDS.State.set(items[i], 'active');
                const trigger = host.querySelector('.nds-pagination-ellipsis .nds-dropmenu-trigger');
                if (trigger) {
                    NDS.State.set(trigger, 'active');
                    const label = trigger.querySelector('.nds-label');
                    if (label) label.textContent = activePage;
                }
                return;
            }
        }
    }

    function showPage(items, pageNumber, perPage) {
        const start = (pageNumber - 1) * perPage;
        const end = start + perPage;

        items.forEach((item, index) => {
            item.hidden = index < start || index >= end;
        });
    }

    function getCurrentPage(pagination) {
        // Searches both in-list items and ellipsis dropmenu items.
        const active = getAllPageElements(pagination).find(el => el.ariaCurrent === 'page');
        if (active) {
            return pageNumberOf(active) || 1;
        }
        return 1;
    }

    // ── Interaction layer (wired at init; runs on click / resize) ─────────

    // Scroll the target back into view after a page change. Reads
    // getBoundingClientRect once, early-returns when already in view (so the
    // no-scroll path skips the getComputedStyle recalc), and only resolves the
    // sticky-nav offset when we know we'll actually scroll.
    function scrollToContent(pagination) {
        const paginationNav = pagination.closest('.nds-pagination');
        if (!paginationNav) return;

        const contentContainer = contentForNav(paginationNav);
        const targetElement = contentContainer || paginationNav;

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
        const prevActive = pagination.querySelector('[aria-current="page"]');
        const previousPage = prevActive ? pageNumberOf(prevActive) : null;

        // Set active page with aria-current
        setActivePage(pagination, pageNumber);

        // Update prev/next button states
        updatePrevNextStates(pagination, pageNumber, 1, totalPages);

        // Show page items
        showPage(items, pageNumber, perPage);

        // Scroll to top of content
        scrollToContent(pagination);

        _dispatchPageChange(pagination, pageNumber, previousPage, totalPages);
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
            const pageElement = e.target.closest('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a, .nds-dropmenu-item');

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

    // Refresh auto-pagination for a specific content container (used by filters
    // and the auto-refresh watcher). Resets to page 1 over the
    // visible (non-[data-filtered]) subset. With { keepPage: true } it stays on
    // the current page instead (clamped to the new last page) — for add/remove,
    // where snapping back to page 1 would lose the user's place.
    function refreshAutoPagination(contentContainer, options = {}) {
        if (!contentContainer) return;

        // Find the pagination nav associated with this content container
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
        const allItems = Array.from(contentContainer.querySelectorAll('.nds-page-item'));
        const visibleItems = allItems.filter(item => !item.hasAttribute('data-filtered'));

        const perPage = contentContainer._ndsPerPage || readPerPage(contentContainer);
        const totalPages = Math.ceil(visibleItems.length / perPage);

        // Resolve target page BEFORE the nav is rebuilt: keepPage reads the live
        // active page off the current list and clamps it to the new range;
        // otherwise reset to 1 (the filter default).
        let targetPage = 1;
        if (options.keepPage) {
            const list = paginationNav.querySelector('.nds-pagination-list');
            targetPage = list ? Math.min(getCurrentPage(list), Math.max(1, totalPages)) : 1;
        }

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
        paginationNav.innerHTML = generatePaginationHTML(totalPages, targetPage, true);

        // Show the target page's items
        showPage(visibleItems, targetPage, perPage);

        // Wire the ellipsis dropmenu + stamp active state
        wireGeneratedPagination(paginationNav, targetPage);

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
        const items = Array.from(content.querySelectorAll('.nds-page-item'))
            .filter(it => !it.hasAttribute('data-filtered'));
        const totalPages = Math.max(1, Math.ceil(items.length / perPage));
        showPage(items, Math.min(getCurrentPage(list), totalPages), perPage);
    }

    // Shared apply step for manual paginations: stamp active, refresh prev/next
    // bounds from the page set, scroll if needed. Both branches of
    // the document click handler land here once they've resolved a target page.
    function _applyManualPageChange(pagination, targetPageNum, allPageElements) {
        const prevActive = allPageElements.find(el => el.ariaCurrent === 'page');
        const previousPage = prevActive ? pageNumberOf(prevActive) : null;
        setActivePage(pagination, targetPageNum);
        const { min, max } = pageBounds(allPageElements);
        updatePrevNextStates(pagination, targetPageNum, min, max);
        scrollToContent(pagination);
        _dispatchPageChange(pagination, targetPageNum, previousPage, max);
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
            const pagination = paginationNav.querySelector('.nds-pagination-list') || paginationNav;

            const pageElement = e.target.closest('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a');
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
                const currentActive = allPageElements.find(el => el.ariaCurrent === 'page');
                if (!currentActive) return;
                const currentPageNum = pageNumberOf(currentActive);
                if (isNaN(currentPageNum)) return;
                const targetPageNum = prevElement ? currentPageNum - 1 : currentPageNum + 1;
                // Confirm the target exists (in-list or in the dropdown).
                if (!allPageElements.some(el => pageNumberOf(el) === targetPageNum)) return;
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
        paginationNav.innerHTML = generatePaginationHTML(totalPages, target, true, paginationNav.getAttribute('data-page-url'));
        // Pre-stamp the collapse signature so the live watcher recognises this as
        // its own output (pages 1..N) and skips a redundant rebuild.
        paginationNav._ndsCollapseSig = Array.from({ length: totalPages }, (_, i) => i + 1).join(',');
        wireGeneratedPagination(paginationNav, target); // ellipsis dropmenu + active stamp (prev/next come baked)
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
        refresh: (container, options) => refreshAutoPagination(container, options),
        destroy: (container) => _destroyPaginationNav(container),
        setPage: function(container, pageNumber) {
            const pagination = container.querySelector('.nds-pagination-list') || container;
            const { min, max } = pageBounds(getAllPageElements(pagination));
            if (!Number.isFinite(min)) return;
            setActivePage(pagination, pageNumber);
            updatePrevNextStates(pagination, pageNumber, min, max);
        },
        setTotalPages: (container, totalPages, activePage) => setTotalPages(container, totalPages, activePage),
    };

    // Note: Initialization now handled by nds-loader.js unified system
})();
