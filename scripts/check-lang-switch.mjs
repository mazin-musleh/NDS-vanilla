// Language change without a reload: set lang and dir on <html> and every word NDS wrote follows.
// Each page loads in one language, switches live to the other, and must match a fresh load in that
// language: each element's own text and its six marker attributes (aria-label, title, ...). Both ways.
// Then an open Date Picker and Time Picker panel switch, and a page whose markup is in Arabic
// switches to English: each marker reads its English.
//   node scripts/check-lang-switch.mjs     ONLY=<path stem> · ALL=1 (every components/ and examples/ page) · ENGINE=webkit
// Needs the dev server on :4002 (SITE=<base url> for another).
import { launch, log, step } from './lib/browser.mjs';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const SITE = (process.env.SITE || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const SPIKE = ['examples/manage-records', 'examples/book-appointment', 'components/swiper', 'components/date-picker', 'components/pagination'];
const stems = (dir) => readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.md')).map((f) => `${dir}/${f.slice(0, -3)}`);
const PAGES = (process.env.ALL ? [...stems('components'), ...stems('examples')] : SPIKE)
    .filter((p) => !process.env.ONLY || p.endsWith(process.env.ONLY));
const DIR = { en: 'ltr', ar: 'rtl' };
const SHOWN = 12;   // diffs printed per run

const browser = await launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
// A page served in lang: its <html> as the server would write it.
let served = 'en';
await context.route((url) => url.pathname.endsWith('/') || url.pathname.endsWith('.html'), async (route) => {
    const response = await route.fetch();
    const html = (await response.text()).replace(/<html lang="[^"]*" dir="[^"]*">/, `<html lang="${served}" dir="${DIR[served]}">`);
    route.fulfill({ response, body: html });
});

const settle = (page) => page.evaluate(async () => {
    await NDS.init.ready; await NDS.i18n.settled; await NDS.i18n.pack();
    await new Promise((r) => setTimeout(r, 400));
});

// Each element's own text and marker attributes, keyed by its place under <body>.
const snapshot = (page) => page.evaluate(() => {
    const ATTRS = ['aria-label', 'aria-description', 'title', 'alt', 'placeholder', 'label'];
    // svg stays in: a chart's axis labels are its text.
    const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']);
    const out = {};
    const walk = (el, path) => {
        const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.nodeValue).join('').replace(/\s+/g, ' ').trim();
        // A generated id (a tooltip's uuid) differs per load: the class names the element then.
        const name = el.id && !/[0-9a-f]{8}-|\d{3,}/.test(el.id) ? `#${el.id}` : el.classList[0] ? `.${el.classList[0]}` : '';
        const key = `${path}>${el.tagName.toLowerCase()}${name}`;
        // A clock or a countdown's number ticks between the two loads, and a text with no letter (a demo captcha) is no word.
        if (own && /\p{L}/u.test(own) && !el.matches('.nds-clock, .nds-countdown-value')) out[`${key} text`] = own;
        for (const a of ATTRS) if (el.hasAttribute(a)) out[`${key} ${a}`] = el.getAttribute(a);
        // Counted among same-named siblings: a script that appends to <body> in another order moves no key.
        const seen = {};
        for (const child of el.children) {
            if (SKIP.has(child.tagName)) continue;
            const id = `${child.tagName}${child.classList[0] || ''}`;
            seen[id] = (seen[id] || 0) + 1;
            walk(child, `${key}:${seen[id] - 1}`);
        }
    };
    walk(document.body, '');
    return out;
});

const open = async (page, url, lang) => {
    served = lang;
    // networkidle: the injected bundles (the cookie panel's) have landed and built.
    await page.goto(url, { waitUntil: 'networkidle' });
    await settle(page);
};
const switchTo = (page, lang) => page.evaluate(async ({ lang, dir }) => {
    document.documentElement.lang = lang; document.documentElement.dir = dir;
    await new Promise((r) => setTimeout(r, 50));
    await NDS.i18n.pack(lang);
    await new Promise((r) => setTimeout(r, 400));
}, { lang, dir: DIR[lang] });

const short = (key) => { const parts = key.split('>'); return (parts.length > 4 ? '…>' : '') + parts.slice(-4).join('>'); };
let failed = 0;
for (const stem of PAGES) {
    const url = `${SITE}/${stem}/`;
    for (const [from, to] of [['en', 'ar'], ['ar', 'en']]) {
        const label = `${stem} ${from}→${to}`;
        try {
            const page = await context.newPage();
            const errors = [];
            page.on('pageerror', (e) => errors.push(e.message));
            await step(`${label} fresh`, () => open(page, url, to), 30000);
            const fresh = await snapshot(page);
            await step(`${label} live`, async () => { await open(page, url, from); await switchTo(page, to); }, 30000);
            const live = await snapshot(page);
            await page.close();
            // Same-shaped elements compare as a group: two fab docks that swap places are no difference.
            const group = (snap) => Object.entries(snap).reduce((m, [k, v]) => {
                const shape = k.replace(/:\d+/g, '');
                (m[shape] ||= []).push(v);
                return m;
            }, {});
            const [freshBy, liveBy] = [group(fresh), group(live)];
            const diffs = [];
            for (const shape of new Set([...Object.keys(freshBy), ...Object.keys(liveBy)])) {
                const rest = [...(liveBy[shape] || [])];
                for (const v of freshBy[shape] || []) {
                    const i = rest.indexOf(v);
                    if (i >= 0) rest.splice(i, 1); else diffs.push([shape, 'fresh', v]);
                }
                rest.forEach((v) => diffs.push([shape, 'live', v]));
            }
            if (!diffs.length && !errors.length) { log(`PASS  ${label}`); continue; }
            failed++;
            log(`FAIL  ${label}: ${diffs.length} differ${errors.length ? `, page errors: ${errors.join(' | ')}` : ''}`);
            for (const [k, side, v] of diffs.slice(0, SHOWN)) console.log(`        ${short(k)}\n          only ${side}: ${JSON.stringify(v)}`);
            if (diffs.length > SHOWN) console.log(`        … ${diffs.length - SHOWN} more`);
        } catch (e) { failed++; log(`FAIL  ${label}: ${e.message}`); }
    }
}

// A panel open across the switch: built in the old language, it must read as one opened fresh in the new one.
const OPEN = [
    { stem: 'components/date-picker', toggle: '.nds-date-picker-toggle', panel: '.nds-date-picker-menu' },
    { stem: 'components/time-picker', toggle: '.nds-time-picker-toggle', panel: '.nds-time-picker-panel, [class*="time-picker"][role="dialog"], [class*="time-picker"][role="listbox"]' },
].filter((c) => !process.env.ONLY || c.stem.endsWith(process.env.ONLY));
const readPanel = (page, selector) => page.evaluate((selector) => {
    const panel = [...document.querySelectorAll(selector)].find((el) => el.getClientRects().length);
    if (!panel) return null;
    const words = [];
    const walk = (el) => {
        for (const node of el.childNodes) {
            if (node.nodeType === 3 && node.nodeValue.trim()) words.push(node.nodeValue.trim());
            else if (node.nodeType === 1) { if (node.hasAttribute('aria-label')) words.push('@' + node.getAttribute('aria-label')); walk(node); }
        }
    };
    walk(panel);
    return words.sort();
}, selector);
for (const c of OPEN) for (const [from, to] of [['en', 'ar'], ['ar', 'en']]) {
    const label = `${c.stem} open panel ${from}→${to}`;
    const run = async (lang, target) => {
        const page = await context.newPage();
        await open(page, `${SITE}/${c.stem}/`, lang);
        await page.locator(c.toggle).first().click();
        await page.waitForTimeout(400);
        if (target) await switchTo(page, target);
        const words = await readPanel(page, c.panel);
        await page.close();
        return words;
    };
    const fresh = await run(to), live = await run(from, to);
    const missing = fresh ? fresh.filter((w) => !live?.includes(w)) : ['(no panel)'];
    if (!missing.length && live.length === fresh.length) { log(`PASS  ${label}`); continue; }
    failed++;
    log(`FAIL  ${label}: ${missing.slice(0, 6).map((w) => JSON.stringify(w)).join(', ')} only on a fresh load`);
}

// Markup served in Arabic: the server wrote NDS's words, core never did. A switch to English still owns them.
if (!process.env.ONLY) {
    const pack = (lang) => JSON.parse(readFileSync(join(ROOT, lang === 'ar' ? '_i18n' : 'assets/i18n', `${lang}.json`), 'utf8')).form;
    const [ar, en] = [pack('ar'), pack('en')];
    // A script's word (loading) and two only markup holds, whose English is en.json's.
    const keys = ['clear', 'loading', 'clear_input'];
    const markup = `<div id="lang-switch-fixture">
        <button type="button" data-i18n="form.clear">${ar.clear}</button>
        <span data-i18n="form.loading">${ar.loading}</span>
        <button type="button" aria-label="${ar.clear_input}" data-i18n-aria-label="form.clear_input">x</button></div>`;
    const page = await context.newPage();
    await page.route(`${SITE}/components/form/`, async (route) => {
        const response = await route.fetch();
        route.fulfill({ response, body: (await response.text()).replace(/<html lang="[^"]*" dir="[^"]*">/, '<html lang="ar" dir="rtl">').replace('<main>', `<main>${markup}`) });
    });
    await page.goto(`${SITE}/components/form/`);
    await settle(page);
    await switchTo(page, 'en');
    const read = await page.evaluate(() => {
        const f = document.getElementById('lang-switch-fixture');
        return [f.children[0].textContent, f.children[1].textContent, f.children[2].getAttribute('aria-label')];
    });
    const got = keys.map((k, i) => ({ key: k, got: read[i], want: en[k] }));
    await page.close();
    const bad = got.filter((g) => g.got.trim() !== g.want);
    if (bad.length) { failed++; log(`FAIL  Arabic markup ar→en: ${bad.map((b) => `${b.key} reads ${JSON.stringify(b.got)}, not ${JSON.stringify(b.want)}`).join('; ')}`); }
    else log('PASS  Arabic markup ar→en');
}

await browser.close();
log(failed ? `${failed} failed` : 'all pass');
process.exit(failed ? 1 : 0);
