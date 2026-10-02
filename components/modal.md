---
layout: page
title: Modal
hero_title: Modal - National Design System
hero_description: A modal is a dialog over the page that asks the user to confirm, decide or finish a short task before going on.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "02/10/2026 - 09:34 PM"
---

<section id="modalOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A modal is a [card](../components/cards) with the `nds-modal` class. A button with `data-modal-target` opens it. The modal keeps the card's parts: a header with a featured icon and a close button, the content, and the actions.

Pick another component when:

- the message does not stop the user: [Alert](../components/alert)
- the content supports the page and the user may keep working beside it: [Panels](../components/panels)
- the task has several steps or needs a lot of space: a page of its own, with a [Stepper](../components/stepper)

</div>
  </div>
</section>

<section id="modalMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="modal-dialog" data-canon data-variants="modalVariantsTable">
<button type="button" class="nds-btn nds-primary nds-lg" data-modal-target="withdraw-modal">
  <span class="nds-label">Open Modal</span>
</button>
<div id="withdraw-modal" class="nds-modal nds-card nds-stroke" role="dialog" aria-modal="true" aria-labelledby="withdraw-modal-title" aria-hidden="true" hidden>
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle">
        <i class="nds-icon nds-hgi-information-circle" aria-hidden="true"></i>
      </span>
    </div>
    <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle" aria-label="Close">
      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
    </button>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title" id="withdraw-modal-title">Withdraw the application?</span>
      <p class="nds-card-description">The application leaves the review queue. You can submit it again later.</p>
    </div>
  </div>
  <div class="nds-card-actions">
    <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
      <span class="nds-label">Withdraw</span>
    </button>
    <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
      <span class="nds-label">Cancel</span>
    </button>
  </div>
</div>
</script>
<script type="text/html" id="modal-status" data-canon>
<button type="button" class="nds-btn nds-primary nds-lg" data-modal-target="submitted-modal">
  <span class="nds-label">Open Modal</span>
</button>
<div id="submitted-modal" class="nds-modal nds-card nds-stroke nds-center" data-status="success" role="dialog" aria-modal="true" aria-labelledby="submitted-modal-title" aria-hidden="true" hidden>
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-xl nds-circle">
        <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
      </span>
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title" id="submitted-modal-title">Request submitted</span>
      <p class="nds-card-description">Your request reached the service. You get a message when the review is done.</p>
    </div>
  </div>
  <div class="nds-card-actions">
    <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
      <span class="nds-label">Done</span>
    </button>
  </div>
</div>
</script>
<script type="text/html" id="modal-lazy" data-canon>
<button type="button" class="nds-btn nds-primary nds-lg" data-modal-target="terms-modal">
  <span class="nds-label">Open Modal</span>
</button>
<template class="nds-modal-template">
  <div id="terms-modal" class="nds-modal nds-card nds-stroke" role="dialog" aria-modal="true" aria-labelledby="terms-modal-title" aria-hidden="true" hidden>
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon nds-circle">
          <i class="nds-icon nds-hgi-information-circle" aria-hidden="true"></i>
        </span>
      </div>
      <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle" aria-label="Close">
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title" id="terms-modal-title">Terms of service</span>
        <p class="nds-card-description">This modal joins the page on the first click.</p>
      </div>
    </div>
    <div class="nds-card-actions">
      <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
        <span class="nds-label">Accept</span>
      </button>
      <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
        <span class="nds-label">Cancel</span>
      </button>
    </div>
  </div>
</template>
</script>
<script type="text/html" id="modal-icon-error" data-canon>
<i class="nds-icon nds-hgi-cancel-circle" aria-hidden="true"></i>
</script>
<script type="text/html" id="modal-icon-warning" data-canon>
<i class="nds-icon nds-hgi-alert-circle" aria-hidden="true"></i>
</script>
<script type="text/html" id="modal-icon-info" data-canon>
<i class="nds-icon nds-hgi-information-circle" aria-hidden="true"></i>
</script>
    </div>
  </div>
</section>

<section id="modalVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every option goes on the `nds-modal` element. On a lazy modal, write it on the `nds-modal` inside the `<template>`. Each Status option has three rows: set `data-status`, and swap the icon in the featured icon for that status's icon. Make all three changes.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Dialog (default) | — | — | A question or a short task, with a close button and two actions |
| Structure | Status (demo: + size-sm) | canon `#modal-status` | — | The result of an action, centered, with a large icon and one action. It has no close button |
| Structure | Lazy modal | canon `#modal-lazy` | — | The modal sits in a `<template>` and joins the page on the first click. For a large modal that most users never open |
| Size | MD (default) | — | — | 600px wide. For a message with a short form |
| Size | SM (id: size-sm) | `.nds-sm` | `.nds-modal` | 400px wide. For a status or a confirmation with one or two buttons |
| Size | LG | `.nds-lg` | `.nds-modal` | 800px wide. For long content, such as terms of service or a data preview |
| Size | Full | `.nds-full` | `.nds-modal` | The width of the screen, less 64px on each side. For a large preview, such as a document or an image |
| Status | Success (default) | — | `.nds-modal.nds-center` | The action worked |
| Status | Error | `[data-status="error"]` | `.nds-modal.nds-center` | The action failed |
| Status | Error | remove | `.nds-featured-icon.nds-xl > .nds-hgi-checkmark-circle-02` | The action failed |
| Status | Error | canon `#modal-icon-error` | `.nds-featured-icon.nds-xl` | The action failed |
| Status | Warning | `[data-status="warning"]` | `.nds-modal.nds-center` | The action worked, with a risk the user should know about |
| Status | Warning | remove | `.nds-featured-icon.nds-xl > .nds-hgi-checkmark-circle-02` | The action worked, with a risk the user should know about |
| Status | Warning | canon `#modal-icon-warning` | `.nds-featured-icon.nds-xl` | The action worked, with a risk the user should know about |
| Status | Info | `[data-status="info"]` | `.nds-modal.nds-center` | Neutral news about the action |
| Status | Info | remove | `.nds-featured-icon.nds-xl > .nds-hgi-checkmark-circle-02` | Neutral news about the action |
| Status | Info | canon `#modal-icon-info` | `.nds-featured-icon.nds-xl` | Neutral news about the action |
| Static | Static (hint: Escape and an overlay click do not close it) | `[data-modal-static]` | `.nds-modal` | Escape and a click on the overlay do not close the modal. For a choice the user must make |
{: #modalVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="modalBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Static
{: .nds-block-title}

`data-modal-static` turns off the two ways a user closes a modal by accident: Escape and a click on the overlay. The modal then closes only from a `data-modal-close` control or a script. Use it when the user must pick one of the actions. Keep a Cancel action in the modal, so the user always has a way out.

### Lazy Modal
{: .nds-block-title}

A lazy modal keeps its markup in a `<template class="nds-modal-template">`, so it adds nothing to the page until the first click. The trigger stays outside the template. On that click, the modal joins the page, and NDS starts the components inside it. Put one modal in each template. Page search and search engines do not see content in a template, so do not use it for content people search for.

</div>
  </div>
</section>

<section id="modalFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Triggers and close controls work from their attributes, with no script of your own. A trigger added to the page later works too.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-focus-point"></i>
            <span class="nds-label">Focus Management</span>
          </span>
          <p class="nds-item-desc">Focus moves to the first close control when the modal opens, or to the modal when it has none. Tab and Shift + Tab stay inside the modal. Focus goes back to the trigger when it closes.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Dismissal</span>
          </span>
          <p class="nds-item-desc">Escape closes the modal.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paint-board"></i>
            <span class="nds-label">Backdrop Overlay</span>
          </span>
          <p class="nds-item-desc">A dimmed overlay covers the page, and a click on it closes the modal. Set <code class="nds-inline-code lang-css">--backdrop-blur</code> to blur the page behind it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-lock-key"></i>
            <span class="nds-label">Body Scroll Lock</span>
          </span>
          <p class="nds-item-desc">The page does not scroll while the modal is open.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Pinned Header and Actions</span>
          </span>
          <p class="nds-item-desc">A modal is at most 80% of the screen height. Past that, only its content scrolls, so the header and the actions stay in view.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-mobile-programming-01"></i>
            <span class="nds-label">Bottom Sheet on Phones</span>
          </span>
          <p class="nds-item-desc">On a phone, the modal slides up from the bottom, spans the full width and rounds only its top corners. Its action buttons stack, each at full width.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-motion-02"></i>
            <span class="nds-label">Animations</span>
          </span>
          <p class="nds-item-desc">On a larger screen, the modal fades in and out.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-transition-left"></i>
            <span class="nds-label">One Modal at a Time</span>
          </span>
          <p class="nds-item-desc">Opening a modal closes the open one first.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code-circle"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Open and close a modal from a script, check whether one is open, and listen to its events.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="modalPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a modal only when the user must act before going on: confirm a submission, accept terms, or approve a delete.
- Do not use a modal for a success message the user does not have to act on. Use an [Alert](../components/alert) or a toast, which the Alert page also covers.
- Do not open a modal from a modal. Change the flow so one modal holds the decision.
- Write a title that names the action, and keep the content to one message or one task.
- Give the modal a clear primary action and a way out, such as Confirm and Cancel.
- Give every modal an `id`, and give its trigger that `id` in `data-modal-target`.
- Ship the modal with `hidden` and `aria-hidden="true"`, so it never shows before the script loads.
- Give the modal `role="dialog"`, `aria-modal="true"` and an `aria-labelledby` that points to its title. Give the close button an `aria-label`.
- Give every button `type="button"`. In a form, a button without it submits the form.
- Put `.nds-card-actions` after `.nds-card-content`, not inside it.
- A [Dropmenu](../components/dropmenu), a select, a [Multiselect](../components/multiselect), an [Autocomplete](../components/autocomplete) or a [Filter](../components/filter) works in a modal with no extra attribute. Its menu moves to `<body>` when it opens, so the modal's edge does not cut it off.
- Do not look up a lazy modal when the page loads: it is not in the page yet. Listen on `document` for `nds:template:ready`, which fires on the modal after it joins the page and its components start.

</div>
  </div>
</section>

<section id="modalApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-modal` | `.nds-card` | Turns the card into a dialog over the page |
| `nds-md` | `.nds-modal` | 600px wide, the same as no size class |
| `nds-modal-close` | a button in the modal | Closes the modal, like `data-modal-close`, and removes the button's padding |
| `nds-modal-template` | `<template>` | Holds a lazy modal |
{: .nds-table .nds-responsive}

The card parts, colors and `nds-center` are on the [Cards](../components/cards) page.

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-modal-target` | any button on the page | Opens the modal whose `id` is its value |
| `data-modal-close` | any element in the modal | Closes the modal |
| `data-modal-static` | `.nds-modal` | Escape and a click on the overlay do not close the modal |
| `data-status` | `.nds-modal` | The status color: `success`, `error`, `warning`, `info`, `critical` or `neutral`. See [Cards](../components/cards) |
| `data-state` | `.nds-modal` | The script writes `open` while the modal is open and `closing` while it animates out. Do not set it yourself |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

The overlay is one element that every modal and panel shares. Set these on `:root`.

| Property | Default | Controls |
|---|---|---|
| `--backdrop-bg` | `var(--background-overlay)` | The overlay color |
| `--backdrop-blur` | `none` | A `backdrop-filter` for the page behind the overlay, such as `blur(4px)` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

The modal needs `nds-backdrop.js` in the bundle. Without it, the modal logs an error and does not open.

| Method | Effect |
|---|---|
| `NDS.Modal.open(modal)` | Opens the modal. It takes the element or its `id`. An open modal closes first. For a lazy modal, pass its `id`: the element is not in the page yet |
| `NDS.Modal.close()` | Closes the open modal. It takes no argument |
| `NDS.Modal.isOpen()` | Returns `true` while a modal is open |
| `NDS.Modal.init()` | Starts the trigger, close and Escape handlers on `document`. NDS calls it when the page loads, and a second call does nothing |
| `NDS.Modal.destroy(root)` | Closes an open modal inside `root` at once, before you remove its markup. Without it, the overlay and the scroll lock stay. `NDS.Init.destroy(root)` calls it for you |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:modal:opened` | `.nds-modal` | None. Fires after the modal shows |
| `nds:modal:closed` | `.nds-modal` | None. Fires after the close animation ends, not on the click |
| `nds:template:ready` | `.nds-modal` | `{ id }`, when a lazy modal joins the page |
{: .nds-table .nds-responsive}

<script type="text/html" id="modal-js" data-canon data-lang="js">
document.getElementById('withdraw-modal').addEventListener('nds:modal:closed', function () {
  console.log('Withdraw modal closed');
});
NDS.Modal.open('withdraw-modal');
</script>

The full API is in the banner of `_js/nds-modal.js`.

</div>
  </div>
</section>

<section id="modalRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Manage Records](../examples/manage-records): a large modal with a form to edit a record, and a small modal to confirm a delete.

</div>
  </div>
</section>
