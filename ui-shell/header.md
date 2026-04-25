---
layout: page
title: Header
hero_title: Header - National Design System
hero_description: The site header shell combines the top bar and the main navigation into a single responsive region that handles government branding, primary page links, dropdown menus, and secondary utility actions across all screen sizes.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Header Structure -->
<section id="headerStructure" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Header Structure</h2>
            <p class="nds-section-description">The header wraps three layers: the <a class="nds-color" href="{{ 'ui-shell/topbar' | relative_url }}">top bar</a> for government branding and utilities, the main navigation bar, and the expandable <a class="nds-color" href="{{ 'ui-shell/topbar' | relative_url }}#dgaDigitalStamp">DGA digital stamp</a> panel.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Header Structure</div>
                    </div>
                    <div class="demo-container nds-noBg">
                        <div class="nds-code nds-expandable">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <div class="nds-expandable-content">
                                <code class="lang-html code">
header
&#9500;&#9472;&#9472; div.nds-topbar.nds-content-wrapper
&#9474;   &#9500;&#9472;&#9472; button.nds-digitalStamp-tab
&#9474;   &#9492;&#9472;&#9472; div.nds-topbar-info
&#9474;
&#9500;&#9472;&#9472; div#nds-digitalStamp (expandable panel, hidden by default)
&#9474;   &#9492;&#9472;&#9472; div.nds-content-wrapper
&#9474;       &#9492;&#9472;&#9472; div.nds-digitalStamp-notices.nds-grid
&#9474;           &#9500;&#9472;&#9472; div.nds-digitalStamp-card (notice cards)
&#9474;           &#9474;   &#9500;&#9472;&#9472; div.nds-digitalStamp-icon
&#9474;           &#9474;   &#9492;&#9472;&#9472; div.nds-digitalStamp-content
&#9474;           &#9492;&#9472;&#9472; div.nds-digitalStamp-register
&#9474;
&#9492;&#9472;&#9472; nav.nds-main-nav.nds-content-wrapper
    &#9492;&#9472;&#9472; div.nds-nav-container
        &#9500;&#9472;&#9472; a.nds-brand
        &#9474;   &#9500;&#9472;&#9472; img.nds-brand-logo
        &#9474;   &#9492;&#9472;&#9472; span.nds-brand-name
        &#9474;       &#9492;&#9472;&#9472; span.nds-brand-slogan
        &#9500;&#9472;&#9472; ul.nds-nav-minimal
        &#9474;   &#9492;&#9472;&#9472; li.nds-mainNav-toggler (hamburger button)
        &#9492;&#9472;&#9472; div.nds-collapse#ndsNavCollapse
            &#9492;&#9472;&#9472; div.nds-collapse-content
                &#9500;&#9472;&#9472; ul.nds-nav-primary
                &#9474;   &#9500;&#9472;&#9472; li.nds-nav-item
                &#9474;   &#9474;   &#9492;&#9472;&#9472; a.nds-nav-link
                &#9474;   &#9500;&#9472;&#9472; li.nds-nav-item.nds-dropdown
                &#9474;   &#9474;   &#9500;&#9472;&#9472; a.nds-nav-link
                &#9474;   &#9474;   &#9492;&#9472;&#9472; div.nds-dropdown-menu
                &#9474;   &#9474;       &#9492;&#9472;&#9472; div.nds-dropdown-content.nds-content-wrapper
                &#9474;   &#9492;&#9472;&#9472; div.nds-show-more
                &#9492;&#9472;&#9472; ul.nds-nav-actions
                    &#9492;&#9472;&#9472; li.nds-nav-item
                        &#9492;&#9472;&#9472; a/button.nds-nav-link
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Navigation Bar -->
<section id="navBar" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Navigation Bar</h2>
            <p class="nds-section-description">The sticky navigation bar holds branding, primary links, secondary actions, and the mobile hamburger toggle.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Navigation Bar</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-nav-bar-1" id="tab-nav-bar-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
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
    &lt;ul class="nds-nav-minimal"&gt;
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
              &lt;span class="nds-label"&gt;Search&lt;/span&gt;
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
            <div class="nds-showcase">

                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Column View — Categories with Titles</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-dropdown-col-1" id="tab-dropdown-col-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
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
  &lt;div class="nds-dropdown-menu"&gt;
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
                        <div class="demo-label">Row View — Flat Horizontal List</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-dropdown-row-1" id="tab-dropdown-row-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
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
  &lt;div class="nds-dropdown-menu nds-fit"&gt;
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
                        <div class="demo-label">Multi-Column List — 3-Column Grid Inside a Column</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-dropdown-mcl-1" id="tab-dropdown-mcl-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
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
  &lt;div class="nds-dropdown-menu"&gt;
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

            <div class="nds-block" style="margin-top: var(--spacing-3xl);">
                <h3 class="nds-block-title">Data-Driven Dropdowns</h3>
                <p>Pages that use the Jekyll-driven nav (see <code class="nds-inline-code lang-html">_data/mainnav/mainnav.yml</code>) render dropdown content from two includes that map to the layouts above:</p>
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
<section id="headerFeatures" class="nds-content-section nds-demo-section">
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
                    <p class="nds-item-desc">Activates when <code class="nds-inline-code lang-html">.nds-main-nav</code> is on the page. Dropdowns, collapse, overflow detection, and scroll behavior attach automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="nds-icon nds-hgi-smart-phone-01" aria-hidden="true"></i>
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
</section>

<!-- Usage Guidelines -->
<section id="headerGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Place the header at the top of every page. The <a class="nds-color" href="{{ 'ui-shell/topbar' | relative_url }}">top bar</a> sits above the navigation bar, and both are rendered inside a <code class="nds-inline-code lang-html">&lt;header&gt;</code> element.</li>
                    <li>Keep primary nav items between 3 and 8 links. Overflow handling activates automatically, but excessive items reduce usability.</li>
                    <li>Use dropdown menus for grouping related pages under a single primary nav item. Organize content into columns using <code class="nds-inline-code lang-html">nds-colView</code> for category-based layouts or <code class="nds-inline-code lang-html">nds-rowView</code> for flat lists.</li>
                    <li>Reserve the secondary nav for utility actions: search, language toggle, user profile, notifications. These persist across all breakpoints as icon-only buttons on smaller screens.</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-CTA</code> on a nav item to visually highlight a primary call-to-action button in the navigation bar.</li>
                    <li>Do not use the main navigation for in-page section links. Use <a class="nds-color" href="{{ 'components/tabs' | relative_url }}">Tabs</a> for switching between content panels on the same page, or anchor links within the page body.</li>
                    <li>Do not place critical actions only inside dropdown menus. Users on mobile may not discover them. Promote key actions to the primary or secondary nav level.</li>
                    <li>Do not add more than one level of dropdown nesting. The component supports single-level dropdowns only.</li>
                    <li>Set the brand logo dimensions explicitly with <code class="nds-inline-code lang-html">width</code> and <code class="nds-inline-code lang-html">height</code> attributes to prevent layout shift during page load.</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-icon-only</code> on secondary nav items that should display as icon buttons. Labels are automatically hidden on smaller screens for non-CTA items.</li>
                    <li>Mark nav items that must remain visible at all breakpoints with <code class="nds-inline-code lang-html">nds-PAB</code>. These items automatically move to the minimal nav bar on small screens and return to their original position on wider viewports.</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Element</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-dropdown</code></td><td>nav-item</td><td>Enables dropdown menu behavior</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-CTA</code></td><td>nav-item</td><td>Styles the item as a call-to-action button</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-icon-only</code></td><td>nav-item</td><td>Displays as icon button, hides label</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-PAB</code></td><td>nav-item</td><td>Persistent action button that relocates to the minimal nav bar on small screens</td></tr>
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
                        <tr><td><code class="nds-inline-code lang-html">data-state="current"</code></td><td>nav-link</td><td>Marks the active page in the navigation</td></tr>
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

            <div class="nds-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The header initializes automatically when <code class="nds-inline-code lang-html">.nds-main-nav</code> exists on the page. It is priority 1 in the loader (first to initialize). Toggle functions are exposed globally on <code class="nds-inline-code lang-js">window</code> for use in HTML <code class="nds-inline-code lang-html">onclick</code> attributes.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Toggle Functions ─────────────────────────
// All three are on `window` so they can be called
// from inline onclick handlers or external scripts.

// Toggle the mobile hamburger collapse.
// Opens the collapse panel if closed, closes it if open.
// Queues the action if an animation is already running.
window.toggleNavbar();

// Toggle a dropdown menu.
// Pass the native click event from the trigger element.
// The function finds the closest .nds-dropdown ancestor,
// closes any other open dropdown first, then opens the target.
window.toggleDropdown(event);

// ── Re-initialize ────────────────────────────
// Call after dynamically adding or removing nav items.
// Re-runs layout calculations, overflow detection,
// responsive breakpoint checks, and PAB placement.
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
