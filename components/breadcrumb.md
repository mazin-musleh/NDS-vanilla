---
layout: page
layout_class: cardView
title: Breadcrumb
hero_title: Breadcrumb Component - National Design System
hero_description: Navigation component showing the current page's location within the site hierarchy
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Breadcrumb Basic Demo -->
<section id="breadcrumbBasic" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Basic Breadcrumb</h2>
            <p class="nds-section-description">Standard breadcrumb navigation with multiple levels</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Three Level Breadcrumb</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb" hidden>
                                <ol class="nds-breadcrumb">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="#">Components</a></li>
                                    <li aria-current="page">Breadcrumb</li>
                                </ol>
                            </nav>
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
                                <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
                                  <ol class="nds-breadcrumb">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="#">Components</a></li>
                                    <li aria-current="page">Breadcrumb</li>
                                  </ol>
                                </nav>
                            </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Two Level Breadcrumb</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb" hidden>
                                <ol class="nds-breadcrumb">
                                    <li><a href="/">Home</a></li>
                                    <li aria-current="page">Components</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-two-level-1" id="tab-two-level-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-two-level-1"
                                    aria-labelledby="tab-two-level-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
                                <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
                                  <ol class="nds-breadcrumb">
                                    <li><a href="/">Home</a></li>
                                    <li aria-current="page">Components</li>
                                  </ol>
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

<!-- Breadcrumb Variations -->
<section id="breadcrumbVariations" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Breadcrumb Variations</h2>
            <p class="nds-section-description">Different breadcrumb levels and states</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Long Title Breadcrumb</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb" hidden>
                                <ol class="nds-breadcrumb">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="#">Components</a></li>
                                    <li class="nds-truncate" aria-current="page">Very Long Page Title That May Wrap or
                                        Truncate</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-long-1" id="tab-long-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-long-1"
                                    aria-labelledby="tab-long-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
                                <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
                                  <ol class="nds-breadcrumb">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="#">Components</a></li>
                                    <li class="nds-truncate" aria-current="page">Very Long Page Title That May Wrap or Truncate</li>
                                  </ol>
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

<!-- Collapsed Breadcrumb Demo -->
<section id="collapsedBreadcrumb" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Automatic Collapsing</h2>
            <p class="nds-section-description">Breadcrumbs with 5+ levels automatically collapse with a dropdown menu
            </p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Auto-Collapsed Breadcrumb (7 Levels)</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb" hidden>
                                <ol class="nds-breadcrumb">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="#">Services</a></li>
                                    <li><a href="#">Digital Government</a></li>
                                    <li><a href="#">Components</a></li>
                                    <li><a href="#">Navigation</a></li>
                                    <li><a href="#">Breadcrumb</a></li>
                                    <li aria-current="page">Documentation</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-collapsed-1" id="tab-collapsed-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-collapsed-2" id="tab-collapsed-2">
                                        <span class="nds-tab-label">Behavior</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-collapsed-1"
                                    aria-labelledby="tab-collapsed-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
                                <!-- Original HTML (7 levels) -->
                                <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
                                  <ol class="nds-breadcrumb">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="#">Services</a></li>
                                    <li><a href="#">Digital Government</a></li>
                                    <li><a href="#">Components</a></li>
                                    <li><a href="#">Navigation</a></li>
                                    <li><a href="#">Breadcrumb</a></li>
                                    <li aria-current="page">Documentation</li>
                                  </ol>
                                </nav>
                            </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-collapsed-2"
                                    aria-labelledby="tab-collapsed-2">
                                    <code class="lang-text code">
Automatic Collapsing Behavior:

• Breadcrumbs with 5+ levels automatically collapse
• Shows: Home > ... > [last 2 items]
• Middle items (2-n-2) hidden in dropdown menu
• Click "..." button to reveal hidden levels
• Dropdown positioned with RTL/LTR support
• Keyboard accessible (Enter, Space, Escape)
• Closes when clicking outside

Example Output:
Home > ... > Breadcrumb > Documentation

Dropdown contains:
- Services
- Digital Government
- Components
- Navigation
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

<!-- Usage Guidelines -->
<section id="usageGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
            <p class="nds-section-description">Best practices for using breadcrumb navigation</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-content-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Multi-level website navigation</li>
                    <li>Showing hierarchical page location</li>
                    <li>Providing alternative navigation paths</li>
                    <li>Deep content structures (3+ levels)</li>
                </ul>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Accessibility</h3>
                <ul>
                    <li>Use &lt;nav&gt; with aria-label="Breadcrumb"</li>
                    <li>Mark current page with aria-current="page"</li>
                    <li>Use &lt;ol&gt; for semantic ordered list</li>
                    <li>Ensure links have sufficient color contrast</li>
                </ul>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Always start with "Home" as first item</li>
                    <li>Current page should not be a link</li>
                    <li>Use clear, concise page titles</li>
                    <li>Keep breadcrumb trails relatively short (max 5-6 levels)</li>
                </ul>
            </div>
            <div class="nds-content-block">
                <h3 class="nds-block-title">RTL/LTR Support</h3>
                <ul>
                    <li>Arrow separators automatically flip in LTR layouts</li>
                    <li>Text direction adjusts based on language</li>
                    <li>Uses HGI icon font for consistent arrows</li>
                    <li>Properly handles Arabic and English content</li>
                </ul>
            </div>
        </div>
    </div>
</section>