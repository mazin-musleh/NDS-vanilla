---
layout: page
title: Pagination
hero_title: Pagination - National Design System
hero_description: Pagination splits a long list into pages, with numbered buttons to move between them.
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "27/10/2026 - 11:40 PM"
---

<section id="pagination-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Pagination is a `nds-pagination` nav that holds a list (`nds-pagination-list`) of items (`nds-pagination-item`): a Previous button, one button per page, and a Next button. It comes in three kinds. In a written nav, you write the page buttons. In a data-driven nav, the script builds them from a page count. In a content nav, the script pages items that are already in the HTML: `nds-page-item` elements in a `nds-paged-content` container.

Pick another component when:

- the list grows as the user scrolls and has no fixed count: [Scroll More](../components/scroll-more)
- the user must go through the pages in order, as in a form: [Stepper](../components/stepper)
- the pages are views of one record: [Tabs](../components/tabs)

</div>
  </div>
</section>

<section id="pagination-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="pg-data" data-canon data-variants="pagination-variants-table">
<nav class="nds-pagination" data-total-pages="12" aria-label="Pagination" data-i18n-aria-label="pagination.pagination"></nav>
</script>
<script type="text/html" id="pg-buttons" data-canon>
<nav class="nds-pagination" aria-label="Pagination" data-i18n-aria-label="pagination.pagination">
  <ul class="nds-pagination-list">
    <li class="nds-pagination-item nds-pagination-prev">
      <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Previous page" disabled>
        <i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"></i>
      </button>
    </li>
    <li class="nds-pagination-item">
      <button type="button" class="nds-btn nds-subtle nds-indicator" aria-current="page" aria-label="Page 1">
        <span class="nds-label">1</span>
      </button>
    </li>
    <li class="nds-pagination-item">
      <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 2">
        <span class="nds-label">2</span>
      </button>
    </li>
    <li class="nds-pagination-item">
      <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 3">
        <span class="nds-label">3</span>
      </button>
    </li>
    <li class="nds-pagination-item">
      <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 4">
        <span class="nds-label">4</span>
      </button>
    </li>
    <li class="nds-pagination-item">
      <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 5">
        <span class="nds-label">5</span>
      </button>
    </li>
    <li class="nds-pagination-item nds-pagination-next">
      <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Next page">
        <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
      </button>
    </li>
  </ul>
</nav>
</script>
<script type="text/html" id="pg-links" data-canon>
<nav class="nds-pagination" aria-label="Pagination" data-i18n-aria-label="pagination.pagination">
  <ul class="nds-pagination-list">
    <li class="nds-pagination-item nds-pagination-prev">
      <a class="nds-btn nds-subtle nds-icon-only" role="link" aria-label="Previous page" aria-disabled="true">
        <i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"></i>
      </a>
    </li>
    <li class="nds-pagination-item">
      <a href="?page=1" class="nds-btn nds-subtle nds-indicator" aria-current="page" aria-label="Page 1">
        <span class="nds-label">1</span>
      </a>
    </li>
    <li class="nds-pagination-item">
      <a href="?page=2" class="nds-btn nds-subtle nds-indicator" aria-label="Page 2">
        <span class="nds-label">2</span>
      </a>
    </li>
    <li class="nds-pagination-item">
      <a href="?page=3" class="nds-btn nds-subtle nds-indicator" aria-label="Page 3">
        <span class="nds-label">3</span>
      </a>
    </li>
    <li class="nds-pagination-item nds-pagination-next">
      <a href="?page=2" class="nds-btn nds-subtle nds-icon-only" aria-label="Next page">
        <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</nav>
</script>
<script type="text/html" id="pg-grid" data-canon>
<div id="pg-cards" class="nds-grid nds-paged-content" style="--per-page: 3; --max-col: 3; --mid-col: 3; --min-col: 1;">
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Passport renewal</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">National ID renewal</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Driver's license renewal</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Vehicle registration</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Exit and re-entry visa</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Birth certificate</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Commercial registration</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Building permit</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Traffic fine payment</span>
      </div>
    </div>
  </div>
</div>
<nav class="nds-pagination" data-auto-pagination="pg-cards" aria-label="Services pagination"></nav>
</script>
<script type="text/html" id="pg-table" data-canon>
<table class="nds-table">
  <thead>
    <tr>
      <th>Request</th>
      <th>Service</th>
      <th data-align="center">Status</th>
    </tr>
  </thead>
  <tbody id="pg-rows" class="nds-paged-content" style="--per-page: 5;">
    <tr class="nds-page-item"><td>20481</td><td>Passport renewal</td><td>Approved</td></tr>
    <tr class="nds-page-item"><td>20482</td><td>National ID renewal</td><td>In review</td></tr>
    <tr class="nds-page-item"><td>20483</td><td>Vehicle registration</td><td>Approved</td></tr>
    <tr class="nds-page-item"><td>20484</td><td>Building permit</td><td>Returned</td></tr>
    <tr class="nds-page-item"><td>20485</td><td>Birth certificate</td><td>Approved</td></tr>
    <tr class="nds-page-item"><td>20486</td><td>Exit and re-entry visa</td><td>In review</td></tr>
    <tr class="nds-page-item"><td>20487</td><td>Commercial registration</td><td>Approved</td></tr>
    <tr class="nds-page-item"><td>20488</td><td>Traffic fine payment</td><td>Approved</td></tr>
    <tr class="nds-page-item"><td>20489</td><td>Driver's license renewal</td><td>In review</td></tr>
    <tr class="nds-page-item"><td>20490</td><td>Passport renewal</td><td>Returned</td></tr>
    <tr class="nds-page-item"><td>20491</td><td>Building permit</td><td>Approved</td></tr>
    <tr class="nds-page-item"><td>20492</td><td>Vehicle registration</td><td>In review</td></tr>
  </tbody>
</table>
<nav class="nds-pagination" data-auto-pagination="pg-rows" aria-label="Requests pagination"></nav>
</script>
<script type="text/html" id="pg-toolbar" data-canon>
<div class="nds-toolbar">
  <div class="nds-toolbar-start">
    <span class="nds-toolbar-text" data-paged-target="pg-results">
      Showing <b data-paged-from>1</b>–<b data-paged-to>3</b> of <b data-paged-count>9</b> services
    </span>
  </div>
  <div class="nds-toolbar-end">
    <span class="nds-toolbar-text">Per page</span>
    <div class="nds-dropmenu" data-select-name="perPage" data-select-value="3" data-per-page-target="pg-results">
      <button type="button" class="nds-btn nds-secondary-outline nds-md nds-menu-btn nds-dropmenu-trigger" aria-label="Services per page">
        <span class="nds-label">3</span>
      </button>
      <div class="nds-dropmenu-menu nds-center" hidden>
        <div class="nds-dropmenu-scroll">
          <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="3">
            <span class="nds-label">3</span>
          </button>
          <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="6">
            <span class="nds-label">6</span>
          </button>
          <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-value="9">
            <span class="nds-label">9</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
<div id="pg-results" class="nds-grid nds-paged-content" style="--per-page: 3; --max-col: 3; --mid-col: 3; --min-col: 1;">
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Passport renewal</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">National ID renewal</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Driver's license renewal</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Vehicle registration</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Exit and re-entry visa</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Birth certificate</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Commercial registration</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Building permit</span>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-page-item">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Traffic fine payment</span>
      </div>
    </div>
  </div>
</div>
<nav class="nds-pagination" data-auto-pagination="pg-results" aria-label="Services pagination"></nav>
</script>
    </div>
  </div>
</section>

<section id="pagination-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every option goes on the `nds-pagination` nav. Pages and Page links need `data-total-pages`, so they do not fit Buttons or Links. The 2000 choice sets two attributes: write both.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Data-driven (default) | — | — | An empty nav with a page count. The script builds the buttons, and your script loads the page's items on `nds:pagination:change`. For results from a server, where you know the count |
| Structure | Buttons (hint: You write one button per page) | canon `#pg-buttons` | — | A short, fixed set of pages that you write as buttons. More than 5 written pages fold into a menu only when the script starts, so the nav changes width once. For a longer range, use Data-driven |
| Structure | Links | canon `#pg-links` | — | Each page is its own URL. The server marks the current page with `aria-current="page"`. It works with no JavaScript |
| Structure | Card grid | canon `#pg-grid` | — | The script shows one page of the items that are already in the HTML. `--per-page` sets the page size |
| Structure | Table | canon `#pg-table` | — | The same for table rows. `nds-paged-content` goes on the `<tbody>`, and `nds-page-item` on each `<tr>` |
| Structure | Grid with toolbar | canon `#pg-toolbar` | — | A card grid with a records counter and a per-page picker above it |
| Size | LG (default) | — | — | 40px buttons. It needs no class |
| Size | MD | `.nds-md` | `.nds-pagination` | 32px buttons |
| Size | SM | `.nds-sm` | `.nds-pagination` | 24px buttons, for a dense screen |
| Pages | 12 (default) | `[data-total-pages="12"]` | `.nds-pagination[data-total-pages]` | The page count. The script builds the buttons from it |
| Pages | 2000 (hint: 2000 pages, with page 1000 open) | `[data-total-pages="2000"]` | `.nds-pagination[data-total-pages]` | A large count, with page 1000 current. The menu of hidden pages gets a jump box |
| Pages | 2000 (hint: 2000 pages, with page 1000 open) | `[data-active-page="1000"]` | `.nds-pagination[data-total-pages]` | Sets the current page to 1000. It is the same choice as the row above: write both attributes |
| Page links | Page links (hint: Links in place of buttons, one URL per page) | `[data-page-url="?page={page}"]` | `.nds-pagination[data-total-pages]` | The script builds `<a href>` links in place of buttons, for a server that renders each page. `{page}` becomes the page number |
| URL sync | URL sync (hint: Keeps the page number in the address) | `[data-page-param]` | `.nds-pagination` | Keeps the current page in the address as `?page=N`, so a reload or a shared link opens the same page |
| No scroll | No scroll (hint: A page change does not scroll back to the content) | `[data-pagination-no-scroll]` | `.nds-pagination` | A page change does not scroll back to the content. Your script calls `NDS.Pagination.scrollToContent()` when it wants the scroll |
{: #pagination-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="pagination-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Written Pages
{: .nds-block-title}

You write one button or link per page, and mark the current page with `aria-current="page"`. The script moves the highlight on each click, turns off Previous on the first page and Next on the last, and fires `nds:pagination:change`. Your script loads the page's items. With `<a href>` links, the browser opens the page's URL and the server marks the new current page.

### Data-Driven Pages
{: .nds-block-title}

`data-total-pages` on an empty nav makes the script build the buttons. A count of 0 or 1 builds no buttons, and the nav hides. `data-active-page` sets the current page at load. The default is 1. The script updates `data-active-page` on each page change. Read it to know the current page, such as for the first request after a reload on `?page=7`. When a new search changes the count, call `NDS.Pagination.setTotalPages()` to build the nav again. `data-page-url` makes the script build links in place of buttons, for a server that renders each page.

The script moves the current page before your items load. When the user clicks again before the items arrive, cancel the older request. When a request fails, call `setPage(nav, e.detail.previousPage)` to go back. The sample in API does both.

### Content Pages
{: .nds-block-title}

`data-auto-pagination` on the nav names the `id` of a `nds-paged-content` container. The script shows one page of its `nds-page-item` elements and hides the others. `--per-page` on the container sets the page size. When the items fit on one page, the nav hides. Without a value, `data-auto-pagination` uses the `nds-paged-content` element right before the nav.

### Large Page Counts
{: .nds-block-title}

On a nav the script builds, the menu of hidden pages opens on the current page. It builds only the rows near the scroll position, so its size stays the same for any page count. A menu of more than 30 pages gets a jump box: the user types a page number and presses Enter.

### Per-Page Picker
{: .nds-block-title}

The per-page picker is a [Dropmenu](../components/dropmenu) picker (`data-select-name`). `data-per-page-target` names the `id` of the container, and each item's `data-value` becomes its `--per-page`. A new size goes back to page 1. When a server sends the items, leave out `data-per-page-target`, listen for `nds:dropmenu:select`, and load the page with its `detail.value` yourself. Then call `setTotalPages()` and `setRecords()` with the server's numbers.

`data-per-page-param` on the picker keeps the page size in the address as `?per-page=9`. A reload or a shared link then opens the same size. At load, the script reads the size before the list shows, and sets the picker to it. A size that is not in the menu is ignored. When the user picks a size, the script writes it to the address. When the user picks the default size, the `data-select-value` you wrote, the script removes it. The script keeps that size in `data-per-page-default`. A server that already applied `?per-page=` to `data-select-value` writes `data-per-page-default` itself, with the size it uses when the address has no size. To use a name other than `per-page`, give the attribute a value, as with `data-page-param`. When a server sends the items, read the picker's `data-select-value` for the first request.

### Records Counter
{: .nds-block-title}

An element with `data-paged-target` shows the range and the count of the container with that `id`. The script writes the numbers into its `data-paged-from`, `data-paged-to` and `data-paged-count` slots, with thousand separators. The sentence around the slots is yours, in your language. When a server sends the items, call `NDS.Pagination.setRecords()` with your own numbers.

### URL Sync
{: .nds-block-title}

`data-page-param` keeps the current page in the address, next to the Filter and Sort parameters. The script reads it once at load and goes to that page, with no event and no scroll. On page 1, the script removes it. The address changes with no new Back-button step. When two navs share a page, give each its own name: `data-page-param="orders-page"`. The page size has its own parameter on the per-page picker, `data-per-page-param`, and the two work together: `?per-page=9&page=2` opens the second page of 9.

### Scroll to Content
{: .nds-block-title}

After a page change, the script scrolls the content back into view when its top is above the main navigation. `data-pagination-no-scroll` turns this off. Your script then calls `NDS.Pagination.scrollToContent()` when it wants the scroll, such as after the server's items load, and not after an error.

</div>
  </div>
</section>

<section id="pagination-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-feature-list nds-grid nds-divided-rows nds-icons-subtle">
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-plug-socket" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Auto-initialization</span>
              <p class="nds-card-description">Every <code class="nds-inline-code lang-html">.nds-pagination</code> starts by itself. The script sets the current page and turns off Previous or Next at the ends.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-more-horizontal" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Ellipsis Collapse</span>
              <p class="nds-card-description">More than 5 pages fold into a menu: pages 1 to 3 and the last page stay in view. Add or remove a page button and the nav folds or unfolds again. Your attributes and links stay on the buttons.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-refresh" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Live Content Updates</span>
              <p class="nds-card-description">Add or remove <code class="nds-inline-code lang-html">.nds-page-item</code> elements, and the script counts the pages again and keeps the current page. It works at any depth, table rows too.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-filter" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Filter Support</span>
              <p class="nds-card-description">Items that <a href="../components/filter">Filter</a> hides are left out of the pages and the count. A new filter goes back to page 1.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-layers-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Loading Placeholder</span>
              <p class="nds-card-description">Until the script starts, a data-driven or content nav holds its height with a placeholder row, and the content shows only its first page. The content below does not move when the pages appear.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-mobile-programming-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Responsive Adaptation</span>
              <p class="nds-card-description">A <code class="nds-inline-code lang-css">--per-page</code> that changes in a media query splits the pages again on resize. On screens under 361px, the buttons drop to 32px so the nav fits.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-shield-user" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Accessibility</span>
              <p class="nds-card-description">The script sets <code class="nds-inline-code lang-html">aria-current="page"</code> on the current page. Buttons it builds get labels in Arabic or English, from the page language. When a page or a filter changes the records counter, a screen reader hears the counter line. A page opened from <code class="nds-inline-code lang-html">?page=</code> is not announced.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-api" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Programmatic Control</span>
              <p class="nds-card-description">Go to a page, change the page count, update the counter, or count the pages again from a script, through <code class="nds-inline-code lang-js">NDS.Pagination</code>.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="pagination-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Pick the structure by where the items are. Items already on the page: Card grid or Table. Items from a server: Data-driven, or Buttons for a few fixed pages. One URL per page: Links, or Data-driven with Page links.
- Set `--per-page` in the container's `style`, or in a class when a strict CSP blocks `style` attributes. Both page the list before it shows, so nothing jumps.
- Match `--per-page` to the column count, so each page fills its rows.
- Put `nds-paged-content` on the `<tbody>`, not on a wrapper around the table. A wrapper stays hidden until the script starts, but a `<tbody>` shows placeholder rows.
- Do not mix up `nds-page-item` and `nds-pagination-item`. The first marks your content, the second a control in the nav.
- Listen for `nds:pagination:change` on the nav, not on a page button. The script builds the buttons of a data-driven or content nav again when the page count changes, and builds the menu rows each time the menu opens. A listener on one of them is lost.
- Give every nav an `aria-label`. When the HTML holds more than one nav, name what each one pages, such as "Requests pagination".
- Write the records line in the page's language, with your own noun, such as «عرض 1–3 من 9 خدمات». The script fills in only the numbers.
- Do not write a nav for a single page.
- When a server returns no records, put `nds-empty` on the content container. [Empty](../components/empty) fills it with a message.

</div>
  </div>
</section>

<section id="pagination-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-paged-content` | the container of the items | Marks the content that a nav pages. On a table, the `<tbody>` |
| `nds-page-item` | each item in `.nds-paged-content` | Marks one item to page: a card, a row, a list item |
| `nds-pagination-ellipsis` | `li` in the list | The item that holds the menu of hidden pages. The script builds it |
| `nds-pagination-menu` | the menu in `.nds-pagination-ellipsis` | The menu of hidden pages. Style it by this class: the menu can move to `<body>` |
| `nds-pagination-jump` | the field at the top of the menu | The jump box of a menu with more than 30 pages. The script builds it |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-auto-pagination` | `.nds-pagination` | Pages the `.nds-paged-content` with this `id`. With no value, it pages the `.nds-paged-content` right before the nav |
| `data-total-pages` | an empty `.nds-pagination` | The script builds this many pages. Change it later with `setTotalPages()` |
| `data-active-page` | `.nds-pagination[data-total-pages]` | The current page at load. The default is 1. The script keeps it current on each page change |
| `data-page-url` | `.nds-pagination[data-total-pages]` | A URL with `{page}` in it. The script builds links to it in place of buttons |
| `data-page-param` | `.nds-pagination` | Keeps the current page in the address. The name is `page` by default. A value sets another name |
| `data-pagination-no-scroll` | `.nds-pagination` | A page change does not scroll to the content |
| `data-per-page-target` | a picker `.nds-dropmenu` | The `id` of the `.nds-paged-content` whose page size the picker sets |
| `data-per-page-param` | a picker `.nds-dropmenu` | Keeps the page size in the address. The name is `per-page` by default. A value sets another name |
| `data-per-page-default` | a picker `.nds-dropmenu` | The size that removes the parameter. The script writes it from `data-select-value` at load. Write it yourself when the server already applied the parameter |
| `data-paged-target` | any element | The `id` of the `.nds-paged-content` whose range and count it shows |
| `data-paged-from`, `data-paged-to`, `data-paged-count` | in `[data-paged-target]` | The slots the script writes: the first item shown, the last item shown, and the item count |
| `aria-current="page"` | a page button or link | The current page at load. The script moves it on each change, and adds `data-state="active"` |
| `data-paged-split` | `.nds-paged-content` | The script writes it before the page shows, after it hides the items past the first page. Do not write it |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--per-page` | `6` | Items per page. Set it on `.nds-paged-content` |
| `--pagination-margin-top` | `var(--spacing-2xl)` | Space above the nav |
| `--pagination-scroll-offset` | `120px` | Space between the main navigation and the content after a page change scrolls. Set it on `.nds-pagination` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Pagination.init()` | Starts every nav that has not started yet |
| `NDS.Pagination.initAuto()` | Starts only the content navs (`data-auto-pagination`) |
| `NDS.Pagination.reinit()` | Runs `init()` and `initAuto()`. Call it after you add a new nav, such as in server HTML |
| `NDS.Pagination.create(nav)` | Starts one nav whose page buttons you wrote, and returns its instance, or the instance it already has. Returns `null` when the nav has no page buttons. A data-driven or content nav starts with `reinit()` |
| `NDS.Pagination.setPage(nav, page)` | Moves the current page and scrolls to the content, unless the nav has `data-pagination-no-scroll`. It fires no event |
| `NDS.Pagination.setTotalPages(nav, total, page)` | Builds a written or data-driven nav again with a new page count. It keeps the current page, or the last page when the count drops below it. `page` goes to that page instead. A count of 0 or 1 hides the nav. The same count does not build the nav again: it only moves the current page. It does nothing on a content nav |
| `NDS.Pagination.refresh(content, { keepPage })` | Counts the pages of a `.nds-paged-content` again and goes to page 1. `keepPage: true` stays on the current page. Added and removed items need no call |
| `NDS.Pagination.setRecords(id, { from, to, count })` | Writes your numbers into the counter slots of `[data-paged-target="id"]` |
| `NDS.Pagination.scrollToContent(nav)` | Scrolls to the content now, also on a nav with `data-pagination-no-scroll` |
| `NDS.Pagination.destroy(nav)` | Removes the nav's listeners, closes the menu of hidden pages, and marks the nav as not started, so `init()` can start it again. The items keep the page they show |
| `nav.ndsPagination.destroy()` | The same as `NDS.Pagination.destroy(nav)` |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:pagination:change` | `.nds-pagination` | `{ page, previousPage, totalPages, pagination }`, where `pagination` is the nav. Only a user's click fires it. `data-active-page` and `?page=` already hold the new page |
{: .nds-table .nds-responsive}

<script type="text/html" id="pg-js" data-canon data-lang="js">
var nav = document.querySelector('.nds-pagination');
var pending;
async function loadPage(page) {
  if (pending) pending.abort();
  pending = new AbortController();
  var res = await NDS.request('/requests?page=' + page, { json: true, signal: pending.signal });
  renderRows(res.data.rows);
  NDS.Pagination.setTotalPages(nav, res.data.totalPages);
  NDS.Pagination.setRecords('requestsList', { from: res.data.from, to: res.data.to, count: res.data.count });
}
NDS.init.ready.then(function () {
  return loadPage(nav.dataset.activePage || 1);
}).catch(showError);
nav.addEventListener('nds:pagination:change', function (e) {
  loadPage(e.detail.page).catch(function (err) {
    if (err.name !== 'AbortError') NDS.Pagination.setPage(nav, e.detail.previousPage);
  });
});
</script>

The full API is in the banner of `_js/nds-pagination.js`.

</div>
  </div>
</section>

<section id="pagination-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Manage Records](../examples/manage-records): a paged table with a per-page picker and a records counter.
- [Admin Console Demo](../examples/console-demo): a paged table and a paged card grid, both with filters.
- [Government Services](../examples/services-list): a paged card grid.
- [FAQ Template](../templates/faq-template): paged accordions, one per category.
- [Search Template](../templates/search-template): paged search results with a records counter.
- [Dropmenu](../components/dropmenu): the picker that the per-page picker is built on.

</div>
  </div>
</section>
