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
    <div class="nds-section-content-container">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Basic Pagination</h2>
            <p class="nds-section-description">Standard pagination with numbered pages and navigation controls</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Default Pagination</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <nav aria-label="Pagination">
                            <ul class="nds-pagination">
                                <li class="nds-pagination-item nds-pagination-prev">
                                    <button class="nds-btn nds-subtle" aria-label="Previous page">
                                        <i class="hgi hgi-stroke hgi-arrow-right-01"></i>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 1">
                                        <span class="label">1</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator active" aria-current="page"
                                        aria-label="Page 2, current page">
                                        <span class="label">2</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 3">
                                        <span class="label">3</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 4">
                                        <span class="label">4</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 5">
                                        <span class="label">5</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item nds-pagination-next">
                                    <button class="nds-btn nds-subtle" aria-label="Next page">
                                        <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="nds-tabs nds-code withDivider">
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-basic-1" id="tab-basic-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-basic-1"
                            aria-labelledby="tab-basic-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;nav aria-label="Pagination"&gt;
  &lt;ul class="nds-pagination"&gt;
    &lt;li class="nds-pagination-item nds-pagination-prev"&gt;
      &lt;button class="nds-btn nds-subtle" aria-label="Previous page"&gt;
        &lt;i class="hgi hgi-stroke hgi-arrow-right-01"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/li&gt;
    &lt;li class="nds-pagination-item"&gt;
      &lt;button class="nds-btn nds-subtle nds-indicator" aria-label="Page 1"&gt;
        &lt;span class="label"&gt;1&lt;/span&gt;
      &lt;/button&gt;
    &lt;/li&gt;
    &lt;li class="nds-pagination-item"&gt;
      &lt;button class="nds-btn nds-subtle nds-indicator active" aria-current="page"&gt;
        &lt;span class="label"&gt;2&lt;/span&gt;
      &lt;/button&gt;
    &lt;/li&gt;
    &lt;!-- More page numbers --&gt;
    &lt;li class="nds-pagination-item nds-pagination-next"&gt;
      &lt;button class="nds-btn nds-subtle" aria-label="Next page"&gt;
        &lt;i class="hgi hgi-stroke hgi-arrow-left-01"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Automatic Ellipsis with Dropdown (7+ pages)</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <nav aria-label="Pagination">
                            <ul class="nds-pagination">
                                <li class="nds-pagination-item nds-pagination-prev">
                                    <button class="nds-btn nds-subtle" aria-label="Previous page">
                                        <i class="hgi hgi-stroke hgi-arrow-right-01"></i>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 1">
                                        <span class="label">1</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 2">
                                        <span class="label">2</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 3">
                                        <span class="label">3</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 4">
                                        <span class="label">4</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator active" aria-current="page"
                                        aria-label="Page 5, current page">
                                        <span class="label">5</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 6">
                                        <span class="label">6</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 7">
                                        <span class="label">7</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 8">
                                        <span class="label">8</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 9">
                                        <span class="label">9</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item">
                                    <button class="nds-btn nds-subtle nds-indicator" aria-label="Page 10">
                                        <span class="label">10</span>
                                    </button>
                                </li>
                                <li class="nds-pagination-item nds-pagination-next">
                                    <button class="nds-btn nds-subtle" aria-label="Next page">
                                        <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="nds-tabs nds-code withDivider">
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-ellipsis-1" id="tab-ellipsis-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-ellipsis-1"
                            aria-labelledby="tab-ellipsis-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;!-- Just add 8+ pages, JavaScript automatically creates dropdowns --&gt;
&lt;nav aria-label="Pagination"&gt;
  &lt;ul class="nds-pagination"&gt;
    &lt;li class="nds-pagination-item nds-pagination-prev"&gt;
      &lt;button class="nds-btn nds-subtle"&gt;
        &lt;i class="hgi hgi-stroke hgi-arrow-right-01"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/li&gt;
    &lt;li class="nds-pagination-item"&gt;
      &lt;button class="nds-btn nds-subtle nds-indicator"&gt;
        &lt;span class="label"&gt;1&lt;/span&gt;
      &lt;/button&gt;
    &lt;/li&gt;
    &lt;!-- Add pages 2-9 --&gt;
    &lt;li class="nds-pagination-item"&gt;
      &lt;button class="nds-btn nds-subtle nds-indicator active" aria-current="page"&gt;
        &lt;span class="label"&gt;5&lt;/span&gt;
      &lt;/button&gt;
    &lt;/li&gt;
    &lt;!-- More pages --&gt;
    &lt;li class="nds-pagination-item"&gt;
      &lt;button class="nds-btn nds-subtle nds-indicator"&gt;
        &lt;span class="label"&gt;10&lt;/span&gt;
      &lt;/button&gt;
    &lt;/li&gt;
    &lt;li class="nds-pagination-item nds-pagination-next"&gt;
      &lt;button class="nds-btn nds-subtle"&gt;
        &lt;i class="hgi hgi-stroke hgi-arrow-left-01"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/nav&gt;

&lt;!-- JavaScript automatically converts to: 1 ... 4 5 6 ... 10 --&gt;
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Auto-Generated Pagination (20 items, 4 per page)</div>
                    <div class="demo-action">
                        <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                            data-toggler='["noBg", ".demo-container", "containerBg"]'>
                            <span class="label">Remove bg</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <!-- Content Container -->
                        <div class="nds-pagination-content nds-cards-group"
                            style="--per-page: 4; --max-col: 4; --min-col: 2;">
                            <div class="nds-card nds-stroke pagination-item">Card 1</div>
                            <div class="nds-card nds-stroke pagination-item">Card 2</div>
                            <div class="nds-card nds-stroke pagination-item">Card 3</div>
                            <div class="nds-card nds-stroke pagination-item">Card 4</div>
                            <div class="nds-card nds-stroke pagination-item">Card 5</div>
                            <div class="nds-card nds-stroke pagination-item">Card 6</div>
                            <div class="nds-card nds-stroke pagination-item">Card 7</div>
                            <div class="nds-card nds-stroke pagination-item">Card 8</div>
                            <div class="nds-card nds-stroke pagination-item">Card 9</div>
                            <div class="nds-card nds-stroke pagination-item">Card 10</div>
                            <div class="nds-card nds-stroke pagination-item">Card 11</div>
                            <div class="nds-card nds-stroke pagination-item">Card 12</div>
                            <div class="nds-card nds-stroke pagination-item">Card 13</div>
                            <div class="nds-card nds-stroke pagination-item">Card 14</div>
                            <div class="nds-card nds-stroke pagination-item">Card 15</div>
                            <div class="nds-card nds-stroke pagination-item">Card 16</div>
                            <div class="nds-card nds-stroke pagination-item">Card 17</div>
                            <div class="nds-card nds-stroke pagination-item">Card 18</div>
                            <div class="nds-card nds-stroke pagination-item">Card 19</div>
                            <div class="nds-card nds-stroke pagination-item">Card 20</div>
                            <div class="nds-card nds-stroke pagination-item">Card 21</div>
                            <div class="nds-card nds-stroke pagination-item">Card 22</div>
                            <div class="nds-card nds-stroke pagination-item">Card 23</div>
                            <div class="nds-card nds-stroke pagination-item">Card 24</div>
                            <div class="nds-card nds-stroke pagination-item">Card 25</div>
                            <div class="nds-card nds-stroke pagination-item">Card 26</div>
                            <div class="nds-card nds-stroke pagination-item">Card 27</div>
                            <div class="nds-card nds-stroke pagination-item">Card 28</div>
                            <div class="nds-card nds-stroke pagination-item">Card 29</div>
                            <div class="nds-card nds-stroke pagination-item">Card 30</div>
                            <div class="nds-card nds-stroke pagination-item">Card 31</div>
                            <div class="nds-card nds-stroke pagination-item">Card 32</div>
                            <div class="nds-card nds-stroke pagination-item">Card 33</div>
                            <div class="nds-card nds-stroke pagination-item">Card 34</div>
                            <div class="nds-card nds-stroke pagination-item">Card 35</div>
                            <div class="nds-card nds-stroke pagination-item">Card 36</div>
                            <div class="nds-card nds-stroke pagination-item">Card 37</div>
                            <div class="nds-card nds-stroke pagination-item">Card 38</div>
                            <div class="nds-card nds-stroke pagination-item">Card 39</div>
                            <div class="nds-card nds-stroke pagination-item">Card 40</div>
                        </div>

                        <!-- Pagination will be auto-generated here -->
                        <nav aria-label="Pagination" class="nds-auto-pagination"></nav>
                    </div>
                </div>
                <div class="nds-tabs nds-code withDivider">
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-auto-1" id="tab-auto-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-auto-1"
                            aria-labelledby="tab-auto-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;!-- Content Container with --per-page CSS variable --&gt;
&lt;div class="nds-pagination-content nds-cards-group" style="--per-page: 4; --max-col: 4; --min-col: 2;"&gt;
  &lt;div class="nds-card nds-stroke pagination-item"&gt;Card 1&lt;/div&gt;
  &lt;div class="nds-card nds-stroke pagination-item"&gt;Card 2&lt;/div&gt;
  &lt;div class="nds-card nds-stroke pagination-item"&gt;Card 3&lt;/div&gt;
  &lt;!-- ... Cards 4-17 ... --&gt;
  &lt;div class="nds-card nds-stroke pagination-item"&gt;Card 18&lt;/div&gt;
  &lt;div class="nds-card nds-stroke pagination-item"&gt;Card 19&lt;/div&gt;
  &lt;div class="nds-card nds-stroke pagination-item"&gt;Card 20&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Pagination auto-generated by JavaScript --&gt;
&lt;nav aria-label="Pagination" class="nds-auto-pagination"&gt;&lt;/nav&gt;

&lt;!-- JavaScript will generate 10 pages (20 items ÷ 2 per page) --&gt;
                            </code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>