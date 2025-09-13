// Side Menu Navigation
(() => {
    'use strict';
    
    const getSafeZonePixels = () => {
        const cssValue = getComputedStyle(document.documentElement).getPropertyValue('--nds-dropdown-safeZone').trim();
        return cssValue ? parseInt(cssValue, 10) : 40;
    };

    function initializeActiveStates(accMenu) {
        accMenu.querySelectorAll("li.active").forEach(activeItem => {
            let current = activeItem;
            while (current && current !== accMenu) {
                if (current.classList.contains("has-sub")) {
                    current.classList.add("open");
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

            const isOpen = li.classList.contains("open");
            anchor.setAttribute('aria-expanded', !isOpen);
            
            if (!isOpen) {
                // Close all sibling items
                const siblings = [...li.parentElement.children].filter(el => el !== li && el.classList.contains("has-sub"));
                
                siblings.forEach(sibling => {
                    const siblingSub = sibling.querySelector(":scope > ul");
                    if (sibling.classList.contains("open") && siblingSub) {
                        siblingSub.style.height = siblingSub.scrollHeight + "px";
                        siblingSub.offsetHeight;
                        siblingSub.style.height = "0px";

                        setTimeout(() => {
                            sibling.classList.remove("open");
                            siblingSub.style.height = "";
                        }, 250);
                    }
                });

                // Open current item
                li.classList.add("open");
                submenu.style.height = "0px";
                submenu.offsetHeight;
                submenu.style.height = submenu.scrollHeight + "px";

                submenu.addEventListener("transitionend", function handler() {
                    submenu.style.height = "";
                    submenu.removeEventListener("transitionend", handler);
                });

            } else {
                // Close current item
                submenu.style.height = submenu.scrollHeight + "px";
                submenu.offsetHeight;
                submenu.style.height = "0px";

                setTimeout(() => {
                    li.classList.remove("open");
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
                accMenu.classList.toggle("open");
            });
        }
        return toggleBtn;
    }

    function setupClickOutside(accMenu, toggleBtn) {
        document.addEventListener("click", function (e) {
            if (!accMenu.classList.contains("open")) return;

            if (accMenu.contains(e.target) || (toggleBtn && toggleBtn.contains(e.target))) {
                return;
            }

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
                accMenu.classList.remove("open");
            }
        });
    }

    function setupKeyboardEvents(accMenu) {
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && accMenu.classList.contains("open")) {
                accMenu.classList.remove("open");
            }
        });
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
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.NDSSideMenu = {
            init: initializeSideMenu,
            getSafeZonePixels
        };
    }

    // Note: Initialization now handled by nds-init.js unified system
})();