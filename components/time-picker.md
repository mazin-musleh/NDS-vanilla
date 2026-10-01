---
layout: page
title: Time Picker
hero_title: Time Picker - National Design System
hero_description: A time field with lists of hours, minutes and seconds in a panel under it
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "01/10/2026 - 10:16 AM"
---

<section id="timePickerOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A time picker is a text field with a panel under it. The user types a time, or opens the panel with the clock button and picks the hour and the minute from two lists. The format can add a list for the second and a list for AM or PM.

Pick another component when:

- the user picks a day: [Date Picker](../components/date-picker)
- the user enters a duration, such as 2 hours 30 minutes: number fields in [Forms](../components/forms)

</div>
  </div>
</section>

<section id="timePickerMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="time-picker-field" data-canon data-variants="timePickerVariantsTable" data-harness="form" data-demo-width="300px">
<div class="nds-form-container nds-time-picker">
  <div class="nds-form-header">
    <label for="time-picker-visit">
      <span class="nds-label">Visit time</span>
    </label>
  </div>
  <div class="nds-form-control">
    <div class="nds-form-action">
      <button type="button" class="nds-btn nds-subtle nds-md time-picker-toggle" aria-label="Pick a time">
        <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
      </button>
    </div>
    <input type="text" id="time-picker-visit" class="nds-input nds-time-input" placeholder="HH:mm">
    <input type="hidden" class="nds-time-value" name="visit-time">
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="timePickerVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A Format or Seconds choice changes two elements: write `data-format` on `.nds-time-picker` and the same format as the placeholder of `.nds-time-input`. Seconds adds `:ss` to the chosen format: `HH:mm:ss` for 24-hour, `hh:mm:ss A` for 12-hour. A Bounds choice writes both `data-min-time` and `data-max-time` on `.nds-time-input`. Set another format, step or bound by hand: see the Data Attributes table.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Format | 24-hour (default) | — | — | The field shows `14:30`. The panel has an Hour and a Minute list |
| Format | 12-hour | `[data-format="hh:mm A"]` | `.nds-time-picker` | The field shows `02:30 PM`, and the panel adds an AM/PM list. See Time Format |
| Format | 12-hour | `[placeholder="hh:mm A"]` | `.nds-time-input` | |
| Seconds | Seconds | `[data-format="HH:mm:ss"]` | `.nds-time-picker:not([data-format="hh:mm A"])` | The field shows the second too, such as `14:30:15`, and the panel adds a Second list. See Time Format |
| Seconds | Seconds | `[placeholder="HH:mm:ss"]` | `.nds-time-input:not([placeholder="hh:mm A"])` | |
| Seconds | Seconds | `[data-format="hh:mm:ss A"]` | `.nds-time-picker[data-format="hh:mm A"]` | |
| Seconds | Seconds | `[placeholder="hh:mm:ss A"]` | `.nds-time-input[placeholder="hh:mm A"]` | |
| Minute step | 5 minutes (default) | — | — | The Minute list shows 00, 05, 10 and on to 55 |
| Minute step | 15 minutes | `[data-step="15"]` | `.nds-time-picker` | The Minute list shows 00, 15, 30 and 45. See Minute Step |
| Minute step | 30 minutes | `[data-step="30"]` | `.nds-time-picker` | The Minute list shows 00 and 30. See Minute Step |
| Bounds | None (default) | — | — | The user can pick any time |
| Bounds | Working hours | `[data-min-time="09:00"]` | `.nds-time-input` | The user can pick a time from 09:00 to 17:30 only. See Time Bounds |
| Bounds | Working hours | `[data-max-time="17:30"]` | `.nds-time-input` | |
| State (any) | Disabled | `[data-state~="disabled"]` | `.nds-time-picker:not([data-state~="readonly"])` | The user cannot type or open the panel, and the time does not post. Not with Read-only |
| State (any) | Read-only | `[data-state~="readonly"]` | `.nds-time-picker:not([data-state~="disabled"])` | The user sees the time but cannot change it. The time posts. Not with Disabled |
| State (any) | Required (hint: Press Validate with the field empty) | `[data-required]` | `.nds-time-picker` | The form needs a time. It does not submit while the field is empty |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #timePickerVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="timePickerBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Panel
{: .nds-block-title}

The clock button, `.time-picker-toggle`, opens the panel. A click in the text box only places the cursor, so the user can type. Without the button, a click in the text box opens the panel.

The field fills when every list has a value, and each later pick changes it at once. The panel has no Save button. Escape or a click outside the panel closes it.

### Time Format
{: .nds-block-title}

`data-format` on `.nds-time-picker` sets how the field shows a time, and which lists the panel holds. The default is `HH:mm`. Write the same format as the placeholder. The tokens are:

- `HH` and `H`: the hour from 0 to 23, with and without a leading zero
- `hh` and `h`: the hour from 1 to 12, with and without a leading zero
- `mm` and `ss`: the minute and the second
- `A` and `a`: AM or PM, in capitals or in lowercase

Any other character stays as written. `ss` adds a Second list, and `A` or `a` adds an AM/PM list. With `data-format="hh:mm A"`, the field shows `02:30 PM`, and `.nds-time-value` holds `14:30`.

### Minute Step
{: .nds-block-title}

`data-step` on `.nds-time-picker` sets the gap between the minutes in the Minute list, from 1 to 60. The default is 5. The Second list always shows every second. A saved time off the step, such as `09:07` with a step of 15, gets its own option in the list.

### Time Bounds
{: .nds-block-title}

`data-min-time` and `data-max-time` on `.nds-time-input` set the first and the last time the user can pick. Write them in 24-hour form, `HH:mm` or `HH:mm:ss`, whatever the format. Options outside the bounds are off. A picked hour turns off the minutes outside the bounds in that hour. When a pick moves another list's value outside the bounds, that list moves to the nearest allowed option.

### Disabled and Read-only
{: .nds-block-title}

`data-state~="disabled"` on `.nds-time-picker` disables the text box, the hidden input and the clock button, so the time does not post. With `data-state~="readonly"`, the user cannot type, and the panel does not open. The time still posts. A `readonly` attribute on `.nds-time-input` does the same: Forms copies it to the field.

</div>
  </div>
</section>

<section id="timePickerFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-magic-wand-01"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-time-input</code> starts on load. The script builds the panel the first time the user opens it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Type or Pick</span>
          </span>
          <p class="nds-item-desc">The user can type the time. The picker reads it when the user leaves the field, and writes it back in the format: <code class="nds-inline-code lang-html">9:30</code> becomes <code class="nds-inline-code lang-html">09:30</code>. AM and PM are read in Arabic or English.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-clock-01"></i>
            <span class="nds-label">24-Hour Value</span>
          </span>
          <p class="nds-item-desc">The hidden <code class="nds-inline-code lang-html">.nds-time-value</code> holds the time as <code class="nds-inline-code lang-html">HH:mm</code>, or <code class="nds-inline-code lang-html">HH:mm:ss</code> when the format has seconds. It is the same in every format and page language.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-01"></i>
            <span class="nds-label">Native Validation</span>
          </span>
          <p class="nds-item-desc">The picker checks the field at each <code class="nds-inline-code lang-js">change</code>. A time that does not match the format, or falls outside the bounds, shows an error under the field and blocks the submit.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-translate"></i>
            <span class="nds-label">Bilingual Labels</span>
          </span>
          <p class="nds-item-desc">List names, AM and PM, and error messages show in Arabic or English from the page language. They change when the page language changes.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-shrink-02"></i>
            <span class="nds-label">Panel Position</span>
          </span>
          <p class="nds-item-desc">The panel opens below the field, lined up with its start edge, or above it when the space below is too small. In a modal or a scrolling box, it moves to <code class="nds-inline-code lang-html">&lt;body&gt;</code>, so nothing clips it.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="timePickerPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a time picker for a time of day, such as an appointment, an opening time or a deadline.
- For a date and a time, use a Date Picker and a Time Picker as two fields. The user can then correct one without the other.
- Use `hh:mm A` on public forms, and `HH:mm` in tools for staff.
- Write `A` or `a` with `hh` or `h`. Without AM/PM, the picker reads every time as AM.
- Add seconds only when the task needs them.
- Set `data-step` to the gap between the slots the service offers. A step of 1 lists 60 minutes.
- Put the `name` on `.nds-time-value` only. The text box holds display text, such as `02:30 م`, and does not post.
- Read the time from `.nds-time-value`, or with `NDS.TimePicker.getValue()`.
- To show a saved time, write it in the `value` of `.nds-time-value`, in 24-hour form.
- Give the clock button an `aria-label`, such as "Pick a time". It shows only an icon.
- Do not put a time picker inside another dropmenu. The panel is a dropmenu itself.
- For the label, info text, feedback and the required mark, see [Forms](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="timePickerApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `.nds-time-picker-menu` | the panel | The script puts it on the panel, beside `.nds-dropmenu-menu`. Style the panel with it: it stays on the panel when the panel moves to `<body>` |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-format` | `.nds-time-picker` | How the field shows a time, and which lists the panel holds. The default is `HH:mm`. See Time Format |
| `data-step` | `.nds-time-picker` | The gap between the minutes in the Minute list, from `1` to `60`. The default is `5`. See Minute Step |
| `data-required` | `.nds-time-picker` | The form needs a time. It does not submit while the field is empty |
| `data-state~="disabled"`, `data-state~="readonly"` | `.nds-time-picker` | Set it yourself. See Disabled and Read-only |
| `data-state~="open"` | `.nds-time-picker` | The script sets it when the panel opens, and removes it when the panel closes. No NDS style reads it: it is for your CSS |
| `data-min-time`, `data-max-time` | `.nds-time-input` | The first and the last time the user can pick, in 24-hour form. See Time Bounds |
{: .nds-table .nds-responsive}

### Keyboard
{: .nds-block-title}

| Key | Where | Effect |
|---|---|---|
| Enter, Space | clock button | Opens or closes the panel |
| Tab, Shift + Tab | panel | Moves between the lists |
| Enter, Space, arrow keys | a list | Opens the list and moves through its options, as in any select in [Forms](../components/forms) |
| Escape | an open list | Closes the list. The panel stays open |
| Escape | text box or panel | Closes the panel |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

`el` can be the `.nds-time-input`, its `.nds-form-control` or its `.nds-form-container`.

| Method | Effect |
|---|---|
| `NDS.TimePicker.init()` | Starts every `.nds-time-input` that has not started. The loader calls it on load. Call it again after you add a field to the page |
| `NDS.TimePicker.reinit()` | The same as `init()` |
| `NDS.TimePicker.create(input, formControl)` | Starts one field, and returns its instance. `formControl` is optional: the default is the input's `.nds-form-control`. On a field that has started, it returns the same instance. It returns `null` when the input has no `.nds-form-control` or no `.nds-form-container` |
| `NDS.TimePicker.getValue(el)` | Returns the time in 24-hour form, such as `'14:30'`, with seconds when the format has them. It returns `''` until every list has a value |
| `NDS.TimePicker.setValue(el, '14:30')` | Writes a 24-hour time, and returns `true`. It returns `false`, and changes nothing, when it cannot read the time or the time is outside the bounds |
| `NDS.TimePicker.clear(el)` | Empties the field and every list, and returns `true` |
| `instance.destroy()` | Removes the panel and its listeners. `create()` can start the field again. Call it before you remove the field from the page. The instance is on the input as `input._ndsTimePicker` |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `input`, `change` | `.nds-time-input` and `.nds-time-value`, and they bubble | Native events, with no detail. Each input fires them when a pick, a typed time, `setValue()` or `clear()` changes its value. Read the time with `getValue()` |
{: .nds-table .nds-responsive}

<script type="text/html" id="time-picker-js" data-canon data-lang="js">
var input = document.querySelector('#time-picker-visit');

// Log the 24-hour time at each change
input.addEventListener('change', function () {
  console.log(NDS.TimePicker.getValue(input));
});

// Show a saved time
NDS.TimePicker.setValue(input, '14:30');
</script>

The full API is in the banner of `_js/nds-time-picker.js`.

</div>
  </div>
</section>
