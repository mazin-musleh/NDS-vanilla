---
layout: page
title: Toolbar
hero_title: Toolbar - National Design System
hero_description: A controls bar above a table, list, or grid that arranges result counts, search, filters, and actions into one consistent layout
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Toolbar -->
<section id="toolbarOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Toolbar</h2>
            <p class="nds-section-description">The default arrangement: reporting widgets on the leading edge, controls pushed to the trailing edge, and the content as an independent sibling below</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Info and actions</div>
                    </div>
                    <div class="demo-container">
                        <div class="nds-toolbar">
                            <div class="nds-bar-info">
                                <span class="nds-results-count">3 orders</span>
                            </div>
                            <div class="nds-bar-actions">
                                <div class="nds-export nds-btn-group">
                                    <button type="button" class="nds-btn nds-secondary-outline nds-md"
                                        data-export="csv" data-export-target="#toolbarOrders">
                                        <span class="nds-label">CSV</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-secondary-outline nds-md"
                                        data-export="xls" data-export-target="#toolbarOrders">
                                        <span class="nds-label">Excel</span>
                                    </button>
                                    <button type="button" class="nds-btn nds-secondary-outline nds-md"
                                        data-export="pdf" data-export-target="#toolbarOrders">
                                        <span class="nds-label">PDF</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table id="toolbarOrders" class="nds-table" data-export-name="orders">
                            <thead>
                                <tr>
                                    <th>Reference</th>
                                    <th>Entity</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1041</td>
                                    <td>Ministry of Interior</td>
                                    <td><span class="nds-tag nds-green nds-sm"><span class="nds-label">Completed</span></span></td>
                                </tr>
                                <tr>
                                    <td>1042</td>
                                    <td>Ministry of Health</td>
                                    <td><span class="nds-tag nds-blue nds-sm"><span class="nds-label">In Review</span></span></td>
                                </tr>
                                <tr>
                                    <td>1043</td>
                                    <td>Ministry of Education</td>
                                    <td><span class="nds-tag nds-yellow nds-sm"><span class="nds-label">Pending</span></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-toolbar-basic-1" id="tab-toolbar-basic-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-toolbar-basic-1"
                                    aria-labelledby="tab-toolbar-basic-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-toolbar"&gt;
  &lt;div class="nds-bar-info"&gt;
    &lt;span class="nds-results-count"&gt;3 orders&lt;/span&gt;
  &lt;/div&gt;
  &lt;div class="nds-bar-actions"&gt;
    &lt;div class="nds-export nds-btn-group"&gt;
      &lt;button type="button" class="nds-btn nds-secondary-outline nds-md"
        data-export="csv" data-export-target="#toolbarOrders"&gt;
        &lt;span class="nds-label"&gt;CSV&lt;/span&gt;
      &lt;/button&gt;
      &lt;button type="button" class="nds-btn nds-secondary-outline nds-md"
        data-export="xls" data-export-target="#toolbarOrders"&gt;
        &lt;span class="nds-label"&gt;Excel&lt;/span&gt;
      &lt;/button&gt;
      &lt;button type="button" class="nds-btn nds-secondary-outline nds-md"
        data-export="pdf" data-export-target="#toolbarOrders"&gt;
        &lt;span class="nds-label"&gt;PDF&lt;/span&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;table id="toolbarOrders" class="nds-table" data-export-name="orders"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Reference&lt;/th&gt;
      &lt;th&gt;Entity&lt;/th&gt;
      &lt;th&gt;Status&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;1041&lt;/td&gt;
      &lt;td&gt;Ministry of Interior&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-green nds-sm"&gt;&lt;span class="nds-label"&gt;Completed&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;1042&lt;/td&gt;
      &lt;td&gt;Ministry of Health&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-blue nds-sm"&gt;&lt;span class="nds-label"&gt;In Review&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;1043&lt;/td&gt;
      &lt;td&gt;Ministry of Education&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-yellow nds-sm"&gt;&lt;span class="nds-label"&gt;Pending&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
                                    </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Multi-Row Toolbar -->
<section id="toolbarRows" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Multi-Row Toolbar</h2>
            <p class="nds-section-description">Pick this when the bar carries more controls than one line can hold, or when you want counts and actions on a line of their own regardless of viewport width</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Search a row, then watch the applied-filters row appear</div>
                    </div>
                    <div class="demo-container">
                        <div class="nds-toolbar">
                            <div class="nds-bar-row">
                                <div class="nds-bar-info">
                                    <span class="nds-results-count" data-filter-target="toolbarRowsBody"><span data-filter-count>3</span> of 3 orders</span>
                                </div>
                                <div class="nds-bar-actions">
                                    <div class="nds-export nds-btn-group">
                                        <button type="button" class="nds-btn nds-secondary-outline nds-md"
                                            data-export="csv" data-export-target="#toolbarRowsTable">
                                            <span class="nds-label">CSV</span>
                                        </button>
                                        <button type="button" class="nds-btn nds-secondary-outline nds-md"
                                            data-export="pdf" data-export-target="#toolbarRowsTable">
                                            <span class="nds-label">PDF</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-bar-row">
                                <div class="nds-form-container nds-search-box" data-filter-target="toolbarRowsBody">
                                    <div class="nds-search-content">
                                        <div class="nds-form-control">
                                            <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                            <input type="text" class="nds-search-input" placeholder="Search orders...">
                                            <div class="nds-form-action">
                                                <button class="nds-btn nds-subtle nds-clear" hidden aria-label="Clear search"><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                        <button class="nds-btn nds-primary nds-search-btn" type="button">
                                            <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                            <span class="nds-label">Search</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-bar-row">
                                <div class="nds-bar-info">
                                    <div class="nds-filter-applied" data-filter-target="toolbarRowsBody" hidden>
                                        <span class="nds-label">Applied Filters:</span>
                                        <div class="nds-chips"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table id="toolbarRowsTable" class="nds-table" data-export-name="orders">
                            <thead>
                                <tr>
                                    <th>Reference</th>
                                    <th>Entity</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="toolbarRowsBody" data-filter-items="tr">
                                <tr>
                                    <td>1041</td>
                                    <td>Ministry of Interior</td>
                                    <td><span class="nds-tag nds-green nds-sm"><span class="nds-label">Completed</span></span></td>
                                </tr>
                                <tr>
                                    <td>1042</td>
                                    <td>Ministry of Health</td>
                                    <td><span class="nds-tag nds-blue nds-sm"><span class="nds-label">In Review</span></span></td>
                                </tr>
                                <tr>
                                    <td>1043</td>
                                    <td>Ministry of Education</td>
                                    <td><span class="nds-tag nds-yellow nds-sm"><span class="nds-label">Pending</span></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-toolbar-rows-1" id="tab-toolbar-rows-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-toolbar-rows-1"
                                    aria-labelledby="tab-toolbar-rows-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;div class="nds-toolbar"&gt;
  &lt;!-- Row 1: counts lead, controls trail --&gt;
  &lt;div class="nds-bar-row"&gt;
    &lt;div class="nds-bar-info"&gt;
      &lt;span class="nds-results-count" data-filter-target="toolbarRowsBody"&gt;&lt;span data-filter-count&gt;3&lt;/span&gt; of 3 orders&lt;/span&gt;
    &lt;/div&gt;
    &lt;div class="nds-bar-actions"&gt;
      &lt;div class="nds-export nds-btn-group"&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md"
          data-export="csv" data-export-target="#toolbarRowsTable"&gt;
          &lt;span class="nds-label"&gt;CSV&lt;/span&gt;
        &lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-secondary-outline nds-md"
          data-export="pdf" data-export-target="#toolbarRowsTable"&gt;
          &lt;span class="nds-label"&gt;PDF&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- Row 2: the search box grows to fill its line --&gt;
  &lt;div class="nds-bar-row"&gt;
    &lt;div class="nds-form-container nds-search-box" data-filter-target="toolbarRowsBody"&gt;
      &lt;div class="nds-search-content"&gt;
        &lt;div class="nds-form-control"&gt;
          &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;input type="text" class="nds-search-input" placeholder="Search orders..."&gt;
          &lt;div class="nds-form-action"&gt;
            &lt;button class="nds-btn nds-subtle nds-clear" hidden aria-label="Clear search"&gt;
              &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;button class="nds-btn nds-primary nds-search-btn" type="button"&gt;
          &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;span class="nds-label"&gt;Search&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;

  &lt;!-- Row 3: collapses to nothing until a filter lands --&gt;
  &lt;div class="nds-bar-row"&gt;
    &lt;div class="nds-bar-info"&gt;
      &lt;div class="nds-filter-applied" data-filter-target="toolbarRowsBody" hidden&gt;
        &lt;span class="nds-label"&gt;Applied Filters:&lt;/span&gt;
        &lt;div class="nds-chips"&gt;&lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;table id="toolbarRowsTable" class="nds-table" data-export-name="orders"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Reference&lt;/th&gt;
      &lt;th&gt;Entity&lt;/th&gt;
      &lt;th&gt;Status&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody id="toolbarRowsBody" data-filter-items="tr"&gt;
    &lt;tr&gt;
      &lt;td&gt;1041&lt;/td&gt;
      &lt;td&gt;Ministry of Interior&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-green nds-sm"&gt;&lt;span class="nds-label"&gt;Completed&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;1042&lt;/td&gt;
      &lt;td&gt;Ministry of Health&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-blue nds-sm"&gt;&lt;span class="nds-label"&gt;In Review&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;1043&lt;/td&gt;
      &lt;td&gt;Ministry of Education&lt;/td&gt;
      &lt;td&gt;&lt;span class="nds-tag nds-yellow nds-sm"&gt;&lt;span class="nds-label"&gt;Pending&lt;/span&gt;&lt;/span&gt;&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
                                    </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="toolbarFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-distribute-horizontal-center"></i>
                        <span class="nds-label">Leading and Trailing Clusters</span>
                    </span>
                    <p class="nds-item-desc">Anything you place in <code class="nds-inline-code lang-html">nds-bar-info</code> sits at the leading edge, and <code class="nds-inline-code lang-html">nds-bar-actions</code> is pushed to the trailing edge at any bar width.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-distribute-vertical-center"></i>
                        <span class="nds-label">Stackable Rows</span>
                    </span>
                    <p class="nds-item-desc">Wrap items in <code class="nds-inline-code lang-html">nds-bar-row</code> to pin them to their own line. A row lays out exactly like the bar, so clusters and search fields behave the same inside one.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="nds-icon nds-hgi-view-off-slash" aria-hidden="true"></i>
                        <span class="nds-label">Empty-Slot Collapse</span>
                    </span>
                    <p class="nds-item-desc">A row whose widgets are all hidden takes no space at all, so an applied-filters row leaves no gap above the content until a filter lands.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-search-01"></i>
                        <span class="nds-label">Search Field Growth</span>
                    </span>
                    <p class="nds-item-desc">A search box dropped into the bar stretches to fill the free space on its line instead of rendering as the centered panel it is by default.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mobile-programming-01"></i>
                        <span class="nds-label">Responsive Labels</span>
                    </span>
                    <p class="nds-item-desc">Search and filter button labels collapse to icons on small screens, keeping the bar's controls on one line without truncating them.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-ruler"></i>
                        <span class="nds-label">Per-Instance Spacing</span>
                    </span>
                    <p class="nds-item-desc">Set <code class="nds-inline-code lang-html">--toolbar-margin-block</code> on any bar to change the space it clears above and below itself, without touching the component.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="toolbarGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use a <strong>toolbar</strong> directly above the content it controls: a <a class="nds-color" href="{{ 'components/tables' | relative_url }}">Table</a>, a card grid, or any list. Keep the content and its <a class="nds-color" href="{{ 'components/pagination' | relative_url }}">Pagination</a> as independent siblings below</li>
                    <li>Put anything that <strong>reports</strong> in <code class="nds-inline-code lang-html">nds-bar-info</code>: a result count, applied-filter chips, auto-fill suggestions, a selection summary. Put anything that <strong>acts</strong> in <code class="nds-inline-code lang-html">nds-bar-actions</code>: an <a class="nds-color" href="{{ 'components/export' | relative_url }}">Export</a> group, a column menu, bulk actions</li>
                    <li>Reach for <code class="nds-inline-code lang-html">nds-bar-row</code> only when you want a deliberate line break. Without one the bar wraps on its own, which is the right behavior for two or three controls</li>
                    <li>Do not use a toolbar for page-level navigation or the page's primary action. Those belong in the section head, described on the <a class="nds-color" href="{{ 'layout/section' | relative_url }}">Section</a> page</li>
                    <li>Do not nest a toolbar inside another toolbar. Add a <code class="nds-inline-code lang-html">nds-bar-row</code> instead, which is the same layout without the outer spacing</li>
                    <li>Every widget wires itself to its own content through a target attribute, so the bar imposes no structure on them. A custom layout built from <a class="nds-color" href="{{ 'layout/grid' | relative_url }}">Grid</a> works too, but the toolbar keeps bars consistent across a product</li>
                    <li>Leave the <code class="nds-inline-code lang-html">hidden</code> attribute on widgets that ship empty, such as the applied-filters row. The bar reads it to collapse the line, and removing it leaves a permanent gap</li>
                    <li>Keep the trailing cluster to one or two controls. Group related buttons with <code class="nds-inline-code lang-html">nds-btn-group</code> so they read as a single control rather than a row of choices</li>
                    <li>Match button sizes inside a cluster. A default button is 40px tall and <code class="nds-inline-code lang-html">nds-md</code> is 32px, so mixing them leaves the cluster visibly uneven</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-toolbar</code></td><td>The bar itself. A wrapping flex row that spans its container and clears space below</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-bar-row</code></td><td>Pins its children to a line of their own. Lays out identically to the bar, so clusters and search boxes work inside it</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-bar-info</code></td><td>Leading widget cluster. Groups reporting widgets so they space tighter than the bar's own gap</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-bar-actions</code></td><td>Trailing widget cluster. Pushed to the end edge of whichever bar or row holds it</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--toolbar-margin-block</code></td><td><code class="nds-inline-code lang-html">0 var(--spacing-xl)</code></td><td>The bar's block margins, written as <code class="nds-inline-code lang-html">&lt;start&gt; &lt;end&gt;</code>. Set it on the bar or an ancestor to change either edge</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
