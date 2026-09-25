---
layout: page
title: Radio Button
hero_title: Radio Button - National Design System
hero_description: A radio button picks one option from a set of choices
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/09/2026 - 01:32 AM"
---

<section id="radioOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A radio button is a native `<input type="radio">` drawn as a round tile, inside a form field with a label and optional info text. The options of one choice share a `name` and sit in a group under a legend, so the user can pick only one. The forms script starts every group, so a radio needs no script of its own.

Pick another component when:

- the user can pick more than one option: [Checkbox](../components/checkbox)
- the choice is one setting that takes effect at once: [Switch](../components/switch)
- the list of options is long: a select, in [Forms](../components/forms)

</div>
  </div>
</section>

<section id="radioMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="radio-group" data-canon data-variants="radioVariantsTable">
<fieldset class="nds-form-group nds-radio-group">
  <legend class="nds-label">Select your plan</legend>
  <div class="nds-form-container nds-radio-container">
    <div class="nds-form-header">
      <label for="radio-1">
        <span class="nds-label">Basic</span>
        <span class="nds-info">Core features for individuals</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="radio" id="radio-1" name="plan" value="basic" class="nds-radio" checked>
    </div>
  </div>
  <div class="nds-form-container nds-radio-container">
    <div class="nds-form-header">
      <label for="radio-2">
        <span class="nds-label">Professional</span>
        <span class="nds-info">Advanced tools for teams</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="radio" id="radio-2" name="plan" value="pro" class="nds-radio">
    </div>
  </div>
  <div class="nds-form-container nds-radio-container">
    <div class="nds-form-header">
      <label for="radio-3">
        <span class="nds-label">Enterprise</span>
        <span class="nds-info">Full access with dedicated support</span>
      </label>
    </div>
    <div class="nds-form-control">
      <input type="radio" id="radio-3" name="plan" value="enterprise" class="nds-radio">
    </div>
  </div>
</fieldset>
</script>
    </div>
  </div>
</section>

<section id="radioVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A row on `.nds-radio` (every `<input>`) or `.nds-radio-container` changes every option. Checked goes on one option only: the builder uses `#radio-1`, the first `<input>`, but on a page it goes on the option you mean.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Size | SM (default) | — | — | 16px tile. Dense forms and tables |
| Size | MD | `.nds-md` | `.nds-radio-container` | 20px tile. Most forms |
| Size | LG | `.nds-lg` | `.nds-radio-container` | 24px tile. Touch-first screens |
| Color | Neutral | `.nds-neutral` | `.nds-radio` | Put it on each `<input>`. The checked tile uses the neutral color, not the primary color. Use it when the choice is not a brand action. The color shows only when an option is checked |
| Checked | Checked (default) | `[checked]` | `#radio-1` | This option is chosen when the page loads. Put it on one option of a group only. Leave every option unchecked when the user must decide |
| Required | Required | `[data-required]` | `.nds-radio-group` | The user must pick an option before the form submits. A required mark shows before the legend. Use it with no option checked |
| Disabled | Disabled | `[disabled]` | `.nds-radio` | The user cannot pick these options now. Put it on one input to disable one option, or use `data-state~="disabled"` on the group |
| Readonly | Readonly | `[data-state~="readonly"]` | `.nds-radio-container` | The group shows its value but cannot change, by pointer or by keyboard. Put it on every option's container. The tile outline takes the disabled color, and the fill stays |
| Layout | Row | `.nds-rowView` | `.nds-radio-group` | The options sit side by side and wrap |
| Field states | Label, info, feedback | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #radioVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="radioFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">The forms script starts every radio. A container follows the disabled state of its input, in both directions. Required belongs to the group, not to one input.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
            <span class="nds-label">Group Validation</span>
          </span>
          <p class="nds-item-desc">A required group is checked on submit. Once it shows an error, each change checks it again. Call <code class="nds-inline-code lang-js">NDS.Forms.clearStatus(group)</code> to clear it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-02"></i>
            <span class="nds-label">Visual Feedback</span>
          </span>
          <p class="nds-item-desc">A ripple grows around the tile on hover. Three sizes (SM, MD and LG) scale the tile and its checked ring together.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-lock"></i>
            <span class="nds-label">Readonly Lock</span>
          </span>
          <p class="nds-item-desc">A readonly option shows its value and cannot change, by pointer or by keyboard. Its fill keeps its color, so the choice stays readable.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-01"></i>
            <span class="nds-label">Responsive Layout</span>
          </span>
          <p class="nds-item-desc">Options stack in a column, or sit in a row with <code class="nds-inline-code lang-html">nds-rowView</code>. On a phone, the gaps between a radio, its label and the next option are smaller.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="radioPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put every group in a `<fieldset class="nds-form-group nds-radio-group">` with a `<legend>` that names the choice. Screen readers read the legend with each option.
- Give every radio of a group the same `name`, so the browser treats them as one choice.
- Offer at least two options. For one yes-or-no setting, use a [Switch](../components/switch) or a [Checkbox](../components/checkbox).
- Check one option by default when most users will want it. Leave all unchecked when the user must decide.
- Put `data-required` on the group, not on one input, so the group is validated as a whole.
- Use `nds-neutral` when the choice is not a brand action.
- To lock a whole group, put `data-state="readonly"` on every option's container.
- Use the default size in dense forms and tables, `nds-md` in most forms, and `nds-lg` on touch-first screens.
- For the label, info text, feedback and the required mark, see [Forms](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="radioApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-required` | `.nds-radio-group` | The user must pick an option before the form submits. It also adds the required mark to the legend |
| `data-error-message` | `.nds-radio-group` | Replaces the default message, "Please select an option" |
| `data-state~="disabled"` | `.nds-radio-group` | Half opacity and no pointer events. It also disables every input in the group |
| `data-state~="readonly"` | `.nds-radio-container` | The option cannot change. The tile outline takes the disabled color |
| `data-feedback-target` | an element inside the group | Receives the group's feedback message. Without one, the message goes at the end of the group |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-radio-container`. The size classes set the first one.

| Property | Default | Controls |
|---|---|---|
| `--nds-input-size` | `16px` | Tile size and label line height. `nds-md` and `nds-lg` set 20px and 24px |
| `--radio-tile-bg` | `var(--background-default)` | Tile background |
| `--radio-tile-border` | `var(--controls-border)` | Tile outline color |
{: .nds-table .nds-responsive}

The checked colors are the `--radio-primary-*` and `--radio-neutral-*` tokens (`checked`, `hovered`, `pressed`). See [Tokens](../components/tokens).

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Forms.validateRadioGroup(group, options)` | Checks the group and returns `{ valid, selected, message }`: `selected` is `true` when an option is checked. Pass `{ showMessage: false }` to check without a message |
| `NDS.Forms.syncState(input)` | Updates the field after you set `.checked` from code. It fires no event |
| `NDS.Forms.setStatus({ element: group, status, message })` | Shows a status and a message on the group, such as an error from the server |
| `NDS.Forms.clearStatus(group)` | Removes the group's feedback message |
{: .nds-table .nds-responsive}

<script type="text/html" id="radio-js" data-canon data-lang="js">
var group = document.querySelector('.nds-radio-group');
var result = NDS.Forms.validateRadioGroup(group);
// { valid: false, selected: false, message: 'Please select an option' }

var radio = document.querySelector('#radio-2');
radio.checked = true;
NDS.Forms.syncState(radio);
</script>

The full API is in the banner of `_js/nds-forms.js`.

</div>
  </div>
</section>

<section id="radioRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Filter](../components/filter): single-choice filter options drawn with the same radio tiles.
- [Forms](../components/forms): labels, feedback and validation for every field.

</div>
  </div>
</section>
