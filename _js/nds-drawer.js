/**
 * NDS Drawer Component
 * Handles expand/collapse of nested menus and hasMore overflow detection
 */

(function () {
    'use strict';

    const CONFIG = {
        selectors: {
            drawer: '.nds-drawer',
            list: '.nds-drawer-list',
            scroll: '.nds-drawer-scroll',
            moreBtn: '.nds-drawer-more'
        },
        classes: {
            open: 'open',
            active: 'active',
            hasMore: 'hasMore',
            atEnd: 'atEnd',
            show: 'show',
            opening: 'opening',
            opened: 'opened',
            closing: 'closing'
        },
        scrollThreshold: 20,
        scrollAmount: 0.8,
        transitionDuration: 250
    };

    // ==============================================
    // EXPAND/COLLAPSE FUNCTIONALITY
    // ==============================================

    function toggleSubmenu(button) {
        const listItem = button.closest('li');
        if (!listItem) return;

        const submenu = listItem.querySelector(':scope > ul');
        if (!submenu) return;

        if (listItem.classList.contains(CONFIG.classes.open)) {
            hideSubmenu(listItem, button, submenu);
        } else {
            // Accordion: close siblings
            const parentList = listItem.parentElement;
            if (parentList) {
                parentList.querySelectorAll(':scope > li.open').forEach(sibling => {
                    if (sibling !== listItem) {
                        const btn = sibling.querySelector(':scope > .nds-btn');
                        const sub = sibling.querySelector(':scope > ul');
                        if (btn && sub) hideSubmenu(sibling, btn, sub);
                    }
                });
            }
            showSubmenu(listItem, button, submenu);
        }
    }

    function showSubmenu(listItem, button, submenu) {
        submenu.classList.add(CONFIG.classes.show, CONFIG.classes.opening);
        listItem.classList.add(CONFIG.classes.open);
        button.setAttribute('aria-expanded', 'true');
        submenu.style.height = submenu.scrollHeight + 'px';

        const cleanup = () => {
            submenu.removeEventListener('transitionend', cleanup);
            submenu.classList.remove(CONFIG.classes.opening);
            submenu.classList.add(CONFIG.classes.opened);
            submenu.style.height = '';
            dispatchDrawerEvent(listItem, 'shown');
        };

        submenu.addEventListener('transitionend', cleanup);
        setTimeout(() => {
            if (submenu.classList.contains(CONFIG.classes.opening)) cleanup();
        }, CONFIG.transitionDuration + 50);
    }

    function hideSubmenu(listItem, button, submenu) {
        submenu.style.height = submenu.scrollHeight + 'px';
        submenu.offsetHeight; // Force reflow
        submenu.classList.remove(CONFIG.classes.opened);
        submenu.classList.add(CONFIG.classes.closing);
        submenu.style.height = '0px';
        listItem.classList.remove(CONFIG.classes.open);
        button.setAttribute('aria-expanded', 'false');

        const cleanup = () => {
            submenu.removeEventListener('transitionend', cleanup);
            submenu.classList.remove(CONFIG.classes.closing, CONFIG.classes.show);
            submenu.style.height = '';
            dispatchDrawerEvent(listItem, 'hidden');
        };

        submenu.addEventListener('transitionend', cleanup);
        setTimeout(() => {
            if (submenu.classList.contains(CONFIG.classes.closing)) cleanup();
        }, CONFIG.transitionDuration + 50);
    }

    function dispatchDrawerEvent(listItem, eventType) {
        const drawer = listItem.closest(CONFIG.selectors.drawer);
        drawer?.dispatchEvent(new CustomEvent(`nds:drawer:${eventType}`, {
            detail: { item: listItem, drawer },
            bubbles: true
        }));
    }

    function initToggles(drawer) {
        drawer.querySelectorAll('.nds-drawer-list > li').forEach(li => {
            const submenu = li.querySelector(':scope > ul');
            if (!submenu) return;

            const button = li.querySelector(':scope > .nds-btn');
            if (!button) return;

            const isOpen = li.classList.contains(CONFIG.classes.open);
            button.setAttribute('aria-expanded', isOpen);

            if (isOpen) {
                submenu.classList.add(CONFIG.classes.show, CONFIG.classes.opened);
            }

            button.addEventListener('click', (e) => {
                if (button.tagName === 'BUTTON' || button.getAttribute('href') === '#') {
                    e.preventDefault();
                    toggleSubmenu(button);
                }
            });
        });
    }

    // ==============================================
    // DYNAMIC MAX-HEIGHT CALCULATION
    // ==============================================

    function needsDynamicHeight(drawer) {
        if (!drawer.querySelector(CONFIG.selectors.scroll)) return false;
        return drawer.classList.contains('nds-full-height') || drawer.closest('.nds-sideMenu');
    }

    function updateMaxHeight(drawer) {
        const scrollContainer = drawer.querySelector(CONFIG.selectors.scroll);
        if (!scrollContainer) return;

        const drawerRect = drawer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const visibleTop = Math.max(0, drawerRect.top);

        let parentBottom = viewportHeight;
        const parent = drawer.parentElement;
        if (parent) {
            const parentRect = parent.getBoundingClientRect();
            parentBottom = Math.min(viewportHeight, parentRect.top + parent.clientHeight);
        }

        const availableHeight = parentBottom - visibleTop - 8;
        if (availableHeight < 100) return;

        const list = scrollContainer.querySelector(CONFIG.selectors.list);
        const contentHeight = list ? list.scrollHeight : scrollContainer.scrollHeight;

        if (contentHeight > availableHeight) {
            drawer.style.setProperty('--_max-height', `${availableHeight}px`);
        } else {
            drawer.style.removeProperty('--_max-height');
        }
    }

    function initDynamicHeight(drawer) {
        if (!needsDynamicHeight(drawer)) return;

        updateMaxHeight(drawer);

        let ticking = false;
        const handleUpdate = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                updateMaxHeight(drawer);
                ticking = false;
            });
        };

        const handleDrawerChange = () => {
            requestAnimationFrame(() => {
                updateMaxHeight(drawer);
                checkOverflow(drawer);
            });
        };

        window.addEventListener('scroll', handleUpdate, { passive: true });
        window.addEventListener('resize', handleUpdate, { passive: true });
        drawer.addEventListener('nds:drawer:shown', handleDrawerChange);
        drawer.addEventListener('nds:drawer:hidden', handleDrawerChange);

        drawer._scrollHandler = handleUpdate;
        drawer._resizeHandler = handleUpdate;
        drawer._drawerChangeHandler = handleDrawerChange;
    }

    // ==============================================
    // HAS-MORE OVERFLOW DETECTION
    // ==============================================

    function checkOverflow(drawer) {
        const scrollContainer = drawer.querySelector(CONFIG.selectors.scroll);
        if (!scrollContainer) return;

        const hasOverflow = scrollContainer.scrollHeight > scrollContainer.clientHeight;
        drawer.classList.toggle(CONFIG.classes.hasMore, hasOverflow);

        if (hasOverflow) {
            checkScrollPosition(drawer, scrollContainer);
        } else {
            drawer.classList.remove(CONFIG.classes.atEnd);
        }
    }

    function checkScrollPosition(drawer, scrollContainer) {
        scrollContainer = scrollContainer || drawer.querySelector(CONFIG.selectors.scroll);
        if (!scrollContainer) return;

        const isAtEnd = scrollContainer.scrollHeight - scrollContainer.scrollTop
            <= scrollContainer.clientHeight + CONFIG.scrollThreshold;
        drawer.classList.toggle(CONFIG.classes.atEnd, isAtEnd);
    }

    function scrollDrawer(drawer) {
        const scrollContainer = drawer.querySelector(CONFIG.selectors.scroll);
        if (!scrollContainer) return;

        const isAtEnd = drawer.classList.contains(CONFIG.classes.atEnd);
        scrollContainer.scrollTo({
            top: isAtEnd ? 0 : scrollContainer.scrollTop + scrollContainer.clientHeight * CONFIG.scrollAmount,
            behavior: 'smooth'
        });
    }

    function initHasMore(drawer) {
        const scrollContainer = drawer.querySelector(CONFIG.selectors.scroll);
        if (!scrollContainer) return;

        const moreBtn = drawer.querySelector(CONFIG.selectors.moreBtn);

        checkOverflow(drawer);

        let ticking = false;
        scrollContainer.addEventListener('scroll', () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                checkScrollPosition(drawer, scrollContainer);
                ticking = false;
            });
        }, { passive: true });

        if (moreBtn) {
            moreBtn.addEventListener('click', () => scrollDrawer(drawer));
        }

        const resizeObserver = new ResizeObserver(() => checkOverflow(drawer));
        resizeObserver.observe(scrollContainer);
        drawer._resizeObserver = resizeObserver;
    }

    // ==============================================
    // ACTIVE STATE MANAGEMENT
    // ==============================================

    function initActiveStates(drawer) {
        drawer.querySelectorAll(`.${CONFIG.classes.active}`).forEach(activeItem => {
            let parent = activeItem.closest('ul')?.closest('li');

            while (parent && drawer.contains(parent)) {
                if (!parent.classList.contains(CONFIG.classes.open)) {
                    parent.classList.add(CONFIG.classes.open);

                    const btn = parent.querySelector(':scope > .nds-btn');
                    if (btn) btn.setAttribute('aria-expanded', 'true');

                    const submenu = parent.querySelector(':scope > ul');
                    if (submenu) submenu.classList.add(CONFIG.classes.show, CONFIG.classes.opened);
                }
                parent = parent.closest('ul')?.closest('li');
            }
        });
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================

    function initDrawer(drawer) {
        if (drawer._ndsDrawerInitialized) return;

        initToggles(drawer);
        initActiveStates(drawer);
        initDynamicHeight(drawer);
        initHasMore(drawer);

        drawer._ndsDrawerInitialized = true;
    }

    function initAllDrawers() {
        document.querySelectorAll(CONFIG.selectors.drawer).forEach(drawer => {
            if (drawer.closest('code, .code-example')) return;
            initDrawer(drawer);
        });
    }

    function destroyDrawer(drawer) {
        if (drawer._resizeObserver) {
            drawer._resizeObserver.disconnect();
            delete drawer._resizeObserver;
        }
        if (drawer._scrollHandler) {
            window.removeEventListener('scroll', drawer._scrollHandler);
            delete drawer._scrollHandler;
        }
        if (drawer._resizeHandler) {
            window.removeEventListener('resize', drawer._resizeHandler);
            delete drawer._resizeHandler;
        }
        if (drawer._drawerChangeHandler) {
            drawer.removeEventListener('nds:drawer:shown', drawer._drawerChangeHandler);
            drawer.removeEventListener('nds:drawer:hidden', drawer._drawerChangeHandler);
            delete drawer._drawerChangeHandler;
        }
        delete drawer._ndsDrawerInitialized;
    }

    // ==============================================
    // PUBLIC API
    // ==============================================

    window.NDSDrawer = {
        init: initAllDrawers,
        reinit: initAllDrawers,
        initDrawer,
        destroy: destroyDrawer,
        toggle: toggleSubmenu,
        checkOverflow
    };

})();
