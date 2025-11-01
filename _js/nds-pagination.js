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

    class NDSPagination {
        constructor(paginationNav) {
            this.paginationNav = paginationNav;
            this.pagination = paginationNav.querySelector('.nds-pagination') || paginationNav;
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
            if (dropmenuElement && window.NDSDropmenu) {
                window.NDSDropmenu.create(dropmenuElement);
            }
        }

        createDropdown(hiddenItems) {
            const li = document.createElement('li');
            li.className = 'nds-pagination-item nds-pagination-ellipsis';

            // Create nds-dropmenu structure
            const dropmenu = document.createElement('div');
            dropmenu.className = 'nds-dropmenu';

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'nds-btn nds-subtle nds-dropmenu-trigger nds-indicator';
            button.innerHTML = '<span class="label">...</span>';
            button.setAttribute('aria-label', 'More pages');

            const menu = document.createElement('div');
            menu.className = 'nds-dropmenu-menu';
            menu.setAttribute('aria-hidden', 'true');

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
                    if (element.classList.contains('active')) {
                        menuItem.classList.add('active');
                    }
                    if (element.hasAttribute('aria-current')) {
                        menuItem.setAttribute('aria-current', element.getAttribute('aria-current'));
                    }

                    // Copy href for anchors
                    if (isAnchor && element.hasAttribute('href')) {
                        menuItem.setAttribute('href', element.getAttribute('href'));
                    }

                    // Copy click handler or page number for buttons
                    if (!isAnchor) {
                        menuItem.type = 'button';
                        if (element.onclick) {
                            menuItem.onclick = element.onclick;
                        } else {
                            menuItem.onclick = () => {
                                console.log('Navigate to page:', element.textContent);
                            };
                        }
                    }

                    menu.appendChild(menuItem);
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

    // Initialization function (called by nds-init.js)
    function initializePagination() {
        const paginationContainers = document.querySelectorAll('.nds-pagination-nav, .nds-pagination');

        paginationContainers.forEach(container => {
            // Skip elements inside code examples
            if (container.closest('code, .code-example')) {
                return;
            }

            // Skip .nds-pagination elements that are children of .nds-pagination-nav
            // (they will be initialized via their parent container)
            if (container.classList.contains('nds-pagination') && container.closest('.nds-pagination-nav')) {
                return;
            }

            if (!container.hasAttribute('data-nds-pagination-initialized')) {
                // Check if auto-generation is requested via data-total-pages
                const totalPages = parseInt(container.dataset.totalPages);
                const activePage = parseInt(container.dataset.activePage) || 1;

                // Only auto-generate if data-total-pages is set AND container doesn't already have .nds-pagination
                const hasPaginationList = container.classList.contains('nds-pagination') ||
                                         container.querySelector('.nds-pagination');

                if (totalPages && totalPages > 0 && !hasPaginationList) {
                    // Auto-generate pagination HTML
                    const paginationHTML = generatePaginationHTML(totalPages, activePage);
                    container.innerHTML = paginationHTML;
                }

                const paginationInstance = new NDSPagination(container);
                container.ndsPaginationInstance = paginationInstance;
                container.setAttribute('data-nds-pagination-initialized', 'true');

                // Initialize button states after pagination is ready
                initializePaginationStates(container);
            }
        });
    }

    // Shared function to set active page and aria-current
    function setActivePage(pagination, pageNumber) {
        // Remove active from all items (including dropdown items and ellipsis trigger)
        pagination.querySelectorAll('.nds-pagination-item button, .nds-pagination-item a, .nds-dropmenu-item, .nds-dropmenu-trigger').forEach(el => {
            el.classList.remove('active');
            el.removeAttribute('aria-current');
        });

        // Reset all ellipsis triggers back to "..." label
        pagination.querySelectorAll('.nds-dropmenu-trigger .label').forEach(label => {
            label.textContent = '...';
        });

        // Find and activate the target page element
        let activeInDropdown = false;
        let ellipsisTrigger = null;

        pagination.querySelectorAll('.nds-pagination-item button, .nds-pagination-item a, .nds-dropmenu-item').forEach(element => {
            const elementPageNumber = parseInt(element.querySelector('.label')?.textContent || element.textContent);
            if (elementPageNumber === pageNumber) {
                element.classList.add('active');
                element.setAttribute('aria-current', 'page');

                // Check if this element is inside a dropdown
                if (element.classList.contains('nds-dropmenu-item')) {
                    activeInDropdown = true;
                    const dropdown = element.closest('.nds-dropmenu');
                    ellipsisTrigger = dropdown?.querySelector('.nds-dropmenu-trigger');
                }
            }
        });

        // Add active to ellipsis button and show active page number if active page is inside dropdown
        if (activeInDropdown && ellipsisTrigger) {
            ellipsisTrigger.classList.add('active');
            const ellipsisLabel = ellipsisTrigger.querySelector('.label');
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
                    prevBtn.classList.add('disabled');
                } else {
                    prevBtn.removeAttribute('aria-disabled');
                    prevBtn.classList.remove('disabled');
                }
            }
        }

        if (nextBtn) {
            if (nextBtn.tagName.toLowerCase() === 'button') {
                nextBtn.disabled = currentPageNum === maxPage;
            } else {
                if (currentPageNum === maxPage) {
                    nextBtn.setAttribute('aria-disabled', 'true');
                    nextBtn.classList.add('disabled');
                } else {
                    nextBtn.removeAttribute('aria-disabled');
                    nextBtn.classList.remove('disabled');
                }
            }
        }
    }

    // Initialize prev/next button states based on active page
    function initializePaginationStates(paginationNav) {
        const pagination = paginationNav.querySelector('.nds-pagination') || paginationNav;

        // Get all page elements and numbers
        const allPageElements = Array.from(pagination.querySelectorAll('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a, .nds-dropmenu-item'));
        if (allPageElements.length === 0) return;

        const pageNumbers = allPageElements.map(el => parseInt(el.querySelector('.label')?.textContent || el.textContent)).filter(n => !isNaN(n));
        if (pageNumbers.length === 0) return;

        const minPage = Math.min(...pageNumbers);
        const maxPage = Math.max(...pageNumbers);

        // Find the active page
        const activePage = pagination.querySelector('.nds-pagination-item button[aria-current="page"], .nds-pagination-item a[aria-current="page"], .nds-dropmenu-item[aria-current="page"]');

        // Get current page number (or default to first page if none active)
        let currentPageNum;
        if (activePage) {
            currentPageNum = parseInt(activePage.querySelector('.label')?.textContent || activePage.textContent);
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
        const autoPaginationContainers = document.querySelectorAll('.nds-auto-pagination');

        autoPaginationContainers.forEach(paginationNav => {
            // Skip if already initialized or inside code examples
            if (paginationNav.hasAttribute('data-nds-auto-pagination-initialized') ||
                paginationNav.closest('code, .code-example')) {
                return;
            }

            // Find the content container (previous sibling)
            const contentContainer = paginationNav.previousElementSibling;
            if (!contentContainer || !contentContainer.classList.contains('nds-pagination-content')) {
                return;
            }

            // Get items and per-page value
            const items = Array.from(contentContainer.querySelectorAll('.pagination-item'));
            const perPage = parseInt(getComputedStyle(contentContainer).getPropertyValue('--per-page')) || 5;
            const totalPages = Math.ceil(items.length / perPage);

            // If no pagination needed, still show all items as active
            if (totalPages <= 1) {
                items.forEach(item => item.classList.add('active'));
                return;
            }

            // Generate pagination HTML
            const paginationHTML = generatePaginationHTML(totalPages);
            paginationNav.innerHTML = paginationHTML;

            // Show first page items
            showPage(items, 1, perPage);

            // Add click handlers
            const pagination = paginationNav.querySelector('.nds-pagination');
            pagination.addEventListener('click', (e) => {
                // Check for page buttons/links (both in pagination list and dropdown menu)
                const pageElement = e.target.closest('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a, .nds-dropmenu-item');

                if (pageElement) {
                    // Prevent default for anchors in auto-pagination
                    if (pageElement.tagName.toLowerCase() === 'a') {
                        e.preventDefault();
                    }

                    const pageNumber = parseInt(pageElement.querySelector('.label')?.textContent || pageElement.textContent);
                    if (pageNumber) {
                        goToPage(pagination, items, pageNumber, perPage, totalPages);
                    }
                } else {
                    // Handle prev/next (support both buttons and anchors)
                    const prevElement = e.target.closest('.nds-pagination-prev button, .nds-pagination-prev a');
                    const nextElement = e.target.closest('.nds-pagination-next button, .nds-pagination-next a');
                    const currentPage = getCurrentPage(pagination);

                    if (prevElement) {
                        e.preventDefault();
                        if (currentPage > 1) {
                            goToPage(pagination, items, currentPage - 1, perPage, totalPages);
                        }
                    } else if (nextElement) {
                        e.preventDefault();
                        if (currentPage < totalPages) {
                            goToPage(pagination, items, currentPage + 1, perPage, totalPages);
                        }
                    }
                }
            });

            // Initialize pagination component
            new NDSPagination(paginationNav);

            paginationNav.setAttribute('data-nds-auto-pagination-initialized', 'true');
        });
    }

    function generatePaginationHTML(totalPages, activePage = 1) {
        // Ensure activePage is within valid range
        activePage = Math.max(1, Math.min(activePage, totalPages));

        let html = '<ul class="nds-pagination">';

        // Prev button
        const prevDisabled = activePage === 1 ? ' disabled' : '';
        html += `
            <li class="nds-pagination-item nds-pagination-prev">
                <button type="button" class="nds-btn nds-subtle" aria-label="Previous page"${prevDisabled}>
                    <i class="hgi hgi-stroke hgi-arrow-right-01"></i>
                </button>
            </li>`;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === activePage ? ' active' : '';
            const ariaCurrent = i === activePage ? ' aria-current="page"' : '';
            html += `
            <li class="nds-pagination-item page_${i}">
                <button type="button" class="nds-btn nds-subtle nds-indicator${isActive}"${ariaCurrent} aria-label="Page ${i}">
                    <span class="label">${i}</span>
                </button>
            </li>`;
        }

        // Next button
        const nextDisabled = activePage === totalPages ? ' disabled' : '';
        html += `
            <li class="nds-pagination-item nds-pagination-next">
                <button type="button" class="nds-btn nds-subtle" aria-label="Next page"${nextDisabled}>
                    <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
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
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function getCurrentPage(pagination) {
        // Check visible pagination items (both buttons and anchors)
        let activeElement = pagination.querySelector('.nds-pagination-item button[aria-current="page"], .nds-pagination-item a[aria-current="page"]');
        if (activeElement) {
            return parseInt(activeElement.querySelector('.label')?.textContent) || 1;
        }

        // Check dropdown menu items
        activeElement = pagination.querySelector('.nds-dropmenu-item[aria-current="page"]');
        if (activeElement) {
            return parseInt(activeElement.querySelector('.label')?.textContent || activeElement.textContent) || 1;
        }

        return 1;
    }

    function goToPage(pagination, items, pageNumber, perPage, totalPages) {
        // Set active page with aria-current
        setActivePage(pagination, pageNumber);

        // Update prev/next button states
        updatePrevNextStates(pagination, pageNumber, 1, totalPages);

        // Show page items
        showPage(items, pageNumber, perPage);
    }

    // Global click handler for manual pagination (not auto-pagination)
    document.addEventListener('click', (e) => {
        // Check if click is on a pagination item or dropdown menu item
        const pageElement = e.target.closest('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a');
        const dropdownItem = e.target.closest('.nds-pagination .nds-dropmenu-item');
        const prevElement = e.target.closest('.nds-pagination-prev button, .nds-pagination-prev a');
        const nextElement = e.target.closest('.nds-pagination-next button, .nds-pagination-next a');

        const clickedElement = pageElement || dropdownItem;

        // If neither page element nor prev/next clicked, return
        if (!clickedElement && !prevElement && !nextElement) return;

        // Find the pagination container
        const pagination = (clickedElement || prevElement || nextElement).closest('.nds-pagination');
        if (!pagination) return;

        // Skip if this is an auto-pagination (already handled)
        const paginationNav = pagination.closest('.nds-pagination-nav, nds-pagination-nav');
        if (paginationNav && paginationNav.hasAttribute('data-nds-auto-pagination-initialized')) {
            return;
        }

        // Handle prev/next clicks
        if (prevElement || nextElement) {
            const currentActive = pagination.querySelector('.nds-pagination-item button[aria-current="page"], .nds-pagination-item a[aria-current="page"], .nds-dropmenu-item[aria-current="page"]');
            if (!currentActive) return;

            const currentPageNum = parseInt(currentActive.querySelector('.label')?.textContent || currentActive.textContent);
            if (isNaN(currentPageNum)) return;

            const targetPageNum = prevElement ? currentPageNum - 1 : currentPageNum + 1;

            // Find the target page element
            let targetElement = null;
            pagination.querySelectorAll('.nds-pagination-item button, .nds-pagination-item a, .nds-dropmenu-item').forEach(el => {
                const pageNum = parseInt(el.querySelector('.label')?.textContent || el.textContent);
                if (pageNum === targetPageNum) {
                    targetElement = el;
                }
            });

            if (!targetElement) return;

            // Set active page with aria-current
            setActivePage(pagination, targetPageNum);

            // Update prev/next button states
            const allPageElements = Array.from(pagination.querySelectorAll('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a, .nds-dropmenu-item'));
            const pageNumbers = allPageElements.map(el => parseInt(el.querySelector('.label')?.textContent || el.textContent)).filter(n => !isNaN(n));
            const minPage = Math.min(...pageNumbers);
            const maxPage = Math.max(...pageNumbers);

            updatePrevNextStates(pagination, targetPageNum, minPage, maxPage);

            return;
        }

        // Handle direct page clicks
        if (clickedElement) {
            const clickedPageNum = parseInt(clickedElement.querySelector('.label')?.textContent || clickedElement.textContent);
            if (!isNaN(clickedPageNum)) {
                // Set active page with aria-current
                setActivePage(pagination, clickedPageNum);

                // Update prev/next button states
                const allPageElements = Array.from(pagination.querySelectorAll('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) a, .nds-dropmenu-item'));
                const pageNumbers = allPageElements.map(el => parseInt(el.querySelector('.label')?.textContent || el.textContent)).filter(n => !isNaN(n));
                const minPage = Math.min(...pageNumbers);
                const maxPage = Math.max(...pageNumbers);

                updatePrevNextStates(pagination, clickedPageNum, minPage, maxPage);
            }
        }
    });

    // Expose global API for unified init system
    if (typeof window !== 'undefined') {
        window.NDSPagination = {
            init: initializePagination,
            initAuto: initializeAutoPagination,
            create: (container) => new NDSPagination(container)
        };
    }

    // Note: Initialization now handled by nds-init.js unified system
})();
