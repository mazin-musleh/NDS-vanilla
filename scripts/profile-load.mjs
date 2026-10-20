// Which functions eat the main thread while a page loads and NDS sets it up: a V8 CPU profile from
// navigation to quiet, phone + CPU x6.6, self and total time per function in the NDS bundles.
// Minified frames print the bundle text at their offset, so the code can be found in _js/.
//   node scripts/profile-load.mjs [page] [ms]    FILTER=text keeps frames whose snippet holds it
import { launch, cdp } from './lib/browser.mjs';
import { readFileSync, existsSync } from 'node:fs';
const PAGE = process.argv[2] || 'index.html';
const MS = +(process.argv[3] || 8000);
const FILTER = process.env.FILTER || '';
const b = await launch();
const ctx = await b.newContext({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2.6, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
await page.route('**/nds-cookies.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
const s = await cdp(page);
await s.send('Emulation.setCPUThrottlingRate', { rate: 6.6 });
await s.send('Profiler.enable');
await s.send('Profiler.setSamplingInterval', { interval: 200 });
await s.send('Profiler.start');
await page.goto(`http://localhost:4002/NDS-vanilla/${PAGE}`, { waitUntil: 'load' });
await page.waitForTimeout(MS);
const { profile } = await s.send('Profiler.stop');
await b.close();

const src = {};
const snip = (url, line, col) => {
  const f = (url || '').split('/').pop().split('?')[0];
  const p = `assets/js/${f}`;
  if (!f.endsWith('.js') || !existsSync(p)) return '';
  src[p] ??= readFileSync(p, 'utf8').split('\n');
  return (src[p][line] || '').slice(Math.max(0, col - 20), col + 110).replace(/\s+/g, ' ');
};
const byId = new Map(profile.nodes.map((n) => [n.id, n]));
const self = new Map();
const dt = profile.timeDeltas;
profile.samples.forEach((id, i) => self.set(id, (self.get(id) || 0) + (dt[i + 1] || 0) / 1000));
// Total = self + children, per node; then summed per frame key.
const total = new Map();
const tot = (n) => { if (total.has(n.id)) return total.get(n.id); let t = self.get(n.id) || 0; for (const c of n.children || []) t += tot(byId.get(c)); total.set(n.id, t); return t; };
profile.nodes.forEach(tot);
const key = (n) => { const c = n.callFrame; return `${c.functionName || '(anon)'} @${c.url.split('/').pop().split('?')[0]}:${c.lineNumber}:${c.columnNumber}`; };
const agg = new Map();
for (const n of profile.nodes) {
  const c = n.callFrame;
  if (!/nds-[\w-]+\.min\.js/.test(c.url)) continue;
  const k = key(n);
  const a = agg.get(k) || { self: 0, total: 0, snippet: snip(c.url, c.lineNumber, c.columnNumber) };
  a.self += self.get(n.id) || 0;
  a.total += total.get(n.id) || 0;   // ponytail: recursive frames double-count their total
  agg.set(k, a);
}
const rows = [...agg.entries()].filter(([, a]) => !FILTER || a.snippet.includes(FILTER));
const show = (title, by) => {
  console.log(`\n${title}`);
  for (const [k, a] of rows.sort((x, y) => y[1][by] - x[1][by]).slice(0, 15))
    console.log(`  self ${a.self.toFixed(0).padStart(5)}  total ${a.total.toFixed(0).padStart(5)}  ${k}\n        ${a.snippet}`);
};
console.log(`${PAGE}: ${MS} ms after load, CPU x6.6`);
show('by total time (ms)', 'total');
show('by self time (ms)', 'self');
