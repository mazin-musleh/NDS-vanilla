// Shared browser launch for scripts/*.mjs. ENGINE=webkit runs a check as Safari;
// CDP calls (throttling, touch, traces) are Chromium-only and throw under it.
// WebKit lives in Playwright's per-user cache, fetched on first use or again when a
// playwright-core update needs a newer build.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { chromium, webkit } from 'playwright-core';

const ROOT = join(import.meta.dirname, '..', '..');

export const ENGINE = process.env.ENGINE || 'chromium';

const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
].find((p) => p && existsSync(p));

export async function launch(opts = {}) {
    opts = { timeout: 15000, ...opts };   // Playwright waits 180 s for a launch
    if (ENGINE === 'webkit') {
        try { return failFast(await webkit.launch(opts)); } catch (e) {
            if (!/Executable doesn't exist/.test(e.message)) throw e;
            console.error('WebKit missing or outdated — downloading the build this playwright-core needs…');
            execFileSync(process.execPath, [join(ROOT, 'node_modules', 'playwright-core', 'cli.js'), 'install', 'webkit'], { stdio: 'inherit' });
            return failFast(await webkit.launch(opts));
        }
    }
    if (!CHROME) { console.error('Chrome not found — set CHROME_PATH'); process.exit(1); }
    return failFast(await chromium.launch({ executablePath: CHROME, ...opts }));
}

// Every page a check opens: actions and waits fail in STEP_MS (not Playwright's 30 s), evaluate()
// too (it has no limit at all: `NDS.init.ready` on a broken page hung forever), and page errors and
// failed requests print as they happen. A check's own setDefaultTimeout or { timeout } still wins.
function failFast(browser) {
    const watched = new WeakSet();   // browser.newPage() opens a context too: wrap each page once
    const watch = (page) => {
        if (watched.has(page)) return page;
        watched.add(page);
        let limit = STEP_MS;
        page.setDefaultTimeout(limit);
        const setDefaultTimeout = page.setDefaultTimeout.bind(page);
        page.setDefaultTimeout = (ms) => { limit = ms; setDefaultTimeout(ms); };
        const evaluate = page.evaluate.bind(page);
        page.evaluate = (...args) => {
            let timer;
            const stuck = new Promise((_, rej) => { timer = setTimeout(() => rej(new Error(`evaluate stuck > ${limit / 1000}s on ${page.url()}`)), limit); });
            return Promise.race([evaluate(...args), stuck]).finally(() => clearTimeout(timer));
        };
        page.on('pageerror', (e) => log(`page error on ${page.url()}: ${e.message}`));
        page.on('requestfailed', (r) => log(`request failed: ${r.url()} (${r.failure()?.errorText})`));
        return page;
    };
    const newContext = browser.newContext.bind(browser);
    browser.newContext = async (...args) => {
        const context = await newContext(...args);
        context.on('page', watch);
        return context;
    };
    const newPage = browser.newPage.bind(browser);
    browser.newPage = async (...args) => watch(await newPage(...args));
    return browser;
}

export const cdp = (page) => page.context().newCDPSession(page);

// Fast-fail kit (AGENTS.md): every line carries its elapsed time, and a stuck await fails
// in STEP_MS naming its step instead of waiting out a library default.
export const STEP_MS = 10000;
const t0 = Date.now();
export const log = (msg) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)}s] ${msg}`);
export const step = async (name, fn, ms = STEP_MS) => {
    let timer;
    const stuck = new Promise((_, rej) => { timer = setTimeout(() => rej(new Error(`stuck > ${ms / 1000}s: ${name}`)), ms); });
    try { return await Promise.race([fn(), stuck]); } finally { clearTimeout(timer); }
};
