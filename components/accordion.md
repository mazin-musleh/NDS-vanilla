---
layout: page
title: Accordion
hero_title: Accordion - National Design System
hero_description: A stack of headings that each open a panel of content in place
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.0"
last_edit: "28/09/2026 - 12:25 AM"
---

<section id="accordionOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

An accordion is a stack of items. Each item has a heading with a button, and a panel under it that the button opens and closes. The panels open in place and push the content below them down.

Pick another component when:

- people switch between views in one space, and see one at a time: [Tabs](../components/tabs)
- people must compare the content side by side: [Cards](../components/cards)
- the panel opens over the page, not in it: [Dropmenu](../components/dropmenu)

</div>
  </div>
</section>

<section id="accordionMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="accordion-text" data-canon data-variants="accordionVariantsTable">
<div class="nds-accordion" id="service-faq">
  <div class="nds-accordion-item">
    <h3 class="nds-accordion-header" id="faq-heading-1">
      <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" aria-expanded="true" data-state="open" aria-controls="faq-panel-1">
        <span class="nds-accordion-title">Getting started</span>
      </button>
    </h3>
    <div class="nds-accordion-collapse" id="faq-panel-1" data-state="open">
      <div class="nds-accordion-content">
        <div class="nds-accordion-body">
          <p>An overview of the service and how to begin your application.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-accordion-item">
    <h3 class="nds-accordion-header" id="faq-heading-2">
      <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" aria-expanded="false" aria-controls="faq-panel-2">
        <span class="nds-accordion-title">Requirements</span>
      </button>
    </h3>
    <div class="nds-accordion-collapse" id="faq-panel-2">
      <div class="nds-accordion-content">
        <div class="nds-accordion-body">
          <p>The documents and the eligibility criteria you need before you apply.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-accordion-item">
    <h3 class="nds-accordion-header" id="faq-heading-3">
      <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" aria-expanded="false" aria-controls="faq-panel-3">
        <span class="nds-accordion-title">Fees and processing time</span>
      </button>
    </h3>
    <div class="nds-accordion-collapse" id="faq-panel-3">
      <div class="nds-accordion-content">
        <div class="nds-accordion-body">
          <p>The fee schedule and the expected processing time for each request.</p>
        </div>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="accordion-icons" data-canon>
<div class="nds-accordion" id="service-topics">
  <div class="nds-accordion-item">
    <h3 class="nds-accordion-header" id="topic-heading-1">
      <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" aria-expanded="true" data-state="open" aria-controls="topic-panel-1">
        <i class="hgi hgi-stroke hgi-home-01" aria-hidden="true"></i>
        <span class="nds-accordion-title">Housing</span>
      </button>
    </h3>
    <div class="nds-accordion-collapse" id="topic-panel-1" data-state="open">
      <div class="nds-accordion-content">
        <div class="nds-accordion-body">
          <p>Browse the housing programs and check your eligibility.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-accordion-item">
    <h3 class="nds-accordion-header" id="topic-heading-2">
      <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" aria-expanded="false" aria-controls="topic-panel-2">
        <i class="hgi hgi-stroke hgi-graduation-scroll" aria-hidden="true"></i>
        <span class="nds-accordion-title">Education</span>
      </button>
    </h3>
    <div class="nds-accordion-collapse" id="topic-panel-2">
      <div class="nds-accordion-content">
        <div class="nds-accordion-body">
          <p>Scholarships, transcripts and certification exams.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-accordion-item">
    <h3 class="nds-accordion-header" id="topic-heading-3">
      <button type="button" class="nds-btn nds-subtle nds-menu-btn nds-accordion-btn" aria-expanded="false" aria-controls="topic-panel-3">
        <i class="hgi hgi-stroke hgi-car-01" aria-hidden="true"></i>
        <span class="nds-accordion-title">Vehicles</span>
      </button>
    </h3>
    <div class="nds-accordion-collapse" id="topic-panel-3">
      <div class="nds-accordion-content">
        <div class="nds-accordion-body">
          <p>Registration renewal, traffic fines and driving tests.</p>
        </div>
      </div>
    </div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="accordionVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The first item is open in the markup: its button has `aria-expanded="true"` and `data-state="open"`, and its `nds-accordion-collapse` has `data-state="open"`. Keep all three, so the item shows open before the script runs. To open another item first, move the three to it. To start with all items closed, remove both `data-state="open"` and set `aria-expanded="false"`. Stroke and Shadow need Card.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Text (default) | — | — | A title on each button. For most lists, such as questions and answers |
| Structure | Leading icons | canon #accordion-icons | — | An icon before each title, for topics that people find faster by picture. Give every item an icon, or none |
| Size | LG (default) | — | — | 56px headings, for page content. It needs no class |
| Size | MD | `.nds-md` | `.nds-accordion` | 48px headings, for a side column or a card |
| Size | SM | `.nds-sm` | `.nds-accordion` | 40px headings, for a dense list in a panel or a filter |
| Card | Card | `.nds-card` | `.nds-accordion` | A card background and rounded corners around the whole list. The first item loses its top line |
| Stroke | Stroke | `.nds-stroke` | `.nds-accordion.nds-card` | A border around the card |
| Shadow | Shadow | `.nds-shadow` | `.nds-accordion.nds-card` | A shadow under the card, to lift it off a colored background |
| Always open | Always open | `[data-state~="always-open"]` | `.nds-accordion` | Several items stay open at once. Without it, opening one item closes the others |
| Loading | Loading | `.nds-loading` | `.nds-accordion` | Gray bars in place of the titles, the icons and the open panel while the content loads |
{: #accordionVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="accordionBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### One Open Item
{: .nds-block-title}

By default, one item is open at a time. When a person opens an item, the open one closes, so the list stays short. Pick it for questions and answers, where people read one answer and move on.

### Always Open
{: .nds-block-title}

`data-state="always-open"` on `.nds-accordion` lets each item open and close on its own. Items stay open until the person closes them. Pick it when people compare two answers, or keep one panel open while they work in another.

</div>
  </div>
</section>

<section id="accordionFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every accordion on the page starts by itself. Opening, closing and the keyboard need no call.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-motion-01"></i>
            <span class="nds-label">Animations</span>
          </span>
          <p class="nds-item-desc">Panels slide open and closed. The motion stops when the user prefers reduced motion, and an item that is open at load does not animate.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Navigation</span>
          </span>
          <p class="nds-item-desc">The up and down arrows move between the headings and wrap at the ends. Home and End jump to the first and the last heading. Enter or Space opens or closes the focused item.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Loading Skeleton</span>
          </span>
          <p class="nds-item-desc">Gray bars stand in for the titles and the open panel until the script starts. In a list that a filter controls, they stay until the filter has applied the choices in the URL.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Nested Accordions</span>
          </span>
          <p class="nds-item-desc">A panel can hold another accordion. Each accordion runs its own items and ignores the items of the one inside it.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-printer"></i>
            <span class="nds-label">Print</span>
          </span>
          <p class="nds-item-desc">Every panel prints open, so no content is lost on paper.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-access"></i>
            <span class="nds-label">Screen Readers and High Contrast</span>
          </span>
          <p class="nds-item-desc">The script keeps <code class="nds-inline-code lang-html">aria-expanded</code> on each button in step with its panel. In high-contrast mode, the lines between items get stronger and the focus ring gets wider.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-notification-square"></i>
            <span class="nds-label">Open and Close Events</span>
          </span>
          <p class="nds-item-desc">An event fires when a panel has finished opening or closing, for analytics or for content that loads on open.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="accordionPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use an accordion when people scan the headings and open only what they need: questions and answers, services grouped by topic, settings.
- Keep titles short. People decide to open an item from its title alone.
- Put the item people open most first, and open it at load when most visitors need it.
- Pick the heading level that fits the page outline. The markup above uses `h3`, under an `h2` section title.
- Keep one button and one `nds-accordion-collapse` in each item. The script pairs them by their order in the markup.
- Give each button `aria-controls` with the `id` of its collapse.
- Do not add `role="region"`, `aria-label` or `aria-labelledby` to `nds-accordion-collapse`. On a long list, every panel becomes a landmark. On a plain `div`, the two labels are not allowed, so an accessibility audit fails.
- Do not hide content that people must see to finish a task, such as a required step or a warning.
- After you add items to a live accordion, call `NDS.Accordion.reinit()`. The new items start working, and the open items stay open.

</div>
  </div>
</section>

<section id="accordionApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `aria-expanded="true"` and `data-state="open"` | `.nds-accordion-btn` | Opens the item at load. The script reads `aria-expanded`. `data-state` turns the arrow before the script runs |
| `data-state="open"` | `.nds-accordion-collapse` | Shows the panel at load, before the script runs. Set it with the two attributes above |
| `data-state="loading"` | `.nds-accordion` | The same as `nds-loading`, for a script that already sets states |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set them on `.nds-accordion`, in its `style` attribute.

| Property | Default | Controls |
|---|---|---|
| `--accordion-header-height` | `56px`, `48px` with `nds-md`, `40px` with `nds-sm` | Minimum height of each heading button |
| `--accordion-header-padding` | `var(--spacing-xl)`, `var(--spacing-lg)` with `nds-md`, `var(--spacing-md)` with `nds-sm` | Padding above and below the title in each heading button |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

The instance lives on `.nds-accordion` as `ndsAccordion`. Item positions start at 0.

| Method | Effect |
|---|---|
| `NDS.Accordion.init()` | Starts every accordion on the page that has not started yet. On an accordion that already started, it picks up the new items. `reinit()` is the same |
| `NDS.Accordion.create(element)` | Starts one accordion and returns its instance, or the instance it already has |
| `instance.openItem(index)`, `instance.closeItem(index)`, `instance.toggleItem(index)` | Open, close or toggle an item by its position |
| `instance.closeAll()` | Closes every open item |
| `instance.getOpenItems()` | Returns the open items, each as `{ index, button, collapse, isOpen }` |
| `instance.refresh()` | Picks up the items put into this accordion after it started |
| `instance.destroy()` | Removes the listeners. The markup stays as it is |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:accordion:shown` | `.nds-accordion`, after the panel opens, and it bubbles | `index`, `button`, `collapse`, `accordion` |
| `nds:accordion:hidden` | `.nds-accordion`, after the panel closes, and it bubbles | `index`, `button`, `collapse`, `accordion` |
{: .nds-table .nds-responsive}

<script type="text/html" id="accordion-api-js" data-canon data-lang="js">
var faq = document.querySelector('#service-faq');
faq.addEventListener('nds:accordion:shown', function (e) {
  console.log('Opened item', e.detail.index);
});
faq.ndsAccordion.openItem(2);
</script>

The full API is in the banner of `_js/nds-accordion.js`.

</div>
  </div>
</section>

<section id="accordionRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [FAQ template](../templates/faq-template): questions and answers in an accordion, with a search filter and pages.
- [Filter](../components/filter): `data-filter-accordion` shows a filter group as an accordion item.

</div>
  </div>
</section>
