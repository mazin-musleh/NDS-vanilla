---
layout: page
title: Password
hero_title: Password - National Design System
hero_description: A password field that checks the password rules as the user types, checks that a retyped password matches, and blocks the form submit until both pass
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.7.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 10:17 PM"
---

<section id="passwordOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A password field is a form field with the `nds-password` class, for a user who picks a new password. Each rule the password must meet is a chip under the field. A chip turns green when the value passes its rule and red when it fails. A second field can check that the user typed the same password twice. The show and clear buttons come from the forms script.

Pick another component when:

- the user signs in with a password they already have: a plain password field in [Forms](../components/forms)
- the user types a one-time code: [OTP Input](../components/otp)

</div>
  </div>
</section>

<section id="passwordMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="password-new" data-canon data-variants="passwordVariantsTable" data-harness="form" data-demo-width="300px">
<div class="nds-form-container nds-password" data-required>
  <div class="nds-form-header">
    <label for="new-password">
      <span class="nds-label">New password</span>
    </label>
  </div>
  <div class="nds-form-control">
    <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
    <input type="password" id="new-password" name="new-password" class="nds-input" autocomplete="new-password" minlength="8" aria-describedby="new-password-rules">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
      <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
        <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
      </button>
    </div>
  </div>
  <div class="nds-form-footer" data-feedback-target>
    <div class="nds-password-rules" id="new-password-rules">
      <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length">
        <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
        <span class="nds-feedback-message">At least 8 characters</span>
      </span>
    </div>
    <span class="nds-password-status" role="status" aria-live="polite"></span>
  </div>
</div>
</script>
<script type="text/html" id="password-confirm" data-canon>
<div class="nds-form-container nds-password" data-required>
  <div class="nds-form-header">
    <label for="first-password">
      <span class="nds-label">New password</span>
    </label>
  </div>
  <div class="nds-form-control">
    <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
    <input type="password" id="first-password" name="new-password" class="nds-input" autocomplete="new-password" minlength="8" aria-describedby="first-password-rules">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
      <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
        <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
      </button>
    </div>
  </div>
  <div class="nds-form-footer" data-feedback-target>
    <div class="nds-password-rules" id="first-password-rules">
      <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length">
        <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
        <span class="nds-feedback-message">At least 8 characters</span>
      </span>
    </div>
    <span class="nds-password-status" role="status" aria-live="polite"></span>
  </div>
</div>
<div class="nds-form-container nds-password" data-required data-password-match="#first-password">
  <div class="nds-form-header">
    <label for="retype-password">
      <span class="nds-label">Retype new password</span>
    </label>
  </div>
  <div class="nds-form-control">
    <i class="nds-icon nds-hgi-lock-password" aria-hidden="true"></i>
    <input type="password" id="retype-password" name="retype-password" class="nds-input" autocomplete="new-password" aria-describedby="retype-password-rules">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" hidden type="button" aria-label="Clear password">
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
      <button class="nds-btn nds-subtle nds-toggle-password" type="button" aria-label="Show password">
        <i class="nds-icon nds-hgi-view-off" aria-hidden="true"></i>
      </button>
    </div>
  </div>
  <div class="nds-form-footer" data-feedback-target>
    <div class="nds-password-rules" id="retype-password-rules">
      <span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="match">
        <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
        <span class="nds-feedback-message">Matches the new password</span>
      </span>
    </div>
    <span class="nds-password-status" role="status" aria-live="polite"></span>
  </div>
</div>
</script>
<script type="text/html" id="password-length-10" data-canon>
<span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length">
  <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
  <span class="nds-feedback-message">At least 10 characters</span>
</span>
</script>
<script type="text/html" id="password-length-6" data-canon>
<span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length">
  <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
  <span class="nds-feedback-message">At least 6 characters</span>
</span>
</script>
<script type="text/html" id="password-length-4" data-canon>
<span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="length">
  <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
  <span class="nds-feedback-message">At least 4 characters</span>
</span>
</script>
<script type="text/html" id="password-rule-upper" data-canon>
<span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="upper">
  <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
  <span class="nds-feedback-message">One capital letter (A-Z)</span>
</span>
</script>
<script type="text/html" id="password-rule-lower" data-canon>
<span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="lower">
  <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
  <span class="nds-feedback-message">One small letter (a-z)</span>
</span>
</script>
<script type="text/html" id="password-rule-digit" data-canon>
<span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="digit">
  <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
  <span class="nds-feedback-message">One number (0-9)</span>
</span>
</script>
<script type="text/html" id="password-rule-special" data-canon>
<span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="special">
  <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
  <span class="nds-feedback-message">One symbol (! @ # $ %)</span>
</span>
</script>
<script type="text/html" id="password-rule-space" data-canon>
<span class="nds-feedback nds-outline nds-sm" data-permanent data-status="neutral" data-rule="nospace" data-rule-pattern="^\S+$">
  <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
  <span class="nds-feedback-message">No spaces</span>
</span>
</script>
    </div>
  </div>
</section>

<section id="passwordVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A Min length choice sets `minlength` on the input and swaps the length chip for one that names the new number. Each Validation row adds its rule chip to the first field's rules, and any mix of them can be on. On a page, add a rule chip to the `.nds-password-rules` of any field.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | New password (default) | — | — | One field with its rule chips, for sign-up or a password reset |
| Structure | Confirm (hint: A retype field that must match the first) | canon `#password-confirm` | — | A new password and a retype field. The retype field's chip checks that the two values match |
| Min length | 10 | `[minlength="10"]` | `#new-password` | A longer minimum, for an account that holds sensitive data |
| Min length | 4 | `[minlength="4"]` | `#first-password` | The same, on the first field of Confirm |
| Min length | 4 | canon `#password-length-4` | `[data-rule="length"]` (after) | The length chip with the new number |
| Min length | 4 | remove | `[data-rule="length"]:first-child` | Removes the old length chip |
| Validation (any) | Capital letter | canon `#password-rule-upper` | `#new-password-rules` | The password needs one letter from A to Z |
| Min length | 6 | `[minlength="6"]` | `#first-password` | The same, on the first field of Confirm |
| Min length | 6 | canon `#password-length-6` | `[data-rule="length"]` (after) | The length chip with the new number |
| Min length | 6 | remove | `[data-rule="length"]:first-child` | Removes the old length chip |
| Min length | 4 | `[minlength="4"]` | `#new-password` | A very short minimum, such as a PIN-style password. Pair it with more rules |
| Min length | 6 | `[minlength="6"]` | `#new-password` | A shorter minimum. Pair it with more rules |
| Min length | 10 | `[minlength="10"]` | `#first-password` | The same, on the first field of Confirm |
| Min length | 10 | canon `#password-length-10` | `[data-rule="length"]` (after) | The length chip with the new number |
| Min length | 10 | remove | `[data-rule="length"]:first-child` | Removes the old length chip |
| Min length | 8 (default) | — | — | The length rule's minimum, in `minlength` on the input and in the length chip's text |
| Validation (any) | Capital letter | canon `#password-rule-upper` | `#first-password-rules` | The same, on the first field of Confirm |
| Validation (any) | Small letter | canon `#password-rule-lower` | `#new-password-rules` | The password needs one letter from a to z |
| Validation (any) | Small letter | canon `#password-rule-lower` | `#first-password-rules` | The same, on the first field of Confirm |
| Validation (any) | Number | canon `#password-rule-digit` | `#new-password-rules` | The password needs one number from 0 to 9 |
| Validation (any) | Number | canon `#password-rule-digit` | `#first-password-rules` | The same, on the first field of Confirm |
| Validation (any) | Symbol | canon `#password-rule-special` | `#new-password-rules` | The password needs one character that is not a letter or a number |
| Validation (any) | Symbol | canon `#password-rule-special` | `#first-password-rules` | The same, on the first field of Confirm |
| Validation (any) | No spaces | canon `#password-rule-space` | `#new-password-rules` | A chip whose rule is the regular expression in `data-rule-pattern`. It needs no `addRule()` call |
| Validation (any) | No spaces | canon `#password-rule-space` | `#first-password-rules` | The same, on the first field of Confirm |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #passwordVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="passwordBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Pattern Rules
{: .nds-block-title}

`data-rule-pattern` on a chip holds a regular expression that the value must match. The chip can use any `data-rule` name, and it counts and blocks the submit like a built-in rule. The expression matches anywhere in the value, so anchor it with `^` and `$` to test the whole value. The match is case-sensitive, and the chip takes no flags. For a "must not contain" rule, use a lookahead, such as `^(?!.*admin)`. An invalid expression logs a warning, and the chip stays neutral.

### Confirm Match
{: .nds-block-title}

`data-password-match` on the retype field's container names the first input, as a CSS selector. The chip with `data-rule="match"` turns green when the two values are equal. It updates while the user types in either field. A mismatch turns the chip red and blocks the submit.

The chip is optional. Without it, leave out `.nds-password-rules` and the input's `aria-describedby`, but keep the footer and the status region. The submit is still blocked, and the message "The two passwords do not match" shows at submit.

</div>
  </div>
</section>

<section id="passwordFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">nds-password</code> field on the page starts on its own. A value already in the field, such as one from the server, shows its rule status at once.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-checkmark-badge-01"></i>
            <span class="nds-label">Five Built-in Rules</span>
          </span>
          <p class="nds-item-desc">Length, capital letter, small letter, number and symbol. A symbol is any character other than A-Z, a-z and 0-9. Add a chip for each rule you want.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-01"></i>
            <span class="nds-label">Submit Gating</span>
          </span>
          <p class="nds-item-desc">A failing rule or a mismatch blocks the submit through native constraint validation. The field outline turns red, and the red chips name the cause, so no message is added. The chips stay neutral while the field is empty.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-eye"></i>
            <span class="nds-label">Show Password</span>
          </span>
          <p class="nds-item-desc">The eye button switches the field between hidden and plain text. Its label changes between "Show password" and "Hide password".</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-language-circle"></i>
            <span class="nds-label">Arabic Letters Blocked</span>
          </span>
          <p class="nds-item-desc">A password field does not accept Arabic letters. The forms script removes a typed Arabic letter at once and shows an error under the field.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-access"></i>
            <span class="nds-label">Screen Reader Progress</span>
          </span>
          <p class="nds-item-desc">A hidden live region reads "3 of 5 password rules met", or the mismatch message, half a second after the user stops typing. The chips are not read again on each keystroke.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-dashboard-speed-01"></i>
            <span class="nds-label">Strength Value in CSS</span>
          </span>
          <p class="nds-item-desc">The container carries the number of passing chips in <code class="nds-inline-code lang-html">data-password-strength</code>, so a stylesheet can draw a strength bar. NDS ships no bar.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Register rules, check the value again, and read the current result through the JS API.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="passwordPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use it on sign-up, change-password and password-reset forms, where the user picks a new password.
- Add one chip for each rule the server enforces. A chip the server ignores shows the user a rule that is not real.
- Keep `minlength` on the input, and write the same number in the length chip's text. The browser enforces `minlength`, so the length rule still blocks the submit before the script loads.
- Put `.nds-password-rules` inside the `data-feedback-target` footer, and give every chip `data-permanent` and `data-status="neutral"`. A validation message then takes the chips' place, and the chips come back when it clears. The script loads after first paint, so a chip without `data-status` has no style until then.
- Point the input's `aria-describedby` at `.nds-password-rules`, so a screen reader reads the rules on focus. Keep the `.nds-password-status` region: without it, a screen reader hears no progress.
- Write each chip message as the rule, such as "One number (0-9)", not as an error. The chip turns red on its own.
- Use `data-rule-pattern` for a one-off rule, not `addRule()`. The expression then sits next to the message the user reads.
- Add a hidden username field with `autocomplete="username"` above the password fields, so a password manager saves the right account.
- Do not treat the strength value as a security measure. It counts chips, not how hard the password is to guess.
- For the label, info text and feedback, see [Forms](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="passwordApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-rule` | `.nds-password-rules > .nds-feedback` | The rule the chip checks: `length`, `upper`, `lower`, `digit`, `special` or `match`. Another name needs `data-rule-pattern` or `addRule()`. Without one, the chip stays neutral and is not counted |
| `data-rule-pattern` | `.nds-password-rules > .nds-feedback` | A regular expression the value must match. It wins over a built-in rule with the same name |
| `data-status` | `.nds-password-rules > .nds-feedback` | Write `neutral`. The script sets `success` or `error` on each keystroke |

| `data-permanent` | `.nds-password-rules > .nds-feedback` | A validation message hides the chip instead of removing it. The chip comes back when the message clears. Without it, the first error removes the chips for good |
| `data-password-match` | `.nds-password` | A CSS selector for the first password input. It makes the field a retype field. The script reads it once at start. When the first field is added later, call `NDS.Password.destroy()` and then `NDS.Password.create()` on the retype field |
| `minlength` | the `<input>` | The length rule's minimum. The default is 8 |
| `data-password-strength` | `.nds-password` | Written by the script: the number of passing chips, 0 while the field is empty. Style a bar from it, such as `.nds-password[data-password-strength="5"] .my-bar { width: 100%; }` |
{: .nds-table .nds-responsive}
### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Password.init()` | Starts every password field on the page that has not started. Call it after you add a field |
| `NDS.Password.reinit()` | The same as `init()` |
| `NDS.Password.create(container)` | Starts one field: pass its `.nds-form-container`. Returns the instance, or `null` when the field has no password input, or no chips and no match |
| `NDS.Password.destroy(container)` | Stops one field, removes its submit block and sets its chips back to neutral |
| `NDS.Password.check(container)` | Checks the value now, fires `nds:password:change` and returns `{ strength, allPass, rules }` |
| `NDS.Password.addRule(name, test)` | Registers a rule. `test(value, ctx)` returns `true` when the value passes. `ctx.minLength` is the length minimum, and `ctx.matchValue` is the first field's value, or `null` with no match. Chips with that `data-rule` count from the next keystroke |
| `container.ndsPassword.getStrength()` | Returns the last result, with no new check and no event |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:password:change` | `.nds-password`, and it bubbles | `{ strength, allPass, rules }`. It fires at start and on each input. On a retype field, it also fires when the first field changes. `strength` is the number of passing chips. `allPass` is `true` when every counted chip passes and the two values match. It is `false` while the field is empty. `rules` maps each rule name to `true` or `false`. The detail holds no password: read the input when you need it |
{: .nds-table .nds-responsive}

<script type="text/html" id="password-js" data-canon data-lang="js">
// A rule that the password must not be the username
NDS.Password.addRule('nouser', function (value) {
  return value.toLowerCase() !== document.querySelector('#username').value.toLowerCase();
});

// Show the strength as text
var field = document.querySelector('#new-password').closest('.nds-password');
field.addEventListener('nds:password:change', function (e) {
  document.querySelector('#strength-text').textContent = e.detail.strength + ' of 5';
});

// Wire a field added after page load
NDS.Password.init();
</script>

The full API is in the banner of `_js/nds-password.js`.

</div>
  </div>
</section>

<section id="passwordRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Create your account](../examples/registration): a password field with a retype field in a sign-up form.
- [Sign in](../examples/sign-in): the change-password step, with rule chips and a retype field.
- [Forms](../components/forms): labels, feedback and validation for every field.

</div>
  </div>
</section>
