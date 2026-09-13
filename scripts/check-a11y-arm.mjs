// Guards the accessibility arm path — the two ways it broke in 1.12.x, plus
// the lazy-load win they must not cost.
//   1. cold double-activation: the second press must not get undone by the
//      first press's build finishing (open-then-close a second later)
//   2. the FAB's capture listener must swallow the click ONLY while cold —
//      swallowing a warm click also kills the document-bubble outside-click
//      close in nds-panels.js, so other open panels stayed open
//   3. a visitor who never arms the panel must never fetch its sheet
//   node scripts/check-a11y-arm.mjs [_site]
import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import { existsSync, globSync, rmSync } from 'node:fs';

const DIR = process.argv[2] || '_site';
const PORT = 4198;
const URL = `http://localhost:${PORT}/NDS-vanilla/components/tokens.html`;
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const server = spawn(process.execPath, ['.claude/skills/nds-perf/gz-serve.mjs', DIR, String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 1200));

// Own profile dir: puppeteer's default is shared, and a leftover headless
// Chrome from another check refuses the launch. Swept at start, not on exit,
// so it never races the Chrome this run is still shutting down.
// timeout: a slow launch on a loaded machine surfaces as "The browser is
// already running for <dir>" on Windows — puppeteer reports every launch
// failure that way when a lockfile exists (BrowserLauncher.js). 30s default
// isn't enough when a build or a sibling check is running.
const PROFILE = `tmp/chrome-a11y-arm-${Date.now()}`;
for (const d of globSync('tmp/chrome-a11y-arm-*')) rmSync(d, { recursive: true, force: true });
const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    userDataDir: PROFILE,
    timeout: 90000,
});
const fails = [];
const note = (ok, name, detail) => {
    if (!ok) fails.push(`${name} — ${detail}`);
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
};

// Bundles carry nds-fab.js (unhides the FAB) and nds-panels.js (open/close).
const settle = async (page) => {
    await page.evaluate(() => Promise.all(Object.keys(window.__NDS_BUNDLES || {}).map((b) => window.NDS.loadBundle(b))));
    await new Promise((r) => setTimeout(r, 600));
};

// ---- no prefs: the sheet must stay unfetched (the point of the lazy load) ----
{
    const page = await browser.newPage();
    const asked = [];
    page.on('request', (req) => { if (req.url().includes('nds-accessibility.min.css')) asked.push(req.url()); });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await settle(page);
    note(asked.length === 0, 'a no-prefs visitor never fetches the a11y sheet', asked.join(' '));
    await page.close();
}

// ---- cold: double activation, and the click is swallowed ----
{
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await settle(page);

    const r = await page.evaluate(async () => {
        let reachedBubble = false;
        document.addEventListener('click', () => { reachedBubble = true; });
        const fab = document.querySelector('[data-accessibility-toggle]');
        const t0 = performance.now();
        // .click(), not a real pointer press: this is the keyboard/programmatic
        // path, which .nds-loading's pointer-events:none does not cover.
        fab.click();
        // Inside the cold gate's 1000ms window — that is where the race lives.
        await new Promise((r) => setTimeout(r, 200));
        fab.click();
        await new Promise((r) => setTimeout(r, 1600));
        const panel = document.querySelector('[data-accessibility-panel]');
        return {
            reachedBubble,
            armed: !!panel && panel.hasAttribute('data-armed'),
            open: !!panel && (panel.getAttribute('data-state') || '').split(/\s+/).includes('open'),
            ms: Math.round(performance.now() - t0),
        };
    });

    note(r.armed, 'cold activation arms the panel');
    note(r.open, 'cold double-activation leaves the panel OPEN', r.open ? `${r.ms}ms` : 'panel closed itself after the build');
    note(!r.reachedBubble, 'cold click is swallowed before Panel\'s delegated toggle');
    await page.close();
}

// ---- warm: the click must reach the document bubble phase ----
{
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await settle(page);

    const r = await page.evaluate(async () => {
        const fab = document.querySelector('[data-accessibility-toggle]');
        fab.click();
        await new Promise((r) => setTimeout(r, 1600));   // let the cold build finish
        let reachedBubble = false;
        document.addEventListener('click', () => { reachedBubble = true; });
        fab.click();
        await new Promise((r) => setTimeout(r, 400));
        const panel = document.querySelector('[data-accessibility-panel]');
        return {
            reachedBubble,
            closed: !(panel.getAttribute('data-state') || '').split(/\s+/).includes('open'),
        };
    });

    note(r.reachedBubble, 'warm click reaches document bubble (outside-click close still fires)');
    note(r.closed, 'warm click still toggles the panel shut');
    await page.close();
}

await browser.close();
server.kill();
console.log(fails.length ? `\n${fails.length} FAILED:\n  ${fails.join('\n  ')}` : '\nall checks passed');
process.exit(fails.length ? 1 : 0);
