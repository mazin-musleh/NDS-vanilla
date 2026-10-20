/* NDS.Drawer — public surface
 * Rides: (none — base component)
 * Requires:
 *   .nds-drawer-list li:has(> ul) needs :scope > .nds-btn — the item never opens
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
 *   data-search                on the drawer: a search box above the list, as Dropmenu's;
 *                              data-search="20" adds it only at 20 items or more
 *   data-search-empty="…"      on the drawer: the no-match text (default "No results")
 *   data-search-style="…"      on the drawer: the box's field style, outline · lighter ·
 *                              darker (default), as the Forms classes
 *   data-search-value="…"      on an <li>: more words the item is found by
 * Gotchas:
 *   - A search opens every branch with a match; clearing it restores the branches open
 *     before it, so a branch the user toggled mid-search goes back too.
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

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.strings('drawer', {
        search: 'Search the menu',
        search_placeholder: 'Search…',
        clear_search: 'Clear search',
        no_results: 'No results',
    });

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

    // The end-of-animation step a submenu is waiting on. A reversal cancels it: two queued
    // ends would both run, and the open one would leave the <li> marked open.
    const pendingEnd = new WeakMap();
    function cancelPending(submenu) {
        pendingEnd.get(submenu)?.();
        pendingEnd.delete(submenu);
    }

    function showSubmenu(listItem, button, submenu) {
        cancelPending(submenu);
        setState(submenu, CONFIG.states.opening);
        setState(listItem, CONFIG.states.opening);
        NDS.aria.expanded(button, true);
        setState(button, CONFIG.states.active);
        submenu.style.height = submenu.scrollHeight + 'px';

        pendingEnd.set(submenu, NDS.onTransitionEnd(submenu, () => {
            pendingEnd.delete(submenu);
            setState(submenu, CONFIG.states.open);
            setState(listItem, CONFIG.states.open);
            submenu.style.height = '';
            dispatchDrawerEvent(listItem, 'shown');
        }));
    }

    function hideSubmenu(listItem, button, submenu) {
        cancelPending(submenu);
        submenu.style.height = submenu.scrollHeight + 'px';
        submenu.offsetHeight; // Force reflow
        setState(submenu, CONFIG.states.closing);
        submenu.style.height = '0px';
        setState(listItem, CONFIG.states.closed);
        NDS.aria.expanded(button, false);
        clearButton(listItem, button);

        pendingEnd.set(submenu, NDS.onTransitionEnd(submenu, () => {
            pendingEnd.delete(submenu);
            setState(submenu, CONFIG.states.closed);
            submenu.style.height = '';
            dispatchDrawerEvent(listItem, 'hidden');
        }));
    }

    // Opens or closes a branch at once, with no animation; drops one in flight, or its end would undo this.
    function paintBranch(listItem, open) {
        const button = listItem.querySelector(':scope > .nds-btn');
        const submenu = listItem.querySelector(':scope > ul');
        setState(listItem, open ? CONFIG.states.open : CONFIG.states.closed);
        if (submenu) {
            cancelPending(submenu);
            submenu.style.height = '';
            setState(submenu, open ? CONFIG.states.open : CONFIG.states.closed);
        }
        if (button) {
            NDS.aria.expanded(button, open);
            if (open) setState(button, CONFIG.states.active); else clearButton(listItem, button);
        }
    }

    function dispatchDrawerEvent(listItem, eventType) {
        const drawer = listItem.closest(CONFIG.selectors.drawer);
        drawer?.dispatchEvent(new CustomEvent(`nds:drawer:${eventType}`, {
            detail: { item: listItem, drawer },
            bubbles: true
        }));
    }

    // ==============================================
    // INITIAL STATE
    // ==============================================

    function initOpenState(drawer) {
        drawer.querySelectorAll('.nds-drawer-list li').forEach(item => {
            if (!item.querySelector(':scope > ul') || !item.querySelector(':scope > .nds-btn')) return;
            // Open where the markup says so
            paintBranch(item, hasState(item, CONFIG.states.open));
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
            if (!animate) return paintBranch(item, true);
            if (btn && item.querySelector(':scope > ul')) toggleSubmenu(btn);
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
    // SEARCH (opt-in: data-search, same API as Dropmenu's)
    // ==============================================

    // Case and accents ignored, as Dropmenu's search: "مطار" finds "المَطار".
    const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

    function setupSearch(drawer) {
        const attr = drawer.getAttribute('data-search');
        const list = drawer.querySelector('.nds-drawer-list');
        if (attr === null || !list) return;
        const leaves = () => [...list.querySelectorAll('li')].filter(li => !li.querySelector(':scope > ul'));
        const threshold = parseInt(attr, 10) || 0;
        if (threshold && leaves().length < threshold) return;

        // The field styles Forms names: outline (none), lighter, darker (the default).
        const style = { outline: '', lighter: ' nds-lighter' }[drawer.getAttribute('data-search-style')] ?? ' nds-darker';
        drawer.insertAdjacentHTML('afterbegin', `<div class="nds-form-container${style} nds-drawer-search">
                <div class="nds-form-control">
                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                    <input type="text" class="nds-search-input">
                    <div class="nds-form-action">
                        <button type="button" class="nds-btn nds-subtle nds-clear nds-icon-only" hidden>
                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="nds-empty-placeholder" data-nds-empty-placeholder hidden aria-live="polite">
                <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                <span class="nds-empty-message"></span>
            </div>`);
        const box = drawer.firstElementChild;
        const empty = box.nextElementSibling;
        const input = box.querySelector('.nds-search-input');
        strings.set(input, 'aria-label', 'search');
        strings.set(input, 'placeholder', 'search_placeholder');
        strings.set(box.querySelector('.nds-clear'), 'aria-label', 'clear_search');
        const msg = empty.querySelector('.nds-empty-message');
        const customEmpty = drawer.getAttribute('data-search-empty');
        if (customEmpty) msg.textContent = customEmpty; else strings.set(msg, 'text', 'no_results');
        // Forms init ran before this injection: wire its clear button. A plain input without NDS.Form.
        NDS.Form?.create(box);

        const setOpen = (li, open) => {
            if (!li.querySelector(':scope > .nds-btn') || !li.querySelector(':scope > ul') || isOpen(li) === open) return;
            paintBranch(li, open);
        };
        // A label match shows the item and everything under it; a group stays, and opens, while anything inside matches.
        const visit = (li, q, shown) => {
            const sub = li.querySelector(':scope > ul');
            const own = li.querySelector(':scope > :is(.nds-btn, a)');
            // The label only: a group button's count tag must not match a digit.
            const text = own ? (own.querySelector('.nds-label') || own).textContent : sub ? '' : li.textContent;
            const match = shown || norm(text + ' ' + (li.getAttribute('data-search-value') || '')).includes(q);
            let found = sub ? 0 : +match;
            if (sub) for (const child of sub.children) found += visit(child, q, match);
            li.hidden = !match && !found;
            if (sub && q && found) setOpen(li, true);
            return found;
        };
        // The branches open before the first query, so clearing the box puts the menu back as it was.
        let before = null;
        const filter = () => {
            if (!drawer._searchTeardown) return; // a debounced call after destroy()
            const q = norm(input.value.trim());
            const groups = () => [...list.querySelectorAll('li')].filter(li => li.querySelector(':scope > ul'));
            if (q && !before) before = groups().filter(isOpen);
            let found = 0;
            for (const li of list.children) found += visit(li, q, !q);
            if (!q && before) {
                groups().forEach(li => setOpen(li, before.includes(li)));
                before = null;
            }
            empty.hidden = !q || found > 0;
        };

        const ac = new AbortController();
        input.addEventListener('input', NDS.debounce(filter, 120), { signal: ac.signal });
        input.addEventListener('keydown', (e) => {
            // First Escape clears the query; the next one goes to the page.
            if (e.key !== 'Escape' || !input.value) return;
            e.stopPropagation();
            input.value = '';
            input.dispatchEvent(new Event('input', { bubbles: true }));
            filter();
        }, { signal: ac.signal });

        drawer._searchTeardown = () => {
            ac.abort();
            input.value = '';
            filter();
            box.remove();
            empty.remove();
            drawer._searchTeardown = null;
        };
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================

    function createDrawer(drawer) {
        if (drawer.hasAttribute('data-nds-drawer-initialized')) return;

        initOpenState(drawer);
        initToggles(drawer);
        initActiveStates(drawer);
        setupSearch(drawer);
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
        drawer._searchTeardown?.();

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
