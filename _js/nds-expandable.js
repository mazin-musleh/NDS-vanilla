/**
 * NDS Expandable Component
 * Expandable content containers with dynamic "Show More" button functionality
 * Automatically adds expand/collapse button when content exceeds height limit
 */

(function() {
    'use strict';

    // Language labels
    const labels = {
        en: { showMore: 'Show More', showLess: 'Show Less' },
        ar: { showMore: 'عرض المزيد', showLess: 'عرض أقل' }
    };

    function getLang() {
        return document.documentElement.lang?.startsWith('ar') ? 'ar' : 'en';
    }

    class NDSExpandable {
        constructor(expandableContainer) {
            this.expandableContainer = expandableContainer;
            // Look for .nds-expandable-content as child element first, then check if the container itself has nds-expandable-content class
            this.contentElement = expandableContainer.querySelector('.nds-expandable-content') ||
                                 (expandableContainer.classList.contains('nds-expandable-content') ? expandableContainer : null);
            this.expandButton = null;
            this.isExpanded = false;

            if (!this.contentElement) {
                console.warn('NDS Expandable: No .nds-expandable-content element found in expandable container');
                return;
            }

            this.init();
        }

        init() {
            this.checkContentHeight();
            this.setupEventListeners();
        }

        checkContentHeight() {
            // Get the max height from CSS custom property or use default
            const maxHeight = this.getMaxHeight();
            const actualHeight = this.contentElement.scrollHeight;

            // Always add button first
            this.addExpandButton();

            // Toggle nds-expand class and show/hide button based on content height
            if (actualHeight > maxHeight) {
                this.expandableContainer.classList.add('nds-expand');
                this.expandButton.style.display = '';
                // Reset inline style to let CSS handle max-height
                this.contentElement.style.maxHeight = '';
            } else {
                this.expandableContainer.classList.remove('nds-expand');
                this.expandableContainer.classList.remove('nds-expanded'); // Remove expanded state if no longer needed
                this.expandButton.style.display = 'none';
                this.isExpanded = false; // Reset expanded state
                // Remove max-height constraint when content fits
                this.contentElement.style.maxHeight = 'none';
            }
        }

        getMaxHeight() {
            const computedStyle = getComputedStyle(this.contentElement);
            const maxHeightValue = computedStyle.getPropertyValue('--max-height') || '300px';
            return parseInt(maxHeightValue);
        }

        addExpandButton() {
            // Don't add button if it already exists
            if (this.expandButton) return;

            // Create the expand button
            this.expandButton = document.createElement('button');
            this.expandButton.className = 'nds-btn nds-subtle nds-expand-btn nds-menu-btn nds-md';
            this.expandButton.setAttribute('aria-label', 'Expand content');
            this.expandButton.setAttribute('aria-expanded', 'false');

            this.expandButton.innerHTML = `<span class="label">${labels[getLang()].showMore}</span>`;

            // Add button to the parent container (not the content element)
            this.expandableContainer.appendChild(this.expandButton);

            // Setup button click event
            this.expandButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
        }

        toggle() {
            if (this.isExpanded) {
                this.collapse();
            } else {
                this.expand();
            }
        }

        expand(syncSiblings = true) {
            this.isExpanded = true;

            // Add expanded class to container
            this.expandableContainer.classList.add('nds-expanded');

            // Update button state
            if (this.expandButton) {
                this.expandButton.setAttribute('aria-expanded', 'true');
                this.expandButton.setAttribute('aria-label', 'Menu');
                this.expandButton.querySelector('.label').textContent = labels[getLang()].showLess;
            }

            // Sync siblings if parent has nds-expand-all
            if (syncSiblings) {
                this.syncSiblings(true);
            }

            // Dispatch custom event
            this.dispatchEvent('nds:expandable:expanded');
        }

        collapse(syncSiblings = true) {
            this.isExpanded = false;

            // Remove expanded class from container
            this.expandableContainer.classList.remove('nds-expanded');

            // Update button state
            if (this.expandButton) {
                this.expandButton.setAttribute('aria-expanded', 'false');
                this.expandButton.setAttribute('aria-label', 'Menu');
                this.expandButton.querySelector('.label').textContent = labels[getLang()].showMore;
            }

            // Sync siblings if parent has nds-expand-all
            if (syncSiblings) {
                this.syncSiblings(false);
            }

            // Dispatch custom event
            this.dispatchEvent('nds:expandable:collapsed');
        }

        syncSiblings(expand) {
            const parent = this.expandableContainer.closest('.nds-expand-all');
            if (!parent) return;

            // Find all expandable siblings
            const siblings = parent.querySelectorAll('.nds-expandable[data-nds-expandable-initialized]');
            siblings.forEach(sibling => {
                if (sibling === this.expandableContainer) return;
                if (sibling.ndsExpandableInstance) {
                    if (expand && !sibling.ndsExpandableInstance.isExpanded) {
                        sibling.ndsExpandableInstance.expand(false);
                    } else if (!expand && sibling.ndsExpandableInstance.isExpanded) {
                        sibling.ndsExpandableInstance.collapse(false);
                    }
                }
            });
        }

        setupEventListeners() {
            // Use ResizeObserver for better element-specific size detection
            if (window.ResizeObserver) {
                this.resizeObserver = new ResizeObserver(entries => {
                    // Debounce for performance (shorter delay since it's more targeted)
                    clearTimeout(this.resizeTimer);
                    this.resizeTimer = setTimeout(() => {
                        this.checkContentHeight();
                    }, 100);
                });

                // Observe the content element for size changes
                this.resizeObserver.observe(this.contentElement);
            } else {
                // Fallback to window resize for older browsers
                window.addEventListener('resize', () => {
                    this.handleResize();
                });
            }
        }

        handleResize() {
            // Debounce resize events (fallback method)
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                this.checkContentHeight();
            }, 250);
        }

        dispatchEvent(eventType) {
            const event = new CustomEvent(eventType, {
                detail: {
                    container: this.expandableContainer,
                    content: this.contentElement,
                    button: this.expandButton,
                    isExpanded: this.isExpanded
                },
                bubbles: true
            });

            this.expandableContainer.dispatchEvent(event);
        }

        // Public API methods
        expandContent() {
            if (!this.isExpanded) {
                this.expand();
            }
        }

        recheckHeight() {
            // Force recheck of content height (useful when element becomes visible)
            this.checkContentHeight();
        }


        collapseContent() {
            if (this.isExpanded) {
                this.collapse();
            }
        }

        toggleContent() {
            this.toggle();
        }

        getState() {
            return {
                isExpanded: this.isExpanded,
                hasButton: !!this.expandButton,
                maxHeight: this.getMaxHeight(),
                actualHeight: this.contentElement.scrollHeight
            };
        }

        destroy() {
            // Clean up ResizeObserver
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
                this.resizeObserver = null;
            }

            // Remove button if it exists
            if (this.expandButton) {
                this.expandButton.remove();
                this.expandButton = null;
            }

            // Clear resize timer
            if (this.resizeTimer) {
                clearTimeout(this.resizeTimer);
            }

            // Remove classes
            this.expandableContainer.classList.remove('nds-expanded', 'nds-expand');
        }
    }

    // Auto-initialize expandable content on page load
    function initializeExpandableContent() {
        const expandableContainers = document.querySelectorAll('.nds-expandable');

        expandableContainers.forEach(container => {
            // Skip elements inside code examples but NOT the code examples themselves
            if (container.closest('code') && !container.matches('code')) {
                return;
            }

            if (!container.hasAttribute('data-nds-expandable-initialized')) {
                const expandableInstance = new NDSExpandable(container);
                container.ndsExpandableInstance = expandableInstance;
                container.setAttribute('data-nds-expandable-initialized', 'true');
            }
        });
    }

    // Re-initialize when new content is added
    function reinitializeExpandableContent() {
        initializeExpandableContent();
    }

    // Recheck height for all initialized expandable elements
    function recheckAllHeights() {
        const expandableContainers = document.querySelectorAll('.nds-expandable[data-nds-expandable-initialized]');
        expandableContainers.forEach(container => {
            if (container.ndsExpandableInstance && container.ndsExpandableInstance.recheckHeight) {
                container.ndsExpandableInstance.recheckHeight();
            }
        });
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        window.NDSExpandable = {
            init: initializeExpandableContent,
            reinit: reinitializeExpandableContent,
            recheckHeights: recheckAllHeights,
            create: (container) => new NDSExpandable(container)
        };
    }

    // Export for modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSExpandable;
    }

    // Note: Initialization now handled by nds-init.js unified system
})();

/**
 * Usage Examples:
 *
 * // Auto-initialization (happens automatically)
 * // Just add the HTML structure:
 * // <div class="nds-expandable">
 * //   <div class="nds-expandable-content">
 * //     <!-- Your content here -->
 * //   </div>
 * // </div>
 *
 * // Manual initialization
 * const expandableElement = document.querySelector('#myExpandable');
 * const expandableInstance = NDSExpandable.create(expandableElement);
 *
 * // Programmatic control
 * expandableInstance.expandContent();    // Expand content
 * expandableInstance.collapseContent();  // Collapse content
 * expandableInstance.toggleContent();    // Toggle state
 *
 * // Get current state
 * const state = expandableInstance.getState();
 * console.log('Is expanded:', state.isExpanded);
 * console.log('Has button:', state.hasButton);
 *
 * // Listen for expandable events
 * document.addEventListener('nds:expandable:expanded', (e) => {
 *     console.log('Content expanded:', e.detail);
 * });
 *
 * document.addEventListener('nds:expandable:collapsed', (e) => {
 *     console.log('Content collapsed:', e.detail);
 * });
 *
 * // Reinitialize after dynamic content changes
 * NDSExpandable.reinit();
 *
 * // CSS Custom Properties:
 * // --max-height: Set custom height limit (default: 300px)
 * // Example: <div class="nds-expandable" style="--max-height: 200px;">
 */