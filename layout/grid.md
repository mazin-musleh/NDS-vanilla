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
            <p class="nds-section-description">The .nds-grid class creates a responsive grid that auto-fits children into equal columns. Use --max-col to set the number of columns.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Auto-fit Grid</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo">
                        <div class="nds-grid" style="--grid-col: 3;">
                            <div class="nds-card nds-stroke">1</div>
                            <div class="nds-card nds-stroke">2</div>
                            <div class="nds-card nds-stroke">3</div>
                            <div class="nds-card nds-stroke">4</div>
                            <div class="nds-card nds-stroke">5</div>
                            <div class="nds-card nds-stroke">6</div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-basic" id="tab-basic">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-basic" aria-labelledby="tab-basic">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
<div class="nds-grid" style="--grid-col: 3;">
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
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Auto-fill with Min Width</div>
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
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-autofill" id="tab-autofill">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-autofill" aria-labelledby="tab-autofill">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
<!-- Columns auto-wrap when items reach 200px minimum -->
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
</section>

<!-- 12-Column Spans -->
<section id="column-spans" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">12-Column Spans</h2>
            <p class="nds-section-description">Use col-{n} classes to explicitly span columns in a 12-column grid. The grid automatically switches to 12 columns when column classes are detected.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Column Spans</div>
                </div>
                <div class="demo-container">
                    <div class="state-demo nds-grid-demo">
                        <div class="nds-grid">
                            <div class="col-12 nds-card nds-stroke">col-12</div>
                        </div>
                        <div class="nds-grid">
                            <div class="col-6 nds-card nds-stroke">col-6</div>
                            <div class="col-6 nds-card nds-stroke">col-6</div>
                        </div>
                        <div class="nds-grid">
                            <div class="col-4 nds-card nds-stroke">col-4</div>
                            <div class="col-4 nds-card nds-stroke">col-4</div>
                            <div class="col-4 nds-card nds-stroke">col-4</div>
                        </div>
                        <div class="nds-grid">
                            <div class="col-3 nds-card nds-stroke">col-3</div>
                            <div class="col-3 nds-card nds-stroke">col-3</div>
                            <div class="col-3 nds-card nds-stroke">col-3</div>
                            <div class="col-3 nds-card nds-stroke">col-3</div>
                        </div>
                        <div class="nds-grid">
                            <div class="col-8 nds-card nds-stroke">col-8</div>
                            <div class="col-4 nds-card nds-stroke">col-4</div>
                        </div>
                    </div>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-spans" id="tab-spans">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-spans" aria-labelledby="tab-spans">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
<div class="nds-grid">
    <div class="col-8">Main content</div>
    <div class="col-4">Sidebar</div>
</div>

<div class="nds-grid">
    <div class="col-4">One third</div>
    <div class="col-4">One third</div>
    <div class="col-4">One third</div>
</div>

<!-- Full row -->
<div class="nds-grid">
    <div class="col-full">Full row</div>
</div>
</code>
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
            <p class="nds-section-description">Use breakpoint-prefixed column classes to change spans at different screen sizes. Available prefixes: col-sm- (base), col-md- (600px+), col-lg- (960px+), col-xl- (1280px+).</p>
        </div>
        <div class="nds-section-content">
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
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-responsive" id="tab-responsive">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-responsive" aria-labelledby="tab-responsive">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
<div class="nds-grid">
    <!-- Full width on mobile, half on tablet, quarter on desktop -->
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
</section>

<!-- Responsive Auto-fit -->
<section id="responsive-autofit" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Auto-fit</h2>
            <p class="nds-section-description">Without column classes, the grid uses auto-fit and adapts column count per breakpoint using --max-col, --mid-col, and --min-col tokens.</p>
        </div>
        <div class="nds-section-content">
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
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-autofit" id="tab-autofit">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-autofit" aria-labelledby="tab-autofit">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
<!-- 4 cols desktop, 2 cols tablet, 1 col mobile -->
<div class="nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 1;">
    <div>A</div>
    <div>B</div>
    <div>C</div>
    <div>D</div>
</div>
</code>
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
            <h2 class="nds-section-title">Breakpoints Reference</h2>
            <p class="nds-section-description">The responsive column classes use the following breakpoints.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-demo-card">
                <div class="demo-header">
                    <div class="demo-label">Breakpoints</div>
                </div>
                <div class="demo-container noBg">
                    <table class="nds-table nds-striped">
                        <thead>
                            <tr>
                                <th>Prefix</th>
                                <th>Breakpoint</th>
                                <th>Screen</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>col-sm- / col-</td><td>0px+</td><td>Mobile (base)</td></tr>
                            <tr><td>col-md-</td><td>600px+</td><td>Tablet</td></tr>
                            <tr><td>col-lg-</td><td>960px+</td><td>Desktop</td></tr>
                            <tr><td>col-xl-</td><td>1280px+</td><td>Large Desktop</td></tr>
                        </tbody>
                    </table>
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
        <div class="nds-section-content">
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
                            <tr><td>--grid-col</td><td>var(--max-col, auto-fit)</td><td>Fixed column count (e.g. 3, 4, 12)</td></tr>
                            <tr><td>--max-col</td><td>auto-fit</td><td>Column count on desktop breakpoint (responsive auto-fit)</td></tr>
                            <tr><td>--mid-col</td><td>auto-fit</td><td>Column count on tablet breakpoint (responsive auto-fit)</td></tr>
                            <tr><td>--min-col</td><td>auto-fit</td><td>Column count on mobile breakpoint (responsive auto-fit)</td></tr>
                            <tr><td>--col-width</td><td>0px</td><td>Minimum column width for auto-fit (e.g. 250px)</td></tr>
                            <tr><td>--gap</td><td>var(--spacing-2xl)</td><td>Gap between grid items</td></tr>
                            <tr><td>--row-gap</td><td>var(--spacing-2xl)</td><td>Row gap (overrides --gap for rows)</td></tr>
                            <tr><td>--justify</td><td>stretch</td><td>Horizontal alignment of grid items</td></tr>
                            <tr><td>--align</td><td>center</td><td>Vertical alignment of grid items</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="nds-tabs nds-code nds-divided" hidden>
                    <div class="nds-tab-list-container">
                        <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                            <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-tokens" id="tab-tokens">
                                <span class="nds-tab-label">HTML</span>
                            </button>
                        </nav>
                    </div>
                    <div class="nds-tab-content">
                        <div class="nds-tab-panel code-example" role="tabpanel" id="panel-tokens" aria-labelledby="tab-tokens">
                            <div class="nds-code-action">
                                <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                    <i class="hgi hgi-stroke hgi-copy-01"></i>
                                </button>
                            </div>
<code class="lang-html code">
<!-- Custom gap and column count -->
<div class="nds-grid" style="--grid-col: 3; --gap: var(--spacing-md); --row-gap: var(--spacing-xl);">
    <div>...</div>
    <div>...</div>
    <div>...</div>
</div>

<!-- Set minimum column width (auto-wraps when items reach 250px) -->
<div class="nds-grid" style="--col-width: 250px;">
    <div>...</div>
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
</section>
