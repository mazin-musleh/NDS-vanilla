// NDS Theme — dark/light mode toggle with localStorage persistence
(() => {
    'use strict';

    const root = document.documentElement;
    const STORAGE_KEY = 'nds-theme';
    const TOGGLE_SEL = '[data-theme-toggle], #ndsThemeToggle';

    function getTheme() {
        return root.getAttribute('data-theme') || 'light';
    }

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        updateToggles(theme);
    }

    function toggle() {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
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
            const icon = el.querySelector('.hgi');
            if (icon) {
                icon.classList.toggle('hgi-sun-01', isDark);
                icon.classList.toggle('hgi-moon-02', !isDark);
            }
        }
    }

    // Bind toggle buttons and switch checkboxes via delegation
    document.addEventListener('click', e => {
        const el = e.target.closest(TOGGLE_SEL);
        if (!el) return;
        // If it's a switch with a checkbox, the checkbox already toggled — read its state
        const cb = el.querySelector('.nds-switch-input');
        if (cb) {
            setTheme(cb.checked ? 'dark' : 'light');
        } else {
            toggle();
        }
    });

    // Init: sync toggle button state with current theme
    document.addEventListener('DOMContentLoaded', () => updateToggles(getTheme()));

    // Public API
    window.NDS = window.NDS || {};
    NDS.theme = { get: getTheme, set: setTheme, toggle };
})();
