// Contrast inside every area fill (plans/area-themes.md): each part's canon, taken from its built doc
// page, sits in a section with the fill's data-theme words and is measured against the color behind it.
//
//   text      4.5:1 (3:1 at 24px, or 18.66px bold): labels, links, field text and placeholder, helper text, tags, chips
//   ui        3:1: field border, checkbox / radio / switch edge and checked fill, focus ring, button indicator
//   states    rest, hover, pressed, selected; disabled is listed but exempt (WCAG 1.4.3)
//   fills     every $area-fills entry, and a gradient's light end, which is the hardest
//
//   node scripts/check-area-contrast.mjs     DARK=1 (dark page) · ONLY=<fill name> · END=<css color> (try another gradient end)
// Needs the dev server on :4002 (SITE=<base url> for another). Exit code = failures.
import { launch, step, STEP_MS } from './lib/browser.mjs';

const SITE = process.env.SITE || 'http://localhost:4002/NDS-vanilla/';
// ponytail: mirrors $area-fills in _mixins.scss by hand; a new fill is a row here too.
const FILLS = [
    { name: 'primary', theme: 'dark oncolor primary' },
    { name: 'primary gradient, light end', theme: 'dark oncolor primary', color: process.env.END || 'var(--background-primary)' },
    { name: 'neutral', theme: 'dark neutral' },
].filter((fill) => !process.env.ONLY || fill.name.startsWith(process.env.ONLY));
const CANONS = { button: 'btn-standard', form: 'field-text', checkbox: 'check-single', radio: 'radio-group', switch: 'switch-single', tag: 'tag-single', chips: 'chip-single', link: 'link-single' };
const BUTTONS = ['nds-primary', 'nds-neutral', 'nds-secondary', 'nds-secondary-outline', 'nds-subtle', 'nds-transparent', 'nds-primary nds-destructive', 'nds-secondary nds-destructive', 'nds-transparent nds-destructive'];

const browser = await step('launch', () => launch({ timeout: STEP_MS }));
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await step('load', () => page.goto(SITE + 'playground.html', { waitUntil: 'load' }));
if (process.env.DARK) await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));

const canons = await step('canons', () => page.evaluate(async ({ site, canons }) => {
    const out = {};
    for (const [doc, id] of Object.entries(canons)) {
        const html = await (await fetch(`${site}components/${doc}.html`)).text();
        out[doc] = new DOMParser().parseFromString(html, 'text/html').getElementById(id)?.textContent.trim();
    }
    return out;
}, { site: SITE, canons: CANONS }));
const missing = Object.keys(CANONS).filter((doc) => !canons[doc]);
if (missing.length) throw new Error(`canon not found: ${missing.join(', ')}`);

let failed = 0;
for (const fill of FILLS) {
    const rows = await step(fill.name, () => page.evaluate(({ fill, canons, buttons }) => {
        // Any CSS color (a hex token, a name) resolves through a probe's computed color first.
        const probe = document.body.appendChild(document.createElement('i'));
        const parse = (value) => {
            if (value && !/^(rgb|color\()/.test(value)) { probe.style.color = ''; probe.style.color = value; value = probe.style.color ? getComputedStyle(probe).color : ''; }
            const n = value.match(/[\d.]+/g)?.map(Number);
            if (!n) return null;
            if (value.startsWith('color(srgb')) return [n[0] * 255, n[1] * 255, n[2] * 255, n[3] ?? 1];
            if (value.startsWith('rgb')) return [n[0], n[1], n[2], n[3] ?? 1];
            return null;
        };
        const over = (top, bottom) => top.slice(0, 3).map((c, i) => c * top[3] + bottom[i] * (1 - top[3])).concat(1);
        const luminance = (c) => { const [r, g, b] = c.slice(0, 3).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
        const ratio = (a, b) => { const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
        // The color behind an element: every ancestor's background, composited from the page down.
        const behind = (el, self = false) => {
            const chain = [];
            for (let node = self ? el : el.parentElement; node; node = node.parentElement) chain.push(parse(getComputedStyle(node).backgroundColor));
            return chain.reverse().reduce((acc, c) => (c && c[3] ? over(c, acc) : acc), [255, 255, 255, 1]);
        };
        const host = document.createElement('section');
        host.className = 'nds-content-section';
        host.setAttribute('data-theme', fill.theme);
        if (fill.color) host.style.setProperty('--nds-area-color', fill.color);
        host.innerHTML = `<div class="nds-section-wrapper"><div class="nds-section-head"><h2 class="nds-section-title">Title</h2><p class="nds-section-description">Description</p></div><div class="nds-section-body"><p>Body text</p></div></div>`;
        const body = host.querySelector('.nds-section-body');
        document.body.prepend(host);
        const add = (html) => { const box = document.createElement('div'); box.innerHTML = html; body.append(box); return box; };
        const rows = [];
        const text = (name, el, pseudo, state = '') => {
            if (!el) return rows.push({ name, missing: true });
            const cs = getComputedStyle(el, pseudo);
            const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight, 10) >= 700;
            const fg = parse(cs.color), bg = behind(el, true);
            rows.push({ name, state, value: ratio(over(fg, bg), bg), need: size >= 24 || (bold && size >= 18.66) ? 3 : 4.5 });
        };
        const ui = (name, color, el, state = '') => {
            const c = parse(color || '');
            if (!c || !c[3]) return rows.push({ name, state, missing: true });
            const bg = behind(el);
            rows.push({ name, state, value: ratio(over(c, bg), bg), need: 3 });
        };

        text('section title', host.querySelector('.nds-section-title'));
        text('section description', host.querySelector('.nds-section-description'));
        text('body text', host.querySelector('.nds-section-body p'));

        for (const variant of buttons) {
            const box = add(canons.button.replace('nds-btn nds-primary', `nds-btn ${variant}`));
            const btn = box.querySelector('.nds-btn');
            const name = `button ${variant.replace(/nds-/g, '')}`;
            for (const state of ['', 'hover', 'pressed', 'selected']) {
                btn.setAttribute('data-state', state);
                text(name, btn, null, state || 'rest');
                const indicator = getComputedStyle(btn).getPropertyValue(state === 'pressed' ? '--_btn-indicator-active' : state === 'selected' ? '--_btn-indicator-selected' : '--_btn-indicator-color');
                if (state) ui(`${name} indicator`, indicator.trim(), btn, state);
            }
            btn.setAttribute('data-state', 'focused');
            ui(`${name} focus ring`, getComputedStyle(btn).outlineColor, btn, 'focus');
            btn.removeAttribute('data-state');
            btn.disabled = true;
            text(name, btn, null, 'disabled (exempt)');
        }

        const link = add(canons.link).querySelector('a');
        text('link', link);

        const field = add(canons.form);
        const input = field.querySelector('input');
        text('field label', field.querySelector('label .nds-label, label'));
        text('field placeholder', input, '::placeholder');
        input.value = 'Typed text';
        text('field text', input);
        ui('field border', getComputedStyle(field.querySelector('.nds-form-control')).borderColor, field.querySelector('.nds-form-control'), 'rest');
        const container = field.querySelector('.nds-form-container') || field.firstElementChild;
        for (const state of ['hovered', 'focus']) {
            container.setAttribute('data-state', state);
            ui('field border', getComputedStyle(field.querySelector('.nds-form-control')).borderColor, field.querySelector('.nds-form-control'), state);
        }

        for (const kind of ['checkbox', 'radio', 'switch']) {
            const box = add(canons[kind]);
            const control = box.querySelector(`.nds-${kind === 'switch' ? 'switch-toggle' : `${kind}-input`}`) || box.querySelector('input');
            text(`${kind} label`, box.querySelector('label .nds-label, label'));
            ui(`${kind} edge`, getComputedStyle(control).borderColor, control, 'unchecked');
            const input = box.querySelector('input');
            input.checked = true;
            const cs = getComputedStyle(control);
            ui(`${kind} fill`, parse(cs.backgroundColor)?.[3] ? cs.backgroundColor : cs.borderColor, control, 'checked');
        }

        const tag = add(canons.tag).querySelector('.nds-tag');
        text('tag', tag);
        const chip = add(canons.chips).querySelector('.nds-chip, .nds-chips button, button');
        text('chip', chip);
        chip.setAttribute('data-state', 'selected');
        text('chip', chip, null, 'selected');

        host.remove();
        probe.remove();
        return rows;
    }, { fill, canons, buttons: BUTTONS }));

    console.log(`\n== ${fill.name}${process.env.DARK ? ' (dark page)' : ''}`);
    for (const row of rows) {
        const exempt = /exempt/.test(row.state);
        if (row.missing) { console.log(`SKIP  ${row.name}${row.state ? ` [${row.state}]` : ''} — not found or transparent`); continue; }
        const pass = exempt || row.value >= row.need;
        if (!pass) failed++;
        console.log(`${exempt ? 'INFO' : pass ? 'PASS' : 'FAIL'}  ${row.name}${row.state ? ` [${row.state}]` : ''}  ${row.value.toFixed(2)} (needs ${row.need})`);
    }
}
await browser.close();
console.log(`\n${failed ? `${failed} below the bar` : 'all pass'}`);
process.exit(failed);
