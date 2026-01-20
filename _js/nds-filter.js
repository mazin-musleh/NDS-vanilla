/**
 * NDS Filter Component
 * Filtration system for filtering card items based on search, tags, and other criteria
 *
 * Usage:
 * - Add .nds-filter with data-filter-target="targetContainerId" to filter container
 * - Add data-filter="search" to search input containers (searches .nds-card-text)
 * - Add data-filter="tags" to tag filter containers (filters .nds-card-tags)
 * - Future: data-filter="rating", data-filter="price", etc.
 */

(function() {
    'use strict';

    class NDSFilter {
        constructor(filterContainer) {
            this.filterContainer = filterContainer;
            this.targetId = filterContainer.getAttribute('data-filter-target');
            this.targetContainer = document.getElementById(this.targetId);

            if (!this.targetContainer) {
                console.warn(`NDS Filter: Target container #${this.targetId} not found`);
                return;
            }

            // Get all filterable items
            this.items = Array.from(this.targetContainer.querySelectorAll('.nds-card'));

            if (this.items.length === 0) {
                console.warn('NDS Filter: No .nds-card items found in target container');
                return;
            }

            // Filter criteria storage
            this.criteria = {
                search: '',
                tags: []
            };

            // Debounce timer for search
            this.searchDebounceTimer = null;

            this.init();
        }

        init() {
            this.setupFilterElements();
            this.setupResetButton();
            this.setupActionButtons();
        }

        setupActionButtons() {
            // Find all action buttons with data-filter-action attribute
            const actionButtons = this.filterContainer.querySelectorAll('[data-filter-action]');

            actionButtons.forEach(button => {
                const action = button.getAttribute('data-filter-action');

                switch (action) {
                    case 'clear':
                    case 'reset':
                        button.addEventListener('click', (e) => {
                            e.preventDefault();
                            this.reset();
                        });
                        break;
                }
            });
        }

        setupFilterElements() {
            // Find all filter elements within the filter container
            const filterElements = this.filterContainer.querySelectorAll('[data-filter]');

            filterElements.forEach(element => {
                const filterType = element.getAttribute('data-filter');

                switch (filterType) {
                    case 'search':
                        this.setupSearchFilter(element);
                        break;
                    case 'tags':
                        this.setupTagsFilter(element);
                        break;
                    // Future filter types can be added here
                    // case 'rating':
                    //     this.setupRatingFilter(element);
                    //     break;
                    // case 'price':
                    //     this.setupPriceFilter(element);
                    //     break;
                    default:
                        console.warn(`NDS Filter: Unknown filter type "${filterType}"`);
                }
            });
        }

        // ==============================================
        // SEARCH FILTER
        // ==============================================

        setupSearchFilter(element) {
            const searchInput = element.querySelector('input[type="text"], input[type="search"], .nds-search-input');

            if (!searchInput) {
                console.warn('NDS Filter: No search input found in search filter element');
                return;
            }

            // Store reference
            this.searchInput = searchInput;

            // Clear button functionality
            const clearBtn = element.querySelector('.clear, [aria-label*="مسح"], [aria-label*="clear"]');
            this.clearBtn = clearBtn;

            // Input event with debounce
            searchInput.addEventListener('input', (e) => {
                clearTimeout(this.searchDebounceTimer);
                clearTimeout(this.loadingTimer);

                this.searchDebounceTimer = setTimeout(() => {
                    // Show loading state on clear button after 300ms debounce
                    if (clearBtn) clearBtn.classList.add('nds-loading');

                    this.criteria.search = e.target.value.trim().toLowerCase();
                    this.applyFilters();

                    // Remove clear button loading state 500ms after filter complete
                    this.loadingTimer = setTimeout(() => {
                        if (clearBtn) clearBtn.classList.remove('nds-loading');
                    }, 500);
                }, 300);
            });

            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    searchInput.value = '';
                    this.criteria.search = '';
                    this.applyFilters();
                    this.updateClearButtonVisibility(searchInput, clearBtn);
                    clearBtn.classList.remove('nds-loading');
                });

                // Show/hide clear button based on input
                searchInput.addEventListener('input', () => {
                    this.updateClearButtonVisibility(searchInput, clearBtn);
                });
            }
        }

        updateClearButtonVisibility(input, clearBtn) {
            if (input.value.trim()) {
                clearBtn.classList.remove('hidden');
            } else {
                clearBtn.classList.add('hidden');
            }
        }

        // ==============================================
        // TAGS FILTER
        // ==============================================

        setupTagsFilter(element) {
            const checkboxes = element.querySelectorAll('input[type="checkbox"]');

            if (checkboxes.length === 0) {
                console.warn('NDS Filter: No checkboxes found in tags filter element');
                return;
            }

            // Store reference
            this.tagCheckboxes = checkboxes;

            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    this.updateTagsCriteria();
                    this.applyFilters();
                });
            });
        }

        updateTagsCriteria() {
            if (!this.tagCheckboxes) return;

            this.criteria.tags = Array.from(this.tagCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value.toLowerCase());
        }

        // ==============================================
        // FILTER APPLICATION
        // ==============================================

        applyFilters() {
            // Show loading state on target container
            if (this.targetContainer) this.targetContainer.classList.add('nds-loading');

            let visibleCount = 0;

            this.items.forEach(item => {
                const isVisible = this.itemMatchesCriteria(item);

                if (isVisible) {
                    this.showItem(item);
                    visibleCount++;
                } else {
                    this.hideItem(item);
                }
            });

            // Dispatch filter change event
            this.dispatchFilterEvent(visibleCount);

            // Trigger pagination update if exists
            this.updatePagination();

            // Show/hide no results alert
            this.updateNoResultsAlert(visibleCount);

            // Remove target loading state 500ms after filter complete
            clearTimeout(this.targetLoadingTimer);
            this.targetLoadingTimer = setTimeout(() => {
                if (this.targetContainer) this.targetContainer.classList.remove('nds-loading');
            }, 500);
        }

        updateNoResultsAlert(visibleCount) {
            const alertId = `nds-filter-no-results-${this.targetId}`;

            if (visibleCount === 0) {
                // Show no results alert if not already shown
                if (!document.getElementById(alertId) && window.NDSAlert) {
                    const isArabic = document.documentElement.lang === 'ar';
                    const self = this;
                    NDSAlert.warning(isArabic ? 'لا توجد نتائج لمعايير التصفية الحالية' : 'No result for current filter criteria', {
                        target: this.targetContainer,
                        title: isArabic ? 'لا توجد نتائج' : 'No Result',
                        id: alertId,
                        closable: false,
                        actions: [
                            {
                                label: isArabic ? 'مسح التصفية' : 'Clear Filter',
                                variant: 'neutral',
                                onClick: () => {
                                    self.reset();
                                }
                            }
                        ]
                    });
                }
            } else {
                // Dismiss no results alert
                const existingAlert = document.getElementById(alertId);
                if (existingAlert) {
                    NDSAlert.dismiss(existingAlert);
                }
            }
        }

        itemMatchesCriteria(item) {
            // Check search criteria
            if (this.criteria.search && !this.itemMatchesSearch(item)) {
                return false;
            }

            // Check tags criteria
            if (this.criteria.tags.length > 0 && !this.itemMatchesTags(item)) {
                return false;
            }

            return true;
        }

        itemMatchesSearch(item) {
            const searchText = this.criteria.search;
            if (!searchText) return true;

            // Search in card text content
            const cardText = item.querySelector('.nds-card-text');
            if (cardText) {
                const textContent = cardText.textContent.toLowerCase();
                if (textContent.includes(searchText)) {
                    return true;
                }
            }

            // Also search in card title specifically
            const cardTitle = item.querySelector('.nds-card-title');
            if (cardTitle) {
                const titleContent = cardTitle.textContent.toLowerCase();
                if (titleContent.includes(searchText)) {
                    return true;
                }
            }

            // Search in card subtitle
            const cardSubtitle = item.querySelector('.nds-card-subtitle');
            if (cardSubtitle) {
                const subtitleContent = cardSubtitle.textContent.toLowerCase();
                if (subtitleContent.includes(searchText)) {
                    return true;
                }
            }

            // Search in card description
            const cardDescription = item.querySelector('.nds-card-description');
            if (cardDescription) {
                const descContent = cardDescription.textContent.toLowerCase();
                if (descContent.includes(searchText)) {
                    return true;
                }
            }

            return false;
        }

        itemMatchesTags(item) {
            const selectedTags = this.criteria.tags;
            if (selectedTags.length === 0) return true;

            // Get tags from card
            const cardTags = item.querySelector('.nds-card-tags');
            if (!cardTags) return false;

            const tagElements = cardTags.querySelectorAll('.nds-tag .label');
            const itemTags = Array.from(tagElements).map(tag => tag.textContent.trim().toLowerCase());

            // Check if item has ANY of the selected tags (OR logic for tags)
            return selectedTags.some(selectedTag => itemTags.includes(selectedTag));
        }

        // ==============================================
        // ITEM VISIBILITY
        // ==============================================

        showItem(item) {
            item.style.display = '';
            item.removeAttribute('data-filtered');
            item.classList.remove('nds-filtered-out');
        }

        hideItem(item) {
            item.style.display = 'none';
            item.setAttribute('data-filtered', 'true');
            item.classList.add('nds-filtered-out');
        }

        // ==============================================
        // RESET FUNCTIONALITY
        // ==============================================

        setupResetButton() {
            // Find reset button (usually has refresh icon or reset text)
            const resetBtn = this.filterContainer.querySelector('[class*="refresh"], button:has(.hgi-refresh)');

            // Also try to find by icon class
            const resetByIcon = this.filterContainer.querySelector('.hgi-refresh-ccw-02, .hgi-refresh');
            const resetButton = resetBtn || (resetByIcon ? resetByIcon.closest('button') : null);

            if (resetButton) {
                resetButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.reset();
                });
            }
        }

        reset() {
            // Reset search
            if (this.searchInput) {
                this.searchInput.value = '';
                this.criteria.search = '';

                // Update clear button visibility
                const clearBtn = this.searchInput.closest('[data-filter="search"]')?.querySelector('.clear');
                if (clearBtn) {
                    clearBtn.classList.add('hidden');
                }
            }

            // Reset tags
            if (this.tagCheckboxes) {
                this.tagCheckboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
                this.criteria.tags = [];
            }

            // Show all items
            this.items.forEach(item => this.showItem(item));

            // Dismiss no results alert
            const alertId = `nds-filter-no-results-${this.targetId}`;
            const existingAlert = document.getElementById(alertId);
            if (existingAlert && window.NDSAlert) {
                NDSAlert.dismiss(existingAlert);
            }

            // Dispatch reset event
            this.dispatchResetEvent();

            // Update pagination
            this.updatePagination();
        }

        // ==============================================
        // EVENTS
        // ==============================================

        dispatchFilterEvent(visibleCount) {
            const event = new CustomEvent('nds:filter:change', {
                detail: {
                    filter: this,
                    criteria: { ...this.criteria },
                    totalItems: this.items.length,
                    visibleItems: visibleCount,
                    hiddenItems: this.items.length - visibleCount
                },
                bubbles: true
            });

            this.filterContainer.dispatchEvent(event);
        }

        dispatchResetEvent() {
            const event = new CustomEvent('nds:filter:reset', {
                detail: {
                    filter: this,
                    totalItems: this.items.length
                },
                bubbles: true
            });

            this.filterContainer.dispatchEvent(event);
        }

        // ==============================================
        // PAGINATION INTEGRATION
        // ==============================================

        updatePagination() {
            // Check if pagination exists for target container
            if (window.NDSPagination && window.NDSPagination.refresh) {
                // Find pagination associated with this container
                const paginationNav = this.targetContainer.parentElement?.querySelector('.nds-pagination-nav, .nds-auto-pagination');
                if (paginationNav) {
                    // Trigger pagination refresh
                    setTimeout(() => {
                        window.NDSPagination.refresh(this.targetContainer);
                    }, 50);
                }
            }
        }

        // ==============================================
        // PUBLIC API
        // ==============================================

        getVisibleItems() {
            return this.items.filter(item => !item.hasAttribute('data-filtered'));
        }

        getHiddenItems() {
            return this.items.filter(item => item.hasAttribute('data-filtered'));
        }

        getCriteria() {
            return { ...this.criteria };
        }

        setSearchValue(value) {
            if (this.searchInput) {
                this.searchInput.value = value;
                this.criteria.search = value.trim().toLowerCase();
                this.applyFilters();
            }
        }

        setSelectedTags(tags) {
            if (this.tagCheckboxes) {
                const tagsLower = tags.map(t => t.toLowerCase());
                this.tagCheckboxes.forEach(checkbox => {
                    checkbox.checked = tagsLower.includes(checkbox.value.toLowerCase());
                });
                this.updateTagsCriteria();
                this.applyFilters();
            }
        }

        destroy() {
            // Clear debounce timer
            if (this.searchDebounceTimer) {
                clearTimeout(this.searchDebounceTimer);
            }

            // Show all items
            this.items.forEach(item => this.showItem(item));

            // Remove initialized attribute
            this.filterContainer.removeAttribute('data-nds-filter-initialized');
        }
    }

    // ==============================================
    // AUTO-INITIALIZATION
    // ==============================================

    function initializeFilters() {
        const filterContainers = document.querySelectorAll('.nds-filter');

        filterContainers.forEach(container => {
            // Skip if already initialized
            if (container.hasAttribute('data-nds-filter-initialized')) {
                return;
            }

            // Skip elements inside code examples
            if (container.closest('code, .code-example')) {
                return;
            }

            const filterInstance = new NDSFilter(container);
            container.ndsFilterInstance = filterInstance;
            container.setAttribute('data-nds-filter-initialized', 'true');
        });
    }

    function reinitializeFilters() {
        initializeFilters();
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    if (typeof window !== 'undefined') {
        window.NDSFilter = {
            init: initializeFilters,
            reinit: reinitializeFilters,
            create: (container) => new NDSFilter(container),

            // Get filter instance for a specific container
            getInstance: (container) => {
                if (typeof container === 'string') {
                    container = document.querySelector(container);
                }
                return container?.ndsFilterInstance || null;
            },

            // Get filter instance by target ID
            getByTarget: (targetId) => {
                const filterContainer = document.querySelector(`.nds-filter[data-filter-target="${targetId}"]`);
                return filterContainer?.ndsFilterInstance || null;
            }
        };
    }

    // Export for modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSFilter;
    }

    // Note: Initialization handled by nds-init.js unified system
})();

/**
 * Usage Examples:
 *
 * HTML Structure:
 * <div class="nds-filter" data-filter-target="myCardList">
 *     <div data-filter="search">
 *         <input type="text" class="nds-search-input" placeholder="Search...">
 *     </div>
 *     <fieldset data-filter="tags">
 *         <input type="checkbox" value="tag1"> Tag 1
 *         <input type="checkbox" value="tag2"> Tag 2
 *     </fieldset>
 * </div>
 *
 * <div id="myCardList">
 *     <div class="nds-card">
 *         <div class="nds-card-text">
 *             <h3 class="nds-card-title">Card Title</h3>
 *             <p class="nds-card-description">Card description text</p>
 *         </div>
 *         <div class="nds-card-tags">
 *             <span class="nds-tag"><span class="label">tag1</span></span>
 *         </div>
 *     </div>
 * </div>
 *
 * JavaScript API:
 *
 * // Get filter instance
 * const filter = NDSFilter.getByTarget('myCardList');
 *
 * // Programmatically set search
 * filter.setSearchValue('john');
 *
 * // Programmatically set tags
 * filter.setSelectedTags(['tag1', 'tag2']);
 *
 * // Reset all filters
 * filter.reset();
 *
 * // Get current criteria
 * const criteria = filter.getCriteria();
 *
 * // Get visible/hidden items
 * const visible = filter.getVisibleItems();
 * const hidden = filter.getHiddenItems();
 *
 * // Listen for filter changes
 * document.addEventListener('nds:filter:change', (e) => {
 *     console.log('Visible items:', e.detail.visibleItems);
 *     console.log('Criteria:', e.detail.criteria);
 * });
 *
 * // Listen for filter reset
 * document.addEventListener('nds:filter:reset', (e) => {
 *     console.log('Filter was reset');
 * });
 */
