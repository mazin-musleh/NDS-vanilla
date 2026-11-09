---
layout: page
title: Modal
hero_title: Modal - National Design System
hero_description: A modal is a dialog over the page that asks the user to confirm, decide or finish a short task before going on.
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "09/11/2026 - 05:59 PM"
---

<section id="modal-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A modal is a `<dialog>` [card](../components/card) with the `nds-modal` class. A button with `data-modal-target` opens it. The modal keeps the card's parts: a header with a featured icon and a close button, the content, and the actions.

Pick another component when:

- the message does not stop the user: [Alert](../components/alert)
- the content supports the page and the user may keep working beside it: [Panels](../components/panel)
- the task has several steps or needs a lot of space: a page of its own, with a [Stepper](../components/stepper)

</div>
  </div>
</section>

<section id="modal-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="modal-dialog" data-canon data-variants="modal-variants-table">
<button type="button" class="nds-btn nds-primary nds-lg" data-modal-target="withdraw-modal">
  <span class="nds-label">Open Modal</span>
</button>
<dialog id="withdraw-modal" class="nds-modal nds-card nds-stroke" aria-labelledby="withdraw-modal-title">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle">
        <i class="nds-icon nds-hgi-information-circle" aria-hidden="true"></i>
      </span>
    </div>
    <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
    </button>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title" id="withdraw-modal-title">Withdraw the application?</span>
      <p class="nds-card-description">The application leaves the review queue. You can submit it again later.</p>
    </div>
  </div>
  <div class="nds-card-actions nds-col-sm">
    <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
      <span class="nds-label">Withdraw</span>
    </button>
    <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
      <span class="nds-label">Cancel</span>
    </button>
  </div>
</dialog>
</script>
<script type="text/html" id="modal-header-title" data-canon>
<button type="button" class="nds-btn nds-primary nds-lg" data-modal-target="conditions-modal">
  <span class="nds-label">Open Modal</span>
</button>
<dialog id="conditions-modal" class="nds-modal nds-card nds-stroke" aria-labelledby="conditions-modal-title">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle nds-sm">
        <i class="nds-icon nds-hgi-file-01" aria-hidden="true"></i>
      </span>
    </div>
    <div class="nds-card-text">
      <span class="nds-card-title" id="conditions-modal-title">Service conditions</span>
      <p class="nds-card-description">Read them before you submit the request.</p>
    </div>
    <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
    </button>
  </div>
  <div class="nds-card-content">
    <p>The service reviews a request within five working days. It may ask you for more documents during the review.</p>
    <p>A request that stays incomplete for 30 days closes. You can submit it again at any time.</p>
  </div>
  <div class="nds-card-actions nds-col-sm">
    <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
      <span class="nds-label">I agree</span>
    </button>
    <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
      <span class="nds-label">Cancel</span>
    </button>
  </div>
</dialog>
</script>
<script type="text/html" id="modal-scroll-more" data-canon>
<button type="button" class="nds-btn nds-primary nds-lg" data-modal-target="terms-modal">
  <span class="nds-label">Open Modal</span>
</button>
<dialog id="terms-modal" class="nds-modal nds-card nds-stroke" aria-labelledby="terms-modal-title">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle nds-sm">
        <i class="nds-icon nds-hgi-file-01" aria-hidden="true"></i>
      </span>
    </div>
    <div class="nds-card-text">
      <span class="nds-card-title" id="terms-modal-title">Terms of service</span>
      <p class="nds-card-description">Read them to the end before you agree.</p>
    </div>
    <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
      <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
    </button>
  </div>
  <div class="nds-card-content nds-scroll-more">
    <div class="nds-scroll-more-content nds-prose">
      <p>These terms apply to every request you submit through this service. By using the service, you agree to them.</p>
      <h3>Your information</h3>
      <p>You must give true and complete information, and keep it up to date while your request is open.</p>
      <ul>
        <li>A request with false information is closed, and the entity may take legal action.</li>
        <li>Upload documents that are clear and complete, in PDF, JPG or PNG, up to 5 MB each.</li>
        <li>A document in a language other than Arabic or English needs a certified translation.</li>
      </ul>
      <h3>How a request is reviewed</h3>
      <p>The service reviews a request within five working days. It may ask you for more documents during the review.</p>
      <ul>
        <li>You get a text message and an email at each step of the review.</li>
        <li>You have 10 working days to answer a request for more documents.</li>
        <li>A request that stays incomplete for 30 days closes. You can submit it again at any time.</li>
      </ul>
      <h3>Fees and refunds</h3>
      <p>The service fee is shown before you pay, and is charged when you submit the request.</p>
      <ul>
        <li>A request you cancel before the review starts is refunded in full within 14 days.</li>
        <li>A request that is rejected is not refunded, except where the law says otherwise.</li>
      </ul>
      <h3>Your data</h3>
      <p>The entity keeps your data for as long as the law requires, and uses it only to handle your request. It shares your data only with the government entities your request needs.</p>
      <p>You can ask to see the data the entity holds about you, and to correct it, through the Contact Us page.</p>
      <h3>Changes to these terms</h3>
      <p>The entity may change these terms. A change applies to requests submitted after it is published, and the date of the last change is shown at the top of this page.</p>
    </div>
    <button type="button" class="nds-btn nds-subtle nds-md nds-show-more">
      <span class="nds-label" data-i18n="scroll-more.show_more">Show more</span>
      <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
    </button>
  </div>
  <div class="nds-card-actions nds-col-sm">
    <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
      <span class="nds-label">I agree</span>
    </button>
    <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
      <span class="nds-label">Cancel</span>
    </button>
  </div>
</dialog>
</script>
<script type="text/html" id="modal-status" data-canon>
<button type="button" class="nds-btn nds-primary nds-lg" data-modal-target="submitted-modal">
  <span class="nds-label">Open Modal</span>
</button>
<dialog id="submitted-modal" class="nds-modal nds-card nds-stroke nds-center" data-status="success" aria-labelledby="submitted-modal-title">
  <div class="nds-card-header">
    <span class="nds-feedback nds-ring">
      <span class="nds-feedback-icon">
        <i class="nds-icon" aria-hidden="true"></i>
      </span>
    </span>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title" id="submitted-modal-title">Request submitted</span>
      <p class="nds-card-description">Your request reached the service. You get a message when the review is done.</p>
    </div>
  </div>
  <div class="nds-card-actions nds-col-sm">
    <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
      <span class="nds-label">Done</span>
    </button>
  </div>
</dialog>
</script>
<script type="text/html" id="modal-lazy" data-canon>
<button type="button" class="nds-btn nds-primary nds-lg" data-modal-target="lazy-modal">
  <span class="nds-label">Open Modal</span>
</button>
<template class="nds-modal-template">
  <dialog id="lazy-modal" class="nds-modal nds-card nds-stroke" aria-labelledby="lazy-modal-title">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon nds-circle">
          <i class="nds-icon nds-hgi-information-circle" aria-hidden="true"></i>
        </span>
      </div>
      <button type="button" class="nds-close nds-modal-close nds-btn nds-subtle nds-icon-only" aria-label="Close" data-i18n-aria-label="modal.close">
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title" id="lazy-modal-title">Terms of service</span>
        <p class="nds-card-description">This modal joins the page on the first click.</p>
      </div>
    </div>
    <div class="nds-card-actions nds-col-sm">
      <button type="button" class="nds-btn nds-primary nds-lg" data-modal-close>
        <span class="nds-label">Accept</span>
      </button>
      <button type="button" class="nds-btn nds-secondary-outline nds-lg" data-modal-close>
        <span class="nds-label">Cancel</span>
      </button>
    </div>
  </dialog>
</template>
</script>
    </div>
  </div>
</section>

<section id="modal-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every option goes on the `nds-modal` element. On a lazy modal, write it on the `nds-modal` inside the `<template>`. A Status option sets `data-status`: the [feedback](../components/feedback) chip in the header takes its icon and color from it, as in a status [card](../components/card).

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Dialog (default) | — | — | A question or a short task, with a close button and two actions |
| Structure | Header title (hint: The title beside the icon, over a form, a list or longer text) | canon `#modal-header-title` | — | A modal whose content is more than its message, such as a form, a list or terms to read. The title and description sit in the header beside the icon, as in a [Card](../components/card)'s header title, and the content holds the rest. A one-line title centers on the icon |
| Structure | Scroll more (hint: Long content that fades at its edge, with a Show more button) | canon `#modal-scroll-more` | — | A modal whose content runs longer than the screen, such as terms to read. The content scrolls in a [Scroll More](../components/scroll-more): its edge fades while more is below, and Show more scrolls on. The header and the actions stay in view |
| Structure | Status (demo: + size-sm) | canon `#modal-status` | — | The result of an action, centered, with a status chip and one action. It has no close button. It is a status [card](../components/card) in a dialog |
| Structure | Lazy modal | canon `#modal-lazy` | — | The modal sits in a `<template>` and joins the page on the first click. For a large modal that most users never open |
| Size | MD (default) | — | — | 600px wide. For a message with a short form |
| Size | SM (id: size-sm) | `.nds-sm` | `.nds-modal` | 400px wide. For a status or a confirmation with one or two buttons |
| Size | LG | `.nds-lg` | `.nds-modal` | 800px wide. For long content, such as terms of service or a data preview |
| Size | Full | `.nds-full` | `.nds-modal` | The width of the screen, less 64px on each side. For a large preview, such as a document or an image |
| Status | Success (default) | — | `.nds-modal.nds-center` | The action worked |
| Status | Error | `[data-status="error"]` | `.nds-modal.nds-center` | The action failed |
| Status | Warning | `[data-status="warning"]` | `.nds-modal.nds-center` | The action worked, with a risk the user should know about |
| Status | Info | `[data-status="info"]` | `.nds-modal.nds-center` | Neutral news about the action |
| Static | Static (hint: Escape and an overlay click do not close it) | `[data-modal-static]` | `.nds-modal` | Escape and a click on the overlay do not close the modal. For a choice the user must make |
{: #modal-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="modal-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Static
{: .nds-block-title}

`data-modal-static` turns off the two ways a user closes a modal by accident: Escape and a click on the overlay. The modal then closes only from a `data-modal-close` control or a script. Use it when the user must pick one of the actions. Keep a Cancel action in the modal, so the user always has a way out.

### Panels Below
{: .nds-block-title}

A modal opens above any open [panel](../components/panel) and leaves it open. When the modal closes, the panel is where the user left it.

### Lazy Modal
{: .nds-block-title}

A lazy modal keeps its markup in a `<template class="nds-modal-template">`, so it adds nothing to the page until the first click. The trigger stays outside the template. On that click, the modal joins the page, and NDS starts the components inside it. Put one modal in each template. Page search and search engines do not see content in a template, so do not use it for content people search for.

</div>
  </div>
</section>

<section id="modal-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-list nds-grid nds-flat nds-divided nds-horizontal">
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-plug-socket" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Auto-initialization</span>
              <p class="nds-card-description">Triggers and close controls work from their attributes, with no script of your own. A trigger added to the page later works too.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-focus-point" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Focus Management</span>
              <p class="nds-card-description">Focus moves to the field with <code class="nds-inline-code lang-html">autofocus</code> when the modal opens, else to the first close control, or to the modal when it has neither. The modal itself shows no focus ring. The page behind the modal is inert: Tab, a click and a screen reader cannot reach it. Focus goes back to the trigger when it closes.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-keyboard" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Keyboard Control</span>
              <p class="nds-card-description">Escape closes the modal, wherever focus is. When the modal itself has focus, Enter presses the first primary button in <code class="nds-inline-code lang-html">.nds-card-actions</code>.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-paint-board" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Backdrop Overlay</span>
              <p class="nds-card-description">A dimmed overlay covers the page, and a click on it closes the modal. Set <code class="nds-inline-code lang-css">--backdrop-blur</code> to blur the page behind it.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-lock-key" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Body Scroll Lock</span>
              <p class="nds-card-description">The page does not scroll while the modal is open.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-layers-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Pinned Header and Actions</span>
              <p class="nds-card-description">A modal is at most 80% of the screen height. Past that, only its content scrolls, so the header and the actions stay in view.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-mobile-programming-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Bottom Sheet on Phones</span>
              <p class="nds-card-description">On a phone, the modal slides up from the bottom, spans the full width and rounds only its top corners. Its action buttons stack, each at full width.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-motion-02" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Animations</span>
              <p class="nds-card-description">On a larger screen, the modal fades in and out.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-transition-left" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">One Modal at a Time</span>
              <p class="nds-card-description">Opening a modal closes the open one first. The new modal keeps its own settings, such as <code class="nds-inline-code lang-html">data-modal-static</code>.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-code-circle" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Programmatic Control</span>
              <p class="nds-card-description">Open and close a modal from a script, check whether one is open, and listen to its events.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="modal-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a modal only when the user must act before going on: confirm a submission, accept terms, or approve a delete.
- Do not use a modal for a success message the user does not have to act on. Use an [Alert](../components/alert) or a toast, which the Alert page also covers.
- Do not open a modal from a modal. Change the flow so one modal holds the decision.
- Write a title that names the action, and keep the content to one message or one task.
- Put the title and description in the header, beside the icon, when the modal holds a form, a list, a table or longer text. Keep them in the content when they are the whole message, such as a confirm or a status.
- For content longer than the screen, such as terms to read, use the Scroll more structure. Its edge fades while more is below, and Show more scrolls on, so the user sees there is more before reaching the actions.
- With the title in the header, the icon is optional. Leave it out when the title is long, so the title gets the full width of the header.
- Give the modal a clear primary action and a way out, such as Confirm and Cancel.
- Give every modal an `id`, and give its trigger that `id` in `data-modal-target`.
- Make the modal a `<dialog>`. A closed dialog stays hidden, also before the script loads. `NDS.init.audit()` flags a `div.nds-modal`.
- Give the modal an `aria-labelledby` that points to its title. Give the close button an `aria-label`.
- Use `role="alertdialog"` instead for an urgent message the user did not ask for, such as a session that is about to end.
- Give every button `type="button"`. In a form, a button without it submits the form.
- Put `.nds-card-actions` after `.nds-card-content`, not inside it. A form's buttons go there too, never in a `.nds-form-actions` inside the content, where they scroll away. `NDS.init.audit()` flags both.
- Keep `nds-col-sm` on `.nds-card-actions`. On a phone the modal is a bottom sheet, and the buttons stack in it, each filling the width.
- For a form, wrap `.nds-card-content` and `.nds-card-actions` in one `<form class="nds-form">`. A form without `nds-form` breaks the layout: the content runs out of the modal and the actions leave the screen. It also gets no submit validation. `NDS.init.audit()` flags it.
- A [Dropmenu](../components/dropmenu), a select, a [Multiselect](../components/multiselect), an [Autocomplete](../components/autocomplete) or a [Filter](../components/filter) works in a modal with no extra attribute. Its menu opens in the browser's top layer, so the modal's edge does not cut it off.
- Do not look up a lazy modal when the page loads: it is not in the page yet. Listen on `document` for `nds:template:ready`, which fires on the modal after it joins the page and its components start.

</div>
  </div>
</section>

<section id="modal-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-modal` | `<dialog class="nds-card">` | Turns the card into a dialog over the page |
| `nds-md` | `.nds-modal` | 600px wide, the same as no size class |
| `nds-modal-close` | a button in the modal | Closes the modal, like `data-modal-close`, and removes the button's padding |
| `nds-modal-template` | `<template>` | Holds a lazy modal |
{: .nds-table .nds-responsive}

The card parts, colors and `nds-center` are on the [Cards](../components/card) page.

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-modal-target` | any button on the page | Opens the modal whose `id` is its value |
| `data-modal-close` | any element in the modal | Closes the modal |
| `data-modal-static` | `.nds-modal` | Escape and a click on the overlay do not close the modal |
| `data-status` | `.nds-modal` | The status color: `success`, `error`, `warning`, `info`, `critical` or `neutral`. See [Cards](../components/card) |
| `data-state` | `.nds-modal` | The script writes `open` while the modal is open and `closing` while it animates out. Do not set it yourself |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `:root`. They style the overlay behind every modal and modal panel.

| Property | Default | Controls |
|---|---|---|
| `--backdrop-bg` | `var(--background-overlay)` | The overlay color |
| `--backdrop-blur` | `none` | A `backdrop-filter` for the page behind the overlay, such as `blur(4px)` |
{: .nds-table .nds-responsive}

### Tokens
{: .nds-block-title}

It reads these shared tokens. A change to one also changes other components: see [Tokens](../foundations/tokens).

Source: the `var()` reads in `_sass/components/_modal.scss`.

{{ site.data.tokens.reads.modal.html }}

### JavaScript
{: .nds-block-title}

The `NDS.Modal` script loads after the page shows. Until it loads, each call loads it and returns a promise of the result, so `await` a call whose result you use.

| Method | Effect |
|---|---|
| `NDS.Modal.open(modal)` | Opens the modal. It takes the element or its `id`. An open modal closes first. For a lazy modal, pass its `id`: the element is not in the page yet |
| `NDS.Modal.close()` | Closes the open modal. It takes no argument |
| `NDS.Modal.isOpen()` | Returns `true` while a modal is open |
| `NDS.Modal.init()` | Starts the trigger and close handlers on `document`. NDS calls it when the page loads, and a second call does nothing |
| `NDS.Modal.destroy(root)` | Closes an open modal inside `root` at once, before you remove its markup. Without it, the page does not scroll. `NDS.init.destroy(root)` calls it for you |
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

<section id="modal-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Manage Records](../examples/manage-records): a large modal with a form to edit a record, and a small modal to confirm a delete.
- [Scroll More](../components/scroll-more): the scrolling content of the Scroll more structure.
- [Life Journey Template](../templates/life-journey-template): an intro modal whose slides scroll in a Scroll More.

</div>
  </div>
</section>
