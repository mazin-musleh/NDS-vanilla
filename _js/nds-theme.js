// NDS Theme — dark/light mode toggle with localStorage persistence
(() => {
    'use strict';

    const root = document.documentElement;
    const STORAGE_KEY = 'nds-theme';
    const TOGGLE_SEL = '[data-theme-toggle], #ndsThemeToggle';

    function getTheme() {
        return root.getAttribute('data-theme') || 'light';
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        updateToggles(theme);
    }

    function setTheme(theme, el) {
        if (!document.startViewTransition) return applyTheme(theme);

        // Get origin point from toggle element center or screen center
        let x = innerWidth / 2, y = innerHeight / 2;
        if (el) {
            const r = el.getBoundingClientRect();
            x = r.left + r.width / 2;
            y = r.top + r.height / 2;
        }
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

        const t = document.startViewTransition(() => applyTheme(theme));
        t.ready.then(() => {
            root.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
            );
        });
    }

    function toggle(el) {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark', el);
    }

    function updateToggles(theme) {
        const els = document.querySelectorAll(TOGGLE_SEL);
        const isDark = theme === 'dark';
        for (let i = 0; i < els.length; i++) {
            const el = els[i];
            // Switch component: sync checkbox state
            const cb = el.querySelector('.nds-switch-input');
            if (cb) cb.checked = isDark;
            // Button toggles: sync aria
            el.setAttribute('aria-pressed', isDark);
            // Icon swap
            const icon = el.querySelector('.nds-icon');
            if (icon) {
                icon.classList.toggle('nds-hgi-sun-01', isDark);
                icon.classList.toggle('nds-hgi-moon-02', !isDark);
            }
        }
    }

    // Init: syncs toggle UI and attaches click/change delegation. The loader
    // gates this on [data-theme-toggle] presence so toggle-less pages skip
    // the global listeners entirely. The FOUC inline script in <head> applies
    // the cached theme before first paint independently of this init.
    let _initDone = false;
    function init() {
        if (_initDone) return;
        _initDone = true;

        updateToggles(getTheme());

        // Button toggles — click delegation
        document.addEventListener('click', e => {
            const el = e.target.closest(TOGGLE_SEL);
            if (!el || el.querySelector('.nds-switch-input')) return;
            toggle(el);
        });

        // Switch toggles — 'change' fires for all paths: track click (Utils.triggerEvents),
        // label click (native browser toggle), and keyboard (keydown handler in nds-forms.js).
        document.addEventListener('change', e => {
            if (!e.target.matches('.nds-switch-input')) return;
            const el = e.target.closest(TOGGLE_SEL);
            if (!el) return;
            setTheme(e.target.checked ? 'dark' : 'light', el);
        });
    }

    // Public API
    window.NDS = window.NDS || {};
    NDS.Theme = { init, get: getTheme, set: setTheme, toggle };
})();
