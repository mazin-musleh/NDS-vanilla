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
            this.threshold = 5; // Collapse if more than 4 items

            if (this.items.length === 0) {
                console.warn('NDS Breadcrumb: No breadcrumb items found');
                return;
            }

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

            // Clear and rebuild breadcrumb
            this.breadcrumb.innerHTML = '';

            // Add first item (Home)
            this.breadcrumb.appendChild(firstItem);

            // Add dropdown
            this.breadcrumb.appendChild(dropdownContainer);

            // Add last two items
            lastTwoItems.forEach(item => {
                this.breadcrumb.appendChild(item);
            });

            // Initialize nds-dropmenu component
            if (window.NDSDropmenu) {
                const dropmenuElement = dropdownContainer.querySelector('.nds-dropmenu');
                if (dropmenuElement) {
                    window.NDSDropmenu.create(dropmenuElement);
                }
            }
        }

        createDropdown(hiddenItems) {
            const li = document.createElement('li');

            // Create nds-dropmenu structure
            const dropmenu = document.createElement('div');
            dropmenu.className = 'nds-dropmenu';

            const button = document.createElement('button');
            button.className = 'nds-btn nds-subtle nds-dropmenu-trigger';
            button.innerHTML = '...';

            const menu = document.createElement('div');
            menu.className = 'nds-dropmenu-menu';
            menu.setAttribute('aria-hidden', 'true');

            // Add hidden items to dropdown menu
            hiddenItems.forEach(item => {
                const link = item.querySelector('a');
                if (link) {
                    const menuItem = document.createElement('a');
                    menuItem.href = link.href;
                    menuItem.className = 'nds-btn nds-subtle nds-dropmenu-item';
                    menuItem.textContent = link.textContent;
                    menu.appendChild(menuItem);
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
                nav.ndsBreadcrumbInstance = breadcrumbInstance;
                nav.setAttribute('data-nds-breadcrumb-initialized', 'true');
            }
        });
    }

    // Re-initialize when new content is added
    function reinitializeBreadcrumbs() {
        initializeBreadcrumbs();
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.NDSBreadcrumb = {
            init: initializeBreadcrumbs,
            reinit: reinitializeBreadcrumbs,
            create: (nav) => new NDSBreadcrumb(nav)
        };
    }

    // Export for modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSBreadcrumb;
    }

    // Note: Initialization now handled by nds-init.js unified system
})();

/**
 * Usage Examples:
 *
 * // Auto-initialization (happens automatically)
 * // Breadcrumbs with 5+ items will automatically collapse
 *
 * // Manual initialization
 * const breadcrumbNav = document.querySelector('.nds-breadcrumb-nav');
 * const breadcrumbInstance = NDSBreadcrumb.create(breadcrumbNav);
 *
 * // Reinitialize after dynamic content changes
 * NDSBreadcrumb.reinit();
 *
 * // Behavior:
 * // - 1-4 items: Normal breadcrumb display
 * // - 5+ items: Shows "Home > ... > [last 2 items]"
 * // - Click "..." to reveal hidden items in dropdown menu
 */
