---
layout: page
title: Checkbox
hero_title: Checkbox - National Design System
hero_description: A checkbox turns one option on or off, alone or as one of several choices
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/09/2026 - 01:33 AM"
---

<section id="checkboxOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A checkbox is a native `<input type="checkbox">` drawn as a square tile, inside a form field with a label and optional info text. Use one alone for a yes-or-no answer, such as agreeing to the terms. Use several in a group under a legend when the user can pick any number of options. The forms script starts every checkbox, so it needs no script of its own.

Pick another component when:

- the user can pick only one option: [Radio Button](../components/radio)
- the choice is one setting that takes effect at once: [Switch](../components/switch)
- the list of options is long: [Multiselect](../components/multiselect)

</div>
  </div>
</section>

<section id="checkboxMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="check-single" data-canon data-variants="checkboxVariantsTable" data-harness="form">
<div class="nds-form-container nds-check-container">
  <div class="nds-form-header" data-feedback-target>
    <label for="terms">
      <span class="nds-label">I agree to the terms and conditions</span>
      <span class="nds-info">You must accept the terms to continue</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="checkbox" id="terms" name="agreement" value="accepted" class="nds-check">
  </div>
</div>
</script>
<script type="text/html" id="check-group" data-canon>
<fieldset class="nds-form-group nds-check-group">
  <legend class="nds-label">Select your interests</legend>
  <div class="nds-form-container nds-check-container">
    <div class="nds-form-header">
      <label for="check-1">
        <span class="nds-label">Technology</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="checkbox" id="check-1" name="interests" value="technology" class="nds-check">
    </div>
  </div>
  <div class="nds-form-container nds-check-container">
    <div class="nds-form-header">
      <label for="check-2">
        <span class="nds-label">Sports</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="checkbox" id="check-2" name="interests" value="sports" class="nds-check">
    </div>
  </div>
  <div class="nds-form-container nds-check-container">
    <div class="nds-form-header">
      <label for="check-3">
        <span class="nds-label">Education</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="checkbox" id="check-3" name="interests" value="education" class="nds-check">
    </div>
  </div>
  <div class="nds-form-container nds-check-container">
    <div class="nds-form-header">
      <label for="check-4">
        <span class="nds-label">Travel</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="checkbox" id="check-4" name="interests" value="travel" class="nds-check">
    </div>
  </div>
</fieldset>
</script>
    </div>
  </div>
</section>

<section id="checkboxVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A row on `.nds-check` (every `<input>`) or `.nds-check-container` changes every option. Checked goes on one option: the builder uses `#terms` or `#check-1`, but on a page it goes on the option you mean. The indeterminate state is set only from JavaScript: see the API. `.nds-check-container:only-of-type` is the single checkbox, not one inside a group.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Single (default) | — | — | One checkbox, for a yes-or-no answer such as agreeing to the terms |
| Structure | Group | canon `#check-group` | — | Several options under one legend. The user can pick any number |
| Size | SM (default) | — | — | 16px tile. Dense forms and tables |
| Size | MD | `.nds-md` | `.nds-check-container` | 20px tile. Most forms |
| Size | LG | `.nds-lg` | `.nds-check-container` | 24px tile. Touch-first screens |
| Color | Neutral (demo: + Checked) | `.nds-neutral` | `.nds-check` | Put it on each `<input>`. The checked tile uses the neutral color, not the primary color. Use it when the choice is not a brand action. The color shows only when an option is checked, so the demo turns Checked on too |
| Checked | Checked | `[checked]` | `#terms` | The option is on when the page loads |
| Checked | Checked | `[checked]` | `#check-1` | The same, in a group |
| Validation | None (default) | — | — | No rule |
| Validation | Required (hint: Press Validate with nothing checked) | `[data-required]` | `.nds-check-container:only-of-type` | A single checkbox must be checked before the form submits. The forms script adds `required` to the input |
| Validation | Required (hint: Press Validate with nothing checked) | `[data-required]` | `.nds-check-group` | A group needs at least one option checked |
| Validation | At least 2 | `[data-min-checked="2"]` | `.nds-check-group` | At least 2 options must be checked. Say the rule in the legend |
| Validation | At most 3 | `[data-max-checked="3"]` | `.nds-check-group` | No more than 3 options may be checked. Say the rule in the legend |
| Validation | At least 2 + At most 3 | `[data-min-checked="2"]` | `.nds-check-group` | Both together: between 2 and 3 options must be checked |
| Validation | At least 2 + At most 3 | `[data-max-checked="3"]` | `.nds-check-group` | The same |
| Disabled | Disabled | `[disabled]` | `.nds-check` | The user cannot change these options now. Put it on one input to disable one option, or use `data-state~="disabled"` on the group |
| Readonly | Readonly | `[data-state~="readonly"]` | `.nds-check-container` | The options show their value but cannot change, by pointer or by keyboard. The tile shows a border only, and a checked tile keeps its mark |
| Layout | Row | `.nds-rowView` | `.nds-check-group` | The options sit side by side and wrap |
| Field states | Label, info, feedback | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #checkboxVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="checkboxFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Form Integration</span>
          </span>
          <p class="nds-item-desc">The forms script starts every checkbox. A container follows the disabled state of its input, in both directions. <code class="nds-inline-code lang-html">data-required</code> on a single checkbox makes its input required; a group checks itself.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-minus-sign"></i>
            <span class="nds-label">Indeterminate State</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-js">NDS.Forms.setIndeterminate()</code> shows a dash, for a "select all" checkbox. A click by the user clears it. Each change fires <code class="nds-inline-code lang-js">nds:indeterminateChange</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
            <span class="nds-label">Group Validation</span>
          </span>
          <p class="nds-item-desc">Set a minimum and a maximum number of checked options with <code class="nds-inline-code lang-html">data-min-checked</code> and <code class="nds-inline-code lang-html">data-max-checked</code>. Once the group shows an error, each change checks it again.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-lock"></i>
            <span class="nds-label">Readonly Lock</span>
          </span>
          <p class="nds-item-desc">A readonly checkbox shows its value and cannot change, by pointer or by keyboard. A checked tile keeps its mark, so the answer stays readable.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-01"></i>
            <span class="nds-label">Responsive Layout</span>
          </span>
          <p class="nds-item-desc">Options stack in a column, or sit in a row with <code class="nds-inline-code lang-html">nds-rowView</code>. On a phone, the gaps between a checkbox, its label and the next option are smaller.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="checkboxPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put a group in a `<fieldset class="nds-form-group nds-check-group">` with a `<legend>` that names the choice. Screen readers read the legend with each option.
- Keep a group to 7 options or fewer. For a longer list, use a [Multiselect](../components/multiselect).
- When a group has a rule, say it in the legend, such as "Select 2 to 3 interests". The error message appears only after a submit.
- Put `data-required`, `data-min-checked` and `data-max-checked` on the group, not on its inputs. For a single checkbox, put `data-required` on its container.
- Write the label of a single checkbox as the statement the user agrees to, such as "I agree to the terms and conditions".
- Use the indeterminate state only for a checkbox that controls other checkboxes, such as "select all".
- Use `nds-neutral` when the choice is not a brand action.
- To lock a whole group, put `data-state="readonly"` on every option's container.
- For the label, info text and feedback, see [Forms](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="checkboxApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-required` | `.nds-check-container` of a single checkbox, or `.nds-check-group` | The checkbox must be checked, or the group needs one option checked, before the form submits. It adds the required mark to the label or the legend |
| `data-min-checked` | `.nds-check-group` | The fewest options that must be checked. The message reads "Please select at least 2 options" |
| `data-max-checked` | `.nds-check-group` | The most options that may be checked. The message reads "Please select no more than 3 options" |
| `data-error-message` | `.nds-check-group` | Replaces the default message |
| `data-state~="disabled"` | `.nds-check-container`, `.nds-check-group` | Disables the option, or every option in the group. A group also turns half transparent |
| `data-state~="readonly"` | `.nds-check-container` | The option cannot change. The tile shows a border only |
| `data-state~="indeterminate"` | `.nds-check-container` | Set by `NDS.Forms.setIndeterminate()`. Do not set it yourself |
| `data-feedback-target` | `.nds-form-header`, or an element inside the group | Receives the feedback message. Without one, the message goes at the end of the field or the group |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-check-container`. The size classes set the first one.

| Property | Default | Controls |
|---|---|---|
| `--nds-input-size` | `16px` | Tile size and label line height. `nds-md` and `nds-lg` set 20px and 24px |
| `--checkbox-tile-bg` | `var(--background-default)` | Tile background |
| `--checkbox-tile-border` | `var(--controls-border)` | Tile outline color |
| `--checkbox-glyph-bg` | `var(--background-default)` | Color of the check mark or the dash |
{: .nds-table .nds-responsive}

The checked colors are the `--checkbox-primary-*` and `--checkbox-neutral-*` tokens (`checked`, `hovered`, `pressed`). See [Tokens](../components/tokens).

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Forms.setIndeterminate(checkbox, value)` | Shows or clears the dash, and fires `nds:indeterminateChange` |
| `NDS.Forms.validateCheckboxGroup(group, options)` | Checks the group and returns `{ valid, checked, min, max, message }`. Pass `{ showMessage: false }` to check without a message |
| `NDS.Forms.initCheckboxGroupValidation(group)` | Checks a group again on each change once it shows an error. The forms script calls it for groups on the page; call it for a group you add later |
| `NDS.Forms.syncState(input)` | Updates the field after you set `.checked` from code. It fires no event |
| `NDS.Forms.setStatus({ element, status, message })` | Shows a status and a message on a field or a group, such as an error from the server |
| `NDS.Forms.clearStatus(element)` | Removes the feedback message |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:indeterminateChange` | the `<input>` | `{ indeterminate }`, `true` or `false` |
{: .nds-table .nds-responsive}

<script type="text/html" id="check-js" data-canon data-lang="js">
// A "select all" checkbox that shows a dash when only some options are checked
var all = document.querySelector('#select-all');
var options = document.querySelectorAll('.nds-check-group .nds-check');

function update() {
  var on = Array.prototype.filter.call(options, function (cb) { return cb.checked; }).length;
  all.checked = on === options.length;
  NDS.Forms.setIndeterminate(all, on > 0 && on < options.length);
}
options.forEach(function (cb) { cb.addEventListener('change', update); });

// Check a group before a custom save
var result = NDS.Forms.validateCheckboxGroup(document.querySelector('.nds-check-group'));
// { valid: false, checked: 1, min: 2, max: 3, message: 'Please select at least 2 options' }
</script>

The full API is in the banner of `_js/nds-forms.js`.

</div>
  </div>
</section>

<section id="checkboxRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Multiselect](../components/multiselect): checkbox options in a dropdown, with the same minimum and maximum rules.
- [Forms](../components/forms): labels, feedback and validation for every field.

</div>
  </div>
</section>
