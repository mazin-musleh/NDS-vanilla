/**
 * NDS Tabs Component
 * Simple, accessible tab navigation functionality
 * Based on WAI-ARIA Authoring Practices Guide
 */

(function() {
    'use strict';
 
    class NDSTabs {
        constructor(tabsContainer) {
            this.tabsContainer = tabsContainer;
            this.tabList = tabsContainer.querySelector('.nds-tab-list');
            this.tabs = Array.from(tabsContainer.querySelectorAll('.nds-tab:not(.showMore)'));
            this.panels = Array.from(tabsContainer.querySelectorAll('.nds-tab-panel'));
            
            if (!this.tabList || this.tabs.length === 0 || this.panels.length === 0) {
                console.warn('NDS Tabs: Invalid tab structure found');
                return;
            }

            this.currentTabIndex = this.findActiveTabIndex();
            this.init();
        }

        init() {
            this.setupEventListeners();
            this.setupInitialState();
            this.setupScrollBehavior();
        }

        findActiveTabIndex() {
            const activeTab = this.tabs.find(tab => tab.getAttribute('aria-selected') === 'true');
            return activeTab ? this.tabs.indexOf(activeTab) : 0;
        }

        setupInitialState() {
            // Ensure only one tab is active
            this.tabs.forEach((tab, index) => {
                if (index === this.currentTabIndex) {
                    this.activateTab(tab, index);
                } else {
                    this.deactivateTab(tab, index);
                }
            });
        }

        // ==============================================
        // SCROLL BEHAVIOR (cloned from oneRowContent)
        // ==============================================

        setupScrollBehavior() {
            if (!this.tabList) return;

            // Skip for vertical tabs
            if (this.tabsContainer.classList.contains('nds-vertical')) {
                return;
            }

            // Set initial scroll behavior
            this.tabList.style.scrollBehavior = 'smooth';

            // Initialize drag state
            this.dragState = { active: false, startX: 0, scrollLeft: 0, hasDragged: false };

            // Setup all scroll-related event listeners
            this.setupScrollEventListeners();

            // Initial overflow check
            setTimeout(() => this.updateScrollIndicators(), 200);
        }

        needsScroll() {
            if (!this.tabList) return false;

            // Skip for vertical tabs
            if (this.tabsContainer.classList.contains('nds-vertical')) {
                return false;
            }

            // Use the nearest stable ancestor's width as available space
            // This prevents infinite toggle loops when tabList or its container has fit-content width
            const listContainer = this.tabList.closest('.nds-tab-list-container');
            const stableAncestor = listContainer ? listContainer.parentElement : this.tabList.parentElement;
            const availableWidth = stableAncestor ? stableAncestor.clientWidth : this.tabList.clientWidth;

            // Don't subtract button width - flexbox handles layout
            const children = Array.from(this.tabList.children);
            const contentWidth = children
                .filter(child => !child.classList.contains('showMore'))
                .reduce((total, child) => total + child.offsetWidth, 0);

            return contentWidth > availableWidth;
        }

        updateScrollIndicators() {
            if (!this.tabList) return;

            // Skip for vertical tabs
            if (this.tabsContainer.classList.contains('nds-vertical')) {
                this.tabList.classList.remove('hasMore', 'atStart', 'atEnd');
                return;
            }

            const hasOverflow = this.needsScroll();
            this.tabList.classList.toggle('hasMore', hasOverflow);

            if (hasOverflow) {
                const { scrollLeft, scrollWidth, clientWidth } = this.tabList;
                const maxScroll = scrollWidth - clientWidth;
                const isRTL = NDS.isRTL;

                let atStart, atEnd;

                if (isRTL) {
                    atStart = Math.abs(scrollLeft) <= 2;
                    atEnd = Math.abs(scrollLeft) >= maxScroll - 2;
                } else {
                    atStart = scrollLeft <= 2;
                    atEnd = scrollLeft >= maxScroll - 2;
                }

                this.tabList.classList.toggle('atStart', atStart);
                this.tabList.classList.toggle('atEnd', atEnd);
            } else {
                this.tabList.classList.remove('atStart', 'atEnd');
            }
        }

        scrollToTarget(target) {
            if (!this.tabList || !target) return;

            target.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
                scrollMode: 'if-needed'
            });

            setTimeout(() => this.updateScrollIndicators(), 300);
        }

        setupScrollEventListeners() {
            if (!this.tabList) return;

            // Click handler for tabs - scroll into view on click
            this.tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    if (this.dragState.hasDragged) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }

                    if (!this.needsScroll()) return;

                    // Don't interfere with normal tab switching
                    setTimeout(() => this.scrollToTarget(tab), 10);
                });
            });

            // ShowMore button click handler
            // Button is now outside .nds-tab-list, query from parent container
            const showMoreBtn = this.tabList.parentElement.querySelector('.showMore');
            if (showMoreBtn) {
                showMoreBtn.addEventListener('click', (e) => {
                    if (!this.needsScroll()) return;

                    e.preventDefault();
                    e.stopPropagation();

                    if (this.tabList.classList.contains('atEnd')) {
                        this.tabList.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        const scrollAmount = this.tabList.clientWidth * 0.8;
                        const isRTL = NDS.isRTL;
                        const currentScroll = this.tabList.scrollLeft;
                        this.tabList.scrollTo({
                            left: isRTL ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                            behavior: 'smooth'
                        });
                    }

                    setTimeout(() => this.updateScrollIndicators(), 300);
                });
            }

            // Mouse wheel horizontal scroll
            let isScrolling = false;
            this.tabList.addEventListener('wheel', (e) => {
                if (this.tabsContainer.classList.contains('nds-vertical')) return;
                if (!this.needsScroll()) return;
                if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;

                e.preventDefault();
                if (isScrolling) return;

                isScrolling = true;
                this.tabList.style.scrollBehavior = 'auto';

                const isRTL = NDS.isRTL;
                const scrollMultiplier = isRTL ? -0.8 : 0.8;
                const scrollAmount = e.deltaY * scrollMultiplier;
                const startScroll = this.tabList.scrollLeft;
                let frame = 0;
                const duration = 150;

                const animate = () => {
                    frame += 16;
                    const progress = Math.min(frame / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);

                    this.tabList.scrollLeft = startScroll + (scrollAmount * easeOut);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        isScrolling = false;
                        this.tabList.style.scrollBehavior = 'smooth';
                        this.updateScrollIndicators();
                    }
                };
                requestAnimationFrame(animate);
            }, { passive: false });

            // Drag scroll functionality — listeners added only during active drag
            const handleMouseUp = () => {
                this.dragState.active = false;
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                Object.assign(this.tabList.style, {
                    cursor: '',
                    userSelect: '',
                    scrollBehavior: 'smooth'
                });

                if (this.dragState.hasDragged) {
                    setTimeout(() => {
                        this.dragState.hasDragged = false;
                    }, 100);
                }
            };

            const handleMouseMove = (e) => {
                if (this.tabsContainer.classList.contains('nds-vertical')) {
                    handleMouseUp();
                    return;
                }
                e.preventDefault();

                if (Math.abs(e.pageX - this.dragState.startX) > 3) {
                    this.dragState.hasDragged = true;
                }

                this.tabList.scrollLeft = this.dragState.scrollLeft - (e.pageX - this.dragState.startX) * 1.0;
                this.updateScrollIndicators();
            };

            this.tabList.addEventListener('mousedown', (e) => {
                if (this.tabsContainer.classList.contains('nds-vertical')) return;
                if (!this.needsScroll()) return;

                this.dragState = {
                    active: true,
                    startX: e.pageX,
                    scrollLeft: this.tabList.scrollLeft,
                    hasDragged: false
                };

                Object.assign(this.tabList.style, {
                    cursor: 'grabbing',
                    userSelect: 'none',
                    scrollBehavior: 'auto'
                });

                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            });

            // Watch tab list for size changes
            this._offResize = NDS.onElementResize(this.tabList, NDS.debounce(() => {
                this.updateScrollIndicators();
            }, 100));

            // Scroll event listener for updating indicators (RAF throttled)
            let scrollTicking = false;
            this.tabList.addEventListener('scroll', () => {
                if (!scrollTicking) {
                    scrollTicking = true;
                    requestAnimationFrame(() => {
                        this.updateScrollIndicators();
                        scrollTicking = false;
                    });
                }
            }, { passive: true });
        }

        // ==============================================
        // END SCROLL BEHAVIOR
        // ==============================================

        setupEventListeners() {
            // Click events
            this.tabs.forEach((tab, index) => {
                tab.addEventListener('click', (e) => {
                    // Only prevent default if tab is a link to avoid navigation
                    if (tab.tagName.toLowerCase() === 'a' && tab.getAttribute('href')) {
                        e.preventDefault();
                    }
                    
                    this.switchToTab(index);
                    
                    // For mouse clicks, don't force focus - let browser handle naturally
                    // This prevents visible focus ring from appearing on mouse interaction
                });
            });

            // Keyboard events
            this.tabList.addEventListener('keydown', (e) => {
                this.handleKeyDown(e);
            });

            // Focus events for better accessibility
            this.tabs.forEach((tab, index) => {
                tab.addEventListener('focus', () => {
                    this.handleTabFocus(index);
                });
            });
        }

        handleKeyDown(e) {
            const currentTab = e.target;
            if (!currentTab.classList.contains('nds-tab')) return;

            const currentIndex = this.tabs.indexOf(currentTab);
            let targetIndex = currentIndex;
            
            // Check if we're in RTL mode
            const isRTL = NDS.isRTL;
            
            // Check if this is a vertical tab layout
            const isVertical = this.tabsContainer.classList.contains('nds-vertical');

            switch (e.key) {
                case 'ArrowLeft':
                    if (isVertical) {
                        return;
                    }
                    if (isRTL) {
                        targetIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
                    } else {
                        targetIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
                    }
                    break;

                case 'ArrowRight':
                    if (isVertical) {
                        return;
                    }
                    if (isRTL) {
                        targetIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
                    } else {
                        targetIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
                    }
                    break;

                case 'ArrowUp':
                    targetIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
                    break;

                case 'ArrowDown':
                    targetIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
                    break;

                case 'Home':
                    targetIndex = isRTL && !isVertical ? this.tabs.length - 1 : 0;
                    break;

                case 'End':
                    targetIndex = isRTL && !isVertical ? 0 : this.tabs.length - 1;
                    break;

                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.switchToTab(currentIndex);
                    return;

                default:
                    return;
            }

            e.preventDefault();
            this.focusTab(targetIndex);
        }

        handleTabFocus(index) {
            // Update tabindex for roving focus
            this.tabs.forEach((tab, i) => {
                tab.setAttribute('tabindex', i === index ? '0' : '-1');
            });
        }

        focusTab(index) {
            if (index >= 0 && index < this.tabs.length) {
                this.tabs[index].focus();
            }
        }

        switchToTab(index) {
            if (index === this.currentTabIndex || index < 0 || index >= this.tabs.length) {
                return;
            }

            const previousTab = this.tabs[this.currentTabIndex];
            const newTab = this.tabs[index];

            // Deactivate previous tab
            this.deactivateTab(previousTab, this.currentTabIndex);

            // Activate new tab
            this.activateTab(newTab, index);

            // Update current tab index
            this.currentTabIndex = index;

            // Dispatch custom event
            this.dispatchTabChangeEvent(index, previousTab, newTab);
        }

        activateTab(tab, index) {
            const panel = this.panels[index];

            if (!panel) return;

            // Update tab attributes
            tab.setAttribute('aria-selected', 'true');
            tab.setAttribute('tabindex', '0');

            // Show panel
            panel.removeAttribute('aria-hidden');
            panel.removeAttribute('hidden');
            panel.setAttribute('tabindex', '0');

            // Recheck height for expandable components now that they're visible
            if (NDS.Expandable && NDS.Expandable.recheckHeights) {
                setTimeout(() => {
                    NDS.Expandable.recheckHeights();
                }, 10);
            }
        }

        deactivateTab(tab, index) {
            const panel = this.panels[index];

            if (!panel) return;

            // Update tab attributes
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');

            // Hide panel
            panel.setAttribute('aria-hidden', 'true');
            panel.setAttribute('hidden', '');
            panel.setAttribute('tabindex', '-1');
        }

        dispatchTabChangeEvent(index, previousTab, newTab) {
            const event = new CustomEvent('nds:tab:change', {
                detail: {
                    tabIndex: index,
                    tab: newTab,
                    panel: this.panels[index],
                    previousTab: previousTab,
                    previousPanel: this.panels[this.tabs.indexOf(previousTab)]
                },
                bubbles: true
            });

            this.tabsContainer.dispatchEvent(event);
        }

        // Public API methods
        getActiveTabIndex() {
            return this.currentTabIndex;
        }

        getActiveTab() {
            return this.tabs[this.currentTabIndex];
        }

        getActivePanel() {
            return this.panels[this.currentTabIndex];
        }

        switchTo(index) {
            this.switchToTab(index);
        }

        destroy() {
            // Clean up shared ResizeObserver
            if (this._offResize) {
                this._offResize();
                this._offResize = null;
            }

            // Clean up resize timer
            if (this.resizeTimer) {
                clearTimeout(this.resizeTimer);
            }

            // Clean up scroll behavior event listeners (fallback for older browsers)
            if (this.resizeHandler) {
                window.removeEventListener('resize', this.resizeHandler);
            }

            // Remove event listeners and clean up
            this.tabs.forEach(tab => {
                tab.replaceWith(tab.cloneNode(true));
            });
            this.tabList.replaceWith(this.tabList.cloneNode(true));
        }
    }

    // Auto-initialize tabs on page load
    function initializeTabs() {
        const tabContainers = document.querySelectorAll('.nds-tabs');
        
        tabContainers.forEach(container => {
            // Skip elements inside code examples
            if (container.closest('code, .code-example')) {
                return;
            }
            
            if (!container.hasAttribute('data-nds-tabs-initialized')) {
                const tabsInstance = new NDSTabs(container);
                container.ndsTabsInstance = tabsInstance;
                container.setAttribute('data-nds-tabs-initialized', 'true');
            }
        });
    }

    // Re-initialize when new content is added
    function reinitializeTabs() {
        initializeTabs();
    }

    // CRITICAL: Expose global API immediately (called by unified init system)
    if (typeof window !== 'undefined') {
        NDS.Tabs = {
            init: initializeTabs,
            reinit: reinitializeTabs,
            create: (container) => new NDSTabs(container)
        };
    }

    // Export for modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSTabs;
    }

    // Note: Initialization now handled by nds-loader.js unified system
})();

/**
 * Usage Examples:
 * 
 * // Auto-initialization (happens automatically)
 * // Just add the HTML structure with .nds-tabs class
 * 
 * // Manual initialization
 * const tabsElement = document.querySelector('#myTabs');
 * const tabsInstance = NDSTabs.create(tabsElement);
 * 
 * // Programmatic tab switching
 * tabsInstance.switchTo(1); // Switch to second tab
 * 
 * // Get current state
 * const activeIndex = tabsInstance.getActiveTabIndex();
 * const activeTab = tabsInstance.getActiveTab();
 * const activePanel = tabsInstance.getActivePanel();
 * 
 * // Listen for tab changes
 * document.addEventListener('nds:tab:change', (e) => {
 *     console.log('Tab changed to:', e.detail.tabIndex);
 *     console.log('New tab:', e.detail.tab);
 *     console.log('New panel:', e.detail.panel);
 * });
 * 
 * // Reinitialize after dynamic content changes
 * NDSTabs.reinit();
 */