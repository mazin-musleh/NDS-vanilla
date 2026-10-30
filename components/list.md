---
layout: page
title: List
hero_title: List - National Design System
hero_description: A set of items in a grid, each a card with a title, one or two lines of text and often an icon
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "30/10/2026 - 11:19 AM"
---

<section id="list-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A list shows a set of items, such as features, benefits or reasons, in a [grid](../layout/grid). The list is a `ul`, and each item is a [card](../components/card) with a title, a description and often a [featured icon](../components/featured-icon). Classes on the list give every item the same look: the size, the layout, and either no box (`nds-flat`) or a card box (`nds-stroke`, `nds-shadow`).

Pick another component when:

- each item is a name and its value: [Definition List](../components/definition-list)
- an item carries an image, tags, a price or actions: [Card](../components/card)
- each item opens a page: [Drawer](../components/drawer)

</div>
  </div>
</section>

<section id="list-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="list-base" data-canon data-variants="list-variants-table">
<ul class="nds-list nds-grid nds-flat" style="--max-col: 2; --min-col: 1;">
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

<section id="list-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Icons and Icon color options go on every icon: write the class on each `.nds-featured-icon`. The other options go on the list.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Columns | Two (default) | — | — | The canon writes `--max-col: 2` and `--min-col: 1`: two columns, and one on phones. Tablets take `--max-col` unless the list sets `--mid-col` |
| Columns | One (hint: One item per row) | `--max-col: 1` | `.nds-list` | One item per row. A list with no `--max-col` and no `--min-width` gets it too |
| Columns | Minimum width (hint: As many columns as fit; the rest wrap) | `--min-width: 220px` | `.nds-list` | As many columns as fit at a minimum width. Write it in the list's `style`: there it turns off the one-column default |
| Layout | Stacked (default) | — | — | The icon above the text |
| Layout | Row (hint: The icon beside the text) | `.nds-horizontal` | `.nds-list` | The icon beside the text. Use it for a long list, or a list in a narrow column |
| Layout | Centered | `.nds-center` | `.nds-list` | The icon and the text centered. Use it for a short list of three or four items |
| Size | SM | `.nds-sm` | `.nds-list` | Smaller icons, text and gaps, for a list in a card or a side column |
| Size | MD (default) | — | — | The card's own sizes: a 40px icon |
| Size | LG | `.nds-lg` | `.nds-list` | Larger icons, text and gaps, for a list that leads a page |
| Icons (any) | Default (default) (hint: A light fill in the icon's color) | — | — | The icon as the canon writes it: a light fill in its color, with square corners |
| Icons (any) | Outline (limit: 1 icon style) | `.nds-outline` | `.nds-list .nds-featured-icon` | No fill and a border in the icon's color. Not with Dark or Subtle |
| Icons (any) | Dark (limit: 1 icon style) (hint: A solid fill and a white icon) | `.nds-dark` | `.nds-list .nds-featured-icon` | A solid fill and a white icon. Not with Outline or Subtle |
| Icons (any) | Subtle (limit: 1 icon style) (hint: The icon alone, with no container) | `.nds-subtle` | `.nds-list .nds-featured-icon` | The icon alone, one size smaller. Use it where the list sits beside other content and must read lighter. Not with Outline, Dark or Circle |
| Icons (any) | Circle (hint: Round icons) | `.nds-circle` | `.nds-list .nds-featured-icon:not(.nds-subtle)` | Round icons. It combines with Outline and Dark |
| Icons (any) | None (hint: A title and a description only) | remove | `.nds-list > .nds-card > .nds-card-header` | Items with no header: a title and a description only |
| Icon color | Brand (default) | — | `.nds-list .nds-featured-icon` | The brand color on the icons |
| Icon color | Neutral | `.nds-neutral` | `.nds-list .nds-featured-icon` | A neutral icon. Also `.nds-gray` |
| Icon color | Green | `.nds-green` | `.nds-list .nds-featured-icon` | A green icon |
| Icon color | Yellow | `.nds-yellow` | `.nds-list .nds-featured-icon` | A yellow icon |
| Icon color | Red | `.nds-red` | `.nds-list .nds-featured-icon` | A red icon |
| Icon color | Blue | `.nds-blue` | `.nds-list .nds-featured-icon` | A blue icon |
| Lines | None (default) | — | — | No lines between the items |
| Lines | Row lines (hint: A line between rows) | `.nds-divided-rows` | `.nds-list` | A line between rows, in the middle of the gap |
| Lines | All lines (hint: A line between rows and between columns) | `.nds-divided` | `.nds-list` | A line between rows and between columns. Column lines show only in browsers that draw grid gap lines |
| Box (any) | Flat (default) (hint: No fill and no padding) | `.nds-flat` | `.nds-list:not(.nds-stroke, .nds-shadow)` | No fill and no padding, and a muted description: the items read as text, not boxes. Not with Stroke or Shadow |
| Box (any) | Stroke (hint: A card box with a border) | `.nds-stroke` | `.nds-list:not(.nds-flat)` | Every item is a card box with a 1px border. Not with Flat. It combines with Shadow |
| Box (any) | Shadow (hint: A card box with a shadow) | `.nds-shadow` | `.nds-list:not(.nds-flat)` | Every item is a card box with a shadow. Not with Flat. It combines with Stroke |
{: #list-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="list-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-list nds-grid nds-flat nds-divided-rows nds-horizontal">
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-layers-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Real Cards</span>
              <p class="nds-card-description">Each item is a card. Its knobs and its icon's classes still work, so one item can differ from the others.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-grid-view" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Grid Layout</span>
              <p class="nds-card-description">Columns, gaps and lines are the grid's. Row lines show in every browser.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-text-font" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">One Size for All Items</span>
              <p class="nds-card-description"><code class="nds-inline-code lang-html">nds-sm</code> and <code class="nds-inline-code lang-html">nds-lg</code> on the list change every icon, title, description and gap together.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-smart-phone-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Fits Narrow Columns</span>
              <p class="nds-card-description">A list under 400px wide makes its icons and gaps smaller. The text keeps its size. A size class written on the list stays as written.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-colors" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">One Look for Every Item</span>
              <p class="nds-card-description">One class on the list gives every item the same box and layout: flat, a border, a shadow, a row or centered.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-package" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Lists Inside Cards</span>
              <p class="nds-card-description">In a card, the items take the list's look and knobs, not the outer card's.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-accessibility" aria-hidden="true"></i></span>
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

<section id="list-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Keep each item to a short title and one or two lines. An item that needs more is a [card](../components/card).
- For more than one column, set `--max-col` on the list. Without it, the items stack in one column.
- A list fills its parent's width. In a box that sizes to its content (an inline block, a table cell, a flex row that centers), give the list a width: it measures itself to step down when narrow, so it cannot size the box.
- Set the size, the layout and the box on the list, never on one item: the list's class wins, and the items line up.
- Give each icon its own look and color classes (`nds-subtle`, `nds-green`, …), so one icon can differ. An item may hold an avatar or an image instead of an icon.
- Hide every icon from screen readers with `aria-hidden="true"`. The title names the item.
- Put the list after a heading that says what the features are for.

</div>
  </div>
</section>

<section id="list-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### CSS Custom Properties
{: .nds-block-title}

These card and icon knobs set on the list reach every item. Set one on one card or icon to change that item only. The list's classes change the defaults as the table says.

| Property | Default | Controls |
|---|---|---|
| `--card-bg` | the card's. `nds-flat`: `transparent` | Item fill |
| `--card-padding` | the card's. `nds-flat`: `0` | Item padding |
| `--card-text-color` | the card's. `nds-flat`: `var(--text-secondary-paragraph)` | Description color |
| `--card-title-FS`, `--card-title-LH` | the card's: `--typo-text-lg-*` | Title size. `nds-sm` sets `--typo-text-md-*`, `nds-lg` sets `--typo-text-xl-*` |
| `--card-description-FS`, `--card-description-LH` | the card's: `--typo-text-md-*` | Description size. `nds-sm` sets `--typo-text-sm-*`, `nds-lg` sets `--typo-text-lg-*` |
| `--card-gap` | the card's: `var(--spacing-3xl)`, `var(--spacing-xl)` on phones | Space between the icon and the text. `nds-sm` and a list under 400px wide set `var(--spacing-lg)`, `nds-lg` sets `var(--spacing-4xl)` |
| `--featuredicon-size` | `40px` | Icon size. `nds-sm` and a list under 400px wide set `32px`, `nds-lg` sets `48px` |
{: .nds-table .nds-responsive}

The list is a [grid](../layout/grid#grid-api), so its columns and gaps are the grid's knobs. One default differs: `--max-col` is `1`, unless the list's `style` writes `--min-width`.

### JavaScript
{: .nds-block-title}

List has no script of its own. With `nds-divided` or `nds-divided-rows`, the [grid](../layout/grid) script marks the last row, so no line shows under it.

</div>
  </div>
</section>

<section id="list-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Training Academy](../examples/training-academy): the "Why train with us" section, with subtle icons in three columns.

</div>
  </div>
</section>
