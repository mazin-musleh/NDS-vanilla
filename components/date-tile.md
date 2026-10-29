---
layout: page
title: Date Tile
hero_title: Date Tile - National Design System
hero_description: A date tile shows one date in a small box, with the weekday, the day number and the month
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "25/10/2026 - 03:10 PM"
---

<section id="date-tile-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A date tile is a `<time>` element with the `nds-date-tile` class and the date in `datetime`. The script writes three `<span>` parts into an empty tile: the weekday, the day number and the month, in the page's language and calendar. To write the parts and their text yourself, put them in the tile: the script then leaves it as written. All of them are inline elements, so the tile can sit inside a link or a button. The tile always sits beside the text of something else: a drawer row, a card header, or a timeline event. Each of them lays out the tile and its text, so the tile needs no wrapper of its own.

Pick another component when:

- the user picks a date: [Date Picker](../components/date-picker)
- the page counts down to a date: [Countdown](../components/countdown)
- the date is one value among other details of a record: [Definition List](../components/definition-list)

</div>
  </div>
</section>

<section id="date-tile-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="date-tile-single" data-canon data-variants="date-tile-variants-table">
<time class="nds-date-tile" datetime="2026-12-13"></time>
</script>
<script type="text/html" id="date-tile-drawer" data-canon>
<div class="nds-drawer nds-divided">
  <ul class="nds-drawer-list" aria-label="Final exams">
    <li>
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <time class="nds-date-tile" datetime="2026-12-13"></time>
        <span class="nds-drawer-item">
          <span class="nds-drawer-item-head">
            <span class="nds-tag" data-status="warning">
              <span class="nds-label">First</span>
            </span>
            <span class="nds-label">ACCT 301 · Managerial Accounting</span>
          </span>
          <span class="nds-description">9:00 – 11:00 AM, Exam Hall A-12</span>
        </span>
      </a>
    </li>
    <li>
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <time class="nds-date-tile" datetime="2026-12-14"></time>
        <span class="nds-drawer-item">
          <span class="nds-drawer-item-head">
            <span class="nds-label">FIN 320 · Corporate Finance</span>
          </span>
          <span class="nds-description">1:00 – 3:00 PM, Exam Hall B-04</span>
        </span>
      </a>
    </li>
  </ul>
</div>
</script>
<script type="text/html" id="date-tile-card" data-canon>
<div class="nds-card nds-stroke">
  <div class="nds-card-header">
    <time class="nds-date-tile" datetime="2026-12-13"></time>
    <div class="nds-card-text">
      <span class="nds-card-title">ACCT 301 · Managerial Accounting</span>
      <p class="nds-card-description">9:00 – 11:00 AM, Exam Hall A-12</p>
    </div>
  </div>
  <div class="nds-card-content">
    <div class="nds-card-text">
      <p class="nds-card-description">Bring your student ID. Phones stay outside the hall.</p>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="date-tile-timeline" data-canon>
<div class="nds-stepper nds-vertical nds-dot" data-current="2">
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content nds-row nds-middle">
      <time class="nds-date-tile" datetime="2026-12-13"></time>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">ACCT 301 · Managerial Accounting</span>
        <span class="nds-stepper-description">9:00 – 11:00 AM, Exam Hall A-12</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content nds-row nds-middle">
      <time class="nds-date-tile" datetime="2026-12-14"></time>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">FIN 320 · Corporate Finance</span>
        <span class="nds-stepper-description">1:00 – 3:00 PM, Exam Hall B-04</span>
      </div>
    </div>
  </div>
  <div class="nds-stepper-step">
    <div class="nds-stepper-base">
      <div class="nds-stepper-circle"></div>
    </div>
    <div class="nds-stepper-content nds-row nds-middle">
      <time class="nds-date-tile" datetime="2026-12-16"></time>
      <div class="nds-stepper-text">
        <span class="nds-stepper-title">MKT 210 · Principles of Marketing</span>
        <span class="nds-stepper-description">9:00 – 11:00 AM, Exam Hall A-12</span>
      </div>
    </div>
  </div>
</div>
</script>
<script type="text/html" id="date-tile-range" data-canon>
<time class="nds-date-tile" datetime="2026-12-13" data-date-end="2026-12-17"></time>
</script>
<script type="text/html" id="date-tile-manual" data-canon>
<time class="nds-date-tile" datetime="2026-12-13">
  <span class="nds-date-tile-weekday">Sun</span>
  <span class="nds-date-tile-day">13</span>
  <span class="nds-date-tile-month">Dec</span>
</time>
</script>
    </div>
  </div>
</section>

<section id="date-tile-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The Drawer row, Card header and Timeline structures show the tile beside the text of each host. In a drawer row and a card header, the tile takes the place of a featured icon. Size and Status go on the `.nds-date-tile` element. In a drawer row, `data-status` can go on the `li` instead. It then colors the tile and any featured icon in that row. Loading goes on the host, not the tile: a drawer, a card or a timeline turns its tiles into skeleton blocks.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Tile (default) | — | — | One date on its own |
| Structure | Drawer row | canon `#date-tile-drawer` | — | A list of dated items, such as exams, deadlines or events. Each row is one link that holds the tile and the title |
| Structure | Card header | canon `#date-tile-card` | — | One dated item in a [Card](../components/card), such as an exam or an event. The tile and `nds-card-text` share the header, and the header centers the text on the tile |
| Structure | Timeline | canon `#date-tile-timeline` | — | Dated events in order, such as an exam schedule. `nds-row nds-middle` on each step's content puts the tile beside the text. The tile follows the step state. See [Timeline](../components/timeline) |
| Structure | Range | canon `#date-tile-range` | — | A span of days, such as an exam period. `data-date-end` holds the last day. The tile is wider and has no weekday. Across two months it names both, such as Dec–Jan |
| Structure | Manual | canon `#date-tile-manual` | — | The parts and their text written by hand. The script leaves the tile as written, so the text does not follow the page's language or calendar. Use it for text of your own, such as a short Hijri month name: the script writes the full one. Keep `datetime`: it still holds the date |
| Size | SM | `.nds-sm` | `.nds-date-tile` | Smaller text, 48px wide, for a dense list |
| Size | MD (default) | — | — | 56px wide, for a list row |
| Size | LG | `.nds-lg` | `.nds-date-tile` | Larger text, 72px wide, for a card header |
| Status | None (default) | — | — | The primary color |
| Status | Success | `[data-status="success"]` | `.nds-date-tile` | A date that is done or confirmed |
| Status | Info | `[data-status="info"]` | `.nds-date-tile` | A date that changed, such as a new exam date |
| Status | Warning | `[data-status="warning"]` | `.nds-date-tile` | A date that is close, such as a deadline this week |
| Status | Error | `[data-status="error"]` | `.nds-date-tile` | A date that was missed or cancelled |
| Status | Neutral | `[data-status="neutral"]` | `.nds-date-tile` | A date in the past |
| Weekday | No weekday | `.nds-no-weekday` | `.nds-date-tile:not([data-date-end])` | Only the day number and the month, for a list where the weekday adds nothing, such as dates months apart. On a tile you write yourself, leaving out the weekday part does the same |
| Loading | Loading (hint: Skeleton placeholders while the data loads) | `.nds-loading` | `.nds-drawer` | The tiles and the text of the rows show as skeleton blocks while the data loads. Remove the class when the data is in |
| Loading | Loading (hint: Skeleton placeholders while the data loads) | `.nds-loading` | `.nds-card` | The tile and the other parts of the card show as skeleton blocks while the data loads. Remove the class when the data is in |
| Loading | Loading (hint: Skeleton placeholders while the data loads) | `.nds-loading` | `.nds-stepper` | Every step shows as a skeleton while its data loads, and the tile goes with it. Remove the class when the data is in |
{: #date-tile-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="date-tile-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <ul class="nds-feature-list nds-grid nds-divided-rows nds-icons-subtle">
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-code" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Inline Markup</span>
              <p class="nds-card-description">The tile is a <code class="nds-inline-code lang-html">&lt;time&gt;</code> of <code class="nds-inline-code lang-html">&lt;span&gt;</code> parts, so it is valid inside a link or a button.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-calendar-check-in-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Machine-Readable Date</span>
              <p class="nds-card-description">The <code class="nds-inline-code lang-html">datetime</code> attribute holds the full date, so scripts and search engines read the date that the short text shows.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-translate" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Text from the Date</span>
              <p class="nds-card-description">An empty tile gets its text from <code class="nds-inline-code lang-html">datetime</code>, before the page shows: in the page's language, and in Hijri inside a <code class="nds-inline-code lang-html">data-calendar="hijri"</code>.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-left-to-right-list-bullet" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Aligned Lists</span>
              <p class="nds-card-description">Every tile of one size has the same fixed width, so the titles in a list of rows line up. A weekday or a month too long for the width ends in an ellipsis.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-paint-board" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Status from a Parent</span>
              <p class="nds-card-description">A <code class="nds-inline-code lang-html">data-status</code> on the tile or on a parent, such as a drawer row, colors the tile, the same way it colors a featured icon. In a timeline, the step state colors it: a solid fill for the current event, gray for the events to come.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="date-tile-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Use the tile for a date the user plans around, such as an exam or a deadline. Write a date in plain text when it only records when something happened.
- Write the full date in `datetime`, in the `YYYY-MM-DD` form.
- When you write the text yourself, use short names for the weekday and the month, such as "Sun" and "Dec". The tile is narrow.
- Write the time and the place in the text beside the tile, not in the tile.
- Put the tile in a drawer row, a card header or a timeline step. On its own, put it and its text in an element with `nds-flex nds-middle`.
- In a timeline, leave `data-status` off the tile. A status on the tile wins over the step state.
- Leave the size class off a tile in a drawer row. Below 400px of row width the drawer steps it down to SM. A size class, `nds-md` included, keeps the size you wrote.
- Put the tile and the item's title in one link or button. A screen reader then reads the date and the title together.
- In a list, give every row a tile, or give none. A list with tiles on some rows does not line up.
- Set a wider `--date-tile-width` when the text does not fit, such as a long Hijri month like جمادى الآخرة. Set it on the list, so every tile in the list keeps the same width.
- Write a range that crosses two Hijri months in the row's text too. Hijri month names are long, and the tile cuts them short.

</div>
  </div>
</section>

<section id="date-tile-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-date-tile` | `<time>` | The box: a column of its parts, centered. The script writes the parts into an empty tile |
| `nds-date-tile-weekday` | `<span>` in the tile | The weekday, in small text. Optional when you write the parts. A range has none |
| `nds-date-tile-day` | `<span>` in the tile | The day number, in large bold text |
| `nds-date-tile-month` | `<span>` in the tile | The month, in small text |
| `nds-md` | `.nds-date-tile` | The same as no size class: 56px wide. In a drawer row it keeps that size below 400px |
| `nds-no-weekday` | `.nds-date-tile` | Hides the weekday part |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `datetime` | `.nds-date-tile` | The full date, such as `2026-12-13`. For a range, the first day. The script writes an empty tile's parts from it. Write it in Gregorian, on a Hijri page too |
| `data-date-end` | `.nds-date-tile` | The last day of a range, such as `2026-12-17`. The day part shows both days, and the month part both months when they differ. The tile is wider: 80px, 64px with `nds-sm`, 96px with `nds-lg`. A day that is not after `datetime` shows one day, with a warning in the console |
| `data-calendar` | `.nds-date-tile` or any parent | `hijri` writes an empty tile in Hijri. The nearest one wins. See [Date](../core/date) |
| `data-status` | `.nds-date-tile` or any parent | `success`, `info`, `warning`, `error` or `neutral` gives the matching color. `critical` gives the error color |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the tile, or on a parent to reach every tile inside it. A `data-status` closer to the tile than the property wins over the two colors.

| Property | Default | Controls |
|---|---|---|
| `--date-tile-width` | `56px`, `48px` with `nds-sm`, `72px` with `nds-lg`. A range: `80px`, `64px`, `96px` | The tile's width. It wins over the size's width |
| `--date-tile-bg` | `var(--background-primary-light)` | Fill |
| `--date-tile-color` | `var(--text-primary-strong)` | Text color |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="date-tile-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Student Portal](../examples/student-portal): date tiles on the final exams and the academic calendar lists.
- [Calendar](../components/calendar): a tile on each event, written in the calendar's calendar and language.
- [Drawer](../components/drawer) and [Meta](../components/meta): the row that holds the tile, and the line of details under the title.
- [Cards](../components/card): the card header that holds the tile beside the title.
- [Timeline](../components/timeline): the Agenda structure, with a tile on each event.
- [Featured Icons](../components/featured-icon): the icon that a drawer row holds in the same place, with the same statuses.

</div>
  </div>
</section>
