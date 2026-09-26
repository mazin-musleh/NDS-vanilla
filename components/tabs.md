---
layout: page
title: Tabs
hero_title: Tabs - National Design System
hero_description: Group related content into a single surface where users switch between views without leaving the page
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "26/09/2026 - 06:04 PM"
---

<section id="tabsOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Tabs show one panel of related content at a time. A tab set is `nds-tabs`: a list of `nds-tab` buttons and an `nds-tab-content` area with one `nds-tab-panel` for each tab. Tab one opens panel one, tab two opens panel two, and so on, by their order in the markup.

Pick another component when:

- the user must finish steps in order: [Stepper](../components/stepper)
- a few short views show the same data, such as a date range or a status filter: [Content Switcher](../components/content-switcher)
- the sections can all be open at once, one under another: [Accordion](../components/accordion)

</div>
  </div>
</section>

<section id="tabsMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="tabs-standard" data-canon data-variants="tabsVariantsTable">
<div class="nds-tabs">
  <div class="nds-tab-list-container nds-scroll-more">
    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Service details">
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="panel-overview" id="tab-overview" tabindex="0">
        <span class="nds-label">Overview</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="panel-requirements" id="tab-requirements" tabindex="-1">
        <span class="nds-label">Requirements</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="panel-fees" id="tab-fees" tabindex="-1">
        <span class="nds-label">Fees</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="panel-contact" id="tab-contact" tabindex="-1">
        <span class="nds-label">Contact</span>
      </button>
    </nav>
    <button type="button" class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more">
      <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
    </button>
  </div>
  <div class="nds-tab-content">
    <div class="nds-tab-panel" role="tabpanel" id="panel-overview" aria-labelledby="tab-overview" tabindex="0">
      <p>Apply for the service online in three steps.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="panel-requirements" aria-labelledby="tab-requirements" tabindex="-1" hidden>
      <p>A valid national ID and a recent photo.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="panel-fees" aria-labelledby="tab-fees" tabindex="-1" hidden>
      <p>The service fee is 100 riyals, paid online.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="panel-contact" aria-labelledby="tab-contact" tabindex="-1" hidden>
      <p>Call 19911 from Sunday to Thursday.</p>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="tabs-icons" data-canon>
<div class="nds-tabs">
  <div class="nds-tab-list-container nds-scroll-more">
    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Account">
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="i-panel-overview" id="i-tab-overview" tabindex="0">
        <i class="hgi hgi-stroke hgi-home-01" aria-hidden="true"></i>
        <span class="nds-label">Overview</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="i-panel-documents" id="i-tab-documents" tabindex="-1">
        <i class="hgi hgi-stroke hgi-file-01" aria-hidden="true"></i>
        <span class="nds-label">Documents</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="i-panel-messages" id="i-tab-messages" tabindex="-1">
        <i class="hgi hgi-stroke hgi-mail-01" aria-hidden="true"></i>
        <span class="nds-label">Messages</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="i-panel-help" id="i-tab-help" tabindex="-1">
        <i class="hgi hgi-stroke hgi-help-circle" aria-hidden="true"></i>
        <span class="nds-label">Help</span>
      </button>
    </nav>
    <button type="button" class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more">
      <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
    </button>
  </div>
  <div class="nds-tab-content">
    <div class="nds-tab-panel" role="tabpanel" id="i-panel-overview" aria-labelledby="i-tab-overview" tabindex="0">
      <p>Apply for the service online in three steps.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="i-panel-documents" aria-labelledby="i-tab-documents" tabindex="-1" hidden>
      <p>Upload the documents as PDF files.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="i-panel-messages" aria-labelledby="i-tab-messages" tabindex="-1" hidden>
      <p>You have no new messages.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="i-panel-help" aria-labelledby="i-tab-help" tabindex="-1" hidden>
      <p>Read the answers to common questions.</p>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="tabs-many" data-canon>
<div class="nds-tabs">
  <div class="nds-tab-list-container nds-scroll-more">
    <nav class="nds-tab-list nds-scroll-more-content" role="tablist" aria-label="Service sections">
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="true" aria-controls="m-panel-overview" id="m-tab-overview" tabindex="0">
        <span class="nds-label">Overview</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="m-panel-requirements" id="m-tab-requirements" tabindex="-1">
        <span class="nds-label">Requirements</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="m-panel-fees" id="m-tab-fees" tabindex="-1">
        <span class="nds-label">Fees</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="m-panel-documents" id="m-tab-documents" tabindex="-1">
        <span class="nds-label">Documents</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="m-panel-appointments" id="m-tab-appointments" tabindex="-1">
        <span class="nds-label">Appointments</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="m-panel-messages" id="m-tab-messages" tabindex="-1">
        <span class="nds-label">Messages</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="m-panel-reports" id="m-tab-reports" tabindex="-1">
        <span class="nds-label">Reports</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="m-panel-service-centers" id="m-tab-service-centers" tabindex="-1">
        <span class="nds-label">Service centers</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="m-panel-payment-history" id="m-tab-payment-history" tabindex="-1">
        <span class="nds-label">Payment history</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="m-panel-notifications" id="m-tab-notifications" tabindex="-1">
        <span class="nds-label">Notifications</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="m-panel-feedback" id="m-tab-feedback" tabindex="-1">
        <span class="nds-label">Feedback</span>
      </button>
      <button type="button" class="nds-btn nds-subtle nds-tab" role="tab" aria-selected="false" aria-controls="m-panel-help" id="m-tab-help" tabindex="-1">
        <span class="nds-label">Help</span>
      </button>
    </nav>
    <button type="button" class="nds-btn nds-subtle nds-tab nds-show-more" aria-label="Show more">
      <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
    </button>
  </div>
  <div class="nds-tab-content">
    <div class="nds-tab-panel" role="tabpanel" id="m-panel-overview" aria-labelledby="m-tab-overview" tabindex="0">
      <p>Apply for the service online in three steps.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="m-panel-requirements" aria-labelledby="m-tab-requirements" tabindex="-1" hidden>
      <p>A valid national ID and a recent photo.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="m-panel-fees" aria-labelledby="m-tab-fees" tabindex="-1" hidden>
      <p>The service fee is 100 riyals, paid online.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="m-panel-documents" aria-labelledby="m-tab-documents" tabindex="-1" hidden>
      <p>Upload the documents as PDF files.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="m-panel-appointments" aria-labelledby="m-tab-appointments" tabindex="-1" hidden>
      <p>Book a visit to a service center.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="m-panel-messages" aria-labelledby="m-tab-messages" tabindex="-1" hidden>
      <p>You have no new messages.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="m-panel-reports" aria-labelledby="m-tab-reports" tabindex="-1" hidden>
      <p>Download your monthly reports.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="m-panel-service-centers" aria-labelledby="m-tab-service-centers" tabindex="-1" hidden>
      <p>Find the nearest service center.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="m-panel-payment-history" aria-labelledby="m-tab-payment-history" tabindex="-1" hidden>
      <p>See every payment you made.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="m-panel-notifications" aria-labelledby="m-tab-notifications" tabindex="-1" hidden>
      <p>Choose how we contact you.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="m-panel-feedback" aria-labelledby="m-tab-feedback" tabindex="-1" hidden>
      <p>Tell us how we can improve.</p>
    </div>
    <div class="nds-tab-panel" role="tabpanel" id="m-panel-help" aria-labelledby="m-tab-help" tabindex="-1" hidden>
      <p>Read the answers to common questions.</p>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="tabsVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The first tab is open in the markup: its `aria-selected` is `true`, and every other panel has `hidden`. Keep that state in your markup, so the right panel shows before the script runs. To open another tab first, give that tab `aria-selected="true"` and `tabindex="0"`, and remove `hidden` from its panel. Then set the first tab and panel like the others. The three Card rows of one option are one choice: add all three classes. The show-more button shows only when the tabs do not fit.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Standard (default) | — | — | Text-only tabs |
| Structure | With icons | canon `#tabs-icons` | — | An icon before each label, for tabs that name distinct categories |
| Structure | Many tabs (hint: Scrolls when the tabs do not fit) | canon `#tabs-many` | — | More tabs than fit in one row. The row scrolls. The show-more button moves it on by about one screen width, and back to the start at the end |
| Layout | Horizontal (default) | — | — | Tabs in a row above the panels |
| Layout | Vertical | `.nds-vertical` | `.nds-tabs` | Tabs stacked beside the panels, for a long list or long labels. The open tab's bar runs beside it, and the list stays in view while the page scrolls |
| Size | SM | `.nds-sm` | `.nds-tabs` | 32px tabs with a small label |
| Size | MD (default) | — | — | 40px tabs. It needs no class |
| Size | LG | `.nds-lg` | `.nds-tabs` | 48px tabs, for a larger touch target |
| Card | None (default) | — | — | No container |
| Card | Whole set | `.nds-card` | `.nds-tabs` | The tabs and the panels in one card, for a page area that already has a background |
| Card | Whole set | `.nds-stroke` | `.nds-tabs` | The same: gives the card its border |
| Card | Whole set | `.nds-shadow` | `.nds-tabs` | The same: gives the card its shadow |
| Card | Panel only | `.nds-card` | `.nds-tab-content` | Only the panels in a card, under a plain tab row |
| Card | Panel only | `.nds-stroke` | `.nds-tab-content` | The same: gives the card its border |
| Card | Panel only | `.nds-shadow` | `.nds-tab-content` | The same: gives the card its shadow |
| Divided | Divided | `.nds-divided` | `.nds-tabs` | A line between the tabs and the panels: under the row, or beside a vertical list |
| Center | Center | `.nds-center` | `.nds-tab-list` | Centers a horizontal tab row while every tab fits. A row that scrolls starts at the edge |
| Loading | Loading | `.nds-loading` | `.nds-tabs` | Gray bars in place of the labels and the panel content while the data loads. On `.nds-tab-list` it bars the labels only |
{: #tabsVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="tabsFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-tabs</code> on the page starts by itself. Switching, the keyboard and the scrolling need no call.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Full Keyboard Navigation</span>
          </span>
          <p class="nds-item-desc">The arrow keys move between tabs, and left and right follow the reading direction. Home and End jump to the first and the last tab. Enter or Space opens the focused tab.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-mouse-scroll-01"></i>
            <span class="nds-label">Overflow Scrolling</span>
          </span>
          <p class="nds-item-desc">A tab row that does not fit scrolls, with a fade at its edges. It takes a drag, the mouse wheel and a show-more button.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-left"></i>
            <span class="nds-label">Vertical Layout</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">nds-vertical</code> stacks the tabs beside the panels, and the list stays in view while the page scrolls.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Loading Skeleton</span>
          </span>
          <p class="nds-item-desc">Gray bars stand in for the labels and the open panel until the script starts, so the tab row is never bare. The panels marked <code class="nds-inline-code lang-html">hidden</code> stay hidden.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-access"></i>
            <span class="nds-label">High Contrast and Reduced Motion</span>
          </span>
          <p class="nds-item-desc">The open tab gets a border in high-contrast mode, and the transitions stop when the user prefers reduced motion.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-notification-square"></i>
            <span class="nds-label">Tab Change Events</span>
          </span>
          <p class="nds-item-desc">Every switch fires <code class="nds-inline-code lang-js">nds:tab:change</code> with the new and the previous tab and panel.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Open a tab, read the open panel or remove the behavior through <code class="nds-inline-code lang-js">NDS.Tabs</code> or the element's <code class="nds-inline-code lang-js">ndsTabs</code> property.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="tabsPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use tabs for related content that people read one part at a time, such as the details of a service, or to compare options without leaving the page.
- Leave content that fits on one page as one page. Tabs add a click to reach each part.
- Keep labels to one to three words. Long labels make the row scroll sooner.
- Aim for three to seven tabs. The row scrolls past that, but people may miss the hidden tabs.
- Put the tab people open most first. It opens when the page loads.
- Add icons only when the tabs name distinct categories, and leave them off long labels. Give each icon `aria-hidden="true"`.
- Keep the tabs and the panels in the same order and the same number: tab one opens panel one.
- Give the tab list an `aria-label`, and pair each tab and panel with `aria-controls` and `aria-labelledby`.
- Build a long panel from `nds-block` parts with `nds-block-title` headings, so it reads in sections.

</div>
  </div>
</section>

<section id="tabsApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `aria-selected="true"` | `.nds-tab` | Marks the tab that opens when the page loads. With none, the first tab opens |
| `data-state="loading"` | `.nds-tabs` or `.nds-tab-list` | The same as `nds-loading`, for a script that already sets states |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--btn-indicator-size` | `3px` | Thickness of the open tab's bar and of the divided line |
| `--tab-button-gap` | `var(--spacing-xs)` | Gap between a tab's icon and its label |
| `--tab-button-padding-block` | `0` | Padding above and below a tab's label |
| `--tab-button-padding-inline` | the button padding | Padding at the start and the end of a tab: 12px with `nds-sm`, 16px, and 20px with `nds-lg` |
| `--tab-panel-padding` | `var(--spacing-2xl)` | Padding of a panel on both axes. A card sets `0`, because the card holds the padding |
| `--tab-panel-padding-inline`, `--tab-panel-padding-block` | `--tab-panel-padding` | Padding of a panel on one axis |
| `--scroll-fade` | `48px` | Width of the fade at the edges of a tab row that scrolls. Set it on `.nds-scroll-more` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

The instance lives on the element as `ndsTabs`. The same controller runs the [Content Switcher](../components/content-switcher).

| Method | Effect |
|---|---|
| `NDS.Tabs.init()` | Starts every `.nds-tabs` on the page that has not started yet. `reinit()` is the same |
| `NDS.Tabs.create(element)` | Starts one tab set and returns its instance, or the instance it already has |
| `instance.switchTo(index)` | Opens a tab by its position, from 0 |
| `instance.getActiveTabIndex()` | Returns the position of the open tab |
| `instance.getActiveTab()`, `instance.getActivePanel()` | Return the open tab and its panel |
| `instance.destroy()` | Removes the listeners. The markup stays as it is |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:tab:change` | `.nds-tabs`, and it bubbles | `tabIndex`, `tab`, `panel`, `previousTab`, `previousPanel` |
{: .nds-table .nds-responsive}

<script type="text/html" id="tabs-js" data-canon data-lang="js">
var tabs = document.querySelector('#service-tabs');
tabs.addEventListener('nds:tab:change', function (e) {
  console.log('Opened tab', e.detail.tabIndex);
});
tabs.ndsTabs.switchTo(2);
</script>

The full API is in the banner of `_js/nds-tabs.js`.

</div>
  </div>
</section>

<section id="tabsRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Service Page Template](../templates/service-template): the sections of a service in tabs.
- [FAQ Template](../templates/faq-template): questions grouped by topic in tabs.
- [Faculty](../examples/faculty) and [Program](../examples/program): profile and program details in tabs.
- [Content Switcher](../components/content-switcher): the same controller, drawn as one segmented control.
- [Scroll More](../components/scroll-more): the overflow scrolling of the tab row.

</div>
  </div>
</section>
