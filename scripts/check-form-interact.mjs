// How form fields react to real input, a past commit against today: every field canon on the field doc pages,
// in a <form class="nds-form">, driven with real clicks and keys — focus, typing, Tab out, the clear button, the
// number buttons (click and hold), the password toggle, a native select, checkbox / radio / switch, submit and
// reset. After each step it records each field's states and status, the inputs, the action buttons, the
// messages and where focus is, then lists each difference.
//   node scripts/check-form-interact.mjs        BASE=<commit> (default HEAD) · ENGINE=webkit · ONLY=<page stem>
// Needs the dev server on :4002 (SITE=<base url> for another). The past commit's bundles are served in place of today's.
import { launch } from './lib/browser.mjs';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const BASE = process.env.BASE || 'HEAD';
const SITE = (process.env.SITE || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const PAGES = ['form', 'formatted-input', 'password', 'checkbox', 'radio', 'switch', 'otp', 'taginput', 'custom-select', 'multiselect', 'date-picker', 'time-picker']
    .filter((p) => !process.env.ONLY || p === process.env.ONLY);

const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'buffer', maxBuffer: 64 << 20 });
const sha = git('rev-parse', '--short', BASE).toString().trim();
const oldDir = join(ROOT, 'tmp', 'form-interact', sha);
mkdirSync(oldDir, { recursive: true });
const bundles = git('ls-tree', '--name-only', BASE, 'assets/js/').toString().split('\n').filter((f) => f.endsWith('.min.js'));
for (const f of bundles) writeFileSync(join(oldDir, f.split('/').pop()), git('show', `${BASE}:${f}`));

const browser = await launch();

// In the page: the form's look, in words.
function snapshot() {
    const form = document.getElementById('ix-form');
    const key = (el) => el.tagName.toLowerCase() + [...el.classList].filter((c) => c.startsWith('nds-')).map((c) => '.' + c).join('');
    const a = document.activeElement;
    return JSON.stringify({
        fields: [...form.querySelectorAll('.nds-form-container, .nds-form-group')].map((c) =>
            `${key(c)} [${c.getAttribute('data-state') || ''}] ${c.getAttribute('data-status') || ''}`),
        controls: [...form.querySelectorAll('.nds-form-control')].map((fc) => fc.getAttribute('data-state') || ''),
        inputs: [...form.querySelectorAll('input:not([type="hidden"]), textarea, select')].map((i) =>
            `${i.type}=${i.type === 'checkbox' || i.type === 'radio' ? i.checked + (i.indeterminate ? '~' : '') : i.value}${i.validationMessage ? ' !' + i.validationMessage : ''}${i.getAttribute('aria-invalid') === 'true' ? ' invalid' : ''}`),
        buttons: [...form.querySelectorAll('.nds-form-action .nds-btn')].map((b) =>
            `${(b.className.match(/nds-(clear|toggle-password|number-increment|number-decrement)/) || ['btn'])[0]}${b.hidden ? ' hidden' : ''} ${b.getAttribute('aria-label') || ''}`),
        messages: [...form.querySelectorAll('.nds-feedback-message')].map((f) => f.textContent.trim()),
        focus: a && form.contains(a) ? key(a) + (a.type ? ':' + a.type : '') : 'outside',
    });
}

async function run(variant, pageName) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message));
    await page.route('**/nds-cookies.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
    // Both sides served from disk the same way: a fulfilled script lands at another time than a fetched one.
    const dir = variant === 'base' ? oldDir : join(ROOT, 'assets', 'js');
    await page.route('**/assets/js/*.min.js*', (r) => {
        const name = new URL(r.request().url()).pathname.split('/').pop();
        return existsSync(join(dir, name)) ? r.fulfill({ path: join(dir, name), contentType: 'text/javascript' }) : r.continue();
    });
    await page.goto(`${SITE}/components/${pageName}.html`, { waitUntil: 'load', timeout: 120000 });
    await page.evaluate(() => NDS.init.ready);
    await page.waitForTimeout(400);
    const canons = await page.evaluate(() => [...document.querySelectorAll('script[data-canon]:not([data-lang])')]
        .filter((s) => /nds-form-control/.test(s.textContent)).map((s) => ({ id: s.id, html: s.textContent })));
    const out = {};
    for (const { id, html } of canons) {
        const steps = [];
        const snap = async (label) => { await page.waitForTimeout(200); steps.push(label + ' ' + await page.evaluate(snapshot)); };
        await page.evaluate(async (html) => {
            document.getElementById('ix-form')?.remove();
            const form = document.createElement('form');
            form.id = 'ix-form'; form.className = 'nds-form'; form.noValidate = true;
            form.innerHTML = html.replace(/\bid="([^"]+)"/g, 'id="$1-ix"').replace(/\bfor="([^"]+)"/g, 'for="$1-ix"') + '<button type="submit" id="ix-submit">Send</button>';
            form.addEventListener('submit', (e) => e.preventDefault());
            document.querySelector('main, body').prepend(form);
            window.scrollTo(0, 0);
            await NDS.init.mount(form);
        }, html);
        await page.waitForTimeout(250);
        await snap('mounted');
        const f = page.locator('#ix-form');
        const each = async (sel, fn) => {
            const n = await f.locator(sel).count();
            for (let i = 0; i < n; i++) {
                const el = f.locator(sel).nth(i);
                if (!(await el.isVisible().catch(() => false))) continue;
                try { await fn(el, i); } catch (e) { steps.push(`${sel}#${i} failed: ${String(e.message).split('\n')[0]}`); }
            }
        };
        // Text-like fields: click in, type (Arabic digits and letters included), Tab out.
        await each('.nds-form-control > input:is([type="text"], [type="email"], [type="tel"], [type="search"], [type="url"], [type="number"], [type="password"]):not([readonly]), .nds-form-control > textarea', async (el, i) => {
            await el.click({ timeout: 2000 }); await page.waitForTimeout(100); await snap(`text#${i} focus`);
            await page.keyboard.type('a0١2 b', { delay: 10 }); await page.keyboard.press('End'); await snap(`text#${i} typed`);
            await page.keyboard.press('Tab'); await snap(`text#${i} blur`);
        });
        await each('.nds-form-action .nds-clear', async (el, i) => { await el.click({ timeout: 2000 }); await snap(`clear#${i}`); });
        await each('.nds-form-action .nds-toggle-password', async (el, i) => { await el.click({ timeout: 2000 }); await snap(`password-toggle#${i}`); });
        await each('.nds-number-increment, .nds-number-decrement', async (el, i) => {
            await el.click({ timeout: 2000 }); await el.click({ timeout: 2000 }); await snap(`step#${i} click`);
            const box = await el.boundingBox();
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            // Held long enough to reach the field's limit, so the repeat count cannot vary.
            await page.mouse.down(); await page.waitForTimeout(3500); await page.mouse.up(); await snap(`step#${i} hold`);
        });
        await each('.nds-form-control > select', async (el, i) => {
            await el.click({ timeout: 2000 }); await snap(`select#${i} open`);
            await page.keyboard.press('Escape');
            const values = await el.evaluate((s) => [...s.options].map((o) => o.value));
            if (values.length > 1) { await el.selectOption(values[1]); await snap(`select#${i} picked`); }
        });
        await each('.nds-switch-track', async (el, i) => { await el.click({ timeout: 2000 }); await snap(`switch#${i} click`); });
        await each('.nds-switch-input', async (el, i) => { await el.focus(); await page.keyboard.press('Space'); await snap(`switch#${i} key`); });
        await each('.nds-form-control > input[type="checkbox"]:not(.nds-switch-input), .nds-form-control > input[type="radio"]', async (el, i) => {
            const id = await el.getAttribute('id');
            const label = id ? f.locator(`label[for="${id}"]`).first() : null;
            if (label && await label.isVisible().catch(() => false)) await label.click({ timeout: 2000 }); else await el.click({ timeout: 2000, force: true });
            await snap(`box#${i} click`);
        });
        await page.evaluate(() => {
            // Every field required, then a submit shows the messages.
            document.querySelectorAll('#ix-form .nds-form-container, #ix-form .nds-form-group').forEach((c) => { if (!c.parentElement.closest('.nds-form-container, .nds-form-group')) NDS.Form.setState(c, 'required', true); });
        });
        await page.click('#ix-submit'); await snap('submit');
        await page.evaluate(() => document.getElementById('ix-form').reset()); await page.waitForTimeout(150); await snap('reset');
        await page.evaluate(() => { const form = document.getElementById('ix-form'); NDS.init.destroy(form); form.remove(); });
        out[id] = steps;
    }
    await ctx.close();
    return { out, errs };
}

let diffs = 0, steps = 0;
// The differences of one page; a difference counts only when a second run of both sides repeats it,
// so timing noise in a long run of real input never reads as a change.
async function pageDiffs(pageName) {
    const a = await run('base', pageName), b = await run('now', pageName);
    const found = new Map();
    let n = 0;
    for (const id of new Set([...Object.keys(a.out), ...Object.keys(b.out)])) {
        const x = a.out[id] || [], y = b.out[id] || [];
        for (let i = 0; i < Math.max(x.length, y.length); i++) {
            n++;
            if (x[i] !== y[i]) found.set(`${id} step ${i}`, `   base ${x[i]}
   now  ${y[i]}`);
        }
    }
    return { found, n, a, b };
}
for (const pageName of PAGES) {
    const first = await pageDiffs(pageName);
    steps += first.n;
    let found = first.found;
    if (found.size) {
        const second = await pageDiffs(pageName);
        found = new Map([...found].filter(([k]) => second.found.has(k)));
    }
    for (const [k, v] of found) { diffs++; console.log(`DIFF  ${pageName} #${k}
${v}`); }
    if (process.env.DUMP) console.log(JSON.stringify(first.b.out, null, 1));
    const errs = [...new Set([...first.a.errs.map((e) => 'base: ' + e), ...first.b.errs.map((e) => 'now: ' + e)])];
    if (errs.length) console.log(`errors on ${pageName}: ${errs.join(' | ')}`);
}
await browser.close();
console.log(`${steps} steps, base ${sha} vs now: ${diffs ? diffs + ' differ' : 'all the same'}`);
process.exit(diffs ? 1 : 0);
