/* NDS.Table — public surface
 * Rides: nds-sort (the sort engine — column cycling, reordering, aria-sort)
 *      · nds-dropmenu (column-visibility menu; a sub-row toggle authored inside a menu item)
 *      · nds-selection (the header select-all)
 *      · nds-pagination (refreshed after a sort re-orders a paged table; soft)
 * Methods:
 *   NDS.Table.init() / .reinit()               scan .nds-table and [data-columns-target] menus
 *   NDS.Table.refresh()                        re-measure every table's responsive scroll state
 *   NDS.Table.create(table)                    sort controls for one table
 *   NDS.Table.createResponsive(table)          the scroll wrapper only
 *   NDS.Table.createColumnToggle(root)         one [data-columns-target] menu
 *   NDS.Table.destroy(el)                      undo whichever of the three lives on el
 *   NDS.Table.getRow(tr)                       per-row handle {el, sub}; the sub row itself
 *                                               is accepted too
 *   ↳ handle.sub.el                             the <tr class="nds-sub">, or null
 *   ↳ handle.sub.setContent(htmlOrNode)         put YOUR markup in the sub (chainable)
 *   ↳ handle.sub.open() / .close() / .toggle()  show / hide it (chainable)
 *   NDS.Table.setColumnHidden(table, i, bool)  hide or show a column by cell index
 *   instance.getSortColumn() / .getSortOrder() / .resetSort()   on create()'s instance
 *   instance.refresh()                    on createResponsive()'s: measure the scroll state again
 * Events (bubble from the <table>):
 *   nds:table:columns      detail {table, index, hidden, restored} — restored:true is a saved
 *                          hide replayed at init, not a user action
 *   nds:table:sub-request  detail {row, sub, table, signal} — there is nothing to show yet.
 *                          Fetch, then answer: NDS.Table.getRow(row).sub.setContent(html).open().
 *                          Pass detail.signal to fetch / NDS.request so a cancel drops it
 *   nds:table:sub-opened   detail {row, sub, table}
 *   nds:table:sub-closed   detail {row, sub, table}
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
 *   - A header checkbox gets data-selection-target (and the <tbody> an id when it has none);
 *     nds-selection.js owns the select-all and row selection from there.
 *   - Columns are addressed by cell index, so colspan/rowspan header cells are not supported.
 *   - Column hides persist in localStorage whenever the table has an id.
 *   - Hiding a column stamps data-export-skip on its <th> so exports match the view, and a
 *     header with no text falls back to its data-export-label for the menu entry.
 *   - The column menu's rows come from _buildRow(): div.nds-form-container.nds-checkbox
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

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('table', {
        reset: 'Reset',
        column: 'Column {n}',
    });

    // The shared cell-text reader lives in core: Export (extras) reads it before Tables loads.
    const getCellText = NDS.getCellText;

    // Sort keys are <th> cell indexes, never positions in the sort-button array:
    // a checkbox or actions column has no button, so the two index spaces diverge.
    const getHeaderIndex = (th) => th.cellIndex;

    const ownedExportSkips = new WeakSet();       // th whose data-export-skip we set (an authored one stays)
    const revealTimers = new WeakMap();           // row → pending sub reveal timeout
    const loadStarts = new WeakMap();             // row → performance.now() when its sub-request began
    const subAbortControllers = new WeakMap();    // row → AbortController of its outstanding sub-request
    const subRows = new WeakMap();                // sub row → its parent row

    class NdsTable {
        constructor(tableElement) {
            this._valid = false;
            this._table = tableElement;
            // Direct children throughout: a sub-row's nested <table> carries its
            // own thead/tbody, and an unscoped query sweeps the inner table's
            // sort buttons and checkboxes into the outer table's sets.
            this._thead = tableElement.querySelector(':scope > thead');
            this._tbody = tableElement.querySelector(':scope > tbody');
            this._sortButtons = Array.from(this._thead?.querySelectorAll('.nds-sort-btn') || []);

            if (!this._thead || !this._tbody) {
                console.warn('NDS Table: Invalid table structure found');
                return;
            }

            this._isSortable = this._sortButtons.length > 0;

            this._valid = true;
            this._table.ndsTableControls = this;
            this.init();
        }

        init() {
            if (this._isSortable) {
                this._setupSort();
            }
            this._setupSelectAll();
        }

        // The header checkbox selects this table's rows through nds-selection.js. Stamped
        // here, after the loader's detection pass, so this table starts Selection itself.
        _setupSelectAll() {
            const all = this._thead.querySelector('th input.nds-checkbox-input');
            if (!all || all.hasAttribute('data-selection-target')) return;
            this._ownSelect = { box: all, id: !this._tbody.id };
            this._tbody.id ||= NDS.getUniqueId('nds-rows-');
            all.setAttribute('data-selection-target', this._tbody.id);
            NDS.Selection.init();
            NDS.Selection.refresh(this._tbody);
        }

        // ── Sort (delegated to NDS.Sort) ─────────────────────────────────

        _setupSort() {
            // Sort seeds from, and writes, sorted-asc / sorted-desc on the <th> (its a11yTarget).
            this._sort = NDS.Sort.create(this._table, {
                // Direct children only — a nested <table> inside a <td> is valid
                // HTML (row-expansion / master-detail views), and its rows would
                // otherwise get swept into the outer sort and reparented under
                // this tbody via reorderIn, destroying the nested table.
                items: () => Array.from(this._tbody.querySelectorAll(':scope > tr')),
                reorderIn: this._tbody,
                // The already-scoped set, not a selector — NDS.Sort resolves a
                // string against the whole table, which would bind a nested
                // sub-table's headers to the outer sort.
                triggers: () => this._sortButtons,
                mode: 'cycle',
                a11y: 'sort',
                a11yTarget: (btn) => btn.closest('th'),
                accessor: (row, columnIndex) => {
                    // Escape hatch for display/sort-value divergence: authors set
                    // data-sort-value on the <td> when the rendered text would mis-type
                    // (e.g. "Free" in a numeric column, localized dates, etc.)
                    const cell = row.cells[columnIndex];
                    if (!cell) return '';
                    const override = cell.getAttribute('data-sort-value');
                    return override !== null ? override : getCellText(cell);
                },
                keyFrom: (btn) => getHeaderIndex(btn.closest('th')),
                onChange: () => {
                    // Runs after NDS.Sort has already re-appended the parent rows.
                    repairSubPairing(this._tbody);

                    const pagedContent = this._tbody.closest('.nds-paged-content');
                    if (pagedContent) NDS.Pagination.refresh(pagedContent);
                }
            });
        }

        // Public API methods
        getSortColumn() {
            const state = this._sort?.getState();
            return state && state.key != null ? state.key : -1;
        }

        getSortOrder() {
            return this._sort?.getState().order || null;
        }

        resetSort() {
            this._sort?.reset();
        }

        destroy() {
            this._sort?.destroy();
            // Selection is delegated: the header box leaves it with the link it was given.
            if (this._ownSelect) {
                this._ownSelect.box.removeAttribute('data-selection-target');
                if (this._ownSelect.id) this._tbody.removeAttribute('id');
                this._ownSelect = null;
            }
            delete this._table.ndsTableControls;   // the table stays initialized; only its controls go
        }
    }

    // Responsive table handler (similar to expandable pattern)
    class NdsTableResponsive {
        constructor(tableElement) {
            this._table = tableElement;
            this._wrapper = null;
            this._needsScroll = false;
            this._currentScrollState = null; // Track current state to avoid redundant DOM operations
            this.abortController = new AbortController();

            // Registered here, not in the sweep, so every construction path —
            // sweep, reinit() and programmatic createResponsive() — is reachable and stamped.
            tableElement.ndsTableResponsive = this;
            this.init();
            tableElement.setAttribute('data-nds-table-initialized', 'true');
        }

        init() {
            this._setupWrapper();
            this._addEventListeners();
        }

        _setupWrapper() {
            if (this._table.parentElement.classList.contains('nds-table-wrapper')) {
                this._wrapper = this._table.parentElement;
            } else {
                this._builtWrapper = true;
                this._wrapper = document.createElement('div');
                this._wrapper.className = 'nds-table-wrapper';
                this._table.parentElement.insertBefore(this._wrapper, this._table);
                this._wrapper.appendChild(this._table);
            }
            this._copyMaxWidthToWrapper();
        }

        _copyMaxWidthToWrapper() {
            // --max-width is only ever set inline — the SCSS consumes it via
            // var(--max-width, 100%) and never sets it as a rule — so read the
            // inline style directly. getComputedStyle here forced a full style
            // recalc of the just-reparented table (~46ms@6.6x on a 100-row table)
            // to read a value that's almost always unset.
            const tableMaxWidth = this._table.style.getPropertyValue('--max-width');
            if (tableMaxWidth && tableMaxWidth.trim() && !this._wrapper.style.getPropertyValue('--max-width')) {
                this._wrapper.style.setProperty('--max-width', tableMaxWidth.trim());
                this._ownMaxWidth = true;
            }
        }

        _checkTableWidth() {
            const { scrollWidth, clientWidth } = this._wrapper;

            if (scrollWidth > clientWidth) {
                this._needsScroll = true;
                this._currentScrollState = null; // Force _handleScroll to update
                this._handleScroll();
            } else {
                NDS.state.clear(this._wrapper);
                this._needsScroll = false;
                this._currentScrollState = null;
            }
            this._setScrollFocus(this._needsScroll);
        }

        // A sideways scroll box the keyboard can reach: Safari never focuses one on its own.
        // Named after the table, so a screen reader says what it scrolls. What the author wrote stays.
        _setScrollFocus(on) {
            const wrapper = this._wrapper;
            if (on === !!this._scrollStamp) return;
            if (!on) {
                this._scrollStamp.forEach((attribute) => wrapper.removeAttribute(attribute));
                this._scrollStamp = null;
                return;
            }
            const stamp = this._scrollStamp = [];
            const set = (attribute, value) => { if (value && !wrapper.hasAttribute(attribute)) { wrapper.setAttribute(attribute, value); stamp.push(attribute); } };
            set('tabindex', '0');
            const name = this._table.getAttribute('aria-label') || this._table.caption?.textContent.trim();
            const by = this._table.getAttribute('aria-labelledby');
            if (name || by) set('role', 'region');
            if (name) set('aria-label', name); else set('aria-labelledby', by);
        }

        _handleScroll() {
            if (!this._needsScroll) return;

            const { scrollLeft, scrollWidth, clientWidth } = this._wrapper;
            const maxScroll = scrollWidth - clientWidth;
            const isRtl = NDS.isRtl;

            const tokens = ['has-more'];

            if (isRtl) {
                if (Math.abs(scrollLeft) <= 5) tokens.push('at-start');
                if (Math.abs(scrollLeft) >= maxScroll - 5) tokens.push('at-end');
            } else {
                if (scrollLeft <= 5) tokens.push('at-start');
                if (scrollLeft >= maxScroll - 5) tokens.push('at-end');
            }

            const newState = tokens.join(' ');
            if (this._currentScrollState !== newState) {
                NDS.state.set(this._wrapper, ...tokens);
                this._currentScrollState = newState;
            }
        }

        _addEventListeners() {
            this._wrapper.addEventListener('scroll', NDS.throttleToFrame(() => this._handleScroll()), {
                signal: this.abortController.signal
            });

            // The RO's first delivery runs the initial overflow check
            // immediately — it fires post-layout so the scrollWidth read is free.
            // Column-width locking is owned by pagination (lockTableColumns in
            // nds-pagination.js, grow-only per shown page). Later
            // deliveries are debounced to coalesce resize storms.
            let firstMeasure = true;
            const checkTable = NDS.debounce(() => this._checkTableWidth(), 100);
            const handleSizeChange = () => {
                if (firstMeasure) {
                    firstMeasure = false;
                    this._checkTableWidth();
                } else {
                    checkTable();
                }
            };
            this._offResizeTable = NDS.onElementResize(this._table, handleSizeChange);
            this._offResizeWrapper = NDS.onElementResize(this._wrapper, handleSizeChange);

            // Detect visibility changes (when tab becomes visible)
            const onVisibleDebounced = NDS.debounce(() => this._checkTableWidth(), 150);
            this._offIntersect = NDS.onIntersect(this._wrapper, (entry) => {
                if (entry.isIntersecting) onVisibleDebounced();
            }, { threshold: 0.1 });

            // Tab-change rechecks are wired once at module scope, not per instance.
        }

        refresh() {
            this._checkTableWidth();
        }

        destroy() {
            this.abortController.abort();

            if (this._offResizeTable) { this._offResizeTable(); this._offResizeTable = null; }
            if (this._offResizeWrapper) { this._offResizeWrapper(); this._offResizeWrapper = null; }
            if (this._offIntersect) { this._offIntersect(); this._offIntersect = null; }

            NDS.state.clear(this._wrapper);
            this._setScrollFocus(false);
            this._currentScrollState = null;
            this._needsScroll = false;
            // A wrapper this built goes, the table back in its place; an authored one keeps its own style.
            if (this._builtWrapper) this._wrapper.replaceWith(this._table);
            else if (this._ownMaxWidth) this._wrapper.style.removeProperty('--max-width');
            this._table.removeAttribute('data-nds-table-initialized');
            delete this._table.ndsTableResponsive;
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
    // equal cellIndex — the one space getHeaderIndex, syncColumnAlign and the tr.cells
    // writes below all address. A <td> in the header row or a second thead row
    // shifts a th-filtered, thead-wide list out of it, and .cells (not .children)
    // is what skips the <script>/<template> a <tr> may legally carry.
    const getHeadCells = (table) => Array.from(table.querySelector(':scope > thead > tr')?.cells || []);
    const getBodyRows = (table) => table.querySelectorAll(':scope > tbody > tr:not(.nds-sub)');

    // `restored` marks a hide replayed from storage at init rather than chosen by
    // the user, so a consumer syncing the event to a server can ignore the replay.
    function setColumnHidden(table, index, hidden, restored = false) {
        const th = getHeadCells(table)[index];
        if (!th) return;

        th.toggleAttribute('hidden', hidden);

        // Hiding a column skips it in exports. Only ever clear a data-export-skip
        // we set ourselves — an authored one (an actions column, say) must survive
        // a hide/show round trip.
        if (hidden && !th.hasAttribute('data-export-skip')) {
            th.setAttribute('data-export-skip', '');
            ownedExportSkips.add(th);
        } else if (!hidden && ownedExportSkips.has(th)) {
            th.removeAttribute('data-export-skip');
            ownedExportSkips.delete(th);
        }

        getBodyRows(table).forEach(tr => {
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
    const getColumnsKey = (table) => 'nds-cols-' + table.id;

    function saveHiddenColumns(table) {
        const ths = getHeadCells(table);
        const hidden = ths.flatMap((th, i) => th.hasAttribute('hidden') ? [i] : []);
        try {
            localStorage.setItem(getColumnsKey(table), [ths.length, ...hidden].join('-'));
        } catch {}
    }

    function restoreHiddenColumns(table) {
        let saved = null;
        try { saved = localStorage.getItem(getColumnsKey(table)); } catch {}
        if (!saved) return;

        const [count, ...hidden] = saved.split('-').map(Number);
        if (count !== getHeadCells(table).length) return;
        hidden.forEach(index => setColumnHidden(table, index, true, true));
    }

    class NdsTableColumnToggle {
        constructor(root) {
            this._valid = false;
            this._root = root;
            this._table = NDS.resolveElement(root.getAttribute('data-columns-target') || '');
            this._list = root.querySelector('[data-columns-list]');

            if (!this._table || !this._list) {
                console.warn('NDS Table: column toggle needs a [data-columns-target] table and a [data-columns-list] host', root);
                return;
            }

            this._valid = true;
            // Stamped here so a programmatic create() is skipped by the next sweep.
            this._root.ndsColumnToggle = this;
            this._root.setAttribute('data-nds-columns-initialized', 'true');
            this._persist = !!this._table.id;

            this.abortController = new AbortController();
            // Before init(): render() runs on the menu's first open, so the
            // checklist reads the restored [hidden] and paints the right boxes.
            if (this._persist) restoreHiddenColumns(this._table);
            this.init();
        }

        // Same affordance as the filter button: an icon badge counting the hidden
        // columns, so a persisted hide is visible without opening the menu.
        // The footer rides along — it only earns its space while something is hidden.
        _syncTriggerBadge() {
            const count = getHeadCells(this._table).filter(th => th.hasAttribute('hidden')).length;
            NDS.setBadge(this._root.querySelector('.nds-dropmenu-trigger'), count);
            this._footer.hidden = !count;
        }

        // The filter dropmenu's footer, built rather than authored: divider + action
        // row outside .nds-dropmenu-scroll, so Reset stays pinned while a long column
        // list scrolls. Sibling of the scroll box — never inside the checklist, so
        // render()'s rows can't land under it.
        _buildFooter(signal) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'nds-btn nds-secondary nds-md nds-dropmenu-item';
            btn.setAttribute('data-no-auto-close', '');
            btn.addEventListener('click', () => this._showAllColumns(), { signal });

            const label = document.createElement('span');
            label.className = 'nds-label';
            label.textContent = strings.text('reset');
            btn.appendChild(label);

            const action = document.createElement('div');
            action.className = 'nds-dropmenu-action';
            action.appendChild(btn);

            const divider = document.createElement('hr');
            divider.className = 'nds-divider';

            const footer = document.createElement('div');
            footer.className = 'nds-dropmenu-footer';
            footer.append(divider, action);

            (this._list.closest('.nds-dropmenu-menu') || this._root).appendChild(footer);
            return footer;
        }

        _showAllColumns() {
            getHeadCells(this._table).forEach((th, index) => {
                if (th.hasAttribute('hidden')) setColumnHidden(this._table, index, false);
            });
            // No-op before the checklist is built — render() reads [hidden] fresh.
            this._list.querySelectorAll('input[data-column-index]').forEach(input => {
                input.checked = true;
            });

            this._syncTriggerBadge();
            if (this._persist) saveHiddenColumns(this._table);
        }

        init() {
            const { signal } = this.abortController;

            this._footer = this._buildFooter(signal);
            this._syncTriggerBadge();

            // An authored list wins — a server-rendered checklist paints before
            // this bundle lands. The host's <legend> is always authored, so test
            // for a generated row rather than for children.
            if (!this._list.querySelector('.nds-form-container')) {
                // Populate on first open, not at init: reading <thead> and building
                // a row per column costs more than an unopened menu is worth. Same
                // deferred-build hook nds-filter.js uses (_wireDeferredFilterDropmenus):
                // data-delay shows a loading state on the trigger, emits
                // nds:dropmenu:prepare so we build, then opens with the content already
                // in place — never empty, never mis-measured. One-shot; later opens are
                // immediate. Released by the same abort signal in destroy().
                // An authored delay wins; destroy() takes back only this one.
                if (!this._root.hasAttribute('data-delay')) {
                    this._root.setAttribute('data-delay', '500');
                    this._ownDelay = true;
                }
                this._root.addEventListener('nds:dropmenu:prepare', () => this._render(), { once: true, signal });
            }

            this._list.addEventListener('change', (e) => {
                if (!e.target.matches('input[data-column-index]')) return;
                setColumnHidden(this._table, Number(e.target.dataset.columnIndex), !e.target.checked);
                this._syncTriggerBadge();
                if (this._persist) saveHiddenColumns(this._table);
            }, { signal });
        }

        _render() {
            const frag = document.createDocumentFragment();
            getHeadCells(this._table).forEach((th, index) => {
                // Locked columns and the row-selection column stay off the list.
                if (th.hasAttribute('data-columns-lock')) return;
                if (th.querySelector('input[type="checkbox"].nds-checkbox-input')) return;
                frag.appendChild(this._buildRow(th, index));
            });
            this._list.appendChild(frag);
        }

        // The .nds-checkbox field nds-filter.js and nds-multiselect.js put
        // in a dropmenu. No .nds-dropmenu-item class — that's what keeps the menu
        // open while columns are toggled.
        _buildRow(th, index) {
            const id = NDS.getUniqueId('nds-col-');

            const container = document.createElement('div');
            container.className = 'nds-form-container nds-checkbox';

            const header = document.createElement('div');
            header.className = 'nds-form-header';
            const label = document.createElement('label');
            label.setAttribute('for', id);
            const labelText = document.createElement('span');
            labelText.className = 'nds-label';
            // Prefer the visible header text — data-export-label exists precisely
            // because the exported name differs from the displayed one.
            labelText.textContent = getCellText(th) || th.dataset.exportLabel || strings.text('column', { n: index + 1 });
            label.appendChild(labelText);
            header.appendChild(label);

            const control = document.createElement('div');
            control.className = 'nds-form-control';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = id;
            input.className = 'nds-checkbox-input';
            input.dataset.columnIndex = index;
            input.checked = !th.hasAttribute('hidden');
            control.appendChild(input);

            container.append(header, control);
            return container;
        }

        destroy() {
            this.abortController?.abort();
            // The rows render() built stay: the next create() reads them as the list.
            this._footer?.remove();
            if (this._ownDelay) this._root.removeAttribute('data-delay');
            this._root.removeAttribute('data-nds-columns-initialized');
            delete this._root.ndsColumnToggle;
        }
    }

    // ── Column alignment (data-align on the <th>) ─────────────────────
    // One generated rule per aligned column, not a class stamped on each cell:
    // a selector also covers rows that arrive later from sort, filter or
    // pagination, with nothing to re-run. The <th> is aligned by CSS (it paints
    // before this runs); body cells sit under the pre-init skeleton until init,
    // so the rule is in place before they are ever visible.
    // Positional by nature: a colspan in the body shifts the column index.
    const alignValues = { center: 1, start: 1, end: 1 };
    let alignSheet = null;
    let alignSeq = 0;

    function syncColumnAlign(table) {
        // Through getHeadCells so the nth-child index lands in the same column space
        // the hide/show writes use — a second thead row's cellIndex addresses a
        // different column than its position in a thead-wide list.
        const heads = getHeadCells(table).filter(th => th.hasAttribute('data-align'));
        if (!heads.length) return;

        const rules = [];
        const scope = 'a' + (++alignSeq);
        heads.forEach(th => {
            const align = th.getAttribute('data-align');
            if (!alignValues[align]) return;
            // Child combinators, not descendants: a sub-row's nested table has
            // its own columns, and a descendant rule would align those too.
            rules.push(`[data-nds-align="${scope}"] > tbody > tr > td:nth-child(${th.cellIndex + 1}){text-align:${align}}`);
        });
        if (!rules.length) return;

        table.setAttribute('data-nds-align', scope);
        // A constructed sheet, not a <style>: no CSP style-src governs it, so a
        // nonce, hash or 'self' policy keeps the alignment.
        if (!alignSheet) {
            alignSheet = new CSSStyleSheet();
            document.adoptedStyleSheets = [...document.adoptedStyleSheets, alignSheet];
        }
        rules.forEach(rule => alignSheet.insertRule(rule, alignSheet.cssRules.length));
    }

    // ── Sub-rows (master-detail expansion) ───────────────────────────
    // A parent row pairs with at most one <tr class="nds-sub"> placed directly
    // after it — adjacency IS the pairing, so there is no back-reference to keep
    // in sync. Visibility is the `hidden` attribute: rows can't animate, and CSS
    // paints a pre-rendered open sub before this bundle lands. Content and
    // visibility are decoupled, and the sub's DOM is never torn down, so form
    // state inside it survives a collapse.

    const SUB_TOGGLE = '[data-sub-toggle]';

    const findSub = (tr) => {
        const next = tr.nextElementSibling;
        return next && next.matches('tr.nds-sub') ? next : null;
    };

    // A toggle may live in a dropmenu item rather than on a chevron of its own.
    const findRow = (btn) => btn.closest('tr');

    // Toggles belonging to a row, a dropmenu item among them.
    const getRowToggles = (tr) => Array.from(tr.querySelectorAll(SUB_TOGGLE));

    // Every toggle driving this sub — the row's own control plus any collapse
    // button authored inside the content. Those are the only two places one can
    // sit, so this beats a table-wide id query and needs no selector escaping.
    const getSubToggles = (tr, sub) =>
        [...getRowToggles(tr), ...sub.querySelectorAll(SUB_TOGGLE)]
            .filter(btn => btn.getAttribute('aria-controls') === sub.id);

    // The toggle spins while the consumer resolves a sub-request. add/remove, not
    // set/clear, so an existing state token survives. _loading.scss makes loading
    // pointer-events:none and _table.scss re-enables it here so a second click
    // cancels — every exit path below still has to clear it or the spinner never
    // stops: setContent() on success, close() on error or abort.
    const setToggleLoading = (tr, on) => getRowToggles(tr).forEach(btn => {
        if (on) NDS.state.add(btn, 'loading'); else NDS.state.remove(btn, 'loading');
    });

    // Minimum spinner-visible time: a sub-fast fetch would flash the loading state.
    // Only the initial-load path records a loadStarts entry in open(); a refresh of an
    // already-open sub reveals immediately. Cancel paths clear the clock so a
    // second click aborts without waiting out the timer.
    const SUB_MIN_VISIBLE_MS = 500;
    const clearLoadClock = (tr) => {
        clearTimeout(revealTimers.get(tr));
        revealTimers.delete(tr);
        loadStarts.delete(tr);
    };

    function dispatchSub(table, name, tr, sub, extra) {
        table.dispatchEvent(new CustomEvent('nds:table:' + name, {
            detail: { row: tr, sub, table, ...extra },
            bubbles: true
        }));
    }

    // A sub has to be addressable by id — it's how the toggles driving it are
    // found and how sort re-pairing relinks it. Authored subs usually carry one;
    // this covers a generated sub and an authored one that left it off.
    function linkSub(tr, sub) {
        if (!sub.id) sub.id = NDS.getUniqueId('nds-sub-');
        // Direct backref so re-pairing after a sort holds; the aria-controls walk
        // below covers authored subs
        // JS has never touched.
        subRows.set(sub, tr);

        // Re-derive colspan on every touch rather than trusting the markup: an
        // authored value goes stale the moment a column is added or dropped, and
        // a sub spans every column by definition, so there is nothing to preserve.
        // A sub that starts open still needs one authored for first paint — this
        // corrects it on the first toggle.
        const cell = sub.firstElementChild;
        if (cell) cell.colSpan = tr.cells.length;
        getRowToggles(tr).forEach(btn => {
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
        return linkSub(tr, sub);   // sets colSpan, id and the subRows backref
    }

    function setSubOpen(tr, sub, open) {
        const table = tr.closest('table');
        linkSub(tr, sub);
        sub.hidden = !open;

        getSubToggles(tr, sub).forEach(btn => {
            NDS.aria.expanded(btn, open);
            if (open) NDS.state.set(btn, 'open'); else NDS.state.clear(btn);
        });

        dispatchSub(table, open ? 'sub-opened' : 'sub-closed', tr, sub);
    }

    // Single-open is the default (accordion parity); a table opts into
    // independent toggles with data-state~="always-open". Enforced when a sub
    // opens, never at init — pre-rendered multi-open markup stays as painted
    // until the first interaction.
    function closeOtherSubs(table, keep) {
        if (NDS.state.has(table, 'always-open')) return;
        table.querySelectorAll(':scope > tbody > tr.nds-sub:not([hidden])').forEach(other => {
            // Backref first: setSubOpen re-runs linkSub, so handing it a wrong row
            // wouldn't just mis-report the event — it would rewrite subRows and
            // corrupt the pairing for good.
            const parent = subRows.get(other) || other.previousElementSibling;
            if (other !== keep && parent && parent !== other) setSubOpen(parent, other, false);
        });
    }

    // Sort's item set is ':scope > tr', so subs are re-appended by their own (empty)
    // sort value and end up detached from their parent. Re-pair through the subRows
    // backref, falling back to each sub's id → the toggle controlling it → that
    // toggle's row, so a sub whose backref went stale travels with its parent too.
    // Skips a toggle that sits inside the sub.
    function repairSubPairing(tbody) {
        const isInBody = (row) => !!row && row.parentElement === tbody;
        tbody.querySelectorAll(':scope > tr.nds-sub').forEach(sub => {
            let parent = subRows.get(sub);
            if (!isInBody(parent) && sub.id) {
                parent = Array.from(tbody.querySelectorAll(`${SUB_TOGGLE}[aria-controls="${CSS.escape(sub.id)}"]`))
                    .map(btn => btn.closest('tr'))
                    .find(row => row !== sub && isInBody(row));
            }
            if (isInBody(parent) && parent !== sub) parent.after(sub);
        });
    }

    // NDS.Table.getRow(tr) — per-row handle. Accepts the sub row itself too, so a
    // collapse control inside the expanded content uses the same call shape as
    // the chevron up in the parent row.
    function getRowHandle(tr) {
        if (tr?.classList?.contains('nds-sub')) tr = tr.previousElementSibling;
        if (!tr || tr.tagName !== 'TR') return null;

        const sub = {
            get el() { return findSub(tr); },

            // Takes consumer HTML the same way DataTables' child() does — the
            // markup inside a sub is the consumer's, NDS never renders it.
            setContent(content) {
                const el = findSub(tr);
                const cell = (el ? linkSub(tr, el) : buildSub(tr)).firstElementChild;
                if (typeof content === 'string') cell.innerHTML = content;
                else cell.replaceChildren(content);
                setToggleLoading(tr, false);
                setupTables();   // wire a nested .nds-table in the new content
                return sub;
            },

            open() {
                const el = findSub(tr);
                const table = tr.closest('table');
                // No sub yet: the consumer answers this by fetching and calling
                // setContent(html).open(). NDS never fetches it (see tables.md).
                // detail.signal lets a cancel drop the request itself rather than
                // just ignore its answer — pass it to fetch / NDS.request.
                if (!el) {
                    const abortController = new AbortController();
                    subAbortControllers.set(tr, abortController);
                    loadStarts.set(tr, performance.now());
                    setToggleLoading(tr, true);
                    dispatchSub(table, 'sub-request', tr, null, { signal: abortController.signal });
                    return sub;
                }

                // Consume the outstanding request, if any. If it was cancelled the
                // answer arrived late and must not pop the sub open — the content
                // still lands, cached for the next click. This is what protects a
                // consumer who never threaded the signal through.
                const pending = subAbortControllers.get(tr);
                subAbortControllers.delete(tr);
                if (pending?.signal.aborted) { clearLoadClock(tr); return sub; }

                // Hold the reveal until the spinner has been visible long enough.
                // setContent() just cleared loading synchronously; re-arm so the
                // spinner keeps painting through the wait — no repaint happened
                // between the two calls, so this is a state fixup, not a flicker.
                const start = loadStarts.get(tr);
                clearLoadClock(tr);
                const reveal = () => {
                    revealTimers.delete(tr);
                    if (start) setToggleLoading(tr, false);   // only clear if we armed it (fetch path)
                    closeOtherSubs(table, el);
                    setSubOpen(tr, el, true);
                };
                const wait = start ? SUB_MIN_VISIBLE_MS - (performance.now() - start) : 0;
                if (wait > 0) {
                    setToggleLoading(tr, true);
                    revealTimers.set(tr, setTimeout(reveal, wait));
                } else reveal();
                return sub;
            },

            // Aborts any outstanding request and clears loading unconditionally —
            // with no sub yet this is the consumer's error path, and without it the
            // toggle would spin forever. The abort is a no-op once
            // open() has consumed the controller, so closing a loaded sub is clean.
            close() {
                subAbortControllers.get(tr)?.abort();
                clearLoadClock(tr);
                setToggleLoading(tr, false);
                const el = findSub(tr);
                if (el) setSubOpen(tr, el, false);
                return sub;
            },

            toggle() {
                const el = findSub(tr);
                return el && !el.hidden ? sub.close() : sub.open();
            }
        };

        return { el: tr, sub };
    }

    // Init pass over authored subs. linkSub normalizes colspan — derived, not
    // authored intent, so unlike open/closed state it IS safe to rewrite here, and
    // without it a sub that ships open keeps a stale span until its first toggle.
    // It also stamps the id and the subRows backref, so repairSubPairing resolves
    // an authored sub off the backref instead of a per-sub tbody-wide query.
    function linkAuthoredSubs(table) {
        table.querySelectorAll(':scope > tbody > tr.nds-sub').forEach(sub => {
            // Backref first, same as closeOtherSubs: re-deriving from adjacency
            // would rewrite subRows with the wrong row whenever a reinit lands
            // while a sort has the sub detached from its parent.
            const parent = subRows.get(sub) || sub.previousElementSibling;
            if (parent && !parent.classList.contains('nds-sub')) linkSub(parent, sub);
        });
    }

    // Delegated on document: covers content injected later, needs no per-table
    // wiring, and is independent of the sort/checkbox-gated NdsTable instance —
    // a plain table with no sorting or selection can still carry sub-rows.
    document.addEventListener('click', (e) => {
        const btn = e.target.closest(SUB_TOGGLE);
        if (!btn || btn.closest('code')) return;

        const handle = getRowHandle(findRow(btn));
        if (!handle) return;

        // Second click while a sub-request is outstanding cancels it rather
        // than re-requesting: abort the request, release the toggle. With
        // setContent() on success and close() on the consumer's error path,
        // that's three exits — the control can't be stranded whatever the
        // consumer does or forgets to do.
        if (NDS.state.has(btn, 'loading')) {
            subAbortControllers.get(handle.el)?.abort();
            clearLoadClock(handle.el);
            setToggleLoading(handle.el, false);
            return;
        }

        // A dangling aria-controls is an authoring typo. The lazy path is the
        // one with no aria-controls at all — it legitimately has no target
        // until the consumer answers nds:table:sub-request.
        const target = btn.getAttribute('aria-controls');
        if (target && !handle.sub.el && !document.getElementById(target)) {
            console.warn(`NDS Table: [data-sub-toggle] aria-controls="${target}" matches no element.`, btn);
        }

        handle.sub.toggle();
    });

    // Auto-initialize tables on page load (sortable and/or selectable)
    // The init sentinel is stamped only on a construction that succeeded — a table
    // whose <tbody> arrives later must stay eligible for the next reinit().
    function setupTables() {
        document.querySelectorAll('.nds-table').forEach(table => {
            if (table.closest('code')) return;

            // Guarded by the scope stamp: reinit() must not append the rules twice.
            if (!table.hasAttribute('data-nds-align')) syncColumnAlign(table);

            linkAuthoredSubs(table);

            // Every table gets the responsive scroll wrapper. --max-width on the
            // table (inline only) carries over to the wrapper; --min-width on the
            // table controls the scroll breakpoint. The stamp is the component's
            // one init signal: the pre-init cell skeleton and the global handlers
            // below key on it, so it lands for every table, sortable or not.
            if (!table.ndsTableResponsive) new NdsTableResponsive(table);   // registers and stamps itself

            // Own header only, matching the constructor's own scoping: a sub-row's
            // nested table carrying sort buttons or a select-all would otherwise
            // construct an inert controller for this table.
            const hasSortButtons = table.querySelector(':scope > thead .nds-sort-btn') !== null;
            const hasCheckboxes = table.querySelector(':scope > thead input[type="checkbox"].nds-checkbox-input') !== null;

            // Sorting / selection is opt-in by markup and guarded by the instance,
            // so a table whose <tbody> arrives later stays eligible for reinit().
            if ((hasSortButtons || hasCheckboxes) && !table.ndsTableControls) {
                new NdsTable(table); // constructor self-registers table.ndsTableControls when valid
            }
        });

        // Column-visibility menus live in a toolbar, not in the table
        document.querySelectorAll('[data-columns-target]').forEach(root => {
            if (root.closest('code')) return;
            if (root.hasAttribute('data-nds-columns-initialized')) return;

            new NdsTableColumnToggle(root); // stamps and registers itself when valid
        });
    }

    function syncAllWidths() {
        // Keyed on the instance, not the sweep's stamp, so createResponsive()-built
        // tables are rechecked too.
        document.querySelectorAll('.nds-table').forEach(table => {
            table.ndsTableResponsive?.refresh();
        });
    }

    // Public API — the loader calls init(); see components/table.md for the surface.
    NDS.Table = {
        init: setupTables,
        reinit: setupTables,
        refresh: syncAllWidths,
        // The constructors publish their expando only on success → null on a bail.
        create: (table) => {
            if (!table.ndsTableControls) new NdsTable(table);
            return table.ndsTableControls || null;
        },
        createResponsive: (table) => table.ndsTableResponsive || new NdsTableResponsive(table),
        createColumnToggle: (root) => {
            if (!root.ndsColumnToggle) new NdsTableColumnToggle(root);
            return root.ndsColumnToggle || null;
        },
        destroy: (el) => {
            el?.ndsTableControls?.destroy();
            el?.ndsTableResponsive?.destroy();
            el?.ndsColumnToggle?.destroy();
        },
        getRow: getRowHandle,
        setColumnHidden
    };
})();
