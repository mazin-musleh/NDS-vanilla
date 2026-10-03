---
layout: page
title: Refresh
hero_title: Refresh - National Design System
hero_description: Calls that tell NDS components a container changed after page load, so they wire new markup and release markup you remove
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.7.0"
updated: "1.12.x"
last_edit: "04/10/2026 - 12:09 AM"
---

<section id="refreshOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

`NDS.Init` starts every component at page load. Three of its calls keep components in step with content that changes later. `refresh(el)` tells them the contents of `el` changed. `mount(el)` tells them `el` is new markup. `destroy(el)` tells them `el` is about to go away. They are in the main bundle, so every page has them, with no init call.

A page whose content never changes after load needs none of them.

Pick another component when:

- you need to load the data from a server: [Request](../core/request)

</div>
  </div>
</section>

<section id="refreshMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Add, edit or remove rows, then make one call on the container.

<script type="text/html" id="refresh-rows" data-canon data-lang="js">
const tbody = document.getElementById('requestsTableBody');

// Change the rows the way your app does it
tbody.appendChild(buildRow(record));

// Then tell NDS the contents changed
NDS.Init.refresh(tbody);
</script>

Mount markup you fetched or built.

<script type="text/html" id="refresh-mount" data-canon data-lang="js">
const grid = document.getElementById('servicesGrid');
const { data } = await NDS.request('/api/services.html');
grid.innerHTML = data;
await NDS.Init.mount(grid);
</script>

Destroy a row before you remove it.

<script type="text/html" id="refresh-destroy" data-canon data-lang="js">
NDS.Init.destroy(row);
row.remove();
// The filter and the counts follow the rows that are left
NDS.Init.refresh(tbody);
</script>

</div>
  </div>
</section>

<section id="refreshBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Refresh
{: .nds-block-title}

`refresh(el)` checks every registered component. A component with an element in `el` runs its `init()` again, which wires the new elements and skips the ones it already started. Filter, Selection and Main Nav drive a container from outside it, so they run their own refresh instead. Use it when the markup holds only components the page already had at load.

### Mount
{: .nds-block-title}

`mount(el)` finds the components in `el`, loads the bundles they need, then calls `refresh(el)`. It returns a promise. Use it for markup built or fetched after load that may hold a component the page did not have. When every bundle is already loaded, `mount()` does the same as `refresh()`.

### Destroy
{: .nds-block-title}

`destroy(el)` releases every component instance inside `el`, in page order, and returns how many it released. Each component removes its listeners and its init marker, so `refresh()` or `mount()` can start the same markup again later. `refresh()` releases nothing: without `destroy()`, each removed view leaves its listeners and observers running.

Some parts reach outside `el`. A FAB docks on `<body>`, a dropmenu with `data-portal` moves its open menu there, and an open modal holds a backdrop and a scroll lock. `destroy()` puts each one back or releases it, so nothing stays on the page after the view.

Only components inside `el` are reached. A filter toolbar can sit beside the grid it drives, so pass the root of the view you remove, not the list inside it.

### Framework Views
{: .nds-block-title}

Call `window.NDS?.Init.mount(view)` after a view mounts, and `window.NDS?.Init.destroy(view)` before it unmounts. Do not write a ready check, a poll or a retry for these calls. A view that mounts before NDS loads is found by NDS's own startup scan, and the `?.` skips each call while `NDS` does not exist yet.

</div>
  </div>
</section>

<section id="refreshFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
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
            <span class="nds-label">Loads No Bundles</span>
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

<section id="refreshPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Call `refresh()` once after the page settles, not once per row. A bulk insert of 50 rows needs one call at the end.
- Call it after your response is written into the page, not when the request resolves. It reads the page, so the rows must be in place.
- Pass the container whose children changed, such as the `<tbody>` or the grid wrapper. A distant ancestor holds more components, so more of them run.
- Use it instead of one component's `reinit()` when a list changed. A component you forget gives no warning.
- Use it instead of `NDS.Init.initialize()`, which starts every component on the page again. Use `initialize()` only when you replaced the whole page body.
- Skip it for content that was in the HTML at load, and after a filter, sort or page change. NDS already keeps those in step.
- Do not call it from a handler for an event it can fire, such as `nds:filter:change`. That starts a loop.
- To sort late rows into a client-side sort, call `NDS.Sort.getInstance(table).refresh()` yourself. `refresh()` never sorts, because a server-sorted page is one slice of a larger sort.
- For server pagination, call `NDS.Pagination.setTotalPages()` and `NDS.Pagination.updateRecords()` when your response arrives.
- To replay a finished counter, remove its `data-animated` attribute before the call.
- Fetch the data, build the rows and show the loading state yourself: the calls do none of them. A component you set up through its own API keeps that setup.

</div>
  </div>
</section>

<section id="refreshApi" class="nds-content-section nds-doc-api">
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
| [Main Nav](../ui-shell/mainnav) | Runs its `reinit()` |
| [Pagination](../components/pagination) | Nothing. An auto pagination pages again on its own when items are added or removed, and keeps the current page. A server pagination keeps its page count and record numbers |
| [Empty](../components/empty) | Nothing. It watches its own container and shows or hides itself |
| [Sort](../components/sort) | Nothing. It never sorts again on its own |
{: .nds-table .nds-responsive}

### Instance Lookup
{: .nds-block-title}

A component stores its instance on the element it starts, as an `nds{Name}` property: `el.ndsAccordion`, `el.ndsChart`, `el.ndsSort`. `destroy()` reads the same property to find what to release. Filter, Sort and Upload also have `getInstance(el)`, and Filter has `getByTarget(id)` and `whenReady(el, callback)`.

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-nds-auto-init="false"` | `<html>` | No component starts at load. Call `NDS.Init.initialize()` yourself |
| `data-nds-disable-all="true"` | `<html>` | `initialize()` starts no component. Call each one's `init()` yourself |
| `data-nds-loaded` | `<html>` | The loader sets it once the main CSS has applied and the first components started. Do not set it yourself |
{: .nds-table .nds-responsive}

### Configuration
{: .nds-block-title}

Set these on `window` before the main bundle loads. A `window.NDSInitConfig` key wins over the matching attribute on `<html>`.

| Global | Default | Effect |
|---|---|---|
| `NDSInitConfig.autoInitialize` | `true` | `false` is the same as `data-nds-auto-init="false"` |
| `NDSInitConfig.disableAll` | `false` | `true` is the same as `data-nds-disable-all="true"` |
| `NDSInitConfig.enableLogging` | `false` | Logs each component as it starts, and runs `NDS.Init.audit()` after load |
| `NDSInitConfig.enableTiming` | `false` | Logs the total init time. With `enableLogging`, it also logs the time of each component |
| `NDSInitConfig.initBudgetMs` | `5` | Milliseconds of init work before the loader yields to the browser |
| `NDSAssetBase` | the folder of `nds-main.min.js` | The folder the other bundles load from, when the loader cannot find the main script |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Init.refresh(el)` | Tells every started component that the contents of `el` changed. Without `el`, it covers the whole page |
| `NDS.Init.mount(el)` | Loads the bundles the markup in `el` needs, then calls `refresh(el)`. Returns a promise |
| `NDS.Init.destroy(el)` | Releases every component instance inside `el`. Returns the number released. Without `el`, it covers the whole page |
| `NDS.Init.initialize()` | Starts every component on the page. The loader calls it at load |
| `NDS.Init.audit()` | Logs page problems that fail with no error, such as an icon with no registration or a filter nothing started. The first call loads the audit bundle and returns a promise |
| `NDS.Init.components` | The component registry: one entry per component, with its `name`, `selector` and `init` |
| `NDS.Init.config` | The settings in use, from the Configuration table |
| `NDS.loadBundle(name)` | Loads one bundle, such as `'extras'`. Returns a promise. `mount()` calls it for you |
{: .nds-table .nds-responsive}

<script type="text/html" id="refresh-api-js" data-canon data-lang="js">
// A modal edits a row: save, swap in the new row, then refresh
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { data } = await NDS.request(form.action, { method: 'POST', body: new FormData(form) });
  NDS.Init.destroy(row);
  row.outerHTML = data;
  NDS.Init.refresh(tbody);
});
</script>

The full API is in the banner of `_js/nds-loader.js`.

</div>
  </div>
</section>

<section id="refreshRelated" class="nds-content-section nds-doc-related">
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
