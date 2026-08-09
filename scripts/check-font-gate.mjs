// Why does data-nds-fonts-loaded intermittently never land on Editor pages?
//
// nds-fontLoading.js has ONE working path: an element renders with the font,
// the browser downloads it, a font loading period ends, and `loadingdone`
// fires while that face reports status 'loaded'. The seeded
// document.fonts.load() call runs before the deferred @font-face sheet parses,
// so it matches nothing. Miss the edge and fail() is terminal — no retry.
//
// This records every loadingdone with the face state AT THAT MOMENT, so the
// missed edge is visible rather than inferred.
//
//   node scripts/check-font-gate.mjs [runs] [page]
import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';

const RUNS = Number(process.argv[2] || 20);
const PAGE = process.argv[3] || 'components/editor.html';
const PORT = 4201;
const FONT = 'hgi-stroke-rounded';
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const server = spawn(process.execPath, ['.claude/skills/nds-perf/gz-serve.mjs', '_site', String(PORT)], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 1200));

// Installed before any page script, so it observes the same edges
// nds-fontLoading.js is racing for. Passive: it only reads.
const PROBE = (FONT) => {
    const log = [];
    const t = () => Math.round(performance.now());
    const faces = () => {
        const out = [];
        document.fonts.forEach((f) => { if (f.family === FONT) out.push(f.status); });
        return out;
    };
    // hasLoadedFace() as nds-fontLoading.js computes it — the exact predicate
    // that decides whether an edge is taken or dropped.
    const hasLoaded = () => faces().includes('loaded');
    const snap = (type) => log.push({
        t: t(), type, docStatus: document.fonts.status,
        faces: faces(), hasLoaded: hasLoaded(),
    });

    document.fonts.addEventListener('loading', () => snap('loading'));
    document.fonts.addEventListener('loadingdone', () => snap('loadingdone'));
    document.fonts.addEventListener('loadingerror', () => snap('loadingerror'));

    window.__probe = { log, stampedAt: null, sheetAt: null, usageAt: null };

    // This runs at document-start, before <html> exists — observing null throws
    // and would kill every line below it. Defer to DOM availability.
    const whenRoot = (fn) => {
        if (document.documentElement) return fn();
        document.addEventListener('readystatechange', function once() {
            if (document.documentElement) { document.removeEventListener('readystatechange', once); fn(); }
        });
    };

    whenRoot(() => {
    new MutationObserver(() => {
        const v = document.documentElement.getAttribute('data-nds-fonts-loaded');
        if (v && v.includes(FONT) && window.__probe.stampedAt === null) {
            window.__probe.stampedAt = t();
            snap('STAMPED');
        }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-nds-fonts-loaded'] });

    // When does the @font-face sheet actually finish, and when does the first
    // element that USES the font appear? Those are the two real triggers.
    new MutationObserver(() => {
        if (window.__probe.sheetAt === null) {
            const l = [...document.querySelectorAll('link[rel="stylesheet"]')]
                .find((x) => x.href.includes('hgi-rounded-stroke'));
            if (l) {
                window.__probe.sheetAt = t();
                l.addEventListener('load', () => { window.__probe.sheetLoadedAt = t(); snap('sheet-loaded'); });
            }
        }
        if (window.__probe.usageAt === null && document.querySelector('i.hgi-stroke')) {
            window.__probe.usageAt = t();
            snap('first-usage');
        }
    }).observe(document.documentElement, { childList: true, subtree: true });
    });
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const results = [];

for (let i = 0; i < RUNS; i++) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
    await page.setCacheEnabled(false);
    const cdp = await page.target().createCDPSession();
    // House standard: slow-4G + 6.6x CPU. The bug is a timing race, so the
    // throttle is what makes it reproduce at all.
    await cdp.send('Network.emulateNetworkConditions', {
        offline: false, latency: 400, downloadThroughput: (400 * 1024) / 8, uploadThroughput: (400 * 1024) / 8,
    });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6.6 });
    await page.evaluateOnNewDocument(PROBE, FONT);

    await page.goto(`http://localhost:${PORT}/NDS-vanilla/${PAGE}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    // Past nds-fontLoading.js's own 15s timeout, so a fail() is captured as final.
    await new Promise((r) => setTimeout(r, 18000));

    const r = await page.evaluate((FONT) => {
        const p = window.__probe;
        const faces = [];
        document.fonts.forEach((f) => { if (f.family === FONT) faces.push(f.status); });
        // Verdict comes from the live attribute, never from the observer — the
        // attribute IS the contract the CSS reads.
        const attr = document.documentElement.getAttribute('data-nds-fonts-loaded');
        return {
            stamped: !!attr && attr.includes(FONT), stampedAt: p.stampedAt,
            sheetAt: p.sheetAt, sheetLoadedAt: p.sheetLoadedAt ?? null, usageAt: p.usageAt,
            finalFaces: faces, finalDocStatus: document.fonts.status,
            attr,
            log: p.log,
        };
    }, FONT);

    results.push(r);
    process.stdout.write(`  run ${String(i + 1).padStart(2)}: ${r.stamped ? 'ok  ' : 'FAIL'}  stamp=${r.stampedAt ?? '-'}ms  sheet=${r.sheetLoadedAt ?? r.sheetAt ?? '-'}ms  usage=${r.usageAt ?? '-'}ms  faces=[${r.finalFaces}]\n`);
    await page.close();
}

await browser.close();
server.kill();

const fails = results.filter((r) => !r.stamped);
console.log(`\n${results.length - fails.length}/${results.length} stamped · ${fails.length} FAILED`);

if (fails.length) {
    console.log('\n--- first failing run, full edge timeline ---');
    for (const e of fails[0].log) {
        console.log(`  ${String(e.t).padStart(6)}ms  ${e.type.padEnd(13)} doc=${String(e.docStatus).padEnd(7)} hasLoaded=${String(e.hasLoaded).padEnd(5)} faces=[${e.faces}]`);
    }
    console.log(`  final: faces=[${fails[0].finalFaces}] docStatus=${fails[0].finalDocStatus} attr=${JSON.stringify(fails[0].attr)}`);
}
const ok = results.find((r) => r.stamped);
if (ok && fails.length) {
    console.log('\n--- a passing run, for contrast ---');
    for (const e of ok.log) {
        console.log(`  ${String(e.t).padStart(6)}ms  ${e.type.padEnd(13)} doc=${String(e.docStatus).padEnd(7)} hasLoaded=${String(e.hasLoaded).padEnd(5)} faces=[${e.faces}]`);
    }
}
