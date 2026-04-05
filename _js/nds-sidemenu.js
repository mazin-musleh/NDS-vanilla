// Side Menu Navigation
(() => {
    'use strict';

    // State helpers — delegated to NDS.State (nds-core.js)
    const { add: addState, remove: removeState, has: hasState, clear: clearState } = NDS.State;

    // Set --drawer-max-height for slider mode only
    const updateDrawerMaxHeight = (accMenu, drawer) => {
        const nav = document.getElementById('ndsMainNav');
        const topbar = document.querySelector('.nds-topbar');
        const navBottom = nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 0;
        const topbarBottom = topbar ? Math.max(0, topbar.getBoundingClientRect().bottom) : 0;
        const visibleHeader = Math.max(navBottom, topbarBottom);

        accMenu.style.paddingTop = visibleHeader + 'px';
        drawer.style.setProperty('--drawer-max-height', Math.max(window.innerHeight - visibleHeader, 100) + 'px');
    };

    function initializeActiveStates(accMenu) {
        accMenu.querySelectorAll('li[data-state~="active"]').forEach(activeItem => {
            let current = activeItem;
            while (current && current !== accMenu) {
                if (current.classList.contains("has-sub")) addState(current, 'open');
                current = current.parentElement.closest("li");
            }
        });
    }

    function setupAccordionToggle(accMenu) {
        accMenu.addEventListener("click", (e) => {
            const anchor = e.target.closest("li.has-sub > a");
            if (!anchor) return;

            e.preventDefault();
            const li = anchor.parentElement;
            const submenu = li.querySelector(":scope > ul");
            if (!submenu) return;

            const isOpen = hasState(li, 'open');
            anchor.setAttribute('aria-expanded', !isOpen);

            if (!isOpen) {
                // Batch: read all heights first, then write — single reflow
                const closingSiblings = [];
                [...li.parentElement.children].forEach(sibling => {
                    if (sibling === li || !sibling.classList.contains("has-sub")) return;
                    const siblingSub = sibling.querySelector(":scope > ul");
                    if (!hasState(sibling, 'open') || !siblingSub) return;
                    closingSiblings.push({ sibling, siblingSub, height: siblingSub.scrollHeight });
                });
                const openHeight = submenu.scrollHeight;

                // Write phase — one forced reflow for all transitions
                closingSiblings.forEach(({ sibling, siblingSub, height }) => {
                    const siblingAnchor = sibling.querySelector(":scope > a");
                    if (siblingAnchor) siblingAnchor.setAttribute('aria-expanded', 'false');
                    addState(sibling, 'closing');
                    siblingSub.style.height = height + "px";
                });
                addState(li, 'open', 'opening');
                submenu.style.height = "0px";

                submenu.offsetHeight; // Single reflow to commit start heights

                closingSiblings.forEach(({ sibling, siblingSub }) => {
                    siblingSub.style.height = "0px";
                    setTimeout(() => { clearState(sibling); siblingSub.style.height = ""; }, 250);
                });
                submenu.style.height = openHeight + "px";

                submenu.addEventListener("transitionend", function handler() {
                    removeState(li, 'opening');
                    submenu.style.height = "";
                    submenu.removeEventListener("transitionend", handler);
                });
            } else {
                // Close current — read then write
                const height = submenu.scrollHeight;
                addState(li, 'closing');
                submenu.style.height = height + "px";
                submenu.offsetHeight;
                submenu.style.height = "0px";
                setTimeout(() => { clearState(li); submenu.style.height = ""; }, 250);
            }
        });
    }

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
        const nav = document.getElementById('ndsMainNav');
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

    function setupScrollPeek(toggleBtn) {
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

        window.addEventListener('scroll', invalidate, { passive: true });
        NDS.onResize(invalidate);

        window.addEventListener('mousemove', (e) => {
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
        }, { passive: true });
    }

    function initializeSideMenu() {
        const accMenu = document.querySelector(".nds-sidemenu");
        if (!accMenu || accMenu.closest('code, .code-example')) return;

        const toggleBtn = document.getElementById("nds-sidemenu-toggle");
        const isTopMode = accMenu.closest('.nds-content-layout')?.classList.contains('nds-topSideMenu') ?? false;
        const animTarget = isTopMode ? accMenu.querySelector('.nds-drawer') : accMenu;
        const drawer = accMenu.querySelector('.nds-drawer');

        // Shared context object passed to open/close
        const ctx = { accMenu, animTarget, toggleBtn, isTopMode, drawer };

        initializeActiveStates(accMenu);
        setupAccordionToggle(accMenu);

        // Toggle button
        if (toggleBtn) {
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                hasState(animTarget, 'open') ? closeMenu(ctx) : openMenu(ctx);
            });
            toggleBtn.removeAttribute('hidden');
            updateToggleLabel(accMenu, toggleBtn, isTopMode);
            setupScrollPeek(toggleBtn);
        }

        // Click outside
        document.addEventListener("click", (e) => {
            if (!hasState(animTarget, 'open')) return;
            if (toggleBtn && toggleBtn.contains(e.target)) return;

            if (isTopMode) {
                if (drawer && drawer.contains(e.target)) return;
            } else {
                if (accMenu.contains(e.target)) return;
            }
            closeMenu(ctx);
        });

        // Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && hasState(animTarget, 'open')) closeMenu(ctx);
        });

        // Close on width change
        let prevWidth = window.innerWidth;
        NDS.onResize(() => {
            const w = window.innerWidth;
            if (w !== prevWidth) {
                prevWidth = w;
                if (hasState(animTarget, 'open')) closeMenu(ctx);
            }
        });
    }

    if (typeof window !== 'undefined') {
        NDS.SideMenu = { init: initializeSideMenu };
    }
})();
