// Does a framework view survive every mount-timing window WITHOUT a readiness
// primitive? The F2 question (field report nds-test-app-7): no public "NDS is
// fully ready" signal exists, so SPA consumers hand-write poll-and-retry
// helpers. The loader's position (nds-loader.js ~1060) is that none is needed:
// startup detection, each bundle's arrival scan, and refresh() together cover
// every window. This measures that claim instead of trusting the comment.
//
//   CASE 1  view in the DOM before nds-main.min.js executes  -> startup detection inits it
//   CASE 4  consumer runs `window.NDS?.Init.refresh(view)` in that window -> no throw, no harm
//   CASE 2  view mounted after detection, before the delegated bundle lands -> arrival scan inits it
//   CASE 3  view mounted after everything -> NDS.Init.refresh(view) inits it
//   CASE 5  component type absent at first load -> refresh() SKIPS its lazy stub
//           (never force-loads), and the documented path (loadBundle + init) works
//
// Timing windows are made real by holding bundle responses via request
// interception, not by narrating them. Views are CLONES of filter.html's own
// demo markup, so the harness cannot drift from canon.
//
//   node scripts/check-mount-timing.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if down.
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
const results = [];
const ok = (name, pass, detail = '') => {
    results.push({ name, pass });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
};

// Clone filter.html's own basic demo into a fresh view with a unique target id.
// Runs in the page; the source markup is server HTML, present before any script.
const MOUNT_VIEW = (id) => `
    (() => {
        const toolbar = document.querySelector('#basicFilter .nds-toolbar');
        const grid = document.getElementById('basicFilterCards');
        if (!toolbar || !grid) return false;
        const host = document.createElement('div');
        host.id = 'host-${id}';
        host.append(toolbar.cloneNode(true), grid.cloneNode(true));
        host.querySelectorAll('[data-filter-target]').forEach(el => el.setAttribute('data-filter-target', '${id}'));
        host.querySelectorAll('[data-nds-filter-initialized], [data-paged-initialized]').forEach(el => {
            el.removeAttribute('data-nds-filter-initialized');
            el.removeAttribute('data-paged-initialized');
        });
        const g = host.querySelector('#basicFilterCards');
        g.id = '${id}';
        g.removeAttribute('data-auto-pagination');
        document.body.appendChild(host);
        return true;
    })()`;
const VIEW_INITED = (id) => `
    !!(window.NDS?.Filter?.getByTarget && !NDS.Filter.__ndsStub && NDS.Filter.getByTarget('${id}'))
    && document.querySelector('#host-${id} [data-nds-filter-initialized]') !== null`;
const settle = (ms = 1500) => new Promise((r) => setTimeout(r, ms));

// Hold matching bundle requests until release() is called; everything else flows.
async function holdBundle(page, match) {
    const held = [];
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (req.url().includes(match)) held.push(req);
        else req.continue().catch(() => {});
    });
    return () => { held.forEach((r) => r.continue().catch(() => {})); held.length = 0; };
}

// ---- CASES 1 + 4: view present (and consumer call made) before nds-main executes.
{
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const release = await holdBundle(page, 'nds-main.min.js');
    // The held defer script blocks DOMContentLoaded, so never await the goto
    // ('commit' is unsupported in this puppeteer) — the parser streams the DOM
    // in regardless, and the selector poll below catches the cloned-from markup.
    page.goto(`${BASE}/components/filter.html`, { waitUntil: 'load', timeout: 60000 }).catch(() => {});
    await page.waitForSelector('#basicFilterCards', { timeout: 15000 });
    const mounted = await page.evaluate(MOUNT_VIEW('timingCase1'));
    ok('case1: view mounted while nds-main is still held', mounted === true);
    const guarded = await page.evaluate(() => {
        try { window.NDS?.Init?.refresh?.(document.getElementById('host-timingCase1')); return 'no-throw'; }
        catch (e) { return e.message; }
    });
    ok('case4: guarded refresh in the pre-NDS window does not throw', guarded === 'no-throw', guarded);
    release();
    await settle(2500);
    ok('case1: startup detection initialized the pre-existing view',
        await page.evaluate(VIEW_INITED('timingCase1')));
    ok('case1/4: no page errors across the window', errors.length === 0, errors.join(' | '));
    await page.close();
}

// ---- CASE 2: view mounted after detection, before the delegated bundle arrives.
{
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const release = await holdBundle(page, 'nds-delegated.min.js');
    await page.goto(`${BASE}/components/filter.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => !!window.NDS?.Init, { timeout: 15000 });
    ok('case2: delegated bundle is genuinely absent at mount time',
        await page.evaluate(() => !window.NDS.Filter || NDS.Filter.__ndsStub === true));
    await page.evaluate(MOUNT_VIEW('timingCase2'));
    ok('case2: view not initialized while the bundle is held',
        !(await page.evaluate(VIEW_INITED('timingCase2'))));
    release();
    await settle(2500);
    ok('case2: the arrival scan initialized the late-mounted view — no refresh call made',
        await page.evaluate(VIEW_INITED('timingCase2')));

    // ---- CASE 3: mounted after everything; one refresh call brings it up.
    await page.evaluate(MOUNT_VIEW('timingCase3'));
    await page.evaluate(() => NDS.Init.refresh(document.getElementById('host-timingCase3')));
    await settle(500);
    ok('case3: refresh() initialized a post-load view',
        await page.evaluate(VIEW_INITED('timingCase3')));
    ok('case2/3: no page errors', errors.length === 0, errors.join(' | '));
    await page.close();
}

// ---- CASE 5: a bundle that never arrived. The docs chrome requests extras on
// every page (tooltip hooks), so the never-arrived state is created by ABORTING
// extras at load — which also exercises the loader's retry-after-failure path
// (failed <script> removed + cache dropped, so a later loadBundle can retry).
// refresh() must skip the stub without touching it; loadBundle is the documented
// recovery for a component type the first paint never had working.
{
    const page = await browser.newPage();
    const attempts = [];
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (req.url().includes('nds-extras.min.js')) { attempts.push(req.url()); req.abort().catch(() => {}); }
        else req.continue().catch(() => {});
    });
    await page.goto(`${BASE}/components/button.html`, { waitUntil: 'networkidle0' });
    const stubbed = await page.evaluate(() =>
        (window.__NDS_BUNDLES?.extras?.ns || []).every((n) => !window.NDS[n] || NDS[n].__ndsStub === true));
    ok('case5: extras namespaces are lazy stubs after the failed load', stubbed === true,
        `${attempts.length} aborted attempt(s)`);
    const before = attempts.length;
    await page.evaluate(() => NDS.Init.refresh(document.body));
    await settle(800);
    ok('case5: refresh() skipped the stubs — no forced load attempt', attempts.length === before,
        `${attempts.length - before} new attempts`);
    ok('case5: refresh() left the stubs untouched', await page.evaluate(() =>
        (window.__NDS_BUNDLES?.extras?.ns || []).every((n) => !window.NDS[n] || NDS[n].__ndsStub === true)));
    // Lift the abort; the documented path must now recover the real namespaces.
    page.removeAllListeners('request');
    page.on('request', (req) => req.continue().catch(() => {}));
    const loaded = await page.evaluate(async () => {
        await NDS.loadBundle('extras');
        return (window.__NDS_BUNDLES?.extras?.ns || []).some((n) => window.NDS[n] && NDS[n].__ndsStub !== true);
    });
    ok('case5: loadBundle retries after the failure and resolves real namespaces', loaded === true);
    await page.close();
}

await browser.close();
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks pass`);
process.exit(failed.length ? 1 : 0);
