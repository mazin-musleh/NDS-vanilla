/**
 * NDS Pagination Component
 * Automatically collapses pagination with 5+ pages into dropdown menu
 *
 * Display pattern: [Prev] 1 2 3 ... [Last] [Next]
 * - Always shows first 3 pages and last page
 * - All middle pages (4 to second-to-last) grouped in dropdown menu (...)
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
            button.className = 'nds-btn nds-subtle nds-dropmenu-trigger nds-indicator';
            button.textContent = '...';
            button.setAttribute('aria-label', 'More pages');

            const menu = document.createElement('div');
            menu.className = 'nds-dropmenu-menu';
            menu.setAttribute('aria-hidden', 'true');

            // Add hidden items to dropdown menu
            hiddenItems.forEach(item => {
                const btn = item.querySelector('button');
                if (btn) {
                    const menuItem = document.createElement('button');
                    menuItem.className = 'nds-btn nds-subtle nds-dropmenu-item';
                    menuItem.innerHTML = btn.innerHTML;
                    menuItem.setAttribute('aria-label', btn.getAttribute('aria-label') || `Page ${btn.textContent}`);

                    // Copy click handler or page number
                    if (btn.onclick) {
                        menuItem.onclick = btn.onclick;
                    } else {
                        menuItem.onclick = () => {
                            console.log('Navigate to page:', btn.textContent);
                        };
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
        const paginationContainers = document.querySelectorAll('.nds-pagination, nav[aria-label*="agination"]');

        paginationContainers.forEach(container => {
            // Skip elements inside code examples
            if (container.closest('code, .code-example')) {
                return;
            }

            if (!container.hasAttribute('data-nds-pagination-initialized')) {
                const paginationInstance = new NDSPagination(container);
                container.ndsPaginationInstance = paginationInstance;
                container.setAttribute('data-nds-pagination-initialized', 'true');
            }
        });
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
                // Check for page buttons (both in pagination list and dropdown menu)
                const pageBtn = e.target.closest('.nds-pagination-item:not(.nds-pagination-prev):not(.nds-pagination-next) button, .nds-dropmenu-item');

                if (pageBtn) {
                    const pageNumber = parseInt(pageBtn.querySelector('.label')?.textContent || pageBtn.textContent);
                    if (pageNumber) {
                        goToPage(pagination, items, pageNumber, perPage, totalPages);
                    }
                } else {
                    // Handle prev/next
                    const prevBtn = e.target.closest('.nds-pagination-prev button');
                    const nextBtn = e.target.closest('.nds-pagination-next button');
                    const currentPage = getCurrentPage(pagination);

                    if (prevBtn && currentPage > 1) {
                        goToPage(pagination, items, currentPage - 1, perPage, totalPages);
                    } else if (nextBtn && currentPage < totalPages) {
                        goToPage(pagination, items, currentPage + 1, perPage, totalPages);
                    }
                }
            });

            // Initialize pagination component
            new NDSPagination(paginationNav);

            paginationNav.setAttribute('data-nds-auto-pagination-initialized', 'true');
        });
    }

    function generatePaginationHTML(totalPages) {
        let html = '<ul class="nds-pagination">';

        // Prev button
        html += `
            <li class="nds-pagination-item nds-pagination-prev">
                <button class="nds-btn nds-subtle" aria-label="Previous page" disabled>
                    <i class="hgi hgi-stroke hgi-arrow-right-01"></i>
                </button>
            </li>`;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === 1 ? ' active' : '';
            const ariaCurrent = i === 1 ? ' aria-current="page"' : '';
            html += `
            <li class="nds-pagination-item">
                <button class="nds-btn nds-subtle nds-indicator${isActive}"${ariaCurrent} aria-label="Page ${i}">
                    <span class="label">${i}</span>
                </button>
            </li>`;
        }

        // Next button
        const nextDisabled = totalPages === 1 ? ' disabled' : '';
        html += `
            <li class="nds-pagination-item nds-pagination-next">
                <button class="nds-btn nds-subtle" aria-label="Next page"${nextDisabled}>
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
        // Check visible pagination items
        let activeBtn = pagination.querySelector('.nds-pagination-item button[aria-current="page"]');
        if (activeBtn) {
            return parseInt(activeBtn.querySelector('.label')?.textContent) || 1;
        }

        // Check dropdown menu items
        activeBtn = pagination.querySelector('.nds-dropmenu-item[aria-current="page"]');
        if (activeBtn) {
            return parseInt(activeBtn.querySelector('.label')?.textContent || activeBtn.textContent) || 1;
        }

        return 1;
    }

    function goToPage(pagination, items, pageNumber, perPage, totalPages) {
        // Remove active from ALL buttons (visible, dropdown items, and ellipsis triggers)
        pagination.querySelectorAll('button[aria-current="page"], button.active').forEach(btn => {
            btn.classList.remove('active');
            btn.removeAttribute('aria-current');
        });

        // Add active to the button with matching page number
        let activeInDropdown = false;
        let ellipsisTrigger = null;

        pagination.querySelectorAll('.nds-pagination-item button, .nds-dropmenu-item').forEach(btn => {
            const btnPageNumber = parseInt(btn.querySelector('.label')?.textContent || btn.textContent);
            if (btnPageNumber === pageNumber) {
                btn.classList.add('active');
                btn.setAttribute('aria-current', 'page');

                // Check if this button is inside a dropdown
                if (btn.classList.contains('nds-dropmenu-item')) {
                    activeInDropdown = true;
                    const dropdown = btn.closest('.nds-dropmenu');
                    ellipsisTrigger = dropdown?.querySelector('.nds-dropmenu-trigger');
                }
            }
        });

        // Add active to ellipsis button if active page is inside dropdown
        if (activeInDropdown && ellipsisTrigger) {
            ellipsisTrigger.classList.add('active');
        }

        // Update prev/next buttons
        const prevBtn = pagination.querySelector('.nds-pagination-prev button');
        const nextBtn = pagination.querySelector('.nds-pagination-next button');

        if (prevBtn) prevBtn.disabled = pageNumber === 1;
        if (nextBtn) nextBtn.disabled = pageNumber === totalPages;

        // Show page items
        showPage(items, pageNumber, perPage);
    }

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
