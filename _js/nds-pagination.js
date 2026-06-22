/**
 * NDS Pagination Component
 *
 * Delegated (ships in nds-delegated.min.js, loader-INJECTED after the reveal —
 * NOT critical:true). Pre-init paint is owned by the data-paged-initialized
 * crit-CSS skeleton, which hides items past the default page size (and collapses
 * table rows) until init stamps data-paged-initialized — so init landing
 * post-reveal inserts the list without shifting content. The state init sets:
 *   - HTML builders + the manual-collapse path (NDSPagination +
 *     collapsePagination + createDropdown): 5+ pages collapse to
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
 *   - The global delegated click handler for manual pagination navigation
 *     (prev/next, direct page, portaled dropmenu items)
 *   - Per-nav click handler for auto-pagination (wireAutoClicks)
 *   - goToPage / scrollToContent (sticky-nav-aware smooth scroll)
 *   - refreshAutoPagination (filter-driven; the NDS.Pagination.refresh entry)
 *   - The per-container --per-page ResizeObserver + the .nds-paged-content
 *     onDOMRemove cleanup
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
    let _manualWired = false;

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

    // Min/max page numbers across a set of page elements (portal-aware sets
    // included). Returns { min: Infinity, max: -Infinity } when none are numeric.
    function pageBounds(els) {
        const nums = els.map(pageNumberOf).filter(n => !isNaN(n));
        return { min: Math.min(...nums), max: Math.max(...nums) };
    }

    class NDSPagination {
        constructor(paginationNav) {
            this.paginationNav = paginationNav;
            this.pagination = paginationNav.querySelector('.nds-pagination-list') || paginationNav;
            this.items = Array.from(this.pagination.querySelectorAll('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next)'));
            this.threshold = 5; // Collapse if more than 5 page items

            if (this.items.length === 0) {
                // Silently skip empty pagination (likely auto-pagination that will be populated)
                return;
            }

            this.init();
        }

        init() {
            if (this.items.length > this.threshold) {
                this.collapsePagination();
            }
        }

        collapsePagination() {
            // Keep first 3 pages and last page visible
            const prevBtn = this.pagination.querySelector('.nds-pagination-prev');
            const nextBtn = this.pagination.querySelector('.nds-pagination-next');
            const firstThreeItems = this.items.slice(0, 3);
            const lastItem = this.items[this.items.length - 1];
            const hiddenItems = this.items.slice(3, -1); // Middle pages (4 to second-to-last)

            // Create dropdown container using nds-dropmenu
            const dropdownContainer = this.createDropdown(hiddenItems);

            // Clear and rebuild pagination
            this.pagination.innerHTML = '';

            // Add prev button
            if (prevBtn) this.pagination.appendChild(prevBtn);

            // Add first 3 pages
            firstThreeItems.forEach(item => {
                this.pagination.appendChild(item);
            });

            // Add dropdown
            this.pagination.appendChild(dropdownContainer);

            // Add last page
            this.pagination.appendChild(lastItem);

            // Add next button
            if (nextBtn) this.pagination.appendChild(nextBtn);

            // Initialize only the newly created dropdown menu (same as breadcrumbs)
            const dropmenuElement = dropdownContainer.querySelector('.nds-dropmenu');
            // Soft dependency — ellipsis stays as plain markup if NDS.Dropmenu isn't bundled.
            if (dropmenuElement && NDS.Dropmenu) {
                NDS.Dropmenu.create(dropmenuElement);
            }

            // If active page is inside the dropdown, activate the ellipsis trigger.
            // Two equally-acceptable signals: aria-current="page" (semantic) or
            // data-state's 'active' token (state-vocab). Iterate once in DOM order
            // and break on whichever matches first — preserves the union-selector
            // semantics of the prior code without coupling to the State vocab via
            // attribute selector.
            let activeDropdownItem = null;
            const dropdownItems = dropdownContainer.querySelectorAll('.nds-dropmenu-item');
            for (let i = 0; i < dropdownItems.length; i++) {
                const item = dropdownItems[i];
                if (item.ariaCurrent === 'page' || NDS.State.has(item, 'active')) {
                    activeDropdownItem = item;
                    break;
                }
            }
            if (activeDropdownItem) {
                const trigger = dropdownContainer.querySelector('.nds-dropmenu-trigger');
                if (trigger) {
                    NDS.State.set(trigger, 'active');
                    const triggerLabel = trigger.querySelector('.nds-label');
                    const activeLabel = activeDropdownItem.querySelector('.nds-label');
                    if (triggerLabel && activeLabel) {
                        triggerLabel.textContent = activeLabel.textContent;
                    }
                }
            }
        }

        createDropdown(hiddenItems) {
            const li = document.createElement('li');
            li.className = 'nds-pagination-item nds-pagination-ellipsis';

            // Create nds-dropmenu structure. Default no-portal: the menu lives
            // inside `.nds-pagination-ellipsis`, so the descendant SCSS selector
            // applies naturally.
            const dropmenu = document.createElement('div');
            dropmenu.className = 'nds-dropmenu';

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'nds-btn nds-subtle nds-ellipsis nds-indicator nds-dropmenu-trigger';
            button.innerHTML = '<span class="nds-label"></span>';
            NDS.aria.label(button, 'More pages');

            const menu = document.createElement('div');
            menu.className = 'nds-dropmenu-menu';
            NDS.aria.hidden(menu, true);

            const scroll = document.createElement('div');
            scroll.className = 'nds-dropmenu-scroll';
            menu.appendChild(scroll);

            // Add hidden items to dropdown menu
            hiddenItems.forEach(item => {
                // Support both button and anchor elements
                const element = item.querySelector('button, a');
                if (element) {
                    const isAnchor = element.tagName.toLowerCase() === 'a';
                    const menuItem = document.createElement(isAnchor ? 'a' : 'button');
                    menuItem.className = 'nds-btn nds-subtle nds-indicator nds-dropmenu-item';
                    menuItem.innerHTML = element.innerHTML;
                    NDS.aria.label(menuItem, element.ariaLabel || `Page ${element.textContent}`);

                    // Preserve active state and aria-current from original element
                    if (NDS.State.has(element, 'active')) {
                        NDS.State.set(menuItem, 'active');
                    }
                    if (element.hasAttribute('aria-current')) {
                        NDS.aria.current(menuItem, element.ariaCurrent);
                    }

                    // Copy href for anchors
                    if (isAnchor && element.hasAttribute('href')) {
                        menuItem.setAttribute('href', element.getAttribute('href'));
                    }

                    // Preserve any onclick the source button carried; otherwise
                    // navigation is handled by the document-level pagination
                    // click handler (the dropmenu portals to <body>, so the
                    // wrapper re-dispatches a synthetic click that carries the
                    // item via `event.ndsDropmenuItem`).
                    if (!isAnchor) {
                        menuItem.type = 'button';
                        if (element.onclick) menuItem.onclick = element.onclick;
                    }

                    scroll.appendChild(menuItem);
                }
            });

            dropmenu.appendChild(button);
            dropmenu.appendChild(menu);
            li.appendChild(dropmenu);

            return li;
        }

        static create(element) {
            return new NDSPagination(element);
        }
    }

    // Initialization function (called by nds-loader.js)
    function initializePagination() {
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
                    // Auto-generate pagination HTML
                    const paginationHTML = generatePaginationHTML(totalPages, activePage);
                    container.innerHTML = paginationHTML;
                    markActivePage(container, activePage);
                }

                const paginationInstance = new NDSPagination(container);
                container.ndsPagination = paginationInstance;
                container.setAttribute('data-nds-pagination-initialized', 'true');

                // Initialize button states after pagination is ready
                initializePaginationStates(container);

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

    // Collect dropmenu items associated with a pagination, including those
    // in menus currently portaled to <body> (resolved via the wrapper's
    // `_ownerMenu` backref through NDS.Dropmenu.menuOf).
    function getPaginationDropmenuItems(pagination) {
        const items = [];
        pagination.querySelectorAll('.nds-dropmenu').forEach(dm => {
            const menu = NDS.Dropmenu.menuOf(dm) || dm.querySelector('.nds-dropmenu-menu');
            if (menu) items.push(...menu.querySelectorAll('.nds-dropmenu-item'));
        });
        return items;
    }

    // All clickable page elements (in-list buttons + dropmenu items),
    // portal-aware. Excludes prev/next.
    function getAllPageElements(pagination) {
        const inList = Array.from(pagination.querySelectorAll(
            '.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, ' +
            '.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a'
        ));
        return [...inList, ...getPaginationDropmenuItems(pagination)];
    }

    // Shared function to set active page and aria-current. One portal-aware pass
    // over every clickable: clears stale active state ONLY where it exists (at
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
            const ellipsisTrigger = NDS.Dropmenu.from(target)?.querySelector('.nds-dropmenu-trigger');
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

        // Get all page elements and numbers (portal-aware)
        const allPageElements = getAllPageElements(pagination);
        if (allPageElements.length === 0) return;

        const { min: minPage, max: maxPage } = pageBounds(allPageElements);
        if (!Number.isFinite(minPage)) return;

        // Find the active page (portal-aware)
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
    const _prevLi = (disabled) =>
        `<li class="nds-pagination-item nds-pagination-prev"><button type="button" class="nds-btn nds-subtle" aria-label="Previous page"${disabled ? ' disabled' : ''}><i class="nds-icon nds-hgi-arrow-right-01" aria-hidden="true"></i></button></li>`;
    const _nextLi = (disabled) =>
        `<li class="nds-pagination-item nds-pagination-next"><button type="button" class="nds-btn nds-subtle" aria-label="Next page"${disabled ? ' disabled' : ''}><i class="nds-icon nds-hgi-arrow-left-01" aria-hidden="true"></i></button></li>`;
    const _pageLi = (i, activePage) =>
        `<li class="nds-pagination-item page_${i}"><button type="button" class="nds-btn nds-subtle nds-indicator"${i === activePage ? ' aria-current="page"' : ''} aria-label="Page ${i}"><span class="nds-label">${i}</span></button></li>`;

    // Ellipsis <li>: a dropmenu whose items are the collapsed page range
    // [from, to]. Structure mirrors createDropdown() (the manual-collapse path)
    // exactly, so NDS.Dropmenu.create and the click handler treat them the same.
    function _ellipsisLi(from, to, activePage) {
        let items = '';
        for (let i = from; i <= to; i++) {
            const ariaCurrent = i === activePage ? ' aria-current="page"' : '';
            items += `<button type="button" class="nds-btn nds-subtle nds-indicator nds-dropmenu-item" aria-label="Page ${i}"${ariaCurrent}><span class="nds-label">${i}</span></button>`;
        }
        return `<li class="nds-pagination-item nds-pagination-ellipsis"><div class="nds-dropmenu"><button type="button" class="nds-btn nds-subtle nds-ellipsis nds-indicator nds-dropmenu-trigger" aria-label="More pages"><span class="nds-label"></span></button><div class="nds-dropmenu-menu" aria-hidden="true"><div class="nds-dropmenu-scroll">${items}</div></div></div></li>`;
    }

    // Build a pagination list. With collapse=true and >5 pages, emits the
    // collapsed shape directly — [Prev] 1 2 3 [ellipsis of 4..N-1] N [Next] — so
    // auto-pagination skips the build-all-then-collapse round-trip (no
    // NDSPagination needed). The manual path passes collapse=false and keeps
    // collapsePagination() for author-written markup.
    function generatePaginationHTML(totalPages, activePage = 1, collapse = false) {
        activePage = Math.max(1, Math.min(activePage, totalPages));
        let html = '<ul class="nds-pagination-list">' + _prevLi(activePage === 1);
        if (collapse && totalPages > 5) {
            html += _pageLi(1, activePage) + _pageLi(2, activePage) + _pageLi(3, activePage);
            html += _ellipsisLi(4, totalPages - 1, activePage);
            html += _pageLi(totalPages, activePage);
        } else {
            for (let i = 1; i <= totalPages; i++) html += _pageLi(i, activePage);
        }
        html += _nextLi(activePage === totalPages) + '</ul>';
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
        // Portal-aware: searches both in-list items and dropmenu items
        // (whether the menu is nested or currently portaled to <body>).
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

    // Refresh auto-pagination for a specific content container (used by filters).
    // Resets to page 1 over the visible (non-[data-filtered]) subset.
    function refreshAutoPagination(contentContainer) {
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
        const prevActive = allPageElements.find(el => el.ariaCurrent === 'page');
        const previousPage = prevActive ? pageNumberOf(prevActive) : null;
        setActivePage(pagination, targetPageNum);
        const { min, max } = pageBounds(allPageElements);
        updatePrevNextStates(pagination, targetPageNum, min, max);
        scrollToContent(pagination);
        _dispatchPageChange(pagination, targetPageNum, previousPage, max);
    }

    // Global click handler for manual pagination (not auto-pagination). Wired
    // once, at init. Module-lifetime — pagination has no teardown, so a plain
    // listener (no AbortController) is correct here.
    function _wireManualClicks() {
        if (_manualWired) return;
        _manualWired = true;
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
                // Confirm the target exists (in-list or in the portaled dropdown).
                if (!allPageElements.some(el => pageNumberOf(el) === targetPageNum)) return;
                _applyManualPageChange(pagination, targetPageNum, allPageElements);
                return;
            }

            const clickedPageNum = pageNumberOf(clickedElement);
            if (isNaN(clickedPageNum)) return;
            _applyManualPageChange(pagination, clickedPageNum, allPageElements);
        });
    }

    // Expose global API for unified init system
    NDS.Pagination = {
        init: () => { _wireManualClicks(); initializePagination(); },
        reinit: () => { _wireManualClicks(); initializePagination(); initializeAutoPagination(); },
        initAuto: initializeAutoPagination,
        create: (container) => new NDSPagination(container),
        refresh: (container) => refreshAutoPagination(container),
        setPage: function(container, pageNumber) {
            const pagination = container.querySelector('.nds-pagination-list') || container;
            const { min, max } = pageBounds(getAllPageElements(pagination));
            if (!Number.isFinite(min)) return;
            setActivePage(pagination, pageNumber);
            updatePrevNextStates(pagination, pageNumber, min, max);
        },
    };

    // Note: Initialization now handled by nds-loader.js unified system
})();
