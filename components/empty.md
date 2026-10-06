---
layout: page
title: Empty
hero_title: Empty - National Design System
hero_description: Empty shows an icon and a short message in a container that has no items
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 10:12 PM"
---

<section id="emptyOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Add `nds-empty` to a container that can have no items, such as search results, a filtered list or a notification list. It works on a `<div>`, a list, a table and a table body. An item is any child element. The script adds the placeholder while the container has no items, and removes it when one arrives. You write only the class.

Pick another component when:

- the data is still loading: [Loading](../components/loading).
- a request failed: [Alert](../components/alert), with `data-status="error"`, so the user knows that something went wrong.

</div>
  </div>
</section>

<section id="emptyMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="empty-container" data-canon data-variants="emptyVariantsTable">
<div class="nds-empty"></div>
</script>
<script type="text/html" id="empty-list" data-canon>
<ul class="nds-empty"></ul>
</script>
<script type="text/html" id="empty-table" data-canon>
<table class="nds-table nds-empty">
  <thead>
    <tr>
      <th>Request</th>
      <th>Status</th>
      <th>Updated</th>
    </tr>
  </thead>
</table>
</script>
<script type="text/html" id="empty-tbody" data-canon>
<table class="nds-table">
  <thead>
    <tr>
      <th>Request</th>
      <th>Status</th>
      <th>Updated</th>
    </tr>
  </thead>
  <tbody class="nds-empty"></tbody>
</table>
</script>
    </div>
  </div>
</section>

<section id="emptyVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The Message and Icon rows go on the element that carries `nds-empty`, whatever its tag.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Container (default) | — | — | Any block element. The placeholder is a `<div>`, centered in the container |
| Structure | List | canon `#empty-list` | — | A `<ul>` or an `<ol>`. The placeholder is an `<li>`, so the list stays valid |
| Structure | Table | canon `#empty-table` | — | `nds-empty` on the `<table>`. The script adds a `<tbody>` when the table has none |
| Structure | Table body | canon `#empty-tbody` | — | `nds-empty` on one `<tbody>`, for a table with more than one body |
| Message | Message (hint: Replaces the default text) | `[data-empty-message="No requests match your search"]` | `.nds-empty` | Replaces the default text. Say why the container is empty, or what the user can do next |
| Icon | Icon (hint: Replaces the default icon) | `[data-empty-icon="nds-icon nds-hgi-search-01"]` | `.nds-empty` | Replaces the default icon. The value is the whole `class` of the icon, from any icon set |
{: #emptyVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="emptyBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Live Updates
{: .nds-block-title}

The placeholder goes away when an item is added, and comes back when the last item is removed. A new `data-empty-message` or `data-empty-icon` value shows at once.

<script type="text/html" id="empty-live" data-canon data-code="none">
<div class="nds-flex nds-col">
  <div id="empty-live-list" class="nds-definition-list nds-divided nds-card nds-stroke nds-empty" data-empty-message="No requests yet" style="--card-width: 300px;"></div>
  <div class="nds-flex nds-center">
    <button class="nds-btn nds-primary nds-sm" type="button" data-empty-live="add">
      <span class="nds-label">Add item</span>
    </button>
    <button class="nds-btn nds-secondary-outline nds-sm" type="button" data-empty-live="remove">
      <span class="nds-label">Remove item</span>
    </button>
  </div>
</div>
</script>
<script>
(function () {
  var n = 1040;
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-empty-live]'), list = document.getElementById('empty-live-list');
    if (!btn || !list) return;
    if (btn.getAttribute('data-empty-live') === 'add') {
      list.insertAdjacentHTML('beforeend', '<div class="nds-definition-item"><span class="nds-item-title"><span class="nds-label">Request ' + (++n) + '</span></span><p class="nds-item-desc">Submitted today</p></div>');
      return;
    }
    var items = list.querySelectorAll(':scope > :not([data-nds-empty-placeholder])');
    if (items.length) items[items.length - 1].remove();
  });
})();
</script>

### Tables
{: .nds-block-title}

In a table, the placeholder is one row with one cell across every column. The script counts the columns in the header row. Only rows in a `<tbody>` count as content: the `<thead>`, `<tfoot>` and `<caption>` do not. When the column count changes, call `NDS.Empty.refresh()` on the element that carries `nds-empty`, and the cell spans the new count.

</div>
  </div>
</section>

<section id="emptyFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Automatic Setup</span>
          </span>
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">nds-empty</code> container with no items gets a placeholder, also a container added to the page later. You call nothing.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Markup That Fits the Container</span>
          </span>
          <p class="nds-item-desc">The placeholder is an <code class="nds-inline-code lang-html">&lt;li&gt;</code> in a list, a row in a table and a <code class="nds-inline-code lang-html">&lt;div&gt;</code> elsewhere. In an <code class="nds-inline-code lang-html">nds-grid</code> container, it spans every column.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-translation"></i>
            <span class="nds-label">Arabic and English Text</span>
          </span>
          <p class="nds-item-desc">The default message follows the page <code class="nds-inline-code lang-html">lang</code>: «لا يوجد محتوى» in Arabic, and "No content to show" in any other language.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-view-off"></i>
            <span class="nds-label">No Flash at Load</span>
          </span>
          <p class="nds-item-desc">The container stays hidden until the placeholder is in. The page never shows it empty first.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="emptyPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Show [Loading](../components/loading) while data loads, not the placeholder. If the request returns no items, the placeholder then shows.
- Write a `data-empty-message` that says why the container has no items, or what the user can do next. "No requests match your search" tells the user more than "Empty".
- Keep the message to one short sentence. Put longer help outside the container.
- Wrap text content in an element. The script counts child elements only, so a container that holds only text still shows the placeholder.
- Do not add your own "no results" markup to the container. The script counts it as an item, so the placeholder never shows.
- When your code counts the items in a container, skip the element with `data-nds-empty-placeholder`.

</div>
  </div>
</section>

<section id="emptyApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-empty-placeholder` | the placeholder `<div>` or `<li>` | Set by the script. Style the placeholder through this class |
| `nds-empty-message` | the message `<span>` in the placeholder | Set by the script. Style the message through this class |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-empty-message` | `.nds-empty` | Replaces the default text. A change at run time updates the placeholder |
| `data-empty-icon` | `.nds-empty` | Replaces the default icon, `nds-icon nds-hgi-desert`. The value becomes the whole `class` of the icon `<i>`. A change at run time updates the placeholder |
| `data-nds-empty-placeholder` | the placeholder | Set by the script on the placeholder element, and on a `<tbody>` it adds. Do not set it yourself |
{: .nds-table .nds-responsive}

[Autocomplete](../components/autocomplete) reads the same two attributes for its no-results message.

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Empty.init()` | Fills every empty container and starts to watch the page. The loader calls it once. A second call does nothing |
| `NDS.Empty.refresh(el)` | Checks one `.nds-empty` element again: adds or removes its placeholder, and updates the column count of a table placeholder |
{: .nds-table .nds-responsive}

Empty fires no events. Call `refresh()` only for a change the script cannot see, such as a class added to an element already on the page.

<script type="text/html" id="empty-refresh-js" data-canon data-lang="js">
// Turn an element already on the page into an Empty container
var results = document.querySelector('#results');
results.classList.add('nds-empty');
NDS.Empty.refresh(results);

// Update the placeholder row after the table columns change
NDS.Empty.refresh(document.querySelector('#requests-table'));
</script>

The full API is in the banner of `_js/nds-empty.js`.

</div>
  </div>
</section>

<section id="emptyRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Manage Records](../examples/manage-records): the people search shows "No matching people" when nothing matches.

</div>
  </div>
</section>
