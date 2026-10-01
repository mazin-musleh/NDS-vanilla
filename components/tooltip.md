---
layout: page
title: Tooltip
hero_title: Tooltip - National Design System
hero_description: A tooltip is a small balloon of help text that opens beside a term, a field or a button
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "01/10/2026 - 10:19 AM"
---

<section id="tooltipOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A tooltip holds short, optional help. Its trigger is a help icon from [Feedback Icons](../components/feedback-icons), a word in a sentence, or a button. The balloon holds a message, with an optional title and a help icon, and an arrow points at the trigger. You write the markup yourself, or put the text in data attributes and the script builds the parts.

Pick another component when:

- the user must read the text to finish the task: the info text of a field, see [Forms](../components/forms)
- the message must stay in view: [Alert](../components/alert)
- the user must make a decision: [Modal](../components/modal)
- the trigger opens a list of actions: [Dropmenu](../components/dropmenu)

</div>
  </div>
</section>

<section id="tooltipMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="tooltip-help" data-canon data-variants="tooltipVariantsTable">
<span class="nds-tooltip">
  <button type="button" class="nds-tooltip-trigger" aria-label="About the National ID">
    <span class="nds-feedback nds-sm">
      <span class="nds-feedback-icon">
        <i class="nds-icon" aria-hidden="true"></i>
      </span>
    </span>
  </button>
  <div class="nds-tooltip-balloon" hidden>
    <span class="nds-feedback nds-sm">
      <span class="nds-feedback-icon">
        <i class="nds-icon" aria-hidden="true"></i>
      </span>
    </span>
    <span class="nds-tooltip-body">
      <span class="nds-tooltip-title">National ID</span>
      <p class="nds-tooltip-message">The 10-digit number on your national identity card.</p>
    </span>
  </div>
</span>
</script>
<script type="text/html" id="tooltip-auto" data-canon>
<span class="nds-tooltip" data-tooltip-title="Iqama number" data-tooltip-message="Residents enter the 10-digit number on their residence permit."></span>
</script>
<script type="text/html" id="tooltip-term" data-canon>
<p>Enter your <span class="nds-tooltip nds-term" data-tooltip-message="The 10-digit number on your national identity card.">National ID</span> to continue.</p>
</script>
<script type="text/html" id="tooltip-button" data-canon>
<button type="button" class="nds-btn nds-secondary-outline nds-md nds-icon-only nds-tooltip" title="Print this page">
  <i class="hgi hgi-stroke hgi-printer" aria-hidden="true"></i>
</button>
</script>
    </div>
  </div>
</section>

<section id="tooltipVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Manual (default) | — | — | A help icon next to a field label or a heading. You write every part |
| Structure | Auto | canon `#tooltip-auto` | — | The same help icon from two attributes. The script builds the trigger and the balloon |
| Structure | Term | canon `#tooltip-term` | — | A word in a sentence is the trigger, with a dotted underline |
| Structure | Button (demo: + hover-500) | canon `#tooltip-button` | — | An icon-only button whose `title` becomes the message. Add `data-tooltip-hover="500"`: a button needs hover, so its own click still works. An `<a>` link takes the same classes and attributes |
| Open on | Click (default) | — | `.nds-tooltip:not(.nds-btn)` | A click, a tap, or Enter on the trigger opens and closes the balloon |
| Open on | Hover | `[data-tooltip-hover]` | `.nds-tooltip` | The balloon opens 120ms after the mouse enters, and on keyboard focus. Use it on a link or a button |
| Open on | Hover after 500ms (id: hover-500) | `[data-tooltip-hover="500"]` | `.nds-tooltip` | The same, with a longer wait. Use it in a row of icon buttons, so a passing mouse opens nothing |
{: #tooltipVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="tooltipBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Click Mode
{: .nds-block-title}

By default a click on the trigger opens the balloon, and a second click closes it. The click opens only the balloon: on a link or a button, the link does not open and the button action does not run.

### Hover Mode
{: .nds-block-title}

`data-tooltip-hover` opens the balloon when the mouse rests on the trigger, and when the trigger gets focus from the keyboard. The balloon stays open while the mouse moves into it, and closes when the mouse leaves both. A click during the wait cancels the open. On a link or a button, a click or a tap runs the action and closes the balloon. On a text term, a tap opens and closes the balloon, and a mouse click does nothing.

### Auto Markup
{: .nds-block-title}

Put `data-tooltip-title`, `data-tooltip-message` or both on `.nds-tooltip`, and the script builds the parts you did not write. An empty root gets a help icon trigger. A root with text or elements is the trigger itself. The balloon gets a help icon only when it has a title. A part you wrote is always kept.

### Text Term
{: .nds-block-title}

A term is a `.nds-tooltip` with text inside, and `nds-term` adds a dotted underline and the help cursor. The script makes the term reachable with Tab. In click mode it also gives the term `role="button"`, and Enter or Space opens and closes the balloon.

### Title Attribute
{: .nds-block-title}

With no `data-tooltip-message`, the root's `title` is the message. Until the script loads, the browser shows `title` as its own tooltip. Then the script removes `title`, so the two never show together. An element with no other name keeps the text as its `aria-label`. The balloon is built on the first open, so a row of icon buttons adds no hidden balloons to the page.

</div>
  </div>
</section>

<section id="tooltipFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-tooltip</code> on the page starts by itself, after the page first shows. Call <code class="nds-inline-code lang-js">NDS.Tooltip.reinit()</code> after you add new ones.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-location-star-01"></i>
            <span class="nds-label">Balloon Position</span>
          </span>
          <p class="nds-item-desc">While open, the balloon moves to <code class="nds-inline-code lang-html">&lt;body&gt;</code>, so no container cuts it off. It opens below the trigger, and above it when there is more room there. It never runs past the side of the screen, and the arrow points at the trigger.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Dismissal</span>
          </span>
          <p class="nds-item-desc">A click outside, a page scroll, or Escape closes the balloon. Escape also returns focus to the trigger. Only one tooltip is open at a time.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-user"></i>
            <span class="nds-label">Accessibility</span>
          </span>
          <p class="nds-item-desc">The balloon gets <code class="nds-inline-code lang-html">role="tooltip"</code> and an id. The trigger's <code class="nds-inline-code lang-html">aria-describedby</code> points to it, so a screen reader reads the message when the trigger gets focus.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-02"></i>
            <span class="nds-label">No Layout Shift</span>
          </span>
          <p class="nds-item-desc">An empty auto root keeps the space of its help icon until the script adds it, so the text after it does not move.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code-circle"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Open, close and remove a tooltip from a script, and listen to its open and close events.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="tooltipPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put only optional help in a tooltip. Text the user needs to finish the task goes in the label or the info text.
- Keep the message to one or two sentences. The balloon is at most 240px wide, and the text wraps.
- Put the trigger right after the term or the label it explains.
- Use the auto markup for plain text. Write the parts yourself only for other content in the balloon.
- Give a help icon trigger an `aria-label` that names what it explains, such as "About the National ID". An auto trigger takes the title, or "More info" when there is no title.
- Add `data-tooltip-hover` to a link or a button trigger, so its own click still works.
- In a form with many tooltips, move the text into info text. Many clicks slow down keyboard and touch users.

</div>
  </div>
</section>

<section id="tooltipApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-tooltip-title` | `.nds-tooltip` | The balloon title. The script builds the balloon from it |
| `data-tooltip-message` | `.nds-tooltip` | The balloon message. The script builds the balloon from it |
| `title` | `.nds-tooltip` | The message when `data-tooltip-message` is absent |
| `data-tooltip-hover` | `.nds-tooltip` | Opens on hover and keyboard focus. The value is the wait in milliseconds, 120 by default |
| `hidden` | `.nds-tooltip-balloon` | Keeps the balloon closed at load. The script removes it on open |
| `data-state` | `.nds-tooltip` | The script writes `open` while the balloon shows. It skips a root that is a link or a button, which has its own `open` look |
| `data-position-vertical` | `.nds-tooltip`, `.nds-tooltip-balloon` | The script writes `top` when the balloon opens above the trigger. The arrow then points down |
{: .nds-table .nds-responsive}

### Keyboard
{: .nds-block-title}

| Key | Where | Effect |
|---|---|---|
| Enter, Space | trigger | Opens or closes the balloon. On a text term, only in click mode |
| Tab | trigger | In hover mode, focus opens the balloon and leaving closes it |
| Escape | trigger | Closes the balloon and returns focus to the trigger |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-tooltip-balloon`, or on `:root` for every tooltip. The balloon moves to `<body>` while open, so a value set on `.nds-tooltip` does not reach it.

| Property | Default | Controls |
|---|---|---|
| `--tooltip-max-width` | `240px` | Maximum width of the balloon |
| `--tooltip-padding` | `var(--spacing-md)` | Space inside the balloon |
| `--tooltip-gap` | `var(--spacing-md)` | Space between the icon and the text, and between the title and the message |
| `--tooltip-arrow-size` | `10px` | Size of the arrow |
| `--tooltip-background-default` | `var(--colors-base-white)` | Balloon background. Dark mode: `var(--colors-neutral-800)` |
| `--tooltip-text-heading-default` | `var(--text-display)` | Title color. Dark mode: `var(--colors-neutral-50)` |
| `--tooltip-text-paragraph-default` | `var(--text-primary-paragraph)` | Message color. Dark mode: `var(--colors-neutral-100)` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Tooltip.init()` | Starts every `.nds-tooltip` on the page that has not started yet. `reinit()` is the same |
| `NDS.Tooltip.create(el)` | Starts one tooltip and returns its instance |
| `el.ndsTooltip.open()`, `.close()` | Opens or closes the balloon |
| `el.ndsTooltip.destroy()` | Closes the balloon and removes the listeners. The tooltip can start again after it |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:tooltip:opened` | `.nds-tooltip` (bubbles) | `{ tooltip, trigger, balloon, isOpen }` |
| `nds:tooltip:closed` | `.nds-tooltip` (bubbles) | `{ tooltip, trigger, balloon, isOpen }` |
{: .nds-table .nds-responsive}

A balloon built from `title` is not in the page before its first open. Read it from the `nds:tooltip:opened` detail. While open, the balloon is in `<body>`, so `closest('.nds-tooltip')` from inside it finds nothing.

<script type="text/html" id="tooltip-js" data-canon data-lang="js">
var tip = document.querySelector('.nds-tooltip');
tip.addEventListener('nds:tooltip:opened', function (e) {
  console.log('Opened:', e.detail.balloon.textContent.trim());
});
tip.ndsTooltip.open();
</script>

The full API is in the banner of `_js/nds-tooltip.js`.

</div>
  </div>
</section>

<section id="tooltipRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Footer](../ui-shell/footer): hover tooltips on the social icon buttons, and text terms on tags.
- [Top Bar](../ui-shell/topbar): hover tooltips from `title` on the theme and dark mode buttons.
- [Main Navigation](../ui-shell/mainnav): hover tooltips on the icon-only actions.

</div>
  </div>
</section>
