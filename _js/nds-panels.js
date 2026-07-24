/**
 * NDS Panel Component
 * Content-agnostic slide-in surface. JS owns open/close, focus and the
 * single-open rule; SCSS owns position and the slide.
 *
 * Pattern: W3C APG Disclosure by default (page stays interactive), or a
 * focus-trapped side-modal with [data-panel-modal].
 *
 * A page may declare any number of panels on any mix of sides, but at most
 * ONE is open at a time. Opening B while A is open closes A first and defers
 * B's open until A's close transition finishes — mirroring the mainnav
 * dropdown swap (nds-mainnav.js closeAll/_scheduleDropdownOpen), minus the
 * duration arithmetic: a panel swap has exactly one outgoing element, so the
 * incoming open chains off that element's onTransitionEnd cleanup instead.
 */

(function () {
    'use strict';

    const { add: addState, remove: removeState, has: hasState, clear: clearState } = NDS.State;

    const SELECTOR = '.nds-panel';
    const INIT_ATTR = 'data-nds-panel-initialized';

    // Exactly one panel is open at a time, so a single pointer replaces the
    // Set that mainnav needs for its concurrently-open dropdowns.
    let openPanel = null;
    // Single slot, last-write-wins: a burst of toggle clicks during a swap
    // collapses to one close + one open, never a queue of animations.
    let pendingOpen = null;

    const togglesFor = (panel) =>
        panel.id ? document.querySelectorAll('[data-panel-toggle="' + panel.id + '"]') : [];

    // Only one transition callback may be armed per panel. A swap can abort an
    // in-flight open, so the pending handle is cancelled before re-arming —
    // otherwise the open's focus step would fire at the end of the CLOSE.
    function armTransition(panel, fn) {
        if (panel._cancelAnim) panel._cancelAnim();
        panel._cancelAnim = NDS.onTransitionEnd(panel, () => {
            delete panel._cancelAnim;
            fn();
        }, { fallbackMs: NDS.transitionSpeed() + 100 });
    }

    // ==============================================
    // OPEN / CLOSE
    // ==============================================

    function _open(panel) {
        openPanel = panel;
        panel.removeAttribute('hidden');

        const isStatic = panel.hasAttribute('data-panel-static');

        // Track the sticky-header bottom for EVERY side: inline panels + top
        // sheets pin their block-start below it (the nav paints at a higher
        // z-index), and bottom sheets cap their height against it so a tall
        // sheet can't clip under the nav. Layout read before any style write,
        // refining the CSS nav-height baseline to the live header bottom.
        updateHeaderOffset(panel);

        // Listeners that only exist while open — zero cost when closed.
        panel._openAC = new AbortController();
        const { signal } = panel._openAC;

        if (!isStatic) {
            document.addEventListener('keydown', (e) => {
                if (e.key !== 'Escape' && e.key !== 'Esc') return;
                e.preventDefault();
                close(panel);
            }, { signal });

            // Guards the opener explicitly: the DOM spec says a listener added
            // mid-dispatch isn't called for that same event, but relying on it
            // would make the opening click close the panel if that ever shifted.
            document.addEventListener('click', (e) => {
                if (panel.contains(e.target)) return;
                if (panel.id && e.target.closest('[data-panel-toggle="' + panel.id + '"]')) return;
                close(panel);
            }, { signal });
        }

        // Re-measure while open: the topbar scrolls away and returns, so the
        // header bottom moves. rAF-throttled — safe on scroll.
        const onScroll = NDS.rafThrottle(() => updateHeaderOffset(panel));
        window.addEventListener('scroll', onScroll, { passive: true, signal });
        const offResize = NDS.onResize(() => updateHeaderOffset(panel));
        signal.addEventListener('abort', offResize);

        if (panel.hasAttribute('data-panel-modal')) {
            const z = parseInt(getComputedStyle(panel).zIndex, 10);
            NDS.Backdrop.show({
                zIndex: isFinite(z) ? z - 1 : 998,
                onClick: () => close(panel),
                escapeClose: !isStatic,
                clickToClose: !isStatic,
            });
            document.addEventListener('keydown',
                NDS.trapFocus(() => (openPanel === panel ? panel : null)), { signal });
        }

        togglesFor(panel).forEach(btn => NDS.aria.expanded(btn, true));

        // Force reflow so the closed offset paints before the open transition.
        void panel.offsetHeight;

        addState(panel, 'open', 'opening');

        armTransition(panel, () => {
            removeState(panel, 'opening');
            const target = panel.querySelector('[data-panel-close]') || panel;
            if (target === panel && !panel.hasAttribute('tabindex')) panel.tabIndex = -1;
            target.focus();
            panel.dispatchEvent(new CustomEvent('nds:panel:opened', {
                detail: { panel }, bubbles: true,
            }));
        });
    }

    function open(ref) {
        const panel = NDS.resolveEl(ref);
        if (!panel) return;

        pendingOpen = null;              // supersede any swap already waiting

        if (openPanel && openPanel !== panel) {
            // Swap: let the outgoing panel's close cleanup start this one, so
            // the two never animate across each other.
            pendingOpen = panel;
            close(openPanel);
            return;
        }
        // Re-opening the panel that is mid-close: queue behind its own close
        // rather than fighting the running transition.
        if (openPanel === panel) {
            if (hasState(panel, 'closing')) pendingOpen = panel;
            return;
        }
        _open(panel);
    }

    function close(ref) {
        const panel = NDS.resolveEl(ref);
        if (!panel || !hasState(panel, 'open') || hasState(panel, 'closing')) return;

        addState(panel, 'closing');

        if (panel._openAC) {
            panel._openAC.abort();
            delete panel._openAC;
        }
        if (panel.hasAttribute('data-panel-modal')) NDS.Backdrop.hide();

        togglesFor(panel).forEach(btn => NDS.aria.expanded(btn, false));

        armTransition(panel, () => {
            clearState(panel);
            panel.setAttribute('hidden', '');
            if (openPanel === panel) openPanel = null;

            // Return focus to the opener only when nothing is queued — the
            // incoming panel takes focus itself a moment later.
            if (!pendingOpen) {
                const opener = panel._opener;
                if (opener && typeof opener.focus === 'function' && document.contains(opener)) {
                    opener.focus();
                }
                delete panel._opener;
            }

            panel.dispatchEvent(new CustomEvent('nds:panel:closed', {
                detail: { panel }, bubbles: true,
            }));

            // Flush the swap slot. Read-then-clear so a listener on the
            // `closed` event can queue its own open without being dropped.
            const next = pendingOpen;
            pendingOpen = null;
            if (next) _open(next);
        });
    }

    function toggle(ref) {
        const panel = NDS.resolveEl(ref);
        if (!panel) return;
        if (hasState(panel, 'open') && !hasState(panel, 'closing')) close(panel);
        else open(panel);
    }

    const isOpen = (ref) => {
        const panel = NDS.resolveEl(ref);
        return !!panel && hasState(panel, 'open') && !hasState(panel, 'closing');
    };

    // Keep the panel below the sticky header (topbar + mainnav) while it moves.
    // Writes the private --_header-offset, NOT the --panel-top knob, so a
    // consumer-set --panel-top still wins via the var() fallback chain.
    function updateHeaderOffset(panel) {
        const visible = NDS.stickyHeaderBottom();
        const next = visible > 0 ? visible + 'px' : '';
        // Skip the redundant write when nothing moved — this runs rAF-throttled
        // on every scroll frame, so an unchanged value shouldn't touch the DOM.
        if (panel.style.getPropertyValue('--_header-offset') === next) return;
        if (next) panel.style.setProperty('--_header-offset', next);
        else panel.style.removeProperty('--_header-offset');
    }

    // ==============================================
    // INIT / DESTROY
    // ==============================================

    function createPanel(panel) {
        if (panel.hasAttribute(INIT_ATTR)) return;

        if (!panel.id) {
            console.warn('NDS Panel: panel has no id — toggles cannot target it', panel);
        }

        panel._panelAC = new AbortController();
        const { signal } = panel._panelAC;

        // Closed panels stay out of the a11y tree and cost no layout.
        if (!hasState(panel, 'open')) panel.setAttribute('hidden', '');

        panel.addEventListener('click', (e) => {
            if (e.target.closest('[data-panel-close]')) {
                e.stopPropagation();
                close(panel);
            }
        }, { signal });

        panel.setAttribute(INIT_ATTR, 'true');
    }

    function destroyPanel(panel) {
        if (panel._cancelAnim) {
            panel._cancelAnim();
            delete panel._cancelAnim;
        }
        if (panel._panelAC) {
            panel._panelAC.abort();
            delete panel._panelAC;
        }
        if (panel._openAC) {
            panel._openAC.abort();
            delete panel._openAC;
        }
        if (panel.hasAttribute('data-panel-modal') && hasState(panel, 'open')) NDS.Backdrop.hide();
        // Mirrors close()'s toggle reset: destroy skips the close path, so without
        // this a destroyed-while-open panel leaves every toggle claiming
        // aria-expanded="true" for a surface that is now hidden and unwired.
        if (hasState(panel, 'open')) togglesFor(panel).forEach(btn => NDS.aria.expanded(btn, false));
        clearState(panel);
        panel.setAttribute('hidden', '');
        if (openPanel === panel) openPanel = null;
        if (pendingOpen === panel) pendingOpen = null;
        delete panel._opener;
        panel.removeAttribute(INIT_ATTR);
    }

    // Toggles are delegated from the document: a toggle may live anywhere
    // (a FAB dock, a nav, injected later) and never needs its own wiring.
    let togglesBound = false;
    function bindToggles() {
        if (togglesBound) return;
        togglesBound = true;
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-panel-toggle]');
            if (!btn) return;
            const panel = document.getElementById(btn.dataset.panelToggle);
            if (!panel) return;
            e.preventDefault();
            if (!hasState(panel, 'open')) panel._opener = btn;
            toggle(panel);
        });
    }

    function init() {
        bindToggles();
        document.querySelectorAll(SELECTOR).forEach(panel => {
            if (panel.closest('code, .code-example')) return;
            createPanel(panel);
        });
    }

    NDS.Panel = {
        init,
        reinit: init,
        create: createPanel,
        destroy: destroyPanel,
        open,
        close,
        toggle,
        isOpen,
    };
})();
