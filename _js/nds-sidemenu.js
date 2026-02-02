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
        accMenu.querySelectorAll("li.active").forEach(activeItem => {
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

    function setupMenuToggle(accMenu) {
        const toggleBtn = document.getElementById("sideMenuToggle");
        if (toggleBtn) {
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isTopMode = isTopSubMenuMode(accMenu);
                const animationTarget = getAnimationTarget(accMenu);
                const isOpen = hasState(animationTarget, 'open');
                const contentLayout = accMenu.closest('.contentLayout');

                if (!isOpen) {
                    // Set backdrop state on contentLayout for both modes
                    if (contentLayout) {
                        addState(contentLayout, 'backdrop');
                    }

                    if (isTopMode) {
                        // Drawer mode: use full animation cycle (open + opening → open)
                        addState(accMenu, 'open');
                        addState(animationTarget, 'open', 'opening');
                        addState(toggleBtn, 'open');

                        const handleTransitionEnd = () => {
                            removeState(animationTarget, 'opening');
                            animationTarget.removeEventListener('transitionend', handleTransitionEnd);
                        };
                        animationTarget.addEventListener('transitionend', handleTransitionEnd);
                    } else {
                        // Slider mode: open with opening state
                        addState(animationTarget, 'open', 'opening');

                        const handleTransitionEnd = () => {
                            removeState(animationTarget, 'opening');
                            animationTarget.removeEventListener('transitionend', handleTransitionEnd);
                        };
                        animationTarget.addEventListener('transitionend', handleTransitionEnd);
                    }
                } else {
                    if (isTopMode) {
                        // Drawer mode: use closing animation (open + closing coexist)
                        addState(accMenu, 'closing');
                        addState(animationTarget, 'closing');

                        const handleTransitionEnd = () => {
                            clearState(animationTarget);
                            clearState(accMenu);
                            clearState(toggleBtn);
                            if (contentLayout) {
                                clearState(contentLayout);
                            }
                            animationTarget.removeEventListener('transitionend', handleTransitionEnd);
                        };
                        animationTarget.addEventListener('transitionend', handleTransitionEnd);
                    } else {
                        // Slider mode: directly remove state and backdrop
                        clearState(animationTarget);
                        clearState(toggleBtn);
                        if (contentLayout) {
                            clearState(contentLayout);
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
                // Click is on backdrop or outside, close with animation (open + closing coexist)
                addState(accMenu, 'closing');
                addState(animationTarget, 'closing');

                const contentLayout = accMenu.closest('.contentLayout');

                const handleTransitionEnd = () => {
                    clearState(animationTarget);
                    clearState(accMenu);
                    if (toggleBtn) clearState(toggleBtn);
                    if (contentLayout) {
                        clearState(contentLayout);
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
                clearState(animationTarget);
                if (toggleBtn) clearState(toggleBtn);
                const contentLayout = accMenu.closest('.contentLayout');
                if (contentLayout) {
                    clearState(contentLayout);
                }
            }
        });
    }

    function setupKeyboardEvents(accMenu) {
        document.addEventListener("keydown", function (e) {
            const isTopMode = isTopSubMenuMode(accMenu);
            const animationTarget = getAnimationTarget(accMenu);

            if (e.key === "Escape" && hasState(animationTarget, 'open')) {
                const contentLayout = accMenu.closest('.contentLayout');

                const toggleBtn = document.getElementById("sideMenuToggle");

                if (isTopMode) {
                    // Drawer mode: use closing animation (open + closing coexist)
                    addState(accMenu, 'closing');
                    addState(animationTarget, 'closing');

                    const handleTransitionEnd = () => {
                        clearState(animationTarget);
                        clearState(accMenu);
                        if (toggleBtn) clearState(toggleBtn);
                        if (contentLayout) {
                            clearState(contentLayout);
                        }
                        animationTarget.removeEventListener('transitionend', handleTransitionEnd);
                    };
                    animationTarget.addEventListener('transitionend', handleTransitionEnd);
                } else {
                    // Slider mode: directly remove state and backdrop
                    clearState(animationTarget);
                    if (toggleBtn) clearState(toggleBtn);
                    if (contentLayout) {
                        clearState(contentLayout);
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
            // TopSubMenu mode: show label, add menu-btn class, use subtle style
            labelSpan.removeAttribute('hidden');
            toggleBtn.classList.add('nds-menu-btn', 'nds-subtle', 'nds-indicator');
            toggleBtn.classList.remove('nds-primary');
        } else {
            // Regular mode: keep label hidden, remove menu-btn class, use primary style
            labelSpan.setAttribute('hidden', '');
            toggleBtn.classList.add('nds-primary');
            toggleBtn.classList.remove('nds-menu-btn', 'nds-subtle', 'nds-indicator');
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