// Before/after check for every built page: proves a change moved nothing it did not mean to.
//
//   node scripts/ab-pages.mjs snap <name> [--no-build] [--pages=a.html,b.html] [--jobs=4] [--open=sel1,sel2]
//   node scripts/ab-pages.mjs diff <base> <head> [--map=map.json]
//        snap … --from=<snap> shoots that snap's build again under a new name, to measure noise
//   node scripts/ab-pages.mjs serve <name> [port]   serve a snap's site for the behaviour checks
//   node scripts/ab-pages.mjs behave <name> [--only=a,b] [--args=--new]   every page-driving check
//        against that site, one at a time; PASS/FAIL per check in tmp/ab/behaviour-<name>.txt
// diff --noise=<report>: files that also differed between two snaps of one build are marked noise.
//
// snap builds the working tree into tmp/ab/<name>/site and writes per page, in tmp/ab/<name>/snap:
//   pixels  1280 and 390, light and dark; 1280 with JS off; 1280 in LTR; print, on pages with
//           a swiper, accordion or chart
//   dom.txt one element per line after init (sorted attributes and classes): catches every class
//           or attribute the JS writes, and the canon blocks of a doc page
//   aria.txt the accessibility tree: aria-current, button vs link, names
//   --open  clicks the first match of each selector and records open-N.png and open-N.txt
// diff compares two snaps. --map is [{ "from": "old", "to": "new" }]: applied to the base text
// first, so a planned rename does not count as a change.
// Noise is held down by a frozen clock and Math.random, reduced motion, no transitions, fonts
// loaded. ponytail: builder options are not clicked; their markup is the canon and the Variants
// table, both in dom.txt. Click them with doc-check.mjs when a batch changes the builder itself.
import { execSync, spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { launch, log } from './lib/browser.mjs';

const ROOT = join(import.meta.dirname, '..');
const AB = join(ROOT, 'tmp', 'ab');
const [cmd, a, b] = process.argv.slice(2);
const opt = (k) => (process.argv.find((x) => x.startsWith(`--${k}=`)) || '').split('=').slice(1).join('=');
const flag = (k) => process.argv.includes(`--${k}`);
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.json': 'application/json', '.jpg': 'image/jpeg', '.mp4': 'video/mp4' };
const FIXED = Date.UTC(2026, 9, 1, 9, 0, 0);

function serve(site, port = 0) {
    const server = createServer((req, res) => {
        const [path, query] = req.url.split('?');
        let p = join(site, decodeURIComponent(path));
        try {
            if (!existsSync(p) && existsSync(p + '.html')) p += '.html';   // as GitHub Pages serves it
            if (statSync(p).isDirectory()) p = join(p, 'index.html');
            let body = readFileSync(p);
            // ?ab-ltr: the page as an English page, so every logical property flips.
            if (query === 'ab-ltr' && p.endsWith('.html')) body = body.toString().replace(/<html([^>]*)>/, (m, attrs) => `<html${attrs.replace(/\s(dir|lang)="[^"]*"/g, '')} dir="ltr" lang="en">`);
            res.writeHead(200, { 'content-type': TYPES[extname(p)] || 'application/octet-stream' });
            res.end(body);
        } catch { res.writeHead(404); res.end(); }
    });
    return new Promise((res) => server.listen(port, '127.0.0.1', () => res({ server, base: `http://127.0.0.1:${server.address().port}/NDS-vanilla/` })));
}

function htmlPages(dir, out = []) {
    for (const f of readdirSync(dir)) {
        const p = join(dir, f);
        if (statSync(p).isDirectory()) { if (!/^(assets|docs-assets|img)$/.test(f)) htmlPages(p, out); }
        else if (f.endsWith('.html')) out.push(p);
    }
    return out;
}

// Runs in the page: freeze what moves between two runs.
function freeze(fixed) {
    const RealDate = Date;
    class FrozenDate extends RealDate {
        constructor(...args) { super(...(args.length ? args : [fixed])); }
        static now() { return fixed; }
    }
    globalThis.Date = FrozenDate;
    let seed = 42;
    Math.random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

const STILL = '*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important;caret-color:transparent!important}*{content-visibility:visible!important}';

async function settle(page, js = true) {
    // JS off: evaluate() and addStyleTag() never answer, so only wait for paint.
    if (!js) return page.waitForTimeout(1000);
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'), null, { timeout: 15000 }).catch(() => {});
    await page.addStyleTag({ content: STILL });
    await page.evaluate(async () => {
        document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });
        await document.fonts.ready;
        await Promise.all([...document.images].filter((i) => !i.complete).map((i) => new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 3000); })));
    });
    await page.waitForTimeout(400);
}

// One element per line, attributes and class tokens sorted: a line diff names the element.
function dumpDom() {
    const lines = [];
    const attrs = (el) => [...el.attributes].map((at) => {
        // Generated ids (tooltips use randomUUID) differ on every load.
        const v = (at.name === 'class' ? at.value.split(/\s+/).filter(Boolean).sort().join(' ') : at.value).replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g, 'UUID').replace(/http:\/\/127\.0\.0\.1:\d+/g, 'ORIGIN');
        return `${at.name}="${v}"`;
    }).sort().join(' ');
    const walk = (node, depth) => {
        for (const n of node.childNodes) {
            if (n.nodeType === 3) { const t = n.textContent.replace(/\s+/g, ' ').trim(); if (t) lines.push(`${'  '.repeat(depth)}"${t.slice(0, 200)}"`); continue; }
            if (n.nodeType !== 1) continue;
            const tag = n.tagName.toLowerCase();
            if (tag === 'script' && !n.hasAttribute('data-canon')) continue;
            if (tag === 'style') continue;
            lines.push(`${'  '.repeat(depth)}<${tag}${n.attributes.length ? ' ' + attrs(n) : ''}>`);
            if (tag === 'svg') continue;   // icon paths: pixels cover them
            walk(n.content || n, depth + 1);
        }
    };
    lines.push(`<html ${attrs(document.documentElement)}>`);
    walk(document.body, 1);
    return lines.join('\n');
}

async function snap(name) {
    // --from=<snap>: shoot another snap's build again (a noise check on one build).
    const dir = join(AB, name), site = opt('from') ? join(AB, opt('from'), 'site') : join(dir, 'site'), out = join(dir, 'snap');
    if (!flag('no-build') && !opt('from')) {
        rmSync(site, { recursive: true, force: true });
        log(`building into ${relative(ROOT, site)}…`);
        execSync(`bundle exec jekyll build -q -d "${join(site, 'NDS-vanilla')}"`, { cwd: ROOT, stdio: 'inherit', shell: true });
    }
    const root = join(site, 'NDS-vanilla');
    const only = opt('pages') ? opt('pages').split(',') : null;
    const pages = htmlPages(root).map((p) => relative(root, p).replace(/\\/g, '/')).filter((p) => !only || only.includes(p)).sort();
    const opens = opt('open') ? opt('open').split(',') : [];
    const { server, base } = await serve(site);
    const browser = await launch();
    let done = 0;
    const failures = [];

    const one = async (rel) => {
        const pdir = join(out, rel.replace(/\.html$/, ''));
        mkdirSync(pdir, { recursive: true });
        const ctx = async (o = {}) => {
            const c = await browser.newContext({ reducedMotion: 'reduce', timezoneId: 'Asia/Riyadh', deviceScaleFactor: 1, ...o });
            await c.addInitScript(freeze, FIXED);
            return c;
        };
        const shot = async (file, { width = 1280, theme = 'light', js = true, query = '', print = false, extra } = {}) => {
            const c = await ctx({ viewport: { width, height: 900 }, javaScriptEnabled: js });
            if (theme === 'dark') await c.addInitScript(() => { try { localStorage.setItem('nds-theme', 'dark'); } catch {} });
            const page = await c.newPage();
            try {
                await page.goto(base + rel + (query ? `?${query}` : ''), { waitUntil: 'load', timeout: 20000 });
                if (!page.url().includes(rel)) { writeFileSync(join(pdir, 'redirect.txt'), page.url().replace(base, '')); await c.close(); return null; }
                await settle(page, js);
                if (print) { await page.emulateMedia({ media: 'print' }); await page.waitForTimeout(800); }   // charts redraw on the resize
                if (extra) await extra(page);
                const t = Date.now();
                await page.screenshot({ path: join(pdir, file), fullPage: true, timeout: 20000, ...(js && { animations: 'disabled' }) });
                if (process.env.AB_DEBUG) log(`${rel} ${file} ${Date.now() - t} ms`);
                return page;
            } finally { if (!extra) await c.close(); else page.__ctx = c; }
        };

        const main = await shot('1280-light.png', {
            extra: async (page) => {
                writeFileSync(join(pdir, 'dom.txt'), await page.evaluate(dumpDom));
                writeFileSync(join(pdir, 'aria.txt'), (await page.locator('body').ariaSnapshot({ timeout: 15000 })).replace(/http:\/\/127\.0\.0\.1:\d+/g, 'ORIGIN'));
            },
        });
        if (!main) return;
        await main.__ctx.close();
        if (existsSync(join(pdir, 'redirect.txt'))) return;
        await shot('1280-dark.png', { theme: 'dark' });
        await shot('390-light.png', { width: 390 });
        await shot('390-dark.png', { width: 390, theme: 'dark' });
        await shot('nojs.png', { js: false });
        await shot('ltr.png', { query: 'ab-ltr' });
        if (/nds-swiper|nds-accordion|nds-chart/.test(readFileSync(join(pdir, 'dom.txt'), 'utf8'))) await shot('print.png', { print: true });
        for (const [i, sel] of opens.entries()) {
            const p = await shot(`open-${i}.png`, {
                extra: async (page) => {
                    const el = page.locator(sel).first();
                    if (!(await el.count())) return;
                    await el.click({ timeout: 5000 }).catch(() => {});
                    await page.waitForTimeout(400);
                    writeFileSync(join(pdir, `open-${i}.txt`), await page.evaluate(dumpDom));
                },
            });
            if (p) await p.__ctx.close();
        }
    };

    const queue = [...pages];
    const jobs = Number(opt('jobs')) || 4;
    await Promise.all(Array.from({ length: jobs }, async () => {
        for (let rel; (rel = queue.shift());) {
            try { await one(rel); } catch (e) { failures.push(`${rel}: ${e.message.split('\n')[0]}`); }
            if (++done % 10 === 0) log(`${done}/${pages.length}`);
        }
    }));
    await browser.close();
    server.close();
    log(`snap ${name}: ${pages.length} pages, ${failures.length} failed`);
    failures.forEach((f) => console.log(`  FAIL ${f}`));
    if (failures.length) process.exitCode = 1;
}

async function diff(baseName, headName) {
    const A = join(AB, baseName, 'snap'), B = join(AB, headName, 'snap');
    const map = opt('map') ? JSON.parse(readFileSync(opt('map'), 'utf8')) : [];
    const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const remap = (t) => map.reduce((s, { from, to }) => s.replace(new RegExp(`(?<![\\w-])${esc(from)}(?![\\w-])`, 'g'), to), t);
    const files = (d, r = '') => readdirSync(join(d, r)).flatMap((f) => statSync(join(d, r, f)).isDirectory() ? files(d, join(r, f)) : [join(r, f)]);
    const all = [...new Set([...files(A), ...files(B)])].sort();
    const report = [];
    const pngs = [];

    for (const f of all) {
        const pa = join(A, f), pb = join(B, f);
        if (!existsSync(pa) || !existsSync(pb)) { report.push(`${f}: only in ${existsSync(pa) ? baseName : headName}`); continue; }
        if (f.endsWith('.png')) { if (!readFileSync(pa).equals(readFileSync(pb))) pngs.push(f); continue; }
        const la = remap(readFileSync(pa, 'utf8')).split('\n'), lb = readFileSync(pb, 'utf8').split('\n');
        const sa = new Set(la), sb = new Set(lb);
        const gone = la.filter((l) => !sb.has(l)), added = lb.filter((l) => !sa.has(l));
        if (gone.length || added.length) {
            report.push(`${f}: -${gone.length} +${added.length}`);
            gone.slice(0, 6).forEach((l) => report.push(`    - ${l.trim().slice(0, 160)}`));
            added.slice(0, 6).forEach((l) => report.push(`    + ${l.trim().slice(0, 160)}`));
        }
    }

    // Byte-different PNGs: count the pixels that really differ, in the browser (no image library).
    if (pngs.length) {
        const browser = await launch();
        const page = await browser.newPage();
        mkdirSync(join(AB, `diff-${baseName}-${headName}`), { recursive: true });
        for (const f of pngs) {
            const r = await page.evaluate(async ([x, y]) => {
                const load = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = src; });
                const [ia, ib] = await Promise.all([load(x), load(y)]);
                if (ia.width !== ib.width || ia.height !== ib.height) return { size: `${ia.width}x${ia.height} → ${ib.width}x${ib.height}` };
                const data = (img) => { const c = new OffscreenCanvas(img.width, img.height); const g = c.getContext('2d'); g.drawImage(img, 0, 0); return g.getImageData(0, 0, img.width, img.height).data; };
                const da = data(ia), db = data(ib);
                let n = 0, top = -1;
                for (let i = 0; i < da.length; i += 4) {
                    if (Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]) > 24) { n++; if (top < 0) top = Math.floor(i / 4 / ia.width); }
                }
                return { n, top };
            }, [`data:image/png;base64,${readFileSync(join(A, f)).toString('base64')}`, `data:image/png;base64,${readFileSync(join(B, f)).toString('base64')}`]);
            if (r.size) report.push(`${f}: size ${r.size}`);
            else if (r.n) report.push(`${f}: ${r.n} px differ, first at y=${r.top}`);
        }
        await browser.close();
    }

    if (opt('noise')) {
        const noisy = new Set(readFileSync(opt('noise'), 'utf8').split('\n').map((l) => l.split(':')[0]).filter(Boolean));
        for (let i = 0; i < report.length; i++) if (noisy.has(report[i].split(':')[0])) report[i] += '   (noise: differs between two snaps of one build)';
    }
    const file = join(AB, `report-${baseName}-${headName}.txt`);
    writeFileSync(file, report.join('\n') + '\n');
    console.log(report.length ? report.slice(0, 80).join('\n') : 'no difference');
    console.log(`\n${report.filter((l) => !l.startsWith('    ')).length} changed file(s); full report: ${relative(ROOT, file)}`);
}

// The checks that drive pages, by how each takes its site. Left out: check-a11y (builds _site),
// check-filter-dates (dev server only), check-form-interact/-validate/-speed (they A/B two commits
// themselves: run them with BASE=<commit>), the static ones, and check-v2-batch*.mjs (each has an
// old-names and a --new mode tied to one batch: run it by hand with that batch).
const URL_ARG = ['dialogs', 'dropmenu-placement', 'filter-form-assoc', 'filter-server-mode', 'filter-sort-ownership', 'form-reset', 'frameworks', 'init-destroy', 'ipv', 'mainnav', 'menus-in-modal', 'mount-timing', 'pagination-data', 'refresh', 'scroll-jump', 'set-value', 'sort-api', 'swiper-loop', 'time-picker'];
const SITE_ENV = ['part-sizes', 'typing'];

async function behave(name) {
    const site = join(AB, name, 'site');
    const { server, base } = await serve(site);
    const only = opt('only') ? opt('only').split(',') : null;
    const extra = opt('args') ? opt('args').split(' ') : [];
    const runs = [...URL_ARG, ...SITE_ENV, 'a11y-arm'].filter((c) => !only || only.includes(c)).filter((c) => existsSync(join(ROOT, 'scripts', `check-${c}.mjs`)));
    const lines = [];
    for (const c of runs) {
        const args = [join('scripts', `check-${c}.mjs`)];
        if (URL_ARG.includes(c)) args.push(base.replace(/\/$/, ''), ...extra);
        if (c === 'a11y-arm') args.push(join(site, 'NDS-vanilla'));
        const t = Date.now();
        const { code, out } = await new Promise((res) => {
            // One fuzz seed for every run, so base and head type the same keys.
            const p = spawn(process.execPath, args, { cwd: ROOT, env: { SEED: '24295', ...process.env, SITE: base } });
            let out = '';
            p.stdout.on('data', (d) => { out += d; });
            p.stderr.on('data', (d) => { out += d; });
            const timer = setTimeout(() => { p.kill(); out += '\nTIMEOUT after 240 s'; }, 240000);
            p.on('close', (code) => { clearTimeout(timer); res({ code, out }); });
        });
        const tail = out.split('\n').filter((l) => l.trim() && !/request failed/.test(l)).slice(-3).join(' | ').slice(0, 300);
        const line = `${code === 0 ? 'PASS' : 'FAIL'} ${c} (${Math.round((Date.now() - t) / 1000)} s) ${code === 0 ? '' : tail}`;
        lines.push(line);
        log(line);
    }
    server.close();
    // --only reruns some checks: keep the other lines of an earlier run.
    const file = join(AB, `behaviour-${name}.txt`);
    const kept = only && existsSync(file) ? readFileSync(file, 'utf8').split('\n').filter((l) => l && !runs.includes(l.split(' ')[1])) : [];
    writeFileSync(file, [...kept, ...lines].join('\n') + '\n');
}

if (cmd === 'snap' && a) await snap(a);
else if (cmd === 'diff' && a && b) await diff(a, b);
else if (cmd === 'behave' && a) await behave(a);
else if (cmd === 'serve' && a) {
    const { server, base } = await serve(join(AB, a, 'site'), Number(b) || 0);
    console.log(base);
}
else { console.error('usage: ab-pages.mjs snap <name> | diff <base> <head> (see the header)'); process.exit(1); }
