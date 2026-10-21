---
layout: page
title: Init
hero_title: Init - National Design System
hero_description: How NDS starts the components on a page, and the calls that tell them a container changed after load
breadcrumb: [["Core", "/components/?shelf=Core"]]
lang: en
direction: ltr
since: "1.7.0"
updated: "1.12.x"
last_edit: "21/10/2026 - 10:38 PM"
---

<section id="init-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

`NDS.init` starts every component at page load. `NDS.init.ready` tells your page code when they have all started. Three more calls keep components in step with content that changes later. `refresh(el)` tells them the contents of `el` changed. `mount(el)` tells them `el` is new markup. `destroy(el)` tells them `el` is about to go away. They are in the main bundle, so every page has them.

A page whose content never changes after load needs none of the three calls.

Pick another component when:

- you need to load the data from a server: [Request](../core/request)

</div>
  </div>
</section>

<section id="init-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Add, edit or remove rows, then make one call on the container.

<script type="text/html" id="init-rows" data-canon data-lang="js">
const tbody = document.getElementById('requests-table-body');

// Change the rows the way your app does it
tbody.appendChild(buildRow(record));

// Then tell NDS the contents changed
NDS.init.refresh(tbody);
</script>

Mount markup you fetched or built.

<script type="text/html" id="init-mount" data-canon data-lang="js">
const grid = document.getElementById('servicesGrid');
const { data } = await NDS.request('/api/services.html');
grid.innerHTML = data;
await NDS.init.mount(grid);
</script>

Build rows from JSON. Keep one row's markup, copied from its canon, in a `<template>` on the page. Fill each copy with `textContent` and attributes, never with an HTML string.

<script type="text/html" id="init-template" data-canon data-lang="js">
// <template id="request-row"> holds one row's markup, copied from its canon
const rowTemplate = document.getElementById('request-row');
const { data } = await NDS.request('/api/requests', { json: true });
data.forEach(item => {
  const row = rowTemplate.content.firstElementChild.cloneNode(true);
  row.querySelector('[data-field="title"]').textContent = item.title;
  row.querySelector('.nds-tag').setAttribute('data-status', item.status);
  tbody.appendChild(row);
});
await NDS.init.mount(tbody);
</script>

Destroy a row before you remove it.

<script type="text/html" id="init-destroy" data-canon data-lang="js">
NDS.init.destroy(row);
row.remove();
// The filter and the counts follow the rows that are left
NDS.init.refresh(tbody);
</script>

</div>
  </div>
</section>

<section id="init-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Startup
{: .nds-block-title}

The loader calls `NDS.init.initialize()` at load. The components the first screen needs start before the page shows. The rest start in idle time, some from bundles that load after the page shows. `NDS.init.ready` resolves when the last one has started: see [Instance Lookup](#instance-lookup). Each NDS bundle runs once per page. A second copy of the same file logs a warning and does nothing.

### Refresh
{: .nds-block-title}

`refresh(el)` checks every registered component. A component with an element in `el` runs its `init()` again, which wires the new elements and skips the ones it already started. Filter, Selection and Main Nav drive a container from outside it, so they run their own refresh instead. Use it when the markup holds only components the page already had at load. A started component does not pick up new items of its own, such as slides added to a running swiper: call `NDS.init.destroy(el)`, change the markup, then `NDS.init.mount(el)`.

### Mount
{: .nds-block-title}

`mount(el)` finds the components in `el`, loads the bundles they need, then calls `refresh(el)`. It returns a promise. Use it for markup built or fetched after load that may hold a component the page did not have. When every bundle is already loaded, `mount()` does the same as `refresh()`.

### Destroy
{: .nds-block-title}

`destroy(el)` releases every component instance inside `el`, in page order, and returns how many it released. Each component removes its listeners and its init marker, so `refresh()` or `mount()` can start the same markup again later. `refresh()` releases nothing: without `destroy()`, each removed view leaves its listeners and observers running.

Some parts reach outside `el`. A FAB docks on `<body>`, an open menu sits in the browser's top layer, and an open modal holds a backdrop and a scroll lock. `destroy()` puts each one back or releases it, so nothing stays on the page after the view.

Only components inside `el` are reached. A filter toolbar can sit beside the grid it drives, so pass the root of the view you remove, not the list inside it.

### Fields Still Loading
{: .nds-block-title}

Some fields get their rule from their own component, such as Rating, Upload, Time Picker and Autocomplete. Until that component starts, the field has no rule, and `NDS.init.isPending(el)` is true. A form check then fails a required pending field with "Still loading. Try again in a moment", and calls `mount()` on the form so the next check can pass. A bundle that failed to load does not count: its field is checked as if it had no rule, so the form is never blocked for good.

</div>
  </div>
</section>

<section id="init-frameworks" class="nds-content-section nds-doc-frameworks">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Framework Views</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

NDS is plain HTML, CSS and JS, so any stack can host it: a framework such as React, Vue, Angular or Svelte, or server HTML that a library such as Turbo or htmx swaps in. The framework owns the nodes it renders, and NDS writes to some of them. These rules keep the two in step.

### Mount and Destroy
{: .nds-block-title}

Call `window.NDS?.init.mount(view)` after a view mounts, and `window.NDS?.init.destroy(view)` before it unmounts. Do not wait for `NDS.init.ready`, poll or retry before these calls. A view that mounts before NDS loads is found by NDS's own startup scan, and the `?.` skips each call while `NDS` does not exist yet.

`destroy()` also works on a view the framework has already removed, so a cleanup that runs after the removal, such as React's `useEffect` cleanup, is in time. Keep the view's element in a variable when the effect runs: React has emptied the ref by the time the cleanup runs.

Build rows with the framework, not with the `<template>` pattern in [Usage](#init-markup). The framework owns every node it renders.

For the same reason, do not let a [Filter](../components/filter) `data-ajax` request swap in HTML: it replaces the results container. Answer with JSON, or stop the request in `nds:filter:request` and send your own. Then render the results with the framework.

### HTML Swaps
{: .nds-block-title}

A library or your own script that replaces or morphs server HTML in place, such as Turbo, htmx or Livewire, takes the same two calls around each swap: `destroy(view)` before it and `mount(view)` after it. A morph keeps the nodes but writes the server's attributes back, so `refresh()` alone can start a second instance on a node that still holds the first.

### Hydration
{: .nds-block-title}

A framework that hydrates server HTML, such as Next.js or Nuxt, needs that HTML unchanged until hydration ends. When NDS starts first, it changes some of it: the clock writes the time, and Main Navigation sets classes. React then throws the server HTML away and renders it again, without what NDS wrote. When React renders `<html>` too, as the Next.js App Router does, it also removes `data-nds-loaded`, the mark that shows the page, so the page stays hidden. Which one starts first can change from one load to the next: Next.js loads its own scripts with `async`.

Write `data-nds-auto-init="false"` on `<html>`. Once hydration ends, remove that attribute and call `window.NDS?.init.initialize()`: in React from an effect in the root component, in Vue from `onMounted` in the root component. When NDS has not loaded yet, the `?.` skips the call, and NDS starts when it loads, because the attribute is gone.

When the framework renders `<html>` too, as the Next.js App Router does, put `suppressHydrationWarning` on `<html>`. The head inline script writes the saved theme to its `data-theme` before hydration, and React reports that in development. React 18 also reports the `data-nds-defer` that the script removes from each preload link, so put the same prop on those links.

### Classes
{: .nds-block-title}

NDS adds classes to some elements, such as `nds-dropmenu` on a picker's field and `nds-external` on a link. When a class binding changes, React's `className`, Vue's `class` and a Svelte `class` attribute that holds an expression write the whole attribute again and remove those classes. Svelte's `class:name` directive and Angular's `[class]` and `[class.name]` bindings change one class at a time and keep them. On an element that NDS writes to, keep the bound classes fixed, use a binding that changes one class, or put the changing class on a wrapper. The same holds for an attribute that NDS writes, such as `data-state` or `hidden`: do not bind it.

### Field Values
{: .nds-block-title}

An NDS field fires the native `input` and `change` events each time it writes a value, so a two-way binding that listens for them sees the user's pick. Vue's `v-model`, Angular's `ngModel` and Svelte's `bind:value` are examples. Bind the input that holds the value: for Custom Select that is `.nds-select-value`, because its visible field holds the option's text. Tag Input, Multiselect and Rating have no single value field, so read their value from their event.

A controlled React field sees each value that NDS writes, a checkbox and a switch too: its `onChange` runs, so keep the value in state there. Write your own values with `NDS.setValue(el, value)` for the same result.

React 19 resets a `<form>` after its form action succeeds. The NDS fields in it go back to their starting values with it, as on any form reset.

### Events
{: .nds-block-title}

Listen for NDS events with `addEventListener`, through a ref, on the element that the component's API table names. Template event syntax cannot always name them, because their names hold colons, such as `nds:custom-select:change`. React has no prop for them, and Angular reads the part before the first colon as a target, as in `(window:resize)`.

### Content Security Policy
{: .nds-block-title}

Keep the `<style>` gate and the inline script out of your bundler. A minifier changes their bytes, so a CSP hash no longer matches (see [Content Security Policy](../ui-shell/head#csp)).

</div>
  </div>
</section>

<section id="init-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-hourglass"></i>
            <span class="nds-label">Startup Promise</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-js">NDS.init.ready</code> resolves once the last component on the page has started, the ones from late bundles included. A bundle that fails to load does not hold it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-refresh"></i>
            <span class="nds-label">One Call, One Argument</span>
          </span>
          <p class="nds-item-desc">The same call covers a table, a card grid or any list. You do not track which component wants the content element and which wants an id.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-hierarchy-square-01"></i>
            <span class="nds-label">Driven by the Registry</span>
          </span>
          <p class="nds-item-desc">A component runs because it is registered, not because you listed it. A component you add to the page later is covered with no change to your code.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-target-02"></i>
            <span class="nds-label">Picked by the Container</span>
          </span>
          <p class="nds-item-desc">Only the components with an element in the container run, plus the ones that drive it from outside. Each one that runs scans the whole page, as its own <code class="nds-inline-code lang-js">init()</code> does.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cloud"></i>
            <span class="nds-label">Safe for Server-Driven Lists</span>
          </span>
          <p class="nds-item-desc">The calls never sort, page or filter rows your server sent, and never send a request. Server pagination and filters that submit a form stay as they arrived.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-package"></i>
            <span class="nds-label">Refresh Loads No Bundles</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-js">refresh()</code> skips a component whose bundle has not loaded. That bundle scans the page when it arrives. Only <code class="nds-inline-code lang-js">mount()</code> loads bundles.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-repeat"></i>
            <span class="nds-label">Safe to Call Twice</span>
          </span>
          <p class="nds-item-desc">A second call on settled content leaves the page as it was. A client-side filter in the container fires <code class="nds-inline-code lang-js">nds:filter:change</code> again on each call.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="init-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Call `refresh()` once after the page settles, not once per row. A bulk insert of 50 rows needs one call at the end.
- Call it after your response is written into the page, not when the request resolves. It reads the page, so the rows must be in place.
- Pass the container whose children changed, such as the `<tbody>` or the grid wrapper. A distant ancestor holds more components, so more of them run.
- Use it instead of one component's `reinit()` when a list changed. A component you forget gives no warning.
- Use it instead of `NDS.init.initialize()`, which starts every component on the page again. Use `initialize()` only when you replaced the whole page body.
- Skip it for content that was in the HTML at load, and after a filter, sort or page change. NDS already keeps those in step.
- Do not call it from a handler for an event it can fire, such as `nds:filter:change`. That starts a loop.
- To sort late rows into a client-side sort, call `NDS.Sort.getInstance(table).refresh()` yourself. `refresh()` never sorts, because a server-sorted page is one slice of a larger sort.
- For server pagination, call `NDS.Pagination.setTotalPages()` and `NDS.Pagination.setRecords()` when your response arrives.
- To replay a finished counter, remove its `data-animated` attribute before the call.
- Fetch the data, build the rows and show the loading state yourself: the calls do none of them. A component you set up through its own API keeps that setup.

</div>
  </div>
</section>

<section id="init-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Effect by Component
{: .nds-block-title}

| Component | Effect of `refresh()` |
|---|---|
| Any component with an element in the container | Wires the new elements: dropmenus, numbers, form controls, copy buttons, tooltips and the rest |
| [Filter](../components/filter) | Starts a filter whose region is new, and finds the new items, so they can be filtered. Builds the options of an auto filter again, so a new value can be picked. Skips a filter that submits a form, with or without `data-ajax` |
| [Selection](../components/selection) | Counts the selected and total items again |
| [Main Nav](../ui-shell/main-nav) | Runs its `reinit()` |
| [Pagination](../components/pagination) | Nothing. An auto pagination pages again on its own when items are added or removed, and keeps the current page. A server pagination keeps its page count and record numbers |
| [Empty](../components/empty) | Nothing. It watches its own container and shows or hides itself |
| [Sort](../components/sort) | Nothing. It never sorts again on its own |
{: .nds-table .nds-responsive}

### Instance Lookup
{: .nds-block-title}

A component stores its instance on the element it starts, as an `nds{Name}` property: `el.ndsAccordion`, `el.ndsChart`, `el.ndsSort`. `destroy()` releases each one it finds there, and calls `NDS.{Name}.destroy(el)` for the components that keep no such property. Filter, Sort and Upload also have `getInstance(el)`, and Filter has `getByTarget(id)` and `whenReady(el, callback)`.

Most components load after the page shows, so the property is missing until the component starts. Code that runs at load waits for `NDS.init.ready`:

<script type="text/html" id="init-ready-js" data-canon data-lang="js">
NDS.init.ready.then(function () {
  document.querySelector('#service-tabs').ndsTabs.goTo(2);
});
</script>

`NDS` exists only after `nds-main.min.js` runs, and it loads with `defer`. Run this code from a `defer` script placed after `nds-main.min.js`, or inside a `DOMContentLoaded` listener. A plain inline `<script>` runs first and fails with `NDS is not defined`. Markup you add later waits for `mount(el)` instead.

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-nds-auto-init="false"` | `<html>` | No component starts at load. Call `NDS.init.initialize()` yourself, or remove the attribute before NDS loads. `NDS.init.ready` waits for the start |
| `data-nds-disable-all="true"` | `<html>` | `initialize()` starts no component. Call each one's `init()` yourself |
| `data-nds-loaded` | `<html>` | The loader sets it once the main CSS has applied and the first components started. Do not set it yourself |
{: .nds-table .nds-responsive}

### Configuration
{: .nds-block-title}

Set these on `window` before the main bundle loads. A `window.NDS_INIT_CONFIG` key wins over the matching attribute on `<html>`.

| Global | Default | Effect |
|---|---|---|
| `NDS_INIT_CONFIG.autoInitialize` | `true` | `false` is the same as `data-nds-auto-init="false"` |
| `NDS_INIT_CONFIG.disableAll` | `false` | `true` is the same as `data-nds-disable-all="true"` |
| `NDS_INIT_CONFIG.enableLogging` | `false` | Logs each component as it starts, and runs `NDS.init.audit()` after load |
| `NDS_INIT_CONFIG.enableTiming` | `false` | Logs the total init time. With `enableLogging`, it also logs the time of each component |
| `NDS_INIT_CONFIG.initBudgetMs` | `5` | Milliseconds of init work before the loader yields to the browser |
| `NDS_ASSETS_PATH` | the folder above the one that holds `nds-main.min.js` | The `assets/` folder. The other bundles load from its `js/` folder, and the language files from its `i18n/` folder |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.init.initialize()` | Starts every component on the page. The loader calls it at load |
| `NDS.init.ready` | A promise. It resolves once every component that was on the page at load has started, including the ones from bundles that load later |
| `NDS.init.refresh(el)` | Tells every started component that the contents of `el` changed. Without `el`, it covers the whole page |
| `NDS.init.mount(el)` | Loads the bundles the markup in `el` needs, then calls `refresh(el)`. Returns a promise |
| `NDS.init.destroy(el)` | Releases every component instance inside `el`. Returns the number released. Without `el`, it covers the whole page |
| `NDS.init.isPending(el)` | `true` while `el` holds a field whose rule has not started: its bundle is still loading, or its component has not built it yet. See [Fields Still Loading](#fields-still-loading) |
| `NDS.init.isOwned(el)` | `true` when `el` is a field whose value its component keeps, not its input (Upload). Such a field gets no `required` on its input and no browser check |
| `NDS.init.audit()` | Runs the [Audit](../core/audit) and returns its findings: page problems that fail with no error, and names an NDS release changed. The first call loads the audit bundle and returns a promise of them |
| `NDS.init.components` | The component registry: one entry per component, with its `name`, `selector` and `init`. A field component's entry adds `rule` (`true`: `isPending()` waits for its instance, `'loaded'`: for its bundle only) and `owns` (`isOwned()` answers for it) |
| `NDS.init.config` | The settings in use, from the Configuration table |
| `NDS.loadBundle(name)` | Loads one bundle, such as `'extras'`. Returns a promise. `mount()` calls it for you |
{: .nds-table .nds-responsive}

<script type="text/html" id="init-api-js" data-canon data-lang="js">
// A modal edits a row: save, swap in the new row, then refresh
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { data } = await NDS.request(form.action, { method: 'POST', body: new FormData(form) });
  NDS.init.destroy(row);
  row.outerHTML = data;
  NDS.init.refresh(tbody);
});
</script>

The full API is in the banner of `_js/nds-loader.js`.

</div>
  </div>
</section>

<section id="init-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Manage Records](../examples/manage-records): a table whose rows are added, edited and deleted in modals.
- [Filter](../components/filter): new rows join the filter on `refresh()`.
- [Selection](../components/selection): the counts follow the rows on `refresh()`.

</div>
  </div>
</section>
