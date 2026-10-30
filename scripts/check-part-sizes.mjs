// Part sizes (plans/part-sizes.md): a knob always wins, then the part's own size class, then a
// parent's step (a List's size), then the default. A button's size knobs work on the button only.
//
//   nested   a list nested in a list sizes its own parts, at every size pair
//   kept     a part's own size class is kept in a bare, SM and LG list
//   knob     a knob on the list beats the list's step; a wrapper's knob beats a part's size class
//   button   a wrapper's --btn-size does not reach a button; a set height keeps its label in a List
//   library  the Library's list keeps its nds-xs tags at XS (20px)
//
//   node scripts/check-part-sizes.mjs     ENGINE=webkit · CSS=<old nds-main.min.css> (must fail on HEAD~4's)
// Needs the dev server on :4002 (SITE=<base url> for another). Each step logs its time; a stuck one fails in STEP_MS.
import { readFileSync } from 'node:fs';
import { launch, log, step, STEP_MS } from './lib/browser.mjs';

const SITE = process.env.SITE || 'http://localhost:4002/NDS-vanilla/';
const CSS = process.env.CSS && readFileSync(process.env.CSS);
let failed = 0;
const ok = (name, pass, detail = '') => {
    if (!pass) failed++;
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

const browser = await step('launch', () => launch({ timeout: STEP_MS }));
const open = async (path) => {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    if (CSS) await page.route('**/assets/css/nds-main.min.css*', (r) => r.fulfill({ body: CSS, contentType: 'text/css' }));
    await step(`load ${path}`, () => page.goto(SITE + path, { waitUntil: 'load' }));
    return page;
};

const page = await open('playground.html');
const res = await step('measure fixtures', () => page.evaluate(() => {
    const host = document.createElement('div');
    host.style.width = '900px';
    document.body.prepend(host);
    const box = (e) => { const r = e.getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}`; };
    const mount = (html) => { host.innerHTML = html; return host; };
    const out = { nested: [], kept: [] };

    // Every part with no size class; a meta fills its row, so its height and font only.
    const parts = (c = '') => `<span class="probe"></span><span class="nds-date-tile ${c}"><span class="nds-date-tile-day">1</span></span>`
        + `<span class="nds-chip ${c}">c</span><span class="nds-meta ${c}">m</span><button class="nds-btn ${c}"><span class="nds-label">b</span></button>`
        + `<span class="nds-featured-icon ${c}"></span><span class="nds-avatar ${c}"></span><span class="nds-tag ${c === 'nds-lg' ? 'nds-xs' : c}">t</span>`; // a tag has no LG
    // The probe reads the inherited steps: only nested lists compare them (a kept class differs there by design).
    const read = (li, probe = true) => [...li.children].filter((e) => !e.matches('ul') && (probe || !e.matches('.probe'))).map((e) => {
        const s = getComputedStyle(e);
        if (e.matches('.probe')) return ['--progress-size', '--star-size', '--_star-size-base', '--_progress-size-base', '--_card-value-FS-base', '--_metric-value-FS-base'].map((v) => s.getPropertyValue(v).trim()).join(',');
        return `${e.className.split(' ')[0]} ${e.matches('.nds-meta') ? Math.round(e.getBoundingClientRect().height) : box(e)} ${s.fontSize}`;
    }).join(' | ');
    const list = (size, inner = '', c = '') => `<ul class="nds-list nds-grid ${size}"><li class="nds-card">${parts(c)}${inner}</li></ul>`;

    const alone = {};
    for (const s of ['', 'nds-sm', 'nds-lg']) alone[s] = read(mount(list(s)).querySelector('li'));
    for (const outer of ['', 'nds-sm', 'nds-lg']) for (const inner of ['', 'nds-sm', 'nds-lg']) {
        const got = read(mount(list(outer, list(inner))).querySelector('li li'));
        out.nested.push([`${inner || 'bare'} in ${outer || 'bare'}`, got === alone[inner], got === alone[inner] ? '' : `${got}  vs alone  ${alone[inner]}`]);
    }
    for (const c of ['nds-sm', 'nds-md', 'nds-lg']) {
        const own = read(mount(`<div>${parts(c)}</div>`).firstElementChild, false);
        for (const l of ['', 'nds-sm', 'nds-lg']) {
            const got = read(mount(list(l, '', c)).querySelector('li'), false);
            out.kept.push([`${c} parts in a ${l || 'bare'} list`, got === own, got === own ? '' : `${got}  vs own  ${own}`]);
        }
    }

    const q = (sel) => host.querySelector(sel);
    mount(`<ul class="nds-list nds-grid nds-sm" style="--featuredicon-size:56px;--avatar-size:96px;--tag-height:40px"><li class="nds-card">
        <span class="nds-featured-icon"></span><span class="nds-avatar"></span><span class="nds-tag">t</span></li></ul>
        <div style="--avatar-size:56px"><span class="nds-avatar nds-sm" id="wrapped"></span></div>`);
    out.knob = { icon: box(q('.nds-featured-icon')), avatar: box(q('.nds-avatar')), tag: box(q('.nds-tag')).split('x')[1], wrapped: box(q('#wrapped')) };

    const label = (e) => `${box(e)} ${getComputedStyle(e.querySelector('.nds-label')).fontSize}`;
    mount(`<div style="--btn-size:48px"><button class="nds-btn" id="w"><span class="nds-label">b</span></button></div>
        <button class="nds-btn" style="--btn-size:48px" id="o"><span class="nds-label">b</span></button>
        <ul class="nds-list nds-grid nds-sm"><li class="nds-card"><button class="nds-btn" style="--btn-size:48px" id="i"><span class="nds-label">b</span></button></li></ul>`);
    out.button = { wrapped: label(q('#w')), outside: label(q('#o')), inSmList: label(q('#i')) };
    return out;
}));

for (const [name, pass, detail] of res.nested) ok(`nested: ${name}`, pass, detail);
for (const [name, pass, detail] of res.kept) ok(`kept: ${name}`, pass, detail);
const k = res.knob;
ok('knob: a knob on a List beats its step', k.icon === '56x56' && k.avatar === '96x96' && k.tag === '40', JSON.stringify(k));
ok('knob: a wrapper\'s --avatar-size beats an avatar\'s nds-sm', k.wrapped === '56x56', k.wrapped);
const b = res.button;
ok('button: a wrapper\'s --btn-size does not reach a button', /x40 /.test(b.wrapped), b.wrapped);
ok('button: a 48px button keeps its label in an SM list', b.inSmList.split(' ')[1] === b.outside.split(' ')[1], JSON.stringify(b));

const lib = await open('components/');
const tags = await step('measure the Library tags', () => lib.evaluate(() => {
    const shown = [...document.querySelectorAll('ul.nds-list .nds-tag.nds-xs')].filter((t) => t.getClientRects().length);
    return { count: shown.length, heights: [...new Set(shown.map((t) => Math.round(t.getBoundingClientRect().height)))] };
}));
ok('library: the Library list keeps its nds-xs tags at 20px', tags.count > 0 && tags.heights.join() === '20', JSON.stringify(tags));

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
