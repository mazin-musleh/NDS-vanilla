// One input, one value, a panel of custom-selects behind it.
//
// The panel's open/close and each unit's keyboard nav belong to dropmenu and
// custom-select and are NOT re-tested here. What IS ours:
//
//   FORMAT   data-format alone decides the display string AND which unit pickers
//            the panel holds. No data-mode, no data-12h.
//   TYPING   the visible input is typeable. "9:30" parses lenient and is written
//            back padded; "2:30 م" and "2:30 PM" both mean 14:30. Junk must stamp
//            setCustomValidity so the submit is gated, not silently accepted.
//   VALUE    the input is DISPLAY, .nds-time-value is the contract, and only the
//            carrier carries a name — the visible field must never submit twice.
//   LAZY     the panel is built on first open, so setValue/getValue/clear have to
//            work before it exists and the units get seeded when it appears.
//   BOUNDS   min/max narrow per unit against the current picks. The case that
//            matters is a legal minute becoming illegal when the hour moves: it
//            snaps to the nearest live option, never commits out of range.
//   OFF-GRID a seeded 09:07 under step 15 keeps its own inserted option.
//
//   node scripts/check-time-picker.mjs [baseUrl]
// Defaults to the dev server. Start it with `bundle exec jekyll serve` if down.
import { launch } from './lib/browser.mjs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');

const PAGE = `${BASE}/components/time-picker.html`;
const probe = await fetch(PAGE).catch(() => null);
if (!probe?.ok) {
    console.error(`cannot reach ${PAGE} — is the dev server up? (bundle exec jekyll serve)`);
    process.exit(2);
}

const browser = await launch();
const results = [];
const ok = (name, pass, detail = '') => {
    results.push({ name, pass });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};

const page = await browser.newPage();
page.on('pageerror', (e) => console.error('PAGE ERROR:', e.message));
page.on('console', (m) => { if (m.type() === 'error') console.error('CONSOLE:', m.text()); });
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(PAGE, { waitUntil: 'networkidle' });
await page.waitForFunction(() => window.NDS?.TimePicker && window.NDS?.CustomSelect, null, { timeout: 15000 });

// Fields are built here rather than read off the page so a bounds case cannot
// drift with the doc page's demo cards. `id` lands on the CONTAINER.
const build = (id, attrs = {}, seed = '', typed = '') => page.evaluate(([id, attrs, seed, typed]) => {
    document.getElementById(id)?.remove();
    const el = document.createElement('div');
    el.className = 'nds-form-container nds-time-picker';
    el.id = id;
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    el.innerHTML = '<div class="nds-form-control">'
        + '<div class="nds-form-action">'
        + '<button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle" aria-label="t">'
        + '<i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i></button></div>'
        + '<input type="text" class="nds-input nds-time-input"'
        + (attrs['data-min-time'] ? ' data-min-time="' + attrs['data-min-time'] + '"' : '')
        + (attrs['data-max-time'] ? ' data-max-time="' + attrs['data-max-time'] + '"' : '')
        + (typed ? ' value="' + typed + '"' : '') + '>'
        + '<input type="hidden" class="nds-time-value" name="' + id + '_v"'
        + (seed ? ' value="' + seed + '"' : '') + '>'
        + '</div>';
    // A NAMED section, never querySelector('.nds-section-body'): on a `home`
    // layout the hero swiper's CLONED slides also contain one, and clones are
    // `inert`, so a field built there can never take focus and every typing
    // assertion fails on the harness rather than on the component.
    document.querySelector('#timePickerOverview .nds-section-body').appendChild(el);
    window.NDS.TimePicker.create(el);
    return id;
}, [id, attrs, seed, typed]);

// The panel may PORTAL to <body> when dropmenu opens it, so nothing here may
// reach it through `#id ...` — every lookup goes via the instance.
await page.evaluate(() => {
    window.__tp = {
        inst: (id) => document.querySelector('#' + id + ' .nds-time-input')._ndsTimePicker,
        panel: (id) => window.__tp.inst(id).elements.panel,
        unitFc: (id, u) => window.__tp.panel(id)
            .querySelector('[data-time-picker-unit="' + u + '"] .nds-form-control'),
        options: (id, u) => {
            const fc = window.__tp.unitFc(id, u);
            return Array.from((fc._customSelectDropdown || fc).querySelectorAll('.nds-select-option'));
        }
    };
});

const openPanel = async (id) => {
    await page.evaluate((id) => document.querySelector('#' + id + ' .nds-time-input').click(), id);
    await page.waitForFunction((id) => !!window.__tp.panel(id), id, { timeout: 4000 });
};

// Pick by real click inside the panel. A unit's menu may portal too, so the
// option is looked up through the back-reference custom-select stamps.
const pick = async (id, unit, value) => {
    await openPanel(id);
    await page.evaluate(([id, unit]) => {
        const fc = window.__tp.unitFc(id, unit);
        fc.querySelector('.nds-select-input').focus();
        fc.querySelector('.nds-select-input').click();
    }, [id, unit]);
    await page.waitForFunction(([id, unit]) => !!window.__tp.unitFc(id, unit)._customSelectDropdown,
        [id, unit], { timeout: 4000 });
    return page.evaluate(([id, unit, value]) => {
        const opt = window.__tp.options(id, unit).find((o) => o.dataset.value === value);
        if (!opt || opt.disabled) return false;
        opt.click();
        return true;
    }, [id, unit, value]);
};

// Type like a user. Deliberately focus() rather than click(): an earlier test's
// panel may still be portaled over <body> and would swallow a real click, and
// clicking the input also toggles the panel open, which is not what typing means.
const type = async (id, text) => {
    const sel = '#' + id + ' .nds-time-input';
    // scrollIntoView first: the section uses content-visibility, so an off-screen
    // field is not rendered and focus() silently no-ops on it. page.click scrolls
    // for you; page.focus does not.
    await page.evaluate((s) => {
        const i = document.querySelector(s);
        i.scrollIntoView({ block: 'center' });
        i.value = '';
        document.activeElement?.blur();
    }, sel);
    await page.focus(sel);
    if (text) await page.type(sel, text);
    await page.evaluate((s) => {
        const i = document.querySelector(s);
        i.blur();
        i.dispatchEvent(new Event('change', { bubbles: true }));
    }, sel);
};

const shown = (id) => page.$eval('#' + id + ' .nds-time-input', (el) => el.value);
const carrier = (id) => page.$eval('#' + id + ' .nds-time-value', (el) => el.value);
const unitsOf = (id) => page.evaluate((id) => Array.from(
    window.__tp.panel(id).querySelectorAll('[data-time-picker-unit]'))
    .map((e) => e.getAttribute('data-time-picker-unit')), id);
const optionValues = (id, unit) => page.evaluate(([id, unit]) =>
    window.__tp.options(id, unit).map((o) => ({ v: o.dataset.value, off: o.disabled })), [id, unit]);

// ---- LAZY PANEL --------------------------------------------------------

await build('lazy', { 'data-format': 'HH:mm' });
ok('the panel is not built until first open',
    (await page.$('#lazy .nds-time-picker-panel')) === null);
ok('setValue works before the panel exists', await page.evaluate(() =>
    NDS.TimePicker.setValue(document.getElementById('lazy'), '08:05')
    && NDS.TimePicker.getValue(document.getElementById('lazy')) === '08:05'));
await openPanel('lazy');
ok('the panel seeds its units from the value set before it existed', await page.evaluate(() =>
    window.__tp.unitFc('lazy', 'hour').querySelector('.nds-select-input').value === '08'));

// ---- FORMAT ------------------------------------------------------------

await build('h24', { 'data-format': 'HH:mm' });
await openPanel('h24');
ok('HH:mm gives hour + minute pickers', JSON.stringify(await unitsOf('h24')) === '["hour","minute"]');
const h24hours = await optionValues('h24', 'hour');
ok('24h hour list is 0-23', h24hours.length === 24 && h24hours[23].v === '23', `${h24hours.length} options`);

await build('h12', { 'data-format': 'hh:mm A', 'data-step': '15' });
await openPanel('h12');
ok('hh:mm A adds the meridiem picker',
    JSON.stringify(await unitsOf('h12')) === '["hour","minute","meridiem"]');
ok('12h hour list is 1-12', (await optionValues('h12', 'hour')).length === 12);
ok('data-step=15 gives exactly 00/15/30/45',
    JSON.stringify((await optionValues('h12', 'minute')).map((o) => o.v)) === '["0","15","30","45"]');

await build('secs', { 'data-format': 'HH:mm:ss' });
await openPanel('secs');
ok('HH:mm:ss adds the second picker',
    JSON.stringify(await unitsOf('secs')) === '["hour","minute","second"]');

// ---- TYPING ------------------------------------------------------------

await build('typed', { 'data-format': 'HH:mm' });
await type('typed', '9:30');
ok('typing "9:30" is accepted and written back padded', (await shown('typed')) === '09:30',
    `shown "${await shown('typed')}"`);
ok('typing fills the carrier', (await carrier('typed')) === '09:30', `carrier "${await carrier('typed')}"`);

// Drive the language explicitly: this harness runs against an lang="en" doc page,
// so nothing here may assume the page's own default.
await page.evaluate(() => document.documentElement.setAttribute('lang', 'ar'));
await build('typed12', { 'data-format': 'hh:mm A' });
await type('typed12', '2:30 PM');
ok('typing "2:30 PM" means 14:30', (await carrier('typed12')) === '14:30',
    `carrier "${await carrier('typed12')}"`);
ok('the display re-renders in the page language (ص/م)', /م/.test(await shown('typed12')),
    `shown "${await shown('typed12')}"`);

await type('typed12', '2:30 م');
ok('the Arabic meridiem parses too', (await carrier('typed12')) === '14:30',
    `carrier "${await carrier('typed12')}"`);
await page.evaluate(() => document.documentElement.setAttribute('lang', 'en'));

await build('bad', { 'data-format': 'HH:mm' });
await type('bad', '99:99');
ok('typed junk blocks the submit via setCustomValidity', await page.evaluate(() => {
    const i = document.querySelector('#bad .nds-time-input');
    return i.checkValidity() === false && i.validationMessage.length > 0;
}));
ok('typed junk leaves the carrier empty', (await carrier('bad')) === '', `carrier "${await carrier('bad')}"`);
await type('bad', '10:15');
ok('a good value afterwards clears the validity stamp', await page.evaluate(() =>
    document.querySelector('#bad .nds-time-input').checkValidity() === true));

ok('a typed value outside bounds is refused', await (async () => {
    await build('typedOut', { 'data-format': 'HH:mm', 'data-min-time': '09:00', 'data-max-time': '17:30' });
    await type('typedOut', '18:00');
    return page.evaluate(() => {
        const i = document.querySelector('#typedOut .nds-time-input');
        return i.checkValidity() === false
            && document.querySelector('#typedOut .nds-time-value').value === '';
    });
})());

// ---- PICKING -----------------------------------------------------------

await build('live', { 'data-format': 'hh:mm A', 'data-step': '15' });
await pick('live', 'hour', '2');
ok('the input stays empty until the time is complete', (await shown('live')) === '',
    `shown "${await shown('live')}"`);
await pick('live', 'minute', '30');
await pick('live', 'meridiem', 'pm');
ok('picking 2:30 pm writes 14:30 to the carrier', (await carrier('live')) === '14:30',
    `carrier "${await carrier('live')}"`);
ok('picking writes the localized display to the input', /2:30/.test(await shown('live')),
    `shown "${await shown('live')}"`);
ok('getValue() reads the 24h value', (await page.evaluate(() =>
    NDS.TimePicker.getValue(document.getElementById('live')))) === '14:30');

ok('clear() empties the input and the carrier', await page.evaluate(() => {
    const el = document.getElementById('live');
    NDS.TimePicker.clear(el);
    return el.querySelector('.nds-time-input').value === ''
        && el.querySelector('.nds-time-value').value === '';
}));

ok('12h midnight is 00:xx not 12:xx', await (async () => {
    await build('mid', { 'data-format': 'hh:mm A' });
    return page.evaluate(() => {
        NDS.TimePicker.setValue(document.getElementById('mid'), '00:05');
        return NDS.TimePicker.getValue(document.getElementById('mid')) === '00:05';
    });
})());

ok('setValue rejects 25:00 and writes nothing', await page.evaluate(() => {
    const el = document.getElementById('h24');
    return NDS.TimePicker.setValue(el, '25:00') === false
        && el.querySelector('.nds-time-value').value === '';
}));

// Only the carrier has a name — the visible field must not submit as well.
ok('only the carrier submits', await page.evaluate(() => {
    const el = document.getElementById('h24');
    NDS.TimePicker.setValue(el, '08:05');
    const form = document.createElement('form');
    el.parentNode.insertBefore(form, el);
    form.appendChild(el);
    const keys = [...new FormData(form).keys()];
    return keys.length === 1 && keys[0] === 'h24_v';
}));

// ---- OFF-GRID ----------------------------------------------------------

await build('offgrid', { 'data-format': 'HH:mm', 'data-step': '15' }, '09:07');
ok('a seeded off-grid 09:07 survives step 15', (await carrier('offgrid')) === '09:07',
    `carrier "${await carrier('offgrid')}"`);
await openPanel('offgrid');
const offMinutes = (await optionValues('offgrid', 'minute')).map((o) => o.v);
ok('the off-grid minute is inserted in sorted position',
    JSON.stringify(offMinutes) === '["0","7","15","30","45"]', JSON.stringify(offMinutes));

// ---- BOUNDS ------------------------------------------------------------

await build('bounds', { 'data-format': 'HH:mm', 'data-min-time': '09:00', 'data-max-time': '17:30' });
await openPanel('bounds');
const bHours = await optionValues('bounds', 'hour');
ok('hours before min are disabled', bHours.slice(0, 9).every((o) => o.off));
ok('hours after max are disabled', bHours.slice(18).every((o) => o.off));
ok('in-range hours stay live', bHours.slice(9, 18).every((o) => !o.off));

await pick('bounds', 'hour', '17');
const bMinutes = await optionValues('bounds', 'minute');
ok('a picked hour re-narrows the minutes under it',
    bMinutes.filter((o) => !o.off).every((o) => Number(o.v) <= 30) && bMinutes.some((o) => o.off),
    `live: ${bMinutes.filter((o) => !o.off).map((o) => o.v).join(',')}`);

await build('snap', { 'data-format': 'HH:mm', 'data-step': '15', 'data-min-time': '09:00', 'data-max-time': '17:15' });
await pick('snap', 'hour', '9');
await pick('snap', 'minute', '45');
ok('09:45 commits inside bounds', (await carrier('snap')) === '09:45', `carrier "${await carrier('snap')}"`);
await pick('snap', 'hour', '17');
ok('an out-of-range minute snaps to the nearest live one', (await carrier('snap')) === '17:15',
    `carrier "${await carrier('snap')}"`);

ok('setValue refuses a value outside bounds', await page.evaluate(() =>
    NDS.TimePicker.setValue(document.getElementById('snap'), '18:00') === false));

// ---- REQUIRED ----------------------------------------------------------

// The visible input is a real, native, typeable field, so data-required works
// through forms unmodified — no per-unit propagation, and no error message
// stranded inside a closed panel.
ok('an empty required field fails validateForm', await (async () => {
    await build('req', { 'data-format': 'hh:mm A', 'data-required': '' });
    return page.evaluate(() => {
        const el = document.getElementById('req');
        const form = document.createElement('form');
        form.className = 'nds-form';
        el.parentNode.insertBefore(form, el);
        form.appendChild(el);
        return NDS.Forms.validateForm(form, { showMessages: false, focusFirst: false }).valid === false;
    });
})());

ok('a filled required field passes validateForm', await page.evaluate(() => {
    const el = document.getElementById('req');
    NDS.TimePicker.setValue(el, '14:30');
    return NDS.Forms.validateForm(el.closest('form'), { showMessages: false, focusFirst: false }).valid === true;
}));

// ---- LOCALIZATION ------------------------------------------------------

ok('a lang toggle re-renders the display and keeps the value', await (async () => {
    await page.evaluate(() => document.documentElement.setAttribute('lang', 'ar'));
    await build('lang', { 'data-format': 'hh:mm A' });
    await page.evaluate(() => NDS.TimePicker.setValue(document.getElementById('lang'), '14:30'));
    const arShown = await shown('lang');
    await page.evaluate(() => document.documentElement.setAttribute('lang', 'en'));
    await page.waitForFunction(() => /PM/.test(document.querySelector('#lang .nds-time-input').value),
        null, { timeout: 4000 }).catch(() => {});
    const enShown = await shown('lang');
    const kept = await carrier('lang');
    await page.evaluate(() => document.documentElement.setAttribute('lang', 'en'));
    return /م/.test(arShown) && /PM/.test(enShown) && kept === '14:30';
})());

// ---- SCROLLING ---------------------------------------------------------

// The panel is a dropmenu, so flipping/portalling is dropmenu's job — but this
// component uses the DEFAULT applyPosition (date-picker overrides it with its
// own), so it has to be confirmed that the default path actually holds here.
// A panel that detaches from its field on scroll is the classic failure.
// `filler` only for the scrollable-container cases — in the bottom-pinned case it
// would push the field back UP the viewport and quietly test nothing.
const buildProbe = (boxCss, filler = true, open = true) => page.evaluate(([boxCss, filler, open]) => {
    document.getElementById('probeBox')?.remove();
    const box = document.createElement('div');
    box.id = 'probeBox';
    box.style.cssText = boxCss;
    const el = document.createElement('div');
    el.className = 'nds-form-container nds-time-picker';
    el.id = 'probe';
    el.setAttribute('data-format', 'hh:mm A');
    el.innerHTML = '<div class="nds-form-control">'
        + '<input type="text" id="probeIn" class="nds-input nds-time-input">'
        + '<input type="hidden" class="nds-time-value" name="probe_v"></div>';
    box.appendChild(el);
    if (filler) {
        const pad = document.createElement('div');
        pad.style.height = '400px';
        box.appendChild(pad);
    }
    document.body.appendChild(box);
    window.NDS.TimePicker.create(el);
    if (open) el.querySelector('.nds-time-input').click();
}, [boxCss, filler, open]);

const probeGeom = () => page.evaluate(() => {
    const tp = document.querySelector('#probe .nds-time-input')._ndsTimePicker;
    const panel = tp.elements.panel;
    const f = tp.elements.formControl.getBoundingClientRect();
    const r = panel.getBoundingClientRect();
    return { gap: Math.round(r.top - f.bottom), top: Math.round(r.top), bottom: Math.round(r.bottom),
             fieldTop: Math.round(f.top), vh: window.innerHeight,
             vertical: panel.getAttribute('data-position-vertical') || '-',
             position: getComputedStyle(panel).position,
             portaled: panel.parentElement === document.body,
             open: (panel.getAttribute('data-state') || '').includes('open') };
});

// 1. Plain page scroll — the panel is absolute inside the field, so it should
//    simply travel with it.
// margin-bottom so the probe is not the last thing on the page — otherwise it
// cannot be scrolled to the centre and the panel flips, testing the wrong case.
// Scroll BEFORE opening: dropmenu decides flip-up vs flip-down at open time, so
// opening first and scrolling after would measure a stale decision.
await buildProbe('position:static;margin-bottom:900px', false, false);
await page.evaluate(() => document.getElementById('probe').scrollIntoView({ block: 'center' }));
await new Promise((r) => setTimeout(r, 400));
await page.evaluate(() => document.querySelector('#probe .nds-time-input').click());
await new Promise((r) => setTimeout(r, 600));
const beforeScroll = await probeGeom();
await page.evaluate(() => window.scrollBy(0, 300));
await new Promise((r) => setTimeout(r, 400));
const afterScroll = await probeGeom();
ok('the panel opens below a mid-page field', beforeScroll.gap > 0 && beforeScroll.gap < 16,
    `gap ${beforeScroll.gap}`);
ok('the panel stays pinned to its field through a page scroll',
    afterScroll.open && afterScroll.gap === beforeScroll.gap,
    `gap ${beforeScroll.gap} → ${afterScroll.gap}`);

// 2. Field pinned near the viewport bottom — the panel must flip above rather
//    than run off the edge.
await buildProbe('position:fixed;left:40px;bottom:12px;width:320px;z-index:5', false);
await new Promise((r) => setTimeout(r, 500));
const bottom = await probeGeom();
ok('a field near the viewport bottom flips its panel above',
    bottom.vertical === 'top' && bottom.bottom <= bottom.fieldTop + 1,
    `vertical=${bottom.vertical} panelBottom=${bottom.bottom} fieldTop=${bottom.fieldTop}`);
ok('the flipped panel is fully in view', bottom.top >= -1 && bottom.bottom <= bottom.vh + 1,
    `${bottom.top}..${bottom.bottom} of ${bottom.vh}`);

// 3. Field inside a clipping container — dropmenu must portal the panel out to
//    <body>, or it would be cut off by the container's overflow.
await buildProbe('position:fixed;top:200px;left:40px;width:360px;height:140px;overflow:auto;z-index:5');
await new Promise((r) => setTimeout(r, 500));
const clipped = await probeGeom();
ok('a panel inside a clipping container portals out to <body>',
    clipped.portaled && clipped.position === 'fixed',
    `parent=body:${clipped.portaled} position:${clipped.position}`);

// 4. …and once portaled it is position:fixed, so it only stays attached if
//    dropmenu actively tracks it. This is the one that silently breaks.
await page.evaluate(() => document.getElementById('probeBox').scrollBy(0, 60));
await new Promise((r) => setTimeout(r, 400));
const afterBoxScroll = await probeGeom();
await page.evaluate(() => window.scrollBy(0, 150));
await new Promise((r) => setTimeout(r, 400));
const afterPageScroll = await probeGeom();
ok('a portaled panel tracks its field on container and page scroll',
    afterBoxScroll.gap === clipped.gap && afterPageScroll.gap === clipped.gap,
    `gap ${clipped.gap} → ${afterBoxScroll.gap} → ${afterPageScroll.gap}`);

await page.evaluate(() => {
    document.getElementById('probeBox')?.remove();
    window.scrollTo(0, 0);
});
await new Promise((r) => setTimeout(r, 300));

// ---- PLACEHOLDER FIT ---------------------------------------------------

// The placeholder is the visible hint inside a deliberately compact box, so it
// has to FIT. "AM/PM" needed 53px in a 54px box before the meridiem was switched
// to a neutral dash. Measured per language, against an OPEN panel only — a closed
// one reports clientWidth 0 and would fake a pass or a fail.
const placeholderFit = (id) => page.evaluate((id) => {
    const panel = window.__tp.panel(id);
    return Array.from(panel.querySelectorAll('[data-time-picker-unit]')).map((u) => {
        const i = u.querySelector('.nds-select-input');
        const probe = document.createElement('span');
        probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:'
            + getComputedStyle(i).font;
        probe.textContent = i.placeholder;
        document.body.appendChild(probe);
        const need = Math.ceil(probe.getBoundingClientRect().width);
        probe.remove();
        return { unit: u.getAttribute('data-time-picker-unit'), ph: i.placeholder,
                 need, box: Math.round(i.clientWidth) };
    });
}, id);

for (const lang of ['ar', 'en']) {
    await page.evaluate((l) => document.documentElement.setAttribute('lang', l), lang);
    await build('fit_' + lang, { 'data-format': 'hh:mm:ss A' });
    await openPanel('fit_' + lang);
    const rows = await placeholderFit('fit_' + lang);
    const tight = rows.filter((r) => r.need > r.box);
    ok(`no placeholder clips in ${lang}`, tight.length === 0 && rows.length === 4,
        rows.map((r) => `${r.unit}:${r.need}/${r.box}`).join(' '));
    // Not just "fits" — it must not be within a rounding error of clipping.
    const cramped = rows.filter((r) => r.box - r.need < 8);
    ok(`every placeholder keeps >=8px slack in ${lang}`, cramped.length === 0,
        cramped.map((r) => `${r.unit} slack ${r.box - r.need}`).join(' ') || 'all comfortable');
}
await page.evaluate(() => document.documentElement.setAttribute('lang', 'en'));

// ---- FIELD IDENTITY ----------------------------------------------------

// A form field with neither id nor name trips HTML linters, and the unit inputs
// are deliberately nameless so only .nds-time-value submits — so they must carry
// an id. Derived from the field, so two pickers on one page cannot collide.
ok('every generated unit input has an id', await (async () => {
    await build('ids1', { 'data-format': 'hh:mm:ss A' });
    await openPanel('ids1');
    return page.evaluate((id) => Array.from(
        window.__tp.panel(id).querySelectorAll('.nds-select-input')).every((i) => !!i.id), 'ids1');
})());

ok('unit inputs carry no name — only the carrier submits', await page.evaluate((id) =>
    Array.from(window.__tp.panel(id).querySelectorAll('input')).every((i) => !i.name), 'ids1'));

ok('two pickers on one page get distinct unit ids', await (async () => {
    await build('ids2', { 'data-format': 'hh:mm:ss A' });
    await openPanel('ids2');
    return page.evaluate(() => {
        const of = (id) => Array.from(window.__tp.panel(id).querySelectorAll('.nds-select-input')).map((i) => i.id);
        const all = of('ids1').concat(of('ids2'));
        return new Set(all).size === all.length && all.length === 8;
    });
})());

ok('unit ids survive a panel rebuild', await page.evaluate(async () => {
    const before = Array.from(window.__tp.panel('ids1').querySelectorAll('.nds-select-input')).map((i) => i.id);
    document.documentElement.setAttribute('lang', 'en');
    await new Promise((r) => setTimeout(r, 300));
    const after = Array.from(window.__tp.panel('ids1').querySelectorAll('.nds-select-input')).map((i) => i.id);
    document.documentElement.setAttribute('lang', 'ar');
    return JSON.stringify(before) === JSON.stringify(after) && before.length === 4;
}));

// ---- LIFECYCLE ---------------------------------------------------------

ok('destroy() removes the panel, the sentinel and the dropmenu hooks', await page.evaluate(() => {
    const el = document.getElementById('h24');
    el.querySelector('.nds-time-input')._ndsTimePicker.destroy();
    return !el.querySelector('.nds-time-input')._ndsTimePicker
        && !el.hasAttribute('data-nds-time-picker-initialized')
        && !el.querySelector('.nds-form-control').classList.contains('nds-dropmenu');
}));

ok('create() after destroy() rebuilds once, not twice', await page.evaluate(() => {
    const el = document.getElementById('h24');
    NDS.TimePicker.create(el);
    NDS.TimePicker.create(el);
    return !!el.querySelector('.nds-time-input')._ndsTimePicker
        && !el.querySelector('.nds-time-input')._ndsTimePicker.isPanelCreated;
}));

ok('init() is idempotent over an already-built field', await page.evaluate(() => {
    NDS.TimePicker.init();
    NDS.TimePicker.init();
    return !!window.__tp.panel('h12');
}));

await browser.close();

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
