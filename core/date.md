---
layout: page
title: Date
hero_title: Date - National Design System
hero_description: Shows, reads and writes dates in the two calendars of Saudi Arabia, Gregorian and Hijri (Umm al-Qura)
breadcrumb: [["Core", "/components/?shelf=Core"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "26/10/2026 - 11:21 AM"
---

<section id="date-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

NDS works with dates in two ways. In markup, a `<time>` with `data-date-calendar="hijri"` shows its date in Hijri, and one with its own `data-date-format` shows it in that format. You write no script. In JavaScript, `NDS.Date` reads, writes and converts dates. It is in the main bundle, so every page has it, with no init call.

Four attributes on `<html>` set the site's dates: `data-timezone` sets its timezone, `data-date-format` its date format, `data-calendar` its calendar, and `data-week-start` the first day of its week.

Pick another component when:

- the user picks a date: [Date Picker](../components/date-picker)
- a list sorts by date: [Sort](../components/sort)

</div>
  </div>
</section>

<section id="date-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

<script type="text/html" id="date-time" data-canon data-variants="date-variants-table">
<time datetime="2026-10-18">18/10/2026</time>
</script>

<script type="text/html" id="date-time-hijri" data-canon>
<time datetime="2026-10-18" data-date-calendar="hijri">18/10/2026</time>
</script>

<script type="text/html" id="date-to" data-canon>
<dl class="nds-definition-list nds-table-view">
  <div class="nds-definition-item">
    <dt><span class="nds-label">Issue date</span></dt>
    <dd>
      <div>
        <time datetime="2026-10-18">18/10/2026</time>
        <div class="nds-note"><time datetime="2026-10-18" data-date-calendar="hijri">18/10/2026</time></div>
      </div>
    </dd>
  </div>
</dl>
</script>

### Site Setup
{: #date-setup}

Set the site's timezone and date format on `<html>`. Without `data-timezone`, today is the visitor's day. Without `data-date-format`, the format is `DD/MM/YYYY`.

<script type="text/html" id="date-site" data-canon data-preview="none">
<html lang="ar" dir="rtl" data-timezone="Asia/Riyadh" data-date-format="DD/MM/YYYY">
</script>

Give one part of the page its own format with `data-date-format` on any element.

<script type="text/html" id="date-scoped" data-canon data-preview="none">
<section data-date-format="MM/DD/YYYY">
  <!-- A table here sorts 12/31/2026 as 31 December -->
</section>
</script>

### Dates in JavaScript
{: #date-in-js}

Read a Hijri date from a field, and send it to the server as `YYYY-MM-DD`.

<script type="text/html" id="date-hijri-field" data-canon data-lang="js">
// '15/09/1447' → '2026-03-04'. null when the text is not a Hijri date: show the field's error.
function hijriToIso(text) {
  const date = NDS.Date.parse(text, { calendar: 'hijri', format: 'DD/MM/YYYY' });
  return date && NDS.Date.format(date, { format: 'YYYY-MM-DD' });
}
</script>

Show a date to people, convert it, or write the month's name.

<script type="text/html" id="date-show" data-canon data-lang="js">
// In the page language. On an Arabic page: 'الخميس، 5 مارس 2026'
NDS.Date.format(new Date(2026, 2, 5), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

// Gregorian to Hijri: '16/09/1447'
NDS.Date.convert('05/03/2026', { format: 'DD/MM/YYYY' }, { calendar: 'hijri', format: 'DD/MM/YYYY' });

// The month's name with MMMM. On an Arabic page: '16 رمضان 1447'
NDS.Date.format(new Date(2026, 2, 5), { calendar: 'hijri', format: 'D MMMM YYYY' });
</script>

</div>
  </div>
</section>

<section id="date-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Format goes on the `<time>` that shows the date: in Both Calendars, the Hijri one. Era goes on a Hijri `<time>`, so it needs Hijri or Both Calendars.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Gregorian (default) | — | — | The Gregorian date. With a Format, the script writes it in that format |
| Structure | Hijri | canon `#date-time-hijri` | — | `data-date-calendar="hijri"`: the script writes the date from `datetime` in Umm al-Qura Hijri |
| Structure | Both Calendars | canon `#date-to` | — | The Gregorian date with the Hijri date under it, such as an issue or expiry date. Write the date twice, and add `data-date-calendar="hijri"` to the second one |
| Format | None (default) | — | — | The nearest `data-date-format` around the `<time>`, else the site's |
| Format | Month Name | `[data-date-format="D MMMM YYYY"]` | `time:not(.nds-definition-list time:not([data-date-calendar]))` | The day, the month's name and the year, in the page language |
| Format | Short Month | `[data-date-format="D MMM YYYY"]` | `time:not([data-date-calendar])` | The day, the month's short name and the year, such as 24 Oct 2026, for a narrow column. Gregorian only: a Hijri month has no short name. On an Arabic page, the month's full name shows |
| Format | ISO | `[data-date-format="YYYY-MM-DD"]` | `time:not(.nds-definition-list time:not([data-date-calendar]))` | Year, month and day, as a server reads them |
| Era | Era Marker (hint: «هـ» or AH after the Hijri date) | `[data-date-era]` | `time[data-date-calendar]` | Adds «هـ» on an Arabic page, or AH on an English one, after the Hijri date. Leave it out where a label already says the date is Hijri |
{: #date-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="date-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Calendar Days
{: #date-calendar-days}

A date is a calendar day: a JavaScript `Date` at local midnight. `parse` returns one, and `format` reads one. No timezone moves it, so a day typed in Riyadh is the same day for a visitor in Tokyo. The site's timezone changes only which day `getToday()` returns.

### Nearest Format
{: #date-nearest-format}

`data-date-format`, `data-calendar` and `data-week-start` on an element set the format, the calendar and the week start of the dates inside it. The nearest one wins over the one on `<html>`. Date Picker, Sort and `data-date-calendar` read them.

### Markup Dates
{: #date-markup-dates}

The script reads the date from `datetime`, never from the text, and writes the text before the page shows, so the line does not shift. It writes a `<time>` with `data-date-calendar="hijri"`, or one with its own `data-date-format`. Any other `<time>` already reads right, so it stays as written.

`datetime` holds `YYYY-MM-DD`, with or without a time. A time with a zone, such as `Z` or `+03:00`, counts in the site's timezone. A value that is not a full date is left as written, and without JavaScript the text you wrote stays. With `data-date-era`, a Hijri date ends in «هـ» on an Arabic page and AH on an English one.

</div>
  </div>
</section>

<section id="date-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-feature-list nds-grid nds-divided-rows nds-icons-subtle">
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Umm al-Qura Hijri</span>
              <p class="nds-card-description"><code class="nds-inline-code lang-js">calendar: 'hijri'</code> is Umm al-Qura, the official calendar of Saudi Arabia, for the years 1300 to 1600 AH. Outside them, the browser uses the civil Hijri calendar, which can differ by a day.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-exchange-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Exact Conversion</span>
              <p class="nds-card-description">A Hijri date converts through the browser's own calendar data, not a table in NDS. A test checks every day from 2018 to 2037, both ways, against the browser's calendar.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-alert-circle" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Invalid Days</span>
              <p class="nds-card-description">A day that does not exist returns <code class="nds-inline-code lang-js">null</code>, such as 31 April, or day 30 of a 29-day Hijri month. It never rolls over into the next month.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-language-skill" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Arabic Digits</span>
              <p class="nds-card-description"><code class="nds-inline-code lang-js">parse</code> reads Arabic digits, such as <code class="nds-inline-code lang-js">٠٣/٠٤/٢٠٢٦</code>. It also removes the direction marks that the browser writes into Arabic dates. <code class="nds-inline-code lang-js">format</code> writes Arabic digits with <code class="nds-inline-code lang-js">numerals: 'arab'</code>.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-time-zone" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Site Timezone</span>
              <p class="nds-card-description"><code class="nds-inline-code lang-js">getToday()</code> returns today in the timezone that <code class="nds-inline-code lang-html">data-timezone</code> names. An invalid name logs one warning, and the visitor's timezone applies.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="date-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Name the format when the text comes from a server or another site. `03/04/2026` is 3 April or 4 March, and `parse` never guesses.
- Check the result of `parse` for `null` before you use it.
- Send a date to a server as `YYYY-MM-DD`. Show the user any format or calendar.
- Write a readable date as the text of a `<time>`, not an empty tag. It shows before the script runs, without JavaScript, and to search engines.
- Use `getToday()` for today's date, not `new Date()`. `new Date()` is the visitor's clock and ignores `data-timezone`.
- Set `data-timezone` when today must be the same day for every visitor, such as a deadline in Riyadh.
- Do not pass `timeZone` to `format` for a parsed date. It moves the day for a visitor in another timezone. Pass it only for a moment in time, such as `new Date()` in a clock.
- For a Hijri month name, use `MMMM`, not `month: 'long'`. On Android, the browser can print a Gregorian month name for a Hijri month, and `MMMM` takes the name from the [string pack](../core/i18n).
- Sort reads a date from the text in the nearest `data-date-format` and `data-calendar`. For text in another format, write the date as a Gregorian `YYYY-MM-DD` in `data-sort-value` on a table cell, or in `data-sort-{key}` on a list item.

</div>
  </div>
</section>

<section id="date-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-timezone` | `<html>` | The site's timezone, as an IANA name such as `Asia/Riyadh`. It sets today in `getToday()`, Date Picker, the top bar date and clock, and the date in an Export file name. Without it, the visitor's timezone applies |
| `data-date-format` | `<html>` | The site's date format, in the tokens below. `parse` and `format` use it when you name no format. The default is `DD/MM/YYYY` |
| `data-date-format` | any element | The date format of the content inside it. The nearest one wins over the one on `<html>`. A Date Picker without its own `data-format`, and Sort when it reads a date from text, use it |
| `data-calendar` | `<html>`, or any element | `hijri` or `gregory`, the calendar of the dates inside it. The nearest one wins. Date Picker, the top bar date and Sort read it. The default is Gregorian, and the top bar date follows the page language |
| `data-week-start` | `<html>`, or any element | `sun`, `mon`, `tue`, `wed`, `thu`, `fri` or `sat`: the first day of the week inside it. The nearest one wins. The Date Picker's grid starts on it. The default is Sunday, and any other value warns in the console and uses Sunday |
| `data-date-calendar` | a `<time>` with `datetime` | `hijri`: the `<time>` shows its date in Hijri, in the nearest `data-date-format`, its own included. Any other value is left as written. See [Markup Dates](#date-markup-dates) |
| `data-date-format` | a `<time>` with `datetime`, without `data-date-calendar` | Written on the `<time>` itself: the script writes the Gregorian date from `datetime` in this format. A `<time>` with neither attribute is left as written |
| `data-date-era` | a `<time>` with `data-date-calendar="hijri"` | Written bare. Adds the era word after the Hijri date: «هـ» on an Arabic page, AH on an English one, from the `date` section of the [string pack](../core/i18n) |
{: .nds-table .nds-responsive}

### Format Tokens
{: .nds-block-title}

| Token | Effect |
|---|---|
| `YYYY` | The year, 4 digits |
| `YY` | The year, 2 digits. `parse` reads it as 2000 to 2099 |
| `MMMM` | The month's name, in `locale` or the page language. Only for `format`: `parse` returns `null` for a format with it. Keep it out of a `data-date-format` on `<html>` or a section, which Sort and Date Picker read back. On a `<time>`, the script only writes it |
| `MMM` | The month's short name, such as `Oct`, as `MMMM` with the same limits. A Hijri month, and a language with no short names such as Arabic, shows the full name |
| `MM` | The month, 2 digits |
| `M` | The month, 1 or 2 digits |
| `DD` | The day, 2 digits |
| `D` | The day, 1 or 2 digits |
| `dddd` | The weekday's name, such as `Tuesday`, in `locale` or the page language. Only for `format`, as `MMMM` |
{: .nds-table .nds-responsive}

Any other character is literal. A format with no day, such as `MM/YYYY`, parses as the first day of the month. A format with no month parses as the first month. `parse` returns `null` for a format with no year.

### Options
{: .nds-block-title}

| Option | Default | Effect |
|---|---|---|
| `format` | `data-date-format`, or `DD/MM/YYYY` | The tokens to read or write. `format` writes ASCII digits, unless you set `numerals` |
| `calendar` | `'gregory'` | The calendar of the text: `'gregory'` or `'hijri'`, the two calendars of Saudi Arabia. `'hijri'` is Umm al-Qura (`'islamic-umalqura'`) |
| `locale` | the `lang` of `<html>` | The language of the text. Only for the `format` method: the text the browser writes, with other options and no `format`, and the name `MMMM` writes |
| `numerals` | `'latn'` | The digits. `'arab'` writes Arabic digits. Only for the `format` method |
| `era` | `false` | `true` ends a Hijri date in the era word, such as `AH` in English and `هـ` in Arabic. A Gregorian date takes none. Only for the `format` method, with `format` |
| any other option | — | Only for the `format` method: passed to `Intl.DateTimeFormat`, such as `weekday`, `day`, `month`, `year` and `timeZone` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Date.parse(text, options)` | Returns the date in `text` as a `Date` at local midnight, or `null` when `text` does not match the format or names a day that does not exist. Reads `format` and `calendar` |
| `NDS.Date.format(date, options)` | Returns the date as text. With `format`, it fills the tokens. With other options and no `format`, the browser writes the text. With neither, it uses the site's format. An invalid date returns `''` |
| `NDS.Date.getDayLabel(date, options)` | Returns the day in words, as a screen reader should hear it: the weekday, the day, the month's name, the year and, for a Hijri date, the era. `"Tuesday 8 Jumada al-Ula 1448 AH"`. Reads `calendar` and `locale`. The Date Picker and the [Calendar](../components/calendar) name their days with it |
| `NDS.Date.convert(text, from, to)` | Parses `text` with the options in `from` and formats it with the options in `to`. Returns `null` when `text` does not parse |
| `NDS.Date.getToday()` | Returns today, in the site's timezone, as a `Date` at local midnight |
| `NDS.Date.readDay(datetime)` | Returns the day a `datetime` value names, as a `Date` at local midnight, or `null`. The value is `YYYY-MM-DD`, with or without a time. A time with a zone counts in the site's timezone. The [Calendar](../components/calendar) reads each event's day with it |
| `NDS.Date.toParts(date, calendar)` | Returns the day as numbers, `{ year, month, day }`, in `calendar` (default `'gregory'`). The month counts from 1 in both calendars |
| `NDS.Date.fromParts(parts, calendar)` | Returns the day that `{ year, month, day }` names in `calendar`, as a `Date` at local midnight, or `null` when that day does not exist |
| `NDS.Date.getMonthLength(parts, calendar)` | Returns the number of days in the month that `{ year, month }` names in `calendar`. A Hijri month has 29 or 30 |
| `NDS.Date.getFormat(element)` | Returns the nearest `data-date-format` around `element`, the element's own included, or `DD/MM/YYYY` when there is none. Pass it as `format` for content in that part of the page |
| `NDS.Date.getCalendar(element, fallback)` | Returns the nearest `data-calendar` around `element`, the element's own included, or `fallback` (default `'gregory'`) when there is none. Pass it as `calendar` |
| `NDS.Date.site` | Returns `{ timeZone, format }` from `<html>`. `timeZone` is `undefined` when the attribute is missing or invalid |
| `NDS.Date.getMonthNames(calendar, lang)` | Returns the 12 month names of `'gregory'` or `'hijri'`, in `lang` or the page's language. The Hijri names come from the `date` section of the [string pack](../core/i18n) |
| `NDS.Date.getWeekdayNames(lang, weekStart)` | Returns the 7 short weekday names in `lang` or the page's language, from `weekStart`: 0 is Sunday (the default) and 6 is Saturday |
| `NDS.Date.getWeekStart(element)` | Returns the nearest `data-week-start` around `element`, the element's own included, as 0 (Sunday) to 6 (Saturday). Returns 0 when there is none. Pass it as `weekStart` |
| `NDS.Date.readWeekdays(text)` | Returns the weekdays in `text`, words from `sun` to `sat` with spaces or commas between them, as numbers from 0 (Sunday) to 6 (Saturday): `'fri sat'` gives `[5, 6]`. A word that is not a weekday is skipped, with a warning in the console. The Date Picker reads `data-disabled-weekdays` with it |
| `NDS.Date.getStartOfWeek(date, weekStart)` | Returns the first day of the week that holds `date`, as a `Date` at local midnight. `weekStart` is 0 (Sunday) by default |
| `NDS.Date.fill(root)` | Writes the text of every `<time>` in `root`, and of `root` itself, that has `data-date-calendar` or its own `data-date-format`, and of every empty [Date Tile](../components/date-tile). The loader runs it at load, and `NDS.init.mount()` on markup added later |
| `NDS.Date.fillTile(tile, options)` | Writes a Date Tile's parts from its `datetime` and `data-date-end`, and adds them to an empty tile. `calendar` and `locale` default to the nearest `data-calendar` and `lang`. A Calendar calls it for each event |
{: .nds-table .nds-responsive}

<script type="text/html" id="date-api-js" data-canon data-lang="js">
// Today's Hijri date as numbers, in the site's timezone.
const { year, month, day } = NDS.Date.toParts(NDS.Date.getToday(), 'hijri');
// The days in that Hijri month: 29 or 30.
const days = NDS.Date.getMonthLength({ year, month }, 'hijri');
</script>

The full API is in the banner of `_js/nds-date.js`.

</div>
  </div>
</section>

<section id="date-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Date Picker](../components/date-picker): parses and writes the field's value with `NDS.Date`, and marks today with `getToday()`.
- [Top Bar](../ui-shell/topbar): the date and the clock follow `data-timezone`.
- [Export](../components/export): the date in a file name is `getToday()`.
- [Head](../ui-shell/head): the other attributes that go on `<html>`.

</div>
  </div>
</section>
