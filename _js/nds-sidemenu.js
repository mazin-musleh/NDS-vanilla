/* NDS.Sidemenu — public surface
 * Rides: nds-drawer (the menu tree inside it — expand/collapse and the responsive
 *        open rules) · nds-backdrop (dims the page while it is open, and closes it on
 *        Escape or a click outside)
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
 *   - init() does not start the drawer: new markup needs NDS.Init.refresh().
 *   - .nds-top scrolls its bar to the top and locks the page before it opens.
 *   - A width change closes it.
 */
// Side Menu Navigation
(() => {
    'use strict';

    const { add: addState, has: hasState, clear: clearState } = NDS.State;

    // Track current instance for cleanup on re-init
    let currentInstance = null;

    // Slide-in only: clear the visible header and fit the list below it
    const updateDrawerMaxHeight = (accMenu, drawer) => {
        const visibleHeader = NDS.stickyHeaderBottom();

        accMenu.style.paddingTop = (visibleHeader > 0 ? visibleHeader + 8 : 0) + 'px';
        drawer.style.setProperty('--drawer-max-height', Math.max(window.innerHeight - visibleHeader - 16, 100) + 'px');
    };

    // Top bar: scroll the bar to its sticky spot, then lock. A lock mid-scroll would
    // stop it short, so wait for the scroll to settle (a touch can interrupt it).
    const scrollBarUpAndLock = (ctx) => {
        const bar = ctx.accMenu;
        const gap = () => bar.getBoundingClientRect().top - parseFloat(getComputedStyle(bar).top);
        let done = false;
        const lock = () => {
            if (done || !hasState(ctx.animTarget, 'open')) return;
            done = true;
            if (gap() >= 1) window.scrollBy({ top: gap(), behavior: 'instant' });
            NDS.scrollLock.lock();
        };
        if (gap() < 1) return lock();

        window.scrollBy({ top: gap(), behavior: NDS.prefersReducedMotion ? 'auto' : 'smooth' });
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

    const openMenu = (ctx) => {
        const { accMenu, animTarget, toggleBtn, isTopMode, drawer } = ctx;
        menuEpoch++;

        const backdropZ = isTopMode ? 997 : 998;

        if (!isTopMode) updateDrawerMaxHeight(accMenu, drawer);
        accMenu.style.zIndex = backdropZ + 1;
        addState(toggleBtn, 'open');
        NDS.aria.expanded(toggleBtn, true);
        addState(animTarget, 'open');
        // After the open state: the lock checks it.
        if (isTopMode) scrollBarUpAndLock(ctx);

        NDS.Backdrop.show({
            zIndex: backdropZ,
            preventScroll: !isTopMode,
            onClick: () => closeMenu(ctx)
        });
    };

    // Undo everything openMenu() wrote, except the z-index.
    const reset = (ctx) => {
        const { accMenu, animTarget, toggleBtn, isTopMode, drawer } = ctx;
        clearState(animTarget);
        if (isTopMode) NDS.scrollLock.unlock();
        else accMenu.style.removeProperty('padding-top');
        clearState(toggleBtn);
        NDS.aria.expanded(toggleBtn, false);
        drawer.style.removeProperty('--drawer-max-height');
        NDS.Backdrop.hide();
    };

    const closeMenu = (ctx) => {
        const { accMenu, animTarget } = ctx;
        if (!hasState(animTarget, 'open') || hasState(animTarget, 'closing')) return;
        const closeEpoch = menuEpoch;

        addState(animTarget, 'closing');

        NDS.onTransitionEnd(animTarget, () => {
            reset(ctx);
            // Stay above the backdrop while it fades out.
            setTimeout(() => { if (closeEpoch === menuEpoch) accMenu.style.removeProperty('z-index'); }, 300);
        });
    };

    function updateToggleLabel(accMenu, toggleBtn, isTopMode) {
        const labelSpan = toggleBtn.querySelector('.nds-label');
        if (!labelSpan) return;

        const menuLabel = accMenu.querySelector('li[data-state~="active"] .nds-btn .nds-label')
            || accMenu.querySelector('.nds-drawer-list > li .nds-btn .nds-label');
        if (menuLabel) labelSpan.textContent = menuLabel.textContent;
        // The label shows only on the top bar; the slide-in button is icon-only.
        labelSpan.hidden = !isTopMode;
    }

    function setupScrollPeek(toggleBtn, abortController) {
        if (!toggleBtn.classList.contains('nds-peek')) return;

        // Flash peek on page load
        toggleBtn.classList.remove('nds-peek');
        setTimeout(() => toggleBtn.classList.add('nds-peek'), 1500);

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

        const mousemoveHandler = NDS.rafThrottle((e) => {
            const rect = getRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
            toggleBtn.classList.toggle('nds-peek', dist > threshold);
        });

        const { signal } = abortController;
        window.addEventListener('mousemove', mousemoveHandler, { passive: true, signal });
        // Pooled handle takes no signal — bridge it onto the same teardown.
        const offResize = NDS.onResize(invalidate);
        signal.addEventListener('abort', offResize);
    }

    function destroy() {
        if (currentInstance) {
            const { abortController, accMenu, animTarget } = currentInstance;

            if (hasState(animTarget, 'open')) {
                reset(currentInstance);
                accMenu.style.removeProperty('z-index');
            }

            // One abort releases every listener plus the bridged pooled subscribers.
            abortController.abort();
            currentInstance = null;
        }
    }

    function initializeSideMenu() {
        const accMenu = document.querySelector(".nds-sidemenu");
        if (!accMenu || accMenu.closest('code, .code-example')) return;

        // Destroy previous instance to prevent duplicate listeners
        destroy();

        const abortController = new AbortController();

        const toggleBtn = accMenu.querySelector(".nds-sidemenu-toggle");
        if (!toggleBtn) return;
        const isTopMode = accMenu.classList.contains('nds-top');
        const animTarget = isTopMode ? accMenu.querySelector('.nds-drawer') : accMenu;
        const drawer = accMenu.querySelector('.nds-drawer');

        // Shared context object passed to open/close
        const ctx = { accMenu, animTarget, toggleBtn, isTopMode, drawer, abortController };

        // Store for cleanup
        currentInstance = ctx;

        // Closed is the start state; open/close only write on a flip.
        if (!toggleBtn.hasAttribute('aria-expanded')) NDS.aria.expanded(toggleBtn, false);
        // Escape and a click outside reach the backdrop's onClick.
        toggleBtn.addEventListener("click", () => {
            hasState(animTarget, 'open') ? closeMenu(ctx) : openMenu(ctx);
        }, { signal: abortController.signal });
        toggleBtn.removeAttribute('hidden');
        updateToggleLabel(accMenu, toggleBtn, isTopMode);
        setupScrollPeek(toggleBtn, abortController);

        // Close on width change
        let prevWidth = window.innerWidth;
        const resizeHandler = () => {
            const w = window.innerWidth;
            if (w !== prevWidth) {
                prevWidth = w;
                if (hasState(animTarget, 'open')) closeMenu(ctx);
            }
        };
        // Pooled handle takes no signal — bridge it onto the same teardown, or each
        // initializeSideMenu() call leaks a new subscriber on top of the previous one
        // (the stale handler keeps mutating state via the ctx closure).
        const offResize = NDS.onResize(resizeHandler);
        abortController.signal.addEventListener('abort', offResize);
    }

    NDS.Sidemenu = { init: initializeSideMenu, destroy };
})();
