// v2 consistency, batch 6a-2 (plans/v2-consistency.md 3.25): every value field answers
// NDS.X.getValue(el) / setValue(el, v) / clear(el), or getValues / setValues / clear for several values.
// On each component's doc page, on the first live field: a good set returns true, reads back and
// fires a change; a refused set returns false and changes nothing; clear empties it; an id works too.
//
//   node scripts/check-v2-batch6a2.mjs [baseUrl] [--only=Otp,Slider]
import { launch, log } from './lib/browser.mjs';

const BASE = (process.argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const browser = await launch();
let failed = 0;
const check = (ok, msg) => { if (!ok) failed++; log(`${ok ? 'pass' : 'FAIL'} ${msg}`); };

// good/bad may be a token the page resolves: FIRST (the field's first option value), MID (a slider step
// above min), UNCHECKED (a radio not checked yet), SPAN (a range slider's inner pair), FLIP (the opposite of the switch's state).
const CASES = [
    { ns: 'Otp', page: 'components/otp', sel: '.nds-otp-container', good: '1234', cleared: '' },
    { ns: 'CustomSelect', page: 'components/custom-select', sel: '.nds-select', good: 'FIRST', bad: 'zz-none', cleared: '' },
    { ns: 'Rating', page: 'components/rating', sel: '.nds-rating:not([data-readonly], [data-state~="readonly"])', good: 3, bad: 99, cleared: 0 },
    { ns: 'Taginput', page: 'components/taginput', sel: '.nds-taginput', many: true, good: ['alpha', 'beta'], bad: ['alpha', ''], cleared: [] },
    { ns: 'Multiselect', page: 'components/multiselect', sel: '.nds-multiselect', many: true, good: ['FIRST'], bad: ['zz-none'], cleared: [] },
    { ns: 'Dropmenu', page: 'components/dropmenu', sel: '.nds-dropmenu[data-select-name]', canon: 'dm-picker', good: 'FIRST', bad: 'zz-none', cleared: '' },
    { ns: 'Password', page: 'components/password', sel: '.nds-password', good: 'Abc12345!', cleared: '' },
    { ns: 'Editor', page: 'components/editor', sel: '.nds-editor', good: '<p>Hi there</p>', includes: 'Hi there', cleared: '' },
    { ns: 'DatePicker', page: 'components/date-picker', sel: '.nds-date-picker:not(.nds-date-range)', good: '2026-03-15', bad: 'not a date', cleared: '' },
    { ns: 'DatePicker', page: 'components/date-picker', sel: '.nds-date-picker.nds-date-range', canon: 'date-picker-field', addClass: ['.nds-date-picker', 'nds-date-range'], many: true, good: ['2026-03-10', '2026-03-15'], bad: ['x', 'y'], cleared: [] },
    { ns: 'Slider', page: 'components/slider', sel: '.nds-slider-container:not(.nds-slider-range)', good: 'MID', bad: 1e9, cleared: 'MIN' },
    { ns: 'Slider', page: 'components/slider', sel: '.nds-slider-container.nds-slider-range', canon: 'slider-range', many: true, good: 'SPAN', bad: 'REVERSED', cleared: 'FULL' },
    { ns: 'Switch', page: 'components/switch', sel: '.nds-switch', good: 'FLIP', bad: 'yes', cleared: false },
    { ns: 'Checkbox', page: 'components/checkbox', sel: '.nds-checkbox:not(.nds-checkbox-group .nds-checkbox, .nds-multiselect .nds-checkbox)', good: true, bad: 'x', cleared: false },
    { ns: 'Checkbox', page: 'components/checkbox', sel: '.nds-checkbox-group', canon: 'check-group', many: true, good: ['FIRST'], bad: ['zz-none'], cleared: [] },
    { ns: 'Radio', page: 'components/radio', sel: '.nds-radio-group', good: 'UNCHECKED', bad: 'zz-none', cleared: '' },
    { ns: 'FormattedInput', page: 'components/formatted-input', sel: '.nds-formatted:has([data-format="iban"]), .nds-formatted[data-format="iban"]', canon: 'field-iban', good: 'SA03 8000 0000 6080 1016 7519', expect: 'SA0380000000608010167519', cleared: '' },
    { ns: 'Autocomplete', page: 'components/autocomplete', sel: '.nds-form-container[data-url]', good: 'Riyadh', cleared: '' },
];

async function open(path) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/${path}.html`, { waitUntil: 'load' });
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'));
    await page.evaluate(() => NDS.init.ready);
    await page.waitForTimeout(500);
    await page.evaluate(() => document.getElementById('nds-cookies-panel')?.remove());
    return page;
}

for (const c of CASES.filter((x) => !ONLY.length || ONLY.includes(x.ns))) {
    const page = await open(c.page);
    const r = await page.evaluate(async (c) => {
        const api = NDS[c.ns];
        let root = [...document.querySelectorAll(c.sel)].find((el) => !el.closest('template, [data-canon], .nds-doc-variants') && el.getClientRects().length);
        // No live demo of this variant on the page: mount its canon.
        if (!root && c.canon) {
            const box = document.createElement('div');
            box.innerHTML = document.getElementById(c.canon).textContent;
            if (c.addClass) box.querySelector(c.addClass[0])?.classList.add(c.addClass[1]);
            document.querySelector('main').prepend(box);
            await NDS.init.mount(box);
            await new Promise((res) => setTimeout(res, 300));
            root = box.matches(c.sel) ? box : box.querySelector(c.sel);
        }
        if (!root) return { skip: 'no live field' };
        const get = c.many ? 'getValues' : 'getValue', set = c.many ? 'setValues' : 'setValue';
        if (typeof api?.[get] !== 'function' || typeof api?.[set] !== 'function' || typeof api?.clear !== 'function') return { skip: `no NDS.${c.ns}.${get}/${set}/clear` };
        const input = root.querySelector('input[type=range]');
        const first = root.querySelector('[data-value]')?.dataset.value ?? root.querySelector('option[value]:not([value=""]), input[type=checkbox], input[type=radio]')?.value;
        const num = (k) => Number(input?.[k]);
        const token = (v) => {
            if (v === 'FIRST') return first;
            if (v === 'UNCHECKED') return root.querySelector('input[type=radio]:not(:checked)')?.value;
            if (v === 'MID') return num('min') + (num('step') || 1);
            if (v === 'MIN') return num('min');
            if (v === 'SPAN') { const [a, b] = root.querySelectorAll('input[type=range]'); return [Number(a.min) + (Number(a.step) || 1), Number(b.max) - (Number(b.step) || 1)]; }
            if (v === 'REVERSED') { const [a, b] = root.querySelectorAll('input[type=range]'); return [Number(b.max), Number(a.min)]; }
            if (v === 'FULL') { const [a, b] = root.querySelectorAll('input[type=range]'); return [Number(a.min), Number(b.max)]; }
            if (v === 'FLIP') return !api.getValue(root);
            if (Array.isArray(v)) return v.map(token);
            return v;
        };
        const good = token(c.good), bad = token(c.bad), cleared = token(c.cleared);
        let events = 0;
        const count = (e) => { if (e.type === 'change' || /^nds:.*change$|^nds:.*select$/.test(e.type)) events++; };
        const types = ['change', 'nds:rating:change', 'nds:taginput:change', 'nds:multiselect:change', 'nds:dropmenu:select', 'nds:switch:change'];
        types.forEach((t) => document.addEventListener(t, count, true));
        const wait = () => new Promise((res) => setTimeout(res, 150));
        const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
        const out = {};
        events = 0;
        out.setReturns = await api[set](root, good); await wait();
        const after = await api[get](root);
        out.readsBack = c.includes ? String(after).includes(c.includes) : same(after, c.expect ?? good);
        out.after = after;
        out.firesChange = events > 0;
        if (c.bad !== undefined) {
            events = 0;
            out.refuses = (await api[set](root, bad)) === false; await wait();
            out.unchanged = same(await api[get](root), after);
            out.refusedSilent = events === 0;
        }
        out.clearReturns = (await api.clear(root)) === true; await wait();
        out.cleared = same(await api[get](root), cleared);
        out.clearedValue = await api[get](root);
        root.id ||= 'b6a2-' + c.ns.toLowerCase();
        out.byId = same(await api[get]('#' + root.id), out.clearedValue);
        out.missRef = c.many ? same(await api[get]('#b6a2-missing'), []) : (await api[get]('#b6a2-missing')) === '';
        if (c.ns === 'Autocomplete') {
            await api[set](root, good); await new Promise((res) => setTimeout(res, 600));
            out.noMenu = ![...document.querySelectorAll('[role=listbox]')].some((l) => l.getClientRects().length && !l.hidden);
        }
        types.forEach((t) => document.removeEventListener(t, count, true));
        return out;
    }, c);
    await page.context().close();
    const label = `${c.ns}${c.many ? ' (several)' : ''}`;
    if (r.skip) { check(false, `${label}: ${r.skip}`); continue; }
    check(r.setReturns === true, `${label}: set returns true`);
    check(r.readsBack, `${label}: reads back (${JSON.stringify(r.after)})`);
    check(r.firesChange, `${label}: a set fires a change`);
    if ('refuses' in r) {
        check(r.refuses, `${label}: a refused value returns false`);
        check(r.unchanged && r.refusedSilent, `${label}: a refused value changes nothing and fires nothing`);
    }
    check(r.clearReturns && r.cleared, `${label}: clear empties it (${JSON.stringify(r.clearedValue)})`);
    check(r.byId, `${label}: an '#id' reads the same field`);
    check(r.missRef, `${label}: a ref that matches nothing reads empty`);
    if ('noMenu' in r) check(r.noMenu, `${label}: a set opens no menu`);
}

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
