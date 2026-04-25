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
    const DOM = {
        nav: document.querySelector('.nds-main-nav'),
        dgaTab: document.querySelector('.nds-digitalStamp-tab'),
        topbar: document.querySelector('.nds-topbar'),
        dgaDigitalStamp: document.querySelector('#nds-digitalStamp'),

        get collapse() { return this.nav?.querySelector('#ndsNavCollapse'); },
        get collapseContent() { return this.nav?.querySelector('.nds-collapse-content'); },
        get container() { return this.nav?.querySelector('.nds-nav-container'); },
        get primary() { return this.nav?.querySelector('.nds-nav-primary'); },
        get secondary() { return this.nav?.querySelector('.nds-nav-actions'); },
        get minimal() { return this.nav?.querySelector('.nds-nav-minimal'); },
        get toggler() { return this.nav?.querySelector('.nds-mainNav-toggler'); },
        get brand() { return this.nav?.querySelector('.nds-brand'); },
        get showMore() { return this.collapseContent?.querySelector('.nds-show-more'); }
    };

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

        _css: null,
        get css() {
            if (!this._css) {
                const styles = getComputedStyle(document.documentElement);
                this._css = {
                    minimalBp: parseInt(styles.getPropertyValue('--nds-minimal-nav-bp')) || MINIMAL_NAV_BP_FALLBACK,
                    speed: (parseFloat(styles.getPropertyValue('--nds-transition-speed')) || 0.2) * 1000,
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

        invalidateCache() { _containerLayoutCache = null; }
    };

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

    // Resolve the animation target for a dropdown element
    const getDropdownAnimTarget = (dd) => {
        const menu = dd.querySelector('.nds-dropdown-menu');
        const content = menu?.querySelector('.nds-dropdown-content');
        const isInMinimal = dd.closest('.nds-nav-minimal');
        const isInPrimary = dd.closest('.nds-nav-primary');
        const needsHeight = state.isMinimal && isInPrimary;
        const animTarget = isInMinimal ? (content || menu) : (needsHeight ? menu : (content || menu));
        return { menu, content, isInMinimal, isInPrimary, needsHeight, animTarget };
    };

    // Nav backdrop ownership — prevents flicker during navbar↔dropdown transitions
    let _navBackdropOwner = null;

    const showNavBackdrop = (owner, onClick) => {
        if (!NDS.Backdrop) return;
        if (_navBackdropOwner === owner) return;
        const replacing = _navBackdropOwner !== null;
        _navBackdropOwner = owner;
        NDS.Backdrop.show({ zIndex: 999, onClick });
        if (replacing) NDS.Backdrop.hide();
    };

    const hideNavBackdrop = (owner) => {
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

    // ==============================================
    // DROPDOWN MANAGEMENT
    // ==============================================
    const dropdown = {
        closeAll(except = null) {
            let maxDuration = 0;
            DOM.nav.querySelectorAll('.nds-dropdown[data-state~="open"]').forEach(dd => {
                if (dd !== except) {
                    this.toggle(dd, false);
                    maxDuration = Math.max(maxDuration, state.getDuration(getDropdownAnimTarget(dd).animTarget));
                }
            });
            if (maxDuration > 0) overflow.schedule('high');
            return maxDuration;
        },

        toggle(el, open) {
            const { animTarget, isInMinimal } = getDropdownAnimTarget(el);
            const navLink = el.querySelector('.nds-nav-link');

            if (open) addState(navLink, 'active');
            else removeState(navLink, 'active');

            const collapseHandlesBackdrop = !isInMinimal && hasState(DOM.collapse, 'open');
            if (open && !collapseHandlesBackdrop) {
                showNavBackdrop('dropdown', () => {
                    DOM.nav.querySelectorAll('.nds-dropdown[data-state~="open"]')
                        .forEach(d => dropdown.toggle(d, false));
                });
            }

            animate.run(el, open, {
                getMenu: () => animTarget,
                blockWhileAnimating: open,
                onStart: () => overflow.schedule('high', 10),
                onComplete: () => {
                    if (!isInMinimal) updatePositions();
                    overflow.schedule('low', 100);

                    if (!open && !collapseHandlesBackdrop) {
                        const stillOpen = DOM.nav.querySelectorAll('.nds-dropdown[data-state~="open"]');
                        if (stillOpen.length === 0 && !hasState(DOM.collapse, 'open') && !_pendingToggleTimer) {
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

            const collapseContent = DOM.collapse.querySelector('.nds-collapse-content');
            const toggleButton = DOM.toggler?.querySelector('button[aria-controls="ndsNavCollapse"]');

            if (open) {
                addState(DOM.toggler, 'open');
                toggleButton?.setAttribute('aria-expanded', 'true');

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
                toggleButton?.setAttribute('aria-expanded', 'false');
                const closeDelay = state.reducedMotion ? 0 : dropdown.closeAll();

                hideNavBackdrop('navbar');

                afterDelay(closeDelay, () => {
                    animate.run(DOM.collapse, false, {
                        getMenu: () => state.isMinimal ? (collapseContent || DOM.collapse) : null,
                        onComplete: () => { updatePositions(); overflow.schedule('low', 100); }
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
                    DOM.dgaTab?.setAttribute('aria-expanded', String(!isOpen));
                    if (!isOpen) NDS.State.add(DOM.dgaTab, 'expanded');
                    else NDS.State.remove(DOM.dgaTab, 'expanded');
                },
                onComplete: () => { updatePositions(); overflow.schedule(); }
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
                const maxH = parseFloat(getComputedStyle(DOM.primary).maxHeight);
                const scrollHeight = DOM.primary.scrollHeight;
                if (scrollHeight === 0) { this.schedule('low', 50); return; }
                if (isFinite(maxH) && maxH > 0) hasOverflow = scrollHeight > maxH + 2;
            } else {
                const { scrollWidth, clientWidth } = DOM.primary;
                if (scrollWidth === 0 && clientWidth === 0) { this.schedule('low', 50); return; }
                hasOverflow = scrollWidth > clientWidth;
            }

            // Remove hidden from collapse after primary nav settles (first check only)
            if (!this._initialCheckDone) {
                this._initialCheckDone = true;
                setTimeout(() => removeCollapseHidden(), hasOverflow ? 500 : 100);
            }

            if (hasOverflow === wasOverflowing) return;
            if (hasOverflow) addState(DOM.primary, 'has-more'); else removeState(DOM.primary, 'has-more');

            if (!state.isMinimal) updateNavMaxWidth();

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
        const isOpen = hasState(DOM.collapse, 'open');
        const isClosing = hasState(DOM.collapse, 'closing');

        if (!state.isMinimal || !isOpen || isClosing) {
            if (!state.isMinimal && DOM.secondary) {
                DOM.secondary.style.cssText = '';
                removeState(DOM.secondary, 'closing');
            }
            return;
        }

        if (state.isMinimal) {
            const collapseContent = DOM.collapse?.querySelector('.nds-collapse-content');
            afterDelay(state.getDuration(collapseContent || DOM.collapse) + 50, () => overflow.schedule());
        }
    }

    let _navMaxWidthLast = 0;
    let _containerLayoutCache = null;

    function updateNavMaxWidth() {
        if (!DOM.primary || !DOM.nav) return;

        if (state.isMinimal) {
            DOM.primary.style.maxWidth = '';
            overflow.schedule('immediate');
            return;
        }

        const container = DOM.container;
        const containerW = container?.offsetWidth || 0;
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
        const is = document.body.classList.contains('nds-minimal');
        if (should !== is) {
            document.body.classList.toggle('nds-minimal', should);
            if (DOM.minimal) DOM.minimal.toggleAttribute('hidden', !should);
            state.invalidateCache();
            managePABPlacement();
            return true;
        }
        return false;
    }

    function checkTogglerVisibility() {
        if (!DOM.toggler) return;

        const primary = DOM.primary ? Array.from(DOM.primary.children) : [];
        const secondary = DOM.secondary ? Array.from(DOM.secondary.children) : [];
        const all = [DOM.primary, DOM.secondary, ...primary, ...secondary].filter(Boolean);
        const styles = all.map(el => getComputedStyle(el));

        let idx = 0;
        const pStyle = DOM.primary ? styles[idx++] : null;
        const sStyle = DOM.secondary ? styles[idx++] : null;

        const pCount = primary.filter((c, i) =>
            !c.classList.contains('nds-show-more') && styles[idx + i]?.display !== 'none'
        ).length;

        const sCount = secondary.filter((_, i) =>
            styles[idx + primary.length + i]?.display !== 'none'
        ).length;

        const show = (pStyle?.display !== 'none' && pCount > 0) ||
            (sStyle?.display !== 'none' && sCount > 0);

        DOM.toggler.style.display = show ? '' : 'none';
    }

    // ==============================================
    // PAB (Persistent Action Buttons) MANAGEMENT
    // ==============================================
    function managePABPlacement() {
        const pabs = document.querySelectorAll('.nds-nav-item.nds-PAB');
        if (!pabs.length) return;

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

            let minNav = DOM.nav?.querySelector('.nds-nav-minimal');
            if (!minNav) {
                minNav = document.createElement('nav');
                minNav.className = 'nds-nav-minimal';
                DOM.nav?.insertBefore(minNav, DOM.nav.firstChild);
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
            const minNav = DOM.nav?.querySelector('.nds-nav-minimal');
            if (minNav && !minNav.children.length) minNav.remove();
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
                    document.querySelectorAll('.nds-nav-minimal .nds-dropdown[data-state~="open"]')
                        .forEach(d => dropdown.toggle(d, false));
                });

                const dropdownCloseDelay = state.reducedMotion ? 0 : dropdown.closeAll();
                const collapseContent = DOM.collapse?.querySelector('.nds-collapse-content');
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
        const collapseContent = DOM.collapse?.querySelector('.nds-collapse-content');
        const duration = state.getDuration(collapseContent || DOM.collapse);

        if (!isOpen) {
            const minimalDropdowns = document.querySelectorAll('.nds-nav-minimal .nds-dropdown[data-state~="open"]');
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
        const collapseContent = DOM.collapse?.querySelector('.nds-collapse-content');
        const duration = state.getDuration(collapseContent || DOM.collapse);

        if (hasState(DOM.collapse, 'open')) {
            navbar.toggle(false);
            afterDelay(duration * 1.2 + 50, () => dga.toggle());
        } else {
            const openDDs = document.querySelectorAll('.nds-dropdown[data-state~="open"]');
            if (openDDs.length) {
                const ddDuration = state.getDuration(getDropdownAnimTarget(openDDs[0]).animTarget);
                openDDs.forEach(d => dropdown.toggle(d, false));
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
        const target = event.target;

        // Close DGA if click outside
        if (hasState(DOM.dgaDigitalStamp, 'open')) {
            if (![DOM.dgaTab, DOM.dgaDigitalStamp].some(el => el?.contains(target))) {
                toggleDGA();
            }
        }

        // Close navbar if click outside
        if (DOM.toggler && hasState(DOM.collapse, 'open')) {
            const elements = [DOM.collapse, DOM.toggler];
            if (state.isMinimal) {
                DOM.collapse?.querySelectorAll('.nds-nav-actions .nds-dropdown[data-state~="open"] .nds-dropdown-menu')
                    .forEach(m => { if (!m.closest('.nds-nav-minimal')) elements.push(m); });
            }
            if (!elements.some(el => el?.contains(target))) toggleNavbar();
        }

        // Close dropdowns if click outside
        DOM.nav.querySelectorAll('.nds-dropdown[data-state~="open"]').forEach(dd => {
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
                document.querySelectorAll('.nds-dropdown[data-state~="open"]').forEach(dd => dropdown.toggle(dd, false));
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
        const _interactionsAC = new AbortController();
        const _interactionsSignal = _interactionsAC.signal;

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
                DOM.nav.querySelectorAll('.nds-nav-actions .nds-dropdown[data-state~="open"]')
                    .forEach(dd => dropdown.toggle(dd, false));
                DOM.primary.scrollTo({ top: atEnd ? 0 : DOM.primary.scrollTop + amount, behavior: 'smooth' });
            } else {
                const dir = state.css.isRTL ? -1 : 1;
                DOM.primary.scrollTo({ left: atEnd ? 0 : DOM.primary.scrollLeft + amount * dir, behavior: 'smooth' });
            }
            setTimeout(() => overflow.checkEnd(), 300);
        });

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
        });

        // Dropdown hover tracking — per-element guard prevents stacking when
        // trackDropdowns() re-runs on DOM mutations (runs on every onDOMAdd/Remove).
        const trackDropdowns = () => {
            document.querySelectorAll('.nds-dropdown-menu').forEach(menu => {
                if (menu._ndsHoverTracked) return;
                menu._ndsHoverTracked = true;
                menu.addEventListener('mouseenter', () => state.isMouseOverDropdown = true);
                menu.addEventListener('mouseleave', () => state.isMouseOverDropdown = false);
            });
        };
        trackDropdowns();

        const trackDD = NDS.debounce(() => trackDropdowns(), 150);
        NDS.onDOMAdd('.nds-dropdown-menu', trackDD);
        NDS.onDOMRemove('.nds-dropdown-menu', trackDD);
    }

    // All document/window/element listeners attached in setupEventListeners +
    // init() are scoped to this AbortController. Re-running init detaches the
    // prior batch atomically instead of stacking listeners on document/window
    // (the JSP-06 sub-shape (c) hazard). Pooled subscribers from NDS.onResize
    // and NDS.onElementResize return their own unsubscribe handles — tracked
    // separately because they can't use the AbortController signal.
    let _eventsAC = null;
    let _offResize = null;
    const _offElementResizes = [];
    let _initialized = false;

    function setupEventListeners() {
        // Abort prior subscriptions so a re-run doesn't stack listeners.
        if (_eventsAC) _eventsAC.abort();
        _eventsAC = new AbortController();
        const { signal } = _eventsAC;

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
            const openDropdowns = DOM.nav.querySelectorAll('.nds-dropdown[data-state~="open"]');

            if (wasNavOpen) toggleNavbar();
            else openDropdowns.forEach(dd => dropdown.toggle(dd, false));

            const delay = wasNavOpen || openDropdowns.length ? state.css.speed + 100 : 0;

            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', `#${hash}`);
            }, delay);
        }, { signal });

        DOM.collapse?.addEventListener('transitionend', (e) => {
            if (e.target === DOM.collapse && e.propertyName === 'height') scheduleUpdate();
        }, { signal });

        // NDS.onDOMAdd / onDOMRemove don't return unsubscribe handles, so they
        // rely on the init-guard below to prevent duplicate registrations.
        const navChanged = NDS.debounce(() => { state._navChanged = true; scheduleUpdate(); }, 100);
        NDS.onDOMAdd('.nds-nav-item, .nds-dropdown', navChanged);
        NDS.onDOMRemove('.nds-nav-item, .nds-dropdown', navChanged);

        const navResizeHandler = NDS.debounce((entry) => {
            const { width, height } = entry.contentRect;
            const last = entry.target._lastSize;
            if (!last || Math.abs(width - last.w) > 5 || Math.abs(height - last.h) > 5) {
                entry.target._lastSize = { w: width, h: height };
                if (state._initDone) {
                    state.invalidateCache();
                    _navMaxWidthLast = 0;
                    scheduleUpdate();
                }
            }
        }, 100);

        [DOM.nav, DOM.primary].filter(Boolean).forEach(el => {
            _offElementResizes.push(NDS.onElementResize(el, navResizeHandler));
        });
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================
    function init() {
        // Entry guard: mainnav is a singleton; a second init() call would stack
        // pooled subscribers that aren't covered by the AbortController
        // (NDS.onDOMAdd/onDOMRemove in particular).
        if (_initialized || !DOM.collapse) return;
        _initialized = true;

        updateBodyClass();
        setupEventListeners();
        // handleDocumentClick shares the setupEventListeners AbortController so
        // both document-click listeners detach atomically on teardown.
        document.addEventListener('click', handleDocumentClick, { signal: _eventsAC.signal });
        managePABPlacement();
        DOM.dgaTab?.addEventListener('click', toggleDGA, { signal: _eventsAC.signal });

        if (hasState(DOM.collapse, 'open')) updatePositions();
        setupInteractions();

        state._initDone = false;
        requestAnimationFrame(() => { updateNavMaxWidth(); state._initDone = true; });

        if (!DOM.primary) {
            removeCollapseHidden();
        } else {
            setTimeout(() => removeCollapseHidden(), 2000);
        }

    }

    // Keep reduced-motion in sync
    try {
        window.matchMedia?.('(prefers-reduced-motion: reduce)')
            ?.addEventListener('change', (e) => { state.reducedMotion = !!e.matches; });
    } catch { }

    Object.assign(window, { toggleNavbar, toggleDropdown, toggleDGA });
    NDS.Mainnav = { init };
})();
