---
layout: page
title: Flex
hero_title: Flex - National Design System
hero_description: A lightweight CSS-only utility for quick alignment, direction, and wrapping fixes on ad-hoc elements, with inline custom-property overrides for gap, justify-content, and align-items.
breadcrumb: [["Utilities", "/utilities?category=Utilities"]]
lang: en
direction: ltr
---

<!-- Basic Alignment -->
<section id="flexBasic" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Basic Alignment</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-flex</code> to any element to turn it into a flex container with sensible defaults. Override <code class="nds-inline-code lang-html">--justify</code>, <code class="nds-inline-code lang-html">--align</code>, and <code class="nds-inline-code lang-html">--gap</code> inline to tune the layout.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <div class="nds-dropmenu demo-toggle-menu">
                            <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                <span class="nds-label">Start</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                        data-toggler='["--justify:flex-start", ".nds-flex", "flexJustify", "style"]'>
                                        <span class="nds-label">Start</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                        data-toggler='["--justify:center", ".nds-flex", "flexJustify", "style"]'>
                                        <span class="nds-label">Center</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                        data-toggler='["--justify:flex-end", ".nds-flex", "flexJustify", "style"]'>
                                        <span class="nds-label">End</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                        data-toggler='["--justify:space-between", ".nds-flex", "flexJustify", "style"]'>
                                        <span class="nds-label">Space Between</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-flex" style="--justify: flex-start;">
                            <span class="nds-tag nds-sm"><span class="nds-label">First</span></span>
                            <span class="nds-tag nds-sm"><span class="nds-label">Second</span></span>
                            <span class="nds-tag nds-sm"><span class="nds-label">Third</span></span>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-flex-basic-1" id="tab-flex-basic-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-flex-basic-1"
                                aria-labelledby="tab-flex-basic-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;div class="nds-flex" style="--justify: flex-start;"&gt;
    &lt;span class="nds-tag nds-sm"&gt;&lt;span class="nds-label"&gt;First&lt;/span&gt;&lt;/span&gt;
    &lt;span class="nds-tag nds-sm"&gt;&lt;span class="nds-label"&gt;Second&lt;/span&gt;&lt;/span&gt;
    &lt;span class="nds-tag nds-sm"&gt;&lt;span class="nds-label"&gt;Third&lt;/span&gt;&lt;/span&gt;
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
</section>

<!-- Direction Control -->
<section id="flexDirection" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Direction Control</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-row</code> or <code class="nds-inline-code lang-html">nds-col</code> to flip the main axis. Combine with <code class="nds-inline-code lang-html">nds-reverse</code> to invert child order for layout or RTL action-flip patterns.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <div class="nds-dropmenu demo-toggle-menu">
                            <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                <span class="nds-label">Row</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                        data-toggler='["nds-row", ".nds-flex", "flexDirection"]'>
                                        <span class="nds-label">Row</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                        data-toggler='["nds-col", ".nds-flex", "flexDirection"]'>
                                        <span class="nds-label">Column</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button class="nds-btn nds-subtle demo-toggle-btn"
                            data-toggler='["nds-reverse", ".nds-flex", "flexReverse"]'>
                            <span class="nds-label">Reverse</span>
                        </button>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-flex nds-row" style="--gap: var(--spacing-md);">
                            <button class="nds-btn nds-primary nds-sm">
                                <span class="nds-label">Accept</span>
                            </button>
                            <button class="nds-btn nds-secondary-outline nds-sm">
                                <span class="nds-label">Review</span>
                            </button>
                            <button class="nds-btn nds-subtle nds-sm">
                                <span class="nds-label">Dismiss</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-flex-direction-1" id="tab-flex-direction-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-flex-direction-1"
                                aria-labelledby="tab-flex-direction-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;div class="nds-flex nds-row" style="--gap: var(--spacing-md);"&gt;
    &lt;button class="nds-btn nds-primary nds-sm"&gt;
        &lt;span class="nds-label"&gt;Accept&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-secondary-outline nds-sm"&gt;
        &lt;span class="nds-label"&gt;Review&lt;/span&gt;
    &lt;/button&gt;
    &lt;button class="nds-btn nds-subtle nds-sm"&gt;
        &lt;span class="nds-label"&gt;Dismiss&lt;/span&gt;
    &lt;/button&gt;
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
</section>

<!-- Wrapping -->
<section id="flexWrapping" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Wrapping</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-wrap</code> to let children flow onto multiple lines when the container is too narrow. Use <code class="nds-inline-code lang-html">nds-nowrap</code> to force a single line even when content overflows.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <div class="nds-dropmenu demo-toggle-menu">
                            <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                <span class="nds-label">Wrap</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                        data-toggler='["nds-wrap", ".nds-flex", "flexWrap"]'>
                                        <span class="nds-label">Wrap</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                        data-toggler='["nds-nowrap", ".nds-flex", "flexWrap"]'>
                                        <span class="nds-label">No Wrap</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-flex nds-wrap" style="--gap: var(--spacing-sm);">
                            <span class="nds-tag nds-sm"><span class="nds-label">Government</span></span>
                            <span class="nds-tag nds-sm"><span class="nds-label">Digital Transformation</span></span>
                            <span class="nds-tag nds-sm"><span class="nds-label">Accessibility</span></span>
                            <span class="nds-tag nds-sm"><span class="nds-label">Design System</span></span>
                            <span class="nds-tag nds-sm"><span class="nds-label">Standards</span></span>
                            <span class="nds-tag nds-sm"><span class="nds-label">Services</span></span>
                            <span class="nds-tag nds-sm"><span class="nds-label">Compliance</span></span>
                            <span class="nds-tag nds-sm"><span class="nds-label">Open Data</span></span>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-flex-wrap-1" id="tab-flex-wrap-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-flex-wrap-1"
                                aria-labelledby="tab-flex-wrap-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;div class="nds-flex nds-wrap" style="--gap: var(--spacing-sm);"&gt;
    &lt;span class="nds-tag nds-sm"&gt;&lt;span class="nds-label"&gt;Government&lt;/span&gt;&lt;/span&gt;
    &lt;span class="nds-tag nds-sm"&gt;&lt;span class="nds-label"&gt;Digital Transformation&lt;/span&gt;&lt;/span&gt;
    &lt;span class="nds-tag nds-sm"&gt;&lt;span class="nds-label"&gt;Accessibility&lt;/span&gt;&lt;/span&gt;
    &lt;span class="nds-tag nds-sm"&gt;&lt;span class="nds-label"&gt;Design System&lt;/span&gt;&lt;/span&gt;
    &lt;span class="nds-tag nds-sm"&gt;&lt;span class="nds-label"&gt;Standards&lt;/span&gt;&lt;/span&gt;
    &lt;span class="nds-tag nds-sm"&gt;&lt;span class="nds-label"&gt;Services&lt;/span&gt;&lt;/span&gt;
    &lt;span class="nds-tag nds-sm"&gt;&lt;span class="nds-label"&gt;Compliance&lt;/span&gt;&lt;/span&gt;
    &lt;span class="nds-tag nds-sm"&gt;&lt;span class="nds-label"&gt;Open Data&lt;/span&gt;&lt;/span&gt;
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
</section>

<!-- Built-in Features -->
<section id="flexFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code"></i>
                        <span class="nds-label">CSS-Only</span>
                    </span>
                    <p class="nds-item-desc">Works with a single class and zero JavaScript. No initialization, no event listeners, no cleanup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-align-box-middle-center"></i>
                        <span class="nds-label">Sensible Defaults</span>
                    </span>
                    <p class="nds-item-desc">Items align to center cross-axis, start along the main axis, and separate by <code class="nds-inline-code lang-html">--spacing-xl</code> gap out of the box.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-distribute-horizontal-center"></i>
                        <span class="nds-label">Custom Property API</span>
                    </span>
                    <p class="nds-item-desc">Override <code class="nds-inline-code lang-html">--justify</code>, <code class="nds-inline-code lang-html">--align</code>, and <code class="nds-inline-code lang-html">--gap</code> inline or in a parent style without writing a single new class.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-exchange-01"></i>
                        <span class="nds-label">Unscoped Direction</span>
                    </span>
                    <p class="nds-item-desc"><code class="nds-inline-code lang-html">nds-row</code> and <code class="nds-inline-code lang-html">nds-col</code> flip direction on any flex element, including components that declare their own <code class="nds-inline-code lang-html">display: flex</code> like card actions.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-arrow-reload-horizontal"></i>
                        <span class="nds-label">Reverse Order</span>
                    </span>
                    <p class="nds-item-desc">Pair <code class="nds-inline-code lang-html">nds-reverse</code> with a direction class to flip visual child order, useful for RTL-specific action arrangements.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-wrap"></i>
                        <span class="nds-label">Wrap Control</span>
                    </span>
                    <p class="nds-item-desc"><code class="nds-inline-code lang-html">nds-wrap</code> enables multi-line flow; <code class="nds-inline-code lang-html">nds-nowrap</code> forces a single line. Combine with child <code class="nds-inline-code lang-html">min-width</code> for container-responsive stacking.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="flexGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <code class="nds-inline-code lang-html">nds-flex</code> for quick one-off alignment or direction fixes on ad-hoc elements where a component does not already handle the layout</li>
                    <li>Use <a class="nds-color" href="{{ 'layout/grid' | relative_url }}">Grid</a> instead for page-level or section-level layout composition. Grid handles responsive column counts and gap halving in a single rule through its tier-based custom properties</li>
                    <li>Use <code class="nds-inline-code lang-html">nds-row</code> or <code class="nds-inline-code lang-html">nds-col</code> standalone (without <code class="nds-inline-code lang-html">nds-flex</code>) when the parent already declares <code class="nds-inline-code lang-html">display: flex</code> in its own component SCSS, such as the <code class="nds-inline-code lang-html">nds-card-actions nds-row</code> action-flip pattern</li>
                    <li>Override defaults with inline <code class="nds-inline-code lang-html">--justify</code>, <code class="nds-inline-code lang-html">--align</code>, and <code class="nds-inline-code lang-html">--gap</code> CSS variables rather than extending the utility with new modifier classes. This keeps the CSS output small and the API predictable</li>
                    <li>For container-responsive stacking (items stack when the container gets narrow, not when the viewport changes), add <code class="nds-inline-code lang-html">nds-wrap</code> with a <code class="nds-inline-code lang-html">min-width</code> on children. More resilient than breakpoint-based direction swaps</li>
                    <li>Do not add <code class="nds-inline-code lang-html">nds-flex</code> to elements inside components that already ship their own flex logic (cards, forms, main navigation). The component handles alignment more precisely than a generic utility</li>
                    <li>Do not use <code class="nds-inline-code lang-html">nds-flex</code> for multi-breakpoint layout composition. If you need a row that becomes a column on mobile, use Grid with <code class="nds-inline-code lang-html">--max-col: 2; --min-col: 1;</code> instead. Flex direction swaps rarely come alone and usually trigger other responsive adjustments</li>
                    <li>Keep the <code class="nds-inline-code lang-html">width: 100%</code> default in mind. When the flex container must only occupy its content's width, wrap it in an inline-level parent or override with inline <code class="nds-inline-code lang-html">width: auto</code></li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-flex</code></td><td>Declares the element as a flex container with default gap, center cross-axis alignment, and start main-axis alignment</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-row</code></td><td>Sets <code class="nds-inline-code lang-html">flex-direction: row</code>. Unscoped: works with or without <code class="nds-inline-code lang-html">nds-flex</code> on the same element</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-col</code></td><td>Sets <code class="nds-inline-code lang-html">flex-direction: column</code>. Unscoped: works with or without <code class="nds-inline-code lang-html">nds-flex</code> on the same element</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-reverse</code></td><td>Combined with <code class="nds-inline-code lang-html">nds-row</code> or <code class="nds-inline-code lang-html">nds-col</code>, reverses visual child order (<code class="nds-inline-code lang-html">row-reverse</code> or <code class="nds-inline-code lang-html">column-reverse</code>)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-wrap</code></td><td>Enables <code class="nds-inline-code lang-html">flex-wrap: wrap</code> so children flow onto multiple lines when the container is too narrow</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-nowrap</code></td><td>Forces <code class="nds-inline-code lang-html">flex-wrap: nowrap</code> so children stay on one line, potentially overflowing</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--justify</code></td><td><code class="nds-inline-code lang-html">flex-start</code></td><td>Value for <code class="nds-inline-code lang-html">justify-content</code>. Accepts any valid CSS keyword such as <code class="nds-inline-code lang-html">center</code>, <code class="nds-inline-code lang-html">flex-end</code>, <code class="nds-inline-code lang-html">space-between</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--align</code></td><td><code class="nds-inline-code lang-html">center</code></td><td>Value for <code class="nds-inline-code lang-html">align-items</code>. Accepts keywords such as <code class="nds-inline-code lang-html">start</code>, <code class="nds-inline-code lang-html">end</code>, <code class="nds-inline-code lang-html">stretch</code>, <code class="nds-inline-code lang-html">baseline</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--gap</code></td><td><code class="nds-inline-code lang-html">var(--spacing-xl)</code></td><td>Gap between children. Accepts any CSS length or spacing token such as <code class="nds-inline-code lang-html">var(--spacing-md)</code> or <code class="nds-inline-code lang-html">0</code></td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
