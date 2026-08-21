// Open a built page headlessly, call NDS.Init.audit(), and print every
// [NDS] audit: warning it emits. Also proves the on-demand path: the audit
// bundle must NOT be present before the call and must load because of it.
//
//   node scripts/run-audit.mjs [path] [baseUrl]
//   node scripts/run-audit.mjs templates/form-template.html
//
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if it is down.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const PAGE = (process.argv[2] || 'index.html').replace(/^\//, '');
const BASE = (process.argv[3] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const probe = await fetch(`${BASE}/`).catch(() => null);
if (!probe) { console.error(`Dev server not reachable at ${BASE} — start it with: bundle exec jekyll serve`); process.exit(1); }
if (!CHROME) { console.error('Chrome not found — set CHROME_PATH'); process.exit(1); }

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
const warnings = [];
page.on('console', (msg) => {
    const text = msg.text();
    if (text.includes('[NDS] audit:')) warnings.push(text);
});

await page.goto(`${BASE}/${PAGE}`, { waitUntil: 'networkidle2' });
// The icon check reads ::before masks — wait for the icons CSS stamp so a
// manual run can't race it into false icon warnings.
await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-icons-loaded'), { timeout: 8000 }).catch(() => {});

console.log(`page: ${PAGE}`);
// A pre-split runtime (≤1.8.1) has no NDS.Audit stub and its manifest names no
// audit bundle — inject this repo's build into the page and run it directly.
const hasAudit = await page.evaluate(() => !!(window.NDS && NDS.Audit));
if (hasAudit) {
    const before = await page.evaluate(() =>
        [...document.scripts].some((s) => s.src.includes('nds-audit.min.js')));
    await page.evaluate(() => NDS.Init.audit());
    const after = await page.evaluate(() =>
        [...document.scripts].some((s) => s.src.includes('nds-audit.min.js')));
    console.log(`audit bundle before call: ${before ? 'PRESENT (unexpected — should be on-demand)' : 'absent (correct)'}`);
    console.log(`audit bundle after call:  ${after ? 'loaded (on-demand path works)' : 'MISSING (load failed)'}`);
} else {
    console.log('runtime predates the audit bundle — injecting this repo\'s nds-audit.min.js');
    await page.addScriptTag({ path: fileURLToPath(new URL('../assets/js/nds-audit.min.js', import.meta.url)) });
    await page.evaluate(() => NDS.Audit.run());
}
console.log(`audit warnings: ${warnings.length}`);
for (const w of warnings) console.log(`  - ${w}`);

await browser.close();
