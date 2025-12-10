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

            // Update state immediately (before animation)
            this.currentIndex = clampedIndex;
            this.updateState();

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

            this.container.addEventListener('keydown', (e) => {
                if (!this.container.contains(document.activeElement)) return;

                const rtl = isRTL();

                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        rtl ? this.next() : this.prev();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        rtl ? this.prev() : this.next();
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

            // Update state immediately (before animation)
            this.currentIndex = index;
            this.updateState();

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
