/**
 * NDS Digital Stamp
 *
 * Saudi government trust banner that expands from the topbar. Fully standalone:
 * owns its own open/close, dismisses on outside-click or Escape, and animates via
 * the grid-template-rows lifecycle in _DGAdigitalStamp.scss. No shared animation
 * lock with the nav — mutual exclusion with the nav drawer/dropdowns falls out of
 * each surface's own outside-click handler (clicking the tab is "outside" the nav,
 * so the nav closes whatever it has open; clicking the hamburger is "outside" the
 * stamp, so the stamp closes), letting the two animate independently.
 *
 * Public API: NDS.DigitalStamp.{ init, open, close, toggle, isOpen }
 * Events (bubbling): nds-digitalStamp-opened, nds-digitalStamp-closed
 */
(function () {
    'use strict';

    const { add: addState, remove: removeState, has: hasState, clear: clearState } = NDS.State;

    let tab = null;
    let panel = null;
    let abortController = null;
    let _initDone = false;
    // Cancel handle for the in-flight close cleanup, so a re-open mid-close
    // discards the pending hide() instead of letting it fire late.
    let _cancelClose = null;

    // "open" stays set through the close animation (paired with "closing"), so
    // gate on the absence of "closing" — that treats a closing panel as not-open,
    // making a click during close re-open rather than no-op.
    const isOpen = () => !!panel && hasState(panel, 'open') && !hasState(panel, 'closing');

    function open() {
        if (!panel || !tab || isOpen()) return;
        _cancelClose?.();
        _cancelClose = null;

        // Reveal, then start collapsed: "open opening" paints display:grid at
        // rows:0fr. Two frames later drop "opening" so grid-template-rows
        // transitions 0fr → 1fr.
        panel.removeAttribute('hidden');
        addState(panel, 'open', 'opening');
        removeState(panel, 'closing');
        NDS.aria.expanded(tab, true);
        addState(tab, 'expanded');

        NDS.afterPaint(() => removeState(panel, 'opening'));

        panel.dispatchEvent(new CustomEvent('nds-digitalStamp-opened', { bubbles: true }));
    }

    function close() {
        if (!isOpen()) return;

        // "open closing" holds display:grid while rows animates 1fr → 0fr; the
        // panel is re-hidden only after the transition settles.
        addState(panel, 'closing');
        NDS.aria.expanded(tab, false);
        removeState(tab, 'expanded');

        _cancelClose = NDS.onTransitionEnd(panel, () => {
            _cancelClose = null;
            clearState(panel);
            panel.setAttribute('hidden', '');
            panel.dispatchEvent(new CustomEvent('nds-digitalStamp-closed', { bubbles: true }));
        });
    }

    function toggle() {
        isOpen() ? close() : open();
    }

    function init() {
        if (_initDone) return;
        tab = document.querySelector('.nds-digitalStamp-tab');
        panel = document.getElementById('nds-digitalStamp');
        if (!tab || !panel) return;
        _initDone = true;

        // Scope all listeners to one AbortController so a re-init detaches the
        // prior batch atomically instead of stacking handlers on document.
        if (abortController) abortController.abort();
        abortController = new AbortController();
        const { signal } = abortController;

        tab.addEventListener('click', toggle, { signal });

        // Outside-click dismiss. Also what closes the stamp when the user opens
        // the nav: the hamburger / nav link is outside tab+panel, so the same
        // handler fires — no cross-component call needed.
        document.addEventListener('click', (e) => {
            if (!isOpen()) return;
            if (tab.contains(e.target) || panel.contains(e.target)) return;
            close();
        }, { signal });

        document.addEventListener('keydown', (e) => {
            if ((e.key === 'Escape' || e.key === 'Esc') && isOpen()) close();
        }, { signal });
    }

    NDS.DigitalStamp = { init, open, close, toggle, isOpen };
})();
