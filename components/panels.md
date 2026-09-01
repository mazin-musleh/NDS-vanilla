---
layout: page
title: Panels
hero_title: Panels - National Design System
hero_description: A content-agnostic surface that slides in from any edge of the viewport, for settings, filters, details, or any secondary content you want to reveal on demand without leaving the page.
breadcrumb: [["Components", "/components"]]
since: "1.5.0"
updated: "1.10.x"
last_edit: "01/09/2026 - 09:40 PM"
lang: en
direction: ltr
---

<!-- Slide-in Panel -->
<section id="panelOverview" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Slide-in Panel</h2>
            <p class="nds-section-description">A trigger opens the panel from the chosen edge. Change the side, then add a backdrop with Modal or block dismissal with Static. Panel content is yours: header, body, and footer are all optional.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Side: ">
                                        <span class="nds-label">Side: End</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                                data-toggler='["data-panel-side=end", ".nds-panel", "panelSide", "attr"]' data-trigger-label="End">
                                                <span class="nds-label">End (logical)</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["data-panel-side=start", ".nds-panel", "panelSide", "attr"]' data-trigger-label="Start">
                                                <span class="nds-label">Start (logical)</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["data-panel-side=left", ".nds-panel", "panelSide", "attr"]' data-trigger-label="Left">
                                                <span class="nds-label">Left (physical)</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["data-panel-side=right", ".nds-panel", "panelSide", "attr"]' data-trigger-label="Right">
                                                <span class="nds-label">Right (physical)</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["data-panel-modal", ".nds-panel", "panelModal", "attr"]'>
                                    <span class="nds-label">Modal</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["data-panel-static", ".nds-panel", "panelStatic", "attr"]'>
                                    <span class="nds-label">Static</span>
                                </button>
                            </div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <button class="nds-btn nds-primary nds-lg" data-panel-toggle="panel-side-demo">
                                    <span class="nds-label">Open Panel</span>
                                </button>
                                <aside id="panel-side-demo" class="nds-panel" data-panel-side="end" aria-label="Settings panel" hidden>
                                    <div class="nds-panel-header">
                                        <span class="nds-featured-icon nds-circle">
                                            <i class="hgi hgi-stroke hgi-stars"></i>
                                        </span>
                                        <div class="nds-panel-text">
                                            <span class="nds-panel-title">Settings</span>
                                            <p class="nds-panel-description">Adjust how this page behaves.</p>
                                        </div>
                                        <button class="nds-btn nds-subtle nds-icon-only" type="button" data-panel-close aria-label="Close panel">
                                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div class="nds-panel-body">
                                        <div class="nds-content-placeholder">
                                            <span>Swap with content component</span>
                                            <span>استبدل هذا العنصر بأي عنصر آخر</span>
                                        </div>
                                    </div>
                                    <div class="nds-panel-footer">
                                        <button class="nds-btn nds-primary nds-full" type="button" data-panel-close>
                                            <span class="nds-label">Done</span>
                                        </button>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-panel-side-1" id="tab-panel-side-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-panel-side-1"
                                        aria-labelledby="tab-panel-side-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;button class="nds-btn nds-primary nds-lg" data-panel-toggle="settings-panel"&gt;
  &lt;span class="nds-label"&gt;Open Panel&lt;/span&gt;
&lt;/button&gt;

&lt;aside id="settings-panel" class="nds-panel" data-panel-side="end" aria-label="Settings panel" hidden&gt;
  &lt;div class="nds-panel-header"&gt;
    &lt;span class="nds-featured-icon nds-circle"&gt;
      &lt;i class="hgi hgi-stroke hgi-stars"&gt;&lt;/i&gt;
    &lt;/span&gt;
    &lt;div class="nds-panel-text"&gt;
      &lt;span class="nds-panel-title"&gt;Settings&lt;/span&gt;
      &lt;p class="nds-panel-description"&gt;Adjust how this page behaves.&lt;/p&gt;
    &lt;/div&gt;
    &lt;button class="nds-btn nds-subtle nds-icon-only" type="button" data-panel-close aria-label="Close panel"&gt;
      &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="nds-panel-body"&gt;
    &lt;p&gt;Panel content lives here.&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="nds-panel-footer"&gt;
    &lt;button class="nds-btn nds-primary nds-full" type="button" data-panel-close&gt;
      &lt;span class="nds-label"&gt;Done&lt;/span&gt;
    &lt;/button&gt;
  &lt;/div&gt;
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
    </div>
</section>

<!-- Sheets -->
<section id="panelSheets" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Sheets</h2>
            <p class="nds-section-description">A full-width surface that slides from the top or bottom edge. It fits its content up to <code class="nds-inline-code lang-html">--panel-height</code>, and a tall sheet is capped so it never covers the sticky header.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-block">
                <div class="nds-showcase">
                    <div class="nds-demo-card">
                        <div class="demo-header">
                            <div class="demo-action">
                                <div class="nds-dropmenu demo-toggle-menu">
                                    <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Side: ">
                                        <span class="nds-label">Side: Bottom</span>
                                    </button>
                                    <div class="nds-dropmenu-menu" hidden>
                                        <div class="nds-dropmenu-scroll">
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                                data-toggler='["data-panel-side=bottom", ".nds-panel", "sheetSide", "attr"]' data-trigger-label="Bottom">
                                                <span class="nds-label">Bottom</span>
                                            </button>
                                            <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                                data-toggler='["data-panel-side=top", ".nds-panel", "sheetSide", "attr"]' data-trigger-label="Top">
                                                <span class="nds-label">Top</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["data-panel-modal", ".nds-panel", "sheetModal", "attr"]'>
                                    <span class="nds-label">Modal</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["data-panel-static", ".nds-panel", "sheetStatic", "attr"]'>
                                    <span class="nds-label">Static</span>
                                </button>
                                <button class="nds-btn nds-subtle demo-toggle-btn"
                                    data-toggler='["--panel-content-width:100%", ".nds-panel", "sheetFull", "style"]'>
                                    <span class="nds-label">Full width</span>
                                </button>
                            </div>
                        </div>
                        <div class="demo-container">
                            <div class="state-demo">
                                <button class="nds-btn nds-primary nds-lg" data-panel-toggle="panel-sheet-demo">
                                    <span class="nds-label">Open Sheet</span>
                                </button>
                                <aside id="panel-sheet-demo" class="nds-panel" data-panel-side="bottom"
                                    aria-label="Details sheet" hidden>
                                    <div class="nds-panel-header">
                                        <span class="nds-featured-icon nds-circle">
                                            <i class="hgi hgi-stroke hgi-stars"></i>
                                        </span>
                                        <div class="nds-panel-text">
                                            <span class="nds-panel-title">Details</span>
                                            <p class="nds-panel-description">A closer look at the selected item.</p>
                                        </div>
                                        <button class="nds-btn nds-subtle nds-icon-only" type="button" data-panel-close aria-label="Close sheet">
                                            <i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                    <div class="nds-panel-body">
                                        <div class="nds-content-placeholder">
                                            <span>Swap with content component</span>
                                            <span>استبدل هذا العنصر بأي عنصر آخر</span>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div class="demo-code">
                            <div class="nds-tabs nds-code nds-divided">
                                <div class="nds-tab-list-container nds-scroll-more">
                                    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Tab navigation">
                                        <button class="nds-btn nds-subtle nds-tab" type="button" role="tab" aria-selected="true"
                                            aria-controls="panel-panel-sheet-1" id="tab-panel-sheet-1">
                                            <span class="nds-tab-label">HTML</span>
                                        </button>
                                    </nav>
                                    <button class="nds-btn nds-subtle nds-tab nds-show-more" type="button" aria-label="Show more"><i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-tab-content">
                                    <div class="nds-tab-panel code-example" role="tabpanel" id="panel-panel-sheet-1"
                                        aria-labelledby="tab-panel-sheet-1">
                                        <div class="nds-code-action">
                                            <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                                <i class="nds-icon nds-hgi-copy-01"></i>
                                            </button>
                                        </div>
                                        <code class="lang-html code">
&lt;button class="nds-btn nds-primary nds-lg" data-panel-toggle="details-sheet"&gt;
  &lt;span class="nds-label"&gt;Open Sheet&lt;/span&gt;
&lt;/button&gt;

&lt;aside id="details-sheet" class="nds-panel" data-panel-side="bottom"
       aria-label="Details sheet" hidden&gt;
  &lt;div class="nds-panel-header"&gt;
    &lt;span class="nds-featured-icon nds-circle"&gt;
      &lt;i class="hgi hgi-stroke hgi-stars"&gt;&lt;/i&gt;
    &lt;/span&gt;
    &lt;div class="nds-panel-text"&gt;
      &lt;span class="nds-panel-title"&gt;Details&lt;/span&gt;
      &lt;p class="nds-panel-description"&gt;A closer look at the selected item.&lt;/p&gt;
    &lt;/div&gt;
    &lt;button class="nds-btn nds-subtle nds-icon-only" type="button" data-panel-close aria-label="Close sheet"&gt;
      &lt;i class="nds-icon nds-hgi-cancel-01" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="nds-panel-body"&gt;
    &lt;p&gt;A bottom sheet is a good fit for mobile actions or a compact form.&lt;/p&gt;
  &lt;/div&gt;
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

<!-- Built-in Features -->
<section id="panelFeatures" class="nds-content-section nds-demo-section">
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
                        <p class="nds-item-desc">Activates when a .nds-panel is on the page. Toggle and close buttons wire up from data attributes with no init call.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-sidebar-right"></i>
                            <span class="nds-label">Six Slide Directions</span>
                        </span>
                        <p class="nds-item-desc">Slides in from the inline start or end, the physical left or right, or as a full-width top or bottom sheet.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-layers-01"></i>
                            <span class="nds-label">Optional Modal Mode</span>
                        </span>
                        <p class="nds-item-desc">Add data-panel-modal for a dimming backdrop and scroll lock; leave it off and the page behind stays fully interactive.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-keyboard"></i>
                            <span class="nds-label">Focus Management</span>
                        </span>
                        <p class="nds-item-desc">Focus moves into the panel on open and returns to the trigger on close. Escape and outside clicks dismiss it unless data-panel-static is set.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-transition-left"></i>
                            <span class="nds-label">One Panel at a Time</span>
                        </span>
                        <p class="nds-item-desc">Opening a panel closes any other first and waits for it to finish sliding out, so two panels never overlap.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-anchor-point"></i>
                            <span class="nds-label">Header-Aware Positioning</span>
                        </span>
                        <p class="nds-item-desc">Side panels sit below the sticky header and track it as the topbar scrolls in and out; tall sheets cap their height to match.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-arrow-all-direction"></i>
                            <span class="nds-label">Direction-Aware</span>
                        </span>
                        <p class="nds-item-desc">Logical start and end sides flip with text direction in RTL and LTR; physical left and right stay on the same edge.</p>
                    </div>
                    <div class="nds-definition-item">
                        <span class="nds-item-title">
                            <i class="hgi hgi-stroke hgi-api"></i>
                            <span class="nds-label">Programmatic Control</span>
                        </span>
                        <p class="nds-item-desc">Open, close, toggle, and query any panel through the JS API, and react to the opened and closed events it dispatches.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="panelGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use a <strong>panel</strong> for secondary content the user reveals on demand: settings, filters, a details view, or a form that supports the main task without replacing it</li>
                    <li>Keep the default non-modal (no <code class="nds-inline-code lang-html">data-panel-modal</code>) when users benefit from seeing the panel affect live content, such as filter or accessibility controls</li>
                    <li>Add <code class="nds-inline-code lang-html">data-panel-modal</code> when the panel demands a decision and the page behind it should be inert, for example a checkout step or a destructive confirmation with detail</li>
                    <li>Do not use a panel for a short blocking confirmation with no extra content. Use a <a class="nds-color" href="{{ 'components/modal' | relative_url }}">Modal</a> instead</li>
                    <li>Do not use a panel for primary site navigation. Use the <a class="nds-color" href="{{ 'components/drawer' | relative_url }}">Drawer</a> or <a class="nds-color" href="{{ 'components/sidemenu' | relative_url }}">Sidemenu</a></li>
                    <li>Prefer logical <code class="nds-inline-code lang-html">start</code> and <code class="nds-inline-code lang-html">end</code> sides so the panel follows reading direction. Reserve <code class="nds-inline-code lang-html">left</code> and <code class="nds-inline-code lang-html">right</code> for cases that must anchor to a physical edge regardless of language</li>
                    <li>Choose a <code class="nds-inline-code lang-html">bottom</code> sheet for mobile-first actions and a side panel for desktop-oriented settings or filters</li>
                    <li>Add <code class="nds-inline-code lang-html">data-panel-static</code> to a panel holding an unsaved form so a stray Escape or outside click cannot discard the user's work</li>
                    <li>Header, body, and footer are all optional. Drop content straight into <code class="nds-inline-code lang-html">.nds-panel-body</code>, or swap it for an <a class="nds-color" href="{{ 'components/scroll-more' | relative_url }}">Scroll More</a> wrapper for long scrolling content with fade edges</li>
                    <li>Keep the header's title inside <code class="nds-inline-code lang-html">.nds-panel-text</code>, the same title-plus-description pairing <a class="nds-color" href="{{ 'components/cards' | relative_url }}">Cards</a> use. Add a <code class="nds-inline-code lang-html">.nds-panel-description</code> beside the title when the panel needs a subtitle, and drop the wrapper only for a bare title: it still fills the row on its own, so a leading icon and the close button stay where they are</li>
                    <li>Set <code class="nds-inline-code lang-html">--panel-content-width: 100%</code> on a sheet whose content should span the full width (a media row, a wide table) instead of capping to the page max-width</li>
                    <li>Ship the panel with the <code class="nds-inline-code lang-html">hidden</code> attribute so it never flashes before the script loads</li>
                    <li>To keep a panel out of the DOM until first open, wrap the aside in <code class="nds-inline-code lang-html">&lt;template class="nds-panel-template"&gt;</code>. The toggle stays outside the template. The markup joins the page on the first click, and the components inside it wire themselves. One panel per template. The <a class="nds-color" href="{{ 'components/accessibility' | relative_url }}">Accessibility</a> panel ships this way</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-panel-side</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-panel</code> to pick the edge. Values: <code class="nds-inline-code lang-html">end</code> (default) or <code class="nds-inline-code lang-html">start</code> (logical, flip with direction); <code class="nds-inline-code lang-html">left</code> or <code class="nds-inline-code lang-html">right</code> (physical); <code class="nds-inline-code lang-html">top</code> or <code class="nds-inline-code lang-html">bottom</code> (full-width sheet)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-panel-toggle</code></td><td>Set on any button, anywhere on the page, with the target panel's <code class="nds-inline-code lang-html">id</code> as its value. Clicking it opens or closes that panel</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-panel-close</code></td><td>Set on any element inside the panel to make it a close control</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-panel-modal</code></td><td>Present on <code class="nds-inline-code lang-html">.nds-panel</code> to add a dimming backdrop, a scroll lock, and a focus trap. Omit for a non-blocking disclosure</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-panel-static</code></td><td>Present on <code class="nds-inline-code lang-html">.nds-panel</code> to disable both Escape and outside-click dismissal. A close button and a swap to another panel still work</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--panel-width</code></td><td><code class="nds-inline-code lang-html">min(420px, 100vw)</code></td><td>Width of an inline side panel (start, end, left, right)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--panel-height</code></td><td><code class="nds-inline-code lang-html">60svh</code></td><td>Maximum height of a top or bottom sheet. The sheet fits its content up to this, and is capped so it never covers the header</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--panel-content-width</code></td><td><code class="nds-inline-code lang-html">--nds-content-MaxWidth</code></td><td>Max width of a top or bottom sheet's content, centered within the full-bleed sheet and aligned to the page gutter on narrower screens. Set to <code class="nds-inline-code lang-html">100%</code> for full-width content</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--panel-top</code></td><td>sticky header bottom</td><td>Block-start offset. Set it to override the automatic header tracking with a fixed value</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--panel-padding</code></td><td><code class="nds-inline-code lang-html">--spacing-lg</code></td><td>Padding of the header, body, and footer</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--panel-gap</code></td><td><code class="nds-inline-code lang-html">0</code></td><td>Gap between the panel's header, body and footer</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--panel-radius</code></td><td><code class="nds-inline-code lang-html">0</code>, <code class="nds-inline-code lang-html">--radius-lg</code> for sheets</td><td>Corner radius of the panel surface. Top and bottom sheets round the two corners facing the page at the modal radius</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--panel-z</code></td><td><code class="nds-inline-code lang-html">999</code></td><td>Stacking order of the panel</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block nds-prose">
                <h3 class="nds-block-title">JavaScript API</h3>
                <p>The <strong>NDS.Panel</strong> API opens, closes, and toggles panels programmatically. Every method accepts a panel element or its <code class="nds-inline-code lang-js">id</code> string. Toggle and close buttons work from markup alone, so most pages never touch this API.</p>
                <div class="nds-code nds-expandable">
                    <div class="nds-code-action">
                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                            <i class="nds-icon nds-hgi-copy-01"></i>
                        </button>
                    </div>
                    <div class="nds-expandable-content">
                        <code class="lang-javascript">
// ── Open / close / toggle ────────────────────────────
// Accepts a panel element or its id string
NDS.Panel.open('settings-panel');
NDS.Panel.close('settings-panel');
NDS.Panel.toggle('settings-panel');

// ── Query ────────────────────────────────────────────
NDS.Panel.isOpen('settings-panel');   // → true | false

// ── Events (bubble from the panel element) ───────────
const panel = document.getElementById('settings-panel');
panel.addEventListener('nds:panel:opened', (e) =&gt; {
    console.log('opened', e.detail.panel);
});
panel.addEventListener('nds:panel:closed', (e) =&gt; {
    console.log('closed', e.detail.panel);
});
// During a swap, the outgoing panel's closed event fires
// before the incoming panel's opened event.

// ── Lifecycle (for dynamically added panels) ─────────
NDS.Panel.create(panel);    // wire up a single panel element
NDS.Panel.init();           // scan and wire every .nds-panel
NDS.Panel.destroy(panel);   // tear a panel's listeners down
</code>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
