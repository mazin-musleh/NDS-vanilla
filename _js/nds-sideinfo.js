/**
 * NDS Side Info Component
 * Positions side info component based on hero section head position
 * Only active on desktop viewports (>960px)
 */

(function () {
    'use strict';

    // ==============================================
    // MAIN CLASS
    // ==============================================

    class NDSSideInfo {
        constructor(element) {
            this.sideInfo = element;
            this.sideInfoParent = element.parentElement;
            this.sectionHead = document.querySelector('.nds-hero-section');
            this.abortController = new AbortController();
            // Remember whether the author opted into sticky so we can re-apply
            // it after a viewport/content change makes it fit again.
            this.wantsSticky = element.classList.contains('nds-sticky');

            // A sideinfo without a hero is a valid plain sticky-aside config — it
            // skips the hero-alignment offset but still gets sticky-fit + resize
            // wiring (init guards the hero-only observer). Only the parent is required.
            if (!this.sideInfoParent) {
                console.warn('NDS Sideinfo: parent element not found');
                return;
            }

            this.valid = true;
            this.init();
        }

        init() {
            // The initial position + sticky-fit measurement runs from the
            // ResizeObserver first deliveries below — setupHeroResize fires
            // updatePosition + updateStickyState, setupContentResize fires
            // updateStickyState — each post-layout, so the rect and
            // getComputedStyle reads are free. Running them here would force a
            // synchronous reflow during the component-init burst.
            if (this.sectionHead) this.setupHeroResize();
            this.setupResize();
            this.setupContentResize();
            this.setupLateRecompute();
            this.sideInfo.setAttribute('data-nds-sideinfo-initialized', 'true');
        }

        // Sticky breaks down when the side info is taller than the viewport
        // (the user can never scroll past it). Drop the modifier in that case
        // and let normal flow handle it; restore when it fits again.
        updateStickyState() {
            if (!this.wantsSticky) return;
            const top = parseFloat(getComputedStyle(this.sideInfo).top) || 0;
            const fits = this.sideInfo.offsetHeight + top <= document.documentElement.clientHeight;
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
            // No cached hero head (sideinfo built before a hero existed) — nothing
            // to align against; leave the placeholder offset in place.
            if (!this.sectionHead) return;

            // Early return for mobile/tablet with reset
            if (!window.matchMedia(NDS.breakpoints.desktop).matches) {
                this.sideInfo.style.removeProperty('--nds-sideinfo-top');
                return;
            }

            // Desktop calc (>=960px): recapture parent position fresh each resize for accuracy.
            const parentRect = this.sideInfoParent.getBoundingClientRect();
            const parentTop = parentRect.top;
            const sectionHeadRect = this.sectionHead.getBoundingClientRect();
            const offsetY = sectionHeadRect.top - parentTop;
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
            // Skip a late font-swap / load recompute after destroy() aborts — it would re-stamp cleared state.
            const { signal } = this.abortController;
            const recompute = () => {
                if (signal.aborted) return;
                this.updatePosition();
                this.updateStickyState();
            };
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(recompute);
            }
            if (document.readyState !== 'complete') {
                window.addEventListener('load', recompute, { once: true, signal });
            }
        }

        // ==============================================
        // CLEANUP
        // ==============================================

        destroy() {
            this.abortController.abort();
            this.sideInfo.removeAttribute('data-nds-sideinfo-initialized');
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
            if (!element.hasAttribute('data-nds-sideinfo-initialized')) {
                const instance = new NDSSideInfo(element);
                // Expando only on successful construction (sentinel is stamped post-guard by init()).
                if (instance.valid) element._ndsSideInfo = instance;
            }
        });
    }

    // Export to window
    NDS.Sideinfo = {
        init: initializeComponents,
        reinit: initializeComponents,
        create: (element) => {
            const instance = new NDSSideInfo(element);
            if (instance.valid) element._ndsSideInfo = instance;
            return instance;
        }
    };

})();
