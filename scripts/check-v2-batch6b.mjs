// v2 consistency, batch 6b (plans/v2-consistency.md 2.9, 3.11, 3.13). Checked by what each part does;
// a call is written with the build's own names, so the run passes on the old build and the new.
//   3.11  Alert's color option (variant → status)
//   2.9   create() on a started element returns the live instance; options go through setOptions()
//   3.13  reinit() is init(): Main Nav re-adopts a re-rendered nav from init(), Slider re-measures in
//         refresh(el), Pagination.init() wires auto-pagination too
//
//   node scripts/check-v2-batch6b.mjs [baseUrl] [--new]
import { launch, log } from './lib/browser.mjs';

const BASE = (process.argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const NEW = process.argv.includes('--new');
const browser = await launch();
let failed = 0;
const check = (ok, msg) => { if (!ok) failed++; log(`${ok ? 'pass' : 'FAIL'} ${msg}`); };

async function open(path, width = 1280) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const warnings = [];
    page.on('console', (m) => { if (m.type() === 'warning') warnings.push(m.text()); });
    await page.goto(`${BASE}/${path}.html`, { waitUntil: 'load' });
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'));
    await page.evaluate(() => NDS.init.ready);
    await page.waitForTimeout(500);
    await page.evaluate(() => document.getElementById('nds-cookies-panel')?.remove());
    return { page, warnings };
}

// 3.11 Alert: the color option sets the alert's status.
{
    const { page } = await open('components/alert');
    const status = await page.evaluate(async (key) => {
        const el = await NDS.Alert.create({ [key]: 'error', title: 'b6b', target: document.querySelector('main'), prepend: true });
        return el?.getAttribute('data-status');
    }, NEW ? 'status' : 'variant');
    check(status === 'error', `alert: the color option sets data-status (${status})`);
    await page.context().close();
}

// 2.9 Chart: create() on a live chart returns it; setOptions() changes it.
{
    const { page } = await open('components/chart');
    const r = await page.evaluate(async () => {
        const el = [...document.querySelectorAll('.nds-chart')].find((x) => x.ndsChart && !x.closest('template, [data-canon], .nds-doc-variants'));
        if (!el) return null;
        const before = el.ndsChart;
        const back = await NDS.Chart.create(el, { title: 'again' });
        const same = back === before && el.ndsChart === before;
        const set = typeof before.setOptions === 'function';
        if (set) before.setOptions({});
        return { same, set, alive: !!el.ndsChart };
    });
    check(!!r, 'chart: found a live chart');
    if (r && NEW) check(r.same, 'chart: create() on a live chart returns it');
    if (r) check(r.set && r.alive, 'chart: setOptions() keeps the chart');
    await page.context().close();
}

// 2.9 Upload: create() on a live uploader returns it; setOptions() merges.
if (NEW) {
    const { page } = await open('components/upload');
    const r = await page.evaluate(async () => {
        const el = [...document.querySelectorAll('.nds-upload')].find((x) => x.ndsUpload && !x.closest('template, [data-canon], .nds-doc-variants'));
        if (!el) return null;
        const before = el.ndsUpload;
        const file = (n) => new File(['x'], n, { type: 'image/png' });
        const back = await NDS.Upload.create(el, { maxFiles: 1 });
        const same = back === before;
        before.clearAllFiles();
        const unchanged = !!before.addFile(file('a.png')) && !!before.addFile(file('b.png'));   // the create() options did not apply
        before.clearAllFiles();
        before.setOptions({ maxFiles: 1 });
        const merged = !!before.addFile(file('a.png')) && !before.addFile(file('b.png'));
        before.clearAllFiles();
        return { same, unchanged, merged };
    });
    check(!!r, 'upload: found a live uploader');
    if (r) {
        check(r.same && r.unchanged, 'upload: create() on a live uploader returns it unchanged');
        check(r.merged, 'upload: setOptions() merges the option');
    }
    await page.context().close();
}

// 3.13 Main Nav: a framework renders a fresh nav after a route change; NDS.init.refresh wires it.
for (const how of NEW ? ['refresh', 'init'] : ['refresh']) {
    const { page } = await open('components/button');
    const r = await page.evaluate(async (how) => {
        const html = await (await fetch(location.href)).text();
        const fresh = new DOMParser().parseFromString(html, 'text/html').querySelector('.nds-main-nav');
        document.querySelector('.nds-main-nav').replaceWith(document.adoptNode(fresh));
        if (how === 'refresh') await NDS.init.refresh(document.body); else NDS.MainNav.init();
        await new Promise((res) => setTimeout(res, 300));
        const trigger = document.querySelector('.nds-main-nav .nds-nav-primary .nds-has-menu > .nds-nav-link');
        trigger.click();
        await new Promise((res) => setTimeout(res, 300));
        return trigger.getAttribute('aria-expanded');
    }, how);
    check(r === 'true', `main nav: after a re-render, ${how === 'refresh' ? 'NDS.init.refresh' : 'NDS.MainNav.init()'} wires the new nav (menu opens: ${r})`);
    await page.context().close();
}

// 3.13 Main Nav: a framework renders the nav first and its collapse later; a refresh then wires it.
if (NEW) {
    const { page } = await open('components/button');
    const r = await page.evaluate(async () => {
        const html = await (await fetch(location.href)).text();
        const fresh = new DOMParser().parseFromString(html, 'text/html').querySelector('.nds-main-nav');
        const collapse = fresh.querySelector('#nds-nav-collapse');
        const slot = collapse.parentElement;
        collapse.remove();
        document.querySelector('.nds-main-nav').replaceWith(document.adoptNode(fresh));
        NDS.MainNav.init();
        slot.append(document.adoptNode(collapse));
        await NDS.init.refresh(document.body);
        await new Promise((res) => setTimeout(res, 300));
        const trigger = document.querySelector('.nds-main-nav .nds-nav-primary .nds-has-menu > .nds-nav-link');
        trigger.click();
        await new Promise((res) => setTimeout(res, 300));
        return trigger.getAttribute('aria-expanded');
    });
    check(r === 'true', `main nav: a collapse rendered after the nav is wired on refresh (menu opens: ${r})`);
    await page.context().close();
}

// 3.13 Slider: after max grows, re-measuring widens the reserved value width.
{
    const { page } = await open('components/slider');
    const r = await page.evaluate(async (fn) => {
        const box = [...document.querySelectorAll('.nds-slider-container:not(.nds-slider-range, .nds-stacked)')].find((x) => !x.closest('template, [data-canon], .nds-doc-variants') && x.getClientRects().length);
        const value = box?.querySelector('.nds-slider-value');
        if (!value) return null;
        const before = value.getBoundingClientRect().width;
        box.querySelector('input[type=range]').max = '100000000';
        NDS.Slider[fn](box);
        await new Promise((res) => setTimeout(res, 300));   // the width lands from a resize observer
        return { before: Math.round(before), after: Math.round(value.getBoundingClientRect().width) };
    }, NEW ? 'refresh' : 'reinit');
    check(r && r.after > r.before, `slider: re-measure after max grows widens the value (${r && `${r.before} → ${r.after}`})`);
    await page.context().close();
}

// 3.13 Pagination: an auto-paginated list added later is wired by init() (old: by reinit()).
{
    const { page } = await open('components/pagination');
    const r = await page.evaluate(async (fn) => {
        const src = [...document.querySelectorAll('script[data-canon]')].find((s) => s.textContent.includes('data-auto-pagination'));
        if (!src) return null;
        const box = document.createElement('div');
        box.innerHTML = src.textContent;
        document.querySelector('main').prepend(box);
        NDS.Pagination[fn]();
        await new Promise((res) => setTimeout(res, 300));
        return box.querySelector('.nds-pagination[data-auto-pagination]')?.hasAttribute('data-nds-auto-pagination-initialized');
    }, NEW ? 'init' : 'reinit');
    check(r === true, `pagination: ${NEW ? 'init()' : 'reinit()'} wires an auto-paginated list added later`);
    await page.context().close();
}

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
