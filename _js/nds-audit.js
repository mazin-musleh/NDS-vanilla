/* NDS.audit — public surface
 * Rides: (none — diagnostic module, not a component)
 * Methods:
 *   NDS.audit.run(opts)   run the rules once; prints [NDS.audit] lines and returns the findings.
 *                         opts: { group, rule, quiet } (group/rule: a name or an array; quiet: no console)
 *   NDS.audit.addRule(def)   add a rule: { id, group, severity, docs, check(ctx) }. ctx.find(selector)
 *                         returns the elements a rule may judge; ctx.report(el, message, fix, severity)
 *   NDS.audit.rules       every rule, in run order
 * Findings: { rule, group, severity, message, fix, docs, el, count }
 *   severity: error (broken now) · warn (works, but wrong or going away) · info
 *   groups:   page · structure · migration · i18n · practice (a doc's Best Practices tip, info only)
 * Events:
 *   (none)
 * Hooks:
 *   window.NDS_AUDIT_RULES        rule definitions, read on every run
 *   data-nds-audit-ignore         on any element: the audit skips it and everything inside it. A value
 *                                 names the rule ids to skip ("migration-markup id-reference"); empty skips all.
 * Gotchas:
 *   - This bundle is never auto-injected. The loader pulls it when
 *     enableLogging schedules the post-init sweep, or on the first
 *     NDS.init.audit() call (lazy namespace stub) — that first call returns a
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

    const DOCUMENTATION_URL = 'https://mazin-musleh.github.io/NDS-vanilla/';
    const rules = [];

    function addRule(definition) {
        if (!definition || !definition.id || typeof definition.check !== 'function') return console.warn('[NDS.audit] a rule needs an id and a check()', definition);
        const at = rules.findIndex(existing => existing.id === definition.id);
        const entry = { group: 'structure', severity: 'warn', ...definition };
        if (at < 0) rules.push(entry); else rules[at] = entry;
    }

    // data-nds-audit-ignore="" skips every rule; a value names the ones to skip.
    function isIgnored(el, id) {
        const host = el.closest('[data-nds-audit-ignore]');
        if (!host) return false;
        const value = host.getAttribute('data-nds-audit-ignore').trim();
        return !value || value.split(/[\s,]+/).includes(id);
    }

    function run({ group, rule: only, quiet } = {}) {
        // Read on every run: rule() replaces by id, and a site may push to the array later.
        (window.NDS_AUDIT_RULES || []).forEach(addRule);
        const groups = group == null ? null : [].concat(group);
        const ids = only == null ? null : [].concat(only);
        const findings = [];
        for (const entry of rules) {
            if ((groups && !groups.includes(entry.group)) || (ids && !ids.includes(entry.id))) continue;
            // Markup inside <code> is a sample, never the page.
            const skip = (el) => !!el && el.nodeType === 1 && (!!el.closest('code') || isIgnored(el, entry.id));
            const context = {
                find: (selector) => [...document.querySelectorAll(selector)].filter(el => !skip(el)),
                report(el, message, fix, severity, count) {
                    if (skip(el)) return;
                    findings.push({ rule: entry.id, group: entry.group, severity: severity || entry.severity, message, fix,
                                    docs: entry.docs ? DOCUMENTATION_URL + entry.docs : undefined, el: el || undefined, count });
                },
            };
            try { entry.check(context); } catch (e) { console.warn(`[NDS.audit] rule ${entry.id} failed:`, e); }
        }
        if (!quiet) print(findings);
        return findings;
    }

    function print(findings) {
        const out = { error: console.error, warn: console.warn, info: console.info };
        const counts = { error: 0, warn: 0, info: 0 };
        for (const finding of findings) {
            counts[finding.severity]++;
            const text = `[NDS.audit] ${finding.rule}: ${finding.group === 'practice' ? 'tip: ' : ''}${finding.message}${finding.fix ? ' ' + finding.fix : ''}${finding.docs ? ' ' + finding.docs : ''}`;
            (out[finding.severity] || console.warn)(text, ...(finding.el ? [finding.el] : []));
        }
        console.info(`[NDS.audit] ${counts.error} errors, ${counts.warn} warnings, ${counts.info} notes.`);
    }

    // ── page ─────────────────────────────────────────────────────────

    // NDS.isRtl tests dir alone (no lang fallback), and CSS flips off the same
    // attribute — so lang/dir disagreement runs components in one direction
    // under content written for the other, with nothing else reporting it.
    // Not auto-corrected: writing dir here flips the whole document a frame
    // after paint, and cannot help the pre-JS paint at all.
    addRule({ id: 'lang-dir', group: 'page', docs: 'ui-shell/head.html', check(context) {
        const html = document.documentElement;
        const htmlDir = html.dir; // raw read for the diagnostic text only — comparisons below use NDS.isRtl
        const htmlLang = html.lang || 'unset';
        // ponytail: the common right-to-left languages; Intl.Locale's text info is missing in Firefox.
        const rtlLang = /^(ar|fa|ur|he|ps|ckb|dv|yi|sd|ug)$/.test(NDS.lang);
        if (!html.lang) context.report(null, '<html> has no lang attribute — components write their text in English and the pack never loads for the page\'s language.', 'Set lang on <html>, such as lang="ar".');
        if (rtlLang && !NDS.isRtl) {
            context.report(null, `<html lang="${htmlLang}"> without dir="rtl"${htmlDir ? ` (dir="${htmlDir}")` : ' (no dir attribute)'} — NDS.isRtl reads false, so components run left-to-right under right-to-left content.`, 'Set dir="rtl" in the markup.');
        } else if (!rtlLang && NDS.isRtl) {
            context.report(null, `<html dir="rtl"> with lang="${htmlLang}" — direction and language disagree.`, 'Set dir="ltr", or lang to a right-to-left language.');
        }
    } });

    // The component token tier ships in the main sheet only, so an empty value means it never applied.
    addRule({ id: 'css-missing', group: 'page', severity: 'error', docs: 'ui-shell/head.html', check(context) {
        if (!getComputedStyle(document.documentElement).getPropertyValue('--avatar-background').trim()) {
            context.report(null, 'the NDS main stylesheet is not applied — components render without their styles.', 'Check the nds-main.min.css link in <head>, and NDS_ASSETS_PATH when the files sit elsewhere.');
        }
    } });

    addRule({ id: 'skip-link', group: 'page', docs: 'layout/page-layout.html', check(context) {
        const content = document.querySelector('.nds-content');
        const link = document.querySelector('a.nds-skip-link');
        if (!link) {
            if (content) context.report(content, 'the page has no skip link — keyboard users tab through the whole header on every page.', 'Add <a class="nds-skip-link" href="#main-content"> first in <body>, and id="main-content" on .nds-content.');
            return;
        }
        const target = document.getElementById((link.getAttribute('href') || '').replace(/^#/, ''));
        if (!target) context.report(link, `the skip link points at "${link.getAttribute('href')}", which no element has — it moves focus nowhere.`, 'Give .nds-content id="main-content".', 'error');
        else if (target.tagName === 'MAIN' && content) context.report(target, 'the skip link lands on <main>, which opens with the hero and the side menu (the 1.11.0 pattern).', 'Move id="main-content" to .nds-content.');
    } });

    // A framework mount root between <body> and <main> breaks the vertical
    // flex chain: body is a flex column (min-height:100dvh) and main grows to
    // fill it, so an untreated wrapper leaves main at content height and the
    // footer rides up the viewport. Nothing errors and the page still paints.
    // No <main> at all is not a finding — a client-rendered app audited before
    // its first mount has nothing to judge yet.
    addRule({ id: 'main-flex', group: 'page', docs: 'layout/page-layout.html', check(context) {
        const mainEl = context.find('body main')[0];
        if (!mainEl || mainEl.parentElement === document.body) return;
        for (let node = mainEl.parentElement; node && node !== document.body; node = node.parentElement) {
            const computedStyle = getComputedStyle(node);
            // The two treatments layout/page-layout.md prescribes: vanish from
            // the layout, or become the growing column yourself.
            if (computedStyle.display === 'contents') continue;
            if (computedStyle.display === 'flex' && computedStyle.flexDirection === 'column' && parseFloat(computedStyle.flexGrow) > 0) continue;
            const label = node.tagName.toLowerCase() + (node.id ? `#${node.id}` : '');
            context.report(node, `<${label}> sits between <body> and <main> with display:${computedStyle.display} — main no longer grows, so the footer rides up the viewport instead of sitting at the bottom.`, 'Give it "display: contents", or "flex: 1; display: flex; flex-direction: column" when the app styles the mount root itself.');
            break; // one warning per page: the outermost break is the one to fix
        }
    } });

    // .nds-content-layout is a grid — one column, or side-menu + content under
    // nds-has-sidemenu. A component that returns a wrapper <div> instead of a
    // fragment lands an extra element in it, which takes a column of its own.
    addRule({ id: 'content-layout-child', group: 'page', docs: 'layout/page-layout.html', check(context) {
        context.find('.nds-content-layout').forEach(layout => {
            Array.from(layout.children).forEach(child => {
                if (child.matches('.nds-content, .nds-sidemenu')) return;
                const display = getComputedStyle(child).display;
                if (display === 'contents' || display === 'none') return; // none: a <template>, a script, a hidden element
                context.report(child, `<${child.tagName.toLowerCase()}> is a direct child of .nds-content-layout but is neither .nds-content nor .nds-sidemenu — it takes a grid column and shifts the layout.`, 'Return a fragment from the component instead of a wrapper, or give the wrapper "display: contents".');
            });
        });
    } });

    // nds-has-sidemenu keeps the menu's grid column even when no menu shows in it.
    addRule({ id: 'sidemenu-missing', group: 'page', docs: 'layout/page-layout.html', check(context) {
        context.find('.nds-has-sidemenu').forEach(layout => {
            const menu = Array.from(layout.children).find(child => child.matches('.nds-sidemenu'));
            if (menu && !menu.hidden) return;
            context.report(layout, `nds-has-sidemenu with ${menu ? 'a hidden' : 'no'} .nds-sidemenu — the layout keeps the menu column, so the content squeezes into it.`, 'Add the side menu as its first child, or remove nds-has-sidemenu on a page that shows no side menu.');
        });
    } });

    // A view whose only content is an alert is a page state, which Status Section is built for.
    addRule({ id: 'alert-as-page', group: 'page', docs: 'layout/status-section.html', check(context) {
        const isShown = el => el.checkVisibility ? el.checkVisibility() : el.getClientRects().length > 0;
        const sections = context.find('main .nds-content-section').filter(isShown);
        // A tab panel's alert is canon: the other tabs still show (layout/status-section.md).
        const alert = sections.flatMap(section => [...section.querySelectorAll('.nds-alert')]).find(el => isShown(el) && !el.closest('.nds-tab-panel'));
        if (!alert) return;
        const content = 'p, li, dt, dd, td, img, figure, canvas, input, select, textarea, .nds-card, .nds-btn';
        const chrome = '.nds-alert, .nds-tab-list-container, .nds-breadcrumb, .nds-pagination, nav, [role="tablist"]';
        if (sections.some(section => [...section.querySelectorAll(content)].some(el => !el.closest(chrome) && isShown(el)))) return;
        context.report(alert, 'the only content this view shows is an alert: a view that cannot show its content (sign in first, no permission, not found, a failed load) is a Status Section.',
            'Replace the alert with a Status Section that carries the same title, text and action.');
    } });

    // An NDS page runs NDS and vanilla JS only; a legacy library loaded beside it
    // restyles or re-wires NDS markup with nothing else reporting it.
    addRule({ id: 'legacy-library', group: 'page', check(context) {
        const jquery = window.jQuery;
        const found = [];
        if (jquery) found.push('jQuery');
        if (jquery && jquery.fn && jquery.fn.select2) found.push('Select2');
        if (jquery && jquery.fn && (jquery.fn.DataTable || jquery.fn.dataTable)) found.push('DataTables');
        const sheets = [...document.querySelectorAll('link[rel="stylesheet"][href]')].map(link => link.href.toLowerCase());
        if (sheets.some(href => /bootstrap/.test(href))) found.push('Bootstrap CSS');
        if (sheets.some(href => /font-?awesome/.test(href)) || document.querySelector('.fa, .fas, .far, .fab, [class^="fa-"], [class*=" fa-"]')) found.push('Font Awesome');
        if (found.length) context.report(null, `legacy UI loaded on an NDS page: ${found.join(', ')}.`, 'Replace it with the NDS component or API for the same job, and load the legacy library only on legacy pages.');
    } });

    // The loader injects each bundle itself, and a script it inserts is async.
    // ponytail: a hand-written tag with an async attribute passes; check the HTML if it matters.
    addRule({ id: 'bundle-tag', group: 'page', docs: 'ui-shell/head.html', check(context) {
        const files = Object.values(window.__NDS_BUNDLES || {}).map(bundle => bundle.file).filter(Boolean);
        context.find('script[src]').forEach(script => {
            const file = files.find(bundleFile => script.getAttribute('src').split(/[?#]/)[0].endsWith(bundleFile));
            if (file && !script.async) context.report(script, `${file} has a tag in the page. The loader adds each bundle when the page needs it.`, 'Remove the tag.');
        });
    } });

    // defer has no effect without src: the code runs at parse time, before the deferred NDS scripts.
    addRule({ id: 'inline-defer', group: 'page', check(context) {
        context.find('script:not([src])[defer]').forEach(script => {
            context.report(script, 'an inline <script defer> runs at once: defer works only on a script with src, so this code runs before NDS loads.', 'Use <script type="module">, which waits for the page, or move the code to a file loaded with defer after the NDS scripts.');
        });
    } });

    // A swapped picture that keeps the template's width/height is stretched, or reserves the wrong space.
    // An SVG with no width, height or viewBox reports the browser's 300×150 default, so that size is no evidence.
    addRule({ id: 'img-size', group: 'page', check(context) {
        context.find('img[width][height]').forEach(img => {
            if (!img.complete || !img.naturalWidth) return;
            if (img.naturalWidth === 300 && img.naturalHeight === 150 && /\.svg([?#]|$)|^data:image\/svg/i.test(img.currentSrc)) return;
            const width = +img.getAttribute('width'), height = +img.getAttribute('height');
            if (!width || !height || Math.abs((width / height) / (img.naturalWidth / img.naturalHeight) - 1) < 0.05) return;
            context.report(img, `<img width="${width}" height="${height}"> shows a ${img.naturalWidth}×${img.naturalHeight} picture: the shapes differ, so it stretches or the layout jumps when it loads.`,
                'Set width and height to the picture\'s real pixel size.');
        });
    } });


    // A browser date or time field skips the NDS picker: no Hijri, no site format, its own look.
    addRule({ id: 'native-date-time', group: 'page', check(context) {
        context.find('input[type="date"], input[type="month"], input[type="week"], input[type="datetime-local"], input[type="time"]').forEach(el => {
            const time = el.type === 'time';
            context.report(el, `<input type="${el.type}"> on an NDS page: the browser's own picker, not the NDS ${time ? 'time' : 'date'} picker.`,
                `Use the ${time ? 'Time Picker' : 'Date Picker'} canon.`);
        });
    } });

    // A CSP without 'unsafe-inline' in style-src drops every style attribute, so el.style reads empty;
    // a style NDS or a framework sets through the CSSOM is never blocked, and its attribute reads back full.
    addRule({ id: 'style-blocked', group: 'page', docs: 'ui-shell/head.html', check(context) {
        const dead = context.find('[style*="--"]').filter(el => !el.style.length);
        if (dead.length) context.report(dead[0], `the page's Content Security Policy blocked ${dead.length} style attribute${dead.length > 1 ? 's' : ''} with a knob in ${dead.length > 1 ? 'them' : 'it'}: those knobs never apply.`,
            'Move each knob to a class in your own stylesheet (Inline Knobs).', undefined, dead.length);
    } });

    // A toolbar part lifted out of .nds-toolbar still lays out as a bar, so nothing else shows the
    // lost wrapper: stacked rows touch, and the bar loses its gap to the content below.
    // Every nds-toolbar-* class is a toolbar part. One finding per lost bar: a part inside a reported one is skipped.
    addRule({ id: 'toolbar-part', group: 'structure', docs: 'components/toolbar.html', check(context) {
        context.find('[class*="nds-toolbar-"]').forEach(el => {
            const part = [...el.classList].find(className => className.startsWith('nds-toolbar-'));
            if (!part || el.closest('.nds-toolbar') || el.parentElement?.closest('[class*="nds-toolbar-"]')) return;
            context.report(el, `.${part} outside a .nds-toolbar.`, 'Wrap the bar in <div class="nds-toolbar">, as the toolbar canon has it.');
        });
    } });

    // A search box needs most of its line, on a phone above all. The chip lines take a line of their own.
    addRule({ id: 'toolbar-search-row', group: 'structure', docs: 'components/toolbar.html', check(context) {
        context.find('.nds-toolbar .nds-search-box').forEach(box => {
            const line = box.closest('.nds-toolbar-row') || box.closest('.nds-toolbar');
            const others = [...line.children]
                .flatMap(el => el.matches('.nds-toolbar-start, .nds-toolbar-end') ? [...el.children] : [el])
                .filter(el => el !== box && !el.matches('.nds-toolbar-row, .nds-filter-applied, .nds-auto-fill, script, template'));
            if (others.length > 1) context.report(box, `.nds-search-box shares its line with ${others.length} other items.`, 'Keep one beside it, a Filter or a sort menu, and move the rest to another .nds-toolbar-row.');
        });
    } });

    // The applied filters read as the result of the search and filter line, so they sit right under it.
    addRule({ id: 'toolbar-applied', group: 'structure', docs: 'components/toolbar.html', check(context) {
        const fix = 'Put it in the toolbar, in its own .nds-toolbar-row under the search and filter row.';
        context.find('.nds-filter-applied').forEach(el => {
            const bar = el.closest('.nds-toolbar');
            if (!bar) return context.report(el, '.nds-filter-applied outside a .nds-toolbar.', fix);
            const controls = [...bar.querySelectorAll('.nds-search-box, .nds-filter')];
            const row = el.closest('.nds-toolbar-row');
            if (row && controls.some(control => row.contains(control))) context.report(el, '.nds-filter-applied shares a row with the search or filter.', fix);
            else if (controls.some(control => el.compareDocumentPosition(control) & Node.DOCUMENT_POSITION_FOLLOWING)) context.report(el, '.nds-filter-applied above the search or filter it shows.', fix);
        });
    } });

    // One line, one control height: a 32px button beside a 40px one reads as a mistake. Hidden items are skipped.
    addRule({ id: 'toolbar-sizes', group: 'structure', docs: 'components/toolbar.html', check(context) {
        context.find('.nds-toolbar-row, .nds-toolbar:not(:has(> .nds-toolbar-row))').forEach(line => {
            const heights = new Set([...line.children]
                .flatMap(el => el.matches('.nds-toolbar-start, .nds-toolbar-end') ? [...el.children] : [el])
                .map(el => el.matches('.nds-btn') ? el : el.querySelector('.nds-form-control, .nds-btn:not(.nds-dropmenu-menu *)'))
                .filter(control => control?.getClientRects().length)
                .map(control => Math.round(control.getBoundingClientRect().height)));
            if (heights.size > 1) context.report(line, `Toolbar items in one line differ in height: ${[...heights].sort().join('px, ')}px.`, 'Give the buttons on a line one size: all default (40px) or all nds-md (32px), to match the search box when there is one.');
        });
    } });

    // A --min-width wider than the room a desktop gives the table hides its actions column on every
    // desktop. Only the authored knob counts: long content may widen a table, and that is the data's call.
    addRule({ id: 'table-min-width', group: 'structure', docs: 'components/table.html', check(context) {
        if (!window.matchMedia(NDS.breakpoints.desktop).matches) return;
        context.find('.nds-table-wrapper > table').forEach(table => {
            const floor = parseFloat(getComputedStyle(table).minWidth);
            const room = table.parentElement.clientWidth;
            if (!(floor > room + 1) || !table.querySelector(':scope > thead th.nds-actions-column')?.getClientRects().length) return;
            context.report(table, `--min-width holds the table at ${Math.round(floor)}px in a ${room}px box, so a desktop user scrolls sideways to reach a row's actions.`,
                'Set --min-width no wider than the room the page gives the table, or remove it: the table still scrolls when its content needs more.');
        });
    } });

    // Fields side by side start their inputs level. Only what sits above an input moves it; a message under it does not.
    // An upload has no input box to line up, only a button or a drop zone.
    addRule({ id: 'form-row-align', group: 'structure', docs: 'components/form.html', check(context) {
        const rows = new Set(context.find('.nds-form-container:not(.nds-checkbox, .nds-radio, .nds-switch, .nds-upload)').map(field => field.parentElement));
        rows.forEach(parent => {
            const inputTops = new Map(); // a field's top → the tops of the inputs of the fields that start there
            [...parent.children].forEach(field => {
                const control = field.matches('.nds-form-container:not(.nds-checkbox, .nds-radio, .nds-switch, .nds-upload)') ? field.querySelector(':scope > .nds-form-control') : null;
                if (!control?.getClientRects().length) return;
                const top = Math.round(field.getBoundingClientRect().top);
                inputTops.set(top, [...(inputTops.get(top) || []), control.getBoundingClientRect().top]);
            });
            inputTops.forEach(tops => {
                if (tops.length > 1 && Math.max(...tops) - Math.min(...tops) > 2) context.report(parent,
                    `Fields side by side start their inputs ${Math.round(Math.max(...tops) - Math.min(...tops))}px apart: something above one input, such as an Info line under its label or a label on two lines, pushes it down.`,
                    'Put help text in a Hint under the field or a Help tooltip beside the label, or give every field in the row an Info line. Keep the labels short enough for one line.');
            });
        });
    } });

    // ── i18n ─────────────────────────────────────────────────────────

    addRule({ id: 'i18n-pack', group: 'i18n', severity: 'error', docs: 'core/i18n.html', check(context) {
        const lang = NDS.i18n.resolveLang();
        if (!NDS.i18n.isMissing(lang)) return;
        if ((anatomy.languages || []).includes(lang)) {
            context.report(null, `the language file for "${lang}" did not load — components show their English text.`, 'Keep the i18n/ folder beside the folder that holds nds-main.min.js, or set NDS_I18N_PATH.');
        } else if (!(window.NDS_I18N_LANGS && window.NDS_I18N_LANGS[lang])) {
            context.report(null, `NDS ships no "${lang}" words — components show their English text.`, `Put the words in window.NDS_I18N_LANGS.${lang}: start from a copy of assets/i18n/en.json.`, 'warn');
        }
    } });

    // An override section or key nothing reads does nothing, silently.
    addRule({ id: 'i18n-override', group: 'i18n', severity: 'warn', docs: 'core/i18n.html', check(context) {
        const words = anatomy.words || {};
        const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
        const overrides = [['NDS_I18N', window.NDS_I18N],
            ...Object.entries(window.NDS_I18N_LANGS || {}).map(([lang, sections]) => [`NDS_I18N_LANGS.${lang}`, sections])];
        for (const [where, sections] of overrides) {
            for (const [section, keys] of Object.entries(sections || {})) {
                if (!own(words, section) && !NDS.i18n.has(section)) {
                    context.report(null, `${where}.${section}: no NDS component or getStrings() call has a "${section}" section — nothing reads it.`, 'Name the section and key from the Word List, such as validation.required. Your own component declares its section with NDS.i18n.getStrings().');
                    continue;
                }
                for (const key of Object.keys(keys || {})) {
                    if (!(own(words, section) && words[section].includes(key)) && !NDS.i18n.has(section, key)) {
                        context.report(null, `${where}.${section}.${key}: the "${section}" section has no "${key}" word — nothing reads it.`, 'Name the key from the Word List.');
                    }
                }
            }
        }
    } });

    // ── structure ────────────────────────────────────────────────────

    addRule({ id: 'filter-unclaimed', severity: 'error', docs: 'components/filter.html', check(context) {
        context.find('[data-filter-items]:not([data-nds-filter-initialized])').forEach(el =>
            context.report(el, 'data-filter-items container never claimed by a filter — it stays skeleton-held.', 'Remove the attribute or add the filter UI.'));
    } });

    addRule({ id: 'filter-no-target', severity: 'error', docs: 'components/filter.html', check(context) {
        context.find('.nds-filter:not([data-filter-target])').forEach(el =>
            context.report(el, '.nds-filter has no data-filter-target — no filter instance binds it, so its options never render and its criteria go nowhere.', 'Add data-filter-target="<results container id>".'));
    } });

    addRule({ id: 'paged-no-nav', severity: 'error', docs: 'components/pagination.html', check(context) {
        context.find('.nds-paged-content:not([data-paged-initialized])').forEach(el =>
            context.report(el, '.nds-paged-content has no pagination nav — it stays skeleton-held and its data-paged-* slots never stamp.', 'Unpaged lists use a plain container + data-filter-count.'));
    } });

    addRule({ id: 'icon-unregistered', severity: 'error', docs: 'foundations/icons.html', check(context) {
        context.find('i.nds-icon[class*="nds-hgi-"]').forEach(el => {
            // An unknown name leaves --nds-icon unset, and the mask falls back to transparent.
            if (getComputedStyle(el).getPropertyValue('--nds-icon').trim()) return;
            const iconClassName = [...el.classList].find(className => className.startsWith('nds-hgi-'));
            context.report(el, `inline icon "${iconClassName}" is not in the registered set and paints nothing.`, `Use the HGI font class: <i class="hgi hgi-stroke ${iconClassName.replace('nds-', '')}">`);
        });
    } });

    // A font icon whose name the HGI sheet lacks gets no ::before glyph, so it paints nothing.
    addRule({ id: 'font-icon-unknown', severity: 'error', docs: 'foundations/icons.html', check(context) {
        if (![...document.querySelectorAll('link[href*="hgi-rounded-stroke-min.css"]')].some(link => link.sheet)) return;
        const bad = context.find('i.hgi[class*="hgi-"]').filter(el => {
            const content = getComputedStyle(el, '::before').content;
            return !content || content === 'none' || content === 'normal';
        });
        if (bad.length) {
            const name = [...bad[0].classList].find(className => className.startsWith('hgi-') && className !== 'hgi-stroke') || bad[0].className;
            context.report(bad[0], `font icon "${name}" is not in the HGI stroke rounded set, so it shows nothing${bad.length > 1 ? ` (${bad.length} icons; the first is shown)` : ''}.`,
                'Pick a name from the HGI stroke rounded set, written as <i class="hgi hgi-stroke hgi-…">.', undefined, bad.length);
        }
    } });

    // Current-page nav marking. The highlight keys off data-state~="current"
    // (_main-nav.scss); aria-current="page" alone drives no CSS. Two triggers,
    // one warning per link: an href that resolves to this page, or
    // aria-current without the token. A page genuinely absent from the nav
    // fires neither — silence is correct there, not a miss.
    const normalizePath = (path) => path.replace(/\/index\.html$/, '/');
    addRule({ id: 'nav-current', docs: 'ui-shell/main-nav.html', check(context) {
        const here = normalizePath(location.pathname);
        context.find('.nds-main-nav .nds-nav-primary a.nds-nav-link').forEach(link => {
            if (link.matches('[data-state~="current"]')) return;
            const href = link.getAttribute('href');
            let samePage = false;
            if (href && href !== '#' && !href.startsWith('javascript:')) {
                // A hash router serves every route from one pathname, so the hash is
                // the route — without it every nav link reads as the current page.
                try {
                    const url = new URL(link.href);
                    samePage = normalizePath(url.pathname) === here && (!url.hash || url.hash === location.hash);
                } catch (e) { /* opaque href — skip */ }
            }
            const ariaCurrent = link.getAttribute('aria-current') === 'page';
            if (!samePage && !ariaCurrent) return;
            if (link.matches('[data-state~="active"]')) {
                context.report(link, 'current-page nav link uses data-state="active" — the main navigation marks the current page with "current" only.', 'Use data-state="current".');
            } else {
                context.report(link, `this nav link ${samePage ? 'points at the current page' : 'carries aria-current="page"'} but has no data-state="current" — the current-page highlight never renders.`, `Add data-state="current"${ariaCurrent ? '' : ' and aria-current="page"'}.`);
            }
        });
    } });

    // Attributes whose value names another element. A miss wires nothing and throws nothing.
    // ponytail: the attributes NDS resolves by id or selector today; add one when a component reads a new one.
    const refs = {
        'data-filter-target': 'components/filter.html', 'data-selection-target': 'components/selection.html',
        'data-sort-target': 'components/sort.html', 'data-per-page-target': 'components/pagination.html',
        'data-auto-pagination': 'components/pagination.html', 'data-modal-target': 'components/modal.html',
        'data-stepper-target': 'components/stepper.html', 'data-columns-target': 'components/table.html',
        'data-voice-target': 'components/voice-input.html', 'data-copy-target': 'utilities/copy.html',
        'data-export-target': 'components/export.html', 'data-paged-target': 'components/pagination.html',
        'data-print-target': 'utilities/print.html',
    };
    // A template-held modal or panel is real: NDS.fromTemplate moves it in on first open.
    const isInTemplate = (id) => [...document.querySelectorAll('template')].some(template => template.content.getElementById(id));
    // Read each value as its component does. These take a bare id (getElementById): "#list" or a
    // selector names nothing for them. Copy and Export take a selector, Voice a field's id, name or
    // data-name, and the rest go through NDS.resolveElement, which takes either.
    const idRefs = new Set(['data-filter-target', 'data-selection-target', 'data-sort-target', 'data-paged-target', 'data-stepper-target', 'data-modal-target']);
    const selectorRefs = new Set(['data-copy-target', 'data-export-target']);
    const isResolved = (attribute, value) => {
        if (idRefs.has(attribute)) return !!document.getElementById(value) || isInTemplate(value);
        if (selectorRefs.has(attribute)) { try { return !!document.querySelector(value); } catch { return false; } }
        if (attribute === 'data-voice-target') return !!(document.getElementById(value) || document.querySelector(`[name="${CSS.escape(value)}"], [data-name="${CSS.escape(value)}"]`));
        return !!NDS.resolveElement(value) || isInTemplate(value.replace(/^#/, ''));
    };
    addRule({ id: 'id-reference', severity: 'error', check(context) {
        for (const attribute in refs) {
            context.find(`[${attribute}]`).forEach(el => {
                const value = el.getAttribute(attribute).trim();
                // An empty data-auto-pagination uses the container right before the nav.
                if (!value || isResolved(attribute, value)) return;
                const bare = value.replace(/^#/, '');
                if (bare !== value && isResolved(attribute, bare)) {
                    context.report(el, `${attribute}="${value}" takes a bare id — with the "#" it names no element, so the component it wires does nothing.`, `Write ${attribute}="${bare}". See ${DOCUMENTATION_URL}${refs[attribute]}`);
                    return;
                }
                context.report(el, `${attribute}="${value}" names no element on the page — the component it wires does nothing.`, `Give the element id="${value.replace(/^#/, '')}", or fix the value. See ${DOCUMENTATION_URL}${refs[attribute]}`);
            });
        }
    } });

    // A screen reader announces the link to nothing, and a table sub-row toggle opens nothing.
    addRule({ id: 'aria-controls', check(context) {
        context.find('[aria-controls]').forEach(el => {
            const missing = el.getAttribute('aria-controls').trim().split(/\s+/)
                .filter(id => id && !document.getElementById(id) && !isInTemplate(id));
            if (missing.length) context.report(el, `aria-controls="${missing.join(' ')}" names no element on the page.`, 'Give the controlled element that id, or remove the attribute.');
        });
    } });

    // getElementById, a label's for and every data-*-target reach only the first of two.
    // SVG ids are left out: an inline logo used twice repeats its gradient ids.
    addRule({ id: 'id-duplicate', severity: 'error', check(context) {
        const byId = new Map();
        context.find('[id]').forEach(el => {
            if (el.closest('svg')) return;
            byId.set(el.id, (byId.get(el.id) || []).concat(el));
        });
        byId.forEach((elements, id) => {
            if (elements.length > 1) context.report(elements[1], `id="${id}" is on ${elements.length} elements: a lookup by id reaches only the first, ${elements[0].tagName.toLowerCase()}.`, 'Give each element its own id, and point each reference at the one it means.', undefined, elements.length);
        });
    } });

    // Markup sort wires a list no other sorter owns: a Filter or a Table sorts its own,
    // and the button is left unbound.
    addRule({ id: 'sort-target-owned', docs: 'components/sort.html', check(context) {
        context.find('[data-sort-target]').forEach(btn => {
            const formatList = document.getElementById(btn.getAttribute('data-sort-target'));
            if (formatList && (formatList.closest('.nds-table') || (formatList.ndsSort && !formatList.ndsSort.hasMarkupTriggers))) {
                context.report(btn, `data-sort-target="${formatList.id}" names a list a Filter or a Table already sorts — this button does nothing.`, "Use data-filter-target on a Filter's sort button, or the table's header sort buttons.");
            }
        });
    } });

    // The stepper hands off a submit-typed control (see its banner), so the
    // attribute is inert here — the author expects a move that never comes.
    // `button` with no type IS submit-typed inside a form.
    addRule({ id: 'stepper-submit', docs: 'components/stepper.html', check(context) {
        context.find('form :is(button:not([type="button"]):not([type="reset"]), input[type="submit"])[data-stepper-control]').forEach(el =>
            context.report(el, 'submit-typed button with data-stepper-control — the stepper hands this click to the form and does not move, so the attribute does nothing.', 'A form step is gated, so drive it from JS: call NDS.Stepper.next() after NDS.Form.validate() passes, or from nds:form:valid once your request succeeds.'));
    } });

    // ── migration ────────────────────────────────────────────────────

    const migrations = /*@migrations*/[];
    const rows = migrations.map(([kind, name, scope, status, use, since, fix, inert]) =>
        ({ kind, name, scope: scope || null, status, use: use || null, since, fix: fix || (use ? `Use ${use}.` : ''), inert: !!inert }));
    const byKind = {};
    rows.forEach(row => ((byKind[row.kind] ||= new Map()).get(row.name) || byKind[row.kind].set(row.name, []).get(row.name)).push(row));
    const severityByKind = { renamed: 'error', removed: 'error', deprecated: 'warn' };
    const label = { class: 'class', attribute: 'attribute', property: 'property', id: 'id', global: 'window setting' };
    const say = (row, inCss) => {
        const what = `${label[row.kind]} "${row.name}"`;
        if (row.status === 'deprecated') return `${what} is deprecated since ${row.since}: it still works, until the next major release.`;
        if (inCss) return `${what} was ${row.status} in ${row.since}.`;
        const effect = row.kind === 'global' ? 'NDS no longer reads it' : 'this part gets no NDS style or behavior';
        return `${what} was ${row.status} in ${row.since}, so ${effect}.`;
    };
    // A name NDS never read had no effect when set, so it is a note, not a break.
    const reportRow = (context, row, el, message, inert, count) => context.report(el, message,
        inert ? `${row.fix} Setting the old name never had an effect.` : row.fix, inert ? 'info' : severityByKind[row.status], count);
    // A leading & tests the element itself; any other scope, the element or an ancestor.
    const isInScope = (el, scope) => !scope || (scope[0] === '&' ? el.matches(scope.slice(1)) : !!el.closest(scope));

    // The site's own sheets: NDS's carry the deprecated aliases on purpose, and a cross-origin
    // sheet throws on cssRules.
    const OWN = /\/(nds[-.][\w.-]*|hgi-[\w-]*)\.css(\?|#|$)|\/docs-assets\//;
    // NDS's inline <style>s: an event pack's sheet, the docs site's, and the head's fold copy.
    // ponytail: the fold is known by its topbar reservation; mark the tag if that ever moves.
    const isOwnStyle = (node) => node?.tagName === 'STYLE' && (node.hasAttribute('data-nds-event-style') || node.hasAttribute('data-nds-doc') || node.textContent.includes(':where(.nds-topbar)'));
    const walkRules = (sheet, fn) => {
        const walk = (formatList) => { for (const cssRule of formatList) { if (cssRule.selectorText) fn(cssRule); if (cssRule.cssRules) walk(cssRule.cssRules); } };
        try { walk(sheet.cssRules); return true; } catch (e) { return false; /* cross-origin */ }
    };
    function getSiteRules() {
        const out = [];
        for (const sheet of document.styleSheets) {
            if ((sheet.href && OWN.test(sheet.href)) || isOwnStyle(sheet.ownerNode)) continue;
            const where = sheet.href || 'an inline <style>';
            walkRules(sheet, cssRule => out.push({ sel: cssRule.selectorText, style: cssRule.style, where }));
        }
        return out;
    }

    // A selector list split at its top-level commas only: :is(a, b) stays one item.
    const splitSelectors = (selector) => {
        const out = [];
        let depth = 0, from = 0;
        for (let i = 0; i < selector.length; i++) {
            const char = selector[i];
            if (char === '(' || char === '[') depth++;
            else if (char === ')' || char === ']') depth--;
            else if (char === ',' && !depth) { out.push(selector.slice(from, i).trim()); from = i + 1; }
        }
        out.push(selector.slice(from).trim());
        return out;
    };
    const DARK_MODE = /^:root\[data-theme~?="dark"\]/;
    const DARK_AREA = /\[data-theme~?="dark"\]:not\(:root\)/;
    const STATE = /^(--[\w-]+)-(default|hovered|pressed|selected|focused|disabled)$/;
    const isCustomOnly = (style) => [...style].every(property => property.startsWith('--'));
    // The site's selectors that pick keeps, by sheet. A rule that only sets custom properties restyles nothing.
    const collectSelectorsBySheet = (pick) => {
        const bySheet = new Map();
        for (const { sel: selector, style, where } of getSiteRules()) {
            if (isCustomOnly(style)) continue;
            const kept = splitSelectors(selector).filter(pick);
            if (kept.length) (bySheet.get(where) || bySheet.set(where, []).get(where)).push(...kept);
        }
        return bySheet;
    };

    // What NDS's own sheets declare: their classes, the nds- classes of each selector, and the tokens
    // at :root in light mode, in dark mode, and with the dark-area selector. null when the sheets
    // come from another origin.
    function readNdsSheets() {
        const nds = { classes: new Set(), items: [], light: new Set(), dark: new Set(), area: new Set() };
        let readable = false;
        for (const sheet of document.styleSheets) {
            if (!sheet.href || !OWN.test(sheet.href)) continue;
            readable = walkRules(sheet, cssRule => {
                const it = splitSelectors(cssRule.selectorText);
                for (const selector of it) {
                    const classNames = new Set([...selector.matchAll(/\.(nds-[\w-]+)/g)].map(match => match[1]));
                    if (classNames.size) { nds.items.push(classNames); classNames.forEach(className => nds.classes.add(className)); }
                }
                const dark = it.some(selector => DARK_MODE.test(selector)), root = it.includes(':root'), area = it.some(selector => DARK_AREA.test(selector));
                if (!dark && !root) return;
                for (const property of cssRule.style) if (property.startsWith('--')) { nds[dark ? 'dark' : 'light'].add(property); if (area) nds.area.add(property); }
            }) || readable;
        }
        return readable ? nds : null;
    }
    const isToken = (nds, property) => nds.light.has(property) || nds.dark.has(property);

    // A site sheet before the NDS one loses every tie with it, so its overrides of NDS do nothing.
    addRule({ id: 'css-order', group: 'page', docs: 'foundations/tokens.html', check(context) {
        const main = document.querySelector('link[rel="stylesheet"][href*="nds-main"]');
        const nds = main && readNdsSheets();
        if (!nds) return;
        for (const sheet of document.styleSheets) {
            const node = sheet.ownerNode;
            if (!node || (sheet.href && OWN.test(sheet.href)) || isOwnStyle(node) || !(main.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_PRECEDING)) continue;
            let touches = false;
            walkRules(sheet, cssRule => { touches ||= /\.nds-/.test(cssRule.selectorText) || [...cssRule.style].some(property => isToken(nds, property)); });
            if (touches) context.report(node, `${sheet.href || 'an inline <style>'} styles NDS but loads before the NDS stylesheet, so NDS wins every tie and the override does nothing.`,
                'Load it after the NDS stylesheet.');
        }
    } });

    // An override is the last resort, and it names a project hook so it never restyles NDS everywhere.
    addRule({ id: 'nds-restyle', group: 'page', docs: 'foundations/tokens.html', check(context) {
        // A project class, an id, or a data-* that is not an NDS state names the site's own scope.
        collectSelectorsBySheet(selector => /\.(nds|hgi)-/.test(selector) && !/\.(?!nds-|hgi-)-?[_a-zA-Z]|#|\[data-(?!state|status|theme|nds-)/.test(selector)).forEach((selectors, where) => context.report(null,
            `${where} restyles NDS classes with no project class in the selector (${[...new Set(selectors)].slice(0, 3).join(', ')}${selectors.length > 3 ? ', …' : ''}): ${selectors.length} selector${selectors.length > 1 ? 's' : ''}.`,
            'Use the component\'s knobs or a token. When an override is the only way, scope it under a project class or data-* attribute, and comment why.', undefined, selectors.length));
    } });

    // A site rule on bare tags (body, h1, a, input) reaches every NDS element on the page.
    addRule({ id: 'global-element-css', group: 'page', check(context) {
        collectSelectorsBySheet(selector => !/[.#]|\[(data-|class|id)\b|:root/.test(selector)).forEach((selectors, where) => context.report(null,
            `${where} styles bare elements (${[...new Set(selectors)].slice(0, 4).join(', ')}${selectors.length > 4 ? ', …' : ''}): ${selectors.length} selector${selectors.length > 1 ? 's' : ''} that reach${selectors.length > 1 ? '' : 'es'} every NDS element on the page.`,
            'Scope them under a project class, or keep the sheet off NDS pages.', undefined, selectors.length));
    } });

    // A token override follows the tokens doc: every state of a family, a dark value when NDS has one,
    // and the dark-area selector on both rules. Judged only when NDS's own sheets are readable.
    addRule({ id: 'token-dark', group: 'page', docs: 'foundations/tokens.html', check(context) {
        const nds = readNdsSheets();
        if (!nds) return;
        const set = new Map();   // name → { light, dark, lightArea, darkArea }
        for (const { sel: selector, style } of getSiteRules()) {
            const it = splitSelectors(selector);
            const dark = it.some(selector => DARK_MODE.test(selector)), root = it.includes(':root'), area = it.some(selector => DARK_AREA.test(selector));
            if (!dark && !root) continue;
            for (const property of style) {
                if (!isToken(nds, property)) continue;
                const state = set.get(property) || set.set(property, {}).get(property);
                if (dark) { state.dark = true; state.darkArea ||= area; } else { state.light = true; state.lightArea ||= area; }
            }
        }
        const formatList = (names) => names.slice(0, 5).join(', ') + (names.length > 5 ? ` and ${names.length - 5} more` : '');
        const noDark = [...set].filter(([property, state]) => state.light && !state.dark && nds.dark.has(property)).map(([property]) => property);
        if (noDark.length) context.report(null, `token override with no dark value: ${formatList(noDark)}. Dark mode shows the NDS value.`,
            'Add a dark rule for each, as the tokens doc\'s Override Scope shows.', undefined, noDark.length);
        if (document.querySelector('[data-theme~="dark"]:not(html)')) {
            const noArea = [...set].filter(([property, state]) => nds.area.has(property) && ((state.light && !state.lightArea) || (state.dark && !state.darkArea))).map(([property]) => property);
            if (noArea.length) context.report(null, `token override that skips dark areas: ${formatList(noArea)}. A dark area declares every token again, so it keeps the NDS value.`,
                'List [data-theme~="dark"]:not(:root) in both override rules, as the tokens doc\'s Override Scope shows.', undefined, noArea.length);
        }
        const missing = [];
        set.forEach((state, property) => {
            const match = property.match(STATE);
            if (!match) return;
            for (const stateName of ['default', 'hovered', 'pressed', 'selected', 'focused', 'disabled']) {
                const sibling = `${match[1]}-${stateName}`;
                if (nds.light.has(sibling) && !set.has(sibling) && !missing.includes(sibling)) missing.push(sibling);
            }
        });
        if (missing.length) context.report(null, `token override sets part of a state family: ${formatList(missing)} still hold the NDS value, so the states no longer match.`,
            'Set every state of the family.', undefined, missing.length);
    } });
    // Generic classes the site styles itself are the site's own (a Tailwind .sr-only). An nds- or hgi- name never is.
    const getSiteClasses = (sheetRules) => new Set(sheetRules.flatMap(cssRule => (cssRule.sel.match(/\.(-?[_a-zA-Z][\w-]*)/g) || []).map(className => className.slice(1)))
        .filter(className => !/^(nds|hgi)-/.test(className)));

    addRule({ id: 'migration-markup', group: 'migration', check(context) {
        if (!rows.length) return;
        const own = getSiteClasses(getSiteRules());
        const hits = new Map();   // row → elements
        const hit = (row, el) => (hits.get(row) || hits.set(row, []).get(row)).push(el);
        // A property name is specific enough on its own: its scope only says where it applied.
        const look = (kind, name, el) => (byKind[kind]?.get(name) || []).forEach(row => { if (kind === 'property' || isInScope(el, row.scope)) hit(row, el); });
        // A <template>'s content too: a custom panel (Accessibility) waits there until it opens.
        const templateNodes = [...document.querySelectorAll('template')].flatMap(template => [...template.content.querySelectorAll('*')]);
        for (const el of [...context.find('body *, body'), ...templateNodes]) {
            for (const className of el.classList) if (!own.has(className)) look('class', className, el);
            for (const attribute of el.attributes) if (attribute.name !== 'class' && attribute.name !== 'style') look('attribute', attribute.name, el);
            if (el.id) look('id', el.id, el);
            const style = el.getAttribute('style');
            if (style && style.includes('--')) for (const [, property] of style.matchAll(/(--[\w-]+)\s*:/g)) look('property', property, el);
        }
        // A window setting NDS read before: set by a script that runs before NDS.
        byKind.global?.forEach((kindRows, name) => { if (name in window) kindRows.forEach(row => hit(row, null)); });
        hits.forEach((elements, row) => reportRow(context, row, elements[0],
            say(row) + (elements.length > 1 ? ` (${elements.length} elements; the first is shown)` : ''), row.inert, elements.length));
    } });

    addRule({ id: 'migration-css', group: 'migration', check(context) {
        if (!rows.length) return;
        const hits = new Map();   // row + sheet → { rule selectors, read }
        const hit = (row, where, selector, read) => {
            const key = row.kind + row.name + '\n' + where;
            const record = hits.get(key) || hits.set(key, { r: row, where, sels: new Set(), read: false }).get(key);
            record.sels.add(selector); record.read ||= read;
        };
        // A scoped name only counts when the same selector names its scope's class too. A scope
        // with no class (body, &[data-cooldown]) leaves an nds- or data- name to stand alone; a
        // generic one (.sr-only, .hidden) may be the site's own.
        const isScoped = (row, selector) => {
            // A class that only changed element (div.nds-modal, aside.nds-panel → <dialog>) is still right in CSS.
            if (row.kind === 'class' && /^&(?:[a-z]+|:not\([a-z]+\))$/.test(row.scope || '')) return false;
            const classNames = row.scope && row.scope.match(/\.[\w-]+/g);
            return !row.scope || (classNames ? classNames.some(className => selector.includes(className)) : /^(nds|data)-/.test(row.name));
        };
        for (const { sel: selector, style, where } of getSiteRules()) {
            for (const [, className] of selector.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) (byKind.class?.get(className) || []).forEach(row => { if (isScoped(row, selector)) hit(row, where, selector); });
            for (const [, attribute] of selector.matchAll(/\[([\w-]+)/g)) (byKind.attribute?.get(attribute) || []).forEach(row => { if (isScoped(row, selector)) hit(row, where, selector); });
            for (const [, i] of selector.matchAll(/#([\w-]+)/g)) (byKind.id?.get(i) || []).forEach(row => hit(row, where, selector));
            for (let i = 0; i < style.length; i++) {
                const property = style[i];
                if (property.startsWith('--')) (byKind.property?.get(property) || []).forEach(row => hit(row, where, selector, false));
            }
            for (const [, property] of style.cssText.matchAll(/var\(\s*(--[\w-]+)/g)) (byKind.property?.get(property) || []).forEach(row => hit(row, where, selector, true));
        }
        hits.forEach(({ r: row, where, sels: selectors, read }) => {
            const first = [...selectors][0];
            const message = `${say(row, true)} Your CSS uses it in ${where}: ${first}${selectors.size > 1 ? ` and ${selectors.size - 1} more rules` : ''}.`;
            // Reading a gone property gets nothing, even one NDS never read.
            reportRow(context, row, null, message, row.inert && !read, selectors.size);
        });
    } });

    // Baked by js_processor.rb from the docs' canons, includes and scripts.
    const anatomy = /*@anatomy*/{};

    // An nds- class that no NDS sheet, doc or script has is invented markup: it gets nothing.
    // Judged only when NDS's own sheets are readable; an old name is migration-markup's.
    addRule({ id: 'unknown-class', check(context) {
        const nds = readNdsSheets();
        if (!nds) return;
        const known = new Set([...(anatomy.known || []), ...nds.classes]);
        const hits = new Map();
        for (const el of context.find('[class*="nds-"]')) {
            for (const className of el.classList) {
                if (!className.startsWith('nds-') || className.startsWith('nds-hgi-') || known.has(className) || byKind.class?.has(className)) continue;
                (hits.get(className) || hits.set(className, []).get(className)).push(el);
            }
        }
        hits.forEach((elements, className) => context.report(elements[0], `class "${className}" is not an NDS class, so it gets no NDS style or behavior${elements.length > 1 ? ` (${elements.length} elements; the first is shown)` : ''}.`,
            'Copy the class from the component\'s canon.', undefined, elements.length));
    } });

    // A part outside its component root still renders, but loses what the root gives it. A part
    // NDS also styles on its own is free to stand alone. toolbar-part covers the toolbar.
    addRule({ id: 'part-outside', check(context) {
        const nds = readNdsSheets();
        if (!nds) return;
        for (const [part, root] of Object.entries(anatomy.parts || {})) {
            if (root === 'nds-toolbar' || nds.items.some(classes => classes.has(part) && !classes.has(root))) continue;
            const lost = context.find('.' + part).filter(el => !el.closest('.' + root));
            if (lost.length) context.report(lost[0], `.${part} outside a .${root}${lost.length > 1 ? ` (${lost.length} elements; the first is shown)` : ''}.`,
                `Keep it inside its .${root}, as the canon has it.`, undefined, lost.length);
        }
    } });

    // Each component banner's Requires lines: the markup its script needs to work, missing with no warning.
    const require = {
        'needs': (el, selector) => el.matches(selector) || !!el.querySelector(selector),
        'needs one': (el, selector, per) => el.querySelectorAll(selector).length >= el.querySelectorAll(per).length,
        'sits in': (el, selector) => !!el.parentElement?.closest(selector),
        'sits outside': (el, selector) => !el.parentElement?.closest(selector),
        'is': (el, selector) => el.matches(selector),
        'with': (el, selector) => !!document.querySelector(selector),
        'points at': (el, selector, attribute) => {
            const target = document.getElementById((el.getAttribute(attribute) || '').replace(/^#/, ''));
            const node = target?.tagName === 'TEMPLATE' ? target.content.firstElementChild : target;
            return !!node?.matches(selector);
        },
    };
    addRule({ id: 'required-part', severity: 'error', check(context) {
        for (const [name, host, verb, argument, extra, why] of anatomy.requires || []) {
            let missing;
            try { missing = context.find(host).filter(el => !require[verb](el, argument, extra)); } catch (e) { continue; /* a selector this browser cannot parse */ }
            if (!missing.length) continue;
            const need = { 'needs': argument, 'needs one': `one ${argument} per ${extra}`, 'sits in': `a ${argument} around it`, 'sits outside': `no ${argument} around it`,
                'is': `to be ${argument}`, 'with': `${argument} on the page`, 'points at': `its ${extra} to name a ${argument}` }[verb];
            context.report(missing[0], `${host} needs ${need}: ${why}${missing.length > 1 ? ` (${missing.length} elements; the first is shown)` : ''}.`,
                verb === 'sits outside' ? `Move it out of the ${argument}, as the ${name} canon has it.` : `Copy the missing part from the ${name} canon.`, undefined, missing.length);
        }
    } });

    // Without nds-icon-only a button keeps its text padding, so an icon-only button renders wider than tall.
    // A full-width bar (nds-full, Show More) is not a square, and a main-nav link takes its size from the nav.
    addRule({ id: 'icon-only-btn', docs: 'components/button.html', check(context) {
        const elements = context.find('.nds-btn:not(.nds-icon-only, .nds-show-more, .nds-full, .nds-nav-link)')
            .filter(button => button.querySelector('i, svg, img') && !button.textContent.trim());
        if (elements.length) context.report(elements[0], `an icon-only button without nds-icon-only${elements.length > 1 ? ` (${elements.length} buttons; the first is shown)` : ''}: it keeps its text padding and renders wider than tall.`,
            'Add nds-icon-only to the button.', undefined, elements.length);
    } });

    // On phones nds-minimal hides every label in the action (_section-layout.scss), so a button with no icon is an empty box.
    addRule({ id: 'minimal-action-icon', severity: 'error', docs: 'ui-shell/hero.html', check(context) {
        const elements = context.find(':is(.nds-section-head > .nds-section-action.nds-minimal, .nds-section-head > .nds-section-action.nds-minimal > .nds-dropmenu) > .nds-btn, .nds-btn.nds-minimal')
            .filter(button => !button.querySelector('i, svg, img'));
        if (elements.length) context.report(elements[0], `a button with no icon in an nds-minimal action${elements.length > 1 ? ` (${elements.length} buttons; the first is shown)` : ''}: on phones its label hides and it shows an empty box.`,
            'Give it a leading icon, as the hero canon does, or take nds-minimal off the action.', undefined, elements.length);
    } });

    // The icon styles key on <i> (_icons.scss), so the same classes on any other tag paint nothing.
    addRule({ id: 'icon-tag', severity: 'error', docs: 'foundations/icons.html', check(context) {
        const elements = context.find('.nds-icon[class*="nds-hgi-"]:not(i)');
        if (elements.length) context.report(elements[0], `a UI icon on a <${elements[0].tagName.toLowerCase()}>: the icon styles apply to <i> only, so it shows nothing${elements.length > 1 ? ` (${elements.length} elements; the first is shown)` : ''}.`,
            'Write it as <i class="nds-icon nds-hgi-…" aria-hidden="true">.', undefined, elements.length);
    } });

    // A text count joins the button's visible label ("2Columns"), so the name no longer matches it (2.0.0).
    addRule({ id: 'badge-text', group: 'migration', docs: 'components/button.html', check(context) {
        const elements = context.find('.nds-badge:not([data-count])').filter(el => el.textContent.trim());
        if (elements.length) context.report(elements[0], `a badge count written as text${elements.length > 1 ? ` (${elements.length} badges; the first is shown)` : ''}: it joins the button's visible label, and an accessibility checker reports the name.`,
            `Move the count to data-count: <span class="nds-badge" data-count="${elements[0].textContent.trim()}"></span>.`, undefined, elements.length);
    } });

    // Prose styles its bare headings (_prose.scss); the section title class gives one a page-level size.
    addRule({ id: 'prose-section-title', docs: 'layout/prose.html', check(context) {
        const elements = context.find('.nds-prose .nds-section-title');
        if (elements.length) context.report(elements[0], `nds-section-title on a heading inside nds-prose${elements.length > 1 ? ` (${elements.length} headings; the first is shown)` : ''}: it renders at the page title's size, not the text's.`,
            'Remove nds-section-title: prose already styles a bare h2 to h6.', undefined, elements.length);
    } });

    // The visible box of a select or time field and each OTP digit hold display text; the hidden input holds the value.
    addRule({ id: 'name-on-display', severity: 'error', check(context) {
        context.find('.nds-select-input[name], .nds-time-input[name], .nds-otp-container input[name]:not(.nds-otp-value)').forEach(el => {
            context.report(el, `name="${el.getAttribute('name')}" on a display input: the form sends the text it shows, not the value.`,
                'Move name to the hidden value input (.nds-select-value, .nds-time-value or .nds-otp-value).');
        });
    } });

    // Forms wires submit checks on .nds-form only (NDS.Form.create), and .nds-form is display:contents,
    // which a modal's flex column needs (_form.scss). A filter's submission form is the filter's own.
    addRule({ id: 'form-class', docs: 'components/form.html', check(context) {
        context.find('form:not(.nds-form, [data-filter-submit])').filter(form => form.querySelector('.nds-form-container, .nds-form-group')).forEach(el =>
            context.report(el, 'a <form> with NDS fields but no nds-form class: its fields are not checked on submit, and in a modal it breaks the layout.',
                'Add class="nds-form" to the form.'));
    } });

    // data-error-message has one job per host (nds-form.js getMessage, _finishGroupValidation): a field's
    // pattern, a group's "nothing picked". On a host that can never fail that way it never shows.
    addRule({ id: 'error-message-unused', docs: 'components/form.html', check(context) {
        context.find('input[data-error-message]:not([pattern]), textarea[data-error-message], select[data-error-message]').forEach(el =>
            context.report(el, 'data-error-message on a field with no pattern: it shows only when the value does not match pattern, so it never shows.',
                'Add the pattern it describes, or remove it: every other check has its own message.'));
        context.find(':is(.nds-form-group:not(.nds-otp-group), .nds-select, .nds-multiselect, .nds-taginput, .nds-upload)[data-error-message]:not([data-required], .nds-required, [data-min-checked])').forEach(el =>
            context.report(el, 'data-error-message on a group that may be left empty: it shows only when nothing is picked, so it never shows.',
                'Add data-required, or remove it: the count limits and a file still uploading have their own messages.'));
    } });

    // ── names: what a screen reader announces ───────────────────────
    // An element it never reaches (an aria-hidden loop clone, an inert background, a hidden spare) needs no name.
    const isUnread = (el) => !!el.closest('[aria-hidden="true"], [inert], [hidden]') || /^(presentation|none)$/.test(el.getAttribute('role') || '');
    const getNameText = (el) => (el.getAttribute('aria-label') || el.textContent || '').trim();
    // aria-labelledby, aria-label and title, in the order a browser reads them.
    const getOwnName = (el) => (el.getAttribute('aria-labelledby') || '').split(/\s+/).filter(Boolean)
        .map(id => document.getElementById(id)).filter(Boolean).map(getNameText).join(' ').trim()
        || (el.getAttribute('aria-label') || '').trim() || (el.getAttribute('title') || '').trim();
    const getFirstNote = (elements, what) => elements.length > 1 ? ` (${elements.length} ${what}; the first is shown)` : '';

    // An icon-only control has no words of its own: the icon is aria-hidden or a CSS mask.
    addRule({ id: 'button-name', severity: 'error', docs: 'components/button.html', check(context) {
        const elements = context.find('button, a[href], [role="button"], input[type="button"], input[type="image"]').filter(el => !isUnread(el) && !(
            getOwnName(el) || el.textContent.trim() || el.querySelector('img[alt]:not([alt=""]), svg[aria-label], svg title')
            || (el.matches('input[type="button"]') && el.value.trim()) || (el.matches('img, input[type="image"]') && el.alt.trim())));
        if (elements.length) context.report(elements[0], `a ${elements[0].matches('a') ? 'link' : 'button'} with no name${getFirstNote(elements, 'controls')}: a screen reader announces it with no words, so nobody knows what it does.`,
            'Add aria-label with its action, or a label inside it with nds-label (hidden on icon-only buttons).', undefined, elements.length);
    } });

    // A placeholder names a field in every browser, though it goes once typing starts.
    addRule({ id: 'field-label', severity: 'error', docs: 'components/form.html', check(context) {
        const elements = context.find('input:not([type="hidden"], [type="button"], [type="submit"], [type="reset"], [type="image"]), select, textarea').filter(el => !isUnread(el) && !(
            getOwnName(el) || [...(el.labels || [])].some(fieldLabel => fieldLabel.textContent.trim()) || (el.getAttribute('placeholder') || '').trim()));
        if (elements.length) context.report(elements[0], `a form field with no label${getFirstNote(elements, 'fields')}: a screen reader announces it with no name.`,
            'Give it a <label for> with its name, as the field canons do, or aria-label when no label shows.', undefined, elements.length);
    } });

    // With no alt a screen reader reads the file name; alt="" marks a picture that only decorates.
    addRule({ id: 'img-alt', severity: 'error', check(context) {
        const elements = context.find('img:not([alt])').filter(el => !isUnread(el));
        if (elements.length) context.report(elements[0], `an <img> with no alt${getFirstNote(elements, 'images')}: a screen reader reads its file name.`,
            'Add alt with what the picture shows, or alt="" when it only decorates.', undefined, elements.length);
    } });

    addRule({ id: 'content-layout-once', group: 'page', docs: 'layout/page-layout.html', check(context) {
        const all = context.find('.nds-content-layout');
        if (all.length > 1) context.report(all[1], `${all.length} .nds-content-layout elements on one page: the page grid is set once.`,
            'Keep one .nds-content-layout, around the page content.', undefined, all.length);
    } });

    // The missing-menu half is sidemenu-missing's.
    addRule({ id: 'sidemenu-pair', group: 'page', docs: 'layout/page-layout.html', check(context) {
        context.find('.nds-sidemenu').forEach(menu => {
            if (!menu.closest('.nds-has-sidemenu')) context.report(menu, '.nds-sidemenu outside a layout with nds-has-sidemenu: the layout gives it no column.',
                'Add nds-has-sidemenu to its .nds-content-layout.');
        });
    } });

    // ── practice: tips from the docs' Best Practices, info only ─────────────
    const addPractice = (id, documentationPath, selector, message, fix) => addRule({ id, group: 'practice', severity: 'info', docs: documentationPath, check(context) {
        const elements = context.find(selector);
        if (elements.length) context.report(elements[0], message + (elements.length > 1 ? ` (${elements.length} elements; the first is shown).` : '.'), fix, undefined, elements.length);
    } });
    addPractice('card-link-nested', 'components/card.html', ':is(a, button).nds-card :is(a, button)',
        'a link or a button inside a clickable card', 'Keep one control: make the card a plain .nds-card, or drop the inner link.');
    addPractice('section-nested', 'layout/section.html', '.nds-content-section .nds-content-section',
        'a section inside a section', 'Divide the section body with .nds-block instead.');
    addPractice('card-actions-place', 'components/card.html', '.nds-card-content .nds-card-actions',
        '.nds-card-actions inside .nds-card-content: in a modal, only the content scrolls', 'Put .nds-card-actions after .nds-card-content.');
    addPractice('dark-nested', 'foundations/themes.html', '[data-theme~="dark"]:not(html) [data-theme~="dark"]',
        'data-theme="dark" inside a dark area, which is already dark', 'Write data-theme="dark" once, on the surface.');
    addPractice('prose-nested', 'layout/prose.html', '.nds-prose .nds-prose',
        '.nds-prose inside .nds-prose', 'Put nds-prose once, on the element the text renders into.');
    addPractice('loading-field', 'components/loading.html', ':is(.nds-form-control, .nds-input).nds-loading',
        'nds-loading on a form field, which has a loading look of its own', 'Remove it. See Forms for the field loading state.');

    addRule({ id: 'voice-secret', group: 'practice', severity: 'info', docs: 'components/voice-input.html', check(context) {
        context.find('.nds-voice-input').forEach(btn => {
            const target = btn.getAttribute('data-voice-target') || btn.getAttribute('data-target');
            const input = target ? (document.getElementById(target) || document.querySelector(`[name="${CSS.escape(target)}"]`))
                : btn.closest('.nds-form-control')?.querySelector(':scope > input, :scope > textarea, :scope > select');
            if (input && (input.matches('[type="password"], [readonly], select') || input.closest('.nds-otp-group'))) {
                context.report(btn, 'voice input on a password, OTP, read-only field or select', 'Remove the button. People nearby hear a spoken secret, and the other fields take no dictation.');
            }
        });
    } });

    // One table column is one field: a status tag on some rows and a standard tag on others shows one state two ways.
    addRule({ id: 'tag-kind-mix', group: 'practice', severity: 'info', docs: 'components/tag.html', check(context) {
        const columnsByTable = new Map();
        context.find('td .nds-tag').forEach(tag => {
            const td = tag.closest('td'), key = td.closest('table');
            if (td.querySelectorAll('.nds-tag').length > 1) return; // a tag group mixes kinds on purpose
            if (!columnsByTable.has(key)) columnsByTable.set(key, new Map());
            const tableColumns = columnsByTable.get(key);
            if (!tableColumns.has(td.cellIndex)) tableColumns.set(td.cellIndex, []);
            tableColumns.get(td.cellIndex).push(tag);
        });
        for (const tableColumns of columnsByTable.values()) for (const tags of tableColumns.values()) {
            const plain = tags.filter(tag => !NDS.status.get(tag));
            if (plain.length && plain.length < tags.length) context.report(plain[0], `a table column shows a status tag on some rows and a standard tag on others (${plain.length} of ${tags.length} standard).`,
                'Give every tag in the column data-status. A state that needs no color takes "neutral".', undefined, plain.length);
        }
    } });

    addRule({ id: 'dark-selector', group: 'practice', severity: 'info', docs: 'foundations/themes.html', check(context) {
        const selectors = getSiteRules().map(siteRule => siteRule.sel).filter(selector => selector.includes('[data-theme="dark"]'));
        if (selectors.length) context.report(null, `[data-theme="dark"] in the site's CSS (${selectors[0]}${selectors.length > 1 ? ` and ${selectors.length - 1} more` : ''}): it misses a data-theme with more than one value.`,
            'Write [data-theme~="dark"].', undefined, selectors.length);
    } });

    addRule({ id: 'palette-scope', group: 'practice', severity: 'info', docs: 'foundations/tokens.html', check(context) {
        const selectors = getSiteRules().filter(siteRule => [...siteRule.style].some(property => property.startsWith('--colors-')) && splitSelectors(siteRule.sel).some(selector => !/^(:root|html)\b/.test(selector))).map(siteRule => siteRule.sel);
        if (selectors.length) context.report(null, `a palette token (--colors-*) set below :root (${selectors[0]}${selectors.length > 1 ? ` and ${selectors.length - 1} more` : ''}): the tokens built from the palette read it at :root, so they keep the NDS value.`,
            'Set palette tokens at :root. On a wrapper, set the token the component reads.', undefined, selectors.length);
    } });

    NDS.audit = { run, addRule, rules: rules };
})();
