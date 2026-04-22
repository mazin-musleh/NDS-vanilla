(function () {
    'use strict';
    if (typeof window === 'undefined') return;
    window.NDS = window.NDS || {};

    const NAV_EXCLUSIONS = '.nds-main-nav, .nds-sidemenu, .nds-footer';

    function init() {
        document.querySelectorAll('a').forEach(function (a) {
            if (!a.href || a.hostname === '') return;
            if (!a.classList.contains('nds-btn') && !a.classList.contains('nds-card')) {
                a.classList.add('nds-link');
            }
            if (a.closest(NAV_EXCLUSIONS)) return;
            if (a.hostname === location.hostname) return;
            a.classList.add('nds-external');
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');
        });
    }

    NDS.Link = { init };
})();
