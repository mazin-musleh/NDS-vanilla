---
layout: page
title: Grid
hero_title: Grid System - National Design System
hero_description: A responsive 12-column grid system with auto-fit support, responsive column spans, and customizable gap and alignment tokens.
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
<!-- Always 3 columns -->
<div class="nds-grid" style="--max-col: 3;">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
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
<!-- Columns auto-wrap when items can't fit at 200px minimum -->
<div class="nds-grid" style="--col-width: 200px;">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
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
    <div class="col-12">Full width</div>
    <div class="col-6">Half</div>
    <div class="col-6">Half</div>
    <div class="col-4">One third</div>
    <div class="col-4">One third</div>
    <div class="col-4">One third</div>
    <div class="col-3">Quarter</div>
    <div class="col-3">Quarter</div>
    <div class="col-3">Quarter</div>
    <div class="col-3">Quarter</div>
    <div class="col-8">Two thirds</div>
    <div class="col-4">One third</div>
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
    <!-- Full width on small, half on medium, quarter on large -->
    <div class="col-12 col-md-6 col-lg-3">...</div>
    <div class="col-12 col-md-6 col-lg-3">...</div>
    <div class="col-12 col-md-6 col-lg-3">...</div>
    <div class="col-12 col-md-6 col-lg-3">...</div>
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
<!-- 4 cols on large, 2 cols on medium, 1 col on small -->
<div class="nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 1;">
    <div>A</div>
    <div>B</div>
    <div>C</div>
    <div>D</div>
</div>

<!-- Only set --max-col: mid and min auto-fallback to same value -->
<div class="nds-grid" style="--max-col: 3;">
    <div>A</div>
    <div>B</div>
    <div>C</div>
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