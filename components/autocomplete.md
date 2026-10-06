---
layout: page
title: Autocomplete
hero_title: Autocomplete - National Design System
hero_description: A text field that shows matching results from a JSON source as the user types
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 11:32 AM"
---

<section id="autocompleteOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

An autocomplete is a text field with `autocomplete="on"` on its input and `data-url` on its container. The URL returns JSON. As the user types, a menu under the field lists the results that match, with the typed text marked. A pick writes the result's text into the field. The script builds the menu, so the markup is a plain form field.

Pick another component when:

- the user picks several values: [Multiselect](../components/multiselect)
- the user types free values as chips: [Tag Input](../components/taginput)
- the list is short and fixed: a select in [Forms](../components/forms)

</div>
  </div>
</section>

<section id="autocompleteMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="autocomplete-field" data-canon data-variants="autocompleteVariantsTable" data-harness="form" data-demo-width="300px">
<div class="nds-form-container" data-url="../docs-assets/data/services-autocomplete.json" data-name="Title" data-fetch="once">
  <div class="nds-form-header">
    <label for="service-search">
      <span class="nds-label">Service</span>
      <span class="nds-info">Type part of a service name, such as "visa"</span>
    </label>
  </div>
  <div class="nds-form-control">
    <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
    <input type="text" id="service-search" name="service" class="nds-input" autocomplete="on" placeholder="Search services">
    <div class="nds-form-action">
      <button class="nds-btn nds-subtle nds-clear" type="button" aria-label="Clear input" hidden>
        <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="autocompleteVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The canon carries `data-fetch="once"` because the demo data is a static file. For a server that searches, use `each`: see Fetch Modes.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Min characters | 3 (default) | — | — | The search starts at the third character |
| Min characters | 2 | `[data-min-chars="2"]` | `.nds-form-container` | For short names, such as people's names |
| Min characters | 1 | `[data-min-chars="1"]` | `.nds-form-container` | For a short list loaded once, such as cities |
| Strict | Strict (hint: Accepts only a value picked from the list) | `[data-strict]` | `.nds-form-container` | The form accepts only text the user picked from the list, and the menu shows "No results" when nothing matches. Not for a search field, where any text is a valid search |
| Custom empty message | Custom empty message | `[data-empty-message="No matching services"]` | `.nds-form-container[data-strict]` | Replaces the "No results" text that a strict field shows when nothing matches |
| Field states | Label, info, feedback, required | — | — | Shared by every form field. See [Forms](../components/forms) |
{: #autocompleteVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="autocompleteBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Fetch Modes
{: .nds-block-title}

With `data-fetch="each"`, the default, the script requests `data-url` with the typed text on each search, such as `services.json?q=visa`. The server filters the results. With `data-fetch="once"`, the script requests `data-url` once, with no query, and keeps the list. On each search, it shows the results whose `data-name` field holds the typed text, in any letter case.

### Strict Mode
{: .nds-block-title}

`data-strict` on the container makes the form accept only a picked result. At submit, the field shows "Choose from the suggestions" when its text is not the last pick. Typed text that matches a result exactly still fails until the user picks it. An empty field passes, so add `data-required` to the container when the field is required. Text that the server writes into the field passes until the user focuses the field.

When nothing matches, a strict field's menu stays open and shows "No results", in Arabic on an Arabic page. A screen reader reads the message. Without `data-strict`, any typed text is valid, so the menu closes instead.

### Search Box
{: .nds-block-title}

When the autocomplete is in a `.nds-search-box`, a pick also clicks the box's `.nds-search-btn`. The search then runs with the picked text, and the user does not click Search again.

</div>
  </div>
</section>

<section id="autocompleteFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">A field starts on its first focus, before the user types. A field added to the page later needs no init call.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-search-list-01"></i>
            <span class="nds-label">Result Highlighting</span>
          </span>
          <p class="nds-item-desc">The typed text is marked in each result with <code class="nds-inline-code lang-html">&lt;mark&gt;</code>. The menu shows the first 20 results.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Navigation</span>
          </span>
          <p class="nds-item-desc">The arrow keys move through the results and wrap at the ends. Home and End go to the first and the last result, and the result the keys reach scrolls into view. Enter picks it. Escape and Tab close the menu with no pick.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Debounced Fetching</span>
          </span>
          <p class="nds-item-desc">A search starts 300 ms after the last keystroke. A new search cancels the request before it. A spinner replaces the clear button while a request runs.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-access"></i>
            <span class="nds-label">Screen Reader Support</span>
          </span>
          <p class="nds-item-desc">The input is a combobox, and the menu is a listbox of options. A screen reader reads the result the arrow keys reach while focus stays in the input.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cancel-circle"></i>
            <span class="nds-label">Clear Button</span>
          </span>
          <p class="nds-item-desc">The clear button empties the field, drops the last pick and closes the menu. It fires <code class="nds-inline-code lang-js">nds:autocomplete:clear</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Menu Placement</span>
          </span>
          <p class="nds-item-desc">The menu is as wide as the field. In a drawer, a modal or another scroll area that would cut it off, the menu moves to <code class="nds-inline-code lang-html">&lt;body&gt;</code> while it is open.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="autocompletePractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use `data-fetch="once"` for a list of a few hundred items or fewer, such as cities or departments. Use `each` for a large set that the server searches.
- Lower `data-min-chars` only when a short query gives a useful list. With `each`, a lower number sends more requests.
- Use `data-strict` when the server accepts only a known value, such as a city code. Leave it off a search field.
- Write the placeholder or the info text as a hint of what to type, such as "Type part of a service name".
- For the label, info text, feedback and the required mark, see [Forms](../components/forms). They work the same on every field.

</div>
  </div>
</section>

<section id="autocompleteApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `.nds-autocomplete-menu` | the menu | The script adds the menu, with `.nds-dropmenu-menu`, in the `.nds-form-control`. Style the menu through this class: it stays on the menu when the menu moves to `<body>` |
| `.nds-autocomplete-value` | a hidden `<input>` | The script adds it with `data-strict`. It holds the picked text. It has no `name`, so the form data does not change |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-url` | `.nds-form-container` | The URL that returns the JSON results. Required. It may hold a query string: the script then adds the typed text after `&` |
| `data-name` | `.nds-form-container` | The result field that each row shows and that a pick writes into the input. The default is `Title` |
| `data-fetch` | `.nds-form-container` | `each` (the default) requests the URL on each search. `once` requests it once and filters in the browser |
| `data-min-chars` | `.nds-form-container` | The fewest characters that start a search. The default is `3`. Shorter text closes the menu |
| `data-query-param` | `.nds-form-container` | The name of the query parameter that holds the typed text with `each`. The default is `q` |
| `data-results-path` | `.nds-form-container` | A dot path to the results array in the response, such as `response.items`. Without it, the script reads an array, or the `results` or `data` key of an object |
| `data-empty-message` | `.nds-form-container` with `data-strict` | The text when nothing matches. The default is "No results", in Arabic on an Arabic page. See Strict Mode |
| `data-empty-icon` | `.nds-form-container` with `data-strict` | The icon classes when nothing matches. The default is `nds-icon nds-hgi-search-01` |
| `data-strict` | `.nds-form-container` | The form accepts only a picked result. See Strict Mode above |
| `data-state~="loading"` | `.nds-form-container` | The script sets it when a request starts, and removes it when the latest request ends. The forms script shows a spinner in `.nds-form-action` |
| `data-portal` | `.nds-form-control` | The menu moves to `<body>` on every open. Without it, the menu moves only when a scroll area would cut it off |
| `autocomplete="on"` | the `<input>` | Marks the input. The script sets it to `off` when the field starts, so the browser shows no list of its own, and `destroy()` sets it back |
| `data-state~="active"` | a result in the menu | The script sets it on the result that the arrow keys reach, and removes it when they move on |
{: .nds-table .nds-responsive}

### Tokens
{: .nds-block-title}

The theme-wide tokens of the autocomplete. Set one at `:root`, or on a wrapper to reach every autocomplete inside it. A token with a dark value changes in dark mode: give your override one too. [Tokens](../components/tokens) lists every token. The highlight is the background of the matched text in a suggestion.

{{ site.data.tokens.components.autocomplete.html }}

### Response Format
{: .nds-block-title}

The response is a JSON array of objects, or an object that holds the array. Each object needs the `data-name` field. Other fields reach the `select` event in `item`.

<script type="text/html" id="autocomplete-response" data-canon data-lang="js">
// GET services.json?q=visa
[
  { "Id": 7, "Title": "Visa Application", "Category": "Travel" },
  { "Id": 21, "Title": "Visit Visa Extension", "Category": "Travel" }
]
</script>

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Autocomplete.init()` | Starts the page listener, once. The loader calls it |
| `NDS.Autocomplete.reinit()` | The same as `init()` |
| `NDS.Autocomplete.create(container, options)` | Starts one field now: pass its `.nds-form-container`. Use it to pass options, or for a field that code searches before the user focuses it. Call it before the first focus: on a field that has already started, it returns an instance that does nothing |
| `instance.destroy()` | Removes the menu, the listeners and the hidden input. The field starts again on its next focus |
{: .nds-table .nds-responsive}

| Option | Default | Effect |
|---|---|---|
| `filter(items, query)` | a match in the `data-name` field | Returns the results to show. It runs in both fetch modes: with `each`, on the server's results |
| `renderItem(item, query)` | the `data-name` field, with the match marked | Returns the HTML of one row. The script inserts it as HTML, so escape the text yourself. The match is not marked: add `<mark>` yourself if you need it |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:autocomplete:fetch` | `.nds-form-container`, and it bubbles | `{ query, results }`, after each list renders. `results` holds every match, not only the first 20 |
| `nds:autocomplete:select` | `.nds-form-container`, and it bubbles | `{ item, text }`, after a pick. `item` is the whole result object. `text` is its `data-name` value, now in the input |
| `nds:autocomplete:clear` | `.nds-form-container`, and it bubbles | `{}`, after the clear button empties the field |
{: .nds-table .nds-responsive}

<script type="text/html" id="autocomplete-js" data-canon data-lang="js">
var field = document.querySelector('#service-search').closest('.nds-form-container');

// Fill a hidden input with the picked service's id
field.addEventListener('nds:autocomplete:select', function (e) {
  document.querySelector('#service-id').value = e.detail.item.Id;
});

// Match the start of the name only, and show the category in each row
NDS.Autocomplete.create(field, {
  filter: function (items, query) {
    return items.filter(function (item) {
      return item.Title.toLowerCase().indexOf(query.toLowerCase()) === 0;
    });
  },
  renderItem: function (item) {
    return NDS.escapeHtml(item.Title) + ' · ' + NDS.escapeHtml(item.Category);
  }
});
</script>

The full API is in the banner of `_js/nds-autocomplete.js`.

</div>
  </div>
</section>

<section id="autocompleteRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Services List](../examples/services-list): a search box with results that also filters the list.
- [Manage Records](../examples/manage-records): a required requester field that loads the list once, in a modal.
- [Form Template](../templates/form-template): a required city field on a request form.

</div>
  </div>
</section>
