/* NDS.Expandable — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Expandable.init() / .reinit()   scan + initialize .nds-expandable
 *   NDS.Expandable.refresh()            re-measure every initialized container — call this
 *                                       after changing --max-height at runtime
 *   NDS.Expandable.create(container)    instance one container — null when the markup is
 *                                       incomplete; the live one if started
 *   NDS.Expandable.destroy(container)   undo create()
 *   instance.expand() / .collapse() / .toggle()   a no-op when already in that state
 *   instance.refresh()                  re-measure this one
 *   instance.getState()                 {isExpanded, hasButton, maxHeight, actualHeight}
 *   instance.destroy()
 * Events (bubble from the .nds-expandable):
 *   nds:expandable:expanded    detail {container, content, button, isExpanded}
 *   nds:expandable:collapsed   detail {container, content, button, isExpanded}
 * Hooks:
 *   (none — markup only: .nds-expandable wrapping .nds-expandable-content. Put
 *    .nds-expand-all on an ancestor to make sibling containers expand together)
 * Gotchas:
 *   - The Show More / Show Less button is BUILT by the component. Do not author one.
 *   - --max-height on the content sets the clamp (default 300px). px only: it is parsed
 *     with parseInt. It is cached, so changing it at runtime needs a refresh().
 *   - A container that is not rendered measures 0 and is left clamped until it becomes
 *     visible; its size watcher re-measures it then (a tab panel shown, a section opened).
 *   - The instance lives on the root as el.ndsExpandable.
 */
/**
 * NDS Expandable Component
 * Expandable content containers with dynamic "Show More" button functionality
 * Automatically adds expand/collapse button when content exceeds height limit
 */

(function() {
    'use strict';

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.getStrings('expandable', {
        show_more: 'Show More',
        show_less: 'Show Less',
    });

    class NdsExpandable {
        constructor(expandableContainer) {
            this._expandableContainer = expandableContainer;
            // Look for .nds-expandable-content as child element first, then check if the container itself has nds-expandable-content class
            this._contentElement = expandableContainer.querySelector('.nds-expandable-content') ||
                                 (expandableContainer.classList.contains('nds-expandable-content') ? expandableContainer : null);
            // A wrapper between container and content gets named, so _utilities.scss can clip
            // it without a bare `> *:has()` subject (which taxes every data-state write).
            const holder = this._contentElement?.parentElement;
            if (holder && holder !== expandableContainer) holder.classList.add('nds-expandable-clip');
            this._expandButton = null;
            this._isExpanded = false;

            if (!this._contentElement) {
                console.warn('NDS Expandable: No .nds-expandable-content element found in expandable container');
                return;
            }

            this._valid = true;
            // Registered here, not in the sweep, so every construction path —
            // sweep, reinit() and programmatic create() — is reachable and stamped.
            expandableContainer.ndsExpandable = this;
            this.init();
            expandableContainer.setAttribute('data-nds-expandable-initialized', 'true');
        }

        init() {
            // _checkContentHeight (scrollHeight + getComputedStyle) runs from the
            // ResizeObserver's first delivery in _addEventListeners — a free
            // post-layout read. Calling it here would force a reflow during the
            // component-init burst.
            this._addEventListeners();
        }

        _checkContentHeight() {
            // An unrendered panel (inactive tab, display:none) measures 0. That's
            // "unmeasurable", not "fits" — taking the fits branch would strip the
            // CSS clamp via inline max-height:none, so revealing the tab paints the
            // content full-height until the next recheck clamps it back (a >1000px
            // flash on tokens.html). Wait for a delivery with a real box instead;
            // the CSS max-height keeps holding until then.
            if (this._contentElement.scrollHeight === 0) return;

            // Get the max height from CSS custom property or use default
            const maxHeight = this._getMaxHeight();
            const actualHeight = this._contentElement.scrollHeight;

            // Always add button first
            this._addExpandButton();

            // Toggle nds-expand class and show/hide button based on content height
            if (actualHeight > maxHeight) {
                NDS.state.add(this._expandableContainer, 'expandable');
                this._expandButton.style.display = '';
                // Reset inline style to let CSS handle max-height
                this._contentElement.style.maxHeight = '';
            } else {
                NDS.state.remove(this._expandableContainer, 'expandable', 'expanded');
                this._expandButton.style.display = 'none';
                this._isExpanded = false; // Reset expanded state
                // Content that grows past the clamp again shows a collapsed button.
                NDS.aria.expanded(this._expandButton, false);
                strings.set(this._expandButton.querySelector('.nds-label'), 'text', 'show_more');
                // Remove max-height constraint when content fits
                this._contentElement.style.maxHeight = 'none';
            }
        }

        _getMaxHeight() {
            // Cached for resize checks; refresh() clears it
            if (this._cachedMaxHeight === undefined) {
                const computedStyle = getComputedStyle(this._contentElement);
                const maxHeightValue = computedStyle.getPropertyValue('--max-height') || '300px';
                this._cachedMaxHeight = parseInt(maxHeightValue);
            }
            return this._cachedMaxHeight;
        }

        _addExpandButton() {
            // Don't add button if it already exists
            if (this._expandButton) return;

            // Create the expand button
            this._expandButton = document.createElement('button');
            this._expandButton.className = 'nds-btn nds-subtle nds-expand-btn nds-menu-btn nds-md';
            NDS.aria.expanded(this._expandButton, false);

            this._expandButton.innerHTML = '<span class="nds-label"></span>';
            strings.set(this._expandButton.firstChild, 'text', 'show_more');

            // Add button to the parent container (not the content element)
            this._expandableContainer.appendChild(this._expandButton);

            // Setup button click event
            this._expandButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle();
            });
        }

        toggle() {
            if (this._isExpanded) {
                this.collapse();
            } else {
                this.expand();
            }
        }

        expand(syncSiblings = true) {
            if (this._isExpanded) return;
            this._isExpanded = true;

            // Add expanded state to container
            NDS.state.add(this._expandableContainer, 'expanded');

            // Update button state
            if (this._expandButton) {
                NDS.aria.expanded(this._expandButton, true);
                strings.set(this._expandButton.querySelector('.nds-label'), 'text', 'show_less');
            }

            // Sync siblings if parent has nds-expand-all
            if (syncSiblings) {
                this._syncSiblings(true);
            }

            // Dispatch custom event
            this._dispatchEvent('nds:expandable:expanded');
        }

        collapse(syncSiblings = true) {
            if (!this._isExpanded) return;
            this._isExpanded = false;

            // Remove expanded state from container
            NDS.state.remove(this._expandableContainer, 'expanded');

            // Update button state
            if (this._expandButton) {
                NDS.aria.expanded(this._expandButton, false);
                strings.set(this._expandButton.querySelector('.nds-label'), 'text', 'show_more');
            }

            // Sync siblings if parent has nds-expand-all
            if (syncSiblings) {
                this._syncSiblings(false);
            }

            // Dispatch custom event
            this._dispatchEvent('nds:expandable:collapsed');
        }

        _syncSiblings(expand) {
            const parent = this._expandableContainer.closest('.nds-expand-all');
            if (!parent) return;
            // Only direct members sync: an expandable nested inside a member's
            // content neither drives the group nor follows it. Keyed on the
            // group (not "any expandable ancestor") so a group that itself
            // sits inside an expandable still works.
            const isMember = el => el.parentElement.closest('.nds-expandable, .nds-expand-all') === parent;
            if (!isMember(this._expandableContainer)) return;

            // Find all expandable siblings
            const siblings = parent.querySelectorAll('.nds-expandable[data-nds-expandable-initialized]');
            siblings.forEach(sibling => {
                if (sibling === this._expandableContainer || !isMember(sibling)) return;
                if (sibling.ndsExpandable) {
                    if (expand && !sibling.ndsExpandable._isExpanded) {
                        sibling.ndsExpandable.expand(false);
                    } else if (!expand && sibling.ndsExpandable._isExpanded) {
                        sibling.ndsExpandable.collapse(false);
                    }
                }
            });
        }

        _addEventListeners() {
            // The RO's first delivery runs the initial _checkContentHeight — it
            // fires once _contentElement has a real box, post-layout, so the
            // scrollHeight/getComputedStyle reads are free. Later deliveries are
            // debounced to coalesce resize storms.
            let firstMeasure = true;
            const debounced = NDS.debounce(() => this._checkContentHeight(), 100);
            this._offResize = NDS.onElementResize(this._contentElement, () => {
                if (firstMeasure) {
                    firstMeasure = false;
                    this._checkContentHeight();
                } else {
                    debounced();
                }
            });
        }

        _dispatchEvent(eventType) {
            const event = new CustomEvent(eventType, {
                detail: {
                    container: this._expandableContainer,
                    content: this._contentElement,
                    button: this._expandButton,
                    isExpanded: this._isExpanded
                },
                bubbles: true
            });

            this._expandableContainer.dispatchEvent(event);
        }

        refresh() {
            // Force recheck of content height (useful when element becomes visible)
            this._cachedMaxHeight = undefined;
            this._checkContentHeight();
        }


        getState() {
            return {
                isExpanded: this._isExpanded,
                hasButton: !!this._expandButton,
                maxHeight: this._getMaxHeight(),
                actualHeight: this._contentElement.scrollHeight
            };
        }

        destroy() {
            // Clean up shared ResizeObserver
            if (this._offResize) {
                this._offResize();
                this._offResize = null;
            }

            // Remove button if it exists
            if (this._expandButton) {
                this._expandButton.remove();
                this._expandButton = null;
            }

            // Remove states
            NDS.state.remove(this._expandableContainer, 'expanded', 'expandable');

            // Drop the instance back-ref and the init sentinel last: leaving either on
            // makes teardown one-way — the init sweep skips a stamped container and
            // create() hands back the dead instance, so a view that unmounts and mounts
            // again gets markup no live instance will ever claim.
            delete this._expandableContainer.ndsExpandable;
            this._expandableContainer.removeAttribute('data-nds-expandable-initialized');
        }
    }

    // Synchronous: the loader schedules init, and NDS.init.ready promises el.ndsExpandable after it.
    function setupExpandableContent() {
        document.querySelectorAll('.nds-expandable').forEach(container => {
            // Skip elements rendered inside <code> tags (markup text, not live components)
            if (container.closest('code')) return;
            // Only a valid construction stamps, so content that renders late stays eligible.
            if (!container.hasAttribute('data-nds-expandable-initialized')) new NdsExpandable(container);
        });
    }

    // Recheck height for all initialized expandable elements
    function syncAllHeights() {
        // Keyed on the instance, not the sweep's stamp, so create()-built
        // containers are rechecked too.
        const expandableContainers = document.querySelectorAll('.nds-expandable');
        expandableContainers.forEach(container => {
            if (container.ndsExpandable && container.ndsExpandable.refresh) {
                container.ndsExpandable.refresh();
            }
        });
    }

    // Assigned at module eval so the loader's lazy stub resolves.
    NDS.Expandable = {
        init: setupExpandableContent,
        reinit: setupExpandableContent,
        refresh: syncAllHeights,
        create: (container) => {
            if (container.ndsExpandable) return container.ndsExpandable;
            const instance = new NdsExpandable(container);
            return instance._valid ? instance : null;
        },
        destroy: (container) => container?.ndsExpandable?.destroy(),
    };

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
 * const expandableInstance = NDS.Expandable.create(expandableElement);
 *
 * // Programmatic control
 * expandableInstance.expand();    // Expand content
 * expandableInstance.collapse();  // Collapse content
 * expandableInstance.toggle();    // Toggle state
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
 * NDS.Expandable.reinit();
 *
 * // CSS Custom Properties:
 * // --max-height: Set custom height limit (default: 300px)
 * // Example: <div class="nds-expandable" style="--max-height: 200px;">
 */