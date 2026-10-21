/* NDS.MainNav — public surface
 * Rides: nds-backdrop (dims the page behind an open drawer or dropdown; soft)
 * Requires:
 *   .nds-main-nav needs #nds-nav-collapse — the nav does nothing
 *   .nds-main-nav needs .nds-nav-toggler — the menu cannot open on small screens
 *   .nds-main-nav needs .nds-nav-primary — links that overflow never move to More
 *   .nds-has-menu needs :scope > .nds-nav-link — the menu has no trigger
 *   .nds-has-menu needs .nds-nav-menu — the trigger opens nothing
 * Methods:
 *   NDS.MainNav.init()               wire the one nav on the page
 *   NDS.MainNav.reinit()             re-resolve the markup and wire it again — for a nav
 *                                    that mounted after the bundle ran, or was replaced by
 *                                    a route change. NDS.init.refresh() calls it
 *   NDS.MainNav.destroy()            release every listener, observer and the backdrop; the
 *                                    markup stays, and reinit() wires it again
 *   NDS.MainNav.open() / close()     open or close the drawer (toggle() flips it)
 *   NDS.MainNav.openMenu(trigger)    open the menu of the .nds-has-menu that holds trigger
 *   NDS.MainNav.closeMenus()         close every open menu
 * Events:
 *   nds:main-nav:opened   on #nds-nav-collapse or an li.nds-has-menu, as it starts to open; bubbles
 *   nds:main-nav:closed   on the same element, once it has closed
 * Hooks:
 *   (none — the nav is class-driven markup: .nds-main-nav holds .nds-nav-primary and
 *    .nds-nav-actions, .nds-nav-toggler opens #nds-nav-collapse, and a
 *    .nds-nav-item.nds-pinned stays reachable in minimal mode)
 * Gotchas:
 *   - One nav per page. dom references resolve when the file loads; a nav that mounts LATER
 *     (a framework rendering the chrome after the deferred bundle) or is swapped in by a
 *     route change needs reinit() — until then CSS paints the nav and nothing works.
 *   - Minimal (mobile) mode starts under --nds-minimal-nav-bp, default 960px. Set that
 *     custom property on :root to move it.
 *   - A .nds-pinned item is MOVED into the minimal bar and moved back — do not reparent one
 *     yourself at runtime.
 *   - Minimal mode is the nds-minimal class on the nav itself; <body> carried it
 *     until 1.11.0, so consumer CSS keyed on body.nds-minimal must move.
 *   - A menu trigger writes data-state="open" while its menu is open ("active" until 2.0.0).
 */
// NDS Navigation Controller
//
// Mainnav inits in the critical pass, so its toggle and menus answer from the reveal.
// init-time work (dom refs, mode-class sync, PAB placement, toggler
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
    // dom REFERENCES
    // ==============================================
    // Mainnav is a singleton with a stable markup tree, so all node references
    // are cached eagerly at module load (script runs after DOMContentLoaded via
    // the loader). Previously every reference re-ran querySelector — `dom.collapse`
    // alone is touched ~25× across this file.
    const dom = {
        nav: null, collapse: null, collapseContent: null,
        primary: null, secondary: null, toggler: null, minimal: null,
    };

    // Re-resolvable rather than captured once: the module runs when the bundle does, and a
    // framework consumer may not have rendered the chrome yet. Capturing null there left
    // the whole nav inert for the session with no warning — CSS painted it, nothing worked.
    // Fields are reassigned in place so the ~25 `dom.collapse` reads elsewhere keep working.
    function captureDOM() {
        const nav = document.querySelector('.nds-main-nav');
        dom.nav = nav;
        dom.collapse = nav?.querySelector('#nds-nav-collapse') || null;
        dom.collapseContent = nav?.querySelector('.nds-nav-collapse-content') || null;
        dom.primary = nav?.querySelector('.nds-nav-primary') || null;
        dom.secondary = nav?.querySelector('.nds-nav-actions') || null;
        dom.toggler = nav?.querySelector('.nds-nav-toggler') || null;
        dom.minimal = nav?.querySelector('.nds-nav-minimal') || null;
        return !!dom.collapse;
    }
    captureDOM();

    // State helpers — delegated to NDS.state (nds-core.js)
    const { add: addState, remove: removeState, has: hasState } = NDS.state;

    // Minimal-mode breakpoint. Reads the canonical `--nds-minimal-nav-bp`
    // CSS var once at module load, then drives mode detection via
    // matchMedia so the flip fires as an event rather than being polled
    // inside scheduleUpdate. Consumers that override `--nds-minimal-nav-bp`
    // still get honored (the override is what we read here). The
    // matchMedia change listener is attached at the bottom of the file
    // alongside the reduced-motion listener.
    const minimalBp = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nds-minimal-nav-bp')) || MINIMAL_NAV_BP_FALLBACK;
    const mqMinimal = window.matchMedia(`(max-width: ${minimalBp}px)`);

    // Scroll behavior for every JS-driven nav scroll. 'auto' defers to the element's
    // CSS scroll-behavior, which is unset on the nav and on the document — so it is a
    // real instant scroll here. Check the stylesheet before copying this onto a
    // surface that sets scroll-behavior: smooth, where 'auto' still animates.
    const behavior = () => NDS.prefersReducedMotion ? 'auto' : 'smooth';

    // Mode class at eval, ahead of the loader's reveal stamp, so it rides the
    // reveal's own recalc: written from init it lands a frame later (the loader
    // yields every 5 ms) and restyles again. On the nav, not <body>: only the
    // nav's rules read it, so a flip restyles the nav alone. init's
    // syncMode then finds both in sync and takes its no-change PAB path.
    // Auto-init off (the loader reads the same switch): nothing changes before
    // initialize(), so a framework hydrates the markup it rendered.
    const autoInit = (window.NDSInitConfig || {}).autoInitialize
        ?? document.documentElement.getAttribute('data-nds-auto-init') !== 'false';
    if (autoInit && dom.nav && dom.collapse) {
        dom.nav.classList.toggle('nds-minimal', mqMinimal.matches);
        dom.minimal?.toggleAttribute('hidden', !mqMinimal.matches);
    }

    // ==============================================
    // STATE MANAGEMENT
    // ==============================================
    const state = {
        isAnimating: false,
        pendingAction: null,
        pendingOverflowCheck: null,
        // Flipped true by the navChanged dom-mutation debounce; consumed in
        // scheduleUpdate to gate the toggler-visibility recompute. Reset there.
        _navChanged: false,

        get isMinimal() { return mqMinimal.matches; },

        _durations: new WeakMap(),
        getDuration(el) {
            if (!el || NDS.prefersReducedMotion) return 0;
            let cached = this._durations.get(el);
            if (cached === undefined) {
                cached = parseFloat(getComputedStyle(el).transitionDuration) || 0;
                this._durations.set(el, cached);
            }
            return cached > 0 ? NDS.transitionSpeed() : 0;
        },
    };

    // Cache of getComputedStyle(dom.primary).maxHeight (parsed). The CSS
    // max-height uses `svh` units which vary with viewport height, so the
    // cache is reset wherever a resize may have invalidated it (mode flip,
    // orientationchange, primary RO callback, window resize bus).
    let primaryMaxHeightCached = null;
    function getPrimaryMaxHeight() {
        if (primaryMaxHeightCached === null) {
            primaryMaxHeightCached = parseFloat(getComputedStyle(dom.primary).maxHeight);
        }
        return primaryMaxHeightCached;
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

    // Resolve the animation target for a dropdown element. needsHeight + animTarget
    // derive from state.isMinimal, which changes at runtime.
    const getDropdownAnimTarget = (dd) => {
        const menu = dd.querySelector('.nds-nav-menu');
        const c = {
            menu,
            content: menu?.querySelector('.nds-nav-menu-content'),
            isInMinimal: dd.closest('.nds-nav-minimal'),
            isInPrimary: dd.closest('.nds-nav-primary'),
        };
        const needsHeight = state.isMinimal && c.isInPrimary;
        const animTarget = c.isInMinimal ? (c.content || c.menu) : (needsHeight ? c.menu : (c.content || c.menu));
        return { ...c, needsHeight, animTarget };
    };

    // Nav backdrop ownership — prevents flicker during navbar↔dropdown transitions
    let navBackdropOwner = null;

    const showNavBackdrop = (owner, onClick) => {
        if (navBackdropOwner === owner) return;
        const replacing = navBackdropOwner !== null;
        navBackdropOwner = owner;
        // `replace` swaps ownership atomically — no tear-down/re-init flicker
        // between sibling flyouts.
        NDS.Backdrop.show({ zIndex: 999, onClick: () => withFocusBack(owner, onClick), replace: replacing });
    };

    // Escape from inside a menu or the drawer hands focus back to its button, not <body>.
    // An outside click moved focus off the nav first, so it keeps where it landed.
    const withFocusBack = (owner, close) => {
        const from = document.activeElement;
        const btn = !dom.nav?.contains(from) ? null
            : owner === 'navbar' ? dom.toggler?.querySelector('button[aria-controls="nds-nav-collapse"]')
            : from.closest('.nds-has-menu')?.querySelector('.nds-nav-link');
        close();
        btn?.focus({ preventScroll: true });
    };

    const hideNavBackdrop = (owner) => {
        if (navBackdropOwner !== owner) return;
        navBackdropOwner = null;
        NDS.Backdrop.hide();
    };

    // ==============================================
    // DROPDOWN OPEN SET
    // ==============================================
    // Set of currently-open dropdown elements (in any of open/opening/closing
    // state). Replaces ~10 `querySelectorAll('.nds-has-menu[data-state~="open"]')`
    // scans across this file with O(1) Set membership + O(open-count) iteration.
    // Maintained inside dropdown.toggle when state actually flips, and read by
    // scheduleUpdate's mode-flip cleanup + the same-page anchor handler as the
    // "is anything open" signal (`.size` / iteration). The open-marker
    // equivalent of membership is `.nds-has-menu[data-state~="open"]`.
    const openDropdowns = new Set();

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
            }, NDS.prefersReducedMotion ? 0 : ms);
        },

        check() {
            if (!dom.primary) return;

            if (state.isMinimal && !hasState(dom.collapse, 'open')) {
                removeState(dom.primary, 'has-more', 'at-start', 'at-end');
                return;
            }

            const wasOverflowing = hasState(dom.primary, 'has-more');
            let hasOverflow = false;

            if (state.isMinimal) {
                const maxH = getPrimaryMaxHeight();
                const scrollHeight = dom.primary.scrollHeight;
                // 0 means "not laid out yet", so retry. But a CHILDLESS primary measures 0
                // forever and the retry never ends — ~9 wake-ups a second for as long as the
                // drawer stays open. Falling through is also the right answer for it: an
                // empty list cannot overflow.
                if (scrollHeight === 0 && dom.primary.firstElementChild) { this.schedule('low', 50); return; }
                if (isFinite(maxH) && maxH > 0) hasOverflow = scrollHeight > maxH + 2;
            } else {
                const { scrollWidth, clientWidth } = dom.primary;
                // Same guard as the minimal branch above: only retry when there is content
                // whose layout could still arrive.
                if (scrollWidth === 0 && clientWidth === 0 && dom.primary.firstElementChild) { this.schedule('low', 50); return; }
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

            if (hasOverflow) addState(dom.primary, 'has-more'); else removeState(dom.primary, 'has-more');

            // CSS flex (`.nds-nav-primary { flex: 1 1 0; min-width: 0 }`) re-lays
            // out automatically when the show-more sibling flips between
            // display:none and display:flex on the has-more state change above.
            // No JS width recompute needed here.
            revealOnce();

            if (!hasOverflow) {
                removeState(dom.primary, 'at-start', 'at-end');
            } else {
                requestAnimationFrame(() => this.checkEnd());
            }
        },

        checkEnd() {
            if (!hasState(dom.primary, 'has-more')) return;

            let atStart, atEnd;
            if (state.isMinimal) {
                const { scrollTop, scrollHeight, clientHeight } = dom.primary;
                atStart = scrollTop <= 1;
                atEnd = scrollTop + clientHeight >= scrollHeight - 1;
            } else {
                const { scrollLeft, scrollWidth, clientWidth } = dom.primary;
                const max = scrollWidth - clientWidth;
                atStart = Math.abs(scrollLeft) <= 2;
                atEnd = max <= 1 || Math.abs(scrollLeft) >= max - 2;
            }
            if (atStart) addState(dom.primary, 'at-start'); else removeState(dom.primary, 'at-start');
            if (atEnd) addState(dom.primary, 'at-end'); else removeState(dom.primary, 'at-end');
        }
    };

    // ==============================================
    // LAYOUT UPDATES
    // ==============================================
    function removeCollapseHidden() {
        dom.collapse?.removeAttribute('hidden');
    }

    function syncMode() {
        const should = state.isMinimal;
        const isNavMin = dom.nav.classList.contains('nds-minimal');
        const wantsHidden = !should;
        // Markup ships the nav without `nds-minimal` (desktop-first default;
        // .nds-nav-minimal is gated by [hidden] in markup so no FOUC). On
        // init the body class state can already match `should` while
        // .nds-nav-minimal[hidden] hasn't been toggled yet. Compare both
        // states so the first sync still fires when only the hidden attr
        // is out of step.
        const isHidden = dom.minimal ? dom.minimal.hasAttribute('hidden') : wantsHidden;
        if (should !== isNavMin || wantsHidden !== isHidden) {
            dom.nav.classList.toggle('nds-minimal', should);
            if (dom.minimal) dom.minimal.toggleAttribute('hidden', wantsHidden);
            primaryMaxHeightCached = null;
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
        // "is the parent not [hidden] and does it have at least one
        // child other than the show-more" (a moved PAB leaves only a comment).
        const hasItems = (parent) => {
            if (!parent || parent.hasAttribute('hidden')) return false;
            for (const child of parent.children) {
                if (child.classList.contains('nds-show-more')) continue;
                return true;
            }
            return false;
        };

        const primaryHas = hasItems(dom.primary);
        const secondaryHas = hasItems(dom.secondary);

        if (dom.secondary) dom.secondary.toggleAttribute('data-nav-empty', !secondaryHas);
        // No actions row under the drawer's show-more: it drops to the bottom edge.
        dom.collapseContent?.toggleAttribute('data-nav-actions-empty', !secondaryHas);
        if (!dom.toggler) return;
        dom.toggler.hidden = !(primaryHas || secondaryHas);
    }

    // ==============================================
    // PAB (Persistent Action Buttons) MANAGEMENT
    // ==============================================
    // A pinned item leaves a marker in its place (NDS.markHome), so a framework holding it still finds its spot.
    function managePABPlacement() {
        const pabs = dom.nav ? dom.nav.querySelectorAll('.nds-nav-item.nds-pinned') : [];
        if (!pabs.length || !dom.minimal) return;

        if (state.isMinimal) {
            pabs.forEach(item => NDS.markHome(item));
            // Calls to action first, then the rest, each in written order.
            const all = Array.from(pabs);
            const cta = all.filter(p => p.classList.contains('nds-nav-cta'));
            const rest = all.filter(p => !p.classList.contains('nds-nav-cta'));
            dom.minimal.prepend(...cta, ...rest);
        } else {
            pabs.forEach(item => NDS.sendHome(item));
        }
    }

    // True when a dropdown or the drawer is open.
    const anyOpen = () => openDropdowns.size > 0 || hasState(dom.collapse, 'open');

    // Flags the CSS reads in place of :has(): something is open (the nav drops its
    // overflow clip), and an action's menu is open (the drawer squares off).
    function syncOpenFlags() {
        const openIn = (root) => !!root?.querySelector('.nds-has-menu[data-state~="open"]');
        dom.nav?.toggleAttribute('data-nav-open', hasState(dom.collapse, 'open') || openIn(dom.nav));
        dom.collapseContent?.toggleAttribute('data-nav-actions-open', openIn(dom.secondary));
    }
    // The drawer or a menu (its li): opened as it starts to open, closed once it has closed.
    const emit = (el, name) => el.dispatchEvent(new CustomEvent(`nds:main-nav:${name}`, { bubbles: true }));

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

            const closed = () => { syncOpenFlags(); emit(element, 'closed'); };
            if (duration === 0) {
                // Reduced motion: skip intermediate states, go straight to final state
                if (open) {
                    addState(element, 'open', 'opened');
                    removeState(element, 'closing', 'opening');
                    syncOpenFlags();
                    emit(element, 'opened');
                    onStart?.();
                } else {
                    removeState(element, 'open', 'opened', 'opening', 'closing');
                    onStart?.();
                    closed();
                }
                finish();
            } else if (open) {
                addState(element, 'open', 'opening');
                removeState(element, 'closing', 'opened');
                syncOpenFlags();
                emit(element, 'opened');
                onStart?.();
                NDS.afterPaint(() => removeState(element, 'opening'));
                afterDelay(duration, () => { addState(element, 'opened'); finish(); });
            } else {
                addState(element, 'closing');
                removeState(element, 'opened');
                onStart?.();
                afterDelay(duration, () => { removeState(element, 'open', 'opening', 'closing'); closed(); finish(); });
            }
            return true;
        },

        processPending() {
            if (!state.pendingAction) return;
            const action = state.pendingAction;
            state.pendingAction = null;
            if (action.type === 'dropdown') toggleMenu(action.target);
            else if (action.type === 'navbar') toggleNavbar();
        },

        queue(type, target = null) {
            state.pendingAction = { type, target };
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
        const menu = dd.querySelector('.nds-nav-menu.nds-fit');
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
            openDropdowns.forEach(dd => {
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
                if (open) openDropdowns.add(el);
                else openDropdowns.delete(el);
            }

            if (open) addState(navLink, 'open');
            else removeState(navLink, 'open');
            // The link's own open signal — AT reads it, and _buttons.scss rotates the
            // arrow off it, because a parent-state tail would put .nds-btn in the
            // shared data-state set (PERF-06).
            NDS.aria.expanded(navLink, open);

            const collapseHandlesBackdrop = !isInMinimal && hasState(dom.collapse, 'open');
            if (open && !collapseHandlesBackdrop) {
                showNavBackdrop('dropdown', () => {
                    openDropdowns.forEach(d => dropdown.toggle(d, false));
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
                    if (!isInMinimal) recheckDrawerOverflow();
                    overflow.schedule('low', 100);

                    if (!open) {
                        // Restore [hidden] after the close transition ends — but
                        // only if a queued re-open hasn't already re-opened this
                        // dropdown. finish() runs processPending() (which can start
                        // that re-open: dropping [hidden] and re-stamping 'open')
                        // BEFORE this onComplete, so without the guard a superseded
                        // close re-hides the freshly-opened menu, leaving the
                        // trigger 'open' with an invisible menu.
                        if (!hasState(el, 'open')) menu?.setAttribute('hidden', '');
                        if (!collapseHandlesBackdrop &&
                            openDropdowns.size === 0 &&
                            !hasState(dom.collapse, 'open') &&
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
            if (!dom.collapse) return;

            const collapseContent = dom.collapseContent;
            const toggleButton = dom.toggler?.querySelector('button[aria-controls="nds-nav-collapse"]');

            if (open) {
                addState(dom.toggler, 'open');
                NDS.aria.expanded(toggleButton, true);

                if (state.isMinimal) {
                    showNavBackdrop('navbar', () => {
                        if (hasState(dom.collapse, 'open')) toggleNavbar();
                    });
                }

                animate.run(dom.collapse, true, {
                    getMenu: () => state.isMinimal ? (collapseContent || dom.collapse) : null,
                    onStart: () => { if (state.isMinimal) overflow.schedule('high', 10); },
                    onComplete: () => { recheckDrawerOverflow(); overflow.schedule('low', 100); }
                });
            } else {
                removeState(dom.toggler, 'open');
                NDS.aria.expanded(toggleButton, false);
                const closeDelay = NDS.prefersReducedMotion ? 0 : dropdown.closeAll();

                afterDelay(closeDelay, () => {
                    animate.run(dom.collapse, false, {
                        getMenu: () => state.isMinimal ? (collapseContent || dom.collapse) : null,
                        // Defer hideNavBackdrop until the drawer finishes closing —
                        // Backdrop.hide()'s synchronous scrollLock.unlock() reflow would
                        // otherwise land in the toggle click frame and inflate INP.
                        onComplete: () => { hideNavBackdrop('navbar'); recheckDrawerOverflow(); overflow.schedule('low', 100); }
                    });
                });
            }
        }
    };

    // ==============================================
    // LAYOUT UPDATES (open-only)
    // ==============================================
    // The drawer's links may overflow once it settles: re-check then (minimal only).
    function recheckDrawerOverflow() {
        if (!state.isMinimal || !hasState(dom.collapse, 'open') || hasState(dom.collapse, 'closing')) return;
        afterDelay(state.getDuration(dom.collapseContent || dom.collapse) + 50, () => overflow.schedule());
    }

    // ==============================================
    // PUBLIC TOGGLE FUNCTIONS
    // ==============================================
    // Routes an open-dropdown action to one of two modes:
    //   1. minimal+isInMinimal+drawer-open: close the drawer first, then open
    //   2. default:                         schedule open after the closeAll settles
    function scheduleDropdownOpen(isInMinimal, closeDelay, open) {
        if (isInMinimal && state.isMinimal) {
            let delay = 0;

            if (hasState(dom.collapse, 'open')) {
                showNavBackdrop('dropdown', () => {
                    openDropdowns.forEach(d => {
                        if (d.closest('.nds-nav-minimal')) dropdown.toggle(d, false);
                    });
                });

                const dropdownCloseDelay = NDS.prefersReducedMotion ? 0 : dropdown.closeAll();
                const collapseContent = dom.collapseContent;
                const totalNavbarDuration = dropdownCloseDelay + state.getDuration(collapseContent || dom.collapse);

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

    function toggleMenu(dd) {
        if (!dd) return;

        const isOpen = hasState(dd, 'open');
        const { animTarget, isInMinimal, isInPrimary } = getDropdownAnimTarget(dd);
        const duration = state.getDuration(animTarget);

        if (state.isAnimating) { animate.queue('dropdown', dd); return; }
        cancelToggleAction();

        if (isOpen) {
            dropdown.toggle(dd, false);
            if (isInPrimary && hasState(dom.collapse, 'open')) afterDelay(duration, recheckDrawerOverflow);
            return;
        }

        const closeDelay = dropdown.closeAll(dd);

        const open = () => {
            if (animate._activeCount === 0) state.isAnimating = false;
            dropdown.toggle(dd, true);
            if (isInPrimary && hasState(dom.collapse, 'open')) afterDelay(duration * 0.1, recheckDrawerOverflow);
        };

        scheduleDropdownOpen(isInMinimal, closeDelay, open);
    }

    function toggleNavbar() {
        if (state.isAnimating) { animate.queue('navbar'); return; }
        cancelToggleAction();

        const isOpen = hasState(dom.collapse, 'open');

        if (!isOpen) {
            const minimalDropdowns = [...openDropdowns].filter(d => d.closest('.nds-nav-minimal'));
            if (minimalDropdowns.length) {
                const collapseContent = dom.collapseContent;
                const duration = state.getDuration(collapseContent || dom.collapse);

                showNavBackdrop('navbar', () => {
                    if (hasState(dom.collapse, 'open')) toggleNavbar();
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
        // outside-close. Saves a full dom scan + per-dropdown closest()
        // checks on the overwhelming majority of page clicks.
        const collapseOpen = dom.toggler && hasState(dom.collapse, 'open');
        if (!collapseOpen && openDropdowns.size === 0) return;

        const target = event.target;

        // Close navbar if click outside
        if (collapseOpen) {
            const elements = [dom.collapse, dom.toggler];
            if (state.isMinimal) {
                openDropdowns.forEach(dd => {
                    if (!dd.closest('.nds-nav-actions')) return;
                    if (dom.collapse && !dom.collapse.contains(dd)) return;
                    const menu = dd.querySelector('.nds-nav-menu');
                    if (menu && !menu.closest('.nds-nav-minimal')) elements.push(menu);
                });
            }
            if (!elements.some(el => el?.contains(target))) toggleNavbar();
        }

        // Close dropdowns if click outside
        openDropdowns.forEach(dd => {
            if (hasState(dd, 'closing')) return;
            const menu = dd.querySelector('.nds-nav-menu');
            if (![dd, menu].some(el => el?.contains(target))) {
                const needsRecalc = (dd.closest('.nds-nav-primary') || dd.closest('.nds-nav-actions')) &&
                    hasState(dom.collapse, 'open');
                dropdown.toggle(dd, false);
                if (needsRecalc) afterDelay(state.getDuration(menu), recheckDrawerOverflow);
            }
        });
    }

    // ==============================================
    // INTERACTIONS SETUP (binders run on init; handlers fire on interaction)
    // ==============================================
    function bindShowMore(signal) {
        const clickTarget = dom.collapseContent || dom.primary;
        clickTarget.addEventListener('click', (e) => {
            const showMore = e.target.closest('.nds-nav-item.nds-show-more');
            if (!showMore) return;
            e.preventDefault();
            e.stopPropagation();

            const atEnd = hasState(dom.primary, 'at-end');
            const amount = (state.isMinimal ? dom.primary.clientHeight : dom.primary.clientWidth) * 0.8;

            if (state.isMinimal) {
                openDropdowns.forEach(dd => {
                    if (dd.closest('.nds-nav-actions')) dropdown.toggle(dd, false);
                });
                dom.primary.scrollTo({ top: atEnd ? 0 : dom.primary.scrollTop + amount, behavior: behavior() });
            } else {
                const dir = NDS.isRTL ? -1 : 1;
                dom.primary.scrollTo({ left: atEnd ? 0 : dom.primary.scrollLeft + amount * dir, behavior: behavior() });
            }
            // Fallback for browsers without `scrollend` (the listener below
            // covers modern browsers). The smooth-scroll duration is
            // browser-controlled, so a fixed 300 ms is a worst-case settle
            // estimate — not derived from --nds-transition-speed.
            if (!('onscrollend' in dom.primary)) {
                setTimeout(() => overflow.checkEnd(), 300);
            }
        }, { signal });
    }

    function bindScrollTracking(signal) {
        const onScroll = NDS.rafThrottle(() => {
            if (state.isMinimal && !hasState(dom.collapse, 'open')) return;
            overflow.checkEnd();
        });
        dom.primary.addEventListener('scroll', onScroll, { passive: true, signal });

        if ('onscrollend' in dom.primary) {
            dom.primary.addEventListener('scrollend', () => {
                if (state.isMinimal && !hasState(dom.collapse, 'open')) return;
                requestAnimationFrame(() => overflow.checkEnd());
            }, { signal });
        }
    }

    let interactionsAbortController = null;
    function setupInteractions() {
        if (!dom.primary) return;

        // One controller per run, aborted on the next: a reinit on a kept root
        // would otherwise stack every interaction listener (wheel scroll doubles).
        if (interactionsAbortController) interactionsAbortController.abort();
        interactionsAbortController = new AbortController();
        const { signal } = interactionsAbortController;

        bindShowMore(signal);
        bindScrollTracking(signal);
        // Inline, so it outranks any stylesheet — it must honour reduced motion here
        // or every scrollTo below silently animates through its 'auto' branch.
        dom.primary.style.scrollBehavior = behavior();
        // Not in minimal mode, only while the bar overflows, never from inside a dropdown menu.
        NDS.dragScroll(dom.primary, {
            canScroll: (e) => !state.isMinimal && hasState(dom.primary, 'has-more') && !e.target.closest('.nds-nav-menu'),
            signal,
        });
    }

    // ==============================================
    // EVENT HANDLERS
    // ==============================================
    const scheduleUpdate = NDS.rafThrottle(() => {
        const modeChanged = syncMode();

        // A mode flip with something open: close the menus and the drawer, and drop
        // a stale backdrop.
        if (modeChanged && anyOpen()) {
            dropdown.closeAll();

            if (hasState(dom.collapse, 'open')) {
                navBackdropOwner = 'navbar';
                cancelToggleAction();
                toggleNavbar();
                return;
            }

            if (navBackdropOwner) {
                navBackdropOwner = null;
                cancelToggleAction();
                if (NDS.Backdrop.isActive()) NDS.Backdrop.hide();
            }
        }

        if (hasState(dom.collapse, 'open') && !hasState(dom.collapse, 'closing')) {
            recheckDrawerOverflow();
        }

        // Pure markup check (no layout reads) — re-run on composition changes
        // (PAB placement / mode flip / dom mutations), not on every resize.
        // Order matters: syncMode() above moved the PABs, so the
        // data-nav-empty stamp reads the settled dom in the same frame.
        if (modeChanged || state._navChanged) {
            state._navChanged = false;
            checkNavComposition();
        }
    });

    // ==============================================
    // EVENT LISTENERS
    // ==============================================
    // All document/window/element listeners attached in setupEventListeners +
    // init() are scoped to this AbortController. Re-running init detaches the
    // prior batch atomically instead of stacking listeners on document/window
    // (the JSP-06 sub-shape (c) hazard). Pooled subscribers from NDS.onResize
    // and NDS.onElementResize return their own unsubscribe handles — tracked
    // separately because they can't use the AbortController signal.
    let eventsAbortController = null;
    let offResize = null;
    const offElementResizes = [];
    const offDOMWatches = [];
    let initDone = false;

    function bindGlobalEvents(signal) {
        window.addEventListener('orientationchange', () => {
            primaryMaxHeightCached = null;
            setTimeout(scheduleUpdate, 150);
        }, { passive: true, signal });

        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.nds-has-menu > .nds-nav-link');
            if (trigger) { e.preventDefault(); toggleMenu(trigger.parentElement); }
            if (e.target.closest('.nds-nav-toggler')) { e.preventDefault(); toggleNavbar(); }
        }, { signal });

        // When a modal opens, dismiss any open nav drawer/dropdowns so the
        // modal sits on a clean overlay. Closing the drawer cascades to
        // close any dropdowns inside it via navbar.toggle().
        document.addEventListener('nds:modal:opened', () => {
            if (hasState(dom.collapse, 'open')) toggleNavbar();
            else dropdown.closeAll();
        }, { signal });

        // Same-page anchor navigation — close nav and scroll to target
        dom.nav?.addEventListener('click', (e) => {
            const anchor = e.target.closest('a[href*="#"]');
            if (!anchor || anchor.closest('.nds-has-menu')) return;

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

            const wasNavOpen = hasState(dom.collapse, 'open');
            const openCount = openDropdowns.size;

            if (wasNavOpen) toggleNavbar();
            else dropdown.closeAll();

            const delay = wasNavOpen || openCount ? NDS.transitionSpeed() + 100 : 0;

            setTimeout(() => {
                target.scrollIntoView({ behavior: behavior(), block: 'start' });
                history.replaceState(history.state, '', `#${hash}`);   // a router keeps its state
            }, delay);
        }, { signal });

        dom.collapse?.addEventListener('transitionend', (e) => {
            if (e.target === dom.collapse && e.propertyName === 'height') scheduleUpdate();
        }, { signal });
    }

    function bindMutationAndResizeObservers() {
        // Captured, unlike before: reinit() re-runs this, and an uncaptured pooled
        // subscriber would stack one closure per re-run for the page lifetime.
        offDOMWatches.splice(0).forEach(off => off());
        const navChanged = NDS.debounce(() => { state._navChanged = true; scheduleUpdate(); }, 100);
        offDOMWatches.push(
            NDS.onDOMAdd('.nds-nav-item, .nds-has-menu', navChanged),
            NDS.onDOMRemove('.nds-nav-item, .nds-has-menu', navChanged),
        );

        // Steady-state resize: coalesce storms before the recompute.
        // CSS flex owns the width budget, but JS still owns the has-more
        // overflow flag — `.nds-nav-primary`'s clientWidth changes whenever
        // the container shrinks, and only `overflow.check()` flips has-more
        // (which un-hides `.nds-show-more` via the sibling selector at
        // _main-nav.scss:281). Without this call, resizing past the items'
        // intrinsic width leaves the nav scroll-only with no show-more.
        const onNavResize = NDS.debounce(() => {
            primaryMaxHeightCached = null;
            scheduleUpdate();
            overflow.schedule('immediate');
        }, 100);

        // Routes primary's ResizeObserver entries to onNavResize when primary
        // changes size meaningfully (≥ 5px on either axis to drop spurious
        // sub-pixel deliveries). CSS flex sizing owns primary's width budget;
        // this handler only triggers downstream JS work (mode-flip check,
        // toggler visibility, overflow recheck) via scheduleUpdate.
        // Pre-JSA-15 this also observed dom.nav (for updateNavMaxWidth's
        // navW input). With that gone, NDS.onResize fully covers window-level
        // size changes — observing just primary is enough.
        const navResizeHandler = (entry) => {
            const { width, height } = entry.contentRect;
            const last = entry.target._lastSize;
            if (last && Math.abs(width - last.w) <= 5 && Math.abs(height - last.h) <= 5) return;
            entry.target._lastSize = { w: width, h: height };
            onNavResize();
        };

        if (dom.primary) {
            offElementResizes.push(NDS.onElementResize(dom.primary, navResizeHandler));
        }
    }

    function setupEventListeners() {
        // Abort prior subscriptions so a re-run doesn't stack listeners.
        if (eventsAbortController) eventsAbortController.abort();
        eventsAbortController = new AbortController();
        const { signal } = eventsAbortController;

        if (offResize) { offResize(); offResize = null; }
        offResize = NDS.onResize(() => { primaryMaxHeightCached = null; scheduleUpdate(); });

        offElementResizes.splice(0).forEach(off => off());

        bindGlobalEvents(signal);
        bindMutationAndResizeObservers();
    }

    // ==============================================
    // INITIALIZATION
    // ==============================================
    // Re-resolve the markup and wire it, whether or not a prior pass found anything.
    //
    // Two cases reach here, and both are the same fix. A nav that did not exist when the
    // bundle ran (a framework consumer whose chrome mounts after the deferred script — the
    // cold-load case, where every dom ref captured null and the nav was inert for the whole
    // session), and a nav REPLACED at runtime by a route change, where the refs point at
    // detached nodes. Neither used to recover, and neither said anything: CSS paints the
    // chrome either way, so it looks correct and no click does anything.
    //
    // Only a CHANGE OF NODE counts — or, under a kept root, a swapped-out collapse or a
    // reverted [hidden] on it, which is how a diffing framework re-renders the nav (the
    // markup ships [hidden]; init strips it and nothing puts it back). This is the
    // NDS.init.refresh hook, so it fires on every
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
        if (initDone && dom.nav === live && live.isConnected
            && dom.collapse?.isConnected && !dom.collapse.hasAttribute('hidden')) return;
        if (!captureDOM()) return;
        initDone = false;
        init();
    }

    function init() {
        // Entry guard: mainnav is a singleton, so repeat init() calls are no-ops. Use
        // reinit() when the markup itself changed — it re-resolves dom and rewires.
        if (initDone || !dom.collapse) return;
        initDone = true;

        // syncMode calls managePABPlacement when the state transitions;
        // only run the explicit pass when it didn't, otherwise PAB placement
        // walks every .nds-pinned twice and re-prepends nodes already in place.
        const modeSynced = syncMode();

        // Strip [hidden] from #nds-nav-collapse so the universal
        // `[hidden]{display:none!important}` rule no longer blocks the
        // hamburger open transition. Markup ships with [hidden] to skip
        // layout pre-init; placed after syncMode so the nav's
        // minimal mode is set first, then the collapse becomes visible in
        // its correct breakpoint layout (display:none mobile /
        // display:flex desktop). Hamburger click can now animate freely.
        removeCollapseHidden();
        // Closed is the start state, and dropdown.toggle only writes on a flip.
        // Ours ships the attribute; stamp it for consumer markup that doesn't.
        dom.nav.querySelectorAll('.nds-has-menu > .nds-nav-link:not([aria-expanded])')
            .forEach(link => NDS.aria.expanded(link, false));
        setupEventListeners();
        // handleDocumentClick shares the setupEventListeners AbortController so
        // both document-click listeners detach atomically on teardown. It
        // fast-bails when nothing is open, so it's cheap on the common click.
        document.addEventListener('click', (e) => handleDocumentClick(e), { signal: eventsAbortController.signal });
        if (!modeSynced) managePABPlacement();
        // Read the nav composition now that PABs (if any) have been placed.
        // scheduleUpdate's only call site for this fires on width/mode/nav
        // changes — none of which trigger on first load — so without this,
        // a page that loads in minimal with an empty collapse panel (e.g.
        // primary empty, secondary all PABs) would leave the toggler
        // CSS-visible with nothing to expose, and .nds-nav-actions unstamped.
        checkNavComposition();

        if (hasState(dom.collapse, 'open')) recheckDrawerOverflow();
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
    // `--nds-minimal-nav-bp`. scheduleUpdate's syncMode call then
    // sees the mismatch between .nds-main-nav.nds-minimal and the new state.isMinimal
    // and runs the mode-transition logic (close dropdowns, drawer cleanup,
    // PAB placement). Replaces the old windowWidth-vs-minimalBp poll.
    mqMinimal.addEventListener('change', () => {
        if (!initDone) return;
        primaryMaxHeightCached = null;
        scheduleUpdate();
    });

    // Release every listener and observer, and the backdrop. The markup stays; reinit() wires it again.
    function destroy() {
        if (!initDone) return;
        initDone = false;
        cancelToggleAction();
        eventsAbortController?.abort();
        eventsAbortController = null;
        interactionsAbortController?.abort();
        interactionsAbortController = null;
        if (offResize) { offResize(); offResize = null; }
        offElementResizes.splice(0).forEach(off => off());
        offDOMWatches.splice(0).forEach(off => off());
        openDropdowns.clear();
        hideNavBackdrop(navBackdropOwner);
    }

    const drawerOpen = () => hasState(dom.collapse, 'open');

    NDS.MainNav = {
        init,
        reinit,
        destroy,
        open: () => { if (!drawerOpen()) toggleNavbar(); },
        close: () => { if (drawerOpen()) toggleNavbar(); },
        toggle: () => toggleNavbar(),
        openMenu: (trigger) => {
            const dd = trigger?.closest('.nds-has-menu');
            if (dd && !hasState(dd, 'open')) toggleMenu(dd);
        },
        closeMenus: () => { dropdown.closeAll(); },
    };
})();
