---
layout: page
title: Filter
hero_title: Filter - National Design System
hero_description: A flexible filtering system for narrowing down content using search and auto-generated filter controls. Supports client-side card filtering, static or dynamic filter values, and AJAX form submission
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Basic Client-Side Filter -->
<section id="basicFilter" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Search and Filter Cards</h2>
            <p class="nds-section-description">Combine a search box with auto-generated checkbox and radio filters. The component scans card content and builds filter options automatically from data attributes.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Search + Auto Checkbox Filter</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-form-container nds-search-box" data-filter-target="basicFilterCards">
                                <div class="nds-search-content">
                                    <div class="nds-form-control">
                                        <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                        <input type="text" class="nds-search-input" placeholder="Search cards...">
                                        <div class="nds-form-action">
                                            <button class="nds-btn nds-subtle nds-clear" hidden><i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i></button>
                                        </div>
                                    </div>
                                    <button class="nds-btn nds-primary nds-search-btn" type="button">
                                        <i class="nds-icon nds-hgi-search-01" aria-hidden="true"></i>
                                        <span class="nds-label">Search</span>
                                    </button>
                                    <div class="nds-dropmenu nds-filter" data-filter-target="basicFilterCards">
                                        <button
                                            class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                                            <i class="hgi hgi-stroke hgi-filter"></i>
                                            <span class="nds-label">Filter</span>
                                        </button>
                                        <div class="nds-dropmenu-menu" hidden>
                                            <div class="nds-dropmenu-scroll">
                                                <div data-filter="department"
                                                    data-filter-type="checkbox" data-filter-legend="Department"
                                                    data-no-auto-close>
                                                </div>
                                                <hr class="nds-divider">
                                                <div data-filter="role"
                                                    data-filter-type="radio" data-filter-legend="Role" data-no-auto-close>
                                                </div>
                                            </div>
                                            <div class="nds-dropmenu-footer">
                                                <hr class="nds-divider">
                                                <div class="nds-dropmenu-action nds-grid">
                                                    <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                                        data-filter-action="clear" data-no-auto-close>
                                                        <span class="nds-label">Reset</span>
                                                    </button>
                                                    <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                                        data-filter-action="apply">
                                                        <span class="nds-label">Filter</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-filter-applied" data-filter-target="basicFilterCards" hidden>
                                    <span class="nds-label">Applied Filters:</span>
                                    <div class="nds-chips"></div>
                                </div>
                            </div>
                            <div id="basicFilterCards" class="nds-grid"
                                style="--max-col: 3; --mid-col: 2; --min-col: 1;">
                                {% for user in site.data.content.users %}
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">{{ user.name }}</h3>
                                            <span class="nds-card-description">{{ user.role }}</span>
                                        </div>
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm"><span class="nds-label"
                                                    data-filter="department">{{ user.department }}</span></span>
                                            <span class="nds-tag nds-green nds-sm"><span class="nds-label"
                                                    data-filter="role">{{ user.role }}</span></span>
                                        </div>
                                    </div>
                                </div>
                                {% endfor %}
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-filter-basic-1" id="tab-filter-basic-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-filter-basic-1"
                                    aria-labelledby="tab-filter-basic-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;!-- Search Box with Filter (all linked by data-filter-target) --&gt;
&lt;div class="nds-form-container nds-search-box" data-filter-target="basicFilterCards"&gt;
  &lt;div class="nds-search-content"&gt;
    &lt;div class="nds-form-control"&gt;
      &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;input type="text" class="nds-search-input" placeholder="Search cards..."&gt;
      &lt;div class="nds-form-action"&gt;
        &lt;button class="nds-btn nds-subtle nds-clear" hidden&gt;
          &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;button class="nds-btn nds-primary nds-search-btn" type="button"&gt;
      &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Search&lt;/span&gt;
    &lt;/button&gt;
    &lt;div class="nds-dropmenu nds-filter" data-filter-target="basicFilterCards"&gt;
      &lt;button class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger"&gt;
        &lt;i class="hgi hgi-stroke hgi-filter"&gt;&lt;/i&gt;
        &lt;span class="nds-label"&gt;Filter&lt;/span&gt;
      &lt;/button&gt;
      &lt;div class="nds-dropmenu-menu" hidden&gt;
        &lt;div class="nds-dropmenu-scroll"&gt;
          &lt;div data-filter="department"
            data-filter-type="checkbox"
            data-filter-legend="Department"
            data-no-auto-close&gt;
          &lt;/div&gt;
          &lt;hr class="nds-divider"&gt;
          &lt;div data-filter="role"
            data-filter-type="radio"
            data-filter-legend="Role"
            data-no-auto-close&gt;
          &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="nds-dropmenu-footer"&gt;
          &lt;hr class="nds-divider"&gt;
          &lt;div class="nds-dropmenu-action nds-grid"&gt;
            &lt;button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
              data-filter-action="clear" data-no-auto-close&gt;
              &lt;span class="nds-label"&gt;Reset&lt;/span&gt;
            &lt;/button&gt;
            &lt;button class="nds-btn nds-primary nds-dropmenu-item" type="button"
              data-filter-action="apply"&gt;
              &lt;span class="nds-label"&gt;Filter&lt;/span&gt;
            &lt;/button&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-filter-applied" data-filter-target="basicFilterCards" hidden&gt;
    &lt;span class="nds-label"&gt;Applied Filters:&lt;/span&gt;
    &lt;div class="nds-chips"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- Filterable Cards --&gt;
&lt;div id="basicFilterCards" class="nds-grid"
  style="--max-col: 3; --mid-col: 2; --min-col: 1;"&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;User Name&lt;/h3&gt;
        &lt;span class="nds-card-description"&gt;Role Title&lt;/span&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-blue nds-sm"&gt;
          &lt;span class="nds-label" data-filter="department"&gt;Engineering&lt;/span&gt;
        &lt;/span&gt;
        &lt;span class="nds-tag nds-green nds-sm"&gt;
          &lt;span class="nds-label" data-filter="role"&gt;Developer&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
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

<!-- Filter Types -->
<section id="filterTypes" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Auto-Generated Filter Types</h2>
            <p class="nds-section-description">Three filter input types that auto-generate from card content: checkbox (multi-select, OR logic), radio (single-select), and switch (toggle, OR logic)</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <!-- Checkbox -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Checkbox Filter (Multi-Select)</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu nds-filter" data-filter-target="checkboxCards">
                                <button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger">
                                    <i class="hgi hgi-stroke hgi-filter"></i>
                                    <span class="nds-label">Filter</span>
                                </button>
                                <div class="nds-dropmenu-menu" style="min-width: 260px;" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <div data-filter="status"
                                            data-filter-type="checkbox" data-filter-legend="Status"
                                            data-no-auto-close>
                                        </div>
                                    </div>
                                    <div class="nds-dropmenu-footer">
                                        <hr class="nds-divider">
                                        <div class="nds-dropmenu-action nds-grid">
                                            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                                data-filter-action="clear" data-no-auto-close>
                                                <span class="nds-label">Reset</span>
                                            </button>
                                            <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                                data-filter-action="apply">
                                                <span class="nds-label">Apply</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-filter-applied" data-filter-target="checkboxCards" hidden>
                                <span class="nds-label">Applied Filters:</span>
                                <div class="nds-chips"></div>
                            </div>
                            <div id="checkboxCards" class="nds-grid" style="--max-col: 2; --mid-col: 2; --min-col: 1;">
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Task A</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-green nds-sm"><span
                                                    class="nds-label" data-filter="status">Active</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Task B</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-gray nds-sm"><span
                                                    class="nds-label" data-filter="status">Pending</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Task C</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-blue nds-sm"><span
                                                    class="nds-label" data-filter="status">Complete</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Task D</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-green nds-sm"><span
                                                    class="nds-label" data-filter="status">Active</span></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-filter-checkbox-1" id="tab-filter-checkbox-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-filter-checkbox-1"
                                    aria-labelledby="tab-filter-checkbox-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;!-- Filter (merged with dropmenu) --&gt;
&lt;div class="nds-dropmenu nds-filter" data-filter-target="checkboxCards"&gt;
  &lt;button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger"&gt;
    &lt;i class="hgi hgi-stroke hgi-filter"&gt;&lt;/i&gt;
    &lt;span class="nds-label"&gt;Filter&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu" style="min-width: 260px;" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;
      &lt;!-- Checkbox: multi-select, OR logic --&gt;
      &lt;div data-filter="status"
        data-filter-type="checkbox"
        data-filter-legend="Status"
        data-no-auto-close&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-dropmenu-footer"&gt;
      &lt;hr class="nds-divider"&gt;
      &lt;div class="nds-dropmenu-action nds-grid"&gt;
        &lt;button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
          data-filter-action="clear" data-no-auto-close&gt;
          &lt;span class="nds-label"&gt;Reset&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-primary nds-dropmenu-item" type="button"
          data-filter-action="apply"&gt;
          &lt;span class="nds-label"&gt;Apply&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;!-- Applied Filters (standalone, linked by data-filter-target) --&gt;
&lt;div class="nds-filter-applied" data-filter-target="checkboxCards" hidden&gt;
  &lt;span class="nds-label"&gt;Applied Filters:&lt;/span&gt;
  &lt;div class="nds-chips"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;div id="checkboxCards" class="nds-grid"
  style="--max-col: 2; --mid-col: 2; --min-col: 1;"&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;Task A&lt;/h3&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-green nds-sm"&gt;
          &lt;span class="nds-label" data-filter="status"&gt;Active&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;Task B&lt;/h3&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-gray nds-sm"&gt;
          &lt;span class="nds-label" data-filter="status"&gt;Pending&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;Task C&lt;/h3&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-blue nds-sm"&gt;
          &lt;span class="nds-label" data-filter="status"&gt;Complete&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;Task D&lt;/h3&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-green nds-sm"&gt;
          &lt;span class="nds-label" data-filter="status"&gt;Active&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                    </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Radio -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Radio Filter (Single-Select)</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu nds-filter" data-filter-target="radioCards">
                                <button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger">
                                    <i class="hgi hgi-stroke hgi-filter"></i>
                                    <span class="nds-label">Filter</span>
                                </button>
                                <div class="nds-dropmenu-menu" style="min-width: 260px;" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <div data-filter="priority"
                                            data-filter-type="radio" data-filter-legend="Priority"
                                            data-no-auto-close>
                                        </div>
                                    </div>
                                    <div class="nds-dropmenu-footer">
                                        <hr class="nds-divider">
                                        <div class="nds-dropmenu-action nds-grid">
                                            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                                data-filter-action="clear" data-no-auto-close>
                                                <span class="nds-label">Reset</span>
                                            </button>
                                            <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                                data-filter-action="apply">
                                                <span class="nds-label">Apply</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-filter-applied" data-filter-target="radioCards" hidden>
                                <span class="nds-label">Applied Filters:</span>
                                <div class="nds-chips"></div>
                            </div>
                            <div id="radioCards" class="nds-grid" style="--max-col: 2; --mid-col: 2; --min-col: 1;">
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Feature Request</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-red nds-sm"><span
                                                    class="nds-label" data-filter="priority">High</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Bug Fix</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-yellow nds-sm"><span
                                                    class="nds-label" data-filter="priority">Medium</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Documentation</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-gray nds-sm"><span
                                                    class="nds-label" data-filter="priority">Low</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Security Patch</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-red nds-sm"><span
                                                    class="nds-label" data-filter="priority">High</span></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-filter-radio-1" id="tab-filter-radio-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-filter-radio-1"
                                    aria-labelledby="tab-filter-radio-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;!-- Filter (merged with dropmenu) --&gt;
&lt;div class="nds-dropmenu nds-filter" data-filter-target="radioCards"&gt;
  &lt;button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger"&gt;
    &lt;i class="hgi hgi-stroke hgi-filter"&gt;&lt;/i&gt;
    &lt;span class="nds-label"&gt;Filter&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu" style="min-width: 260px;" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;
      &lt;!-- Radio: single-select --&gt;
      &lt;div data-filter="priority"
        data-filter-type="radio"
        data-filter-legend="Priority"
        data-no-auto-close&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-dropmenu-footer"&gt;
      &lt;hr class="nds-divider"&gt;
      &lt;div class="nds-dropmenu-action nds-grid"&gt;
        &lt;button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
          data-filter-action="clear" data-no-auto-close&gt;
          &lt;span class="nds-label"&gt;Reset&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-primary nds-dropmenu-item" type="button"
          data-filter-action="apply"&gt;
          &lt;span class="nds-label"&gt;Apply&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class="nds-filter-applied" data-filter-target="radioCards" hidden&gt;
  &lt;span class="nds-label"&gt;Applied Filters:&lt;/span&gt;
  &lt;div class="nds-chips"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;div id="radioCards" class="nds-grid"
  style="--max-col: 2; --mid-col: 2; --min-col: 1;"&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;Feature Request&lt;/h3&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-red nds-sm"&gt;
          &lt;span class="nds-label" data-filter="priority"&gt;High&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;Bug Fix&lt;/h3&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-yellow nds-sm"&gt;
          &lt;span class="nds-label" data-filter="priority"&gt;Medium&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;Documentation&lt;/h3&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-gray nds-sm"&gt;
          &lt;span class="nds-label" data-filter="priority"&gt;Low&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;Security Patch&lt;/h3&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-red nds-sm"&gt;
          &lt;span class="nds-label" data-filter="priority"&gt;High&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                    </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Switch -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Switch Filter (Toggle)</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu nds-filter" data-filter-target="switchCards">
                                <button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger">
                                    <i class="hgi hgi-stroke hgi-filter"></i>
                                    <span class="nds-label">Filter</span>
                                </button>
                                <div class="nds-dropmenu-menu" style="min-width: 260px;" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <div data-filter="feature"
                                            data-filter-type="switch" data-filter-legend="Features"
                                            data-no-auto-close>
                                        </div>
                                    </div>
                                    <div class="nds-dropmenu-footer">
                                        <hr class="nds-divider">
                                        <div class="nds-dropmenu-action nds-grid">
                                            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                                data-filter-action="clear" data-no-auto-close>
                                                <span class="nds-label">Reset</span>
                                            </button>
                                            <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                                data-filter-action="apply">
                                                <span class="nds-label">Apply</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-filter-applied" data-filter-target="switchCards" hidden>
                                <span class="nds-label">Applied Filters:</span>
                                <div class="nds-chips"></div>
                            </div>
                            <div id="switchCards" class="nds-grid" style="--max-col: 2; --mid-col: 2; --min-col: 1;">
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">App Alpha</h3>
                                        </div>
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm"><span class="nds-label"
                                                    data-filter="feature">SSO</span></span>
                                            <span class="nds-tag nds-blue nds-sm"><span class="nds-label"
                                                    data-filter="feature">API</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">App Beta</h3>
                                        </div>
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm"><span class="nds-label"
                                                    data-filter="feature">SSO</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">App Gamma</h3>
                                        </div>
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm"><span class="nds-label"
                                                    data-filter="feature">API</span></span>
                                            <span class="nds-tag nds-blue nds-sm"><span class="nds-label"
                                                    data-filter="feature">Webhooks</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">App Delta</h3>
                                        </div>
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm"><span class="nds-label"
                                                    data-filter="feature">Webhooks</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-filter-switch-1" id="tab-filter-switch-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-filter-switch-1"
                                    aria-labelledby="tab-filter-switch-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;!-- Filter (merged with dropmenu) --&gt;
&lt;div class="nds-dropmenu nds-filter" data-filter-target="switchCards"&gt;
  &lt;button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger"&gt;
    &lt;i class="hgi hgi-stroke hgi-filter"&gt;&lt;/i&gt;
    &lt;span class="nds-label"&gt;Filter&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu" style="min-width: 260px;" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;
      &lt;!-- Switch: toggle, OR logic --&gt;
      &lt;div data-filter="feature"
        data-filter-type="switch"
        data-filter-legend="Features"
        data-no-auto-close&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-dropmenu-footer"&gt;
      &lt;hr class="nds-divider"&gt;
      &lt;div class="nds-dropmenu-action nds-grid"&gt;
        &lt;button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
          data-filter-action="clear" data-no-auto-close&gt;
          &lt;span class="nds-label"&gt;Reset&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-primary nds-dropmenu-item" type="button"
          data-filter-action="apply"&gt;
          &lt;span class="nds-label"&gt;Apply&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class="nds-filter-applied" data-filter-target="switchCards" hidden&gt;
  &lt;span class="nds-label"&gt;Applied Filters:&lt;/span&gt;
  &lt;div class="nds-chips"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;div id="switchCards" class="nds-grid"
  style="--max-col: 2; --mid-col: 2; --min-col: 1;"&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;App Alpha&lt;/h3&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-blue nds-sm"&gt;
          &lt;span class="nds-label" data-filter="feature"&gt;SSO&lt;/span&gt;
        &lt;/span&gt;
        &lt;span class="nds-tag nds-blue nds-sm"&gt;
          &lt;span class="nds-label" data-filter="feature"&gt;API&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;App Beta&lt;/h3&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-blue nds-sm"&gt;
          &lt;span class="nds-label" data-filter="feature"&gt;SSO&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;App Gamma&lt;/h3&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-blue nds-sm"&gt;
          &lt;span class="nds-label" data-filter="feature"&gt;API&lt;/span&gt;
        &lt;/span&gt;
        &lt;span class="nds-tag nds-blue nds-sm"&gt;
          &lt;span class="nds-label" data-filter="feature"&gt;Webhooks&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-text"&gt;
        &lt;h3 class="nds-card-title"&gt;App Delta&lt;/h3&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-blue nds-sm"&gt;
          &lt;span class="nds-label" data-filter="feature"&gt;Webhooks&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
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

<!-- Static Values Filter -->
<section id="staticValues" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Explicit Values and Label Mapping</h2>
            <p class="nds-section-description">Define filter options upfront with <code class="nds-inline-code lang-html">data-filter-values</code> instead of scanning card content. Pass a JSON object <code class="nds-inline-code lang-html">{"value":"label"}</code> to map machine values to display labels, keeping internal identifiers separate from what users see.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Explicit Values (Radio)</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-dropmenu nds-filter" data-filter-target="staticCards">
                                <button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger">
                                    <i class="hgi hgi-stroke hgi-filter"></i>
                                    <span class="nds-label">Filter</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <div data-filter="category"
                                            data-filter-type="radio" data-filter-legend="Category"
                                            data-filter-values='{"tech":"Technology","design":"Design","biz":"Business"}'
                                            data-no-auto-close>
                                        </div>
                                    </div>
                                    <div class="nds-dropmenu-footer">
                                        <hr class="nds-divider">
                                        <div class="nds-dropmenu-action nds-grid">
                                            <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                                data-filter-action="clear" data-no-auto-close>
                                                <span class="nds-label">Reset</span>
                                            </button>
                                            <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                                data-filter-action="apply">
                                                <span class="nds-label">Filter</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-filter-applied" data-filter-target="staticCards" hidden>
                                <span class="nds-label">Applied Filters:</span>
                                <div class="nds-chips"></div>
                            </div>
                            <div id="staticCards" class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">AI Research</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-blue nds-sm"><span
                                                    class="nds-label" data-filter="category" data-filter-value="tech">Technology</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Brand Identity</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-green nds-sm"><span
                                                    class="nds-label" data-filter="category" data-filter-value="design">Design</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Market Analysis</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-yellow nds-sm"><span
                                                    class="nds-label" data-filter="category" data-filter-value="biz">Business</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Cloud Migration</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-blue nds-sm"><span
                                                    class="nds-label" data-filter="category" data-filter-value="tech">Technology</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">UX Audit</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-green nds-sm"><span
                                                    class="nds-label" data-filter="category" data-filter-value="design">Design</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Revenue Report</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-yellow nds-sm"><span
                                                    class="nds-label" data-filter="category" data-filter-value="biz">Business</span></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-filter-static-1" id="tab-filter-static-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-filter-static-1"
                                    aria-labelledby="tab-filter-static-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;!-- Object form: keys = machine values, values = display labels --&gt;
&lt;div class="nds-dropmenu nds-filter" data-filter-target="staticCards"&gt;
  &lt;button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger"&gt;
    &lt;i class="hgi hgi-stroke hgi-filter"&gt;&lt;/i&gt;
    &lt;span class="nds-label"&gt;Filter&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;
      &lt;div data-filter="category"
        data-filter-type="radio"
        data-filter-legend="Category"
        data-filter-values='{"tech":"Technology","design":"Design","biz":"Business"}'
        data-no-auto-close&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-dropmenu-footer"&gt;
      &lt;hr class="nds-divider"&gt;
      &lt;div class="nds-dropmenu-action nds-grid"&gt;
        &lt;button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
          data-filter-action="clear" data-no-auto-close&gt;
          &lt;span class="nds-label"&gt;Reset&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-primary nds-dropmenu-item" type="button"
          data-filter-action="apply"&gt;
          &lt;span class="nds-label"&gt;Filter&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class="nds-filter-applied" data-filter-target="staticCards" hidden&gt;
  &lt;span class="nds-label"&gt;Applied Filters:&lt;/span&gt;
  &lt;div class="nds-chips"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Cards use data-filter-value to match machine keys --&gt;
&lt;div id="staticCards" class="nds-grid"&gt;
  &lt;div class="nds-card nds-stroke"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;div class="nds-card-tags"&gt;
        &lt;span class="nds-tag nds-blue nds-sm"&gt;
          &lt;span class="nds-label" data-filter="category"
            data-filter-value="tech"&gt;Technology&lt;/span&gt;
        &lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
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

<!-- Dynamic Values (populateFilter API) -->
<section id="dynamicValues" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Dynamic Values (populateFilter API)</h2>
            <p class="nds-section-description">Use <code class="nds-inline-code lang-js">populateFilter()</code> to generate filter inputs from values fetched at runtime. Supports cascading filters where one filter's selection determines another filter's options.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Populate from API</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-block">
                                <p>Place an empty <code class="nds-inline-code lang-html">data-filter</code> placeholder in the dropmenu, then call <code class="nds-inline-code lang-js">populateFilter()</code> after fetching values. The method generates the same auto-generated inputs as <code class="nds-inline-code lang-html">data-filter-type</code> and binds all listeners automatically.</p>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-filter-populate-html" id="tab-filter-populate-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-filter-populate-js" id="tab-filter-populate-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-filter-populate-html"
                                    aria-labelledby="tab-filter-populate-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- Empty placeholder — JS will generate the inputs --&gt;
&lt;div class="nds-dropmenu nds-filter" id="apiFilter"
  data-filter-target="results"&gt;
  &lt;button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger"&gt;
    &lt;i class="hgi hgi-stroke hgi-filter"&gt;&lt;/i&gt;
    &lt;span class="nds-label"&gt;Filter&lt;/span&gt;
  &lt;/button&gt;
  &lt;div class="nds-dropmenu-menu" hidden&gt;
    &lt;div class="nds-dropmenu-scroll"&gt;
      &lt;div data-filter="system"
        data-filter-type="checkbox"
        data-filter-legend="System"
        data-no-auto-close&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-dropmenu-footer"&gt;
      &lt;hr class="nds-divider"&gt;
      &lt;div class="nds-dropmenu-action nds-grid"&gt;
        &lt;button class="nds-btn nds-secondary nds-dropmenu-item"
          type="button" data-filter-action="clear"
          data-no-auto-close&gt;
          &lt;span class="nds-label"&gt;Reset&lt;/span&gt;
        &lt;/button&gt;
        &lt;button class="nds-btn nds-primary nds-dropmenu-item"
          type="button" data-filter-action="apply"&gt;
          &lt;span class="nds-label"&gt;Apply&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-filter-populate-js"
                                    aria-labelledby="tab-filter-populate-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">
// Fetch values from API, then populate the filter
NDS.Filter.whenReady('#apiFilter', (filter) =&gt; {
    fetch('/api/systems')
        .then(res =&gt; res.json())
        .then(data =&gt; {
            filter.populateFilter('system', data.map(d =&gt; d.Title));
        });
});
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Cascading -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Cascading Filters</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-block">
                                <p>Call <code class="nds-inline-code lang-js">populateFilter()</code> again whenever a parent filter changes. The method clears the previous inputs and generates new ones from the updated values.</p>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-filter-cascade-1" id="tab-filter-cascade-1">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-filter-cascade-1"
                                    aria-labelledby="tab-filter-cascade-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">
// Cascading: when beneficiary changes, re-populate system filter
NDS.Filter.whenReady('#apiFilter', (filter) =&gt; {
    const beneficiaryInputs = document.querySelectorAll(
        'input[name="beneficiary"]'
    );

    beneficiaryInputs.forEach(radio =&gt; {
        radio.addEventListener('change', () =&gt; {
            fetch('/api/systems?userIds=' + radio.value)
                .then(res =&gt; res.json())
                .then(data =&gt; {
                    filter.populateFilter(
                        'system',
                        data.map(d =&gt; d.Title)
                    );
                });
        });
    });
});
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

<!-- AJAX Form Submission -->
<section id="ajaxFilter" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">AJAX Form Submission</h2>
            <p class="nds-section-description">Send filter criteria to a server endpoint via AJAX. HTML responses are auto-injected into the target container. JSON responses dispatch raw data via event for developer rendering.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">AJAX Filter Form</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-block">
                                <p>Add a separate <code class="nds-inline-code lang-html">&lt;form&gt;</code> element with <code class="nds-inline-code lang-html">data-filter-target</code> linking it to the filter anchor, plus <code class="nds-inline-code lang-html">data-filter-submit</code> and <code class="nds-inline-code lang-html">data-ajax</code> attributes. Set the <code class="nds-inline-code lang-html">action</code> attribute to the API endpoint URL.</p>
                                <p><code class="nds-inline-code lang-html">.nds-filter</code> stays a pure anchor — the form drives submission. HTML responses are automatically injected into the target container. For JSON responses, listen for the <code class="nds-inline-code lang-js">nds:filterFormComplete</code> event and render the data yourself.</p>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-filter-ajax-html" id="tab-filter-ajax-html">
                                        <span class="nds-tab-label">HTML Response</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-filter-ajax-json" id="tab-filter-ajax-json">
                                        <span class="nds-tab-label">JSON Response</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-filter-ajax-html"
                                    aria-labelledby="tab-filter-ajax-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;!-- Submission form: separate element linked via data-filter-target --&gt;
&lt;form id="resultsForm" data-filter-target="results"
  data-filter-submit data-ajax
  method="GET" action="https://api.example.com/search"&gt;

  &lt;!-- Search Box (linked by data-filter-target) --&gt;
  &lt;div class="nds-form-container nds-search-box" data-filter-target="results"&gt;
    &lt;div class="nds-search-content"&gt;
      &lt;div class="nds-form-control"&gt;
        &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;input type="text" class="nds-search-input"
          name="search" placeholder="Search..."&gt;
      &lt;/div&gt;
      &lt;button class="nds-btn nds-primary nds-search-btn"
        type="submit"&gt;
        &lt;span class="nds-label"&gt;Search&lt;/span&gt;
      &lt;/button&gt;

      &lt;!-- Filter anchor (pure marker, not the form) --&gt;
      &lt;div class="nds-dropmenu nds-filter" data-filter-target="results"&gt;
        &lt;button class="nds-btn nds-neutral nds-dropmenu-trigger"
          type="button"&gt;
          &lt;i class="hgi hgi-stroke hgi-filter"&gt;&lt;/i&gt;
          &lt;span class="nds-label"&gt;Filter&lt;/span&gt;
        &lt;/button&gt;
        &lt;div class="nds-dropmenu-menu" hidden&gt;
          &lt;div class="nds-dropmenu-scroll"&gt;
            &lt;div data-filter="category"
              data-filter-type="checkbox"
              data-filter-legend="Category"
              data-filter-values='{"news":"News","services":"Services","events":"Events"}'
              data-no-auto-close&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          &lt;div class="nds-dropmenu-footer"&gt;
            &lt;hr class="nds-divider"&gt;
            &lt;div class="nds-dropmenu-action nds-grid"&gt;
              &lt;button class="nds-btn nds-secondary nds-dropmenu-item"
                type="button" data-filter-action="clear"
                data-no-auto-close&gt;
                &lt;span class="nds-label"&gt;Reset&lt;/span&gt;
              &lt;/button&gt;
              &lt;button class="nds-btn nds-primary nds-dropmenu-item"
                data-filter-action="apply"&gt;
                &lt;span class="nds-label"&gt;Apply&lt;/span&gt;
              &lt;/button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="nds-filter-applied" data-filter-target="results" hidden&gt;
      &lt;span class="nds-label"&gt;Applied Filters:&lt;/span&gt;
      &lt;div class="nds-chips"&gt;&lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/form&gt;

&lt;div id="results"&gt;
  &lt;!-- HTML response will be injected here --&gt;
&lt;/div&gt;
                                    </code>
                                    </div>
                                </div>
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-filter-ajax-json"
                                    aria-labelledby="tab-filter-ajax-json" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                    <code class="lang-html code">
&lt;!-- AJAX form: JSON response handled via event on the .nds-filter anchor --&gt;
&lt;form id="resultsForm" data-filter-target="results"
  data-filter-submit data-ajax
  method="GET" action="https://api.example.com/search"&gt;

  &lt;div class="nds-filter" data-filter-target="results"&gt;
    &lt;!-- filter controls --&gt;
  &lt;/div&gt;
&lt;/form&gt;

&lt;div id="results"&gt;&lt;/div&gt;

&lt;script&gt;
    document.querySelector('.nds-filter[data-filter-target="results"]')
        .addEventListener('nds:filterFormComplete', (e) =&gt; {
            const { success, isJson, data } = e.detail;

            if (isJson &amp;&amp; success) {
                const container = document.getElementById('results');
                container.innerHTML = '';

                // Render JSON data: structure depends on your API
                data.Records.forEach(item =&gt; {
                    const card = document.createElement('div');
                    card.className = 'nds-card nds-stroke';
                    card.innerHTML = `
          &lt;div class="nds-card-content"&gt;
            &lt;h3 class="nds-card-title"&gt;${item.Title}&lt;/h3&gt;
            &lt;p class="nds-card-description"&gt;${item.Description}&lt;/p&gt;
          &lt;/div&gt;`;
                    container.appendChild(card);
                });
            }
        });
&lt;/script&gt;
                                    </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Custom AJAX Rendering -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Custom AJAX Rendering (preventDefault)</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-block">
                                <p>Use <code class="nds-inline-code lang-js">preventDefault()</code> on the <code class="nds-inline-code lang-js">nds:filterFormAjax</code> event to fully control the AJAX request and rendering. The filter component still handles UI updates (chips, count, URL params) before dispatching the event.</p>
                                <p>All filter actions (apply, chip removal, reset, clear) fire through <code class="nds-inline-code lang-js">nds:filterFormAjax</code>, so you only need one event listener.</p>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-filter-ajax-custom" id="tab-filter-ajax-custom">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-filter-ajax-custom"
                                    aria-labelledby="tab-filter-ajax-custom">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">
// Intercept AJAX and handle fetching yourself
// Covers: apply, chip removal, reset, and clear
filterForm.addEventListener('nds:filterFormAjax', (e) =&gt; {
    e.preventDefault();

    // Build your own params from form inputs
    const params = {};
    const search = filterForm.querySelector('input[name="search"]');
    if (search &amp;&amp; search.value) params.q = search.value;

    // Fetch from your API
    fetch('/api/search', { method: 'POST', body: new URLSearchParams(params) })
        .then(res =&gt; res.json())
        .then(data =&gt; renderResults(data.Records));
});
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

<!-- Sort -->
<section id="sortInFilter" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Sort</h2>
            <p class="nds-section-description">Drop sort buttons anywhere inside the filter (typically a dropmenu). Each button carries <code class="nds-inline-code lang-html">data-sort="{key}"</code> and <code class="nds-inline-code lang-html">data-sort-dir="asc|desc"</code>; items expose the sortable value via <code class="nds-inline-code lang-html">data-sort-{key}</code>. An empty <code class="nds-inline-code lang-html">data-sort</code> resets to the original DOM order.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Sort by Name or Price</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-filter" data-filter-target="sortDemoList">
                                <div class="nds-dropmenu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" type="button">
                                        <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
                                        <span class="nds-label">Sort</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort>
                                                <i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"></i>
                                                <span class="nds-label">Most Relevant</span>
                                            </button>
                                            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="name" data-sort-dir="asc">
                                                <i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"></i>
                                                <span class="nds-label">Name A–Z</span>
                                            </button>
                                            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="name" data-sort-dir="desc">
                                                <i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"></i>
                                                <span class="nds-label">Name Z–A</span>
                                            </button>
                                            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="price" data-sort-dir="asc">
                                                <i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"></i>
                                                <span class="nds-label">Price: low to high</span>
                                            </button>
                                            <button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="price" data-sort-dir="desc">
                                                <i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"></i>
                                                <span class="nds-label">Price: high to low</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="sortDemoList" class="nds-grid" style="--max-col:3;--mid-col:2;--min-col:1;">
                                <div class="nds-card nds-stroke" data-sort-name="Zakat Payment" data-sort-price="75">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Zakat Payment</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">75</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Passport Renewal" data-sort-price="300">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Passport Renewal</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">300</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Birth Certificate" data-sort-price="25">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Birth Certificate</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">25</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Identity Verification" data-sort-price="0">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Identity Verification</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR" data-free>Free</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Driver License" data-sort-price="150">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Driver License</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">150</span></p>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke" data-sort-name="Business Registration" data-sort-price="1200">
                                    <div class="nds-card-content">
                                        <h3 class="nds-card-title">Business Registration</h3>
                                        <p class="nds-card-description"><span class="nds-number-format" data-currency="SAR">1200</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-filter-sort-1" id="tab-filter-sort-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-filter-sort-1" aria-labelledby="tab-filter-sort-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-filter" data-filter-target="sortDemoList"&gt;
  &lt;div class="nds-dropmenu"&gt;
    &lt;button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" type="button"&gt;
      &lt;i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Sort&lt;/span&gt;
    &lt;/button&gt;
    &lt;div class="nds-dropmenu-menu" hidden&gt;
      &lt;div class="nds-dropmenu-scroll"&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort&gt;
          &lt;i class="nds-icon nds-hgi-sorting-05" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;span class="nds-label"&gt;Most Relevant&lt;/span&gt;
        &lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="name" data-sort-dir="asc"&gt;
          &lt;i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;span class="nds-label"&gt;Name A&ndash;Z&lt;/span&gt;
        &lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="name" data-sort-dir="desc"&gt;
          &lt;i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;span class="nds-label"&gt;Name Z&ndash;A&lt;/span&gt;
        &lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="price" data-sort-dir="asc"&gt;
          &lt;i class="nds-icon nds-hgi-sort-by-up-02" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;span class="nds-label"&gt;Price: low to high&lt;/span&gt;
        &lt;/button&gt;
        &lt;button type="button" class="nds-btn nds-subtle nds-dropmenu-item" data-sort="price" data-sort-dir="desc"&gt;
          &lt;i class="nds-icon nds-hgi-sort-by-down-02" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;span class="nds-label"&gt;Price: high to low&lt;/span&gt;
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;div id="sortDemoList" class="nds-grid"&gt;
  &lt;div class="nds-card nds-stroke" data-sort-name="Zakat Payment" data-sort-price="75"&gt;
    &lt;div class="nds-card-content"&gt;
      &lt;h3 class="nds-card-title"&gt;Zakat Payment&lt;/h3&gt;
      &lt;p class="nds-card-description"&gt;&lt;span class="nds-number-format" data-currency="SAR"&gt;75&lt;/span&gt;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- ...more cards with data-sort-name and data-sort-price... --&gt;
&lt;/div&gt;
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-arrow-data-transfer-vertical"></i>
                        <span class="nds-label">Type auto-detect</span>
                    </span>
                    <p class="nds-item-desc">Values are sampled at sort time. Pure numbers (including formatted strings like <code class="nds-inline-code lang-html">"9,375"</code>) sort numerically; dates in <code class="nds-inline-code lang-html">DD/MM/YYYY</code>, <code class="nds-inline-code lang-html">YYYY-MM-DD</code>, and ISO 8601 sort chronologically; everything else uses <code class="nds-inline-code lang-js">localeCompare</code>.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-link-circle-02"></i>
                        <span class="nds-label">URL sync</span>
                    </span>
                    <p class="nds-item-desc">Sort state persists as <code class="nds-inline-code lang-html">?sort=name&amp;dir=desc</code>. Reload the page or share the URL to restore the same order. Ascending is the default, so <code class="nds-inline-code lang-html">dir</code> is only written when descending.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-image-02"></i>
                        <span class="nds-label">Trigger icon mirror</span>
                    </span>
                    <p class="nds-item-desc">The dropmenu trigger icon automatically mirrors the active sort button's icon. Swap icon sets (NDS inline, HGI font, custom) without any JS changes — the component copies the <code class="nds-inline-code lang-js">className</code> at runtime.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-globe-02"></i>
                        <span class="nds-label">External triggers</span>
                    </span>
                    <p class="nds-item-desc">Sort buttons can live outside <code class="nds-inline-code lang-html">.nds-filter</code> — add <code class="nds-inline-code lang-html">data-filter-target="{id}"</code> on each trigger (or on their wrapper) to bind them to a filter whose target matches.</p>
                </div>
            </div>
            <p>See the <a class="nds-color" href="{{ 'components/sort' | relative_url }}">Sort component page</a> for the underlying JavaScript API, including <code class="nds-inline-code lang-js">NDS.Sort</code>, the <code class="nds-inline-code lang-js">nds:sort:change</code> event, and the pure comparator helpers.</p>
        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="filterFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Activates when <code class="nds-inline-code lang-html">.nds-filter</code> is on the page. Search, filter inputs, chips, and URL sync are set up automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-filter"></i>
                        <span class="nds-label">Auto-Generated Filters</span>
                    </span>
                    <p class="nds-item-desc">Builds checkbox, radio, or switch inputs automatically. Values come from card content, a JSON attribute (<code class="nds-inline-code lang-html">data-filter-values</code>), or the <code class="nds-inline-code lang-js">populateFilter()</code> API — no manual HTML required.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-link-circle-02"></i>
                        <span class="nds-label">Shareable URL State</span>
                    </span>
                    <p class="nds-item-desc">Filter selections and search terms sync to URL query parameters automatically, producing bookmarkable and shareable links that restore the exact filter state.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-tag-01"></i>
                        <span class="nds-label">Applied Filter Chips</span>
                    </span>
                    <p class="nds-item-desc">Active filters display as removable chips below the filter bar. Clicking a chip removes that filter and re-applies the remaining criteria.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-search-01"></i>
                        <span class="nds-label">No Results Alert</span>
                    </span>
                    <p class="nds-item-desc">Shows a warning alert with a "Clear Filter" action when no cards match the current criteria. The alert dismisses automatically when results reappear.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-refresh"></i>
                        <span class="nds-label">Dynamic and Cascading Filters</span>
                    </span>
                    <p class="nds-item-desc">Use <code class="nds-inline-code lang-js">populateFilter()</code> to generate or replace filter inputs at runtime. Supports cascading filters where one selection drives another filter's options via API.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-globe-02"></i>
                        <span class="nds-label">AJAX Form Submission</span>
                    </span>
                    <p class="nds-item-desc">Supports server-side filtering via AJAX with automatic HTML response injection and JSON response events for custom rendering.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-grid"></i>
                        <span class="nds-label">Custom Item Selectors</span>
                    </span>
                    <p class="nds-item-desc">Filter any element type by setting <code class="nds-inline-code lang-html">data-filter-items</code> on the target container. Works with list items, table rows, drawers, or any custom structure beyond the default <code class="nds-inline-code lang-html">.nds-card</code>.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-translate"></i>
                        <span class="nds-label">Value and Label Mapping</span>
                    </span>
                    <p class="nds-item-desc">Separate machine values from display labels using <code class="nds-inline-code lang-html">data-filter-value</code> on items or the object form of <code class="nds-inline-code lang-html">data-filter-values</code> on filter groups. Labels are derived automatically from visible text content.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Set filters, search terms, and reset state through the <code class="nds-inline-code lang-js">NDS.Filter</code> API. Access instances by selector, target ID, or the <code class="nds-inline-code lang-js">whenReady</code> helper.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="filterGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use client-side filtering when all items are already on the page and the dataset is small enough to load at once (under a few hundred cards)</li>
                    <li>Use AJAX form submission mode (<code class="nds-inline-code lang-html">data-filter-submit</code> + <code class="nds-inline-code lang-html">data-ajax</code>) for large datasets or when results come from an API endpoint</li>
                    <li>Use auto-generated filters (<code class="nds-inline-code lang-html">data-filter-type</code>) for quick setup when filter values come directly from card content. Use <code class="nds-inline-code lang-html">data-filter-values</code> to supply explicit values when cards don't exist or values differ from card content. Use <code class="nds-inline-code lang-js">populateFilter()</code> for dynamic or cascading values fetched at runtime</li>
                    <li>Do not use Filter for navigation menus or hierarchical browsing. Use <a class="nds-color" href="{{ 'ui-shell/side-nav' | relative_url }}">Side Nav</a> or <a class="nds-color" href="{{ 'components/tabs' | relative_url }}">Tabs</a> instead</li>
                    <li>Do not use Filter for single-field search without filter controls. Use the search box from <a class="nds-color" href="{{ 'components/forms' | relative_url }}">Forms</a> directly</li>
                    <li>Choose <strong>checkbox</strong> for multi-select with OR logic, <strong>radio</strong> for mutually exclusive single-select, and <strong>switch</strong> for feature toggles where each option is independent</li>
                    <li>Combine a search box with filter controls for the best experience. Search narrows by text while filters narrow by category</li>
                    <li>Always include a Reset/Clear button inside the dropmenu footer so users can undo selections before applying</li>
                    <li>Add the <code class="nds-inline-code lang-html">.nds-filter-applied</code> container to show applied filter chips. This gives users visibility into active filters and a quick way to remove individual ones</li>
                    <li>Keep filter group names short and descriptive. The <code class="nds-inline-code lang-html">data-filter-legend</code> value appears as the fieldset heading inside the dropmenu</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>

                <h4>Filter Anchor (<code class="nds-inline-code lang-html">.nds-filter</code>)</h4>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-target</code></td><td>ID of the container holding filterable items. Also used to link the anchor to its submission form, search box, applied-chips row, query/count slots, and filter controls.</td></tr>
                    </tbody>
                </table>

                <h4>Submission Form (separate <code class="nds-inline-code lang-html">&lt;form data-filter-target&gt;</code>)</h4>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-target</code></td><td>Must match the anchor's target id to activate form mode for that filter instance.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-submit</code></td><td>Marks this form as the submission form (enables form mode instead of client-side filtering).</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-ajax</code></td><td>Use AJAX instead of page navigation (requires <code class="nds-inline-code lang-html">data-filter-submit</code>).</td></tr>
                    </tbody>
                </table>

                <h4>Search Input Opt-Out</h4>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-ignore</code></td><td>Place on a search input (or its ancestor) to prevent the filter from auto-detecting and hijacking it. Useful when a server-side search input lives inside the filter scope but should not be used for client-side text filtering.</td></tr>
                    </tbody>
                </table>

                <h4>Target Container</h4>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-items</code></td><td>Set on the target container (the element referenced by <code class="nds-inline-code lang-html">data-filter-target</code>) to specify a custom CSS selector for filterable items. Default: <code class="nds-inline-code lang-html">.nds-card</code>. Example: <code class="nds-inline-code lang-html">data-filter-items=".search-result"</code> to filter non-card elements like list items or table rows.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-total-count</code></td><td>Set on the target container by server-side rendering or inside a <code class="nds-inline-code lang-js">nds:filterFormComplete</code> handler to provide a server-authoritative result count. When present, overrides the DOM-enumerated count written to <code class="nds-inline-code lang-html">[data-filter-count]</code> slots.</td></tr>
                    </tbody>
                </table>

                <h4>Result Count and Query Slots</h4>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-count</code></td><td>Place on any element linked via <code class="nds-inline-code lang-html">data-filter-target</code>. The filter writes the number of visible items into this element's <code class="nds-inline-code lang-html">textContent</code> after every filter pass. Pair with <code class="nds-inline-code lang-html">.nds-results-count</code> for the standard styling.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-query</code></td><td>Place on any element linked via <code class="nds-inline-code lang-html">data-filter-target</code>. The filter writes the active search keyword (wrapped in curly quotes) into this element's <code class="nds-inline-code lang-html">textContent</code>. When present, the search term is routed here instead of appearing as an applied-chip.</td></tr>
                    </tbody>
                </table>

                <h4>Filter Groups</h4>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-filter="name"</code></td><td>Filter group name. On filter controls, groups inputs together. On item elements, marks filterable content. Can be placed on child elements inside items or on the item itself.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-type</code></td><td>Auto-generate inputs. Values: <code class="nds-inline-code lang-html">checkbox</code>, <code class="nds-inline-code lang-html">radio</code>, or <code class="nds-inline-code lang-html">switch</code>. Scans cards for values unless <code class="nds-inline-code lang-html">data-filter-values</code> is set.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-values</code></td><td>JSON object mapping machine values to display labels, e.g. <code class="nds-inline-code lang-html">'{"A":"Label A","B":"Label B"}'</code>. Keys become checkbox/radio values, values become visible text. Also accepts a JSON array (<code class="nds-inline-code lang-html">'["A","B"]'</code>) which uses raw values as labels. Skips card scanning. Static: not affected by <code class="nds-inline-code lang-js">refresh()</code>. Use <code class="nds-inline-code lang-js">populateFilter()</code> if values need to change at runtime. Requires <code class="nds-inline-code lang-html">data-filter-type</code>.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-legend</code></td><td>Fieldset legend text for auto-generated filter groups</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-variant</code></td><td>CSS class to add to auto-generated input elements (e.g. <code class="nds-inline-code lang-html">nds-primary</code>)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-value</code></td><td>Set on a <code class="nds-inline-code lang-html">[data-filter]</code> element to provide a machine-readable filter value separate from the visible text. The display label is derived from the element's text content automatically. Example: <code class="nds-inline-code lang-html">&lt;span data-filter="type" data-filter-value="Announcement"&gt;Translated Label&lt;/span&gt;</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-name</code></td><td>Custom display name used in applied filter chips instead of the raw value</td></tr>
                    </tbody>
                </table>

                <h4>Action Buttons</h4>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-action="apply"</code></td><td>Apply current filter selections and close the dropmenu</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-action="clear"</code></td><td>Reset all filter inputs in the dropmenu without closing it</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-filter-action="reset"</code></td><td>Clear all filters, search, and chips, and show all items</td></tr>
                    </tbody>
                </table>

                <h4>Applied Filters Container</h4>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-chip-class</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-filter-applied</code> to customize chip styling. Default: <code class="nds-inline-code lang-html">nds-primary nds-lg</code></td></tr>
                    </tbody>
                </table>

                <h4>Search Box (AJAX mode)</h4>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-url</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-search-box</code>. API endpoint for search autocomplete suggestions</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-name</code></td><td>JSON field name to display from autocomplete results</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-query-param</code></td><td>URL query parameter name for the search term</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--dropmenu-min-width</code></td><td>250px</td><td>Minimum width of the filter dropmenu</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <code class="nds-inline-code lang-js">NDS.Filter</code> API provides methods to create, query, and control filter instances programmatically. For dynamically added filter forms, call <code class="nds-inline-code lang-js">NDS.Filter.init()</code> to initialize new instances.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Get a filter instance ───────────────────────────
const filter = NDS.Filter.getInstance('.nds-filter');
const filter = NDS.Filter.getInstance(element);
const filter = NDS.Filter.getByTarget('cardList');

// ── Wait for initialization (safe with deferred scripts) ──
NDS.Filter.whenReady('.nds-filter', (instance) =&gt; {
    // instance is guaranteed ready
    // fires immediately if already initialized
});

// ── Set filters and search programmatically ─────────
filter.setFilterValues('department', ['Engineering', 'Design']);  // Check/uncheck existing inputs
filter.setSearchValue('Ahmed');
filter.removeFilterValue('department', 'Design');

// ── Generate filter inputs from values (no card scanning) ──
filter.populateFilter('system', ['Identity', 'Transport', 'Healthcare']);          // checkbox (default)
filter.populateFilter('priority', ['High', 'Medium', 'Low'], 'radio');            // radio
filter.populateFilter('system', ['New A', 'New B']);  // re-calling replaces previous inputs
// Note: populateFilter() owns its values — refresh() will not overwrite them

// ── Query current state ─────────────────────────────
const criteria = filter.getCriteria();
// Returns: { search: 'ahmed', filters: { department: ['Engineering'] } }

const visible = filter.getVisibleItems();   // Array of visible card elements
const hidden = filter.getHiddenItems();     // Array of hidden card elements

// ── Reset and refresh ───────────────────────────────
filter.reset();     // Clear all filters and search, show all items
filter.clear();     // Clear all inputs without re-showing items
filter.refresh();   // Re-resolve target container, re-scan items, regenerate auto filters

// ── Manual control ──────────────────────────────────
filter.applyFilters();  // Trigger filtering logic manually
filter.submitForm();    // Submit the form (form submission mode only)
filter.destroy();       // Show all items and remove initialization flag

// Re-apply URL params after dynamically adding filter inputs
filter.reapplyUrlParamsForFilter('system');

// ── Static methods ──────────────────────────────────
NDS.Filter.init();                    // Initialize any new .nds-filter elements on page
NDS.Filter.reinit();                  // Same as init()
NDS.Filter.create(containerEl);       // Manually instantiate — returns an NDSFilter instance

// ── Events ──────────────────────────────────────────
// nds:filter:ready - Filter initialized
filterEl.addEventListener('nds:filter:ready', (e) =&gt; {
    const instance = e.detail;  // the NDSFilter instance
});

// nds:filter:change - Fires after every applyFilters() call, including when
// all criteria are cleared (visibleItems === totalItems in that case)
filterEl.addEventListener('nds:filter:change', (e) =&gt; {
    const { criteria, totalItems, visibleItems, hiddenItems } = e.detail;
});

// nds:filter:reset - All filters cleared via reset()
filterEl.addEventListener('nds:filter:reset', (e) =&gt; {
    const { totalItems } = e.detail;
});

// nds:filter:clear - Dropmenu clear button clicked
filterEl.addEventListener('nds:filter:clear', (e) =&gt; {
    const { filter } = e.detail;
});

// ── AJAX mode events ────────────────────────────────
// nds:filterFormSubmit - Before any form submission (cancelable)
filterEl.addEventListener('nds:filterFormSubmit', (e) =&gt; {
    const { criteria, form } = e.detail;
});

// nds:filterFormAjax - Before AJAX request (cancelable)
// Call e.preventDefault() to handle the request yourself
filterEl.addEventListener('nds:filterFormAjax', (e) =&gt; {
    const { criteria, form, hiddenInputsContainer } = e.detail;
});

// nds:filterFormComplete - AJAX response received
filterEl.addEventListener('nds:filterFormComplete', (e) =&gt; {
    const { success, isJson, data, html, form } = e.detail;
});

// nds:filterFormError - AJAX request failed
filterEl.addEventListener('nds:filterFormError', (e) =&gt; {
    const { error, form } = e.detail;
});
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
