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

            // Check if already initialized to prevent duplicate listeners
            if (this.dropmenu.hasAttribute('data-nds-dropmenu-initialized')) {
                return;
            }

            this.init();
        }

        // Get all focusable elements in the menu (inputs + items) in DOM order
        getFocusableElements() {
            const focusable = [];

            // Walk through direct children of the menu in order
            const walkElement = (element) => {
                // Skip if not an element node
                if (element.nodeType !== 1) return;

                // Check if this element itself is focusable
                const tagName = element.tagName;
                const isFocusableInput = (tagName === 'INPUT' || tagName === 'TEXTAREA') &&
                                        element.type !== 'hidden' &&
                                        !element.disabled;
                const isFocusableButton = (tagName === 'BUTTON' || tagName === 'A') &&
                                         element.classList.contains('nds-dropmenu-item') &&
                                         !element.disabled;

                // Skip elements inside form-action
                const isInsideFormAction = element.closest('.nds-form-action');

                if (!isInsideFormAction) {
                    if (isFocusableInput) {
                        focusable.push(element);
                    } else if (isFocusableButton) {
                        focusable.push(element);
                        // Don't traverse children of focusable buttons
                        return;
                    }
                }

                // Traverse children
                Array.from(element.children).forEach(child => walkElement(child));
            };

            // Start walking from menu's direct children
            Array.from(this.menu.children).forEach(child => walkElement(child));

            return focusable;
        }

        init() {
            this.setupAria();
            this.setupEventListeners();
            // Mark as initialized to prevent duplicate initialization
            this.dropmenu.setAttribute('data-nds-dropmenu-initialized', 'true');
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

            // Set role for menu items (but not form controls)
            this.items.forEach(item => {
                // Don't set menuitem role on form controls
                if (item.classList.contains('nds-form-control')) {
                    return;
                }
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

            // Close on outside click - scoped to document but checked per instance
            this.handleOutsideClick = (e) => {
                if (this.isOpen && !this.dropmenu.contains(e.target)) {
                    this.close();
                }
            };
            document.addEventListener('click', this.handleOutsideClick);

            // Keyboard navigation - scoped to dropmenu element
            this.trigger.addEventListener('keydown', (e) => this.handleTriggerKeydown(e));

            // Use event delegation for menu keyboard navigation (better performance)
            this.menu.addEventListener('keydown', (e) => {
                const target = e.target;
                const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA');

                // For inputs, handle Tab and Alt+Arrow specially
                if (isInput) {
                    if (e.key === 'Tab' || (e.altKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp'))) {
                        // Mark that this event should be handled
                        this.handleMenuKeydown(e);
                        return;
                    }
                }

                // Handle all other keyboard events
                this.handleMenuKeydown(e);
            });

            // Close on Escape key - scoped to dropmenu element only
            this.dropmenu.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    e.stopPropagation(); // Prevent other dropmenus from also closing
                    this.close();
                    this.trigger.focus();
                }
            });

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
        }

        handleTriggerKeydown(e) {
            const focusableElements = this.getFocusableElements();

            switch (e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.toggle();
                    if (this.isOpen && focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.open();
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.open();
                    if (focusableElements.length > 0) {
                        focusableElements[focusableElements.length - 1].focus();
                    }
                    break;
            }
        }

        handleMenuKeydown(e) {
            const focusableElements = this.getFocusableElements();
            let currentIndex = focusableElements.indexOf(document.activeElement);
            const activeElement = document.activeElement;
            const isInput = activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');

            // If current element not found in list, try to find closest parent that is
            if (currentIndex === -1 && activeElement) {
                const parentItem = activeElement.closest('.nds-dropmenu-item');
                if (parentItem) {
                    currentIndex = focusableElements.indexOf(parentItem);
                }
            }

            // If still not found, default to -1 to handle as "before first element"
            if (currentIndex === -1) {
                currentIndex = -1;
            }

            switch (e.key) {
                case 'ArrowDown':
                    // In inputs, only navigate if Alt is pressed
                    if (isInput) {
                        if (!e.altKey) {
                            return; // Let input handle normally
                        }
                        e.preventDefault();
                    } else {
                        e.preventDefault();
                    }

                    if (currentIndex === -1 || currentIndex >= focusableElements.length - 1) {
                        focusableElements[0]?.focus(); // Loop to first
                    } else {
                        focusableElements[currentIndex + 1]?.focus();
                    }
                    break;

                case 'ArrowUp':
                    // In inputs, only navigate if Alt is pressed
                    if (isInput) {
                        if (!e.altKey) {
                            return; // Let input handle normally
                        }
                        e.preventDefault();
                    } else {
                        e.preventDefault();
                    }

                    if (currentIndex <= 0) {
                        focusableElements[focusableElements.length - 1]?.focus(); // Loop to last
                    } else {
                        focusableElements[currentIndex - 1]?.focus();
                    }
                    break;

                case 'Home':
                    if (isInput && !e.ctrlKey) return; // Let input handle Home key unless Ctrl is pressed
                    e.preventDefault();
                    focusableElements[0]?.focus();
                    break;

                case 'End':
                    if (isInput && !e.ctrlKey) return; // Let input handle End key unless Ctrl is pressed
                    e.preventDefault();
                    focusableElements[focusableElements.length - 1]?.focus();
                    break;

                case 'Tab':
                    // Always handle Tab to navigate between elements
                    e.preventDefault();
                    if (e.shiftKey) {
                        // Tab backwards
                        if (currentIndex > 0) {
                            focusableElements[currentIndex - 1]?.focus();
                        } else {
                            // Close menu and return focus to trigger
                            this.close();
                            this.trigger.focus();
                        }
                    } else {
                        // Tab forwards
                        if (currentIndex === -1) {
                            // Not in list, focus first element
                            focusableElements[0]?.focus();
                        } else if (currentIndex < focusableElements.length - 1) {
                            focusableElements[currentIndex + 1]?.focus();
                        } else {
                            // Close menu
                            this.close();
                        }
                    }
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

            // Get menu and trigger dimensions
            const menuRect = this.menu.getBoundingClientRect();
            const triggerRect = this.trigger.getBoundingClientRect();
            const edgePadding = 16;

            // Find the content layout container as boundary
            const contentLayout = this.dropmenu.closest('.contentLayout');
            let boundaryRect;

            if (contentLayout) {
                // Use contentLayout bounds
                boundaryRect = contentLayout.getBoundingClientRect();
            } else {
                // Fallback to viewport
                boundaryRect = {
                    left: 0,
                    right: window.innerWidth,
                    top: 0,
                    bottom: window.innerHeight,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            }

            // ==============================================
            // HORIZONTAL POSITIONING
            // ==============================================
            // Check if menu is too close to edges (with padding threshold)
            // Use boundary edges instead of viewport
            const tooCloseLeft = menuRect.left < (boundaryRect.left + edgePadding);
            const tooCloseRight = menuRect.right > (boundaryRect.right - edgePadding * 2);

            if (tooCloseLeft && tooCloseRight) {
                // Menu wider than container - align to side with more space
                const spaceLeft = menuRect.left - boundaryRect.left;
                const spaceRight = boundaryRect.right - menuRect.right;
                this.dropmenu.classList.add(spaceRight > spaceLeft ? 'align-right' : 'align-left');
            } else if (tooCloseLeft) {
                this.dropmenu.classList.add('align-left');
            } else if (tooCloseRight) {
                this.dropmenu.classList.add('align-right');
            }

            // ==============================================
            // VERTICAL POSITIONING
            // ==============================================
            const spaceBelow = boundaryRect.bottom - menuRect.bottom;
            if (spaceBelow < 0) {
                const spaceAbove = triggerRect.top - boundaryRect.top;
                if (spaceAbove > Math.abs(spaceBelow)) {
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
            // Remove document-level event listeners
            if (this.handleOutsideClick) {
                document.removeEventListener('click', this.handleOutsideClick);
            }

            // Remove event listeners by cloning elements
            const newDropmenu = this.dropmenu.cloneNode(true);
            this.dropmenu.replaceWith(newDropmenu);
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
                // Attribute set by constructor's init() method
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

    // Note: Initialization now handled by nds-loader.js unified system
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
