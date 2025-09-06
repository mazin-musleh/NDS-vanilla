// NDS Navigation Controller - Simplified
(() => {
    'use strict';

    // DOM elements
    const DOM = {
        nav: document.getElementById('ndsMainNav'),
        dgaTab: document.querySelector('.dga-tab'),
        topbar: document.querySelector('.nds-topbar'),
        dgaContent: document.querySelector('.dga-content'),
        
        get collapse() { return this.nav?.querySelector('#ndsNavCollapse'); },
        get container() { return this.nav?.querySelector('.nds-nav-container'); },
        get primary() { return this.nav?.querySelector('.nds-nav-primary'); },
        get secondary() { return this.nav?.querySelector('.nds-nav-secondary'); },
        get minimal() { return this.nav?.querySelector('.nds-nav-minimal'); },
        get toggler() { return this.nav?.querySelector('.nds-mainNav-toggler'); },
        get brand() { return this.nav?.querySelector('.nds-brand'); },
        get navItems() { return this.primary?.querySelectorAll('.nds-nav-item:not(.showMore)') || []; }
    };

    // Simple state
    const state = {
        windowWidth: window.innerWidth,
        isMouseOverDropdown: false,
        pendingUpdate: null,
        pendingOverflowCheck: null,
        pendingDropdownAction: null,
        pendingNavbarAction: null,
        isAnimatingMenu: false,

        get minimalMode() {
            const breakpoint = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nds-minimal-nav-bp')) || 768;
            return this.windowWidth <= breakpoint;
        },

        getNavHeight() {
            return parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nds-nav-height')) || 72;
        },

        getTransitionSpeed() {
            const speed = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nds-transition-speed')) || 0.3;
            return speed * 1000;
        },

        getElementDuration(element) {
            if (!element) return 0;
            const transition = parseFloat(getComputedStyle(element).transitionDuration) || 0;
            return transition > 0 ? this.getTransitionSpeed() : 0;
        },

        getDropdownDuration(dropdown) {
            if (!dropdown) return 0;
            const menu = dropdown.querySelector('.nds-dropdown-menu');
            return this.getElementDuration(menu);
        }
    };

    // Refined overflow checking with priority and debouncing
    function scheduleOverflowCheck(priority = 'normal', delay = 50) {
        if (state.pendingOverflowCheck) {
            clearTimeout(state.pendingOverflowCheck);
        }
        
        // Immediate check for high priority calls
        if (priority === 'immediate') {
            state.pendingOverflowCheck = null;
            checkOverflow();
            return;
        }
        
        // Use different delays based on priority
        const actualDelay = priority === 'high' ? 10 : 
                          priority === 'low' ? 100 : delay;
        
        state.pendingOverflowCheck = setTimeout(() => {
            state.pendingOverflowCheck = null;
            checkOverflow();
        }, actualDelay);
    }

    function checkOverflow() {
        if (!DOM.primary) return;

        if (state.minimalMode && !DOM.collapse?.classList.contains('show')) {
            // Clean up overflow state when minimal nav is closed
            DOM.primary.classList.remove('hasMore', 'atEnd');
            return;
        }

        // Cache the previous state to avoid unnecessary DOM updates
        const wasOverflowing = DOM.primary.classList.contains('hasMore');
        let hasOverflow = false;

        if (state.minimalMode) {
            if (DOM.collapse) {
                // Use cached maxHeight if available, otherwise compute and cache
                let maxHeight = DOM.collapse._cachedMaxHeight;
                if (maxHeight === undefined) {
                    maxHeight = parseFloat(getComputedStyle(DOM.collapse).maxHeight);
                    DOM.collapse._cachedMaxHeight = maxHeight;
                }
                
                if (isFinite(maxHeight) && maxHeight > 0) {
                    // Batch DOM reads for better performance
                    const primaryHeight = DOM.primary.scrollHeight;
                    const secondaryHeight = DOM.secondary?.offsetHeight || 0;
                    hasOverflow = (primaryHeight + secondaryHeight) > maxHeight;
                }
            }
        } else {
            // Cache dimensions for better performance
            const scrollWidth = DOM.primary._cachedScrollWidth ?? DOM.primary.scrollWidth;
            const clientWidth = DOM.primary._cachedClientWidth ?? DOM.primary.clientWidth;
            
            // Cache values briefly to avoid repeated measurements
            DOM.primary._cachedScrollWidth = scrollWidth;
            DOM.primary._cachedClientWidth = clientWidth;
            
            hasOverflow = scrollWidth > clientWidth;
        }

        // Early return if state hasn't changed
        if (hasOverflow === wasOverflowing) return;
        
        DOM.primary.classList.toggle('hasMore', hasOverflow);
        
        if (!hasOverflow) {
            DOM.primary.classList.remove('atEnd');
        } else {
            // Schedule scroll end check with a small delay to ensure proper state
            setTimeout(() => utils.checkScrollEnd(), 10);
        }
    }

    // Utilities
    const utils = {
        debounce: (fn, ms) => { let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); }; },
        throttle: (fn, ms) => { let wait; return (...args) => { if (!wait) { fn(...args); wait = true; setTimeout(() => wait = false, ms); } }; },

        closeAllDropdowns() {
            const openDropdowns = document.querySelectorAll('#ndsMainNav .nds-dropdown.show');
            if (openDropdowns.length === 0) return 0;
            
            const firstDropdown = openDropdowns[0];
            const duration = state.getDropdownDuration(firstDropdown);
            
            openDropdowns.forEach(dropdown => animateDropdown(dropdown, false));
            return duration;
        },

        updateBodyClass() {
            const shouldBeMinimal = state.minimalMode;
            const isCurrentlyMinimal = document.body.classList.contains('minimal');

            if (shouldBeMinimal !== isCurrentlyMinimal) {
                document.body.classList.toggle('minimal', shouldBeMinimal);

                // Clear all cached dimensions when switching modes
                if (DOM.collapse) {
                    delete DOM.collapse._cachedMaxHeight;
                }
                if (DOM.primary) {
                    delete DOM.primary._cachedScrollWidth;
                    delete DOM.primary._cachedClientWidth;
                }

                this.managePABPlacement();
                return true;
            }
            return false;
        },

        managePABPlacement() {
            const pabItems = document.querySelectorAll('.nds-nav-item.PAB');
            if (!pabItems.length) return;

            if (state.minimalMode) {
                // Store original positions before moving
                pabItems.forEach((item, index) => {
                    if (!item.dataset.originalPosition) {
                        const placeholder = document.createElement('span');
                        placeholder.style.display = 'none';
                        placeholder.dataset.pabPlaceholder = index;
                        item.parentNode.insertBefore(placeholder, item);
                        item.dataset.originalPosition = index;
                    }
                });

                let minimalNav = DOM.nav?.querySelector('.nds-nav-minimal');
                if (!minimalNav) {
                    minimalNav = document.createElement('nav');
                    minimalNav.className = 'nds-nav-minimal';
                    DOM.nav?.insertBefore(minimalNav, DOM.nav.firstChild);
                }

                // Move CTA.PAB items first, then regular PAB items (in reverse order for prepend)
                const ctaPabItems = Array.from(pabItems).filter(item => item.classList.contains('CTA'));
                const pabOnlyItems = Array.from(pabItems).filter(item => !item.classList.contains('CTA'));
                
                // Prepend in reverse order so they appear in correct order
                [...pabOnlyItems].reverse().forEach(item => minimalNav.prepend(item));
                [...ctaPabItems].reverse().forEach(item => minimalNav.prepend(item));
            } else {
                // Restore items to their original positions
                pabItems.forEach(item => {
                    const position = item.dataset.originalPosition;
                    if (position !== undefined) {
                        const placeholder = document.querySelector(`[data-pab-placeholder="${position}"]`);
                        if (placeholder) {
                            placeholder.parentNode.insertBefore(item, placeholder);
                            placeholder.remove();
                        }
                        delete item.dataset.originalPosition;
                    }
                });

                // Clean up empty minimal nav
                const minimalNav = DOM.nav?.querySelector('.nds-nav-minimal');
                if (minimalNav && !minimalNav.children.length) {
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

        checkScrollEnd() {
            if (!DOM.primary?.classList.contains('hasMore')) return;

            let atEnd = false;
            if (state.minimalMode) {
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

            if (state.minimalMode) {
                DOM.primary.style.maxWidth = '';
                scheduleOverflowCheck('immediate');
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
            const maxWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nds-content-MaxWidth')) || navWidth;
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
            
            // Clear cached dimensions when width changes
            if (DOM.primary) {
                delete DOM.primary._cachedScrollWidth;
                delete DOM.primary._cachedClientWidth;
            }
            
            scheduleOverflowCheck('immediate');
        },

        scheduleUpdate() {
            if (state.pendingUpdate) return;

            state.pendingUpdate = requestAnimationFrame(() => {
                state.pendingUpdate = null;

                const measurements = {
                    windowWidth: window.innerWidth,
                    topbarRect: DOM.topbar?.getBoundingClientRect(),
                    timestamp: performance.now()
                };

                const widthChanged = measurements.windowWidth !== state.windowWidth;
                if (widthChanged) {
                    state.windowWidth = measurements.windowWidth;
                }

                measurements.bodyClassChanged = this.updateBodyClass();

                this.updateNavMaxWidth();

                // Handle mode transitions and cleanup
                if (measurements.bodyClassChanged || widthChanged) {
                    // Close open dropdowns when switching modes
                    document.querySelectorAll('.nds-dropdown.show').forEach(dropdown => {
                        animateDropdown(dropdown, false);
                    });

                    // Close DGA if expanded
                    if (DOM.dgaContent?.classList.contains('dga-expanded')) {
                        performDGAToggle();
                    }

                    // In minimal mode with open nav during resize, close it
                    if (state.minimalMode && DOM.collapse?.classList.contains('show') && widthChanged) {
                        animateNavbar(false);
                        return; // Skip updatePositions since we're closing
                    }
                }

                if (DOM.collapse?.classList.contains('show') && !DOM.collapse?.classList.contains('closing')) {
                    updatePositions();
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
                const scrollAmount = (state.minimalMode ? DOM.primary.clientHeight : DOM.primary.clientWidth) * 0.8;

                if (state.minimalMode) {
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
                if (state.isMouseOverDropdown || state.minimalMode || Math.abs(e.deltaX) >= Math.abs(e.deltaY) || !DOM.primary.classList.contains('hasMore')) return;

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
                if (state.minimalMode || !DOM.primary.classList.contains('hasMore')) return;

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
                if (!dragState.active || state.minimalMode) return;
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

        isClickOutsideWithBuffer(clickX, clickY, elements, buffer = 40) {
            return !elements.some(element => {
                if (!element) return false;
                
                const rect = element.getBoundingClientRect();
                return clickX >= rect.left - buffer && 
                       clickX <= rect.right + buffer &&
                       clickY >= rect.top - buffer && 
                       clickY <= rect.bottom + buffer;
            });
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


    function updatePositions() {
        const isOpen = DOM.collapse?.classList.contains('show');
        const isClosing = DOM.collapse?.classList.contains('closing');

        if (!state.minimalMode || !isOpen || isClosing) {
            if (!state.minimalMode && DOM.secondary) {
                DOM.secondary.style.cssText = '';
                DOM.secondary.classList.remove('closing');
            }
            if ((!isOpen || isClosing) && DOM.collapse) {
                // DOM.collapse.style.height = state.minimalMode ? '0px' : `${state.getNavHeight()}px`;
            }
            return;
        }

        // Note: Height calculations only used for overflow checking now

        if (state.minimalMode) {
            const duration = state.getElementDuration(DOM.collapse);
            setTimeout(() => {
                const actualHeight = DOM.collapse.offsetHeight;
                const maxHeight = parseFloat(getComputedStyle(DOM.collapse).maxHeight) || Infinity;
                DOM.collapse._effectiveMaxHeight = Math.min(actualHeight, maxHeight);
                scheduleOverflowCheck();
            }, duration + 50);
        }


    }

    function animateDropdown(dropdown, open) {
        // If flag is already set and this is an opening animation, block it
        if (state.isAnimatingMenu && open) {
            return;
        }
        
        // Set global animation flag to prevent any other menu actions
        if (!state.isAnimatingMenu) {
            state.isAnimatingMenu = true;
        }
        
        const menu = dropdown.querySelector('.nds-dropdown-menu');
        const duration = state.getDropdownDuration(dropdown);
        const isInMinimal = dropdown.closest('.nds-nav-minimal');

        if (open) {
            dropdown.classList.add('show');
            dropdown.classList.remove('closing');
            dropdown.classList.remove('opened');
            
            // Only set height for primary/secondary nav dropdowns in minimal mode
            if (state.minimalMode && (dropdown.closest('.nds-nav-primary') || dropdown.closest('.nds-nav-secondary'))) {
                if (menu) menu.style.height = `${menu.scrollHeight}px`;
            }

            // Check overflow at animation start - high priority for immediate feedback
            scheduleOverflowCheck('high');

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    dropdown.classList.add('opening');
                });
            });

            setTimeout(() => {
                dropdown.classList.remove('opening');
                dropdown.classList.add('opened');
                if (!isInMinimal) {
                    updatePositions();
                }
                state.isAnimatingMenu = false;
                processAllPendingActions();
            }, duration);
        } else {
            dropdown.classList.add('closing');
            dropdown.classList.remove('opened');
            
            // Only set height for primary/secondary nav dropdowns in minimal mode
            if (state.minimalMode && (dropdown.closest('.nds-nav-primary') || dropdown.closest('.nds-nav-secondary'))) {
                menu.style.height = '0px';
            }

            // Check overflow at animation start - high priority for immediate feedback
            scheduleOverflowCheck('high');
            
            // Additional overflow check after DOM changes settle - low priority
            setTimeout(() => scheduleOverflowCheck('low'), 50);

            if (!isInMinimal) {
                updatePositions();
            }

            setTimeout(() => {
                dropdown.classList.remove('show');
                dropdown.classList.remove('closing');
                state.isAnimatingMenu = false;
                processAllPendingActions();
            }, duration);
        }
    }

    function animateNavbar(open) {
        // Set global animation flag to prevent any other menu actions
        state.isAnimatingMenu = true;
        
        const duration = state.getElementDuration(DOM.collapse);

        if (open) {
            DOM.collapse?.classList.add('show');
            DOM.collapse?.classList.remove('closing');
            DOM.collapse?.classList.remove('opened');
            DOM.toggler?.classList.add('active');

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    DOM.collapse?.classList.add('opening');
                });
            });


            if (state.minimalMode) {
                setTimeout(() => {
                    const actualHeight = DOM.collapse.offsetHeight;
                    const maxHeight = parseFloat(getComputedStyle(DOM.collapse).maxHeight) || Infinity;
                    DOM.collapse._effectiveMaxHeight = Math.min(actualHeight, maxHeight);
                    scheduleOverflowCheck();
                }, duration + 50);

                scheduleOverflowCheck();
            }

            setTimeout(() => {
                DOM.collapse?.classList.remove('opening');
                DOM.collapse?.classList.add('opened');
                updatePositions();
                state.isAnimatingMenu = false;
                processAllPendingActions();
            }, duration);
        } else {
            DOM.toggler?.classList.remove('active');
            
            const totalDelay = utils.closeAllDropdowns();


            // Only add closing class after dropdowns start closing
            setTimeout(() => {
                DOM.collapse?.classList.add('closing');
                DOM.collapse?.classList.remove('opened');
            }, totalDelay > 0 ? 50 : 0);

            setTimeout(() => {
                DOM.collapse?.classList.remove('show');
                DOM.collapse?.classList.remove('closing');
                scheduleOverflowCheck();
                
                state.isAnimatingMenu = false;
                processAllPendingActions();
            }, totalDelay + duration);
        }
    }

    function performDGAToggle() {
        if (!DOM.topbar || !DOM.dgaContent) return;

        const duration = state.getElementDuration(DOM.dgaContent);
        DOM.dgaContent.classList.add('dga-expanding');
        
        setTimeout(() => DOM.dgaContent.classList.remove('dga-expanding'), duration);

        DOM.dgaContent.classList.toggle('dga-expanded');

        const isExpanded = DOM.dgaContent.classList.contains('dga-expanded');
        DOM.dgaTab?.setAttribute('aria-expanded', isExpanded);
        DOM.dgaTab?.classList.toggle('expanded', isExpanded);
        DOM.dgaContent.style.height = DOM.dgaContent.classList.contains('dga-expanded') ?
            `${DOM.dgaContent.scrollHeight}px` : '0px';

        setTimeout(() => {
            updatePositions();
            scheduleOverflowCheck();
        }, duration);
    }

    function toggleNavbar() {
        // Block any action if any menu is currently animating
        if (state.isAnimatingMenu) {
            // Only queue if no action is already pending
            if (!state.pendingNavbarAction) {
                state.pendingNavbarAction = true;
            }
            return;
        }

        const isOpen = DOM.collapse?.classList.contains('show');
        const duration = state.getElementDuration(DOM.collapse);

        if (!isOpen) {
            const minimal = document.querySelectorAll('.nds-nav-minimal .nds-dropdown.show');
            
            if (minimal.length > 0) {
                minimal.forEach(d => animateDropdown(d, false));
                
                setTimeout(() => {
                    if (DOM.dgaContent?.classList.contains('dga-expanded')) {
                        toggleDGA();
                        setTimeout(() => {
                            animateNavbar(true, false);
                        }, duration);
                    } else {
                        animateNavbar(true, false);
                    }
                }, duration);
                return;
            }
        }

        if (DOM.dgaContent?.classList.contains('dga-expanded')) {
            toggleDGA();
            setTimeout(() => {
                const hasAnyOpenDropdowns = document.querySelectorAll('#ndsMainNav .nds-dropdown.show').length > 0;
                animateNavbar(!isOpen, isOpen && hasAnyOpenDropdowns);
            }, duration);
        } else {
            const hasAnyOpenDropdowns = document.querySelectorAll('#ndsMainNav .nds-dropdown.show').length > 0;
            animateNavbar(!isOpen, isOpen && hasAnyOpenDropdowns);
        }
    }

    function processPendingDropdownAction() {
        if (state.pendingDropdownAction) {
            const { event } = state.pendingDropdownAction;
            state.pendingDropdownAction = null;
            toggleDropdown(event);
        }
    }

    function processPendingNavbarAction() {
        if (state.pendingNavbarAction) {
            state.pendingNavbarAction = null;
            toggleNavbar();
        }
    }

    function processAllPendingActions() {
        processPendingDropdownAction();
        processPendingNavbarAction();
    }

    function toggleDropdown(event) {
        event.preventDefault();
        const dropdown = event.target.closest('.nds-dropdown');
        if (!dropdown) return;

        // Block any action if any menu is currently animating
        if (state.isAnimatingMenu) {
            // Only queue if no action is already pending - prevents multiple fast clicks
            if (!state.pendingDropdownAction) {
                state.pendingDropdownAction = { event, dropdown };
            }
            return;
        }

        const isOpen = dropdown.classList.contains('show');
        const openDropdowns = document.querySelectorAll('.nds-dropdown.show');
        const duration = state.getDropdownDuration(dropdown);
        const isInMinimal = dropdown.closest('.nds-nav-minimal');
        const isInPrimary = dropdown.closest('.nds-nav-primary');
        

        if (isOpen) {
            animateDropdown(dropdown, false);
            if (isInPrimary && DOM.collapse?.classList.contains('show')) {
                setTimeout(() => updatePositions(), duration);
            }
        } else {
            const closeOthers = () => {
                let maxCloseDelay = 0;
                openDropdowns.forEach(dd => {
                    if (dd !== dropdown) {
                        animateDropdown(dd, false);
                        maxCloseDelay = Math.max(maxCloseDelay, duration);
                    }
                });
                // Ensure overflow check happens when closing other dropdowns - high priority
                if (maxCloseDelay > 0) {
                    scheduleOverflowCheck('high');
                }
                return maxCloseDelay;
            };

            if (isInMinimal && state.minimalMode) {
                let totalDelay = 0;
                
                if (DOM.collapse?.classList.contains('show')) {
                    const hasOpenSecondary = document.querySelectorAll('.nds-nav-secondary .nds-dropdown.show').length > 0;
                    animateNavbar(false, hasOpenSecondary);
                    totalDelay = Math.max(totalDelay, hasOpenSecondary ? duration * 2.2 : duration * 1.2);
                }
                
                if (DOM.dgaContent?.classList.contains('dga-expanded')) {
                    performDGAToggle();
                    totalDelay = Math.max(totalDelay, duration);
                }
                
                const closeDelay = closeOthers();
                totalDelay = Math.max(totalDelay, closeDelay);
                
                setTimeout(() => animateDropdown(dropdown, true), totalDelay);
            }
            else if (!state.minimalMode && DOM.dgaContent?.classList.contains('dga-expanded')) {
                toggleDGA();
                setTimeout(() => {
                    const closeDelay = closeOthers();
                    setTimeout(() => {
                        animateDropdown(dropdown, true);
                        
                        if (isInPrimary && DOM.collapse?.classList.contains('show')) {
                            setTimeout(() => updatePositions(), duration * 0.1);
                        }
                    }, closeDelay > 0 ? closeDelay : 0);
                }, duration);
            } else {
                const closeDelay = closeOthers();
                setTimeout(() => {
                    animateDropdown(dropdown, true);
                    
                    if (isInPrimary && DOM.collapse?.classList.contains('show')) {
                        setTimeout(() => updatePositions(), duration * 0.1);
                    }
                }, closeDelay > 0 ? closeDelay : 0);
            }
        }
    }

    function toggleDGA() {
        const openDropdowns = document.querySelectorAll('.nds-dropdown.show');
        const navbarDuration = state.getElementDuration(DOM.collapse);

        if (DOM.collapse?.classList.contains('show')) {
            const hasOpenSecondary = document.querySelectorAll('.nds-nav-secondary .nds-dropdown.show').length > 0;

            let navbarCloseDelay;
            if (hasOpenSecondary) {
                navbarCloseDelay = navbarDuration + (navbarDuration * 0.2) + navbarDuration;
            } else {
                navbarCloseDelay = (navbarDuration * 0.2) + navbarDuration;
            }

            animateNavbar(false, hasOpenSecondary);
            
            if (navbarCloseDelay > 0) {
                setTimeout(performDGAToggle, navbarCloseDelay + 50);
            } else {
                performDGAToggle();
            }

        } else if (openDropdowns.length > 0) {
            const firstDropdown = openDropdowns[0];
            const dropdownDuration = state.getDropdownDuration(firstDropdown);
            
            openDropdowns.forEach(dropdown => animateDropdown(dropdown, false));
            
            if (dropdownDuration > 0) {
                setTimeout(performDGAToggle, dropdownDuration);
            } else {
                performDGAToggle();
            }
        } else {
            performDGAToggle();
        }
    }

    const handleDocumentClick = (event) => {
        // Prevent click outside detection during animations
        if (state.isAnimatingMenu) {
            return;
        }

        const clickX = event.clientX;
        const clickY = event.clientY;
        const safeZoneBuffer = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nds-dropdown-safeZone')) || 40;

        if (DOM.dgaContent?.classList.contains('dga-expanded') && DOM.dgaContent &&
            utils.isClickOutsideWithBuffer(clickX, clickY, [DOM.dgaTab, DOM.dgaContent], safeZoneBuffer)) {
            toggleDGA();
        }

        if (DOM.toggler && DOM.collapse?.classList.contains('show')) {
            const navElements = [DOM.collapse, DOM.toggler];
            
            // In minimal mode, extend safe zone to include opened secondary dropdown menus
            if (state.minimalMode) {
                const openSecondaryMenus = DOM.collapse?.querySelectorAll('.nds-nav-secondary .nds-dropdown.show .nds-dropdown-menu');
                openSecondaryMenus?.forEach(menu => {
                    if (!menu.closest('.nds-nav-minimal')) {
                        navElements.push(menu);
                    }
                });
            }
            
            if (utils.isClickOutsideWithBuffer(clickX, clickY, navElements, safeZoneBuffer)) {
                toggleNavbar();
            }
        }

        // Close dropdowns if click is outside their safe zones
        const openDropdowns = document.querySelectorAll('#ndsMainNav .nds-dropdown.show');
        openDropdowns.forEach(dropdown => {
            // Skip closing dropdowns to avoid boundary conflicts during animations
            if (dropdown.classList.contains('closing')) {
                return;
            }
            const menu = dropdown.querySelector('.nds-dropdown-menu');
            const dropdownElements = [dropdown];
            if (menu) dropdownElements.push(menu);
            
            if (utils.isClickOutsideWithBuffer(clickX, clickY, dropdownElements, safeZoneBuffer)) {
                const isSecondaryDropdown = dropdown.closest('.nds-nav-secondary');
                const isPrimaryDropdown = dropdown.closest('.nds-nav-primary');

                const needsRecalc = (isPrimaryDropdown || isSecondaryDropdown) 
                    && DOM.collapse?.classList.contains('show');
                animateDropdown(dropdown, false);
                if (needsRecalc) {
                    const duration = state.getDropdownDuration(dropdown);
                    setTimeout(() => updatePositions(), duration);
                }
            }
        });
    };

    const handleScroll = utils.throttle(() => {
        const hasDropdowns = document.querySelector('#ndsMainNav .nds-dropdown.show');
        if (!hasDropdowns) return;
        
        updatePositions();
    }, 16);


    function init() {
        if (!DOM.collapse) return;

        utils.updateBodyClass();
        utils.managePABPlacement();

        setupEventListeners();

        document.addEventListener('click', handleDocumentClick);
        window.addEventListener('scroll', handleScroll, { passive: true });
        DOM.dgaTab?.addEventListener('click', toggleDGA);

        if (DOM.collapse?.classList.contains('show')) {
            updatePositions();
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