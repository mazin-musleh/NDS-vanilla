# Date rework

Owner decisions (2026-10-07): `NDS.date` lives in core and is built first, then every date component moves onto it in the same pass · the site sets its timezone and date order on `<html>` · no setting = the visitor's own timezone · the documented Hijri APIs are removed in v2, with Migration lines. Sort is out of scope (TODO: it compares a value, not a displayed date).

## Why it is more than a setting

Measured 2026-10-07 in V8 against `Intl` `islamic-umalqura`, every day from 2018 to 2037 (7,305 days):

| Path | Wrong days | Off by |
|---|---|---|
| Date Picker, main path (today's Umm al-Qura date + tabular 29/30 month math, `convertUsingReference` / `addDaysToHijriDate`) | 7,160 Gregorian → Hijri · 6,389 Hijri → Gregorian | up to 2 days |
| Date Picker, fallback (`Intl` `islamic`) | 4,519 | 1 day |
| Date widget (`Intl` `islamic-umalqura`) | 0 | — |

The tabular model drifts within days of today: Umm al-Qura 1448/4 has 30 days, the model gives it 29, so from 1448/5/1 the picker labels each Hijri cell a day wrong. `scripts/check-date.mjs` (below) repeats this measurement against the new code.

Today the two components also disagree on "today": the picker uses Riyadh, and the date widget shows the visitor's date under a Riyadh cache key. A visitor west of UTC+3, after 21:00 UTC, caches today's text under tomorrow's key and sees it again until 21:00 UTC the next day.

## The setting

```html
<html lang="ar" dir="rtl" data-timezone="Asia/Riyadh" data-date-format="DD/MM/YYYY">
```

- `data-timezone`: an IANA name. Absent = the visitor's timezone (`Intl` default). Every date component reads it: "today" in Date Picker, the topbar date and clock, the Export file name date.
- `data-date-format`: the site's date order, in the picker's tokens (`YYYY YY MM M DD D`). Absent = `DD/MM/YYYY`. A picker's own `data-format` still overrides it.
- Read live from `<html>` on every call, so a page that sets them by script after load still works. An invalid timezone throws a `RangeError` in `Intl`: `NDS.date` catches it once, warns `[NDS.date]`, and uses the visitor's timezone.
- Documented in the `<html>` attribute table in `ui-shell/head.md` (beside `data-theme`), and on the new `core/date.md`.

## Step 1: `NDS.date` in `_js/nds-core.js`

Core, not a chunk: Date Picker (extras) and the date widget (delegated) call it synchronously, and a lazy stub cannot answer a sync call. Budget ~1–1.5 KB gz.

| Call | Returns |
|---|---|
| `NDS.date.parse(text, { format, calendar })` | a `Date` at local midnight of that day, or `null` |
| `NDS.date.format(date, { format, calendar, locale, numerals, timeZone, ...Intl options })` | a string |
| `NDS.date.convert(text, from, to)` | `format(parse(text, from), to)`; `from` and `to` are option objects |
| `NDS.date.site` | `{ timeZone, format }` from `<html>`, defaults applied (a getter) |

- **`calendar`:** any `Intl` calendar id; `hijri` is an alias for `islamic-umalqura`, the Saudi official calendar. Default `gregory`.
- **`format`:** with `format` set, the result is the token string filled from `formatToParts` in the chosen calendar and timeZone. Without it, the options go to `Intl.DateTimeFormat` as-is (`locale` defaults to `NDS.lang`). `numerals` sets `-u-nu-` (default `latn`, as `NDS.formatNumber` does).
- **`parse`:** maps Arabic-Indic (`٠-٩`) and Persian (`۰-۹`) digits to ASCII and strips the bidi marks `Intl` writes in Arabic output (U+200E, U+200F, U+061C) first. The caller always names the format (default: `NDS.date.site.format`): `03/04/2026` is ambiguous, so it never guesses. A day that does not exist (31/04, Hijri 30 in a 29-day month) returns `null`. `YY` keeps the picker's 20xx reading.
- **Non-Gregorian → Date: search, not math.** Estimate the day from the mean month length (29.53 days from 1/1/1 AH), read it back with `formatToParts` in that calendar, step by the difference, repeat until it matches (2–3 reads). If it never matches, the date does not exist: `null`. Work at UTC noon with `timeZone: 'UTC'` so no local offset can move the day.
- **Formatter cache:** the `dtf(locale, opts)` memo moves from `nds-timeDate.js` into core, and every call goes through it (an `Intl.DateTimeFormat` costs ICU init; `format` on an existing one is cheap).
- `ponytail:` calendars with 12 numbered months only (gregory, islamic-*, persian). Hebrew (leap month) and Japanese (era years) are out; add when a site asks. ICU's Umm al-Qura table covers 1300–1600 AH; outside it ICU falls back to `islamic-civil`.

**Check:** `scripts/check-date.mjs` (node, loads the `NDS.date` block with a stub `<html>`): every day 2018–2037 round-trips `gregory ↔ hijri` and matches `Intl` exactly; Arabic-Indic digits and bidi marks parse; nonexistent days return `null`; every token format round-trips. Ships in `scripts/`, runs before a release.

## Step 2: date widget (`_js/nds-timeDate.js`)

- Delete `getSaudiDate`, `getHijriParts`, `dtf` and `_fmtCache`. The date reads `NDS.date.format(new Date(), …)` in the site timezone. The cache key holds the site's date and its timezone, so both use one zone.
- The clock follows `data-timezone` too, or near midnight the date and the clock show different days. One `formatToParts` per minute (`hourCycle: 'h23'`).
- Delete `getHijriDate` (owner: removed in v2). `HIJRI_MONTHS` stays: Android ICU still prints Gregorian month names for the Islamic calendar (comment at :74).
- Update the banner Gotchas: "only the cache key follows Riyadh" goes.

## Step 3: Date Picker (`_js/nds-date-picker.js`)

Delete:
- `applyDateFormat`, `getParseConfig`, `parseWithFormat` and the token regex: `NDS.date.parse` / `format`. `detectFormatMode` stays (it reads the format, not a date).
- The Hijri engine: `gregorianToHijri`, `hijriToGregorian`, `convertUsingReference`, `gregorianToHijriUsingReference`, `hijriDateToDays`, `addDaysToHijriDate`, the Julian helpers, `isHijriLeapYear`, `_hijriCache`. Month length comes from `NDS.date` (the last day that parses), not from alternation.
- The async today-reference chain: `_accurateTodays*`, `getTodaysHijriDate`'s `.then`, `initializeHijriCalendarWithParsing`, `fetchAccurateHijriReference`, `storeAccurateHijriData`. Conversion is exact and synchronous, so the picker no longer depends on `NDS.TimeDate`, and a Hijri picker opens without the re-render.
- `createHijriDate` (owner: removed in v2).
- `getSaudiDateObject` → a local `siteToday()`: `NDS.date.parse(NDS.date.format(new Date(), { format: 'YYYY-MM-DD' }), { format: 'YYYY-MM-DD' })`.
- `DEFAULT_DATE_FORMAT` → `NDS.date.site.format`.

Keep: `CalendarConfig.gregorian` / `.hijri` with `formatDate`, `parseDate`, `generateCalendarData` and `monthNames` (the picker's own engines, now thin), the `_hijri*` stamp on a `Date` (the picker's data contract, `stampHijri`), and the 1400–1500 year guess that picks the calendar from a prefilled value.

Grid: convert the month's first day once, then step Gregorian days and read each cell's Hijri day: one `formatToParts` per cell, cached formatter.

Verify: `node scripts/doc-check.mjs components/date-picker.md` (owner's go-ahead first), Hijri mode in both languages, plus a page with `data-timezone="America/New_York"` after 21:00 UTC.

## Step 4: Export (`_js/nds-export.js`)

The file name date (:409, :415) uses `toISOString()`, which is the UTC date: between 00:00 and 03:00 Riyadh time it names yesterday. Use `NDS.date.format(new Date(), { format: 'YYYY-MM-DD' })`. Export reads no dates in the table: a cell exports its text or `data-export-value`. That does not change.

## Step 5: docs and records

- New `core/date.md` (`/nds-doc date`): the API, the two `<html>` attributes, the search note in one line. Sidemenu entry beside Request and Refresh.
- `ui-shell/head.md`: two rows in the `<html>` attribute table.
- `components/date-picker.md`: line 188 ("follow Riyadh time") → the site's timezone; drop the removed API rows (:299–301) and the sample at :318; point to `core/date.md`. `updated` bumps.
- `ui-shell/topbar.md`: drop `getHijriDate` (:376, :396–397) and the Related line at :415; the clock and date follow `data-timezone`. `updated` bumps.
- `TODO.md` release notes:
  - **Date Picker — Fixed:** Hijri dates follow Umm al-Qura exactly; before, most Hijri days were off by 1 or 2 days.
  - **Date Picker — Changed (Migration):** "today" follows the visitor's timezone, or the site's `data-timezone` on `<html>`; before, it was always Riyadh. Set `data-timezone="Asia/Riyadh"` to keep that.
  - **Date Picker — Removed (Migration):** `CalendarConfig.hijri.gregorianToHijri(d)` → `NDS.date.format(d, { calendar: 'hijri', format: … })`; `hijriToGregorian(y, m, d)` → `NDS.date.parse(…, { calendar: 'hijri', format: … })`; `createHijriDate` → no replacement, use a `{ day, month, year }` object.
  - **Topbar — Removed (Migration):** `NDS.TimeDate.getHijriDate()` → `NDS.date.format(new Date(), { calendar: 'hijri', … })`. **Fixed:** the date no longer shows the previous day when the visitor's day and Riyadh's differ.
  - **Export — Fixed:** the file name date is the site's date, not the UTC date.
- NDS IQ end-of-v2 pass: one line that a date in markup is written in the site's `data-date-format`, and `<html data-timezone>` sets "today".
- Delete the TODO item when this plan lands; delete this file when the release ships.

## Order

One branch, one commit per step. Steps 2–4 depend on step 1 only, so a bug found in `NDS.date` is fixed once before anything rides it.
