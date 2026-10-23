---
layout: page
title: Formatted Input
hero_title: Formatted Input - National Design System
hero_description: Text fields that keep a phone number, a national ID or an IBAN in its shape as the user types
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "23/10/2026 - 05:49 AM"
---

<section id="formatted-input-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A formatted input is a text field that keeps its value in one shape as the user types or pastes. `.nds-phone` takes a phone number, `.nds-national-id` a national ID (a Saudi ID or iqama number, unless the page sets another country), and `.nds-iban` a bank account IBAN. The class goes on the input of a [text field](../components/form): the label, the messages and submit validation work as on every field.

Pick another component when:

- the value has no fixed shape, such as a name or an email address: [Text Fields](../components/form)
- the user types a one-time code: [OTP Input](../components/otp)
- the user picks a date or a time: [Date Picker](../components/date-picker), [Time Picker](../components/time-picker)

</div>
  </div>
</section>

<section id="formatted-input-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="field-phone" data-canon data-variants="formatted-input-variants-table" data-harness="form" data-demo-width="320px">
<div class="nds-form-container" data-format="00 000 0000">
  <div class="nds-form-header">
    <label for="phone">
      <span class="nds-label">Mobile number</span>
    </label>
  </div>
  <div class="nds-form-control">
    <div class="nds-form-action nds-prefix">
      <span class="nds-btn nds-subtle"><span class="nds-label">+966</span></span>
      <input type="hidden" name="country-code" value="+966">
    </div>
    <input type="tel" id="phone" name="phone" class="nds-input nds-phone" placeholder="5X XXX XXXX" autocomplete="tel-national" inputmode="numeric">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="field-phone-country" data-canon>
<div class="nds-form-container">
  <div class="nds-form-header">
    <label for="phone-country">
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
          <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="+966" data-trigger-label="+966" data-format="00 000 0000">
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
    <input type="tel" id="phone-country" name="phone" class="nds-input nds-phone" placeholder="00 000 0000" autocomplete="tel-national" inputmode="numeric">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
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
      <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
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
    <input type="text" id="iban" name="iban" class="nds-input nds-iban" placeholder="SA00 0000 0000 0000 0000 0000" autocomplete="off" spellcheck="false">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear nds-icon-only" type="button" aria-label="Clear input" data-i18n-aria-label="form.clear_input" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="formatted-input-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Each Structure is one kind of value. The size, style, states and messages of a text field work on all four: see [Text Fields](../components/form).

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Phone (default) | — | — | A Saudi mobile number after a fixed `+966`. A hidden input in the prefix holds the code, and `data-format` sets the groups |
| Structure | Phone with country (id: phone-country) | canon `#field-phone-country` | — | A phone number after a country-code picker. The picker is a [Dropmenu](../components/dropmenu) with `data-select-name`. Each country item's `data-value` is its code, and it may carry its own `data-format` |
| Structure | National ID (id: national-id) (demo: + required) | canon `#field-national-id` | — | A national ID: by default a Saudi ID or iqama number, with digits only, 10 at most, and a check digit. Another country follows its own rule: see Site Country |
| Structure | IBAN (id: iban) (demo: + required) | canon `#field-iban` | — | A bank account IBAN. The field shows it in groups of four, writes capitals, adds missing country letters (`SA` by default), and checks the country, the length and the check digits |
| Affix style | Subtle (default) | `.nds-subtle` | `.nds-prefix > .nds-btn` | The code or the country picker on the field's own background |
| Affix style | Solid (hint: Light fill behind the code) | `.nds-secondary` | `.nds-prefix > .nds-btn` | The code or the country picker on a light fill, set apart from the number. Phone only |
| Required | Required (id: required) | `[data-required]` | `.nds-form-container` | A red asterisk before the label. An empty field blocks the submit |
| Field states | Size, style, label, info, hint, disabled, readonly, loading | — | — | Shared by every text field. See [Text Fields](../components/form) |
| Site country | Site country | — | — | `data-country="AE"` on `<html>` or any element around the field. Without it, the country is `SA`. Not a builder option: see Site Country |
{: #formatted-input-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="formatted-input-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Phone Number
{: .nds-block-title #phone-number}

`.nds-phone` on a `type="tel"` input keeps only the digits. A number holds at most 15 digits, the country code included, or the input's `maxlength`. A field without a country code sends the number as the user typed it, with its leading zero (`0551234567`).

A phone field reads left to right on every page, its country code first, as a number is written: `+966 55 123 4567` on an Arabic page too. An IBAN reads left to right as well.

### Country Code
{: .nds-block-title #country-code}

A phone's code is the value of the hidden input in its `.nds-prefix`. A fixed `+966` writes that input itself, next to its label. A country picker needs none: Dropmenu writes it, from the `data-value` of the picked country item. The field then shows the local number. A submit and `new FormData(form)` send the whole number in E.164 form: the country code, then the digits, with no spaces (`+966551234567`). `input.value` keeps the local number, without the code.

A pasted full number, such as `+966 55 123 4567` or `00966551234567`, loses the code. A pasted number with the code but no `+`, such as `966551234567`, loses the code when it is longer than the field holds (`data-format` or `maxlength`). A zero at the start of the local number is a trunk prefix, so the field removes it. Numbers in Italy, San Marino and Vatican City (`+39`, `+378`, `+379`) keep it.

### Number Groups
{: .nds-block-title #number-groups}

`data-format` on the field's `.nds-form-container` shows the number in groups. Each `0` is one digit, and any other character goes between them: `00 000 0000` shows `55 123 4567`. The field then takes no more digits than the format holds, and removes a `maxlength` shorter than the format. With a country picker, the field reads `data-format` from the picked country item instead. A country without one shows the number as typed.

Write a format only for numbers whose length you know. Phone numbers differ in length between countries, and even inside one.

### Country Picker
{: .nds-block-title #country-picker}

Phone with country puts a [Dropmenu](../components/dropmenu) with `data-select-name` before the input. The picker writes the picked code to a hidden input of that name, so the code also submits as its own field. A pasted full number from another listed country picks that country. A new pick shows the number in the groups of that country.

### National ID
{: .nds-block-title #national-id}

`.nds-national-id` follows the ID rule of its country: see Site Country. The Saudi rule, the default, keeps digits only and holds 10 at most. The field fails when the value is not a Saudi national ID or iqama number: 10 digits, the first 1 or 2, and a correct check digit.

### IBAN
{: .nds-block-title #iban}

`.nds-iban` shows the IBAN in groups of four and writes the letters as capitals. It holds 34 letters and digits at most, the longest IBAN, and removes a shorter `maxlength`. A value that starts with a digit, as some banking apps copy a Saudi IBAN, gets the letters of the site country in front, `SA` by default. The field fails when the value is not an IBAN: two letters for the country, two check digits, then 11 to 30 letters or digits, with a correct check sum. The check takes an IBAN of any country, whatever the site country is.

### Site Country
{: .nds-block-title #site-country}

`data-country` names the country that a national ID and an IBAN follow, as a two-letter code such as `AE`. Write it on `<html>` for the whole site, or on any element for the fields inside it: the nearest one wins. Without it, the country is `SA`. `any` takes an ID of any country, a passport too, with no check. Any other value that is not two letters logs one warning, and `SA` applies.

NDS ships the ID rule of Saudi Arabia only. Add the rule of another country with `NDS.FormattedInput.addIdRule()`, and every field of that country takes it at once. In a country with no rule, and with `any`, a national ID keeps letters and digits, writes the letters as capitals, and is not checked. An IBAN under `any` gets no letters in front.

A form that asks for the ID type first (national ID, iqama, passport) keeps one number field. Set its `data-country` when the type changes, and call `NDS.Form.refresh(input)` so the field takes the new rule at once:

<script type="text/html" id="formatted-input-id-type" data-canon data-lang="js" data-preview="none">
// #id-type is a select of the ID types; #id-field the number field's .nds-form-container
var idType = document.getElementById('id-type');
idType.addEventListener('change', function () {
  var field = document.getElementById('id-field');
  var input = field.querySelector('.nds-national-id');
  var passport = idType.value === 'passport';
  field.setAttribute('data-country', passport ? 'any' : 'SA');
  input.inputMode = passport ? 'text' : 'numeric';   // a passport number has letters
  NDS.Form.refresh(input);
});
</script>

</div>
  </div>
</section>

<section id="formatted-input-features" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every field starts when the page loads, and a field added later starts on its own. No init call is needed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Shape While Typing</span>
          </span>
          <p class="nds-item-desc">Each key and each paste takes the field's shape at once. The cursor stays where the user typed. A delete next to a group space removes the character past the space too.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-translate"></i>
            <span class="nds-label">Arabic Digits</span>
          </span>
          <p class="nds-item-desc">Arabic-Indic digits go in as Latin ones, typed or pasted, in all three fields.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-clipboard"></i>
            <span class="nds-label">Paste Cleanup</span>
          </span>
          <p class="nds-item-desc">A paste loses the spaces, dashes and other characters the field does not take.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-security-check"></i>
            <span class="nds-label">Checksum Validation</span>
          </span>
          <p class="nds-item-desc">An IBAN, or a national ID whose country has a rule, fails the field through the browser's own check when its check digits are wrong. The message shows at blur and at submit, in Arabic or English to match the page. An empty field passes unless it is required.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-sent"></i>
            <span class="nds-label">Clean Submit</span>
          </span>
          <p class="nds-item-desc">A submit and <code class="nds-inline-code lang-js">new FormData(form)</code> send the value without its group spaces. <code class="nds-inline-code lang-js">input.value</code> keeps them.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-reload-horizontal"></i>
            <span class="nds-label">Form Reset</span>
          </span>
          <p class="nds-item-desc">A form reset puts each field back to the value the page shipped with, in its shape.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="formatted-input-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Give every phone field that shows a code its hidden code input, or a picker whose items' `data-value` is the code. Without a code, the submit sends the local number only.
- Read the phone number from the form's data, or keep the `value` of `nds:phone:change`. `input.value` holds the local number with its spaces.
- Write a `data-format` only for a country whose number length you know.
- Use `type="tel"` and `inputmode="numeric"` on a phone, and `inputmode="numeric"` on a national ID of digits only. Leave `inputmode` off an IBAN, and off a national ID with letters: a phone keyboard would then show digits only.
- Set `autocomplete="tel-national"` on a phone with a code, and `autocomplete="off"` on a national ID or an IBAN.
- Add no `pattern` to a national ID or an IBAN field. The field checks itself.
- Give a Saudi national ID `maxlength="10"`. The browser then stops at 10 before the script loads.
- On a site outside Saudi Arabia, set `data-country` on `<html>`, and add your country's ID rule with `addIdRule()`.
- For a passport or a foreign ID, set `data-country="any"` on the field, and leave `inputmode` and `maxlength` off.
- To fill a field from a script, set `input.value`, then call `NDS.Form.refresh(input)`. The field then takes its shape.

</div>
  </div>
</section>

<section id="formatted-input-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-phone` | a `type="tel"` input | Keeps the digits. With a code, submits the whole number (`+966551234567`); without one, the number as typed. With `data-format`, shows the number in groups |
| `nds-national-id` | a text input | Follows the ID rule of its country, Saudi Arabia by default: keeps digits only, and fails the field when the value is not a Saudi national ID or iqama number |
| `nds-iban` | a text input | Shows the IBAN in groups of four, writes capitals, adds missing country letters, and fails the field when the value is not an IBAN |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `input type="hidden"` | in the `.nds-prefix` of a `.nds-phone` field | Its `value` is the code the submit puts before the number (`+966`). The field also drops it from a pasted full number. Give it a `name` to also send the code as its own field |
| `data-format` | the `.nds-form-container` of a `.nds-phone` field | The groups the number shows in: `0` is one digit, and any other character goes between digits (`00 000 0000`) |
| `data-select-name` | the `.nds-dropmenu` in a phone field's `.nds-form-control` | Makes the menu the field's country picker. The picked code submits in a hidden input of this name. See [Dropmenu](../components/dropmenu) |
| `data-select-value` | the same `.nds-dropmenu` | The `data-value` of the country picked at page load. It wins over an item with `data-state="selected"` |
| `data-value` | a `.nds-dropmenu-item` in the country picker | The code for that country (`+971`). Dropmenu writes the picked one to the picker's hidden input |
| `data-format` | a `.nds-dropmenu-item` in the country picker | The groups for that country, read while it is picked. A country without one shows the number as typed |
| `data-country` | `<html>`, or any element around a `.nds-national-id` or `.nds-iban` field | The two-letter country the fields inside it follow (`AE`). The nearest one wins. Without one, `SA`. `any` takes an ID of any country, a passport too, with no check |
| `maxlength` | a `.nds-phone` or `.nds-national-id` input | The most digits, for a field with no `data-format`. A field with a `data-format`, and an IBAN field, remove a `maxlength` shorter than their groups |
{: .nds-table .nds-responsive}

### Validation Messages
{: .nds-block-title}

The script shows the message in Arabic or English to match the page. The other checks on these fields, such as `required`, are the ones every [text field](../components/form) shows.

| Check | Message |
|---|---|
| `.nds-national-id` | Invalid national ID number |
| `.nds-iban` | Invalid IBAN |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.FormattedInput.isNationalId(value, country)`, `isIban(value)` | Return `true` when the string passes the `.nds-national-id` or `.nds-iban` check. They take the clean value: Latin digits only, or capitals with no spaces. Remove an IBAN field's spaces first: `input.value.replace(/\s/g, '')`. `country` is `SA` by default. A country with no rule passes |
| `NDS.FormattedInput.addIdRule(country, rule)` | Adds the national ID rule of a country (`'AE'`), or replaces one. `rule` is `{ check, digits, length }`: `check(value)` returns `true` for a valid clean value, `digits: true` keeps digits only (else capitals and digits), and `length` is the most characters. Fields already on the page take it at once |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:phone:change` | a `.nds-phone` input, and it bubbles | `{ value, countryCode, nationalNumber }`, when the number the field submits changes: by typing, a paste, a country pick, a reset or `NDS.Form.refresh()`. `value` is that number (`+966551234567`). `countryCode` and `nationalNumber` are `null` for a phone without a code. A field fires none at page load |
{: .nds-table .nds-responsive}

<script type="text/html" id="formatted-input-js" data-canon data-lang="js">
// Keep the number the form submits, not the one the field shows
document.querySelector('#phone').addEventListener('nds:phone:change', function (e) {
  console.log(e.detail.value);          // "+966551234567"
  console.log(e.detail.nationalNumber); // "551234567"
});

// The same checks, in your own code
NDS.FormattedInput.isNationalId('1000000008');            // true
NDS.FormattedInput.isIban('SA0380000000608010167519');    // true

// Another country's ID rule, for fields under data-country="AE"
NDS.FormattedInput.addIdRule('AE', {
  digits: true,
  length: 15,
  check: function (value) { return /^784\d{12}$/.test(value); }
});
</script>

The full API is in the banner of `_js/nds-formatted-input.js`.

</div>
  </div>
</section>

<section id="formatted-input-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Form Template](../templates/form-template): an application form with a national ID and a mobile number field.
- [Contact Us Template](../templates/contact-us-template): a contact form with a phone field.
- [Sign in](../examples/sign-in): a sign-in form that asks for a national ID.

</div>
  </div>
</section>
