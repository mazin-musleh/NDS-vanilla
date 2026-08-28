#!/usr/bin/env node
// Prove (or disprove) that an optimized SVG still RENDERS the same, by rasterizing
// both copies in Chrome and diffing pixels. Byte-level checks can't answer this —
// SVGO rewrites the file completely even when the drawing is identical.
//
//   node scripts/svg-render-diff.mjs assets/img/favicon.svg assets/icon/SAflag.min.svg
//   node scripts/svg-render-diff.mjs assets            # every .svg under a directory
//
// "before" is read from tmp/asset-backups/<same path> (where optimize-assets.py puts
// it). Output goes to tmp/svg-render-diff/.
//
// Two metrics, because neither is sufficient alone:
//
//   solid — the diff mask eroded by 1px. Anti-aliasing always moves edge pixels, and
//           hairline outlines vanish under erosion; a shifted shape or dropped
//           element survives. But a large SOFT gradient also survives at very low
//           delta, which reads as a scary number for a harmless change.
//   drift — mean colour change over the inked area. This is what separated the two
//           real cases: a broken logo drifted 42 (ink went [48,136,179] ->
//           [90,156,192]), while every harmless gradient re-render drifted under 1.
//
// So: solid 0 => clean. solid > 0 with drift < 2 => faint gradient noise, fine.
// solid > 0 with drift >= 2 => inspect the PNGs it writes.

import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, '$1'), '..');
const BACKUPS = path.join(ROOT, 'tmp', 'asset-backups');
const OUTDIR = path.join(ROOT, 'tmp', 'svg-render-diff');
const SIZES = [64, 256, 1024];   // small (real UI use) → large (exaggerates geometry error)
const THRESH = 8;                // per-channel delta below this is invisible dithering

function findChrome() {
  const cands = [process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'].filter(Boolean);
  const hit = cands.find(p => { try { return fs.existsSync(p); } catch { return false; } });
  if (!hit) { console.error('Chrome not found. Set CHROME_PATH.'); process.exit(1); }
  return hit;
}

function collect(targets) {
  const out = [];
  for (const t of targets) {
    const abs = path.isAbsolute(t) ? t : path.join(ROOT, t);
    if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) {
      const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
        const p = path.join(d, e.name);
        if (e.isDirectory()) { if (e.name !== 'tmp') walk(p); }
        else if (e.name.toLowerCase().endsWith('.svg')) out.push(p);
      });
      walk(abs);
    } else out.push(abs);
  }
  return out;
}

// Render one SVG at a fixed box on white, return raw RGBA.
async function shot(page, file, size) {
  const svg = fs.readFileSync(file, 'utf8');
  const html = `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;background:#fff}
    #b{width:${size}px;height:${size}px;display:grid;place-items:center;overflow:hidden}
    /* width/height, not max-*: an SVG with intrinsic dimensions would otherwise
       render at its native size in every box, so the large runs would test nothing. */
    #b svg,#b img{width:100%;height:100%;display:block}
  </style><div id="b">${svg}</div>`;
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  const buf = await page.screenshot({ clip: { x: 0, y: 0, width: size, height: size } });
  return buf;
}

// PNG -> RGBA via the browser itself (no image library needed).
async function decode(page, buf, size) {
  return page.evaluate(async (b64, s) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const c = new OffscreenCanvas(s, s);
    const x = c.getContext('2d');
    x.drawImage(img, 0, 0);
    return Array.from(x.getImageData(0, 0, s, s).data);
  }, buf.toString('base64'), size);
}

function compare(a, b, size) {
  const total = size * size;
  const mask = new Uint8Array(total);
  let differing = 0, maxDelta = 0;
  // Mean colour over pixels the ORIGINAL inked — a shape that vanished or a fill that
  // changed moves this; anti-aliasing does not.
  let ink = 0; const sa = [0, 0, 0], sb = [0, 0, 0];
  for (let i = 0; i < total; i++) {
    const o = i * 4;
    const d = Math.max(Math.abs(a[o] - b[o]), Math.abs(a[o + 1] - b[o + 1]),
                       Math.abs(a[o + 2] - b[o + 2]), Math.abs(a[o + 3] - b[o + 3]));
    if (d > maxDelta) maxDelta = d;
    if (d > THRESH) { mask[i] = 1; differing++; }
    if (a[o] !== 255 || a[o + 1] !== 255 || a[o + 2] !== 255) {
      ink++;
      for (let k = 0; k < 3; k++) { sa[k] += a[o + k]; sb[k] += b[o + k]; }
    }
  }
  const drift = ink ? Math.max(...sa.map((v, k) => Math.abs(v - sb[k]) / ink)) : 0;
  // Erode by 1px: a pixel survives only if all 8 neighbours also differ. Hairline
  // AA outlines are 1px wide and disappear; filled/shifted regions survive.
  let solid = 0;
  for (let y = 1; y < size - 1; y++) {
    for (let x = 1; x < size - 1; x++) {
      if (!mask[y * size + x]) continue;
      let all = true;
      for (let dy = -1; dy <= 1 && all; dy++)
        for (let dx = -1; dx <= 1; dx++)
          if (!mask[(y + dy) * size + (x + dx)]) { all = false; break; }
      if (all) solid++;
    }
  }
  return { differing, solid, total, maxDelta, drift };
}

const args = process.argv.slice(2);
if (!args.length) { console.error('usage: svg-render-diff.mjs <file|dir>...'); process.exit(1); }

fs.mkdirSync(OUTDIR, { recursive: true });
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: 'new' });
const page = await browser.newPage();

console.log(`threshold: per-channel delta > ${THRESH}; "solid" = diff mask eroded 1px\n`);
console.log('file'.padEnd(24) + 'size'.padStart(6) + 'changed px'.padStart(12)
          + 'solid'.padStart(8) + 'maxΔ'.padStart(7) + 'drift'.padStart(8) + '   verdict');
console.log('-'.repeat(76));

let worst = 0;
for (const after of collect(args)) {
  const rel = path.relative(ROOT, after).replace(/\\/g, '/');
  const before = path.join(BACKUPS, path.relative(ROOT, after));
  if (!fs.existsSync(before)) { console.log(`${path.basename(after).padEnd(24)}   (no backup — skipped)`); continue; }

  for (const size of SIZES) {
    const [ba, bb] = [await shot(page, before, size), await shot(page, after, size)];
    const [pa, pb] = [await decode(page, ba, size), await decode(page, bb, size)];
    const r = compare(pa, pb, size);
    const pct = (r.differing / r.total) * 100;
    const bad = r.solid > 0 && r.drift >= 2;
    const verdict = r.solid === 0
      ? (r.differing === 0 ? 'IDENTICAL' : 'edge-only (anti-aliasing)')
      : bad ? `DAMAGED — ${r.solid} px, ink shifted` : 'faint gradient noise (drift < 2)';
    if (bad) worst++;
    console.log(path.basename(after).padEnd(24) + String(size).padStart(6)
      + `${r.differing} (${pct.toFixed(2)}%)`.padStart(12)
      + String(r.solid).padStart(8) + String(r.maxDelta).padStart(7)
      + r.drift.toFixed(2).padStart(8) + '   ' + verdict);
    if (bad) {
      fs.writeFileSync(path.join(OUTDIR, `${path.basename(after, '.svg')}-${size}-before.png`), ba);
      fs.writeFileSync(path.join(OUTDIR, `${path.basename(after, '.svg')}-${size}-after.png`), bb);
    }
  }
}

await browser.close();
console.log('-'.repeat(76));
console.log(worst === 0
  ? 'No damage: differences are edge anti-aliasing or sub-1 colour drift.'
  : `DAMAGE FOUND in ${worst} run(s); PNGs written to ${path.relative(ROOT, OUTDIR)}`);
process.exit(worst === 0 ? 0 : 1);
