/* NDS.Breadcrumb — public surface
 * Rides: nds-dropmenu (the overflow menu)
 * Methods:
 *   NDS.Breadcrumb.init() / .reinit()   scan + initialize .nds-breadcrumb-nav
 *   NDS.Breadcrumb.create(nav)          instance one breadcrumb — null when it has no items;
 *                                       the live one if started
 *   NDS.Breadcrumb.destroy(nav)         undo create()
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

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('breadcrumb', {
        more: 'More',
    });

    class NdsBreadcrumb {
        constructor(breadcrumbNav) {
            this._breadcrumbNav = breadcrumbNav;
            this._breadcrumb = breadcrumbNav.querySelector('.nds-breadcrumb');
            this._items = Array.from(this._breadcrumb.querySelectorAll('li'));
            this._threshold = 5; // Collapse if more than 5 items

            if (this._items.length === 0) {
                console.warn('NDS Breadcrumb: No breadcrumb items found');
                return;
            }

            this._valid = true;
            // Here, not in the sweep, so create() also ends the skeleton and stops a second sweep.
            breadcrumbNav.ndsBreadcrumb = this;
            this.init();
            breadcrumbNav.setAttribute('data-nds-breadcrumb-initialized', 'true');
        }

        init() {
            if (this._items.length > this._threshold) {
                this._collapseBreadcrumb();
            }
        }

        _collapseBreadcrumb() {
            // Keep first item (Home) and last 2 items visible
            const firstItem = this._items[0];
            const lastTwoItems = this._items.slice(-2);
            const hiddenItems = this._items.slice(1, -2);

            // Create dropdown container using nds-dropmenu
            const dropdownContainer = this._buildDropdown(hiddenItems);

            this._breadcrumb.replaceChildren(firstItem, dropdownContainer, ...lastTwoItems);

            // Initialize only the newly created dropdown menu
            const dropmenuElement = dropdownContainer.querySelector('.nds-dropmenu');
            if (dropmenuElement) {
                // Use create() to initialize just this dropdown
                NDS.Dropmenu.create(dropmenuElement);
            }
        }

        _buildDropdown(hiddenItems) {
            const ellipsisItem = document.createElement('li');
            ellipsisItem.className = 'nds-breadcrumb-ellipsis';

            // Create nds-dropmenu structure
            const dropmenu = document.createElement('div');
            dropmenu.className = 'nds-dropmenu';

            const button = document.createElement('button');
            button.className = 'nds-btn nds-subtle nds-ellipsis nds-dropmenu-trigger';
            strings.set(button, 'aria-label', 'more');

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
            ellipsisItem.appendChild(dropmenu);

            return ellipsisItem;
        }

        destroy() {
            // Put back the original items: collapse detached the middle ones.
            const menu = this._breadcrumb.querySelector('.nds-breadcrumb-ellipsis .nds-dropmenu');
            menu?.ndsDropmenu?.destroy?.();
            this._breadcrumb.replaceChildren(...this._items);
            // Releasing the stamp is what keeps destroy two-way: without it the same
            // markup stays marked as claimed, so no later init() or NDS.init.refresh()
            // can ever collapse it again.
            this._breadcrumbNav.removeAttribute('data-nds-breadcrumb-initialized');
            delete this._breadcrumbNav.ndsBreadcrumb;
        }
    }

    // Auto-initialize breadcrumbs on page load
    function setupBreadcrumbs() {
        const breadcrumbNavs = document.querySelectorAll('.nds-breadcrumb-nav');

        breadcrumbNavs.forEach(nav => {
            // Skip elements inside code examples
            if (nav.closest('code')) {
                return;
            }

            // Only a valid construction stamps, so an empty breadcrumb rendered late stays eligible.
            if (!nav.hasAttribute('data-nds-breadcrumb-initialized')) new NdsBreadcrumb(nav);
        });
    }

    // Assigned at module eval so the loader's lazy stub resolves.
    NDS.Breadcrumb = {
        init: setupBreadcrumbs,
        reinit: setupBreadcrumbs,
        create: (nav) => {
            if (nav.ndsBreadcrumb) return nav.ndsBreadcrumb;
            const instance = new NdsBreadcrumb(nav);
            return instance._valid ? instance : null;
        },
        destroy: (nav) => nav?.ndsBreadcrumb?.destroy(),
    };

    // Note: Initialization now handled by nds-loader.js unified system
})();
