// Does NDS.Init.destroy(container) release every component instance inside it, and leave
// the markup re-initializable?
//
// The mirror of check-refresh.mjs. refresh() re-scans what stays; destroy() releases what
// leaves. Three failure modes, all silent in a browser:
//   MISS      an instance inside the container is never destroyed, so its listeners,
//             observers and pooled subscribers outlive the DOM they point at.
//   ONE-WAY   destroy() leaves the init stamps on, so the same markup can never be
//             re-claimed — fatal for a framework route that mounts the view again.
//   THROW     one component's destroy explodes and takes the rest of the walk with it.
//
// Drives a real page — components/filter.html — and destroys a CLONE of its own demo
// markup, so the harness cannot drift from canon. Then manage-records for the relocated
// nodes (FAB, portaled menu) and an open modal, then a breadth sweep over every doc and
// example page with a coverage line for the registry components no page exercised.
//
//   node scripts/check-init-destroy.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if it is down.
import puppeteer from 'puppeteer-core';
import { existsSync, readdirSync } from 'node:fs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const probe = await fetch(`${BASE}/components/filter.html`).catch(() => null);
if (!probe?.ok) {
    console.error(`cannot reach ${BASE} — is the dev server up? (bundle exec jekyll serve)`);
    process.exit(2);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(e.message));
await page.setViewport({ width: 1400, height: 1000 });
await page.goto(`${BASE}/components/filter.html`, { waitUntil: 'networkidle0' });
await page.evaluate(() => window.NDS.loadBundle('delegated').catch(() => {}));
await new Promise((r) => setTimeout(r, 1200));

const report = await page.evaluate(async () => {
    const out = [];
    const ok = (name, pass, detail = '') => out.push({ name, pass, detail: String(detail) });
    const settle = () => new Promise((r) => setTimeout(r, 300));

    ok('NDS.Init.destroy is exposed', typeof NDS.Init.destroy === 'function', typeof NDS.Init.destroy);

    const srcToolbar = document.querySelector('#basicFilter .nds-toolbar');
    const srcGrid = document.getElementById('basicFilterCards');
    if (!srcToolbar || !srcGrid) return [{ name: 'fixture present', pass: false, detail: '#basicFilter markup not found' }];

    // A whole view: toolbar and grid together, the shape a framework route unmounts.
    const host = document.createElement('div');
    host.append(srcToolbar.cloneNode(true), srcGrid.cloneNode(true));
    host.querySelectorAll('[data-filter-target]').forEach(el => el.setAttribute('data-filter-target', 'destroyView'));
    host.querySelectorAll('[data-nds-filter-initialized], [data-paged-initialized]').forEach(el => {
        el.removeAttribute('data-nds-filter-initialized');
        el.removeAttribute('data-paged-initialized');
    });
    const grid = host.querySelector('#basicFilterCards');
    grid.id = 'destroyView';
    grid.removeAttribute('data-auto-pagination');
    document.body.appendChild(host);

    NDS.Init.refresh(host);
    await settle();

    const backrefs = () => [host, ...host.querySelectorAll('*')]
        .flatMap(el => Object.keys(el).filter(k => k.startsWith('nds') && typeof el[k]?.destroy === 'function'));

    const before = backrefs();
    ok('setup: the view holds live instances', before.length > 0, before.join(', ') || 'none');
    ok('setup: filter claimed the view', !!NDS.Filter.getByTarget('destroyView'));
    ok('setup: init stamps present', host.querySelectorAll('[data-nds-filter-initialized]').length > 0,
        `${host.querySelectorAll('[data-nds-filter-initialized]').length} stamped`);

    const count = NDS.Init.destroy(host);
    await settle();

    ok('destroy reports what it released', count === before.length, `returned ${count}, found ${before.length}`);
    ok('no instance left behind', backrefs().length === 0, backrefs().join(', ') || 'clean');
    ok('deregistered from the filter target map', NDS.Filter.getByTarget('destroyView') === null,
        NDS.Filter.getByTarget('destroyView')?.targetId || 'null');
    ok('init stamps cleared (not one-way)', host.querySelectorAll('[data-nds-filter-initialized]').length === 0,
        `${host.querySelectorAll('[data-nds-filter-initialized]').length} still stamped`);

    // Idempotent: a second destroy on the same subtree must be a quiet no-op.
    ok('second destroy is a no-op', NDS.Init.destroy(host) === 0);

    // Re-mountable: the same markup must come back to life.
    NDS.Init.refresh(host);
    await settle();
    ok('the view re-initializes after destroy', !!NDS.Filter.getByTarget('destroyView'));
    ok('re-init rebuilt the instances', backrefs().length > 0, backrefs().join(', ') || 'none');

    NDS.Init.destroy(host);
    host.remove();

    // A container with nothing initialized inside it must not throw or over-report.
    const bare = document.createElement('div');
    bare.innerHTML = '<p>plain markup</p>';
    document.body.appendChild(bare);
    ok('empty container returns 0', NDS.Init.destroy(bare) === 0);
    bare.remove();

    return out;
});

// ═══ page 2: reach ═══════════════════════════════════════════════════════════
// The filter fixture proves the contract on one component. This proves the walk is not
// filter-shaped: manage-records composes eight components over one table, so destroying
// the whole page must release every distinct backref type and leave nothing stamped.
const records = await browser.newPage();
records.on('pageerror', (e) => pageErrors.push(`manage-records: ${e.message}`));
await records.setViewport({ width: 1400, height: 1000 });
await records.goto(`${BASE}/examples/manage-records.html`, { waitUntil: 'networkidle0' });
await records.evaluate(() => Promise.all([
    window.NDS.loadBundle('delegated').catch(() => {}),
    window.NDS.loadBundle('extras').catch(() => {}),
]));
await new Promise((r) => setTimeout(r, 1500));

report.push(...await records.evaluate(async () => {
    const out = [];
    const ok = (name, pass, detail = '') => out.push({ name, pass, detail: String(detail) });

    const kinds = () => new Set([document.body, ...document.body.querySelectorAll('*')]
        .flatMap(el => Object.keys(el).filter(k => k.startsWith('nds') && typeof el[k]?.destroy === 'function')));

    const before = kinds();
    ok('setup: the page composes several component types', before.size >= 3, [...before].join(', '));

    // Fab is the one component that MOVES its element out of the view that authored it,
    // so a scan of that view can never find it again. Prove the round trip, not just the
    // stamp: docked before, back where it was authored after, and hidden as it shipped.
    const fab = document.querySelector('.nds-fab-dock .nds-fab');
    const fabOrigin = fab?._ndsFabOrigin?.parent;
    // Direct parent, not contains(): this page authors its FAB straight in <body>, and the
    // dock lives in <body> too, so containment reads true in both states.
    ok('setup: a FAB is docked away from its origin', !!fab && !!fabOrigin && fab.parentElement !== fabOrigin,
        fab?.parentElement?.className || 'no docked FAB on this page');

    // The FAB case again, in a second shape: `data-portal` moves the open MENU to <body>,
    // so it leaves the view that authored it and no scan of that view can find it. Scoped
    // to one cell — destroy(document.body) below would hold both halves and prove nothing.
    // A menu left behind is a click-eating overlay in <body> that nothing owns.
    const dm = document.querySelector('td .nds-dropmenu[data-portal]');
    const dmHost = dm?.closest('td');
    if (dm) {
        dm.querySelector('.nds-dropmenu-trigger').click();
        await new Promise((r) => setTimeout(r, 350));
        const menu = NDS.Dropmenu.menuOf(dm);
        ok('setup: an open menu portaled out of its container',
            !!menu && menu.parentElement === document.body && !dmHost.contains(menu),
            menu?.parentElement?.tagName || 'no menu resolved');

        NDS.Init.destroy(dmHost);
        await new Promise((r) => setTimeout(r, 350));
        ok('the portaled menu went back inside its container', dmHost.contains(menu),
            menu.parentElement?.className || menu.parentElement?.tagName);
        ok('the menu is hidden again, as it shipped',
            menu.hasAttribute('hidden') && !menu.hasAttribute('data-portal'),
            menu.outerHTML.slice(0, 60));
        ok('no menu is stranded in <body>', !document.body.querySelector(':scope > .nds-dropmenu-menu'),
            `${document.body.querySelectorAll(':scope > .nds-dropmenu-menu').length} left`);

        // Two-way, and it re-arms the instance for the page-wide destroy below.
        NDS.Init.refresh(dmHost);
        await new Promise((r) => setTimeout(r, 300));
        ok('the dropmenu re-initializes after destroy', !!dm.ndsDropmenu,
            dm.hasAttribute('data-nds-dropmenu-initialized') ? 'stamped' : 'not stamped');
    } else {
        ok('setup: an open menu portaled out of its container', false, 'no [data-portal] dropmenu in a table cell');
    }

    const count = NDS.Init.destroy(document.body);
    await new Promise((r) => setTimeout(r, 300));

    ok('destroy released every type', kinds().size === 0, [...kinds()].join(', ') || 'clean');
    ok('destroy reported a matching count', count >= before.size, `returned ${count} for ${before.size} types`);
    // Every stamp the page carries, not a hand-picked few: a destroy() that releases its
    // listeners but keeps its stamp is one-way, and the view can never mount again.
    const stamps = () => [...document.querySelectorAll('*')]
        .flatMap(el => [...el.attributes].map(a => a.name).filter(n => /^data-nds-.*-initialized$/.test(n)));
    ok('no init stamp survives', stamps().length === 0, [...new Set(stamps())].join(', ') || 'clean');

    ok('the FAB went back to where it was authored', !fab || fab.parentElement === fabOrigin, fab?.parentElement?.className || 'n/a');
    ok('the FAB is hidden again, as it shipped', !fab || fab.hasAttribute('hidden'), fab?.outerHTML.slice(0, 60) || 'n/a');
    ok('the docks we created are gone', document.querySelectorAll('.nds-fab-dock').length === 0,
        `${document.querySelectorAll('.nds-fab-dock').length} left`);
    ok('the page-level FAB runtime is released', !document.querySelector('.nds-fab-sentinel')
        && !document.documentElement.hasAttribute('data-fab-tucked'));

    // An open modal is the worst thing to leave behind: the backdrop covers the app and the
    // page is scroll-locked, and the element that could close it has been removed.
    const modal = document.querySelector('.nds-modal');
    if (modal) {
        NDS.Modal.open(modal);
        await new Promise((r) => setTimeout(r, 250));
        ok('setup: the modal locked the page', NDS.Modal.isOpen() && !!document.body.style.top,
            `open=${NDS.Modal.isOpen()} bodyTop=${document.body.style.top || 'none'}`);

        NDS.Init.destroy(document.body);
        await new Promise((r) => setTimeout(r, 250));
        ok('destroy released the open modal', !NDS.Modal.isOpen());
        ok('the scroll lock is released', !document.body.style.top, document.body.style.top || 'clear');
        // The backdrop ELEMENT is a shared singleton that persists by design — what has to
        // be released is its active state and the display it was given.
        ok('the backdrop is released', !NDS.Backdrop.isActive()
            && !document.querySelector('.nds-backdrop')?.style.display,
            document.querySelector('.nds-backdrop')?.style.display || 'clear');
    } else {
        ok('setup: the modal locked the page', false, 'no .nds-modal on this page');
    }

    // Mounting again must work after a full teardown: the shared runtime rebuilds itself.
    NDS.Init.refresh(document.body);
    await new Promise((r) => setTimeout(r, 300));
    ok('a FAB routes again after teardown', !fab || !!document.querySelector('.nds-fab-dock .nds-fab'),
        document.querySelector('.nds-fab-dock .nds-fab')?.className || 'none re-docked');

    return out;
}));

// ═══ sweep: breadth ══════════════════════════════════════════════════════════
// The two fixtures above prove the contract in depth on the components they compose.
// This proves it in BREADTH: every doc and example page, the same three questions —
// did destroy release everything, did any stamp survive, does the page mount again —
// plus a coverage line naming the registry components no page exercised. The page list
// is read from the repo, so a component that ships with a doc page joins the sweep on
// its own; it is not a hand-picked list that goes stale.
const pageList = (dir) => readdirSync(new URL(`../${dir}/`, import.meta.url))
    .filter((f) => f.endsWith('.md'))
    .map((f) => `${dir}/${f.replace(/\.md$/, '.html')}`);
const PAGES = [...pageList('components'), ...pageList('examples'), 'index.html', 'playground.html'];

const results = [];
const queue = [...PAGES];

async function sweepOne(tab, errs, path) {
    await tab.goto(`${BASE}/${path}`, { waitUntil: 'networkidle0' });
    await tab.evaluate(() => Promise.all([
        window.NDS.loadBundle('delegated').catch(() => {}),
        window.NDS.loadBundle('extras').catch(() => {}),
    ]));
    await new Promise((r) => setTimeout(r, 900));

    const live = await tab.evaluate(() => NDS.Init.components
        // Markup a code sample shows is never initialized (the init pass skips it), so it
        // is not coverage either — same exclusion the pass itself uses.
        .filter((c) => c.selector && [...document.querySelectorAll(c.selector)].some((el) => !el.closest('code, .code-example')))
        .map((c) => c.name));

    // Only teardown-time errors count. A demo that throws on its own is a different bug.
    errs.length = 0;
    const r = await tab.evaluate(async () => {
        const kinds = () => [...new Set([document.body, ...document.body.querySelectorAll('*')]
            .flatMap((el) => Object.keys(el).filter((k) => k.startsWith('nds') && typeof el[k]?.destroy === 'function')))];
        const stamps = () => [...new Set([...document.querySelectorAll('*')]
            .flatMap((el) => [...el.attributes].map((a) => a.name).filter((n) => /^data-nds-.*-initialized$/.test(n))))];

        const before = kinds();
        NDS.Init.destroy(document.body);
        await new Promise((res) => setTimeout(res, 250));
        const leftKinds = kinds();
        const leftStamps = stamps();

        NDS.Init.refresh(document.body);
        await new Promise((res) => setTimeout(res, 250));
        const back = kinds();
        return { before, leftKinds, leftStamps, missing: before.filter((k) => !back.includes(k)) };
    });
    return { path, live, ...r, errors: [...errs] };
}

await Promise.all(Array.from({ length: 4 }, async () => {
    const tab = await browser.newPage();
    const errs = [];
    tab.on('pageerror', (e) => errs.push(e.message));
    await tab.setViewport({ width: 1400, height: 1000 });
    for (let path = queue.shift(); path; path = queue.shift()) {
        try {
            results.push(await sweepOne(tab, errs, path));
        } catch (e) {
            results.push({ path, live: [], before: [], leftKinds: [], leftStamps: [], missing: [], errors: [`sweep threw: ${e.message}`] });
        }
    }
    await tab.close();
}));

// 74 pages fail the same way at once, so report by CULPRIT with a page count, not
// page by page — the per-page list is 60 lines of the same two names.
const byCulprit = (pick) => {
    const hits = new Map();
    for (const r of results) for (const name of pick(r)) hits.set(name, (hits.get(name) || 0) + 1);
    return [...hits].sort((a, b) => b[1] - a[1]).map(([name, n]) => `${name} ×${n}`);
};
const culprits = (pick, label) => {
    const list = byCulprit(pick);
    return { name: label, pass: !list.length, detail: list.join(', ') || 'clean' };
};
report.push(
    culprits((r) => r.leftKinds, `sweep: ${PAGES.length} pages, destroy released every instance`),
    culprits((r) => r.missing.map((k) => `${k} (${r.path})`), 'sweep: every destroyed component mounts again'),
    culprits((r) => r.errors.map((e) => `${r.path}: ${e}`), 'sweep: teardown threw on no page'),
);

// Informational, not a gate: a registry component with no page carrying its markup is
// untested by this check, and that is worth reading even when everything passes.
const registry = await page.evaluate(() => NDS.Init.components.filter((c) => c.selector).map((c) => c.name));
const covered = new Set(results.flatMap((r) => r.live));
const uncovered = registry.filter((n) => !covered.has(n));

await browser.close();

// Informational, not a gate. A stamp survives for two reasons and this cannot tell them
// apart: the component was torn down and left its stamp on (one-way — the mounts-again
// assert above already fails for those), or the walk never reached it, in which case the
// stamp is the only visible trace that a component sat this teardown out. Read the list.
const stampsLeft = byCulprit((r) => r.leftStamps);
console.log(`coverage: ${registry.length - uncovered.length}/${registry.length} registry components exercised`
    + (uncovered.length ? ` — never seen: ${uncovered.join(', ')}` : ''));
if (stampsLeft.length) console.log(`stamps surviving teardown (triage): ${stampsLeft.join(', ')}`);


let failed = 0;
for (const r of report) {
    if (!r.pass) failed++;
    console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? `  — ${r.detail}` : ''}`);
}
if (pageErrors.length) {
    failed++;
    console.log(`\npage errors:\n  ${pageErrors.join('\n  ')}`);
}
console.log(`\n${report.length - failed} / ${report.length} passed`);
process.exit(failed ? 1 : 0);
