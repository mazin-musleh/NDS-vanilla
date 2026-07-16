---
layout: page
title: Selection
hero_title: Selection - National Design System
hero_description: A selected-items counter for tables, card grids, and any checkbox list, feeding "5 selected of 48" record widgets that swap in automatically while a selection is active
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.4.0"
updated: "1.4.0"
last_edit: "16/07/2026 - 02:55 AM"
---

<!-- Selection count on cards -->
<section id="selectionCards" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Counting Selections</h2>
            <p class="nds-section-description">Point any element at a selectable list with <code class="nds-inline-code lang-html">data-selection-target="id"</code> and its <code class="nds-inline-code lang-html">[data-selection-count]</code> slots stay live. Anything with a checked <code class="nds-inline-code lang-html">input.nds-check</code> inside counts: no wiring, no table required</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Checkbox cards, no JS owner</div>
                    </div>
                    <div class="demo-container">
                        <div class="nds-toolbar">
                                <div class="nds-bar-row">
                                    <div class="nds-bar-info">
                                        <span class="nds-results-count" data-selection-target="selection_cards_demo">
                                            <b data-selection-count>0</b> selected of <b data-selection-total>3</b> services
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div id="selection_cards_demo" class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
                                <label class="nds-card nds-stroke">
                                    <div class="nds-card-checkbox">
                                        <div class="nds-form-container nds-check-container">
                                            <div class="nds-form-control">
                                                <input type="checkbox" class="nds-check" aria-label="Select Passport Renewal">
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
                                                <input type="checkbox" class="nds-check" aria-label="Select Driving Licence">
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
                                                <input type="checkbox" class="nds-check" aria-label="Select Commercial Registration">
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
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-selection-cards-1" id="tab-selection-cards-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-selection-cards-1"
                                    aria-labelledby="tab-selection-cards-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-toolbar"&gt;
    &lt;div class="nds-bar-row"&gt;
        &lt;div class="nds-bar-info"&gt;
            &lt;span class="nds-results-count" data-selection-target="selection_cards_demo"&gt;
                &lt;b data-selection-count&gt;0&lt;/b&gt; selected of &lt;b data-selection-total&gt;3&lt;/b&gt; services
            &lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div id="selection_cards_demo" class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;"&gt;
    &lt;label class="nds-card nds-stroke"&gt;
        &lt;div class="nds-card-checkbox"&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
                &lt;div class="nds-form-control"&gt;
                    &lt;input type="checkbox" class="nds-check" aria-label="Select Passport Renewal"&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-card-content"&gt;
            &lt;div class="nds-card-text"&gt;
                &lt;span class="nds-card-title"&gt;Passport Renewal&lt;/span&gt;
                &lt;p class="nds-card-description"&gt;General Directorate of Passports&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/label&gt;
    &lt;label class="nds-card nds-stroke"&gt;
        &lt;div class="nds-card-checkbox"&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
                &lt;div class="nds-form-control"&gt;
                    &lt;input type="checkbox" class="nds-check" aria-label="Select Driving Licence"&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-card-content"&gt;
            &lt;div class="nds-card-text"&gt;
                &lt;span class="nds-card-title"&gt;Driving Licence&lt;/span&gt;
                &lt;p class="nds-card-description"&gt;General Department of Traffic&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/label&gt;
    &lt;label class="nds-card nds-stroke"&gt;
        &lt;div class="nds-card-checkbox"&gt;
            &lt;div class="nds-form-container nds-check-container"&gt;
                &lt;div class="nds-form-control"&gt;
                    &lt;input type="checkbox" class="nds-check" aria-label="Select Commercial Registration"&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-card-content"&gt;
            &lt;div class="nds-card-text"&gt;
                &lt;span class="nds-card-title"&gt;Commercial Registration&lt;/span&gt;
                &lt;p class="nds-card-description"&gt;Ministry of Commerce&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/label&gt;
&lt;/div&gt;
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

<!-- View swap on a table, counter in the toolbar -->
<section id="selectionSwap" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Swapping with the Records Counter</h2>
            <p class="nds-section-description">The counter's home in real layouts is the <a class="nds-color" href="{{ 'components/toolbar' | relative_url }}">Toolbar</a> above a table. Give one wrapper both targets and two views: the <a class="nds-color" href="{{ 'components/pagination' | relative_url }}">Pagination</a> records line shows while browsing, and the selection line takes over when rows are selected, including via the table's select-all. Ship <code class="nds-inline-code lang-html">nds-selection-view</code> with <code class="nds-inline-code lang-html">hidden</code> so first paint is correct</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Select rows or use select-all to swap the line</div>
                    </div>
                    <div class="demo-container">
                        <div class="nds-toolbar">
                                <div class="nds-bar-row">
                                    <div class="nds-bar-info">
                                        <span class="nds-results-count" data-paged-target="selection_table_demo" data-selection-target="selection_table_demo">
                                            <span class="nds-records-view">Showing <b data-paged-from>1</b>&ndash;<b data-paged-to>4</b> of <b data-paged-count>6</b> requests</span>
                                            <span class="nds-selection-view" hidden><b data-selection-count>0</b> selected of <b data-paged-count>6</b> requests</span>
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
                                <tbody id="selection_table_demo" class="nds-paged-content" style="--per-page: 4;">
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
                            <nav class="nds-pagination" data-auto-pagination="selection_table_demo" aria-label="Pagination"></nav>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-selection-swap-1" id="tab-selection-swap-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-selection-swap-1"
                                    aria-labelledby="tab-selection-swap-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;!-- One wrapper, both targets, two views — in the toolbar's info slot.
     Prerender the initial numbers. --&gt;
&lt;div class="nds-toolbar"&gt;
    &lt;div class="nds-bar-row"&gt;
        &lt;div class="nds-bar-info"&gt;
            &lt;span class="nds-results-count" data-paged-target="selection_table_demo" data-selection-target="selection_table_demo"&gt;
                &lt;span class="nds-records-view"&gt;Showing &lt;b data-paged-from&gt;1&lt;/b&gt;&ndash;&lt;b data-paged-to&gt;4&lt;/b&gt; of &lt;b data-paged-count&gt;6&lt;/b&gt; requests&lt;/span&gt;
                &lt;span class="nds-selection-view" hidden&gt;&lt;b data-selection-count&gt;0&lt;/b&gt; selected of &lt;b data-paged-count&gt;6&lt;/b&gt; requests&lt;/span&gt;
            &lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;table class="nds-table"&gt;
    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;
                &lt;div class="nds-form-container nds-check-container"&gt;
                    &lt;div class="nds-form-control"&gt;
                        &lt;input type="checkbox" class="nds-check" aria-label="Select all requests"&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/th&gt;
            &lt;th&gt;Reference&lt;/th&gt;
            &lt;th&gt;Service&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody id="selection_table_demo" class="nds-paged-content" style="--per-page: 4;"&gt;
        &lt;tr class="nds-page-item"&gt;
            &lt;td&gt;
                &lt;div class="nds-form-container nds-check-container"&gt;
                    &lt;div class="nds-form-control"&gt;
                        &lt;input type="checkbox" class="nds-check" aria-label="Select REQ-1001"&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/td&gt;
            &lt;td&gt;REQ-1001&lt;/td&gt;
            &lt;td&gt;Passport Renewal&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr class="nds-page-item"&gt;
            &lt;td&gt;
                &lt;div class="nds-form-container nds-check-container"&gt;
                    &lt;div class="nds-form-control"&gt;
                        &lt;input type="checkbox" class="nds-check" aria-label="Select REQ-1002"&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/td&gt;
            &lt;td&gt;REQ-1002&lt;/td&gt;
            &lt;td&gt;Driving Licence&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr class="nds-page-item"&gt;
            &lt;td&gt;
                &lt;div class="nds-form-container nds-check-container"&gt;
                    &lt;div class="nds-form-control"&gt;
                        &lt;input type="checkbox" class="nds-check" aria-label="Select REQ-1003"&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/td&gt;
            &lt;td&gt;REQ-1003&lt;/td&gt;
            &lt;td&gt;Commercial Registration&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr class="nds-page-item"&gt;
            &lt;td&gt;
                &lt;div class="nds-form-container nds-check-container"&gt;
                    &lt;div class="nds-form-control"&gt;
                        &lt;input type="checkbox" class="nds-check" aria-label="Select REQ-1004"&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/td&gt;
            &lt;td&gt;REQ-1004&lt;/td&gt;
            &lt;td&gt;Building Permit&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr class="nds-page-item"&gt;
            &lt;td&gt;
                &lt;div class="nds-form-container nds-check-container"&gt;
                    &lt;div class="nds-form-control"&gt;
                        &lt;input type="checkbox" class="nds-check" aria-label="Select REQ-1005"&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/td&gt;
            &lt;td&gt;REQ-1005&lt;/td&gt;
            &lt;td&gt;Health Card&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr class="nds-page-item"&gt;
            &lt;td&gt;
                &lt;div class="nds-form-container nds-check-container"&gt;
                    &lt;div class="nds-form-control"&gt;
                        &lt;input type="checkbox" class="nds-check" aria-label="Select REQ-1006"&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/td&gt;
            &lt;td&gt;REQ-1006&lt;/td&gt;
            &lt;td&gt;Work Visa&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/tbody&gt;
&lt;/table&gt;
&lt;nav class="nds-pagination" data-auto-pagination="selection_table_demo" aria-label="Pagination"&gt;&lt;/nav&gt;
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
<section id="selectionFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Activates when a <code class="nds-inline-code lang-html">data-selection-target</code> element is on the page and recounts on every checkbox change, including a table's select-all.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-check-list"></i>
                        <span class="nds-label">Content-Agnostic Counting</span>
                    </span>
                    <p class="nds-item-desc">Table rows, checkbox cards, and plain checkbox lists all count with the same rule: a checked <code class="nds-inline-code lang-html">input.nds-check</code> inside the item. The card demo above has no JS of its own.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-exchange-01"></i>
                        <span class="nds-label">View Swap</span>
                    </span>
                    <p class="nds-item-desc">Wrappers holding <code class="nds-inline-code lang-html">nds-records-view</code> and <code class="nds-inline-code lang-html">nds-selection-view</code> children switch between them automatically while anything is selected.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Recount a list or every widget after dynamic DOM changes through the <code class="nds-inline-code lang-js">NDS.Selection</code> API.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="selectionGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use a selection counter wherever a bulk action exists (export, delete, assign): the number tells users what the action will affect before they commit</li>
                    <li>The count is the <strong>bulk-action truth</strong>: it includes selections on other pages and on rows an active filter currently hides, matching exactly what <a class="nds-color" href="{{ 'components/export' | relative_url }}">Export</a>'s selected scope exports</li>
                    <li>Place the counter in the <a class="nds-color" href="{{ 'components/toolbar' | relative_url }}">Toolbar</a>'s info slot above the list, as the table demo shows: that is where users look for record counts</li>
                    <li>Pair with the <a class="nds-color" href="{{ 'components/pagination' | relative_url }}">Pagination</a> records counter through the two-view swap so one line serves both browsing and selecting</li>
                    <li>Ship <code class="nds-inline-code lang-html">nds-selection-view</code> with the <code class="nds-inline-code lang-html">hidden</code> attribute: nothing is selected at first paint, and the view stays correct before scripts load</li>
                    <li>A single always-visible counter (like the card demo) needs no view classes: just the wrapper and a count slot</li>
                    <li>Style selection-mode chrome (highlighted toolbar, action buttons appearing) off the wrapper's <code class="nds-inline-code lang-html">data-state="has-selection"</code> stamp rather than wiring your own listeners</li>
                    <li>Don't build per-page selection counts: if users need "selected on this page", rethink the flow, since bulk actions operate on the full selection</li>
                    <li>Keep the sentence in your markup, in your language: the component only writes numbers, so plurals and Arabic phrasing are entirely yours</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-selection-target="id"</code></td><td>Makes the element a selection counter for the list with that id. Its <code class="nds-inline-code lang-html">[data-selection-count]</code> slots receive the count (with thousand separators), and it carries <code class="nds-inline-code lang-html">data-state="has-selection"</code> while the count is above zero</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-selection-count</code></td><td>Number slot inside the wrapper; any element works (<code class="nds-inline-code lang-html">&lt;b&gt;</code> renders medium emphasis inside <code class="nds-inline-code lang-html">nds-results-count</code>)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-selection-total</code></td><td>Slot for the list's item count, so a standalone "x selected of y" works without <a class="nds-color" href="{{ 'components/pagination' | relative_url }}">Pagination</a>. Paged lists can use <code class="nds-inline-code lang-html">data-paged-count</code> instead (the filtered count)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="selected"</code></td><td>Alternative selected marker on an item, for content without checkboxes. Tables stamp it on rows automatically</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The counter initializes automatically when a <code class="nds-inline-code lang-html">data-selection-target</code> element exists on the page and reacts to checkbox changes on its own. Use the API after DOM changes checkboxes don't announce.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// Wire the document listener (loader does this automatically)
NDS.Selection.init();

// Recount every widget — call after adding/removing items or
// setting .checked programmatically (no change event fires then)
NDS.Selection.reinit();

// Recount one list's widgets by id
NDS.Selection.recount('ordersList');

// Detach the listener (SPA teardown)
NDS.Selection.destroy();
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
