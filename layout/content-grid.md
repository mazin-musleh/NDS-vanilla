---
layout: page
title: Content Grid
hero_title: Content Grid - National Design System
hero_description: A named-lines CSS Grid system that provides content, breakout, and full-width column tracks for consistent page-level layouts.
breadcrumb: ["Layout"]
lang: en
direction: ltr
---

<!-- Structure Overview -->
<section id="structure" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Grid Structure</h2>
            <p class="nds-section-description">The content grid uses named CSS Grid lines to create three column tracks: content (constrained), breakout (wider), and full-width (edge-to-edge).</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Column Tracks</div>
                </div>
                <div class="demo-container noBg">
                    <div class="nds-code nds-expandable">
                        <div class="nds-code-action">
                            <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                <i class="hgi hgi-stroke hgi-copy-01"></i>
                            </button>
                        </div>
                        <div class="nds-expandable-content">
                            <code class="lang-html code">
[full-width-start] | [breakout-start] | [content-start] ... [content-end] | [breakout-end] | [full-width-end]

.nds-content-grid          → applies the grid
.nds-content-section       → also applies the grid
.nds-hero-section          → also applies the grid
                            </code>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-structure" id="tab-structure">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-structure" aria-labelledby="tab-structure">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
<div class="nds-content-grid">
    <!-- Default: content column -->
    <div>Constrained to max-width</div>

    <!-- Full-width: edge-to-edge -->
    <div class="nds-full-width">Spans full viewport</div>
</div>
</code>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Content Column (Default) -->
<section id="content-col" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Content Column (Default)</h2>
            <p class="nds-section-description">All direct children are placed into the content column by default. The content column is constrained by --nds-content-MaxWidth.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Default Placement</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <section class="nds-content-section nds-ghost" style="padding: var(--spacing-xl) 0;">
                            <div style="background: var(--background-primary-light); padding: var(--spacing-lg); border-radius: var(--radius-sm); text-align: center;">
                                Content column — constrained to max-width
                            </div>
                        </section>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-content-col" id="tab-content-col">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-content-col" aria-labelledby="tab-content-col">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
<div class="nds-content-grid">
    <div>This content is constrained to --nds-content-MaxWidth</div>
</div>
</code>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Full-Width Column -->
<section id="full-width" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Full-Width Column</h2>
            <p class="nds-section-description">Add .nds-full-width to break out of the content column and span the entire viewport width.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Full-Width</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo" style="flex-direction: column; gap: var(--spacing-md);">
                        <section class="nds-content-section nds-ghost" style="padding: var(--spacing-xl) 0;">
                            <div style="background: var(--background-primary-light); padding: var(--spacing-lg); border-radius: var(--radius-sm); text-align: center;">
                                Content column (default)
                            </div>
                            <div class="nds-full-width" style="background: var(--background-brand-light); padding: var(--spacing-lg); text-align: center; margin-top: var(--spacing-md);">
                                Full-width column — spans edge to edge
                            </div>
                            <div style="background: var(--background-primary-light); padding: var(--spacing-lg); border-radius: var(--radius-sm); text-align: center; margin-top: var(--spacing-md);">
                                Content column (default)
                            </div>
                        </section>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-full-width" id="tab-full-width">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-full-width" aria-labelledby="tab-full-width">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
<div class="nds-content-grid">
    <div>Constrained content</div>
    <div class="nds-full-width">Edge-to-edge content</div>
    <div>Back to constrained</div>
</div>
</code>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Content Container -->
<section id="container" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Content Container</h2>
            <p class="nds-section-description">The .nds-content-container utility provides a simple max-width + centered padding wrapper without the full grid system.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Container</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-content-container" style="background: var(--background-neutral-light); padding: var(--spacing-lg); border-radius: var(--radius-sm); text-align: center;">
                            .nds-content-container — max-width with auto margins and viewport padding
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-container" id="tab-container">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-container" aria-labelledby="tab-container">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
<div class="nds-content-container">
    <!-- max-width: var(--nds-content-MaxWidth, 1280px) -->
    <!-- padding: 0 var(--nds-viewport-padding, 32px) -->
    <!-- margin: 0 auto -->
</div>
</code>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>

<!-- Customization Tokens -->
<section id="tokens" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Customization Tokens</h2>
            <p class="nds-section-description">Override these CSS custom properties to adjust the content grid behavior.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Tokens</div>
                </div>
                <div class="demo-container noBg">
                    <table class="nds-table nds-striped">
                        <thead>
                            <tr>
                                <th>Token</th>
                                <th>Default</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>--nds-content-MaxWidth</td><td>1280px</td><td>Maximum width of the content column</td></tr>
                            <tr><td>--nds-viewport-padding</td><td>32px</td><td>Inline padding on both sides of the grid</td></tr>
                            <tr><td>--gap</td><td>0</td><td>Row gap between grid children</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>
