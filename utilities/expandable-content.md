---
layout: page
title: Expandable Content
hero_title: Expandable Content - National Design System
hero_description: A box that limits long content to a set height, with a Show More button that appears only when the content is taller
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 05:28 PM"
---

<section id="expandable-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Expandable Content is a box, `nds-expandable`, around the content, `nds-expandable-content`. The script measures the content. When it is taller than the max height, the script adds a Show More button.

Pick another component when:

- the content is a set of sections with headings: [Accordion](../components/accordion)
- one line or a few lines of text must fit: [Truncate Text](../utilities/truncate-text)

</div>
  </div>
</section>

<section id="expandable-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="expandable-block" data-canon data-variants="expandable-variants-table">
<div class="nds-expandable">
  <div class="nds-expandable-content nds-prose">
    <p>The National Digital Transformation Strategy sets a framework to modernize government services in all sectors. It has three pillars: the citizen experience, efficient operations, and decisions based on data.</p>
    <p>Each ministry publishes a yearly plan. The plan lists the services that move online, the target dates, and the teams that own each service. Progress is reviewed every quarter.</p>
    <p>Citizens sign in once with their national digital identity. The same account opens every government service, so a citizen does not register again for each portal.</p>
    <p>Service owners measure completion rates, waiting times, and satisfaction scores. They publish the results on a public dashboard that any citizen can read.</p>
    <p>The strategy also sets common standards for accessibility, security, and Arabic content. Every new service must meet them before it goes live.</p>
  </div>
</div>
</script>

<script type="text/html" id="expandable-card" data-canon>
<div class="nds-card nds-stroke nds-expandable">
  <div class="nds-expandable-content">
    <div class="nds-card-content">
      <div class="nds-card-text">
        <span class="nds-card-title">Ministry Services Guide</span>
        <p class="nds-card-description">This guide lists every online service of the ministry, with the documents each one needs. Most services take less than ten minutes to complete. You sign in with your national digital identity, fill in the form, and upload the documents. You can follow the status of each request from your dashboard. For help, call the unified number or open a ticket from the support page. Requests that need a site visit are booked from the same dashboard, and you get a reminder by text message one day before the visit.</p>
      </div>
    </div>
  </div>
</div>
</script>

<script type="text/html" id="expandable-group" data-canon>
<div class="nds-expand-all nds-grid" style="--max-col: 2;">
  <div class="nds-card nds-stroke nds-expandable">
    <div class="nds-expandable-content">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Digital Identity Standards</span>
          <p class="nds-card-description">Rules for identity checks on government platforms: biometric sign-in, single sign-on, and two-factor sign-in for every public service. Each platform passes a security review before launch, and again every year. The rules also cover how long a session stays open, how a user recovers a lost account, and how a platform reports a breach. A platform that fails a review gets thirty days to fix the issues before it goes offline.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-card nds-stroke nds-expandable">
    <div class="nds-expandable-content">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Data Sharing Policy</span>
          <p class="nds-card-description">Rules for sharing data between government bodies: what data can be shared, who approves a request, and how long the data is kept. Every exchange is logged, and the logs are audited every quarter. Personal data is shared only with the consent of its owner, or when a law requires it. Each body names a data officer who answers requests within ten working days and keeps a public record of every agreement.</p>
        </div>
      </div>
    </div>
  </div>
</div>
</script>

    </div>
  </div>
</section>

<section id="expandable-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Max Height goes on `.nds-expandable-content`, and Fade on `.nds-expandable`, each in a `style` attribute. In a group, write them on every box.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Block (default) | — | — | Long text in a page section: a description, legal text, a specification |
| Structure | Card (demo: + h150) | canon `#expandable-card` | — | A card with a long description. `nds-expandable` goes on the card itself |
| Structure | Group (hint: Show More on one card opens both) (demo: + h150) | canon `#expandable-group` | — | Related items that a user compares side by side, such as policy summaries |
| Max Height | 300px (default) | — | `.nds-expandable-content` | A text block in a page section |
| Max Height | 150px (id: h150) | `--max-height: 150px` | `.nds-expandable-content` | A short preview, for cards |
| Fade | 35% (default) | — | `.nds-expandable` | The fade is 35% of the max height, and ends above the button |
| Fade | 60% | `--mask-fade-percentage: 60%` | `.nds-expandable` | A longer fade |
{: #expandable-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="expandable-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Group
{: #expandable-group-behavior}

Put `nds-expand-all` on the parent of several expandable boxes. Show More on one box then opens every box in the group, and Show Less closes them all. Only the boxes in the group itself follow: an expandable box inside a box's content opens and closes by itself.

</div>
  </div>
</section>

<section id="expandable-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Automatic Start</span>
          </span>
          <p class="nds-item-desc">The loader starts the script on every <code class="nds-inline-code lang-html">.nds-expandable</code>. You write no script.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-ruler"></i>
            <span class="nds-label">No Layout Shift</span>
          </span>
          <p class="nds-item-desc">CSS limits the content to the max height before the script runs. The page does not jump when the script starts.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-01"></i>
            <span class="nds-label">Height Check</span>
          </span>
          <p class="nds-item-desc">The script measures the content again when its size changes. When the content fits, the script removes the limit and hides the button.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-transition-bottom"></i>
            <span class="nds-label">Fade</span>
          </span>
          <p class="nds-item-desc">Limited content fades out above the button. No text shows behind the button.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-translate"></i>
            <span class="nds-label">Bilingual Labels</span>
          </span>
          <p class="nds-item-desc">The button reads "Show More" and "Show Less" in English, and «عرض المزيد» and «عرض أقل» in Arabic, from the <code class="nds-inline-code lang-html">lang</code> of the page.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-view"></i>
            <span class="nds-label">Hidden Panels</span>
          </span>
          <p class="nds-item-desc">A box in a hidden panel stays limited until the panel shows. Tabs measures it again when its panel opens.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="expandable-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use it for long text that most users do not read in full: descriptions, legal text, specifications, long lists.
- Do not hide main actions or information that the user must read.
- Do not write the button. The script builds it.
- Write `--max-height` in px. The script cannot read other units, such as `rem`, and shows the button on content that fits.
- Set a max height that shows enough text for the user to decide whether to read more. Below 80px, the first paragraph can be hidden.
- Use a group for related items that the user compares, such as a comparison grid or a set of policy summaries.
- After you add expandable boxes to the page, call `NDS.Expandable.reinit()`.
- After your own script shows a hidden box, call `NDS.Expandable.recheckHeights()`.

</div>
  </div>
</section>

<section id="expandable-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-expand-btn` | the button the script builds | Places the button at the bottom end of the box. Use it to style the button |
| `nds-expandable-clip` | an element between `.nds-expandable` and `.nds-expandable-content` | The script adds it, and CSS clips the element while the content is limited. Do not write it |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-state~="expandable"` | `.nds-expandable` | The script sets it when the content is taller than the max height, and removes it when the content fits. `destroy()` removes it. CSS adds the fade and places the button while it is set |
| `data-state~="expanded"` | `.nds-expandable` | The script sets it when the box opens, and removes it when the box closes or the content fits. `destroy()` removes it |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--max-height` | `300px` | The height of the content while it is limited. Set it on `.nds-expandable-content` or on a parent, in px only. After you change it, call `recheckHeight()` |
| `--mask-fade-percentage` | `35%` | The length of the fade, as a share of the max height. The fade ends above the button. Set it on `.nds-expandable` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

The instance is on the box as `el.ndsExpandable`.

| Method | Effect |
|---|---|
| `NDS.Expandable.init()` | Starts every `.nds-expandable` on the page that has no instance. The loader calls it |
| `NDS.Expandable.reinit()` | The same as `init()`. Call it after you add boxes to the page |
| `NDS.Expandable.recheckHeights()` | Measures every box again |
| `NDS.Expandable.create(el)` | Starts one box, or returns its instance |
| `instance.expandContent()` | Opens the box |
| `instance.collapseContent()` | Closes the box |
| `instance.toggleContent()` | Opens a closed box and closes an open one |
| `instance.recheckHeight()` | Reads `--max-height` and measures the box again |
| `instance.getState()` | Returns `isExpanded`, `hasButton` (the script built the button, shown or hidden), `maxHeight` (px) and `actualHeight` (the full content height in px) |
| `instance.destroy()` | Removes the button, the states and the size watch |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:expandable:expanded` | `.nds-expandable`, after it opens | `container`, `content`, `button`, `isExpanded` |
| `nds:expandable:collapsed` | `.nds-expandable`, after it closes | `container`, `content`, `button`, `isExpanded` |
{: .nds-table .nds-responsive}

Both events bubble. In a group, each box fires its own event.

<script type="text/html" id="expandable-api-js" data-canon data-lang="js">
var box = document.querySelector('#policy-summary');
var expandable = NDS.Expandable.create(box);
expandable.expandContent();

box.addEventListener('nds:expandable:collapsed', function (e) {
  console.log('Closed:', e.detail.content);
});
</script>

The full API is in the banner of `_js/nds-expandable.js`.

</div>
  </div>
</section>

<section id="expandable-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Program](../examples/program): a long program description in a page section.
- [Code](../components/code): a long code block with a Show More button.

</div>
  </div>
</section>
