/* NDS.Accessibility — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Accessibility.init(triggerEl?)         build and wire the panel
 *   NDS.Accessibility.open(triggerEl?) / .close() / .toggle(triggerEl?)
 *                                              triggerEl: the calling element — used as the
 *                                              cold-arm loading target and toggleBtn; omit it
 *                                              to fall back to the page's [data-accessibility-toggle]
 *   NDS.Accessibility.toggleMode(id)          turn one mode on or off
 *   NDS.Accessibility.setVisualFilter(id)     apply a colour-vision filter
 *   NDS.Accessibility.cycleSetting(id)        step a graded setting to its next tier
 *   NDS.Accessibility.reset()                 back to defaults (asks for confirmation)
 *   NDS.Accessibility.state                   a deep CLONE of the saved state — read-only
 *   NDS.Accessibility.ready                   true once the panel is built AND wired; false
 *                                             while the bundle loads or the panel builds
 * Events:
 *   (none)
 * Hooks:
 *   data-accessibility-panel · data-accessibility-toggle · data-accessibility-action
 *   (the panel markup lives in this file, not the page HTML — built into a
 *   <template> and pulled out on arm by the id the FAB's data-panel-toggle names)
 *   data-a11y-mode · data-a11y-visual · data-a11y-setting · data-a11y-value
 *   data-a11y-exclude-token   opt a subtree out of a mode's token overrides
 *   data-armed                the panel gate (see below)
 *   written on <html>: data-a11y — the token list of active modes
 * Gotchas:
 *   - Every mode is a CSS token override in _variables-a11y.scss. This file only manages
 *     state, persistence, focus and the panel lifecycle — styling is never done here.
 *   - This file is a BUNDLE, not a <script> tag: nds-loader.js registers it `lazy`, so
 *     nothing here is downloaded until the FAB is pressed — or, for a visitor whose
 *     saved prefs must apply at load, at init time via the entry's eager(). The loader
 *     stamps `loading` on the pressed trigger to cover that fetch and armedThen() below
 *     clears it, so the two read as one spinner. data-armed is stamped by init() itself
 *     once a panel exists, not written by anything external. A visitor who never presses
 *     the FAB downloads none of this.
 *   - Preferences live in localStorage under 'nds-a11y'. There is no pre-paint FOUC guard
 *     for them (removed 2026-05 in favor of the page's own pre-reveal hidden gate) — the
 *     saved state is applied by init() itself.
 *   - Panel text is loaded from assets/i18n/accessibility/{lang}.json, with English
 *     defaults in place until it resolves.
 *   - The CSS (panel + mode token overrides) is this bundle's PAIRED SHEET: the
 *     build names it in the manifest and nds-loader.js requests it alongside this
 *     file, so the two download in parallel and a page that never arms fetches
 *     neither. Nothing here loads it. A saved-prefs return visit can still show a
 *     brief unstyled flash of its active modes until the sheet lands; a consumer
 *     who cares links it blocking in <head> (see components/accessibility.md).
 */
// NDS Accessibility — site-wide a11y panel (FAB + slide-in disclosure)
//
// Modes are CSS-only token overrides in _variables-a11y.scss; this JS
// only manages state, persistence, focus, and the open/close lifecycle.
// Storage: localStorage['nds-a11y'] = { modes, bundles, excluded, settings }.
// Pattern: W3C APG Disclosure — non-blocking, page stays interactive.

(() => {
    'use strict';

    // The one panel this component ever builds or looks up — a fixed constant,
    // not read off whichever element triggered the arm. toggleBtn's own
    // data-panel-toggle is real (nds-fab.js needs it for auto-positioning,
    // Panel.js needs it to open an already-built panel later) but a custom
    // trigger passed into open()/toggle() has no obligation to carry it, and
    // trusting it here silently orphaned the whole component: resolvePanel()
    // returned null, but _initDone was already set, so nothing — not even the
    // real FAB — could ever arm it again for the rest of the page.
    const PANEL_ID = 'ndsAccessibilityPanel';

    const { add: addState, remove: removeState, has: hasState, clear: clearState } = NDS.State;

    const STORAGE_KEY = 'nds-a11y';
    const root = document.documentElement;

    // i18n strings for live-region announcements (WCAG 4.1.3) and
    // dynamically-built UI (reset confirm, reading-mask toolbar). Populated
    // by NDS.i18n.load() from assets/i18n/accessibility/{lang}.json — the
    // single source of truth. A11Y_I18N is mutated (Object.assign), never
    // reassigned, so other consts that reference it by key (e.g. SPACING_TIER
    // below) stay valid after the fetch resolves. Tile/bundle names live on
    // the visible <span class="nds-label"> in the panel markup, localized
    // in-place by the same loader.
    //
    // Seeded with English defaults so the lazy-built reading-mask toolbar
    // and live-region announcements stay accessible even when the i18n
    // fetch hasn't resolved (offline, 404, slow network). safeMerge() with
    // the loaded JSON overwrites these in place.
    const A11Y_I18N = {
        on: 'on', off: 'off', set: 'set to', active: 'active',
        reset: 'All accessibility settings reset to default.',
        reset_done: 'Settings reset',
        confirm_reset: 'Click again to confirm',
        confirm_reset_msg: 'Press the reset button again to confirm.',
        confirm_reset_remaining: 'Confirm reset within {n} seconds.',
        reset_cancelled: 'Reset cancelled.',
        default: 'Default',
        start: 'Start', end: 'End', justify: 'Justify',
        small: 'Small', medium: 'Medium', large: 'Large',
        mask_toolbar: 'Reading mask controls',
        mask_size_down: 'Decrease mask band',
        mask_size_up: 'Increase mask band',
        mask_grab: 'Drag mask vertically. Use arrow keys to nudge.',
        mask_close: 'Close reading mask',
    };

    // Letter cycle 0/0.04/0.08/0.12em and word cycle 0/0.16/0.32/0.48em both
    // step Default → Small → Medium → Large, so one tier map covers both.
    // Indirected through A11Y_I18N so locale swaps land at runtime.
    const SPACING_TIER = {
        '0':       'default',
        '0.04em':  'small',  '0.08em':  'medium',  '0.12em':  'large',
        '0.16em':  'small',  '0.32em':  'medium',  '0.48em':  'large',
    };

    const RESET_CONFIRM_MS = 5000;  // arming window
    const RESET_DONE_MS = 2000;     // post-reset success flash

    // Bundles map an accordion-section toggle to a recipe of
    // { primitives: [...], settings: { ... } }. `[...]` is sugar for
    // `{ primitives: [...] }`.
    //
    // SOURCE OF TRUTH for the bundle → primitives mapping. The summary
    // block at the bottom of _variables-a11y.scss is documentation only.
    //
    // `settings` is the bundle's "opening position" — applied on activation
    // for keys still at default (see toggleMode), restored on deactivation
    // for keys the user didn't manually re-cycle.
    const MODE_BUNDLES = {
        'epilepsy-safe':        ['reduce-motion', 'low-saturation'],          // WCAG 2.3.1
        'visually-impaired':    {                                              // WCAG 1.4.6 + 1.30× scale
            primitives: ['high-contrast'],
            settings:   { 'font-step': 2 },
        },
        'cognitive-disability': ['highlight-titles', 'reduce-motion'],
        'motor-impaired':       [],                                            // SCSS-only effect (rings + 48×48)
        'colorblind':           ['cvd-deutan'],
        'dyslexia-friendly':    {                                              // OpenDyslexic + WCAG 1.4.8 spacing
            primitives: ['dyslexia', 'highlight-links'],
            settings:   { 'line-height': '1.6', 'letter-spacing': '0.12em', 'word-spacing': '0.16em' },
        },
        'adhd-friendly':        ['reduce-motion', 'highlight-titles', 'reading-mask'],
    };

    // Normalize a bundle entry. Arabic carve-out: CSS letter-spacing breaks
    // cursive ligatures, so the bundle's letter-spacing setting is dropped
    // when document language is Arabic. line-height + word-spacing + the
    // font primitives still apply.
    function bundleRecipe(name) {
        const entry = MODE_BUNDLES[name];
        if (!entry) return { primitives: [], settings: null };
        if (Array.isArray(entry)) return { primitives: entry, settings: null };
        let settings = entry.settings || null;
        if (settings && NDS.lang === 'ar' && 'letter-spacing' in settings) {
            const stripped = {};
            for (const k in settings) if (k !== 'letter-spacing') stripped[k] = settings[k];
            settings = stripped;
        }
        return { primitives: entry.primitives || [], settings };
    }

    // Mutex group — clicking any of these mutes the others (filters compose
    // multiplicatively; users want exactly one).
    const VISUAL_FILTERS = ['boost-contrast', 'monochrome', 'high-contrast', 'high-saturation', 'low-saturation', 'cvd-deutan'];

    // OS-supplied preferences auto-supply the matching primitive token
    // (same way bundles do). state.excluded still wins.
    const OS_MQ = {
        'reduce-motion': matchMedia('(prefers-reduced-motion: reduce)'),
        'high-contrast': matchMedia('(prefers-contrast: more)'),
    };
    function isSuppliedByOS(name) {
        return !!(OS_MQ[name] && OS_MQ[name].matches);
    }

    // Continuous scalars → inline CSS var on <html> + presence token in
    // data-a11y. The token gates the SCSS rule so author CSS isn't
    // clobbered when an UNRELATED mod is on. font-step is NOT here — it's
    // discrete and gets folded into data-a11y as `font-step-N` directly.
    const SCALAR_PROPS = [
        { key: 'line-height',    cssVar: '--user-line-height',    token: 'has-line-height',    def: 'normal' },
        { key: 'letter-spacing', cssVar: '--user-letter-spacing', token: 'has-letter-spacing', def: '0' },
        { key: 'word-spacing',   cssVar: '--user-word-spacing',   token: 'has-word-spacing',   def: '0' },
    ];

    let state = defaultState();
    let panel = null;
    let toggleBtn = null;
    let openerEl = null;       // element that opened the panel — focus returns here
    let initAbortController = null;             // AbortController for listeners scoped to current init
    let maskAbortController = null;         // reading-mask pointer listener (lifecycle = mode on/off)
    let maskTopEl = null;
    let maskBottomEl = null;
    let maskControlsEl = null;
    let resetTimer = null;          // armed by first reset click
    let resetDoneTimer = null;      // post-reset visible-flash
    let resetCountdownTimer = null; // mid-arming SR announcement
    let _initDone = false;
    let _arming = false;       // cold build in flight — see armedThen()

    function defaultState() {
        return {
            modes:    [],                      // user-toggled primitives
            bundles:  [],                      // active accordion bundles
            excluded: [],                      // primitives the user clicked OFF; override bundle/OS
            settings: {
                'font-step': 0,                // 0 = default; 1/2/3 = N rungs up
                'text-align': 'default',
                'line-height': 'normal',
                'letter-spacing': '0',
                'word-spacing': '0',
                'mask-band': 60,               // half-height of mask clear band, px
                'mask-y': null,                // band center Y, px; null = viewport center on first activation
            },
            // Per-bundle snapshot of pre-activation settings, used by the
            // deactivation path to revert what the bundle wrote (without
            // touching values the user manually re-cycled).
            settingsSnapshots: {},
        };
    }
    const MASK_BAND_MIN = 20;
    const MASK_BAND_MAX = 160;
    const MASK_BAND_STEP = 20;
    const MASK_KEY_NUDGE = 20;
    const MASK_KEY_PAGE = 100;
    const MASK_TOOLBAR_H = 56;       // reading-mask toolbar height (fixed 4-button bar)

    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return defaultState();
            const parsed = JSON.parse(raw);
            // Route the localStorage payload through safeMerge so a planted
            // __proto__ key can't replace the rehydrated state's prototype.
            const result = NDS.i18n.safeMerge(defaultState(), parsed);
            result.settings = NDS.i18n.safeMerge(defaultState().settings, parsed.settings || {});
            if (!Array.isArray(result.bundles))  result.bundles = [];
            if (!Array.isArray(result.excluded)) result.excluded = [];
            // Strip legacy fields from earlier builds.
            if ('hidden'   in result) delete result.hidden;
            if ('position' in result) delete result.position;
            if ('oversize' in result) delete result.oversize;
            // Migrate v1 font-scale multiplier → v2 font-step ladder.
            if (result.settings && result.settings['font-scale'] != null) {
                const fs = parseFloat(result.settings['font-scale']);
                let step = 0;
                if (fs >= 1.5)        step = 3;
                else if (fs >= 1.25)  step = 2;
                else if (fs >= 1.15)  step = 1;
                result.settings['font-step'] = step;
                delete result.settings['font-scale'];
            }
            // Move bundle names that ended up in state.modes into state.bundles.
            const newModes = [];
            const newBundles = [...result.bundles];
            (result.modes || []).forEach(m => {
                if (MODE_BUNDLES[m]) {
                    if (!newBundles.includes(m)) newBundles.push(m);
                } else {
                    if (!newModes.includes(m)) newModes.push(m);
                }
            });
            result.modes = newModes;
            result.bundles = newBundles;
            // Rename smart-contrast → boost-contrast (legacy name).
            const sci = result.modes.indexOf('smart-contrast');
            if (sci !== -1) result.modes[sci] = 'boost-contrast';
            return result;
        } catch {
            return defaultState();
        }
    }

    // (state.modes ∪ each active bundle's primitives ∪ OS-supplied) − state.excluded
    function effectiveTokens() {
        const tokens = new Set(state.modes);
        for (const k in OS_MQ) if (OS_MQ[k].matches) tokens.add(k);
        for (let i = 0; i < state.bundles.length; i++) {
            const b = state.bundles[i];
            const { primitives } = bundleRecipe(b);
            if (primitives.length > 0) {
                primitives.forEach(p => tokens.add(p));
            } else {
                tokens.add(b);                 // marker-only bundle (motor-impaired)
            }
        }
        for (let i = 0; i < state.excluded.length; i++) tokens.delete(state.excluded[i]);
        return tokens;
    }

    function isSuppliedByBundle(primitive) {
        for (let i = 0; i < state.bundles.length; i++) {
            const { primitives } = bundleRecipe(state.bundles[i]);
            if (primitives.indexOf(primitive) !== -1) return true;
        }
        return false;
    }

    // A state with nothing active has nothing worth keeping — drop the key so the
    // next visit boots cold and the panel stays inert in its template. Mask
    // geometry alone doesn't count: it only matters while its mode is on.
    // String() both sides: cycled settings come back as strings ('0' vs 0).
    function isDefaultState(s) {
        if (s.modes.length || s.bundles.length || s.excluded.length) return false;
        const def = defaultState().settings;
        for (const k in def) {
            if (k === 'mask-band' || k === 'mask-y') continue;
            if (String(s.settings[k]) !== String(def[k])) return false;
        }
        return true;
    }

    function save() {
        try {
            if (isDefaultState(state)) localStorage.removeItem(STORAGE_KEY);
            else localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {}
    }

    // Persist + push to DOM. Every state mutator ends with commit() so
    // save/apply stays atomic.
    function commit() { save(); apply(); }

    // Single source of truth for the visible state — runs after every mutation.
    function apply() {
        const s = state.settings;
        const tokens = effectiveTokens();
        const step = parseInt(s['font-step'], 10) || 0;
        if (step >= 1 && step <= 3) tokens.add('font-step-' + step);
        if (s['text-align'] && s['text-align'] !== 'default') {
            tokens.add('text-align-' + s['text-align']);
        }

        // Continuous scalars → inline var when non-default + presence token.
        SCALAR_PROPS.forEach(({ key, cssVar, def, token }) => {
            const v = s[key];
            if (v && v !== def) {
                root.style.setProperty(cssVar, v);
                tokens.add(token);
            } else {
                root.style.removeProperty(cssVar);
            }
        });

        if (tokens.size === 0) {
            root.removeAttribute('data-a11y');
        } else {
            root.setAttribute('data-a11y', Array.from(tokens).join(' '));
        }

        if (panel) syncUI();

        applyReadingMask(tokens.has('reading-mask'));
        applyMotionPause(tokens.has('reduce-motion'));
    }

    // WCAG 2.2.2 Pause, Stop, Hide. One-shot pause on activation; we don't
    // auto-resume on toggle-off (motion-sensitive users own resume).
    function applyMotionPause(active) {
        if (!active) return;
        const media = document.querySelectorAll('video[autoplay], audio[autoplay]');
        for (let i = 0; i < media.length; i++) {
            if (!media[i].paused) media[i].pause();
        }
    }

    // Reading mask — telescope-style: fixed at saved Y, only moves on
    // grab-handle drag or arrow-key nudge. Layout: [size−] [grab] [size+]
    // [close] horizontally. Persists mask-y on drag-end, mask-band on size click.
    function applyReadingMask(active) {
        if (active && !maskAbortController) {
            if (!maskTopEl) {
                maskTopEl = document.createElement('div');
                maskTopEl.className = 'nds-a11y-mask nds-a11y-mask-top';
                NDS.aria.hidden(maskTopEl, true);
                document.body.appendChild(maskTopEl);
            }
            if (!maskBottomEl) {
                maskBottomEl = document.createElement('div');
                maskBottomEl.className = 'nds-a11y-mask nds-a11y-mask-bottom';
                NDS.aria.hidden(maskBottomEl, true);
                document.body.appendChild(maskBottomEl);
            }
            if (!maskControlsEl) {
                maskControlsEl = document.createElement('div');
                maskControlsEl.className = 'nds-a11y-mask-controls';
                maskControlsEl.setAttribute('role', 'toolbar');
                // Toolbar builds lazily on first reading-mask activation, so
                // the i18n fetch has resolved long before this runs (user must
                // open the panel and toggle the mask first). Built via
                // createElement so JSON-sourced labels can't break out of the
                // attribute via innerHTML string concat.
                NDS.aria.label(maskControlsEl, A11Y_I18N.mask_toolbar);
                [
                    { action: 'size-down', icon: 'nds-icon nds-hgi-zoom-out-area',         label: A11Y_I18N.mask_size_down },
                    { action: 'size-up',   icon: 'nds-icon nds-hgi-zoom-in-area',          label: A11Y_I18N.mask_size_up   },
                    { action: 'grab',      icon: 'hgi hgi-stroke hgi-arrow-all-direction', label: A11Y_I18N.mask_grab      },
                    { action: 'close',     icon: 'nds-icon nds-hgi-cancel-01',             label: A11Y_I18N.mask_close     },
                ].forEach(({ action, icon, label }) => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'nds-btn nds-subtle nds-icon-only';
                    btn.dataset.action = action;
                    NDS.aria.label(btn, label || '');
                    const i = document.createElement('i');
                    i.className = icon;
                    NDS.aria.hidden(i, true);
                    btn.appendChild(i);
                    maskControlsEl.appendChild(btn);
                });
                document.body.appendChild(maskControlsEl);
            }

            const grabBtn = maskControlsEl.querySelector('[data-action="grab"]');
            // Fixed-size 4-button control bar — its height is constant, so the
            // MASK_TOOLBAR_H constant stands in for an offsetHeight read that
            // would otherwise force a reflow when the mask activates during init.
            const toolbarH = MASK_TOOLBAR_H;

            let currentY = state.settings['mask-y'];
            if (typeof currentY !== 'number' || currentY < 0 || currentY > window.innerHeight) {
                currentY = window.innerHeight / 2;
            }

            // Deferred one frame past activation: reading-mask can turn on
            // synchronously from init() on a return visit (saved prefs), and
            // these two vary by breakpoint/theme so — unlike MASK_TOOLBAR_H —
            // they can't be hardcoded; rAF keeps the read off the init path.
            let headerOffset = 72;
            let toolbarGap = 8;
            const readGeometry = () => {
                headerOffset = parseFloat(getComputedStyle(root).getPropertyValue('--nds-nav-height')) || 72;
                toolbarGap = parseFloat(getComputedStyle(root).getPropertyValue('--spacing-md')) || 8;
            };

            const render = () => {
                const vh = window.innerHeight;
                const band = state.settings['mask-band'] || 60;
                // Clamp by viewport edges + sticky header (NOT toolbar height,
                // so the band can reach the very last row of content).
                currentY = Math.max(
                    band + headerOffset,
                    Math.min(vh - band, currentY)
                );
                const bandTop    = currentY - band;
                const bandBottom = currentY + band;

                // Top mask: anchor BOTTOM edge to bandTop via calc(- 100%)
                // — 100% resolves to actual rendered height at composite,
                // independent of how 100lvh resolves.
                maskTopEl.style.transform    = `translate3d(0, calc(${currentY - band}px - 100%), 0)`;
                maskBottomEl.style.transform = `translate3d(0, ${bandBottom}px, 0)`;

                // Toolbar — fits below by default, flips above when there's
                // no room. CSS supplies `inset-block-start: var(--spacing-md)`
                // (= toolbarGap), so the flip-above branch subtracts 2× to
                // keep the gap symmetric without a hardcoded toolbar height.
                const fitsBelow = bandBottom + toolbarH + toolbarGap <= vh;
                maskControlsEl.style.transform = fitsBelow
                    ? `translate3d(-50%, ${bandBottom}px, 0)`
                    : `translate3d(-50%, calc(${bandTop - 2 * toolbarGap}px - 100%), 0)`;
            };

            const moveTo = (y) => { currentY = y; render(); };

            const persistY = () => {
                state.settings['mask-y'] = currentY;
                save();
            };

            maskAbortController = new AbortController();
            const { signal } = maskAbortController;

            // Global Esc closes the mask when the panel isn't capturing it.
            document.addEventListener('keydown', (e) => {
                if (e.key !== 'Escape' && e.key !== 'Esc') return;
                if (panel && hasState(panel, 'open')) return;
                e.preventDefault();
                toggleMode('reading-mask');
            }, { signal });

            // Toolbar click handler (delegated). Close routes through
            // toggleMode so bundle-supplied reading-mask correctly lands in
            // state.excluded (matches panel-tile semantics).
            maskControlsEl.addEventListener('click', (e) => {
                const btn = e.target.closest('button[data-action]');
                if (!btn) return;
                const action = btn.dataset.action;
                if (action === 'size-up' || action === 'size-down') {
                    const cur = state.settings['mask-band'] || 60;
                    const next = action === 'size-up'
                        ? Math.min(MASK_BAND_MAX, cur + MASK_BAND_STEP)
                        : Math.max(MASK_BAND_MIN, cur - MASK_BAND_STEP);
                    if (next === cur) return;
                    state.settings['mask-band'] = next;
                    save();
                    render();
                } else if (action === 'close') {
                    toggleMode('reading-mask');
                }
            }, { signal });

            // Pointer-capture drag with delta math. Works for mouse / touch / pen.
            let dragging = false;
            let dragStartY = 0;
            let dragStartBandY = 0;

            grabBtn.addEventListener('pointerdown', (e) => {
                dragging = true;
                dragStartY = e.clientY;
                dragStartBandY = currentY;
                addState(grabBtn, 'dragging');
                if (grabBtn.setPointerCapture) {
                    try { grabBtn.setPointerCapture(e.pointerId); } catch {}
                }
                e.preventDefault();
            }, { signal });

            // rAF-throttle so high-frequency pointermove events (~60–120/s on
            // drag) collapse to one DOM write per frame. The dragging guard
            // stays OUTSIDE the rAF closure so a stale move queued between
            // pointerup and the next frame can't render a frame after release.
            const onMaskMove = NDS.rafThrottle((deltaY) => {
                if (!dragging) return;
                moveTo(dragStartBandY + deltaY);
            });
            grabBtn.addEventListener('pointermove', (e) => {
                if (!dragging) return;
                onMaskMove(e.clientY - dragStartY);
            }, { signal });

            const endDrag = (e) => {
                if (!dragging) return;
                dragging = false;
                clearState(grabBtn);
                if (grabBtn.releasePointerCapture && e && e.pointerId != null) {
                    try { grabBtn.releasePointerCapture(e.pointerId); } catch {}
                }
                persistY();
            };
            grabBtn.addEventListener('pointerup',     endDrag, { signal });
            grabBtn.addEventListener('pointercancel', endDrag, { signal });

            // Keyboard nudge — keeps the mask usable for keyboard-only users.
            grabBtn.addEventListener('keydown', (e) => {
                let next = currentY;
                switch (e.key) {
                    case 'ArrowUp':   next -= MASK_KEY_NUDGE; break;
                    case 'ArrowDown': next += MASK_KEY_NUDGE; break;
                    case 'PageUp':    next -= MASK_KEY_PAGE;  break;
                    case 'PageDown':  next += MASK_KEY_PAGE;  break;
                    case 'Home':      next = 0;               break;
                    case 'End':       next = window.innerHeight; break;
                    default: return;
                }
                e.preventDefault();
                moveTo(next);
                persistY();
            }, { signal });

            // Re-clamp on resize so a saved Y from a taller window doesn't strand the mask.
            const offResize = NDS.onResize(() => render());
            signal.addEventListener('abort', offResize);

            requestAnimationFrame(() => { if (signal.aborted) return; readGeometry(); render(); });

        } else if (!active && maskAbortController) {
            maskAbortController.abort();
            maskAbortController = null;
            if (maskTopEl)      { maskTopEl.remove();      maskTopEl      = null; }
            if (maskBottomEl)   { maskBottomEl.remove();   maskBottomEl   = null; }
            if (maskControlsEl) { maskControlsEl.remove(); maskControlsEl = null; }
        }
    }

    // Bundle switch ON ⇔ in state.bundles. Primitive tile ON ⇔ in
    // effectiveTokens (so bundle-supplied primitives also light up).
    function isModeActive(name, tokens) {
        if (MODE_BUNDLES[name]) return state.bundles.includes(name);
        return (tokens || effectiveTokens()).has(name);
    }

    function syncUI() {
        const tokens = effectiveTokens();
        // Tile buttons reflect active state via aria-pressed + data-state~="selected"
        // in lockstep — ARIA for SR, data-state for the NDS button SCSS.
        const setPressed = (el, on) => {
            NDS.aria.pressed(el, on);
            if (on) addState(el, 'selected');
            else removeState(el, 'selected');
        };

        panel.querySelectorAll('[data-a11y-mode]').forEach(el => {
            const active = isModeActive(el.dataset.a11yMode, tokens);
            if (el.tagName === 'INPUT') el.checked = active;
            else setPressed(el, active);
        });
        // Visual filter buttons reflect EFFECTIVE state regardless of slot
        // (state.modes vs bundle primitives) so bundle-supplied filters
        // light up their tile too.
        panel.querySelectorAll('button[data-a11y-visual]').forEach(btn => {
            setPressed(btn, tokens.has(btn.dataset.a11yVisual));
        });
        // Setting tile bars: cycle's first entry is "off / default" (not a
        // level), so render (cycle.length - 1) bars and light up `idx` of them.
        panel.querySelectorAll('button[data-a11y-setting]').forEach(btn => {
            const key = btn.dataset.a11ySetting;
            const cycle = (btn.dataset.a11yCycle || '').split(',').map(s => s.trim());
            const cur = String(state.settings[key]);
            const idx = Math.max(0, cycle.indexOf(cur));
            setPressed(btn, idx > 0);
            const valEl = btn.querySelector('[data-a11y-value]');
            if (valEl) valEl.textContent = formatSettingValue(key, cur);
            const bars = btn.querySelectorAll('[data-a11y-bars] .nds-accessibility-tile-bar');
            bars.forEach((bar, i) => bar.classList.toggle('is-active', i < idx));
        });
        // Live "(n)" counter next to each accordion title. Empty when 0
        // so the title stays clean by default.
        const countActive = (collapseId, sel) => {
            const root = panel.querySelector(collapseId);
            return root ? root.querySelectorAll(sel).length : 0;
        };
        const counts = {
            modes:    countActive('#a11yModesCollapse',    'input[data-a11y-mode]:checked'),
            readable: countActive('#a11yReadableCollapse', 'button[aria-pressed="true"]'),
            visual:   countActive('#a11yVisualCollapse',   'button[aria-pressed="true"]'),
        };
        panel.querySelectorAll('[data-a11y-count]').forEach(el => {
            const n = counts[el.dataset.a11yCount] || 0;
            el.textContent = n > 0 ? String(n) : '';
        });
        // SR sibling — visible badge is aria-hidden so SR users would
        // otherwise miss the count entirely.
        panel.querySelectorAll('[data-a11y-count-sr]').forEach(el => {
            const n = counts[el.dataset.a11yCountSr] || 0;
            el.textContent = n > 0 ? `, ${n} ${A11Y_I18N.active}` : '';
        });
    }

    // Render (cycle.length - 1) bars in [data-a11y-bars]. Idempotent.
    function populateSettingBars(btn) {
        const cycle = (btn.dataset.a11yCycle || '').split(',').map(s => s.trim());
        const barsEl = btn.querySelector('[data-a11y-bars]');
        if (!barsEl || barsEl.children.length) return;
        const levels = Math.max(0, cycle.length - 1);
        const frag = document.createDocumentFragment();
        for (let i = 0; i < levels; i++) {
            const bar = document.createElement('span');
            bar.className = 'nds-accessibility-tile-bar';
            frag.appendChild(bar);
        }
        barsEl.appendChild(frag);
    }

    function formatSettingValue(key, val) {
        if (key === 'font-step') {
            const n = parseInt(val, 10) || 0;
            return n === 0 ? A11Y_I18N.default : '+' + n;
        }
        if (key === 'text-align') {
            return A11Y_I18N[val] || A11Y_I18N.default;
        }
        if (key === 'line-height') {
            return val === 'normal' ? A11Y_I18N.default : val + '×';
        }
        if (key === 'letter-spacing' || key === 'word-spacing') {
            return A11Y_I18N[SPACING_TIER[val]] || val;
        }
        return val;
    }

    // Live-region announcer (WCAG 4.1.3) — delegates the clear-then-set
    // re-utterance to NDS.announce, scoped to the panel's own status region.
    // Passing null when the panel is absent keeps "no panel → no announce".
    function announce(msg) {
        NDS.announce(msg, panel ? panel.querySelector('[data-a11y-status]') : null);
    }

    // Resolve a localized label by reading the visible <span class="nds-label">.
    function labelFor(name) {
        if (!panel) return name;
        const el = panel.querySelector(
            '[data-a11y-mode="' + name + '"], [data-a11y-visual="' + name + '"]'
        );
        if (!el) return name;
        const lab = el.querySelector('.nds-label');
        return lab ? lab.textContent.trim() : name;
    }

    function settingLabelFor(key) {
        if (!panel) return key;
        const btn = panel.querySelector('[data-a11y-setting="' + key + '"]');
        if (!btn) return key;
        const lab = btn.querySelector('.nds-label');
        return lab ? lab.textContent.trim() : key;
    }

    // ----------------------------------------------
    // Mutators — every change goes through these so apply() + save() stay paired.
    // ----------------------------------------------
    function toggleMode(name) {
        if (MODE_BUNDLES[name]) {
            const i = state.bundles.indexOf(name);
            if (i >= 0) {
                // Deactivate. Restore snapshotted settings only where the
                // current value still matches what the bundle wrote (i.e.,
                // the user didn't manually re-cycle the tile mid-session).
                state.bundles.splice(i, 1);
                const snapshot = state.settingsSnapshots[name];
                if (snapshot) {
                    const { settings: bundleSettings } = bundleRecipe(name);
                    for (const k in snapshot) {
                        if (bundleSettings && state.settings[k] !== bundleSettings[k]) continue;
                        state.settings[k] = snapshot[k];
                    }
                    delete state.settingsSnapshots[name];
                }
            } else {
                // Activate. Clear any user-side exclusions on this bundle's
                // primitives so re-toggling is a fresh activation, not a
                // silent "minus N effects" customization.
                state.bundles.push(name);
                const { primitives, settings } = bundleRecipe(name);
                if (primitives.length && state.excluded.length) {
                    state.excluded = state.excluded.filter(p => !primitives.includes(p));
                }
                // Snapshot current values + apply bundle defaults — but
                // ONLY where the user is still at default (don't clobber
                // user tuning).
                if (settings) {
                    const defaults = defaultState().settings;
                    const snapshot = {};
                    for (const k in settings) {
                        snapshot[k] = state.settings[k];
                        if (state.settings[k] === defaults[k]) {
                            state.settings[k] = settings[k];
                        }
                    }
                    state.settingsSnapshots[name] = snapshot;
                }
            }
        } else {
            // PRIMITIVE — four supply slots: state.modes (user-direct),
            // state.excluded (user-direct removal), bundle, OS. Effective
            // ON ≡ (in modes OR supplied) AND NOT excluded.
            const inModes   = state.modes.indexOf(name)   !== -1;
            const excluded  = state.excluded.indexOf(name) !== -1;
            const supplied  = isSuppliedByBundle(name) || isSuppliedByOS(name);
            const effective = (inModes || supplied) && !excluded;

            if (effective) {
                if (inModes) state.modes = state.modes.filter(m => m !== name);
                if (supplied && !excluded) state.excluded.push(name);
            } else {
                if (excluded) {
                    state.excluded = state.excluded.filter(p => p !== name);
                    if (!supplied && !inModes) state.modes.push(name);
                } else if (!inModes) {
                    state.modes.push(name);
                }
            }
        }
        commit();

        const isOn = MODE_BUNDLES[name]
            ? state.bundles.includes(name)
            : effectiveTokens().has(name);
        announce(labelFor(name) + ' ' + (isOn ? A11Y_I18N.on : A11Y_I18N.off));
    }

    function setVisualFilter(filter) {
        // Visual filters are mutex AND can be supplied via state.modes,
        // bundle primitives, or OS — toggle has to manage all three so
        // bundle-/OS-supplied filters can't stack with the user's pick.
        const tokens = effectiveTokens();
        const wasActive = tokens.has(filter);
        const suppliedElsewhere = n => isSuppliedByBundle(n) || isSuppliedByOS(n);

        if (wasActive) {
            // Turn off — strip from modes, exclude if supplied elsewhere.
            if (state.modes.includes(filter)) {
                state.modes = state.modes.filter(m => m !== filter);
            }
            if (suppliedElsewhere(filter) && !state.excluded.includes(filter)) {
                state.excluded.push(filter);
            }
        } else {
            // Turn on — mute every OTHER filter first, in both slots.
            VISUAL_FILTERS.forEach(other => {
                if (other === filter) return;
                const i = state.modes.indexOf(other);
                if (i >= 0) state.modes.splice(i, 1);
                if (suppliedElsewhere(other) && !state.excluded.includes(other)) {
                    state.excluded.push(other);
                }
            });
            const ei = state.excluded.indexOf(filter);
            if (ei >= 0) state.excluded.splice(ei, 1);
            if (!suppliedElsewhere(filter) && !state.modes.includes(filter)) {
                state.modes.push(filter);
            }
        }
        commit();

        announce(labelFor(filter) + ' ' + (wasActive ? A11Y_I18N.off : A11Y_I18N.on));
    }

    function cycleSetting(key, cycleArr) {
        const cur = String(state.settings[key]);
        const idx = cycleArr.indexOf(cur);
        const next = cycleArr[(idx + 1) % cycleArr.length];
        state.settings[key] = next;
        commit();
        announce(settingLabelFor(key) + ' ' + A11Y_I18N.set + ' ' + formatSettingValue(key, next));
    }

    function reset() {
        state = defaultState();
        commit();
        announce(A11Y_I18N.reset);
        flashResetDone();
    }

    // Visible reset confirmation for sighted users — uses the shared
    // .nds-btn[data-status="success"] styling from _buttons.scss.
    function flashResetDone() {
        if (!panel) return;
        const btn = panel.querySelector('[data-accessibility-action="reset"]');
        if (!btn) return;
        const lbl = btn.querySelector('.nds-label');
        if (!lbl) return;
        if (resetDoneTimer) clearTimeout(resetDoneTimer);
        if (!btn.dataset.flashOriginal) btn.dataset.flashOriginal = lbl.textContent;
        // Insert icon as direct button child before the label. The
        // .nds-btn[data-status="success"] rule in _buttons.scss auto-swaps
        // any child .nds-icon to a checkmark via the shared --nds-icon var.
        // Tagged with data-flash-icon so the timer / pre-empt paths find it.
        if (!btn.querySelector(':scope > [data-flash-icon]')) {
            const icon = document.createElement('i');
            icon.className = 'nds-icon';
            icon.dataset.flashIcon = '';
            NDS.aria.hidden(icon, true);
            btn.insertBefore(icon, lbl);
        }
        lbl.textContent = A11Y_I18N.reset_done;
        NDS.Status.set(btn, 'success');
        resetDoneTimer = setTimeout(() => {
            resetDoneTimer = null;
            if (btn.dataset.flashOriginal) {
                lbl.textContent = btn.dataset.flashOriginal;
                delete btn.dataset.flashOriginal;
            }
            const icon = btn.querySelector(':scope > [data-flash-icon]');
            if (icon) icon.remove();
            NDS.Status.clear(btn);
        }, RESET_DONE_MS);
    }

    // Two-click reset confirmation. Visible countdown via the
    // .nds-progress button pattern (components/button.md → Animated Progress).
    function handleResetClick(btn) {
        // Restore the real label if a post-reset flash is mid-flight, so
        // arming doesn't capture "Settings reset" as the original.
        if (resetDoneTimer) {
            clearTimeout(resetDoneTimer);
            resetDoneTimer = null;
            const lbl = btn.querySelector('.nds-label');
            if (lbl && btn.dataset.flashOriginal) {
                lbl.textContent = btn.dataset.flashOriginal;
                delete btn.dataset.flashOriginal;
            }
            const icon = btn.querySelector(':scope > [data-flash-icon]');
            if (icon) icon.remove();
            NDS.Status.clear(btn);
        }
        if (resetTimer) {
            clearTimeout(resetTimer);
            resetTimer = null;
            if (resetCountdownTimer) { clearTimeout(resetCountdownTimer); resetCountdownTimer = null; }
            restoreResetLabel(btn);
            reset();
            return;
        }
        const lbl = btn.querySelector('.nds-label');
        if (!lbl) { reset(); return; }
        btn.dataset.originalLabel = lbl.textContent;
        lbl.textContent = A11Y_I18N.confirm_reset;
        addState(btn, 'arming');
        btn.style.setProperty('--progress-duration', RESET_CONFIRM_MS + 'ms');
        btn.classList.add('nds-progress');
        announce(A11Y_I18N.confirm_reset_msg);
        // Mid-window reminder so SR users aren't navigating blind through the
        // 5s arming window (countdown is purely visual otherwise — WCAG 2.2.3).
        const remainingMs = 2000;
        const remainingSec = Math.round(remainingMs / 1000);
        resetCountdownTimer = setTimeout(() => {
            resetCountdownTimer = null;
            // Only announce if still armed — the second-click path already
            // cleared the timer and announced the success message.
            if (resetTimer) {
                const tpl = A11Y_I18N.confirm_reset_remaining || 'Confirm reset within {n} seconds.';
                announce(tpl.replace('{n}', remainingSec));
            }
        }, RESET_CONFIRM_MS - remainingMs);
        resetTimer = setTimeout(() => {
            resetTimer = null;
            if (resetCountdownTimer) { clearTimeout(resetCountdownTimer); resetCountdownTimer = null; }
            restoreResetLabel(btn);
            announce(A11Y_I18N.reset_cancelled || 'Reset cancelled.');
        }, RESET_CONFIRM_MS);
    }

    function restoreResetLabel(btn) {
        const lbl = btn.querySelector('.nds-label');
        if (lbl && btn.dataset.originalLabel) {
            lbl.textContent = btn.dataset.originalLabel;
            delete btn.dataset.originalLabel;
        }
        removeState(btn, 'arming');
        btn.classList.remove('nds-progress');
        btn.style.removeProperty('--progress-duration');
    }

    // ----------------------------------------------
    // Open / Close — NDS.Panel owns the lifecycle: the slide, the sticky-header
    // offset, scroll re-measurement, Escape, outside-click, and focus-in. What
    // stays here is only what Panel cannot know about:
    //   • the lazy-arm boot gate: the FAB IS a [data-panel-toggle] (data-fab-pos
    //     "auto" needs it to find the panel's side), so the boot gate's capture
    //     listener has to pre-empt Panel's own delegated handler on the FAB's
    //     first click — see bootAccessibility() at the bottom of this file;
    //   • the cold-arm loading affordance, covering the first (heavy) build —
    //     shared by every trigger via open()/toggle() below, not just the FAB;
    //   • mirroring open state onto the FAB, since Panel only manages the
    //     toggles it owns.
    // Soft dependency — NDS.Panel ships in the delegated bundle and a consumer
    // can omit it; the FAB then no-ops instead of throwing. Checked explicitly
    // (not just optional-chained) because a still-stubbed NDS.Panel answers
    // ANY call with a Promise — always truthy — which would read as "open" and
    // wrongly trigger close() on a panel Panel.js never actually opened.
    // ----------------------------------------------
    const panelIsOpen = () => !!(panel && NDS.Panel && !NDS.Panel.__ndsStub && NDS.Panel.isOpen(panel));

    // The boot gate only arms on a saved-prefs load or a FAB click, so a consumer
    // wiring their own trigger — the documented pattern — would otherwise call into
    // a component with no panel reference yet and get silence. Arming here keeps
    // the no-prefs, no-interaction session at zero init cost either way.
    function ensureArmed() {
        if (!_initDone) init();
        return !!panel;
    }

    // Cold-start gate — shared by EVERY trigger (the FAB, a demo button, a
    // consumer's own NDS.Accessibility.open() call), not just the FAB's own
    // click path. First call: spinner on the trigger (or a plain query when
    // there isn't one) while the panel builds and its CSS requests, THEN
    // proceed. Already armed: proceed immediately, same tick. ponytail: a
    // flat 1000ms, not an actual "CSS has loaded" wait.
    //
    // The _arming check comes FIRST and swallows the call: init() sets
    // _initDone synchronously, so a second activation inside the build window
    // would otherwise take the warm branch, open at once, and then get closed
    // again when this build's own proceed() fires. Repeat activations during a
    // cold build are noise, not a queue — the trigger is already spinning.
    // (The FAB's pointer-events go dead under .nds-loading, but keyboard
    // activation and a consumer's own open()/toggle() call do not.)
    function armedThen(proceed, triggerEl) {
        if (_arming) return;
        if (_initDone) { if (ensureArmed()) proceed(); return; }
        _arming = true;
        const fab = triggerEl || document.querySelector('[data-accessibility-toggle]');
        if (fab) NDS.State.add(fab, 'loading');
        init(triggerEl);
        setTimeout(() => {
            _arming = false;
            if (fab) NDS.State.remove(fab, 'loading');
            if (panel) proceed();
        }, 1000);
    }

    function open(triggerEl) {
        armedThen(() => {
            openerEl = document.activeElement;
            NDS.Panel?.open?.(panel);
        }, triggerEl);
    }

    function close() {
        if (panel) NDS.Panel?.close?.(panel);
    }

    function toggle(triggerEl) {
        armedThen(() => {
            openerEl = document.activeElement;
            NDS.Panel?.toggle?.(panel);
        }, triggerEl);
    }

    // ----------------------------------------------
    // Init / destroy
    // ----------------------------------------------
    function destroy() {
        // Route through close() first so Panel's open-state cleanup runs before
        // the AbortController aborts the state-mirroring listeners.
        if (panelIsOpen()) close();
        if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; }
        if (resetDoneTimer) { clearTimeout(resetDoneTimer); resetDoneTimer = null; }
        if (resetCountdownTimer) { clearTimeout(resetCountdownTimer); resetCountdownTimer = null; }
        if (initAbortController) { initAbortController.abort(); initAbortController = null; }
        if (maskAbortController) { maskAbortController.abort(); maskAbortController = null; }
        if (maskTopEl)      { maskTopEl.remove();      maskTopEl      = null; }
        if (maskBottomEl)   { maskBottomEl.remove();   maskBottomEl   = null; }
        if (maskControlsEl) { maskControlsEl.remove(); maskControlsEl = null; }
    }

    // Module-scoped so it allocates once. Function-declaration hoisting
    // keeps forward references to toggleMode/setVisualFilter/etc. valid.
    const WIRE = [
        { sel: 'input[data-a11y-mode]',     event: 'change', fn: el => toggleMode(el.dataset.a11yMode) },
        { sel: 'button[data-a11y-mode]',    event: 'click',  fn: el => toggleMode(el.dataset.a11yMode) },
        { sel: 'button[data-a11y-visual]',  event: 'click',  fn: el => setVisualFilter(el.dataset.a11yVisual) },
        { sel: 'button[data-a11y-setting]', event: 'click',
          fn: el => {
              const cycle = (el.dataset.a11yCycle || '').split(',').map(s => s.trim());
              cycleSetting(el.dataset.a11ySetting, cycle);
          },
          each: populateSettingBars,
        },
        { sel: '[data-accessibility-action]', event: 'click',
          fn: el => {
              if (el.dataset.accessibilityAction === 'reset') handleResetClick(el);
          },
        },
    ];

    // Apply locale data fetched by NDS.i18n.load(): mutate A11Y_I18N (so
    // existing key references resolve to localized strings), populate the
    // structured arrays (modes / visuals) by id, and drop tiles flagged for
    // this locale via exclude_controls (e.g. letter-spacing on Arabic, where
    // CSS letter-spacing shatters cursive ligatures).
    function applyComponentI18n(data) {
        if (!data || !panel) return;
        if (data.js) NDS.i18n.safeMerge(A11Y_I18N, data.js);

        (data.modes || []).forEach(m => {
            const row = panel.querySelector('[data-mode-id="' + m.id + '"]');
            if (!row) return;
            const n = row.querySelector('[data-i18n-name]');
            const d = row.querySelector('[data-i18n-desc]');
            if (n && m.name) n.textContent = m.name;
            if (d && m.desc) d.textContent = m.desc;
        });

        (data.visuals || []).forEach(v => {
            const tile = panel.querySelector('[data-visual-id="' + v.id + '"]');
            const lbl  = tile && tile.querySelector('[data-i18n-label]');
            if (lbl && v.label) lbl.textContent = v.label;
        });

        (data.exclude_controls || []).forEach(token => {
            panel.querySelectorAll('[data-a11y-exclude-token="' + token + '"]')
                 .forEach(el => el.remove());
        });
    }

    // Panel markup — moved out of every page's HTML (was a <template> in
    // _includes/accessibility-panel.html, ~185 inert nodes on every load) and
    // built here instead, so it exists only once armed. side comes off the
    // FAB's own data-panel-side (fallback 'end') so the FAB is the one place
    // to reposition both itself (data-fab-pos) and the panel it builds — no
    // JS edit needed for the common case.
    function panelMarkup(side) {
        return `<aside id="ndsAccessibilityPanel"
       class="nds-panel nds-accessibility-panel"
       data-panel-side="${side}"
       aria-label="Accessibility settings"
       data-i18n-attr="aria-label:panel_label"
       data-accessibility-panel
       hidden>

    <div class="nds-panel-header">
        <span class="nds-featured-icon nds-circle">
            <i class="nds-icon nds-hgi-accessibility" aria-hidden="true"></i>
        </span>
        <div class="nds-panel-text">
            <h2 class="nds-panel-title" data-i18n="panel_title">Accessibility Tools</h2>
        </div>
        <button class="nds-btn nds-subtle nds-icon-only"
                data-panel-close
                type="button"
                aria-label="Close accessibility panel"
                data-i18n-attr="aria-label:close_panel">
            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
        </button>
    </div>

    <div class="nds-panel-body">
        <div class="nds-scroll-more nds-divided">
            <div class="nds-scroll-more-content">

                <div class="nds-sr-only" data-a11y-status role="status" aria-live="polite" aria-atomic="true"></div>

                <!-- Display — quick toggle -->
                <div class="nds-accessibility-quick">
                    <button class="nds-btn nds-subtle nds-icon-only nds-theme-toggle-wrap"
                            data-theme-toggle
                            type="button"
                            aria-label="Toggle theme"
                            data-i18n-attr="aria-label:toggle_theme">
                        <i class="nds-icon nds-hgi-moon-02" aria-hidden="true"></i>
                    </button>
                </div>

        <!-- Accessibility settings — one accordion, three items:
             Modes (switches), Readable Experience (tile grid), Visually
             Pleasing (tile grid). First item open by default; the other
             two collapsed to keep the panel compact on first open. -->
        <div class="nds-accordion nds-lg nds-accessibility-modes" id="a11yAccordion">

            <!-- Item 1: Accessibility Modes (bundle switches) -->
            <div class="nds-accordion-item">
                <h3 class="nds-accordion-header">
                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn"
                            type="button"
                            aria-expanded="true"
                            data-state="open"
                            aria-controls="a11yModesCollapse">
                        <span class="nds-accordion-title"><span data-i18n="section_modes">Accessibility Modes</span> <span class="nds-a11y-count nds-tag nds-green nds-rounded nds-sm" data-a11y-count="modes" aria-hidden="true"></span><span class="nds-sr-only" data-a11y-count-sr="modes"></span></span>
                    </button>
                </h3>
                <div class="nds-accordion-collapse" id="a11yModesCollapse" data-state="open">
                    <div class="nds-accordion-content">
                        <div class="nds-accordion-body">
                            <fieldset class="nds-form-group nds-switch-group">

                                <div class="nds-form-container nds-switch-container" data-mode-id="epilepsy-safe">
                                    <div class="nds-form-header">
                                        <label for="a11y-mode-epilepsy-safe">
                                            <span class="nds-label" data-i18n-name>Epilepsy Safe Mode</span>
                                            <span class="nds-info"  data-i18n-desc>Stops motion and dampens color intensity</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch">
                                            <input type="checkbox" id="a11y-mode-epilepsy-safe" class="nds-switch-input" data-a11y-mode="epilepsy-safe">
                                            <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="nds-form-container nds-switch-container" data-mode-id="visually-impaired">
                                    <div class="nds-form-header">
                                        <label for="a11y-mode-visually-impaired">
                                            <span class="nds-label" data-i18n-name>Visually Impaired Mode</span>
                                            <span class="nds-info"  data-i18n-desc>Enlarges text and boosts contrast for clearer reading</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch">
                                            <input type="checkbox" id="a11y-mode-visually-impaired" class="nds-switch-input" data-a11y-mode="visually-impaired">
                                            <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="nds-form-container nds-switch-container" data-mode-id="cognitive-disability">
                                    <div class="nds-form-header">
                                        <label for="a11y-mode-cognitive-disability">
                                            <span class="nds-label" data-i18n-name>Cognitive Disability Mode</span>
                                            <span class="nds-info"  data-i18n-desc>Highlights titles and stops motion to reduce distraction</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch">
                                            <input type="checkbox" id="a11y-mode-cognitive-disability" class="nds-switch-input" data-a11y-mode="cognitive-disability">
                                            <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="nds-form-container nds-switch-container" data-mode-id="motor-impaired">
                                    <div class="nds-form-header">
                                        <label for="a11y-mode-motor-impaired">
                                            <span class="nds-label" data-i18n-name>Motor Impaired Mode</span>
                                            <span class="nds-info"  data-i18n-desc>Enlarges click targets and emphasizes the focus indicator</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch">
                                            <input type="checkbox" id="a11y-mode-motor-impaired" class="nds-switch-input" data-a11y-mode="motor-impaired">
                                            <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="nds-form-container nds-switch-container" data-mode-id="colorblind">
                                    <div class="nds-form-header">
                                        <label for="a11y-mode-colorblind">
                                            <span class="nds-label" data-i18n-name>Colorblind Mode</span>
                                            <span class="nds-info"  data-i18n-desc>Adjusts colors to distinguish red and green clearly</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch">
                                            <input type="checkbox" id="a11y-mode-colorblind" class="nds-switch-input" data-a11y-mode="colorblind">
                                            <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="nds-form-container nds-switch-container" data-mode-id="dyslexia-friendly">
                                    <div class="nds-form-header">
                                        <label for="a11y-mode-dyslexia-friendly">
                                            <span class="nds-label" data-i18n-name>Dyslexia Friendly Mode</span>
                                            <span class="nds-info"  data-i18n-desc>Uses a clearer font and widens line and word spacing</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch">
                                            <input type="checkbox" id="a11y-mode-dyslexia-friendly" class="nds-switch-input" data-a11y-mode="dyslexia-friendly">
                                            <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                        </div>
                                    </div>
                                </div>

                                <div class="nds-form-container nds-switch-container" data-mode-id="adhd-friendly">
                                    <div class="nds-form-header">
                                        <label for="a11y-mode-adhd-friendly">
                                            <span class="nds-label" data-i18n-name>ADHD Friendly Mode</span>
                                            <span class="nds-info"  data-i18n-desc>Stops motion, highlights titles, and enables the reading mask</span>
                                        </label>
                                    </div>
                                    <div class="nds-form-control">
                                        <div class="nds-switch">
                                            <input type="checkbox" id="a11y-mode-adhd-friendly" class="nds-switch-input" data-a11y-mode="adhd-friendly">
                                            <div class="nds-switch-track"><div class="nds-switch-thumb"></div></div>
                                        </div>
                                    </div>
                                </div>

                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Item 2: Readable Experience (tile grid) -->
            <div class="nds-accordion-item">
                <h3 class="nds-accordion-header">
                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn"
                            type="button"
                            aria-expanded="false"
                            aria-controls="a11yReadableCollapse">
                        <span class="nds-accordion-title"><span data-i18n="section_readable">Readable Experience</span> <span class="nds-a11y-count nds-tag nds-green nds-rounded nds-sm" data-a11y-count="readable" aria-hidden="true"></span><span class="nds-sr-only" data-a11y-count-sr="readable"></span></span>
                    </button>
                </h3>
                <div class="nds-accordion-collapse" id="a11yReadableCollapse">
                    <div class="nds-accordion-content">
                        <div class="nds-accordion-body">
                            <div class="nds-grid" role="group" aria-label="Readable experience controls" data-i18n-attr="aria-label:aria_readable">

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="font-step" data-a11y-cycle="0,1,2,3" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-text-smallcaps" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n="font_sizing">Font Sizing</span>
                                    <span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"></span>
                                    <span class="nds-sr-only" data-a11y-value data-i18n="default">Default</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="dyslexia" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-glasses" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n="dyslexia">Dyslexia Friendly</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="highlight-titles" aria-pressed="false">
                                    <i class="nds-icon nds-hgi-highlighter" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n="highlight_titles">Highlight Titles</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="highlight-links" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-link-04" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n="highlight_links">Highlight Links</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="reading-mask" aria-pressed="false">
                                    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n="reading_mask">Reading Mask</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-mode="reduce-motion" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-pause" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n="pause_motion">Pause Motion</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="text-align" data-a11y-cycle="default,end,start,justify" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-text-align-left" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n="text_align">Text Alignment</span>
                                    <span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"></span>
                                    <span class="nds-sr-only" data-a11y-value data-i18n="default">Default</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="line-height" data-a11y-cycle="normal,1.6,1.8,2.0" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-paragraph-spacing" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n="line_height">Line Height</span>
                                    <span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"></span>
                                    <span class="nds-sr-only" data-a11y-value data-i18n="default">Default</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="letter-spacing" data-a11y-cycle="0,0.04em,0.08em,0.12em" data-a11y-exclude-token="letter-spacing" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-letter-spacing" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n="letter_spacing">Letter Spacing</span>
                                    <span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"></span>
                                    <span class="nds-sr-only" data-a11y-value data-i18n="default">Default</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-setting="word-spacing" data-a11y-cycle="0,0.16em,0.32em,0.48em" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-text-kerning" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n="word_spacing">Word Spacing</span>
                                    <span class="nds-accessibility-tile-bars" data-a11y-bars aria-hidden="true"></span>
                                    <span class="nds-sr-only" data-a11y-value data-i18n="default">Default</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Item 3: Visually Pleasing Experience (single-pick filters + colorblind primitive) -->
            <div class="nds-accordion-item">
                <h3 class="nds-accordion-header">
                    <button class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn"
                            type="button"
                            aria-expanded="false"
                            aria-controls="a11yVisualCollapse">
                        <span class="nds-accordion-title"><span data-i18n="section_visual">Visually Pleasing Experience</span> <span class="nds-a11y-count nds-tag nds-green nds-rounded nds-sm" data-a11y-count="visual" aria-hidden="true"></span><span class="nds-sr-only" data-a11y-count-sr="visual"></span></span>
                    </button>
                </h3>
                <div class="nds-accordion-collapse" id="a11yVisualCollapse">
                    <div class="nds-accordion-content">
                        <div class="nds-accordion-body">
                            <div class="nds-grid" role="group" aria-label="Visual adjustments" data-i18n-attr="aria-label:aria_visual">

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="boost-contrast" data-visual-id="boost-contrast" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-flash" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n-label>Boost Contrast</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="monochrome" data-visual-id="monochrome" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-color-picker" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n-label>Monochrome</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="high-contrast" data-visual-id="high-contrast" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-blur" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n-label>High Contrast</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="high-saturation" data-visual-id="high-saturation" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-sparkles" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n-label>High Saturation</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="low-saturation" data-visual-id="low-saturation" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-droplet" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n-label>Low Saturation</span>
                                </button>

                                <button type="button" class="nds-btn nds-secondary-outline nds-indicator" data-a11y-visual="cvd-deutan" data-visual-id="cvd-deutan" aria-pressed="false">
                                    <i class="hgi hgi-stroke hgi-colors" aria-hidden="true"></i>
                                    <span class="nds-label" data-i18n-label>Deuteranopia</span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

            </div>
            <button class="nds-btn nds-subtle nds-show-more" type="button" aria-label="Scroll panel" data-i18n-attr="aria-label:scroll_panel">
                <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
            </button>
        </div>
    </div>

    <div class="nds-panel-footer">
        <button class="nds-btn nds-secondary-outline" type="button" data-accessibility-action="reset">
            <span class="nds-label" data-i18n="reset">Reset Settings</span>
            <div class="nds-progress-circle">
                <svg width="100%" height="100%" viewBox="0 0 24 24">
                    <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2"></circle>
                    <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2" stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round"></circle>
                </svg>
            </div>
        </button>
    </div>
</aside>`;
    }

    // Default: nothing ships in the page's HTML for this — panelMarkup() below
    // supplies the <template> content instead. Still honors a page-authored
    // <template class="nds-panel-template"> or a bare <aside> already in the
    // document (pre-1.13 markup, or a consumer's own customized copy).
    function resolvePanel() {
        const live = document.querySelector('[data-accessibility-panel]');
        if (live) return live;
        const id = PANEL_ID;
        // No page-authored <template> for this id — inject the markup this
        // bundle carries so fromTemplate can arm it exactly like one, without
        // it ever sitting in the page's HTML. data-panel-side still comes from
        // toggleBtn when it has one — a real trigger without it just gets the
        // 'end' default, same as the built-in FAB markup ships.
        if (!document.getElementById(id) && ![...document.querySelectorAll('template')].some(t => t.content.getElementById(id))) {
            const tpl = document.createElement('template');
            tpl.innerHTML = panelMarkup((toggleBtn && toggleBtn.dataset.panelSide) || 'end');
            document.body.appendChild(tpl);
        }
        const injected = NDS.fromTemplate?.(id);
        if (injected) wireInjected(injected);
        // Accordion/Panel/Fab live in an injected bundle (delegated, low-priority,
        // never gated on the reveal) that may still be a lazy stub the instant
        // fromTemplate's refresh runs — nds-loader.js skips a stub on purpose,
        // and nothing revisits content built AFTER the page's own one-time
        // detection pass, since that accordion didn't exist yet to be detected.
        // mount() loads the bundles this panel's own markup needs and nothing
        // else; it used to ask for every bundle in the manifest, which dragged
        // in extras and audit on a page that wanted neither.
        if (injected) NDS.Init?.mount?.(injected);
        return injected;
    }

    // fromTemplate's NDS.Init.refresh already armed Panel/Theme/Accordion/ScrollMore
    // (their inits are run-once / per-element guarded). What's left is the mode
    // mirror a Theme init that ran BEFORE the panel existed can't know about.
    function wireInjected(panelEl) {
        const themeBtn = panelEl.querySelector('[data-theme-toggle]');
        if (themeBtn) {
            const isDark = (root.getAttribute('data-theme') || '').split(/\s+/).includes('dark');
            NDS.aria.pressed(themeBtn, isDark);
            const icon = themeBtn.querySelector('.nds-icon');
            if (icon) {
                icon.classList.toggle('nds-hgi-sun-03', isDark);
                icon.classList.toggle('nds-hgi-moon-02', !isDark);
            }
        }
    }

    // triggerEl: the element that caused this arm (a click on it, if any) —
    // used as toggleBtn so panelMarkup() reads ITS data-panel-side and i18n
    // localizes the element the user actually sees, rather than an arbitrary
    // document-order first-match. Falls back to a plain query when arming
    // with no trigger (the saved-prefs path).
    function init(triggerEl) {
        if (_initDone) destroy();
        _initDone = true;

        toggleBtn = triggerEl || document.querySelector('[data-accessibility-toggle]');
        panel = resolvePanel();
        if (!toggleBtn || !panel) return;

        // Stamped here, not just in the boot gate, so the marker is true whichever
        // path armed the component.
        panel.setAttribute('data-armed', '');

        // commit, not bare apply: save() drops a default-state key on the spot,
        // so a stale all-defaults visitor stops arming from the next visit on.
        state = load();
        commit();

        initAbortController = new AbortController();
        const { signal } = initAbortController;

        // Panel drives open/close, aria-expanded and focus-return for the FAB,
        // which is one of its toggles. Only a programmatic open has no opener for
        // Panel to return to, so cover that case here.
        panel.addEventListener('nds:panel:closed', () => {
            if (openerEl && typeof openerEl.focus === 'function' && document.contains(openerEl)) {
                openerEl.focus();
            }
            openerEl = null;
        }, { signal });

        // Re-apply when an OS preference flips mid-session.
        for (const k in OS_MQ) {
            OS_MQ[k].addEventListener('change', () => apply(), { signal });
        }

        // Close on width change. Panel re-measures the header offset itself.
        let prevW = window.innerWidth;
        const offResize = NDS.onResize(() => {
            const w = window.innerWidth;
            if (w === prevW) return;
            prevW = w;
            if (panelIsOpen()) close();
        });
        signal.addEventListener('abort', offResize);

        WIRE.forEach(({ sel, event, fn, each }) => {
            panel.querySelectorAll(sel).forEach(el => {
                if (each) each(el);
                el.addEventListener(event, () => fn(el), { signal });
            });
        });

        // Localize FAB + panel from assets/i18n/accessibility/{lang}.json.
        // Fire-and-forget so open/close stays responsive on slow networks; on
        // EN pages the load short-circuits (no fetch) and applyComponentI18n
        // is called with null, becoming a no-op.
        NDS.i18n.load('accessibility', [toggleBtn, panel]).then(applyComponentI18n);

        syncUI();
    }

    NDS.Accessibility = {
        init,
        open, close, toggle,
        toggleMode, setVisualFilter, cycleSetting,
        reset,
        // Panel built AND wired. Not the same as [data-armed], which init()
        // stamps partway through the cold build — the boot gate has to tell
        // "still building" (swallow the click) from "done" (let Panel's own
        // delegated toggle have it) and the attribute answers yes to both.
        get ready() { return _initDone && !_arming && !!panel; },
        get state() { return structuredClone(state); },
    };
})();

