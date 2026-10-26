---
layout: page
title: Date Picker
hero_title: Date Picker - National Design System
hero_description: A date field with a calendar for one day or a range, in the Gregorian or the Hijri calendar
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/10/2026 - 10:14 AM"
---

<section id="date-picker-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A date picker is a text field with a calendar under it. The user types a date, or opens the calendar with the calendar button, picks a day and presses Save. The calendar has a month menu, a year menu, arrows to the previous and the next month, and Today, Close and Save buttons.

Pick another component when:

- the user picks a time of day: [Time Picker](../components/time-picker)
- the user types a date they know by heart, such as a birth date, and a calendar does not help: a text field in [Forms](../components/form)

</div>
  </div>
</section>

<section id="date-picker-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="date-picker-field" data-canon data-variants="date-picker-variants-table" data-harness="form" data-demo-width="350px">
<div class="nds-form-container nds-date-picker">
  <div class="nds-form-header">
    <label for="date-picker-visit">
      <span class="nds-label">Visit date</span>
    </label>
  </div>
  <div class="nds-form-control">
    <div class="nds-form-action">
      <button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle nds-icon-only" aria-label="Open calendar" data-i18n-aria-label="date-picker.open_calendar">
        <i class="nds-icon nds-hgi-calendar-03" aria-hidden="true"></i>
      </button>
    </div>
    <input type="text" id="date-picker-visit" name="visit-date" class="nds-input nds-date-input" placeholder="DD/MM/YYYY">
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="date-picker-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A Picker choice changes two elements: write `data-format` on `.nds-date-picker` and the same format as the placeholder of `.nds-date-input`. Bounds, the year list, another format and the calendar language are set by hand: see the Data Attributes table.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Selection | Single date (default) | — | — | The user picks one day |
| Selection | Range | `.nds-date-range` | `.nds-date-picker:not([data-format="MM/YYYY"]):not([data-format="YYYY"])` | The user picks a start day and an end day. Not with the Month or Year picker. See Date Range |
| Calendar | Gregorian (default) | — | — | The calendar shows Gregorian months |
| Calendar | Hijri | `[data-calendar="hijri"]` | `.nds-date-picker` | The calendar shows Hijri months, and the field holds a Hijri date. See Hijri Calendar |
| Week start | Sunday (default) | — | — | The first column of the day grid is Sunday |
| Week start | Saturday | `[data-week-start="sat"]` | `.nds-date-picker:not([data-format="MM/YYYY"]):not([data-format="YYYY"])` | The first column is Saturday. Not with the Month or Year picker. See Week Start |
| Week start | Monday | `[data-week-start="mon"]` | `.nds-date-picker:not([data-format="MM/YYYY"]):not([data-format="YYYY"])` | The first column is Monday. Not with the Month or Year picker. See Week Start |
| Picker | Day (default) | — | — | The calendar shows a grid of days. The field holds `DD/MM/YYYY` |
| Picker | Month (hint: A grid of months, for a card expiry) | `[data-format="MM/YYYY"]` | `.nds-date-picker:not(.nds-date-range)` | The calendar shows a grid of months, for a month such as a card expiry. Not with Range. See Date Format |
| Picker | Month (hint: A grid of months, for a card expiry) | `[placeholder="MM/YYYY"]` | `.nds-date-input:not(.nds-date-range *)` | |
| Picker | Year (hint: A grid of years, for a graduation year) | `[data-format="YYYY"]` | `.nds-date-picker:not(.nds-date-range)` | The calendar shows a grid of years, for a year such as a graduation year. Not with Range. See Date Format |
| Picker | Year (hint: A grid of years, for a graduation year) | `[placeholder="YYYY"]` | `.nds-date-input:not(.nds-date-range *)` | |
| Unavailable days | Weekends (hint: Friday and Saturday cannot be picked) | `[data-disabled-days="fri sat"]` | `.nds-date-input:not([data-format="MM/YYYY"] *):not([data-format="YYYY"] *)` | Every Friday and Saturday is off, as for an office closed at the weekend. Not with the Month or Year picker. See Unavailable Days |
| Clear button | Clear button | `[data-clearable]` | `.nds-date-picker:not(.nds-date-range)` | Adds Clear to the calendar. Range has it already. See Clear Button |
| Size | LG (default) | — | — | 40px high. It needs no class |
| Size | MD | `.nds-md` | `.nds-form-container` | 32px high, with smaller text, for a table filter or a side panel |
| Style | Outline (default) | — | — | A border on the page background |
| Style | Lighter (hint: Light fill and no border) | `.nds-lighter` | `.nds-form-container` | A light fill and no border, for a field on a white card |
| Style | Darker (hint: Darker fill and no border) | `.nds-darker` | `.nds-form-container` | A darker fill and no border, for a field on a gray surface |
| State (any) | Disabled | `[data-state~="disabled"]` | `.nds-date-picker:not([data-state~="readonly"])` | The user cannot type or open the calendar, and the date does not post. Not with Read-only |
| State (any) | Read-only | `[data-state~="readonly"]` | `.nds-date-picker:not([data-state~="disabled"])` | The user sees the date but cannot change it. The date posts. Not with Disabled |
| State (any) | Required (hint: Press Validate with the field empty) | `[data-required]` | `.nds-date-picker` | The form needs a date. See Validation |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/form) |
{: #date-picker-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="date-picker-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Save and Close
{: .nds-block-title}

The calendar button, `.date-picker-toggle`, opens the calendar. A click in the text box only places the cursor, so the user can type.

A pick shows in the calendar, but the field does not change until the user presses Save. Save writes the date in the field and fires native `input` and `change` events on it. Close, Escape or a click outside the calendar closes it and drops the pick. When the calendar closes with focus inside it, focus goes back to the calendar button. Today moves the calendar to this month and picks today. In Range, Today only moves the calendar. The Today button is off when today is outside the bounds or unavailable.

### Typing
{: .nds-block-title}

The user can type the date, in Latin or Arabic digits. The digits fill the format as they are typed, and the separators appear on their own: `28051983` becomes `28/05/1983`. A day or a month digit that no second digit can follow gets a zero, so `4` becomes `04/`, and a typed separator ends a part, so `4/` becomes `04/` too. A digit that makes the day or the month impossible is ignored: after `3`, a `2` is not added. Typing in the middle of a full date replaces the digit after the cursor, and the cursor steps over the separators. After the user deletes part of a date, a key goes in at the cursor, and the date takes its format again when its digits are complete: `28/051983` becomes `28/05/1983`. The field never takes more digits or separators than the format holds, or a day or month that cannot be. In a range, ` - ` appears after the start date. Keep month names (`MMM`, `MMMM`) out of the format: the picker cannot read them back, so a picked date shows as invalid. On a phone, the field opens a keypad with digits, unless the input has its own `inputmode`.

A pasted date, or a typed one when the user leaves the field, takes the field's format when it is written another common way: `/`, `.`, `-` or spaces between the parts, digits only such as `28051983`, the year first such as `1983-05-28`, Arabic digits, or a time or `هـ` after it. In a `DD/MM/YYYY` field, `1983-05-28T10:30:00Z` becomes `28/05/1983`. A date with the year last reads day first, unless the field puts the month first, and the other order only when that day does not exist: `05/28/1983` becomes `28/05/1983`. A year up to 1500 reads as Hijri, and a date in the other calendar becomes the field's: in a Gregorian field, `15/09/1447` becomes `04/03/2026`. In a range, each date takes the format, and `to` between them works too. A two-digit year fits only a `YY` field. A paste that is not a date goes in as if the user typed it, under the same limits. Typed text that is not a date stays as written, and the field shows the invalid message.

### Date Range
{: .nds-block-title}

The class `nds-date-range` on `.nds-date-picker` makes the user pick two days. The first click picks the start, and the second picks the end. A second day before the start becomes the new start. The field holds both days, such as `01/03/2026 - 15/03/2026`. Save after one day writes it as the start and the end.

### Hijri Calendar
{: .nds-block-title}

`data-calendar="hijri"` on `.nds-date-picker` shows Hijri months and years, and the field holds the Hijri date. The nearest `data-calendar` wins, so on `<html>` it makes every picker on the site Hijri, and `data-calendar="gregory"` on one picker keeps it Gregorian. Without `data-calendar`, the field is Gregorian. The date never picks the calendar: a date in the other calendar is converted to the field's calendar, whether the user types or pastes it or the page ships it in the field's `value`. In a Gregorian field, `15/09/1447` becomes `04/03/2026`. A date the user writes converts when they leave the field, and a message under the field names the date they wrote, such as "Converted from the Hijri date 15/09/1447". Any edit to the field clears it. A shipped value written another common way, such as `2026-03-04`, takes the field's format too. Hijri dates follow Umm al-Qura, the official calendar of Saudi Arabia, through [Date](../core/date). A Hijri day that does not exist, such as day 30 of a 29-day month, is an invalid date.

### Week Start
{: .nds-block-title}

`data-week-start` on `.nds-date-picker` sets the first column of the day grid: `sun`, `mon`, `tue`, `wed`, `thu`, `fri` or `sat`. The default is Sunday. The nearest one wins, so on `<html>` it sets every picker on the site. The weekday names and the arrow keys follow it. See [Date](../core/date).

### Date Format
{: .nds-block-title}

`data-format` on `.nds-date-picker` sets how the field writes and reads a date. The default is the nearest `data-date-format`, on the picker or an element around it such as `<html>`, or `DD/MM/YYYY` without one. Write the same format as the placeholder: with `data-format="YYYY-MM-DD"` and `placeholder="YYYY-MM-DD"`, the field holds `2026-03-15`. The tokens are `YYYY`, `YY`, `MM`, `M`, `DD` and `D`, and any other character stays as written. `YY` reads as a year from 2000 to 2099. One format applies to both calendars and to both days of a range.

A format with no day token shows a grid of months, and a format with only year tokens shows a grid of years. The picker then takes the first day of the month, or the first month of the year, as the date.

### Value for the Server
{: .nds-block-title}

The field sends the date as the user sees it, such as `15/09/1447`. To send the server one fixed format, put a hidden input with the class `nds-date-value` in `.nds-date-picker`, and give it the field name. The script writes the date there each time the field changes, in the input's own `data-date-format` and `data-calendar`. Without them, the input takes the picker's format and calendar, so it holds the same text as the field. Text that is not a valid date leaves it empty. Each one holds the date, so two can send it in two formats. In a range, the first holds the start and the second the end.

To filter a list by date, put the picker in a [Filter](../components/filter) group: it reads these values, and its chip and link keep the range.

<script type="text/html" id="date-picker-value" data-canon data-preview="none">
<input type="hidden" class="nds-date-value" name="visit_date" data-date-format="YYYY-MM-DD" data-calendar="gregory">
</script>

### Date Bounds
{: .nds-block-title}

`data-min-date` and `data-max-date` on `.nds-date-input` set the first and the last day the user can pick. Write them in the field's format and calendar. In a `DD/MM/YYYY` field, `data-min-date="01/01/2026" data-max-date="31/12/2026"` allows only 2026. A Month picker takes a bound such as `01/2026`, and a Hijri field takes a Hijri date such as `29/12/1448`. `today` is the current day in the site's timezone: `data-min-date="today"` blocks past days, and `data-max-date="today"` blocks future ones. `today+N` and `today-N` move it by N days, or by months or years with `m` or `y`, counted in the field's calendar: `data-min-date="today+1" data-max-date="today+60"` books from tomorrow to 60 days ahead, `data-max-date="today-18y"` asks for an age of 18 or more, and `data-min-date="today+6m"` an expiry at least 6 months away. For a year and some months, count months: `today+15m`. A day past the end of the month becomes its last day. For days inside the bounds that cannot be picked, such as weekends and holidays, see Unavailable Days. A bound can follow another field: when check-in changes, write its value to the check-out field's `data-min-date`. The calendar and the value's check use a new bound at once. Days, months and years outside the bounds are off, and the arrows stop at them. When today is outside the bounds, the calendar opens on the nearest bound.

### Unavailable Days
{: .nds-block-title}

`data-disabled-days` on `.nds-date-input` turns off weekdays: `sun`, `mon`, `tue`, `wed`, `thu`, `fri` or `sat`, with spaces between them. `data-disabled-dates` turns off single days, with commas between them. Write each date in the field's format and calendar, or as `YYYY-MM-DD`, so code can write the dates a server sends as they come. An office closed at the weekend and on two holidays takes `data-disabled-days="fri sat" data-disabled-dates="23/09/2026, 2026-12-02"`.

The calendar shows these days off, the arrow keys skip them, and Tab never lands on one. A typed or pasted date on one of them shows an error under the field, such as "18/09/2026 is not available. Pick another day". In a range, the start and the end cannot be such a day, but the days between them can. Code can change either attribute at any time, such as after a request for the fully booked days, and the calendar and the value's check follow at once. A word that is not a weekday, or a date the picker cannot read, is skipped with a warning in the console.

### Year List
{: .nds-block-title}

`data-year-before` and `data-year-after` on `.nds-date-input` set how many years before and after this year the year menu lists. The defaults are 5 before and none after. For example, `data-year-before="100"` fits a birth date, and `data-year-before="0" data-year-after="2"` fits a booking. The month arrows and the year grid stop at the same years. With bounds too, the narrower limit wins: the bounds never widen the year list. For a bound more than 5 years back, set `data-year-before` too.

### Clear Button
{: .nds-block-title}

`data-clearable` on `.nds-date-picker` adds a Clear button to the calendar. Clear empties the field, fires `input` and `change` and closes the calendar, with no Save. Range always has the Clear button.

### Validation
{: .nds-block-title}

The picker checks the field at each `change`, typed text included. A date that does not match the format, falls outside the bounds or is unavailable shows an error under the field, and so does a range that ends before it starts. The form then does not submit. A wrong date in the field at page load also blocks the submit, but shows no error until the user changes it or submits. `data-required` on `.nds-date-picker` makes the form need a date.

### Disabled and Read-only
{: .nds-block-title}

`data-state~="disabled"` on `.nds-date-picker` disables the text box and the calendar button, so the date does not post. With `data-state~="readonly"`, the user cannot type, and the calendar does not open. The date still posts. A `readonly` attribute on the input does the same: Forms copies it to the field.

</div>
  </div>
</section>

<section id="date-picker-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-date-input</code> in a <code class="nds-inline-code lang-html">.nds-form-control</code> and a <code class="nds-inline-code lang-html">.nds-form-container</code> starts on load. The script builds the calendar the first time the user opens it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-exchange-01"></i>
            <span class="nds-label">Dual Calendar System</span>
          </span>
          <p class="nds-item-desc">The script writes the same date in the other calendar to <code class="nds-inline-code lang-html">data-converted-date</code> on the input. A Gregorian field holds the Hijri date there, and a Hijri field holds the Gregorian date.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Navigation</span>
          </span>
          <p class="nds-item-desc">Tab moves into the day grid on the chosen day, today, or the first day of the month. The arrow keys move a day or a week, and skip the days that cannot be picked. Page Up and Page Down change the month. A screen reader hears each day as a full date, in the field's calendar and language, and hears which day is today and which days are picked.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-time-zone"></i>
            <span class="nds-label">Saudi Time</span>
          </span>
          <p class="nds-item-desc">Today, and the ring that marks it, follow the site's timezone, <code class="nds-inline-code lang-html">data-timezone</code> on <code class="nds-inline-code lang-html">&lt;html&gt;</code>. Without it, they follow the visitor's clock.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-globe-02"></i>
            <span class="nds-label">Bilingual Support</span>
          </span>
          <p class="nds-item-desc">Month names, weekdays, buttons and error messages show in Arabic or English from the page language. They change when the page language changes.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-shrink-02"></i>
            <span class="nds-label">Calendar Position</span>
          </span>
          <p class="nds-item-desc">The calendar opens below the field, or above it when the space below is too small. It lines up with the field and stays inside the screen. In a modal or a scrolling box, it moves to <code class="nds-inline-code lang-html">&lt;body&gt;</code>, so nothing clips it.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="date-picker-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a date picker when the user needs to see a calendar, such as for a booking, a report period or a visit date.
- Give the calendar button an `aria-label`, such as "Open calendar". It shows only an icon.
- To show a saved date, write it in the input's `value`, in the field's format and calendar.
- Set the year list for the task. With the defaults, the user cannot pick a future year.
- Turn off the days the user cannot book with `data-disabled-days` and `data-disabled-dates`, so the calendar shows them before the user picks. Check the date on the server too.
- Use Range for a start and an end date, not two separate pickers. The calendar then shows the days between them.
- Listen for `change` on the input. A pick fires nothing until the user presses Save.
- Add a `.nds-date-value` when the server needs one format, such as a Gregorian `YYYY-MM-DD` from a Hijri field.
- Read `data-converted-date` when the server needs the date in both calendars.
- Do not put a date picker inside another dropmenu. The calendar is a dropmenu itself.
- For the label, info text, feedback and the required mark, see [Forms](../components/form). They work the same on every field.

</div>
  </div>
</section>

<section id="date-picker-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-format` | `.nds-date-picker` | How the field writes and reads a date. The default is the nearest `data-date-format`, or `DD/MM/YYYY`. See Date Format |
| `data-calendar` | `.nds-date-picker`, or any element around it | `hijri` or `gregory`. The nearest one sets the calendar. The default is Gregorian. See Hijri Calendar |
| `data-week-start` | `.nds-date-picker`, or any element around it | `sun` to `sat`. The nearest one sets the first column of the day grid. The default is Sunday. See Week Start |
| `data-date-format`, `data-calendar` | `.nds-date-value` | The format and calendar of the date the script writes in this hidden input. The defaults are the picker's. See Value for the Server |
| `data-clearable` | `.nds-date-picker` | Adds a Clear button to the calendar. See Clear Button |
| `data-required` | `.nds-date-picker` | The form needs a date. See Validation |
| `data-state~="disabled"`, `data-state~="readonly"` | `.nds-date-picker` | Set it yourself. See Disabled and Read-only |
| `data-state~="open"` | `.nds-date-picker` | The script sets it when the calendar opens, and removes it when the calendar closes. No NDS style reads it: it is for your CSS |
| `data-picker-mode` | `.nds-date-picker` | The script writes `day`, `month` or `year` from `data-format` when the field starts. The CSS reads it to show the month or the year grid |
| `data-min-date`, `data-max-date` | `.nds-date-input` | The first and the last day the user can pick, in the field's format and calendar, `today`, or `today±N` with an optional `m` or `y`. See Date Bounds |
| `data-disabled-days` | `.nds-date-input` | Weekdays the user cannot pick, `sun` to `sat`, with spaces between them, such as `fri sat`. See Unavailable Days |
| `data-disabled-dates` | `.nds-date-input` | Single days the user cannot pick, in the field's format and calendar or as `YYYY-MM-DD`, with commas between them. A change applies at once. See Unavailable Days |
| `data-year-before`, `data-year-after` | `.nds-date-input` | How many years before and after this year the year menu lists. The defaults are `5` and `0`. See Year List |
| `data-lang` | `.nds-date-input` | The language of the calendar text, such as `ar` or `en`. Without it, the picker reads the nearest `lang`, the input's own included. See [Internationalization](../core/i18n) |
| `data-converted-date` | `.nds-date-input` | The script writes the date in the other calendar, in the field's format, when the user presses Save, and when the calendar opens on a field that holds a date. Clear, and Save with no date, remove it. A typed date does not update it |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set them in a rule on `.nds-date-picker-menu`, the calendar.

| Property | Default | Controls |
|---|---|---|
| `--dropmenu-width` | `100%` | The width of the calendar, as a share of the field |
| `--dropmenu-min-width` | `min(350px, 100vw - 2 * var(--nds-viewport-padding))` | The smallest width of the calendar. It never grows past the page gutters |
| `--dropmenu-max-width` | `min(500px, 100vw - 2 * var(--nds-viewport-padding))` | The largest width of the calendar |
{: .nds-table .nds-responsive}

### Tokens
{: .nds-block-title}

Set a token at `:root`, or on a wrapper to reach every date picker inside it. Give a token with a Dark mode value a dark override too: see [Tokens](../foundations/tokens).

Source: the `date-picker` group in `_sass/tokens/_components.scss`.

{{ site.data.tokens.components.date-picker.html }}

### Keyboard
{: .nds-block-title}

| Key | Where | Effect |
|---|---|---|
| Arrow Left, Arrow Right | day grid | Moves one day back or forward, in the order on the screen, over the days that cannot be picked. Past the grid, it shows the previous or the next month |
| Arrow Up, Arrow Down | day grid | Moves one week back or forward, over the days that cannot be picked |
| Home, End | day grid | Moves to the first or the last day of the week that can be picked |
| Page Up, Page Down | day grid | Shows the previous or the next month, and focuses its first day |
| Shift + Page Up, Shift + Page Down | day grid | Shows the same month a year before or after, and focuses its first day |
| Enter, Space | a day | Picks the day |
| Escape | calendar | Closes the calendar and drops the pick |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.DatePicker.init()` | Starts every `.nds-date-input` that has not started. The loader calls it on load. Call it again after you add a field to the page |
| `NDS.DatePicker.reinit()` | The same as `init()` |
| `NDS.DatePicker.create(input, formControl)` | Starts one field, and returns its instance. `formControl` is optional: the default is the input's `.nds-form-control`. On a field that has started, it returns the same instance. It returns `null` when the input has no `.nds-form-control` or no `.nds-form-container` |
| `NDS.DatePicker.destroy(input)` | Runs `instance.destroy()` on the field's picker. `NDS.init.destroy()` calls it |
| `instance.destroy()` | Removes the calendar and its listeners, and clears the picker's own date error. `create()` can start the field again. Call it before you remove the field from the page |
| `NDS.DatePicker.CalendarConfig.gregorian`, `.hijri` | The two calendars. Each has `formatDate(date, format)` and `parseDate(text, format)` |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `input`, `change` | `.nds-date-input`, and they bubble | Native events, with no detail. They fire when the user presses Save or Clear. A typed date fires them as on any field. Read the date from `input.value` |
| `input`, `change` | each `.nds-date-value`, and they bubble | Native events, with no detail. They fire when the picker writes a new server value |
{: .nds-table .nds-responsive}

<script type="text/html" id="date-picker-js" data-canon data-lang="js">
var input = document.querySelector('#date-picker-visit');

// Log the date in both calendars
input.addEventListener('change', function () {
  console.log(input.value, input.dataset.convertedDate);
});

// The Hijri date of 15 March 2026: '26/09/1447'
NDS.Date.format(new Date(2026, 2, 15), { calendar: 'hijri', format: 'DD/MM/YYYY' });
</script>

To convert dates in your own code, use [Date](../core/date). The full API is in the banner of `_js/nds-date-picker.js`.

</div>
  </div>
</section>

<section id="date-picker-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Form Template](../templates/form-template): a required Date of Birth field with a 100-year list.
- [Manage Records](../examples/manage-records): a required Submitted date in the record form.

</div>
  </div>
</section>
