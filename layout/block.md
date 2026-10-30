---
layout: page
title: Block
hero_title: Block Layout - National Design System
hero_description: A block is a spacing unit for content and components, with an optional title
breadcrumb: [["Layout", "/components/?shelf=Layout"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "25/10/2026 - 10:10 PM"
---

<section id="block-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A block is one class, `nds-block`, on any element. It makes the element full width and puts a 32px gap below it. The last block in its parent has no gap, and a [Divider](../components/divider) right after a block sets the gap with its own space. A block has no padding, border or background: add `nds-card nds-stroke` to box it. Put it on a wrapper around text, or straight on a component such as a grid, a tab set or a table. An optional `nds-block-title` heading sits at the top. A block needs no JavaScript.

Pick another component when:

- the content is a new topic with its own heading and background: [Section](../layout/section)

</div>
  </div>
</section>

<section id="block-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="block-titled" data-canon data-variants="block-variants-table">
<!-- Three blocks. The last one has no title -->
<div class="nds-block nds-prose">
  <h3 class="nds-block-title">Eligibility</h3>
  <p>Saudi citizens aged 18 or older can apply. Residents apply through their employer.</p>
  <p>The request is reviewed within 5 working days.</p>
</div>
<div class="nds-block nds-prose">
  <h3 class="nds-block-title">Required Documents</h3>
  <ul>
    <li>National ID or Iqama</li>
    <li>Proof of address</li>
  </ul>
</div>
<div class="nds-block nds-prose">
  <p>For help, call 19911 from Sunday to Thursday, 8 AM to 4 PM.</p>
</div>
</script>
<script type="text/html" id="block-component" data-canon>
<!-- The block class straight on a grid, then a block of text below it -->
<div class="nds-block nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
  <div class="nds-card nds-stroke">Apply online</div>
  <div class="nds-card nds-stroke">Track a request</div>
  <div class="nds-card nds-stroke">Book a visit</div>
</div>
<div class="nds-block nds-prose">
  <p>Each service needs a Nafath account.</p>
</div>
</script>
    </div>
  </div>
</section>

<section id="block-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Example | Titled blocks (default) | — | — | Text that belongs together under one heading. Add `nds-prose` to a block of bare paragraphs and lists. The title is optional |
| Example | Block on a component | canon `#block-component` | — | Gives a grid, a tab set or a table the same gap as a text block. Put `nds-block` on the component itself, not on a wrapper |
| Card | Card | `.nds-card` | `.nds-block:not(.nds-grid)` | Puts each block in a card with padding and a 1px border. Write both classes. Not on a block that is a grid |
| Card | Card | `.nds-stroke` | `.nds-block:not(.nds-grid)` | The card's border. Written with `nds-card` |
{: #block-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="block-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-list nds-grid nds-flat nds-divided nds-horizontal">
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-distribute-vertical-center" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Consistent Vertical Rhythm</span>
              <p class="nds-card-description">Each block puts a 32px gap below it. The last block in its parent has none, so the parent ends flush. A divider after a block replaces the gap with its own space.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-image-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Media Sizing</span>
              <p class="nds-card-description">An <code class="nds-inline-code lang-html">&lt;img&gt;</code> that is a direct child is 80% wide and centered, and full width below 960px. A direct <code class="nds-inline-code lang-html">&lt;video&gt;</code> is centered, at most 60% of the screen height.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-menu-square" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Optional Titled Heading</span>
              <p class="nds-card-description">Add <code class="nds-inline-code lang-html">nds-block-title</code> when the block needs a heading. CSS custom properties set its size, weight, color and gap.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-layout-grid" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Works Anywhere</span>
              <p class="nds-card-description">A block needs no parent: it keeps the same gap in a section body, a card or a grid column.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="block-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use blocks to split one [section](../layout/section) into parts. Start a new section for a new topic.
- Put each group in its own block. Two groups in one block get no block gap between them.
- Put `nds-block` straight on a grid, a tab set or a table. A wrapper around one component adds nothing.
- Add `nds-prose` to a block of bare paragraphs and lists, so they get space between them.
- Do not nest blocks. If a part needs its own heading level, it may belong in a new section.
- Keep block titles short. A block title is smaller than the section title, so the section title stays the main heading.
- Leave out the title when the block is the only one in its section: the section title already names it.
- Write a block title as a real heading (`h3` under a section `h2`), so screen readers list it.
- Give every image an `alt` text.

</div>
  </div>
</section>

<section id="block-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-block` | Any element | Full width, with a 32px gap below. No gap on the last child, and a divider right after it sets its own space instead |
| `nds-block-title` | A heading at the top of a block | The block's title. No gap below it when it is the last child |
| `nds-cq` | `.nds-block` | Makes a grid inside follow the block's width. Opt-in, because it traps `position: fixed` children, such as a modal or a dropmenu, inside the block. See [Grid](../layout/grid) |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these in the `style` of `.nds-block-title`, or of any element around it.

| Property | Default | Controls |
|---|---|---|
| `--block-title-FS` | `var(--typo-text-xl-FS)` | Title font size |
| `--block-title-LH` | `var(--typo-text-xl-LH)` | Title line height |
| `--block-title-FW` | `var(--font-weight-semibold)` | Title font weight |
| `--block-title-MB` | `var(--spacing-lg)` | Space below the title |
| `--block-title-color` | `var(--text-display)` | Title color |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="block-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Content Template](../templates/content-template): titled blocks that split an article into sub-sections.
- [About Entity Template](../templates/about-entity-template): `nds-block` straight on a card grid.
- [Program](../examples/program): text blocks, and a block with `nds-cq`.
- [Sign In](../examples/sign-in): a block on a centered flex column.

</div>
  </div>
</section>
