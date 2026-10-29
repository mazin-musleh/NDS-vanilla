---
layout: page
title: Checkbox
hero_title: Checkbox - National Design System
hero_description: A checkbox turns one option on or off, alone or as one of several choices
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/10/2026 - 12:02 PM"
---

<section id="checkbox-overview" class="nds-content-section nds-doc-overview">
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

<section id="checkbox-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="check-single" data-canon data-variants="checkbox-variants-table" data-harness="form">
<div class="nds-form-container nds-checkbox">
  <div class="nds-form-header" data-feedback-target>
    <label for="terms">
      <span class="nds-label">I agree to the terms and conditions</span>
      <span class="nds-info">You must accept the terms to continue</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="checkbox" id="terms" name="agreement" value="accepted" class="nds-checkbox-input">
  </div>
</div>
</script>
<script type="text/html" id="check-group" data-canon>
<fieldset class="nds-form-group nds-checkbox-group">
  <legend class="nds-label">Select your interests</legend>
  <div class="nds-form-container nds-checkbox">
    <div class="nds-form-header">
      <label for="check-1">
        <span class="nds-label">Technology</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="checkbox" id="check-1" name="interests" value="technology" class="nds-checkbox-input">
    </div>
  </div>
  <div class="nds-form-container nds-checkbox">
    <div class="nds-form-header">
      <label for="check-2">
        <span class="nds-label">Sports</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="checkbox" id="check-2" name="interests" value="sports" class="nds-checkbox-input">
    </div>
  </div>
  <div class="nds-form-container nds-checkbox">
    <div class="nds-form-header">
      <label for="check-3">
        <span class="nds-label">Education</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="checkbox" id="check-3" name="interests" value="education" class="nds-checkbox-input">
    </div>
  </div>
  <div class="nds-form-container nds-checkbox">
    <div class="nds-form-header">
      <label for="check-4">
        <span class="nds-label">Travel</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="checkbox" id="check-4" name="interests" value="travel" class="nds-checkbox-input">
    </div>
  </div>
</fieldset>
</script>
    </div>
  </div>
</section>

<section id="checkbox-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A row on `.nds-checkbox-input` (every `<input>`) or `.nds-checkbox` changes every option. Checked goes on one option: the builder uses `#terms` or `#check-1`, but on a page it goes on the option you mean. The indeterminate state is set only from JavaScript: see the API. `.nds-checkbox:only-of-type` is the single checkbox, not one inside a group.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Single (default) | — | — | One checkbox, for a yes-or-no answer such as agreeing to the terms |
| Structure | Group | canon `#check-group` | — | Several options under one legend. The user can pick any number |
| Size | SM (default) | — | — | 16px tile. Dense forms and tables |
| Size | MD | `.nds-md` | `.nds-checkbox` | 20px tile. Most forms |
| Size | LG | `.nds-lg` | `.nds-checkbox` | 24px tile. Touch-first screens |
| Color | Neutral (demo: + checked) | `.nds-neutral` | `.nds-checkbox-input` | Put it on each `<input>`. The checked tile uses the neutral color, not the primary color. Use it when the choice is not a brand action. The color shows only when an option is checked, so the demo turns Checked on too |
| Checked | Checked (id: checked) | `[checked]` | `#terms` | The option is on when the page loads |
| Checked | Checked (id: checked) | `[checked]` | `#check-1` | The same, in a group |
| Validation | None (default) | — | — | No rule |
| Validation | Required (hint: Press Validate with nothing checked) | `[data-required]` | `.nds-checkbox:only-of-type` | A single checkbox must be checked before the form submits. The forms script adds `required` to the input |
| Validation | Required (hint: Press Validate with nothing checked) | `[data-required]` | `.nds-checkbox-group` | A group needs at least one option checked |
| Validation | At least 2 | `[data-min-checked="2"]` | `.nds-checkbox-group` | At least 2 options must be checked. Say the rule in the legend |
| Validation | At most 3 (hint: Check all four options, then press Validate) | `[data-max-checked="3"]` | `.nds-checkbox-group` | No more than 3 options may be checked. Say the rule in the legend |
| Validation | At least 2 + At most 3 | `[data-min-checked="2"]` | `.nds-checkbox-group` | Both together: between 2 and 3 options must be checked |
| Validation | At least 2 + At most 3 | `[data-max-checked="3"]` | `.nds-checkbox-group` | The same |
| Disabled | Disabled | `[disabled]` | `.nds-checkbox-input` | The user cannot change these options now. Put it on one input to disable one option, or use `data-state~="disabled"` on the group |
| Readonly | Readonly | `[data-state~="readonly"]` | `.nds-checkbox` | The options show their value but cannot change, by pointer or by keyboard. The tile shows a border only, and a checked tile keeps its mark |
| Layout | Row | `.nds-horizontal` | `.nds-checkbox-group` | The options sit side by side and wrap |
| Field states | Label, info, feedback | — | — | Shared by every form field. See [Forms](../components/form) |
{: #checkbox-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="checkbox-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Readonly
{: .nds-block-title}

`data-state~="readonly"` on the container shows the value and stops the change, by pointer or by keyboard. The tile shows a border only, and a checked tile keeps its mark, so the answer stays readable.

### Group Rules
{: .nds-block-title}

`data-required`, `data-min-checked` and `data-max-checked` on the group set how many options must be checked. Once the group shows an error, each change checks the rules again.

### Indeterminate
{: .nds-block-title}

`NDS.Checkbox.setIndeterminate()` shows a dash, for a "select all" checkbox. A click by the user clears it. Each change fires `nds:checkbox:indeterminate`.

</div>
  </div>
</section>

<section id="checkbox-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-feature-list nds-grid nds-divided-rows nds-icons-subtle">
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-plug-socket" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Form Integration</span>
              <p class="nds-card-description">The forms script starts every checkbox. A container follows the disabled state of its input, in both directions. <code class="nds-inline-code lang-html">data-required</code> on a single checkbox makes its input required; a group checks itself.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-layout-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Responsive Layout</span>
              <p class="nds-card-description">On a phone, the gaps between a checkbox, its label and the next option are smaller.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="checkbox-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put a group in a `<fieldset class="nds-form-group nds-checkbox-group">` with a `<legend>` that names the choice. Screen readers read the legend with each option.
- For many short options, such as times of day, put them in a `<div class="nds-grid" style="--min-width: 6.5rem;">` inside the group, after the `<legend>`, so they line up in as many columns as fit. Do not put `nds-grid` on the `<fieldset>` itself: it stretches the legend.
- Keep a group to 7 options or fewer. For a longer list, use a [Multiselect](../components/multiselect).
- When a group has a rule, say it in the legend, such as "Select 2 to 3 interests". The error message appears only after a submit.
- Put `data-required`, `data-min-checked` and `data-max-checked` on the group, not on its inputs. For a single checkbox, put `data-required` on its container.
- Write the label of a single checkbox as the statement the user agrees to, such as "I agree to the terms and conditions".
- Use the indeterminate state only for a checkbox that controls other checkboxes, such as "select all".
- Use `nds-neutral` when the choice is not a brand action.
- To lock a whole group, put `data-state="readonly"` on every option's container.
- For the label, info text and feedback, see [Forms](../components/form). They work the same on every field.

</div>
  </div>
</section>

<section id="checkbox-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-required` | `.nds-checkbox` of a single checkbox, or `.nds-checkbox-group` | The checkbox must be checked, or the group needs one option checked, before the form submits. It adds the required mark to the label or the legend |
| `data-min-checked` | `.nds-checkbox-group` | The fewest options that must be checked. The message reads "Please select at least 2 options" |
| `data-max-checked` | `.nds-checkbox-group` | The most options that may be checked. The message reads "Please select no more than 3 options" |
| `data-error-message` | `.nds-checkbox-group` | Replaces the message when nothing is checked. The `data-min-checked` and `data-max-checked` messages stay |
| `data-state~="disabled"` | `.nds-checkbox`, `.nds-checkbox-group` | Disables the option, or every option in the group. The group's title takes the disabled color |
| `data-state~="readonly"` | `.nds-checkbox` | The option cannot change. The tile shows a border only |
| `data-state~="indeterminate"` | `.nds-checkbox` | Set by `NDS.Checkbox.setIndeterminate()`. Do not set it yourself |
| `data-feedback-target` | `.nds-form-header`, or an element inside the group | Receives the feedback message. Without one, the message goes at the end of the field or the group |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-checkbox`. The size classes set the first one.

| Property | Default | Controls |
|---|---|---|
| `--nds-input-size` | `16px` | Tile size and label line height. `nds-md` and `nds-lg` set 20px and 24px |
| `--checkbox-tile-bg` | `var(--background-default)` | Tile background |
| `--checkbox-tile-border` | `var(--controls-border)` | Tile outline color |
| `--checkbox-glyph-bg` | `var(--background-default)` | Color of the check mark or the dash |
{: .nds-table .nds-responsive}

### Tokens
{: .nds-block-title}

Set a token at `:root`, or on a wrapper to reach every checkbox inside it. Give a token with a Dark mode value a dark override too: see [Tokens](../foundations/tokens).

Source: the `checkbox` group in `_sass/tokens/_components.scss`.

{{ site.data.tokens.components.checkbox.html }}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Checkbox.setIndeterminate(checkbox, value)` | Shows or clears the dash, and fires `nds:checkbox:indeterminate` |
| `NDS.Checkbox.validate(group, options)` | Checks the group and returns `{ valid, checked, min, max, message }`. Pass `{ showMessage: false }` to check without a message. A group that shows an error is checked again on each change |
| `NDS.Form.refresh(input)` | Updates the field after you set `.checked` from code. It fires no event |
| `NDS.Form.setStatus(element, status, { message })` | Shows a status and a message on a field or a group, such as an error from the server |
| `NDS.Form.clearStatus(element)` | Removes the feedback message |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:checkbox:indeterminate` | the `<input>` | `{ indeterminate }`, `true` or `false` |
{: .nds-table .nds-responsive}

<script type="text/html" id="check-js" data-canon data-lang="js">
// A "select all" checkbox that shows a dash when only some options are checked
var all = document.querySelector('#select-all');
var options = document.querySelectorAll('.nds-checkbox-group .nds-checkbox-input');

function update() {
  var on = Array.prototype.filter.call(options, function (cb) { return cb.checked; }).length;
  all.checked = on === options.length;
  NDS.Checkbox.setIndeterminate(all, on > 0 && on < options.length);
}
options.forEach(function (cb) { cb.addEventListener('change', update); });

// Check a group before a custom save
var result = NDS.Checkbox.validate(document.querySelector('.nds-checkbox-group'));
// { valid: false, checked: 1, min: 2, max: 3, message: 'Please select at least 2 options' }
</script>

The full API is in the banner of `_js/nds-checkbox.js`.

</div>
  </div>
</section>

<section id="checkbox-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Multiselect](../components/multiselect): checkbox options in a dropdown, with the same minimum and maximum rules.
- [Forms](../components/form): labels, feedback and validation for every field.

</div>
  </div>
</section>
