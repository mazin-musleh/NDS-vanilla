---
layout: page
title: Main Navigation
hero_title: Main Navigation - National Design System
hero_description: The site's primary navigation bar, carrying branding, top-level links, mega-menu dropdowns, utility actions, and a mobile drawer that collapses the whole set behind one toggle.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.8.0"
last_edit: "21/08/2026 - 06:58 PM"
---


<!-- Navigation Bar -->
<section id="navBar" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Navigation Bar</h2>
            <p class="nds-section-description">The sticky navigation bar holds branding, primary links, secondary actions, and the mobile hamburger toggle.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Navigation Bar</div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true" aria-controls="panel-nav-bar-1" id="tab-nav-bar-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-nav-bar-1" aria-labelledby="tab-nav-bar-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;nav class="nds-main-nav nds-content-wrapper" id="ndsMainNav" aria-label="Primary navigation"&gt;
  &lt;div class="nds-nav-container"&gt;
    &lt;a class="nds-brand" href="/"&gt;
      &lt;img class="nds-brand-logo" src="logo.svg" width="120" height="40" alt="Brand Logo"&gt;
      &lt;span class="nds-brand-name"&gt;Brand Name
        &lt;span class="nds-brand-slogan"&gt;Slogan text&lt;/span&gt;
      &lt;/span&gt;
    &lt;/a&gt;
    &lt;ul class="nds-nav-minimal" hidden&gt;
      &lt;li class="nds-mainNav-toggler nds-nav-item"&gt;
        &lt;button class="nds-nav-link nds-btn nds-subtle nds-indicator" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="ndsNavCollapse"&gt;
          &lt;i class="nds-icon nds-hgi-menu-01" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;/button&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class="nds-collapse" id="ndsNavCollapse" hidden&gt;
      &lt;div class="nds-collapse-content"&gt;
        &lt;ul class="nds-nav-primary"&gt;
          &lt;li class="nds-nav-item"&gt;
            &lt;a href="/services" class="nds-nav-link nds-btn nds-subtle nds-indicator"&gt;
              &lt;span class="nds-label"&gt;Services&lt;/span&gt;
            &lt;/a&gt;
          &lt;/li&gt;
          &lt;li class="nds-nav-item"&gt;
            &lt;a href="/about" class="nds-nav-link nds-btn nds-subtle nds-indicator"&gt;
              &lt;span class="nds-label"&gt;About&lt;/span&gt;
            &lt;/a&gt;
          &lt;/li&gt;
        &lt;/ul&gt;
        &lt;div class="nds-nav-item nds-show-more"&gt;
          &lt;a class="nds-nav-link nds-btn nds-subtle nds-indicator nds-full"&gt;
            &lt;i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;/a&gt;
        &lt;/div&gt;
        &lt;ul class="nds-nav-actions"&gt;
          &lt;li class="nds-nav-item"&gt;
            &lt;a href="/search" class="nds-nav-link nds-btn nds-subtle nds-indicator"&gt;
              &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
              &lt;span class="nds-label" data-hidden="sm md sr"&gt;Search&lt;/span&gt;
            &lt;/a&gt;
          &lt;/li&gt;
        &lt;/ul&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/nav&gt;
                                        </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Persistent Actions and Call to Action</div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true" aria-controls="panel-nav-actions-1" id="tab-nav-actions-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-nav-actions-1" aria-labelledby="tab-nav-actions-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;ul class="nds-nav-actions"&gt;
  &lt;!-- Stays reachable in minimal mode --&gt;
  &lt;li class="nds-nav-item nds-icon-only nds-PAB"&gt;
    &lt;a href="/notifications" class="nds-nav-link nds-btn nds-subtle nds-indicator" title="Notifications"&gt;
      &lt;i class="nds-icon nds-hgi-notification-02" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;span class="nds-label" data-hidden="sm md sr"&gt;Notifications&lt;/span&gt;
    &lt;/a&gt;
  &lt;/li&gt;
  &lt;!-- Compact button, placed first in the minimal bar --&gt;
  &lt;li class="nds-nav-item nds-PAB nds-CTA"&gt;
    &lt;a href="/apply" class="nds-btn nds-primary" title="Apply Now"&gt;
      &lt;span class="nds-label"&gt;Apply Now&lt;/span&gt;
    &lt;/a&gt;
  &lt;/li&gt;
&lt;/ul&gt;
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
    </div>
</section>

<!-- Dropdown Menus -->
<section id="navDropdowns" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Dropdown Menu Content</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-dropdown</code> to a nav item to attach a dropdown panel. The panel's <code class="nds-inline-code lang-html">nds-dropdown-columns</code> child supports three layouts for organizing content.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">

                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Column View: Categories with Titles</div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true" aria-controls="panel-dropdown-col-1" id="tab-dropdown-col-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-dropdown-col-1" aria-labelledby="tab-dropdown-col-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;li class="nds-nav-item nds-dropdown"&gt;
  &lt;a href="#" class="nds-nav-link nds-btn nds-subtle nds-menu-btn nds-indicator"&gt;
    &lt;span class="nds-label"&gt;Services&lt;/span&gt;
  &lt;/a&gt;
  &lt;div class="nds-dropdown-menu" hidden&gt;
    &lt;div class="nds-dropdown-content nds-content-wrapper"&gt;
      &lt;div class="nds-dropdown-columns nds-colView"&gt;

        &lt;div class="nds-column"&gt;
          &lt;div class="nds-dropdown-title"&gt;For Citizens&lt;/div&gt;
          &lt;div class="nds-list"&gt;
            &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="/citizens/national-id"&gt;
              &lt;i class="nds-icon nds-hgi-identity-card" aria-hidden="true"&gt;&lt;/i&gt;
              &lt;span class="nds-label"&gt;National ID&lt;/span&gt;
            &lt;/a&gt;
            &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="/citizens/travel"&gt;
              &lt;i class="nds-icon nds-hgi-door-01" aria-hidden="true"&gt;&lt;/i&gt;
              &lt;span class="nds-label"&gt;Travel Services&lt;/span&gt;
            &lt;/a&gt;
          &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="nds-column"&gt;
          &lt;div class="nds-dropdown-title"&gt;For Businesses&lt;/div&gt;
          &lt;div class="nds-list"&gt;
            &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="/business/licensing"&gt;
              &lt;i class="nds-icon nds-hgi-award-05" aria-hidden="true"&gt;&lt;/i&gt;
              &lt;span class="nds-label"&gt;Licensing&lt;/span&gt;
            &lt;/a&gt;
            &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="/business/tax"&gt;
              &lt;i class="nds-icon nds-hgi-riyal-circular" aria-hidden="true"&gt;&lt;/i&gt;
              &lt;span class="nds-label"&gt;Tax Filing&lt;/span&gt;
            &lt;/a&gt;
          &lt;/div&gt;
        &lt;/div&gt;

      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/li&gt;
                                        </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Row View: Flat Horizontal List</div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true" aria-controls="panel-dropdown-row-1" id="tab-dropdown-row-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-dropdown-row-1" aria-labelledby="tab-dropdown-row-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;li class="nds-nav-item nds-dropdown"&gt;
  &lt;a href="#" class="nds-nav-link nds-btn nds-subtle nds-menu-btn nds-indicator"&gt;
    &lt;span class="nds-label"&gt;Tools&lt;/span&gt;
  &lt;/a&gt;
  &lt;div class="nds-dropdown-menu nds-fit" hidden&gt;
    &lt;div class="nds-dropdown-content"&gt;
      &lt;div class="nds-dropdown-columns nds-rowView"&gt;
        &lt;div class="nds-list"&gt;
          &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="/tools/search"&gt;
            &lt;i class="nds-icon nds-hgi-search-01" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;Search&lt;/span&gt;
          &lt;/a&gt;
          &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="/tools/translate"&gt;
            &lt;i class="nds-icon nds-hgi-translation" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;Translate&lt;/span&gt;
          &lt;/a&gt;
          &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="/tools/support"&gt;
            &lt;i class="nds-icon nds-hgi-headphones" aria-hidden="true"&gt;&lt;/i&gt;
            &lt;span class="nds-label"&gt;Support&lt;/span&gt;
          &lt;/a&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/li&gt;
                                    </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-label">Multi-Column List: 3-Column Grid Inside a Column</div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true" aria-controls="panel-dropdown-mcl-1" id="tab-dropdown-mcl-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-dropdown-mcl-1" aria-labelledby="tab-dropdown-mcl-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                            <code class="lang-html code">
&lt;li class="nds-nav-item nds-dropdown"&gt;
  &lt;a href="#" class="nds-nav-link nds-btn nds-subtle nds-menu-btn nds-indicator"&gt;
    &lt;span class="nds-label"&gt;All Services&lt;/span&gt;
  &lt;/a&gt;
  &lt;div class="nds-dropdown-menu" hidden&gt;
    &lt;div class="nds-dropdown-content nds-content-wrapper"&gt;
      &lt;div class="nds-dropdown-columns nds-colView"&gt;
        &lt;div class="nds-column"&gt;
          &lt;div class="nds-dropdown-title"&gt;Directory&lt;/div&gt;
          &lt;div class="nds-list nds-multi-column-list"&gt;
            &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="#"&gt;
              &lt;span class="nds-label"&gt;Education&lt;/span&gt;
            &lt;/a&gt;
            &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="#"&gt;
              &lt;span class="nds-label"&gt;Health&lt;/span&gt;
            &lt;/a&gt;
            &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="#"&gt;
              &lt;span class="nds-label"&gt;Transport&lt;/span&gt;
            &lt;/a&gt;
            &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="#"&gt;
              &lt;span class="nds-label"&gt;Housing&lt;/span&gt;
            &lt;/a&gt;
            &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="#"&gt;
              &lt;span class="nds-label"&gt;Employment&lt;/span&gt;
            &lt;/a&gt;
            &lt;a class="nds-btn nds-subtle nds-dropdown-item" href="#"&gt;
              &lt;span class="nds-label"&gt;Legal&lt;/span&gt;
            &lt;/a&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/li&gt;
                                        </code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="nds-block nds-prose" style="margin-top: var(--spacing-3xl);">
                <h3 class="nds-block-title">Data-Driven Dropdowns</h3>
                <p>Site note: the includes below belong to this documentation site's own Jekyll build, not to your project. Pages here render dropdown content from <code class="nds-inline-code lang-html">_data/mainnav/mainnav.yml</code> through two includes that map to the layouts above. In your own project, copy the dropdown markup instead:</p>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Template</th><th>Layout</th><th>Data Source</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">mainnav-column-view.html</code></td><td><code class="nds-inline-code lang-html">nds-colView</code> with optional <code class="nds-inline-code lang-html">nds-multi-column-list</code> per column</td><td>columns + items array keyed to a file in <code class="nds-inline-code lang-html">_data/content/</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">mainnav-row-list.html</code></td><td><code class="nds-inline-code lang-html">nds-rowView</code></td><td>flat items array keyed to a file in <code class="nds-inline-code lang-html">_data/content/</code></td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>

<!-- Built-in Features -->
<section id="mainnavFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-plug-socket"></i>
                            <span class="nds-label">Auto-initialization</span>
                        </span>
                        <p class="nds-item-desc">Activates when <code class="nds-inline-code lang-html">.nds-main-nav</code> is on the page. Dropdowns, collapse, overflow detection, and scroll behavior attach automatically.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-smart-phone-01"></i>
                            <span class="nds-label">Responsive Collapse</span>
                        </span>
                        <p class="nds-item-desc">Switches from a horizontal nav bar to a hamburger menu at a configurable breakpoint, with animated expand and collapse transitions.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-mouse-scroll-01"></i>
                            <span class="nds-label">Overflow Detection</span>
                        </span>
                        <p class="nds-item-desc">Primary nav items that exceed the available width become scrollable, with a show-more button that scrolls through hidden items.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-layout-grid"></i>
                            <span class="nds-label">Dropdown Columns</span>
                        </span>
                        <p class="nds-item-desc">Dropdown content can be organized in column, row, or multi-column list layouts that adapt to narrower screens.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-navigation-03"></i>
                            <span class="nds-label">Scroll-to-Anchor</span>
                        </span>
                        <p class="nds-item-desc">Same-page anchor links in the nav close open menus and scroll smoothly to the target section.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-drag-drop"></i>
                            <span class="nds-label">Drag and Wheel Scrolling</span>
                        </span>
                        <p class="nds-item-desc">Primary nav supports horizontal drag scrolling and converts vertical mouse wheel input to horizontal scroll when items overflow.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-sidebar-right"></i>
                            <span class="nds-label">RTL Support</span>
                        </span>
                        <p class="nds-item-desc">Scroll direction, drag behavior, and layout flip automatically in right-to-left contexts.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-shield-01"></i>
                            <span class="nds-label">Reduced Motion</span>
                        </span>
                        <p class="nds-item-desc">All header transitions respect the <code class="nds-inline-code lang-html">prefers-reduced-motion</code> setting, skipping animations for users who have requested it.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-pin-location-01"></i>
                            <span class="nds-label">Persistent Action Buttons</span>
                        </span>
                        <p class="nds-item-desc">Nav items marked with <code class="nds-inline-code lang-html">nds-PAB</code> automatically relocate to the minimal nav bar on small screens and return to their original position on larger viewports.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-layers-01"></i>
                            <span class="nds-label">Backdrop Overlay</span>
                        </span>
                        <p class="nds-item-desc">Opening a dropdown or the mobile collapse displays a backdrop that closes the menu on outside clicks, preventing interaction with page content beneath.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="mainnavGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Place the navigation bar at the top of every page, inside the <code class="nds-inline-code lang-html">&lt;header&gt;</code> element. See <a class="nds-color" href="{{ 'ui-shell/header' | relative_url }}">Header</a> for how it composes with the <a class="nds-color" href="{{ 'ui-shell/topbar' | relative_url }}">top bar</a> above it.</li>
                    <li>Keep primary nav items between 3 and 8 links. Overflow handling activates automatically, but excessive items reduce usability.</li>
                    <li>Use dropdown menus for grouping related pages under a single primary nav item. Organize content into columns using <code class="nds-inline-code lang-html">nds-colView</code> for category-based layouts or <code class="nds-inline-code lang-html">nds-rowView</code> for flat lists.</li>
                    <li>Reserve the secondary nav for utility actions: search, language toggle, user profile, notifications. These persist across all breakpoints as icon-only buttons on smaller screens.</li>
                    <li>Pages with no header still need a language switch. Put it in the page's own top area. The <a class="nds-color" href="{{ 'examples/sign-in' | relative_url }}">Sign in</a> example puts it in the card header, next to the brand logo.</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-CTA</code> on a nav item to render it as a compact button instead of a link, for the one action the page is steering people toward: sign in, start a service, book an appointment. Omit <code class="nds-inline-code lang-html">data-hidden</code> on its label so the text stays readable at every width.</li>
                    <li>Do not use the main navigation for in-page section links. Use <a class="nds-color" href="{{ 'components/tabs' | relative_url }}">Tabs</a> for switching between content panels on the same page, or anchor links within the page body.</li>
                    <li>Do not place critical actions only inside dropdown menus. Users on mobile may not discover them. Promote key actions to the primary or secondary nav level.</li>
                    <li>Do not add more than one level of dropdown nesting. The component supports single-level dropdowns only.</li>
                    <li>Set the brand logo dimensions explicitly with <code class="nds-inline-code lang-html">width</code> and <code class="nds-inline-code lang-html">height</code> attributes to prevent layout shift during page load.</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-icon-only</code> on secondary nav items that should display as icon buttons at every width. For labels that should collapse only on smaller screens, stamp <code class="nds-inline-code lang-html">data-hidden="sm md sr"</code> on the label as the markup above shows: the <code class="nds-inline-code lang-html">sr</code> token keeps the accessible name while the label is visually hidden. See the <a class="nds-color" href="{{ 'utilities/hidden' | relative_url }}">Hidden</a> utility.</li>
                    <li>Mark nav items that must stay reachable at every breakpoint with <code class="nds-inline-code lang-html">nds-PAB</code>. Search, language, and account are the usual ones. Do not mark every action: unmarked items stay in the expanded menu, and a minimal bar carrying everything defeats it. JavaScript moves the item into the minimal bar and returns it to the position you authored, so do not reparent a PAB item yourself at runtime.</li>
                    <li>A PAB carrying <code class="nds-inline-code lang-html">nds-CTA</code> is placed first in the minimal bar, ahead of the other persistent items. Use that when the call to action must be the one control a small screen never hides.</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Element</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-dropdown</code></td><td>nav-item</td><td>Enables dropdown menu behavior</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-CTA</code></td><td>nav-item</td><td>Renders the item as a compact button rather than a link, sizing the inner button to 32px</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-icon-only</code></td><td>nav-item</td><td>Displays as icon button, hides label</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-PAB</code></td><td>nav-item</td><td>Persistent action button. JavaScript moves the item into <code class="nds-inline-code lang-html">.nds-nav-minimal</code> in minimal mode and returns it to its authored position on wider viewports</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-show-more</code></td><td>nav-item</td><td>Marks the overflow scroll button</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-oncolor</code></td><td>nav-link</td><td>Applies on-color text styling for dark backgrounds</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-menu-btn</code></td><td>nav-link</td><td>Transparent background style with indicator for primary nav items (mobile)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-fit</code></td><td>dropdown-menu</td><td>Sizes the dropdown to fit its content width</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-colView</code></td><td>dropdown-columns</td><td>Organizes content in vertical columns</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-rowView</code></td><td>dropdown-columns</td><td>Organizes content in a horizontal row layout</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-multi-column-list</code></td><td>list inside dropdown</td><td>Renders items in a 3-column grid</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Element</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-state="current"</code></td><td>nav-link</td><td>Marks the current page. You write it, and nothing in the component removes it. This is the only attribute that highlights the current page in the main nav. <code class="nds-inline-code lang-html">aria-current="page"</code> is for screen readers and drives no styling, so a link with that alone renders with no highlight at all &mdash; set both. <code class="nds-inline-code lang-js">NDS.Init.audit()</code> reports a link that is missing it</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-state="active"</code></td><td>nav-link</td><td>Written and removed by the component while that link's dropdown is open. Never author it. On a current-page link it looks correct at first and then disappears, because the next dropdown close strips it. The <a class="nds-color" href="{{ 'ui-shell/sidemenu' | relative_url }}">Side Menu</a> uses the same word on its <code class="nds-inline-code lang-html">&lt;li&gt;</code> elements, where it does mean the current page &mdash; a different element doing a different job. Do not carry that spelling over to the main nav</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-hidden="sm md sr"</code></td><td>action-item label</td><td>Collapses the label to icon-only below 960px while screen readers keep the name. Omit on <code class="nds-inline-code lang-html">nds-CTA</code> items so their labels stay visible. See the <a class="nds-color" href="{{ 'utilities/hidden' | relative_url }}">Hidden</a> utility</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--nds-nav-height</code></td><td><code class="nds-inline-code lang-html">72px</code></td><td>Height of the navigation bar</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--nds-minimal-nav-bp</code></td><td><code class="nds-inline-code lang-html">960px</code></td><td>Breakpoint width for switching to mobile/minimal mode</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--nds-transition-speed</code></td><td><code class="nds-inline-code lang-html">0.2</code></td><td>Base transition speed in seconds</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--nds-minimal-nav-item-height</code></td><td><code class="nds-inline-code lang-html">40px</code></td><td>Height of each nav item in the mobile collapse panel</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The main navigation initializes automatically when <code class="nds-inline-code lang-html">.nds-main-nav</code> exists on the page, and wires its own click handling through event delegation: the hamburger toggle and dropdown triggers respond without any inline <code class="nds-inline-code lang-html">onclick</code> attributes. The functions below are exposed on the <code class="nds-inline-code lang-js">NDS.Mainnav</code> namespace for driving the nav from external scripts. If your app renders the header itself, read the re-initialize note at the end of the block.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript">
// ── Toggle Functions ─────────────────────────
// Exposed on the NDS.Mainnav namespace for external scripts
// and integrations. Bind to your own triggers as needed.

// Toggle the mobile hamburger collapse.
// Opens the collapse panel if closed, closes it if open.
// Queues the action if an animation is already running.
NDS.Mainnav.toggleNavbar();

// Toggle a dropdown menu.
// Pass the native click event from the trigger element.
// The function finds the closest .nds-dropdown ancestor,
// closes any other open dropdown first, then opens the target.
NDS.Mainnav.toggleDropdown(event);

// ── Re-initialize ────────────────────────────
// Call when the nav ELEMENT itself is new. Two cases,
// both silent without it: the nav renders after the
// bundle runs, which happens when a framework mounts
// the chrome, or a route change replaces the nav. In
// both, the CSS still paints the nav and no click works.
NDS.Mainnav.reinit();

// Or make the one call that covers every component.
NDS.Init.refresh(document.body);

// Adding or removing nav ITEMS inside a live nav needs
// no call. The nav watches for that and re-runs its
// overflow and placement work on its own. Re-running on
// an unchanged nav is a no-op, so both calls above are
// safe to make as often as you like.

// init() wires the nav once, on page load. Calling it
// again does nothing, so reach for reinit() instead.
NDS.Mainnav.init();

// For top bar widget APIs (date, clock, weather, DGA stamp)
// see the Top Bar documentation page.
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
