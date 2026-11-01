/* NDS.Topbar — public surface
 * Rides: (none — base component)
 * Requires:
 *   [data-topbar-toggle] points at .nds-topbar-expander via aria-controls — the button opens nothing
 * Methods:
 *   NDS.Topbar.init()              wire the toggles, outside click and Escape (once per page)
 *   NDS.Topbar.open(idOrEl)        slide an expander open; the open one closes
 *   NDS.Topbar.close(idOrEl)       slide it closed
 *   NDS.Topbar.toggle(idOrEl)
 *   NDS.Topbar.isOpen(idOrEl)      open and not closing?
 * Events (bubble from the expander):
 *   nds:topbar:opened  detail {expander}
 *   nds:topbar:closed  detail {expander} — after the slide
 * Hooks:
 *   data-topbar-toggle   on a top bar button, with aria-controls naming its expander's id
 *   .nds-topbar-expander the strip under the top bar, [hidden] until it opens; its content goes in
 *                        .nds-content-wrapper > .nds-topbar-expander-content (the spacing)
 * Gotchas:
 *   - One expander open at a time. Opening another while one is open queues it: the open one
 *     slides closed first, then the new one slides open. The last one asked for wins.
 *   - A click outside the open expander and its toggles closes it, which is also what closes it
 *     when the nav opens: the two need no cross-component call.
 *   - A click during the close slide re-opens it rather than doing nothing.
 *   - Closing with focus inside moves focus to its toggle.
 *   - The listeners are delegated: once init() ran, an expander or toggle added later needs none.
 *     The loader runs it for a toggle on the page at load, or on mount().
 */
(() => {
    'use strict';

    const { add: addState, remove: removeState, has: hasState, clear: clearState } = NDS.state;
    const EXPANDER = '.nds-topbar-expander';
    // Expander → the cancel handle of its close slide, so a re-open discards the late hide.
    const closeCancels = new WeakMap();

    const resolveExpander = (idOrEl) => {
        const el = NDS.resolveElement(idOrEl);
        return el?.matches?.(EXPANDER) ? el : null;
    };
    const findToggles = (expander) => document.querySelectorAll(`[data-topbar-toggle][aria-controls="${CSS.escape(expander.id)}"]`);
    const findOpen = () => [...document.querySelectorAll(EXPANDER)].find(isOpenExpander);
    const findClosing = () => [...document.querySelectorAll(EXPANDER)].find((el) => hasState(el, 'closing'));
    // The expander waiting for the open one to finish its close slide.
    let queued = null;

    // "open" stays set through the close slide (with "closing"), so a closing expander is not open.
    function isOpenExpander(expander) {
        return hasState(expander, 'open') && !hasState(expander, 'closing');
    }

    function syncToggles(expander, isExpanded) {
        findToggles(expander).forEach((btn) => {
            NDS.aria.expanded(btn, isExpanded);
            isExpanded ? addState(btn, 'expanded') : removeState(btn, 'expanded');
        });
    }

    function open(idOrEl) {
        // An early call from the loader stub, on a page not wired yet.
        init();
        const expander = resolveExpander(idOrEl);
        if (!expander || isOpenExpander(expander)) return;
        // Another one open or still sliding closed: this one opens once it is gone.
        const other = findOpen() || findClosing();
        if (other && other !== expander) {
            queued = expander;
            close(other);
            return;
        }
        queued = null;
        closeCancels.get(expander)?.();
        closeCancels.delete(expander);

        // "open opening" paints display:grid at rows 0fr; two frames later rows slide to 1fr.
        expander.removeAttribute('hidden');
        addState(expander, 'open', 'opening');
        removeState(expander, 'closing');
        syncToggles(expander, true);
        NDS.onNextPaint(() => removeState(expander, 'opening'));
        expander.dispatchEvent(new CustomEvent('nds:topbar:opened', { bubbles: true, detail: { expander } }));
    }

    function close(idOrEl) {
        const expander = resolveExpander(idOrEl);
        if (expander && expander === queued) queued = null;
        if (!expander || !isOpenExpander(expander)) return;
        // "open closing" holds display:grid while rows slide to 0fr; hidden once it settles.
        addState(expander, 'closing');
        syncToggles(expander, false);
        // Focus inside would drop to <body> once it hides: hand it to the toggle that shows.
        if (expander.contains(document.activeElement)) {
            [...findToggles(expander)].find((btn) => btn.checkVisibility?.() ?? true)?.focus();
        }
        closeCancels.set(expander, NDS.onTransitionEnd(expander, () => {
            closeCancels.delete(expander);
            clearState(expander);
            expander.setAttribute('hidden', '');
            expander.dispatchEvent(new CustomEvent('nds:topbar:closed', { bubbles: true, detail: { expander } }));
            if (queued) open(queued);
        }));
    }

    function toggle(idOrEl) {
        const expander = resolveExpander(idOrEl);
        if (expander) isOpenExpander(expander) || expander === queued ? close(expander) : open(expander);
    }

    function isOpen(idOrEl) {
        const expander = resolveExpander(idOrEl);
        return !!expander && isOpenExpander(expander);
    }

    function handleClick(e) {
        const btn = e.target.closest?.('[data-topbar-toggle]');
        const target = btn && document.getElementById(btn.getAttribute('aria-controls'));
        if (target) return toggle(target);
        const expander = findOpen();
        if (expander && !expander.contains(e.target)) close(expander);
        queued = null;
    }

    function handleKeydown(e) {
        // defaultPrevented: a Modal's own Escape closed it, and the expander behind it stays open.
        if (e.key !== 'Escape' || e.defaultPrevented) return;
        queued = null;
        const expander = findOpen();
        if (expander) close(expander);
    }

    let initDone = false;
    function init() {
        if (initDone) return;
        initDone = true;
        // Capture: the outside-click close runs before a button's own NDS.Topbar.open(), not after it.
        document.addEventListener('click', handleClick, true);
        document.addEventListener('keydown', handleKeydown);
    }

    NDS.Topbar = { init, open, close, toggle, isOpen };
})();
