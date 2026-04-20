/**
 * NDS Side Info Component
 * Positions side info component based on hero section head position
 * Only active on desktop viewports (>960px)
 */

(function () {
    'use strict';

    // ==============================================
    // UTILITIES
    // ==============================================

    // ==============================================
    // MAIN CLASS
    // ==============================================

    class NDSSideInfo {
        constructor(element) {
            this.sideInfo = element;
            this.sideInfoParent = element.parentElement;
            this.sectionHead = document.querySelector('.nds-hero-section');
            this.isInitialized = false;
            // Remember whether the author opted into sticky so we can re-apply
            // it after a viewport/content change makes it fit again.
            this.wantsSticky = element.classList.contains('nds-sticky');

            if (!this.sectionHead) {
                console.warn('NDS Side Info: .nds-hero-section .nds-section-head not found');
                return;
            }

            if (!this.sideInfoParent) {
                console.warn('NDS Side Info: parent element not found');
                return;
            }

            this.init();
        }

        init() {
            this.setupVisibilityObserver();
            this.setupResize();
            this.setupContentResize();
            this.updateStickyState();
            this.sideInfo.setAttribute('data-sideinfo-initialized', 'true');
        }

        // Sticky breaks down when the side info is taller than the viewport
        // (the user can never scroll past it). Drop the modifier in that case
        // and let normal flow handle it; restore when it fits again.
        updateStickyState() {
            if (!this.wantsSticky) return;
            const top = parseFloat(getComputedStyle(this.sideInfo).top) || 0;
            const fits = this.sideInfo.offsetHeight + top <= window.innerHeight;
            this.sideInfo.classList.toggle('nds-sticky', fits);
        }

        setupVisibilityObserver() {
            this._offVisibility = NDS.onIntersect(this.sideInfo, (entry) => {
                if (entry.isIntersecting && !this.isInitialized) {
                    this.updatePosition();
                    this.isInitialized = true;
                }
            }, { threshold: 0.01 });
        }

        updatePosition() {
            // Early return for mobile/tablet with reset
            if (!window.matchMedia(NDS.breakpoints.desktop).matches) {
                this.sideInfo.style.removeProperty('--nds-sideinfo-top');
                return;
            }

            // Desktop calculations (>=960px)
            // Recapture parent position to ensure accuracy on resize
            const parentRect = this.sideInfoParent.getBoundingClientRect();
            const parentTop = parentRect.top;

            // Get section head position
            const sectionHeadRect = this.sectionHead.getBoundingClientRect();

            // Calculate offset using current parent position
            const offsetY = sectionHeadRect.top - parentTop;

            // Set CSS variable with the offset
            this.sideInfo.style.setProperty('--nds-sideinfo-top', `${offsetY}px`);
        }

        setupResize() {
            this._offResize = NDS.onResize(() => {
                this.updatePosition();
                this.updateStickyState();
            });
        }

        setupContentResize() {
            if (!this.wantsSticky) return;
            this._offContentResize = NDS.onElementResize(this.sideInfo, () => {
                this.updateStickyState();
            });
        }

        // ==============================================
        // CLEANUP
        // ==============================================

        destroy() {
            this.sideInfo.removeAttribute('data-sideinfo-initialized');
            this.sideInfo.style.removeProperty('--nds-sideinfo-top');
            if (this.wantsSticky) this.sideInfo.classList.add('nds-sticky');

            if (this._offVisibility) this._offVisibility();
            if (this._offResize) this._offResize();
            if (this._offContentResize) this._offContentResize();
        }
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    function initializeComponents() {
        const sideInfoElements = document.querySelectorAll('.nds-sideinfo');
        sideInfoElements.forEach(element => {
            if (element.closest('code, .code-example')) return;
            if (!element.hasAttribute('data-sideinfo-initialized')) {
                const instance = new NDSSideInfo(element);
                element._ndsSideInfo = instance;
            }
        });
    }

    // Export to window
    NDS.Sideinfo = {
        init: initializeComponents,
        reinit: initializeComponents,
        create: (element) => {
            const instance = new NDSSideInfo(element);
            element._ndsSideInfo = instance;
            return instance;
        }
    };

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeComponents);
    } else {
        initializeComponents();
    }

})();
