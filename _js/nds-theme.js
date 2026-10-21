/* NDS.Theme — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Theme.init()      sync the toggle UI, load an active stylesheet theme's assets, re-apply
 *                         a saved custom palette, wire the delegated clicks
 *   NDS.Theme.get()       the mode: 'light' or 'dark'
 *   NDS.Theme.set(mode, el?)  set the mode and persist, keeping the theme token; the
 *                         reveal grows from el's center (screen center without it)
 *   NDS.Theme.toggle(el?) flip light and dark, keeping the theme token
 * Events:
 *   (none)
 * Hooks:
 *   data-theme          on <html> — a TOKEN LIST: the mode token (dark; light is the
 *                       default and writes nothing) plus an optional theme token
 *   data-theme-toggle   on a mode toggle
 *   data-theme-value    on a switcher option — the theme token it applies
 *   data-theme-css · data-theme-js   on an option, a stylesheet and/or a script to load
 *                       with the theme. Both optional, each loaded on its own
 *   data-seed-*         inline custom seeds on an option: primary, secondary, tertiary,
 *                       tint, font, weight-regular, weight-medium, weight-semibold,
 *                       weight-bold
 *   data-palette        marks a custom inline-seed theme
 *   <meta name="theme-color">   without media="": the script writes the top bar's (else the
 *                       main nav's, else the page's) background into it on init and on every change
 *   ?theme=<token>      in the page URL — applies that switcher option on init as if
 *                       clicked (persisted), ?theme= returns to the default; every
 *                       switcher choice rewrites it (none for the default), so the
 *                       address bar is always a shareable link to the current look
 * Gotchas:
 *   - Match the mode with [data-theme~="dark"], never [data-theme="dark"] — the attribute
 *     holds several tokens.
 *   - The saved theme is stamped BEFORE first paint by the inline FOUC script, so a
 *     predefined theme never flashes. A custom inline-seed palette is re-applied by
 *     init(), which is after first paint — that one can flash.
 *   - Two storage keys: nds-theme holds the whole data-theme string; nds-palette holds a
 *     custom inline-seed theme only.
 */
// NDS Theme — dark/light modes toggle + the theme SWITCHER (predefined seed tokens,
// inline custom seeds, and stylesheet themes), with localStorage persistence.
//
// Lives in the MAIN bundle so it runs on every page the topbar renders on (the
// switcher markup is global). data-theme is a token list — "dark crimson" —
// carrying the mode token (dark; light = default, no token)
// and an optional predefined-theme token, matched per-token by [data-theme~="…"].
//
// Storage: nds-theme = the full data-theme string (mode + token); nds-palette = a
// custom inline-seed theme only ({ seeds, value }). The pre-paint FOUC script
// (head-inline-scripts.html) stamps data-theme before first paint; init() only syncs
// UI, loads any active stylesheet theme's assets, re-applies a saved custom palette,
// and wires delegation.
(() => {
    'use strict';

    const root = document.documentElement;
    // Key is duplicated in the pre-paint FOUC script (head-inline-scripts.html) —
    // a runtime override could only desync the two, so it's a plain const.
    const STORAGE_KEY = 'nds-theme';            // full data-theme string ("dark crimson")
    const PALETTE_KEY = 'nds-palette';          // custom inline-seed theme only: { seeds, value }
    const TOGGLE_SEL = '[data-theme-toggle]';
    const SWITCH_SEL = '[data-theme-value]';
    const LINK_ID = 'nds-theme-stylesheet';
    const modes = ['light', 'dark'];
    // data-seed-* suffix → the CSS custom property it sets (custom/inline path).
    const seedProperties = {
        primary: '--brand-primary', secondary: '--brand-secondary',
        tertiary: '--brand-tertiary', tint: '--neutral-tint', font: '--nds-font-brand',
        'weight-regular': '--font-weight-regular', 'weight-medium': '--font-weight-medium',
        'weight-semibold': '--font-weight-semibold', 'weight-bold': '--font-weight-bold',
    };

    // ── data-theme token plumbing ───────────────────────────────────────────
    function getCurrentTokens() {
        return (root.getAttribute('data-theme') || '').split(/\s+/).filter(Boolean);
    }
    // Write the token list back AND persist the whole string (single source of truth).
    function writeTheme(toks) {
        if (toks.length) root.setAttribute('data-theme', toks.join(' '));
        else root.removeAttribute('data-theme');
        try {
            const value = root.getAttribute('data-theme');
            if (value) localStorage.setItem(STORAGE_KEY, value); else localStorage.removeItem(STORAGE_KEY);
        } catch (e) { /* storage blocked — selection still applies */ }
    }

    // ── Dark/light modes axis ────────────────────────────────────────────────
    function getTheme() {
        return getCurrentTokens().indexOf('dark') !== -1 ? 'dark' : 'light';
    }
    function setThemeMode(theme) {
        // Preserve the theme token; light is the default → no token.
        const kept = getCurrentTokens().filter(token => modes.indexOf(token) === -1);
        if (theme === 'dark') kept.push('dark');
        writeTheme(kept);
        setToggles(theme);
        syncThemeColor();
    }
    // A <meta name="theme-color"> takes the color at the top of the page, so the phone's
    // browser bar matches it. One with media="" is the site's own per-scheme setup.
    // ponytail: a stylesheet theme's CSS lands after this; its bar color updates on the next change.
    function syncThemeColor() {
        const meta = document.querySelector('meta[name="theme-color"]:not([media])');
        if (!meta) return;
        const top = document.querySelector('.nds-topbar, .nds-main-nav');
        const clear = (color) => !color || color === 'rgba(0, 0, 0, 0)' || color === 'transparent';
        let bg = top && getComputedStyle(top).backgroundColor;
        if (clear(bg)) bg = getComputedStyle(document.body).backgroundColor;
        if (!clear(bg)) meta.setAttribute('content', bg);
    }
    // Circular clip-path reveal (View Transitions) expanding from an origin element's
    // centre — shared by the dark toggle AND the theme switcher. Runs `apply` (the DOM
    // mutation) inside the transition; degrades to a plain call where unsupported.
    function reveal(apply, el) {
        if (NDS.prefersReducedMotion || !document.startViewTransition) return apply();

        // Origin point from the trigger element's center, or screen center.
        let x = innerWidth / 2, y = innerHeight / 2;
        if (el) {
            const rect = el.getBoundingClientRect();
            x = rect.left + rect.width / 2;
            y = rect.top + rect.height / 2;
        }
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

        const transition = document.startViewTransition(apply);
        // A skipped transition (hidden tab, a second click) rejects ready; apply still ran.
        transition.ready.then(() => {
            root.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
            );
        }, () => {});
    }
    function setTheme(theme, el) {
        reveal(() => setThemeMode(theme), el);
    }
    function toggle(el) {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark', el);
    }
    function setToggles(theme) {
        const elements = document.querySelectorAll(TOGGLE_SEL);
        const isDark = theme === 'dark';
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            const checkbox = el.querySelector('.nds-switch-input');
            if (checkbox) checkbox.checked = isDark;
            NDS.aria.pressed(el, isDark);
            const icon = el.querySelector('.nds-icon');
            if (icon) {
                icon.classList.toggle('nds-hgi-sun-03', isDark);
                icon.classList.toggle('nds-hgi-moon-02', !isDark);
            }
        }
    }

    // ── Theme SWITCHER axis (predefined token / inline custom / stylesheet) ──
    // Every switcher value is a member of the theme-token group: swap one, preserve mode.
    function getThemeNames() {
        return Array.from(document.querySelectorAll(SWITCH_SEL))
            .map(el => el.getAttribute('data-theme-value')).filter(Boolean);
    }
    function findItem(value) {
        return value ? document.querySelector('[data-theme-value="' + value + '"]') : null;
    }
    // Swap the theme token, preserving every other token (mode, …). Predefined themes
    // match [data-theme~="<value>"]; a stylesheet theme's token is an inert marker that
    // just records (+ persists) which sheet is active for reconcileSwitcher to re-inject.
    function setThemeToken(name) {
        const names = getThemeNames();
        const toks = getCurrentTokens().filter(token => names.indexOf(token) === -1);
        if (name) toks.push(name);
        writeTheme(toks);
    }
    function clearInline() {
        for (const key in seedProperties) root.style.removeProperty(seedProperties[key]);
        root.removeAttribute('data-palette');
    }
    // An event pack loaded by its own <script> tag inlines its CSS as a
    // [data-nds-event-style] block instead of taking the LINK_ID slot, so it has
    // no href for us to swap. Drop the ones we are switching AWAY from, or their
    // theme survives the switch; `keep` is the theme being applied, if any.
    function dropInlineEventStyles(keep) {
        document.querySelectorAll('[data-nds-event-style]').forEach(style => {
            if (style.getAttribute('data-nds-event-style') !== keep) style.remove();
        });
    }
    // The LINK_ID slot is shared with head.html's site-wide `brand:` link.
    function ensureStylesheet(href) {
        let link = document.getElementById(LINK_ID);
        if (link) { if (link.getAttribute('href') !== href) link.setAttribute('href', href); return; }
        link = document.createElement('link');
        link.rel = 'stylesheet'; link.id = LINK_ID; link.href = href;
        document.head.appendChild(link);
    }
    function removeStylesheet() {
        dropInlineEventStyles();
        const link = document.getElementById(LINK_ID);
        if (link) link.remove();
    }
    // Load a stylesheet theme's script once. NDS's own are self-contained event
    // PACKS: they register inject/teardown on window.__NDS_THEME_HOOKS[value], where
    // inject owns the styles + marker token + slide and teardown removes all three
    // (idempotent — our setThemeToken calls overlap them harmlessly).
    // On load it self-activates when window.__NDS_THEME_ACTIVE matches (first-
    // activation race-guard) OR is undefined (standalone one-tag use on a page this
    // switcher never orchestrated — downstream sites drop the single script tag).
    function ensureThemeJs(value, src) {
        if (!src) return;
        const id = 'nds-theme-js-' + value;
        if (document.getElementById(id)) return;
        const script = document.createElement('script');
        script.id = id; script.src = src; script.defer = true;
        document.head.appendChild(script);
    }
    function runHook(value, name) {
        const hook = (window.__NDS_THEME_HOOKS || {})[value];
        if (hook && typeof hook[name] === 'function') { try { hook[name](); } catch (e) { /* theme hook failed */ } }
    }
    function savePalette(palette) {
        try { palette ? localStorage.setItem(PALETTE_KEY, JSON.stringify(palette)) : localStorage.removeItem(PALETTE_KEY); }
        catch (e) { /* storage blocked */ }
    }
    function syncSwitcher(active) {
        currentValue = active;
        const elements = document.querySelectorAll(SWITCH_SEL);
        for (let i = 0; i < elements.length; i++) {
            const on = (elements[i].getAttribute('data-theme-value') || '') === active;
            elements[i].setAttribute('aria-current', on ? 'true' : 'false');
            // A switcher item rendered as a switch (not a button) reflects on/off state.
            const checkbox = elements[i].querySelector('.nds-switch-input');
            if (checkbox) checkbox.checked = on;
        }
    }

    let sheet = '';   // active stylesheet theme value ('' otherwise)
    let currentValue = '';  // the switcher value marked current, for a switcher mounted later
    // Apply a clicked switcher item — inside the shared reveal so a theme change ripples
    // from the clicked item, exactly like the dark toggle. (Predefined/custom recolour
    // synchronously inside the transition; a stylesheet theme's CSS loads async, so it
    // pops in after the ripple — the reveal still plays.)
    function setSelection(el) {
        reveal(() => {
            // Re-clicking the already-active theme toggles back to the DGA default.
            // syncSwitcher stamps aria-current="true" on the active item, so this is
            // type-agnostic (predefined / stylesheet / custom seed). The default item
            // itself carries no value/pack/seed, so it is never a toggle-off.
            const off = el.getAttribute('aria-current') === 'true'
                && !!(el.getAttribute('data-theme-value') || el.getAttribute('data-theme-js') || el.getAttribute('data-seed-primary'));
            const value = off ? '' : (el.getAttribute('data-theme-value') || '');
            const pack = off ? null : el.getAttribute('data-theme-js');
            const css = off ? null : el.getAttribute('data-theme-css');

            // Leaving a stylesheet theme → tear it down first.
            if (sheet && sheet !== value) { runHook(sheet, 'teardown'); window.__NDS_THEME_ACTIVE = ''; sheet = ''; }

            if (pack || css) {
                clearInline(); savePalette(null);
                setThemeToken(value);                       // marker token (records + persists the active sheet; the pack's addToken no-ops after this)
                window.__NDS_THEME_ACTIVE = value;
                dropInlineEventStyles(value);               // the theme we are leaving may have injected its own CSS
                if (css) ensureStylesheet(css);             // each asset the option declares, independently
                if (pack) ensureThemeJs(value, pack);
                runHook(value, 'inject');                   // re-activation; first activation self-injects on load
                sheet = value;
            } else if (!off && el.getAttribute('data-seed-primary')) {
                removeStylesheet(); setThemeToken('');      // custom rides [data-palette], not a token
                clearInline();
                const seeds = {};
                for (const key in seedProperties) {
                    const seedValue = el.getAttribute('data-seed-' + key);
                    if (seedValue) { root.style.setProperty(seedProperties[key], seedValue); seeds[seedProperties[key]] = seedValue; }
                }
                root.setAttribute('data-palette', '');
                savePalette({ value: value, seeds: seeds });
            } else {
                removeStylesheet(); clearInline(); savePalette(null);
                setThemeToken(value);                       // predefined seed theme, or '' for DGA
            }
            syncSwitcher(value);
            syncUrl(value);
            syncThemeColor();
        }, el);
    }

    // The address bar mirrors the choice — ?theme=<token>, no param for the
    // default — so the current look can be copied as a link.
    function syncUrl(value) {
        const params = new URLSearchParams(location.search);
        if (value) params.set('theme', value); else params.delete('theme');
        NDS.writeUrlParams(params);
    }

    // Reconcile switcher state at init (post-paint): the pre-paint stamp set data-theme,
    // so here we load any active stylesheet theme's assets, re-apply a saved custom
    // palette, and sync aria. A click landing in the pre-init gap no-ops, recovers next click.
    function reconcileSwitcher() {
        let palette = null;
        try { const stored = localStorage.getItem(PALETTE_KEY); if (stored) palette = JSON.parse(stored); } catch (e) { /* ignore */ }

        if (palette && palette.seeds) {
            // Custom inline seeds (not flash-free — re-applied here). Iterate the
            // known seedProperties, not the stored keys, so a tampered store can't set
            // arbitrary custom properties on :root.
            for (const key in seedProperties) {
                const value = palette.seeds[seedProperties[key]];
                if (value) root.style.setProperty(seedProperties[key], value);
            }
            root.setAttribute('data-palette', '');
            syncSwitcher(palette.value || '');
            return;
        }

        const active = getCurrentTokens().filter(token => getThemeNames().indexOf(token) !== -1)[0] || '';
        const el = findItem(active);
        const pack = el && el.getAttribute('data-theme-js');
        const css = el && el.getAttribute('data-theme-css');
        if (pack || css) {                                   // active token is a stylesheet theme → load what it declares
            sheet = active; window.__NDS_THEME_ACTIVE = active;
            if (css) ensureStylesheet(css);
            if (pack) ensureThemeJs(active, pack);
            runHook(active, 'inject');
        }
        syncSwitcher(active);
    }

    // Init: sync the toggles, the switcher and the bar color, then wire delegation. The
    // loader runs it on a toggle, a switcher or the theme-color meta, and mount()/refresh()
    // run it again for a later view: the sync runs every time, the restore and the
    // listeners once. First paint is owned by the pre-paint FOUC script.
    let wired = false, reconciled = false;
    function init() {
        setToggles(getTheme());
        if (reconciled) syncSwitcher(currentValue);
        else if (document.querySelector(SWITCH_SEL)) {
            reconciled = true;
            reconcileSwitcher();

            // ?theme=<token> applies that switcher option as if clicked (and persists
            // it); ?theme= (empty) returns to the default. The URL keeps the param so
            // the link can be copied; while it is there a reload re-applies it. Lands
            // after first paint, so the saved theme shows for a frame first.
            const params = new URLSearchParams(location.search);
            if (params.has('theme')) {
                const want = params.get('theme');
                const option = Array.from(document.querySelectorAll(SWITCH_SEL))
                    .find(el => (el.getAttribute('data-theme-value') || '') === want);
                if (option && option.getAttribute('aria-current') !== 'true') setSelection(option);
            }
        }
        syncThemeColor();

        if (wired) return;
        wired = true;

        // A switcher item is usually a button (click); it can also be a switch — then
        // the input's 'change' drives it, so skip the click to avoid a double-toggle.
        document.addEventListener('click', (e) => {
            const el = e.target.closest(SWITCH_SEL);
            if (!el || el.querySelector('.nds-switch-input')) return;
            setSelection(el);
        });
        document.addEventListener('change', (e) => {
            if (!e.target.matches('.nds-switch-input')) return;
            const el = e.target.closest(SWITCH_SEL);
            if (el) setSelection(el);   // setSelection toggles on the item's current state
        });

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
