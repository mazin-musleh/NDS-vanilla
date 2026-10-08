---
layout: page
title: Flex
hero_title: Flex - National Design System
hero_description: A flex container lays out its children in one row or one column, with the alignment and gap you set
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "08/10/2026 - 09:36 PM"
---

<section id="flexOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A flex container is one class, `nds-flex`, on the element that holds the children. It lays them out in one row. Classes change the direction, the order and the wrapping. CSS custom properties in its `style` set the alignment and the gap. Flex needs no JavaScript.

Pick another component when:

- the children sit in columns that change with the screen width: [Grid](../layout/grid)
- the parts stack down the page, each with space below it: [Block](../layout/block)

</div>
  </div>
</section>

<section id="flexMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="flex-row" data-canon data-variants="flexVariantsTable" data-demo-width="100%">
<div class="nds-flex">
  <button type="button" class="nds-btn nds-primary">
    <span class="nds-label">Submit</span>
  </button>
  <button type="button" class="nds-btn nds-secondary-outline">
    <span class="nds-label">Save Draft</span>
  </button>
  <button type="button" class="nds-btn nds-secondary-outline">
    <span class="nds-label">Preview</span>
  </button>
  <button type="button" class="nds-btn nds-secondary-outline">
    <span class="nds-label">Cancel</span>
  </button>
</div>
</script>
    </div>
  </div>
</section>

<section id="flexVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Each Justify, Align and Gap option sets one custom property in the `style` of `.nds-flex`. Any value that the CSS property accepts works: see CSS Custom Properties in the API. Justify is off in a column: the column is only as tall as its children, so they have no room to move.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Direction | Row (default) | — | — | The children sit side by side at their own widths, such as a set of buttons |
| Direction | Column | `.nds-col` | `.nds-flex` | The children stack, such as cards or form steps. A child with no width of its own, such as a card, fills the column |
| Justify | Start (default) | — | — | The children sit at the start edge |
| Justify | Center | `--justify: center` | `.nds-flex:not(.nds-col)` | The children sit in the middle of the row. In a column, use Align: Center |
| Justify | End | `--justify: flex-end` | `.nds-flex:not(.nds-col)` | The children sit at the end edge, such as the actions under a form |
| Justify | Space between | `--justify: space-between` | `.nds-flex:not(.nds-col)` | The first child sits at the start and the last at the end. The rest of the space is shared between them. For a title and an action on one line |
| Align | Stretch (default) (hint: Each child fills the row height, or the column width) | — | — | Each child fills the row height, or the column width. A button keeps its own size |
| Align | Center | `--align: center` | `.nds-flex` | Children of different heights line up on their middles. In a column, each child keeps its own width and sits in the middle |
| Align | Start | `--align: flex-start` | `.nds-flex` | Each child keeps its own size and sits at the top, or at the start edge in a column |
| Align | End | `--align: flex-end` | `.nds-flex` | Each child keeps its own size and sits at the bottom, or at the end edge in a column |
| Gap | XS (hint: 4px between the children) | `--gap: var(--spacing-xs)` | `.nds-flex` | 4px. Small children close together, such as icon buttons in a table cell |
| Gap | MD (hint: 8px between the children) | `--gap: var(--spacing-md)` | `.nds-flex` | 8px. Tags and chips |
| Gap | XL (default) (hint: 16px between the children) | — | — | 16px |
| Gap | 3XL (hint: 24px between the children) | `--gap: var(--spacing-3xl)` | `.nds-flex` | 24px. Larger children, such as cards in a column |
| Wrap | Wrap | `.nds-wrap` | `.nds-flex:not(.nds-col)` | The children flow onto a new line when the row is full. Row only: a column wraps only when it has a fixed height |
| Reverse | Reverse (hint: Shows the children in the opposite order, from the other edge) | `.nds-reverse` | `.nds-flex` | Shows the children in the opposite order. They also move to the other edge: with Justify Start they sit at the end. The keyboard order stays the markup order |
{: #flexVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="flexFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code"></i>
            <span class="nds-label">CSS-Only</span>
          </span>
          <p class="nds-item-desc">One class makes the layout. There is no script to load or start.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-align-box-middle-center"></i>
            <span class="nds-label">Default Layout</span>
          </span>
          <p class="nds-item-desc">The children sit at the start edge, 16px apart. They stretch to the tallest child in a row, and to the full width in a column, unless a child has its own size, as a button does.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-distribute-horizontal-center"></i>
            <span class="nds-label">Custom Property API</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-css">--justify</code>, <code class="nds-inline-code lang-css">--align</code> and <code class="nds-inline-code lang-css">--gap</code> change the layout from the <code class="nds-inline-code lang-html">style</code> attribute, with no new class.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-exchange-01"></i>
            <span class="nds-label">Direction on Any Flex Element</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">nds-row</code> and <code class="nds-inline-code lang-html">nds-col</code> work without <code class="nds-inline-code lang-html">nds-flex</code>, on a component that is already a flex container, such as card actions.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-left-right"></i>
            <span class="nds-label">Scoped Reverse</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">nds-reverse</code> reverses only a flex container. A component that has its own <code class="nds-inline-code lang-html">nds-reverse</code>, such as the stepper, keeps its own meaning.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-wrap"></i>
            <span class="nds-label">Wrap Control</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">nds-wrap</code> lets the children flow onto new lines. A <code class="nds-inline-code lang-css">min-width</code> on each child makes them stack when the container gets narrow, whatever the screen width.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="flexPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use flex to lay out a few elements in one line, such as buttons, tags or icons. Use [Grid](../layout/grid) for columns of content, and [Section](../layout/section) for page regions.
- For a row that becomes a column on phones, use a grid with `--max-col: 2; --min-col: 1;`. Flex has no values for each screen size.
- Set `--gap` with a spacing token, such as `var(--spacing-sm)`.
- Add `--align: center` when a row mixes children of different heights, such as a heading and a button.
- Add `nds-row` or `nds-col` alone to a component that is already a flex container, such as `nds-card-actions nds-row`. Do not add `nds-flex` to it as well.
- Do not use `nds-reverse` to fix the order of content people read. A keyboard and a screen reader still follow the markup order. Use it only where the order on screen differs on purpose.
- In normal page flow, a flex container is as wide as its parent. In a parent that centers it, it shrinks to its content: add `width: 100%` to its `style` to fill the parent.
- To make a flex container as wide as its content, add `width: fit-content` to its `style`.

</div>
  </div>
</section>

<section id="flexApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-flex` | The element that holds the children | Makes it a flex container, in a row |
| `nds-row` | Any flex container, with or without `nds-flex` | Lays the children out in a row |
| `nds-col` | Any flex container, with or without `nds-flex` | Lays the children out in a column |
| `nds-reverse` | `.nds-flex`, `.nds-row` or `.nds-col` | Shows the children in the opposite order. It also swaps the start and end edges, so `--justify: flex-start` puts them at the end |
| `nds-center` | `.nds-flex` | Centers the children along the row, the same as `--justify: center`. With `nds-col` it also centers them across. It centers the text inside too |
| `nds-wrap` | Any flex container | Lets the children flow onto new lines |
| `nds-nowrap` | Any flex container | Keeps the children on one line. Children that do not fit overflow |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these in the `style` of `.nds-flex`.

| Property | Default | Controls |
|---|---|---|
| `--justify` | `flex-start` | `justify-content`: where the children sit along the row or the column, such as `center`, `flex-end` or `space-between`. `flex-start` and `flex-end` follow the text direction |
| `--align` | `stretch` | `align-items`: how the children sit across the row or the column, such as `center`, `flex-start` or `baseline` |
| `--gap` | `var(--spacing-xl)` | Space between the children |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="flexRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Manage Records](../examples/manage-records): a tight row of icon buttons in each table row.
- [Faculty CV](../examples/faculty-cv): a wrapping row of tags and a column of cards.
- [Form Template](../templates/form-template): each form step is a column.

</div>
  </div>
</section>
