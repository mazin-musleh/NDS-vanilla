/* NDS.Audit — public surface
 * Rides: (none — diagnostic module, not a component)
 * Methods:
 *   NDS.Audit.run(opts)   run the rules once; prints [NDS.Audit] lines and returns the findings.
 *                         opts: { group, rule, quiet } (group/rule: a name or an array; quiet: no console)
 *   NDS.Audit.rule(def)   add a rule: { id, group, severity, docs, check(ctx) }. ctx.find(selector)
 *                         returns the elements a rule may judge; ctx.report(el, message, fix, severity)
 *   NDS.Audit.rules       every rule, in run order
 * Findings: { rule, group, severity, message, fix, docs, el, count }
 *   severity: error (broken now) · warn (works, but wrong or going away) · info
 *   groups:   page · structure · migration · i18n
 * Events:
 *   (none)
 * Hooks:
 *   window.NDS_AUDIT_RULES        rule definitions, read on every run
 *   data-nds-audit-ignore         on any element: the audit skips it and everything inside it. A value
 *                                 names the rule ids to skip ("migration-markup id-reference"); empty skips all.
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
 *   - The migration rows are _data/migrations.yml, baked in by js_processor.rb. A JS call or an
 *     event listener with an old name is invisible here: the release notes list those.
 *   - The CSS scan reads the site's own sheets only: NDS's sheets carry the deprecated aliases on
 *     purpose, and a cross-origin sheet throws on cssRules.
 */
// Debug audits — silent-failure classes nothing else reports. Console-only;
// every check warns and changes nothing.
(() => {
    'use strict';

    const DOCS = 'https://mazin-musleh.github.io/NDS-vanilla/';
    const RULES = [];

    function rule(def) {
        if (!def || !def.id || typeof def.check !== 'function') return console.warn('[NDS.Audit] a rule needs an id and a check()', def);
        const at = RULES.findIndex(r => r.id === def.id);
        const r = { group: 'structure', severity: 'warn', ...def };
        if (at < 0) RULES.push(r); else RULES[at] = r;
    }

    // data-nds-audit-ignore="" skips every rule; a value names the ones to skip.
    function ignored(el, id) {
        const host = el.closest('[data-nds-audit-ignore]');
        if (!host) return false;
        const v = host.getAttribute('data-nds-audit-ignore').trim();
        return !v || v.split(/[\s,]+/).includes(id);
    }

    function run({ group, rule: only, quiet } = {}) {
        // Read on every run: rule() replaces by id, and a site may push to the array later.
        (window.NDS_AUDIT_RULES || []).forEach(rule);
        const groups = group == null ? null : [].concat(group);
        const ids = only == null ? null : [].concat(only);
        const findings = [];
        for (const r of RULES) {
            if ((groups && !groups.includes(r.group)) || (ids && !ids.includes(r.id))) continue;
            // Markup inside <code> is a sample, never the page.
            const skip = (el) => !!el && el.nodeType === 1 && (!!el.closest('code') || ignored(el, r.id));
            const ctx = {
                find: (sel) => [...document.querySelectorAll(sel)].filter(el => !skip(el)),
                report(el, message, fix, severity, count) {
                    if (skip(el)) return;
                    findings.push({ rule: r.id, group: r.group, severity: severity || r.severity, message, fix,
                                    docs: r.docs ? DOCS + r.docs : undefined, el: el || undefined, count });
                },
            };
            try { r.check(ctx); } catch (e) { console.warn(`[NDS.Audit] rule ${r.id} failed:`, e); }
        }
        if (!quiet) print(findings);
        return findings;
    }

    function print(findings) {
        const out = { error: console.error, warn: console.warn, info: console.info };
        const n = { error: 0, warn: 0, info: 0 };
        for (const f of findings) {
            n[f.severity]++;
            const text = `[NDS.Audit] ${f.rule}: ${f.message}${f.fix ? ' ' + f.fix : ''}${f.docs ? ' ' + f.docs : ''}`;
            (out[f.severity] || console.warn)(text, ...(f.el ? [f.el] : []));
        }
        console.info(`[NDS.Audit] ${n.error} errors, ${n.warn} warnings, ${n.info} notes.`);
    }

    // ── page ─────────────────────────────────────────────────────────

    // NDS.isRTL tests dir alone (no lang fallback), and CSS flips off the same
    // attribute — so lang/dir disagreement runs components in one direction
    // under content written for the other, with nothing else reporting it.
    // Not auto-corrected: writing dir here flips the whole document a frame
    // after paint, and cannot help the pre-JS paint at all.
    rule({ id: 'lang-dir', group: 'page', docs: 'ui-shell/head.html', check(ctx) {
        const html = document.documentElement;
        const htmlDir = html.dir; // raw read for the diagnostic text only — comparisons below use NDS.isRTL
        const htmlLang = html.lang || 'unset';
        // ponytail: the common right-to-left languages; Intl.Locale's text info is missing in Firefox.
        const rtlLang = /^(ar|fa|ur|he|ps|ckb|dv|yi|sd|ug)$/.test(NDS.lang);
        if (!html.lang) ctx.report(null, '<html> has no lang attribute — components write their text in English and the pack never loads for the page\'s language.', 'Set lang on <html>, such as lang="ar".');
        if (rtlLang && !NDS.isRTL) {
            ctx.report(null, `<html lang="${htmlLang}"> without dir="rtl"${htmlDir ? ` (dir="${htmlDir}")` : ' (no dir attribute)'} — NDS.isRTL reads false, so components run left-to-right under right-to-left content.`, 'Set dir="rtl" in the markup.');
        } else if (!rtlLang && NDS.isRTL) {
            ctx.report(null, `<html dir="rtl"> with lang="${htmlLang}" — direction and language disagree.`, 'Set dir="ltr", or lang to a right-to-left language.');
        }
    } });

    // The component token tier ships in the main sheet only, so an empty value means it never applied.
    rule({ id: 'css-missing', group: 'page', severity: 'error', docs: 'ui-shell/head.html', check(ctx) {
        if (!getComputedStyle(document.documentElement).getPropertyValue('--avatar-background').trim()) {
            ctx.report(null, 'the NDS main stylesheet is not applied — components render without their styles.', 'Check the nds-main.min.css link in <head>, and NDS_ASSETS_PATH when the files sit elsewhere.');
        }
    } });

    rule({ id: 'skip-link', group: 'page', docs: 'layout/page-layout.html', check(ctx) {
        const content = document.querySelector('.nds-content');
        const link = document.querySelector('a.nds-skip-link');
        if (!link) {
            if (content) ctx.report(content, 'the page has no skip link — keyboard users tab through the whole header on every page.', 'Add <a class="nds-skip-link" href="#main-content"> first in <body>, and id="main-content" on .nds-content.');
            return;
        }
        const target = document.getElementById((link.getAttribute('href') || '').replace(/^#/, ''));
        if (!target) ctx.report(link, `the skip link points at "${link.getAttribute('href')}", which no element has — it moves focus nowhere.`, 'Give .nds-content id="main-content".', 'error');
        else if (target.tagName === 'MAIN' && content) ctx.report(target, 'the skip link lands on <main>, which opens with the hero and the side menu (the 1.11.0 pattern).', 'Move id="main-content" to .nds-content.');
    } });

    // A framework mount root between <body> and <main> breaks the vertical
    // flex chain: body is a flex column (min-height:100dvh) and main grows to
    // fill it, so an untreated wrapper leaves main at content height and the
    // footer rides up the viewport. Nothing errors and the page still paints.
    // No <main> at all is not a finding — a client-rendered app audited before
    // its first mount has nothing to judge yet.
    rule({ id: 'main-flex', group: 'page', docs: 'layout/page-layout.html', check(ctx) {
        const mainEl = ctx.find('body main')[0];
        if (!mainEl || mainEl.parentElement === document.body) return;
        for (let n = mainEl.parentElement; n && n !== document.body; n = n.parentElement) {
            const cs = getComputedStyle(n);
            // The two treatments layout/page-layout.md prescribes: vanish from
            // the layout, or become the growing column yourself.
            if (cs.display === 'contents') continue;
            if (cs.display === 'flex' && cs.flexDirection === 'column' && parseFloat(cs.flexGrow) > 0) continue;
            const label = n.tagName.toLowerCase() + (n.id ? `#${n.id}` : '');
            ctx.report(n, `<${label}> sits between <body> and <main> with display:${cs.display} — main no longer grows, so the footer rides up the viewport instead of sitting at the bottom.`, 'Give it "display: contents", or "flex: 1; display: flex; flex-direction: column" when the app styles the mount root itself.');
            break; // one warning per page: the outermost break is the one to fix
        }
    } });

    // .nds-content-layout is a grid — one column, or side-menu + content under
    // nds-has-sidemenu. A component that returns a wrapper <div> instead of a
    // fragment lands an extra element in it, which takes a column of its own.
    rule({ id: 'content-layout-child', group: 'page', docs: 'layout/page-layout.html', check(ctx) {
        ctx.find('.nds-content-layout').forEach(layout => {
            Array.from(layout.children).forEach(child => {
                if (child.matches('.nds-content, .nds-sidemenu')) return;
                if (getComputedStyle(child).display === 'contents') return;
                ctx.report(child, `<${child.tagName.toLowerCase()}> is a direct child of .nds-content-layout but is neither .nds-content nor .nds-sidemenu — it takes a grid column and shifts the layout.`, 'Return a fragment from the component instead of a wrapper, or give the wrapper "display: contents".');
            });
        });
    } });

    // An NDS page runs NDS and vanilla JS only; a legacy library loaded beside it
    // restyles or re-wires NDS markup with nothing else reporting it.
    rule({ id: 'legacy-library', group: 'page', check(ctx) {
        const $ = window.jQuery;
        const found = [];
        if ($) found.push('jQuery');
        if ($ && $.fn && $.fn.select2) found.push('Select2');
        if ($ && $.fn && ($.fn.DataTable || $.fn.dataTable)) found.push('DataTables');
        const sheets = [...document.querySelectorAll('link[rel="stylesheet"][href]')].map(l => l.href.toLowerCase());
        if (sheets.some(h => /bootstrap/.test(h))) found.push('Bootstrap CSS');
        if (sheets.some(h => /font-?awesome/.test(h)) || document.querySelector('.fa, .fas, .far, .fab, [class^="fa-"], [class*=" fa-"]')) found.push('Font Awesome');
        if (found.length) ctx.report(null, `legacy UI loaded on an NDS page: ${found.join(', ')}.`, 'Replace it with the NDS component or API for the same job, and load the legacy library only on legacy pages.');
    } });

    // The loader injects each bundle itself, and a script it inserts is async.
    // ponytail: a hand-written tag with an async attribute passes; check the HTML if it matters.
    rule({ id: 'bundle-tag', group: 'page', docs: 'ui-shell/head.html', check(ctx) {
        const files = Object.values(window.__NDS_BUNDLES || {}).map(b => b.file).filter(Boolean);
        ctx.find('script[src]').forEach(s => {
            const file = files.find(f => s.getAttribute('src').split(/[?#]/)[0].endsWith(f));
            if (file && !s.async) ctx.report(s, `${file} has a tag in the page. The loader adds each bundle when the page needs it.`, 'Remove the tag.');
        });
    } });

    // defer has no effect without src: the code runs at parse time, before the deferred NDS scripts.
    rule({ id: 'inline-defer', group: 'page', check(ctx) {
        ctx.find('script:not([src])[defer]').forEach(s => {
            ctx.report(s, 'an inline <script defer> runs at once: defer works only on a script with src, so this code runs before NDS loads.', 'Use <script type="module">, which waits for the page, or move the code to a file loaded with defer after the NDS scripts.');
        });
    } });

    // A swapped picture that keeps the template's width/height is stretched, or reserves the wrong space.
    // ponytail: SVG skipped — its natural size is the browser's 300×150 default when it has none.
    rule({ id: 'img-size', group: 'page', check(ctx) {
        ctx.find('img[width][height]').forEach(img => {
            if (!img.complete || !img.naturalWidth || /\.svg([?#]|$)/i.test(img.currentSrc)) return;
            const w = +img.getAttribute('width'), h = +img.getAttribute('height');
            if (!w || !h || Math.abs((w / h) / (img.naturalWidth / img.naturalHeight) - 1) < 0.05) return;
            ctx.report(img, `<img width="${w}" height="${h}"> shows a ${img.naturalWidth}×${img.naturalHeight} picture: the shapes differ, so it stretches or the layout jumps when it loads.`,
                'Set width and height to the picture\'s real pixel size.');
        });
    } });


    // A browser date or time field skips the NDS picker: no Hijri, no site format, its own look.
    rule({ id: 'native-date-time', group: 'page', check(ctx) {
        ctx.find('input[type="date"], input[type="month"], input[type="week"], input[type="datetime-local"], input[type="time"]').forEach(el => {
            const time = el.type === 'time';
            ctx.report(el, `<input type="${el.type}"> on an NDS page: the browser's own picker, not the NDS ${time ? 'time' : 'date'} picker.`,
                `Use the ${time ? 'Time Picker' : 'Date Picker'} canon.`);
        });
    } });

    // A toolbar part lifted out of .nds-toolbar still lays out as a bar, so nothing else shows the
    // lost wrapper: stacked rows touch, and the bar loses its gap to the content below.
    // Every nds-toolbar-* class is a toolbar part. One finding per lost bar: a part inside a reported one is skipped.
    rule({ id: 'toolbar-part', group: 'structure', docs: 'components/toolbar.html', check(ctx) {
        ctx.find('[class*="nds-toolbar-"]').forEach(el => {
            const part = [...el.classList].find(c => c.startsWith('nds-toolbar-'));
            if (!part || el.closest('.nds-toolbar') || el.parentElement?.closest('[class*="nds-toolbar-"]')) return;
            ctx.report(el, `.${part} outside a .nds-toolbar.`, 'Wrap the bar in <div class="nds-toolbar">, as the toolbar canon has it.');
        });
    } });

    // ── i18n ─────────────────────────────────────────────────────────

    rule({ id: 'i18n-pack', group: 'i18n', severity: 'error', docs: 'core/i18n.html', check(ctx) {
        const lang = NDS.i18n && NDS.i18n._lang();
        // undefined: still loading. null: the file and its en fallback both failed.
        if (lang && NDS.i18n._files[lang] === null) {
            ctx.report(null, `the language file for "${lang}" did not load — components show their English text.`, 'Keep the i18n/ folder beside the folder that holds nds-main.min.js, or set NDS_I18N_PATH.');
        }
    } });

    // ── structure ────────────────────────────────────────────────────

    rule({ id: 'filter-unclaimed', severity: 'error', docs: 'components/filter.html', check(ctx) {
        ctx.find('[data-filter-items]:not([data-nds-filter-initialized])').forEach(el =>
            ctx.report(el, 'data-filter-items container never claimed by a filter — it stays skeleton-held.', 'Remove the attribute or add the filter UI.'));
    } });

    rule({ id: 'filter-no-target', severity: 'error', docs: 'components/filter.html', check(ctx) {
        ctx.find('.nds-filter:not([data-filter-target])').forEach(el =>
            ctx.report(el, '.nds-filter has no data-filter-target — no filter instance binds it, so its options never render and its criteria go nowhere.', 'Add data-filter-target="<results container id>".'));
    } });

    rule({ id: 'paged-no-nav', severity: 'error', docs: 'components/pagination.html', check(ctx) {
        ctx.find('.nds-paged-content:not([data-paged-initialized])').forEach(el =>
            ctx.report(el, '.nds-paged-content has no pagination nav — it stays skeleton-held and its data-paged-* slots never stamp.', 'Unpaged lists use a plain container + data-filter-count.'));
    } });

    rule({ id: 'icon-unregistered', severity: 'error', docs: 'components/icons.html', check(ctx) {
        ctx.find('.nds-icon[class*="nds-hgi-"]').forEach(el => {
            // The glyph paints on ::before (mask: var(--nds-icon) …), so read the
            // pseudo — the element itself never carries a mask.
            const cs = getComputedStyle(el, '::before');
            const masked = (cs.maskImage && cs.maskImage !== 'none')
                || (cs.webkitMaskImage && cs.webkitMaskImage !== 'none');
            if (masked) return;
            const cls = [...el.classList].find(c => c.startsWith('nds-hgi-'));
            ctx.report(el, `inline icon "${cls}" is not in the registered set and paints as a solid box.`, `Use the HGI font class: <i class="hgi hgi-stroke ${cls.replace('nds-', '')}">`);
        });
    } });

    // Current-page nav marking. The highlight keys off data-state~="current"
    // (_mainnav.scss); aria-current="page" alone drives no CSS. Two triggers,
    // one warning per link: an href that resolves to this page, or
    // aria-current without the token. A page genuinely absent from the nav
    // fires neither — silence is correct there, not a miss.
    const normalizePath = (p) => p.replace(/\/index\.html$/, '/');
    rule({ id: 'nav-current', docs: 'ui-shell/mainnav.html', check(ctx) {
        const here = normalizePath(location.pathname);
        ctx.find('.nds-main-nav .nds-nav-primary a.nds-nav-link').forEach(a => {
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
                ctx.report(a, 'current-page nav link uses data-state="active" — the main navigation marks the current page with "current" only.', 'Use data-state="current".');
            } else {
                ctx.report(a, `this nav link ${samePage ? 'points at the current page' : 'carries aria-current="page"'} but has no data-state="current" — the current-page highlight never renders.`, `Add data-state="current"${ariaCurrent ? '' : ' and aria-current="page"'}.`);
            }
        });
    } });

    // Attributes whose value names another element. A miss wires nothing and throws nothing.
    // ponytail: the attributes NDS resolves by id or selector today; add one when a component reads a new one.
    const REFS = {
        'data-filter-target': 'components/filter.html', 'data-selection-target': 'components/selection.html',
        'data-sort-target': 'components/sort.html', 'data-per-page-target': 'components/pagination.html',
        'data-auto-pagination': 'components/pagination.html', 'data-modal-target': 'components/modal.html',
        'data-stepper-target': 'components/stepper.html', 'data-columns-target': 'components/tables.html',
        'data-voice-target': 'components/voice-input.html', 'data-copy-target': 'utilities/copy.html',
        'data-export-target': 'components/export.html', 'data-paged-target': 'components/pagination.html',
    };
    // A template-held modal or panel is real: NDS.fromTemplate moves it in on first open.
    const inTemplate = (id) => [...document.querySelectorAll('template')].some(t => t.content.getElementById(id));
    const resolves = (attr, v) => !!NDS.resolveEl(v) || inTemplate(v.replace(/^#/, ''))
        || (attr === 'data-voice-target' && !!document.querySelector(`[name="${CSS.escape(v)}"]`));
    rule({ id: 'id-reference', severity: 'error', check(ctx) {
        for (const attr in REFS) {
            ctx.find(`[${attr}]`).forEach(el => {
                const v = el.getAttribute(attr).trim();
                // An empty data-auto-pagination uses the container right before the nav.
                if (!v || resolves(attr, v)) return;
                ctx.report(el, `${attr}="${v}" names no element on the page — the component it wires does nothing.`, `Give the element id="${v.replace(/^#/, '')}", or fix the value. See ${DOCS}${REFS[attr]}`);
            });
        }
    } });

    // A screen reader announces the link to nothing, and a table sub-row toggle opens nothing.
    rule({ id: 'aria-controls', check(ctx) {
        ctx.find('[aria-controls]').forEach(el => {
            const missing = el.getAttribute('aria-controls').trim().split(/\s+/)
                .filter(id => id && !document.getElementById(id) && !inTemplate(id));
            if (missing.length) ctx.report(el, `aria-controls="${missing.join(' ')}" names no element on the page.`, 'Give the controlled element that id, or remove the attribute.');
        });
    } });

    // Markup sort wires a list no other sorter owns: a Filter or a Table sorts its own,
    // and the button is left unbound.
    rule({ id: 'sort-target-owned', docs: 'components/sort.html', check(ctx) {
        ctx.find('[data-sort-target]').forEach(btn => {
            const list = document.getElementById(btn.getAttribute('data-sort-target'));
            if (list && (list.closest('.nds-table') || (list.ndsSort && !list.ndsSort._markup))) {
                ctx.report(btn, `data-sort-target="${list.id}" names a list a Filter or a Table already sorts — this button does nothing.`, "Use data-filter-target on a Filter's sort button, or the table's header sort buttons.");
            }
        });
    } });

    // The stepper hands off a submit-typed control (see its banner), so the
    // attribute is inert here — the author expects a move that never comes.
    // `button` with no type IS submit-typed inside a form.
    rule({ id: 'stepper-submit', docs: 'components/stepper.html', check(ctx) {
        ctx.find('form :is(button:not([type="button"]):not([type="reset"]), input[type="submit"])[data-stepper-control]').forEach(el =>
            ctx.report(el, 'submit-typed button with data-stepper-control — the stepper hands this click to the form and does not move, so the attribute does nothing.', 'A form step is gated, so drive it from JS: call NDS.Stepper.next() after NDS.Forms.validateForm() passes, or from nds:formValid once your request succeeds.'));
    } });

    // ── migration ────────────────────────────────────────────────────

    const MIGRATIONS = /*@migrations*/[];
    const rows = MIGRATIONS.map(([kind, name, scope, status, use, since, fix, inert]) =>
        ({ kind, name, scope: scope || null, status, use: use || null, since, fix: fix || (use ? `Use ${use}.` : ''), inert: !!inert }));
    const byKind = {};
    rows.forEach(r => ((byKind[r.kind] ||= new Map()).get(r.name) || byKind[r.kind].set(r.name, []).get(r.name)).push(r));
    const SEVERITY = { renamed: 'error', removed: 'error', deprecated: 'warn' };
    const label = { class: 'class', attribute: 'attribute', property: 'property', id: 'id', global: 'window setting' };
    const say = (r, inCss) => r.status === 'deprecated'
        ? `${label[r.kind]} "${r.name}" is deprecated since ${r.since}: it still works, until the next major release.`
        : `${label[r.kind]} "${r.name}" was ${r.status} in ${r.since}` + (inCss ? '.'
            : `, so ${r.kind === 'global' ? 'NDS no longer reads it' : 'this part gets no NDS style or behavior'}.`);
    // A name NDS never read had no effect when set, so it is a note, not a break.
    const reportRow = (ctx, r, el, msg, inert, count) => ctx.report(el, msg,
        inert ? `${r.fix} Setting the old name never had an effect.` : r.fix, inert ? 'info' : SEVERITY[r.status], count);
    // A leading & tests the element itself; any other scope, the element or an ancestor.
    const inScope = (el, scope) => !scope || (scope[0] === '&' ? el.matches(scope.slice(1)) : !!el.closest(scope));

    // The site's own sheets: NDS's carry the deprecated aliases on purpose, and a cross-origin
    // sheet throws on cssRules.
    const OWN = /\/(nds[-.][\w.-]*|hgi-[\w-]*)\.css(\?|#|$)|\/docs-assets\//;
    // NDS's inline <style>s: an event pack's sheet, the docs site's, and the head's fold copy.
    // ponytail: the fold is known by its topbar reservation; mark the tag if that ever moves.
    const ownStyle = (n) => n?.tagName === 'STYLE' && (n.hasAttribute('data-nds-event-style') || n.hasAttribute('data-nds-doc') || n.textContent.includes(':where(.nds-topbar)'));
    const walkRules = (sheet, fn) => {
        const walk = (list) => { for (const r of list) { if (r.selectorText) fn(r); if (r.cssRules) walk(r.cssRules); } };
        try { walk(sheet.cssRules); return true; } catch (e) { return false; /* cross-origin */ }
    };
    function siteRules() {
        const out = [];
        for (const sheet of document.styleSheets) {
            if ((sheet.href && OWN.test(sheet.href)) || ownStyle(sheet.ownerNode)) continue;
            const where = sheet.href || 'an inline <style>';
            walkRules(sheet, r => out.push({ sel: r.selectorText, style: r.style, where }));
        }
        return out;
    }

    // A selector list split at its top-level commas only: :is(a, b) stays one item.
    const selItems = (sel) => {
        const out = [];
        let depth = 0, from = 0;
        for (let i = 0; i < sel.length; i++) {
            const c = sel[i];
            if (c === '(' || c === '[') depth++;
            else if (c === ')' || c === ']') depth--;
            else if (c === ',' && !depth) { out.push(sel.slice(from, i).trim()); from = i + 1; }
        }
        out.push(sel.slice(from).trim());
        return out;
    };
    const DARK_MODE = /^:root\[data-theme~?="dark"\]/;
    const DARK_AREA = /\[data-theme~?="dark"\]:not\(:root\)/;
    const STATE = /^(--[\w-]+)-(default|hovered|pressed|selected|focused|disabled)$/;
    const customOnly = (style) => [...style].every(p => p.startsWith('--'));

    // What NDS's own sheets declare: their classes, the nds- classes of each selector, and the tokens
    // at :root in light mode, in dark mode, and with the dark-area selector. null when the sheets
    // come from another origin.
    function ndsSheets() {
        const nds = { classes: new Set(), items: [], light: new Set(), dark: new Set(), area: new Set() };
        let readable = false;
        for (const sheet of document.styleSheets) {
            if (!sheet.href || !OWN.test(sheet.href)) continue;
            readable = walkRules(sheet, r => {
                const it = selItems(r.selectorText);
                for (const s of it) {
                    const cls = new Set([...s.matchAll(/\.(nds-[\w-]+)/g)].map(m => m[1]));
                    if (cls.size) { nds.items.push(cls); cls.forEach(c => nds.classes.add(c)); }
                }
                const dark = it.some(s => DARK_MODE.test(s)), root = it.includes(':root'), area = it.some(s => DARK_AREA.test(s));
                if (!dark && !root) return;
                for (const p of r.style) if (p.startsWith('--')) { nds[dark ? 'dark' : 'light'].add(p); if (area) nds.area.add(p); }
            }) || readable;
        }
        return readable ? nds : null;
    }
    const isToken = (nds, p) => nds.light.has(p) || nds.dark.has(p);

    // A site sheet before the NDS one loses every tie with it, so its overrides of NDS do nothing.
    rule({ id: 'css-order', group: 'page', docs: 'components/tokens.html', check(ctx) {
        const main = document.querySelector('link[rel="stylesheet"][href*="nds-main"]');
        const nds = main && ndsSheets();
        if (!nds) return;
        for (const sheet of document.styleSheets) {
            const n = sheet.ownerNode;
            if (!n || (sheet.href && OWN.test(sheet.href)) || ownStyle(n) || !(main.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING)) continue;
            let touches = false;
            walkRules(sheet, r => { touches ||= /\.nds-/.test(r.selectorText) || [...r.style].some(p => isToken(nds, p)); });
            if (touches) ctx.report(n, `${sheet.href || 'an inline <style>'} styles NDS but loads before the NDS stylesheet, so NDS wins every tie and the override does nothing.`,
                'Load it after the NDS stylesheet.');
        }
    } });

    // An override is the last resort, and it names a project hook so it never restyles NDS everywhere.
    rule({ id: 'nds-restyle', group: 'page', docs: 'components/tokens.html', check(ctx) {
        const bySheet = new Map();
        for (const { sel, style, where } of siteRules()) {
            if (customOnly(style)) continue;
            // A project class, an id, or a data-* that is not an NDS state names the site's own scope.
            const bare = selItems(sel).filter(s => /\.(nds|hgi)-/.test(s) && !/\.(?!nds-|hgi-)-?[_a-zA-Z]|#|\[data-(?!state|status|theme|nds-)/.test(s));
            if (bare.length) (bySheet.get(where) || bySheet.set(where, []).get(where)).push(...bare);
        }
        bySheet.forEach((sels, where) => ctx.report(null,
            `${where} restyles NDS classes with no project class in the selector (${[...new Set(sels)].slice(0, 3).join(', ')}${sels.length > 3 ? ', …' : ''}): ${sels.length} selector${sels.length > 1 ? 's' : ''}.`,
            'Use the component\'s knobs or a token. When an override is the only way, scope it under a project class or data-* attribute, and comment why.', undefined, sels.length));
    } });

    // A site rule on bare tags (body, h1, a, input) reaches every NDS element on the page.
    rule({ id: 'global-element-css', group: 'page', check(ctx) {
        const bySheet = new Map();
        for (const { sel, style, where } of siteRules()) {
            if (customOnly(style)) continue;
            const bare = selItems(sel).filter(s => !/[.#]|\[(data-|class|id)\b|:root/.test(s));
            if (bare.length) (bySheet.get(where) || bySheet.set(where, []).get(where)).push(...bare);
        }
        bySheet.forEach((sels, where) => ctx.report(null,
            `${where} styles bare elements (${[...new Set(sels)].slice(0, 4).join(', ')}${sels.length > 4 ? ', …' : ''}): ${sels.length} selector${sels.length > 1 ? 's' : ''} that reach${sels.length > 1 ? '' : 'es'} every NDS element on the page.`,
            'Scope them under a project class, or keep the sheet off NDS pages.', undefined, sels.length));
    } });

    // A token override follows the tokens doc: every state of a family, a dark value when NDS has one,
    // and the dark-area selector on both rules. Judged only when NDS's own sheets are readable.
    rule({ id: 'token-dark', group: 'page', docs: 'components/tokens.html', check(ctx) {
        const nds = ndsSheets();
        if (!nds) return;
        const set = new Map();   // name → { light, dark, lightArea, darkArea }
        for (const { sel, style } of siteRules()) {
            const it = selItems(sel);
            const dark = it.some(s => DARK_MODE.test(s)), root = it.includes(':root'), area = it.some(s => DARK_AREA.test(s));
            if (!dark && !root) continue;
            for (const p of style) {
                if (!isToken(nds, p)) continue;
                const s = set.get(p) || set.set(p, {}).get(p);
                if (dark) { s.dark = true; s.darkArea ||= area; } else { s.light = true; s.lightArea ||= area; }
            }
        }
        const list = (names) => names.slice(0, 5).join(', ') + (names.length > 5 ? ` and ${names.length - 5} more` : '');
        const noDark = [...set].filter(([p, s]) => s.light && !s.dark && nds.dark.has(p)).map(([p]) => p);
        if (noDark.length) ctx.report(null, `token override with no dark value: ${list(noDark)}. Dark mode shows the NDS value.`,
            'Add a dark rule for each, as the tokens doc\'s Override Scope shows.', undefined, noDark.length);
        if (document.querySelector('[data-theme~="dark"]:not(html)')) {
            const noArea = [...set].filter(([p, s]) => nds.area.has(p) && ((s.light && !s.lightArea) || (s.dark && !s.darkArea))).map(([p]) => p);
            if (noArea.length) ctx.report(null, `token override that skips dark areas: ${list(noArea)}. A dark area declares every token again, so it keeps the NDS value.`,
                'List [data-theme~="dark"]:not(:root) in both override rules, as the tokens doc\'s Override Scope shows.', undefined, noArea.length);
        }
        const missing = [];
        set.forEach((s, p) => {
            const m = p.match(STATE);
            if (!m) return;
            for (const st of ['default', 'hovered', 'pressed', 'selected', 'focused', 'disabled']) {
                const sib = `${m[1]}-${st}`;
                if (nds.light.has(sib) && !set.has(sib) && !missing.includes(sib)) missing.push(sib);
            }
        });
        if (missing.length) ctx.report(null, `token override sets part of a state family: ${list(missing)} still hold the NDS value, so the states no longer match.`,
            'Set every state of the family.', undefined, missing.length);
    } });
    // Generic classes the site styles itself are the site's own (a Tailwind .sr-only). An nds- or hgi- name never is.
    const siteClasses = (sheetRules) => new Set(sheetRules.flatMap(r => (r.sel.match(/\.(-?[_a-zA-Z][\w-]*)/g) || []).map(c => c.slice(1)))
        .filter(c => !/^(nds|hgi)-/.test(c)));

    rule({ id: 'migration-markup', group: 'migration', check(ctx) {
        if (!rows.length) return;
        const own = siteClasses(siteRules());
        const hits = new Map();   // row → elements
        const hit = (r, el) => (hits.get(r) || hits.set(r, []).get(r)).push(el);
        // A property name is specific enough on its own: its scope only says where it applied.
        const look = (kind, name, el) => (byKind[kind]?.get(name) || []).forEach(r => { if (kind === 'property' || inScope(el, r.scope)) hit(r, el); });
        for (const el of ctx.find('body *, body')) {
            for (const c of el.classList) if (!own.has(c)) look('class', c, el);
            for (const a of el.attributes) if (a.name !== 'class' && a.name !== 'style') look('attribute', a.name, el);
            if (el.id) look('id', el.id, el);
            const style = el.getAttribute('style');
            if (style && style.includes('--')) for (const [, p] of style.matchAll(/(--[\w-]+)\s*:/g)) look('property', p, el);
        }
        // A window setting NDS read before: set by a script that runs before NDS.
        byKind.global?.forEach((rs, name) => { if (name in window) rs.forEach(r => hit(r, null)); });
        hits.forEach((els, r) => reportRow(ctx, r, els[0],
            say(r) + (els.length > 1 ? ` (${els.length} elements; the first is shown)` : ''), r.inert, els.length));
    } });

    rule({ id: 'migration-css', group: 'migration', check(ctx) {
        if (!rows.length) return;
        const hits = new Map();   // row + sheet → { rule selectors, read }
        const hit = (r, where, sel, read) => {
            const k = r.kind + r.name + '\n' + where;
            const h = hits.get(k) || hits.set(k, { r, where, sels: new Set(), read: false }).get(k);
            h.sels.add(sel); h.read ||= read;
        };
        // A scoped name only counts when the same selector names its scope's class too. A scope
        // with no class (body, &[data-cooldown]) leaves an nds- or data- name to stand alone; a
        // generic one (.sr-only, .hidden) may be the site's own.
        const scoped = (r, sel) => {
            const cls = r.scope && r.scope.match(/\.[\w-]+/g);
            return !r.scope || (cls ? cls.some(c => sel.includes(c)) : /^(nds|data)-/.test(r.name));
        };
        for (const { sel, style, where } of siteRules()) {
            for (const [, c] of sel.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) (byKind.class?.get(c) || []).forEach(r => { if (scoped(r, sel)) hit(r, where, sel); });
            for (const [, a] of sel.matchAll(/\[([\w-]+)/g)) (byKind.attribute?.get(a) || []).forEach(r => { if (scoped(r, sel)) hit(r, where, sel); });
            for (const [, i] of sel.matchAll(/#([\w-]+)/g)) (byKind.id?.get(i) || []).forEach(r => hit(r, where, sel));
            for (let i = 0; i < style.length; i++) {
                const p = style[i];
                if (p.startsWith('--')) (byKind.property?.get(p) || []).forEach(r => hit(r, where, sel, false));
            }
            for (const [, p] of style.cssText.matchAll(/var\(\s*(--[\w-]+)/g)) (byKind.property?.get(p) || []).forEach(r => hit(r, where, sel, true));
        }
        hits.forEach(({ r, where, sels, read }) => {
            const first = [...sels][0];
            const msg = `${say(r, true)} Your CSS uses it in ${where}: ${first}${sels.size > 1 ? ` and ${sels.size - 1} more rules` : ''}.`;
            // Reading a gone property gets nothing, even one NDS never read.
            reportRow(ctx, r, null, msg, r.inert && !read, sels.size);
        });
    } });

    // Baked by js_processor.rb from the docs' canons, includes and scripts.
    const ANATOMY = /*@anatomy*/{};

    // An nds- class that no NDS sheet, doc or script has is invented markup: it gets nothing.
    // Judged only when NDS's own sheets are readable; an old name is migration-markup's.
    rule({ id: 'unknown-class', check(ctx) {
        const nds = ndsSheets();
        if (!nds) return;
        const known = new Set([...(ANATOMY.known || []), ...nds.classes]);
        const hits = new Map();
        for (const el of ctx.find('[class*="nds-"]')) {
            for (const c of el.classList) {
                if (!c.startsWith('nds-') || c.startsWith('nds-hgi-') || known.has(c) || byKind.class?.has(c)) continue;
                (hits.get(c) || hits.set(c, []).get(c)).push(el);
            }
        }
        hits.forEach((els, c) => ctx.report(els[0], `class "${c}" is not an NDS class, so it gets no NDS style or behavior${els.length > 1 ? ` (${els.length} elements; the first is shown)` : ''}.`,
            'Copy the class from the component\'s canon.', undefined, els.length));
    } });

    // A part outside its component root still renders, but loses what the root gives it. A part
    // NDS also styles on its own is free to stand alone. toolbar-part covers the toolbar.
    rule({ id: 'part-outside', check(ctx) {
        const nds = ndsSheets();
        if (!nds) return;
        for (const [part, root] of Object.entries(ANATOMY.parts || {})) {
            if (root === 'nds-toolbar' || nds.items.some(s => s.has(part) && !s.has(root))) continue;
            const lost = ctx.find('.' + part).filter(el => !el.closest('.' + root));
            if (lost.length) ctx.report(lost[0], `.${part} outside a .${root}${lost.length > 1 ? ` (${lost.length} elements; the first is shown)` : ''}.`,
                `Keep it inside its .${root}, as the canon has it.`, undefined, lost.length);
        }
    } });

    NDS.Audit = { run, rule, rules: RULES };
})();
