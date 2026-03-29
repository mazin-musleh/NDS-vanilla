---
layout: page
title: Pagination
hero_title: Pagination - National Design System
hero_description: Navigate large data sets with numbered page controls, or automatically split grids, lists, and tables into pages with built-in content management
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Standard Pagination -->
<section id="paginationStandard" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard Pagination</h2>
            <p class="nds-section-description">Numbered page controls with previous and next arrows for stepping through content</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Manual Markup</div>
                        <div class="demo-action">
                            <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-pagination-nav" aria-label="Pagination">
                                <ul class="nds-pagination">
                                    <li class="nds-pagination-item nds-pagination-prev">
                                        <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Previous page" disabled>
                                            <i class="hgi hgi-stroke hgi-arrow-right-01"></i>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" data-state="active" aria-current="page" aria-label="Page 1">
                                            <span class="label">1</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 2">
                                            <span class="label">2</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 3">
                                            <span class="label">3</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 4">
                                            <span class="label">4</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 5">
                                            <span class="label">5</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item nds-pagination-next">
                                        <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Next page">
                                            <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-standard-1" id="tab-pagination-standard-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-pagination-standard-1"
                                    aria-labelledby="tab-pagination-standard-1">
                                    <div class="nds-code-action">
                                        <button type="button" class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<nav class="nds-pagination-nav" aria-label="Pagination">
    <ul class="nds-pagination">
        <li class="nds-pagination-item nds-pagination-prev">
            <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Previous page" disabled>
                <i class="hgi hgi-stroke hgi-arrow-right-01"></i>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" data-state="active" aria-current="page" aria-label="Page 1">
                <span class="label">1</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 2">
                <span class="label">2</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 3">
                <span class="label">3</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 4">
                <span class="label">4</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 5">
                <span class="label">5</span>
            </button>
        </li>
        <li class="nds-pagination-item nds-pagination-next">
            <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Next page">
                <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
            </button>
        </li>
    </ul>
</nav>
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Data-Driven Generation</div>
                        <div class="demo-action">
                            <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-pagination-nav" data-total-pages="8" data-active-page="1" aria-label="Pagination"></nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-datadriven-1" id="tab-pagination-datadriven-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-pagination-datadriven-1"
                                    aria-labelledby="tab-pagination-datadriven-1">
                                    <div class="nds-code-action">
                                        <button type="button" class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<nav class="nds-pagination-nav" data-total-pages="8" data-active-page="1" aria-label="Pagination"></nav>
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
<section id="paginationEllipsis" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Automatic Ellipsis Collapse</h2>
            <p class="nds-section-description">When page count exceeds five, middle pages collapse into a dropdown for compact navigation</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-pagination-nav" aria-label="Pagination">
                                <ul class="nds-pagination">
                                    <li class="nds-pagination-item nds-pagination-prev">
                                        <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Previous page">
                                            <i class="hgi hgi-stroke hgi-arrow-right-01"></i>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 1">
                                            <span class="label">1</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 2">
                                            <span class="label">2</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 3">
                                            <span class="label">3</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 4">
                                            <span class="label">4</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" data-state="active" aria-current="page" aria-label="Page 5">
                                            <span class="label">5</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 6">
                                            <span class="label">6</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 7">
                                            <span class="label">7</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 8">
                                            <span class="label">8</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 9">
                                            <span class="label">9</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 10">
                                            <span class="label">10</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item nds-pagination-next">
                                        <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Next page">
                                            <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-ellipsis-1" id="tab-pagination-ellipsis-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-pagination-ellipsis-1"
                                    aria-labelledby="tab-pagination-ellipsis-1">
                                    <div class="nds-code-action">
                                        <button type="button" class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<nav class="nds-pagination-nav" aria-label="Pagination">
    <ul class="nds-pagination">
        <li class="nds-pagination-item nds-pagination-prev">
            <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Previous page">
                <i class="hgi hgi-stroke hgi-arrow-right-01"></i>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 1">
                <span class="label">1</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 2">
                <span class="label">2</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 3">
                <span class="label">3</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 4">
                <span class="label">4</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" data-state="active" aria-current="page" aria-label="Page 5">
                <span class="label">5</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 6">
                <span class="label">6</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 7">
                <span class="label">7</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 8">
                <span class="label">8</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 9">
                <span class="label">9</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 10">
                <span class="label">10</span>
            </button>
        </li>
        <li class="nds-pagination-item nds-pagination-next">
            <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Next page">
                <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
            </button>
        </li>
    </ul>
</nav>
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

<!-- Content Pagination -->
<section id="paginationContent" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Content Pagination</h2>
            <p class="nds-section-description">Automatically paginate grids, lists, and tables by marking items with <code class="nds-inline-code lang-html">nds-page-item</code> and placing an <code class="nds-inline-code lang-html">nds-auto-pagination</code> nav after the content container</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Paginated Grid</div>
                        <div class="demo-action">
                            <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-paged-content nds-grid"
                                style="--per-page: 4; --max-col: 4; --mid-col: 3; --min-col: 2;">
                                <div class="nds-page-item nds-card nds-stroke">Card 1</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 2</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 3</div>
                                <div class="nds-page-item nds-card nds-stroke">Card 4</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 5</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 6</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 7</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 8</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 9</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 10</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 11</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 12</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 13</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 14</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 15</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 16</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 17</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 18</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 19</div>
                                <div class="nds-page-item nds-card nds-stroke" hidden>Card 20</div>
                            </div>
                            <nav class="nds-pagination-nav nds-auto-pagination" aria-label="Pagination"></nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-grid-1" id="tab-pagination-grid-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-pagination-grid-1"
                                    aria-labelledby="tab-pagination-grid-1">
                                    <div class="nds-code-action">
                                        <button type="button" class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-paged-content nds-grid"
    style="--per-page: 4; --max-col: 4; --mid-col: 3; --min-col: 2;">
    <div class="nds-page-item nds-card nds-stroke">Card 1</div>
    <div class="nds-page-item nds-card nds-stroke">Card 2</div>
    <div class="nds-page-item nds-card nds-stroke">Card 3</div>
    <div class="nds-page-item nds-card nds-stroke">Card 4</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 5</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 6</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 7</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 8</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 9</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 10</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 11</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 12</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 13</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 14</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 15</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 16</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 17</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 18</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 19</div>
    <div class="nds-page-item nds-card nds-stroke" hidden>Card 20</div>
</div>
<nav class="nds-pagination-nav nds-auto-pagination" aria-label="Pagination"></nav>
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Paginated Table</div>
                        <div class="demo-action">
                            <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-table-wrapper nds-paged-content" style="--max-width: 100%; --per-page: 5;">
                                <table class="nds-table nds-sortable">
                                    <thead>
                                        <tr>
                                            <th class="nds-sortable-col">
                                                <button class="nds-sort-header nds-btn" data-sort-type="number">#<span class="nds-sort-icon">&#8597;</span></button>
                                            </th>
                                            <th class="nds-sortable-col">
                                                <button class="nds-sort-header nds-btn" data-sort-type="string">Service<span class="nds-sort-icon">&#8597;</span></button>
                                            </th>
                                            <th>Description</th>
                                            <th class="nds-sortable-col">
                                                <button class="nds-sort-header nds-btn" data-sort-type="string">System<span class="nds-sort-icon">&#8597;</span></button>
                                            </th>
                                            <th>Most Used</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {% for service in site.data.content.services %}
                                        <tr class="nds-page-item" hidden>
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
                            <nav class="nds-auto-pagination"></nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-table-1" id="tab-pagination-table-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-pagination-table-1"
                                    aria-labelledby="tab-pagination-table-1">
                                    <div class="nds-code-action">
                                        <button type="button" class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-table-wrapper nds-paged-content" style="--max-width: 100%; --per-page: 5;">
    <table class="nds-table">
        <thead>
            <tr>
                <th>#</th>
                <th>Service</th>
                <th>Description</th>
                <th>System</th>
                <th>Most Used</th>
            </tr>
        </thead>
        <tbody>
            <tr class="nds-page-item" hidden>
                <td>1</td>
                <td>Identity Verification</td>
                <td>Verify your national identity and obtain digital certificates</td>
                <td>Identity &amp; Records</td>
                <td>Yes</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>2</td>
                <td>Passport Renewal</td>
                <td>Renew your passport online with expedited processing</td>
                <td>Identity &amp; Records</td>
                <td>Yes</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>3</td>
                <td>Birth Certificate Request</td>
                <td>Request official birth certificates and family documentation</td>
                <td>Identity &amp; Records</td>
                <td>&#8212;</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>4</td>
                <td>Marriage Contract Registration</td>
                <td>Register marriage contracts and obtain official certificates</td>
                <td>Identity &amp; Records</td>
                <td>&#8212;</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>5</td>
                <td>Driver's License Services</td>
                <td>Apply for, renew, or update your driving license</td>
                <td>Transport &amp; Vehicles</td>
                <td>Yes</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>6</td>
                <td>Vehicle Registration</td>
                <td>Register new vehicles, transfer ownership, or renew registration</td>
                <td>Transport &amp; Vehicles</td>
                <td>Yes</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>7</td>
                <td>Visa Application</td>
                <td>Apply for entry visas for visitors, workers, or family members</td>
                <td>Transport &amp; Vehicles</td>
                <td>&#8212;</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>8</td>
                <td>Health Insurance Enrollment</td>
                <td>Enroll in government health insurance plans</td>
                <td>Healthcare &amp; Social</td>
                <td>Yes</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>9</td>
                <td>Medical Appointment Booking</td>
                <td>Schedule appointments at government healthcare facilities</td>
                <td>Healthcare &amp; Social</td>
                <td>Yes</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>10</td>
                <td>Employment Certificate</td>
                <td>Request official employment certificates and salary statements</td>
                <td>Healthcare &amp; Social</td>
                <td>Yes</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>11</td>
                <td>Work Permit Processing</td>
                <td>Apply for work permits and employment authorization</td>
                <td>Healthcare &amp; Social</td>
                <td>&#8212;</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>12</td>
                <td>Retirement Benefits Application</td>
                <td>Apply for retirement pensions and social security benefits</td>
                <td>Healthcare &amp; Social</td>
                <td>&#8212;</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>13</td>
                <td>Tax Declaration Filing</td>
                <td>Submit your annual tax returns and manage tax obligations</td>
                <td>Business &amp; Finance</td>
                <td>Yes</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>14</td>
                <td>VAT Registration</td>
                <td>Register for VAT and manage value-added tax compliance</td>
                <td>Business &amp; Finance</td>
                <td>&#8212;</td>
            </tr>
            <tr class="nds-page-item" hidden>
                <td>15</td>
                <td>Business License Application</td>
                <td>Apply for commercial licenses and business permits</td>
                <td>Business &amp; Finance</td>
                <td>&#8212;</td>
            </tr>
        </tbody>
    </table>
</div>
<nav class="nds-auto-pagination"></nav>
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

<!-- Sizes -->
<section id="paginationSizes" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Pagination Sizes</h2>
            <p class="nds-section-description">Three size options to fit different layout densities and content areas</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                    <span class="label">Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='["", ".nds-pagination", "paginationSize"]'>
                                            <span class="label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-pagination", "paginationSize"]'>
                                            <span class="label">Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-pagination", "paginationSize"]'>
                                            <span class="label">Large</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-pagination-nav" aria-label="Pagination">
                                <ul class="nds-pagination">
                                    <li class="nds-pagination-item nds-pagination-prev">
                                        <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Previous page" disabled>
                                            <i class="hgi hgi-stroke hgi-arrow-right-01"></i>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" data-state="active" aria-current="page" aria-label="Page 1">
                                            <span class="label">1</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 2">
                                            <span class="label">2</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 3">
                                            <span class="label">3</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 4">
                                            <span class="label">4</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 5">
                                            <span class="label">5</span>
                                        </button>
                                    </li>
                                    <li class="nds-pagination-item nds-pagination-next">
                                        <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Next page">
                                            <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-pagination-sizes-1" id="tab-pagination-sizes-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-pagination-sizes-1"
                                    aria-labelledby="tab-pagination-sizes-1">
                                    <div class="nds-code-action">
                                        <button type="button" class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<nav class="nds-pagination-nav" aria-label="Pagination">
    <ul class="nds-pagination">
        <li class="nds-pagination-item nds-pagination-prev">
            <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Previous page" disabled>
                <i class="hgi hgi-stroke hgi-arrow-right-01"></i>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" data-state="active" aria-current="page" aria-label="Page 1">
                <span class="label">1</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 2">
                <span class="label">2</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 3">
                <span class="label">3</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 4">
                <span class="label">4</span>
            </button>
        </li>
        <li class="nds-pagination-item">
            <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 5">
                <span class="label">5</span>
            </button>
        </li>
        <li class="nds-pagination-item nds-pagination-next">
            <button type="button" class="nds-btn nds-subtle nds-icon-only" aria-label="Next page">
                <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
            </button>
        </li>
    </ul>
</nav>
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
<section id="paginationFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-content">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket icon"></i>
                        <span class="label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Activates when <code class="nds-inline-code lang-html">nds-pagination-nav</code> or <code class="nds-inline-code lang-html">nds-pagination</code> is on the page. Active states and disabled buttons configure themselves from the markup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-more-horizontal icon"></i>
                        <span class="label">Ellipsis Collapse</span>
                    </span>
                    <p class="nds-item-desc">Paginations with more than five pages automatically collapse middle pages into a dropdown menu, keeping the first three and last page visible.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01 icon"></i>
                        <span class="label">Content Pagination</span>
                    </span>
                    <p class="nds-item-desc">Add <code class="nds-inline-code lang-html">nds-auto-pagination</code> after any <code class="nds-inline-code lang-html">nds-paged-content</code> container and the pagination controls, page visibility, and scroll behavior are handled automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-filter icon"></i>
                        <span class="label">Filter-Aware Refresh</span>
                    </span>
                    <p class="nds-item-desc">When used with filtered content, call <code class="nds-inline-code lang-js">NDS.Pagination.refresh()</code> to recalculate page counts and reset to page one with only visible items.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mobile-programming-01 icon"></i>
                        <span class="label">Responsive Adaptation</span>
                    </span>
                    <p class="nds-item-desc">Buttons shrink on mobile viewports and content pagination watches for <code class="nds-inline-code lang-html">--per-page</code> changes on resize, rebuilding pages to match the new layout.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api icon"></i>
                        <span class="label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Navigate to any page, refresh after content changes, or create new pagination instances through the <code class="nds-inline-code lang-js">NDS.Pagination</code> API.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="paginationGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-content">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <strong>content pagination</strong> (<code class="nds-inline-code lang-html">nds-auto-pagination</code>) when you have a known set of items already in the DOM: card grids, table rows, or list items. The component handles visibility, page generation, and scrolling</li>
                    <li>Use <strong>manual pagination</strong> when page navigation is handled server-side or by a router, and each page number links to a different URL or triggers an API call</li>
                    <li>Use <strong>data-driven generation</strong> (<code class="nds-inline-code lang-html">data-total-pages</code>) when you know the page count but want the component to build the controls for you. Pair with your own click handler for server-side data loading</li>
                    <li>Do not use pagination for fewer than two pages. If items fit on a single page, hide the pagination entirely or let the component handle it (auto-pagination removes controls when all items fit)</li>
                    <li>Do not use pagination when users need to compare items across pages. Consider a <a class="nds-color" href="{{ 'components/filter' | relative_url }}">Filter</a> to narrow results, or an expandable list that loads more items in place</li>
                    <li>Choose <code class="nds-inline-code lang-html">nds-sm</code> for compact areas like card footers or side panels. Use <code class="nds-inline-code lang-html">nds-lg</code> for standalone data views where the pagination is the primary navigation</li>
                    <li>Set <code class="nds-inline-code lang-html">--per-page</code> to match your grid column count so each page fills the layout completely. For responsive grids, update <code class="nds-inline-code lang-html">--per-page</code> in your media queries and the pagination will rebuild automatically</li>
                    <li>Keep page counts reasonable. Prefer 5 to 20 pages. If content produces hundreds of pages, add filtering or search to reduce the set before paginating</li>
                    <li>For tables, place the <code class="nds-inline-code lang-html">nds-auto-pagination</code> nav immediately after the <code class="nds-inline-code lang-html">nds-table-wrapper</code>. The <code class="nds-inline-code lang-html">nds-page-item</code> class goes on each <code class="nds-inline-code lang-html">&lt;tr&gt;</code> in the <code class="nds-inline-code lang-html">&lt;tbody&gt;</code></li>
                    <li>Both <code class="nds-inline-code lang-html">&lt;button&gt;</code> and <code class="nds-inline-code lang-html">&lt;a&gt;</code> elements are supported inside pagination items. Use buttons for client-side page changes and anchors when each page has a distinct URL</li>
                </ul>
            </div>

            <div class="nds-content-block">
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
                            <td><code class="nds-inline-code lang-html">nds-sm</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-pagination</code></td>
                            <td>Compact 32px buttons with smaller font size</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-lg</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-pagination</code></td>
                            <td>Large 48px buttons with larger font size</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-pagination-prev</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-pagination-item</code></td>
                            <td>Marks the list item as the previous page button</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-pagination-next</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-pagination-item</code></td>
                            <td>Marks the list item as the next page button</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-indicator</code></td>
                            <td>Page <code class="nds-inline-code lang-html">.nds-btn</code></td>
                            <td>Adds the active-state underline indicator to page buttons</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-auto-pagination</code></td>
                            <td><code class="nds-inline-code lang-html">&lt;nav&gt;</code></td>
                            <td>Enables content-based auto-pagination when placed after an <code class="nds-inline-code lang-html">nds-paged-content</code> container</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-paged-content</code></td>
                            <td>Content wrapper</td>
                            <td>Marks a container whose <code class="nds-inline-code lang-html">nds-page-item</code> children should be paginated</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-page-item</code></td>
                            <td>Content children</td>
                            <td>Marks individual items (cards, rows, list items) as pageable content</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
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
                            <td><code class="nds-inline-code lang-html">data-total-pages="N"</code></td>
                            <td>Set on an empty <code class="nds-inline-code lang-html">nds-pagination-nav</code> to auto-generate N page buttons with prev/next controls</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-active-page="N"</code></td>
                            <td>Set alongside <code class="nds-inline-code lang-html">data-total-pages</code> to mark page N as the initially active page (defaults to 1)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-state="active"</code></td>
                            <td>Set on a page button to mark it as the current page. Updated automatically by the component on navigation</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
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
                            <td>Space above the pagination nav. Override on <code class="nds-inline-code lang-html">.nds-pagination-nav</code> to adjust spacing from content</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--per-page</code></td>
                            <td><code class="nds-inline-code lang-html">5</code></td>
                            <td>Number of items visible per page in auto-pagination. Set on the <code class="nds-inline-code lang-html">nds-paged-content</code> container via inline style or CSS</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <code class="nds-inline-code lang-js">NDS.Pagination</code> API provides methods to initialize, create, refresh, and navigate pagination instances. For dynamically added pagination markup, call <code class="nds-inline-code lang-js">NDS.Pagination.init()</code> to initialize new instances.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialize pagination ───────────────────────────
// Scans for .nds-pagination-nav and .nds-pagination elements
// Handles data-total-pages auto-generation and ellipsis collapse
NDS.Pagination.init();

// ── Initialize auto-pagination ──────────────────────
// Scans for .nds-auto-pagination elements paired with
// .nds-paged-content containers. Builds page controls
// and manages item visibility automatically
NDS.Pagination.initAuto();

// ── Create a single instance ────────────────────────
// Returns an NDSPagination instance for the given element
const instance = NDS.Pagination.create(element);

// ── Navigate to a specific page ─────────────────────
// Updates active state, prev/next disabled states,
// and aria-current on the target pagination container
NDS.Pagination.setPage(containerElement, 3);

// ── Refresh after filtering ─────────────────────────
// Recalculates page count based on visible items
// (skips items with data-filtered or nds-filtered-out)
// Resets to page 1 and rebuilds controls
NDS.Pagination.refresh(contentContainer);
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
