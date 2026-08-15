// Does NDS.Filter.whenReady(el, cb) fire for EVERY surface, including one that is a
// sibling of the .nds-filter element?
//
// nds:filter:ready dispatches on the representative surface (the .nds-filter one) and
// bubbles. Bubbling reaches ancestors, never siblings — so a pre-init whenReady() on the
// search box next to it used to wait forever: no error, no warning, audit() silent.
// The doc's own basic shape puts them side by side, and [data-filter-target="x"] resolves
// to the search box first, so that is the selector a consumer naturally writes.
//
// Markup is CLONED from components/filter.html's #basicFilter demo, so the harness cannot
// drift from canon. Each clone is retargeted to a fresh id and initialized by hand, which
// is what puts whenReady() on its pre-init path deterministically.
//
//   node scripts/check-filter-whenready.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if it is down.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

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

    // Clone the doc's basic demo: toolbar (search box + .nds-filter + chips) and its grid.
    const srcToolbar = document.querySelector('#basicFilter .nds-toolbar');
    const srcGrid = document.getElementById('basicFilterCards');
    if (!srcToolbar || !srcGrid) return [{ name: 'fixture present', pass: false, detail: '#basicFilter markup not found' }];

    const sibling = srcToolbar.querySelector('.nds-search-box')?.compareDocumentPosition(
        srcToolbar.querySelector('.nds-dropmenu.nds-filter')
    );
    ok('doc shape: search box and .nds-filter are siblings, not nested',
        !!(sibling & Node.DOCUMENT_POSITION_FOLLOWING) && !(sibling & Node.DOCUMENT_POSITION_CONTAINED_BY),
        `compareDocumentPosition=${sibling}`);

    // Build an isolated copy under a fresh target id, never initialized yet.
    function makeFilter(id) {
        const host = document.createElement('div');
        const toolbar = srcToolbar.cloneNode(true);
        const grid = srcGrid.cloneNode(true);
        host.append(toolbar, grid);
        host.querySelectorAll('[data-filter-target]').forEach(el => el.setAttribute('data-filter-target', id));
        host.querySelectorAll('[data-nds-filter-initialized], [data-paged-initialized], [data-nds-loaded]')
            .forEach(el => { el.removeAttribute('data-nds-filter-initialized'); el.removeAttribute('data-paged-initialized'); });
        grid.id = id;
        grid.removeAttribute('data-auto-pagination');
        document.body.appendChild(host);
        return { host, toolbar, grid };
    }

    // ── case A: pre-init whenReady on the SIBLING search box (the reported bug) ──
    const a = makeFilter('whenReadyA');
    const searchBox = a.toolbar.querySelector('.nds-search-box[data-filter-target="whenReadyA"]');
    ok('case A fixture: [data-filter-target] first match IS the search box',
        document.querySelector('[data-filter-target="whenReadyA"]') === searchBox,
        searchBox?.className);
    ok('case A precondition: no instance yet', NDS.Filter.getInstance(searchBox) === null);

    let aInstance = null;
    NDS.Filter.whenReady(searchBox, (inst) => { aInstance = inst; });

    // ── case B: pre-init whenReady on an ANCESTOR that carries no target ──
    const b = makeFilter('whenReadyB');
    let bInstance = null;
    ok('case B fixture: host carries no data-filter-target', !b.host.hasAttribute('data-filter-target'));
    NDS.Filter.whenReady(b.host, (inst) => { bInstance = inst; });

    // ── case C: a THIRD filter must not satisfy A's or B's listener ──
    const c = makeFilter('whenReadyC');
    let cInstance = null;
    NDS.Filter.whenReady(c.toolbar.querySelector('.nds-search-box'), (inst) => { cInstance = inst; });

    NDS.Filter.init();
    await settle();

    ok('case A: sibling search box fires (the fix)', !!aInstance, aInstance?.targetId || 'callback never ran');
    ok('case A: got its OWN instance', aInstance?.targetId === 'whenReadyA', aInstance?.targetId);
    ok('case B: ancestor with no target still fires (bubble path kept)', !!bInstance, bInstance?.targetId || 'callback never ran');
    ok('case B: got its OWN instance', bInstance?.targetId === 'whenReadyB', bInstance?.targetId);
    ok('case C: third filter fires with its own instance', cInstance?.targetId === 'whenReadyC', cInstance?.targetId);

    // ── case D: post-init fast path unchanged ──
    let dInstance = null;
    NDS.Filter.whenReady(document.querySelector('[data-filter-target="whenReadyA"]'), (inst) => { dInstance = inst; });
    ok('case D: already-initialized resolves synchronously', dInstance?.targetId === 'whenReadyA', dInstance?.targetId);

    // ── case E: no listener leak — one ready must not re-fire a spent callback ──
    let eCount = 0;
    const e = makeFilter('whenReadyE');
    NDS.Filter.whenReady(e.toolbar.querySelector('.nds-search-box'), () => { eCount++; });
    NDS.Filter.init();
    await settle();
    const f = makeFilter('whenReadyF');
    NDS.Filter.init();
    await settle();
    ok('case E: callback ran exactly once', eCount === 1, `ran ${eCount}x`);

    [a, b, c, e, f].forEach(x => x.host.remove());
    return out;
});

await browser.close();

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
