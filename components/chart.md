---
layout: page
title: Chart
hero_title: Chart Components - National Design System
hero_description: SVG chart components for visualizing data with bar, line, pie, and donut charts — zero external dependencies
breadcrumb: ["Components"]
lang: en
direction: ltr
---

<!-- Chart Types -->
<section id="chartTypes" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Chart Types</h2>
            <p class="nds-section-description">Four chart types with automatic color palettes, tooltips, legends, and responsive sizing. Use the toggle buttons to explore options live.</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <!-- Bar Chart -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Bar Chart</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["", "#demo-bar", "chartBarDL", "chart"]'
                                data-chart-opt='{"dataLabels":{"show":true}}'
                                data-chart-opt-off='{"dataLabels":{"show":false}}'
                                data-code-on="dataLabels: { show: true }"
                                data-code-off="dataLabels: { show: false }">
                                <span class="label">Data Labels</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["", "#demo-bar", "chartBarStack", "chart"]'
                                data-chart-opt='{"bar":{"stacked":true}}'
                                data-chart-opt-off='{"bar":{"stacked":false}}'
                                data-code-on="stacked: true,"
                                data-code-off="stacked: false,">
                                <span class="label">Stacked</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["", "#demo-bar", "chartBarGrid", "chart"]'
                                data-chart-opt='{"grid":{"show":true}}'
                                data-chart-opt-off='{"grid":{"show":false}}'
                                data-code-on="grid:    { show: true }"
                                data-code-off="grid:    { show: false }">
                                <span class="label">Grid</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["", "#demo-bar", "chartBarYAxis", "chart"]'
                                data-chart-opt='{"yaxis":{"show":true}}'
                                data-chart-opt-off='{"yaxis":{"show":false}}'
                                data-code-on="yaxis:   { show: true,"
                                data-code-off="yaxis:   { show: false,">
                                <span class="label">Y-Axis</span>
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
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chart-bar-html" id="tab-chart-bar-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-chart-bar-js" id="tab-chart-bar-js">
                                        <span class="nds-tab-label">JS</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-bar-html"
                                    aria-labelledby="tab-chart-bar-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div id="my-chart" class="nds-chart"></div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-bar-js"
                                    aria-labelledby="tab-chart-bar-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
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
  dataLabels: { show: true },          // Show values above bars
  grid:    { show: true },             // Horizontal gridlines
  yaxis:   { show: true, title: '' },  // Y-axis labels & title
  xaxis:   { show: true, title: '' },  // X-axis labels & title
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

                <!-- Line Chart -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Line Chart</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["", "#demo-line", "chartLineSmooth", "chart"]'
                                data-chart-opt='{"line":{"smooth":true}}'
                                data-chart-opt-off='{"line":{"smooth":false}}'
                                data-code-on="smooth: true,"
                                data-code-off="smooth: false,">
                                <span class="label">Smooth</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["", "#demo-line", "chartLineDots", "chart"]'
                                data-chart-opt='{"line":{"dots":true}}'
                                data-chart-opt-off='{"line":{"dots":false}}'
                                data-code-on="dots: true,"
                                data-code-off="dots: false,">
                                <span class="label">Dots</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["", "#demo-line", "chartLineArea", "chart"]'
                                data-chart-opt='{"line":{"area":true}}'
                                data-chart-opt-off='{"line":{"area":false}}'
                                data-code-on="area: true,"
                                data-code-off="area: false,">
                                <span class="label">Area</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["", "#demo-line", "chartLineGrid", "chart"]'
                                data-chart-opt='{"grid":{"show":true}}'
                                data-chart-opt-off='{"grid":{"show":false}}'
                                data-code-on="grid:    { show: true }"
                                data-code-off="grid:    { show: false }">
                                <span class="label">Grid</span>
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
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chart-line-html" id="tab-chart-line-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-chart-line-js" id="tab-chart-line-js">
                                        <span class="nds-tab-label">JS</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-line-html"
                                    aria-labelledby="tab-chart-line-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div id="my-chart" class="nds-chart"></div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-line-js"
                                    aria-labelledby="tab-chart-line-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
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

                <!-- Pie Chart -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Pie Chart</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["", "#demo-pie", "chartPieLabels", "chart"]'
                                data-chart-opt='{"dataLabels":{"show":true}}'
                                data-chart-opt-off='{"dataLabels":{"show":false}}'
                                data-code-on="dataLabels: { show: true }"
                                data-code-off="dataLabels: { show: false }">
                                <span class="label">Labels</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["", "#demo-pie", "chartPieStroke", "chart"]'
                                data-chart-opt='{"stroke":{"show":true,"width":2}}'
                                data-chart-opt-off='{"stroke":{"show":false}}'
                                data-code-on="show: true,                       // Stroke between slices"
                                data-code-off="show: false,                      // Stroke between slices">
                                <span class="label">Stroke</span>
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
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chart-pie-html" id="tab-chart-pie-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-chart-pie-js" id="tab-chart-pie-js">
                                        <span class="nds-tab-label">JS</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-pie-html"
                                    aria-labelledby="tab-chart-pie-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div id="my-chart" class="nds-chart"></div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-pie-js"
                                    aria-labelledby="tab-chart-pie-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-js code">
// Pie — series are plain numbers, not objects
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

                <!-- Donut Chart -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Donut Chart</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn selected"
                                data-toggler='["", "#demo-donut", "chartDonutLabels", "chart"]'
                                data-chart-opt='{"dataLabels":{"show":true}}'
                                data-chart-opt-off='{"dataLabels":{"show":false}}'
                                data-code-on="dataLabels: { show: true }"
                                data-code-off="dataLabels: { show: false }">
                                <span class="label">Labels</span>
                            </button>
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["", "#demo-donut", "chartDonutStroke", "chart"]'
                                data-chart-opt='{"stroke":{"show":true,"width":2}}'
                                data-chart-opt-off='{"stroke":{"show":false}}'
                                data-code-on="show: true,                       // Stroke between slices"
                                data-code-off="show: false,                      // Stroke between slices">
                                <span class="label">Stroke</span>
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
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chart-donut-html" id="tab-chart-donut-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-chart-donut-js" id="tab-chart-donut-js">
                                        <span class="nds-tab-label">JS</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-donut-html"
                                    aria-labelledby="tab-chart-donut-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div id="my-chart" class="nds-chart"></div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-donut-js"
                                    aria-labelledby="tab-chart-donut-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-js code">
// Donut — same as pie, with donut.size for inner hole
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
<section id="chartHtmlInit" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">HTML Initialization</h2>
            <p class="nds-section-description">Charts can also be initialized declaratively using data attributes</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Data Attributes</div>
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
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div class="nds-chart"
  data-chart-type="bar"
  data-chart-series='[{"name":"Q1","data":[30,40,35]},{"name":"Q2","data":[50,30,45]}]'
  data-chart-labels='["Jan","Feb","Mar"]'>
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

<!-- API Reference -->
<section id="chartApi" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">API Reference</h2>
            <p class="nds-section-description">Methods and configuration options</p>
        </div>
        <div class="nds-section-content">

            <div class="nds-content-block">
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
                                <td>NDS.Chart.create(el, opts)</td>
                                <td>Create a chart on an element (accepts selector string or DOM element)</td>
                            </tr>
                            <tr>
                                <td>NDS.Chart.init()</td>
                                <td>Auto-initialize all .nds-chart elements with data attributes</td>
                            </tr>
                            <tr>
                                <td>chart.update(opts)</td>
                                <td>Update chart with new options (merges with existing) and re-render</td>
                            </tr>
                            <tr>
                                <td>chart.destroy()</td>
                                <td>Remove chart, clean up listeners and observers</td>
                            </tr>
                        </tbody>
                </table>
            </div>

            <div class="nds-content-block">
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
                                <td>type</td>
                                <td>string</td>
                                <td>'bar'</td>
                                <td>'bar', 'line', 'pie', or 'donut'</td>
                            </tr>
                            <tr>
                                <td>series</td>
                                <td>array</td>
                                <td>—</td>
                                <td>Data series. Objects with name/data for bar/line, numbers for pie/donut</td>
                            </tr>
                            <tr>
                                <td>labels</td>
                                <td>array</td>
                                <td>—</td>
                                <td>Category labels for x-axis or pie slice names</td>
                            </tr>
                            <tr>
                                <td>height</td>
                                <td>number</td>
                                <td>350/300</td>
                                <td>Chart height in pixels (350 for bar/line, 300 for pie/donut)</td>
                            </tr>
                            <tr>
                                <td>colors</td>
                                <td>array</td>
                                <td>CSS vars</td>
                                <td>Override color palette with hex/rgb values</td>
                            </tr>
                            <tr>
                                <td>legend.show</td>
                                <td>boolean</td>
                                <td>true</td>
                                <td>Show/hide legend</td>
                            </tr>
                            <tr>
                                <td>legend.position</td>
                                <td>string</td>
                                <td>'top'/'bottom'</td>
                                <td>'top' for bar/line, 'bottom' for pie/donut</td>
                            </tr>
                            <tr>
                                <td>tooltip.show</td>
                                <td>boolean</td>
                                <td>true</td>
                                <td>Show/hide hover tooltips</td>
                            </tr>
                        </tbody>
                </table>
            </div>

            <div class="nds-content-block">
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
                                <td>bar.stacked</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Stack bars on top of each other</td>
                            </tr>
                            <tr>
                                <td>bar.borderRadius</td>
                                <td>number</td>
                                <td>6</td>
                                <td>Corner radius for bar tops</td>
                            </tr>
                            <tr>
                                <td>bar.gap</td>
                                <td>number</td>
                                <td>0.3</td>
                                <td>Gap ratio between groups (0–1)</td>
                            </tr>
                            <tr>
                                <td>dataLabels.show</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Show value labels above bars</td>
                            </tr>
                        </tbody>
                </table>
            </div>

            <div class="nds-content-block">
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
                                <td>line.smooth</td>
                                <td>boolean</td>
                                <td>true</td>
                                <td>Smooth curves (Catmull-Rom) vs straight segments</td>
                            </tr>
                            <tr>
                                <td>line.dots</td>
                                <td>boolean</td>
                                <td>true</td>
                                <td>Show data point dots</td>
                            </tr>
                            <tr>
                                <td>line.dotRadius</td>
                                <td>number</td>
                                <td>4</td>
                                <td>Dot radius in pixels</td>
                            </tr>
                            <tr>
                                <td>line.width</td>
                                <td>number</td>
                                <td>2</td>
                                <td>Line stroke width</td>
                            </tr>
                            <tr>
                                <td>line.area</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Fill area under lines</td>
                            </tr>
                        </tbody>
                </table>
            </div>

            <div class="nds-content-block">
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
                                <td>grid.show</td>
                                <td>boolean</td>
                                <td>true</td>
                                <td>Show horizontal gridlines</td>
                            </tr>
                            <tr>
                                <td>yaxis.show</td>
                                <td>boolean</td>
                                <td>true</td>
                                <td>Show y-axis value labels</td>
                            </tr>
                            <tr>
                                <td>yaxis.title</td>
                                <td>string</td>
                                <td>''</td>
                                <td>Y-axis title (rendered vertically)</td>
                            </tr>
                            <tr>
                                <td>xaxis.show</td>
                                <td>boolean</td>
                                <td>true</td>
                                <td>Show x-axis category labels</td>
                            </tr>
                            <tr>
                                <td>xaxis.title</td>
                                <td>string</td>
                                <td>''</td>
                                <td>X-axis title</td>
                            </tr>
                        </tbody>
                </table>
            </div>

            <div class="nds-content-block">
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
                                <td>donut.size</td>
                                <td>number</td>
                                <td>0.5</td>
                                <td>Inner hole ratio (0–1, donut only)</td>
                            </tr>
                            <tr>
                                <td>stroke.show</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Show stroke between slices</td>
                            </tr>
                            <tr>
                                <td>stroke.width</td>
                                <td>number</td>
                                <td>2</td>
                                <td>Stroke width</td>
                            </tr>
                            <tr>
                                <td>stroke.color</td>
                                <td>string</td>
                                <td>'#fff'</td>
                                <td>Stroke color</td>
                            </tr>
                            <tr>
                                <td>startAngle</td>
                                <td>number</td>
                                <td>0</td>
                                <td>Starting angle in degrees</td>
                            </tr>
                        </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<!-- Theming -->
<section id="chartTheming" class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Theming</h2>
            <p class="nds-section-description">Override CSS custom properties to customize chart appearance</p>
        </div>
        <div class="nds-section-content">

            <div class="nds-content-block">
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
                                <td>--chart-color-1 … 6</td>
                                <td>Series color palette (6 colors, auto-wraps)</td>
                            </tr>
                            <tr>
                                <td>--chart-grid-color</td>
                                <td>Gridline color</td>
                            </tr>
                            <tr>
                                <td>--chart-text</td>
                                <td>Axis label and title color</td>
                            </tr>
                            <tr>
                                <td>--chart-label</td>
                                <td>Data label, legend, and tooltip text color</td>
                            </tr>
                            <tr>
                                <td>--chart-radius</td>
                                <td>Tooltip border radius</td>
                            </tr>
                            <tr>
                                <td>--chart-area-opacity</td>
                                <td>Area fill opacity for line charts</td>
                            </tr>
                            <tr>
                                <td>--chart-tooltip-bg</td>
                                <td>Tooltip background color</td>
                            </tr>
                            <tr>
                                <td>--chart-tooltip-border</td>
                                <td>Tooltip border color</td>
                            </tr>
                            <tr>
                                <td>--chart-pie-label-fill</td>
                                <td>Pie/donut percentage label color (on slices)</td>
                            </tr>
                            <tr>
                                <td>--chart-dot-fill</td>
                                <td>Line chart dot fill color</td>
                            </tr>
                        </tbody>
                </table>
            </div>

            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Custom Theme Example</div>
                        <div class="demo-action">
                            <button class="nds-btn nds-sm nds-subtle demo-toggle-btn"
                                data-toggler='["", "#demo-themed", "chartThemedDL", "chart"]'
                                data-chart-opt='{"dataLabels":{"show":true}}'
                                data-chart-opt-off='{"dataLabels":{"show":false}}'>
                                <span class="label">Data Labels</span>
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
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
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
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div id="my-chart" class="nds-chart my-chart"></div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-theme-css"
                                    aria-labelledby="tab-chart-theme-css" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
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

<script>
document.addEventListener('DOMContentLoaded', function () {

    // ── Create demo charts ────────────────────────────────────────

    NDS.Chart.create('#demo-bar', {
        type: 'bar',
        series: [
            { name: 'Completed', data: [12, 18, 15, 22, 28, 20] },
            { name: 'In Progress', data: [8, 10, 14, 9, 12, 15] },
            { name: 'Pending', data: [5, 7, 6, 4, 3, 8] },
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        dataLabels: { show: true },
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
