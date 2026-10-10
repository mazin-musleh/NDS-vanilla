---
layout: page
title: Content Switcher
hero_title: Content Switcher - National Design System
hero_description: A row of joined buttons that switches between views of the same content, in one place on the page
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.6.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="switcher-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A content switcher shows one view at a time, picked from a short row of joined buttons. It is a tab set with the class `nds-content-switcher` on its root: an `nds-tab-list` of `nds-tab` buttons, and an `nds-tab-content` area with one `nds-tab-panel` for each button. The open button has a solid fill.

Pick another component when:

- the views are different sections of a page, or need long labels, icons, a vertical list or more buttons than fit in one row: [Tabs](../components/tabs)
- the choice is a form value that is sent with the form: [Radio](../components/radio)
- the buttons run actions and do not change a view: [Button](../components/button)

</div>
  </div>
</section>

<section id="switcher-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="switcher-standard" data-canon data-variants="switcher-variants-table">
<div class="nds-tabs nds-content-switcher">
  <div class="nds-tab-list" role="tablist" aria-label="Request status">
    <button type="button" class="nds-btn nds-secondary nds-tab" role="tab" aria-selected="true" aria-controls="panel-all" id="tab-all" tabindex="0">
      <span class="nds-label">All</span>
    </button>
    <button type="button" class="nds-btn nds-secondary nds-tab" role="tab" aria-selected="false" aria-controls="panel-review" id="tab-review" tabindex="-1">
      <span class="nds-label">In review</span>
    </button>
    <button type="button" class="nds-btn nds-secondary nds-tab" role="tab" aria-selected="false" aria-controls="panel-done" id="tab-done" tabindex="-1">
      <span class="nds-label">Completed</span>
    </button>
    <button type="button" class="nds-btn nds-secondary nds-tab" role="tab" aria-selected="false" aria-controls="panel-archived" id="tab-archived" tabindex="-1">
      <span class="nds-label">Archived</span>
    </button>
  </div>
  <div class="nds-tab-content">
    <div class="nds-tab-panel" role="tabpanel" id="panel-all" aria-labelledby="tab-all" tabindex="0">
      <p>Every request you submitted, in all states.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="panel-review" aria-labelledby="tab-review" tabindex="-1" hidden>
      <p>Requests that the authority is reviewing. You do not need to do anything yet.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="panel-done" aria-labelledby="tab-done" tabindex="-1" hidden>
      <p>Requests with a decision. Each record shows the decision and its date.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="panel-archived" aria-labelledby="tab-archived" tabindex="-1" hidden>
      <p>Requests closed more than a year ago, kept for reference.</p>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="switcher-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The first button is open in the markup: its `aria-selected` is `true`, and every other panel has `hidden`. Keep that state in your markup, so the right panel shows before the script runs. To open another button first, give it `aria-selected="true"` and `tabindex="0"`, and remove `hidden` from its panel. Then set the first button and panel like the others.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Size | SM | `.nds-sm` | `.nds-content-switcher` | 32px buttons with a small label and smaller corners, for cards and toolbars |
| Size | MD (default) | — | — | 40px buttons, for page content. It needs no class |
| Size | LG | `.nds-lg` | `.nds-content-switcher` | 48px buttons, for a larger touch target |
| On color | On color | `.nds-oncolor` | `.nds-content-switcher` | For a switcher on a deep primary or dark background. The open button turns brand primary, as in dark mode. The panel text turns white |
| Center | Center | `.nds-center` | `.nds-tab-list` | Centers the row of buttons above the panels |
| Loading | Loading | `.nds-loading` | `.nds-content-switcher` | Gray bars in place of the labels and the panel content while the data loads. On `.nds-tab-list` it bars the labels only |
{: #switcher-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="switcher-features" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every content switcher on the page starts by itself. Switching and the keyboard need no call.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Navigation</span>
          </span>
          <p class="nds-item-desc">The arrow keys move between buttons, and left and right follow the reading direction. Home and End jump to the first and the last button. Enter or Space opens the focused button.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-square-arrow-expand-01"></i>
            <span class="nds-label">Three Sizes</span>
          </span>
          <p class="nds-item-desc">32, 40 and 48px buttons. The label size, the padding and the corners follow the size.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Loading Skeleton</span>
          </span>
          <p class="nds-item-desc">Gray bars stand in for the labels and the open panel until the script starts, so the row is never bare.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-access"></i>
            <span class="nds-label">High Contrast and Reduced Motion</span>
          </span>
          <p class="nds-item-desc">The open button gets a border in high-contrast mode, and the transitions stop when the user prefers reduced motion.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-notification-square"></i>
            <span class="nds-label">Change Events</span>
          </span>
          <p class="nds-item-desc">Every switch fires <code class="nds-inline-code lang-js">nds:tab:change</code> with the new and the previous button and panel.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Open a view, read the open panel or remove the behavior through <code class="nds-inline-code lang-js">NDS.Tabs</code> or the element's <code class="nds-inline-code lang-js">ndsTabs</code> property.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="switcher-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a content switcher for two to four short views of the same data, such as a date range, a status filter or a chart period.
- Pick it over tabs when people must see the open view at a glance. A solid fill is easier to see than an underline on a busy page.
- Keep labels to one or two words. The row does not scroll, so long labels push it past its container.
- Keep the same buttons at all times. For choices that come and go, use a [Filter](../components/filter).
- Put the view people open most first. It opens when the page loads.
- Give every button a panel. A switcher with no panels does not start. For a row of view buttons with no panels, use a [button group](../components/button) and handle the clicks yourself.
- Keep the buttons and the panels in the same order and the same number. Button one opens panel one, by their order in the markup.
- Give `nds-tab-list` an `aria-label`, and pair each button and panel with `aria-controls` and `aria-labelledby`.

</div>
  </div>
</section>

<section id="switcher-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `aria-selected="true"` | `.nds-tab` | Marks the button that opens when the page loads. With none, the first button opens |
| `data-state="loading"` | `.nds-content-switcher` or `.nds-tab-list` | The same as `nds-loading`, for a script that already sets states |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--btn-group-radius` | `var(--radius-md)`, `var(--radius-sm)` with `nds-sm` | Corner radius of the two ends of the row. Set it on `.nds-tab-list` |
| `--btn-size` | `40px` | Button height, for a size between the three sizes. Set it on `.nds-tab` |
| `--tab-button-gap` | `var(--spacing-xs)` | Gap between a button's icon and its label |
| `--tab-button-padding-block` | `0` | Padding above and below a button's label |
| `--tab-button-padding-inline` | the button padding | Padding at the start and the end of a button. It follows the size |
| `--tab-panel-padding` | `0` at the sides, `var(--spacing-2xl)` above and below | Padding of a panel on both axes. A panel with `nds-card` keeps `var(--spacing-2xl)` at the sides |
| `--tab-panel-padding-inline`, `--tab-panel-padding-block` | `--tab-panel-padding` | Padding of a panel on one axis |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

The [Tabs](../components/tabs) controller, `NDS.Tabs`, runs the content switcher. The instance lives on the element as `ndsTabs`.

| Method | Effect |
|---|---|
| `NDS.Tabs.init()` | Starts every switcher and tab set on the page that has not started yet. `reinit()` is the same |
| `NDS.Tabs.create(element)` | Starts one switcher and returns its instance, or the instance it already has. Returns `null` when the switcher has no tab list, tabs or panels |
| `instance.switchTo(index)` | Opens a view by its position, from 0 |
| `instance.getActiveTabIndex()` | Returns the position of the open button |
| `instance.getActiveTab()`, `instance.getActivePanel()` | Return the open button and its panel |
| `instance.destroy()` | Removes the listeners. The markup stays as it is |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:tab:change` | `.nds-content-switcher`, and it bubbles | `tabIndex`, `tab`, `panel`, `previousTab`, `previousPanel` |
{: .nds-table .nds-responsive}

<script type="text/html" id="switcher-js" data-canon data-lang="js">
var switcher = document.querySelector('#request-status');
switcher.addEventListener('nds:tab:change', function (e) {
  console.log('Opened view', e.detail.tabIndex);
});
switcher.ndsTabs.switchTo(2);
</script>

The full API is in the banner of `_js/nds-tabs.js`.

</div>
  </div>
</section>

<section id="switcher-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Tabs](../components/tabs): the same controller, drawn as a tab row with an underline.
- [Button](../components/button): the button group, whose joined look the row shares.

</div>
  </div>
</section>
