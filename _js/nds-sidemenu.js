// Side Menu Navigation
(() => {
    'use strict';

    const getSafeZonePixels = () => {
        const cssValue = getComputedStyle(document.documentElement).getPropertyValue('--nds-dropdown-safeZone').trim();
        return cssValue ? parseInt(cssValue, 10) : 40;
    };

    // Check if parent .contentLayout has .topSubMenu variant
    const isTopSubMenuMode = (accMenu) => {
        const contentLayout = accMenu.closest('.contentLayout');
        return contentLayout && contentLayout.classList.contains('topSubMenu');
    };

    // Get the target element that should be animated (drawer for topSubMenu, sideMenu otherwise)
    const getAnimationTarget = (accMenu) => {
        if (isTopSubMenuMode(accMenu)) {
            return accMenu.querySelector('.nds-drawer');
        }
        return accMenu;
    };

    // Set data-state for element
    const setState = (element, state) => {
        if (!element) return;
        if (state === null || state === '') {
            element.removeAttribute('data-state');
        } else {
            element.setAttribute('data-state', state);
        }
    };

    // Get current data-state
    const getState = (element) => {
        if (!element) return null;
        return element.getAttribute('data-state');
    };

    function initializeActiveStates(accMenu) {
        accMenu.querySelectorAll("li.active").forEach(activeItem => {
            let current = activeItem;
            while (current && current !== accMenu) {
                if (current.classList.contains("has-sub")) {
                    setState(current, 'open');
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

            const currentState = getState(li);
            const isOpen = currentState === 'open';
            anchor.setAttribute('aria-expanded', !isOpen);

            if (!isOpen) {
                // Close all sibling items
                const siblings = [...li.parentElement.children].filter(el => el !== li && el.classList.contains("has-sub"));

                siblings.forEach(sibling => {
                    const siblingSub = sibling.querySelector(":scope > ul");
                    const siblingState = getState(sibling);
                    if (siblingState === 'open' && siblingSub) {
                        const siblingAnchor = sibling.querySelector(":scope > a");
                        if (siblingAnchor) {
                            siblingAnchor.setAttribute('aria-expanded', 'false');
                        }

                        // Set closing state
                        setState(sibling, 'closing');
                        siblingSub.style.height = siblingSub.scrollHeight + "px";
                        siblingSub.offsetHeight;
                        siblingSub.style.height = "0px";

                        setTimeout(() => {
                            setState(sibling, null);
                            siblingSub.style.height = "";
                        }, 250);
                    }
                });

                // Open current item with opening state
                setState(li, 'opening');
                submenu.style.height = "0px";
                submenu.offsetHeight;
                submenu.style.height = submenu.scrollHeight + "px";

                submenu.addEventListener("transitionend", function handler() {
                    setState(li, 'open');
                    submenu.style.height = "";
                    submenu.removeEventListener("transitionend", handler);
                });

            } else {
                // Close current item with closing state
                setState(li, 'closing');
                submenu.style.height = submenu.scrollHeight + "px";
                submenu.offsetHeight;
                submenu.style.height = "0px";

                setTimeout(() => {
                    setState(li, null);
                    submenu.style.height = "";
                }, 250);
            }
        });
    }

    function setupMenuToggle(accMenu) {
        const toggleBtn = document.getElementById("sideMenuToggle");
        if (toggleBtn) {
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isTopMode = isTopSubMenuMode(accMenu);
                const animationTarget = getAnimationTarget(accMenu);
                const currentState = getState(animationTarget);
                const isOpen = currentState === 'open';
                const contentLayout = accMenu.closest('.contentLayout');
                const mainContent = contentLayout?.querySelector('.mainContent');

                if (!isOpen) {
                    // Set backdrop state on contentLayout for both modes
                    if (contentLayout) {
                        setState(contentLayout, 'backdrop');
                    }

                    if (isTopMode) {
                        // Drawer mode: use full animation cycle (opening → open)
                        setState(accMenu, 'open'); // Set state on sideMenu for backdrop
                        setState(animationTarget, 'opening');

                        // Add padding-top to mainContent (toggle outer height + 16px)
                        if (mainContent && toggleBtn) {
                            const toggleHeight = toggleBtn.offsetHeight;
                            mainContent.style.paddingTop = `${toggleHeight + 16}px`;
                        }

                        // Wait for next frame to trigger animation
                        requestAnimationFrame(() => {
                            requestAnimationFrame(() => {
                                setState(animationTarget, 'open');
                            });
                        });

                        // Listen for transition end to finalize state
                        const handleTransitionEnd = () => {
                            if (getState(animationTarget) === 'open') {
                                setState(animationTarget, 'open');
                            }
                            animationTarget.removeEventListener('transitionend', handleTransitionEnd);
                        };
                        animationTarget.addEventListener('transitionend', handleTransitionEnd);
                    } else {
                        // Slider mode: directly set open state
                        setState(animationTarget, 'open');
                    }
                } else {
                    if (isTopMode) {
                        // Drawer mode: use closing animation
                        setState(accMenu, 'closing'); // Set closing state on sideMenu for backdrop fade
                        setState(animationTarget, 'closing');

                        const handleTransitionEnd = () => {
                            setState(animationTarget, null);
                            setState(accMenu, null);
                            // Remove backdrop state after animation
                            if (contentLayout) {
                                setState(contentLayout, null);
                            }
                            // Remove padding-top from mainContent
                            if (mainContent) {
                                mainContent.style.paddingTop = '';
                            }
                            animationTarget.removeEventListener('transitionend', handleTransitionEnd);
                        };
                        animationTarget.addEventListener('transitionend', handleTransitionEnd);
                    } else {
                        // Slider mode: directly remove state and backdrop
                        setState(animationTarget, null);
                        if (contentLayout) {
                            setState(contentLayout, null);
                        }
                    }
                }
            });
        }
        return toggleBtn;
    }

    function setupClickOutside(accMenu, toggleBtn) {
        document.addEventListener("click", function (e) {
            const isTopMode = isTopSubMenuMode(accMenu);
            const animationTarget = getAnimationTarget(accMenu);
            const currentState = getState(animationTarget);

            if (currentState !== 'open') return;

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
                // Click is on backdrop or outside, close with animation
                setState(accMenu, 'closing'); // Set closing state on sideMenu for backdrop fade
                setState(animationTarget, 'closing');

                const contentLayout = accMenu.closest('.contentLayout');
                const mainContent = contentLayout?.querySelector('.mainContent');

                const handleTransitionEnd = () => {
                    setState(animationTarget, null);
                    setState(accMenu, null);
                    // Remove backdrop state after animation
                    if (contentLayout) {
                        setState(contentLayout, null);
                    }
                    // Remove padding-top from mainContent
                    if (mainContent) {
                        mainContent.style.paddingTop = '';
                    }
                    animationTarget.removeEventListener('transitionend', handleTransitionEnd);
                };
                animationTarget.addEventListener('transitionend', handleTransitionEnd);
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
                // Slider mode: directly remove state and backdrop
                setState(animationTarget, null);
                const contentLayout = accMenu.closest('.contentLayout');
                if (contentLayout) {
                    setState(contentLayout, null);
                }
            }
        });
    }

    function setupKeyboardEvents(accMenu) {
        document.addEventListener("keydown", function (e) {
            const isTopMode = isTopSubMenuMode(accMenu);
            const animationTarget = getAnimationTarget(accMenu);
            const currentState = getState(animationTarget);

            if (e.key === "Escape" && currentState === 'open') {
                const contentLayout = accMenu.closest('.contentLayout');
                const mainContent = contentLayout?.querySelector('.mainContent');

                if (isTopMode) {
                    // Drawer mode: use closing animation
                    setState(accMenu, 'closing'); // Set closing state on sideMenu for backdrop fade
                    setState(animationTarget, 'closing');

                    const handleTransitionEnd = () => {
                        setState(animationTarget, null);
                        setState(accMenu, null);
                        // Remove backdrop state after animation
                        if (contentLayout) {
                            setState(contentLayout, null);
                        }
                        // Remove padding-top from mainContent
                        if (mainContent) {
                            mainContent.style.paddingTop = '';
                        }
                        animationTarget.removeEventListener('transitionend', handleTransitionEnd);
                    };
                    animationTarget.addEventListener('transitionend', handleTransitionEnd);
                } else {
                    // Slider mode: directly remove state and backdrop
                    setState(animationTarget, null);
                    if (contentLayout) {
                        setState(contentLayout, null);
                    }
                }
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
        const activeItem = accMenu.querySelector('li.active .nds-btn .label');
        const firstItem = accMenu.querySelector('.nds-drawer-list > li .nds-btn .label');
        const menuLabel = activeItem || firstItem;

        if (menuLabel) {
            labelSpan.textContent = menuLabel.textContent;
        }

        if (isTopMode) {
            // TopSubMenu mode: show label and add menu-btn class
            labelSpan.removeAttribute('hidden');
            toggleBtn.classList.add('nds-menu-btn');
        } else {
            // Regular mode: keep label hidden and remove menu-btn class
            labelSpan.setAttribute('hidden', '');
            toggleBtn.classList.remove('nds-menu-btn');
        }
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

        // Add transition after initialization to prevent animation on page load
        accMenu.style.transition = 'transform var(--nds-transition)';
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