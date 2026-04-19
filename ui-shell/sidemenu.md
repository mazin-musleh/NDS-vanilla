---
layout: page
title: Side Menu
hero_title: Side Menu - National Design System
hero_description: A persistent sidebar for navigating sections and pages within a site, with collapsible accordion groups, responsive slide-in and top dropdown modes, and active page tracking.
breadcrumb: [["UI Shell", "/ui-shell"]]
lang: en
direction: ltr
---

<!-- Side Menu Structure -->
<section id="sideNavStructure" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Side Menu Structure</h2>
            <p class="nds-section-description">The side menu sits inside the content layout wrapper alongside the main content area. It uses the drawer component internally for scrollable, collapsible list navigation.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Component Tree</div>
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
aside.nds-sidemenu
&#9500;&#9472;&#9472; button.nds-sidemenu-toggle.nds-btn.nds-peek
&#9474;   &#9500;&#9472;&#9472; i.hgi.hgi-stroke.hgi-menu-02.nds-icon
&#9474;   &#9492;&#9472;&#9472; span.nds-label.nds-truncate (toggle label, hidden on desktop)
&#9474;
&#9492;&#9472;&#9472; nav.nds-drawer.nds-divided.nds-full-height
    &#9492;&#9472;&#9472; div.nds-scroll-more.nds-divided
        &#9500;&#9472;&#9472; ul.nds-drawer-list.nds-scroll-more-content
        &#9474;   &#9500;&#9472;&#9472; li (flat link)
        &#9474;   &#9474;   &#9492;&#9472;&#9472; a.nds-btn.nds-subtle.nds-indicator
        &#9474;   &#9474;       &#9492;&#9472;&#9472; span.nds-label
        &#9474;   &#9492;&#9472;&#9472; li (accordion group)
        &#9474;       &#9500;&#9472;&#9472; button.nds-btn.nds-subtle.nds-menu-btn.nds-indicator
        &#9474;       &#9474;   &#9492;&#9472;&#9472; span.nds-label
        &#9474;       &#9492;&#9472;&#9472; ul (submenu)
        &#9474;           &#9492;&#9472;&#9472; li
        &#9474;               &#9492;&#9472;&#9472; a.nds-btn.nds-subtle.nds-indicator
        &#9474;                   &#9492;&#9472;&#9472; span.nds-label
        &#9492;&#9472;&#9472; button.nds-show-more.nds-btn.nds-subtle
            &#9492;&#9472;&#9472; i.hgi.hgi-stroke.hgi-arrow-down-01
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Default Side Menu -->
<section id="sideNavDefault" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Default Side Menu</h2>
            <p class="nds-section-description">The standard sidebar layout with flat links and collapsible accordion groups. On desktop it stays fixed beside the content. On tablet and mobile it slides in from the edge with a toggle button.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Side Menu with Accordion Groups</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-sidenav-default-1" id="tab-sidenav-default-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-sidenav-default-1" aria-labelledby="tab-sidenav-default-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;aside class="nds-sidemenu" aria-label="Sidebar"&gt;
  &lt;button class="nds-sidemenu-toggle nds-btn nds-peek" aria-label="Sidebar Menu" hidden&gt;
    &lt;i class="nds-icon nds-hgi-menu-02" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;span class="nds-label nds-truncate" hidden&gt;Side menu&lt;/span&gt;
  &lt;/button&gt;
  &lt;nav class="nds-drawer nds-divided nds-full-height" hidden&gt;
    &lt;div class="nds-scroll-more nds-divided"&gt;
      &lt;ul class="nds-drawer-list nds-scroll-more-content"&gt;
        &lt;!-- Flat link --&gt;
        &lt;li data-state="active"&gt;
          &lt;a class="nds-btn nds-subtle nds-indicator" href="/"&gt;
            &lt;span class="nds-label"&gt;Home&lt;/span&gt;
          &lt;/a&gt;
        &lt;/li&gt;
        &lt;!-- Accordion group --&gt;
        &lt;li&gt;
          &lt;button class="nds-btn nds-subtle nds-indicator" aria-expanded="false"&gt;
            &lt;span class="nds-label"&gt;Components&lt;/span&gt;
          &lt;/button&gt;
          &lt;ul&gt;
            &lt;li&gt;
              &lt;a class="nds-btn nds-subtle nds-indicator" href="/components/accordion.html"&gt;
                &lt;span class="nds-label"&gt;Accordion&lt;/span&gt;
              &lt;/a&gt;
            &lt;/li&gt;
            &lt;li&gt;
              &lt;a class="nds-btn nds-subtle nds-indicator" href="/components/alert.html"&gt;
                &lt;span class="nds-label"&gt;Alert&lt;/span&gt;
              &lt;/a&gt;
            &lt;/li&gt;
            &lt;li&gt;
              &lt;a class="nds-btn nds-subtle nds-indicator" href="/components/button.html"&gt;
                &lt;span class="nds-label"&gt;Buttons&lt;/span&gt;
              &lt;/a&gt;
            &lt;/li&gt;
          &lt;/ul&gt;
        &lt;/li&gt;
        &lt;!-- Another accordion group --&gt;
        &lt;li&gt;
          &lt;button class="nds-btn nds-subtle nds-indicator" aria-expanded="false"&gt;
            &lt;span class="nds-label"&gt;Layout&lt;/span&gt;
          &lt;/button&gt;
          &lt;ul&gt;
            &lt;li&gt;
              &lt;a class="nds-btn nds-subtle nds-indicator" href="/layout/grid.html"&gt;
                &lt;span class="nds-label"&gt;Grid&lt;/span&gt;
              &lt;/a&gt;
            &lt;/li&gt;
            &lt;li&gt;
              &lt;a class="nds-btn nds-subtle nds-indicator" href="/layout/section.html"&gt;
                &lt;span class="nds-label"&gt;Section&lt;/span&gt;
              &lt;/a&gt;
            &lt;/li&gt;
          &lt;/ul&gt;
        &lt;/li&gt;
      &lt;/ul&gt;
      &lt;button class="nds-show-more nds-btn nds-subtle"&gt;
        &lt;i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/button&gt;
    &lt;/div&gt;
  &lt;/nav&gt;
&lt;/aside&gt;
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

<!-- Responsive Modes -->
<section id="sideNavModes" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Modes</h2>
            <p class="nds-section-description">On screens below 960px the side menu switches from a persistent sidebar to one of two mobile-friendly patterns, controlled by the layout wrapper class.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Responsive Mode</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <button class="nds-btn nds-primary nds-lg" id="toggleTopSideMenu">
                                <span class="nds-label">Toggle Top Submenu Mode</span>
                            </button>
                            <div class="nds-alert nds-card nds-inline" data-status="info" role="alert" style="margin-top: var(--spacing-md);">
                                <span class="nds-feedback nds-alert-icon">
                                    <span class="nds-feedback-icon">
                                        <i class="nds-icon" aria-hidden="true"></i>
                                    </span>
                                </span>
                                <div class="nds-alert-content">
                                    <div class="nds-alert-text">
                                        <p class="nds-alert-description" id="topSideMenuStatus">Current mode: <strong>Slider</strong> (default). Resize the viewport below 960px to see the side menu behavior.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-sidemenu-modes-1" id="tab-sidemenu-modes-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-sidemenu-modes-1" aria-labelledby="tab-sidemenu-modes-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;!-- Add nds-top to the sidemenu to switch from slider to top dropdown mode --&gt;
&lt;aside class="nds-sidemenu nds-top" aria-label="Sidebar"&gt;...&lt;/aside&gt;
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script>
                document.getElementById('toggleTopSideMenu').addEventListener('click', function() {
                    var menu = document.querySelector('.nds-sidemenu');
                    var status = document.getElementById('topSideMenuStatus');
                    if (!menu) return;
                    menu.classList.toggle('nds-top');
                    var isTop = menu.classList.contains('nds-top');
                    status.innerHTML = 'Current mode: <strong>' + (isTop ? 'Top Submenu' : 'Slider') + '</strong>' + (isTop ? '' : ' (default)') + '. Resize the viewport below 960px to see the side menu behavior.';
                    NDS.Sidemenu.init();
                });
            </script>
            <div class="nds-content-block" style="margin-top: var(--spacing-3xl);">
                <h3 class="nds-block-title">Mode Comparison</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Mode</th><th>Class / Front Matter</th><th>Mobile Behavior</th><th>Best For</th></tr></thead>
                    <tbody>
                        <tr>
                            <td>Slider</td>
                            <td>(none, default)</td>
                            <td>Fixed panel slides in from the edge with a floating toggle button. Body scroll is not locked.</td>
                            <td>Long navigation lists where users may need to scroll the menu independently</td>
                        </tr>
                        <tr>
                            <td>Top Submenu</td>
                            <td><code class="nds-inline-code lang-html">nds-top</code></td>
                            <td>Full-width bar with the active page label. Tapping it drops the drawer down from below the header. Body scroll is locked.</td>
                            <td>Short navigation lists or content-heavy pages where edge slide-in would feel intrusive</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- Active State -->
<section id="sideNavActiveState" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Active Page Tracking</h2>
            <p class="nds-section-description">Mark the current page by adding <code class="nds-inline-code lang-html">data-state="active"</code> to its <code class="nds-inline-code lang-html">&lt;li&gt;</code> element. The JS automatically expands all parent accordion groups so the active item is visible on load.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Active Item in a Nested Group</div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-sidenav-active-1" id="tab-sidenav-active-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-sidenav-active-1" aria-labelledby="tab-sidenav-active-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;ul class="nds-drawer-list"&gt;
  &lt;li&gt;
    &lt;button class="nds-btn nds-subtle nds-indicator" aria-expanded="false"&gt;
      &lt;span class="nds-label"&gt;Components&lt;/span&gt;
    &lt;/button&gt;
    &lt;ul&gt;
      &lt;li&gt;
        &lt;a class="nds-btn nds-subtle nds-indicator" href="/components/accordion.html"&gt;
          &lt;span class="nds-label"&gt;Accordion&lt;/span&gt;
        &lt;/a&gt;
      &lt;/li&gt;
      &lt;!-- Active item: parent group auto-expands on init --&gt;
      &lt;li data-state="active"&gt;
        &lt;a class="nds-btn nds-subtle nds-indicator" href="/components/alert.html"&gt;
          &lt;span class="nds-label"&gt;Alert&lt;/span&gt;
        &lt;/a&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
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
</section>

<!-- Built-in Features -->
<section id="sideNavFeatures" class="nds-content-section">
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
                    <p class="nds-item-desc">Activates when <code class="nds-inline-code lang-html">.nds-sidemenu</code> is on the page. Toggle button, close-on-click-outside, and Escape key handling all attach automatically. Accordion behavior is provided by the <a class="nds-color" href="{{ 'components/drawer' | relative_url }}">Drawer</a> component.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-target-01"></i>
                        <span class="nds-label">Active Page Tracking</span>
                    </span>
                    <p class="nds-item-desc">Set <code class="nds-inline-code lang-html">data-state="active"</code> on a menu item and all parent accordion groups expand on load so the current page is always visible.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-04"></i>
                        <span class="nds-label">Dual Responsive Modes</span>
                    </span>
                    <p class="nds-item-desc">Choose between a slide-in sidebar panel or a top dropdown bar for mobile. Switch modes by adding <code class="nds-inline-code lang-html">nds-top</code> to the sidemenu or setting <code class="nds-inline-code lang-html">sidemenu_mode: top</code> in front matter.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="nds-icon nds-hgi-menu-02" aria-hidden="true"></i>
                        <span class="nds-label">Animated Accordion Groups</span>
                    </span>
                    <p class="nds-item-desc">Nested groups expand and collapse with smooth height transitions. Opening one group automatically closes its siblings.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-cursor-02"></i>
                        <span class="nds-label">Peek Toggle Button</span>
                    </span>
                    <p class="nds-item-desc">The floating toggle button reveals itself briefly on page load and reappears as the cursor approaches, giving users a visual hint without obstructing content.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-api"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Call <code class="nds-inline-code lang-js">NDS.Sidemenu.init()</code> to re-initialize after dynamic content changes or SPA route transitions.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="sideNavGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use the side menu for sites with <strong>hierarchical page structures</strong> where users need to jump between sections: documentation, admin consoles, multi-step workflows</li>
                    <li>Use the side menu alongside the <a class="nds-color" href="{{ 'ui-shell/header' | relative_url }}">Header</a> for primary navigation. The header handles global actions and top-level links while the side menu handles section-level navigation</li>
                    <li>Choose <strong>top submenu mode</strong> (<code class="nds-inline-code lang-html">nds-top</code>) when the navigation list is short (under 10 items) or the content area needs full viewport width on mobile</li>
                    <li>Choose <strong>slider mode</strong> (default) for longer navigation trees or when users frequently switch between pages and benefit from a persistent, independently scrollable menu</li>
                    <li>Do not use the side menu for simple linear flows or single-page sites. Use <a class="nds-color" href="{{ 'components/stepper' | relative_url }}">Stepper</a> for sequential processes or <a class="nds-color" href="{{ 'components/tabs' | relative_url }}">Tabs</a> for switching between views on the same page</li>
                    <li>Keep accordion groups to <strong>two levels</strong> of nesting. Deeper hierarchies are harder to scan and navigate on mobile</li>
                    <li>Always set <code class="nds-inline-code lang-html">data-state="active"</code> on the current page's <code class="nds-inline-code lang-html">&lt;li&gt;</code> so users can orient themselves</li>
                    <li>Group related pages under a single accordion parent with a clear category label. Avoid mixing unrelated items in the same group</li>
                    <li>Add <code class="nds-inline-code lang-html">nds-cardView</code> to the layout wrapper when the page design calls for rounded, card-like containers. This applies border-radius to the sidebar</li>
                    <li>Hide the side menu entirely with <code class="nds-inline-code lang-html">sidemenu_mode: false</code> in front matter on pages that do not need section navigation (landing pages, full-width dashboards)</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Applied To</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-top</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-sidemenu</code></td>
                            <td>Switches mobile behavior from slide-in sidebar to top dropdown bar</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-cardView</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-content-layout</code></td>
                            <td>Adds border-radius to the sidebar for a card-like appearance</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-peek</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-sidemenu-toggle</code></td>
                            <td>Enables the proximity-aware peek animation on the toggle button</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-divided</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-drawer</code></td>
                            <td>Adds separator lines between menu items (from the drawer component)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-full-height</code></td>
                            <td><code class="nds-inline-code lang-html">.nds-drawer</code></td>
                            <td>Stretches the drawer to fill the sidebar height</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-state="active"</code></td>
                            <td>Set on <code class="nds-inline-code lang-html">&lt;li&gt;</code> to mark the current page. Parent accordion groups expand automatically on initialization.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-state="open"</code></td>
                            <td>Managed by JS on accordion groups and the sidebar itself. Indicates the element is expanded or visible.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">aria-expanded</code></td>
                            <td>Set on accordion group buttons. Updated automatically by JS when groups expand or collapse.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--nds-sidemenu-width</code></td>
                            <td>Set in variables</td>
                            <td>Width of the sidebar panel</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--drawer-max-height</code></td>
                            <td><code class="nds-inline-code lang-html">calc(100svh - nav - spacing)</code></td>
                            <td>Maximum height of the drawer before scroll overflow activates. Recalculated dynamically in slider mode.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--toggle-height</code></td>
                            <td><code class="nds-inline-code lang-html">40px</code></td>
                            <td>Height of the toggle button</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--toggle-pos</code></td>
                            <td><code class="nds-inline-code lang-html">40svh</code></td>
                            <td>Vertical position of the floating toggle button in slider mode</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Sidemenu</strong> namespace exposes a single initialization method. The component auto-initializes when <code class="nds-inline-code lang-html">.nds-sidemenu</code> is present on the page, but you can call <code class="nds-inline-code lang-js">init()</code> manually after dynamic content changes.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript line-numbers">
// ── Initialization ──────────────────────────────────
// Auto-runs on page load via nds-loader when .nds-sidemenu exists.
// Call manually after injecting a new sidemenu into the DOM:
NDS.Sidemenu.init();

// ── What init() sets up ─────────────────────────────
// - Toggle button: shown on tablet/mobile, opens/closes
//   the sidebar with backdrop overlay
// - Close triggers: click outside, Escape key, or
//   viewport width change all close the menu
// - Peek behavior: the toggle button flashes on load
//   and reappears when the cursor moves near it
//
// Accordion toggle and active state expansion are handled
// by the drawer component (NDS.Drawer) automatically.

// ── Backdrop integration ────────────────────────────
// Uses NDS.Backdrop.show() / .hide() for the overlay.
// In slider mode, body scroll remains unlocked.
// In top submenu mode, body scroll locks while open.

// ── Drawer overflow ─────────────────────────────────
// Handled automatically by the .nds-scroll-more wrapper
// inside the drawer (shows/hides the "show more" button
// and edge mask-fade via its own ResizeObserver).
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
