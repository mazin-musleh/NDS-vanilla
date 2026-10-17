---
layout: page
title: Date Tile
hero_title: Date Tile - National Design System
hero_description: A date tile shows one date in a small box, with the weekday, the day number and the month
breadcrumb: [["Components", "/components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "17/10/2026 - 02:34 PM"
---

<section id="date-tile-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A date tile is a `<time>` element with the `nds-date-tile` class. Inside it are three `<span>` parts: the weekday, the day number and the month. All of them are inline elements, so the tile can sit inside a link or a button, such as the start of a drawer row in a list of exams or events.

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
<time class="nds-date-tile" datetime="2026-12-13">
  <span class="nds-date-tile-weekday">Sun</span>
  <span class="nds-date-tile-day">13</span>
  <span class="nds-date-tile-month">Dec</span>
</time>
</script>
<script type="text/html" id="date-tile-drawer" data-canon>
<div class="nds-drawer nds-divided">
  <ul class="nds-drawer-list" aria-label="Final exams">
    <li>
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <time class="nds-date-tile" datetime="2026-12-13">
          <span class="nds-date-tile-weekday">Sun</span>
          <span class="nds-date-tile-day">13</span>
          <span class="nds-date-tile-month">Dec</span>
        </time>
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
        <time class="nds-date-tile" datetime="2026-12-14">
          <span class="nds-date-tile-weekday">Mon</span>
          <span class="nds-date-tile-day">14</span>
          <span class="nds-date-tile-month">Dec</span>
        </time>
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
<script type="text/html" id="date-tile-range" data-canon>
<time class="nds-date-tile" datetime="2026-12-13" style="--date-tile-width: 80px;">
  <span class="nds-date-tile-day">13–17</span>
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

The Drawer row structure shows the tile at the start of a [Drawer](../components/drawer) row, in the place of a featured icon. Size and Status go on the `.nds-date-tile` element. In a drawer row, `data-status` can go on the `li` instead. It then colors the tile and any featured icon in that row.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Tile (default) | — | — | One date on its own |
| Structure | Drawer row | canon `#date-tile-drawer` | — | A list of dated items, such as exams, deadlines or events. Each row is one link that holds the tile and the title |
| Structure | Range | canon `#date-tile-range` | — | A span of days in one month, such as an exam period. Its text is wider than one day, so the tile sets `--date-tile-width: 80px`. It has no weekday |
| Size | SM | `.nds-sm` | `.nds-date-tile` | Smaller text, 48px wide, for a dense list |
| Size | MD (default) | — | — | 56px wide, for a list row |
| Size | LG | `.nds-lg` | `.nds-date-tile:not([style])` | Larger text, 72px wide, for a card header. Not on Range: an LG range needs 96px, more than the 80px of the Range structure |
| Status | None (default) | — | — | The primary color |
| Status | Success | `[data-status="success"]` | `.nds-date-tile` | A date that is done or confirmed |
| Status | Info | `[data-status="info"]` | `.nds-date-tile` | A date that changed, such as a new exam date |
| Status | Warning | `[data-status="warning"]` | `.nds-date-tile` | A date that is close, such as a deadline this week |
| Status | Error | `[data-status="error"]` | `.nds-date-tile` | A date that was missed or cancelled |
| Status | Neutral | `[data-status="neutral"]` | `.nds-date-tile` | A date in the past |
| Weekday | No weekday | `remove` | `.nds-date-tile-weekday` | Only the day number and the month, for a list where the weekday adds nothing, such as dates months apart |
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
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code"></i>
            <span class="nds-label">Inline Markup</span>
          </span>
          <p class="nds-item-desc">The tile is a <code class="nds-inline-code lang-html">&lt;time&gt;</code> of <code class="nds-inline-code lang-html">&lt;span&gt;</code> parts, so it is valid inside a link or a button.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-calendar-check-in-01"></i>
            <span class="nds-label">Machine-Readable Date</span>
          </span>
          <p class="nds-item-desc">The <code class="nds-inline-code lang-html">datetime</code> attribute holds the full date, so scripts and search engines read the date that the short text shows.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-left-to-right-list-bullet"></i>
            <span class="nds-label">Aligned Lists</span>
          </span>
          <p class="nds-item-desc">Every tile of one size has the same fixed width, so the titles in a list of rows line up. A weekday or a month too long for the width ends in an ellipsis.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-paint-board"></i>
            <span class="nds-label">Status from a Parent</span>
          </span>
          <p class="nds-item-desc">A <code class="nds-inline-code lang-html">data-status</code> on the tile or on a parent, such as a drawer row, colors the tile, the same way it colors a featured icon.</p>
        </div>
      </div>
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
- Use short names for the weekday and the month, such as "Sun" and "Dec". The tile is narrow.
- Write the time and the place in the row's text, not in the tile.
- Leave the size class off a tile in a drawer row. Below 400px of row width the drawer steps it down to SM. A size class, `nds-md` included, keeps the size you wrote.
- Put the tile and the item's title in one link or button. A screen reader then reads the date and the title together.
- In a list, give every row a tile, or give none. A list with tiles on some rows does not line up.
- Set a wider `--date-tile-width` when the text does not fit, such as a range or a long Hijri month like جمادى الآخرة. Set it on the list, so every tile in the list keeps the same width.
- Write a range that crosses two months, such as 28 Nov to 3 Dec, in the row's text. The tile has room for one month.

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
| `nds-date-tile` | `<time>` | The box: a column of the three parts, centered |
| `nds-date-tile-weekday` | `<span>` in the tile | The weekday, in small text. Optional |
| `nds-date-tile-day` | `<span>` in the tile | The day number, in large bold text |
| `nds-date-tile-month` | `<span>` in the tile | The month, in small text |
| `nds-md` | `.nds-date-tile` | The same as no size class: 56px wide. In a drawer row it keeps that size below 400px |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `datetime` | `.nds-date-tile` | The full date, such as `2026-12-13`. For a range, the first day. It is a standard attribute of `<time>`, and the tile does not read it |
| `data-status` | `.nds-date-tile` or any parent | `success`, `info`, `warning`, `error` or `neutral` gives the matching color. `critical` gives the error color |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the tile, or on a parent to reach every tile inside it. A `data-status` closer to the tile than the property wins over the two colors.

| Property | Default | Controls |
|---|---|---|
| `--date-tile-width` | `56px`, `48px` with `nds-sm`, `72px` with `nds-lg` | The tile's width. It wins over the size's width |
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
- [Drawer](../components/drawer) and [Meta](../components/meta): the row that holds the tile, and the line of details under the title.
- [Featured Icons](../components/featured-icons): the icon that a drawer row holds in the same place, with the same statuses.

</div>
  </div>
</section>
