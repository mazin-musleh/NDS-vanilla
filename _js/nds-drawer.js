/* NDS.Drawer — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Drawer.init() / .reinit()   scan + initialize .nds-drawer
 *   NDS.Drawer.create(drawer)       initialize one drawer
 *   NDS.Drawer.destroy(drawer)      detach its listeners and clear the init stamp
 *   NDS.Drawer.toggle(button)       open or close the submenu that BUTTON owns
 * Events (bubble from the .nds-drawer):
 *   nds:drawer:shown    detail {item, drawer} — after the expand transition
 *   nds:drawer:hidden   detail {item, drawer} — after the collapse transition
 * Hooks:
 *   data-state="always-open"   on the drawer: submenus open and close on their own
 *   data-state="open"          on an <li> and its <ul> (+ aria-expanded="true" on the
 *                              button): the submenu starts open, painted by CSS
 * Gotchas:
 *   - Opening a submenu closes its siblings — one open branch per level — unless always-open.
 *   - toggle() takes the BUTTON, not the <li>.
 *   - An <li> marked data-state="active" opens every ancestor branch at init; moving the
 *     mark later (a client-side route) marks its button and opens its branch too.
 */
/**
 * NDS Drawer Component
 * Handles expand/collapse of nested menus
 * Uses data-state for state management
 */

(function () {
    'use strict';

    const CONFIG = {
        selectors: {
            drawer: '.nds-drawer'
        },
        states: {
            open: 'open',
            opening: 'opening',
            closing: 'closing',
            closed: '',
            active: 'active'
        }
    };


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
            // Empty state = clear transition states only: an <li>'s `active` is the author's current-page mark
            removeState(element, ...TRANSITION_STATES);
        }
    }

    // A closed toggle keeps its highlight while its <li> is the current page.
    function clearButton(listItem, button) {
        if (hasState(listItem, CONFIG.states.active)) setState(button, CONFIG.states.active);
        else NDS.State.clear(button);
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
            if (parentList && !hasState(button.closest(CONFIG.selectors.drawer), 'always-open')) {
                parentList.querySelectorAll(':scope > li').forEach(sibling => {
                    if (sibling === listItem) return;
                    if (!isOpen(sibling)) return;
                    const btn = sibling.querySelector(':scope > .nds-btn');
                    const sub = sibling.querySelector(':scope > ul');
                    if (btn && sub) hideSubmenu(sibling, btn, sub);
                });
            }
            showSubmenu(listItem, button, submenu);
        }
    }

    function showSubmenu(listItem, button, submenu) {
        setState(submenu, CONFIG.states.opening);
        setState(listItem, CONFIG.states.opening);
        NDS.aria.expanded(button, true);
        setState(button, CONFIG.states.active);
        submenu.style.height = submenu.scrollHeight + 'px';

        NDS.onTransitionEnd(submenu, () => {
            setState(submenu, CONFIG.states.open);
            setState(listItem, CONFIG.states.open);
            submenu.style.height = '';
            dispatchDrawerEvent(listItem, 'shown');
        });
    }

    function hideSubmenu(listItem, button, submenu) {
        submenu.style.height = submenu.scrollHeight + 'px';
        submenu.offsetHeight; // Force reflow
        setState(submenu, CONFIG.states.closing);
        submenu.style.height = '0px';
        setState(listItem, CONFIG.states.closed);
        NDS.aria.expanded(button, false);
        clearButton(listItem, button);

        NDS.onTransitionEnd(submenu, () => {
            setState(submenu, CONFIG.states.closed);
            submenu.style.height = '';
            dispatchDrawerEvent(listItem, 'hidden');
        });
    }

    function dispatchDrawerEvent(listItem, eventType, data = {}) {
        const drawer = listItem.closest(CONFIG.selectors.drawer);
        drawer?.dispatchEvent(new CustomEvent(`nds:drawer:${eventType}`, {
            detail: { item: listItem, drawer, ...data },
            bubbles: true
        }));
    }

    // ==============================================
    // INITIAL STATE
    // ==============================================

    function initOpenState(drawer) {
        drawer.querySelectorAll('.nds-drawer-list li').forEach(item => {
            const submenu = item.querySelector(':scope > ul');
            if (!submenu) return;

            const button = item.querySelector(':scope > .nds-btn');
            if (!button) return;

            // Opened in the markup
            if (hasState(item, CONFIG.states.open)) {
                setState(item, CONFIG.states.open);
                setState(submenu, CONFIG.states.open);
                NDS.aria.expanded(button, true);
                setState(button, CONFIG.states.active);
            } else {
                setState(item, CONFIG.states.closed);
                setState(submenu, CONFIG.states.closed);
                NDS.aria.expanded(button, false);
                clearButton(item, button);
            }
        });
    }

    function initToggles(drawer) {
        if (drawer._togglesAC) drawer._togglesAC.abort();
        drawer._togglesAC = new AbortController();
        const { signal } = drawer._togglesAC;

        drawer.querySelectorAll('.nds-drawer-list li').forEach(li => {
            const submenu = li.querySelector(':scope > ul');
            if (!submenu) return;

            const button = li.querySelector(':scope > .nds-btn');
            if (!button) return;

            button.classList.add('nds-menu-btn');

            button.addEventListener('click', (e) => {
                if (button.tagName === 'BUTTON' || button.getAttribute('href') === '#') {
                    e.preventDefault();
                    toggleSubmenu(button);
                }
            }, { signal });
        });
    }

    // ==============================================
    // ACTIVE STATE MANAGEMENT
    // ==============================================

    // Marks the item's button and opens its closed ancestors: painted at once at init,
    // through toggleSubmenu() later, so a moved mark animates and closes sibling branches.
    function activateItem(drawer, activeItem, animate) {
        const activeBtn = activeItem.querySelector(':scope > .nds-btn');
        if (activeBtn) setState(activeBtn, CONFIG.states.active);

        const closed = [];
        let parent = activeItem.closest('ul')?.closest('li');
        while (parent && drawer.contains(parent)) {
            if (!isOpen(parent)) closed.unshift(parent);
            parent = parent.closest('ul')?.closest('li');
        }
        closed.forEach(item => {
            const btn = item.querySelector(':scope > .nds-btn');
            const submenu = item.querySelector(':scope > ul');
            if (animate) { if (btn && submenu) toggleSubmenu(btn); return; }
            setState(item, CONFIG.states.open);
            if (btn) {
                NDS.aria.expanded(btn, true);
                setState(btn, CONFIG.states.active);
            }
            if (submenu) setState(submenu, CONFIG.states.open);
        });
    }

    function initActiveStates(drawer) {
        drawer.querySelectorAll('li[data-state~="active"]').forEach(item => activateItem(drawer, item, false));
    }

    // A page that routes on the client moves the <li>'s active mark after init; the
    // button and the branch follow. Idempotent, so the drawer's own open/close writes pass.
    let watchingActive = false;
    function watchActive() {
        if (watchingActive) return;
        watchingActive = true;
        NDS.onAttrChange('.nds-drawer[data-nds-drawer-initialized] li', ['data-state'], items => items.forEach(item => {
            const btn = item.querySelector(':scope > .nds-btn');
            if (!btn) return;
            if (hasState(item, CONFIG.states.active)) {
                if (!hasState(btn, CONFIG.states.active)) activateItem(item.closest(CONFIG.selectors.drawer), item, true);
            } else if (!isOpen(item) && hasState(btn, CONFIG.states.active)) {
                clearButton(item, btn);
            }
        }));
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================

    function createDrawer(drawer) {
        if (drawer.hasAttribute('data-nds-drawer-initialized')) return;

        initOpenState(drawer);
        initToggles(drawer);
        initActiveStates(drawer);
        watchActive();

        drawer.setAttribute('data-nds-drawer-initialized', 'true');
    }

    function initAllDrawers() {
        document.querySelectorAll(CONFIG.selectors.drawer).forEach(drawer => {
            if (drawer.closest('code')) return;
            createDrawer(drawer);
        });
    }

    function destroyDrawer(drawer) {
        // Abort all submenu-toggle listeners attached in initToggles
        if (drawer._togglesAC) {
            drawer._togglesAC.abort();
            delete drawer._togglesAC;
        }

        drawer.removeAttribute('data-nds-drawer-initialized');
    }

    // ==============================================
    // PUBLIC API
    // ==============================================

    NDS.Drawer = {
        init: initAllDrawers,
        reinit: initAllDrawers,
        create: createDrawer,
        destroy: destroyDrawer,
        toggle: toggleSubmenu
    };

})();
