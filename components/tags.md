---
layout: page
title: Tags
hero_title: Tags - National Design System
hero_description: Small read-only labels for categories, status, and metadata.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/09/2026 - 11:24 AM"
---

<section id="tagOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A tag is a small `<span>` with the `nds-tag` class and a label, with an optional icon. A standard tag shows a category or metadata, such as a topic, a type or a region. A status tag carries `data-status` and shows the state of an item, such as a request or an order, with a dot before the label. Tags sit together in an `nds-tags` group.

Pick another component when:

- the user clicks the label to pick a choice or to remove a value: [Chips](../components/chips)
- the user types the values into a field: [Tag Input](../components/taginput)

</div>
  </div>
</section>

<section id="tagMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="tag-single" data-canon data-variants="tagVariantsTable">
<span class="nds-tag">
  <span class="nds-label">Riyadh</span>
</span>
</script>
<script type="text/html" id="tag-status" data-canon>
<span class="nds-tag" data-status="neutral">
  <span class="nds-label">Submitted</span>
</span>
</script>
<script type="text/html" id="tag-group" data-canon>
<div class="nds-tags">
  <span class="nds-tag">
    <span class="nds-label">Riyadh</span>
  </span>
  <span class="nds-tag">
    <span class="nds-label">Makkah</span>
  </span>
  <span class="nds-tag">
    <span class="nds-label">Madinah</span>
  </span>
  <span class="nds-tag">
    <span class="nds-label">Eastern Province</span>
  </span>
</div>
</script>
<script type="text/html" id="tag-icon" data-canon>
<i class="nds-icon nds-hgi-location-01" aria-hidden="true"></i>
</script>
    </div>
  </div>
</section>

<section id="tagVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A row on `.nds-tag:not([data-status])` applies to a standard tag only, and a row on `.nds-tag[data-status]` to a status tag only. In the Group structure, a row on `.nds-tag` changes every tag. `(start)` puts the icon before the label. Icon only has two rows: make both changes.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Standard (default) | — | — | One tag for a category or metadata |
| Structure | Status | canon `#tag-status` | — | One tag for the state of an item, with a dot before the label |
| Structure | Group | canon `#tag-group` | — | Several tags in a row that wraps, with an even gap |
| Color | Neutral (default) | — | — | For general labels. `.nds-neutral` and `.nds-gray` give the same look |
| Color | Green | `.nds-green` | `.nds-tag:not([data-status])` | Pick the color by meaning |
| Color | Blue | `.nds-blue` | `.nds-tag:not([data-status])` | Pick the color by meaning |
| Color | Yellow | `.nds-yellow` | `.nds-tag:not([data-status])` | Pick the color by meaning |
| Color | Red | `.nds-red` | `.nds-tag:not([data-status])` | Pick the color by meaning |
| Color | On color | `.nds-oncolor` | `.nds-tag` | For tags on a deep primary or dark background. It replaces the color classes. On a status tag the dot turns white too, so the label must name the state |
| Status | Neutral (default) | — | — | A state with no meaning of its own, such as submitted or draft |
| Status | Success | `[data-status="success"]` | `.nds-tag[data-status]` | A good result, such as approved or complete |
| Status | Info | `[data-status="info"]` | `.nds-tag[data-status]` | A state to note, such as in review |
| Status | Warning | `[data-status="warning"]` | `.nds-tag[data-status]` | A state that needs action soon, such as expiring |
| Status | Error | `[data-status="error"]` | `.nds-tag[data-status]` | A failed or blocked state, such as rejected |
| Status | Critical | `[data-status="critical"]` | `.nds-tag[data-status]` | The same look as Error. Keep it for system-level alerts |
| Style | Light (default) | — | — | A light fill in the tag's color |
| Style | Outline | `.nds-outline` | `.nds-tag:not([data-status])` | No fill and a darker border, for a quieter standard tag |
| Style | Inverted | `.nds-inverted` | `.nds-tag[data-status]` | A solid fill in the status color and light text, for a status that must stand out |
| Style | Ghost | `.nds-ghost` | `.nds-tag[data-status]` | No fill, no border and neutral text beside the colored dot, for a quiet status |
| Size | MD (default) | — | — | 32px high. It needs no class |
| Size | SM | `.nds-sm` | `.nds-tag` | 24px high, for cards and table rows |
| Size | XS | `.nds-xs` | `.nds-tag` | 20px high, for dense lists |
| Content | Label (default) | — | — | Text only |
| Content | Icon and label | canon `#tag-icon` | `.nds-tag:not([data-status])` (start) | An icon before the label. A font icon, `<i class="hgi hgi-stroke hgi-NAME">`, works too |
| Content | Icon only | canon `#tag-icon` | `.nds-tag:not([data-status])` (start) | A square tag that shows only its icon, for tight spaces |
| Content | Icon only | `.nds-icon-only` | `.nds-tag:not([data-status])` | The same: hides the label from view. Screen readers still read it, so keep the label |
| Rounded | Rounded | `.nds-rounded` | `.nds-tag:not([data-status])` | Fully round ends. A status tag is always round |
| Center | Center (hint: Group only) | `.nds-center` | `.nds-tags` | Centers the tags in their row |
{: #tagVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="tagFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-tag-01"></i>
            <span class="nds-label">Pure CSS</span>
          </span>
          <p class="nds-item-desc">Tags need no JavaScript. Every color, style and size comes from classes and attributes.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-wrap"></i>
            <span class="nds-label">Label Truncation</span>
          </span>
          <p class="nds-item-desc">A long label stays on one line and ends with an ellipsis at 160px. A tag never grows wider than its container: it shrinks first, and the label is cut sooner.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-colors"></i>
            <span class="nds-label">Color by Class or Status</span>
          </span>
          <p class="nds-item-desc">A class such as <code class="nds-inline-code lang-html">nds-green</code> colors a standard tag. <code class="nds-inline-code lang-html">data-status</code> colors a status tag, which ignores the color classes.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-universal-access"></i>
            <span class="nds-label">Accessible Icon Only</span>
          </span>
          <p class="nds-item-desc">An icon-only tag hides its label from view but not from screen readers, so the tag keeps its name.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="tagPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use tags for labels that people read and do not click. For a label the user picks or removes, use [Chips](../components/chips).
- Use a status tag for the state of an item. Write the state in the label: every status shows the same dot, so the color alone does not name it.
- Pick the color by meaning, and give tags of the same kind the same color.
- Pick the style by weight. A standard tag is light, or outline to stay quiet. A status tag is light, inverted to stand out, or ghost to stay quiet.
- Keep labels to one to three words. A label longer than 160px ends with an ellipsis.
- Put related tags in one `nds-tags` group, so they share the gap and wrap together.
- Keep the label of an icon-only tag, and give its icon `aria-hidden="true"`. Screen readers read the label.
- Add `nds-oncolor` to tags on a deep primary or dark background, including a status tag in an on-color card.

</div>
  </div>
</section>

<section id="tagApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-neutral` | `.nds-tag` | The same as no color class |
| `nds-gray` | `.nds-tag` | The same as no color class |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the tag. The size classes set `--tag-height`, `--tag-fs` and `--tag-padding-inline`. The color classes, the statuses and the styles set `--tag-bg`, `--tag-text`, `--tag-border` and `--tag-icon`.

| Property | Default | Controls |
|---|---|---|
| `--tag-bg` | `var(--tag-background-neutral-light)` | Background |
| `--tag-text` | `var(--tag-text-neutral)` | Label color |
| `--tag-border` | `var(--tag-border-neutral-light)` | Border color |
| `--tag-icon` | `var(--tag-icon-neutral)` | Icon and status dot color |
| `--tag-height` | `32px` | Height. An icon-only tag uses it as its width too |
| `--tag-fs` | `var(--typo-text-md-FS)` | Font size |
| `--tag-padding-inline` | `var(--spacing-lg)` | Padding at the start and the end |
| `--tag-dot-size` | `10px` | Size of the status dot |
| `--tag-label-max` | `160px` | Widest the label gets before it ends with an ellipsis |
{: .nds-table .nds-responsive}

The theme-wide tag colors are the `--tag-background-*`, `--tag-text-*`, `--tag-border-*` and `--tag-icon-*` tokens, and `--tag-dot` for the dot of an inverted tag. See [Tokens](../components/tokens).

</div>
  </div>
</section>

<section id="tagRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Manage Records](../examples/manage-records): status tags in the rows of a table.
- [Admin Console Demo](../examples/console-demo): status tags beside the figures.
- [Faculty CV](../examples/faculty-cv): small tags for the type and the year of each publication.
- [Service Page Template](../templates/service-template): tags for a popular service and the system that runs it.
- [Cards](../components/cards): the status tag in the card header.
- [Chips](../components/chips): labels the user clicks or removes.

</div>
  </div>
</section>
