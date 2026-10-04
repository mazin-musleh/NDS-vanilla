---
layout: page
title: Header
hero_title: Header - National Design System
hero_description: The top of every page, which holds the top bar, the digital stamp panel and the main navigation.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.11.0"
last_edit: "04/10/2026 - 05:06 PM"
---

<section id="headerOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The header holds three parts: the top bar, the digital stamp panel and the main navigation. It draws no box of its own. `header` has `display: contents`, so its parts sit in the page as if the header were not there.

The links at the end of the page belong in the [Footer](../ui-shell/footer), and the links inside one section in the [Side Menu](../ui-shell/sidemenu).

</div>
  </div>
</section>

<section id="headerMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Usage</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The code shows the outer element of each part. Copy each part whole from its own page, or copy the whole header from the built HTML of a live page.

<script type="text/html" id="header-canon" data-canon data-preview="none">
<header>
  <div class="nds-topbar nds-content-wrapper" role="region" aria-label="Top bar utilities">
    <!-- The stamp tab, the widgets and the dark mode button: ../ui-shell/topbar -->
  </div>
  <div id="nds-digitalStamp" role="region" aria-label="Digital government stamp" hidden>
    <!-- The stamp panel: ../ui-shell/topbar -->
  </div>
  <nav class="nds-main-nav nds-content-wrapper" id="nds-main-nav" aria-label="Primary navigation">
    <!-- The brand, the links and the actions: ../ui-shell/mainnav -->
  </nav>
</header>
</script>

</div>
  </div>
</section>

<section id="headerParts" class="nds-content-section nds-doc-parts">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Parts</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

| Part | Holds | Required |
|---|---|---|
| `header` | The three parts below | Yes |
| `.nds-topbar` | The top bar: the stamp tab, the widgets and the dark mode button. See [Top Bar](../ui-shell/topbar) | Yes, on a government site |
| `#nds-digitalStamp` | The stamp panel, right after the top bar. The stamp tab opens it. See [Top Bar](../ui-shell/topbar#dgaDigitalStamp) | Yes, with the stamp tab |
| `nav.nds-main-nav` | The main navigation: the brand, the links, the dropdowns and the actions. See [Main Navigation](../ui-shell/mainnav) | Yes |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="headerFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-pin"></i>
            <span class="nds-label">Sticky Navigation</span>
          </span>
          <p class="nds-item-desc">The main navigation sticks to the top of the screen while the page scrolls, and the top bar scrolls away. The navigation sticks inside <code class="nds-inline-code lang-html">body</code>, not inside the header, because the header has no box.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cancel-circle"></i>
            <span class="nds-label">One Panel at a Time</span>
          </span>
          <p class="nds-item-desc">The stamp panel and the main navigation's menu close each other. When one opens, the other closes.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="headerPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Style the parts, not the header. Background, padding, borders and the sticky position go on `.nds-topbar` and `.nds-main-nav`. Rules on `header` render nothing.
- The `display: contents` rule hits every `header` element on the page, such as an article header in your own markup. Put that header's styles on a child element, or use a `div`.
- Use one header per page: the first element in `body` after the skip link. See [Page Layout](../layout/page-layout).
- Keep the parts in the order of the Parts table. The stamp panel opens right below the top bar, and the main navigation comes last.
- Leave the header out of a minimal page, such as sign in or a one-time code. See [Page Layout](../layout/page-layout).

</div>
  </div>
</section>

<section id="headerRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Top Bar](../ui-shell/topbar) and [Main Navigation](../ui-shell/mainnav): the parts of the header, with their options and APIs.
- [Page Layout](../layout/page-layout): where the header sits in `body`, and the page shapes without one.
- [Home Page Template](../templates/home-template): the header in a complete page.
- [Footer](../ui-shell/footer): the other end of the page shell.

</div>
  </div>
</section>
