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
// markup, so the harness cannot drift from canon.
//
//   node scripts/check-init-destroy.mjs [baseUrl]
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

    const count = NDS.Init.destroy(document.body);
    await new Promise((r) => setTimeout(r, 300));

    ok('destroy released every type', kinds().size === 0, [...kinds()].join(', ') || 'clean');
    ok('destroy reported a matching count', count >= before.size, `returned ${count} for ${before.size} types`);
    // Every stamp the page carries, not a hand-picked few: a destroy() that releases its
    // listeners but keeps its stamp is one-way, and the view can never mount again.
    // KNOWN GAP, named so it cannot rot into silence: Fab ships no destroy() at all. It
    // also MOVES the button into a dock on <body> and installs page-level pooled observers
    // shared by every FAB, so teardown is a design call, not a missing line.
    const KNOWN_GAP = 'data-nds-fab-initialized';
    const stamps = () => [...document.querySelectorAll('*')]
        .flatMap(el => [...el.attributes].map(a => a.name).filter(n => /^data-nds-.*-initialized$/.test(n)));
    const left = [...new Set(stamps())];
    ok('no init stamp survives (except the known Fab gap)', left.every(n => n === KNOWN_GAP), left.join(', ') || 'clean');
    ok('the Fab gap is still exactly one component', left.length <= 1, left.join(', ') || 'none');

    return out;
}));

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
