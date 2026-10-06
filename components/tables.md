---
layout: page
title: Tables
hero_title: Tables - National Design System
hero_description: A table shows records in rows and columns, with optional sorting, row selection, a column menu and expandable rows
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 11:32 AM"
---

<section id="tableOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A table is a `<table class="nds-table">` with a `<thead>` and a `<tbody>`. Markup turns on the rest: sort buttons in the header, row checkboxes, a column menu, and detail rows under a row. Tables work with [Pagination](../components/pagination), [Filter](../components/filter), [Selection](../components/selection) and [Export](../components/export) on the same rows.

Pick another component when:

- the content is label and value pairs: [Definition List](../components/definition-list)
- each record is a tile with an image or actions: [Cards](../components/cards) in a [Grid](../layout/grid)
- one number with a trend is the content: [Metric](../components/metric)

</div>
  </div>
</section>

<section id="tableMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="tbl-standard" data-canon data-variants="tableVariantsTable">
<table id="tbl-requests" class="nds-table">
  <thead>
    <tr>
      <th>Reference</th>
      <th>Service</th>
      <th>Submitted</th>
      <th>Status</th>
      <th>Fee</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>REQ-2026-118</td>
      <td>Commercial registration</td>
      <td>22/07/2026</td>
      <td>
        <span class="nds-tag nds-sm" data-status="warning">
          <span class="nds-label">Pending</span>
        </span>
      </td>
      <td><span class="nds-number-format" data-currency="SAR">1200</span></td>
    </tr>
    <tr>
      <td>REQ-2026-117</td>
      <td>Building permit</td>
      <td>21/07/2026</td>
      <td>
        <span class="nds-tag nds-sm" data-status="success">
          <span class="nds-label">Approved</span>
        </span>
      </td>
      <td><span class="nds-number-format" data-currency="SAR">4500</span></td>
    </tr>
    <tr>
      <td>REQ-2026-116</td>
      <td>Passport renewal</td>
      <td>20/07/2026</td>
      <td>
        <span class="nds-tag nds-sm" data-status="success">
          <span class="nds-label">Approved</span>
        </span>
      </td>
      <td><span class="nds-number-format" data-currency="SAR">300</span></td>
    </tr>
    <tr>
      <td>REQ-2026-115</td>
      <td>Vehicle registration</td>
      <td>18/07/2026</td>
      <td>
        <span class="nds-tag nds-sm" data-status="error">
          <span class="nds-label">Rejected</span>
        </span>
      </td>
      <td><span class="nds-number-format" data-currency="SAR">150</span></td>
    </tr>
  </tbody>
</table>
</script>
<script type="text/html" id="tbl-records" data-canon>
<div class="nds-toolbar">
  <div class="nds-bar-row">
    <div class="nds-bar-start">
      <span class="nds-bar-text" data-paged-target="tbl-rec-rows" data-selection-target="tbl-rec-rows">
        <span class="nds-records-view">Showing <b data-paged-from>1</b>&ndash;<b data-paged-to>5</b> of <b data-paged-count>6</b> requests</span>
        <span class="nds-selection-view" hidden><b data-selection-count>0</b> selected of <b data-paged-count>6</b> requests</span>
        <button type="button" data-selection-all hidden>(<b>Select all</b>)</button>
        <button type="button" data-selection-clear hidden>(<b>Clear all</b>)</button>
      </span>
    </div>
    <div class="nds-bar-end">
      <div class="nds-dropmenu" data-select-name="perPage" data-select-value="5" data-per-page-target="tbl-rec-rows">
        <button class="nds-btn nds-secondary-outline nds-md nds-menu-btn nds-dropmenu-trigger" type="button" aria-label="Requests per page">
          <span class="nds-label">5</span>
        </button>
        <div class="nds-dropmenu-menu nds-center" hidden>
          <div class="nds-dropmenu-scroll">
            <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-value="5"><span class="nds-label">5</span></button>
            <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-value="10"><span class="nds-label">10</span></button>
            <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-value="25"><span class="nds-label">25</span></button>
          </div>
        </div>
      </div>
      <div class="nds-dropmenu" data-columns-target="tbl-rec-requests">
        <button class="nds-btn nds-neutral nds-md nds-menu-btn nds-dropmenu-trigger" type="button">
          <i class="nds-icon nds-hgi-view-off-slash" aria-hidden="true"></i>
          <span class="nds-label" data-hidden="sm sr">Columns</span>
        </button>
        <div class="nds-dropmenu-menu" hidden>
          <div class="nds-dropmenu-scroll">
            <fieldset class="nds-form-group nds-check-group nds-dropmenu-group" data-columns-list data-no-auto-close>
              <legend class="nds-label">Visible columns</legend>
            </fieldset>
          </div>
        </div>
      </div>
      <div class="nds-dropmenu">
        <button class="nds-btn nds-secondary-outline nds-md nds-dropmenu-trigger" type="button">
          <i class="hgi hgi-stroke hgi-download-04" aria-hidden="true"></i>
          <span class="nds-label" data-hidden="sm sr">Export</span>
        </button>
        <div class="nds-dropmenu-menu" hidden>
          <div class="nds-dropmenu-scroll">
            <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-export="csv" data-export-target="#tbl-rec-requests">
              <span class="nds-label">CSV</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-export="xls" data-export-target="#tbl-rec-requests">
              <span class="nds-label">Excel</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item" type="button" data-export="pdf" data-export-target="#tbl-rec-requests">
              <span class="nds-label">PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-bar-row">
    <div class="nds-form-container nds-search-box" data-filter-target="tbl-rec-rows">
      <div class="nds-search-content">
        <div class="nds-form-control">
          <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
          <input type="text" class="nds-search-input" placeholder="Search requests..." aria-label="Search requests">
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
    <div class="nds-dropmenu nds-filter" data-filter-target="tbl-rec-rows">
      <button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger" type="button">
        <i class="hgi hgi-stroke hgi-filter" aria-hidden="true"></i>
        <span class="nds-label" data-hidden="sm sr">Filter</span>
      </button>
      <div class="nds-dropmenu-menu" hidden>
        <div class="nds-dropmenu-scroll">
          <div data-filter="service" data-filter-type="checkbox" data-filter-legend="Service" data-no-auto-close></div>
          <hr class="nds-divider">
          <div data-filter="status" data-filter-type="radio" data-filter-legend="Status" data-filter-values='{"pending":"Pending","approved":"Approved","rejected":"Rejected"}' data-no-auto-close></div>
        </div>
        <div class="nds-dropmenu-footer">
          <hr class="nds-divider">
          <div class="nds-dropmenu-action">
            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-filter-action="clear" data-no-auto-close>
              <span class="nds-label">Reset</span>
            </button>
            <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-filter-action="apply">
              <span class="nds-label">Filter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-bar-row">
    <div class="nds-bar-start">
      <div class="nds-filter-applied" data-filter-target="tbl-rec-rows" hidden>
        <span class="nds-label">Applied filters:</span>
        <div class="nds-chips"></div>
      </div>
    </div>
  </div>
</div>
<table id="tbl-rec-requests" class="nds-table" data-export-name="service-requests">
  <thead>
    <tr>
      <th>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select all requests">
          </div>
        </div>
      </th>
      <th data-columns-lock>
        <div class="nds-col-header">
          <span class="nds-label">Reference</span>
          <div class="nds-col-actions">
            <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" type="button" aria-label="Sort by reference">
              <i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </th>
      <th>
        <div class="nds-col-header">
          <span class="nds-label">Service</span>
          <div class="nds-col-actions">
            <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" type="button" aria-label="Sort by service">
              <i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </th>
      <th>
        <div class="nds-col-header">
          <span class="nds-label">Submitted</span>
          <div class="nds-col-actions">
            <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" type="button" aria-label="Sort by submitted date">
              <i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </th>
      <th>
        <div class="nds-col-header">
          <span class="nds-label">Status</span>
          <div class="nds-col-actions">
            <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" type="button" aria-label="Sort by status">
              <i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </th>
      <th data-align="end">
        <div class="nds-col-header">
          <span class="nds-label">Fee</span>
          <div class="nds-col-actions">
            <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" type="button" aria-label="Sort by fee">
              <i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </th>
      <th class="nds-actions-column" data-export-skip>Actions</th>
    </tr>
  </thead>
  <tbody id="tbl-rec-rows" class="nds-paged-content" data-filter-items="tr" style="--per-page: 5;">
    <tr class="nds-page-item">
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select REQ-2026-118">
          </div>
        </div>
      </td>
      <td>REQ-2026-118</td>
      <td>
        <span class="nds-tag nds-gray nds-sm">
          <span class="nds-label" data-filter="service">Commercial registration</span>
        </span>
      </td>
      <td data-sort-value="2026-07-22">22/07/2026</td>
      <td data-sort-value="1">
        <span class="nds-tag nds-sm" data-status="warning">
          <span class="nds-label" data-filter="status" data-filter-value="pending">Pending</span>
        </span>
      </td>
      <td data-sort-value="1200"><span class="nds-number-format" data-currency="SAR">1200</span></td>
      <td class="nds-actions-column">
        <div class="nds-table-actions">
          <button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-controls="tbl-rec-sub-118" aria-expanded="false" aria-label="Show details of REQ-2026-118">
            <i class="hgi hgi-stroke hgi-list-view" aria-hidden="true"></i>
          </button>
          <div class="nds-dropmenu" data-portal>
            <button class="nds-btn nds-subtle nds-md nds-icon-only nds-dropmenu-trigger" type="button" aria-label="Actions for REQ-2026-118">
              <i class="hgi hgi-stroke hgi-more-vertical" aria-hidden="true"></i>
            </button>
            <div class="nds-dropmenu-menu" hidden>
              <div class="nds-dropmenu-scroll">
                <button class="nds-btn nds-subtle nds-dropmenu-item" type="button">
                  <i class="hgi hgi-stroke hgi-edit-02" aria-hidden="true"></i>
                  <span class="nds-label">Edit</span>
                </button>
                <button class="nds-btn nds-subtle nds-dropmenu-item nds-destructive" type="button">
                  <i class="hgi hgi-stroke hgi-delete-02" aria-hidden="true"></i>
                  <span class="nds-label">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
    <tr id="tbl-rec-sub-118" class="nds-sub" hidden>
      <td colspan="7">
        <table class="nds-table nds-compact">
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Processing fee</td>
              <td><span class="nds-number-format" data-currency="SAR">25</span></td>
            </tr>
            <tr>
              <td>Registration charge</td>
              <td><span class="nds-number-format" data-currency="SAR">1020</span></td>
            </tr>
            <tr>
              <td>VAT (15%)</td>
              <td><span class="nds-number-format" data-currency="SAR">155</span></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr class="nds-page-item">
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select REQ-2026-117">
          </div>
        </div>
      </td>
      <td>REQ-2026-117</td>
      <td>
        <span class="nds-tag nds-gray nds-sm">
          <span class="nds-label" data-filter="service">Building permit</span>
        </span>
      </td>
      <td data-sort-value="2026-07-21">21/07/2026</td>
      <td data-sort-value="2">
        <span class="nds-tag nds-sm" data-status="success">
          <span class="nds-label" data-filter="status" data-filter-value="approved">Approved</span>
        </span>
      </td>
      <td data-sort-value="4500"><span class="nds-number-format" data-currency="SAR">4500</span></td>
      <td class="nds-actions-column">
        <div class="nds-table-actions">
          <button class="nds-btn nds-subtle nds-md nds-icon-only" type="button" data-sub-toggle aria-controls="tbl-rec-sub-117" aria-expanded="false" aria-label="Show details of REQ-2026-117">
            <i class="hgi hgi-stroke hgi-list-view" aria-hidden="true"></i>
          </button>
        </div>
      </td>
    </tr>
    <tr id="tbl-rec-sub-117" class="nds-sub" hidden>
      <td colspan="7">
        <table class="nds-table nds-compact">
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Application fee</td>
              <td><span class="nds-number-format" data-currency="SAR">500</span></td>
            </tr>
            <tr>
              <td>Site inspection</td>
              <td><span class="nds-number-format" data-currency="SAR">3500</span></td>
            </tr>
            <tr>
              <td>Permit issue</td>
              <td><span class="nds-number-format" data-currency="SAR">500</span></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr class="nds-page-item">
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select REQ-2026-116">
          </div>
        </div>
      </td>
      <td>REQ-2026-116</td>
      <td>
        <span class="nds-tag nds-gray nds-sm">
          <span class="nds-label" data-filter="service">Passport renewal</span>
        </span>
      </td>
      <td data-sort-value="2026-07-20">20/07/2026</td>
      <td data-sort-value="2">
        <span class="nds-tag nds-sm" data-status="success">
          <span class="nds-label" data-filter="status" data-filter-value="approved">Approved</span>
        </span>
      </td>
      <td data-sort-value="300"><span class="nds-number-format" data-currency="SAR">300</span></td>
      <td class="nds-actions-column"></td>
    </tr>
    <tr class="nds-page-item">
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select REQ-2026-115">
          </div>
        </div>
      </td>
      <td>REQ-2026-115</td>
      <td>
        <span class="nds-tag nds-gray nds-sm">
          <span class="nds-label" data-filter="service">Vehicle registration</span>
        </span>
      </td>
      <td data-sort-value="2026-07-18">18/07/2026</td>
      <td data-sort-value="3">
        <span class="nds-tag nds-sm" data-status="error">
          <span class="nds-label" data-filter="status" data-filter-value="rejected">Rejected</span>
        </span>
      </td>
      <td data-sort-value="150"><span class="nds-number-format" data-currency="SAR">150</span></td>
      <td class="nds-actions-column"></td>
    </tr>
    <tr class="nds-page-item">
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select REQ-2026-114">
          </div>
        </div>
      </td>
      <td>REQ-2026-114</td>
      <td>
        <span class="nds-tag nds-gray nds-sm">
          <span class="nds-label" data-filter="service">Birth certificate</span>
        </span>
      </td>
      <td data-sort-value="2026-07-16">16/07/2026</td>
      <td data-sort-value="2">
        <span class="nds-tag nds-sm" data-status="success">
          <span class="nds-label" data-filter="status" data-filter-value="approved">Approved</span>
        </span>
      </td>
      <td data-sort-value="100"><span class="nds-number-format" data-currency="SAR">100</span></td>
      <td class="nds-actions-column"></td>
    </tr>
    <tr class="nds-page-item">
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select REQ-2026-113">
          </div>
        </div>
      </td>
      <td>REQ-2026-113</td>
      <td>
        <span class="nds-tag nds-gray nds-sm">
          <span class="nds-label" data-filter="service">Commercial registration</span>
        </span>
      </td>
      <td data-sort-value="2026-07-15">15/07/2026</td>
      <td data-sort-value="1">
        <span class="nds-tag nds-sm" data-status="warning">
          <span class="nds-label" data-filter="status" data-filter-value="pending">Pending</span>
        </span>
      </td>
      <td data-sort-value="1200"><span class="nds-number-format" data-currency="SAR">1200</span></td>
      <td class="nds-actions-column"></td>
    </tr>
  </tbody>
</table>
<nav class="nds-pagination" data-auto-pagination="tbl-rec-rows" aria-label="Requests pagination"></nav>
</script>
    </div>
  </div>
</section>

<section id="tableVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every option goes on the outer `<table>`, never on a table in a sub-row.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Standard (default) | — | — | A plain table. The script adds the scroll box and nothing else |
| Structure | Records (hint: The full records screen) | canon `#tbl-records` | — | The records screen most services need: a count, per page, a column menu, export, search, filter, sort buttons, row checkboxes, detail rows, a row menu and pages. Start from it and delete the parts you do not need |
| Density | Standard (default) | — | — | 64px rows, for cells with tags, buttons or two lines |
| Density | Compact | `.nds-compact` | `#tbl-requests` | 48px rows, for dense data with one line in each cell |
| Density | Compact | `.nds-compact` | `#tbl-rec-requests` | |
| Interactive | Interactive (hint: Rows highlight on hover) | `.nds-interactive` | `#tbl-requests` | Highlights the row under the pointer. Use it only when a row does something: it opens, selects or links |
| Interactive | Interactive (hint: Rows highlight on hover) | `.nds-interactive` | `#tbl-rec-requests` | |
| Center | Center | `.nds-center` | `#tbl-requests` | Centers the text in every cell. For short values, such as a score sheet |
| Center | Center | `.nds-center` | `#tbl-rec-requests` | |
| Loading | Loading (hint: Skeleton bars in place of the rows) | `.nds-loading` | `#tbl-requests` | Shows skeleton bars in place of the cells while new rows load. `data-state="loading"` does the same |
| Loading | Loading (hint: Skeleton bars in place of the rows) | `.nds-loading` | `#tbl-rec-requests` | |
{: #tableVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="tableBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Sorting
{: .nds-block-title}

A `.nds-sort-btn` in a header cell makes its column sortable. Each click moves the column through ascending, descending and the first order. [Sort](../components/sort) does the work, and sets `aria-sort` on the header cell. The script writes `data-state="sorted-asc"` or `"sorted-desc"` on the sorted header cell, which turns the icon. Write it in the markup when the server sends the rows already sorted: the script marks the column and does not reorder the rows. A sub-row stays under its row, and a paged table goes back to page 1.

### Row Selection
{: .nds-block-title}

A checkbox in a header cell selects every row on the current page, and the script links it to the `<tbody>` with `data-selection-target`. A checked row gets `data-state="selected"` and a tinted background. The counter, the Select all link and the selection API belong to [Selection](../components/selection#selectionBehavior).

### Column Menu
{: .nds-block-title}

A [Dropmenu](../components/dropmenu) with `data-columns-target` names the `id` of a table. The script fills its `[data-columns-list]` with one checkbox per column the first time it opens. A column with `data-columns-lock` and the selection column stay off the list. A badge on the trigger counts the hidden columns. While a column is hidden, a Reset button in the menu shows them all. When the table has an `id`, the browser keeps the choice for the next visit. The browser drops it when the column count changes. [Export](../components/export) skips a hidden column.

### Sub-Rows
{: .nds-block-title}

A `<tr class="nds-sub">` placed right after a row is that row's detail, most often a compact table. A `data-sub-toggle` button opens it: in the row, in the row's menu, or inside the sub-row. `aria-controls` on the button names the sub-row's `id`. One sub-row is open at a time. `data-state="always-open"` on the table lets several stay open.

To start one open, leave out its `hidden` attribute. Write `aria-expanded="true"` and `data-state="open"` on its button, and a `colspan` that spans every column on its cell. The script sets the `colspan` of every other sub-row. Every toggle of one sub-row shows the same state, and `nds-menu-btn` on a toggle turns its arrow while the sub-row is open. Closing hides the sub-row and keeps its content, so text typed in a field there stays. Sorting, column hiding and column alignment of the outer table skip a table in a sub-row.

### Sub-Rows on Demand
{: .nds-block-title}

A toggle whose row has no sub-row yet shows a spinner and fires `nds:table:sub-request`. Your code fetches the detail and calls `NDS.Tables.row(row).sub.setContent(html).open()`. On an error, call `close()`, or the spinner keeps turning. A second click on a spinning toggle cancels the request through `detail.signal`. NDS never fetches the detail itself. The content stays, so the next open shows it with no new request. `setContent()` starts a table inside the content: for any other component in it, call `NDS.Init.mount(sub)`.

### Column Alignment
{: .nds-block-title}

`data-align` on a header cell aligns the header and every cell in its column: `start`, `center` or `end`. It also covers rows that arrive later from sort, filter or pages, and works on a header with a sort button. A `colspan` in the body shifts the columns, so the cells after it align with the wrong header.

### Loading
{: .nds-block-title}

`nds-loading` on the table, or on its `<tbody>`, shows a pulsing bar in each body cell and hides the cell content. The header stays, and the column widths do not change. Remove it when the new rows are in place.

### Pages and Filters
{: .nds-block-title}

For [Pagination](../components/pagination), the `<tbody>` gets `nds-paged-content` and each row gets `nds-page-item`, but never a sub-row. For [Filter](../components/filter), the `<tbody>` gets `data-filter-items="tr"`, and the cells mark their values with `data-filter`. A sub-row hides with its row when a filter or a page change hides that row.

### Records Parts
{: .nds-block-title}

Records holds every part. To leave a part out, delete its markup and everything in its Also delete cell. Left behind, those attributes point at nothing. Delete a toolbar row when it is empty, and the toolbar when all its rows are gone. The script sets each sub-row's `colspan`, so a deleted column needs no other change.

| Part | Holds | Also delete |
|---|---|---|
| Search and filter | the search box, `.nds-filter` and `.nds-filter-applied` | `data-filter-items` on the `<tbody>`, and `data-filter` and `data-filter-value` on the cell spans. Keep the spans' text. To drop one filter group only, delete its `data-filter` element, the `<hr>` next to it, and its `data-filter` on the cell spans |
| Sorting | `.nds-col-header` with its `.nds-sort-btn`, in each header cell | `data-sort-value` on the cells. Keep the header label as the cell's text |
| Selection | the checkbox header cell and the checkbox cell of every row | `.nds-selection-view`, `[data-selection-all]` and `[data-selection-clear]` in the count line, and `data-selection-target` on it |
| Pages | `<nav class="nds-pagination">` and the per-page menu (`data-per-page-target`) | `nds-paged-content` and `--per-page` on the `<tbody>`, `nds-page-item` on the rows, and `.nds-records-view` and `data-paged-target` on the count line. In `.nds-selection-view`, change `data-paged-count` to `data-selection-total`: Selection writes the row count in it |
| Column menu | the `.nds-dropmenu` with `data-columns-target` | `data-columns-lock` on the header cell |
| Export | the `.nds-dropmenu` with the `data-export` buttons | `data-export-name` on the table, and `data-export-skip` on the header cell |
| Sub-rows | the `data-sub-toggle` buttons and every `tr.nds-sub` | — |
| Row menu | the `.nds-dropmenu` with `data-portal` in the actions cell | — |
| Actions column | the `.nds-actions-column` header cell and the cell of every row | Delete it when neither sub-rows nor the row menu stay |
{: .nds-table .nds-responsive}

Delete the count line (`.nds-bar-text`) when neither Selection nor Pages stays. Keep the table's `id` while the column menu or export stays.

</div>
  </div>
</section>

<section id="tableFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto Start</span>
          </span>
          <p class="nds-item-desc">The script starts every <code class="nds-inline-code lang-html">.nds-table</code> on the page. Sorting and selection start when the header holds their buttons or checkbox.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-scroll-horizontal"></i>
            <span class="nds-label">Sideways Scroll</span>
          </span>
          <p class="nds-item-desc">The script puts each table in a <code class="nds-inline-code lang-html">.nds-table-wrapper</code> that scrolls sideways when the columns do not fit. It checks again when the size changes or a hidden tab opens.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-table-01"></i>
            <span class="nds-label">Plain Table Styling</span>
          </span>
          <p class="nds-item-desc">A <code class="nds-inline-code lang-html">&lt;table&gt;</code> with no class gets the table look, such as a table from a content editor. It gets no script.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-grid-table"></i>
            <span class="nds-label">Striped Rows</span>
          </span>
          <p class="nds-item-desc">Every second row is tinted. The stripes count only the rows on view, so they stay even after a filter, a page change or an open sub-row.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-01"></i>
            <span class="nds-label">Start-Up Skeleton</span>
          </span>
          <p class="nds-item-desc">The cells show skeleton bars until the script starts the table. A paged or filtered body keeps them until its own script starts.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-font"></i>
            <span class="nds-label">Clean Cell Text</span>
          </span>
          <p class="nds-item-desc">Sort and export read the cell's own text, not the text of the icons or buttons in it. <code class="nds-inline-code lang-js">NDS.Tables.getCellText()</code> gives the same value to your code.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="tablePractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a table for records that share the same fields. For label and value pairs, use a [Definition List](../components/definition-list).
- Do not use a table for page layout or for a grid of cards.
- Put the identifier in the first column, and the status and actions in the last columns.
- Keep header labels short. A long label widens its column on every row.
- Add sort buttons only to columns that users compare, such as dates, amounts and status.
- Write `data-sort-value` on a cell whose text sorts wrong: a date written day first, an amount with a currency, a status that has an order.
- Use selection only with a bulk action that acts on the selected rows.
- Give each row checkbox an `aria-label` that names the row: "Select REQ-2026-118".
- Give each icon-only button an `aria-label`, such as the sub-row toggle and the row menu.
- Give the table an `id` when it has a column menu, so the choice is kept.
- Lock the identifier column with `data-columns-lock`, so the user cannot hide it.
- The sub-row background is a sunken surface. Put its content on a surface of its own, never straight on the sub-row: most often a compact table (`nds-table nds-compact`), or a card (`nds-card nds-full`).
- Put a short detail in a sub-row, not a whole record. Link to a page for the full record.
- Write a short sub-row detail in the markup: it needs no code. Load it on demand when it is large or the users rarely open it.
- Give a dropmenu in a cell `data-portal`. The scroll box clips a menu that opens inside it.
- Page a table of more than about 20 rows.

</div>
  </div>
</section>

<section id="tableApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-table-wrapper` | the parent of `.nds-table` | The scroll box. The script adds it when the table has none. Write it yourself to choose where it goes |
| `nds-col-header` | `div` in a `th` | Holds the header label and its actions on one line |
| `nds-col-actions` | `div` in `.nds-col-header` | Holds the header buttons, at 32px |
| `nds-sort-btn` | `button` in `.nds-col-actions` | Makes its column sortable |
| `nds-sort-icon` | the icon in `.nds-sort-btn` | Turns to show the sort direction |
| `nds-sub` | `tr` | A detail row. It belongs to the row right before it |
| `nds-actions-column` | `th` and `td` | Shrinks the column to its content |
| `nds-table-actions` | `div` in a cell | A row of buttons with a small gap |
| `nds-checkbox-column` | `th` and `td` | A 40px column with its content centered. A cell that holds a checkbox gets the same look with no class |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `id` | `.nds-table` | The name the column menu uses. The browser keeps the hidden columns under it, in `localStorage` as `nds-cols-{id}`. Remove that key to forget the choice |
| `data-state~="always-open"` | `.nds-table` | Lets several sub-rows stay open. Without it, opening one closes the others |
| `data-state~="loading"` | `.nds-table` or its `<tbody>` | The same as the `nds-loading` class |
| `data-align` | `th` | `start`, `center` or `end`. Aligns the header cell and its column |
| `data-state~="sorted-asc"`, `"sorted-desc"` | a `th` with a sort button | The sorted column. Write one at load when the rows are already in that order: the script does not reorder them. The script moves it on each sort, and removes it when the sort is cleared |
| `data-columns-lock` | `th` | The column menu leaves this column off its list |
| `data-export-label` | `th` | The column name in the column menu when the header shows no text. [Export](../components/export) uses it too |
| `data-export-skip` | `th` | The script sets it on a column the menu hides, and removes it when the column shows again. Write it yourself on a column that is never exported, such as the actions |
| `data-sort-value` | `td` | The value to sort by, in place of the cell text. Export does not read it: it reads `data-export-value` |
| `data-sub-toggle` | a `button` in a row, in its menu, or in its sub-row | Opens and closes the row's sub-row |
| `aria-controls` | `button[data-sub-toggle]` | The `id` of the sub-row. The script sets it on the row's toggles when it is missing |
| `aria-expanded`, `data-state~="open"` | `button[data-sub-toggle]` | The script sets both when the sub-row opens, and clears them when it closes. Write them at load on the toggle of a sub-row that starts open |
| `data-state~="loading"` | `button[data-sub-toggle]` | The script sets it while a sub-request waits. `setContent()` and `close()` remove it |
| `hidden` | `tr.nds-sub` | A closed sub-row. The script removes it to open the sub-row, and adds it to close |
| `data-columns-target` | `.nds-dropmenu` | The `id` of the table whose columns the menu hides |
| `data-columns-list` | a `fieldset` in the menu | The script fills it with one checkbox per column |
| `data-selection-target` | the header checkbox | The script sets it to the `id` of the `<tbody>`, and gives the `<tbody>` an `id` when it has none |
| `data-state~="selected"` | `tr` | A selected row. [Selection](../components/selection) sets it |
| `data-state~="has-more"`, `"at-start"`, `"at-end"` | `.nds-table-wrapper` | The script writes them: `has-more` while the table is wider than the box, and `at-start` and `at-end` at each end |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-table`.

| Property | Default | Controls |
|---|---|---|
| `--table-row-height` | `64px`, `48px` with `nds-compact` | Row height |
| `--table-cell-padding-block` | `var(--spacing-md)` | Top and bottom padding of a cell |
| `--table-cell-padding-inline` | `var(--spacing-xl)` | Start and end padding of a cell |
| `--table-sub-padding` | `var(--spacing-xl)` | Padding of a sub-row cell |
| `--table-sub-background` | `var(--background-surface-sunken)` | Background of a sub-row |
| `--min-width` | none | The smallest width of the table. Below it, the box scrolls |
| `--max-width` | `100%` | The widest the scroll box gets. Set it in the table's `style` attribute: the script copies it to the box |
{: .nds-table .nds-responsive}

### Tokens
{: .nds-block-title}

The theme-wide tokens of the table. Set one at `:root`, or on a wrapper to reach every table inside it. A token with a dark value changes in dark mode: give your override one too. [Tokens](../components/tokens) lists every token.

{{ site.data.tokens.components.table.html }}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Tables.init()` | Starts every table and column menu that has not started yet |
| `NDS.Tables.reinit()` | The same as `init()`. Call it after you add a new table. When only the rows change, call `NDS.Init.refresh(tbody)`: see [Refresh](../core/refresh) |
| `NDS.Tables.recheckWidths()` | Measures every scroll box again, after a change the script cannot see |
| `NDS.Tables.create(table)` | Starts sorting and selection on one table, and returns its instance, or the instance it already has. Returns `null` when the table has no `<thead>` or `<tbody>` |
| `NDS.Tables.createResponsive(table)` | Adds the scroll box to one table and returns its instance |
| `NDS.Tables.createColumnToggle(menu)` | Starts one column menu, and returns its instance, or the instance it already has. Returns `null` when the table or `[data-columns-list]` is missing |
| `NDS.Tables.setColumnHidden(table, index, hidden)` | Hides or shows the column at this index: it sets `hidden` on the header cell and on its cell in every row, and fires `nds:table:columns`. The menu does not save this change |
| `NDS.Tables.getCellText(cell)` | The cell's own text, the value sort and export read |
| `NDS.Tables.row(tr).sub` | The handle of a row's sub-row. `tr` is the row or its sub-row |
| `.sub.setContent(html)` | Puts your markup or node in the sub-row. It builds the sub-row when there is none, and stops the spinner. It returns the handle |
| `.sub.open()`, `.close()`, `.toggle()` | Opens, closes or flips the sub-row. `open()` with no sub-row fires `nds:table:sub-request`. Each returns the handle |
| `.sub.el` | The `tr.nds-sub`, or `null` |
{: .nds-table .nds-responsive}

| Instance | Method | Effect |
|---|---|---|
| `create()` | `getSortColumn()` | The cell index of the sorted column, or `-1` |
| `create()` | `getSortDirection()` | `"asc"`, `"desc"` or `null` |
| `create()` | `resetSort()` | Clears the sort and puts the rows back in their first order |
| `create()` | `destroy()` | Stops sorting. The table keeps its scroll box |
| `createResponsive()` | `recheckWidth()` | Measures this table again |
| `createResponsive()` | `destroy()` | Stops the scroll checks and marks the table as not started. The box stays |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:table:sort` | `.nds-table` | `{ columnIndex, direction, table, button }`. `direction` and `button` are `null` when the sort is cleared |
| `nds:table:columns` | `.nds-table` | `{ table, index, hidden, restored }`. `restored` is `true` for a saved choice that the script applies at load |
| `nds:table:sub-request` | `.nds-table` | `{ row, sub, table, signal }`. `sub` is `null`. Pass `signal` to your request, so a cancel stops it |
| `nds:table:sub-open` | `.nds-table` | `{ row, sub, table }` |
| `nds:table:sub-close` | `.nds-table` | `{ row, sub, table }` |
{: .nds-table .nds-responsive}

<script type="text/html" id="tbl-js" data-canon data-lang="js">
// Each row carries its record id in data-id. res.data is the HTML the server sends.
var table = document.getElementById('requests');
table.addEventListener('nds:table:sub-request', function (e) {
  var row = e.detail.row;
  NDS.request('/requests/' + row.dataset.id + '/details', { signal: e.detail.signal })
    .then(function (res) { NDS.Tables.row(row).sub.setContent(res.data).open(); })
    .catch(function (err) {
      // A cancel already stopped the spinner. Any other error must close it.
      if (err.name !== 'AbortError') NDS.Tables.row(row).sub.close();
    });
});
</script>

The full API is in the banner of `_js/nds-tables.js`.

</div>
  </div>
</section>

<section id="tableRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Manage Records](../examples/manage-records): the Records structure in a full page, with sub-rows that hold a table.
- [Admin Console Demo](../examples/console-demo): a compact sortable table with a column menu, a filter and pages.
- [KPIs Template](../templates/kpis-template): small tables of figures with a minimum width.
- [Sort](../components/sort), [Selection](../components/selection), [Pagination](../components/pagination), [Filter](../components/filter) and [Export](../components/export): the components a records table uses.

</div>
  </div>
</section>
