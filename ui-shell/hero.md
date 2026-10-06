---
layout: page
title: Hero
hero_title: Hero - National Design System
hero_description: The banner at the top of a page, with the page title, or a slider of full-width images on the home page.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "06/10/2026 - 10:12 PM"
---

<section id="heroOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The hero is the first section in `main`. It comes in two forms. The sub hero is on most pages: a breadcrumb, the page title and a description, on a light tint of the brand primary. A service page and a profile page have their own shape of it. The main hero is on the home page: a [Swiper](../components/swiper) of slides, each with a full-width image under a tint and its own title.

Pick another component when:

- the title belongs to a section of the content, not to the page: [Section](../layout/section)
- the page says that something was not found, sent or failed: [Status Section](../layout/status-section)
- the slides are cards or images inside the content: [Swiper](../components/swiper)

The hero is one region of the page. The other regions are on [Page Layout](../layout/page-layout).

</div>
  </div>
</section>

<section id="heroMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="hero-canon" data-canon data-preview="page" data-preview-height="560" data-variants="heroVariantsTable">
<section class="nds-hero-section nds-sub">
  <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
    <ol class="nds-breadcrumb">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li class="nds-truncate" aria-current="page">About the Authority</li>
    </ol>
  </nav>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <div class="nds-section-action nds-minimal">
        <div class="nds-share nds-dropmenu">
          <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger" aria-label="Share Page">
            <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
            <span class="nds-label">Share Page</span>
          </button>
          <div class="nds-dropmenu-menu" hidden>
            <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-x" type="button" aria-label="Share on X">
              <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
              <span class="nds-label">X</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-linkedin" type="button" aria-label="Share on LinkedIn">
              <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
              <span class="nds-label">LinkedIn</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-whatsapp" type="button" aria-label="Share on WhatsApp">
              <i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"></i>
              <span class="nds-label">WhatsApp</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-copy" type="button" aria-label="Copy Link" data-copy-label="Link Copied!" data-copy-announce="Page link copied to clipboard" data-no-auto-close>
              <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
              <span class="nds-label">Copy Link</span>
            </button>
          </div>
        </div>
      </div>
      <h1 class="nds-section-title">About the Authority</h1>
      <p class="nds-section-description">The Digital Government Authority leads digital transformation across Saudi government services.</p>
    </div>
  </div>
</section>
</script>
<script type="text/html" id="hero-service" data-canon>
<section class="nds-hero-section nds-sub">
  <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
    <ol class="nds-breadcrumb">
      <li><a href="#">Home</a></li>
      <li><a href="#">Services</a></li>
      <li class="nds-truncate" aria-current="page">Renew a Passport</li>
    </ol>
  </nav>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <div class="nds-section-action nds-wrap">
        <a class="nds-btn nds-primary" href="#">
          <span class="nds-label">Start the Service</span>
        </a>
        <div class="nds-share nds-dropmenu">
          <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger" aria-label="Share Page">
            <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
            <span class="nds-label">Share Page</span>
          </button>
          <div class="nds-dropmenu-menu" hidden>
            <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-x" type="button" aria-label="Share on X">
              <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
              <span class="nds-label">X</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-linkedin" type="button" aria-label="Share on LinkedIn">
              <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
              <span class="nds-label">LinkedIn</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-whatsapp" type="button" aria-label="Share on WhatsApp">
              <i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"></i>
              <span class="nds-label">WhatsApp</span>
            </button>
            <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-copy" type="button" aria-label="Copy Link" data-copy-label="Link Copied!" data-copy-announce="Page link copied to clipboard" data-no-auto-close>
              <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
              <span class="nds-label">Copy Link</span>
            </button>
          </div>
        </div>
      </div>
      <h1 class="nds-section-title">Renew a Passport</h1>
      <div class="nds-section-meta">
        <div class="nds-section-tags">
          <span class="nds-tag nds-blue nds-sm">
            <span class="nds-label">Individuals</span>
          </span>
          <span class="nds-tag nds-green nds-sm">
            <span class="nds-label">Most Used</span>
          </span>
        </div>
      </div>
      <p class="nds-section-description">Renew your passport online through Absher, with no visit to an office.</p>
    </div>
  </div>
</section>
</script>
<script type="text/html" id="hero-profile" data-canon>
<section class="nds-hero-section nds-sub nds-flat">
  <nav class="nds-breadcrumb-nav" aria-label="Breadcrumb">
    <ol class="nds-breadcrumb">
      <li><a href="#">Home</a></li>
      <li><a href="#">Faculty</a></li>
      <li class="nds-truncate" aria-current="page">Dr. Noura Al-Otaibi</li>
    </ol>
  </nav>
  <div class="nds-section-wrapper">
    <div class="nds-section-image">
      <div class="nds-avatar nds-image-border">
        <img src="../docs-assets/img/avatar2.webp" width="120" height="120" alt="Dr. Noura Al-Otaibi" fetchpriority="high">
      </div>
    </div>
    <div class="nds-section-head">
      <h1 class="nds-section-title">Dr. Noura Al-Otaibi</h1>
      <p class="nds-section-description">Associate Professor, Department of Industrial Engineering.</p>
    </div>
    <div class="nds-section-action">
      <div class="nds-share nds-dropmenu">
        <button class="nds-btn nds-secondary-outline nds-dropmenu-trigger" aria-label="Share Page">
          <i class="nds-icon nds-hgi-share-01" aria-hidden="true"></i>
          <span class="nds-label">Share Page</span>
        </button>
        <div class="nds-dropmenu-menu" hidden>
          <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-x" type="button" aria-label="Share on X">
            <i class="nds-icon nds-hgi-new-twitter" aria-hidden="true"></i>
            <span class="nds-label">X</span>
          </button>
          <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-linkedin" type="button" aria-label="Share on LinkedIn">
            <i class="nds-icon nds-hgi-linkedin-02" aria-hidden="true"></i>
            <span class="nds-label">LinkedIn</span>
          </button>
          <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-whatsapp" type="button" aria-label="Share on WhatsApp">
            <i class="nds-icon nds-hgi-whatsapp" aria-hidden="true"></i>
            <span class="nds-label">WhatsApp</span>
          </button>
          <button class="nds-btn nds-subtle nds-dropmenu-item nds-share-copy" type="button" aria-label="Copy Link" data-copy-label="Link Copied!" data-copy-announce="Page link copied to clipboard" data-no-auto-close>
            <i class="nds-icon nds-hgi-link-04" aria-hidden="true"></i>
            <span class="nds-label">Copy Link</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
</script>
<script type="text/html" id="hero-main" data-canon>
<section class="nds-hero-section">
  <div class="nds-swiper nds-hero nds-oncolor nds-full-width" data-swiper-loop>
    <div class="nds-swiper-wrapper">
      <div class="nds-swiper-slide nds-content-wrapper">
        <div class="nds-hero-image-wrapper" style="--overlay: 0.6;">
          <picture>
            <source media="(max-width: 768px)" srcset="../assets/img/riyadhcenter_IQ_sm.webp">
            <source media="(max-width: 1646px)" srcset="../assets/img/riyadhcenter_IQ_md.webp">
            <img src="../assets/img/riyadhcenter_IQ.webp" class="nds-hero-image" alt="" fetchpriority="high">
          </picture>
        </div>
        <div class="nds-section-body">
          <h1 class="nds-section-title">Government Services</h1>
          <p class="nds-section-description">Apply, renew and pay online, at any time.</p>
          <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary nds-oncolor nds-lg">
              <span class="nds-label">Browse Services</span>
            </a>
          </div>
        </div>
      </div>
      <div class="nds-swiper-slide nds-content-wrapper" hidden>
        <div class="nds-hero-image-wrapper" style="--overlay: 0.7;">
          <picture>
            <source media="(max-width: 768px)" data-srcset="../docs-assets/img/home_hero_bg_sm.webp">
            <source media="(max-width: 1646px)" data-srcset="../docs-assets/img/home_hero_bg_md.webp">
            <img data-src="../docs-assets/img/home_hero_bg.webp" class="nds-hero-image" alt="">
          </picture>
        </div>
        <div class="nds-section-body">
          <h2 class="nds-section-title">Digital Identity</h2>
          <p class="nds-section-description">One account for every government service.</p>
          <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary nds-oncolor nds-lg">
              <span class="nds-label">Learn More</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="nds-swiper-navigation" hidden>
      <div class="nds-swiper-buttons">
        <button type="button" class="nds-btn nds-subtle nds-icon-only nds-prev" aria-label="Previous slide"></button>
        <button type="button" class="nds-btn nds-subtle nds-icon-only nds-next" aria-label="Next slide"></button>
      </div>
      <div class="nds-swiper-pagination"></div>
    </div>
  </div>
</section>
</script>
    </div>
  </div>
</section>

<section id="heroParts" class="nds-content-section nds-doc-parts">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Parts</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

The sub hero is a section with a breadcrumb before its wrapper. Its head parts are the parts of a [Section](../layout/section) head, in this order: the title action, the title, the brief, the tags, then the description.

| Part | Holds | Required |
|---|---|---|
| `section.nds-hero-section.nds-sub` | The sub hero | Yes |
| `nav.nds-breadcrumb-nav` | The [Breadcrumb](../components/breadcrumb). The last item is the page, with `nds-truncate` and `aria-current="page"` | Yes |
| `.nds-section-wrapper` | The head, and the action row after it | Yes |
| `.nds-section-image` | A 120px [Avatar](../components/avatar) before the head (80px on phones). For a page about one person or entity | No |
| `.nds-section-head` | The head parts, in the order above | Yes |
| `.nds-section-action` in the head | The title action: written first in the head, it floats on the end side of the title. With `nds-minimal`, its buttons show only their icons on phones. With `nds-wrap`, it moves under the title on phones | No |
| `h1.nds-section-title` | The page title. The sub hero holds the page's `h1` | Yes |
| `.nds-section-brief` | One short line under the title, in semibold | No |
| `.nds-section-meta` | A `.nds-section-tags` of small [Tags](../components/tags), under the title | No |
| `.nds-section-description` | One or two sentences on the page | Yes |
| `.nds-section-action` after the head | The action row. It sits beside the head, on the end side, and moves under the description when the head has a title action | No |
{: .nds-table .nds-responsive}

The main hero is a section that holds one hero swiper. The navigation row is the [Swiper](../components/swiper)'s.

| Part | Holds | Required |
|---|---|---|
| `section.nds-hero-section` | The main hero, with no `nds-sub` | Yes |
| `.nds-swiper.nds-hero` | The slides. Write `nds-oncolor` and `nds-full-width` with it | Yes |
| `.nds-swiper-slide.nds-content-wrapper` | One slide. Write `hidden` on every slide after the first | Yes |
| `.nds-hero-image-wrapper` | The image and its tint. `--overlay` in its `style` sets the tint for the slide | Yes |
| `img.nds-hero-image` | The image, in a `picture` with one `source` for each screen size. Give it `alt=""`: the image is decoration. `object-position` in its `style` picks the part of the image that stays in view | Yes |
| `.nds-section-body` | The title, the description and a `.nds-section-action`. The first slide's title is the page's `h1`, the others are `h2` | Yes |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="heroVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The structures are the shapes the site uses. For another mix of the head parts, see Parts. Background is for Sub hero and Service. The slider options of the main hero, such as Loop and the arrows at the middle, are on [Swiper](../components/swiper). `nds-aside` is in the API: it works only with a side info column.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Sub hero (default) | — | — | The top of most pages: the breadcrumb, Share beside the title, the title and a description |
| Structure | Service (id: service) (hint: A service page: a main button, Share and tags) | `canon #hero-service` | — | A service page: a main button and Share beside the title, and tags under it. Write `nds-aside` too when the page has a side info column |
| Structure | Profile (id: profile) (hint: A page about one person, with an avatar) | `canon #hero-profile` | — | A page about one person or entity: a flat hero with an [Avatar](../components/avatar) before the name, and Share beside the head |
| Structure | Main hero (id: main) (hint: The home page slider of full-width images) | `canon #hero-main` | — | The home page: a slider of full-width images, each with a title and a button |
| Background | Tint (default) (not: profile) (hint: A light brand tint with an inner shadow) | — | `.nds-hero-section.nds-sub` | A light tint of the brand primary, with a shadow inside its edges |
| Background | Image (not: profile) | `--hero-image: url('../assets/img/riyadhcenter_ai.webp')` | `.nds-hero-section.nds-sub` | A photo on the end side, which fades into the tint toward the title. For a page with its own photo |
| Background | Flat (not: profile) (hint: The page background, with no tint, shadow or image) | `.nds-flat` | `.nds-hero-section.nds-sub` | The page background, with no tint, shadow or image. For an article or a form, where the content starts right under the title |
{: #heroVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="heroBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Hero Slider
{: .nds-block-title}

The main hero shows one slide at a time, and the Swiper script moves between them. Before the script starts, only the first slide shows, so the page paints with its image. The later slides load their images from `data-src` and `data-srcset` when they come near the screen. The slider options are on [Swiper](../components/swiper).

### Background Image
{: .nds-block-title}

`--hero-image` on the sub hero puts a photo behind it. The photo is solid at the end side and fades out toward the title, so the tint shows under the text. The fade turns with the text direction. The tint also covers half of the photo. Knobs in the API change the fade, the part in view and the tint. `nds-flat` hides the photo.

</div>
  </div>
</section>

<section id="heroFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-flash"></i>
            <span class="nds-label">First Paint</span>
          </span>
          <p class="nds-item-desc">The title, the description and the breadcrumb paint with the critical CSS, before the rest of the page. The buttons keep their height while they load, so nothing moves.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-ruler"></i>
            <span class="nds-label">Height</span>
          </span>
          <p class="nds-item-desc">The main hero is 550px high on every screen, and each image covers it. <code class="nds-inline-code lang-css">--hero-height</code> changes it. The sub hero is as high as its content, at least 220px.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-text-font"></i>
            <span class="nds-label">Title Sizes</span>
          </span>
          <p class="nds-item-desc">The main hero's title is a large display size, and the sub hero's is one size smaller. Both scale with the screen width.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paint-board"></i>
            <span class="nds-label">Brand Tint</span>
          </span>
          <p class="nds-item-desc">The tint over a slide image and the sub hero background come from theme tokens, so they follow a brand change.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="heroPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use the main hero on the home page and on the home page of a sub-site. Every other page uses the sub hero.
- Keep the description to one or two sentences. The hero says where the reader is. The content comes after it.
- Put one or two buttons in the action row. In the title action, put Share and at most one main button, such as the start of a service.
- Give the first slide's image `fetchpriority="high"`. It is the largest paint on the home page.
- Preload the first slide's image in the `<head>`, with one `<link rel="preload" as="image">` for each `source`. Copy the `media` of each `source` exactly, or the browser loads one file and paints another. Each page preloads only its own hero image. See [Head](../ui-shell/head).
- Give each later slide's `img` a `data-src`, and each of its `source` elements a `data-srcset`. A plain `srcset` loads at once.
- Keep a photo in the main hero. If the photo is not ready, point the `picture` at a placeholder image and replace it later.
- Set `--overlay` on each slide for its image: about 0.4 to 0.5 for a dark image, and 0.6 to 0.8 for a bright one.
- Do not set `--img-overlay-color`. It follows the brand, and a fixed value stops that.
- For a photo in the sub hero, pick one with its subject on one side. The fade keeps the end side and hides the side of the title.
- Do not write `nds-oncolor` on text in a flat hero: it shows white on a light page.

</div>
  </div>
</section>

<section id="heroApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-aside` | `section.nds-hero-section.nds-sub` | At 960px and wider, narrows the breadcrumb, the title and the description by the width of the side info column. The column then moves up beside the title. Write it only on a page with a side info column: see [Side Info](../ui-shell/sideinfo) |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--hero-height` | `550px` | The height of the main hero. Set it in the `style` of the section |
| `--hero-image` | None | The photo of the sub hero, as `url('…')`. Set it in the `style` of the section |
| `--hero-image-position` | `left center` | The part of the photo that stays in view, as a `background-position`, such as `50% 30%`. Set it in the `style` of the section, with `--hero-image` |
| `--hero-image-fade-angle` | `90deg`, or `270deg` on a left-to-right page | The direction of the photo's fade. Another angle fades it from the top or a corner |
| `--hero-image-fade-from` | `0%` | Where the fade starts. Up to this point, the photo is solid |
| `--hero-image-fade-to` | `70%` | Where the photo is gone |
| `--overlay` | `0.7` on a slide, `0.5` on the sub hero | The strength of the tint over the image, from `0` (none) to `1` (solid). On the main hero, set it in the `style` of each `.nds-hero-image-wrapper`. On the sub hero, set it in the `style` of the section, with `--hero-image` |
| `--img-overlay-color` | `var(--colors-primary-950)` | The color of that tint, a theme token. A custom brand sets it to `var(--colors-neutral-950)`. Do not set it |
| `--background-hero` | `var(--background-primary-strong)` | The color behind the main hero, a theme token. It shows until the first image loads |
| `--background-sub-hero` | `var(--background-primary-light)` | The color of the sub hero, a theme token. High contrast mode changes it |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

The hero has no script of its own. The Swiper script runs the main hero, and the Share script runs the Share menu: see [Swiper](../components/swiper) and [Share](../utilities/share).

</div>
  </div>
</section>

<section id="heroRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Home Page Template](../templates/home-template): the main hero.
- [Service Page Template](../templates/service-template): the Service shape, beside a side info column.
- [Content Template](../templates/content-template): a flat sub hero with a brief.
- [Faculty CV](../examples/faculty-cv): the Profile shape.
- [Page Layout](../layout/page-layout): where the hero sits on each page shape.

</div>
  </div>
</section>
