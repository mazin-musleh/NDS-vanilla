// Side Menu Navigation
(() => {
    'use strict';
    
    const getSafeZonePixels = () => {
        const cssValue = getComputedStyle(document.documentElement).getPropertyValue('--nds-dropdown-safeZone').trim();
        return cssValue ? parseInt(cssValue, 10) : 40;
    };
    
    document.addEventListener("DOMContentLoaded", function () {
        const accMenu = document.querySelector(".nds-sideMenu");

        if (!accMenu) return;

        // Initialize open state for active menu items
        accMenu.querySelectorAll("li.active").forEach(activeItem => {
            let current = activeItem;
            while (current && current !== accMenu) {
                if (current.classList.contains("has-sub")) {
                    current.classList.add("open");
                }
                current = current.parentElement.closest("li");
            }
        });

        // Accordion submenu toggle
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

        // Toggle side menu when button is clicked
        const toggleBtn = document.getElementById("sideMenuToggle");
        if (toggleBtn) {
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                accMenu.classList.toggle("open");
            });
        }

        // Close menu when clicking outside safe zone
        document.addEventListener("click", function (e) {
            // Only proceed if menu is open
            if (!accMenu.classList.contains("open")) return;

            // Don't close if clicking inside the menu or toggle button
            if (accMenu.contains(e.target) || (toggleBtn && toggleBtn.contains(e.target))) {
                return;
            }

            // Get menu boundaries
            const menuRect = accMenu.getBoundingClientRect();
            const safeZone = getSafeZonePixels();

            // Check if click is within the safe zone around the menu
            const clickX = e.clientX;
            const clickY = e.clientY;

            const inSafeZone = (
                clickX >= menuRect.left - safeZone &&
                clickX <= menuRect.right + safeZone &&
                clickY >= menuRect.top - safeZone &&
                clickY <= menuRect.bottom + safeZone
            );

            // Close menu if click is outside the safe zone
            if (!inSafeZone) {
                accMenu.classList.remove("open");
            }
        });

        // Close menu on Escape key
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && accMenu.classList.contains("open")) {
                accMenu.classList.remove("open");
            }
        });
    });
})();