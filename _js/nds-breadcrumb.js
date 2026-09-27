/* NDS.Breadcrumb — public surface
 * Rides: nds-dropmenu (the overflow menu; soft — without it the extra levels stay as
 *        plain markup)
 * Methods:
 *   NDS.Breadcrumb.init() / .reinit()   scan + initialize .nds-breadcrumb-nav
 *   NDS.Breadcrumb.create(nav)          instance one breadcrumb
 *   instance.destroy()                  drop the overflow menu, restore every level
 * Events:
 *   (none)
 * Hooks:
 *   (none — markup only: a .nds-breadcrumb-nav wrapping the .nds-breadcrumb list)
 * Gotchas:
 *   - Collapse is automatic above 5 items and the threshold is not configurable: first
 *     item, an overflow menu, then the last two.
 *   - The hidden levels are COPIED into the menu as plain links (href + text). Anything
 *     else inside those <li> elements does not travel.
 */
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
            // Here, not in the sweep, so create() also ends the skeleton and stops a second sweep.
            breadcrumbNav.ndsBreadcrumb = this;
            this.init();
            breadcrumbNav.setAttribute('data-nds-breadcrumb-initialized', 'true');
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
            menu.className = 'nds-dropmenu-menu nds-breadcrumb-menu';
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
            // Put back the original items: collapse detached the middle ones.
            const menu = this.breadcrumb.querySelector('.nds-breadcrumb-ellipsis .nds-dropmenu');
            menu?.ndsDropmenu?.destroy?.();
            this.breadcrumb.replaceChildren(...this.items);
            // Releasing the stamp is what keeps destroy two-way: without it the same
            // markup stays marked as claimed, so no later init() or NDS.Init.refresh()
            // can ever collapse it again.
            this.breadcrumbNav.removeAttribute('data-nds-breadcrumb-initialized');
            delete this.breadcrumbNav.ndsBreadcrumb;
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

            // Only a valid construction stamps, so an empty breadcrumb rendered late stays eligible.
            if (!nav.hasAttribute('data-nds-breadcrumb-initialized')) new NDSBreadcrumb(nav);
        });
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    NDS.Breadcrumb = {
        init: initializeBreadcrumbs,
        reinit: initializeBreadcrumbs,
        create: (nav) => nav.ndsBreadcrumb || new NDSBreadcrumb(nav)
    };

    // Note: Initialization now handled by nds-loader.js unified system
})();
