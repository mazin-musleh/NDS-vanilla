(function () {
    'use strict';
    if (typeof window === 'undefined') return;
    window.NDS = window.NDS || {};

    const NAV_EXCLUSIONS = ''; /* .nds-main-nav, .nds-sidemenu, .nds-footer */

    // Direct subdomain only — matching on a stripped root (e.g. `gov.sa`) would
    // over-trust cousin domains on shared TLDs and unsafely skip rel="noopener".
    function isSubDomain(linkHost) {
        return linkHost !== location.hostname && linkHost.endsWith('.' + location.hostname);
    }

    function init() {
        document.querySelectorAll('a').forEach(function (a) {
            if (!a.href || a.hostname === '') return;
            if (!a.classList.contains('nds-btn') && !a.classList.contains('nds-card')) {
                a.classList.add('nds-link');
            }
            if (NAV_EXCLUSIONS && a.closest(NAV_EXCLUSIONS)) return;
            if (a.closest('[data-no-external]')) return;
            if (a.hostname === location.hostname) return;
            if (a.classList.contains('nds-btn') && a.classList.contains('nds-icon-only')) return;
            var sub = isSubDomain(a.hostname);
            a.classList.add('nds-external');
            a.setAttribute('target', '_blank');
            if (!sub) a.setAttribute('rel', 'noopener noreferrer');
        });
    }

    NDS.Link = { init };
})();
