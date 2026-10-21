/* NDS.Sideinfo — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Sideinfo.init() / .reinit()   scan + initialize .nds-sideinfo
 *   NDS.Sideinfo.create(el)           instance one card
 *   NDS.Sideinfo.destroy(el)          tear one down — the NDS.init.destroy entry point
 *   instance.destroy()
 * Events:
 *   (none)
 * Hooks:
 *   (none — class-driven: .nds-sideinfo on the card, plus .nds-sticky / .nds-sticky-sm / .nds-sticky-md to opt into sticky.
 *    The component writes --nds-sideinfo-top on the card for the hero alignment)
 * Gotchas:
 *   - Alignment to the hero only runs when the page has a .nds-hero-section.nds-aside and
 *     the viewport is desktop-width. Otherwise the card just follows content start.
 *   - The sticky classes are REMOVED automatically while the card is taller than the viewport,
 *     and restored when it fits again — do not treat the class as fixed.
 *   - The instance lives on the element as el.ndsSideinfo.
 */
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

    class NdsSideinfo {
        constructor(element) {
            this._sideInfo = element;
            this._sideInfoParent = element.parentElement;
            this._sectionHead = document.querySelector('.nds-hero-section');
            this.abortController = new AbortController();
            // Remember which sticky classes the author wrote, so we can re-apply
            // them after a viewport/content change makes the card fit again.
            this._stickyClasses = ['nds-sticky', 'nds-sticky-sm', 'nds-sticky-md'].filter(className => element.classList.contains(className));

            // A sideinfo without a hero is a valid plain sticky-aside config — it
            // skips the hero-alignment offset but still gets sticky-fit + resize
            // wiring (init guards the hero-only observer). Only the parent is required.
            if (!this._sideInfoParent) {
                console.warn('NDS Sideinfo: parent element not found');
                return;
            }

            this._valid = true;
            this.init();
        }

        init() {
            // The initial position + sticky-fit measurement runs from the
            // ResizeObserver first deliveries below — _setupHeroResize fires
            // _syncPosition + _syncStickyState, _setupContentResize fires
            // _syncStickyState — each post-layout, so the rect and
            // getComputedStyle reads are free. Running them here would force a
            // synchronous reflow during the component-init burst.
            if (this._sectionHead) this._setupHeroResize();
            this._setupResize();
            this._setupContentResize();
            this._setupLateRecompute();
            this._sideInfo.setAttribute('data-nds-sideinfo-initialized', 'true');
        }

        // Sticky breaks down when the side info is taller than the viewport
        // (the user can never scroll past it). Drop the modifier in that case
        // and let normal flow handle it; restore when it fits again.
        _syncStickyState() {
            if (!this._stickyClasses.length) return;
            // The spot the card pins at, the same with the classes on or off, so dropping them cannot flip the result.
            let top;
            if (window.matchMedia(NDS.breakpoints.desktop).matches) {
                const cs = getComputedStyle(this._sideInfo);
                // Beside the title pulls the card up with a transform: the pinned spot is top + that shift.
                top = (parseFloat(cs.top) || 0) + (cs.transform === 'none' ? 0 : new DOMMatrix(cs.transform).m42);
            } else {
                // The small-screen strip pins right under the main nav.
                top = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nds-nav-height')) || 0;
            }
            const fits = this._sideInfo.offsetHeight + top <= document.documentElement.clientHeight;
            this._stickyClasses.forEach(className => this._sideInfo.classList.toggle(className, fits));
        }

        _syncPosition() {
            // Only compute the hero-alignment offset when the hero actually
            // reserves an aside column. Without `.nds-aside`, CSS keeps the
            // sideinfo aligned with content start and doesn't read the var.
            if (!document.querySelector('.nds-hero-section.nds-aside')) {
                this._sideInfo.style.removeProperty('--nds-sideinfo-top');
                return;
            }
            // No cached hero head (sideinfo built before a hero existed) — nothing
            // to align against; leave the placeholder offset in place.
            if (!this._sectionHead) return;

            // Early return for mobile/tablet with reset
            if (!window.matchMedia(NDS.breakpoints.desktop).matches) {
                this._sideInfo.style.removeProperty('--nds-sideinfo-top');
                return;
            }

            // Desktop calc (>=960px): recapture parent position fresh each resize for accuracy.
            const parentRect = this._sideInfoParent.getBoundingClientRect();
            const parentTop = parentRect.top;
            const sectionHeadRect = this._sectionHead.getBoundingClientRect();
            const offsetY = sectionHeadRect.top - parentTop;
            this._sideInfo.style.setProperty('--nds-sideinfo-top', `${offsetY}px`);
        }

        _setupResize() {
            this._offResize = NDS.onResize(() => {
                this._syncPosition();
                this._syncStickyState();
            });
        }

        // Hero height shifts with late-loading images and font swap; a
        // ResizeObserver recomputes each time so the card re-aligns after CLS.
        _setupHeroResize() {
            this._offHeroResize = NDS.onElementResize(this._sectionHead, () => {
                this._syncPosition();
                this._syncStickyState();
            });
        }

        _setupContentResize() {
            if (!this._stickyClasses.length) return;
            this._offContentResize = NDS.onElementResize(this._sideInfo, () => {
                this._syncStickyState();
            });
        }

        // One-shot recomputes after font swap and image load finish,
        // covering CLS sources that don't change the hero's own box size.
        _setupLateRecompute() {
            // Skip a late font-swap / load recompute after destroy() aborts — it would re-stamp cleared state.
            const { signal } = this.abortController;
            const recompute = () => {
                if (signal.aborted) return;
                this._syncPosition();
                this._syncStickyState();
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
            this._sideInfo.removeAttribute('data-nds-sideinfo-initialized');
            this._sideInfo.style.removeProperty('--nds-sideinfo-top');
            this._sideInfo.classList.add(...this._stickyClasses);

            if (this._offHeroResize) this._offHeroResize();
            if (this._offResize) this._offResize();
            if (this._offContentResize) this._offContentResize();
        }
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    function setupSideinfos() {
        const sideInfoElements = document.querySelectorAll('.nds-sideinfo');
        sideInfoElements.forEach(element => {
            if (element.closest('code')) return;
            if (!element.hasAttribute('data-nds-sideinfo-initialized')) {
                const instance = new NdsSideinfo(element);
                // Expando only on successful construction (sentinel is stamped post-guard by init()).
                if (instance._valid) element.ndsSideinfo = instance;
            }
        });
    }

    // Export to window
    NDS.Sideinfo = {
        init: setupSideinfos,
        reinit: setupSideinfos,
        create: (element) => {
            if (element.ndsSideinfo) return element.ndsSideinfo;
            const instance = new NdsSideinfo(element);
            if (!instance._valid) return null;
            element.ndsSideinfo = instance;
            return instance;
        },
        // Drops the expando too: a surviving backref hands the next reader a dead instance.
        destroy: (element) => {
            const instance = element?.ndsSideinfo;
            if (!instance) return;
            instance.destroy();
            delete element.ndsSideinfo;
        }
    };

})();
