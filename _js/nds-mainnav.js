// ==============================================
// SPLIT COMPONENT — EAGER SHELL (ships in nds-main.min.js)
// ==============================================
// This file gates nothing on its own, but Mainnav inits in the deferred pass and
// owns first paint of the nav chrome, so the shell keeps ONLY the init-time work:
// DOM refs, mode/body-class sync, PAB placement, toggler visibility, the eager
// overflow/show-more measurement + drawer reveal, and all event wiring. The
// dropdown/navbar animation + interaction cluster (only needed once the user
// actually opens something) lives in the lazy half `nds-mainnav__delegated.js`
// (rides nds-delegated.min.js, loads AFTER the reveal) and grafts on via
// NDS.Mainnav._installBehavior(factory) — Mainnav is an IIFE singleton with no
// prototype, so the shell passes a `ctx` object holding every binding the lazy
// code closes over. Deferred entry-points here are TRAPS: openers queue the call,
// NDS.loadSplit('Mainnav'), and replay on attach; guarded-direct stubs early-return
// when nothing is open (the half is always installed by the time anything is open).
// Before moving code across this boundary, read CLAUDE.md →
// "JS Bundles & Shrinking the Critical Bundle".

// NDS Navigation Controller
(() => {
    'use strict';

    // Fallback values used only if corresponding CSS custom properties are undefined at runtime.
    // These should match the CSS defaults; any mismatch indicates a token-source drift.
    const MINIMAL_NAV_BP_FALLBACK = 960;

    // ==============================================
    // DOM REFERENCES
    // ==============================================
    // Mainnav is a singleton with a stable markup tree, so all node references
    // are cached eagerly at module load (script runs after DOMContentLoaded via
    // the loader). Previously every reference re-ran querySelector — `DOM.collapse`
    // alone is touched ~25× across this file.
    // The two dynamic refs (`minimal`, created on first mobile pass; reset to null
    // when removed) are kept in sync by managePABPlacement().
    const _nav = document.querySelector('.nds-main-nav');
    const DOM = {
        nav: _nav,
        collapse: _nav?.querySelector('#ndsNavCollapse') || null,
        collapseContent: _nav?.querySelector('.nds-collapse-content') || null,
        container: _nav?.querySelector('.nds-nav-container') || null,
        primary: _nav?.querySelector('.nds-nav-primary') || null,
        secondary: _nav?.querySelector('.nds-nav-actions') || null,
        brand: _nav?.querySelector('.nds-brand') || null,
        toggler: _nav?.querySelector('.nds-mainNav-toggler') || null,
        minimal: _nav?.querySelector('.nds-nav-minimal') || null,
        showMore: null,
    };
    DOM.showMore = DOM.collapseContent?.querySelector('.nds-show-more') || null;

    // State helpers — delegated to NDS.State (nds-core.js)
    const { add: addState, remove: removeState, has: hasState } = NDS.State;

    // Minimal-mode breakpoint. Reads the canonical `--nds-minimal-nav-bp`
    // CSS var once at module load, then drives mode detection via
    // matchMedia so the flip fires as an event rather than being polled
    // inside scheduleUpdate. Consumers that override `--nds-minimal-nav-bp`
    // still get honored (the override is what we read here). The
    // matchMedia change listener is attached at the bottom of the file
    // alongside the reduced-motion listener.
    const _minimalBp = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nds-minimal-nav-bp')) || MINIMAL_NAV_BP_FALLBACK;
    const _mqMinimal = window.matchMedia(`(max-width: ${_minimalBp}px)`);

    // ==============================================
    // STATE MANAGEMENT
    // ==============================================
    const state = {
        isMouseOverDropdown: false,
        isAnimating: false,
        pendingAction: null,
        pendingOverflowCheck: null,
        pendingUpdate: null,
        // Flipped true by the navChanged DOM-mutation debounce; consumed in
        // scheduleUpdate to gate the toggler-visibility recompute. Reset there.
        _navChanged: false,

        get isMinimal() { return _mqMinimal.matches; },

        _reducedMotion: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false,
        get reducedMotion() { return this._reducedMotion; },
        set reducedMotion(val) { this._reducedMotion = val; },

        _durations: new WeakMap(),
        getDuration(el) {
            if (!el || this.reducedMotion) return 0;
            let cached = this._durations.get(el);
            if (cached === undefined) {
                cached = parseFloat(getComputedStyle(el).transitionDuration) || 0;
                this._durations.set(el, cached);
            }
            return cached > 0 ? NDS.transitionSpeed() : 0;
        },
    };

    // Cache of getComputedStyle(DOM.primary).maxHeight (parsed). The CSS
    // max-height uses `svh` units which vary with viewport height, so the
    // cache is reset wherever a resize may have invalidated it (mode flip,
    // orientationchange, primary RO callback, window resize bus).
    let _primaryMaxHeightCached = null;
    function getPrimaryMaxHeight() {
        if (_primaryMaxHeightCached === null) {
            _primaryMaxHeightCached = parseFloat(getComputedStyle(DOM.primary).maxHeight);
        }
        return _primaryMaxHeightCached;
    }

    // ==============================================
    // UTILITY HELPERS
    // ==============================================
    const afterDelay = (duration, callback) => {
        duration === 0 ? callback() : setTimeout(callback, duration);
    };

    // Tracked delayed action for toggle functions — prevents stale callbacks.
    // Boxed in a holder so the lazy half (dropdown.toggle's onComplete) can read
    // the pending state directly via ctx.toggleTimer.value while the eager
    // scheduleToggleAction/cancelToggleAction own the write side.
    const toggleTimer = { value: null };
    const scheduleToggleAction = (duration, callback) => {
        cancelToggleAction();
        duration === 0 ? callback() : (toggleTimer.value = setTimeout(() => { toggleTimer.value = null; callback(); }, duration));
    };
    const cancelToggleAction = () => {
        if (toggleTimer.value) { clearTimeout(toggleTimer.value); toggleTimer.value = null; }
    };

    // Resolve the animation target for a dropdown element.
    // The descendant lookups (menu, content) and ancestor lookups (isInMinimal,
    // isInPrimary) don't change across normal toggle flow — same dropdown
    // returns the same nodes. Cache via WeakMap. Invalidated by
    // invalidateDdCache() whenever managePABPlacement moves a PAB li between
    // .nds-nav-primary/.nds-nav-actions and .nds-nav-minimal (which changes
    // the ancestor chain).
    // needsHeight + animTarget still derive from state.isMinimal, which can
    // change at runtime, so those are computed fresh on every call.
    let _ddCache = new WeakMap();
    const invalidateDdCache = () => { _ddCache = new WeakMap(); };

    const getDropdownAnimTarget = (dd) => {
        let c = _ddCache.get(dd);
        if (!c) {
            const menu = dd.querySelector('.nds-dropdown-menu');
            const content = menu?.querySelector('.nds-dropdown-content');
            const isInMinimal = dd.closest('.nds-nav-minimal');
            const isInPrimary = dd.closest('.nds-nav-primary');
            c = { menu, content, isInMinimal, isInPrimary };
            _ddCache.set(dd, c);
        }
        const needsHeight = state.isMinimal && c.isInPrimary;
        const animTarget = c.isInMinimal ? (c.content || c.menu) : (needsHeight ? c.menu : (c.content || c.menu));
        return { ...c, needsHeight, animTarget };
    };

    // Nav backdrop ownership — prevents flicker during navbar↔dropdown transitions
    let _navBackdropOwner = null;

    const showNavBackdrop = (owner, onClick) => {
        // Soft dependency — nav skips backdrop dimming if NDS.Backdrop isn't bundled.
        if (!NDS.Backdrop) return;
        if (_navBackdropOwner === owner) return;
        const replacing = _navBackdropOwner !== null;
        _navBackdropOwner = owner;
        NDS.Backdrop.show({ zIndex: 999, onClick });
        if (replacing) NDS.Backdrop.hide();
    };

    const hideNavBackdrop = (owner) => {
        // Soft dependency — nav skips backdrop dimming if NDS.Backdrop isn't bundled.
        if (!NDS.Backdrop || _navBackdropOwner !== owner) return;
        _navBackdropOwner = null;
        NDS.Backdrop.hide();
    };

    // ==============================================
    // DROPDOWN OPEN SET
    // ==============================================
    // Set of currently-open dropdown elements (in any of open/opening/closing
    // state). Replaces ~10 `querySelectorAll('.nds-dropdown[data-state~="open"]')`
    // scans across this file with O(1) Set membership + O(open-count) iteration.
    // Maintained inside dropdown.toggle (lazy half) when state actually flips.
    // Lives in the shell (passed via ctx) because eager code reads it too —
    // scheduleUpdate's mode-flip cleanup and the same-page anchor handler both
    // probe `.size` / iterate it as the "is anything open" signal. The open-marker
    // equivalent of membership is `.nds-dropdown[data-state~="open"]`.
    const _openDropdowns = new Set();

    // ==============================================
    // OVERFLOW DETECTION
    // ==============================================
    // Stays eager: the overflow affordance (has-more edge-mask + sticky show-more
    // button) is applied on the first init pass and the collapse drawer is revealed
    // here (removeCollapseHidden on the first settled check) — deferring it would
    // pop the affordance / hold the drawer hidden post-reveal (CLS).
    const overflow = {
        schedule(priority = 'normal', delay = 50) {
            if (state.pendingOverflowCheck) clearTimeout(state.pendingOverflowCheck);

            if (priority === 'immediate') {
                state.pendingOverflowCheck = null;
                requestAnimationFrame(() => this.check());
                return;
            }

            const ms = priority === 'high' ? 10 : priority === 'low' ? 100 : delay;
            state.pendingOverflowCheck = setTimeout(() => {
                state.pendingOverflowCheck = null;
                this.check();
            }, state.reducedMotion ? 0 : ms);
        },

        check() {
            if (!DOM.primary) return;

            if (state.isMinimal && !hasState(DOM.collapse, 'open')) {
                removeState(DOM.primary, 'has-more', 'at-start', 'at-end');
                return;
            }

            const wasOverflowing = hasState(DOM.primary, 'has-more');
            let hasOverflow = false;

            if (state.isMinimal) {
                const maxH = getPrimaryMaxHeight();
                const scrollHeight = DOM.primary.scrollHeight;
                if (scrollHeight === 0) { this.schedule('low', 50); return; }
                if (isFinite(maxH) && maxH > 0) hasOverflow = scrollHeight > maxH + 2;
            } else {
                const { scrollWidth, clientWidth } = DOM.primary;
                if (scrollWidth === 0 && clientWidth === 0) { this.schedule('low', 50); return; }
                hasOverflow = scrollWidth > clientWidth;
            }

            // Reveal the collapse once the overflow calc has settled for this
            // pass — first check only.
            const revealOnce = () => {
                if (this._initialCheckDone) return;
                this._initialCheckDone = true;
                removeCollapseHidden();
            };

            if (hasOverflow === wasOverflowing) {
                // Overflow state stable — the nav layout is already final.
                revealOnce();
                return;
            }

            if (hasOverflow) addState(DOM.primary, 'has-more'); else removeState(DOM.primary, 'has-more');

            // CSS flex (`.nds-nav-primary { flex: 1 1 0; min-width: 0 }`) re-lays
            // out automatically when the show-more sibling flips between
            // display:none and display:flex on the has-more state change above.
            // No JS width recompute needed here.
            revealOnce();

            if (!hasOverflow) {
                removeState(DOM.primary, 'at-start', 'at-end');
            } else {
                requestAnimationFrame(() => this.checkEnd());
            }
        },

        checkEnd() {
            if (!hasState(DOM.primary, 'has-more')) return;

            let atStart, atEnd;
            if (state.isMinimal) {
                const { scrollTop, scrollHeight, clientHeight } = DOM.primary;
                atStart = scrollTop <= 1;
                atEnd = scrollTop + clientHeight >= scrollHeight - 1;
            } else {
                const { scrollLeft, scrollWidth, clientWidth } = DOM.primary;
                const max = scrollWidth - clientWidth;
                atStart = Math.abs(scrollLeft) <= 2;
                atEnd = max <= 1 || Math.abs(scrollLeft) >= max - 2;
            }
            if (atStart) addState(DOM.primary, 'at-start'); else removeState(DOM.primary, 'at-start');
            if (atEnd) addState(DOM.primary, 'at-end'); else removeState(DOM.primary, 'at-end');
        }
    };

    // ==============================================
    // LAYOUT UPDATES
    // ==============================================
    function removeCollapseHidden() {
        DOM.collapse?.removeAttribute('hidden');
    }

    function updateBodyClass() {
        const should = state.isMinimal;
        const isBodyMin = document.body.classList.contains('nds-minimal');
        const wantsHidden = !should;
        // Layouts render <body> without `nds-minimal` (desktop-first default;
        // .nds-nav-minimal is gated by [hidden] in markup so no FOUC). On
        // init the body class state can already match `should` while
        // .nds-nav-minimal[hidden] hasn't been toggled yet. Compare both
        // states so the first sync still fires when only the hidden attr
        // is out of step.
        const isHidden = DOM.minimal ? DOM.minimal.hasAttribute('hidden') : wantsHidden;
        if (should !== isBodyMin || wantsHidden !== isHidden) {
            document.body.classList.toggle('nds-minimal', should);
            if (DOM.minimal) DOM.minimal.toggleAttribute('hidden', wantsHidden);
            _primaryMaxHeightCached = null;
            managePABPlacement();
            return true;
        }
        return false;
    }

    function checkTogglerVisibility() {
        if (!DOM.toggler) return;

        // Pure markup check — no layout reads, no style recalcs.
        // The mainnav SCSS doesn't conditionally hide individual .nds-nav-item
        // via media queries; PABs are MOVED between containers by
        // managePABPlacement (not CSS-hidden), and only the .nds-label inside
        // .nds-nav-link is hidden in icon-only mode (the item itself stays).
        // So "are there items the toggler would expose" reduces to
        // "is the parent not [hidden] and does it have at least one real,
        // non-placeholder, non-show-more child".
        const hasItems = (parent) => {
            if (!parent || parent.hasAttribute('hidden')) return false;
            for (const child of parent.children) {
                if (child.classList.contains('nds-show-more')) continue;
                // PAB placeholder left behind when managePABPlacement moves a
                // PAB out to .nds-nav-minimal in mobile mode.
                if (child.hasAttribute('data-pab-ph')) continue;
                return true;
            }
            return false;
        };

        const show = hasItems(DOM.primary) || hasItems(DOM.secondary);
        DOM.toggler.style.display = show ? '' : 'none';
    }

    // ==============================================
    // PAB (Persistent Action Buttons) MANAGEMENT
    // ==============================================
    function managePABPlacement() {
        const pabs = document.querySelectorAll('.nds-nav-item.nds-PAB');
        if (!pabs.length) return;

        // PAB moves change the ancestor chain of any dropdown inside a PAB li;
        // invalidate the cached closest() results so getDropdownAnimTarget
        // re-resolves isInMinimal / isInPrimary after the move.
        invalidateDdCache();

        if (state.isMinimal) {
            pabs.forEach((item, i) => {
                if (!item.dataset.origPos) {
                    const ph = document.createElement('span');
                    ph.style.display = 'none';
                    ph.dataset.pabPh = i;
                    item.parentNode.insertBefore(ph, item);
                    item.dataset.origPos = i;
                }
            });

            let minNav = DOM.minimal;
            if (!minNav) {
                // Match the static include's tag so <li> PABs (and toggler)
                // remain valid descendants when the create-if-missing fallback
                // fires for consumers that omit the static <ul>.
                minNav = document.createElement('ul');
                minNav.className = 'nds-nav-minimal';
                DOM.nav?.insertBefore(minNav, DOM.nav.firstChild);
                DOM.minimal = minNav;
            }

            const cta = Array.from(pabs).filter(p => p.classList.contains('nds-CTA'));
            const rest = Array.from(pabs).filter(p => !p.classList.contains('nds-CTA'));
            [...rest].reverse().forEach(p => minNav.prepend(p));
            [...cta].reverse().forEach(p => minNav.prepend(p));
        } else {
            pabs.forEach(item => {
                const pos = item.dataset.origPos;
                if (pos !== undefined) {
                    const ph = document.querySelector(`[data-pab-ph="${pos}"]`);
                    if (ph) { ph.parentNode.insertBefore(item, ph); ph.remove(); }
                    delete item.dataset.origPos;
                }
            });
            const minNav = DOM.minimal;
            if (minNav && !minNav.children.length) {
                minNav.remove();
                DOM.minimal = null;
            }
        }
    }

    // ==============================================
    // SPLIT-BEHAVIOR DISPATCH (shell ↔ lazy half)
    // ==============================================
    // The dropdown/navbar animation + interaction cluster lives in the lazy half
    // (nds-mainnav__delegated.js). Until it attaches via _installBehavior, every
    // entry-point on `behavior` is a trap. Eager listeners/init call behavior.X —
    // never the raw functions (which the half owns).
    //
    // Two trap categories:
    //   1. Openers (queue + load + replay): toggleDropdown, toggleNavbar,
    //      setupInteractions, updatePositions. The stub records the call, kicks the
    //      bundle load, and the queue replays in order once the half installs.
    //   2. Guarded-direct (no queue): handleDocumentClick, closeAll, and
    //      scheduleUpdate's lazy tail. A dropdown/drawer can only OPEN via the
    //      trapped openers (which load the half first), and the open happens on
    //      replay AFTER the half attaches — so whenever anything is open, the half
    //      is already installed and behavior.X is the real fn. These stubs early-
    //      return when nothing is open (the half isn't needed yet).
    let _behaviorInstalled = false;
    let _pendingBehavior = null;

    // Returns a promise resolving with the real method's return value once the
    // half attaches and the queue replays. Replay is error-safe — a throw on
    // one entry rejects only that promise; siblings still run.
    const _deferBehavior = (name, args) => new Promise((resolve, reject) => {
        (_pendingBehavior || (_pendingBehavior = [])).push({ name, args, resolve, reject });
        NDS.loadSplit('Mainnav');
    });

    const _flushPendingBehavior = () => {
        const q = _pendingBehavior;
        if (!q) return;
        _pendingBehavior = null;
        for (const c of q) {
            try {
                c.resolve(behavior[c.name].apply(behavior, c.args));
            } catch (e) {
                console.warn(`[NDS] Mainnav split replay failed for ${c.name}:`, e);
                c.reject(e);
            }
        }
    };

    // True when a dropdown or the drawer is open — the guarded-direct stubs use
    // this to decide whether the half must already be installed (open ⟹ installed).
    const _anyOpen = () => _openDropdowns.size > 0 || hasState(DOM.collapse, 'open');

    const behavior = {
        // --- Openers: trap stubs queue + load + replay ---
        toggleDropdown(event) {
            // A dropdown trigger is an <a class="nds-nav-link">; the eager global
            // click listener does NOT preventDefault for it (only for the toggler),
            // so a first dropdown click before the half loads would navigate the
            // link's href. preventDefault here; the real toggleDropdown also does.
            event?.preventDefault?.();
            return _deferBehavior('toggleDropdown', [event]);
        },
        toggleNavbar() { return _deferBehavior('toggleNavbar', arguments); },
        setupInteractions() { return _deferBehavior('setupInteractions', arguments); },
        updatePositions() { return _deferBehavior('updatePositions', arguments); },

        // --- Guarded-direct: early-return when nothing is open ---
        handleDocumentClick(event) { if (_anyOpen()) return _deferBehavior('handleDocumentClick', [event]); },
        closeAll() { if (_anyOpen()) return _deferBehavior('closeAll', arguments); },
    };

    // ==============================================
    // EVENT HANDLERS
    // ==============================================
    function scheduleUpdate() {
        if (state.pendingUpdate) return;

        state.pendingUpdate = requestAnimationFrame(() => {
            state.pendingUpdate = null;

            const modeChanged = updateBodyClass();

            // Mode-transition cleanup only matters when something is open (close
            // dropdowns / collapse the drawer / drop a stale backdrop). When
            // nothing is open the half isn't needed — route through behavior, whose
            // guarded-direct stubs no-op until the half is installed. _navBackdropOwner
            // writes stay here (shell local).
            if (modeChanged && _anyOpen()) {
                behavior.closeAll();

                if (hasState(DOM.collapse, 'open')) {
                    _navBackdropOwner = 'navbar';
                    cancelToggleAction();
                    behavior.toggleNavbar();
                    return;
                }

                if (_navBackdropOwner) {
                    _navBackdropOwner = null;
                    cancelToggleAction();
                    if (NDS.Backdrop.isActive()) NDS.Backdrop.hide();
                }
            }

            if (hasState(DOM.collapse, 'open') && !hasState(DOM.collapse, 'closing')) {
                behavior.updatePositions();
            }

            // Toggler visibility is a pure markup check (no layout reads) that
            // depends on what's in primary/secondary, not on viewport width.
            // It only needs to re-run when the markup composition changes
            // (PAB placement / mode flip / DOM mutations), not on every resize.
            if (modeChanged || state._navChanged) {
                state._navChanged = false;
                checkTogglerVisibility();
            }
        });
    }

    // ==============================================
    // EVENT LISTENERS
    // ==============================================
    // All document/window/element listeners attached in setupEventListeners +
    // init() are scoped to this AbortController. Re-running init detaches the
    // prior batch atomically instead of stacking listeners on document/window
    // (the JSP-06 sub-shape (c) hazard). Pooled subscribers from NDS.onResize
    // and NDS.onElementResize return their own unsubscribe handles — tracked
    // separately because they can't use the AbortController signal.
    let _eventsAbortController = null;
    let _offResize = null;
    const _offElementResizes = [];
    let _initDone = false;

    function _bindGlobalEvents(signal) {
        window.addEventListener('orientationchange', () => {
            _primaryMaxHeightCached = null;
            setTimeout(scheduleUpdate, 150);
        }, { passive: true, signal });

        document.addEventListener('click', (e) => {
            if (e.target.closest('.nds-dropdown > .nds-nav-link')) behavior.toggleDropdown(e);
            if (e.target.closest('.nds-mainNav-toggler')) { e.preventDefault(); behavior.toggleNavbar(); }
        }, { signal });

        // When a modal opens, dismiss any open nav drawer/dropdowns so the
        // modal sits on a clean overlay. Closing the drawer cascades to
        // close any dropdowns inside it via navbar.toggle(). Nothing-open is the
        // common case — behavior's guarded-direct stubs no-op then; when something
        // IS open the half is already installed.
        document.addEventListener('nds-modal-opened', () => {
            if (hasState(DOM.collapse, 'open')) behavior.toggleNavbar();
            else behavior.closeAll();
        }, { signal });

        // Same-page anchor navigation — close nav and scroll to target
        DOM.nav?.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href*="#"]');
            if (!anchor || anchor.closest('.nds-dropdown')) return;

            const href = anchor.getAttribute('href');
            const hashIdx = href.indexOf('#');
            if (hashIdx === -1) return;

            const path = href.substring(0, hashIdx);
            const hash = href.substring(hashIdx + 1);
            if (!hash) return;

            const isSamePage = !path || path === location.pathname || path === location.pathname.replace(/\/$/, '');
            if (!isSamePage) return;

            const target = document.getElementById(hash);
            if (!target) return;

            e.preventDefault();

            const wasNavOpen = hasState(DOM.collapse, 'open');
            const openCount = _openDropdowns.size;

            // Both close paths route through behavior; if anything is open the half
            // is installed, otherwise these stubs no-op (nothing to close).
            if (wasNavOpen) behavior.toggleNavbar();
            else behavior.closeAll();

            const delay = wasNavOpen || openCount ? NDS.transitionSpeed() + 100 : 0;

            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', `#${hash}`);
            }, delay);
        }, { signal });

        DOM.collapse?.addEventListener('transitionend', (e) => {
            if (e.target === DOM.collapse && e.propertyName === 'height') scheduleUpdate();
        }, { signal });
    }

    function _bindMutationAndResizeObservers() {
        // mainnav is a singleton so the init-guard below prevents duplicate
        // registrations; that's why the unsubscribe handles NDS.onDOMAdd /
        // onDOMRemove now return aren't captured here.
        const navChanged = NDS.debounce(() => { state._navChanged = true; scheduleUpdate(); }, 100);
        NDS.onDOMAdd('.nds-nav-item, .nds-dropdown', navChanged);
        NDS.onDOMRemove('.nds-nav-item, .nds-dropdown', navChanged);

        // Steady-state resize: coalesce storms before the recompute.
        // CSS flex owns the width budget, but JS still owns the has-more
        // overflow flag — `.nds-nav-primary`'s clientWidth changes whenever
        // the container shrinks, and only `overflow.check()` flips has-more
        // (which un-hides `.nds-show-more` via the sibling selector at
        // _mainnav.scss:281). Without this call, resizing past the items'
        // intrinsic width leaves the nav scroll-only with no show-more.
        const onNavResize = NDS.debounce(() => {
            _primaryMaxHeightCached = null;
            scheduleUpdate();
            overflow.schedule('immediate');
        }, 100);

        // Routes primary's ResizeObserver entries to onNavResize when primary
        // changes size meaningfully (≥ 5px on either axis to drop spurious
        // sub-pixel deliveries). CSS flex sizing owns primary's width budget;
        // this handler only triggers downstream JS work (mode-flip check,
        // toggler visibility, overflow recheck) via scheduleUpdate.
        // Pre-JSA-18 this also observed DOM.nav (for updateNavMaxWidth's
        // navW input). With that gone, NDS.onResize fully covers window-level
        // size changes — observing just primary is enough.
        const navResizeHandler = (entry) => {
            const { width, height } = entry.contentRect;
            const last = entry.target._lastSize;
            if (last && Math.abs(width - last.w) <= 5 && Math.abs(height - last.h) <= 5) return;
            entry.target._lastSize = { w: width, h: height };
            onNavResize();
        };

        if (DOM.primary) {
            _offElementResizes.push(NDS.onElementResize(DOM.primary, navResizeHandler));
        }
    }

    function setupEventListeners() {
        // Abort prior subscriptions so a re-run doesn't stack listeners.
        if (_eventsAbortController) _eventsAbortController.abort();
        _eventsAbortController = new AbortController();
        const { signal } = _eventsAbortController;

        if (_offResize) { _offResize(); _offResize = null; }
        _offResize = NDS.onResize(() => { _primaryMaxHeightCached = null; scheduleUpdate(); });

        _offElementResizes.splice(0).forEach(off => off());

        _bindGlobalEvents(signal);
        _bindMutationAndResizeObservers();
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================
    function init() {
        // Entry guard: mainnav is a singleton; a second init() call would stack
        // pooled subscribers because the unsubscribe handles from
        // NDS.onDOMAdd / onDOMRemove aren't captured (see setupEventListeners).
        if (_initDone || !DOM.collapse) return;
        _initDone = true;

        // updateBodyClass calls managePABPlacement when the state transitions;
        // only run the explicit pass when it didn't, otherwise PAB placement
        // walks every .nds-PAB twice and re-prepends nodes already in place.
        const bodyClassChanged = updateBodyClass();

        // Strip [hidden] from #ndsNavCollapse so the universal
        // `[hidden]{display:none!important}` rule no longer blocks the
        // hamburger open transition. Markup ships with [hidden] to skip
        // layout pre-init; placed after updateBodyClass so the body's
        // minimal mode is set first, then the collapse becomes visible in
        // its correct breakpoint layout (display:none mobile /
        // display:flex desktop). Hamburger click can now animate freely.
        removeCollapseHidden();
        setupEventListeners();
        // handleDocumentClick shares the setupEventListeners AbortController so
        // both document-click listeners detach atomically on teardown. The
        // listener stays attached eagerly (so a first outside-click is caught),
        // but behavior.handleDocumentClick no-ops until something is open.
        document.addEventListener('click', (e) => behavior.handleDocumentClick(e), { signal: _eventsAbortController.signal });
        if (!bodyClassChanged) managePABPlacement();
        // Set toggler visibility now that PABs (if any) have been placed.
        // scheduleUpdate's only call site for this fires on width/mode/nav
        // changes — none of which trigger on first load — so without this,
        // a page that loads in minimal with an empty collapse panel (e.g.
        // primary empty, secondary all PABs) would leave the toggler
        // CSS-visible with nothing to expose.
        checkTogglerVisibility();

        if (hasState(DOM.collapse, 'open')) behavior.updatePositions();
        behavior.setupInteractions();

        // Initial overflow check on the next paint. The ResizeObserver
        // first-delivery path is debounced 100ms, which would otherwise
        // leave the nav unflagged for ~100ms after init at desktop widths
        // where items overflow (e.g. 1040px on a dense nav). Running it
        // here lets has-more (and the show-more button) settle in the
        // first rendered frame instead. Stays a direct eager call (overflow
        // is in the shell).
        overflow.schedule('immediate');
    }

    // Keep reduced-motion in sync
    try {
        window.matchMedia?.('(prefers-reduced-motion: reduce)')
            ?.addEventListener('change', (e) => { state.reducedMotion = !!e.matches; });
    } catch { }

    // Mode-flip listener: fires only when the viewport crosses
    // `--nds-minimal-nav-bp`. scheduleUpdate's updateBodyClass call then
    // sees the mismatch between body.nds-minimal and the new state.isMinimal
    // and runs the mode-transition logic (close dropdowns, drawer cleanup,
    // PAB placement). Replaces the old windowWidth-vs-minimalBp poll.
    _mqMinimal.addEventListener('change', () => {
        _primaryMaxHeightCached = null;
        scheduleUpdate();
    });

    // ==============================================
    // SPLIT INSTALL — graft the lazy behavior half
    // ==============================================
    // The ctx object holds every shell binding the lazy cluster closes over (the
    // half is a separate IIFE and can't see this module scope). _installBehavior
    // replaces the trap stubs on `behavior` with the real methods, then replays
    // any queued opener calls. Idempotent.
    const ctx = {
        DOM, state, addState, removeState, hasState,
        afterDelay, scheduleToggleAction, cancelToggleAction,
        getDropdownAnimTarget, showNavBackdrop, hideNavBackdrop,
        overflow, _openDropdowns, toggleTimer,
    };

    NDS.Mainnav = {
        init,
        // Public toggles delegate to the dispatch so they trap-load the half too.
        toggleNavbar: () => behavior.toggleNavbar(),
        toggleDropdown: (e) => behavior.toggleDropdown(e),

        // Split: graft the deferred behavior half (nds-mainnav__delegated.js) onto
        // the shared `behavior` dispatch, then replay any opener calls that queued
        // while it loaded. Idempotent; called by the half on load.
        _installBehavior: (factory) => {
            if (_behaviorInstalled) return;
            _behaviorInstalled = true;
            const spec = factory(ctx);
            delete spec.__deferred; // build-only contract; never grafted
            Object.assign(behavior, spec);
            _flushPendingBehavior();
        },
    };
})();
