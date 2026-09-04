/* NDS.Link — public surface
 * Rides: (none — base component)
 * Methods:
 *   NDS.Link.init()   tag every external <a> on the page — safe to call again
 * Events:
 *   (none)
 * Hooks:
 *   data-no-external   on a link or any ancestor — opt that subtree out of tagging
 *   .nds-external      the class the component adds; add it yourself to FORCE the badge
 *                      on a link it would otherwise skip
 * Gotchas:
 *   - "External" means a different hostname from the page. A tagged link gets the
 *     .nds-external badge class plus target="_blank" and rel="noopener noreferrer".
 *   - Icon-only and image-only links are skipped, because the trailing badge clashes.
 *     An icon-only .nds-btn is skipped too.
 *   - Block content inside the link (`<a><p>…</p></a>`, editor markup) moves the
 *     badge to the deepest last block: the link gets .nds-external-block and
 *     that block gets .nds-external-badge.
 *   - There is no reinit(): call init() again after you inject links.
 */
(function () {
    'use strict';
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

    // Editors wrap link text in blocks (`<a><p>…</p></a>`), which pushes the
    // anchor's ::after badge onto a line of its own. Badge the deepest last
    // block instead, so it stays on the text line.
    // ponytail: tag allowlist, not computed display — getComputedStyle before
    // first paint forces a whole-document style pass.
    var BLOCK = { P: 1, DIV: 1, H1: 1, H2: 1, H3: 1, H4: 1, H5: 1, H6: 1, LI: 1, UL: 1, OL: 1, BLOCKQUOTE: 1, FIGURE: 1, FIGCAPTION: 1, SECTION: 1, ARTICLE: 1 };
    function badgeHost(a) {
        var host = a, n = a.lastChild;
        while (n) {
            if (n.nodeType === 1) {
                if (BLOCK[n.tagName] !== 1) break;
                host = n; n = n.lastChild;
            } else if (n.data.trim()) break;
            else n = n.previousSibling;
        }
        return host;
    }

    // Tag an external link: add the .nds-external badge class + safe target/rel.
    // Guards are layout-free (hostname/closest/classList), ordered hostname-first
    // so internal links short-circuit immediately.
    function tagExternal(a) {
        var hostname = a.hostname;
        if (!hostname || hostname === location.hostname) return;
        if (a.closest('[data-no-external]')) return;
        if (a.classList.contains('nds-btn') && a.classList.contains('nds-icon-only')) return;
        // Text-only links (most) skip the walk, so it is never even compiled there.
        var host = a.lastElementChild ? badgeHost(a) : a;
        if (!a.classList.contains('nds-external') && isIconOrImageOnly(host)) return;
        a.classList.add('nds-external');
        if (host !== a) {
            a.classList.add('nds-external-block');
            host.classList.add('nds-external-badge');
        }
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
    }

    // Tag every external anchor in one straight pass. No getBoundingClientRect —
    // the guards never read layout, so this forces no reflow and can run eagerly
    // (before first paint), tagging above-the-fold links so the .nds-external
    // ::after badge is present on the first frame with no CLS. Off-screen links
    // tag in the same pass; their badge shifts only below the fold (no visible
    // CLS) and is already in place by the time they scroll into view.
    // Only an href with an authority (`//`) can leave the site, so relative,
    // hash, mailto and tel links never reach the hostname parse.
    function init() {
        const anchors = document.querySelectorAll('a[href*="//"]');
        for (let i = 0; i < anchors.length; i++) tagExternal(anchors[i]);
    }

    NDS.Link = { init };
})();
