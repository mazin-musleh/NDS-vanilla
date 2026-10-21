// A bundle runs once per page (PERSONA entry 12 rule 17): a second copy of nds-main or an injected
// bundle adds no listener and warns. Loads each fixture from built assets/js, no server needed.
//
//   ONCE    main once, delegated tag once
//   TWICE   main twice, delegated tag twice
// Pass: TWICE has the same listeners on window, document and <body> as ONCE, and warns per extra copy.
// The listener count sees eval-time wiring only (the fixture has no component markup).
// Chromium only (counts listeners through CDP). Each step logs its time; a stuck step fails in
// STEP_MS with its name, and failed requests and page errors print as they happen.
//
//   node scripts/check-bundle-once.mjs      JS=<dir> tests other bundles (old ones must fail)
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { launch, cdp } from './lib/browser.mjs';

const ROOT = join(import.meta.dirname, '..');
const DIR = join(ROOT, 'tmp', 'check-bundle-once');
const JS = pathToFileURL(join(process.env.JS || join(ROOT, 'assets', 'js'), '/')).href;
const STEP_MS = 10000;
mkdirSync(DIR, { recursive: true });

const t0 = Date.now();
const log = (msg) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)}s] ${msg}`);
// Every await goes through here, so a hang names its step instead of waiting out a default timeout.
const step = async (name, fn) => {
    let timer;
    const stuck = new Promise((_, rej) => { timer = setTimeout(() => rej(new Error(`stuck > ${STEP_MS / 1000}s: ${name}`)), STEP_MS); });
    try { return await Promise.race([fn(), stuck]); } finally { clearTimeout(timer); }
};

const fixture = (copies) => {
    const tags = `<script defer src="${JS}nds-main.min.js"></script>\n`.repeat(copies);
    const file = join(DIR, `x${copies}.html`);
    writeFileSync(file, `<!doctype html><html lang="en" dir="ltr"><head><meta charset="utf-8">${tags}</head><body><p>fixture</p></body></html>`);
    return pathToFileURL(file).href;
};

let failed = 0;
const ok = (name, pass, detail = '') => {
    if (!pass) failed++;
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

log(`bundles from ${JS}`);
const browser = await step('launch Chrome', () => launch({ timeout: STEP_MS }));
log('Chrome up');

async function run(copies) {
    const tag = copies === 1 ? 'ONCE' : 'TWICE';
    const page = await browser.newPage();
    const warnings = [], errors = [];
    page.on('console', (m) => { if (/loaded twice/.test(m.text())) warnings.push(m.text()); });
    page.on('pageerror', (e) => { errors.push(e.message); log(`${tag} page error: ${e.message}`); });
    page.on('requestfailed', (r) => log(`${tag} request failed: ${r.url()} (${r.failure()?.errorText})`));
    await step(`${tag} load fixture`, () => page.goto(fixture(copies), { waitUntil: 'load' }));
    await step(`${tag} wait for NDS.init.ready`, async () => {
        await page.waitForFunction(() => window.NDS && NDS.init, null, { timeout: STEP_MS });
        await page.evaluate(() => NDS.init.ready);
    });
    log(`${tag} NDS ready`);
    for (let i = 0; i < copies; i++) {
        await step(`${tag} add delegated tag ${i + 1}`, () => page.evaluate((js) => new Promise((res) => {
            const s = document.createElement('script');
            s.src = js + 'nds-delegated.min.js';
            s.onload = s.onerror = res;
            document.head.append(s);
        }), JS));
    }
    const session = await cdp(page);
    const count = async () => {
        const out = {};
        for (const target of ['window', 'document', 'document.body']) {
            const { result } = await session.send('Runtime.evaluate', { expression: target });
            const { listeners } = await session.send('DOMDebugger.getEventListeners', { objectId: result.objectId });
            for (const l of listeners) out[`${target} ${l.type}`] = (out[`${target} ${l.type}`] || 0) + 1;
        }
        return JSON.stringify(out);
    };
    // The loader wires on an idle pass after ready: count until two readings 250 ms apart agree.
    const counts = await step(`${tag} wait for listeners to settle`, async () => {
        let prev = await count();
        for (;;) {
            await page.waitForTimeout(250);
            const now = await count();
            if (now === prev) return JSON.parse(now);
            prev = now;
        }
    });
    log(`${tag} done: ${Object.values(counts).reduce((a, b) => a + b, 0)} listeners, ${warnings.length} warnings`);
    await page.close();
    return { counts, warnings, errors };
}

try {
    const [once, twice] = await Promise.all([run(1), run(2)]);
    const diff = [...new Set([...Object.keys(once.counts), ...Object.keys(twice.counts)])]
        .filter((k) => once.counts[k] !== twice.counts[k])
        .map((k) => `${k}: ${once.counts[k] || 0} → ${twice.counts[k] || 0}`);
    ok('ONCE loads with no error', once.errors.length === 0, once.errors.join(' | '));
    ok('TWICE loads with no error', twice.errors.length === 0, twice.errors.join(' | '));
    ok('a second copy adds no listener', diff.length === 0, diff.join(', '));
    ok('the second main copy warns', twice.warnings.some((w) => w.includes('nds-main.min.js')), twice.warnings.join(' | '));
    ok('the second delegated copy warns', twice.warnings.some((w) => w.includes('nds-delegated.min.js')), twice.warnings.join(' | '));
    ok('ONCE warns only for a copy the loader already injected', once.warnings.every((w) => w.includes('nds-delegated.min.js')), once.warnings.join(' | '));
} catch (e) {
    failed++;
    console.log(`FAIL  ${e.message}`);
} finally {
    await browser.close();
}
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
