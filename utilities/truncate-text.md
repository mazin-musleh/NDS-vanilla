---
layout: page
title: Truncate Text
hero_title: Truncate Text - National Design System
hero_description: A single-class CSS utility that clips overflowing text with an ellipsis, supporting both single-line and configurable multi-line truncation on any element
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Single-Line Truncation -->
<section id="truncateSingleLine" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Single-Line Truncation</h2>
            <p class="nds-section-description">Add <code class="nds-inline-code lang-html">nds-truncate</code> to any text element to clip it to one line with an ellipsis. The element respects its parent's width.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Default Truncation</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-card nds-stroke" style="max-width: 360px;">
                            <div class="nds-card-content">
                                <div class="nds-card-text">
                                    <h3 class="nds-card-title nds-truncate">National Digital Transformation Strategy Overview and Implementation Roadmap</h3>
                                    <p class="nds-card-description nds-truncate">Complete documentation and guidelines for all ministry digital services including API references, implementation guides, best practices for developers, and integration specifications for government applications.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-truncate-single-1" id="tab-truncate-single-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-truncate-single-1"
                            aria-labelledby="tab-truncate-single-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;div class="nds-card nds-stroke" style="max-width: 360px;"&gt;
    &lt;div class="nds-card-content"&gt;
        &lt;div class="nds-card-text"&gt;
            &lt;h3 class="nds-card-title nds-truncate"&gt;National Digital Transformation Strategy Overview and Implementation Roadmap&lt;/h3&gt;
            &lt;p class="nds-card-description nds-truncate"&gt;Complete documentation and guidelines for all ministry digital services including API references, implementation guides, best practices for developers, and integration specifications for government applications.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
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

<!-- Multi-Line Truncation -->
<section id="truncateMultiLine" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Multi-Line Truncation</h2>
            <p class="nds-section-description">Set <code class="nds-inline-code lang-html">--truncate</code> to control how many lines are visible before the ellipsis. Useful for card descriptions and content previews where more than one line adds context.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-action">
                        <div class="nds-dropmenu demo-toggle-menu">
                            <button class="nds-btn nds-secondary-outline nds-menu-btn nds-dropmenu-trigger">
                                <span class="nds-label">2 Lines</span>
                            </button>
                            <div class="nds-dropmenu-menu" hidden>
                                <div class="nds-dropmenu-scroll">
                                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                        data-toggler='["--truncate:1", ".nds-card-description", "lineCount", "style"]'>
                                        <span class="nds-label">1 Line</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn" data-state="selected"
                                        data-toggler='["--truncate:2", ".nds-card-description", "lineCount", "style"]'>
                                        <span class="nds-label">2 Lines</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                        data-toggler='["--truncate:3", ".nds-card-description", "lineCount", "style"]'>
                                        <span class="nds-label">3 Lines</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-dropmenu-item demo-toggle-btn"
                                        data-toggler='["--truncate:4", ".nds-card-description", "lineCount", "style"]'>
                                        <span class="nds-label">4 Lines</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-card nds-stroke" style="max-width: 400px;">
                            <div class="nds-card-content">
                                <div class="nds-card-text">
                                    <h3 class="nds-card-title">Citizen Services Portal</h3>
                                    <p class="nds-card-description nds-truncate" style="--truncate: 2;">The unified portal provides access to over 200 government services across 35 ministries. Citizens can submit applications, track requests, schedule appointments, and receive notifications about their active transactions. The platform supports biometric authentication, digital signatures, and secure document uploads for a seamless end-to-end experience.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container nds-scroll-more">
                        <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-truncate-multi-1" id="tab-truncate-multi-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-truncate-multi-1"
                            aria-labelledby="tab-truncate-multi-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                    <i class="nds-icon nds-hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
&lt;div class="nds-card nds-stroke" style="max-width: 400px;"&gt;
    &lt;div class="nds-card-content"&gt;
        &lt;div class="nds-card-text"&gt;
            &lt;h3 class="nds-card-title"&gt;Citizen Services Portal&lt;/h3&gt;
            &lt;p class="nds-card-description nds-truncate" style="--truncate: 2;"&gt;The unified portal provides access to over 200 government services across 35 ministries. Citizens can submit applications, track requests, schedule appointments, and receive notifications about their active transactions. The platform supports biometric authentication, digital signatures, and secure document uploads for a seamless end-to-end experience.&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
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
<section id="truncateFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-code"></i>
                        <span class="nds-label">CSS-Only</span>
                    </span>
                    <p class="nds-item-desc">Works with a single class and zero JavaScript. No initialization, no event listeners, no cleanup.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-wrap"></i>
                        <span class="nds-label">Configurable Line Count</span>
                    </span>
                    <p class="nds-item-desc">Set <code class="nds-inline-code lang-html">--truncate</code> to any number to control how many lines remain visible before the ellipsis.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-font"></i>
                        <span class="nds-label">Any Text Element</span>
                    </span>
                    <p class="nds-item-desc">Apply to headings, paragraphs, spans, divs, or any element that contains text content.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-horizontal-resize"></i>
                        <span class="nds-label">Width-Responsive</span>
                    </span>
                    <p class="nds-item-desc">Truncation recalculates automatically when the parent container resizes, with no additional code required.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="truncateGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <code class="nds-inline-code lang-html">nds-truncate</code> for text that may overflow in constrained layouts such as <a class="nds-color" href="{{ 'components/cards' | relative_url }}">Cards</a>, table cells, navigation labels, and list items</li>
                    <li>Use multi-line truncation (<code class="nds-inline-code lang-html">--truncate: 2</code> or <code class="nds-inline-code lang-html">--truncate: 3</code>) for descriptions and summaries where a single line removes too much context</li>
                    <li>Pair with a <code class="nds-inline-code lang-html">title</code> attribute or a tooltip so users can access the full text on hover</li>
                    <li>Do not truncate text that the user must read in full to complete a task, such as form labels, error messages, or legal disclaimers. Show the full text or use <a class="nds-color" href="{{ 'utilities/expandable-content' | relative_url }}">Expandable Content</a> instead</li>
                    <li>Do not use truncation as a substitute for writing concise content. If every card description is being clipped, the content itself is too long</li>
                    <li>Choose the line count based on the content type: 1 line for titles and labels, 2 lines for short descriptions, 3 lines for content previews where the opening sentence matters</li>
                    <li>When truncating inside flex or grid children, ensure the element has a constrained width (from the parent or an explicit <code class="nds-inline-code lang-html">max-width</code>). Without a width boundary, the text will not overflow and truncation will not activate</li>
                    <li>Test truncated content with screen readers to verify the full text is still announced. The <code class="nds-inline-code lang-html">nds-truncate</code> class only clips visually; the DOM text remains intact</li>
                    <li>Prefer <a class="nds-color" href="{{ 'utilities/expandable-content' | relative_url }}">Expandable Content</a> over truncation when users need on-page access to the full text. Truncation hides content permanently unless the user navigates elsewhere; expandable content reveals it in place</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--truncate</code></td><td><code class="nds-inline-code lang-html">1</code></td><td>Number of visible lines before the text is clipped with an ellipsis. Set to any positive integer.</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>