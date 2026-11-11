---
layout: page
title: Cards
hero_title: Cards - National Design System
hero_description: A card groups one unit of content, such as a service, a product, an article, or a metric, into a single box
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.0.0"
updated: "2.0.0"
last_edit: "05/11/2026 - 09:39 PM"
---

<section id="card-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A card holds one unit in a set, such as a service tile, a product, an article preview or a dashboard number. The optional header holds an icon, an image or an avatar. In a panel card, it holds the title too. The content holds a title and text, and optional actions go after it. The whole card can be one link. To let the text expand in place, see [Expandable Content](../utilities/expandable).

Pick the options by what the card holds. The header can be an icon, an image or an avatar, or the card can have no header. The content can add tags, a rating, a price, or a status tag in the corner. The layout can be Row. The builder and the Variants table in this page's source list every option.

Pick another component when:

- the message is a short status: [Alert](../components/alert)
- the user must make a decision: [Modal](../components/modal)
- a number needs a trend line: [Metric](../components/metric)

</div>
  </div>
</section>

<section id="card-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="card-standard" data-canon data-variants="card-variants-table" data-demo-width="360px">
<div class="nds-card nds-stroke">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle">
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
    <div class="nds-card-image" style="--image-pos-x:50%; --image-pos-y:10%;">
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
    <div class="nds-avatar">
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
<a href="#" class="nds-card nds-stroke nds-center">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle nds-dark">
        <i class="hgi hgi-stroke hgi-library" aria-hidden="true"></i>
      </span>
    </div>
  </div>
  <div class="nds-card-content">
    <span class="nds-card-title">Learning platform</span>
  </div>
</a>
</script>
<script type="text/html" id="card-statistic" data-canon>
<div class="nds-card nds-stroke nds-center">
  <div class="nds-card-header">
    <div class="nds-card-featured-icon">
      <span class="nds-featured-icon nds-circle">
        <i class="nds-icon nds-icon-avatar" aria-hidden="true"></i>
      </span>
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-number" data-counter="125847">0</span>
      <p class="nds-card-description">Active Users</p>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="card-progress" data-canon>
<div class="nds-card nds-stroke">
  <div class="nds-card-header">
    <div class="nds-progress-circle" data-num="2" data-max="5" role="progressbar" aria-labelledby="card-progress-title">
      <svg width="120" height="120" viewBox="0 0 24 24">
        <circle class="nds-progress-bg" cx="12" cy="12" r="10" fill="none" stroke-width="2" />
        <circle class="nds-progress-track" cx="12" cy="12" r="10" fill="none" stroke-width="2"
          stroke-dasharray="62.83" stroke-dashoffset="62.83" stroke-linecap="round" />
      </svg>
      <div class="nds-progress-info">
        <span class="nds-progress-steps"></span>
      </div>
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title" id="card-progress-title">Journey in progress</span>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="card-header-title" data-canon>
<div class="nds-card nds-stroke">
  <div class="nds-card-header">
    <div class="nds-card-text">
      <span class="nds-card-title">My requests</span>
      <p class="nds-card-description">Three requests, one needs your action.</p>
    </div>
  </div>
  <div class="nds-card-content">
    <nav class="nds-drawer nds-divided" aria-label="My requests">
      <ul class="nds-drawer-list">
        <li>
          <a href="#" class="nds-btn nds-subtle">
            <span class="nds-featured-icon">
              <i class="hgi hgi-stroke hgi-file-validation" aria-hidden="true"></i>
            </span>
            <span class="nds-label">Enrollment certificate</span>
          </a>
        </li>
        <li>
          <a href="#" class="nds-btn nds-subtle">
            <span class="nds-featured-icon">
              <i class="hgi hgi-stroke hgi-task-edit-01" aria-hidden="true"></i>
            </span>
            <span class="nds-label">Course withdrawal</span>
          </a>
        </li>
        <li>
          <a href="#" class="nds-btn nds-subtle">
            <span class="nds-featured-icon">
              <i class="hgi hgi-stroke hgi-mail-account-01" aria-hidden="true"></i>
            </span>
            <span class="nds-label">Change of email</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</div>
</script>
<script type="text/html" id="card-tags" data-canon>
<div class="nds-card-tags">
  <span class="nds-tag nds-blue">
    <span class="nds-label">Category</span>
  </span>
  <span class="nds-tag nds-gray">
    <span class="nds-label">Topic</span>
  </span>
</div>
</script>
<script type="text/html" id="card-rating" data-canon>
<div class="nds-card-rating">
  <div class="nds-rating" data-rating="4.5">
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
    <span class="nds-tag nds-blue">
      <span class="nds-label">Category</span>
    </span>
    <span class="nds-tag nds-gray">
      <span class="nds-label">Topic</span>
    </span>
  </div>
  <div class="nds-card-rating">
    <div class="nds-rating" data-rating="4.5">
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
<script type="text/html" id="card-corner" data-canon>
<div class="nds-card-corner">
  <a href="#" class="nds-btn nds-subtle">
    <span class="nds-label">View all</span>
    <i class="nds-icon nds-hgi-arrow-next-01" aria-hidden="true"></i>
  </a>
</div>
</script>
<script type="text/html" id="card-corner-status" data-canon>
<div class="nds-card-corner">
  <span class="nds-tag" data-status="success">
    <span class="nds-label">Active</span>
  </span>
</div>
</script>
<script type="text/html" id="card-corner-checkbox" data-canon>
<div class="nds-card-corner">
  <div class="nds-form-container nds-checkbox">
    <div class="nds-form-control">
      <input type="checkbox" name="cardSelect" value="card-1" class="nds-checkbox-input" aria-label="Select card">
    </div>
  </div>
</div>
</script>
<script type="text/html" id="card-actions" data-canon>
<div class="nds-card-actions">
  <a href="#" class="nds-btn nds-primary">
    <span class="nds-label">Get Started</span>
  </a>
  <a href="#" class="nds-btn nds-secondary-outline nds-trail-icon">
    <i class="nds-icon nds-hgi-link-square-02" aria-hidden="true"></i>
    <span class="nds-label">Learn More</span>
  </a>
</div>
</script>
<script type="text/html" id="card-status" data-canon>
<div class="nds-card nds-stroke nds-center" data-status="success">
  <div class="nds-card-header">
    <span class="nds-feedback nds-ring">
      <span class="nds-feedback-icon">
        <i class="nds-icon" aria-hidden="true"></i>
      </span>
    </span>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title">Request submitted</span>
      <p class="nds-card-description">Your request reached the service. You get a message when the review is done.</p>
    </div>
  </div>
  <div class="nds-card-actions">
    <a href="#" class="nds-btn nds-primary">
      <span class="nds-label">View the request</span>
    </a>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="card-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Icon header (default) | — | — | A featured icon above the text |
| Structure | Image header (id: image) | canon `#card-image` | — | A photo above the text. Set the focal point with `--image-pos-x` and `--image-pos-y` |
| Structure | Avatar header | canon `#card-avatar` | — | A person or an account |
| Structure | No header | canon `#card-no-header` | — | Text only |
| Structure | Link card (hint: A navigation tile: the whole card is one link) (id: link) | canon `#card-link` | — | A navigation tile: the whole card is one `<a>` (or `<button>`) that opens one page, with an icon, a title and at most one line. A card that carries an action, a price or tags keeps action buttons instead. Hover and press feedback come from the element. Do not put links or buttons inside it |
| Structure | Statistic (hint: One headline number) (id: statistic) | canon `#card-statistic` | — | One headline number with a label, in a centered card. The number is `.nds-card-number`, which works in any card. With `data-counter`, it counts up from 0 when it scrolls into view. See [Numbers](../utilities/numbers#counter-animation) |
| Structure | Progress (hint: A progress ring beside a short title. Turns on Row, Reverse and Middle) (id: progress) (demo: + row) (demo: + reverse) (demo: + middle) | canon `#card-progress` | — | A [progress ring](../components/progress) beside a short title, as on a life journey page. Write Row, Reverse and Middle too: the ring closes the row, and the title sits level with its middle |
| Structure | Status (hint: The outcome of an action, in a page with other content) (id: status) | canon `#card-status` | — | The outcome of an action, centered, with a large icon and the way forward, such as a booking that went through above its details. A page that shows only the outcome is a [Status Section](../layout/status-section). Set `data-status` on the card: the [feedback](../components/feedback) chip takes its icon and color from it, as in a status section |
| Structure | Header title (hint: The title in the header, over a list) (id: header-title) (demo: + text-md) (demo: + breakout) | canon `#card-header-title` | — | A panel card: the title sits in the header, beside an icon when the content has none of its own, and the content holds a list, a table or a chart. Wrap the title in `.nds-card-text`, as in the content. A one-line title centers on the icon. A taller text starts level with the icon's top |
| Layout (any) | Row (limit: 1 layout) (hint: Header beside the content, instead of above it) (id: row) (not: header-title) | `.nds-horizontal` | `.nds-card` | Header beside content. The header goes on top when it no longer fits beside 13rem of text: an image then fills the width. A card narrower than 324px always stacks. The actions end the row when they fit beside the text, and go under it in a card narrower than 480px. `nds-wrap` on the actions puts them under it at every width |
| Layout (any) | Center (limit: 1 layout) (not: statistic, header-title, link, status) | `.nds-center` | `.nds-card` | Centers every part. Put it on the card root only: the featured icon reads it there, so on an inner part it centers nothing. It does not move the card: its container places it |
| Layout (any) | Reverse (hint: Header at the end side. Row only) (id: reverse) | `.nds-reverse` | `.nds-card.nds-horizontal` | Puts the header at the end side of the row, after the content. For a figure that closes the row, such as a progress ring. Row only |
| Layout (any) | Middle (hint: Short content in the middle, top to bottom) (id: middle) | `.nds-middle` | `.nds-card` | Puts short content in the middle of the card's height, instead of at the top. For a row card whose header is taller than its text, or a card stretched to its row in a grid. The text keeps its side: to center it across too, add Center |
| Meta | None (default) | — | — | No tags or rating |
| Meta | Tags | canon `#card-tags` | `.nds-card-content:not(a.nds-card > *)` | Tags alone go straight in the content. They are standard tags that describe the item, such as its category; a status tag goes in the corner |
| Meta | Rating | canon `#card-rating` | `.nds-card-content:not(a.nds-card > *)` | A star rating with a count |
| Meta | Tags + Rating | canon `#card-meta` | `.nds-card-content:not(a.nds-card > *)` | Both together: `.nds-card-meta` groups the two meta rows. Use it only when both are present |
| Value | None (default) | — | — | No price line |
| Value | Price | canon `#card-value-price` | `.nds-card-text:not(.nds-card-header > *):not(a.nds-card *)` (after) | A price. `data-currency` shows the currency icon. See [Numbers](../utilities/numbers) |
| Value | Sale price | canon `#card-value-sale` | `.nds-card-text:not(.nds-card-header > *):not(a.nds-card *)` (after) | A price with the original crossed out in `<s>` |
| Value | Unit price | canon `#card-value-unit` | `.nds-card-text:not(.nds-card-header > *):not(a.nds-card *)` (after) | A price with a plain-text unit after it |
| Corner | None (default) | — | — | Nothing in the top end corner |
| Corner | Action (hint: A small button in the top end corner) (not: image) | canon `#card-corner` | `.nds-card-text:not(a.nds-card *)` (start) | A small button, such as View all, in `.nds-card-corner`. The corner makes the button SM, and MD in an `nds-lg` card. Write the corner first in the card text. Below a header, it shows in the card's top end corner. In a row card, a Header title card or a card with no header, it floats at the end of the title's first line, and the title wraps around it. Not on a link card, which holds no links or buttons |
| Corner | Status (hint: A status tag in the top end corner) | canon `#card-corner-status` | `.nds-card-text:not(a.nds-card *)` (start) | A status tag in `.nds-card-corner`, placed the same way as Action. The corner makes the tag XS, and SM in an `nds-lg` card. `data-status` sets its color |
| Corner | Status (hint: A status tag in the top end corner) | `.nds-dark` | `.nds-card-header:has(.nds-card-image) ~ * .nds-card-corner .nds-tag` | Over an image, give the tag `.nds-dark`: its solid background keeps it readable |
| Corner | Checkbox (hint: A select checkbox in the top end corner) (not: statistic, progress) | canon `#card-corner-checkbox` | `.nds-card-text:not(a.nds-card *)` (start) | A select checkbox in `.nds-card-corner`. Placed the same way as Action. With a status tag, put both in one `.nds-card-corner`, the checkbox last, so it sits in the corner |
| Actions | None (default) | — | — | No actions |
| Actions | Start (hint: Aligned to the start of the row) | canon `#card-actions` | `div.nds-card` | Buttons after the content, never inside it. A button that does not fit moves to the next line. Not on a link card, which holds no links or buttons |
| Actions | End (hint: Aligned to the end of the row) | canon `#card-actions` | `div.nds-card` | The same, aligned to the end of the row |
| Actions | End (hint: Aligned to the end of the row) | `.nds-end` | `.nds-card-actions` | The same, aligned to the end of the row |
| Actions | Full (hint: The buttons share the width) | canon `#card-actions` | `div.nds-card` | The same, with the buttons sharing the width. A button that moves to the next line fills it |
| Actions | Full (hint: The buttons share the width) | `.nds-full` | `.nds-card-actions .nds-btn` | The same, with the buttons sharing the width. A button that moves to the next line fills it |
| Actions | Stacked (hint: One above the other, full width) | canon `#card-actions` | `div.nds-card` | The same, with the buttons one above the other, each filling the width |
| Actions | Stacked (hint: One above the other, full width) | `.nds-col` | `.nds-card-actions` | The same, with the buttons one above the other, each filling the width |
| Actions | Stacked on phones (hint: Stacked below 600px, a row above) | canon `#card-actions` | `div.nds-card` | The same as Start on a large screen. Below 600px the buttons stack, each filling the width. A modal's actions use it |
| Actions | Stacked on phones (hint: Stacked below 600px, a row above) | `.nds-col-sm` | `.nds-card-actions` | The same as Start on a large screen. Below 600px the buttons stack, each filling the width. A modal's actions use it |
| Actions line | Own line (hint: Under the text at every width. Row only) | `.nds-wrap` | `.nds-card.nds-horizontal > .nds-card-actions` | In a row card, the actions go under the text at every width, not beside it. Row only |
| Actions order | Main last (hint: The first button shows last. Not stacked) | `.nds-reverse` | `.nds-card-actions:not(.nds-col)` | Write the main action first, and it shows last in the row, as in a dialog's Back and Next. The row stays at its side, with or without End. With Stacked on phones, the stacked buttons keep the markup order, so the main action stays on top |
| Box (any) | Stroke (default) | `.nds-stroke` | `.nds-card:not(.nds-flat)` | A 1px border. For flat and content-heavy layouts. Leave out both stroke and shadow for a plain card. Not with Flat |
| Box (any) | Shadow | `.nds-shadow` | `.nds-card:not(.nds-flat)` | An elevation shadow. For floating or modal-adjacent cards. It combines with the stroke. Not with Flat |
| Box (any) | Flat (hint: No fill and no padding) | `.nds-flat` | `.nds-card:not(.nds-stroke, .nds-shadow)` | No fill and no padding, and a muted description: the card reads as text on its section. Not with Stroke or Shadow |
| Color | None (default) | — | — | The default colors |
| Color | Neutral | `.nds-neutral` | `.nds-card` | Also `.nds-gray` |
| Color | Green | `.nds-green` | `.nds-card` | Tints the title, the icon and the hover border |
| Color | Yellow | `.nds-yellow` | `.nds-card` | Tints the title, the icon and the hover border |
| Color | Red | `.nds-red` | `.nds-card` | Tints the title, the icon and the hover border |
| Color | Blue | `.nds-blue` | `.nds-card` | Tints the title, the icon and the hover border |
| Color | On color (hint: For a dark or photo background) | `.nds-oncolor` | `.nds-card` | For cards on a dark or photo background. It replaces the color classes, which do nothing on an on-color card |
| Color | On color (hint: For a dark or photo background) | `.nds-oncolor` | `.nds-card-actions .nds-btn` | Buttons do not follow the card. Give each action button `.nds-oncolor` too |
| Color | On color (hint: For a dark or photo background) | `.nds-oncolor` | `.nds-tag:not([data-status])` | Tags do not follow the card either. Give each standard tag `.nds-oncolor`. A status tag keeps its colors |
| Tinted | Tinted (hint: A light tint of the card color) | `.nds-color` | `.nds-card:not(.nds-oncolor)` | Fills the card with a light tint of its color. With no color class, the tint is the brand primary |
| Size (any) | SM (limit: 1 size) (hint: Every part one size smaller) | `.nds-sm` | `.nds-card` | Every part one size smaller: the icon, avatar, date tile, tags, rating, buttons, chips, price, number, text and gap. A part with its own size class keeps it. For a card in a side column or a dense grid |
| Size (any) | MD (default) (limit: 1 size) | `.nds-md` | `.nds-card` | The card's own sizes, with no class: a 48px icon, a 64px avatar, an 80px progress ring, 24px tags and stars, an 18px title, and a 24px gap (16px on phones). In a sized [List](../components/list), `.nds-md` on one card brings it back to these sizes |
| Size (any) | LG (limit: 1 size) (hint: Every part one size larger) | `.nds-lg` | `.nds-card` | Every part one size larger, for a card that leads a page. Buttons keep their size. A part with its own size class keeps it |
| Number size | Auto (default) (hint: Follows the card size) | — | — | The display size, one size smaller or larger with the card's size |
| Number size | LG | `.nds-lg` | `.nds-card-number` | The display size, at any card size |
| Number size | MD | `.nds-md` | `.nds-card-number` | A smaller headline number |
| Number size | SM | `.nds-sm` | `.nds-card-number` | The smallest headline number |
| Text size | Auto (default) (hint: Follows the card size) | — | — | An 18px title, with a 16px subtitle and description, one size smaller or larger with the card's size |
| Text size | LG (id: text-lg) | `.nds-lg` | `.nds-card-text` | An 18px title, with a 16px subtitle and description, at any card size |
| Text size | MD (id: text-md) | `.nds-md` | `.nds-card-text` | A 16px title, with a 14px subtitle and description. The text only: the icon and the content keep their size. For a header title. For a whole smaller card, use Size SM |
| Text size | SM | `.nds-sm` | `.nds-card-text` | A 14px title, with a 12px subtitle and description. The text only: the icon and the content keep their size |
| Breakout | Breakout (hint: The part runs to the card's edges) (id: breakout) | `.nds-breakout` | `.nds-drawer` | Runs the part to the card's sides. It also meets the top or bottom edge when it is the first or last thing in the card or in its content. A drawer moves the card padding into its rows, so the hover and the dividers meet the border. A definition list does the same for its items, at the sides only |
| Disabled | Disabled | `.nds-disabled` | `.nds-card` | Mutes the card and blocks clicks. `[disabled]` works on a `<button>` card |
| Disabled | Disabled | `[inert]` | `.nds-card` | Write both: `inert` takes the card out of the keyboard order, so Tab skips its links and buttons |
| Loading | Loading (hint: Skeleton placeholders) | `.nds-loading` | `.nds-card` | Skeleton placeholders while the content loads |
{: #card-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="card-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-list nds-grid nds-flat nds-divided nds-horizontal">
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-puzzle" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">CSS Only</span>
              <p class="nds-card-description">A card needs no script and no init call. Every look comes from classes.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-cursor-02" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Interactive States</span>
              <p class="nds-card-description">An <code class="nds-inline-code lang-html">&lt;a&gt;</code> or <code class="nds-inline-code lang-html">&lt;button&gt;</code> card changes its background on hover. A stroke card also changes its border, and a shadow card deepens its shadow.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-image-02" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Image Control</span>
              <p class="nds-card-description">The image keeps a 2:1 ratio by default. The ratio, the focal point and a dark overlay are set with custom properties on the image.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-loading-03" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Loading Skeleton</span>
              <p class="nds-card-description">A card shows skeleton placeholders until the page reveals. Add <code class="nds-inline-code lang-html">nds-loading</code> to show them while your own data loads.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-filter" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Filter Ready</span>
              <p class="nds-card-description">Filter treats each <code class="nds-inline-code lang-html">.nds-card</code> as one item by default, and searches the text in <code class="nds-inline-code lang-html">.nds-card-content</code>.</p>
            </div>
          </div>
        </li>
        <li class="nds-card">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon nds-subtle"><i class="hgi hgi-stroke hgi-customize" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Nested Cards</span>
              <p class="nds-card-description">A card resets its color, spacing and width properties, so a value set on an outer card does not reach a card inside it.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="card-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Make a whole card clickable only for a navigation tile: `<a>` or `<button>` as the card root, with an icon, a title and at most one line. A card that carries an action, a price or tags keeps action buttons. Do not wrap a card in a separate link, and do not put links or buttons inside a clickable card.
- For a list of page links, use a [Drawer](../components/drawer), not cards: its arrows show that each row is a link.
- Use a stroke card in flat, content-heavy layouts, and a shadow card where the card floats over other content.
- Put `nds-center` on the card root only. On an inner part, it centers nothing.
- Add `nds-middle` when a row card's header is taller than its text, such as a progress ring beside one title. Without it, the text sits at the top.
- `nds-center` centers the card's content, not the card. To center the card itself, center it with its container: `nds-center` on an `nds-grid`, or on an `nds-flex` wrapper for a single card.
- A card fills its container. To stop it at a width, set `--card-width-max`. Do not use `nds-full-width` on a card: inside a section, it breaks out to the full screen width.
- Put `.nds-card-actions` after `.nds-card-content`, not inside it. In a [modal](../components/modal), only the content scrolls. Actions inside the content still work there, because the modal pins them to the bottom.
- To make a whole card smaller or larger, put `nds-sm` or `nds-lg` on the card, not a size class on each part. The card changes every part together.
- On a [Modal](../components/modal), a [Definition List](../components/definition-list) or a [Stepper](../components/stepper), `nds-sm` and `nds-lg` set that component's own size, not the card's.
- Leave the size class off an icon, an avatar, a progress ring, a tag, a rating or a corner button: the card's size sets it. Write a size class on a part only for a custom size.
- Show a price with `.nds-card-value`, not with a tag.
- In `.nds-card-value`, put the value in an element: a number in `.nds-number-format`, a word such as Free in a `<span>`. Bare text there shows as the small unit, such as `/ kg`.
- Keep the description to one or two lines. For longer text, [truncate](../utilities/truncate-text) it or link to a detail page.
- Do not put a card inside a card. Use `.nds-card-meta` or a [definition list](../components/definition-list) inside the content.
- Use `data-status` only when the card really has that status. For a color without a status, use the color class.
- Show an outcome inside a page with a status card. A [Status Section](../layout/status-section) is a whole page, with nothing else shown but the page hero.
- Put a row of cards in a [grid](../layout/grid).
- For a set of cards, use a [List](../components/list): each card is a list item, and the list sets the look they share. A set of link cards stays a [Grid](../layout/grid).
- To show a card's content with no box, add `nds-flush`. It drops the padding, the border, the fill and the shadow.
- Put a card's small extras in `.nds-card-corner`, first in `.nds-card-text`: a status tag, a menu or "View all" button, or a select checkbox. A bare button in the header shrinks when the title is long, and its label spills out.
- Keep `.nds-card-tags` for standard tags that describe the item. A state, such as stock or a request's status, is a status tag in `.nds-card-corner`, never in the tag row.
- Keep the corner to one or two small items: a tag, a subtle or icon-only button, or a checkbox. The corner makes a tag XS and a button SM, one step bigger in an `nds-lg` card, and a size class on the part still wins. A wide corner meets the header icon on a narrow card.
- Write the tag first and the checkbox last, so the checkbox sits in the corner.
- A card the user selects holds no buttons in its corner. Picking it and opening it are two different actions.
- Over an image, give the status tag `.nds-dark`.
- Use the Header title structure for a panel card that holds a list, a table or a chart. For a card in a set of tiles, keep the title in the content.
- Leave out the header icon when the content shows icons of its own, such as Drawer rows with icons or Date Tiles. A header icon beside them reads as one more row. Keep the title alone in the header.
- Add `nds-breakout` only to a drawer or a definition list. Another part breaks out too, but its content then touches the card border.
- Give a disabled card `inert` too. Without it, the card only fades its links and buttons, and the keyboard can still reach them.

</div>
  </div>
</section>

<section id="card-api" class="nds-content-section nds-doc-api">
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
| `data-status` | any parent of `.nds-card` | Colors the card's featured icons, as on the card itself |
| `data-state~="loading"` | `.nds-card`, or a parent `.nds-grid`, `.nds-paged-content` or `.nds-swiper` | Skeleton placeholders on the card, or on every card inside the parent. The same as the `nds-loading` class |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on `.nds-card`, or on a parent to set every card inside it. The image properties go on `.nds-card-image`. A card inside a card does not take the outer card's values or size. A property wins over the size classes.

| Property | Default | Controls |
|---|---|---|
| `--card-bg` | `var(--background-card)` | Background |
| `--card-bg-hover` | `var(--background-card-hovered)` | Background of a hovered link or button card |
| `--card-bg-active` | the hover fill, a step deeper | Background of a pressed link or button card |
| `--card-border-color` | `var(--border-neutral-primary)` | Border color of a stroke card |
| `--card-border-color-hover` | `var(--border-primary)` | Border color on hover |
| `--card-border-color-active` | `var(--border-neutral-primary)` | Border color on press |
| `--card-padding` | `var(--spacing-xl)` | Padding on both axes. Write `0px`, not `0`: the corner and a breakout part do math with it, and a bare `0` breaks that |
| `--card-padding-block` | `var(--card-padding)` | Top and bottom padding |
| `--card-padding-inline` | `var(--card-padding)` | Start and end padding. Card-style tab panels read it too |
| `--card-gap` | `var(--spacing-3xl)`, `var(--spacing-xl)` on phones | Gap between header, content and actions, and between the rows in `.nds-card-meta`. Size SM and LG change it |
| `--card-radius` | `var(--radius-lg)` | Corner radius |
| `--card-width` | `100%` | Width |
| `--card-width-min` | `0` | Minimum width |
| `--card-width-max` | `var(--card-width)`, else none | Maximum width |
| `--card-title-color` | `var(--text-display)` | Title color |
| `--card-subtitle-color` | `var(--text-secondary)` | Subtitle color |
| `--card-text-color` | `var(--text-primary-paragraph)` | Description color |
| `--card-number-color` | `var(--text-primary-strong)` | Color of the headline number, `.nds-card-number` |
| `--card-rating-color` | `var(--text-secondary-paragraph)` | Rating count color |
| `--card-title-FS`, `--card-title-LH` | `var(--typo-text-lg-FS)`, `var(--typo-text-lg-LH)` | Title font size and line height. Size and Text size change it |
| `--card-subtitle-FS`, `--card-subtitle-LH` | `var(--typo-text-md-FS)`, `var(--typo-text-md-LH)` | Subtitle font size and line height. Size and Text size change it |
| `--card-description-FS`, `--card-description-LH` | `var(--typo-text-md-FS)`, `var(--typo-text-md-LH)` | Description font size and line height. Size and Text size change it |
| `--featuredicon-size` | `48px` | Featured icon size. Size SM and LG change it |
| `--featuredicon-color` | `var(--featuredicons-icon-primary)` | Featured icon and avatar color. Color classes change it |
| `--featuredicon-bg` | `var(--featuredicons-background-primary-light)` | Featured icon background |
| `--card-image-width` | `160px` | Image width in a row card. A wider image stacks the card sooner. No effect on a stacked card, where the image fills the width. Size SM and LG change it |
| `--image-ratio` | `2 / 1` | Image aspect ratio. The image header shares these properties with [Image](../components/image) |
| `--image-pos-x` | `50%` | Horizontal focal point of the image |
| `--image-pos-y` | `50%` | Vertical focal point of the image |
| `--image-overlay-opacity` | `0` | How much the overlay covers the image, from 0 to 1 |
| `--image-overlay-color` | `var(--background-image-overlay)` | The overlay color |
| `--image-radius` | `var(--radius-md)` | Corner radius of the image |
{: .nds-table .nds-responsive}

### Tokens
{: .nds-block-title}

It reads these shared tokens. A change to one also changes other components: see [Tokens](../foundations/tokens).

Source: the `var()` reads in `_sass/components/_card.scss`.

{{ site.data.tokens.reads.card.html }}

### JavaScript
{: .nds-block-title}

Cards have no script, methods or events.

</div>
  </div>
</section>

<section id="card-related" class="nds-content-section nds-doc-related">
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
