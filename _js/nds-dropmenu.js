/**
 * NDS Dropmenu Component
 * Unified dropdown menu functionality with accessibility support
 * Handles click outside, keyboard navigation, and ARIA attributes
 */

(function() {
    'use strict';

    class NDSDropmenu {
        constructor(dropmenuElement) {
            this.dropmenu = dropmenuElement;
            this.trigger = this.dropmenu.querySelector('.nds-dropmenu-trigger');
            this.menu = this.dropmenu.querySelector('.nds-dropmenu-menu');
            this.items = Array.from(this.menu?.querySelectorAll('.nds-dropmenu-item') || []);
            this.isOpen = false;

            if (!this.trigger || !this.menu) {
                console.warn('NDS Dropmenu: Missing trigger or menu element');
                return;
            }

            this.init();
        }

        init() {
            this.setupAria();
            this.setupEventListeners();
        }

        setupAria() {
            // Set initial ARIA attributes
            if (!this.trigger.hasAttribute('aria-expanded')) {
                this.trigger.setAttribute('aria-expanded', 'false');
            }
            if (!this.trigger.hasAttribute('aria-haspopup')) {
                this.trigger.setAttribute('aria-haspopup', 'true');
            }
            if (!this.menu.hasAttribute('role')) {
                this.menu.setAttribute('role', 'menu');
            }
            if (!this.menu.hasAttribute('aria-hidden')) {
                this.menu.setAttribute('aria-hidden', 'true');
            }

            // Set role for menu items
            this.items.forEach(item => {
                if (!item.hasAttribute('role')) {
                    item.setAttribute('role', 'menuitem');
                }
            });
        }

        setupEventListeners() {
            // Toggle on trigger click
            this.trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.dropmenu.contains(e.target)) {
                    this.close();
                }
            });

            // Keyboard navigation
            this.trigger.addEventListener('keydown', (e) => this.handleTriggerKeydown(e));
            this.menu.addEventListener('keydown', (e) => this.handleMenuKeydown(e));

            // Close on item click
            this.items.forEach(item => {
                item.addEventListener('click', (e) => {
                    // Check if item has data-no-auto-close attribute
                    if (item.hasAttribute('data-no-auto-close')) {
                        // Don't auto-close, let the item handle closing manually
                        return;
                    }

                    // Allow event to propagate for custom handlers
                    // Close menu after a short delay to allow handlers to execute
                    setTimeout(() => this.close(), 100);
                });
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                    this.trigger.focus();
                }
            });
        }

        handleTriggerKeydown(e) {
            switch (e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.toggle();
                    if (this.isOpen && this.items.length > 0) {
                        this.items[0].focus();
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.open();
                    if (this.items.length > 0) {
                        this.items[0].focus();
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.open();
                    if (this.items.length > 0) {
                        this.items[this.items.length - 1].focus();
                    }
                    break;
            }
        }

        handleMenuKeydown(e) {
            const currentIndex = this.items.indexOf(document.activeElement);

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentIndex < this.items.length - 1) {
                        this.items[currentIndex + 1].focus();
                    } else {
                        this.items[0].focus(); // Loop to first
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        this.items[currentIndex - 1].focus();
                    } else {
                        this.items[this.items.length - 1].focus(); // Loop to last
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    this.items[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    this.items[this.items.length - 1].focus();
                    break;
                case 'Tab':
                    // Allow tab but close menu
                    this.close();
                    break;
            }
        }

        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }

        open() {
            this.isOpen = true;
            this.dropmenu.classList.add('open');
            this.trigger.setAttribute('aria-expanded', 'true');
            this.menu.setAttribute('aria-hidden', 'false');

            // Adjust position based on available space
            requestAnimationFrame(() => this.adjustPosition());

            // Dispatch custom event
            this.dispatchEvent('nds:dropmenu:opened');
        }

        adjustPosition() {
            // Remove any previous auto-adjustments
            this.dropmenu.classList.remove('top', 'align-left', 'align-right');

            // Get menu and viewport dimensions
            const menuRect = this.menu.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Check horizontal overflow
            const isRTL = document.dir === 'rtl' || document.documentElement.getAttribute('dir') === 'rtl';

            if (isRTL) {
                // RTL: Default is right-aligned, check if it overflows left
                if (menuRect.left < 0) {
                    // Overflow on left, switch to left-align (which aligns to right edge in RTL)
                    this.dropmenu.classList.add('align-left');
                }
            } else {
                // LTR: Default is left-aligned, check if it overflows right
                if (menuRect.right > viewportWidth) {
                    // Overflow on right, switch to right-align
                    this.dropmenu.classList.add('align-right');
                }
            }

            // Check vertical overflow
            const spaceBelow = viewportHeight - menuRect.bottom;

            if (spaceBelow < 0) {
                // Not enough space below, check space above
                const triggerRect = this.trigger.getBoundingClientRect();
                const spaceAbove = triggerRect.top;

                if (spaceAbove > Math.abs(spaceBelow)) {
                    // More space above, open upward
                    this.dropmenu.classList.add('top');
                }
            }
        }

        close() {
            this.isOpen = false;
            this.dropmenu.classList.remove('open');
            this.trigger.setAttribute('aria-expanded', 'false');
            this.menu.setAttribute('aria-hidden', 'true');

            // Dispatch custom event
            this.dispatchEvent('nds:dropmenu:closed');
        }

        dispatchEvent(eventName) {
            const event = new CustomEvent(eventName, {
                detail: {
                    dropmenu: this.dropmenu,
                    trigger: this.trigger,
                    menu: this.menu,
                    isOpen: this.isOpen
                },
                bubbles: true
            });
            this.dropmenu.dispatchEvent(event);
        }

        // Public API
        destroy() {
            // Remove event listeners by cloning elements
            this.trigger.replaceWith(this.trigger.cloneNode(true));
            this.items.forEach(item => {
                item.replaceWith(item.cloneNode(true));
            });
        }
    }

    // Auto-initialize dropmenus on page load
    function initializeDropmenus() {
        const dropmenus = document.querySelectorAll('.nds-dropmenu');

        dropmenus.forEach(dropmenu => {
            // Skip elements inside code examples
            if (dropmenu.closest('code, .code-example')) {
                return;
            }

            if (!dropmenu.hasAttribute('data-nds-dropmenu-initialized')) {
                const dropmenuInstance = new NDSDropmenu(dropmenu);
                dropmenu.ndsDropmenuInstance = dropmenuInstance;
                dropmenu.setAttribute('data-nds-dropmenu-initialized', 'true');
            }
        });
    }

    // Re-initialize when new content is added
    function reinitializeDropmenus() {
        initializeDropmenus();
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.NDSDropmenu = {
            init: initializeDropmenus,
            reinit: reinitializeDropmenus,
            create: (element) => new NDSDropmenu(element)
        };
    }

    // Export for modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSDropmenu;
    }

    // Note: Initialization now handled by nds-init.js unified system
})();

/**
 * Usage Examples:
 *
 * // Auto-initialization (happens automatically)
 * // Just add the HTML structure with .nds-dropmenu class
 *
 * // HTML Structure:
 * <div class="nds-dropmenu">
 *   <button class="nds-btn nds-subtle nds-dropmenu-trigger">
 *     <span class="label">Menu</span>
 *   </button>
 *   <div class="nds-dropmenu-menu">
 *     <button class="nds-btn nds-subtle nds-dropmenu-item">
 *       <i class="hgi hgi-stroke hgi-icon"></i>
 *       <span class="label">Item 1</span>
 *     </button>
 *     <button class="nds-btn nds-subtle nds-dropmenu-item">Item 2</button>
 *     <hr class="nds-dropmenu-divider">
 *     <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive">Delete</button>
 *   </div>
 * </div>
 *
 * // Manual initialization
 * const dropmenuElement = document.querySelector('.nds-dropmenu');
 * const dropmenuInstance = NDSDropmenu.create(dropmenuElement);
 *
 * // Programmatic control
 * dropmenuInstance.open();
 * dropmenuInstance.close();
 * dropmenuInstance.toggle();
 *
 * // Listen for events
 * document.addEventListener('nds:dropmenu:opened', (e) => {
 *     console.log('Dropmenu opened:', e.detail.dropmenu);
 * });
 *
 * document.addEventListener('nds:dropmenu:closed', (e) => {
 *     console.log('Dropmenu closed:', e.detail.dropmenu);
 * });
 *
 * // Reinitialize after dynamic content changes
 * NDSDropmenu.reinit();
 */
