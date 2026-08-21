// Encode an image master to WebP at one or more widths, picking the lowest quality
// that still clears a PSNR floor against the master. Chrome does the encoding, so
// there is no image dependency to install.
//
//   node scripts/encode-webp.mjs <master> [--widths 1920,1280,768] [--psnr 42] [--suffix _md,_sm]
//   node scripts/encode-webp.mjs <master> --widths 2170,1646,768 --quality 0.8
//   node scripts/encode-webp.mjs <master> --boxes 2170x725,1646x550,645x725 --quality 0.8
//
// --boxes centre-crops to each WxH the way object-fit: cover does, then scales to it.
// Use it when the element shows a fixed band rather than the whole frame — a hero strip
// displays under half the height of a 3:2 photo, so encoding the full frame doubles the
// bytes for pixels nobody sees.
//
// --psnr sweeps quality per width until the floor is cleared. Use it to FIND a quality
// on one width; then pin that quality across the set with --quality. Per-width sweeping
// inverts the size ladder — a smaller width often needs a higher quality to clear the
// same floor, so the md file lands as large as the full one.
//
// Always encode from the MASTER, never from an already-lossy export — re-encoding
// compounds artefacts, and a smaller file out of a lossy input is damage, not a win.
// Output lands beside the master: name.webp, name_md.webp, name_sm.webp.
import puppeteer from 'puppeteer-core';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join } from 'node:path';

const args = process.argv.slice(2);
const master = args[0];
const flag = (name, fallback) => {
    const i = args.indexOf(`--${name}`);
    return i === -1 ? fallback : args[i + 1];
};
if (!master || !existsSync(master)) {
    console.error('usage: node scripts/encode-webp.mjs <master> [--widths 1920,1280,768] [--psnr 42]');
    process.exit(2);
}

const widths = flag('widths', '1920,1280,768').split(',').map(Number);
const boxes = flag('boxes', null);
const psnrFloor = Number(flag('psnr', 42));
const fixedQ = flag('quality', null) === null ? null : Number(flag('quality'));
const suffixes = flag('suffix', '_md,_sm').split(',');
const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const b64 = readFileSync(master).toString('base64');
const mime = extname(master).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg';

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();

const targets = boxes
    ? boxes.split(',').map((b) => { const [w, h] = b.split('x').map(Number); return { w, h }; })
    : widths.map((w) => ({ w, h: null }));

const results = await page.evaluate(
    async (dataUrl, targets, psnrFloor, fixedQ) => {
        const img = new Image();
        img.src = dataUrl;
        await img.decode();

        // h null keeps the frame's own ratio; a given h centre-crops to it, matching
        // what object-fit: cover paints, so no encoded pixel is thrown away at render.
        const draw = ({ w, h }) => {
            const out = h || Math.round((img.naturalHeight / img.naturalWidth) * w);
            const c = new OffscreenCanvas(w, out);
            const scale = Math.max(w / img.naturalWidth, out / img.naturalHeight);
            const sw = w / scale;
            const sh = out / scale;
            c.getContext('2d', { alpha: false }).drawImage(
                img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 0, 0, w, out);
            return c;
        };

        // PSNR against the master scaled to the SAME width — this measures the codec's
        // loss, not the loss from downscaling, which is intended.
        const psnr = async (reference, blob) => {
            const enc = await createImageBitmap(blob);
            const c = new OffscreenCanvas(reference.width, reference.height);
            c.getContext('2d', { alpha: false }).drawImage(enc, 0, 0);
            const a = reference.getContext('2d').getImageData(0, 0, reference.width, reference.height).data;
            const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
            let sum = 0;
            for (let i = 0; i < a.length; i += 4) {
                for (let k = 0; k < 3; k++) { const e = a[i + k] - d[i + k]; sum += e * e; }
            }
            const mse = sum / ((a.length / 4) * 3);
            return mse === 0 ? Infinity : 10 * Math.log10(255 * 255 / mse);
        };

        const out = [];
        for (const t of targets) {
            const ref = draw(t);
            const w = t.w;
            let picked = null;
            // Climb until the floor is cleared, so every output is the smallest file
            // that still meets the same quality bar.
            for (const q of fixedQ !== null ? [fixedQ] : [0.7, 0.75, 0.8, 0.85, 0.9, 0.95]) {
                const blob = await ref.convertToBlob({ type: 'image/webp', quality: q });
                const score = await psnr(ref, blob);
                if (fixedQ !== null || score >= psnrFloor || q === 0.95) {
                    const buf = new Uint8Array(await blob.arrayBuffer());
                    picked = { w, h: ref.height, q, psnr: +score.toFixed(2), bytes: buf.length, data: [...buf] };
                    break;
                }
            }
            out.push(picked);
        }
        return { natural: [img.naturalWidth, img.naturalHeight], out };
    },
    `data:${mime};base64,${b64}`,
    targets,
    psnrFloor,
    fixedQ
);

await browser.close();

const stem = basename(master, extname(master));
const dir = dirname(master);
const srcKB = readFileSync(master).length / 1024;
console.log(`${basename(master)}  ${results.natural.join('x')}  ${Math.round(srcKB)}KB`);

results.out.forEach((r, i) => {
    const name = `${stem}${i === 0 ? '' : suffixes[i - 1] || `_${r.w}`}.webp`;
    writeFileSync(join(dir, name), Buffer.from(r.data));
    const pct = Math.round((1 - r.bytes / 1024 / srcKB) * 100);
    console.log(`  ${name.padEnd(26)} ${String(r.w).padStart(4)}x${String(r.h).padEnd(4)}  q=${r.q}  PSNR ${r.psnr}dB  ${String(Math.round(r.bytes / 1024)).padStart(4)}KB  (-${pct}%)`);
});
