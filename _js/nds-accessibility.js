// NDS Accessibility — site-wide a11y panel (FAB + slide-in dialog)
//
// Modes are CSS-only token overrides in _variables-a11y.scss; this JS
// only manages state, persistence, focus, and the open/close lifecycle.
// Storage: localStorage['nds-a11y'] = { modes, bundles, excluded, settings, oversize }.
//
// Apply-before-paint of cached state happens in _includes/head.html
// (alongside the theme FOUC guard) so reload doesn't flash.

(() => {
    'use strict';

    const { add: addState, remove: removeState, has: hasState, clear: clearState } = NDS.State;

    const STORAGE_KEY = 'nds-a11y';
    const root = document.documentElement;

    // Bundles map a single accordion-section toggle (e.g. "epilepsy-safe")
    // to the set of low-level tokens that implement it. Keep this in sync
    // with the comment block at the bottom of _variables-a11y.scss.
    const MODE_BUNDLES = {
        'epilepsy-safe':        ['reduce-motion', 'low-saturation'],
        'visually-impaired':    ['high-contrast', 'content-scaling'],
        'cognitive-disability': ['readable-font', 'highlight-titles', 'reduce-motion'],
        'motor-impaired':       [],
        'colorblind':           ['colorblind'],
        'dyslexia-friendly':    ['dyslexia', 'highlight-links'],
        'adhd-friendly':        ['reduce-motion', 'highlight-titles', 'reading-mask'],
        'blindness':            [],   // marker-only — see _variables-a11y.scss for rationale
    };

    // Single-pick group — only one of these can be active at a time, since
    // their CSS filters compose multiplicatively and most users want exactly
    // one of "make it brighter / dimmer / monochrome / boosted contrast".
    const VISUAL_FILTERS = ['smart-contrast', 'monochrome', 'high-contrast', 'high-saturation', 'low-saturation'];

    // Scalar settings → inline custom properties on <html>. Each entry is
    // applied identically: write the CSS var when the value differs from the
    // default; remove it otherwise. Driven by apply() in one short loop.
    //
    // `font-step` is a discrete level (0/1/2/3) — the SCSS layer in
    // _variables-a11y.scss reads `--user-font-step: N` and remaps every
    // typography token to the next-N rung of the existing ladder. Coarser
    // than a multiplier, but each step lands on a designer-chosen size.
    const SCALAR_PROPS = [
        { key: 'font-step',      cssVar: '--user-font-step',      def: 0 },
        { key: 'line-height',    cssVar: '--user-line-height',    def: 'normal' },
        { key: 'letter-spacing', cssVar: '--user-letter-spacing', def: '0' },
        { key: 'word-spacing',   cssVar: '--user-word-spacing',   def: '0' },
    ];

    let state = defaultState();
    let panel = null;
    let toggleBtn = null;
    let navEl = null;          // .nds-main-nav  — cached for updateHeaderOffset
    let topbarEl = null;       // .nds-topbar    — cached for updateHeaderOffset
    let openerEl = null;       // element that opened the panel — focus returns here
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
            oversize: false,
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
            const primitives = MODE_BUNDLES[b];
            if (Array.isArray(primitives) && primitives.length > 0) {
                primitives.forEach(p => tokens.add(p));
            } else {
                tokens.add(b);                 // empty bundle — marker token
            }
        }
        // User-side exclusions override bundle inclusions.
        for (let i = 0; i < state.excluded.length; i++) tokens.delete(state.excluded[i]);
        return tokens;
    }

    // Is a given primitive currently supplied by ANY active bundle?
    function isSuppliedByBundle(primitive) {
        for (let i = 0; i < state.bundles.length; i++) {
            const prims = MODE_BUNDLES[state.bundles[i]] || [];
            if (prims.indexOf(primitive) !== -1) return true;
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
        // Build the full data-a11y token set ONCE — including text-align —
        // so the attribute is written exactly once per apply() call. The
        // text-align token is purely derived from state.settings; folding
        // it into the same Set avoids the parse-mutate-restamp dance the
        // earlier version did.
        const s = state.settings;
        const tokens = effectiveTokens();
        if (s['text-align'] && s['text-align'] !== 'default') {
            tokens.add('text-align-' + s['text-align']);
        }
        if (tokens.size === 0) {
            root.removeAttribute('data-a11y');
        } else {
            root.setAttribute('data-a11y', Array.from(tokens).join(' '));
        }

        // Position is no longer state-driven — set at Jekyll-time via the
        // include's `position` arg or at runtime via <html data-a11y-pos>.
        // SCSS reads both. See _includes/accessibility-panel.html intro.

        // Scalar settings → inline custom properties on <html>. See
        // SCALAR_PROPS at the top of the IIFE for the full mapping.
        SCALAR_PROPS.forEach(({ key, cssVar, def }) => {
            const v = s[key];
            if (v && v !== def) root.style.setProperty(cssVar, v);
            else root.style.removeProperty(cssVar);
        });

        // Sync UI to state — only if panel is in the DOM
        if (panel) syncUI();
        if (toggleBtn) toggleBtn.classList.toggle('nds-oversize', !!state.oversize);

        // Reading-mask pointer tracking — attach/detach based on whether the
        // expanded token list contains "reading-mask". Single pooled listener
        // via NDS.rafThrottle so frequent pointermove events don't thrash.
        applyReadingMask(tokens.has('reading-mask'));
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
        // Visual filter buttons (single-pick — always primitives, only
        // reflect state.modes; bundles don't pull these in).
        panel.querySelectorAll('button[data-a11y-visual]').forEach(btn => {
            setPressed(btn, state.modes.includes(btn.dataset.a11yVisual));
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
        // Oversize switch
        const oversize = panel.querySelector('input[data-a11y-oversize]');
        if (oversize) oversize.checked = !!state.oversize;

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
            } else {
                state.bundles.push(name);
                // Re-toggling a mode = fresh activation. Clear any
                // exclusions the user had set on this bundle's primitives
                // so the full bundle re-applies (instead of the bundle
                // coming back with the user's old "minus N effects"
                // customization sticking silently).
                const primitives = MODE_BUNDLES[name] || [];
                if (primitives.length && state.excluded.length) {
                    state.excluded = state.excluded.filter(p => !primitives.includes(p));
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
        // Mutually exclusive group — clear any other visual filter first.
        state.modes = state.modes.filter(m => !VISUAL_FILTERS.includes(m) || m === filter);
        const i = state.modes.indexOf(filter);
        if (i >= 0) state.modes.splice(i, 1);          // clicking the active one toggles off
        else state.modes.push(filter);
        commit();
    }

    function cycleSetting(key, cycleArr) {
        const cur = String(state.settings[key]);
        const idx = cycleArr.indexOf(cur);
        const next = cycleArr[(idx + 1) % cycleArr.length];
        state.settings[key] = next;
        commit();
    }

    function setOversize(on) {
        state.oversize = !!on;
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

        // Mark surroundings inert so AT and tab order skip them. Cache the
        // exact node list so close() removes the attribute from the same
        // elements — symmetric add/remove even if the DOM changes mid-open.
        inertedSiblings = Array.from(
            document.body.querySelectorAll(':scope > header, :scope > main, :scope > footer')
        );
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
        if (ac) { ac.abort(); ac = null; }
        if (openAC) { openAC.abort(); openAC = null; }
        if (maskAC) { maskAC.abort(); maskAC = null; }
        if (maskTopEl)      { maskTopEl.remove();      maskTopEl      = null; }
        if (maskBottomEl)   { maskBottomEl.remove();   maskBottomEl   = null; }
        if (maskControlsEl) { maskControlsEl.remove(); maskControlsEl = null; }
        maskLastY = null;
        navEl = topbarEl = null;
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

        // Pull persisted state, push to DOM
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
            { sel: 'input[data-a11y-oversize]',            event: 'change', fn: el => setOversize(el.checked) },
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
        toggleMode, setVisualFilter, cycleSetting, setOversize,
        reset,
        get state() { return JSON.parse(JSON.stringify(state)); },
    };
})();
