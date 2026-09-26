---
layout: page
title: Definition List
hero_title: Definition List - National Design System
hero_description: Pairs of a title and a value, with optional icons, in a stacked, table, row or grid layout
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/09/2026 - 05:18 PM"
---

<section id="dlOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A definition list shows pairs of a title and a value, such as the fields of a profile or the points of a feature list. The list is `nds-definition-list`, and each pair is an `nds-definition-item`. A title can start with an icon.

Pick another component when:

- the data has several values for each row, or the user sorts it: [Tables](../components/tables)
- the items are links to other pages: [Link](../components/link) in a plain list
- the items start actions: [Dropmenu](../components/dropmenu)

</div>
  </div>
</section>

<section id="dlMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="dl-details" data-canon data-variants="dlVariantsTable">
<dl class="nds-definition-list">
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-user-account" aria-hidden="true"></i>
      <span class="nds-label">Full name</span>
    </dt>
    <dd>Mohammed Al-Harbi</dd>
  </div>
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-building-02" aria-hidden="true"></i>
      <span class="nds-label">Organization</span>
    </dt>
    <dd>Digital Services Department</dd>
  </div>
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-briefcase-02" aria-hidden="true"></i>
      <span class="nds-label">Position</span>
    </dt>
    <dd>Senior Developer</dd>
  </div>
</dl>
</script>
<script type="text/html" id="dl-features" data-canon>
<div class="nds-definition-list">
  <div class="nds-definition-item">
    <span class="nds-item-title">
      <i class="hgi hgi-stroke hgi-shield-01" aria-hidden="true"></i>
      <span class="nds-label">Security</span>
    </span>
    <p class="nds-item-desc">Every request is checked and logged.</p>
  </div>
  <div class="nds-definition-item">
    <span class="nds-item-title">
      <i class="hgi hgi-stroke hgi-universal-access" aria-hidden="true"></i>
      <span class="nds-label">Accessibility</span>
    </span>
    <p class="nds-item-desc">Full keyboard access and screen reader support.</p>
  </div>
  <div class="nds-definition-item">
    <span class="nds-item-title">
      <i class="hgi hgi-stroke hgi-flash" aria-hidden="true"></i>
      <span class="nds-label">Speed</span>
    </span>
    <p class="nds-item-desc">Pages load in under two seconds on a mobile network.</p>
  </div>
</div>
</script>
<script type="text/html" id="dl-actions" data-canon>
<dl class="nds-definition-list">
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-link-01" aria-hidden="true"></i>
      <span class="nds-label">Profile URL</span>
    </dt>
    <dd>
      <div class="nds-item-action">
        <span>https://example.gov.sa/profile</span>
        <button type="button" class="nds-btn nds-subtle nds-icon-only nds-sm">
          <i class="nds-icon nds-hgi-copy-01" aria-hidden="true"></i>
          <span class="nds-label">Copy URL</span>
        </button>
        <button type="button" class="nds-btn nds-subtle nds-icon-only nds-sm">
          <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
          <span class="nds-label">Share URL</span>
        </button>
      </div>
    </dd>
  </div>
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-mail-01" aria-hidden="true"></i>
      <span class="nds-label">Email</span>
    </dt>
    <dd>
      <div class="nds-item-action">
        <span>user@example.gov.sa</span>
        <button type="button" class="nds-btn nds-subtle nds-icon-only nds-sm">
          <i class="nds-icon nds-hgi-copy-01" aria-hidden="true"></i>
          <span class="nds-label">Copy email</span>
        </button>
      </div>
    </dd>
  </div>
</dl>
</script>
    </div>
  </div>
</section>

<section id="dlVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The Layout, Style, Size and Loading rows go on the list. The two Cards rows are one choice: add both classes to every item. Title icons are optional: leave out the `<i>` for a list without them.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Details (default) | — | — | `dl`, `dt` and `dd`, for data where each title names its value, such as a profile |
| Structure | Feature list | canon `#dl-features` | — | Plain elements with `nds-item-title` and `nds-item-desc`, for feature lists and highlights |
| Structure | With actions | canon `#dl-actions` | — | Values with buttons after them, such as copy and share. `nds-item-action` holds the value and its buttons in one row |
| Layout | Stacked (default) | — | — | Each value under its title, for long values |
| Layout | Table | `.nds-tableView` | `.nds-definition-list` | Titles in one column and values in the next, aligned across every item |
| Layout | Table on phones | `.nds-tableView-sm` | `.nds-definition-list` | The table layout below 600px only. Stacked on wider screens |
| Layout | Table on tablets | `.nds-tableView-md` | `.nds-definition-list` | The table layout from 600px to 959px only. Add `nds-tableView-lg` too for tablets and wider |
| Layout | Table on desktops | `.nds-tableView-lg` | `.nds-definition-list` | The table layout from 960px up. Stacked on smaller screens |
| Layout | Row | `.nds-rowView` | `.nds-definition-list` | Each title and value on one row that wraps, with no shared columns. For compact card details |
| Layout | Grid | `.nds-grid` | `.nds-definition-list` | Items in columns. `--max-col`, `--mid-col` and `--min-col` set the columns, see [Grid](../layout/grid) |
| Style | Plain (default) | — | — | No lines between items |
| Style | Divided | `.nds-divided` | `.nds-definition-list` | A line between items. In a table layout, the lines span both columns |
| Style | Cards | `.nds-card` | `.nds-definition-item` | Each item in its own card |
| Style | Cards | `.nds-stroke` | `.nds-definition-item` | The same: gives each card its border |
| Size | LG (default) | — | — | A 20px icon, a large title and the largest gap |
| Size | MD | `.nds-md` | `.nds-definition-list` | An 18px icon, a medium title, the same value size and a smaller gap |
| Size | SM | `.nds-sm` | `.nds-definition-list` | An 18px icon, a small title, a small value and the smallest gap |
| Loading | Loading | `.nds-loading` | `.nds-definition-list` | Gray bars in place of the titles and values while the data loads. The icons hide |
{: #dlVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="dlFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-table-01"></i>
            <span class="nds-label">Table View Layout</span>
          </span>
          <p class="nds-item-desc">Two columns built on CSS subgrid, so titles and values line up across every item.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-smartphone-wifi"></i>
            <span class="nds-label">Responsive Table View</span>
          </span>
          <p class="nds-item-desc">Turn the table layout on for phones, tablets or desktops only. Combine the classes to cover more than one screen range.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-border-all-01"></i>
            <span class="nds-label">Divided Borders</span>
          </span>
          <p class="nds-item-desc">Lines between items in every layout. With a responsive table view, the lines follow the layout on each screen size.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-grid-view"></i>
            <span class="nds-label">Grid Layout</span>
          </span>
          <p class="nds-item-desc">Items in columns that change with the screen size, set with <code class="nds-inline-code lang-css">--max-col</code>, <code class="nds-inline-code lang-css">--mid-col</code> and <code class="nds-inline-code lang-css">--min-col</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paint-board"></i>
            <span class="nds-label">CSS Custom Properties</span>
          </span>
          <p class="nds-item-desc">Custom properties set the icon size, the gaps and the font sizes, so no style needs an override.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-indent"></i>
            <span class="nds-label">Automatic Icon Indent</span>
          </span>
          <p class="nds-item-desc">In the stacked layout, a value lines up with its title's text when the title has an icon.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Loading Skeleton</span>
          </span>
          <p class="nds-item-desc">Gray bars stand in for the titles and values before the page is ready, and while <code class="nds-inline-code lang-html">nds-loading</code> is on.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="dlPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use `dl`, `dt` and `dd` when each title names its value, such as a profile or the details of a service. Screen readers read them as pairs.
- Use the plain elements with `nds-item-title` and `nds-item-desc` for feature lists and highlights.
- Keep the stacked layout when values are long or wrap to more lines.
- Use the table layout for short values side by side. For tablets and wider, add both `nds-tableView-md` and `nds-tableView-lg`.
- Use the row layout for compact details inside a card.
- Give every title icon `aria-hidden="true"`. The label names the item.
- Keep the label inside an icon-only action button. Screen readers read it as the button's name.
- In a divided list, add `nds-last-row` to the last item when another element comes after it in the list. Otherwise the item keeps the line under it.

</div>
  </div>
</section>

<section id="dlApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-last-row` | `.nds-definition-item` | Removes the line under the last divided item when another element comes after it in the list |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-state="loading"` | `.nds-definition-list` | The same as `nds-loading`, for a script that already sets states. Use one of the two |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the list. The size classes set the icon size, the title size and the row gap. A value in the list's `style` attribute wins over the size class.

| Property | Default | Controls |
|---|---|---|
| `--dl-icon-size` | `20px` | Size of a title icon. An icon never renders below 18px |
| `--dl-icon-gap` | half of `--dl-icon-size` | Gap between a title icon and its label |
| `--dl-title-FS` | `var(--typo-text-lg-FS)` | Title font size. `nds-md` sets `--typo-text-md-FS` and `nds-sm` sets `--typo-text-sm-FS` |
| `--dl-desc-FS` | `var(--typo-text-md-FS)` | Value font size. `nds-sm` sets `--typo-text-sm-FS` |
| `--row-gap` | `var(--spacing-lg)` | Gap between items |
| `--col-gap` | `var(--spacing-xl)` | Gap between a title and its value in the table layout. The row layout uses `var(--spacing-sm)` |
| `--gap` | — | Sets both gaps when `--row-gap` and `--col-gap` are not set |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="dlRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Faculty](../examples/faculty): table layouts for staff details, and a divided table on desktops.
- [Contact Us Template](../templates/contact-us-template): contact details in a table layout.
- [Form Template](../templates/form-template): a divided list of the answers to review before the user sends the form.
- [Help and Support Template](../templates/help-support-template): medium lists of support channels.
- Every component page: the Built-in Features section is a divided definition list in a grid.

</div>
  </div>
</section>
