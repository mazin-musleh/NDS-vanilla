/* NDS.Grid — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Grid.init()                 watch every divided grid on the page
 *   NDS.Grid.refresh(el)            mark now, and watch a divided grid added after load — el or the grids inside it
 *   NDS.Grid.destroy(el)            stop watching, and take back the marks
 * Events:
 *   (none)
 * Hooks:
 *   .nds-last-row   written on the items of a divided grid's last visual row; Definition List's
 *                   divided rules read it
 * Gotchas:
 *   - Only .nds-grid.nds-divided is watched: a plain grid runs no script.
 *   - The rows are measured, not counted: a grid whose columns change with its width re-marks
 *     itself when its first item resizes.
 */
// NDS Grid — the last visual row of a divided grid, which no selector can reach in an auto-fit grid
(() => {
    'use strict';

    const SEL = '.nds-divided.nds-grid';
    const CLS = 'nds-last-row';

    // Reads only; returns the class writes so the pooled ResizeObserver can
    // run every grid's reads before any write.
    function mark(grid) {
        const items = grid.children;
        if (!items.length) return;
        let first = items.length; // hidden/non-laid-out grid: no last row
        if (grid.offsetParent) {
            const lastTop = items[items.length - 1].offsetTop;
            first = items.length - 1;
            while (first > 0 && items[first - 1].offsetTop === lastTop) first--;
        }
        return () => { for (let i = 0; i < items.length; i++) items[i].classList.toggle(CLS, i >= first); };
    }

    // Each grid marks itself from the ResizeObserver, which delivers after
    // layout: the offsetTop reads never force one, the first delivery is the
    // initial scan, and a grid that reflows (viewport resized, items added
    // or removed) re-marks on its own. A scheduled first scan (idle, DCL, after
    // the reveal paint) always raced the time-sliced inits and forced a
    // full-page layout (~1–2s on a table page at 6.6×).
    // The FIRST ITEM is observed, not the grid: the mark shrinks the grid (and
    // the last row's items) inside its own callback, the "ResizeObserver loop"
    // error. Rows depend only on column width and order, which the first item's
    // width tracks, and its content box never moves with the mark.
    // ponytail: fixed-width tracks (a consumer --_tracks) change columns without resizing it; observe the grid too if one needs it.
    // A grid that leaves the DOM releases its observer entry, else an SPA
    // that remounts grids retains every discarded one. Subscribed on the
    // first watch so a page without grids never starts the DOM bus for it.
    const offs = new WeakMap();
    let releasing = false;
    function unwatch(grid) { offs.get(grid)?.(); offs.delete(grid); }
    function watch(grid) {
        if (offs.has(grid)) return;
        const first = grid.firstElementChild;
        offs.set(grid, first ? NDS.onElementResize(first, () => (held(grid) ? undefined : mark(grid))) : () => {});
        if (releasing) return;
        releasing = true;
        NDS.onDOMRemove(SEL, (grids) => grids.forEach(unwatch));
        // A re-observed first item delivers again, so the grid re-marks in the observer without forcing layout.
        NDS.onChildrenChange(SEL, (grids) => grids.forEach((g) => { if (offs.has(g)) { unwatch(g); watch(g); } }));
    }

    // Before the reveal, off-screen sections are content-visibility:auto, and Chrome
    // tracks their size with its own observer: a mark that resizes one raises the
    // "ResizeObserver loop" error. Those grids mark once data-nds-loaded drops cv, still off-screen.
    const root = document.documentElement;
    const waiting = new Set();
    function held(grid) {
        if (root.hasAttribute('data-nds-loaded')) return false;
        const sec = grid.closest('.nds-content-section');
        if (!sec || sec.getBoundingClientRect().top < innerHeight || getComputedStyle(sec).contentVisibility !== 'auto') return false;
        if (!waiting.size) {
            const off = NDS.onAttrChange('html', ['data-nds-loaded'], () => {
                off();
                waiting.forEach((g) => { if (g.isConnected) { unwatch(g); watch(g); } });
                waiting.clear();
            });
        }
        waiting.add(grid);
        return true;
    }

    function gridsIn(container) {
        return container && container.matches?.(SEL)
            ? [container]
            : (container || document).querySelectorAll(SEL);
    }

    // Explicit re-scan (marks now, so the read may force layout) and the
    // registration path for grids added after load.
    function update(container) {
        const grids = gridsIn(container);
        for (let g = 0; g < grids.length; g++) { watch(grids[g]); const write = mark(grids[g]); if (write) write(); }
    }

    // Observe only — no reads at init: the observer's first delivery marks.
    function init() { const grids = gridsIn(); for (let g = 0; g < grids.length; g++) watch(grids[g]); }

    // Stops watching and takes back the marks it wrote.
    function destroy(container) {
        const grids = gridsIn(container);
        for (let g = 0; g < grids.length; g++) {
            unwatch(grids[g]);
            waiting.delete(grids[g]);
            for (const item of grids[g].children) item.classList.remove(CLS);
        }
    }

    NDS.Grid = { init, refresh: update, destroy };
})();
