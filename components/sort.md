---
layout: page
title: Sort
hero_title: Sort - National Design System
hero_description: Sort reorders items that are already on the page, such as cards, list rows or table rows
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="sort-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Sort reorders the items of a list when the user picks a trigger. Each trigger names its list with `data-sort-target`, and each item carries its sort values in `data-sort-{key}` attributes. Sort has two modes:

- Direct mode: each trigger sets one key and one direction. Use it for the options of a dropmenu.
- Cycle mode: one trigger steps through ascending, descending and the original order. Use it for one button per key.

[Filter](../components/filter) and [Tables](../components/tables) start Sort for their own sort buttons.

Pick another component when:

- the items are table rows with sortable columns: [Tables](../components/tables).
- the items are also filtered or searched: [Filter](../components/filter).

</div>
  </div>
</section>

<section id="sort-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The triggers sit in a [Toolbar](../components/toolbar) above the list. The list needs only the `id` that the triggers name.

<script type="text/html" id="sort-direct" data-canon data-variants="sort-variants-table">
<div>
  <div class="nds-toolbar">
    <div class="nds-toolbar-end">
      <div class="nds-dropmenu">
        <button type="button" class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
          <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
          <span class="nds-label">Sort</span>
        </button>
        <div class="nds-dropmenu-menu" hidden>
          <div class="nds-dropmenu-scroll">
            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort-target="sort-services" data-sort>
              <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
              <span class="nds-label">Default order</span>
            </button>
            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort-target="sort-services" data-sort="name" data-sort-dir="asc">
              <i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"></i>
              <span class="nds-label">Name A to Z</span>
            </button>
            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort-target="sort-services" data-sort="name" data-sort-dir="desc">
              <i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"></i>
              <span class="nds-label">Name Z to A</span>
            </button>
            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort-target="sort-services" data-sort="price" data-sort-dir="asc">
              <i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"></i>
              <span class="nds-label">Price low to high</span>
            </button>
            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort-target="sort-services" data-sort="price" data-sort-dir="desc">
              <i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"></i>
              <span class="nds-label">Price high to low</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="sort-services" class="nds-grid" style="--max-col:3;--mid-col:2;--min-col:2;">
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
<div>
  <div class="nds-toolbar">
    <div class="nds-toolbar-end">
      <div class="nds-btn-group">
        <button type="button" class="nds-btn nds-secondary-outline" data-sort-target="sort-services-cycle" data-sort="name" data-sort-mode="cycle">
          <span class="nds-label">Name</span>
          <i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i>
        </button>
        <button type="button" class="nds-btn nds-secondary-outline" data-sort-target="sort-services-cycle" data-sort="price" data-sort-mode="cycle">
          <span class="nds-label">Price</span>
          <i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  </div>
  <div id="sort-services-cycle" class="nds-grid" style="--max-col:3;--mid-col:2;--min-col:2;">
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

</div>
  </div>
</section>

<section id="sort-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Direct (default) (hint: Each menu item sets one key and one direction) | — | — | A dropmenu of sort choices in a [Toolbar](../components/toolbar). Each item fixes one key and one direction |
| Structure | Cycle (hint: Each click steps through up, down and the original order) | canon `#sort-cycle` | — | One button per key, with `data-sort-mode="cycle"`. Each click steps its key through ascending, descending and the original order, and its `.nds-sort-icon` turns to match |
{: #sort-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="sort-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Markup Wiring
{: .nds-block-title}

The script wires every list that a `data-sort-target` names, after the page first paints. A trigger can sit anywhere on the page, in a portaled dropmenu too. Every child of the list is an item, so the list holds only the items. For a custom value reader, fixed types, URL sync or a change callback, call `create()` instead (see the API). Leave `data-sort-target` off those triggers: a list keeps its first instance, so a second setup is ignored.

### Direct Mode
{: .nds-block-title}

Each trigger fixes its own key and direction, so every choice has a label. A trigger with an empty `data-sort` restores the authored order. Set `data-sort-dir` to `asc` or `desc`. Without it the trigger sorts ascending and never toggles.

### Cycle Mode
{: .nds-block-title}

One trigger holds the state for one key: the first click sorts ascending, the second descending, the third restores the authored order. A click on another trigger starts that key at ascending. Write `data-sort-mode="cycle"` on the triggers, or set `mode: 'cycle'` in `create()`.

### Initial State
{: .nds-block-title}

When the server sends the items already sorted, write `data-state="sorted-asc"` or `"sorted-desc"` on the trigger of that order. Sort records the state without moving the items, and the next click goes on from that state. In `create()`, `initialState: { key, dir }` does the same, and wins over the markup. Either one wins over `urlSync`.

### URL Persistence
{: .nds-block-title}

In `create()`, set `urlSync: { keyParam, dirParam }` and the sort key and direction go in the query string: `urlSync: { keyParam: 'sort', dirParam: 'dir' }` writes `?sort=price&dir=desc`. Ascending writes no direction, and other parameters stay. Sort reads them on `create()` and writes them on every change. Use it on list pages where users share links or reload. Markup wiring leaves the URL alone: a [Filter](../components/filter) keeps the sort of its own buttons in the URL.

</div>
  </div>
</section>

<section id="sort-features" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc"><a class="nds-color" href="../components/filter">Filter</a> starts Sort for its <code class="nds-inline-code lang-html">[data-sort]</code> buttons. <a class="nds-color" href="../components/tables">Tables</a> starts it for its sortable column headers. Neither needs a <code class="nds-inline-code lang-html">data-sort-target</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-data-transfer-vertical"></i>
            <span class="nds-label">Type Detection</span>
          </span>
          <p class="nds-item-desc">Sort reads the values at sort time and picks number, date or text. A value such as <code class="nds-inline-code lang-html">9,375 SAR</code> sorts as a number. A date in the list's date format sorts as a date: the nearest <code class="nds-inline-code lang-html">data-date-format</code> around the list, such as on <code class="nds-inline-code lang-html">&lt;html&gt;</code>, or <code class="nds-inline-code lang-html">DD/MM/YYYY</code>, in Latin or Arabic digits. It reads in the nearest <code class="nds-inline-code lang-html">data-calendar</code>, so a Hijri column sorts by its Hijri dates. So do <code class="nds-inline-code lang-html">YYYY-MM-DD</code> and ISO dates with a time. Other text with <code class="nds-inline-code lang-html">/</code> or <code class="nds-inline-code lang-html">:</code> between digits sorts as text, never as a number. Text sorts in the language of the browser, and numbers inside text stay in order: item 2 comes before item 10.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-sort-by-down-02"></i>
            <span class="nds-label">Direction Icon</span>
          </span>
          <p class="nds-item-desc">An icon with <code class="nds-inline-code lang-html">nds-sort-icon</code> in a trigger turns up or down with the sort, and back when the sort is cleared. No script of yours swaps it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard and ARIA</span>
          </span>
          <p class="nds-item-desc">Triggers respond to Enter and Space. The active trigger carries <code class="nds-inline-code lang-html">aria-pressed="true"</code>. In <code class="nds-inline-code lang-js">create()</code>, the <code class="nds-inline-code lang-js">a11y</code> option writes <code class="nds-inline-code lang-html">aria-sort</code> on a column header instead.</p>
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

<section id="sort-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Decide who sorts before you write a trigger. If the page holds every matching row, Sort reorders them. If the server sends one page at a time, the server must sort. Then write no `data-sort` triggers, and send your own sort parameter.
- Point `data-sort-target` only at a list that no Filter or table sorts. Those sort their own list, and `NDS.Init.audit()` warns about the button.
- Write direct mode triggers as an ascending and a descending pair, and add a trigger with an empty `data-sort` to restore the original order.
- Use cycle mode when one control carries one key. Users expect the third click to undo the sort. Write `data-sort-mode="cycle"` on every trigger of the list.
- Give each trigger a text label, or an `aria-label` when it shows only an icon.
- Keep display text and the sort value apart when they differ. A card that reads "Free" carries `data-sort-price="0"`, so it sorts as the cheapest.
- Write a date in its sort attribute as `YYYY-MM-DD`, such as `data-sort-added="2026-03-15"`. The text can show any format or calendar.
- Set `types: { key: 'string' }` in `create()` for codes that start with a number, such as `10-B`. Detection reads them as the number 10, so `10-A` and `10-B` tie and keep their order.
- In `create()`, put the triggers and the items under the root: a selector string resolves inside it. Pass a function for elements outside it.
- Keep the `accessor` fast and free of side effects: Sort calls it on every comparison.
- Call `NDS.Init.refresh(list)` after you add items, such as after a request. New items join the active sort only after that call. On your own instance, call `refresh()`.
- Use `onChange` in the code that creates the instance. Use the `nds:sort:change` event in other code.
- Call `NDS.Init.destroy(view)` before you remove a view in a single-page app. It removes every listener Sort added.

</div>
  </div>
</section>

<section id="sort-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Sort ships in the delegated bundle, which the loader injects after first paint. A click before the bundle arrives does nothing, and the next click works. A `create()` call before the bundle arrives still works, but returns a Promise instead of the instance. To get the instance at once, `await NDS.loadBundle('delegated')` first.

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-sort-icon` | the icon in a trigger | Shows the up icon while its trigger, or the table header of its trigger, carries `sorted-asc`, and the down icon with `sorted-desc`. Otherwise it shows the icon class it has. |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-sort-target` | a trigger | The `id` of the list it sorts. The script wires each list it names. |
| `data-sort` | a trigger | The sort key. Empty: restore the original order. |
| `data-sort-dir` | a direct mode trigger | `asc` or `desc`. Missing means `asc`. |
| `data-sort-mode` | a trigger with `data-sort-target` | `cycle` puts every trigger of that list in cycle mode. Missing means direct mode. |
| `data-state~="sorted-asc"`, `"sorted-desc"` | the active trigger, or its table header with `a11y: 'sort'` | The script sets it after each sort, and removes it when another sort runs or the sort is cleared. Write it at load when the items arrive in that order: Sort records the state and does not move them. |
| `data-state~="selected"` | the active trigger | With `a11y: 'pressed'`, the default. The script sets it with `aria-pressed="true"` after each sort. When another trigger is active or the sort is cleared, it removes it and sets `aria-pressed="false"`. |
| `data-state~="active"` | the active trigger | With `a11y: 'sort'`. The script sets it after each sort, and removes it when another trigger is active or the sort is cleared. |
| `aria-sort` | the table header of a trigger | With `a11y: 'sort'`. The script writes `ascending` or `descending` on the active header, and `none` on the others. |
| `data-sort-{key}` | an item | The value the default `accessor` sorts by for that key. |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

Markup wiring is a `create()` call on the list with the defaults below: `items` is the children of the list, `triggers` is the buttons that name it, and `data-sort-mode` sets `mode`. Call `create()` yourself for any other option.

| Method | Effect |
|---|---|
| `NDS.Sort.init()` | Wires every list that a `data-sort-target` names, and skips a list that already has an instance. The loader calls it. |
| `NDS.Sort.refresh(root)` | Wires new lists, then sorts again each list that markup wired inside `root`, or that holds `root`. An instance from your own `create()` call needs its `refresh()`. `NDS.Init.refresh()` calls it. |
| `NDS.Sort.create(root, options)` | Returns the instance of the root. A root that already has one returns it and ignores `options`. |
| `NDS.Sort.getInstance(root)` | Returns the instance of the root, or `null`. `root` is an element or a selector. |
| `NDS.Sort.detectType(values, dateFormat)` | Returns `'number'`, `'date'` or `'string'`. `dateFormat` is the format a date in the values uses: the site's when you leave it out. |
| `NDS.Sort.parseValue(raw, type, dateFormat)` | Returns the value as the type sorts it. |
| `NDS.Sort.compare(a, b, type, dir, dateFormat)` | Returns a negative, zero or positive number. |
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
| `a11y` | `'pressed'` | `'pressed'`, `'sort'` or `'none'`. The Data Attributes table lists what each one writes. |
| `a11yTarget` | the closest `th` | With `a11y: 'sort'`, a function from a trigger to the element that carries `aria-sort` and the `sorted-asc` or `sorted-desc` state. |
| `accessor` | reads `data-sort-{key}` | A function `(item, key) => value` that returns the raw value. |
| `keyFrom` | reads `data-sort` | A function from a trigger to its key. An empty key restores the original order. |
| `types` | `{}` | The type of a key: `'number'`, `'date'` or `'string'`. Replaces detection for that key. |
| `initialState` | `null` | `{ key, dir }`. Records the state without moving items. Wins over a `sorted-asc` or `sorted-desc` state in the markup. |
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

<section id="sort-related" class="nds-content-section nds-doc-related">
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
