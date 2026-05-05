// NDS Accessibility — site-wide a11y panel (FAB + slide-in dialog)
//
// Modes are CSS-only token overrides in _variables-a11y.scss; this JS
// only manages state, persistence, focus, and the open/close lifecycle.
// Storage: localStorage['nds-a11y'] = { modes, settings, position, hidden, oversize }.
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

    let state = defaultState();
    let panel = null;
    let toggleBtn = null;
    let openerEl = null;       // element that opened the panel — focus returns here
    let inertedSiblings = [];  // captured on open so close removes inert from the same nodes
    let ac = null;             // AbortController for all listeners scoped to current init
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
                'font-scale': 1,
                'text-align': 'default',
                'line-height': 'normal',
                'letter-spacing': '0',
                'word-spacing': '0',
                'mask-band': 60,               // half-height of reading-mask clear band, px
                'mask-y': null,                // band center Y in px; null = use viewport center on first activation
            },
            position: 'end',
            hidden: false,
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

    // ----------------------------------------------
    // DOM application — single source of truth for the visible state.
    // Called after every state mutation so the UI never drifts from the
    // stored object.
    // ----------------------------------------------
    function apply() {
        // Stamp the union of user primitives + active bundle primitives
        // onto data-a11y as a space-separated token set.
        const tokens = effectiveTokens();
        if (tokens.size === 0) {
            root.removeAttribute('data-a11y');
        } else {
            root.setAttribute('data-a11y', Array.from(tokens).join(' '));
        }

        // Position
        if (state.position && state.position !== 'end') {
            root.setAttribute('data-a11y-pos', state.position);
        } else {
            root.removeAttribute('data-a11y-pos');
        }

        // Hidden
        if (state.hidden) {
            root.setAttribute('data-a11y-hidden', 'true');
        } else {
            root.removeAttribute('data-a11y-hidden');
        }

        // Scalar settings → inline custom properties on <html>
        const s = state.settings;
        if (s['font-scale'] && s['font-scale'] !== 1) {
            root.style.setProperty('--user-font-scale', s['font-scale']);
        } else {
            root.style.removeProperty('--user-font-scale');
        }
        if (s['line-height'] && s['line-height'] !== 'normal') {
            root.style.setProperty('--user-line-height', s['line-height']);
        } else {
            root.style.removeProperty('--user-line-height');
        }
        if (s['letter-spacing'] && s['letter-spacing'] !== '0') {
            root.style.setProperty('--user-letter-spacing', s['letter-spacing']);
        } else {
            root.style.removeProperty('--user-letter-spacing');
        }
        if (s['word-spacing'] && s['word-spacing'] !== '0') {
            root.style.setProperty('--user-word-spacing', s['word-spacing']);
        } else {
            root.style.removeProperty('--user-word-spacing');
        }

        // Text alignment is a token, not a custom property — apply via data-a11y
        ['text-align-left', 'text-align-right', 'text-align-justify'].forEach(t => tokens.delete(t));
        if (s['text-align'] && s['text-align'] !== 'default') {
            const tokenList = (root.getAttribute('data-a11y') || '').split(/\s+/).filter(Boolean);
            tokenList.push('text-align-' + s['text-align']);
            root.setAttribute('data-a11y', tokenList.join(' '));
        }

        // Sync UI to state — only if panel is in the DOM
        if (panel) syncUI();
        if (toggleBtn) toggleBtn.classList.toggle('nds-oversize', !!state.oversize);
        if (toggleBtn) toggleBtn.classList.toggle('nds-start', state.position === 'start');
        if (panel) panel.classList.toggle('nds-start', state.position === 'start');

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
                // right — so the grab handle is visually centered.
                maskControlsEl.innerHTML =
                    '<button type="button" data-action="size-down" aria-label="Decrease mask band">' +
                        '<i class="nds-icon nds-hgi-zoom-out-area" aria-hidden="true"></i>' +
                    '</button>' +
                    '<button type="button" data-action="grab" aria-label="Drag mask vertically. Use arrow keys to nudge.">' +
                        '<i class="hgi hgi-stroke hgi-arrow-up-down" aria-hidden="true"></i>' +
                    '</button>' +
                    '<button type="button" data-action="size-up" aria-label="Increase mask band">' +
                        '<i class="nds-icon nds-hgi-zoom-in-area" aria-hidden="true"></i>' +
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

            // Size +/− click handler (delegated). Clamps to [MIN, MAX] and
            // re-renders so the band height changes immediately.
            maskControlsEl.addEventListener('click', (e) => {
                const btn = e.target.closest('button[data-action]');
                if (!btn) return;
                const action = btn.dataset.action;
                if (action !== 'size-up' && action !== 'size-down') return;
                const cur = state.settings['mask-band'] || 60;
                const next = action === 'size-up'
                    ? Math.min(MASK_BAND_MAX, cur + MASK_BAND_STEP)
                    : Math.max(MASK_BAND_MIN, cur - MASK_BAND_STEP);
                if (next === cur) return;
                state.settings['mask-band'] = next;
                save();
                render();
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
        // Mode switches (accordion bundles)
        panel.querySelectorAll('input[data-a11y-mode]').forEach(input => {
            input.checked = isModeActive(input.dataset.a11yMode, tokens);
        });
        // Mode tile buttons (Readable Experience primitives)
        panel.querySelectorAll('button[data-a11y-mode]').forEach(btn => {
            btn.setAttribute('aria-pressed', isModeActive(btn.dataset.a11yMode, tokens) ? 'true' : 'false');
        });
        // Visual filter buttons (single-pick — always primitives, only
        // reflect state.modes; bundles don't pull these in).
        panel.querySelectorAll('button[data-a11y-visual]').forEach(btn => {
            btn.setAttribute('aria-pressed', state.modes.includes(btn.dataset.a11yVisual) ? 'true' : 'false');
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
            btn.setAttribute('aria-pressed', (idx > 0) ? 'true' : 'false');
            const valEl = btn.querySelector('[data-a11y-value]');
            if (valEl) valEl.textContent = formatSettingValue(key, cur);
            const bars = btn.querySelectorAll('[data-a11y-bars] .nds-accessibility-tile-bar');
            bars.forEach((bar, i) => bar.classList.toggle('is-active', i < idx));
        });
        // Position group
        panel.querySelectorAll('button[data-accessibility-position]').forEach(btn => {
            btn.setAttribute('aria-pressed', btn.dataset.accessibilityPosition === state.position ? 'true' : 'false');
        });
        // Oversize switch
        const oversize = panel.querySelector('input[data-a11y-oversize]');
        if (oversize) oversize.checked = !!state.oversize;
    }

    function formatSettingValue(key, val) {
        if (key === 'font-scale') {
            const n = parseFloat(val);
            return n === 1 ? '100%' : Math.round(n * 100) + '%';
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
        save(); apply();
    }

    function setVisualFilter(filter) {
        // Mutually exclusive group — clear any other visual filter first.
        state.modes = state.modes.filter(m => !VISUAL_FILTERS.includes(m) || m === filter);
        const i = state.modes.indexOf(filter);
        if (i >= 0) state.modes.splice(i, 1);          // clicking the active one toggles off
        else state.modes.push(filter);
        save(); apply();
    }

    function cycleSetting(key, cycleArr) {
        const cur = String(state.settings[key]);
        const idx = cycleArr.indexOf(cur);
        const next = cycleArr[(idx + 1) % cycleArr.length];
        state.settings[key] = next;
        save(); apply();
    }

    function setPosition(pos) {
        state.position = pos === 'start' ? 'start' : 'end';
        save(); apply();
    }

    function setOversize(on) {
        state.oversize = !!on;
        save(); apply();
    }

    function reset() {
        state = defaultState();
        save(); apply();
    }

    function hideForever() {
        // Close the panel first so focus doesn't get stuck inside a hidden node.
        if (panel && hasState(panel, 'open')) close();
        state.hidden = true;
        save(); apply();
    }

    // ----------------------------------------------
    // Focus trap (cloned from nds-modal.js with minor tweaks for the panel)
    // ----------------------------------------------
    function trapFocus(e) {
        if (e.key !== 'Tab' || !panel || !hasState(panel, 'open')) return;
        const focusable = panel.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    // ----------------------------------------------
    // Header offset — measure the visible bottom of the topbar+mainnav and
    // expose it as --a11y-panel-top so the panel sits below the sticky
    // header rather than overlapping it. Pattern mirrors nds-sidemenu.js's
    // updateDrawerMaxHeight. Re-runs on open and on resize-while-open.
    // ----------------------------------------------
    function updateHeaderOffset() {
        if (!panel) return;
        const nav = document.querySelector('.nds-main-nav');
        const topbar = document.querySelector('.nds-topbar');
        const navBottom    = nav    ? Math.max(0, nav.getBoundingClientRect().bottom)    : 0;
        const topbarBottom = topbar ? Math.max(0, topbar.getBoundingClientRect().bottom) : 0;
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
        if (maskAC) { maskAC.abort(); maskAC = null; }
        if (maskTopEl)      { maskTopEl.remove();      maskTopEl      = null; }
        if (maskBottomEl)   { maskBottomEl.remove();   maskBottomEl   = null; }
        if (maskControlsEl) { maskControlsEl.remove(); maskControlsEl = null; }
        maskLastY = null;
    }

    function init() {
        if (_initDone) destroy();
        _initDone = true;

        toggleBtn = document.querySelector('[data-accessibility-toggle]');
        panel = document.querySelector('[data-accessibility-panel]');
        if (!toggleBtn || !panel) return;

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

        // ----- Control wiring -----
        // Mode switches (accordion section)
        panel.querySelectorAll('input[data-a11y-mode]').forEach(input => {
            input.addEventListener('change', () => toggleMode(input.dataset.a11yMode), { signal });
        });

        // Mode tile buttons (Readable Experience: highlight-titles, etc.)
        panel.querySelectorAll('button[data-a11y-mode]').forEach(btn => {
            btn.addEventListener('click', () => toggleMode(btn.dataset.a11yMode), { signal });
        });

        // Visual filters (single-pick group)
        panel.querySelectorAll('button[data-a11y-visual]').forEach(btn => {
            btn.addEventListener('click', () => setVisualFilter(btn.dataset.a11yVisual), { signal });
        });

        // Cycled scalar settings — wire click + populate the step-indicator
        // bars based on cycle length. Idempotent: skips if bars already exist
        // (e.g., on a re-init after server-rendered markup is already present).
        panel.querySelectorAll('button[data-a11y-setting]').forEach(btn => {
            const key = btn.dataset.a11ySetting;
            const cycle = (btn.dataset.a11yCycle || '').split(',').map(s => s.trim());
            btn.addEventListener('click', () => cycleSetting(key, cycle), { signal });

            // Render (cycle.length - 1) bars: the first cycle value is the
            // off/default state, not a level. With 4 cycle entries we draw 3
            // bars representing levels 1, 2, 3.
            const barsEl = btn.querySelector('[data-a11y-bars]');
            if (barsEl && !barsEl.children.length) {
                const levels = Math.max(0, cycle.length - 1);
                const frag = document.createDocumentFragment();
                for (let i = 0; i < levels; i++) {
                    const bar = document.createElement('span');
                    bar.className = 'nds-accessibility-tile-bar';
                    frag.appendChild(bar);
                }
                barsEl.appendChild(frag);
            }
        });

        // Position
        panel.querySelectorAll('button[data-accessibility-position]').forEach(btn => {
            btn.addEventListener('click', () => setPosition(btn.dataset.accessibilityPosition), { signal });
        });

        // Oversize
        const oversize = panel.querySelector('input[data-a11y-oversize]');
        if (oversize) {
            oversize.addEventListener('change', () => setOversize(oversize.checked), { signal });
        }

        // Footer actions
        panel.querySelectorAll('[data-accessibility-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.accessibilityAction;
                if (action === 'reset') reset();
                else if (action === 'hide-forever') hideForever();
            }, { signal });
        });

        syncUI();
    }

    NDS.Accessibility = {
        init,
        open, close, toggle,
        toggleMode, setVisualFilter, cycleSetting, setPosition, setOversize,
        reset, hideForever,
        get state() { return JSON.parse(JSON.stringify(state)); },
    };
})();
