// NDS.date against Intl itself: every day 2018–2037 must round-trip gregory ↔ hijri
// exactly, Arabic digits and bidi marks must parse, a day that does not exist must not.
// Loads _js/nds-core.js into a blank page, so no build is needed. ENGINE=webkit runs it as Safari.
// Usage: node scripts/check-date.mjs
import { join } from 'node:path';
import { launch, ENGINE } from './lib/browser.mjs';

const CORE = join(import.meta.dirname, '..', '_js', 'nds-core.js');

const browser = await launch();
const fails = [];
// Tokyo: local midnight is the previous day in Riyadh, so a timezone leak shows.
for (const timezoneId of ['Asia/Tokyo', 'America/Los_Angeles']) {
    const page = await (await browser.newContext({ timezoneId })).newPage();
    await page.setContent('<html lang="ar"><body></body></html>');
    await page.addScriptTag({ path: CORE });
    const out = await page.evaluate(() => {
        const D = NDS.date, bad = [];
        const uq = new Intl.DateTimeFormat('en', { calendar: 'islamic-umalqura', numberingSystem: 'latn', timeZone: 'UTC', year: 'numeric', month: 'numeric', day: 'numeric' });
        const truth = (t) => { const p = {}; for (const x of uq.formatToParts(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), 12))) p[x.type] = x.value; return `${p.day.padStart(2, '0')}/${p.month.padStart(2, '0')}/${p.year}`; };
        let days = 0;
        for (let t = new Date(2018, 0, 1); t < new Date(2038, 0, 1); t = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1)) {
            days++;
            const h = D.format(t, { calendar: 'hijri', format: 'DD/MM/YYYY' });
            if (h !== truth(t)) bad.push(`g→h ${t.toDateString()}: ${h} ≠ ${truth(t)}`);
            const back = D.parse(h, { calendar: 'hijri', format: 'DD/MM/YYYY' });
            if (!back || back.getTime() !== t.getTime()) bad.push(`h→g ${h}: ${back && back.toDateString()} ≠ ${t.toDateString()}`);
            if (bad.length > 10) break;
        }
        const eq = (name, got, want) => { if (got !== want) bad.push(`${name}: ${JSON.stringify(got)} ≠ ${JSON.stringify(want)}`); };
        const iso = (d) => d && D.format(d, { format: 'YYYY-MM-DD' });
        eq('arabic-indic digits', iso(D.parse('٠٣/٠٤/٢٠٢٦', { format: 'DD/MM/YYYY' })), '2026-04-03');
        eq('persian digits', iso(D.parse('۰۳/۰۴/۲۰۲۶', { format: 'DD/MM/YYYY' })), '2026-04-03');
        eq('bidi marks', iso(D.parse('‏03‏/04/2026؜', { format: 'DD/MM/YYYY' })), '2026-04-03');
        eq('format order', iso(D.parse('04/03/2026', { format: 'MM/DD/YYYY' })), '2026-04-03');
        eq('YY', iso(D.parse('3.4.26', { format: 'D.M.YY' })), '2026-04-03');
        eq('month only', iso(D.parse('04/2026', { format: 'MM/YYYY' })), '2026-04-01');
        eq('31 April', D.parse('31/04/2026', { format: 'DD/MM/YYYY' }), null);
        eq('29 Feb 2027', D.parse('29/02/2027', { format: 'DD/MM/YYYY' }), null);
        eq('wrong shape', D.parse('2026-04-03', { format: 'DD/MM/YYYY' }), null);
        // Umm al-Qura 1448/4 has 30 days and 1448/3 has 29.
        eq('hijri 30/04/1448', iso(D.parse('30/04/1448', { calendar: 'hijri', format: 'DD/MM/YYYY' })), '2026-10-11');
        eq('hijri 30/03/1448', D.parse('30/03/1448', { calendar: 'hijri', format: 'DD/MM/YYYY' }), null);
        eq('convert', D.convert('11/10/2026', { format: 'DD/MM/YYYY' }, { calendar: 'hijri', format: 'YYYY-MM-DD' }), '1448-04-30');
        eq('site format default', D.format(new Date(2026, 3, 3)), '03/04/2026');
        document.documentElement.dataset.dateFormat = 'YYYY/MM/DD';
        eq('site format attribute', D.format(new Date(2026, 3, 3)), '2026/04/03');
        eq('intl path', D.format(new Date(2026, 3, 3), { locale: 'en', year: 'numeric', month: 'long', day: 'numeric' }), 'April 3, 2026');
        // today(): the visitor's day when unset, the site zone's day when set.
        const now = new Date();
        eq('today, no zone', iso(D.today()), iso(new Date(now.getFullYear(), now.getMonth(), now.getDate())));
        document.documentElement.dataset.timezone = 'Pacific/Kiritimati';
        const p = {}; for (const x of new Intl.DateTimeFormat('en', { timeZone: 'Pacific/Kiritimati', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now)) p[x.type] = x.value;
        eq('today, site zone', iso(D.today()), `${p.year}-${p.month}-${p.day}`);
        document.documentElement.dataset.timezone = 'Mars/Olympus';
        eq('bad zone falls back', D.site.timeZone, undefined);
        return { days, bad };
    });
    console.log(`${ENGINE} ${timezoneId}: ${out.days} days, ${out.bad.length} failures`);
    fails.push(...out.bad.map((b) => `${timezoneId} ${b}`));
}
await browser.close();
for (const f of fails) console.error('  ' + f);
process.exit(fails.length ? 1 : 0);
