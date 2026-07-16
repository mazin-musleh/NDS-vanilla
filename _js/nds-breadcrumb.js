/**
 * NDS Breadcrumb Component
 * Automatically collapses breadcrumbs with 5+ levels into a dropdown menu
 * Shows: Home > ... > [last 2 items]
 * Hidden items accessible via dropdown menu
 */

(function() {
    'use strict';

    class NDSBreadcrumb {
        constructor(breadcrumbNav) {
            this.breadcrumbNav = breadcrumbNav;
            this.breadcrumb = breadcrumbNav.querySelector('.nds-breadcrumb');
            this.items = Array.from(this.breadcrumb.querySelectorAll('li'));
            this.threshold = 5; // Collapse if more than 5 items

            if (this.items.length === 0) {
                console.warn('NDS Breadcrumb: No breadcrumb items found');
                return;
            }

            this.valid = true;
            this.init();
        }

        init() {
            if (this.items.length > this.threshold) {
                this.collapseBreadcrumb();
            }
        }

        collapseBreadcrumb() {
            // Keep first item (Home) and last 2 items visible
            const firstItem = this.items[0];
            const lastTwoItems = this.items.slice(-2);
            const hiddenItems = this.items.slice(1, -2);

            // Create dropdown container using nds-dropmenu
            const dropdownContainer = this.createDropdown(hiddenItems);

            this.breadcrumb.replaceChildren(firstItem, dropdownContainer, ...lastTwoItems);

            // Initialize only the newly created dropdown menu
            const dropmenuElement = dropdownContainer.querySelector('.nds-dropmenu');
            // Soft dependency — overflow stays as plain markup if NDS.Dropmenu isn't bundled.
            if (dropmenuElement && NDS.Dropmenu) {
                // Use create() to initialize just this dropdown
                NDS.Dropmenu.create(dropmenuElement);
            }
        }

        createDropdown(hiddenItems) {
            const li = document.createElement('li');
            li.className = 'nds-breadcrumb-ellipsis';

            // Create nds-dropmenu structure
            const dropmenu = document.createElement('div');
            dropmenu.className = 'nds-dropmenu';

            const button = document.createElement('button');
            button.className = 'nds-btn nds-subtle nds-ellipsis nds-dropmenu-trigger';
            NDS.aria.label(button, 'More');

            const menu = document.createElement('div');
            menu.className = 'nds-dropmenu-menu';
            NDS.aria.hidden(menu, true);

            const scroll = document.createElement('div');
            scroll.className = 'nds-dropmenu-scroll';
            menu.appendChild(scroll);

            // Add hidden items to dropdown menu
            hiddenItems.forEach(item => {
                const link = item.querySelector('a');
                if (link) {
                    const menuItem = document.createElement('a');
                    menuItem.href = link.href;
                    menuItem.className = 'nds-btn nds-subtle nds-dropmenu-item';
                    menuItem.textContent = link.textContent;
                    scroll.appendChild(menuItem);
                }
            });

            dropmenu.appendChild(button);
            dropmenu.appendChild(menu);
            li.appendChild(dropmenu);

            return li;
        }

        destroy() {
            // Remove nds-dropmenu and restore original breadcrumb
            const dropdownContainer = this.breadcrumb.querySelector('.nds-dropmenu');
            if (dropdownContainer) {
                dropdownContainer.closest('li')?.remove();
            }
        }
    }

    // Auto-initialize breadcrumbs on page load
    function initializeBreadcrumbs() {
        const breadcrumbNavs = document.querySelectorAll('.nds-breadcrumb-nav');

        breadcrumbNavs.forEach(nav => {
            // Skip elements inside code examples
            if (nav.closest('code, .code-example')) {
                return;
            }

            if (!nav.hasAttribute('data-nds-breadcrumb-initialized')) {
                const breadcrumbInstance = new NDSBreadcrumb(nav);
                // Stamp only successful constructions — an empty breadcrumb rendered
                // late stays eligible for the next reinit().
                if (breadcrumbInstance.valid) {
                    nav.ndsBreadcrumb = breadcrumbInstance;
                    nav.setAttribute('data-nds-breadcrumb-initialized', 'true');
                }
            }
        });
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    NDS.Breadcrumb = {
        init: initializeBreadcrumbs,
        reinit: initializeBreadcrumbs,
        create: (nav) => new NDSBreadcrumb(nav)
    };

    // Note: Initialization now handled by nds-loader.js unified system
})();
