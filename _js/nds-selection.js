/**
 * NDS Selection Count
 * Content-agnostic selected-items counter for records widgets.
 *
 * An element carrying data-selection-target="<list id>" gets:
 *   - its [data-selection-count] slots stamped with the number of selected
 *     items in that list — ALL of them, including rows on other pages and
 *     rows a filter currently hides (the bulk-action truth, matching what
 *     export's "selected" scope exports)
 *   - its [data-selection-total] slots stamped with the list's item count,
 *     so a standalone "x selected of y" needs no pagination (paged lists
 *     can use pagination's [data-paged-count] instead)
 *   - its .nds-records-view / .nds-selection-view children (when present)
 *     swapped via the hidden attribute — author ships .nds-selection-view
 *     with `hidden` so first paint is correct before this bundle loads
 *   - data-state="has-selection" toggled while anything is selected (a free
 *     styling hook for selection-mode chrome)
 *
 * Selection rule: NDS.isRowSelected (nds-core.js) — data-state~=selected on
 * the item (tables) OR a checked input.nds-check inside it (cards, JS-less
 * checkbox lists). One document-level change listener; it runs after
 * nds-tables' select-all and row handlers, so counts read settled state.
 *
 * Public API:
 *   NDS.Selection.init()          — wire the document listener (loader-called)
 *   NDS.Selection.reinit()        — recount every widget (after dynamic DOM)
 *   NDS.Selection.recount(listId) — recount one list's widgets
 *   NDS.Selection.destroy()       — detach the listener
 */

(function () {
    'use strict';
    if (typeof window === 'undefined') return;

    let _controller = null;
    let _offs = [];

    // A list's countable items: its .nds-page-item set when paged/filterable,
    // else its direct children (mirrors export's generic adapter shape).
    function itemsOf(list) {
        const items = list.querySelectorAll('.nds-page-item');
        return items.length ? Array.from(items) : Array.from(list.children);
    }

    function recount(listId) {
        const wraps = document.querySelectorAll(`[data-selection-target="${listId}"]`);
        if (!wraps.length) return;
        const list = document.getElementById(listId);
        const items = list ? itemsOf(list) : [];
        const count = items.filter(NDS.isRowSelected).length;
        wraps.forEach(wrap => {
            wrap.querySelectorAll('[data-selection-count]').forEach(el => { el.textContent = NDS.formatNumber(count); });
            wrap.querySelectorAll('[data-selection-total]').forEach(el => { el.textContent = NDS.formatNumber(items.length); });
            if (count) NDS.State.add(wrap, 'has-selection');
            else NDS.State.remove(wrap, 'has-selection');
            const records = wrap.querySelector('.nds-records-view');
            const selection = wrap.querySelector('.nds-selection-view');
            if (records) records.hidden = count > 0;
            if (selection) selection.hidden = count === 0;
        });
    }

    function recountAll() {
        const ids = new Set();
        document.querySelectorAll('[data-selection-target]')
            .forEach(w => ids.add(w.getAttribute('data-selection-target')));
        ids.forEach(recount);
    }

    function init() {
        if (_controller) return;
        _controller = new AbortController();

        // Any .nds-check change (a row box, a card box, or a table select-all —
        // whose own change arrives after nds-tables has already settled the row
        // boxes) → recount every widget. Widget counts are cheap and few.
        document.addEventListener('change', (e) => {
            if (e.target instanceof Element && e.target.matches('input.nds-check')) recountAll();
        }, { signal: _controller.signal });

        // Items added or removed fire no change event — ride the shared DOM
        // bus (every selectable item carries an input.nds-check) so counts and
        // totals stay live, matching pagination's own auto-refresh.
        const refresh = NDS.debounce(recountAll, 150);
        _offs = [
            NDS.onDOMAdd('input.nds-check', refresh),
            NDS.onDOMRemove('input.nds-check', refresh),
        ];

        // Initial pass — server-rendered checked boxes count from first wire.
        recountAll();
    }

    function destroy() {
        if (!_controller) return;
        _controller.abort();
        _controller = null;
        _offs.forEach(off => off());
        _offs = [];
    }

    NDS.Selection = { init, reinit: recountAll, recount, destroy };
})();
