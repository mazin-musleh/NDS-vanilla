---
layout: page
title: Drawer
hero_title: Drawer - National Design System
hero_description: A vertical list container for sidebar navigation, submenus, quick links, and inline notifications, with compact or expanded layouts that adapt across breakpoints.
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Nested Menu -->
<section id="drawerNested" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Nested Menu</h2>
            <p class="nds-section-description">Accordion-style navigation with expandable submenus and active state indicators</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">

                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Size: ">
                                    <span class="nds-label">Size: Medium</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-drawer", "drawerSize"]'
                                            data-trigger-label="Medium">
                                            <span class="nds-label">Medium (default)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-drawer", "drawerSize"]'>
                                            <span class="nds-label">Small</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-drawer", "drawerSize"]'>
                                            <span class="nds-label">Large</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-divided", ".nds-drawer", "drawerDivided"]'>
                                <span class="nds-label">Divided</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <nav class="nds-drawer" hidden>
                                <div class="nds-scroll-more nds-divided">
                                    <ul class="nds-drawer-list nds-scroll-more-content">
                                        <li data-state="active">
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-home-01"></i>
                                                </span>
                                                <span class="nds-label">Dashboard</span>
                                            </a>
                                        </li>
                                        <li>
                                            <button class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-layout-grid"></i>
                                                </span>
                                                <span class="nds-label">Components</span>
                                            </button>
                                            <ul>
                                                <li>
                                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label">Buttons</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label">Cards</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label">Forms</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <button class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-settings-01"></i>
                                                </span>
                                                <span class="nds-label">Settings</span>
                                            </button>
                                            <ul>
                                                <li>
                                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label">Profile</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label">Security</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-help-circle"></i>
                                                </span>
                                                <span class="nds-label">Help</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-drawer-nested-1" id="tab-drawer-nested-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-drawer-nested-1" aria-labelledby="tab-drawer-nested-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<nav class="nds-drawer" hidden>
  <div class="nds-scroll-more nds-divided">
    <ul class="nds-drawer-list nds-scroll-more-content">
      <li data-state="active">
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-featured-icon nds-sm">
            <i class="hgi hgi-stroke hgi-home-01"></i>
          </span>
          <span class="nds-label">Dashboard</span>
        </a>
      </li>
      <li>
        <button class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
          <span class="nds-featured-icon nds-sm">
            <i class="hgi hgi-stroke hgi-layout-grid"></i>
          </span>
          <span class="nds-label">Components</span>
        </button>
        <ul>
          <li>
            <a href="#" class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label">Buttons</span>
            </a>
          </li>
          <li>
            <a href="#" class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label">Cards</span>
            </a>
          </li>
          <li>
            <a href="#" class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label">Forms</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <button class="nds-btn nds-subtle nds-menu-btn nds-indicator" aria-expanded="false">
          <span class="nds-featured-icon nds-sm">
            <i class="hgi hgi-stroke hgi-settings-01"></i>
          </span>
          <span class="nds-label">Settings</span>
        </button>
        <ul>
          <li>
            <a href="#" class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label">Profile</span>
            </a>
          </li>
          <li>
            <a href="#" class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label">Security</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-featured-icon nds-sm">
            <i class="hgi hgi-stroke hgi-help-circle"></i>
          </span>
          <span class="nds-label">Help</span>
        </a>
      </li>
    </ul>
  </div>
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

<!-- Responsive State -->
<section id="drawerResponsive" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive State</h2>
            <p class="nds-section-description">Permanently expanded on tablet and above, collapsible with toggle arrows on mobile</p>
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
                            <nav class="nds-drawer nds-divided" data-always-open-on="tablet" hidden>
                                <div class="nds-scroll-more nds-divided">
                                    <ul class="nds-drawer-list nds-scroll-more-content">
                                        <li>
                                            <button class="nds-btn nds-subtle nds-menu-btn nds-indicator">
                                                <span class="nds-label">Components</span>
                                            </button>
                                            <ul>
                                                <li>
                                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label">Buttons</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label">Forms</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <button class="nds-btn nds-subtle nds-menu-btn nds-indicator">
                                                <span class="nds-label">Guidelines</span>
                                            </button>
                                            <ul>
                                                <li>
                                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label">Typography</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label">Colors</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-drawer-responsive-1" id="tab-drawer-responsive-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-drawer-responsive-1" aria-labelledby="tab-drawer-responsive-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<nav class="nds-drawer nds-divided" data-always-open-on="tablet" hidden>
  <div class="nds-scroll-more nds-divided">
    <ul class="nds-drawer-list nds-scroll-more-content">
      <li>
        <button class="nds-btn nds-subtle nds-menu-btn nds-indicator">
          <span class="nds-label">Components</span>
        </button>
        <ul>
          <li>
            <a href="#" class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label">Buttons</span>
            </a>
          </li>
          <li>
            <a href="#" class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label">Forms</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <button class="nds-btn nds-subtle nds-menu-btn nds-indicator">
          <span class="nds-label">Guidelines</span>
        </button>
        <ul>
          <li>
            <a href="#" class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label">Typography</span>
            </a>
          </li>
          <li>
            <a href="#" class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label">Colors</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
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

<!-- Constrained Drawer -->
<section id="drawerConstrained" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Constrained Drawer</h2>
            <p class="nds-section-description">Height-limited drawer with scroll container and show-more button for overflow</p>
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
                            <nav class="nds-drawer nds-divided" style="--drawer-max-height: 200px;" hidden>
                                <div class="nds-scroll-more nds-divided">
                                    <ul class="nds-drawer-list nds-scroll-more-content">
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion"></i>
                                                </span>
                                                <span class="nds-label">Item 1</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion"></i>
                                                </span>
                                                <span class="nds-label">Item 2</span>
                                            </a>
                                        </li>
                                        <li data-state="active">
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion"></i>
                                                </span>
                                                <span class="nds-label">Item 3</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion"></i>
                                                </span>
                                                <span class="nds-label">Item 4</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion"></i>
                                                </span>
                                                <span class="nds-label">Item 5</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-promotion"></i>
                                                </span>
                                                <span class="nds-label">Item 6</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <button class="nds-show-more nds-btn nds-subtle">
                                        <span class="nds-label">Show more</span>
                                        <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-drawer-constrained-1" id="tab-drawer-constrained-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-drawer-constrained-1" aria-labelledby="tab-drawer-constrained-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<nav class="nds-drawer nds-divided" style="--drawer-max-height: 200px;" hidden>
  <div class="nds-scroll-more nds-divided">
    <ul class="nds-drawer-list nds-scroll-more-content">
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-featured-icon nds-sm">
            <i class="hgi hgi-stroke hgi-promotion"></i>
          </span>
          <span class="nds-label">Item 1</span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-featured-icon nds-sm">
            <i class="hgi hgi-stroke hgi-promotion"></i>
          </span>
          <span class="nds-label">Item 2</span>
        </a>
      </li>
      <li data-state="active">
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-featured-icon nds-sm">
            <i class="hgi hgi-stroke hgi-promotion"></i>
          </span>
          <span class="nds-label">Item 3</span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-featured-icon nds-sm">
            <i class="hgi hgi-stroke hgi-promotion"></i>
          </span>
          <span class="nds-label">Item 4</span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-featured-icon nds-sm">
            <i class="hgi hgi-stroke hgi-promotion"></i>
          </span>
          <span class="nds-label">Item 5</span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-featured-icon nds-sm">
            <i class="hgi hgi-stroke hgi-promotion"></i>
          </span>
          <span class="nds-label">Item 6</span>
        </a>
      </li>
    </ul>
    <button class="nds-show-more nds-btn nds-subtle">
      <span class="nds-label">Show more</span>
      <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
    </button>
  </div>
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

<!-- Fit Mode -->
<section id="drawerFit" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Fit Mode</h2>
            <p class="nds-section-description">Stretches to fill parent height for equal-height columns in grid layouts</p>
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
                            <div class="nds-grid" style="--max-col: 2;--mid-col: 1;--min-col: 1;--row-gap: var(--spacing-6xl);">
                                <div class="nds-flex nds-col" style="--align: start;--gap: 0;">
                                    <h4>Latest Updates</h4>
                                    <nav class="nds-drawer nds-divided nds-fit nds-card nds-stroke" hidden
                                        style="--drawer-max-height:100%; --drawer-truncate:2;">
                                        <div class="nds-scroll-more nds-divided">
                                            <ul class="nds-drawer-list nds-scroll-more-content">
                                                <li>
                                                    <button class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label nds-truncate">New digital identity verification system now available</span>
                                                        <span class="nds-tag nds-gray nds-xs">
                                                            <span class="nds-label">23/12/2025</span>
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label nds-truncate">Enhanced online portal for business licensing and permits</span>
                                                        <span class="nds-tag nds-gray nds-xs">
                                                            <span class="nds-label">18/12/2025</span>
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label nds-truncate">Open data initiative: government datasets now publicly accessible</span>
                                                        <span class="nds-tag nds-gray nds-xs">
                                                            <span class="nds-label">18/12/2025</span>
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="nds-btn nds-subtle nds-indicator">
                                                        <span class="nds-label nds-truncate">National cybersecurity awareness campaign launches</span>
                                                        <span class="nds-tag nds-gray nds-xs">
                                                            <span class="nds-label">17/12/2025</span>
                                                        </span>
                                                    </button>
                                                </li>
                                            </ul>
                                            <button class="nds-show-more nds-btn nds-subtle">
                                                <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
                                            </button>
                                        </div>
                                    </nav>
                                </div>
                                <div class="nds-flex nds-col" style="--align: start;--gap: 0;">
                                    <h4>Quick Links</h4>
                                    <nav class="nds-drawer nds-divided nds-fit nds-card nds-stroke" hidden
                                        style="--drawer-max-height:100%; --drawer-truncate:2;">
                                        <div class="nds-scroll-more nds-divided">
                                            <ul class="nds-drawer-list nds-scroll-more-content">
                                                <li>
                                                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                                                        <span class="nds-featured-icon nds-sm">
                                                            <i class="hgi hgi-stroke hgi-link-02"></i>
                                                        </span>
                                                        <span class="nds-label nds-truncate">Services Portal</span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                                                        <span class="nds-featured-icon nds-sm">
                                                            <i class="hgi hgi-stroke hgi-link-02"></i>
                                                        </span>
                                                        <span class="nds-label nds-truncate">Laws and Regulations</span>
                                                        <i class="hgi hgi-stroke hgi-link-square-02"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                                                        <span class="nds-featured-icon nds-sm">
                                                            <i class="hgi hgi-stroke hgi-link-02"></i>
                                                        </span>
                                                        <span class="nds-label nds-truncate">Careers</span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                                                        <span class="nds-featured-icon nds-sm">
                                                            <i class="hgi hgi-stroke hgi-link-02"></i>
                                                        </span>
                                                        <span class="nds-label nds-truncate">Open Data</span>
                                                        <i class="hgi hgi-stroke hgi-link-square-02"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                                                        <span class="nds-featured-icon nds-sm">
                                                            <i class="hgi hgi-stroke hgi-link-02"></i>
                                                        </span>
                                                        <span class="nds-label nds-truncate">Media Center</span>
                                                        <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="nds-btn nds-subtle nds-indicator" href="#">
                                                        <span class="nds-featured-icon nds-sm">
                                                            <i class="hgi hgi-stroke hgi-link-02"></i>
                                                        </span>
                                                        <span class="nds-label nds-truncate">Contact Directory</span>
                                                        <i class="hgi hgi-stroke hgi-link-square-02"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                            <button class="nds-show-more nds-btn nds-subtle">
                                                <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
                                            </button>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-drawer-fit-1" id="tab-drawer-fit-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-drawer-fit-1" aria-labelledby="tab-drawer-fit-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-grid" style="--max-col: 2;--mid-col: 1;--min-col: 1;--row-gap: var(--spacing-6xl);">
  <div class="nds-flex nds-col" style="--align: start;--gap: 0;">
    <h4>Latest Updates</h4>
    <nav class="nds-drawer nds-divided nds-fit nds-card nds-stroke" hidden
      style="--drawer-max-height:100%; --drawer-truncate:2;">
      <div class="nds-scroll-more nds-divided">
        <ul class="nds-drawer-list nds-scroll-more-content">
          <li>
            <button class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label nds-truncate">New digital identity verification system now available</span>
              <span class="nds-tag nds-gray nds-xs">
                <span class="nds-label">23/12/2025</span>
              </span>
            </button>
          </li>
          <li>
            <button class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label nds-truncate">Enhanced online portal for business licensing and permits</span>
              <span class="nds-tag nds-gray nds-xs">
                <span class="nds-label">18/12/2025</span>
              </span>
            </button>
          </li>
          <li>
            <button class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label nds-truncate">Open data initiative: government datasets now publicly accessible</span>
              <span class="nds-tag nds-gray nds-xs">
                <span class="nds-label">18/12/2025</span>
              </span>
            </button>
          </li>
          <li>
            <button class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label nds-truncate">National cybersecurity awareness campaign launches</span>
              <span class="nds-tag nds-gray nds-xs">
                <span class="nds-label">17/12/2025</span>
              </span>
            </button>
          </li>
        </ul>
        <button class="nds-show-more nds-btn nds-subtle">
          <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
        </button>
      </div>
    </nav>
  </div>
  <div class="nds-flex nds-col" style="--align: start;--gap: 0;">
    <h4>Quick Links</h4>
    <nav class="nds-drawer nds-divided nds-fit nds-card nds-stroke" hidden
      style="--drawer-max-height:100%; --drawer-truncate:2;">
      <div class="nds-scroll-more nds-divided">
        <ul class="nds-drawer-list nds-scroll-more-content">
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <span class="nds-featured-icon nds-sm">
                <i class="hgi hgi-stroke hgi-link-02"></i>
              </span>
              <span class="nds-label nds-truncate">Services Portal</span>
              <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <span class="nds-featured-icon nds-sm">
                <i class="hgi hgi-stroke hgi-link-02"></i>
              </span>
              <span class="nds-label nds-truncate">Laws and Regulations</span>
              <i class="hgi hgi-stroke hgi-link-square-02"></i>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <span class="nds-featured-icon nds-sm">
                <i class="hgi hgi-stroke hgi-link-02"></i>
              </span>
              <span class="nds-label nds-truncate">Careers</span>
              <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <span class="nds-featured-icon nds-sm">
                <i class="hgi hgi-stroke hgi-link-02"></i>
              </span>
              <span class="nds-label nds-truncate">Open Data</span>
              <i class="hgi hgi-stroke hgi-link-square-02"></i>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <span class="nds-featured-icon nds-sm">
                <i class="hgi hgi-stroke hgi-link-02"></i>
              </span>
              <span class="nds-label nds-truncate">Media Center</span>
              <i class="hgi hgi-stroke hgi-arrow-left-01"></i>
            </a>
          </li>
          <li>
            <a class="nds-btn nds-subtle nds-indicator" href="#">
              <span class="nds-featured-icon nds-sm">
                <i class="hgi hgi-stroke hgi-link-02"></i>
              </span>
              <span class="nds-label nds-truncate">Contact Directory</span>
              <i class="hgi hgi-stroke hgi-link-square-02"></i>
            </a>
          </li>
        </ul>
        <button class="nds-show-more nds-btn nds-subtle">
          <i class="hgi hgi-stroke hgi-arrow-down-01"></i>
        </button>
      </div>
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
    </div>
</section>

<!-- Rich List Items (Notifications-style) -->
<section id="drawerRichItems" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Rich List Items</h2>
            <p class="nds-section-description">List items with icon, title, status tag, and a description on a second row. Status on the <code class="nds-inline-code lang-html">&lt;li data-status&gt;</code> cascades to the featured icon and tag automatically.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Notifications with status cascade</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-flex nds-col" style="--gap: 0; width: 420px; max-width: 100%;">
                            <nav class="nds-drawer" style="--drawer-max-height: 360px;" hidden>
                                <div class="nds-scroll-more nds-divided">
                                    <ul class="nds-drawer-list nds-scroll-more-content">
                                        <li data-status="success">
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-checkmark-circle-01"></i>
                                                </span>
                                                <span class="nds-drawer-item">
                                                    <span class="nds-drawer-item-head">
                                                        <span class="nds-label nds-truncate">Document Approved</span>
                                                        <span class="nds-tag nds-sm" data-status="success">
                                                            <span class="nds-label">success</span>
                                                        </span>
                                                    </span>
                                                    <span class="nds-description">Your business license application has been reviewed and approved by the licensing authority.</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li data-status="warning">
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-alert-02"></i>
                                                </span>
                                                <span class="nds-drawer-item">
                                                    <span class="nds-drawer-item-head">
                                                        <span class="nds-label nds-truncate">Payment Overdue</span>
                                                        <span class="nds-tag nds-sm" data-status="warning">
                                                            <span class="nds-label">warning</span>
                                                        </span>
                                                    </span>
                                                    <span class="nds-description">Your annual business registration fee of 1,200 SAR is past due. Complete payment to avoid service suspension.</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li data-status="info">
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-notification-02"></i>
                                                </span>
                                                <span class="nds-drawer-item">
                                                    <span class="nds-drawer-item-head">
                                                        <span class="nds-label nds-truncate">System Maintenance</span>
                                                        <span class="nds-tag nds-sm" data-status="info">
                                                            <span class="nds-label">info</span>
                                                        </span>
                                                    </span>
                                                    <span class="nds-description">Scheduled maintenance window from 2:00 AM to 4:00 AM on Friday. Some services may be unavailable.</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li data-status="error">
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-shield-01"></i>
                                                </span>
                                                <span class="nds-drawer-item">
                                                    <span class="nds-drawer-item-head">
                                                        <span class="nds-label nds-truncate">Login Attempt Blocked</span>
                                                        <span class="nds-tag nds-sm" data-status="error">
                                                            <span class="nds-label">error</span>
                                                        </span>
                                                    </span>
                                                    <span class="nds-description">An unauthorized login attempt was detected from an unrecognized device. Your account has been temporarily locked.</span>
                                                </span>
                                            </a>
                                        </li>
                                        <li data-status="info">
                                            <a href="#" class="nds-btn nds-subtle nds-indicator">
                                                <span class="nds-featured-icon nds-sm">
                                                    <i class="hgi hgi-stroke hgi-mail-01"></i>
                                                </span>
                                                <span class="nds-drawer-item">
                                                    <span class="nds-drawer-item-head">
                                                        <span class="nds-label nds-truncate">New Message Received</span>
                                                        <span class="nds-tag nds-sm" data-status="info">
                                                            <span class="nds-label">info</span>
                                                        </span>
                                                    </span>
                                                    <span class="nds-description">You have a new message from the Ministry of Commerce regarding your trade license renewal.</span>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            <hr class="nds-divider">
                            <a href="#" class="nds-btn nds-subtle nds-full">
                                <i class="hgi hgi-stroke hgi-notification-02"></i>
                                <span class="nds-label">View all notifications</span>
                            </a>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-drawer-rich-1" id="tab-drawer-rich-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel"
                                    id="panel-drawer-rich-1" aria-labelledby="tab-drawer-rich-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
<div class="nds-flex nds-col" style="--gap: 0;">
  <nav class="nds-drawer" style="--drawer-max-height: 360px;" hidden>
    <div class="nds-scroll-more nds-divided">
      <ul class="nds-drawer-list nds-scroll-more-content">
        <li data-status="success">
          <a href="#" class="nds-btn nds-subtle nds-indicator">
            <span class="nds-featured-icon nds-sm">
              <i class="hgi hgi-stroke hgi-checkmark-circle-01"></i>
            </span>
            <span class="nds-drawer-item">
              <span class="nds-drawer-item-head">
                <span class="nds-label nds-truncate">Document Approved</span>
                <span class="nds-tag nds-sm" data-status="success">
                  <span class="nds-label">success</span>
                </span>
              </span>
              <span class="nds-description">Your business license application has been reviewed and approved by the licensing authority.</span>
            </span>
          </a>
        </li>
        <li data-status="warning">
          <a href="#" class="nds-btn nds-subtle nds-indicator">
            <span class="nds-featured-icon nds-sm">
              <i class="hgi hgi-stroke hgi-alert-02"></i>
            </span>
            <span class="nds-drawer-item">
              <span class="nds-drawer-item-head">
                <span class="nds-label nds-truncate">Payment Overdue</span>
                <span class="nds-tag nds-sm" data-status="warning">
                  <span class="nds-label">warning</span>
                </span>
              </span>
              <span class="nds-description">Your annual business registration fee of 1,200 SAR is past due. Complete payment to avoid service suspension.</span>
            </span>
          </a>
        </li>
        <li data-status="info">
          <a href="#" class="nds-btn nds-subtle nds-indicator">
            <span class="nds-featured-icon nds-sm">
              <i class="hgi hgi-stroke hgi-notification-02"></i>
            </span>
            <span class="nds-drawer-item">
              <span class="nds-drawer-item-head">
                <span class="nds-label nds-truncate">System Maintenance</span>
                <span class="nds-tag nds-sm" data-status="info">
                  <span class="nds-label">info</span>
                </span>
              </span>
              <span class="nds-description">Scheduled maintenance window from 2:00 AM to 4:00 AM on Friday. Some services may be unavailable.</span>
            </span>
          </a>
        </li>
        <li data-status="error">
          <a href="#" class="nds-btn nds-subtle nds-indicator">
            <span class="nds-featured-icon nds-sm">
              <i class="hgi hgi-stroke hgi-shield-01"></i>
            </span>
            <span class="nds-drawer-item">
              <span class="nds-drawer-item-head">
                <span class="nds-label nds-truncate">Login Attempt Blocked</span>
                <span class="nds-tag nds-sm" data-status="error">
                  <span class="nds-label">error</span>
                </span>
              </span>
              <span class="nds-description">An unauthorized login attempt was detected from an unrecognized device. Your account has been temporarily locked.</span>
            </span>
          </a>
        </li>
        <li data-status="info">
          <a href="#" class="nds-btn nds-subtle nds-indicator">
            <span class="nds-featured-icon nds-sm">
              <i class="hgi hgi-stroke hgi-mail-01"></i>
            </span>
            <span class="nds-drawer-item">
              <span class="nds-drawer-item-head">
                <span class="nds-label nds-truncate">New Message Received</span>
                <span class="nds-tag nds-sm" data-status="info">
                  <span class="nds-label">info</span>
                </span>
              </span>
              <span class="nds-description">You have a new message from the Ministry of Commerce regarding your trade license renewal.</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <hr class="nds-divider">
  <a href="#" class="nds-btn nds-subtle nds-full">
    <i class="hgi hgi-stroke hgi-notification-02"></i>
    <span class="nds-label">View all notifications</span>
  </a>
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
<section id="drawerFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Works on page load with just HTML markup. For dynamically added drawers, call <code class="nds-inline-code lang-js">reinit()</code> to activate new instances.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01"></i>
                        <span class="nds-label">Accordion Submenus</span>
                    </span>
                    <p class="nds-item-desc">Smooth animated expand and collapse with automatic sibling closing, detected via CSS <code class="nds-inline-code lang-html">:has()</code> without extra classes.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cursor-move-02"></i>
                        <span class="nds-label">State Management</span>
                    </span>
                    <p class="nds-item-desc">Open, closing, and active states tracked via <code class="nds-inline-code lang-html">data-state</code> with custom events on every transition. Active nested items auto-reveal their parent menus on load.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mobile-programming-01"></i>
                        <span class="nds-label">Breakpoint-Driven Modes</span>
                    </span>
                    <p class="nds-item-desc">Static expanded list on desktop that collapses into an accordion on mobile, controlled per-drawer or per-item with a single data attribute.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-arrow-shrink"></i>
                        <span class="nds-label">Scroll Overflow</span>
                    </span>
                    <p class="nds-item-desc">Height-constrained mode with gradient fade and a show-more button that auto-detects overflow and flips at scroll end.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">JavaScript API</span>
                    </span>
                    <p class="nds-item-desc">Programmatic toggle, overflow check, init, destroy, and custom events fired on every submenu open and close.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="drawerGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use drawers for <strong>sidebar navigation</strong> with nested menu structures. The accordion behavior keeps the interface tidy by closing siblings automatically when a new submenu opens.</li>
                    <li>Works equally well for <strong>flat link lists</strong> like quick links, latest updates, promotional items, or related resources where no nesting is needed.</li>
                    <li>Use the <strong>Rich List Items</strong> layout for inline notification feeds, activity lists, or any list where each row needs an icon, title, status tag, and a supporting description line.</li>
                    <li>Do not use a drawer for top-level page navigation. Use the <a class="nds-color" href="{{ 'ui-shell/header' | relative_url }}">Header</a> instead, which is built to host primary nav, search, and user controls.</li>
                    <li>Do not use a drawer for compact action menus attached to a single trigger. Use the <a class="nds-color" href="{{ 'components/dropmenu' | relative_url }}">Dropmenu</a>, which handles positioning and dismissal for overlay menus.</li>
                    <li>Reach for <strong><code class="nds-inline-code lang-html">nds-fit</code></strong> when the drawer sits in a grid column that should match the height of sibling cards. Combine with <code class="nds-inline-code lang-html">nds-card</code> and <code class="nds-inline-code lang-html">nds-stroke</code> for a framed block.</li>
                    <li>Add <strong><code class="nds-inline-code lang-html">nds-divided</code></strong> when rows carry multi-line content (descriptions, timestamps, tags). Leave it off for dense flat link lists where the indicator alone is enough visual separation.</li>
                    <li>Keep nesting to a maximum of <strong>two levels</strong>. The component animates and tracks state for two levels only; deeper trees become hard to scan and hit edge cases in the expand/collapse logic.</li>
                    <li>Mark the current page with <code class="nds-inline-code lang-html">data-state="active"</code> on the deepest <code class="nds-inline-code lang-html">&lt;li&gt;</code>. The drawer automatically opens all ancestor submenus on load so users land with the active path revealed.</li>
                    <li>Constrain long lists by setting <code class="nds-inline-code lang-html">--drawer-max-height</code> on the <code class="nds-inline-code lang-html">&lt;nav&gt;</code> and wrapping the list in <code class="nds-inline-code lang-html">.nds-scroll-more</code>. The fade mask and show-more button appear only when content actually overflows.</li>
                    <li>Apply <code class="nds-inline-code lang-html">nds-oncolor</code> when the drawer sits on a dark or tinted surface. It rebalances dividers and indicators so rows remain legible without touching text colors.</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-sm</code></td>
                            <td>Compact size with tighter indentation (<code class="nds-inline-code lang-html">--spacing-lg</code>) and a 2px active indicator.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-lg</code></td>
                            <td>Roomier size with wider indentation (<code class="nds-inline-code lang-html">--spacing-2xl</code>) and a 4px active indicator.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-divided</code></td>
                            <td>Adds horizontal divider lines between list items. Useful for rows with multi-line content.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-fit</code></td>
                            <td>Stretches the drawer to fill its parent height for equal-height columns in grid layouts.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-oncolor</code></td>
                            <td>Rebalances dividers and indicators for use on dark or colored backgrounds.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-card</code></td>
                            <td>Displays the drawer as a card-width block, letting it sit alongside other cards in a grid.</td>
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
                            <td><code class="nds-inline-code lang-html">data-state="active"</code></td>
                            <td>Set on <code class="nds-inline-code lang-html">&lt;li&gt;</code> to mark the current page. The button indicator activates and parent menus expand automatically.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-open-on</code></td>
                            <td>Set on drawer or individual <code class="nds-inline-code lang-html">&lt;li&gt;</code>. Submenus start expanded at the matching breakpoint but remain toggleable. <code class="nds-inline-code lang-html">tablet</code> opens on tablet and everything larger. <code class="nds-inline-code lang-html">tablet-max</code> opens on tablet and everything smaller, closed on desktop. Values: <code class="nds-inline-code lang-html">mobile</code>, <code class="nds-inline-code lang-html">tablet</code>, <code class="nds-inline-code lang-html">tablet-max</code>, <code class="nds-inline-code lang-html">desktop</code>, <code class="nds-inline-code lang-html">desktop-max</code>, <code class="nds-inline-code lang-html">large-desktop</code>, <code class="nds-inline-code lang-html">always</code>, <code class="nds-inline-code lang-html">never</code>.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-always-open-on</code></td>
                            <td>Set on drawer only. Locks all submenus open and disables interaction at the matching breakpoint. Arrows hidden, buttons non-clickable. Below that breakpoint, reverts to normal accordion. Same values as <code class="nds-inline-code lang-html">data-open-on</code>.</td>
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
                            <td><code class="nds-inline-code lang-html">--drawer-gap</code></td>
                            <td><code class="nds-inline-code lang-html">0px</code></td>
                            <td>Vertical spacing between list items.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--drawer-indent</code></td>
                            <td><code class="nds-inline-code lang-html">var(--spacing-md)</code></td>
                            <td>Submenu indentation. Increases with <code class="nds-inline-code lang-html">nds-sm</code> and <code class="nds-inline-code lang-html">nds-lg</code>.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--drawer-divider</code></td>
                            <td><code class="nds-inline-code lang-html">var(--divider-color)</code></td>
                            <td>Color of the divider lines when <code class="nds-inline-code lang-html">nds-divided</code> is applied.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--drawer-indicator-width</code></td>
                            <td><code class="nds-inline-code lang-html">5px</code></td>
                            <td>Thickness of the active/hover indicator bar. Overridden by <code class="nds-inline-code lang-html">nds-sm</code> (2px) and <code class="nds-inline-code lang-html">nds-lg</code> (4px).</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--drawer-indicator</code></td>
                            <td><code class="nds-inline-code lang-html">transparent</code></td>
                            <td>Default indicator color for inactive items.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--drawer-indicator-active</code></td>
                            <td><code class="nds-inline-code lang-html">var(--background-primary)</code></td>
                            <td>Indicator color for the active item (<code class="nds-inline-code lang-html">data-state="active"</code>).</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--drawer-indicator-hover</code></td>
                            <td><code class="nds-inline-code lang-html">var(--colors-neutral-400)</code></td>
                            <td>Indicator color on hover.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--drawer-truncate</code></td>
                            <td><code class="nds-inline-code lang-html">1</code></td>
                            <td>Maximum number of visible lines per label before truncation.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--drawer-transition</code></td>
                            <td><code class="nds-inline-code lang-html">var(--nds-transition)</code></td>
                            <td>Animation timing for submenu expand and collapse.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--drawer-max-height</code></td>
                            <td><code class="nds-inline-code lang-html">400px</code></td>
                            <td>Maximum height before scroll overflow activates (requires <code class="nds-inline-code lang-html">.nds-scroll-more</code> wrapper).</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--drawer-btn-height</code></td>
                            <td><code class="nds-inline-code lang-html">fit-content</code></td>
                            <td>Height applied to each row button. Set to <code class="nds-inline-code lang-html">100%</code> when <code class="nds-inline-code lang-html">nds-fit</code> is used.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--drawer-btn-gap</code></td>
                            <td><code class="nds-inline-code lang-html">var(--spacing-md)</code></td>
                            <td>Gap between the icon, label, and trailing content inside a row.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p><strong>NDS.Drawer</strong> initializes automatically on page load for all <code class="nds-inline-code lang-html">.nds-drawer</code> elements. For dynamically added drawers, call <code class="nds-inline-code lang-js">NDS.Drawer.initDrawer(element)</code>.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialize ──────────────────────────────────────
NDS.Drawer.init();                    // All drawers on the page
NDS.Drawer.reinit();                  // Re-scan (same as init)
NDS.Drawer.initDrawer(drawerEl);      // Single drawer element

// ── Toggle a submenu ────────────────────────────────
// Pass the parent button element (does nothing in always-open mode)
const menuBtn = drawer.querySelector('.nds-menu-btn');
NDS.Drawer.toggle(menuBtn);

// ── Destroy ─────────────────────────────────────────
// Removes event listeners, resize observers, and stored state
NDS.Drawer.destroy(drawerEl);

// ── Custom Events ───────────────────────────────────
// Fired on the drawer element, bubbles up
document.addEventListener('nds:drawer:shown', (e) => {
    console.log('Submenu opened:', e.detail.item);   // The &lt;li&gt; element
    console.log('Drawer:', e.detail.drawer);          // The .nds-drawer element
});

document.addEventListener('nds:drawer:hidden', (e) => {
    console.log('Submenu closed:', e.detail.item);
});

// ── Responsive Attributes ───────────────────────────
// data-open-on: 'mobile' | 'tablet' | 'tablet-max' | 'desktop' | 'desktop-max' | 'large-desktop' | 'always' | 'never'
// Set on drawer (default for all items) or on individual &lt;li&gt; (override)

// data-always-open-on: same breakpoint values
// Makes drawer permanently expanded and non-interactive at that breakpoint
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
