// v2 consistency, batch 3 (plans/v2-consistency.md): the class renames. Each part is checked by what
// it does, found through markup the page itself ships, so the run passes on the old build and the new.
// The pickers' toggles are driven by check-time-picker / check-menus-in-modal / check-dropmenu-placement.
//
//   node scripts/check-v2-batch3.mjs [baseUrl] [--new]
//
// --new: the tag look is written with its v2 name, and the audit must name every old spelling.
import { launch, log } from './lib/browser.mjs';

const BASE = (process.argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const NEW = process.argv.includes('--new');
const browser = await launch();
let failed = 0;
const check = (ok, msg) => { if (!ok) failed++; log(`${ok ? 'pass' : 'FAIL'} ${msg}`); };

async function open(path, width = 1280) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/${path}`, { waitUntil: 'load' });
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'));
    await page.waitForTimeout(500);
    await page.evaluate(() => document.getElementById('nds-cookies-panel')?.remove());
    return page;
}

// 3.6 Upload: a picked file gets a row whose remove button removes it; a rejected file shows its error.
{
    const page = await open('components/upload.html');
    const r = await page.evaluate(async () => {
        const box = document.createElement('div');
        box.innerHTML = document.querySelector('script[data-canon]').textContent;
        document.querySelector('main, body').append(box);
        await NDS.init.mount(box);
        const input = box.querySelector('input[type=file]');
        const pick = (name, type) => {
            const dt = new DataTransfer();
            dt.items.add(new File(['x'], name, { type }));
            input.files = dt.files;
            input.dispatchEvent(new Event('change', { bubbles: true }));
        };
        const wait = () => new Promise((res) => setTimeout(res, 300));
        pick('a.png', 'image/png');
        await wait();
        const rows = () => [...box.querySelectorAll('.nds-file-item')];
        const added = rows().length;
        rows()[0]?.querySelector('.nds-file-actions button')?.click();
        await wait();
        const afterRemove = rows().length;
        pick('a.exe', 'application/octet-stream');
        await wait();
        const bad = rows().find((row) => row.getAttribute('data-status') === 'error');
        const errorText = bad ? bad.querySelector('.nds-file-error')?.textContent.trim() : '';
        box.remove();
        return { added, afterRemove, errorText, rejectedRow: !!bad };
    });
    check(r.added === 1, `upload: a picked file gets a row (${r.added})`);
    check(r.afterRemove === 0, `upload: the row's remove button removes it (${r.afterRemove} left)`);
    check(!r.rejectedRow || r.errorText.length > 0, `upload: a rejected file's row shows its error (${r.errorText || 'no row'})`);
    await page.context().close();
}

// 3.17 Card actions: the sign-in card's stacked actions are a column of full-width buttons.
{
    const page = await open('examples/sign-in.html');
    const r = await page.evaluate(() => {
        const actions = [...document.querySelectorAll('.nds-card-actions')].find((a) => a.querySelector(':scope > .nds-btn') && a.offsetWidth);
        if (!actions) return null;
        const btns = [...actions.querySelectorAll(':scope > .nds-btn')];
        return { dir: getComputedStyle(actions).flexDirection, same: btns.every((b) => Math.abs(b.offsetWidth - actions.clientWidth) < 2) };
    });
    check(r && r.dir === 'column', `card actions: stacked actions run in a column (${r && r.dir})`);
    check(r && r.same, 'card actions: each button is the full width');
    await page.context().close();
}

// 3.16 Section float action: icon-only on phones, labels shown on a desktop.
for (const [width, hidden] of [[390, true], [1280, false]]) {
    const page = await open('examples/manage-records.html', width);
    const r = await page.evaluate(() => {
        const label = document.querySelector('.nds-section-head > .nds-section-action:first-child .nds-btn .nds-label');
        if (!label) return null;
        const s = getComputedStyle(label);
        return s.display === 'none' || s.clipPath !== 'none' || label.getBoundingClientRect().width < 2;
    });
    check(r === hidden, `section action: labels ${hidden ? 'hide' : 'show'} at ${width}px`);
    await page.context().close();
}

// v2 only: a button whose label data-hidden hides is square there (section action, Filter's toolbar).
if (NEW) {
    for (const path of ['examples/manage-records.html', 'components/filter.html']) {
        const page = await open(path, 390);
        const r = await page.evaluate(() => {
            const label = [...document.querySelectorAll('.nds-btn > .nds-label[data-hidden~="sm"]')].find((l) => l.parentElement.offsetWidth && !l.closest('.nds-main-nav'));
            if (!label) return null;
            const b = label.parentElement.getBoundingClientRect();
            return { w: Math.round(b.width), h: Math.round(b.height) };
        });
        check(r && Math.abs(r.w - r.h) <= 1, `${path}: a button with a hidden label is square at 390px (${r && `${r.w}x${r.h}`})`);
        await page.context().close();
    }
}

// 3.10 Tag: the solid look fills a status tag with its color and light text.
{
    const page = await open('components/tag.html');
    const r = await page.evaluate((cls) => {
        const make = (extra) => {
            const t = document.createElement('span');
            t.className = `nds-tag ${extra}`;
            t.setAttribute('data-status', 'success');
            t.innerHTML = '<span class="nds-label">Done</span>';
            document.querySelector('main, body').append(t);
            const s = getComputedStyle(t);
            const out = { bg: s.backgroundColor, color: getComputedStyle(t.querySelector('.nds-label')).color };
            t.remove();
            return out;
        };
        return { light: make(''), solid: make(cls) };
    }, NEW ? 'nds-dark' : 'nds-inverted');
    check(r.solid.bg !== r.light.bg && r.solid.color !== r.light.color, `tag: the solid look changes fill and text (${r.light.bg} → ${r.solid.bg})`);
    await page.context().close();
}

// v2 only: the audit names every old spelling, in markup, in a <template>, and an old knob inline.
if (NEW) {
    const page = await open('components/button.html');
    const found = await page.evaluate(async () => {
        const box = document.createElement('div');
        box.innerHTML = '<div class="nds-date-picker"><button class="date-picker-toggle"></button></div>'
            + '<div class="nds-persona"><span class="nds-persona-desc" style="--persona-desc-FS: 12px"></span></div>'
            + '<dl class="nds-definition-list"><div class="nds-definition-item"><dt>a</dt><dd class="nds-item-action">b</dd></div></dl>'
            + '<div class="nds-upload"><input type="file" class="nds-file-input"><button class="nds-browse-btn"></button><span class="nds-drop-hint"></span></div>'
            + '<template class="nds-file-item-template"><li class="nds-file-item"><span class="nds-error-message"></span><button class="nds-remove-file"></button></li></template>'
            + '<span class="nds-tag nds-inverted" data-status="success"></span><span class="nds-tag nds-outline" data-status="info"></span><span class="nds-tag nds-ghost"></span>'
            + '<div class="nds-section-head"><div class="nds-section-action nds-minimal"><button class="nds-btn"><span class="nds-label">x</span></button></div></div>';
        document.body.append(box);
        const findings = await NDS.init.audit();
        return findings.filter((f) => /^migration/.test(f.rule)).map((f) => f.message).join('\n');
    });
    for (const name of ['date-picker-toggle', 'nds-persona-desc', '--persona-desc-FS', 'nds-item-action', 'nds-file-input', 'nds-browse-btn', 'nds-drop-hint', 'nds-error-message', 'nds-remove-file', 'nds-inverted', 'nds-outline', 'nds-ghost', 'nds-minimal']) {
        check(new RegExp(`(?<![\\w-])${name}(?![\\w-])`).test(found), `audit: names the old ${name}`);
    }
    await page.context().close();
}

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
