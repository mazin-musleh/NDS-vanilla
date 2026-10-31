// v2 consistency, batch 6a (plans/v2-consistency.md 2.5): create, destroy and getInstance take the
// element, its id or a selector. For each component the loader lists, on its own doc page: destroy then
// create by element (passes on the old build and the new); with --new, the same by id and by '#id'.
//
//   node scripts/check-v2-batch6a.mjs [baseUrl] [--new] [--only=Tabs,Modal]
import { launch, log } from './lib/browser.mjs';

const BASE = (process.argv.find((a) => a.startsWith('http')) || 'http://localhost:4002/NDS-vanilla').replace(/\/$/, '');
const NEW = process.argv.includes('--new');
const ONLY = (process.argv.find((a) => a.startsWith('--only=')) || '').slice(7).split(',').filter(Boolean);
const browser = await launch();
let failed = 0;
const check = (ok, msg) => { if (!ok) failed++; log(`${ok ? 'pass' : 'FAIL'} ${msg}`); };
const kebab = (name) => name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

async function open(path) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    const res = await page.goto(`${BASE}/${path}`, { waitUntil: 'load' }).catch(() => null);
    if (!res || !res.ok()) { await ctx.close(); return null; }
    await page.waitForFunction(() => document.documentElement.hasAttribute('data-nds-loaded'));
    await page.evaluate(() => NDS.init.ready);
    await page.waitForTimeout(500);
    await page.evaluate(() => document.getElementById('nds-cookies-panel')?.remove());
    return page;
}

// The registry, read from any page.
const first = await open('components/button.html');
const names = await first.evaluate(() => NDS.init.components.filter((c) => c.selector).map((c) => c.name));
await first.context().close();

let covered = 0;
const skipped = [];
for (const name of names.filter((n) => !ONLY.length || ONLY.includes(n))) {
    let page = null;
    for (const dir of ['components', 'utilities', 'ui-shell']) if ((page = await open(`${dir}/${kebab(name)}.html`))) break;
    if (!page) { skipped.push(`${name} (no page)`); continue; }
    const r = await page.evaluate(async ({ name, NEW }) => {
        const api = NDS[name];
        const entry = NDS.init.components.find((c) => c.name === name);
        // The backref may carry a part name after the component's (Table: ndsTableResponsive).
        const keyOf = (x) => Object.keys(x).find((k) => k === 'nds' + name || k.startsWith('nds' + name));
        // The instance may sit on a part the selector does not name (Custom Select: its form control).
        const live = (x) => keyOf(x) && !x.closest('template, [data-canon], .nds-doc-variants');
        const el = [...document.querySelectorAll(entry.selector)].find(live) || [...document.querySelectorAll('body *')].find(live);
        const key = el && keyOf(el);
        if (!el || typeof api?.create !== 'function' || typeof api?.destroy !== 'function') return { skip: !el ? 'no live instance' : 'no create/destroy' };
        const out = {};
        const settle = () => new Promise((res) => setTimeout(res, 50));
        const cycle = async (ref, label) => {
            await api.destroy(ref); await settle();
            out[`${label} destroy`] = !el[key];
            await api.create(ref); await settle();
            // Chart rebuilds only from the config create() is given (row 2.9).
            if (name !== 'Chart') out[`${label} create`] = !!el[key];
            if (typeof api.getInstance === 'function') out[`${label} getInstance`] = (await api.getInstance(ref)) === el[key];
        };
        await cycle(el, 'element');
        if (NEW) {
            el.id ||= 'b6a-' + name.toLowerCase();
            await cycle(el.id, 'id');
            await cycle('#' + el.id, '#id');
        }
        return out;
    }, { name, NEW });
    await page.context().close();
    if (r.skip) { skipped.push(`${name} (${r.skip})`); continue; }
    covered++;
    for (const [what, ok] of Object.entries(r)) check(ok, `${name}: ${what}`);
}

// Modal.open takes '#id' too (it took a bare id only).
if (NEW && (!ONLY.length || ONLY.includes('Modal'))) {
    const page = await open('components/modal.html');
    const r = await page.evaluate(async () => {
        const modal = [...document.querySelectorAll('dialog.nds-modal[id]')][0];
        await NDS.Modal.open('#' + modal.id);
        await new Promise((res) => setTimeout(res, 300));
        const opened = modal.open;
        NDS.Modal.close();
        return opened;
    });
    check(r, 'Modal: open(\'#id\') opens it');
    await page.context().close();
}

await browser.close();
log(`${covered} components cycled; skipped: ${skipped.join(', ') || 'none'}`);
log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
