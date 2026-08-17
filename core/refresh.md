---
layout: page
title: Refresh
hero_title: Refresh - National Design System
hero_description: One call that tells every live NDS component the contents of a container changed. Use it after you add, remove, or replace rows, cards, or list items so filters, counters, and controls follow the new content instead of going quietly stale.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.7.0"
updated: "1.8.0"
last_edit: "17/08/2026 - 03:26 AM"
---

<!-- Overview -->
<section id="refreshOverview" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
      <p class="nds-section-description"><code class="nds-inline-code lang-js">NDS.Init.refresh()</code> ships in the main bundle and is available on every page. Pass it the container whose children changed. It walks the component registry and updates every component that has work in or around that container, so no component can be forgotten. Without it, each one needs its own call with its own argument, and every omission fails silently.</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-refresh"></i>
            <span class="nds-label">One call, one argument</span>
          </span>
          <p class="nds-item-desc">The same call covers a table, a card grid, or any list. You never have to remember which component wants the content element and which wants an id.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-hierarchy-square-01"></i>
            <span class="nds-label">Driven by the registry</span>
          </span>
          <p class="nds-item-desc">Components are updated because they are registered, not because you listed them. A page that gains a component later is covered without changing your code.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-target-02"></i>
            <span class="nds-label">Scoped to what changed</span>
          </span>
          <p class="nds-item-desc">Components with nothing in the container are left alone. Call it with no argument to sweep the whole document instead.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cloud"></i>
            <span class="nds-label">Safe for server-driven lists</span>
          </span>
          <p class="nds-item-desc">Nothing here re-sorts, re-pages, or re-filters a result set your server produced. Server pagination and AJAX filters are left exactly as they arrived.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-package"></i>
            <span class="nds-label">Loads no bundles</span>
          </span>
          <p class="nds-item-desc">A component whose bundle has not arrived is skipped rather than triggered. It has initialized nothing yet, and it reads the new content when it does load.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-repeat"></i>
            <span class="nds-label">Safe to call twice</span>
          </span>
          <p class="nds-item-desc">Calling it again on settled content leaves the page as it was, so you can call it after every mutation without tracking whether you already did. A client-side filter in scope re-announces its result with <code class="nds-inline-code lang-js">nds:filter:change</code> each time.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Example -->
<section id="refreshExample" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Example</h2>
      <p class="nds-section-description">The shape every screen that edits a list needs: change the rows, then make one call.</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Refresh after a row changes</div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided">
              <div class="nds-tab-list-container nds-scroll-more">
                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                    aria-controls="panel-refresh-basic-1" id="tab-refresh-basic-1">
                    <span class="nds-tab-label">JS</span>
                  </button>
                </nav>
                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                </button>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-refresh-basic-1"
                  aria-labelledby="tab-refresh-basic-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                      <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-js code">
const tbody = document.getElementById('requestsTableBody');

// Add, edit, or delete rows however your app does it
tbody.appendChild(buildRow(record));

// Then tell NDS the contents changed
NDS.Init.refresh(tbody);
              </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- What it updates -->
<section id="refreshScope" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">What It Updates</h2>
      <p class="nds-section-description">Components fall into two groups, and the difference matters only if you are debugging. Components that own elements <em>inside</em> the container are re-scanned, so anything new is wired. Components that drive the list from <em>outside</em> it resolve their own connection to the container and update their view.</p>
    </div>
    <div class="nds-section-body">
      <table class="nds-table nds-responsive">
        <thead><tr><th>Component</th><th>What happens</th></tr></thead>
        <tbody>
          <tr><td>Anything inside the rows</td><td>Re-scanned and wired: dropmenus, formatted numbers, form controls, copy buttons, tooltips, and every other component with an element in the new content.</td></tr>
          <tr><td><a class="nds-color" href="{{ 'components/filter' | relative_url }}">Filter</a></td><td>Re-resolves its item set so new rows are filterable, and regenerates auto-scanned options so a value that arrived at runtime becomes selectable.</td></tr>
          <tr><td><a class="nds-color" href="{{ 'components/selection' | relative_url }}">Selection</a></td><td>Recounts every widget, so the selected and total figures match the list.</td></tr>
          <tr><td><a class="nds-color" href="{{ 'components/pagination' | relative_url }}">Pagination</a></td><td>Recomputed, and your current page is kept. Auto-pagination also re-paginates itself whenever page items are added or removed, so editing a row on page 3 leaves you on page 3.</td></tr>
          <tr><td><a class="nds-color" href="{{ 'components/empty' | relative_url }}">Empty</a></td><td>Nothing to do. It watches its own container and shows or clears the placeholder on its own.</td></tr>
          <tr><td><a class="nds-color" href="{{ 'components/sort' | relative_url }}">Sort</a></td><td>Nothing, by design. See Server-Driven Lists below.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<!-- Server-driven lists -->
<section id="refreshServer" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Server-Driven Lists</h2>
      <p class="nds-section-description">When your server does the filtering, sorting, or paging, it has already decided which rows to send and in what order. This call never second-guesses that decision.</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-block nds-prose">
        <ul>
          <li><strong>Sorting is never re-applied.</strong> A server-sorted page is a slice: the server ordered the whole set and sent you one page of it. Re-sorting that slice in the browser would order it by rendered text and silently contradict the server. If you want late rows folded into a client-side sort, call <code class="nds-inline-code lang-js">NDS.Sort.getInstance(table).refresh()</code> yourself.</li>
          <li><strong>AJAX filters are skipped.</strong> A filter in AJAX mode owns its result set through its own request. Re-filtering those rows in the browser would match them against <code class="nds-inline-code lang-html">data-filter-value</code> equality, which is not what a server does with full text search or a join, so rows the server deliberately returned could disappear. It would also shrink your option list to whatever the current page happens to contain.</li>
          <li><strong>Server pagination is untouched.</strong> A nav built from <code class="nds-inline-code lang-html">data-total-pages</code> keeps its page count, its active page, and its record figures. Update those with <code class="nds-inline-code lang-js">NDS.Pagination.setTotalPages()</code> and <code class="nds-inline-code lang-js">NDS.Pagination.updateRecords()</code> when your response arrives.</li>
          <li><strong>No request is ever sent.</strong> This call only wires markup and recounts what is in the page. It never fetches, and it never submits a filter form.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Usage Guidelines -->
<!-- Teardown -->
<section id="refreshDestroy" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Teardown</h2>
      <p class="nds-section-description"><code class="nds-inline-code lang-js">NDS.Init.destroy()</code> is the mirror call. Use <code class="nds-inline-code lang-js">refresh()</code> when the contents of a container changed and the container stays. Use <code class="nds-inline-code lang-js">destroy()</code> when the container itself is about to go away. It returns the number of instances it released.</p>
    </div>
    <div class="nds-section-body">
      <div class="nds-block nds-prose">
        <p>A page that loads once never needs this call. Nothing is removed, so nothing has to be released. A framework app is different: it swaps one view for another on every navigation. Each component in the old view holds listeners, observers, and menus that now point at markup the browser has thrown away. Nothing warns you, and the page keeps working, so the cost only shows up after many navigations.</p>
        <p>Call it on the root element of the view you are about to remove, not on one list inside it. A filter toolbar can sit beside the grid it drives, so a call on the grid alone misses it.</p>
        <p>Teardown is not one way. Each component clears its own init marker, so the same markup can be mounted again later with <code class="nds-inline-code lang-js">refresh()</code>.</p>
        <p>Two components move their element out of your view while it is open. A FAB routes to a dock on <code class="nds-inline-code lang-html">&lt;body&gt;</code>. A dropmenu with <code class="nds-inline-code lang-html">data-portal</code> sends its open menu to the same place. Teardown puts both back where you wrote them, so the node leaves with your view instead of staying on the page after it.</p>
      </div>

      <div class="nds-showcase">
        <div class="nds-demo-card">
          <div class="demo-header">
            <div class="demo-label">Destroy a view before it is removed</div>
          </div>
          <div class="demo-code">
            <div class="nds-tabs nds-code nds-divided">
              <div class="nds-tab-list-container nds-scroll-more">
                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                  <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                    aria-controls="panel-refresh-destroy-1" id="tab-refresh-destroy-1">
                    <span class="nds-tab-label">JS</span>
                  </button>
                </nav>
                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                </button>
              </div>
              <div class="nds-tab-content">
                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-refresh-destroy-1"
                  aria-labelledby="tab-refresh-destroy-1">
                  <div class="nds-code-action">
                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                      <i class="nds-icon nds-hgi-copy-01"></i>
                    </button>
                  </div>
                  <code class="lang-js code">
// Mount a view, then keep it in step as its rows change
NDS.Init.refresh(view);

// Before the view is removed, release everything inside it
NDS.Init.destroy(view);
view.remove();
              </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Usage guidelines -->
<section id="refreshGuidelines" class="nds-content-section nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage Guidelines</h2>
    </div>
    <div class="nds-section-body">

      <div class="nds-block nds-prose">
        <h3 class="nds-block-title">Framework Views</h3>
        <p>A framework view needs no readiness check. Call <code class="nds-inline-code lang-js">window.NDS?.Init.refresh(view)</code> after mount and <code class="nds-inline-code lang-js">NDS.Init.destroy(view)</code> before unmount — that is the whole contract. A view that mounts before the runtime or one of its bundles arrives is picked up by NDS's own startup and arrival scans, and the optional chain covers the one moment where <code class="nds-inline-code lang-js">NDS</code> does not exist yet. Do not write a poll or retry helper for this; there is nothing to wait for. The one exception is a component type the first paint never had anywhere: load its bundle once — <code class="nds-inline-code lang-js">await NDS.loadBundle('extras')</code> — then call that component's <code class="nds-inline-code lang-js">init()</code>.</p>
      </div>

      <div class="nds-block nds-prose">
        <h3 class="nds-block-title">Best Practices</h3>
        <ul>
          <li>Call it once after the DOM settles, not once per row. A bulk insert of fifty rows needs one call at the end.</li>
          <li>Pass the container whose children changed, such as the <code class="nds-inline-code lang-html">&lt;tbody&gt;</code> or the grid wrapper. Passing a distant ancestor still works but does more scanning than it needs to.</li>
          <li>Prefer it over a single component's <code class="nds-inline-code lang-js">reinit()</code> when a list changed. Reaching for one component is how the others get forgotten, and none of them warn you.</li>
          <li>Prefer it over <code class="nds-inline-code lang-js">NDS.Init.initialize()</code>, which re-sweeps and re-tags the whole page. Use that only when you have replaced the entire page body.</li>
          <li>You do not need it for content that was in the HTML at load. The loader already initialized that.</li>
          <li>You do not need it after a filter, sort, or pagination interaction. Those components already keep each other in step.</li>
          <li>Call it after your response has been written to the DOM, not when the request resolves. It reads the page, so the rows must be in place.</li>
          <li>Do not call it from a handler for an event it can cause, such as a filter change. That is how a refresh loop starts.</li>
          <li>Tear down what you remove before you remove it. Call <code class="nds-inline-code lang-js">NDS.Init.destroy(element)</code> on it first. Refreshing does not clean up detached elements.</li>
          <li>Server-driven list? Read Server-Driven Lists above before adding calls of your own. Most of what you might reach for is deliberately not done for you.</li>
        </ul>
      </div>

      <div class="nds-block nds-prose">
        <h3 class="nds-block-title">What it does not do</h3>
        <p>It updates components against the DOM as it stands. It does not fetch, build rows, or manage loading state, and it does not undo work you did by hand: a component you configured through its own API keeps that configuration. It also does not destroy anything. Elements you are about to remove need <code class="nds-inline-code lang-js">NDS.Init.destroy()</code> first, described under Teardown above.</p>
      </div>

      <div class="nds-block nds-prose">
        <h3 class="nds-block-title">JavaScript API</h3>
        <p>Available on every page as part of the main bundle. No initialization required.</p>
      </div>
      <div class="nds-tabs nds-code nds-divided">
          <div class="nds-tab-list-container nds-scroll-more">
            <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
              <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                aria-controls="panel-refresh-api-1" id="tab-refresh-api-1">
                <span class="nds-tab-label">JS API</span>
              </button>
            </nav>
            <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
            </button>
          </div>
          <div class="nds-tab-content">
            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-refresh-api-1"
              aria-labelledby="tab-refresh-api-1">
              <div class="nds-code-action">
                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                  <i class="nds-icon nds-hgi-copy-01"></i>
                </button>
              </div>
              <div class="nds-expandable-content">
                <code class="lang-js code">
NDS.Init.refresh(container)   // container: the element whose children changed.
                              // Omit it to sweep the whole document.

// After a create, edit, or delete
NDS.Init.refresh(document.getElementById('requestsTableBody'));

// After replacing a card grid with a server response
grid.innerHTML = html;
NDS.Init.refresh(grid);

// Remove a row: tear down its listeners first, then refresh
NDS.Init.destroy(row);
row.remove();
NDS.Init.refresh(tbody);

NDS.Init.destroy(container)   // release every component instance inside container,
                              // before the container itself is removed. Returns the
                              // number released. Omit it to sweep the whole document.

// A framework view: mount, keep in step, release
NDS.Init.refresh(view);
NDS.Init.destroy(view);

// The rest of the NDS.Init surface
NDS.Init.audit()        // report silent failures: unregistered inline icons,
                        // filter and paged containers nothing ever claimed
NDS.Init.initialize()   // full re-init of the page. Rarely what you want;
                        // prefer refresh(container)
NDS.Init.components     // the component registry: {name, selector, init, critical}
NDS.Init.config         // the resolved init config

// Load an injected bundle on demand, for content added after page load
await NDS.loadBundle('extras');
                </code>
              </div>
            </div>
          </div>
        </div>

    </div>
  </div>
</section>
