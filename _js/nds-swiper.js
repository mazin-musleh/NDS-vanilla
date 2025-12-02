/**
 * NDS Swiper Component
 * Simple, standalone carousel/slider with RTL/LTR support, drag functionality, and lazy loading
 * Uses CSS logical properties for direction-agnostic behavior
 */

(function() {
    'use strict';

    class NDSSwiper {
        constructor(container) {
            this.container = container;
            this.wrapper = container.querySelector('.nds-swiper-wrapper');
            this.originalSlides = Array.from(container.querySelectorAll('.nds-swiper-slide'));
            this.pagination = container.querySelector('.nds-swiper-pagination');
            this.prevButton = container.querySelector('.nds-swiper-button-prev');
            this.nextButton = container.querySelector('.nds-swiper-button-next');

            if (!this.wrapper || this.originalSlides.length === 0) {
                console.warn('NDS Swiper: No wrapper or slides found');
                return;
            }

            // Simple config from attributes
            this.speed = parseInt(container.getAttribute('speed')) || 500;
            this.loop = container.getAttribute('loop') === 'true';
            this.autoplay = parseInt(container.getAttribute('autoplay')) || 0;

            // Responsive slides per view
            this.slidesMax = parseInt(container.getAttribute('slides-max')) || 1;
            this.slidesMid = parseInt(container.getAttribute('slides-mid')) || 1;
            this.slidesMin = parseInt(container.getAttribute('slides-min')) || 1;

            // Store the real slide count (excluding clones)
            this.realSlideCount = this.originalSlides.length;

            // Clone slides for seamless loop if enabled
            if (this.loop && this.originalSlides.length > 1) {
                this.setupLoopClones();
            }

            // Get all slides (including clones)
            this.slides = Array.from(container.querySelectorAll('.nds-swiper-slide'));

            // State - start at logical index 0 (which is DOM index 1 in loop mode with clones)
            this.currentIndex = 0;
            this.dragState = { active: false, startX: 0, currentX: 0, hasDragged: false };
            this.autoplayTimer = null;
            this.isTransitioning = false;

            this.init();
        }

        init() {
            // Set CSS custom properties for responsive breakpoints
            this.setResponsiveProperties();

            // Setup all features
            this.setupNavigation();
            this.setupPagination();
            this.setupDrag();
            this.setupKeyboard();
            this.setupAutoplay();
            this.setupLazyLoading();
            this.setupResize();

            // Update initial state
            this.updateSlidePositions();
            this.goToSlide(0, false); // Go to first slide without animation

            // Mark as initialized
            this.container.setAttribute('data-swiper-initialized', 'true');
        }

        // ==============================================
        // DIRECTION DETECTION
        // ==============================================

        isRTL() {
            // Always check dynamically to handle language switching
            return document.documentElement.dir === 'rtl';
        }

        // ==============================================
        // SEAMLESS LOOP SETUP
        // ==============================================

        setupLoopClones() {
            // Clone the last slide and prepend it
            const lastClone = this.originalSlides[this.originalSlides.length - 1].cloneNode(true);
            lastClone.classList.add('nds-swiper-slide-clone');
            lastClone.setAttribute('aria-hidden', 'true'); // Hide from screen readers
            this.wrapper.insertBefore(lastClone, this.wrapper.firstChild);

            // Clone the first slide and append it
            const firstClone = this.originalSlides[0].cloneNode(true);
            firstClone.classList.add('nds-swiper-slide-clone');
            firstClone.setAttribute('aria-hidden', 'true'); // Hide from screen readers
            this.wrapper.appendChild(firstClone);
        }

        // ==============================================
        // RESPONSIVE SLIDES PER VIEW
        // ==============================================

        getSlidesPerView() {
            const width = window.innerWidth;

            // Use CSS breakpoints (not hardcoded!)
            // Match the breakpoints from _mixins.scss
            if (width >= 1280) return this.slidesMax;      // Large desktop
            if (width >= 960) return this.slidesMid;        // Desktop
            return this.slidesMin;                          // Mobile + Tablet
        }

        setResponsiveProperties() {
            // Set CSS custom property for slides-per-view
            // This allows CSS to control some responsive behavior
            const slidesPerView = this.getSlidesPerView();
            this.container.style.setProperty('--slides-per-view', slidesPerView);
        }

        updateSlidePositions() {
            const slidesPerView = this.getSlidesPerView();
            const slideWidth = 100 / slidesPerView;

            this.slides.forEach(slide => {
                slide.style.flex = `0 0 ${slideWidth}%`;
            });

            // Update pagination for new slide count
            if (this.pagination) {
                this.setupPagination();
            }

            // Ensure current index is valid
            const maxIndex = this.getMaxIndex();
            if (this.currentIndex > maxIndex) {
                this.goToSlide(maxIndex, false);
            }
        }

        setupResize() {
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    this.setResponsiveProperties();
                    this.updateSlidePositions();
                }, 150);
            });
        }

        // ==============================================
        // NAVIGATION
        // ==============================================

        setupNavigation() {
            if (this.prevButton) {
                this.prevButton.addEventListener('click', () => this.prev());
            }

            if (this.nextButton) {
                this.nextButton.addEventListener('click', () => this.next());
            }
        }

        getMaxIndex() {
            const slidesPerView = this.getSlidesPerView();
            // For loop mode with clones, max index is realSlideCount (clones not counted)
            // For non-loop mode, max index is total slides minus slides per view
            if (this.loop) {
                return this.realSlideCount;
            }
            return Math.max(0, this.slides.length - slidesPerView);
        }

        goToSlide(index, animate = true) {
            if (this.isTransitioning) return;

            const slidesPerView = this.getSlidesPerView();
            const slideWidth = 100 / slidesPerView;
            const isRTL = this.isRTL();

            if (this.loop) {
                // With clones: slides array is [lastClone, slide0, slide1, ..., slideN, firstClone]
                // Real slides are at indices 1 to realSlideCount
                // currentIndex represents the logical slide (0 to realSlideCount-1)

                // Store the logical current index
                this.currentIndex = index;

                // The actual DOM index to show (accounting for the prepended clone)
                let actualIndex = index + 1;

                // Apply transform to show the slide
                const translateValue = isRTL
                    ? (actualIndex * slideWidth)
                    : -(actualIndex * slideWidth);

                if (animate) {
                    this.isTransitioning = true;
                    this.wrapper.style.transition = `transform ${this.speed}ms var(--swiper-transition-timing)`;

                    // After animation completes, check if we need to wrap
                    setTimeout(() => {
                        this.isTransitioning = false;

                        // If we went past the last real slide, we're at the firstClone (index realSlideCount+1)
                        // Instantly snap to the real first slide (index 1)
                        if (this.currentIndex >= this.realSlideCount) {
                            this.currentIndex = 0;
                            actualIndex = 1;
                            this.wrapper.style.transition = 'none';
                            const finalTranslate = isRTL ? (actualIndex * slideWidth) : -(actualIndex * slideWidth);
                            this.wrapper.style.transform = `translateX(${finalTranslate}%)`;
                            void this.wrapper.offsetHeight; // Force reflow
                        }
                        // If we went before the first real slide, we're at the lastClone (index 0)
                        // Instantly snap to the real last slide (index realSlideCount)
                        else if (this.currentIndex < 0) {
                            this.currentIndex = this.realSlideCount - 1;
                            actualIndex = this.realSlideCount;
                            this.wrapper.style.transition = 'none';
                            const finalTranslate = isRTL ? (actualIndex * slideWidth) : -(actualIndex * slideWidth);
                            this.wrapper.style.transform = `translateX(${finalTranslate}%)`;
                            void this.wrapper.offsetHeight; // Force reflow
                        }
                    }, this.speed);
                } else {
                    this.wrapper.style.transition = 'none';
                }

                this.wrapper.style.transform = `translateX(${translateValue}%)`;

            } else {
                // Non-loop mode: clamp to valid range
                const maxIndex = this.getMaxIndex();
                this.currentIndex = Math.max(0, Math.min(index, maxIndex));

                const translateValue = isRTL
                    ? (this.currentIndex * slideWidth)
                    : -(this.currentIndex * slideWidth);

                if (animate) {
                    this.isTransitioning = true;
                    this.wrapper.style.transition = `transform ${this.speed}ms var(--swiper-transition-timing)`;
                    setTimeout(() => {
                        this.isTransitioning = false;
                    }, this.speed);
                } else {
                    this.wrapper.style.transition = 'none';
                }

                this.wrapper.style.transform = `translateX(${translateValue}%)`;
            }

            // Update UI
            this.updatePagination();
            this.updateButtons();
            this.updateLazyLoading();

            // Dispatch custom event
            this.container.dispatchEvent(new CustomEvent('nds:swiper:slideChange', {
                detail: { index: this.currentIndex, slide: this.slides[this.currentIndex] },
                bubbles: true
            }));

            // Announce to screen readers
            this.announceSlideChange();
        }

        next() {
            this.goToSlide(this.currentIndex + 1);

            // Reset autoplay timer
            if (this.autoplay) {
                this.resetAutoplay();
            }
        }

        prev() {
            this.goToSlide(this.currentIndex - 1);

            // Reset autoplay timer
            if (this.autoplay) {
                this.resetAutoplay();
            }
        }

        updateButtons() {
            if (!this.loop) {
                // Disable buttons at boundaries
                if (this.prevButton) {
                    this.prevButton.disabled = this.currentIndex === 0;
                }

                if (this.nextButton) {
                    const maxIndex = this.getMaxIndex();
                    this.nextButton.disabled = this.currentIndex >= maxIndex;
                }
            }
        }

        // ==============================================
        // PAGINATION
        // ==============================================

        setupPagination() {
            if (!this.pagination) return;

            // Calculate total pages using real slide count (not including clones)
            const slidesPerView = this.getSlidesPerView();
            const slideCount = this.loop ? this.realSlideCount : this.slides.length;
            const totalPages = Math.ceil(slideCount / slidesPerView);

            // Clear existing bullets
            this.pagination.innerHTML = '';

            // Create bullets
            for (let i = 0; i < totalPages; i++) {
                const bullet = document.createElement('button');
                bullet.className = 'nds-swiper-pagination-bullet';
                bullet.setAttribute('type', 'button');
                bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);

                bullet.addEventListener('click', () => {
                    this.goToSlide(i);
                    if (this.autoplay) {
                        this.resetAutoplay();
                    }
                });

                this.pagination.appendChild(bullet);
            }

            // Update active state
            this.updatePagination();
        }

        updatePagination() {
            if (!this.pagination) return;

            const bullets = this.pagination.querySelectorAll('.nds-swiper-pagination-bullet');
            bullets.forEach((bullet, i) => {
                if (i === this.currentIndex) {
                    bullet.classList.add('nds-swiper-pagination-bullet-active');
                    bullet.setAttribute('aria-current', 'true');
                } else {
                    bullet.classList.remove('nds-swiper-pagination-bullet-active');
                    bullet.removeAttribute('aria-current');
                }
            });
        }

        // ==============================================
        // DRAG / SWIPE
        // ==============================================

        setupDrag() {
            // Mouse events
            this.container.addEventListener('mousedown', (e) => this.handleDragStart(e));
            document.addEventListener('mousemove', (e) => this.handleDragMove(e));
            document.addEventListener('mouseup', () => this.handleDragEnd());

            // Touch events
            this.container.addEventListener('touchstart', (e) => this.handleDragStart(e), { passive: false });
            document.addEventListener('touchmove', (e) => this.handleDragMove(e), { passive: false });
            document.addEventListener('touchend', () => this.handleDragEnd());

            // Prevent default drag behavior on images
            this.slides.forEach(slide => {
                const images = slide.querySelectorAll('img');
                images.forEach(img => {
                    img.addEventListener('dragstart', (e) => e.preventDefault());
                });
            });
        }

        handleDragStart(e) {
            if (this.isTransitioning) return;

            const point = e.touches ? e.touches[0] : e;

            this.dragState = {
                active: true,
                startX: point.pageX,
                currentX: point.pageX,
                hasDragged: false
            };

            this.container.style.cursor = 'grabbing';
            this.wrapper.style.transition = 'none';

            // Pause autoplay during drag
            if (this.autoplay && this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
            }
        }

        handleDragMove(e) {
            if (!this.dragState.active) return;

            const point = e.touches ? e.touches[0] : e;
            const diff = point.pageX - this.dragState.startX;

            // Mark as dragged if moved more than 3px (threshold)
            if (Math.abs(diff) > 3) {
                this.dragState.hasDragged = true;
                e.preventDefault(); // Prevent text selection
            }

            this.dragState.currentX = point.pageX;

            // Visual feedback during drag
            if (this.dragState.hasDragged) {
                const slidesPerView = this.getSlidesPerView();
                const slideWidth = 100 / slidesPerView;
                const dragPercent = (diff / this.container.offsetWidth) * 100;

                // Check RTL dynamically
                const isRTL = this.isRTL();

                // In loop mode, account for the prepended clone (actualIndex = currentIndex + 1)
                const baseIndex = this.loop ? (this.currentIndex + 1) : this.currentIndex;

                // RTL uses positive base, LTR uses negative base
                const currentTranslate = isRTL
                    ? (baseIndex * slideWidth)
                    : -(baseIndex * slideWidth);

                const newTranslate = currentTranslate + dragPercent;

                this.wrapper.style.transform = `translateX(${newTranslate}%)`;
            }
        }

        handleDragEnd() {
            if (!this.dragState.active) return;

            this.container.style.cursor = '';
            this.wrapper.style.transition = '';

            if (this.dragState.hasDragged) {
                const diff = this.dragState.currentX - this.dragState.startX;
                const threshold = 50; // pixels to trigger slide change

                if (Math.abs(diff) > threshold) {
                    // Check RTL dynamically
                    const isRTL = this.isRTL();

                    // Positive diff = dragged right, negative = dragged left
                    // LTR: drag right = prev, drag left = next
                    // RTL: drag right = next, drag left = prev (reversed because coordinate system is flipped)
                    if (isRTL) {
                        if (diff > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    } else {
                        if (diff > 0) {
                            this.prev();
                        } else {
                            this.next();
                        }
                    }
                } else {
                    // Snap back to current slide
                    this.goToSlide(this.currentIndex, true);
                }

                // Prevent click events immediately after drag
                setTimeout(() => {
                    this.dragState.hasDragged = false;
                }, 100);
            }

            // Resume autoplay
            if (this.autoplay) {
                this.startAutoplay();
            }

            this.dragState.active = false;
        }

        // ==============================================
        // KEYBOARD NAVIGATION
        // ==============================================

        setupKeyboard() {
            this.container.addEventListener('keydown', (e) => {
                // Only handle keyboard if container or its children are focused
                if (!this.container.contains(document.activeElement)) return;

                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        // Check RTL dynamically and swap direction
                        this.isRTL() ? this.next() : this.prev();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        // Check RTL dynamically and swap direction
                        this.isRTL() ? this.prev() : this.next();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.goToSlide(0);
                        break;
                    case 'End':
                        e.preventDefault();
                        this.goToSlide(this.getMaxIndex());
                        break;
                }
            });

            // Make container focusable
            if (!this.container.hasAttribute('tabindex')) {
                this.container.setAttribute('tabindex', '0');
            }
        }

        // ==============================================
        // AUTOPLAY
        // ==============================================

        setupAutoplay() {
            if (!this.autoplay) return;

            this.startAutoplay();

            // Pause on hover
            this.container.addEventListener('mouseenter', () => {
                if (this.autoplayTimer) {
                    clearInterval(this.autoplayTimer);
                }
            });

            this.container.addEventListener('mouseleave', () => {
                if (this.autoplay && !this.dragState.active) {
                    this.startAutoplay();
                }
            });

            // Pause on focus (accessibility)
            this.container.addEventListener('focusin', () => {
                if (this.autoplayTimer) {
                    clearInterval(this.autoplayTimer);
                }
            });

            this.container.addEventListener('focusout', () => {
                if (this.autoplay && !this.dragState.active) {
                    this.startAutoplay();
                }
            });
        }

        startAutoplay() {
            if (!this.autoplay) return;

            this.autoplayTimer = setInterval(() => {
                this.next();
            }, this.autoplay);
        }

        resetAutoplay() {
            if (!this.autoplay) return;

            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
            }

            this.startAutoplay();
        }

        // ==============================================
        // LAZY LOADING
        // ==============================================

        setupLazyLoading() {
            const lazyImages = this.container.querySelectorAll('img[data-src], [data-bg]');

            if ('IntersectionObserver' in window) {
                this.imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.loadImage(entry.target);
                            this.imageObserver.unobserve(entry.target);
                        }
                    });
                }, {
                    root: this.container,
                    rootMargin: '50px' // Load 50px before slide becomes visible
                });

                lazyImages.forEach(element => this.imageObserver.observe(element));
            } else {
                // Fallback: load all images immediately
                lazyImages.forEach(element => this.loadImage(element));
            }

            // Load images in visible slides immediately
            this.updateLazyLoading();
        }

        updateLazyLoading() {
            // Load images in currently visible slides
            const slidesPerView = this.getSlidesPerView();
            const visibleSlides = this.slides.slice(
                this.currentIndex,
                this.currentIndex + slidesPerView
            );

            visibleSlides.forEach(slide => {
                const lazyElements = slide.querySelectorAll('img[data-src], [data-bg]');
                lazyElements.forEach(element => this.loadImage(element));
            });
        }

        loadImage(element) {
            // Handle <img> with data-src
            if (element.tagName === 'IMG' && element.dataset.src) {
                element.src = element.dataset.src;
                element.removeAttribute('data-src');

                // Add loaded class for fade-in effect
                element.addEventListener('load', () => {
                    element.classList.add('loaded');
                });
            }

            // Handle background images with data-bg
            if (element.dataset.bg) {
                element.style.backgroundImage = `url(${element.dataset.bg})`;
                element.removeAttribute('data-bg');
                element.classList.add('loaded');
            }
        }

        // ==============================================
        // ACCESSIBILITY
        // ==============================================

        announceSlideChange() {
            // Create or update ARIA live region for screen readers
            let liveRegion = this.container.querySelector('.nds-swiper-sr-only');

            if (!liveRegion) {
                liveRegion = document.createElement('div');
                liveRegion.className = 'nds-swiper-sr-only';
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('aria-atomic', 'true');
                this.container.appendChild(liveRegion);
            }

            const slidesPerView = this.getSlidesPerView();
            const totalSlides = Math.ceil(this.slides.length / slidesPerView);
            liveRegion.textContent = `Slide ${this.currentIndex + 1} of ${totalSlides}`;
        }

        // ==============================================
        // CLEANUP
        // ==============================================

        destroy() {
            // Clear autoplay timer
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
            }

            // Disconnect intersection observer
            if (this.imageObserver) {
                this.imageObserver.disconnect();
            }

            // Remove data attribute
            this.container.removeAttribute('data-swiper-initialized');
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
                swiper._ndsSwiper = instance; // Store reference for dir observer
            }
        });
    }

    // Watch for dir attribute changes and reinitialize
    let dirObserver = null;

    function setupDirObserver() {
        // Watch for changes to the dir attribute
        dirObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
                    // Dir changed, reinitialize all swipers
                    const swipers = document.querySelectorAll('.nds-swiper[data-swiper-initialized]');
                    swipers.forEach(swiper => {
                        // Force a refresh by going to current slide
                        const swiperInstance = swiper._ndsSwiper;
                        if (swiperInstance) {
                            swiperInstance.goToSlide(swiperInstance.currentIndex, false);
                        }
                    });
                }
            });
        });

        dirObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['dir']
        });
    }

    // Wait for dir attribute to be set before initializing
    function waitForDirAndInitialize() {
        // Use requestAnimationFrame to ensure we check after other scripts have run
        requestAnimationFrame(() => {
            setTimeout(() => {
                initializeComponents();
                setupDirObserver();
            }, 100); // Wait 100ms for showcase.js to set dir
        });
    }

    // Export to window
    window.NDSSwiper = {
        init: initializeComponents,
        create: (element) => {
            const instance = new NDSSwiper(element);
            element._ndsSwiper = instance; // Store reference for dir observer
            return instance;
        }
    };

    // Auto-initialize if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForDirAndInitialize);
    } else {
        waitForDirAndInitialize();
    }

})();
