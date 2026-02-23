---
layout: page
title: Filter
hero_title: Filter Component - National Design System
hero_description: Search, filter, and sort content with a flexible filtering UI that supports client-side filtering and AJAX form submission
breadcrumb: ["Components"]
lang: en
direction: ltr
layout_class: cardView topSubMenu
---

<!-- Basic Client-Side Filter -->
<section id="basicFilter" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Basic Client-Side Filter</h2>
            <p class="nds-section-description">Search and filter cards using auto-generated checkbox filters. The
                component scans card content and builds filter options automatically.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Search + Auto Checkbox Filter</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <form class="nds-section-search nds-filter" data-filter-target="basicFilterCards">
                                <div class="nds-form-container nds-search-box">
                                    <div class="nds-search-content">
                                        <div class="nds-form-control">
                                            <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                                            <input type="text" class="nds-search-input" placeholder="Search cards...">
                                            <div class="nds-form-action">
                                                <button class="nds-btn nds-subtle clear" hidden><i
                                                        class="hgi hgi-stroke hgi-cancel-01 icon"></i></button>
                                            </div>
                                        </div>
                                        <button class="nds-btn nds-primary nds-search-btn" type="button">
                                            <i class="hgi hgi-stroke hgi-search-01 icon"></i>
                                            <span class="label">Search</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="nds-dropmenu">
                                    <button
                                        class="nds-btn nds-neutral nds-menu-btn nds-filter-btn nds-dropmenu-trigger">
                                        <i class="hgi hgi-stroke hgi-filter icon"></i>
                                        <span class="label">Filter</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <div class="nds-form-group nds-check-group nds-dropmenu-item" data-filter="department"
                                                data-filter-type="checkbox" data-filter-legend="Department"
                                                data-no-auto-close>
                                            </div>
                                            <hr class="nds-divider nds-lg">
                                            <div class="nds-form-group nds-check-group nds-dropmenu-item" data-filter="role"
                                                data-filter-type="radio" data-filter-legend="Role" data-no-auto-close>
                                            </div>
                                        </div>
                                        <div class="nds-dropmenu-footer">
                                            <hr class="nds-dropmenu-divider nds-lg">
                                            <div class="nds-dropmenu-action nds-grid">
                                                <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                                    data-filter-action="clear" data-no-auto-close>
                                                    <span class="label">Reset</span>
                                                </button>
                                                <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                                    data-filter-action="apply">
                                                    <span class="label">Filter</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-filter-applied" hidden>
                                    <span class="label">Applied Filters:</span>
                                    <div class="nds-chips"></div>
                                </div>
                            </form>
                            <div id="basicFilterCards" class="nds-grid"
                                style="--max-col: 3; --mid-col: 2; --min-col: 1;">
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Ahmed Mohamed</h3>
                                            <span class="nds-card-description">Software Developer</span>
                                        </div>
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm"><span class="label"
                                                    data-filter="department">Engineering</span></span>
                                            <span class="nds-tag nds-green nds-sm"><span class="label"
                                                    data-filter="role">Developer</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Sara Ali</h3>
                                            <span class="nds-card-description">UX Designer</span>
                                        </div>
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm"><span class="label"
                                                    data-filter="department">Design</span></span>
                                            <span class="nds-tag nds-green nds-sm"><span class="label"
                                                    data-filter="role">Designer</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Omar Hassan</h3>
                                            <span class="nds-card-description">Project Manager</span>
                                        </div>
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm"><span class="label"
                                                    data-filter="department">Engineering</span></span>
                                            <span class="nds-tag nds-green nds-sm"><span class="label"
                                                    data-filter="role">Manager</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Fatima Khalid</h3>
                                            <span class="nds-card-description">Frontend Developer</span>
                                        </div>
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm"><span class="label"
                                                    data-filter="department">Engineering</span></span>
                                            <span class="nds-tag nds-green nds-sm"><span class="label"
                                                    data-filter="role">Developer</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Layla Nasser</h3>
                                            <span class="nds-card-description">Marketing Lead</span>
                                        </div>
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm"><span class="label"
                                                    data-filter="department">Marketing</span></span>
                                            <span class="nds-tag nds-green nds-sm"><span class="label"
                                                    data-filter="role">Manager</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Khaled Ibrahim</h3>
                                            <span class="nds-card-description">Visual Designer</span>
                                        </div>
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm"><span class="label"
                                                    data-filter="department">Design</span></span>
                                            <span class="nds-tag nds-green nds-sm"><span class="label"
                                                    data-filter="role">Designer</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
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
<!-- Filter Form -->
<form class="nds-filter" data-filter-target="cardList">
  <div class="nds-form-container nds-search-box">
    <div class="nds-search-content">
      <div class="nds-form-control">
        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
        <input type="text" class="nds-search-input" placeholder="Search...">
        <div class="nds-form-action">
          <button class="nds-btn nds-subtle clear" hidden>
            <i class="hgi hgi-stroke hgi-cancel-01 icon"></i>
          </button>
        </div>
      </div>
      <button class="nds-btn nds-primary nds-search-btn" type="button">
        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
        <span class="label">Search</span>
      </button>
    </div>
  </div>
  <div class="nds-dropmenu">
    <button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger">
      <i class="hgi hgi-stroke hgi-filter icon"></i>
      <span class="label">Filter</span>
    </button>
    <div class="nds-dropmenu-menu" hidden>
      <div class="nds-dropmenu-scroll">
        <!-- Auto-generated checkbox filter -->
        <div class="nds-form-group nds-check-group nds-dropmenu-item"
          data-filter="department"
          data-filter-type="checkbox"
          data-filter-legend="Department"
          data-no-auto-close>
        </div>
        <hr class="nds-divider nds-lg">
        <!-- Auto-generated radio filter -->
        <div class="nds-form-group nds-check-group nds-dropmenu-item"
          data-filter="role"
          data-filter-type="radio"
          data-filter-legend="Role"
          data-no-auto-close>
        </div>
      </div>
      <div class="nds-dropmenu-footer">
        <hr class="nds-dropmenu-divider nds-lg">
        <div class="nds-dropmenu-action nds-grid">
          <button class="nds-btn nds-secondary" type="button"
            data-filter-action="clear" data-no-auto-close>
            <span class="label">Reset</span>
          </button>
          <button class="nds-btn nds-primary" type="button"
            data-filter-action="apply">
            <span class="label">Filter</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-filter-applied" hidden>
    <span class="label">Applied Filters:</span>
    <div class="nds-chips"></div>
  </div>
</form>

<!-- Filterable Cards -->
<div id="cardList" class="nds-grid"
  style="--max-col: 3; --mid-col: 2; --min-col: 1;">
  <div class="nds-card nds-stroke">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <h3 class="nds-card-title">Card Title</h3>
        <span class="nds-card-description">Description</span>
      </div>
      <div class="nds-card-tags">
        <span class="nds-tag nds-blue nds-sm">
          <span class="label" data-filter="department">Engineering</span>
        </span>
        <span class="nds-tag nds-green nds-sm">
          <span class="label" data-filter="role">Developer</span>
        </span>
      </div>
    </div>
  </div>
</div>
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

<!-- Filter Types -->
<section id="filterTypes" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Auto-Generated Filter Types</h2>
            <p class="nds-section-description">Three filter input types that auto-generate from card content: checkbox
                (multi-select, OR logic), radio (single-select), and switch (toggle, OR logic)</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <!-- Checkbox -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Checkbox Filter (Multi-Select)</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <form class="nds-filter" data-filter-target="checkboxCards">
                                <div class="nds-dropmenu">
                                    <button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger">
                                        <i class="hgi hgi-stroke hgi-filter icon"></i>
                                        <span class="label">Filter</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" style="min-width: 260px;" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <div class="nds-form-group nds-check-group nds-dropmenu-item" data-filter="status"
                                                data-filter-type="checkbox" data-filter-legend="Status"
                                                data-no-auto-close>
                                            </div>
                                        </div>
                                        <div class="nds-dropmenu-footer">
                                            <hr class="nds-dropmenu-divider nds-lg">
                                            <div class="nds-dropmenu-action nds-grid">
                                                <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                                    data-filter-action="clear" data-no-auto-close>
                                                    <span class="label">Reset</span>
                                                </button>
                                                <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                                    data-filter-action="apply">
                                                    <span class="label">Apply</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-filter-applied" hidden>
                                    <span class="label">Applied Filters:</span>
                                    <div class="nds-chips"></div>
                                </div>
                            </form>
                            <div id="checkboxCards" class="nds-grid" style="--max-col: 2; --mid-col: 2; --min-col: 1;">
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Task A</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-green nds-sm"><span
                                                    class="label" data-filter="status">Active</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Task B</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-neutral nds-sm"><span
                                                    class="label" data-filter="status">Pending</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Task C</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-blue nds-sm"><span
                                                    class="label" data-filter="status">Complete</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Task D</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-green nds-sm"><span
                                                    class="label" data-filter="status">Active</span></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-checkbox-1" id="tab-checkbox-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-checkbox-1"
                                    aria-labelledby="tab-checkbox-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<!-- Checkbox: multi-select, OR logic -->
<div data-filter="status"
  data-filter-type="checkbox"
  data-filter-legend="Status"
  data-no-auto-close>
</div>
                                </code>
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
                            <form class="nds-filter" data-filter-target="radioCards">
                                <div class="nds-dropmenu">
                                    <button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger">
                                        <i class="hgi hgi-stroke hgi-filter icon"></i>
                                        <span class="label">Filter</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" style="min-width: 260px;" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <div class="nds-form-group nds-check-group nds-dropmenu-item" data-filter="priority"
                                                data-filter-type="radio" data-filter-legend="Priority"
                                                data-no-auto-close>
                                            </div>
                                        </div>
                                        <div class="nds-dropmenu-footer">
                                            <hr class="nds-dropmenu-divider nds-lg">
                                            <div class="nds-dropmenu-action nds-grid">
                                                <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                                    data-filter-action="clear" data-no-auto-close>
                                                    <span class="label">Reset</span>
                                                </button>
                                                <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                                    data-filter-action="apply">
                                                    <span class="label">Apply</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-filter-applied" hidden>
                                    <span class="label">Applied Filters:</span>
                                    <div class="nds-chips"></div>
                                </div>
                            </form>
                            <div id="radioCards" class="nds-grid" style="--max-col: 2; --mid-col: 2; --min-col: 1;">
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Feature Request</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-red nds-sm"><span
                                                    class="label" data-filter="priority">High</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Bug Fix</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-yellow nds-sm"><span
                                                    class="label" data-filter="priority">Medium</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Documentation</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-neutral nds-sm"><span
                                                    class="label" data-filter="priority">Low</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Security Patch</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-red nds-sm"><span
                                                    class="label" data-filter="priority">High</span></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-radio-1" id="tab-radio-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-radio-1"
                                    aria-labelledby="tab-radio-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<!-- Radio: single-select -->
<div data-filter="priority"
  data-filter-type="radio"
  data-filter-legend="Priority"
  data-no-auto-close>
</div>
                                </code>
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
                            <form class="nds-filter" data-filter-target="switchCards">
                                <div class="nds-dropmenu">
                                    <button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger">
                                        <i class="hgi hgi-stroke hgi-filter icon"></i>
                                        <span class="label">Filter</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" style="min-width: 260px;" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <div class="nds-form-group nds-check-group nds-dropmenu-item" data-filter="feature"
                                                data-filter-type="switch" data-filter-legend="Features"
                                                data-no-auto-close>
                                            </div>
                                        </div>
                                        <div class="nds-dropmenu-footer">
                                            <hr class="nds-dropmenu-divider nds-lg">
                                            <div class="nds-dropmenu-action nds-grid">
                                                <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                                    data-filter-action="clear" data-no-auto-close>
                                                    <span class="label">Reset</span>
                                                </button>
                                                <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                                    data-filter-action="apply">
                                                    <span class="label">Apply</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-filter-applied" hidden>
                                    <span class="label">Applied Filters:</span>
                                    <div class="nds-chips"></div>
                                </div>
                            </form>
                            <div id="switchCards" class="nds-grid" style="--max-col: 2; --mid-col: 2; --min-col: 1;">
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">App Alpha</h3>
                                        </div>
                                        <div class="nds-card-tags">
                                            <span class="nds-tag nds-blue nds-sm"><span class="label"
                                                    data-filter="feature">SSO</span></span>
                                            <span class="nds-tag nds-blue nds-sm"><span class="label"
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
                                            <span class="nds-tag nds-blue nds-sm"><span class="label"
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
                                            <span class="nds-tag nds-blue nds-sm"><span class="label"
                                                    data-filter="feature">API</span></span>
                                            <span class="nds-tag nds-blue nds-sm"><span class="label"
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
                                            <span class="nds-tag nds-blue nds-sm"><span class="label"
                                                    data-filter="feature">Webhooks</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-switch-1" id="tab-switch-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-switch-1"
                                    aria-labelledby="tab-switch-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<!-- Switch: toggle, OR logic -->
<div data-filter="feature"
  data-filter-type="switch"
  data-filter-legend="Features"
  data-no-auto-close>
</div>
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

<!-- Manual Filters -->
<section id="manualFilters" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Manual Filters</h2>
            <p class="nds-section-description">Pre-built HTML filter controls for custom layouts and values. Use when
                you need full control over the filter options instead of auto-generation.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Custom Radio Filter</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <form class="nds-filter" data-filter-target="manualCards">
                                <div class="nds-dropmenu">
                                    <button class="nds-btn nds-neutral nds-filter-btn nds-dropmenu-trigger">
                                        <i class="hgi hgi-stroke hgi-filter icon"></i>
                                        <span class="label">Filter</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <fieldset class="nds-form-group nds-check-group nds-dropmenu-item" data-filter="category"
                                                data-no-auto-close>
                                                <legend class="label">Category</legend>
                                                <div class="nds-form-container nds-radio-container">
                                                    <div class="nds-form-header"><label for="cat-all"><span
                                                                class="label">All</span></label></div>
                                                    <div class="nds-form-control">
                                                        <input type="radio" id="cat-all" name="category" value=""
                                                            class="nds-radio" checked>
                                                    </div>
                                                </div>
                                                <div class="nds-form-container nds-radio-container">
                                                    <div class="nds-form-header"><label for="cat-tech"><span
                                                                class="label">Technology</span></label></div>
                                                    <div class="nds-form-control">
                                                        <input type="radio" id="cat-tech" name="category"
                                                            value="Technology" class="nds-radio">
                                                    </div>
                                                </div>
                                                <div class="nds-form-container nds-radio-container">
                                                    <div class="nds-form-header"><label for="cat-design"><span
                                                                class="label">Design</span></label></div>
                                                    <div class="nds-form-control">
                                                        <input type="radio" id="cat-design" name="category"
                                                            value="Design" class="nds-radio">
                                                    </div>
                                                </div>
                                                <div class="nds-form-container nds-radio-container">
                                                    <div class="nds-form-header"><label for="cat-business"><span
                                                                class="label">Business</span></label></div>
                                                    <div class="nds-form-control">
                                                        <input type="radio" id="cat-business" name="category"
                                                            value="Business" class="nds-radio">
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div class="nds-dropmenu-footer">
                                            <hr class="nds-dropmenu-divider nds-lg">
                                            <div class="nds-dropmenu-action nds-grid">
                                                <button class="nds-btn nds-secondary nds-dropmenu-item" type="button"
                                                    data-filter-action="clear" data-no-auto-close>
                                                    <span class="label">Reset</span>
                                                </button>
                                                <button class="nds-btn nds-primary nds-dropmenu-item" type="button"
                                                    data-filter-action="apply">
                                                    <span class="label">Filter</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-filter-applied" hidden>
                                    <span class="label">Applied Filters:</span>
                                    <div class="nds-chips"></div>
                                </div>
                            </form>
                            <div id="manualCards" class="nds-grid" style="--max-col: 3; --mid-col: 2; --min-col: 1;">
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">AI Research</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-blue nds-sm"><span
                                                    class="label" data-filter="category">Technology</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Brand Identity</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-green nds-sm"><span
                                                    class="label" data-filter="category">Design</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Market Analysis</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-yellow nds-sm"><span
                                                    class="label" data-filter="category">Business</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Cloud Migration</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-blue nds-sm"><span
                                                    class="label" data-filter="category">Technology</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">UX Audit</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-green nds-sm"><span
                                                    class="label" data-filter="category">Design</span></span></div>
                                    </div>
                                </div>
                                <div class="nds-card nds-stroke">
                                    <div class="nds-card-content">
                                        <div class="nds-card-text">
                                            <h3 class="nds-card-title">Revenue Report</h3>
                                        </div>
                                        <div class="nds-card-tags"><span class="nds-tag nds-yellow nds-sm"><span
                                                    class="label" data-filter="category">Business</span></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-manual-1" id="tab-manual-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-manual-1"
                                    aria-labelledby="tab-manual-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<!-- Manual radio filter with custom HTML -->
<fieldset class="nds-form-group nds-check-group nds-dropmenu-item"
  data-filter="category" data-no-auto-close>
  <legend class="label">Category</legend>
  <div class="nds-form-container nds-radio-container">
    <div class="nds-form-header">
      <label for="cat-all"><span class="label">All</span></label>
    </div>
    <div class="nds-form-control">
      <input type="radio" id="cat-all" name="category"
        value="" class="nds-radio" checked>
    </div>
  </div>
  <div class="nds-form-container nds-radio-container">
    <div class="nds-form-header">
      <label for="cat-tech"><span class="label">Technology</span></label>
    </div>
    <div class="nds-form-control">
      <input type="radio" id="cat-tech" name="category"
        value="Technology" class="nds-radio">
    </div>
  </div>
</fieldset>
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
<section id="ajaxFilter" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">AJAX Form Submission</h2>
            <p class="nds-section-description">Send filter criteria to a server endpoint via AJAX. HTML responses are
                auto-injected into the target container. JSON responses dispatch raw data via event for developer
                rendering.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">AJAX Filter Form</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-content-block">
                                <p>Add <strong>data-filter-submit</strong> and <strong>data-ajax</strong> attributes to
                                    a form element. Set the <strong>action</strong> attribute to the API endpoint URL.
                                </p>
                                <p>HTML responses are automatically injected into the target container. For JSON
                                    responses, listen for the <strong>nds:filterFormComplete</strong> event and render
                                    the data yourself.</p>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-ajax-html" id="tab-ajax-html">
                                        <span class="nds-tab-label">HTML Response</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-ajax-json" id="tab-ajax-json">
                                        <span class="nds-tab-label">JSON Response</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-ajax-html"
                                    aria-labelledby="tab-ajax-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<!-- AJAX form — HTML response auto-injected -->
<form class="nds-filter" data-filter-target="results"
  data-filter-submit data-ajax
  method="GET" action="https://api.example.com/search">

  <div class="nds-form-container nds-search-box"
    data-url="https://api.example.com/search"
    data-name="Title" data-query-param="searchKeyword">
    <div class="nds-search-content">
      <div class="nds-form-control">
        <i class="hgi hgi-stroke hgi-search-01 icon"></i>
        <input type="text" class="nds-search-input"
          name="search" placeholder="Search...">
      </div>
      <button class="nds-btn nds-primary nds-search-btn"
        type="button">
        <span class="label">Search</span>
      </button>
    </div>
  </div>

  <div class="nds-dropmenu">
    <button class="nds-btn nds-neutral nds-dropmenu-trigger">
      <i class="hgi hgi-stroke hgi-filter icon"></i>
      <span class="label">Filter</span>
    </button>
    <div class="nds-dropmenu-menu" hidden>
      <fieldset data-filter="category" data-no-auto-close>
        <legend class="label">Category</legend>
        <!-- filter inputs here -->
      </fieldset>
      <button data-filter-action="apply">Apply</button>
    </div>
  </div>

  <div class="nds-filter-applied" hidden>
    <span class="label">Applied Filters:</span>
    <div class="nds-chips"></div>
  </div>
</form>

<div id="results">
  <!-- HTML response will be injected here -->
</div>
                                </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-ajax-json"
                                    aria-labelledby="tab-ajax-json" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<!-- AJAX form — JSON response handled via event -->
<form class="nds-filter" id="myFilter"
  data-filter-target="results"
  data-filter-submit data-ajax
  method="GET" action="https://api.example.com/search">
  <!-- same filter structure -->
</form>

<div id="results"></div>

<script>
    document.getElementById('myFilter')
        .addEventListener('nds:filterFormComplete', (e) => {
            const { success, isJson, data } = e.detail;

            if (isJson && success) {
                const container = document.getElementById('results');
                container.innerHTML = '';

                // Render JSON data — structure depends on your API
                data.Records.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'nds-card nds-stroke';
                    card.innerHTML = `
          <div class="nds-card-content">
            <h3 class="nds-card-title">${item.Title}</h3>
            <p class="nds-card-description">${item.Description}</p>
          </div>`;
                    container.appendChild(card);
                });
            }
        });
</script>
                                </code>
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
                            <div class="nds-content-block">
                                <p>Use <strong>preventDefault()</strong> on the <strong>nds:filterFormAjax</strong> event
                                    to fully control the AJAX request and rendering. The filter component still handles
                                    UI updates (chips, count, URL params) before dispatching the event.</p>
                                <p>All filter actions (apply, chip removal, reset, clear) fire through
                                    <strong>nds:filterFormAjax</strong>, so you only need one event listener.</p>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-ajax-custom" id="tab-ajax-custom">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-ajax-custom"
                                    aria-labelledby="tab-ajax-custom">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-javascript code">
// Intercept AJAX and handle fetching yourself
// Covers: apply, chip removal, reset, and clear
filterForm.addEventListener('nds:filterFormAjax', (e) => {
    e.preventDefault();

    // Build your own params from form inputs
    const params = {};
    const search = filterForm.querySelector('input[name="search"]');
    if (search && search.value) params.q = search.value;

    // Fetch from your API
    fetch('/api/search', { method: 'POST', body: new URLSearchParams(params) })
        .then(res => res.json())
        .then(data => renderResults(data.Records));
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

<!-- JavaScript API -->
<section id="jsApi" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">JavaScript API</h2>
            <p class="nds-section-description">Programmatic control of filter instances</p>
        </div>
        <div class="nds-section-content">

            <h3>Getting an Instance</h3>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
// By filter container selector or element
const filter = NDSFilter.getInstance('.nds-filter');
const filter = NDSFilter.getInstance(element);

// By target container ID
const filter = NDSFilter.getByTarget('cardList');

// Wait for initialization (handles race conditions with deferred scripts)
NDSFilter.whenReady('.nds-filter', (instance) => {
    // instance is guaranteed ready
    // fires immediately if already initialized, or waits for nds:filter:ready
});
                    </code>
                </div>
            </div>

            <h3>Methods</h3>

            <table class="nds-table nds-responsive" style="--min-width:700px;">
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>setFilterValues(name, values[])</td>
                        <td>Set filter values programmatically and apply</td>
                    </tr>
                    <tr>
                        <td>setSearchValue(term)</td>
                        <td>Set search value and apply</td>
                    </tr>
                    <tr>
                        <td>removeFilterValue(name, value)</td>
                        <td>Remove a single filter value</td>
                    </tr>
                    <tr>
                        <td>getCriteria()</td>
                        <td>Get current filter criteria { search, filters }</td>
                    </tr>
                    <tr>
                        <td>getVisibleItems()</td>
                        <td>Get array of visible card elements</td>
                    </tr>
                    <tr>
                        <td>getHiddenItems()</td>
                        <td>Get array of hidden card elements</td>
                    </tr>
                    <tr>
                        <td>reset()</td>
                        <td>Clear all filters and search, show all items</td>
                    </tr>
                    <tr>
                        <td>refresh()</td>
                        <td>Re-scan cards and regenerate auto filters (client-side only)</td>
                    </tr>
                    <tr>
                        <td>applyFilters()</td>
                        <td>Trigger filtering logic manually</td>
                    </tr>
                    <tr>
                        <td>submitForm()</td>
                        <td>Submit the form (form submission mode only)</td>
                    </tr>
                    <tr>
                        <td>reapplyUrlParamsForFilter(name)</td>
                        <td>Re-apply URL params for a specific filter after dynamic inputs are added</td>
                    </tr>
                    <tr>
                        <td>destroy()</td>
                        <td>Show all items and remove initialization flag</td>
                    </tr>
                </tbody>
            </table>

            <h3>Static Methods</h3>

            <table class="nds-table nds-responsive" style="--min-width:700px;">
                <thead>
                    <tr>
                        <th>Method</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>NDSFilter.getInstance(selector)</td>
                        <td>Get filter instance by selector or element</td>
                    </tr>
                    <tr>
                        <td>NDSFilter.getByTarget(targetId)</td>
                        <td>Get filter instance by target container ID</td>
                    </tr>
                    <tr>
                        <td>NDSFilter.whenReady(selector, callback)</td>
                        <td>Execute callback when filter is initialized. Fires immediately if already ready, otherwise waits for <strong>nds:filter:ready</strong> event</td>
                    </tr>
                </tbody>
            </table>

            <h3>Events</h3>

            <table class="nds-table nds-responsive" style="--min-width:700px;">
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Description</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>nds:filter:ready</td>
                        <td>Filter component initialized and ready</td>
                        <td>instance (the NDSFilter instance)</td>
                    </tr>
                    <tr>
                        <td>nds:filter:change</td>
                        <td>Filters or search changed (fires in all modes)</td>
                        <td>{ criteria, totalItems, visibleItems, hiddenItems }</td>
                    </tr>
                    <tr>
                        <td>nds:filter:reset</td>
                        <td>All filters cleared</td>
                        <td>{ totalItems }</td>
                    </tr>
                    <tr>
                        <td>nds:filter:clear</td>
                        <td>Dropmenu clear button clicked</td>
                        <td>{ filter }</td>
                    </tr>
                    <tr>
                        <td>nds:filterFormSubmit</td>
                        <td>Before any form submission</td>
                        <td>{ form }</td>
                    </tr>
                    <tr>
                        <td>nds:filterFormAjax</td>
                        <td>Before AJAX request (cancelable)</td>
                        <td>{ url, options, form }</td>
                    </tr>
                    <tr>
                        <td>nds:filterFormComplete</td>
                        <td>AJAX response received</td>
                        <td>{ success, isJson, data?, html?, form }</td>
                    </tr>
                    <tr>
                        <td>nds:filterFormError</td>
                        <td>AJAX request failed</td>
                        <td>{ error, form }</td>
                    </tr>
                </tbody>
            </table>

            <h3>Example: Listen for Changes</h3>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <div class="nds-expandable-content">
                    <code class="lang-javascript line-numbers">
// Wait for filter to be ready (safe with deferred scripts)
NDSFilter.whenReady('.nds-filter', (instance) => {
    console.log('Filter ready:', instance);
});

// Or use the event directly
document.querySelector('.nds-filter')
  .addEventListener('nds:filter:ready', (e) => {
    const instance = e.detail;
    console.log('Filter initialized:', instance);
  });

// Listen for filter changes (client-side mode)
document.querySelector('.nds-filter')
  .addEventListener('nds:filter:change', (e) => {
    console.log('Visible items:', e.detail.visibleItems);
    console.log('Criteria:', e.detail.criteria);
  });

// Set filters programmatically
const filter = NDSFilter.getByTarget('cardList');
filter.setFilterValues('department', ['Engineering', 'Design']);
filter.setSearchValue('Ahmed');

// Reset all filters
filter.reset();
                    </code>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- HTML Attributes Reference -->
<section id="attributes" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">HTML Attributes</h2>
            <p class="nds-section-description">All data attributes used by the filter component</p>
        </div>
        <div class="nds-section-content">

            <h3>Filter Container</h3>

            <table class="nds-table nds-responsive" style="--min-width:700px;">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>data-filter-target</td>
                        <td>ID of the container holding filterable cards</td>
                    </tr>
                    <tr>
                        <td>data-filter-submit</td>
                        <td>Enable form submission mode (syncs hidden inputs)</td>
                    </tr>
                    <tr>
                        <td>data-ajax</td>
                        <td>Use AJAX instead of page navigation for form submission</td>
                    </tr>
                </tbody>
            </table>

            <h3>Filter Groups</h3>

            <table class="nds-table nds-responsive" style="--min-width:700px;">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>data-filter</td>
                        <td>Filter group name (must match data-filter on card elements)</td>
                    </tr>
                    <tr>
                        <td>data-filter-type</td>
                        <td>Auto-generate inputs: checkbox, radio, or switch</td>
                    </tr>
                    <tr>
                        <td>data-filter-legend</td>
                        <td>Fieldset legend text for auto-generated filters</td>
                    </tr>
                    <tr>
                        <td>data-filter-variant</td>
                        <td>CSS class to add to generated inputs</td>
                    </tr>
                    <tr>
                        <td>data-filter-name</td>
                        <td>Custom display name for filter chips</td>
                    </tr>
                </tbody>
            </table>

            <h3>Action Buttons</h3>

            <table class="nds-table nds-responsive" style="--min-width:700px;">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>data-filter-action="apply"</td>
                        <td>Apply current filter selections</td>
                    </tr>
                    <tr>
                        <td>data-filter-action="clear"</td>
                        <td>Reset all filter inputs in the dropmenu</td>
                    </tr>
                </tbody>
            </table>

            <h3>Search Box</h3>

            <table class="nds-table nds-responsive" style="--min-width:700px;">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>data-url</td>
                        <td>API endpoint for search autocomplete suggestions</td>
                    </tr>
                    <tr>
                        <td>data-name</td>
                        <td>JSON field name to display from autocomplete results</td>
                    </tr>
                    <tr>
                        <td>data-query-param</td>
                        <td>URL query parameter name for search term</td>
                    </tr>
                </tbody>
            </table>

            <h3>Card Content</h3>

            <table class="nds-table nds-responsive" style="--min-width:700px;">
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>data-filter="name"</td>
                        <td>Mark element as filterable content. Value is the filter group name.</td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</section>

<!-- URL Parameters -->
<section id="urlParams" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">URL Parameters</h2>
            <p class="nds-section-description">Filter state is automatically synced to URL query parameters for
                bookmarkable and shareable links</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-content-block">
                <h3 class="nds-block-title">Auto-Sync Behavior</h3>
                <p>The filter component automatically reads URL parameters on page load and applies matching filters.
                    When filters change, the URL is updated to reflect the current state.</p>
                <p>URL format: <strong>?search=term&amp;department=engineering,design&amp;role=developer</strong></p>
                <p>Multiple filter values are separated by commas. Parameter names match the
                    <strong>data-filter</strong> group names.</p>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Dynamic Filter Inputs</h3>
                <p>When filter inputs are added dynamically (e.g. cascading filters loaded via API), the component
                    automatically detects new inputs and re-applies matching URL parameters. This means dynamically
                    loaded filter options will be pre-selected from URL state without any extra code.</p>
                <p>Filter groups can start completely empty and be populated later. For example, a
                    <strong>data-filter="system"</strong> fieldset with no initial inputs will still be tracked.
                    When inputs are added via an API response, the component picks them up automatically, binds change
                    listeners, and re-applies any matching URL parameters.</p>
            </div>
        </div>
    </div>
</section>