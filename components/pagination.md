---
layout: page
title: Pagination
hero_title: Pagination Component - National Design System
hero_description: Navigation component for paginated content with button indicators
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Pagination Basic Demo -->
<section id="paginationBasic" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Basic Pagination</h2>
            <p class="nds-section-description">Standard pagination with numbered pages and navigation controls</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Default Pagination</div>
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
                            <ul class="nds-pagination" data-total-pages="10" data-active-page="1">
                                <li class="nds-pagination-item nds-pagination-prev">
                                    <a href="#" class="nds-btn nds-subtle nds-prev nds-icon-only" aria-label="Previous page">
                                    </a>
                                </li>
                                <li class="nds-pagination-item">
                                    <a href="#" class="nds-btn nds-subtle nds-indicator active" aria-current="page"
                                        aria-label="Page 1">
                                        <span class="label">1</span>
                                    </a>
                                </li>
                                <li class="nds-pagination-item">
                                    <a href="#" class="nds-btn nds-subtle nds-indicator" aria-label="Page 2">
                                        <span class="label">2</span>
                                    </a>
                                </li>
                                <li class="nds-pagination-item">
                                    <a href="#" class="nds-btn nds-subtle nds-indicator" aria-label="Page 3">
                                        <span class="label">3</span>
                                    </a>
                                </li>
                                <li class="nds-pagination-item">
                                    <a href="#" class="nds-btn nds-subtle nds-indicator" aria-label="Page 4">
                                        <span class="label">4</span>
                                    </a>
                                </li>
                                <li class="nds-pagination-item">
                                    <a href="#" class="nds-btn nds-subtle nds-indicator" aria-label="Page 5">
                                        <span class="label">5</span>
                                    </a>
                                </li>
                                <li class="nds-pagination-item nds-pagination-next">
                                    <a href="#" class="nds-btn nds-subtle nds-next nds-icon-only" aria-label="Next page">
                                    </a>
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
                                aria-controls="panel-basic-1" id="tab-basic-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-basic-1"
                            aria-labelledby="tab-basic-1">
                            <div class="nds-code-action">
                                <button type="button" class="nds-btn nds-subtle copy-btn"
                                    aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <nav class="nds-pagination-nav" aria-label="Pagination">
                                    <ul class="nds-pagination">
                                        <li class="nds-pagination-item nds-pagination-prev">
                                        <button type="button" class="nds-btn nds-subtle nds-prev nds-icon-only" aria-label="Previous page">
                                        </button>
                                        </li>
                                        <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator" aria-label="Page 1">
                                            <span class="label">1</span>
                                        </button>
                                        </li>
                                        <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator active" aria-current="page">
                                            <span class="label">2</span>
                                        </button>
                                        </li>
                                        <!-- More page numbers -->
                                        <li class="nds-pagination-item nds-pagination-next">
                                        <button type="button" class="nds-btn nds-subtle nds-next nds-icon-only" aria-label="Next page">
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
                    <div class="demo-label">Automatic Ellipsis with Dropdown (7+ pages)</div>
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
                                    <button type="button" class="nds-btn nds-subtle nds-prev nds-icon-only" aria-label="Previous page">
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
                                    <button type="button" class="nds-btn nds-subtle nds-indicator active"
                                        aria-current="page" aria-label="Page 5, current page">
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
                                    <button type="button" class="nds-btn nds-subtle nds-next nds-icon-only" aria-label="Next page">
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
                                aria-controls="panel-ellipsis-1" id="tab-ellipsis-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-ellipsis-1"
                            aria-labelledby="tab-ellipsis-1">
                            <div class="nds-code-action">
                                <button type="button" class="nds-btn nds-subtle copy-btn"
                                    aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <!-- Just add 8+ pages, JavaScript automatically creates dropdowns -->
                                <nav class="nds-pagination-nav" aria-label="Pagination">
                                    <ul class="nds-pagination">
                                        <li class="nds-pagination-item nds-pagination-prev">
                                        <button type="button" class="nds-btn nds-subtle nds-prev nds-icon-only">
                                        </button>
                                        </li>
                                        <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator">
                                            <span class="label">1</span>
                                        </button>
                                        </li>
                                        <!-- Add pages 2-9 -->
                                        <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator active" aria-current="page">
                                            <span class="label">5</span>
                                        </button>
                                        </li>
                                        <!-- More pages -->
                                        <li class="nds-pagination-item">
                                        <button type="button" class="nds-btn nds-subtle nds-indicator">
                                            <span class="label">10</span>
                                        </button>
                                        </li>
                                        <li class="nds-pagination-item nds-pagination-next">
                                        <button type="button" class="nds-btn nds-subtle nds-next nds-icon-only">
                                        </button>
                                        </li>
                                    </ul>
                                </nav>

                                <!-- JavaScript automatically converts to: 1 ... 4 5 6 ... 10 -->
                            </code>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Auto-Generated Pagination (20 items, 4 per page)</div>
                    <div class="demo-action">
                        <button type="button" class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <!-- Content Container -->
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
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 21</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 22</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 23</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 24</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 25</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 26</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 27</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 28</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 29</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 30</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 31</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 32</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 33</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 34</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 35</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 36</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 37</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 38</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 39</div>
                            <div class="nds-page-item nds-card nds-stroke" hidden>Card 40</div>
                        </div>

                        <!-- Pagination will be auto-generated here -->
                        <nav class="nds-pagination-nav nds-auto-pagination" aria-label="Pagination"></nav>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-auto-1" id="tab-auto-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-auto-1"
                            aria-labelledby="tab-auto-1">
                            <div class="nds-code-action">
                                <button type="button" class="nds-btn nds-subtle copy-btn"
                                    aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <!-- Content Container -->
                                <div class="nds-paged-content nds-grid"
                                    style="--per-page: 4; --max-col: 4; --mid-col: 3; --min-col: 2;">
                                    <div class="nds-page-item nds-card nds-stroke">Card 1</div>
                                    <div class="nds-page-item nds-card nds-stroke">Card 2</div>
                                    <div class="nds-page-item nds-card nds-stroke">Card 3</div>
                                    <div class="nds-page-item nds-card nds-stroke">Card 4</div>
                                    <!-- First --per-page items visible, rest hidden -->
                                    <div class="nds-page-item nds-card nds-stroke" hidden>Card 5</div>
                                    <!-- ... More cards ... -->
                                    <div class="nds-page-item nds-card nds-stroke" hidden>Card 40</div>
                                </div>
                                <!-- Pagination will be auto-generated here -->
                                <nav class="nds-pagination-nav nds-auto-pagination" aria-label="Pagination"></nav>
                            </code>
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
                                            <button class="nds-sort-header nds-btn" data-sort-type="number">#<span class="nds-sort-icon">↕</span></button>
                                        </th>
                                        <th class="nds-sortable-col">
                                            <button class="nds-sort-header nds-btn" data-sort-type="string">Service<span class="nds-sort-icon">↕</span></button>
                                        </th>
                                        <th>Description</th>
                                        <th class="nds-sortable-col">
                                            <button class="nds-sort-header nds-btn" data-sort-type="string">System<span class="nds-sort-icon">↕</span></button>
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
                                        <td>{% if service.most_used %}Yes{% else %}—{% endif %}</td>
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
                                aria-controls="panel-table-1" id="tab-table-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-table-1"
                            aria-labelledby="tab-table-1">
                            <div class="nds-code-action">
                                <button type="button" class="nds-btn nds-subtle copy-btn"
                                    aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <div class="nds-table-wrapper nds-paged-content" style="--max-width: 100%; --per-page: 5;">
                                    <table class="nds-table nds-sortable">
                                        <thead>
                                            <tr>
                                                <th class="nds-sortable-col">
                                                    <button class="nds-sort-header nds-btn" data-sort-type="number">
                                                        #<span class="nds-sort-icon">↕</span>
                                                    </button>
                                                </th>
                                                <th>Column</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="nds-page-item" hidden>
                                                <td>1</td>
                                                <td>Row data</td>
                                            </tr>
                                            <!-- More rows... -->
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
</section>