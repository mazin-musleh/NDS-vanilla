// nds-password behavior check against the running dev server (:4002).
// Asserts: rule chips survive a failed submit, match chip is live, an unknown
// data-rule name stays inert, and the live region announces progress.
//   node scripts/check-password.mjs
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const CHROME = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
].find((p) => p && existsSync(p));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 1200 });
await page.goto('http://localhost:4002/NDS-vanilla/playground.html', { waitUntil: 'networkidle0' });
await page.evaluate(() => window.NDS.loadBundle('delegated'));
await page.waitForSelector('.nds-password[data-nds-password-initialized]');

const type = (sel, v) => page.evaluate((s, val) => {
    const el = document.querySelector(s);
    el.value = val;
    el.dispatchEvent(new Event('input', { bubbles: true }));
}, sel, v);

const snapshot = () => page.evaluate(() => {
    const chips = [...document.querySelectorAll('#pg-new-password-rules .nds-feedback')];
    const footer = document.querySelector('.nds-password [data-feedback-target]');
    return {
        chips: chips.map((c) => ({ rule: c.dataset.rule, status: c.dataset.status, hidden: c.hasAttribute('hidden') })),
        strength: document.querySelector('.nds-password').getAttribute('data-password-strength'),
        // Direct children only: the rule chips now live in this footer too.
        footerMessages: footer ? footer.querySelectorAll(':scope > .nds-feedback').length : -1,
        live: document.querySelector('.nds-password-status').textContent,
        matchChip: document.querySelector('[data-rule="match"]').dataset.status,
    };
});

const fails = [];
const ok = (label, cond, got) => {
    console.log(`${cond ? 'PASS' : 'FAIL'}  ${label}${cond ? '' : `  → got ${JSON.stringify(got)}`}`);
    if (!cond) fails.push(label);
};

// 0. An empty field scores 0 on every container. The confirm field is the trap:
// its match rule sees empty === empty and would otherwise count as a pass while
// the chip paints neutral, parking a strength meter at 100% before any typing.
const idle = await page.evaluate(() => [...document.querySelectorAll('.nds-password')].map((c) => ({
    strength: c.getAttribute('data-password-strength'),
    green: [...c.querySelectorAll('[data-rule]')].filter((x) => x.dataset.status === 'success').length,
})));
ok('empty fields score 0 with no green chips',
    idle.every((c) => c.strength === '0' && c.green === 0), idle);

// 1. Weak password paints chips per rule
await type('#pg-new-password', 'abc');
const weak = await snapshot();
ok('weak value paints mixed chip statuses',
    weak.chips.some((c) => c.status === 'success') && weak.chips.some((c) => c.status === 'error'), weak.chips);
ok('strength reflects passing count', weak.strength === String(weak.chips.filter((c) => c.status === 'success').length), weak.strength);

// 2. A validation message takes over the footer: chips hide, then come back.
// They must never be visible under the container's error tint (their own
// data-status would contradict it — red text, neutral icon).
await page.click('#pg-password-form button[type="submit"]');
await new Promise((r) => setTimeout(r, 300));
const submitted = await snapshot();
ok('failed submit hides the chips', submitted.chips.every((c) => c.hidden), submitted.chips);
ok('exactly one message in the footer slot', submitted.footerMessages === 1, submitted.footerMessages);
await type('#pg-new-password', 'abcd');
const restored = await snapshot();
ok('typing restores the chips', restored.chips.every((c) => !c.hidden), restored.chips);
ok('message gone once chips return', restored.footerMessages === 0, restored.footerMessages);

// 3. Match chip is live
await type('#pg-new-password', 'Str0ng!Passw0rd');
await type('#pg-retype-password', 'Str0ng!Passwor');
ok('match chip errors on mismatch', (await snapshot()).matchChip === 'error', (await snapshot()).matchChip);
await type('#pg-retype-password', 'Str0ng!Passw0rd');
ok('match chip passes when equal', (await snapshot()).matchChip === 'success', (await snapshot()).matchChip);

// 4. Editing the SOURCE re-checks the confirm field
await type('#pg-new-password', 'Str0ng!Passw0rdX');
ok('editing source re-errors the match chip', (await snapshot()).matchChip === 'error', (await snapshot()).matchChip);

// 5. Prototype-inherited rule names stay inert
const inert = await page.evaluate(() => {
    const container = document.querySelector('.nds-password');
    const chip = document.querySelector('#pg-new-password-rules .nds-feedback').cloneNode(true);
    chip.dataset.rule = 'toString';
    chip.removeAttribute('data-rule-pattern');
    chip.dataset.status = 'neutral';
    document.querySelector('#pg-new-password-rules').appendChild(chip);
    window.NDS.Password.destroy(container);
    window.NDS.Password.create(container);
    const input = document.querySelector('#pg-new-password');
    input.value = 'Str0ng!Passw0rd';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    return { status: chip.dataset.status, strength: container.getAttribute('data-password-strength') };
});
ok('data-rule="toString" stays neutral and uncounted', inert.status === 'neutral' && inert.strength === '6', inert);

// 6. Live region announces after the debounce
await new Promise((r) => setTimeout(r, 700));
const live = (await snapshot()).live;
ok('live region announces progress', /\d/.test(live) && live.length > 0, live);
console.log(`       live text: "${live}"`);

await browser.close();
console.log(fails.length ? `\n${fails.length} FAILED` : '\nall passed');
process.exit(fails.length ? 1 : 0);
