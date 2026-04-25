---
layout: page
title: Chart
hero_title: Chart - National Design System
hero_description: Visualize data with bar, line, pie, and donut charts that render as pure SVG with built-in theming, tooltips, and responsive sizing
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
---

<!-- Bar Chart -->
<section id="chartBar" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Bar Chart</h2>
            <p class="nds-section-description">Grouped or stacked bars for comparing categories across series</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["", "#demo-bar", "chartBarDL", "chart"]'
                                data-chart-opt='{"dataLabels":{"show":true}}'
                                data-chart-opt-off='{"dataLabels":{"show":false}}'
                                data-code-on="dataLabels: { show: true }"
                                data-code-off="dataLabels: { show: false }">
                                <span class="nds-label">Data Labels</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["", "#demo-bar", "chartBarStack", "chart"]'
                                data-chart-opt='{"bar":{"stacked":true}}'
                                data-chart-opt-off='{"bar":{"stacked":false}}'
                                data-code-on="stacked: true,"
                                data-code-off="stacked: false,">
                                <span class="nds-label">Stacked</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["", "#demo-bar", "chartBarGrid", "chart"]'
                                data-chart-opt='{"grid":{"show":true}}'
                                data-chart-opt-off='{"grid":{"show":false}}'
                                data-code-on="grid:    { show: true }"
                                data-code-off="grid:    { show: false }">
                                <span class="nds-label">Grid</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["", "#demo-bar", "chartBarYAxis", "chart"]'
                                data-chart-opt='{"yaxis":{"show":true}}'
                                data-chart-opt-off='{"yaxis":{"show":false}}'
                                data-code-on="yaxis:   { show: true,"
                                data-code-off="yaxis:   { show: false,">
                                <span class="nds-label">Y-Axis</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="demo-bar" class="nds-chart"></div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chart-bar-html" id="tab-chart-bar-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-chart-bar-js" id="tab-chart-bar-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-bar-html"
                                    aria-labelledby="tab-chart-bar-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div id="my-chart" class="nds-chart"&gt;&lt;/div&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-bar-js"
                                    aria-labelledby="tab-chart-bar-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-js code">
NDS.Chart.create('#my-chart', {
  type: 'bar',
  series: [
    { name: 'Completed', data: [12, 18, 15, 22, 28, 20] },
    { name: 'In Progress', data: [8, 10, 14, 9, 12, 15] },
    { name: 'Pending', data: [5, 7, 6, 4, 3, 8] },
  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  height: 350,                         // Chart height (px)
  bar: {
    stacked: false,                    // Stack series on top of each other
    borderRadius: 6,                   // Corner radius for bar tops
    gap: 0.3,                          // Gap between groups (0–1)
  },
  dataLabels: { show: true, format: '%' }, // Show values above bars (suffix)
  grid:    { show: true },             // Horizontal gridlines
  yaxis:   { show: true, title: '' },  // Y-axis labels &amp; title
  xaxis:   { show: true, title: '' },  // X-axis labels &amp; title
  legend:  { show: true, position: 'top' },
  tooltip: { show: true },
  // colors: ['#1B8354', '#54C08A'],   // Optional palette override
});
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

<!-- Line Chart -->
<section id="chartLine" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Line Chart</h2>
            <p class="nds-section-description">Smooth or straight lines for tracking trends over time, with optional area fill</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["", "#demo-line", "chartLineSmooth", "chart"]'
                                data-chart-opt='{"line":{"smooth":true}}'
                                data-chart-opt-off='{"line":{"smooth":false}}'
                                data-code-on="smooth: true,"
                                data-code-off="smooth: false,">
                                <span class="nds-label">Smooth</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["", "#demo-line", "chartLineDots", "chart"]'
                                data-chart-opt='{"line":{"dots":true}}'
                                data-chart-opt-off='{"line":{"dots":false}}'
                                data-code-on="dots: true,"
                                data-code-off="dots: false,">
                                <span class="nds-label">Dots</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["", "#demo-line", "chartLineArea", "chart"]'
                                data-chart-opt='{"line":{"area":true}}'
                                data-chart-opt-off='{"line":{"area":false}}'
                                data-code-on="area: true,"
                                data-code-off="area: false,">
                                <span class="nds-label">Area</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["", "#demo-line", "chartLineGrid", "chart"]'
                                data-chart-opt='{"grid":{"show":true}}'
                                data-chart-opt-off='{"grid":{"show":false}}'
                                data-code-on="grid:    { show: true }"
                                data-code-off="grid:    { show: false }">
                                <span class="nds-label">Grid</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="demo-line" class="nds-chart"></div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chart-line-html" id="tab-chart-line-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-chart-line-js" id="tab-chart-line-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-line-html"
                                    aria-labelledby="tab-chart-line-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div id="my-chart" class="nds-chart"&gt;&lt;/div&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-line-js"
                                    aria-labelledby="tab-chart-line-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-js code">
NDS.Chart.create('#my-chart', {
  type: 'line',
  series: [
    { name: 'Sessions', data: [10, 41, 35, 51, 49, 62, 69, 91, 80] },
    { name: 'Page Views', data: [23, 42, 35, 27, 43, 22, 17, 31, 48] },
  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  height: 350,                         // Chart height (px)
  line: {
    smooth: true,                      // Catmull-Rom curves (false = straight)
    dots: true,                        // Show data point circles
    dotRadius: 4,                      // Dot radius (px)
    width: 2,                          // Line stroke width (px)
    area: false,                       // Fill area under lines
  },
  grid:    { show: true },             // Horizontal gridlines
  yaxis:   { show: true, title: 'Active users' },
  xaxis:   { show: true, title: 'Month' },
  legend:  { show: true, position: 'top' },
  tooltip: { show: true },
});
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

<!-- Pie Chart -->
<section id="chartPie" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Pie Chart</h2>
            <p class="nds-section-description">Proportional segments for showing distribution of a whole</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["", "#demo-pie", "chartPieLabels", "chart"]'
                                data-chart-opt='{"dataLabels":{"show":true}}'
                                data-chart-opt-off='{"dataLabels":{"show":false}}'
                                data-code-on="dataLabels: { show: true }"
                                data-code-off="dataLabels: { show: false }">
                                <span class="nds-label">Labels</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["", "#demo-pie", "chartPieStroke", "chart"]'
                                data-chart-opt='{"stroke":{"show":true,"width":2}}'
                                data-chart-opt-off='{"stroke":{"show":false}}'
                                data-code-on="show: true,                       // Stroke between slices"
                                data-code-off="show: false,                      // Stroke between slices">
                                <span class="nds-label">Stroke</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="demo-pie" class="nds-chart" style="max-width: 400px;"></div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chart-pie-html" id="tab-chart-pie-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-chart-pie-js" id="tab-chart-pie-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-pie-html"
                                    aria-labelledby="tab-chart-pie-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div id="my-chart" class="nds-chart"&gt;&lt;/div&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-pie-js"
                                    aria-labelledby="tab-chart-pie-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-js code">
// Pie: series are plain numbers, not objects
NDS.Chart.create('#my-chart', {
  type: 'pie',
  series: [44, 55, 13, 43],
  labels: ['Services', 'Products', 'Support', 'Other'],
  height: 300,                         // Chart size (px)
  startAngle: 0,                       // Starting angle (degrees)
  stroke: {
    show: false,                       // Stroke between slices
    width: 2,                          // Stroke width
    color: '#fff',                     // Stroke color
  },
  dataLabels: { show: true },           // Percentage labels on slices
  legend:  { show: true, position: 'bottom' },
  tooltip: { show: true },
});
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

<!-- Donut Chart -->
<section id="chartDonut" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Donut Chart</h2>
            <p class="nds-section-description">Pie chart with an inner hole for a cleaner look or center content</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn" data-state="selected"
                                data-toggler='["", "#demo-donut", "chartDonutLabels", "chart"]'
                                data-chart-opt='{"dataLabels":{"show":true}}'
                                data-chart-opt-off='{"dataLabels":{"show":false}}'
                                data-code-on="dataLabels: { show: true }"
                                data-code-off="dataLabels: { show: false }">
                                <span class="nds-label">Labels</span>
                            </button>
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["", "#demo-donut", "chartDonutStroke", "chart"]'
                                data-chart-opt='{"stroke":{"show":true,"width":2}}'
                                data-chart-opt-off='{"stroke":{"show":false}}'
                                data-code-on="show: true,                       // Stroke between slices"
                                data-code-off="show: false,                      // Stroke between slices">
                                <span class="nds-label">Stroke</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="demo-donut" class="nds-chart" style="max-width: 400px;"></div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chart-donut-html" id="tab-chart-donut-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-chart-donut-js" id="tab-chart-donut-js">
                                        <span class="nds-tab-label">JavaScript</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-donut-html"
                                    aria-labelledby="tab-chart-donut-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div id="my-chart" class="nds-chart"&gt;&lt;/div&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-donut-js"
                                    aria-labelledby="tab-chart-donut-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-js code">
// Donut: same as pie, with donut.size for inner hole
NDS.Chart.create('#my-chart', {
  type: 'donut',
  series: [35, 25, 20, 20],
  labels: ['Completed', 'In Progress', 'Review', 'Pending'],
  height: 300,
  donut: {
    size: 0.5,                         // Inner hole ratio (0–1)
  },
  startAngle: 0,
  stroke: {
    show: false,                       // Stroke between slices
    width: 2,
    color: '#fff',
  },
  dataLabels: { show: true },
  legend:  { show: true, position: 'bottom' },
  tooltip: { show: true },
});
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

<!-- HTML Init -->
<section id="chartHtmlInit" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">HTML Initialization</h2>
            <p class="nds-section-description">Charts can also be initialized declaratively using data attributes</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="demo-html-init" class="nds-chart"
                                data-chart-type="bar"
                                data-chart-series='[{"name":"Q1","data":[30,40,35]},{"name":"Q2","data":[50,30,45]}]'
                                data-chart-labels='["Jan","Feb","Mar"]'>
                            </div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chart-html-1" id="tab-chart-html-1">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-html-1"
                                    aria-labelledby="tab-chart-html-1">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div class="nds-chart"
  data-chart-type="bar"
  data-chart-series='[{"name":"Q1","data":[30,40,35]},{"name":"Q2","data":[50,30,45]}]'
  data-chart-labels='["Jan","Feb","Mar"]'&gt;
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

<!-- Theming -->
<section id="chartTheming" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Theming</h2>
            <p class="nds-section-description">Override CSS custom properties to customize chart colors without changing JavaScript options</p>
        </div>
        <div class="nds-section-body">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-action">
                            <button class="nds-btn nds-subtle demo-toggle-btn"
                                data-toggler='["", "#demo-themed", "chartThemedDL", "chart"]'
                                data-chart-opt='{"dataLabels":{"show":true}}'
                                data-chart-opt-off='{"dataLabels":{"show":false}}'>
                                <span class="nds-label">Data Labels</span>
                            </button>
                        </div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="demo-themed" class="nds-chart" style="--chart-color-1: #6366F1; --chart-color-2: #A78BFA; --chart-color-3: #C4B5FD;"></div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container nds-scroll-more">
                                <nav class="nds-tab-list nds-scroll-more-content oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chart-theme-html" id="tab-chart-theme-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-chart-theme-css" id="tab-chart-theme-css">
                                        <span class="nds-tab-label">CSS</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-theme-html"
                                    aria-labelledby="tab-chart-theme-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
&lt;div id="my-chart" class="nds-chart my-chart"&gt;&lt;/div&gt;
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-theme-css"
                                    aria-labelledby="tab-chart-theme-css" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle nds-copy" aria-label="Copy code example">
                                            <i class="nds-icon nds-hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-css code">
.my-chart {
  --chart-color-1: #6366F1;
  --chart-color-2: #A78BFA;
  --chart-color-3: #C4B5FD;
}
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
<section id="chartFeatures" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Built-in Features</h2>
        </div>
        <div class="nds-section-body">
            <div class="nds-definition-list nds-divided nds-grid nds-doc-features">
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-plug-socket"></i>
                        <span class="nds-label">Auto-initialization</span>
                    </span>
                    <p class="nds-item-desc">Charts with <code class="nds-inline-code lang-html">data-chart-*</code> attributes initialize on page load. Call <code class="nds-inline-code lang-js">NDS.Chart.init()</code> to re-scan after adding new chart elements dynamically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-resize-01"></i>
                        <span class="nds-label">Responsive Sizing</span>
                    </span>
                    <p class="nds-item-desc">Charts resize automatically when their container width changes. No manual resize calls needed.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-customize"></i>
                        <span class="nds-label">CSS Theming</span>
                    </span>
                    <p class="nds-item-desc">Override colors, grid, tooltips, and labels with CSS custom properties. Dark mode adapts automatically.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-analytics-up"></i>
                        <span class="nds-label">Smart Scaling</span>
                    </span>
                    <p class="nds-item-desc">Automatic nice-number axis scaling, number formatting (K/M suffixes), and legend wrapping.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-printer"></i>
                        <span class="nds-label">Print and Accessibility</span>
                    </span>
                    <p class="nds-item-desc">Tooltips hidden in print, transitions disabled for reduced-motion preference. SVG output includes ARIA labels for screen readers.</p>
                </div>
                <div class="nds-definition-item">
                    <span class="nds-item-title">
                        <i class="hgi hgi-stroke hgi-chart-line-data-01"></i>
                        <span class="nds-label">Programmatic Control</span>
                    </span>
                    <p class="nds-item-desc">Create, update, and destroy charts with <code class="nds-inline-code lang-js">NDS.Chart.create()</code>. Options deep-merge on update for live reconfiguration.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Usage Guidelines -->
<section id="chartGuidelines" class="nds-content-section nds-demo-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Usage Guidelines</h2>
        </div>
        <div class="nds-section-body">

            <div class="nds-block">
                <h3 class="nds-block-title">Best Practices</h3>
                <ul>
                    <li>Use <strong>bar charts</strong> for comparing discrete categories or tracking changes across periods. Use stacked mode when the total matters as much as individual values</li>
                    <li>Use <strong>line charts</strong> for continuous data, trends, and time series. Enable area fill to emphasize volume over shape</li>
                    <li>Use <strong>pie or donut charts</strong> for showing proportions of a whole. Keep to 6 or fewer segments so the chart stays readable</li>
                    <li>Avoid pie charts when differences between segments are small. A bar chart makes small differences easier to compare</li>
                    <li>For simple numbers without trends, use a <a href="{{ 'components/statistic-card' | relative_url }}">Statistic Card</a> instead of a chart</li>
                    <li>Use HTML <code class="nds-inline-code lang-html">data-chart-*</code> attributes for static charts that don't change. Use the JS API for dynamic or user-driven data that updates after load</li>
                    <li>Set axis titles (<code class="nds-inline-code lang-js">yaxis.title</code>, <code class="nds-inline-code lang-js">xaxis.title</code>) to label what the numbers represent. Without titles, the chart relies on the legend alone</li>
                    <li>Override <code class="nds-inline-code lang-html">--chart-color-*</code> properties to match your project's brand palette. The default palette uses Saudi flag green tones</li>
                    <li>Charts auto-resize via ResizeObserver. No manual resize calls are needed when the container width changes</li>
                </ul>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Methods</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-js">NDS.Chart.create(el, opts)</code></td>
                            <td>Create a chart on an element (accepts selector string or DOM element)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">NDS.Chart.init()</code></td>
                            <td>Auto-initialize all <code class="nds-inline-code lang-html">.nds-chart</code> elements with data attributes</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">chart.update(opts)</code></td>
                            <td>Update chart with new options (merges with existing) and re-render</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">chart.destroy()</code></td>
                            <td>Remove chart, clean up listeners and observers</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Common Options</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-js">type</code></td>
                            <td>string</td>
                            <td><code class="nds-inline-code lang-js">'bar'</code></td>
                            <td><code class="nds-inline-code lang-js">'bar'</code>, <code class="nds-inline-code lang-js">'line'</code>, <code class="nds-inline-code lang-js">'pie'</code>, or <code class="nds-inline-code lang-js">'donut'</code></td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">series</code></td>
                            <td>array</td>
                            <td>required</td>
                            <td>Data series. Objects with name/data for bar/line, numbers for pie/donut</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">labels</code></td>
                            <td>array</td>
                            <td>required</td>
                            <td>Category labels for x-axis or pie slice names</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">height</code></td>
                            <td>number</td>
                            <td>350/300</td>
                            <td>Chart height in pixels (350 for bar/line, 300 for pie/donut)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">colors</code></td>
                            <td>array</td>
                            <td>CSS vars</td>
                            <td>Override color palette with hex/rgb values</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">legend.show</code></td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Show/hide legend</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">legend.position</code></td>
                            <td>string</td>
                            <td><code class="nds-inline-code lang-js">'top'</code>/<code class="nds-inline-code lang-js">'bottom'</code></td>
                            <td><code class="nds-inline-code lang-js">'top'</code> for bar/line, <code class="nds-inline-code lang-js">'bottom'</code> for pie/donut</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">tooltip.show</code></td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Show/hide hover tooltips</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Bar Options</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-js">bar.stacked</code></td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Stack bars on top of each other</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">bar.borderRadius</code></td>
                            <td>number</td>
                            <td>6</td>
                            <td>Corner radius for bar tops</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">bar.gap</code></td>
                            <td>number</td>
                            <td>0.3</td>
                            <td>Gap ratio between groups (0-1)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">dataLabels.show</code></td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Show value labels above bars</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">dataLabels.format</code></td>
                            <td>string | function</td>
                            <td>none</td>
                            <td>Append a suffix to values: <code class="nds-inline-code lang-js">'%'</code> turns 75 into "75%". For custom logic, pass a function: <code class="nds-inline-code lang-js">v =&gt; v + ' SAR'</code>. Applied to data labels, Y-axis labels, and tooltips</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Line Options</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-js">line.smooth</code></td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Smooth curves (Catmull-Rom) vs straight segments</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">line.dots</code></td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Show data point dots</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">line.dotRadius</code></td>
                            <td>number</td>
                            <td>4</td>
                            <td>Dot radius in pixels</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">line.width</code></td>
                            <td>number</td>
                            <td>2</td>
                            <td>Line stroke width</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">line.area</code></td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Fill area under lines</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Axis Options (bar + line)</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-js">grid.show</code></td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Show horizontal gridlines</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">yaxis.show</code></td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Show y-axis value labels</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">yaxis.title</code></td>
                            <td>string</td>
                            <td><code class="nds-inline-code lang-js">''</code></td>
                            <td>Y-axis title (rendered vertically)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">xaxis.show</code></td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Show x-axis category labels</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">xaxis.title</code></td>
                            <td>string</td>
                            <td><code class="nds-inline-code lang-js">''</code></td>
                            <td>X-axis title</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Pie / Donut Options</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-js">donut.size</code></td>
                            <td>number</td>
                            <td>0.5</td>
                            <td>Inner hole ratio (0-1, donut only)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">stroke.show</code></td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Show stroke between slices</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">stroke.width</code></td>
                            <td>number</td>
                            <td>2</td>
                            <td>Stroke width</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">stroke.color</code></td>
                            <td>string</td>
                            <td><code class="nds-inline-code lang-js">'#fff'</code></td>
                            <td>Stroke color</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-js">startAngle</code></td>
                            <td>number</td>
                            <td>0</td>
                            <td>Starting angle in degrees</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="nds-block">
                <h3 class="nds-block-title">Data Attributes</h3>
                <table class="nds-table nds-responsive">
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-chart-type</code></td>
                            <td>Chart type: <code class="nds-inline-code lang-html">bar</code>, <code class="nds-inline-code lang-html">line</code>, <code class="nds-inline-code lang-html">pie</code>, or <code class="nds-inline-code lang-html">donut</code></td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-chart-series</code></td>
                            <td>JSON array of series data. Objects with <code class="nds-inline-code lang-js">name</code> and <code class="nds-inline-code lang-js">data</code> for bar/line, plain numbers for pie/donut.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-chart-labels</code></td>
                            <td>JSON array of category labels for x-axis or pie slice names.</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">data-chart-config</code></td>
                            <td>JSON object with full chart options. Overrides individual data attributes when both are present.</td>
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
                            <td><code class="nds-inline-code lang-html">--chart-color-1</code> to <code class="nds-inline-code lang-html">--chart-color-6</code></td>
                            <td>Series color palette (6 colors, auto-wraps beyond 6)</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--chart-grid-color</code></td>
                            <td>Gridline color</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--chart-text</code></td>
                            <td>Axis label and title color</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--chart-label</code></td>
                            <td>Data label, legend, and tooltip text color</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--chart-radius</code></td>
                            <td>Tooltip border radius</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--chart-area-opacity</code></td>
                            <td>Area fill opacity for line charts</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--chart-tooltip-bg</code></td>
                            <td>Tooltip background color</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--chart-tooltip-border</code></td>
                            <td>Tooltip border color</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--chart-pie-label-1</code> to <code class="nds-inline-code lang-html">--chart-pie-label-6</code></td>
                            <td>Pie/donut percentage label color per slice</td>
                        </tr>
                        <tr>
                            <td><code class="nds-inline-code lang-html">--chart-dot-fill</code></td>
                            <td>Line chart dot fill color</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function () {

    NDS.Chart.create('#demo-bar', {
        type: 'bar',
        series: [
            { name: 'Completed', data: [12, 18, 15, 22, 28, 20] },
            { name: 'In Progress', data: [8, 10, 14, 9, 12, 15] },
            { name: 'Pending', data: [5, 7, 6, 4, 3, 8] },
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        dataLabels: { show: true, format: '%'},
    });

    NDS.Chart.create('#demo-line', {
        type: 'line',
        series: [
            { name: 'Sessions', data: [10, 41, 35, 51, 49, 62, 69, 91, 80] },
            { name: 'Page Views', data: [23, 42, 35, 27, 43, 22, 17, 31, 48] },
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        yaxis: { title: 'Active users' },
        xaxis: { title: 'Month' },
    });

    NDS.Chart.create('#demo-pie', {
        type: 'pie',
        series: [44, 55, 13, 43],
        labels: ['Services', 'Products', 'Support', 'Other'],
    });

    NDS.Chart.create('#demo-donut', {
        type: 'donut',
        series: [35, 25, 20, 20],
        labels: ['Completed', 'In Progress', 'Review', 'Pending'],
    });

    NDS.Chart.create('#demo-themed', {
        type: 'bar',
        series: [
            { name: 'Downloads', data: [28, 45, 62, 38, 55] },
        ],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    });
});
</script>
