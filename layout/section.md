---
layout: page
title: Section
hero_title: Section - National Design System
hero_description: A section is one titled block of page content, with an optional action, image and background color
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "10/10/2026 - 04:26 PM"
---

<section id="sectionOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

All page content sits in sections. A section is a `section.nds-content-section`. Its wrapper groups the head (a title and a description), an optional action, an optional image and the body. The section sets the page gutter, the space above and below, and the background. Sections need no JavaScript.

Pick another component when:

- the content is a group inside a section, with no background of its own: [Block](../layout/block)
- the section shows an outcome, such as a page not found: [Status Section](../layout/status-section)
- the content is one item in a set: [Cards](../components/cards)
- the content folds open and closed: [Accordion](../components/accordion)

</div>
  </div>
</section>

<section id="sectionMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="section-standard" data-canon data-preview="page" data-preview-height="fit" data-variants="sectionVariantsTable" data-preview-flush>
<section class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Digital Services</h2>
      <p class="nds-section-description">Services you can complete online, without a visit to a branch.</p>
    </div>
    <div class="nds-section-body nds-prose">
      <p>Apply for a permit, renew a license or track a request from your account.</p>
    </div>
  </div>
</section>
</script>
<script type="text/html" id="section-icon" data-canon>
<section class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">
        <span class="nds-featured-icon nds-section-icon">
          <i class="hgi hgi-stroke hgi-stars"></i>
        </span>
        <span>Digital Services</span>
      </h2>
      <p class="nds-section-description">Services you can complete online, without a visit to a branch.</p>
    </div>
    <div class="nds-section-body nds-prose">
      <p>Apply for a permit, renew a license or track a request from your account.</p>
    </div>
  </div>
</section>
</script>
<script type="text/html" id="section-horizontal" data-canon>
<section class="nds-content-section nds-horizontal">
  <div class="nds-section-wrapper nds-grid" style="--max-track: 5fr 7fr; --mid-track: 1fr;">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Visit the Service Center</h2>
      <p class="nds-section-description">The center in Riyadh is open Sunday to Thursday, from 8 AM to 4 PM.</p>
      <div class="nds-section-action">
        <a href="#" class="nds-btn nds-primary">
          <span class="nds-label">Book a Visit</span>
        </a>
      </div>
    </div>
    <div class="nds-section-body">
      <img src="../assets/img/riyadhcenter.webp" alt="The service center in Riyadh">
    </div>
  </div>
</section>
</script>
<script type="text/html" id="section-stacked" data-canon>
<section class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Profile</h2>
      <p class="nds-section-description">Professor of Computer Science, College of Engineering.</p>
    </div>
    <div class="nds-section-body nds-prose">
      <p>Research in distributed systems and network security.</p>
    </div>
  </div>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Experience</h2>
    </div>
    <div class="nds-section-body nds-prose">
      <p>Twelve years of teaching and research at King Saud University.</p>
    </div>
  </div>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Publications</h2>
    </div>
    <div class="nds-section-body nds-prose">
      <p>Thirty-four papers in peer-reviewed journals.</p>
    </div>
  </div>
</section>
</script>
<script type="text/html" id="section-breakout" data-canon>
<section class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Service Centers</h2>
      <p class="nds-section-description">Find a center near you and see its opening hours.</p>
    </div>
    <div class="nds-section-action">
      <a href="#" class="nds-btn nds-primary">
        <span class="nds-label">View All</span>
      </a>
    </div>
  </div>
  <div class="nds-section-body nds-max-width">
    <img src="../assets/img/riyadhcenter.webp" alt="The service center in Riyadh">
  </div>
</section>
</script>
<script type="text/html" id="section-profile" data-canon>
<section class="nds-content-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-image">
      <div class="nds-avatar">
        <img src="../docs-assets/img/avatar3.webp" alt="Dr. Faisal Al-Harbi">
      </div>
    </div>
    <div class="nds-section-head">
      <h2 class="nds-section-title">Dr. Faisal Al-Harbi</h2>
      <p class="nds-section-description">Associate Professor, Department of Computer Science</p>
    </div>
    <div class="nds-section-action">
      <a href="mailto:f.alharbi@university.edu.sa" class="nds-btn nds-secondary-outline">
        <span class="nds-label">Contact</span>
      </a>
    </div>
    <div class="nds-section-body">
      <dl class="nds-definition-list nds-grid" style="--max-col: 4; --mid-col: 2; --min-col: 1;">
        <div class="nds-definition-item">
          <dt>
            <i class="hgi hgi-stroke hgi-school" aria-hidden="true"></i>
            <span class="nds-label">College</span>
          </dt>
          <dd>College of Computer and Information Sciences</dd>
        </div>
        <div class="nds-definition-item">
          <dt>
            <i class="hgi hgi-stroke hgi-building-02" aria-hidden="true"></i>
            <span class="nds-label">Department</span>
          </dt>
          <dd>Department of Computer Science</dd>
        </div>
        <div class="nds-definition-item">
          <dt>
            <i class="hgi hgi-stroke hgi-book-02" aria-hidden="true"></i>
            <span class="nds-label">Specialization</span>
          </dt>
          <dd>Artificial Intelligence</dd>
        </div>
        <div class="nds-definition-item">
          <dt>
            <i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>
            <span class="nds-label">Office</span>
          </dt>
          <dd>Building 31, Room 2104</dd>
        </div>
      </dl>
    </div>
  </div>
</section>
</script>
<script type="text/html" id="section-action" data-canon>
<div class="nds-section-action">
  <a href="#" class="nds-btn nds-primary">
    <span class="nds-label">View All</span>
  </a>
</div>
</script>
<script type="text/html" id="section-float-action" data-canon>
<div class="nds-section-action">
  <a href="#" class="nds-btn nds-primary">
    <i class="nds-icon nds-hgi-arrow-next-02" aria-hidden="true"></i>
    <span class="nds-label">View All</span>
  </a>
</div>
</script>
<script type="text/html" id="section-action-secondary" data-canon>
<div class="nds-section-action">
  <a href="#" class="nds-btn nds-secondary-outline">
    <span class="nds-label">Download the Guide</span>
  </a>
</div>
</script>
<script type="text/html" id="section-image" data-canon>
<div class="nds-section-image">
  <img src="../assets/img/riyadhcenter3s.webp" alt="The service center in Riyadh" width="120" height="112">
</div>
</script>
    </div>
  </div>
</section>

<section id="sectionVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The standard action goes right after the head. The float action goes first in the head: `.nds-section-action:first-child` is the float action. Primary, Gradient and Neutral write two changes on the section: the color class and `data-theme="dark"`.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Standard (default) (id: standard) | — | — | A wrapper that holds the head and the body. Start here |
| Structure | Title icon (id: icon) | canon `#section-icon` | — | A [featured icon](../components/featured-icons) before the title text. Wrap the text in a `<span>` |
| Structure | Horizontal (id: horizontal) | canon `#section-horizontal` | — | The head beside the body on a desktop. The action goes in the head, after the description |
| Structure | Stacked (id: stacked) (hint: Several titled parts in one section) | canon `#section-stacked` | — | Several wrappers in one section, on one background |
| Structure | Profile (id: profile) | canon `#section-profile` | — | A person: a photo in `nds-section-image`, the name as the title, the role, a contact action and the details in a [definition list](../components/definition-list) |
| Structure | Breakout (id: breakout) (hint: A body that runs to the section edges) | canon `#section-breakout` | — | A body after the wrapper, with `nds-max-width`, that runs to the section edges. For a swiper or a wide image |
| Action | None (default) | — | — | No action |
| Action | Standard (not: horizontal, stacked, profile, breakout) | canon `#section-action` | `.nds-section-head` (after) | Beside the head on a desktop. On a phone it takes its own row, and each button is full width |
| Action | Float (not: horizontal, stacked, profile, breakout) (hint: In the end corner of the head, beside the title) | canon `#section-float-action` | `.nds-section-head` (start) | In the head, first. It sits in the end corner, and the title and the description wrap around it |
| Action | Dual (not: horizontal, stacked, profile, breakout) (hint: A float action and a standard action together) | canon `#section-float-action` | `.nds-section-head` (start) | A float action and a standard action. The standard action then takes its own row |
| Action | Dual (not: horizontal, stacked, profile, breakout) (hint: A float action and a standard action together) | canon `#section-action-secondary` | `.nds-section-head` (after) | A float action and a standard action. The standard action then takes its own row |
| Float action (any) | Icon only on phones (not: horizontal, stacked, profile, breakout) | `.nds-minimal` | `.nds-section-action:first-child` | Hides the button labels below 600px. Each button needs an icon. The label stays as the accessible name |
| Float action (any) | Own row on phones (not: horizontal, stacked, profile, breakout) | `.nds-wrap` | `.nds-section-action:first-child` | Moves the float action under the description below 600px |
| Image | Image (not: horizontal, stacked, profile) | canon `#section-image` | `.nds-section-wrapper` (start) | A small image before the head. Set its size with `width` and `height`. The head centers on it. For a person, use an avatar: see Profile |
| Layout | Center | `.nds-center` | `.nds-content-section:not(.nds-horizontal)` | Centers the head, the action and the body |
| Color | None (default) | — | — | The page background |
| Color | Primary | `.nds-primary` | `.nds-content-section` | A deep primary background, for one section that must stand out |
| Color | Primary | `[data-theme="dark"]` | `.nds-content-section` | The components inside take their dark-mode colors |
| Color | Gradient | `.nds-gradient-primary` | `.nds-content-section` | A gradient from deep primary to primary |
| Color | Gradient | `[data-theme="dark"]` | `.nds-content-section` | The components inside take their dark-mode colors |
| Color | Neutral | `.nds-neutral` | `.nds-content-section` | A dark neutral background |
| Color | Neutral | `[data-theme="dark"]` | `.nds-content-section` | The components inside take their dark-mode colors |
| Color | Brand | `.nds-brand` | `.nds-content-section` | A light brand tint with an inset shadow |
| Color | Ghost (hint: No background, border or shadow) | `.nds-ghost` | `.nds-content-section` | No background, border or shadow, in every layout |
{: #sectionVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="sectionBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### No Wrapper

A section with no action and no image can leave out `nds-section-wrapper`: its `nds-section-head` and `nds-section-body` then sit straight in the section. It looks the same as a section with a wrapper.

### Horizontal Layout
{: #sectionHorizontal}

`nds-horizontal` on the section makes the wrapper a grid of two columns at 960px and wider: the head, then the body. Below 960px the wrapper stacks again. Add `nds-grid` to the wrapper to set the column widths with `--max-track`: see [Grid](../layout/grid).

### Stacked Wrappers
{: #sectionStacked}

Each `nds-section-wrapper` after the first starts a new titled block, with `--section-wrapper-gap` above it. The blocks share the section background. In card view they are one card, and with stripes they are one stripe. Both are set on the page, not on the section: see [Page Layout](../layout/page-layout).

### Breakout
{: #sectionBreakout}

A body with `nds-max-width` cancels the section's side padding, so its content runs to the section edges. Put it after the wrapper, not inside it. `nds-full-width` on an element in a section goes further, to the edges of the screen. The two differ where the section is narrower than the screen, such as beside a side menu.

### Standard Action

A `nds-section-action` after the head sits beside it on a desktop, at the top. Below 600px it takes its own row, and each button is full width.

### Float Action

A `nds-section-action` that is the first child of the head floats to the end corner. The title and the description wrap around it, so it takes no row of its own. The buttons stack in a column and share one width. In a centered or horizontal section it does not float: it goes under the description. Add `nds-minimal` to show only the icons below 600px, or `nds-wrap` to move it under the description there.

### Dual Action

A section can hold a float action and a standard action. The standard action then takes its own row on every screen, under the head.

### Image

A `nds-section-image` before the head holds a small image or an [avatar](../components/avatar). It sits beside the head, and the head centers on it. An avatar in it is 120px, and 80px below 600px.

### Center

`nds-center` stacks the wrapper in one column and centers the head, the action and the body. A title icon goes above the title and is 48px.

### Background Colors

`nds-primary`, `nds-gradient-primary` and `nds-neutral` paint a dark background, and the section text takes the on-color text colors. Write `data-theme="dark"` on the same section, so the buttons, tags and other components inside take their dark-mode colors: see [Dark Areas](../components/themes). `nds-brand` paints a light tint and needs no dark area. The gradient runs at `-45deg`, and at `45deg` on an LTR page. A section with a background color is never striped: see [Page Layout](../layout/page-layout).

</div>
  </div>
</section>

<section id="sectionFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Progressive Structure</span>
          </span>
          <p class="nds-item-desc">Start with a head and a body. Add an action, an image or a breakout body only when the content needs one.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-03"></i>
            <span class="nds-label">Layout Aware</span>
          </span>
          <p class="nds-item-desc">The page layout sets the section spacing. A desktop page with no side column gets more space above and below each section, and card view shows each section as a card.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-font"></i>
            <span class="nds-label">Fluid Typography</span>
          </span>
          <p class="nds-item-desc">The title and the subtitle sizes scale between phone and desktop. The title, subtitle and description stop at 720px wide, for a readable line length.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-contrast"></i>
            <span class="nds-label">High Contrast</span>
          </span>
          <p class="nds-item-desc">In high contrast mode every section, including a colored one, takes the high contrast background and text colors.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-dashboard-speed-01"></i>
            <span class="nds-label">Fast First Paint</span>
          </span>
          <p class="nds-item-desc">Until the page shows, the browser skips the layout of off-screen sections after the first two, so a long page shows sooner.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="sectionPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Put each distinct part of a page in its own section, in `nds-content`.
- Do not put a section inside a section. Use a [block](../layout/block) to divide a section body. Stack wrappers when each part needs its own title.
- Stack wrappers only in card view or on a striped page, where the parts must share one surface.
- Leave a stacked section without `nds-flex` and `--gap`. The section already spaces its wrappers, so a gap doubles every break. Set `--section-wrapper-gap` to change the space.
- Use a horizontal section where a short text and an image sit side by side, such as a feature or a call to action.
- Striping counts sections, not wrappers. When you merge sections into one, check the stripes of the sections below it.
- Use a float action for a secondary action when the head has room. Use a standard action for a main call to action.
- Give each button in an `nds-minimal` float action an icon. Without one, the button is empty on a phone.
- Use a background color on one section at a time. Two dark sections in a row read as one block.
- Use a breakout body for a [swiper](../components/swiper) or a wide image, not for text.
- Use `nds-full` on a title or a description only for short text. Long lines are hard to read.
- Put two or more parts of a section body in a [grid](../layout/grid), a [flex](../layout/flex) or a [block](../layout/block). The section body is a plain block, so it puts no space between its children.

</div>
  </div>
</section>

<section id="sectionApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-section-subtitle` | A `<p>` in `.nds-section-head`, after the title | A line under the title, larger than the description |
| `nds-section-brief` | A `<p>` in `.nds-section-head` | One short line in semibold. The [hero](../ui-shell/hero) uses it |
| `nds-section-meta` | A `<div>` in `.nds-section-head` | A row that holds a `nds-section-tags` and a `nds-section-rating`. The [hero](../ui-shell/hero) uses it |
| `nds-full` | `.nds-section-title`, `.nds-section-subtitle` or `.nds-section-description` | Removes the 720px width limit |
| `nds-full-width` | Any element in a section | Runs to the edges of the screen, past the section padding |
| `nds-section-icon` | An element beside `.nds-section-head` | Centers its content, as `nds-section-image` does. In the title, it is the title icon |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-content-section`. The block title properties are on the [Block](../layout/block) page.

| Property | Default | Controls |
|---|---|---|
| `--section-bg` | `var(--background-default)` | Background color. A color class changes the default |
| `--section-shadow` | `none` | Shadow |
| `--section-border` | `none` | Border |
| `--section-border-radius` | `0` | Corner radius |
| `--section-title-color` | `var(--text-display)` | Title color |
| `--section-subtitle-color` | `var(--text-secondary-paragraph)` | Subtitle color |
| `--section-description-color` | `var(--text-default)` | Description color |
| `--section-text-color` | `inherit` | Text color of everything else in the section |
| `--section-padding-block` | `var(--spacing-5xl)` | Top and bottom padding. On a desktop page with no side column, the layout sets it to `var(--spacing-7xl)` |
| `--section-padding-block-start` | `var(--section-padding-block)` | Top padding |
| `--section-padding-block-end` | `var(--section-padding-block)` | Bottom padding |
| `--section-margin-block-start` | `0` | Top margin |
| `--section-margin-block-end` | `0` | Bottom margin |
| `--section-col-gap` | `var(--spacing-xl)` | Gap between the image, the head and the action. Also the space around a float action |
| `--section-row-gap` | `var(--spacing-4xl)` | Gap between the rows of a wrapper |
| `--section-wrapper-gap` | `var(--spacing-6xl)` | Space above each stacked wrapper |
| `--section-title-FS` | `var(--typo-display-clamp-md-FS)` | Title font size. Card view uses `var(--typo-display-clamp-sm-FS)` |
| `--section-title-LH` | `var(--typo-display-clamp-md-LH)` | Title line height |
| `--section-title-MB` | `var(--typo-display-clamp-md-MB)` | Space under the title |
| `--section-icon-size` | `var(--section-title-FS)`, `48px` when centered | Height of the title icon |
| `--section-subtitle-FS` | `var(--typo-text-clamp-lg-FS)` | Subtitle font size |
| `--section-subtitle-LH` | `var(--typo-text-clamp-lg-LH)` | Subtitle line height |
| `--section-subtitle-MB` | `var(--section-title-MB)` | Space under the subtitle |
| `--section-description-FS` | `var(--typo-text-lg-FS)` | Description font size |
| `--section-description-LH` | `var(--typo-text-lg-LH)` | Description line height |
| `--section-description-MB` | `var(--spacing-2xl)` | Space under the description |
| `--gradient-angle` | `-45deg`, `45deg` on an LTR page | Direction of the `nds-gradient-primary` background |
| `--gap` | `var(--spacing-6xl)` | Gap between the columns of a horizontal section |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

Sections have no script, methods or events.

</div>
  </div>
</section>

<section id="sectionRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Page Layout](../layout/page-layout): where sections go on a page, card view and stripes.
- [Home Page Template](../templates/home-template): sections with actions, colors and a breakout swiper.
- [Faculty Profile](../examples/faculty): a profile section with a photo and a definition list.
- [Faculty CV](../examples/faculty-cv): stacked wrappers in one section.

</div>
  </div>
</section>
