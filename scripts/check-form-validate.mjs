// What NDS.Form.validate says, a past commit against today: every field canon on the field doc pages, wrapped in a
// <form class="nds-form">, in four states — as written, required, filled, disabled and required. Lists each
// difference (valid, which field failed, its message). The Form split must change nothing it did not mean to.
//   node scripts/check-form-validate.mjs        BASE=<commit> (default HEAD) · ENGINE=webkit · ONLY=<page stem> · DUMP=1 prints today's results
// Needs the dev server on :4002. The past commit's bundles are served in place of today's.
import { launch } from './lib/browser.mjs';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const BASE = process.env.BASE || 'HEAD';
const SITE = 'http://localhost:4002/NDS-vanilla';
const PAGES = ['form', 'checkbox', 'radio', 'switch', 'multiselect', 'taginput', 'upload', 'custom-select', 'dropmenu',
    'autocomplete', 'otp', 'rating', 'time-picker', 'date-picker', 'password'].filter((p) => !process.env.ONLY || p === process.env.ONLY);

const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'buffer', maxBuffer: 64 << 20 });
const sha = git('rev-parse', '--short', BASE).toString().trim();
const oldDir = join(ROOT, 'tmp', 'form-validate', sha);
mkdirSync(oldDir, { recursive: true });
const bundles = git('ls-tree', '--name-only', BASE, 'assets/js/').toString().split('\n').filter((f) => f.endsWith('.min.js'));
for (const f of bundles) writeFileSync(join(oldDir, f.split('/').pop()), git('show', `${BASE}:${f}`));

const browser = await launch();

// Runs in the page: every canon of one doc page, four states each.
async function probe() {
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const ROOTS = '.nds-form-container, .nds-form-group, .nds-upload, .nds-multiselect, .nds-taginput, .nds-dropmenu[data-select-name]';
    const key = (el) => !el ? '-' : (el.tagName.toLowerCase() + [...el.classList].filter((c) => c.startsWith('nds-')).map((c) => '.' + c).join(''));
    const summary = (r) => ({ valid: r.valid, errors: r.errors.map((e) => `${key(e.field)} > ${key(e.input)} : ${e.message}`) });
    const tops = (form) => [...form.querySelectorAll(ROOTS)].filter((el) => !el.parentElement.closest(ROOTS) || el.parentElement.closest(ROOTS) === null);
    // A valid national ID (Luhn) and a valid Saudi IBAN.
    const SAMPLE = { email: 'a@b.co', url: 'https://a.co', number: '5', tel: '0500000000', search: 'x', password: 'Aa1!aaaaaaaa', text: 'Hello' };
    function fill(form) {
        form.querySelectorAll('input:not([type="hidden"], [readonly], [disabled], [type="file"]), textarea').forEach((i) => {
            if (i.type === 'checkbox' || i.type === 'radio') return;
            if (i.closest('.nds-otp-container')) return;
            let v = i.classList.contains('nds-national-id') ? '1000000008' : i.classList.contains('nds-iban') ? 'SA0380000000608010167519' : (SAMPLE[i.type] || 'Hello');
            if (i.closest('.nds-time-fields')) v = i.classList.contains('nds-time-hour') ? '10' : '30';
            if (i.classList.contains('nds-time-input')) v = '10:30';
            if (i.closest('.nds-taginput')) return;
            if (i.closest('[data-strict]')) return;
            NDS.setValue(i, v);
        });
        form.querySelectorAll('select').forEach((s) => { if (s.options.length > 1) NDS.setValue(s, s.options[1].value || s.options[0].value); });
        form.querySelectorAll('.nds-form-group').forEach((g) => {
            const box = g.querySelector('input[type="checkbox"], input[type="radio"]');
            if (box && !box.checked) box.click();
        });
        form.querySelectorAll('.nds-form-container > .nds-form-control > input[type="checkbox"]').forEach((c) => { if (!c.checked) c.click(); });
        form.querySelectorAll('.nds-select-value').forEach((h) => {
            const fc = h.closest('.nds-form-control'), o = fc.querySelector('.nds-select-option[data-value]:not([data-value=""])');
            if (o) NDS.CustomSelect.setValue(fc, o.dataset.value);
        });
        form.querySelectorAll('.nds-multiselect').forEach((m) => { const c = m.querySelector('.nds-dropmenu-menu input[type="checkbox"]'); if (c && !c.checked) c.click(); });
        form.querySelectorAll('.nds-taginput').forEach((t) => t.ndsTaginput?.addTag('tag'));
        form.querySelectorAll('.nds-rating').forEach((r) => r.ndsRating?.setValue(3));
        form.querySelectorAll('.nds-otp-container input').forEach((i) => NDS.setValue(i, '1'));
        form.querySelectorAll('.nds-upload').forEach((u) => u.ndsUpload?.addFile(new File(['x'], 'a.pdf', { type: 'application/pdf' })));
        form.querySelectorAll('.nds-dropmenu[data-select-name]').forEach((d) => { const it = d.querySelector('.nds-dropmenu-item[data-value]'); if (it) d.ndsDropmenu?.applySelection(it); });
    }
    const out = {};
    for (const s of document.querySelectorAll('script[data-canon]:not([data-lang])')) {
        const html = s.textContent;
        if (!/nds-form-container|nds-form-group|nds-upload|nds-multiselect|nds-taginput|data-select-name/.test(html)) continue;
        const res = {};
        for (const state of ['written', 'required', 'filled', 'disabled']) {
            const form = document.createElement('form');
            form.className = 'nds-form';
            form.noValidate = true;
            form.innerHTML = html.replace(/\bid="([^"]+)"/g, 'id="$1-v"').replace(/\bfor="([^"]+)"/g, 'for="$1-v"');
            document.querySelector('main, body').prepend(form);
            await NDS.init.mount(form);
            await wait(150);
            if (state !== 'written') tops(form).forEach((f) => {
                if (f.matches('.nds-dropmenu')) f.setAttribute('data-required', '');
                else NDS.Form.setState(f, 'required', true);
            });
            // Required and disabled start empty: a canon may ship a pick.
            if (state === 'required' || state === 'disabled') {
                form.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((i) => { if (i.checked) NDS.setValue(i, false); });
                await wait(50);
            }
            if (state === 'filled') { fill(form); await wait(150); }
            if (state === 'disabled') { tops(form).forEach((f) => NDS.state.add(f, 'disabled')); await wait(50); }
            try { res[state] = summary(NDS.Form.validate(form, { showMessages: true, focusFirst: false })); }
            catch (e) { res[state] = { error: String(e) }; }
            // The public checks, read with no message shown: Form's old names or each component's validate.
            const pub = (comp, old) => (NDS[comp]?.validate || NDS.Form[old])?.bind(NDS[comp]?.validate ? NDS[comp] : NDS.Form);
            const PUBLIC = [
                ['.nds-form-group', (g) => g.querySelector('input[type="checkbox"]') && !g.closest('.nds-multiselect'), pub('Checkbox', 'validateCheckboxGroup')],
                ['.nds-form-group', (g) => g.querySelector('input[type="radio"]'), pub('Radio', 'validateRadioGroup')],
                ['.nds-form-group.nds-otp-group', () => true, pub('Otp', 'validateOtpGroup')],
                ['.nds-multiselect', () => true, pub('Multiselect', 'validateMultiselect')],
                ['.nds-taginput', () => true, pub('Taginput', 'validateTaginput')],
            ];
            const pubOut = [];
            for (const [sel, ok, fn] of PUBLIC) form.querySelectorAll(sel).forEach((el) => {
                if (!ok(el) || !fn) return;
                const r = fn(el, { showMessage: false });
                pubOut.push(`${key(el)} ${JSON.stringify(r)}`);
            });
            if (pubOut.length) res[state].public = pubOut;
            NDS.init.destroy(form);
            form.remove();
        }
        out[s.id] = res;
    }
    return out;
}

async function run(variant, page) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    await p.route('**/nds-cookies.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
    // Both sides served from disk the same way: a fulfilled script lands at another time than a fetched one.
    const dir = variant === 'base' ? oldDir : join(ROOT, 'assets', 'js');
    await p.route('**/assets/js/*.min.js*', (r) => {
        const name = new URL(r.request().url()).pathname.split('/').pop();
        return existsSync(join(dir, name)) ? r.fulfill({ path: join(dir, name), contentType: 'text/javascript' }) : r.continue();
    });
    await p.goto(`${SITE}/components/${page}.html`, { waitUntil: 'load', timeout: 120000 });
    await p.evaluate(() => NDS.init.ready);
    await p.waitForTimeout(500);
    const out = await p.evaluate(probe);
    await ctx.close();
    return { out, errs };
}

let diffs = 0, cases = 0;
for (const page of PAGES) {
    const a = await run('base', page), b = await run('now', page);
    for (const id of new Set([...Object.keys(a.out), ...Object.keys(b.out)])) {
        for (const state of ['written', 'required', 'filled', 'disabled']) {
            cases++;
            const x = JSON.stringify(a.out[id]?.[state]), y = JSON.stringify(b.out[id]?.[state]);
            if (x === y) continue;
            diffs++;
            console.log(`DIFF  ${page} #${id} [${state}]\n   base ${x}\n   now  ${y}`);
        }
    }
    if (process.env.DUMP) console.log(JSON.stringify(b.out, null, 1));
    const errs = [...new Set([...a.errs.map((e) => 'base: ' + e), ...b.errs.map((e) => 'now: ' + e)])];
    if (errs.length) console.log(`errors on ${page}: ${errs.join(' | ')}`);
}
await browser.close();
console.log(`${cases} cases, base ${sha} vs now: ${diffs ? diffs + ' differ' : 'all the same'}`);
process.exit(diffs ? 1 : 0);
