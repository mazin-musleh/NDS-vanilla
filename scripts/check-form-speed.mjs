// Form speed, a past commit against today, runs interleaved: Form's init on real pages (the loader's own
// timing), NDS.Form.create over N copies of a field (20 / 50 / 100), and the handler time of one keystroke and
// one click in a field (every listener, stamped before NDS and after it). Phone, CPU x6.6, median of RUNS.
//   node scripts/check-form-speed.mjs            BASE=<commit> (default HEAD) · RUNS=5 · CPU=6.6 · PAGES="a.html b.html"
// Needs the dev server on :4002. Chromium only (CDP). The past commit's bundles are served in place of today's.
import { launch, cdp } from './lib/browser.mjs';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const BASE = process.env.BASE || 'HEAD';
const RUNS = +(process.env.RUNS || 5);
const CPU = +(process.env.CPU || 6.6);
const PAGES = (process.env.PAGES || 'examples/registration.html components/form.html').split(/\s+/);
const SITE = 'http://localhost:4002/NDS-vanilla';

// The past commit's bundles, written once to tmp/form-speed/<sha>/.
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'buffer', maxBuffer: 64 << 20 });
const sha = git('rev-parse', '--short', BASE).toString().trim();
const oldDir = join(ROOT, 'tmp', 'form-speed', sha);
mkdirSync(oldDir, { recursive: true });
const bundles = git('ls-tree', '--name-only', BASE, 'assets/js/').toString().split('\n').filter((f) => f.endsWith('.min.js'));
for (const f of bundles) writeFileSync(join(oldDir, f.split('/').pop()), git('show', `${BASE}:${f}`));

const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[s.length >> 1] : NaN; };
const browser = await launch();

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

for (let run = 0; run < RUNS; run++) {
    for (const variant of run % 2 ? ['now', 'base'] : ['base', 'now']) {
        // 1. Form's init on real pages, by the loader's own timing.
        for (const pg of PAGES) {
            const { ctx, inits } = await open(variant, pg, { inits: true });
            const form = inits.filter(([n]) => n === 'Form').reduce((t, [, ms]) => t + ms, 0);
            add(`init Form · ${pg}`, variant, form);
            await ctx.close();
        }
        // 2. create() over N copies of the doc's first text field; 3. one keystroke and one click in it.
        const { ctx, page } = await open(variant, 'components/form.html');
        for (const n of [20, 50, 100]) {
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
        await page.evaluate(() => {
            const field = [...document.querySelectorAll('.nds-content-section .nds-form-container')].find((c) => c.querySelector(':scope > .nds-form-control > input[type="text"]:not([readonly], [disabled])')?.checkVisibility({ visibilityProperty: true }));
            field.querySelector('input').id = 'speed-input';
            field.scrollIntoView({ block: 'center' });
            // Capture on window runs before every NDS listener; a window bubble listener added now runs after them.
            window.__h = {};
            for (const t of ['keydown', 'beforeinput', 'input', 'keyup', 'pointerdown', 'mousedown', 'focusin', 'pointerup', 'mouseup', 'click']) {
                let t0 = 0;
                addEventListener(t, () => { t0 = performance.now(); }, true);
                addEventListener(t, () => { window.__h[t] = (window.__h[t] || 0) + performance.now() - t0; });
            }
        });
        await page.click('#speed-input'); await page.waitForTimeout(300);
        const click = await page.evaluate(() => { const h = window.__h; window.__h = {}; return Object.values(h).reduce((a, b) => a + b, 0); });
        await page.keyboard.press('a'); await page.waitForTimeout(300);
        const key = await page.evaluate(() => Object.values(window.__h).reduce((a, b) => a + b, 0));
        add('click in a field (handlers)', variant, click);
        add('keystroke in a field (handlers)', variant, key);
        await ctx.close();
    }
    process.stdout.write(`run ${run + 1}/${RUNS}\r`);
}
await browser.close();

console.log(`\nForm speed · base ${sha} vs now · CPU x${CPU} · median of ${RUNS} (ms)`);
for (const [k, v] of Object.entries(results)) {
    const b = median(v.base), n = median(v.now);
    console.log(`${k.padEnd(48)} base ${b.toFixed(2).padStart(7)}   now ${n.toFixed(2).padStart(7)}   ${n <= b ? '' : '+'}${(n - b).toFixed(2)}`);
}
