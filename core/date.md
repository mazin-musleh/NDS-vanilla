---
layout: page
title: Date
hero_title: Date - National Design System
hero_description: Reads and writes dates as text in the two calendars of Saudi Arabia, Gregorian and Hijri (Umm al-Qura)
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "09/10/2026 - 03:29 PM"
---

<section id="dateOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

`NDS.date` is a JavaScript API in the main bundle, so every page has it, with no init call. Three attributes on `<html>` go with it: `data-timezone` sets the site's timezone, `data-date-format` sets its date format, and `data-calendar` sets its calendar.

A date here is a calendar day: a JavaScript `Date` at local midnight. `parse` returns one, and `format` reads one. The site's timezone changes only which day `today()` returns.

Pick another component when:

- the user picks a date: [Date Picker](../components/date-picker)
- a list sorts by date: [Sort](../components/sort)

</div>
  </div>
</section>

<section id="dateMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Set the site's timezone and date format on `<html>`. Without `data-timezone`, today is the visitor's day. Without `data-date-format`, the format is `DD/MM/YYYY`.

<script type="text/html" id="date-site" data-canon data-preview="none">
<html lang="ar" dir="rtl" data-timezone="Asia/Riyadh" data-date-format="DD/MM/YYYY">
</script>

Give one part of the page its own date format with `data-date-format` on any element. The nearest one wins: in the section below, Date Picker and Sort read dates month first. The rest of the site reads them day first.

<script type="text/html" id="date-scoped" data-canon data-preview="none">
<section data-date-format="MM/DD/YYYY">
  <!-- A table here sorts 12/31/2026 as 31 December -->
</section>
</script>

Read a Hijri date from a field, and send it to the server as `YYYY-MM-DD`.

<script type="text/html" id="date-hijri-field" data-canon data-lang="js">
// '15/09/1447' → '2026-03-04'. null when the text is not a Hijri date: show the field's error.
function hijriToIso(text) {
  const date = NDS.date.parse(text, { calendar: 'hijri', format: 'DD/MM/YYYY' });
  return date && NDS.date.format(date, { format: 'YYYY-MM-DD' });
}
</script>

Show a date to people in the page language.

<script type="text/html" id="date-print" data-canon data-lang="js">
// On an Arabic page: 'الخميس، 5 مارس 2026'
NDS.date.format(new Date(2026, 2, 5), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
</script>

Convert a Gregorian date to Hijri.

<script type="text/html" id="date-convert" data-canon data-lang="js">
// '16/09/1447'
NDS.date.convert('05/03/2026', { format: 'DD/MM/YYYY' }, { calendar: 'hijri', format: 'DD/MM/YYYY' });
</script>

</div>
  </div>
</section>

<section id="dateFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-calendar-03"></i>
            <span class="nds-label">Umm al-Qura Hijri</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-js">calendar: 'hijri'</code> is Umm al-Qura, the official calendar of Saudi Arabia, for the years 1300 to 1600 AH. Outside them, the browser uses the civil Hijri calendar, which can differ by a day.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-exchange-01"></i>
            <span class="nds-label">Exact Conversion</span>
          </span>
          <p class="nds-item-desc">A Hijri date converts through the browser's own calendar data, not a table in NDS. A test checks every day from 2018 to 2037, both ways, against the browser's calendar.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-alert-circle"></i>
            <span class="nds-label">Invalid Days</span>
          </span>
          <p class="nds-item-desc">A day that does not exist returns <code class="nds-inline-code lang-js">null</code>, such as 31 April, or day 30 of a 29-day Hijri month. It never rolls over into the next month.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-language-skill"></i>
            <span class="nds-label">Arabic Digits</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-js">parse</code> reads Arabic digits, such as <code class="nds-inline-code lang-js">٠٣/٠٤/٢٠٢٦</code>. It also removes the direction marks that the browser writes into Arabic dates. <code class="nds-inline-code lang-js">format</code> writes Arabic digits with <code class="nds-inline-code lang-js">numerals: 'arab'</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-time-zone"></i>
            <span class="nds-label">Site Timezone</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-js">today()</code> returns today in the timezone that <code class="nds-inline-code lang-html">data-timezone</code> names. An invalid name logs one warning, and the visitor's timezone applies.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-calendar-02"></i>
            <span class="nds-label">Calendar Days</span>
          </span>
          <p class="nds-item-desc">No timezone moves a parsed date. A day typed in Riyadh is the same day for a visitor in Tokyo or Los Angeles.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="datePractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Name the format when the text comes from a server or another site. `03/04/2026` is 3 April or 4 March, and `parse` never guesses.
- Check the result of `parse` for `null` before you use it.
- Send a date to a server as `YYYY-MM-DD`. Show the user any format or calendar.
- Use `today()` for today's date, not `new Date()`. `new Date()` is the visitor's clock and ignores `data-timezone`.
- Set `data-timezone` when today must be the same day for every visitor, such as a deadline in Riyadh.
- Do not pass `timeZone` to `format` for a parsed date. It moves the day for a visitor in another timezone. Pass it only for a moment in time, such as `new Date()` in a clock.
- For a Hijri month name, format the month as a number and look the name up in your own list. On Android, the browser can print a Gregorian month name for a Hijri month.
- Sort reads a date from the text in the nearest `data-date-format` and `data-calendar`. For text in another format, write the date as a Gregorian `YYYY-MM-DD` in `data-sort-value` on a table cell, or in `data-sort-{key}` on a list item.

</div>
  </div>
</section>

<section id="dateApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-timezone` | `<html>` | The site's timezone, as an IANA name such as `Asia/Riyadh`. It sets today in `today()`, Date Picker, the top bar date and clock, and the date in an Export file name. Without it, the visitor's timezone applies |
| `data-date-format` | `<html>` | The site's date format, in the tokens below. `parse` and `format` use it when you name no format. The default is `DD/MM/YYYY` |
| `data-date-format` | any element | The date format of the content inside it. The nearest one wins over the one on `<html>`. A Date Picker without its own `data-format`, and Sort when it reads a date from text, use it |
| `data-calendar` | `<html>`, or any element | `hijri` or `gregory`, the calendar of the dates inside it. The nearest one wins. Date Picker, the top bar date and Sort read it. The default is Gregorian, and the top bar date follows the page language |
{: .nds-table .nds-responsive}

### Format Tokens
{: .nds-block-title}

| Token | Effect |
|---|---|
| `YYYY` | The year, 4 digits |
| `YY` | The year, 2 digits. `parse` reads it as 2000 to 2099 |
| `MM` | The month, 2 digits |
| `M` | The month, 1 or 2 digits |
| `DD` | The day, 2 digits |
| `D` | The day, 1 or 2 digits |
{: .nds-table .nds-responsive}

Any other character is literal. A format with no day, such as `MM/YYYY`, parses as the first day of the month. A format with no month parses as the first month. `parse` returns `null` for a format with no year.

### Options
{: .nds-block-title}

| Option | Default | Effect |
|---|---|---|
| `format` | `data-date-format`, or `DD/MM/YYYY` | The tokens to read or write. `format` writes ASCII digits, unless you set `numerals` |
| `calendar` | `'gregory'` | The calendar of the text: `'gregory'` or `'hijri'`, the two calendars of Saudi Arabia. `'hijri'` is Umm al-Qura (`'islamic-umalqura'`) |
| `locale` | the `lang` of `<html>` | The language of the text. Only for the `format` method when it writes the text through the browser: with other options and no `format` |
| `numerals` | `'latn'` | The digits. `'arab'` writes Arabic digits. Only for the `format` method |
| any other option | — | Only for the `format` method: passed to `Intl.DateTimeFormat`, such as `weekday`, `day`, `month`, `year` and `timeZone` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.date.parse(text, options)` | Returns the date in `text` as a `Date` at local midnight, or `null` when `text` does not match the format or names a day that does not exist. Reads `format` and `calendar` |
| `NDS.date.format(date, options)` | Returns the date as text. With `format`, it fills the tokens. With other options and no `format`, the browser writes the text. With neither, it uses the site's format. An invalid date returns `''` |
| `NDS.date.convert(text, from, to)` | Parses `text` with the options in `from` and formats it with the options in `to`. Returns `null` when `text` does not parse |
| `NDS.date.today()` | Returns today, in the site's timezone, as a `Date` at local midnight |
| `NDS.date.formatFor(element)` | Returns the nearest `data-date-format` around `element`, the element's own included, or `DD/MM/YYYY` when there is none. Pass it as `format` for content in that part of the page |
| `NDS.date.calendarFor(element, fallback)` | Returns the nearest `data-calendar` around `element`, the element's own included, or `fallback` (default `'gregory'`) when there is none. Pass it as `calendar` |
| `NDS.date.site` | Returns `{ timeZone, format }` from `<html>`. `timeZone` is `undefined` when the attribute is missing or invalid |
| `NDS.date.monthNames(calendar, lang)` | Returns the 12 month names of `'gregory'` or `'hijri'`, in `lang` or the page's language. The Hijri names come from the `date` section of the [string pack](../core/i18n) |
| `NDS.date.weekdayNames(lang)` | Returns the 7 short weekday names, Sunday first, in `lang` or the page's language |
{: .nds-table .nds-responsive}

<script type="text/html" id="date-api-js" data-canon data-lang="js">
// Today's Hijri date as numbers, in the site's timezone.
const [day, month, year] = NDS.date
  .format(NDS.date.today(), { calendar: 'hijri', format: 'D M YYYY' })
  .split(' ')
  .map(Number);
</script>

The full API is in the banner of `_js/nds-core.js`, and in the comment above `NDS.date` there.

</div>
  </div>
</section>

<section id="dateRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Date Picker](../components/date-picker): parses and writes the field's value with `NDS.date`, and marks today with `today()`.
- [Top Bar](../ui-shell/topbar): the date and the clock follow `data-timezone`.
- [Export](../components/export): the date in a file name is `today()`.
- [Head](../ui-shell/head): the other attributes that go on `<html>`.

</div>
  </div>
</section>
