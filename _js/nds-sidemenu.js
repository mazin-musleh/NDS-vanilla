/* NDS.Sidemenu — public surface
 * Rides: nds-drawer (the menu tree inside it — expand/collapse and the responsive
 *        open rules) · nds-backdrop (dims the page while it is open, and closes it on
 *        Escape or a click outside)
 * Requires:
 *   .nds-sidemenu needs .nds-sidemenu-toggle — the menu is inert
 *   .nds-sidemenu needs .nds-drawer — the first open throws
 * Methods:
 *   NDS.Sidemenu.init()      wire the one sidemenu on the page (destroys the previous
 *                            instance first, so calling it again re-wires)
 *   NDS.Sidemenu.destroy()   close it and release every listener
 * Events (bubble from the .nds-sidemenu; rail only):
 *   nds:sidemenu:expanded    after the menu has opened wide (or over the page below 960px)
 *   nds:sidemenu:collapsed   after it has folded to its icons
 * Hooks:
 *   (none — class-driven markup: .nds-sidemenu holding a .nds-sidemenu-toggle button and
 *    a .nds-drawer. Add .nds-top for the top-sheet mode, and .nds-peek on the toggle to
 *    let it retract until the pointer comes near)
 *   .nds-rail on the .nds-content-layout   the toggle folds the menu to its icons; below
 *                              960px it is always folded and the toggle opens it over the page
 *   data-sidemenu-collapsed    on a rail layout: start folded (the user's last choice wins)
 * Gotchas:
 *   - Rail: the fold is kept in localStorage `nds-sidemenu-collapsed`; .nds-peek and .nds-top do nothing.
 *   - Rail: a press during a slide runs after it. A fold closes an open group first, and its
 *     button keeps data-state="active"; the menu reopens it after it opens again.
 *   - One sidemenu per page: init() takes the FIRST .nds-sidemenu it finds.
 *   - init() does not start the drawer: new markup needs NDS.init.refresh().
 *   - .nds-top scrolls its bar to the top and locks the page before it opens.
 *   - A width change closes it.
 *   - The top bar label is the active <li>'s label, and follows the mark when it moves.
 */
// Side Menu Navigation
(() => {
    'use strict';

    const { add: addState, remove: removeState, has: hasState, clear: clearState } = NDS.state;

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
        // A close and re-open before this settles runs its own lock: two locks, one unlock.
        const epoch = menuEpoch;
        let done = false;
        const lock = () => {
            if (done || epoch !== menuEpoch || !hasState(menuState.animTarget, 'open')) return;
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

        // Kept for destroy(): a second reset() pops another owner's backdrop and scroll lock.
        menuState.cancelClose?.();
        menuState.cancelClose = NDS.onTransitionEnd(animationTarget, () => {
            menuState.cancelClose = null;
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

    // The top bar scrolls away under the sticky main nav. While part of it shows, it pushes the
    // sticky list down that far, so the list's height leaves it out.
    function setupTopOffset(sidemenu, signal) {
        const topbar = document.querySelector('.nds-topbar');
        const mainNav = document.querySelector('.nds-main-nav');
        if (!topbar || !mainNav) return;
        let offset = -1;
        const syncOffset = () => {
            if (offset === 0 && window.scrollY >= topbar.offsetHeight) return;
            const next = Math.max(0, Math.round(NDS.getStickyHeaderBottom() - mainNav.offsetHeight));
            if (next === offset) return;
            offset = next;
            sidemenu.style.setProperty('--_sidemenu-top-offset', offset + 'px');
        };
        requestAnimationFrame(syncOffset);
        window.addEventListener('scroll', NDS.throttleToFrame(syncOffset), { passive: true, signal });
        signal.addEventListener('abort', () => sidemenu.style.removeProperty('--_sidemenu-top-offset'));
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

    const RAIL_KEY = 'nds-sidemenu-collapsed';

    // Rail: the toggle folds the menu to its icons, kept per browser. Below 960px the
    // menu is always folded, and the toggle opens it over the page.
    // data-state on the aside: open opening → open → open opened; open closing → none.
    function setupRail(menuState) {
        const { accMenu: sidemenu, layout, toggleBtn, drawer, abortController: { signal } } = menuState;
        const smallQuery = window.matchMedia(NDS.breakpoints['tablet-max']);
        const ownTooltips = new Set();
        const releaseTooltip = (btn) => {
            if (!ownTooltips.delete(btn)) return;
            NDS.Tooltip.destroy(btn);
            btn.classList.remove('nds-tooltip');
            delete btn.dataset.tooltipMessage;
            delete btn.dataset.tooltipHover;
            delete btn.dataset.position;
        };
        const releaseTooltips = () => ownTooltips.forEach(releaseTooltip);
        // True when it made a new one.
        const syncTooltip = (btn) => {
            const label = btn.querySelector(':scope > .nds-label');
            if (!label) return false;
            const text = label.textContent.trim();
            const isNeeded = isFolded() || label.scrollWidth > label.clientWidth;
            if (btn.dataset.tooltipMessage === (isNeeded ? text : undefined)) return false;
            releaseTooltip(btn);
            if (!isNeeded || btn.classList.contains('nds-tooltip')) return false;
            ownTooltips.add(btn);
            btn.classList.add('nds-tooltip');
            btn.dataset.tooltipMessage = text;
            btn.dataset.tooltipHover = '500';
            btn.dataset.position = 'end';
            NDS.Tooltip.create(btn);
            // The label already names the button: a description would read it twice.
            const balloonId = btn.ndsTooltip?.balloon?.id;
            if (balloonId) {
                const rest = (btn.getAttribute('aria-describedby') || '').split(/\s+/).filter((id) => id && id !== balloonId);
                rest.length ? btn.setAttribute('aria-describedby', rest.join(' ')) : btn.removeAttribute('aria-describedby');
            }
            return true;
        };
        const isFolded = () => smallQuery.matches
            ? !layout.hasAttribute('data-sidemenu-open')
            : layout.hasAttribute('data-sidemenu-collapsed');
        let isBusy = false;
        let pending = null;
        let epoch = 0;
        let timer = 0;
        let backdropShown = false;
        // The group a fold closed: its button keeps the active mark, and it reopens with the menu.
        let foldedItem = null;

        const dispatchRailEvent = (name) => sidemenu.dispatchEvent(new CustomEvent(`nds:sidemenu:${name}`, { bubbles: true }));
        // The settled state with no slide: at start, and on a width change across 960px.
        const syncRail = () => {
            const folded = isFolded();
            clearState(sidemenu);
            if (!folded) addState(sidemenu, 'open', 'opened');
            NDS.aria.expanded(toggleBtn, !folded);
        };
        const hideBackdrop = () => {
            if (!backdropShown) return;
            backdropShown = false;
            NDS.Backdrop.hide();
        };
        // Drops a slide in flight and anything queued behind it.
        const cancelSlide = () => {
            epoch++;
            clearTimeout(timer);
            isBusy = false;
            pending = null;
            layout.removeAttribute('data-sidemenu-open');
            sidemenu.style.removeProperty('z-index');
            hideBackdrop();
        };
        // A press during a slide waits for its end; the last one wins.
        const request = (action) => { if (isBusy) pending = action; else action(); };
        const finish = (callback) => {
            isBusy = false;
            callback?.();
            // The callback started a group slide: the queue waits for that too.
            if (isBusy) return;
            const next = pending;
            pending = null;
            next?.();
        };

        const slide = (expand, onDone) => {
            isBusy = true;
            releaseTooltips();
            const slideEpoch = epoch;
            const duration = NDS.prefersReducedMotion ? 0 : NDS.transitionSpeed();
            const runLater = (fn) => { if (duration === 0) fn(); else timer = setTimeout(fn, duration); };
            NDS.aria.expanded(toggleBtn, expand);
            if (expand) {
                if (smallQuery.matches) {
                    layout.setAttribute('data-sidemenu-open', '');
                    sidemenu.style.zIndex = 999;
                    backdropShown = true;
                    // Escape and a click outside reach onClick.
                    NDS.Backdrop.show({ zIndex: 998, preventScroll: true, onClick: () => request(fold) });
                } else {
                    layout.removeAttribute('data-sidemenu-collapsed');
                    try { localStorage.setItem(RAIL_KEY, '0'); } catch {}
                }
                const end = () => {
                    addState(sidemenu, 'opened');
                    dispatchRailEvent('expanded');
                    finish(onDone);
                };
                if (duration === 0) { addState(sidemenu, 'open'); return end(); }
                addState(sidemenu, 'open', 'opening');
                // Timed from the paint that starts the slide, as Main Navigation's.
                NDS.onNextPaint(() => {
                    if (slideEpoch !== epoch) return;
                    removeState(sidemenu, 'opening');
                    runLater(end);
                });
            } else {
                removeState(sidemenu, 'opened');
                addState(sidemenu, 'closing');
                if (smallQuery.matches) {
                    layout.removeAttribute('data-sidemenu-open');
                    hideBackdrop();
                } else {
                    layout.setAttribute('data-sidemenu-collapsed', '');
                    try { localStorage.setItem(RAIL_KEY, '1'); } catch {}
                }
                runLater(() => {
                    removeState(sidemenu, 'open', 'closing');
                    // Kept above the backdrop until it has faded.
                    sidemenu.style.removeProperty('z-index');
                    dispatchRailEvent('collapsed');
                    finish();
                });
            }
        };

        // An open group closes first, then the menu folds.
        function fold() {
            if (isFolded()) return;
            const openItem = sidemenu.querySelector('.nds-drawer-list > li:is([data-state~="open"], [data-state~="opening"])');
            const groupBtn = openItem?.querySelector(':scope > .nds-btn');
            if (!groupBtn) return slide(false);
            isBusy = true;
            const foldEpoch = epoch;
            const handleHidden = (e) => {
                if (e.detail.item !== openItem) return;
                drawer.removeEventListener('nds:drawer:hidden', handleHidden);
                if (foldEpoch === epoch) slide(false);
            };
            drawer.addEventListener('nds:drawer:hidden', handleHidden, { signal });
            NDS.Drawer.toggle(groupBtn);
            // The folded icon keeps the mark. The drawer's watcher clears it in a microtask
            // queued during toggle(); this one runs after it, before the paint.
            queueMicrotask(() => { if (foldedItem === openItem) addState(groupBtn, 'active'); });
            foldedItem = openItem;
        }
        // Drops the kept mark, unless the drawer would keep it (an active <li>) or KEEP is that button.
        const releaseFoldedItem = (keep) => {
            const btn = foldedItem?.querySelector(':scope > .nds-btn');
            if (btn && btn !== keep && !hasState(foldedItem, 'active')) removeState(btn, 'active');
            foldedItem = null;
        };
        // After the menu opens: the pressed group, or the one the fold closed.
        const reopenGroup = (groupBtn) => {
            const target = groupBtn || foldedItem?.querySelector(':scope > .nds-btn');
            releaseFoldedItem(target);
            if (!target || target.getAttribute('aria-expanded') === 'true') return;
            const item = target.closest('li');
            const reopenEpoch = epoch;
            isBusy = true;
            const handleShown = (e) => {
                if (e.detail.item !== item) return;
                drawer.removeEventListener('nds:drawer:shown', handleShown);
                if (reopenEpoch === epoch) finish();
            };
            drawer.addEventListener('nds:drawer:shown', handleShown, { signal });
            NDS.Drawer.toggle(target);
        };
        const expand = (groupBtn) => slide(true, () => reopenGroup(groupBtn));

        // The author's start state, then the user's last choice.
        menuState.wasCollapsed = layout.hasAttribute('data-sidemenu-collapsed');
        try {
            const stored = localStorage.getItem(RAIL_KEY);
            if (stored !== null && (stored === '1') !== menuState.wasCollapsed) {
                // A stored fold lands at once: the slide is for a press.
                const sliding = [layout, sidemenu];
                sliding.forEach(el => { el.style.transition = 'none'; });
                layout.toggleAttribute('data-sidemenu-collapsed', stored === '1');
                requestAnimationFrame(() => requestAnimationFrame(() => sliding.forEach(el => el.style.removeProperty('transition'))));
            }
        } catch {}

        toggleBtn.addEventListener('click', () => request(() => (isFolded() ? expand() : fold())), { signal });
        // A group pressed while folded, or during a slide, waits for the menu; the drawer never sees it.
        drawer?.addEventListener('click', (e) => {
            const btn = e.target.closest('.nds-drawer-list > li > button.nds-btn');
            if (!btn || (!isBusy && !isFolded())) return;
            e.stopPropagation();
            request(() => (isFolded() ? expand(btn) : NDS.Drawer.toggle(btn)));
        }, { capture: true, signal });
        // A folded or cut-off name shows in a Tooltip. Checked at hover and focus, so a
        // language or width change needs nothing.
        drawer?.addEventListener('pointerover', (e) => {
            const btn = e.target.closest('.nds-drawer-list > li > .nds-btn');
            if (btn) syncTooltip(btn);
        }, { signal });
        drawer?.addEventListener('focusin', (e) => {
            const btn = e.target.closest('.nds-drawer-list > li > .nds-btn');
            // A new tooltip missed this focus: open it as its own focus listener would.
            if (btn && syncTooltip(btn) && btn.matches(':focus-visible')) btn.ndsTooltip?.open();
        }, { signal });
        smallQuery.addEventListener('change', () => {
            cancelSlide();
            syncRail();
            if (!isFolded()) reopenGroup();
        }, { signal });
        signal.addEventListener('abort', () => {
            cancelSlide();
            releaseFoldedItem(null);
            clearState(sidemenu);
            layout.toggleAttribute('data-sidemenu-collapsed', menuState.wasCollapsed);
            releaseTooltips();
        });
        syncRail();
    }

    function destroy() {
        if (currentInstance) {
            const { abortController, accMenu: sidemenu, animTarget: animationTarget, toggleBtn } = currentInstance;

            currentInstance.cancelClose?.();
            // A rail undoes its own state on abort.
            if (!currentInstance.layout && hasState(animationTarget, 'open')) {
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
        setupTopOffset(sidemenu, abortController.signal);
        const layout = sidemenu.closest('.nds-content-layout');
        if (layout?.classList.contains('nds-rail')) {
            menuState.layout = layout;
            menuState.wasHidden = toggleBtn.hidden;
            toggleBtn.removeAttribute('hidden');
            syncToggleLabel(sidemenu, toggleBtn, false);
            setupRail(menuState);
            return;
        }
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
