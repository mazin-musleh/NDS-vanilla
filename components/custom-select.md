---
layout: page
title: Custom Select
hero_title: Custom Select - National Design System
hero_description: A form field that opens a styled list, where the user picks one option
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="custom-select-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A custom select is a field that opens a list of options under it. The user picks one option, and the field shows its label. The field has three parts: a read-only text box for the label, a hidden input for the value, and a list of option buttons. An option can also hold an icon and a second line of text.

Pick another component when:

- the user types to search a long list: [Autocomplete](../components/autocomplete)
- the user picks more than one option: [Multiselect](../components/multiselect)
- the design asks for the phone's own picker: the native select in [Text Fields](../components/forms)

</div>
  </div>
</section>

<section id="custom-select-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="custom-select-field" data-canon data-variants="custom-select-variants-table" data-harness="form" data-demo-width="300px">
<div class="nds-form-container nds-select">
  <div class="nds-form-header">
    <label for="custom-select-region">
      <span class="nds-label">Region</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="text" id="custom-select-region" class="nds-input nds-select-input" placeholder="Choose a region" readonly>
    <input type="hidden" name="region" class="nds-select-value">
    <div class="nds-select-dropdown" hidden>
      <div class="nds-select-options">
        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="riyadh">
          <span class="nds-option-text">
            <span class="nds-label">Riyadh</span>
          </span>
        </button>
        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="makkah">
          <span class="nds-option-text">
            <span class="nds-label">Makkah</span>
          </span>
        </button>
        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="eastern">
          <span class="nds-option-text">
            <span class="nds-label">Eastern Province</span>
          </span>
        </button>
        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="asir">
          <span class="nds-option-text">
            <span class="nds-label">Asir</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="custom-select-rich" data-canon>
<div class="nds-form-container nds-select">
  <div class="nds-form-header">
    <label for="custom-select-contact">
      <span class="nds-label">Contact method</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="text" id="custom-select-contact" class="nds-input nds-select-input" placeholder="Choose a method" readonly>
    <input type="hidden" name="contact-method" class="nds-select-value">
    <div class="nds-select-dropdown" hidden>
      <div class="nds-select-options">
        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="phone">
          <i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"></i>
          <span class="nds-option-text">
            <span class="nds-label">Phone</span>
            <span class="nds-description">A call within 2 working days</span>
          </span>
        </button>
        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="email">
          <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
          <span class="nds-option-text">
            <span class="nds-label">Email</span>
            <span class="nds-description">A reply within 5 working days</span>
          </span>
        </button>
        <button type="button" class="nds-btn nds-subtle nds-select-option" data-value="visit">
          <i class="nds-icon nds-hgi-location-01" aria-hidden="true"></i>
          <span class="nds-option-text">
            <span class="nds-label">In person</span>
            <span class="nds-description">At a service center, by appointment</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="custom-select-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Plain (default) | — | — | Options with a label only |
| Structure | Icon and description (id: rich) | canon `#custom-select-rich` | — | Options with an icon and a second line, for choices that need a short explanation. See Option Content |
| Size | LG (default) | — | — | 40px high. It needs no class |
| Size | MD | `.nds-md` | `.nds-form-container` | 32px high, with smaller text, for a table filter or a side panel |
| Style | Outline (default) | — | — | A border on the page background |
| Style | Lighter | `.nds-lighter` | `.nds-form-container` | A light fill and no border, for a field on a white card |
| Style | Darker | `.nds-darker` | `.nds-form-container` | A darker fill and no border, for a field on a gray surface |
| Saved value | Saved value (not: rich) (hint: The field opens with Makkah picked) | `[value="makkah"]` | `.nds-select-value` | The field opens with Makkah picked. See Saved Value |
| State (any) | Disabled | `[data-state~="disabled"]` | `.nds-select:not([data-state~="readonly"])` | The user cannot open the list, and the value does not post. Not with Read-only |
| State (any) | Read-only | `[data-state~="readonly"]` | `.nds-select:not([data-state~="disabled"])` | The user sees the value but cannot change it. The value posts. Not with Disabled |
| Validation | Required (hint: Press Validate with no option picked) | `[data-required]` | `.nds-select` | The form needs a pick. It does not submit while the field is empty |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Text Fields](../components/forms) |
{: #custom-select-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="custom-select-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Option Content
{: .nds-block-title}

An option holds its label in `.nds-label` inside `.nds-option-text`. A `.nds-description` beside the label adds a second line, and an icon before `.nds-option-text` sits on the label's line. The field shows the label only, never the description or the icon.

### Saved Value
{: .nds-block-title}

To show a saved value, write it in the `value` of `.nds-select-value`, and leave the text box empty. When the page loads, the script finds the option with the same `data-value` and writes its label in the text box. When the list opens, that option shows as picked.

### Disabled and Read-only
{: .nds-block-title}

`data-state~="disabled"` on `.nds-select` disables both inputs, so the user cannot open the list and the value does not post. With `data-state~="readonly"`, the list does not open by mouse or by keyboard. The value still posts.

</div>
  </div>
</section>

<section id="custom-select-features" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-select-input</code> works with no setup. The script builds a field's list the first time the user focuses it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-database-01"></i>
            <span class="nds-label">Form Value</span>
          </span>
          <p class="nds-item-desc">The hidden <code class="nds-inline-code lang-html">.nds-select-value</code> holds the picked option's <code class="nds-inline-code lang-html">data-value</code> and posts with the form. The text box shows the label and does not post.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Support</span>
          </span>
          <p class="nds-item-desc">Enter, Space and the arrow keys open the list on the picked option. The arrow keys move through the options, and Escape closes the list and returns focus to the field.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-01"></i>
            <span class="nds-label">Required Check</span>
          </span>
          <p class="nds-item-desc">With <code class="nds-inline-code lang-html">data-required</code>, the form checks the hidden value at submit. An empty field shows "Please select an option" in the page language and blocks the submit.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-shrink-02"></i>
            <span class="nds-label">List Position</span>
          </span>
          <p class="nds-item-desc">The list opens under the field, as wide as the field. In a modal or a scrolling box, it moves to <code class="nds-inline-code lang-html">&lt;body&gt;</code>, so nothing clips it.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="custom-select-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a custom select for a single choice in a form, whatever the number of options. A native select beside styled fields does not match them.
- Put the `name` on `.nds-select-value` only.
- Write `readonly` on `.nds-select-input`. It stops the user from typing in the text box.
- Write `hidden` on `.nds-select-dropdown`, so the list stays closed until the script builds it.
- Give each option a unique `data-value`. `setValue()` and a saved value pick the first option that matches.
- Put `data-required` on `.nds-select`, not on the text box. The form reads the hidden value.
- Keep a description to one short line.
- Write `aria-hidden="true"` on an option's icon. The label names the option.
- To change the value from a script, use `setValue()` or `clear()`. They update the label, the value and the `selected` state together.
- For the label, info text, feedback and the required mark, see [Text Fields](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="custom-select-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `.nds-select-menu` | `.nds-select-dropdown` | The script adds it when it builds the list. Style the list with it: it stays on the list when the list moves to `<body>` |
| `.nds-dropmenu`, `.nds-dropmenu-trigger`, `.nds-dropmenu-menu`, `.nds-dropmenu-scroll`, `.nds-dropmenu-item` | `.nds-form-control`, `.nds-select-input`, `.nds-select-dropdown`, `.nds-select-options`, each `.nds-select-option`, in the same order | The script adds them when it builds the list, so [Dropmenu](../components/dropmenu) opens, places and closes it. Do not write them |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-required` | `.nds-select` | The form needs a pick. It does not submit while `.nds-select-value` is empty |
| `data-error-message` | `.nds-select` | Replaces the message the required check shows |
| `data-state~="disabled"`, `data-state~="readonly"` | `.nds-select` | Set it yourself. See Disabled and Read-only |
| `data-state~="open"` | `.nds-select` | The script sets it when the list opens, and removes it when the list closes. It turns the arrow |
| `role="combobox"` | `.nds-select-input` | The script sets it when it builds the list. Dropmenu then sets `aria-expanded` on it |
| `hidden` | `.nds-select-dropdown` | Write it. The script removes it when it builds the list |
| `data-value` | `.nds-select-option` | The value the option writes in `.nds-select-value` |
| `data-state~="selected"` | `.nds-select-option` | The script sets it on the picked option, and removes it from the others, at each pick, `setValue()` and `clear()`. Do not write it: write the value in `.nds-select-value` |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--dropmenu-min-width` | `100%` | The least width of the list. `100%` is the width of the field. Set it on `.nds-select`. The other [Dropmenu](../components/dropmenu) width properties work here too |
{: .nds-table .nds-responsive}

### Keyboard
{: .nds-block-title}

| Key | Where | Effect |
|---|---|---|
| Enter, Space | text box | Opens or closes the list, and focuses the picked option or the first one |
| Arrow Down, Arrow Up | text box | Opens the list, and focuses the picked option, or the first or last one |
| Arrow Down, Arrow Up, Home, End | list | Moves through the options |
| Enter, Space | an option | Picks it, closes the list and returns focus to the text box |
| Escape | list | Closes the list and returns focus to the text box |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

`el` can be the `.nds-select-input`, or an element that holds it, such as its `.nds-form-control` or `.nds-form-container`.

| Method | Effect |
|---|---|
| `NDS.CustomSelect.init()` | Writes the label of every saved value. The first call also starts to watch the page for focus and picks. The loader calls it on load. Call it again after you add a field with a saved value |
| `NDS.CustomSelect.reinit()` | The same as `init()` |
| `NDS.CustomSelect.create(el)` | Builds the list of one field now, instead of at its first focus. A built field is left as it is |
| `NDS.CustomSelect.setValue(el, 'makkah')` | Picks the option with that `data-value`, the same as a click, and returns `true`. It returns `false`, and changes nothing, when no option has the value. It works before the list is built |
| `NDS.CustomSelect.clear(el)` | Empties the text box and the value, removes the `selected` state, and returns `true` |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:customselect:change` | `.nds-form-control`. It does not bubble | `{ value, text }`: the picked option's `data-value` and label. Empty strings after `clear()`. It fires at each pick, `setValue()` and `clear()` |
| `input`, `change` | `.nds-select-input` and `.nds-select-value`, and they bubble | Native events, with no detail. They fire with `nds:customselect:change` |
| `nds:dropmenu:opened`, `nds:dropmenu:closed` | `.nds-form-control`, and they bubble | The list opened or closed. See [Dropmenu](../components/dropmenu) |
{: .nds-table .nds-responsive}

<script type="text/html" id="custom-select-js" data-canon data-lang="js">
var field = document.querySelector('#custom-select-region').closest('.nds-form-control');

// Log each pick
field.addEventListener('nds:customselect:change', function (e) {
  console.log(e.detail.value, e.detail.text);
});

// Show a saved value
NDS.CustomSelect.setValue(field, 'makkah');
</script>

The full API is in the banner of `_js/nds-customselect.js`.

</div>
  </div>
</section>
