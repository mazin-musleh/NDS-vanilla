/**
 * NDS Tables Component
 * Sortable table functionality with accessible column sorting
 * Based on WAI-ARIA Authoring Practices Guide
 */

(function() {
    'use strict';

    // Shared cell-text reader. Prefer direct text nodes over textContent so
    // nested sort buttons / icons / badges don't pollute the value used for
    // sorting (NDS.Sort accessor) or exporting (NDS.Export tableAdapter).
    function getCellText(cell) {
        if (!cell) return '';
        const textNode = Array.from(cell.childNodes)
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => node.textContent.trim())
            .filter(Boolean)
            .join(' ');
        return textNode || cell.textContent.trim();
    }

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
            this.abortController = new AbortController();

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

                    const pagedContent = this.tbody.closest('.nds-paged-content');
                    if (pagedContent) NDS.Pagination.refresh(pagedContent);

                    // Back-compat event — existing listeners expect columnIndex + direction
                    this.dispatchSortEvent(key, dir);
                }
            });
        }

        getCellText(cell) {
            return getCellText(cell);
        }

        setupEventListeners() {
            // Selectable table listeners (sort listeners are owned by NDS.Sort)
            if (this.isSelectable) {
                const { signal } = this.abortController;

                // Select all checkbox
                this.selectAllCheckbox.addEventListener('change', (e) => {
                    this.handleSelectAll(e.target.checked);
                }, { signal });

                // Individual row checkboxes — one delegated change listener on
                // tbody instead of a per-row bind (O(1) wiring; change bubbles,
                // and thead's select-all is handled above so it never reaches here).
                this.tbody.addEventListener('change', (e) => {
                    if (!e.target.matches('input[type="checkbox"].nds-check')) return;
                    this.updateSelectAllState();
                    this.updateRowSelectedStates();
                    this.dispatchSelectionEvent();
                }, { signal });
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
            this.abortController?.abort();
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
        }

        copyMaxWidthToWrapper() {
            // --max-width is only ever set inline — the SCSS consumes it via
            // var(--max-width, 100%) and never sets it as a rule — so read the
            // inline style directly. getComputedStyle here forced a full style
            // recalc of the just-reparented table (~46ms@6.6x on a 100-row table)
            // to read a value that's almost always unset.
            const tableMaxWidth = this.table.style.getPropertyValue('--max-width');
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

            // The RO's first delivery runs the initial overflow check
            // immediately — it fires post-layout so the scrollWidth read is free.
            // Column-width locking is owned by pagination now (it locks before
            // hiding rows; see lockTableColumns in nds-pagination.js). Later
            // deliveries are debounced to coalesce resize storms.
            let firstMeasure = true;
            const checkTable = NDS.debounce(() => this.checkTableWidth(), 100);
            const onSizeChange = () => {
                if (firstMeasure) {
                    firstMeasure = false;
                    this.checkTableWidth();
                } else {
                    checkTable();
                }
            };
            this._offResizeTable = NDS.onElementResize(this.table, onSizeChange);
            this._offResizeWrapper = NDS.onElementResize(this.wrapper, onSizeChange);

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

            NDS.State.clear(this.wrapper);
            this.currentScrollState = null;
        }
    }

    // ── Column visibility ────────────────────────────────────────────
    // A [data-columns-target] dropmenu whose [data-columns-list] fieldset is
    // filled from the target table's <thead> on its first open — the same field
    // structure filter and multiselect use. Unchecking a column sets [hidden]
    // on its <th> and on the matching <td> of every row, and stamps
    // data-export-skip on the <th> so CSV / Excel / PDF exports match what the
    // user sees. Columns are addressed by cell index, so colspan/rowspan header
    // cells aren't supported (the same assumption sort and export already make).

    function resolveTable(ref) {
        const byId = document.getElementById(ref.replace(/^#/, ''));
        if (byId) return byId;
        try { return document.querySelector(ref); } catch (e) { return null; }
    }

    function setColumnHidden(table, index, hidden) {
        const th = table.querySelectorAll('thead th')[index];
        if (!th) return;

        th.toggleAttribute('hidden', hidden);

        // Hiding a column skips it in exports. Only ever clear a data-export-skip
        // we set ourselves — an authored one (an actions column, say) must survive
        // a hide/show round trip.
        if (hidden && !th.hasAttribute('data-export-skip')) {
            th.setAttribute('data-export-skip', '');
            th._ndsExportSkipOwned = true;
        } else if (!hidden && th._ndsExportSkipOwned) {
            th.removeAttribute('data-export-skip');
            th._ndsExportSkipOwned = false;
        }

        table.querySelectorAll('tbody tr').forEach(tr => {
            const cell = tr.children[index];
            if (cell) cell.toggleAttribute('hidden', hidden);
        });

        table.dispatchEvent(new CustomEvent('nds:table:columns', {
            detail: { table, index, hidden },
            bubbles: true
        }));
    }

    class NDSColumnToggle {
        constructor(root) {
            this.root = root;
            this.table = resolveTable(root.getAttribute('data-columns-target') || '');
            this.list = root.querySelector('[data-columns-list]');

            if (!this.table || !this.list) {
                console.warn('NDS Tables: column toggle needs a [data-columns-target] table and a [data-columns-list] host', root);
                return;
            }

            this.abortController = new AbortController();
            this.init();
        }

        init() {
            const { signal } = this.abortController;

            // An authored list wins — a server-rendered checklist paints before
            // this bundle lands. The host's <legend> is always authored, so test
            // for a generated row rather than for children.
            if (!this.list.querySelector('.nds-form-container')) {
                // Populate on first open, not at init: reading <thead> and building
                // a row per column costs more than an unopened menu is worth. Same
                // deferred-build hook nds-filter.js uses (_wireDeferredFilterDropmenus):
                // data-delay shows a loading state on the trigger, emits
                // nds:dropmenu:prepare so we build, then opens with the content already
                // in place — never empty, never mis-measured. One-shot; later opens are
                // immediate. Released by the same abort signal in destroy().
                this.root.setAttribute('data-delay', '500');
                this.root.addEventListener('nds:dropmenu:prepare', () => this.render(), { once: true, signal });
            }

            this.list.addEventListener('change', (e) => {
                if (!e.target.matches('input[data-column-index]')) return;
                setColumnHidden(this.table, Number(e.target.dataset.columnIndex), !e.target.checked);
            }, { signal });
        }

        render() {
            const frag = document.createDocumentFragment();
            this.table.querySelectorAll('thead th').forEach((th, index) => {
                // Locked columns and the row-selection column stay off the list.
                if (th.hasAttribute('data-columns-lock')) return;
                if (th.querySelector('input[type="checkbox"].nds-check')) return;
                frag.appendChild(this.buildRow(th, index));
            });
            this.list.appendChild(frag);
        }

        // The .nds-check-container field nds-filter.js and nds-multiselect.js put
        // in a dropmenu. No .nds-dropmenu-item class — that's what keeps the menu
        // open while columns are toggled.
        buildRow(th, index) {
            const id = NDS.uniqueId('nds-col-');

            const container = document.createElement('div');
            container.className = 'nds-form-container nds-check-container';

            const header = document.createElement('div');
            header.className = 'nds-form-header';
            const label = document.createElement('label');
            label.setAttribute('for', id);
            const labelText = document.createElement('span');
            labelText.className = 'nds-label';
            // Prefer the visible header text — data-export-label exists precisely
            // because the exported name differs from the displayed one.
            labelText.textContent = getCellText(th) || th.dataset.exportLabel || 'Column ' + (index + 1);
            label.appendChild(labelText);
            header.appendChild(label);

            const control = document.createElement('div');
            control.className = 'nds-form-control';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = id;
            input.className = 'nds-check';
            input.dataset.columnIndex = index;
            input.checked = !th.hasAttribute('hidden');
            control.appendChild(input);

            container.append(header, control);
            return container;
        }

        destroy() {
            this.abortController?.abort();
        }
    }

    // Global class-change observer so mask toggle reflects without a scroll event
    if (!window.ndsTableClassObserverInitialized) {
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

        // Column-visibility menus live in a toolbar, not in the table
        document.querySelectorAll('[data-columns-target]').forEach(root => {
            if (root.closest('code, .code-example')) return;
            if (root.hasAttribute('data-nds-columns-initialized')) return;

            root.ndsColumnToggle = new NDSColumnToggle(root);
            root.setAttribute('data-nds-columns-initialized', 'true');
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
            createResponsive: (table) => new NDSResponsiveTable(table),
            createColumnToggle: (root) => new NDSColumnToggle(root),
            setColumnHidden,
            getCellText
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
