---
layout: page
title: Pagination
hero_title: Pagination - National Design System
hero_description: Navigate large data sets with numbered page controls, or automatically split grids, lists, and tables into pages with built-in content management
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.4.x"
last_edit: "22/07/2026 - 01:45 PM"
---

<!-- Choosing a mode -->
<section id="paginationModes" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Choosing a mode</h2>
            <p class="nds-section-description">Pagination is one nav with three ways to drive it. Pick by who owns the content.</p>
        </div>
        <div class="nds-section-body">
            <ul>
                <li><strong>Auto</strong> — all items are already in the DOM and NDS slices them into pages. Wrap them in <code class="nds-inline-code lang-html">nds-paged-content</code>, mark each with <code class="nds-inline-code lang-html">nds-page-item</code>, and point the nav at the wrapper with <code class="nds-inline-code lang-html">data-auto-pagination="id"</code> (see Paginated Grid / Table below).</li>
                <li><strong>Manual / server</strong> — each page is a separate URL or request. Use a plain <code class="nds-inline-code lang-html">nds-pagination</code> nav with no content classes; for AJAX, listen for <code class="nds-inline-code lang-js">nds:pagination:change</code> and load the page yourself (see Standard Pagination below).</li>
                <li><strong>Data-driven</strong> — you know the page count but want NDS to build the controls. Set <code class="nds-inline-code lang-html">data-total-pages="N"</code> on an empty nav (see Data-Driven Pagination below).</li>
            </ul>
            <p class="nds-section-description"><code class="nds-inline-code lang-html">nds-paged-content</code> and <code class="nds-inline-code lang-html">nds-page-item</code> belong to <strong>auto</strong> only — manual and data-driven navs never use them.</p>
        </div>
    </div>
</section>

<!-- Standard Pagination -->
<section id="paginationStandard" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard Pagination</h2>
            <p class="nds-section-description">Numbered page controls with previous and next arrows for stepping through content</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-pagination" aria-label="Pagination">
                                <ul class="nds-pagination-list">
                                    <li class="nds-pagination-item nds-pagination-prev">
                                        <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Previous page" disabled>
                                            <i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"></i>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" data-state="active" aria-current="page" aria-label="Page 1">
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
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-standard-1" id="tab-pagination-standard-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-pagination-standard-1"
                                    aria-labelledby="tab-pagination-standard-1">
                                    <div class="nds-code-action">
                                        <button type="button" class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;nav class="nds-pagination" aria-label="Pagination"&gt;
    &lt;ul class="nds-pagination-list"&gt;
        &lt;li class="nds-pagination-item nds-pagination-prev"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Previous page" disabled&gt;
                &lt;i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" data-state="active" aria-current="page" aria-label="Page 1"&gt;
                &lt;span class="nds-label"&gt;1&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 2"&gt;
                &lt;span class="nds-label"&gt;2&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 3"&gt;
                &lt;span class="nds-label"&gt;3&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 4"&gt;
                &lt;span class="nds-label"&gt;4&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 5"&gt;
                &lt;span class="nds-label"&gt;5&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item nds-pagination-next"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Next page"&gt;
                &lt;i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;
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

<!-- Data-Driven Pagination -->
<section id="paginationDataDriven" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Data-Driven Pagination</h2>
            <p class="nds-section-description">Set a page count and optional active page on an empty nav element, and the component builds the numbered controls automatically. By default they are buttons you wire through the change event (SPA); add a <code class="nds-inline-code lang-html">data-page-url</code> template to render navigable links instead, for no-JS full-reload server pagination</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-pagination" data-total-pages="8" data-active-page="1" aria-label="Pagination"></nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-datadriven-1" id="tab-pagination-datadriven-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-pagination-datadriven-1"
                                    aria-labelledby="tab-pagination-datadriven-1">
                                    <div class="nds-code-action">
                                        <button type="button" class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;nav class="nds-pagination" data-total-pages="8" data-active-page="1" aria-label="Pagination"&gt;&lt;/nav&gt;
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

<!-- Automatic Ellipsis -->
<section id="paginationEllipsis" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Automatic Ellipsis Collapse</h2>
            <p class="nds-section-description">When page count exceeds five, middle pages collapse into a dropdown for compact navigation. Write the full list of pages flat and the component folds them on its own, re-folding as pages are added or removed</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-pagination" aria-label="Pagination">
                                <ul class="nds-pagination-list">
                                    <li class="nds-pagination-item nds-pagination-prev">
                                        <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Previous page">
                                            <i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"></i>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 1">
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
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" data-state="active" aria-current="page" aria-label="Page 5">
                                            <span class="nds-label">5</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 6">
                                            <span class="nds-label">6</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 7">
                                            <span class="nds-label">7</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 8">
                                            <span class="nds-label">8</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 9">
                                            <span class="nds-label">9</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 10">
                                            <span class="nds-label">10</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item nds-pagination-next">
                                        <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Next page">
                                            <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-ellipsis-1" id="tab-pagination-ellipsis-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-pagination-ellipsis-1"
                                    aria-labelledby="tab-pagination-ellipsis-1">
                                    <div class="nds-code-action">
                                        <button type="button" class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;nav class="nds-pagination" aria-label="Pagination"&gt;
    &lt;ul class="nds-pagination-list"&gt;
        &lt;li class="nds-pagination-item nds-pagination-prev"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Previous page"&gt;
                &lt;i class="nds-icon nds-hgi-arrow-prev-01" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 1"&gt;
                &lt;span class="nds-label"&gt;1&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 2"&gt;
                &lt;span class="nds-label"&gt;2&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 3"&gt;
                &lt;span class="nds-label"&gt;3&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 4"&gt;
                &lt;span class="nds-label"&gt;4&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" data-state="active" aria-current="page" aria-label="Page 5"&gt;
                &lt;span class="nds-label"&gt;5&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 6"&gt;
                &lt;span class="nds-label"&gt;6&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 7"&gt;
                &lt;span class="nds-label"&gt;7&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 8"&gt;
                &lt;span class="nds-label"&gt;8&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 9"&gt;
                &lt;span class="nds-label"&gt;9&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 10"&gt;
                &lt;span class="nds-label"&gt;10&lt;/span&gt;
            &lt;/button&gt;
        &lt;/li&gt;
        &lt;li class="nds-pagination-item nds-pagination-next"&gt;
            &lt;button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Next page"&gt;
                &lt;i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;/button&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/nav&gt;
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

<!-- Paginated Grid -->
<section id="paginationGrid" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Paginated Grid</h2>
            <p class="nds-section-description">Automatically split grid items across pages by marking children with <code class="nds-inline-code lang-html">nds-page-item</code> and adding a <code class="nds-inline-code lang-html">data-auto-pagination="id"</code> nav that targets the container by id</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="pagination_grid_demo" class="nds-paged-content nds-grid"
                                style="--per-page: 4; --max-col: 4; --mid-col: 3; --min-col: 2;">
                                <div class="nds-page-item nds-card nds-stroke">Card 1</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 2</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 3</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 4</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 5</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 6</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 7</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 8</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 9</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 10</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 11</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 12</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 13</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 14</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 15</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 16</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 17</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 18</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 19</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 20</div>
                            </div>
                            <nav class="nds-pagination" data-auto-pagination="pagination_grid_demo" aria-label="Pagination"></nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-grid-1" id="tab-pagination-grid-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-pagination-grid-1"
                                    aria-labelledby="tab-pagination-grid-1">
                                    <div class="nds-code-action">
                                        <button type="button" class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div id="pagination_grid_demo" class="nds-paged-content nds-grid"
    style="--per-page: 4; --max-col: 4; --mid-col: 3; --min-col: 2;"&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 1&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 2&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 3&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 4&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 5&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 6&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 7&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 8&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 9&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 10&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 11&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 12&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 13&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 14&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 15&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 16&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 17&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 18&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 19&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 20&lt;/div&gt;
&lt;/div&gt;
&lt;nav class="nds-pagination" data-auto-pagination="pagination_grid_demo" aria-label="Pagination"&gt;&lt;/nav&gt;
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

<!-- Paginated Table -->
<section id="paginationTable" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Paginated Table</h2>
            <p class="nds-section-description">Table rows paginate the same way as grid items, with the <code class="nds-inline-code lang-html">nds-page-item</code> class on each body row</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="nds-label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-pagination", "paginationSize"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="pagination_table_demo">
                                <table class="nds-table nds-sortable">
                                    <thead>
                                        <tr>
                                            <th>
                                                <div class="nds-col-header">
                                                    <span class="nds-label">#</span>
                                                    <div class="nds-col-actions">
                                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" data-sort-type="number" aria-label="Sort by row number"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                                    </div>
                                                </div>
                                            </th>
                                            <th>
                                                <div class="nds-col-header">
                                                    <span class="nds-label">Service</span>
                                                    <div class="nds-col-actions">
                                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" data-sort-type="string" aria-label="Sort by service"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Description</th>
                                            <th>
                                                <div class="nds-col-header">
                                                    <span class="nds-label">System</span>
                                                    <div class="nds-col-actions">
                                                        <button class="nds-btn nds-subtle nds-sort-btn nds-icon-only" data-sort-type="string" aria-label="Sort by system"><i class="nds-icon nds-hgi-sorting-05 nds-sort-icon" aria-hidden="true"></i></button>
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Most Used</th>
                                        </tr>
                                    </thead>
                                    <tbody id="pagination_table_body" class="nds-paged-content" style="--per-page: 5;">
                                        {% for service in site.data.content.services %}
                                        <tr class="nds-page-item">
                                            <td>{{ forloop.index }}</td>
                                            <td>{{ service.title }}</td>
                                            <td>{{ service.description }}</td>
                                            <td>{{ service.system }}</td>
                                            <td>{% if service.most_used %}Yes{% else %}&#8212;{% endif %}</td>
                                        </tr>
                                        {% endfor %}
                                    </tbody>
                                </table>
                            </div>
                            <nav class="nds-pagination" data-auto-pagination="pagination_table_body"></nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-table-1" id="tab-pagination-table-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-pagination-table-1"
                                    aria-labelledby="tab-pagination-table-1">
                                    <div class="nds-code-action">
                                        <button type="button" class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div id="pagination_table_demo"&gt;
    &lt;table class="nds-table"&gt;
        &lt;thead&gt;
            &lt;tr&gt;
                &lt;th&gt;#&lt;/th&gt;
                &lt;th&gt;Service&lt;/th&gt;
                &lt;th&gt;Description&lt;/th&gt;
                &lt;th&gt;System&lt;/th&gt;
                &lt;th&gt;Most Used&lt;/th&gt;
            &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody id="pagination_table_body" class="nds-paged-content" style="--per-page: 5;"&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;1&lt;/td&gt;
                &lt;td&gt;Identity Verification&lt;/td&gt;
                &lt;td&gt;Verify your national identity and obtain digital certificates&lt;/td&gt;
                &lt;td&gt;Identity &amp; Records&lt;/td&gt;
                &lt;td&gt;Yes&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;2&lt;/td&gt;
                &lt;td&gt;Passport Renewal&lt;/td&gt;
                &lt;td&gt;Renew your passport online with expedited processing&lt;/td&gt;
                &lt;td&gt;Identity &amp; Records&lt;/td&gt;
                &lt;td&gt;Yes&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;3&lt;/td&gt;
                &lt;td&gt;Birth Certificate Request&lt;/td&gt;
                &lt;td&gt;Request official birth certificates and family documentation&lt;/td&gt;
                &lt;td&gt;Identity &amp; Records&lt;/td&gt;
                &lt;td&gt;&#8212;&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;4&lt;/td&gt;
                &lt;td&gt;Marriage Contract Registration&lt;/td&gt;
                &lt;td&gt;Register marriage contracts and obtain official certificates&lt;/td&gt;
                &lt;td&gt;Identity &amp; Records&lt;/td&gt;
                &lt;td&gt;&#8212;&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;5&lt;/td&gt;
                &lt;td&gt;Driver's License Services&lt;/td&gt;
                &lt;td&gt;Apply for, renew, or update your driving license&lt;/td&gt;
                &lt;td&gt;Transport &amp; Vehicles&lt;/td&gt;
                &lt;td&gt;Yes&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;6&lt;/td&gt;
                &lt;td&gt;Vehicle Registration&lt;/td&gt;
                &lt;td&gt;Register new vehicles, transfer ownership, or renew registration&lt;/td&gt;
                &lt;td&gt;Transport &amp; Vehicles&lt;/td&gt;
                &lt;td&gt;Yes&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;7&lt;/td&gt;
                &lt;td&gt;Visa Application&lt;/td&gt;
                &lt;td&gt;Apply for entry visas for visitors, workers, or family members&lt;/td&gt;
                &lt;td&gt;Transport &amp; Vehicles&lt;/td&gt;
                &lt;td&gt;&#8212;&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;8&lt;/td&gt;
                &lt;td&gt;Health Insurance Enrollment&lt;/td&gt;
                &lt;td&gt;Enroll in government health insurance plans&lt;/td&gt;
                &lt;td&gt;Healthcare &amp; Social&lt;/td&gt;
                &lt;td&gt;Yes&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;9&lt;/td&gt;
                &lt;td&gt;Medical Appointment Booking&lt;/td&gt;
                &lt;td&gt;Schedule appointments at government healthcare facilities&lt;/td&gt;
                &lt;td&gt;Healthcare &amp; Social&lt;/td&gt;
                &lt;td&gt;Yes&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;10&lt;/td&gt;
                &lt;td&gt;Employment Certificate&lt;/td&gt;
                &lt;td&gt;Request official employment certificates and salary statements&lt;/td&gt;
                &lt;td&gt;Healthcare &amp; Social&lt;/td&gt;
                &lt;td&gt;Yes&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;11&lt;/td&gt;
                &lt;td&gt;Work Permit Processing&lt;/td&gt;
                &lt;td&gt;Apply for work permits and employment authorization&lt;/td&gt;
                &lt;td&gt;Healthcare &amp; Social&lt;/td&gt;
                &lt;td&gt;&#8212;&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;12&lt;/td&gt;
                &lt;td&gt;Retirement Benefits Application&lt;/td&gt;
                &lt;td&gt;Apply for retirement pensions and social security benefits&lt;/td&gt;
                &lt;td&gt;Healthcare &amp; Social&lt;/td&gt;
                &lt;td&gt;&#8212;&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;13&lt;/td&gt;
                &lt;td&gt;Tax Declaration Filing&lt;/td&gt;
                &lt;td&gt;Submit your annual tax returns and manage tax obligations&lt;/td&gt;
                &lt;td&gt;Business &amp; Finance&lt;/td&gt;
                &lt;td&gt;Yes&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;14&lt;/td&gt;
                &lt;td&gt;VAT Registration&lt;/td&gt;
                &lt;td&gt;Register for VAT and manage value-added tax compliance&lt;/td&gt;
                &lt;td&gt;Business &amp; Finance&lt;/td&gt;
                &lt;td&gt;&#8212;&lt;/td&gt;
            &lt;/tr&gt;
            &lt;tr class="nds-page-item"&gt;
                &lt;td&gt;15&lt;/td&gt;
                &lt;td&gt;Business License Application&lt;/td&gt;
                &lt;td&gt;Apply for commercial licenses and business permits&lt;/td&gt;
                &lt;td&gt;Business &amp; Finance&lt;/td&gt;
                &lt;td&gt;&#8212;&lt;/td&gt;
            &lt;/tr&gt;
        &lt;/tbody&gt;
    &lt;/table&gt;
&lt;/div&gt;
&lt;nav class="nds-pagination" data-auto-pagination="pagination_table_body"&gt;&lt;/nav&gt;
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

<!-- Records Counter -->
<section id="paginationRecords" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Records Counter</h2>
            <p class="nds-section-description">A "Showing x to y of z" line that pagination keeps live. Point any element at the paged container with <code class="nds-inline-code lang-html">data-paged-target="id"</code> and mark number slots inside it: the sentence, language, and emphasis stay yours, only the numbers are stamped. With an active <a class="nds-color" href="{{ 'components/filter' | relative_url }}">Filter</a>, the count is the filtered count automatically</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Counter follows page changes</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-results-count" data-paged-target="pagination_records_demo">
                                Showing <b data-paged-from>1</b>&ndash;<b data-paged-to>4</b> of <b data-paged-count>9</b> items
                            </span>
                            <div id="pagination_records_demo" class="nds-paged-content nds-grid"
                                style="--per-page: 4; --max-col: 4; --mid-col: 3; --min-col: 2;">
                                <div class="nds-page-item nds-card nds-stroke">Card 1</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 2</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 3</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 4</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 5</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 6</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 7</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 8</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 9</div>
                            </div>
                            <nav class="nds-pagination" data-auto-pagination="pagination_records_demo" aria-label="Pagination"></nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-records-1" id="tab-pagination-records-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-pagination-records-1"
                                    aria-labelledby="tab-pagination-records-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- Author the sentence; pagination stamps the numbers. Prerender the real
     initial values so the line is correct before JS loads. --&gt;
&lt;span class="nds-results-count" data-paged-target="pagination_records_demo"&gt;
    Showing &lt;b data-paged-from&gt;1&lt;/b&gt;&ndash;&lt;b data-paged-to&gt;4&lt;/b&gt; of &lt;b data-paged-count&gt;9&lt;/b&gt; items
&lt;/span&gt;
&lt;div id="pagination_records_demo" class="nds-paged-content nds-grid"
    style="--per-page: 4; --max-col: 4; --mid-col: 3; --min-col: 2;"&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 1&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 2&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 3&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 4&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 5&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 6&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 7&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 8&lt;/div&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Card 9&lt;/div&gt;
&lt;/div&gt;
&lt;nav class="nds-pagination" data-auto-pagination="pagination_records_demo" aria-label="Pagination"&gt;&lt;/nav&gt;
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

<!-- Per-page picker -->
<section id="paginationPerPage" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Per-page Picker</h2>
            <p class="nds-section-description">Any <code class="nds-inline-code lang-html">nds-dropmenu</code> in <strong>select mode</strong> (<code class="nds-inline-code lang-html">data-select-name</code>) becomes a records-per-page control by adding <code class="nds-inline-code lang-html">data-per-page-target="id"</code>. Each item's <code class="nds-inline-code lang-html">data-value</code> is the new <code class="nds-inline-code lang-html">--per-page</code>. Pagination re-slices the target on selection — same id-ref pattern as <code class="nds-inline-code lang-html">data-auto-pagination</code>. For server-side navs, listen to <code class="nds-inline-code lang-html">nds:dropmenu:selected</code> and drive your own fetch with <code class="nds-inline-code lang-html">NDS.Pagination.updateRecords</code> + <code class="nds-inline-code lang-html">setTotalPages</code></p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Picker rewires --per-page live</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-toolbar">
                                <div class="nds-bar-start">
                                    <div class="nds-dropmenu nds-center"
                                         data-select-name="perPage"
                                         data-select-value="6"
                                         data-per-page-target="pagination_perpage_demo">
                                        <button class="nds-btn nds-secondary-outline nds-md nds-menu-btn nds-dropmenu-trigger" type="button">
                                            <span class="nds-label">6</span>
                                        </button>
                                        <div class="nds-dropmenu-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="6"><span class="nds-label">6</span></button>
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="12"><span class="nds-label">12</span></button>
                                                <button class="nds-btn nds-subtle nds-dropmenu-item" data-value="24"><span class="nds-label">24</span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-bar-end">
                                    <span class="nds-results-count" data-paged-target="pagination_perpage_demo">
                                        Showing <b data-paged-from>1</b>&ndash;<b data-paged-to>6</b> of <b data-paged-count>24</b> items
                                    </span>
                                </div>
                            </div>
                            <div id="pagination_perpage_demo" class="nds-paged-content nds-grid"
                                style="--per-page: 6; --max-col: 3; --mid-col: 2; --min-col: 2;">
                                {% for i in (1..24) %}
                                <div class="nds-page-item nds-card nds-stroke">Item {{ i }}</div>
                                {% endfor %}
                            </div>
                            <nav class="nds-pagination" data-auto-pagination="pagination_perpage_demo" aria-label="Pagination"></nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided">
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-perpage-1" id="tab-pagination-perpage-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-pagination-perpage-1"
                                    aria-labelledby="tab-pagination-perpage-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- Standard dropmenu SELECT MODE + data-per-page-target="id". Set the
     container's inline --per-page to match data-select-value so the first
     paint agrees with the trigger label. --&gt;
&lt;div class="nds-toolbar"&gt;
    &lt;div class="nds-bar-start"&gt;
        &lt;div class="nds-dropmenu nds-center"
             data-select-name="perPage"
             data-select-value="6"
             data-per-page-target="pagination_perpage_demo"&gt;
            &lt;button class="nds-btn nds-secondary-outline nds-md nds-menu-btn nds-dropmenu-trigger" type="button"&gt;
                &lt;span class="nds-label"&gt;6&lt;/span&gt;
            &lt;/button&gt;
            &lt;div class="nds-dropmenu-menu" hidden&gt;
                &lt;div class="nds-dropmenu-scroll"&gt;
                    &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-value="6"&gt;&lt;span class="nds-label"&gt;6&lt;/span&gt;&lt;/button&gt;
                    &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-value="12"&gt;&lt;span class="nds-label"&gt;12&lt;/span&gt;&lt;/button&gt;
                    &lt;button class="nds-btn nds-subtle nds-dropmenu-item" data-value="24"&gt;&lt;span class="nds-label"&gt;24&lt;/span&gt;&lt;/button&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-bar-end"&gt;
        &lt;span class="nds-results-count" data-paged-target="pagination_perpage_demo"&gt;
            Showing &lt;b data-paged-from&gt;1&lt;/b&gt;&ndash;&lt;b data-paged-to&gt;6&lt;/b&gt; of &lt;b data-paged-count&gt;24&lt;/b&gt; items
        &lt;/span&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;div id="pagination_perpage_demo" class="nds-paged-content nds-grid" style="--per-page: 6;"&gt;
    &lt;div class="nds-page-item nds-card nds-stroke"&gt;Item 1&lt;/div&gt;
    &lt;!-- … --&gt;
&lt;/div&gt;
&lt;nav class="nds-pagination" data-auto-pagination="pagination_perpage_demo" aria-label="Pagination"&gt;&lt;/nav&gt;
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

<!-- Built-in Features -->
<section id="paginationFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Scans for <code class="nds-inline-code lang-html">nds-pagination</code> elements on the page. Active states, disabled buttons, and ellipsis collapse configure themselves from the markup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-more-horizontal"></i>
                        <span class="nds-label">Ellipsis Collapse</span>
                    </span>
                    <p class="nds-item-desc">Paginations with more than five pages collapse middle pages into a dropdown menu, keeping the first three and last page visible. The collapse is live: add or remove page buttons and the nav re-collapses or expands to match.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01"></i>
                        <span class="nds-label">Content Pagination</span>
                    </span>
                    <p class="nds-item-desc">Point a <code class="nds-inline-code lang-html">nds-pagination</code> nav at a <code class="nds-inline-code lang-html">nds-paged-content</code> container with <code class="nds-inline-code lang-html">data-auto-pagination="id"</code> and the pagination controls, page visibility, and scroll behavior are handled automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-refresh"></i>
                        <span class="nds-label">Live Content Updates</span>
                    </span>
                    <p class="nds-item-desc">Add or remove <code class="nds-inline-code lang-html">nds-page-item</code> elements at runtime and the pages recalculate automatically, keeping the current page, at any nesting including table rows. Filtered content stays in sync with no manual call.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mobile-programming-01"></i>
                        <span class="nds-label">Responsive Adaptation</span>
                    </span>
                    <p class="nds-item-desc">Buttons shrink on mobile viewports and content pagination watches for <code class="nds-inline-code lang-html">--per-page</code> changes on resize, rebuilding pages to match the new layout.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Navigate to any page, refresh after content changes, or create new pagination instances through the <code class="nds-inline-code lang-js">NDS.Pagination</code> API.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="paginationGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <strong>content pagination</strong> (<code class="nds-inline-code lang-html">data-auto-pagination</code>) for items already in the DOM: card grids, table rows, or list items</li>
                    <li>Use <strong>manual pagination</strong> when each page number links to a different URL or triggers a server-side request</li>
                    <li>Use <strong>data-driven generation</strong> (<code class="nds-inline-code lang-html">data-total-pages</code>) when you know the page count but want the component to build the controls. Default controls are buttons you drive through <code class="nds-inline-code lang-js">nds:pagination:change</code> (SPA); add <code class="nds-inline-code lang-html">data-page-url="?page={page}"</code> to emit navigable links for no-JS full-reload server pagination. For a runtime count change, call <code class="nds-inline-code lang-js">NDS.Pagination.setTotalPages()</code></li>
                    <li>Do not paginate fewer than two pages. Auto-pagination hides controls automatically when all items fit</li>
                    <li>Set <code class="nds-inline-code lang-html">--per-page</code> to match your grid column count so each page fills the layout. Update it in media queries for responsive grids</li>
                    <li>For tables, put <code class="nds-inline-code lang-html">nds-paged-content</code> on the <code class="nds-inline-code lang-html">&lt;tbody&gt;</code> itself and add <code class="nds-inline-code lang-html">nds-page-item</code> on each <code class="nds-inline-code lang-html">&lt;tr&gt;</code>. A wrapper around the table would be hidden until pagination initializes; the tbody shows its skeleton rows instead</li>
                    <li>Both <code class="nds-inline-code lang-html">&lt;button&gt;</code> and <code class="nds-inline-code lang-html">&lt;a&gt;</code> elements work inside pagination items. Use buttons for client-side navigation, anchors for distinct URLs</li>
                    <li>Bind a nav to its content by id — <code class="nds-inline-code lang-html">data-auto-pagination="gridId"</code> matching the wrapper's <code class="nds-inline-code lang-html">id</code> (the same convention as filter's <code class="nds-inline-code lang-html">data-filter-target</code>). Omit the value to bind the immediately-preceding wrapper instead</li>
                    <li>Keep <code class="nds-inline-code lang-html">nds-page-item</code> (your <strong>content</strong> items) distinct from <code class="nds-inline-code lang-html">nds-pagination-item</code> (the nav's <code class="nds-inline-code lang-html">&lt;li&gt;</code> controls) — similar names, opposite roles</li>
                    <li>For server or AJAX pagination, listen for <code class="nds-inline-code lang-js">nds:pagination:change</code> (its <code class="nds-inline-code lang-js">detail.page</code> is the resolved page), load that page, then call <code class="nds-inline-code lang-js">NDS.Pagination.setPage()</code> to highlight it (calling it once the response lands also scrolls the content back into view, with no delay to guess). When a new query changes the total page count, call <code class="nds-inline-code lang-js">NDS.Pagination.setTotalPages()</code> to rebuild the controls (it keeps the current page; pass a page number to jump). NDS owns the nav UI, you own the data</li>
                    <li>Attach your logic to the nav, not to individual page buttons: listen for <code class="nds-inline-code lang-js">nds:pagination:change</code> or give each page a distinct <code class="nds-inline-code lang-html">&lt;a href&gt;</code>. Collapsing rebuilds the page buttons, so custom classes, <code class="nds-inline-code lang-html">data-*</code> attributes, <code class="nds-inline-code lang-html">href</code>, and inline <code class="nds-inline-code lang-html">onclick</code> survive, but a listener added with <code class="nds-inline-code lang-js">addEventListener</code> on a button does not</li>
                    <li>For content pagination, adding or removing <code class="nds-inline-code lang-html">nds-page-item</code> elements re-paginates automatically and keeps the current page, no re-init needed, at any nesting (cards, list items, table rows). A wholesale content swap that injects a brand-new nav (e.g. a filter's AJAX HTML mode) still needs <code class="nds-inline-code lang-js">NDS.Pagination.reinit()</code>, or have the server return it already paginated</li>
                    <li>Don't paginate a continuously growing feed. Use <a class="nds-color" href="{{ 'components/scroll-more' | relative_url }}">Scroll More</a> for load-on-scroll content where the total count isn't fixed</li>
                    <li>Don't use pagination for a linear, must-finish-in-order flow like a form wizard. Reach for <a class="nds-color" href="{{ 'components/stepper' | relative_url }}">Stepper</a> instead</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Applied to</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-md</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-pagination</code></td>
                            <td>Medium size, 32px buttons</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-sm</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-pagination</code></td>
                            <td>Small size, 24px buttons</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-paged-content</code></td>
                            <td>Content wrapper</td>
                            <td>Marks a container whose <code class="nds-inline-code lang-html">nds-page-item</code> children should be paginated. On a table it goes on the <code class="nds-inline-code lang-html">&lt;tbody&gt;</code>, not a wrapper</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-page-item</code></td>
                            <td>Content children</td>
                            <td>Marks individual <strong>content</strong> items (cards, rows, list items) to be paginated. Not to be confused with <code class="nds-inline-code lang-html">nds-pagination-item</code> below</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-pagination-list</code></td>
                            <td>Nav</td>
                            <td>The <code class="nds-inline-code lang-html">&lt;ul&gt;</code> inside <code class="nds-inline-code lang-html">.nds-pagination</code> that holds the page controls</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-pagination-item</code></td>
                            <td>Nav children</td>
                            <td>An <code class="nds-inline-code lang-html">&lt;li&gt;</code> control in the nav (a page number or prev/next) — the <strong>navigation</strong> counterpart to <code class="nds-inline-code lang-html">nds-page-item</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-auto-pagination="id"</code></td>
                            <td>Add to <code class="nds-inline-code lang-html">nds-pagination</code> to auto-paginate the <code class="nds-inline-code lang-html">nds-paged-content</code> container with that id. The value is optional — omit it to bind the immediately-preceding container instead</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-total-pages="N"</code></td>
                            <td>Set on an empty <code class="nds-inline-code lang-html">nds-pagination</code> to auto-generate N page controls. Optionally add <code class="nds-inline-code lang-html">data-active-page="N"</code> for the initial active page (read once at init; defaults to 1). For a count that changes at runtime, call <code class="nds-inline-code lang-js">NDS.Pagination.setTotalPages()</code></td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-page-url="?page={page}"</code></td>
                            <td>Pair with <code class="nds-inline-code lang-html">data-total-pages</code> to render the controls as navigable <code class="nds-inline-code lang-html">&lt;a href&gt;</code> links instead of buttons: <code class="nds-inline-code lang-html">{page}</code> is replaced with each page number. Use for no-JS, full-reload server pagination (the nav re-renders on each navigation). Without it the controls are buttons you wire through <code class="nds-inline-code lang-js">nds:pagination:change</code></td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-state="active"</code></td>
                            <td>Set on a page button to mark it as the current page. Updated automatically on navigation</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-pagination-no-scroll</code></td>
                            <td>Add to <code class="nds-inline-code lang-html">nds-pagination</code> to stop a page change from scrolling the content back into view. Scrolling is on by default and already skips itself when the content sits below the sticky nav. Opt out when you want to decide per page change, then call <code class="nds-inline-code lang-js">NDS.Pagination.scrollToContent()</code> yourself</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-paged-target="id"</code></td>
                            <td>Set on any element to make it a records counter for the paged container with that id. Inside it, pagination stamps the current window and count into <code class="nds-inline-code lang-html">[data-paged-from]</code>, <code class="nds-inline-code lang-html">[data-paged-to]</code>, and <code class="nds-inline-code lang-html">[data-paged-count]</code> slots, with thousand separators. Auto-pagination only; for server pagination stamp the slots via <code class="nds-inline-code lang-js">NDS.Pagination.updateRecords()</code></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--pagination-margin-top</code></td>
                            <td><code class="nds-inline-code lang-html">var(--spacing-2xl)</code></td>
                            <td>Space above the pagination nav</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--per-page</code></td>
                            <td><code class="nds-inline-code lang-html">5</code></td>
                            <td>Items per page in auto-pagination. Set on the <code class="nds-inline-code lang-html">nds-paged-content</code> container</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--pagination-scroll-offset</code></td>
                            <td><code class="nds-inline-code lang-html">120</code></td>
                            <td>Gap in px between the sticky nav and the content top when a page change scrolls it into view. Set on the <code class="nds-inline-code lang-html">nds-pagination</code> nav</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// Initialize all pagination on the page
NDS.Pagination.init();

// Re-initialize after injecting a whole new nav (manual + auto)
NDS.Pagination.reinit();

// Initialize auto-pagination (data-auto-pagination + nds-paged-content)
NDS.Pagination.initAuto();

// Create a single pagination instance
const instance = NDS.Pagination.create(element);

// Navigate to a specific page. Scrolls the content back into view unless the nav
// carries data-pagination-no-scroll.
NDS.Pagination.setPage(containerElement, 3);

// Scroll the paged content back under the sticky nav. Ignores
// data-pagination-no-scroll: the explicit call is the intent. No-ops when the
// content already sits below the nav, so it stays quiet on wide screens.
NDS.Pagination.scrollToContent(navElement);

// Opting out lets you decide per page change, e.g. skip the scroll on a failed
// request so the user keeps looking at the error instead of an empty grid.
document.addEventListener('nds:pagination:change', async (e) => {
  const res = await fetch(`/orders?page=${e.detail.page}`);
  if (!res.ok) return showError();
  renderRows(await res.json());
  NDS.Pagination.setPage(e.detail.pagination, e.detail.page);
  NDS.Pagination.scrollToContent(e.detail.pagination);
});

// Auto-pagination re-paginates on its own when nds-page-item elements are
// added or removed (current page kept), no call needed. Use refresh() only to
// force a recalculation, e.g. after filtering:
NDS.Pagination.refresh(contentContainer);                     // reset to page 1
NDS.Pagination.refresh(contentContainer, { keepPage: true }); // stay on current page

// Manual / data-driven: when the server's total page count changes, rebuild the
// nav controls. Keeps the current page by default; pass a page number to jump.
NDS.Pagination.setTotalPages(navElement, 12);    // keep current page (clamped)
NDS.Pagination.setTotalPages(navElement, 12, 1); // jump to page 1

// Records counter, server pagination: stamp your own numbers through the same
// [data-paged-target] slots the auto path fills (auto fills them by itself).
NDS.Pagination.updateRecords('ordersList', { from: 21, to: 30, count: 1248 });

// Tear down a removed nav (SPA): releases listeners and clears init state
NDS.Pagination.destroy(navElement);

// Listen for page changes (auto + manual). NDS owns the nav UI; you own the data.
document.addEventListener('nds:pagination:change', (e) => {
  const { page, previousPage, totalPages, pagination } = e.detail; // pagination = the nav element
  // fetch/render page `page` from your backend (server / AJAX pagination)
});
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
