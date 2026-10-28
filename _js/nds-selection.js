/* NDS.Selection — public surface
 * Rides: nds-forms (the indeterminate select-all box) · nds-filter (data-filtered; soft)
 * Methods:
 *   NDS.Selection.init()                    wire the document listeners (the loader calls this)
 *   NDS.Selection.reinit()                  resync every list after the DOM changed
 *   NDS.Selection.refresh(list?)            resync one list (its id or the element); with no
 *                                           list, every list — the NDS.init.refresh hook
 *   NDS.Selection.selectAll(list, on=true, scope)  check or clear every item a filter shows, but
 *                                           not a disabled box; scope 'page' = only the current page
 *   NDS.Selection.clear(list)               clear EVERY item, filter-hidden and box-less too, but
 *                                           not a disabled box
 *   NDS.Selection.getSelected(list)         the selected items, in DOM order
 *   NDS.Selection.isSelected(item)          the one "is this item selected" rule (export reads it)
 *   NDS.Selection.destroy()                 detach the listeners
 * Events (bubble from the list):
 *   nds:selection:change   detail {list, items, count, total} — on a box or select-all change,
 *                          on selectAll() and clear(), and when items come or go and the count moves
 * Hooks:
 *   data-selection-target   the id of a list. On an input.nds-checkbox-input it is that list's select-all,
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
 *     table is its own list. An item's box is its FIRST input.nds-checkbox-input.
 *   - The count covers EVERY selected item, including other pages and items a filter hides —
 *     the bulk-action truth export sends. Select-all skips the items a filter hides.
 *   - An item with a checkbox mirrors it into data-state="selected". An item without one
 *     counts by its data-state: the page sets it, and selectAll() and clear() write it.
 *   - A disabled box (:disabled, a disabled fieldset too) is the page's to set: select-all,
 *     the Select all and Clear all links and clear() leave it, and the half-checked state and
 *     the links count only the items users can change. A checked one still counts as selected.
 *   - Ship .nds-selection-view with `hidden` so first paint is right before this bundle
 *     lands; the component swaps it against .nds-records-view.
 *   - data-state="has-selection" sits on the counter while anything is selected.
 */

(function () {
    'use strict';

    let controller = null;
    let offs = [];
    let pagesOff = null;
    // Last count per list: a DOM-driven resync fires the event only when the count moved.
    const counts = new WeakMap();

    // An item's own box is its FIRST input.nds-checkbox-input, so a checklist inside a card never selects the card.
    const getBox = (item) => item.querySelector('input.nds-checkbox-input');
    const isSelected = (item) => NDS.state.has(item, 'selected') || !!getBox(item)?.checked;
    // A disabled box is the page's to set: select-all, its links and clear() leave it, as AG Grid
    // and TanStack Table skip rows that cannot be selected. :disabled covers a disabled fieldset.
    const canSelect = (item) => !getBox(item)?.matches(':disabled');

    // A sub row's nested table stays its own list (NDS.findOwnItems).
    function getItems(list) {
        const paged = list.querySelectorAll('.nds-page-item');
        return NDS.findOwnItems(list, paged.length ? paged : list.children);
    }

    // The list a select-all box drives, or null for an item box.
    function getTargetList(box) {
        const id = box.getAttribute('data-selection-target');
        return id ? document.getElementById(id) : null;
    }

    // What the filter shows, and with `page` only the page Pagination shows (the select-all box's scope).
    const getScope = (items, page) => items.filter(i => !i.hasAttribute('data-filtered') && !(page && i.hidden));

    const getAllBoxes = (list) => list.id
        ? document.querySelectorAll(`input.nds-checkbox-input[data-selection-target="${list.id}"]`)
        : [];

    // Every list something on the page counts or selects.
    function getLists() {
        const set = new Set();
        document.querySelectorAll('[data-selection-target]').forEach(el => {
            if (el.closest('code')) return;
            const list = document.getElementById(el.getAttribute('data-selection-target'));
            if (list) set.add(list);
        });
        return set;
    }

    function mirror(items) {
        items.forEach(item => {
            const box = getBox(item);
            if (box) NDS.state[box.checked ? 'add' : 'remove'](item, 'selected');
        });
    }

    // Select-all boxes, counters, then the event.
    function sync(list, fire) {
        const items = getItems(list);
        const selected = items.filter(isSelected);
        const count = selected.length;

        const allBoxes = getAllBoxes(list);
        if (allBoxes.length) {
            watchPages();
            // Box-less items count too: selectAll() selects them.
            const shown = getScope(items, true).filter(canSelect);
            const on = shown.filter(isSelected).length;
            allBoxes.forEach(box => {
                box.checked = on > 0 && on === shown.length;
                NDS.Checkbox.setIndeterminate(box, on > 0 && on < shown.length);
            });
        }

        if (list.id) {
            const rest = getScope(items, false).some(i => canSelect(i) && !isSelected(i));
            // Clear all needs a selected item it can clear: a checked disabled box stays.
            const clearable = items.some(i => canSelect(i) && isSelected(i));
            document.querySelectorAll(`[data-selection-target="${list.id}"]:not(input.nds-checkbox-input)`).forEach(wrap => {
                wrap.querySelectorAll('[data-selection-count]').forEach(el => { el.textContent = NDS.formatNumber(count); });
                wrap.querySelectorAll('[data-selection-total]').forEach(el => { el.textContent = NDS.formatNumber(items.length); });
                wrap.querySelectorAll('[data-selection-all]').forEach(btn => { btn.hidden = !count || !rest; });
                wrap.querySelectorAll('[data-selection-clear]').forEach(btn => { btn.hidden = rest || !clearable; });
                if (count) NDS.state.add(wrap, 'has-selection');
                else NDS.state.remove(wrap, 'has-selection');
                const records = wrap.querySelector('.nds-records-view');
                const view = wrap.querySelector('.nds-selection-view');
                if (records) records.hidden = count > 0;
                if (view) view.hidden = count === 0;
            });
        }

        const prev = counts.get(list);
        counts.set(list, count);
        if (fire || (prev !== undefined && prev !== count)) {
            list.dispatchEvent(new CustomEvent('nds:selection:change', {
                bubbles: true,
                detail: { list, items: selected, count, total: items.length }
            }));
        }
    }

    function recount(list) {
        list = NDS.resolveElement(list);
        if (!list) return;
        mirror(getItems(list));
        sync(list, false);
    }

    function recountAll() {
        getLists().forEach(recount);
    }

    function selectAll(list, on = true, scope) {
        init();
        list = NDS.resolveElement(list);
        if (!list) return;
        const shown = getScope(getItems(list), scope === 'page').filter(canSelect);
        // Every item takes the state, a box-less one too, as clear() clears it.
        shown.forEach(item => {
            const box = getBox(item);
            if (box) box.checked = on;
            NDS.state[on ? 'add' : 'remove'](item, 'selected');
        });
        sync(list, true);
    }

    // Every item, filter-hidden and box-less ones too, but not a disabled box: the reset after a bulk action.
    function clear(list) {
        init();
        list = NDS.resolveElement(list);
        if (!list) return;
        getItems(list).filter(canSelect).forEach(item => {
            const box = getBox(item);
            if (box) box.checked = false;
            NDS.state.remove(item, 'selected');
        });
        sync(list, true);
    }

    function getSelected(list) {
        list = NDS.resolveElement(list);
        return list ? getItems(list).filter(isSelected) : [];
    }

    function handleChange(e) {
        const box = e.target;
        if (!(box instanceof Element) || !box.matches('input.nds-checkbox-input')) return;
        const allList = getTargetList(box);
        if (allList) { selectAll(allList, box.checked, 'page'); return; }

        // The innermost list wins: a sub row's nested table never moves its outer table.
        let list = null;
        for (const candidate of getLists()) if (candidate.contains(box) && (!list || list.contains(candidate))) list = candidate;
        if (!list) return;
        const item = getItems(list).find(i => i.contains(box));
        if (!item || getBox(item) !== box) return;
        NDS.state[box.checked ? 'add' : 'remove'](item, 'selected');
        sync(list, true);
    }

    function handleClick(e) {
        const btn = e.target instanceof Element && e.target.closest('[data-selection-all], [data-selection-clear]');
        const wrap = btn?.closest('[data-selection-target]');
        const list = wrap && NDS.resolveElement(wrap.getAttribute('data-selection-target'));
        if (!list) return;
        if (btn.hasAttribute('data-selection-all')) selectAll(list);
        else clear(list);
        // The clicked button just hid itself: hand focus to the one that took its place, else the select-all box.
        if (btn.hidden) {
            (wrap.querySelector('[data-selection-all]:not([hidden]), [data-selection-clear]:not([hidden])') || getAllBoxes(list)[0])?.focus();
        }
    }

    // A page turn moves which items a select-all box covers, with no change event.
    // Wired on first sight of a box, so pages without one never add `hidden` to the shared observer.
    function watchPages() {
        if (pagesOff || !controller) return;
        pagesOff = NDS.onAttributeChange('.nds-page-item', ['hidden'], resyncFor);
    }

    function resyncFor(elements) {
        getLists().forEach(list => { if (elements.some(el => list.contains(el))) sync(list, false); });
    }

    function init() {
        if (controller) return;
        controller = new AbortController();
        document.addEventListener('change', handleChange, { signal: controller.signal });
        document.addEventListener('click', handleClick, { signal: controller.signal });

        // Items added or removed fire no change event — ride the shared DOM bus
        // (items with a box; an item marked only by data-state needs refresh()).
        const refresh = NDS.debounce(recountAll, 150);
        offs = [
            refresh.cancel,
            NDS.onDomAdd('input.nds-checkbox-input', refresh),
            NDS.onDomRemove('input.nds-checkbox-input', refresh),
            // A filter moves which items select-all covers, with no change event.
            NDS.onAttributeChange('*', ['data-filtered'], resyncFor),
        ];

        // Server-rendered checked boxes count from the first pass.
        recountAll();
    }

    function destroy() {
        if (!controller) return;
        controller.abort();
        controller = null;
        offs.forEach(off => off());
        offs = [];
        pagesOff?.();
        pagesOff = null;
    }

    // With no list (the loader's hook), refresh updates every list: counters and select-all
    // boxes sit outside the list, so the container the walk passes would match nothing.
    // refresh, selectAll and clear call init() first: the loader starts Selection only when a
    // list is on the page at load, so a list added later gets the listeners from its first call.
    NDS.Selection = {
        init, reinit: recountAll, refresh: (list) => { init(); if (list) return recount(list); recountAll(); },
        selectAll, clear, getSelected, isSelected, destroy
    };
})();
