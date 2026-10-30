---
layout: page
title: Feature List
hero_title: Feature List - National Design System
hero_description: A list of features, each with an icon, a title and one or two lines of text
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "30/10/2026 - 02:43 AM"
---

<section id="feature-list-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A feature list shows a set of features, benefits or reasons in a [grid](../layout/grid). The list is a `ul`, and each item is a [card](../components/card) with a [featured icon](../components/featured-icon), a title and a description. The list gives its cards a lighter look: no box, and a muted description.

Pick another component when:

- each item is a name and its value: [Definition List](../components/definition-list)
- an item carries an image, tags, a price or actions: [Card](../components/card)
- each item opens a page: [Drawer](../components/drawer)

</div>
  </div>
</section>

<section id="feature-list-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="feature-list-base" data-canon data-variants="feature-list-variants-table">
<ul class="nds-feature-list nds-grid" style="--max-col: 2; --min-col: 1;">
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-file-edit" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Apply Online</span>
        <p class="nds-card-description">Send the request and its documents from one form, with no office visit.</p>
      </div>
    </div>
  </li>
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Track Your Request</span>
        <p class="nds-card-description">See each step of the review and the date of the decision.</p>
      </div>
    </div>
  </li>
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-notification-01" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Instant Alerts</span>
        <p class="nds-card-description">Get a text message when the request needs an action from you.</p>
      </div>
    </div>
  </li>
  <li class="nds-card">
    <div class="nds-card-header">
      <div class="nds-card-featured-icon">
        <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-square-lock-02" aria-hidden="true"></i></span>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Secure Sign-in</span>
        <p class="nds-card-description">Sign in with your national digital identity.</p>
      </div>
    </div>
  </li>
</ul>
</script>
    </div>
  </div>
</section>

<section id="feature-list-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Layout, Color and Box options go on every item: write the class on each `li.nds-card`.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Columns | Two (default) | — | — | The canon writes `--max-col: 2` and `--min-col: 1`: two columns, and one on phones. Tablets take `--max-col` unless the list sets `--mid-col` |
| Columns | One (hint: One item per row) | `--max-col: 1` | `.nds-feature-list` | One item per row. A list with no `--max-col` gets it too |
| Columns | Minimum width (hint: As many columns as fit; the rest wrap) | `--min-width: 220px` | `.nds-feature-list` | As many columns as fit at a minimum width. Write `--max-col: auto-fit` too: the list's one-column default otherwise wins |
| Columns | Minimum width (hint: As many columns as fit; the rest wrap) | `--max-col: auto-fit` | `.nds-feature-list` | As many columns as fit at a minimum width. Write `--min-width` too |
| Layout | Stacked (default) | — | — | The icon above the text |
| Layout | Row (hint: The icon beside the text) | `.nds-horizontal` | `.nds-feature-list > .nds-card` | The icon beside the text. Use it for a long list, or a list in a narrow column |
| Layout | Centered | `.nds-center` | `.nds-feature-list > .nds-card` | The icon and the text centered. Use it for a short list of three or four items |
| Size | SM | `.nds-sm` | `.nds-feature-list` | Smaller icons, text and gaps, for a list in a card or a side column |
| Size | MD (default) | — | — | The card's own sizes: a 40px icon |
| Size | LG | `.nds-lg` | `.nds-feature-list` | Larger icons, text and gaps, for a list that leads a page |
| Icon style | Light (default) | — | — | A light fill in the icon's color |
| Icon style | Outline | `.nds-icons-outline` | `.nds-feature-list` | No fill and a border in the icon's color |
| Icon style | Dark (hint: A solid fill and a white icon) | `.nds-icons-dark` | `.nds-feature-list` | A solid fill and a white icon |
| Icon style | Subtle (hint: The icon alone, with no container) | `.nds-icons-subtle` | `.nds-feature-list` | The icon alone, one size smaller. Use it where the list sits beside other content and must read lighter |
| Circle icons | Circle icons | `.nds-icons-circle` | `.nds-feature-list:not(.nds-icons-subtle)` | Round icons. It combines with Outline and Dark |
| Lines | Row lines (hint: A line between rows) | `.nds-divided-rows` | `.nds-feature-list` | A line between rows, in the middle of the gap |
| Lines | All lines (hint: A line between rows and between columns) | `.nds-divided` | `.nds-feature-list` | A line between rows and between columns. Column lines show only in browsers that draw grid gap lines |
| Color | Brand (default) | — | — | The brand color on the icons |
| Color | Neutral | `.nds-neutral` | `.nds-feature-list > .nds-card` | A neutral icon. The title keeps its color. Also `.nds-gray` |
| Color | Green | `.nds-green` | `.nds-feature-list > .nds-card` | Tints the title and the icon |
| Color | Yellow | `.nds-yellow` | `.nds-feature-list > .nds-card` | Tints the title and the icon |
| Color | Red | `.nds-red` | `.nds-feature-list > .nds-card` | Tints the title and the icon |
| Color | Blue | `.nds-blue` | `.nds-feature-list > .nds-card` | Tints the title and the icon |
| Box (any) | Stroke (hint: A card box with a border) | `.nds-stroke` | `.nds-feature-list > .nds-card` | Each item gets the card's fill and padding back, with a 1px border. It combines with Shadow |
| Box (any) | Shadow (hint: A card box with a shadow) | `.nds-shadow` | `.nds-feature-list > .nds-card` | Each item gets the card's fill and padding back, with a shadow. It combines with Stroke |
{: #feature-list-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="feature-list-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-feature-list nds-grid nds-divided-rows nds-icons-subtle">
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-layers-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Real Cards</span>
              <p class="nds-card-description">Each item is a card. Its classes and knobs still work, so one item can differ from the others.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-grid-view" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Grid Layout</span>
              <p class="nds-card-description">Columns, gaps and lines are the grid's. Row lines show in every browser.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-text-font" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">One Size for All Items</span>
              <p class="nds-card-description"><code class="nds-inline-code lang-html">nds-sm</code> and <code class="nds-inline-code lang-html">nds-lg</code> on the list change every icon, title, description and gap together.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-colors" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Icon Look from the List</span>
              <p class="nds-card-description">One class on the list sets the look of every icon. A class on one icon wins.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-package" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Lists Inside Cards</span>
              <p class="nds-card-description">In a card, the items keep the list's look, not the look of a card inside a card.</p>
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
              <span class="nds-card-title">A Real List</span>
              <p class="nds-card-description">A screen reader announces a list and its number of items. The list shows no bullets.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="feature-list-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Keep each item to a short title and one or two lines. An item that needs more is a [card](../components/card).
- For more than one column, set `--max-col` on the list. Without it, the items stack in one column.
- With `--min-width`, also write `--max-col: auto-fit`.
- Write a layout class (`nds-horizontal`, `nds-center`) on every item, so the items line up.
- Set the size and the icon look on the list, not on each icon. The `nds-icons-*` classes go on the list only.
- For one icon that must differ, write the icon's own class on its `.nds-featured-icon`: `nds-outline`, `nds-dark`, `nds-subtle`, `nds-circle`, or a size such as `nds-lg`.
- Write a box class (`nds-stroke`, `nds-shadow`) on every item, the same as a layout class. On one item only, it marks that item, such as a new one.
- Hide every icon from screen readers with `aria-hidden="true"`. The title names the item.
- Put the list after a heading that says what the features are for.

</div>
  </div>
</section>

<section id="feature-list-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### CSS Custom Properties
{: .nds-block-title}

The list sets these card and icon knobs, and its items inherit them. Set one on the list to change every item, or on one card or icon to change that item.

| Property | Default | Controls |
|---|---|---|
| `--card-bg` | `transparent` | Item fill |
| `--card-padding` | `0` | Item padding |
| `--card-text-color` | `var(--text-secondary-paragraph)` | Description color |
| `--card-title-FS`, `--card-title-LH` | the card's: `--typo-text-lg-*` | Title size. `nds-sm` sets `--typo-text-md-*`, `nds-lg` sets `--typo-text-xl-*` |
| `--card-description-FS`, `--card-description-LH` | the card's: `--typo-text-md-*` | Description size. `nds-sm` sets `--typo-text-sm-*`, `nds-lg` sets `--typo-text-lg-*` |
| `--card-gap` | the card's: `var(--spacing-3xl)`, `var(--spacing-xl)` on phones | Space between the icon and the text. `nds-sm` sets `var(--spacing-lg)`, `nds-lg` sets `var(--spacing-4xl)` |
| `--featuredicon-size` | `40px` | Icon size. `nds-sm` sets `32px`, `nds-lg` sets `48px` |
{: .nds-table .nds-responsive}

The list is a [grid](../layout/grid#grid-api), so its columns and gaps are the grid's knobs. One default differs: `--max-col` is `1`.

### JavaScript
{: .nds-block-title}

Feature List has no script of its own. With `nds-divided` or `nds-divided-rows`, the [grid](../layout/grid) script marks the last row, so no line shows under it.

</div>
  </div>
</section>

<section id="feature-list-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Training Academy](../examples/training-academy): the "Why train with us" section, with subtle icons in three columns.

</div>
  </div>
</section>
