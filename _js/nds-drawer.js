/**
 * NDS Drawer Component
 * Handles expand/collapse of nested menus with responsive state control
 * Uses data-state for state management and data-open-on for breakpoint control
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
        states: {
            open: 'open',
            opening: 'opening',
            closing: 'closing',
            closed: ''
        },
        classes: {
            active: 'active',
            hasMore: 'hasMore',
            atEnd: 'atEnd'
        },
        breakpoints: {
            mobile: '(max-width: 599px)',
            tablet: '(min-width: 600px)',
            desktop: '(min-width: 960px)',
            'large-desktop': '(min-width: 1280px)'
        },
        scrollThreshold: 20,
        scrollAmount: 0.8,
        transitionDuration: 250
    };


    // ==============================================
    // RESPONSIVE STATE HELPERS
    // ==============================================

    function checkBreakpoint(breakpoint) {
        if (breakpoint === 'always') return true;
        if (breakpoint === 'never') return false;

        const mediaQuery = CONFIG.breakpoints[breakpoint];
        return mediaQuery ? window.matchMedia(mediaQuery).matches : false;
    }

    function getOpenOnValue(item, drawer) {
        // Item-level override takes priority
        if (item.hasAttribute('data-open-on')) {
            return item.getAttribute('data-open-on');
        }

        // Drawer-level default
        if (drawer.hasAttribute('data-open-on')) {
            return drawer.getAttribute('data-open-on');
        }

        // Fallback: check if item has 'open' class (backward compatibility)
        if (item.classList.contains('open')) {
            return 'always';
        }

        return 'never';
    }

    function shouldItemBeOpen(item, drawer) {
        const openOn = getOpenOnValue(item, drawer);
        return checkBreakpoint(openOn);
    }

    function getAlwaysOpenOnValue(drawer) {
        return drawer.getAttribute('data-always-open-on') || null;
    }

    function shouldBeAlwaysOpen(drawer) {
        const alwaysOpenOn = getAlwaysOpenOnValue(drawer);
        if (!alwaysOpenOn) return false;
        return checkBreakpoint(alwaysOpenOn);
    }

    // ==============================================
    // STATE MANAGEMENT
    // ==============================================

    function setState(element, state) {
        if (state) {
            element.setAttribute('data-state', state);
        } else {
            element.removeAttribute('data-state');
        }
    }

    function getState(element) {
        return element.getAttribute('data-state') || '';
    }

    function isOpen(listItem) {
        const state = getState(listItem);
        return state === CONFIG.states.open || state === CONFIG.states.opening;
    }

    // ==============================================
    // EXPAND/COLLAPSE FUNCTIONALITY
    // ==============================================

    function toggleSubmenu(button) {
        const listItem = button.closest('li');
        if (!listItem) return;

        const submenu = listItem.querySelector(':scope > ul');
        if (!submenu) return;

        if (isOpen(listItem)) {
            hideSubmenu(listItem, button, submenu);
        } else {
            // Accordion: close siblings
            const parentList = listItem.parentElement;
            if (parentList) {
                parentList.querySelectorAll(':scope > li[data-state="open"], :scope > li[data-state="opening"]').forEach(sibling => {
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
        setState(submenu, CONFIG.states.opening);
        setState(listItem, CONFIG.states.opening);
        button.setAttribute('aria-expanded', 'true');
        setState(button, CONFIG.states.open);
        submenu.style.height = submenu.scrollHeight + 'px';

        const cleanup = () => {
            submenu.removeEventListener('transitionend', cleanup);
            setState(submenu, CONFIG.states.open);
            setState(listItem, CONFIG.states.open);
            submenu.style.height = '';
            dispatchDrawerEvent(listItem, 'shown');
        };

        submenu.addEventListener('transitionend', cleanup);
        setTimeout(() => {
            if (getState(submenu) === CONFIG.states.opening) cleanup();
        }, CONFIG.transitionDuration + 50);
    }

    function hideSubmenu(listItem, button, submenu) {
        submenu.style.height = submenu.scrollHeight + 'px';
        submenu.offsetHeight; // Force reflow
        setState(submenu, CONFIG.states.closing);
        submenu.style.height = '0px';
        setState(listItem, CONFIG.states.closed);
        button.setAttribute('aria-expanded', 'false');
        button.removeAttribute('data-state');

        const cleanup = () => {
            submenu.removeEventListener('transitionend', cleanup);
            setState(submenu, CONFIG.states.closed);
            submenu.style.height = '';
            dispatchDrawerEvent(listItem, 'hidden');
        };

        submenu.addEventListener('transitionend', cleanup);
        setTimeout(() => {
            if (getState(submenu) === CONFIG.states.closing) cleanup();
        }, CONFIG.transitionDuration + 50);
    }

    function dispatchDrawerEvent(listItem, eventType, data = {}) {
        const drawer = listItem.closest(CONFIG.selectors.drawer);
        drawer?.dispatchEvent(new CustomEvent(`nds:drawer:${eventType}`, {
            detail: { item: listItem, drawer, ...data },
            bubbles: true
        }));
    }

    // ==============================================
    // RESPONSIVE STATE INITIALIZATION
    // ==============================================

    function initResponsiveState(drawer) {
        const isAlwaysOpen = shouldBeAlwaysOpen(drawer);

        drawer.querySelectorAll('.nds-drawer-list > li').forEach(item => {
            const submenu = item.querySelector(':scope > ul');
            if (!submenu) return;

            const button = item.querySelector(':scope > .nds-btn');
            if (!button) return;

            // Check if should be open (either always-open or conditional)
            const shouldBeOpen = isAlwaysOpen || shouldItemBeOpen(item, drawer);

            if (shouldBeOpen) {
                setState(item, CONFIG.states.open);
                setState(submenu, CONFIG.states.open);
                button.setAttribute('aria-expanded', 'true');
                setState(button, CONFIG.states.open);
            } else {
                setState(item, CONFIG.states.closed);
                setState(submenu, CONFIG.states.closed);
                button.setAttribute('aria-expanded', 'false');
                button.removeAttribute('data-state');
            }
        });

        // Set always-open state on drawer for CSS targeting
        if (isAlwaysOpen) {
            drawer.setAttribute('data-state', 'always-open');
        } else {
            drawer.removeAttribute('data-state');
        }
    }

    function initToggles(drawer) {
        drawer.querySelectorAll('.nds-drawer-list > li').forEach(li => {
            const submenu = li.querySelector(':scope > ul');
            if (!submenu) return;

            const button = li.querySelector(':scope > .nds-btn');
            if (!button) return;

            button.addEventListener('click', (e) => {
                // Don't toggle if drawer is in always-open mode
                if (drawer.getAttribute('data-state') === 'always-open') {
                    return;
                }

                if (button.tagName === 'BUTTON' || button.getAttribute('href') === '#') {
                    e.preventDefault();
                    toggleSubmenu(button);
                }
            });
        });
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
                if (!isOpen(parent)) {
                    const btn = parent.querySelector(':scope > .nds-btn');
                    const submenu = parent.querySelector(':scope > ul');

                    setState(parent, CONFIG.states.open);
                    if (btn) {
                        btn.setAttribute('aria-expanded', 'true');
                        setState(btn, CONFIG.states.open);
                    }
                    if (submenu) setState(submenu, CONFIG.states.open);
                }
                parent = parent.closest('ul')?.closest('li');
            }
        });
    }

    // ==============================================
    // RESIZE HANDLER FOR RESPONSIVE STATE
    // ==============================================

    function handleResize(drawer) {
        const currentWidth = window.innerWidth;
        const previousWidth = drawer._previousWidth || currentWidth;

        // Ignore height-only changes (mobile address bar show/hide)
        if (currentWidth === previousWidth) {
            return;
        }

        drawer._previousWidth = currentWidth;
        initResponsiveState(drawer);
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================

    function initDrawer(drawer) {
        if (drawer._ndsDrawerInitialized) return;

        initResponsiveState(drawer);
        initToggles(drawer);
        initActiveStates(drawer);
        initHasMore(drawer);

        // Store initial window width to detect width-only changes
        drawer._previousWidth = window.innerWidth;

        // Add resize listener for responsive state updates
        if (drawer.hasAttribute('data-open-on') || drawer.hasAttribute('data-always-open-on') || drawer.querySelector('[data-open-on]')) {
            const resizeHandler = () => handleResize(drawer);
            window.addEventListener('resize', resizeHandler);
            drawer._resizeHandler = resizeHandler;
        }

        drawer._ndsDrawerInitialized = true;
    }

    function initAllDrawers() {
        document.querySelectorAll(CONFIG.selectors.drawer).forEach(drawer => {
            if (drawer.closest('code, .code-example')) return;
            initDrawer(drawer);
        });
    }

    function destroyDrawer(drawer) {
        // Clean up overflow ResizeObserver
        if (drawer._resizeObserver) {
            drawer._resizeObserver.disconnect();
            delete drawer._resizeObserver;
        }

        // Clean up resize handler
        if (drawer._resizeHandler) {
            window.removeEventListener('resize', drawer._resizeHandler);
            delete drawer._resizeHandler;
        }

        // Clean up stored width
        delete drawer._previousWidth;
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
