// Two mainnav failures, both silent, both reported from the field against 1.7.2
// (nds-test-app-7, a React SPA).
//
// 1. LATE MOUNT — the nav is rendered AFTER the bundle runs, so the module's DOM capture
//    found nothing. Every reference stayed null for the session: CSS painted the nav,
//    the hamburger did nothing, minimal mode never engaged. reinit() has to recover it.
// 2. EMPTY PRIMARY — the overflow check spins forever (below).
//
//   node scripts/check-mainnav.mjs [baseUrl]
//
// ── 2. Does an empty .nds-nav-primary settle, or does the overflow check spin forever?
//
// The check retries when it measures scrollHeight 0, on the assumption that 0 means "not
// laid out yet". A CHILDLESS primary measures 0 forever, so the retry never ends: ~9
// wake-ups a second for as long as the drawer stays open. Nothing warns, nothing looks
// broken — it only shows up as battery and CPU on the shape it hits, a console or app
// shell whose top-level navigation lives entirely in a side menu.
//
// The path is gated: check() returns early unless minimal mode is on AND the collapse is
// open, so all three have to be true at once to reproduce. Field-reported against 1.7.2
// (nds-test-app-7), traced to _js/nds-mainnav.js's overflow.check().
//
//   node scripts/check-mainnav-empty-primary.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if it is down.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const probe = await fetch(`${BASE}/`).catch(() => null);
if (!probe?.ok) {
    console.error(`cannot reach ${BASE} — is the dev server up? (bundle exec jekyll serve)`);
    process.exit(2);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const pageErrors = [];

// Load at a mobile width, optionally empty the primary, open the drawer, then count the
// 100ms retries the overflow check schedules. 'low' priority overrides the 50 it passes.
async function measure(emptyPrimary) {
    const page = await browser.newPage();
    page.on('pageerror', (e) => pageErrors.push(e.message));
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    // Reduced motion collapses the retry delay to 0, which would hide the signal.
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
    await page.evaluateOnNewDocument(() => {
        window.__retries = 0;
        const native = window.setTimeout;
        window.setTimeout = function (fn, delay, ...rest) {
            if (delay === 100) window.__retries++;
            return native(fn, delay, ...rest);
        };
    });
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1200));

    const setup = await page.evaluate((empty) => {
        const primary = document.querySelector('.nds-nav-primary');
        if (!primary) return null;
        if (empty) primary.querySelectorAll('li').forEach((li) => li.remove());
        NDS.Mainnav.toggleNavbar();   // the documented API, not a guessed selector
        return { items: primary.querySelectorAll('li').length };
    }, emptyPrimary);
    if (!setup) { await page.close(); return null; }

    await new Promise((r) => setTimeout(r, 700));
    const open = await page.evaluate(() => ({
        minimal: document.body.classList.contains('nds-minimal'),
        collapseOpen: (document.getElementById('ndsNavCollapse')?.getAttribute('data-state') || '').includes('open'),
        scrollHeight: document.querySelector('.nds-nav-primary')?.scrollHeight,
    }));
    const before = await page.evaluate(() => window.__retries);
    await new Promise((r) => setTimeout(r, 3000));
    const after = await page.evaluate(() => window.__retries);
    await page.close();
    return { ...setup, ...open, perSecond: (after - before) / 3 };
}

// ── 1. A nav that mounts after the bundle has already run ────────────────────────────
// Faithful to the framework case without needing a framework: detach the nav while the
// page parses, so the module's capture finds nothing, then mount it and refresh.
async function lateMount() {
    const page = await browser.newPage();
    // The home page's own inline auth demo reads .nds-main-nav, and this case removes it on
    // purpose, so its TypeError is the harness's doing, not NDS's. Named rather than
    // silenced — anything else from this page still fails the run.
    page.on('pageerror', (e) => {
        if (/setAuth|checkAuthCookie/.test(e.stack || '')) return;
        pageErrors.push(e.message);
    });
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.evaluateOnNewDocument(() => {
        const obs = new MutationObserver(() => {
            const nav = document.querySelector('.nds-main-nav');
            if (!nav) return;
            window.__stashedNav = nav;
            nav.remove();          // gone before the deferred bundle executes
            obs.disconnect();
        });
        // `document`, not documentElement — this runs before <html> exists.
        obs.observe(document, { childList: true, subtree: true });
    });
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 1200));

    const out = await page.evaluate(async () => {
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));
        const state = () => (document.getElementById('ndsNavCollapse')?.getAttribute('data-state') || 'none');
        if (!window.__stashedNav) return { stashed: false };

        // Mount it the way a framework would, after NDS has already initialized.
        document.body.insertBefore(window.__stashedNav, document.body.firstChild);
        await wait(300);
        document.querySelector('.nds-mainNav-toggler')?.click();
        await wait(600);
        const beforeRefresh = state();

        NDS.Init.refresh(document.body);
        await wait(400);
        document.querySelector('.nds-mainNav-toggler')?.click();
        await wait(600);
        const afterRefresh = state();

        // Drawer is open now. A refresh aimed at unrelated content must leave it that way.
        const unrelated = document.createElement('div');
        unrelated.innerHTML = '<p>a card grid that just changed</p>';
        document.body.appendChild(unrelated);
        NDS.Init.refresh(unrelated);
        await wait(400);
        const stateAfterUnrelated = state();
        unrelated.remove();

        return {
            stashed: true,
            beforeRefresh,
            afterRefresh,
            stateAfterUnrelated,
            drawerSurvivesRefresh: stateAfterUnrelated.includes('open'),
            minimal: document.body.classList.contains('nds-minimal'),
        };
    });
    await page.close();
    return out;
}

const late = await lateMount();
const empty = await measure(true);
const normal = await measure(false);
await browser.close();

const report = [];
const ok = (name, pass, detail = '') => report.push({ name, pass, detail: String(detail) });

ok('late mount: the nav was really absent at bundle time', late.stashed === true);
ok('late mount: NDS.Init.refresh revives the nav', late.afterRefresh?.includes('open'),
    `before refresh "${late.beforeRefresh}" → after "${late.afterRefresh}"`);
ok('late mount: minimal mode engages after the revive', late.minimal === true, `minimal=${late.minimal}`);
// The hook fires on every NDS.Init.refresh a page makes. Re-wiring an unchanged nav would
// re-attach every listener and shut an open drawer, so an unrelated refresh must not touch it.
ok('an unrelated refresh leaves an open drawer alone', late.drawerSurvivesRefresh === true,
    `state after refresh: ${late.stateAfterUnrelated}`);

if (!empty || !normal) {
    ok('fixture present', false, '.nds-main-nav not found on the home page');
} else {
    ok('setup: the empty case really is empty', empty.items === 0, `${empty.items} items`);
    ok('setup: all three preconditions hold', empty.minimal && empty.collapseOpen && empty.scrollHeight === 0,
        `minimal=${empty.minimal} drawerOpen=${empty.collapseOpen} scrollHeight=${empty.scrollHeight}`);
    ok('an empty primary settles instead of spinning', empty.perSecond === 0, `${empty.perSecond}/sec`);
    ok('a normal primary still settles', normal.perSecond === 0, `${normal.perSecond}/sec`);
    // The retry must survive for the case it was written for: content present, layout late.
    ok('a normal primary still measures a real height', normal.scrollHeight > 0, `scrollHeight=${normal.scrollHeight}`);
}

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
