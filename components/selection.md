---
layout: page
title: Selection
hero_title: Selection - National Design System
hero_description: Selection lets users pick items in any list, so one action can apply to all of them
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.4.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 03:41 AM"
---

<section id="selectionOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Selection works on any list: table rows, cards or a plain list. Users pick items, and one action (export, delete, assign) applies to all of them. Each item holds a checkbox. A select-all checkbox picks every item on the current page, and a counter shows how many are picked: "2 selected of 48 requests". The select-all and the counter name the list through `data-selection-target`. Your code reads the selection through `NDS.Selection` and the `nds:selection:change` event.

Pick another component when:

- you only show how many items match a search or a filter: [Filter](../components/filter)
- you only show which items are on the current page: [Pagination](../components/pagination)
- the user picks options in a form field: [Checkbox](../components/checkbox)

</div>
  </div>
</section>

<section id="selectionMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="selection-cards" data-canon data-variants="selectionVariantsTable">
<div class="nds-toolbar">
  <div class="nds-toolbar-row">
    <div class="nds-toolbar-start">
      <div class="nds-form-container nds-check-container">
        <div class="nds-form-header">
          <label for="selection-services-all">
            <span class="nds-label">Select all</span>
          </label>
        </div>
        <div class="nds-form-control">
          <input type="checkbox" id="selection-services-all" class="nds-check" data-selection-target="selection-services">
        </div>
      </div>
      <span class="nds-toolbar-text" data-selection-target="selection-services">
        <b data-selection-count>0</b> selected of <b data-selection-total>3</b> services
        <button type="button" data-selection-all hidden>(<b>Select all</b>)</button>
        <button type="button" data-selection-clear hidden>(<b>Clear all</b>)</button>
      </span>
    </div>
  </div>
</div>
<div id="selection-services" class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
  <label class="nds-card nds-stroke">
    <div class="nds-card-checkbox">
      <div class="nds-form-container nds-check-container">
        <div class="nds-form-control">
          <input type="checkbox" name="services" value="passport" class="nds-check" aria-label="Select Passport Renewal">
        </div>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Passport Renewal</span>
        <p class="nds-card-description">General Directorate of Passports</p>
      </div>
    </div>
  </label>
  <label class="nds-card nds-stroke">
    <div class="nds-card-checkbox">
      <div class="nds-form-container nds-check-container">
        <div class="nds-form-control">
          <input type="checkbox" name="services" value="licence" class="nds-check" aria-label="Select Driving Licence">
        </div>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Driving Licence</span>
        <p class="nds-card-description">General Department of Traffic</p>
      </div>
    </div>
  </label>
  <label class="nds-card nds-stroke">
    <div class="nds-card-checkbox">
      <div class="nds-form-container nds-check-container">
        <div class="nds-form-control">
          <input type="checkbox" name="services" value="registration" class="nds-check" aria-label="Select Commercial Registration">
        </div>
      </div>
    </div>
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Commercial Registration</span>
        <p class="nds-card-description">Ministry of Commerce</p>
      </div>
    </div>
  </label>
</div>
</script>
<script type="text/html" id="selection-table" data-canon>
<div class="nds-toolbar">
  <div class="nds-toolbar-row">
    <div class="nds-toolbar-start">
      <span class="nds-toolbar-text" data-paged-target="selection-requests" data-selection-target="selection-requests">
        <span class="nds-records-view">Showing <b data-paged-from>1</b>&ndash;<b data-paged-to>4</b> of <b data-paged-count>6</b> requests</span>
        <span class="nds-selection-view" hidden><b data-selection-count>0</b> selected of <b data-paged-count>6</b> requests</span>
        <button type="button" data-selection-all hidden>(<b>Select all</b>)</button>
        <button type="button" data-selection-clear hidden>(<b>Clear all</b>)</button>
      </span>
    </div>
  </div>
</div>
<table class="nds-table">
  <thead>
    <tr>
      <th>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select all requests">
          </div>
        </div>
      </th>
      <th>Reference</th>
      <th>Service</th>
    </tr>
  </thead>
  <tbody id="selection-requests" class="nds-paged-content" style="--per-page: 4;">
    <tr class="nds-page-item">
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select REQ-1001">
          </div>
        </div>
      </td>
      <td>REQ-1001</td>
      <td>Passport Renewal</td>
    </tr>
    <tr class="nds-page-item">
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select REQ-1002">
          </div>
        </div>
      </td>
      <td>REQ-1002</td>
      <td>Driving Licence</td>
    </tr>
    <tr class="nds-page-item">
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select REQ-1003">
          </div>
        </div>
      </td>
      <td>REQ-1003</td>
      <td>Commercial Registration</td>
    </tr>
    <tr class="nds-page-item">
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select REQ-1004">
          </div>
        </div>
      </td>
      <td>REQ-1004</td>
      <td>Building Permit</td>
    </tr>
    <tr class="nds-page-item">
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select REQ-1005">
          </div>
        </div>
      </td>
      <td>REQ-1005</td>
      <td>Health Card</td>
    </tr>
    <tr class="nds-page-item">
      <td>
        <div class="nds-form-container nds-check-container">
          <div class="nds-form-control">
            <input type="checkbox" class="nds-check" aria-label="Select REQ-1006">
          </div>
        </div>
      </td>
      <td>REQ-1006</td>
      <td>Work Visa</td>
    </tr>
  </tbody>
</table>
<nav class="nds-pagination" data-auto-pagination="selection-requests" aria-label="Pagination"></nav>
</script>
    </div>
  </div>
</section>

<section id="selectionVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Cards (default) | — | — | Any list whose items hold a checkbox: cards, a plain checkbox list. A select-all checkbox and a counter sit in a toolbar above it |
| Structure | Table | canon `#selection-table` | — | A paged table. The header checkbox is the select-all. The counter shares its line with the Pagination records line and takes its place while anything is selected. A Select all link selects every page, and a Clear all link clears every page |
{: #selectionVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="selectionBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Select All
{: .nds-block-title}

A checkbox with `data-selection-target` selects every item on the current page, or clears them all. It shows a half-checked state when only some items on the page are selected, and it updates when the user turns the page. Items selected on other pages stay selected, so each page the user selects adds to the selection. While a filter hides items, it selects only the items the filter shows. Put it outside the list, so it does not count as an item.

### Select All and Clear All Links
{: .nds-block-title}

Put a button with `data-selection-all` in the counter, after the `nds-selection-view`. A click selects every item the filter shows, on every page. Ship it with `hidden`: the script shows it only while some of those items are selected, but not all.

A button with `data-selection-clear` after it clears every item, on every page. Ship it with `hidden` too: the script shows it once every item the filter shows is selected. So the two links never show together: Select all takes its place until everything is selected.

### Records Swap
{: .nds-block-title}

Use it on a paged list, so one line serves both browsing and selecting. The counter holds two lines: a `nds-records-view` for Pagination and a `nds-selection-view` for the selection. Give it both `data-paged-target` and `data-selection-target`, with the same list id. While anything is selected, the script hides the records line and shows the selection line. Ship the selection line with `hidden`, so the line is correct before the script loads.

</div>
  </div>
</section>

<section id="selectionFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">The script starts when the page has a <code class="nds-inline-code lang-html">data-selection-target</code> element. Tables add one to their header checkbox, so a table with a select-all needs no attribute.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-check-list"></i>
            <span class="nds-label">Content-Agnostic Selection</span>
          </span>
          <p class="nds-item-desc">An item is selected when it holds a checked <code class="nds-inline-code lang-html">input.nds-check</code>, or carries <code class="nds-inline-code lang-html">data-state="selected"</code>. Table rows, cards and plain checkbox lists work the same way.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-checkmark-square-02"></i>
            <span class="nds-label">Selected State</span>
          </span>
          <p class="nds-item-desc">The script sets <code class="nds-inline-code lang-html">data-state="selected"</code> on each item whose checkbox is checked, and removes it when the box is cleared. Use it to style selected items.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Full-Selection Count</span>
          </span>
          <p class="nds-item-desc">The count includes selected items on other pages and items a filter hides. It matches what <a href="../components/export">Export</a> sends when its scope is the selection.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-refresh"></i>
            <span class="nds-label">Live Updates</span>
          </span>
          <p class="nds-item-desc">When items with a checkbox are added or removed, the count, the total and the select-all update on their own.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-number-sign"></i>
            <span class="nds-label">Number Formatting</span>
          </span>
          <p class="nds-item-desc">Numbers get the thousand separators of the page's language, in Latin digits, the same rule as the Pagination records line.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Select or clear a list, read its selected items and listen for each change through <code class="nds-inline-code lang-js">NDS.Selection</code>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="selectionPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Add a counter wherever a bulk action exists (export, delete, assign). The number tells users what the action will change.
- Put the select-all and the counter in a [Toolbar](../components/toolbar) above the list. Users look there for record counts.
- Write the sentence in your markup, in your language. The script writes only the numbers, so plurals and Arabic phrasing are yours.
- Do not show a count for the current page only. Bulk actions act on the whole selection.
- Turn a bulk action on and off from `nds:selection:change`. Do not add your own change listeners to the checkboxes.
- Give every item checkbox an `aria-label` that names the item: "Select REQ-1001". Give the select-all a visible label, or an `aria-label` in a table header.

</div>
  </div>
</section>

<section id="selectionApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

Only the records swap uses these. A counter that always shows needs neither.

| Class | Element | Effect |
|---|---|---|
| `nds-records-view` | child of the counter | The script hides it while anything is selected |
| `nds-selection-view` | child of the counter | The script shows it while anything is selected |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

The list is the element with the id that `data-selection-target` names. Its items are its `.nds-page-item` elements. A list without them uses its direct children. A `<tbody>` uses only its own rows, and its detail rows (`tr.nds-sub`) are never items, so a table nested in a detail row is a list of its own. An item's checkbox is the first `input.nds-check` in it, so a checklist inside a card never selects the card.

| Attribute | Element | Effect |
|---|---|---|
| `data-selection-target="id"` | any element except a checkbox | Makes the element a counter for the list |
| `data-selection-all` | a `button` in a counter | A click selects every item the filter shows, on every page. The script removes `hidden` from it while some of those items are selected, but not all, and sets it otherwise. Write `hidden` on it at page load |
| `data-selection-clear` | a `button` in a counter | A click runs `clear()`. The script removes `hidden` from it while every item the filter shows is selected, and sets it otherwise. Write `hidden` on it at page load |
| `data-selection-count` | an element in a counter | The script writes the number of selected items into it. Write the count at page load in it (usually `0`), so the line shows a number before the script runs |
| `data-selection-total` | an element in a counter | The script writes the number of items in the list into it. On a paged list, `data-paged-count` from [Pagination](../components/pagination) can take its place: it counts only the items that match the filter |
| `data-state~="has-selection"` | a counter | The script sets it while anything is selected |
| `data-selection-target="id"` | an `input.nds-check` | Makes the checkbox the list's select-all. It acts on the current page only. [Tables](../components/tables) add it to the header checkbox, and give the `<tbody>` an id if it has none |
| `data-state~="selected"` | an item | The script sets it when the item's checkbox is checked, and removes it when the box is cleared. Set it yourself on an item with no checkbox. `clear()` removes it from every item |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

The script starts on its own. Call `recount()` or `reinit()` after a change that fires no `change` event: a `checked` set from code, or an item marked only with `data-state`. A method that takes a list takes its id or the element.

| Method | Effect |
|---|---|
| `NDS.Selection.init()` | Adds the document listeners. The loader calls it |
| `NDS.Selection.selectAll(list, on, scope)` | Selects every item the filter shows, or clears them when `on` is `false`. `on` defaults to `true`. With `scope` set to `'page'`, it acts only on the items on the current page |
| `NDS.Selection.clear(list)` | Clears every item, including items a filter hides and items with no checkbox. Call it after a bulk action |
| `NDS.Selection.selected(list)` | Returns the selected items, in page order |
| `NDS.Selection.isSelected(item)` | Returns `true` when the item is selected. [Export](../components/export) uses it to pick the selected rows |
| `NDS.Selection.recount(list)` | Updates one list's states, select-all and counters |
| `NDS.Selection.reinit()` | Updates every list |
| `NDS.Selection.refresh()` | Adds the listeners if they are missing, then updates every list. `NDS.Init.refresh()` calls it |
| `NDS.Selection.destroy()` | Removes the listeners. Use it when a single-page app tears the view down |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:selection:change` | the list, and it bubbles | `{ list, items, count, total }`. `items` holds the selected items. It fires when the user checks a box or the select-all, when `selectAll()` or `clear()` runs, and when added or removed items change the count. It does not fire on page load |
{: .nds-table .nds-responsive}

<script type="text/html" id="selection-js" data-canon data-lang="js">
var list = document.getElementById('selection-services');
var removeButton = document.getElementById('remove-selected');

// Show the bulk action only while something is selected
list.addEventListener('nds:selection:change', function (e) {
  removeButton.hidden = e.detail.count === 0;
});

// Remove the selected items: the count drops, so the event hides the button again
removeButton.addEventListener('click', function () {
  NDS.Selection.selected(list).forEach(function (item) {
    item.remove();
  });
});
</script>

When you replace the list's content, call `NDS.Init.refresh(container)`: it updates Selection and every other component on the list, such as Pagination. See [Refresh](../core/refresh). The full API is in the banner of `_js/nds-selection.js`.

</div>
  </div>
</section>

<section id="selectionRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Manage Records](../examples/manage-records): the records swap and a bulk delete over a filtered, paged table with export.
- [Admin Console Demo](../examples/console-demo): the records swap over a transactions table.
- [Export](../components/export): exports the selected items.
- [Tables](../components/tables): the header checkbox that becomes the table's select-all.

</div>
  </div>
</section>
