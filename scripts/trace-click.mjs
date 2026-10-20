// A plain tap or click (on a <p>) under phone + CPU x6.6. Names every listener that runs for
// pointerdown/pointerup/click (and mouse/touch twins), and every other main-thread task in the
// click window. Minified frames are shown with the bundle text at their offset.
//   node scripts/trace-click.mjs [page] [runs]    TAP=1 for a touch tap · needs the dev server on :4002 · Chromium only (CDP)
import { launch, cdp } from './lib/browser.mjs';
import { readFileSync, existsSync } from 'node:fs';
const PAGE = process.argv[2] || 'components/divider.html';
const RUNS = +(process.argv[3] || 5);
const TAP = !!process.env.TAP;
const b = await launch();
const ctx = await b.newContext({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2.6, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.route('**/nds-cookies.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
await page.goto(`http://localhost:4002/NDS-vanilla/${PAGE}`, { waitUntil: 'load' });
await page.waitForTimeout(4000);
const s = await cdp(page);
await s.send('Emulation.setCPUThrottlingRate', { rate: 6.6 });
await page.waitForTimeout(1500);

const src = {};
const snip = (url, line, col) => {
  const f = (url || '').split('/').pop().split('?')[0];
  if (!f.endsWith('.js')) return '';
  const p = `assets/js/${f}`;
  if (!existsSync(p)) return '';
  src[p] ??= readFileSync(p, 'utf8').split('\n');
  const l = src[p][line] ?? src[p][line - 1] ?? '';
  return l.slice(Math.max(0, col - 10), col + 90).replace(/\s+/g, ' ');
};

const agg = {};      // listener key -> { ms, n, snippet }
const evTotals = {}; // event type -> ms
const other = {};    // non-input task names in the window -> ms
const handled = [];
for (let i = 0; i < RUNS; i++) {
  const p = await page.locator('main p').nth(i % 3).boundingBox();
  const events = [];
  const onData = (d) => events.push(...d.value);
  s.on('Tracing.dataCollected', onData);
  await s.send('Tracing.start', { traceConfig: { includedCategories: ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'blink.user_timing', '__metadata', 'v8.execute'] } });
  await page.waitForTimeout(300);
  await page.evaluate(() => performance.mark('c0'));
  if (TAP) await page.touchscreen.tap(p.x + 20, p.y + 5); else await page.mouse.click(p.x + 20, p.y + 5);
  await page.waitForTimeout(800);
  const done = new Promise((r) => s.once('Tracing.tracingComplete', r));
  await s.send('Tracing.end'); await done;
  s.off('Tracing.dataCollected', onData);
  const t0 = events.find((e) => e.name === 'c0')?.ts ?? 0;
  const main = new Set(events.filter((e) => e.name === 'thread_name' && e.args?.name === 'CrRendererMain').map((e) => e.pid + ':' + e.tid));
  const onMain = events.filter((e) => main.has(e.pid + ':' + e.tid) && e.ts >= t0 && e.ts <= t0 + 700e3);
  const dispatches = onMain.filter((e) => e.name === 'EventDispatch' && e.dur);
  let total = 0;
  for (const d of dispatches) {
    const type = d.args?.data?.type;
    if (!/^(pointer|mouse|touch|click|focus|blur|selection)/.test(type || '')) continue;
    evTotals[type] = (evTotals[type] || 0) + d.dur / 1000;
    total += d.dur / 1000;
    // FunctionCall children inside this dispatch.
    for (const f of onMain.filter((e) => e.name === 'FunctionCall' && e.dur && e.ts >= d.ts && e.ts + e.dur <= d.ts + d.dur)) {
      const a = f.args?.data || {};
      const key = `${type} · ${a.functionName || '(anon)'} @${(a.url || '').split('/').pop().split('?')[0]}:${a.lineNumber}:${a.columnNumber}`;
      agg[key] ??= { ms: 0, n: 0, snippet: snip(a.url, a.lineNumber, a.columnNumber) };
      agg[key].ms += f.dur / 1000; agg[key].n++;
    }
  }
  handled.push(Math.round(total * 10) / 10);
  for (const e of onMain.filter((e) => e.name === 'RunTask' && e.dur)) {
    const kids = onMain.filter((x) => x.ts >= e.ts && x.ts <= e.ts + e.dur && x.name !== 'RunTask' && x.dur && /^(EventDispatch|FunctionCall|TimerFire|FireAnimationFrame|UpdateLayoutTree|Layout|Paint|ParseHTML|EvaluateScript|IntersectionObserverController::computeIntersections|FireIdleCallback|HitTest|ResourceReceiveResponse|MajorGC|MinorGC|V8.GC_SCAVENGER|v8.callFunction)$/.test(x.name));
    const top = kids.sort((x, y) => y.dur - x.dur)[0];
    const label = top ? (top.name === 'FunctionCall' || top.name === 'TimerFire' || top.name === 'FireIdleCallback'
      ? `${top.name} ${(top.args?.data?.functionName || '')}@${(top.args?.data?.url || '').split('/').pop().split('?')[0]}:${top.args?.data?.columnNumber ?? ''}`
      : top.name + (top.name === 'EventDispatch' ? ' ' + top.args?.data?.type : '')) : '(idle task)';
    other[label] = (other[label] || 0) + e.dur / 1000;
  }
}
console.log(`\n${PAGE} — ${RUNS} plain ${TAP ? 'taps' : 'clicks'}, phone, CPU x6.6`);
console.log('input-event dispatch ms per click:', JSON.stringify(handled));
console.log('by event type (total ms over all clicks):', JSON.stringify(Object.fromEntries(Object.entries(evTotals).map(([k, v]) => [k, Math.round(v)]))));
console.log('\nlisteners (total ms over all clicks, calls):');
for (const [k, v] of Object.entries(agg).sort((a, b) => b[1].ms - a[1].ms).slice(0, 15)) console.log(`  ${v.ms.toFixed(1).padStart(6)}  x${v.n}  ${k}\n          ${v.snippet}`);
console.log('\nall main-thread tasks in the 700 ms after each click, by dominant child (total ms):');
for (const [k, v] of Object.entries(other).sort((a, b) => b[1] - a[1]).slice(0, 12)) console.log(`  ${v.toFixed(1).padStart(7)}  ${k}`);
await b.close();
