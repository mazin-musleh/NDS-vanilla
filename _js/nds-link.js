(function () {
    'use strict';
    if (typeof window === 'undefined') return;
    window.NDS = window.NDS || {};

    const NAV_EXCLUSIONS = ''; /* .nds-main-nav, .nds-sidemenu, .nds-footer */

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

    function tagExternal(a) {
        if (!a.href || a.hostname === '') return;
        if (a.hostname === location.hostname) return;
        if (NAV_EXCLUSIONS && a.closest(NAV_EXCLUSIONS)) return;
        if (a.closest('[data-no-external]')) return;
        if (a.classList.contains('nds-btn') && a.classList.contains('nds-icon-only')) return;
        if (!a.classList.contains('nds-external') && isIconOrImageOnly(a)) return;
        a.classList.add('nds-external');
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
    }

    // Viewport-aware tagging: anchors in the initial viewport tag synchronously
    // so the .nds-external CSS ::after badge paints on the first frame (no CLS).
    // Off-screen anchors are observed via NDS.onIntersect with a 200px rootMargin
    // so each tags just before scrolling into view — no CLS even on fast scrolls,
    // and the eager-pass sync cost stays bounded by visible-anchor count
    // instead of total anchor count.
    //
    // Three-pass shape (reads-then-writes per JSD-06 batched-reads pattern):
    //   1. Read every rect into visible/offscreen arrays — no writes interleaved,
    //      so the rect-read pass amortizes to a single layout flush.
    //   2. Write tagExternal() for the visible partition.
    //   3. Register NDS.onIntersect for the offscreen partition.
    function init() {
        const anchors = document.querySelectorAll('a');
        if (!anchors.length) return;
        const viewportH = window.innerHeight;
        const visible = [];
        const offscreen = [];
        for (let i = 0; i < anchors.length; i++) {
            const a = anchors[i];
            const rect = a.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < viewportH) {
                visible.push(a);
            } else {
                offscreen.push(a);
            }
        }
        for (let i = 0; i < visible.length; i++) tagExternal(visible[i]);
        for (let i = 0; i < offscreen.length; i++) {
            const a = offscreen[i];
            const off = NDS.onIntersect(a, () => {
                tagExternal(a);
                off();
            }, { rootMargin: '200px' });
        }
    }

    NDS.Link = { init };
})();
