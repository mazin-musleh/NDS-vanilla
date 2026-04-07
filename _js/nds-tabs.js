/**
 * NDS Tabs Component
 * Accessible tab navigation with horizontal and vertical layouts
 * Based on WAI-ARIA Authoring Practices Guide
 */

(function() {
    'use strict';

    class NDSTabs {
        constructor(tabsContainer) {
            this.tabsContainer = tabsContainer;
            this.tabList = tabsContainer.querySelector('.nds-tab-list');
            this.tabs = Array.from(tabsContainer.querySelectorAll('.nds-tab:not(.nds-show-more)'));
            this.panels = Array.from(tabsContainer.querySelectorAll('.nds-tab-panel'));

            if (!this.tabList || this.tabs.length === 0 || this.panels.length === 0) {
                console.warn('NDS Tabs: Invalid tab structure found');
                return;
            }

            this.currentTabIndex = this.findActiveTabIndex();
            this.init();
        }

        get isVertical() {
            return this.tabsContainer.classList.contains('nds-vertical');
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
            this.tabs.forEach((tab, index) => {
                if (index === this.currentTabIndex) {
                    this.activateTab(tab, index);
                } else {
                    this.deactivateTab(tab, index);
                }
            });
        }

        // ==============================================
        // SCROLL BEHAVIOR
        // ==============================================

        setupScrollBehavior() {
            if (!this.tabList || this.isVertical) return;

            this.tabList.style.scrollBehavior = 'smooth';
            this.dragState = { active: false, startX: 0, scrollLeft: 0, hasDragged: false };

            this.setupScrollEventListeners();

            // Initial overflow check
            setTimeout(() => this.updateScrollIndicators(), 200);
        }

        needsScroll() {
            if (!this.tabList || this.isVertical) return false;

            // Use the nearest stable ancestor's width as available space
            // This prevents infinite toggle loops when tabList or its container has fit-content width
            const listContainer = this.tabList.closest('.nds-tab-list-container');
            const stableAncestor = listContainer ? listContainer.parentElement : this.tabList.parentElement;
            const availableWidth = stableAncestor ? stableAncestor.clientWidth : this.tabList.clientWidth;

            const contentWidth = Array.from(this.tabList.children)
                .filter(child => !child.classList.contains('nds-show-more'))
                .reduce((total, child) => total + child.offsetWidth, 0);

            return contentWidth > availableWidth;
        }

        updateScrollIndicators() {
            if (!this.tabList) return;

            if (this.isVertical) {
                NDS.State.clear(this.tabList);
                return;
            }

            if (!this.needsScroll()) {
                NDS.State.clear(this.tabList);
                return;
            }

            const { scrollLeft, scrollWidth, clientWidth } = this.tabList;
            const maxScroll = scrollWidth - clientWidth;
            const isRTL = NDS.isRTL;
            const tokens = ['has-more'];

            if (isRTL) {
                if (Math.abs(scrollLeft) <= 2) tokens.push('at-start');
                if (Math.abs(scrollLeft) >= maxScroll - 2) tokens.push('at-end');
            } else {
                if (scrollLeft <= 2) tokens.push('at-start');
                if (scrollLeft >= maxScroll - 2) tokens.push('at-end');
            }

            NDS.State.set(this.tabList, ...tokens);
        }

        scrollToTarget(target) {
            if (!this.tabList || !target) return;

            target.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });

            setTimeout(() => this.updateScrollIndicators(), 300);
        }

        setupScrollEventListeners() {
            if (!this.tabList) return;

            // Click handler for tabs: scroll into view on click
            this.tabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    if (this.dragState.hasDragged) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                    }

                    if (!this.needsScroll()) return;
                    setTimeout(() => this.scrollToTarget(tab), 10);
                });
            });

            // Show-more button
            const showMoreBtn = this.tabList.parentElement.querySelector('.nds-show-more');
            if (showMoreBtn) {
                showMoreBtn.addEventListener('click', (e) => {
                    if (!this.needsScroll()) return;

                    e.preventDefault();
                    e.stopPropagation();

                    if (NDS.State.has(this.tabList, 'at-end')) {
                        this.tabList.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        const scrollAmount = this.tabList.clientWidth * 0.8;
                        const currentScroll = this.tabList.scrollLeft;
                        this.tabList.scrollTo({
                            left: NDS.isRTL ? currentScroll - scrollAmount : currentScroll + scrollAmount,
                            behavior: 'smooth'
                        });
                    }

                    setTimeout(() => this.updateScrollIndicators(), 300);
                });
            }

            // Mouse wheel horizontal scroll
            let isScrolling = false;
            this.tabList.addEventListener('wheel', (e) => {
                if (this.isVertical || !this.needsScroll()) return;
                if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;

                e.preventDefault();
                if (isScrolling) return;

                isScrolling = true;
                this.tabList.style.scrollBehavior = 'auto';

                const scrollMultiplier = NDS.isRTL ? -0.8 : 0.8;
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

            // Drag scroll
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
                    setTimeout(() => { this.dragState.hasDragged = false; }, 100);
                }
            };

            const handleMouseMove = (e) => {
                if (this.isVertical) {
                    handleMouseUp();
                    return;
                }
                e.preventDefault();

                if (Math.abs(e.pageX - this.dragState.startX) > 3) {
                    this.dragState.hasDragged = true;
                }

                this.tabList.scrollLeft = this.dragState.scrollLeft - (e.pageX - this.dragState.startX);
                this.updateScrollIndicators();
            };

            this.tabList.addEventListener('mousedown', (e) => {
                if (this.isVertical || !this.needsScroll()) return;

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

            // Scroll event listener (RAF throttled)
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
        // TAB SWITCHING & KEYBOARD
        // ==============================================

        setupEventListeners() {
            this.tabs.forEach((tab, index) => {
                tab.addEventListener('click', (e) => {
                    if (tab.tagName.toLowerCase() === 'a' && tab.getAttribute('href')) {
                        e.preventDefault();
                    }
                    this.switchToTab(index);
                });
            });

            this.tabList.addEventListener('keydown', (e) => this.handleKeyDown(e));

            this.tabs.forEach((tab, index) => {
                tab.addEventListener('focus', () => this.handleTabFocus(index));
            });
        }

        handleKeyDown(e) {
            const currentTab = e.target;
            if (!currentTab.classList.contains('nds-tab')) return;

            const currentIndex = this.tabs.indexOf(currentTab);
            const lastIndex = this.tabs.length - 1;
            let targetIndex = currentIndex;
            const isRTL = NDS.isRTL;

            switch (e.key) {
                case 'ArrowLeft':
                    if (this.isVertical) return;
                    targetIndex = isRTL
                        ? (currentIndex < lastIndex ? currentIndex + 1 : 0)
                        : (currentIndex > 0 ? currentIndex - 1 : lastIndex);
                    break;

                case 'ArrowRight':
                    if (this.isVertical) return;
                    targetIndex = isRTL
                        ? (currentIndex > 0 ? currentIndex - 1 : lastIndex)
                        : (currentIndex < lastIndex ? currentIndex + 1 : 0);
                    break;

                case 'ArrowUp':
                    targetIndex = currentIndex > 0 ? currentIndex - 1 : lastIndex;
                    break;

                case 'ArrowDown':
                    targetIndex = currentIndex < lastIndex ? currentIndex + 1 : 0;
                    break;

                case 'Home':
                    targetIndex = isRTL && !this.isVertical ? lastIndex : 0;
                    break;

                case 'End':
                    targetIndex = isRTL && !this.isVertical ? 0 : lastIndex;
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
            if (index === this.currentTabIndex || index < 0 || index >= this.tabs.length) return;

            const previousTab = this.tabs[this.currentTabIndex];
            const newTab = this.tabs[index];

            this.deactivateTab(previousTab, this.currentTabIndex);
            this.activateTab(newTab, index);
            this.currentTabIndex = index;
            this.dispatchTabChangeEvent(index, previousTab, newTab);
        }

        activateTab(tab, index) {
            const panel = this.panels[index];
            if (!panel) return;

            tab.setAttribute('aria-selected', 'true');
            tab.setAttribute('tabindex', '0');

            panel.removeAttribute('aria-hidden');
            panel.removeAttribute('hidden');
            panel.setAttribute('tabindex', '0');

            // Recheck height for expandable components now visible
            if (NDS.Expandable && NDS.Expandable.recheckHeights) {
                setTimeout(() => NDS.Expandable.recheckHeights(), 10);
            }
        }

        deactivateTab(tab, index) {
            const panel = this.panels[index];
            if (!panel) return;

            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');

            panel.setAttribute('aria-hidden', 'true');
            panel.setAttribute('hidden', '');
            panel.setAttribute('tabindex', '-1');
        }

        dispatchTabChangeEvent(index, previousTab, newTab) {
            this.tabsContainer.dispatchEvent(new CustomEvent('nds:tab:change', {
                detail: {
                    tabIndex: index,
                    tab: newTab,
                    panel: this.panels[index],
                    previousTab,
                    previousPanel: this.panels[this.tabs.indexOf(previousTab)]
                },
                bubbles: true
            }));
        }

        // ==============================================
        // PUBLIC API
        // ==============================================

        getActiveTabIndex() { return this.currentTabIndex; }
        getActiveTab() { return this.tabs[this.currentTabIndex]; }
        getActivePanel() { return this.panels[this.currentTabIndex]; }
        switchTo(index) { this.switchToTab(index); }

        destroy() {
            if (this._offResize) {
                this._offResize();
                this._offResize = null;
            }

            // Clone-replace to remove all event listeners
            this.tabs.forEach(tab => tab.replaceWith(tab.cloneNode(true)));
            this.tabList.replaceWith(this.tabList.cloneNode(true));
        }
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================

    function initializeTabs() {
        document.querySelectorAll('.nds-tabs').forEach(container => {
            if (container.closest('code, .code-example')) return;
            if (container.hasAttribute('data-nds-tabs-initialized')) return;

            const instance = new NDSTabs(container);
            container.ndsTabs = instance;
            container.setAttribute('data-nds-tabs-initialized', 'true');
        });
    }

    if (typeof window !== 'undefined') {
        NDS.Tabs = {
            init: initializeTabs,
            reinit: initializeTabs,
            create: (container) => new NDSTabs(container)
        };
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = NDSTabs;
    }
})();
