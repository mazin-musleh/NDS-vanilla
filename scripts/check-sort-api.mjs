// Calls every documented NDS.Sort API item against the served bundle: helpers, markup
// wiring, create() options, instance methods, the event, loader refresh/destroy, the lazy
// stub and the audit warnings. One line per check.
//   node scripts/check-sort-api.mjs [baseUrl]
// Needs the dev server up. Exit 1 on a failed check, 2 when the server is unreachable.
import { launch } from './lib/browser.mjs';
const BASE = (process.argv[2] || 'http://127.0.0.1:4002/NDS-vanilla').replace(/\/$/, '');

const probe = await fetch(`${BASE}/components/sort.html`).catch(() => null);
if (!probe?.ok) { console.error(`cannot reach ${BASE}/components/sort.html — is the dev server up?`); process.exit(2); }

const li = (attrs, text) => `<li ${attrs}>${text}</li>`;
const FIX = `
<div id="fx-markup">
  <button type="button" id="m1-reset" data-sort-target="m1" data-sort>Reset</button>
  <button type="button" id="m1-asc" data-sort-target="m1" data-sort="n" data-sort-dir="asc">Up</button>
  <button type="button" id="m1-desc" data-sort-target="m1" data-sort="n" data-sort-dir="desc">Down</button>
  <button type="button" id="m1-nodir" data-sort-target="m1" data-sort="n">No dir</button>
  <ul id="m1">${li('data-sort-n="3"', 'c')}${li('data-sort-n="1"', 'a')}${li('data-sort-n="2"', 'b')}</ul>

  <button type="button" id="m2-a" data-sort-target="m2" data-sort="n">A</button>
  <button type="button" id="m2-b" data-sort-target="m2" data-sort="t" data-sort-mode="cycle">B</button>
  <ul id="m2">${li('data-sort-n="2" data-sort-t="y"', 'y2')}${li('data-sort-n="1" data-sort-t="z"', 'z1')}${li('data-sort-n="3" data-sort-t="x"', 'x3')}</ul>

  <button type="button" id="m3-desc" data-sort-target="m3" data-sort="n" data-sort-dir="desc" data-state="sorted-desc">Down</button>
  <ul id="m3">${li('data-sort-n="9"', '9')}${li('data-sort-n="5"', '5')}${li('data-sort-n="1"', '1')}</ul>

  <button type="button" id="m4-t" data-sort-target="a:b.c" data-sort="n">odd id</button>
  <ul id="a:b.c">${li('data-sort-n="2"', '2')}${li('data-sort-n="1"', '1')}</ul>

  <div class="code-example"><button type="button" data-sort-target="m5" data-sort="n">in code</button></div>
  <ul id="m5">${li('data-sort-n="2"', '2')}${li('data-sort-n="1"', '1')}</ul>

  <button type="button" data-sort-target="missing-list" data-sort="n">dead</button>
  <button type="button" id="m6-t" data-sort-target="m6" data-sort="n">tbody</button>
  <table class="nds-table"><tbody id="m6"><tr data-sort-n="2"><td>2</td></tr><tr data-sort-n="1"><td>1</td></tr></tbody></table>

  <div id="view">
    <button type="button" id="m7-t" data-sort-target="m7" data-sort="n" data-sort-mode="cycle">view</button>
    <ul id="m7">${li('data-sort-n="2"', '2')}${li('data-sort-n="1"', '1')}</ul>
  </div>

  <div class="nds-dropmenu" id="m8-menu">
    <button type="button" class="nds-btn nds-dropmenu-trigger"><i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i><span class="nds-label">Sort</span></button>
    <div class="nds-dropmenu-menu" hidden><div class="nds-dropmenu-scroll">
      <button type="button" class="nds-btn nds-dropmenu-item" id="m8-up" data-sort-target="m8" data-sort="n" data-sort-dir="asc"><i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"></i></button>
      <button type="button" class="nds-btn nds-dropmenu-item" id="m8-down" data-sort-target="m8" data-sort="n" data-sort-dir="desc"><i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"></i></button>
    </div></div>
  </div>
  <ul id="m8">${li('data-sort-n="2"', '2')}${li('data-sort-n="1"', '1')}</ul>
</div>
<button type="button" id="far" data-sort-target="m1" data-sort="n" data-sort-dir="desc" hidden>far away</button>`;

const browser = await launch();
const results = [];
const ok = (name, pass, got) => results.push({ name, pass, got });

// ── Main page: markup wiring + create() API ───────────────────────────────
{
  const page = await browser.newPage();
  const warns = [], errors = [];
  page.on('console', m => { if (m.type() === 'warning') warns.push(m.text()); if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));
  await page.route('**/components/sort.html*', async r => {
    const res = await r.fetch();
    await r.fulfill({ response: res, body: (await res.text()).replace('</main>', FIX + '</main>') });
  });
  await page.goto(`${BASE}/components/sort.html?sk=n&sd=desc&keep=1`);
  await page.waitForFunction(() => document.getElementById('m1')?.ndsSort, null, { timeout: 20000 });

  const r = await page.evaluate(async () => {
    const out = {};
    const T = id => [...document.getElementById(id).children].map(e => e.textContent.trim()).join(',');
    const st = el => (typeof el === 'string' ? document.getElementById(el) : el).getAttribute('data-state') || '';
    const click = id => document.getElementById(id).click();
    const key = (id, k) => document.getElementById(id).dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));

    // Static helpers
    out.detect = [NDS.Sort.detectType(['1', '2,000', '3 SAR']), NDS.Sort.detectType(['03/04/2026', '2026-01-02']), NDS.Sort.detectType(['a', '1']), NDS.Sort.detectType([])];
    out.parse = [NDS.Sort.parseValue('9,375 SAR', 'number'), NDS.Sort.parseValue('x', 'number'), NDS.Sort.parseValue(null, 'string'), NDS.Sort.parseValue('03/04/2026', 'date') === new Date(2026, 3, 3).getTime()];
    out.compare = [Math.sign(NDS.Sort.compare('2', '10', 'number', 'asc')), Math.sign(NDS.Sort.compare('2', '10', 'number', 'desc')), Math.sign(NDS.Sort.compare('item 2', 'item 10', 'string', 'asc'))];

    // Markup wiring: direct
    out.m1Wired = !!document.getElementById('m1').ndsSort?._markup && document.getElementById('m1').hasAttribute('data-nds-sort-initialized');
    click('m1-desc');
    out.m1Desc = [T('m1'), st('m1-desc'), document.getElementById('m1-desc').getAttribute('aria-pressed'), st('m1-asc'), document.getElementById('m1-asc').getAttribute('aria-pressed')];
    click('m1-nodir'); out.m1NoDir1 = [T('m1'), st('m1-nodir')];
    click('m1-nodir'); out.m1NoDir2 = T('m1');
    click('m1-reset'); out.m1Reset = [T('m1'), st('m1-nodir'), JSON.stringify(document.getElementById('m1').ndsSort.getState())];
    document.getElementById('far').click(); out.farTrigger = T('m1');
    key('m1-asc', 'Enter'); out.enter = T('m1');
    key('m1-desc', ' '); out.space = T('m1');
    click('m1-reset');

    // Cycle: mode from one trigger
    out.m2Mode = document.getElementById('m2').ndsSort.opts.mode;
    click('m2-a'); out.m2c1 = [T('m2'), st('m2-a')];
    click('m2-a'); out.m2c2 = [T('m2'), st('m2-a')];
    click('m2-b'); out.m2Other = [T('m2'), st('m2-a'), st('m2-b')];
    click('m2-b'); click('m2-b'); out.m2c3 = [T('m2'), st('m2-b')];

    // Seed from markup: no reorder, next click follows the state
    out.m3Seed = [T('m3'), JSON.stringify(document.getElementById('m3').ndsSort.getState()), st('m3-desc'), document.getElementById('m3-desc').getAttribute('aria-pressed')];

    // Odd id + code-example skip
    out.m4 = (click('m4-t'), T('a:b.c'));
    out.m5Wired = !!document.getElementById('m5').ndsSort;

    // Dropmenu icon sync
    click('m8-down');
    out.m8Icon = document.querySelector('#m8-menu .nds-dropmenu-trigger i').className;

    // NDS.Sort.refresh(root): new item joins the active sort; scoped
    click('m1-asc');
    const n0 = document.createElement('li'); n0.dataset.sortN = '0'; n0.textContent = 'z0';
    document.getElementById('m1').append(n0);
    NDS.Sort.refresh(document.getElementById('m2')); out.refreshOther = T('m1');
    NDS.Init.refresh(document.getElementById('m1')); out.refreshOwn = T('m1');
    const n4 = document.createElement('li'); n4.dataset.sortN = '-1'; n4.textContent = 'neg';
    document.getElementById('m1').append(n4);
    NDS.Sort.refresh(document.getElementById('m1').firstElementChild); out.refreshInner = T('m1');

    // New list added after load joins via NDS.Init.refresh
    const host = document.createElement('div');
    host.innerHTML = '<button type="button" id="m9-t" data-sort-target="m9" data-sort="n">n</button><ul id="m9"><li data-sort-n="2">2</li><li data-sort-n="1">1</li></ul>';
    document.getElementById('fx-markup').append(host);
    NDS.Init.refresh(host);
    click('m9-t'); out.lateList = T('m9');

    // NDS.Init.destroy(view) releases the wired list; refresh re-wires
    const m7 = document.getElementById('m7');
    const destroyed = NDS.Init.destroy(document.getElementById('view'));
    out.destroy = [destroyed >= 1, !!m7.ndsSort, m7.hasAttribute('data-nds-sort-initialized')];
    click('m7-t'); out.afterDestroy = T('m7');
    NDS.Init.refresh(document.getElementById('view'));
    click('m7-t'); out.rewired = T('m7');

    // ── create() ────────────────────────────────────────────────────────
    const mk = (html) => { const d = document.createElement('div'); d.innerHTML = html; document.getElementById('fx-markup').append(d); return d; };
    const rows = '<ul class="list"><li class="row" data-sort-p="30" data-sort-d="15/03/2026" data-sort-z="010">c</li><li class="row" data-sort-p="10" data-sort-d="03/04/2026" data-sort-z="9">a</li><li class="row" data-sort-p="20" data-sort-d="01/12/2025" data-sort-z="0100">b</li></ul>';
    const L = root => [...root.querySelectorAll('.row')].map(e => e.textContent).join(',');

    // items/triggers as selector; onChange before event; event detail
    const r1 = mk('<button class="t" data-sort="p" data-sort-dir="desc">p</button>' + rows);
    const order = []; let detail, changeArg;
    r1.addEventListener('nds:sort:change', e => { order.push('event'); detail = e.detail; });
    const s1 = NDS.Sort.create(r1, { items: '.row', triggers: '.t', onChange: a => { order.push('onChange'); changeArg = a; } });
    r1.querySelector('.t').click();
    out.c1 = [L(r1), order.join('>'), detail.key, detail.dir, detail.orderedItems.length, detail.sort === s1, changeArg.key, changeArg.dir, JSON.stringify(changeArg.state), changeArg.orderedItems.length];
    out.sameInstance = NDS.Sort.create(r1, { mode: 'cycle' }) === s1 && s1.opts.mode === 'direct';
    r1.id = 'r1x';
    out.getInstance = [NDS.Sort.getInstance(r1) === s1, NDS.Sort.getInstance('#r1x') === s1, NDS.Sort.getInstance(document.body), NDS.Sort.create(null)];

    // apply / reset / getState / refresh no-op / destroy
    s1.apply('p', 'asc'); out.apply = [L(r1), JSON.stringify(s1.getState())];
    s1.apply(null); out.applyNull = [L(r1), JSON.stringify(s1.getState())];
    s1.apply('d', 'asc'); out.dateSort = L(r1);
    s1.reset(); out.reset = L(r1);
    order.length = 0; s1.refresh(); out.refreshNoop = order.length;
    s1.destroy(); r1.querySelector('.t').click();
    out.destroyed = [L(r1), !!r1.ndsSort, r1.hasAttribute('data-nds-sort-initialized'), NDS.Sort.create(r1, { items: '.row', triggers: '.t' }) !== s1];

    // items as NodeList / array / function, triggers outside the root via function, reorderIn
    const r2 = mk('<button class="t2" data-sort="p">p</button>' + rows);
    const outside = mk('<button id="outside-t" data-sort="p" data-sort-dir="desc">o</button>');
    const s2 = NDS.Sort.create(r2, { items: [...r2.querySelectorAll('.row')], triggers: () => [r2.querySelector('.t2'), outside.firstChild] });
    outside.firstChild.click(); out.arrayItems = L(r2);
    const r3 = mk(rows);
    const s3 = NDS.Sort.create(r3, { items: r3.querySelectorAll('.row'), triggers: [], reorderIn: r3.querySelector('.list') });
    s3.apply('p', 'desc'); out.nodeList = L(r3);

    // selector out of scope warns once
    const r4 = mk(rows);
    NDS.Sort.create(r4, { items: '.row', triggers: '#outside-t' });

    // mode cycle + a11y sort + a11yTarget + keyFrom + accessor + types
    const r5 = mk('<table><thead><tr><th><button class="h" data-col="0">x</button></th></tr></thead></table>' + rows);
    const s5 = NDS.Sort.create(r5, {
      items: '.row', triggers: '.h', mode: 'cycle', a11y: 'sort',
      keyFrom: b => 'z', accessor: (item, k) => item.getAttribute('data-sort-' + k), types: { z: 'string' },
    });
    const th = r5.querySelector('th'), hb = r5.querySelector('.h');
    hb.click(); out.a11ySort1 = [L(r5), th.getAttribute('aria-sort'), th.getAttribute('data-state'), hb.getAttribute('data-state')];
    hb.click(); out.a11ySort2 = [th.getAttribute('aria-sort'), th.getAttribute('data-state')];
    hb.click(); out.a11ySort3 = [th.getAttribute('aria-sort'), th.getAttribute('data-state') || '', hb.getAttribute('data-state') || ''];
    s5.apply('z', 'asc');
    s5.opts.types = {}; s5.apply('z', 'asc'); out.typesNumber = L(r5);

    // a11y none
    const r6 = mk('<button class="t6" data-sort="p">p</button>' + rows);
    NDS.Sort.create(r6, { items: '.row', triggers: '.t6', a11y: 'none' });
    r6.querySelector('.t6').click();
    out.a11yNone = [r6.querySelector('.t6').getAttribute('aria-pressed'), r6.querySelector('.t6').getAttribute('data-state')];

    // initialState wins over markup; markup seed wins over urlSync
    const r7 = mk('<button class="t7" data-sort="p" data-sort-dir="desc" data-state="sorted-desc">p</button>' + rows);
    const s7 = NDS.Sort.create(r7, { items: '.row', triggers: '.t7', initialState: { key: 'd', dir: 'asc' } });
    out.initialWins = [JSON.stringify(s7.getState()), L(r7)];
    const r8 = mk('<button class="t8" data-sort="p" data-sort-dir="asc" data-state="sorted-asc">p</button>' + rows);
    const s8 = NDS.Sort.create(r8, { items: '.row', triggers: '.t8', urlSync: { keyParam: 'sk', dirParam: 'sd' } });
    out.seedOverUrl = [JSON.stringify(s8.getState()), L(r8)];

    // urlSync: read on create, write, ascending drops dir, other params stay
    const r9 = mk('<button class="t9" data-sort="n">n</button><ul><li class="row" data-sort-n="1">1</li><li class="row" data-sort-n="3">3</li><li class="row" data-sort-n="2">2</li></ul>');
    const s9 = NDS.Sort.create(r9, { items: '.row', triggers: '.t9', urlSync: { keyParam: 'sk', dirParam: 'sd' } });
    out.urlRead = [L(r9), JSON.stringify(s9.getState())];
    s9.apply('n', 'asc'); out.urlAsc = location.search;
    s9.apply('n', 'desc'); out.urlDesc = location.search;
    s9.reset(); out.urlReset = location.search;

    await NDS.Init.audit();
    return out;
  });
  await page.waitForTimeout(300);
  const E = (name, got, want) => ok(name, JSON.stringify(got) === JSON.stringify(want), got);

  E('detectType number/date/string/empty', r.detect, ['number', 'date', 'string', 'string']);
  E('parseValue', r.parse, [9375, 0, '', true]);
  E('compare asc/desc/numeric text', r.compare, [-1, 1, -1]);
  E('markup: list wired + stamp', r.m1Wired, true);
  E('markup direct: sort, state, aria-pressed on/off', r.m1Desc, ['c,b,a', 'sorted-desc selected', 'true', '', 'false']);
  E('markup: trigger with no dir sorts asc', r.m1NoDir1, ['a,b,c', 'selected sorted-asc']);
  E('markup: trigger with no dir never toggles', r.m1NoDir2, 'a,b,c');
  E('markup: empty data-sort resets + clears state', r.m1Reset, ['c,a,b', '', '{"key":null,"dir":null}']);
  E('markup: trigger far from the list', r.farTrigger, 'c,b,a');
  E('keyboard Enter', r.enter, 'a,b,c');
  E('keyboard Space', r.space, 'c,b,a');
  E('cycle mode from any one trigger', r.m2Mode, 'cycle');
  E('cycle: 1st click asc', r.m2c1, ['z1,y2,x3', 'sorted-asc selected']);
  E('cycle: 2nd click desc', r.m2c2, ['x3,y2,z1', 'selected sorted-desc']);
  E('cycle: other key starts asc, old state cleared', r.m2Other, ['x3,y2,z1', '', 'sorted-asc selected']);
  E('cycle: 3rd click restores', r.m2c3, ['y2,z1,x3', '']);
  E('seed: state read, no reorder, aria', r.m3Seed, ['9,5,1', '{"key":"n","dir":"desc"}', 'sorted-desc selected', 'true']);
  E('odd id (CSS.escape)', r.m4, '1,2');
  E('trigger in .code-example not wired', r.m5Wired, false);
  E('dropmenu trigger icon sync', r.m8Icon, 'nds-icon nds-hgi-sort-by-down-02');
  E('Sort.refresh scoped: other root leaves list alone', r.refreshOther, 'a,b,c,z0');
  E('Init.refresh(list): new item joins sort', r.refreshOwn, 'z0,a,b,c');
  E('Sort.refresh(root inside list) re-sorts it', r.refreshInner, 'neg,z0,a,b,c');
  E('list added after load wired by Init.refresh', r.lateList, '1,2');
  E('Init.destroy(view) releases list', r.destroy, [true, false, false]);
  E('after destroy: click does nothing', r.afterDestroy, '2,1');
  E('Init.refresh re-wires', r.rewired, '1,2');
  E('create: selector forms, onChange>event, detail, onChange arg', r.c1, ['c,b,a', 'onChange>event', 'p', 'desc', 3, true, 'p', 'desc', '{"key":"p","dir":"desc"}', 3]);
  E('create twice: same instance, options ignored', r.sameInstance, true);
  E('getInstance el/selector/none, create(null)', r.getInstance, [true, true, null, null]);
  E('apply + getState', r.apply, ['a,b,c', '{"key":"p","dir":"asc"}']);
  E('apply(null) restores', r.applyNull, ['c,a,b', '{"key":null,"dir":null}']);
  E('date detection DD/MM/YYYY', r.dateSort, 'b,c,a');
  E('reset()', r.reset, 'c,a,b');
  E('refresh() no-op with no sort', r.refreshNoop, 0);
  E('destroy(): listeners, backref, stamp; create again', r.destroyed, ['c,a,b', false, false, true]);
  E('items array + triggers function outside root', r.arrayItems, 'c,b,a');
  E('items NodeList + reorderIn', r.nodeList, 'c,b,a');
  E("a11y 'sort' asc: aria-sort, th state, trigger active; keyFrom/accessor/types string", r.a11ySort1, ['a,c,b', 'ascending', 'sorted-asc', 'active']);
  E("a11y 'sort' desc", r.a11ySort2, ['descending', 'sorted-desc']);
  E("a11y 'sort' cleared", r.a11ySort3, ['none', '', '']);
  E('types removed: detection as number', r.typesNumber, 'a,c,b');
  E("a11y 'none' writes no aria / state token", r.a11yNone, [null, 'sorted-asc']);
  E('initialState wins over markup seed, no reorder', r.initialWins, ['{"key":"d","dir":"asc"}', 'c,a,b']);
  E('markup seed wins over urlSync', r.seedOverUrl, ['{"key":"p","dir":"asc"}', 'c,a,b']);
  E('urlSync read on create (?sk=n&sd=desc)', r.urlRead, ['3,2,1', '{"key":"n","dir":"desc"}']);
  E('urlSync asc drops dir, keeps other params', r.urlAsc, '?sk=n&keep=1');
  E('urlSync desc', r.urlDesc, '?sk=n&keep=1&sd=desc');
  E('urlSync reset clears both', r.urlReset, '?keep=1');

  const has = s => warns.some(w => w.includes(s));
  ok('warn: selector out of root (once)', warns.filter(w => w.includes('"#outside-t" matches')).length === 1, warns.filter(w => w.includes('#outside-t')).length);
  ok('audit: target names no element', has('data-sort-target="missing-list" names no element'), '');
  ok('audit: tbody of a table targeted', has('data-sort-target="m6" names a list a Filter or a Table'), '');
  ok('no console errors', errors.length === 0, errors);
  await page.close();
}

// ── Lazy stub: create() before the bundle returns a Promise ──────────────
{
  const page = await browser.newPage();
  let release; const gate = new Promise(r => (release = r));
  await page.route('**/assets/js/nds-delegated.min.js*', async r => { await gate; await r.continue(); });
  await page.goto(`${BASE}/components/sort.html`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.NDS?.Sort);
  const stub = await page.evaluate(() => {
    const d = document.createElement('div');
    d.innerHTML = '<ul><li class="row" data-sort-n="2">2</li><li class="row" data-sort-n="1">1</li></ul>';
    document.body.append(d);
    const p = NDS.Sort.create(d, { items: '.row', triggers: [] });
    window.__p = p; window.__d = d;
    return { isStub: !!NDS.Sort.__ndsStub, promise: typeof p?.then === 'function' };
  });
  release();
  const after = await page.evaluate(async () => {
    const inst = await window.__p;
    inst.apply('n', 'asc');
    return [typeof inst.apply, [...window.__d.querySelectorAll('.row')].map(e => e.textContent).join(',')];
  });
  ok('stub before bundle: create() returns a Promise', stub.isStub && stub.promise, stub);
  ok('Promise resolves to a working instance', JSON.stringify(after) === JSON.stringify(['function', '1,2']), after);
  await page.close();
}

await browser.close();
const failed = results.filter(r => !r.pass);
for (const r of results) console.log(`${r.pass ? 'pass' : 'FAIL'}  ${r.name}${r.pass ? '' : '  got: ' + JSON.stringify(r.got)}`);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
