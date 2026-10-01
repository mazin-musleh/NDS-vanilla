/* NDS.Selection — public surface
 * Rides: nds-forms (the indeterminate select-all box) · nds-filter (data-filtered; soft)
 * Methods:
 *   NDS.Selection.init()                    wire the document listeners (the loader calls this)
 *   NDS.Selection.reinit()                  resync every list after the DOM changed
 *   NDS.Selection.refresh()                 same resync, as the NDS.Init.refresh hook — takes no
 *                                           container, because counters sit outside the list
 *   NDS.Selection.recount(list)             resync one list (its id or the element)
 *   NDS.Selection.selectAll(list, on=true, scope)  check or clear every item a filter shows;
 *                                           scope 'page' = only the items on the current page
 *   NDS.Selection.clear(list)               clear EVERY item, filter-hidden and box-less too
 *   NDS.Selection.selected(list)            the selected items, in DOM order
 *   NDS.Selection.isSelected(item)          the one "is this item selected" rule (export reads it)
 *   NDS.Selection.destroy()                 detach the listeners
 * Events (bubble from the list):
 *   nds:selection:change   detail {list, items, count, total} — on a box or select-all change,
 *                          on selectAll() and clear(), and when items come or go and the count moves
 * Hooks:
 *   data-selection-target   the id of a list. On an input.nds-check it is that list's select-all,
 *                           which acts on and shows the current page only — other pages keep
 *                           their picks (nds-tables stamps a table's header checkbox); on
 *                           anything else it is a counter
 *   data-selection-all      a button in a counter: selects every item a filter shows. Hidden
 *                           unless some, but not all, of those items are selected
 *   data-selection-clear    a button in a counter: clear() on click. Shown only once every item a filter
 *                           shows is selected, so it and data-selection-all never show together
 *   data-selection-count    slots the counter fills with the selected count
 *   data-selection-total    slots the counter fills with the list's item count
 * Gotchas:
 *   - A list's items are its .nds-page-item elements, else its direct children. A <tbody>
 *     keeps only its own rows, and sub rows (tr.nds-sub) are never items, so a nested
 *     table is its own list. An item's box is its FIRST input.nds-check.
 *   - The count covers EVERY selected item, including other pages and items a filter hides —
 *     the bulk-action truth export sends. Select-all skips the items a filter hides.
 *   - An item with a checkbox mirrors it into data-state="selected". An item without one
 *     keeps whatever data-state the page set, and counts by it.
 *   - Ship .nds-selection-view with `hidden` so first paint is right before this bundle
 *     lands; the component swaps it against .nds-records-view.
 *   - data-state="has-selection" sits on the counter while anything is selected.
 */

(function () {
    'use strict';

    let _controller = null;
    let _offs = [];
    let _pagesOff = null;
    // Last count per list: a DOM-driven resync fires the event only when the count moved.
    const _counts = new WeakMap();

    const resolve = (list) => typeof list === 'string' ? document.getElementById(list) : list;
    // An item's own box is its FIRST input.nds-check, so a checklist inside a card never selects the card.
    const boxOf = (item) => item.querySelector('input.nds-check');
    const isSelected = (item) => NDS.State.has(item, 'selected') || !!boxOf(item)?.checked;

    // Pagination's rule: a <tbody> owns only its own rows, so a sub row's nested table stays its own list.
    function itemsOf(list) {
        const paged = list.querySelectorAll('.nds-page-item');
        return Array.from(paged.length ? paged : list.children)
            .filter(el => !el.classList.contains('nds-sub') && (list.tagName !== 'TBODY' || el.parentElement === list));
    }

    // The list a select-all box drives, or null for an item box.
    function listOfAll(box) {
        const id = box.getAttribute('data-selection-target');
        return id ? document.getElementById(id) : null;
    }

    // What the filter shows, and with `page` only the page Pagination shows (the select-all box's scope).
    const scopeOf = (items, page) => items.filter(i => !i.hasAttribute('data-filtered') && !(page && i.hidden));

    const allBoxesOf = (list) => list.id
        ? document.querySelectorAll(`input.nds-check[data-selection-target="${list.id}"]`)
        : [];

    // Every list something on the page counts or selects.
    function lists() {
        const set = new Set();
        document.querySelectorAll('[data-selection-target]').forEach(el => {
            const list = document.getElementById(el.getAttribute('data-selection-target'));
            if (list) set.add(list);
        });
        return set;
    }

    function mirror(items) {
        items.forEach(item => {
            const box = boxOf(item);
            if (box) NDS.State[box.checked ? 'add' : 'remove'](item, 'selected');
        });
    }

    // Select-all boxes, counters, then the event.
    function sync(list, fire) {
        const items = itemsOf(list);
        const selected = items.filter(isSelected);
        const count = selected.length;

        const alls = allBoxesOf(list);
        if (alls.length) {
            watchPages();
            const shown = scopeOf(items, true).map(boxOf).filter(Boolean);
            const on = shown.filter(b => b.checked).length;
            alls.forEach(box => {
                box.checked = on > 0 && on === shown.length;
                NDS.Forms.setIndeterminate(box, on > 0 && on < shown.length);
            });
        }

        if (list.id) {
            const rest = scopeOf(items, false).some(i => !isSelected(i));
            document.querySelectorAll(`[data-selection-target="${list.id}"]:not(input.nds-check)`).forEach(wrap => {
                wrap.querySelectorAll('[data-selection-count]').forEach(el => { el.textContent = NDS.formatNumber(count); });
                wrap.querySelectorAll('[data-selection-total]').forEach(el => { el.textContent = NDS.formatNumber(items.length); });
                wrap.querySelectorAll('[data-selection-all]').forEach(btn => { btn.hidden = !count || !rest; });
                wrap.querySelectorAll('[data-selection-clear]').forEach(btn => { btn.hidden = !count || rest; });
                if (count) NDS.State.add(wrap, 'has-selection');
                else NDS.State.remove(wrap, 'has-selection');
                const records = wrap.querySelector('.nds-records-view');
                const view = wrap.querySelector('.nds-selection-view');
                if (records) records.hidden = count > 0;
                if (view) view.hidden = count === 0;
            });
        }

        const prev = _counts.get(list);
        _counts.set(list, count);
        if (fire || (prev !== undefined && prev !== count)) {
            list.dispatchEvent(new CustomEvent('nds:selection:change', {
                bubbles: true,
                detail: { list, items: selected, count, total: items.length }
            }));
        }
    }

    function recount(list) {
        list = resolve(list);
        if (!list) return;
        mirror(itemsOf(list));
        sync(list, false);
    }

    function recountAll() {
        lists().forEach(recount);
    }

    function selectAll(list, on = true, scope) {
        list = resolve(list);
        if (!list) return;
        const shown = scopeOf(itemsOf(list), scope === 'page');
        shown.forEach(item => { const box = boxOf(item); if (box) box.checked = on; });
        mirror(shown);
        sync(list, true);
    }

    // Every item, filter-hidden and box-less ones too: the reset after a bulk action.
    function clear(list) {
        list = resolve(list);
        if (!list) return;
        itemsOf(list).forEach(item => {
            const box = boxOf(item);
            if (box) box.checked = false;
            NDS.State.remove(item, 'selected');
        });
        sync(list, true);
    }

    function selected(list) {
        list = resolve(list);
        return list ? itemsOf(list).filter(isSelected) : [];
    }

    function onChange(e) {
        const box = e.target;
        if (!(box instanceof Element) || !box.matches('input.nds-check')) return;
        const allList = listOfAll(box);
        if (allList) { selectAll(allList, box.checked, 'page'); return; }

        // The innermost list wins: a sub row's nested table never moves its outer table.
        let list = null;
        for (const l of lists()) if (l.contains(box) && (!list || list.contains(l))) list = l;
        if (!list) return;
        const item = itemsOf(list).find(i => i.contains(box));
        if (!item || boxOf(item) !== box) return;
        NDS.State[box.checked ? 'add' : 'remove'](item, 'selected');
        sync(list, true);
    }

    function onClick(e) {
        const btn = e.target instanceof Element && e.target.closest('[data-selection-all], [data-selection-clear]');
        const wrap = btn?.closest('[data-selection-target]');
        const list = wrap && resolve(wrap.getAttribute('data-selection-target'));
        if (!list) return;
        if (btn.hasAttribute('data-selection-all')) selectAll(list);
        else clear(list);
        // The clicked button just hid itself: hand focus to the one that took its place, else the select-all box.
        if (btn.hidden) {
            (wrap.querySelector('[data-selection-all]:not([hidden]), [data-selection-clear]:not([hidden])') || allBoxesOf(list)[0])?.focus();
        }
    }

    // A page turn moves which items a select-all box covers, with no change event.
    // Wired on first sight of a box, so pages without one never add `hidden` to the shared observer.
    function watchPages() {
        if (_pagesOff || !_controller) return;
        _pagesOff = NDS.onAttrChange('.nds-page-item', ['hidden'], resyncFor);
    }

    function resyncFor(els) {
        lists().forEach(list => { if (els.some(el => list.contains(el))) sync(list, false); });
    }

    function init() {
        if (_controller) return;
        _controller = new AbortController();
        document.addEventListener('change', onChange, { signal: _controller.signal });
        document.addEventListener('click', onClick, { signal: _controller.signal });

        // Items added or removed fire no change event — ride the shared DOM bus
        // (every selectable item carries an input.nds-check).
        const refresh = NDS.debounce(recountAll, 150);
        _offs = [
            NDS.onDOMAdd('input.nds-check', refresh),
            NDS.onDOMRemove('input.nds-check', refresh),
            // A filter moves which items select-all covers, with no change event.
            NDS.onAttrChange('*', ['data-filtered'], resyncFor),
        ];

        // Server-rendered checked boxes count from the first pass.
        recountAll();
    }

    function destroy() {
        if (!_controller) return;
        _controller.abort();
        _controller = null;
        _offs.forEach(off => off());
        _offs = [];
        _pagesOff?.();
        _pagesOff = null;
    }

    // refresh ignores the container on purpose: counters and select-all boxes sit outside
    // the list, so a container handed in would match nothing. It calls init() first because
    // the walk dispatches an owner's refresh INSTEAD of its init: on a page with no list at
    // load, the listener was never wired.
    NDS.Selection = {
        init, reinit: recountAll, refresh: () => { init(); recountAll(); },
        recount, selectAll, clear, selected, isSelected, destroy
    };
})();
