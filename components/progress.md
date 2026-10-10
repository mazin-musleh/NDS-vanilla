---
layout: page
title: Progress
hero_title: Progress - National Design System
hero_description: A progress indicator shows how much of a task is done, as a circle or a bar
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="progress-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A progress indicator shows a value from 0 to 100. The circle draws it as a ring with the number in the middle, and a short text under the number. The bar draws it as a fill in a track, with a label above and a feedback message below. The circle can also show the value as a fraction, such as 3.75/5.

Pick another component when:

- the wait has no known length: [Loading](../components/loading)
- the user moves through named steps: [Stepper](../components/stepper)
- the user uploads files: [Upload](../components/upload), which draws its own progress

</div>
  </div>
</section>

<section id="progress-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="progress-circle" data-canon data-variants="progress-variants-table">
<div class="nds-progress-circle nds-lg" data-value="75" role="progressbar" aria-labelledby="progress-circle-text">
  <svg width="120" height="120" viewBox="0 0 24 24">
    <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" />
    <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2"
      stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
  </svg>
  <div class="nds-progress-info">
    <span class="nds-feedback">
      <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
    </span>
    <span class="nds-progress-percentage">
      <span class="nds-progress-number"></span>
      <span class="nds-progress-symbol">%</span>
    </span>
    <span class="nds-progress-text" id="progress-circle-text">Active users</span>
  </div>
</div>
</script>
<script type="text/html" id="progress-out-of" data-canon>
<div class="nds-progress-circle nds-lg" data-num="3.75" data-max="5" role="progressbar" aria-labelledby="progress-out-of-text">
  <svg width="120" height="120" viewBox="0 0 24 24">
    <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" />
    <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2"
      stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
  </svg>
  <div class="nds-progress-info">
    <span class="nds-progress-out-of">
      <span class="nds-progress-number"></span>
      <span class="nds-progress-of"></span>
    </span>
    <span class="nds-progress-text" id="progress-out-of-text">SGPA</span>
  </div>
</div>
</script>
<script type="text/html" id="progress-bar" data-canon>
<div class="nds-progress-bar nds-lg" data-value="65" role="progressbar" aria-labelledby="progress-bar-label">
  <span class="nds-progress-label" id="progress-bar-label">Uploading document.pdf</span>
  <div class="nds-progress-track">
    <div class="nds-progress-fill"></div>
  </div>
  <span class="nds-feedback nds-sm">
    <span class="nds-feedback-icon"><i class="nds-icon" aria-hidden="true"></i></span>
    <span class="nds-feedback-message">Processing your file</span>
  </span>
</div>
</script>
    </div>
  </div>
</section>

<section id="progress-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Color and Status have one row for the circle and one for the bar. Write the row whose element is in the markup. Status is not for Out of: a score is not a task that succeeds or fails.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Circle (default) | — | — | A value that is the focus of the view: a dashboard figure or a completion rate |
| Structure | Out of (hint: A score read as a fraction, such as a GPA) | canon `#progress-out-of` | — | A score read as a fraction: a GPA, a rating. `data-num` and `data-max` replace `data-value` |
| Structure | Bar | canon `#progress-bar` | — | A task the user waits for: an upload or a form to complete |
| Circle size | SM | — | `.nds-progress-circle` | 64px, a circle with no size class. The text under the number does not show |
| Circle size | MD | `.nds-md` | `.nds-progress-circle` | 80px. The text under the number does not show |
| Circle size | LG (default) | `.nds-lg` | `.nds-progress-circle` | 120px |
| Circle size | XL | `.nds-xl` | `.nds-progress-circle` | 160px |
| Circle size | 2XL | `.nds-2xl` | `.nds-progress-circle` | 200px. A hero figure |
| Bar size | SM | `.nds-sm` | `.nds-progress-bar` | 4px track. Beside other content |
| Bar size | MD | — | `.nds-progress-bar` | 8px track. A bar with no size class is MD |
| Bar size | LG (default) | `.nds-lg` | `.nds-progress-bar` | 16px track, with the percentage in the fill |
| Color | Neutral | `.nds-neutral` | `.nds-progress-circle` | The neutral color, not the primary color. Use it when the value is not a brand figure |
| Color | Neutral | `.nds-neutral` | `.nds-progress-bar` | The same, on a bar |
| Status | None (default) | — | — | The task is running |
| Status | Success | `[data-status="success"]` | `.nds-progress-circle:not([data-num])` | The task is done. The fill goes to 100% in the success color. The circle shows the success icon in place of the number |
| Status | Success | `[data-status="success"]` | `.nds-progress-bar` | The same, on a bar. The feedback icon turns to success |
| Status | Error | `[data-status="error"]` | `.nds-progress-circle:not([data-num])` | The task failed. The fill stays and turns to the error color. The circle shows the error icon in place of the number |
| Status | Error | `[data-status="error"]` | `.nds-progress-bar` | The same, on a bar. The feedback icon turns to error |
{: #progress-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="progress-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Out Of
{: .nds-block-title}

The circle shows a score as a fraction, such as 3.75/5, in place of a percentage. Set `data-num` and `data-max` on the circle instead of `data-value`. The script writes the two numbers and fills the ring to their ratio. When both are set, they win over `data-value`.

### Status
{: .nds-block-title}

`data-status="success"` fills the indicator to 100% in the success color, whatever its value. `data-status="error"` keeps the fill where it is and turns it to the error color. On a circle, the status icon takes the place of the number. On a bar, the feedback icon below the track changes. Out of takes no status: a score does not succeed or fail.

### Percentage in the Bar
{: .nds-block-title}

A large bar (`nds-lg`) shows the percentage inside the fill, at its end. Small and medium bars are too thin for text, so they show no number. Use a large bar when the user needs the exact value.

</div>
  </div>
</section>

<section id="progress-features" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">The script starts every circle and bar that has <code class="nds-inline-code lang-html">data-value</code> or <code class="nds-inline-code lang-html">data-num</code>. No init call is needed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-percent-circle"></i>
            <span class="nds-label">Data-Driven Values</span>
          </span>
          <p class="nds-item-desc">Change <code class="nds-inline-code lang-html">data-value</code>, <code class="nds-inline-code lang-html">data-num</code> or <code class="nds-inline-code lang-html">data-max</code> and the indicator redraws. A value above 100 shows as 100.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-scroll"></i>
            <span class="nds-label">Scroll-triggered Fill</span>
          </span>
          <p class="nds-item-desc">The fill starts when half of the indicator is on the screen, so the user sees it move. With reduced motion, the value shows at once.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-motion-02"></i>
            <span class="nds-label">Smooth Transitions</span>
          </span>
          <p class="nds-item-desc">The fill moves to each new value in 0.3 seconds, on the circle and the bar.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-01"></i>
            <span class="nds-label">Scalable Text</span>
          </span>
          <p class="nds-item-desc">The number, the text and the status icon grow with the circle, at every size class and at a custom <code class="nds-inline-code lang-css">--progress-size</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-accessibility"></i>
            <span class="nds-label">Screen Reader Value</span>
          </span>
          <p class="nds-item-desc">The script adds <code class="nds-inline-code lang-html">role="progressbar"</code> if it is missing. It keeps <code class="nds-inline-code lang-html">aria-valuenow</code>, <code class="nds-inline-code lang-html">aria-valuemin</code> and <code class="nds-inline-code lang-html">aria-valuemax</code> in step with the value. A screen reader reads the value before the fill starts.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-js">NDS.Progress.setValue()</code> and <code class="nds-inline-code lang-js">NDS.Progress.setOutOf()</code> change the value from code.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="progress-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Name every indicator: point `aria-labelledby` at its label or text. Without a name, a screen reader reads only a number.
- Set the value with `data-value`, not with `--progress-value` in `style`. The script reads the attribute, and the screen reader value comes from it.
- Keep the circle text to one or two words. It shows only at LG and larger.
- Write a bar label that names the task, such as the file name, and a feedback message that says what happens now.
- Set `data-status="success"` only when the task is done.
- Do not use a progress indicator for a wait with no known length. Use [Loading](../components/loading).

</div>
  </div>
</section>

<section id="progress-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-value` | `.nds-progress-circle`, `.nds-progress-bar` | The value, 0 to 100 |
| `data-num`, `data-max` | `.nds-progress-circle` | The fraction for Out of. Both are needed. They win over `data-value` |
| `data-status` | `.nds-progress-circle`, `.nds-progress-bar` | `success` or `error`. See Status under Behavior |
| `aria-labelledby` | `.nds-progress-circle`, `.nds-progress-bar` | The id of the element that names the indicator |
{: .nds-table .nds-responsive}

For Out of, the script sets `aria-valuemax` to `data-max`, not 100.

### CSS Custom Properties
{: .nds-block-title}

Set these in the `style` of the circle or the bar. The size classes set `--progress-size` and `--progress-height` on the element, so a value set on a parent does not reach it.

| Property | Default | Controls |
|---|---|---|
| `--progress-value` | `0` | The fill, 0 to 100. The script sets it from `data-value` |
| `--progress-color` | `var(--background-primary)` | The fill color |
| `--progress-size` | `64px` | Circle only. The diameter |
| `--progress-track-color` | `var(--colors-neutral-100)` | Circle only. The ring behind the fill. In dark mode, `var(--colors-alpha-white-10)`. The bar track has no knob |
| `--progress-circumference` | `62.83` | Circle only. The ring length for an SVG circle with `r="10"`. Change it only with a different radius |
| `--progress-height` | `8px` | Bar only. The track height |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Progress.init()` | Starts every indicator on the page. Call it after you add indicators |
| `NDS.Progress.setValue(el, value)` | Sets `data-value` |
| `NDS.Progress.setOutOf(el, num, max)` | Sets `data-num` and `data-max` |
| `NDS.Progress.initCircle(el)` | Draws one indicator from its attributes now, with no wait for scroll |
{: .nds-table .nds-responsive}

The component fires no events. The methods only write the attributes, so writing them yourself works the same. The full API is in the banner of `_js/nds-progress.js`.

<script type="text/html" id="progress-js" data-canon data-lang="js">
var circle = document.querySelector('.nds-progress-circle');
NDS.Progress.setValue(circle, 80);

var score = document.querySelector('.nds-progress-circle[data-max]');
NDS.Progress.setOutOf(score, 4.2, 5);
</script>

</div>
  </div>
</section>

<section id="progress-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Contact Us](../templates/contact-us-template): a small circle beside each file while it uploads.
- [Form](../templates/form-template): a circle that counts the steps done in the stepper.

</div>
  </div>
</section>
