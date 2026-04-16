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
            list: '.nds-drawer-list'
        },
        states: {
            open: 'open',
            opening: 'opening',
            closing: 'closing',
            closed: '',
            active: 'active'
        },
        breakpoints: NDS.breakpoints,
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

    // State helpers — delegated to NDS.State (nds-core.js)
    const { add: addState, remove: removeState, has: hasState } = NDS.State;

    // Transition states that are mutually exclusive
    const TRANSITION_STATES = ['open', 'opening', 'closing'];

    function setState(element, state) {
        if (state) {
            // Remove sibling transition states before adding new one
            removeState(element, ...TRANSITION_STATES);
            addState(element, state);
        } else {
            // Empty state = clear transition + active states, keep others
            removeState(element, ...TRANSITION_STATES, 'active');
        }
    }

    function isOpen(listItem) {
        return NDS.State.has(listItem, CONFIG.states.open) || NDS.State.has(listItem, CONFIG.states.opening);
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
        setState(button, CONFIG.states.active);
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
            if (NDS.State.has(submenu, CONFIG.states.opening)) cleanup();
        }, CONFIG.transitionDuration + 50);
    }

    function hideSubmenu(listItem, button, submenu) {
        submenu.style.height = submenu.scrollHeight + 'px';
        submenu.offsetHeight; // Force reflow
        setState(submenu, CONFIG.states.closing);
        submenu.style.height = '0px';
        setState(listItem, CONFIG.states.closed);
        button.setAttribute('aria-expanded', 'false');
        NDS.State.clear(button);

        const cleanup = () => {
            submenu.removeEventListener('transitionend', cleanup);
            setState(submenu, CONFIG.states.closed);
            submenu.style.height = '';
            dispatchDrawerEvent(listItem, 'hidden');
        };

        submenu.addEventListener('transitionend', cleanup);
        setTimeout(() => {
            if (NDS.State.has(submenu, CONFIG.states.closing)) cleanup();
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
                setState(button, CONFIG.states.active);
            } else {
                setState(item, CONFIG.states.closed);
                setState(submenu, CONFIG.states.closed);
                button.setAttribute('aria-expanded', 'false');
                NDS.State.clear(button);
            }
        });

        // Set always-open state on drawer for CSS targeting
        if (isAlwaysOpen) {
            addState(drawer, 'always-open');
        } else {
            removeState(drawer, 'always-open');
        }
    }

    function initToggles(drawer) {
        drawer.querySelectorAll('.nds-drawer-list > li').forEach(li => {
            const submenu = li.querySelector(':scope > ul');
            if (!submenu) return;

            const button = li.querySelector(':scope > .nds-btn');
            if (!button) return;

            if (!button.classList.contains('nds-menu-btn')) {
                button.classList.add('nds-menu-btn');
            }

            button.addEventListener('click', (e) => {
                // Don't toggle if drawer is in always-open mode
                if (hasState(drawer, 'always-open')) {
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
    // ACTIVE STATE MANAGEMENT
    // ==============================================

    function initActiveStates(drawer) {
        drawer.querySelectorAll('li[data-state~="active"]').forEach(activeItem => {
            // Set active state on the item's own button for visual indicator
            const activeBtn = activeItem.querySelector(':scope > .nds-btn');
            if (activeBtn) setState(activeBtn, CONFIG.states.active);

            let parent = activeItem.closest('ul')?.closest('li');

            while (parent && drawer.contains(parent)) {
                if (!isOpen(parent)) {
                    const btn = parent.querySelector(':scope > .nds-btn');
                    const submenu = parent.querySelector(':scope > ul');

                    setState(parent, CONFIG.states.open);
                    if (btn) {
                        btn.setAttribute('aria-expanded', 'true');
                        setState(btn, CONFIG.states.active);
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

        // Store initial window width to detect width-only changes
        drawer._previousWidth = window.innerWidth;

        // Add resize listener for responsive state updates
        if (drawer.hasAttribute('data-open-on') || drawer.hasAttribute('data-always-open-on') || drawer.querySelector('[data-open-on]')) {
            drawer._offResize = NDS.onResize(() => handleResize(drawer));
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

    NDS.Drawer = {
        init: initAllDrawers,
        reinit: initAllDrawers,
        initDrawer,
        destroy: destroyDrawer,
        toggle: toggleSubmenu
    };

})();
