---
layout: page
title: Alert
hero_title: Alert - National Design System
hero_description: An alert shows a short status message, such as a success, a warning or an error, in the page or as a toast
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.11.0"
last_edit: "25/09/2026 - 10:17 AM"
---

<section id="alertOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a standard alert for a message with a title and a description inside a page section.
- Use an inline alert for a one-line message next to a form or an action, where space is limited.
- Use a toast for short feedback after an action, such as save, delete or submit. A toast floats over the page and can close itself.
- Write the HTML for an alert that is in the page when it loads. Call `NDS.Alert.create()` for an alert that appears after something happens, such as a save or a failed request. A toast is made only with `create()`: its timer and placement need the script.
- Use a [modal](../components/modal) when the user must make a decision before they continue. An alert never blocks the page.

</div>
  </div>
</section>

<section id="alertMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="alert-standard" data-canon data-variants="alertVariantsTable" data-js="alert-js">
<div class="nds-alert nds-card" data-status="info" role="alert">
  <span class="nds-feedback nds-alert-icon nds-outline">
    <span class="nds-feedback-icon">
      <i class="nds-icon" aria-hidden="true"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <div class="nds-alert-text">
      <span class="nds-alert-title">Update available</span>
      <p class="nds-alert-description">A new version is ready. Update now to get the latest fixes.</p>
    </div>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert">
    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
  </button>
</div>
</script>
<script type="text/html" id="alert-inline" data-canon>
<div class="nds-alert nds-card nds-inline" data-status="info" role="alert">
  <span class="nds-feedback nds-alert-icon">
    <span class="nds-feedback-icon">
      <i class="nds-icon" aria-hidden="true"></i>
    </span>
  </span>
  <div class="nds-alert-content">
    <div class="nds-alert-text">
      <span class="nds-alert-title">Update available:</span>
      <p class="nds-alert-description">A new version is ready.</p>
    </div>
  </div>
  <button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert">
    <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
  </button>
</div>
</script>
<script type="text/html" id="alert-close" data-canon>
<button class="nds-btn nds-subtle nds-icon-only nds-md nds-alert-close" aria-label="Close alert">
  <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
</button>
</script>
<script type="text/html" id="alert-actions" data-canon>
<div class="nds-alert-actions">
  <button class="nds-btn nds-primary nds-sm">
    <span class="nds-label">Update now</span>
  </button>
  <button class="nds-btn nds-subtle nds-sm">
    <span class="nds-label">Later</span>
  </button>
</div>
</script>
<script type="text/html" id="alert-link" data-canon>
<div class="nds-alert-actions">
  <a href="#" class="nds-link">Learn more</a>
</div>
</script>
<script type="text/html" id="alert-copy" data-canon>
<div class="nds-alert-actions">
  <button class="nds-btn nds-subtle nds-sm nds-copy" data-copy="843291">
    <i class="nds-icon nds-hgi-copy-01" aria-hidden="true"></i>
    <span class="nds-label">Copy code</span>
  </button>
</div>
</script>
<script type="text/html" id="alert-js" data-canon data-lang="js">
NDS.Alert.create({
  variant: 'info',
  title: 'Update available',
  description: 'A new version is ready. Update now to get the latest fixes.',
  target: '#messages'
});
</script>
<script type="text/html" id="alert-toast" data-canon data-lang="js">
NDS.Alert.create({
  variant: 'info',
  title: 'Update available',
  description: 'A new version is ready. Update now to get the latest fixes.',
  display: 'toast',
  duration: 4000
});
</script>
<script type="text/html" id="alert-js-actions" data-canon data-lang="js">
actions: [
  { label: 'Update now', variant: 'primary', onClick: function (alert) { /* start the update */ } },
  { label: 'Later', dismiss: true }
]
</script>
<script type="text/html" id="alert-js-link" data-canon data-lang="js">
actions: [
  { label: 'Learn more', href: '#', class: 'nds-link' }
]
</script>
<script type="text/html" id="alert-js-copy" data-canon data-lang="js">
actions: [
  { label: 'Copy code', copy: '843291' }
]
</script>
    </div>
  </div>
</section>

<section id="alertVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

`#alert-js` is the same alert as one `NDS.Alert.create()` call (`data-js` on the base canon). A row whose On element is `create()` sets an option of that call, or of the toast's. `create({ display: 'toast' })` means only a call with that option.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Standard (default) | — | — | A title and a description, with the stripe on the start edge. On a phone, it stacks and the stripe moves to the top |
| Structure | Inline | canon `#alert-inline` | — | One line, with a thin stripe at the bottom and a solid icon. Always tinted. Actions go to the end of the line |
| Structure | Inline | `display: 'inline'` | `create()` | The same, in JavaScript |
| Structure | Toast | canon `#alert-toast` | — | Floats at a corner of the screen, so it needs no `target`. `duration` closes it after that many ms; `0` keeps it until the user closes it. A toast is made only with JavaScript: its timer and placement need the script |
| Status | Info (default) | `[data-status="info"]` | `.nds-alert` | Neutral news or an update |
| Status | Info (default) | `variant: 'info'` | `create()` | The same, in JavaScript |
| Status | Success | `[data-status="success"]` | `.nds-alert` | A confirmation |
| Status | Success | `variant: 'success'` | `create()` | The same, in JavaScript |
| Status | Warning | `[data-status="warning"]` | `.nds-alert` | A risk the user should know about |
| Status | Warning | `variant: 'warning'` | `create()` | The same, in JavaScript |
| Status | Error | `[data-status="error"]` | `.nds-alert` | A failure |
| Status | Error | `variant: 'error'` | `create()` | The same, in JavaScript |
| Status | Critical (hint: Error colors with its own icon) | `[data-status="critical"]` | `.nds-alert` | A system-level emergency. Same colors as Error, with its own icon |
| Status | Critical (hint: Error colors with its own icon) | `variant: 'critical'` | `create()` | The same, in JavaScript |
| Status | Neutral | `[data-status="neutral"]` | `.nds-alert` | A general notice |
| Status | Neutral | `variant: 'neutral'` | `create()` | The same, in JavaScript |
| Actions | None (default) | — | — | No actions. Actions go last in `.nds-alert-content`, after `.nds-alert-text` |
| Actions | Buttons | canon `#alert-actions` | `.nds-alert-content` | Buttons that let the user respond, such as retry, undo or update. Use `nds-sm` buttons |
| Actions | Buttons | canon `#alert-js-actions` | `create()` | The same, in JavaScript. `onClick` gets the alert element. `dismiss: true` closes the alert after the click |
| Actions | Link | canon `#alert-link` | `.nds-alert-content` | A link to a detail page. Links inside an alert take neutral colors |
| Actions | Link | canon `#alert-js-link` | `create()` | The same, in JavaScript. `class` replaces the button classes |
| Actions | Copy (hint: Copies a code or a log) | canon `#alert-copy` | `.nds-alert-content` | Copies `data-copy`, or the text of the element that `data-copy-target` selects. See [Copy](../utilities/copy) |
| Actions | Copy (hint: Copies a code or a log) | canon `#alert-js-copy` | `create()` | The same, in JavaScript. `create()` adds the copy icon |
| Close | Button (default) | canon `#alert-close` | `.nds-alert` | The close button removes the alert. It goes last in `.nds-alert` |
| Close | None | — | — | No close button, for an alert the user cannot close |
| Close | None | `closable: false` | `create()` | The same, in JavaScript. A toast with a `duration` keeps its close button, which shows the countdown |
| Shadow | Shadow | `.nds-shadow` | `.nds-alert` | An elevation shadow |
| Shadow | Shadow | `shadow: true` | `create()` | The same, in JavaScript. A toast has a shadow by default |
| Color | Color | `.nds-color` | `.nds-alert` | Tints the background with the status color. Use it in dense layouts, where the stripe alone does not stand out. No effect on inline, which is always tinted |
| Color | Color | `color: true` | `create()` | The same, in JavaScript |
| Position | Top (default) | — | `create({ display: 'toast' })` | At the top, on the end side, below the sticky header |
| Position | Top start | `position: 'top-start'` | `create({ display: 'toast' })` | Top, on the start side. `-start` and `-end` follow the text direction |
| Position | Top end | `position: 'top-end'` | `create({ display: 'toast' })` | The same as Top |
| Position | Top left | `position: 'top-left'` | `create({ display: 'toast' })` | Top left in every direction |
| Position | Top right | `position: 'top-right'` | `create({ display: 'toast' })` | Top right in every direction |
| Position | Bottom | `position: 'bottom'` | `create({ display: 'toast' })` | At the bottom, on the end side |
| Position | Bottom start | `position: 'bottom-start'` | `create({ display: 'toast' })` | Bottom, on the start side |
| Position | Bottom end | `position: 'bottom-end'` | `create({ display: 'toast' })` | The same as Bottom |
| Position | Bottom left | `position: 'bottom-left'` | `create({ display: 'toast' })` | Bottom left in every direction |
| Position | Bottom right | `position: 'bottom-right'` | `create({ display: 'toast' })` | Bottom right in every direction |
{: #alertVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="alertFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-colors"></i>
            <span class="nds-label">Status Icon and Color</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">data-status</code> sets the icon, the stripe color and the tint. The icon element stays empty in the markup.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Close Button</span>
          </span>
          <p class="nds-item-desc">The close button removes the alert. It works on alerts in the page at load. For alerts you add later, call <code class="nds-inline-code lang-js">NDS.Alert.init()</code>, or create them with <code class="nds-inline-code lang-js">NDS.Alert.create()</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-notification-square"></i>
            <span class="nds-label">Toasts</span>
          </span>
          <p class="nds-item-desc">A toast fades in at a corner of the screen. With a <code class="nds-inline-code lang-js">duration</code>, a ring on the close button counts down, and the toast closes itself.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-pause"></i>
            <span class="nds-label">Pausable Timer</span>
          </span>
          <p class="nds-item-desc">The timer pauses on hover and on keyboard focus, and resumes when they leave. A click stops the timer, and the toast stays until the user closes it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-01"></i>
            <span class="nds-label">Toast Placement</span>
          </span>
          <p class="nds-item-desc">Top toasts sit below the sticky header and stack newest first. Bottom toasts stack newest last. On a phone, toasts use the full width.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-01"></i>
            <span class="nds-label">Safe Content</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-js">create()</code> escapes the title and the description. An action with an unsafe <code class="nds-inline-code lang-js">href</code>, such as <code class="nds-inline-code lang-js">javascript:</code>, becomes a plain button.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="alertPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Pick the status that matches the message: success for a confirmation, info for news, warning for a risk, error for a failure, critical for a system-level emergency, and neutral for a general notice. Do not use a status for its color only.
- Add `nds-color` in dense layouts, where the stripe alone does not stand out. An inline alert is always tinted, so it needs no `nds-color`.
- Keep the description to one or two sentences. For more, add a link to a detail page.
- Add actions when the user must respond, such as retry, undo or update. Do not add an action that only closes the alert; the close button does that.
- Add a copy action for text the user will paste somewhere else, such as a code, a reference number or an error log.
- Do not use a toast for a critical error or a message the user must act on. A toast can close before the user reads it.
- Give a toast a `duration` of 3000 to 5000 ms. Under 2000 ms is too short to read.
- Prefer the logical toast positions (`-start`, `-end`), which follow the text direction. Use `-left` and `-right` only when the toast must stay at one physical edge.

</div>
  </div>
</section>

<section id="alertApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-status` | `.nds-alert` | The status: `info`, `success`, `warning`, `error`, `critical` or `neutral`. Sets the icon and the colors |
| `data-position` | `.nds-alert-placeholder` | Where toasts dock. Place your own placeholder with this attribute, and toasts for that position go into it instead of a new one |
| `data-state` | `.nds-toast` | Set by the script: `toast-show`, `toast-hide` and `paused`. Do not set it yourself |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--alert-stripe` | `var(--border-neutral-primary)` | Stripe color. Each status sets its own |
| `--alert-icon-bg` | `var(--background-neutral-light)` | Background of the icon circle. Each status sets its own |
| `--progress-duration` | `4000ms` | Length of the countdown ring on `.nds-alert-close`. `create()` sets it from `duration` |
{: .nds-table .nds-responsive}

An alert is a card, so the card color properties (`--card-bg`, `--card-border` and `--card-title`) also apply. See [Cards](../components/cards).

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Alert.create(options)` | Builds an alert, inserts it and returns the element |
| `NDS.Alert.dismiss(elOrSelector)` | Removes one alert. A toast fades out first |
| `NDS.Alert.dismissAll(container)` | Removes every alert inside a container, given as an element or a selector |
| `NDS.Alert.init()` | Wires the close button on alerts added to the page after load |
{: .nds-table .nds-responsive}

| Option | Default | Effect |
|---|---|---|
| `variant` | `'info'` | The status, as in `data-status` |
| `title` | `''` | Title text. Leave it empty for no title |
| `description` | `''` | Description text |
| `display` | `'default'` | `'default'`, `'inline'` or `'toast'` |
| `target` | `null` | Element or selector to insert into. A toast needs none |
| `prepend` | `false` | Insert at the start of `target`, not at the end |
| `closable` | `true` | Show the close button. A toast with a `duration` always has one |
| `shadow` | `true` for a toast, else `false` | Add `.nds-shadow` |
| `color` | `false` | Add `.nds-color` |
| `id` | `null` | Id of the alert element |
| `position` | `'top'` | Toast position: `top` or `bottom`, with an optional `-start`, `-end`, `-left` or `-right`. `-start` and `-end` follow the text direction, so `-start` is the left in English and the right in Arabic. `top` and `bottom` alone sit at the end side |
| `duration` | `0` | Toast auto-close time in ms. `0` never closes |
| `actions` | `[]` | Action objects (next table) |
{: .nds-table .nds-responsive}

| Action key | Effect |
|---|---|
| `label` | Button text |
| `variant`, `size` | Button classes, `nds-{variant} nds-{size}`. Default `subtle` and `sm` |
| `class` | Replaces the button classes. Use `'nds-link'` for a text link |
| `href`, `target` | Makes the action a link. `target` adds `rel="noopener noreferrer"` |
| `onClick(alertEl)` | Runs on click |
| `dismiss` | `true` closes the alert after the click |
| `copy`, `copyTarget` | Copies this text, or the text of the element this selector finds. Adds the copy icon, a checkmark flash and a screen-reader announcement |
{: .nds-table .nds-responsive}

Alerts fire no events. Use `onClick` on an action. The full API is in the banner of `_js/nds-alert.js`.

<script type="text/html" id="alert-create-js" data-canon data-lang="js">
var alert = NDS.Alert.create({
  variant: 'error',
  title: 'Request failed',
  description: 'The request could not be completed.',
  target: '#messages',
  prepend: true,
  actions: [
    { label: 'Retry', variant: 'primary', onClick: function () { retry(); }, dismiss: true },
    { label: 'Copy error log', copy: error.stack }
  ]
});

// Later
NDS.Alert.dismiss(alert);
NDS.Alert.dismissAll('#messages');
</script>

</div>
  </div>
</section>

<section id="alertRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Sign In](../examples/sign-in): a tinted error alert above the form, and toasts.
- [Admin Console Demo](../examples/console-demo): an inline alert in a dashboard.
- [Form Template](../templates/form-template), [Contact Us Template](../templates/contact-us-template), [Registration](../examples/registration) and [Manage Records](../examples/manage-records): toasts after a submit.

</div>
  </div>
</section>
