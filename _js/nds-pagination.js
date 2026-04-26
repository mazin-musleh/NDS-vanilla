/**
 * NDS Pagination Component
 * Automatically collapses pagination with 5+ pages into dropdown menu
 *
 * Display pattern: [Prev] 1 2 3 ... [Last] [Next]
 * - Always shows first 3 pages and last page
 * - All middle pages (4 to second-to-last) grouped in dropdown menu (...)
 *
 * Supports both <button> and <a> elements for pagination items
 * - Buttons use disabled attribute for prev/next
 * - Anchors use aria-disabled and .disabled class for prev/next
 */

(function() {
    'use strict';

    // One-shot guard for the auto-pagination DOM-removal listener.
    let _autoCleanupReady = false;

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
            if (dropmenuElement && NDS.Dropmenu) {
                NDS.Dropmenu.create(dropmenuElement);
            }

            // If active page is inside the dropdown, activate the ellipsis trigger
            const activeDropdownItem = dropdownContainer.querySelector('.nds-dropmenu-item[aria-current="page"], .nds-dropmenu-item[data-state~="active"]');
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

            // Create nds-dropmenu structure. `data-portal-scope` survives the
            // menu's portal-to-<body> move by mirroring the parent context as
            // a class on the menu — see `.nds-dropmenu-menu.nds-pagination-ellipsis`
            // selectors in `_pagination.scss`.
            const dropmenu = document.createElement('div');
            dropmenu.className = 'nds-dropmenu';
            dropmenu.dataset.portalScope = 'nds-pagination-ellipsis';

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'nds-btn nds-subtle nds-ellipsis nds-indicator nds-dropmenu-trigger';
            button.innerHTML = '<span class="nds-label"></span>';
            button.setAttribute('aria-label', 'More pages');

            const menu = document.createElement('div');
            menu.className = 'nds-dropmenu-menu';
            menu.setAttribute('aria-hidden', 'true');

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
                    menuItem.setAttribute('aria-label', element.getAttribute('aria-label') || `Page ${element.textContent}`);

                    // Preserve active state and aria-current from original element
                    if (NDS.State.has(element, 'active')) {
                        NDS.State.set(menuItem, 'active');
                    }
                    if (element.hasAttribute('aria-current')) {
                        menuItem.setAttribute('aria-current', element.getAttribute('aria-current'));
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
                }

                const paginationInstance = new NDSPagination(container);
                container.ndsPagination = paginationInstance;
                container.setAttribute('data-nds-pagination-initialized', 'true');

                // Initialize button states after pagination is ready
                initializePaginationStates(container);
            }
        });
    }

    // Collect dropmenu items associated with a pagination, including those
    // in menus currently portaled to <body> (resolved via the wrapper's
    // `_ownerMenu` backref through NDS.Dropmenu.menuOf).
    function getPaginationDropmenuItems(pagination) {
        const items = [];
        pagination.querySelectorAll('.nds-dropmenu').forEach(dm => {
            const menu = NDS.Dropmenu?.menuOf?.(dm) || dm.querySelector('.nds-dropmenu-menu');
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

    // Shared function to set active page and aria-current
    function setActivePage(pagination, pageNumber) {
        const dropmenuItems = getPaginationDropmenuItems(pagination);

        // Remove active from all items (including dropdown items and ellipsis trigger)
        const inListClickables = pagination.querySelectorAll('.nds-pagination-item button, .nds-pagination-item a, .nds-dropmenu-trigger');
        [...inListClickables, ...dropmenuItems].forEach(el => {
            NDS.State.clear(el);
            el.removeAttribute('aria-current');
        });

        // Reset all ellipsis triggers (icon is CSS ::after, just clear page number)
        pagination.querySelectorAll('.nds-ellipsis .nds-label').forEach(label => {
            label.textContent = '';
        });

        // Find and activate the target page element
        let activeInDropdown = false;
        let ellipsisTrigger = null;

        const inListPages = pagination.querySelectorAll('.nds-pagination-item button, .nds-pagination-item a');
        [...inListPages, ...dropmenuItems].forEach(element => {
            const elementPageNumber = parseInt(element.querySelector('.nds-label')?.textContent || element.textContent);
            if (elementPageNumber === pageNumber) {
                NDS.State.set(element, 'active');
                element.setAttribute('aria-current', 'page');

                // Check if this element is inside a dropdown
                if (element.classList.contains('nds-dropmenu-item')) {
                    activeInDropdown = true;
                    const dropdown = NDS.Dropmenu?.from(element);
                    ellipsisTrigger = dropdown?.querySelector('.nds-dropmenu-trigger');
                }
            }
        });

        // Add active to ellipsis button and show active page number if active page is inside dropdown
        if (activeInDropdown && ellipsisTrigger) {
            NDS.State.set(ellipsisTrigger, 'active');
            const ellipsisLabel = ellipsisTrigger.querySelector('.nds-label');
            if (ellipsisLabel) {
                ellipsisLabel.textContent = pageNumber;
            }
        }
    }

    // Shared function to update prev/next button states
    function updatePrevNextStates(pagination, currentPageNum, minPage, maxPage) {
        const prevBtn = pagination.querySelector('.nds-pagination-prev button, .nds-pagination-prev a');
        const nextBtn = pagination.querySelector('.nds-pagination-next button, .nds-pagination-next a');

        if (prevBtn) {
            if (prevBtn.tagName.toLowerCase() === 'button') {
                prevBtn.disabled = currentPageNum === minPage;
            } else {
                if (currentPageNum === minPage) {
                    prevBtn.setAttribute('aria-disabled', 'true');
                    NDS.State.add(prevBtn, 'disabled');
                } else {
                    prevBtn.removeAttribute('aria-disabled');
                    NDS.State.remove(prevBtn, 'disabled');
                }
            }
        }

        if (nextBtn) {
            if (nextBtn.tagName.toLowerCase() === 'button') {
                nextBtn.disabled = currentPageNum === maxPage;
            } else {
                if (currentPageNum === maxPage) {
                    nextBtn.setAttribute('aria-disabled', 'true');
                    NDS.State.add(nextBtn, 'disabled');
                } else {
                    nextBtn.removeAttribute('aria-disabled');
                    NDS.State.remove(nextBtn, 'disabled');
                }
            }
        }
    }

    // Initialize prev/next button states based on active page
    function initializePaginationStates(paginationNav) {
        const pagination = paginationNav.querySelector('.nds-pagination-list') || paginationNav;

        // Get all page elements and numbers (portal-aware)
        const allPageElements = getAllPageElements(pagination);
        if (allPageElements.length === 0) return;

        const pageNumbers = allPageElements.map(el => parseInt(el.querySelector('.nds-label')?.textContent || el.textContent)).filter(n => !isNaN(n));
        if (pageNumbers.length === 0) return;

        const minPage = Math.min(...pageNumbers);
        const maxPage = Math.max(...pageNumbers);

        // Find the active page (portal-aware)
        const activePage = allPageElements.find(el => el.getAttribute('aria-current') === 'page');

        // Get current page number (or default to first page if none active)
        let currentPageNum;
        if (activePage) {
            currentPageNum = parseInt(activePage.querySelector('.nds-label')?.textContent || activePage.textContent);
        } else {
            currentPageNum = minPage;
        }

        if (isNaN(currentPageNum)) return;

        // Always call setActivePage to ensure ellipsis trigger gets active class if needed
        setActivePage(pagination, currentPageNum);
        updatePrevNextStates(pagination, currentPageNum, minPage, maxPage);
    }

    // Auto-Pagination Generator for content-based pagination
    function initializeAutoPagination() {
        // Release pooled ResizeObserver subscriptions when paged-content
        // containers leave the DOM. Wired once for the page; idempotent.
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

        const autoPaginationContainers = document.querySelectorAll('.nds-pagination[data-auto-pagination]');

        autoPaginationContainers.forEach(paginationNav => {
            // Skip if already initialized or inside code examples
            if (paginationNav.hasAttribute('data-nds-auto-pagination-initialized') ||
                paginationNav.closest('code, .code-example')) {
                return;
            }

            // Find the content container (previous sibling)
            const contentContainer = paginationNav.previousElementSibling;
            if (!contentContainer || !contentContainer.classList.contains('nds-paged-content')) {
                return;
            }

            // Get items
            const items = Array.from(contentContainer.querySelectorAll('.nds-page-item'));

            // Remove hidden from container (developer adds hidden to prevent FOUC)
            contentContainer.hidden = false;

            // Store last perPage to detect changes
            let lastPerPage = parseInt(getComputedStyle(contentContainer).getPropertyValue('--per-page')) || 5;

            // Function to update pagination based on current --per-page
            function updatePagination() {
                const perPage = parseInt(getComputedStyle(contentContainer).getPropertyValue('--per-page')) || 5;
                const totalPages = Math.ceil(items.length / perPage);

                // Store current page before regenerating
                const pagination = paginationNav.querySelector('.nds-pagination-list');
                const currentPage = pagination ? getCurrentPage(pagination) : 1;

                // If no pagination needed, show all items
                if (totalPages <= 1) {
                    items.forEach(item => item.hidden = false);
                    paginationNav.innerHTML = '';
                    return;
                }

                // Calculate which page the current page should map to with new perPage
                // Keep user on approximately the same content position
                const newCurrentPage = Math.min(currentPage, totalPages);

                // Generate pagination HTML
                const paginationHTML = generatePaginationHTML(totalPages, newCurrentPage);
                paginationNav.innerHTML = paginationHTML;

                // Show current page items
                showPage(items, newCurrentPage, perPage);

                // Initialize pagination component
                new NDSPagination(paginationNav);

                // Store perPage for click handler closure
                const finalPerPage = perPage;
                const finalTotalPages = totalPages;

                // Add click handlers
                const newPagination = paginationNav.querySelector('.nds-pagination-list');
                newPagination.addEventListener('click', (e) => {
                    // Portaled dropmenu items reach this listener via the
                    // wrapper's re-dispatched click (see nds-dropmenu.js).
                    const pageElement = e.ndsDropmenuItem
                        || e.target.closest('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a, .nds-dropmenu-item');

                    if (pageElement) {
                        // Prevent default for anchors in auto-pagination
                        if (pageElement.tagName.toLowerCase() === 'a') {
                            e.preventDefault();
                        }

                        const pageNumber = parseInt(pageElement.querySelector('.nds-label')?.textContent || pageElement.textContent);
                        if (pageNumber) {
                            goToPage(newPagination, items, pageNumber, finalPerPage, finalTotalPages);
                        }
                    } else {
                        // Handle prev/next (support both buttons and anchors)
                        const prevElement = e.target.closest('.nds-pagination-prev button, .nds-pagination-prev a');
                        const nextElement = e.target.closest('.nds-pagination-next button, .nds-pagination-next a');
                        const currentPage = getCurrentPage(newPagination);

                        if (prevElement) {
                            e.preventDefault();
                            if (currentPage > 1) {
                                goToPage(newPagination, items, currentPage - 1, finalPerPage, finalTotalPages);
                            }
                        } else if (nextElement) {
                            e.preventDefault();
                            if (currentPage < finalTotalPages) {
                                goToPage(newPagination, items, currentPage + 1, finalPerPage, finalTotalPages);
                            }
                        }
                    }
                });
            }

            // Initial pagination setup
            updatePagination();

            // Watch for --per-page changes on resize. Stored handle lets the
            // module-level `.nds-paged-content` removal listener release the
            // pooled ResizeObserver entry when this container leaves the DOM.
            contentContainer._offResize = NDS.onElementResize(contentContainer, NDS.debounce(() => {
                const currentPerPage = parseInt(getComputedStyle(contentContainer).getPropertyValue('--per-page')) || 5;
                if (currentPerPage !== lastPerPage) {
                    lastPerPage = currentPerPage;
                    updatePagination();
                }
            }, 150));

            paginationNav.setAttribute('data-nds-auto-pagination-initialized', 'true');
        });
    }

    function generatePaginationHTML(totalPages, activePage = 1) {
        // Ensure activePage is within valid range
        activePage = Math.max(1, Math.min(activePage, totalPages));

        let html = '<ul class="nds-pagination-list">';

        // Prev button
        const prevDisabled = activePage === 1 ? ' disabled' : '';
        html += `
            <li class="nds-pagination-item nds-pagination-prev">
                <button type="button" class="nds-btn nds-subtle" aria-label="Previous page"${prevDisabled}>
                    <i class="nds-icon nds-hgi-arrow-right-01" aria-hidden="true"></i>
                </button>
            </li>`;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const activeAttr = i === activePage ? ' data-state="active"' : '';
            const ariaCurrent = i === activePage ? ' aria-current="page"' : '';
            html += `
            <li class="nds-pagination-item page_${i}">
                <button type="button" class="nds-btn nds-subtle nds-indicator"${activeAttr}${ariaCurrent} aria-label="Page ${i}">
                    <span class="nds-label">${i}</span>
                </button>
            </li>`;
        }

        // Next button
        const nextDisabled = activePage === totalPages ? ' disabled' : '';
        html += `
            <li class="nds-pagination-item nds-pagination-next">
                <button type="button" class="nds-btn nds-subtle" aria-label="Next page"${nextDisabled}>
                    <i class="nds-icon nds-hgi-arrow-left-01" aria-hidden="true"></i>
                </button>
            </li>
        </ul>`;

        return html;
    }

    function showPage(items, pageNumber, perPage) {
        const start = (pageNumber - 1) * perPage;
        const end = start + perPage;

        items.forEach((item, index) => {
            if (index >= start && index < end) {
                item.hidden = false;
            } else {
                item.hidden = true;
            }
        });
    }

    function getCurrentPage(pagination) {
        // Portal-aware: searches both in-list items and dropmenu items
        // (whether the menu is nested or currently portaled to <body>).
        const active = getAllPageElements(pagination).find(el => el.getAttribute('aria-current') === 'page');
        if (active) {
            return parseInt(active.querySelector('.nds-label')?.textContent || active.textContent) || 1;
        }
        return 1;
    }

    // Helper function to scroll to the top of the content list
    function scrollToContent(pagination) {
        const nav = document.querySelector('.nds-main-nav');
        const navHeight = nav ? nav.offsetHeight : 72;

        const paginationNav = pagination.closest('.nds-pagination');
        if (!paginationNav) return;

        const contentContainer = paginationNav.previousElementSibling;
        const targetElement = (contentContainer && contentContainer.classList.contains('nds-paged-content'))
            ? contentContainer
            : paginationNav;

        // Only scroll if the top of the content is above the viewport
        const targetTop = targetElement.getBoundingClientRect().top;
        if (targetTop < navHeight) {
            const scrollPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
            window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        }
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

    // Global click handler for manual pagination (not auto-pagination)
    const _paginationGlobalAC = new AbortController();
    document.addEventListener('click', (e) => {
        // Portaled dropmenu items don't bubble through .nds-pagination-list;
        // nds-dropmenu re-dispatches a synthetic click on the wrapper carrying
        // `e.ndsDropmenuItem` so we can resolve the original item here.
        const portaledItem = e.ndsDropmenuItem
            && e.target.closest?.('.nds-pagination-list')
            ? e.ndsDropmenuItem
            : null;

        const pageElement = e.target.closest('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a');
        const dropdownItem = portaledItem || e.target.closest('.nds-pagination-list .nds-dropmenu-item');
        const prevElement = e.target.closest('.nds-pagination-prev button, .nds-pagination-prev a');
        const nextElement = e.target.closest('.nds-pagination-next button, .nds-pagination-next a');

        const clickedElement = pageElement || dropdownItem;

        // If neither page element nor prev/next clicked, return
        if (!clickedElement && !prevElement && !nextElement) return;

        // Find the pagination container — for portaled dropmenu items, walk
        // through the wrapper (which is `e.target` of the re-dispatched click).
        const pagination = portaledItem
            ? e.target.closest('.nds-pagination-list')
            : (clickedElement || prevElement || nextElement).closest('.nds-pagination-list');
        if (!pagination) return;

        // Skip if this is an auto-pagination (handled by its own listener)
        const paginationNav = pagination.closest('.nds-pagination');
        if (paginationNav && paginationNav.hasAttribute('data-nds-auto-pagination-initialized')) {
            return;
        }

        // Handle prev/next clicks
        if (prevElement || nextElement) {
            const allPageElements = getAllPageElements(pagination);
            const currentActive = allPageElements.find(el => el.getAttribute('aria-current') === 'page');
            if (!currentActive) return;

            const currentPageNum = parseInt(currentActive.querySelector('.nds-label')?.textContent || currentActive.textContent);
            if (isNaN(currentPageNum)) return;

            const targetPageNum = prevElement ? currentPageNum - 1 : currentPageNum + 1;

            // Find the target page element (portal-aware)
            const targetElement = allPageElements.find(el => {
                const pageNum = parseInt(el.querySelector('.nds-label')?.textContent || el.textContent);
                return pageNum === targetPageNum;
            });

            if (!targetElement) return;

            // Set active page with aria-current
            setActivePage(pagination, targetPageNum);

            // Update prev/next button states
            const pageNumbers = allPageElements.map(el => parseInt(el.querySelector('.nds-label')?.textContent || el.textContent)).filter(n => !isNaN(n));
            const minPage = Math.min(...pageNumbers);
            const maxPage = Math.max(...pageNumbers);

            updatePrevNextStates(pagination, targetPageNum, minPage, maxPage);

            // Scroll to top of content
            scrollToContent(pagination);

            return;
        }

        // Handle direct page clicks
        if (clickedElement) {
            const clickedPageNum = parseInt(clickedElement.querySelector('.nds-label')?.textContent || clickedElement.textContent);
            if (!isNaN(clickedPageNum)) {
                // Set active page with aria-current
                setActivePage(pagination, clickedPageNum);

                // Update prev/next button states (portal-aware)
                const allPageElements = getAllPageElements(pagination);
                const pageNumbers = allPageElements.map(el => parseInt(el.querySelector('.nds-label')?.textContent || el.textContent)).filter(n => !isNaN(n));
                const minPage = Math.min(...pageNumbers);
                const maxPage = Math.max(...pageNumbers);

                updatePrevNextStates(pagination, clickedPageNum, minPage, maxPage);

                // Scroll to top of content
                scrollToContent(pagination);
            }
        }
    }, { signal: _paginationGlobalAC.signal });

    // Refresh auto-pagination for a specific content container (used by filters)
    function refreshAutoPagination(contentContainer) {
        if (!contentContainer) return;

        // Find the pagination nav associated with this content container
        const paginationNav = contentContainer.parentElement?.querySelector('.nds-pagination[data-auto-pagination]');
        if (!paginationNav) return;

        // Get only visible (non-filtered) items
        const allItems = Array.from(contentContainer.querySelectorAll('.nds-page-item'));
        const visibleItems = allItems.filter(item => !item.hasAttribute('data-filtered') && !item.classList.contains('nds-filtered-out'));

        const perPage = parseInt(getComputedStyle(contentContainer).getPropertyValue('--per-page')) || 5;
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

        // Generate pagination HTML
        const paginationHTML = generatePaginationHTML(totalPages, 1);
        paginationNav.innerHTML = paginationHTML;

        // Show first page items
        showPageFiltered(visibleItems, 1, perPage);

        // Initialize pagination component
        new NDSPagination(paginationNav);

        // Store for click handler closure
        const finalPerPage = perPage;
        const finalTotalPages = totalPages;

        // Add click handlers
        const newPagination = paginationNav.querySelector('.nds-pagination-list');
        newPagination.addEventListener('click', (e) => {
            // Re-get visible items in case filter changed
            const currentVisibleItems = Array.from(contentContainer.querySelectorAll('.nds-page-item'))
                .filter(item => !item.hasAttribute('data-filtered') && !item.classList.contains('nds-filtered-out'));

            // Portaled dropmenu items arrive via the wrapper's re-dispatch.
            const pageElement = e.ndsDropmenuItem
                || e.target.closest('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a, .nds-dropmenu-item');

            if (pageElement) {
                if (pageElement.tagName.toLowerCase() === 'a') {
                    e.preventDefault();
                }

                const pageNumber = parseInt(pageElement.querySelector('.nds-label')?.textContent || pageElement.textContent);
                if (pageNumber) {
                    goToPageFiltered(newPagination, currentVisibleItems, pageNumber, finalPerPage, finalTotalPages);
                }
            } else {
                const prevElement = e.target.closest('.nds-pagination-prev button, .nds-pagination-prev a');
                const nextElement = e.target.closest('.nds-pagination-next button, .nds-pagination-next a');
                const currentPage = getCurrentPage(newPagination);

                if (prevElement) {
                    e.preventDefault();
                    if (currentPage > 1) {
                        goToPageFiltered(newPagination, currentVisibleItems, currentPage - 1, finalPerPage, finalTotalPages);
                    }
                } else if (nextElement) {
                    e.preventDefault();
                    if (currentPage < finalTotalPages) {
                        goToPageFiltered(newPagination, currentVisibleItems, currentPage + 1, finalPerPage, finalTotalPages);
                    }
                }
            }
        });
    }

    function showPageFiltered(visibleItems, pageNumber, perPage) {
        const start = (pageNumber - 1) * perPage;
        const end = start + perPage;

        visibleItems.forEach((item, index) => {
            if (index >= start && index < end) {
                item.hidden = false;
            } else {
                item.hidden = true;
            }
        });
    }

    function goToPageFiltered(pagination, visibleItems, pageNumber, perPage, totalPages) {
        setActivePage(pagination, pageNumber);
        updatePrevNextStates(pagination, pageNumber, 1, totalPages);
        showPageFiltered(visibleItems, pageNumber, perPage);

        // Scroll to top of content
        scrollToContent(pagination);
    }

    // Expose global API for unified init system
    if (typeof window !== 'undefined') {
        NDS.Pagination = {
            init: initializePagination,
            initAuto: initializeAutoPagination,
            create: (container) => new NDSPagination(container),
            refresh: refreshAutoPagination,
            setPage: function(container, pageNumber) {
                const pagination = container.querySelector('.nds-pagination-list') || container;
                const allPages = getAllPageElements(pagination);
                const pageNumbers = allPages.map(el => parseInt(el.querySelector('.nds-label')?.textContent || el.textContent)).filter(n => !isNaN(n));
                if (pageNumbers.length === 0) return;
                setActivePage(pagination, pageNumber);
                updatePrevNextStates(pagination, pageNumber, Math.min(...pageNumbers), Math.max(...pageNumbers));
            }
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system
})();
