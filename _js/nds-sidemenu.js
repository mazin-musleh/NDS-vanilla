/* NDS.Sidemenu — public surface
 * Rides: nds-drawer (the menu tree inside it — expand/collapse and the responsive
 *        open rules) · nds-backdrop (dims the page while it is open, and closes it on
 *        Escape or a click outside)
 * Requires:
 *   .nds-sidemenu needs .nds-sidemenu-toggle — the menu is inert
 *   .nds-sidemenu needs .nds-drawer — the first open throws
 * Methods:
 *   NDS.Sidemenu.init()      wire the one sidemenu on the page (destroys the previous
 *                            instance first, so it doubles as reinit)
 *   NDS.Sidemenu.destroy()   close it and release every listener
 * Events:
 *   (none)
 * Hooks:
 *   (none — class-driven markup: .nds-sidemenu holding a .nds-sidemenu-toggle button and
 *    a .nds-drawer. Add .nds-top for the top-sheet mode, and .nds-peek on the toggle to
 *    let it retract until the pointer comes near)
 * Gotchas:
 *   - One sidemenu per page: init() takes the FIRST .nds-sidemenu it finds.
 *   - There is no reinit(): call init() again and it re-wires from scratch.
 *   - init() does not start the drawer: new markup needs NDS.init.refresh().
 *   - .nds-top scrolls its bar to the top and locks the page before it opens.
 *   - A width change closes it.
 *   - The top bar label is the active <li>'s label, and follows the mark when it moves.
 */
// Side Menu Navigation
(() => {
    'use strict';

    const { add: addState, has: hasState, clear: clearState } = NDS.state;

    // Track current instance for cleanup on re-init
    let currentInstance = null;

    // Slide-in only: clear the visible header and fit the list below it
    const syncDrawerMaxHeight = (sidemenu, drawer) => {
        const visibleHeader = NDS.getStickyHeaderBottom();

        sidemenu.style.paddingTop = (visibleHeader > 0 ? visibleHeader + 8 : 0) + 'px';
        drawer.style.setProperty('--drawer-max-height', Math.max(window.innerHeight - visibleHeader - 16, 100) + 'px');
    };

    // Top bar: scroll the bar to its sticky spot, then lock. A lock mid-scroll would
    // stop it short, so wait for the scroll to settle (a touch can interrupt it).
    const scrollBarUpAndLock = (menuState) => {
        const bar = menuState.accMenu;
        const getBarGap = () => bar.getBoundingClientRect().top - parseFloat(getComputedStyle(bar).top);
        let done = false;
        const lock = () => {
            if (done || !hasState(menuState.animTarget, 'open')) return;
            done = true;
            if (getBarGap() >= 1) window.scrollBy({ top: getBarGap(), behavior: 'instant' });
            NDS.scrollLock.lock();
        };
        if (getBarGap() < 1) return lock();

        window.scrollBy({ top: getBarGap(), behavior: NDS.prefersReducedMotion ? 'auto' : 'smooth' });
        let lastY = -1;
        let still = 0;
        const settle = () => {
            if (done) return;
            still = window.scrollY === lastY ? still + 1 : 0;
            lastY = window.scrollY;
            still >= 3 ? lock() : requestAnimationFrame(settle);
        };
        requestAnimationFrame(settle);
        setTimeout(lock, 500);
    };

    // Epoch counter to invalidate stale z-index removals
    let menuEpoch = 0;

    const openMenu = (menuState) => {
        const { accMenu: sidemenu, animTarget: animationTarget, toggleBtn, isTopMode, drawer } = menuState;
        menuEpoch++;

        const backdropZ = isTopMode ? 997 : 998;

        if (!isTopMode) syncDrawerMaxHeight(sidemenu, drawer);
        sidemenu.style.zIndex = backdropZ + 1;
        addState(toggleBtn, 'open');
        NDS.aria.expanded(toggleBtn, true);
        addState(animationTarget, 'open');
        // After the open state: the lock checks it.
        if (isTopMode) scrollBarUpAndLock(menuState);

        NDS.Backdrop.show({
            zIndex: backdropZ,
            preventScroll: !isTopMode,
            onClick: () => closeMenu(menuState)
        });
    };

    // Undo everything openMenu() wrote, except the z-index.
    const reset = (menuState) => {
        const { accMenu: sidemenu, animTarget: animationTarget, toggleBtn, isTopMode, drawer } = menuState;
        clearState(animationTarget);
        if (isTopMode) NDS.scrollLock.unlock();
        else sidemenu.style.removeProperty('padding-top');
        clearState(toggleBtn);
        NDS.aria.expanded(toggleBtn, false);
        drawer.style.removeProperty('--drawer-max-height');
        NDS.Backdrop.hide();
    };

    const closeMenu = (menuState) => {
        const { accMenu: sidemenu, animTarget: animationTarget } = menuState;
        if (!hasState(animationTarget, 'open') || hasState(animationTarget, 'closing')) return;
        const closeEpoch = menuEpoch;

        addState(animationTarget, 'closing');

        NDS.onTransitionEnd(animationTarget, () => {
            reset(menuState);
            // Stay above the backdrop while it fades out.
            setTimeout(() => { if (closeEpoch === menuEpoch) sidemenu.style.removeProperty('z-index'); }, 300);
        });
    };

    function syncToggleLabel(sidemenu, toggleBtn, isTopMode) {
        const labelSpan = toggleBtn.querySelector('.nds-label');
        if (!labelSpan) return;

        const menuLabel = sidemenu.querySelector('li[data-state~="active"] .nds-btn .nds-label')
            || sidemenu.querySelector('.nds-drawer-list > li .nds-btn .nds-label');
        if (menuLabel && labelSpan.textContent !== menuLabel.textContent) labelSpan.textContent = menuLabel.textContent;
        // The label shows only on the top bar; the slide-in button is icon-only.
        labelSpan.hidden = !isTopMode;
    }

    function setupScrollPeek(toggleBtn, abortController) {
        if (!toggleBtn.classList.contains('nds-peek')) return;

        const { signal } = abortController;
        // Flash peek on page load
        toggleBtn.classList.remove('nds-peek');
        const flash = setTimeout(() => toggleBtn.classList.add('nds-peek'), 1500);

        const threshold = 60;
        let cachedRect = null;
        let rectTimer = null;

        const invalidate = () => { cachedRect = null; };
        const getRect = () => {
            if (!cachedRect) {
                cachedRect = toggleBtn.getBoundingClientRect();
                clearTimeout(rectTimer);
                rectTimer = setTimeout(invalidate, 500);
            }
            return cachedRect;
        };

        const mousemoveHandler = NDS.throttleToFrame((e) => {
            const rect = getRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const distance = Math.hypot(e.clientX - cx, e.clientY - cy);
            toggleBtn.classList.toggle('nds-peek', distance > threshold);
        });

        window.addEventListener('mousemove', mousemoveHandler, { passive: true, signal });
        // The authored peek comes back with the button's resting look.
        signal.addEventListener('abort', () => {
            clearTimeout(flash);
            clearTimeout(rectTimer);
            toggleBtn.classList.add('nds-peek');
        });
        // Pooled handle takes no signal — bridge it onto the same teardown.
        const offResize = NDS.onResize(invalidate);
        signal.addEventListener('abort', offResize);
    }

    function destroy() {
        if (currentInstance) {
            const { abortController, accMenu: sidemenu, animTarget: animationTarget, toggleBtn } = currentInstance;

            if (hasState(animationTarget, 'open')) {
                reset(currentInstance);
                sidemenu.style.removeProperty('z-index');
            }

            // One abort releases every listener plus the bridged pooled subscribers.
            abortController.abort();
            // The markup ships the button hidden until script can drive it.
            if (currentInstance.wasHidden) toggleBtn.hidden = true;
            if (currentInstance.ownExpanded) toggleBtn.removeAttribute('aria-expanded');
            delete sidemenu.ndsSidemenu;
            currentInstance = null;
        }
    }

    function setupSideMenu() {
        const sidemenu = document.querySelector(".nds-sidemenu");
        if (!sidemenu || sidemenu.closest('code')) return;

        // Destroy previous instance to prevent duplicate listeners
        destroy();

        const abortController = new AbortController();

        const toggleBtn = sidemenu.querySelector(".nds-sidemenu-toggle");
        if (!toggleBtn) return;
        const isTopMode = sidemenu.classList.contains('nds-top');
        const animationTarget = isTopMode ? sidemenu.querySelector('.nds-drawer') : sidemenu;
        const drawer = sidemenu.querySelector('.nds-drawer');

        // Shared context object passed to open/close
        const menuState = { accMenu: sidemenu, animTarget: animationTarget, toggleBtn, isTopMode, drawer, abortController };

        // Store for cleanup
        currentInstance = menuState;
        // NDS.init.destroy(view) finds instances through an nds* backref on the element.
        sidemenu.ndsSidemenu = { destroy: () => { if (currentInstance === menuState) destroy(); } };

        // Closed is the start state; open/close only write on a flip.
        menuState.ownExpanded = !toggleBtn.hasAttribute('aria-expanded');
        if (menuState.ownExpanded) NDS.aria.expanded(toggleBtn, false);
        // Escape and a click outside reach the backdrop's onClick.
        toggleBtn.addEventListener("click", () => {
            hasState(animationTarget, 'open') ? closeMenu(menuState) : openMenu(menuState);
        }, { signal: abortController.signal });
        menuState.wasHidden = toggleBtn.hidden;
        toggleBtn.removeAttribute('hidden');
        syncToggleLabel(sidemenu, toggleBtn, isTopMode);
        // The label follows an active mark a client-side route moves.
        const offLabel = NDS.onAttributeChange('.nds-sidemenu li', ['data-state'], () => syncToggleLabel(sidemenu, toggleBtn, isTopMode));
        abortController.signal.addEventListener('abort', offLabel);
        setupScrollPeek(toggleBtn, abortController);

        // Close on width change
        let prevWidth = window.innerWidth;
        const handleResize = () => {
            const width = window.innerWidth;
            if (width !== prevWidth) {
                prevWidth = width;
                if (hasState(animationTarget, 'open')) closeMenu(menuState);
            }
        };
        // Pooled handle takes no signal — bridge it onto the same teardown, or each
        // setupSideMenu() call leaks a new subscriber on top of the previous one
        // (the stale handler keeps mutating state via the ctx closure).
        const offResize = NDS.onResize(handleResize);
        abortController.signal.addEventListener('abort', offResize);
    }

    NDS.Sidemenu = { init: setupSideMenu, destroy };
})();
