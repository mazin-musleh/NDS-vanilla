---
layout: page
title: Toolbar
hero_title: Toolbar - National Design System
hero_description: A controls bar above a table, list or grid, with result counts and filters at the start and actions at the end
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.4.0"
updated: "1.6.0"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="toolbar-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A toolbar is a layout only. It has no script and no state. Two clusters hold its items: `nds-toolbar-start` at the leading edge, and `nds-toolbar-end` at the trailing edge. Each item, such as an [Export](../components/export) group or a [Filter](../components/filter), connects to its content through its own target attribute. The bar wraps its items onto more lines when they do not fit. To give items a line of their own, wrap each line in `nds-toolbar-row`.

Pick another component when:

- the controls are the page's navigation or its main action: the head of a [Section](../layout/section).
- the controls switch between separate panels of content: [Tabs](../components/tabs).

</div>
  </div>
</section>

<section id="toolbar-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="toolbar-line" data-canon data-variants="toolbar-variants-table">
<div class="nds-toolbar">
  <div class="nds-toolbar-start">
    <div class="nds-content-placeholder nds-sm">Start</div>
  </div>
  <div class="nds-toolbar-end">
    <div class="nds-content-placeholder nds-sm">End</div>
  </div>
</div>
<div class="nds-content-placeholder">Content</div>
</script>
<script type="text/html" id="toolbar-rows" data-canon>
<div class="nds-toolbar">
  <div class="nds-toolbar-row">
    <div class="nds-toolbar-start">
      <div class="nds-content-placeholder nds-sm">Row 1 start</div>
    </div>
    <div class="nds-toolbar-end">
      <div class="nds-content-placeholder nds-sm">Row 1 end</div>
    </div>
  </div>
  <div class="nds-toolbar-row">
    <div class="nds-toolbar-start">
      <div class="nds-content-placeholder nds-sm">Row 2 start</div>
    </div>
  </div>
</div>
<div class="nds-content-placeholder">Content</div>
</script>
    </div>
  </div>
</section>

<section id="toolbar-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The dashed boxes are [Content Placeholder](../utilities/content-placeholder) items. Put your own items in their place. The box below the bar stands for the content.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | One line (default) | — | — | Items at the start and at the end. They wrap onto a new line when they do not fit |
| Structure | Rows (hint: Each row takes a line of its own) | canon `#toolbar-rows` | — | Each `nds-toolbar-row` takes a line of its own. Use it when the bar needs more than one line, or to keep some items together on one line at every width |
| Margin | No margin | `--toolbar-margin-block: 0` | `.nds-toolbar` | No space above or below the bar. Use it when the parent, such as a card, already sets the space |
{: #toolbar-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="toolbar-examples" class="nds-content-section nds-doc-examples">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Examples</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Table Bar
{: .nds-block-title}

A count and an export group on the first row, a search box on the second, and the applied filters on the third. [Manage Records](../examples/manage-records) uses the same bar.

<script type="text/html" id="toolbar-table" data-canon>
<div class="nds-toolbar">
  <div class="nds-toolbar-row">
    <div class="nds-toolbar-start">
      <span class="nds-toolbar-text" data-filter-target="toolbar-table-body"><span data-filter-count>3</span> of 3 orders</span>
    </div>
    <div class="nds-toolbar-end">
      <div class="nds-export nds-btn-group">
        <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="csv" data-export-target="#toolbar-table-orders">
          <span class="nds-label">CSV</span>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="pdf" data-export-target="#toolbar-table-orders">
          <span class="nds-label">PDF</span>
        </button>
      </div>
    </div>
  </div>
  <div class="nds-toolbar-row">
    <div class="nds-form-container nds-search-box" data-filter-target="toolbar-table-body">
      <div class="nds-search-content">
        <div class="nds-form-control">
          <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
          <input type="text" class="nds-search-input" placeholder="Search orders..." aria-label="Search orders">
          <div class="nds-form-action">
            <button class="nds-btn nds-subtle nds-clear" type="button" hidden aria-label="Clear search">
              <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <button class="nds-btn nds-primary nds-search-btn" type="button">
          <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
          <span class="nds-label" data-hidden="sm sr">Search</span>
        </button>
      </div>
    </div>
  </div>
  <div class="nds-toolbar-row">
    <div class="nds-toolbar-start">
      <div class="nds-filter-applied" data-filter-target="toolbar-table-body" hidden>
        <span class="nds-label">Applied Filters:</span>
        <div class="nds-chips"></div>
      </div>
    </div>
  </div>
</div>
<table id="toolbar-table-orders" class="nds-table" data-export-name="orders">
  <thead>
    <tr>
      <th>Reference</th>
      <th>Entity</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody id="toolbar-table-body" data-filter-items="tr">
    <tr>
      <td>1041</td>
      <td>Ministry of Interior</td>
      <td><span class="nds-tag nds-green nds-sm"><span class="nds-label">Completed</span></span></td>
    </tr>
    <tr>
      <td>1042</td>
      <td>Ministry of Health</td>
      <td><span class="nds-tag nds-blue nds-sm"><span class="nds-label">In Review</span></span></td>
    </tr>
    <tr>
      <td>1043</td>
      <td>Ministry of Education</td>
      <td><span class="nds-tag nds-yellow nds-sm"><span class="nds-label">Pending</span></span></td>
    </tr>
  </tbody>
</table>
</script>

### Editor Bar
{: .nds-block-title}

The toolbar of the [Editor](../components/editor).

<script type="text/html" id="toolbar-editor" data-canon data-code="none">
<div class="nds-form-container nds-textarea nds-editor" data-editor-toolbar="bold italic underline | link | ul ol | source">
  <div class="nds-form-header">
    <label for="toolbar-editor-field"><span class="nds-label">Announcement</span></label>
  </div>
  <div class="nds-form-control">
    <textarea class="nds-textarea" name="announcement" id="toolbar-editor-field" placeholder="Write here">
<p>The new services portal launches <strong>next quarter</strong>.</p>
    </textarea>
  </div>
</div>
</script>

</div>
  </div>
</section>

<section id="toolbar-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-distribute-horizontal-center"></i>
            <span class="nds-label">Leading and Trailing Clusters</span>
          </span>
          <p class="nds-item-desc">The end cluster stays at the trailing edge, also when it wraps onto a line of its own.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-search-01"></i>
            <span class="nds-label">Search Field Growth</span>
          </span>
          <p class="nds-item-desc">A search box placed straight in the bar or in a row fills the free space on its line. Outside a bar, it is a full-width panel.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-view-off"></i>
            <span class="nds-label">Empty-Slot Collapse</span>
          </span>
          <p class="nds-item-desc">A cluster or a row whose items are all <code class="nds-inline-code lang-html">hidden</code> takes no space. An applied-filters row leaves no gap until a filter is applied.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-align-left"></i>
            <span class="nds-label">Bar Text</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">nds-toolbar-text</code> is block text in the paragraph color. A <code class="nds-inline-code lang-html">&lt;b&gt;</code> in it shows in medium weight. It also works outside a bar.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-bottom"></i>
            <span class="nds-label">Sub-Row Spacing</span>
          </span>
          <p class="nds-item-desc">In a table sub-row, the bar leaves less space below it: <code class="nds-inline-code lang-css">var(--spacing-xl)</code> in place of <code class="nds-inline-code lang-css">var(--spacing-4xl)</code>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="toolbar-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put the toolbar directly above the content it controls. Keep the content and its [Pagination](../components/pagination) below the bar, not inside it.
- Put every item in `nds-toolbar-start` or `nds-toolbar-end`. A search box is the one exception: it goes straight in the bar or in an `nds-toolbar-row`, where it fills the free space.
- Choose a cluster by position, not by job. A table bar usually shows a count, applied filters or a selection summary at the start. It puts [Export](../components/export), a column menu or bulk actions at the end. An editor bar puts its format controls at the start and a source toggle at the end.
- Use `nds-toolbar-row` only when the bar has two or more rows, or a row and another item. A row that is the bar's only child changes nothing. For two or three items, use no rows: the bar wraps them itself.
- Use the toolbar on every data screen, so all bars have one layout. A layout made with [Grid](../layout/grid) also works, because each item connects to its content by itself.
- Do not put a toolbar inside another toolbar. Use `nds-toolbar-row`: it has the same layout, with no outer margin.
- Keep the `hidden` attribute on items that start empty, such as the applied-filters row. Without it, the bar keeps an empty line.
- Keep the end cluster to one or two items. Put related buttons in an `nds-btn-group`, so they read as one control.
- Use one button size in a cluster. A default button is 40px tall and an `nds-md` button is 32px.
- Add `data-hidden="sm sr"` to a button label to show only the icon on phones. Screen readers still read the label. See [Hidden](../utilities/hidden).

</div>
  </div>
</section>

<section id="toolbar-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-toolbar` | `div` above the content | The bar. It spans the width of its container |
| `nds-toolbar-row` | `div` in `.nds-toolbar` | Takes a line of its own. Its items have the same layout as the bar's, with no outer margin |
| `nds-toolbar-start` | `div` in `.nds-toolbar` or `.nds-toolbar-row` | The items at the leading edge, `var(--spacing-md)` apart |
| `nds-toolbar-end` | `div` in `.nds-toolbar` or `.nds-toolbar-row` | The items at the trailing edge, `var(--spacing-md)` apart |
| `nds-toolbar-text` | `span` in a cluster, or on its own | Text such as a record count or a selection summary. `nds-results-count` is the same class under its first name |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--toolbar-margin-block` | `0 var(--spacing-4xl)`, and `0 var(--spacing-xl)` in a table sub-row | The space above and below the bar, as `<above> <below>`. Set it on the bar or on a parent |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="toolbar-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Manage Records](../examples/manage-records): a bar in rows above a requests table, with a count, a selection summary, search and export. Each table sub-row has its own small bar.
- [Admin Console Demo](../examples/console-demo): a bar in rows above a transactions table, and a toolbar with a search box above a team directory.
- [Government Services](../examples/services-list): a toolbar with a search box above a list of services.
- [FAQ Template](../templates/faq-template): a toolbar with a search box above the questions.

</div>
  </div>
</section>
