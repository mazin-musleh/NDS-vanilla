/**
 * NDS Swiper Component
 * Simple, standalone carousel/slider with RTL/LTR support, drag functionality, and lazy loading
 * Uses CSS logical properties for direction-agnostic behavior
 */

(function() {
    'use strict';

    // ==============================================
    // CONSTANTS
    // ==============================================
    const DRAG_THRESHOLD = 60; // pixels to trigger slide change
    const DRAG_START_THRESHOLD = 3; // pixels to mark as dragged
    const LAZY_LOAD_MARGIN = '60px'; // margin before loading images
    const RESIZE_DEBOUNCE = 160; // ms to debounce resize events

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

            // Autoplay only works with loop mode enabled
            const autoplayAttr = parseInt(container.getAttribute('autoplay')) || 0;
            this.autoplay = this.loop ? autoplayAttr : 0;

            if (autoplayAttr > 0 && !this.loop) {
                console.warn('NDS Swiper: Autoplay requires loop="true". Autoplay disabled.');
            }

            // Responsive slides per view
            this.slidesMax = parseInt(container.getAttribute('slides-max')) || 1;
            this.slidesMid = parseInt(container.getAttribute('slides-mid')) || 1;
            this.slidesMin = parseInt(container.getAttribute('slides-min')) || 1;

            // Peek amount: pixels of next/prev slide to show on each side
            // Example: peek="50" shows 50px of adjacent slides on each side
            this.peekPx = parseInt(container.getAttribute('peek')) || 0;
            this.peekPx = Math.max(0, this.peekPx); // Must be positive

            // Store the real slide count (excluding clones)
            this.realSlideCount = this.originalSlides.length;

            // Track current breakpoint for smart reinitialization
            this.currentBreakpoint = this.detectBreakpoint();

            // Calculate clone count for loop mode based on CURRENT breakpoint
            const currentSlidesPerView = this.getSlidesPerViewForBreakpoint(this.currentBreakpoint);

            // Optimized cloning strategy for seamless looping:
            // Calculate ratio to detect simple vs edge cases
            const ratio = currentSlidesPerView / this.originalSlides.length;

            // Smart cloning based on how many slides are visible relative to total:
            // - Simple cases (ratio ≤ 0.5): Showing few slides relative to total
            //   Example: 3 slides showing 1 → ratio 0.33 → only need 1 clone per side
            // - Edge cases (ratio > 0.5): Showing many slides relative to total
            //   Example: 4 slides showing 3 → ratio 0.75 → need slideCount + currentSlidesPerView
            if (ratio <= 0.5) {
                // Simple case: Need only currentSlidesPerView clones to fill the viewport
                this.cloneCount = currentSlidesPerView;
            } else {
                // Edge case: Need full slideCount + currentSlidesPerView for smooth wrapping
                // When advancing by slidesPerView, we need enough clones to avoid gaps
                this.cloneCount = this.originalSlides.length + currentSlidesPerView;
            }

            // Clone slides for seamless loop if enabled
            if (this.loop && this.originalSlides.length > 1) {
                this.setupLoopClones();
            }

            // Get all slides (including clones)
            this.slides = Array.from(container.querySelectorAll('.nds-swiper-slide'));

            // State - start at logical index 0 (which is DOM index cloneCount in loop mode with clones)
            this.currentIndex = 0;
            this.currentDOMIndex = this.loop ? this.cloneCount : 0; // Track actual DOM position for smooth interruptions
            this.dragState = { active: false, startX: 0, currentX: 0, hasDragged: false };
            this.autoplayTimer = null;
            this.autoplayPaused = false; // Track if autoplay is paused (hover/drag)
            this.isTransitioning = false;
            this.transitionTimeout = null; // Track transition timeout for interruption
            this.pendingSnapIndex = undefined; // Track if we need to snap to real slide after animation
            this.resizeTimer = null;

            // Bound event handlers for cleanup
            this.handleDragMoveBound = (e) => this.handleDragMove(e);
            this.handleDragEndBound = () => this.handleDragEnd();
            this.handleResizeBound = null;

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
        // BREAKPOINT DETECTION
        // ==============================================

        detectBreakpoint() {
            const width = window.innerWidth;
            if (width >= 1280) return 'max';
            if (width >= 960) return 'mid';
            return 'min';
        }

        getSlidesPerViewForBreakpoint(breakpoint) {
            switch (breakpoint) {
                case 'max': return this.slidesMax;
                case 'mid': return this.slidesMid;
                case 'min': return this.slidesMin;
                default: return this.slidesMin;
            }
        }

        // ==============================================
        // SEAMLESS LOOP SETUP
        // ==============================================

        setupLoopClones() {
            // Use the pre-calculated clone count
            const cloneCount = this.cloneCount;
            const slideCount = this.originalSlides.length;

            // Clone slides by wrapping around the array if cloneCount > slideCount
            // This handles cases like: 4 slides needing 7 clones = repeat slides [1,2,3,4,1,2,3]

            // Clone and prepend (last N slides, wrapping if needed)
            for (let i = 0; i < cloneCount; i++) {
                // Calculate which original slide to clone (wrap using modulo)
                const slideIndex = (slideCount - cloneCount + i + slideCount) % slideCount;
                const clone = this.originalSlides[slideIndex].cloneNode(true);
                clone.classList.add('nds-swiper-slide-clone');
                clone.setAttribute('aria-hidden', 'true');
                this.wrapper.appendChild(clone); // Append first, then we'll move them
            }

            // Move the prepended clones to the beginning
            for (let i = 0; i < cloneCount; i++) {
                const lastClone = this.wrapper.lastElementChild;
                this.wrapper.insertBefore(lastClone, this.wrapper.firstChild);
            }

            // Clone and append (first N slides, wrapping if needed)
            for (let i = 0; i < cloneCount; i++) {
                // Calculate which original slide to clone (wrap using modulo)
                const slideIndex = i % slideCount;
                const clone = this.originalSlides[slideIndex].cloneNode(true);
                clone.classList.add('nds-swiper-slide-clone');
                clone.setAttribute('aria-hidden', 'true');
                this.wrapper.appendChild(clone);
            }
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
            // Set CSS custom properties for responsive behavior
            const slidesPerView = this.getSlidesPerView();
            this.container.style.setProperty('--slides-per-view', slidesPerView);
            this.container.style.setProperty('--swiper-transition-speed', `${this.speed}ms`);
        }

        updateSlidePositions() {
            // Update peek padding first to determine active sides
            this.updatePeekPadding();

            // Set slide widths based on peek mode and active padding
            const slideWidth = this.calculateSlideWidth();
            const unit = this.peekPx > 0 ? 'px' : '%';

            this.slides.forEach(slide => {
                slide.style.flex = `0 0 ${slideWidth}${unit}`;
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

        updatePeekPadding() {
            // Only apply dynamic padding in non-loop mode with peek enabled
            if (this.peekPx > 0) {
                // Don't set up padding transitions here - let goToSlide() handle it
                // This method just updates the padding values

                if (this.loop) {
                    // Loop mode: always show peek on both sides
                    this.wrapper.style.paddingInline = `${this.peekPx}px`;
                } else {
                    // Non-loop mode: show peek only when there are slides to peek at
                    const maxIndex = this.getMaxIndex();

                    // Check if there are previous slides to peek at
                    const hasPrevSlides = this.currentIndex > 0;
                    // Check if there are next slides to peek at (beyond what's currently visible)
                    const hasNextSlides = this.currentIndex < maxIndex;

                    // Always set both padding values (use 0px instead of removing) for smooth transitions
                    const startPadding = hasPrevSlides ? `${this.peekPx}px` : '0px';
                    const endPadding = hasNextSlides ? `${this.peekPx}px` : '0px';
                    this.wrapper.style.paddingInline = `${startPadding} ${endPadding}`;
                }
            } else {
                // No peek: set padding to 0px instead of removing for smooth transitions
                this.wrapper.style.paddingInline = '0px';
            }
        }

        updateSlideWidths() {
            // Recalculate and update slide widths based on current peek state
            if (this.peekPx > 0 && !this.loop) {
                const slideWidth = this.calculateSlideWidth();

                this.slides.forEach(slide => {
                    slide.style.flex = `0 0 ${slideWidth}px`;
                });
            }
        }

        enableSlideFlexTransitions() {
            // Add flex-basis to slide transitions for smooth width changes during peek animations
            this.slides.forEach(slide => {
                slide.style.transitionProperty = 'opacity, flex-basis';
            });
        }

        setupResize() {
            this.handleResizeBound = () => {
                clearTimeout(this.resizeTimer);
                this.resizeTimer = setTimeout(() => {
                    // Check if breakpoint changed
                    const newBreakpoint = this.detectBreakpoint();

                    if (newBreakpoint !== this.currentBreakpoint && this.loop) {
                        // Only reinitialize if loop is enabled (requires clone management)
                        // Store current slide to restore position
                        const currentSlide = this.currentIndex;

                        // Reinitialize with new breakpoint
                        this.reinitialize(newBreakpoint, currentSlide);
                    } else {
                        // Just update positions for non-loop sliders or same breakpoint
                        this.setResponsiveProperties();
                        this.updateSlidePositions();
                    }
                }, RESIZE_DEBOUNCE);
            };
            window.addEventListener('resize', this.handleResizeBound);
        }

        reinitialize(newBreakpoint, preserveSlideIndex = 0) {
            // Stop autoplay
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
                this.autoplayTimer = null;
            }

            // Update breakpoint
            this.currentBreakpoint = newBreakpoint;

            // Calculate new clone count based on new breakpoint
            const newSlidesPerView = this.getSlidesPerViewForBreakpoint(newBreakpoint);
            const ratio = newSlidesPerView / this.originalSlides.length;

            if (ratio <= 0.5) {
                this.cloneCount = newSlidesPerView;
            } else {
                this.cloneCount = this.originalSlides.length + newSlidesPerView;
            }

            // Remove all existing clones
            const allSlides = Array.from(this.wrapper.querySelectorAll('.nds-swiper-slide'));
            allSlides.forEach(slide => {
                if (slide.classList.contains('nds-swiper-slide-clone')) {
                    slide.remove();
                }
            });

            // Rebuild clones with new count
            if (this.loop && this.originalSlides.length > 1) {
                this.setupLoopClones();
            }

            // Update slides reference
            this.slides = Array.from(this.container.querySelectorAll('.nds-swiper-slide'));

            // Rebuild pagination with new slide count
            this.setupPagination();

            // Update responsive properties
            this.setResponsiveProperties();

            // Restore position (ensure it's within bounds)
            const maxIndex = this.getMaxIndex();
            const safeIndex = Math.min(preserveSlideIndex, maxIndex);
            this.goToSlide(safeIndex, false);

            // Restart autoplay if it was enabled
            if (this.autoplay && !this.autoplayPaused) {
                this.startAutoplay();
            }
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

        getActivePeekSides(targetIndex = this.currentIndex) {
            if (this.loop) {
                return 2; // Both sides in loop mode
            }

            const maxIndex = this.getMaxIndex();
            let count = 0;
            if (targetIndex > 0) count++; // Has prev slides
            if (targetIndex < maxIndex) count++; // Has next slides
            return count;
        }

        calculateSlideWidth(targetIndex = this.currentIndex) {
            const slidesPerView = this.getSlidesPerView();

            if (this.peekPx > 0) {
                // Pixel-based width calculation for peek mode
                const containerWidth = this.container.offsetWidth;
                const activePeekSides = this.getActivePeekSides(targetIndex);
                const totalPadding = this.peekPx * activePeekSides;
                const availableWidth = containerWidth - totalPadding;
                return availableWidth / slidesPerView;
            } else {
                // Percentage-based width for non-peek mode
                return 100 / slidesPerView;
            }
        }

        calculateTranslate(index, slideWidth) {
            const isRTL = this.isRTL();
            // RTL uses positive values, LTR uses negative values
            return isRTL ? (index * slideWidth) : -(index * slideWidth);
        }

        pauseAutoplay() {
            this.autoplayPaused = true;
            if (this.autoplay && this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
                this.autoplayTimer = null;
            }
        }

        resumeAutoplay() {
            this.autoplayPaused = false;
            if (this.autoplay) {
                this.startAutoplay();
            }
        }

        setupTransition() {
            // Enable flex-basis transitions on slides when peek is enabled
            if (this.peekPx > 0) {
                this.enableSlideFlexTransitions();
                this.wrapper.style.transition = `transform ${this.speed}ms var(--swiper-transition-timing), padding-inline ${this.speed}ms var(--swiper-transition-timing)`;
            } else {
                this.wrapper.style.transition = `transform ${this.speed}ms var(--swiper-transition-timing)`;
            }
        }

        goToSlide(index, animate = true) {
            // Prevent rapid clicks in loop mode to avoid DOM wrapping issues
            if (this.loop && this.isTransitioning) {
                return;
            }

            // Allow interrupting current transition for non-loop mode
            if (this.isTransitioning) {
                // Clear any pending snap-back timeout
                if (this.transitionTimeout) {
                    clearTimeout(this.transitionTimeout);
                    this.transitionTimeout = null;
                }

                // Reset transition flag to allow new animation
                this.isTransitioning = false;
            }

            // Calculate slide width for navigation
            // Check the target index, not current
            const targetIndex = index >= this.realSlideCount ? index % this.realSlideCount :
                               index < 0 ? ((index % this.realSlideCount) + this.realSlideCount) % this.realSlideCount :
                               index;

            const slideWidth = this.calculateSlideWidth(targetIndex);
            const usePx = this.peekPx > 0;

            if (this.loop) {
                // With clones: slides array is [lastClones..., slide0, slide1, ..., slideN, firstClones...]
                // Real slides are at indices cloneCount to (cloneCount + realSlideCount - 1)
                // currentIndex represents the logical slide (0 to realSlideCount-1)

                // Normalize the logical index for UI updates (wrap around if needed)
                // Use modulo to properly wrap when advancing by multiple slides
                let normalizedIndex = index;
                let needsCloneTransition = false;

                if (index >= this.realSlideCount) {
                    normalizedIndex = index % this.realSlideCount; // Wrapping forward
                    needsCloneTransition = true;
                } else if (index < 0) {
                    normalizedIndex = ((index % this.realSlideCount) + this.realSlideCount) % this.realSlideCount; // Wrapping backward
                    needsCloneTransition = true;
                }

                // Use offset-based navigation for smooth continuation
                const requestedOffset = index - this.currentIndex;
                let actualIndex = this.currentDOMIndex + requestedOffset;

                // Update currentIndex to the final logical position immediately
                // This ensures UI updates reflect the final state at animation start
                this.currentIndex = normalizedIndex;

                // Store where we're animating to for next interrupt
                this.currentDOMIndex = actualIndex;

                // Apply transform to show the slide (may be a clone)
                const translateValue = this.calculateTranslate(actualIndex, slideWidth);
                const translateUnit = usePx ? 'px' : '%';

                if (animate) {
                    this.isTransitioning = true;
                    this.setupTransition();

                    // Track if we're animating to a clone position
                    if (needsCloneTransition) {
                        this.pendingSnapIndex = normalizedIndex;
                    } else {
                        this.pendingSnapIndex = undefined;
                    }

                    // After animation completes, check if we need to snap back
                    this.transitionTimeout = setTimeout(() => {
                        this.isTransitioning = false;
                        this.transitionTimeout = null;

                        // If we animated to a clone, snap to the real slide at the same logical position
                        if (this.pendingSnapIndex !== undefined) {
                            // Snap to the normalized index position (currentIndex was already set)
                            const snapDOMIndex = this.currentIndex + this.cloneCount;
                            this.wrapper.style.transition = 'none';
                            const finalTranslate = this.calculateTranslate(snapDOMIndex, slideWidth);
                            this.wrapper.style.transform = `translateX(${finalTranslate}${translateUnit})`;
                            this.currentDOMIndex = snapDOMIndex; // Update DOM position after snap
                            void this.wrapper.offsetHeight; // Force reflow
                            this.pendingSnapIndex = undefined;
                        }
                    }, this.speed);
                } else {
                    this.wrapper.style.transition = 'none';
                }

                this.wrapper.style.transform = `translateX(${translateValue}${translateUnit})`;

            } else {
                // Non-loop mode: clamp to valid range
                const maxIndex = this.getMaxIndex();
                this.currentIndex = Math.max(0, Math.min(index, maxIndex));

                const translateValue = this.calculateTranslate(this.currentIndex, slideWidth);
                const translateUnit = usePx ? 'px' : '%';

                if (animate) {
                    this.isTransitioning = true;
                    this.setupTransition();

                    // Update peek padding and slide widths AFTER setting transition so they animate
                    if (this.peekPx > 0) {
                        this.updatePeekPadding();
                        // Also update slide widths immediately so they animate with padding
                        this.updateSlideWidths();
                    }

                    this.transitionTimeout = setTimeout(() => {
                        this.isTransitioning = false;
                        this.transitionTimeout = null;
                    }, this.speed);
                } else {
                    this.wrapper.style.transition = 'none';
                    // Update padding immediately for non-animated changes
                    if (this.peekPx > 0) {
                        this.updatePeekPadding();
                    }
                }

                this.wrapper.style.transform = `translateX(${translateValue}${translateUnit})`;
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
            const slidesPerView = this.getSlidesPerView();
            this.goToSlide(this.currentIndex + slidesPerView);

            // Reset autoplay timer only if not paused
            if (this.autoplay && !this.autoplayPaused) {
                this.resetAutoplay();
            }
        }

        prev() {
            const slidesPerView = this.getSlidesPerView();
            this.goToSlide(this.currentIndex - slidesPerView);

            // Reset autoplay timer only if not paused
            if (this.autoplay && !this.autoplayPaused) {
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
        // PUBLIC API
        // ==============================================

        slideTo(targetIndex, animate = true) {
            // Public API: Navigate to any slide index from current position
            // Usage: swiperInstance.slideTo(3) - goes to slide at index 3
            // Usage: swiperInstance.slideTo(0, false) - goes to first slide without animation
            // Automatically normalizes the target index to valid range (0 to maxIndex)
            const maxIndex = this.getMaxIndex();
            const normalizedIndex = Math.max(0, Math.min(targetIndex, maxIndex));

            this.goToSlide(normalizedIndex, animate);
        }

        // ==============================================
        // PAGINATION
        // ==============================================

        getTotalPages() {
            const slidesPerView = this.getSlidesPerView();
            const slideCount = this.loop ? this.realSlideCount : this.slides.length;
            return Math.ceil(slideCount / slidesPerView);
        }

        getCurrentPage() {
            // Calculate which page we're on using the distance-based approach
            const slidesPerView = this.getSlidesPerView();
            const maxIndex = this.getMaxIndex();
            const totalPages = this.getTotalPages();

            let currentPage = 0;
            let minDistance = Infinity;

            for (let i = 0; i < totalPages; i++) {
                const bulletTargetIndex = Math.min(i * slidesPerView, maxIndex);
                const distance = Math.abs(this.currentIndex - bulletTargetIndex);

                if (distance <= minDistance) {
                    minDistance = distance;
                    currentPage = i;
                }
            }

            return currentPage;
        }

        setupPagination() {
            if (!this.pagination) return;

            const totalPages = this.getTotalPages();

            // Clear existing bullets
            this.pagination.innerHTML = '';

            // Create bullets
            for (let i = 0; i < totalPages; i++) {
                const bullet = document.createElement('button');
                bullet.className = 'nds-swiper-pagination-bullet';
                bullet.setAttribute('type', 'button');
                bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);

                bullet.addEventListener('click', () => {
                    // Calculate target slide index for this page
                    const slidesPerView = this.getSlidesPerView();
                    const targetIndex = i * slidesPerView;

                    this.slideTo(targetIndex);
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

            const currentPage = this.getCurrentPage();
            const bullets = this.pagination.querySelectorAll('.nds-swiper-pagination-bullet');

            bullets.forEach((bullet, i) => {
                if (i === currentPage) {
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
            document.addEventListener('mousemove', this.handleDragMoveBound);
            document.addEventListener('mouseup', this.handleDragEndBound);

            // Touch events
            this.container.addEventListener('touchstart', (e) => this.handleDragStart(e), { passive: false });
            document.addEventListener('touchmove', this.handleDragMoveBound, { passive: false });
            document.addEventListener('touchend', this.handleDragEndBound);

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
            this.pauseAutoplay();
        }

        handleDragMove(e) {
            if (!this.dragState.active) return;

            const point = e.touches ? e.touches[0] : e;
            const diff = point.pageX - this.dragState.startX;

            // Mark as dragged if moved more than threshold
            if (Math.abs(diff) > DRAG_START_THRESHOLD) {
                this.dragState.hasDragged = true;
                e.preventDefault(); // Prevent text selection
            }

            this.dragState.currentX = point.pageX;

            // Visual feedback during drag
            if (this.dragState.hasDragged) {
                // Calculate slide width and drag offset based on peek mode
                const slideWidth = this.calculateSlideWidth();
                const usePx = this.peekPx > 0;
                const dragOffset = usePx ? diff : (diff / this.container.offsetWidth) * 100;

                // In loop mode, account for the prepended clones (actualIndex = currentIndex + cloneCount)
                const baseIndex = this.loop ? (this.currentIndex + this.cloneCount) : this.currentIndex;

                // RTL uses positive base, LTR uses negative base
                const currentTranslate = this.calculateTranslate(baseIndex, slideWidth);

                const newTranslate = currentTranslate + dragOffset;
                const unit = usePx ? 'px' : '%';

                this.wrapper.style.transform = `translateX(${newTranslate}${unit})`;
            }
        }

        handleDragEnd() {
            if (!this.dragState.active) return;

            this.container.style.cursor = '';
            this.wrapper.style.transition = '';

            if (this.dragState.hasDragged) {
                const diff = this.dragState.currentX - this.dragState.startX;

                if (Math.abs(diff) > DRAG_THRESHOLD) {
                    // Check RTL dynamically
                    const isRTL = this.isRTL();
                    const slidesPerView = this.getSlidesPerView();

                    // Drag moves by slidesPerView amount
                    // Positive diff = dragged right, negative = dragged left
                    // LTR: drag right = prev, drag left = next
                    // RTL: drag right = next, drag left = prev (reversed because coordinate system is flipped)
                    let targetIndex;
                    if (isRTL) {
                        if (diff > 0) {
                            targetIndex = this.currentIndex + slidesPerView;
                        } else {
                            targetIndex = this.currentIndex - slidesPerView;
                        }
                    } else {
                        if (diff > 0) {
                            targetIndex = this.currentIndex - slidesPerView;
                        } else {
                            targetIndex = this.currentIndex + slidesPerView;
                        }
                    }

                    this.goToSlide(targetIndex);

                    // Reset autoplay timer
                    if (this.autoplay && !this.autoplayPaused) {
                        this.resetAutoplay();
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

            this.dragState.active = false;

            // Resume autoplay after drag ends
            this.resumeAutoplay();
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
                this.pauseAutoplay();
            });

            this.container.addEventListener('mouseleave', () => {
                if (!this.dragState.active) {
                    this.resumeAutoplay();
                }
            });

            // Pause on focus (accessibility)
            this.container.addEventListener('focusin', () => {
                this.pauseAutoplay();
            });

            this.container.addEventListener('focusout', () => {
                if (!this.dragState.active) {
                    this.resumeAutoplay();
                }
            });
        }

        startAutoplay() {
            if (!this.autoplay) return;

            // Clear any existing timer first to prevent multiple intervals
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
            }

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
                    rootMargin: LAZY_LOAD_MARGIN // Load before slide becomes visible
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
            const slideCount = this.loop ? this.realSlideCount : this.slides.length;
            const totalSlides = Math.ceil(slideCount / slidesPerView);
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

            // Clear resize timer
            if (this.resizeTimer) {
                clearTimeout(this.resizeTimer);
            }

            // Disconnect intersection observer
            if (this.imageObserver) {
                this.imageObserver.disconnect();
            }

            // Remove event listeners
            document.removeEventListener('mousemove', this.handleDragMoveBound);
            document.removeEventListener('mouseup', this.handleDragEndBound);
            document.removeEventListener('touchmove', this.handleDragMoveBound);
            document.removeEventListener('touchend', this.handleDragEndBound);

            if (this.handleResizeBound) {
                window.removeEventListener('resize', this.handleResizeBound);
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
        const checkDir = () => {
            const dir = document.documentElement.dir;
            if (dir === 'rtl' || dir === 'ltr') {
                // Dir is set, safe to initialize
                initializeComponents();
                setupDirObserver();
            } else {
                // Dir not set yet, check again
                requestAnimationFrame(checkDir);
            }
        };

        requestAnimationFrame(checkDir);
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
