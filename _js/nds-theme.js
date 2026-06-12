// NDS Theme — dark/light MODE toggle + the theme SWITCHER (predefined seed tokens,
// inline custom seeds, and stylesheet themes), with localStorage persistence.
//
// Lives in the MAIN bundle so it runs on every page the topbar renders on (the
// switcher markup is global; showcase.js is doc-pages-only). data-theme is a token
// list — "dark crimson" — carrying the mode token (dark; light = default, no token)
// and an optional predefined-theme token, matched per-token by [data-theme~="…"].
//
// Storage: nds-theme = the full data-theme string (mode + token); nds-palette = a
// custom inline-seed theme only ({ seeds, value }). The pre-paint FOUC script
// (head-inline-scripts.html) stamps data-theme before first paint; init() only syncs
// UI, injects any active stylesheet theme's CSS/JS, re-applies a saved custom palette,
// and wires delegation.
(() => {
    'use strict';

    const root = document.documentElement;
    window.NDS = window.NDS || {};
    NDS.STORAGE = NDS.STORAGE || { THEME: 'nds-theme' };
    const STORAGE_KEY = NDS.STORAGE.THEME;      // full data-theme string ("dark crimson")
    const PALETTE_KEY = 'nds-palette';          // custom inline-seed theme only: { seeds, value }
    const TOGGLE_SEL = '[data-theme-toggle], #ndsThemeToggle';
    const SWITCH_SEL = '[data-theme-value]';
    const LINK_ID = 'nds-theme-stylesheet';
    const MODE = ['light', 'dark'];
    // data-seed-* suffix → the CSS custom property it sets (custom/inline path).
    const SEED_PROPS = {
        primary: '--brand-primary', secondary: '--brand-secondary',
        tertiary: '--brand-tertiary', tint: '--neutral-tint', font: '--nds-font-brand',
    };

    // ── data-theme token plumbing ───────────────────────────────────────────
    function curTokens() {
        return (root.getAttribute('data-theme') || '').split(/\s+/).filter(Boolean);
    }
    // Write the token list back AND persist the whole string (single source of truth).
    function writeTheme(toks) {
        if (toks.length) root.setAttribute('data-theme', toks.join(' '));
        else root.removeAttribute('data-theme');
        try {
            const v = root.getAttribute('data-theme');
            if (v) localStorage.setItem(STORAGE_KEY, v); else localStorage.removeItem(STORAGE_KEY);
        } catch (e) { /* storage blocked — selection still applies */ }
    }

    // ── Dark/light MODE axis ────────────────────────────────────────────────
    function getTheme() {
        return curTokens().indexOf('dark') !== -1 ? 'dark' : 'light';
    }
    function applyTheme(theme) {
        // Preserve the theme token; light is the default → no token.
        const kept = curTokens().filter(t => MODE.indexOf(t) === -1);
        if (theme === 'dark') kept.push('dark');
        writeTheme(kept);
        updateToggles(theme);
    }
    // Circular clip-path reveal (View Transitions) expanding from an origin element's
    // centre — shared by the dark toggle AND the theme switcher. Runs `apply` (the DOM
    // mutation) inside the transition; degrades to a plain call where unsupported.
    function reveal(apply, el) {
        if (NDS.prefersReducedMotion || !document.startViewTransition) return apply();

        // Origin point from the trigger element's center, or screen center.
        let x = innerWidth / 2, y = innerHeight / 2;
        if (el) {
            const r = el.getBoundingClientRect();
            x = r.left + r.width / 2;
            y = r.top + r.height / 2;
        }
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

        const t = document.startViewTransition(apply);
        t.ready.then(() => {
            root.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
            );
        });
    }
    function setTheme(theme, el) {
        reveal(() => applyTheme(theme), el);
    }
    function toggle(el) {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark', el);
    }
    function updateToggles(theme) {
        const els = document.querySelectorAll(TOGGLE_SEL);
        const isDark = theme === 'dark';
        for (let i = 0; i < els.length; i++) {
            const el = els[i];
            const cb = el.querySelector('.nds-switch-input');
            if (cb) cb.checked = isDark;
            NDS.aria.pressed(el, isDark);
            const icon = el.querySelector('.nds-icon');
            if (icon) {
                icon.classList.toggle('nds-hgi-sun-01', isDark);
                icon.classList.toggle('nds-hgi-moon-02', !isDark);
            }
        }
    }

    // ── Theme SWITCHER axis (predefined token / inline custom / stylesheet) ──
    // Every switcher value is a member of the theme-token group: swap one, preserve mode.
    function themeNames() {
        return Array.from(document.querySelectorAll(SWITCH_SEL))
            .map(el => el.getAttribute('data-theme-value')).filter(Boolean);
    }
    function item(value) {
        return value ? document.querySelector('[data-theme-value="' + value + '"]') : null;
    }
    // Swap the theme token, preserving every other token (mode, …). Predefined themes
    // match [data-theme~="<value>"]; a stylesheet theme's token is an inert marker that
    // just records (+ persists) which sheet is active for reconcileSwitcher to re-inject.
    function setThemeToken(name) {
        const names = themeNames();
        const toks = curTokens().filter(t => names.indexOf(t) === -1);
        if (name) toks.push(name);
        writeTheme(toks);
    }
    function clearInline() {
        for (const k in SEED_PROPS) root.style.removeProperty(SEED_PROPS[k]);
        root.removeAttribute('data-palette');
    }
    function ensureStylesheet(href) {
        let l = document.getElementById(LINK_ID);
        if (l) { if (l.getAttribute('href') !== href) l.setAttribute('href', href); return; }
        l = document.createElement('link');
        l.rel = 'stylesheet'; l.id = LINK_ID; l.href = href;
        document.head.appendChild(l);
    }
    function removeStylesheet() {
        const l = document.getElementById(LINK_ID);
        if (l) l.remove();
    }
    // Load a stylesheet theme's optional behaviour script once. The script is a
    // self-contained event PACK: it registers inject/teardown on
    // window.__NDS_THEME_HOOKS[value], where inject owns link + marker token + slide
    // and teardown removes all three (idempotent — our ensureStylesheet/setThemeToken
    // calls overlap them harmlessly, and stay required for CSS-only themes with no js).
    // On load it self-activates when window.__NDS_THEME_ACTIVE matches (first-
    // activation race-guard) OR is undefined (standalone one-tag use on a page this
    // switcher never orchestrated — downstream sites drop the single script tag).
    function ensureThemeJS(value, src) {
        if (!src) return;
        const id = 'nds-theme-js-' + value;
        if (document.getElementById(id)) return;
        const s = document.createElement('script');
        s.id = id; s.src = src; s.defer = true;
        document.head.appendChild(s);
    }
    function runHook(value, name) {
        const h = (window.__NDS_THEME_HOOKS || {})[value];
        if (h && typeof h[name] === 'function') { try { h[name](); } catch (e) { /* theme hook failed */ } }
    }
    function savePalette(obj) {
        try { obj ? localStorage.setItem(PALETTE_KEY, JSON.stringify(obj)) : localStorage.removeItem(PALETTE_KEY); }
        catch (e) { /* storage blocked */ }
    }
    function syncSwitcher(active) {
        if (active == null) active = curTokens().filter(t => themeNames().indexOf(t) !== -1)[0] || '';
        const els = document.querySelectorAll(SWITCH_SEL);
        for (let i = 0; i < els.length; i++) {
            const on = (els[i].getAttribute('data-theme-value') || '') === active;
            els[i].setAttribute('aria-current', on ? 'true' : 'false');
            // A switcher item rendered as a switch (not a button) reflects on/off state.
            const cb = els[i].querySelector('.nds-switch-input');
            if (cb) cb.checked = on;
        }
    }

    let _sheet = '';   // active stylesheet theme value ('' otherwise)
    // Apply a clicked switcher item — inside the shared reveal so a theme change ripples
    // from the clicked item, exactly like the dark toggle. (Predefined/custom recolour
    // synchronously inside the transition; a stylesheet theme's CSS loads async, so it
    // pops in after the ripple — the reveal still plays.)
    function applySelection(el) {
        reveal(() => {
            // Re-clicking the already-active theme toggles back to the DGA default.
            // syncSwitcher stamps aria-current="true" on the active item, so this is
            // type-agnostic (predefined / stylesheet / custom seed). The default item
            // itself carries no value/css/seed, so it is never a toggle-off.
            const off = el.getAttribute('aria-current') === 'true'
                && !!(el.getAttribute('data-theme-value') || el.getAttribute('data-theme-css') || el.getAttribute('data-seed-primary'));
            const value = off ? '' : (el.getAttribute('data-theme-value') || '');
            const css = off ? null : el.getAttribute('data-theme-css');

            // Leaving a stylesheet theme → tear it down first.
            if (_sheet && _sheet !== value) { runHook(_sheet, 'teardown'); window.__NDS_THEME_ACTIVE = ''; _sheet = ''; }

            if (css) {
                clearInline(); savePalette(null);
                setThemeToken(value);                       // marker token (records + persists the active sheet; the pack's addToken no-ops after this)
                window.__NDS_THEME_ACTIVE = value;
                ensureStylesheet(css);
                ensureThemeJS(value, el.getAttribute('data-theme-js'));
                runHook(value, 'inject');                   // re-activation; first activation self-injects on load
                _sheet = value;
            } else if (!off && el.getAttribute('data-seed-primary')) {
                removeStylesheet(); setThemeToken('');      // custom rides [data-palette], not a token
                clearInline();
                const seeds = {};
                for (const k in SEED_PROPS) {
                    const v = el.getAttribute('data-seed-' + k);
                    if (v) { root.style.setProperty(SEED_PROPS[k], v); seeds[SEED_PROPS[k]] = v; }
                }
                root.setAttribute('data-palette', '');
                savePalette({ value: value, seeds: seeds });
            } else if (value) {
                removeStylesheet(); clearInline(); savePalette(null);
                setThemeToken(value);                       // predefined seed theme → toggle the token
            } else {
                removeStylesheet(); clearInline(); savePalette(null);
                setThemeToken('');                          // DGA
            }
            syncSwitcher(value);
        }, el);
    }

    // Reconcile switcher state at init (post-paint): the pre-paint stamp set data-theme,
    // so here we inject any active stylesheet theme's CSS/JS, re-apply a saved custom
    // palette, and sync aria. A click landing in the pre-init gap no-ops, recovers next click.
    function reconcileSwitcher() {
        if (!document.querySelector(SWITCH_SEL)) return;

        let palette = null;
        try { const s = localStorage.getItem(PALETTE_KEY); if (s) palette = JSON.parse(s); } catch (e) { /* ignore */ }

        if (palette && palette.seeds) {
            // Custom inline seeds (not flash-free — re-applied here). Iterate the
            // known SEED_PROPS, not the stored keys, so a tampered store can't set
            // arbitrary custom properties on :root.
            for (const k in SEED_PROPS) {
                const v = palette.seeds[SEED_PROPS[k]];
                if (v) root.style.setProperty(SEED_PROPS[k], v);
            }
            root.setAttribute('data-palette', '');
            syncSwitcher(palette.value || '');
            wireSwitcher();
            return;
        }

        const active = curTokens().filter(t => themeNames().indexOf(t) !== -1)[0] || '';
        const el = item(active);
        if (el && el.getAttribute('data-theme-css')) {       // active token is a stylesheet theme → inject
            _sheet = active; window.__NDS_THEME_ACTIVE = active;
            ensureStylesheet(el.getAttribute('data-theme-css'));
            ensureThemeJS(active, el.getAttribute('data-theme-js'));
            runHook(active, 'inject');
        }
        syncSwitcher(active);
        wireSwitcher();
    }
    let _switcherWired = false;
    function wireSwitcher() {
        if (_switcherWired) return;
        _switcherWired = true;
        // A switcher item is usually a button (click); it can also be a switch — then
        // the input's 'change' drives it, so skip the click to avoid a double-toggle.
        document.addEventListener('click', (e) => {
            const el = e.target.closest(SWITCH_SEL);
            if (!el || el.querySelector('.nds-switch-input')) return;
            applySelection(el);
        });
        document.addEventListener('change', (e) => {
            if (!e.target.matches('.nds-switch-input')) return;
            const el = e.target.closest(SWITCH_SEL);
            if (el) applySelection(el);   // applySelection toggles on the item's current state
        });
    }

    // Init: sync toggle UI + reconcile the switcher, then wire delegation. The loader
    // gates this on a toggle OR a switcher being present. First paint is owned by the
    // pre-paint FOUC script, independent of this init.
    let _initDone = false;
    function init() {
        if (_initDone) return;
        _initDone = true;

        updateToggles(getTheme());
        reconcileSwitcher();

        // Mode toggle — button click delegation
        document.addEventListener('click', e => {
            const el = e.target.closest(TOGGLE_SEL);
            if (!el || el.querySelector('.nds-switch-input')) return;
            toggle(el);
        });
        // Mode toggle — switch 'change' (track click, label click, keyboard)
        document.addEventListener('change', e => {
            if (!e.target.matches('.nds-switch-input')) return;
            const el = e.target.closest(TOGGLE_SEL);
            if (!el) return;
            setTheme(e.target.checked ? 'dark' : 'light', el);
        });
    }

    // Public API
    NDS.Theme = { init, get: getTheme, set: setTheme, toggle };
})();
