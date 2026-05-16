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

    function fixSrcsetSpaces(srcsetValue) {
        if (!srcsetValue) return srcsetValue;

        return srcsetValue.split(',').map(candidate => {
            const trimmed = candidate.trim();
            const lastSpaceIndex = trimmed.lastIndexOf(' ');

            if (lastSpaceIndex === -1) {
                return trimmed.replace(/ /g, '%20');
            }

            const url = trimmed.substring(0, lastSpaceIndex);
            const descriptor = trimmed.substring(lastSpaceIndex + 1);
            return url.replace(/ /g, '%20') + ' ' + descriptor;
        }).join(', ');
    }

    // ==============================================
    // SHARED DOCUMENT KEYDOWN + BREAKPOINT
    // ==============================================
    // One document listener and one breakpoint subscription serve every initialized
    // swiper. Without these, N swipers attach N keydown listeners and N resize
    // callbacks — wasted work on every keystroke and every resize tick.
    const _activeSwipers = new Set();
    let _sharedKeydownAttached = false;

    function ensureSharedKeydown() {
        if (_sharedKeydownAttached) return;
        _sharedKeydownAttached = true;
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' &&
                e.key !== 'Home' && e.key !== 'End') return;
            for (const inst of _activeSwipers) {
                const isFocused = inst.container.contains(document.activeElement);
                if (!isFocused && !inst._isHovered) continue;
                inst._handleKeydown(e);
                return;
            }
        });
    }

    // slidesPerView only changes when the viewport crosses one of
    // NDS.breakpoints.{tablet,desktop} — MediaQueryList `change` fires only on
    // those transitions, skipping the resize bus's every-tick fan-out entirely.
    const _mqDesktop = window.matchMedia(NDS.breakpoints.desktop);
    const _mqTablet = window.matchMedia(NDS.breakpoints.tablet);
    let _resizeAttached = false;

    function ensureSharedResize() {
        if (_resizeAttached) return;
        _resizeAttached = true;
        const trigger = () => _activeSwipers.forEach(inst => inst._handleResize());
        _mqDesktop.addEventListener('change', trigger);
        _mqTablet.addEventListener('change', trigger);
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
            this.prevBtn = container.querySelector('.nds-prev');
            this.nextBtn = container.querySelector('.nds-next');

            this.isHero = container.classList.contains('nds-hero');
            this._cachedGap = null;
            this.currentIndex = 0;

            if (!this.wrapper || this.slides.length === 0) {
                console.warn('NDS Swiper: No wrapper or slides found');
                return;
            }

            // Static attributes — read once, reused on every breakpoint change.
            this._slidesMax = parseInt(container.getAttribute('slides-max')) || 1;
            this._slidesMid = parseInt(container.getAttribute('slides-mid')) || 1;
            this._slidesMin = parseInt(container.getAttribute('slides-min')) || 1;
            this._peek = parseInt(container.getAttribute('peek')) || 0;

            this.init();
        }

        // ==============================================
        // BREAKPOINT CALCULATION
        // ==============================================

        calculateSlidesPerView() {
            if (_mqDesktop.matches) return this._slidesMax;
            if (_mqTablet.matches) return this._slidesMid;
            return this._slidesMin;
        }

        getGap() {
            if (this._cachedGap === null) {
                this._cachedGap = parseInt(getComputedStyle(this.container).getPropertyValue('--gap')) || 0;
            }
            return this._cachedGap;
        }

        init() {
            this._ac = new AbortController();
            this.container.style.setProperty('--total', this.slides.length);
            this.updateSlidesPerView();

            // Single-slide swipers can never navigate; bail before nav/observer/keyboard
            // setup. updateSlidesPerView already ran so --slides/--peek are correct.
            if (this.slides.length === 1) {
                this.container.setAttribute('data-swiper-initialized', 'true');
                NDS.reveal(this.container);
                return;
            }

            this.setupNavigation();
            this.setupScrollSync();
            this.setupKeyboard();
            this.setupResize();

            // Gate observers — only register when they have work to do.
            const lazySlides = this.slides.filter(s =>
                s.querySelector('img[data-src], img[data-srcset]')
            );
            if (lazySlides.length) this.setupLazyLoading(lazySlides);
            // setupContentObserver only catches scrollWidth shifts from late-loading
            // content; for static-content swipers (no lazy images) it's pure noise.
            // Hero updatePeekStyles is a no-op anyway, so hero never needs it.
            if (!this.isHero && lazySlides.length) this.setupContentObserver();
            // setupVisibilityObserver only does meaningful work for heroes that have
            // [hidden] slides to reveal on visibility (the WebKit RTL fix). Non-hero
            // peek/state was set synchronously above — no late update needed.
            if (this.isHero && this.slides.some(s => s.hasAttribute('hidden'))) {
                this.setupVisibilityObserver();
            }

            // Initial state. setupPagination (called inside updateSlidesPerView) already
            // set the active bullet; only buttons + boundary classes remain.
            this.updateButtons();
            this.updateBoundaryClasses();
            this.lastIndex = this.currentIndex;

            this.updatePeekStyles();

            this.container.setAttribute('data-swiper-initialized', 'true');

            if (this.slides.length > this.slidesPerView) {
                if (this.pagination) this.pagination.removeAttribute('hidden');
                if (this.prevBtn) this.prevBtn.removeAttribute('hidden');
                if (this.nextBtn) this.nextBtn.removeAttribute('hidden');
            }

            NDS.reveal(this.container);
        }

        setupContentObserver() {
            // Establish the baseline on the first observer callback rather than
            // synchronously here — a scrollWidth read during init forces layout
            // after the CSS-variable writes earlier in the chain.
            let lastScrollWidth = -1;

            const checkScrollWidth = NDS.debounce(() => {
                const currentScrollWidth = this.wrapper.scrollWidth;
                if (lastScrollWidth === -1) {
                    lastScrollWidth = currentScrollWidth;
                    return;
                }
                if (currentScrollWidth !== lastScrollWidth) {
                    lastScrollWidth = currentScrollWidth;
                    this.updatePeekStyles();
                }
            }, 100);

            const off = NDS.onElementResize(this.wrapper, checkScrollWidth);
            setTimeout(off, 500);
        }

        setupVisibilityObserver() {
            // One-shot: fires once when the hero becomes visible, reveals [hidden]
            // slides, then unsubscribes. Only registered when the hero actually has
            // [hidden] slides (gated at init).
            this._offVisibility = NDS.onIntersect(this.container, (entry) => {
                if (!entry.isIntersecting) return;
                this._offVisibility();
                this._offVisibility = null;

                // rAF so the forced reflow below lands on the next paint frame,
                // not on the IO callback's task.
                requestAnimationFrame(() => {
                    if (NDS.isRTL) {
                        // WebKit RTL: keep scroll-behavior: auto through the entire
                        // update so Safari/WebKit doesn't jump scroll on reflow.
                        this.wrapper.style.scrollBehavior = 'auto';
                        this.slides.forEach(s => { if (s.hasAttribute('hidden')) s.removeAttribute('hidden'); });
                        this.wrapper.scrollLeft = 0;
                        void this.wrapper.offsetHeight;
                        this.wrapper.scrollLeft = 0;
                        void this.wrapper.offsetHeight;
                        this.wrapper.style.scrollBehavior = '';
                    } else {
                        this.slides.forEach(s => { if (s.hasAttribute('hidden')) s.removeAttribute('hidden'); });
                    }
                });
            }, { threshold: 0.01 });
        }

        // ==============================================
        // RESPONSIVE SLIDES PER VIEW
        // ==============================================

        updateSlidesPerView() {
            const newSlidesPerView = this.calculateSlidesPerView();

            if (newSlidesPerView !== this.slidesPerView) {
                this.slidesPerView = newSlidesPerView;
                this.container.style.setProperty('--slides', this.slidesPerView);
            }

            const pageCount = Math.ceil(this.slides.length / this.slidesPerView);

            // Peek width = raw --peek + one gap; the addition is done in CSS
            // (calc on [data-swiper-peek]) so init never reads getComputedStyle.
            const peekActive = this._peek > 0 && pageCount > 1;
            this.container.toggleAttribute('data-swiper-peek', peekActive);
            this.container.style.setProperty('--peek', `${this._peek}px`);

            if (this.pagination) this.setupPagination();
        }

        updatePeekStyles() {
            if (this.isHero) return;

            const hasPeek = this._peek > 0;
            const hasOneSlidePage = this.slidesPerView === 1;

            if (!hasPeek && !hasOneSlidePage) {
                this.container.style.removeProperty('--gap');
                return;
            }

            if (!hasPeek && hasOneSlidePage) {
                this.container.style.setProperty('--gap', 'var(--nds-viewport-padding)');
            }
        }

        setupResize() {
            // Subscription is shared via ensureSharedResize; instance is invoked
            // through _activeSwipers membership (added by setupKeyboard).
            ensureSharedResize();
        }

        _handleResize() {
            this._cachedGap = null;
            this._measuredStep = null;
            const oldSlidesPerView = this.slidesPerView;
            this.updateSlidesPerView();

            if (oldSlidesPerView !== this.slidesPerView) {
                this.updateButtons();
                this.updateBoundaryClasses();
            }

            this.updatePeekStyles();
        }

        // ==============================================
        // ACTIVATION HELPER (nav buttons + bullets)
        // ==============================================
        // pointerdown unifies mouse + touch + pen; preventDefault prevents focus-
        // on-click (preserves keyboard nav) and suppresses synthetic mouse events on
        // touch. Touch-scroll on the button itself is blocked by `touch-action:
        // manipulation` in _swiper.scss.
        _attachActivation(btn, action) {
            const { signal } = this._ac;
            btn.addEventListener('pointerdown', (e) => {
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                e.preventDefault();
                action();
            }, { signal });
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    action();
                }
            }, { signal });
        }

        // ==============================================
        // NAVIGATION
        // ==============================================

        setupNavigation() {
            if (this.prevBtn) this._attachActivation(this.prevBtn, () => this.prev());
            if (this.nextBtn) this._attachActivation(this.nextBtn, () => this.next());
        }

        prev() {
            this.goTo(Math.floor((this.currentIndex - 1) / this.slidesPerView) * this.slidesPerView);
        }

        next() {
            this.goTo(this.currentIndex + this.slidesPerView);
        }

        goTo(index) {
            const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
            const clampedIndex = Math.max(0, Math.min(index, maxIndex));

            const targetSlide = this.slides[clampedIndex];
            if (!targetSlide) return;

            // offsetLeft difference from first slide — static DOM property,
            // unaffected by scroll animation, accounts for wrapper padding.
            const offset = Math.abs(targetSlide.offsetLeft - this.slides[0].offsetLeft);

            this.wrapper.scrollTo({
                left: NDS.isRTL ? -offset : offset,
                behavior: 'smooth'
            });
        }

        // ==============================================
        // SCROLL SYNC
        // ==============================================

        setupScrollSync() {
            this.wrapper.addEventListener('scroll', NDS.rafThrottle(() => {
                this.detectCurrentSlide();
                this.updateState();
            }), { passive: true, signal: this._ac.signal });
        }

        detectCurrentSlide() {
            if (this.slides.length === 0) return;

            // Measure actual step from DOM once (accounts for fractional widths + gap).
            if (this.slides.length > 1 && !this._measuredStep) {
                this._measuredStep = Math.abs(this.slides[1].offsetLeft - this.slides[0].offsetLeft);
            }

            const step = this._measuredStep || (this.slides[0].offsetWidth + this.getGap()) || 1;
            const scrollPos = NDS.isRTL ? -this.wrapper.scrollLeft : this.wrapper.scrollLeft;

            this.currentIndex = Math.max(0, Math.min(
                Math.round(scrollPos / step),
                this.slides.length - this.slidesPerView
            ));
        }

        // ==============================================
        // PAGINATION
        // ==============================================

        setupPagination() {
            if (!this.pagination) return;

            const pageCount = Math.ceil(this.slides.length / this.slidesPerView);

            if (pageCount <= 1) {
                this.pagination.style.display = 'none';
                this.pagination.innerHTML = '';
                if (this.navigation) this.navigation.style.display = 'none';
                if (this.prevBtn) this.prevBtn.style.display = 'none';
                if (this.nextBtn) this.nextBtn.style.display = 'none';
                this.wrapper.style.overflow = 'unset';
                return;
            }

            this.pagination.style.display = '';
            this.pagination.innerHTML = '';
            if (this.navigation) this.navigation.style.display = '';
            if (this.prevBtn) this.prevBtn.style.display = '';
            if (this.nextBtn) this.nextBtn.style.display = '';
            this.wrapper.style.overflow = '';

            for (let i = 0; i < pageCount; i++) {
                const bullet = document.createElement('button');
                bullet.className = 'nds-bullet';
                bullet.type = 'button';
                bullet.setAttribute('aria-label', `Go to slide ${i + 1}`);
                this._attachActivation(bullet, () => this.goTo(i * this.slidesPerView));
                this.pagination.appendChild(bullet);
            }

            this.updatePagination();
        }

        updatePagination() {
            if (!this.pagination) return;

            const bullets = this.pagination.querySelectorAll('.nds-bullet');
            const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);

            // Map currentIndex to page based on proximity to page start indices.
            // For 6 slides, 4 per view: page 0 starts at index 0, page 1 starts at index 2.
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
                if (isActive) NDS.Status.set(bullet, 'active');
                else NDS.Status.clear(bullet);
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

            const { signal } = this._ac;
            this._isHovered = false;
            this.container.addEventListener('mouseenter', () => this._isHovered = true, { signal });
            this.container.addEventListener('mouseleave', () => this._isHovered = false, { signal });

            _activeSwipers.add(this);
            ensureSharedKeydown();
        }

        _handleKeydown(e) {
            const rtl = NDS.isRTL;
            switch (e.key) {
                case 'ArrowLeft': {
                    e.preventDefault();
                    const leftBtn = rtl ? this.nextBtn : this.prevBtn;
                    if (leftBtn && !leftBtn.disabled) leftBtn.click();
                    break;
                }
                case 'ArrowRight': {
                    e.preventDefault();
                    const rightBtn = rtl ? this.prevBtn : this.nextBtn;
                    if (rightBtn && !rightBtn.disabled) rightBtn.click();
                    break;
                }
                case 'Home':
                    e.preventDefault();
                    this.goTo(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goTo(this.slides.length - this.slidesPerView);
                    break;
            }
        }

        // ==============================================
        // LAZY LOADING
        // ==============================================

        setupLazyLoading(lazySlides) {
            const offs = [];
            lazySlides.forEach(slide => {
                const off = NDS.onIntersect(slide, (entry) => {
                    if (entry.isIntersecting) {
                        // Activate <source> elements inside <picture> first.
                        entry.target.querySelectorAll('source[data-srcset]').forEach(source => {
                            source.srcset = fixSrcsetSpaces(source.dataset.srcset);
                            delete source.dataset.srcset;
                        });
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
            if (this.lastIndex === this.currentIndex) return;
            this.lastIndex = this.currentIndex;

            this.updatePagination();
            this.updateButtons();
            this.updateBoundaryClasses();
        }

        updateButtons() {
            const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
            if (this.prevBtn) this.prevBtn.disabled = this.currentIndex <= 0;
            if (this.nextBtn) this.nextBtn.disabled = this.currentIndex >= maxIndex;
        }

        updateBoundaryClasses() {
            const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
            const tokens = [];
            if (this.currentIndex <= 0) tokens.push('at-start');
            if (this.currentIndex >= maxIndex) tokens.push('at-end');
            NDS.State.set(this.container, ...tokens);
        }

        // ==============================================
        // PUBLIC API
        // ==============================================

        slideTo(index, animate = true) {
            const maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
            index = Math.max(0, Math.min(index, maxIndex));

            const targetSlide = this.slides[index];
            if (!targetSlide) return;

            const wrapperRect = this.wrapper.getBoundingClientRect();
            const slideRect = targetSlide.getBoundingClientRect();

            const scrollDelta = NDS.isRTL
                ? slideRect.right - wrapperRect.right
                : slideRect.left - wrapperRect.left;

            this.wrapper.scrollBy({
                left: scrollDelta,
                behavior: animate ? 'smooth' : 'instant'
            });
        }

        // ==============================================
        // CLEANUP
        // ==============================================

        // Instance becomes unusable after destroy(): _ac is nulled so any subsequent call
        // to a setup method that reads `this._ac.signal` will throw. Re-initialize via
        // `NDS.Swiper.create(el)` (constructs a fresh instance).
        destroy() {
            this.container.removeAttribute('data-swiper-initialized');
            this.container.removeAttribute('tabindex');
            if (this.pagination) this.pagination.innerHTML = '';
            _activeSwipers.delete(this);
            if (this._offVisibility) { this._offVisibility(); this._offVisibility = null; }
            if (this._offLazyLoad) { this._offLazyLoad.forEach(off => off()); this._offLazyLoad = null; }
            if (this._ac) { this._ac.abort(); this._ac = null; }
        }
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    function initializeComponents() {
        document.querySelectorAll('img[srcset]').forEach(img => {
            const srcset = img.getAttribute('srcset');
            if (srcset && srcset.includes(' ') && !srcset.includes('%20')) {
                const fixed = fixSrcsetSpaces(srcset);
                if (fixed !== srcset) img.setAttribute('srcset', fixed);
            }
        });

        const swipers = document.querySelectorAll('.nds-swiper');
        swipers.forEach(swiper => {
            if (swiper.closest('code, .code-example')) return;
            if (swiper.hasAttribute('data-swiper-initialized')) return;
            swiper._ndsSwiper = new NDSSwiper(swiper);
        });
    }

    NDS.Swiper = {
        init: initializeComponents,
        reinit: initializeComponents,
        create: (element) => {
            const instance = new NDSSwiper(element);
            element._ndsSwiper = instance;
            return instance;
        }
    };

})();
