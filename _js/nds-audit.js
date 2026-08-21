/* NDS.Audit — public surface
 * Rides: (none — diagnostic module, not a component)
 * Methods:
 *   NDS.Audit.run()   run every check once; prints [NDS] audit: console warnings
 * Events:
 *   (none)
 * Hooks:
 *   (none — reads the DOM, writes nothing)
 * Gotchas:
 *   - This bundle is never auto-injected. The loader pulls it when
 *     enableLogging schedules the post-init sweep, or on the first
 *     NDS.Init.audit() call (lazy namespace stub) — that first call returns a
 *     promise while the bundle loads. Production pages that never ask for it
 *     download zero bytes of it.
 *   - The icon check reads a ::before computed mask, so run after the icons
 *     CSS stamp (data-nds-icons-loaded) — the loader's schedule waits for it.
 *   - Icon names inside JS strings are invisible to this DOM sweep; check
 *     those against icons.yml by hand.
 */
// Debug audits — silent-failure classes nothing else reports. Console-only;
// every check warns and changes nothing.
(() => {
    'use strict';

    // '/dir/' and '/dir/index.html' are the same page for nav-href matching.
    const normalizePath = (p) => p.replace(/\/index\.html$/, '/');

    function run() {
        // NDS.isRTL tests dir alone (no lang fallback), and CSS flips off the same
        // attribute — so lang/dir disagreement runs components in one direction
        // under content written for the other, with nothing else reporting it.
        // Not auto-corrected: writing dir here flips the whole document a frame
        // after paint, and cannot help the pre-JS paint at all.
        const htmlDir = document.documentElement.dir;
        if (NDS.isArabic && htmlDir !== 'rtl') {
            console.warn(`[NDS] audit: <html lang="ar"> without dir="rtl"${htmlDir ? ` (dir="${htmlDir}")` : ' (no dir attribute)'} — NDS.isRTL reads false, so components run left-to-right under Arabic content. Set dir="rtl" in the markup.`);
        } else if (!NDS.isArabic && htmlDir === 'rtl') {
            console.warn(`[NDS] audit: <html dir="rtl"> with lang="${document.documentElement.lang || 'unset'}" — direction and language disagree. Set dir="ltr", or lang to an Arabic locale.`);
        }

        document.querySelectorAll('[data-filter-items]:not([data-nds-filter-initialized])').forEach(el => {
            if (el.closest('code, .code-example')) return;
            console.warn('[NDS] audit: data-filter-items container never claimed by a filter — it stays skeleton-held. Remove the attribute or add the filter UI.', el);
        });
        document.querySelectorAll('.nds-filter:not([data-filter-target])').forEach(el => {
            if (el.closest('code, .code-example')) return;
            console.warn('[NDS] audit: .nds-filter has no data-filter-target — no filter instance binds it, so its options never render and its criteria go nowhere. Add data-filter-target="<results container id>".', el);
        });
        document.querySelectorAll('.nds-paged-content:not([data-paged-initialized])').forEach(el => {
            if (el.closest('code, .code-example')) return;
            console.warn('[NDS] audit: .nds-paged-content has no pagination nav — it stays skeleton-held and its data-paged-* slots never stamp. Unpaged lists use a plain container + data-filter-count.', el);
        });

        document.querySelectorAll('.nds-icon[class*="nds-hgi-"]').forEach(el => {
            if (el.closest('code, .code-example')) return;
            // The glyph paints on ::before (mask: var(--nds-icon) …), so read the
            // pseudo — the element itself never carries a mask.
            const cs = getComputedStyle(el, '::before');
            const masked = (cs.maskImage && cs.maskImage !== 'none')
                || (cs.webkitMaskImage && cs.webkitMaskImage !== 'none');
            if (!masked) {
                const cls = [...el.classList].find(c => c.startsWith('nds-hgi-'));
                console.warn(`[NDS] audit: inline icon "${cls}" is not in the registered set and paints as a solid box. Use the HGI font class: <i class="hgi hgi-stroke ${cls.replace('nds-', '')}">`, el);
            }
        });

        // Current-page nav marking. The highlight keys off data-state~="current"
        // (_mainnav.scss); aria-current="page" alone drives no CSS. Two triggers,
        // one warning per link: an href that resolves to this page, or
        // aria-current without the token. A page genuinely absent from the nav
        // fires neither — silence is correct there, not a miss.
        const here = normalizePath(location.pathname);
        document.querySelectorAll('.nds-main-nav .nds-nav-primary a.nds-nav-link').forEach(a => {
            if (a.closest('code, .code-example')) return;
            if (a.matches('[data-state~="current"]')) return;
            const href = a.getAttribute('href');
            let samePage = false;
            if (href && href !== '#' && !href.startsWith('javascript:')) {
                try { samePage = normalizePath(new URL(a.href).pathname) === here; } catch (e) { /* opaque href — skip */ }
            }
            const ariaCurrent = a.getAttribute('aria-current') === 'page';
            if (!samePage && !ariaCurrent) return;
            if (a.matches('[data-state~="active"]')) {
                console.warn('[NDS] audit: current-page nav link uses data-state="active" — that token is component-owned and wiped when a dropdown closes. Use data-state="current".', a);
            } else {
                console.warn(`[NDS] audit: this nav link ${samePage ? 'points at the current page' : 'carries aria-current="page"'} but has no data-state="current" — the current-page highlight never renders. Add data-state="current"${ariaCurrent ? '' : ' and aria-current="page"'}.`, a);
            }
        });

        // The stepper hands off a submit-typed control (see its banner), so the
        // attribute is inert here — the author expects a move that never comes.
        // `button` with no type IS submit-typed inside a form.
        document.querySelectorAll('form :is(button:not([type="button"]):not([type="reset"]), input[type="submit"])[data-stepper-control]').forEach(el => {
            if (el.closest('code, .code-example')) return;
            console.warn('[NDS] audit: submit-typed button with data-stepper-control — the stepper hands this click to the form and does not move, so the attribute does nothing. A form step is gated, so drive it from JS: call NDS.Stepper.next() after NDS.Forms.validateForm() passes, or from nds:formValid once your request succeeds.', el);
        });
    }

    NDS.Audit = { run };
})();
