---
layout: page
title: Text Fields
hero_title: Text Fields - National Design System
hero_description: Form fields the user types in, with the label, messages and submit validation that every NDS field shares
breadcrumb: [["Components", "/components"]]
since: "1.0.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
lang: en
direction: ltr
---

<section id="forms-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A text field is a `.nds-form-container` with three parts: a header with the label, a control box with the input, and an action slot for buttons such as Clear. The same container holds an email, password, search, number, phone, textarea or native select field. This page also covers what every NDS field shares: the required mark, the disabled and readonly states, the messages under the field, and submit validation.

Pick another component when:

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
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
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
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear email" hidden>
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
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear password" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
      <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
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
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear search" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
      <button class="nds-btn nds-subtle nds-voice-input" type="button" aria-label="Voice input">
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
    <div class="nds-form-action nds-prefix">
      <button class="nds-btn nds-subtle nds-number-decrement" type="button" aria-label="Decrease value">
        <i class="nds-icon nds-hgi-minus-sign" aria-hidden="true"></i>
      </button>
    </div>
    <input type="text" id="quantity" name="quantity" class="nds-input nds-center" inputmode="numeric" value="1" min="1" max="20" step="1">
    <div class="nds-form-action nds-suffix">
      <button class="nds-btn nds-subtle nds-number-increment" type="button" aria-label="Increase value">
        <i class="nds-icon nds-hgi-plus-sign" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="field-phone" data-canon>
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="mobile">
      <span class="nds-label">Mobile number</span>
    </label>
  </div>
  <div class="nds-form-control">
    <div class="nds-form-action nds-prefix">
      <span class="nds-btn nds-subtle"><span class="nds-label">+966</span></span>
    </div>
    <input type="tel" id="mobile" name="mobile" class="nds-input nds-phone" placeholder="5XX XXX XXX" autocomplete="tel-national" inputmode="numeric" maxlength="9">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="field-phone-country" data-canon>
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="phone">
      <span class="nds-label">Phone</span>
    </label>
  </div>
  <div class="nds-form-control">
    <div class="nds-form-action nds-prefix nds-dropmenu" data-select-name="country-code" data-select-value="+966">
      <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger">
        <span class="nds-label">+966</span>
      </button>
      <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
          <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+966" data-trigger-label="+966">
            <span class="nds-label">Saudi Arabia (+966)</span>
          </button>
          <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+971" data-trigger-label="+971">
            <span class="nds-label">United Arab Emirates (+971)</span>
          </button>
          <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+973" data-trigger-label="+973">
            <span class="nds-label">Bahrain (+973)</span>
          </button>
          <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+974" data-trigger-label="+974">
            <span class="nds-label">Qatar (+974)</span>
          </button>
          <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+965" data-trigger-label="+965">
            <span class="nds-label">Kuwait (+965)</span>
          </button>
          <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+968" data-trigger-label="+968">
            <span class="nds-label">Oman (+968)</span>
          </button>
        </div>
      </div>
    </div>
    <input type="tel" id="phone" name="phone" class="nds-input nds-phone" placeholder="00 000 0000" autocomplete="tel-national" inputmode="numeric">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="field-national-id" data-canon>
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="national-id">
      <span class="nds-label">National ID or Iqama number</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="text" id="national-id" name="national-id" class="nds-input nds-national-id" placeholder="1XXXXXXXXX" inputmode="numeric" maxlength="10" autocomplete="off">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="field-iban" data-canon>
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="iban">
      <span class="nds-label">IBAN</span>
    </label>
  </div>
  <div class="nds-form-control">
    <input type="text" id="iban" name="iban" class="nds-input nds-iban" placeholder="SA0000000000000000000000" maxlength="34" autocomplete="off" spellcheck="false">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
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

Each Structure is one field type. Options stack: a field can be MD, Lighter and Required at once. Prefix goes first in `.nds-form-control`, and Suffix goes right after the input. They fit a plain text, email, password or search field. Number and Phone carry their own affixes, and a textarea or a select takes none. Number starts with Solid and MD affixes, so write `nds-secondary nds-md` on its buttons. Phone starts with Solid, so write `nds-secondary` on its `+966`.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Text (default) | — | — | A single line of text, such as a name |
| Structure | Email | canon `#field-email` | — | An email address. `type="email"` checks the format at submit |
| Structure | Password | canon `#field-password` | — | A password the user already has, on a sign-in form. For a new password, use [Password](../components/password) |
| Structure | Search | canon `#field-search` | — | A search box with a voice button. See [Voice Input](../components/voice-input) |
| Structure | Number (id: number) (demo: + affix-solid) (demo: + affix-md) | canon `#field-number` | — | A whole number with minus and plus buttons, between `min` and `max` |
| Structure | Phone (id: phone) (demo: + affix-solid) | canon `#field-phone` | — | A Saudi mobile number after a fixed `+966` |
| Structure | Phone with country (id: phone-country) | canon `#field-phone-country` | — | A phone number after a country-code picker. The picker is a [Dropmenu](../components/dropmenu) with `data-select-name` |
| Structure | National ID (id: national-id) (demo: + required) | canon `#field-national-id` | — | A Saudi national ID or iqama number. `.nds-national-id` keeps digits only, and checks the 10 digits and the check digit |
| Structure | IBAN (id: iban) (demo: + required) | canon `#field-iban` | — | A bank account IBAN. `.nds-iban` removes spaces, writes capitals, adds a missing `SA`, and checks the country, the length and the check digits |
| Structure | Textarea (id: textarea) | canon `#field-textarea` | — | Several lines of text, such as a message |
| Structure | Select (id: select) (hint: The browser's own list) | canon `#field-select` | — | A native `<select>`, for the phone's own picker. For a choice in a form, use [Custom Select](../components/custom-select) |
| Size | LG (default) | — | — | 40px high. It needs no class |
| Size | MD | `.nds-md` | `.nds-form-container` | 32px high, with smaller text, for a table filter or a side panel |
| Style | Outline (default) | — | — | A border on the page background |
| Style | Lighter (hint: Light fill and no border) | `.nds-lighter` | `.nds-form-container` | A light fill and no border, for a field on a white card |
| Style | Darker (hint: Darker fill and no border) | `.nds-darker` | `.nds-form-container` | A darker fill and no border, for a field on a gray surface |
| Affix (any) | Prefix (not: textarea, select, number, phone, phone-country) | canon `#field-prefix` | `.nds-form-control` (start) | Fixed text before the value, such as a currency or `https://` |
| Affix (any) | Suffix (not: textarea, select, number, phone, phone-country) | canon `#field-suffix` | `input` (after) | Fixed text after the value, such as a unit or a domain |
| Affix style | Subtle (default) | `.nds-subtle` | `:is(.nds-prefix, .nds-suffix) > .nds-btn` | The prefix and suffix on the field's own background: text, the number buttons and the country picker |
| Affix style | Solid (id: affix-solid) (hint: Light fill behind the prefix or suffix) | `.nds-secondary` | `:is(.nds-prefix, .nds-suffix) > .nds-btn` | The prefix and suffix on a light fill, set apart from the value |
| Affix size | LG (default) | — | `:is(.nds-prefix, .nds-suffix) > .nds-btn` | The affix button's default padding. It needs no class |
| Affix size | MD (id: affix-md) | `.nds-md` | `:is(.nds-prefix, .nds-suffix) > .nds-btn` | Smaller prefix and suffix buttons, with smaller text |
| State | None (default) | — | — | The user can type |
| State | Disabled | `[data-state~="disabled"]` | `.nds-form-container` | The field is dimmed and does not take focus. A disabled value does not submit |
| State | Readonly | `[data-state~="readonly"]` | `.nds-form-container:not(.nds-select)` | The value shows and submits, and the user cannot change it. Not on a select: the browser ignores `readonly` there |
| State | Loading | `[data-state~="loading"]` | `.nds-form-container:not(.nds-select)` | A spinner in place of the action buttons, while a script checks the value. Set it with `NDS.State.add()` and remove it when the check ends |
| Required | Required (id: required) | `[data-required]` | `.nds-form-container` | A red asterisk before the label. An empty field blocks the submit |
| Info | Info (hint: Help text under the label) | canon `#field-info` | `label` | A line of help text under the label |
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

A `<form class="nds-form">` checks every visible field when the user submits it. A field that fails shows its message under it, the first one takes focus, and the submit stops. The API lists each check and its message. A message clears as soon as the user edits the field. Add `data-ajax` to stop the page from reloading after a passing submit, and send the request from `nds:formValid`.

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

`.nds-form` draws no box: give the fields a gapped wrapper such as `nds-flex nds-col`. On an element that is not a `<form>`, `.nds-form` checks nothing. Call `NDS.Forms.validateForm(step)` from your own button there, where `step` is that `.nds-form` element, and read `valid` in the result.

### Status Messages
{: .nds-block-title}

`NDS.Forms.setStatus()` shows a message under a field, such as an error the server returns. A field shows `error` or `help`. `help` is a hint in the neutral color with a "?" icon, not a validation result. Any other status shows the message in the neutral color, with no red outline. `setStatus()` never moves focus, so focus the first field with an error yourself. Focus also scrolls the field into view.

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
  NDS.Forms.setStatus({ element: field, status: 'error', message: error.message });
  if (!first) first = field;
});

// A group cannot take focus: focus the first input inside it
if (first) (first.querySelector('input, textarea, select') || first).focus();
</script>

### Permanent Feedback
{: .nds-block-title}

A `.nds-feedback` with `data-permanent` stays under the field as a hint. A validation message hides it, and it comes back when the message clears. It sits in an element with `data-feedback-target`: every message for the field goes there. A `.nds-form-footer` puts the messages under the input, and the `.nds-form-header` puts them above it. Without a feedback target, messages go at the end of the container.

### Loading
{: .nds-block-title}

`data-state="loading"` on a field shows a spinner button and hides the other action buttons, a suffix included. Use it while a script checks the value, such as a username lookup. The forms script adds the spinner to the field's last action slot: on Number, that is the suffix. A prefix never changes. When loading ends, the buttons come back, and Clear shows only if the field still has a value.

<script type="text/html" id="forms-loading-js" data-canon data-lang="js" data-preview="none">
var field = document.getElementById('username-field');

async function checkUsername(name) {
  NDS.State.add(field, 'loading');
  try {
    var { data } = await NDS.request('/api/username?name=' + encodeURIComponent(name), { json: true });
    NDS.Forms.setStatus({
      element: field,
      status: data.available ? 'neutral' : 'error',
      message: data.available ? 'This username is free' : 'This username is taken'
    });
  } finally {
    NDS.State.remove(field, 'loading');
  }
}
</script>

### Number Stepper
{: .nds-block-title #number-input}

The minus and plus buttons change the value by `step`, 1 by default. Hold a button to repeat the step, and hold it about two seconds to step ten at a time. A button at `min` or `max` shows a message instead of a change. A value typed outside the range is set to the nearest limit when the field loses focus. Without `min` and `max`, the value has no limit.

### Phone Number
{: .nds-block-title}

`.nds-phone` on a `type="tel"` input removes every character that is not a digit, and any leading zero, as the user types or pastes. The value then joins the country code with no edit. Limit the length with `maxlength`. A country picker is a [Dropmenu](../components/dropmenu) that writes its code to a hidden input named by `data-select-name`, so the code and the number submit as two fields.

### National ID and IBAN
{: .nds-block-title}

`.nds-national-id` keeps only digits as the user types or pastes, and turns Arabic-Indic digits into Latin ones. The field fails when the value is not a Saudi national ID or iqama number: 10 digits, the first 1 or 2, and a correct check digit. `.nds-iban` removes spaces and other separators and writes the letters as capitals. A value that starts with a digit, as some banking apps copy a Saudi IBAN, gets `SA` in front. The field fails when the value is not an IBAN: two letters for the country, two check digits, then 11 to 30 letters or digits, with a correct check sum. Both checks run at blur and at submit, and an empty field passes unless it is required. The same rules are `NDS.Forms.isNationalId(value)` and `NDS.Forms.isIban(value)`, for a check in your own code.

### Password
{: .nds-block-title}

The eye button switches the field between hidden and plain text, and its label between "Show password" and "Hide password". A password field does not accept Arabic letters: the script removes one as it is typed and shows an error.

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
          <p class="nds-item-desc">Every field on the page starts when the page loads, and a field added later starts on its own. Call <code class="nds-inline-code lang-js">NDS.Forms.initializeContainer()</code> only to start a part of the page at once.</p>
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
- Set `data-error-message` on the input when the default message does not say what is wrong, such as for `pattern`. It replaces every message that field shows.
- Put a unit, a currency or a short code in a prefix or suffix. The slot also takes a button or a [Dropmenu](../components/dropmenu), such as an amount with a currency picker.
- Use MD only where space is short, such as a table filter. Keep one size in one form.
- Put a form's Submit and Back buttons in `.nds-form-actions`, after the fields. The singular `.nds-form-action` is the button slot inside one field.
- Set `input.value` from a script, then call `NDS.Forms.syncState(input)`. Setting the value alone does not update the Clear button or the field's state.
- Do not call `form.reset()`. No NDS field listens for it: clear each field and call `syncState()` on it.
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
| `nds-number-decrement`, `nds-number-increment` | a button in `.nds-form-action` | Steps the value down or up. Also turns on the range check and the blur clamp |
| `nds-phone` | a `type="tel"` input | Removes non-digits and any leading zero as the user types |
| `nds-national-id` | a text input | Keeps digits only, and fails the field when the value is not a Saudi national ID or iqama number. See National ID and IBAN |
| `nds-iban` | a text input | Removes separators, writes capitals, and adds a missing `SA`, and fails the field when the value is not an IBAN |
| `nds-form-group` | the `<fieldset>` around a set of checkboxes, radios or switches | See [Checkbox](../components/checkbox), [Radio](../components/radio) and [Switch](../components/switch) |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-ajax` | `form.nds-form` | The script stops the page from reloading after a passing submit. Send the request from `nds:formValid` |
| `novalidate` | `form.nds-form` | The script sets it at start, so the browser shows no popups |
| `data-required` | `.nds-form-container` | Marks the field required. The script adds `required` and `aria-required="true"` to the input at start. It also sets or removes this attribute when the input's `required` changes, at the next edit or `syncState()` call |
| `data-state` | `.nds-form-container` | Write `disabled` or `readonly`, or call `setState()`: the script sets that property on every input inside. `disabled` also disables the action buttons. The script writes them too when an input is disabled or readonly. The script sets `focus`, `active` and `typing` while the user is on the field, and removes them on blur and release. It sets `open` while a native select's list is open |
| `data-state="loading"` | `.nds-form-container` or `.nds-form-group` | Set it yourself with `NDS.State.add()`, and remove it with `NDS.State.remove()`. Shows the spinner in place of the action buttons. Written in the HTML, it shows the spinner when the script starts |
| `data-status` | `.nds-form-container` | The script sets it with each message: `error`, `help` or `neutral`. Only `error` draws the red outline. `clearStatus()` and any edit to the field remove it |
| `data-message` | `.nds-form-container` | The script writes the current message text with `data-status`. `getStatus()` reads it, and `clearStatus()` removes it |
| `data-feedback-target` | `.nds-form-container` | A CSS selector for the element inside the field that holds its messages |
| `data-feedback-target` | an element inside `.nds-form-container`, usually `.nds-form-footer` | Messages go in it, instead of at the end of the container. A hidden one shows while a message is in it |
| `hidden` | `.nds-form-container`, `.nds-form-group` or `.nds-form-action` | The script removes it at start. Write it to keep a field out of view until its state is set |
| `data-permanent` | `.nds-feedback` in the feedback target | A message hides it instead of removing it. It comes back when the message clears |
| `data-error-message` | the `<input>`, `<textarea>` or `<select>` | Replaces every message the field shows when a check fails |
| `data-error-message` | `.nds-form-group`, or the container of a field that keeps its value in a hidden input (custom select, multiselect, tag input, upload) | The message for that field's own check |
| `inputmode="numeric"` | the `<input>` | The script blocks a typed character that is not a digit |
| `min`, `max`, `step` | the input of a number field | The range and the step of the minus and plus buttons |
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
| `pattern` | Please match the requested format. The value must match the whole expression: `pattern="[0-9]{10}"` takes exactly ten digits. The message does not name the format, so add `data-error-message` |
| `min`, `max` | Value must be at least N, or Value must be no more than N |
| `.nds-national-id` | Invalid national ID number |
| `.nds-iban` | Invalid IBAN |
| any other failure | Invalid input. A component that checks its own field, such as Date Picker, shows its own message |
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

Set a token at `:root`, or on a wrapper to reach every field inside it. Give a token with a Dark mode value a dark override too: see [Tokens](../components/tokens).

Source: the `forms` group in `_sass/tokens/_components.scss`.

{{ site.data.tokens.components.forms.html }}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Forms.init()` | Starts every field and form on the page. It runs at page load |
| `NDS.Forms.initializeContainer(el)` | Starts every field and form inside `el` |
| `NDS.Forms.initForm(form)` | Turns on submit validation for one `<form class="nds-form">` |
| `NDS.Forms.setStatus(options)` | Shows a message under a field. Options below. Returns `false` when the element is not in a field |
| `NDS.Forms.clearStatus(el)` | Removes the field's message and status. A permanent message comes back |
| `NDS.Forms.getStatus(el)` | Returns `{ status, message, isValid }`. `isValid` is `false` only for `error` |
| `NDS.Forms.setState(el, name, add)` | Adds or removes (`add: false`) a state on the field. `'required'` sets `data-required` and the inputs' `required` |
| `NDS.Forms.syncState(input)` | Updates the field after a script sets its value or `checked`. It fires no event |
| `NDS.Forms.validateForm(el, options)` | Checks every visible field in the form that holds `el`, and returns `{ valid, invalidFields, errors }`. `options` is `{ showMessages, focusFirst }`, both `true` by default. Pass both: an object with one key turns the other off |
| `NDS.Forms.validateCheckboxGroup(group)` | Checks a checkbox group's `data-required`, `data-min-checked` and `data-max-checked` |
| `NDS.Forms.validateRadioGroup(group)` | Checks that a required radio group has a choice |
| `NDS.Forms.validateOtpGroup(group)` | Checks that every OTP box has a digit |
| `NDS.Forms.validateMultiselect(el)` | Checks a [Multiselect](../components/multiselect)'s required and count rules |
| `NDS.Forms.validateTaginput(el)` | Checks that a required [Tag Input](../components/taginput) has a tag |
| `NDS.Forms.initCheckboxGroupValidation(group)`, `initRadioGroupValidation(group)`, `initMultiselectValidation(el)` | Checks the group again on each change once it shows a message. `init()` does this for every group |
| `NDS.Forms.setIndeterminate(checkbox, value)` | Sets a checkbox's mixed state. See [Checkbox](../components/checkbox) |
| `NDS.Forms.isNationalId(value)`, `isIban(value)` | Return `true` when the string passes the `.nds-national-id` or `.nds-iban` check. They take the clean value: digits only, or capitals with no spaces |
{: .nds-table .nds-responsive}

| Option | Default | Effect |
|---|---|---|
| `element` | — | The field's container, or any element inside it |
| `status` | — | `error`, `help` or any other value, which shows as `neutral`. An empty value clears the field |
| `message` | — | The text. An empty string removes the message and keeps the status |
| `permanent` | `false` | The message stays as a hint, as `data-permanent` does |
| `size`, `style`, `position` | `sm`, `outline`, `append` | Passed to `NDS.Feedback.create()`. See [Feedback](../components/feedback-icons) |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:statusChange` | the field's container, and it bubbles | `{ status, message }`. Both are `null` after `clearStatus()` |
| `nds:formValidate` | the form, and it bubbles | `{ valid, invalidFields, errors }`, after every `validateForm()`. Each error is `{ field, input, message }` |
| `nds:formValid` | the form, and it bubbles | `{}`, when a submit passes |
| `nds:formInvalid` | the form, and it bubbles | `{ invalidFields, errors }`, when a submit is blocked |
| `nds:switchChange` | `.nds-switch`, and it bubbles | `{ checked, value, input }`. See [Switch](../components/switch) |
| `nds:indeterminateChange` | the checkbox, and it bubbles | `{ indeterminate }`. See [Checkbox](../components/checkbox) |
{: .nds-table .nds-responsive}

<script type="text/html" id="forms-js" data-canon data-lang="js">
var form = document.querySelector('#apply-form');

// Send the request once every field passes (the form has data-ajax)
form.addEventListener('nds:formValid', function () {
  NDS.request(form.action, { method: 'POST', body: new FormData(form) });
});

// Fill a field from a script
var email = document.querySelector('#applicant-email');
email.value = 'name@example.com';
NDS.Forms.syncState(email);

// Mark a field required after load
NDS.Forms.setState(email, 'required', true);
</script>

The full API is in the banner of `_js/nds-forms.js`.

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
