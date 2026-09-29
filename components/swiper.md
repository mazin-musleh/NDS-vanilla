---
layout: page
title: Swiper
hero_title: Swiper - National Design System
hero_description: A swiper is a horizontal row of slides that the user swipes, scrolls or pages through with arrows and bullets.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "29/09/2026 - 11:24 PM"
---

<section id="swiperOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A swiper is a `.nds-swiper-wrapper` of `.nds-swiper-slide` items, which scroll and snap with CSS. A slide holds any content, usually a [Card](../components/cards) or an image. The optional navigation row holds the previous and next buttons and the pagination bullets, which the script builds. A hero swiper fills a [Hero](../ui-shell/hero) section, and a spotlight keeps one slide in the middle with smaller slides at its sides.

Pick another component when:

- every item must be visible at once: [Grid](../layout/grid)
- each item is a separate view the user picks by name: [Tabs](../components/tabs)
- the list is long and the user searches or pages through it: [Pagination](../components/pagination)

</div>
  </div>
</section>

<section id="swiperMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="swiper-cards" data-canon data-variants="swiperVariantsTable">
<div class="nds-swiper" style="--max-slides: 3; --mid-slides: 2; --min-slides: 1">
  <div class="nds-swiper-wrapper">
    <div class="nds-swiper-slide">
      <div class="nds-card nds-stroke">
        <div class="nds-card-content">
          <span class="nds-card-title">Passport Renewal</span>
          <p class="nds-card-description">Renew a passport online and collect it from the nearest office.</p>
        </div>
      </div>
    </div>
    <div class="nds-swiper-slide">
      <div class="nds-card nds-stroke">
        <div class="nds-card-content">
          <span class="nds-card-title">Vehicle Registration</span>
          <p class="nds-card-description">Register a new vehicle or transfer its ownership.</p>
        </div>
      </div>
    </div>
    <div class="nds-swiper-slide">
      <div class="nds-card nds-stroke">
        <div class="nds-card-content">
          <span class="nds-card-title">Business License</span>
          <p class="nds-card-description">Apply for a commercial license and track the request.</p>
        </div>
      </div>
    </div>
    <div class="nds-swiper-slide">
      <div class="nds-card nds-stroke">
        <div class="nds-card-content">
          <span class="nds-card-title">National Address</span>
          <p class="nds-card-description">Register or update the national address of a home.</p>
        </div>
      </div>
    </div>
    <div class="nds-swiper-slide">
      <div class="nds-card nds-stroke">
        <div class="nds-card-content">
          <span class="nds-card-title">Traffic Violations</span>
          <p class="nds-card-description">View traffic violations and pay them in one step.</p>
        </div>
      </div>
    </div>
    <div class="nds-swiper-slide">
      <div class="nds-card nds-stroke">
        <div class="nds-card-content">
          <span class="nds-card-title">Appointments</span>
          <p class="nds-card-description">Book, change or cancel an appointment at a service center.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="nds-swiper-navigation" hidden>
    <div class="nds-swiper-buttons">
      <button type="button" class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev" aria-label="Previous slide"></button>
      <button type="button" class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next" aria-label="Next slide"></button>
    </div>
    <div class="nds-swiper-pagination"></div>
  </div>
</div>
</script>
<script type="text/html" id="swiper-hero" data-canon>
<section class="nds-hero-section">
  <div class="nds-swiper nds-hero nds-oncolor nds-full-width">
    <div class="nds-swiper-wrapper">
      <div class="nds-swiper-slide nds-content-wrapper">
        <div class="nds-hero-image-wrapper" style="--overlay: 0.8;">
          <img src="../docs-assets/img/home_hero_bg_md.webp" class="nds-hero-image" alt="" fetchpriority="high">
        </div>
        <div class="nds-section-body">
          <h2 class="nds-section-title">Government Services</h2>
          <p class="nds-section-description">Find a service, apply online and track the request.</p>
          <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary nds-oncolor nds-md">
              <span class="nds-label">Learn More</span>
            </a>
          </div>
        </div>
      </div>
      <div class="nds-swiper-slide nds-content-wrapper" hidden>
        <div class="nds-hero-image-wrapper" style="--overlay: 0.5;">
          <img data-src="../docs-assets/events/foundation_day/Hero_bg.webp" class="nds-hero-image" alt="">
        </div>
        <div class="nds-section-body">
          <h2 class="nds-section-title">Our Story</h2>
          <p class="nds-section-description">A founding we cherish, a future we shape.</p>
          <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary nds-oncolor nds-md">
              <span class="nds-label">Learn More</span>
            </a>
          </div>
        </div>
      </div>
      <div class="nds-swiper-slide nds-content-wrapper" hidden>
        <div class="nds-hero-image-wrapper" style="--overlay: 0;">
          <img data-src="../docs-assets/events/Hajj/darkhero_ltr.webp" class="nds-hero-image" alt="">
        </div>
        <div class="nds-section-body">
          <h2 class="nds-section-title">Creating a Lasting Spiritual Journey</h2>
          <p class="nds-section-description">Our vision is to create a lasting spiritual journey that exceeds the expectations of the Guests of the Most Merciful.</p>
          <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary nds-oncolor nds-md">
              <span class="nds-label">Learn More</span>
            </a>
          </div>
        </div>
      </div>
      <div class="nds-swiper-slide nds-content-wrapper" hidden>
        <div class="nds-hero-image-wrapper" style="--overlay: 0;">
          <img data-src="../docs-assets/events/national_day_96/hero_bg.webp" class="nds-hero-image" alt="">
        </div>
        <div class="nds-section-body">
          <h2 class="nds-section-title">Saudi National Day</h2>
          <p class="nds-section-description">We celebrate the glory and pride of our nation.</p>
          <div class="nds-section-action">
            <a href="#" class="nds-btn nds-primary nds-oncolor nds-md">
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
<script type="text/html" id="swiper-spotlight" data-canon>
<div class="nds-swiper nds-spotlight">
  <div class="nds-swiper-wrapper">
    <div class="nds-swiper-slide">
      <img src="../docs-assets/events/national_day_96/card_heritage.webp" width="491" height="491" alt="Heritage" fetchpriority="high">
    </div>
    <div class="nds-swiper-slide">
      <img data-src="../docs-assets/events/national_day_96/card_courage.webp" width="491" height="491" alt="Courage">
    </div>
    <div class="nds-swiper-slide">
      <img data-src="../docs-assets/events/national_day_96/card_ambition.webp" width="491" height="491" alt="Ambition">
    </div>
    <div class="nds-swiper-slide">
      <img data-src="../docs-assets/events/national_day_96/card_generosity.webp" width="491" height="491" alt="Generosity">
    </div>
    <div class="nds-swiper-slide">
      <img data-src="../docs-assets/events/national_day_96/card_kindness.webp" width="491" height="491" alt="Kindness">
    </div>
    <div class="nds-swiper-slide">
      <img data-src="../docs-assets/events/national_day_96/card_vision.webp" width="491" height="491" alt="Vision">
    </div>
  </div>
  <div class="nds-swiper-navigation" hidden>
    <div class="nds-swiper-buttons">
      <button type="button" class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-prev" aria-label="Previous slide"></button>
      <button type="button" class="nds-btn nds-primary nds-icon-only nds-circle nds-md nds-next" aria-label="Next slide"></button>
    </div>
    <div class="nds-swiper-pagination"></div>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="swiperVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

A Per view choice has one row for each knob it changes: write them all in the swiper's `style`. The Hero and Spotlight structures always show one slide, so Per view stays at 1 on them. Peek and Loading are off on a hero. Peek, Loop and Loading are off on a spotlight, which sizes and loops itself.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Cards (default) | — | — | A row of cards or images, several on a page. The usual swiper |
| Structure | Hero (demo: + per-1) | canon `#swiper-hero` | — | Full-width slides with a background image, one at a time, at the top of a page |
| Structure | Spotlight (demo: + per-1) | canon `#swiper-spotlight` | — | One slide in the middle at full size, with smaller slides at its sides. For a set of images or cards the user looks at one by one |
| Per view | 3 · 2 · 1 (default) | — | `.nds-swiper:not(.nds-hero):not(.nds-spotlight)` | 3 slides on a desktop, 2 on a tablet, 1 on a phone |
| Per view | 4 · 3 · 2 | `--max-slides: 4` | `.nds-swiper:not(.nds-hero):not(.nds-spotlight)` | Smaller items, such as logos or short cards |
| Per view | 4 · 3 · 2 | `--mid-slides: 3` | `.nds-swiper:not(.nds-hero):not(.nds-spotlight)` | The same, on a tablet |
| Per view | 4 · 3 · 2 | `--min-slides: 2` | `.nds-swiper:not(.nds-hero):not(.nds-spotlight)` | The same, on a phone |
| Per view | 1 (id: per-1) | `--max-slides: 1` | `.nds-swiper:not(.nds-hero):not(.nds-spotlight)` | One slide at every width, such as an image gallery |
| Per view | 1 (id: per-1) | `--mid-slides: 1` | `.nds-swiper:not(.nds-hero):not(.nds-spotlight)` | The same, on a tablet |
| Per view | 1 (id: per-1) | — | `.nds-swiper.nds-hero` | A hero always shows one slide. It needs no knob |
| Per view | 1 (id: per-1) | — | `.nds-swiper.nds-spotlight` | A spotlight always shows one slide in the middle. It needs no knob |
| Arrows | Beside bullets (default) | — | — | The arrows at the start of the navigation row and the bullets at its end |
| Arrows | Split | `.nds-center` | `.nds-swiper-navigation` | The bullets in the middle of the row and one arrow at each end |
| Arrows | Middle | `.nds-middle` | `.nds-swiper` | One arrow on each side of the slides, at their middle, and no bullets. Tablet and wider: a phone shows the navigation row |
| Bullets | LG (default) | — | — | 16px bullets. It needs no class |
| Bullets | MD | `.nds-md` | `.nds-swiper-pagination` | 12px bullets |
| Bullets | SM | `.nds-sm` | `.nds-swiper-pagination` | 8px bullets |
| Peek | Peek | `--peek: 40px` | `.nds-swiper:not(.nds-hero):not(.nds-spotlight)` | Shows 40px of the next slide, so the user sees there is more. Any length works |
| Loop | Loop | `[data-swiper-loop]` | `.nds-swiper:not(.nds-spotlight)` | An endless row: the first slide follows the last |
| Loading | Loading (hint: Skeleton placeholders) | `.nds-loading` | `.nds-swiper:not(.nds-hero):not(.nds-spotlight)` | Every card shows as a skeleton while its data loads. Remove the class when the data is in |
{: #swiperVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="swiperBehavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Slides per View
{: .nds-block-title}

`--max-slides`, `--mid-slides` and `--min-slides` set how many slides show on a desktop, a tablet and a phone. CSS sizes the slides from them before the script runs, so the row does not move when the script starts. The arrows and the bullets move one page, and a page is that many slides. The last page ends at the last slide, so it can share slides with the page before it.

### Peek
{: .nds-block-title}

`--peek` leaves that length of the next slide showing at the end of each page. The slides shrink to make room for it. When all the slides fit on one page, the script turns the peek off, since there is nothing to show.

### Loop
{: .nds-block-title}

`data-swiper-loop` makes the row endless in both directions. The script copies slides to both ends. Screen readers skip the copies and Tab never lands on them, but a click on one works. When the row stops on a copy, it jumps to the real slide with no visible move. The swiper ignores the attribute unless it has more slides than its largest slides per view. A loop never turns its arrows off, and it has no `at-start` or `at-end` state.

### Middle Arrows
{: .nds-block-title}

`nds-middle` moves the arrows out of the navigation row to each side of the slides, at their middle, and hides the bullets. The swiper makes room for the arrows, so they never cover a slide. Use it for a wide strip the user scans, such as a row of partner logos. On a phone the navigation row comes back, since the user swipes there. On a hero, the arrows sit over the slide and the bullets stay.

### Hero
{: .nds-block-title}

`nds-hero` shows one full-width slide at a time, with no gap, inside a [Hero](../ui-shell/hero) section. Put `nds-full-width` on the swiper, so the slides reach the edges of the screen. The navigation row sits over the bottom of the slides. Write `hidden` on every slide after the first. The script shows those slides when the hero first comes into view, so the browser does not decode their images before then.

### Spotlight
{: .nds-block-title}

`nds-spotlight` keeps the open slide in the middle at full size. The slides at its sides are smaller and sit close to it, and they grow as they move to the middle. It always loops, and each arrow, bullet or swipe moves one slide. On a wide row a whole slide shows at each side. On a narrow row the open slide stays at least 240px wide, and less of the side slides shows. Content wider than that makes its slide wider, and the slide still stops in the middle. It needs three slides to loop. It ignores the slides per view, `--peek`, `--padding` and `data-swiper-loop`.

</div>
  </div>
</section>

<section id="swiperFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">The script starts every <code class="nds-inline-code lang-html">nds-swiper</code> on the page. There is nothing to call.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-scroll-horizontal"></i>
            <span class="nds-label">Native Scroll Snap</span>
          </span>
          <p class="nds-item-desc">The row scrolls and snaps with CSS, so a swipe, a drag and a trackpad feel native. The row still scrolls when the script has not loaded.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layout-01"></i>
            <span class="nds-label">Stable First Paint</span>
          </span>
          <p class="nds-item-desc">The slides have their final width before the script runs, and the navigation row keeps its space. Nothing on the page moves when the swiper starts.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-dashboard-square-01"></i>
            <span class="nds-label">Page-Count Navigation</span>
          </span>
          <p class="nds-item-desc">The script makes one bullet for each page, and makes them again when a new screen width changes the page count. When all the slides fit on one page, it hides the arrows and the bullets.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-image-02"></i>
            <span class="nds-label">Lazy Images</span>
          </span>
          <p class="nds-item-desc">An image with <code class="nds-inline-code lang-html">data-src</code> or <code class="nds-inline-code lang-html">data-srcset</code> loads when its slide comes within 200px of the screen. Until then, its box shows a skeleton.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-keyboard"></i>
            <span class="nds-label">Keyboard Navigation</span>
          </span>
          <p class="nds-item-desc">The swiper takes focus. The arrow keys move one page, in the reading direction. Home goes to the first page and End to the last.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-layers-01"></i>
            <span class="nds-label">Nested Swipers</span>
          </span>
          <p class="nds-item-desc">A slide can hold another swiper. Each swiper uses only its own arrows and bullets, and the keys move the one that has focus.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">A script can move a swiper to any slide, and the swiper fires <code class="nds-inline-code lang-js">nds:swiper:change</code> after every move.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="swiperPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a swiper for a set the user browses, such as featured services or a gallery. Put content the user must see all at once in a [Grid](../layout/grid).
- Write `hidden` on `.nds-swiper-navigation`. The script shows the row only when there is more than one page.
- Set the slides per view in the swiper's `style`, not in a stylesheet. The script reads them from `style`.
- Give the slides in one swiper the same height. The tallest slide sets the height of the row.
- Load the images of later slides with `data-src` and `data-srcset`, not `src`. Give the first image `fetchpriority="high"`.
- Give a lazy image a width and a height, or an `aspect-ratio`. Before it loads it has no size of its own, so its skeleton does not show.
- To run the row to the edges of the page, put the swiper in a section body with `nds-max-width`. See [Section](../layout/section#tier5).
- Add `--peek` when the slides do not fit on one page, so the user sees there is more.
- Keep a hero to four slides or fewer. Few users reach the later ones.
- Put one element in each spotlight slide, such as an image or a card. The spotlight shrinks and grows that one element.
- With `nds-middle` on a hero, keep the slide text away from the sides, or center it. The arrows sit over the edges of the slide.
- Give each arrow an `aria-label` that names its direction.

</div>
  </div>
</section>

<section id="swiperApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Other Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-oncolor` | `.nds-swiper` | Light bullets, arrows and section text, for a dark or image background. The Hero structure has it. It reaches subtle arrows only: add `nds-oncolor` to a primary or neutral arrow yourself |
| `nds-swiper-buttons` | `div` in `.nds-swiper-navigation` | Holds the previous and next buttons |
| `nds-prev`, `nds-next` | `.nds-btn` | Makes the button move one page, and gives it its arrow icon. Style it as any button. The buttons can sit anywhere in the swiper |
| `nds-bullet` | `button` | A bullet. The script makes them in `.nds-swiper-pagination` |
| `nds-swiper-clone` | `.nds-swiper-slide` | The script writes it on each copy it makes for a loop |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-swiper-loop` | `.nds-swiper` | An endless row. See Loop under Behavior |
| `data-src`, `data-srcset` | `img`, `source` in a slide | The image source, loaded when the slide comes near the screen |
| `hidden` | `.nds-swiper-navigation`, hero slides after the first | Hides them until the script shows them |
| `data-state` | `.nds-swiper` | The script writes `at-start` on the first page and `at-end` on the last, and both when there is one page. Use them to style the ends: `.nds-swiper[data-state~="at-end"]` |
| `data-swiper-clone` | `.nds-swiper-clone` | The index of the real slide the copy repeats. Use it to update the copies of a slide you change at runtime |
| `data-status` | `.nds-bullet`, spotlight `.nds-swiper-slide` | The script writes `active` on the current bullet. In a spotlight it also writes `active` on the open slide and its loop copies, and `after` on the slides after it |
| `data-swiper-peek` | `.nds-swiper` | The script writes it while the peek shows |
{: .nds-table .nds-responsive}

The bare attributes `slides-max`, `slides-mid`, `slides-min` and `peek` still work but are deprecated. Only the script reads them, so the row gets its size late. Use the custom properties.

### CSS Custom Properties
{: .nds-block-title}

Set these in the `style` of `.nds-swiper`. Set the bullet colors on the swiper or on a parent. Do not set the `--swiper-gap`, `--swiper-padding`, `--swiper-peek`, `--swiper-slides` or `--swiper-total` values: the swiper computes them from these.

| Property | Default | Controls |
|---|---|---|
| `--max-slides` | `1` | Slides per view on a desktop: 960px and wider |
| `--mid-slides` | `1` | Slides per view on a tablet: 600px to 959px |
| `--min-slides` | `1` | Slides per view on a phone: narrower than 600px |
| `--peek` | unset | Length of the next slide left showing, such as `40px`. `0px` is no peek |
| `--gap` | `var(--spacing-xl)` | Space between slides |
| `--padding` | `0px` | Space at each end of the row. Inside `.nds-max-width` it is the gap, so the row runs to the screen edge |
| `--total` | `1` | Number of slides. The script writes it |
| `--swiper-bullet-default` | `var(--swiper-bullet-background-default)` | Bullet color |
| `--swiper-bullet-default-hovered` | `var(--swiper-bullet-background-hovered)` | Bullet color on hover |
| `--swiper-bullet-active` | `var(--swiper-bullet-background-active)` | Color of the current bullet |
| `--swiper-bullet-active-hovered` | `var(--swiper-bullet-background-active-hovered)` | Color of the current bullet on hover |
| `--swiper-bullet-border` | `transparent` | Bullet border color |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

A swiper in the page starts by itself. The instance is on the element as `el._ndsSwiper`. Indexes count real slides only, never loop copies.

| Method | Effect |
|---|---|
| `NDS.Swiper.init()` | Starts every `.nds-swiper` that has not started. `reinit()` is the same |
| `NDS.Swiper.create(el)` | Starts one swiper and returns its instance |
| `NDS.Swiper.destroy(el)` | Stops one swiper and puts its markup back as written. `NDS.Init.destroy()` calls it |
| `instance.next()`, `instance.prev()` | Moves one page |
| `instance.goTo(index)` | Moves to a slide |
| `instance.slideTo(index, animate)` | Moves to a slide, no further than the last page. `false` for `animate` moves at once |
| `instance.destroy()` | The same as `NDS.Swiper.destroy(el)` |
{: .nds-table .nds-responsive}

| Event | Fired on | Detail |
|---|---|---|
| `nds:swiper:change` | `.nds-swiper`, and bubbles | `index`: the slide at the start of the page, or the open slide in a spotlight, after every move |
{: .nds-table .nds-responsive}

<script type="text/html" id="swiper-js" data-canon data-lang="js">
var el = document.querySelector('.nds-swiper');
var swiper = el._ndsSwiper;

swiper.goTo(3);           // animated
swiper.slideTo(0, false); // at once

// Change something outside the swiper with the slide
el.addEventListener('nds:swiper:change', function (e) {
  console.log('slide', e.detail.index);
});
</script>

The full API is in the banner of `_js/nds-swiper.js`.

</div>
  </div>
</section>

<section id="swiperRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Home Template](../templates/home-template): a hero swiper at the top of the page.
- [Service Template](../templates/service-template): a row of service cards.
- [Hero](../ui-shell/hero): the hero section a hero swiper sits in.

</div>
  </div>
</section>
