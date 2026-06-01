// NDS Navigation Controller
(() => {
    'use strict';

    // Fallback values used only if corresponding CSS custom properties are undefined at runtime.
    // These should match the CSS defaults; any mismatch indicates a token-source drift.
    const MINIMAL_NAV_BP_FALLBACK = 768;
    const CONTENT_MAX_WIDTH_FALLBACK = 1280;

    // ==============================================
    // DOM REFERENCES
    // ==============================================
    // Mainnav is a singleton with a stable markup tree, so all node references
    // are cached eagerly at module load (script runs after DOMContentLoaded via
    // the loader). Previously every reference re-ran querySelector — `DOM.collapse`
    // alone is touched ~25× across this file.
    // The two dynamic refs (`minimal`, created on first mobile pass; reset to null
    // when removed) are kept in sync by managePABPlacement().
    const _nav = document.querySelector('.nds-main-nav');
    const DOM = {
        nav: _nav,
        dgaTab: document.querySelector('.nds-digitalStamp-tab'),
        topbar: document.querySelector('.nds-topbar'),
        dgaDigitalStamp: document.querySelector('#nds-digitalStamp'),
        collapse: _nav?.querySelector('#ndsNavCollapse') || null,
        collapseContent: _nav?.querySelector('.nds-collapse-content') || null,
        container: _nav?.querySelector('.nds-nav-container') || null,
        primary: _nav?.querySelector('.nds-nav-primary') || null,
        secondary: _nav?.querySelector('.nds-nav-actions') || null,
        brand: _nav?.querySelector('.nds-brand') || null,
        toggler: _nav?.querySelector('.nds-mainNav-toggler') || null,
        minimal: _nav?.querySelector('.nds-nav-minimal') || null,
        showMore: null,
    };
    DOM.showMore = DOM.collapseContent?.querySelector('.nds-show-more') || null;

    // State helpers — delegated to NDS.State (nds-core.js)
    const { add: addState, remove: removeState, has: hasState } = NDS.State;

    // ==============================================
    // STATE MANAGEMENT
    // ==============================================
    const state = {
        windowWidth: window.innerWidth,
        isMouseOverDropdown: false,
        isAnimating: false,
        pendingAction: null,
        pendingOverflowCheck: null,
        pendingUpdate: null,
        // Flipped true by the navChanged DOM-mutation debounce; consumed in
        // scheduleUpdate to gate the toggler-visibility recompute. Reset there.
        _navChanged: false,

        _css: null,
        get css() {
            if (!this._css) {
                const styles = getComputedStyle(document.documentElement);
                this._css = {
                    minimalBp: parseInt(styles.getPropertyValue('--nds-minimal-nav-bp')) || MINIMAL_NAV_BP_FALLBACK,
                    speed: NDS.transitionSpeed(),
                    isRTL: NDS.isRTL
                };
            }
            return this._css;
        },

        get isMinimal() { return this.windowWidth <= this.css.minimalBp; },

        _reducedMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false,
        get reducedMotion() { return this._reducedMotion; },
        set reducedMotion(val) { this._reducedMotion = val; },

        _durations: new WeakMap(),
        getDuration(el) {
            if (!el || this.reducedMotion) return 0;
            let cached = this._durations.get(el);
            if (cached === undefined) {
                cached = parseFloat(getComputedStyle(el).transitionDuration) || 0;
                this._durations.set(el, cached);
            }
            return cached > 0 ? this.css.speed : 0;
        },

        invalidateCache() {
            _containerLayoutCache = null;
            _primaryMaxHeightCached = null;
            this._css = null;
        }
    };

    // Cache of getComputedStyle(DOM.primary).maxHeight (parsed). Driven by CSS,
    // doesn't change at runtime; invalidated alongside the other layout caches
    // when state.invalidateCache() fires (mode change, resize, etc.).
    let _primaryMaxHeightCached = null;
    function getPrimaryMaxHeight() {
        if (_primaryMaxHeightCached === null) {
            _primaryMaxHeightCached = parseFloat(getComputedStyle(DOM.primary).maxHeight);
        }
        return _primaryMaxHeightCached;
    }

    // ==============================================
    // UTILITY HELPERS
    // ==============================================
    const afterDelay = (duration, callback) => {
        duration === 0 ? callback() : setTimeout(callback, duration);
    };

    // Tracked delayed action for toggle functions — prevents stale callbacks
    let _pendingToggleTimer = null;
    const scheduleToggleAction = (duration, callback) => {
        cancelToggleAction();
        duration === 0 ? callback() : (_pendingToggleTimer = setTimeout(() => { _pendingToggleTimer = null; callback(); }, duration));
    };
    const cancelToggleAction = () => {
        if (_pendingToggleTimer) { clearTimeout(_pendingToggleTimer); _pendingToggleTimer = null; }
    };

    // Resolve the animation target for a dropdown element.
    // The descendant lookups (menu, content) and ancestor lookups (isInMinimal,
    // isInPrimary) don't change across normal toggle flow — same dropdown
    // returns the same nodes. Cache via WeakMap. Invalidated by
    // invalidateDdCache() whenever managePABPlacement moves a PAB li between
    // .nds-nav-primary/.nds-nav-actions and .nds-nav-minimal (which changes
    // the ancestor chain).
    // needsHeight + animTarget still derive from state.isMinimal, which can
    // change at runtime, so those are computed fresh on every call.
    let _ddCache = new WeakMap();
    const invalidateDdCache = () => { _ddCache = new WeakMap(); };

    const getDropdownAnimTarget = (dd) => {
        let c = _ddCache.get(dd);
        if (!c) {
            const menu = dd.querySelector('.nds-dropdown-menu');
            const content = menu?.querySelector('.nds-dropdown-content');
            const isInMinimal = dd.closest('.nds-nav-minimal');
            const isInPrimary = dd.closest('.nds-nav-primary');
            c = { menu, content, isInMinimal, isInPrimary };
            _ddCache.set(dd, c);
        }
        const needsHeight = state.isMinimal && c.isInPrimary;
        const animTarget = c.isInMinimal ? (c.content || c.menu) : (needsHeight ? c.menu : (c.content || c.menu));
        return { ...c, needsHeight, animTarget };
    };

    // Nav backdrop ownership — prevents flicker during navbar↔dropdown transitions
    let _navBackdropOwner = null;

    const showNavBackdrop = (owner, onClick) => {
        // Soft dependency — nav skips backdrop dimming if NDS.Backdrop isn't bundled.
        if (!NDS.Backdrop) return;
        if (_navBackdropOwner === owner) return;
        const replacing = _navBackdropOwner !== null;
        _navBackdropOwner = owner;
        NDS.Backdrop.show({ zIndex: 999, onClick });
        if (replacing) NDS.Backdrop.hide();
    };

    const hideNavBackdrop = (owner) => {
        // Soft dependency — nav skips backdrop dimming if NDS.Backdrop isn't bundled.
        if (!NDS.Backdrop || _navBackdropOwner !== owner) return;
        _navBackdropOwner = null;
        NDS.Backdrop.hide();
    };

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
    // Set of currently-open dropdown elements (in any of open/opening/closing
    // state). Replaces ~10 `querySelectorAll('.nds-dropdown[data-state~="open"]')`
    // scans across this file with O(1) Set membership + O(open-count) iteration.
    // Maintained inside dropdown.toggle when state actually flips.
    const _openDropdowns = new Set();

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
                            !_pendingToggleTimer) {
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
    // DGA (Government Alert) MANAGEMENT
    // ==============================================
    const dga = {
        toggle() {
            if (!DOM.topbar || !DOM.dgaDigitalStamp) return;
            const isOpen = hasState(DOM.dgaDigitalStamp, 'open');

            animate.run(DOM.dgaDigitalStamp, !isOpen, {
                getMenu: () => DOM.dgaDigitalStamp,
                onStart: () => {
                    NDS.aria.expanded(DOM.dgaTab, !isOpen);
                    if (!isOpen) {
                        NDS.State.add(DOM.dgaTab, 'expanded');
                        // Drop intrinsic [hidden] before the open transition so
                        // display:none doesn't kill the animation.
                        DOM.dgaDigitalStamp.removeAttribute('hidden');
                    } else {
                        NDS.State.remove(DOM.dgaTab, 'expanded');
                    }
                },
                onComplete: () => {
                    updatePositions();
                    overflow.schedule();
                    // Restore [hidden] after the close transition ends.
                    if (isOpen) DOM.dgaDigitalStamp.setAttribute('hidden', '');
                }
            });
        }
    };

    // ==============================================
    // OVERFLOW DETECTION
    // ==============================================
    const overflow = {
        schedule(priority = 'normal', delay = 50) {
            if (state.pendingOverflowCheck) clearTimeout(state.pendingOverflowCheck);

            if (priority === 'immediate') {
                state.pendingOverflowCheck = null;
                requestAnimationFrame(() => this.check());
                return;
            }

            const ms = priority === 'high' ? 10 : priority === 'low' ? 100 : delay;
            state.pendingOverflowCheck = setTimeout(() => {
                state.pendingOverflowCheck = null;
                this.check();
            }, state.reducedMotion ? 0 : ms);
        },

        check() {
            if (!DOM.primary) return;

            if (state.isMinimal && !hasState(DOM.collapse, 'open')) {
                removeState(DOM.primary, 'has-more', 'at-start', 'at-end');
                return;
            }

            const wasOverflowing = hasState(DOM.primary, 'has-more');
            let hasOverflow = false;

            if (state.isMinimal) {
                const maxH = getPrimaryMaxHeight();
                const scrollHeight = DOM.primary.scrollHeight;
                if (scrollHeight === 0) { this.schedule('low', 50); return; }
                if (isFinite(maxH) && maxH > 0) hasOverflow = scrollHeight > maxH + 2;
            } else {
                const { scrollWidth, clientWidth } = DOM.primary;
                if (scrollWidth === 0 && clientWidth === 0) { this.schedule('low', 50); return; }
                hasOverflow = scrollWidth > clientWidth;
            }

            // Reveal the collapse once the overflow calc has settled for this
            // pass — first check only.
            const revealOnce = () => {
                if (this._initialCheckDone) return;
                this._initialCheckDone = true;
                removeCollapseHidden();
            };

            if (hasOverflow === wasOverflowing) {
                // Overflow state stable — the nav layout is already final.
                revealOnce();
                return;
            }

            if (hasOverflow) addState(DOM.primary, 'has-more'); else removeState(DOM.primary, 'has-more');

            if (!state.isMinimal) {
                // has-more just flipped the show-more button between
                // display:none and display:flex — that changes the flex space
                // it claims from .nds-nav-primary, so the cached width is now
                // stale. Force the recompute (the _navMaxWidthLast guard would
                // otherwise skip it) so the primary max-width accounts for the
                // show-more in this same synchronous pass — no ResizeObserver
                // round-trip, no unconstrained-nav flash before it settles.
                _navMaxWidthLast = 0;
                updateNavMaxWidth();
            }

            // Width calc has finished — the layout is final, reveal now.
            revealOnce();

            if (!hasOverflow) {
                removeState(DOM.primary, 'at-start', 'at-end');
            } else {
                requestAnimationFrame(() => this.checkEnd());
            }
        },

        checkEnd() {
            if (!hasState(DOM.primary, 'has-more')) return;

            let atStart, atEnd;
            if (state.isMinimal) {
                const { scrollTop, scrollHeight, clientHeight } = DOM.primary;
                atStart = scrollTop <= 1;
                atEnd = scrollTop + clientHeight >= scrollHeight - 1;
            } else {
                const { scrollLeft, scrollWidth, clientWidth } = DOM.primary;
                const max = scrollWidth - clientWidth;
                atStart = Math.abs(scrollLeft) <= 2;
                atEnd = max <= 1 || Math.abs(scrollLeft) >= max - 2;
            }
            if (atStart) addState(DOM.primary, 'at-start'); else removeState(DOM.primary, 'at-start');
            if (atEnd) addState(DOM.primary, 'at-end'); else removeState(DOM.primary, 'at-end');
        }
    };

    // ==============================================
    // LAYOUT UPDATES
    // ==============================================
    function removeCollapseHidden() {
        DOM.collapse?.removeAttribute('hidden');
    }

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

    let _navMaxWidthLast = 0;
    let _containerLayoutCache = null;
    // Cached container.offsetWidth across calls. Invalidated by the existing
    // ResizeObserver in setupEventListeners — most scheduleUpdate triggers
    // (mode changes, transitionend, modal opens, scrollend) don't actually
    // resize the container, so the read can be skipped.
    let _containerWCached = null;

    function updateNavMaxWidth() {
        if (!DOM.primary || !DOM.nav) return;

        if (state.isMinimal) {
            DOM.primary.style.maxWidth = '';
            overflow.schedule('immediate');
            return;
        }

        const container = DOM.container;
        if (_containerWCached === null) {
            _containerWCached = container?.offsetWidth || 0;
        }
        const containerW = _containerWCached;
        if (containerW === _navMaxWidthLast) return;
        _navMaxWidthLast = containerW;

        const navW = DOM.nav?.offsetWidth || 0;
        const brandW = DOM.brand?.offsetWidth || 0;
        const secW = DOM.secondary?.offsetWidth || 0;
        const minW = DOM.minimal?.offsetWidth || 0;
        const showMoreW = DOM.showMore && hasState(DOM.primary, 'has-more') ? DOM.showMore.offsetWidth : 0;

        if (!_containerLayoutCache || _containerLayoutCache.containerW !== containerW) {
            const containerStyles = container ? getComputedStyle(container) : null;
            const children = container ? Array.from(container.children) : [];
            let padding = 0, gap = 0;
            if (containerStyles) {
                padding = parseFloat(containerStyles.paddingLeft || 0) + parseFloat(containerStyles.paddingRight || 0);
                gap = parseFloat(containerStyles.gap || containerStyles.columnGap || 0) || 0;
            }
            const visibleCount = children.filter(c => c.offsetWidth > 0 || c.offsetHeight > 0).length;
            _containerLayoutCache = { containerW, padding, gap, visibleCount };
        }

        const { padding, gap, visibleCount } = _containerLayoutCache;
        const constraint = Math.min(navW, containerW || CONTENT_MAX_WIDTH_FALLBACK);
        const used = brandW + secW + minW + showMoreW + padding + (gap * Math.max(0, visibleCount - 1));
        const available = constraint - used;
        const newMax = available > 0 ? `${available}px` : '';

        if (DOM.primary.style.maxWidth !== newMax) {
            DOM.primary.style.maxWidth = newMax;
            state.invalidateCache();
            overflow.schedule('immediate');
        }
    }

    function updateBodyClass() {
        const should = state.isMinimal;
        const isBodyMin = document.body.classList.contains('nds-minimal');
        const wantsHidden = !should;
        // Layouts render <body> without `nds-minimal` (desktop-first default;
        // .nds-nav-minimal is gated by [hidden] in markup so no FOUC). On
        // init the body class state can already match `should` while
        // .nds-nav-minimal[hidden] hasn't been toggled yet. Compare both
        // states so the first sync still fires when only the hidden attr
        // is out of step.
        const isHidden = DOM.minimal ? DOM.minimal.hasAttribute('hidden') : wantsHidden;
        if (should !== isBodyMin || wantsHidden !== isHidden) {
            document.body.classList.toggle('nds-minimal', should);
            if (DOM.minimal) DOM.minimal.toggleAttribute('hidden', wantsHidden);
            state.invalidateCache();
            managePABPlacement();
            return true;
        }
        return false;
    }

    function checkTogglerVisibility() {
        if (!DOM.toggler) return;

        // Pure markup check — no layout reads, no style recalcs.
        // The mainnav SCSS doesn't conditionally hide individual .nds-nav-item
        // via media queries; PABs are MOVED between containers by
        // managePABPlacement (not CSS-hidden), and only the .nds-label inside
        // .nds-nav-link is hidden in icon-only mode (the item itself stays).
        // So "are there items the toggler would expose" reduces to
        // "is the parent not [hidden] and does it have at least one real,
        // non-placeholder, non-show-more child".
        const hasItems = (parent) => {
            if (!parent || parent.hasAttribute('hidden')) return false;
            for (const child of parent.children) {
                if (child.classList.contains('nds-show-more')) continue;
                // PAB placeholder left behind when managePABPlacement moves a
                // PAB out to .nds-nav-minimal in mobile mode.
                if (child.hasAttribute('data-pab-ph')) continue;
                return true;
            }
            return false;
        };

        const show = hasItems(DOM.primary) || hasItems(DOM.secondary);
        DOM.toggler.style.display = show ? '' : 'none';
    }

    // ==============================================
    // PAB (Persistent Action Buttons) MANAGEMENT
    // ==============================================
    function managePABPlacement() {
        const pabs = document.querySelectorAll('.nds-nav-item.nds-PAB');
        if (!pabs.length) return;

        // PAB moves change the ancestor chain of any dropdown inside a PAB li;
        // invalidate the cached closest() results so getDropdownAnimTarget
        // re-resolves isInMinimal / isInPrimary after the move.
        invalidateDdCache();

        if (state.isMinimal) {
            pabs.forEach((item, i) => {
                if (!item.dataset.origPos) {
                    const ph = document.createElement('span');
                    ph.style.display = 'none';
                    ph.dataset.pabPh = i;
                    item.parentNode.insertBefore(ph, item);
                    item.dataset.origPos = i;
                }
            });

            let minNav = DOM.minimal;
            if (!minNav) {
                // Match the static include's tag so <li> PABs (and toggler)
                // remain valid descendants when the create-if-missing fallback
                // fires for consumers that omit the static <ul>.
                minNav = document.createElement('ul');
                minNav.className = 'nds-nav-minimal';
                DOM.nav?.insertBefore(minNav, DOM.nav.firstChild);
                DOM.minimal = minNav;
            }

            const cta = Array.from(pabs).filter(p => p.classList.contains('nds-CTA'));
            const rest = Array.from(pabs).filter(p => !p.classList.contains('nds-CTA'));
            [...rest].reverse().forEach(p => minNav.prepend(p));
            [...cta].reverse().forEach(p => minNav.prepend(p));
        } else {
            pabs.forEach(item => {
                const pos = item.dataset.origPos;
                if (pos !== undefined) {
                    const ph = document.querySelector(`[data-pab-ph="${pos}"]`);
                    if (ph) { ph.parentNode.insertBefore(item, ph); ph.remove(); }
                    delete item.dataset.origPos;
                }
            });
            const minNav = DOM.minimal;
            if (minNav && !minNav.children.length) {
                minNav.remove();
                DOM.minimal = null;
            }
        }
    }

    // ==============================================
    // PUBLIC TOGGLE FUNCTIONS
    // ==============================================
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

            if (hasState(DOM.dgaDigitalStamp, 'open')) {
                dga.toggle();
                delay = Math.max(delay, duration);
            }

            scheduleToggleAction(delay, open);
        } else if (!state.isMinimal && hasState(DOM.dgaDigitalStamp, 'open')) {
            toggleDGA();
            afterDelay(duration, () => scheduleToggleAction(closeDelay, open));
        } else {
            scheduleToggleAction(closeDelay, open);
        }
    }

    function toggleNavbar() {
        if (state.isAnimating) { animate.queue('navbar'); return; }
        cancelToggleAction();

        const isOpen = hasState(DOM.collapse, 'open');
        const collapseContent = DOM.collapseContent;
        const duration = state.getDuration(collapseContent || DOM.collapse);

        if (!isOpen) {
            const minimalDropdowns = [..._openDropdowns].filter(d => d.closest('.nds-nav-minimal'));
            if (minimalDropdowns.length) {
                showNavBackdrop('navbar', () => {
                    if (hasState(DOM.collapse, 'open')) toggleNavbar();
                });

                minimalDropdowns.forEach(d => dropdown.toggle(d, false));
                scheduleToggleAction(duration, () => {
                    if (hasState(DOM.dgaDigitalStamp, 'open')) {
                        toggleDGA();
                        scheduleToggleAction(duration, () => navbar.toggle(true));
                    } else {
                        navbar.toggle(true);
                    }
                });
                return;
            }
        }

        if (hasState(DOM.dgaDigitalStamp, 'open')) {
            toggleDGA();
            scheduleToggleAction(duration, () => navbar.toggle(!isOpen));
        } else {
            navbar.toggle(!isOpen);
        }
    }

    function toggleDGA() {
        const collapseContent = DOM.collapseContent;
        const duration = state.getDuration(collapseContent || DOM.collapse);

        if (hasState(DOM.collapse, 'open')) {
            navbar.toggle(false);
            afterDelay(duration * 1.2 + 50, () => dga.toggle());
        } else {
            if (_openDropdowns.size) {
                const first = _openDropdowns.values().next().value;
                const ddDuration = state.getDuration(getDropdownAnimTarget(first).animTarget);
                _openDropdowns.forEach(d => dropdown.toggle(d, false));
                afterDelay(ddDuration, () => dga.toggle());
            } else {
                dga.toggle();
            }
        }
    }

    // ==============================================
    // EVENT HANDLERS
    // ==============================================
    function handleDocumentClick(event) {
        if (state.isAnimating) return;

        // Fast-bail: if nothing is open, the document click can't be an
        // outside-close. Saves a full DOM scan + per-dropdown closest()
        // checks on the overwhelming majority of page clicks.
        const dgaOpen = hasState(DOM.dgaDigitalStamp, 'open');
        const collapseOpen = DOM.toggler && hasState(DOM.collapse, 'open');
        if (!dgaOpen && !collapseOpen && _openDropdowns.size === 0) return;

        const target = event.target;

        // Close DGA if click outside
        if (dgaOpen) {
            if (![DOM.dgaTab, DOM.dgaDigitalStamp].some(el => el?.contains(target))) {
                toggleDGA();
            }
        }

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

    function scheduleUpdate() {
        if (state.pendingUpdate) return;

        state.pendingUpdate = requestAnimationFrame(() => {
            state.pendingUpdate = null;

            const newWidth = window.innerWidth;
            const widthChanged = newWidth !== state.windowWidth;
            if (widthChanged) state.windowWidth = newWidth;

            const modeChanged = updateBodyClass();
            updateNavMaxWidth();

            if (modeChanged) {
                _openDropdowns.forEach(dd => dropdown.toggle(dd, false));
                if (hasState(DOM.dgaDigitalStamp, 'open')) dga.toggle();

                if (hasState(DOM.collapse, 'open')) {
                    _navBackdropOwner = 'navbar';
                    cancelToggleAction();
                    navbar.toggle(false);
                    return;
                }

                if (_navBackdropOwner) {
                    _navBackdropOwner = null;
                    cancelToggleAction();
                    if (NDS.Backdrop.isActive()) NDS.Backdrop.hide();
                }
            }

            if (hasState(DOM.collapse, 'open') && !hasState(DOM.collapse, 'closing')) {
                updatePositions();
            }

            if (widthChanged || modeChanged || state._navChanged) {
                state._navChanged = false;
                checkTogglerVisibility();
            }
        });
    }

    // ==============================================
    // INTERACTIONS SETUP
    // ==============================================
    function setupInteractions() {
        if (!DOM.primary) return;

        // Scope all listeners attached in this function to a single AbortController
        // so teardown can detach them atomically if setupInteractions is ever re-run.
        const _interactionsAbortController = new AbortController();
        const _interactionsSignal = _interactionsAbortController.signal;

        // Show More button
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
                const dir = state.css.isRTL ? -1 : 1;
                DOM.primary.scrollTo({ left: atEnd ? 0 : DOM.primary.scrollLeft + amount * dir, behavior: 'smooth' });
            }
            // Fallback for browsers without `scrollend` (the listener below
            // covers modern browsers). The smooth-scroll duration is
            // browser-controlled, so a fixed 300 ms is a worst-case settle
            // estimate — not derived from --nds-transition-speed.
            if (!('onscrollend' in DOM.primary)) {
                setTimeout(() => overflow.checkEnd(), 300);
            }
        }, { signal: _interactionsSignal });

        // Scroll handling
        const onScroll = NDS.rafThrottle(() => {
            if (state.isMinimal && !hasState(DOM.collapse, 'open')) return;
            overflow.checkEnd();
        });
        DOM.primary.addEventListener('scroll', onScroll, { passive: true, signal: _interactionsSignal });

        if ('onscrollend' in DOM.primary) {
            DOM.primary.addEventListener('scrollend', () => {
                if (state.isMinimal && !hasState(DOM.collapse, 'open')) return;
                requestAnimationFrame(() => overflow.checkEnd());
            }, { signal: _interactionsSignal });
        }

        // Wheel scroll conversion (vertical → horizontal)
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
            const mult = state.css.isRTL ? -0.8 : 0.8;
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
        }, { passive: false, signal: _interactionsSignal });

        // Drag scrolling
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
        }, { signal: _interactionsSignal });

        // Dropdown hover tracking — single delegated pair on DOM.nav.
        // mouseover/mouseout bubble (mouseenter/mouseleave do not), so we filter
        // via closest. The relatedTarget guard ignores intra-menu transitions
        // and menu-to-sibling-menu moves (state stays correct without flicker).
        // Replaces N×2 per-menu listeners + a debounced onDOMAdd/onDOMRemove
        // re-scan that ran on every nav-tree mutation.
        DOM.nav.addEventListener('mouseover', (e) => {
            if (!e.target.closest('.nds-dropdown-menu')) return;
            if (e.relatedTarget?.closest?.('.nds-dropdown-menu')) return;
            state.isMouseOverDropdown = true;
        }, { signal: _interactionsSignal });
        DOM.nav.addEventListener('mouseout', (e) => {
            if (!e.target.closest('.nds-dropdown-menu')) return;
            if (e.relatedTarget?.closest?.('.nds-dropdown-menu')) return;
            state.isMouseOverDropdown = false;
        }, { signal: _interactionsSignal });
    }

    // All document/window/element listeners attached in setupEventListeners +
    // init() are scoped to this AbortController. Re-running init detaches the
    // prior batch atomically instead of stacking listeners on document/window
    // (the JSP-06 sub-shape (c) hazard). Pooled subscribers from NDS.onResize
    // and NDS.onElementResize return their own unsubscribe handles — tracked
    // separately because they can't use the AbortController signal.
    let _eventsAbortController = null;
    let _offResize = null;
    const _offElementResizes = [];
    let _initialized = false;

    function setupEventListeners() {
        // Abort prior subscriptions so a re-run doesn't stack listeners.
        if (_eventsAbortController) _eventsAbortController.abort();
        _eventsAbortController = new AbortController();
        const { signal } = _eventsAbortController;

        if (_offResize) { _offResize(); _offResize = null; }
        _offResize = NDS.onResize(() => { state.invalidateCache(); scheduleUpdate(); });

        _offElementResizes.splice(0).forEach(off => off());

        window.addEventListener('orientationchange', () => {
            state.invalidateCache();
            setTimeout(scheduleUpdate, 150);
        }, { passive: true, signal });

        document.addEventListener('click', (e) => {
            if (e.target.closest('.nds-dropdown > .nds-nav-link')) toggleDropdown(e);
            if (e.target.closest('.nds-mainNav-toggler')) { e.preventDefault(); toggleNavbar(); }
        }, { signal });

        // When a modal opens, dismiss any open nav drawer/dropdowns so the
        // modal sits on a clean overlay. Closing the drawer cascades to
        // close any dropdowns inside it via navbar.toggle().
        document.addEventListener('nds-modal-opened', () => {
            if (hasState(DOM.collapse, 'open')) navbar.toggle(false);
            else dropdown.closeAll();
        }, { signal });

        // Same-page anchor navigation — close nav and scroll to target
        DOM.nav?.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href*="#"]');
            if (!anchor || anchor.closest('.nds-dropdown')) return;

            const href = anchor.getAttribute('href');
            const hashIdx = href.indexOf('#');
            if (hashIdx === -1) return;

            const path = href.substring(0, hashIdx);
            const hash = href.substring(hashIdx + 1);
            if (!hash) return;

            const isSamePage = !path || path === location.pathname || path === location.pathname.replace(/\/$/, '');
            if (!isSamePage) return;

            const target = document.getElementById(hash);
            if (!target) return;

            e.preventDefault();

            const wasNavOpen = hasState(DOM.collapse, 'open');
            const openCount = _openDropdowns.size;

            if (wasNavOpen) toggleNavbar();
            else _openDropdowns.forEach(dd => dropdown.toggle(dd, false));

            const delay = wasNavOpen || openCount ? state.css.speed + 100 : 0;

            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', `#${hash}`);
            }, delay);
        }, { signal });

        DOM.collapse?.addEventListener('transitionend', (e) => {
            if (e.target === DOM.collapse && e.propertyName === 'height') scheduleUpdate();
        }, { signal });

        // mainnav is a singleton so the init-guard below prevents duplicate
        // registrations; that's why the unsubscribe handles NDS.onDOMAdd /
        // onDOMRemove now return aren't captured here.
        const navChanged = NDS.debounce(() => { state._navChanged = true; scheduleUpdate(); }, 100);
        NDS.onDOMAdd('.nds-nav-item, .nds-dropdown', navChanged);
        NDS.onDOMRemove('.nds-nav-item, .nds-dropdown', navChanged);

        // Steady-state resize: coalesce storms before the recompute.
        const onNavResize = NDS.debounce(() => {
            state.invalidateCache();
            _navMaxWidthLast = 0;
            scheduleUpdate();
        }, 100);

        // The first RO delivery carries the initial nav measurement. It fires
        // once nav/primary have a real box, inside the RO callback where
        // layout is already clean — so updateNavMaxWidth's offsetWidth reads
        // are free. Running this measurement in init() (or an init-time rAF)
        // would instead force a synchronous reflow during the component-init
        // burst. Not debounced: the read has to land in the RO callback to
        // stay free, and a debounced setTimeout would lose that guarantee.
        let firstNavMeasure = true;
        const navResizeHandler = (entry) => {
            const { width, height } = entry.contentRect;
            const last = entry.target._lastSize;
            if (last && Math.abs(width - last.w) <= 5 && Math.abs(height - last.h) <= 5) return;
            entry.target._lastSize = { w: width, h: height };
            // Container is a child of nav/primary, so a meaningful size
            // change here means the cached container width is stale.
            _containerWCached = null;
            if (firstNavMeasure) {
                firstNavMeasure = false;
                updateNavMaxWidth();
                return;
            }
            onNavResize();
        };

        [DOM.nav, DOM.primary].filter(Boolean).forEach(el => {
            _offElementResizes.push(NDS.onElementResize(el, navResizeHandler));
        });
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================
    function init() {
        // Entry guard: mainnav is a singleton; a second init() call would stack
        // pooled subscribers because the unsubscribe handles from
        // NDS.onDOMAdd / onDOMRemove aren't captured (see setupEventListeners).
        if (_initialized || !DOM.collapse) return;
        _initialized = true;

        // updateBodyClass calls managePABPlacement when the state transitions;
        // only run the explicit pass when it didn't, otherwise PAB placement
        // walks every .nds-PAB twice and re-prepends nodes already in place.
        const bodyClassChanged = updateBodyClass();

        // Strip [hidden] from #ndsNavCollapse so the universal
        // `[hidden]{display:none!important}` rule no longer blocks the
        // hamburger open transition. Markup ships with [hidden] to skip
        // layout pre-init; placed after updateBodyClass so the body's
        // minimal mode is set first, then the collapse becomes visible in
        // its correct breakpoint layout (display:none mobile /
        // display:flex desktop). Hamburger click can now animate freely.
        removeCollapseHidden();
        setupEventListeners();
        // handleDocumentClick shares the setupEventListeners AbortController so
        // both document-click listeners detach atomically on teardown.
        document.addEventListener('click', handleDocumentClick, { signal: _eventsAbortController.signal });
        if (!bodyClassChanged) managePABPlacement();
        // Set toggler visibility now that PABs (if any) have been placed.
        // scheduleUpdate's only call site for this fires on width/mode/nav
        // changes — none of which trigger on first load — so without this,
        // a page that loads in minimal with an empty collapse panel (e.g.
        // primary empty, secondary all PABs) would leave the toggler
        // CSS-visible with nothing to expose.
        checkTogglerVisibility();
        DOM.dgaTab?.addEventListener('click', toggleDGA, { signal: _eventsAbortController.signal });

        if (hasState(DOM.collapse, 'open')) updatePositions();
        setupInteractions();

        // The initial updateNavMaxWidth runs from the ResizeObserver's first
        // delivery (see navResizeHandler) — a free read, no init-time reflow.
    }

    // Keep reduced-motion in sync
    try {
        window.matchMedia?.('(prefers-reduced-motion: reduce)')
            ?.addEventListener('change', (e) => { state.reducedMotion = !!e.matches; });
    } catch { }

    NDS.Mainnav = { init, toggleNavbar, toggleDropdown, toggleDGA };
})();
