---
layout: page
title: Chart
hero_title: Chart - National Design System
hero_description: A bar, line, pie or donut chart that the script draws as SVG from your data
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 10:17 PM"
---

<section id="chartOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A chart is an empty `.nds-chart` element that the script fills with an SVG drawing, a legend and a tooltip. You give it the data in one of two ways: `data-chart-*` attributes, which the script reads at page load, or one `NDS.Chart.create()` call. Both take the same options.

Pick another component when:

- one number with a small trend line is the focus: [Metric](../components/metric).
- users must read or compare exact values: [Tables](../components/tables).
- the value is progress toward a target: [Progress](../components/progress).

</div>
  </div>
</section>

<section id="chartMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The JS tab is the `create()` call that draws the chart. To draw one with no script call, see HTML Attributes under Behavior.

<script type="text/html" id="chart-demo" data-canon data-variants="chartVariantsTable" data-js="chart-js" data-preview="js">
<div id="chart-root" class="nds-chart"></div>
</script>
<script type="text/html" id="chart-js" data-canon data-lang="js">
NDS.Chart.create('#chart-root', {
  type: 'bar',
  series: [
    { name: 'Completed', data: [120, 180, 150, 220, 280, 240] },
    { name: 'In review', data: [50, 70, 60, 90, 75, 80] }
  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
});
</script>

</div>
  </div>
</section>

<section id="chartVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

`#chart-js` is the `create()` call that draws the chart (`data-js` on the base canon). Every row sets an option of that call. `create({ type: 'line' })` means only a call with that option. A pie and a donut take one number per slice, so their Structure rows also replace `series` and `labels`. A key with a dot sets one key inside that option: `line.area: true` and `line.dots: false` write `line: { area: true, dots: false }`.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Bar (default) | — | — | Compares values across categories or periods. Each series is one bar per category |
| Structure | Line | `type: 'line'` | `create()` | Shows a trend over time. Each series is one line |
| Structure | Pie | `type: 'pie'` | `create()` | Shows the parts of a whole. Each slice shows its percentage |
| Structure | Pie | `series: [420, 310, 180, 90]` | `create()` | The same choice: one number per slice |
| Structure | Pie | `labels: ['Online', 'Mobile app', 'Service center', 'Phone']` | `create()` | The same choice: one name per slice |
| Structure | Donut | `type: 'donut'` | `create()` | A pie with a hole in the middle. `donut.size` sets the hole |
| Structure | Donut | `series: [420, 310, 180, 90]` | `create()` | The same choice: one number per slice |
| Structure | Donut | `labels: ['Online', 'Mobile app', 'Service center', 'Phone']` | `create()` | The same choice: one name per slice |
| Line style (any) | Straight | `line.smooth: false` | `create({ type: 'line' })` | Straight segments between the points. Without it, the lines curve |
| Line style (any) | No dots (limit: 1 dots) | `line.dots: false` | `create({ type: 'line' })` | Hides the dot on each point. The crosshair still shows the dots at the point it snaps to |
| Line style (any) | Area | `line.area: true` | `create({ type: 'line' })` | Fills the space under each line, fading to the bottom. Use it to stress volume |
| Line style (any) | Last point (hint: A ring on the last point) | `line.spotlight: 'last'` | `create({ type: 'line' })` | Keeps a ring on the last point. `spotlight` also takes `'first'` or an index |
| Line style (any) | Point tooltips (limit: 1 dots) (hint: A tooltip per dot, with no crosshair) | `line.crosshair: false` | `create({ type: 'line' })` | Each dot gets its own tooltip, and the crosshair is off. Needs the dots |
| Axes (any) | Titles (hint: A title on the y axis and on the x axis) | `yaxis: { title: 'Requests' }` | `create({ type: 'bar' })` | Names what the numbers count and what the categories are |
| Axes (any) | Titles (hint: A title on the y axis and on the x axis) | `yaxis: { title: 'Requests' }` | `create({ type: 'line' })` | The same choice, on a line chart |
| Axes (any) | Titles (hint: A title on the y axis and on the x axis) | `xaxis: { title: 'Month' }` | `create({ type: 'bar' })` | The same choice: the x axis title |
| Axes (any) | Titles (hint: A title on the y axis and on the x axis) | `xaxis: { title: 'Month' }` | `create({ type: 'line' })` | The same choice: the x axis title, on a line chart |
| Axes (any) | No y axis | `yaxis: { show: false }` | `create({ type: 'bar' })` | Hides the value labels. Use it with Values, so the numbers still show |
| Axes (any) | No y axis | `yaxis: { show: false }` | `create({ type: 'line' })` | Hides the value labels. A line chart then shows its values only in the tooltip |
| Stacked | Stacked (hint: One bar per category, series on top of each other) | `bar: { stacked: true }` | `create({ type: 'bar' })` | Stacks the series in one bar per category. Use it when the total matters as much as each part |
| Values | Values (hint: The value above each bar) | `dataLabels: { show: true }` | `create({ type: 'bar' })` | Writes the value above each bar. A stacked bar shows its total |
| No percentages | No percentages | `dataLabels: { show: false }` | `create({ type: 'pie' })` | Hides the percentage on each slice. The tooltip still shows it |
| No percentages | No percentages | `dataLabels: { show: false }` | `create({ type: 'donut' })` | The same, on a donut |
| Slice border | Slice border | `stroke: { show: true }` | `create({ type: 'pie' })` | A line between the slices |
| Slice border | Slice border | `stroke: { show: true }` | `create({ type: 'donut' })` | The same, on a donut |
| No grid | No grid | `grid: { show: false }` | `create({ type: 'bar' })` | Hides the horizontal grid lines |
| No grid | No grid | `grid: { show: false }` | `create({ type: 'line' })` | The same, on a line chart |
| No legend | No legend | `legend: { show: false }` | `create()` | Hides the legend. Keep it when the chart has more than one series or slice |
| No tooltip | No tooltip | `tooltip: { show: false }` | `create()` | No tooltip on hover or tap |
{: #chartVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="chartBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### HTML Attributes
{: .nds-block-title}

A chart can start with no script call. Write the data in `data-chart-type`, `data-chart-series` and `data-chart-labels`, and any other option in `data-chart-config` as JSON. Use it for data that is known when the page is built, and `create()` for data that changes after load.

<script type="text/html" id="chart-html" data-canon>
<div class="nds-chart"
  data-chart-type="donut"
  data-chart-series='[420, 310, 180, 90]'
  data-chart-labels='["Online", "Mobile app", "Service center", "Phone"]'
  data-chart-config='{"height": 260, "donut": {"size": 0.6}}'></div>
</script>

### Crowded Labels
{: .nds-block-title}

When the x axis labels do not fit side by side, the chart turns them 45 degrees. Set `xaxis.labelDecimate` to `true` to show every few labels flat instead, or to a number to show every Nth one. `xaxis.labelRotate` sets a fixed angle.

<script type="text/html" id="chart-days" data-canon data-js="chart-days-js" data-preview="js">
<div id="chart-days-root" class="nds-chart"></div>
</script>
<script type="text/html" id="chart-days-js" data-canon data-lang="js">
NDS.Chart.create('#chart-days-root', {
  type: 'line',
  series: [
    { name: 'Visits', data: [820, 940, 910, 1050, 1180, 760, 690, 1120, 1240, 1310, 1290, 1400, 980, 870, 1450, 1520, 1480, 1610, 1700, 1150, 1020, 1680, 1750, 1820, 1790, 1900, 1310, 1240, 1960, 2050] }
  ],
  labels: Array.from({ length: 30 }, (_, i) => 'Sep ' + (i + 1)),
  line: { dots: false, area: true },
  xaxis: { labelDecimate: true }
});
</script>

</div>
  </div>
</section>

<section id="chartFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto-initialization</span>
          </span>
          <p class="nds-item-desc">At page load the script draws every <code class="nds-inline-code lang-html">.nds-chart</code> that has a series in its attributes. Call <code class="nds-inline-code lang-js">NDS.Chart.init()</code> after you add charts to the page. It draws the new ones and redraws any chart that was emptied.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-01"></i>
            <span class="nds-label">Responsive Sizing</span>
          </span>
          <p class="nds-item-desc">The chart fills its container and redraws when the container width changes. It also redraws when <code class="nds-inline-code lang-html">dir</code> or <code class="nds-inline-code lang-html">lang</code> changes on <code class="nds-inline-code lang-html">&lt;html&gt;</code>, so the axes follow the text direction.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-touch-interaction-01"></i>
            <span class="nds-label">Line Crosshair</span>
          </span>
          <p class="nds-item-desc">On a line chart, a vertical line snaps to the nearest point, enlarges its dots, and one tooltip lists every series there. On a touch screen, a tap pins it and a second tap on the same point clears it. A vertical swipe still scrolls the page.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-analytics-up"></i>
            <span class="nds-label">Smart Scaling</span>
          </span>
          <p class="nds-item-desc">The y axis steps are round numbers that cover the data. Values of 1,000 and more are shortened in the language of the browser, such as 1.2K. The legend wraps onto more lines when it runs out of width.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-customize"></i>
            <span class="nds-label">CSS Theming</span>
          </span>
          <p class="nds-item-desc">Colors come from <code class="nds-inline-code lang-css">--chart-color-1</code> to <code class="nds-inline-code lang-css">--chart-color-6</code>, and the grid, text and tooltip have their own properties. Set them on the chart or on any parent.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-printer"></i>
            <span class="nds-label">Print and Accessibility</span>
          </span>
          <p class="nds-item-desc">The SVG has <code class="nds-inline-code lang-html">role="img"</code> and an <code class="nds-inline-code lang-html">aria-label</code>. The tooltip is hidden in print, and the hover transitions are off when the user asks for reduced motion.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-chart-line-data-01"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Create, update and destroy a chart from your code. <code class="nds-inline-code lang-js">update()</code> merges the new options into the current ones and redraws.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="chartPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a bar chart to compare categories or periods, and a line chart for a trend over time.
- Use a pie or donut only for the parts of a whole, with six slices or fewer. The colors repeat after six.
- Use a bar chart instead of a pie when the slices are close in size. Bars make small differences easier to see.
- Set axis titles that name what the numbers count. Without them, only the legend explains the chart.
- Set `dataLabels.format` when the values have a unit, such as `%` or SAR.
- Put a heading above the chart, and the key numbers in text or a [table](../components/tables) near it. The SVG label only says "Bar chart", "Line chart" or "Chart", and the chart has no keyboard access.
- Call `destroy()` before you remove a chart in a single-page app. It removes the chart's observers and listeners.

</div>
  </div>
</section>

<section id="chartApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Chart ships in the extras bundle, which the loader injects after first paint. A `create()` call before the bundle arrives still works, but returns a Promise instead of the instance. To get the instance at once, `await NDS.loadBundle('extras')` first.

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-chart-type` | `.nds-chart` | `bar`, `line`, `pie` or `donut`. Missing means `bar`. The script also writes the type here on every draw, so CSS picks the color order for that type. |
| `data-chart-series` | `.nds-chart` | The series as JSON, the same value as the `series` option. Without a series, the script skips the element at page load. |
| `data-chart-labels` | `.nds-chart` | The labels as JSON, the same value as the `labels` option. |
| `data-chart-config` | `.nds-chart` | Any options as JSON. The three attributes above win over the same keys in it. |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set them on the chart or on any parent.

| Property | Default | Controls |
|---|---|---|
| `--chart-color-1` to `--chart-color-6` | shades of the primary color, in an order for each type | The series or slice colors. The seventh series uses color 1 again. The `colors` option wins over them. |
| `--chart-grid-color` | `--colors-neutral-100`, `--colors-neutral-700` in dark mode | The grid lines. |
| `--chart-text` | `--text-primary-paragraph` | The axis labels and titles, and the crosshair. |
| `--chart-label` | `--text-default` | The values above the bars, the legend and the tooltip text. |
| `--chart-pie-label-1` to `--chart-pie-label-6` | `--text-oncolor-primary`, black on slices 3 and 4 | The percentage on each slice. Change it when you change its slice color. |
| `--chart-dot-fill` | `--colors-base-white` | The inside of the line dots and the default slice border color. |
| `--chart-area-opacity` | `0.15` | How strong the Area fill is at the top. |
| `--chart-tooltip-bg` | `--background-menu` | The tooltip background. |
| `--chart-tooltip-border` | `--border-neutral-secondary` | The tooltip border. |
| `--chart-radius` | `--radius-md` | The tooltip corner radius. |
{: .nds-table .nds-responsive}

### Options
{: .nds-block-title}

| Option | Default | Effect |
|---|---|---|
| `type` | `'bar'` | `'bar'`, `'line'`, `'pie'` or `'donut'`. |
| `series` | required | Bar and line: an array of `{ name, data }`, one per series. Pie and donut: an array of numbers, one per slice. |
| `labels` | `1`, `2`, …, pie and donut `Item 1`, `Item 2`, … | Bar and line: the x axis categories. Pie and donut: the slice names. |
| `height` | `350`, pie and donut `300` | The height in pixels. A pie or donut is at most this tall. |
| `colors` | the `--chart-color-*` properties | An array of colors, used in order and repeated. |
| `legend.show` | `true` | Shows the legend. |
| `legend.position` | `'top'`, pie and donut `'bottom'` | `'top'` or `'bottom'`. |
| `tooltip.show` | `true` | Shows the tooltip on hover or tap. |
| `dataLabels.show` | `false`, pie and donut `true` | Bar: the value above each bar. Pie and donut: the percentage on each slice wider than 20 degrees. |
| `dataLabels.format` | none | A string is added after the value (`'%'`). A function `v => …` returns the whole label. Bar and line only: it also formats the y axis and the tooltip. |
| `direction` | the computed CSS direction | `'ltr'` or `'rtl'`. Forces the direction of the axes. |
| `padding` | top `20`, bottom `40`, sides `20` | Bar and line: `{ top, bottom, left, right }` in pixels around the plot. The side with the y axis gets `55` while the axis shows. All `0` draws a chart edge to edge. |
| `grid.show` | `true` | Bar and line: the horizontal grid lines. |
| `yaxis.show` | `true` | Bar and line: the value labels. |
| `yaxis.title` | `''` | Bar and line: the title beside the y axis. |
| `xaxis.show` | `true` | Bar and line: the category labels. |
| `xaxis.title` | `''` | Bar and line: the title under the x axis. |
| `xaxis.labelRotate` | `'auto'` | `'auto'` turns the labels 45 degrees when they do not fit. A number sets a fixed angle. The angle is mirrored right to left. |
| `xaxis.labelDecimate` | `false` | `true` or `'auto'` shows only as many labels as fit. A number shows every Nth label. |
| `bar.stacked` | `false` | Stacks the series in one bar per category. |
| `bar.borderRadius` | `6` | The radius of the bar tops. |
| `bar.gap` | `0.3` | The space between categories, as a share of each category's width (0 to 1). |
| `line.smooth` | `true` | Curved lines. `false` draws straight segments. |
| `line.dots` | `true` | A dot on each point. |
| `line.dotRadius` | `4` | The dot radius in pixels. |
| `line.width` | `3` | The line width in pixels. |
| `line.area` | `false` | Fills the space under each line. |
| `line.crosshair` | `true` | The crosshair and its shared tooltip. `false` gives each dot its own tooltip. |
| `line.spotlight` | none | `'first'`, `'last'` or an index. Keeps a ring on that point. |
| `donut.size` | `0.5` | The hole, as a share of the radius (0 to 1). |
| `stroke.show` | `false` | Pie and donut: a border between the slices. |
| `stroke.width` | `2` | The border width. |
| `stroke.color` | `var(--_chart-dot-fill)` | The border color. The default follows `--chart-dot-fill`. |
| `startAngle` | `0` | Pie and donut: where the first slice starts, in degrees from the top. |
{: .nds-table .nds-responsive}

### Methods
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Chart.create(el, options)` | Draws a chart on an element or a selector, and returns the instance. A chart already on the element is destroyed first. Returns `null` when nothing matches. |
| `NDS.Chart.init()` | Draws every `.nds-chart` with a series in its attributes that has no chart yet, and redraws a chart whose element was emptied. |
| `NDS.Chart.reinit()` | The same as `init()`. |
| `chart.update(options)` | Merges the options into the current ones and redraws. An array, such as `series` or `labels`, replaces the old one. |
| `chart.render()` | Redraws from the current options. |
| `chart.destroy()` | Empties the element, removes its observers and listeners, and deletes `el.ndsChart`. |
{: .nds-table .nds-responsive}

The instance is also on the element, as `el.ndsChart`. Chart fires no events.

<script type="text/html" id="chart-api-js" data-canon data-lang="js">
const chart = NDS.Chart.create('#requests-chart', {
  type: 'line',
  series: [{ name: 'Requests', data: [120, 180, 150, 220] }],
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  yaxis: { title: 'Requests' },
  dataLabels: { format: (v) => v.toLocaleString() }
});

chart.update({ series: [{ name: 'Requests', data: [130, 175, 160, 240] }] });
chart.destroy();
</script>

The full API is in the banner of `_js/nds-chart.js`.

</div>
  </div>
</section>

<section id="chartRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Metric](../components/metric): a line chart with no axes inside a dashboard tile.
- [KPIs Template](../templates/kpis-template): bar, line, pie and donut charts in a dashboard.
- [Admin Console Demo](../examples/console-demo): charts on an admin overview page.

</div>
  </div>
</section>
