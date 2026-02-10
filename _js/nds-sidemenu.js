// Side Menu Navigation
(() => {
    'use strict';

    const getSafeZonePixels = () => {
        const cssValue = getComputedStyle(document.documentElement).getPropertyValue('--nds-dropdown-safeZone').trim();
        return cssValue ? parseInt(cssValue, 10) : 40;
    };

    // Check if parent .nds-content-layout has .topSubMenu variant
    const isTopSubMenuMode = (accMenu) => {
        const contentLayout = accMenu.closest('.nds-content-layout');
        return contentLayout && contentLayout.classList.contains('topSubMenu');
    };

    // Get the target element that should be animated (drawer for topSubMenu, sideMenu otherwise)
    const getAnimationTarget = (accMenu) => {
        if (isTopSubMenuMode(accMenu)) {
            return accMenu.querySelector('.nds-drawer');
        }
        return accMenu;
    };

    // State management helpers for space-separated data-state values
    const addState = (element, ...states) => {
        if (!element) return;
        const current = new Set((element.getAttribute('data-state') || '').split(/\s+/).filter(Boolean));
        states.forEach(s => current.add(s));
        element.setAttribute('data-state', [...current].join(' '));
    };

    const removeState = (element, ...states) => {
        if (!element) return;
        const current = new Set((element.getAttribute('data-state') || '').split(/\s+/).filter(Boolean));
        states.forEach(s => current.delete(s));
        if (current.size === 0) {
            element.removeAttribute('data-state');
        } else {
            element.setAttribute('data-state', [...current].join(' '));
        }
    };

    const hasState = (element, state) => {
        if (!element) return false;
        const current = (element.getAttribute('data-state') || '').split(/\s+/);
        return current.includes(state);
    };

    // Clear all states
    const clearState = (element) => {
        if (!element) return;
        element.removeAttribute('data-state');
    };

    function initializeActiveStates(accMenu) {
        accMenu.querySelectorAll('li[data-state~="active"]').forEach(activeItem => {
            let current = activeItem;
            while (current && current !== accMenu) {
                if (current.classList.contains("has-sub")) {
                    addState(current, 'open');
                }
                current = current.parentElement.closest("li");
            }
        });
    }

    function setupAccordionToggle(accMenu) {
        accMenu.addEventListener("click", function (e) {
            const anchor = e.target.closest("li.has-sub > a");
            if (!anchor) return;

            e.preventDefault();
            const li = anchor.parentElement;
            const submenu = li.querySelector(":scope > ul");
            if (!submenu) return;

            const isOpen = hasState(li, 'open');
            anchor.setAttribute('aria-expanded', !isOpen);

            if (!isOpen) {
                // Close all sibling items
                const siblings = [...li.parentElement.children].filter(el => el !== li && el.classList.contains("has-sub"));

                siblings.forEach(sibling => {
                    const siblingSub = sibling.querySelector(":scope > ul");
                    if (hasState(sibling, 'open') && siblingSub) {
                        const siblingAnchor = sibling.querySelector(":scope > a");
                        if (siblingAnchor) {
                            siblingAnchor.setAttribute('aria-expanded', 'false');
                        }

                        // Set closing state (open + closing coexist)
                        addState(sibling, 'closing');
                        siblingSub.style.height = siblingSub.scrollHeight + "px";
                        siblingSub.offsetHeight;
                        siblingSub.style.height = "0px";

                        setTimeout(() => {
                            clearState(sibling);
                            siblingSub.style.height = "";
                        }, 250);
                    }
                });

                // Open current item with opening state (open + opening coexist)
                addState(li, 'open', 'opening');
                submenu.style.height = "0px";
                submenu.offsetHeight;
                submenu.style.height = submenu.scrollHeight + "px";

                submenu.addEventListener("transitionend", function handler() {
                    removeState(li, 'opening');
                    submenu.style.height = "";
                    submenu.removeEventListener("transitionend", handler);
                });

            } else {
                // Close current item with closing state (open + closing coexist)
                addState(li, 'closing');
                submenu.style.height = submenu.scrollHeight + "px";
                submenu.offsetHeight;
                submenu.style.height = "0px";

                setTimeout(() => {
                    clearState(li);
                    submenu.style.height = "";
                }, 250);
            }
        });
    }

    // Set --drawer-max-height to full viewport height minus visible header content
    // Only applies to slider side menu mode, not top mode
    const updateDrawerMaxHeight = (accMenu, isTopMode) => {
        // Only update for slider mode (not top mode)
        if (isTopMode) return;

        const drawer = accMenu.querySelector('.nds-drawer');
        if (!drawer) return;

        const nav = document.getElementById('ndsMainNav');
        const topbar = document.querySelector('.nds-topbar');

        const navBottom = nav ? Math.max(0, nav.getBoundingClientRect().bottom) : 0;
        const topbarBottom = topbar ? Math.max(0, topbar.getBoundingClientRect().bottom) : 0;

        // Take the maximum bottom position of header elements
        const visibleHeader = Math.max(navBottom, topbarBottom);

        // Set top padding to match visible header height
        accMenu.style.paddingTop = visibleHeader + 'px';

        // Set drawer max height accounting for visible header
        const availableHeight = window.innerHeight - visibleHeader;
        drawer.style.setProperty('--drawer-max-height', Math.max(availableHeight, 100) + 'px');
    };

    // Helper: Open menu for both modes
    const openMenu = (accMenu, animationTarget, toggleBtn, contentLayout, isTopMode) => {
        // Set drawer max height based on available space (slider mode only)
        updateDrawerMaxHeight(accMenu, isTopMode);

        // Top mode: scroll page past hero section to make room for menu (only if hero is in viewport)
        if (isTopMode) {
            const heroSection = document.querySelector('.nds-hero-section');
            if (heroSection) {
                const heroRect = heroSection.getBoundingClientRect();
                // Only scroll if hero bottom is still visible in viewport
                if (heroRect.bottom > 0) {
                    const heroBottom = heroRect.bottom + window.scrollY;
                    window.scrollTo({ top: heroBottom, behavior: 'smooth' });

                    // Lock scroll after smooth scroll finishes
                    const lockScroll = () => {
                        window.removeEventListener('scrollend', lockScroll);
                        const scrollY = window.pageYOffset;
                        document.body.style.top = `-${scrollY}px`;
                        document.body.setAttribute('data-state', 'backdrop');
                    };
                    window.addEventListener('scrollend', lockScroll);
                }
            }
        }

        // Show backdrop and set toggle button state for all modes
        if (window.NDSBackdrop) {
            window.NDSBackdrop.show({
                zIndex: isTopMode ? 997 : 998, // Top mode: 997, Slide menu: 998
                preventScroll: !isTopMode, // Disable scroll lock for top mode (allows smooth scroll)
                onClick: () => {
                    if (hasState(animationTarget, 'open')) {
                        closeMenu(accMenu, animationTarget, toggleBtn, contentLayout, isTopMode);
                    }
                }
            });
        }
        if (toggleBtn) addState(toggleBtn, 'open');

        if (isTopMode) {
            // Top mode: animate drawer
            addState(accMenu, 'open');
            addState(animationTarget, 'open', 'opening');
        } else {
            // Slider mode: animate menu, remove peek
            addState(animationTarget, 'open', 'opening');
            accMenu.classList.remove('nds-peek');
        }

        const handleTransitionEnd = () => {
            removeState(animationTarget, 'opening');
            animationTarget.removeEventListener('transitionend', handleTransitionEnd);
        };
        animationTarget.addEventListener('transitionend', handleTransitionEnd);
    };

    // Helper: Close menu for both modes
    const closeMenu = (accMenu, animationTarget, toggleBtn, contentLayout, isTopMode) => {
        // Both modes now use closing animation for consistent state cycle
        if (isTopMode) {
            addState(accMenu, 'closing');
        }

        addState(animationTarget, 'closing');

        let transitionCompleted = false;

        const cleanup = () => {
            if (transitionCompleted) return;
            transitionCompleted = true;

            clearState(animationTarget);
            if (isTopMode) {
                clearState(accMenu);
            } else {
                // Slider mode: restore peek class after animation
                accMenu.classList.add('nds-peek');
            }
            if (toggleBtn) clearState(toggleBtn);
            // Clear dynamic drawer max height and padding (slider mode only)
            const drawer = accMenu.querySelector('.nds-drawer');
            if (drawer) drawer.style.removeProperty('--drawer-max-height');
            if (!isTopMode) accMenu.style.removeProperty('padding-top');
            // Unlock manual scroll lock (top mode applies this after smooth scroll)
            if (isTopMode && document.body.style.top) {
                const scrollY = parseInt(document.body.style.top, 10) * -1;
                document.body.style.top = '';
                document.body.removeAttribute('data-state');
                window.scrollTo(0, scrollY);
            }
            // Hide backdrop using API
            if (window.NDSBackdrop) window.NDSBackdrop.hide();
            animationTarget.removeEventListener('transitionend', handleTransitionEnd);
        };

        const handleTransitionEnd = (e) => {
            // Only handle transitions on the animation target itself
            if (e && e.target !== animationTarget) return;
            cleanup();
        };

        animationTarget.addEventListener('transitionend', handleTransitionEnd);

        // Fallback timeout in case transition doesn't fire (300ms = default transition duration)
        setTimeout(() => {
            if (!transitionCompleted) {
                cleanup();
            }
        }, 300);
    };

    function setupMenuToggle(accMenu) {
        const toggleBtn = document.getElementById("sideMenuToggle");

        if (toggleBtn) {
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isTopMode = isTopSubMenuMode(accMenu);
                const animationTarget = getAnimationTarget(accMenu);
                const isOpen = hasState(animationTarget, 'open');
                const contentLayout = accMenu.closest('.nds-content-layout');

                if (!isOpen) {
                    openMenu(accMenu, animationTarget, toggleBtn, contentLayout, isTopMode);
                } else {
                    closeMenu(accMenu, animationTarget, toggleBtn, contentLayout, isTopMode);
                }
            });
        }
        return toggleBtn;
    }

    function setupClickOutside(accMenu, toggleBtn) {
        document.addEventListener("click", function (e) {
            const isTopMode = isTopSubMenuMode(accMenu);
            const animationTarget = getAnimationTarget(accMenu);
            const contentLayout = accMenu.closest('.nds-content-layout');

            if (!hasState(animationTarget, 'open')) return;

            // Skip if clicked on toggle button
            if (toggleBtn && toggleBtn.contains(e.target)) {
                return;
            }

            // In topSubMenu mode, close if clicked outside drawer or on backdrop
            if (isTopMode) {
                const drawer = accMenu.querySelector('.nds-drawer');
                // If click is inside drawer content, don't close
                if (drawer && drawer.contains(e.target)) {
                    return;
                }
                // Close menu using helper
                closeMenu(accMenu, animationTarget, toggleBtn, contentLayout, isTopMode);
                return;
            }

            // Regular slider mode: check if click is inside menu
            if (accMenu.contains(e.target)) {
                return;
            }

            // Check safe zone for regular mode
            const menuRect = accMenu.getBoundingClientRect();
            const safeZone = getSafeZonePixels();
            const clickX = e.clientX;
            const clickY = e.clientY;

            const inSafeZone = (
                clickX >= menuRect.left - safeZone &&
                clickX <= menuRect.right + safeZone &&
                clickY >= menuRect.top - safeZone &&
                clickY <= menuRect.bottom + safeZone
            );

            if (!inSafeZone) {
                // Close menu using helper
                closeMenu(accMenu, animationTarget, toggleBtn, contentLayout, isTopMode);
            }
        });
    }

    function setupKeyboardEvents(accMenu) {
        document.addEventListener("keydown", function (e) {
            if (e.key !== "Escape") return;

            const isTopMode = isTopSubMenuMode(accMenu);
            const animationTarget = getAnimationTarget(accMenu);

            if (hasState(animationTarget, 'open')) {
                const contentLayout = accMenu.closest('.nds-content-layout');
                const toggleBtn = document.getElementById("sideMenuToggle");

                // Close menu using helper
                closeMenu(accMenu, animationTarget, toggleBtn, contentLayout, isTopMode);
            }
        });
    }

    function updateToggleLabel(accMenu) {
        const toggleBtn = document.getElementById("sideMenuToggle");
        if (!toggleBtn) return;

        const labelSpan = toggleBtn.querySelector('.label');
        if (!labelSpan) return;

        const isTopMode = isTopSubMenuMode(accMenu);

        // Find active item, or use first item as fallback
        const activeItem = accMenu.querySelector('li[data-state~="active"] .nds-btn .label');
        const firstItem = accMenu.querySelector('.nds-drawer-list > li .nds-btn .label');
        const menuLabel = activeItem || firstItem;

        if (menuLabel) {
            labelSpan.textContent = menuLabel.textContent;
        }

        if (isTopMode) {
            // TopSubMenu mode: show label, add menu-btn class, use subtle style
            labelSpan.removeAttribute('hidden');
            toggleBtn.classList.add('nds-menu-btn', 'nds-subtle', 'nds-indicator');
            toggleBtn.classList.remove('nds-primary');
        } else {
            // Slider mode: keep label hidden, use primary style, keep indicator
            labelSpan.setAttribute('hidden', '');
            toggleBtn.classList.add('nds-primary', 'nds-indicator');
            toggleBtn.classList.remove('nds-menu-btn', 'nds-subtle');
        }
    }

    function setupScrollPeek() {
        const toggleBtn = document.getElementById("sideMenuToggle");
        if (!toggleBtn) return;

        // Only run if nds-peek class exists on init
        if (!toggleBtn.classList.contains('nds-peek')) return;

        // Toggle peek on page load for 1500ms
        toggleBtn.classList.remove('nds-peek');
        setTimeout(() => {
            toggleBtn.classList.add('nds-peek');
        }, 1500);

        let proximityTicking = false;
        const proximityThreshold = 60; // Distance from button to toggle peek

        const handleProximity = (clientX, clientY) => {
            const rect = toggleBtn.getBoundingClientRect();
            const buttonCenterX = rect.left + rect.width / 2;
            const buttonCenterY = rect.top + rect.height / 2;

            // Calculate distance from cursor/touch to button center
            const distance = Math.sqrt(
                Math.pow(clientX - buttonCenterX, 2) +
                Math.pow(clientY - buttonCenterY, 2)
            );

            // Toggle peek based on 150px proximity: hide when near, show when far
            if (distance <= proximityThreshold) {
                toggleBtn.classList.remove('nds-peek');
            } else {
                toggleBtn.classList.add('nds-peek');
            }

            proximityTicking = false;
        };

        // Mouse move listener with RAF throttling
        window.addEventListener('mousemove', (e) => {
            if (!proximityTicking) {
                proximityTicking = true;
                requestAnimationFrame(() => handleProximity(e.clientX, e.clientY));
            }
        }, { passive: true });

        // Touch move listener with RAF throttling
        window.addEventListener('touchmove', (e) => {
            if (!proximityTicking && e.touches.length > 0) {
                proximityTicking = true;
                const touch = e.touches[0];
                requestAnimationFrame(() => handleProximity(touch.clientX, touch.clientY));
            }
        }, { passive: true });
    }

    function initializeSideMenu() {
        const accMenu = document.querySelector(".nds-sideMenu");
        if (!accMenu) return;

        // Skip elements inside code examples
        if (accMenu.closest('code, .code-example')) {
            return;
        }

        initializeActiveStates(accMenu);
        setupAccordionToggle(accMenu);
        const toggleBtn = setupMenuToggle(accMenu);
        setupClickOutside(accMenu, toggleBtn);
        setupKeyboardEvents(accMenu);
        updateToggleLabel(accMenu);
        setupScrollPeek();

        // Remove hidden attribute from trigger on init (drawer handled by loader)
        if (toggleBtn) toggleBtn.removeAttribute('hidden');

        // Close menu when window width changes
        let previousWidth = window.innerWidth;
        window.addEventListener('resize', () => {
            const currentWidth = window.innerWidth;
            if (currentWidth !== previousWidth) {
                previousWidth = currentWidth;

                const isTopMode = isTopSubMenuMode(accMenu);
                const animationTarget = getAnimationTarget(accMenu);
                const contentLayout = accMenu.closest('.nds-content-layout');

                if (hasState(animationTarget, 'open')) {
                    closeMenu(accMenu, animationTarget, toggleBtn, contentLayout, isTopMode);
                }
            }
        });
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.NDSSideMenu = {
            init: initializeSideMenu,
            getSafeZonePixels
        };
    }

    // Note: Initialization now handled by nds-loader.js unified system
})();