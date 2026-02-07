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

    function debounce(fn, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    }

    // ==============================================
    // MAIN CLASS
    // ==============================================

    class NDSSideInfo {
        constructor(element) {
            this.sideInfo = element;
            this.sideInfoParent = element.parentElement;
            this.sectionHead = document.querySelector('.nds-hero-section');
            this.isInitialized = false;

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
            this.sideInfo.setAttribute('data-sideinfo-initialized', 'true');
        }

        setupVisibilityObserver() {
            // Use IntersectionObserver to detect when element becomes visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !this.isInitialized) {
                        // Element is visible for the first time, calculate position
                        this.updatePosition();
                        this.isInitialized = true;
                    }
                });
            }, {
                root: null,
                threshold: 0.01
            });

            observer.observe(this.sideInfo);
            this.visibilityObserver = observer;
        }

        updatePosition() {
            const width = window.innerWidth;

            // Early return for mobile/tablet with reset
            if (width <= 958) {
                this.sideInfo.style.removeProperty('--nds-sideInfo-top');
                return;
            }

            // Desktop calculations (>960px)
            // Recapture parent position to ensure accuracy on resize
            const parentRect = this.sideInfoParent.getBoundingClientRect();
            const parentTop = parentRect.top;

            // Get section head position
            const sectionHeadRect = this.sectionHead.getBoundingClientRect();

            // Calculate offset using current parent position
            const offsetY = sectionHeadRect.top - parentTop;

            // Set CSS variable with the offset
            this.sideInfo.style.setProperty('--nds-sideInfo-top', `${offsetY}px`);
        }

        setupResize() {
            this.resizeHandler = debounce(() => {
                this.updatePosition();
            }, 150);

            window.addEventListener('resize', this.resizeHandler);
        }

        // ==============================================
        // CLEANUP
        // ==============================================

        destroy() {
            this.sideInfo.removeAttribute('data-sideinfo-initialized');
            this.sideInfo.style.removeProperty('--nds-sideInfo-top');

            if (this.resizeHandler) {
                window.removeEventListener('resize', this.resizeHandler);
            }
        }
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    function initializeComponents() {
        const sideInfoElements = document.querySelectorAll('.nds-sideInfo');
        sideInfoElements.forEach(element => {
            if (element.closest('code, .code-example')) return;
            if (!element.hasAttribute('data-sideinfo-initialized')) {
                const instance = new NDSSideInfo(element);
                element._ndsSideInfo = instance;
            }
        });
    }

    // Export to window
    window.NDSSideInfo = {
        init: initializeComponents,
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
