// NDS Navigation - Optimized & Event-Driven with Centralized checkOverflow Management
(() => {
    'use strict';

    // Global constants - CSS custom property reader with fallback
    const getSafeZonePixels = () => {
        const cssValue = getComputedStyle(document.documentElement).getPropertyValue('--nds-dropdown-safeZone').trim();
        return cssValue ? parseInt(cssValue, 10) : 40;
    };

    // Cached DOM elements
    const DOM = {
        nav: document.getElementById('ndsMainNav'),
        dgaTab: document.querySelector('.dga-tab'),
        topbar: document.querySelector('.nds-topbar'),
        dgaContent: document.querySelector('.dga-content'),
        _cache: {},

        get collapse() { return this._cache.collapse ??= this.nav?.querySelector('#ndsNavCollapse'); },
        get container() { return this._cache.container ??= this.nav?.querySelector('.nds-nav-container'); },
        get primary() { return this._cache.primary ??= this.nav?.querySelector('.nds-nav-primary'); },
        get secondary() { return this._cache.secondary ??= this.nav?.querySelector('.nds-nav-secondary'); },
        get minimal() { return this._cache.minimal ??= this.nav?.querySelector('.nds-nav-minimal'); },
        get toggler() { return this._cache.toggler ??= this.nav?.querySelector('.nds-mainNav-toggler'); },
        get brand() { return this._cache.brand ??= this.nav?.querySelector('.nds-brand'); },
        get navItems() { return this.primary?.querySelectorAll('.nds-nav-item:not(.showMore)') || []; }
    };

    // State management
    const state = {
        windowWidth: window.innerWidth,
        isMouseOverDropdown: false,
        _cache: {},
        _pendingUpdate: null,
        _pendingOverflowCheck: null,

        get isMinimal() { 
            // Use cached breakpoint or fallback for synchronous access
            const bp = this._cache.breakpoint || 960;
            return this.windowWidth <= bp;
        },

        async initProperties() {
            await this.waitForCSS();
            // Pre-populate all cached properties
            this.getBreakpoint();
            this.getNavHeight();
            this.getItemHeight();
            this.getTransitionSpeed();
        },

        waitForCSS() {
            return new Promise(resolve => {
                const check = () => {
                    const value = getComputedStyle(document.documentElement)
                        .getPropertyValue('--nds-minimal-nav-bp');
                    if (value && value.trim() !== '') {
                        resolve();
                    } else {
                        requestAnimationFrame(check);
                    }
                };
                check();
            });
        },

        getCSSProperty(propertyName, fallback, parseAsNumber = true) {
            const value = getComputedStyle(document.documentElement)
                .getPropertyValue(propertyName).trim();
            
            if (!value) return fallback;
            
            return parseAsNumber ? (parseFloat(value) || fallback) : value;
        },

        getBreakpoint() {
            return this._cache.breakpoint ??= this.getCSSProperty('--nds-minimal-nav-bp', 768);
        },

        getNavHeight() {
            return this._cache.navHeight ??= this.getCSSProperty('--nds-nav-height', 72);
        },

        getItemHeight() {
            return this._cache.itemHeight ??= this.getCSSProperty('--nds-minimal-nav-item-height', 
                Math.max(40, this.getNavHeight() / 2));
        },

        getTransitionSpeed() {
            return this._cache.speed ??= (this.getCSSProperty('--nds-transition-speed', 0.3) * 1000);
        },

        reset() { this._cache = {}; DOM._cache = {}; }
    };

    // Centralized overflow check manager
    const overflowManager = {
        scheduleCheck(reason = 'unknown', useMinimalDelay = null) {
            // Cancel any pending check
            if (state._pendingOverflowCheck) {
                clearTimeout(state._pendingOverflowCheck);
                state._pendingOverflowCheck = null;
            }

            // Determine delay based on context
            let delay = 10; // Default immediate check
            
            if (useMinimalDelay === true || (useMinimalDelay === null && state.isMinimal)) {
                // Only use longer delay in minimal mode for animation-related checks
                if (reason.includes('animation') || reason.includes('transition') || reason.includes('dropdown')) {
                    delay = state.getTransitionSpeed() + 100;
                }
            }

            state._pendingOverflowCheck = setTimeout(() => {
                state._pendingOverflowCheck = null;
                this.performCheck();
            }, delay);
        },

        performCheck() {
            if (!DOM.primary) return;

            if (state.isMinimal && !DOM.collapse?.classList.contains('show')) return;

            let hasOverflow = false;
            const epsilon = 2;

            if (state.isMinimal) {
                if (!DOM.collapse) return;

                const collapseStyles = getComputedStyle(DOM.collapse);
                const maxHeight = parseFloat(collapseStyles.maxHeight);

                if (!isFinite(maxHeight) || maxHeight <= 0) {
                    hasOverflow = false;
                } else {
                    const primaryScrollHeight = DOM.primary.scrollHeight;
                    const secondaryHeight = DOM.secondary?.offsetHeight || 0;
                    const totalContentHeight = primaryScrollHeight + secondaryHeight;

                    hasOverflow = totalContentHeight > (maxHeight + epsilon);

                    if (hasOverflow) {
                        hasOverflow = DOM.primary.scrollHeight > DOM.primary.clientHeight;
                    }
                }
            } else {
                const realItems = DOM.primary.querySelectorAll('.nds-nav-item:not(.showMore)');
                const availableWidth = DOM.primary.clientWidth;
                let realContentWidth = 0;

                realItems.forEach(item => {
                    realContentWidth += utils.getElementWidth(item);
                });

                if (realItems.length > 1) {
                    const styles = getComputedStyle(DOM.primary);
                    const gap = parseFloat(styles.gap || styles.columnGap || 0);
                    if (!isNaN(gap) && gap > 0) {
                        realContentWidth += gap * (realItems.length - 1);
                    }
                }

                hasOverflow = realContentWidth > (availableWidth + epsilon);

                if (hasOverflow) {
                    hasOverflow = DOM.primary.scrollWidth > DOM.primary.clientWidth;
                }
            }

            DOM.primary.classList.toggle('hasMore', hasOverflow);
            if (!hasOverflow) {
                DOM.primary.classList.remove('atEnd');
            } else {
                setTimeout(() => utils.checkScrollEnd(), 10);
            }
        }
    };

    // Utilities
    const utils = {
        debounce: (fn, ms) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); }; },
        throttle: (fn, ms) => { let wait; return (...args) => { if (!wait) { fn(...args); wait = true; setTimeout(() => wait = false, ms); } }; },


        // COMPACT DROPDOWN CLOSER
        dropdownCloser: {
            getOpen: (type = 'all') => {
                const selectors = {
                    primary: '.nds-nav-primary .nds-dropdown.show',
                    secondary: '.nds-nav-secondary .nds-dropdown.show', 
                    minimal: '.nds-nav-minimal .nds-dropdown.show',
                    all: '#ndsMainNav .nds-dropdown.show'
                };
                return DOM.collapse ? Array.from(DOM.collapse.querySelectorAll(selectors[type])) : [];
            },

            closeSingle: (dropdown, recalcHeight = false) => {
                animateDropdown(dropdown, false);
                if (recalcHeight && DOM.collapse?.classList.contains('show')) {
                    setTimeout(() => updatePositions(), state.getTransitionSpeed());
                }
            },

            closeAll: () => {
                const openDropdowns = utils.dropdownCloser.getOpen('all');
                if (openDropdowns.length === 0) return 0;
                
                // Since only one dropdown can be open at a time, just close it
                const dropdown = openDropdowns[0];
                utils.dropdownCloser.closeSingle(dropdown, true);
                return state.getTransitionSpeed();
            },

            hasOpen: (type = 'all') => utils.dropdownCloser.getOpen(type).length > 0
        },

        updateBodyClass() {
            const shouldBeMinimal = state.isMinimal;
            const isCurrentlyMinimal = document.body.classList.contains('minimal');

            if (shouldBeMinimal !== isCurrentlyMinimal) {
                document.body.classList.toggle('minimal', shouldBeMinimal);

                if (!shouldBeMinimal && isCurrentlyMinimal && DOM.collapse) {
                    DOM.collapse.style.height = 'var(--nds-nav-height)';
                }

                this.manageCTAPlacement();
                this.managePABPlacement();
                return true;
            }
            return false;
        },

        manageCTAPlacement() {
            const ctaItem = document.querySelector('.nds-nav-item.CTA');
            if (!ctaItem) return;

            const isSecondaryVisible = DOM.secondary && getComputedStyle(DOM.secondary).display !== 'none';
            if (!isSecondaryVisible) return;

            if (state.isMinimal) {
                let minimalNav = DOM.nav?.querySelector('.nds-nav-minimal');

                if (!minimalNav) {
                    minimalNav = document.createElement('nav');
                    minimalNav.className = 'nds-nav-minimal';

                    if (DOM.nav?.firstChild) {
                        DOM.nav.insertBefore(minimalNav, DOM.nav.firstChild);
                    } else {
                        DOM.nav?.appendChild(minimalNav);
                    }
                }

                if (ctaItem.parentElement !== minimalNav) {
                    const existingPlaceholder = document.querySelector('.nds-cta-placeholder[data-placeholder="cta-position"]');
                    if (!existingPlaceholder && ctaItem.parentElement === DOM.secondary) {
                        const placeholder = document.createElement('li');
                        placeholder.className = 'nds-cta-placeholder';
                        placeholder.style.display = 'none';
                        placeholder.setAttribute('data-placeholder', 'cta-position');
                        ctaItem.parentElement.insertBefore(placeholder, ctaItem);
                    }

                    minimalNav.insertBefore(ctaItem, minimalNav.firstChild);
                }
            } else {
                const placeholder = document.querySelector('.nds-cta-placeholder[data-placeholder="cta-position"]');

                if (placeholder && DOM.secondary && ctaItem.parentElement !== DOM.secondary) {
                    placeholder.parentElement.insertBefore(ctaItem, placeholder);
                    placeholder.remove();
                } else if (DOM.secondary && ctaItem.parentElement !== DOM.secondary) {
                    DOM.secondary.appendChild(ctaItem);
                }

                const minimalNav = DOM.nav?.querySelector('.nds-nav-minimal');
                if (minimalNav && minimalNav.children.length === 0 && !minimalNav.hasAttribute('data-keep')) {
                    minimalNav.remove();
                }
            }
        },

        managePABPlacement() {
            const pabItems = document.querySelectorAll('.nds-nav-item.PAB');
            if (!pabItems.length) return;

            const isSecondaryVisible = DOM.secondary && getComputedStyle(DOM.secondary).display !== 'none';
            if (!isSecondaryVisible) return;

            if (state.isMinimal) {
                let minimalNav = DOM.nav?.querySelector('.nds-nav-minimal');

                if (!minimalNav) {
                    minimalNav = document.createElement('nav');
                    minimalNav.className = 'nds-nav-minimal';

                    if (DOM.nav?.firstChild) {
                        DOM.nav.insertBefore(minimalNav, DOM.nav.firstChild);
                    } else {
                        DOM.nav?.appendChild(minimalNav);
                    }
                }

                // Create placeholders first, then move items in order
                pabItems.forEach((pabItem, index) => {
                    if (pabItem.parentElement !== minimalNav) {
                        const existingPlaceholder = document.querySelector(`.nds-pab-placeholder[data-placeholder="pab-position-${index}"]`);
                        if (!existingPlaceholder && pabItem.parentElement === DOM.secondary) {
                            const placeholder = document.createElement('li');
                            placeholder.className = 'nds-pab-placeholder';
                            placeholder.style.display = 'none';
                            placeholder.setAttribute('data-placeholder', `pab-position-${index}`);
                            pabItem.parentElement.insertBefore(placeholder, pabItem);
                        }
                    }
                });

                // Find insertion point once
                const ctaItems = minimalNav.querySelectorAll('.nds-nav-item.CTA');
                let insertAfter = ctaItems.length > 0 ? ctaItems[ctaItems.length - 1] : null;

                // Move PAB items in order to preserve their sequence
                pabItems.forEach((pabItem) => {
                    if (pabItem.parentElement !== minimalNav) {
                        if (insertAfter) {
                            // Insert after the reference element
                            minimalNav.insertBefore(pabItem, insertAfter.nextSibling);
                        } else {
                            // No CTA items, insert at the beginning
                            minimalNav.insertBefore(pabItem, minimalNav.firstChild);
                        }
                        // Update reference for next PAB item
                        insertAfter = pabItem;
                    }
                });
            } else {
                pabItems.forEach((pabItem, index) => {
                    const placeholder = document.querySelector(`.nds-pab-placeholder[data-placeholder="pab-position-${index}"]`);

                    if (placeholder && DOM.secondary && pabItem.parentElement !== DOM.secondary) {
                        placeholder.parentElement.insertBefore(pabItem, placeholder);
                        placeholder.remove();
                    } else if (DOM.secondary && pabItem.parentElement !== DOM.secondary) {
                        DOM.secondary.appendChild(pabItem);
                    }
                });

                const minimalNav = DOM.nav?.querySelector('.nds-nav-minimal');
                if (minimalNav && minimalNav.children.length === 0 && !minimalNav.hasAttribute('data-keep')) {
                    minimalNav.remove();
                }
            }
        },

        getElementWidth(el) {
            if (!el) return 0;
            const rect = el.getBoundingClientRect();
            const styles = getComputedStyle(el);
            return rect.width + parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
        },




        toggleAnimations(enable, duration = 100) {
            const transition = enable ? '' : 'none';
            const elements = document.querySelectorAll('#ndsNavCollapse .nds-dropdown-menu');

            elements.forEach(menu => {
                const inSecondary = menu.closest('.nds-nav-secondary');

                if (!inSecondary || (state.isMinimal && DOM.collapse?.classList.contains('show'))) {
                    menu.style.transition = transition;
                }
            });

            if (DOM.secondary && state.isMinimal && DOM.collapse?.classList.contains('show')) {
                DOM.secondary.style.transition = transition;
            }

            if (!enable) {
                setTimeout(() => this.toggleAnimations(true), duration);
            }
        },

        checkScrollEnd() {
            if (!DOM.primary?.classList.contains('hasMore')) return;

            let atEnd = false;
            if (state.isMinimal) {
                const { scrollTop, scrollHeight, clientHeight } = DOM.primary;
                atEnd = scrollTop + clientHeight >= scrollHeight - 1;
            } else {
                const { scrollLeft, scrollWidth, clientWidth } = DOM.primary;
                const maxScroll = scrollWidth - clientWidth;
                atEnd = maxScroll <= 1 || Math.abs(scrollLeft) >= maxScroll - 2;
            }

            DOM.primary.classList.toggle('atEnd', atEnd);
        },

        updateNavMaxWidth() {
            if (!DOM.primary || !DOM.nav) return;

            if (state.isMinimal) {
                DOM.primary.style.maxWidth = '';
                overflowManager.scheduleCheck('nav-max-width-minimal');
                return;
            }

            const container = DOM.container;
            let padding = 0;
            let gap = 0;

            if (container) {
                const styles = getComputedStyle(container);
                padding = parseFloat(styles.paddingLeft || 0) + parseFloat(styles.paddingRight || 0);
                gap = parseFloat(styles.gap || styles.columnGap || 0);
                if (isNaN(gap)) gap = 0;
            }

            const navWidth = this.getElementWidth(DOM.nav);
            const maxWidth = state.getCSSProperty('--nds-content-MaxWidth', navWidth);
            const constraint = Math.min(navWidth, maxWidth);

            const visibleChildren = container ? Array.from(container.children).filter(child =>
                getComputedStyle(child).display !== 'none'
            ) : [];
            const gapCount = Math.max(0, visibleChildren.length - 1);

            const used = this.getElementWidth(DOM.brand) +
                this.getElementWidth(DOM.secondary) +
                this.getElementWidth(DOM.minimal) +
                padding +
                (gap * gapCount);

            const available = constraint - used;
            DOM.primary.style.maxWidth = available > 0 ? `${available}px` : '';
            overflowManager.scheduleCheck('nav-max-width-desktop');
        },

        scheduleUpdate(reason = 'unknown') {
            if (state._pendingUpdate) return;

            state._pendingUpdate = requestAnimationFrame(() => {
                state._pendingUpdate = null;

                const measurements = {
                    windowWidth: window.innerWidth,
                    bodyClassChanged: this.updateBodyClass(),
                    topbarRect: DOM.topbar?.getBoundingClientRect(),
                    timestamp: performance.now()
                };

                if (measurements.windowWidth !== state.windowWidth) {
                    state.windowWidth = measurements.windowWidth;
                    state.reset();

                    if (!state.isMinimal && DOM.collapse) {
                        DOM.collapse.style.height = 'var(--nds-nav-height)';
                    }
                }

                this.updateNavMaxWidth();

                if (DOM.collapse?.classList.contains('show') && !DOM.collapse?.classList.contains('closing')) {
                    updatePositions();
                } else {
                    if (DOM.collapse) {
                        DOM.collapse.style.height = state.isMinimal ? '0px' : 'var(--nds-nav-height)';
                    }
                }

    
                this.checkTogglerVisibility();

            });
        },

        setupInteractions() {
            if (!DOM.primary) return;

            DOM.primary.addEventListener('click', (e) => {
                const showMore = e.target.closest('.nds-nav-item.showMore');
                if (!showMore) return;
                
                // Only handle showMore within this navigation container
                if (!DOM.primary.contains(showMore)) return;

                e.preventDefault();
                e.stopPropagation();

                const isAtEnd = DOM.primary.classList.contains('atEnd');
                const scrollAmount = (state.isMinimal ? DOM.primary.clientHeight : DOM.primary.clientWidth) * 0.8;

                if (state.isMinimal) {
                    DOM.primary.scrollTo({ top: isAtEnd ? 0 : DOM.primary.scrollTop + scrollAmount, behavior: 'smooth' });
                } else {
                    const isRTL = getComputedStyle(document.documentElement).direction === 'rtl';
                    const left = isAtEnd ? 0 : (isRTL ? DOM.primary.scrollLeft - scrollAmount : DOM.primary.scrollLeft + scrollAmount);
                    DOM.primary.scrollTo({ left, behavior: 'smooth' });
                }

                setTimeout(() => this.checkScrollEnd(), 300);
            });

            const scrollHandler = this.throttle(() => this.checkScrollEnd(), 16);
            DOM.primary.addEventListener('scroll', scrollHandler);

            if ('onscrollend' in DOM.primary) {
                DOM.primary.addEventListener('scrollend', () => setTimeout(() => this.checkScrollEnd(), 10));
            }

            DOM.primary.style.scrollBehavior = 'smooth';
            let isScrolling = false;

            DOM.primary.addEventListener('wheel', (e) => {
                if (state.isMouseOverDropdown || state.isMinimal || Math.abs(e.deltaX) >= Math.abs(e.deltaY) || !DOM.primary.classList.contains('hasMore')) return;

                e.preventDefault();
                if (isScrolling) return;

                isScrolling = true;
                DOM.primary.style.scrollBehavior = 'auto';

                const startScroll = DOM.primary.scrollLeft;
                // Check RTL direction for proper scroll direction
                const isRTL = document.documentElement.dir === 'rtl';
                const scrollMultiplier = isRTL ? -0.8 : 0.8;
                const scrollAmount = e.deltaY * scrollMultiplier;
                let frame = 0;

                const animate = () => {
                    frame += 16;
                    const progress = Math.min(frame / 150, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);

                    DOM.primary.scrollLeft = startScroll + (scrollAmount * easeOut);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        isScrolling = false;
                        DOM.primary.style.scrollBehavior = 'smooth';
                    }
                };
                requestAnimationFrame(animate);
            }, { passive: false });

            let dragState = { active: false, startX: 0, scrollLeft: 0 };

            DOM.primary.addEventListener('mousedown', (e) => {
                if (state.isMinimal || !DOM.primary.classList.contains('hasMore')) return;

                dragState = { active: true, startX: e.pageX, scrollLeft: DOM.primary.scrollLeft };
                Object.assign(DOM.primary.style, { cursor: 'grabbing', userSelect: 'none', scrollBehavior: 'auto' });
                e.preventDefault();
            });

            const handleMouseUp = () => {
                if (dragState.active) {
                    dragState.active = false;
                    Object.assign(DOM.primary.style, { cursor: '', userSelect: '', scrollBehavior: 'smooth' });
                }
            };

            const handleMouseMove = (e) => {
                if (!dragState.active || state.isMinimal) return;
                e.preventDefault();
                DOM.primary.scrollLeft = dragState.scrollLeft - (e.pageX - dragState.startX);
            };

            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);

            const setupDropdownTracking = () => {
                document.querySelectorAll('.nds-dropdown-menu').forEach(menu => {
                    menu.addEventListener('mouseenter', () => state.isMouseOverDropdown = true);
                    menu.addEventListener('mouseleave', () => state.isMouseOverDropdown = false);
                });
            };

            setupDropdownTracking();

            if (typeof MutationObserver !== 'undefined') {
                new MutationObserver((mutations) => {
                    if (mutations.some(m => [...m.addedNodes, ...m.removedNodes].some(n =>
                        n.nodeType === 1 && (n.classList?.contains('nds-dropdown-menu') || n.querySelector?.('.nds-dropdown-menu'))))) {
                        setupDropdownTracking();
                    }
                }).observe(document.body, { childList: true, subtree: true });
            }
        },

        createSafeZone(elements, buffer = 40) {
            if (!elements.length) return null;

            const rects = elements.map(el => el.getBoundingClientRect()).filter(rect =>
                rect.width > 0 && rect.height > 0
            );

            if (!rects.length) return null;

            const left = Math.min(...rects.map(r => r.left)) - buffer;
            const right = Math.max(...rects.map(r => r.right)) + buffer;
            const top = Math.min(...rects.map(r => r.top)) - buffer;
            const bottom = Math.max(...rects.map(r => r.bottom)) + buffer;

            return { left, right, top, bottom };
        },

        isClickInSafeZone(clickX, clickY, safeZone) {
            if (!safeZone) return false;
            return clickX >= safeZone.left && clickX <= safeZone.right &&
                clickY >= safeZone.top && clickY <= safeZone.bottom;
        },

        checkTogglerVisibility() {
            if (!DOM.toggler) return;

            const hasVisiblePrimary = DOM.primary && getComputedStyle(DOM.primary).display !== 'none' && DOM.primary.children.length > 0;
            const hasVisibleSecondary = DOM.secondary && getComputedStyle(DOM.secondary).display !== 'none' && DOM.secondary.children.length > 0;

            const shouldShowToggler = hasVisiblePrimary || hasVisibleSecondary;

            DOM.toggler.style.display = shouldShowToggler ? '' : 'none';
        }
    };

    function setupEventListeners() {
        const handleResize = utils.debounce(() => {
            utils.scheduleUpdate('resize');
        }, 100);

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', () => {
            setTimeout(() => utils.scheduleUpdate('orientation'), 100);
        });

        document.addEventListener('click', (e) => {
            const dropdownToggle = e.target.closest('[data-toggle="dropdown"]');
            const navbarToggle = e.target.closest('[data-toggle="navbar"]');

            if (dropdownToggle) {
                toggleDropdown(e);
            }

            if (navbarToggle) {
                e.preventDefault();
                toggleNavbar();
            }
        });

        if (DOM.collapse) {
            DOM.collapse.addEventListener('transitionend', (e) => {
                if (e.target === DOM.collapse && e.propertyName === 'height') {
                    utils.scheduleUpdate('collapse-transition');
                }
            });
        }


        if (typeof MutationObserver !== 'undefined') {
            const observer = new MutationObserver(utils.debounce((mutations) => {
                const relevantChanges = mutations.some(m =>
                    [...m.addedNodes, ...m.removedNodes].some(n =>
                        n.nodeType === 1 && (
                            n.classList?.contains('nds-nav-item') ||
                            n.classList?.contains('nds-dropdown') ||
                            n.querySelector?.('.nds-nav-item, .nds-dropdown')
                        )
                    )
                );

                if (relevantChanges) {
                    utils.scheduleUpdate('dom-mutation');
                }
            }, 50));

            if (DOM.nav) {
                observer.observe(DOM.nav, { childList: true, subtree: true });
            }
        }

        if (typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(utils.debounce(() => {
                utils.scheduleUpdate('element-resize');
            }, 50));

            [DOM.nav, DOM.brand, DOM.secondary, DOM.primary].filter(Boolean).forEach(el => {
                resizeObserver.observe(el);
            });
        }
    }

    function calculateDropdownSpeed(menu, baseSpeed, isMinimal, isInSecondary) {
        if (isMinimal && !isInSecondary && !menu.closest('.nds-nav-minimal')) {
            const menuHeight = menu.scrollHeight;
            const heightMultiplier = 1 + (menuHeight * 0.002);
            return Math.min(baseSpeed * heightMultiplier, baseSpeed * 2);
        }
        return baseSpeed;
    }

    function applyDropdownTransition(menu, speed, isMinimal, isInSecondary) {
        if (isMinimal && !isInSecondary && !menu.closest('.nds-nav-minimal')) {
            const transitionEffect = state.getCSSProperty('--nds-transition-effect', 'ease-in-out', false);
            menu.style.transition = `height ${speed}ms ${transitionEffect}`;
        } else {
            menu.style.transition = '';
        }
    }

    function updatePositions() {
        const isOpen = DOM.collapse?.classList.contains('show');
        const isClosing = DOM.collapse?.classList.contains('closing');

        if (!state.isMinimal || !isOpen || isClosing) {
            if (!state.isMinimal && DOM.secondary) {
                DOM.secondary.style.cssText = '';
                DOM.secondary.classList.remove('closing');
            }
            if ((!isOpen || isClosing) && DOM.collapse) {
                DOM.collapse.style.height = state.isMinimal ? '0px' : 'var(--nds-nav-height)';
            }
            return;
        }

        const isPrimaryVisible = DOM.primary && getComputedStyle(DOM.primary).display !== 'none';
        const items = isPrimaryVisible ? DOM.navItems : [];
        const itemHeight = state.getItemHeight();
        let totalHeight = items.length * itemHeight + Math.max(0, items.length - 2);

        const isSecondaryVisible = DOM.secondary && getComputedStyle(DOM.secondary).display !== 'none';
        if (isSecondaryVisible) {
            totalHeight += DOM.secondary.offsetHeight + 1;
        }

        if (isPrimaryVisible) {
            DOM.primary?.querySelectorAll('.nds-dropdown.show .nds-dropdown-menu').forEach(menu => {
                totalHeight += parseInt(menu.style.height || menu.scrollHeight || 0);
            });
        }

        DOM.collapse.style.height = `${totalHeight}px`;

        if (state.isMinimal) {
            setTimeout(() => {
                const actualHeight = DOM.collapse.offsetHeight;
                const maxHeight = parseFloat(getComputedStyle(DOM.collapse).maxHeight) || Infinity;
                DOM.collapse._effectiveMaxHeight = Math.min(actualHeight, maxHeight);
                overflowManager.scheduleCheck('update-positions-minimal');
            }, state.getTransitionSpeed() + 50);
        }


    }

    function animateDropdown(dropdown, open) {
        const menu = dropdown.querySelector('.nds-dropdown-menu');
        const baseSpeed = state.getTransitionSpeed();
        const isInSecondary = dropdown.closest('.nds-nav-secondary');
        const isInMinimal = dropdown.closest('.nds-nav-minimal');

        if (open) {
            dropdown.classList.add('show');

            const speed = isInMinimal ? baseSpeed : calculateDropdownSpeed(menu, baseSpeed, state.isMinimal, isInSecondary);

            if (!isInMinimal) {
                applyDropdownTransition(menu, speed, state.isMinimal, isInSecondary);
            }

            menu.style.height = `${menu.scrollHeight}px`;


            setTimeout(() => {
                if (!isInMinimal) {
                    updatePositions();
                    }
    
                overflowManager.scheduleCheck('dropdown-open-animation');
            }, speed * 0.04);
        } else {
            const speed = isInMinimal ? baseSpeed : calculateDropdownSpeed(menu, baseSpeed, state.isMinimal, isInSecondary);

            if (!isInMinimal) {
                applyDropdownTransition(menu, speed, state.isMinimal, isInSecondary);
            }

            menu.style.height = '0px';

            if (!isInMinimal) {
                updatePositions();
            }

            setTimeout(() => {
                dropdown.classList.remove('show');

                if (!isInMinimal && state.isMinimal && !isInSecondary) {
                    menu.style.transition = '';
                }

                overflowManager.scheduleCheck('dropdown-close-animation');
            }, speed);
        }
    }

    function animateNavbar(open) {
        const DURATION = state.getTransitionSpeed();

        if (open) {
            DOM.collapse?.classList.add('show');
            DOM.collapse?.classList.remove('closing');
            DOM.toggler?.classList.add('active');

            // Set opacity for secondary nav when opening in minimal mode
            if (DOM.secondary && state.isMinimal) {
                DOM.secondary.style.opacity = '1';
            }

            const isPrimaryVisible = DOM.primary && getComputedStyle(DOM.primary).display !== 'none';
            const isSecondaryVisible = DOM.secondary && getComputedStyle(DOM.secondary).display !== 'none';

            const items = isPrimaryVisible ? DOM.navItems : [];
            const itemHeight = state.isMinimal ? state.getItemHeight() : state.getNavHeight();
            let totalHeight = items.length * itemHeight + Math.max(0, items.length - 2);

            if (isSecondaryVisible) {
                totalHeight += (DOM.secondary?.offsetHeight || 0) + 1;
            }

            DOM.collapse.style.height = `${totalHeight}px`;

            if (state.isMinimal) {
                setTimeout(() => {
                    const actualHeight = DOM.collapse.offsetHeight;
                    const maxHeight = parseFloat(getComputedStyle(DOM.collapse).maxHeight) || Infinity;
                    DOM.collapse._effectiveMaxHeight = Math.min(actualHeight, maxHeight);
                    overflowManager.scheduleCheck('navbar-open-animation');
                }, DURATION + 50);

                overflowManager.scheduleCheck('navbar-open-minimal', true);
            }

            setTimeout(() => {
                updatePositions();
                }, DURATION * 0.04);
        } else {
            DOM.toggler?.classList.remove('active');
            
            const totalDelay = utils.dropdownCloser.closeAll();

            // Set opacity for secondary nav after secondary dropdown animations finish
            if (DOM.secondary && state.isMinimal) {
                setTimeout(() => {
                    DOM.secondary.style.opacity = '0';
                }, totalDelay);
            }

            // Only add closing class after dropdowns start closing
            setTimeout(() => {
                DOM.collapse?.classList.add('closing');
            }, totalDelay > 0 ? 50 : 0);

            setTimeout(() => {
                DOM.collapse.style.height = '0px';
    
                setTimeout(() => {
                    DOM.collapse?.classList.remove('show');
                    DOM.collapse?.classList.remove('closing');
                    overflowManager.scheduleCheck('navbar-close');
                    
                    if (DOM.secondary) {
                        DOM.secondary.style.cssText = '';
                    }
                }, DURATION);
            }, totalDelay);
        }
    }

    function performDGAToggle() {
        if (!DOM.topbar || !DOM.dgaContent) return;

        const DURATION = state.getTransitionSpeed();
        DOM.dgaContent.classList.add('dga-expanding');
        setTimeout(() => DOM.dgaContent.classList.remove('dga-expanding'), DURATION);

        DOM.dgaContent.classList.toggle('dga-expanded');

        const isExpanded = DOM.dgaContent.classList.contains('dga-expanded');
        DOM.dgaTab?.setAttribute('aria-expanded', isExpanded);
        DOM.dgaTab?.classList.toggle('expanded', isExpanded);
        DOM.dgaContent.style.height = DOM.dgaContent.classList.contains('dga-expanded') ?
            `${DOM.dgaContent.scrollHeight}px` : '0px';

        setTimeout(() => {
            updatePositions();
            overflowManager.scheduleCheck('dga-toggle');
        }, DURATION);
    }

    function toggleNavbar() {
        const isOpen = DOM.collapse?.classList.contains('show');
        const DURATION = state.getTransitionSpeed();

        if (!isOpen) {
            const minimal = utils.dropdownCloser.getOpen('minimal');
            
            if (minimal.length > 0) {
                minimal.forEach(d => utils.dropdownCloser.closeSingle(d));
                
                setTimeout(() => {
                    if (DOM.dgaContent?.classList.contains('dga-expanded')) {
                        toggleDGA();
                        setTimeout(() => {
                            animateNavbar(true, false);
                        }, DURATION);
                    } else {
                        animateNavbar(true, false);
                    }
                }, DURATION);
                return;
            }
        }

        if (DOM.dgaContent?.classList.contains('dga-expanded')) {
            toggleDGA();
            setTimeout(() => {
                const hasAnyOpenDropdowns = utils.dropdownCloser.hasOpen();
                animateNavbar(!isOpen, isOpen && hasAnyOpenDropdowns);
            }, DURATION);
        } else {
            const hasAnyOpenDropdowns = utils.dropdownCloser.hasOpen();
            animateNavbar(!isOpen, isOpen && hasAnyOpenDropdowns);
        }
    }

    function toggleDropdown(event) {
        event.preventDefault();
        const dropdown = event.target.closest('.nds-dropdown');
        if (!dropdown) return;

        const isOpen = dropdown.classList.contains('show');
        const openDropdowns = document.querySelectorAll('.nds-dropdown.show');
        const DURATION = state.getTransitionSpeed();
        const isInMinimal = dropdown.closest('.nds-nav-minimal');
        const isInPrimary = dropdown.closest('.nds-nav-primary');

        if (isOpen) {
            utils.dropdownCloser.closeSingle(dropdown, isInPrimary && DOM.collapse?.classList.contains('show'));
        } else {
            const closeOthers = () => {
                let maxCloseDelay = 0;
                openDropdowns.forEach(dd => {
                    if (dd !== dropdown) {
                        utils.dropdownCloser.closeSingle(dd);
                        maxCloseDelay = Math.max(maxCloseDelay, DURATION);
                    }
                });
                return maxCloseDelay;
            };

            if (isInMinimal && state.isMinimal) {
                let totalDelay = 0;
                
                if (DOM.collapse?.classList.contains('show')) {
                    const hasOpenSecondary = utils.dropdownCloser.hasOpen('secondary');
                    animateNavbar(false, hasOpenSecondary);
                    totalDelay = Math.max(totalDelay, hasOpenSecondary ? DURATION * 2.2 : DURATION * 1.2);
                }
                
                if (DOM.dgaContent?.classList.contains('dga-expanded')) {
                    performDGAToggle();
                    totalDelay = Math.max(totalDelay, DURATION);
                }
                
                const closeDelay = closeOthers();
                totalDelay = Math.max(totalDelay, closeDelay);
                
                setTimeout(() => animateDropdown(dropdown, true), totalDelay);
            }
            else if (!state.isMinimal && DOM.dgaContent?.classList.contains('dga-expanded')) {
                toggleDGA();
                setTimeout(() => {
                    const closeDelay = closeOthers();
                    setTimeout(() => {
                        animateDropdown(dropdown, true);
                        
                        if (isInPrimary && DOM.collapse?.classList.contains('show')) {
                            setTimeout(() => updatePositions(), DURATION * 0.1);
                        }
                    }, closeDelay > 0 ? closeDelay : 0);
                }, DURATION);
            } else {
                const closeDelay = closeOthers();
                setTimeout(() => {
                    animateDropdown(dropdown, true);
                    
                    if (isInPrimary && DOM.collapse?.classList.contains('show')) {
                        setTimeout(() => updatePositions(), DURATION * 0.1);
                    }
                }, closeDelay > 0 ? closeDelay : 0);
            }
        }
    }

    function toggleDGA() {
        const openDropdowns = document.querySelectorAll('.nds-dropdown.show');
        const DURATION = state.getTransitionSpeed();

        if (DOM.collapse?.classList.contains('show')) {
            const hasOpenSecondary = utils.dropdownCloser.hasOpen('secondary');

            let navbarCloseDelay;
            if (hasOpenSecondary) {
                navbarCloseDelay = DURATION + (DURATION * 0.2) + DURATION;
            } else {
                navbarCloseDelay = (DURATION * 0.2) + DURATION;
            }

            animateNavbar(false, hasOpenSecondary);
            setTimeout(performDGAToggle, navbarCloseDelay + 50);

        } else if (openDropdowns.length > 0) {
            openDropdowns.forEach(dropdown => animateDropdown(dropdown, false));
            setTimeout(performDGAToggle, DURATION);
        } else {
            performDGAToggle();
        }
    }

    const handleDocumentClick = (event) => {
        const clickX = event.clientX;
        const clickY = event.clientY;
        const safeRange = getSafeZonePixels();

        if (DOM.dgaContent?.classList.contains('dga-expanded') && DOM.dgaContent &&
            !DOM.dgaTab?.contains(event.target) && !DOM.dgaContent.contains(event.target)) {

            const dgaElements = [DOM.dgaTab, DOM.dgaContent].filter(Boolean);
            const dgaSafeZone = utils.createSafeZone(dgaElements, safeRange);

            if (dgaSafeZone && !utils.isClickInSafeZone(clickX, clickY, dgaSafeZone)) {
                toggleDGA();
            }
        }

        if (DOM.toggler && DOM.collapse?.classList.contains('show') &&
            !DOM.collapse.contains(event.target) && !DOM.toggler.contains(event.target)) {

            const navElements = [DOM.collapse, DOM.toggler].filter(Boolean);

            if (state.isMinimal) {
                const openSecondaryMenus = DOM.collapse?.querySelectorAll('.nds-nav-secondary .nds-dropdown.show .nds-dropdown-menu');
                openSecondaryMenus?.forEach(menu => {
                    if (!menu.closest('.nds-nav-minimal')) {
                        navElements.push(menu);
                    }
                });
            }

            const navSafeZone = utils.createSafeZone(navElements, safeRange);

            if (navSafeZone && !utils.isClickInSafeZone(clickX, clickY, navSafeZone)) {
                const hasOpenSecondary = utils.dropdownCloser.hasOpen('secondary');
                animateNavbar(false, hasOpenSecondary);
            }
        }

        if (!event.target.closest('.nds-dropdown')) {
            const openDropdowns = document.querySelectorAll('#ndsMainNav .nds-dropdown.show');

            let shouldCloseDropdowns = true;

            openDropdowns.forEach(dropdown => {
                const dropdownElements = [dropdown];
                const menu = dropdown.querySelector('.nds-dropdown-menu');

                if (menu && menu.getBoundingClientRect().width > 0) {
                    dropdownElements.push(menu);
                }

                const dropdownSafeZone = utils.createSafeZone(dropdownElements, safeRange);

                if (dropdownSafeZone && utils.isClickInSafeZone(clickX, clickY, dropdownSafeZone)) {
                    shouldCloseDropdowns = false;
                }
            });

            if (shouldCloseDropdowns) {
                openDropdowns.forEach(dropdown => {
                    const isSecondaryDropdown = dropdown.closest('.nds-nav-secondary');
                    const isPrimaryDropdown = dropdown.closest('.nds-nav-primary');

                    if ((isPrimaryDropdown || isSecondaryDropdown) && DOM.collapse?.classList.contains('show')) {
                        return;
                    }

                    const needsRecalc = (isPrimaryDropdown || isSecondaryDropdown) 
                        && DOM.collapse?.classList.contains('show');
                    utils.dropdownCloser.closeSingle(dropdown, needsRecalc);
                });
            }
        }
    };

    let currentScrollHandler;
    let lastTopbarVisible = null;

    const createScrollHandler = (throttleMs) => {
        return utils.throttle(() => {
            const hasMinimalNavDropdowns = document.querySelector('.nds-nav-minimal .nds-dropdown.show');

            if (state.isMinimal && !DOM.collapse?.classList.contains('show') && !hasMinimalNavDropdowns) return;

            if (!state.isMinimal && !document.querySelector('.nds-nav-primary .nds-dropdown.show, .nds-nav-secondary .nds-dropdown.show') && !hasMinimalNavDropdowns) return;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    utils.toggleAnimations(false, 50);

                    updatePositions();
                            });
            });
        }, throttleMs);
    };

    const handleScroll = () => {
        const topbarVisible = DOM.topbar ? DOM.topbar.getBoundingClientRect().bottom > 0 : false;

        if (lastTopbarVisible !== topbarVisible) {
            lastTopbarVisible = topbarVisible;

            if (currentScrollHandler) {
                window.removeEventListener('scroll', currentScrollHandler);
            }

            currentScrollHandler = createScrollHandler(topbarVisible ? 8 : 1000);
            window.addEventListener('scroll', currentScrollHandler, { passive: true });
        }

        if (currentScrollHandler) currentScrollHandler();
    };

    const handleResizeImmediate = () => {
        const currentWidth = window.innerWidth;
        if (currentWidth === state.windowWidth) return;

        state.windowWidth = currentWidth;

        if (state.isMinimal) {
            if (DOM.collapse?.classList.contains('show')) {
                toggleNavbar();
            }
        } else {
            document.querySelectorAll('.nds-dropdown.show').forEach(dropdown => {
                if (!dropdown.closest('.nds-nav-minimal')) {
                    animateDropdown(dropdown, false);
                }
            });
        }

        document.querySelectorAll('.nds-nav-minimal .nds-dropdown.show').forEach(dropdown => {
            animateDropdown(dropdown, false);
        });

        if (DOM.dgaContent?.classList.contains('dga-expanded')) {
            performDGAToggle();
        }
    };

    async function init() {
        if (!DOM.collapse) return;

        // Initialize all CSS properties
        await state.initProperties();

        utils.updateBodyClass();
        utils.manageCTAPlacement();
        utils.managePABPlacement();

        setupEventListeners();

        document.addEventListener('click', handleDocumentClick);
        window.addEventListener('resize', handleResizeImmediate);
        window.addEventListener('scroll', handleScroll, { passive: true });
        DOM.dgaTab?.addEventListener('click', toggleDGA);

        handleScroll();

        if (DOM.collapse?.classList.contains('show')) {
            updatePositions();
        } else {
            DOM.collapse.style.height = state.isMinimal ? '0px' : 'var(--nds-nav-height)';
        }
        
        utils.updateNavMaxWidth();
        utils.setupInteractions();


        utils.checkTogglerVisibility();

        Object.assign(window, { toggleNavbar, toggleDropdown, toggleDGA });

    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();