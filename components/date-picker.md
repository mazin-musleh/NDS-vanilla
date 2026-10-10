---
layout: page
title: Date Picker
hero_title: Date Picker - National Design System
hero_description: A date field with a calendar for one day or a range, in the Gregorian or the Hijri calendar
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 11:12 PM"
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
- the user types a date they know by heart, such as a birth date, and a calendar does not help: a text field in [Forms](../components/forms)

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
      <button type="button" class="nds-btn nds-subtle nds-md date-picker-toggle nds-icon-only" aria-label="Open calendar">
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
| Picker | Day (default) | — | — | The calendar shows a grid of days. The field holds `DD/MM/YYYY` |
| Picker | Month (hint: A grid of months, for a card expiry) | `[data-format="MM/YYYY"]` | `.nds-date-picker:not(.nds-date-range)` | The calendar shows a grid of months, for a month such as a card expiry. Not with Range. See Date Format |
| Picker | Month (hint: A grid of months, for a card expiry) | `[placeholder="MM/YYYY"]` | `.nds-date-input:not(.nds-date-range *)` | |
| Picker | Year (hint: A grid of years, for a graduation year) | `[data-format="YYYY"]` | `.nds-date-picker:not(.nds-date-range)` | The calendar shows a grid of years, for a year such as a graduation year. Not with Range. See Date Format |
| Picker | Year (hint: A grid of years, for a graduation year) | `[placeholder="YYYY"]` | `.nds-date-input:not(.nds-date-range *)` | |
| Clear button | Clear button | `[data-clearable]` | `.nds-date-picker:not(.nds-date-range)` | Adds Clear to the calendar. Range has it already. See Clear Button |
| Size | LG (default) | — | — | 40px high. It needs no class |
| Size | MD | `.nds-md` | `.nds-form-container` | 32px high, with smaller text, for a table filter or a side panel |
| Style | Outline (default) | — | — | A border on the page background |
| Style | Lighter (hint: Light fill and no border) | `.nds-lighter` | `.nds-form-container` | A light fill and no border, for a field on a white card |
| Style | Darker (hint: Darker fill and no border) | `.nds-darker` | `.nds-form-container` | A darker fill and no border, for a field on a gray surface |
| State (any) | Disabled | `[data-state~="disabled"]` | `.nds-date-picker:not([data-state~="readonly"])` | The user cannot type or open the calendar, and the date does not post. Not with Read-only |
| State (any) | Read-only | `[data-state~="readonly"]` | `.nds-date-picker:not([data-state~="disabled"])` | The user sees the date but cannot change it. The date posts. Not with Disabled |
| State (any) | Required (hint: Press Validate with the field empty) | `[data-required]` | `.nds-date-picker` | The form needs a date. See Validation |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |
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

A pick shows in the calendar, but the field does not change until the user presses Save. Save writes the date in the field and fires a native `change` event on it. Close, Escape or a click outside the calendar closes it and drops the pick. Today moves the calendar to this month and picks today. In Range, Today only moves the calendar. The Today button is off when today is outside the bounds.

### Date Range
{: .nds-block-title}

The class `nds-date-range` on `.nds-date-picker` makes the user pick two days. The first click picks the start, and the second picks the end. A second day before the start becomes the new start. The field holds both days, such as `01/03/2026 - 15/03/2026`. Save after one day writes it as the start and the end.

### Hijri Calendar
{: .nds-block-title}

`data-calendar="hijri"` on `.nds-date-picker` shows Hijri months and years, and the field holds the Hijri date. The nearest `data-calendar` wins, so on `<html>` it makes every picker on the site Hijri, and `data-calendar="gregory"` on one picker keeps it Gregorian. A date already in the field picks the calendar too: a year up to 1500 opens the Hijri calendar, and a later year opens the Gregorian one, whatever the attribute. Hijri dates follow Umm al-Qura, the official calendar of Saudi Arabia, through [Date](../core/date). A Hijri day that does not exist, such as day 30 of a 29-day month, is an invalid date.

### Date Format
{: .nds-block-title}

`data-format` on `.nds-date-picker` sets how the field writes and reads a date. The default is the nearest `data-date-format`, on the picker or an element around it such as `<html>`, or `DD/MM/YYYY` without one. Write the same format as the placeholder: with `data-format="YYYY-MM-DD"` and `placeholder="YYYY-MM-DD"`, the field holds `2026-03-15`. The tokens are `YYYY`, `YY`, `MM`, `M`, `DD` and `D`, and any other character stays as written. `YY` reads as a year from 2000 to 2099. One format applies to both calendars and to both days of a range.

A format with no day token shows a grid of months, and a format with only year tokens shows a grid of years. The picker then takes the first day of the month, or the first month of the year, as the date.

### Value for the Server
{: .nds-block-title}

The field sends the date as the user sees it, such as `15/09/1447`. To send the server one fixed format, put a hidden input with the class `nds-date-value` in `.nds-date-picker`, and give it the field name. The script writes the date there each time the field changes, in the input's own `data-date-format` and `data-calendar`. Without them, the input takes the picker's format and calendar, so it holds the same text as the field. Text that is not a valid date leaves it empty. Each one holds the date, so two can send it in two formats. In a range, the first holds the start and the second the end.

<script type="text/html" id="date-picker-value" data-canon data-preview="none">
<input type="hidden" class="nds-date-value" name="visit_date" data-date-format="YYYY-MM-DD" data-calendar="gregory">
</script>

### Date Bounds
{: .nds-block-title}

`data-min-date` and `data-max-date` on `.nds-date-input` set the first and the last day the user can pick. Write them in the field's format and calendar. In a `DD/MM/YYYY` field, `data-min-date="01/01/2026" data-max-date="31/12/2026"` allows only 2026. A Month picker takes a bound such as `01/2026`, and a Hijri field takes a Hijri date such as `29/12/1448`. `today` is the current day in the site's timezone: `data-min-date="today"` blocks past days, and `data-max-date="today"` blocks future ones. Days, months and years outside the bounds are off, and the arrows stop at them. When today is outside the bounds, the calendar opens on the nearest bound.

### Year List
{: .nds-block-title}

`data-year-before` and `data-year-after` on `.nds-date-input` set how many years before and after this year the year menu lists. The defaults are 5 before and none after. For example, `data-year-before="100"` fits a birth date, and `data-year-before="0" data-year-after="2"` fits a booking. The month arrows and the year grid stop at the same years. With bounds too, the narrower limit wins: the bounds never widen the year list. For a bound more than 5 years back, set `data-year-before` too.

### Clear Button
{: .nds-block-title}

`data-clearable` on `.nds-date-picker` adds a Clear button to the calendar. Clear empties the field, fires `change` and closes the calendar, with no Save. Range always has the Clear button.

### Validation
{: .nds-block-title}

The picker checks the field at each `change`, typed text included. A date that does not match the format or falls outside the bounds shows an error under the field, and so does a range that ends before it starts. The form then does not submit. A wrong date in the field at page load also blocks the submit, but shows no error until the user changes it or submits. `data-required` on `.nds-date-picker` makes the form need a date.

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
          <p class="nds-item-desc">Tab moves into the day grid on the chosen day, today, or the first day of the month. The arrow keys move a day or a week, and Page Up and Page Down change the month.</p>
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
- Use Range for a start and an end date, not two separate pickers. The calendar then shows the days between them.
- Listen for `change` on the input. A pick fires nothing until the user presses Save.
- Add a `.nds-date-value` when the server needs one format, such as a Gregorian `YYYY-MM-DD` from a Hijri field.
- Read `data-converted-date` when the server needs the date in both calendars.
- Do not put a date picker inside another dropmenu. The calendar is a dropmenu itself.
- For the label, info text, feedback and the required mark, see [Forms](../components/forms). They work the same on every field.

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
| `data-date-format`, `data-calendar` | `.nds-date-value` | The format and calendar of the date the script writes in this hidden input. The defaults are the picker's. See Value for the Server |
| `data-clearable` | `.nds-date-picker` | Adds a Clear button to the calendar. See Clear Button |
| `data-required` | `.nds-date-picker` | The form needs a date. See Validation |
| `data-state~="disabled"`, `data-state~="readonly"` | `.nds-date-picker` | Set it yourself. See Disabled and Read-only |
| `data-state~="open"` | `.nds-date-picker` | The script sets it when the calendar opens, and removes it when the calendar closes. No NDS style reads it: it is for your CSS |
| `data-picker-mode` | `.nds-date-picker` | The script writes `day`, `month` or `year` from `data-format` when the field starts. The CSS reads it to show the month or the year grid |
| `data-min-date`, `data-max-date` | `.nds-date-input` | The first and the last day the user can pick, in the field's format and calendar, or `today`. See Date Bounds |
| `data-year-before`, `data-year-after` | `.nds-date-input` | How many years before and after this year the year menu lists. The defaults are `5` and `0`. See Year List |
| `data-lang` | `.nds-date-input` | The language of the calendar text, such as `ar` or `en`. Without it, the picker reads the input's `lang`, then the page language. See [Internationalization](../core/i18n) |
| `data-converted-date` | `.nds-date-input` | The script writes the date in the other calendar, in the field's format, when the user presses Save, and when the calendar opens on a field that holds a date. Clear, and Save with no date, remove it. A typed date does not update it |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set them in a rule on `.nds-date-picker-menu`, the calendar.

| Property | Default | Controls |
|---|---|---|
| `--dropmenu-width` | `100%` | The width of the calendar, as a share of the field |
| `--dropmenu-min-width` | `350px` | The smallest width of the calendar |
| `--dropmenu-max-width` | `500px` | The largest width of the calendar |
{: .nds-table .nds-responsive}

### Tokens
{: .nds-block-title}

Set a token at `:root`, or on a wrapper to reach every date picker inside it. Give a token with a Dark mode value a dark override too: see [Tokens](../components/tokens).

Source: the `date-picker` group in `_sass/tokens/_components.scss`.

{{ site.data.tokens.components.date-picker.html }}

### Keyboard
{: .nds-block-title}

| Key | Where | Effect |
|---|---|---|
| Arrow Left, Arrow Right | day grid | Moves one day back or forward, in the order on the screen. Past the grid, it shows the previous or the next month |
| Arrow Up, Arrow Down | day grid | Moves one week back or forward |
| Home, End | day grid | Moves to the first or the last day of the week |
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
| `instance.destroy()` | Removes the calendar and its listeners. `create()` can start the field again. Call it before you remove the field from the page |
| `NDS.DatePicker.CalendarConfig.gregorian`, `.hijri` | The two calendars. Each has `formatDate(date, format)` and `parseDate(text, format)` |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `change` | `.nds-date-input`, and it bubbles | A native event, with no detail. It fires when the user presses Save or Clear, and when the user types a date and leaves the field. Read the date from `input.value` |
{: .nds-table .nds-responsive}

<script type="text/html" id="date-picker-js" data-canon data-lang="js">
var input = document.querySelector('#date-picker-visit');

// Log the date in both calendars
input.addEventListener('change', function () {
  console.log(input.value, input.dataset.convertedDate);
});

// The Hijri date of 15 March 2026: '26/09/1447'
NDS.date.format(new Date(2026, 2, 15), { calendar: 'hijri', format: 'DD/MM/YYYY' });
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
