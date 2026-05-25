/**
 * NDS Tabs Component
 * Accessible tab navigation with horizontal and vertical layouts
 * Based on WAI-ARIA Authoring Practices Guide
 *
 * Structure:
 *   .nds-tabs
 *     .nds-tab-list-container.nds-scroll-more         (co-classed on one element)
 *       .nds-tab-list.nds-scroll-more-content           (co-classed on the nav)
 *         .nds-tab[role="tab"]
 *       .nds-show-more
 *     .nds-tab-content
 *       .nds-tab-panel[role="tabpanel"]
 *
 * The co-classed wrapper has two roles:
 *   - .nds-tab-list-container supplies `isolation: isolate` so the .nds-divided
 *     3px rail (rendered via ::after with z-index: -1) stays behind the tabs.
 *   - .nds-scroll-more supplies overflow detection, edge mask, show-more button,
 *     and writes has-more / at-start / at-end state to the wrapper itself.
 *
 * This module reads has-more from the wrapper when deciding whether to
 * drag / wheel-convert / auto-scroll. Overflow mechanics are not re-implemented here.
 */

(function() {
    'use strict';

    class NDSTabs {
        constructor(tabsContainer) {
            this.tabsContainer = tabsContainer;
            this.scrollMore = tabsContainer.querySelector('.nds-scroll-more');
            this.tabList = tabsContainer.querySelector('.nds-tab-list');
            this.tabs = Array.from(tabsContainer.querySelectorAll('.nds-tab:not(.nds-show-more)'));
            this.panels = Array.from(tabsContainer.querySelectorAll('.nds-tab-panel'));
            this.dragState = { active: false, startX: 0, scrollLeft: 0, hasDragged: false };

            if (!this.tabList || this.tabs.length === 0 || this.panels.length === 0) {
                console.warn('NDS Tabs: Invalid tab structure found');
                return;
            }

            this._ac = new AbortController();
            this.currentTabIndex = this.findActiveTabIndex();
            this.init();
        }

        get isVertical() {
            return this.tabsContainer.classList.contains('nds-vertical');
        }

        init() {
            this.setupEventListeners();
            this.setupInitialState();
            this.setupWheelAndDrag();
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
        // nds-scroll-more owns overflow detection, mask, show-more button, and
        // has-more/at-start/at-end state writing. This module only adds tabs-
        // specific UX on top: click-to-scroll-into-view (in setupEventListeners),
        // wheel→horizontal conversion, and drag-to-scroll (both below).
        // ==============================================

        needsScroll() {
            return !!this.scrollMore && NDS.State.has(this.scrollMore, 'has-more');
        }

        scrollToTarget(target) {
            if (!target) return;
            target.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }

        setupWheelAndDrag() {
            if (this.isVertical) return;

            // Mouse wheel: convert vertical wheel delta to horizontal scroll with ease-out.
            let isScrolling = false;
            this.tabList.addEventListener('wheel', (e) => {
                if (!this.needsScroll()) return;
                if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;

                e.preventDefault();
                if (isScrolling) return;

                isScrolling = true;
                this.tabList.style.scrollBehavior = 'auto';

                const scrollAmount = e.deltaY * (NDS.isRTL ? -0.8 : 0.8);
                const startScroll = this.tabList.scrollLeft;
                const duration = 150;
                let frame = 0;

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
                    }
                };
                requestAnimationFrame(animate);
            }, { passive: false, signal: this._ac.signal });

            // Drag scroll.
            const handleMouseMove = (e) => {
                e.preventDefault();
                if (Math.abs(e.pageX - this.dragState.startX) > 3) {
                    this.dragState.hasDragged = true;
                }
                this.tabList.scrollLeft = this.dragState.scrollLeft - (e.pageX - this.dragState.startX);
            };

            const handleMouseUp = () => {
                this.dragState.active = false;
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                Object.assign(this.tabList.style, { cursor: '', userSelect: '', scrollBehavior: 'smooth' });
                if (this.dragState.hasDragged) {
                    setTimeout(() => { this.dragState.hasDragged = false; }, 100);
                }
            };

            this.tabList.addEventListener('mousedown', (e) => {
                if (!this.needsScroll()) return;

                this.dragState.active = true;
                this.dragState.startX = e.pageX;
                this.dragState.scrollLeft = this.tabList.scrollLeft;
                this.dragState.hasDragged = false;

                Object.assign(this.tabList.style, { cursor: 'grabbing', userSelect: 'none', scrollBehavior: 'auto' });
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
            }, { signal: this._ac.signal });
        }

        // ==============================================
        // TAB SWITCHING & KEYBOARD
        // ==============================================

        setupEventListeners() {
            this.tabs.forEach((tab, index) => {
                tab.addEventListener('click', (e) => {
                    // Drag guard: if the user was dragging, swallow the click so it
                    // doesn't flip the active tab. stopImmediatePropagation blocks any
                    // later same-target listeners; stopPropagation alone wouldn't.
                    if (this.dragState.hasDragged) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        return;
                    }

                    if (tab.tagName.toLowerCase() === 'a' && tab.getAttribute('href')) {
                        e.preventDefault();
                    }
                    this.switchToTab(index);

                    if (!this.isVertical && this.needsScroll()) {
                        setTimeout(() => this.scrollToTarget(tab), 10);
                    }
                }, { signal: this._ac.signal });
                tab.addEventListener('focus', () => this.handleTabFocus(index), { signal: this._ac.signal });
            });

            this.tabList.addEventListener('keydown', (e) => this.handleKeyDown(e), { signal: this._ac.signal });
        }

        handleKeyDown(e) {
            const currentTab = e.target;
            if (!currentTab.classList.contains('nds-tab')) return;

            const currentIndex = this.tabs.indexOf(currentTab);
            const lastIndex = this.tabs.length - 1;
            const isRTL = NDS.isRTL;
            const prev = () => currentIndex > 0 ? currentIndex - 1 : lastIndex;
            const next = () => currentIndex < lastIndex ? currentIndex + 1 : 0;
            let targetIndex = currentIndex;

            switch (e.key) {
                case 'ArrowLeft':
                    if (this.isVertical) return;
                    targetIndex = isRTL ? next() : prev();
                    break;

                case 'ArrowRight':
                    if (this.isVertical) return;
                    targetIndex = isRTL ? prev() : next();
                    break;

                case 'ArrowUp':
                    targetIndex = prev();
                    break;

                case 'ArrowDown':
                    targetIndex = next();
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
            setTimeout(() => NDS.Expandable.recheckHeights(), 10);
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
            if (this._ac) this._ac.abort();
            this.tabsContainer.removeAttribute('data-nds-tabs-initialized');
            delete this.tabsContainer.ndsTabs;
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
