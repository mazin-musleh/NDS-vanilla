// Form speed, a past commit against today, runs interleaved: Form's init on real pages (the loader's own
// timing), NDS.Form.create over N copies of a field (20 / 50 / 100), and the handler time of one keystroke and
// one click in a field (every listener, stamped before NDS and after it). Phone, CPU x6.6, median of RUNS.
//   node scripts/check-form-speed.mjs            BASE=<commit> (default HEAD) · RUNS=5 · CPU=6.6 · PAGES="a.html b.html"
//   CLICKS=3       clicks in the field (a click away between): the first and the warm ones apart, each event's share
//   PROFILE=1      also a CPU profile of each click, on a page of its own: busy time and the top functions by self time
//   DROP=a,b       today's side runs without those NDS.field parts (number, switch …): what each one costs
//   CLICK_ONLY=1   skip the init and create() rows
//   JS_FLAGS=…     V8 flags for both sides (--no-lazy: compile every function at load, so a first click shows no compile time)
// Needs the dev server on :4002 (SITE=<base url> for another). Chromium only (CDP). The past commit's bundles are served in place of today's.
import { launch, cdp } from './lib/browser.mjs';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const BASE = process.env.BASE || 'HEAD';
const RUNS = +(process.env.RUNS || 5);
const CPU = +(process.env.CPU || 6.6);
const PAGES = (process.env.PAGES || 'examples/registration.html components/form.html').split(/\s+/);
const SITE = (process.env.SITE || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const CLICKS = Math.max(1, +(process.env.CLICKS || 1));
const PROFILE = !!process.env.PROFILE;
const DROP = (process.env.DROP || '').split(',').filter(Boolean);
const CLICK_ONLY = !!process.env.CLICK_ONLY;
const EVENTS = ['pointermove', 'pointerover', 'pointerout', 'mouseover', 'mouseout', 'pointerdown', 'mousedown', 'focusout', 'focusin',
    'pointerup', 'mouseup', 'click', 'keydown', 'beforeinput', 'input', 'keyup'];

// The past commit's bundles, written once to tmp/form-speed/<sha>/.
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'buffer', maxBuffer: 64 << 20 });
const sha = git('rev-parse', '--short', BASE).toString().trim();
const oldDir = join(ROOT, 'tmp', 'form-speed', sha);
mkdirSync(oldDir, { recursive: true });
const bundles = git('ls-tree', '--name-only', BASE, 'assets/js/').toString().split('\n').filter((f) => f.endsWith('.min.js'));
for (const f of bundles) writeFileSync(join(oldDir, f.split('/').pop()), git('show', `${BASE}:${f}`));

const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[s.length >> 1] : NaN; };
const browser = await launch(process.env.JS_FLAGS ? { args: [`--js-flags=${process.env.JS_FLAGS}`] } : {});

async function open(variant, url, opts = {}) {
    const ctx = await browser.newContext({ viewport: { width: 412, height: 915 }, deviceScaleFactor: 2.6, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await page.route('**/nds-cookies.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
    await page.route('**/nds-audit.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
    // Both sides served from disk the same way: a fulfilled script lands at another time than a fetched one.
    const dir = variant === 'base' ? oldDir : join(ROOT, 'assets', 'js');
    await page.route('**/assets/js/*.min.js*', (r) => {
        const name = new URL(r.request().url()).pathname.split('/').pop();
        return existsSync(join(dir, name)) ? r.fulfill({ path: join(dir, name), contentType: 'text/javascript' }) : r.continue();
    });
    // NDS.field is assigned once: wrap its addType there, so the dropped parts never register.
    if (DROP.length && variant === 'now') await page.addInitScript((drop) => {
        let field;
        Object.defineProperty(window.NDS = {}, 'field', { configurable: true, enumerable: true, get: () => field, set: (v) => {
            const add = v.addType;
            v.addType = (name, part) => (drop.includes(name) ? undefined : add(name, part));
            field = v;
        } });
    }, DROP);
    const inits = [];
    if (opts.inits) {
        await page.addInitScript(() => { window.NDSInitConfig = { enableLogging: true, enableTiming: true }; });
        page.on('console', (m) => { const x = m.text().match(/^\[NDS:init\] (\S+) ([\d.]+)ms/); if (x) inits.push([x[1], +x[2]]); });
    }
    const s = await cdp(page);
    await s.send('Emulation.setCPUThrottlingRate', { rate: CPU });
    await page.goto(`${SITE}/${url}`, { waitUntil: 'load', timeout: 180000 });
    await page.waitForFunction(() => window.NDS?.init?.ready).catch(() => {});
    await page.evaluate(() => NDS.init.ready);
    await page.waitForTimeout(800);
    return { ctx, page, inits };
}

const results = {};
const add = (key, variant, v) => { ((results[key] ||= { base: [], now: [] })[variant]).push(v); };

// The doc's first visible text field: id'd, scrolled to the middle.
const markField = () => {
    const field = [...document.querySelectorAll('.nds-content-section .nds-form-container')].find((c) => c.querySelector(':scope > .nds-form-control > input[type="text"]:not([readonly], [disabled])')?.checkVisibility({ visibilityProperty: true }));
    field.querySelector('input').id = 'speed-input';
    field.scrollIntoView({ block: 'center' });
};
// Click the field CLICKS times, a click away between; fn(k, click) wraps each click in the field.
async function clicks(page, fn) {
    for (let k = 0; k < CLICKS; k++) {
        await fn(k, async () => { await page.click('#speed-input'); await page.waitForTimeout(300); });
        if (k < CLICKS - 1) { await page.click('h1', { force: true }).catch(() => {}); await page.waitForTimeout(300); }
    }
}
const mean = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0);
const clickRow = (k) => (CLICKS === 1 ? 'click in a field' : k ? `click 2–${CLICKS} in a field (each)` : 'click 1 in a field');

// Self time per function over each profiled click, keyed by name and the bundle text around it.
const prof = { base: [{}, {}], now: [{}, {}] }, busy = { base: [[], []], now: [[], []] };
const src = {};
const frame = (variant, cf) => {
    const f = (cf.url || '').split('/').pop().split('?')[0];
    if (!f.endsWith('.js')) return `${cf.functionName || '(anon)'} @ ${f}`;
    src[variant + f] ??= (() => { try { return readFileSync(join(variant === 'base' ? oldDir : join(ROOT, 'assets', 'js'), f), 'utf8').split('\n'); } catch { return null; } })();
    const t = src[variant + f]?.[cf.lineNumber];
    return `${cf.functionName || '(anon)'} @ ${f} ${t ? JSON.stringify(t.slice(Math.max(0, cf.columnNumber - 30), cf.columnNumber + 50)) : ''}`;
};
async function profileClicks(variant) {
    const { ctx, page } = await open(variant, 'components/form.html');
    await page.evaluate(markField);
    await page.waitForTimeout(300);
    const s = await cdp(page);
    await s.send('Profiler.enable');
    await s.send('Profiler.setSamplingInterval', { interval: 50 });
    const sums = [];
    await clicks(page, async (k, click) => {
        await s.send('Profiler.start');
        await click();
        const { profile } = await s.send('Profiler.stop');
        const self = {};
        profile.samples.forEach((id, i) => { self[id] = (self[id] || 0) + (profile.timeDeltas[i + 1] || 0) / 1000; });
        // The page's own work: a frame with a page script on its stack (Playwright's injected script has no URL).
        const page_ = new Set(), byId = new Map(profile.nodes.map((n) => [n.id, n]));
        const mark = (n, up) => {
            if (up || /^https?:/.test(n.callFrame.url)) page_.add(n.id);
            (n.children || []).forEach((id) => mark(byId.get(id), page_.has(n.id)));
        };
        mark(profile.nodes[0], false);
        const agg = prof[variant][k ? 1 : 0];
        let total = 0;
        for (const n of profile.nodes) {
            const ms = self[n.id];
            if (!ms || !page_.has(n.id)) continue;
            total += ms;
            const key = frame(variant, n.callFrame);
            agg[key] = (agg[key] || 0) + ms / (k ? CLICKS - 1 : 1);
        }
        sums.push(total);
    });
    busy[variant][0].push(sums[0]);
    if (CLICKS > 1) busy[variant][1].push(mean(sums.slice(1)));
    await ctx.close();
}

for (let run = 0; run < RUNS; run++) {
    for (const variant of run % 2 ? ['now', 'base'] : ['base', 'now']) {
        // 1. Form's init on real pages, by the loader's own timing.
        for (const pg of CLICK_ONLY ? [] : PAGES) {
            const { ctx, inits } = await open(variant, pg, { inits: true });
            const form = inits.filter(([n]) => n === 'Form').reduce((t, [, ms]) => t + ms, 0);
            add(`init Form · ${pg}`, variant, form);
            await ctx.close();
        }
        // 2. create() over N copies of the doc's first text field; 3. clicks and one keystroke in it.
        const { ctx, page } = await open(variant, 'components/form.html');
        for (const n of CLICK_ONLY ? [] : [20, 50, 100]) {
            const ms = await page.evaluate((n) => {
                const field = [...document.querySelectorAll('.nds-content-section .nds-form-container')].find((c) => c.querySelector(':scope > .nds-form-control > input[type="text"]:not([readonly], [disabled])')?.checkVisibility({ visibilityProperty: true }));
                const host = document.createElement('div');
                for (let i = 0; i < n; i++) {
                    const c = field.cloneNode(true);
                    c.querySelectorAll('[id]').forEach((e) => { e.id += '-s' + i; });
                    c.removeAttribute('data-state');
                    host.appendChild(c);
                }
                document.querySelector('main, body').appendChild(host);
                const t = performance.now();
                NDS.Form.create(host);
                const d = performance.now() - t;
                host.remove();
                return d;
            }, n);
            add(`create × ${n}`, variant, ms);
        }
        await page.evaluate(markField);
        await page.evaluate((events) => {
            // Capture on window runs before every NDS listener; a window bubble listener added now runs after them.
            window.__h = {};
            for (const t of events) {
                let t0 = 0;
                addEventListener(t, () => { t0 = performance.now(); }, true);
                addEventListener(t, () => { window.__h[t] = (window.__h[t] || 0) + performance.now() - t0; });
            }
        }, EVENTS);
        const take = () => page.evaluate(() => { const h = window.__h; window.__h = {}; return h; });
        const per = [];
        await clicks(page, async (k, click) => { await take(); await click(); per.push(await take()); });
        // Click 1, then the mean of the warm ones: total and by event.
        [[per[0]], per.slice(1)].forEach((hs, k) => {
            if (!hs.length) return;
            add(clickRow(k), variant, mean(hs.map(sum)));
            for (const t of EVENTS) add(`${clickRow(k)} · ${t}`, variant, mean(hs.map((h) => h[t] || 0)));
        });
        await page.keyboard.press('a'); await page.waitForTimeout(300);
        add('keystroke in a field', variant, sum(await take()));
        await ctx.close();
        if (PROFILE) await profileClicks(variant);
    }
    process.stdout.write(`run ${run + 1}/${RUNS}\r`);
}
await browser.close();

console.log(`\nForm speed · base ${sha} vs now${DROP.length ? ` without ${DROP.join(', ')}` : ''} · CPU x${CPU} · median of ${RUNS} (ms; clicks and keystroke: handler time)`);
for (const [k, v] of Object.entries(results)) {
    const b = median(v.base), n = median(v.now);
    const ev = k.split(' · ')[1];
    // An event's row shows only when it costs something on either side.
    if (ev && k.startsWith('click') && b < 0.05 && n < 0.05) continue;
    const label = ev && k.startsWith('click') ? `    ${ev}` : k;
    console.log(`${label.padEnd(48)} base ${b.toFixed(2).padStart(7)}   now ${n.toFixed(2).padStart(7)}   ${n <= b ? '' : '+'}${(n - b).toFixed(2)}`);
}
if (PROFILE) {
    for (const k of CLICKS > 1 ? [0, 1] : [0]) for (const v of ['base', 'now']) {
        const b = busy[v][k];
        console.log(`\n${v} · ${clickRow(k)} · profiled busy ${median(b).toFixed(1)} ms median (${b.map((x) => x.toFixed(1)).join(' ')}) · top self time, mean per click`);
        Object.entries(prof[v][k]).sort((a, c) => c[1] - a[1]).slice(0, 15)
            .forEach(([key, ms]) => console.log(`${(ms / RUNS).toFixed(2).padStart(7)}  ${key.slice(0, 150)}`));
    }
}
