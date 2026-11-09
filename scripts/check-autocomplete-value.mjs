// Autocomplete data-value-field: the named hidden input holds the pick's value, and only while the text is that
// pick. A page that kept the id by hand once posted an old id for an emptied field (field report, 2026-11-05).
// Also runs the doc's page-code pattern: a pick keeps the item, any other text drops it; and selectItem(), a script's pick.
//
//   node scripts/check-autocomplete-value.mjs [baseUrl]
import { launch, log, step, STEP_MS } from './lib/browser.mjs';

const BASE = (process.argv[2] || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const PAGE = '/templates/service-template.html';
const SLOW = STEP_MS * 6;

const field = (id, attrs, text = '', value = '') => `<form class="nds-form" id="${id}-form"><div class="nds-form-container" id="${id}" data-display-field="Title" data-min-chars="0" ${attrs}>
<div class="nds-form-header"><label for="${id}-input"><span class="nds-label">Service</span></label></div>
<div class="nds-form-control"><input type="text" id="${id}-input" value="${text}" class="nds-input" autocomplete="on"><input type="hidden" name="${id}-id" value="${value}">
<div class="nds-form-action"><button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear" hidden><i class="nds-icon nds-hgi-cancel-01"></i></button></div></div></div></form>`;
const VALUE = 'data-value-field="Id" data-strict';
const FIXTURE = `<section id="fixture" class="nds-content-section"><div class="nds-section-body">
${field('pick', VALUE)}${field('saved', VALUE, 'Beta', '8')}${field('textonly', VALUE, 'Beta')}${field('zero', VALUE)}${field('plain', 'data-strict', '', 'mine')}${field('loose', 'data-value-field="Id"')}${field('page', '')}${field('unpicked', 'data-value-field="Id"', 'Beta')}${field('cold', VALUE)}
</div></section>`;
const SETUP = `<script type="module">
const items = [{ Id: 7, Title: 'Alpha' }, { Id: 8, Title: 'Beta' }, { Id: 0, Title: 'Zero' }];
for (const id of ['pick', 'saved', 'zero', 'plain', 'loose', 'page', 'unpicked']) await NDS.Autocomplete.create(document.getElementById(id), { items });
window.pageService = null;
const pageField = document.getElementById('page');
document.getElementById('page-input').addEventListener('input', () => { window.pageService = null; });
pageField.addEventListener('nds:autocomplete:select', (e) => { window.pageService = e.detail.item; });
window.setupDone = true;
</script>`;

let failed = 0;
const ok = (name, pass, detail) => { if (!pass) failed++; console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}  — ${JSON.stringify(detail)}`); };

const browser = await step('launch Chrome', () => launch({ timeout: SLOW }), SLOW);
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.route(`**${PAGE}`, async (route) => {
    const res = await route.fetch();
    const html = (await res.text()).replace(/(id="main-content">)[\s\S]*<\/section>(\s*<\/main>)/, `$1${FIXTURE}$2`).replace('</body>', `${SETUP}</body>`);
    if (!html.includes('id="fixture"')) throw new Error(`${PAGE}: no #main-content … </section></main> to swap`);
    await route.fulfill({ response: res, body: html });
});
await step(`load ${PAGE}`, () => page.goto(BASE + PAGE, { waitUntil: 'load' }), SLOW);
await step('setup', () => page.waitForFunction(() => window.setupDone), SLOW);

// What the form would post, and what the field's check says.
const read = (id) => page.evaluate(async (fieldId) => {
    const form = document.getElementById(`${fieldId}-form`);
    const check = await NDS.Autocomplete.validate(document.getElementById(fieldId), { showMessage: false });
    return { text: document.getElementById(`${fieldId}-input`).value, posted: Object.fromEntries(new FormData(form)), valid: check.valid };
}, id);
const isField = (r, text, id, name, valid) => r.text === text && r.posted[`${name}-id`] === id && r.valid === valid;
// Empty first: the menu lists what the text matches, unless the text is the last pick.
const choose = async (id, title) => {
    await page.click(`#${id}-input`);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.locator(`#${id} [role="option"]`, { hasText: title }).click();
};
const empty = async (id) => {
    await page.click(`#${id}-input`);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(400);
    await page.keyboard.press('Escape');   // data-min-chars="0" lists everything again, over the next field
};

// A click with data-min-chars="0": what the menu lists, and the row it marks.
const clickList = async (id) => {
    await page.click(`#${id}-input`);
    await page.locator(`#${id} [role="option"]`).first().waitFor({ timeout: SLOW });
    const shown = await page.evaluate((fieldId) => {
        const rows = [...document.querySelectorAll(`#${fieldId} [role="option"]`)];
        return { rows: rows.map((row) => row.textContent.trim()), active: rows.find((row) => row.matches('[data-state~="active"]'))?.textContent.trim() ?? null };
    }, id);
    await page.keyboard.press('Escape');
    return shown;
};
const listsAll = (shown) => shown.rows.length === 3 && shown.active === 'Beta';

let r;
await choose('pick', 'Alpha');
r = await read('pick');
ok('a pick writes the value', isField(r, 'Alpha', '7', 'pick', true), r);
ok('the nameless text input posts nothing', Object.keys(r.posted).length === 1, r.posted);

await page.keyboard.type('x');
r = await read('pick');
ok('new text empties it and fails strict', isField(r, 'Alphax', '', 'pick', false), r);

await empty('pick');
r = await read('pick');
ok('an emptied field holds no old value', isField(r, '', '', 'pick', true), r);

await choose('pick', 'Beta');
await page.hover('#pick .nds-form-control');
await page.click('#pick .nds-clear');
await page.waitForTimeout(50);
r = await read('pick');
ok('the clear button empties it', isField(r, '', '', 'pick', true), r);

await choose('pick', 'Beta');
await page.evaluate(() => NDS.Autocomplete.setValue('#pick', 'Beta'));
r = await read('pick');
ok('setValue with the same text keeps the pick', isField(r, 'Beta', '8', 'pick', true), r);
r = await clickList('pick');
ok('a click on a pick lists every item, the pick active', listsAll(r), r);
await page.evaluate(() => NDS.Autocomplete.setValue('#pick', 'Other'));
r = await read('pick');
ok('setValue with new text empties it', isField(r, 'Other', '', 'pick', false), r);
await page.evaluate(() => NDS.Autocomplete.setValue('#pick', 'Beta'));
r = await read('pick');
ok('the last pick\'s text does not pass with no value', isField(r, 'Beta', '', 'pick', false), r);

await choose('pick', 'Alpha');
await page.evaluate(() => NDS.Autocomplete.clear('#pick'));
r = await read('pick');
ok('clear() empties it', isField(r, '', '', 'pick', true), r);

r = await read('saved');
ok('a saved pick stays valid with its value', isField(r, 'Beta', '8', 'saved', true), r);
r = await clickList('saved');
ok('a click on a saved pick lists every item, the pick active', listsAll(r), r);
await choose('saved', 'Alpha');
r = await read('saved');
ok('a pick replaces the saved value', isField(r, 'Alpha', '7', 'saved', true), r);
await page.evaluate(() => document.getElementById('saved-form').reset());
await page.waitForTimeout(100);
r = await read('saved');
ok('a form reset puts back text and value', isField(r, 'Beta', '8', 'saved', true), r);
r = await clickList('saved');
ok('a click after a form reset lists every item, the pick active', listsAll(r), r);
r = await clickList('unpicked');
ok('text with no value is a search, not a pick', r.rows.length === 1 && r.active === null, r);

r = await read('textonly');
ok('text with no value fails before the field starts', isField(r, 'Beta', '', 'textonly', false), r);
await page.evaluate(() => NDS.Autocomplete.create('#textonly', { items: [] }));
r = await read('textonly');
ok('text with no value fails once it starts', isField(r, 'Beta', '', 'textonly', false), r);

await choose('zero', 'Zero');
r = await read('zero');
ok('a value of 0 is a value', isField(r, 'Zero', '0', 'zero', true), r);

await choose('saved', 'Alpha');
await page.evaluate(() => NDS.Autocomplete.destroy('#saved'));
r = await page.evaluate(() => document.querySelector('[name="saved-id"]').value);
ok('destroy leaves the hidden input alone', r === '7', r);

await choose('plain', 'Alpha');
await empty('plain');
r = await read('plain');
ok('without the attribute, a hidden input stays the page\'s', isField(r, '', 'mine', 'plain', true), r);

await page.click('#loose-input');
await page.keyboard.type('free');
await page.waitForTimeout(50);
r = await read('loose');
ok('without strict, free text passes with no value', isField(r, 'free', '', 'loose', true), r);

// The doc's #autocomplete-js pattern.
const held = () => page.evaluate(() => window.pageService?.Id ?? null);
await choose('page', 'Alpha');
ok('page code: a pick keeps the item', (await held()) === 7, await held());
await empty('page');
ok('page code: an emptied field drops it', (await held()) === null, await held());
await choose('page', 'Beta');
await page.hover('#page .nds-form-control');
await page.click('#page .nds-clear');
await page.waitForTimeout(50);
ok('page code: the clear button drops it', (await held()) === null, await held());
await choose('page', 'Beta');
await page.evaluate(() => NDS.Autocomplete.clear('#page'));
ok('page code: clear() drops it', (await held()) === null, await held());
await choose('page', 'Beta');
await page.evaluate(() => NDS.Autocomplete.setValue('#page', 'Other'));
ok('page code: setValue drops it', (await held()) === null, await held());
// The doc says a reset fires neither event, so page code handles it: this fails if that stops being true.
await choose('page', 'Beta');
await page.evaluate(() => document.getElementById('page-form').reset());
await page.waitForTimeout(100);
ok('page code: a form reset fires no input', (await held()) === 8, await held());

// selectItem(): a script's pick, on a started field and on one nothing has focused.
await page.evaluate(() => NDS.Autocomplete.setValue('#pick', 'Other'));
r = await page.evaluate(() => NDS.Autocomplete.selectItem('#pick', { Id: 8, Title: 'Beta' }));
ok('selectItem() returns true', r === true, r);
r = await read('pick');
ok('selectItem() writes text and value and passes strict', isField(r, 'Beta', '8', 'pick', true), r);
r = await page.evaluate(() => [NDS.Autocomplete.selectItem('#pick', null), NDS.Autocomplete.selectItem('#nope', { Id: 1 })]);
ok('selectItem() is false with no item or no field', r[0] === false && r[1] === false, r);
await page.evaluate(() => NDS.Autocomplete.selectItem('#page', { Id: 7, Title: 'Alpha' }));
ok('page code: selectItem() keeps the item', (await held()) === 7, await held());
await page.evaluate(() => NDS.Autocomplete.selectItem('#cold', { Id: 7, Title: 'Alpha' }));
r = await read('cold');
ok('selectItem() before the field starts writes text and value', isField(r, 'Alpha', '7', 'cold', true), r);
await page.evaluate(() => NDS.Autocomplete.create('#cold', { items: [] }));
r = await read('cold');
ok('a selectItem() before start counts as a pick once it starts', isField(r, 'Alpha', '7', 'cold', true), r);

await browser.close();
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
