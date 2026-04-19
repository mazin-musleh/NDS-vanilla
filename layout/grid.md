---
layout: page
title: Grid
hero_title: Grid System - National Design System
hero_description: A responsive CSS grid for arranging content into auto-fit or explicit column layouts, with per-breakpoint column counts, custom track templates, and adaptive gap scaling.
breadcrumb: [["Layout", "/layout"]]
lang: en
direction: ltr
---

<!-- Basic Grid -->
<section id="basic" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Basic Grid</h2>
            <p class="nds-section-description">The <code class="nds-inline-code lang-html">.nds-grid</code> class creates a CSS grid that distributes children into equal columns. Use <code class="nds-inline-code lang-html">--max-col</code> to set a fixed column count, or <code class="nds-inline-code lang-html">--min-width</code> to set a minimum column width for automatic wrapping.</p>
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
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-grid-basic-1" id="tab-grid-basic-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-grid-basic-1"
                                aria-labelledby="tab-grid-basic-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;div class="nds-grid" style="--max-col: 3;"&gt;
    &lt;div class="nds-card nds-stroke"&gt;1&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;2&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;3&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;4&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;5&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;6&lt;/div&gt;
&lt;/div&gt;
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
                            <div class="nds-grid" style="--min-width: 200px;">
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
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-grid-basic-2" id="tab-grid-basic-2">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-grid-basic-2"
                                aria-labelledby="tab-grid-basic-2">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;div class="nds-grid" style="--min-width: 200px;"&gt;
    &lt;div class="nds-card nds-stroke"&gt;1&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;2&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;3&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;4&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;5&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;6&lt;/div&gt;
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

<!-- Custom Tracks -->
<section id="tracks" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Custom Track Layouts</h2>
            <p class="nds-section-description">Use <code class="nds-inline-code lang-html">--max-track</code> to define an explicit <code class="nds-inline-code lang-html">grid-template-columns</code> value for asymmetric layouts like a sidebar next to a main column, or a mix of fixed and flexible tracks.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Asymmetric Tracks</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-grid" style="--max-track: 3fr 1fr; --mid-track: 2fr 1fr; --min-track: 1fr;">
                                <div class="nds-card nds-stroke">Primary</div>
                                <div class="nds-card nds-stroke">Secondary</div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-grid-track-1" id="tab-grid-track-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-grid-track-1"
                                aria-labelledby="tab-grid-track-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;div class="nds-grid" style="--max-track: 3fr 1fr; --mid-track: 2fr 1fr; --min-track: 1fr;"&gt;
    &lt;div class="nds-card nds-stroke"&gt;Primary&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;Secondary&lt;/div&gt;
&lt;/div&gt;
</code>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Collapse Auto-fit at Narrow Viewports</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-grid" style="--mid-track: 1fr;">
                                <div class="nds-card nds-stroke">A</div>
                                <div class="nds-card nds-stroke">B</div>
                                <div class="nds-card nds-stroke">C</div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-grid-track-2" id="tab-grid-track-2">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-grid-track-2"
                                aria-labelledby="tab-grid-track-2">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;!-- Auto-fit at large, forced single column at medium and below --&gt;
&lt;div class="nds-grid" style="--mid-track: 1fr;"&gt;
    &lt;div class="nds-card nds-stroke"&gt;A&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;B&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;C&lt;/div&gt;
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

<!-- Responsive Auto-fit -->
<section id="responsive-autofit" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Auto-fit</h2>
            <p class="nds-section-description">Use <code class="nds-inline-code lang-html">--max-col</code>, <code class="nds-inline-code lang-html">--mid-col</code>, and <code class="nds-inline-code lang-html">--min-col</code> to set column count per viewport. Each token cascades: <code class="nds-inline-code lang-html">--mid-col</code> falls back to <code class="nds-inline-code lang-html">--max-col</code>, and <code class="nds-inline-code lang-html">--min-col</code> falls back to <code class="nds-inline-code lang-html">--mid-col</code> then <code class="nds-inline-code lang-html">--max-col</code>.</p>
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
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-grid-autofit-1" id="tab-grid-autofit-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-grid-autofit-1"
                                aria-labelledby="tab-grid-autofit-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;div class="nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 1;"&gt;
    &lt;div class="nds-card nds-stroke"&gt;A&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;B&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;C&lt;/div&gt;
    &lt;div class="nds-card nds-stroke"&gt;D&lt;/div&gt;
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

<!-- Breakpoints Reference -->
<section id="breakpoints" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Responsive Breakpoints</h2>
            <p class="nds-section-description">The grid switches between <code class="nds-inline-code lang-html">--max-*</code>, <code class="nds-inline-code lang-html">--mid-*</code>, and <code class="nds-inline-code lang-html">--min-*</code> tokens at standard design-system breakpoints. Gap values halve automatically below the large breakpoint.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
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
                                    <td>961px+</td>
                                    <td>--max-col / --max-track</td>
                                    <td>auto-fit</td>
                                </tr>
                                <tr>
                                    <td>601px to 960px</td>
                                    <td>--mid-col / --mid-track</td>
                                    <td>--max-col &rarr; auto-fit</td>
                                </tr>
                                <tr>
                                    <td>Below 601px</td>
                                    <td>--min-col / --min-track</td>
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
            <p class="nds-section-description">Override these CSS custom properties on <code class="nds-inline-code lang-html">.nds-grid</code> to customize column count, track template, gap, and alignment.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Customization Examples</div>
                    </div>
                    <div class="demo-code">
                    <div class="nds-tabs nds-code nds-divided" hidden>
                        <div class="nds-tab-list-container nds-scroll-more">
                            <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                    aria-controls="panel-grid-tokens-1" id="tab-grid-tokens-1">
                                    <span class="nds-tab-label">HTML</span>
                                </button>
                            </nav>
                        </div>
                        <div class="nds-tab-content">
                            <div class="nds-tab-panel code-example" role="tabpanel" id="panel-grid-tokens-1"
                                aria-labelledby="tab-grid-tokens-1">
                                <div class="nds-code-action">
                                    <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                        <i class="nds-icon nds-hgi-copy-01"></i>
                                    </button>
                                </div>
                                <code class="lang-html code">
&lt;!-- Custom gap and fixed column count --&gt;
&lt;div class="nds-grid" style="--max-col: 3; --gap: var(--spacing-md); --row-gap: var(--spacing-xl);"&gt;
    &lt;div&gt;...&lt;/div&gt;
    &lt;div&gt;...&lt;/div&gt;
    &lt;div&gt;...&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Minimum column width (auto-wraps when items can't fit at 250px) --&gt;
&lt;div class="nds-grid" style="--min-width: 250px;"&gt;
    &lt;div&gt;...&lt;/div&gt;
    &lt;div&gt;...&lt;/div&gt;
    &lt;div&gt;...&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Responsive: 4 cols large, 2 cols medium, 1 col small --&gt;
&lt;div class="nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 1;"&gt;
    &lt;div&gt;...&lt;/div&gt;
    &lt;div&gt;...&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Explicit track template with responsive collapse --&gt;
&lt;div class="nds-grid" style="--max-track: 3fr 1fr; --min-track: 1fr;"&gt;
    &lt;div&gt;Primary&lt;/div&gt;
    &lt;div&gt;Secondary&lt;/div&gt;
&lt;/div&gt;

&lt;!-- Centered grid items --&gt;
&lt;div class="nds-grid nds-center"&gt;
    &lt;div&gt;...&lt;/div&gt;
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
<section id="gridFeatures" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid" style="--max-col:2;--mid-col:1;--min-col:1; --dl-icon-size:24px; --row-gap: 24px; --col-gap: 32px;">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-grid"></i>
                        <span class="nds-label">Auto-fit Columns</span>
                    </span>
                    <p class="nds-item-desc">Grid children distribute into equal columns automatically, filling available width without manual column counts.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-resize-01"></i>
                        <span class="nds-label">Minimum Width Wrapping</span>
                    </span>
                    <p class="nds-item-desc">Set <code class="nds-inline-code lang-html">--min-width</code> to wrap items naturally once they cannot fit the specified minimum, no media queries needed.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-mobile-programming-01"></i>
                        <span class="nds-label">Responsive Column Tokens</span>
                    </span>
                    <p class="nds-item-desc">Set different column counts per viewport with <code class="nds-inline-code lang-html">--max-col</code>, <code class="nds-inline-code lang-html">--mid-col</code>, and <code class="nds-inline-code lang-html">--min-col</code>, each cascading to the next as a fallback.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-3-column"></i>
                        <span class="nds-label">Custom Track Layouts</span>
                    </span>
                    <p class="nds-item-desc">Define explicit <code class="nds-inline-code lang-html">grid-template-columns</code> per breakpoint with <code class="nds-inline-code lang-html">--max-track</code>, <code class="nds-inline-code lang-html">--mid-track</code>, and <code class="nds-inline-code lang-html">--min-track</code> for asymmetric layouts.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-arrow-shrink"></i>
                        <span class="nds-label">Adaptive Gap Scaling</span>
                    </span>
                    <p class="nds-item-desc">Gap and row-gap values halve automatically at tablet and mobile breakpoints, keeping spacing proportional on smaller screens.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-align-box-middle-center"></i>
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
                    <li>Use <strong>auto-fit mode</strong> (no column tokens) for uniform card grids, gallery layouts, and collections where items should wrap naturally into equal columns</li>
                    <li>Use <strong>responsive column tokens</strong> (<code class="nds-inline-code lang-html">--max-col</code>, <code class="nds-inline-code lang-html">--mid-col</code>, <code class="nds-inline-code lang-html">--min-col</code>) when you want specific column counts per breakpoint rather than fluid wrapping</li>
                    <li>Use <strong>track tokens</strong> (<code class="nds-inline-code lang-html">--max-track</code>, <code class="nds-inline-code lang-html">--mid-track</code>, <code class="nds-inline-code lang-html">--min-track</code>) for asymmetric layouts like sidebar + main content where columns need different widths</li>
                    <li>Set <code class="nds-inline-code lang-html">--mid-track: 1fr</code> or <code class="nds-inline-code lang-html">--min-track: 1fr</code> alone (without <code class="nds-inline-code lang-html">--max-track</code>) to keep auto-fit behavior at large viewports while forcing a single-column stack below</li>
                    <li>Prefer <code class="nds-inline-code lang-html">--min-width</code> over <code class="nds-inline-code lang-html">--max-col</code> when the ideal column count depends on available space rather than a fixed number</li>
                    <li>Do not use the grid for single-column page flow. Standard block layout handles this without extra markup</li>
                    <li>Do not nest <code class="nds-inline-code lang-html">.nds-grid</code> inside <code class="nds-inline-code lang-html">.nds-grid</code> for complex page structures. Use <a class="nds-color" href="{{ 'layout/section' | relative_url }}">Section</a> to organize content into visual blocks</li>
                    <li>Always set <code class="nds-inline-code lang-html">--min-col</code> or <code class="nds-inline-code lang-html">--min-track</code> (commonly to <code class="nds-inline-code lang-html">1</code> or <code class="nds-inline-code lang-html">1fr</code>) when using responsive tokens, so layouts collapse cleanly on narrow viewports</li>
                    <li>Override <code class="nds-inline-code lang-html">--gap</code> with a spacing token when the default <code class="nds-inline-code lang-html">var(--spacing-2xl)</code> is too wide for compact layouts like form fields or icon grids</li>
                </ul>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-center</code></td><td>Centers grid items horizontally (sets <code class="nds-inline-code lang-html">--justify: center</code>)</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--max-col</code></td><td>auto-fit</td><td>Column count at large viewport (961px+). Base value for the fallback chain</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--mid-col</code></td><td>var(--max-col)</td><td>Column count at medium viewport (601px to 960px)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--min-col</code></td><td>var(--mid-col)</td><td>Column count below 601px</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--max-track</code></td><td>(unset)</td><td>Explicit <code class="nds-inline-code lang-html">grid-template-columns</code> value at large viewport. Overrides <code class="nds-inline-code lang-html">--max-col</code></td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--mid-track</code></td><td>var(--max-track)</td><td>Track template at medium viewport</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--min-track</code></td><td>var(--mid-track)</td><td>Track template below 601px</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--min-width</code></td><td>0</td><td>Minimum column width inside <code class="nds-inline-code lang-html">minmax()</code> for auto-fit wrapping (e.g. 250px)</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--gap</code></td><td>var(--spacing-2xl)</td><td>Shorthand for both row and column gap. Halved automatically below the large breakpoint</td></tr>
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
