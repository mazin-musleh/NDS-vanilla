// ==============================================
// SPLIT COMPONENT — LAZY BEHAVIOR HALF (ships in nds-delegated.min.js)
// ==============================================
// The deferred behavior of NDS.Mainnav — the dropdown/navbar animation + open/
// close logic and the scroll/drag/wheel/hover interaction binders. Only needed
// once the user actually opens a dropdown or the drawer, never at first paint, so
// it loads after the reveal and grafts onto the shell's `behavior` dispatch via
// NDS.Mainnav._installBehavior. Mainnav is an IIFE singleton (no class/prototype),
// so the shell passes a `ctx` object holding every binding this code closes over
// (DOM, state, the eager helpers, the overflow object, the open-set). A click that
// lands before this half attaches is captured by the shell's opener traps, which
// preventDefault, queue, and replay here on install.
// RULES: attach ONLY via _installBehavior — never reassign NDS.Mainnav; keep
// anything that touches first paint or init-time layout in the shell.
// Pattern: CLAUDE.md → "JS Bundles & Shrinking the Critical Bundle".
(function () {
    'use strict';
    if (!NDS.Mainnav || !NDS.Mainnav._installBehavior) return;
    NDS.Mainnav._installBehavior(function (ctx) {
        const {
            DOM, state, addState, removeState, hasState,
            afterDelay, scheduleToggleAction, cancelToggleAction,
            getDropdownAnimTarget, showNavBackdrop, hideNavBackdrop,
            overflow, _openDropdowns, toggleTimer,
        } = ctx;

        // ==============================================
        // ANIMATION SYSTEM
        // ==============================================
        const animate = {
            _activeCount: 0,

            run(element, open, config = {}) {
                const { onStart, onComplete, getMenu, blockWhileAnimating = true } = config;
                if (blockWhileAnimating && open && state.isAnimating) return false;

                const duration = state.getDuration(getMenu?.() || element);

                this._activeCount++;
                state.isAnimating = true;

                const finish = () => {
                    this._activeCount--;
                    if (this._activeCount <= 0) {
                        this._activeCount = 0;
                        state.isAnimating = false;
                        this.processPending();
                    }
                    onComplete?.();
                };

                if (duration === 0) {
                    // Reduced motion: skip intermediate states, go straight to final state
                    if (open) {
                        addState(element, 'open', 'opened');
                        removeState(element, 'closing', 'opening');
                        onStart?.();
                    } else {
                        removeState(element, 'open', 'opened', 'opening', 'closing');
                        onStart?.();
                    }
                    finish();
                } else if (open) {
                    addState(element, 'open', 'opening');
                    removeState(element, 'closing', 'opened');
                    onStart?.();
                    requestAnimationFrame(() => requestAnimationFrame(() => removeState(element, 'opening')));
                    afterDelay(duration, () => { addState(element, 'opened'); finish(); });
                } else {
                    addState(element, 'closing');
                    removeState(element, 'opened');
                    onStart?.();
                    afterDelay(duration, () => { removeState(element, 'open', 'opening', 'closing'); finish(); });
                }
                return true;
            },

            processPending() {
                if (!state.pendingAction) return;
                const action = state.pendingAction;
                state.pendingAction = null;
                if (action.type === 'dropdown') toggleDropdown(action.event);
                else if (action.type === 'navbar') toggleNavbar();
            },

            queue(type, event = null) {
                state.pendingAction = { type, event };
            }
        };

        // Center .nds-fit dropdown menus on their trigger and clamp into the viewport.
        // SCSS centers via `left: 50%` + `transform: translateX(-50%)`; this helper
        // overrides the transform inline only when the centered rect would clip
        // either edge. Bails on mobile (mobile uses `position: fixed; inset-inline: 0`).
        // Edge buffer for the .nds-fit dropdown shift. Keeps the menu this many
        // pixels from the inner viewport edge (i.e. the edge of the visible content
        // area, not the scrollbar area).
        const FIT_SHIFT_PAD = 16;
        function applyFitShift(dd) {
            const menu = dd.querySelector('.nds-dropdown-menu.nds-fit');
            if (!menu) return;
            // Clear any leftover inline transform BEFORE the minimal-mode bail. Minimal
            // mode uses `position: fixed; inset-inline: 0` and a stale shift from a
            // prior desktop open would push the fixed full-width menu off-screen.
            menu.style.removeProperty('transform');
            if (state.isMinimal) return;
            requestAnimationFrame(() => {
                const r = menu.getBoundingClientRect();

                // Use the inner viewport (excludes the vertical scrollbar) for bounds.
                // window.innerWidth includes the scrollbar; landing the menu's edge at
                // `innerWidth - PAD` puts it behind the scrollbar — flush with the
                // visible edge with no real gap. The scrollbar lives on the right in
                // LTR, on the left in RTL.
                const innerW = window.innerWidth;
                const sb = innerW - document.documentElement.clientWidth;
                const left = NDS.isRTL ? sb : 0;
                const right = NDS.isRTL ? innerW : innerW - sb;

                let shift = 0;
                if (r.left < left + FIT_SHIFT_PAD) shift = (left + FIT_SHIFT_PAD) - r.left;
                else if (r.right > right - FIT_SHIFT_PAD) shift = (right - FIT_SHIFT_PAD) - r.right;
                if (shift) menu.style.transform = `translateX(calc(-50% + ${shift}px))`;
            });
        }

        // ==============================================
        // DROPDOWN MANAGEMENT
        // ==============================================
        const dropdown = {
            closeAll(except = null) {
                let maxDuration = 0;
                _openDropdowns.forEach(dd => {
                    if (dd !== except) {
                        this.toggle(dd, false);
                        maxDuration = Math.max(maxDuration, state.getDuration(getDropdownAnimTarget(dd).animTarget));
                    }
                });
                if (maxDuration > 0) overflow.schedule('high');
                return maxDuration;
            },

            toggle(el, open) {
                const { animTarget, isInMinimal, menu } = getDropdownAnimTarget(el);
                const navLink = el.querySelector('.nds-nav-link');

                // Maintain the open set when toggle actually flips state.
                const wasOpen = hasState(el, 'open');
                if (open !== wasOpen) {
                    if (open) _openDropdowns.add(el);
                    else _openDropdowns.delete(el);
                }

                if (open) addState(navLink, 'active');
                else removeState(navLink, 'active');

                const collapseHandlesBackdrop = !isInMinimal && hasState(DOM.collapse, 'open');
                if (open && !collapseHandlesBackdrop) {
                    showNavBackdrop('dropdown', () => {
                        _openDropdowns.forEach(d => dropdown.toggle(d, false));
                    });
                }

                animate.run(el, open, {
                    getMenu: () => animTarget,
                    blockWhileAnimating: open,
                    onStart: () => {
                        overflow.schedule('high', 10);
                        if (open) {
                            // Drop intrinsic [hidden] before the open transition so
                            // display:none doesn't kill the animation.
                            menu?.removeAttribute('hidden');
                            applyFitShift(el);
                        }
                    },
                    onComplete: () => {
                        if (!isInMinimal) updatePositions();
                        overflow.schedule('low', 100);

                        if (!open) {
                            // Restore [hidden] after the close transition ends.
                            menu?.setAttribute('hidden', '');
                            if (!collapseHandlesBackdrop &&
                                _openDropdowns.size === 0 &&
                                !hasState(DOM.collapse, 'open') &&
                                !toggleTimer.value) {
                                hideNavBackdrop('dropdown');
                            }
                        }
                    }
                });
            }
        };

        // ==============================================
        // NAVBAR MANAGEMENT
        // ==============================================
        const navbar = {
            toggle(open) {
                if (!DOM.collapse) return;

                const collapseContent = DOM.collapseContent;
                const toggleButton = DOM.toggler?.querySelector('button[aria-controls="ndsNavCollapse"]');

                if (open) {
                    addState(DOM.toggler, 'open');
                    NDS.aria.expanded(toggleButton, true);

                    if (state.isMinimal) {
                        showNavBackdrop('navbar', () => {
                            if (hasState(DOM.collapse, 'open')) toggleNavbar();
                        });
                    }

                    animate.run(DOM.collapse, true, {
                        getMenu: () => state.isMinimal ? (collapseContent || DOM.collapse) : null,
                        onStart: () => { if (state.isMinimal) overflow.schedule('high', 10); },
                        onComplete: () => { updatePositions(); overflow.schedule('low', 100); }
                    });
                } else {
                    removeState(DOM.toggler, 'open');
                    NDS.aria.expanded(toggleButton, false);
                    const closeDelay = state.reducedMotion ? 0 : dropdown.closeAll();

                    afterDelay(closeDelay, () => {
                        animate.run(DOM.collapse, false, {
                            getMenu: () => state.isMinimal ? (collapseContent || DOM.collapse) : null,
                            // Defer hideNavBackdrop until the drawer finishes closing —
                            // Backdrop.hide()'s synchronous scrollLock.unlock() reflow would
                            // otherwise land in the toggle click frame and inflate INP.
                            onComplete: () => { hideNavBackdrop('navbar'); updatePositions(); overflow.schedule('low', 100); }
                        });
                    });
                }
            }
        };

        // ==============================================
        // LAYOUT UPDATES (open-only)
        // ==============================================
        function updatePositions() {
            // Single parse — both flags read from the same data-state token Set.
            const ds = DOM.collapse ? NDS.State.parse(DOM.collapse) : new Set();
            const isOpen = ds.has('open');
            const isClosing = ds.has('closing');

            if (!state.isMinimal || !isOpen || isClosing) {
                if (!state.isMinimal && DOM.secondary) {
                    DOM.secondary.style.cssText = '';
                    removeState(DOM.secondary, 'closing');
                }
                return;
            }

            if (state.isMinimal) {
                const collapseContent = DOM.collapseContent;
                afterDelay(state.getDuration(collapseContent || DOM.collapse) + 50, () => overflow.schedule());
            }
        }

        // ==============================================
        // PUBLIC TOGGLE FUNCTIONS
        // ==============================================
        // Routes an open-dropdown action to one of two modes:
        //   1. minimal+isInMinimal+drawer-open: close the drawer first, then open
        //   2. default:                         schedule open after the closeAll settles
        function _scheduleDropdownOpen(isInMinimal, closeDelay, open) {
            if (isInMinimal && state.isMinimal) {
                let delay = 0;

                if (hasState(DOM.collapse, 'open')) {
                    showNavBackdrop('dropdown', () => {
                        _openDropdowns.forEach(d => {
                            if (d.closest('.nds-nav-minimal')) dropdown.toggle(d, false);
                        });
                    });

                    const dropdownCloseDelay = state.reducedMotion ? 0 : dropdown.closeAll();
                    const collapseContent = DOM.collapseContent;
                    const totalNavbarDuration = dropdownCloseDelay + state.getDuration(collapseContent || DOM.collapse);

                    navbar.toggle(false);
                    delay = Math.max(delay, totalNavbarDuration * 1.2);
                } else {
                    delay = Math.max(delay, closeDelay);
                }

                scheduleToggleAction(delay, open);
            } else {
                scheduleToggleAction(closeDelay, open);
            }
        }

        function toggleDropdown(event) {
            event.preventDefault();
            const dd = event.target.closest('.nds-dropdown');
            if (!dd) return;

            const isOpen = hasState(dd, 'open');
            const { animTarget, isInMinimal, isInPrimary } = getDropdownAnimTarget(dd);
            const duration = state.getDuration(animTarget);

            if (state.isAnimating) { animate.queue('dropdown', event); return; }
            cancelToggleAction();

            if (isOpen) {
                dropdown.toggle(dd, false);
                if (isInPrimary && hasState(DOM.collapse, 'open')) afterDelay(duration, updatePositions);
                return;
            }

            const closeDelay = dropdown.closeAll(dd);

            const open = () => {
                if (animate._activeCount === 0) state.isAnimating = false;
                dropdown.toggle(dd, true);
                if (isInPrimary && hasState(DOM.collapse, 'open')) afterDelay(duration * 0.1, updatePositions);
            };

            _scheduleDropdownOpen(isInMinimal, closeDelay, open);
        }

        function toggleNavbar() {
            if (state.isAnimating) { animate.queue('navbar'); return; }
            cancelToggleAction();

            const isOpen = hasState(DOM.collapse, 'open');

            if (!isOpen) {
                const minimalDropdowns = [..._openDropdowns].filter(d => d.closest('.nds-nav-minimal'));
                if (minimalDropdowns.length) {
                    const collapseContent = DOM.collapseContent;
                    const duration = state.getDuration(collapseContent || DOM.collapse);

                    showNavBackdrop('navbar', () => {
                        if (hasState(DOM.collapse, 'open')) toggleNavbar();
                    });

                    minimalDropdowns.forEach(d => dropdown.toggle(d, false));
                    scheduleToggleAction(duration, () => navbar.toggle(true));
                    return;
                }
            }

            navbar.toggle(!isOpen);
        }

        // ==============================================
        // EVENT HANDLERS
        // ==============================================
        function handleDocumentClick(event) {
            if (state.isAnimating) return;

            // Fast-bail: if nothing is open, the document click can't be an
            // outside-close. Saves a full DOM scan + per-dropdown closest()
            // checks on the overwhelming majority of page clicks.
            const collapseOpen = DOM.toggler && hasState(DOM.collapse, 'open');
            if (!collapseOpen && _openDropdowns.size === 0) return;

            const target = event.target;

            // Close navbar if click outside
            if (collapseOpen) {
                const elements = [DOM.collapse, DOM.toggler];
                if (state.isMinimal) {
                    _openDropdowns.forEach(dd => {
                        if (!dd.closest('.nds-nav-actions')) return;
                        if (DOM.collapse && !DOM.collapse.contains(dd)) return;
                        const menu = dd.querySelector('.nds-dropdown-menu');
                        if (menu && !menu.closest('.nds-nav-minimal')) elements.push(menu);
                    });
                }
                if (!elements.some(el => el?.contains(target))) toggleNavbar();
            }

            // Close dropdowns if click outside
            _openDropdowns.forEach(dd => {
                if (hasState(dd, 'closing')) return;
                const menu = dd.querySelector('.nds-dropdown-menu');
                if (![dd, menu].some(el => el?.contains(target))) {
                    const needsRecalc = (dd.closest('.nds-nav-primary') || dd.closest('.nds-nav-actions')) &&
                        hasState(DOM.collapse, 'open');
                    dropdown.toggle(dd, false);
                    if (needsRecalc) afterDelay(state.getDuration(menu), updatePositions);
                }
            });
        }

        // ==============================================
        // INTERACTIONS SETUP
        // ==============================================
        function _bindShowMore(signal) {
            const clickTarget = DOM.collapseContent || DOM.primary;
            clickTarget.addEventListener('click', (e) => {
                const showMore = e.target.closest('.nds-nav-item.nds-show-more');
                if (!showMore) return;
                e.preventDefault();
                e.stopPropagation();

                const atEnd = hasState(DOM.primary, 'at-end');
                const amount = (state.isMinimal ? DOM.primary.clientHeight : DOM.primary.clientWidth) * 0.8;

                if (state.isMinimal) {
                    _openDropdowns.forEach(dd => {
                        if (dd.closest('.nds-nav-actions')) dropdown.toggle(dd, false);
                    });
                    DOM.primary.scrollTo({ top: atEnd ? 0 : DOM.primary.scrollTop + amount, behavior: 'smooth' });
                } else {
                    const dir = NDS.isRTL ? -1 : 1;
                    DOM.primary.scrollTo({ left: atEnd ? 0 : DOM.primary.scrollLeft + amount * dir, behavior: 'smooth' });
                }
                // Fallback for browsers without `scrollend` (the listener below
                // covers modern browsers). The smooth-scroll duration is
                // browser-controlled, so a fixed 300 ms is a worst-case settle
                // estimate — not derived from --nds-transition-speed.
                if (!('onscrollend' in DOM.primary)) {
                    setTimeout(() => overflow.checkEnd(), 300);
                }
            }, { signal });
        }

        function _bindScrollTracking(signal) {
            const onScroll = NDS.rafThrottle(() => {
                if (state.isMinimal && !hasState(DOM.collapse, 'open')) return;
                overflow.checkEnd();
            });
            DOM.primary.addEventListener('scroll', onScroll, { passive: true, signal });

            if ('onscrollend' in DOM.primary) {
                DOM.primary.addEventListener('scrollend', () => {
                    if (state.isMinimal && !hasState(DOM.collapse, 'open')) return;
                    requestAnimationFrame(() => overflow.checkEnd());
                }, { signal });
            }
        }

        function _bindWheelConversion(signal) {
            DOM.primary.style.scrollBehavior = 'smooth';
            let scrolling = false;

            DOM.primary.addEventListener('wheel', (e) => {
                if (state.isMouseOverDropdown || state.isMinimal ||
                    Math.abs(e.deltaX) >= Math.abs(e.deltaY) ||
                    !hasState(DOM.primary, 'has-more')) return;

                e.preventDefault();
                if (scrolling) return;

                scrolling = true;
                DOM.primary.style.scrollBehavior = 'auto';

                const start = DOM.primary.scrollLeft;
                const mult = NDS.isRTL ? -0.8 : 0.8;
                const delta = e.deltaY * mult;
                let frame = 0;

                const step = () => {
                    frame += 16;
                    const p = Math.min(frame / 150, 1);
                    DOM.primary.scrollLeft = start + delta * (1 - Math.pow(1 - p, 3));
                    if (p < 1) requestAnimationFrame(step);
                    else { scrolling = false; DOM.primary.style.scrollBehavior = 'smooth'; }
                };
                requestAnimationFrame(step);
            }, { passive: false, signal });
        }

        function _bindDragScroll(signal) {
            let drag = { active: false, startX: 0, scrollLeft: 0 };

            const dragUp = () => {
                drag.active = false;
                document.removeEventListener('mousemove', dragMove);
                document.removeEventListener('mouseup', dragUp);
                Object.assign(DOM.primary.style, { cursor: '', userSelect: '', scrollBehavior: 'smooth' });
            };

            const dragMove = (e) => {
                if (state.isMinimal) { dragUp(); return; }
                e.preventDefault();
                DOM.primary.scrollLeft = drag.scrollLeft - (e.pageX - drag.startX);
            };

            DOM.primary.addEventListener('mousedown', (e) => {
                if (state.isMinimal || !hasState(DOM.primary, 'has-more')) return;
                drag = { active: true, startX: e.pageX, scrollLeft: DOM.primary.scrollLeft };
                Object.assign(DOM.primary.style, { cursor: 'grabbing', userSelect: 'none', scrollBehavior: 'auto' });
                e.preventDefault();
                document.addEventListener('mousemove', dragMove);
                document.addEventListener('mouseup', dragUp);
            }, { signal });
        }

        // Dropdown hover tracking — single delegated pair on DOM.nav.
        // mouseover/mouseout bubble (mouseenter/mouseleave do not), so we filter
        // via closest. The relatedTarget guard ignores intra-menu transitions
        // and menu-to-sibling-menu moves (state stays correct without flicker).
        // Replaces N×2 per-menu listeners + a debounced onDOMAdd/onDOMRemove
        // re-scan that ran on every nav-tree mutation.
        function _bindHoverTracking(signal) {
            DOM.nav.addEventListener('mouseover', (e) => {
                if (!e.target.closest('.nds-dropdown-menu')) return;
                if (e.relatedTarget?.closest?.('.nds-dropdown-menu')) return;
                state.isMouseOverDropdown = true;
            }, { signal });
            DOM.nav.addEventListener('mouseout', (e) => {
                if (!e.target.closest('.nds-dropdown-menu')) return;
                if (e.relatedTarget?.closest?.('.nds-dropdown-menu')) return;
                state.isMouseOverDropdown = false;
            }, { signal });
        }

        function setupInteractions() {
            if (!DOM.primary) return;

            // Scope all listeners attached in this function to a single AbortController
            // so teardown can detach them atomically if setupInteractions is ever re-run.
            const _interactionsAbortController = new AbortController();
            const { signal } = _interactionsAbortController;

            _bindShowMore(signal);
            _bindScrollTracking(signal);
            _bindWheelConversion(signal);
            _bindDragScroll(signal);
            _bindHoverTracking(signal);
        }

        // The shell's `behavior` dispatch traps these by name; _installBehavior
        // Object.assigns them over the trap stubs, then replays any queued calls.
        // __deferred names every shell-trapped method so the build can verify
        // the shell has a _deferBehavior('<name>') call for each entry, and vice
        // versa — catching a forgotten trap before it ships.
        return {
            __deferred: ['toggleDropdown', 'toggleNavbar', 'setupInteractions', 'updatePositions', 'handleDocumentClick', 'closeAll'],
            toggleDropdown,
            toggleNavbar,
            setupInteractions,
            updatePositions,
            closeAll: dropdown.closeAll.bind(dropdown),
            handleDocumentClick,
        };
    });
})();
