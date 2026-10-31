// v2 consistency, batch 2 (plans/v2-consistency.md): the additive trap fixes. The old forms must keep
// working (both runs); --new also checks what batch 2 adds.
//
//   node scripts/check-v2-batch2.mjs [baseUrl] [--new]
import { launch, log } from './lib/browser.mjs';

const BASE = (process.argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const NEW = process.argv.includes('--new');
const browser = await launch();
let failed = 0;
const check = (ok, msg) => { if (!ok) failed++; log(`${ok ? 'pass' : 'FAIL'} ${msg}`); };

async function open(path) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/${path}`, { waitUntil: 'load' });
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'));
    await page.waitForTimeout(500);
    await page.evaluate(() => document.getElementById('nds-cookies-panel')?.remove());
    return page;
}

// 2.1 Side menu (a Drawer): the marked page's button is active; --new: its link says aria-current="page",
// and the mark moving takes it along.
{
    const page = await open('components/button.html');
    const r = await page.evaluate(async () => {
        const menu = document.querySelector('.nds-sidemenu');
        const li = menu.querySelector('li[data-state~="active"]');
        const link = li.querySelector(':scope > a');
        const before = { btn: NDS.state.has(link, 'active'), aria: link.getAttribute('aria-current') };
        const other = [...menu.querySelectorAll('li')].find((x) => x !== li && x.querySelector(':scope > a') && !x.querySelector('ul'));
        NDS.state.remove(li, 'active');
        NDS.state.add(other, 'active');
        await new Promise((res) => setTimeout(res, 300));
        const otherLink = other.querySelector(':scope > a');
        return { before, movedBtn: NDS.state.has(otherLink, 'active'), oldAria: link.getAttribute('aria-current'), newAria: otherLink.getAttribute('aria-current') };
    });
    check(r.before.btn, 'sidemenu: the marked page link is active');
    check(r.movedBtn, 'sidemenu: a moved mark moves the active link');
    if (NEW) {
        check(r.before.aria === 'page', `sidemenu: the marked link says aria-current="page" (${r.before.aria})`);
        check(r.oldAria === null && r.newAria === 'page', `sidemenu: aria-current moves with the mark (old ${r.oldAria}, new ${r.newAria})`);
    }
    await page.context().close();
}

// 2.1 --new: an aria-current the author wrote stays theirs.
if (NEW) {
    const page = await open('components/button.html');
    const r = await page.evaluate(async () => {
        const menu = document.querySelector('.nds-sidemenu');
        const li = [...menu.querySelectorAll('li')].find((x) => !NDS.state.has(x, 'active') && x.querySelector(':scope > a') && !x.querySelector('ul'));
        const link = li.querySelector(':scope > a');
        link.setAttribute('aria-current', 'location');
        NDS.state.add(li, 'active');
        await new Promise((res) => setTimeout(res, 200));
        const marked = link.getAttribute('aria-current');
        NDS.state.remove(li, 'active');
        await new Promise((res) => setTimeout(res, 200));
        return { marked, unmarked: link.getAttribute('aria-current') };
    });
    check(r.marked === 'location' && r.unmarked === 'location', `sidemenu: an author's aria-current is never replaced or cleared (${r.marked}, ${r.unmarked})`);
    await page.context().close();
}

// 2.1 TOC: the section in view is marked; --new: with aria-current="true", never "page".
{
    const page = await open('guides/get-started.html');
    const r = await page.evaluate(async () => {
        const toc = document.querySelector('.nds-toc');
        if (!toc) return null;
        const links = [...toc.querySelectorAll('a[href^="#"]')];
        const target = document.getElementById(links[2].getAttribute('href').slice(1));
        target.scrollIntoView();
        await new Promise((res) => setTimeout(res, 600));
        const active = links.filter((a) => NDS.state.has(a, 'active'));
        return { active: active.length, aria: active.map((a) => a.getAttribute('aria-current')), anyPage: links.some((a) => a.getAttribute('aria-current') === 'page') };
    });
    check(r && r.active === 1, `toc: one link marks the section in view (${r && r.active})`);
    if (NEW) check(r && r.aria[0] === 'true' && !r.anyPage, `toc: that link says aria-current="true", none says "page" (${r && r.aria})`);
    await page.context().close();
}

// 2.1 Stepper: the current step is marked; --new: it says aria-current="step", and only it.
{
    const page = await open('components/stepper.html');
    const r = await page.evaluate(() => {
        const stepper = document.querySelector('.nds-stepper:not(.nds-static)');
        const steps = [...stepper.querySelectorAll('.nds-stepper-step')];
        return { current: steps.filter((s) => NDS.state.has(s, 'current')).length, aria: steps.map((s) => s.getAttribute('aria-current')).filter(Boolean) };
    });
    check(r.current === 1, 'stepper: one step is current');
    if (NEW) check(r.aria.length === 1 && r.aria[0] === 'step', `stepper: only that step says aria-current="step" (${r.aria})`);
    await page.context().close();
}

// 2.2 + 2.4 Upload: data-auto-upload="true" uploads, "false" does not; --new: bare uploads, and
// data-allowed-types takes spaces.
{
    const page = await open('components/upload.html');
    await page.route('**/never-answers', () => {});
    const run = (auto, types) => page.evaluate(async ([auto, types]) => {
        const box = document.createElement('div');
        box.innerHTML = document.querySelector('script[data-canon]').textContent;
        const up = box.querySelector('.nds-upload');
        up.setAttribute('data-upload-url', '/never-answers');
        if (auto !== null) up.setAttribute('data-auto-upload', auto);
        if (types) up.setAttribute('data-allowed-types', types);
        document.querySelector('main, body').append(box);
        await NDS.init.mount(box);
        const seen = { start: false, select: false, invalid: false };
        ['start', 'select', 'invalid'].forEach((e) => box.addEventListener(`nds:upload:${e}`, () => { seen[e] = true; }));
        const input = box.querySelector('input[type=file]');
        const dt = new DataTransfer();
        dt.items.add(new File(['x'], 'a.png', { type: 'image/png' }));
        input.files = dt.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        await new Promise((res) => setTimeout(res, 400));
        box.remove();
        return seen;
    }, [auto, types]);
    check((await run('true')).start, 'upload: data-auto-upload="true" starts the upload');
    check(!(await run('false')).start, 'upload: data-auto-upload="false" does not');
    check(!(await run(null)).start, 'upload: no data-auto-upload does not');
    check((await run('true', 'jpg,png')).select, 'upload: data-allowed-types with commas accepts a png');
    if (NEW) {
        check((await run('')).start, 'upload: a bare data-auto-upload starts the upload');
        check(!(await run('0')).start && !(await run('False')).start, 'upload: a printed false ("0", "False") does not');
        const spaced = await run('true', 'jpg png');
        check(spaced.select && !spaced.invalid, 'upload: data-allowed-types with spaces accepts a png');
    }
    await page.context().close();
}

// 3.7 Alert: .nds-alert-close closes it; --new: so does a button with data-alert-close.
{
    const page = await open('components/alert.html');
    const close = (hook) => page.evaluate(async (hook) => {
        const box = document.createElement('div');
        box.innerHTML = `<div class="nds-alert" data-status="info"><div class="nds-alert-content"><p>x</p></div><button type="button" ${hook}>Close</button></div>`;
        document.querySelector('main, body').append(box);
        await NDS.init.mount(box);
        box.querySelector('button').click();
        await new Promise((res) => setTimeout(res, 800));
        const alert = box.querySelector('.nds-alert');
        const gone = !alert || !alert.isConnected || alert.hidden || getComputedStyle(alert).display === 'none';
        box.remove();
        return gone;
    }, hook);
    check(await close('class="nds-btn nds-alert-close"'), 'alert: .nds-alert-close closes it');
    if (NEW) check(await close('class="nds-btn" data-alert-close'), 'alert: a data-alert-close button closes it');
    await page.context().close();
}

// 2.4 --new: one splitter for every list.
if (NEW) {
    const page = await open('components/button.html');
    const r = await page.evaluate(() => JSON.stringify([NDS.splitList('a b'), NDS.splitList('a,b'), NDS.splitList(' a , b  c '), NDS.splitList(''), NDS.splitList(null)]));
    check(r === '[["a","b"],["a","b"],["a","b","c"],[],[]]', `splitList: spaces and commas both split (${r})`);
    await page.context().close();
}

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
