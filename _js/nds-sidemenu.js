// Side Menu Navigation
(() => {
    'use strict';

    // State helpers — delegated to NDS.State (nds-core.js)
    const { add: addState, remove: removeState, has: hasState, clear: clearState } = NDS.State;

    // Track current instance for cleanup on re-init
    let currentInstance = null;

    // Set --drawer-max-height for slider mode only
    const updateDrawerMaxHeight = (accMenu, drawer) => {
        const nav = document.querySelector('.nds-main-nav');
        const topbar = document.querySelector('.nds-topbar');
        const navBottom = nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 0;
        const topbarBottom = topbar ? Math.max(0, topbar.getBoundingClientRect().bottom) : 0;
        const visibleHeader = Math.max(navBottom, topbarBottom);

        accMenu.style.paddingTop = (visibleHeader > 0 ? visibleHeader + 8 : 0) + 'px';
        drawer.style.setProperty('--drawer-max-height', Math.max(window.innerHeight - visibleHeader - 16, 100) + 'px');
    };

    // Scroll lock helpers for top mode
    const lockBodyScroll = () => {
        const scrollY = window.pageYOffset;
        document.body.style.top = `-${scrollY}px`;
        NDS.State.set(document.body, 'backdrop');
    };

    const unlockBodyScroll = () => {
        if (!document.body.style.top) return;
        const scrollY = parseInt(document.body.style.top, 10) * -1;
        document.body.style.top = '';
        NDS.State.clear(document.body);
        window.scrollTo(0, scrollY);
    };

    // Scroll past hero then lock — handles user touch interruption
    const scrollPastHeroAndLock = () => {
        const heroSection = document.querySelector('.nds-hero-section');
        const nav = document.querySelector('.nds-main-nav');
        const navBottom = nav ? nav.getBoundingClientRect().bottom : 0;
        const heroBtm = heroSection ? heroSection.getBoundingClientRect().bottom : 0;

        if (!heroSection || heroBtm <= navBottom) {
            lockBodyScroll();
            return;
        }

        window.scrollTo({ top: heroBtm + window.scrollY, behavior: 'smooth' });

        let locked = false;
        const doLock = () => {
            if (locked) return;
            locked = true;
            // If hero still visible (user touch interrupted smooth scroll), force instant scroll
            const currentBtm = heroSection.getBoundingClientRect().bottom;
            if (currentBtm > navBottom) {
                window.scrollTo({ top: currentBtm + window.scrollY, behavior: 'instant' });
            }
            lockBodyScroll();
        };

        let lastY = window.pageYOffset;
        let stableFrames = 0;
        const checkSettled = () => {
            if (locked) return;
            const currentY = window.pageYOffset;
            if (currentY === lastY) { stableFrames++; } else { stableFrames = 0; lastY = currentY; }
            stableFrames >= 3 ? doLock() : requestAnimationFrame(checkSettled);
        };
        requestAnimationFrame(checkSettled);
        setTimeout(doLock, 500);
    };

    // Get mainContent sibling
    const getMainContent = (accMenu) => {
        const el = accMenu.nextElementSibling;
        return el && el.classList.contains('nds-main-content') ? el : null;
    };

    // Epoch counter to invalidate stale z-index removals
    let menuEpoch = 0;

    const openMenu = (ctx) => {
        const { accMenu, animTarget, toggleBtn, isTopMode, drawer } = ctx;
        menuEpoch++;

        const backdropZ = isTopMode ? 997 : 998;

        // Layout reads BEFORE any style writes to avoid forced reflow
        if (isTopMode) {
            scrollPastHeroAndLock();
        } else {
            updateDrawerMaxHeight(accMenu, drawer);
        }

        // Style writes after reads
        accMenu.style.zIndex = backdropZ + 1;

        // Show backdrop
        if (NDS.Backdrop) {
            NDS.Backdrop.show({
                zIndex: backdropZ,
                preventScroll: !isTopMode,
                onClick: () => { if (hasState(animTarget, 'open')) closeMenu(ctx); }
            });
        }

        if (toggleBtn) addState(toggleBtn, 'open');

        if (isTopMode) {
            addState(accMenu, 'open');
            addState(animTarget, 'open', 'opening');
            const mainContent = getMainContent(accMenu);
            if (mainContent) mainContent.style.setProperty('--_topsubmenu-height', accMenu.offsetHeight + 'px');
        } else {
            addState(animTarget, 'open', 'opening');
            accMenu.classList.remove('nds-peek');
        }

        const onOpened = () => {
            removeState(animTarget, 'opening');
            if (isTopMode && NDS.Drawer) NDS.Drawer.checkOverflow(animTarget);
            animTarget.removeEventListener('transitionend', onOpened);
        };
        animTarget.addEventListener('transitionend', onOpened);
    };

    const closeMenu = (ctx) => {
        const { accMenu, animTarget, toggleBtn, isTopMode, drawer } = ctx;
        const closeEpoch = menuEpoch;

        if (isTopMode) addState(accMenu, 'closing');
        addState(animTarget, 'closing');

        let done = false;
        const cleanup = () => {
            if (done) return;
            done = true;

            clearState(animTarget);
            if (isTopMode) {
                clearState(accMenu);
                const mainContent = getMainContent(accMenu);
                if (mainContent) mainContent.style.removeProperty('--_topsubmenu-height');
                unlockBodyScroll();
            } else {
                accMenu.classList.add('nds-peek');
                accMenu.style.removeProperty('padding-top');
            }
            if (toggleBtn) clearState(toggleBtn);
            if (drawer) drawer.style.removeProperty('--drawer-max-height');

            if (NDS.Backdrop) NDS.Backdrop.hide();
            setTimeout(() => { if (closeEpoch === menuEpoch) accMenu.style.removeProperty('z-index'); }, 300);
            animTarget.removeEventListener('transitionend', onClosed);
        };

        const onClosed = (e) => {
            if (e && e.target !== animTarget) return;
            cleanup();
        };

        animTarget.addEventListener('transitionend', onClosed);
        setTimeout(() => { if (!done) cleanup(); }, 300);
    };

    function updateToggleLabel(accMenu, toggleBtn, isTopMode) {
        const labelSpan = toggleBtn.querySelector('.nds-label');
        if (!labelSpan) return;

        const menuLabel = accMenu.querySelector('li[data-state~="active"] .nds-btn .nds-label')
            || accMenu.querySelector('.nds-drawer-list > li .nds-btn .nds-label');
        if (menuLabel) labelSpan.textContent = menuLabel.textContent;

        if (isTopMode) {
            labelSpan.removeAttribute('hidden');
            toggleBtn.classList.add('nds-menu-btn', 'nds-subtle', 'nds-indicator');
            toggleBtn.classList.remove('nds-primary');
        } else {
            labelSpan.setAttribute('hidden', '');
            toggleBtn.classList.add('nds-primary', 'nds-indicator');
            toggleBtn.classList.remove('nds-menu-btn', 'nds-subtle');
        }
    }

    function setupScrollPeek(toggleBtn, ac) {
        if (!toggleBtn.classList.contains('nds-peek')) return;

        // Flash peek on page load
        toggleBtn.classList.remove('nds-peek');
        setTimeout(() => toggleBtn.classList.add('nds-peek'), 1500);

        let ticking = false;
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

        const scrollHandler = () => invalidate();
        const mousemoveHandler = (e) => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const rect = getRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);
                toggleBtn.classList.toggle('nds-peek', dist > threshold);
                ticking = false;
            });
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
        NDS.onResize(invalidate);
        window.addEventListener('mousemove', mousemoveHandler, { passive: true });

        ac.signal.addEventListener('abort', () => {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('mousemove', mousemoveHandler);
        });
    }

    function destroy() {
        if (currentInstance) {
            const { ac, accMenu, animTarget, toggleBtn, isTopMode, drawer } = currentInstance;

            // Close menu if open before destroying
            if (hasState(animTarget, 'open')) {
                clearState(animTarget);
                if (isTopMode) {
                    clearState(accMenu);
                    const mainContent = getMainContent(accMenu);
                    if (mainContent) mainContent.style.removeProperty('--_topsubmenu-height');
                    unlockBodyScroll();
                } else {
                    accMenu.style.removeProperty('padding-top');
                }
                if (toggleBtn) clearState(toggleBtn);
                if (drawer) drawer.style.removeProperty('--drawer-max-height');
                if (NDS.Backdrop) NDS.Backdrop.hide();
                accMenu.style.removeProperty('z-index');
            }

            // Abort all listeners registered via this AbortController
            ac.abort();
            currentInstance = null;
        }
    }

    function initializeSideMenu() {
        const accMenu = document.querySelector(".nds-sidemenu");
        if (!accMenu || accMenu.closest('code, .code-example')) return;

        // Destroy previous instance to prevent duplicate listeners
        destroy();

        const ac = new AbortController();

        const toggleBtn = accMenu.querySelector(".nds-sidemenu-toggle");
        const isTopMode = accMenu.classList.contains('nds-top');
        const animTarget = isTopMode ? accMenu.querySelector('.nds-drawer') : accMenu;
        const drawer = accMenu.querySelector('.nds-drawer');

        // Shared context object passed to open/close
        const ctx = { accMenu, animTarget, toggleBtn, isTopMode, drawer, ac };

        // Store for cleanup
        currentInstance = ctx;

        // Toggle button
        if (toggleBtn) {
            const toggleHandler = (e) => {
                e.stopPropagation();
                hasState(animTarget, 'open') ? closeMenu(ctx) : openMenu(ctx);
            };
            toggleBtn.addEventListener("click", toggleHandler, { signal: ac.signal });
            toggleBtn.removeAttribute('hidden');
            updateToggleLabel(accMenu, toggleBtn, isTopMode);
            setupScrollPeek(toggleBtn, ac);
        }

        // Click outside
        const outsideHandler = (e) => {
            if (!hasState(animTarget, 'open')) return;
            if (toggleBtn && toggleBtn.contains(e.target)) return;

            if (isTopMode) {
                if (drawer && drawer.contains(e.target)) return;
            } else {
                if (accMenu.contains(e.target)) return;
            }
            closeMenu(ctx);
        };
        document.addEventListener("click", outsideHandler, { signal: ac.signal });

        // Escape key
        const escapeHandler = (e) => {
            if (e.key === "Escape" && hasState(animTarget, 'open')) closeMenu(ctx);
        };
        document.addEventListener("keydown", escapeHandler, { signal: ac.signal });

        // Close on width change
        let prevWidth = window.innerWidth;
        const resizeHandler = () => {
            const w = window.innerWidth;
            if (w !== prevWidth) {
                prevWidth = w;
                if (hasState(animTarget, 'open')) closeMenu(ctx);
            }
        };
        NDS.onResize(resizeHandler);
        ac.signal.addEventListener('abort', () => {
            // NDS.onResize doesn't support removal, but the handler
            // checks currentInstance implicitly via ctx closure
        });
    }

    if (typeof window !== 'undefined') {
        NDS.Sidemenu = { init: initializeSideMenu };
    }
})();
