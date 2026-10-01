---
layout: page
title: Stepper
hero_title: Stepper - National Design System
hero_description: A stepper shows where the user is in a flow of steps, such as a service application, with the steps done, the current step and the steps to come.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "02/10/2026 - 01:12 AM"
---

<section id="stepperOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A stepper is a `.nds-stepper` of `.nds-stepper-step` items. Each step has a base with a numbered circle, and content with a title and a description. The script marks each step completed, current or upcoming from the stepper's `data-current`, and the line between two circles takes the color of that state. A radial stepper shows only the current step, beside a ring that fills as the user moves on.

Pick another component when:

- the progress is a percentage, or has no fixed steps: [Progress](../components/progress)
- the user opens the parts in any order: [Tabs](../components/tabs)
- the user pages through one long list: [Pagination](../components/pagination)

</div>
  </div>
</section>

<section id="stepperMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="stepper-steps" data-canon data-variants="stepperVariantsTable" data-harness="stepper">
<div class="nds-stepper" id="application-stepper" data-current="2">
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Personal Information</span>
        <span class="nds-stepper-description">Identity details and contact information</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Document Upload</span>
        <span class="nds-stepper-description">Upload the required documents</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Review</span>
        <span class="nds-stepper-description">Check the details before you submit</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Submission</span>
        <span class="nds-stepper-description">Confirmation and next steps</span>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="stepper-radial" data-canon>
<div class="nds-stepper nds-radial" id="application-stepper" data-current="2">
  <div class="nds-progress-circle">
    <svg width="64" height="64" viewBox="0 0 24 24">
      <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
      <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="3"
        stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
    </svg>
    <div class="nds-progress-info">
      <span class="nds-progress-steps"></span>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Personal Information</span>
        <span class="nds-stepper-description">Identity details and contact information</span>
        <span class="nds-stepper-next">Next: Document Upload</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Document Upload</span>
        <span class="nds-stepper-description">Upload the required documents</span>
        <span class="nds-stepper-next">Next: Review</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Review</span>
        <span class="nds-stepper-description">Check the details before you submit</span>
        <span class="nds-stepper-next">Next: Submission</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content">
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">Submission</span>
        <span class="nds-stepper-description">Confirmation and next steps</span>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="stepper-label-1" data-canon>
<div class="nds-divider">4 January 2026</div>
</script>
<script type="text/html" id="stepper-label-2" data-canon>
<div class="nds-divider">6 January 2026</div>
</script>
<script type="text/html" id="stepper-label-3" data-canon>
<div class="nds-divider">11 January 2026</div>
</script>
<script type="text/html" id="stepper-label-4" data-canon>
<div class="nds-divider">Pending</div>
</script>
    </div>
  </div>
</section>

<section id="stepperVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every class goes on `.nds-stepper`. A Divider choice has one row for each step: write a divider at the start of every step's content. A size class gives a different size on the Radial structure, as its Use cell says. Card view has one row for each layout it works in.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Steps (default) | — | — | Every step in a row or a column, each with a numbered circle. For a form or a service request |
| Structure | Radial | canon `#stepper-radial` | — | The current step only, beside a progress ring. For a narrow space, such as a phone or a side column |
| Layout | Horizontal (default) | — | `.nds-stepper:not(.nds-radial)` | The steps in a row, start to end. Every title must fit its column |
| Layout | Vertical | `.nds-vertical` | `.nds-stepper:not(.nds-radial):not(.nds-center)` | The steps in a column. For a step with long content or buttons, or a narrow column |
| Size | XS | `.nds-xs` | `.nds-stepper.nds-radial` | A 40px ring with smaller text. Radial only |
| Size | SM | `.nds-sm` | `.nds-stepper.nds-radial` | A 48px ring with smaller text. Radial only |
| Size | MD (default) | — | — | 32px circles, or a 64px ring on Radial |
| Size | LG | `.nds-lg` | `.nds-stepper:not(.nds-dot)` | 40px circles, or an 80px ring |
| Size | XL | `.nds-xl` | `.nds-stepper:not(.nds-dot)` | 48px circles, or a 120px ring with a larger title |
| Desktop | Radial (default) | — | `.nds-stepper.nds-radial` | Radial on every screen size |
| Desktop | Horizontal | `.nds-horizontal-lg` | `.nds-stepper.nds-radial` | Radial on phones and tablets, horizontal on a desktop. See Responsive Layout under Behavior |
| Desktop | Vertical | `.nds-vertical-lg` | `.nds-stepper.nds-radial` | Radial on phones and tablets, vertical on a desktop |
| Dot | Dot | `.nds-dot` | `.nds-stepper:not(.nds-radial):not(.nds-lg):not(.nds-xl)` | 16px dots with no numbers. For a timeline, or a short flow where the order is plain. A dot has one size |
| Divider | Divider (hint: A divider label in each step) | — | `.nds-stepper.nds-vertical` | A divider at the start of each step, as its label: a date, a phase name, or a group of steps. Vertical only. With Dot and Reverse it makes a timeline. See Divider Labels under Behavior |
| Divider | Divider (hint: A divider label in each step) | canon `#stepper-label-1` | `.nds-stepper-step:nth-child(1) > .nds-stepper-content` (start) | The label of step 1 |
| Divider | Divider (hint: A divider label in each step) | canon `#stepper-label-2` | `.nds-stepper-step:nth-child(2) > .nds-stepper-content` (start) | The label of step 2 |
| Divider | Divider (hint: A divider label in each step) | canon `#stepper-label-3` | `.nds-stepper-step:nth-child(3) > .nds-stepper-content` (start) | The label of step 3 |
| Divider | Divider (hint: A divider label in each step) | canon `#stepper-label-4` | `.nds-stepper-step:nth-child(4) > .nds-stepper-content` (start) | The label of step 4 |
| Center | Center | `.nds-center` | `.nds-stepper:not(.nds-vertical):not(.nds-radial)` | Centers each title under its circle |
| Reverse | Reverse | `.nds-reverse` | `.nds-stepper.nds-vertical` | The last step at the top. Write the steps oldest first |
| Card view | Card view | `.nds-cardView` | `.nds-stepper.nds-vertical` | Each step's content in a card. With On color, the card is the translucent white of a card on a colored background. Do not put a [Card](../components/cards) in the step as well |
| Card view | Card view | `.nds-cardView` | `.nds-stepper.nds-radial` | The whole stepper in one card |
| Neutral | Neutral | `.nds-neutral` | `.nds-stepper.nds-radial` | A gray ring in place of the primary color |
| On color | On color | `.nds-oncolor` | `.nds-stepper` | Light circles, lines and text, for a dark or brand background |
| Loading | Loading (hint: Skeleton placeholders) | `.nds-loading` | `.nds-stepper` | Every step shows as a skeleton while its data loads. Remove the class when the data is in |
{: #stepperVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="stepperBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Step Controls
{: .nds-block-title}

A button with `data-stepper-control` moves the stepper on every click, with no check. Use it only where nothing can refuse the move: a Back button, a walkthrough, or a Start Over button with `goto`. `data-stepper-target` names the stepper. Without it, the button moves the stepper it sits in, or else the first stepper on the page. The Back and Next buttons under the preview work this way.

### Checked Moves
{: .nds-block-title}

When something can refuse the move, such as validation or a request, call `NDS.Stepper.next(id)` from the code that gets the answer. Every form step is this case: the stepper never validates and never sends a request. A submit button with `data-stepper-control` inside a form is left to the form, so the stepper does not move and does not stop the submit. The example under API moves the stepper only when the step is valid.

### Completion
{: .nds-block-title}

`next()` on the last step marks it completed and writes `completed` in the stepper's `data-state`. `previous()` then makes the last step current again. To show a finished flow at page load, write a `data-current` one past the last step. In the radial layout, the last step stays in view with a full ring.

### Radial
{: .nds-block-title}

The radial layout shows the current step only, beside a ring. The script fills the ring and writes the step and the count in it, such as "2 / 4". `.nds-stepper-next` under the description names the next step. Other layouts hide the ring and the next-step line, so one markup serves every layout.

### Responsive Layout
{: .nds-block-title}

A breakpoint class picks the layout on one screen size: `nds-radial-sm` on a phone, `nds-vertical-md` on a tablet, `nds-horizontal-lg` on a desktop. Where no breakpoint class matches, the stepper uses its layout class: `nds-vertical`, `nds-radial`, or none for horizontal. `nds-radial nds-vertical-lg` is radial on phones and tablets, and vertical on a desktop. Pick Desktop on the Radial structure, then make the window narrower to see the change. A stepper that is radial on any size needs the ring markup.

### Divider Labels
{: .nds-block-title}

In a vertical stepper, a [Divider](../utilities/divider) at the start of a step's content labels the step: a date, a phase name, or the name of a group of steps. Its line meets the circle and runs on as the separator between steps. With `nds-dot` and `nds-reverse` it makes a timeline, such as a career history. Write the steps oldest first, and the newest shows on top.

</div>
  </div>
</section>

<section id="stepperFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">The script starts every <code class="nds-inline-code lang-html">nds-stepper</code> on the page. There is nothing to call.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-workflow-circle-06"></i>
            <span class="nds-label">Automatic State Management</span>
          </span>
          <p class="nds-item-desc">Write <code class="nds-inline-code lang-html">data-current</code> and the script marks every step completed, current or upcoming. Write a new number later and the steps change with it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-sorting-1-9"></i>
            <span class="nds-label">Automatic Numbers</span>
          </span>
          <p class="nds-item-desc">CSS numbers the circles in order, and a completed step shows a check mark. <code class="nds-inline-code lang-html">data-step-text</code> on a circle shows other text in place of the number.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-dashed-line-circle"></i>
            <span class="nds-label">Placeholders Before Start</span>
          </span>
          <p class="nds-item-desc">Until the script starts, each step shows as a skeleton in its final layout. A radial stepper shows its first step, so it never shows empty.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-notification-03"></i>
            <span class="nds-label">Step Change Events</span>
          </span>
          <p class="nds-item-desc">The stepper fires <code class="nds-inline-code lang-js">nds:stepper:change</code> after every move, with the current step, the step count and the percent done.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-target-01"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">A script moves a stepper with <code class="nds-inline-code lang-js">NDS.Stepper.next(id)</code>, <code class="nds-inline-code lang-js">NDS.Stepper.previous(id)</code> and <code class="nds-inline-code lang-js">NDS.Stepper.goTo(id, step)</code>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="stepperPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Give the stepper an `id`. Control buttons and the JavaScript methods find the stepper by its id.
- Keep a title to 2 to 4 words. Put the rest in the description.
- Keep a horizontal stepper to 3 to 5 steps, so every title fits its column. A radial stepper reads best with 3 to 6 steps.
- A horizontal stepper has no room on a phone. Add `nds-radial-sm` and the ring markup, so a phone shows the radial layout.
- Move a form step with `NDS.Stepper.next()`, not `data-stepper-control`. Validation or a request can refuse the move.
- Give every control button `type="button"`. Inside a form, a button with no type is a submit button, and the stepper leaves it to the form.
- Write `.nds-stepper-next` in every radial step except the last.
- To change the layout after load, change the class on the stepper. CSS alone sets the layout, so the change shows at once.
- Name the current step in the page as well, such as in the form heading. The stepper shows the step to the eye only, and a screen reader does not announce it.

</div>
  </div>
</section>

<section id="stepperApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-horizontal-sm`, `nds-vertical-sm`, `nds-radial-sm` | `.nds-stepper` | The layout on a phone: narrower than 600px. See Responsive Layout under Behavior |
| `nds-horizontal-md`, `nds-vertical-md`, `nds-radial-md` | `.nds-stepper` | The layout on a tablet: 600px to 959px |
| `nds-horizontal-lg`, `nds-vertical-lg`, `nds-radial-lg` | `.nds-stepper` | The layout on a desktop: 960px and wider |
| `nds-md` | `.nds-stepper.nds-radial` | The 64px ring. It is the default, so it needs no class |
| `nds-stepper-action` | `div` in `.nds-stepper-content` | A row of buttons in a step. Each button takes an equal share of the row |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-current` | `.nds-stepper` | The current step, from 1. Write it at page load: without it, step 1 is current. The script watches it, so code that holds the step number, such as a framework view, can write it: write a new number and the steps change, and `nds:stepper:change` fires. A number one past the last step shows every step completed |
| `data-total` | `.nds-stepper` | The number of steps. The script writes it when it starts. After you add or remove steps, write the new count in it, and the script reads the steps again |
| `data-state` | `.nds-stepper` | The script writes `completed` when `next()` runs on the last step, or when `data-current` is past it. It removes it when the stepper moves back. Write `loading` yourself to show the skeleton: it works the same as `nds-loading` |
| `data-state` | `.nds-stepper-step` | The script writes `completed`, `current` or `upcoming` on each step from `data-current`. Do not write it yourself |
| `data-step-text` | `.nds-stepper-circle` | Text in place of the step number, such as a letter. A completed step shows its check mark, and a dot shows no text |
| `data-stepper-control` | `button` | `next`, `previous` or `goto`. The click moves the stepper. See Step Controls under Behavior |
| `data-stepper-target` | `button` with `data-stepper-control` | The id of the stepper the button moves |
| `data-stepper-value` | `button` with `data-stepper-control="goto"` | The step number to go to |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-stepper`. The size classes set `--stepper-size` too, so set it in the stepper's `style` to win over them.

| Property | Default | Controls |
|---|---|---|
| `--stepper-size` | `32px` | Circle diameter, or ring diameter on a radial stepper |
| `--stepper-gap` | from the layout | Space between steps. Unset, it is `--stepper-indicator-gap` in a row (1.2 times with `nds-lg`, 1.5 times with `nds-xl`), 1.5 circles in a column, half a circle in a column of cards, and a spacing token that grows with the size on Radial |
| `--stepper-indicator-gap` | `var(--spacing-md)` | The space between steps in a row, before the size classes scale it |
| `--stepper-text-padding` | `var(--spacing-xl)` | Space between the circle and the step content |
| `--gap` | `var(--spacing-xl)` | Space between the parts of a step's content: a label divider, the text, a list, a row of buttons |
| `--stepper-content-width` | `var(--paragraph-max-width)` | The widest a step's content gets. Set `none` for a step that holds a table or a wide image |
| `--divider-lift` | `calc(var(--stepper-size) / 4)` | Moves a label divider down, so its line meets the middle of the circle. `0` with `nds-dot` or `nds-cardView`. Set `0` to leave the divider where it falls |
| `--stepper-card-lift` | `calc(var(--stepper-size) / 4)` | How far `nds-cardView` raises each card in a column, so its first line meets the circle. `var(--stepper-size)` with `nds-dot`. Set it when the content starts with something taller or shorter than a title |
| `--stepper-title-FS`, `--stepper-title-LH` | set by the size class | Title font size and line height on a radial stepper. The text does not grow with the ring, so set them for a large title beside a small ring. Set both |
| `--stepper-description-FS`, `--stepper-description-LH` | set by the size class | Font size and line height of the description and the next-step line on a radial stepper |
{: .nds-table .nds-responsive}

The theme-wide stepper colors are the `--stepper-button-*`, `--stepper-text-*` and `--stepper-line-*` tokens. See [Tokens](../components/tokens).

### JavaScript
{: .nds-block-title}

A stepper in the page starts by itself. The instance is on the element as `el.ndsStepper`, and `NDS.Stepper.get(id)` returns it.

| Method | Effect |
|---|---|
| `NDS.Stepper.init()` | Starts every `.nds-stepper` that has not started. `reinit()` is the same |
| `NDS.Stepper.create(el)` | Starts one stepper, such as one added after load, and returns its instance |
| `NDS.Stepper.get(id)` | Returns the instance of the stepper with that id |
| `NDS.Stepper.next(id)`, `NDS.Stepper.previous(id)` | Moves one step. On the last step, `next()` marks it completed |
| `NDS.Stepper.goTo(id, step)` | Moves to a step number. Returns `false` for a number outside the steps |
| `NDS.Stepper.control(id, action, value)` | What a control button calls. `action` is `next`, `previous` or `goto`, and `value` is the step for `goto` |
| `instance.next()`, `instance.previous()`, `instance.goTo(step)` | The same moves on one instance |
| `instance.current`, `instance.total`, `instance.progress` | The current step, the number of steps, and the percent done |
| `instance.destroy()` | Removes the instance and its start marks, so `init()` can start the stepper again |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:stepper:change` | `.nds-stepper`, and bubbles | `currentStep`, `totalSteps`, `progressPercentage`. Fires after every move, and after a script writes `data-current` or `data-total`. It does not fire when the stepper starts |
{: .nds-table .nds-responsive}

<script type="text/html" id="stepper-js" data-canon data-lang="js">
// Continue: move only when the step on screen is valid.
// The button sits in the form. validateForm() skips the fields in a hidden step.
document.getElementById('continue-button').addEventListener('click', function (e) {
  if (NDS.Forms.validateForm(e.currentTarget).valid) NDS.Stepper.next('application-stepper');
});

// Change something outside the stepper with the step
document.getElementById('application-stepper').addEventListener('nds:stepper:change', function (e) {
  console.log('Step', e.detail.currentStep, 'of', e.detail.totalSteps);
});

// Last step: move only when the request succeeds. The form has data-ajax,
// so Forms validates it, stops the POST and fires nds:formValid.
document.getElementById('application-form').addEventListener('nds:formValid', function () {
  sendApplication().then(function () { NDS.Stepper.next('application-stepper'); });
});
</script>

The full API is in the banner of `_js/nds-stepper.js`.

</div>
  </div>
</section>

<section id="stepperRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Form Template](../templates/form-template): a stepper that is radial on phones and tablets and vertical on a desktop, beside a form with checked moves.
- [Faculty CV](../examples/faculty-cv): a career timeline with dots, divider labels and reverse order.
- [Divider](../utilities/divider): the label at the start of a step.

</div>
  </div>
</section>
