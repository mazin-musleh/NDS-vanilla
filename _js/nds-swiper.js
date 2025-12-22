/**
 * NDS Swiper Component - CSS Scroll-Snap First
 * Minimal foundation with native scroll behavior
 * Uses CSS scroll-snap for positioning, JS for navigation/pagination sync
 */

(function() {
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
            this.prevBtn = container.querySelector('.nds-swiper-button-prev');
            this.nextBtn = container.querySelector('.nds-swiper-button-next');

            if (!this.wrapper || this.slides.length === 0) {
                console.warn('NDS Swiper: No wrapper or slides found');
                return;
            }

            this.currentIndex = 0;
            this.slidesPerView = 1;

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

            this.container.style.setProperty('--swiper-slides', this.slidesPerView);
            this.container.style.setProperty('--swiper-peek', `${peek}px`);

            // Apply peek styles dynamically to first/last view slides
            this.updatePeekStyles();

            // Rebuild pagination when slides per view changes
            if (this.pagination) {
                this.setupPagination();
            }
        }

        updatePeekStyles() {
            const peek = parseInt(this.container.getAttribute('peek')) || 0;

            if (peek <= 0) {
                // Clear all inline styles if no peek
                this.slides.forEach(slide => {
                    slide.style.flexBasis = '';
                });
                return;
            }

            // Clear all inline styles first
            this.slides.forEach(slide => {
                slide.style.flexBasis = '';
            });

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

                // If slides per view changed, update state
                if (oldSlidesPerView !== this.slidesPerView) {
                    this.updateState();
                }
            }, 150);

            window.addEventListener('resize', handleResize);
        }

        // ==============================================
        // NAVIGATION
        // ==============================================

        setupNavigation() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prev());
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.next());
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

            targetSlide.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start'
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
            let isDragging = false;
            let startX = 0;
            let scrollStart = 0;

            // Only handle mouse, let touch use native behavior
            this.wrapper.addEventListener('pointerdown', (e) => {
                if (e.pointerType !== 'mouse') return;
                if (e.button !== 0) return;

                isDragging = true;
                startX = e.clientX;
                scrollStart = this.wrapper.scrollLeft;
                this.wrapper.style.cursor = 'grabbing';
                this.wrapper.setPointerCapture(e.pointerId);

                // Disable scroll-snap and smooth behavior during drag
                this.wrapper.style.scrollSnapType = 'none';
                this.wrapper.style.scrollBehavior = 'auto';
                e.preventDefault();
            });

            this.wrapper.addEventListener('pointermove', (e) => {
                if (!isDragging || e.pointerType !== 'mouse') return;
                const deltaX = e.clientX - startX;
                this.wrapper.scrollLeft = scrollStart - deltaX;
            });

            this.wrapper.addEventListener('pointerup', (e) => {
                if (!isDragging || e.pointerType !== 'mouse') return;
                isDragging = false;
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
            });

            this.wrapper.style.cursor = 'grab';
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
            this.pagination.innerHTML = '';

            for (let i = 0; i < pageCount; i++) {
                const bullet = document.createElement('button');
                bullet.className = 'nds-swiper-pagination-bullet';
                bullet.type = 'button';
                bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);

                bullet.addEventListener('click', () => {
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

            targetSlide.scrollIntoView({
                behavior: animate ? 'smooth' : 'instant',
                block: 'nearest',
                inline: 'start'
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
        }
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    function initializeComponents() {
        const swipers = document.querySelectorAll('.nds-swiper');
        swipers.forEach(swiper => {
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
