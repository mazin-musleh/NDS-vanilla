// Calibrated real-INP measurement for NDS components — the interaction sibling
// of measure-lcp.mjs. Loads a page, lets it settle, clicks the selectors you
// name, and reports each interaction's INP with its input-delay / processing /
// presentation split, then breaks the interaction's own animation frames into
// main-thread / style+layout / paint→presentation with per-script attribution.
// Same calibration as measure-lcp.mjs (see its header).
//
// USAGE (run from the project root so puppeteer-core resolves):
//   node .claude/skills/nds-perf/measure-inp.mjs --url=http://localhost:4002/NDS-vanilla/ --click="button.nds-nav-link[aria-expanded]"
//   node .claude/skills/nds-perf/measure-inp.mjs --url=https://example.gov.sa/ --click=".a" --click=".b" --cpu=20
//
// FLAGS: --url=URL (required; local dev server or remote) · --click=SEL (repeatable,
//        in order) · --runs=N (default 3) · --cpu=N (default 6.6; 20 ≈ low-end phone) ·
//        --settle=MS (default 4000) · --wait=MS after each click (default 2500) ·
//        --no-throttle · --reduced (emulate prefers-reduced-motion) ·
//        --block=PATTERN (repeatable, e.g. *clarity* — isolates third-party cost) ·
//        --headed (real window; headless presentation timing is not always faithful) ·
//        --chrome=PATH (else auto-detect)
//
// TWO GOTCHAS, both of which produced a wrong answer before this script existed:
// 1. Never use page.setRequestInterception() here. It silently suppresses every
//    event-timing entry — interactionCount reads 0 and the run looks like a fast
//    page instead of a broken rig. Use Network.setBlockedURLs for --block, and
//    trust the interactionCount guard below.
// 2. Never time anything with Performance.getMetrics duration counters
//    (RecalcStyleDuration, TaskDuration…). Under CPU throttling they do not line
//    up with wall clock — they once reported 2,900ms of task time inside a 1.1s
//    window, and 1,900ms of style recalc that the frame timestamps put at 0.7ms.
//    Long-animation-frame timestamps are the wall-clock truth; this script uses
//    those, and reports only what a frame's own start/render/paint/present say.
import fs from 'fs';
import puppeteer from 'puppeteer-core';

const args = process.argv.slice(2);
const flag = (name, def) => {
  const hit = args.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return def;
  return hit.includes('=') ? hit.split('=').slice(1).join('=') : true;
};
const flags = (name) => args.filter((a) => a.startsWith(`--${name}=`)).map((a) => a.split('=').slice(1).join('='));

const URL = flag('url', null);
const CLICKS = flags('click');
const RUNS = +flag('runs', 3);
const CPU = +flag('cpu', 6.6);
const THROTTLE = !flag('no-throttle', false);
const SETTLE = +flag('settle', 4000);
const WAIT = +flag('wait', 2500);
const REDUCED = !!flag('reduced', false);
const HEADED = !!flag('headed', false);
const BLOCK = flags('block');

if (!URL || !CLICKS.length) {
  console.error('Usage: --url=URL --click=SELECTOR [--click=SELECTOR …]  (see header for all flags)');
  process.exit(1);
}

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

const OBS = () => {
  window.__e = [];
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) {
      if (!e.interactionId) continue;
      window.__e.push({
        iid: e.interactionId, start: e.startTime, dur: e.duration,
        delay: Math.round(e.processingStart - e.startTime),
        proc: Math.round(e.processingEnd - e.processingStart),
        present: Math.round(e.startTime + e.duration - e.processingEnd),
      });
    }
  }).observe({ type: 'event', durationThreshold: 16, buffered: true });

  window.__loaf = [];
  new PerformanceObserver((l) => {
    for (const e of l.getEntries()) {
      const j = e.toJSON();
      window.__loaf.push({
        start: j.startTime, dur: j.duration,
        styleStart: j.styleAndLayoutStart || 0,
        renderStart: j.renderStart || 0,
        paint: j.paintTime || 0,
        present: j.presentationTime || 0,
        blocking: j.blockingDuration,
        scripts: (e.scripts || []).map((s) => ({
          dur: Math.round(s.duration),
          forced: Math.round(s.forcedStyleAndLayoutDuration || 0),
          src: (s.sourceURL || '').split('/').pop().slice(0, 40) || '(inline)',
          fn: s.sourceFunctionName || '(anon)',
          type: s.invokerType || '', invoker: s.invoker || '',
        })),
      });
    }
  }).observe({ type: 'long-animation-frame', buffered: true });

  // Keep the page alive across a multi-step run: the component's own handlers
  // still fire, only the navigation is cancelled.
  document.addEventListener('click', (ev) => { if (ev.target.closest('a[href]')) ev.preventDefault(); });
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  // pipe, not a port: Chrome 151 fails the port handshake when an instance is already running (see svg-render-diff.mjs).
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: HEADED ? false : 'new', pipe: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 915, isMobile: true, hasTouch: true, deviceScaleFactor: 2.6 });
    await page.setUserAgent('Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36');
    const cdp = await page.createCDPSession();
    await cdp.send('Network.enable');
    if (BLOCK.length) await cdp.send('Network.setBlockedURLs', { urls: BLOCK });
    if (THROTTLE) {
      await cdp.send('Network.emulateNetworkConditions', {
        offline: false, latency: 150,
        downloadThroughput: 1.6 * 1024 * 1024 / 8,
        uploadThroughput: 750 * 1024 / 8,
      });
    }
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: THROTTLE ? CPU : 1 });
    if (REDUCED) await cdp.send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
    });
    await page.evaluateOnNewDocument(OBS);

    await page.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 });
    await sleep(SETTLE); // don't charge leftover load work to the first click

    const steps = [];
    for (const sel of CLICKS) {
      const el = await page.$(sel);
      if (!el) { steps.push({ sel, missing: true }); continue; }
      const from = await page.evaluate(() => performance.now());
      await el.click();
      await sleep(WAIT);
      steps.push({ sel, from, to: await page.evaluate(() => performance.now()) });
    }
    const { e, loaf, count } = await page.evaluate(() => ({ e: window.__e, loaf: window.__loaf, count: performance.interactionCount }));
    return { e, loaf, count, steps };
  } finally {
    await browser.close();
  }
}

// One interaction = one interactionId; its INP contribution is its longest event.
const worst = (e, from, to) => {
  const by = new Map();
  for (const x of e) {
    if (x.start < from || x.start >= to) continue;
    const g = by.get(x.iid);
    if (!g || x.dur > g.dur) by.set(x.iid, x);
  }
  return [...by.values()].sort((a, b) => b.dur - a.dur)[0] || null;
};
const med = (a) => (a.length ? a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)] : null);
const ms = (n) => `${n.toFixed(1)}ms`;

const rows = [];
for (let i = 0; i < RUNS; i++) {
  try { rows.push(await run()); } catch (err) { console.log(`run ${i + 1} FAILED: ${err.message}`); }
}
if (!rows.length) process.exit(1);

// The rig-is-lying guard: real clicks always bump interactionCount.
const dead = rows.filter((r) => r.count === 0).length;
if (dead) console.log(`\n!! ${dead}/${rows.length} run(s) recorded interactionCount=0 — the clicks never registered as interactions. Numbers below are NOT trustworthy.\n`);

console.log(`\n${URL}   CPU ${THROTTLE ? `${CPU}x` : 'unthrottled'}${REDUCED ? ' + reduced-motion' : ''}${HEADED ? ' + headed' : ''}${BLOCK.length ? `  blocked: ${BLOCK.join(' ')}` : ''}   ${rows.length} runs`);

CLICKS.forEach((sel, i) => {
  const per = rows.map((r) => {
    const s = r.steps[i];
    if (!s || s.missing) return null;
    const inp = worst(r.e, s.from, s.to);
    return inp ? { inp, loaf: r.loaf.filter((f) => f.start >= s.from && f.start < s.to) } : null;
  }).filter(Boolean);
  console.log(`\n  ${sel}`);
  if (!per.length) { console.log('    NOT FOUND, or no interaction recorded'); return; }
  const inps = per.map((p) => Math.round(p.inp.dur));
  console.log(`    INP  median ${med(inps)}ms   runs [${inps.join(', ')}]`);
  const w = per[0].inp;
  console.log(`    input delay ${w.delay} / processing ${w.proc} / presentation ${w.present}   (first run)`);

  // Frames of the first run, split by their own timestamps. A frame that starts
  // after the interaction ends cost this tap nothing — it would hurt the next one.
  const end = w.start + w.dur;
  per[0].loaf.forEach((f) => {
    const inside = f.start < end;
    console.log(`    ${inside ? '>> inside INP' : '   after INP '}  frame ${ms(f.dur)}  blocking ${ms(f.blocking)}`);
    if (f.renderStart) console.log(`         main thread before render ${ms(f.renderStart - f.start)}  (scripts ${ms(f.scripts.reduce((s, x) => s + x.dur, 0))})`);
    if (f.styleStart && f.paint) console.log(`         style + layout            ${ms(f.paint - f.styleStart)}`);
    if (f.paint && f.present) console.log(`         paint -> presentation     ${ms(f.present - f.paint)}`);
    f.scripts.sort((a, b) => b.dur - a.dur).slice(0, 3).forEach((s) =>
      console.log(`         ${String(s.dur).padStart(5)}ms${s.forced ? ` forced ${s.forced}ms` : ''}  ${s.src} · ${s.fn} · ${s.type}${s.invoker ? ` · ${s.invoker}` : ''}`));
  });
});
