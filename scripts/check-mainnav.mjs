// Main Navigation menus and drawer on a doc page: where each menu opens, what it covers, and how it closes.
// Desktop: the mega menus, the full-width search menu, the .nds-fit menu, a swap, an outside click, page scroll.
// Phone: the pinned search in the minimal bar, the drawer, the accordion inside it.
//   node scripts/check-mainnav.mjs [baseUrl]    ENGINE=webkit for Safari · TIMING=1 adds click cost at CPU x6.6 (Chromium)
import { launch, cdp, ENGINE } from './lib/browser.mjs';
const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const URL = `${BASE}/components/accordion.html`;
const TIMING = !!process.env.TIMING && ENGINE === 'chromium';
const browser = await launch();
let fails = 0;
const ok = (name, pass, detail = '') => { if (!pass) fails++; console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); };

async function open(dev) {
  const ctx = await browser.newContext(dev);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => { if (!/ResizeObserver loop/.test(e.message)) errors.push(e.message); });
  await page.route('**/nds-cookie-consent.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForFunction(() => window.NDS?.MainNav);
  await page.waitForTimeout(1500);
  // The first two menus of the primary list.
  await page.evaluate(() => [...document.querySelectorAll('.nds-nav-primary > .nds-has-menu')].slice(0, 2).forEach((li, i) => { li.dataset.check = 'p' + (i + 1); }));
  return { ctx, page, errors, wait: (ms = 600) => page.waitForTimeout(ms) };
}

// The menu of the n-th .nds-has-menu matching sel, and where it sits.
const probe = (page, sel) => page.evaluate((sel) => {
  const dd = document.querySelector(sel);
  const menu = dd?.querySelector('.nds-nav-menu');
  if (!menu) return null;
  const r = menu.getBoundingClientRect(), c = (menu.querySelector('.nds-nav-menu-content') || menu).getBoundingClientRect();
  const nav = document.querySelector('.nds-main-nav').getBoundingClientRect();
  const t = dd.querySelector('.nds-nav-link').getBoundingClientRect();
  const cx = c.left + c.width / 2, cy = c.top + Math.min(c.height / 2, 40);
  const hit = document.elementFromPoint(cx, cy);
  return {
    shown: getComputedStyle(menu).display !== 'none' && c.height > 0,
    top: Math.round(r.top), navBottom: Math.round(nav.bottom), left: Math.round(c.left), right: Math.round(c.right), width: Math.round(c.width),
    vw: document.documentElement.clientWidth, triggerCenter: Math.round(t.left + t.width / 2), center: Math.round(c.left + c.width / 2),
    onTop: !!hit && menu.contains(hit), expanded: dd.querySelector('.nds-nav-link').getAttribute('aria-expanded'),
    dimmed: !!document.querySelector('.nds-backdrop[data-state~="active"]'),
  };
}, sel);

const P1 = '[data-check="p1"]';
const P2 = '[data-check="p2"]';
const SEARCH = '.nds-has-menu.nds-search';
const FIT = '.nds-has-menu:has(> .nds-nav-menu.nds-fit)';
const timings = {};

// The slowest event-timing entry of the next click on sel, at CPU x6.6.
async function timedClick(page, sel, label) {
  if (!TIMING) return page.click(sel);
  const s = await cdp(page);
  await s.send('Emulation.setCPUThrottlingRate', { rate: 6.6 });
  await page.evaluate(() => { window.__ev = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (e.name === 'click' || e.name === 'pointerup') window.__ev = Math.max(window.__ev, e.duration); })).observe({ type: 'event', durationThreshold: 16, buffered: false }); });
  await page.click(sel);
  await page.waitForTimeout(1500);
  timings[label] = Math.round(await page.evaluate(() => window.__ev));
  await s.send('Emulation.setCPUThrottlingRate', { rate: 1 });
}

// ── Desktop ──
{
  const { ctx, page, errors, wait } = await open({ viewport: { width: 1280, height: 800 } });
  await timedClick(page, `${P1} > .nds-nav-link`, 'desktop menu open');
  await wait();
  let m = await probe(page, P1);
  ok('desktop: a mega menu opens under the bar, full width, on top, page dimmed',
    m.shown && Math.abs(m.top - m.navBottom) <= 2 && m.width >= m.vw - 2 && m.onTop && m.expanded === 'true' && m.dimmed, JSON.stringify(m));
  await page.click(`${P2} > .nds-nav-link`);
  await wait(1200);
  const a = await probe(page, P1), b = await probe(page, P2);
  ok('desktop: a second menu replaces the first', !a.shown && b.shown && b.onTop, JSON.stringify({ a: a.shown, b }));
  await page.evaluate(() => scrollBy(0, 300));
  await wait(300);
  m = await probe(page, P2);
  ok('desktop: page scroll keeps the menu under the sticky bar', m.shown && Math.abs(m.top - m.navBottom) <= 2, JSON.stringify(m));
  await page.mouse.click(640, 780);
  await wait();
  m = await probe(page, P2);
  ok('desktop: an outside click closes it and the dim layer', !m.shown && m.expanded === 'false' && !m.dimmed, JSON.stringify(m));
  await page.evaluate(() => scrollTo(0, 0));
  await wait(300);
  await page.click(`${SEARCH} > .nds-nav-link`);
  await wait();
  m = await probe(page, SEARCH);
  ok('desktop: the search menu opens full width', m.shown && m.width >= m.vw - 2 && m.onTop, JSON.stringify(m));
  await page.click(`${SEARCH} input`);
  await wait(300);
  ok('desktop: a click in the search field keeps it open', (await probe(page, SEARCH)).shown);
  await page.click(`${SEARCH} > .nds-nav-link`);
  await wait();
  await page.click(`${FIT} > .nds-nav-link`);
  await wait();
  m = await probe(page, FIT);
  ok('desktop: a .nds-fit menu sits under its trigger, inside the screen',
    m.shown && m.onTop && m.left >= 0 && m.right <= m.vw && (Math.abs(m.center - m.triggerCenter) <= 2 || m.left <= 20 || m.right >= m.vw - 20), JSON.stringify(m));
  await page.click(`${FIT} > .nds-nav-link`);
  await wait();
  ok('desktop: its trigger closes it', !(await probe(page, FIT)).shown);
  await page.click(`${P1} > .nds-nav-link`);
  await wait();
  ok('desktop: destroy() with a menu open leaves nothing in the top layer', await page.evaluate(() => {
    NDS.MainNav.destroy();
    const left = document.querySelectorAll('.nds-main-nav :popover-open').length;
    NDS.MainNav.reinit();
    return left === 0;
  }));
  ok('desktop: no page errors', !errors.length, errors.join(' | '));
  await ctx.close();
}

// ── Phone ──
{
  const { ctx, page, errors, wait } = await open({ viewport: { width: 390, height: 844 }, isMobile: ENGINE === 'chromium' ? true : undefined, hasTouch: true });
  await timedClick(page, `.nds-nav-minimal ${SEARCH} > .nds-nav-link`, 'phone pinned menu open');
  await wait();
  let m = await probe(page, `.nds-nav-minimal ${SEARCH}`);
  ok('phone: the pinned search opens under the bar, full width, on top', m.shown && Math.abs(m.top - m.navBottom) <= 2 && m.width >= m.vw - 2 && m.onTop, JSON.stringify(m));
  await page.click(`.nds-nav-minimal ${SEARCH} > .nds-nav-link`);
  await wait();
  ok('phone: its trigger closes it', !(await probe(page, `.nds-nav-minimal ${SEARCH}`)).shown);
  await timedClick(page, '.nds-nav-toggler', 'phone drawer open');
  await wait();
  const drawer = await page.evaluate(() => { const c = document.getElementById('nds-nav-collapse'); return c.getAttribute('data-state') || ''; });
  ok('phone: the toggler opens the drawer', /open/.test(drawer), drawer);
  await page.click(`${P1} > .nds-nav-link`);
  await wait();
  m = await page.evaluate((sel) => {
    const menu = document.querySelector(sel + ' .nds-nav-menu'), d = document.getElementById('nds-nav-collapse').getBoundingClientRect(), r = menu.getBoundingClientRect();
    return { h: Math.round(r.height), inDrawer: r.top >= d.top - 1 && r.top < d.bottom, popover: menu.matches(':popover-open') };
  }, P1);
  ok('phone: a drawer sub-menu opens inline, inside the drawer', m.h > 0 && m.inDrawer && !m.popover, JSON.stringify(m));
  await page.click('.nds-nav-toggler');
  await wait(1200);
  ok('phone: the toggler closes the drawer', !/open/.test(await page.evaluate(() => document.getElementById('nds-nav-collapse').getAttribute('data-state') || '')));
  ok('phone: no page errors', !errors.length, errors.join(' | '));
  await ctx.close();
}

if (TIMING) console.log('\nclick cost at CPU x6.6 (ms):', JSON.stringify(timings));
console.log(`\n${ENGINE}: ${fails ? fails + ' failed' : 'all passed'}`);
await browser.close();
process.exit(fails ? 1 : 0);
