---
layout: page
title: Metric
hero_title: Metric - National Design System
hero_description: A dashboard tile that pairs a key value with a small trend chart, so the value and its trend read at a glance
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.2"
updated: "1.1.0"
last_edit: "08/10/2026 - 11:36 AM"
---

<section id="metricOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A metric goes inside a [card](../components/cards). It holds a large value, a trend row and a small line chart. The trend row shows the change and its comparison period, such as "+24% vs last week".

Pick another component when:

- the value has no comparison period: a [statistic card](../components/cards), a centered card with `nds-card-number`
- the chart is the focus, or it has more than one series: [Chart](../components/chart)

</div>
  </div>
</section>

<section id="metricMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="metric-positive" data-canon data-variants="metricVariantsTable">
<div class="nds-card nds-stroke" data-status="positive">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle nds-sm">
        <i class="nds-icon nds-hgi-trade-up" aria-hidden="true"></i>
      </span>
    </div>
    <span class="nds-card-title">24h Views</span>
    <button type="button" class="nds-btn nds-subtle nds-md nds-ellipsis nds-vertical nds-icon-only">
      <span class="nds-label">More options</span>
    </button>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-metric">
      <div class="nds-card-metric-info">
        <span class="nds-card-metric-value">29,840</span>
        <p class="nds-card-metric-trend">
          <i class="nds-icon nds-hgi-trade-up" aria-hidden="true"></i>
          <strong>+24%</strong>
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
</script>
<script type="text/html" id="metric-negative" data-canon>
<div class="nds-card nds-stroke" data-status="negative">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle nds-sm">
        <i class="nds-icon nds-hgi-trade-down" aria-hidden="true"></i>
      </span>
    </div>
    <span class="nds-card-title">24h Views</span>
    <button type="button" class="nds-btn nds-subtle nds-md nds-ellipsis nds-vertical nds-icon-only">
      <span class="nds-label">More options</span>
    </button>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-metric">
      <div class="nds-card-metric-info">
        <span class="nds-card-metric-value">3,200</span>
        <p class="nds-card-metric-trend">
          <i class="nds-icon nds-hgi-trade-down" aria-hidden="true"></i>
          <strong>-32%</strong>
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
</script>
    </div>
  </div>
</section>

<section id="metricVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Positive (default) | — | — | A trend that is good news. `data-status="positive"` on the card uses the success colors, and the icons are `nds-hgi-trade-up` |
| Structure | Negative (hint: A trend that is bad news) | canon `#metric-negative` | — | A trend that is bad news. `data-status="negative"` on the card uses the error colors, and the icons are `nds-hgi-trade-down` |
| Layout | Compact (default) | — | — | The chart sits beside the value and takes at least 40% of the row. It wraps below the value when the card is too narrow. Use it for a row of several metrics |
| Layout | Full (hint: The chart sits below the value, full width) | `.nds-full` | `.nds-card-metric` | The chart always sits below the value, across the full width. Use it for one metric that leads a section |
| Arrow | Arrow (hint: A plain arrow instead of the trade icon) | `.nds-arrow` | `.nds-card-metric-trend` | Shows a plain arrow in the trend row. Keep the icon's class: `.nds-arrow` changes what the icon shows. The arrow follows the status, not the sign: `positive` points up, `negative` points down |
| Stroke | Stroke (default) | `.nds-stroke` | `.nds-card` | A 1px border on the card |
| Shadow | Shadow | `.nds-shadow` | `.nds-card` | An elevation shadow on the card. It combines with the stroke |
{: #metricVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="metricFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-colors"></i>
            <span class="nds-label">Trend Status Theming</span>
          </span>
          <p class="nds-item-desc">One <code class="nds-inline-code lang-html">data-status</code> on the card colors the trend, the chart line and the header featured icon together.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-chart-line-data-01"></i>
            <span class="nds-label">Inline Sparkline</span>
          </span>
          <p class="nds-item-desc">The metric removes the chart's 200px minimum height, so a short chart fits in the card.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-align-left"></i>
            <span class="nds-label">Always-LTR Sparklines</span>
          </span>
          <p class="nds-item-desc">The chart reads from oldest to newest, left to right, on an RTL page too.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-top"></i>
            <span class="nds-label">Dashboard Header</span>
          </span>
          <p class="nds-item-desc">In a metric card, the title is smaller, the last button in the header moves to the end, and a divider sits above the actions.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Card Composition</span>
          </span>
          <p class="nds-item-desc">A metric card is a normal card. Its classes, such as <code class="nds-inline-code lang-html">nds-stroke</code>, <code class="nds-inline-code lang-html">nds-shadow</code> and <code class="nds-inline-code lang-html">nds-color</code>, still set the border, shadow and color.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paint-bucket"></i>
            <span class="nds-label">Custom Colors</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-css">--metric-trend-color</code> and <code class="nds-inline-code lang-css">--metric-chart-color</code> replace the status colors on one metric.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="metricPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use metrics on dashboard pages, where people scan several values and their trends.
- Put a row of metrics in a [grid](../layout/grid). Set `--max-col` on the grid to limit how many share a row.
- Pick the status by meaning, not by the sign of the change. A falling bounce rate is `positive`.
- Write the sign in the change: `+24%`, `-32%`. The trend icon is hidden from screen readers, so the text must carry the direction.
- Keep the value short: `50%`, `SAR 1.2M`, `8,420`. A long value wraps and pushes the chart down.
- Give the chart at least 15 to 20 points. A short series does not show a clear trend.
- List the chart data from oldest to newest.
- Add an action, such as View Report, that opens the data behind the value.
- Give every icon-only button a name for screen readers: an `aria-label`, or the hidden `.nds-label` of a More button.

</div>
  </div>
</section>

<section id="metricApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Inside | Effect |
|---|---|---|
| `nds-card-metric` | `.nds-card-content` | Holds the value and the chart. The card around it gets the smaller title and the divider above the actions |
| `nds-card-metric-info` | `.nds-card-metric` | Holds the value and the trend row |
| `nds-card-metric-value` | `.nds-card-metric-info` | The large value. Its size scales with the screen |
| `nds-card-metric-trend` | `.nds-card-metric-info` | The trend row: an icon, the change in `<strong>`, and the comparison period |
| `nds-card-metric-text` | `.nds-card-metric-trend` | The comparison period, such as "vs last week" |
| `nds-card-metric-chart` | `.nds-card-metric` | Holds the `.nds-chart` and keeps it left to right |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-status="positive"` | `.nds-card` | Success colors on the trend, the chart and the featured icon. With `.nds-arrow`, the arrow points up |
| `data-status="negative"` | `.nds-card` | Error colors on the same parts. With `.nds-arrow`, the arrow points down |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-card-metric`. There they win over the colors of `data-status`.

| Property | Default | Controls |
|---|---|---|
| `--metric-trend-color` | `var(--text-default)` | Color of the trend icon and the change |
| `--metric-chart-color` | `var(--colors-primary-600)` | Color of the chart line and its area |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

Metric has no script. The sparkline is a [Chart](../components/chart), and its `data-chart-*` attributes are documented there.

</div>
  </div>
</section>
