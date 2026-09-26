---
layout: page
title: Scroll More
hero_title: Scroll More - National Design System
hero_description: A general-purpose overflow wrapper that auto-detects its scroll axis, fades the edges of clipped content, and shows a sticky button to paginate through the rest.
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.7.2"
last_edit: "26/09/2026 - 07:27 PM"
---

<section id="scrollMoreOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

Scroll More fits long content into a set height or width. The wrapper is `nds-scroll-more`, and the part that scrolls is `nds-scroll-more-content`. When the content does not fit, its edges fade, and an optional `nds-show-more` button moves it on one page at a time. The script finds the scroll direction by itself.

Pick another component when:

- the items are tabs: [Tabs](../components/tabs), which scroll their own tab row
- a "Show all" button is enough and paging is not needed: [Expandable Content](../utilities/expandable-content)
- the content is a menu with levels: [Drawer](../components/drawer)

</div>
  </div>
</section>

<section id="scrollMoreMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="sm-list" data-canon data-variants="smVariantsTable">
<div class="nds-scroll-more" style="--scroll-max-height: 240px;">
  <ul class="nds-scroll-more-content">
    <li>Riyadh</li>
    <li>Jeddah</li>
    <li>Makkah</li>
    <li>Madinah</li>
    <li>Dammam</li>
    <li>Khobar</li>
    <li>Taif</li>
    <li>Tabuk</li>
    <li>Abha</li>
    <li>Buraydah</li>
    <li>Khamis Mushait</li>
    <li>Hail</li>
  </ul>
  <button type="button" class="nds-btn nds-subtle nds-md nds-show-more">
    <span class="nds-label">Show more</span>
    <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
  </button>
</div>
</script>
<script type="text/html" id="sm-row" data-canon>
<div class="nds-scroll-more" style="--scroll-max-width: 480px;">
  <div class="nds-scroll-more-content nds-flex" style="--align: center;">
    <button type="button" class="nds-btn nds-subtle nds-sm"><span class="nds-label">All</span></button>
    <button type="button" class="nds-btn nds-subtle nds-sm"><span class="nds-label">Healthcare</span></button>
    <button type="button" class="nds-btn nds-subtle nds-sm"><span class="nds-label">Education</span></button>
    <button type="button" class="nds-btn nds-subtle nds-sm"><span class="nds-label">Transport</span></button>
    <button type="button" class="nds-btn nds-subtle nds-sm"><span class="nds-label">Housing</span></button>
    <button type="button" class="nds-btn nds-subtle nds-sm"><span class="nds-label">Employment</span></button>
    <button type="button" class="nds-btn nds-subtle nds-sm"><span class="nds-label">Social support</span></button>
    <button type="button" class="nds-btn nds-subtle nds-sm"><span class="nds-label">Justice</span></button>
  </div>
  <button type="button" class="nds-btn nds-subtle nds-md nds-show-more">
    <span class="nds-label">Show more</span>
    <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
  </button>
</div>
</script>
<script type="text/html" id="sm-cards" data-canon>
<div class="nds-scroll-more">
  <div class="nds-scroll-more-content nds-grid" style="--max-col: 6; --min-width: 280px;">
    <div class="nds-card nds-stroke">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Renew a passport</span>
          <p class="nds-card-description">Renew it online before it expires.</p>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Book an appointment</span>
          <p class="nds-card-description">Pick a time at the nearest service center.</p>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Pay a fine</span>
          <p class="nds-card-description">See your traffic fines and pay them.</p>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Register a business</span>
          <p class="nds-card-description">Get a commercial registration in one day.</p>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Apply for housing</span>
          <p class="nds-card-description">Check your eligibility for housing support.</p>
        </div>
      </div>
    </div>
    <div class="nds-card nds-stroke">
      <div class="nds-card-content">
        <div class="nds-card-text">
          <span class="nds-card-title">Report an issue</span>
          <p class="nds-card-description">Tell us about a problem with a service.</p>
        </div>
      </div>
    </div>
  </div>
  <button type="button" class="nds-btn nds-subtle nds-md nds-show-more">
    <span class="nds-label">Show more</span>
    <i class="nds-icon nds-hgi-arrow-down-01" aria-hidden="true"></i>
  </button>
</div>
</script>
    </div>
  </div>
</section>

<section id="scrollMoreVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every row goes on the wrapper. The wrapper fits its content, but never grows wider than its container, so a wide row scrolls. A list scrolls only once `--scroll-max-height` limits its height.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Vertical list (default) | — | — | A list with a set height. The button stands under it |
| Structure | Horizontal row | canon `#sm-row` | — | A row of buttons or chips with a set width. The button stands at the row's end, with its label written sideways |
| Structure | Card track | canon `#sm-cards` | — | A row of cards wider than its container. The wrapper stops at the container's width, and the cards scroll inside it |
| Divided | Divided | `.nds-divided` | `.nds-scroll-more` | A hairline between the content and the button, shown while the content overflows |
| Snap | Snap (hint: For card tracks) | `.nds-snap` | `.nds-scroll-more` | Each item's start snaps to the edge of the scrolling area |
| Gap | Gap | `--scroll-gap: var(--spacing-md)` | `.nds-scroll-more` | Space between the content and the button. With Divided, the hairline sits in the gap |
{: #smVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="scrollMoreFeatures" class="nds-content-section nds-doc-features">
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
          <p class="nds-item-desc">Every <code class="nds-inline-code lang-html">.nds-scroll-more</code> on the page starts by itself. The overflow check, the scroll listener and the button need no call.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-arrow-data-transfer-vertical"></i>
            <span class="nds-label">Axis Auto-detection</span>
          </span>
          <p class="nds-item-desc">The script measures both directions and scrolls the one that overflows. When both do, it scrolls vertically.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-blur"></i>
            <span class="nds-label">Edge Fade Mask</span>
          </span>
          <p class="nds-item-desc">An edge fades only while more content lies past it, so there is no fade at the very start or the very end.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-mouse-scroll-01"></i>
            <span class="nds-label">Item-aware Step</span>
          </span>
          <p class="nds-item-desc">Each click moves one page minus one item, so the last item stays in view as an anchor. The first item's size sets the step.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-repeat"></i>
            <span class="nds-label">Loop to Start</span>
          </span>
          <p class="nds-item-desc">At the end, the button's arrow flips, and the next click scrolls back to the start.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-resize-01"></i>
            <span class="nds-label">Reactive to Layout</span>
          </span>
          <p class="nds-item-desc">The script checks the overflow again when the content area changes size, so the button shows and hides as needed.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-touch-01"></i>
            <span class="nds-label">Free-scroll Friendly</span>
          </span>
          <p class="nds-item-desc">Touch, trackpad and mouse-wheel scrolling work as usual. The scroll listener is passive and runs at most once a frame.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-api"></i>
            <span class="nds-label">Programmatic Control</span>
          </span>
          <p class="nds-item-desc">Start a new wrapper, check the overflow again or remove the behavior through <code class="nds-inline-code lang-js">NDS.ScrollMore</code>.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="scrollMorePractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use Scroll More to fit a long list, a row of chips or a card track into a set area, with every item still in reach.
- Give a vertical list a height limit with `--scroll-max-height`. Without one, the list never overflows and the button never shows.
- Keep the items the same size when you want even paging. The first item sets the step.
- Keep the visible "Show more" label on the button. It names the button for screen readers.
- Add `nds-snap` to a card track, so each click stops at the start of a card.
- When items have borders or shadows that the edge clips, add inline padding to `.nds-scroll-more-content`.

</div>
  </div>
</section>

<section id="scrollMoreApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

The script writes these on the wrapper. Read them in your own CSS or script. Do not set them.

| Attribute | Element | Effect |
|---|---|---|
| `data-axis` | `.nds-scroll-more` | `vertical` or `horizontal`: the direction that overflows. Removed when nothing overflows |
| `data-state` | `.nds-scroll-more` | `has-more` while the content overflows, `at-start` at the start of the scroll and `at-end` at the end. They drive the fade and the direction of the button's arrow |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the wrapper.

| Property | Default | Controls |
|---|---|---|
| `--scroll-max-height` | `none` | Height limit of the wrapper, for vertical overflow |
| `--scroll-max-width` | `100%` | Width limit of the wrapper, for horizontal overflow. The default stops it at its container's width |
| `--scroll-fade` | `48px` | Length of the edge fade |
| `--scroll-gap` | `0` | Space between the content and the button |
| `--scroll-divider` | `var(--divider-color)` | Color of the `nds-divided` hairline |
| `--scroll-padding` | `var(--spacing-xs)` | Space at the end of the scroll, so the last item's border and focus ring are not clipped. The start stays flush. Set `0` to remove it |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.ScrollMore.init()` | Starts every `.nds-scroll-more` on the page that has not started yet. `reinit()` is the same |
| `NDS.ScrollMore.create(wrapper)` | Starts one wrapper. It does nothing on a wrapper that has started |
| `NDS.ScrollMore.checkOverflow(wrapper)` | Checks the overflow again. Call it after you add or remove items while the wrapper keeps its size |
| `NDS.ScrollMore.destroy(wrapper)` | Removes the listeners. Call it before you remove the wrapper |
{: .nds-table .nds-responsive}

<script type="text/html" id="sm-js" data-canon data-lang="js">
var wrapper = document.querySelector('.nds-scroll-more');
wrapper.querySelector('.nds-scroll-more-content').insertAdjacentHTML('beforeend', '<li>Jazan</li>');
NDS.ScrollMore.checkOverflow(wrapper);
</script>

The full API is in the banner of `_js/nds-scroll-more.js`.

</div>
  </div>
</section>

<section id="scrollMoreRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Tabs](../components/tabs): the tab row scrolls through Scroll More.
- Every code block on this site: its row of language tabs is a Scroll More.

</div>
  </div>
</section>
