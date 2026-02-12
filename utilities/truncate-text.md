---
layout: page
title: Truncate Text
hero_title: Truncate Text - National Design System
hero_description: Text truncation utility with ellipsis for single and multi-line content overflow
breadcrumb: ["Utilities", "Truncate Text"]
lang: en
direction: ltr
---

<!-- Truncate Text Overview -->
<section id="truncateOverview" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Text Truncation Utility</h2>
            <p class="nds-section-description">Truncate overflowing text with ellipsis for single-line and multi-line
                content</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

            <!-- Single Line Truncate -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Single Line Truncation (Default)</div>
                    <div class="demo-action">

                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div style="width: 300px; border: 1px solid #ddd; padding: 16px;">
                            <p class="nds-truncate">This is a very long text that will be truncated to a single line
                                with ellipsis when it exceeds the container width</p>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-single-1" id="tab-single-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-single-1"
                            aria-labelledby="tab-single-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <p class="nds-truncate">This is a very long text that will be truncated to a single line
                                with ellipsis when it exceeds the container width</p>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Single Line with Max Width -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Single Line with Max Width</div>
                    <div class="demo-action">

                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div style="border: 1px solid #ddd; padding: 16px;">
                            <p class="nds-truncate" style="max-width: 250px;">This is a very long text that will be
                                truncated to a single line when it exceeds the maximum width of 250 pixels</p>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-maxwidth-1" id="tab-maxwidth-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-maxwidth-1"
                            aria-labelledby="tab-maxwidth-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <p class="nds-truncate" style="max-width: 250px;">This is a very long text that will be
                                truncated to a single line when it exceeds the maximum width of 250 pixels</p>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Multi-line Truncate -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Multi-line Truncation (2 Lines)</div>
                    <div class="demo-action">

                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div style="width: 300px; border: 1px solid #ddd; padding: 16px;">
                            <p class="nds-truncate" style="--truncate: 2;">This is a longer text content that will
                                be truncated to exactly two lines. When the content exceeds two lines, it will be cut
                                off and show ellipsis at the end of the second line to indicate there is more content
                                available.</p>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-multi-1" id="tab-multi-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-multi-1"
                            aria-labelledby="tab-multi-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <p class="nds-truncate" style="--truncate: 2;">This is a longer text content that will
                                be truncated to exactly two lines. When the content exceeds two lines, it will be cut
                                off and show ellipsis at the end of the second line to indicate there is more content
                                available.</p>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Custom Line Count -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Custom Line Count (3 Lines)</div>
                    <div class="demo-action">

                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div style="width: 350px; border: 1px solid #ddd; padding: 16px;">
                            <p class="nds-truncate" style="--truncate: 3;">Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur.</p>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-custom-1" id="tab-custom-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-custom-1"
                            aria-labelledby="tab-custom-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <p class="nds-truncate" style="--truncate: 3;">Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur.</p>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Different Elements -->
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Different HTML Elements</div>
                    <div class="demo-action">

                    </div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="display: grid; gap: 16px;">
                        <!-- Heading -->
                        <div style="width: 250px; border: 1px solid #ddd; padding: 12px;">
                            <h3 class="nds-truncate">This is a very long heading that will be truncated</h3>
                        </div>

                        <!-- Span -->
                        <div style="width: 200px; border: 1px solid #ddd; padding: 12px;">
                            <span class="nds-truncate" style="--truncate: 2;">This is a span element with truncated
                                text content that spans multiple lines</span>
                        </div>

                        <!-- Div -->
                        <div style="width: 300px; border: 1px solid #ddd; padding: 12px;">
                            <div class="nds-truncate" style="--truncate: 2;">This div element contains text that
                                will be truncated after two lines of content. The ellipsis will appear at the end.</div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                aria-controls="panel-elements-1" id="tab-elements-1">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-elements-1"
                            aria-labelledby="tab-elements-1">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
                            <code class="lang-html code">
                                <!-- Heading -->
                                <h3 class="nds-truncate">This is a very long heading that will be truncated</h3>

                                <!-- Span -->
                                <span class="nds-truncate" style="--truncate: 2;">This is a span element with truncated text content that spans multiple lines</span>

                                <!-- Div -->
                                <div class="nds-truncate" style="--truncate: 2;">This div element contains text that will be truncated after two lines of content. The ellipsis will appear at the end.</div>
                            </code>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="truncateGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-content">
            <div class="nds-guidelines-grid">

                <div class="nds-guideline-item">
                    <h3>Basic Usage</h3>
                    <ul>
                        <li>Add .nds-truncate class to any text element</li>
                        <li>Default behavior truncates to 1 line</li>
                        <li>Automatically adds ellipsis (...) for overflow</li>
                        <li>Works with any HTML text element (p, span, div, h1-h6)</li>
                    </ul>
                </div>

                <div class="nds-guideline-item">
                    <h3>Multi-line Truncation</h3>
                    <ul>
                        <li>Use --truncate CSS custom property</li>
                        <li>Set any number: style="--truncate: 3;"</li>
                        <li>Uses modern line-clamp for better browser support</li>
                        <li>Includes webkit prefix for older browsers</li>
                    </ul>
                </div>

                <div class="nds-guideline-item">
                    <h3>When to Use</h3>
                    <ul>
                        <li>Card descriptions and summaries</li>
                        <li>Long titles in navigation menus</li>
                        <li>Product descriptions in listings</li>
                        <li>User-generated content previews</li>
                    </ul>
                </div>

                <div class="nds-guideline-item">
                    <h3>Accessibility</h3>
                    <ul>
                        <li>Consider providing full text via tooltip or expand option</li>
                        <li>Use title attribute for single-line truncation</li>
                        <li>Ensure truncated content doesn't lose essential meaning</li>
                        <li>Test with screen readers for proper content exposure</li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</section>

<!-- CSS Implementation -->
<section id="truncateCSS" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">CSS Implementation</h2>
            <p class="nds-section-description">The underlying CSS that powers the truncate utility</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">CSS Code</div>
                </div>
                <div class="demo-container">
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example">
                            <code class="lang-css code">
.nds-truncate {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--truncate, 1);
    line-clamp: var(--truncate, 1);
    text-overflow: ellipsis;
}

/* Usage Examples */
.single-line {
    /* Default: 1 line truncation */
}

.two-lines {
    --truncate: 2;
}

.three-lines {
    --truncate: 3;
}
</code>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </div>
    </div>
</section>

<!-- Comparison -->
<section id="truncateComparison" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Truncate vs Expandable</h2>
            <p class="nds-section-description">When to use text truncation vs expandable content</p>
        </div>
        <div class="nds-section-content">

            <div class="comparison-grid"
                style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 24px;">

                <div class="comparison-item">
                    <h3>Use Truncate Text When:</h3>
                    <ul>
                        <li>Content is short to medium length</li>
                        <li>Preview/summary is sufficient</li>
                        <li>Space is limited (cards, lists)</li>
                        <li>Users scan rather than read</li>
                        <li>Content importance is low</li>
                    </ul>
                </div>

                <div class="comparison-item">
                    <h3>Use Expandable Content When:</h3>
                    <ul>
                        <li>Content is long and important</li>
                        <li>Users need access to full content</li>
                        <li>Interactive expansion is acceptable</li>
                        <li>Content has varying lengths</li>
                        <li>Reading experience matters</li>
                    </ul>
                </div>

            </div>

        </div>
    </div>
</section>