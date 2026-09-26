---
layout: page
title: Feedback Icons
hero_title: Feedback Icons - National Design System
hero_description: A feedback icon shows a status as a colored icon, alone or before a short message.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/09/2026 - 10:22 PM"
---

<section id="feedbackOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Feedback is a `nds-feedback` element with a `data-status`. It holds a status icon (`nds-feedback-icon`) and an optional short message (`nds-feedback-message`).

Pick another component when:

- the message is about a form field: `NDS.Forms.setStatus()` in [Forms](../components/forms), which also marks the field
- the message is for the whole page or needs a title or actions: [Alert](../components/alert)
- the status is a label on an item, such as "Approved": [Tags](../components/tags)

</div>
  </div>
</section>

<section id="feedbackMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="fb-message" data-canon data-variants="fbVariantsTable" data-js="fb-js">
<span class="nds-feedback nds-sm nds-outline" data-status="error">
  <span class="nds-feedback-icon">
    <i class="nds-icon" aria-hidden="true"></i>
  </span>
  <span class="nds-feedback-message">Enter a valid email address</span>
</span>
</script>
<script type="text/html" id="fb-icon" data-canon>
<span class="nds-feedback nds-sm nds-outline" data-status="error">
  <span class="nds-feedback-icon">
    <i class="nds-icon" aria-hidden="true"></i>
  </span>
</span>
</script>
<script type="text/html" id="fb-js" data-canon data-lang="js">
NDS.Feedback.create({
  message: 'Enter a valid email address',
  status: 'error',
  target: '#email-hint'
});
</script>
    </div>
  </div>
</section>

<section id="feedbackVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

`#fb-js` is the same message as one `NDS.Feedback.create()` call (`data-js` on the base canon). A row whose On element is `create()` sets an option of that call. The call's defaults match the canon: `size: 'sm'` and `style: 'outline'`.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Message (default) | — | — | The icon and a short message |
| Structure | Icon only | canon `#fb-icon` | — | The icon alone, where the text around it already says the status |
| Structure | Icon only | `message: ''` | `create()` | The same, in JavaScript: leave out `message` |
| Status | Error (default) | `[data-status="error"]` | `.nds-feedback` | Something failed or is wrong |
| Status | Error (default) | `status: 'error'` | `create()` | The same, in JavaScript |
| Status | Critical | `[data-status="critical"]` | `.nds-feedback` | A severe error. Error colors with an exclamation mark |
| Status | Critical | `status: 'critical'` | `create()` | The same, in JavaScript |
| Status | Success | `[data-status="success"]` | `.nds-feedback` | A confirmation |
| Status | Success | `status: 'success'` | `create()` | The same, in JavaScript |
| Status | Warning | `[data-status="warning"]` | `.nds-feedback` | A risk the user should know about |
| Status | Warning | `status: 'warning'` | `create()` | The same, in JavaScript |
| Status | Info | `[data-status="info"]` | `.nds-feedback` | News or a tip |
| Status | Info | `status: 'info'` | `create()` | The same, in JavaScript |
| Status | Neutral | `[data-status="neutral"]` | `.nds-feedback` | A general hint. Gray, with an "i" |
| Status | Neutral | `status: 'neutral'` | `create()` | The same, in JavaScript |
| Status | Help | `[data-status="help"]` | `.nds-feedback` | Help text. Gray, with a question mark |
| Status | Help | `status: 'help'` | `create()` | The same, in JavaScript |
| Size | Small (default) | `.nds-sm` | `.nds-feedback` | A 16px icon, for a message in a form or in text |
| Size | Medium | `.nds-md` | `.nds-feedback` | A 24px icon and larger text, for a status that stands alone |
| Size | Medium | `size: 'md'` | `create()` | The same, in JavaScript |
| Size | Large | `.nds-lg` | `.nds-feedback` | A 32px icon and large text, for the main status of a page or a panel |
| Size | Large | `size: 'lg'` | `create()` | The same, in JavaScript |
| Style | Outline (default) | `.nds-outline` | `.nds-feedback` | The icon drawn as a line in the status color |
| Style | Solid | — | — | A filled disc in the status color, with a white symbol. It is the look with no style class, and it is stronger than outline |
| Style | Solid | `style: ''` | `create()` | The same, in JavaScript |
| Style | Ring | `.nds-ring` | `.nds-feedback` | A solid disc with a light halo around it, for a status that must stand out |
| Style | Ring | `style: 'ring'` | `create()` | The same, in JavaScript |
{: #fbVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="feedbackBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Permanent Message
{: .nds-block-title}

A permanent message is a hint that stays in place, such as "Use 8 characters or more". Mark it with `data-permanent`, or `permanent: true` in `create()`. When a newer message arrives in the same place, the hint hides instead of being removed. When that newer message is dismissed, the hint shows again.

</div>
  </div>
</section>

<section id="feedbackFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-checkmark-circle-02"></i>
            <span class="nds-label">Auto Icon by Status</span>
          </span>
          <p class="nds-item-desc">The status picks the icon: a check for success, an exclamation mark for warning and critical, a cross for error, "i" for info and neutral, and a question mark for help. The icon element stays empty in the markup.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-hierarchy"></i>
            <span class="nds-label">Parent Status Inheritance</span>
          </span>
          <p class="nds-item-desc">A feedback icon inside any element with a <code class="nds-inline-code lang-html">data-status</code> takes that status, with no attribute of its own. This is how an alert, a form field and a progress bar color their icons.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-volume-high"></i>
            <span class="nds-label">Screen Reader Announcement</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-js">create()</code> marks the message so that a screen reader reads it when it appears. An error is read at once, and any other status after the screen reader finishes what it is reading.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-reload-horizontal"></i>
            <span class="nds-label">One Message per Place</span>
          </span>
          <p class="nds-item-desc">A new message replaces the one already in the same place, so messages never pile up. A target with <code class="nds-inline-code lang-html">hidden</code> shows while a message is in it, and hides again when the last one is dismissed.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="feedbackPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Match the status to the message: error for a failure, success for a confirmation, warning for a risk, info for news, neutral for a general hint and help for help text.
- Keep the message to one short sentence.
- Use an icon alone only where the text around it already says the status. The icon has no text for screen readers.
- Add a message from a script with `NDS.Feedback.create()`, not with your own markup, so a screen reader reads it.
- Use Small in forms and in text. Use Medium for a status that stands alone, and Large for the main status of a page or a panel.
- Keep Solid and Ring for a status that must stand out. Outline suits most messages.

</div>
  </div>
</section>

<section id="feedbackApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-status` | `.nds-feedback`, or any parent | `error`, `critical`, `success`, `warning`, `info`, `neutral` or `help`. Sets the icon and the colors |
| `data-permanent` | `.nds-feedback` | Makes the message permanent. See Behavior |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the `.nds-feedback-icon`, on the `.nds-feedback`, or on a parent. Each status sets its own colors and shapes.

| Property | Default | Controls |
|---|---|---|
| `--feedback-size` | `24px`, `16px` with `nds-sm`, `32px` with `nds-lg` | Size of the icon. `nds-sm`, `nds-md` and `nds-lg` set it on the `.nds-feedback`, so set yours on the `.nds-feedback-icon` to change a sized icon |
| `--feedback-color` | `var(--icon-neutral)` | Color of the outline icon. It changes in dark mode |
| `--feedback-icon-color` | `var(--feedback-icon-fill-neutral)` | Fill of the solid disc. It stays the same in dark mode, so the white symbol keeps its contrast |
| `--feedback-ring` | `var(--icon-neutral-ring)` | Color of the ring halo |
| `--feedback-symbol-color` | `var(--icon-oncolor)` | Color of the symbol on the solid disc |
| `--feedback-icon-symbol` | the "i" in a `.nds-feedback`, none elsewhere | Shape of the symbol, as an icon mask |
| `--feedback-icon-stroke` | `var(--nds-icon-information-circle)` | Shape of the outline icon, as an icon mask |
| `--feedback-icon-disc` | `var(--nds-icon-disc)` | Shape of the solid disc, as an icon mask |
| `--feedback-ring-inset` | 6% of the size | Inner edge of the ring, which closes the gap between the disc and the halo. `0` with `nds-outline` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

There is no `init()`: nothing scans the page for feedback. The script only builds messages.

| Method | Effect |
|---|---|
| `NDS.Feedback.create(options)` | Builds a message, puts it in place and returns the element. It replaces the message already in the same place |
| `NDS.Feedback.dismiss(elOrSelector)` | Removes one message, and shows again a permanent message it hid. Returns `true` when it existed |
| `NDS.Feedback.dismissAll(container)` | Removes every message in a container except the permanent ones, which show again |
{: .nds-table .nds-responsive}

| Option | Default | Effect |
|---|---|---|
| `message` | `''` | The message text. Leave it out for an icon alone |
| `status` | `'neutral'` | The status, as in `data-status` |
| `target` | `null` | The element or selector the message goes to |
| `position` | `'append'` | `'append'` or `'prepend'` puts it inside the target, `'before'` or `'after'` beside it |
| `size` | `'sm'` | `'sm'`, `'md'` or `'lg'` |
| `style` | `'outline'` | `'outline'`, `''` for solid, or `'ring'` |
| `showIcon` | `true` | `false` leaves out the icon |
| `permanent` | `false` | Makes the message permanent |
| `ariaLive` | from the status | `'assertive'` for error, else `'polite'` |
| `id`, `className` | none | An id and more classes for the message |
| `onCreate(el)`, `onDismiss()` | none | Run after the message is built, and when it is dismissed |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:feedbackCreate` | `document` | `{ feedback, options }`, after the message is in place |
| `nds:feedbackDismiss` | `document` | `{ feedback }`, before the message is removed |
{: .nds-table .nds-responsive}

<script type="text/html" id="fb-js-example" data-canon data-lang="js">
var hint = NDS.Feedback.create({
  message: 'Use 8 characters or more',
  status: 'help',
  target: '#password-hint',
  permanent: true
});
NDS.Feedback.create({
  message: 'The password is too short',
  status: 'error',
  target: '#password-hint'
});
// Later: the error goes, and the hint shows again
NDS.Feedback.dismissAll('#password-hint');
</script>

The full API is in the banner of `_js/nds-feedback.js`.

</div>
  </div>
</section>

<section id="feedbackRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Forms](../components/forms): `NDS.Forms.setStatus()` shows field messages with it.
- [Alert](../components/alert): the status icon at the start of every alert.
- [User Feedback](../components/user-feedback): the thank-you message after a vote.
- [Upload](../components/upload): the status of each file.

</div>
  </div>
</section>
