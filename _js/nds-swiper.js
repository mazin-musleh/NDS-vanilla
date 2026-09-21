/* NDS.Swiper — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Swiper.init() / .reinit()   scan + initialize .nds-swiper
 *   NDS.Swiper.create(el)           instance one swiper
 *   NDS.Swiper.destroy(el)          tear one down — the NDS.Init.destroy entry point
 *   instance.next() / .prev()       move by one page
 *   instance.goTo(index)            move to a slide index
 *   instance.destroy()
 * Events:
 *   nds:swiper:change (bubbles)     detail.index = the real slide now at rest, after every move
 * Hooks (knobs set inline on the swiper container's style attribute):
 *   .nds-deck                                    deck mode: a .nds-swiper-deck of .nds-swiper-card
 *                                                buttons (one per slide, same order) beside the
 *                                                track; the active card is at the front, the rest
 *                                                fan behind it; a tap on a card goes to its slide,
 *                                                and below the desktop breakpoint a drag across
 *                                                the deck follows the pointer and pages on release
 *                                                (the fan layout has the arrows). Loops by default (same
 *                                                slide-count rule as the attribute)
 *   .nds-stacked                                 deck mode: the stacked layout at every width, not
 *                                                only below desktop — the deck above the track, the
 *                                                open card centred, its two neighbours peeking, and
 *                                                the drag armed on desktop too
 *   --deck-card · --deck-ratio · --deck-strip    open card width · its width ÷ height ·
 *                                                folded strip width (the fan layout)
 *   --max-slides · --mid-slides · --min-slides   slides per view at desktop / tablet /
 *                                                mobile, default 1 each; CSS sizes the row
 *                                                from them before any JS runs
 *   --peek                                       length of the next slide left showing
 *   slides-max · slides-mid · slides-min · peek  deprecated bare-attribute spellings of the
 *                                                same knobs — JS-only, so the row waits for
 *                                                the loader preset (DEPRECATIONS.md)
 *   --gap                                        gap between slides
 *   data-swiper-loop                             endless row: clones at both ends, a silent
 *                                                jump when the scroll rests on one. Needs
 *                                                more slides than the largest tier's count,
 *                                                else ignored. goTo/slideTo indices stay real
 *   on a slide's <img>: data-src · data-srcset   lazy sources, written to src/srcset when
 *                                                the slide nears the viewport
 *   written by the component: --slides on the container, data-swiper-peek while peeking,
 *                             .nds-swiper-clone slides (aria-hidden, focusables dropped from
 *                             the tab order, data-swiper-clone = the real twin's index) when
 *                             looping,
 *                             on each deck card --rel (wrapping distance from the active card),
 *                             --srel (the same signed the short way), data-status active|near;
 *                             --drag + .nds-dragging on the deck while a finger holds it
 *   written by the loader pre-reveal: the same --slides and peek state, plus
 *                                     data-swiper-preset (skeleton row = final row) and
 *                                     data-swiper-single when the slides fit one page
 *                                     (drops the nav reserve, which init would keep hidden)
 * Gotchas:
 *   - Positioning is CSS scroll-snap. JS only syncs the navigation, the pagination dots
 *     and lazy loading — a swiper still scrolls with JS disabled. A move animates per
 *     the wrapper's scroll-behavior (smooth by default; set auto for an instant switch).
 *     Deck mode sets it to auto itself: there the cards are the move, and a track still
 *     crossing slides re-fans the deck at each one.
 *   - The markup is .nds-swiper-wrapper holding .nds-swiper-slide items, plus optional
 *     .nds-swiper-navigation (with .nds-prev / .nds-next) and .nds-swiper-pagination.
 *   - The instance lives on the element as el._ndsSwiper.
 *   - A looping deck sets its track's scrollLeft at init, which fires one scroll event
 *     on the wrapper. A "first interaction" gate that listens for scroll in capture
 *     mode counts it — listen without capture, or ignore element scrolls.
 *   - Deck cards map to slides by DOM order, and CSS places them from that order until
 *     init stamps --rel / --srel / data-status: the markup is cards in order, nothing else.
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
            const inst = _ownerOf(document.activeElement);
            if (inst) inst._handleKeydown(e);
        });
    }

    // The INNERMOST swiper wins. A container contains a nested swiper's focused
    // slide, and :hover matches every ancestor too, so taking the first Set hit
    // (= document order) would always hand the event to the outer deck. Same
    // ownership question the constructor answers.
    function _ownerOf(active) {
        for (let el = active && active.closest('.nds-swiper'); el;
             el = el.parentElement && el.parentElement.closest('.nds-swiper')) {
            if (_activeSwipers.has(el._ndsSwiper)) return el._ndsSwiper;
        }
        // Nothing focused inside a swiper — fall back to the innermost hovered one.
        let best = null;
        for (const s of _activeSwipers) {
            if (s.container.matches(':hover') && (!best || best.container.contains(s.container))) best = s;
        }
        return best;
    }

    // slidesPerView only changes when the viewport crosses one of
    // NDS.breakpoints.{tablet,desktop} — MediaQueryList `change` fires only on
    // those transitions, skipping the resize bus's every-tick fan-out entirely.
    // Separate set from _activeSwipers: single-slide swipers skip keyboard/nav
    // setup but still need --slides re-derived on breakpoint crossings.
    const _resizeSwipers = new Set();
    const _mqDesktop = window.matchMedia(NDS.breakpoints.desktop);
    const _mqTablet = window.matchMedia(NDS.breakpoints.tablet);
    let _resizeAttached = false;

    function ensureSharedResize() {
        if (_resizeAttached) return;
        _resizeAttached = true;
        const trigger = () => _resizeSwipers.forEach(inst => inst._handleResize());
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
            // A slide holds arbitrary consumer content, so a swiper may nest inside
            // one — and its parts sit EARLIER in document order than ours, because
            // nav and pagination follow the wrapper. An unguarded querySelector then
            // hands us the nested swiper's controls. Slides are direct wrapper
            // children by contract (flex row; setupLoop inserts clones as siblings),
            // so :scope > is exact there; the rest are ownership-checked.
            // Reject only what a swiper BELOW us owns — never test for `=== container`,
            // which would strand a create() call on an element carrying no .nds-swiper.
            const nested = (el) => {
                const owner = el.closest('.nds-swiper');
                return !!owner && owner !== container && container.contains(owner);
            };
            const own = (sel) =>
                Array.from(container.querySelectorAll(sel)).find(el => !nested(el)) || null;
            this.slides = this.wrapper
                ? Array.from(this.wrapper.querySelectorAll(':scope > .nds-swiper-slide'))
                : [];
            this.pagination = own('.nds-swiper-pagination');
            this.navigation = own('.nds-swiper-navigation');
            this.prevBtn = own('.nds-prev');
            this.nextBtn = own('.nds-next');
            this._isDeck = container.classList.contains('nds-deck');
            this.deck = this._isDeck ? own('.nds-swiper-deck') : null;
            this.cards = this.deck ? Array.from(this.deck.querySelectorAll('.nds-swiper-card')) : [];

            this.isHero = container.classList.contains('nds-hero');
            this._cachedGap = null;
            this.currentIndex = 0;
            // [hidden] snapshot — destroy() restores the as-served nav state.
            this._navHadHidden = !!(this.navigation && this.navigation.hasAttribute('hidden'));

            if (!this.wrapper || this.slides.length === 0) {
                console.warn('NDS Swiper: No wrapper or slides found');
                return;
            }

            // Static knobs — read once, reused on every breakpoint change. Inline
            // custom property first (the canonical spelling, which CSS also reads),
            // the deprecated bare attribute second.
            const knob = (prop, attr) =>
                parseInt(container.style.getPropertyValue(prop)) || parseInt(container.getAttribute(attr)) || 0;
            this._slidesMax = knob('--max-slides', 'slides-max') || 1;
            this._slidesMid = knob('--mid-slides', 'slides-mid') || 1;
            this._slidesMin = knob('--min-slides', 'slides-min') || 1;
            this._peek = knob('--peek', 'peek');
            // An attribute-authored peek is invisible to CSS, so JS writes --peek for
            // it and owns it; an author's inline --peek is never touched.
            this._ownsPeek = container.hasAttribute('peek');

            // Loop needs more slides than the largest page, or a page would show a
            // slide twice. Decided once, against the largest tier.
            // ponytail: per-tier loop (on at mobile, off at desktop) when a real deck asks.
            // Deck mode loops by default: its fan wraps, so the track should too.
            this._loop = (container.hasAttribute('data-swiper-loop') || this._isDeck) &&
                this.slides.length > Math.max(this._slidesMax, this._slidesMid, this._slidesMin);
            this._real = this.slides.length; // real slides; clones extend this.slides at both ends
            this._head = 0;                  // clones before the first real slide

            this.valid = true;
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

        get maxIndex() {
            return Math.max(0, this.slides.length - this.slidesPerView);
        }

        // Real-slide index of a full-list position — a rest on a clone maps to its
        // twin. One source for every site that must agree on it: where the loop jumps,
        // which bullet reads active, which deck card opens, where destroy() lands the
        // row. _goToFull needs it for a target index, not the current one, hence the
        // parameter.
        _realOf(index) {
            const n = this._real;
            return (((index - this._head) % n) + n) % n;
        }

        get _realIndex() { return this._realOf(this.currentIndex); }

        // Pages at the current slidesPerView. Decides nav visibility in
        // updateSlidesPerView and pagination + button visibility in setupPagination —
        // two halves of the same chrome, so they read one value.
        get _pageCount() {
            return Math.ceil(this._real / this.slidesPerView);
        }

        // Where page p starts, in real slides. The last page end-aligns so it stays
        // inside the deck; a loop has no end, so its pages run on into the clones.
        _pageStart(p) {
            const start = p * this.slidesPerView;
            return this._loop ? start : Math.min(start, this._real - this.slidesPerView);
        }

        init() {
            this.abortController = new AbortController();
            this.container.style.setProperty('--total', this._real);
            if (this._ownsPeek && this._peek) this.container.style.setProperty('--peek', `${this._peek}px`);
            this.updateSlidesPerView();

            // Single-slide swipers can never navigate; bail before nav/observer/keyboard
            // setup. They still join the shared breakpoint subscription — --slides
            // must keep tracking --max/mid/min-slides or the lone card holds its
            // init-time width across resizes.
            if (this.slides.length === 1) {
                _resizeSwipers.add(this);
                ensureSharedResize();
                this.container.setAttribute('data-nds-swiper-initialized', 'true');
                return;
            }

            // Clones first: the lazy-load and hero-reveal gates below walk this.slides.
            if (this._loop) this.setupLoop();

            this.setupNavigation();
            this.setupScrollSync();
            this.setupKeyboard();
            this.setupResize();

            // Gate observers — only register when they have work to do.
            const lazySlides = this.slides.filter(s =>
                s.querySelector('img[data-src], img[data-srcset]')
            );
            if (lazySlides.length) this.setupLazyLoading(lazySlides);
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
            // Real slide 0, stated: a looping deck has not landed yet, so the bare
            // call would bail (updateDeck) and leave the cards unstamped the moment
            // the init attribute drops the CSS fallback that had been placing them.
            this.updateDeck(0);
            this.lastIndex = this.currentIndex;

            this.container.setAttribute('data-nds-swiper-initialized', 'true');
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
                    // One reveal, two scroll contexts — a later addition to it must
                    // reach both directions, not just the RTL default.
                    const reveal = () => this.slides.forEach(s => s.removeAttribute('hidden'));
                    if (NDS.isRTL) {
                        // WebKit RTL: keep scroll-behavior: auto through the entire
                        // update so Safari/WebKit doesn't jump scroll on reflow.
                        this._instant(() => {
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
                    // maxIndex on the first scroll.
                    this._measuredStep = null;
                    // The loop's start position was measured off hidden clones too.
                    // This IS the landing when the reveal beats the resize callback to
                    // it, so clear the flag here as well — left set, it suppresses every
                    // scroll-driven deck update for the life of the swiper.
                    if (this._loop) {
                        this._loopPending = false;
                        this._jumpTo(this._head);
                        this.detectCurrentSlide();
                        this.updateDeck();
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

            const pageCount = this._pageCount;

            // Nav visibility rides the served [hidden] FOUC guard, re-decided on
            // every breakpoint pass. Inline display can't do this job — the
            // universal [hidden]{display:none!important} rule outranks it, which
            // left the nav stuck hidden when init landed on a one-page breakpoint.
            if (this.navigation) this.navigation.toggleAttribute('hidden', pageCount <= 1);

            // CSS adds the gap to --peek; this flag only says whether there is a
            // next page to peek at.
            this.container.toggleAttribute('data-swiper-peek', this._peek > 0 && pageCount > 1);

            if (this.pagination) this.setupPagination();
        }

        setupResize() {
            // Breakpoint-driven slidesPerView: shared via ensureSharedResize; instance
            // is invoked through _resizeSwipers membership.
            _resizeSwipers.add(this);
            ensureSharedResize();

            // Pixel-geometry caches (_measuredStep, _cachedGap) go stale on ANY size
            // change, not just breakpoint crosses: a same-band window resize, or the
            // hero settling to full width after first paint, both change slide spacing
            // without firing a matchMedia change. A stale step makes detectCurrentSlide's
            // round(scrollPos/step) overcount, which corrupts currentIndex → wrong nav
            // disable state, wrong active bullet, and no-op prev/next. Invalidate + re-sync
            // on every wrapper resize. Shared ResizeObserver via NDS.onElementResize; its
            // initial callback also covers the cold-init measurement (no forced layout at init).
            this._offResize = NDS.onElementResize(this.wrapper, () => {
                this._cachedGap = null;
                this._measuredStep = null;
                // Loop: land on the first real slide here, not at init — this initial
                // callback runs after layout and before the first paint after init, so
                // the head clones never show and init stays free of layout reads.
                // detectCurrentSlide first, because it is what measures the step, and
                // the landing needs that measurement: _jumpTo takes its offset from
                // offsetLeft, so a callback that fires before the slides have width
                // computes a zero offset, scrolls nowhere, and still spends the
                // landing. The deck then fans off the unlanded scroll position and
                // visibly re-fans when a later pass corrects it. Wait for a real step.
                this.detectCurrentSlide();
                if (this._loopPending && this._measuredStep) {
                    this._loopPending = false;
                    this._jumpTo(this._head);
                    this.detectCurrentSlide();
                }
                this.updatePagination();
                this.updateButtons();
                this.updateBoundaryClasses();
                this.updateDeck();
                this.lastIndex = this.currentIndex;
            });
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
        _attachActivation(btn, action) {
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
        }

        // ==============================================
        // NAVIGATION
        // ==============================================

        setupNavigation() {
            if (this.prevBtn) this._attachActivation(this.prevBtn, () => this.prev());
            if (this.nextBtn) this._attachActivation(this.nextBtn, () => this.next());
            this.setupDeck();
        }

        // Deck: below the desktop breakpoint the cards follow the pointer (--drag
        // on the deck, a translate in CSS), then release decides — past the threshold
        // it pages, forward being towards the inline end so RTL mirrors, else it
        // springs back. The desktop layout never drags (it has the arrows). A tap or
        // click on a card goes to its slide in both.
        setupDeck() {
            if (!this.deck) return;
            const { signal } = this.abortController;
            const deck = this.deck;
            let x0 = null, dx = 0, pressed = -1;
            deck.addEventListener('pointerdown', (e) => {
                if (e.pointerType === 'mouse' && e.button !== 0) return;
                x0 = e.clientX; dx = 0;
                // Read the card now: once captured, the release event targets the deck.
                pressed = this.cards.indexOf(e.target.closest('.nds-swiper-card'));
                try { deck.setPointerCapture(e.pointerId); } catch (err) { /* synthetic pointer: no capture */ }
            }, { signal });
            deck.addEventListener('pointermove', (e) => {
                // The fan layout has the arrows; only the stacked layout drags. Read
                // live, not at init, so toggling .nds-stacked needs no reinit.
                if (x0 === null || (_mqDesktop.matches && !this.container.classList.contains('nds-stacked'))) return;
                dx = e.clientX - x0;
                if (Math.abs(dx) > 4) {
                    deck.classList.add('nds-dragging');
                    deck.style.setProperty('--drag', `${dx}px`);
                }
            }, { signal });
            const release = (e) => {
                if (x0 === null) return;
                x0 = null;
                deck.classList.remove('nds-dragging');
                deck.style.removeProperty('--drag');
                if (Math.abs(dx) >= 40) { (NDS.isRTL ? dx > 0 : dx < 0) ? this.next() : this.prev(); return; }
                if (e.type === 'pointerup' && pressed >= 0) this.goTo(pressed);
            };
            deck.addEventListener('pointerup', release, { signal });
            deck.addEventListener('pointercancel', release, { signal });
            this.cards.forEach((card, i) => card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.goTo(i); }
            }, { signal }));
        }

        // Each card learns its distance from the open one: --rel counts forward and
        // wraps (the desktop fan), --srel is the shortest signed way (the mobile peek
        // picks the two neighbours). Both inline, so CSS positions on them.
        // `real` lets a move update the deck at once, before the track's smooth
        // scroll reports the new index — otherwise the cards spring back to the
        // old spot for a beat and then retarget.
        updateDeck(real) {
            const n = this.cards.length;
            if (!n) return;
            // A looping deck has not landed on its first real slide yet, so the track
            // still sits where the clones start. Fanning off that puts a different
            // card at the front, and the cards visibly slide when the landing
            // corrects it. Init's own stamps hold until then. An explicit `real`
            // is a caller that knows the index, so it still passes.
            if (this._loopPending && real === undefined) return;
            const active = real === undefined ? this._realIndex : real;
            this.cards.forEach((card, k) => {
                const rel = (k - active + n) % n;
                const srel = rel > n / 2 ? rel - n : rel;
                card.style.setProperty('--rel', rel);
                card.style.setProperty('--srel', srel);
                if (rel === 0) NDS.Status.set(card, 'active');
                else if (Math.abs(srel) === 1) NDS.Status.set(card, 'near');
                else NDS.Status.clear(card);
                NDS.aria.current(card, rel === 0 ? 'true' : null);
            });
        }

        // Always a full view. A loop whose count is not a multiple of the slides
        // per view drifts off the page grid by the remainder on every wrap; the
        // bullets absorb that (updatePagination), the movement never does.
        prev() { this._goToFull(this.currentIndex - this.slidesPerView); }
        next() { this._goToFull(this.currentIndex + this.slidesPerView); }

        // Public: the index counts real slides. Internally the row may carry clones
        // at both ends, so every scroll target is a full-list index.
        goTo(index) {
            this._goToFull(this._full(index));
        }

        // Full-list index of a real slide, in the cycle the row sits in NOW. Between
        // a rapid click and the settle jump the row rests on a clone, and _head +
        // real would then animate a whole cycle the wrong way to reach the twin.
        _full(real) {
            return this.currentIndex + (real - this._realIndex);
        }

        // scrollTo/scrollBy's 'auto' keyword — and passing no keyword at all — defers
        // to the element's computed scroll-behavior, which _swiper.scss sets to smooth
        // on the wrapper. Toggling it inline is the only way to force a real instant
        // scroll, and that holds on every engine, not just old Safari. Every instant
        // path here routes through this.
        _instant(scroll) {
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
            if (this._loop) {
                // Keep the animation inside the clone budget and off the end-aligned
                // last page (a loop has no end, so that alignment would shift at the
                // settle jump): a target past the start or on the last page first
                // shifts one real cycle the other way, silently.
                const n = this._real;
                if (index < 0) { if (this._shiftCycle(1)) { this.currentIndex += n; index += n; } }
                else if (index >= this.maxIndex) { if (this._shiftCycle(-1)) { this.currentIndex -= n; index -= n; } }
            }
            const clampedIndex = Math.max(0, Math.min(index, this.maxIndex));
            // The deck aims at the target at once, ahead of the track's scroll.
            if (this.cards.length) this.updateDeck(this._realOf(clampedIndex));

            const targetSlide = this.slides[clampedIndex];
            if (!targetSlide) return;

            // offsetLeft difference from first slide — static DOM property,
            // unaffected by scroll animation, accounts for wrapper padding.
            // Last page: end-align instead — the start-aligned offset overshoots
            // max-scroll by the peek reserve (no next page left to peek), and
            // mandatory snap re-pulls the row short, clipping the last slide.
            const offset = clampedIndex >= this.maxIndex
                ? this.wrapper.scrollWidth - this.wrapper.clientWidth
                : Math.abs(targetSlide.offsetLeft - this.slides[0].offsetLeft);

            const left = NDS.isRTL ? -offset : offset;
            // No keyword: the wrapper's own scroll-behavior decides (smooth by
            // default), so a consumer can set it to auto and get an instant switch.
            if (instant) this._instant(() => this.wrapper.scrollTo({ left }));
            else this.wrapper.scrollTo({ left });
        }

        // ==============================================
        // LOOP — clones at both ends, silent jump at rest
        // ==============================================

        setupLoop() {
            // Two pages plus one clone on each side: a fling can pass two pages
            // before it rests, and the rest is where the jump corrects. Fewer clones
            // than that and a fling hits the row's real edge.
            // ponytail: a fling of three or more pages still hits the edge; grow the
            // budget (or reposition mid-scroll) if a real deck shows it.
            const n = this._real;
            const count = Math.min(n, 2 * Math.max(this._slidesMax, this._slidesMid, this._slidesMin) + 1);
            const clone = (i) => {
                const c = this.slides[i].cloneNode(true);
                c.classList.add('nds-swiper-clone');
                c.setAttribute('data-swiper-clone', i);   // its real twin, for consumers that sync content
                c.setAttribute('aria-hidden', 'true');
                // aria-hidden keeps the duplicate out of the a11y tree, but inert also
                // killed clicks — and a row showing more than one slide rests with
                // clones on screen, so those were dead. Drop them from the tab order
                // instead: pointer works, Tab still lands on the real twin only.
                c.querySelectorAll(NDS.focusableSel).forEach(el => el.setAttribute('tabindex', '-1'));
                // A duplicated id would steal anchors and label-for from the real slide.
                c.removeAttribute('id');
                c.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
                return c;
            };
            const head = [], tail = [];
            for (let j = 0; j < count; j++) {
                head.push(clone(n - count + j));
                tail.push(clone(j));
            }
            this.slides[0].before(...head);
            this.slides[n - 1].after(...tail);
            this._head = count;
            this.slides = [...head, ...this.slides, ...tail];
            this.currentIndex = count;
            this._loopPending = true; // the ResizeObserver's first callback lands the jump

            // A rest inside a clone zone jumps to the real twin — same content, so
            // nothing visibly moves. scrollend where it exists; elsewhere a rest is
            // 150 ms without a scroll event.
            const { signal } = this.abortController;
            const settle = () => this._loopSettle();
            if ('onscrollend' in this.wrapper) this.wrapper.addEventListener('scrollend', settle, { signal });
            else this.wrapper.addEventListener('scroll', NDS.debounce(settle, 150), { passive: true, signal });
        }

        _loopSettle() {
            this.detectCurrentSlide();
            const n = this._real, c = this._head, i = this.currentIndex;
            if (i >= c && i < c + n) return;
            this._jumpTo(c + this._realIndex);
            this.detectCurrentSlide();
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
            const n = this._real;
            const step = this._measuredStep || (this.slides[0].offsetWidth + this.getGap()) || 1;
            const landing = Math.abs(this.wrapper.scrollLeft) / step + dir * n;
            if (landing < 0 || landing > this.maxIndex) return false;
            const cycle = Math.abs(this.slides[this._head + n].offsetLeft - this.slides[this._head].offsetLeft);
            this._instant(() => { this.wrapper.scrollLeft += NDS.isRTL ? -dir * cycle : dir * cycle; });
            return true;
        }

        // Instant reposition to a full-list index.
        _jumpTo(index) {
            const target = this.slides[index];
            if (!target) return;
            const offset = Math.abs(target.offsetLeft - this.slides[0].offsetLeft);
            this._instant(() => { this.wrapper.scrollLeft = NDS.isRTL ? -offset : offset; });
        }

        // ==============================================
        // SCROLL SYNC
        // ==============================================

        setupScrollSync() {
            this.wrapper.addEventListener('scroll', NDS.rafThrottle(() => {
                this.detectCurrentSlide();
                this.updateState();
            }), { passive: true, signal: this.abortController.signal });
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
                this.maxIndex
            ));
        }

        // ==============================================
        // PAGINATION
        // ==============================================

        setupPagination() {
            if (!this.pagination) return;

            const pageCount = this._pageCount;

            const hidden = pageCount <= 1;
            const display = hidden ? 'none' : '';
            this.pagination.style.display = display;
            this.pagination.innerHTML = '';
            if (this.prevBtn) this.prevBtn.style.display = display;
            if (this.nextBtn) this.nextBtn.style.display = display;
            this.wrapper.style.overflow = hidden ? 'unset' : '';
            if (hidden) return;

            // Delegated activation — one listener on the container, attached once.
            // Bullets are rebuilt on every breakpoint change (setupPagination re-runs
            // via updateSlidesPerView); binding per-bullet would stack listeners on the
            // instance signal until destroy.
            if (!this._paginationBound) {
                this._paginationBound = true;
                this._attachActivation(this.pagination, (e) => {
                    const bullet = e.target.closest('.nds-bullet');
                    if (bullet && this.pagination.contains(bullet)) {
                        this.goTo(this._pageStart(Number(bullet.dataset.page)));
                    }
                });
            }

            for (let i = 0; i < pageCount; i++) {
                const bullet = document.createElement('button');
                bullet.className = 'nds-bullet';
                bullet.type = 'button';
                bullet.dataset.page = i;
                NDS.aria.label(bullet, `Go to slide ${i + 1}`);
                this.pagination.appendChild(bullet);
            }

            this.updatePagination();
        }

        updatePagination() {
            if (!this.pagination) return;

            const bullets = this.pagination.querySelectorAll('.nds-bullet');
            const current = this._realIndex;

            // The page whose start is at or before the lead slide. A drifted loop
            // then skips at most the last bullet on a wrap; the nearest start would
            // also leap two bullets mid-cycle.
            let currentPage = 0;
            for (let i = 1; i < bullets.length; i++) {
                if (this._pageStart(i) <= current) currentPage = i;
            }

            bullets.forEach((bullet, i) => {
                const isActive = i === currentPage;
                if (isActive) NDS.Status.set(bullet, 'active');
                else NDS.Status.clear(bullet);
                NDS.aria.current(bullet, isActive ? 'true' : null);
            });
        }

        // ==============================================
        // KEYBOARD
        // ==============================================

        setupKeyboard() {
            // Only own the tabindex we add — destroy() must leave an author's alone.
            this._ownsTabindex = !this.container.hasAttribute('tabindex');
            if (this._ownsTabindex) this.container.setAttribute('tabindex', '0');

            _activeSwipers.add(this);
            ensureSharedKeydown();
        }

        // The nav buttons listen for pointerdown, not click, so an arrow key has to
        // call the move itself; the button's disabled state stays the boundary guard.
        _arrowMove(dir) {
            const btn = dir === 'next' ? this.nextBtn : this.prevBtn;
            if (btn && !btn.disabled) this[dir]();
        }

        _handleKeydown(e) {
            const rtl = NDS.isRTL;
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this._arrowMove(rtl ? 'next' : 'prev');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this._arrowMove(rtl ? 'prev' : 'next');
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goTo(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goTo(this._pageStart(this._pageCount - 1));
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
            this.updateDeck();
            this.container.dispatchEvent(new CustomEvent('nds:swiper:change', {
                bubbles: true, detail: { index: this._realIndex }
            }));
        }

        updateButtons() {
            if (this.prevBtn) this.prevBtn.disabled = !this._loop && this.currentIndex <= 0;
            if (this.nextBtn) this.nextBtn.disabled = !this._loop && this.currentIndex >= this.maxIndex;
        }

        updateBoundaryClasses() {
            const tokens = [];
            // A loop has no ends.
            if (!this._loop && this.currentIndex <= 0) tokens.push('at-start');
            if (!this._loop && this.currentIndex >= this.maxIndex) tokens.push('at-end');
            NDS.State.set(this.container, ...tokens);
        }

        // ==============================================
        // PUBLIC API
        // ==============================================

        slideTo(index, animate = true) {
            // Real index in, clamped to the last real page.
            index = Math.max(0, Math.min(index, this._real - this.slidesPerView));
            this._goToFull(this._full(index), !animate || NDS.prefersReducedMotion);
        }

        // ==============================================
        // CLEANUP
        // ==============================================

        // Instance becomes unusable after destroy(): this.abortController is nulled, so any
        // subsequent call to a setup method that reads `this.abortController.signal` will
        // throw. Re-initialize via `NDS.Swiper.create(el)` (constructs a fresh instance).
        destroy() {
            this.container.removeAttribute('data-nds-swiper-initialized');
            if (this._ownsTabindex) this.container.removeAttribute('tabindex');

            // Drop the clones and land on the real twin of the current slide.
            if (this._head) {
                const real = this._realIndex;
                this.slides = this.slides.filter(s => !s.classList.contains('nds-swiper-clone') || (s.remove(), false));
                this._head = 0;
                this._jumpTo(real);
            }

            // Reverse the state init/setupPagination wrote, so destroy() restores
            // the pre-init DOM for consumers that tear down without re-creating.
            this.container.removeAttribute('data-swiper-peek');
            this.container.removeAttribute('data-swiper-preset');
            this.container.removeAttribute('data-swiper-single');
            NDS.State.clear(this.container); // at-start/at-end are a documented consumer hook
            ['--total', '--slides'].forEach(p => this.container.style.removeProperty(p));
            if (this._ownsPeek) this.container.style.removeProperty('--peek');
            if (this.wrapper) this.wrapper.style.removeProperty('overflow');
            if (this.pagination) { this.pagination.style.removeProperty('display'); this.pagination.innerHTML = ''; }
            if (this.navigation) this.navigation.toggleAttribute('hidden', this._navHadHidden);
            if (this.prevBtn) this.prevBtn.style.removeProperty('display');
            if (this.nextBtn) this.nextBtn.style.removeProperty('display');
            this.cards.forEach(card => {
                card.style.removeProperty('--rel');
                card.style.removeProperty('--srel');
                NDS.Status.clear(card);
                NDS.aria.current(card, null);
            });

            _activeSwipers.delete(this);
            _resizeSwipers.delete(this);
            if (this._offResize) { this._offResize(); this._offResize = null; }
            if (this._offVisibility) { this._offVisibility(); this._offVisibility = null; }
            if (this._offLazyLoad) { this._offLazyLoad.forEach(off => off()); this._offLazyLoad = null; }
            if (this.abortController) { this.abortController.abort(); this.abortController = null; }

            delete this.container._ndsSwiper;
        }
    }

    // ==============================================
    // GLOBAL API
    // ==============================================

    function initializeComponents() {
        // Defer the page-wide srcset-space normalization to idle: it only rewrites
        // malformed srcsets (unencoded spaces), so it never needs to block the eager
        // init task, and the sweep is unbounded (every srcset-bearing node on the page).
        // Covers both img[srcset] and <picture> source[srcset] — the lazy path handles
        // the data-srcset variants, this catches eager (non-lazy) srcsets.
        NDS.onIdle(() => {
            document.querySelectorAll('img[srcset], source[srcset]').forEach(el => {
                const srcset = el.getAttribute('srcset');
                if (srcset && srcset.includes(' ') && !srcset.includes('%20')) {
                    const fixed = fixSrcsetSpaces(srcset);
                    if (fixed !== srcset) el.setAttribute('srcset', fixed);
                }
            });
        });

        const swipers = document.querySelectorAll('.nds-swiper');
        swipers.forEach(swiper => {
            if (swiper.closest('code, .code-example')) return;
            if (swiper.hasAttribute('data-nds-swiper-initialized')) return;
            const instance = new NDSSwiper(swiper);
            // Expando only on successful construction — retries must not inherit
            // a half-built instance.
            if (instance.valid) swiper._ndsSwiper = instance;
        });
    }

    NDS.Swiper = {
        init: initializeComponents,
        reinit: initializeComponents,
        create: (element) => {
            const instance = new NDSSwiper(element);
            if (instance.valid) element._ndsSwiper = instance;
            return instance;
        },
        // NDS.Init.destroy's second shape. The expando is underscore-prefixed and
        // documented as such, so the walk that scans for `nds*` backrefs cannot see it —
        // the registry opts in with destroyEach and hands each .nds-swiper here.
        destroy: (element) => {
            const instance = element?._ndsSwiper;
            if (!instance) return;
            instance.destroy();
        }
    };

})();
