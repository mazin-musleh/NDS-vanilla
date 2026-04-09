---
layout: page
title: Grid
hero_title: Grid System - National Design System
hero_description: A responsive grid system for arranging page content into columns with fixed counts, auto-fit wrapping, responsive breakpoints, and customizable spacing and alignment.
breadcrumb: ["Layout"]
lang: en
direction: ltr
---

<!-- Basic Grid -->
<section id="basic" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Basic Grid</h2>
            <p class="nds-section-description">The .nds-grid class creates a CSS grid that auto-fits children
                into equal columns. Use --max-col to set a fixed column count, or --col-width to set minimum column width for automatic wrapping.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Fixed Column Count</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-grid" style="--max-col: 3;">
                                <div class="nds-card nds-stroke">1</div>
                                <div class="nds-card nds-stroke">2</div>
                                <div class="nds-card nds-stroke">3</div>
                                <div class="nds-card nds-stroke">4</div>
                                <div class="nds-card nds-stroke">5</div>
                                <div class="nds-card nds-stroke">6</div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-basic" id="tab-basic">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-basic"
                                aria-labelledby="tab-basic">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-grid" style="--max-col: 3;">
    <div class="nds-card nds-stroke">1</div>
    <div class="nds-card nds-stroke">2</div>
    <div class="nds-card nds-stroke">3</div>
    <div class="nds-card nds-stroke">4</div>
    <div class="nds-card nds-stroke">5</div>
    <div class="nds-card nds-stroke">6</div>
</div>
</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Auto-fit with Min Width</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-grid" style="--col-width: 200px;">
                                <div class="nds-card nds-stroke">1</div>
                                <div class="nds-card nds-stroke">2</div>
                                <div class="nds-card nds-stroke">3</div>
                                <div class="nds-card nds-stroke">4</div>
                                <div class="nds-card nds-stroke">5</div>
                                <div class="nds-card nds-stroke">6</div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-autofill" id="tab-autofill">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-autofill"
                                aria-labelledby="tab-autofill">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-grid" style="--col-width: 200px;">
    <div class="nds-card nds-stroke">1</div>
    <div class="nds-card nds-stroke">2</div>
    <div class="nds-card nds-stroke">3</div>
    <div class="nds-card nds-stroke">4</div>
    <div class="nds-card nds-stroke">5</div>
    <div class="nds-card nds-stroke">6</div>
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
</section>

<!-- 12-Column Spans -->
<section id="column-spans" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">12-Column Spans</h2>
            <p class="nds-section-description">Use col-{n} classes to explicitly span columns in a 12-column grid. The
                grid automatically switches to 12 columns when column classes are detected.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Column Spans</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo nds-grid-demo">
                            <div class="nds-grid">
                                <div class="col-12 nds-card nds-stroke">col-12</div>
                                <div class="col-6 nds-card nds-stroke">col-6</div>
                                <div class="col-6 nds-card nds-stroke">col-6</div>
                                <div class="col-4 nds-card nds-stroke">col-4</div>
                                <div class="col-4 nds-card nds-stroke">col-4</div>
                                <div class="col-4 nds-card nds-stroke">col-4</div>
                                <div class="col-3 nds-card nds-stroke">col-3</div>
                                <div class="col-3 nds-card nds-stroke">col-3</div>
                                <div class="col-3 nds-card nds-stroke">col-3</div>
                                <div class="col-3 nds-card nds-stroke">col-3</div>
                                <div class="col-8 nds-card nds-stroke">col-8</div>
                                <div class="col-4 nds-card nds-stroke">col-4</div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-spans" id="tab-spans">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-spans"
                                aria-labelledby="tab-spans">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-grid">
    <div class="col-12 nds-card nds-stroke">col-12</div>
    <div class="col-6 nds-card nds-stroke">col-6</div>
    <div class="col-6 nds-card nds-stroke">col-6</div>
    <div class="col-4 nds-card nds-stroke">col-4</div>
    <div class="col-4 nds-card nds-stroke">col-4</div>
    <div class="col-4 nds-card nds-stroke">col-4</div>
    <div class="col-3 nds-card nds-stroke">col-3</div>
    <div class="col-3 nds-card nds-stroke">col-3</div>
    <div class="col-3 nds-card nds-stroke">col-3</div>
    <div class="col-3 nds-card nds-stroke">col-3</div>
    <div class="col-8 nds-card nds-stroke">col-8</div>
    <div class="col-4 nds-card nds-stroke">col-4</div>
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
</section>

<!-- Responsive Columns -->
<section id="responsive" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Columns</h2>
            <p class="nds-section-description">Use breakpoint-prefixed column classes to change spans at different viewport widths. Available prefixes: col-sm- (base), col-md- (600px+), col-lg- (960px+), col-xl- (1280px+).</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Responsive</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-grid">
                                <div class="col-12 col-md-6 col-lg-3 nds-card nds-stroke">
                                    12 / md-6 / lg-3
                                </div>
                                <div class="col-12 col-md-6 col-lg-3 nds-card nds-stroke">
                                    12 / md-6 / lg-3
                                </div>
                                <div class="col-12 col-md-6 col-lg-3 nds-card nds-stroke">
                                    12 / md-6 / lg-3
                                </div>
                                <div class="col-12 col-md-6 col-lg-3 nds-card nds-stroke">
                                    12 / md-6 / lg-3
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-responsive" id="tab-responsive">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-responsive"
                                aria-labelledby="tab-responsive">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-grid">
    <div class="col-12 col-md-6 col-lg-3 nds-card nds-stroke">12 / md-6 / lg-3</div>
    <div class="col-12 col-md-6 col-lg-3 nds-card nds-stroke">12 / md-6 / lg-3</div>
    <div class="col-12 col-md-6 col-lg-3 nds-card nds-stroke">12 / md-6 / lg-3</div>
    <div class="col-12 col-md-6 col-lg-3 nds-card nds-stroke">12 / md-6 / lg-3</div>
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
</section>

<!-- Responsive Auto-fit -->
<section id="responsive-autofit" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Auto-fit</h2>
            <p class="nds-section-description">Without column classes, the grid uses auto-fit mode and adapts column count based on viewport width using --max-col, --mid-col, and --min-col tokens. Each token cascades: if --mid-col is not set, it falls back to --max-col. If --min-col is not set, it falls back to --mid-col then --max-col.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Auto-fit Responsive</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 1;">
                                <div class="nds-card nds-stroke">A</div>
                                <div class="nds-card nds-stroke">B</div>
                                <div class="nds-card nds-stroke">C</div>
                                <div class="nds-card nds-stroke">D</div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-autofit" id="tab-autofit">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-autofit"
                                aria-labelledby="tab-autofit">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<div class="nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 1;">
    <div class="nds-card nds-stroke">A</div>
    <div class="nds-card nds-stroke">B</div>
    <div class="nds-card nds-stroke">C</div>
    <div class="nds-card nds-stroke">D</div>
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
</section>

<!-- Breakpoints Reference -->
<section id="breakpoints" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Breakpoints</h2>
            <p class="nds-section-description">The grid uses viewport media queries for responsive column spans and auto-fit behavior. Breakpoints align with the design system's standard responsive mixins.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Responsive Breakpoints</div>
                    </div>
                    <div class="demo-container nds-noBg">
                        <table class="nds-table nds-responsive nds-striped" style="--min-width:500px;">
                            <thead>
                                <tr>
                                    <th>Prefix</th>
                                    <th>Viewport Width</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>col-sm- / col-</td>
                                    <td>0px+</td>
                                    <td>Base (mobile-first default)</td>
                                </tr>
                                <tr>
                                    <td>col-md-</td>
                                    <td>600px+</td>
                                    <td>Medium viewports</td>
                                </tr>
                                <tr>
                                    <td>col-lg-</td>
                                    <td>960px+</td>
                                    <td>Large viewports</td>
                                </tr>
                                <tr>
                                    <td>col-xl-</td>
                                    <td>1280px+</td>
                                    <td>Extra-large viewports</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Auto-fit Breakpoints</div>
                    </div>
                    <div class="demo-container nds-noBg">
                        <table class="nds-table nds-responsive nds-striped" style="--min-width:500px;">
                            <thead>
                                <tr>
                                    <th>Viewport Width</th>
                                    <th>Active Token</th>
                                    <th>Fallback Chain</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>960px+</td>
                                    <td>--max-col</td>
                                    <td>auto-fit</td>
                                </tr>
                                <tr>
                                    <td>600px – 960px</td>
                                    <td>--mid-col</td>
                                    <td>--max-col &rarr; auto-fit</td>
                                </tr>
                                <tr>
                                    <td>Below 600px</td>
                                    <td>--min-col</td>
                                    <td>--mid-col &rarr; --max-col &rarr; auto-fit</td>
                                </tr>
                            </tbody>
                        </table>
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
            <p class="nds-section-description">Override these CSS custom properties on .nds-grid to customize gap, alignment, and column behavior.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Tokens</div>
                    </div>
                    <div class="demo-container nds-noBg">
                        <table class="nds-table nds-responsive nds-striped" style="--min-width:600px;">
                            <thead>
                                <tr>
                                    <th>Token</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>--max-col</td>
                                    <td>auto-fit</td>
                                    <td>Column count at large viewport width (960px+). Also used as the base value when --mid-col and --min-col are not set</td>
                                </tr>
                                <tr>
                                    <td>--mid-col</td>
                                    <td>var(--max-col)</td>
                                    <td>Column count at medium viewport width (600px–960px). Falls back to --max-col</td>
                                </tr>
                                <tr>
                                    <td>--min-col</td>
                                    <td>var(--mid-col)</td>
                                    <td>Column count at small viewport width (below 600px). Falls back to --mid-col then --max-col</td>
                                </tr>
                                <tr>
                                    <td>--col-width</td>
                                    <td>0px</td>
                                    <td>Minimum column width for auto-fit wrapping (e.g. 250px)</td>
                                </tr>
                                <tr>
                                    <td>--gap</td>
                                    <td>var(--spacing-2xl)</td>
                                    <td>Gap between grid items (halved automatically at smaller breakpoints)</td>
                                </tr>
                                <tr>
                                    <td>--row-gap</td>
                                    <td>var(--spacing-2xl)</td>
                                    <td>Row gap override (halved automatically at smaller breakpoints)</td>
                                </tr>
                                <tr>
                                    <td>--col-gap</td>
                                    <td>var(--spacing-2xl)</td>
                                    <td>Column gap override (halved automatically at smaller breakpoints)</td>
                                </tr>
                                <tr>
                                    <td>--justify</td>
                                    <td>stretch</td>
                                    <td>Horizontal alignment of grid items (justify-items)</td>
                                </tr>
                                <tr>
                                    <td>--align</td>
                                    <td>start</td>
                                    <td>Vertical alignment of grid items (align-items)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container">
                            <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-tokens" id="tab-tokens">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tokens"
                                aria-labelledby="tab-tokens">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                        <i class="hgi hgi-stroke hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
<!-- Custom gap and fixed column count -->
<div class="nds-grid" style="--max-col: 3; --gap: var(--spacing-md); --row-gap: var(--spacing-xl);">
    <div>...</div>
    <div>...</div>
    <div>...</div>
</div>

<!-- Minimum column width (auto-wraps when items can't fit at 250px) -->
<div class="nds-grid" style="--col-width: 250px;">
    <div>...</div>
    <div>...</div>
    <div>...</div>
</div>

<!-- Responsive: 4 cols large, 2 cols medium, 1 col small -->
<div class="nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 1;">
    <div>...</div>
    <div>...</div>
</div>

<!-- Centered grid items -->
<div class="nds-grid nds-center">
    <div>...</div>
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
</section>

<!-- Built-in Features -->
<section id="gridFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-grid nds-icon"></i>
                        <span class="nds-label">Auto-fit Columns</span>
                    </span>
                    <p class="nds-item-desc">Grid children distribute into equal columns automatically, with optional minimum width constraints for natural wrapping.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-3-column nds-icon"></i>
                        <span class="nds-label">12-Column Detection</span>
                    </span>
                    <p class="nds-item-desc">Switches to a 12-column grid automatically when any child uses a <code class="nds-inline-code lang-html">col-*</code> class, no extra configuration needed.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mobile-programming-01 nds-icon"></i>
                        <span class="nds-label">Responsive Column Tokens</span>
                    </span>
                    <p class="nds-item-desc">Set different column counts per viewport with <code class="nds-inline-code lang-html">--max-col</code>, <code class="nds-inline-code lang-html">--mid-col</code>, and <code class="nds-inline-code lang-html">--min-col</code>, each cascading to the next as a fallback.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-arrow-shrink nds-icon"></i>
                        <span class="nds-label">Adaptive Gap Scaling</span>
                    </span>
                    <p class="nds-item-desc">Gap and row-gap values halve automatically at tablet and mobile breakpoints to keep spacing proportional on smaller screens.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-resize-01 nds-icon"></i>
                        <span class="nds-label">Breakpoint Column Classes</span>
                    </span>
                    <p class="nds-item-desc">Responsive prefixes (<code class="nds-inline-code lang-html">col-md-</code>, <code class="nds-inline-code lang-html">col-lg-</code>, <code class="nds-inline-code lang-html">col-xl-</code>) let each child span different column counts at each viewport width.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-align-box-middle-center nds-icon"></i>
                        <span class="nds-label">Alignment Tokens</span>
                    </span>
                    <p class="nds-item-desc">Control horizontal and vertical alignment of grid items through <code class="nds-inline-code lang-html">--justify</code> and <code class="nds-inline-code lang-html">--align</code> custom properties.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="gridGuidelines" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <strong>auto-fit mode</strong> (no <code class="nds-inline-code lang-html">col-*</code> classes) for uniform card grids, gallery layouts, and any collection where items should wrap naturally into equal columns</li>
                    <li>Use <strong>12-column spans</strong> when you need asymmetric layouts like a sidebar paired with a main content area, or mixed column widths in the same row</li>
                    <li>Use <strong>responsive column tokens</strong> (<code class="nds-inline-code lang-html">--max-col</code>, <code class="nds-inline-code lang-html">--mid-col</code>, <code class="nds-inline-code lang-html">--min-col</code>) for auto-fit grids that need specific column counts per breakpoint rather than fluid wrapping</li>
                    <li>Do not use the grid for single-column page flow. Standard block layout handles this without extra markup</li>
                    <li>Do not nest <code class="nds-inline-code lang-html">.nds-grid</code> inside <code class="nds-inline-code lang-html">.nds-grid</code> for complex layouts. Use <a class="nds-color" href="{{ 'layout/section' | relative_url }}">Section</a> to organize content into visual blocks</li>
                    <li>Prefer <code class="nds-inline-code lang-html">--col-width</code> over <code class="nds-inline-code lang-html">--max-col</code> when the ideal column count depends on available space rather than a fixed number</li>
                    <li>Combine responsive prefixes from small to large: start with <code class="nds-inline-code lang-html">col-12</code> (full width on mobile), then add <code class="nds-inline-code lang-html">col-md-6</code> and <code class="nds-inline-code lang-html">col-lg-*</code> for wider viewports</li>
                    <li>Use <code class="nds-inline-code lang-html">col-full</code> or <code class="nds-inline-code lang-html">col-{breakpoint}-full</code> to span a child across all 12 columns, useful for section headers or dividers within a grid</li>
                    <li>Override <code class="nds-inline-code lang-html">--gap</code> with a spacing token when the default <code class="nds-inline-code lang-html">var(--spacing-2xl)</code> is too wide for compact layouts like form fields or icon grids</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-center</code></td><td>Centers grid items horizontally (sets <code class="nds-inline-code lang-html">--justify: center</code>)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">col-{1-12}</code></td><td>Span the specified number of columns in a 12-column grid</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">col-full</code></td><td>Span all 12 columns (full width)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">col-sm-{1-12}</code></td><td>Column span at base/small viewport (alias for <code class="nds-inline-code lang-html">col-{n}</code>)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">col-md-{1-12}</code></td><td>Column span at 600px+ viewport</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">col-lg-{1-12}</code></td><td>Column span at 960px+ viewport</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">col-xl-{1-12}</code></td><td>Column span at 1280px+ viewport</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">col-{breakpoint}-full</code></td><td>Full-width span at the specified breakpoint (<code class="nds-inline-code lang-html">sm</code>, <code class="nds-inline-code lang-html">md</code>, <code class="nds-inline-code lang-html">lg</code>, <code class="nds-inline-code lang-html">xl</code>)</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--max-col</code></td><td>auto-fit</td><td>Column count at 960px+ viewport. Fallback for --mid-col and --min-col</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--mid-col</code></td><td>var(--max-col)</td><td>Column count at 600px to 960px viewport</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--min-col</code></td><td>var(--mid-col)</td><td>Column count below 600px viewport</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--col-width</code></td><td>0px</td><td>Minimum column width for auto-fit wrapping</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--gap</code></td><td>var(--spacing-2xl)</td><td>Shorthand for both row and column gap</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--row-gap</code></td><td>var(--spacing-2xl)</td><td>Row gap override</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--col-gap</code></td><td>var(--spacing-2xl)</td><td>Column gap override</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--justify</code></td><td>stretch</td><td>Horizontal alignment of grid items (justify-items)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--align</code></td><td>start</td><td>Vertical alignment of grid items (align-items)</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>