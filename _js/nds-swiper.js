/**
 * NDS Swiper Component - CSS Scroll-Snap First
 * Minimal foundation with native scroll behavior
 * Uses CSS scroll-snap for positioning, JS for navigation/pagination sync
 */

(function () {
    'use strict';

    // ==============================================
    // UTILITIES
    // ==============================================

    function isRTL() {
        return document.documentElement.dir === 'rtl';
    }

    function isIOS() {
        // Detect iPhone, iPad, iPod
        return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
               // Detect iPadOS (reports as Mac but has touch)
               (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    }

    function fixSrcsetSpaces(srcsetValue) {
        if (!srcsetValue) return srcsetValue;

        // Split by comma to get individual candidates
        return srcsetValue.split(',').map(candidate => {
            const trimmed = candidate.trim();
            // Split by space to separate URL from descriptor (e.g., "600w")
            const lastSpaceIndex = trimmed.lastIndexOf(' ');

            if (lastSpaceIndex === -1) {
                // No descriptor, just encode the URL
                return trimmed.replace(/ /g, '%20');
            }

            // Separate URL and descriptor
            const url = trimmed.substring(0, lastSpaceIndex);
            const descriptor = trimmed.substring(lastSpaceIndex + 1);

            // Encode spaces in URL, keep descriptor as-is
            return url.replace(/ /g, '%20') + ' ' + descriptor;
        }).join(', ');
    }

    // ==============================================
    // MAIN CLASS
    // ==============================================

    let instanceCounter = 0;

    class NDSSwiper {
        constructor(container) {
            this.id = ++instanceCounter;
            this.container = container;
            this.wrapper = container.querySelector('.nds-swiper-wrapper');
            this.slides = Array.from(container.querySelectorAll('.nds-swiper-slide'));
            this.pagination = container.querySelector('.nds-swiper-pagination');
            this.navigation = container.querySelector('.nds-swiper-navigation');
            this.prevBtn = container.querySelector('.nds-swiper-button-prev');
            this.nextBtn = container.querySelector('.nds-swiper-button-next');

            this.isHero = container.classList.contains('nds-hero');
            this._cachedGap = null;

            if (!this.wrapper || this.slides.length === 0) {
                console.warn('NDS Swiper: No wrapper or slides found');
                return;
            }

            // Set initial slides per view BEFORE any layout calculations to prevent CLS
            this.currentIndex = 0;
            this.slidesPerView = 1;
            this.setInitialSlidesPerView();

            this.init();
        }

        // ==============================================
        // BREAKPOINT CALCULATION
        // ==============================================

        calculateSlidesPerView(width) {
            const max = parseInt(this.container.getAttribute('slides-max')) || 1;
            const mid = parseInt(this.container.getAttribute('slides-mid')) || 1;
            const min = parseInt(this.container.getAttribute('slides-min')) || 1;

            if (width >= 960) return max;
            if (width > 600) return mid;
            return min;
        }

        getGap() {
            if (this._cachedGap === null) {
                this._cachedGap = parseInt(getComputedStyle(this.container).getPropertyValue('--gap')) || 0;
            }
            return this._cachedGap;
        }

        setInitialSlidesPerView() {
            // Read slides count directly from attributes and set CSS variable immediately
            const width = window.innerWidth;
            const initial = this.calculateSlidesPerView(width);

            // Set both CSS variable and instance property to prevent CLS
            this.container.style.setProperty('--slides', initial);
            this.slidesPerView = initial;
        }

        init() {
            this.updateSlidesPerView();

            // Set total slides count as CSS custom property
            this.container.style.setProperty('--total', this.slides.length);

            this.setupNavigation();
            this.setupPagination();
            this.setupScrollSync();
            this.setupKeyboard();
            this.setupResize();
            this.setupLazyLoading();
            this.setupContentObserver();
            this.setupVisibilityObserver();
            this.updateState();
            this.updatePeekStyles();

            this.container.setAttribute('data-swiper-initialized', 'true');
        }

        setupContentObserver() {
            let lastScrollWidth = this.wrapper.scrollWidth;

            const checkScrollWidth = NDS.debounce(() => {
                const currentScrollWidth = this.wrapper.scrollWidth;
                if (currentScrollWidth !== lastScrollWidth) {
                    lastScrollWidth = currentScrollWidth;
                    this.updatePeekStyles();
                }
            }, 100);

            const off = NDS.onElementResize(this.wrapper, checkScrollWidth);

            // Disconnect after 500ms
            setTimeout(off, 500);
        }

        setupVisibilityObserver() {
            // Track if peek styles have been applied after becoming visible
            this.peekStylesApplied = false;

            // Shared viewport IO detects when swiper becomes visible
            // Handles tabs, modals, accordions, and any hidden container
            this._offVisibility = NDS.onIntersect(this.container, (entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0) {
                    if (this.container && this.container.hasAttribute('hidden')) {
                        this.container.removeAttribute('hidden');
                    }

                    if (!this.peekStylesApplied) {
                        setTimeout(() => {
                            const hasHiddenSlides = this.isHero && this.slides.some(slide => slide.hasAttribute('hidden'));

                            if (hasHiddenSlides && isIOS() && isRTL()) {
                                const originalBehavior = getComputedStyle(this.wrapper).scrollBehavior;
                                this.wrapper.style.scrollBehavior = 'auto';
                                this.slides.forEach(slide => { if (slide.hasAttribute('hidden')) slide.removeAttribute('hidden'); });
                                this.wrapper.scrollLeft = 0;
                                void this.wrapper.offsetHeight;
                                this.wrapper.style.scrollBehavior = originalBehavior;
                            } else if (hasHiddenSlides) {
                                this.slides.forEach(slide => { if (slide.hasAttribute('hidden')) slide.removeAttribute('hidden'); });
                            }

                            this.updatePeekStyles();
                            this.updateState();
                            this.peekStylesApplied = true;
                        }, 50);
                    }
                }
            }, { threshold: 0.01 });
        }


        // ==============================================
        // RESPONSIVE SLIDES PER VIEW
        // ==============================================

        updateSlidesPerView() {
            const width = window.innerWidth;
            const peek = parseInt(this.container.getAttribute('peek')) || 0;

            const newSlidesPerView = this.calculateSlidesPerView(width);

            // Only update if changed (prevents unnecessary recalculation during init)
            if (newSlidesPerView !== this.slidesPerView) {
                this.slidesPerView = newSlidesPerView;
                this.container.style.setProperty('--slides', this.slidesPerView);
            }

            // Calculate number of pages
            const pageCount = Math.ceil(this.slides.length / this.slidesPerView);

            // Get swiper gap
            const gap = this.getGap();

            // Set peek to 0 if no peek attr, only one page, otherwise add gap to peek
            const effectivePeek = (peek > 0 && pageCount > 1) ? peek + gap : 0;

            this.container.style.setProperty('--peek', `${effectivePeek}px`);

            // Rebuild pagination when slides per view changes
            if (this.pagination) {
                this.setupPagination();
            }
        }

        updatePeekStyles() {
            // Skip hero sliders
            if (this.container.classList.contains('nds-hero')) {
                return;
            }

            const hasPeek = this.container.hasAttribute('peek');
            const hasOneSlidePage = this.slidesPerView === 1;

            // Check if parent has nds-full-width and parent width >= viewport width
            const parent = this.container.parentElement;
            const viewportWidth = document.documentElement.clientWidth;
            const parentWidth = parent?.clientWidth || 0;
            const parentHasFullWidth = parent?.classList.contains('nds-full-width');
            const parentFillsViewport = parentWidth >= viewportWidth;

            // If parent has nds-full-width AND fills viewport, add swiper padding
            if (parentHasFullWidth && parentFillsViewport) {
                this.container.style.setProperty('--padding', 'var(--nds-viewport-padding)');
            } else {
                this.container.style.removeProperty('--padding');
            }

            // If not peek and not single slide, remove gap if present
            if (!hasPeek && !hasOneSlidePage) {
                this.container.style.removeProperty('--gap');
                return;
            }

            // For non-peek single slide mode: set gap to viewport padding
            if (!hasPeek && hasOneSlidePage) {
                this.container.style.setProperty('--gap', 'var(--nds-viewport-padding)');
            }
        }

        setupResize() {
            this._offResize = NDS.onResize(() => {
                this._cachedGap = null; // Invalidate gap cache on resize
                const oldSlidesPerView = this.slidesPerView;
                this.updateSlidesPerView();

                // If slides per view changed, update buttons and pagination
                if (oldSlidesPerView !== this.slidesPerView) {
                    this.updateButtons();
                    this.updatePagination();
                    this.updateBoundaryClasses();
                }

                // Update peek styles and full-width class on resize
                this.updatePeekStyles();

                // Reset visibility flag to allow update on next visibility
                this.peekStylesApplied = false;
            });
        }

        // ==============================================
        // NAVIGATION
        // ==============================================

        setupNavigation() {
            // Helper to handle navigation action
            const handleNav = (btn, action) => {
                // Use mousedown for immediate response on press
                btn.addEventListener('mousedown', (e) => {
                    if (e.button !== 0) return; // Only left mouse button
                    e.preventDefault();
                    action();
                });

                // Use touchstart for immediate response on touch devices
                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    action();
                }, { passive: false });

                // Keep keyboard support (Enter/Space keys trigger click naturally)
                btn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        action();
                    }
                });
            };

            if (this.prevBtn) {
                handleNav(this.prevBtn, () => this.prev());
            }
            if (this.nextBtn) {
                handleNav(this.nextBtn, () => this.next());
            }
        }

        prev() {
            const targetIndex = this.currentIndex - this.slidesPerView;
            this.goTo(targetIndex);
        }

        next() {
            const targetIndex = this.currentIndex + this.slidesPerView;
            this.goTo(targetIndex);
        }

        goTo(index) {
            const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
            const clampedIndex = Math.max(0, Math.min(index, maxIndex));

            const targetSlide = this.slides[clampedIndex];
            if (!targetSlide) return;

            // Calculate absolute scroll position using slide dimensions
            const slideWidth = targetSlide.offsetWidth;
            const gap = this.getGap();
            const rtl = isRTL();

            // Calculate target scroll position
            let targetScrollLeft = clampedIndex * (slideWidth + gap);
            if (rtl) {
                targetScrollLeft = -targetScrollLeft;
            }

            // Use scrollTo with absolute position (like native scroll-snap)
            this.wrapper.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth'
            });
        }

        // ==============================================
        // SCROLL SYNC
        // ==============================================

        setupScrollSync() {
            let ticking = false;
            this.wrapper.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        this.detectCurrentSlide();
                        this.updateState();
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }

        detectCurrentSlide() {
            if (this.slides.length === 0) return;

            // Use scroll position instead of getBoundingClientRect for each slide
            const scrollLeft = this.wrapper.scrollLeft;
            const slideWidth = this.slides[0].offsetWidth;
            const gap = this.getGap();

            // Calculate index from scroll position
            const rtl = isRTL();
            const scrollPos = rtl ? -scrollLeft : scrollLeft;
            const newIndex = Math.round(scrollPos / (slideWidth + gap));

            this.currentIndex = Math.max(0, Math.min(newIndex, this.slides.length - this.slidesPerView));
        }

        // ==============================================
        // PAGINATION
        // ==============================================

        setupPagination() {
            if (!this.pagination) return;

            const pageCount = Math.ceil(this.slides.length / this.slidesPerView);

            // Hide pagination and navigation buttons if only one page
            if (pageCount <= 1) {
                this.pagination.style.display = 'none';
                this.pagination.innerHTML = '';
                if (this.navigation) this.navigation.style.display = 'none';
                if (this.prevBtn) this.prevBtn.style.display = 'none';
                if (this.nextBtn) this.nextBtn.style.display = 'none';
                // Disable overflow on wrapper when only one page
                this.wrapper.style.overflow = 'unset';
                return;
            }

            // Show pagination and navigation buttons
            this.pagination.style.display = '';
            this.pagination.innerHTML = '';
            if (this.navigation) this.navigation.style.display = '';
            if (this.prevBtn) this.prevBtn.style.display = '';
            if (this.nextBtn) this.nextBtn.style.display = '';
            // Re-enable overflow on wrapper
            this.wrapper.style.overflow = '';

            // Helper to handle navigation action (same as in setupNavigation)
            const handleNav = (btn, action) => {
                // Use mousedown for immediate response on press
                btn.addEventListener('mousedown', (e) => {
                    if (e.button !== 0) return; // Only left mouse button
                    e.preventDefault();
                    action();
                });

                // Use touchstart for immediate response on touch devices
                btn.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    action();
                }, { passive: false });

                // Keep keyboard support (Enter/Space keys trigger click naturally)
                btn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        action();
                    }
                });
            };

            for (let i = 0; i < pageCount; i++) {
                const bullet = document.createElement('button');
                bullet.className = 'nds-swiper-pagination-bullet';
                bullet.type = 'button';
                bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);

                // Apply handleNav for immediate response on dots
                handleNav(bullet, () => {
                    const targetIndex = i * this.slidesPerView;
                    this.goTo(targetIndex);
                });

                this.pagination.appendChild(bullet);
            }

            this.updatePagination();
        }

        updatePagination() {
            if (!this.pagination) return;

            const bullets = this.pagination.querySelectorAll('.nds-swiper-pagination-bullet');
            const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);

            // Map currentIndex to page based on proximity to page start indices
            // For 6 slides, 4 per view: page 0 starts at index 0, page 1 starts at index 2
            let currentPage = 0;
            let closestDistance = Infinity;

            for (let i = 0; i < bullets.length; i++) {
                const pageStartIndex = Math.min(i * this.slidesPerView, maxIndex);
                const distance = Math.abs(this.currentIndex - pageStartIndex);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    currentPage = i;
                }
            }

            bullets.forEach((bullet, i) => {
                const isActive = i === currentPage;
                bullet.classList.toggle('nds-swiper-pagination-bullet-active', isActive);
                bullet.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        }

        // ==============================================
        // KEYBOARD
        // ==============================================

        setupKeyboard() {
            if (!this.container.hasAttribute('tabindex')) {
                this.container.setAttribute('tabindex', '0');
            }

            // Track if mouse is over swiper for keyboard navigation
            let isHovered = false;
            this.container.addEventListener('mouseenter', () => isHovered = true);
            this.container.addEventListener('mouseleave', () => isHovered = false);

            document.addEventListener('keydown', (e) => {
                // Only respond if swiper is focused or hovered
                const isFocused = this.container.contains(document.activeElement);
                if (!isFocused && !isHovered) return;

                const rtl = isRTL();

                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        const leftBtn = rtl ? this.nextBtn : this.prevBtn;
                        if (leftBtn && !leftBtn.disabled) leftBtn.click();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        const rightBtn = rtl ? this.prevBtn : this.nextBtn;
                        if (rightBtn && !rightBtn.disabled) rightBtn.click();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.goTo(0);
                        break;
                    case 'End':
                        e.preventDefault();
                        this.goTo(this.slides.length - this.slidesPerView);
                        break;
                }
            });
        }

        // ==============================================
        // LAZY LOADING
        // ==============================================

        setupLazyLoading() {
            const lazySlides = this.slides.filter(slide =>
                slide.querySelector('img[data-src], img[data-srcset]')
            );

            if (lazySlides.length === 0) return;

            const offs = [];
            lazySlides.forEach(slide => {
                const off = NDS.onIntersect(slide, (entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('img[data-src], img[data-srcset]').forEach(img => {
                            if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
                            if (img.dataset.srcset) { img.srcset = fixSrcsetSpaces(img.dataset.srcset); delete img.dataset.srcset; }
                        });
                        off();
                    }
                }, { rootMargin: '200px' });
                offs.push(off);
            });
            this._offLazyLoad = offs;
        }

        // ==============================================
        // STATE UPDATE
        // ==============================================

        updateState() {
            // Skip if index hasn't changed
            if (this.lastIndex === this.currentIndex) return;
            this.lastIndex = this.currentIndex;

            this.updatePagination();
            this.updateButtons();
            this.updateBoundaryClasses();
        }

        updateButtons() {
            const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);

            if (this.prevBtn) {
                this.prevBtn.disabled = this.currentIndex <= 0;
            }
            if (this.nextBtn) {
                this.nextBtn.disabled = this.currentIndex >= maxIndex;
            }
        }

        updateBoundaryClasses() {
            const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
            this.container.classList.toggle('at-start', this.currentIndex <= 0);
            this.container.classList.toggle('at-end', this.currentIndex >= maxIndex);
        }

        // ==============================================
        // PUBLIC API
        // ==============================================

        slideTo(index, animate = true) {
            const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
            index = Math.max(0, Math.min(index, maxIndex));

            const targetSlide = this.slides[index];
            if (!targetSlide) return;

            // Calculate scroll position relative to wrapper
            const wrapperRect = this.wrapper.getBoundingClientRect();
            const slideRect = targetSlide.getBoundingClientRect();

            const rtl = isRTL();
            let scrollDelta;

            if (rtl) {
                scrollDelta = slideRect.right - wrapperRect.right;
            } else {
                scrollDelta = slideRect.left - wrapperRect.left;
            }

            // Scroll wrapper
            this.wrapper.scrollBy({
                left: scrollDelta,
                behavior: animate ? 'smooth' : 'instant'
            });
        }

        // ==============================================
        // CLEANUP
        // ==============================================

        destroy() {
            this.container.removeAttribute('data-swiper-initialized');
            this.container.removeAttribute('tabindex');
            if (this.pagination) {
                this.pagination.innerHTML = '';
            }
            if (this._offVisibility) { this._offVisibility(); this._offVisibility = null; }
            if (this._offLazyLoad) { this._offLazyLoad.forEach(off => off()); this._offLazyLoad = null; }
            if (this.resizeHandler) {
                window.removeEventListener('resize', this.resizeHandler);
            }
        }
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    function initializeComponents() {
        // First, fix any existing srcset attributes with spaces
        document.querySelectorAll('img[srcset]').forEach(img => {
            const srcset = img.getAttribute('srcset');
            if (srcset && srcset.includes(' ') && !srcset.includes('%20')) {
                // Check if it needs encoding (has spaces but not already encoded)
                const fixed = fixSrcsetSpaces(srcset);
                if (fixed !== srcset) {
                    img.setAttribute('srcset', fixed);
                }
            }
        });

        // Then initialize swipers
        const swipers = document.querySelectorAll('.nds-swiper');
        swipers.forEach(swiper => {
            if (swiper.closest('code, .code-example')) return;
            if (!swiper.hasAttribute('data-swiper-initialized')) {
                const instance = new NDSSwiper(swiper);
                swiper._ndsSwiper = instance;
            }
        });
    }

    // Export to window
    window.NDSSwiper = {
        init: initializeComponents,
        create: (element) => {
            const instance = new NDSSwiper(element);
            element._ndsSwiper = instance;
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
