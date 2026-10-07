/* NDS.Audit — public surface
 * Rides: (none — diagnostic module, not a component)
 * Methods:
 *   NDS.Audit.run()   run every check once; prints [NDS.Audit] console warnings
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
 *   - The icon check reads a ::before computed mask, so it only means something
 *     once the nds-icons sheet has applied; the post-init sweep runs late enough.
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
        const htmlDir = document.documentElement.dir; // raw read for the diagnostic text only — comparisons below use NDS.isRTL
        if (NDS.isArabic && !NDS.isRTL) {
            console.warn(`[NDS.Audit] <html lang="ar"> without dir="rtl"${htmlDir ? ` (dir="${htmlDir}")` : ' (no dir attribute)'} — NDS.isRTL reads false, so components run left-to-right under Arabic content. Set dir="rtl" in the markup.`);
        } else if (!NDS.isArabic && NDS.isRTL) {
            console.warn(`[NDS.Audit] <html dir="rtl"> with lang="${document.documentElement.lang || 'unset'}" — direction and language disagree. Set dir="ltr", or lang to an Arabic locale.`);
        }

        document.querySelectorAll('[data-filter-items]:not([data-nds-filter-initialized])').forEach(el => {
            if (el.closest('code, .code-example')) return;
            console.warn('[NDS.Audit] data-filter-items container never claimed by a filter — it stays skeleton-held. Remove the attribute or add the filter UI.', el);
        });
        document.querySelectorAll('.nds-filter:not([data-filter-target])').forEach(el => {
            if (el.closest('code, .code-example')) return;
            console.warn('[NDS.Audit] .nds-filter has no data-filter-target — no filter instance binds it, so its options never render and its criteria go nowhere. Add data-filter-target="<results container id>".', el);
        });
        document.querySelectorAll('.nds-paged-content:not([data-paged-initialized])').forEach(el => {
            if (el.closest('code, .code-example')) return;
            console.warn('[NDS.Audit] .nds-paged-content has no pagination nav — it stays skeleton-held and its data-paged-* slots never stamp. Unpaged lists use a plain container + data-filter-count.', el);
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
                console.warn(`[NDS.Audit] inline icon "${cls}" is not in the registered set and paints as a solid box. Use the HGI font class: <i class="hgi hgi-stroke ${cls.replace('nds-', '')}">`, el);
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
                // A hash router serves every route from one pathname, so the hash is
                // the route — without it every nav link reads as the current page.
                try {
                    const u = new URL(a.href);
                    samePage = normalizePath(u.pathname) === here && (!u.hash || u.hash === location.hash);
                } catch (e) { /* opaque href — skip */ }
            }
            const ariaCurrent = a.getAttribute('aria-current') === 'page';
            if (!samePage && !ariaCurrent) return;
            if (a.matches('[data-state~="active"]')) {
                console.warn('[NDS.Audit] current-page nav link uses data-state="active" — the main navigation marks the current page with "current" only. Use data-state="current".', a);
            } else {
                console.warn(`[NDS.Audit] this nav link ${samePage ? 'points at the current page' : 'carries aria-current="page"'} but has no data-state="current" — the current-page highlight never renders. Add data-state="current"${ariaCurrent ? '' : ' and aria-current="page"'}.`, a);
            }
        });

        // v2.0.0 renamed the main navigation's own classes and ids. Markup that kept an old
        // name still paints, but that part gets no nav style or behavior: name the new one.
        const NAV_V2 = {
            'nds-dropdown': 'nds-has-menu', 'nds-dropdown-menu': 'nds-nav-menu',
            'nds-dropdown-content': 'nds-nav-menu-content', 'nds-dropdown-item': 'nds-nav-menu-item',
            'nds-dropdown-columns': 'nds-nav-columns', 'nds-colView': 'nds-nav-columns (one class)',
            'nds-rowView': 'nds-nav-row (in place of nds-dropdown-columns)', 'nds-dropdown-title': 'nds-nav-title',
            'nds-column': 'nds-nav-column', 'nds-list': 'nds-nav-list', 'nds-multi-column-list': 'nds-multi-col',
            'nds-collapse': 'nds-nav-collapse', 'nds-collapse-content': 'nds-nav-collapse-content',
            'nds-mainNav-toggler': 'nds-nav-toggler', 'nds-CTA': 'nds-nav-cta', 'nds-PAB': 'nds-pinned',
        };
        document.querySelectorAll('.nds-main-nav').forEach(nav => {
            if (nav.closest('code, .code-example')) return;
            Object.keys(NAV_V2).forEach(old => {
                const el = nav.querySelector('.' + old);
                if (el) console.warn(`[NDS.Audit] main navigation uses the class "${old}", renamed in v2.0.0. Use ${NAV_V2[old]}.`, el);
            });
            [['ndsMainNav', 'nds-main-nav'], ['ndsNavCollapse', 'nds-nav-collapse']].forEach(([old, now]) => {
                const el = nav.id === old ? nav : nav.querySelector('#' + old);
                if (el) console.warn(`[NDS.Audit] main navigation uses the id "${old}", renamed in v2.0.0. Use id="${now}"${now === 'nds-nav-collapse' ? ', and aria-controls="nds-nav-collapse" on the menu button' : ''}.`, el);
            });
        });

        // Markup sort wires a list no other sorter owns: a Filter or a Table sorts its own,
        // and the button is left unbound.
        document.querySelectorAll('[data-sort-target]').forEach(btn => {
            if (btn.closest('code, .code-example')) return;
            const id = btn.getAttribute('data-sort-target');
            const list = document.getElementById(id);
            if (!list) console.warn(`[NDS.Audit] data-sort-target="${id}" names no element — the button sorts nothing. Give the list id="${id}".`, btn);
            else if (list.closest('.nds-table') || (list.ndsSort && !list.ndsSort._markup)) console.warn(`[NDS.Audit] data-sort-target="${id}" names a list a Filter or a Table already sorts — this button does nothing. Use data-filter-target on a Filter's sort button, or the table's header sort buttons.`, btn);
        });

        // The stepper hands off a submit-typed control (see its banner), so the
        // attribute is inert here — the author expects a move that never comes.
        // `button` with no type IS submit-typed inside a form.
        document.querySelectorAll('form :is(button:not([type="button"]):not([type="reset"]), input[type="submit"])[data-stepper-control]').forEach(el => {
            if (el.closest('code, .code-example')) return;
            console.warn('[NDS.Audit] submit-typed button with data-stepper-control — the stepper hands this click to the form and does not move, so the attribute does nothing. A form step is gated, so drive it from JS: call NDS.Stepper.next() after NDS.Forms.validateForm() passes, or from nds:formValid once your request succeeds.', el);
        });
        // A framework mount root between <body> and <main> breaks the vertical
        // flex chain: body is a flex column (min-height:100dvh) and main grows to
        // fill it, so an untreated wrapper leaves main at content height and the
        // footer rides up the viewport. Nothing errors and the page still paints.
        // No <main> at all is not a finding — a client-rendered app audited before
        // its first mount has nothing to judge yet.
        const mainEl = document.querySelector('body main');
        if (mainEl && mainEl.parentElement !== document.body && !mainEl.closest('code, .code-example')) {
            for (let n = mainEl.parentElement; n && n !== document.body; n = n.parentElement) {
                const cs = getComputedStyle(n);
                // The two treatments layout/page-layout.md prescribes: vanish from
                // the layout, or become the growing column yourself.
                if (cs.display === 'contents') continue;
                if (cs.display === 'flex' && cs.flexDirection === 'column' && parseFloat(cs.flexGrow) > 0) continue;
                const label = n.tagName.toLowerCase() + (n.id ? `#${n.id}` : '');
                console.warn(`[NDS.Audit] <${label}> sits between <body> and <main> with display:${cs.display} — main no longer grows, so the footer rides up the viewport instead of sitting at the bottom. Give it "display: contents", or "flex: 1; display: flex; flex-direction: column" when the app styles the mount root itself. See layout/page-layout.md.`, n);
                break; // one warning per page: the outermost break is the one to fix
            }
        }

        // .nds-content-layout is a grid — one column, or side-menu + content under
        // nds-wSideMenu. A component that returns a wrapper <div> instead of a
        // fragment lands an extra element in it, which takes a column of its own.
        document.querySelectorAll('.nds-content-layout').forEach(layout => {
            if (layout.closest('code, .code-example')) return;
            Array.from(layout.children).forEach(child => {
                if (child.matches('.nds-content, .nds-sidemenu')) return;
                if (getComputedStyle(child).display === 'contents') return;
                console.warn(`[NDS.Audit] <${child.tagName.toLowerCase()}> is a direct child of .nds-content-layout but is neither .nds-content nor .nds-sidemenu — it takes a grid column and shifts the layout. Return a fragment from the component instead of a wrapper, or give the wrapper "display: contents". See layout/page-layout.md.`, child);
            });
        });
    }

    NDS.Audit = { run };
})();
