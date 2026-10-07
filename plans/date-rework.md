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
| `NDS.date.format(date, { format, calendar, locale, numerals, ...Intl options })` | a string |
| `NDS.date.convert(text, from, to)` | `format(parse(text, from), to)`; `from` and `to` are option objects |
| `NDS.date.today()` | today in the site's timezone (the visitor's when unset), as a local-midnight `Date` |
| `NDS.date.site` | `{ timeZone, format }` from `<html>`, defaults applied (a getter) |

**A date is a calendar day, never an instant (found while building, 2026-10-07).** `parse` returns local midnight, and `format` reads the day in local time. Neither applies the site timezone: a Tokyo visitor's local midnight is the previous day in Riyadh, so formatting a parsed day "in Riyadh" would move it. The site timezone enters only through `today()`. A `timeZone` passed to `format`'s Intl path goes to `Intl` as-is, for a caller that formats an instant (the clock).

- **`calendar`:** any `Intl` calendar id; `hijri` is an alias for `islamic-umalqura`, the Saudi official calendar. Default `gregory`.
- **`format`:** with `format` set, the result is the token string filled from the day's Y/M/D in the chosen calendar, in ASCII digits. With Intl options and no `format`, they go to `Intl.DateTimeFormat` (`locale` defaults to the page `lang`; `calendar` and `numerals` become its `calendar` and `numberingSystem`, default `gregory` and `latn`, as `NDS.formatNumber` does). Neither → the site format.
- **`parse`:** maps Arabic digits (`٠-٩`, and the `۰-۹` form) to ASCII and strips the bidi marks `Intl` writes in Arabic output (U+200E, U+200F, U+061C) first. The caller always names the format (default: `NDS.date.site.format`): `03/04/2026` is ambiguous, so it never guesses. A day that does not exist (31/04, Hijri 30 in a 29-day month) returns `null`. `YY` keeps the picker's 20xx reading.
- **Non-Gregorian → Date: search, not math.** Estimate the day from the mean month length (29.53 days from 1/1/1 AH), read it back with `formatToParts` in that calendar, step by the difference, repeat until it matches (2–3 reads). If it never matches, the date does not exist: `null`. Work at UTC noon with `timeZone: 'UTC'` so no local offset can move the day.
- **Formatter cache:** the `dtf(locale, opts)` memo moves from `nds-timeDate.js` into core, and every call goes through it (an `Intl.DateTimeFormat` costs ICU init; `format` on an existing one is cheap).
- `ponytail:` built and documented for Saudi Arabia's two calendars, Gregorian and Hijri (Umm al-Qura). Any other calendar is out of scope; add when a site asks. ICU's Umm al-Qura table covers 1300–1600 AH; outside it ICU falls back to `islamic-civil`.

**Check:** `node scripts/check-date.mjs` (`ENGINE=webkit` for Safari) loads `_js/nds-core.js` into a blank page under Tokyo and Los Angeles clocks: every day 2018–2037 round-trips `gregory ↔ hijri` and matches `Intl` exactly; Arabic digits and bidi marks parse; nonexistent days (31/04, Hijri 30/03/1448) return `null`; `today()` follows `data-timezone`; a bad zone falls back. Done 2026-10-07: 0 failures in Chrome and WebKit; main bundle +1.2 KB gz.

## Step 2: date widget (`_js/nds-timeDate.js`)

- Delete `getSaudiDate`, `getHijriParts`, `dtf` and `_fmtCache`. The date reads `NDS.date.format(new Date(), …)` in the site timezone. The cache key holds the site's date and its timezone, so both use one zone.
- Arabic Gregorian text changes digits: it was `ar-SA` (Arabic digits); `NDS.date` defaults to Latin digits, like the Hijri line and `NDS.formatNumber`. Pass `numerals: 'arab'` only if the owner wants the old look.
- The clock follows `data-timezone` too, or near midnight the date and the clock show different days. One `formatToParts` per minute (`hourCycle: 'h23'`).
- Delete `getHijriDate` (owner: removed in v2). `HIJRI_MONTHS` stays: Android ICU still prints Gregorian month names for the Islamic calendar (comment at :74).
- Update the banner Gotchas: "only the cache key follows Riyadh" goes.

## Step 3: Date Picker (`_js/nds-date-picker.js`)

Delete:
- `applyDateFormat`, `getParseConfig`, `parseWithFormat` and the token regex: `NDS.date.parse` / `format`. `detectFormatMode` stays (it reads the format, not a date).
- The Hijri engine: `gregorianToHijri`, `hijriToGregorian`, `convertUsingReference`, `gregorianToHijriUsingReference`, `hijriDateToDays`, `addDaysToHijriDate`, the Julian helpers, `isHijriLeapYear`, `_hijriCache`. Month length comes from `NDS.date` (the last day that parses), not from alternation.
- The async today-reference chain: `_accurateTodays*`, `getTodaysHijriDate`'s `.then`, `initializeHijriCalendarWithParsing`, `fetchAccurateHijriReference`, `storeAccurateHijriData`. Conversion is exact and synchronous, so the picker no longer depends on `NDS.TimeDate`, and a Hijri picker opens without the re-render.
- `createHijriDate` (owner: removed in v2).
- `getSaudiDateObject` → `NDS.date.today()`.
- `DEFAULT_DATE_FORMAT` → `NDS.date.site.format`.

Keep: `CalendarConfig.gregorian` / `.hijri` with `formatDate`, `parseDate`, `generateCalendarData` and `monthNames` (the picker's own engines, now thin), the `_hijri*` stamp on a `Date` (the picker's data contract, `stampHijri`), and the 1400–1500 year guess that picks the calendar from a prefilled value.

Grid: convert the month's first day once, then step Gregorian days and read each cell's Hijri day: one `formatToParts` per cell, cached formatter.

Grid, as built: one loop of 42 days from the month's first day; a Hijri cell stamps its own day. With exact conversion a stamp always agrees with its Gregorian day, so the Hijri-only branches of `isSameCalendarDate` and `isDateInRange` went too (`isSameDay` and `>`/`<`). `NDS.TimeDate.getHijriDate` goes in this step, with its only caller.

Verify: `node scripts/doc-check.mjs components/date-picker.md` (owner's go-ahead first), Hijri mode in both languages. Done 2026-10-07 with a harness on the built doc page (`tmp/date-rework/picker.mjs`, disposable), Chrome and WebKit, under Los Angeles, Riyadh and Tokyo clocks: every Hijri cell matches Umm al-Qura over 24 months of navigation, 1448/4 shows 30 days, `30/03/1448` is invalid, today follows `data-timezone`, month mode, range, bounds, site format and the calendar guess all pass. A Hijri month step renders in ~4 ms. `nds-extras.min.js` −2.5 KB gz. WebKit logs "ResizeObserver loop completed" on this page with or without the change.

## Step 4: Export (`_js/nds-export.js`)

The file name date (:409, :415) uses `toISOString()`, which is the UTC date: between 00:00 and 03:00 Riyadh time it names yesterday. Use `NDS.date.format(NDS.date.today(), { format: 'YYYY-MM-DD' })`. Export reads no dates in the table: a cell exports its text or `data-export-value`. That does not change.

## Step 5: docs and records

- New `core/date.md` (`/nds-doc date`): the API, the two `<html>` attributes, the search note in one line. Sidemenu entry beside Request and Refresh.
- `ui-shell/head.md`: two rows in the `<html>` attribute table.
- `components/date-picker.md`: line 188 ("follow Riyadh time") → the site's timezone; drop the removed API rows (:299–301) and the sample at :318; point to `core/date.md`. `updated` bumps.
- `components/export.md` (Dated File Names, :344): the date is the site's day (`data-timezone`), else the visitor's.
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
