---
layout: page
title: Block
hero_title: Block Layout - National Design System
hero_description: A block is a spacing unit for content and components, with an optional title
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.6.0"
last_edit: "06/10/2026 - 10:17 PM"
---

<section id="blockOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A block is one class, `nds-block`, on any element. It makes the element full width and puts a 32px gap below it. The last block in its parent has no gap. A block has no padding, border or background: add `nds-card nds-stroke` to box it. Put it on a wrapper around text, or straight on a component such as a grid, a tab set or a table. An optional `nds-block-title` heading sits at the top. A block needs no JavaScript.

Pick another component when:

- the content is a new topic with its own heading and background: [Section](../layout/section)

</div>
  </div>
</section>

<section id="blockMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="block-titled" data-canon data-variants="blockVariantsTable">
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

<section id="blockVariants" class="nds-content-section nds-doc-variants" hidden>
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
{: #blockVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="blockFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-distribute-vertical-center"></i>
            <span class="nds-label">Consistent Vertical Rhythm</span>
          </span>
          <p class="nds-item-desc">Each block puts a 32px gap below it. The last block in its parent has none, so the parent ends flush.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-image-01"></i>
            <span class="nds-label">Media Sizing</span>
          </span>
          <p class="nds-item-desc">An <code class="nds-inline-code lang-html">&lt;img&gt;</code> that is a direct child is 80% wide and centered, and full width below 960px. A direct <code class="nds-inline-code lang-html">&lt;video&gt;</code> is centered, at most 60% of the screen height.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-menu-square"></i>
            <span class="nds-label">Optional Titled Heading</span>
          </span>
          <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-block-title</code> when the block needs a heading. CSS custom properties set its size, weight, color and gap.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-grid"></i>
            <span class="nds-label">Works Anywhere</span>
          </span>
          <p class="nds-item-desc">A block needs no parent: it keeps the same gap in a section body, a card or a grid column.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="blockPractices" class="nds-content-section nds-doc-practices">
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

<section id="blockApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-block` | Any element | Full width, with a 32px gap below. No gap on the last child |
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

<section id="blockRelated" class="nds-content-section nds-doc-related">
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
