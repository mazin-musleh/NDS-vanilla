/* NDS.Tables — public surface
 * Rides: nds-sort (the sort engine — column cycling, reordering, aria-sort)
 *      · nds-dropmenu (column-visibility menu; a sub-row toggle authored inside a menu item)
 *      · nds-forms (the indeterminate select-all checkbox)
 *      · nds-pagination (refreshed after a sort re-orders a paged table; soft)
 * Methods:
 *   NDS.Tables.init() / .reinit()               scan .nds-table and [data-columns-target] menus
 *   NDS.Tables.recheckWidths()                  re-measure every table's responsive scroll state
 *   NDS.Tables.create(table)                    sort + selection controls for one table
 *   NDS.Tables.createResponsive(table)          the scroll wrapper only
 *   NDS.Tables.createColumnToggle(root)         one [data-columns-target] menu
 *   NDS.Tables.row(tr)                          per-row handle {el, sub}; the sub row itself
 *                                               is accepted too
 *   ↳ handle.sub.el                             the <tr class="nds-sub">, or null
 *   ↳ handle.sub.setContent(htmlOrNode)         put YOUR markup in the sub (chainable)
 *   ↳ handle.sub.open() / .close() / .toggle()  show / hide it (chainable)
 *   NDS.Tables.setColumnHidden(table, i, bool)  hide or show a column by cell index
 *   NDS.Tables.getCellText(cell)                the cell-text reader sort and export use
 * Events (bubble from the <table>):
 *   nds:table:sort         detail {columnIndex, direction, table, button}
 *   nds:table:selection    detail {selectedCount, totalCount, selectedRows, selectedIndexes,
 *                          table}
 *   nds:table:columns      detail {table, index, hidden, restored} — restored:true is a saved
 *                          hide replayed at init, not a user action
 *   nds:table:sub-request  detail {row, sub, table, signal} — there is nothing to show yet.
 *                          Fetch, then answer: NDS.Tables.row(row).sub.setContent(html).open().
 *                          Pass detail.signal to fetch / NDS.request so a cancel drops it
 *   nds:table:sub-open     detail {row, sub, table}
 *   nds:table:sub-close    detail {row, sub, table}
 * Hooks:
 *   data-sub-toggle    the button that expands a row (anywhere in the row, or in its menu)
 *   data-sort-value    on a <td>, when the rendered text would sort wrong
 *   data-align         on a <th>: center | start | end
 *   data-columns-target · data-columns-list · data-columns-lock (a column the menu can't hide)
 * Gotchas:
 *   - NDS never fetches sub-row content. Answer nds:table:sub-request, or the toggle spins
 *     until a second click or your close().
 *   - A sub row is <tr class="nds-sub"> placed DIRECTLY AFTER its parent row — adjacency is
 *     the pairing, there is no id to keep in sync.
 *   - Select-all and nds:table:selection follow the FILTERED view; rows hidden by pagination
 *     still count, rows a filter removed do not.
 *   - Columns are addressed by cell index, so colspan/rowspan header cells are not supported.
 *   - Column hides persist in localStorage whenever the table has an id.
 *   - Hiding a column stamps data-export-skip on its <th> so exports match the view, and a
 *     header with no text falls back to its data-export-label for the menu entry.
 *   - The column menu's rows come from buildRow(): div.nds-form-container.nds-check-container
 *     wrapping div.nds-form-header > label[for] > span.nds-label and div.nds-form-control >
 *     the input — the same skeleton nds-filter generates. Hand-written rows must match it.
 */
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

    // Sort keys are <th> cell indexes, never positions in the sort-button array:
    // a checkbox or actions column has no button, so the two index spaces diverge.
    const thIndex = (th) => th.cellIndex;

    class NDSTables {
        constructor(tableElement) {
            this.valid = false;
            this.table = tableElement;
            // Direct children throughout: a sub-row's nested <table> carries its
            // own thead/tbody, and an unscoped query sweeps the inner table's
            // sort buttons and checkboxes into the outer table's sets.
            this.thead = tableElement.querySelector(':scope > thead');
            this.tbody = tableElement.querySelector(':scope > tbody');
            this.sortButtons = Array.from(this.thead?.querySelectorAll('.nds-sort-btn') || []);

            this.selectAllCheckbox = this.thead?.querySelector('th input[type="checkbox"].nds-check');

            if (!this.thead || !this.tbody) {
                console.warn('NDS Tables: Invalid table structure found');
                return;
            }

            this.isSortable = this.sortButtons.length > 0;
            // Keyed on the header's select-all, not on today's row count: a table
            // that starts empty and gains rows later must still wire selection up.
            this.isSelectable = !!this.selectAllCheckbox;

            // AbortController for the change-listeners attached in
            // setupEventListeners — aborted in destroy() so the per-row
            // bookkeeping detaches cleanly when the table is torn down.
            this.abortController = new AbortController();

            this.valid = true;
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
            const initialState = sortedTh?.querySelector('.nds-sort-btn')
                ? {
                    key: thIndex(sortedTh),
                    dir: NDS.State.has(sortedTh, 'sorted-asc') ? 'asc' : 'desc'
                }
                : null;

            this.sort = NDS.Sort.create(this.table, {
                // Direct children only — a nested <table> inside a <td> is valid
                // HTML (row-expansion / master-detail views), and its rows would
                // otherwise get swept into the outer sort and reparented under
                // this tbody via reorderIn, destroying the nested table.
                items: () => Array.from(this.tbody.querySelectorAll(':scope > tr')),
                reorderIn: this.tbody,
                // The already-scoped set, not a selector — NDS.Sort resolves a
                // string against the whole table, which would bind a nested
                // sub-table's headers to the outer sort.
                triggers: () => this.sortButtons,
                mode: 'cycle',
                a11y: 'sort',
                a11yTarget: (btn) => btn.closest('th'),
                accessor: (row, colIdx) => {
                    // Escape hatch for display/sort-value divergence: authors set
                    // data-sort-value on the <td> when the rendered text would mis-type
                    // (e.g. "Free" in a numeric column, localized dates, etc.)
                    const cell = row.cells[colIdx];
                    if (!cell) return '';
                    const override = cell.getAttribute('data-sort-value');
                    return override !== null ? override : getCellText(cell);
                },
                keyFrom: (btn) => thIndex(btn.closest('th')),
                initialState,
                onChange: ({ key, dir }) => {
                    // Runs after NDS.Sort has already re-appended the parent rows.
                    repairSubPairing(this.tbody);

                    this.sortButtons.forEach(btn => {
                        NDS.State.remove(btn.closest('th'), 'sorted-asc', 'sorted-desc');
                    });

                    const activeBtn = (key != null && dir)
                        ? this.sortButtons.find(btn => thIndex(btn.closest('th')) === key)
                        : null;

                    // Mark the active header for the CSS icon swap in _tables.scss
                    if (activeBtn) {
                        NDS.State.add(activeBtn.closest('th'), dir === 'asc' ? 'sorted-asc' : 'sorted-desc');
                    }

                    const pagedContent = this.tbody.closest('.nds-paged-content');
                    if (pagedContent) NDS.Pagination.refresh(pagedContent);

                    // Back-compat event — existing listeners expect columnIndex + direction
                    this.dispatchSortEvent(key, dir, activeBtn);
                }
            });
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
                    // Own, non-sub rows only — a sub row's nested table bubbles its
                    // checkboxes up here, and this table's counts never move for them.
                    const tr = e.target.closest('tr');
                    if (!tr || tr.parentElement !== this.tbody || tr.classList.contains('nds-sub')) return;

                    // Only the changed row's token moved; re-sweeping every row was
                    // a third O(n) pass on the interaction tick.
                    NDS.State[e.target.checked ? 'add' : 'remove'](tr, 'selected');
                    this.updateSelectAllState();
                    this.dispatchSelectionEvent();
                }, { signal });

                // Filter re-stamps data-filtered on rows without any checkbox
                // event — recompute the header state so select-all stays honest
                // when the filtered view changes under an existing selection.
                this._offFilterWatch = NDS.onAttrChange('tr', ['data-filtered'], (els) => {
                    if (els.some(el => this.tbody.contains(el))) this.updateSelectAllState();
                });
            }
        }

        dispatchSortEvent(columnIndex, direction, button = null) {
            const event = new CustomEvent('nds:table:sort', {
                detail: {
                    columnIndex: columnIndex,
                    direction: direction,
                    table: this.table,
                    button
                },
                bubbles: true
            });

            this.table.dispatchEvent(event);
        }

        // Read live, never cached. Rows are created and deleted at runtime, and the
        // change listener is delegated on tbody so a new row already fires — but a
        // construction-time snapshot left it out of every count and out of
        // selectedRows, so the page saw an empty selection for a row it had just
        // ticked. reinit() cannot repair that: it skips an initialized table.
        get rowCheckboxes() {
            return Array.from(this.tbody?.querySelectorAll(':scope > tr:not(.nds-sub) td input[type="checkbox"].nds-check') || []);
        }

        // Select-all and the header state operate on the FILTERED view only:
        // rows an active filter removed carry data-filtered and are excluded.
        // Pagination-hidden rows (other pages) stay included, matching export.
        // Selections already made on rows a filter later hides persist — the
        // bulk-action truth export and the selection count also report.
        eligibleCheckboxes() {
            return this.rowCheckboxes.filter(checkbox => {
                const tr = checkbox.closest('tr');
                return !(tr && tr.hasAttribute('data-filtered'));
            });
        }

        handleSelectAll(checked) {
            this.eligibleCheckboxes().forEach(checkbox => {
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
            const eligible = this.eligibleCheckboxes();
            const checkedCount = eligible.filter(cb => cb.checked).length;
            const totalCount = eligible.length;

            this.selectAllCheckbox.checked = totalCount > 0 && checkedCount === totalCount;

            const isIndeterminate = checkedCount > 0 && checkedCount < totalCount;
            NDS.Forms.setIndeterminate(this.selectAllCheckbox, isIndeterminate);
        }

        dispatchSelectionEvent() {
            // Resolve each row from its own checkbox rather than by tbody position:
            // sorting re-appends the <tr> nodes (nds-sort.js), and indexing tbody
            // rows by position reported the wrong rows after the first sort.
            const checkboxes = this.rowCheckboxes;
            const selected = checkboxes
                .map((checkbox, index) => ({ checkbox, index }))
                .filter(item => item.checkbox.checked);

            const event = new CustomEvent('nds:table:selection', {
                detail: {
                    selectedCount: selected.length,
                    totalCount: checkboxes.length,
                    selectedRows: selected.map(item => item.checkbox.closest('tr')),
                    selectedIndexes: selected.map(item => item.index),
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
            if (this._offFilterWatch) { this._offFilterWatch(); this._offFilterWatch = null; }
            this.table.ndsTableControls = null;   // the table stays initialized; only its controls go
        }
    }

    // Responsive table handler (similar to expandable pattern)
    class NDSResponsiveTable {
        constructor(tableElement) {
            this.table = tableElement;
            this.wrapper = null;
            this.needsScroll = false;
            this.currentScrollState = null; // Track current state to avoid redundant DOM operations
            this.abortController = new AbortController();

            // Registered here, not in the sweep, so every construction path —
            // sweep, reinit() and programmatic createResponsive() — is reachable.
            tableElement.ndsTableResponsive = this;
            this.init();
        }

        init() {
            this.setupWrapper();
            this.setupEventListeners();
        }

        setupWrapper() {
            if (this.table.parentElement.classList.contains('nds-table-wrapper')) {
                this.wrapper = this.table.parentElement;
            } else {
                this.wrapper = document.createElement('div');
                this.wrapper.className = 'nds-table-wrapper';
                this.table.parentElement.insertBefore(this.wrapper, this.table);
                this.wrapper.appendChild(this.table);
            }
            this.copyMaxWidthToWrapper();
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
                this.wrapper.removeAttribute('data-table-scroll');
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

            const newState = tokens.join(' ');
            if (this.currentScrollState !== newState) {
                // Own attribute, not a data-state token: the shared data-state set carries
                // `td` and `.nds-label` tails, so a write here restyled every row (PERF-06).
                this.wrapper.setAttribute('data-table-scroll', newState);
                this.currentScrollState = newState;
            }
        }

        setupEventListeners() {
            this.wrapper.addEventListener('scroll', NDS.rafThrottle(() => this.handleScroll()), {
                signal: this.abortController.signal
            });

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

            // Tab-change rechecks are wired once at module scope, not per instance.
        }

        recheckWidth() {
            this.checkTableWidth();
        }

        destroy() {
            this.abortController.abort();

            if (this._offResizeTable) { this._offResizeTable(); this._offResizeTable = null; }
            if (this._offResizeWrapper) { this._offResizeWrapper(); this._offResizeWrapper = null; }
            if (this._offIntersect) { this._offIntersect(); this._offIntersect = null; }

            this.wrapper.removeAttribute('data-table-scroll');
            this.currentScrollState = null;
            this.needsScroll = false;
            this.table.removeAttribute('data-nds-tables-initialized');
            this.table.ndsTableResponsive = null;
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

    // Column ops address the outer table only: a sub-row's nested <table> has its
    // own thead/tbody whose cells share no column index with this one. Sub rows
    // are skipped as well — their single colspan <td> isn't a column either.
    // The first header row's cells, not ':scope > thead th': array position has to
    // equal cellIndex — the one space thIndex, applyColumnAlign and the tr.cells
    // writes below all address. A <td> in the header row or a second thead row
    // shifts a th-filtered, thead-wide list out of it, and .cells (not .children)
    // is what skips the <script>/<template> a <tr> may legally carry.
    const headCells = (table) => Array.from(table.querySelector(':scope > thead > tr')?.cells || []);
    const bodyRows = (table) => table.querySelectorAll(':scope > tbody > tr:not(.nds-sub)');

    // `restored` marks a hide replayed from storage at init rather than chosen by
    // the user, so a consumer syncing the event to a server can ignore the replay.
    function setColumnHidden(table, index, hidden, restored = false) {
        const th = headCells(table)[index];
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

        bodyRows(table).forEach(tr => {
            const cell = tr.cells[index];
            if (cell) cell.toggleAttribute('hidden', hidden);
        });

        table.dispatchEvent(new CustomEvent('nds:table:columns', {
            detail: { table, index, hidden, restored },
            bubbles: true
        }));
    }

    // The hidden set persists whenever the table has an id to key on — a UI
    // preference, same tier as the theme, so localStorage rather than a
    // consent-tier cookie. The saved value is "<columnCount>-<hiddenIndex>-…";
    // the count is a fingerprint, so adding or dropping a column in a later
    // deploy discards the stale set instead of hiding the wrong ones.
    const columnsKey = (table) => 'nds-cols-' + table.id;

    function saveHiddenColumns(table) {
        const ths = headCells(table);
        const hidden = ths.flatMap((th, i) => th.hasAttribute('hidden') ? [i] : []);
        try {
            localStorage.setItem(columnsKey(table), [ths.length, ...hidden].join('-'));
        } catch {}
    }

    function restoreHiddenColumns(table) {
        let saved = null;
        try { saved = localStorage.getItem(columnsKey(table)); } catch {}
        if (!saved) return;

        const [count, ...hidden] = saved.split('-').map(Number);
        if (count !== headCells(table).length) return;
        hidden.forEach(index => setColumnHidden(table, index, true, true));
    }

    class NDSColumnToggle {
        constructor(root) {
            this.valid = false;
            this.root = root;
            this.table = NDS.resolveEl(root.getAttribute('data-columns-target') || '');
            this.list = root.querySelector('[data-columns-list]');

            if (!this.table || !this.list) {
                console.warn('NDS Tables: column toggle needs a [data-columns-target] table and a [data-columns-list] host', root);
                return;
            }

            this.valid = true;
            this.persist = !!this.table.id;

            this.abortController = new AbortController();
            // Before init(): render() runs on the menu's first open, so the
            // checklist reads the restored [hidden] and paints the right boxes.
            if (this.persist) restoreHiddenColumns(this.table);
            this.init();
        }

        // Same affordance as the filter button: an icon badge counting the hidden
        // columns, so a persisted hide is visible without opening the menu.
        // The footer rides along — it only earns its space while something is hidden.
        updateTriggerBadge() {
            const count = headCells(this.table).filter(th => th.hasAttribute('hidden')).length;
            NDS.badge(this.root.querySelector('.nds-dropmenu-trigger'), count);
            this.footer.hidden = !count;
        }

        // The filter dropmenu's footer, built rather than authored: divider + action
        // row outside .nds-dropmenu-scroll, so Reset stays pinned while a long column
        // list scrolls. Sibling of the scroll box — never inside the checklist, so
        // render()'s rows can't land under it.
        buildFooter(signal) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'nds-btn nds-secondary nds-md nds-dropmenu-item';
            btn.setAttribute('data-no-auto-close', '');
            btn.addEventListener('click', () => this.showAllColumns(), { signal });

            const label = document.createElement('span');
            label.className = 'nds-label';
            label.textContent = NDS.lang === 'ar' ? 'إعادة تعيين' : 'Reset';
            btn.appendChild(label);

            const action = document.createElement('div');
            action.className = 'nds-dropmenu-action';
            action.appendChild(btn);

            const divider = document.createElement('hr');
            divider.className = 'nds-divider';

            const footer = document.createElement('div');
            footer.className = 'nds-dropmenu-footer';
            footer.append(divider, action);

            (this.list.closest('.nds-dropmenu-menu') || this.root).appendChild(footer);
            return footer;
        }

        showAllColumns() {
            headCells(this.table).forEach((th, index) => {
                if (th.hasAttribute('hidden')) setColumnHidden(this.table, index, false);
            });
            // No-op before the checklist is built — render() reads [hidden] fresh.
            this.list.querySelectorAll('input[data-column-index]').forEach(input => {
                input.checked = true;
            });

            this.updateTriggerBadge();
            if (this.persist) saveHiddenColumns(this.table);
        }

        init() {
            const { signal } = this.abortController;

            this.footer = this.buildFooter(signal);
            this.updateTriggerBadge();

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
                this.updateTriggerBadge();
                if (this.persist) saveHiddenColumns(this.table);
            }, { signal });
        }

        render() {
            const frag = document.createDocumentFragment();
            headCells(this.table).forEach((th, index) => {
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
            this.root.removeAttribute('data-nds-columns-initialized');
        }
    }

    // Global class-change observer so mask toggle reflects without a scroll event
    if (!window.ndsTableClassObserverInitialized) {
        window.ndsTableClassObserverInitialized = true;
        NDS.onAttrChange('.nds-table[data-nds-tables-initialized]', ['class'], (hits) => {
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
                const tables = activePanel.querySelectorAll('.nds-table[data-nds-tables-initialized]');
                tables.forEach(table => {
                    const responsive = table.ndsTableResponsive;
                    if (responsive) {
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

    // ── Column alignment (data-align on the <th>) ─────────────────────
    // One generated rule per aligned column, not a class stamped on each cell:
    // a selector also covers rows that arrive later from sort, filter or
    // pagination, with nothing to re-run. The <th> is aligned by CSS (it paints
    // before this runs); body cells sit under the pre-init skeleton until init,
    // so the rule is in place before they are ever visible.
    // Positional by nature: a colspan in the body shifts the column index.
    const ALIGN = { center: 1, start: 1, end: 1 };
    let alignSheet = null;
    let alignSeq = 0;

    function applyColumnAlign(table) {
        // Through headCells so the nth-child index lands in the same column space
        // the hide/show writes use — a second thead row's cellIndex addresses a
        // different column than its position in a thead-wide list.
        const heads = headCells(table).filter(th => th.hasAttribute('data-align'));
        if (!heads.length) return;

        const rules = [];
        const scope = 'a' + (++alignSeq);
        heads.forEach(th => {
            const align = th.getAttribute('data-align');
            if (!ALIGN[align]) return;
            // Child combinators, not descendants: a sub-row's nested table has
            // its own columns, and a descendant rule would align those too.
            rules.push(`[data-nds-align="${scope}"] > tbody > tr > td:nth-child(${th.cellIndex + 1}){text-align:${align}}`);
        });
        if (!rules.length) return;

        table.setAttribute('data-nds-align', scope);
        if (!alignSheet) {
            alignSheet = document.createElement('style');
            document.head.appendChild(alignSheet);
        }
        alignSheet.textContent += rules.join('');
    }

    // ── Sub-rows (master-detail expansion) ───────────────────────────
    // A parent row pairs with at most one <tr class="nds-sub"> placed directly
    // after it — adjacency IS the pairing, so there is no back-reference to keep
    // in sync. Visibility is the `hidden` attribute: rows can't animate, and CSS
    // paints a pre-rendered open sub before this bundle lands. Content and
    // visibility are decoupled, and the sub's DOM is never torn down, so form
    // state inside it survives a collapse.

    const SUB_TOGGLE = '[data-sub-toggle]';

    const subOf = (tr) => {
        const next = tr.nextElementSibling;
        return next && next.matches('tr.nds-sub') ? next : null;
    };

    // A toggle may live in a dropmenu item rather than on a chevron of its own —
    // and an open dropmenu with data-portal has moved its menu to <body>, so the
    // button has no <tr> ancestor at click time. Dropmenu leaves _ownerDropmenu
    // on the menu for exactly this walk; in-place menus resolve on the first try.
    const rowFor = (btn) =>
        btn.closest('tr')
        || btn.closest('.nds-dropmenu-menu')?._ownerDropmenu?.closest('tr')
        || null;

    // Toggles belonging to a row. A dropmenu item is a valid toggle, and an open
    // dropmenu with data-portal has its menu parked on <body> — outside the row —
    // so reach it back through the wrapper's _ownerMenu backref.
    function rowToggles(tr) {
        const found = Array.from(tr.querySelectorAll(SUB_TOGGLE));
        tr.querySelectorAll('.nds-dropmenu').forEach(dm => {
            const menu = dm._ownerMenu;
            if (menu && !tr.contains(menu)) found.push(...menu.querySelectorAll(SUB_TOGGLE));
        });
        return found;
    }

    // Every toggle driving this sub — the row's own control plus any collapse
    // button authored inside the content. Those are the only two places one can
    // sit, so this beats a table-wide id query and needs no selector escaping.
    const togglesFor = (tr, sub) =>
        [...rowToggles(tr), ...sub.querySelectorAll(SUB_TOGGLE)]
            .filter(btn => btn.getAttribute('aria-controls') === sub.id);

    // The toggle spins while the consumer resolves a sub-request. add/remove, not
    // set/clear, so an existing state token survives. _loading.scss makes loading
    // pointer-events:none and _tables.scss re-enables it here so a second click
    // cancels — every exit path below still has to clear it or the spinner never
    // stops: setContent() on success, close() on error or abort.
    const setToggleLoading = (tr, on) => rowToggles(tr).forEach(btn => {
        if (on) NDS.State.add(btn, 'loading'); else NDS.State.remove(btn, 'loading');
    });

    // Minimum spinner-visible time: a sub-fast fetch would flash the loading state.
    // Only the initial-load path stamps _ndsLoadStart in open(); a refresh of an
    // already-open sub reveals immediately. Cancel paths clear the clock so a
    // second click aborts without waiting out the timer.
    const SUB_MIN_VISIBLE_MS = 500;
    const clearLoadClock = (tr) => {
        if (tr._ndsRevealTimer) { clearTimeout(tr._ndsRevealTimer); tr._ndsRevealTimer = null; }
        tr._ndsLoadStart = null;
    };

    function emitSub(table, name, tr, sub, extra) {
        table.dispatchEvent(new CustomEvent('nds:table:' + name, {
            detail: { row: tr, sub, table, ...extra },
            bubbles: true
        }));
    }

    // A sub has to be addressable by id — it's how the toggles driving it are
    // found and how sort re-pairing relinks it. Authored subs usually carry one;
    // this covers a generated sub and an authored one that left it off.
    function linkSub(tr, sub) {
        if (!sub.id) sub.id = NDS.uniqueId('nds-sub-');
        // Direct backref so re-pairing after a sort holds even while a dropmenu
        // toggle is portaled; the aria-controls walk below covers authored subs
        // JS has never touched.
        sub._ndsRow = tr;

        // Re-derive colspan on every touch rather than trusting the markup: an
        // authored value goes stale the moment a column is added or dropped, and
        // a sub spans every column by definition, so there is nothing to preserve.
        // A sub that starts open still needs one authored for first paint — this
        // corrects it on the first toggle.
        const cell = sub.firstElementChild;
        if (cell) cell.colSpan = tr.cells.length;
        rowToggles(tr).forEach(btn => {
            if (!btn.getAttribute('aria-controls')) btn.setAttribute('aria-controls', sub.id);
        });
        return sub;
    }

    function buildSub(tr) {
        const sub = document.createElement('tr');
        sub.className = 'nds-sub';
        sub.hidden = true;

        sub.appendChild(document.createElement('td'));
        tr.after(sub);
        return linkSub(tr, sub);   // sets colSpan, id and the _ndsRow backref
    }

    function setSubOpen(tr, sub, open) {
        const table = tr.closest('table');
        linkSub(tr, sub);
        sub.hidden = !open;

        togglesFor(tr, sub).forEach(btn => {
            NDS.aria.expanded(btn, open);
            if (open) NDS.State.set(btn, 'open'); else NDS.State.clear(btn);
        });

        emitSub(table, open ? 'sub-open' : 'sub-close', tr, sub);
    }

    // Single-open is the default (accordion parity); a table opts into
    // independent toggles with data-state~="always-open". Enforced when a sub
    // opens, never at init — pre-rendered multi-open markup stays as painted
    // until the first interaction.
    function closeOtherSubs(table, keep) {
        if (NDS.State.has(table, 'always-open')) return;
        table.querySelectorAll(':scope > tbody > tr.nds-sub:not([hidden])').forEach(other => {
            // Backref first: setSubOpen re-runs linkSub, so handing it a wrong row
            // wouldn't just mis-report the event — it would rewrite _ndsRow and
            // corrupt the pairing for good.
            const parent = other._ndsRow || other.previousElementSibling;
            if (other !== keep && parent && parent !== other) setSubOpen(parent, other, false);
        });
    }

    // Sort's item set is ':scope > tr', so subs are re-appended by their own (empty)
    // sort value and end up detached from their parent. Re-pair through the _ndsRow
    // backref, falling back to each sub's id → the toggle controlling it → that
    // toggle's row, so a sub whose backref went stale travels with its parent too.
    // Skips a toggle that sits inside the sub.
    function repairSubPairing(tbody) {
        const inBody = (row) => !!row && row.parentElement === tbody;
        tbody.querySelectorAll(':scope > tr.nds-sub').forEach(sub => {
            let parent = sub._ndsRow;
            if (!inBody(parent) && sub.id) {
                parent = Array.from(tbody.querySelectorAll(`${SUB_TOGGLE}[aria-controls="${CSS.escape(sub.id)}"]`))
                    .map(btn => btn.closest('tr'))
                    .find(row => row !== sub && inBody(row));
            }
            if (inBody(parent) && parent !== sub) parent.after(sub);
        });
    }

    // NDS.Tables.row(tr) — per-row handle. Accepts the sub row itself too, so a
    // collapse control inside the expanded content uses the same call shape as
    // the chevron up in the parent row.
    function rowHandle(tr) {
        if (tr?.classList?.contains('nds-sub')) tr = tr.previousElementSibling;
        if (!tr || tr.tagName !== 'TR') return null;

        const sub = {
            get el() { return subOf(tr); },

            // Takes consumer HTML the same way DataTables' child() does — the
            // markup inside a sub is the consumer's, NDS never renders it.
            setContent(content) {
                const el = subOf(tr);
                const cell = (el ? linkSub(tr, el) : buildSub(tr)).firstElementChild;
                if (typeof content === 'string') cell.innerHTML = content;
                else cell.replaceChildren(content);
                setToggleLoading(tr, false);
                initializeTables();   // wire a nested .nds-table in the new content
                return sub;
            },

            open() {
                const el = subOf(tr);
                const table = tr.closest('table');
                // No sub yet: the consumer answers this by fetching and calling
                // setContent(html).open(). NDS never fetches it (see tables.md).
                // detail.signal lets a cancel drop the request itself rather than
                // just ignore its answer — pass it to fetch / NDS.request.
                if (!el) {
                    tr._ndsSubAbort = new AbortController();
                    tr._ndsLoadStart = performance.now();
                    setToggleLoading(tr, true);
                    emitSub(table, 'sub-request', tr, null, { signal: tr._ndsSubAbort.signal });
                    return sub;
                }

                // Consume the outstanding request, if any. If it was cancelled the
                // answer arrived late and must not pop the sub open — the content
                // still lands, cached for the next click. This is what protects a
                // consumer who never threaded the signal through.
                const pending = tr._ndsSubAbort;
                tr._ndsSubAbort = null;
                if (pending?.signal.aborted) { clearLoadClock(tr); return sub; }

                // Hold the reveal until the spinner has been visible long enough.
                // setContent() just cleared loading synchronously; re-arm so the
                // spinner keeps painting through the wait — no repaint happened
                // between the two calls, so this is a state fixup, not a flicker.
                const start = tr._ndsLoadStart;
                clearLoadClock(tr);
                const reveal = () => {
                    tr._ndsRevealTimer = null;
                    if (start) setToggleLoading(tr, false);   // only clear if we armed it (fetch path)
                    closeOtherSubs(table, el);
                    setSubOpen(tr, el, true);
                };
                const wait = start ? SUB_MIN_VISIBLE_MS - (performance.now() - start) : 0;
                if (wait > 0) {
                    setToggleLoading(tr, true);
                    tr._ndsRevealTimer = setTimeout(reveal, wait);
                } else reveal();
                return sub;
            },

            // Aborts any outstanding request and clears loading unconditionally —
            // with no sub yet this is the consumer's error path, and without it the
            // toggle would spin forever. The abort is a no-op once
            // open() has consumed the controller, so closing a loaded sub is clean.
            close() {
                tr._ndsSubAbort?.abort();
                clearLoadClock(tr);
                setToggleLoading(tr, false);
                const el = subOf(tr);
                if (el) setSubOpen(tr, el, false);
                return sub;
            },

            toggle() {
                const el = subOf(tr);
                return el && !el.hidden ? sub.close() : sub.open();
            }
        };

        return { el: tr, sub };
    }

    // Init pass over authored subs. linkSub normalizes colspan — derived, not
    // authored intent, so unlike open/closed state it IS safe to rewrite here, and
    // without it a sub that ships open keeps a stale span until its first toggle.
    // It also stamps the id and the _ndsRow backref, so repairSubPairing resolves
    // an authored sub off the backref instead of a per-sub tbody-wide query.
    function linkAuthoredSubs(table) {
        table.querySelectorAll(':scope > tbody > tr.nds-sub').forEach(sub => {
            // Backref first, same as closeOtherSubs: re-deriving from adjacency
            // would rewrite _ndsRow with the wrong row whenever a reinit lands
            // while a sort has the sub detached from its parent.
            const parent = sub._ndsRow || sub.previousElementSibling;
            if (parent && !parent.classList.contains('nds-sub')) linkSub(parent, sub);
        });
    }

    // Delegated on document: covers content injected later, needs no per-table
    // wiring, and is independent of the sort/checkbox-gated NDSTables instance —
    // a plain table with no sorting or selection can still carry sub-rows.
    if (!window.ndsTableSubHandlerInitialized) {
        window.ndsTableSubHandlerInitialized = true;

        document.addEventListener('click', (e) => {
            const btn = e.target.closest(SUB_TOGGLE);
            if (!btn || btn.closest('code, .code-example')) return;

            const handle = rowHandle(rowFor(btn));
            if (!handle) return;

            // Second click while a sub-request is outstanding cancels it rather
            // than re-requesting: abort the request, release the toggle. With
            // setContent() on success and close() on the consumer's error path,
            // that's three exits — the control can't be stranded whatever the
            // consumer does or forgets to do.
            if (NDS.State.has(btn, 'loading')) {
                handle.el._ndsSubAbort?.abort();
                clearLoadClock(handle.el);
                setToggleLoading(handle.el, false);
                return;
            }

            // A dangling aria-controls is an authoring typo. The lazy path is the
            // one with no aria-controls at all — it legitimately has no target
            // until the consumer answers nds:table:sub-request.
            const target = btn.getAttribute('aria-controls');
            if (target && !handle.sub.el && !document.getElementById(target)) {
                console.warn(`NDS Tables: [data-sub-toggle] aria-controls="${target}" matches no element.`, btn);
            }

            handle.sub.toggle();
        });
    }

    // Auto-initialize tables on page load (sortable and/or selectable)
    // The init sentinel is stamped only on a construction that succeeded — a table
    // whose <tbody> arrives later must stay eligible for the next reinit().
    function initializeTables() {
        document.querySelectorAll('.nds-table').forEach(table => {
            if (table.closest('code, .code-example')) return;

            // Guarded by the scope stamp: reinit() must not append the rules twice.
            if (!table.hasAttribute('data-nds-align')) applyColumnAlign(table);

            linkAuthoredSubs(table);

            // Every table gets the responsive scroll wrapper. --max-width on the
            // table (inline only) carries over to the wrapper; --min-width on the
            // table controls the scroll breakpoint. The stamp is the component's
            // one init signal: the pre-init cell skeleton and the global handlers
            // below key on it, so it lands for every table, sortable or not.
            if (!table.ndsTableResponsive) {
                new NDSResponsiveTable(table);   // registers itself on the table
                table.setAttribute('data-nds-tables-initialized', 'true');
            }

            // Own header only, matching the constructor's own scoping: a sub-row's
            // nested table carrying sort buttons or a select-all would otherwise
            // construct an inert controller for this table.
            const hasSortButtons = table.querySelector(':scope > thead .nds-sort-btn') !== null;
            const hasCheckboxes = table.querySelector(':scope > thead input[type="checkbox"].nds-check') !== null;

            // Sorting / selection is opt-in by markup and guarded by the instance,
            // so a table whose <tbody> arrives later stays eligible for reinit().
            if ((hasSortButtons || hasCheckboxes) && !table.ndsTableControls) {
                const instance = new NDSTables(table);
                if (instance.valid) table.ndsTableControls = instance;
            }
        });

        // Column-visibility menus live in a toolbar, not in the table
        document.querySelectorAll('[data-columns-target]').forEach(root => {
            if (root.closest('code, .code-example')) return;
            if (root.hasAttribute('data-nds-columns-initialized')) return;

            const instance = new NDSColumnToggle(root);
            if (instance.valid) {
                root.ndsColumnToggle = instance;
                root.setAttribute('data-nds-columns-initialized', 'true');
            }
        });
    }

    function recheckAllWidths() {
        // Keyed on the instance, not the sweep's stamp, so createResponsive()-built
        // tables are rechecked too.
        document.querySelectorAll('.nds-table').forEach(table => {
            table.ndsTableResponsive?.recheckWidth();
        });
    }

    // Public API — the loader calls init(); see components/tables.md for the surface.
    NDS.Tables = {
        init: initializeTables,
        reinit: initializeTables,
        recheckWidths: recheckAllWidths,
        create: (table) => new NDSTables(table),
        createResponsive: (table) => table.ndsTableResponsive || new NDSResponsiveTable(table),
        createColumnToggle: (root) => new NDSColumnToggle(root),
        row: rowHandle,
        setColumnHidden,
        getCellText
    };
})();
