---
layout: page
title: Text Fields
hero_title: Text Fields - National Design System
hero_description: Form fields the user types in, with the label, messages and submit validation that every NDS field shares
breadcrumb: [["Components", "/components/?shelf=Components"]]
since: "1.0.0"
updated: "1.12.x"
last_edit: "28/10/2026 - 10:08 PM"
lang: en
direction: ltr
---

<section id="forms-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A text field is a `.nds-form-container` with three parts: a header with the label, a control box with the input, and an action slot for buttons such as Clear. The same container holds an email, password, search, number, textarea or native select field. This page also covers what every NDS field shares: the required mark, the disabled and readonly states, the messages under the field, and submit validation.

Pick another component when:

- the user types a phone number, a national ID or an IBAN: [Formatted Input](../components/formatted-input)
- the user picks one option from a list: [Custom Select](../components/custom-select)
- the user picks a date or a time: [Date Picker](../components/date-picker), [Time Picker](../components/time-picker)
- the user types and picks from suggestions: [Autocomplete](../components/autocomplete)
- the user picks a new password: [Password](../components/password)
- the user types a one-time code: [OTP Input](../components/otp)
- the user adds several values as tags: [Tag Input](../components/taginput)
- the user turns a setting on or off, or picks from a few options: [Switch](../components/switch), [Checkbox](../components/checkbox), [Radio](../components/radio)

</div>
  </div>
</section>

<section id="forms-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="field-text" data-canon data-variants="forms-variants-table" data-harness="form" data-demo-width="320px">
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="full-name">
      <span class="nds-label">Full name</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="text" id="full-name" name="full-name" class="nds-input" placeholder="Enter your full name" autocomplete="name">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="field-email" data-canon>
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="email-address">
      <span class="nds-label">Email address</span>
    </label>
  </div>
  <div class="nds-form-control">
    <i class="nds-icon nds-hgi-mail-01" aria-hidden="true"></i>
    <input type="email" id="email-address" name="email" class="nds-input" placeholder="name@example.com" autocomplete="email">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear email" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="field-password" data-canon>
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="current-password">
      <span class="nds-label">Password</span>
    </label>
  </div>
  <div class="nds-form-control">
    <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
    <input type="password" id="current-password" name="password" class="nds-input" placeholder="Enter your password" autocomplete="current-password">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear password" data-i18n-aria-label="password.clear_password" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
      <button class="nds-btn nds-subtle nds-toggle-password nds-icon-only" type="button" aria-label="Show password" data-i18n-aria-label="form.show_password">
        <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="field-search" data-canon>
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="search-services">
      <span class="nds-label">Search services</span>
    </label>
  </div>
  <div class="nds-form-control">
    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
    <input type="text" id="search-services" name="search" class="nds-search-input" placeholder="Search services">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear search" data-i18n-aria-label="form.clear_search" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
      <button class="nds-btn nds-subtle nds-voice-input nds-icon-only" type="button" aria-label="Voice input" data-i18n-aria-label="voice-input.voice_input">
        <i class="nds-icon nds-hgi-mic-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="field-number" data-canon>
<div class="nds-form-container" style="--form-width: 160px">
  <div class="nds-form-header">
    <label for="quantity">
      <span class="nds-label">Quantity</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="text" id="quantity" name="quantity" class="nds-input" inputmode="numeric" value="1" min="1" max="20" step="1">
  </div>
</div>
</script>
<script type="text/html" id="field-number-decrement" data-canon>
<div class="nds-form-action nds-prefix">
  <button class="nds-btn nds-subtle nds-number-decrement nds-icon-only" type="button" aria-label="Decrease value" data-i18n-aria-label="form.decrease_value">
    <i class="nds-icon nds-hgi-minus-sign" aria-hidden="true"></i>
  </button>
</div>
</script>
<script type="text/html" id="field-number-increment" data-canon>
<div class="nds-form-action nds-suffix">
  <button class="nds-btn nds-subtle nds-number-increment nds-icon-only" type="button" aria-label="Increase value" data-i18n-aria-label="form.increase_value">
    <i class="nds-icon nds-hgi-plus-sign" aria-hidden="true"></i>
  </button>
</div>
</script>
<script type="text/html" id="field-textarea" data-canon>
<div class="nds-form-container nds-textarea">
  <div class="nds-form-header">
    <label for="message">
      <span class="nds-label">Message</span>
    </label>
  </div>
  <div class="nds-form-control">
    <textarea id="message" name="message" class="nds-textarea" placeholder="Write your message" rows="4"></textarea>
  </div>
</div>
</script>
<script type="text/html" id="field-select" data-canon>
<div class="nds-form-container nds-select">
  <div class="nds-form-header">
    <label for="region">
      <span class="nds-label">Region</span>
    </label>
  </div>
  <div class="nds-form-control">
    <select id="region" name="region" class="nds-input">
      <option value="" disabled selected>Choose a region</option>
      <option value="riyadh">Riyadh</option>
      <option value="makkah">Makkah</option>
      <option value="eastern">Eastern Province</option>
      <option value="asir">Asir</option>
    </select>
  </div>
</div>
</script>
<script type="text/html" id="field-prefix" data-canon>
<div class="nds-form-action nds-prefix">
  <span class="nds-btn nds-subtle"><span class="nds-label">Prefix</span></span>
</div>
</script>
<script type="text/html" id="field-suffix" data-canon>
<div class="nds-form-action nds-suffix">
  <span class="nds-btn nds-subtle"><span class="nds-label">Suffix</span></span>
</div>
</script>
<script type="text/html" id="field-info" data-canon>
<span class="nds-info">More details about what to enter here</span>
</script>
<script type="text/html" id="field-help" data-canon>
<span class="nds-tooltip" data-tooltip-title="Full name" data-tooltip-message="Write it as it shows on your national ID."></span>
</script>
<script type="text/html" id="field-hint" data-canon>
<div class="nds-form-footer" data-feedback-target>
  <span class="nds-feedback nds-outline nds-sm" data-status="neutral" data-permanent>
    <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
    <span class="nds-feedback-message">A hint that stays under the field</span>
  </span>
</div>
</script>
    </div>
  </div>
</section>

<section id="forms-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Each Structure is one field type. Options stack: a field can be MD, Lighter and Required at once. Prefix goes first in `.nds-form-control`, and Suffix goes right after the input. They fit a plain text, email, password or search field. Number takes none: its Buttons option fills both sides. A textarea or a select takes none either. Number starts with Buttons and Solid MD affixes, so write `nds-secondary nds-md` on its buttons.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Text (default) | — | — | A single line of text, such as a name |
| Structure | Email | canon `#field-email` | — | An email address. `type="email"` checks the format at submit |
| Structure | Password | canon `#field-password` | — | A password the user already has, on a sign-in form. For a new password, use [Password](../components/password) |
| Structure | Search | canon `#field-search` | — | A search box with a voice button. See [Voice Input](../components/voice-input) |
| Structure | Number (id: number-input) (demo: + number-buttons) (demo: + affix-solid) (demo: + affix-md) | canon `#field-number` | — | A whole number between `min` and `max`. Add Buttons for minus and plus buttons |
| Structure | Textarea (id: textarea) | canon `#field-textarea` | — | Several lines of text, such as a message |
| Structure | Select (id: select) (hint: The browser's own list) | canon `#field-select` | — | A native `<select>`, for the phone's own picker. For a choice in a form, use [Custom Select](../components/custom-select) |
| Size | LG (default) | — | — | 40px high. It needs no class |
| Size | MD | `.nds-md` | `.nds-form-container` | 32px high, with smaller text, for a table filter or a side panel |
| Style | Outline (default) | — | — | A border on the page background |
| Style | Lighter (hint: Light fill and no border) | `.nds-lighter` | `.nds-form-container` | A light fill and no border, for a field on a white card |
| Style | Darker (hint: Darker fill and no border) | `.nds-darker` | `.nds-form-container` | A darker fill and no border, for a field on a gray surface |
| Buttons | Buttons (id: number-buttons) (hint: Minus and plus buttons) | canon `#field-number-decrement` | `.nds-form-control:has(> [min])` (start) | Minus and plus buttons that step the value. Only on Number. Write all three changes |
| Buttons | Buttons (id: number-buttons) (hint: Minus and plus buttons) | canon `#field-number-increment` | `input[min]` (after) | The plus button goes right after the input |
| Buttons | Buttons (id: number-buttons) (hint: Minus and plus buttons) | `.nds-center` | `input[min]` | The value sits in the middle, between the buttons |
| Affix (any) | Prefix (not: textarea, select, number-input) | canon `#field-prefix` | `.nds-form-control` (start) | Fixed text before the value, such as a currency or `https://` |
| Affix (any) | Suffix (not: textarea, select, number-input) | canon `#field-suffix` | `input` (after) | Fixed text after the value, such as a unit or a domain |
| Affix style | Subtle (default) | `.nds-subtle` | `:is(.nds-prefix, .nds-suffix) > .nds-btn` | The prefix and suffix on the field's own background: text and the number buttons |
| Affix style | Solid (id: affix-solid) (hint: Light fill behind the prefix or suffix) | `.nds-secondary` | `:is(.nds-prefix, .nds-suffix) > .nds-btn` | The prefix and suffix on a light fill, set apart from the value |
| Affix size | LG (default) | — | `:is(.nds-prefix, .nds-suffix) > .nds-btn` | The affix button's default padding. It needs no class |
| Affix size | MD (id: affix-md) | `.nds-md` | `:is(.nds-prefix, .nds-suffix) > .nds-btn` | Smaller prefix and suffix buttons, with smaller text |
| State | None (default) | — | — | The user can type |
| State | Disabled | `[data-state~="disabled"]` | `.nds-form-container` | The field is dimmed and does not take focus. A disabled value does not submit |
| State | Readonly | `[data-state~="readonly"]` | `.nds-form-container:not(.nds-select)` | The value shows and submits, and the user cannot change it. Not on a select: the browser ignores `readonly` there |
| State | Loading | `[data-state~="loading"]` | `.nds-form-container:not(.nds-select)` | A spinner in place of the action buttons, while a script checks the value. Set it with `NDS.state.add()` and remove it when the check ends |
| Required | Required (id: required) | `[data-required]` | `.nds-form-container` | A red asterisk before the label. An empty field blocks the submit |
| Info | Info (hint: Help text under the label) | canon `#field-info` | `label` | A line of help text under the label |
| Help | Help (hint: A help icon beside the label) | canon `#field-help` | `.nds-form-header` | A [Tooltip](../components/tooltip) after the label, for optional help. It goes in the header, never in the `label`. Text the user needs to fill the field goes in Info |
| Hint | Hint (hint: A message that stays under the field) | canon `#field-hint` | `.nds-form-container` | A hint under the field that stays. A validation message takes its place while it shows |
{: #forms-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="forms-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Field States
{: .nds-block-title #field-states}

Every NDS field uses these states, and the other field pages link here for them. `data-required` on the container adds the red asterisk, and the forms script adds `required` to the input. `data-state="disabled"` or `data-state="readonly"` on the container sets the same property on every input inside it. The script also works the other way: an input that is disabled, readonly or required in the HTML puts its state on the container.

### Submit Validation
{: .nds-block-title}

A `<form class="nds-form">` checks every field when the user submits it. A hidden or disabled field is skipped. A field that fails shows its message under it, the first in page order takes focus, and the submit stops. The API lists each check and its message. A message clears as soon as the user edits the field. A required field whose component has not started yet, such as a Rating or an Upload, fails with "Still loading. Try again in a moment": see [Fields Still Loading](../core/init#fields-still-loading). Add `data-ajax` to stop the page from reloading after a passing submit, and send the request from `nds:form:valid`.

<script type="text/html" id="forms-submit" data-canon data-form data-preview="none">
<form class="nds-form" data-ajax>
  <div class="nds-flex nds-col">
    <div class="nds-form-container" data-required>
      <div class="nds-form-header">
        <label for="applicant-name">
          <span class="nds-label">Full name</span>
        </label>
      </div>
      <div class="nds-form-control">
        <input type="text" id="applicant-name" name="name" class="nds-input" autocomplete="name">
      </div>
    </div>
    <div class="nds-form-container" data-required>
      <div class="nds-form-header">
        <label for="applicant-email">
          <span class="nds-label">Email address</span>
        </label>
      </div>
      <div class="nds-form-control">
        <input type="email" id="applicant-email" name="email" class="nds-input" autocomplete="email">
      </div>
    </div>
  </div>
  <div class="nds-form-actions">
    <button type="button" class="nds-btn nds-secondary-outline">
      <span class="nds-label">Back</span>
    </button>
    <button type="submit" class="nds-btn nds-primary">
      <span class="nds-label">Submit</span>
    </button>
  </div>
</form>
</script>

A sent form takes no second submit, so a double click sends it once. Its submit button shows the spinner while the form waits:

- A form with `method="post"` that loads the next page in the same tab waits until that page opens. Add `data-no-pending` to a POST form whose answer is a download, or no page: the button would spin until the page reloads.
- A `data-ajax` form waits only when the `nds:form:valid` listener passes its request to `event.detail.waitUntil()`. The form takes submits again when the request ends, whether it passed or failed. Call `waitUntil()` in the listener itself, not after an `await`.

`.nds-form` draws no box: give the fields a gapped wrapper such as `nds-flex nds-col`. On an element that is not a `<form>`, `.nds-form` checks nothing. Call `NDS.Form.validate(step)` from your own button there, where `step` is that `.nds-form` element, and read `valid` in the result.

### Status Messages
{: .nds-block-title}

`NDS.Form.setStatus()` shows a message under a field, such as an error the server returns. A field shows `error` or `help`. `help` is a hint in the neutral color with a "?" icon, not a validation result. Any other status shows the message in the neutral color, with no red outline. `setStatus()` never moves focus, so focus the first field with an error yourself. Focus also scrolls the field into view.

<script type="text/html" id="forms-status-js" data-canon data-lang="js" data-preview="none">
// Errors the server returned, in field order
var errors = [
  { field: 'national-id-field', message: 'This ID is not registered' },
  { field: 'email-field', message: 'Enter a valid email address' }
];
var first = null;

errors.forEach(function (error) {
  var field = document.getElementById(error.field);
  if (!field) return;
  NDS.Form.setStatus(field, 'error', { message: error.message });
  if (!first) first = field;
});

// A group cannot take focus: focus the first input inside it
if (first) (first.querySelector('input, textarea, select') || first).focus();
</script>

### Permanent Feedback
{: .nds-block-title}

A `.nds-feedback` with `data-permanent` stays under the field as a hint. A validation message hides it, and it comes back when the message clears. It sits in an element with `data-feedback-target`: every message for the field goes there. A `.nds-form-footer` puts the messages under the input, and the `.nds-form-header` puts them above it. Without a feedback target, a message goes right after the field's input row, above anything else the field holds.

### Loading
{: .nds-block-title}

`data-state="loading"` on a field shows a spinner button and hides the other action buttons, a suffix included. Use it while a script checks the value, such as a username lookup. The forms script adds the spinner to the field's last action slot: on Number with Buttons, that is the suffix. A prefix never changes. When loading ends, the buttons come back, and Clear shows only if the field still has a value.

<script type="text/html" id="forms-loading-js" data-canon data-lang="js" data-preview="none">
var field = document.getElementById('username-field');

async function checkUsername(name) {
  NDS.state.add(field, 'loading');
  try {
    var { data } = await NDS.request('/api/username?name=' + encodeURIComponent(name), { json: true });
    NDS.Form.setStatus(field, data.available ? 'neutral' : 'error', {
      message: data.available ? 'This username is free' : 'This username is taken'
    });
  } finally {
    NDS.state.remove(field, 'loading');
  }
}
</script>

### Number Stepper
{: .nds-block-title #number-stepper}

A text field with `min` or `max` on its input takes a whole number in that range. A value typed outside the range is set to the nearest limit when the field loses focus, and the form does not send one. Without `min` and `max`, the value has no limit. A blank `min` or `max` counts as missing.

The Buttons option adds minus and plus buttons that change the value by `step`, 1 by default. Hold a button to repeat the step, and hold it about two seconds to step ten at a time. A button at `min` or `max` shows a message instead of a change.

### Password
{: .nds-block-title}

The eye button switches the field between hidden and plain text, and its label between "Show password" and "Hide password". The script hides the password again when the form is sent, by AJAX too, or reset. A form that fails validation keeps it shown. A password field does not accept Arabic letters: the script removes one as it is typed and shows an error.

</div>
  </div>
</section>

<section id="forms-features" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every field on the page starts when the page loads, and a field added later starts on its own. Call <code class="nds-inline-code lang-js">NDS.Form.create()</code> only to start a part of the page at once.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
            <span class="nds-label">Inline Messages</span>
          </span>
          <p class="nds-item-desc">Validation uses the browser's checks but shows no browser popup. The message appears under the field.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-align-left"></i>
            <span class="nds-label">Left-to-Right Values</span>
          </span>
          <p class="nds-item-desc">An e-mail, phone or URL field, and a <a href="../components/formatted-input"><code class="nds-inline-code lang-html">nds-formatted</code></a> field, reads left to right on every page, so a phone number keeps its digit groups in order on an Arabic page. The value stays on the page side, as in the other fields.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-puzzle"></i>
            <span class="nds-label">Custom Checks</span>
          </span>
          <p class="nds-item-desc">Call <code class="nds-inline-code lang-js">input.setCustomValidity('message')</code> to fail a field with your own message, and pass an empty string when it passes. Submit validation blocks the form and shows the message. A message of one space outlines the field with no text.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-02"></i>
            <span class="nds-label">Interaction States</span>
          </span>
          <p class="nds-item-desc">The script writes <code class="nds-inline-code lang-html">focus</code>, <code class="nds-inline-code lang-html">active</code> and <code class="nds-inline-code lang-html">typing</code> to the container's <code class="nds-inline-code lang-html">data-state</code>. A line grows under the field on focus.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cancel-circle"></i>
            <span class="nds-label">Clear Button</span>
          </span>
          <p class="nds-item-desc">The <code class="nds-inline-code lang-html">nds-clear</code> button shows only while the field has a value. It empties the field, shows no "required" error, and puts focus back in the field.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-access"></i>
            <span class="nds-label">Screen Reader Errors</span>
          </span>
          <p class="nds-item-desc">The script sets <code class="nds-inline-code lang-html">aria-invalid</code> on a field with an error, and points its <code class="nds-inline-code lang-html">aria-describedby</code> at the message. A required field gets <code class="nds-inline-code lang-html">aria-required="true"</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-view-off-slash"></i>
            <span class="nds-label">Hidden Fields Skipped</span>
          </span>
          <p class="nds-item-desc">Submit validation skips a field that is hidden or inside a hidden parent, and a disabled field. A step of a multi-step form that is out of view does not block the submit.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="forms-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Give every field a `<label>` whose `for` matches the input's `id`. A placeholder is not a label: it disappears when the user types.
- Write `data-required` on the container, not `required` on the input. The container then shows the asterisk before the script loads.
- Add `nds-textarea` to a textarea's container, and `nds-select` to a native select's container. Without them, the textarea keeps the single-line height, and the select shows two arrows.
- Use [Custom Select](../components/custom-select) for a choice in a form. Use the native Select only when the design asks for the phone's own picker.
- Set `data-error-message` on an input with a `pattern`, to say what format it asks for. It shows only when the value does not match the pattern; every other check has its own message.
- Put a unit, a currency or a short code in a prefix or suffix. The slot also takes a button or a [Dropmenu](../components/dropmenu), such as an amount with a currency picker.
- Use MD only where space is short, such as a table filter. Keep one size in one form.
- In a row of fields, put help text in a Hint under the field or a Help tooltip beside the label. An Info line under one label pushes that field's input below its neighbor's. Use Info in a row only when every field in the row has it. A message under the input, such as an error, moves no input. The audit's `form-row-align` check finds a row whose inputs do not line up.
- Put a form's Submit and Back buttons in `.nds-form-actions`, after the fields. The singular `.nds-form-action` is the button slot inside one field.
- Set `input.value` from a script, then call `NDS.Form.refresh(input)`. Setting the value alone does not update the Clear button or the field's state.
- To clear a form, call `form.reset()` or use a reset button. Each NDS field goes back to the value the page shipped with, and its message clears.
- Give an icon-only action button an `aria-label`, such as "Clear input".
- Test each required field type empty, one at a time. A text field, a custom select, a multiselect and a tag input each check their own required state, so one passing proves nothing about the others.

</div>
  </div>
</section>

<section id="forms-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-form` | `<form>` | Turns on submit validation. It draws no box. On another element it is a marker only, and checks nothing |
| `nds-form-actions` | a `<div>` after the fields | The row of form buttons, with a top margin. The margin is 0 when the row is the first child |
| `nds-form-footer` | a `<div>` at the end of `.nds-form-container` | Holds the field's messages when it has `data-feedback-target`. It has no style of its own |
| `nds-required` | `.nds-form-container` or `.nds-form-group` | The same as `data-required` |
| `nds-clear` | a button in `.nds-form-action` | Empties the field. Write it with `hidden`: the script shows it while the field has a value |
| `nds-toggle-password` | a button in `.nds-form-action` | Switches a password field between hidden and plain text. The script adds `show` to it while the text is plain |
| `nds-number-decrement`, `nds-number-increment` | a button in `.nds-form-action` | Steps the value down or up by `step` |
| `nds-form-group` | the `<fieldset>` around a set of checkboxes, radios or switches | See [Checkbox](../components/checkbox), [Radio](../components/radio) and [Switch](../components/switch) |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-ajax` | `form.nds-form` | The script stops the page from reloading after a passing submit. Send the request from `nds:form:valid` |
| `data-no-pending` | `form.nds-form` with `method="post"` | A sent form takes submits again at once, and its button shows no spinner. For a form whose answer is a download or no page |
| `novalidate` | `form.nds-form` | The script sets it at start, so the browser shows no popups |
| `data-required` | `.nds-form-container` | Marks the field required. The script adds `required` and `aria-required="true"` to the input at start. It also sets or removes this attribute when the input's `required` changes, at the next edit or `NDS.Form.refresh()` call |
| `data-state` | `.nds-form-container` | Write `disabled` or `readonly`, or call `setState()`: the script sets that property on every input inside. `disabled` also disables the action buttons. The script writes them too when an input is disabled or readonly. The script sets `focus`, `active` and `typing` while the user is on the field, and removes them on blur and release. It sets `open` while a native select's list is open |
| `data-state="loading"` | `.nds-form-container` or `.nds-form-group` | Shows the spinner in place of the action buttons. The `nds-loading` class does the same. Write either in the HTML or from a script (`NDS.state.add()`, the attribute, `classList`), and remove it the same way. Put it on the container, not on `.nds-form-control` or the input |
| `data-status` | `.nds-form-container` | The script sets it with each message: `error`, `help` or `neutral`. Only `error` draws the red outline. `clearStatus()` and any edit to the field remove it |
| `data-message` | `.nds-form-container` | The script writes the current message text with `data-status`. `getStatus()` reads it, and `clearStatus()` removes it |
| `data-feedback-target` | `.nds-form-container` | A CSS selector for the element inside the field that holds its messages |
| `data-feedback-target` | an element inside `.nds-form-container`, usually `.nds-form-footer` | Messages go in it, instead of right after the input row. A hidden one shows while a message is in it |
| `hidden` | `.nds-form-container`, `.nds-form-group` or `.nds-form-action` | The script removes it at start. Write it to keep a field out of view until its state is set |
| `data-permanent` | `.nds-feedback` in the feedback target | A message hides it instead of removing it. It comes back when the message clears |
| `data-error-message` | an `<input>` with a `pattern` | The message when the value does not match the pattern. `NDS.init.audit()` flags it on a field with no `pattern` |
| `data-error-message` | `.nds-form-group`, or the container of a field that keeps its value in a hidden input (custom select, multiselect, tag input, upload) | The message when nothing is picked. A count limit, a half-filled code and a file still uploading keep their own messages. `NDS.init.audit()` flags it on a group that may be left empty |
| `inputmode="numeric"` | the `<input>` | The script blocks a typed character that is not a digit. Arabic digits go in as `0` to `9` |
| `min`, `max` | a text `<input>` | The range of a whole number. The script sets a value outside it to the nearest limit on blur, and blocks the submit |
| `step` | the input of a number field | The step of the minus and plus buttons |
| `autofocus` | the `<input>`, `<textarea>` or `<select>` | The script focuses the field again at start, without a scroll |
| `data-loading-slot` | a button in `.nds-form-action` | The button that shows the spinner while the field loads. Without one, the script adds one |
| `data-target` | `.nds-auto-fill` | The `id` or `name` of the input that a suggestion chip fills. A click on an `.nds-item` writes its text in the input. See [Filter](../components/filter) |
| `data-autofill-apply` | `.nds-auto-fill` | A chip click also sends Enter to the input, so the search runs |
{: .nds-table .nds-responsive}

### Validation Messages
{: .nds-block-title}

The checks are the browser's own: write these standard attributes on the input. The forms script shows the message in Arabic or English to match the page.

| Check | Message |
|---|---|
| `required` | This field is required |
| `type="email"` | Please enter a valid email address |
| `type="url"` | Please enter a valid URL |
| `minlength` | Input is too short (minimum N characters) |
| `maxlength` | Input is too long (maximum N characters). The browser stops the user at the limit, so this message rarely shows |
| `pattern` | Please use the correct format. The value must match the whole expression: `pattern="[0-9]{10}"` takes exactly ten digits. The message does not name the format, so add `data-error-message` |
| `min`, `max` | Value must be at least N, or Value must be no more than N |
| any other failure | Invalid input. A component that checks its own field, such as Date Picker or [Formatted Input](../components/formatted-input), shows its own message |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--form-width` | `100%` | The width of `.nds-form-container`. Set it on the container |
| `--input-size` | `40px` | The height of `.nds-form-control`. `nds-md` sets 32px, and this property has no effect there |
| `--input-radius` | `var(--radius-sm)` | The corner radius of `.nds-form-control` and of its prefix and suffix buttons |
| `--actions-margin-top` | `var(--spacing-2xl)` | The space above `.nds-form-actions` |
{: .nds-table .nds-responsive}

### Tokens
{: .nds-block-title}

Set a token at `:root`, or on a wrapper to reach every field inside it. Give a token with a Dark mode value a dark override too: see [Tokens](../foundations/tokens).

Source: the `forms` group in `_sass/tokens/_components.scss`.

{{ site.data.tokens.components.forms.html }}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Form.init()` | Starts every field and form on the page. It runs at page load |
| `NDS.Form.create(el)` | Starts every field and form inside `el`, and `el` itself. A `<form class="nds-form">` gets submit validation |
| `NDS.Form.setStatus(el, status, options)` | Shows a message under the field that holds `el`. `status` is `error`, `help` or any other value, which shows as `neutral`; an empty value clears the field. Options below. Returns `false` when `el` is not in a field |
| `NDS.Form.clearStatus(el)` | Removes the field's message and status. A permanent message comes back |
| `NDS.Form.getStatus(el)` | Returns `{ status, message, isValid }`. `isValid` is `false` only for `error` |
| `NDS.Form.setState(el, name, add)` | Adds or removes (`add: false`) a state on the field. `'required'` sets `data-required` and the inputs' `required` |
| `NDS.Form.refresh(el)` | Updates the field after a script sets its value or `checked`: an input updates its field, any other element every field inside it. It fires no event, except a phone field's `nds:phone:change`: see [Formatted Input](../components/formatted-input) |
| `NDS.Form.validate(el, options)` | Checks every visible field in the form that holds `el`, and returns `{ valid, invalidFields, errors }`, in page order. `options` is `{ showMessages, focusFirst }`, both `true` by default. Pass both: an object with one key turns the other off |
| `NDS.Form.validateField(el, check, options)` | Checks one field by its component's rule and returns its result, or `null` when no rule answers for `el`. Each component's `validate(el)` calls it: `NDS.Checkbox.validate(group)`, `NDS.Radio.validate(group)`, `NDS.Otp.validate(group)`, `NDS.Multiselect.validate(el)`, `NDS.Taginput.validate(el)` and the others. A field that shows a message is checked again on each change |
{: .nds-table .nds-responsive}

| Option | Default | Effect |
|---|---|---|
| `message` | — | The text. An empty string removes the message and keeps the status |
| `permanent` | `false` | The message stays as a hint, as `data-permanent` does |
| `size`, `style`, `position` | `sm`, `outline`, `append` | Passed to `NDS.Feedback.create()`. See [Feedback](../components/feedback) |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:form:status` | the field's container, and it bubbles | `{ status, message }`. Both are `null` after `clearStatus()` |
| `nds:form:validate` | the form, and it bubbles | `{ valid, invalidFields, errors }`, after every `validate()`. Each error is `{ field, input, message }` |
| `nds:form:valid` | the form, and it bubbles | `{ waitUntil(promise) }`, when a submit passes. `waitUntil()` keeps the form from a second submit until the promise ends, and the submit button shows the spinner |
| `nds:form:invalid` | the form, and it bubbles | `{ invalidFields, errors }`, when a submit is blocked |
| `nds:switch:change` | `.nds-switch-toggle`, and it bubbles | `{ checked, value, input }`. See [Switch](../components/switch) |
| `nds:checkbox:indeterminate` | the checkbox, and it bubbles | `{ indeterminate }`. See [Checkbox](../components/checkbox) |
{: .nds-table .nds-responsive}

<script type="text/html" id="forms-js" data-canon data-lang="js">
var form = document.querySelector('#apply-form');

// Send the request once every field passes (the form has data-ajax).
// waitUntil blocks a second submit until the request ends.
form.addEventListener('nds:form:valid', function (e) {
  e.detail.waitUntil(NDS.request(form.action, { method: 'POST', body: new FormData(form) }));
});

// Fill a field from a script
var email = document.querySelector('#applicant-email');
email.value = 'name@example.com';
NDS.Form.refresh(email);

// Mark a field required after load
NDS.Form.setState(email, 'required', true);
</script>

The full API is in the banner of `_js/nds-form.js`.

</div>
  </div>
</section>

<section id="forms-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Form Template](../templates/form-template): a full application form, with a phone field and submit validation.
- [Contact Us Template](../templates/contact-us-template): a contact form with a phone field and a textarea.
- [Create your account](../examples/registration): a sign-up form with email and password fields.
- [Sign in](../examples/sign-in): a sign-in form with a password field.

</div>
  </div>
</section>
