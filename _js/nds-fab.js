/**
 * NDS Fab — routes floating action buttons into fixed edge docks.
 *
 * Ownership is inverted from a plain container: the POSITION lives on the FAB
 * and docks are static edge slots. A FAB is moved into the slot matching its
 * position, so FABs that resolve to the same edge stack together while `auto`
 * FABs follow their panel — the two goals don't fight.
 *
 *   .nds-fab           marks an element (button or container) as a FAB — the
 *                      routing marker, exactly like every other NDS component's
 *                      root class. init() scans for this.
 *   data-fab-pos       which edge (optional; absent === auto). The DOCKS are
 *                      static physical positions (left / right / bottom); a
 *                      FAB resolves to one — so the FAB is free to move while
 *                      the docks stay put and logical/physical never overlap:
 *     left | right | bottom   that physical dock (fixed, regardless of dir)
 *     start | end             LOGICAL — resolves by direction: end → left in
 *                             RTL / right in LTR; start → the mirror
 *     auto                    follow the toggled panel to its edge
 *                             (data-panel-toggle → panel data-panel-side); a
 *                             top sheet or a FAB with no panel → the reading-end
 *                             edge; a bottom sheet resolves to the bottom dock
 *
 * Delegated: routing runs after the reveal. A FAB ships with `hidden`, so the
 * universal [hidden] rule in _fold.scss (blocking critical CSS) keeps it off
 * first paint; register() strips the attribute once the FAB is docked, so it
 * never flashes at its source spot.
 * Injected FABs (built by another component) call NDS.Fab.register(fab).
 */

(function () {
    'use strict';

    const INIT_ATTR = 'data-nds-fab-initialized';
    const DEFAULT_POS = 'right';   // physical default edge

    const order = (el) => parseInt(el.dataset.fabOrder, 10) || 0;
    // Measured px, trimmed to 2dp: a hundredth of a pixel is far under a device
    // pixel, and it keeps an inspected --_fab-ride readable vs a 16-digit float.
    const px = (n) => Math.round(n * 100) / 100 + 'px';
    // A JS-made dock always stamps its position (below), but an authored bare
    // <div class="nds-fab-dock"> may omit it — treat that as 'right' so both
    // resolve to the same edge.
    const dockPos = (el) => el.dataset.fabDockPos || DEFAULT_POS;

    // Map a side to one of the PHYSICAL docks. Physical left/right/bottom pass
    // through unchanged; logical start/end resolve by direction (so `end` lands
    // in the left dock on an RTL page, the right dock on LTR). That's what lets
    // a FAB move between edges while the docks themselves stay static.
    function sideToEdge(side) {
        if (side === 'left' || side === 'right' || side === 'bottom') return side;
        if (side === 'start') return NDS.isRTL ? 'right' : 'left';
        return NDS.isRTL ? 'left' : 'right';   // 'end' (default), a top sheet, or unknown
    }

    // Resolve a FAB's target dock. Any explicit position resolves directly;
    // only 'auto' (or absent) follows the toggled panel's side, falling back to
    // the reading-end edge when there's no panel.
    function resolvePos(fab, override) {
        const p = override || fab.dataset.fabPos || 'auto';
        if (p !== 'auto') return sideToEdge(p);
        const panel = fab.dataset.panelToggle ? document.getElementById(fab.dataset.panelToggle) : null;
        return sideToEdge(panel ? (panel.getAttribute('data-panel-side') || 'end') : 'end');
    }

    // Find the static slot at `pos`, creating it lazily if absent.
    function dock(pos) {
        const want = pos || DEFAULT_POS;
        let el = [...document.querySelectorAll('.nds-fab-dock')].find(d => dockPos(d) === want);
        if (!el) {
            el = document.createElement('div');
            el.className = 'nds-fab-dock';
            el.dataset.fabDockPos = want;   // always stamp (incl. 'right') so the DOM is unambiguous
            document.body.appendChild(el);
        }
        return el;
    }

    // Move a FAB into its resolved slot, keeping the slot ordered by
    // data-fab-order (default 0) so cross-source stacking is deterministic.
    // `override` forces a position, ignoring the FAB's own data-fab-pos.
    function register(fab, override) {
        if (!fab) return null;
        const d = dock(resolvePos(fab, override));
        d.appendChild(fab);
        [...d.children].sort((a, b) => order(a) - order(b)).forEach(c => d.appendChild(c));
        fab.removeAttribute('hidden');   // reveal now that it's docked (it ships `hidden` to avoid a pre-route flash)
        fab.setAttribute(INIT_ATTR, 'true');
        setupRuntime();
        return d;
    }

    // Ride the panel: a thumb sits ON the edge its panel slides from, so an open
    // panel would bury it. Shift it aside by the panel's width and the two read
    // as one attached control (the .nds-sidemenu-toggle behaviour, but the
    // distance is a knob on the panel, so CSS alone can't reach it).
    //
    // Only the FAB that owns the toggle moves — or the group holding it, since a
    // grouped toggle's .nds-fab is the group — and only a thumb, the shape that
    // reads as attached.
    //
    // A bottom sheet is the bottom dock's counterpart: that thumb is flush to the
    // floor, so the sheet rises through it and the ride runs on the block axis
    // instead. A top sheet never reaches a bottom dock, so it's skipped.
    // Note this is the thumb's OWN edge only — a full-width sheet also covers the
    // side docks, but those thumbs aren't attached to the floor, so they hold.
    function ridePanel(panel) {
        if (!panel.id) return;
        const side = panel.getAttribute('data-panel-side') || 'end';
        if (side === 'top') return;

        // Reads the START of the slide, not its end: data-state gains `open` up
        // front and `closing` before the return trip, where nds:panel:opened
        // only lands after the transition — too late to travel together.
        const riding = NDS.State.has(panel, 'open') && !NDS.State.has(panel, 'closing');
        const sheet = side === 'bottom';
        const edge = sideToEdge(side);

        // Size is settled the moment `open` lands: the panel animates on transform,
        // which never reflows it — and a pure translate leaves the rect's own
        // width/height untouched, so it can be read mid-slide. Measured on the first
        // thumb that rides and reused for the rest — a panel with no thumb never
        // measures, and no thumb's style write forces a reflow for the next's read.
        // getBoundingClientRect, NOT offsetWidth/offsetHeight: those round to whole
        // pixels, and a sheet capped at 60svh minus the live header offset is almost
        // never an integer — rounding up sends the thumb a pixel past the edge.
        // The whole function goes in the var so one CSS rule carries either axis.
        let ride;

        document.querySelectorAll('[data-panel-toggle="' + panel.id + '"]').forEach(btn => {
            const fab = btn.closest('.nds-fab');
            if (!fab || !fab.classList.contains('nds-fab-thumb')) return;
            if (resolvePos(fab) !== edge) return;   // not the same edge — nothing to ride

            if (!riding) { fab.removeAttribute('data-fab-riding'); return; }
            if (ride === undefined) {
                const rect = panel.getBoundingClientRect();
                ride = sheet
                    ? 'translateY(-' + px(rect.height) + ')'
                    : 'translateX(' + (edge === 'left' ? '' : '-') + px(rect.width) + ')';
            }
            fab.style.setProperty('--_fab-ride', ride);
            fab.setAttribute('data-fab-riding', '');
        });
    }

    // One-time page-level setup, wired on the first routed FAB.
    let runtimeSet = false;
    function setupRuntime() {
        if (runtimeSet) return;
        runtimeSet = true;

        // Tuck the docks out to their edge as the page bottom nears, so a fixed
        // dock never covers page-end content. Footer-independent: a zero-height
        // sentinel at the end of <body> marks the bottom; one pooled observer
        // (rootMargin lifts the trigger ~120px early) toggles data-fab-tucked
        // on <html>; CSS slides the docks out.
        const sentinel = document.createElement('div');
        sentinel.className = 'nds-fab-sentinel';
        NDS.aria.hidden(sentinel, true);
        document.body.appendChild(sentinel);
        NDS.onIntersect(sentinel, (entry) => {
            // Skip on a short page (sentinel always in view) so the FAB isn't
            // hidden permanently — only tuck when there's room to scroll.
            const scrollable = document.documentElement.scrollHeight - window.innerHeight > 4;
            document.documentElement.toggleAttribute('data-fab-tucked', entry.isIntersecting && scrollable);
        }, { rootMargin: '0px 0px 120px 0px' });

        // One pooled observer for every panel on the page.
        NDS.onAttrChange('.nds-panel', ['data-state'], (panels) => panels.forEach(ridePanel));

        // Re-route on a runtime direction flip: a logical start/end (or auto)
        // FAB resolves to the opposite edge, so it must move to stay with its
        // panel (which flips via CSS). Physical FABs and the docks don't move.
        NDS.onAttrChange('html', ['dir'], () => {
            document.querySelectorAll('.nds-fab').forEach(fab => {
                if (fab.closest('code, .code-example')) return;
                if (fab.parentElement?.closest('.nds-fab')) return;   // outermost wins, as in init()
                register(fab);
            });
        });
    }

    // Route every .nds-fab. Idempotent: a FAB stamped on a prior pass (or by an
    // explicit register call) is skipped, so a button placed by hand inside an
    // authored dock (not marked .nds-fab) is never touched, and reinit only
    // picks up newcomers.
    //
    // A nested .nds-fab is skipped so the OUTERMOST one wins. Without this the
    // scan docks the group, then docks each marked child in turn — appending
    // moves them out, leaving the group empty. The guard is here rather than in
    // register() because an explicit register(child) call is deliberate.
    function init() {
        document.querySelectorAll('.nds-fab').forEach(fab => {
            if (fab.hasAttribute(INIT_ATTR)) return;
            if (fab.closest('code, .code-example')) return;
            if (fab.parentElement?.closest('.nds-fab')) return;
            register(fab);
        });
    }

    NDS.Fab = {
        init,
        reinit: init,
        register,
        dock,
        resolvePos,
    };
})();
