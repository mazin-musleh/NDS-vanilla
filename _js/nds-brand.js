// NDS Brand — runtime brand switcher (localStorage). Two kinds, both keyed by
// nds-brand: a token brand sets [data-brand] (CSS in critical, no flash); a stylesheet
// brand loads its own CSS/JS from the switcher item's data-brand-css/js. The registry
// is the switcher markup (no globals). Delegated (injected after the reveal): first
// paint is owned by the pre-paint stamp, so init only reconciles state + wires the click.
// ("Theme" is reserved for dark/light mode — see NDS.Theme / nds-theme.js.)
(() => {
    'use strict';

    const root = document.documentElement;
    window.NDS = window.NDS || {};
    NDS.STORAGE = NDS.STORAGE || { THEME: 'nds-theme', BRAND: 'nds-brand' };
    const KEY = NDS.STORAGE.BRAND;
    const SWITCH_SEL = '[data-brand-value]';
    const LINK_ID = 'nds-brand-stylesheet';

    // Registry, read off the switcher markup: every [data-brand-value] is a brand; a
    // stylesheet brand's item also carries data-brand-css / data-brand-js (full URLs).
    const item     = (b) => b ? document.querySelector('[data-brand-value="' + b + '"]') : null;
    const brandCss = (b) => { const el = item(b); return el && el.getAttribute('data-brand-css'); };
    const brandJs  = (b) => { const el = item(b); return el && el.getAttribute('data-brand-js'); };
    const list     = () => Array.from(document.querySelectorAll(SWITCH_SEL))
        .map(el => el.getAttribute('data-brand-value')).filter(Boolean);

    const isStylesheet = (b) => !!brandCss(b);
    const isValid = (b) => !b || list().length === 0 || list().indexOf(b) !== -1; // '' = DGA default

    // Ensure the active brand's stylesheet <link> is present + current (idempotent).
    function ensureBrandCSS(name) {
        const href = brandCss(name);
        if (!href) return;
        let l = document.getElementById(LINK_ID);
        if (l) { if (l.getAttribute('href') !== href) l.setAttribute('href', href); return; }
        l = document.createElement('link');
        l.rel = 'stylesheet';
        l.id = LINK_ID;
        l.href = href;
        document.head.appendChild(l);
    }
    function removeBrandCSS() {
        const l = document.getElementById(LINK_ID);
        if (l) l.remove();
    }

    // Load a brand's optional behaviour script once (never pre-paint). The script
    // self-injects + registers inject/teardown on window.__NDS_BRAND_HOOKS[name].
    function ensureBrandJS(name) {
        const src = brandJs(name);
        if (!src) return;
        const id = 'nds-brand-js-' + name;
        if (document.getElementById(id)) return;
        const s = document.createElement('script');
        s.id = id;
        s.src = src;
        s.defer = true;
        document.head.appendChild(s);
    }

    // Run a leaving brand's teardown hook (registered by its behaviour script).
    function teardownBrand(name) {
        const h = (window.__NDS_BRAND_HOOKS || {})[name];
        if (h && typeof h.teardown === 'function') {
            try { h.teardown(); } catch (e) { /* brand teardown failed */ }
        }
    }

    let _current = '';
    function get() { return _current; }

    // Apply a selection. Token brands and stylesheet brands are mutually exclusive, so clear the other.
    function apply(brand) {
        if (isStylesheet(brand)) {
            root.removeAttribute('data-brand');   // stylesheet brands are :root-global, not [data-brand]
            ensureBrandCSS(brand);
            ensureBrandJS(brand);
            // First activation auto-injects on load; re-activation re-runs the hook.
            const h = (window.__NDS_BRAND_HOOKS || {})[brand];
            if (h && typeof h.inject === 'function') h.inject();
        } else {
            removeBrandCSS();
            if (brand) root.setAttribute('data-brand', brand);
            else root.removeAttribute('data-brand');
        }
    }

    function set(brand) {
        brand = brand || '';
        if (!isValid(brand)) return false;
        if (_current && _current !== brand && isStylesheet(_current)) teardownBrand(_current);
        apply(brand);
        _current = brand;
        try {
            if (brand) localStorage.setItem(KEY, brand);
            else localStorage.removeItem(KEY);
        } catch (e) { /* storage blocked (private mode) — selection still applies */ }
        syncControls(brand);
        return true;
    }

    // Reflect the active selection on every switcher control (aria-current).
    function syncControls(brand) {
        const els = document.querySelectorAll(SWITCH_SEL);
        for (let i = 0; i < els.length; i++) {
            const v = els[i].getAttribute('data-brand-value') || '';
            els[i].setAttribute('aria-current', v === brand ? 'true' : 'false');
        }
    }

    // Init: adopt the saved selection. The stamp set only the attribute, so a saved
    // stylesheet brand loads its CSS/JS here (after first paint) and a stale brand is cleared.
    let _initDone = false;
    function init() {
        if (_initDone) return;
        _initDone = true;

        let saved = '';
        try { saved = localStorage.getItem(KEY) || ''; } catch (e) { /* no storage */ }
        _current = isValid(saved) ? saved : '';

        if (isStylesheet(_current)) apply(_current);
        else if (!_current) root.removeAttribute('data-brand');

        syncControls(_current);

        document.addEventListener('click', (e) => {
            const el = e.target.closest(SWITCH_SEL);
            if (!el) return;
            set(el.getAttribute('data-brand-value') || '');
        });
    }

    // Public API.
    NDS.Brand = { init, get, set, list };
})();
