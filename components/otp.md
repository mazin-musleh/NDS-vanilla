---
layout: page
title: OTP Input
hero_title: OTP Input - National Design System
hero_description: A row of one-digit boxes for a one-time code, where focus moves to the next box as the user types
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="otp-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

An OTP (one-time password) input is a `<fieldset>` with the `nds-otp-group` class. The user types a code in it that was sent by SMS, email or an authenticator app, such as in a two-factor sign-in. It holds a legend, one box for each digit, and a hidden input with the whole code for the form. A separator can split a long code into two sets.

Pick another component when:

- the user picks a new password: [Password](../components/password)
- the value is a number with no fixed length: a number field in [Forms](../components/forms)

</div>
  </div>
</section>

<section id="otp-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="otp-4" data-canon data-variants="otp-variants-table" data-harness="form">
<fieldset class="nds-form-group nds-otp-group" data-required>
  <legend><span class="nds-label">Verification code</span></legend>
  <div class="nds-otp">
    <div class="nds-form-container nds-otp-container">
      <div class="nds-form-control">
        <input type="text" id="otp-digit-1" inputmode="numeric" maxlength="1" pattern="[0-9]" autocomplete="one-time-code" aria-label="Digit 1 of 4">
      </div>
    </div>
    <div class="nds-form-container nds-otp-container">
      <div class="nds-form-control">
        <input type="text" id="otp-digit-2" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 2 of 4">
      </div>
    </div>
    <div class="nds-form-container nds-otp-container">
      <div class="nds-form-control">
        <input type="text" id="otp-digit-3" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 3 of 4">
      </div>
    </div>
    <div class="nds-form-container nds-otp-container">
      <div class="nds-form-control">
        <input type="text" id="otp-digit-4" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 4 of 4">
      </div>
    </div>
  </div>
  <input type="hidden" class="nds-otp-value" name="otp">
</fieldset>
</script>
<script type="text/html" id="otp-6" data-canon>
<fieldset class="nds-form-group nds-otp-group" data-required>
  <legend><span class="nds-label">Verification code</span></legend>
  <div class="nds-otp">
    <div class="nds-form-container nds-otp-container">
      <div class="nds-form-control">
        <input type="text" id="otp6-digit-1" inputmode="numeric" maxlength="1" pattern="[0-9]" autocomplete="one-time-code" aria-label="Digit 1 of 6">
      </div>
    </div>
    <div class="nds-form-container nds-otp-container">
      <div class="nds-form-control">
        <input type="text" id="otp6-digit-2" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 2 of 6">
      </div>
    </div>
    <div class="nds-form-container nds-otp-container">
      <div class="nds-form-control">
        <input type="text" id="otp6-digit-3" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 3 of 6">
      </div>
    </div>
    <span class="nds-otp-separator"></span>
    <div class="nds-form-container nds-otp-container">
      <div class="nds-form-control">
        <input type="text" id="otp6-digit-4" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 4 of 6">
      </div>
    </div>
    <div class="nds-form-container nds-otp-container">
      <div class="nds-form-control">
        <input type="text" id="otp6-digit-5" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 5 of 6">
      </div>
    </div>
    <div class="nds-form-container nds-otp-container">
      <div class="nds-form-control">
        <input type="text" id="otp6-digit-6" inputmode="numeric" maxlength="1" pattern="[0-9]" aria-label="Digit 6 of 6">
      </div>
    </div>
  </div>
  <input type="hidden" class="nds-otp-value" name="otp">
</fieldset>
</script>
    </div>
  </div>
</section>

<section id="otp-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

For another code length, copy a box, give it a unique `id`, and number the `aria-label` of every box again ("Digit 2 of 5").

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | 4 digits (default) | — | — | A short code, such as an SMS code |
| Structure | 6 digits | canon `#otp-6` | — | A longer code, such as one from an authenticator app. A separator splits it into two sets of three |
| Size | SM | `.nds-sm` | `.nds-otp-group` | 32px boxes with smaller digits, for a dense form or a small card |
| Size | MD (default) | — | — | 40px boxes |
| Size | LG | `.nds-lg` | `.nds-otp-group` | 48px boxes with larger digits, 44px on phones, for a page that holds only the code |
| No separator | No separator | remove | `.nds-otp-separator` | Six boxes in one set. Keep the separator for a code the user reads as two sets |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #otp-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="otp-features" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">nds-otp-group</code> on the page starts on its own, and so does a group added later. No call is needed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-right-double"></i>
            <span class="nds-label">Auto-advance</span>
          </span>
          <p class="nds-item-desc">A typed digit moves the focus to the next box. A box takes digits only, and a new digit replaces the one in the box. A click on an empty group moves the focus to the first box.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Navigation</span>
          </span>
          <p class="nds-item-desc">The arrow keys move between the boxes, in the reading direction of the page. Backspace empties the box and moves back. Delete empties it and moves forward.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-clipboard"></i>
            <span class="nds-label">Paste Support</span>
          </span>
          <p class="nds-item-desc">A pasted or autofilled code fills the boxes from the box that has focus. Characters that are not digits are removed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-link-square-02"></i>
            <span class="nds-label">One Value for the Form</span>
          </span>
          <p class="nds-item-desc">The hidden <code class="nds-inline-code lang-html">nds-otp-value</code> input holds the whole code after each change, so the form sends it as one field.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-checkmark-badge-01"></i>
            <span class="nds-label">Submit Check</span>
          </span>
          <p class="nds-item-desc">In a form, a group with <code class="nds-inline-code lang-html">data-required</code> blocks the submit until every box holds a digit. The boxes turn red, and a message under them names the number of boxes: "Please enter all 4 digits".</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-eraser"></i>
            <span class="nds-label">Error Clears on Input</span>
          </span>
          <p class="nds-item-desc">A key press in any box removes the group's error and its message.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-pointer-01"></i>
            <span class="nds-label">Autofocus</span>
          </span>
          <p class="nds-item-desc">A box with <code class="nds-inline-code lang-html">autofocus</code> gets the focus when the script starts, even when the browser lost it while the page loaded.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-contrast"></i>
            <span class="nds-label">Accessibility</span>
          </span>
          <p class="nds-item-desc">In high contrast mode, the box borders are 2px wide. With reduced motion, the boxes change color with no transition.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="otp-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Make one box for each digit of the code the server sends. The submit check counts the boxes.
- Put `autocomplete="one-time-code"` on the first box only, so the phone offers the code from an SMS.
- Give the name to the hidden `nds-otp-value` input, not to the boxes. A named box sends its digit as one more field.
- Give each box an `aria-label` that names its place, such as "Digit 2 of 4". The boxes have no visible label.
- Keep `data-required` on the group. Without it, the form does not check the code.
- Check the code on the server. The OTP input checks only that every box is full.
- Put `autofocus` on the first box only when the code is the one task on the page, such as a verification step.
- After you send a new code, empty the boxes with `NDS.OTP.clear()`, so the user cannot send the old code.
- For the label, info text and feedback, see [Forms](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="otp-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-required` | `.nds-otp-group` | A form submit checks that every box holds a digit. It also adds the required mark to the legend |
| `data-error-message` | `.nds-otp-group` | The message that shows when the check fails, in place of the default message |
| `data-status` | `.nds-otp-group` | The forms script writes it. `error` turns every box red. To set it yourself, call `NDS.Forms.setStatus()` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

Each method takes the `.nds-otp-group` element.

| Method | Effect |
|---|---|
| `NDS.OTP.getValue(group)` | Returns the digits as one string. An empty box adds nothing |
| `NDS.OTP.setValue(group, value)` | Fills the boxes from the first, and removes characters that are not digits. It fires no event |
| `NDS.OTP.clear(group)` | Empties the boxes, focuses the first box and fires `nds:otpClear`. It does not remove an error: call `NDS.Forms.clearStatus(group)` for that |
| `NDS.OTP.init()` | Starts every group on the page. It runs once at page load, and a group added later starts on its own |
| `NDS.Forms.validateOtpGroup(group)` | Checks that every box holds a digit, shows the error when one is empty, and returns `{ valid, message, filled }` |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:otpChange` | `.nds-otp-group`, and it bubbles | `{ value, filled }`. It fires on each typed, pasted or deleted digit. `filled` is `true` when every box holds a digit |
| `nds:otpComplete` | `.nds-otp-group`, and it bubbles | `{ value }`. It fires when the last empty box gets a digit, in any order. Use it to submit the code |
| `nds:otpClear` | `.nds-otp-group`, and it bubbles | `{ value }`. It fires from `NDS.OTP.clear()` only |
{: .nds-table .nds-responsive}

<script type="text/html" id="otp-js" data-canon data-lang="js">
var group = document.querySelector('#verify-form .nds-otp-group');

// Submit when the last digit is in
group.addEventListener('nds:otpComplete', function () {
  document.querySelector('#verify-form').requestSubmit();
});

// Show the server's answer on the boxes
NDS.Forms.setStatus({ element: group, status: 'error', message: 'This code is not correct' });

// Empty the boxes after you send a new code
NDS.OTP.clear(group);
NDS.Forms.clearStatus(group);
</script>

The full API is in the banner of `_js/nds-otp.js`.

</div>
  </div>
</section>

<section id="otp-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Create your account](../examples/registration): a 4-digit code step after sign-up, with a resend button.
- [Sign in](../examples/sign-in): a 5-digit code step after the password, with a resend button.
- [Cooldown Button](../components/cooldown-button): the resend button that counts down before the user can ask again.

</div>
  </div>
</section>
