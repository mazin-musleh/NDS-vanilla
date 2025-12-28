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

    // ==============================================
    // MAIN CLASS
    // ==============================================

    class NDSSwiper {
        constructor(container) {
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

            this.currentIndex = 0;
            this.slidesPerView = 1;
            this.dragEnabled = false;

            this.init();
        }

        init() {
            this.updateSlidesPerView();
            this.setupNavigation();
            this.setupPagination();
            this.setupScrollSync();
            this.setupMouseDrag();
            this.setupKeyboard();
            this.setupResize();
            this.setupLazyLoading();
            this.updateState();

            this.container.setAttribute('data-swiper-initialized', 'true');
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

            if (width >= 1280) {
                this.slidesPerView = max;
            } else if (width >= 960) {
                this.slidesPerView = mid;
            } else {
                this.slidesPerView = min;
            }

            // Calculate number of pages
            const pageCount = Math.ceil(this.slides.length / this.slidesPerView);

            // Get swiper gap
            const gap = parseInt(getComputedStyle(this.container).getPropertyValue('--swiper-gap')) || 0;

            // Set peek to 0 if no peek attr, only one page, otherwise add gap to peek
            const effectivePeek = (peek > 0 && pageCount > 1) ? peek + gap : 0;

            this.container.style.setProperty('--swiper-slides', this.slidesPerView);
            this.container.style.setProperty('--swiper-peek', `${effectivePeek}px`);

            // Apply peek styles dynamically to first/last view slides
            this.updatePeekStyles();

            // Rebuild pagination when slides per view changes
            if (this.pagination) {
                this.setupPagination();
            }
        }

        updatePeekStyles() {
            const peek = parseInt(this.container.getAttribute('peek')) || 0;

            // Clear all inline styles first
            this.slides.forEach(slide => {
                slide.style.flexBasis = '';
                slide.style.paddingInlineStart = '';
                slide.style.paddingInlineEnd = '';
            });

            // Check if swiper has nds-full-width class
            const isFullWidth = this.container.classList.contains('nds-full-width');

            // Only apply viewport padding logic if swiper has nds-full-width class
            if (isFullWidth) {
                // Get viewport width and content max width
                const viewportWidth = window.innerWidth;
                const contentMaxWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nds-content-MaxWidth')) || 1280;

                // Calculate total swiper content width (scrollWidth of wrapper)
                const swiperContentWidth = this.wrapper.scrollWidth;

                // Apply viewport padding if viewport < contentMaxWidth AND viewport < swiperContentWidth
                if (viewportWidth < contentMaxWidth && viewportWidth < swiperContentWidth) {
                    if (this.slides[0]) {
                        this.slides[0].style.paddingInlineStart = 'var(--nds-viewport-padding)';
                    }
                    if (this.slides[this.slides.length - 1]) {
                        this.slides[this.slides.length - 1].style.paddingInlineEnd = 'var(--nds-viewport-padding)';
                    }
                }
            }

            // Only apply peek expansion if peek is set and more than one slide per view
            if (peek <= 0 || this.slidesPerView <= 1) {
                return;
            }

            // Apply expanded width to first N slides (first view)
            for (let i = 0; i < Math.min(this.slidesPerView, this.slides.length); i++) {
                this.slides[i].style.flexBasis = `calc((100% + var(--swiper-peek)) / var(--swiper-slides))`;
            }

            // Apply expanded width to last N slides (last view)
            const startIndex = Math.max(0, this.slides.length - this.slidesPerView);
            for (let i = startIndex; i < this.slides.length; i++) {
                this.slides[i].style.flexBasis = `calc((100% + var(--swiper-peek)) / var(--swiper-slides))`;
            }
        }

        setupResize() {
            const handleResize = debounce(() => {
                const oldSlidesPerView = this.slidesPerView;
                this.updateSlidesPerView();

                // If slides per view changed, update state and drag listeners
                if (oldSlidesPerView !== this.slidesPerView) {
                    this.updateState();
                    this.updateDragListeners();
                }
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

        // ==============================================
        // MOUSE DRAG (for non-touch devices)
        // ==============================================

        setupMouseDrag() {
            // Store drag state
            if (!this.dragState) {
                this.dragState = {
                    isDragging: false,
                    startX: 0,
                    scrollStart: 0
                };
            }

            // Define handlers
            const handlePointerDown = (e) => {
                if (e.pointerType !== 'mouse') return;
                if (e.button !== 0) return;

                // Don't interfere with interactive elements
                if (e.target.closest('button, a, input, select, textarea, [role="button"]')) return;

                this.dragState.isDragging = true;
                this.dragState.startX = e.clientX;
                this.dragState.scrollStart = this.wrapper.scrollLeft;
                this.wrapper.style.cursor = 'grabbing';
                this.wrapper.setPointerCapture(e.pointerId);

                // Disable scroll-snap and smooth behavior during drag
                this.wrapper.style.scrollSnapType = 'none';
                this.wrapper.style.scrollBehavior = 'auto';
                e.preventDefault();
            };

            const handlePointerMove = (e) => {
                if (!this.dragState.isDragging || e.pointerType !== 'mouse') return;
                const deltaX = e.clientX - this.dragState.startX;
                this.wrapper.scrollLeft = this.dragState.scrollStart - deltaX;
            };

            const handlePointerUp = (e) => {
                if (!this.dragState.isDragging || e.pointerType !== 'mouse') return;
                this.dragState.isDragging = false;
                this.wrapper.style.cursor = 'grab';
                this.wrapper.releasePointerCapture(e.pointerId);

                // Detect nearest slide and use goTo for smooth animation
                this.detectCurrentSlide();

                // Re-enable smooth behavior and animate to slide
                this.wrapper.style.scrollBehavior = '';
                requestAnimationFrame(() => {
                    this.goTo(this.currentIndex);
                    // Re-enable scroll-snap after animation starts
                    setTimeout(() => {
                        this.wrapper.style.scrollSnapType = '';
                    }, 50);
                });
            };

            // Store handlers for cleanup
            this.dragHandlers = {
                down: handlePointerDown,
                move: handlePointerMove,
                up: handlePointerUp
            };

            // Add or remove listeners based on page count
            this.updateDragListeners();
        }

        updateDragListeners() {
            const pageCount = Math.ceil(this.slides.length / this.slidesPerView);
            const shouldEnableDrag = pageCount > 1;

            // Remove existing listeners if they exist
            if (this.dragHandlers && this.dragEnabled) {
                this.wrapper.removeEventListener('pointerdown', this.dragHandlers.down);
                this.wrapper.removeEventListener('pointermove', this.dragHandlers.move);
                this.wrapper.removeEventListener('pointerup', this.dragHandlers.up);
                this.dragEnabled = false;
            }

            // Add listeners if needed
            if (shouldEnableDrag && this.dragHandlers) {
                this.wrapper.addEventListener('pointerdown', this.dragHandlers.down);
                this.wrapper.addEventListener('pointermove', this.dragHandlers.move);
                this.wrapper.addEventListener('pointerup', this.dragHandlers.up);
                this.wrapper.style.cursor = 'grab';
                this.dragEnabled = true;
            } else {
                this.wrapper.style.cursor = '';
            }
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
                return;
            }

            // Show pagination and navigation buttons
            this.pagination.style.display = '';
            this.pagination.innerHTML = '';
            if (this.navigation) this.navigation.style.display = '';
            if (this.prevBtn) this.prevBtn.style.display = '';
            if (this.nextBtn) this.nextBtn.style.display = '';

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
