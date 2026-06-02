(function () {
    'use strict';
    if (typeof window === 'undefined') return;
    window.NDS = window.NDS || {};

    // Image/icon-only links (e.g. `<a><img></a>`, `<a><i class="hgi …"></i></a>`)
    // skip auto-tagging because the trailing badge clashes visually. Authors can
    // still force the badge by adding `nds-external` themselves.
    function isIconOrImageOnly(a) {
        if (a.textContent.trim()) return false;
        var kids = a.children;
        if (!kids.length) return false;
        for (var i = 0; i < kids.length; i++) {
            var tag = kids[i].tagName;
            if (tag !== 'I' && tag !== 'IMG') return false;
        }
        return true;
    }

    // Tag an external link: add the .nds-external badge class + safe target/rel.
    // Guards are layout-free (hostname/closest/classList), ordered hostname-first
    // so internal links short-circuit immediately.
    function tagExternal(a) {
        if (!a.href || a.hostname === '') return;
        if (a.hostname === location.hostname) return;
        if (a.closest('[data-no-external]')) return;
        if (a.classList.contains('nds-btn') && a.classList.contains('nds-icon-only')) return;
        if (!a.classList.contains('nds-external') && isIconOrImageOnly(a)) return;
        a.classList.add('nds-external');
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
    }

    // Tag every external anchor in one straight pass. No getBoundingClientRect —
    // the guards never read layout, so this forces no reflow and can run eagerly
    // (before first paint), tagging above-the-fold links so the .nds-external
    // ::after badge is present on the first frame with no CLS. Off-screen links
    // tag in the same pass; their badge shifts only below the fold (no visible
    // CLS) and is already in place by the time they scroll into view.
    function init() {
        const anchors = document.querySelectorAll('a');
        for (let i = 0; i < anchors.length; i++) tagExternal(anchors[i]);
    }

    NDS.Link = { init };
})();
