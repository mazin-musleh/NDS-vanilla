---
layout: page
title: Breadcrumb
hero_title: Breadcrumb - National Design System
hero_description: A trail of links that shows where the current page sits in the site.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "27/09/2026 - 09:49 PM"
---

<section id="breadcrumbOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A breadcrumb is a `<nav>` that holds an ordered list: one item per level, from Home to the current page. A script collapses a long trail behind a More button.

Pick another component when:

- the links are the site's navigation: [Main Navigation](../ui-shell/mainnav) or [Side Menu](../ui-shell/sidemenu)
- the links move between the steps of one task: [Stepper](../components/stepper)
- the links switch views on one page: [Tabs](../components/tabs)

</div>
  </div>
</section>

<section id="breadcrumbMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="breadcrumb-standard" data-canon data-variants="breadcrumbVariantsTable">
<nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
  <ol class="nds-breadcrumb">
    <li><a href="#">Home</a></li>
    <li><a href="#">Services</a></li>
    <li aria-current="page">Register a new commercial establishment and issue its first license</li>
  </ol>
</nav>
</script>

<script type="text/html" id="breadcrumb-two-levels" data-canon>
<nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
  <ol class="nds-breadcrumb">
    <li><a href="#">Home</a></li>
    <li aria-current="page">Services</li>
  </ol>
</nav>
</script>

<script type="text/html" id="breadcrumb-deep" data-canon>
<nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
  <ol class="nds-breadcrumb">
    <li><a href="#">Home</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Business</a></li>
    <li><a href="#">Licenses</a></li>
    <li><a href="#">Commercial</a></li>
    <li><a href="#">Renewals</a></li>
    <li aria-current="page">Renew a commercial license</li>
  </ol>
</nav>
</script>
    </div>
  </div>
</section>

<section id="breadcrumbVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

`li:last-child` is the current page item.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Standard (default) | — | — | Three levels: Home, a parent page and the current page |
| Structure | Short trail | `canon #breadcrumb-two-levels` | — | Two levels: Home and the current page, for a page one step below Home |
| Structure | Deep trail | `canon #breadcrumb-deep` | — | Seven levels. The script shows the first level, a More button and the last two |
| Truncate | Truncate | `.nds-truncate` | `li:last-child` | Cuts a long current page title with an ellipsis, so the trail stays on one line |
| Loading | Loading | `.nds-loading` | `.nds-breadcrumb-nav` | Shows each label as a pulsing skeleton bar while the trail content loads. Remove it when the content is ready |
{: #breadcrumbVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="breadcrumbFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">The script sets up every <code class="nds-inline-code lang-html">.nds-breadcrumb-nav</code> when the page loads. It needs no call.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-menu-02"></i>
            <span class="nds-label">Automatic Collapse</span>
          </span>
          <p class="nds-item-desc">A trail of more than 5 levels shows the first level, a More button and the last two. The button opens a menu of the hidden levels.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Support</span>
          </span>
          <p class="nds-item-desc">The More menu is a <a href="../components/dropmenu">Dropmenu</a>, so it opens, moves between items and closes with the keyboard.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Stable Layout</span>
          </span>
          <p class="nds-item-desc">Until the script runs, each label shows as a skeleton bar. A long trail already takes its collapsed size, so the page does not shift when it collapses.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-link-01"></i>
            <span class="nds-label">Neutral Links</span>
          </span>
          <p class="nds-item-desc">The links use the neutral link colors, so the trail stays quieter than the page content. Add <code class="nds-inline-code lang-html">nds-primary</code> to one link that must stand out.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="breadcrumbPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Show a breadcrumb on every page below Home. Leave it off the home page.
- Start the trail with Home.
- End the trail with the current page as plain text in `<li aria-current="page">`. Do not make it a link.
- Keep `aria-label` on the `<nav>`, so screen readers can name the landmark.
- Write every level in the markup. Do not hide levels yourself: the script collapses the trail.
- Make each middle level a plain `<a>` with text. The More menu copies only the link address and its text.
- Keep the text of each level short, so the trail reads at a glance.
- Add `nds-truncate` to the current item when page titles can be long. The title then stops at about 45 characters.

</div>
  </div>
</section>

<section id="breadcrumbApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-breadcrumb-ellipsis` | `<li>` | The script adds this item to a collapsed trail. It holds the More button and its menu |
| `nds-breadcrumb-menu` | `.nds-dropmenu-menu` | The script adds it to the More menu. Style the menu with this class: it still matches when the menu moves to `<body>` |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-state="loading"` | `.nds-breadcrumb-nav` | The same as `nds-loading` |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Breadcrumb.init()` | Sets up every `.nds-breadcrumb-nav` that is not set up yet, and stores its instance in `nav.ndsBreadcrumb`. It runs on page load |
| `NDS.Breadcrumb.reinit()` | The same as `init()`. Call it after you add a breadcrumb to the page |
| `NDS.Breadcrumb.create(nav)` | Sets up one breadcrumb and returns its instance |
| `instance.destroy()` | Removes the More menu and puts every level back |
{: .nds-table .nds-responsive}

Destroy a trail before you change its list, then call `reinit()`:

<script type="text/html" id="breadcrumb-js" data-canon data-lang="js">
const nav = document.querySelector('.nds-breadcrumb-nav');
nav.ndsBreadcrumb?.destroy();
nav.querySelector('.nds-breadcrumb').innerHTML =
  '<li><a href="/">Home</a></li><li aria-current="page">Services</li>';
NDS.Breadcrumb.reinit();
</script>

The full API is in the banner of `_js/nds-breadcrumb.js`.

</div>
  </div>
</section>

<section id="breadcrumbRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Hero](../ui-shell/hero): the sub hero holds the page's breadcrumb above the title, with a truncated current item.
- [Service Template](../templates/service-template): a template page whose breadcrumb shows its parent section.

</div>
  </div>
</section>
