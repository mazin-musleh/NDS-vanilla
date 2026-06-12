// Calibrated real-LCP measurement for NDS pages — the harness used to verify
// every perf change in this repo. Self-contained: starts its own gzip server
// against a built site dir, drives Chrome under the calibrated throttle, names
// the LCP element, reports per-run + median, then tears everything down.
//
// CALIBRATION (do not change without re-deriving — see memory project_crit_gate_si_lcp_measured):
//   slow-4G   = 1.6 Mbps down / 750 Kbps up / 150 ms RTT
//   CPU       = 6.6× slowdown (tuned for THIS machine, not Lighthouse's default 4×)
//   viewport  = 412×915 mobile, DPR 2.6
//   cold browser per run, median of 3, cache disabled.
//
// USAGE (run from the project root so puppeteer-core resolves):
//   node .claude/skills/nds-perf/measure-lcp.mjs                 # home, _site, 3 runs
//   node .claude/skills/nds-perf/measure-lcp.mjs components/ components/forms.html
//   node .claude/skills/nds-perf/measure-lcp.mjs https://mazin-musleh.github.io/NDS-vanilla/
//   node .claude/skills/nds-perf/measure-lcp.mjs --dir=_site --runs=5 --no-throttle
//   node .claude/skills/nds-perf/measure-lcp.mjs --baseurl=/NDS-vanilla --chrome="C:\path\chrome.exe"
//
// FLAGS: --dir=PATH (built site, default _site) · --runs=N (default 3) ·
//        --no-throttle (unthrottled) · --cpu=N (override CPU multiplier) ·
//        --baseurl=PREFIX (default /NDS-vanilla) · --chrome=PATH (else auto-detect) ·
//        --trace (per-run main-thread breakdown + long tasks from a DevTools trace) ·
//        --monitor (inject _includes/perf-monitor.html: CLS w/ shift sources,
//                   LoAF long tasks w/ forced-layout attribution, reflow hotspots)
import fs from 'fs';
import { startServer } from './gz-serve.mjs';
import puppeteer from 'puppeteer-core';

// ---- args ----
const args = process.argv.slice(2);
const flag = (name, def) => {
  const hit = args.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return def;
  return hit.includes('=') ? hit.split('=').slice(1).join('=') : true;
};
const DIR = flag('dir', '_site');
const RUNS = +flag('runs', 3);
const THROTTLE = !flag('no-throttle', false);
const CPU = +flag('cpu', 6.6);
const BASEURL = flag('baseurl', '/NDS-vanilla');
const TRACE = !!flag('trace', false);
const MONITOR = !!flag('monitor', false);
// The monitor is injected by the harness (evaluateOnNewDocument), so pages
// don't need a perf_monitor:true rebuild and remote URLs work too.
let MONITOR_SRC = null;
if (MONITOR) {
  try {
    const inc = fs.readFileSync('_includes/perf-monitor.html', 'utf8');
    MONITOR_SRC = (inc.match(/<script>([\s\S]*?)<\/script>/) || [])[1];
  } catch { /* handled below */ }
  if (!MONITOR_SRC) {
    console.error('--monitor: could not read _includes/perf-monitor.html (run from the project root).');
    process.exit(1);
  }
}
// Page paths relative to the baseurl root, or full http(s):// URLs measured
// as-is (no local server; emulated throttle stacks on the real network).
// Home = no positional arg. Local normalize: strip leading slash; treat
// '.'/'index.html' and an MSYS-mangled bare '/' (Git Bash rewrites it to
// 'C:/Program Files/Git/…') as home; any other ':' arg fails loudly.
const PAGES = (() => {
  const positional = args.filter((a) => !a.startsWith('--'));
  const norm = (p) => {
    if (/^https?:\/\//.test(p)) return { remote: p };
    if (p === '.' || p === 'index.html' || /Program Files\/Git/.test(p)) return { local: '' };
    if (p.includes(':')) {
      console.error(`Unrecognized page arg "${p}" — pass a path relative to the baseurl root, or a full http(s):// URL.`);
      process.exit(1);
    }
    return { local: p.replace(/^\//, '') };
  };
  return positional.length ? positional.map(norm) : [{ local: '' }];
})();
const HAS_LOCAL = PAGES.some((p) => p.local != null);

// ---- locate Chrome ----
function findChrome() {
  const env = flag('chrome', process.env.CHROME_PATH);
  const candidates = [
    typeof env === 'string' ? env : null,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium',
  ].filter(Boolean);
  const found = candidates.find((p) => { try { return fs.existsSync(p); } catch { return false; } });
  if (!found) { console.error('Chrome not found. Pass --chrome=PATH or set CHROME_PATH.'); process.exit(1); }
  return found;
}
const CHROME = findChrome();

if (HAS_LOCAL && !fs.existsSync(DIR)) {
  console.error(`Site dir "${DIR}" not found. Build first:  bundle exec jekyll build -d ${DIR}`);
  process.exit(1);
}

// ---- main-thread breakdown from a DevTools trace (--trace) ----
// Self-time per category: each event's duration counts toward its own bucket
// and is subtracted from its parent's, so nested work isn't double-counted.
const TRACE_BUCKETS = {
  EvaluateScript: 'script', FunctionCall: 'script', TimerFire: 'script', EventDispatch: 'script',
  FireAnimationFrame: 'script', FireIdleCallback: 'script', RunMicrotasks: 'script', 'V8.Execute': 'script',
  'v8.compile': 'compile', 'v8.compileModule': 'compile', 'V8.CompileScript': 'compile',
  ParseHTML: 'parse', ParseAuthorStyleSheet: 'parse',
  ScheduleStyleRecalculation: 'style/layout', UpdateLayoutTree: 'style/layout', RecalculateStyles: 'style/layout',
  Layout: 'style/layout', PrePaint: 'style/layout', Layerize: 'style/layout',
  Paint: 'paint', PaintImage: 'paint', 'Decode Image': 'paint', UpdateLayer: 'paint',
  UpdateLayerTree: 'paint', CompositeLayers: 'paint', Commit: 'paint',
  MinorGC: 'gc', MajorGC: 'gc', 'V8.GCFinalizeMC': 'gc', 'BlinkGC.AtomicPhase': 'gc',
};
function mainThreadBreakdown(trace) {
  const evs = trace.traceEvents || [];
  const key = (e) => `${e.pid}:${e.tid}`;
  const tname = new Map();
  for (const e of evs) if (e.ph === 'M' && e.name === 'thread_name') tname.set(key(e), e.args && e.args.name);
  const busy = new Map(); // busiest CrRendererMain = the page's main thread
  for (const e of evs) if (e.ph === 'X' && e.dur > 0 && tname.get(key(e)) === 'CrRendererMain')
    busy.set(key(e), (busy.get(key(e)) || 0) + e.dur);
  const main = [...busy.entries()].sort((a, b) => b[1] - a[1])[0];
  if (!main) return null;
  const mainEvs = evs.filter((e) => e.ph === 'X' && e.dur > 0 && key(e) === main[0])
    .sort((a, b) => a.ts - b.ts || b.dur - a.dur);
  const nav = evs.find((e) => e.name === 'navigationStart' && key(e) === main[0]);
  const t0 = nav ? nav.ts : mainEvs[0].ts;
  // Attribution: EvaluateScript/FunctionCall events carry url/function/line:col.
  // Each event's self-time goes to its own frame ("self") or to the nearest
  // enclosing script frame ("forced" — layout/paint/etc. that frame triggered).
  const short = (u) => (u || '').split('?')[0].split('/').pop();
  const frameLabel = (e) => {
    const d = (e.args && e.args.data) || {};
    if (e.name === 'EvaluateScript' && d.url) return `eval ${short(d.url)}`;
    if (e.name === 'FunctionCall' && (d.functionName || d.url)) {
      const loc = d.url ? `@${short(d.url)}:${d.lineNumber ?? 0}:${d.columnNumber ?? 0}` : '';
      return `${d.functionName || '(anonymous)'}${loc}`;
    }
    return null;
  };
  const buckets = {}; const longTasks = []; const stack = []; const culprits = new Map();
  const culp = (L) => { let c = culprits.get(L); if (!c) culprits.set(L, c = { self: 0, forced: 0 }); return c; };
  let curTask = null;
  for (const e of mainEvs) {
    while (stack.length && stack[stack.length - 1].end <= e.ts) stack.pop();
    const b = TRACE_BUCKETS[e.name] || 'other';
    buckets[b] = (buckets[b] || 0) + e.dur;
    const parent = stack.length ? stack[stack.length - 1] : null;
    if (parent) buckets[parent.b] -= e.dur;
    const label = frameLabel(e);
    const tgt = label ? { c: culp(label), f: 'self' }
      : parent && parent.nearLabel ? { c: culp(parent.nearLabel), f: 'forced' } : null;
    if (tgt) tgt.c[tgt.f] += e.dur;
    if (parent && parent.tgt) parent.tgt.c[parent.tgt.f] -= e.dur;
    if (!parent) {
      curTask = e.dur >= 50000 ? { at: e.ts - t0, dur: e.dur, top: null } : null; // µs
      if (curTask) longTasks.push(curTask);
    } else if (curTask && (label || TRACE_BUCKETS[e.name]) && e.dur > (curTask.top ? curTask.top.dur : 0)) {
      // dominant child = real work only, not scheduling wrappers (RunTask etc.)
      curTask.top = { name: e.name, dur: e.dur, label: label || parent.nearLabel };
    }
    stack.push({ end: e.ts + e.dur, b, nearLabel: label || (parent ? parent.nearLabel : null), tgt: tgt || (parent ? parent.tgt : null) });
  }
  return { buckets, longTasks, culprits };
}
function printBreakdown(bd) {
  if (!bd) { console.log('     trace: no main-thread events captured'); return; }
  const ms = (us) => Math.round(us / 1000) + 'ms';
  const order = ['script', 'compile', 'style/layout', 'paint', 'parse', 'gc', 'other'];
  const total = order.reduce((a, k) => a + (bd.buckets[k] || 0), 0);
  const parts = order.filter((k) => bd.buckets[k] > 0).map((k) => `${k} ${ms(bd.buckets[k])}`);
  console.log(`     main thread busy ${ms(total)}: ${parts.join(' · ')}`);
  const top = [...bd.culprits.entries()].map(([label, c]) => ({ label, ...c, total: c.self + c.forced }))
    .filter((c) => c.total >= 20000).sort((a, b) => b.total - a.total).slice(0, 4);
  if (top.length) console.log(`     culprits: ${top.map((c) =>
    `${c.label} ${ms(c.total)}${c.forced >= 10000 ? ` (forced ${ms(c.forced)})` : ''}`).join(' · ')}`);
  if (!bd.longTasks.length) { console.log('     long tasks ≥50ms: none'); return; }
  const longest = bd.longTasks.reduce((a, t) => (t.dur > a.dur ? t : a));
  const blocking = bd.longTasks.reduce((a, t) => a + t.dur - 50000, 0);
  const dom = longest.top ? ` — ${longest.top.name} ${ms(longest.top.dur)}${longest.top.label ? ' ← ' + longest.top.label : ''}` : '';
  console.log(`     long tasks ≥50ms: ${bd.longTasks.length} · longest ${ms(longest.dur)} @${s(longest.at / 1000)}${dom} · est. blocking ${ms(blocking)}`);
}

// ---- on-page monitor report (--monitor) ----
// Surfaces the monitor's problem lines (CLS + shift sources, LoAF long tasks
// with script/forced-layout attribution, reflow hotspots) and drops its
// registration chatter (OBSERVE/LISTEN/ACTIVITY).
function printMonitor(m) {
  if (!m) { console.log('     monitor: no data (injection failed?)'); return; }
  const fps = m.fpsMin != null ? ` · FPS min ${m.fpsMin}` : '';
  console.log(`     monitor: CLS ${m.cls.toFixed(4)} · DOM ${m.dom}${fps}`);
  const KEEP = /^(CLS|LONG TASK|REFLOWS|SLOW INPUT|FPS DROP)/;
  let keepDetail = false;
  for (const raw of m.lines) {
    const body = raw.replace(/^\+[\d.]+s\s+/, '');
    if (KEEP.test(body)) { console.log('       ' + raw); keepDetail = /^(CLS|REFLOWS)/.test(body); }
    else if (keepDetail && /^\s*→/.test(body)) console.log('       ' + raw);
    else keepDetail = false;
  }
}

// ---- one cold measurement ----
async function measure(pageUrl) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 915, isMobile: true, hasTouch: true, deviceScaleFactor: 2.6 });
    await page.setUserAgent('Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36');
    const cdp = await page.createCDPSession();
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    if (THROTTLE) {
      await cdp.send('Network.emulateNetworkConditions', {
        offline: false, latency: 150,
        downloadThroughput: 1.6 * 1024 * 1024 / 8,
        uploadThroughput: 750 * 1024 / 8,
      });
    }
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: THROTTLE ? CPU : 1 });

    if (MONITOR) await page.evaluateOnNewDocument(MONITOR_SRC);
    await page.evaluateOnNewDocument(() => {
      window.__lcp = [];
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) window.__lcp.push({
          t: e.startTime,
          tag: e.element ? e.element.tagName : null,
          cls: e.element ? (e.element.className || '').toString().slice(0, 50) : null,
          url: e.url ? e.url.split('/').pop() : null,
        });
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      window.__fcp = null;
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') window.__fcp = e.startTime;
      }).observe({ type: 'paint', buffered: true });
      window.__revealed = null;
      new MutationObserver((m, o) => {
        if (document.documentElement && document.documentElement.hasAttribute('data-nds-loaded')) {
          window.__revealed = performance.now(); o.disconnect();
        }
      }).observe(document, { attributes: true, attributeFilter: ['data-nds-loaded'], subtree: true });
    });

    if (TRACE) await page.tracing.start({
      categories: ['-*', 'devtools.timeline', 'disabled-by-default-devtools.timeline', 'toplevel', 'v8.execute', 'blink.user_timing'],
    });
    const resp = await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 120000 });
    if (resp && resp.status() !== 200) throw new Error(`HTTP ${resp.status()} for ${pageUrl} — check the page path`);
    await new Promise((r) => setTimeout(r, 1800)); // let LCP settle past late images

    let breakdown = null;
    if (TRACE) {
      const buf = await page.tracing.stop(); // Uint8Array in puppeteer ≥22
      if (buf) breakdown = mainThreadBreakdown(JSON.parse(new TextDecoder().decode(buf)));
    }
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const last = window.__lcp[window.__lcp.length - 1] || null;
      return {
        fcp: window.__fcp, lcp: last ? last.t : null,
        tag: last && last.tag ? last.tag.toLowerCase() : null,
        cls: last ? last.cls : null, imgUrl: last ? last.url : null,
        revealed: window.__revealed, ttfb: nav ? nav.responseStart : null,
      };
    });
    const monitor = MONITOR
      ? await page.evaluate(() => (window.__ndsPerf && window.__ndsPerf.data) ? window.__ndsPerf.data() : null)
      : null;
    return { ...metrics, breakdown, monitor };
  } finally {
    await browser.close();
  }
}

// ---- run ----
const s = (v) => (v == null ? '?' : (v / 1000).toFixed(2) + 's');
const srv = HAS_LOCAL ? await startServer({ dir: DIR, baseurl: BASEURL }) : null;
const base = srv ? `http://localhost:${srv.port}${srv.baseurl}/` : null;
console.log(`mode: ${THROTTLE ? `slow-4G + ${CPU}× CPU` : 'UNTHROTTLED'} | ${HAS_LOCAL ? `dir: ${DIR}` : 'remote'} | runs: ${RUNS}\n`);
try {
  for (const pg of PAGES) {
    const target = pg.remote || base + pg.local;
    console.log(`=== ${target}`);
    const lcps = [];
    for (let i = 0; i < RUNS; i++) {
      const d = await measure(target);
      lcps.push(d.lcp);
      const el = d.tag ? `<${d.tag}>${d.imgUrl ? ' ' + d.imgUrl : d.cls ? ' .' + d.cls.split(' ')[0] : ''}` : '?';
      console.log(`  run ${i + 1}: ttfb ${s(d.ttfb)} | FCP ${s(d.fcp)} | reveal ${s(d.revealed)} | LCP ${s(d.lcp)} ${el}`);
      if (TRACE) printBreakdown(d.breakdown);
      if (MONITOR) printMonitor(d.monitor);
    }
    const ok = lcps.filter(Number.isFinite).sort((a, b) => a - b);
    console.log(`  median LCP: ${s(ok[Math.floor(ok.length / 2)])}\n`);
  }
} finally {
  if (srv) srv.server.close();
}
