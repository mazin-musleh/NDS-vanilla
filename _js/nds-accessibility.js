// NDS Accessibility — site-wide a11y panel (FAB + slide-in dialog)
//
// Modes are CSS-only token overrides in _variables-a11y.scss; this JS
// only manages state, persistence, focus, and the open/close lifecycle.
// Storage: localStorage['nds-a11y'] = { modes, bundles, excluded, settings }.
//
// Apply-before-paint of cached state happens in _includes/head.html
// (alongside the theme FOUC guard) so reload doesn't flash.

(() => {
    'use strict';

    const { add: addState, remove: removeState, has: hasState, clear: clearState } = NDS.State;

    const STORAGE_KEY = 'nds-a11y';
    const root = document.documentElement;

    // Bundles map a single accordion-section toggle (e.g. "epilepsy-safe")
    // to a low-level recipe: { primitives: [...], settings: { ... } }.
    // The shorthand `[...]` is sugar for `{ primitives: [...] }`. Keep
    // this in sync with the comment block at the bottom of _variables-a11y.scss.
    //
    // `primitives` are tokens stamped into data-a11y while the bundle is
    // active (and removed when it's deactivated AND the user hasn't also
    // toggled them on individually).
    //
    // `settings` are values pushed into state.settings on activation —
    // matching WCAG-derived defaults for the bundle's user-need profile.
    // We treat them as an OPENING POSITION: they're applied when the
    // bundle is enabled (clobbering the user's prior values), but the
    // user can immediately re-cycle any tile to override. On bundle
    // deactivation we do NOT auto-reset settings — the user keeps the
    // last value they saw, even if it came from the bundle. This is
    // less surprising than resurrecting the pre-bundle state, which
    // would silently undo any tile cycles the user did mid-session.
    const MODE_BUNDLES = {
        // Photosensitive epilepsy: WCAG 2.3.1 (Three Flashes) baseline.
        'epilepsy-safe':        ['reduce-motion', 'low-saturation'],

        // Low vision / contrast sensitivity: WCAG 1.4.6 (Contrast Enhanced)
        // via high-contrast palette + 1.30× text scaling. The text scale
        // is delivered through the bundle's `settings` channel (same shape
        // as dyslexia-friendly's spacing settings) — sets state.settings
        // ['font-step'] = 2 so the Font Sizing tile correctly reflects
        // the active scale instead of showing "Default" while the page is
        // scaled. Snapshot/restore on deactivation is handled by the
        // existing toggleMode() machinery.
        'visually-impaired':    {
            primitives: ['high-contrast'],
            settings:   { 'font-step': 2 },
        },

        // Cognitive load: structural anchors + motion reduction.
        'cognitive-disability': ['highlight-titles', 'reduce-motion'],

        // Motor accommodation: SCSS-only effect (4px focus rings + 48×48
        // target size — exceeds WCAG 2.5.5 Enhanced 44×44 minimum).
        'motor-impaired':       [],

        // Color vision deficiency: generic catch-all filter. Per-type
        // LMS-matrix variants (deuteranopia/protanopia/tritanopia) are
        // future work — deferred until peer-reviewed Daltonization
        // matrices are wired up via SVG <feColorMatrix>. The current
        // generic filter is documented at _variables-a11y.scss.
        'colorblind':           ['colorblind'],

        // Dyslexia-specific reading aid: OpenDyslexic-first font + link
        // emphasis + WCAG 1.4.8 (Visual Presentation) text spacing.
        // OpenDyslexic's clinical efficacy is contested but some users
        // subjectively prefer it; falls back to Lexend if not installed.
        // The 1.4.8 spacing thresholds (line-height ≥ 1.5, letter-
        // spacing ≥ 0.12em, word-spacing ≥ 0.16em) are part of the
        // bundle so dyslexic readers don't have to discover and cycle
        // four separate tiles to get standards-aligned typography.
        'dyslexia-friendly':    {
            primitives: ['dyslexia', 'highlight-links'],
            settings:   { 'line-height': '1.6', 'letter-spacing': '0.12em', 'word-spacing': '0.16em' },
        },

        // Attention regulation: motion reduction + structural scaffolds +
        // reading mask (the focus aid that mirrors classroom reading-
        // guide rulers — strongest evidence-supported piece of the panel).
        'adhd-friendly':        ['reduce-motion', 'highlight-titles', 'reading-mask'],

    };

    // Normalize a bundle entry into { primitives, settings }.
    //
    // Arabic carve-out: CSS `letter-spacing` physically separates connected
    // letters in the cursive Arabic script — the WCAG 1.4.8 / 1.4.12
    // letter-spacing thresholds (designed for Latin) actively *break*
    // Arabic ligatures and reduce readability. The dyslexia-friendly
    // bundle's `letter-spacing` setting is dropped at runtime when the
    // document language is Arabic; line-height + word-spacing + the font
    // primitives still apply, so the bundle remains useful without the
    // Latin-script harm. Mirrors W3C i18n WG guidance that script-aware
    // typography overrides matter more than rote application of the
    // letter-spacing minimum.
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

    // Single-pick group — only one of these can be active at a time, since
    // their CSS filters compose multiplicatively and most users want exactly
    // one of "make it brighter / dimmer / monochrome / boosted contrast".
    const VISUAL_FILTERS = ['boost-contrast', 'monochrome', 'high-contrast', 'high-saturation', 'low-saturation'];

    // Continuous user-tunable scalars → inline custom properties on <html>
    // PLUS a presence token in data-a11y. Each entry is applied identically:
    // when the value differs from the default, write the CSS var AND stamp
    // the `token` into data-a11y; when it matches the default, remove the
    // var (no token is added). Driven by apply() in one short loop.
    //
    // Why both a CSS var AND a token: the var carries the arbitrary value
    // (e.g. 1.6, 0.04em); the token gates the SCSS rule so the override
    // only applies when the user has actually changed this scalar. Without
    // the token, the SCSS rule would reset author line-height/spacing to
    // the property's initial value whenever ANY other mod (filter,
    // high-contrast, highlight-titles, etc.) caused the scope wrapper to
    // appear — clobbering the design-system typography for unrelated mods.
    //
    // Note: `font-step` is NOT here. Although it's stored as a number
    // (0/1/2/3), it's a discrete mode token and lives in data-a11y as
    // `font-step-1` / `-2` / `-3` (apply() folds it into the token Set
    // alongside `text-align-*`). Continuous scalars stay as inline custom
    // properties because they carry an arbitrary value.
    const SCALAR_PROPS = [
        { key: 'line-height',    cssVar: '--user-line-height',    token: 'has-line-height',    def: 'normal' },
        { key: 'letter-spacing', cssVar: '--user-letter-spacing', token: 'has-letter-spacing', def: '0' },
        { key: 'word-spacing',   cssVar: '--user-word-spacing',   token: 'has-word-spacing',   def: '0' },
    ];

    let state = defaultState();
    let panel = null;
    let toggleBtn = null;
    let navEl = null;          // .nds-main-nav  — cached for updateHeaderOffset
    let topbarEl = null;       // .nds-topbar    — cached for updateHeaderOffset
    let openerEl = null;       // element that opened the panel — focus returns here
    let scopeWrapper = null;   // .nds-a11y-scope — wrapper around <header>/<main>/<footer>; created lazily by ensureScopeWrapper() the first time any mod is active, removed by removeScopeWrapper() when nothing is active
    let inertedSiblings = [];  // captured on open so close removes inert from the same nodes
    let ac = null;             // AbortController for all listeners scoped to current init
    let openAC = null;         // separate AC for listeners that only run while the panel is open
    let maskAC = null;         // separate AC for reading-mask pointer listener (lifecycle = mode on/off)
    let maskTopEl = null;      // top overlay <div> created when reading-mask is on
    let maskBottomEl = null;   // bottom overlay <div>
    let maskControlsEl = null; // floating toolbar with size +/− and grab handle
    let maskLastY = null;      // last cursor Y used to position the band; reused when only the band size changes
    let _initDone = false;

    function defaultState() {
        return {
            modes:    [],                      // user-toggled PRIMITIVES (e.g. "reading-mask")
            bundles:  [],                      // active accordion bundles (e.g. "adhd-friendly")
            excluded: [],                      // primitives the user clicked OFF; override bundle inclusions
            settings: {                        // free-form scalars
                'font-step': 0,                // 0 = default; 1/2/3 = N rungs up the typo ladder
                'text-align': 'default',
                'line-height': 'normal',
                'letter-spacing': '0',
                'word-spacing': '0',
                'mask-band': 60,               // half-height of reading-mask clear band, px
                'mask-y': null,                // band center Y in px; null = use viewport center on first activation
            },
            // Per-bundle snapshot of settings as they were JUST BEFORE the
            // bundle activated. Used by the deactivation path to revert the
            // bundle's auto-applied settings while preserving any tile the
            // user manually cycled mid-session. Keyed by bundle name; an
            // entry exists ONLY while the bundle is active. See toggleMode.
            settingsSnapshots: {},
        };
    }
    const MASK_BAND_MIN = 20;
    const MASK_BAND_MAX = 160;
    const MASK_BAND_STEP = 20;
    const MASK_KEY_NUDGE = 20;       // arrow-key step, px
    const MASK_KEY_PAGE = 100;       // PageUp/PageDown step, px
    const MASK_TOOLBAR_H = 56;       // approx toolbar height; reserved below band so the controls stay on-screen

    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return defaultState();
            const parsed = JSON.parse(raw);
            const result = Object.assign(defaultState(), parsed, {
                settings: Object.assign(defaultState().settings, parsed.settings || {}),
            });
            if (!Array.isArray(result.bundles))  result.bundles = [];
            if (!Array.isArray(result.excluded)) result.excluded = [];
            // Drop legacy `hidden` flag (Hide Forever feature was removed).
            // Without this, anyone who clicked Hide Forever in a previous
            // build would have their FAB+panel permanently invisible —
            // the SCSS rule that honored data-a11y-hidden is also gone,
            // so the flag is dead weight, but cleaning it up keeps stored
            // state lean.
            if ('hidden' in result) delete result.hidden;
            // Drop legacy `position` field (Widget Position picker was
            // removed). Position is now set Jekyll-time via the include
            // arg or runtime via <html data-a11y-pos>.
            if ('position' in result) delete result.position;
            // Drop legacy `oversize` flag (Oversize Widget switch was
            // removed). The SCSS .nds-oversize rule is also gone, so
            // the flag is dead weight; clean it up on read.
            if ('oversize' in result) delete result.oversize;
            // Migrate v1 → v2 (font-scale multiplier → font-step ladder rungs).
            // The old multiplier cycle 1/1.15/1.25/1.5 maps to step 0/1/2/3
            // on the new ladder. Drop the legacy key after translating.
            if (result.settings && result.settings['font-scale'] != null) {
                const fs = parseFloat(result.settings['font-scale']);
                let step = 0;
                if (fs >= 1.5)        step = 3;
                else if (fs >= 1.25)  step = 2;
                else if (fs >= 1.15)  step = 1;
                result.settings['font-step'] = step;
                delete result.settings['font-scale'];
            }
            // Migrate older saves: split anything in state.modes that's a
            // bundle name into state.bundles. Leaves primitives in state.modes.
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
            // Rename smart-contrast → boost-contrast in saved state.modes.
            // Earlier builds shipped the filter under the misleading
            // "smart-contrast" name (it's a flat contrast(1.15) — nothing
            // smart about it). Rewrite once on load so the SCSS selector
            // and the panel label stay consistent for returning users.
            const sci = result.modes.indexOf('smart-contrast');
            if (sci !== -1) result.modes[sci] = 'boost-contrast';
            return result;
        } catch {
            return defaultState();
        }
    }

    // Effective primitive tokens for the page:
    //   (state.modes ∪ each active bundle's primitives) − state.excluded
    //
    // Bundles and primitives are independent state — toggling a bundle never
    // affects primitives directly added by the user, and toggling a primitive
    // never affects bundle-switch state. The excluded list lets a user click
    // a tile that was switched on BY A BUNDLE and turn it off without
    // disabling the entire bundle.
    function effectiveTokens() {
        const tokens = new Set(state.modes);
        for (let i = 0; i < state.bundles.length; i++) {
            const b = state.bundles[i];
            const { primitives } = bundleRecipe(b);
            if (primitives.length > 0) {
                primitives.forEach(p => tokens.add(p));
            } else {
                tokens.add(b);                 // marker-only bundle (motor-impaired, etc.)
            }
        }
        // User-side exclusions override bundle inclusions.
        for (let i = 0; i < state.excluded.length; i++) tokens.delete(state.excluded[i]);
        return tokens;
    }

    // ----------------------------------------------
    // Page-shell scope wrapper — `.nds-a11y-scope`
    // ----------------------------------------------
    // The wrapper groups <header>/<main>/<footer> into a single element so
    // SCSS can scope filters and cosmetic mods through one selector head.
    // Benefits over targeting the three structural elements directly:
    //   • One stacking context / one compositor layer when a filter is on
    //     instead of three.
    //   • One containing block for any future position:fixed descendants.
    //   • One inert target on panel-open (cascades to all descendants).
    //
    // Created lazily — only when at least one mod is active. Removed when
    // every mod is cleared. The default DOM is identical to a build with
    // no a11y panel; we never modify the markup until there's something
    // to scope. The accessibility panel + FAB + cookie popup + reading
    // mask are body siblings of the targets and therefore stay outside
    // the wrapper, preserving their viewport-anchored fixed positioning.
    //
    // The wrap/unwrap mechanics (insertion-point math, sibling-order
    // preservation on restore, iframe/media survival on move) live in
    // NDS.wrap / NDS.unwrap (nds-core.js); ensureScopeWrapper / remove
    // ScopeWrapper just supply the targets and the wrapper class.
    function ensureScopeWrapper() {
        if (scopeWrapper && scopeWrapper.isConnected) return;
        const targets = Array.from(
            document.body.querySelectorAll(':scope > header, :scope > main, :scope > footer')
        );
        scopeWrapper = NDS.wrap(targets, { className: 'nds-a11y-scope' });
    }

    function removeScopeWrapper() {
        NDS.unwrap(scopeWrapper);
        scopeWrapper = null;
    }

    // Is a given primitive currently supplied by ANY active bundle?
    function isSuppliedByBundle(primitive) {
        for (let i = 0; i < state.bundles.length; i++) {
            const { primitives } = bundleRecipe(state.bundles[i]);
            if (primitives.indexOf(primitive) !== -1) return true;
        }
        return false;
    }

    function save() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
    }

    // Persist + push to DOM. Every state mutator ends with commit() so the
    // save/apply pair stays atomic — easy to grep and impossible to forget
    // one of the two halves.
    function commit() { save(); apply(); }

    // ----------------------------------------------
    // DOM application — single source of truth for the visible state.
    // Called after every state mutation so the UI never drifts from the
    // stored object.
    // ----------------------------------------------
    function apply() {
        // Build the full data-a11y token set ONCE — primitives, font-step,
        // text-align, AND scalar-presence tokens — so the attribute is
        // written exactly once per apply() call. Each derivative is folded
        // into the same Set, avoiding any parse-mutate-restamp dance.
        const s = state.settings;
        const tokens = effectiveTokens();
        const step = parseInt(s['font-step'], 10) || 0;
        if (step >= 1 && step <= 3) tokens.add('font-step-' + step);
        if (s['text-align'] && s['text-align'] !== 'default') {
            tokens.add('text-align-' + s['text-align']);
        }

        // Continuous scalars → inline CSS var when non-default + presence
        // token in data-a11y. The token gates the SCSS rule so the
        // override only applies when the user has actually changed this
        // scalar — author line-height / letter-spacing / word-spacing are
        // untouched when other mods (filters, high-contrast, etc.) are on.
        // See SCALAR_PROPS at the top of the IIFE for the full mapping.
        SCALAR_PROPS.forEach(({ key, cssVar, def, token }) => {
            const v = s[key];
            if (v && v !== def) {
                root.style.setProperty(cssVar, v);
                tokens.add(token);
            } else {
                root.style.removeProperty(cssVar);
            }
        });

        // Single data-a11y write
        if (tokens.size === 0) {
            root.removeAttribute('data-a11y');
        } else {
            root.setAttribute('data-a11y', Array.from(tokens).join(' '));
        }

        // Position is no longer state-driven — set at Jekyll-time via the
        // include's `position` arg or at runtime via <html data-a11y-pos>.
        // SCSS reads both. See _includes/accessibility-panel.html intro.

        // Page-shell scope wrapper — wrap <header>/<main>/<footer> in a
        // `.nds-a11y-scope` <div> when ANY mod is active (any token in
        // data-a11y, including scalar-presence tokens), unwrap otherwise.
        // Both helpers are idempotent so apply() can safely run on every
        // settings cycle — the DOM mutates only at the
        // "default ↔ any-mod" boundary, not on intra-active toggles.
        if (tokens.size > 0) ensureScopeWrapper();
        else                 removeScopeWrapper();

        // Sync UI to state — only if panel is in the DOM
        if (panel) syncUI();

        // Reading-mask pointer tracking — attach/detach based on whether the
        // expanded token list contains "reading-mask". Single pooled listener
        // via NDS.rafThrottle so frequent pointermove events don't thrash.
        applyReadingMask(tokens.has('reading-mask'));
        applyMotionPause(tokens.has('reduce-motion'));
    }

    // WCAG 2.2.2 (Pause, Stop, Hide). When reduce-motion activates, pause
    // any auto-playing video/audio one-shot. We don't auto-resume on
    // toggle-off — the user can hit play if they want it back, and that
    // matches the principle that motion-sensitive users own when to
    // resume motion. Carousel timers are out of scope (component-specific
    // state machines, not native autoplay).
    //
    // Also helps screen-reader users: autoplay audio collides with
    // AT speech, and focus-shifting animations during announcements
    // force the user to re-read.
    function applyMotionPause(active) {
        if (!active) return;
        const media = document.querySelectorAll('video[autoplay], audio[autoplay]');
        for (let i = 0; i < media.length; i++) {
            if (!media[i].paused) media[i].pause();
        }
    }

    // Reading mask — telescope-style: the mask is fixed at a saved Y position
    // and ONLY moves when the user drags the grab handle (or nudges with
    // arrow keys). No global cursor-follow, no touchstart positioning.
    //
    // Layout: a horizontal toolbar centered horizontally on the viewport,
    // pinned so its bottom edge aligns with the band's bottom edge.
    // Buttons in order: [size−] [grab] [size+]. The grab handle is the wide
    // center button — both visually the drag indicator and the only way to
    // reposition the mask via pointer.
    //
    // Persistence: state.settings['mask-y'] (band center Y in px) saves on
    // drag-end and on keyboard nudge so the user's chosen position survives
    // reloads. state.settings['mask-band'] saves on size-button click.
    function applyReadingMask(active) {
        if (active && !maskAC) {
            if (!maskTopEl) {
                maskTopEl = document.createElement('div');
                maskTopEl.className = 'nds-a11y-mask nds-a11y-mask-top';
                maskTopEl.setAttribute('aria-hidden', 'true');
                document.body.appendChild(maskTopEl);
            }
            if (!maskBottomEl) {
                maskBottomEl = document.createElement('div');
                maskBottomEl.className = 'nds-a11y-mask nds-a11y-mask-bottom';
                maskBottomEl.setAttribute('aria-hidden', 'true');
                document.body.appendChild(maskBottomEl);
            }
            if (!maskControlsEl) {
                maskControlsEl = document.createElement('div');
                maskControlsEl.className = 'nds-a11y-mask-controls';
                maskControlsEl.setAttribute('role', 'toolbar');
                maskControlsEl.setAttribute('aria-label', 'Reading mask controls');
                // Order: size− on the left, grab in the middle, size+ on the
                // right — so the grab handle is visually centered. Close
                // sits at the inline-end (right in LTR, left in RTL via the
                // flex-row reversal) as the terminal action.
                maskControlsEl.innerHTML =
                    '<button type="button" data-action="size-down" aria-label="Decrease mask band">' +
                        '<i class="nds-icon nds-hgi-zoom-out-area" aria-hidden="true"></i>' +
                    '</button>' +
                    '<button type="button" data-action="size-up" aria-label="Increase mask band">' +
                        '<i class="nds-icon nds-hgi-zoom-in-area" aria-hidden="true"></i>' +
                    '</button>' +
                    '<button type="button" data-action="grab" aria-label="Drag mask vertically. Use arrow keys to nudge.">' +
                        '<i class="hgi hgi-stroke hgi-arrow-all-direction" aria-hidden="true"></i>' +
                    '</button>' +
                    '<button type="button" data-action="close" aria-label="Close reading mask">' +
                        '<i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>' +
                    '</button>';
                document.body.appendChild(maskControlsEl);
            }

            const grabBtn = maskControlsEl.querySelector('[data-action="grab"]');
            // Measure the toolbar's actual rendered height once. Forces a
            // layout read here only — not per-frame. Used for the fit-check
            // that decides whether the toolbar goes below or above the band.
            const measuredToolbarH = maskControlsEl.offsetHeight || MASK_TOOLBAR_H;

            // Resolve initial Y: saved value if valid, otherwise viewport center.
            let currentY = state.settings['mask-y'];
            if (typeof currentY !== 'number' || currentY < 0 || currentY > window.innerHeight) {
                currentY = window.innerHeight / 2;
            }
            maskLastY = currentY;

            // Sticky-header offset is a static design token (--nds-nav-height,
            // declared in _variables-critical.scss). Read it once on activation —
            // no scroll listeners, no per-frame getBoundingClientRect.
            const headerOffset = parseFloat(getComputedStyle(root).getPropertyValue('--nds-nav-height')) || 72;
            // Toolbar gap between band edge and toolbar — matches CSS
            // .nds-a11y-mask-controls { inset-block-start: var(--spacing-md) }.
            // Read once so the JS flip-above branch can mirror the gap.
            const toolbarGap = parseFloat(getComputedStyle(root).getPropertyValue('--spacing-md')) || 8;

            const render = () => {
                const vh = window.innerHeight;
                const band = state.settings['mask-band'] || 60;
                // Clamp the band only by the viewport edges + sticky header
                // height — NOT by toolbar height, so the band can reach the
                // very last row of content (toolbar flips above when needed).
                //   • Top edge ≥ headerOffset (--nds-nav-height).
                //   • Bottom edge ≤ viewport bottom.
                currentY = Math.max(
                    band + headerOffset,
                    Math.min(vh - band, currentY)
                );
                const bandTop    = currentY - band;
                const bandBottom = currentY + band;

                // Top mask: anchor its BOTTOM edge to bandTop via calc(- 100%).
                // 100% resolves to the element's actual rendered height at
                // composite time, so this is independent of whatever 100lvh
                // computes to. Removes the old `currentY - band - vh` math
                // that mismatched when 100vh ≠ window.innerHeight on mobile.
                maskTopEl.style.transform    = `translate3d(0, calc(${currentY - band}px - 100%), 0)`;
                // Bottom mask: top edge at bandBottom — height-independent.
                maskBottomEl.style.transform = `translate3d(0, ${bandBottom}px, 0)`;

                // Toolbar — sits OUTSIDE the band, attached to whichever side
                // has room. CSS provides `inset-block-start: var(--spacing-md)`
                // which adds `toolbarGap` to the natural position.
                //
                // BELOW (default): translate by bandBottom. With the inset,
                //   final top = bandBottom + gap. ✓
                // ABOVE (flipped): use `calc(Ypx - 100%)` so the translate is
                //   relative to the element's actual height. With the inset,
                //   final top = (bandTop − 2gap) + gap − height = bandTop − gap − height.
                //   → final bottom = bandTop − gap. ✓ symmetric gap, no
                //   dependency on a hardcoded toolbar height constant.
                const fitsBelow = bandBottom + measuredToolbarH + toolbarGap <= vh;
                maskControlsEl.style.transform = fitsBelow
                    ? `translate3d(-50%, ${bandBottom}px, 0)`
                    : `translate3d(-50%, calc(${bandTop - 2 * toolbarGap}px - 100%), 0)`;

                maskLastY = currentY;
            };

            const moveTo = (y) => { currentY = y; render(); };

            const persistY = () => {
                state.settings['mask-y'] = currentY;
                save();
            };

            maskAC = new AbortController();
            const { signal } = maskAC;

            // Toolbar click handler (delegated). Size +/− clamps to [MIN, MAX]
            // and re-renders. Close routes through toggleMode so bundle-
            // supplied reading-mask correctly lands in state.excluded
            // (deactivating from the toolbar matches the panel's own tile
            // semantics — it doesn't disable the parent bundle).
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

            // Grab handle — pointer-capture drag using delta math so the mask
            // moves by the same offset as the cursor (natural drag UX). Works
            // for mouse, touch, and pen via Pointer Events.
            let dragging = false;
            let dragStartY = 0;     // cursor Y at pointerdown
            let dragStartBandY = 0; // band Y at pointerdown

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

            grabBtn.addEventListener('pointermove', (e) => {
                if (!dragging) return;
                moveTo(dragStartBandY + (e.clientY - dragStartY));
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

            // Keyboard nudge — focus the grab handle and use arrow keys /
            // PageUp/PageDown / Home / End to move the mask. Keeps the
            // feature usable for keyboard-only users.
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

            // Re-clamp on viewport resize so a saved Y from a taller window
            // doesn't leave the mask off-screen.
            const offResize = NDS.onResize(() => render());
            signal.addEventListener('abort', offResize);

            render();

        } else if (!active && maskAC) {
            maskAC.abort();
            maskAC = null;
            maskLastY = null;
            if (maskTopEl)      { maskTopEl.remove();      maskTopEl      = null; }
            if (maskBottomEl)   { maskBottomEl.remove();   maskBottomEl   = null; }
            if (maskControlsEl) { maskControlsEl.remove(); maskControlsEl = null; }
        }
    }

    // For each control:
    //   • Bundle switch  → ON iff bundle is in state.bundles (independent)
    //   • Primitive tile → ON iff the primitive is in effectiveTokens()
    //     (user-toggled directly OR included by any active bundle — so a
    //     primitive lights up whenever ANY mode is using it).
    function isModeActive(name, tokens) {
        if (MODE_BUNDLES[name]) return state.bundles.includes(name);
        return (tokens || effectiveTokens()).has(name);
    }

    function syncUI() {
        const tokens = effectiveTokens();
        // Tile-style buttons (.nds-btn) reflect their active state via TWO
        // attributes simultaneously:
        //   • aria-pressed — ARIA semantics for screen readers (toggle button)
        //   • data-state~="selected" — visual signal read by NDS button SCSS
        //     in _buttons.scss (`[data-state~="selected"]` triggers the
        //     selected background/border colors via --_btn-bg-selected)
        // Helper keeps both in sync on every UI tick.
        const setPressed = (el, on) => {
            el.setAttribute('aria-pressed', on ? 'true' : 'false');
            if (on) addState(el, 'selected');
            else removeState(el, 'selected');
        };

        // Mode controls — accordion switches (input) and Readable Experience
        // tiles (button). Branch on tagName so each control reflects active
        // state via its own contract.
        panel.querySelectorAll('[data-a11y-mode]').forEach(el => {
            const active = isModeActive(el.dataset.a11yMode, tokens);
            if (el.tagName === 'INPUT') el.checked = active;
            else setPressed(el, active);
        });
        // Visual filter buttons — pressed iff the filter is currently
        // EFFECTIVE on the page, regardless of which slot supplied it
        // (state.modes from a direct click, or a bundle's primitives via
        // effectiveTokens). Reading from `tokens` instead of state.modes
        // lets bundle-supplied filters (e.g. visually-impaired → high-
        // contrast, epilepsy-safe → low-saturation) light up their tile
        // so the user can see what the bundle activated and click to
        // override it.
        panel.querySelectorAll('button[data-a11y-visual]').forEach(btn => {
            setPressed(btn, tokens.has(btn.dataset.a11yVisual));
        });
        // Setting tile buttons (cycled). The cycle's first entry is "off /
        // default" — not a level — so the indicator renders (cycle.length - 1)
        // bars and lights up exactly `idx` of them: 0 bars at default, 1 bar
        // at level 1, 2 at level 2, etc. Bar containers were populated on init.
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
        // Live "(n)" counter next to each accordion title — gives users a
        // quick overview of how many controls are on per section without
        // having to expand each one. Counts active children inside the
        // matching accordion-collapse subtree:
        //   • modes    → checked switches (bundle toggles)
        //   • readable → tile buttons in [aria-pressed="true"]
        //   • visual   → tile buttons in [aria-pressed="true"]
        // Empty when count is 0 so the title looks clean by default.
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
    }

    // Render (cycle.length - 1) step-indicator bars inside a setting tile's
    // [data-a11y-bars] container. The first cycle entry is the off/default
    // state, not a level — so 4 cycle entries draw 3 bars (levels 1, 2, 3).
    // Idempotent: skips if bars already exist (server-rendered or re-init).
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
            const n = parseInt(val, 10);
            return n === 0 ? 'Default' : '+' + n;
        }
        if (key === 'text-align') {
            return val === 'default' ? 'Default' : val.charAt(0).toUpperCase() + val.slice(1);
        }
        if (key === 'line-height')   return val === 'normal' ? 'Default' : val + 'x';
        if (key === 'letter-spacing' || key === 'word-spacing') {
            return val === '0' ? 'Default' : val;
        }
        return val;
    }

    // ----------------------------------------------
    // Mutators — every change goes through these so apply() + save()
    // stay paired.
    // ----------------------------------------------
    function toggleMode(name) {
        if (MODE_BUNDLES[name]) {
            // BUNDLE — toggled in state.bundles independently of any
            // primitives. Bundles never write into state.modes, so toggling
            // one bundle can never change another's switch.
            const i = state.bundles.indexOf(name);
            if (i >= 0) {
                state.bundles.splice(i, 1);
                // Restore settings the bundle had auto-applied so its tiles
                // visibly toggle off alongside the bundle switch. The
                // snapshot was taken at activation time. We only restore
                // keys where the user did NOT manually re-cycle the tile
                // during the bundle's lifetime — detected by comparing the
                // current setting value to what the bundle had written:
                //   match  → user didn't touch it; safe to revert.
                //   differ → user cycled it; respect their choice and keep.
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
                state.bundles.push(name);
                const { primitives, settings } = bundleRecipe(name);
                // Re-toggling a mode = fresh activation. Clear any
                // exclusions the user had set on this bundle's primitives
                // so the full bundle re-applies (instead of the bundle
                // coming back with the user's old "minus N effects"
                // customization sticking silently).
                if (primitives.length && state.excluded.length) {
                    state.excluded = state.excluded.filter(p => !primitives.includes(p));
                }
                // Apply the bundle's recommended settings (WCAG-derived
                // text spacing for dyslexia-friendly, etc.). Snapshot the
                // PRIOR values first so deactivation can revert cleanly.
                // Snapshot reflects whatever the user had — defaults, a
                // prior bundle's leftovers, or their own manual cycles —
                // so on deactivation the panel returns to that exact
                // pre-activation state for any setting the user didn't
                // re-cycle in the meantime.
                if (settings) {
                    const snapshot = {};
                    for (const k in settings) {
                        snapshot[k] = state.settings[k];
                        state.settings[k] = settings[k];
                    }
                    state.settingsSnapshots[name] = snapshot;
                }
            }
        } else {
            // PRIMITIVE — three slots track its presence:
            //   • state.modes:    user-direct toggle (independent of bundles)
            //   • state.excluded: user-direct removal (overrides bundles)
            //   • bundle supply:  whether any active bundle includes it
            // Effective ON ≡ (in modes OR supplied) AND NOT excluded.
            // A click flips the effective state by the minimum-needed write.
            const inModes   = state.modes.indexOf(name)   !== -1;
            const excluded  = state.excluded.indexOf(name) !== -1;
            const supplied  = isSuppliedByBundle(name);
            const effective = (inModes || supplied) && !excluded;

            if (effective) {
                // Turn off
                if (inModes) state.modes = state.modes.filter(m => m !== name);
                if (supplied && !excluded) state.excluded.push(name);
            } else {
                // Turn on
                if (excluded) {
                    state.excluded = state.excluded.filter(p => p !== name);
                    // If no bundle supplies it AND it isn't already in modes, add to modes
                    if (!supplied && !inModes) state.modes.push(name);
                } else if (!inModes) {
                    state.modes.push(name);
                }
            }
        }
        commit();
    }

    function setVisualFilter(filter) {
        // Visual filters are mutex AND can be supplied by either path —
        // a direct click (state.modes) OR a bundle's primitives. The
        // toggle has to manage both to behave intuitively when a bundle
        // already supplies one of them.
        //
        //   • Click an effective filter (whether from state.modes or
        //     from a bundle's primitives) → turn it OFF. For bundle-
        //     supplied filters we use state.excluded (the same mechanism
        //     toggleMode uses for primitive tiles) — it overrides bundle
        //     inclusions without disabling the bundle.
        //   • Click an inactive filter → turn it ON. Mute every OTHER
        //     visual filter at the same time, regardless of which slot
        //     supplied it. Otherwise a bundle-supplied filter would
        //     stack with the user's pick and both effects compose.
        const tokens = effectiveTokens();
        const wasActive = tokens.has(filter);

        if (wasActive) {
            // Turn off — strip from state.modes (if there) and add to
            // excluded (if a bundle supplies it).
            if (state.modes.includes(filter)) {
                state.modes = state.modes.filter(m => m !== filter);
            }
            if (isSuppliedByBundle(filter) && !state.excluded.includes(filter)) {
                state.excluded.push(filter);
            }
        } else {
            // Turn on — mute every OTHER visual filter first, in both slots.
            VISUAL_FILTERS.forEach(other => {
                if (other === filter) return;
                const i = state.modes.indexOf(other);
                if (i >= 0) state.modes.splice(i, 1);
                if (isSuppliedByBundle(other) && !state.excluded.includes(other)) {
                    state.excluded.push(other);
                }
            });
            // Un-exclude the requested filter if it was previously excluded.
            const ei = state.excluded.indexOf(filter);
            if (ei >= 0) state.excluded.splice(ei, 1);
            // Add to state.modes only if no bundle is already supplying it.
            if (!isSuppliedByBundle(filter) && !state.modes.includes(filter)) {
                state.modes.push(filter);
            }
        }
        commit();
    }

    function cycleSetting(key, cycleArr) {
        const cur = String(state.settings[key]);
        const idx = cycleArr.indexOf(cur);
        const next = cycleArr[(idx + 1) % cycleArr.length];
        state.settings[key] = next;
        commit();
    }

    function reset() {
        state = defaultState();
        commit();
    }

    // ----------------------------------------------
    // Focus trap — delegates to NDS.trapFocus (shared with nds-modal.js).
    // The container-getter only returns `panel` when it's open, so the trap
    // is a no-op while closed.
    // ----------------------------------------------
    const trapFocus = NDS.trapFocus(() => (panel && hasState(panel, 'open')) ? panel : null);

    // ----------------------------------------------
    // Header offset — measure the visible bottom of the topbar+mainnav and
    // expose it as --a11y-panel-top so the panel sits below the sticky
    // header rather than overlapping it. Pattern mirrors nds-sidemenu.js's
    // updateDrawerMaxHeight. Re-runs on open and on resize-while-open.
    // ----------------------------------------------
    function updateHeaderOffset() {
        if (!panel) return;
        const navBottom    = navEl    ? Math.max(0, navEl.getBoundingClientRect().bottom)    : 0;
        const topbarBottom = topbarEl ? Math.max(0, topbarEl.getBoundingClientRect().bottom) : 0;
        const visible = Math.max(navBottom, topbarBottom);
        if (visible > 0) panel.style.setProperty('--a11y-panel-top', visible + 'px');
        else panel.style.removeProperty('--a11y-panel-top');
    }

    // ----------------------------------------------
    // Open / Close — mirrors sidemenu's transitionend + safety-net timer
    // ----------------------------------------------
    function open() {
        if (!panel || hasState(panel, 'open')) return;

        openerEl = document.activeElement;
        panel.removeAttribute('hidden');

        // Measure header bottom BEFORE the open transition starts so the panel
        // animates into the correct slot. Layout reads first, style writes after.
        updateHeaderOffset();

        // Track the visible header bottom while the panel is open. The
        // topbar is position:relative (scrolls away) while the nav is
        // position:sticky, so as the user scrolls past the topbar the
        // header's visible bottom shrinks from (topbar + nav) to (nav).
        // Listener is scoped to openAC so it tears down on close() — zero
        // scroll-tick overhead when the panel isn't open.
        openAC = new AbortController();
        const onPanelScroll = NDS.rafThrottle(updateHeaderOffset);
        window.addEventListener('scroll', onPanelScroll, { passive: true, signal: openAC.signal });

        // Mark surroundings inert so AT and tab order skip them. When the
        // scope wrapper is present (any mod active) we inert the single
        // wrapper — `inert` cascades to all descendants so one node hides
        // the entire page-content surface. When the wrapper is absent
        // (no mods), fall back to inerting <header>/<main>/<footer>
        // individually. Snapshot the live list so close() removes inert
        // from the same nodes — symmetric add/remove even if the wrapper
        // appears or disappears mid-open.
        inertedSiblings = scopeWrapper
            ? [scopeWrapper]
            : Array.from(document.body.querySelectorAll(':scope > header, :scope > main, :scope > footer'));
        inertedSiblings.forEach(el => el.setAttribute('inert', ''));

        // Intentionally no backdrop. Users open this panel specifically to see
        // how toggles affect the live page (High Contrast, Highlight Titles,
        // Font Sizing, etc.) — a dimming/blurring layer would hide the change
        // they're trying to evaluate. Click-outside-to-close is still handled
        // by the document-level outsideHandler registered in init().

        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');

        // Force reflow so the from-state is painted before the to-state transition
        // eslint-disable-next-line no-unused-expressions
        panel.offsetHeight;

        addState(panel, 'open', 'opening');
        const onOpened = () => {
            removeState(panel, 'opening');
            panel.removeEventListener('transitionend', onOpened);
            // Move focus to the close button on open so keyboard users land inside
            const closeBtn = panel.querySelector('[data-accessibility-close]');
            if (closeBtn) closeBtn.focus();
        };
        panel.addEventListener('transitionend', onOpened);
    }

    function close() {
        if (!panel || !hasState(panel, 'open')) return;
        addState(panel, 'closing');

        // Tear down the open-only scroll listener immediately — no need
        // to wait for the transition to finish. Once the user clicks
        // close, scroll-tracking the header offset is wasted work.
        if (openAC) { openAC.abort(); openAC = null; }

        let done = false;
        const cleanup = () => {
            if (done) return;
            done = true;
            clearState(panel);
            panel.setAttribute('hidden', '');
            panel.removeEventListener('transitionend', onClosed);

            inertedSiblings.forEach(el => el.removeAttribute('inert'));
            inertedSiblings = [];

            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');

            // Restore focus to whichever element opened the panel
            if (openerEl && typeof openerEl.focus === 'function') openerEl.focus();
            openerEl = null;
        };

        const onClosed = (e) => { if (e && e.target !== panel) return; cleanup(); };
        panel.addEventListener('transitionend', onClosed);
        // Safety-net timer in case transitionend doesn't fire (reduce-motion, display:none mid-transition, etc.)
        // Reads --nds-transition-speed via NDS.transitionSpeed() so JS stays in sync with CSS.
        setTimeout(() => { if (!done) cleanup(); }, NDS.transitionSpeed() + 100);
    }

    function toggle() {
        hasState(panel, 'open') ? close() : open();
    }

    // ----------------------------------------------
    // Init / destroy
    // ----------------------------------------------
    function destroy() {
        // If the panel is open, route through close() first so the inert
        // attribute on <header>/<main>/<footer> (or the scope wrapper),
        // panel data-state, toggleBtn aria-expanded, and openerEl reference
        // unwind via close()'s cleanup() before we abort the ACs. close()
        // handles its own teardown via transitionend + the safety-net
        // setTimeout, so the async path is fine — destroy continues
        // synchronously below.
        if (panel && hasState(panel, 'open')) close();
        if (ac) { ac.abort(); ac = null; }
        if (openAC) { openAC.abort(); openAC = null; }
        if (maskAC) { maskAC.abort(); maskAC = null; }
        if (maskTopEl)      { maskTopEl.remove();      maskTopEl      = null; }
        if (maskBottomEl)   { maskBottomEl.remove();   maskBottomEl   = null; }
        if (maskControlsEl) { maskControlsEl.remove(); maskControlsEl = null; }
        maskLastY = null;
        navEl = topbarEl = null;
        // Unwrap the scope wrapper if it was created — restores the page
        // markup to its authored state so a subsequent init() (or a
        // userland teardown) leaves no a11y-side DOM mutation behind.
        removeScopeWrapper();
    }

    function init() {
        if (_initDone) destroy();
        _initDone = true;

        toggleBtn = document.querySelector('[data-accessibility-toggle]');
        panel = document.querySelector('[data-accessibility-panel]');
        if (!toggleBtn || !panel) return;

        // Cache sticky-header references — re-read by updateHeaderOffset on
        // every open + every resize tick. Stable site-chrome elements; null
        // is tolerated downstream if either is absent on this layout.
        navEl    = document.querySelector('.nds-main-nav');
        topbarEl = document.querySelector('.nds-topbar');

        // Pull persisted state, push to DOM. apply() lazily wraps
        // <header>/<main>/<footer> in the scope <div> if cached state
        // already has any mod active.
        state = load();
        apply();

        ac = new AbortController();
        const { signal } = ac;

        // Open / close
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggle();
        }, { signal });

        panel.addEventListener('click', (e) => {
            if (e.target.closest('[data-accessibility-close]')) {
                e.stopPropagation();
                close();
            }
        }, { signal });

        // ESC + click-outside
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'Escape' || e.key === 'Esc') && hasState(panel, 'open')) {
                e.preventDefault();
                close();
            }
        }, { signal });

        document.addEventListener('click', (e) => {
            if (!hasState(panel, 'open')) return;
            if (panel.contains(e.target)) return;
            if (toggleBtn.contains(e.target)) return;
            close();
        }, { signal });

        document.addEventListener('keydown', trapFocus, { signal });

        // Close on width change (matches sidemenu behavior — keeps a panel
        // sized for one breakpoint from looking broken at another). Also
        // re-measure the sticky-header offset on every resize tick so the
        // panel's top edge tracks header-shrink/expand changes when open.
        let prevW = window.innerWidth;
        const offResize = NDS.onResize(() => {
            const w = window.innerWidth;
            if (w !== prevW) {
                prevW = w;
                if (hasState(panel, 'open')) { close(); return; }
            }
            if (hasState(panel, 'open')) updateHeaderOffset();
        });
        signal.addEventListener('abort', offResize);

        // Per-open scroll listener for tracking the topbar's
        // appearance/disappearance is attached in open() and torn down in
        // close(), so there's zero scroll-tick overhead while the panel is
        // closed. See open() for details.

        // ----- Control wiring -----
        // Declarative table: every panel control is { selector, event, fn }.
        // The optional `each` hook runs once per matched element at wire-time
        // (used by setting tiles to render their step-indicator bars). All
        // listeners attach with the same { signal } so destroy() tears them
        // down atomically.
        const WIRE = [
            { sel: 'input[data-a11y-mode]',                event: 'change', fn: el => toggleMode(el.dataset.a11yMode) },
            { sel: 'button[data-a11y-mode]',               event: 'click',  fn: el => toggleMode(el.dataset.a11yMode) },
            { sel: 'button[data-a11y-visual]',             event: 'click',  fn: el => setVisualFilter(el.dataset.a11yVisual) },
            { sel: 'button[data-a11y-setting]',            event: 'click',
              fn: el => {
                  const cycle = (el.dataset.a11yCycle || '').split(',').map(s => s.trim());
                  cycleSetting(el.dataset.a11ySetting, cycle);
              },
              each: populateSettingBars,
            },
            { sel: '[data-accessibility-action]',          event: 'click',
              fn: el => {
                  const a = el.dataset.accessibilityAction;
                  if (a === 'reset') reset();
              },
            },
        ];

        WIRE.forEach(({ sel, event, fn, each }) => {
            panel.querySelectorAll(sel).forEach(el => {
                if (each) each(el);
                el.addEventListener(event, () => fn(el), { signal });
            });
        });

        syncUI();
    }

    NDS.Accessibility = {
        init,
        open, close, toggle,
        toggleMode, setVisualFilter, cycleSetting,
        reset,
        get state() { return JSON.parse(JSON.stringify(state)); },
    };
})();
