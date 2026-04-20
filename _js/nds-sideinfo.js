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
            this.updatePosition();
            this.updateStickyState();
            this.setupHeroResize();
            this.setupResize();
            this.setupContentResize();
            this.setupLateRecompute();
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

        updatePosition() {
            // Only compute the hero-alignment offset when the hero actually
            // reserves an aside column. Without `.nds-aside`, CSS keeps the
            // sideinfo aligned with content start and doesn't read the var.
            if (!document.querySelector('.nds-hero-section.nds-aside')) {
                this.sideInfo.style.removeProperty('--nds-sideinfo-top');
                return;
            }

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

        // Hero height shifts with late-loading images and font swap; a
        // ResizeObserver recomputes each time so the card re-aligns after CLS.
        setupHeroResize() {
            this._offHeroResize = NDS.onElementResize(this.sectionHead, () => {
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

        // One-shot recomputes after font swap and image load finish,
        // covering CLS sources that don't change the hero's own box size.
        setupLateRecompute() {
            const recompute = () => {
                this.updatePosition();
                this.updateStickyState();
            };
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(recompute);
            }
            if (document.readyState !== 'complete') {
                window.addEventListener('load', recompute, { once: true });
            }
        }

        // ==============================================
        // CLEANUP
        // ==============================================

        destroy() {
            this.sideInfo.removeAttribute('data-sideinfo-initialized');
            this.sideInfo.style.removeProperty('--nds-sideinfo-top');
            if (this.wantsSticky) this.sideInfo.classList.add('nds-sticky');

            if (this._offHeroResize) this._offHeroResize();
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
