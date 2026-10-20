// NDS.setValue: every value NDS writes reaches forms and framework bindings.
//
//   REACT    a controlled React input and textarea see NDS.setValue (onChange runs,
//            the value survives the re-render); the old write-then-dispatch does not.
//   PICKERS  each component's write fires input + change on the field a binding
//            reads, and a carrier is written before the visible field's events.
//
//   node scripts/check-set-value.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if down.
import { launch } from './lib/browser.mjs';
import { REACT, VUE, SVELTE, ANGULAR, major, loadReact, loadVue, SVELTE_APP, ANGULAR_LOAD } from './lib/frameworks.mjs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const browser = await launch();
let failed = 0;
const ok = (name, pass, detail = '') => {
    if (!pass) failed++;
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

async function open(path) {
    const page = await browser.newPage();
    // WebKit's harmless ResizeObserver loop notice: TODO.md, Watch.
    page.on('pageerror', (e) => { if (!/ResizeObserver loop/.test(e.message)) ok(`no page error on ${path}`, false, e.message); });
    await page.goto(`${BASE}/${path}`, { waitUntil: 'load' });
    // The cookie panel can open mid-run and take the clicks meant for a menu.
    await page.addStyleTag({ content: '#nds-cookies-panel { display: none !important; }' });
    await page.waitForFunction(() => window.NDS?.setValue && document.documentElement.hasAttribute('data-nds-ready')
        || window.NDS?.setValue, null, { timeout: 15000 });
    // Log input/change in dispatch order, named by the field's own class (or type).
    await page.evaluate(() => {
        window.__log = [];
        for (const t of ['input', 'change']) document.addEventListener(t, (e) => {
            const el = e.target;
            const own = Array.from(el.classList || []).find((c) => c !== 'nds-input');
            window.__log.push(`${t}:${own || el.type || el.tagName}`);
        }, true);
    });
    return page;
}
const log = (page) => page.evaluate(() => window.__log.splice(0));

// ---- REACT ---------------------------------------------------------------
for (const v of REACT) {
    const R = 'React ' + major(v);
    const page = await open('components/form.html');
    await loadReact(v)(page);
    const res = await page.evaluate(async () => {
        const h = React.createElement, out = {};
        const host = document.body.appendChild(document.createElement('div'));
        function Field({ tag, id }) {
            const [v, setV] = React.useState('');
            return h(tag, { id, value: v, onChange: (e) => { out[id] = (out[id] || 0) + 1; setV(e.target.value); } });
        }
        ReactDOM.createRoot(host).render(h('div', null,
            h(Field, { tag: 'input', id: 'r-new' }), h(Field, { tag: 'textarea', id: 'r-area' }), h(Field, { tag: 'input', id: 'r-old' })));
        const tick = () => new Promise((r) => setTimeout(r, 50));
        await tick();
        NDS.setValue(document.getElementById('r-new'), 'hello');
        NDS.setValue(document.getElementById('r-area'), 'line');
        const old = document.getElementById('r-old');
        old.value = 'hello';
        old.dispatchEvent(new Event('input', { bubbles: true }));
        old.dispatchEvent(new Event('change', { bubbles: true }));
        await tick();
        return { out, v: ['r-new', 'r-area', 'r-old'].map((id) => document.getElementById(id).value) };
    });
    ok(`${R} input: onChange runs and the value stays`, res.out['r-new'] >= 1 && res.v[0] === 'hello', JSON.stringify(res));
    ok(`${R} textarea: onChange runs and the value stays`, res.out['r-area'] >= 1 && res.v[1] === 'line');
    ok(`${R} A/B: the old write-then-dispatch is lost to React (no onChange)`, !res.out['r-old']);

    // Boxes: React reads a checkbox or radio from its click, so setValue flips it with one.
    const box = await page.evaluate(async () => {
        const h = React.createElement, out = {};
        const host = document.querySelector('.nds-section-body').appendChild(document.createElement('div'));
        function Box({ type, id, name }) {
            const [on, setOn] = React.useState(false);
            return h('span', null,
                h('input', { type, id, name, checked: on, onChange: (e) => { out[id] = (out[id] || 0) + 1; setOn(e.target.checked); } }),
                h('b', { id: id + '-state' }, String(on)));
        }
        // The switch canon, rendered by React: NDS wires its track after the mount.
        function Switch() {
            const [on, setOn] = React.useState(false);
            return h('div', { className: 'nds-form-container', id: 'r-sw-box' }, h('div', { className: 'nds-form-control' },
                h('div', { className: 'nds-switch' },
                    h('input', { type: 'checkbox', id: 'r-sw', className: 'nds-switch-input', checked: on, onChange: (e) => setOn(e.target.checked) }),
                    h('div', { className: 'nds-switch-track' }, h('div', { className: 'nds-switch-thumb' }))),
                h('b', { id: 'r-sw-state' }, String(on))));
        }
        ReactDOM.createRoot(host).render(h('div', null,
            h(Box, { type: 'checkbox', id: 'r-cb' }), h(Box, { type: 'radio', id: 'r-rd', name: 'r-rd' }), h(Switch)));
        const tick = () => new Promise((r) => setTimeout(r, 50));
        await tick();
        NDS.Init.mount(document.getElementById('r-sw-box'));
        const read = (id) => ({ dom: document.getElementById(id).checked, state: document.getElementById(id + '-state').textContent });
        NDS.setValue(document.getElementById('r-cb'), true);
        NDS.setValue(document.getElementById('r-rd'), true);
        await tick();
        const on = { cb: read('r-cb'), rd: read('r-rd') };
        NDS.setValue(document.getElementById('r-cb'), false);
        document.querySelector('#r-sw-box .nds-switch-track').click();
        await tick();
        return { out, on, cbOff: read('r-cb'), sw: read('r-sw') };
    });
    ok(`${R} checkbox: setValue on and off reaches its state`, box.on.cb.state === 'true' && box.cbOff.state === 'false'
        && box.cbOff.dom === false && box.out['r-cb'] === 2, JSON.stringify(box));
    ok(`${R} radio: setValue reaches its state`, box.on.rd.state === 'true' && box.out['r-rd'] === 1);
    ok(`${R} switch: a track click reaches its state, flipped once`, box.sw.dom === true && box.sw.state === 'true', JSON.stringify(box.sw));

    // A disabled box takes the plain write: no click lands, the value and events still do.
    const dis = await page.evaluate(() => {
        const cb = document.body.appendChild(document.createElement('input'));
        cb.type = 'checkbox';
        cb.disabled = true;
        window.__log.length = 0;
        NDS.setValue(cb, true);
        return { checked: cb.checked, log: window.__log.slice() };
    });
    ok(`${R} page, disabled checkbox: setValue still writes it with input + change`, dis.checked
        && dis.log.join() === 'input:checkbox,change:checkbox', JSON.stringify(dis));
    await page.close();
}

// ---- FORMS ----------------------------------------------------------------
{
    let page = await open('components/switch.html');
    // Switch: a click flips the checkbox and fires input + change on it.
    const sw = await page.evaluate(() => {
        const track = document.querySelector('.nds-switch-track');
        const box = track?.closest('.nds-form-control')?.querySelector('input[type="checkbox"]');
        if (!box) return null;
        const before = box.checked;
        window.__log.length = 0;
        track.click();
        return { flipped: box.checked !== before, log: window.__log.slice() };
    });
    ok('Switch: click flips it and fires input + change', sw && sw.flipped
        && sw.log.filter((l) => /checkbox|switch/.test(l)).length >= 2, JSON.stringify(sw));
    await page.close();
    page = await open('components/form.html');

    // Clear button: empties the field with input + change.
    const clr = await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('.nds-form-action .nds-clear'))
            .find((b) => b.closest('.nds-form-control')?.querySelector('input:not([type="hidden"])'));
        if (!btn) return null;
        const input = btn.closest('.nds-form-control').querySelector('input:not([type="hidden"])');
        NDS.setValue(input, 'abc');
        window.__log.length = 0;
        btn.click();
        return { value: input.value, log: window.__log.slice() };
    });
    ok('Clear button: empties the field, fires input + change', clr && clr.value === ''
        && clr.log.some((l) => l.startsWith('input:')) && clr.log.some((l) => l.startsWith('change:')), JSON.stringify(clr));
    await page.close();
}

// ---- CUSTOM SELECT ---------------------------------------------------------
{
    const page = await open('components/custom-select.html');
    const res = await page.evaluate(() => {
        const fc = Array.from(document.querySelectorAll('.nds-form-control'))
            .find((f) => f.querySelector('.nds-select-input') && f.querySelector('.nds-select-value'));
        const opt = (fc._customSelectDropdown || fc).querySelectorAll('.nds-select-option')[1]
            || document.querySelector('.nds-select-option');
        window.__log.length = 0;
        const done = NDS.CustomSelect.setValue(fc, opt.dataset.value);
        return { done, hidden: fc.querySelector('.nds-select-value').value, want: opt.dataset.value, log: window.__log.slice() };
    });
    ok('Custom Select: value field holds the pick', res.done && res.hidden === res.want, JSON.stringify(res));
    ok('Custom Select: value field fires first, then the visible field',
        res.log.join() === 'input:nds-select-value,change:nds-select-value,input:nds-select-input,change:nds-select-input', res.log.join());
    await page.close();
}

// ---- DATE PICKER ----------------------------------------------------------
{
    const page = await open('components/date-picker.html');
    const res = await page.evaluate(async () => {
        const input = document.querySelector('.nds-date-input');
        const dp = await NDS.DatePicker.create(input); // a stub's promise while the bundle loads
        window.__log.length = 0;
        dp.selectDate(new Date(2026, 9, 15));
        dp.updateInput();
        const a = { value: input.value, log: window.__log.splice(0) };
        dp.clearSelection();
        return { a, cleared: input.value, log: window.__log.slice() };
    });
    ok('Date Picker: a pick writes the field with input + change', res.a.value
        && res.a.log.includes('input:nds-date-input') && res.a.log.includes('change:nds-date-input'), JSON.stringify(res.a));
    ok('Date Picker: clear empties it with input + change', res.cleared === ''
        && res.log.includes('input:nds-date-input') && res.log.includes('change:nds-date-input'), res.log.join());
    await page.close();
}

// ---- OTP ------------------------------------------------------------------
{
    const page = await open('components/otp.html');
    const res = await page.evaluate(() => {
        const group = Array.from(document.querySelectorAll('.nds-otp-group')).find((g) => g.querySelector('.nds-otp-value'));
        if (!group) return null;
        window.__log.length = 0;
        NDS.Otp.setValue(group, '1234');
        return { value: group.querySelector('.nds-otp-value').value, log: window.__log.filter((l) => l.endsWith('nds-otp-value')) };
    });
    ok('OTP: .nds-otp-value gets the digits with input + change', res && res.value.startsWith('12')
        && res.log.join() === 'input:nds-otp-value,change:nds-otp-value', JSON.stringify(res));
    await page.close();
}

// ---- TIME PICKER ----------------------------------------------------------
{
    const page = await open('components/time-picker.html');
    const res = await page.evaluate(() => {
        const tp = Array.from(document.querySelectorAll('.nds-time-picker')).find((t) => t.querySelector('.nds-time-value'));
        window.__log.length = 0;
        NDS.TimePicker.setValue(tp, '09:30');
        return { carrier: tp.querySelector('.nds-time-value').value, field: tp.querySelector('.nds-time-input').value,
            log: window.__log.slice() };
    });
    ok('Time Picker: carrier fires first, then the field',
        res.carrier.startsWith('09:30') && res.log.join() === 'input:nds-time-value,change:nds-time-value,input:nds-time-input,change:nds-time-input',
        JSON.stringify(res));
    await page.close();
}

// ---- EDITOR ---------------------------------------------------------------
{
    const page = await open('components/editor.html');
    await page.waitForFunction(() => document.querySelector('.nds-editor')?.ndsEditor, null, { timeout: 15000 });
    const res = await page.evaluate(() => {
        const ed = document.querySelector('.nds-editor');
        const area = ed.ndsEditor.source;
        NDS.setValue(area, '<p>From a script</p>');
        return ed.querySelector('[contenteditable]').textContent;
    });
    ok('Editor: NDS.setValue on the textarea refills the surface', res.includes('From a script'), res.slice(0, 60));
    await page.close();
}

// ---- AUTOCOMPLETE ---------------------------------------------------------
{
    const page = await open('components/autocomplete.html');
    const input = page.locator('.nds-form-container[data-url] input:not([type="hidden"])').first();
    await input.scrollIntoViewIfNeeded();
    await input.click();
    await input.pressSequentially('ser', { delay: 30 });
    const item = page.locator('.nds-autocomplete-menu .nds-dropmenu-item, .nds-autocomplete-menu li').first();
    await item.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});
    await page.evaluate(() => { window.__log.length = 0; });
    const visible = await item.isVisible().catch(() => false);
    if (visible) await item.click();
    const res = await page.evaluate(() => ({ log: window.__log.slice(), value: document.activeElement?.value }));
    ok('Autocomplete: a pick fires input + change', visible
        && res.log.some((l) => l.startsWith('input:')) && res.log.some((l) => l.startsWith('change:')), JSON.stringify(res));
    await page.close();
}

// ---- BINDINGS -------------------------------------------------------------
// A listener on the field stands in for v-model / ngModel: it keeps the value each
// input or change event carries. A field NDS rewrites must end with the binding
// holding what the field shows.
{
    const page = await open('components/form.html');
    // The doc demos live in canon blocks, so the fields are built here from the canon markup.
    await page.evaluate(() => {
        const field = (input, pre = '', post = '') => '<div class="nds-form-container"><div class="nds-form-control">'
            + pre + input + post + '</div></div>';
        const step = (dir, side) => '<div class="nds-form-action nds-' + side + '"><button class="nds-btn nds-subtle nds-number-'
            + dir + ' nds-icon-only" type="button" aria-label="' + dir + '"><i class="nds-icon nds-hgi-plus-sign"></i></button></div>';
        const box = document.createElement('div');
        box.id = 'sv-fixtures';
        box.innerHTML = field('<input type="tel" id="sv-phone" class="nds-input nds-phone">')
            + field('<input type="text" id="sv-iban" class="nds-input nds-iban" maxlength="34">')
            + field('<input type="text" id="sv-num" class="nds-input nds-center" inputmode="numeric" value="1" min="1" max="20" step="1">',
                step('decrement', 'prefix'), step('increment', 'suffix'));
        document.querySelector('.nds-section-body').prepend(box);
        NDS.Init.mount(box);
    });
    const bind = (sel) => page.evaluate((sel) => {
        const el = document.querySelector(sel);
        el.scrollIntoView({ block: 'center' });
        el.__bound = null;
        for (const t of ['input', 'change']) el.addEventListener(t, () => { el.__bound = el.value; });
    }, sel);
    const bound = (sel) => page.evaluate((sel) => {
        const el = document.querySelector(sel);
        return { shown: el.value, bound: el.__bound };
    }, sel);
    const same = (r) => r.bound === r.shown;

    await bind('#sv-phone');
    await page.locator('#sv-phone').focus();
    await page.keyboard.insertText('0501');
    let r = await bound('#sv-phone');
    ok('Phone: a pasted number reaches the binding stripped', same(r) && r.shown === '501', JSON.stringify(r));

    await bind('#sv-iban');
    await page.locator('#sv-iban').focus();
    await page.keyboard.insertText('sa03 80');
    r = await bound('#sv-iban');
    ok('IBAN: a pasted value reaches the binding cleaned', same(r) && r.shown === 'SA0380', JSON.stringify(r));

    await bind('#sv-num');
    await page.locator('#sv-num').fill('70');
    await page.locator('#sv-num').blur();
    r = await bound('#sv-num');
    ok('Number: a blur clamp reaches the binding', same(r) && r.shown === '20', JSON.stringify(r));

    // React, password: a pasted Arabic letter is stripped, and React's state follows.
    // Each version loads over the last; a root keeps the React it was made with.
    for (const v of REACT) {
        const id = 'r-pw-' + major(v);
        await loadReact(v)(page);
        await page.evaluate((id) => {
            const h = React.createElement;
            const host = document.querySelector('.nds-section-body').appendChild(document.createElement('div'));
            function Pw() {
                const [val, setVal] = React.useState('');
                return h('div', { className: 'nds-form-container' },
                    h('div', { className: 'nds-form-control' },
                        h('input', { id, type: 'password', className: 'nds-input', value: val, onChange: (e) => setVal(e.target.value) })),
                    h('span', { id: id + '-state' }, val));
            }
            ReactDOM.createRoot(host).render(h(Pw));
        }, id);
        await page.locator('#' + id).waitFor();
        await page.locator('#' + id).focus();
        await page.keyboard.insertText('abcب');
        await page.waitForTimeout(50);
        r = await page.evaluate((id) => ({ shown: document.getElementById(id).value, state: document.getElementById(id + '-state').textContent }), id);
        ok(`Password: React ${major(v)} state drops a pasted Arabic letter`, r.shown === 'abc' && r.state === 'abc', JSON.stringify(r));
    }
    await page.close();
}

// ---- VUE ------------------------------------------------------------------
// v-model on the field each component's docs name; NDS wires the markup after Vue mounts it.
for (const ver of VUE) {
    const V = 'Vue ' + ver.split('.').slice(0, 2).join('.');
    const page = await open('components/form.html');
    await loadVue(ver)(page);
    await page.evaluate(() => {
        const host = document.querySelector('.nds-section-body').appendChild(document.createElement('div'));
        host.id = 'v-app';
        const opt = (v) => '<button type="button" class="nds-btn nds-subtle nds-select-option" data-value="' + v
            + '"><span class="nds-option-text"><span class="nds-label">' + v + '</span></span></button>';
        window.__vue = Vue.createApp({
            data: () => ({ region: '', date: '', time: '', phone: '', text: '', agree: false, sw: false }),
            template: ''
                + '<div class="nds-form-container nds-select" id="v-cs"><div class="nds-form-control">'
                + '<input type="text" class="nds-input nds-select-input" readonly>'
                + '<input type="hidden" class="nds-select-value" v-model="region">'
                + '<div class="nds-select-dropdown" hidden><div class="nds-select-options">' + opt('riyadh') + opt('makkah') + '</div></div>'
                + '</div></div>'
                + '<div class="nds-form-container nds-date-picker" id="v-dp"><div class="nds-form-control">'
                + '<div class="nds-form-action"><button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle nds-icon-only" aria-label="d"><i class="nds-icon nds-hgi-calendar-03"></i></button></div>'
                + '<input type="text" class="nds-input nds-date-input" v-model="date"></div></div>'
                + '<div class="nds-form-container nds-time-picker" id="v-tp"><div class="nds-form-control">'
                + '<div class="nds-form-action"><button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle nds-icon-only" aria-label="t"><i class="nds-icon nds-hgi-clock-01"></i></button></div>'
                + '<input type="text" class="nds-input nds-time-input"><input type="hidden" class="nds-time-value" v-model="time"></div></div>'
                + '<div class="nds-form-container"><div class="nds-form-control"><input type="tel" id="v-phone" class="nds-input nds-phone" v-model="phone"></div></div>'
                + '<div class="nds-form-container"><div class="nds-form-control"><input type="text" id="v-text" class="nds-input" v-model="text"></div></div>'
                + '<input type="checkbox" id="v-agree" v-model="agree">'
                + '<div class="nds-form-container" id="v-sw-box"><div class="nds-form-control"><div class="nds-switch">'
                + '<input type="checkbox" id="v-sw" class="nds-switch-input" v-model="sw">'
                + '<div class="nds-switch-track"><div class="nds-switch-thumb"></div></div></div></div></div>'
        }).mount(host);
        NDS.Init.mount(host);
    });
    await page.waitForFunction(() => document.querySelector('#v-dp .nds-date-input')?._ndsDatePicker
        || window.NDS?.DatePicker?.create, null, { timeout: 10000 });
    const res = await page.evaluate(async () => {
        const vm = window.__vue;
        const tick = () => new Promise((r) => setTimeout(r, 50));
        // A component's code may still be loading: its stub returns a promise.
        await NDS.CustomSelect.setValue(document.getElementById('v-cs'), 'makkah');
        const dp = await NDS.DatePicker.create(document.querySelector('#v-dp .nds-date-input'));
        dp.selectDate(new Date(2026, 9, 15));
        dp.updateInput();
        await NDS.TimePicker.setValue(document.getElementById('v-tp'), '09:30');
        NDS.setValue(document.getElementById('v-text'), 'hello');
        NDS.setValue(document.getElementById('v-agree'), true);
        document.querySelector('#v-sw-box .nds-switch-track').click();
        await tick();
        return {
            region: vm.region, date: vm.date, shownDate: document.querySelector('#v-dp .nds-date-input').value,
            time: vm.time, text: vm.text, agree: vm.agree, sw: vm.sw, swDom: document.getElementById('v-sw').checked
        };
    });
    ok(`${V}: Custom Select reaches v-model on .nds-select-value`, res.region === 'makkah', JSON.stringify(res));
    ok(`${V}: a Date Picker pick reaches v-model`, res.date && res.date === res.shownDate);
    ok(`${V}: Time Picker reaches v-model on .nds-time-value`, res.time === '09:30');
    ok(`${V}: NDS.setValue reaches v-model on a text field`, res.text === 'hello');
    ok(`${V}: NDS.setValue reaches v-model on a checkbox`, res.agree === true);
    ok(`${V}: a Switch track click reaches v-model, flipped once`, res.sw === true && res.swDom === true);

    await page.locator('#v-phone').scrollIntoViewIfNeeded();
    await page.locator('#v-phone').focus();
    await page.keyboard.insertText('0501');
    await page.waitForTimeout(50);
    const ph = await page.evaluate(() => ({ shown: document.getElementById('v-phone').value, model: window.__vue.phone }));
    ok(`${V}: a pasted phone number reaches v-model stripped`, ph.shown === '501' && ph.model === '501', JSON.stringify(ph));
    await page.close();
}

// ---- NATIVE SELECT --------------------------------------------------------
for (const [i, rv] of REACT.entries()) {
    const page = await open('components/form.html');
    await loadReact(rv)(page);
    await loadVue(VUE[i])(page);
    const tag = `React ${major(rv)}, Vue ${VUE[i].split('.').slice(0, 2).join('.')}`;
    const res = await page.evaluate(async () => {
        const body = document.querySelector('.nds-section-body');
        const opts = ['a', 'b'];
        const rHost = body.appendChild(document.createElement('div'));
        let rState = '';
        function Sel() {
            const [v, setV] = React.useState('a');
            rState = v;
            return React.createElement('select', { id: 'r-sel', value: v, onChange: (e) => setV(e.target.value) },
                opts.map((o) => React.createElement('option', { key: o, value: o }, o)));
        }
        ReactDOM.createRoot(rHost).render(React.createElement(Sel));
        const vHost = body.appendChild(document.createElement('div'));
        const vm = Vue.createApp({ data: () => ({ v: 'a' }),
            template: '<select id="v-sel" v-model="v"><option value="a">a</option><option value="b">b</option></select>' }).mount(vHost);
        const tick = () => new Promise((r) => setTimeout(r, 50));
        await tick();
        NDS.setValue(document.getElementById('r-sel'), 'b');
        NDS.setValue(document.getElementById('v-sel'), 'b');
        await tick();
        return { react: rState, vue: vm.v };
    });
    ok(`Native select (${tag}): NDS.setValue reaches React state`, res.react === 'b', JSON.stringify(res));
    ok(`Native select (${tag}): NDS.setValue reaches Vue v-model`, res.vue === 'b');
    await page.close();
}

// ---- VUE, MORE FIELDS -----------------------------------------------------
for (const ver of VUE) {
    const V = 'Vue ' + ver.split('.').slice(0, 2).join('.');
    const page = await open('components/form.html');
    await loadVue(ver)(page);
    await page.evaluate(() => {
        const host = document.querySelector('.nds-section-body').appendChild(document.createElement('div'));
        const digit = '<div class="nds-form-container nds-otp-container"><div class="nds-form-control">'
            + '<input type="text" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="d"></div></div>';
        const step = (dir, side) => '<div class="nds-form-action nds-' + side + '"><button class="nds-btn nds-subtle nds-number-'
            + dir + ' nds-icon-only" type="button" aria-label="' + dir + '"><i class="nds-icon nds-hgi-plus-sign"></i></button></div>';
        window.__vue2 = Vue.createApp({
            data: () => ({ lo: '20000', hi: '60000', otp: '', service: '', country: '', iban: '', qty: '1' }),
            template: ''
                + '<div class="nds-form-container nds-slider-container nds-slider-range" id="v2-slider"><div class="nds-form-control">'
                + '<output class="nds-slider-value nds-slider-value-min">20000</output><div class="nds-slider-track">'
                + '<input type="range" class="nds-slider nds-slider-min" min="0" max="100000" step="1000" aria-label="lo" v-model="lo">'
                + '<input type="range" class="nds-slider nds-slider-max" min="0" max="100000" step="1000" aria-label="hi" v-model="hi">'
                + '</div><output class="nds-slider-value nds-slider-value-max">60000</output></div></div>'
                + '<fieldset class="nds-form-group nds-otp-group" id="v2-otp"><legend><span class="nds-label">Code</span></legend>'
                + '<div class="nds-otp">' + digit + digit + digit + digit + '</div>'
                + '<input type="hidden" class="nds-otp-value" v-model="otp"></fieldset>'
                + '<div class="nds-form-container" id="v2-ac" data-url="../docs-assets/data/services-autocomplete.json" data-name="Title" data-fetch="once">'
                + '<div class="nds-form-control"><input type="text" id="v2-service" class="nds-input" autocomplete="on" v-model="service"></div></div>'
                + '<div class="nds-dropmenu" id="v2-dm" data-select-name="country">'
                + '<input type="hidden" data-nds-select-value v-model="country">'
                + '<button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger"><span class="nds-label">Choose</span></button>'
                + '<div class="nds-dropmenu-menu" hidden><div class="nds-dropmenu-scroll">'
                + '<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="SA"><span class="nds-label">Saudi Arabia</span></button>'
                + '<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="AE"><span class="nds-label">UAE</span></button>'
                + '</div></div></div>'
                + '<div class="nds-form-container"><div class="nds-form-control"><input type="text" id="v2-iban" class="nds-input nds-iban" v-model="iban"></div></div>'
                + '<div class="nds-form-container"><div class="nds-form-control">' + step('decrement', 'prefix')
                + '<input type="text" id="v2-qty" class="nds-input nds-center" inputmode="numeric" min="1" max="20" step="1" v-model="qty">'
                + step('increment', 'suffix') + '</div></div>'
        }).mount(host);
        NDS.Init.mount(host);
    });
    const vm = (k) => page.evaluate((k) => window.__vue2[k], k);

    // Slider: the dragged low thumb passes the high one and is clamped back to it.
    await page.evaluate(async () => {
        const lo = document.querySelector('#v2-slider .nds-slider-min');
        lo.focus();
        NDS.setValue(lo, '80000', { change: false });
        await new Promise((r) => setTimeout(r, 50));
    });
    let r = { shown: await page.evaluate(() => document.querySelector('#v2-slider .nds-slider-min').value), model: await vm('lo') };
    ok(`${V}: a clamped slider thumb reaches v-model`, r.shown === '60000' && r.model === '60000', JSON.stringify(r));

    await page.evaluate(() => NDS.Otp.setValue(document.getElementById('v2-otp'), '1234'));
    ok(`${V}: OTP reaches v-model on .nds-otp-value`, (await vm('otp')) === '1234', await vm('otp'));

    await page.locator('#v2-dm .nds-dropmenu-trigger').scrollIntoViewIfNeeded();
    await page.locator('#v2-dm .nds-dropmenu-trigger').click();
    await page.locator('.nds-dropmenu-item[data-value="AE"]').click();
    ok(`${V}: a Dropmenu pick reaches v-model on its hidden field`, (await vm('country')) === 'AE', await vm('country'));

    await page.locator('#v2-iban').scrollIntoViewIfNeeded();
    await page.locator('#v2-iban').focus();
    await page.keyboard.insertText('sa03 80');
    ok(`${V}: a pasted IBAN reaches v-model cleaned`, (await vm('iban')) === 'SA0380', await vm('iban'));

    await page.locator('#v2-qty').fill('70');
    await page.locator('#v2-qty').blur();
    ok(`${V}: a number clamped on blur reaches v-model`, (await vm('qty')) === '20', await vm('qty'));

    const svc = page.locator('#v2-service');
    await svc.scrollIntoViewIfNeeded();
    await svc.click();
    await svc.pressSequentially('ser', { delay: 30 });
    const item = page.locator('.nds-autocomplete-menu .nds-dropmenu-item, .nds-autocomplete-menu li').first();
    const shown = await item.waitFor({ state: 'visible', timeout: 8000 }).then(() => true, () => false);
    if (shown) await item.click();
    r = { shown: await svc.inputValue(), model: await vm('service') };
    ok(`${V}: an Autocomplete pick reaches v-model`, shown && r.model === r.shown && r.shown.length > 3, JSON.stringify(r));
    await page.close();
}

// ---- EDITOR TYPING --------------------------------------------------------
{
    const page = await open('components/editor.html');
    await page.waitForFunction(() => document.querySelector('.nds-editor')?.ndsEditor, null, { timeout: 15000 });
    await page.evaluate(() => {
        const src = document.querySelector('.nds-editor').ndsEditor.source;
        src.__bound = null;
        for (const t of ['input', 'change']) src.addEventListener(t, () => { src.__bound = src.value; });
    });
    const surface = page.locator('.nds-editor [contenteditable]').first();
    await surface.scrollIntoViewIfNeeded();
    await surface.click();
    await page.keyboard.press('End');
    await page.keyboard.type(' typed', { delay: 20 });
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => {
        const src = document.querySelector('.nds-editor').ndsEditor.source;
        return { bound: src.__bound, value: src.value };
    });
    ok('Editor: typing reaches a binding on its textarea', r.bound !== null && r.bound === r.value && r.value.includes('typed'),
        JSON.stringify({ ...r, value: r.value.slice(-60), bound: r.bound && r.bound.slice(-60) }));
    await page.close();
}

// ---- USER FEEDBACK RESET --------------------------------------------------
{
    const page = await open('components/form.html');
    const uf = page.locator('.nds-user-feedback').first();
    await uf.scrollIntoViewIfNeeded();
    await uf.locator('[data-answer="Yes"]').click();
    const box = uf.locator('.nds-user-feedback-details input[type="checkbox"]:visible').first();
    await box.check();
    await page.evaluate(() => { window.__log.length = 0; });
    await uf.locator('.nds-user-feedback-close').click();
    const r = await page.evaluate(() => ({
        ticked: document.querySelectorAll('.nds-user-feedback input[type="checkbox"]:checked').length,
        log: window.__log.filter((l) => /check/.test(l))
    }));
    ok('User Feedback: close unticks each box with input + change', r.ticked === 0
        && r.log.includes('input:nds-check') && r.log.includes('change:nds-check'), JSON.stringify(r));
    await page.close();
}

// ---- SVELTE AND ANGULAR ---------------------------------------------------
// The fields of the Vue section, bound with bind:value / bind:checked and [(ngModel)].
// `bind(key, checkbox)` returns the framework's binding attribute.
const FIELDS = (p, bind) => {
    const opt = (v) => '<button type="button" class="nds-btn nds-subtle nds-select-option" data-value="' + v
        + '"><span class="nds-option-text"><span class="nds-label">' + v + '</span></span></button>';
    const act = (cls, icon) => '<div class="nds-form-action"><button type="button" class="nds-btn nds-subtle nds-md ' + cls
        + ' nds-icon-only" aria-label="o"><i class="nds-icon ' + icon + '"></i></button></div>';
    return ''
        + `<div class="nds-form-container nds-select" id="${p}-cs"><div class="nds-form-control">`
        + '<input type="text" class="nds-input nds-select-input" readonly>'
        + `<input type="hidden" class="nds-select-value" ${bind('region')}>`
        + '<div class="nds-select-dropdown" hidden><div class="nds-select-options">' + opt('riyadh') + opt('makkah') + '</div></div></div></div>'
        + `<div class="nds-form-container nds-date-picker" id="${p}-dp"><div class="nds-form-control">` + act('date-picker-toggle', 'nds-hgi-calendar-03')
        + `<input type="text" class="nds-input nds-date-input" ${bind('date')}></div></div>`
        + `<div class="nds-form-container nds-time-picker" id="${p}-tp"><div class="nds-form-control">` + act('time-picker-toggle', 'nds-hgi-clock-01')
        + `<input type="text" class="nds-input nds-time-input"><input type="hidden" class="nds-time-value" ${bind('time')}></div></div>`
        + `<div class="nds-form-container"><div class="nds-form-control"><input type="tel" id="${p}-phone" class="nds-input nds-phone" ${bind('phone')}></div></div>`
        + `<div class="nds-form-container"><div class="nds-form-control"><input type="text" id="${p}-text" class="nds-input" ${bind('text')}></div></div>`
        + `<input type="checkbox" id="${p}-agree" ${bind('agree', true)}>`
        + `<div class="nds-form-container" id="${p}-sw-box"><div class="nds-form-control"><div class="nds-switch">`
        + `<input type="checkbox" id="${p}-sw" class="nds-switch-input" ${bind('sw', true)}>`
        + '<div class="nds-switch-track"><div class="nds-switch-thumb"></div></div></div></div></div>';
};
// Every write the Vue section makes, against the fields with prefix p.
async function driveFields(page, p) {
    await page.evaluate(async (p) => {
        await NDS.CustomSelect.setValue(document.getElementById(p + '-cs'), 'makkah');
        const dp = await NDS.DatePicker.create(document.querySelector('#' + p + '-dp .nds-date-input'));
        dp.selectDate(new Date(2026, 9, 15));
        dp.updateInput();
        await NDS.TimePicker.setValue(document.getElementById(p + '-tp'), '09:30');
        NDS.setValue(document.getElementById(p + '-text'), 'hello');
        NDS.setValue(document.getElementById(p + '-agree'), true);
        document.querySelector('#' + p + '-sw-box .nds-switch-track').click();
    }, p);
    const phone = page.locator(`#${p}-phone`);
    await phone.scrollIntoViewIfNeeded();
    await phone.focus();
    await page.keyboard.insertText('0501');
    await page.waitForTimeout(100);
}
function checkModel(name, m) {
    ok(`${name}: Custom Select reaches the model on .nds-select-value`, m.region === 'makkah', JSON.stringify(m));
    ok(`${name}: a Date Picker pick reaches the model`, m.date === '15/10/2026');
    ok(`${name}: Time Picker reaches the model on .nds-time-value`, m.time === '09:30');
    ok(`${name}: NDS.setValue reaches the model on a text field`, m.text === 'hello');
    ok(`${name}: NDS.setValue reaches the model on a checkbox`, m.agree === true);
    ok(`${name}: a Switch track click reaches the model, flipped once`, m.sw === true);
    ok(`${name}: a pasted phone number reaches the model stripped`, m.phone === '501');
}
const KEYS = ['region', 'date', 'time', 'phone', 'text', 'agree', 'sw'];

for (const v of SVELTE) {
    const page = await open('components/form.html');
    await page.evaluate(async ([markup, SVELTE_APP, v]) => {
        const props = 'export let region = "", date = "", time = "", phone = "", text = "", agree = false, sw = false;';
        const src = `<script>${props}
  function nds(node) { window.NDS?.Init.mount(node); return { destroy() { NDS.Init.destroy(node); } }; }
<\/script><div use:nds>${markup}</div>`;
        const App = await eval(SVELTE_APP)(src, v, { accessors: true });
        window.__sv = new App({ target: document.querySelector('.nds-section-body').appendChild(document.createElement('div')) });
    }, [FIELDS('s', (k, box) => (box ? `bind:checked={${k}}` : `bind:value={${k}}`)), SVELTE_APP, v]);
    await driveFields(page, 's');
    checkModel('Svelte ' + major(v), await page.evaluate((keys) => Object.fromEntries(keys.map((k) => [k, window.__sv[k]])), KEYS));
    await page.close();
}

for (const [v, zone] of ANGULAR) {
    const A = 'Angular ' + major(v);
    const page = await open('components/form.html');
    const booted = await page.evaluate(async ([markup, v, zone, ANGULAR_LOAD]) => {
        const ng = await eval(ANGULAR_LOAD)(v, zone);
        const { Component, ElementRef, inject } = ng.core;
        const { FormsModule } = ng.forms;
        const { bootstrapApplication } = ng.browser;
        class AppCmp {
            region = ''; date = ''; time = ''; phone = ''; text = ''; agree = false; sw = false;
            el = inject(ElementRef);
            ngAfterViewInit() { window.NDS?.Init.mount(this.el.nativeElement); }
        }
        Component({ selector: 'nds-model-app', standalone: true, imports: [FormsModule], template: markup })(AppCmp);
        document.querySelector('.nds-section-body').appendChild(document.createElement('nds-model-app'));
        const app = await bootstrapApplication(AppCmp);
        window.__ngModel = app.components[0].instance;
        return true;
    }, [FIELDS('a', (k) => `[(ngModel)]="${k}"`), v, zone, ANGULAR_LOAD]).catch((e) => e.message);
    ok(`${A} (ngModel): bootstrapped`, booted === true, booted === true ? '' : String(booted));
    if (booted === true) {
        await page.waitForTimeout(300);
        await driveFields(page, 'a');
        checkModel(A, await page.evaluate((keys) => Object.fromEntries(keys.map((k) => [k, window.__ngModel[k]])), KEYS));
    }
    await page.close();
}

// ---- DROPMENU SELECT ------------------------------------------------------
{
    const page = await open('components/dropmenu.html');
    // Built from the canon: the doc demo lives in a canon block.
    await page.evaluate(() => {
        const box = document.createElement('div');
        box.innerHTML = '<div class="nds-dropmenu" id="sv-dm" data-select-name="country">'
            + '<button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger"><span class="nds-label">Choose</span></button>'
            + '<div class="nds-dropmenu-menu" hidden><div class="nds-dropmenu-scroll">'
            + '<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="SA"><span class="nds-label">Saudi Arabia</span></button>'
            + '<button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="AE"><span class="nds-label">UAE</span></button>'
            + '</div></div></div>';
        document.querySelector('.nds-section-body').prepend(box);
        NDS.Init.mount(box);
    });
    await page.locator('#sv-dm .nds-dropmenu-trigger').click();
    const item = page.locator('.nds-dropmenu-item[data-value="AE"]');
    await item.waitFor({ timeout: 5000 });
    const want = await item.getAttribute('data-value');
    await page.evaluate(() => { window.__log.length = 0; });
    await item.click();
    const res = await page.evaluate(() => ({
        value: document.querySelector('#sv-dm input[data-nds-select-value]').value,
        log: window.__log.slice()
    }));
    ok('Dropmenu select: the hidden field holds the pick with input + change', res.value === want
        && res.log.join() === 'input:hidden,change:hidden', JSON.stringify(res));
    await page.close();
}

await browser.close();
console.log(failed ? `\n${failed} failed` : '\nall passed');
process.exit(failed ? 1 : 0);
