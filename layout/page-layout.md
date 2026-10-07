---
layout: page
title: Page Layout
hero_title: Page Layout - National Design System
hero_description: The body structure every NDS page is built on, from the header to the footer, and the classes that pick the page shape
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.8.0"
updated: "1.12.x"
last_edit: "07/10/2026 - 03:20 PM"
---

<section id="pageLayoutOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Every NDS page has one body structure. A skip link comes first, then the `header`, `main` and the `footer`. `main` holds the hero and one `nds-content-layout`. The content layout holds an optional side menu and `nds-content`, and `nds-content` holds the page sections. Classes on `body`, on the content layout and on the main content pick the page shape.

Each shape in the builder below is the markup of a live page. Open the page to see the whole shape at work. Chrome is the frame around the content: `full` has the header and the footer, `minimal` has neither, and `console` reaches the screen edges:

| Shape | Use | Chrome | Live page |
|---|---|---|---|
| Standard page | A service, information or documentation page | `full` | [Services List](../examples/services-list) |
| Standard page + Side info | A service page, with its facts beside the first section | `full` | [Service Template](../templates/service-template) |
| Home | The home page | `full` | [Home Page Template](../templates/home-template) |
| Article | A guide or a long text, with a table of contents | `full` | [Get Started](../guides/get-started) |
| Minimal | Sign in and other focused steps | `minimal` | [Sign In](../examples/sign-in) |
| Console | An admin or back-office page | `console` | [Console](../examples/console-demo) |
{: .nds-table .nds-responsive}

Pick another page when:

- you build the content of one section: [Section](../layout/section)
- you place columns inside a section: [Grid](../layout/grid)

The `<head>` and the markup of the header, hero, side menu and footer are on their own pages: [Head](../ui-shell/head), [Header](../ui-shell/header), [Hero](../ui-shell/hero), [Side Menu](../ui-shell/sidemenu) and [Footer](../ui-shell/footer).

</div>
  </div>
</section>

<section id="pageLayoutMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="layout-content" data-canon data-variants="pageLayoutVariantsTable" data-preview="page">
<body>
  <a class="nds-skip-link" href="#main-content">Skip to main content</a>
  <header>
    <!-- Copy the header whole from the built HTML of a live page: ../ui-shell/header -->
  </header>
  <main>
    <section class="nds-hero-section nds-sub">
      <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
        <ol class="nds-breadcrumb">
          <li><a href="#">Home</a></li>
          <li class="nds-truncate" aria-current="page">Hero Section</li>
        </ol>
      </nav>
      <div class="nds-section-wrapper">
        <div class="nds-section-head">
          <h1 class="nds-section-title">Hero Section</h1>
        </div>
      </div>
    </section>
    <div class="nds-content-layout">
      <div class="nds-content" id="main-content">
        <section class="nds-content-section">
          <div class="nds-section-wrapper">
            <div class="nds-section-head">
              <h2 class="nds-section-title">Renew a Passport</h2>
              <p class="nds-section-description">Renew your passport online through Absher. The new passport is ready within 3 working days.</p>
            </div>
          </div>
        </section>
        <section class="nds-content-section">
          <div class="nds-section-wrapper">
            <div class="nds-section-head">
              <h2 class="nds-section-title">Required Documents</h2>
              <p class="nds-section-description">Bring the old passport and your national ID when you pick up the new passport.</p>
            </div>
          </div>
        </section>
        <section class="nds-content-section">
          <div class="nds-section-wrapper">
            <div class="nds-section-head">
              <h2 class="nds-section-title">Fees</h2>
              <p class="nds-section-description">The fee is 300 riyals for 5 years, or 600 riyals for 10 years.</p>
            </div>
          </div>
        </section>
        <section class="nds-last-edit nds-content-section">
          Last Modified Date: 12/08/2026 - 10:30 AM
        </section>
      </div>
    </div>
    <section class="nds-user-feedback-section nds-content-section">
      <!-- The page feedback: ../components/user-feedback -->
    </section>
  </main>
  <footer class="nds-footer nds-content-wrapper nds-brand" role="contentinfo" aria-label="Site Footer">
    <!-- Copy the footer whole from the built HTML of a live page: ../ui-shell/footer -->
  </footer>
  <!-- Last in body: the nds-main.min.js script tag, see ../ui-shell/head -->
</body>
</script>
<script type="text/html" id="layout-home" data-canon>
<body>
  <a class="nds-skip-link" href="#main-content">Skip to main content</a>
  <header>
    <!-- Copy the header whole from the built HTML of a live page: ../ui-shell/header -->
  </header>
  <main>
    <section class="nds-hero-section">
      <!-- One slide. More slides and the loop: ../ui-shell/hero -->
      <div class="nds-swiper nds-hero nds-oncolor nds-full-width" style="--total: 1">
        <div class="nds-swiper-wrapper">
          <div class="nds-swiper-slide nds-content-wrapper">
            <div class="nds-hero-image-wrapper" style="--overlay: 0.6">
              <picture>
                <source media="(max-width: 768px)" srcset="../assets/img/riyadhcenter_IQ_sm.webp">
                <source media="(max-width: 1646px)" srcset="../assets/img/riyadhcenter_IQ_md.webp">
                <img src="../assets/img/riyadhcenter_IQ.webp" class="nds-hero-image" alt="" fetchpriority="high">
              </picture>
            </div>
            <div class="nds-section-body">
              <h1 class="nds-section-title">Hero Section</h1>
              <p class="nds-section-description">E-services for every citizen and resident, in one place.</p>
            </div>
          </div>
        </div>
        <div class="nds-swiper-navigation" hidden>
          <div class="nds-swiper-buttons">
            <button class="nds-btn nds-subtle nds-icon-only nds-prev" aria-label="Previous slide"></button>
            <button class="nds-btn nds-subtle nds-icon-only nds-next" aria-label="Next slide"></button>
          </div>
          <div class="nds-swiper-pagination"></div>
        </div>
      </div>
    </section>
    <div class="nds-content-layout">
      <div class="nds-content" id="main-content">
        <section class="nds-content-section">
          <div class="nds-section-wrapper">
            <div class="nds-section-head">
              <h2 class="nds-section-title">E-Services</h2>
              <p class="nds-section-description">Apply, renew and pay online, at any time.</p>
            </div>
          </div>
        </section>
        <section class="nds-content-section">
          <div class="nds-section-wrapper">
            <div class="nds-section-head">
              <h2 class="nds-section-title">News</h2>
              <p class="nds-section-description">The latest announcements from the ministry.</p>
            </div>
          </div>
        </section>
        <section class="nds-content-section">
          <div class="nds-section-wrapper">
            <div class="nds-section-head">
              <h2 class="nds-section-title">Open Data</h2>
              <p class="nds-section-description">Download the ministry's public data sets.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
  <footer class="nds-footer nds-content-wrapper nds-brand" role="contentinfo" aria-label="Site Footer">
    <!-- Copy the footer whole from the built HTML of a live page: ../ui-shell/footer -->
  </footer>
  <!-- Last in body: the nds-main.min.js script tag, see ../ui-shell/head -->
</body>
</script>
<script type="text/html" id="layout-article" data-canon>
<body>
  <a class="nds-skip-link" href="#main-content">Skip to main content</a>
  <header>
    <!-- Copy the header whole from the built HTML of a live page: ../ui-shell/header -->
  </header>
  <main>
    <section class="nds-hero-section nds-sub nds-flat">
      <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
        <ol class="nds-breadcrumb">
          <li><a href="#">Home</a></li>
          <li class="nds-truncate" aria-current="page">Hero Section</li>
        </ol>
      </nav>
      <div class="nds-section-wrapper">
        <div class="nds-section-head">
          <h1 class="nds-section-title">Hero Section</h1>
        </div>
      </div>
    </section>
    <div class="nds-content-layout nds-has-sideinfo">
      <div class="nds-content" id="main-content">
        <section id="passport-guide" class="nds-content-section nds-sideinfo-section">
          <div class="nds-section-body">
            <aside class="nds-sideinfo nds-sticky nds-top" aria-label="On this page">
              <nav class="nds-toc" aria-label="Table of contents" data-toc-source="#passport-guide article" data-toc-levels="h2, h3">
                <div class="nds-toc-head">
                  <span class="nds-label">On this page</span>
                  <h2 class="nds-toc-title nds-truncate">Passport Guide</h2>
                </div>
                <div class="nds-drawer nds-lined">
                  <ul class="nds-drawer-list"></ul>
                </div>
              </nav>
            </aside>
            <div class="nds-info-content">
              <article class="nds-prose">
                <h2 id="eligibility">Eligibility</h2>
                <p>Saudi citizens aged 21 or older can renew a passport online.</p>
                <h2 id="steps">Steps</h2>
                <p>Sign in to Absher, open Passports and choose Renew Passport.</p>
                <h2 id="pickup">Pickup</h2>
                <p>Bring the old passport when you pick up the new one.</p>
              </article>
            </div>
          </div>
        </section>
        <section class="nds-last-edit nds-content-section">
          Last Modified Date: 12/08/2026 - 10:30 AM
        </section>
      </div>
    </div>
    <section class="nds-user-feedback-section nds-content-section">
      <!-- The page feedback: ../components/user-feedback -->
    </section>
  </main>
  <footer class="nds-footer nds-content-wrapper nds-brand" role="contentinfo" aria-label="Site Footer">
    <!-- Copy the footer whole from the built HTML of a live page: ../ui-shell/footer -->
  </footer>
  <!-- Last in body: the nds-main.min.js script tag, see ../ui-shell/head -->
</body>
</script>
<script type="text/html" id="layout-minimal" data-canon>
<body class="nds-page-bg" style="--bg-img: url('../assets/img/riyadhcenter.webp')">
  <a class="nds-skip-link" href="#main-content">Skip to main content</a>
  <main>
    <div class="nds-content-layout nds-content-wrapper nds-middle">
      <div class="nds-content" id="main-content">
        <section class="nds-content-section nds-ghost nds-flush">
          <div class="nds-section-wrapper">
            <div class="nds-section-body">
              <div class="nds-block nds-flex nds-col" style="--align: center;">
                <div class="nds-card nds-shadow nds-stroke">
                  <div class="nds-card-content">
                    <div class="nds-card-text nds-center">
                      <h1 class="nds-card-title">Sign in</h1>
                      <p class="nds-card-description">Use your National Single Sign-On account to reach every service on this portal.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
  <!-- Last in body: the nds-main.min.js script tag, see ../ui-shell/head -->
</body>
</script>
<script type="text/html" id="layout-console" data-canon>
<body class="nds-full-width">
  <a class="nds-skip-link" href="#main-content">Skip to main content</a>
  <header>
    <!-- Copy the header whole from the built HTML of a live page: ../ui-shell/header -->
  </header>
  <main>
    <div class="nds-content-layout nds-has-sidemenu">
      <aside class="nds-sidemenu" aria-label="Sidebar">
        <button class="nds-sidemenu-toggle nds-btn nds-peek" aria-label="Sidebar Menu" hidden>
          <i class="nds-icon nds-hgi-menu-02" aria-hidden="true"></i>
          <span class="nds-label nds-truncate">Side menu</span>
        </button>
        <nav class="nds-drawer nds-divided nds-lined">
          <div class="nds-scroll-more nds-divided">
            <ul class="nds-drawer-list nds-scroll-more-content">
              <li data-state="active">
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">Requests</span>
                </a>
              </li>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">Team</span>
                </a>
              </li>
              <li>
                <a class="nds-btn nds-subtle nds-indicator" href="#">
                  <span class="nds-label">Reports</span>
                </a>
              </li>
            </ul>
            <button class="nds-show-more nds-btn nds-subtle" aria-label="Show more">
              <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
            </button>
          </div>
        </nav>
      </aside>
      <div class="nds-content" id="main-content">
        <section class="nds-hero-section nds-sub">
          <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
            <ol class="nds-breadcrumb">
              <li><a href="#">Home</a></li>
              <li class="nds-truncate" aria-current="page">Hero Section</li>
            </ol>
          </nav>
          <div class="nds-section-wrapper">
            <div class="nds-section-head">
              <h1 class="nds-section-title">Hero Section</h1>
            </div>
          </div>
        </section>
        <section class="nds-content-section">
          <div class="nds-section-wrapper">
            <div class="nds-section-head">
              <h2 class="nds-section-title">Open Requests</h2>
              <p class="nds-section-description">24 requests wait for review.</p>
            </div>
          </div>
        </section>
        <section class="nds-content-section">
          <div class="nds-section-wrapper">
            <div class="nds-section-head">
              <h2 class="nds-section-title">Team</h2>
              <p class="nds-section-description">6 reviewers are on shift today.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
  <footer class="nds-footer nds-content-wrapper nds-brand" role="contentinfo" aria-label="Site Footer">
    <!-- Copy the footer whole from the built HTML of a live page: ../ui-shell/footer -->
  </footer>
  <!-- Last in body: the nds-main.min.js script tag, see ../ui-shell/head -->
</body>
</script>
<script type="text/html" id="layout-sidemenu" data-canon>
<aside class="nds-sidemenu" aria-label="Sidebar">
  <button class="nds-sidemenu-toggle nds-btn nds-peek" aria-label="Sidebar Menu" hidden>
    <i class="nds-icon nds-hgi-menu-02" aria-hidden="true"></i>
    <span class="nds-label nds-truncate">Side menu</span>
  </button>
  <nav class="nds-drawer nds-divided nds-lined">
    <div class="nds-scroll-more nds-divided">
      <ul class="nds-drawer-list nds-scroll-more-content">
        <li data-state="active">
          <a class="nds-btn nds-subtle nds-indicator" href="#">
            <span class="nds-label">Passports</span>
          </a>
        </li>
        <li>
          <a class="nds-btn nds-subtle nds-indicator" href="#">
            <span class="nds-label">National ID</span>
          </a>
        </li>
        <li>
          <a class="nds-btn nds-subtle nds-indicator" href="#">
            <span class="nds-label">Visas</span>
          </a>
        </li>
      </ul>
      <button class="nds-show-more nds-btn nds-subtle" aria-label="Show more">
        <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
      </button>
    </div>
  </nav>
</aside>
</script>
<script type="text/html" id="layout-sideinfo" data-canon>
<section class="nds-content-section nds-sideinfo-section">
  <div class="nds-section-body">
    <div class="nds-info-content">
      <article class="nds-prose">
        <h2>Service Description</h2>
        <p>Renew your passport online through Absher, with no visit to an office.</p>
      </article>
    </div>
    <aside class="nds-sideinfo" aria-label="Service information">
      <dl class="nds-definition-list nds-card nds-stroke nds-shadow">
        <div class="nds-definition-item">
          <dt>
            <i class="hgi hgi-stroke hgi-user-multiple-02"></i>
            <span class="nds-label">Beneficiaries</span>
          </dt>
          <dd>Citizens</dd>
        </div>
        <div class="nds-definition-item">
          <dt>
            <i class="hgi hgi-stroke hgi-clock-01"></i>
            <span class="nds-label">Duration</span>
          </dt>
          <dd>3 working days</dd>
        </div>
        <div class="nds-definition-item">
          <dt>
            <i class="hgi hgi-stroke hgi-riyal"></i>
            <span class="nds-label">Fee</span>
          </dt>
          <dd>300 riyals</dd>
        </div>
      </dl>
    </aside>
  </div>
</section>
</script>
    </div>
  </div>
</section>

<section id="pageLayoutParts" class="nds-content-section nds-doc-parts">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Parts</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

| Part | Holds | Required |
|---|---|---|
| `body` | The skip link, the header, `main` and the footer, in a column. `nds-full-width` takes a console to the screen edges, and `nds-page-bg` puts an image behind a minimal page | Yes |
| `a.nds-skip-link` | The first child of `body`: a link to `#main-content`, hidden until it has focus. The label is "Skip to main content", or "تخطي إلى المحتوى الرئيسي" on an Arabic page | Yes |
| `header` | The top bar and the main navigation: [Header](../ui-shell/header). A minimal page has none | No |
| `main` | The hero, the content layout, and the page feedback after it | Yes |
| `section.nds-hero-section` | The page hero: [Hero](../ui-shell/hero). A standard page uses the sub hero (`nds-sub`), and the home page the hero slider. An article adds `nds-flat`, and a service page with side info adds `nds-aside`. A console puts the hero in `nds-content` | No |
| `.nds-content-layout` | The side menu, if any, and `nds-content`. The shape classes go on it | Yes |
| `aside.nds-sidemenu` | The side menu, as the first child: [Side Menu](../ui-shell/sidemenu). It needs `nds-has-sidemenu` on the content layout | No |
| `.nds-content` | The page sections, with `id="main-content"` for the skip link. The stripe classes go on it | Yes |
| `section.nds-content-section` | One page section: [Section](../layout/section) | Yes |
| `section.nds-last-edit.nds-content-section` | The last modified date, as the last section of `nds-content` | No |
| `section.nds-user-feedback-section` | The page feedback, in `main` after the content layout: [User Feedback](../components/user-feedback) | No |
| `footer.nds-footer` | The footer: [Footer](../ui-shell/footer). A minimal page has none | No |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="pageLayoutVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Each shape is the markup of a live page, listed in the Overview. Side menu and Side info go on a standard page only. Side info writes three changes: the hero class, the content layout class, and the side info section as the first section.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Standard page (default) (id: standard) | — | — | A service, information or documentation page: the sub hero first in `main`, then the content layout, then the page feedback |
| Structure | Home (id: home) (demo: + stripe) | `canon #layout-home` | — | The home page: the hero slider first in `main`. Write Stripe too: the home page stripes its sections. No page feedback |
| Structure | Article (id: article) | `canon #layout-article` | — | A guide or a long text page: a flat hero, then one section that holds the text and a table of contents beside it |
| Structure | Minimal (id: minimal) | `canon #layout-minimal` | — | Sign in, a one-time code and other focused steps. No header, hero or footer. The content centers in the screen, over an optional page image |
| Structure | Console (id: console) | `canon #layout-console` | — | An admin or back-office page. `nds-full-width` on `body` takes the page to the screen edges, and the hero sits in `nds-content` beside the side menu |
| Side column | None (default) | — | — | No side column |
| Side column | Side menu (not: home, article, minimal, console) | `.nds-has-sidemenu` | `.nds-content-layout` | A menu of the pages in this part of the site, beside the content on a desktop |
| Side column | Side menu (not: home, article, minimal, console) | `canon #layout-sidemenu` | `.nds-content-layout` (start) | The side menu aside. Written with `nds-has-sidemenu` |
| Side column | Side info (not: home, article, minimal, console) (hint: Facts beside the first section's text) | `.nds-has-sideinfo` | `.nds-content-layout` | A service page: facts such as the fee and the duration beside the first section's text |
| Side column | Side info (not: home, article, minimal, console) (hint: Facts beside the first section's text) | `.nds-aside` | `.nds-hero-section.nds-sub` | Narrows the hero title, so the side info moves up beside it on a desktop. Written with `nds-has-sideinfo` |
| Side column | Side info (not: home, article, minimal, console) (hint: Facts beside the first section's text) | `canon #layout-sideinfo` | `.nds-content` (start) | The first section, which holds the text and the side info. Write the service description in it, not in a second section. Written with `nds-has-sideinfo` |
| Hero | Flat hero (not: article, minimal, home) (hint: No background or shadow, so the text starts right under the title) | `.nds-flat` | `.nds-hero-section.nds-sub` | A page with long text. The hero loses its background and shadow |
| Card view | Card view (not: home, article, minimal) (hint: Each section shows as a raised card) | `.nds-card-view` | `.nds-content-layout` | Each section shows as a raised card, for record and profile pages. |
| Stripe | Stripe (id: stripe) (not: article, minimal) | `.nds-stripe` | `.nds-content:not(.nds-card-view .nds-content)` | Every second section gets the stripe color, from the second one |
| Odd | Odd (hint: The stripe starts on the first section) | `.nds-odd` | `.nds-content.nds-stripe:not(.nds-card-view .nds-content)` | The stripe starts on the first section. Needs Stripe |
{: #pageLayoutVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="pageLayoutBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Side Menu

`nds-has-sidemenu` on the content layout makes two columns at 960px and wider: the side menu, then the content. The menu column is `--nds-sidemenu-width` wide. Below 960px the layout has one column, and the side menu shows as a compact control. `nds-top` on the `aside` shows the menu as a bar above the content: see [Side Menu](../ui-shell/sidemenu). Without `nds-has-sidemenu` or `nds-has-sideinfo`, the layout hides an `aside` that is its direct child.

### Side Info

Side info is not a layout column. Its `aside` sits in a `nds-sideinfo-section`, beside the text it describes. `nds-has-sideinfo` on the content layout adds no column: it tells the layout that the page has a side column, so the larger section padding of a page without one does not apply. On a service page the side info section is the first section, and `nds-aside` on the sub hero narrows the hero title on a desktop. The side info then moves up beside the title. The `aside` markup is on the [Side Info](../ui-shell/sideinfo) page.

### Article

An article is one side info section that holds the whole text. The `aside` holds a table of contents, which `nds-toc` builds from the headings of the article: see [Table of Contents](../components/toc). The hero is flat (`nds-flat`), with no background or shadow, so the text starts right under the title.

### Card View

`nds-card-view` shows each section as a raised card at the content width, with smaller section titles and a gap between the cards. The hero and a section with `nds-ghost` stay flat. Card view never stripes, and it keeps its gutters on a console page.

### Section Stripes

`nds-stripe` on `nds-content` gives every second section the `--background-stripe` color, from the second section. Add `nds-odd` too, and the stripe starts on the first section instead, for a first section that must stand apart from the hero. The stripes work at every screen width, with or without a side menu. The count includes every `section` in `nds-content`, so a section that is added or removed flips the color of every section below it. On a console, the hero is the first section in the count.

A section that paints its own background is never striped, but it still counts: `nds-primary`, `nds-gradient-primary`, `nds-neutral`, `nds-brand` and `nds-user-feedback-section`. The last modified section always takes the color of the section above it.

### Console

`nds-full-width` on `body` sets `--nds-content-MaxWidth` to 100%, so the header, the content and the footer reach the screen edges. The content layout also removes its own gutters, except in card view. The hero is in `nds-content`, beside the side menu.

### Minimal Page

`nds-middle` makes the content layout at least as tall as the screen, and centers the content in it. `nds-content-wrapper` adds the page gutter on every side. `nds-page-bg` on `body` shows `--bg-img` behind the page, under a layer of the page background color.

</div>
  </div>
</section>

<section id="pageLayoutFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-distribute-horizontal-center"></i>
            <span class="nds-label">Centered Content Width</span>
          </span>
          <p class="nds-item-desc">The content stops at <code class="nds-inline-code lang-css">--nds-content-MaxWidth</code> and centers, with the same gutter as the header and the footer.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-align-bottom"></i>
            <span class="nds-label">Footer at the Bottom</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">body</code> is a column, and <code class="nds-inline-code lang-html">main</code> and the content layout grow into the space left. On a short page, the footer stays at the bottom of the screen.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Skip Link</span>
          </span>
          <p class="nds-item-desc">The first Tab on a page shows a link to <code class="nds-inline-code lang-html">nds-content</code>, so a keyboard user skips the header, the hero and the side menu. The link is hidden until it has focus, from the first paint, and the content lands below the sticky main navigation.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-pin"></i>
            <span class="nds-label">Sticky Parts</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-html">main</code> clips its overflow and does not scroll it. A sticky side menu or tab bar sticks to the screen, not to <code class="nds-inline-code lang-html">main</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-expand-01"></i>
            <span class="nds-label">Minimum Content Height</span>
          </span>
          <p class="nds-item-desc">The content layout is at least 400px tall, and the sections grow to fill the space left.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-01"></i>
            <span class="nds-label">Section Padding by Shape</span>
          </span>
          <p class="nds-item-desc">On a desktop, a page with no side column gives its sections 64px of padding above and below.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-search-02"></i>
            <span class="nds-label">Layout Audit</span>
          </span>
          <p class="nds-item-desc"><code class="nds-inline-code lang-js">NDS.Init.audit()</code> warns about an element between <code class="nds-inline-code lang-html">body</code> and <code class="nds-inline-code lang-html">main</code> that stops <code class="nds-inline-code lang-html">main</code> from growing, and about an extra child of the content layout.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-puzzle"></i>
            <span class="nds-label">CSS Only</span>
          </span>
          <p class="nds-item-desc">The layout needs no script. The side menu's behavior comes from <a href="../ui-shell/sidemenu">Side Menu</a>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="pageLayoutPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Copy the header, the footer and the script tags whole from the built HTML of a live page. Never rebuild the body from the canons on this page: their header and footer are left empty.
- Keep each shape's classes as its live page has them. A structure written from memory loses the classes that set the width, the centering and the background.
- Use one `nds-content-layout` per page. Never put one content layout in another.
- Put every page section in `nds-content`.
- Write the layout classes in the HTML that the browser paints first. A class that a script adds after the app starts shows one frame at the wrong shape.
- In an app whose layout class depends on the route, set the class with a script that runs at once, as the first child of `body`, before the framework starts. A mount effect runs too late.
- Give a framework's mount element between `body` and `main` (`#root`, `#app`, `app-root`) `display: contents`. If the app styles that element, give it `flex: 1; display: flex; flex-direction: column` instead. Without one of them, `main` does not grow, and the footer moves up the screen.
- Return a fragment, not a wrapper `div`, from a framework component in the content layout or in `nds-content`. In the content layout, a wrapper takes a grid column: with a side menu, the whole page shrinks to the side menu's width. In `nds-content`, a wrapper gets no width of its own, so narrow content moves away from the page edges.
- In an app with a hash router (`#/page`), the skip link's `#main-content` reads as a route. Handle its click instead: `preventDefault()`, then focus `#main-content`, which needs `tabindex="-1"` for that.
- Keep `nds-full-width` in the markup of an app that also has pages without NDS. Only NDS regions read it.
- On a page with long text, flatten the hero with `nds-flat`: see [Hero](../ui-shell/hero).

</div>
  </div>
</section>

<section id="pageLayoutApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

<div hidden markdown="1">

### Front Matter
{: .nds-block-title}

For AI agents. Copy the built HTML once for each chrome. For every page after that, read the `.md` source of its live page: it holds only the content, and its front matter names the layout that builds the rest of the body.

| Key | Value | Markup |
|---|---|---|
| `layout` | `page` | A standard page: the sub hero first in `main`, then the content layout with a side menu, then the page feedback |
| `layout` | `home` | The home page: the hero slider, then the content layout with `nds-stripe` on `nds-content` |
| `layout` | `console` | A console: the content layout with a side menu, the sub hero first in `nds-content`, then the page feedback. The page also sets `body_class: nds-full-width` |
| `layout` | `minimal` | A minimal page: no header, hero or footer, and `nds-content-wrapper` on the content layout |
| `layout` | `shell` | The page writes its whole body itself, as the [Home Page Template](../templates/home-template) does |
| `layout_class` | Classes | Added to `.nds-content-layout`: `nds-has-sideinfo`, `nds-card-view`, `nds-middle` |
| `body_class` | Classes | Added to `body`: `nds-full-width` |
| `sidemenu_mode` | `false` | No side menu, and no `nds-has-sidemenu` |
| `sidemenu_mode` | `top` | `nds-top` on the side menu `aside` |
| `hero_style` | Classes | Added to the sub hero section: `nds-flat`, `nds-aside` |
| `page_bg` | Image path | On a minimal page: `nds-page-bg` on `body`, with the image in `--bg-img` |
| `bg_opacity_top`, `bg_opacity_bottom` | Percent | On a minimal page: `--bg-opacity-top` and `--bg-opacity-bottom` on `body`. Default `80%` |
| `last_edit` | Date | The last modified section, last in `nds-content`. `page` layout only |
| `hideFeedback` | `true` | No page feedback section |
| `feedback_type` | `rating` | The star rating strip in place of the Yes and No feedback |
{: .nds-table .nds-responsive}

The hero's own keys (`hero_title`, `hero_description`, `breadcrumb` and more) are on the [Hero](../ui-shell/hero) page.

</div>

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-post` | `.nds-content-layout` | Removes the top padding of the first section |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set the first five on `.nds-content-layout`, and the last three on `body`.

| Property | Default | Controls |
|---|---|---|
| `--layout-min-height` | `400px` | The content layout's minimum height. `nds-middle` sets `100dvh` |
| `--layout-gap` | `0` | The gap between the side menu and the content. Card view sets `--spacing-xl`. Always `0` on a phone |
| `--content-padding-block` | `0` | The padding above and below `nds-content`. Card view sets `--spacing-xl` below 960px |
| `--content-padding-inline` | `0` | The padding at the sides of `nds-content` |
| `--content-gap` | `0` | The gap between the sections. Card view sets `--spacing-4xl` |
| `--bg-img` | Not set | The image behind a `body.nds-page-bg`, as a `url()` |
| `--bg-opacity-top` | `80%` | How strongly the page background color covers the image at the top of the page |
| `--bg-opacity-bottom` | `80%` | How strongly the page background color covers the image at the bottom of the page |
{: .nds-table .nds-responsive}

These tokens are global. Set them on `:root`.

| Property | Default | Controls |
|---|---|---|
| `--nds-content-MaxWidth` | `1280px` | The width of the content, the header and the footer. `nds-full-width` sets `100%` |
| `--nds-sidemenu-width` | `260px` | The width of the side menu column |
| `--background-stripe` | Theme token | The color of a striped section |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

The page layout has no script, methods or events.

</div>
  </div>
</section>

<section id="pageLayoutRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Home Page Template](../templates/home-template): the home shape, with the header, hero and footer written in one file. The [home page](../) of this site is the same shape.
- [Academic Program](../examples/program): card view with a side menu.
- [Faculty Profile](../examples/faculty): card view with the side menu above the content.
- [Content Template](../templates/content-template) and [Faculty CV](../examples/faculty-cv): the article shape.
- [Contact Us Template](../templates/contact-us-template) and [Form Template](../templates/form-template): side info beside a form.
- [Registration](../examples/registration): the minimal shape over a page image.
- [Manage Records](../examples/manage-records): the console shape with a data table.

</div>
  </div>
</section>
