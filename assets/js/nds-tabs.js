/**
 * NDS Tabs Component
 * Provides accessible tab navigation functionality with proper ARIA support
 * Based on WAI-ARIA Authoring Practices Guide
 */

(function() {
    'use strict';

    // Tab component class
    class NDSTabs {
        constructor(tabsContainer) {
            this.tabsContainer = tabsContainer;
            this.tabList = tabsContainer.querySelector('.nds-tab-list');
            this.tabs = Array.from(tabsContainer.querySelectorAll('.nds-tab'));
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

        setupEventListeners() {
            // Click events
            this.tabs.forEach((tab, index) => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchToTab(index);
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
            const isRTL = document.documentElement.dir === 'rtl' || 
                         document.documentElement.getAttribute('dir') === 'rtl' ||
                         getComputedStyle(document.documentElement).direction === 'rtl';
            
            // Check if this is a vertical tab layout
            const isVertical = this.tabsContainer.classList.contains('nds-tabs-vertical');

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    if (isVertical) {
                        // In vertical tabs, left/right arrows don't navigate
                        return;
                    }
                    if (isRTL) {
                        // In RTL, left arrow goes to next tab
                        targetIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
                    } else {
                        // In LTR, left arrow goes to previous tab
                        targetIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
                    }
                    break;

                case 'ArrowRight':
                    e.preventDefault();
                    if (isVertical) {
                        // In vertical tabs, left/right arrows don't navigate
                        return;
                    }
                    if (isRTL) {
                        // In RTL, right arrow goes to previous tab
                        targetIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
                    } else {
                        // In LTR, right arrow goes to next tab
                        targetIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
                    }
                    break;

                case 'ArrowUp':
                    e.preventDefault();
                    targetIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1;
                    break;

                case 'ArrowDown':
                    e.preventDefault();
                    targetIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0;
                    break;

                case 'Home':
                    e.preventDefault();
                    if (isVertical) {
                        targetIndex = 0;
                    } else {
                        targetIndex = isRTL ? this.tabs.length - 1 : 0;
                    }
                    break;

                case 'End':
                    e.preventDefault();
                    if (isVertical) {
                        targetIndex = this.tabs.length - 1;
                    } else {
                        targetIndex = isRTL ? 0 : this.tabs.length - 1;
                    }
                    break;

                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.switchToTab(currentIndex);
                    return;

                default:
                    return;
            }

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
            panel.classList.remove('hidden');
            panel.setAttribute('tabindex', '0');
        }

        deactivateTab(tab, index) {
            const panel = this.panels[index];
            
            if (!panel) return;

            // Update tab attributes
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');

            // Hide panel
            panel.classList.add('hidden');
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
            if (!container.hasAttribute('data-nds-tabs-initialized')) {
                const tabsInstance = new NDSTabs(container);
                container.ndsTabsInstance = tabsInstance;
                container.setAttribute('data-nds-tabs-initialized', 'true');
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTabs);
    } else {
        initializeTabs();
    }

    // Re-initialize when new content is added
    function reinitializeTabs() {
        initializeTabs();
    }

    // Public API
    window.NDSTabs = {
        init: initializeTabs,
        reinit: reinitializeTabs,
        create: (container) => new NDSTabs(container)
    };

    // Export for modules
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSTabs;
    }
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