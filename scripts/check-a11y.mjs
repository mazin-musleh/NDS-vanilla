// axe (WCAG 2.x A + AA) and a keyboard walk on every built page, as built (LTR) and in RTL.
// The walk Tabs through the page: each stop must be visible, outside aria-hidden/inert, and
// draw a focus ring (outline or box-shadow); a walk that never gets back to the start is a trap.
//   node scripts/check-a11y.mjs [page.html …] [--dir ltr|rtl] [--no-keys] [--jobs n]
//   ENGINE=webkit for Safari. Needs the dev server (bundle exec jekyll serve).
import { launch, ENGINE } from './lib/browser.mjs';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createRequire } from 'node:module';

const SITE = join(import.meta.dirname, '..', '_site');
const BASE = 'http://localhost:4002/NDS-vanilla/';
const AXE = createRequire(import.meta.url).resolve('axe-core/axe.min.js');
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i < 0 ? null : args.splice(i, 2)[1]; };
const has = (name) => { const i = args.indexOf(name); return i >= 0 && !!args.splice(i, 1); };
const dir = opt('--dir'), JOBS = +opt('--jobs') || 4, KEYS = !has('--no-keys');
const DIRS = dir ? [dir] : ['ltr', 'rtl'];
const MAX_TABS = 600;

const skip = /^(assets|docs-assets|img|tmp|node_modules|next-release|events)\b/;
const pages = [];
(function walk(d) {
    for (const f of readdirSync(d)) {
        const p = join(d, f), r = relative(SITE, p).split('\\').join('/');
        if (skip.test(r)) continue;
        if (statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) pages.push(r);
    }
})(SITE);
const list = args.length ? args.map((a) => a.replace(/^\//, '')) : pages;

if (!(await fetch(BASE).catch(() => null))) { console.error(`Dev server not reachable at ${BASE} — bundle exec jekyll serve`); process.exit(1); }

const browser = await launch();
const findings = []; // { page, dir, kind, rule, target, detail }
let stops = 0;

async function check(path, d) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const add = (kind, rule, target, detail = '') => findings.push({ page: path, dir: d, kind, rule, target, detail });
    // RTL: the built page's <html> takes lang="ar" dir="rtl" before any script reads it.
    if (d === 'rtl') await page.route(BASE + path, async (route) => {
        const res = await route.fetch();
        const html = (await res.text()).replace(/<html\b[^>]*>/i, (tag) =>
            tag.replace(/\s(lang|dir)\s*=\s*("[^"]*"|'[^']*'|\S+)/gi, '').replace(/\s*>$/, ' lang="ar" dir="rtl">'));
        await route.fulfill({ response: res, body: html });
    });
    try {
        await page.goto(BASE + path, { waitUntil: 'load', timeout: 30000 });
        await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded') || !window.NDS, null, { timeout: 10000 }).catch(() => {});
        await page.waitForTimeout(800);

        // Scroll it through as a reader does: Code and other parts start as they near the viewport.
        await page.evaluate(async () => {
            for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.7) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); }
            scrollTo(0, 0); await new Promise((r) => setTimeout(r, 400));
        });
        await page.addScriptTag({ path: AXE });
        // The swiper's container takes the tab stop and the arrow keys for its scrolling wrapper.
        const axe = await page.evaluate(async () => (await axe.run(document, {
            runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
            resultTypes: ['violations'],
        })).violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes
            .filter((n) => !(v.id === 'scrollable-region-focusable' && document.querySelector(n.target[0])?.matches('.nds-swiper-wrapper')))
            .map((n) => n.target.join(' ')) })));
        for (const v of axe) for (const t of v.nodes) add('axe', `${v.id} (${v.impact})`, t);

        if (KEYS) {
            await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
            const seen = new Map();
            let first = null, tabs = 0;
            for (; tabs < MAX_TABS; tabs++) {
                await page.keyboard.press('Tab');
                const s = await page.evaluate(() => {
                    let el = document.activeElement;
                    // Into same-origin frames (the doc device previews) and shadow roots.
                    for (;;) {
                        if (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
                        else if (el?.tagName === 'IFRAME' && el.contentDocument?.activeElement) el = el.contentDocument.activeElement;
                        else break;
                    }
                    const doc = el?.ownerDocument;
                    if (!el || el === doc.body || el === doc.documentElement) return null;
                    const ids = window.__a11yIds ??= new WeakMap();
                    if (!ids.has(el)) ids.set(el, window.__a11yN = (window.__a11yN || 0) + 1);
                    const getComputedStyle = doc.defaultView.getComputedStyle.bind(doc.defaultView);
                    const sel = (e) => e.id ? `#${e.id}` : `${e.tagName.toLowerCase()}${e.classList.length ? '.' + [...e.classList].slice(0, 3).join('.') : ''}`;
                    const path = []; for (let e = el; e && e !== doc.body && path.length < 4; e = e.parentElement) path.unshift(sel(e));
                    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
                    const ring = (c) => (c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) > 0) || c.boxShadow !== 'none';
                    // A ring may sit on a pseudo-element or on a parent that owns the look (a hidden native input).
                    // A range draws it on the thumb, which no script can read; a dialog takes focus as a container.
                    const drawn = el.matches('input[type="range"], dialog') || ring(cs) || ring(getComputedStyle(el, '::before')) || ring(getComputedStyle(el, '::after'))
                        || [el.parentElement, el.closest('label')].some((p) => p && p.matches(':focus-within') && ring(getComputedStyle(p)));
                    return {
                        key: ids.get(el),
                        target: path.join(' > '),
                        hidden: (r.width < 1 && r.height < 1) || cs.visibility === 'hidden'
                            || (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })),
                        ariaHidden: !!el.closest('[aria-hidden="true"], [inert]'),
                        ring: drawn,
                    };
                });
                if (!s) { if (first) break; continue; }
                if (s.key === first) break;
                first ??= s.key;
                if (seen.has(s.key)) { add('keys', 'focus-loop', s.target, `back to an earlier stop after ${tabs + 1} tabs, never reached the start`); break; }
                seen.set(s.key, 1);
                stops++;
                if (s.ariaHidden) add('keys', 'focus-in-aria-hidden', s.target);
                else if (!s.ring) add('keys', s.hidden ? 'focus-invisible' : 'focus-no-ring', s.target);
            }
            if (tabs >= MAX_TABS) add('keys', 'walk-cap', '', `${MAX_TABS} stops, walk cut short`);
        }
    } catch (e) { add('error', 'load', '', e.message.split('\n')[0]); }
    finally { await ctx.close(); }
}

const jobs = list.flatMap((p) => DIRS.map((d) => [p, d]));
let next = 0;
await Promise.all(Array.from({ length: Math.min(JOBS, jobs.length) }, async () => {
    while (next < jobs.length) await check(...jobs[next++]);
}));
await browser.close();

// One line per rule and target, with the pages and directions it shows on.
const groups = new Map();
for (const f of findings) {
    const k = `${f.kind} | ${f.rule} | ${f.target}`;
    const g = groups.get(k) || groups.set(k, { ...f, where: new Set() }).get(k);
    g.where.add(`${f.page} (${f.dir})`);
}
for (const g of [...groups.values()].sort((a, b) => b.where.size - a.where.size)) {
    const where = [...g.where];
    console.log(`${g.kind.toUpperCase()}  ${g.rule}  ${g.target}${g.detail ? '  — ' + g.detail : ''}`);
    console.log(`      ${where.length} × ${where.slice(0, 4).join(', ')}${where.length > 4 ? ', …' : ''}`);
}
console.log(`${ENGINE}: ${list.length} pages × ${DIRS.join('+')}, ${stops} tab stops walked, ${findings.length} findings in ${groups.size} groups`);
process.exit(findings.length ? 1 : 0);
