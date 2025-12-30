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

    function debounce(fn, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    }

    function isRTL() {
        return document.documentElement.dir === 'rtl';
    }

    // Cache contentMaxWidth globally (same for all swipers)
    let contentMaxWidth = null;
    function getContentMaxWidth() {
        if (contentMaxWidth === null) {
            contentMaxWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nds-content-MaxWidth')) || 1280;
        }
        return contentMaxWidth;
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

        setInitialSlidesPerView() {
            // Read slides count directly from attributes and set CSS variable immediately
            const width = window.innerWidth;
            const max = parseInt(this.container.getAttribute('slides-max')) || 1;
            const mid = parseInt(this.container.getAttribute('slides-mid')) || 1;
            const min = parseInt(this.container.getAttribute('slides-min')) || 1;

            let initial = min;
            if (width >= 1280) {
                initial = max;
            } else if (width >= 960) {
                initial = mid;
            }

            // Set both CSS variable and instance property to prevent CLS
            this.container.style.setProperty('--swiper-slides', initial);
            this.slidesPerView = initial;
        }

        init() {
            this.updateSlidesPerView();
            this.setupNavigation();
            this.setupPagination();
            this.setupScrollSync();
            this.setupKeyboard();
            this.setupResize();
            this.setupLazyLoading();
            this.setupContentObserver();
            this.updateState();
            this.updatePeekStyles();

            this.container.setAttribute('data-swiper-initialized', 'true');
        }

        setupContentObserver() {
            let lastScrollWidth = this.wrapper.scrollWidth;

            const checkScrollWidth = debounce(() => {
                const currentScrollWidth = this.wrapper.scrollWidth;
                if (currentScrollWidth !== lastScrollWidth) {
                    lastScrollWidth = currentScrollWidth;
                    this.updatePeekStyles();
                }
            }, 100);

            const observer = new ResizeObserver(checkScrollWidth);
            observer.observe(this.wrapper);

            // Disconnect after 500ms
            setTimeout(() => observer.disconnect(), 500);
        }


        // ==============================================
        // RESPONSIVE SLIDES PER VIEW
        // ==============================================

        updateSlidesPerView() {
            const width = window.innerWidth;
            const max = parseInt(this.container.getAttribute('slides-max')) || 1;
            const mid = parseInt(this.container.getAttribute('slides-mid')) || 1;
            const min = parseInt(this.container.getAttribute('slides-min')) || 1;
            const peek = parseInt(this.container.getAttribute('peek')) || 0;

            let newSlidesPerView = min;
            if (width >= 1280) {
                newSlidesPerView = max;
            } else if (width >= 960) {
                newSlidesPerView = mid;
            }

            // Only update if changed (prevents unnecessary recalculation during init)
            if (newSlidesPerView !== this.slidesPerView) {
                this.slidesPerView = newSlidesPerView;
                this.container.style.setProperty('--swiper-slides', this.slidesPerView);
            }

            // Calculate number of pages
            const pageCount = Math.ceil(this.slides.length / this.slidesPerView);

            // Get swiper gap
            const gap = parseInt(getComputedStyle(this.container).getPropertyValue('--swiper-gap')) || 0;

            // Set peek to 0 if no peek attr, only one page, otherwise add gap to peek
            const effectivePeek = (peek > 0 && pageCount > 1) ? peek + gap : 0;

            this.container.style.setProperty('--swiper-peek', `${effectivePeek}px`);

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

            // If not peek and not single slide, remove full-width and gap if present
            if (!hasPeek && !hasOneSlidePage) {
                this.container.classList.remove('nds-full-width');
                this.container.style.removeProperty('--gap');
                return;
            }

            const maxWidth = getContentMaxWidth();
            const viewportWidth = window.innerWidth;
            const wrapperWidth = this.wrapper.clientWidth;
            const swiperContentWidth = this.wrapper.scrollWidth;

            const shouldBeFullWidth = (viewportWidth < maxWidth && viewportWidth < swiperContentWidth) ||
                                      (wrapperWidth < maxWidth && wrapperWidth < swiperContentWidth);
            const isFullWidth = this.container.classList.contains('nds-full-width');

            // Only toggle if state changed
            if (shouldBeFullWidth !== isFullWidth) {
                this.container.classList.toggle('nds-full-width', shouldBeFullWidth);

                // For non-peek single slide mode: set gap to viewport padding when full-width
                if (!hasPeek && hasOneSlidePage) {
                    if (shouldBeFullWidth) {
                        this.container.style.setProperty('--gap', 'var(--nds-viewport-padding)');
                    } else {
                        this.container.style.removeProperty('--gap');
                    }
                }
            }
        }

        setupResize() {
            const handleResize = debounce(() => {
                const oldSlidesPerView = this.slidesPerView;
                this.updateSlidesPerView();

                // If slides per view changed, update state
                if (oldSlidesPerView !== this.slidesPerView) {
                    this.updateState();
                }

                // Update peek styles and full-width class on resize
                this.updatePeekStyles();
            }, 150);

            window.addEventListener('resize', handleResize);
        }

        // ==============================================
        // NAVIGATION
        // ==============================================

        setupNavigation() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.prev();
                });
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.next();
                });
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

            // Scroll wrapper smoothly
            this.wrapper.scrollBy({
                left: scrollDelta,
                behavior: 'smooth'
            });
        }

        // ==============================================
        // SCROLL SYNC
        // ==============================================

        setupScrollSync() {
            // Update immediately on scroll for real-time feedback during drag
            this.wrapper.addEventListener('scroll', () => {
                this.detectCurrentSlide();
                this.updateState();
            }, { passive: true });
        }

        detectCurrentSlide() {
            if (this.slides.length === 0) return;

            const wrapperRect = this.wrapper.getBoundingClientRect();
            const wrapperStart = isRTL() ? wrapperRect.right : wrapperRect.left;

            let closestIndex = 0;
            let closestDistance = Infinity;

            this.slides.forEach((slide, index) => {
                const slideRect = slide.getBoundingClientRect();
                const slideStart = isRTL() ? slideRect.right : slideRect.left;
                const distance = Math.abs(slideStart - wrapperStart);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            this.currentIndex = closestIndex;
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

            for (let i = 0; i < pageCount; i++) {
                const bullet = document.createElement('button');
                bullet.className = 'nds-swiper-pagination-bullet';
                bullet.type = 'button';
                bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);

                bullet.addEventListener('click', (e) => {
                    e.preventDefault();
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
            // Find slides with data-src images
            const lazySlides = this.slides.filter(slide =>
                slide.querySelector('img[data-src], img[data-srcset]')
            );

            if (lazySlides.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('img[data-src], img[data-srcset]').forEach(img => {
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                delete img.dataset.src;
                            }
                            if (img.dataset.srcset) {
                                img.srcset = img.dataset.srcset;
                                delete img.dataset.srcset;
                            }
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '200px',
                threshold: 0
            });

            lazySlides.forEach(slide => observer.observe(slide));
            this.lazyLoadObserver = observer;
        }

        // ==============================================
        // STATE UPDATE
        // ==============================================

        updateState() {
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
            if (this.lazyLoadObserver) {
                this.lazyLoadObserver.disconnect();
            }
        }
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    function initializeComponents() {
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
