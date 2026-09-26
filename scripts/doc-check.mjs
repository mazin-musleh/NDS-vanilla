// Browser check for one-source doc pages: clicks every builder option, checks each state with
// code, and writes one contact sheet per theme (every option's preview in one image).
//
//   node scripts/doc-check.mjs components/button.md [layout/grid.md …]
//   --no-build   reuse the last build in tmp/doc-check/site
//   --mobile     375px wide instead of 1280px
//   --css="rule"  add a style rule to the page, to try a fix or to prove a check fires
//
// Output: text findings, and tmp/doc-check/<page>-light.png / -dark.png.
// Checks per state: console errors, an empty preview, a small component (button, chip, tag)
// stretched to the full preview width, and a disabled control whose icon and label differ in
// color. ponytail: the stretch and color checks are heuristics; widen them when a real bug slips by.
// ponytail: an overlay (dropmenu, modal, drawer, tooltip) is shot closed. Open its trigger and
// shoot the overlay too when the first overlay page is converted.
import { execSync } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { launch } from './lib/browser.mjs';

const ROOT = join(import.meta.dirname, '..');
const OUT = join(ROOT, 'tmp', 'doc-check');
const SITE = join(OUT, 'site');
const args = process.argv.slice(2);
const pages = args.filter((a) => !a.startsWith('--'));
const WIDTH = args.includes('--mobile') ? 375 : 1280;
const CSS = (args.find((a) => a.startsWith('--css=')) || '').slice(6);
if (!pages.length) { console.error('usage: node scripts/doc-check.mjs <page.md> […] [--no-build] [--mobile]'); process.exit(1); }

if (!args.includes('--no-build')) {
    console.log('building…');
    execSync(`bundle exec jekyll build -q -d "${join(SITE, 'NDS-vanilla')}"`, { cwd: ROOT, stdio: 'inherit', shell: true });
}

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json', '.jpg': 'image/jpeg' };
const server = createServer((req, res) => {
    let p = join(SITE, decodeURIComponent(req.url.split('?')[0]));
    try { if (statSync(p).isDirectory()) p = join(p, 'index.html'); res.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream' }); res.end(readFileSync(p)); }
    catch { res.writeHead(404); res.end(); }
}).listen(0);
const BASE = `http://127.0.0.1:${server.address().port}/NDS-vanilla/`;
mkdirSync(OUT, { recursive: true });

const browser = await launch();
let failed = 0;

for (const md of pages) {
    const url = BASE + md.replace(/\\/g, '/').replace(/\.md$/, '.html');
    for (const theme of ['light', 'dark']) {
        const page = await browser.newPage({ viewport: { width: WIDTH, height: 1400 }, deviceScaleFactor: 2 });
        const errors = [];
        page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
        page.on('pageerror', (e) => errors.push(e.message));
        if (theme === 'dark') await page.addInitScript(() => localStorage.setItem('nds-theme', 'dark'));
        await page.goto(url, { waitUntil: 'load' });
        await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'));
        await page.waitForTimeout(600);
        // content-visibility skips painting off screen: keep every section painted.
        await page.addStyleTag({ content: '*{content-visibility:visible!important}' + CSS });

        const shots = [];
        const report = (msg) => { failed++; console.log(`FAIL ${md} [${theme}] ${msg}`); };
        const builders = await page.$$eval('[data-builder-for]', (els) => els.map((e) => e.getAttribute('data-builder-for')));

        for (const id of builders) {
            // The builder wires itself on the first Options click, as a person opens it.
            await page.click(`[data-builder-for="${id}"] [data-panel-toggle]`);
            await page.waitForTimeout(500);
            const sheet = `#${id}-options`;
            const options = await page.$$eval(`${sheet} [data-builder-option]`, (els) => els.map((e) => e.getAttribute('data-builder-option')));
            const structures = options.filter((o) => /^(Structure|Example)\|/.test(o));
            const tap = (key) => page.$eval(`${sheet} [data-builder-option="${key.replace(/"/g, '\\"')}"]`, (e) => e.click()).then(() => page.waitForTimeout(250));
            const enabled = (key) => page.$eval(`${sheet} [data-builder-option="${key.replace(/"/g, '\\"')}"]`, (e) => !e.disabled);
            const reset = async () => { await page.$eval(`${sheet} [data-builder-reset]`, (e) => { if (!e.disabled) e.click(); }); await page.waitForTimeout(250); };

            // The states: the default, each structure, then each other option on the first
            // structure that enables it.
            const states = [{ name: 'default', steps: [] }];
            const clean = (k) => k.split('|')[1].replace(/\s*\((demo|hint):[^)]*\)/g, '');
            structures.slice(1).forEach((s) => states.push({ name: clean(s), steps: [s] }));
            // A (default) option looks the same as the default state.
            for (const o of options.filter((x) => !structures.includes(x) && !/\(default\)/.test(x))) {
                await reset();
                let steps = null;
                if (await enabled(o)) steps = [o];
                else for (const s of structures) { await tap(s); if (await enabled(o)) { steps = [s, o]; break; } }
                if (steps) states.push({ name: steps.map(clean).join(' + '), steps });
            }
            // Disabled with each other option too (checks only, no shot): a disabled bug often
            // shows only with a part the plain state lacks, such as an icon.
            const singles = states.slice(1);
            for (const d of singles.filter((x) => /disabled/i.test(x.steps[x.steps.length - 1]))) {
                const dKey = d.steps[d.steps.length - 1];
                for (const o of singles.filter((x) => x !== d && !/disabled/i.test(x.name))) {
                    states.push({ name: `${o.name} + ${d.name.split(' + ').pop()}`, steps: [...o.steps, dKey], checkOnly: true });
                }
            }

            for (const st of states) {
                await reset();
                for (const k of st.steps) await tap(k);
                const before = errors.length;
                const r = await page.evaluate((id) => {
                    const script = document.getElementById(id);
                    const live = script.getAttribute('data-live');
                    const box = live ? document.querySelector(live) : script.nextElementSibling.nextElementSibling;
                    const issues = [];
                    if (!box || !box.offsetHeight) issues.push('empty preview');
                    const inner = box && box.querySelector('[data-demo-slot]') || box;
                    if (box && !live) {
                        const w = inner.clientWidth;
                        inner.querySelectorAll('.nds-btn, .nds-chip, .nds-tag').forEach((el) => {
                            // Full width by design: a vertical scroll-more's show-more button.
                            if (el.closest('.nds-full, .nds-dropmenu-menu, .nds-card-actions, .nds-grid, [data-axis="vertical"] > .nds-show-more') || !el.offsetWidth) return;
                            if (el.offsetWidth > w * 0.9) issues.push(`stretched: ${el.className}`);
                        });
                    }
                    (box || document).querySelectorAll(':disabled, [data-state~="disabled"], [aria-disabled="true"]').forEach((el) => {
                        const label = el.querySelector('.nds-label'), icon = el.querySelector('i, .nds-icon');
                        if (!label || !icon) return;
                        const a = getComputedStyle(label).color, b = getComputedStyle(icon).color;
                        if (a !== b) issues.push(`disabled icon ${b} vs label ${a}: ${el.className}`);
                    });
                    return { issues, rect: box ? box.getBoundingClientRect().toJSON() : null };
                }, id);
                for (const i of r.issues) report(`${st.name}: ${i}`);
                for (const e of errors.slice(before)) report(`${st.name}: console: ${e}`);
                if (r.rect && r.rect.height && !st.checkOnly) {
                    // Crop to the content, so a small part is not lost in a wide card. Measured and
                    // shot on screen: a full-page shot resizes the page and moves the layout.
                    const measure = () => page.evaluate((id) => {
                        const s = document.getElementById(id), live = s.getAttribute('data-live');
                        const box = live ? document.querySelector(live) : s.nextElementSibling.nextElementSibling;
                        box.scrollIntoView({ block: 'center' });
                        // The options sheet covers the lower screen: hide it for the shot.
                        document.getElementById(id + '-options').style.visibility = 'hidden';
                        const b = box.getBoundingClientRect();
                        if (live) return { x: b.x, y: b.y, width: b.width, height: b.height };
                        let x1 = Infinity, y1 = Infinity, x2 = -Infinity, y2 = -Infinity;
                        // Text by its own box (a block label is full width); a parent only when
                        // it is inline-level or narrower than the preview (a flex parent blockifies
                        // a tag or a chip), so its drawn icon or dot stays.
                        const rects = [];
                        box.querySelectorAll('*').forEach((e) => {
                            if (e.children.length) return;
                            if (e.textContent.trim()) {
                                const g = document.createRange(); g.selectNodeContents(e); rects.push(g.getBoundingClientRect());
                                // A leaf's own box holds its ::before/::after (a link's icon), unless it is a full-width block.
                                if (getComputedStyle(e).display.startsWith('inline') || e.offsetWidth < b.width * 0.9) rects.push(e.getBoundingClientRect());
                            }
                            else rects.push(e.getBoundingClientRect());
                            const p = e.parentElement;
                            if (p !== box && (getComputedStyle(p).display.startsWith('inline') || p.offsetWidth < b.width * 0.9)) rects.push(p.getBoundingClientRect());
                        });
                        rects.forEach((r) => {
                            if (!r.width || !r.height) return;
                            x1 = Math.min(x1, r.left); y1 = Math.min(y1, r.top); x2 = Math.max(x2, r.right); y2 = Math.max(y2, r.bottom);
                        });
                        if (x1 === Infinity) return { x: b.x, y: b.y, width: b.width, height: b.height };
                        const pad = 16;
                        x1 = Math.max(b.left, x1 - pad); y1 = Math.max(b.top, y1 - pad); x2 = Math.min(b.right, x2 + pad); y2 = Math.min(b.bottom, y2 + pad);
                        return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
                    }, id);
                    let clip = await measure();
                    const vh = page.viewportSize().height;
                    // Taller than the screen: grow the window for this shot only.
                    if (clip.height > vh - 200) { await page.setViewportSize({ width: WIDTH, height: Math.ceil(clip.height) + 400 }); await page.waitForTimeout(200); clip = await measure(); }
                    // h: the height the shot takes in a 380px sheet column.
                    shots.push({ name: st.name, png: (await page.screenshot({ clip })).toString('base64'), h: 40 + clip.height * 2 * Math.min(1, 380 / (clip.width * 2)) });
                    if (page.viewportSize().height !== vh) await page.setViewportSize({ width: WIDTH, height: vh });
                    await page.evaluate((id) => { document.getElementById(id + '-options').style.visibility = ''; }, id);
                }
            }
            await reset();
            await page.$eval(`${sheet} [data-panel-close]`, (e) => e.click()).catch(() => {});
        }
        for (const e of errors.filter(() => !builders.length)) report(`console: ${e}`);

        // Every state's preview, labeled, in columns: a tall shot keeps its size and takes more
        // height. A long run splits into several sheets, so each image stays readable.
        const H = 4800;
        const groups = [[]];
        let used = 0;
        for (const s of shots) {
            if (used + s.h > H && groups[groups.length - 1].length) { groups.push([]); used = 0; }
            groups[groups.length - 1].push(s);
            used += s.h;
        }
        const base = join(OUT, md.replace(/[\\/]/g, '-').replace(/\.md$/, ''));
        for (const [i, g] of groups.entries()) {
            if (!g.length) continue;
            const sheetPage = await browser.newPage({ viewport: { width: 1600, height: 600 } });
            const bg = theme === 'dark' ? '#111927' : '#f3f4f6', fg = theme === 'dark' ? '#e5e7eb' : '#111827';
            await sheetPage.setContent(`<body style="margin:0;padding:12px;background:${bg};color:${fg};font:12px sans-serif">
<div style="columns:4;column-gap:12px">${g.map((s) => `<figure style="margin:0 0 12px;break-inside:avoid"><figcaption style="margin-bottom:4px">${s.name}</figcaption><img style="max-width:100%;display:block;border:1px dashed #9ca3af" src="data:image/png;base64,${s.png}"></figure>`).join('')}</div></body>`);
            const file = `${base}-${theme}${groups.length > 1 ? '-' + (i + 1) : ''}.png`;
            writeFileSync(file, await sheetPage.screenshot({ fullPage: true }));
            await sheetPage.close();
            console.log(`sheet ${file} (${g.length} states)`);
        }
        await page.close();
    }
}

await browser.close();
server.close();
console.log(failed ? `${failed} finding(s)` : 'no findings');
process.exit(failed ? 1 : 0);
