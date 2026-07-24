/**
 * NDS Fab — routes floating action buttons into fixed corner docks.
 *
 * Ownership is inverted from a plain container: the POSITION lives on the FAB
 * and docks are static corner slots. A FAB is moved into the slot matching its
 * position, so FABs that resolve to the same corner stack together while `auto`
 * FABs follow their panel — the two goals don't fight.
 *
 *   .nds-fab           marks an element (button or container) as a FAB — the
 *                      routing marker, exactly like every other NDS component's
 *                      root class. init() scans for this.
 *   data-fab-pos       which corner (optional; absent === auto). The DOCKS are
 *                      static physical positions (left / right / center); a
 *                      FAB resolves to one — so the FAB is free to move while
 *                      the docks stay put and logical/physical never overlap:
 *     left | right | center   that physical dock (fixed, regardless of dir)
 *     start | end             LOGICAL — resolves by direction: end → left in
 *                             RTL / right in LTR; start → the mirror
 *     auto                    follow the toggled panel to its corner
 *                             (data-panel-toggle → panel data-panel-side); a
 *                             sheet or a FAB with no panel → the reading-end corner
 *
 * Delegated: routing runs after the reveal; the _fab.scss guard hides a
 * .nds-fab until its stamp lands so it never flashes at its source spot.
 * Injected FABs (built by another component) call NDS.Fab.register(fab).
 */

(function () {
    'use strict';

    const INIT_ATTR = 'data-nds-fab-initialized';
    const DEFAULT_POS = 'right';   // physical default corner

    const order = (el) => parseInt(el.dataset.fabOrder, 10) || 0;
    // A JS-made dock always stamps its position (below), but an authored bare
    // <div class="nds-fab-dock"> may omit it — treat that as 'right' so both
    // resolve to the same corner.
    const dockPos = (el) => el.dataset.fabDockPos || DEFAULT_POS;

    // Map a side to one of the PHYSICAL docks. Physical left/right/center pass
    // through unchanged; logical start/end resolve by direction (so `end` lands
    // in the left dock on an RTL page, the right dock on LTR). That's what lets
    // a FAB move between corners while the docks themselves stay static.
    function sideToCorner(side) {
        if (side === 'left' || side === 'right' || side === 'center') return side;
        if (side === 'start') return NDS.isRTL ? 'right' : 'left';
        return NDS.isRTL ? 'left' : 'right';   // 'end' (default), a top/bottom sheet, or unknown
    }

    // Resolve a FAB's target dock. Any explicit position resolves directly;
    // only 'auto' (or absent) follows the toggled panel's side, falling back to
    // the reading-end corner when there's no panel.
    function resolvePos(fab, override) {
        const p = override || fab.dataset.fabPos || 'auto';
        if (p !== 'auto') return sideToCorner(p);
        const panel = fab.dataset.panelToggle ? document.getElementById(fab.dataset.panelToggle) : null;
        return sideToCorner(panel ? (panel.getAttribute('data-panel-side') || 'end') : 'end');
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

        // Re-route on a runtime direction flip: a logical start/end (or auto)
        // FAB resolves to the opposite corner, so it must move to stay with its
        // panel (which flips via CSS). Physical FABs and the docks don't move.
        NDS.onAttrChange('html', ['dir'], () => {
            document.querySelectorAll('.nds-fab').forEach(fab => {
                if (fab.closest('code, .code-example')) return;
                register(fab);
            });
        });
    }

    // Route every .nds-fab. Idempotent: a FAB stamped on a prior pass (or by an
    // explicit register call) is skipped, so a button placed by hand inside an
    // authored dock (not marked .nds-fab) is never touched, and reinit only
    // picks up newcomers.
    function init() {
        document.querySelectorAll('.nds-fab').forEach(fab => {
            if (fab.hasAttribute(INIT_ATTR)) return;
            if (fab.closest('code, .code-example')) return;
            register(fab);
        });
    }

    NDS.Fab = {
        init,
        reinit: init,
        register,
        adopt: register,   // alias — "adopt this element into its slot"
        dock,
        resolvePos,
    };
})();
