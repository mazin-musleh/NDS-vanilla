/* NDS.Panel — public surface
 * Rides: <dialog> — show() for a plain or static panel (it stays under the main nav),
 *        NDS.dialog for a modal one (the top layer, the dim layer, an inert page)
 * Methods:
 *   NDS.Panel.init() / .reinit()   bind the delegated toggles; prepare every .nds-panel
 *   NDS.Panel.create(panel)        prepare one panel
 *   NDS.Panel.destroy(panel)       tear one down (closes it and releases the scroll lock)
 *   NDS.Panel.open(idOrEl, opts?)  open it, by the stacking rules below. { focus: false }
 *                                  leaves focus where it is (a panel the page opens on its own)
 *   NDS.Panel.close(idOrEl)        close it
 *   NDS.Panel.toggle(idOrEl)       open or close it
 *   NDS.Panel.isOpen(idOrEl)       open and not closing?
 * Events (bubble from the .nds-panel, AFTER the slide finishes):
 *   nds:panel:opened   detail {panel}
 *   nds:panel:closed   detail {panel}
 *   nds:panel:resized  detail {panel, size}
 * Hooks:
 *   data-panel-toggle   on any button anywhere — the id of the panel it opens
 *   data-panel-close    on a control inside the panel; the first one also takes focus
 *                       when the panel opens
 *   data-panel-side     start | end (logical, flips with direction) · left | right | top
 *                       | bottom (physical). Default: end
 *   data-panel-resize   grow | shrink — on a control inside the panel; steps
 *                       data-panel-size one rung and marks the end-of-ladder button
 *                       aria-disabled
 *   data-panel-size     sm | md | lg | xl on the panel (default md) — width of a side
 *                       panel, height cap of a sheet. Set it in markup to start there
 *   data-panel-modal    open modal: the page behind, main nav too, is dimmed and inert
 *   data-panel-static   no ESC, no click-outside — it closes only through your own call
 *                       or a [data-panel-close] control
 * Gotchas:
 *   - Panels stack. A plain panel replaces the open plain one, after its slide-out, so the
 *     two never cross. A static panel opened with { focus: false } waits until no panel is
 *     open; one the user opens takes the screen like a plain one. A static panel another
 *     replaces hides (no closed/opened events) and comes back once the screen clears. A modal closes nothing and covers the rest with its backdrop.
 *     Only the top panel answers Escape and an outside click.
 *   - A panel the user opens while a modal dialog (a Modal or a modal panel) is open opens
 *     modal too, or it would sit under that dialog's inert page. One opened with
 *     { focus: false } stays under it.
 *   - The panel is a <dialog>. Any other element logs an error and does not open.
 *   - The panel needs an id or no toggle can target it (it warns at init).
 *   - Knobs on the panel: --panel-width, --panel-height, --panel-top, --panel-padding,
 *     --panel-gap, --panel-z, --panel-radius.
 */
/**
 * NDS Panel Component
 * Content-agnostic slide-in surface. JS owns open/close, focus and the
 * stacking rules; SCSS owns position and the slide.
 *
 * Pattern: W3C APG Disclosure by default (page stays interactive), or a
 * focus-trapped side-modal with [data-panel-modal].
 *
 * Opening plain B while plain A is open closes A first and defers B's open
 * until A's close transition finishes — mirroring the mainnav dropdown swap
 * (nds-main-nav.js closeAll/_scheduleDropdownOpen), minus the duration
 * arithmetic: the incoming open chains off the outgoing panel's
 * onTransitionEnd cleanup instead.
 */

(function () {
    'use strict';

    const { add: addState, remove: removeState, has: hasState, clear: clearState } = NDS.state;

    const SELECTOR = '.nds-panel';
    const INIT_ATTR = 'data-nds-panel-initialized';
    const sizes = ['sm', 'md', 'lg', 'xl'];

    // Open panels, bottom to top; a closing one stays until its slide ends.
    const stack = [];
    const getTopPanel = () => stack[stack.length - 1];
    // A modal dialog above (a Modal, or a newer modal panel) answers instead.
    const isTop = (panel) => (NDS.dialog.getTop() ? NDS.dialog.getTop() === panel : getTopPanel() === panel);
    // Static panels kept off the screen by another; the newest returns once none is open.
    const waiting = [];
    const drop = (list, panel) => {
        const i = list.indexOf(panel);
        if (i > -1) list.splice(i, 1);
        return i > -1;
    };
    // Single slot, last-write-wins: a burst of toggle clicks during a swap
    // collapses to one close + one open, never a queue of animations.
    let pendingOpen = null;

    // Private per-panel state, off the element. Lifetimes differ, so one map each.
    const animationCancels = new WeakMap();
    const resizeCancels = new WeakMap();
    const modalPanels = new WeakSet();
    const openAbortControllers = new WeakMap();
    const panelAbortControllers = new WeakMap();
    const noFocusPanels = new WeakSet();
    const silentPanels = new WeakSet();
    const openers = new WeakMap();

    const findToggles = (panel) =>
        panel.id ? document.querySelectorAll('[data-panel-toggle="' + panel.id + '"]') : [];

    // Only one transition callback may be armed per panel. A swap can abort an
    // in-flight open, so the pending handle is cancelled before re-arming —
    // otherwise the open's focus step would fire at the end of the CLOSE.
    function armTransition(panel, fn) {
        animationCancels.get(panel)?.();
        animationCancels.set(panel, NDS.onTransitionEnd(panel, () => {
            animationCancels.delete(panel);
            fn();
        }, { fallbackMs: NDS.transitionSpeed() + 100 }));
    }

    // ==============================================
    // OPEN / CLOSE
    // ==============================================

    function openPanel(panel) {
        stack.push(panel);

        const isStatic = panel.hasAttribute('data-panel-static');
        // Recorded: data-panel-modal is consumer-mutable, and close() must undo the open it got.
        // One the user opens over a modal dialog goes modal too; one the page opens stays under it.
        if (panel.hasAttribute('data-panel-modal') || (!noFocusPanels.has(panel) && !!NDS.dialog.getTop())) modalPanels.add(panel);
        else modalPanels.delete(panel);

        // Listeners that only exist while open — zero cost when closed.
        const openAbortController = new AbortController();
        openAbortControllers.set(panel, openAbortController);
        const { signal } = openAbortController;

        if (modalPanels.has(panel)) {
            NDS.dialog.show(panel, signal);
            if (!isStatic) NDS.dialog.onOutside(panel, () => close(panel), signal);
        } else {
            // show() moves focus into the dialog; a panel opened with { focus: false } gives it back.
            const prev = document.activeElement;
            panel.show();
            if (noFocusPanels.has(panel) && document.activeElement !== prev) {
                if (prev && prev !== document.body) prev.focus({ preventScroll: true });
                else document.activeElement?.blur();
            }
        }

        // Track the sticky-header bottom for EVERY side: inline panels + top
        // sheets pin their block-start below it (the nav paints at a higher
        // z-index), and bottom sheets cap their height against it so a tall
        // sheet can't clip under the nav. Layout read before any style write,
        // refining the CSS nav-height baseline to the live header bottom.
        syncHeaderOffset(panel);

        if (!isStatic) {
            document.addEventListener('keydown', (e) => {
                // defaultPrevented: the Modal's own Escape closed it a moment ago.
                if (e.key !== 'Escape' || e.defaultPrevented || !isTop(panel)) return;
                e.preventDefault();
                close(panel);
            }, { signal });

            // Guards the opener explicitly: the DOM spec says a listener added
            // mid-dispatch isn't called for that same event, but relying on it
            // would make the opening click close the panel if that ever shifted.
            // A modal panel needs none: NDS.dialog stops every outside click and onOutside() above closes it.
            if (!modalPanels.has(panel)) document.addEventListener('click', (e) => {
                // A Modal closes before its click reaches here, so its parts are named too.
                if (!isTop(panel) || panel.contains(e.target)
                    || e.target.closest('.nds-modal, .nds-backdrop, [data-modal-target]')) return;
                if (panel.id && e.target.closest('[data-panel-toggle="' + panel.id + '"]')) return;
                close(panel);
            }, { signal });
        }

        // Re-measure while open: the topbar scrolls away and returns, so the
        // header bottom moves. rAF-throttled — safe on scroll.
        const onScroll = NDS.throttleToFrame(() => syncHeaderOffset(panel));
        window.addEventListener('scroll', onScroll, { passive: true, signal });
        const offResize = NDS.onResize(() => { syncHeaderOffset(panel); syncResize(panel); });
        signal.addEventListener('abort', offResize);

        findToggles(panel).forEach(btn => NDS.aria.expanded(btn, true));

        // Force reflow so the closed offset paints before the open transition.
        void panel.offsetHeight;
        syncResize(panel);

        addState(panel, 'open', 'opening');

        armTransition(panel, () => {
            removeState(panel, 'opening');
            if (!noFocusPanels.has(panel)) {
                // Skips a close inside a hidden view: focus() on it does nothing.
                const target = findOwnControls(panel, '[data-panel-close]').find(el => !el.closest('[hidden]')) || panel;
                if (target === panel && !panel.hasAttribute('tabindex')) panel.tabIndex = -1;
                target.focus();
            }
            noFocusPanels.delete(panel);
            if (silentPanels.has(panel)) silentPanels.delete(panel);
            else panel.dispatchEvent(new CustomEvent('nds:panel:opened', {
                detail: { panel }, bubbles: true,
            }));
        });
    }

    const buildClosedEvent = (panel) => new CustomEvent('nds:panel:closed', { detail: { panel }, bubbles: true });

    // A static panel giving way: hidden but still open to its owner, until resume().
    function park(panel) {
        if (hasState(panel, 'closing')) return;
        silentPanels.add(panel);
        noFocusPanels.add(panel);
        close(panel);
        waiting.push(panel);
    }

    function resume() {
        if (stack.length || pendingOpen || !waiting.length) return;
        openPanel(waiting.pop());
    }

    function open(ref, { focus = true } = {}) {
        let panel = NDS.resolveElement(ref);
        // A string ref that missed may name a template-wrapped panel.
        if (!panel && typeof ref === 'string') panel = NDS.fromTemplate(ref.replace(/^#/, ''));
        if (!panel) return;
        // A panel added after load without NDS.init.mount: its close controls are wired here.
        createPanel(panel);
        if (!panel.hasAttribute(INIT_ATTR)) return;
        // On the panel, not a local: a swap opens it later from close()'s cleanup.
        if (focus) noFocusPanels.delete(panel); else noFocusPanels.add(panel);

        // Re-opening the panel that is mid-close: queue behind its own close
        // rather than fighting the running transition.
        if (stack.includes(panel)) {
            pendingOpen = hasState(panel, 'closing') ? panel : null;
            return;
        }
        if (panel.hasAttribute('data-panel-modal')) { openPanel(panel); return; }
        // Only a static panel the page opens on its own waits; one the user asks for takes the screen.
        if (panel.hasAttribute('data-panel-static') && noFocusPanels.has(panel)) {
            if (!stack.length && !pendingOpen) openPanel(panel);
            else if (!waiting.includes(panel)) waiting.push(panel);
            return;
        }

        pendingOpen = null;              // supersede any swap already waiting
        drop(waiting, panel);
        const out = stack.filter(stackedPanel => !stackedPanel.hasAttribute('data-panel-modal'));
        if (out.length) {
            // Swap: let the outgoing panel's close cleanup start this one, so
            // the two never animate across each other.
            pendingOpen = panel;
            out.forEach(stackedPanel => (stackedPanel.hasAttribute('data-panel-static') ? park(stackedPanel) : close(stackedPanel)));
            return;
        }
        openPanel(panel);
    }

    function close(ref) {
        const panel = NDS.resolveElement(ref);
        if (!panel) return;
        if (drop(waiting, panel)) {
            // A parked panel was still open to its owner, so it gets its closed event.
            if (silentPanels.has(panel)) {
                silentPanels.delete(panel);
                if (!hasState(panel, 'open')) panel.dispatchEvent(buildClosedEvent(panel));
            }
            return;
        }
        if (!hasState(panel, 'open') || hasState(panel, 'closing')) return;

        addState(panel, 'closing');

        if (openAbortControllers.has(panel)) {
            openAbortControllers.get(panel).abort();
            openAbortControllers.delete(panel);
        }
        NDS.dialog.hideMenus(panel);

        findToggles(panel).forEach(btn => NDS.aria.expanded(btn, false));

        armTransition(panel, () => {
            clearState(panel);
            NDS.dialog.close(panel);
            modalPanels.delete(panel);
            drop(stack, panel);
            const silent = silentPanels.has(panel);

            // Return focus to the opener only when nothing is queued — the
            // incoming panel takes focus itself a moment later. Drop the
            // reference unless THIS panel is the one coming back: a re-open
            // mid-close never re-stamps it (addToggleListeners only stamps a panel that
            // isn't open, and `open` is still set while closing), so deleting it
            // here would strand the next close with no trigger to return to.
            // A swap to a different panel does drop it — holding it would later
            // throw focus at a button that open never came from.
            // A parked panel keeps its opener for the close that really ends it.
            const opener = openers.get(panel);
            if (pendingOpen !== panel && !silent) openers.delete(panel);
            // preventScroll: the page may have scrolled while the panel was open; focus goes
            // back to the opener without jumping the page to it.
            if (!silent && !pendingOpen && opener && typeof opener.focus === 'function' && document.contains(opener)) {
                opener.focus({ preventScroll: true });
            }

            if (!silent) panel.dispatchEvent(buildClosedEvent(panel));

            // Flush the swap slot. Read-then-clear so a listener on the
            // `closed` event can queue its own open without being dropped.
            const next = pendingOpen;
            pendingOpen = null;
            if (next) openPanel(next);
            resume();
        });
    }

    function toggle(ref) {
        let panel = NDS.resolveElement(ref);
        if (!panel && typeof ref === 'string') panel = NDS.fromTemplate(ref.replace(/^#/, ''));
        if (!panel) return;
        if (hasState(panel, 'open') && !hasState(panel, 'closing')) close(panel);
        else open(panel);
    }

    // ==============================================
    // RESIZE
    // ==============================================

    const getSizeIndex = (panel) => {
        const i = sizes.indexOf(panel.getAttribute('data-panel-size'));
        return i < 0 ? 1 : i;
    };

    // Already as big as the screen allows: the full width for a side panel, header to floor for a sheet.
    // ponytail: reads --_panel-top as px; a consumer --panel-top in rem skews the sheet check.
    function isAtMax(panel) {
        if (!panel.open) return false;
        const side = panel.getAttribute('data-panel-side');
        if (side === 'top' || side === 'bottom') {
            const top = parseFloat(getComputedStyle(panel).getPropertyValue('--_panel-top')) || 0;
            return panel.offsetHeight >= window.innerHeight - top - 1;
        }
        return panel.offsetWidth >= window.innerWidth - 1;
    }

    // A panel's body is open content, so a nested panel's controls are not this panel's.
    const findOwnControls = (panel, selector) => NDS.findOwnParts(panel, selector, SELECTOR);

    // aria-disabled, not disabled: a disabled button drops the focus the user just clicked into.
    function syncResize(panel) {
        const i = getSizeIndex(panel);
        const full = i === sizes.length - 1 || isAtMax(panel);
        findOwnControls(panel, '[data-panel-resize]').forEach(btn => {
            NDS.aria.disabled(btn, btn.dataset.panelResize === 'grow' ? full : i === 0);
        });
    }

    function resize(panel, step) {
        const from = getSizeIndex(panel);
        const to = Math.min(Math.max(from + step, 0), sizes.length - 1);
        if (to === from || (step > 0 && isAtMax(panel))) return;
        panel.setAttribute('data-panel-size', sizes[to]);
        syncResize(panel);
        // Measure the cap again once the size has settled.
        resizeCancels.get(panel)?.();
        resizeCancels.set(panel, NDS.onTransitionEnd(panel, () => {
            resizeCancels.delete(panel);
            syncResize(panel);
        }, { fallbackMs: NDS.transitionSpeed() + 100 }));
        panel.dispatchEvent(new CustomEvent('nds:panel:resized', {
            detail: { panel, size: sizes[to] }, bubbles: true,
        }));
    }

    const isOpen = (ref) => {
        const panel = NDS.resolveElement(ref);
        return !!panel && hasState(panel, 'open') && !hasState(panel, 'closing');
    };

    // Keep the panel below the sticky header (topbar + mainnav) while it moves.
    // Writes the private --_header-offset, NOT the --panel-top knob, so a
    // consumer-set --panel-top still wins via the var() fallback chain.
    function syncHeaderOffset(panel) {
        const visible = NDS.getStickyHeaderBottom();
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
        // A page with no panel at load never runs init(), so create() wires the toggles too.
        addToggleListeners();

        if (!(panel instanceof HTMLDialogElement)) {
            console.error('NDS Panel: .nds-panel must be a <dialog>.', panel);
            return;
        }
        if (!panel.id) {
            console.warn('NDS Panel: panel has no id — toggles cannot target it', panel);
        }

        const panelAbortController = new AbortController();
        panelAbortControllers.set(panel, panelAbortController);
        const { signal } = panelAbortController;

        // Closed without close(): a <form method="dialog">, or Chrome's repeat Escape on a modal panel.
        // The event is queued: open again by the time it lands (a re-open mid-close), it is stale.
        panel.addEventListener('close', () => {
            if (panel.open || !hasState(panel, 'open') || hasState(panel, 'closing')) return;
            NDS.dialog.close(panel);
            close(panel);
        }, { signal });

        panel.addEventListener('click', (e) => {
            if (e.target.closest('[data-panel-close]')) {
                e.stopPropagation();
                close(panel);
                return;
            }
            const resizer = e.target.closest('[data-panel-resize]');
            if (resizer && resizer.closest(SELECTOR) === panel) resize(panel, resizer.dataset.panelResize === 'grow' ? 1 : -1);
        }, { signal });
        syncResize(panel);

        panel.setAttribute(INIT_ATTR, 'true');
    }

    function destroyPanel(panel) {
        // Cancelling the transition below drops the close callback that would
        // have flushed the swap slot, so carry a pending OTHER panel over and
        // open it once teardown is done — destroying this one says nothing
        // about the caller's request to open that one.
        const pending = pendingOpen !== panel ? pendingOpen : null;
        pendingOpen = null;

        animationCancels.get(panel)?.();
        animationCancels.delete(panel);
        resizeCancels.get(panel)?.();
        resizeCancels.delete(panel);
        panelAbortControllers.get(panel)?.abort();
        panelAbortControllers.delete(panel);
        openAbortControllers.get(panel)?.abort();
        openAbortControllers.delete(panel);
        // Mirrors close()'s toggle reset: destroy skips the close path, so without
        // this a destroyed-while-open panel leaves every toggle claiming
        // aria-expanded="true" for a surface that is now hidden and unwired.
        if (hasState(panel, 'open')) findToggles(panel).forEach(btn => NDS.aria.expanded(btn, false));
        clearState(panel);
        NDS.dialog.close(panel);
        modalPanels.delete(panel);
        drop(stack, panel);
        drop(waiting, panel);
        openers.delete(panel);
        silentPanels.delete(panel);
        noFocusPanels.delete(panel);
        panel.removeAttribute(INIT_ATTR);

        // Another panel still sliding out flushes the slot itself.
        if (pending && stack.some(stackedPanel => hasState(stackedPanel, 'closing'))) pendingOpen = pending;
        else if (pending) openPanel(pending);
        resume();
    }

    // Toggles are delegated from the document: a toggle may live anywhere
    // (a FAB dock, a nav, injected later) and never needs its own wiring.
    let togglesBound = false;
    function addToggleListeners() {
        if (togglesBound) return;
        togglesBound = true;
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-panel-toggle]');
            if (!btn) return;
            // fromTemplate covers a panel still inside a <template>: it moves the
            // markup in and NDS.init.refresh re-enters init(), whose scan runs
            // createPanel on it before toggle() below needs it.
            const panel = NDS.fromTemplate(btn.dataset.panelToggle);
            if (!panel) return;
            e.preventDefault();
            if (!hasState(panel, 'open')) openers.set(panel, btn);
            toggle(panel);
        });
    }

    function init() {
        addToggleListeners();
        // Closed before the first open too, lazy panels' toggles included.
        document.querySelectorAll('[data-panel-toggle]:not([aria-expanded])').forEach(btn => NDS.aria.expanded(btn, false));
        document.querySelectorAll(SELECTOR).forEach(panel => {
            if (panel.closest('code')) return;
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
