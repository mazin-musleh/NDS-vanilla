// Guards the accessibility arm path — the two ways it broke in 1.12.x, plus
// the lazy-load win they must not cost.
//   1. cold double-activation: the second press must not get undone by the
//      first press's build finishing (open-then-close a second later)
//   2. the FAB's capture listener must swallow the click ONLY while cold —
//      swallowing a warm click also kills the document-bubble outside-click
//      close in nds-panels.js, so other open panels stayed open
//   3. a visitor who never arms the panel must never fetch its sheet OR its JS,
//      and when they do press, the paired sheet starts WITH the bundle rather
//      than a round trip behind it
//   5. arming must pull ONLY what the panel needs — it used to ask for every
//      bundle in the manifest, dragging in extras and audit (which must never be
//      auto-injected at all), while still wiring the panel's own accordion
//   4. a visitor WITH saved prefs must get the bundle without pressing anything,
//      or their saved modes silently stop applying
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
// Each check runs in its own browser context: localStorage is shared across
// pages of one context, so the saved-prefs check would otherwise leave every
// later "cold" page warm — and silently pass for the wrong reason.
const freshPage = async () => (await browser.createBrowserContext()).newPage();

const fails = [];
const note = (ok, name, detail) => {
    if (!ok) fails.push(`${name} — ${detail}`);
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`);
};

// Bundles carry nds-fab.js (unhides the FAB) and nds-panels.js (open/close).
// Everything EXCEPT accessibility — that one is the subject: pulling it here
// would pre-warm the very thing each check is measuring.
const settle = async (page) => {
    await page.evaluate(() => Promise.all(
        Object.keys(window.__NDS_BUNDLES || {})
            .filter((b) => b !== 'accessibility')
            .map((b) => window.NDS.loadBundle(b))
    ));
    await new Promise((r) => setTimeout(r, 600));
};

// ---- no prefs: neither the sheet nor the bundle may be fetched ----
{
    const page = await freshPage();
    const css = [], js = [];
    let tCss = 0, tJs = 0;
    let pressed = false;
    const afterPress = [];
    page.on('request', (req) => {
        const u = req.url();
        if (u.includes('nds-accessibility.min.css')) { css.push(u); tCss ||= Date.now(); }
        if (u.includes('nds-accessibility.min.js')) { js.push(u); tJs ||= Date.now(); }
        const other = u.match(/nds-(delegated|extras|audit)\.min\.js/);
        if (pressed && other) afterPress.push(other[1]);
    });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await settle(page);
    note(css.length === 0, 'a no-prefs visitor never fetches the a11y sheet', css.join(' '));
    note(js.length === 0, 'a no-prefs visitor never fetches the a11y bundle', js.join(' '));

    // ...and a press pulls it. Without this the check above passes on a page
    // where accessibility is simply broken.
    const t0 = Date.now();
    pressed = true;
    await page.evaluate(() => document.querySelector('[data-accessibility-toggle]').click());
    await new Promise((r) => setTimeout(r, 2000));
    note(js.length === 1, 'a press fetches the bundle', `${js.length} request(s)`);
    // The sheet is the bundle's `css` pair in the build manifest, so the loader
    // requests it with the script. If it ever regresses to being requested by
    // the component after the script runs, this gap blows out.
    const gap = tCss && tJs ? tCss - tJs : null;
    note(gap !== null && gap < 50, 'the paired sheet starts with the bundle, not after it',
         gap === null ? 'one of them never fetched' : `+${gap}ms after the js, press+${tJs - t0}ms`);

    // audit is never auto-injected, by contract; extras is page-gated. Arming the
    // panel is not a reason to fetch either.
    const strays = [...new Set(afterPress)].filter((b) => b !== 'delegated');
    note(strays.length === 0, 'the press pulls no bundle the panel does not need', strays.join(', '));
    // ...and the bundles it DOES need still land: the panel's own accordion is
    // the thing that breaks if arming stops resolving them.
    const wired = await page.evaluate(() => {
        const acc = document.querySelector('[data-accessibility-panel] .nds-accordion');
        return !!acc && acc.hasAttribute('data-nds-accordion-initialized');
    });
    note(wired, "the panel's own accordion is initialized");
    await page.close();
}

// ---- saved prefs: the bundle loads with no press, and the modes apply ----
{
    // One context for both pages here — the returning visitor has to SEE the
    // prefs the seed wrote, which is the whole point of this check.
    const ctx = await browser.createBrowserContext();
    const seed = await ctx.newPage();
    await seed.goto(URL, { waitUntil: 'networkidle0' });
    await settle(seed);
    // Drive the real UI rather than guess the payload shape — load() discards a wrong one.
    const prefs = await seed.evaluate(async () => {
        window.NDS.Accessibility.open();
        await new Promise((r) => setTimeout(r, 2500));
        document.querySelector('[data-accessibility-panel] [data-a11y-mode]').click();
        await new Promise((r) => setTimeout(r, 300));
        return localStorage.getItem('nds-a11y');
    });
    note(!!prefs, 'toggling a mode writes saved prefs', prefs ? '' : 'nothing stored — the next check is meaningless');
    await seed.close();

    const back = await ctx.newPage();
    const js = [];
    back.on('request', (req) => { if (req.url().includes('nds-accessibility.min.js')) js.push(req.url()); });
    await back.goto(URL, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 2000));
    const stamped = await back.evaluate(() => document.documentElement.hasAttribute('data-a11y'));
    note(js.length > 0, 'a returning visitor fetches the bundle with no press');
    note(stamped, 'a returning visitor gets data-a11y applied');
    await back.close();
}

// ---- cold: double activation, and the click is swallowed ----
{
    const page = await freshPage();
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
    const page = await freshPage();
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
