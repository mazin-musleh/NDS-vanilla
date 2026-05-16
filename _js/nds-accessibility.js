// NDS Accessibility — site-wide a11y panel (FAB + slide-in disclosure)
//
// Modes are CSS-only token overrides in _variables-a11y.scss; this JS
// only manages state, persistence, focus, and the open/close lifecycle.
// Storage: localStorage['nds-a11y'] = { modes, bundles, excluded, settings }.
// FOUC guard lives in _includes/head-inline-scripts.html.
// Pattern: W3C APG Disclosure — non-blocking, page stays interactive.

(() => {
    'use strict';

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
    // SOURCE OF TRUTH for the bundle → primitives mapping. The FOUC guard
    // include at _includes/a11y-fouc-bundles.html is REGENERATED from this
    // literal by _plugins/js_processor.rb on every JS rebuild — edit here,
    // run `ruby _plugins/js_processor.rb`, commit both files. The summary
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
    let navEl = null;          // .nds-main-nav  — sticky-header reference
    let topbarEl = null;       // .nds-topbar    — sticky-header reference
    let openerEl = null;       // element that opened the panel — focus returns here
    let ac = null;             // AbortController for listeners scoped to current init
    let openAC = null;         // listeners that only run while the panel is open
    let maskAC = null;         // reading-mask pointer listener (lifecycle = mode on/off)
    let maskTopEl = null;
    let maskBottomEl = null;
    let maskControlsEl = null;
    let maskLastY = null;
    let resetTimer = null;          // armed by first reset click
    let resetDoneTimer = null;      // post-reset visible-flash
    let resetCountdownTimer = null; // mid-arming SR announcement
    let _initDone = false;

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

    function save() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
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
                // Toolbar builds lazily on first reading-mask activation, so
                // the i18n fetch has resolved long before this runs (user must
                // open the panel and toggle the mask first). Built via
                // createElement so JSON-sourced labels can't break out of the
                // attribute via innerHTML string concat.
                maskControlsEl.setAttribute('aria-label', A11Y_I18N.mask_toolbar);
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
                    btn.setAttribute('aria-label', label || '');
                    const i = document.createElement('i');
                    i.className = icon;
                    i.setAttribute('aria-hidden', 'true');
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
            maskLastY = currentY;

            const headerOffset = parseFloat(getComputedStyle(root).getPropertyValue('--nds-nav-height')) || 72;
            const toolbarGap = parseFloat(getComputedStyle(root).getPropertyValue('--spacing-md')) || 8;

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

                maskLastY = currentY;
            };

            const moveTo = (y) => { currentY = y; render(); };

            const persistY = () => {
                state.settings['mask-y'] = currentY;
                save();
            };

            maskAC = new AbortController();
            const { signal } = maskAC;

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
            el.setAttribute('aria-pressed', on ? 'true' : 'false');
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
            icon.setAttribute('aria-hidden', 'true');
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

    // Measure the visible bottom of topbar+mainnav so the panel sits below
    // the sticky header. Re-runs on open + on resize-while-open.
    function updateHeaderOffset() {
        if (!panel) return;
        const navBottom    = navEl    ? Math.max(0, navEl.getBoundingClientRect().bottom)    : 0;
        const topbarBottom = topbarEl ? Math.max(0, topbarEl.getBoundingClientRect().bottom) : 0;
        const visible = Math.max(navBottom, topbarBottom);
        if (visible > 0) panel.style.setProperty('--a11y-panel-top', visible + 'px');
        else panel.style.removeProperty('--a11y-panel-top');
    }

    // ----------------------------------------------
    // Open / Close — transitionend + safety-net timer (mirrors sidemenu)
    // ----------------------------------------------
    function open() {
        if (!panel || hasState(panel, 'open')) return;

        openerEl = document.activeElement;
        panel.removeAttribute('hidden');

        // Layout reads first, style writes after.
        updateHeaderOffset();

        // Track topbar appearance/disappearance during scroll. Scoped to
        // openAC so it tears down on close — zero scroll cost when closed.
        openAC = new AbortController();
        const onPanelScroll = NDS.rafThrottle(updateHeaderOffset);
        window.addEventListener('scroll', onPanelScroll, { passive: true, signal: openAC.signal });

        // No inert / no backdrop — Disclosure pattern, page stays
        // interactive so users can watch tiles affect live content.

        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');

        // Force reflow so the from-state paints before the to-state transition.
        // eslint-disable-next-line no-unused-expressions
        panel.offsetHeight;

        addState(panel, 'open', 'opening');
        const onOpened = () => {
            removeState(panel, 'opening');
            panel.removeEventListener('transitionend', onOpened);
            const closeBtn = panel.querySelector('[data-accessibility-close]');
            if (closeBtn) closeBtn.focus();
        };
        panel.addEventListener('transitionend', onOpened);
    }

    function close() {
        if (!panel || !hasState(panel, 'open')) return;
        addState(panel, 'closing');

        if (openAC) { openAC.abort(); openAC = null; }

        let done = false;
        const cleanup = () => {
            if (done) return;
            done = true;
            clearState(panel);
            panel.setAttribute('hidden', '');
            panel.removeEventListener('transitionend', onClosed);

            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');

            if (openerEl && typeof openerEl.focus === 'function') openerEl.focus();
            openerEl = null;
        };

        const onClosed = (e) => { if (e && e.target !== panel) return; cleanup(); };
        panel.addEventListener('transitionend', onClosed);
        // Safety-net for missed transitionend (reduce-motion, display:none mid-transition).
        setTimeout(() => { if (!done) cleanup(); }, NDS.transitionSpeed() + 100);
    }

    function toggle() {
        hasState(panel, 'open') ? close() : open();
    }

    // ----------------------------------------------
    // Init / destroy
    // ----------------------------------------------
    function destroy() {
        // Route through close() first so the open-state cleanup runs before AC abort.
        if (panel && hasState(panel, 'open')) close();
        if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; }
        if (resetDoneTimer) { clearTimeout(resetDoneTimer); resetDoneTimer = null; }
        if (resetCountdownTimer) { clearTimeout(resetCountdownTimer); resetCountdownTimer = null; }
        if (ac) { ac.abort(); ac = null; }
        if (openAC) { openAC.abort(); openAC = null; }
        if (maskAC) { maskAC.abort(); maskAC = null; }
        if (maskTopEl)      { maskTopEl.remove();      maskTopEl      = null; }
        if (maskBottomEl)   { maskBottomEl.remove();   maskBottomEl   = null; }
        if (maskControlsEl) { maskControlsEl.remove(); maskControlsEl = null; }
        maskLastY = null;
        navEl = topbarEl = null;
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

    function init() {
        if (_initDone) destroy();
        _initDone = true;

        toggleBtn = document.querySelector('[data-accessibility-toggle]');
        panel = document.querySelector('[data-accessibility-panel]');
        if (!toggleBtn || !panel) return;

        navEl    = document.querySelector('.nds-main-nav');
        topbarEl = document.querySelector('.nds-topbar');

        state = load();
        apply();

        ac = new AbortController();
        const { signal } = ac;

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

        // Re-apply when an OS preference flips mid-session.
        for (const k in OS_MQ) {
            OS_MQ[k].addEventListener('change', () => apply(), { signal });
        }

        // Close on width change; re-measure header offset on every resize tick.
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
        get state() { return JSON.parse(JSON.stringify(state)); },
    };
})();
