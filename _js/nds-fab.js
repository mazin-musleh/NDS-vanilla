/* NDS.Fab — public surface
 * Rides: nds-panels (an `auto` FAB docks at its toggled panel's edge, and a thumb slides
 *        aside while that panel is open; soft — a FAB with no panel just docks)
 * Methods:
 *   NDS.Fab.init() / .reinit()          route every .nds-fab into its dock
 *   NDS.Fab.register(fab, override)     route one FAB now — for a FAB another component
 *                                       injected; override forces an edge
 *   NDS.Fab.destroy(fabOrContainer)     un-route a FAB back to where it was authored, or
 *                                       every FAB authored inside a container. Returns the
 *                                       count. NDS.Init.destroy(view) calls the second form
 *   NDS.Fab.dock(pos)                   the dock element at that edge, created if missing
 *   NDS.Fab.resolvePos(fab, override)   which edge this FAB resolves to
 * Events:
 *   (none)
 * Hooks:
 *   data-fab-pos        left | right | bottom (physical) · start | end (logical, flips with
 *                       the page direction) · auto or absent (follow the toggled panel)
 *   data-fab-order      stacking order inside a dock, default 0
 *   data-fab-dock-pos   on a .nds-fab-dock you author yourself
 *   written by the component: data-fab-riding on a thumb that moved aside for its panel,
 *                             data-fab-tucked on <html> near the page bottom
 * Gotchas:
 *   - Ship a FAB with the `hidden` attribute. The router strips it once the FAB is docked,
 *     so it never flashes at the spot you authored it.
 *   - The OUTERMOST .nds-fab wins — a nested one is skipped, so a group is never emptied.
 *   - The FAB carries the position; the docks are static edge slots. FABs resolving to the
 *     same edge stack together.
 *   - Routing MOVES the FAB to a dock on <body>, so it leaves the view that authored it.
 *     A view removed without NDS.Fab.destroy() (or NDS.Init.destroy) leaves its FAB behind,
 *     pinned over the next screen — the destroy call is what puts it back first.
 */
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
        // The toggle is the FAB itself, or — on a group — one of its buttons, so
        // `auto` has to descend to find it. ridePanel climbs the same boundary
        // from the other side (btn.closest('.nds-fab')); both must agree or a
        // grouped FAB docks at one edge while its panel opens from another.
        const id = fab.dataset.panelToggle
            || fab.querySelector('[data-panel-toggle]')?.dataset.panelToggle;
        const panel = id ? document.getElementById(id) : null;
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
            el._ndsFabCreated = true;       // ours to remove once it empties; an authored dock is not
            document.body.appendChild(el);
        }
        return el;
    }

    // Move a FAB into its resolved slot, keeping the slot ordered by
    // data-fab-order (default 0) so cross-source stacking is deterministic.
    // `override` forces a position, ignoring the FAB's own data-fab-pos.
    function register(fab, override) {
        if (!fab) return null;
        // Remember where the FAB was authored BEFORE the first move, so destroy() can put
        // it back. Recorded once: a re-register (a direction flip re-routes every FAB)
        // reads the dock as the parent, which would overwrite the real origin with a slot.
        if (!fab._ndsFabOrigin) fab._ndsFabOrigin = { parent: fab.parentNode, nextSibling: fab.nextSibling };
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

    // One-time page-level setup, wired on the first routed FAB. The subscriptions are
    // shared by every FAB on the page, so they are released only when the last one goes
    // (teardownRuntime) — never on an individual destroy().
    let runtimeSet = false;
    let runtimeOffs = [];
    let runtimeSentinel = null;
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
        runtimeSentinel = sentinel;
        runtimeOffs.push(NDS.onIntersect(sentinel, (entry) => {
            // Skip on a short page (sentinel always in view) so the FAB isn't
            // hidden permanently — only tuck when there's room to scroll.
            const scrollable = document.documentElement.scrollHeight - window.innerHeight > 4;
            document.documentElement.toggleAttribute('data-fab-tucked', entry.isIntersecting && scrollable);
        }, { rootMargin: '0px 0px 120px 0px' }));

        // One pooled observer for every panel on the page.
        runtimeOffs.push(NDS.onAttrChange('.nds-panel', ['data-state'], (panels) => panels.forEach(ridePanel)));

        // Re-route on a runtime direction flip: a logical start/end (or auto)
        // FAB resolves to the opposite edge, so it must move to stay with its
        // panel (which flips via CSS). Physical FABs and the docks don't move.
        runtimeOffs.push(NDS.onAttrChange('html', ['dir'], () => {
            document.querySelectorAll('.nds-fab').forEach(fab => {
                if (fab.closest('code, .code-example')) return;
                if (fab.parentElement?.closest('.nds-fab')) return;   // outermost wins, as in init()
                register(fab);
            });
        }));
    }

    // Released only when the page holds no routed FAB. setupRuntime() can wire it again
    // from scratch, so a FAB added after a full teardown still tucks and rides.
    function teardownRuntime() {
        runtimeOffs.forEach(off => off());
        runtimeOffs = [];
        runtimeSentinel?.remove();
        runtimeSentinel = null;
        runtimeSet = false;
        document.documentElement.removeAttribute('data-fab-tucked');
    }

    // Un-route one FAB, or every FAB authored inside a container.
    //
    // The container form is what NDS.Init.destroy needs, and it cannot be a plain scan:
    // register() MOVED the button to a dock on <body>, so a docked FAB is no longer inside
    // the view that authored it and no querySelectorAll on that view will ever find it.
    // The origin recorded at register() time is the only link back, so the match is on
    // where the FAB CAME FROM, not on where it sits now.
    //
    // Putting it back matters beyond tidiness: a framework unmounts the view by removing
    // its own subtree, and a FAB left in the dock is not in that subtree, so it survives as
    // an orphan pinned over the next screen. Restored to its origin, it leaves with the
    // view. The `hidden` attribute goes back on too — it is how the FAB shipped, so a later
    // register() reveals it exactly as it did the first time.
    function destroy(elOrRoot) {
        if (!elOrRoot) return 0;

        if (elOrRoot.classList?.contains('nds-fab')) {
            const fab = elOrRoot;
            if (!fab.hasAttribute(INIT_ATTR)) return 0;   // never routed — nothing was taken
            const origin = fab._ndsFabOrigin;
            if (origin?.parent?.isConnected) {
                const before = origin.nextSibling?.parentNode === origin.parent ? origin.nextSibling : null;
                origin.parent.insertBefore(fab, before);
                fab.setAttribute('hidden', '');
            } else {
                fab.remove();   // authored inside a view the app already removed
            }
            delete fab._ndsFabOrigin;
            fab.removeAttribute(INIT_ATTR);
            fab.removeAttribute('data-fab-riding');
            fab.style.removeProperty('--_fab-ride');

            // Drop the empty slots we created; an authored dock stays, it is the app's.
            document.querySelectorAll('.nds-fab-dock').forEach(d => {
                if (d._ndsFabCreated && !d.children.length) d.remove();
            });
            if (!document.querySelector('.nds-fab[' + INIT_ATTR + ']')) teardownRuntime();
            return 1;
        }

        let count = 0;
        document.querySelectorAll('.nds-fab[' + INIT_ATTR + ']').forEach(fab => {
            const parent = fab._ndsFabOrigin?.parent;
            if (elOrRoot === document || (parent && (parent === elOrRoot || elOrRoot.contains?.(parent)))) {
                count += destroy(fab);
            }
        });
        return count;
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
        destroy,
        dock,
        resolvePos,
    };
})();
