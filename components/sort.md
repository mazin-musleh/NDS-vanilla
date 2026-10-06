---
layout: page
title: Sort
hero_title: Sort - National Design System
hero_description: Sort reorders items that are already on the page, such as cards, list rows or table rows
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.7.0"
last_edit: "06/10/2026 - 10:17 PM"
---

<section id="sortOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Sort is a script with no markup of its own. You write the triggers and the items, then call `NDS.Sort.create()` on a root element. Each item carries its sort values in `data-sort-{key}` attributes. Sort has two modes:

- Direct mode: each trigger sets one key and one direction. Use it for the options of a dropmenu.
- Cycle mode: one trigger steps through ascending, descending and the original order. Use it for a column header.

[Filter](../components/filter) and [Tables](../components/tables) create Sort for you. Call `create()` yourself only for a list or grid that neither of them owns.

Pick another component when:

- the items are table rows with sortable columns: [Tables](../components/tables).
- the items are also filtered or searched: [Filter](../components/filter).

</div>
  </div>
</section>

<section id="sortMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The root holds both the triggers and the items, so the selector strings resolve inside it. The JS tab is the `create()` call that starts it.

<script type="text/html" id="sort-direct" data-canon data-variants="sortVariantsTable" data-js="sort-js" data-preview="js">
<div id="sortRoot">
  <div class="nds-toolbar">
    <div class="nds-bar-end">
      <div class="nds-dropmenu">
        <button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
          <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
          <span class="nds-label">Sort</span>
        </button>
        <div class="nds-dropmenu-menu" hidden>
          <div class="nds-dropmenu-scroll">
            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort>
              <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
              <span class="nds-label">Default order</span>
            </button>
            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="name" data-sort-dir="asc">
              <i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"></i>
              <span class="nds-label">Name A to Z</span>
            </button>
            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="name" data-sort-dir="desc">
              <i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"></i>
              <span class="nds-label">Name Z to A</span>
            </button>
            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="price" data-sort-dir="asc">
              <i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"></i>
              <span class="nds-label">Price low to high</span>
            </button>
            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="price" data-sort-dir="desc">
              <i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"></i>
              <span class="nds-label">Price high to low</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-grid" style="--max-col:3;--mid-col:2;--min-col:2;">
    <div class="nds-card nds-stroke" data-sort-name="Zakat Payment" data-sort-price="75">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Zakat Payment</span>
        </div>
        <div class="nds-card-value">
          <span class="nds-number-format" data-currency="SAR">75</span>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke" data-sort-name="Passport Renewal" data-sort-price="300">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Passport Renewal</span>
        </div>
        <div class="nds-card-value">
          <span class="nds-number-format" data-currency="SAR">300</span>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke" data-sort-name="Birth Certificate" data-sort-price="25">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Birth Certificate</span>
        </div>
        <div class="nds-card-value">
          <span class="nds-number-format" data-currency="SAR">25</span>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke" data-sort-name="Identity Verification" data-sort-price="0">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Identity Verification</span>
        </div>
        <div class="nds-card-value">
          <span class="nds-number-format">Free</span>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke" data-sort-name="Driver License" data-sort-price="150">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Driver License</span>
        </div>
        <div class="nds-card-value">
          <span class="nds-number-format" data-currency="SAR">150</span>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke" data-sort-name="Business Registration" data-sort-price="1200">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Business Registration</span>
        </div>
        <div class="nds-card-value">
          <span class="nds-number-format" data-currency="SAR">1200</span>
        </div>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="sort-cycle" data-canon>
<div id="sortRoot">
  <div class="nds-toolbar">
    <div class="nds-bar-end">
      <div class="nds-btn-group">
        <button type="button" class="nds-btn nds-secondary-outline" data-sort="name">
          <span class="nds-label">Name</span>
          <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline" data-sort="price">
          <span class="nds-label">Price</span>
          <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
  <div class="nds-grid" style="--max-col:3;--mid-col:2;--min-col:2;">
    <div class="nds-card nds-stroke" data-sort-name="Zakat Payment" data-sort-price="75">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Zakat Payment</span>
        </div>
        <div class="nds-card-value">
          <span class="nds-number-format" data-currency="SAR">75</span>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke" data-sort-name="Passport Renewal" data-sort-price="300">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Passport Renewal</span>
        </div>
        <div class="nds-card-value">
          <span class="nds-number-format" data-currency="SAR">300</span>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke" data-sort-name="Birth Certificate" data-sort-price="25">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Birth Certificate</span>
        </div>
        <div class="nds-card-value">
          <span class="nds-number-format" data-currency="SAR">25</span>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke" data-sort-name="Identity Verification" data-sort-price="0">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Identity Verification</span>
        </div>
        <div class="nds-card-value">
          <span class="nds-number-format">Free</span>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke" data-sort-name="Driver License" data-sort-price="150">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Driver License</span>
        </div>
        <div class="nds-card-value">
          <span class="nds-number-format" data-currency="SAR">150</span>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke" data-sort-name="Business Registration" data-sort-price="1200">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Business Registration</span>
        </div>
        <div class="nds-card-value">
          <span class="nds-number-format" data-currency="SAR">1200</span>
        </div>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="sort-js" data-canon data-lang="js">
NDS.Sort.create(document.getElementById('sortRoot'), {
  items: '.nds-card',
  triggers: '[data-sort]',
  mode: 'direct',
  types: { price: 'number' }
});
</script>
<script type="text/html" id="sort-js-icons" data-canon data-lang="js">
onChange: ({ key, dir }) => {
  document.querySelectorAll('#sortRoot [data-sort]').forEach((btn) => {
    const active = btn.dataset.sort === key && dir;
    btn.querySelector('i').className = !active
      ? 'nds-icon nds-hgi-sorting-05'
      : dir === 'asc'
        ? 'nds-icon nds-hgi-sort-by-up-02'
        : 'nds-icon nds-hgi-sort-by-down-02';
  });
}
</script>

</div>
  </div>
</section>

<section id="sortVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

`#sort-js` is the `create()` call that starts the markup (`data-js` on the base canon). A row whose On element is `create()` sets an option of that call. `create({ mode: 'cycle' })` means only a call with that option.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Direct (default) (hint: Each menu item sets one key and one direction) | — | — | A dropmenu of sort choices in a [Toolbar](../components/toolbar). Each item fixes one key and one direction |
| Structure | Cycle (demo: + icons) (hint: Each click steps through up, down and the original order) | canon `#sort-cycle` | — | One button per key. Each click steps its key through ascending, descending and the original order |
| Structure | Cycle (demo: + icons) (hint: Each click steps through up, down and the original order) | `mode: 'cycle'` | `create()` | The same, in JavaScript |
| Direction icons | Direction icons (id: icons) (hint: Each icon shows the order in use) | canon `#sort-js-icons` | `create({ mode: 'cycle' })` | `onChange` swaps each button's icon to show the key and direction in use |
{: #sortVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="sortBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Direct Mode
{: .nds-block-title}

Each trigger fixes its own key and direction, so every choice has a label. A trigger with an empty `data-sort` restores the authored order. Set `data-sort-dir` to `asc` or `desc`. Without it the trigger sorts ascending and never toggles.

### Cycle Mode
{: .nds-block-title}

One trigger holds the state for one key: the first click sorts ascending, the second descending, the third restores the authored order. A click on another trigger starts that key at ascending.

### URL Persistence
{: .nds-block-title}

Set `urlSync: { keyParam, dirParam }` and the sort key and direction go in the query string. Sort reads them on `create()` and writes them on every change. Ascending is left out, and other parameters stay. Use it on list pages where users share links or reload.

### Initial State
{: .nds-block-title}

Set `initialState: { key, dir }` when the server sends the items already sorted. Sort records the state and the attributes on the triggers without moving anything. It wins over `urlSync` on `create()`.

</div>
  </div>
</section>

<section id="sortFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Used by Filter and Tables</span>
          </span>
          <p class="nds-item-desc"><a class="nds-color" href="../components/filter">Filter</a> creates Sort for its <code class="nds-inline-code lang-html">[data-sort]</code> buttons. <a class="nds-color" href="../components/tables">Tables</a> creates it for its sortable column headers. Neither needs a call from you.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-data-transfer-vertical"></i>
            <span class="nds-label">Type Detection</span>
          </span>
          <p class="nds-item-desc">Sort reads the values at sort time and picks number, date or text. A value such as <code class="nds-inline-code lang-html">9,375 SAR</code> sorts as a number. <code class="nds-inline-code lang-html">DD/MM/YYYY</code>, <code class="nds-inline-code lang-html">YYYY-MM-DD</code> and ISO dates sort as dates. Text sorts in the language of the browser, and numbers inside text stay in order: item 2 comes before item 10.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard and ARIA</span>
          </span>
          <p class="nds-item-desc">Triggers respond to Enter and Space. The <code class="nds-inline-code lang-js">a11y</code> option chooses what Sort writes: <code class="nds-inline-code lang-html">aria-pressed</code> on the trigger, or <code class="nds-inline-code lang-html">aria-sort</code> on its column header.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-menu-square"></i>
            <span class="nds-label">Dropmenu Icon Sync</span>
          </span>
          <p class="nds-item-desc">When the triggers sit in a <a class="nds-color" href="../components/dropmenu">dropmenu</a>, the icon on the closed trigger button copies the icon of the chosen item.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-reload"></i>
            <span class="nds-label">Original Order</span>
          </span>
          <p class="nds-item-desc">Sort keeps the authored order and restores it on reset. It moves the existing elements, so their listeners and state stay.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Call <code class="nds-inline-code lang-js">apply()</code>, <code class="nds-inline-code lang-js">reset()</code> and <code class="nds-inline-code lang-js">refresh()</code> from your own code. Listen for <code class="nds-inline-code lang-js">nds:sort:change</code> to react to every sort.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="sortPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Decide who sorts before you write a trigger. If the page holds every matching row, Sort reorders them. If the server sends one page at a time, the server must sort. Then write no `data-sort` triggers, and send your own sort parameter.
- Put the triggers and the items under one root. A selector string resolves inside the root, so pass a function for elements outside it.
- Write direct mode triggers as an ascending and a descending pair, and add a trigger with an empty `data-sort` to restore the original order.
- Use cycle mode when one control carries one key, such as a column header. Users expect the third click to undo the sort.
- Keep display text and the sort value apart when they differ. A card that reads "Free" carries `data-sort-price="0"`, so it sorts as the cheapest.
- Set `types` for values that look like numbers but sort as text, such as zip codes, phone numbers and ids.
- Keep the `accessor` fast and free of side effects: Sort calls it on every comparison.
- Call `refresh()` after you add items, such as after a request. New items join the active sort only after that call.
- Use `onChange` in the code that creates the instance. Use the `nds:sort:change` event in other code.
- Call `destroy()` when you remove the root in a single-page app. It removes every listener Sort added.

</div>
  </div>
</section>

<section id="sortApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Sort ships in the delegated bundle, which the loader injects after first paint. A `create()` call before the bundle arrives still works, but returns a Promise instead of the instance. To get the instance at once, `await NDS.loadBundle('delegated')` first. Sort has no `init()`: nothing sorts until you call `create()`.

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-sort` | trigger | The sort key. Empty: restore the original order. |
| `data-sort-dir` | trigger | `asc` or `desc`. Direct mode only. Missing means `asc`. |
| `data-sort-{key}` | item | The value the default `accessor` sorts by for that key. |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Sort.create(root, options)` | Returns the instance of the root. A root that already has one returns it and ignores `options`. |
| `NDS.Sort.getInstance(root)` | Returns the instance of the root, or `null`. `root` is an element or a selector. |
| `NDS.Sort.detectType(values)` | Returns `'number'`, `'date'` or `'string'`. |
| `NDS.Sort.parseValue(raw, type)` | Returns the value as the type sorts it. |
| `NDS.Sort.compare(a, b, type, dir)` | Returns a negative, zero or positive number. |
| `sort.apply(key, dir)` | Sorts now. A `null` key restores the original order. |
| `sort.reset()` | Restores the original order. |
| `sort.refresh()` | Sorts the items again by the active key. Does nothing when no sort is active. |
| `sort.getState()` | Returns `{ key, dir }`. |
| `sort.destroy()` | Removes the listeners. |
{: .nds-table .nds-responsive}

The `create()` options:

| Option | Default | Effect |
|---|---|---|
| `items` | required | The elements to move. A selector, a NodeList, an array or a function that returns them. A function is called on every sort. |
| `triggers` | required | The elements that start a sort. Same forms as `items`. Triggers inside a portaled dropmenu are found. |
| `reorderIn` | the parent of the first item | The element the items are appended into. |
| `mode` | `'direct'` | `'direct'` or `'cycle'`. |
| `a11y` | `'pressed'` | `'pressed'` writes `aria-pressed` and `data-state="selected"` on the active trigger. `'sort'` writes `aria-sort` on `a11yTarget` and `data-state="active"` on the trigger. `'none'` writes nothing. |
| `a11yTarget` | the closest `th` | A function from a trigger to the element that carries `aria-sort`. |
| `accessor` | reads `data-sort-{key}` | A function `(item, key) => value` that returns the raw value. |
| `keyFrom` | reads `data-sort` | A function from a trigger to its key. An empty key restores the original order. |
| `types` | `{}` | The type of a key: `'number'`, `'date'` or `'string'`. Replaces detection for that key. |
| `initialState` | `null` | `{ key, dir }`. Records the state without moving items. |
| `urlSync` | `false` | `{ keyParam, dirParam }`. Reads and writes the query string. |
| `onChange` | none | A function `({ key, dir, orderedItems, state })`, called after every sort and before the event. |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:sort:change` | the root, bubbles | `{ key, dir, orderedItems, sort }`, after every sort, reset and `apply()`. |
{: .nds-table .nds-responsive}

<script type="text/html" id="sort-api-js" data-canon data-lang="js">
const sort = NDS.Sort.create(document.getElementById('list'), {
  items: '.row',
  triggers: '[data-sort]',
  types: { added: 'date' },
  initialState: { key: 'added', dir: 'desc' },
  urlSync: { keyParam: 'sort', dirParam: 'dir' }
});

sort.apply('price', 'desc');
sort.reset();

document.addEventListener('nds:sort:change', (e) => {
  const { key, dir, orderedItems } = e.detail;
});
</script>

The full API is in the banner of `_js/nds-sort.js`.

</div>
  </div>
</section>

<section id="sortRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Filter](../components/filter): sort buttons for a filtered list.
- [Tables](../components/tables): sortable column headers.
- [Dropmenu](../components/dropmenu): the menu a direct mode sort sits in.

</div>
  </div>
</section>
