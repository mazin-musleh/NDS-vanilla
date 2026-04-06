---
layout: page
title: Breadcrumb
hero_title: Breadcrumb - National Design System
hero_description: Navigation component showing the current page's location within the site hierarchy
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Standard -->
<section id="breadcrumbStandard" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Standard</h2>
            <p class="nds-section-description">Three-level breadcrumb with linked parent pages and current page indicator</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
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
                                        aria-controls="panel-breadcrumb-standard-1" id="tab-breadcrumb-standard-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-breadcrumb-standard-1"
                                    aria-labelledby="tab-breadcrumb-standard-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<nav class="nds-breadcrumb-nav" aria-label="Breadcrumb" hidden>
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
            </div>
        </div>
    </div>
</section>

<!-- Two Level -->
<section id="breadcrumbTwoLevel" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Two Level</h2>
            <p class="nds-section-description">Minimal breadcrumb for pages one level deep</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
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
                                        aria-controls="panel-breadcrumb-twolevel-1" id="tab-breadcrumb-twolevel-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-breadcrumb-twolevel-1"
                                    aria-labelledby="tab-breadcrumb-twolevel-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<nav class="nds-breadcrumb-nav" aria-label="Breadcrumb" hidden>
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

<!-- Long Title -->
<section id="breadcrumbLongTitle" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Long Title</h2>
            <p class="nds-section-description">Truncate long page titles with nds-truncate to prevent wrapping</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb" hidden>
                                <ol class="nds-breadcrumb">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="#">Components</a></li>
                                    <li class="nds-truncate" aria-current="page">Very Long Page Title That May Wrap or Truncate</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-breadcrumb-long-1" id="tab-breadcrumb-long-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-breadcrumb-long-1"
                                    aria-labelledby="tab-breadcrumb-long-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<nav class="nds-breadcrumb-nav" aria-label="Breadcrumb" hidden>
  <ol class="nds-breadcrumb">
    <li><a href="/">Home</a></li>
    <li><a href="#">Components</a></li>
    <li class="nds-truncate" aria-current="page">Very Long Page Title</li>
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

<!-- Automatic Collapsing -->
<section id="breadcrumbCollapsed" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Automatic Collapsing</h2>
            <p class="nds-section-description">Breadcrumbs with 5+ levels collapse into a dropmenu showing Home, ellipsis, and the last two items</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb" hidden>
                                <ol class="nds-breadcrumb">
                                    <li><a href="/">Home</a></li>
                                    <li><a href="#">Services</a></li>
                                    <li><a href="#">Category</a></li>
                                    <li><a href="#">Subcategory</a></li>
                                    <li><a href="#">Section</a></li>
                                    <li><a href="#">Parent</a></li>
                                    <li aria-current="page">Current Page</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-breadcrumb-collapsed-1" id="tab-breadcrumb-collapsed-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                                <button class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more"><i
                                        class="hgi hgi-stroke hgi-arrow-left-01 nds-icon"></i>
                                </button>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-breadcrumb-collapsed-1"
                                    aria-labelledby="tab-breadcrumb-collapsed-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<!-- Write the full breadcrumb. JS collapses 5+ levels automatically -->
<nav class="nds-breadcrumb-nav" aria-label="Breadcrumb" hidden>
  <ol class="nds-breadcrumb">
    <li><a href="/">Home</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Category</a></li>
    <li><a href="#">Subcategory</a></li>
    <li><a href="#">Section</a></li>
    <li><a href="#">Parent</a></li>
    <li aria-current="page">Current Page</li>
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
    </div>
</section>

<!-- Built-in Features -->
<section id="breadcrumbFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket nds-icon"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Activates when .nds-breadcrumb-nav is on the page. No JavaScript setup required.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-menu-02 nds-icon"></i>
                        <span class="nds-label">Smart Collapsing</span>
                    </span>
                    <p class="nds-item-desc">Deep hierarchies collapse into a dropmenu. Shows Home, ellipsis, and last two items.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-keyboard nds-icon"></i>
                        <span class="nds-label">Keyboard Support</span>
                    </span>
                    <p class="nds-item-desc">Collapsed dropmenu is fully keyboard accessible via Enter, Space, and Escape.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-more-horizontal nds-icon"></i>
                        <span class="nds-label">Title Truncation</span>
                    </span>
                    <p class="nds-item-desc">Add nds-truncate to any item to prevent long titles from wrapping.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="breadcrumbGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">When to Use</h3>
                <ul>
                    <li>Use breadcrumbs on pages 2+ levels deep to show location within the site hierarchy</li>
                    <li>Always start with "Home" as the first item. The current page is the last item and should not be a link</li>
                    <li>Keep titles short and scannable. Use nds-truncate for pages with long names</li>
                    <li>Write the full hierarchy in HTML. The JS handles collapsing automatically for deep structures</li>
                    <li>Skip breadcrumbs on the homepage and single-level landing pages</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Breadcrumb</strong> API handles auto-collapsing. For dynamically added breadcrumbs, call <strong>NDS.Breadcrumb.reinit()</strong> to process new elements.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// Re-scan and initialize new breadcrumbs
NDS.Breadcrumb.init();

// Shorthand for init()
NDS.Breadcrumb.reinit();

// Create instance for a specific element
const instance = NDS.Breadcrumb.create(document.querySelector('.nds-breadcrumb-nav'));

// Access existing instance
const existing = document.querySelector('.nds-breadcrumb-nav').ndsBreadcrumb;

// Clean up
instance.destroy();
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
