// NDS Language Switcher — cookie-based direction toggle with View Transition
(() => {
    'use strict';

    const root = document.documentElement;
    const TOGGLE_SEL = '[data-lang-toggle]';

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        const basePath = window.location.pathname.split('/').slice(0, 2).join('/') || '/';
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=${basePath}`;
    }

    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Find a [data-lang-value] item across all toggles, including portaled menus
    function findLangItem(lang) {
        const direct = document.querySelector(`[data-lang-toggle] .nds-dropmenu-item[data-lang-value="${lang}"]`);
        if (direct) return direct;
        // Portaled: menu is at <body> level — reach it via the _ownerMenu backref
        for (const wrapper of document.querySelectorAll('[data-lang-toggle]')) {
            const menu = wrapper._ownerMenu;
            if (menu) {
                const item = menu.querySelector(`.nds-dropmenu-item[data-lang-value="${lang}"]`);
                if (item) return item;
            }
        }
        return null;
    }

    function getLangLabel(lang) {
        const item = findLangItem(lang);
        if (item) {
            const label = item.querySelector('.nds-label');
            return label ? label.textContent.trim() : lang;
        }
        return lang === 'ar' ? 'العربية' : 'English';
    }

    // data-lang-dir on an item overrides the default (only 'ar' is RTL by default)
    function getDir(lang) {
        const item = findLangItem(lang);
        if (item && item.hasAttribute('data-lang-dir')) return item.getAttribute('data-lang-dir');
        return lang === 'ar' ? 'rtl' : 'ltr';
    }

    function updateToggles(lang) {
        const els = document.querySelectorAll(TOGGLE_SEL);
        for (let i = 0; i < els.length; i++) {
            const el = els[i];

            // Dropmenu-based toggle
            const trigger = el.querySelector('.nds-dropmenu-trigger');
            if (trigger) {
                const triggerLabel = trigger.querySelector('.nds-lang-current, .nds-label');
                if (triggerLabel) triggerLabel.textContent = getLangLabel(lang);

                // Mark active item; use _ownerMenu backref when menu is portaled
                const menuRoot = el._ownerMenu || el.querySelector('.nds-dropmenu-menu');
                if (menuRoot) {
                    menuRoot.querySelectorAll('.nds-dropmenu-item[data-lang-value]').forEach(item => {
                        if (item.getAttribute('data-lang-value') === lang) {
                            NDS.State.add(item, 'selected');
                        } else {
                            NDS.State.remove(item, 'selected');
                        }
                    });
                }
                continue;
            }

            // Simple toggle button
            const label = el.querySelector('.nds-lang-current, .nds-label');
            if (label) label.textContent = getLangLabel(lang);
        }
    }

    function applyLang(lang) {
        root.setAttribute('lang', lang);
        root.setAttribute('dir', getDir(lang));
        updateToggles(lang);
        // Direction-aware components subscribe to <html lang/dir> changes
        // via NDS.onAttrChange — no need to call them from here.
    }

    function switchLang(targetLang, el) {
        setCookie('preferred-language', targetLang, 365);

        if (!document.startViewTransition) return applyLang(targetLang);

        const t = document.startViewTransition(() => applyLang(targetLang));
        t.ready.then(() => {
            const isRTL = getDir(targetLang) === 'rtl';
            root.animate(
                [
                    { clipPath: `inset(0 ${isRTL ? '100%' : '0'} 0 ${isRTL ? '0' : '100%'})` },
                    { clipPath: 'inset(0 0% 0 0%)' }
                ],
                { duration: 400, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
            );
        });
    }

    // Click delegation — handles both simple toggle buttons and dropmenu language pickers
    document.addEventListener('click', e => {
        // Dropmenu item: portaled menus re-dispatch on the wrapper (e.ndsDropmenuItem);
        // non-portaled menus bubble naturally (e.target.closest())
        const item = (e.ndsDropmenuItem && e.ndsDropmenuItem.hasAttribute('data-lang-value'))
            ? e.ndsDropmenuItem
            : e.target.closest('.nds-dropmenu-item[data-lang-value]');

        if (item) {
            const ctx = item.closest('[data-lang-toggle]')  // non-portaled
                || e.target.closest('[data-lang-toggle]');  // portaled (e.target = wrapper after re-dispatch)
            if (ctx) {
                switchLang(item.getAttribute('data-lang-value'), ctx);
                return;
            }
        }

        // Simple toggle button (plain button, not a dropmenu wrapper)
        const el = e.target.closest(TOGGLE_SEL);
        if (!el || el.classList.contains('nds-dropmenu')) return;
        const targetLang = root.getAttribute('lang') === 'ar' ? 'en' : 'ar';
        switchLang(targetLang, el);
    });

    let _initDone = false;
    function init() {
        if (_initDone) return;
        _initDone = true;

        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        const cookieLang = getCookie('preferred-language');
        const currentLang = urlLang || cookieLang || 'en';

        if (urlLang) {
            setCookie('preferred-language', urlLang, 365);
            const cleanUrl = new URL(window.location);
            cleanUrl.searchParams.delete('lang');
            window.history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search);
        } else if (!cookieLang) {
            setCookie('preferred-language', currentLang, 365);
        }

        applyLang(currentLang);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.NDS = window.NDS || {};
    NDS.LangSwitcher = { init, setCookie, getCookie };
})();
