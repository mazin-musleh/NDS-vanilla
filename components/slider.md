---
layout: page
title: Slider
hero_title: Slider - National Design System
hero_description: A slider lets the user pick a number, or a range between two numbers, by dragging a thumb along a bar
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.2.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="slider-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A slider is a native `<input type="range">` in a form field. The field holds a label, a bar with a thumb, and an `<output>` that shows the value. The bar fills from the start up to the thumb. A range slider has two thumbs, and the bar fills between them.

Pick another component when:

- the user must type an exact number: a number field in [Forms](../components/forms)
- the user picks one of a few fixed values: [Radio buttons](../components/radio)
- the setting is on or off: [Switch](../components/switch)

</div>
  </div>
</section>

<section id="slider-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="slider-single" data-canon data-variants="slider-variants-table" data-demo-width="360px">
<div class="nds-form-container nds-slider-container">
  <div class="nds-form-header">
    <label for="slider-budget">
      <span class="nds-label">Monthly budget</span>
      <span class="nds-info">Drag the thumb or use the arrow keys</span>
    </label>
  </div>
  <div class="nds-form-control">
    <div class="nds-slider-track">
      <input type="range" id="slider-budget" class="nds-slider" min="0" max="20000" step="500" value="5000">
    </div>
    <output for="slider-budget" class="nds-slider-value">5000</output>
  </div>
</div>
</script>
<script type="text/html" id="slider-range" data-canon>
<div class="nds-form-container nds-slider-container nds-slider-range">
  <div class="nds-form-header">
    <label>
      <span class="nds-label">Price range</span>
      <span class="nds-info">Drag either thumb to set the lowest and highest price</span>
    </label>
  </div>
  <div class="nds-form-control">
    <output class="nds-slider-value nds-slider-value-min">20000</output>
    <div class="nds-slider-track">
      <input type="range" class="nds-slider nds-slider-min" min="0" max="100000" step="1000" value="20000" aria-label="Lowest price">
      <input type="range" class="nds-slider nds-slider-max" min="0" max="100000" step="1000" value="60000" aria-label="Highest price">
    </div>
    <output class="nds-slider-value nds-slider-value-max">60000</output>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="slider-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Currency makes two changes on a `.nds-slider-value`: write both. A range slider has two values, so write them on each one.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Single (default) | — | — | One thumb for one value |
| Structure | Range | canon `#slider-range` | — | Two thumbs for a lowest and a highest value, such as a price range. Give each input an `aria-label` |
| Size | SM (default) | — | — | 12px thumb on a 4px bar. Most forms |
| Size | MD | `.nds-md` | `.nds-slider-container` | 16px thumb on an 8px bar. Touch-first screens |
| State | None (default) | — | — | The user can change the value |
| State | Disabled | `[data-state~="disabled"]` | `.nds-slider-container` | The user cannot change the value now |
| State | Read-only | `[data-state~="readonly"]` | `.nds-slider-container` | The user sees the value but cannot change it |
| Stacked | Stacked (hint: The value sits above a full-width bar) | `.nds-stacked` | `.nds-slider-container` | The value moves above the bar, and the bar takes the full width. Use it for a wide value, such as a currency |
| Currency | Currency | `.nds-number-format` | `.nds-slider-value` | Thousands separators and a currency symbol on the value |
| Currency | Currency | `[data-currency="SAR"]` | `.nds-slider-value` | Thousands separators and a currency symbol on the value |
| Loading | Loading | `.nds-loading` | `.nds-slider-container` | A skeleton while the script loads the bounds or the value |
| Field states | Label, info, feedback | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #slider-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="slider-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Range
{: .nds-block-title}

The `nds-slider-range` class on the container turns on two thumbs. Each thumb is its own input, so the user can tab to it and move it with the keys. The thumbs cannot cross: a thumb dragged past the other stops at its value.

### Stacked
{: .nds-block-title}

By default the value sits beside the bar, and the bar takes the rest of the row. A wide value leaves a short bar on a phone. The `nds-stacked` class moves the value above the bar, so the bar takes the full width.

### Number Format
{: .nds-block-title}

The `nds-number-format` class on the value adds thousands separators. The `data-currency` attribute adds a currency symbol. The slider formats the value again on every move. The [Numbers](../utilities/numbers) page lists the currencies.

### Read-only
{: .nds-block-title}

`data-state="readonly"` on the container blocks the mouse and the step keys. The thumb can still get the focus, so a screen reader can read the value. Browsers ignore `readonly` on a range input, so the slider script blocks the keys itself.

### Loading
{: .nds-block-title}

The `nds-loading` class shows the bar and the value as a skeleton, and hides the thumb. Add it while your script loads the bounds or the value, and remove it once they are set. From a script, `NDS.State.add(container, 'loading')` also adds the class.

</div>
  </div>
</section>

<section id="slider-features" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">nds-slider-container</code> on the page starts on its own, and so does a slider added later. No call is needed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Control</span>
          </span>
          <p class="nds-item-desc">The arrow keys move the thumb one step. Home and End move it to the lowest and highest value. Page Up and Page Down move it in larger steps. The focus ring shows on keyboard focus only.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-field"></i>
            <span class="nds-label">Steady Bar</span>
          </span>
          <p class="nds-item-desc">The value keeps the width of the widest value the slider can show. The bar does not move as the number of digits changes.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Skeleton State</span>
          </span>
          <p class="nds-item-desc">Until the slider script starts, the bar and the value show as a skeleton and the thumb is hidden. The bar never shows a fill that does not match the value.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-square-lock-02"></i>
            <span class="nds-label">State Sync</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">disabled</code> or <code class="nds-inline-code lang-html">readonly</code> on the inputs and the same <code class="nds-inline-code lang-html">data-state</code> token on the container stay in sync, in both directions. Write one: the forms script sets the other.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="slider-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a slider when the user picks an approximate value, such as a budget or a distance.
- Use a range slider to filter a list by a lowest and a highest value, such as a price or an age.
- Keep the `<output>` beside every input. The user reads the exact value there.
- Set `step` to the unit the value snaps to, such as 500 for a budget. Without it, the value moves in steps of 1.
- Give each input of a range slider an `aria-label`, such as "Lowest price" and "Highest price". The one label does not name the two thumbs.
- Use MD on touch-first screens. The 12px thumb of SM is hard to grab with a finger.
- Use Stacked with Currency, so a wide value does not shorten the bar.
- After you set `input.value` from a script, fire an `input` event on the input. The bar and the value then update.
- After you change `min` or `max` from a script, call `NDS.Slider.reinit(container)`. The value width is measured again for the new bounds.
- For the label, info text and feedback, see [Forms](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="slider-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `min`, `max`, `step`, `value` | `.nds-slider` | Native range attributes: the bounds, the step and the start value. Without them, the bounds are 0 and 100 and the step is 1 |
| `data-currency` | `.nds-slider-value` | The currency symbol, with `nds-number-format`. See [Numbers](../utilities/numbers) |
| `data-state` | `.nds-slider-container` | `disabled` or `readonly`. The forms script copies it to every input in the container |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

The script writes `--slider-fill-start` and `--slider-fill-end` on `.nds-slider-track` on every move. Do not set them.

### Tokens
{: .nds-block-title}

Set a token at `:root`, or on a wrapper to reach every slider inside it. Give a token with a Dark mode value a dark override too: see [Tokens](../components/tokens). The hovered thumb color also shows on keyboard focus.

Source: the `slider` group in `_sass/tokens/_components.scss`.

{{ site.data.tokens.components.slider.html }}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Slider.init()` | Starts every slider on the page. It runs once at page load, and a slider added later starts on its own |
| `NDS.Slider.reinit(container)` | Starts one container again, or every container with no argument |
| `NDS.Slider.create(container)` | Starts one container and returns it |
| `NDS.Slider.destroy(container)` | Stops one container, or every container with no argument |
{: .nds-table .nds-responsive}

The slider fires no event of its own. Listen for the native `input` event on the input.

<script type="text/html" id="slider-js" data-canon data-lang="js">
var input = document.querySelector('#slider-budget');

// Read the value on every move
input.addEventListener('input', function () {
  console.log(Number(input.value));
});

// Set the value from a script, then update the bar and the value
input.value = 8000;
input.dispatchEvent(new Event('input', { bubbles: true }));

// A range slider: read each thumb from its own input
var range = document.querySelector('.nds-slider-range');
var lowest = Number(range.querySelector('.nds-slider-min').value);
var highest = Number(range.querySelector('.nds-slider-max').value);
</script>

The full API is in the banner of `_js/nds-slider.js`.

</div>
  </div>
</section>
