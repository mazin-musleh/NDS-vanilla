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
        return NDS.isArabic ? 'ar' : 'en';
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
                NDS.State.add(this.expandableContainer, 'expandable');
                this.expandButton.style.display = '';
                // Reset inline style to let CSS handle max-height
                this.contentElement.style.maxHeight = '';
            } else {
                NDS.State.remove(this.expandableContainer, 'expandable', 'expanded');
                this.expandButton.style.display = 'none';
                this.isExpanded = false; // Reset expanded state
                // Remove max-height constraint when content fits
                this.contentElement.style.maxHeight = 'none';
            }
        }

        getMaxHeight() {
            // Cache the CSS custom property — it doesn't change at runtime
            if (this._cachedMaxHeight === undefined) {
                const computedStyle = getComputedStyle(this.contentElement);
                const maxHeightValue = computedStyle.getPropertyValue('--max-height') || '300px';
                this._cachedMaxHeight = parseInt(maxHeightValue);
            }
            return this._cachedMaxHeight;
        }

        addExpandButton() {
            // Don't add button if it already exists
            if (this.expandButton) return;

            // Create the expand button
            this.expandButton = document.createElement('button');
            this.expandButton.className = 'nds-btn nds-subtle nds-expand-btn nds-menu-btn nds-md';
            this.expandButton.setAttribute('aria-label', 'Expand content');
            this.expandButton.setAttribute('aria-expanded', 'false');

            this.expandButton.innerHTML = `<span class="nds-label">${labels[getLang()].showMore}</span>`;

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

            // Add expanded state to container
            NDS.State.add(this.expandableContainer, 'expanded');

            // Update button state
            if (this.expandButton) {
                this.expandButton.setAttribute('aria-expanded', 'true');
                this.expandButton.setAttribute('aria-label', 'Menu');
                this.expandButton.querySelector('.nds-label').textContent = labels[getLang()].showLess;
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

            // Remove expanded state from container
            NDS.State.remove(this.expandableContainer, 'expanded');

            // Update button state
            if (this.expandButton) {
                this.expandButton.setAttribute('aria-expanded', 'false');
                this.expandButton.setAttribute('aria-label', 'Menu');
                this.expandButton.querySelector('.nds-label').textContent = labels[getLang()].showMore;
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
                if (sibling.ndsExpandable) {
                    if (expand && !sibling.ndsExpandable.isExpanded) {
                        sibling.ndsExpandable.expand(false);
                    } else if (!expand && sibling.ndsExpandable.isExpanded) {
                        sibling.ndsExpandable.collapse(false);
                    }
                }
            });
        }

        setupEventListeners() {
            // Watch content element for size changes
            this._offResize = NDS.onElementResize(this.contentElement, NDS.debounce(() => {
                this.checkContentHeight();
            }, 100));
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
            // Clean up shared ResizeObserver
            if (this._offResize) {
                this._offResize();
                this._offResize = null;
            }

            // Remove button if it exists
            if (this.expandButton) {
                this.expandButton.remove();
                this.expandButton = null;
            }

            // Remove states
            NDS.State.remove(this.expandableContainer, 'expanded', 'expandable');
        }
    }

    // Auto-initialize expandable content on page load
    function initializeExpandableContent() {
        const expandableContainers = document.querySelectorAll('.nds-expandable');

        expandableContainers.forEach(container => {
            // Skip elements rendered inside <code> tags (markup text, not live components)
            if (container.closest('code')) {
                return;
            }

            if (!container.hasAttribute('data-nds-expandable-initialized')) {
                const expandableInstance = new NDSExpandable(container);
                container.ndsExpandable = expandableInstance;
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
            if (container.ndsExpandable && container.ndsExpandable.recheckHeight) {
                container.ndsExpandable.recheckHeight();
            }
        });
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        NDS.Expandable = {
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

    // Note: Initialization now handled by nds-loader.js unified system
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