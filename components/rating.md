---
layout: page
title: Rating
hero_title: Rating - National Design System
hero_description: A row of stars that shows a score, or lets the user pick one
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "02/10/2026 - 01:11 PM"
---

<section id="ratingOverview" class="nds-content-section nds-doc-overview">
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

<section id="ratingMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="rating-display" data-canon data-screens="none" data-variants="ratingVariantsTable">
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
  <div class="nds-dropmenu-menu nds-rating-dropmenu" hidden>
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
          <span class="nds-label">Vote</span>
        </button>
      </div>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="ratingVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Display (default) | — | — | A read-only score, such as the average of many reviews |
| Structure | Interactive | canon `#rating-interactive` | — | The user picks a score |
| Structure | Menu | canon `#rating-menu` | — | A score summary in a trigger, with the vote in a panel. Style, Value and Loading change the summary rating |
| Size | XS | `.nds-xs` | `.nds-rating:not(.nds-xs):not(.nds-dropmenu .nds-rating)` | 16px stars. Inline next to a title or a list item |
| Size | SM | `.nds-sm` | `.nds-rating:not(.nds-dropmenu .nds-rating)` | 24px stars. Inline, a little larger |
| Size | MD (default) | — | — | 32px stars. Most layouts |
| Size | LG | `.nds-lg` | `.nds-rating:not(.nds-dropmenu .nds-rating)` | 48px stars, 40px on phones. A featured review or a hero |
| Style | Brand | `.nds-brand` | `.nds-rating` | Stars in the brand primary color, not the secondary color |
| Value | Empty | `[data-rating="0"]` | `.nds-rating` | No star is filled. The start of a new vote |
| Value | Whole | `[data-rating="4"]` | `.nds-rating` | A whole number fills that many stars |
| Value | Half star (default) | — | — | A decimal of .3 or more fills half of the next star |
| State (any) | Loading | `.nds-loading` | `.nds-rating` | The stars pulse as placeholders while the score loads |
| State (any) | Disabled | `[data-state~="disabled"]` | `.nds-rating:has(> button):not(.nds-dropmenu .nds-rating)` | The user cannot pick a score now. Interactive only |
| State (any) | Disabled | `[disabled]` | `button.nds-rating-star:not(.nds-dropmenu .nds-rating-star)` | Write both parts of this choice |
{: #ratingVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="ratingBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Display

Stars built from `<span>` elements show `data-rating` and nothing else. They do not react to the pointer or the keyboard. Set `data-rating` to the score, from 0 to the number of stars.

### Interactive

Stars built from `<button>` elements let the user pick a score. Hover shows the score a click would give. A click, Enter or Space sets the score. The script writes it back to `data-rating` and fires `nds:rating:change`. The script also writes an English `aria-label` on each star, such as `3 stars`, so the buttons need no label in the markup.

### Menu

The Menu structure puts a display rating and a vote count in a [Dropmenu](../components/dropmenu) trigger. The panel holds an interactive rating and a Vote button. Put `nds-rating-dropmenu` on the `.nds-dropmenu-menu`, not on its parent. The menu moves to `<body>` while it is open, and the class goes with it. The page owns the vote: listen for `nds:rating:change`, and send the score from your own code.

### Required

To require a score, put the rating in a `.nds-form-group` and add `data-required` to the group. [Forms](../components/forms) validation treats `data-rating="0"` as empty and focuses the first star. The stars are buttons, not inputs. Add a hidden input when the score must post with the form.

</div>
  </div>
</section>

<section id="ratingFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">The script starts every <code class="nds-inline-code lang-html">.nds-rating</code> on the page, and every one added or removed later.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-tap-01"></i>
            <span class="nds-label">Mode Detection</span>
          </span>
          <p class="nds-item-desc">The tag of the stars sets the mode. <code class="nds-inline-code lang-html">&lt;button&gt;</code> stars are interactive, <code class="nds-inline-code lang-html">&lt;span&gt;</code> stars are display only.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-favourite"></i>
            <span class="nds-label">Half Stars</span>
          </span>
          <p class="nds-item-desc">A decimal of .3 or more fills half of the next star. A decimal below .3 rounds down.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Navigation</span>
          </span>
          <p class="nds-item-desc">The left and right arrow keys follow the text direction. Up and down move to the next and previous star. Home and End jump to the first and last star. Enter and Space pick a score. Escape leaves the star.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-smart-phone-01"></i>
            <span class="nds-label">Phone Size</span>
          </span>
          <p class="nds-item-desc">The large stars shrink from 48px to 40px on phones.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Loading Placeholder</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">.nds-loading</code> turns the stars into pulsing placeholders.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Read, set, disable and enable a rating from code. Each change that picks a new score fires <code class="nds-inline-code lang-js">nds:rating:change</code>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="ratingPractices" class="nds-content-section nds-doc-practices">
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
- Add a visible label near an interactive rating, such as "Rate this service". The script's star labels are English only.
- Put the rating in a [Dropmenu](../components/dropmenu) when a compact trigger collects the vote.
- Do not write `nds-md`. The default size has no class.

</div>
  </div>
</section>

<section id="ratingApi" class="nds-content-section nds-doc-api">
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
| `.nds-rating-dropmenu` | `.nds-dropmenu-menu` | Centers the label and the stars of the vote item in a [Dropmenu](../components/dropmenu), and sets the menu padding |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-rating` | `.nds-rating` | The score, from 0 to the number of stars. The script writes the new score here on every pick |
| `data-state~="interactive"` | `.nds-rating` | The script sets it at load when the first star is a `<button>` and the rating is not disabled. It turns on hover, press and pointer styles |
| `data-state~="disabled"` | `.nds-rating` | The script sets it in `setDisabled(true)` and removes it in `setDisabled(false)` |
| `data-state~="selected"` | `.nds-rating-star` | The script sets it on the first N stars, where N is the whole part of the score, and removes it when the score drops |
| `data-state~="half"` | `.nds-rating-star` | The script sets it on the star after the whole part when the decimal is .3 or more |
| `data-state~="preview"` | `.nds-rating-star` | The script sets it on the stars up to the hovered star, and removes it when the pointer leaves |
| `data-value` | `.nds-rating-star` | The script writes the 1-based position of the star |
| `data-required` | `.nds-form-group` that holds a rating | The rating must be above 0 before the form submits |
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

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Rating.init()`, `NDS.Rating.reinit()` | Start every `.nds-rating` that has no instance |
| `NDS.Rating.create(el)` | Start one rating and return its instance. It returns the existing instance when there is one |
| `NDS.Rating.enableRating(el)` | Start the rating if needed, then take it out of disabled |
| `el.ndsRating.setValue(v)` | Set the score, from 0 to the star count. The event fires only when the score changes |
| `el.ndsRating.getRating()` | Return the score |
| `el.ndsRating.setDisabled(bool)` | Disable or enable the rating |
| `el.ndsRating.enable()`, `el.ndsRating.isDisabled()` | Enable the rating, or return whether it is disabled |
| `el.ndsRating.destroy()` | Remove the listeners |
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

<section id="ratingRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [User Feedback](../components/user-feedback): a rating inside a short form at the end of a page.
- [Cards](../components/cards): a display rating in a card.

</div>
  </div>
</section>
