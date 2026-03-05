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
            <p class="nds-section-description">Four chart types with automatic color palettes, tooltips, legends, and responsive sizing</p>
        </div>
        <div class="nds-section-content">
            <div class="nds-showcase">

                <!-- Bar Chart -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Bar Chart</div>
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
NDSChart.create('#my-chart', {
  type: 'bar',
  series: [
    { name: 'Revenue', data: [44, 55, 57, 56, 61, 58] },
    { name: 'Expenses', data: [35, 41, 36, 26, 45, 48] },
  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  dataLabels: { show: true },
});
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stacked Bar Chart -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Stacked Bar Chart</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="demo-stacked-bar" class="nds-chart"></div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chart-stacked-html" id="tab-chart-stacked-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-chart-stacked-js" id="tab-chart-stacked-js">
                                        <span class="nds-tab-label">JS</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-stacked-html"
                                    aria-labelledby="tab-chart-stacked-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div id="my-chart" class="nds-chart"></div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-stacked-js"
                                    aria-labelledby="tab-chart-stacked-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-js code">
NDSChart.create('#my-chart', {
  type: 'bar',
  series: [
    { name: 'Completed', data: [44, 55, 41, 67, 22, 43] },
    { name: 'In Progress', data: [13, 23, 20, 8, 13, 27] },
    { name: 'Pending', data: [11, 17, 15, 15, 21, 14] },
  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  bar: { stacked: true, borderRadius: 8 },
  dataLabels: { show: true },
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
NDSChart.create('#my-chart', {
  type: 'line',
  series: [
    { name: 'Sessions', data: [10, 41, 35, 51, 49, 62, 69, 91, 80] },
    { name: 'Page Views', data: [23, 42, 35, 27, 43, 22, 17, 31, 48] },
  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  yaxis: { title: 'Active users' },
  xaxis: { title: 'Month' },
});
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Area Chart -->
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Area Chart</div>
                    </div>
                    <div class="demo-container">
                        <div class="state-demo">
                            <div id="demo-area" class="nds-chart"></div>
                        </div>
                    </div>
                    <div class="demo-code">
                        <div class="nds-tabs nds-code nds-divided" hidden>
                            <div class="nds-tab-list-container">
                                <nav class="nds-tab-list oneRowContent" role="tablist" aria-label="Tab navigation">
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true"
                                        aria-controls="panel-chart-area-html" id="tab-chart-area-html">
                                        <span class="nds-tab-label">HTML</span>
                                    </button>
                                    <button class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false"
                                        aria-controls="panel-chart-area-js" id="tab-chart-area-js">
                                        <span class="nds-tab-label">JS</span>
                                    </button>
                                </nav>
                            </div>
                            <div class="nds-tab-content">
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-area-html"
                                    aria-labelledby="tab-chart-area-html">
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-html code">
<div id="my-chart" class="nds-chart"></div>
                                    </code>
                                </div>
                                <div class="nds-tab-panel code-example" role="tabpanel" id="panel-chart-area-js"
                                    aria-labelledby="tab-chart-area-js" hidden>
                                    <div class="nds-code-action">
                                        <button class="nds-btn nds-subtle copy-btn" aria-label="Copy code example">
                                            <i class="hgi hgi-stroke hgi-copy-01"></i>
                                        </button>
                                    </div>
                                    <code class="lang-js code">
NDSChart.create('#my-chart', {
  type: 'line',
  series: [
    { name: 'Users', data: [31, 40, 28, 51, 42, 109, 100] },
    { name: 'Sessions', data: [11, 32, 45, 32, 34, 52, 41] },
    { name: 'Bounces', data: [5, 18, 22, 10, 15, 30, 20] },
  ],
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  line: { area: true, smooth: true },
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
NDSChart.create('#my-chart', {
  type: 'pie',
  series: [44, 55, 13, 43],
  labels: ['Services', 'Products', 'Support', 'Other'],
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
NDSChart.create('#my-chart', {
  type: 'donut',
  series: [35, 25, 20, 20],
  labels: ['Completed', 'In Progress', 'Review', 'Pending'],
  donut: { size: 0.5 },
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
            <p class="nds-section-description">Configuration options and methods</p>
        </div>
        <div class="nds-section-content">

            <div class="nds-content-block">
                <h3 class="nds-block-title">Methods</h3>
                <div class="nds-table-container">
                    <table class="nds-table">
                        <thead>
                            <tr>
                                <th>Method</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>NDSChart.create(el, opts)</td>
                                <td>Create a chart on an element (accepts selector string or DOM element)</td>
                            </tr>
                            <tr>
                                <td>NDSChart.init()</td>
                                <td>Auto-initialize all .nds-chart elements with data attributes</td>
                            </tr>
                            <tr>
                                <td>chart.update(opts)</td>
                                <td>Update chart with new options and re-render</td>
                            </tr>
                            <tr>
                                <td>chart.destroy()</td>
                                <td>Remove chart, clean up listeners and observers</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Common Options</h3>
                <div class="nds-table-container">
                    <table class="nds-table">
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
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Bar Options</h3>
                <div class="nds-table-container">
                    <table class="nds-table">
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
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Line Options</h3>
                <div class="nds-table-container">
                    <table class="nds-table">
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
                                <td>3</td>
                                <td>Line stroke width</td>
                            </tr>
                            <tr>
                                <td>line.area</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Fill area under lines with gradient</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Axis Options (bar + line)</h3>
                <div class="nds-table-container">
                    <table class="nds-table">
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
            </div>

            <div class="nds-content-block">
                <h3 class="nds-block-title">Pie / Donut Options</h3>
                <div class="nds-table-container">
                    <table class="nds-table">
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
                <div class="nds-table-container">
                    <table class="nds-table">
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
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="nds-showcase">
                <div class="nds-demo-card">
                    <div class="demo-header">
                        <div class="demo-label">Custom Theme Example</div>
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
    NDSChart.create('#demo-bar', {
        type: 'bar',
        series: [
            { name: 'Revenue', data: [44, 55, 57, 56, 61, 58] },
            { name: 'Expenses', data: [35, 41, 36, 26, 45, 48] },
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        dataLabels: { show: true },
    });

    NDSChart.create('#demo-stacked-bar', {
        type: 'bar',
        series: [
            { name: 'Completed', data: [44, 55, 41, 67, 22, 43, 36, 58, 48, 52, 39, 61] },
            { name: 'In Progress', data: [13, 23, 20, 8, 13, 27, 18, 11, 22, 15, 19, 10] },
            { name: 'Pending', data: [11, 17, 15, 15, 21, 14, 9, 20, 12, 18, 16, 13] },
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        bar: { stacked: true, borderRadius: 8 },
        dataLabels: { show: true },
    });

    NDSChart.create('#demo-line', {
        type: 'line',
        series: [
            { name: 'Sessions', data: [10, 41, 35, 51, 49, 62, 69, 91, 80] },
            { name: 'Page Views', data: [23, 42, 35, 27, 43, 22, 17, 31, 48] },
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        yaxis: { title: 'Active users' },
        xaxis: { title: 'Month' },
    });

    NDSChart.create('#demo-area', {
        type: 'line',
        series: [
            { name: 'Users', data: [31, 40, 28, 51, 42, 109, 100] },
            { name: 'Sessions', data: [11, 32, 45, 32, 34, 52, 41] },
            { name: 'Bounces', data: [5, 18, 22, 10, 15, 30, 20] },
        ],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        line: { area: true, smooth: true },
    });

    NDSChart.create('#demo-pie', {
        type: 'pie',
        series: [44, 55, 13, 43],
        labels: ['Services', 'Products', 'Support', 'Other'],
    });

    NDSChart.create('#demo-donut', {
        type: 'donut',
        series: [35, 25, 20, 20],
        labels: ['Completed', 'In Progress', 'Review', 'Pending'],
    });

    NDSChart.create('#demo-themed', {
        type: 'bar',
        series: [
            { name: 'Downloads', data: [28, 45, 62, 38, 55] },
        ],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    });
});
</script>
