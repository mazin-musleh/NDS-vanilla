// Records why the page scroll moves during load: the browser's own layout-shift
// entries (with the elements that moved) and every change of window.scrollY,
// under the house throttle (slow-4G + 6.6x CPU). Two scenarios per viewport: a
// fresh load at the top, and a reload with the page scrolled down (the loader's
// scroll re-pin). Output: a summary per run, and tmp/scroll-jump-<run>.json.
//   node scripts/check-scroll-jump.mjs [/page.html] [baseUrl] [--desktop|--mobile]
import puppeteer from 'puppeteer-core';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

const argv = process.argv.slice(2);
const PAGE = argv.find((a) => a.startsWith('/')) || '/';
const BASE = (argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const VIEWPORTS = argv.includes('--mobile') ? ['mobile'] : argv.includes('--desktop') ? ['desktop'] : ['desktop', 'mobile'];
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const probe = await fetch(`${BASE}${PAGE}`).catch(() => null);
if (!probe?.ok) { console.error(`cannot reach ${BASE}${PAGE} — is the dev server up?`); process.exit(2); }
mkdirSync('tmp', { recursive: true });

// Installed before any page script: buffered layout-shift log + scrollY changes.
const PROBE = () => {
    const t = () => Math.round(performance.now());
    const desc = (n) => {
        if (!n || !n.tagName) return String(n);
        const cls = (n.className && typeof n.className === 'string') ? '.' + n.className.trim().split(/\s+/).slice(0, 3).join('.') : '';
        return n.tagName.toLowerCase() + (n.id ? '#' + n.id : '') + cls;
    };
    const p = window.__jump = { shifts: [], scroll: [{ t: 0, y: window.scrollY }], marks: [] };
    new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
            if (e.hadRecentInput) continue;
            p.shifts.push({
                t: Math.round(e.startTime), value: +e.value.toFixed(4),
                sources: (e.sources || []).slice(0, 4).map((s) => ({
                    node: desc(s.node), fromY: Math.round(s.previousRect.y), toY: Math.round(s.currentRect.y),
                    from: [s.previousRect.x, s.previousRect.y, s.previousRect.width, s.previousRect.height].map(Math.round).join(','),
                    to: [s.currentRect.x, s.currentRect.y, s.currentRect.width, s.currentRect.height].map(Math.round).join(','),
                })),
            });
        }
    }).observe({ type: 'layout-shift', buffered: true });
    let last = window.scrollY;
    // Horizontal: every deck's scrollLeft per frame, so a sideways jump shows
    // with the frame it landed in; clone insertion is logged with its frame too.
    p.decks = []; let frame = 0; const lefts = new Map();
    // Paint proof: a timeout queued from rAF runs after that frame has painted.
    // If it finds clones in the DOM while the loop deck still sits at 0, a frame
    // painted the head clones (the last slides) before the landing jump.
    p.badPaints = [];
    const afterPaint = (f) => setTimeout(() => {
        const d = document.querySelector('.nds-swiper[data-swiper-loop] .nds-swiper-wrapper');
        if (d && d.querySelector('.nds-swiper-clone') && Math.abs(d.scrollLeft) < 1) p.badPaints.push({ t: t(), frame: f });
    }, 0);
    // Document height per frame: a change above the viewport moves the content
    // under the reader when scroll anchoring is off.
    p.heights = []; let lastH = 0;
    const sample = () => {
        frame++;
        afterPaint(frame);
        const h = document.scrollingElement ? document.scrollingElement.scrollHeight : 0;
        if (h !== lastH) { p.heights.push({ t: t(), h }); lastH = h; }
        const y = window.scrollY; if (y !== last) { p.scroll.push({ t: t(), y, frame }); last = y; }
        document.querySelectorAll('.nds-swiper-wrapper').forEach((w, i) => {
            const x = Math.round(w.scrollLeft); if (lefts.get(w) !== x) { if (lefts.has(w)) p.decks.push({ t: t(), frame, deck: i, x }); lefts.set(w, x); }
        });
        requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
    // Observe the document: the root element does not exist yet at this point.
    new MutationObserver((ms) => { for (const m of ms) for (const n of m.addedNodes) if (n.classList && n.classList.contains('nds-swiper-clone')) { p.marks.push({ t: t(), frame, name: 'clones inserted' }); return; } })
        .observe(document, { childList: true, subtree: true });
    addEventListener('scroll', () => { const y = window.scrollY; if (y !== last) { p.scroll.push({ t: t(), y, ev: true }); last = y; } });
    const mark = (name) => p.marks.push({ t: t(), name });
    new MutationObserver((ms) => {
        for (const m of ms) {
            if (m.target === document.documentElement && m.attributeName === 'data-nds-loaded') mark('data-nds-loaded');
            if (m.attributeName === 'data-nds-swiper-initialized' && m.target.hasAttribute('data-nds-swiper-initialized')) mark('swiper init ' + desc(m.target));
        }
    }).observe(document, { attributes: true, subtree: true, attributeFilter: ['data-nds-loaded', 'data-nds-swiper-initialized'] });
    addEventListener('load', () => mark('load'));
};

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const newPage = async (vp) => {
    const page = await browser.newPage();
    if (vp === 'mobile') await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
    else await page.setViewport({ width: 1280, height: 800 });
    await page.setCacheEnabled(false);
    const cdp = await page.target().createCDPSession();
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 400, downloadThroughput: (400 * 1024) / 8, uploadThroughput: (400 * 1024) / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6.6 });
    await page.evaluateOnNewDocument(PROBE);
    return page;
};
const settle = (ms) => new Promise((r) => setTimeout(r, ms));
// The swiper bundle is injected after the reveal, so `load` fires long before
// init on slow-4G: wait for the last non-hero deck's init stamp, then settle.
const inited = async (page) => {
    await page.waitForFunction(() => { const d = document.querySelectorAll('.nds-swiper:not(.nds-hero)'); return d.length && [...d].every((s) => s.hasAttribute('data-nds-swiper-initialized')); }, { timeout: 90000 }).catch(() => console.log('  (timed out waiting for swiper init)'));
    await settle(2500);
};
const collect = (page) => page.evaluate(() => window.__jump);
const report = (name, data) => {
    writeFileSync(`tmp/scroll-jump-${name}.json`, JSON.stringify(data, null, 2));
    const totalCls = data.shifts.reduce((a, s) => a + s.value, 0).toFixed(3);
    console.log(`\n== ${name}: CLS ${totalCls}, ${data.shifts.length} shifts, ${data.scroll.length - 1} scroll changes`);
    for (const m of data.marks) console.log(`   mark ${String(m.t).padStart(6)}ms  ${m.name}${m.frame ? ` (frame ${m.frame})` : ''}`);
    console.log(`  frames painted with head clones at scroll 0: ${(data.badPaints || []).length}${(data.badPaints || []).slice(0, 3).map((b) => ` [${b.t}ms f${b.frame}]`).join('')}`);
    for (const s of data.shifts) console.log(`  shift ${String(s.t).padStart(6)}ms  ${s.value}  ${s.sources.map((x) => `${x.node} [${x.from}]→[${x.to}]`).join(' | ')}`);
    for (const s of data.scroll.slice(1)) console.log(` scroll ${String(s.t).padStart(6)}ms  y=${s.y}${s.frame ? ` (frame ${s.frame})` : ''}`);
    for (const d of data.decks || []) console.log(`   deck ${String(d.t).padStart(6)}ms  #${d.deck} scrollLeft=${d.x} (frame ${d.frame})`);
    for (const w of data.wheels || []) console.log(`  wheel ${String(w.t).padStart(6)}ms  +${w.dy}`);
    const hs = data.heights || [];
    if (hs.length) console.log(` height ${hs.map((x) => `${x.t}ms:${x.h}`).join('  ')}`);
};

// Scenario 3: the reader scrolls while the page is still loading (pre-reveal).
// Wheel every 1.2s until the reveal stamp lands; every scroll change that is
// not one of ours is a jump.
const scrollDuringLoad = async (vp) => {
    const page = await newPage(vp);
    const wheels = [];
    const nav = page.goto(`${BASE}${PAGE}`, { waitUntil: 'load', timeout: 120000 });
    await settle(2500);
    for (let i = 0; i < 12; i++) {
        const revealed = await page.evaluate(() => document.documentElement.hasAttribute('data-nds-loaded')).catch(() => false);
        if (revealed) break;
        const t = await page.evaluate(() => Math.round(performance.now())).catch(() => -1);
        await page.mouse.wheel({ deltaY: 500 }); wheels.push({ t, dy: 500 });
        await settle(1200);
    }
    await nav;
    await inited(page);
    const data = await collect(page);
    data.wheels = wheels;
    report(`${vp}-scroll-during-load`, data);
    await page.close();
};
if (argv.includes('--during')) { for (const vp of VIEWPORTS) await scrollDuringLoad(vp); await browser.close(); process.exit(0); }

for (const vp of VIEWPORTS) {
    // 1. fresh load at the top
    let page = await newPage(vp);
    await page.goto(`${BASE}${PAGE}`, { waitUntil: 'load', timeout: 90000 });
    await inited(page);
    report(`${vp}-top`, await collect(page));
    // 2. reload with the page scrolled to the first loop deck (or 1500px)
    const y = await page.evaluate(() => { const d = document.querySelector('.nds-swiper[data-swiper-loop]') || document.querySelector('.nds-swiper:not(.nds-hero)'); return d ? Math.max(0, d.getBoundingClientRect().top + window.scrollY - 120) : 1500; });
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await settle(1500);
    await page.reload({ waitUntil: 'load', timeout: 90000 });
    await inited(page);
    const data = await collect(page);
    data.target = y;
    report(`${vp}-reload@${y}`, data);
    await page.close();
}
await browser.close();
