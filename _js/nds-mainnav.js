/* NDS.Mainnav — public surface
 * Rides: nds-backdrop (dims the page behind an open drawer or dropdown; soft)
 * Methods:
 *   NDS.Mainnav.init()               wire the one nav on the page
 *   NDS.Mainnav.reinit()             re-resolve the markup and wire it again — for a nav
 *                                    that mounted after the bundle ran, or was replaced by
 *                                    a route change. NDS.Init.refresh() calls it
 *   NDS.Mainnav.toggleNavbar()       open or close the collapsed drawer
 *   NDS.Mainnav.toggleDropdown(e)    open or close a nav dropdown — takes the click EVENT,
 *                                    not an element; the .nds-dropdown is resolved from
 *                                    event.target
 * Events:
 *   (none)
 * Hooks:
 *   (none — the nav is class-driven markup: .nds-main-nav holds .nds-nav-primary and
 *    .nds-nav-actions, .nds-mainNav-toggler opens #ndsNavCollapse, and a
 *    .nds-nav-item.nds-PAB stays reachable in minimal mode)
 * Gotchas:
 *   - One nav per page. DOM references resolve when the file loads; a nav that mounts LATER
 *     (a framework rendering the chrome after the deferred bundle) or is swapped in by a
 *     route change needs reinit() — until then CSS paints the nav and nothing works.
 *   - Minimal (mobile) mode starts under --nds-minimal-nav-bp, default 960px. Set that
 *     custom property on :root to move it.
 *   - A .nds-PAB item is MOVED into the minimal bar and moved back — do not reparent one
 *     yourself at runtime.
 *   - Minimal mode is the nds-minimal class on the nav itself; <body> carried it
 *     until 1.11.0, so consumer CSS keyed on body.nds-minimal must move.
 *   - There is no destroy().
 */
// NDS Navigation Controller
//
// Mainnav inits in the deferred pass and owns first paint of the nav chrome.
// init-time work (DOM refs, mode-class sync, PAB placement, toggler
// visibility, the overflow/show-more measurement + drawer reveal, event wiring)
// is cold — no forced layout reads. The dropdown/navbar animation + interaction
// cluster only runs once the user opens something; its functions are defined
// here but invoked on interaction, so they add no init cost.
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
    const DOM = {
        nav: null, collapse: null, collapseContent: null, container: null,
        primary: null, secondary: null, brand: null, toggler: null,
        minimal: null, showMore: null,
    };

    // Re-resolvable rather than captured once: the module runs when the bundle does, and a
    // framework consumer may not have rendered the chrome yet. Capturing null there left
    // the whole nav inert for the session with no warning — CSS painted it, nothing worked.
    // Fields are reassigned in place so the ~25 `DOM.collapse` reads elsewhere keep working.
    function captureDOM() {
        const nav = document.querySelector('.nds-main-nav');
        DOM.nav = nav;
        DOM.collapse = nav?.querySelector('#ndsNavCollapse') || null;
        DOM.collapseContent = nav?.querySelector('.nds-collapse-content') || null;
        DOM.container = nav?.querySelector('.nds-nav-container') || null;
        DOM.primary = nav?.querySelector('.nds-nav-primary') || null;
        DOM.secondary = nav?.querySelector('.nds-nav-actions') || null;
        DOM.brand = nav?.querySelector('.nds-brand') || null;
        DOM.toggler = nav?.querySelector('.nds-mainNav-toggler') || null;
        DOM.minimal = nav?.querySelector('.nds-nav-minimal') || null;
        DOM.showMore = DOM.collapseContent?.querySelector('.nds-show-more') || null;
        return !!DOM.collapse;
    }
    captureDOM();

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

    // Mode class at eval, ahead of the loader's reveal stamp, so it rides the
    // reveal's own recalc: written from init it lands a frame later (the loader
    // yields every 5 ms) and restyles again. On the nav, not <body>: only the
    // nav's rules read it, so a flip restyles the nav alone. init's
    // updateBodyClass then finds both in sync and takes its no-change PAB path.
    if (DOM.nav && DOM.collapse) {
        DOM.nav.classList.toggle('nds-minimal', _mqMinimal.matches);
        DOM.minimal?.toggleAttribute('hidden', !_mqMinimal.matches);
    }

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

        get reducedMotion() { return NDS.prefersReducedMotion; },

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
    // Boxed in a holder so dropdown.toggle's onComplete can read the pending
    // state via toggleTimer.value while scheduleToggleAction/cancelToggleAction
    // own the write side.
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
        // `replace` swaps ownership atomically — no tear-down/re-init flicker
        // between sibling flyouts.
        NDS.Backdrop.show({ zIndex: 999, onClick, replace: replacing });
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
    // Maintained inside dropdown.toggle when state actually flips, and read by
    // scheduleUpdate's mode-flip cleanup + the same-page anchor handler as the
    // "is anything open" signal (`.size` / iteration). The open-marker
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
                // 0 means "not laid out yet", so retry. But a CHILDLESS primary measures 0
                // forever and the retry never ends — ~9 wake-ups a second for as long as the
                // drawer stays open. Falling through is also the right answer for it: an
                // empty list cannot overflow.
                if (scrollHeight === 0 && DOM.primary.firstElementChild) { this.schedule('low', 50); return; }
                if (isFinite(maxH) && maxH > 0) hasOverflow = scrollHeight > maxH + 2;
            } else {
                const { scrollWidth, clientWidth } = DOM.primary;
                // Same guard as the minimal branch above: only retry when there is content
                // whose layout could still arrive.
                if (scrollWidth === 0 && clientWidth === 0 && DOM.primary.firstElementChild) { this.schedule('low', 50); return; }
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
        const isNavMin = DOM.nav.classList.contains('nds-minimal');
        const wantsHidden = !should;
        // Markup ships the nav without `nds-minimal` (desktop-first default;
        // .nds-nav-minimal is gated by [hidden] in markup so no FOUC). On
        // init the body class state can already match `should` while
        // .nds-nav-minimal[hidden] hasn't been toggled yet. Compare both
        // states so the first sync still fires when only the hidden attr
        // is out of step.
        const isHidden = DOM.minimal ? DOM.minimal.hasAttribute('hidden') : wantsHidden;
        if (should !== isNavMin || wantsHidden !== isHidden) {
            DOM.nav.classList.toggle('nds-minimal', should);
            if (DOM.minimal) DOM.minimal.toggleAttribute('hidden', wantsHidden);
            _primaryMaxHeightCached = null;
            managePABPlacement();
            return true;
        }
        return false;
    }

    // One pass, two readers: the toggler hides when neither container has items,
    // and .nds-nav-actions drops out of layout when it has none of its own.
    function checkNavComposition() {
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

        const primaryHas = hasItems(DOM.primary);
        const secondaryHas = hasItems(DOM.secondary);

        if (DOM.secondary) DOM.secondary.toggleAttribute('data-nav-empty', !secondaryHas);
        if (!DOM.toggler) return;
        DOM.toggler.style.display = (primaryHas || secondaryHas) ? '' : 'none';
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

    // True when a dropdown or the drawer is open.
    const _anyOpen = () => _openDropdowns.size > 0 || hasState(DOM.collapse, 'open');

    // ==============================================
    // ANIMATION SYSTEM
    // ==============================================
    const animate = {
        _activeCount: 0,

        run(element, open, config = {}) {
            const { onStart, onComplete, getMenu, blockWhileAnimating = true } = config;
            if (blockWhileAnimating && open && state.isAnimating) return false;

            const duration = state.getDuration(getMenu?.() || element);

            this._activeCount++;
            state.isAnimating = true;

            const finish = () => {
                this._activeCount--;
                if (this._activeCount <= 0) {
                    this._activeCount = 0;
                    state.isAnimating = false;
                    this.processPending();
                }
                onComplete?.();
            };

            if (duration === 0) {
                // Reduced motion: skip intermediate states, go straight to final state
                if (open) {
                    addState(element, 'open', 'opened');
                    removeState(element, 'closing', 'opening');
                    onStart?.();
                } else {
                    removeState(element, 'open', 'opened', 'opening', 'closing');
                    onStart?.();
                }
                finish();
            } else if (open) {
                addState(element, 'open', 'opening');
                removeState(element, 'closing', 'opened');
                onStart?.();
                NDS.afterPaint(() => removeState(element, 'opening'));
                afterDelay(duration, () => { addState(element, 'opened'); finish(); });
            } else {
                addState(element, 'closing');
                removeState(element, 'opened');
                onStart?.();
                afterDelay(duration, () => { removeState(element, 'open', 'opening', 'closing'); finish(); });
            }
            return true;
        },

        processPending() {
            if (!state.pendingAction) return;
            const action = state.pendingAction;
            state.pendingAction = null;
            if (action.type === 'dropdown') toggleDropdown(action.event);
            else if (action.type === 'navbar') toggleNavbar();
        },

        queue(type, event = null) {
            state.pendingAction = { type, event };
        }
    };

    // Center .nds-fit dropdown menus on their trigger and clamp into the viewport.
    // SCSS centers via `left: 50%` + `transform: translateX(-50%)`; this helper
    // overrides the transform inline only when the centered rect would clip
    // either edge. Bails on mobile (mobile uses `position: fixed; inset-inline: 0`).
    // Edge buffer for the .nds-fit dropdown shift. Keeps the menu this many
    // pixels from the inner viewport edge (i.e. the edge of the visible content
    // area, not the scrollbar area).
    const FIT_SHIFT_PAD = 16;
    function applyFitShift(dd) {
        const menu = dd.querySelector('.nds-dropdown-menu.nds-fit');
        if (!menu) return;
        // Clear any leftover inline transform BEFORE the minimal-mode bail. Minimal
        // mode uses `position: fixed; inset-inline: 0` and a stale shift from a
        // prior desktop open would push the fixed full-width menu off-screen.
        menu.style.removeProperty('transform');
        if (state.isMinimal) return;
        requestAnimationFrame(() => {
            const r = menu.getBoundingClientRect();

            // Use the inner viewport (excludes the vertical scrollbar) for bounds.
            // window.innerWidth includes the scrollbar; landing the menu's edge at
            // `innerWidth - PAD` puts it behind the scrollbar — flush with the
            // visible edge with no real gap. The scrollbar lives on the right in
            // LTR, on the left in RTL.
            const innerW = window.innerWidth;
            const sb = innerW - document.documentElement.clientWidth;
            const left = NDS.isRTL ? sb : 0;
            const right = NDS.isRTL ? innerW : innerW - sb;

            let shift = 0;
            if (r.left < left + FIT_SHIFT_PAD) shift = (left + FIT_SHIFT_PAD) - r.left;
            else if (r.right > right - FIT_SHIFT_PAD) shift = (right - FIT_SHIFT_PAD) - r.right;
            if (shift) menu.style.transform = `translateX(calc(-50% + ${shift}px))`;
        });
    }

    // ==============================================
    // DROPDOWN MANAGEMENT
    // ==============================================
    const dropdown = {
        closeAll(except = null) {
            let maxDuration = 0;
            _openDropdowns.forEach(dd => {
                if (dd !== except) {
                    this.toggle(dd, false);
                    maxDuration = Math.max(maxDuration, state.getDuration(getDropdownAnimTarget(dd).animTarget));
                }
            });
            if (maxDuration > 0) overflow.schedule('high');
            return maxDuration;
        },

        toggle(el, open) {
            const { animTarget, isInMinimal, menu } = getDropdownAnimTarget(el);
            const navLink = el.querySelector('.nds-nav-link');

            // Maintain the open set when toggle actually flips state.
            const wasOpen = hasState(el, 'open');
            if (open !== wasOpen) {
                if (open) _openDropdowns.add(el);
                else _openDropdowns.delete(el);
            }

            if (open) addState(navLink, 'active');
            else removeState(navLink, 'active');

            const collapseHandlesBackdrop = !isInMinimal && hasState(DOM.collapse, 'open');
            if (open && !collapseHandlesBackdrop) {
                showNavBackdrop('dropdown', () => {
                    _openDropdowns.forEach(d => dropdown.toggle(d, false));
                });
            }

            animate.run(el, open, {
                getMenu: () => animTarget,
                blockWhileAnimating: open,
                onStart: () => {
                    overflow.schedule('high', 10);
                    if (open) {
                        // Drop intrinsic [hidden] before the open transition so
                        // display:none doesn't kill the animation.
                        menu?.removeAttribute('hidden');
                        applyFitShift(el);
                    }
                },
                onComplete: () => {
                    if (!isInMinimal) updatePositions();
                    overflow.schedule('low', 100);

                    if (!open) {
                        // Restore [hidden] after the close transition ends — but
                        // only if a queued re-open hasn't already re-opened this
                        // dropdown. finish() runs processPending() (which can start
                        // that re-open: dropping [hidden] and re-stamping 'open')
                        // BEFORE this onComplete, so without the guard a superseded
                        // close re-hides the freshly-opened menu, leaving the
                        // trigger 'active' with an invisible menu.
                        if (!hasState(el, 'open')) menu?.setAttribute('hidden', '');
                        if (!collapseHandlesBackdrop &&
                            _openDropdowns.size === 0 &&
                            !hasState(DOM.collapse, 'open') &&
                            !toggleTimer.value) {
                            hideNavBackdrop('dropdown');
                        }
                    }
                }
            });
        }
    };

    // ==============================================
    // NAVBAR MANAGEMENT
    // ==============================================
    const navbar = {
        toggle(open) {
            if (!DOM.collapse) return;

            const collapseContent = DOM.collapseContent;
            const toggleButton = DOM.toggler?.querySelector('button[aria-controls="ndsNavCollapse"]');

            if (open) {
                addState(DOM.toggler, 'open');
                NDS.aria.expanded(toggleButton, true);

                if (state.isMinimal) {
                    showNavBackdrop('navbar', () => {
                        if (hasState(DOM.collapse, 'open')) toggleNavbar();
                    });
                }

                animate.run(DOM.collapse, true, {
                    getMenu: () => state.isMinimal ? (collapseContent || DOM.collapse) : null,
                    onStart: () => { if (state.isMinimal) overflow.schedule('high', 10); },
                    onComplete: () => { updatePositions(); overflow.schedule('low', 100); }
                });
            } else {
                removeState(DOM.toggler, 'open');
                NDS.aria.expanded(toggleButton, false);
                const closeDelay = state.reducedMotion ? 0 : dropdown.closeAll();

                afterDelay(closeDelay, () => {
                    animate.run(DOM.collapse, false, {
                        getMenu: () => state.isMinimal ? (collapseContent || DOM.collapse) : null,
                        // Defer hideNavBackdrop until the drawer finishes closing —
                        // Backdrop.hide()'s synchronous scrollLock.unlock() reflow would
                        // otherwise land in the toggle click frame and inflate INP.
                        onComplete: () => { hideNavBackdrop('navbar'); updatePositions(); overflow.schedule('low', 100); }
                    });
                });
            }
        }
    };

    // ==============================================
    // LAYOUT UPDATES (open-only)
    // ==============================================
    function updatePositions() {
        // Single parse — both flags read from the same data-state token Set.
        const ds = DOM.collapse ? NDS.State.parse(DOM.collapse) : new Set();
        const isOpen = ds.has('open');
        const isClosing = ds.has('closing');

        if (!state.isMinimal || !isOpen || isClosing) {
            if (!state.isMinimal && DOM.secondary) {
                DOM.secondary.style.cssText = '';
                removeState(DOM.secondary, 'closing');
            }
            return;
        }

        if (state.isMinimal) {
            const collapseContent = DOM.collapseContent;
            afterDelay(state.getDuration(collapseContent || DOM.collapse) + 50, () => overflow.schedule());
        }
    }

    // ==============================================
    // PUBLIC TOGGLE FUNCTIONS
    // ==============================================
    // Routes an open-dropdown action to one of two modes:
    //   1. minimal+isInMinimal+drawer-open: close the drawer first, then open
    //   2. default:                         schedule open after the closeAll settles
    function _scheduleDropdownOpen(isInMinimal, closeDelay, open) {
        if (isInMinimal && state.isMinimal) {
            let delay = 0;

            if (hasState(DOM.collapse, 'open')) {
                showNavBackdrop('dropdown', () => {
                    _openDropdowns.forEach(d => {
                        if (d.closest('.nds-nav-minimal')) dropdown.toggle(d, false);
                    });
                });

                const dropdownCloseDelay = state.reducedMotion ? 0 : dropdown.closeAll();
                const collapseContent = DOM.collapseContent;
                const totalNavbarDuration = dropdownCloseDelay + state.getDuration(collapseContent || DOM.collapse);

                navbar.toggle(false);
                delay = Math.max(delay, totalNavbarDuration * 1.2);
            } else {
                delay = Math.max(delay, closeDelay);
            }

            scheduleToggleAction(delay, open);
        } else {
            scheduleToggleAction(closeDelay, open);
        }
    }

    function toggleDropdown(event) {
        event.preventDefault();
        const dd = event.target.closest('.nds-dropdown');
        if (!dd) return;

        const isOpen = hasState(dd, 'open');
        const { animTarget, isInMinimal, isInPrimary } = getDropdownAnimTarget(dd);
        const duration = state.getDuration(animTarget);

        if (state.isAnimating) { animate.queue('dropdown', event); return; }
        cancelToggleAction();

        if (isOpen) {
            dropdown.toggle(dd, false);
            if (isInPrimary && hasState(DOM.collapse, 'open')) afterDelay(duration, updatePositions);
            return;
        }

        const closeDelay = dropdown.closeAll(dd);

        const open = () => {
            if (animate._activeCount === 0) state.isAnimating = false;
            dropdown.toggle(dd, true);
            if (isInPrimary && hasState(DOM.collapse, 'open')) afterDelay(duration * 0.1, updatePositions);
        };

        _scheduleDropdownOpen(isInMinimal, closeDelay, open);
    }

    function toggleNavbar() {
        if (state.isAnimating) { animate.queue('navbar'); return; }
        cancelToggleAction();

        const isOpen = hasState(DOM.collapse, 'open');

        if (!isOpen) {
            const minimalDropdowns = [..._openDropdowns].filter(d => d.closest('.nds-nav-minimal'));
            if (minimalDropdowns.length) {
                const collapseContent = DOM.collapseContent;
                const duration = state.getDuration(collapseContent || DOM.collapse);

                showNavBackdrop('navbar', () => {
                    if (hasState(DOM.collapse, 'open')) toggleNavbar();
                });

                minimalDropdowns.forEach(d => dropdown.toggle(d, false));
                scheduleToggleAction(duration, () => navbar.toggle(true));
                return;
            }
        }

        navbar.toggle(!isOpen);
    }

    // ==============================================
    // EVENT HANDLERS (open-only)
    // ==============================================
    function handleDocumentClick(event) {
        if (state.isAnimating) return;

        // Fast-bail: if nothing is open, the document click can't be an
        // outside-close. Saves a full DOM scan + per-dropdown closest()
        // checks on the overwhelming majority of page clicks.
        const collapseOpen = DOM.toggler && hasState(DOM.collapse, 'open');
        if (!collapseOpen && _openDropdowns.size === 0) return;

        const target = event.target;

        // Close navbar if click outside
        if (collapseOpen) {
            const elements = [DOM.collapse, DOM.toggler];
            if (state.isMinimal) {
                _openDropdowns.forEach(dd => {
                    if (!dd.closest('.nds-nav-actions')) return;
                    if (DOM.collapse && !DOM.collapse.contains(dd)) return;
                    const menu = dd.querySelector('.nds-dropdown-menu');
                    if (menu && !menu.closest('.nds-nav-minimal')) elements.push(menu);
                });
            }
            if (!elements.some(el => el?.contains(target))) toggleNavbar();
        }

        // Close dropdowns if click outside
        _openDropdowns.forEach(dd => {
            if (hasState(dd, 'closing')) return;
            const menu = dd.querySelector('.nds-dropdown-menu');
            if (![dd, menu].some(el => el?.contains(target))) {
                const needsRecalc = (dd.closest('.nds-nav-primary') || dd.closest('.nds-nav-actions')) &&
                    hasState(DOM.collapse, 'open');
                dropdown.toggle(dd, false);
                if (needsRecalc) afterDelay(state.getDuration(menu), updatePositions);
            }
        });
    }

    // ==============================================
    // INTERACTIONS SETUP (binders run on init; handlers fire on interaction)
    // ==============================================
    function _bindShowMore(signal) {
        const clickTarget = DOM.collapseContent || DOM.primary;
        clickTarget.addEventListener('click', (e) => {
            const showMore = e.target.closest('.nds-nav-item.nds-show-more');
            if (!showMore) return;
            e.preventDefault();
            e.stopPropagation();

            const atEnd = hasState(DOM.primary, 'at-end');
            const amount = (state.isMinimal ? DOM.primary.clientHeight : DOM.primary.clientWidth) * 0.8;

            if (state.isMinimal) {
                _openDropdowns.forEach(dd => {
                    if (dd.closest('.nds-nav-actions')) dropdown.toggle(dd, false);
                });
                DOM.primary.scrollTo({ top: atEnd ? 0 : DOM.primary.scrollTop + amount, behavior: 'smooth' });
            } else {
                const dir = NDS.isRTL ? -1 : 1;
                DOM.primary.scrollTo({ left: atEnd ? 0 : DOM.primary.scrollLeft + amount * dir, behavior: 'smooth' });
            }
            // Fallback for browsers without `scrollend` (the listener below
            // covers modern browsers). The smooth-scroll duration is
            // browser-controlled, so a fixed 300 ms is a worst-case settle
            // estimate — not derived from --nds-transition-speed.
            if (!('onscrollend' in DOM.primary)) {
                setTimeout(() => overflow.checkEnd(), 300);
            }
        }, { signal });
    }

    function _bindScrollTracking(signal) {
        const onScroll = NDS.rafThrottle(() => {
            if (state.isMinimal && !hasState(DOM.collapse, 'open')) return;
            overflow.checkEnd();
        });
        DOM.primary.addEventListener('scroll', onScroll, { passive: true, signal });

        if ('onscrollend' in DOM.primary) {
            DOM.primary.addEventListener('scrollend', () => {
                if (state.isMinimal && !hasState(DOM.collapse, 'open')) return;
                requestAnimationFrame(() => overflow.checkEnd());
            }, { signal });
        }
    }

    function _bindWheelConversion(signal) {
        DOM.primary.style.scrollBehavior = 'smooth';

        DOM.primary.addEventListener('wheel', (e) => {
            if (state.isMouseOverDropdown || state.isMinimal ||
                Math.abs(e.deltaX) >= Math.abs(e.deltaY) ||
                !hasState(DOM.primary, 'has-more')) return;

            e.preventDefault();
            // Native smooth scroll — successive deltas compose; no frame-rate assumptions.
            DOM.primary.scrollBy({ left: e.deltaY * (NDS.isRTL ? -0.8 : 0.8), behavior: 'smooth' });
        }, { passive: false, signal });
    }

    function _bindDragScroll(signal) {
        let drag = { active: false, startX: 0, scrollLeft: 0 };

        const dragUp = () => {
            drag.active = false;
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('mouseup', dragUp);
            Object.assign(DOM.primary.style, { cursor: '', userSelect: '', scrollBehavior: 'smooth' });
        };

        const dragMove = (e) => {
            if (state.isMinimal) { dragUp(); return; }
            e.preventDefault();
            DOM.primary.scrollLeft = drag.scrollLeft - (e.pageX - drag.startX);
        };

        DOM.primary.addEventListener('mousedown', (e) => {
            if (state.isMinimal || !hasState(DOM.primary, 'has-more')) return;
            drag = { active: true, startX: e.pageX, scrollLeft: DOM.primary.scrollLeft };
            Object.assign(DOM.primary.style, { cursor: 'grabbing', userSelect: 'none', scrollBehavior: 'auto' });
            e.preventDefault();
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('mouseup', dragUp);
        }, { signal });
    }

    // Dropdown hover tracking — single delegated pair on DOM.nav.
    // mouseover/mouseout bubble (mouseenter/mouseleave do not), so we filter
    // via closest. The relatedTarget guard ignores intra-menu transitions
    // and menu-to-sibling-menu moves (state stays correct without flicker).
    // Replaces N×2 per-menu listeners + a debounced onDOMAdd/onDOMRemove
    // re-scan that ran on every nav-tree mutation.
    function _bindHoverTracking(signal) {
        DOM.nav.addEventListener('mouseover', (e) => {
            if (!e.target.closest('.nds-dropdown-menu')) return;
            if (e.relatedTarget?.closest?.('.nds-dropdown-menu')) return;
            state.isMouseOverDropdown = true;
        }, { signal });
        DOM.nav.addEventListener('mouseout', (e) => {
            if (!e.target.closest('.nds-dropdown-menu')) return;
            if (e.relatedTarget?.closest?.('.nds-dropdown-menu')) return;
            state.isMouseOverDropdown = false;
        }, { signal });
    }

    function setupInteractions() {
        if (!DOM.primary) return;

        // Scope all listeners attached in this function to a single AbortController
        // so teardown can detach them atomically if setupInteractions is ever re-run.
        const _interactionsAbortController = new AbortController();
        const { signal } = _interactionsAbortController;

        _bindShowMore(signal);
        _bindScrollTracking(signal);
        _bindWheelConversion(signal);
        _bindDragScroll(signal);
        _bindHoverTracking(signal);
    }

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
                dropdown.closeAll();

                if (hasState(DOM.collapse, 'open')) {
                    _navBackdropOwner = 'navbar';
                    cancelToggleAction();
                    toggleNavbar();
                    return;
                }

                if (_navBackdropOwner) {
                    _navBackdropOwner = null;
                    cancelToggleAction();
                    // Soft dependency — backdrop cleanup no-ops if NDS.Backdrop isn't
                    // bundled (matches the guarded showNavBackdrop/hideNavBackdrop handoff).
                    if (NDS.Backdrop && NDS.Backdrop.isActive()) NDS.Backdrop.hide();
                }
            }

            if (hasState(DOM.collapse, 'open') && !hasState(DOM.collapse, 'closing')) {
                updatePositions();
            }

            // Pure markup check (no layout reads) — re-run on composition changes
            // (PAB placement / mode flip / DOM mutations), not on every resize.
            // Order matters: updateBodyClass() above moved the PABs, so the
            // data-nav-empty stamp reads the settled DOM in the same frame.
            if (modeChanged || state._navChanged) {
                state._navChanged = false;
                checkNavComposition();
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
    const _offDOMWatches = [];
    let _initDone = false;

    function _bindGlobalEvents(signal) {
        window.addEventListener('orientationchange', () => {
            _primaryMaxHeightCached = null;
            setTimeout(scheduleUpdate, 150);
        }, { passive: true, signal });

        document.addEventListener('click', (e) => {
            if (e.target.closest('.nds-dropdown > .nds-nav-link')) toggleDropdown(e);
            if (e.target.closest('.nds-mainNav-toggler')) { e.preventDefault(); toggleNavbar(); }
        }, { signal });

        // When a modal opens, dismiss any open nav drawer/dropdowns so the
        // modal sits on a clean overlay. Closing the drawer cascades to
        // close any dropdowns inside it via navbar.toggle(). Nothing-open is the
        // common case — behavior's guarded-direct stubs no-op then; when something
        // IS open the half is already installed.
        document.addEventListener('nds:modal:opened', () => {
            if (hasState(DOM.collapse, 'open')) toggleNavbar();
            else dropdown.closeAll();
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
            if (wasNavOpen) toggleNavbar();
            else dropdown.closeAll();

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
        // Captured, unlike before: reinit() re-runs this, and an uncaptured pooled
        // subscriber would stack one closure per re-run for the page lifetime.
        _offDOMWatches.splice(0).forEach(off => off());
        const navChanged = NDS.debounce(() => { state._navChanged = true; scheduleUpdate(); }, 100);
        _offDOMWatches.push(
            NDS.onDOMAdd('.nds-nav-item, .nds-dropdown', navChanged),
            NDS.onDOMRemove('.nds-nav-item, .nds-dropdown', navChanged),
        );

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
        // Pre-JSA-15 this also observed DOM.nav (for updateNavMaxWidth's
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
    // Re-resolve the markup and wire it, whether or not a prior pass found anything.
    //
    // Two cases reach here, and both are the same fix. A nav that did not exist when the
    // bundle ran (a framework consumer whose chrome mounts after the deferred script — the
    // cold-load case, where every DOM ref captured null and the nav was inert for the whole
    // session), and a nav REPLACED at runtime by a route change, where the refs point at
    // detached nodes. Neither used to recover, and neither said anything: CSS paints the
    // chrome either way, so it looks correct and no click does anything.
    //
    // Only a CHANGE OF NODE counts — or, under a kept root, a swapped-out collapse or a
    // reverted [hidden] on it, which is how a diffing framework re-renders the nav (the
    // markup ships [hidden]; init strips it and nothing puts it back). This is the
    // NDS.Init.refresh hook, so it fires on every
    // refresh call a page makes — most about a table or a card grid, nothing to do with the
    // nav — and re-wiring on each one would re-attach every listener and reset an open
    // drawer for nothing. Items added or removed INSIDE a live nav need no call at all: the
    // onDOMAdd/onDOMRemove watchers already pick those up.
    //
    // Safe to call repeatedly. setupEventListeners aborts the previous batch, and the
    // pooled onResize / onElementResize / onDOMAdd handles are all released before re-registering.
    function reinit() {
        const live = document.querySelector('.nds-main-nav');
        if (!live) return;
        if (_initDone && DOM.nav === live && live.isConnected
            && DOM.collapse?.isConnected && !DOM.collapse.hasAttribute('hidden')) return;
        if (!captureDOM()) return;
        _initDone = false;
        init();
    }

    function init() {
        // Entry guard: mainnav is a singleton, so repeat init() calls are no-ops. Use
        // reinit() when the markup itself changed — it re-resolves DOM and rewires.
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
        // both document-click listeners detach atomically on teardown. It
        // fast-bails when nothing is open, so it's cheap on the common click.
        document.addEventListener('click', (e) => handleDocumentClick(e), { signal: _eventsAbortController.signal });
        if (!bodyClassChanged) managePABPlacement();
        // Read the nav composition now that PABs (if any) have been placed.
        // scheduleUpdate's only call site for this fires on width/mode/nav
        // changes — none of which trigger on first load — so without this,
        // a page that loads in minimal with an empty collapse panel (e.g.
        // primary empty, secondary all PABs) would leave the toggler
        // CSS-visible with nothing to expose, and .nds-nav-actions unstamped.
        checkNavComposition();

        if (hasState(DOM.collapse, 'open')) updatePositions();
        setupInteractions();

        // Initial overflow check on the next paint. The ResizeObserver
        // first-delivery path is debounced 100ms, which would otherwise
        // leave the nav unflagged for ~100ms after init at desktop widths
        // where items overflow (e.g. 1040px on a dense nav). Running it
        // here lets has-more (and the show-more button) settle in the
        // first rendered frame instead. Stays a direct eager call (overflow
        // is in the shell).
        overflow.schedule('immediate');
    }

    // Mode-flip listener: fires only when the viewport crosses
    // `--nds-minimal-nav-bp`. scheduleUpdate's updateBodyClass call then
    // sees the mismatch between .nds-main-nav.nds-minimal and the new state.isMinimal
    // and runs the mode-transition logic (close dropdowns, drawer cleanup,
    // PAB placement). Replaces the old windowWidth-vs-minimalBp poll.
    _mqMinimal.addEventListener('change', () => {
        _primaryMaxHeightCached = null;
        scheduleUpdate();
    });

    NDS.Mainnav = {
        init,
        reinit,
        toggleNavbar: () => toggleNavbar(),
        toggleDropdown: (e) => toggleDropdown(e),
    };
})();
