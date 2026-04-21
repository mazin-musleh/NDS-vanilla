---
layout: page
title: Featured Icons
hero_title: Featured Icons - National Design System
hero_description: Colored icon containers that draw attention to features, statuses, and categories across cards, lists, and page sections
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Featured Icons -->
<section id="featuredIconsOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Featured Icons</h2>
            <p class="nds-section-description">Combine a color variant, size, and style to match the context where the icon appears</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Color: ">
                                    <span class="nds-label">Color: Brand</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-featured-icon", "iconColor"]'
                                            data-trigger-label="Brand">
                                            <span class="nds-label">Brand (default)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=success", ".nds-featured-icon", "iconColor", "attr"]'>
                                            <span class="nds-label">Success</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=info", ".nds-featured-icon", "iconColor", "attr"]'>
                                            <span class="nds-label">Info</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=warning", ".nds-featured-icon", "iconColor", "attr"]'>
                                            <span class="nds-label">Warning</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=error", ".nds-featured-icon", "iconColor", "attr"]'>
                                            <span class="nds-label">Error</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["data-status=neutral", ".nds-featured-icon", "iconColor", "attr"]'>
                                            <span class="nds-label">Neutral</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="nds-dropmenu demo-toggle-menu">
                                <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger" data-label-prefix="Size: ">
                                    <span class="nds-label">Size: Medium</span>
                                </button>
                                <div class="nds-dropmenu-menu" hidden>
                                    <div class="nds-dropmenu-scroll">
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-sm", ".nds-featured-icon", "iconSize"]'>
                                            <span class="nds-label">Small (32px)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                            data-toggler='["", ".nds-featured-icon", "iconSize"]'
                                            data-trigger-label="Medium">
                                            <span class="nds-label">Medium (40px)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-lg", ".nds-featured-icon", "iconSize"]'>
                                            <span class="nds-label">Large (48px)</span>
                                        </button>
                                        <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                            data-toggler='["nds-xl", ".nds-featured-icon", "iconSize"]'>
                                            <span class="nds-label">Extra Large (56px)</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-circle", ".nds-featured-icon", "iconShape"]'>
                                <span class="nds-label">Circle</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-outline", ".nds-featured-icon", "iconStyle"]'>
                                <span class="nds-label">Outline</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-dark", ".nds-featured-icon", "iconStyle"]'>
                                <span class="nds-label">Dark</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-noBg", ".demo-container", "containerBg"]'>
                                <span class="nds-label">Remove bg</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <span class="nds-featured-icon">
                                <i class="hgi hgi-stroke hgi-stars"></i>
                            </span>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-featured-icon-1" id="tab-featured-icon-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-featured-icon-1"
                                    aria-labelledby="tab-featured-icon-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;span class="nds-featured-icon"&gt;
  &lt;i class="hgi hgi-stroke hgi-stars"&gt;&lt;/i&gt;
&lt;/span&gt;
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
<section id="featuredIconsFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-colors"></i>
                        <span class="nds-label">Six Color Variants</span>
                    </span>
                    <p class="nds-item-desc">Brand, success, info, warning, error, and neutral. Each sets the background and icon color automatically through design tokens.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-resize-01"></i>
                        <span class="nds-label">Four Sizes</span>
                    </span>
                    <p class="nds-item-desc">From 32px to 56px. Icon and padding scale proportionally through the <code class="nds-inline-code lang-html">--nds-icon-size</code> property.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-square-circle"></i>
                        <span class="nds-label">Shape and Style Modifiers</span>
                    </span>
                    <p class="nds-item-desc">Rounded square by default, with circle, outline, and dark fill options that combine freely with any color and size.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-board"></i>
                        <span class="nds-label">Custom Color Override</span>
                    </span>
                    <p class="nds-item-desc">Set <code class="nds-inline-code lang-html">--icon-bg-color</code> and <code class="nds-inline-code lang-html">--icon-color</code> directly on the element without a variant class to create custom color pairings beyond the built-in variants.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="featuredIconsGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use featured icons to visually anchor key items in <a href="{{ 'components/cards' | relative_url }}">Cards</a>, <a href="{{ 'components/definition-list' | relative_url }}">Definition Lists</a>, and page sections where a plain icon would not stand out enough</li>
                    <li>Use inside <a href="{{ 'components/alert' | relative_url }}">Alerts</a> and <a href="{{ 'components/modal' | relative_url }}">Modals</a> to reinforce the message type with a matching color variant</li>
                    <li>Use as leading icons in <a href="{{ 'components/drawer' | relative_url }}">Drawer</a> navigation items to give each section a distinct visual identity</li>
                    <li>Match the color variant to the meaning: brand for primary actions, success/error/warning for status, info for informational, neutral for general purpose</li>
                    <li>Don't use for decorative icons that carry no meaning. A plain icon without a container is lighter and less visually demanding</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-sm</code> in dense layouts like table rows or sidebar items. Use <code class="nds-inline-code lang-html">nds-lg</code> or <code class="nds-inline-code lang-html">nds-xl</code> for hero sections and landing page features</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-circle</code> when the icon sits next to rounded elements like avatars. Use the default rounded square for card headers and list items</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-dark</code> when the icon needs to stand out on light backgrounds with stronger visual weight. Use <code class="nds-inline-code lang-html">nds-outline</code> for a lighter, secondary treatment</li>
                    <li>Override <code class="nds-inline-code lang-html">--icon-bg-color</code> and <code class="nds-inline-code lang-html">--icon-color</code> directly on the element without a variant class to create custom color pairings beyond the built-in variants</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Color Variants</h3>
                <p>Brand is the default color. Use <code class="nds-inline-code lang-html">data-status</code> to set a status color variant.</p>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><em>none</em></td>
                            <td>Primary brand green (default).</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-status="success"</code></td>
                            <td>Green for positive outcomes and confirmations.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-status="info"</code></td>
                            <td>Blue for informational content and tips.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-status="warning"</code></td>
                            <td>Yellow/amber for cautionary information.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-status="error"</code></td>
                            <td>Red for errors and critical issues.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-status="neutral"</code></td>
                            <td>Gray for general purpose and default states.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
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
                            <td>Small size, 32px. For dense layouts and secondary features.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-md</code></td>
                            <td>Medium size, 40px. Default when no size is specified.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-lg</code></td>
                            <td>Large size, 48px. For prominent features and section headers.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-xl</code></td>
                            <td>Extra large, 56px. For hero sections and landing page features.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-circle</code></td>
                            <td>Fully rounded shape instead of the default rounded square.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-outline</code></td>
                            <td>Transparent background with a colored border. Lighter visual weight.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">nds-dark</code></td>
                            <td>Solid filled background with white icon. Stronger visual weight for emphasis.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--icon-bg-color</code></td>
                            <td>Override the background color. Set on the element or a parent to create custom color pairings.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--icon-color</code></td>
                            <td>Override the icon color. Pair with <code class="nds-inline-code lang-html">--icon-bg-color</code> for full control.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--nds-icon-size</code></td>
                            <td>Override the container size in pixels. Icon and padding scale proportionally.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
