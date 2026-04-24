---
layout: page
title: Definition List
hero_title: Definition List - National Design System
hero_description: Semantic term-definition component for displaying structured information with optional icons and multiple layout modes
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- With Icons -->
<section id="definitionListIcons" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Semantic Definition List</h2>
            <p class="nds-section-description">Uses dl/dt/dd elements for accessible term-definition pairs with optional icons</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Layout: ">
                                    <span class="nds-label">Layout: Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-definition-list", "dlLayout"]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-tableView", ".nds-definition-list", "dlLayout"]'>
                                            <span class="nds-label">Table View</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-tableView-sm", ".nds-definition-list", "dlLayout"]'>
                                            <span class="nds-label">Table View (Mobile)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-tableView-md", ".nds-definition-list", "dlLayout"]'>
                                            <span class="nds-label">Table View (Tablet+)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-tableView-lg", ".nds-definition-list", "dlLayout"]'>
                                            <span class="nds-label">Table View (Desktop+)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-rowView", ".nds-definition-list", "dlLayout"]'>
                                            <span class="nds-label">Row View</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-grid", ".nds-definition-list", "dlLayout"]'
                                            data-toggle-style=".nds-definition-list { --max-col:2; --mid-col:2; --min-col:1; width:fit-content }">
                                            <span class="nds-label">Grid View</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Style: ">
                                    <span class="nds-label">Style: Default</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='[["", ".nds-definition-list", "dlStyle"], ["", ".nds-definition-item", "dlStyle"]]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["nds-divided", ".nds-definition-list", "dlStyle"], ["", ".nds-definition-item", "dlStyle"]]'>
                                            <span class="nds-label">Divided</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["", ".nds-definition-list", "dlStyle"], ["nds-card nds-stroke", ".nds-definition-item", "dlStyle"]]'>
                                            <span class="nds-label">Card</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Size: ">
                                    <span class="nds-label">Size: Large</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-definition-list", "dlSize"]'>
                                            <span class="nds-label">Large</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-md", ".nds-definition-list", "dlSize"]'>
                                            <span class="nds-label">Medium</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-definition-list", "dlSize"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <dl class="nds-definition-list">
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-user-account"></i>
                                        <span class="nds-label">Full Name</span>
                                    </dt>
                                    <dd>Mohammed Al-Harbi</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-building-02"></i>
                                        <span class="nds-label">Organization</span>
                                    </dt>
                                    <dd>Digital Services Department</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="hgi hgi-stroke hgi-briefcase-02"></i>
                                        <span class="nds-label">Position</span>
                                    </dt>
                                    <dd>Senior Developer</dd>
                                </div>
                                <div class="nds-definition-item">
                                    <dt>
                                        <i class="nds-icon nds-hgi-location-01" aria-hidden="true"></i>
                                        <span class="nds-label">Location</span>
                                    </dt>
                                    <dd>Riyadh</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;dl class="nds-definition-list"&gt;
  &lt;div class="nds-definition-item"&gt;
    &lt;dt&gt;
      &lt;i class="hgi hgi-stroke hgi-user-account"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Full Name&lt;/span&gt;
    &lt;/dt&gt;
    &lt;dd&gt;Mohammed Al-Harbi&lt;/dd&gt;
  &lt;/div&gt;
  &lt;div class="nds-definition-item"&gt;
    &lt;dt&gt;
      &lt;i class="hgi hgi-stroke hgi-building-02"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Organization&lt;/span&gt;
    &lt;/dt&gt;
    &lt;dd&gt;Digital Services Department&lt;/dd&gt;
  &lt;/div&gt;
  &lt;div class="nds-definition-item"&gt;
    &lt;dt&gt;
      &lt;i class="hgi hgi-stroke hgi-briefcase-02"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Position&lt;/span&gt;
    &lt;/dt&gt;
    &lt;dd&gt;Senior Developer&lt;/dd&gt;
  &lt;/div&gt;
  &lt;div class="nds-definition-item"&gt;
    &lt;dt&gt;
      &lt;i class="nds-icon nds-hgi-location-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Location&lt;/span&gt;
    &lt;/dt&gt;
    &lt;dd&gt;Riyadh&lt;/dd&gt;
  &lt;/div&gt;
&lt;/dl&gt;
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
<section id="definitionListGeneric" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Feature List</h2>
            <p class="nds-section-description">Uses class-based markup for icon grids, feature highlights, and content that doesn't need term-definition semantics</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Style: ">
                                    <span class="nds-label">Style: Divided</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["", ".nds-definition-list", "dlStyle"], ["", ".nds-definition-item", "dlStyle"]]'>
                                            <span class="nds-label">Default</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='[["nds-divided", ".nds-definition-list", "dlStyle"], ["", ".nds-definition-item", "dlStyle"]]'>
                                            <span class="nds-label">Divided</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='[["", ".nds-definition-list", "dlStyle"], ["nds-card nds-stroke", ".nds-definition-item", "dlStyle"]]'>
                                            <span class="nds-label">Card</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                                <div class="nds-definition-item">
                                    <span class="nds-item-title">
                                        <i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"></i>
                                        <span class="nds-label">Accessibility</span>
                                    </span>
                                    <p class="nds-item-desc">WCAG 2.1 compliant with full keyboard navigation and screen reader support.</p>
                                </div>
                                <div class="nds-definition-item">
                                    <span class="nds-item-title">
                                        <i class="hgi hgi-stroke hgi-shield-01"></i>
                                        <span class="nds-label">Security</span>
                                    </span>
                                    <p class="nds-item-desc">Built-in XSS protection and content security policy headers.</p>
                                </div>
                                <div class="nds-definition-item">
                                    <span class="nds-item-title">
                                        <i class="nds-icon nds-hgi-clock-01" aria-hidden="true"></i>
                                        <span class="nds-label">Performance</span>
                                    </span>
                                    <p class="nds-item-desc">Lazy loading and staggered initialization for fast page loads.</p>
                                </div>
                                <div class="nds-definition-item">
                                    <span class="nds-item-title">
                                        <i class="hgi hgi-stroke hgi-star"></i>
                                        <span class="nds-label">Theming</span>
                                    </span>
                                    <p class="nds-item-desc">CSS custom properties for full visual customization without overrides.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap:24px; --col-gap:32px;"&gt;
  &lt;div class="nds-definition-item"&gt;
    &lt;span class="nds-item-title"&gt;
      &lt;i class="nds-icon nds-hgi-checkmark-circle-02" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Accessibility&lt;/span&gt;
    &lt;/span&gt;
    &lt;p class="nds-item-desc"&gt;WCAG 2.1 compliant with full keyboard navigation and screen reader support.&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="nds-definition-item"&gt;
    &lt;span class="nds-item-title"&gt;
      &lt;i class="hgi hgi-stroke hgi-shield-01"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Security&lt;/span&gt;
    &lt;/span&gt;
    &lt;p class="nds-item-desc"&gt;Built-in XSS protection and content security policy headers.&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="nds-definition-item"&gt;
    &lt;span class="nds-item-title"&gt;
      &lt;i class="nds-icon nds-hgi-clock-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Performance&lt;/span&gt;
    &lt;/span&gt;
    &lt;p class="nds-item-desc"&gt;Lazy loading and staggered initialization for fast page loads.&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="nds-definition-item"&gt;
    &lt;span class="nds-item-title"&gt;
      &lt;i class="hgi hgi-stroke hgi-star"&gt;&lt;/i&gt;
      &lt;span class="nds-label"&gt;Theming&lt;/span&gt;
    &lt;/span&gt;
    &lt;p class="nds-item-desc"&gt;CSS custom properties for full visual customization without overrides.&lt;/p&gt;
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

<!-- Built-in Features -->
<section id="definitionListFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-table-01"></i>
                        <span class="nds-label">Table View Layout</span>
                    </span>
                    <p class="nds-item-desc">Two-column grid with CSS subgrid for perfect alignment across all term-definition pairs.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-smartphone-wifi"></i>
                        <span class="nds-label">Responsive Table View</span>
                    </span>
                    <p class="nds-item-desc">Breakpoint variants let you choose when the table view activates: mobile only, tablet and up, or desktop and up.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-border-all-01"></i>
                        <span class="nds-label">Divided Borders</span>
                    </span>
                    <p class="nds-item-desc">Optional border separators between items. Works in both default and table view layouts, including responsive variants.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-grid-view"></i>
                        <span class="nds-label">Grid Layout</span>
                    </span>
                    <p class="nds-item-desc">Multi-column responsive grid with configurable breakpoints via --max-col, --mid-col, and --min-col properties.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-board"></i>
                        <span class="nds-label">CSS Custom Properties</span>
                    </span>
                    <p class="nds-item-desc">Control icon size, gap, title font size, and row spacing through custom properties without overriding styles.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-indent"></i>
                        <span class="nds-label">Automatic Icon Indent</span>
                    </span>
                    <p class="nds-item-desc">Descriptions auto-indent to align with the label text when icons are present in stacked layout.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="definitionListGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <strong>semantic markup</strong> (<code class="nds-inline-code lang-html">&lt;dl&gt;/&lt;dt&gt;/&lt;dd&gt;</code>) for data display like user profiles, service details, or specifications where screen reader semantics matter</li>
                    <li>Use <strong>generic markup</strong> (<code class="nds-inline-code lang-html">.nds-item-title</code> / <code class="nds-inline-code lang-html">.nds-item-desc</code>) for feature lists, highlights, or content grids where semantic term-definition relationships don't apply</li>
                    <li>Use <strong>default layout</strong> for vertical stacking when descriptions vary in length or include multiple lines</li>
                    <li>Use <strong>table view</strong> (<code class="nds-inline-code lang-html">nds-tableView</code>) for compact side-by-side key-value display. Subgrid keeps all columns aligned</li>
                    <li>Use <strong>responsive table view</strong> variants to control when the two-column layout activates: <code class="nds-inline-code lang-html">nds-tableView-md</code> for tablet and up (stacked on mobile), <code class="nds-inline-code lang-html">nds-tableView-lg</code> for desktop and up, or <code class="nds-inline-code lang-html">nds-tableView-sm</code> for mobile only</li>
                    <li>Use <strong>row view</strong> (<code class="nds-inline-code lang-html">nds-rowView</code>) for compact inline label/value pairs where each item flows on its own wrappable row. No shared columns across items, so short pairs stay tight and long values wrap naturally beside the label. Good for card meta</li>
                    <li>Use <strong>size modifiers</strong> (<code class="nds-inline-code lang-html">nds-md</code>, <code class="nds-inline-code lang-html">nds-sm</code>) to scale icon size, title font size, and row gap in step. Default (no class) is large. Individual CSS custom properties (<code class="nds-inline-code lang-html">--dl-icon-size</code>, <code class="nds-inline-code lang-html">--dl-title-FS</code>, <code class="nds-inline-code lang-html">--row-gap</code>) still override size defaults when you need finer control</li>
                    <li>Use <strong>grid layout</strong> (<code class="nds-inline-code lang-html">nds-grid</code>) for multi-column responsive grids. Configure breakpoints with <code class="nds-inline-code lang-html">--max-col</code>, <code class="nds-inline-code lang-html">--mid-col</code>, <code class="nds-inline-code lang-html">--min-col</code></li>
                    <li>Do not use definition list for navigation or action items. Use a <a class="nds-color" href="{{ 'components/dropmenu' | relative_url }}">Dropmenu</a> or standard list instead</li>
                    <li>Combine <strong>styles</strong> independently with any layout: <code class="nds-inline-code lang-html">nds-divided</code> for border separators, <code class="nds-inline-code lang-html">nds-card nds-stroke</code> on items for card appearance</li>
                    <li>The <code class="nds-inline-code lang-html">nds-divided</code> style adapts automatically to responsive table view variants, showing stacked dividers outside the active breakpoint and table view dividers inside it</li>
                    <li>Add icons to titles for visual identification. The component auto-indents descriptions to align with the label text in stacked layout</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-tableView</code></td><td>Two-column key-value grid layout at all screen sizes</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-tableView-sm</code></td><td>Table view on mobile only (max-width: 600px), stacked on larger screens</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-tableView-md</code></td><td>Table view from tablet and up (min-width: 601px), stacked on mobile</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-tableView-lg</code></td><td>Table view from desktop and up (min-width: 961px), stacked below</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-rowView</code></td><td>Each item places dt and dd on a single wrappable row. Looser than table view — no shared columns across items</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-divided</code></td><td>Adds border separators between items. Adapts styling for table view and stacked layouts</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-md</code></td><td>Medium size: 16px icon, medium title font, medium row gap</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-sm</code></td><td>Small size: 14px icon, small title font, small row gap</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--dl-icon-size</code></td><td>18px (lg) / 16px (md) / 14px (sm)</td><td>Width and height of title icons. Floored at 18px — icons never render smaller, even when this value or a size modifier requests less</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--dl-icon-gap</code></td><td>half of icon size</td><td>Gap between the icon and label text</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--dl-title-FS</code></td><td>--typo-text-clamp-lg-FS (lg) / -md-FS (md) / -sm-FS (sm)</td><td>Font size of term/title text</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--dl-desc-FS</code></td><td>--dl-title-FS</td><td>Font size of description/value text. Defaults to match the title so both sides of each row scale together</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--row-gap</code></td><td>--spacing-lg</td><td>Vertical spacing between items</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--col-gap</code></td><td>--spacing-xl (table view) / --spacing-sm (row view)</td><td>Horizontal spacing between dt and dd in table view and row view</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
