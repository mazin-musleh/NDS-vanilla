---
layout: page
title: Cooldown Button
hero_title: Cooldown Button - National Design System
hero_description: A button that disables itself and counts down before it can be pressed again, for resend, retry and rate-limited actions
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "29/09/2026 - 08:01 AM"
---

<section id="cooldownOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A cooldown button disables itself after one click and counts down before it can be pressed again. Its label shows the countdown, then returns to its own label or to one you set. It is a `.nds-cooldown` modifier on [Button](../components/button), so every variant and size applies. The component owns only the cooldown and its countdown label.

Pick another component when:

- the action has no rate limit to respect: [Button](../components/button)

</div>
  </div>
</section>

<section id="cooldownMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="cooldown-base" data-canon>
<button type="button" class="nds-btn nds-secondary nds-cooldown" data-cooldown="15" data-cooldown-label="Resend in {s}s" data-resend-label="Resend">
  <span class="nds-label">Send code</span>
</button>
</script>
    </div>
  </div>
</section>

<section id="cooldownFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-cooldown</code> on the page is wired at load, and any added later. No init call is needed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-clock-01"></i>
            <span class="nds-label">Live Countdown Label</span>
          </span>
          <p class="nds-item-desc">The label shows the <code class="nds-inline-code lang-html">data-cooldown-label</code> text and updates every second, with each <code class="nds-inline-code lang-html">{s}</code> replaced by the seconds left.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-01"></i>
            <span class="nds-label">Stable Width</span>
          </span>
          <p class="nds-item-desc">The label reserves its widest text from page load: the first label, the countdown at its longest, or the resend label. The button never resizes during the cooldown.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Your Loading State</span>
          </span>
          <p class="nds-item-desc">The component has no loading phase: a timer cannot know how long a response takes. Add <code class="nds-inline-code lang-html">data-state="loading"</code> from <code class="nds-inline-code lang-js">nds:cooldown:triggered</code>, and remove it when the response arrives. The state hides the label, so the countdown runs under the spinner.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-notification-square"></i>
            <span class="nds-label">Your Confirmation</span>
          </span>
          <p class="nds-item-desc">The component shows no alert of its own. Show one with <a class="nds-color" href="../components/alert">Alert</a> when the response arrives, in the same <code class="nds-inline-code lang-js">nds:cooldown:triggered</code> listener. A failed send then never reports success.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Start a cooldown from JavaScript, resume one after a page reload with the seconds left, or end one early.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="cooldownPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use it for a resend action with a per-user rate limit, such as a one-time code (OTP), a verification email or a password reset. Set `data-cooldown` to the server's limit exactly.
- Use it for a retry button after a failed request, so the user cannot send repeated requests to a server that is already failing.
- Do not use it to block a double form submit. Disable the submit button while the form sends instead.
- Do not use it for cooldowns over a few minutes. A long countdown reads as nagging and ties the user to the page. Show the time when the action is available again instead.
- Put the button text in a `<span class="nds-label">`. The countdown writes into that span. A button without one never counts down and logs a console warning.
- Omit `data-resend-label` when the action reads the same every time, such as "Try again". The button then returns to its first label.
- Keep the countdown text short, such as "Resend in 30s". Stable Width holds the button at its longest text, so a long countdown makes it wide at rest too. Shorten the wording, not the CSS.
- Call `NDS.CooldownButton.reset()` when the request fails. The user can then retry at once, instead of waiting out a cooldown for a send that failed.

</div>
  </div>
</section>

<section id="cooldownApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-cooldown` | `.nds-cooldown` | Seconds to hold the cooldown. Required, unless `start()` passes `seconds`. A value of 0 or less turns the cooldown off. Read once, when the button is wired. Editing it later has no effect |
| `data-cooldown-label` | `.nds-cooldown` | Countdown text. Every `{s}` is replaced by the seconds left. Default `{s}`: the number alone. Only `{s}` counts down: `%s`, `%d` and `{seconds}` show as typed, and a label with no `{s}` logs a console warning when the button is wired. Read at the start of each cooldown |
| `data-resend-label` | `.nds-cooldown` | Label shown when any cooldown ends, by the timer or by `reset()`. Omit it to restore the label the cooldown started with. Read at the start of each cooldown |
| `data-state="cooldown"` | `.nds-cooldown` | Set by the component, together with `disabled`, during the cooldown. Read it to style or query a button during its cooldown. Do not set it yourself |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.CooldownButton.init()` | Wires every `.nds-cooldown` on the page, now and later. Runs once at load. Call it only if you disabled the loader |
| `NDS.CooldownButton.start(btn, opts?)` | Starts a cooldown by hand. Does nothing while a cooldown is already running |
| `NDS.CooldownButton.reset(btn)` | Ends the cooldown early and restores the button, as a finished cooldown does |
{: .nds-table .nds-responsive}

| Option | Default | Effect |
|---|---|---|
| `seconds` | `data-cooldown` | Seconds to run instead. With it, a button needs no `data-cooldown` and can run entirely from JavaScript |
| `silent` | `false` | Skip `nds:cooldown:triggered`, for a send that already happened elsewhere. `tick` and `end` still fire |
{: .nds-table .nds-responsive}

All events bubble.

| Event | Fired on | Detail |
|---|---|---|
| `nds:cooldown:triggered` | `.nds-cooldown`, when the cooldown starts. Skipped by `silent` | None. Issue the request here, and confirm from its response |
| `nds:cooldown:tick` | `.nds-cooldown`, every second during the cooldown, starting at the full duration | `{ remaining }`: the seconds left |
| `nds:cooldown:end` | `.nds-cooldown`, when the cooldown finishes or `reset()` is called | None. The button is enabled again and its label restored |
{: .nds-table .nds-responsive}

<script type="text/html" id="cooldown-js" data-canon data-lang="js">
const btn = document.querySelector('#resend-btn');

// Add the listener before any start() call, so the first cooldown reaches it.
btn.addEventListener('nds:cooldown:triggered', async () => {
  NDS.State.add(btn, 'loading');
  try {
    // NDS.request throws on a non-OK status, so a failed send reaches
    // the catch below. A plain fetch resolves on one, reporting a
    // failed resend as though it had worked.
    await NDS.request('/api/resend', { method: 'POST' });
    NDS.Alert.create({
      variant: 'success', title: 'Code sent',
      display: 'toast', position: 'top', duration: 4000
    });
  } catch (err) {
    NDS.Alert.create({
      variant: 'error', title: 'Could not send the code',
      display: 'toast', position: 'top', duration: 0
    });
    // Let the user retry at once, instead of waiting out a cooldown
    // for a send that failed.
    NDS.CooldownButton.reset(btn);
  } finally {
    NDS.State.remove(btn, 'loading');
  }
});

// Start a cooldown by hand, such as after a form submit elsewhere.
// Use one of these forms. A call during a running cooldown does nothing.
NDS.CooldownButton.start(btn);

// Or: the send already happened. Start the cooldown without firing
// nds:cooldown:triggered again.
NDS.CooldownButton.start(btn, { silent: true });

// Or: resume a cooldown after a page reload, with 20 of 30 seconds left.
NDS.CooldownButton.start(btn, { seconds: 20, silent: true });
</script>

The full API is in the banner of `_js/nds-cooldown-button.js`.

</div>
  </div>
</section>

<section id="cooldownRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Registration](../examples/registration): a resend code button.
- [Sign In](../examples/sign-in): a captcha refresh and an OTP resend.
- [Form Template](../templates/form-template): an OTP resend button inside a form.

</div>
  </div>
</section>
