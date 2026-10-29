---
layout: page
title: Rating
hero_title: Rating - National Design System
hero_description: A row of stars that shows a score, or lets the user pick one
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "21/10/2026 - 10:38 PM"
---

<section id="rating-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A rating is a row of stars. With `<span>` stars it shows a score. With `<button>` stars the user picks a score. A menu variant puts a score summary in a trigger and the vote in a panel.

Pick another component when:

- the user answers yes or no: [Switch](../components/switch)
- the bar shows progress, not opinion: [Progress](../components/progress)
- the page asks for feedback at its end: [User Feedback](../components/user-feedback)

</div>
  </div>
</section>

<section id="rating-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="rating-display" data-canon data-variants="rating-variants-table" data-harness="form">
<div class="nds-rating" data-rating="3.5">
  <span class="nds-rating-star"></span>
  <span class="nds-rating-star"></span>
  <span class="nds-rating-star"></span>
  <span class="nds-rating-star"></span>
  <span class="nds-rating-star"></span>
</div>
</script>
<script type="text/html" id="rating-interactive" data-canon>
<div class="nds-rating" data-rating="3.5">
  <button class="nds-rating-star" type="button"></button>
  <button class="nds-rating-star" type="button"></button>
  <button class="nds-rating-star" type="button"></button>
  <button class="nds-rating-star" type="button"></button>
  <button class="nds-rating-star" type="button"></button>
</div>
</script>
<script type="text/html" id="rating-form" data-canon>
<fieldset class="nds-form-group">
  <legend class="nds-label">How would you rate this service?</legend>
  <div class="nds-rating" data-rating="0">
    <button class="nds-rating-star" type="button"></button>
    <button class="nds-rating-star" type="button"></button>
    <button class="nds-rating-star" type="button"></button>
    <button class="nds-rating-star" type="button"></button>
    <button class="nds-rating-star" type="button"></button>
  </div>
  <input type="hidden" name="rating" value="0" data-rating-value>
</fieldset>
</script>
<script type="text/html" id="rating-menu" data-canon>
<div class="nds-dropmenu">
  <button class="nds-btn nds-subtle nds-menu-btn nds-dropmenu-trigger" type="button">
    <div class="nds-rating nds-xs" data-rating="4.5">
      <span class="nds-rating-star" aria-hidden="true"></span>
      <span class="nds-rating-star" aria-hidden="true"></span>
      <span class="nds-rating-star" aria-hidden="true"></span>
      <span class="nds-rating-star" aria-hidden="true"></span>
      <span class="nds-rating-star" aria-hidden="true"></span>
    </div>
    <span class="nds-label">4.5 - (18) Votes</span>
  </button>
  <div class="nds-dropmenu-menu nds-rating-menu" hidden>
    <div class="nds-dropmenu-item" data-no-auto-close>
      <span class="nds-label">Rate this service</span>
      <div class="nds-rating">
        <button class="nds-rating-star" type="button"></button>
        <button class="nds-rating-star" type="button"></button>
        <button class="nds-rating-star" type="button"></button>
        <button class="nds-rating-star" type="button"></button>
        <button class="nds-rating-star" type="button"></button>
      </div>
    </div>
    <div class="nds-dropmenu-footer">
      <hr class="nds-divider nds-lg">
      <div class="nds-dropmenu-action">
        <button class="nds-btn nds-primary nds-dropmenu-item" data-no-auto-close>
          <span class="nds-label" data-i18n="rating.vote">Vote</span>
        </button>
      </div>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="rating-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Display (default) | — | — | A read-only score, such as the average of many reviews |
| Structure | Interactive | canon `#rating-interactive` | — | The user picks a score |
| Structure | Form (id: form) | canon `#rating-form` | — | An interactive rating in a form: a group with a question and a hidden input that sends the score |
| Structure | Menu | canon `#rating-menu` | — | A score summary in a trigger, with the vote in a panel. Style, Value and Loading change the summary rating |
| Size | XS | `.nds-xs` | `.nds-rating:not(.nds-xs):not(.nds-dropmenu .nds-rating)` | 16px stars. Inline next to a title or a list item |
| Size | SM | `.nds-sm` | `.nds-rating:not(.nds-dropmenu .nds-rating)` | 24px stars. Inline, a little larger |
| Size | MD (default) | — | — | 32px stars. Most layouts |
| Size | LG | `.nds-lg` | `.nds-rating:not(.nds-dropmenu .nds-rating)` | 48px stars, 40px on phones. A featured review or a hero |
| Style | Brand | `.nds-brand` | `.nds-rating` | Stars in the brand primary color, not the secondary color |
| Value | Empty (not: form) | `[data-rating="0"]` | `.nds-rating` | No star is filled. The start of a new vote |
| Value | Whole (hint: 4 of 5 stars, no half star) (not: form) | `[data-rating="4"]` | `.nds-rating` | A whole number fills that many stars |
| Value | Half star (default) (not: form) | — | — | A decimal of .3 or more fills half of the next star |
| Required | Required (hint: The user must pick a score before the form submits) | `[data-required]` | `.nds-form-group` | The form does not submit until the user picks a score |
| State (any) | Loading | `.nds-loading` | `.nds-rating` | The stars pulse as placeholders while the score loads |
| State (any) | Disabled | `[data-state~="disabled"]` | `.nds-rating:has(> button):not(.nds-dropmenu .nds-rating)` | The user cannot pick a score now. Interactive only |
| State (any) | Disabled | `[disabled]` | `button.nds-rating-star:not(.nds-dropmenu .nds-rating-star)` | Write both parts of this choice |
{: #rating-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="rating-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Display

Stars built from `<span>` elements show `data-rating` and nothing else. They do not react to the pointer or the keyboard. Set `data-rating` to the score, from 0 to the number of stars.

### Interactive

Stars built from `<button>` elements let the user pick a score. Hover shows the score a click would give. A click, Enter or Space sets the score. The script writes it back to `data-rating` and fires `nds:rating:change`. The script also writes an `aria-label` on each star in the page's language, such as `3 stars`, so the buttons need no label in the markup.

### Form

The Form structure puts an interactive rating in a `.nds-form-group`, with a `<legend>` that asks the question. The stars are buttons, not inputs, so the score posts through a hidden input with `data-rating-value`. The script writes the score into it on each pick, and 0 when no star is picked. After a form reset, the script puts back the score the page loaded with. [User Feedback](../components/user-feedback) uses the same input.

### Required

`data-required` on the `.nds-form-group` makes the score required. [Forms](../components/form) validation treats `data-rating="0"` as empty: it shows "Please choose a rating" and focuses the first star.

### Menu

The Menu structure puts a display rating and a vote count in a [Dropmenu](../components/dropmenu) trigger. The panel holds an interactive rating and a Vote button. Put `nds-rating-menu` on the `.nds-dropmenu-menu`. The page owns the vote: listen for `nds:rating:change`, and send the score from your own code.

</div>
  </div>
</section>

<section id="rating-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-feature-list nds-grid nds-divided-rows nds-icons-subtle">
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-plug-socket" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Auto-initialization</span>
              <p class="nds-card-description">The script starts every <code class="nds-inline-code lang-html">.nds-rating</code> on the page, and every one added or removed later.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-accessibility" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Screen Reader Score</span>
              <p class="nds-card-description">A screen reader reads a display rating as one image with its score, such as "3.5 of 5", in the page's language. Each star of an interactive rating has its own name, such as "2 stars".</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-tap-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Mode Detection</span>
              <p class="nds-card-description">The tag of the stars sets the mode. <code class="nds-inline-code lang-html">&lt;button&gt;</code> stars are interactive, <code class="nds-inline-code lang-html">&lt;span&gt;</code> stars are display only.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-favourite" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Half Stars</span>
              <p class="nds-card-description">A decimal of .3 or more fills half of the next star. A decimal below .3 rounds down.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-keyboard" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Keyboard Navigation</span>
              <p class="nds-card-description">The left and right arrow keys follow the text direction. Up and down move to the next and previous star. Home and End jump to the first and last star. Enter and Space pick a score. Escape leaves the star.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-smart-phone-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Phone Size</span>
              <p class="nds-card-description">The large stars shrink from 48px to 40px on phones.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-loading-03" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Loading Placeholder</span>
              <p class="nds-card-description"><code class="nds-inline-code lang-html">.nds-loading</code> turns the stars into pulsing placeholders.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-api" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Programmatic Control</span>
              <p class="nds-card-description">Read, set, disable and enable a rating from code. Each change that picks a new score fires <code class="nds-inline-code lang-js">nds:rating:change</code>.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="rating-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use five stars. Users expect five.
- Use `nds-xs` or `nds-sm` next to a title or a list item. Use the default size in most layouts. Use `nds-lg` for a featured review.
- Set `data-rating` to the score on a display rating. Set it to `0` on an interactive rating that collects a new score.
- Do not use a rating for a yes or no choice. Use a [Switch](../components/switch).
- Do not use a rating to show progress. Use [Progress](../components/progress).
- Use `nds-brand` where the secondary color does not fit the page identity.
- Add a visible label near an interactive rating, such as "Rate this service". In a form, the group's `<legend>` is the label.
- Put the rating in a [Dropmenu](../components/dropmenu) when a compact trigger collects the vote.
- Do not write `nds-md`. The default size has no class.

</div>
  </div>
</section>

<section id="rating-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `.nds-rating-star` | a child of `.nds-rating` | One star. A `<button>` makes the rating interactive |
| `.nds-rating-menu` | `.nds-dropmenu-menu` | Centers the label and the stars of the vote item in a [Dropmenu](../components/dropmenu), and sets the menu padding |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-rating` | `.nds-rating` | The score, from 0 to the number of stars. The script writes the new score here on every pick |
| `data-state~="interactive"` | `.nds-rating` | The script sets it at load when the first star is a `<button>` and the rating is not disabled. It turns on hover, press and pointer styles |
| `data-state~="disabled"` | `.nds-rating` | Write it, with `disabled` on each star, for a rating that starts disabled. The script also sets it in `setDisabled(true)` and removes it in `setDisabled(false)` |
| `data-state~="selected"` | `.nds-rating-star` | The script sets it on the first N stars, where N is the whole part of the score, and removes it when the score drops |
| `data-state~="half"` | `.nds-rating-star` | The script sets it on the star after the whole part when the decimal is .3 or more |
| `data-state~="preview"` | `.nds-rating-star` | The script sets it on the stars up to the hovered star, and removes it when the pointer leaves |
| `data-value` | `.nds-rating-star` | The script writes the 1-based position of the star |
| `data-required` | `.nds-form-group` that holds a rating | The rating must be above 0 before the form submits |
| `data-rating-value` | a hidden `<input>` in the `.nds-form-group`, or in `.nds-rating` | Holds the score for the form. The script writes it on each pick, and 0 when no star is picked |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-rating`. The size classes set `--star-size`, and `nds-brand` sets the four color properties.

| Property | Default | Controls |
|---|---|---|
| `--star-size` | `32px` | Width and height of each star |
| `--star-color` | `var(--rating-star-default-default)` | Color of an empty star |
| `--star-selected` | `var(--rating-star-default-selected)` | Color of a filled star |
| `--star-pressed` | `var(--rating-star-default-pressed)` | Color of a star while pressed |
| `--star-hovered` | `var(--rating-star-default-hovered)` | Color of a star on hover, interactive only |
{: .nds-table .nds-responsive}

### Tokens
{: .nds-block-title}

Set a token at `:root`, or on a wrapper to reach every rating inside it. Give a token with a Dark mode value a dark override too: see [Tokens](../foundations/tokens).

Source: the `rating` group in `_sass/tokens/_components.scss`.

{{ site.data.tokens.components.rating.html }}

### JavaScript
{: .nds-block-title}

The instance is on the element as `el.ndsRating`. It is there once the component starts: code that runs at page load waits for [`NDS.init.ready`](../core/init#instance-lookup).

| Method | Effect |
|---|---|
| `NDS.Rating.init()`, `NDS.Rating.reinit()` | Start every `.nds-rating` that has no instance |
| `NDS.Rating.create(el)` | Start one rating and return its instance. It returns the existing instance when there is one |
| `NDS.Rating.destroy(el)` | The same as `el.ndsRating.destroy()` |
| `NDS.Rating.validate(el, options)` | Check the rating group and return `{ valid, message, rating }`. Pass `{ showMessage: false }` to check without a message |
| `NDS.Rating.enable(el)` | Start the rating if needed, then take it out of disabled |
| `el.ndsRating.setValue(v)` | Set the score, from 0 to the star count. The event fires only when the score changes |
| `el.ndsRating.getValue()` | Return the score |
| `el.ndsRating.enable()`, `el.ndsRating.disable()` | Enable or disable the rating |
| `el.ndsRating.isDisabled()` | Return whether the rating is disabled |
| `el.ndsRating.destroy()` | Remove the listeners and `el.ndsRating`. `NDS.Rating.create(el)` then starts a new one |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:rating:change` | `.nds-rating` (bubbles) | `{ rating, element }` |
{: .nds-table .nds-responsive}

<script type="text/html" id="rating-js" data-canon data-lang="js">
var rating = document.querySelector('.nds-rating');

rating.addEventListener('nds:rating:change', function (e) {
  console.log(e.detail.rating);
});

rating.ndsRating.setValue(4);
</script>

The full API is in the banner of `_js/nds-rating.js`.

</div>
  </div>
</section>

<section id="rating-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [User Feedback](../components/user-feedback): a rating inside a short form at the end of a page.
- [Cards](../components/card): a display rating in a card.

</div>
  </div>
</section>
