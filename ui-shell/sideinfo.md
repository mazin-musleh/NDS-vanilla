---
layout: page
title: Side Info
hero_title: Side Info - National Design System
hero_description: A column beside the content of a section, for the facts of a service, the progress of a form, or a table of contents.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "04/10/2026 - 09:27 PM"
---

<section id="sideinfoOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Side info sits in a section whose body is a row: the content in `.nds-info-content`, and the column in `aside.nds-sideinfo`. The `aside` sets the width, the place and the sticky behavior. It has no look of its own: the cards inside it have the look.

The preview shows it in a frame of its own, with a hero above it, so the column can move up beside the page title. A placeholder stands in for the card in the column: the [Related](#sideinfoRelated) templates show real content.

Pick another component when:

- the links go to the pages of one part of the site: [Side Menu](../ui-shell/sidemenu)
- the reader opens the extra information and closes it again: [Panels](../components/panels)
- the facts belong in the content, with no column: [Definition List](../components/definition-list)

The side info is the side column of a standard page. The other page columns are on [Page Layout](../layout/page-layout).

</div>
  </div>
</section>

<section id="sideinfoMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="sideinfo-canon" data-canon data-preview="page" data-preview-height="720" data-preview-style="@media (width >= 960px) { .nds-hero-section.nds-aside + .nds-content-layout .nds-sideinfo > :first-child .nds-content-placeholder { min-height: 500px } }" data-variants="sideinfoVariantsTable">
<section class="nds-hero-section nds-sub">
  <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
    <ol class="nds-breadcrumb">
      <li><a href="#">Home</a></li>
      <li class="nds-truncate" aria-current="page">Renew a Passport</li>
    </ol>
  </nav>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h1 class="nds-section-title">Renew a Passport</h1>
      <p class="nds-section-description">Renew your passport online through Absher, with no visit to an office.</p>
    </div>
  </div>
</section>
<div class="nds-content-layout nds-wSideInfo">
  <div class="nds-content" id="main-content">
    <section class="nds-content-section nds-sideinfo-section">
      <div class="nds-section-body">
        <div class="nds-info-content">
          <article class="nds-prose">
            <h2>Service Description</h2>
            <p>This service renews a Saudi passport that has expired or expires within six months.</p>
            <p>The new passport is ready within 3 working days, at the office you pick.</p>
            <h2>Required Documents</h2>
            <ul>
              <li>The old passport</li>
              <li>A recent photo with a white background</li>
              <li>The national ID of the applicant</li>
            </ul>
            <h2>Steps</h2>
            <ol>
              <li>Sign in to Absher with your national ID.</li>
              <li>Open Passports, then Renew a Passport.</li>
              <li>Pay the fee, then pick the office for delivery.</li>
            </ol>
            <h2>Terms</h2>
            <p>The applicant must have no unpaid traffic fines.</p>
            <p>A passport for a person under 21 needs the approval of the guardian.</p>
            <h2>Fees</h2>
            <p>The fee is 300 riyals for 5 years, or 600 riyals for 10 years.</p>
            <p>The portal takes the fee by card or through SADAD before it sends the request.</p>
          </article>
        </div>
        <aside class="nds-sideinfo nds-sticky nds-top" aria-label="Service information">
          <div class="nds-card nds-stroke nds-shadow">
            <div class="nds-content-placeholder">
              <span>Swap with the column's card</span>
              <span>استبدل هذا العنصر بمحتوى العمود</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</div>
</script>
<script type="text/html" id="sideinfo-more" data-canon>
<div class="nds-card nds-stroke nds-shadow">
  <div class="nds-content-placeholder">
    <span>Swap with a second card</span>
    <span>استبدل هذا العنصر ببطاقة ثانية</span>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="sideinfoParts" class="nds-content-section nds-doc-parts">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Parts</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

| Part | Holds | Required |
|---|---|---|
| `section.nds-hero-section.nds-sub` | The page hero. With `nds-aside`, the column moves up beside its title. See [Hero](../ui-shell/hero) | No |
| `.nds-content-layout.nds-wSideInfo` | The page content. `nds-wSideInfo` sets the section padding of a page with a side column. See [Page Layout](../layout/page-layout) | Yes |
| `section.nds-sideinfo-section` | A `.nds-section-body` with the content and the column | Yes |
| `.nds-info-content` | The content of the section, usually an `article` | Yes |
| `aside.nds-sideinfo` | The column. Give it an `aria-label` that names what it holds | Yes |
| The card | A direct child of the `aside`, such as a definition list, a table of contents or a stepper. It carries `nds-card` itself. The `aside` can hold several. For several blocks in one card, use a `div` with `nds-card` that holds groups | Yes |
| `.nds-sideinfo-group` | One block in that `div`: a `span.nds-sideinfo-title`, then its definition list or links | No |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="sideinfoVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The width is not in the builder: see `--nds-sideinfo-width` in the API.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Sticky (any) | Desktop (default) | `.nds-sticky` | `.nds-sideinfo` | At 960px and wider, the column stays in view below the main navigation while the content scrolls. Turn it off for a short page |
| Sticky (any) | Small screens | `.nds-sticky-md` | `.nds-sideinfo.nds-top` | Below 960px, the column stays in view as a strip across the screen, below the main navigation. Needs the column above the content. For a short column, such as a progress dial |
| Small screens | Above the content (default) | `.nds-top` | `.nds-sideinfo` | Below 960px, the column moves above the content |
| Small screens | Under the content | — | `.nds-sideinfo:not(.nds-reverse)` | Below 960px, the column stays under the content, and scrolls away with it. It cannot be sticky there. Not with Start side |
| Start side | Start side (limit: 1 position) | `.nds-reverse` | `.nds-sideinfo` | The column moves to the start side of the row, and above the content below 960px. For a table of contents, write the `aside` first in the markup instead. Not with Beside the title |
| Beside the title | Beside the title (hint: On desktops, the column moves up beside the page title) (limit: 1 position) | `.nds-aside` | `.nds-hero-section.nds-sub` | At 960px and wider, the column moves up beside the page title, on the end side. For a column about the whole page, in the first section. Not with Start side |
| More cards | More cards (hint: A second card under the first) | canon `#sideinfo-more` | `.nds-sideinfo` | A second card in the column, under the first |
| Card stroke | Card stroke (default) | `.nds-stroke` | `.nds-card` | A border around the card. It goes on the card, never on the `aside` |
| Card shadow | Card shadow (default) | `.nds-shadow` | `.nds-card` | A shadow under the card. It goes on the card, never on the `aside` |
{: #sideinfoVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="sideinfoBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Sticky Column
{: .nds-block-title}

`nds-sticky` on the `aside` keeps the column in view below the main navigation while the content scrolls. While the column is taller than the screen, the script removes `nds-sticky`, so the reader can scroll to its end. It adds the class back when the column fits again. Below 960px, `nds-sticky` has no effect.

### Sticky on Small Screens
{: .nds-block-title}

`nds-sticky-md` keeps the column in view below 960px, and `nds-sticky-sm` below 600px only. The column then spans the screen below the main navigation, with a shadow under it. Each one works alone or with `nds-sticky`. Write `nds-top` with it: under the content, the column is the last item in its section, so it never sticks. Like `nds-sticky`, the script removes it while the column is taller than the screen.

### Column Order
{: .nds-block-title}

The `aside` shows where it is in the markup: after the content, it is on the end side and under the content below 960px. `nds-reverse` moves it to the start side, and above the content below 960px. `nds-top` moves it above the content below 960px only. For navigation such as a table of contents, write the `aside` first instead: it is then on the start side and on top, and keyboard users reach it first.

### Beside the Title
{: .nds-block-title}

`nds-aside` on the sub hero narrows the hero text by the column width. At 960px and wider, the script then measures the hero and moves the column up beside the title. It measures again when the screen size changes, when the hero changes size, and after the fonts and images load. Below 960px, the column stays in its section. It works only with the column on the end side, so do not write it with `nds-reverse`.

</div>
  </div>
</section>

<section id="sideinfoFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-plug-socket"></i>
            <span class="nds-label">Auto Start</span>
          </span>
          <p class="nds-item-desc">The script starts each <code class="nds-inline-code lang-html">.nds-sideinfo</code> on the page when it loads.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-mobile-programming-01"></i>
            <span class="nds-label">Responsive Stack</span>
          </span>
          <p class="nds-item-desc">Below 960px, the row becomes a column, and the side info takes the full width.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-01"></i>
            <span class="nds-label">Width by Content</span>
          </span>
          <p class="nds-item-desc">The column is 400px wide, or 300px when it holds a table of contents.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Stacked Cards</span>
          </span>
          <p class="nds-item-desc">Several cards in the column stack, with <code class="nds-inline-code lang-css">--nds-sideinfo-gap</code> between them.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-right"></i>
            <span class="nds-label">Column Card</span>
          </span>
          <p class="nds-item-desc">The card in the column fills its width, with the menu background and a larger padding.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-align-left"></i>
            <span class="nds-label">Compact Facts</span>
          </span>
          <p class="nds-item-desc">A definition list in the column gets larger icons (24px) and smaller labels. A transparent button in a value loses its padding, so it lines up with the text.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-align-top"></i>
            <span class="nds-label">Section Gaps</span>
          </span>
          <p class="nds-item-desc">In an <code class="nds-inline-code lang-html">article</code> in the content, each <code class="nds-inline-code lang-html">.nds-section-title</code> after the first gets space above it.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="sideinfoPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put information about the section's content in the column: facts, progress, or a table of contents. Do not put ads or links to other pages in it.
- Put `nds-card` on the card inside the `aside`, never on the `aside`.
- Give each topic its own card. Use one card with groups for short blocks that belong together, such as contact numbers.
- Keep the column short. Use a definition list for facts and a stepper for progress, not long paragraphs.
- Make the column sticky beside long content. On a short page, the reader sees all of it without help.
- Use Beside the title only when the column is about the whole page, and only in the first section.
- Give the `aside` an `aria-label` that names what it holds, such as "Service information".

</div>
  </div>
</section>

<section id="sideinfoApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-sticky-sm` | `aside.nds-sideinfo.nds-top` | Keeps the column in view below 600px only, as a strip across the screen. Tablets scroll it |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--nds-sideinfo-width` | None | The width of the column at 960px and wider. Without it, the column is 400px, or 300px when it holds a table of contents. Set it in the `style` of one `aside`, or on `:root` for every column. With Beside the title, set it on `:root`: the hero reads it from there |
| `--nds-sideinfo-gap` | `var(--spacing-4xl)` | The space between the cards in the column. Set it on the `aside`, or on `:root` for every column |
| `--nds-sideinfo-top-offset` | `0px` | Space above the column, at 960px and wider: it adds to the sticky top, and to the move beside the title. Set it in the `style` attribute of the `aside` |
| `--nds-sideinfo-top` | None | The distance from the section to the hero's title, for Beside the title. The script writes it on the `aside` at 960px and wider. Until then, the CSS uses `-180px`. Do not set it |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Sideinfo.init()` | Starts each `.nds-sideinfo` on the page that has not started. It runs on page load |
| `NDS.Sideinfo.reinit()` | The same as `init()` |
| `NDS.Sideinfo.create(el)` | Starts one column and returns its instance. Call it once for each column |
| `NDS.Sideinfo.destroy(el)` | Stops one column: it removes the listeners and `--nds-sideinfo-top`, and adds back the sticky classes the markup had. `NDS.Init.destroy()` calls it for each column in the element it releases |
{: .nds-table .nds-responsive}

The side info fires no events.

<script type="text/html" id="sideinfo-js" data-canon data-lang="js" data-preview="none">
// A framework rendered a new section with side info after the NDS script ran:
// start the column and the components in it
NDS.Init.mount(document.querySelector('.nds-sideinfo-section'));

// A framework removes the section: release it first
NDS.Init.destroy(document.querySelector('.nds-sideinfo-section'));
</script>

The full API is in the banner of `_js/nds-sideinfo.js`.

</div>
  </div>
</section>

<section id="sideinfoRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Service Page Template](../templates/service-template): the facts of a service, beside the title.
- [Form Template](../templates/form-template): a stepper that is sticky on all screens.
- [Content Template](../templates/content-template): a sticky table of contents beside long content.
- [Contact Us Template](../templates/contact-us-template): contact numbers in groups.
- [Faculty CV](../examples/faculty-cv): a table of contents beside a profile.
- [Page Layout](../layout/page-layout): the standard page with a side column.
- [Table of Contents](../components/toc) and [Stepper](../components/stepper): the components that most often fill the column.

</div>
  </div>
</section>
