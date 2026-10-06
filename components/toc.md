---
layout: page
title: TOC
hero_title: TOC - National Design System
hero_description: A table of contents for a long page, built from its headings, that marks the section the reader is on
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 09:57 PM"
---

<section id="tocOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A TOC lists the sections of a long page and links to each one. It has a head with a label and the page title, and a lined [Drawer](../components/drawer) that holds the links. The script builds the links from the page's headings, or reads a list you write.

Pick another component when:

- the links go to other pages, not to sections of this page: [Drawer](../components/drawer)
- the page is a form or a flow in steps: [Stepper](../components/stepper)
- the reader switches between panels in one place: [Tabs](../components/tabs)

</div>
  </div>
</section>

<section id="tocMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Auto-built List
{: .nds-block-title}

The TOC sits in a sticky [Side Info](../ui-shell/sideinfo) column next to the article it lists. Preview opens it in a panel, where the article can scroll.

<script type="text/html" id="toc-auto" data-canon data-preview="panel" data-preview-flush>
<section id="policyPage" class="nds-content-section nds-sideinfo-section">
  <div class="nds-section-body">
    <aside class="nds-sideinfo nds-sticky nds-top" aria-label="On this page">
      <nav class="nds-toc" aria-label="Table of contents" style="--toc-skeleton-rows: 5"
        data-toc-source="#policyPage article" data-toc-levels="h2,h3">
        <div class="nds-toc-head">
          <span class="nds-label">On this page</span>
          <h2 class="nds-toc-title nds-truncate">Privacy Policy</h2>
        </div>
        <div class="nds-drawer nds-lined">
          <ul class="nds-drawer-list"></ul>
        </div>
      </nav>
    </aside>
    <div class="nds-info-content">
      <article class="nds-prose">
        <h2 id="data-we-collect">Data we collect</h2>
        <p>The portal stores your name, national ID and contact details when you create an account.</p>
        <p>It also records the date and time of each sign-in, to protect your account.</p>
        <h3 id="data-from-requests">Data from requests</h3>
        <p>Each service request keeps the documents you upload and the status of the request.</p>
        <p>Documents stay in your account for five years after the request closes.</p>
        <h2 id="how-we-use-data">How we use your data</h2>
        <p>The portal uses your data to process requests and to send you updates about them.</p>
        <p>It never uses your data for advertising, and never sells it.</p>
        <h2 id="data-sharing">Data sharing</h2>
        <p>Your data is shared only with the government agency that handles your request.</p>
        <p>An agency sees only the data that its service needs.</p>
        <h3 id="your-rights">Your rights</h3>
        <p>You can ask for a copy of your data, or ask the portal to correct it.</p>
        <p>The portal answers each request within 30 days.</p>
      </article>
    </div>
  </div>
</section>
</script>

### Manual List
{: .nds-block-title}

You write the links. Nest a `<ul>` inside an `<li>` for each level.

<script type="text/html" id="toc-manual" data-canon>
<nav class="nds-toc" aria-label="Table of contents">
  <div class="nds-toc-head">
    <span class="nds-label">On this page</span>
    <h2 class="nds-toc-title nds-truncate">Annual Report 2025</h2>
  </div>
  <div class="nds-drawer nds-lined">
    <ul class="nds-drawer-list">
      <li>
        <a href="#summary" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-label nds-truncate">Summary</span>
        </a>
      </li>
      <li>
        <a href="#services" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-label nds-truncate">Services</span>
        </a>
        <ul>
          <li>
            <a href="#licenses" class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label nds-truncate">Licenses</span>
            </a>
            <ul>
              <li>
                <a href="#new-licenses" class="nds-btn nds-subtle nds-indicator">
                  <span class="nds-label nds-truncate">New licenses</span>
                </a>
              </li>
              <li>
                <a href="#renewals" class="nds-btn nds-subtle nds-indicator">
                  <span class="nds-label nds-truncate">Renewals</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#appointments" class="nds-btn nds-subtle nds-indicator">
              <span class="nds-label nds-truncate">Appointments</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="#contact" class="nds-btn nds-subtle nds-indicator">
          <span class="nds-label nds-truncate">Contact us</span>
        </a>
      </li>
    </ul>
  </div>
</nav>
</script>

</div>
  </div>
</section>

<section id="tocBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Auto-built List
{: .nds-block-title}

`data-toc-source` on `.nds-toc` names the container to read, as a CSS selector. At init, the script replaces the list with a link to each heading in it, nested by level. `data-toc-levels` picks the levels, such as `h2` for a flat list. The script builds the list once. After the headings change, call `NDS.Toc.destroy(toc)`, then `NDS.Toc.create(toc)`.

### Manual List
{: .nds-block-title}

Without `data-toc-source`, the script reads the links you write. Pick it for some sections only, for anchors that are not headings, or for a shorter label when a heading is too long for the column. Each link's `href` must match an id on the page, or the link is left out of the tracking.

</div>
  </div>
</section>

<section id="tocFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-toc</code> on the page starts by itself, before the page shows.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-eye"></i>
            <span class="nds-label">Active-Section Tracking</span>
          </span>
          <p class="nds-item-desc">As the reader scrolls, the link to the last section that passed under the main navigation shows as active. No link is active until the first section reaches the top. When the article scrolls in a panel or a modal, the TOC tracks and scrolls that box instead of the page.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-tap-01"></i>
            <span class="nds-label">Click-to-Scroll</span>
          </span>
          <p class="nds-item-desc">A click scrolls the heading to just below the main navigation and updates the URL hash, with no new history entry. The scroll is instant when the reader asks for reduced motion.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-list-view"></i>
            <span class="nds-label">Nested Levels</span>
          </span>
          <p class="nds-item-desc">Each nested list is indented, with a line along it, so the reader sees each section's level at a glance.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-anchor"></i>
            <span class="nds-label">Heading Anchors</span>
          </span>
          <p class="nds-item-desc">In an auto-built list, a heading with no <code class="nds-inline-code lang-html">id</code> gets one made from its text, Arabic included, so its link works.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-ruler"></i>
            <span class="nds-label">Reserved Height</span>
          </span>
          <p class="nds-item-desc">Until an auto-built list fills in, it keeps the height of <code class="nds-inline-code lang-css">--toc-skeleton-rows</code> links, so the content under it does not move.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">JavaScript API</span>
          </span>
          <p class="nds-item-desc">Start or stop a TOC from code, and check the active link again after the layout changes.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="tocPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a TOC on long pages: policies, guides and reports. On a short page that fits on the screen, leave it out.
- Use the auto-built list when the links match the headings. It lists every heading at load, so a new section needs no TOC edit.
- Give every heading its own short `id`. An id made from the text changes when the text changes, and breaks the links people shared.
- Keep the list to three levels or fewer. A deeper list is hard to scan, and often means the page should be split. Set `data-toc-levels="h2,h3"` when the page uses `h4` for small labels, not sections.
- Set `--toc-skeleton-rows` on `.nds-toc` to the number of links the page has. On a phone, the TOC sits above the article, so a wrong count moves the article when the list fills in.
- Put the TOC in a sticky `.nds-sideinfo`, so it stays in view. The column is 300px wide for a TOC: `--nds-sideinfo-width` changes it.
- Give the `<nav>` an `aria-label`, so screen reader users can tell it from the page's other navigation.
- Let the script mark the active link. It sets `data-state="active"` from the scroll position, and clears any the markup carries at init.

</div>
  </div>
</section>

<section id="tocApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-toc` | `<nav>` | The TOC. Holds the head and the drawer |
| `nds-toc-head` | `<div>` | The head: a label and the title. Optional |
| `nds-toc-title` | the heading in the head | The page title, in larger semibold type |
| `nds-lined` | `.nds-drawer` | Required. The line along each nested list |
| `nds-loading` | `.nds-toc` | The link labels show as pulsing bars. Use it while the page loads the content. `data-state="loading"` does the same |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-toc-source` | `.nds-toc` | A CSS selector for the container whose headings build the list. It replaces the list you write |
| `data-toc-levels` | `.nds-toc` | The heading levels to list, comma-separated. Default `h2,h3,h4` |
| `data-state="active"` | `<li>` and its link | Set by the script on the link to the current section |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--toc-skeleton-rows` | `6` | Links an auto-built list reserves height for before it fills in, at 36px each. Set it on `.nds-toc` |
| `--drawer-lined-width` | `2px` | Width of the line along nested lists. The TOC sets it on `.nds-toc` |
| `--drawer-lined-block` | `0px` | Space cut from the top and the bottom of that line. The TOC sets it on `.nds-toc` |
| `--drawer-indicator-width` | `3px` | Width of the active link's line. The TOC sets it on its `.nds-drawer`, so set a new value there |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Toc.init()` | Starts every TOC on the page that has not started yet. `reinit()` is the same |
| `NDS.Toc.create(toc)` | Starts one TOC and returns its instance |
| `NDS.Toc.destroy(toc)` | Removes the listeners. The active link keeps its state. `NDS.Init.destroy()` calls it for every TOC in the container it releases |
| `instance.update()` | Picks the active link again from the scroll position. Call it after the layout above the headings changes |
{: .nds-table .nds-responsive}

The TOC fires no events.

<script type="text/html" id="toc-api-js" data-canon data-lang="js">
var toc = document.querySelector('.nds-toc');
// The article's headings changed: build the list again.
NDS.Toc.destroy(toc);
NDS.Toc.create(toc);
</script>

The full API is in the banner of `_js/nds-toc.js`.

</div>
  </div>
</section>

<section id="tocRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Content Template](../templates/content-template): a long article with an auto-built TOC of three levels in a sticky side column.
- [Faculty CV](../examples/faculty-cv): an auto-built TOC of `h2` headings only.
- [Drawer](../components/drawer): the list inside the TOC, with its options.

</div>
  </div>
</section>
