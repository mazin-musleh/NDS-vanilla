// Flicks every looping swiper on a page with REAL touch events and fails if the row
// pins at a hard scroll edge — the loop running out of clones before a rest lets it
// re-anchor. The symptom is a dead stop mid-swipe that clears only once the row fully
// settles, so a rest-only re-anchor never sees it.
//   node scripts/check-swiper-loop.mjs [/page.html] [baseUrl]
// Needs the dev server up. One line per swiper x direction; exit 1 on a pin.
import { launch, cdp } from './lib/browser.mjs';

const argv = process.argv.slice(2);
const PAGE = argv.find((a) => a.startsWith('/')) || '/';
const BASE = (argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const FLICKS = 18, GAP = 250;   // faster than the settle: the burst that exhausts the budget

const probe = await fetch(`${BASE}${PAGE}`).catch(() => null);
if (!probe?.ok) { console.error(`cannot reach ${BASE}${PAGE} — is the dev server up?`); process.exit(2); }

const browser = await launch();
let failed = 0;

const count = await withPage(async (page) =>
    page.$$eval('.nds-swiper[data-swiper-loop]', (els) => els.length));
if (!count) { console.log(`no looping swiper on ${PAGE}`); await browser.close(); process.exit(0); }

for (let which = 0; which < count; which++) {
    for (const dir of [1, -1]) {
        const r = await withPage((page) => run(page, which, dir));
        const pinned = r.hits.length > 0;
        if (pinned) failed++;
        console.log(`${pinned ? 'FAIL' : 'pass'}  swiper ${which} ${dir > 0 ? 'fwd ' : 'back'} ` +
            `real=${r.real} head=${r.head} spv=${r.spv}  edge hits ${r.episodes}x worst ${r.worst}ms` +
            (pinned ? `  <- at ${r.hits[0][1]}/${r.hits[0][2]}` : ''));
    }
}
await browser.close();
process.exit(failed ? 1 : 0);

async function withPage(fn) {
    const page = await browser.newPage({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    page.cdp = await cdp(page);
    await page.cdp.send('Emulation.setCPUThrottlingRate', { rate: 6.6 });
    await page.goto(`${BASE}${PAGE}`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.nds-swiper[data-nds-swiper-initialized]', { state: 'attached', timeout: 15000 });
    try { return await fn(page); } finally { await page.close(); }
}

async function run(page, which, dir) {
    // Let load work drain first, so the flicks are the only thing moving the row.
    await new Promise((r) => setTimeout(r, 2500));
    const info = await page.evaluate((w) => {
        const el = document.querySelectorAll('.nds-swiper[data-swiper-loop]')[w];
        el.scrollIntoView({ block: 'center' });
        const s = el._ndsSwiper, wrap = s.wrapper;
        const hits = window.__hits = [];
        (function tick() {
            const max = wrap.scrollWidth - wrap.clientWidth, sl = Math.abs(wrap.scrollLeft);
            if (sl <= 2 || sl >= max - 2) hits.push([Math.round(performance.now()), Math.round(sl), Math.round(max)]);
            requestAnimationFrame(tick);
        })();
        const r = el.getBoundingClientRect();
        return { real: s._real, head: s._head, spv: s.slidesPerView, rtl: !!window.NDS?.isRTL, y: r.y + r.height / 2 };
    }, which);

    const cy = Math.round(info.y), x0 = 206, span = 150 * (info.rtl ? -dir : dir);
    // Playwright has no touch-move, so the gesture goes through CDP.
    const touch = (type, x) => page.cdp.send('Input.dispatchTouchEvent', { type, touchPoints: x == null ? [] : [{ x, y: cy }] });
    for (let i = 0; i < FLICKS; i++) {
        await touch('touchStart', x0 + span / 2);
        for (let k = 1; k <= 5; k++) await touch('touchMove', Math.round(x0 + span / 2 - span * k / 5));
        await touch('touchEnd');
        await new Promise((r) => setTimeout(r, GAP));
    }
    await new Promise((r) => setTimeout(r, 1200));
    // One brush past the edge recovers on the next touch and nobody feels it. The
    // failure is the row reaching the edge OVER AND OVER — each gesture slamming into
    // it and waiting for a full rest to be rescued — or sitting there outright.
    const raw = await page.evaluate(() => window.__hits);
    const runs = [];
    for (const h of raw) {
        if (!runs.length || h[0] - runs.at(-1).at(-1)[0] > 100) runs.push([]);
        runs.at(-1).push(h);
    }
    const worst = Math.max(0, ...runs.map((r) => r.at(-1)[0] - r[0][0]));
    const bad = runs.length >= 3 || worst > 150;
    return { ...info, episodes: runs.length, worst, hits: bad ? runs.flat() : [] };
}
