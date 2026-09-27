---
layout: page
title: Loading
hero_title: Loading - National Design System
hero_description: A loading state dims the content of a container and shows a spinner over it while the content updates
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "27/09/2026 - 03:50 PM"
---

<section id="loadingOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Loading is a state, not an element. The `nds-loading` class goes on any container, and blocks clicks until you remove it. Most containers show a spinner. A component that has a skeleton shows gray bars in the shape of its content instead.

Pick another component when:

- the task has a known length: [Progress](../components/progress)
- the content finished loading and is empty: [Empty](../components/empty)

</div>
  </div>
</section>

<section id="loadingMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="loading-spinner" data-canon data-variants="loadingVariantsTable">
<div class="nds-loading" aria-busy="true">
  <div class="nds-card nds-stroke">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Application status</span>
        <p class="nds-card-description">The status of your application updates every few minutes.</p>
      </div>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="loadingVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The size and color classes go on the element that carries `nds-loading`.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Size | XXS | `.nds-xxs` | `.nds-loading` | 20px spinner, 2px stroke. Small parts, such as a table cell |
| Size | XS | `.nds-xs` | `.nds-loading` | 24px spinner, 2px stroke |
| Size | SM | `.nds-sm` | `.nds-loading` | 28px spinner, 2px stroke |
| Size | MD (default) | — | `.nds-loading` | 32px spinner, 3px stroke. Most containers |
| Size | LG | `.nds-lg` | `.nds-loading` | 36px spinner, 3px stroke |
| Size | XL | `.nds-xl` | `.nds-loading` | 40px spinner, 4px stroke. Large areas |
| Size | 2XL | `.nds-2xl` | `.nds-loading` | 44px spinner, 4px stroke. A whole page or panel |
| Color | Primary (default) | — | `.nds-loading` | The primary color on a light surface. White in dark mode |
| Color | Neutral | `.nds-neutral` | `.nds-loading` | Black on a light surface, white in dark mode. Use it where the primary color clashes with the content |
| Color | On color (hint: White spinner for a dark or colored surface) | `.nds-oncolor` | `.nds-loading` | White in every mode. Use it on a surface that is always dark or colored, such as a primary banner. On a white surface the spinner does not show |
{: #loadingVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="loadingBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Spinner
{: .nds-block-title}

A container that has no skeleton of its own shows a spinner. Its children fade to 15% opacity, and the spinner turns in the center of the container. The size and color classes in the builder change only the spinner.

### Skeleton
{: .nds-block-title}

A component that has a skeleton, such as a card, a table or tabs, replaces its text with gray bars in the shape of its content. The bars pulse, the children do not fade, and no spinner shows. Put `nds-loading` on a grid of cards to turn every card in it into a skeleton. Each component's page shows its own skeleton.

<script type="text/html" id="loading-skeleton" data-canon>
<div class="nds-card nds-stroke nds-loading" aria-busy="true">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle nds-lg">
        <i class="hgi hgi-stroke hgi-stars"></i>
      </span>
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title">Card Title</span>
      <span class="nds-card-subtitle">Card Subtitle</span>
      <p class="nds-card-description">Short description of this card content goes here for demonstration.</p>
    </div>
  </div>
</div>
</script>

</div>
  </div>
</section>

<section id="loadingFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code"></i>
            <span class="nds-label">CSS Only</span>
          </span>
          <p class="nds-item-desc">The spinner is the <code class="nds-inline-code lang-css">::after</code> of the container. No script and no extra element are needed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-mouse-01"></i>
            <span class="nds-label">Interaction Blocked</span>
          </span>
          <p class="nds-item-desc">The container gets <code class="nds-inline-code lang-css">pointer-events: none</code> and <code class="nds-inline-code lang-css">user-select: none</code>, so the user cannot click or select the content while it loads.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-accessibility"></i>
            <span class="nds-label">Reduce Motion</span>
          </span>
          <p class="nds-item-desc">The spinner keeps turning when the user turns on reduce motion in the accessibility panel. It shows that work is in progress, so it is not decoration.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Buttons and Fields</span>
          </span>
          <p class="nds-item-desc">On a button, the spinner takes the button's colors and hides the label, so the button keeps its size. Form fields skip this spinner and show their own.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="loadingPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put `aria-busy="true"` on the container while it loads, and remove it with the class. The spinner is CSS only, so a screen reader does not announce it.
- Put the class on the smallest container that updates, not on the whole page.
- Keep the content in place while it loads. The dim shows the user what is about to change.
- Match the size to the container: `nds-xxs` or `nds-xs` in a table cell, `nds-xl` or `nds-2xl` over a whole page.
- Use `nds-oncolor` only on a surface that is always dark or colored. In dark mode, the default and `nds-neutral` turn white on their own.
- Do not add a size or a color class to a component that has a skeleton. It shows no spinner.
- Do not put `nds-loading` on a form field. Form fields show their own loading look. See [Forms](../components/forms).

</div>
  </div>
</section>

<section id="loadingApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-md` | `.nds-loading` | The same as the default size |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-state~="loading"` | any container | The same as the `nds-loading` class. The core script adds the class when the token is set and removes it when the token goes. The CSS reads only the class, so this form needs the NDS script. Use it on an element whose other states a script already sets with `data-state` |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the loading container, or on a parent.

| Property | Default | Controls |
|---|---|---|
| `--loading-color` | `var(--background-primary)`, `var(--icon-oncolor)` in dark mode | Spinner arc color |
| `--loading-track` | `var(--colors-alpha-black-10)`, `var(--colors-alpha-white-20)` in dark mode | Spinner ring color |
| `--loading-size` | `32px` | Spinner diameter. It wins over the size classes |
| `--loading-border` | `3px` | Spinner stroke width. It wins over the size classes |
| `--loading-opacity` | `0.15` | Opacity of the children while the container loads |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

Loading has no script and no events. To turn it on and off from code, set the `loading` token with `NDS.State`.

<script type="text/html" id="loading-js" data-canon data-lang="js">
var list = document.querySelector('#results');

NDS.State.add(list, 'loading');
list.setAttribute('aria-busy', 'true');

fetch('/api/results').then(function () {
  NDS.State.remove(list, 'loading');
  list.removeAttribute('aria-busy');
});
</script>

The code that copies the token to the class is in `_js/nds-core.js`, under Token mirrors.

</div>
  </div>
</section>
