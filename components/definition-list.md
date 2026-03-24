---
layout: page
title: Definition List
hero_title: Definition List - National Design System
hero_description: Semantic term-definition component for displaying structured information with optional icons and multiple layout modes
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- With Icons -->
<section id="definitionListIcons" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Semantic Definition List</h2>
            <p class="nds-section-description">Uses dl/dt/dd elements for accessible term-definition pairs with optional icons</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Layout: ">
                                    <span class="label">Layout: Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='["", ".nds-definition-list", "dlLayout"]'>
                                            <span class="label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["tableView", ".nds-definition-list", "dlLayout"]'>
                                            <span class="label">Table View</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-grid", ".nds-definition-list", "dlLayout"]'
                                            data-toggle-style=".nds-definition-list { --max-col:2; --mid-col:2; --min-col:1; width:fit-content }">
                                            <span class="label">Grid View</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Style: ">
                                    <span class="label">Style: Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='[["", ".nds-definition-list", "dlStyle"], ["", ".nds-definition-item", "dlStyle"]]'>
                                            <span class="label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-divided", ".nds-definition-list", "dlStyle"], ["", ".nds-definition-item", "dlStyle"]]'>
                                            <span class="label">Divided</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["", ".nds-definition-list", "dlStyle"], ["nds-card nds-stroke", ".nds-definition-item", "dlStyle"]]'>
                                            <span class="label">Card</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <dl class="nds-definition-list">
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-user-account icon"></i>
                                        <span class="label">Full Name</span>
                                    </dt>
                                    <dd>Mohammed Al-Harbi</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-building-02 icon"></i>
                                        <span class="label">Organization</span>
                                    </dt>
                                    <dd>Digital Services Department</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-briefcase-02 icon"></i>
                                        <span class="label">Position</span>
                                    </dt>
                                    <dd>Senior Developer</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-location-01 icon"></i>
                                        <span class="label">Location</span>
                                    </dt>
                                    <dd>Riyadh</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-dl-icons-1" id="tab-dl-icons-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-dl-icons-1" aria-labelledby="tab-dl-icons-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<dl class="nds-definition-list">
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-user-account icon"></i>
      <span class="label">Full Name</span>
    </dt>
    <dd>Mohammed Al-Harbi</dd>
  </div>
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-building-02 icon"></i>
      <span class="label">Organization</span>
    </dt>
    <dd>Digital Services Department</dd>
  </div>
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-briefcase-02 icon"></i>
      <span class="label">Position</span>
    </dt>
    <dd>Senior Developer</dd>
  </div>
  <div class="nds-definition-item">
    <dt>
      <i class="hgi hgi-stroke hgi-location-01 icon"></i>
      <span class="label">Location</span>
    </dt>
    <dd>Riyadh</dd>
  </div>
</dl>
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

<!-- Generic Elements -->
<section id="definitionListGeneric" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Feature List</h2>
            <p class="nds-section-description">Uses class-based markup for icon grids, feature highlights, and content that doesn't need term-definition semantics</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Style: ">
                                    <span class="label">Style: Divided</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["", ".nds-definition-list", "dlStyle"], ["", ".nds-definition-item", "dlStyle"]]'>
                                            <span class="label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn selected"
                                            data-toggler='[["nds-divided", ".nds-definition-list", "dlStyle"], ["", ".nds-definition-item", "dlStyle"]]'>
                                            <span class="label">Divided</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["", ".nds-definition-list", "dlStyle"], ["nds-card nds-stroke", ".nds-definition-item", "dlStyle"]]'>
                                            <span class="label">Card</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                                <div class="nds-definition-item">
                                    <span class="nds-item-title">
                                        <i class="hgi hgi-stroke hgi-checkmark-circle-02 icon"></i>
                                        <span class="label">Accessibility</span>
                                    </span>
                                    <p class="nds-item-desc">WCAG 2.1 compliant with full keyboard navigation and screen reader support.</p>
                                </div>
                                <div class="nds-definition-item">
                                    <span class="nds-item-title">
                                        <i class="hgi hgi-stroke hgi-shield-01 icon"></i>
                                        <span class="label">Security</span>
                                    </span>
                                    <p class="nds-item-desc">Built-in XSS protection and content security policy headers.</p>
                                </div>
                                <div class="nds-definition-item">
                                    <span class="nds-item-title">
                                        <i class="hgi hgi-stroke hgi-clock-01 icon"></i>
                                        <span class="label">Performance</span>
                                    </span>
                                    <p class="nds-item-desc">Lazy loading and staggered initialization for fast page loads.</p>
                                </div>
                                <div class="nds-definition-item">
                                    <span class="nds-item-title">
                                        <i class="hgi hgi-stroke hgi-star icon"></i>
                                        <span class="label">Theming</span>
                                    </span>
                                    <p class="nds-item-desc">CSS custom properties for full visual customization without overrides.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-dl-generic-1" id="tab-dl-generic-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-dl-generic-1" aria-labelledby="tab-dl-generic-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap:24px; --col-gap:32px;">
  <div class="nds-definition-item">
    <span class="nds-item-title">
      <i class="hgi hgi-stroke hgi-checkmark-circle-02 icon"></i>
      <span class="label">Accessibility</span>
    </span>
    <p class="nds-item-desc">WCAG 2.1 compliant with full keyboard navigation and screen reader support.</p>
  </div>
  <div class="nds-definition-item">
    <span class="nds-item-title">
      <i class="hgi hgi-stroke hgi-shield-01 icon"></i>
      <span class="label">Security</span>
    </span>
    <p class="nds-item-desc">Built-in XSS protection and content security policy headers.</p>
  </div>
  <div class="nds-definition-item">
    <span class="nds-item-title">
      <i class="hgi hgi-stroke hgi-clock-01 icon"></i>
      <span class="label">Performance</span>
    </span>
    <p class="nds-item-desc">Lazy loading and staggered initialization for fast page loads.</p>
  </div>
  <div class="nds-definition-item">
    <span class="nds-item-title">
      <i class="hgi hgi-stroke hgi-star icon"></i>
      <span class="label">Theming</span>
    </span>
    <p class="nds-item-desc">CSS custom properties for full visual customization without overrides.</p>
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
    </div>
</section>

<!-- Built-in Features -->
<section id="definitionListFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-content">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-table-01 icon"></i>
                        <span class="label">Table View Layout</span>
                    </span>
                    <p class="nds-item-desc">Two-column grid with CSS subgrid for perfect alignment across all term-definition pairs.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-border-all-01 icon"></i>
                        <span class="label">Divided Borders</span>
                    </span>
                    <p class="nds-item-desc">Optional border separators between items. Works in both default and table view layouts.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-grid-view icon"></i>
                        <span class="label">Grid Layout</span>
                    </span>
                    <p class="nds-item-desc">Multi-column responsive grid with configurable breakpoints via --max-col, --mid-col, and --min-col properties.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-board icon"></i>
                        <span class="label">CSS Custom Properties</span>
                    </span>
                    <p class="nds-item-desc">Control icon size, gap, title font size, and row spacing through custom properties without overriding styles.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="definitionListGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-content">

            <div class="nds-content-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Use <strong>semantic markup</strong> (<code class="nds-inline-code lang-html">&lt;dl&gt;/&lt;dt&gt;/&lt;dd&gt;</code>) for data display like user profiles, service details, or specifications where screen reader semantics matter</li>
                    <li>Use <strong>generic markup</strong> (<code class="nds-inline-code lang-html">.nds-item-title</code> / <code class="nds-inline-code lang-html">.nds-item-desc</code>) for feature lists, highlights, or content grids where semantic term-definition relationships don't apply</li>
                    <li>Use <strong>default layout</strong> for vertical stacking. Best when descriptions vary in length or include multiple lines</li>
                    <li>Use <strong>table view</strong> (<code class="nds-inline-code lang-html">tableView</code>) for compact side-by-side key-value display. Subgrid keeps columns aligned. Only works with <code class="nds-inline-code lang-html">&lt;dt&gt;/&lt;dd&gt;</code> markup</li>
                    <li>Use <strong>grid layout</strong> (<code class="nds-inline-code lang-html">nds-grid</code>) for multi-column responsive layouts. Configure breakpoints with <code class="nds-inline-code lang-html">--max-col</code>, <code class="nds-inline-code lang-html">--mid-col</code>, <code class="nds-inline-code lang-html">--min-col</code></li>
                    <li>Combine <strong>styles</strong> independently with any layout: <code class="nds-inline-code lang-html">nds-divided</code> for border separators, <code class="nds-inline-code lang-html">nds-card nds-stroke</code> on items for card appearance</li>
                    <li>Add icons to titles for visual identification. The component auto-indents descriptions to align with the label text</li>
                    <li>Customize sizing with CSS custom properties: <code class="nds-inline-code lang-html">--dl-icon-size</code>, <code class="nds-inline-code lang-html">--dl-icon-gap</code>, <code class="nds-inline-code lang-html">--dl-title-FS</code>, <code class="nds-inline-code lang-html">--row-gap</code>, <code class="nds-inline-code lang-html">--col-gap</code></li>
                </ul>
            </div>

        </div>
    </div>
</section>
