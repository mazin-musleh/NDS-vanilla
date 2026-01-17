---
layout: page
title: Drawer
hero_title: Drawer Components - National Design System
hero_description: Vertical navigation drawer components with nested menus and overflow handling
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Basic Drawer -->
<section id="drawerDemo" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Drawer Component</h2>
            <p class="nds-section-description">Interactive navigation drawer with nested menus and expandable sections</p>
        </div>
        <div class="nds-section-content">
            <div class="drawer-showcase">

                <!-- Basic Drawer with Nested Menu -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Basic Drawer with Nested Menu</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-sm", ".nds-drawer", "drawerSize"]'>
                                <span class="label">SM</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["nds-md", ".nds-drawer", "drawerSize"]'>
                                <span class="label">MD</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-lg", ".nds-drawer", "drawerSize"]'>
                                <span class="label">LG</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["nds-divided", ".nds-drawer", "drawerVariant"]'>
                                <span class="label">Divided</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-drawer nds-md">
                                <ul class="nds-drawer-list">
                                    <li class="active">
                                        <a href="#" class="nds-btn nds-subtle nds-indicator">
                                            <span class="nds-featured-icon nds-brand nds-sm">
                                                <i class="hgi hgi-stroke hgi-home-01 icon"></i>
                                            </span>
                                            <span class="label">Dashboard</span>
                                        </a>
                                    </li>
                                    <li>
                                        <button class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
                                            <span class="nds-featured-icon nds-brand nds-sm">
                                                <i class="hgi hgi-stroke hgi-layout-grid-02 icon"></i>
                                            </span>
                                            <span class="label">Components</span>
                                        </button>
                                        <ul>
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                    <span class="label">Buttons</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                    <span class="label">Cards</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                    <span class="label">Forms</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
                                            <span class="nds-featured-icon nds-brand nds-sm">
                                                <i class="hgi hgi-stroke hgi-settings-01 icon"></i>
                                            </span>
                                            <span class="label">Settings</span>
                                        </button>
                                        <ul>
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                    <span class="label">Profile</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                    <span class="label">Security</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#" class="nds-btn nds-subtle nds-indicator">
                                            <span class="nds-featured-icon nds-brand nds-sm">
                                                <i class="hgi hgi-stroke hgi-help-circle icon"></i>
                                            </span>
                                            <span class="label">Help</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-basic-1" id="tab-basic-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-basic-1" aria-labelledby="tab-basic-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
<!-- Basic drawer with nested menu -->
<nav class="nds-drawer">
    <ul class="nds-drawer-list">
        <li class="active">
            <a href="#" class="nds-btn nds-subtle nds-indicator">
                <span class="nds-featured-icon nds-brand nds-sm">
                    <i class="hgi hgi-stroke hgi-home-01 icon"></i>
                </span>
                <span class="label">Dashboard</span>
            </a>
        </li>
        <li>
            <button class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
                <span class="nds-featured-icon nds-brand nds-sm">
                    <i class="hgi hgi-stroke hgi-layout-grid-02 icon"></i>
                </span>
                <span class="label">Components</span>
            </button>
            <ul>
                <li>
                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                        <span class="label">Buttons</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                        <span class="label">Cards</span>
                    </a>
                </li>
            </ul>
        </li>
        <li>
            <a href="#" class="nds-btn nds-subtle nds-indicator">
                <span class="nds-featured-icon nds-brand nds-sm">
                    <i class="hgi hgi-stroke hgi-help-circle icon"></i>
                </span>
                <span class="label">Help</span>
            </a>
        </li>
    </ul>
</nav>

<!-- Divided variant with borders -->
<nav class="nds-drawer nds-divided">
    <ul class="nds-drawer-list">
        <!-- Same structure -->
    </ul>
</nav>
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Constrained with hasMore -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Constrained Drawer with Show More</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-drawer nds-divided" style="--drawer-max-height: 200px;">
                                <div class="nds-drawer-scroll">
                                    <ul class="nds-drawer-list">
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-brand nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                </span>
                                                <span class="label">Item 1</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-brand nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                </span>
                                                <span class="label">Item 2</span>
                                            </a>
                                        </li>
                                        <li class="active">
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-brand nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                </span>
                                                <span class="label">Item 3 (Active)</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-brand nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                </span>
                                                <span class="label">Item 4</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-brand nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                </span>
                                                <span class="label">Item 5</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-brand nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                </span>
                                                <span class="label">Item 6</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-brand nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                </span>
                                                <span class="label">Item 7</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-brand nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                </span>
                                                <span class="label">Item 8</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <button class="nds-drawer-more nds-btn nds-subtle">
                                    <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
                                    <span class="label">Show more</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-constrained-1" id="tab-constrained-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-constrained-1" aria-labelledby="tab-constrained-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
<!-- Constrained drawer with show more button -->
<nav class="nds-drawer nds-divided" style="--drawer-max-height: 200px;">
    <div class="nds-drawer-scroll">
        <ul class="nds-drawer-list">
            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item 1</span></a></li>
            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item 2</span></a></li>
            <li class="active"><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item 3 (Active)</span></a></li>
            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item 4</span></a></li>
            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item 5</span></a></li>
            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item 6</span></a></li>
            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item 7</span></a></li>
            <li><a href="#" class="nds-btn nds-subtle nds-indicator"><span class="label">Item 8</span></a></li>
        </ul>
    </div>
    <button class="nds-drawer-more nds-btn nds-subtle">
        <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
        <span class="label">Show more</span>
    </button>
</nav>
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Truncated Labels -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Drawer with Truncated Labels</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-drawer nds-divided" style="--drawer-truncate: 2;">
                                <ul class="nds-drawer-list">
                                    <li>
                                        <button class="nds-btn nds-subtle nds-indicator">
                                            <span class="nds-featured-icon nds-brand nds-sm">
                                                <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                            </span>
                                            <span class="label nds-truncate">New digital services platform launched for citizen identity verification and authentication</span>
                                            <span class="nds-tag nds-info nds-xs">
                                                <span class="label">17/12/2025</span>
                                            </span>
                                            <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="nds-btn nds-subtle nds-indicator">
                                            <span class="nds-featured-icon nds-brand nds-sm">
                                                <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                            </span>
                                            <span class="label nds-truncate">Ministry announces enhanced online portal for business licensing and permits nationwide</span>
                                            <span class="nds-tag nds-info nds-xs">
                                                <span class="label">18/12/2025</span>
                                            </span>
                                            <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                        </button>
                                    </li>
                                    <li>
                                        <button class="nds-btn nds-subtle nds-indicator">
                                            <span class="nds-featured-icon nds-brand nds-sm">
                                                <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                            </span>
                                            <span class="label nds-truncate">Workshop on digital transformation in government services and e-participation</span>
                                            <span class="nds-tag nds-info nds-xs">
                                                <span class="label">16/12/2025</span>
                                            </span>
                                            <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-truncated-1" id="tab-truncated-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-truncated-1" aria-labelledby="tab-truncated-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
<!-- Drawer with truncated labels (2 lines max) -->
<nav class="nds-drawer nds-divided" style="--drawer-truncate: 2;">
    <ul class="nds-drawer-list">
        <li>
            <button class="nds-btn nds-subtle nds-indicator">
                <span class="nds-featured-icon nds-brand nds-sm">
                    <i class="hgi hgi-stroke hgi-promotion icon"></i>
                </span>
                <span class="label nds-truncate">New digital services platform launched</span>
                <span class="nds-tag nds-info nds-xs">
                    <span class="label">17/12/2025</span>
                </span>
                <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
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

                <!-- Fit Mode with 2 Columns -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Fit Mode - 2 Column Grid Layout</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["noBg", ".demo-container", "containerBg"]'>
                                <span class="label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-grid" style="--gap: var(--spacing-4xl);">
                                <div class="ads-col col-sm-12 col-lg-6">
                                    <h4>Latest Updates</h4>
                                    <nav class="nds-drawer nds-divided nds-fit nds-card nds-stroke"
                                        style="--drawer-max-height:100%; --drawer-truncate:2;">
                                        <div class="nds-drawer-scroll">
                                            <ul class="nds-drawer-list">
                                                <li>
                                                    <button class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-featured-icon nds-brand nds-sm">
                                                            <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                        </span>
                                                        <span class="label nds-truncate">New digital identity verification system now available for all government services nationwide</span>
                                                        <span class="nds-tag nds-gray nds-xs">
                                                            <span class="label">23/12/2025</span>
                                                        </span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-featured-icon nds-brand nds-sm">
                                                            <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                        </span>
                                                        <span class="label nds-truncate">Ministry announces enhanced online portal for business licensing and commercial permits</span>
                                                        <span class="nds-tag nds-gray nds-xs">
                                                            <span class="label">18/12/2025</span>
                                                        </span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-featured-icon nds-brand nds-sm">
                                                            <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                        </span>
                                                        <span class="label nds-truncate">Open data initiative: government datasets now publicly accessible through national portal</span>
                                                        <span class="nds-tag nds-gray nds-xs">
                                                            <span class="label">18/12/2025</span>
                                                        </span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-featured-icon nds-brand nds-sm">
                                                            <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                        </span>
                                                        <span class="label nds-truncate">National cybersecurity awareness campaign launches with interactive workshops and training</span>
                                                        <span class="nds-tag nds-gray nds-xs">
                                                            <span class="label">17/12/2025</span>
                                                        </span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-featured-icon nds-brand nds-sm">
                                                            <i class="hgi hgi-stroke hgi-promotion icon"></i>
                                                        </span>
                                                        <span class="label nds-truncate">Workshop on digital transformation in government services and citizen e-participation</span>
                                                        <span class="nds-tag nds-gray nds-xs">
                                                            <span class="label">16/12/2025</span>
                                                        </span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <button class="nds-drawer-more nds-btn nds-subtle">
                                            <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
                                        </button>
                                    </nav>
                                </div>
                                <div class="importantlinks-col col-sm-12 col-lg-6">
                                    <h4>Quick Links</h4>
                                    <nav class="nds-drawer nds-divided nds-fit nds-card nds-stroke"
                                        style="--drawer-max-height:100%; --drawer-truncate:2;">
                                        <div class="nds-drawer-scroll">
                                            <ul class="nds-drawer-list">
                                                <li>
                                                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                                                        <span class="nds-featured-icon nds-brand nds-sm">
                                                            <i class="hgi hgi-stroke hgi-link-02 icon"></i>
                                                        </span>
                                                        <span class="label nds-truncate">Services Portal</span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                                                        <span class="nds-featured-icon nds-brand nds-sm">
                                                            <i class="hgi hgi-stroke hgi-link-02 icon"></i>
                                                        </span>
                                                        <span class="label nds-truncate">Laws and Regulations</span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                                                        <span class="nds-featured-icon nds-brand nds-sm">
                                                            <i class="hgi hgi-stroke hgi-link-02 icon"></i>
                                                        </span>
                                                        <span class="label nds-truncate">Careers</span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                                                        <span class="nds-featured-icon nds-brand nds-sm">
                                                            <i class="hgi hgi-stroke hgi-link-02 icon"></i>
                                                        </span>
                                                        <span class="label nds-truncate">Contact Directory</span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                                                        <span class="nds-featured-icon nds-brand nds-sm">
                                                            <i class="hgi hgi-stroke hgi-link-02 icon"></i>
                                                        </span>
                                                        <span class="label nds-truncate">Open Data</span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                                                        <span class="nds-featured-icon nds-brand nds-sm">
                                                            <i class="hgi hgi-stroke hgi-link-02 icon"></i>
                                                        </span>
                                                        <span class="label nds-truncate">Media Center</span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <button class="nds-drawer-more nds-btn nds-subtle">
                                            <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-tabs nds-code nds-divided">
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-fit-1" id="tab-fit-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                id="panel-fit-1" aria-labelledby="tab-fit-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <div class="nds-expandable-content">
                                    <code class="lang-html code">
<!-- Fit mode with 2-column grid layout -->
<div class="nds-grid" style="--gap: var(--spacing-4xl);">
    <div class="col-sm-12 col-lg-6">
        <h4>Latest Updates</h4>
        <nav class="nds-drawer nds-divided nds-fit nds-card nds-stroke"
            style="--drawer-max-height:100%; --drawer-truncate:2;">
            <div class="nds-drawer-scroll">
                <ul class="nds-drawer-list">
                    <li>
                        <button class="nds-btn nds-subtle nds-indicator">
                            <span class="nds-featured-icon nds-brand nds-sm">
                                <i class="hgi hgi-stroke hgi-promotion icon"></i>
                            </span>
                            <span class="label nds-truncate">Update title</span>
                            <span class="nds-tag nds-gray nds-xs">
                                <span class="label">23/12/2025</span>
                            </span>
                            <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <button class="nds-drawer-more nds-btn nds-subtle">
                <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
            </button>
        </nav>
    </div>
    <div class="col-sm-12 col-lg-6">
        <h4>Quick Links</h4>
        <nav class="nds-drawer nds-divided nds-fit nds-card nds-stroke"
            style="--drawer-max-height:100%; --drawer-truncate:2;">
            <div class="nds-drawer-scroll">
                <ul class="nds-drawer-list">
                    <li>
                        <a class="nds-btn nds-subtle nds-indicator" href="#">
                            <span class="nds-featured-icon nds-brand nds-sm">
                                <i class="hgi hgi-stroke hgi-link-02 icon"></i>
                            </span>
                            <span class="label nds-truncate">Link title</span>
                            <i class="hgi hgi-stroke hgi-arrow-left-01 icon"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <button class="nds-drawer-more nds-btn nds-subtle">
                <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
            </button>
        </nav>
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

<!-- Usage -->
<section id="drawerUsage" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage</h2>
            <p class="nds-section-description">How to implement drawer components</p>
        </div>
        <div class="nds-section-content">

            <h3>Component Structure</h3>

            <p>The drawer component uses a simple semantic structure starting with the <strong>.nds-drawer</strong> container wrapped in a <strong>&lt;nav&gt;</strong> element. Inside, <strong>.nds-drawer-list</strong> holds the navigation items in a standard unordered list format. Each list item contains either an anchor link or a button with the <strong>.nds-btn.nds-subtle</strong> classes. For items with nested submenus, add a nested <strong>&lt;ul&gt;</strong> element directly inside the parent <strong>&lt;li&gt;</strong>. The component automatically detects nested lists using CSS <strong>:has()</strong> selector without requiring additional classes.</p>

            <h3>Size Variants</h3>

            <p>The drawer component supports three size variants to match different interface needs. The default size provides comfortable touch targets suitable for most applications. Add <strong>.nds-sm</strong> for compact layouts with 32px buttons and smaller spacing, ideal for dense information displays or desktop-only interfaces. For larger interfaces or improved accessibility, use <strong>.nds-lg</strong> which provides 48px buttons with increased spacing and font sizes.</p>

            <h3>Divided Variant</h3>

            <p>Add the <strong>.nds-divided</strong> class to the drawer container to enable border separators between navigation items. This variant adds a subtle horizontal line after each top-level menu item, creating clear visual separation in long navigation lists. The divided style works with all other drawer features including nested menus and size variants. The last item automatically removes its border to prevent double borders with the container edge.</p>

            <h3>Active State Management</h3>

            <p>Mark the currently active navigation item by adding the <strong>.active</strong> class to the list item. The component automatically styles active items with visual indicators and updates featured icon colors. For nested menu items, the drawer component intelligently expands parent menus to reveal active child items on page load. This ensures users always see their current location in the navigation hierarchy without manual expansion.</p>

            <h3>Nested Menus and Accordion Behavior</h3>

            <p>Create nested menus by placing a <strong>&lt;ul&gt;</strong> element inside any list item. The nested list should contain the same button structure as the parent level. When users click items with nested menus, the submenu smoothly expands using CSS grid animations. The component implements accordion behavior by default, automatically closing sibling menus when a new menu opens. This prevents multiple expanded sections from cluttering the interface. Add <strong>aria-expanded</strong> attributes to parent buttons for accessibility, which the component automatically manages during interactions.</p>

            <h3>Constrained Mode with Show More</h3>

            <p>For drawers with many items or limited vertical space, wrap the <strong>.nds-drawer-list</strong> in a <strong>.nds-drawer-scroll</strong> container and add a <strong>.nds-drawer-more</strong> button at the bottom. Set the maximum height using the <strong>--drawer-max-height</strong> CSS custom property. The component automatically detects overflow and displays the "Show more" button when content exceeds the height limit. When scrolled to the bottom, the button icon rotates and clicking it scrolls back to the top, allowing users to easily navigate long lists.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-html nds-expandable-content line-numbers">
<!-- Constrained drawer with show more -->
<nav class="nds-drawer" style="--drawer-max-height: 300px;">
    <div class="nds-drawer-scroll">
        <ul class="nds-drawer-list">
            <!-- menu items -->
        </ul>
    </div>
    <button class="nds-drawer-more nds-btn nds-subtle">
        <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
        <span class="label">Show more</span>
    </button>
</nav>
                </code>
            </div>

            <h3>Fit Mode for Grid Layouts</h3>

            <p>The <strong>.nds-fit</strong> class makes the drawer expand to fill its parent container's height, perfect for equal-height columns in grid layouts. This mode sets <strong>--drawer-btn-height: 100%</strong> to ensure buttons and list items stretch to fill available space. Combine with <strong>.nds-card</strong> and <strong>.nds-stroke</strong> for styled card containers. Use within grid systems like <strong>.nds-grid</strong> with responsive column classes (<strong>.col-sm-12.col-lg-6</strong>) to create side-by-side drawer layouts. This pattern works excellently for dashboard layouts with updates, links, or navigation sections that need to maintain equal heights.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-html nds-expandable-content line-numbers">
<!-- Fit mode in grid layout -->
<div class="nds-grid" style="--gap: var(--spacing-4xl);">
    <div class="col-sm-12 col-lg-6">
        <nav class="nds-drawer nds-divided nds-fit nds-card nds-stroke">
            <div class="nds-drawer-scroll">
                <ul class="nds-drawer-list">
                    <!-- items -->
                </ul>
            </div>
        </nav>
    </div>
    <div class="col-sm-12 col-lg-6">
        <nav class="nds-drawer nds-divided nds-fit nds-card nds-stroke">
            <!-- second drawer -->
        </nav>
    </div>
</div>
                </code>
            </div>

            <h3>Label Truncation</h3>

            <p>Control multi-line label truncation using the <strong>--drawer-truncate</strong> CSS custom property. Set it to any number to limit labels to that many lines before adding an ellipsis. Add the <strong>.nds-truncate</strong> class to individual label spans to enable the truncation behavior. This feature is useful for updates, long navigation titles, or content lists where labels might vary in length. The default value is 1 line, but you can set it to 2, 3, or any positive number based on your layout requirements.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-css nds-expandable-content line-numbers">
/* Truncate labels to 2 lines */
.nds-drawer {
    --drawer-truncate: 2;
}
                </code>
            </div>

            <h3>JavaScript API</h3>

            <p>The drawer component provides a global <strong>NDSDrawer</strong> object with methods for programmatic control. Use <strong>NDSDrawer.init()</strong> or <strong>NDSDrawer.reinit()</strong> to initialize all drawer components on the page. For individual control, pass a drawer element to <strong>NDSDrawer.initDrawer(element)</strong>. The <strong>toggle(button)</strong> method expands or collapses a submenu when passed the parent button element. Call <strong>checkOverflow(drawer)</strong> to manually recalculate overflow states and show/hide the "Show more" button.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript nds-expandable-content line-numbers">
// Initialize all drawers
NDSDrawer.init();

// Initialize specific drawer
const drawer = document.querySelector('.nds-drawer');
NDSDrawer.initDrawer(drawer);

// Toggle submenu
const button = drawer.querySelector('.nds-menu-btn');
NDSDrawer.toggle(button);

// Check overflow state
NDSDrawer.checkOverflow(drawer);

// Destroy drawer instance
NDSDrawer.destroy(drawer);
                </code>
            </div>

            <h3>Custom Events</h3>

            <p>The drawer component dispatches custom events during submenu interactions. Listen for <strong>nds:drawer:shown</strong> when a submenu finishes expanding, and <strong>nds:drawer:hidden</strong> when a submenu completes collapsing. Both events bubble up from the drawer element and include a detail object with references to the affected list item and drawer container. These events are useful for triggering analytics, updating external state, or coordinating with other UI components.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-javascript nds-expandable-content line-numbers">
document.addEventListener('nds:drawer:shown', (e) => {
    console.log('Menu opened:', e.detail.item);
    console.log('Drawer:', e.detail.drawer);
});

document.addEventListener('nds:drawer:hidden', (e) => {
    console.log('Menu closed:', e.detail.item);
});
                </code>
            </div>

            <h3>Customization with CSS Variables</h3>

            <p>The drawer component exposes several CSS custom properties for fine-tuned customization. Set <strong>--drawer-gap</strong> to adjust spacing between navigation items. Control submenu indentation with <strong>--drawer-indent</strong>. Customize the active indicator width using <strong>--drawer-indicator-width</strong>, and adjust colors with <strong>--drawer-indicator</strong>, <strong>--drawer-indicator-active</strong>, and <strong>--drawer-indicator-hover</strong>. Override typography with <strong>--drawer-font-size</strong> and <strong>--drawer-line-height</strong>. For constrained mode, set <strong>--drawer-max-height</strong> to control the maximum height before scrolling.</p>

            <div class="nds-code nds-expandable">
                <div class="nds-code-action">
                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                    </button>
                </div>
                <code class="lang-css nds-expandable-content line-numbers">
.nds-drawer {
    --drawer-gap: var(--spacing-sm);
    --drawer-indent: var(--spacing-2xl);
    --drawer-indicator-width: 4px;
    --drawer-indicator-active: var(--colors-primary-sa-flag-600-primary);
    --drawer-max-height: 400px;
    --drawer-truncate: 2;
}
                </code>
            </div>

            <h3>Automatic Initialization</h3>

            <p>The drawer component automatically initializes on DOMContentLoaded by finding all elements with the <strong>.nds-drawer</strong> class, excluding those inside code examples. Each drawer is marked with <strong>_ndsDrawerInitialized</strong> property to prevent double initialization. The component sets up event listeners for menu toggles, scroll handlers for overflow detection, and resize observers to maintain proper sizing. This automatic setup ensures drawers work immediately without manual JavaScript initialization in most cases.</p>

            <h3>Performance Optimizations</h3>

            <p>The implementation includes several performance optimizations. Menu animations use CSS grid transitions for smooth, hardware-accelerated expansion. Scroll and resize handlers are throttled using <strong>requestAnimationFrame</strong> to prevent excessive calculations. The overflow detection system uses <strong>ResizeObserver</strong> to efficiently track content changes without polling. Event delegation reduces memory usage by using a single event listener per drawer instead of individual listeners for each button. These optimizations ensure smooth performance even with multiple drawers and long navigation lists.</p>

            <h3>Accessibility Features</h3>

            <p>The drawer component follows WCAG accessibility guidelines with proper semantic HTML and ARIA attributes. Navigation items use native <strong>&lt;a&gt;</strong> and <strong>&lt;button&gt;</strong> elements for keyboard accessibility. Parent buttons automatically receive <strong>aria-expanded</strong> attributes that update during interactions. The active state provides both visual and programmatic indication of the current location. Keyboard users can navigate through items using standard Tab key navigation and activate items with Enter or Space. The component maintains focus management during submenu expansions to provide a smooth screen reader experience.</p>

        </div>
    </div>
</section>
