// v2 consistency, batch 1 (plans/v2-consistency.md): what each renamed state DOES, checked by its
// outcome, not its name, so the same run passes before and after the rename.
//
//   node scripts/check-v2-batch1.mjs [baseUrl] [--new]
//
// --new: the few fixtures that must write a name (the opt-in on <time>, the layout class) use
// the v2 names, and the v2-only cases run (a <time> under a Hijri ancestor, the upload timeout in ms).
import { launch, log } from './lib/browser.mjs';

const BASE = (process.argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const NEW = process.argv.includes('--new');
const browser = await launch();
let failed = 0;
const check = (ok, msg) => { if (!ok) failed++; log(`${ok ? 'pass' : 'FAIL'} ${msg}`); };

async function open(path, { theme } = {}) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    if (theme) await ctx.addInitScript((t) => { try { localStorage.setItem('nds-theme', t); } catch {} }, theme);
    const page = await ctx.newPage();
    await page.goto(`${BASE}/${path}`, { waitUntil: 'load' });
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'));
    await page.waitForTimeout(500);
    // The cookie panel covers the lower rows and takes the pointer.
    await page.evaluate(() => document.getElementById('nds-cookies-panel')?.remove());
    return page;
}

// A computed-style signature: two elements that look alike share one.
const SIG = (el) => { const s = getComputedStyle(el); return [s.backgroundColor, s.width, s.transform, s.opacity, s.filter, s.boxShadow, s.outlineStyle, s.color].join('|'); };

// 1.1 Date: a <time> opted into Hijri renders a Hijri year.
{
    const page = await open('core/date.html');
    const opt = NEW ? 'data-calendar="hijri"' : 'data-date-calendar="hijri"';
    const text = await page.evaluate(async (opt) => {
        const box = document.createElement('div');
        box.innerHTML = `<time datetime="2026-10-01" ${opt}></time>`;
        document.body.append(box);
        await NDS.init.ready;
        NDS.Date.fill(box);
        return box.textContent;
    }, opt);
    check(/14\d\d/.test(text), `date: a <time> opted into Hijri shows a Hijri year (${text.trim()})`);
    const parts = await page.evaluate(() => {
        const box = document.createElement('div');
        box.innerHTML = '<time class="nds-date-tile" datetime="2026-10-01" data-calendar="hijri"></time>';
        document.body.append(box);
        NDS.Date.fill(box);
        NDS.Date.fill(box);
        return box.querySelector('time').children.length;
    });
    check(parts > 1, `date: a Date Tile with its own data-calendar keeps its parts (${parts})`);
    if (NEW) {
        const t2 = await page.evaluate(() => {
            const box = document.createElement('div');
            box.setAttribute('data-calendar', 'hijri');
            box.innerHTML = '<time datetime="2026-10-01" data-calendar="" data-date-format="DD/MM/YYYY"></time>';
            document.body.append(box);
            NDS.Date.fill(box);
            return box.textContent;
        });
        check(/14\d\d/.test(t2), `date: an opted-in <time> under a Hijri ancestor shows Hijri (${t2.trim()})`);
    }
    await page.context().close();
}

// 1.4 Swiper: the current bullet looks different, and the look moves on Next.
{
    const page = await open('components/swiper.html');
    const sw = page.locator('.nds-swiper').first();
    const before = await sw.locator('.nds-bullet').evaluateAll((els, sig) => els.map((e) => new Function('el', `return (${sig})(el)`)(e)), SIG.toString());
    await sw.locator('.nds-next').click();
    await page.waitForTimeout(700);
    const after = await sw.locator('.nds-bullet').evaluateAll((els, sig) => els.map((e) => new Function('el', `return (${sig})(el)`)(e)), SIG.toString());
    check(before.length > 1 && new Set(before).size > 1, 'swiper: the current bullet looks different from the others');
    check(before[0] !== after[0], 'swiper: the current-bullet look moves on Next');

    // Spotlight: mount the canon with .nds-spotlight; the open slide looks different, and moves.
    const sigs = await page.evaluate(async (sig) => {
        const s = new Function('el', `return (${sig})(el)`);
        const canon = document.querySelector('script[data-canon]');
        const box = document.createElement('div');
        box.innerHTML = canon.textContent;
        box.querySelector('.nds-swiper').classList.add('nds-spotlight');
        document.querySelector('main, body').append(box);
        await NDS.init.mount(box);
        await new Promise((r) => setTimeout(r, 600));
        // Spotlight scales the slide's content, not the slide (a transform on the slide moves its snap).
        const read = () => [...box.querySelectorAll('.nds-swiper-slide:not(.nds-swiper-clone)')].map((sl) => s(sl.firstElementChild));
        const a = read();
        box.querySelector('.nds-next').click();
        await new Promise((r) => setTimeout(r, 900));
        return { a, b: read() };
    }, SIG.toString());
    check(new Set(sigs.a).size > 1, 'swiper spotlight: the open slide looks different from the others');
    check(sigs.a.join() !== sigs.b.join(), 'swiper spotlight: the look moves on Next');
    await page.context().close();
}

// 1.5 Chart: hover shows the tooltip, dims the bar or slice, grows a line dot.
{
    const page = await open('components/chart.html');
    const charts = page.locator('.nds-chart');
    const bar = charts.nth(0).locator('.nds-chart-bar').first();
    await bar.hover();
    await page.waitForTimeout(300);
    const tip = await charts.nth(0).locator('.nds-chart-tooltip').evaluate((t) => { const s = getComputedStyle(t); return s.visibility === 'visible' && s.opacity === '1'; });
    const barOp = await bar.evaluate((b) => getComputedStyle(b).opacity);
    check(tip, 'chart: hovering a bar shows the tooltip');
    check(barOp !== '1', `chart: the hovered bar changes opacity (${barOp})`);
    // Point at the top of the donut's ring (its centre is a hole), then at the line chart's middle.
    const at = async (chart, fx, fy) => {
        await chart.scrollIntoViewIfNeeded();
        const b = await chart.locator('svg').first().boundingBox();
        await page.mouse.move(b.x + b.width * fx, b.y + b.height * fy);
        await page.waitForTimeout(300);
    };
    await at(charts.nth(1), 0.5, 0.15);
    check(await charts.nth(1).evaluate((c) => [...c.querySelectorAll('.nds-chart-slice')].some((e) => getComputedStyle(e).opacity !== '1')), 'chart: the hovered slice changes opacity');
    await at(charts.nth(2), 0.5, 0.5);
    const dots = await charts.nth(2).locator('.nds-chart-dot').evaluateAll((els) => els.filter((d) => getComputedStyle(d).display !== 'none').length);
    check(dots > 0, `chart: hovering a line chart shows a dot (${dots})`);
    await page.context().close();
}

// 1.6 Editor: the placeholder shows only while empty; the source view toggles.
{
    const page = await open('components/editor.html');
    const ed = page.locator('.nds-editor').first();
    const ph = () => ed.locator('.nds-editor-editable').evaluate((e) => getComputedStyle(e, '::before').content);
    const empty = await ph();
    await ed.locator('.nds-editor-editable').click();
    await page.keyboard.type('Hello');
    await page.waitForTimeout(200);
    const typed = await ph();
    check(/Write here/.test(empty), `editor: the placeholder shows while empty (${empty})`);
    check(!/Write here/.test(typed), 'editor: the placeholder goes once text is typed');
    const vis = () => ed.evaluate((e) => ({
        editable: getComputedStyle(e.querySelector('.nds-editor-editable')).display !== 'none',
        source: (() => { const s = e.querySelector('.nds-editor-source'); return !!s && s.getBoundingClientRect().width > 2 && getComputedStyle(s).clipPath === 'none'; })(),
    }));
    const v0 = await vis();
    await ed.locator('[data-source-toggle]').click();
    await page.waitForTimeout(200);
    const v1 = await vis();
    await ed.locator('[data-source-toggle]').click();
    await page.waitForTimeout(200);
    const v2 = await vis();
    check(v0.editable && !v0.source, 'editor: starts in the visual view');
    check(!v1.editable && v1.source, 'editor: the toggle opens the source view');
    check(v2.editable && !v2.source, 'editor: the toggle closes it again');
    await page.context().close();
}

// 1.6 Password toggle: shows and hides the text, swaps the icon, and hides again on form reset.
{
    const page = await open('components/password.html');
    const btn = page.locator('form .nds-toggle-password').filter({ visible: true }).first();
    const read = () => btn.evaluate((b) => {
        const input = b.closest('.nds-form-group, .nds-password, .nds-form-container').querySelector('input');
        const i = b.querySelector('i, .nds-icon');
        const s = getComputedStyle(i, '::before');   // the icon paints on ::before
        return { type: input.type, icon: s.maskImage || s.webkitMaskImage };
    });
    const r0 = await read();
    await btn.click();
    const r1 = await read();
    await btn.click();
    const r2 = await read();
    await btn.click();
    await btn.evaluate((b) => b.closest('form').reset());
    await page.waitForTimeout(200);
    const r3 = await read();
    check(r0.type === 'password' && r1.type === 'text' && r2.type === 'password', 'password: the toggle shows and hides the text');
    check(r0.icon !== r1.icon && r2.icon === r0.icon, 'password: the icon swaps with it');
    check(r3.type === 'password' && r3.icon === r0.icon, 'password: a form reset hides the text and resets the icon');
    await page.context().close();
}

// 1.2 Page layout: the raised class lifts the sections with a shadow.
{
    const page = await open('layout/page-layout.html');
    const cls = 'nds-compact';
    const r = await page.evaluate((cls) => {
        const layout = document.querySelector('.nds-content-layout');
        const sec = layout && layout.querySelector('.nds-content-section');
        if (!sec) return null;
        const plain = getComputedStyle(sec).boxShadow;
        layout.classList.add(cls);
        const raised = getComputedStyle(sec).boxShadow;
        return { plain, raised };
    }, cls);
    check(r && r.raised !== 'none' && r.raised !== r.plain, `layout: .${cls} lifts the sections (${r && r.raised.slice(0, 40)})`);
    await page.context().close();
}

// 2.3 Upload (v2 only): data-upload-timeout is milliseconds.
if (NEW) {
    const page = await open('components/upload.html');
    await page.route('**/never-answers', () => {});   // never fulfilled: the upload hangs
    const result = await page.evaluate(async () => {
        const box = document.createElement('div');
        const canon = document.querySelector('script[data-canon]').textContent;
        box.innerHTML = canon;
        const up = box.querySelector('.nds-upload, [data-upload-url], .nds-file-upload') || box.firstElementChild;
        up.setAttribute('data-upload-url', '/never-answers');
        up.setAttribute('data-auto-upload', 'true');   // presence alone is batch 2 (2.2)
        up.setAttribute('data-upload-timeout', '300');
        document.querySelector('main, body').append(box);
        await NDS.init.mount(box);
        const t0 = performance.now();
        const failed = new Promise((r) => box.addEventListener('nds:upload:error', (e) => r({ ms: performance.now() - t0, reason: e.detail && e.detail.error }), { once: true }));
        const input = box.querySelector('input[type=file]');
        const dt = new DataTransfer();
        dt.items.add(new File(['x'], 'a.png', { type: 'image/png' }));   // a type the canon allows
        input.files = dt.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        return Promise.race([failed, new Promise((r) => setTimeout(() => r({ ms: -1 }), 4000))]);
    });
    check(result.ms > 0 && result.ms < 2000, `upload: a 300 ms timeout ends a hung upload in under 2 s (${Math.round(result.ms)} ms, ${result.reason})`);
    await page.context().close();
}

// v2 only: the audit names every old spelling a page still writes (markup and its own CSS).
if (NEW) {
    const page = await open('components/button.html');
    const found = await page.evaluate(async () => {
        const box = document.createElement('div');
        box.innerHTML = '<div class="nds-tab-list center"></div>'
            + '<button class="nds-btn nds-toggle-password show"></button>'
            + '<button class="nds-voice-input" data-target="x"></button>'
            + '<button class="nds-bullet" data-status="active"></button>';
        document.body.append(box);
        const style = document.createElement('style');
        style.textContent = '.nds-bullet[data-status="active"] { outline: 1px solid; }';
        document.head.append(style);
        const findings = await NDS.init.audit();
        return findings.filter((f) => /^migration/.test(f.rule)).map((f) => f.message).join('\n');
    });
    for (const [name, re] of [['center', /\bcenter\b/], ['show', /\bshow\b/], ['data-target', /data-target/], ['data-status', /data-status/]]) {
        check(re.test(found), `audit: names the old ${name}`);
    }
    await page.context().close();
}

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
