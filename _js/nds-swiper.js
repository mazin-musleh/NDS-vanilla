/* NDS.Swiper — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Swiper.init() / .reinit()   scan + initialize .nds-swiper
 *   NDS.Swiper.create(el)           instance one swiper
 *   NDS.Swiper.destroy(el)          tear one down — the NDS.init.destroy entry point
 *   instance.next() / .prev()       move by one page
 *   instance.goTo(index, animate = true)  move to a slide index, clamped to the
 *                                   last page (a loop has none); false = instant
 *   instance.updateState()          sync buttons, bullets and classes to the current slide
 *   instance.wrapper / .currentIndex / .lastIndex / .slidesPerView   read-only state
 *   instance.destroy()
 * Events:
 *   nds:swiper:change (bubbles)     detail.index = the real slide now at rest, after every move
 * Hooks (knobs set on the swiper container, inline or in a class; never inherited):
 *   .nds-spotlight                               the open slide rests in the middle at full size,
 *                                                the ones beside it shrink toward it. Loops,
 *                                                one slide at a time; a wide row shows three
 *                                                whole slides, a narrow one trims the sides.
 *                                                Wider content grows its slide and still
 *                                                centres. Per-view knobs and --peek are not read
 *   --max-slides · --mid-slides · --min-slides   slides per view at desktop / tablet /
 *                                                mobile, default 1 each; CSS sizes the row
 *                                                from them before any JS runs
 *   --peek                                       length of the next slide left showing
 *   --gap                                        gap between slides
 *   data-swiper-loop                             endless row: clones at both ends, a silent
 *                                                jump when the scroll rests on one. Needs
 *                                                more slides than the largest tier's count,
 *                                                else ignored. goTo() indices stay real
 *   on a slide's <img>: data-src · data-srcset   lazy sources, written to src/srcset when
 *                                                the slide nears the viewport; once the
 *                                                images on screen finish, the page either
 *                                                side loads ahead at low priority
 *   written by the component: --slides on the container, data-swiper-peek while peeking,
 *                             .nds-swiper-clone slides (aria-hidden, focusables dropped from
 *                             the tab order, data-swiper-clone = the real twin's index) when
 *                             looping; data-status on each spotlight slide: "active" on the
 *                             open one and every loop clone of it, "after" on those after it;
 *                             data-swiper-moving on the wrapper while it scrolls, inside
 *                             .nds-max-width (lifts the shadow clip)
 *   written by the loader pre-reveal: the same --slides and peek state, plus
 *                                     data-swiper-preset (skeleton row = final row) and
 *                                     data-swiper-single when the slides fit one page
 *                                     (drops the nav reserve, which init would keep hidden)
 * Gotchas:
 *   - Positioning is CSS scroll-snap. JS only syncs the navigation, the pagination dots
 *     and lazy loading — a swiper still scrolls with JS disabled. A move animates per
 *     the wrapper's scroll-behavior (smooth by default; set auto for an instant switch).
 *   - The markup is .nds-swiper-wrapper holding .nds-swiper-slide items, plus optional
 *     .nds-swiper-navigation (with .nds-prev / .nds-next) and .nds-swiper-pagination.
 *   - The instance lives on the element as el.ndsSwiper.
 *   - A looping swiper sets its track's scrollLeft at init, which fires one scroll event
 *     on the wrapper. A "first interaction" gate that listens for scroll in capture
 *     mode counts it — listen without capture, or ignore element scrolls.
 */
(function () {
    'use strict';

    // English defaults; the assets/i18n/{lang}.json pack overrides them.
    const strings = NDS.i18n.strings('swiper', {
        go_to_page: 'Go to page {n}',
    });

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
    const activeSwipers = new Set();
    let sharedKeydownAttached = false;

    function ensureSharedKeydown() {
        if (sharedKeydownAttached) return;
        sharedKeydownAttached = true;
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' &&
                e.key !== 'Home' && e.key !== 'End') return;
            // A field in a slide owns its caret keys.
            if (e.defaultPrevented || e.target.matches?.('input, textarea, select') || e.target.isContentEditable) return;
            const instance = findOwner(document.activeElement);
            if (instance) instance._handleKeydown(e);
        });
    }

    // The INNERMOST swiper wins. A container contains a nested swiper's focused
    // slide, and :hover matches every ancestor too, so taking the first Set hit
    // (= document order) would always hand the event to the outer deck. Same
    // ownership question the constructor answers.
    function findOwner(active) {
        for (let el = active && active.closest('.nds-swiper'); el;
             el = el.parentElement && el.parentElement.closest('.nds-swiper')) {
            if (activeSwipers.has(el.ndsSwiper)) return el.ndsSwiper;
        }
        // Nothing focused inside a swiper — fall back to the innermost hovered one,
        // but only when nothing else holds focus: a field elsewhere owns its arrows.
        if (active && active !== document.body && active !== document.documentElement) return null;
        let best = null;
        for (const swiper of activeSwipers) {
            if (swiper._container.matches(':hover') && (!best || best._container.contains(swiper._container))) best = swiper;
        }
        return best;
    }

    // slidesPerView only changes when the viewport crosses one of
    // NDS.breakpoints.{tablet,desktop} — MediaQueryList `change` fires only on
    // those transitions, skipping the resize bus's every-tick fan-out entirely.
    // Separate set from activeSwipers: single-slide swipers skip keyboard/nav
    // setup but still need --slides re-derived on breakpoint crossings.
    const resizeSwipers = new Set();
    const mqDesktop = window.matchMedia(NDS.breakpoints.desktop);
    const mqTablet = window.matchMedia(NDS.breakpoints.tablet);
    let resizeAttached = false;

    function ensureSharedResize() {
        if (resizeAttached) return;
        resizeAttached = true;
        const trigger = () => resizeSwipers.forEach(instance => instance._handleResize());
        mqDesktop.addEventListener('change', trigger);
        mqTablet.addEventListener('change', trigger);
    }

    // ==============================================
    // MAIN CLASS
    // ==============================================

    class NdsSwiper {
        constructor(container) {
            this._container = container;
            this.wrapper = container.querySelector('.nds-swiper-wrapper');
            // A slide holds arbitrary consumer content, so a swiper may nest inside
            // one — and its parts sit EARLIER in document order than ours, because
            // nav and pagination follow the wrapper. An unguarded querySelector then
            // hands us the nested swiper's controls. Slides are direct wrapper
            // children by contract (flex row; _setupLoop inserts clones as siblings),
            // so :scope > is exact there; the rest are ownership-checked.
            const findOwnPart = (selector) => NDS.ownParts(container, selector, '.nds-swiper')[0] || null;
            this._slides = this.wrapper
                ? Array.from(this.wrapper.querySelectorAll(':scope > .nds-swiper-slide'))
                : [];
            this._pagination = findOwnPart('.nds-swiper-pagination');
            this._navigation = findOwnPart('.nds-swiper-navigation');
            this._prevButton = findOwnPart('.nds-prev');
            this._nextButton = findOwnPart('.nds-next');

            this._isHero = container.classList.contains('nds-hero');
            this._spotlight = container.classList.contains('nds-spotlight');
            this._cachedGap = null;
            this.currentIndex = 0;
            // [hidden] snapshot — destroy() restores the as-served nav state.
            this._navHadHidden = !!(this._navigation && this._navigation.hasAttribute('hidden'));

            if (!this.wrapper || this._slides.length === 0) {
                console.warn('NDS Swiper: No wrapper or slides found');
                return;
            }

            // Static knobs — read once, reused on every breakpoint change.
            // Computed, not inline: a strict-CSP page sets them in a class.
            const cs = getComputedStyle(container);
            const readKnob = prop => parseInt(cs.getPropertyValue(prop)) || 0;
            this._slidesMax = readKnob('--max-slides') || 1;
            this._slidesMid = readKnob('--mid-slides') || 1;
            this._slidesMin = readKnob('--min-slides') || 1;
            if (this._spotlight) this._slidesMax = this._slidesMid = this._slidesMin = 1;
            this._peek = readKnob('--peek');

            // Loop needs more slides than the largest page, or a page would show a
            // slide twice. Decided once, against the largest tier.
            // ponytail: per-tier loop (on at mobile, off at desktop) when a real deck asks.
            // A spotlight always loops; its peeks show one more slide at each end, so
            // it needs one more.
            this._loop = (container.hasAttribute('data-swiper-loop') || this._spotlight) &&
                this._slides.length > Math.max(this._slidesMax, this._slidesMid, this._slidesMin) + (this._spotlight ? 1 : 0);
            this._real = this._slides.length; // real slides; clones extend this._slides at both ends
            this._head = 0;                  // clones before the first real slide

            this._valid = true;
            this.init();
        }

        // ==============================================
        // BREAKPOINT CALCULATION
        // ==============================================

        _calculateSlidesPerView() {
            if (mqDesktop.matches) return this._slidesMax;
            if (mqTablet.matches) return this._slidesMid;
            return this._slidesMin;
        }

        _getGap() {
            if (this._cachedGap === null) {
                this._cachedGap = parseInt(getComputedStyle(this._container).getPropertyValue('--swiper-gap')) || 0;
            }
            return this._cachedGap;
        }

        get _maxIndex() {
            return Math.max(0, this._slides.length - this.slidesPerView);
        }

        // Real-slide index of a full-list position — a rest on a clone maps to its
        // twin. One source for every site that must agree on it: where the loop jumps,
        // which bullet reads active, where destroy() lands the
        // row. _goToFull needs it for a target index, not the current one, hence the
        // parameter.
        _toRealIndex(index) {
            const realCount = this._real;
            return (((index - this._head) % realCount) + realCount) % realCount;
        }

        get _realIndex() { return this._toRealIndex(this.currentIndex); }

        // Pages at the current slidesPerView. Decides nav visibility in
        // _syncSlidesPerView and pagination + button visibility in _setupPagination —
        // two halves of the same chrome, so they read one value.
        get _pageCount() {
            return Math.ceil(this._real / this.slidesPerView);
        }

        // Where page p starts, in real slides. The last page end-aligns so it stays
        // inside the deck; a loop has no end, so its pages run on into the clones.
        _getPageStart(page) {
            const start = page * this.slidesPerView;
            return this._loop ? start : Math.min(start, this._real - this.slidesPerView);
        }

        init() {
            this.abortController = new AbortController();
            // An unencoded space in a srcset URL breaks the candidate. Before _setupLoop,
            // so the clones copy the repaired value.
            this._container.querySelectorAll('img[srcset], source[srcset]').forEach(el => {
                const srcset = el.getAttribute('srcset');
                const fixed = fixSrcsetSpaces(srcset);
                if (fixed !== srcset) el.setAttribute('srcset', fixed);
            });
            this._container.style.setProperty('--total', this._real);
            this._syncSlidesPerView();

            // Single-slide swipers can never navigate; bail before nav/observer/keyboard
            // setup. They still join the shared breakpoint subscription — --slides
            // must keep tracking --max/mid/min-slides or the lone card holds its
            // init-time width across resizes.
            if (this._slides.length === 1) {
                resizeSwipers.add(this);
                ensureSharedResize();
                this._container.setAttribute('data-nds-swiper-initialized', 'true');
                return;
            }

            // Clones first: the lazy-load and hero-reveal gates below walk this._slides.
            if (this._loop) this._setupLoop();

            this._setupNavigation();
            this._setupScrollSync();
            this._setupKeyboard();
            this._setupResize();

            // Gate observers — only register when they have work to do.
            const lazySlides = this._slides.filter(slide =>
                slide.querySelector('img[data-src], img[data-srcset]')
            );
            if (lazySlides.length) this._setupLazyLoading(lazySlides);
            // _setupVisibilityObserver only does meaningful work for heroes that have
            // [hidden] slides to reveal on visibility (the WebKit RTL fix). Non-hero
            // peek/state was set synchronously above — no late update needed.
            if (this._isHero && this._slides.some(slide => slide.hasAttribute('hidden'))) {
                this._setupVisibilityObserver();
            }

            // Initial state. _setupPagination (called inside _syncSlidesPerView) already
            // set the active bullet; only buttons + boundary classes remain.
            this._syncButtons();
            this._syncBoundaryClasses();
            this._syncSpotlight();
            this.lastIndex = this.currentIndex;

            this._container.setAttribute('data-nds-swiper-initialized', 'true');
        }

        _setupVisibilityObserver() {
            // One-shot: fires once when the hero becomes visible, reveals [hidden]
            // slides, then unsubscribes. Only registered when the hero actually has
            // [hidden] slides (gated at init).
            this._offVisibility = NDS.onIntersect(this._container, (entry) => {
                if (!entry.isIntersecting) return;
                this._offVisibility();
                this._offVisibility = null;

                // rAF so the forced reflow below lands on the next paint frame,
                // not on the IO callback's task.
                requestAnimationFrame(() => {
                    // One reveal, two scroll contexts — a later addition to it must
                    // reach both directions, not just the RTL default.
                    const reveal = () => this._slides.forEach(slide => slide.removeAttribute('hidden'));
                    if (NDS.isRTL) {
                        // WebKit RTL: keep scroll-behavior: auto through the entire
                        // update so Safari/WebKit doesn't jump scroll on reflow.
                        this._runInstant(() => {
                            reveal();
                            this.wrapper.scrollLeft = 0;
                            void this.wrapper.offsetHeight;
                            this.wrapper.scrollLeft = 0;
                            void this.wrapper.offsetHeight;
                        });
                    } else {
                        reveal();
                    }

                    // Revealing slides changes slide spacing but not the wrapper's box,
                    // so the ResizeObserver never re-fires. Without this, the step cached
                    // at init off a display:none slide (= wrapper padding, truthy, so the
                    // offsetWidth fallback never runs) sticks and clamps currentIndex to
                    // _maxIndex on the first scroll.
                    this._measuredStep = null;
                    // The loop's start position was measured off hidden clones too.
                    // This IS the landing when the reveal beats the resize callback to
                    // it, so clear the flag here as well.
                    if (this._loop) {
                        this._loopPending = false;
                        this._jumpTo(this._head);
                        this._detectCurrentSlide();
                    }
                });
            }, { threshold: 0.01 });
        }

        // ==============================================
        // RESPONSIVE SLIDES PER VIEW
        // ==============================================

        _syncSlidesPerView() {
            const newSlidesPerView = this._calculateSlidesPerView();

            if (newSlidesPerView !== this.slidesPerView) {
                this.slidesPerView = newSlidesPerView;
                this._container.style.setProperty('--slides', this.slidesPerView);
            }

            const pageCount = this._pageCount;

            // Nav visibility rides the served [hidden] FOUC guard, re-decided on
            // every breakpoint pass. Inline display can't do this job — the
            // universal [hidden]{display:none!important} rule outranks it, which
            // left the nav stuck hidden when init landed on a one-page breakpoint.
            if (this._navigation) this._navigation.toggleAttribute('hidden', pageCount <= 1);

            // CSS adds the gap to --peek; this flag only says whether there is a
            // next page to peek at.
            this._container.toggleAttribute('data-swiper-peek', this._peek > 0 && pageCount > 1);

            if (this._pagination) this._setupPagination();
        }

        _setupResize() {
            // Breakpoint-driven slidesPerView: shared via ensureSharedResize; instance
            // is invoked through resizeSwipers membership.
            resizeSwipers.add(this);
            ensureSharedResize();

            // Pixel-geometry caches (_measuredStep, _cachedGap) go stale on ANY size
            // change, not just breakpoint crosses: a same-band window resize, or the
            // hero settling to full width after first paint, both change slide spacing
            // without firing a matchMedia change. A stale step makes _detectCurrentSlide's
            // round(scrollPos/step) overcount, which corrupts currentIndex → wrong nav
            // disable state, wrong active bullet, and no-op prev/next. Invalidate + re-sync
            // on every wrapper resize. Shared ResizeObserver via NDS.onElementResize; its
            // initial callback also covers the cold-init measurement (no forced layout at init).
            const remeasure = () => {
                this._cachedGap = null;
                this._measuredStep = null;
                // Loop: land on the first real slide here, not at init — this initial
                // callback runs after layout and before the first paint after init, so
                // the head clones never show and init stays free of layout reads.
                // _detectCurrentSlide first, because it is what measures the step, and
                // the landing needs that measurement: _jumpTo takes its offset from
                // offsetLeft, so a callback that fires before the slides have width
                // computes a zero offset, scrolls nowhere, and still spends the
                // landing. Wait for a real step.
                this._detectCurrentSlide();
                if (this._loopPending && this._measuredStep) {
                    this._loopPending = false;
                    this._jumpTo(this._head);
                    this._detectCurrentSlide();
                }
                this._syncPagination();
                this._syncButtons();
                this._syncBoundaryClasses();
                this._syncSpotlight();
                this.lastIndex = this.currentIndex;
            };
            this._offResize = NDS.onElementResize(this.wrapper, remeasure);
            // A spotlight's content sets its slide's width, which can change while
            // the row's does not (a late image, a font, a live style edit).
            if (this._spotlight) this._offSlideResize = NDS.onElementResize(this._slides[this._head], remeasure);
        }

        _handleResize() {
            this._cachedGap = null;
            this._measuredStep = null;
            const oldSlidesPerView = this.slidesPerView;
            this._syncSlidesPerView();

            if (oldSlidesPerView !== this.slidesPerView) {
                this._syncButtons();
                this._syncBoundaryClasses();
            }
        }

        // ==============================================
        // ACTIVATION HELPER (nav buttons + bullets)
        // ==============================================
        // pointerdown unifies mouse + touch + pen; preventDefault prevents focus-
        // on-click (preserves keyboard nav) and suppresses synthetic mouse events on
        // touch. Touch-scroll on the button itself is blocked by `touch-action:
        // manipulation` in _swiper.scss.
        // `action` receives the triggering event so delegated callers (the
        // pagination container) can resolve e.target; direct callers ignore it.
        _addActivationListeners(btn, action) {
            const { signal } = this.abortController;
            btn.addEventListener('pointerdown', (e) => {
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                e.preventDefault();
                action(e);
            }, { signal });
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    action(e);
                }
            }, { signal });
            // A click with no pointer behind it (detail 0): .click(), voice control, a screen reader.
            btn.addEventListener('click', (e) => { if (e.detail === 0) action(e); }, { signal });
        }

        // ==============================================
        // NAVIGATION
        // ==============================================

        _setupNavigation() {
            if (this._prevButton) this._addActivationListeners(this._prevButton, () => this.prev());
            if (this._nextButton) this._addActivationListeners(this._nextButton, () => this.next());
        }

        // Always a full view. A loop whose count is not a multiple of the slides
        // per view drifts off the page grid by the remainder on every wrap; the
        // bullets absorb that (_syncPagination), the movement never does.
        prev() { this._goToFull(this.currentIndex - this.slidesPerView); }
        next() { this._goToFull(this.currentIndex + this.slidesPerView); }

        // The index counts real slides. Internally the row may carry clones
        // at both ends, so every scroll target is a full-list index.
        _goToSlide(index) {
            // Clamp in real slides: a loop's full-list clamp spans the clones, so an
            // out-of-range index would wrap onto an arbitrary slide.
            index = Math.max(0, Math.min(index, this._real - 1));
            this._goToFull(this._getFullIndex(index));
        }

        // Full-list index of a real slide, in the cycle the row sits in NOW. Between
        // a rapid click and the settle jump the row rests on a clone, and _head +
        // real would then animate a whole cycle the wrong way to reach the twin.
        _getFullIndex(real) {
            return this.currentIndex + (real - this._realIndex);
        }

        // scrollTo/scrollBy's 'auto' keyword — and passing no keyword at all — defers
        // to the element's computed scroll-behavior, which _swiper.scss sets to smooth
        // on the wrapper. Toggling it inline is the only way to force a real instant
        // scroll, and that holds on every engine, not just old Safari. Every instant
        // path here routes through this.
        _runInstant(scroll) {
            const prevBehavior = this.wrapper.style.scrollBehavior;
            const prevSnap = this.wrapper.style.scrollSnapType;
            this.wrapper.style.scrollBehavior = 'auto';
            // Mandatory snap re-snaps the row after ANY programmatic write, so a cycle
            // shift issued mid-animation loses its fraction and lands on a slot instead
            // (measured 3.57 → 2.00) — the visible cut on rapid arrow clicks. Every
            // caller here targets a position it computed itself; none wants re-snapping.
            this.wrapper.style.scrollSnapType = 'none';
            scroll();
            this.wrapper.style.scrollSnapType = prevSnap;
            this.wrapper.style.scrollBehavior = prevBehavior;
        }

        _goToFull(index, instant = NDS.prefersReducedMotion) {
            // A move before the first resize callback lands the loop now; landing after
            // would cancel the move and strand _aim. No layout yet = leave it to remeasure.
            if (this._loopPending && this._slides[1].offsetLeft !== this._slides[0].offsetLeft) {
                this._loopPending = false;
                this._jumpTo(this._head);
                this._detectCurrentSlide();
            }
            if (this._loop) {
                // Keep the animation inside the clone budget and off the end-aligned
                // last page (a loop has no end, so that alignment would shift at the
                // settle jump): a target past the start or on the last page first
                // shifts one real cycle the other way, silently.
                const realCount = this._real;
                if (index < 0) { if (this._shiftCycle(1)) { this.currentIndex += realCount; index += realCount; } }
                else if (index >= this._maxIndex) { if (this._shiftCycle(-1)) { this.currentIndex -= realCount; index -= realCount; } }
            }
            const clampedIndex = Math.max(0, Math.min(index, this._maxIndex));
            const targetSlide = this._slides[clampedIndex];
            if (!targetSlide) return;

            // offsetLeft difference from first slide — static DOM property,
            // unaffected by scroll animation, accounts for wrapper padding.
            // Last page: end-align instead — the start-aligned offset overshoots
            // max-scroll by the peek reserve (no next page left to peek), and
            // mandatory snap re-pulls the row short, clipping the last slide.
            const offset = clampedIndex >= this._maxIndex && !this._spotlight
                ? this.wrapper.scrollWidth - this.wrapper.clientWidth
                : this._getOffset(targetSlide);

            const left = NDS.isRTL ? -offset : offset;
            // Where a smooth move rests; the loop's settle waits for it (_setupLoop).
            this._aim = instant ? null : offset;
            // The spotlight opens the target at the click, not as the row crosses halfway.
            this._aimReal = this._toRealIndex(clampedIndex);
            this._syncSpotlight();
            // No keyword: the wrapper's own scroll-behavior decides (smooth by
            // default), so a consumer can set it to auto and get an instant switch.
            if (instant) this._runInstant(() => this.wrapper.scrollTo({ left }));
            else this.wrapper.scrollTo({ left });
        }

        // ==============================================
        // LOOP — clones at both ends, silent jump at rest
        // ==============================================

        _setupLoop() {
            // Two pages plus one clone on each side, and never fewer than six SLIDES.
            // The floor is absolute because the relative formula strands a short row: a
            // two-slide loop caps its budget at two, so the edge stays two swipes away
            // and _recenter has no room to work in — it only shifts once the row is a
            // whole cycle out. A row shorter than the budget repeats its own cycle to
            // reach it; the wrap math is cycle-relative, so the clone index just wraps.
            const realCount = this._real;
            const count = Math.max(2 * Math.max(this._slidesMax, this._slidesMid, this._slidesMin) + 1, 6);
            const clone = (i) => {
                const clone = this._slides[i].cloneNode(true);
                clone.classList.add('nds-swiper-clone');
                clone.setAttribute('data-swiper-clone', i);   // its real twin, for consumers that sync content
                clone.setAttribute('aria-hidden', 'true');
                // aria-hidden keeps the duplicate out of the a11y tree, but inert also
                // killed clicks — and a row showing more than one slide rests with
                // clones on screen, so those were dead. Drop them from the tab order
                // instead: pointer works, Tab still lands on the real twin only.
                clone.querySelectorAll(NDS.focusableSel).forEach(el => el.setAttribute('tabindex', '-1'));
                // A duplicated id would steal anchors and label-for from the real slide.
                clone.removeAttribute('id');
                clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
                return clone;
            };
            const head = [], tail = [];
            for (let j = 0; j < count; j++) {
                head.push(clone((((j - count) % realCount) + realCount) % realCount));
                tail.push(clone(j % realCount));
            }
            this._slides[0].before(...head);
            this._slides[realCount - 1].after(...tail);
            this._head = count;
            this._slides = [...head, ...this._slides, ...tail];
            this.currentIndex = count;
            this._loopPending = true; // the ResizeObserver's first callback lands the jump

            // A rest inside a clone zone jumps to the real twin — same content, so
            // nothing visibly moves. scrollend where it exists; elsewhere a rest is
            // 150 ms without a scroll event.
            const { signal } = this.abortController;
            // The instant cycle shift mid-move fires its own scrollend while the smooth
            // move still runs — and a real window can hold that move still for two frames
            // before it starts, so "stopped moving" is no test. Settle only once the row
            // reaches the move's own target; the move's end fires another scrollend.
            const settle = () => {
                if (this._aim != null) {
                    if (Math.abs(Math.abs(this.wrapper.scrollLeft) - this._aim) > 2) return;
                    this._aim = null;
                }
                this._settleLoop();
            };
            if ('onscrollend' in this.wrapper) this.wrapper.addEventListener('scrollend', settle, { signal });
            else this.wrapper.addEventListener('scroll', NDS.debounce(settle, 150), { passive: true, signal });
            // A wheel or a touch cancels the move, so its target no longer holds the settle.
            this.wrapper.addEventListener('wheel', () => { this._aim = null; }, { passive: true, signal });

            // A rest needs a real pause and a run of swipes never gives one: measured
            // SEVEN flicks passing before one scrollend landed, each spending a clone,
            // so the row runs out of them and stops dead on its real edge. Take the
            // other quiet moment instead — the touch that starts the next swipe.
            this.wrapper.addEventListener('pointerdown', (e) => this._recenter(e), { passive: true, signal });
        }

        // Shift whole cycles from where the row ACTUALLY is — mid-flight currentIndex is
        // a rounded read of a moving position.
        _recenter(e) {
            // Touch only: a mouse pointerdown is the start of a click, and moving the
            // row under it hands pointerup to the twin, which loses the click.
            if (e.pointerType === 'mouse') return;
            this._aim = null;
            if (this._loopPending || !this._measuredStep) return;
            const position = this._getPosition();
            const dir = position < this._head ? 1 : position >= this._head + this._real ? -1 : 0;
            if (!dir) return;

            // The row is nearly always mid-snap here (measured ~0.1 of a slide short),
            // and mandatory snap re-snaps after ANY programmatic write — that cut to the
            // nearest slot is the flicker. So hold snap off until the finger leaves:
            // during a drag it does nothing anyway, and the touch has already cancelled
            // the animation the cut would have landed on.
            const wrapper = this.wrapper, snap = wrapper.style.scrollSnapType;
            wrapper.style.scrollSnapType = 'none';
            const restore = () => { wrapper.style.scrollSnapType = snap; };
            if (!this._shiftCycle(dir)) return restore();
            const { signal } = this.abortController;
            wrapper.addEventListener('pointerup', restore, { once: true, signal });
            wrapper.addEventListener('pointercancel', restore, { once: true, signal });
        }

        _settleLoop() {
            this._detectCurrentSlide();
            const realCount = this._real, headCount = this._head, i = this.currentIndex;
            if (i >= headCount && i < headCount + realCount) return;
            this._jumpTo(headCount + this._realIndex);
            this._detectCurrentSlide();
            this.updateState();
        }

        // Shift the row by whole real cycles from where it ACTUALLY is. _jumpTo
        // assumes the row rests on currentIndex's slot; a rapid arrow click lands
        // mid-animation, where currentIndex is a rounded read of a moving position,
        // and the snap-to-slot is the visible cut. One cycle either way is identical
        // content, so a relative shift is invisible at rest and mid-flight alike.
        // Refused when the row has no room for it: the browser clamps at the edge, and a
        // clamped shift is a short one, which does show. Skipping costs nothing — the
        // settle re-anchors at the next rest.
        _shiftCycle(dir) {
            const realCount = this._real;
            const landing = this._getPosition() + dir * realCount;
            if (landing < 0 || landing > this._maxIndex) return false;
            const cycle = Math.abs(this._slides[this._head + realCount].offsetLeft - this._slides[this._head].offsetLeft);
            this._runInstant(() => { this.wrapper.scrollLeft += NDS.isRTL ? -dir * cycle : dir * cycle; });
            return true;
        }

        // Instant reposition to a full-list index.
        _jumpTo(index) {
            const target = this._slides[index];
            if (!target) return;
            const offset = this._getOffset(target);
            this._runInstant(() => { this.wrapper.scrollLeft = NDS.isRTL ? -offset : offset; });
        }

        // Scroll distance from the start that rests this slide. A spotlight centres
        // the slide where it really is: content can grow it past its planned width.
        _getOffset(el) {
            if (!this._spotlight) return Math.abs(el.offsetLeft - this._slides[0].offsetLeft);
            const rect = el.getBoundingClientRect(), wrapperRect = this.wrapper.getBoundingClientRect();
            return Math.abs(this.wrapper.scrollLeft + (rect.left + rect.right - wrapperRect.left - wrapperRect.right) / 2);
        }

        // ==============================================
        // SCROLL SYNC
        // ==============================================

        _setupScrollSync() {
            const { signal } = this.abortController;
            const wrapper = this.wrapper;
            wrapper.addEventListener('scroll', NDS.rafThrottle(() => {
                this._detectCurrentSlide();
                this.updateState();
            }), { passive: true, signal });

            // The shadow clip cuts cards short of the screen edge; CSS lifts it while the row moves.
            if (this._isHero || this._spotlight || !this._container.closest('.nds-max-width')) return;
            const clearMoving = () => wrapper.removeAttribute('data-swiper-moving');
            wrapper.addEventListener('scroll', () => {
                if (!wrapper.hasAttribute('data-swiper-moving')) wrapper.setAttribute('data-swiper-moving', '');
            }, { passive: true, signal });
            if ('onscrollend' in wrapper) wrapper.addEventListener('scrollend', clearMoving, { signal });
            else wrapper.addEventListener('scroll', NDS.debounce(clearMoving, 150), { passive: true, signal });
        }

        _detectCurrentSlide() {
            if (this._slides.length === 0) return;

            // Measure actual step from DOM once (accounts for fractional widths + gap).
            if (this._slides.length > 1 && !this._measuredStep) {
                this._measuredStep = Math.abs(this._slides[1].offsetLeft - this._slides[0].offsetLeft);
            }

            this.currentIndex = Math.max(0, Math.min(Math.round(this._getPosition()), this._maxIndex));
        }

        // Where the row is, in slides. A spotlight counts the slide nearest the
        // middle instead: content can make one slide wider, and then no step fits.
        _getPosition() {
            if (this._spotlight) {
                const wrapperRect = this.wrapper.getBoundingClientRect(), mid = wrapperRect.left + wrapperRect.right;
                let position = 0, best = Infinity;
                this._slides.forEach((slide, j) => {
                    const rect = slide.getBoundingClientRect(), distance = Math.abs(rect.left + rect.right - mid);
                    if (distance < best) { best = distance; position = j; }
                });
                return position;
            }
            const step = this._measuredStep || (this._slides[0].offsetWidth + this._getGap()) || 1;
            return (NDS.isRTL ? -this.wrapper.scrollLeft : this.wrapper.scrollLeft) / step;
        }

        // ==============================================
        // PAGINATION
        // ==============================================

        _setupPagination() {
            const pageCount = this._pageCount;

            const hidden = pageCount <= 1;
            const display = hidden ? 'none' : '';
            this._pagination.style.display = display;
            this._pagination.innerHTML = '';
            if (this._prevButton) this._prevButton.style.display = display;
            if (this._nextButton) this._nextButton.style.display = display;
            this.wrapper.style.overflow = hidden ? 'unset' : '';
            if (hidden) return;

            // Delegated activation — one listener on the container, attached once.
            // Bullets are rebuilt on every breakpoint change (_setupPagination re-runs
            // via _syncSlidesPerView); binding per-bullet would stack listeners on the
            // instance signal until destroy.
            if (!this._paginationBound) {
                this._paginationBound = true;
                this._addActivationListeners(this._pagination, (e) => {
                    const bullet = e.target.closest('.nds-bullet');
                    if (bullet && this._pagination.contains(bullet)) {
                        this._goToSlide(this._getPageStart(Number(bullet.dataset.page)));
                    }
                });
            }

            for (let i = 0; i < pageCount; i++) {
                const bullet = document.createElement('button');
                bullet.className = 'nds-bullet';
                bullet.type = 'button';
                bullet.dataset.page = i;
                strings.set(bullet, 'aria-label', 'go_to_page', { n: i + 1 });
                this._pagination.appendChild(bullet);
            }

            this._syncPagination();
        }

        _syncPagination() {
            if (!this._pagination) return;

            const bullets = this._pagination.querySelectorAll('.nds-bullet');
            const current = this._realIndex;

            // The page whose start is at or before the lead slide. A drifted loop
            // then skips at most the last bullet on a wrap; the nearest start would
            // also leap two bullets mid-cycle.
            let currentPage = 0;
            for (let i = 1; i < bullets.length; i++) {
                if (this._getPageStart(i) <= current) currentPage = i;
            }

            bullets.forEach((bullet, i) => {
                const isActive = i === currentPage;
                if (isActive) NDS.status.set(bullet, 'active');
                else NDS.status.clear(bullet);
                NDS.aria.current(bullet, isActive ? 'true' : null);
            });
        }

        // ==============================================
        // KEYBOARD
        // ==============================================

        _setupKeyboard() {
            // Only own the tabindex we add — destroy() must leave an author's alone.
            this._ownsTabindex = !this._container.hasAttribute('tabindex');
            if (this._ownsTabindex) this._container.setAttribute('tabindex', '0');

            activeSwipers.add(this);
            ensureSharedKeydown();
        }

        // The nav buttons listen for pointerdown, not click, so an arrow key has to
        // call the move itself; the button's disabled state stays the boundary guard.
        _moveByArrow(dir) {
            const btn = dir === 'next' ? this._nextButton : this._prevButton;
            if (btn && !btn.disabled) this[dir]();
        }

        _handleKeydown(e) {
            const rtl = NDS.isRTL;
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this._moveByArrow(rtl ? 'next' : 'prev');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this._moveByArrow(rtl ? 'prev' : 'next');
                    break;
                case 'Home':
                    e.preventDefault();
                    this._goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this._goToSlide(this._getPageStart(this._pageCount - 1));
                    break;
            }
        }

        // ==============================================
        // LAZY LOADING
        // ==============================================

        _setupLazyLoading(lazySlides) {
            const pending = new Set(lazySlides), offs = [];
            const load = (slide, ahead) => {
                if (!pending.delete(slide)) return;
                // Activate <source> elements inside <picture> first.
                this._findLazyElements(slide, 'source[data-srcset]').forEach(source => {
                    source.srcset = fixSrcsetSpaces(source.dataset.srcset);
                    delete source.dataset.srcset;
                });
                this._findLazyElements(slide, 'img[data-src], img[data-srcset]').forEach(img => {
                    // Loaded ahead: yield the network to the slide on screen (and the LCP).
                    if (ahead && !img.hasAttribute('fetchpriority')) img.fetchPriority = 'low';
                    if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
                    if (img.dataset.srcset) { img.srcset = fixSrcsetSpaces(img.dataset.srcset); delete img.dataset.srcset; }
                });
            };
            const loadReal = (realIndex) => this._slides.forEach((slide, j) => { if (this._toRealIndex(j) === realIndex) load(slide, true); });
            // Ahead loads wait until every image on screen has finished (or failed): low
            // priority alone still starts them at once, sharing a slow link with the view.
            // ponytail: a request that never settles holds them; they then load on arrival.
            const { signal } = this.abortController;
            const busy = new Set();
            let queued = [];
            const flush = () => {
                if (busy.size) return;
                const pending = queued;
                queued = [];
                pending.forEach(fn => fn());
            };
            const track = (img) => {
                if (img.complete) return;
                busy.add(img);
                const handleSettled = () => { busy.delete(img); flush(); };
                img.addEventListener('load', handleSettled, { once: true, signal });
                img.addEventListener('error', handleSettled, { once: true, signal });
            };
            // The row clips its sides, so rootMargin never reaches the slide beside the view:
            // it would load only as it slides in. A slide that shows also loads a page either
            // side of it, loop twins included, so the next slide and the loop's silent jump
            // land loaded. Every slide is watched, so a plain-src one triggers it too; a
            // spotlight's or peek's side slides show, so they reach one further.
            this._slides.forEach((slide, j) => {
                const off = NDS.onIntersect(slide, (entry) => {
                    if (!entry.isIntersecting) return;
                    off();
                    load(slide, false);
                    slide.querySelectorAll('img').forEach(track);
                    queued.push(() => {
                        const realCount = this._real, realIndex = this._toRealIndex(j);
                        for (let offset = realIndex - this.slidesPerView; offset <= realIndex + this.slidesPerView; offset++) {
                            if (this._loop) loadReal((offset % realCount + realCount) % realCount);
                            else if (offset >= 0 && offset < realCount) loadReal(offset);
                        }
                    });
                    // After the batch, so every slide on screen is tracked first.
                    queueMicrotask(flush);
                }, { rootMargin: '200px' });
                offs.push(off);
            });
            this._offLazyLoad = offs;
        }

        // A nested swiper that lazy-loads its own slides keeps its images; one that
        // doesn't (a single slide, a loop clone's dead copy) leaves them to us.
        _findLazyElements(slide, selector) {
            return Array.from(slide.querySelectorAll(selector)).filter(el => {
                const owner = el.closest('.nds-swiper');
                return !owner || owner === this._container || !owner.ndsSwiper?._offLazyLoad;
            });
        }

        // ==============================================
        // STATE UPDATE
        // ==============================================

        updateState() {
            if (this.lastIndex === this.currentIndex) return;
            this.lastIndex = this.currentIndex;

            this._syncPagination();
            this._syncButtons();
            this._syncBoundaryClasses();
            this._syncSpotlight();
            this._container.dispatchEvent(new CustomEvent('nds:swiper:change', {
                bubbles: true, detail: { index: this._realIndex }
            }));
        }

        // The slide in the middle is the open one. Every twin of it (real or clone)
        // is marked, so the loop's silent jump onto a twin changes nothing visible.
        _syncSpotlight() {
            if (!this._spotlight) return;
            // Before the loop lands, the index still points into the head clones.
            // While a move is under way the target stays open, so a jump over several
            // slides does not open each one it crosses (the loop clears _aim on arrival).
            const open = this._loopPending ? 0 : this._loop && this._aim != null ? this._aimReal : this._realIndex;
            // Runs on every scroll frame; the marks change only when the open slide does.
            if (open === this._open) return;
            this._open = open;
            const realCount = this._real;
            this._slides.forEach((slide, j) => {
                // Side of the nearest twin of the open slide, so every twin has the
                // same neighbours. Without a loop the row does not wrap.
                let distance = this._loop ? (((this._toRealIndex(j) - open) % realCount) + realCount) % realCount : j - open;
                if (this._loop && distance > realCount / 2) distance -= realCount;
                if (distance === 0) NDS.status.set(slide, 'active');
                else if (distance > 0) NDS.status.set(slide, 'after');
                else NDS.status.clear(slide);
            });
        }

        _syncButtons() {
            if (this._prevButton) this._prevButton.disabled = !this._loop && this.currentIndex <= 0;
            if (this._nextButton) this._nextButton.disabled = !this._loop && this.currentIndex >= this._maxIndex;
        }

        _syncBoundaryClasses() {
            const tokens = [];
            // A loop has no ends.
            if (!this._loop && this.currentIndex <= 0) tokens.push('at-start');
            if (!this._loop && this.currentIndex >= this._maxIndex) tokens.push('at-end');
            NDS.state.set(this._container, ...tokens);
        }

        // ==============================================
        // PUBLIC API
        // ==============================================

        goTo(index, animate = true) {
            // Real index in, clamped to the last real page. A loop has no last page, so
            // any slide goes — the index nds:swiper:change reports must restore.
            index = Math.max(0, Math.min(index, this._real - (this._loop ? 1 : this.slidesPerView)));
            this._goToFull(this._getFullIndex(index), !animate || NDS.prefersReducedMotion);
        }

        // ==============================================
        // CLEANUP
        // ==============================================

        // Instance becomes unusable after destroy(): this.abortController is nulled, so any
        // subsequent call to a setup method that reads `this.abortController.signal` will
        // throw. Re-initialize via `NDS.Swiper.create(el)` (constructs a fresh instance).
        destroy() {
            this._container.removeAttribute('data-nds-swiper-initialized');
            if (this._ownsTabindex) this._container.removeAttribute('tabindex');

            // Drop the clones and land on the real twin of the current slide.
            if (this._head) {
                const real = this._realIndex;
                this._slides = this._slides.filter(slide => !slide.classList.contains('nds-swiper-clone') || (slide.remove(), false));
                this._head = 0;
                this._jumpTo(real);
            }

            // Reverse the state init/_setupPagination wrote, so destroy() restores
            // the pre-init DOM for consumers that tear down without re-creating.
            this._container.removeAttribute('data-swiper-peek');
            this._container.removeAttribute('data-swiper-preset');
            this._container.removeAttribute('data-swiper-single');
            NDS.state.clear(this._container); // at-start/at-end are a documented consumer hook
            ['--total', '--slides'].forEach(property => this._container.style.removeProperty(property));
            if (this._spotlight) this._slides.forEach(slide => NDS.status.clear(slide));
            this.wrapper.style.removeProperty('overflow');
            this.wrapper.removeAttribute('data-swiper-moving');
            if (this._pagination) { this._pagination.style.removeProperty('display'); this._pagination.innerHTML = ''; }
            if (this._navigation) this._navigation.toggleAttribute('hidden', this._navHadHidden);
            if (this._prevButton) this._prevButton.style.removeProperty('display');
            if (this._nextButton) this._nextButton.style.removeProperty('display');
            activeSwipers.delete(this);
            resizeSwipers.delete(this);
            if (this._offResize) { this._offResize(); this._offResize = null; }
            if (this._offSlideResize) { this._offSlideResize(); this._offSlideResize = null; }
            if (this._offVisibility) { this._offVisibility(); this._offVisibility = null; }
            if (this._offLazyLoad) { this._offLazyLoad.forEach(off => off()); this._offLazyLoad = null; }
            if (this.abortController) { this.abortController.abort(); this.abortController = null; }

            delete this._container.ndsSwiper;
        }
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    function setupSwipers() {
        const swipers = document.querySelectorAll('.nds-swiper');
        swipers.forEach(swiper => {
            // A loop clone's nested swiper is a dead copy — reinit must not wire it.
            if (swiper.closest('code, .nds-swiper-clone')) return;
            if (swiper.hasAttribute('data-nds-swiper-initialized')) return;
            const instance = new NdsSwiper(swiper);
            // Expando only on successful construction — retries must not inherit
            // a half-built instance.
            if (instance._valid) swiper.ndsSwiper = instance;
        });
    }

    NDS.Swiper = {
        init: setupSwipers,
        reinit: setupSwipers,
        create: (element) => {
            if (element.ndsSwiper) return element.ndsSwiper;
            const instance = new NdsSwiper(element);
            if (!instance._valid) return null;
            element.ndsSwiper = instance;
            return instance;
        },
        destroy: (element) => {
            const instance = element?.ndsSwiper;
            if (!instance) return;
            instance.destroy();
        }
    };

})();
