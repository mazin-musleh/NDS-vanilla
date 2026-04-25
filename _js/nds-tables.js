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

            // AbortController for the change-listeners attached in
            // setupEventListeners — aborted in destroy() so the per-row
            // bookkeeping detaches cleanly when the table is torn down.
            this._ac = new AbortController();

            this.init();
        }

        init() {
            if (this.isSortable) {
                this.setupSort();
            }
            this.setupEventListeners();

            if (this.isSelectable) {
                this.updateSelectAllState();
                this.updateRowSelectedStates();
            }
        }

        // ── Sort (delegated to NDS.Sort) ─────────────────────────────────

        setupSort() {
            // Seed initial state from HTML if a <th> already carries sorted-asc / sorted-desc
            const sortedTh = this.thead.querySelector('[data-state~="sorted-asc"], [data-state~="sorted-desc"]');
            let initialState = null;
            if (sortedTh) {
                const button = sortedTh.querySelector('.nds-sort-btn');
                const colIdx = this.sortButtons.indexOf(button);
                if (colIdx !== -1) {
                    initialState = {
                        key: colIdx,
                        dir: NDS.State.has(sortedTh, 'sorted-asc') ? 'asc' : 'desc'
                    };
                }
            }

            this.sort = NDS.Sort.create(this.table, {
                items: () => Array.from(this.tbody.querySelectorAll('tr')),
                reorderIn: this.tbody,
                triggers: '.nds-sort-btn',
                mode: 'cycle',
                a11y: 'sort',
                a11yTarget: (btn) => btn.closest('th'),
                accessor: (row, colIdx) => {
                    // Escape hatch for display/sort-value divergence: authors set
                    // data-sort-value on the <td> when the rendered text would mis-type
                    // (e.g. "Free" in a numeric column, localized dates, etc.)
                    const cell = row.children[colIdx];
                    if (!cell) return '';
                    const override = cell.getAttribute('data-sort-value');
                    return override !== null ? override : this.getCellText(cell);
                },
                keyFrom: (btn) => {
                    const th = btn.closest('th');
                    return Array.from(th.parentElement.children).indexOf(th);
                },
                initialState,
                onChange: ({ key, dir }) => {
                    // Clear sorted-asc/sorted-desc data-state from every column header
                    this.sortButtons.forEach(btn => {
                        const th = btn.closest('th');
                        NDS.State.remove(th, 'sorted-asc', 'sorted-desc');
                    });

                    // Apply to the active header for CSS icon swap at _tables.scss
                    if (key !== null && key !== undefined && dir) {
                        const activeBtn = this.sortButtons.find(btn => {
                            const th = btn.closest('th');
                            return Array.from(th.parentElement.children).indexOf(th) === key;
                        });
                        if (activeBtn) {
                            const th = activeBtn.closest('th');
                            NDS.State.add(th, dir === 'asc' ? 'sorted-asc' : 'sorted-desc');
                        }
                    }

                    if (NDS.Pagination && NDS.Pagination.refresh) {
                        const pagedContent = this.tbody.closest('.nds-paged-content');
                        if (pagedContent) NDS.Pagination.refresh(pagedContent);
                    }

                    // Back-compat event — existing listeners expect columnIndex + direction
                    this.dispatchSortEvent(key, dir);
                }
            });
        }

        getCellText(cell) {
            if (!cell) return '';
            // Ignore nested tags/icons; prefer direct text nodes, fall back to full text
            const textNode = Array.from(cell.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE)
                .map(node => node.textContent.trim())
                .join(' ');
            return textNode || cell.textContent.trim();
        }

        setupEventListeners() {
            // Selectable table listeners (sort listeners are owned by NDS.Sort)
            if (this.isSelectable) {
                const { signal } = this._ac;

                // Select all checkbox
                this.selectAllCheckbox.addEventListener('change', (e) => {
                    this.handleSelectAll(e.target.checked);
                }, { signal });

                // Individual row checkboxes
                this.rowCheckboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', () => {
                        this.updateSelectAllState();
                        this.updateRowSelectedStates();
                        this.dispatchSelectionEvent();
                    }, { signal });
                });
            }
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
            NDS.Forms.setIndeterminate(this.selectAllCheckbox, false);

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
            NDS.Forms.setIndeterminate(this.selectAllCheckbox, isIndeterminate);

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
            const s = this.sort?.getState();
            return s && s.key != null ? s.key : -1;
        }

        getSortDirection() {
            return this.sort?.getState().dir || null;
        }

        resetSort() {
            this.sort?.reset();
        }

        destroy() {
            this.sort?.destroy();
            this._ac?.abort();
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

            // Measure each header cell's computed width with all rows visible.
            // Batch reads first, writes second, so a write to header N doesn't
            // dirty layout for the read of header N+1.
            const headers = this.table.querySelectorAll('thead th');
            const widths = Array.from(headers).map(th => th.getBoundingClientRect().width);
            headers.forEach((th, i) => {
                th.style.width = widths[i] + 'px';
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
            if (this.table.classList.contains('nds-mask')) tokens.push('masked');

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
            this.wrapper.addEventListener('scroll', NDS.rafThrottle(() => this.handleScroll()));

            // Watch table and wrapper for size changes
            const checkTable = NDS.debounce(() => this.checkTableWidth(), 100);
            this._offResizeTable = NDS.onElementResize(this.table, checkTable);
            this._offResizeWrapper = NDS.onElementResize(this.wrapper, checkTable);

            // Detect visibility changes (when tab becomes visible)
            const onVisibleDebounced = NDS.debounce(() => this.checkTableWidth(), 150);
            this._offIntersect = NDS.onIntersect(this.wrapper, (entry) => {
                if (entry.isIntersecting) onVisibleDebounced();
            }, { threshold: 0.1 });

            // Tab change listener is now handled globally (see initializeTables function)
        }

        handleResize() {
            if (!this._debouncedResize) {
                this._debouncedResize = NDS.debounce(() => this.checkTableWidth(), 250);
            }
            this._debouncedResize();
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

    // Global class-change observer so mask toggle reflects without a scroll event
    if (!window.ndsTableClassObserverInitialized && NDS.onAttrChange) {
        window.ndsTableClassObserverInitialized = true;
        NDS.onAttrChange('.nds-table[data-nds-responsive-initialized]', ['class'], (hits) => {
            hits.forEach(table => {
                const responsive = table.ndsTableResponsive;
                if (!responsive) return;
                responsive.currentScrollState = null;
                responsive.handleScroll();
            });
        });
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
                    const responsive = table.ndsTableResponsive;
                    if (responsive) {
                        // Debounce the recheck
                        if (!responsive._debouncedTabChangeCheck) {
                            responsive._debouncedTabChangeCheck = NDS.debounce(
                                () => responsive.checkTableWidth(),
                                200
                            );
                        }
                        responsive._debouncedTabChangeCheck();
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
