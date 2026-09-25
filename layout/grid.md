---
layout: page
title: Grid
hero_title: Grid System - National Design System
hero_description: A grid lays out its children in columns that adapt to the screen width
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.0"
last_edit: "26/09/2026 - 12:17 AM"
---

<section id="gridOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A grid is one class, `nds-grid`, on the element that holds the items. CSS custom properties in its `style` set the layout: a column count, a minimum column width, or a track template. Each can take another value on tablets and phones. Every child fills its cell. A grid needs no JavaScript.

Pick another component when:

- the items sit in one row or one column at their own widths: [Flex](../layout/flex)
- the page needs regions, such as a title, a body and a side column: [Section](../layout/section)

</div>
  </div>
</section>

<section id="gridMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="grid-equal" data-canon data-variants="gridVariantsTable">
<!-- One equal column per child, all in one row -->
<div class="nds-grid">
  <div class="nds-card nds-stroke">1</div>
  <div class="nds-card nds-stroke">2</div>
  <div class="nds-card nds-stroke">3</div>
  <div class="nds-card nds-stroke">4</div>
</div>
</script>
<script type="text/html" id="grid-columns" data-canon>
<!-- 3 columns on desktop, 2 on tablets, 1 on phones -->
<div class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
  <div class="nds-card nds-stroke">1</div>
  <div class="nds-card nds-stroke">2</div>
  <div class="nds-card nds-stroke">3</div>
  <div class="nds-card nds-stroke">4</div>
  <div class="nds-card nds-stroke">5</div>
  <div class="nds-card nds-stroke">6</div>
</div>
</script>
<script type="text/html" id="grid-min-width" data-canon>
<!-- As many columns of 200px or more as fit; the rest wrap -->
<div class="nds-grid" style="--min-width: 200px;">
  <div class="nds-card nds-stroke">1</div>
  <div class="nds-card nds-stroke">2</div>
  <div class="nds-card nds-stroke">3</div>
  <div class="nds-card nds-stroke">4</div>
  <div class="nds-card nds-stroke">5</div>
  <div class="nds-card nds-stroke">6</div>
</div>
</script>
<script type="text/html" id="grid-main-side" data-canon>
<!-- A main column twice the side column, stacked below 960px -->
<div class="nds-grid" style="--max-track: 2fr 1fr; --mid-track: 1fr;">
  <div class="nds-card nds-stroke">Main content</div>
  <div class="nds-card nds-stroke">Side column</div>
</div>
</script>
<script type="text/html" id="grid-fixed-side" data-canon>
<!-- A 240px side column and a flexible main column, stacked below 960px -->
<div class="nds-grid" style="--max-track: 240px 1fr; --mid-track: 1fr;">
  <div class="nds-card nds-stroke">Side menu</div>
  <div class="nds-card nds-stroke">Main content</div>
</div>
</script>
<script type="text/html" id="grid-gaps" data-canon>
<!-- 32px between rows, 8px between columns -->
<div class="nds-grid" style="--max-col: 3; --min-col: 1; --row-gap: var(--spacing-4xl); --col-gap: var(--spacing-md);">
  <div class="nds-card nds-stroke">1</div>
  <div class="nds-card nds-stroke">2</div>
  <div class="nds-card nds-stroke">3</div>
  <div class="nds-card nds-stroke">4</div>
  <div class="nds-card nds-stroke">5</div>
  <div class="nds-card nds-stroke">6</div>
</div>
</script>
<script type="text/html" id="grid-center" data-canon>
<!-- Each child keeps its own width, in the middle of its column -->
<div class="nds-grid nds-center" style="--max-col: 3;">
  <button type="button" class="nds-btn nds-secondary-outline">
    <span class="nds-label">Call</span>
  </button>
  <button type="button" class="nds-btn nds-secondary-outline">
    <span class="nds-label">Email</span>
  </button>
  <button type="button" class="nds-btn nds-secondary-outline">
    <span class="nds-label">Chat</span>
  </button>
</div>
</script>
<script type="text/html" id="grid-container" data-canon>
<!-- The same grid in a wide column and in a 280px side column. Each takes its columns
     from its nds-cq parent's width, not the screen's: the side column gets one -->
<div class="nds-grid" style="--max-track: 1fr 280px; --mid-track: 1fr;">
  <div class="nds-card nds-shadow nds-stroke nds-full nds-cq">
    <div class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
      <div class="nds-card nds-stroke">Main 1</div>
      <div class="nds-card nds-stroke">Main 2</div>
      <div class="nds-card nds-stroke">Main 3</div>
    </div>
  </div>
  <aside class="nds-card nds-shadow nds-stroke nds-full nds-cq">
    <div class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
      <div class="nds-card nds-stroke">Side 1</div>
      <div class="nds-card nds-stroke">Side 2</div>
      <div class="nds-card nds-stroke">Side 3</div>
    </div>
  </aside>
</div>
</script>
    </div>
  </div>
</section>

<section id="gridVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Each example is a whole grid. Change its values to fit your content: the knobs are in the API tables below. Use either a column count or a track value on one grid, not both: a track value overrides the columns.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Example | Equal columns (default) | — | — | Every child gets an equal column, all in one row. For a short, fixed set of items |
| Example | Columns per screen | canon `#grid-columns` | — | A set number of equal columns, with fewer on tablets and phones. `--mid-col` and `--min-col` fall back to the next larger value |
| Example | Minimum width | canon `#grid-min-width` | — | As many columns as fit at a minimum width. It needs no values for smaller screens. Do not add a column count, which then overflows |
| Example | Main and side | canon `#grid-main-side` | — | Columns of different widths, set with a `grid-template-columns` value. `--mid-track: 1fr` stacks them below 960px |
| Example | Fixed side column | canon `#grid-fixed-side` | — | A side column at a set width and a main column that takes the rest |
| Example | Gaps | canon `#grid-gaps` | — | Row and column gaps set apart. `--gap` sets both |
| Example | Centered items | canon `#grid-center` | — | Children at their own width, in the middle of their columns |
| Example | Container width | canon `#grid-container` | — | A grid inside an `nds-cq` element follows that element's width, not the screen's. The same grid shows more columns in a wide column than in a narrow one. The container steps are 768px and 480px |
{: #gridVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="gridFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-grid"></i>
            <span class="nds-label">Auto-fit Columns</span>
          </span>
          <p class="nds-item-desc">With no settings, the children share the row in equal columns.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-01"></i>
            <span class="nds-label">Minimum Width Wrapping</span>
          </span>
          <p class="nds-item-desc">Set <code class="nds-inline-code lang-css">--min-width</code>, and the items wrap once they cannot fit at that width. No media queries needed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-mobile-programming-01"></i>
            <span class="nds-label">Responsive Column Tokens</span>
          </span>
          <p class="nds-item-desc">Set a column count for each screen size with <code class="nds-inline-code lang-css">--max-col</code>, <code class="nds-inline-code lang-css">--mid-col</code> and <code class="nds-inline-code lang-css">--min-col</code>. A value you leave out falls back to the next larger one.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-three-column"></i>
            <span class="nds-label">Custom Track Layouts</span>
          </span>
          <p class="nds-item-desc">Set columns of different widths for each screen size with <code class="nds-inline-code lang-css">--max-track</code>, <code class="nds-inline-code lang-css">--mid-track</code> and <code class="nds-inline-code lang-css">--min-track</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-shrink"></i>
            <span class="nds-label">Adaptive Gap Scaling</span>
          </span>
          <p class="nds-item-desc">The default gap shrinks from 20px to 16px below 960px. A gap you set stays the same, and never goes under 8px there.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-align-box-middle-center"></i>
            <span class="nds-label">Alignment Tokens</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-css">--justify</code> and <code class="nds-inline-code lang-css">--align</code> set how the children sit in their cells. <code class="nds-inline-code lang-html">nds-center</code> centers them.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-artboard"></i>
            <span class="nds-label">Container-Aware (opt-in)</span>
          </span>
          <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-cq</code> to any element around a grid, and the grid follows that element's width, such as a sidebar. It is opt-in, because it traps <code class="nds-inline-code lang-css">position: fixed</code> children, such as a modal, inside that element.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="gridPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use Auto for a short set of items that must stay in one row. Use a minimum width when the number of columns should follow the space.
- With a fixed column count, set values for smaller screens too, such as `--mid-col: 2` and `--min-col: 1`. Without them, a phone gets the desktop column count.
- Use tracks for columns of different widths, such as main content and a side column. Add `--mid-track: 1fr` to stack them below 960px.
- Use either column values or track values on one grid, not both. A track value overrides the column count at the same screen size.
- Do not use a grid for one column of content. Normal page flow already does that.
- Do not build the page structure from grids inside grids. Use [Section](../layout/section) for page regions.
- A grid inside a grid gets the outer `--gap`, `--justify` and `--align`. Set them again on the inner grid when it needs its own.
- Add `nds-cq` only when a grid sits in a narrow column and must follow that column's width. It traps `position: fixed` children, such as a modal or a dropmenu, inside that element.
- Set `--gap` with a spacing token, such as `var(--spacing-md)`.

</div>
  </div>
</section>

<section id="gridApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-grid` | The element that holds the items | Makes it a full-width grid |
| `nds-center` | `.nds-grid` | Centers each child in its column. The same as `--justify: center` |
| `nds-cq` | Any element around a grid | Makes the grid inside follow this element's width. See the next table |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these in the `style` of `.nds-grid`.

| Property | Default | Controls |
|---|---|---|
| `--max-col` | `auto-fit` | Number of equal columns at 960px and up |
| `--mid-col` | `--max-col` | Number of columns from 600px to 959px |
| `--min-col` | `--mid-col` | Number of columns below 600px |
| `--max-track` | none | A `grid-template-columns` value at 960px and up. It overrides the column count |
| `--mid-track` | `--max-track` | Track value from 600px to 959px |
| `--min-track` | `--mid-track` | Track value below 600px |
| `--min-width` | `0` | Smallest column width. With no column count, as many columns as fit, and the rest wrap |
| `--gap` | `var(--spacing-2xl)` | Space between rows and columns. The default is 16px below 960px |
| `--row-gap`, `--col-gap` | `--gap` | Space between rows, or between columns, alone |
| `--justify` | `stretch` | `justify-items`: how a child sits across its column |
| `--align` | `start` | `align-items`. Children fill the row height, so it changes only a child with its own height |
{: .nds-table .nds-responsive}

### Screen and Container Widths
{: .nds-block-title}

| Values | Screen width | Inside `.nds-cq` |
|---|---|---|
| `--max-col`, `--max-track` | 960px and up | wider than 768px |
| `--mid-col`, `--mid-track` | 600px to 959px | 768px or less |
| `--min-col`, `--min-track` | below 600px | 480px or less |
{: .nds-table .nds-responsive}

The container widths apply only inside an `nds-cq` element. The screen widths still apply there too.


</div>
  </div>
</section>

<section id="gridRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Home Page Template](../templates/home-template) and [KPIs Template](../templates/kpis-template): card grids with values for each screen size.
- [Program](../examples/program): grids inside `nds-cq` elements.
- [Block](../layout/block): when a block needs `nds-cq`.

</div>
  </div>
</section>
