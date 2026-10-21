/* NDS.Tabs — public surface
 * Rides: nds-scroll-more (overflow detection, edge mask and the show-more button on the
 *        tab list) · nds-expandable (heights are rechecked when a panel becomes visible)
 * Requires:
 *   .nds-tabs needs one .nds-tab-panel per .nds-tab:not(.nds-show-more) — a tab without its panel switches nothing
 * Methods:
 *   NDS.Tabs.init() / .reinit()      scan + initialize .nds-tabs
 *   NDS.Tabs.create(container)       instance one tab set
 *   NDS.Tabs.destroy(container)      undo create()
 *   instance.goTo(index)             activate a tab by index
 *   instance.getActiveTabIndex()     the active index
 *   instance.getActiveTab()          the active .nds-tab
 *   instance.getActivePanel()        the active .nds-tab-panel
 *   instance.destroy()
 * Events (bubble from the .nds-tabs):
 *   nds:tabs:change   detail {tabIndex, tab, panel, previousTab, previousPanel}
 * Hooks:
 *   (none — the structure is markup: .nds-tab items in a .nds-tab-list, .nds-tab-panel
 *    items in a .nds-tab-content, matched BY POSITION)
 * Gotchas:
 *   - Tab N drives panel N by ORDER, not by an id. Keep the two lists in the same order
 *     and the same length.
 *   - The active tab at init is the one with aria-selected="true", else the first.
 *   - .nds-vertical on the root switches the arrow keys and turns off drag scrolling.
 *   - The instance lives on the root as el.ndsTabs.
 */
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

    // Own parts only. A .nds-tab-panel holds arbitrary consumer content, so a
    // nested .nds-tabs is legal — and its tabs/panels match the same selectors.
    // The two lists would then interleave differently (all outer tabs sit in the
    // tablist; nested panels sit INSIDE an outer panel), desynchronizing the
    // tabs[i] ↔ panels[i] pairing every method here depends on.
    const getOwnParts = (container, selector) => NDS.findOwnParts(container, selector, '.nds-tabs');

    class NdsTabs {
        constructor(tabsContainer) {
            this._tabsContainer = tabsContainer;
            this._scrollMore = tabsContainer.querySelector('.nds-scroll-more');
            this._tabList = tabsContainer.querySelector('.nds-tab-list');
            this._tabs = getOwnParts(tabsContainer, '.nds-tab:not(.nds-show-more)');
            this._panels = getOwnParts(tabsContainer, '.nds-tab-panel');

            if (!this._tabList || this._tabs.length === 0 || this._panels.length === 0) {
                console.warn('NDS Tabs: Invalid tab structure found');
                return;
            }

            this.abortController = new AbortController();
            this._currentTabIndex = this._findActiveTabIndex();
            this._valid = true;
            // Registered here, not in the sweep, so every construction path —
            // sweep, reinit() and programmatic create() — publishes el.ndsTabs and
            // the stamp that ends the skeleton and stops a second sweep.
            tabsContainer.ndsTabs = this;
            this.init();
            tabsContainer.setAttribute('data-nds-tabs-initialized', 'true');
        }

        get _isVertical() {
            return this._tabsContainer.classList.contains('nds-vertical');
        }

        init() {
            this._addEventListeners();
            this._setupInitialState();
            this._setupWheelAndDrag();
        }

        _findActiveTabIndex() {
            const activeTab = this._tabs.find(tab => tab.ariaSelected === 'true');
            return activeTab ? this._tabs.indexOf(activeTab) : 0;
        }

        _setupInitialState() {
            this._tabs.forEach((tab, index) => {
                if (index === this._currentTabIndex) {
                    this._activateTab(tab, index);
                } else {
                    this._deactivateTab(tab, index);
                }
            });
        }

        // ==============================================
        // SCROLL BEHAVIOR
        // nds-scroll-more owns overflow detection, mask, show-more button, and
        // has-more/at-start/at-end state writing. This module only adds tabs-
        // specific UX on top: click-to-scroll-into-view (in _addEventListeners),
        // wheel→horizontal conversion, and drag-to-scroll (both below).
        // ==============================================

        _isScrollable() {
            return !!this._scrollMore && NDS.state.has(this._scrollMore, 'has-more');
        }

        _scrollToTarget(target) {
            if (!target) return;
            // 'auto' defers to the list's CSS scroll-behavior, which _tabs.scss drops
            // to auto under reduced motion — so this is a real instant scroll there.
            target.scrollIntoView({
                behavior: NDS.prefersReducedMotion ? 'auto' : 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }

        _setupWheelAndDrag() {
            if (this._isVertical) return;

            NDS.dragScroll(this._tabList, { canScroll: () => this._isScrollable(), signal: this.abortController.signal });
        }

        // ==============================================
        // TAB SWITCHING & KEYBOARD
        // ==============================================

        _addEventListeners() {
            this._tabs.forEach((tab, index) => {
                tab.addEventListener('click', (e) => {
                    if (tab.tagName.toLowerCase() === 'a' && tab.getAttribute('href')) {
                        e.preventDefault();
                    }
                    this._switchToTab(index);

                    if (!this._isVertical && this._isScrollable()) {
                        setTimeout(() => this._scrollToTarget(tab), 10);
                    }
                }, { signal: this.abortController.signal });
                tab.addEventListener('focus', () => this._handleTabFocus(index), { signal: this.abortController.signal });
            });

            this._tabList.addEventListener('keydown', (e) => this._handleKeyDown(e), { signal: this.abortController.signal });
        }

        _handleKeyDown(e) {
            const currentTab = e.target;
            if (!currentTab.classList.contains('nds-tab')) return;

            const currentIndex = this._tabs.indexOf(currentTab);
            const lastIndex = this._tabs.length - 1;
            const isRtl = NDS.isRtl;
            const prev = () => currentIndex > 0 ? currentIndex - 1 : lastIndex;
            const next = () => currentIndex < lastIndex ? currentIndex + 1 : 0;
            let targetIndex = currentIndex;

            switch (e.key) {
                case 'ArrowLeft':
                    if (this._isVertical) return;
                    targetIndex = isRtl ? next() : prev();
                    break;

                case 'ArrowRight':
                    if (this._isVertical) return;
                    targetIndex = isRtl ? prev() : next();
                    break;

                case 'ArrowUp':
                    targetIndex = prev();
                    break;

                case 'ArrowDown':
                    targetIndex = next();
                    break;

                // First and last in reading order, in RTL too (WAI-ARIA tabs pattern).
                case 'Home':
                    targetIndex = 0;
                    break;

                case 'End':
                    targetIndex = lastIndex;
                    break;

                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this._switchToTab(currentIndex);
                    return;

                default:
                    return;
            }

            e.preventDefault();
            this._focusTab(targetIndex);
        }

        _handleTabFocus(index) {
            this._tabs.forEach((tab, i) => {
                tab.setAttribute('tabindex', i === index ? '0' : '-1');
            });
        }

        _focusTab(index) {
            if (index >= 0 && index < this._tabs.length) {
                this._tabs[index].focus();
            }
        }

        _switchToTab(index) {
            if (index === this._currentTabIndex || index < 0 || index >= this._tabs.length) return;

            const previousTab = this._tabs[this._currentTabIndex];
            const newTab = this._tabs[index];

            this._deactivateTab(previousTab, this._currentTabIndex);
            this._activateTab(newTab, index);
            this._currentTabIndex = index;
            this._dispatchTabChangeEvent(index, previousTab, newTab);
        }

        _activateTab(tab, index) {
            const panel = this._panels[index];
            if (!panel) return;

            NDS.aria.selected(tab, true);
            tab.setAttribute('tabindex', '0');

            NDS.aria.hidden(panel, null);
            panel.removeAttribute('hidden');
            panel.setAttribute('tabindex', '0');
        }

        _deactivateTab(tab, index) {
            const panel = this._panels[index];
            if (!panel) return;

            NDS.aria.selected(tab, false);
            tab.setAttribute('tabindex', '-1');

            NDS.aria.hidden(panel, true);
            panel.setAttribute('hidden', '');
            panel.setAttribute('tabindex', '-1');
        }

        _dispatchTabChangeEvent(index, previousTab, newTab) {
            this._tabsContainer.dispatchEvent(new CustomEvent('nds:tabs:change', {
                detail: {
                    tabIndex: index,
                    tab: newTab,
                    panel: this._panels[index],
                    previousTab,
                    previousPanel: this._panels[this._tabs.indexOf(previousTab)]
                },
                bubbles: true
            }));
        }

        // ==============================================
        // PUBLIC API
        // ==============================================

        getActiveTabIndex() { return this._currentTabIndex; }
        getActiveTab() { return this._tabs[this._currentTabIndex]; }
        getActivePanel() { return this._panels[this._currentTabIndex]; }
        goTo(index) { this._switchToTab(index); }

        destroy() {
            if (this.abortController) this.abortController.abort();
            this._tabsContainer.removeAttribute('data-nds-tabs-initialized');
            delete this._tabsContainer.ndsTabs;
        }
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================

    function setupTabs() {
        document.querySelectorAll('.nds-tabs').forEach(container => {
            if (container.closest('code')) return;
            if (container.hasAttribute('data-nds-tabs-initialized')) return;
            // Only a valid construction stamps, so late-filled markup stays eligible.
            new NdsTabs(container);
        });
    }

    NDS.Tabs = {
        init: setupTabs,
        reinit: setupTabs,
        // The constructor publishes el.ndsTabs only on success → null on a bail.
        create: (container) => {
            if (!container.ndsTabs) new NdsTabs(container);
            return container.ndsTabs || null;
        },
        destroy: (container) => container?.ndsTabs?.destroy(),
    };
})();
