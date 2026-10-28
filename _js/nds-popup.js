/* NDS.popup — public surface (a base: where a popup fits beside its trigger, and putting it there)
 * Rides: (none — base component)
 * Methods:
 *   NDS.popup.getSpace(trigger, popup, opts)     the room above and below trigger, inside what the visitor
 *                                     sees → {spaceAbove, spaceBelow, topEdge, triggerRect, popupRect, box,
 *                                     viewportWidth, viewportHeight}. opts: {respectNav = true, navGap = 16}
 *   NDS.popup.setPosition(el, top, left, anchor?)  put el at viewport coords; with an anchor and CSS anchor
 *                                     positioning it stays on the anchor through scroll → true when anchored
 *   NDS.popup.clearPosition(el, anchor?)         remove what setPosition wrote; the anchor keeps its name
 *                                     while another popup still uses it
 * Events:
 *   (none)
 * Hooks:
 *   (none)
 * Gotchas:
 *   - getSpace only measures: the caller picks the side and writes the position, so each keeps its own
 *     gap, arrow and clamp.
 *   - The sticky .nds-main-nav is a top edge only for a trigger below it, never for one in or above it.
 */
(() => {
    'use strict';

    // ── Set Position ─────────────────────────────────────────────────
    // Writes `top`/`left` then measures and corrects, so the element lands at
    // the viewport coords whatever its containing block: the page for an
    // absolute popover in the top layer (the correction adds the scroll), the
    // wrapper where popover is missing, the viewport for a fixed element.
    // The transform back-out handles in-flight slide animations on the
    // element itself (e.g. dropmenu's opening translateY).
    // With an anchor and CSS anchor positioning (Chrome 125, Safari 26), the coords are written
    // against the anchor, so the browser keeps el on it through every scroll with no script.
    // An anchor in a fixed or sticky box (a panel) gets a fixed el: page scroll moves neither.
    // Checked once: an anchor el cannot use (one in a later top-layer box) gets plain coords.
    // Returns true when anchored; clearPosition(el, anchor) removes what an anchored setPosition wrote.
    // Usage: NDS.popup.setPosition(menu, top, leftPx[, trigger]);
    const ANCHORS = typeof CSS !== 'undefined' && CSS.supports('anchor-name: --a');
    const anchorNames = new WeakMap();
    // A menu and its trigger's tooltip share one anchor-name: the last popup to clear removes it.
    const anchorUsers = new WeakMap();
    let anchorCount = 0;
    const offset = (el, top, left) => {
        const rect = el.getBoundingClientRect();
        const { m41: translateX, m42: translateY } = new DOMMatrixReadOnly(getComputedStyle(el).transform);
        return [(rect.left - translateX) - left, (rect.top - translateY) - top];
    };
    const setPosition = (el, top, left, anchor) => {
        if (anchor && ANCHORS) {
            if (!anchorNames.has(anchor)) anchorNames.set(anchor, '--nds-anchor-' + ++anchorCount);
            if (!anchorUsers.has(anchor)) anchorUsers.set(anchor, new Set());
            anchorUsers.get(anchor).add(el);
            const name = anchorNames.get(anchor), at = anchor.getBoundingClientRect();
            anchor.style.setProperty('anchor-name', name);
            el.style.setProperty('position-anchor', name);
            el.style.position = NDS.isPinned(anchor) ? 'fixed' : '';
            el.style.top = `calc(anchor(top) + ${top - at.top}px)`;
            el.style.left = `calc(anchor(left) + ${left - at.left}px)`;
            const [dx, dy] = offset(el, top, left);
            if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return true;
            clearPosition(el, anchor);
        }
        el.style.top = top + 'px';
        el.style.left = left + 'px';
        const [dx, dy] = offset(el, top, left);
        if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
            el.style.top  = (top  - dy) + 'px';
            el.style.left = (left - dx) + 'px';
        }
        return false;
    };
    const clearPosition = (el, anchor) => {
        const users = anchor && anchorUsers.get(anchor);
        users?.delete(el);
        if (anchor && !users?.size) anchor.style.removeProperty('anchor-name');
        ['position-anchor', 'position', 'top', 'left'].forEach((property) => el.style.removeProperty(property));
    };

    // Cached lookup for `.nds-main-nav` — getSpace runs on every popup
    // open, so avoiding the repeated qS adds up. `undefined` = never looked up,
    // null = looked up and absent, element = cached. SPA consumers that swap
    // the nav DOM on route changes leave a detached element in the cache;
    // isConnected re-lookups in that case (null stays sticky to avoid
    // re-querying on every popup when no nav is present).
    let navEl;

    // ── Get Space ────────────────────────────────────────────────────
    // Measures available space around a trigger so a popup (a dropmenu, a tooltip,
    // a date picker, a custom select) can decide whether it fits below the
    // trigger or should flip above.
    // Returns raw measurements only — the caller computes its own flipUp
    // heuristic (e.g. `spaceBelow < popupRect.height`) and writes final
    // top/left styles so each component keeps its own arrow offsets,
    // RTL clamp, and gap conventions.
    //
    // When `respectNav` is true (default), treats the sticky `.nds-main-nav`
    // bottom edge + `navGap` as the top viewport boundary so popups can't
    // open behind it. Pass `respectNav: false` for components inside forms
    // or other contexts where the nav overlap doesn't apply.
    //
    // Usage: const p = NDS.popup.getSpace(trigger, menu);
    //        const flipUp = p.spaceBelow < p.popupRect.height && p.spaceAbove > p.spaceBelow;
    //        const top = flipUp ? p.triggerRect.top - p.popupRect.height - 4 : p.triggerRect.bottom + 4;
    const getSpace = (trigger, popup, opts = {}) => {
        const { respectNav = true, navGap = 16 } = opts;
        const triggerRect = trigger.getBoundingClientRect();
        const root = document.documentElement;
        const vw = root.clientWidth;
        const vh = root.clientHeight;
        // Space is measured inside what the visitor sees, so a popup never opens under the keyboard.
        const box = NDS.getVisibleBox();

        let topEdge = box.top;
        if (respectNav) {
            if (navEl === undefined || (navEl && !navEl.isConnected)) {
                navEl = document.querySelector('.nds-main-nav');
            }
            if (navEl) {
                const navRect = navEl.getBoundingClientRect();
                // The sticky nav is a top boundary only for triggers BELOW it. A
                // trigger ABOVE the nav (e.g. a topbar dropmenu) opens a downward
                // menu that passes in front of the nav, so the nav must not clamp
                // it down past itself — leaving a gap below the trigger. Same for
                // a trigger INSIDE the nav (a nav-link tooltip): its popup opens
                // in front of the nav, and the clamp pushed it navGap below it.
                if (navRect.bottom > 0 && triggerRect.bottom > navRect.top && !navEl.contains(trigger)) {
                    topEdge = Math.max(topEdge, navRect.bottom + navGap);
                }
            }
        }

        const popupRect = popup.getBoundingClientRect();
        const spaceBelow = box.bottom - triggerRect.bottom;
        const spaceAbove = triggerRect.top - topEdge;

        return {
            spaceBelow,
            spaceAbove,
            topEdge,
            triggerRect,
            popupRect,
            box,
            viewportWidth: vw,
            viewportHeight: vh,
        };
    };

    NDS.popup = { getSpace, setPosition, clearPosition };
})();
