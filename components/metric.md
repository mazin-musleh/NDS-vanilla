---
layout: page
title: Metric
hero_title: Metric - National Design System
hero_description: A dashboard tile that pairs a key statistic with an inline sparkline so a value and its trend over time read at a glance.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Positive Trend -->
<section id="metricPositive" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Positive Trend</h2>
            <p class="nds-section-description">Compact layout with the stat on the inline-start and a sparkline on the inline-end. <code class="nds-inline-code lang-html">data-status="positive"</code> on the card colors the chart line, the trend label, and the header featured icon together.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-full", ".nds-card-metric", "metricPositiveLayout"]'>
                                <span class="nds-label">Full width</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-arrow", ".nds-card-metric-trend", "metricPositiveArrow"]'>
                                <span class="nds-label">Arrow icon</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-stroke", ".nds-card", "metricPositiveStroke"]'>
                                <span class="nds-label">Stroke</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-card", "metricPositiveStyle"]'>
                                <span class="nds-label">Shadow</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-card nds-stroke" data-status="positive">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-sm">
                                            <i class="nds-icon nds-hgi-trade-up" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <h3 class="nds-card-title">24h Views</h3>
                                    <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" aria-label="More options">
                                        <i class="nds-icon nds-hgi-more-vertical" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-metric">
                                        <div class="nds-card-metric-info">
                                            <span class="nds-card-metric-value">29,840</span>
                                            <p class="nds-card-metric-trend">
                                                <i class="nds-icon nds-hgi-trade-up" aria-hidden="true"></i>
                                                <strong>24%</strong>
                                                <span class="nds-card-metric-text">vs last week</span>
                                            </p>
                                        </div>
                                        <div class="nds-card-metric-chart">
                                            <div class="nds-chart"
                                                data-chart-type="line"
                                                data-chart-series='[{"name":"Views","data":[1500,4500,3000,4500,6000,4500,6000,8500,11000,13000,13000,14500,13000,11000,7800,7200,9500,11500,13000,14500,17000,19000,19000,17500,19500,22000,22000,25000,25000,29800]}]'
                                                data-chart-labels='["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7","Day 8","Day 9","Day 10","Day 11","Day 12","Day 13","Day 14","Day 15","Day 16","Day 17","Day 18","Day 19","Day 20","Day 21","Day 22","Day 23","Day 24","Day 25","Day 26","Day 27","Day 28","Day 29","Day 30"]'
                                                data-chart-config='{"height":110,"legend":{"show":false},"xaxis":{"show":false},"yaxis":{"show":false},"line":{"smooth":true,"area":true,"dots":false,"spotlight":22},"grid":{"show":false},"padding":{"top":0,"bottom":0,"left":0,"right":0}}'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card-actions">
                                    <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" aria-label="Settings">
                                        <i class="hgi hgi-stroke hgi-settings-02" aria-hidden="true"></i>
                                    </button>
                                    <a href="#" class="nds-btn nds-secondary-outline nds-md">View Report</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-metric-default-1" id="tab-metric-default-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-metric-default-1"
                                    aria-labelledby="tab-metric-default-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-card nds-stroke" data-status="positive"&gt;
  &lt;div class="nds-card-header"&gt;
    &lt;div class="nds-card-featured-icon"&gt;
      &lt;span class="nds-featured-icon nds-circle nds-sm"&gt;
        &lt;i class="nds-icon nds-hgi-trade-up" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
    &lt;/div&gt;
    &lt;h3 class="nds-card-title"&gt;24h Views&lt;/h3&gt;
    &lt;button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" aria-label="More options"&gt;
      &lt;i class="nds-icon nds-hgi-more-vertical" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="nds-card-content"&gt;
    &lt;div class="nds-card-metric"&gt;
      &lt;div class="nds-card-metric-info"&gt;
        &lt;span class="nds-card-metric-value"&gt;29,840&lt;/span&gt;
        &lt;p class="nds-card-metric-trend"&gt;
          &lt;i class="nds-icon nds-hgi-trade-up" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;strong&gt;24%&lt;/strong&gt;
          &lt;span class="nds-card-metric-text"&gt;vs last week&lt;/span&gt;
        &lt;/p&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-metric-chart"&gt;
        &lt;div class="nds-chart"
          data-chart-type="line"
          data-chart-series='[{"name":"Views","data":[1500,4500,3000,4500,6000,4500,6000,8500,11000,13000,13000,14500,13000,11000,7800,7200,9500,11500,13000,14500,17000,19000,19000,17500,19500,22000,22000,25000,25000,29800]}]'
          data-chart-labels='["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7","Day 8","Day 9","Day 10","Day 11","Day 12","Day 13","Day 14","Day 15","Day 16","Day 17","Day 18","Day 19","Day 20","Day 21","Day 22","Day 23","Day 24","Day 25","Day 26","Day 27","Day 28","Day 29","Day 30"]'
          data-chart-config='{"height":110,"legend":{"show":false},"xaxis":{"show":false},"yaxis":{"show":false},"line":{"smooth":true,"area":true,"dots":false,"spotlight":22},"grid":{"show":false},"padding":{"top":0,"bottom":0,"left":0,"right":0}}'&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card-actions"&gt;
    &lt;button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" aria-label="Settings"&gt;
      &lt;i class="hgi hgi-stroke hgi-settings-02" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/button&gt;
    &lt;a href="#" class="nds-btn nds-secondary-outline nds-md"&gt;View Report&lt;/a&gt;
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
    </div>
</section>

<!-- Negative Trend -->
<section id="metricNegative" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Negative Trend</h2>
            <p class="nds-section-description"><code class="nds-inline-code lang-html">data-status="negative"</code> repaints the same elements with the error palette. Pair with falling chart data so the visual story stays consistent.</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-full", ".nds-card-metric", "metricNegativeLayout"]'>
                                <span class="nds-label">Full width</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-arrow", ".nds-card-metric-trend", "metricNegativeArrow"]'>
                                <span class="nds-label">Arrow icon</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["nds-stroke", ".nds-card", "metricNegativeStroke"]'>
                                <span class="nds-label">Stroke</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["nds-shadow", ".nds-card", "metricNegativeStyle"]'>
                                <span class="nds-label">Shadow</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div class="nds-card nds-stroke" data-status="negative">
                                <div class="nds-card-header">
                                    <div class="nds-card-featured-icon">
                                        <span class="nds-featured-icon nds-circle nds-sm">
                                            <i class="nds-icon nds-hgi-trade-down" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <h3 class="nds-card-title">24h Views</h3>
                                    <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" aria-label="More options">
                                        <i class="nds-icon nds-hgi-more-vertical" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <div class="nds-card-content">
                                    <div class="nds-card-metric">
                                        <div class="nds-card-metric-info">
                                            <span class="nds-card-metric-value">3,200</span>
                                            <p class="nds-card-metric-trend">
                                                <i class="nds-icon nds-hgi-trade-down" aria-hidden="true"></i>
                                                <strong>32%</strong>
                                                <span class="nds-card-metric-text">vs last week</span>
                                            </p>
                                        </div>
                                        <div class="nds-card-metric-chart">
                                            <div class="nds-chart"
                                                data-chart-type="line"
                                                data-chart-series='[{"name":"Views","data":[29800,25000,25000,22000,22000,19500,17500,19000,19000,17000,14500,13000,11500,9500,7200,7800,11000,13000,14500,13000,13000,11000,8500,6000,4500,6000,4500,6000,4500,3000]}]'
                                                data-chart-labels='["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7","Day 8","Day 9","Day 10","Day 11","Day 12","Day 13","Day 14","Day 15","Day 16","Day 17","Day 18","Day 19","Day 20","Day 21","Day 22","Day 23","Day 24","Day 25","Day 26","Day 27","Day 28","Day 29","Day 30"]'
                                                data-chart-config='{"height":110,"legend":{"show":false},"xaxis":{"show":false},"yaxis":{"show":false},"line":{"smooth":true,"area":true,"dots":false,"spotlight":22},"grid":{"show":false},"padding":{"top":0,"bottom":0,"left":0,"right":0}}'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="nds-card-actions">
                                    <button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" aria-label="Settings">
                                        <i class="hgi hgi-stroke hgi-settings-02" aria-hidden="true"></i>
                                    </button>
                                    <a href="#" class="nds-btn nds-secondary-outline nds-md">View Report</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-metric-negative-1" id="tab-metric-negative-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example nds-expandable" role="tabpanel" id="panel-metric-negative-1"
                                    aria-labelledby="tab-metric-negative-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <div class="nds-expandable-content">
                                        <code class="lang-html code">
&lt;div class="nds-card nds-stroke" data-status="negative"&gt;
  &lt;div class="nds-card-header"&gt;
    &lt;div class="nds-card-featured-icon"&gt;
      &lt;span class="nds-featured-icon nds-circle nds-sm"&gt;
        &lt;i class="nds-icon nds-hgi-trade-down" aria-hidden="true"&gt;&lt;/i&gt;
      &lt;/span&gt;
    &lt;/div&gt;
    &lt;h3 class="nds-card-title"&gt;24h Views&lt;/h3&gt;
    &lt;button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" aria-label="More options"&gt;
      &lt;i class="nds-icon nds-hgi-more-vertical" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="nds-card-content"&gt;
    &lt;div class="nds-card-metric"&gt;
      &lt;div class="nds-card-metric-info"&gt;
        &lt;span class="nds-card-metric-value"&gt;3,200&lt;/span&gt;
        &lt;p class="nds-card-metric-trend"&gt;
          &lt;i class="nds-icon nds-hgi-trade-down" aria-hidden="true"&gt;&lt;/i&gt;
          &lt;strong&gt;32%&lt;/strong&gt;
          &lt;span class="nds-card-metric-text"&gt;vs last week&lt;/span&gt;
        &lt;/p&gt;
      &lt;/div&gt;
      &lt;div class="nds-card-metric-chart"&gt;
        &lt;div class="nds-chart"
          data-chart-type="line"
          data-chart-series='[{"name":"Views","data":[29800,25000,25000,22000,22000,19500,17500,19000,19000,17000,14500,13000,11500,9500,7200,7800,11000,13000,14500,13000,13000,11000,8500,6000,4500,6000,4500,6000,4500,3000]}]'
          data-chart-labels='["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7","Day 8","Day 9","Day 10","Day 11","Day 12","Day 13","Day 14","Day 15","Day 16","Day 17","Day 18","Day 19","Day 20","Day 21","Day 22","Day 23","Day 24","Day 25","Day 26","Day 27","Day 28","Day 29","Day 30"]'
          data-chart-config='{"height":110,"legend":{"show":false},"xaxis":{"show":false},"yaxis":{"show":false},"line":{"smooth":true,"area":true,"dots":false,"spotlight":22},"grid":{"show":false},"padding":{"top":0,"bottom":0,"left":0,"right":0}}'&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="nds-card-actions"&gt;
    &lt;button type="button" class="nds-btn nds-subtle nds-md nds-icon-only" aria-label="Settings"&gt;
      &lt;i class="hgi hgi-stroke hgi-settings-02" aria-hidden="true"&gt;&lt;/i&gt;
    &lt;/button&gt;
    &lt;a href="#" class="nds-btn nds-secondary-outline nds-md"&gt;View Report&lt;/a&gt;
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
    </div>
</section>

<!-- Built-in Features -->
<section id="metricFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-colors"></i>
                        <span class="nds-label">Trend Status Theming</span>
                    </span>
                    <p class="nds-item-desc">A single <code class="nds-inline-code lang-html">data-status</code> on the card colors the chart line, the trend label, and the header featured icon together.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-chart-line-data-01"></i>
                        <span class="nds-label">Inline Sparkline</span>
                    </span>
                    <p class="nds-item-desc">An embedded line chart with axes, legend, grid, and padding tuned out so the line fills the available space edge-to-edge.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layout-grid"></i>
                        <span class="nds-label">Compact and Full Layouts</span>
                    </span>
                    <p class="nds-item-desc">Default splits the body 60/40 between stat and chart; <code class="nds-inline-code lang-html">nds-full</code> stacks the chart full-width below the stat.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-text-align-left"></i>
                        <span class="nds-label">Always-LTR Sparklines</span>
                    </span>
                    <p class="nds-item-desc">The chart always reads oldest to newest left-to-right inside a metric card, even when the page is rendered RTL.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-layers-01"></i>
                        <span class="nds-label">Card Composition</span>
                    </span>
                    <p class="nds-item-desc">Drops into any card. Visual treatments such as <code class="nds-inline-code lang-html">nds-stroke</code>, <code class="nds-inline-code lang-html">nds-shadow</code>, and <code class="nds-inline-code lang-html">nds-color</code> remain consumer-controlled.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-paint-bucket"></i>
                        <span class="nds-label">Customizable Tokens</span>
                    </span>
                    <p class="nds-item-desc"><code class="nds-inline-code lang-html">--metric-trend-color</code> and <code class="nds-inline-code lang-html">--metric-chart-color</code> override the status palette per instance for branded or special-case metrics.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="metricGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use metrics on <strong>console and dashboard pages</strong> where stakeholders need to scan multiple KPIs and their direction at a glance.</li>
                    <li>Pair with the <a class="nds-color" href="{{ 'layout/grid' | relative_url }}">Grid</a> layout to assemble responsive metric panels (set <code class="nds-inline-code lang-html">--max-col</code> to control how many fit per row).</li>
                    <li>Do not use metrics for static numbers without a comparison period. A bare statistic belongs on a regular <a class="nds-color" href="{{ 'components/cards' | relative_url }}">Card</a> with the <code class="nds-inline-code lang-html">nds-statistic</code> modifier instead.</li>
                    <li>Do not use metrics for dense, multi-series data exploration. Use the <a class="nds-color" href="{{ 'components/chart' | relative_url }}">Chart</a> component directly when the chart itself is the focus.</li>
                    <li>Pick the <strong>compact layout</strong> when many metrics share a row. Pick <strong>full-width</strong> (<code class="nds-inline-code lang-html">nds-full</code>) when a single highlighted metric anchors a section and the chart deserves more room.</li>
                    <li>Use <code class="nds-inline-code lang-html">data-status="positive"</code> when the trend is favorable for the metric you are tracking, and <code class="nds-inline-code lang-html">data-status="negative"</code> when it is not. Direction matters more than raw sign: a falling bounce rate is positive.</li>
                    <li>Keep stat values short and self-evident: <code class="nds-inline-code lang-html">50%</code>, <code class="nds-inline-code lang-html">SAR 1.2M</code>, <code class="nds-inline-code lang-html">8,420</code>. Long values wrap and break the visual rhythm with the chart.</li>
                    <li>Sparkline data should have at least 15 to 20 points for the trend shape to read clearly. Very short series look stubby and lose the at-a-glance benefit.</li>
                    <li>Always supply chart data in chronological order (oldest to newest). The chart enforces left-to-right rendering inside metrics regardless of page direction.</li>
                    <li>Add a footer action like "View Report" so users can drill into the underlying data when the headline number raises a question.</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Modifier Classes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Class</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">nds-card-metric</code></td><td>Required wrapper inside <code class="nds-inline-code lang-html">.nds-card-content</code> that holds the stat and the chart.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-card-metric.nds-full</code></td><td>Stacks the chart full-width below the stat instead of the default 60/40 split.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-card-metric-info</code></td><td>Holds the value and the trend row; flexes alongside the chart in compact layout.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-card-metric-value</code></td><td>The big stat number. Uses display-clamp typography for fluid sizing.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-card-metric-trend</code></td><td>Inline row with the directional icon, the delta in <code class="nds-inline-code lang-html">&lt;strong&gt;</code>, and a comparison label.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-card-metric-trend.nds-arrow</code></td><td>Swaps the trade icon for a directional arrow (rotates per the card's data-status).</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">nds-card-metric-chart</code></td><td>Wraps the embedded <code class="nds-inline-code lang-html">.nds-chart</code>. Forces left-to-right reading.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Attribute</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">data-status="positive"</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-card</code>. Applies the success palette to the chart line, the trend text, and the header featured icon.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">data-status="negative"</code></td><td>Set on <code class="nds-inline-code lang-html">.nds-card</code>. Applies the error palette to the same three elements.</td></tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">CSS Custom Properties</h3>
                <table class="nds-table nds-responsive">
                    <thead><tr><th>Property</th><th>Default</th><th>Description</th></tr></thead>
                    <tbody>
                        <tr><td><code class="nds-inline-code lang-html">--metric-trend-color</code></td><td><code class="nds-inline-code lang-html">--text-default</code></td><td>Color of the trend arrow icon and the delta value. Overridden by <code class="nds-inline-code lang-html">data-status</code> on the card.</td></tr>
                        <tr><td><code class="nds-inline-code lang-html">--metric-chart-color</code></td><td><code class="nds-inline-code lang-html">--colors-primary-sa-flag-600</code></td><td>Color of the sparkline line and area gradient. Overridden by <code class="nds-inline-code lang-html">data-status</code> on the card.</td></tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>
