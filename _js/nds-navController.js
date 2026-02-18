// NDS Navigation Controller
(() => {
    'use strict';

    // ==============================================
    // DOM REFERENCES
    // ==============================================
    const DOM = {
        nav: document.getElementById('ndsMainNav'),
        dgaTab: document.querySelector('.nds-digitalStamp-tab'),
        topbar: document.querySelector('.nds-topbar'),
        dgaDigitalStamp: document.querySelector('#nds-digitalStamp'),

        get collapse() { return this.nav?.querySelector('#ndsNavCollapse'); },
        get collapseContent() { return this.nav?.querySelector('.nds-collapse-content'); },
        get container() { return this.nav?.querySelector('.nds-nav-container'); },
        get primary() { return this.nav?.querySelector('.nds-nav-primary'); },
        get secondary() { return this.nav?.querySelector('.nds-nav-secondary'); },
        get minimal() { return this.nav?.querySelector('.nds-nav-minimal'); },
        get toggler() { return this.nav?.querySelector('.nds-mainNav-toggler'); },
        get brand() { return this.nav?.querySelector('.nds-brand'); },
        get showMore() { return this.collapseContent?.querySelector('.showMore'); }
    };

    // ==============================================
    // STATE MANAGEMENT HELPERS
    // ==============================================
    const parseStates = (el) =>
        new Set((el?.getAttribute('data-state') || '').split(/\s+/).filter(Boolean));

    const hasState = (el, s) => el ? parseStates(el).has(s) : false;

    const addState = (element, ...states) => {
        if (!element) return;
        const current = parseStates(element);
        states.forEach(s => current.add(s));
        element.setAttribute('data-state', [...current].join(' '));
    };

    const removeState = (element, ...states) => {
        if (!element) return;
        const current = parseStates(element);
        states.forEach(s => current.delete(s));
        current.size ? element.setAttribute('data-state', [...current].join(' '))
                     : element.removeAttribute('data-state');
    };

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

        // Cached CSS values (computed once)
        _css: null,
        get css() {
            if (!this._css) {
                const root = document.documentElement;
                const styles = getComputedStyle(root);
                this._css = {
                    minimalBp: parseInt(styles.getPropertyValue('--nds-minimal-nav-bp')) || 768,
                    speed: (parseFloat(styles.getPropertyValue('--nds-transition-speed')) || 0.2) * 1000,
                    isRTL: root.dir === 'rtl' || styles.direction === 'rtl',
                    safeZone: parseInt(styles.getPropertyValue('--nds-dropdown-safeZone')) || 24
                };
            }
            return this._css;
        },

        get isMinimal() { return this.windowWidth <= this.css.minimalBp; },

        // Reduced motion preference
        _reducedMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false,
        get reducedMotion() { return this._reducedMotion; },
        set reducedMotion(val) { this._reducedMotion = val; },

        // Transition duration cache (WeakMap for auto-cleanup)
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

        // Clear caches when layout changes significantly
        invalidateCache() {
            _containerLayoutCache = null;
        }
    };

    // ==============================================
    // UTILITY HELPERS
    // ==============================================
    const throttle = (fn, ms) => {
        let wait;
        return (...args) => {
            if (!wait) { fn(...args); wait = true; setTimeout(() => wait = false, ms); }
        };
    };

    // Batch read element widths to avoid forced reflows
    // Use offsetWidth (cheap, no getComputedStyle needed) — includes padding+border, excludes margin.
    // Nav elements have margin handled by flex gap, so offsetWidth is sufficient.
    const getWidths = (...elements) => elements.map(el => el?.offsetWidth || 0);

    // Check if click is outside elements with buffer zone
    const isOutside = (x, y, elements, buffer) => {
        return !elements.some(el => {
            if (!el) return false;
            const r = el.getBoundingClientRect();
            return x >= r.left - buffer && x <= r.right + buffer &&
                y >= r.top - buffer && y <= r.bottom + buffer;
        });
    };

    // Execute callback after delay, or immediately if duration is 0
    const afterDelay = (duration, callback) => {
        if (duration === 0) callback();
        else setTimeout(callback, duration);
    };

    // Tracked delayed action for toggle functions — prevents stale callbacks
    let _pendingToggleTimer = null;
    const scheduleToggleAction = (duration, callback) => {
        cancelToggleAction();
        if (duration === 0) callback();
        else _pendingToggleTimer = setTimeout(() => { _pendingToggleTimer = null; callback(); }, duration);
    };
    const cancelToggleAction = () => {
        if (_pendingToggleTimer) { clearTimeout(_pendingToggleTimer); _pendingToggleTimer = null; }
    };

    // Nav backdrop ownership — prevents flicker during navbar↔dropdown transitions
    let _navBackdropOwner = null; // 'navbar' | 'dropdown' | null

    const showNavBackdrop = (owner, onClick) => {
        if (!window.NDSBackdrop) return;
        if (_navBackdropOwner === owner) return; // Already showing for this owner

        const replacing = _navBackdropOwner !== null;
        _navBackdropOwner = owner;

        // show() increments count + updates config
        window.NDSBackdrop.show({ zIndex: 999, onClick });

        // If taking over from another owner, hide() decrements old count
        // Net: count unchanged, config updated, no visual gap
        if (replacing) window.NDSBackdrop.hide();
    };

    const hideNavBackdrop = (owner) => {
        if (!window.NDSBackdrop) return;
        if (_navBackdropOwner !== owner) return; // Not our backdrop
        _navBackdropOwner = null;
        window.NDSBackdrop.hide();
    };

    // ==============================================
    // ANIMATION SYSTEM
    // ==============================================
    const animate = {
        // Track active animations count (allows concurrent closes)
        _activeCount: 0,

        // Animate an element open/closed
        run(element, open, config = {}) {
            const {
                onStart,
                onComplete,
                getMenu,
                blockWhileAnimating = true
            } = config;

            // Only block new OPEN animations, allow closes to proceed
            if (blockWhileAnimating && open && state.isAnimating) return false;

            const menu = getMenu?.();
            // Get duration from menu if available (for dropdowns), otherwise from element
            const duration = state.getDuration(menu || element);

            // Track animation state
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

            if (open) {
                addState(element, 'open', 'opening');
                removeState(element, 'closing', 'opened');
                onStart?.();

                requestAnimationFrame(() => requestAnimationFrame(() => {
                    removeState(element, 'opening');
                }));

                afterDelay(duration, () => {
                    addState(element, 'opened');
                    finish();
                });
            } else {
                addState(element, 'closing');
                removeState(element, 'opened');

                onStart?.();

                afterDelay(duration, () => {
                    removeState(element, 'open', 'opening', 'closing');
                    finish();
                });
            }
            return true;
        },

        // Process queued actions after all animations complete
        processPending() {
            if (!state.pendingAction) return;
            const action = state.pendingAction;
            state.pendingAction = null;

            if (action.type === 'dropdown') toggleDropdown(action.event);
            else if (action.type === 'navbar') toggleNavbar();
        },

        // Queue action if animation is in progress
        queue(type, event = null) {
            state.pendingAction = { type, event };
        }
    };

    // ==============================================
    // DROPDOWN MANAGEMENT
    // ==============================================
    const dropdown = {
        closeAll(except = null) {
            const open = document.querySelectorAll('#ndsMainNav .nds-dropdown[data-state~="open"]');
            let maxDuration = 0;
            open.forEach(dd => {
                if (dd !== except) {
                    this.toggle(dd, false);
                    const menu = dd.querySelector('.nds-dropdown-menu');
                    const content = menu?.querySelector('.nds-dropdown-content');
                    const isInMinimal = dd.closest('.nds-nav-minimal');
                    const isInPrimary = dd.closest('.nds-nav-primary');
                    // Primary uses height, secondary and minimal nav use content transform
                    const needsHeight = state.isMinimal && isInPrimary;
                    const animationTarget = isInMinimal ? (content || menu) : (needsHeight ? menu : (content || menu));
                    maxDuration = Math.max(maxDuration, state.getDuration(animationTarget));
                }
            });
            if (maxDuration > 0) {
                overflow.schedule('high');
            }
            return maxDuration;
        },

        toggle(el, open) {
            const menu = el.querySelector('.nds-dropdown-menu');
            const content = menu?.querySelector('.nds-dropdown-content');
            const navLink = el.querySelector('.nds-nav-link');
            const isInMinimal = el.closest('.nds-nav-minimal');
            const isInPrimary = el.closest('.nds-nav-primary');
            // Primary uses height, secondary and minimal nav use content transform
            const needsHeight = state.isMinimal && isInPrimary;

            const animationTarget = isInMinimal ? (content || menu) : (needsHeight ? menu : (content || menu));

            // Set active state on nav-link
            if (open) addState(navLink, 'active');
            else removeState(navLink, 'active');

            // Backdrop for nav dropdowns
            if (open) {
                showNavBackdrop('dropdown', () => {
                    document.querySelectorAll('#ndsMainNav .nds-dropdown[data-state~="open"]')
                        .forEach(d => dropdown.toggle(d, false));
                });
            }

            animate.run(el, open, {
                getMenu: () => animationTarget,
                needsHeight,
                // Block opening animations (including minimal nav dropdowns)
                blockWhileAnimating: open,
                onStart: () => overflow.schedule('high', 10),
                onComplete: () => {
                    if (!isInMinimal) updatePositions();
                    overflow.schedule('low', 100);

                    // Hide backdrop after last nav dropdown closes
                    if (!open) {
                        const stillOpen = document.querySelectorAll('#ndsMainNav .nds-dropdown[data-state~="open"]');
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

                // Show backdrop in minimal mode
                if (state.isMinimal) {
                    showNavBackdrop('navbar', () => {
                        if (hasState(DOM.collapse, 'open')) toggleNavbar();
                    });
                }

                animate.run(DOM.collapse, true, {
                    getMenu: () => state.isMinimal ? (collapseContent || DOM.collapse) : null,
                    onStart: () => {
                        if (state.isMinimal) overflow.schedule('high', 10);
                    },
                    onComplete: () => {
                        updatePositions();
                        overflow.schedule('low', 100);
                    }
                });
            } else {
                removeState(DOM.toggler, 'open');
                toggleButton?.setAttribute('aria-expanded', 'false');
                const closeDelay = state.reducedMotion ? 0 : dropdown.closeAll();

                // Hide backdrop when closing navbar (only if navbar owns it)
                hideNavBackdrop('navbar');

                afterDelay(closeDelay, () => {
                    animate.run(DOM.collapse, false, {
                        getMenu: () => state.isMinimal ? (collapseContent || DOM.collapse) : null,
                        onComplete: () => {
                            updatePositions();
                            overflow.schedule('low', 100);
                        }
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
                    DOM.dgaTab?.classList.toggle('expanded', !isOpen);
                },
                onComplete: () => {
                    updatePositions();
                    overflow.schedule();
                }
            });
        }
    };

    // ==============================================
    // HELPER FUNCTIONS
    // ==============================================
    function removeCollapseHidden() {
        if (DOM.collapse?.hasAttribute('hidden')) {
            DOM.collapse.removeAttribute('hidden');
        }
    }

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

            // In minimal mode, only check overflow when nav is open
            if (state.isMinimal && !hasState(DOM.collapse, 'open')) {
                DOM.primary.classList.remove('hasMore', 'atStart', 'atEnd');
                return;
            }

            const wasOverflowing = DOM.primary.classList.contains('hasMore');
            let hasOverflow = false;

            if (state.isMinimal) {
                // Minimal mode: check if primary nav exceeds its own maxHeight
                const primaryStyle = getComputedStyle(DOM.primary);
                const maxH = parseFloat(primaryStyle.maxHeight);
                const scrollHeight = DOM.primary.scrollHeight;

                // Skip check if element hasn't been laid out yet
                if (scrollHeight === 0) {
                    this.schedule('low', 50);
                    return;
                }

                if (isFinite(maxH) && maxH > 0) {
                    // Add 2px buffer to prevent hasMore from showing due to rounding errors
                    hasOverflow = scrollHeight > maxH + 2;
                }
            } else {
                // Desktop mode: check horizontal overflow
                const scrollWidth = DOM.primary.scrollWidth;
                const clientWidth = DOM.primary.clientWidth;

                // Skip check if element hasn't been laid out yet (both dimensions are 0)
                if (scrollWidth === 0 && clientWidth === 0) {
                    this.schedule('low', 50);
                    return;
                }

                // Simple check: does content overflow container?
                // Don't subtract button width - flexbox handles layout
                hasOverflow = scrollWidth > clientWidth;
            }

            // Remove hidden from collapse after primary nav settles (first check only)
            if (!this._initialCheckDone) {
                this._initialCheckDone = true;
                if (hasOverflow) {
                    // Has overflow: wait longer for layout to settle
                    setTimeout(() => removeCollapseHidden(), 500);
                } else {
                    // No overflow: still wait briefly to ensure layout has rendered
                    setTimeout(() => removeCollapseHidden(), 100);
                }
            }

            if (hasOverflow === wasOverflowing) return;

            DOM.primary.classList.toggle('hasMore', hasOverflow);

            // Update max-width to account for showMore button
            if (!state.isMinimal) {
                updateNavMaxWidth();
            }

            if (!hasOverflow) {
                DOM.primary.classList.remove('atStart', 'atEnd');
            } else {
                requestAnimationFrame(() => this.checkEnd());
            }
        },

        checkEnd() {
            if (!DOM.primary?.classList.contains('hasMore')) return;

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
            DOM.primary.classList.toggle('atStart', atStart);
            DOM.primary.classList.toggle('atEnd', atEnd);
        }
    };

    // ==============================================
    // LAYOUT UPDATES
    // ==============================================
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

        // Schedule overflow check after animations settle
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

        // Cheap pre-check: only recalculate if nav container width changed
        const container = DOM.container;
        const containerW = container?.offsetWidth || 0;
        if (containerW === _navMaxWidthLast) return;
        _navMaxWidthLast = containerW;

        const [navW, brandW, secW, minW] = getWidths(DOM.nav, DOM.brand, DOM.secondary, DOM.minimal);
        const showMoreW = DOM.showMore && DOM.primary?.classList.contains('hasMore') ? DOM.showMore.offsetWidth : 0;

        // Cache container padding/gap/visibleCount — only changes on resize
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
        const constraint = Math.min(navW, containerW || 1280);
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
            !c.classList.contains('showMore') && styles[idx + i]?.display !== 'none'
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
        const pabs = document.querySelectorAll('.nds-nav-item.PAB');
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

            const cta = Array.from(pabs).filter(p => p.classList.contains('CTA'));
            const rest = Array.from(pabs).filter(p => !p.classList.contains('CTA'));

            [...rest].reverse().forEach(p => minNav.prepend(p));
            [...cta].reverse().forEach(p => minNav.prepend(p));
        } else {
            pabs.forEach(item => {
                const pos = item.dataset.origPos;
                if (pos !== undefined) {
                    const ph = document.querySelector(`[data-pab-ph="${pos}"]`);
                    if (ph) {
                        ph.parentNode.insertBefore(item, ph);
                        ph.remove();
                    }
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
        const menu = dd.querySelector('.nds-dropdown-menu');
        const content = menu?.querySelector('.nds-dropdown-content');
        const isInMinimal = dd.closest('.nds-nav-minimal');
        const isInPrimary = dd.closest('.nds-nav-primary');
        // Primary uses height, secondary and minimal nav use content transform
        const needsHeight = state.isMinimal && isInPrimary;
        const animationTarget = isInMinimal ? (content || menu) : (needsHeight ? menu : (content || menu));
        const duration = state.getDuration(animationTarget);

        // If animation in progress, queue the action
        if (state.isAnimating) {
            animate.queue('dropdown', event);
            return;
        }

        // Cancel any pending delayed toggle action (prevents stale opens)
        cancelToggleAction();

        // If closing, allow
        if (isOpen) {
            dropdown.toggle(dd, false);
            if (isInPrimary && hasState(DOM.collapse, 'open')) {
                afterDelay(duration, updatePositions);
            }
            return;
        }

        // Opening a dropdown - close others first
        const closeDelay = dropdown.closeAll(dd);

        const open = () => {
            // Only reset animation state if no active animations
            // This prevents resetting while minimal nav dropdowns are still animating
            if (animate._activeCount === 0) {
                state.isAnimating = false;
            }

            dropdown.toggle(dd, true);
            if (isInPrimary && hasState(DOM.collapse, 'open')) {
                afterDelay(duration * 0.1, updatePositions);
            }
        };

        // Handle special cases for minimal mode
        if (isInMinimal && state.isMinimal) {
            let delay = 0;

            if (hasState(DOM.collapse, 'open')) {
                // Transfer backdrop from navbar → dropdown before closing navbar (prevents flicker)
                showNavBackdrop('dropdown', () => {
                    document.querySelectorAll('.nds-nav-minimal .nds-dropdown[data-state~="open"]')
                        .forEach(d => dropdown.toggle(d, false));
                });

                // Get navbar close duration (includes dropdowns + collapse)
                const dropdownCloseDelay = state.reducedMotion ? 0 : dropdown.closeAll();
                const collapseContent = DOM.collapse?.querySelector('.nds-collapse-content');
                const collapseDuration = state.getDuration(collapseContent || DOM.collapse);
                // Total time is dropdown animations + collapse animation
                const totalNavbarDuration = dropdownCloseDelay + collapseDuration;

                navbar.toggle(false);
                delay = Math.max(delay, totalNavbarDuration * 1.2);
            } else {
                // Only wait for other minimal nav dropdowns if collapse not open
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
        if (state.isAnimating) {
            animate.queue('navbar');
            return;
        }

        cancelToggleAction();

        const isOpen = hasState(DOM.collapse, 'open');
        const collapseContent = DOM.collapse?.querySelector('.nds-collapse-content');
        // Always read duration from content wrapper since transition is on .nds-collapse-content
        const duration = state.getDuration(collapseContent || DOM.collapse);

        if (!isOpen) {
            const minimalDropdowns = document.querySelectorAll('.nds-nav-minimal .nds-dropdown[data-state~="open"]');
            if (minimalDropdowns.length) {
                // Transfer backdrop from dropdown → navbar before closing dropdowns (prevents flicker)
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
            const openDropdowns = document.querySelectorAll('.nds-dropdown[data-state~="open"]');
            if (openDropdowns.length) {
                const firstDropdown = openDropdowns[0];
                const menu = firstDropdown.querySelector('.nds-dropdown-menu');
                const content = menu?.querySelector('.nds-dropdown-content');
                const isInMinimal = firstDropdown.closest('.nds-nav-minimal');
                const isInPrimary = firstDropdown.closest('.nds-nav-primary');
                // Primary uses height, secondary and minimal nav use content transform
                const needsHeight = state.isMinimal && isInPrimary;
                const animationTarget = isInMinimal ? (content || menu) : (needsHeight ? menu : (content || menu));
                const ddDuration = state.getDuration(animationTarget);
                openDropdowns.forEach(d => dropdown.toggle(d, false));
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

        const { clientX: x, clientY: y } = event;
        const buffer = state.css.safeZone;

        // Close DGA if click outside
        if (hasState(DOM.dgaDigitalStamp, 'open')) {
            if (isOutside(x, y, [DOM.dgaTab, DOM.dgaDigitalStamp], buffer)) {
                toggleDGA();
            }
        }

        // Close navbar if click outside
        if (DOM.toggler && hasState(DOM.collapse, 'open')) {
            const elements = [DOM.collapse, DOM.toggler];

            if (state.isMinimal) {
                DOM.collapse?.querySelectorAll('.nds-nav-secondary .nds-dropdown[data-state~="open"] .nds-dropdown-menu')
                    .forEach(m => { if (!m.closest('.nds-nav-minimal')) elements.push(m); });
            }

            if (isOutside(x, y, elements, buffer)) {
                toggleNavbar();
            }
        }

        // Close dropdowns if click outside
        document.querySelectorAll('#ndsMainNav .nds-dropdown[data-state~="open"]').forEach(dd => {
            if (hasState(dd, 'closing')) return;

            const menu = dd.querySelector('.nds-dropdown-menu');
            if (isOutside(x, y, [dd, menu].filter(Boolean), buffer)) {
                const needsRecalc = (dd.closest('.nds-nav-primary') || dd.closest('.nds-nav-secondary')) &&
                    hasState(DOM.collapse, 'open');
                dropdown.toggle(dd, false);
                if (needsRecalc) {
                    afterDelay(state.getDuration(menu), updatePositions);
                }
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

                if (hasState(DOM.dgaDigitalStamp, 'open')) {
                    dga.toggle();
                }

                // Close navbar and backdrop on mode change
                if (hasState(DOM.collapse, 'open')) {
                    _navBackdropOwner = 'navbar'; // Ensure navbar.toggle(false) can clean up
                    cancelToggleAction();
                    navbar.toggle(false);
                    return;
                }

                // Handle case where only dropdowns had backdrop (no collapse open)
                if (_navBackdropOwner) {
                    _navBackdropOwner = null;
                    cancelToggleAction();
                    if (window.NDSBackdrop && NDSBackdrop.isActive()) {
                        window.NDSBackdrop.hide();
                    }
                }
            }

            if (hasState(DOM.collapse, 'open') && !hasState(DOM.collapse, 'closing')) {
                updatePositions();
            }

            // Only check toggler visibility when width/mode/nav items changed
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

        // Show More button click
        // Button is now outside .nds-nav-primary, listen on parent container
        const clickTarget = DOM.collapseContent || DOM.primary;
        clickTarget.addEventListener('click', (e) => {
            const showMore = e.target.closest('.nds-nav-item.showMore');
            if (!showMore) return;

            e.preventDefault();
            e.stopPropagation();

            const atEnd = DOM.primary.classList.contains('atEnd');
            const amount = (state.isMinimal ? DOM.primary.clientHeight : DOM.primary.clientWidth) * 0.8;

            if (state.isMinimal) {
                DOM.primary.scrollTo({ top: atEnd ? 0 : DOM.primary.scrollTop + amount, behavior: 'smooth' });
            } else {
                const dir = state.css.isRTL ? -1 : 1;
                DOM.primary.scrollTo({ left: atEnd ? 0 : DOM.primary.scrollLeft + amount * dir, behavior: 'smooth' });
            }

            setTimeout(() => overflow.checkEnd(), 300);
        });

        // Scroll handling
        const onScroll = throttle(() => {
            if (state.isMinimal && !hasState(DOM.collapse, 'open')) return;
            overflow.checkEnd();
        }, 32);
        DOM.primary.addEventListener('scroll', onScroll, { passive: true });

        if ('onscrollend' in DOM.primary) {
            DOM.primary.addEventListener('scrollend', () => {
                if (state.isMinimal && !hasState(DOM.collapse, 'open')) return;
                setTimeout(() => overflow.checkEnd(), 10);
            });
        }

        // Wheel scroll conversion (vertical to horizontal)
        DOM.primary.style.scrollBehavior = 'smooth';
        let scrolling = false;

        DOM.primary.addEventListener('wheel', (e) => {
            if (state.isMouseOverDropdown || state.isMinimal ||
                Math.abs(e.deltaX) >= Math.abs(e.deltaY) ||
                !DOM.primary.classList.contains('hasMore')) return;

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
                const ease = 1 - Math.pow(1 - p, 3);
                DOM.primary.scrollLeft = start + delta * ease;

                if (p < 1) requestAnimationFrame(step);
                else {
                    scrolling = false;
                    DOM.primary.style.scrollBehavior = 'smooth';
                }
            };
            requestAnimationFrame(step);
        }, { passive: false });

        // Drag scrolling — listeners added only during active drag
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
            if (state.isMinimal || !DOM.primary.classList.contains('hasMore')) return;
            drag = { active: true, startX: e.pageX, scrollLeft: DOM.primary.scrollLeft };
            Object.assign(DOM.primary.style, { cursor: 'grabbing', userSelect: 'none', scrollBehavior: 'auto' });
            e.preventDefault();
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('mouseup', dragUp);
        });

        // Dropdown hover tracking
        const trackDropdowns = () => {
            document.querySelectorAll('.nds-dropdown-menu').forEach(menu => {
                menu.addEventListener('mouseenter', () => state.isMouseOverDropdown = true);
                menu.addEventListener('mouseleave', () => state.isMouseOverDropdown = false);
            });
        };
        trackDropdowns();

        // Watch for new dropdown menus
        const trackDD = NDS.debounce(() => trackDropdowns(), 150);
        NDS.onDOMAdd('.nds-dropdown-menu', trackDD);
        NDS.onDOMRemove('.nds-dropdown-menu', trackDD);
    }

    function setupEventListeners() {
        NDS.onResize(() => {
            state.invalidateCache();
            scheduleUpdate();
        });
        window.addEventListener('orientationchange', () => {
            state.invalidateCache();
            setTimeout(scheduleUpdate, 150);
        }, { passive: true });

        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-toggle="dropdown"]')) toggleDropdown(e);
            if (e.target.closest('[data-toggle="navbar"]')) { e.preventDefault(); toggleNavbar(); }
        });

        DOM.collapse?.addEventListener('transitionend', (e) => {
            if (e.target === DOM.collapse && e.propertyName === 'height') {
                scheduleUpdate();
            }
        });

        // Watch for nav item changes
        const navChanged = NDS.debounce(() => { state._navChanged = true; scheduleUpdate(); }, 100);
        NDS.onDOMAdd('.nds-nav-item, .nds-dropdown', navChanged);
        NDS.onDOMRemove('.nds-nav-item, .nds-dropdown', navChanged);

        // Watch for element resizes (with significance threshold)
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

        [DOM.nav, DOM.primary].filter(Boolean).forEach(el => NDS.onElementResize(el, navResizeHandler));
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================
    function init() {
        if (!DOM.collapse) return;

        updateBodyClass();
        setupEventListeners();
        document.addEventListener('click', handleDocumentClick);

        managePABPlacement();
        DOM.dgaTab?.addEventListener('click', toggleDGA);

        if (hasState(DOM.collapse, 'open')) {
            updatePositions();
        }

        setupInteractions();

        // Defer initial layout measurements to after first paint
        state._initDone = false;
        requestAnimationFrame(() => {
            updateNavMaxWidth();
            state._initDone = true;
        });

        // If no primary nav, remove hidden immediately (no layout to settle)
        if (!DOM.primary) {
            removeCollapseHidden();
        } else {
            // Fallback: ensure hidden is removed even if overflow check doesn't fire
            setTimeout(() => removeCollapseHidden(), 2000);
        }

        // Recalculate after icon font loads
        if (typeof window.waitForFontFile === 'function') {
            window.waitForFontFile('hgi-stroke-rounded', (loaded) => {
                if (loaded) {
                    setTimeout(() => {
                        state.invalidateCache();
                        _navMaxWidthLast = 0; // Reset cache to force recalc
                        scheduleUpdate();
                    }, 100);
                }
            });
        }
    }

    // Keep reduced-motion preference in sync
    try {
        const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
        mql?.addEventListener?.('change', (e) => { state.reducedMotion = !!e.matches; });
        mql?.addListener?.((e) => { state.reducedMotion = !!e.matches; }); // Safari fallback
    } catch { }

    // Expose public API
    Object.assign(window, { toggleNavbar, toggleDropdown, toggleDGA });
    window.NDSNavController = { init };

})();
