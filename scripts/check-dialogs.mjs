// Modal and Panel on <dialog> (plans/top-layer.md steps 2–3), built as fixtures on components/panels.html:
// plain / static / modal panels, swap, Escape, click outside, <form method="dialog">, { focus: false },
// a Modal over a modal panel (one dim layer), a panel opened over a modal (it opens modal too),
// the scroll lock count, and destroy() while open.
//   node scripts/check-dialogs.mjs [baseUrl]    ENGINE=webkit for Safari
//   NO_POPOVER=1 plays a browser without popover (Safari < 17): no popover methods, :popover-open throws
import { launch, ENGINE } from './lib/browser.mjs';
const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const NO_POPOVER = !!process.env.NO_POPOVER;
const noPopover = () => {
  for (const k of ['showPopover', 'hidePopover', 'togglePopover', 'popover']) delete HTMLElement.prototype[k];
  const guard = (proto, name) => {
    const fn = proto[name];
    proto[name] = function (sel, ...rest) {
      if (/:popover-open/.test(sel)) throw new DOMException(`'${sel}' is not a valid selector.`, 'SyntaxError');
      return fn.call(this, sel, ...rest);
    };
  };
  for (const proto of [Element.prototype, Document.prototype, DocumentFragment.prototype]) for (const n of ['querySelector', 'querySelectorAll']) guard(proto, n);
  for (const n of ['matches', 'closest']) guard(Element.prototype, n);
};
const browser = await launch();
const newPage = async () => {
  const p = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  if (NO_POPOVER) await p.addInitScript(noPopover);
  return p;
};
const page = await newPage();
const errors = [];
page.on('pageerror', (e) => { if (!/ResizeObserver loop/.test(e.message)) errors.push(e.message); });
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
let fails = 0;
const ok = (name, pass, detail = '') => { if (!pass) fails++; console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); };
const wait = (ms = 600) => page.waitForTimeout(ms);

// The cookie panel opens itself at idle, into the panel stack these cases count on.
await page.route('**/nds-cookie-consent.min.js*', (r) => r.fulfill({ body: '', contentType: 'text/javascript' }));
await page.goto(`${BASE}/components/panels.html`, { waitUntil: 'load' });
await page.waitForFunction(() => window.NDS?.Init?.mount);
await page.evaluate(() => {
  // No navigation from a stray outside click.
  document.addEventListener('click', (e) => { if (e.target.closest('a')) e.preventDefault(); }, true);
  const panel = (id, attrs = '') => `<dialog id="${id}" class="nds-panel" aria-label="${id}" ${attrs}>
    <div class="nds-panel-header"><div class="nds-panel-text"><span class="nds-panel-title">${id}</span></div>
    <div class="nds-panel-action"><button type="button" class="nds-btn nds-subtle nds-icon-only" data-panel-close aria-label="Close"><i class="nds-icon nds-hgi-cancel-01"></i></button></div></div>
    <div class="nds-panel-body"><button type="button" class="nds-btn nds-primary" data-modal-target="tm"><span class="nds-label">Modal</span></button>
    <button type="button" class="nds-btn nds-secondary" data-panel-toggle="tp2"><span class="nds-label">Plain 2</span></button>
    <form method="dialog" class="nds-form"><button class="nds-btn nds-secondary-outline" data-native><span class="nds-label">Native close</span></button></form></div></dialog>`;
  const box = document.createElement('div');
  box.innerHTML = panel('tp1') + panel('tp2') + panel('ts', 'data-panel-static') + panel('tmp', 'data-panel-modal')
    + panel('tsm', 'data-panel-modal data-panel-static')
    + `<dialog id="tm" class="nds-modal nds-card" aria-labelledby="tm-t"><div class="nds-card-header"><span class="nds-card-title" id="tm-t">Modal</span>
       <button type="button" class="nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close"><i class="nds-icon nds-hgi-cancel-01"></i></button></div>
       <div class="nds-card-content"><button type="button" class="nds-btn nds-secondary" data-panel-toggle="tp1"><span class="nds-label">Plain 1</span></button></div></dialog>`
    + '<dialog id="tm2" class="nds-modal nds-card"><div class="nds-card-content">Second</div></dialog>'
    + '<button type="button" id="outside-btn" class="nds-btn">x</button>';
  document.body.append(box);
  NDS.Init.mount(box);
});
await wait(800);

const st = (id) => page.evaluate((id) => {
  const d = document.getElementById(id), r = d.getBoundingClientRect();
  return { open: d.open, modal: d.hasAttribute('data-nds-modal') && (d.matches(':modal') || ('showPopover' in HTMLElement.prototype && d.matches(':popover-open'))), state: d.getAttribute('data-state') || '', under: d.hasAttribute('data-nds-under'),
    shown: getComputedStyle(d).display !== 'none', top: Math.round(r.top), left: Math.round(r.left), right: Math.round(r.right),
    locked: document.body.hasAttribute('data-nds-scroll-lock'), topDialog: NDS.dialog.top()?.id, focusIn: d.contains(document.activeElement) };
}, id);
const open = async (id, opts) => { await page.evaluate(([id, o]) => NDS.Panel.open(id, o), [id, opts]); await wait(); };
const key = async (k = 'Escape') => { await page.keyboard.press(k); await wait(); };
// A point outside the panel, on the side it does not cover.
const clickOutside = async (id) => {
  const s = await st(id);
  await page.mouse.click(s.left > 400 ? 60 : 1220, 500);
  await wait();
};

// Plain
await open('tp1');
let s = await st('tp1');
ok('plain: opens with show(), not modal, under the header', s.open && !s.modal && s.shown && s.top > 0 && !s.locked, JSON.stringify(s));
ok('plain: focus moves to its close control', s.focusIn);
await key();
s = await st('tp1');
ok('plain: Escape closes it', !s.open && !s.shown && !s.state, JSON.stringify(s));
await open('tp1');
await clickOutside('tp1');
ok('plain: an outside click closes it', !(await st('tp1')).open);
await open('tp1');
await open('tp2');
await wait(400);
ok('plain: a second plain panel replaces the first', !(await st('tp1')).open && (await st('tp2')).open);
await page.evaluate(() => NDS.Panel.close('tp2'));
await wait();

// <form method="dialog">
await open('tp1');
await page.click('#tp1 [data-native]');
await wait();
s = await st('tp1');
ok('plain: <form method="dialog"> closes it and the state follows', !s.open && !s.state && !(await page.evaluate(() => NDS.Panel.isOpen('tp1'))), JSON.stringify(s));
await page.evaluate(() => NDS.Panel.open('tp1'));
await wait();
ok('plain: it opens again after a native close', (await st('tp1')).open);
await page.evaluate(() => NDS.Panel.close('tp1'));
await wait();

// { focus: false }
await page.focus('#outside-btn');
await open('tp1', { focus: false });
ok('plain: { focus: false } leaves focus where it was', await page.evaluate(() => document.activeElement.id === 'outside-btn'));
await page.evaluate(() => NDS.Panel.close('tp1'));
await wait();

// Static
await open('ts');
await key();
ok('static: Escape does not close it', (await st('ts')).open);
await clickOutside('ts');
ok('static: an outside click does not close it', (await st('ts')).open);
await page.click('#ts [data-panel-close]');
await wait();
ok('static: its close control closes it', !(await st('ts')).open);

// Modal panel
await open('tmp');
s = await st('tmp');
ok('modal panel: showModal(), full height, scroll locked', s.modal && s.top === 0 && s.locked, JSON.stringify(s));
// Inert lands two frames after the open (the showModal() fallback: at once); wait() covers it.
ok('modal panel: the page behind is inert', await page.evaluate(() =>
  !!document.querySelector('main').closest('[inert]') || document.getElementById('tmp').matches(':modal')));
await key();
s = await st('tmp');
ok('modal panel: Escape closes it and gives the scroll back', !s.open && !s.locked, JSON.stringify(s));
await page.evaluate(() => { window.__behind = 0; document.querySelector('main').addEventListener('click', () => window.__behind++); });
await open('tmp');
await clickOutside('tmp');
s = await st('tmp');
ok('modal panel: a click on the dim layer closes it', !s.open && !s.locked, JSON.stringify(s));
// Before the page is inert, the click must not reach it either.
await page.evaluate(() => NDS.Panel.open('tmp'));
await page.mouse.click(1220, 500);
await wait();
s = await st('tmp');
ok('modal panel: a click in the first frame closes it, the page behind gets none', !s.open && await page.evaluate(() => window.__behind === 0), JSON.stringify(s));
await open('tsm');
await key();
ok('static modal panel: Escape does not close it', (await st('tsm')).open);
await page.evaluate(() => NDS.Panel.close('tsm'));
await wait();
ok('static modal panel: close() gives the scroll back', !(await st('tsm')).locked);

// A Modal over a modal panel: one dim layer, Escape peels one at a time.
await open('tmp');
await page.click('#tmp [data-modal-target="tm"]');
await wait();
let p = await st('tmp'), m = await st('tm');
ok('Modal over a modal panel: the panel drops its dim layer', p.under && m.modal && !m.under, JSON.stringify({ p, m }));
await key();
p = await st('tmp'); m = await st('tm');
ok('Modal over a modal panel: Escape closes the Modal only', !m.open && p.open && !p.under && p.locked, JSON.stringify({ p, m }));

// A panel opened over a modal opens modal too.
await page.click('#tmp [data-panel-toggle="tp2"]');
await wait();
s = await st('tp2');
ok('plain panel over a modal panel: opens modal, the one under drops its dim layer', s.modal && (await st('tmp')).under, JSON.stringify(s));
await key();
ok('plain panel over a modal panel: Escape closes the top one only', !(await st('tp2')).open && (await st('tmp')).open && !(await st('tmp')).under);
await key();
s = await st('tmp');
ok('modal panel: last Escape gives the scroll back', !s.open && !s.locked, JSON.stringify(s));

// A plain panel opened from a Modal sits above it.
await page.evaluate(() => NDS.Modal.open('tm'));
await wait();
await page.click('#tm [data-panel-toggle="tp1"]');
await wait();
s = await st('tp1');
ok('plain panel from a Modal: opens modal, above it', s.modal && (await st('tm')).under, JSON.stringify(s));
await key();
await key();
s = await st('tm');
ok('plain panel from a Modal: two Escapes close both, scroll back', !(await st('tp1')).open && !s.open && !s.locked, JSON.stringify(s));

// A panel the page opens on its own (the cookie panel at idle) stays under an open Modal.
await page.evaluate(() => NDS.Modal.open('tm'));
await wait();
await open('ts', { focus: false });
s = await st('ts');
ok('{ focus: false } panel over a Modal: stays plain, under it', s.open && !s.modal && (await st('tm')).modal, JSON.stringify(s));
await page.evaluate(() => { NDS.Panel.close('ts'); NDS.Modal.close(); });
await wait();
ok('{ focus: false } panel over a Modal: closing both gives the scroll back', !(await st('tm')).locked);

// Modal on its own: swap, then close.
await page.evaluate(() => NDS.Modal.open('tm'));
await wait();
await page.evaluate(() => NDS.Modal.open('tm2'));
await wait();
ok('Modal swap: the first closes, the second is modal, scroll locked', !(await st('tm')).open && (await st('tm2')).modal && (await st('tm2')).locked);
await key();
s = await st('tm2');
ok('Modal swap: Escape closes it and gives the scroll back', !s.open && !s.locked, JSON.stringify(s));

// destroy() while open.
await open('tmp');
await page.evaluate(() => NDS.Panel.destroy(document.getElementById('tmp')));
s = await st('tmp');
ok('destroy() on an open modal panel closes it and gives the scroll back', !s.open && !s.locked, JSON.stringify(s));

// A panel that is not a <dialog>.
ok('an <aside class="nds-panel"> logs an error and is not wired', await page.evaluate(() => {
  const a = document.createElement('aside');
  a.className = 'nds-panel'; a.id = 'old';
  const seen = [];
  const orig = console.error;
  console.error = (...x) => seen.push(String(x[0]));
  document.body.append(a);
  NDS.Panel.create(a);
  console.error = orig;
  a.remove();
  return seen.some((m) => /must be a <dialog>/.test(m)) && !a.hasAttribute('data-nds-panel-initialized');
}));

// Lazy panels: a <dialog> in a <template class="nds-panel-template"> joins the page on the first open.
await page.evaluate(() => {
  const box = document.createElement('div');
  box.id = 'lazy-box';
  box.innerHTML = document.getElementById('panel-lazy').textContent;
  document.body.append(box);
  NDS.Init.mount(box);
});
await wait(300);
await page.click('#lazy-box [data-panel-toggle="details-panel"]');
await wait();
s = await st('details-panel');
ok('lazy: the doc\'s template panel opens from its toggle', s.open && !s.modal && s.shown && s.focusIn, JSON.stringify(s));
await key();
ok('lazy: Escape closes it', !(await st('details-panel')).open);
await page.evaluate(() => {
  const t = document.createElement('template');
  t.className = 'nds-panel-template';
  t.innerHTML = '<dialog id="lazy-modal" class="nds-panel" data-panel-modal aria-label="Lazy"><div class="nds-panel-body"><button type="button" data-panel-close>x</button></div></dialog>';
  document.body.append(t);
});
await page.evaluate(() => NDS.Panel.open('lazy-modal'));
await wait();
s = await st('lazy-modal');
ok('lazy: a template modal panel opens with showModal() by id', s.modal && s.locked && s.top === 0, JSON.stringify(s));
await key();
s = await st('lazy-modal');
ok('lazy: it closes and gives the scroll back', !s.open && !s.locked, JSON.stringify(s));

ok('no page errors', errors.length === 0, errors.join(' | '));

// Script-built panels, on a fresh page with the cookie script running.
const page2 = await newPage();
const errors2 = [];
page2.on('pageerror', (e) => { if (!/ResizeObserver loop/.test(e.message)) errors2.push(e.message); });
page2.on('console', (m) => { if (m.type() === 'error') errors2.push(m.text()); });
await page2.goto(`${BASE}/components/accessibility.html`, { waitUntil: 'load' });
await page2.waitForFunction(() => window.NDS?.Init?.mount);
const cookie = await page2.waitForSelector('#nds-cookies-panel[open]', { timeout: 10000 }).then(() => true, () => false);
const c = await page2.evaluate(() => {
  const d = document.getElementById('nds-cookies-panel');
  return d && { tag: d.tagName, modal: d.hasAttribute('data-nds-modal'), shown: getComputedStyle(d).display !== 'none', focusIn: d.contains(document.activeElement) };
});
ok('cookie panel: opens at idle as a plain <dialog>, focus left alone', cookie && c.tag === 'DIALOG' && !c.modal && c.shown && !c.focusIn, JSON.stringify(c));
await page2.evaluate(() => { const d = document.getElementById('nds-cookies-panel'); NDS.Panel.destroy(d); d.remove(); });
await page2.click('main [data-panel-toggle="nds-accessibility-panel"]');
// The first press arms the component: it opens the panel 1 s later, behind a spinner.
await page2.waitForTimeout(2000);
const a = await page2.evaluate(() => {
  const d = document.getElementById('nds-accessibility-panel');
  return d && { tag: d.tagName, open: d.open, shown: getComputedStyle(d).display !== 'none', focusIn: d.contains(document.activeElement) };
});
ok('accessibility panel: built from its template on the first click, opens', a && a.tag === 'DIALOG' && a.open && a.shown && a.focusIn, JSON.stringify(a));
await page2.keyboard.press('Escape');
await page2.waitForTimeout(600);
ok('accessibility panel: Escape closes it', !(await page2.evaluate(() => document.getElementById('nds-accessibility-panel').open)));
await page2.click('main [data-panel-toggle="nds-accessibility-panel"]');
await page2.waitForTimeout(800);
ok('accessibility panel: it opens again after a close', await page2.evaluate(() => document.getElementById('nds-accessibility-panel').open));
await page2.keyboard.press('Escape');
await page2.waitForTimeout(600);
ok('no page errors (script-built panels)', errors2.length === 0, errors2.join(' | '));
console.log(`\n${ENGINE}: ${fails ? fails + ' failed' : 'all passed'}`);
await browser.close();
process.exit(fails ? 1 : 0);
