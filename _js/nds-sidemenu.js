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
 * Events (bubble from the .nds-sidemenu; rail from 960px only):
 *   nds:sidemenu:expanded    after the menu has opened wide
 *   nds:sidemenu:collapsed   after it has folded to its icons
 * Hooks:
 *   (none — class-driven markup: .nds-sidemenu holding a .nds-sidemenu-toggle button and
 *    a .nds-drawer. Add .nds-top for the top-sheet mode, and .nds-peek on the toggle to
 *    let it retract until the pointer comes near)
 *   .nds-rail on the .nds-content-layout   from 960px the toggle folds the menu to its icons;
 *                              below, it is the slide-in menu
 *   data-sidemenu-collapsed    on a rail layout: start folded (the user's last choice wins)
 * Gotchas:
 *   - Rail: the fold is kept in localStorage `nds-sidemenu-collapsed`; .nds-top does nothing.
 *   - Rail: a press during a slide runs after it. A fold closes an open group first; its button
 *     keeps data-state="active" when the current page is in it, and it reopens with the menu.
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

    // Rail: a folded or cut-off top-level name shows in a Tooltip the menu makes and drops.
    function railTooltips(isFolded) {
        const owned = new Set();
        const release = (btn) => {
            if (!owned.delete(btn)) return;
            NDS.Tooltip.destroy(btn);
            btn.classList.remove('nds-tooltip');
            delete btn.dataset.tooltipMessage;
            delete btn.dataset.tooltipHover;
            delete btn.dataset.position;
        };
        // True when it made a new one.
        const sync = (btn) => {
            const label = btn.querySelector(':scope > .nds-label');
            if (!label) return false;
            const text = label.textContent.trim();
            const isNeeded = isFolded() || label.scrollWidth > label.clientWidth;
            if (btn.dataset.tooltipMessage === (isNeeded ? text : undefined)) return false;
            release(btn);
            if (!isNeeded || btn.classList.contains('nds-tooltip')) return false;
            owned.add(btn);
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
        return { sync, releaseAll: () => owned.forEach(release) };
    }

    // Rail: from 960px the toggle folds the menu to its icons, kept per browser. Below,
    // it is the slide-in menu (openMenu/closeMenu).
    // data-state on the aside from 960px: open opening → open → open opened; open closing → none.
    function setupRail(menuState) {
        const { accMenu: sidemenu, layout, toggleBtn, drawer, abortController: { signal } } = menuState;
        const smallQuery = window.matchMedia(NDS.breakpoints['tablet-max']);
        const isFolded = () => !smallQuery.matches && layout.hasAttribute('data-sidemenu-collapsed');
        const tooltips = railTooltips(isFolded);

        // ── Slide queue ──
        let isBusy = false;
        let pending = null;
        let epoch = 0;
        let timer = 0;
        // The group a fold closed: its button keeps the active mark, and it reopens with the menu.
        let foldedItem = null;

        const dispatchRailEvent = (name) => sidemenu.dispatchEvent(new CustomEvent(`nds:sidemenu:${name}`, { bubbles: true }));
        // The settled state with no slide: at start, and on a width change across 960px.
        // Below 960px the slide-in owns the aside's state, and starts closed.
        const closeSlideIn = () => {
            menuState.cancelClose?.();
            menuState.cancelClose = null;
            if (!hasState(sidemenu, 'open')) return;
            reset(menuState);
            sidemenu.style.removeProperty('z-index');
        };
        const syncRail = () => {
            const folded = isFolded();
            clearState(sidemenu);
            const isOpen = !smallQuery.matches && !folded;
            if (isOpen) addState(sidemenu, 'open', 'opened');
            NDS.aria.expanded(toggleBtn, isOpen);
        };
        // Drops a slide in flight and anything queued behind it.
        const cancelSlide = () => {
            epoch++;
            clearTimeout(timer);
            isBusy = false;
            pending = null;
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
        // Runs THEN after the group's slide. A search, a route or a re-init can drop that
        // slide with no event, so a timer past its length ends the wait too.
        const afterGroupSlide = (type, item, then) => {
            const waitEpoch = epoch;
            const submenu = item.querySelector(':scope > ul');
            let isDone = false;
            const end = () => {
                if (isDone) return;
                isDone = true;
                clearTimeout(fallback);
                drawer.removeEventListener(`nds:drawer:${type}`, handleEnd);
                if (waitEpoch === epoch) then();
            };
            const handleEnd = (e) => { if (e.detail.item === item) end(); };
            drawer.addEventListener(`nds:drawer:${type}`, handleEnd, { signal });
            const style = submenu && getComputedStyle(submenu);
            const slideMs = style ? ((parseFloat(style.transitionDuration) || 0) + (parseFloat(style.transitionDelay) || 0)) * 1000 : 0;
            const fallback = setTimeout(end, slideMs + 100);
        };

        const slide = (expand, onDone) => {
            isBusy = true;
            tooltips.releaseAll();
            const slideEpoch = epoch;
            const duration = NDS.prefersReducedMotion ? 0 : NDS.transitionSpeed();
            const runLater = (fn) => { if (duration === 0) fn(); else timer = setTimeout(fn, duration); };
            NDS.aria.expanded(toggleBtn, expand);
            if (expand) {
                layout.removeAttribute('data-sidemenu-collapsed');
                try { localStorage.setItem(RAIL_KEY, '0'); } catch {}
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
                layout.setAttribute('data-sidemenu-collapsed', '');
                try { localStorage.setItem(RAIL_KEY, '1'); } catch {}
                runLater(() => {
                    removeState(sidemenu, 'open', 'closing');
                    dispatchRailEvent('collapsed');
                    finish();
                });
            }
        };

        // An open group closes first, then the menu folds.
        function fold() {
            // A host folded it during the group slide: end the busy wait it set.
            if (isFolded()) return finish();
            // A query left in the box would fold to its matches only. Escape is the drawer's
            // clear that restores the open groups at once, not after its input debounce.
            const searchInput = drawer?.querySelector('.nds-drawer-search .nds-search-input');
            if (searchInput?.value) searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            const openItem = sidemenu.querySelector('.nds-drawer-list > li:is([data-state~="open"], [data-state~="opening"])');
            const groupBtn = openItem?.querySelector(':scope > .nds-btn');
            if (!groupBtn) return slide(false);
            isBusy = true;
            // Runs fold() again: a group a script opened in the meantime closes too.
            afterGroupSlide('hidden', openItem, fold);
            NDS.Drawer.toggle(groupBtn);
            // The folded icon keeps the mark when the current page is in the group. The drawer's
            // watcher clears it in a microtask queued during toggle(); this one runs after it, before the paint.
            const holdsCurrent = !!openItem.querySelector(':scope > ul li[data-state~="active"]');
            queueMicrotask(() => { if (holdsCurrent && foldedItem === openItem) addState(groupBtn, 'active'); });
            // The first group keeps the mark; an always-open drawer's others lose theirs.
            foldedItem ??= openItem;
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
            isBusy = true;
            afterGroupSlide('shown', target.closest('li'), () => finish());
            NDS.Drawer.toggle(target);
        };
        const expand = (groupBtn) => slide(true, () => reopenGroup(groupBtn));

        // ── Stored fold ──
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
        // The layout holds the fold now; the head script's copy would outlive the next press.
        document.documentElement.removeAttribute('data-nds-sidemenu-fold');

        // ── Listeners ──
        toggleBtn.addEventListener('click', () => {
            if (smallQuery.matches) return hasState(sidemenu, 'open') ? closeMenu(menuState) : openMenu(menuState);
            request(() => (isFolded() ? expand() : fold()));
        }, { signal });
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
            if (btn) tooltips.sync(btn);
        }, { signal });
        // Folded, the box is all icon: a click there focuses the input, which opens the menu.
        drawer?.addEventListener('click', (e) => {
            if (isFolded()) e.target.closest('.nds-drawer-search')?.querySelector('.nds-search-input')?.focus();
        }, { signal });
        drawer?.addEventListener('focusin', (e) => {
            // The folded search icon: focus opens the menu, and the box keeps the focus.
            if (isFolded() && e.target.closest('.nds-drawer-search')) return request(() => { if (isFolded()) expand(); });
            const btn = e.target.closest('.nds-drawer-list > li > .nds-btn');
            // A new tooltip missed this focus: open it as its own focus listener would.
            if (btn && tooltips.sync(btn) && btn.matches(':focus-visible')) btn.ndsTooltip?.open();
        }, { signal });
        smallQuery.addEventListener('change', () => {
            cancelSlide();
            closeSlideIn();
            syncRail();
            if (!isFolded()) reopenGroup();
        }, { signal });
        // Below 960px a width change closes the slide-in, as the plain side menu's.
        let prevWidth = window.innerWidth;
        const offResize = NDS.onResize(() => {
            if (window.innerWidth === prevWidth) return;
            prevWidth = window.innerWidth;
            if (smallQuery.matches && hasState(sidemenu, 'open')) closeMenu(menuState);
        });
        signal.addEventListener('abort', offResize);
        signal.addEventListener('abort', () => {
            cancelSlide();
            closeSlideIn();
            releaseFoldedItem(null);
            clearState(sidemenu);
            layout.toggleAttribute('data-sidemenu-collapsed', menuState.wasCollapsed);
            tooltips.releaseAll();
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
        const isRail = layout?.classList.contains('nds-rail');
        menuState.wasHidden = toggleBtn.hidden;
        toggleBtn.removeAttribute('hidden');
        syncToggleLabel(sidemenu, toggleBtn, isTopMode && !isRail);
        setupScrollPeek(toggleBtn, abortController);
        if (isRail) {
            menuState.layout = layout;
            setupRail(menuState);
            return;
        }
        // Escape and a click outside reach the backdrop's onClick.
        toggleBtn.addEventListener("click", () => {
            hasState(animationTarget, 'open') ? closeMenu(menuState) : openMenu(menuState);
        }, { signal: abortController.signal });
        // The label follows an active mark a client-side route moves.
        const offLabel = NDS.onAttributeChange('.nds-sidemenu li', ['data-state'], () => syncToggleLabel(sidemenu, toggleBtn, isTopMode));
        abortController.signal.addEventListener('abort', offLabel);

        // Close on width change
        let prevWidth = window.innerWidth;
        const handleResize = () => {
            const width = window.innerWidth;
            if (width !== prevWidth) {
                prevWidth = width;
                if (hasState(animationTarget, 'open')) closeMenu(menuState);
            }
        };
        // Pooled handle takes no signal — bridge it onto the same teardown.
        const offResize = NDS.onResize(handleResize);
        abortController.signal.addEventListener('abort', offResize);
    }

    NDS.Sidemenu = { init: setupSideMenu, destroy };
})();
