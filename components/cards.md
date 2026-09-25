---
layout: page
title: Cards
hero_title: Cards - National Design System
hero_description: A card groups one unit of content, such as a service, a product, an article, or a metric, into a single box
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "1.12.x"
last_edit: "25/09/2026 - 10:36 AM"
---

<section id="cardOverview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use a card for one scannable unit in a set: a service tile, a product, an article preview, or a dashboard number.
- Use an [alert](../components/alert) for a short status message, and a [modal](../components/modal) to ask the user for a decision.
- For a card whose text can expand, see [Expandable Content](../utilities/expandable-content). For a number with a trend line, see [Metric](../components/metric).

</div>
  </div>
</section>

<section id="cardMarkup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="card-standard" data-canon data-variants="cardVariantsTable">
<div class="nds-card nds-stroke">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle nds-lg">
        <i class="hgi hgi-stroke hgi-stars"></i>
      </span>
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title">Card Title</span>
      <span class="nds-card-subtitle">Card Subtitle</span>
      <p class="nds-card-description">Short description of this card content goes here for demonstration.</p>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="card-image" data-canon>
<div class="nds-card nds-stroke">
  <div class="nds-card-header">
    <div class="nds-card-image" style="--img-pos-x:50%; --img-pos-y:10%;">
      <img src="../assets/img/riyadhcenter.webp" alt="Card image">
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title">Card Title</span>
      <span class="nds-card-subtitle">Card Subtitle</span>
      <p class="nds-card-description">Short description of this card content goes here for demonstration.</p>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="card-avatar" data-canon>
<div class="nds-card nds-stroke">
  <div class="nds-card-header">
    <div class="nds-avatar nds-xl">
      <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title">Card Title</span>
      <span class="nds-card-subtitle">Card Subtitle</span>
      <p class="nds-card-description">Short description of this card content goes here for demonstration.</p>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="card-no-header" data-canon>
<div class="nds-card nds-stroke">
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title">Card Title</span>
      <span class="nds-card-subtitle">Card Subtitle</span>
      <p class="nds-card-description">Short description of this card content goes here for demonstration.</p>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="card-link" data-canon>
<a href="#" class="nds-card nds-stroke">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle nds-lg">
        <i class="hgi hgi-stroke hgi-stars"></i>
      </span>
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title">Card Title</span>
      <p class="nds-card-description">The whole card is one link.</p>
    </div>
  </div>
</a>
</script>
<script type="text/html" id="card-statistic" data-canon>
<div class="nds-card nds-stroke nds-statistic">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle nds-xl">
        <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
      </span>
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-number nds-counter-value nds-number-format" data-target="125847">0</span>
      <p class="nds-card-description">Active Users</p>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="card-tags" data-canon>
<div class="nds-card-tags">
  <span class="nds-tag nds-blue nds-sm">
    <span class="nds-label">Category</span>
  </span>
  <span class="nds-tag nds-gray nds-sm">
    <span class="nds-label">Topic</span>
  </span>
</div>
</script>
<script type="text/html" id="card-rating" data-canon>
<div class="nds-card-rating">
  <div class="nds-rating nds-sm" data-rating="4.5">
    <span class="nds-rating-star"></span>
    <span class="nds-rating-star"></span>
    <span class="nds-rating-star"></span>
    <span class="nds-rating-star"></span>
    <span class="nds-rating-star"></span>
  </div>
  <span class="nds-card-rating-text">(12 reviews)</span>
</div>
</script>
<script type="text/html" id="card-meta" data-canon>
<div class="nds-card-meta">
  <div class="nds-card-tags">
    <span class="nds-tag nds-blue nds-sm">
      <span class="nds-label">Category</span>
    </span>
    <span class="nds-tag nds-gray nds-sm">
      <span class="nds-label">Topic</span>
    </span>
  </div>
  <div class="nds-card-rating">
    <div class="nds-rating nds-sm" data-rating="4.5">
      <span class="nds-rating-star"></span>
      <span class="nds-rating-star"></span>
      <span class="nds-rating-star"></span>
      <span class="nds-rating-star"></span>
      <span class="nds-rating-star"></span>
    </div>
    <span class="nds-card-rating-text">(12 reviews)</span>
  </div>
</div>
</script>
<script type="text/html" id="card-value-price" data-canon>
<div class="nds-card-value">
  <span class="nds-number-format" data-currency="SAR">1299</span>
</div>
</script>
<script type="text/html" id="card-value-sale" data-canon>
<div class="nds-card-value">
  <span class="nds-number-format" data-currency="SAR">1299</span>
  <s class="nds-number-format" data-currency="SAR">1599</s>
</div>
</script>
<script type="text/html" id="card-value-unit" data-canon>
<div class="nds-card-value">
  <span class="nds-number-format" data-currency="SAR">89</span>
  / kg
</div>
</script>
<script type="text/html" id="card-checkbox" data-canon>
<div class="nds-card-checkbox">
  <div class="nds-form-container nds-check-container">
    <div class="nds-form-control">
      <input type="checkbox" name="cardSelect" value="card-1" class="nds-check" aria-label="Select card">
    </div>
  </div>
</div>
</script>
<script type="text/html" id="card-status" data-canon>
<div class="nds-card-status">
  <span class="nds-tag nds-sm" data-status="success">
    <span class="nds-label">Active</span>
  </span>
</div>
</script>
<script type="text/html" id="card-actions" data-canon>
<div class="nds-card-actions">
  <a href="#" class="nds-btn nds-primary nds-lg">
    <span class="nds-label">Get Started</span>
  </a>
  <a href="#" class="nds-btn nds-secondary-outline nds-lg nds-trail-icon">
    <i class="nds-icon nds-hgi-link-square-02" aria-hidden="true"></i>
    <span class="nds-label">Learn More</span>
  </a>
</div>
</script>
    </div>
  </div>
</section>

<section id="cardVariants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Icon header (default) | — | — | A featured icon above the text |
| Structure | Image header | canon `#card-image` | — | A photo above the text. Set the focal point with `--img-pos-x` and `--img-pos-y` |
| Structure | Avatar header | canon `#card-avatar` | — | A person or an account |
| Structure | No header | canon `#card-no-header` | — | Text only |
| Structure | Link card (hint: The whole card is one link) | canon `#card-link` | — | The whole card is one `<a>` (or `<button>`). Hover and press feedback come from the element. Do not put links or buttons inside it |
| Structure | Statistic (hint: One headline number) | canon `#card-statistic` | — | One headline number with a label, centered. The number counts up from 0 to `data-target` when it scrolls into view. See [Numbers](../utilities/numbers#counterAnimation) |
| Meta | None (default) | — | — | No tags or rating |
| Meta | Tags | canon `#card-tags` | `.nds-card-content` | Tags alone go straight in the content |
| Meta | Rating | canon `#card-rating` | `.nds-card-content` | A star rating with a count |
| Meta | Tags and rating | canon `#card-meta` | `.nds-card-content` | `.nds-card-meta` groups two meta rows. Use it only when both are present |
| Value | None (default) | — | — | No price line |
| Value | Price | canon `#card-value-price` | `.nds-card-text` (after) | A price. `data-currency` shows the currency icon. See [Numbers](../utilities/numbers) |
| Value | Sale price | canon `#card-value-sale` | `.nds-card-text` (after) | A price with the original crossed out in `<s>` |
| Value | Unit price | canon `#card-value-unit` | `.nds-card-text` (after) | A price with a plain-text unit after it |
| Checkbox | Checkbox | canon `#card-checkbox` | `div.nds-card` (start) | Lets the user select the card. Sits in the top end corner. Not on a link card, which holds no controls |
| Status | Status | canon `#card-status` | `.nds-card-header` | A status tag, such as a person's availability. `data-status` sets its color. It sits at the top end, under the avatar in a row card, and over the corner of an image. It moves clear of a checkbox |
| Status | Status | `.nds-inverted` | `.nds-card-image ~ * .nds-tag` | Over an image, the tag needs a solid background to stay readable, so give it `.nds-inverted` |
| Actions | None (default) | — | — | No actions |
| Actions | Start | canon `#card-actions` | `div.nds-card` | Buttons after the content, never inside it. Not on a link card, which holds no links or buttons |
| Actions | End (hint: Aligned to the end of the row) | canon `#card-actions` | `div.nds-card` | The same, aligned to the end of the row |
| Actions | End (hint: Aligned to the end of the row) | `.nds-end` | `.nds-card-actions` | The same, aligned to the end of the row |
| Actions | Full (hint: The buttons share the width) | canon `#card-actions` | `div.nds-card` | The same, with each button filling the width |
| Actions | Full (hint: The buttons share the width) | `.nds-full` | `.nds-card-actions .nds-btn` | The same, with each button filling the width |
| Actions | Stacked (hint: One above the other, full width) | canon `#card-actions` | `div.nds-card` | The same, with the buttons one above the other, each filling the width |
| Actions | Stacked (hint: One above the other, full width) | `.nds-stacked` | `.nds-card-actions` | The same, with the buttons one above the other, each filling the width. `.nds-col` works too |
| Stroke | Stroke (default) | `.nds-stroke` | `.nds-card` | A 1px border. For flat and content-heavy layouts. Leave out both stroke and shadow for a plain card |
| Shadow | Shadow | `.nds-shadow` | `.nds-card` | An elevation shadow. For floating or modal-adjacent cards. It combines with the stroke |
| Color | None (default) | — | — | The default colors |
| Color | Neutral | `.nds-neutral` | `.nds-card` | Also `.nds-gray` |
| Color | Green | `.nds-green` | `.nds-card` | Tints the title, the icon and the hover border |
| Color | Yellow | `.nds-yellow` | `.nds-card` | Tints the title, the icon and the hover border |
| Color | Red | `.nds-red` | `.nds-card` | Tints the title, the icon and the hover border |
| Color | Blue | `.nds-blue` | `.nds-card` | Tints the title, the icon and the hover border |
| Color | On color | `.nds-oncolor` | `.nds-card` | For cards on a dark or photo background. It replaces the color classes, which do nothing on an on-color card |
| Color | On color | `.nds-oncolor` | `.nds-card-actions .nds-btn` | Buttons do not follow the card. Give each action button `.nds-oncolor` too |
| Color | On color | `.nds-oncolor` | `.nds-tag` | Tags do not follow the card either. Give each tag, including the status tag, `.nds-oncolor` |
| Tinted | Tinted (hint: A light tint of the card color) | `.nds-color` | `.nds-card` | Fills the card with a light tint of its color. With no color class, the tint is the brand primary |
| Layout | Stacked (default) | — | — | Header above content |
| Layout | Row | `.nds-rowView` | `.nds-card` | Header beside content. The card stacks again when it is narrower than 324px |
| Layout | Center | `.nds-center` | `.nds-card` | Centers every part. Put it on the card root only: the featured icon reads it there, so on an inner part it centers nothing |
| Full width | Full width | `.nds-full` | `.nds-card` | Fills its container, instead of stopping at 360px. Do not use `.nds-full-width` on a card: inside a section, that class breaks out to the full screen width |
| Number size | LG (default) | — | — | The display size |
| Number size | MD | `.nds-md` | `.nds-card-number` | A smaller headline number |
| Number size | SM | `.nds-sm` | `.nds-card-number` | The smallest headline number |
| Disabled | Disabled | `.nds-disabled` | `.nds-card` | Mutes the card and blocks clicks. `[disabled]` works on a `<button>` card |
| Loading | Loading (hint: Skeleton placeholders) | `.nds-loading` | `.nds-card` | Skeleton placeholders while the content loads |
{: #cardVariantsTable .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="cardFeatures" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-puzzle"></i>
            <span class="nds-label">CSS Only</span>
          </span>
          <p class="nds-item-desc">A card needs no script and no init call. Every look comes from classes.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-cursor-02"></i>
            <span class="nds-label">Interactive States</span>
          </span>
          <p class="nds-item-desc">An <code class="nds-inline-code lang-html">&lt;a&gt;</code> or <code class="nds-inline-code lang-html">&lt;button&gt;</code> card changes its background on hover. A stroke card also changes its border, and a shadow card deepens its shadow.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-image-02"></i>
            <span class="nds-label">Image Control</span>
          </span>
          <p class="nds-item-desc">The image keeps a 2:1 ratio by default. The ratio, the focal point and a dark overlay are set with custom properties on the image.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-loading-03"></i>
            <span class="nds-label">Loading Skeleton</span>
          </span>
          <p class="nds-item-desc">A card shows skeleton placeholders until the page reveals. Add <code class="nds-inline-code lang-html">nds-loading</code> to show them while your own data loads.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-filter"></i>
            <span class="nds-label">Filter Ready</span>
          </span>
          <p class="nds-item-desc">Filter treats each <code class="nds-inline-code lang-html">.nds-card</code> as one item by default, and searches the text in <code class="nds-inline-code lang-html">.nds-card-content</code>.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-customize"></i>
            <span class="nds-label">Nested Cards</span>
          </span>
          <p class="nds-item-desc">A card resets its color, spacing and width properties, so a value set on an outer card does not reach a card inside it.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="cardPractices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Make a whole card clickable by using `<a>` or `<button>` as the card root. Do not wrap a card in a separate link, and do not put links or buttons inside a clickable card.
- Use a stroke card in flat, content-heavy layouts, and a shadow card where the card floats over other content.
- Put `nds-center` on the card root only. On an inner part, it centers nothing.
- To fill the container, use `nds-full` on a card, not `nds-full-width`. Inside a section, `nds-full-width` breaks out to the full screen width.
- Put `.nds-card-actions` after `.nds-card-content`, not inside it. In a [modal](../components/modal), only the content scrolls. Actions inside the content still work there, because the modal pins them to the bottom.
- Size the featured icon or avatar up (`nds-lg`, `nds-xl`) on statistic cards and in grids, where the icon carries the meaning.
- Show a price with `.nds-card-value`, not with a tag.
- Keep the description to one or two lines. For longer text, [truncate](../utilities/truncate-text) it or link to a detail page.
- Do not put a card inside a card. Use `.nds-card-meta` or a [definition list](../components/definition-list) inside the content.
- Use `data-status` only when the card really has that status. For a color without a status, use the color class.
- Put a row of cards in a [grid](../layout/grid).

</div>
  </div>
</section>

<section id="cardApi" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-status` | `.nds-card` | The status of the card: `neutral`, `warning`, `error`, `critical`, `info` or `success`. It shows the matching color |
| `data-state~="loading"` | `.nds-card`, or a parent `.nds-grid`, `.nds-paged-content` or `.nds-swiper` | Skeleton placeholders on the card, or on every card inside the parent. The same as the `nds-loading` class |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-card`, except the image properties, which go on `.nds-card-image`.

| Property | Default | Controls |
|---|---|---|
| `--card-bg` | `var(--background-card)` | Background |
| `--card-bg-hover` | `var(--background-card-hovered)` | Background of a hovered link or button card |
| `--card-border` | `var(--border-neutral-primary)` | Border color of a stroke card |
| `--card-border-hover` | `var(--border-primary)` | Border color on hover |
| `--card-border-active` | `var(--border-neutral-primary)` | Border color on press |
| `--card-padding` | `var(--spacing-xl)` | Padding on both axes |
| `--card-padding-block` | `var(--card-padding)` | Top and bottom padding |
| `--card-padding-inline` | `var(--card-padding)` | Start and end padding. Card-style tab panels read it too |
| `--card-gap` | `var(--spacing-3xl)` | Gap between header, content and actions, and between the rows in `.nds-card-meta` |
| `--card-radius` | `var(--radius-lg)` | Corner radius |
| `--card-width` | `100%` | Width |
| `--card-width-min` | `0` | Minimum width |
| `--card-width-max` | `360px` | Maximum width |
| `--card-title` | `var(--text-display)` | Title color |
| `--card-subtitle` | `var(--text-primary-paragraph)` | Subtitle color |
| `--card-text` | `var(--text-display)` | Description color |
| `--card-number` | `var(--text-primary-strong)` | Statistic number color |
| `--card-rating` | `var(--text-secondary-paragraph)` | Rating count color |
| `--featuredicon-color` | `var(--featuredicons-icon-primary)` | Featured icon and avatar color. Color classes change it |
| `--featuredicon-bg` | `var(--featuredicons-background-primary-light)` | Featured icon background |
| `--card-image-width` | `160px` | Image width in a row card. No effect on a stacked card, where the image fills the width |
| `--img-ratio` | `2 / 1` | Image aspect ratio |
| `--img-pos-x` | `50%` | Horizontal focal point of the image |
| `--img-pos-y` | `50%` | Vertical focal point of the image |
| `--overlay` | `0` | Opacity of a dark overlay on the image, from 0 to 1 |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

Cards have no script, methods or events.

</div>
  </div>
</section>

<section id="cardRelated" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Home Page Template](../templates/home-template): service and news cards.
- [KPIs Template](../templates/kpis-template): statistic cards in a grid.
- [Admin Console Demo](../examples/console-demo): cards in a dashboard.

</div>
  </div>
</section>
