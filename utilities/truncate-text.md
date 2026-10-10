---
layout: page
title: Truncate Text
hero_title: Truncate Text - National Design System
hero_description: A CSS class that clips long text to a set number of lines and ends it with an ellipsis
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.2.0"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="truncate-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Truncate Text is one class, `nds-truncate`, and one custom property, `--truncate`, which sets how many lines show.

Pick another component when:

- the user must be able to open the full text on the page: [Expandable Content](../utilities/expandable-content)

</div>
  </div>
</section>

<section id="truncate-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="truncate-card" data-canon data-variants="truncate-variants-table" data-demo-width="360px">
<div class="nds-card nds-stroke">
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title nds-truncate">National Digital Transformation Strategy and Implementation Roadmap</span>
      <p class="nds-card-description nds-truncate">The unified portal gives access to more than 200 government services from 35 ministries. Citizens can submit applications, track requests, book appointments and get notices about their open requests. The portal supports biometric sign-in, digital signatures and secure document uploads.</p>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="truncate-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The card title stays at one line. A Lines option sets `--truncate` in the `style` attribute of the description.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Lines | 1 (default) | — | — | Titles, labels and list items |
| Lines | 2 | `--truncate: 2` | `.nds-card-description` | Short descriptions, where one line cuts too much |
| Lines | 3 | `--truncate: 3` | `.nds-card-description` | Previews where the first sentence matters |
| Lines | 4 | `--truncate: 4` | `.nds-card-description` | Longer previews |
{: #truncate-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="truncate-features" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">One class and no JavaScript. There is nothing to start, and nothing to clean up.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-font"></i>
            <span class="nds-label">Any Text Element</span>
          </span>
          <p class="nds-item-desc">Works on a heading, a paragraph, a <code class="nds-inline-code lang-html">&lt;span&gt;</code> or a <code class="nds-inline-code lang-html">&lt;div&gt;</code>. A <code class="nds-inline-code lang-html">&lt;span&gt;</code> becomes a block, so it takes its own line.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-horizontal-resize"></i>
            <span class="nds-label">Container Width</span>
          </span>
          <p class="nds-item-desc">When the container gets wider or narrower, the text clips at the new width.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-accessibility"></i>
            <span class="nds-label">Full Text for Screen Readers</span>
          </span>
          <p class="nds-item-desc">The class clips only what shows. The full text stays in the page, so a screen reader reads all of it.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="truncate-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use it for text that can be too long for its space: card titles and descriptions, table cells, menu labels and list items.
- Use 1 line for titles and labels, 2 for short descriptions and 3 for previews.
- Give the user another way to read the full text: a `title` attribute, a [Tooltip](../components/tooltip), or a link to the full page.
- Do not clip text the user must read to finish a task, such as form labels, error messages or legal text.
- If every card description is clipped, the text is too long. Shorten the text first.
- The text clips only when it needs more lines than `--truncate` allows. To clip a short text, give its element a `max-width`.
- The class has zero specificity, so a component rule that sets `display` on the same element wins, and the text does not clip. When you add it to a part of another component, check that the ellipsis shows.

</div>
  </div>
</section>

<section id="truncate-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### CSS Custom Properties
{: .nds-block-title}

Set it in the `style` attribute of the element with `nds-truncate`: `style="--truncate: 3"`. On a parent, it changes every `nds-truncate` element inside it.

| Property | Default | Controls |
|---|---|---|
| `--truncate` | `1` | How many lines show before the ellipsis. A whole number above 0 |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="truncate-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Services List](../examples/services-list): one-line titles and descriptions on service cards.
- [Home Template](../templates/home-template): three-line descriptions on news cards.
- [Faculty CV](../examples/faculty-cv): a one-line name at the top of the table of contents.

</div>
  </div>
</section>
