---
layout: page
title: Export
hero_title: Export - National Design System
hero_description: Export turns a table, a card list or any marked-up list into a CSV file, an Excel file or a printed PDF
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.1.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 10:12 PM"
---

<section id="exportOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Export adds download buttons to a list. A `.nds-export` button group holds one button per format. Each button names its source, the list it exports, through `data-export-target`. A table exports as it is. Any other list marks its rows with `data-export-rows` and its fields with `data-export-field`. Your code can run the same export, or read the data first, through `NDS.Export`.

Pick another component when:

- users pick the rows that an action changes: [Selection](../components/selection)
- users hide or sort the columns on the screen: [Tables](../components/tables)
- users send a file to your server: [File Upload](../components/upload)

</div>
  </div>
</section>

<section id="exportMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="export-table" data-canon data-variants="exportVariantsTable">
<div class="nds-toolbar">
  <div class="nds-bar-row">
    <div class="nds-bar-start">
      <span class="nds-bar-text" data-selection-target="export-orders-body">
        <b data-selection-count>0</b> selected of <b data-selection-total>3</b> orders
      </span>
    </div>
    <div class="nds-bar-end">
      <div class="nds-export nds-btn-group">
        <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="csv" data-export-target="#export-orders">
          <span class="nds-label">CSV</span>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="xls" data-export-target="#export-orders">
          <span class="nds-label">Excel</span>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="pdf" data-export-target="#export-orders">
          <span class="nds-label">PDF</span>
        </button>
      </div>
    </div>
  </div>
</div>
<table id="export-orders" class="nds-table nds-compact" data-export-name="orders">
  <thead>
    <tr>
      <th>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select all orders">
          </div>
        </div>
      </th>
      <th>Reference</th>
      <th>Customer</th>
      <th data-export-label="Amount (SAR)">Amount</th>
      <th data-export-skip>Actions</th>
    </tr>
  </thead>
  <tbody id="export-orders-body">
    <tr>
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select order 128">
          </div>
        </div>
      </td>
      <td>128</td>
      <td>حسن المختار</td>
      <td data-export-value="240"><span class="nds-number-format" data-currency="SAR">240</span></td>
      <td><button type="button" class="nds-btn nds-subtle nds-sm">View</button></td>
    </tr>
    <tr>
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select order 129">
          </div>
        </div>
      </td>
      <td>129</td>
      <td>نادية الخطيب</td>
      <td data-export-value="1250"><span class="nds-number-format" data-currency="SAR">1250</span></td>
      <td><button type="button" class="nds-btn nds-subtle nds-sm">View</button></td>
    </tr>
    <tr>
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select order 130">
          </div>
        </div>
      </td>
      <td>130</td>
      <td>طارق السديري</td>
      <td data-export-value="-85"><span class="nds-number-format" data-currency="SAR">-85</span></td>
      <td><button type="button" class="nds-btn nds-subtle nds-sm">View</button></td>
    </tr>
  </tbody>
</table>
</script>
<script type="text/html" id="export-cards" data-canon>
<div class="nds-toolbar">
  <div class="nds-bar-row">
    <div class="nds-bar-start">
      <div class="nds-form-container nds-check-container">
        <div class="nds-form-header">
          <label for="export-services-all">
            <span class="nds-label">Select all</span>
          </label>
        </div>
        <div class="nds-form-control">
          <input type="checkbox" id="export-services-all" class="nds-check" data-selection-target="export-services">
        </div>
      </div>
      <span class="nds-bar-text" data-selection-target="export-services">
        <b data-selection-count>0</b> selected of <b data-selection-total>3</b> services
      </span>
    </div>
    <div class="nds-bar-end">
      <div class="nds-export nds-btn-group">
        <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="csv" data-export-target="#export-services">
          <span class="nds-label">CSV</span>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="xls" data-export-target="#export-services">
          <span class="nds-label">Excel</span>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline nds-md" data-export="pdf" data-export-target="#export-services">
          <span class="nds-label">PDF</span>
        </button>
      </div>
    </div>
  </div>
</div>
<div id="export-services" class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;" data-export-rows=".nds-card" data-export-name="services">
  <label class="nds-card nds-stroke">
    <div class="nds-card-checkbox">
      <div class="nds-form-container nds-check-container">
        <div class="nds-form-control">
          <input type="checkbox" class="nds-check" aria-label="Select Passport Renewal">
        </div>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title" data-export-field="service" data-export-label="Service">Passport Renewal</span>
        <p class="nds-card-description" data-export-field="entity" data-export-label="Entity">General Directorate of Passports</p>
      </div>
      <div class="nds-card-meta">
        <div class="nds-card-tags">
          <span class="nds-tag nds-yellow nds-sm" data-export-field="status" data-export-label="Status"><span class="nds-label">In Progress</span></span>
        </div>
      </div>
    </div>
  </label>
  <label class="nds-card nds-stroke">
    <div class="nds-card-checkbox">
      <div class="nds-form-container nds-check-container">
        <div class="nds-form-control">
          <input type="checkbox" class="nds-check" aria-label="Select Driving Licence">
        </div>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title" data-export-field="service">Driving Licence</span>
        <p class="nds-card-description" data-export-field="entity">General Department of Traffic</p>
      </div>
      <div class="nds-card-meta">
        <div class="nds-card-tags">
          <span class="nds-tag nds-green nds-sm" data-export-field="status"><span class="nds-label">Completed</span></span>
        </div>
      </div>
    </div>
  </label>
  <label class="nds-card nds-stroke">
    <div class="nds-card-checkbox">
      <div class="nds-form-container nds-check-container">
        <div class="nds-form-control">
          <input type="checkbox" class="nds-check" aria-label="Select Commercial Registration">
        </div>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title" data-export-field="service">Commercial Registration</span>
        <p class="nds-card-description" data-export-field="entity">Ministry of Commerce</p>
      </div>
      <div class="nds-card-meta">
        <div class="nds-card-tags">
          <span class="nds-tag nds-gray nds-sm" data-export-field="status"><span class="nds-label">Pending</span></span>
        </div>
      </div>
    </div>
  </label>
</div>
</script>
<script type="text/html" id="export-columns" data-canon>
<div class="nds-dropmenu" data-columns-target="export-orders">
  <button class="nds-btn nds-neutral nds-md nds-menu-btn nds-dropmenu-trigger" type="button">
    <i class="nds-icon nds-hgi-view-off-slash" aria-hidden="true"></i>
    <span class="nds-label">Columns</span>
  </button>
  <div class="nds-dropmenu-menu" hidden>
    <div class="nds-dropmenu-scroll">
      <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-columns-list data-no-auto-close>
        <legend class="nds-label">Visible columns</legend>
      </fieldset>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="exportVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A Scope option goes on every export button of the list. The Column hide target is the toolbar end that holds the buttons of the Table structure, so the option is off on Cards.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Table (default) | — | — | A `<table>` or `.nds-table`. The script reads its header and body rows as they are |
| Structure | Cards | canon `#export-cards` | — | Any list that is not a table: cards, a definition list. Mark the rows with `data-export-rows` and each field with `data-export-field` |
| Scope | Auto (default) (hint: Selected rows if any are selected, else every row) | — | — | The selected rows when any row is selected, else every row |
| Scope | Selected | `[data-export-scope="selected"]` | `[data-export]` | Only the selected rows. With nothing selected, the file has only the header |
| Scope | All | `[data-export-scope="all"]` | `[data-export]` | Every row, selected or not |
| Column hide | Column hide (hint: Adds a Columns menu, and hidden columns stay out of the file) | canon `#export-columns` | `.nds-bar-end:has([data-export-target="#export-orders"])` (start) | The [Tables](../components/tables) column menu. A column the user hides drops out of the file |
{: #exportVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="exportBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Table Source
{: .nds-block-title}

A `<table>` or `.nds-table` needs no export attributes. The header cells become the columns, and the body rows become the rows. The checkbox column is left out on its own. A detail row (`tr.nds-sub`) and any table inside it are left out too.

### List Source
{: .nds-block-title}

Use it for cards or any list that is not a table. Give the list `data-export-rows` with a selector for its rows. Mark each field in a row with `data-export-field` and a key. Each new key becomes a column, in the order the script first finds it. A row without a key leaves that cell empty.

### Export Scope
{: .nds-block-title}

By default, the file holds the selected rows when any row is selected, else every row. A row is selected when it holds a checked `input.nds-check` or carries `data-state="selected"`, the same rule as [Selection](../components/selection). Set `data-export-scope="selected"` or `"all"` on the buttons to fix the scope. Every format follows the scope. With nothing selected, the Selected scope exports only the header row.

### Hidden Columns
{: .nds-block-title}

When a user hides a column with the [Tables](../components/tables) column menu, the column drops out of the file. Put the menu in the toolbar's `.nds-bar-end`, before the export group, and give its `data-columns-target` the table's id. Tables sets `data-export-skip` on its header cell, and removes it when the column shows again. A `data-export-skip` that you write stays. A table with an id keeps its hidden columns for the next visit, so the next export leaves them out too.

</div>
  </div>
</section>

<section id="exportFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-file-export"></i>
            <span class="nds-label">Multi-Format Output</span>
          </span>
          <p class="nds-item-desc">One source exports to CSV, Excel or PDF. CSV quotes a value that holds a comma, a quote or a line break. Excel gets an HTML table that it opens as a sheet.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-file-management"></i>
            <span class="nds-label">Pagination Aware</span>
          </span>
          <p class="nds-item-desc">A paged list exports every page, not only the page on the screen.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-filter"></i>
            <span class="nds-label">Filter Aware</span>
          </span>
          <p class="nds-item-desc">Rows that a <a href="../components/filter">Filter</a> hides are left out, so the file matches the active filter.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-shield-01"></i>
            <span class="nds-label">Formula Guard</span>
          </span>
          <p class="nds-item-desc">A value that starts with <code class="nds-inline-code lang-html">=</code>, <code class="nds-inline-code lang-html">+</code>, <code class="nds-inline-code lang-html">-</code>, <code class="nds-inline-code lang-html">@</code>, a tab or a line break gets a leading apostrophe. A spreadsheet then reads it as text, not as a formula. A plain negative number stays a number.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-printer"></i>
            <span class="nds-label">Print-Ready PDF</span>
          </span>
          <p class="nds-item-desc">PDF opens the browser's print dialog on a plain table of the data, even for a card list. The user saves it as a PDF. The table uses the light-mode table colors, repeats the header row on each page, and never splits a row. Focus goes back to the button when the dialog closes.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-globe-02"></i>
            <span class="nds-label">Arabic in Every Format</span>
          </span>
          <p class="nds-item-desc">CSV and Excel files start with a UTF-8 byte order mark, so a spreadsheet shows Arabic text correctly. Excel and PDF use the page's language and text direction.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-document-validation"></i>
            <span class="nds-label">Dated File Names</span>
          </span>
          <p class="nds-item-desc">The file is named <code class="nds-inline-code lang-html">{name}-YYYY-MM-DD</code>. The script removes characters that a file system does not allow, and cuts the name to 64 characters.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-volume-high"></i>
            <span class="nds-label">Screen Reader Notice</span>
          </span>
          <p class="nds-item-desc">After a CSV or Excel download, screen readers announce how many rows the file holds.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">The script loads when the page has a <code class="nds-inline-code lang-html">data-export</code> button. One listener on the document serves every button, including buttons added later.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="exportPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put the export group in the `.nds-bar-end` of a [Toolbar](../components/toolbar) above the list.
- Give every source a `data-export-name`. Without it, every file name starts with `nds-export`.
- Write a unit or a currency once, in the column label: `data-export-label="Amount (SAR)"`. Keep the cells to raw numbers, so a spreadsheet can add them up.
- Give a cell `data-export-value` when it shows a formatted value: a currency, a local date. Put the raw number or the ISO date in it.
- Add `data-export-skip` to the header cell of an action column (View, Edit, Delete).
- Do not use `data-sort-value` for the file. Export never reads it.
- Keep the [Selection](../components/selection) counter in the toolbar with the export group. The count tells users what the file will hold.
- Use `NDS.Export.collect()` when your code must change the data before the download.

</div>
  </div>
</section>

<section id="exportApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

A button with no `data-export-target` exports the table or `[data-export-rows]` list that holds it.

| Attribute | Element | Effect |
|---|---|---|
| `data-export="csv"`, `"xls"` or `"pdf"` | a button | Makes the button export, in that format |
| `data-export-target="selector"` | a button | Names the source with a CSS selector |
| `data-export-scope` | a button | `"selected"` exports only the selected rows, and `"all"` exports every row. The default is `"auto"`: see Export Scope above |
| `data-export-name` | a source | The file name, before the date. The default is `nds-export`. On a button it does nothing |
| `data-export-rows="selector"` | a list that is not a table | Selects its rows. Without it, the rows are the list's direct children |
| `data-export-skip="keys"` | a list that is not a table | Leaves out the fields with these keys. Separate the keys with spaces |
| `data-export-label` | a `<th>` | The column name in the file. The default is the header text |
| `data-export-skip` | a `<th>` | Leaves out the column. [Tables](../components/tables) also sets it while a user hides the column. It has no effect on a `<td>` |
| `data-export-field="key"` | an element in a row | Makes the element a field: its text goes in the column with this key |
| `data-export-label` | an element with `data-export-field` | The column name in the file. The default is the key. Write it once per key: the first one wins |
| `data-export-skip` | an element with `data-export-field` | Leaves out this one field |
| `data-export-value` | a `<td>`, or an element with `data-export-field` | The value in the file, in place of the text on the screen |
| `data-state~="selected"` | a row | Marks the row as selected when it has no checkbox. [Selection](../components/selection) sets it on rows with a checked box |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

A source is an element or a CSS selector. A scope is `"auto"` (the default), `"selected"` or `"all"`.

| Method | Effect |
|---|---|
| `NDS.Export.init()` | Adds the click listener for `data-export` buttons. The loader calls it |
| `NDS.Export.export(source, format, scope, options)` | Exports the source. `format` is `"csv"`, `"xls"` or `"pdf"` |
| `NDS.Export.csv(source, scope, options)` | Exports the source as CSV. `xls()` and `pdf()` work the same way |
| `NDS.Export.collect(source, scope)` | Returns `{ columns, rows }` and downloads nothing. `columns` holds `{ key, label }` items. Each row maps a key to its value |
| `NDS.Export.download(data, format, options)` | Downloads a `collect()` result, or opens the print dialog for `"pdf"` |
| `NDS.Export.toCSV(data)` | Returns a `collect()` result as CSV text, with a UTF-8 byte order mark at the start |
| `NDS.Export.toXLSHtml(data, options)` | Returns a `collect()` result as the HTML that Excel opens |
| `NDS.Export.openPrint(data, options)` | Opens the print dialog on a `collect()` result |
{: .nds-table .nds-responsive}

| Option | Default | Effect |
|---|---|---|
| `filename` | `{name}-YYYY-MM-DD.{ext}` | The whole file name, with no date added. In the default, `{name}` is the source's `data-export-name`, or `nds-export` for `download()` |
| `title` | the file name without its extension | The heading of the printed PDF, and the name the browser offers when the user saves it |
| `dir` | the page's direction | The text direction of the Excel file and the printed PDF: `"rtl"` or `"ltr"` |
{: .nds-table .nds-responsive}

Export fires no events.

<script type="text/html" id="export-js" data-canon data-lang="js">
// Export every row, with a file name of your own
NDS.Export.xls('#export-orders', 'all', { filename: 'orders-q3.xls' });

// Change the data before the download: leave out orders under 100 SAR
var data = NDS.Export.collect('#export-orders');
data.rows = data.rows.filter(function (row) {
  return Number(row.c3) >= 100;
});
NDS.Export.download(data, 'csv', { filename: 'large-orders.csv' });
</script>

A table column's key is `c` plus its position, starting at 0. The checkbox column counts, so the Amount column above is `c3`. A list's keys are its `data-export-field` values. The full API is in the banner of `_js/nds-export.js`.

</div>
  </div>
</section>

<section id="exportRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Manage Records](../examples/manage-records): export over a filtered, paged table with selection.
- [Admin Console Demo](../examples/console-demo): export over a transactions table, with an amount label and a skipped action column.
- [Toolbar](../components/toolbar): the bar that holds the export group.
- [Selection](../components/selection): picks the rows that the Auto scope exports.

</div>
  </div>
</section>
