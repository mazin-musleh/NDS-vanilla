// What keeps the main thread busy after load: every long animation frame (LoAF, >= 50 ms) from
// navigation to quiet, with the scripts inside it. A tap that lands in one waits for it: that wait
// is INP's input delay. Phone, CPU x6.6 or CPU=20 (Chromium only). A page is a path under the dev
// server or a full URL.
//   node scripts/trace-busy.mjs [page …]    WINDOW=ms to watch (default 15000) · INITS=1 adds each component's init time
import { launch, cdp } from './lib/browser.mjs';
const PAGES = process.argv.slice(2).length ? process.argv.slice(2) : ['index.html'];
const WINDOW = +(process.env.WINDOW || 15000);
const INITS = !!process.env.INITS;
const CPU = +(process.env.CPU || 6.6);
const b = await launch();
for (const pg of PAGES) {
  const ctx = await b.newContext({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2.6, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.route('**/nds-cookies.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
  const inits = [];
  if (INITS) {
    // The loader's own per-component timing; logging would also pull the audit bundle, so it is blocked.
    await page.addInitScript(() => { window.NDSInitConfig = { enableLogging: true, enableTiming: true }; });
    await page.route('**/nds-audit.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
    page.on('console', (m) => { const x = m.text().match(/^\[NDS:init\] (\S+) ([\d.]+)ms/); if (x) inits.push([x[1], +x[2]]); });
  }
  const s = await cdp(page);
  await s.send('Emulation.setCPUThrottlingRate', { rate: CPU });
  await page.addInitScript(() => {
    window.__loaf = [];
    new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__loaf.push({
      start: Math.round(e.startTime), dur: Math.round(e.duration), block: Math.round(e.blockingDuration),
      style: Math.round(e.styleAndLayoutStart ? e.startTime + e.duration - e.styleAndLayoutStart : 0),
      scripts: e.scripts.map((x) => ({ dur: Math.round(x.duration), forced: Math.round(x.forcedStyleAndLayoutDuration),
        who: (x.invoker || '') + ' @' + (x.sourceURL || '').split('/').pop().split('?')[0] + (x.sourceFunctionName ? ' ' + x.sourceFunctionName : '') + (x.sourceCharPosition >= 0 ? ':' + x.sourceCharPosition : '') })),
    }))).observe({ type: 'long-animation-frame', buffered: true });
  });
  await page.goto(/^https?:/.test(pg) ? pg : `http://localhost:4002/NDS-vanilla/${pg}`, { waitUntil: 'load', timeout: 180000 });
  await page.waitForTimeout(WINDOW);
  const loaf = await page.evaluate(() => window.__loaf);
  const total = loaf.reduce((n, e) => n + e.block, 0);
  console.log(`\n## ${pg}: ${loaf.length} long frames, ${total} ms blocking, longest ${Math.max(0, ...loaf.map((e) => e.dur))} ms`);
  for (const e of loaf.filter((e) => e.dur >= 100)) {
    console.log(`  @${String(e.start).padStart(6)}ms  ${String(e.dur).padStart(4)}ms (style+layout ${e.style})`);
    for (const x of e.scripts.sort((a, z) => z.dur - a.dur).slice(0, 4)) console.log(`      ${String(x.dur).padStart(4)}ms forced ${String(x.forced).padStart(3)}  ${x.who}`);
  }
  if (INITS) console.log('  inits over 10 ms:', inits.filter((x) => x[1] >= 10).sort((a, z) => z[1] - a[1]).map(([n, t]) => `${n} ${Math.round(t)}`).join(' · ') || 'none',
    `· total ${Math.round(inits.reduce((n, x) => n + x[1], 0))} ms over ${inits.length} components`);
  await ctx.close();
}
await b.close();
