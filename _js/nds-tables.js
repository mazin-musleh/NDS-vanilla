/**
 * NDS Tables Component
 * Sortable table functionality with accessible column sorting
 * Based on WAI-ARIA Authoring Practices Guide
 */

(function() {
    'use strict';

    class NDSTables {
        constructor(tableElement) {
            this.table = tableElement;
            this.thead = tableElement.querySelector('thead');
            this.tbody = tableElement.querySelector('tbody');
            this.sortButtons = Array.from(tableElement.querySelectorAll('.nds-sort-btn'));

            // Checkbox selection support
            this.selectAllCheckbox = this.thead?.querySelector('th input[type="checkbox"].nds-check');
            this.rowCheckboxes = Array.from(this.tbody?.querySelectorAll('td input[type="checkbox"].nds-check') || []);

            if (!this.thead || !this.tbody) {
                console.warn('NDS Tables: Invalid table structure found');
                return;
            }

            // Check if this is a sortable table
            this.isSortable = this.sortButtons.length > 0;

            // Check if this is a selectable table
            this.isSelectable = this.selectAllCheckbox && this.rowCheckboxes.length > 0;

            if (this.isSortable) {
                this.currentSortColumn = this.findActiveSortColumn();
                this.currentSortDirection = this.findActiveSortDirection();
            }

            this.init();
        }

        init() {
            this.setupEventListeners();
            this.setupInitialState();

            if (this.isSelectable) {
                this.updateSelectAllState();
                this.updateRowSelectedStates();
            }
        }

        findActiveSortColumn() {
            const sortedTh = this.thead.querySelector('[data-state~="sorted-asc"], [data-state~="sorted-desc"]');
            if (sortedTh) {
                const button = sortedTh.querySelector('.nds-sort-btn');
                return this.sortButtons.indexOf(button);
            }
            return -1;
        }

        findActiveSortDirection() {
            const sortedTh = this.thead.querySelector('[data-state~="sorted-asc"], [data-state~="sorted-desc"]');
            if (!sortedTh) return null;

            if (NDS.State.has(sortedTh, 'sorted-asc')) return 'asc';
            if (NDS.State.has(sortedTh, 'sorted-desc')) return 'desc';
            return null;
        }

        setupInitialState() {
            // Set initial ARIA attributes
            this.sortButtons.forEach((button, index) => {
                const th = button.closest('th');

                if (index === this.currentSortColumn) {
                    th.setAttribute('aria-sort', this.currentSortDirection === 'asc' ? 'ascending' : 'descending');
                    NDS.State.add(button, 'active');
                } else {
                    th.setAttribute('aria-sort', 'none');
                }
            });
        }

        setupEventListeners() {
            // Sortable table listeners
            if (this.isSortable) {
                this.sortButtons.forEach((button, index) => {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.handleSort(index);
                    });

                    // Keyboard accessibility
                    button.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            this.handleSort(index);
                        }
                    });
                });
            }

            // Selectable table listeners
            if (this.isSelectable) {
                // Select all checkbox
                this.selectAllCheckbox.addEventListener('change', (e) => {
                    this.handleSelectAll(e.target.checked);
                });

                // Individual row checkboxes
                this.rowCheckboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        this.updateSelectAllState();
                        this.updateRowSelectedStates();
                        this.dispatchSelectionEvent();
                    });
                });
            }
        }

        handleSort(columnIndex) {
            const button = this.sortButtons[columnIndex];
            const th = button.closest('th');

            // Determine new sort direction
            let newDirection;
            if (this.currentSortColumn === columnIndex) {
                // Toggle through: asc -> desc -> none (reset)
                if (this.currentSortDirection === 'asc') {
                    newDirection = 'desc';
                } else if (this.currentSortDirection === 'desc') {
                    newDirection = null; // Reset to original order
                } else {
                    newDirection = 'asc';
                }
            } else {
                // New column, start with ascending
                newDirection = 'asc';
            }

            // Clear all sort states
            this.clearSortStates();

            // Apply new sort or reset to original
            if (newDirection) {
                this.applySortState(th, newDirection);
                this.sortTableData(columnIndex, newDirection);
                this.currentSortColumn = columnIndex;
                this.currentSortDirection = newDirection;
            } else {
                // Reset to original order
                this.resetToOriginalOrder();
                this.currentSortColumn = -1;
                this.currentSortDirection = null;
            }

            // Dispatch custom event
            this.dispatchSortEvent(columnIndex, newDirection);

            // Refresh pagination after sort reorder
            if (NDS.Pagination && NDS.Pagination.refresh) {
                const pagedContent = this.tbody.closest('.nds-paged-content');
                if (pagedContent) {
                    NDS.Pagination.refresh(pagedContent);
                }
            }
        }

        clearSortStates() {
            this.sortButtons.forEach(button => {
                const th = button.closest('th');

                NDS.State.remove(th, 'sorted-asc', 'sorted-desc');
                NDS.State.remove(button, 'active');
                th.setAttribute('aria-sort', 'none');
            });
        }

        applySortState(th, direction) {
            const button = th.querySelector('.nds-sort-btn');

            if (direction === 'asc') {
                NDS.State.add(th, 'sorted-asc');
                th.setAttribute('aria-sort', 'ascending');
            } else if (direction === 'desc') {
                NDS.State.add(th, 'sorted-desc');
                th.setAttribute('aria-sort', 'descending');
            }

            if (button) NDS.State.add(button, 'active');
        }

        sortTableData(columnIndex, direction) {
            // Store original order if not already stored
            if (!this.originalRowOrder) {
                this.originalRowOrder = Array.from(this.tbody.querySelectorAll('tr'));
            }

            const rows = Array.from(this.tbody.querySelectorAll('tr'));
            const th = this.sortButtons[columnIndex].closest('th');
            const cellIndex = Array.from(th.parentElement.children).indexOf(th);

            // Determine data type from first cell
            const dataType = this.detectDataType(rows, cellIndex);

            // Sort rows
            rows.sort((a, b) => {
                const aCell = a.children[cellIndex];
                const bCell = b.children[cellIndex];

                if (!aCell || !bCell) return 0;

                const aValue = this.getCellValue(aCell, dataType);
                const bValue = this.getCellValue(bCell, dataType);

                let comparison = 0;

                if (dataType === 'number') {
                    comparison = aValue - bValue;
                } else if (dataType === 'date') {
                    comparison = aValue - bValue;
                } else {
                    // Text comparison
                    comparison = aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
                }

                return direction === 'asc' ? comparison : -comparison;
            });

            // Reorder DOM
            rows.forEach(row => this.tbody.appendChild(row));
        }

        resetToOriginalOrder() {
            if (this.originalRowOrder) {
                this.originalRowOrder.forEach(row => this.tbody.appendChild(row));
            }
        }

        detectDataType(rows, cellIndex) {
            // Check first few rows to determine data type
            const sampleSize = Math.min(3, rows.length);
            let numberCount = 0;
            let dateCount = 0;

            for (let i = 0; i < sampleSize; i++) {
                const cell = rows[i].children[cellIndex];
                if (!cell) continue;

                const text = this.getCellText(cell);

                // Check if it's a number (including formatted numbers like "1,000" or "9,375 SAR")
                const numMatch = text.replace(/[,\s]/g, '').match(/^[\d.]+/);
                if (numMatch && !isNaN(parseFloat(numMatch[0]))) {
                    numberCount++;
                }

                // Check if it's a date
                if (this.isDate(text)) {
                    dateCount++;
                }
            }

            if (numberCount === sampleSize) return 'number';
            if (dateCount === sampleSize) return 'date';
            return 'text';
        }

        getCellValue(cell, dataType) {
            const text = this.getCellText(cell);

            if (dataType === 'number') {
                // Extract number from text (handle formats like "9,375 SAR" or "1,000")
                const numMatch = text.replace(/[,\s]/g, '').match(/^[\d.]+/);
                return numMatch ? parseFloat(numMatch[0]) : 0;
            } else if (dataType === 'date') {
                return new Date(text).getTime() || 0;
            } else {
                return text.toLowerCase();
            }
        }

        getCellText(cell) {
            // Get text content, ignoring nested elements like tags/icons
            const textNode = Array.from(cell.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE)
                .map(node => node.textContent.trim())
                .join(' ');

            // If no direct text, get all text content
            return textNode || cell.textContent.trim();
        }

        isDate(text) {
            // Simple date detection
            const datePatterns = [
                /^\d{1,2}[/-]\d{1,2}[/-]\d{2,4}$/,  // DD/MM/YYYY or MM/DD/YYYY
                /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/,    // YYYY-MM-DD
            ];

            return datePatterns.some(pattern => pattern.test(text)) && !isNaN(new Date(text).getTime());
        }

        dispatchSortEvent(columnIndex, direction) {
            const event = new CustomEvent('nds:table:sort', {
                detail: {
                    columnIndex: columnIndex,
                    direction: direction,
                    table: this.table,
                    button: this.sortButtons[columnIndex]
                },
                bubbles: true
            });

            this.table.dispatchEvent(event);
        }

        // Selection methods
        handleSelectAll(checked) {
            this.rowCheckboxes.forEach(checkbox => {
                checkbox.checked = checked;
            });

            // Clear indeterminate state via forms API
            if (window.NDS && window.NDS.Forms && window.NDS.Forms.setIndeterminate) {
                window.NDS.Forms.setIndeterminate(this.selectAllCheckbox, false);
            } else {
                this.selectAllCheckbox.indeterminate = false;
            }

            this.updateRowSelectedStates();
            this.dispatchSelectionEvent();
        }

        updateRowSelectedStates() {
            this.rowCheckboxes.forEach(checkbox => {
                const tr = checkbox.closest('tr');
                if (!tr) return;

                if (checkbox.checked) {
                    NDS.State.add(tr, 'selected');
                } else {
                    NDS.State.remove(tr, 'selected');
                }
            });
        }

        updateSelectAllState() {
            const checkedCount = this.rowCheckboxes.filter(cb => cb.checked).length;
            const totalCount = this.rowCheckboxes.length;


            // Set checked state based on count
            this.selectAllCheckbox.checked = checkedCount === totalCount;

            // Set indeterminate state via forms API
            var isIndeterminate = checkedCount > 0 && checkedCount < totalCount;
            if (window.NDS && window.NDS.Forms && window.NDS.Forms.setIndeterminate) {
                window.NDS.Forms.setIndeterminate(this.selectAllCheckbox, isIndeterminate);
            } else {
                this.selectAllCheckbox.indeterminate = isIndeterminate;
            }

        }

        dispatchSelectionEvent() {
            const selectedRows = this.rowCheckboxes
                .map((checkbox, index) => ({ checkbox, row: this.tbody.querySelectorAll('tr')[index], index }))
                .filter(item => item.checkbox.checked);

            const event = new CustomEvent('nds:table:selection', {
                detail: {
                    selectedCount: selectedRows.length,
                    totalCount: this.rowCheckboxes.length,
                    selectedRows: selectedRows.map(item => item.row),
                    selectedIndexes: selectedRows.map(item => item.index),
                    table: this.table
                },
                bubbles: true
            });

            this.table.dispatchEvent(event);
        }

        // Public API methods
        getSortColumn() {
            return this.currentSortColumn;
        }

        getSortDirection() {
            return this.currentSortDirection;
        }

        resetSort() {
            this.clearSortStates();
            this.resetToOriginalOrder();
            this.currentSortColumn = -1;
            this.currentSortDirection = null;
        }

        destroy() {
            // Remove event listeners and clean up
            this.sortButtons.forEach(button => {
                button.replaceWith(button.cloneNode(true));
            });
            this.originalRowOrder = null;
        }
    }

    // Responsive table handler (similar to expandable pattern)
    class NDSResponsiveTable {
        constructor(tableElement) {
            // tableElement is the <table> element with nds-table and nds-responsive classes
            this.table = tableElement;
            this.wrapper = null;
            this.needsScroll = false;
            this.currentScrollState = null; // Track current state to avoid redundant DOM operations

            this.init();
        }

        init() {
            this.setupWrapper();
            this.checkTableWidth();
            this.setupEventListeners();
        }

        setupWrapper() {
            // Check if already wrapped
            if (this.table.parentElement.classList.contains('nds-table-wrapper')) {
                this.wrapper = this.table.parentElement;
                this.copyMaxWidthToWrapper();
            } else {
                // Create wrapper
                this.wrapper = document.createElement('div');
                this.wrapper.className = 'nds-table-wrapper';

                // Insert wrapper before table
                this.table.parentElement.insertBefore(this.wrapper, this.table);

                // Move table into wrapper
                this.wrapper.appendChild(this.table);

                // Copy max-width from table to wrapper
                this.copyMaxWidthToWrapper();
            }

            // Lock column widths for paginated tables
            this.lockColumnWidths();
        }

        lockColumnWidths() {
            // Only lock if table has pagination items (paginated table)
            if (!this.table.querySelector('tr.nds-page-item')) return;

            // Temporarily show all rows to measure true max column widths
            const rows = this.table.querySelectorAll('tr.nds-page-item');
            const hiddenRows = [];
            rows.forEach(row => {
                if (row.hidden) {
                    hiddenRows.push(row);
                    row.hidden = false;
                }
            });

            // Measure each header cell's computed width with all rows visible
            const headers = this.table.querySelectorAll('thead th');
            headers.forEach(th => {
                const width = th.getBoundingClientRect().width;
                th.style.width = width + 'px';
            });

            // Re-hide the rows that were hidden
            hiddenRows.forEach(row => {
                row.hidden = true;
            });
        }

        copyMaxWidthToWrapper() {
            // Get max-width from table's inline style or computed style
            const tableMaxWidth = this.table.style.getPropertyValue('--max-width') ||
                                 getComputedStyle(this.table).getPropertyValue('--max-width');

            if (tableMaxWidth && tableMaxWidth.trim()) {
                this.wrapper.style.setProperty('--max-width', tableMaxWidth.trim());
            }
        }

        checkTableWidth() {
            const { scrollWidth, clientWidth } = this.wrapper;

            if (scrollWidth > clientWidth) {
                this.needsScroll = true;
                this.currentScrollState = null; // Force handleScroll to update
                this.handleScroll();
            } else {
                NDS.State.clear(this.wrapper);
                this.needsScroll = false;
                this.currentScrollState = null;
            }
        }

        handleScroll() {
            if (!this.needsScroll) return;

            const { scrollLeft, scrollWidth, clientWidth } = this.wrapper;
            const maxScroll = scrollWidth - clientWidth;
            const isRTL = NDS.isRTL;

            const tokens = ['has-more'];

            if (isRTL) {
                if (Math.abs(scrollLeft) <= 5) tokens.push('at-start');
                if (Math.abs(scrollLeft) >= maxScroll - 5) tokens.push('at-end');
            } else {
                if (scrollLeft <= 5) tokens.push('at-start');
                if (scrollLeft >= maxScroll - 5) tokens.push('at-end');
            }

            // Only update DOM if state changed
            const newState = tokens.join(' ');
            if (this.currentScrollState !== newState) {
                NDS.State.set(this.wrapper, ...tokens);
                this.currentScrollState = newState;
            }
        }

        setupEventListeners() {
            // Scroll event listener with requestAnimationFrame throttling
            let scrollTicking = false;
            this.wrapper.addEventListener('scroll', () => {
                if (!scrollTicking) {
                    window.requestAnimationFrame(() => {
                        this.handleScroll();
                        scrollTicking = false;
                    });
                    scrollTicking = true;
                }
            });

            // Watch table and wrapper for size changes
            const checkTable = NDS.debounce(() => this.checkTableWidth(), 100);
            this._offResizeTable = NDS.onElementResize(this.table, checkTable);
            this._offResizeWrapper = NDS.onElementResize(this.wrapper, checkTable);

            // Detect visibility changes (when tab becomes visible)
            this._offIntersect = NDS.onIntersect(this.wrapper, (entry) => {
                if (entry.isIntersecting) {
                    clearTimeout(this.visibilityTimer);
                    this.visibilityTimer = setTimeout(() => this.checkTableWidth(), 150);
                }
            }, { threshold: 0.1 });

            // Tab change listener is now handled globally (see initializeTables function)
        }

        handleResize() {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.checkTableWidth();
            }, 250);
        }

        recheckWidth() {
            this.checkTableWidth();
        }

        destroy() {
            if (this._offResizeTable) { this._offResizeTable(); this._offResizeTable = null; }
            if (this._offResizeWrapper) { this._offResizeWrapper(); this._offResizeWrapper = null; }

            if (this._offIntersect) { this._offIntersect(); this._offIntersect = null; }

            if (this.resizeTimer) {
                clearTimeout(this.resizeTimer);
            }

            if (this.visibilityTimer) {
                clearTimeout(this.visibilityTimer);
            }

            NDS.State.clear(this.wrapper);
            this.currentScrollState = null;
        }
    }

    // Global tab change handler (single listener for all responsive tables)
    if (!window.ndsTabChangeHandlerInitialized) {
        window.ndsTabChangeHandlerInitialized = true;
        document.addEventListener('nds:tab:changed', (e) => {
            const activePanel = e.detail?.panel;
            if (activePanel) {
                // Find all responsive tables inside the activated tab panel
                const tables = activePanel.querySelectorAll('.nds-table[data-nds-responsive-initialized]');
                tables.forEach(table => {
                    if (table.ndsTableResponsive) {
                        // Debounce the recheck
                        clearTimeout(table.ndsTableResponsive.tabChangeTimer);
                        table.ndsTableResponsive.tabChangeTimer = setTimeout(() => {
                            table.ndsTableResponsive.checkTableWidth();
                        }, 200);
                    }
                });
            }
        });
    }

    // Auto-initialize tables on page load (sortable and/or selectable)
    function initializeTables() {
        // Find all NDS tables
        const tables = document.querySelectorAll('.nds-table');

        tables.forEach(table => {
            // Skip elements inside code examples
            if (table.closest('code, .code-example')) {
                return;
            }

            // Initialize responsive wrapper for all tables
            // If table has --max-width, it will use that value
            // Otherwise, wrapper will use default max-width (100%)
            // Set --min-width inline on the table to control scroll breakpoint
            if (!table.hasAttribute('data-nds-responsive-initialized')) {
                const responsiveInstance = new NDSResponsiveTable(table);
                table.ndsTableResponsive = responsiveInstance;
                table.setAttribute('data-nds-responsive-initialized', 'true');
            }

            // Check if table has sort buttons or checkboxes
            const hasSortButtons = table.querySelector('.nds-sort-btn') !== null;
            const hasCheckboxes = table.querySelector('thead input[type="checkbox"].nds-check') !== null;

            if ((hasSortButtons || hasCheckboxes) && !table.hasAttribute('data-nds-tables-initialized')) {
                const tablesInstance = new NDSTables(table);
                table.ndsTableControls = tablesInstance;
                table.setAttribute('data-nds-tables-initialized', 'true');
            }
        });
    }

    // Re-initialize when new content is added
    function reinitializeTables() {
        initializeTables();
    }

    // Recheck width for all responsive tables
    function recheckAllWidths() {
        const responsiveTables = document.querySelectorAll('.nds-table[data-nds-responsive-initialized]');
        responsiveTables.forEach(table => {
            if (table.ndsTableResponsive && table.ndsTableResponsive.recheckWidth) {
                table.ndsTableResponsive.recheckWidth();
            }
        });
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        NDS.Tables = {
            init: initializeTables,
            reinit: reinitializeTables,
            recheckWidths: recheckAllWidths,
            create: (table) => new NDSTables(table),
            createResponsive: (table) => new NDSResponsiveTable(table)
        };
    }

    // Export for modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSTables;
    }

    // Note: Initialization now handled by nds-loader.js unified system
})();

/**
 * Usage Examples:
 *
 * // Auto-initialization (happens automatically)
 * // Just add the HTML structure with .nds-table.nds-sortable class
 *
 * // Manual initialization
 * const tableElement = document.querySelector('#myTable');
 * const tableInstance = NDSTables.create(tableElement);
 *
 * // Reset sorting
 * tableInstance.resetSort();
 *
 * // Get current state
 * const sortColumn = tableInstance.getSortColumn();
 * const sortDirection = tableInstance.getSortDirection();
 *
 * // Listen for sort changes
 * document.addEventListener('nds:table:sort', (e) => {
 *     console.log('Table sorted by column:', e.detail.columnIndex);
 *     console.log('Sort direction:', e.detail.direction);
 *     console.log('Table element:', e.detail.table);
 * });
 *
 * // Reinitialize after dynamic content changes
 * NDSTables.reinit();
 */
