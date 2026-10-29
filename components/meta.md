---
layout: page
title: Meta
hero_title: Meta - National Design System
hero_description: Meta is a line of short facts, each with an icon, such as a time, a place and a person
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "17/10/2026 - 01:58 PM"
---

<section id="meta-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A meta line is a `<span>` with the `nds-meta` class. Each fact in it is a `<span>` with the `nds-meta-item` class, which holds an icon and a short text. The line holds only inline elements, so it can sit inside a link or a button, such as a drawer row or a link card.

Pick another component when:

- each value needs a visible label, such as "Email" or "Mobile": [Definition List](../components/definition-list)
- the fact is a category or a status: [Tags](../components/tag)

</div>
  </div>
</section>

<section id="meta-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="meta-line" data-canon data-variants="meta-variants-table">
<span class="nds-meta">
  <span class="nds-meta-item">
    <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
    10:00 – 11:15 AM
  </span>
  <span class="nds-meta-item">
    <i class="hgi hgi-stroke hgi-teacher" aria-hidden="true"></i>
    Dr. Nora Al-Qahtani
  </span>
  <span class="nds-meta-item">
    <i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>
    Building 3, Room 214
  </span>
</span>
</script>
<script type="text/html" id="meta-drawer" data-canon>
<div class="nds-drawer nds-divided">
  <ul class="nds-drawer-list" aria-label="Today's classes">
    <li>
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-computer" aria-hidden="true"></i>
        </span>
        <span class="nds-drawer-item">
          <span class="nds-drawer-item-head">
            <span class="nds-tag" data-status="warning">
              <span class="nds-label">Now</span>
            </span>
            <span class="nds-label">ACCT 301 · Managerial Accounting</span>
          </span>
          <span class="nds-meta">
            <span class="nds-meta-item">
              <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
              8:00 – 8:50 AM
            </span>
            <span class="nds-meta-item">
              <i class="hgi hgi-stroke hgi-teacher" aria-hidden="true"></i>
              Dr. Khalid Al-Harbi
            </span>
            <span class="nds-meta-item">
              <i class="hgi hgi-stroke hgi-computer" aria-hidden="true"></i>
              Online
            </span>
          </span>
        </span>
      </a>
    </li>
    <li>
      <a href="#" class="nds-btn nds-subtle nds-indicator">
        <span class="nds-featured-icon nds-sm">
          <i class="hgi hgi-stroke hgi-teacher" aria-hidden="true"></i>
        </span>
        <span class="nds-drawer-item">
          <span class="nds-drawer-item-head">
            <span class="nds-tag" data-status="info">
              <span class="nds-label">Next</span>
            </span>
            <span class="nds-label">FIN 320 · Corporate Finance</span>
          </span>
          <span class="nds-meta">
            <span class="nds-meta-item">
              <i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>
              10:00 – 11:15 AM
            </span>
            <span class="nds-meta-item">
              <i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>
              Building 3, Room 214
            </span>
          </span>
        </span>
      </a>
    </li>
  </ul>
</div>
</script>
<script type="text/html" id="meta-card" data-canon>
<div class="nds-card nds-stroke">
  <div class="nds-card-content">
    <div class="nds-card-text">
      <span class="nds-card-title">Final exams</span>
      <p class="nds-card-description">The exam timetable for the first term.</p>
    </div>
    <span class="nds-meta">
      <span class="nds-meta-item">
        <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
        13 – 17 Dec 2026
      </span>
      <span class="nds-meta-item">
        <i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>
        Riyadh campus
      </span>
    </span>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="meta-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

The Drawer row and Card structures show where the line goes inside those components: after the title part. Size goes on the `.nds-meta` line. Status goes on the one fact it colors: the builder puts it on the last fact.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Line (default) | — | — | The facts on their own |
| Structure | Drawer row | canon `#meta-drawer` | — | A list of items with details, such as classes or requests. The line goes in `.nds-drawer-item`, after `.nds-drawer-item-head` |
| Structure | Card | canon `#meta-card` | — | A card with details under its text. The line goes in `.nds-card-content`, after `.nds-card-text` |
| Size | SM | `.nds-sm` | `.nds-meta` | 12px text and a 14px icon, for a table cell or a dense list |
| Size | MD (default) | — | — | 14px text and a 16px icon, for a list row or a card |
| Size | LG | `.nds-lg` | `.nds-meta` | 16px text and an 18px icon, under a page or an article title |
| Status | None (default) | — | — | The secondary text color, like the other facts |
| Status | Success | `[data-status="success"]` | `.nds-meta-item:last-child` | A fact that is done, such as "Paid" |
| Status | Info | `[data-status="info"]` | `.nds-meta-item:last-child` | A fact with news, such as a new room |
| Status | Warning | `[data-status="warning"]` | `.nds-meta-item:last-child` | A fact that needs attention soon, such as "Due in 2 days" |
| Status | Error | `[data-status="error"]` | `.nds-meta-item:last-child` | A fact that is late or failed, such as "Overdue 2 days" |
| Status | Neutral | `[data-status="neutral"]` | `.nds-meta-item:last-child` | A fact in the default text color, darker than the others |
{: #meta-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="meta-features" class="nds-content-section nds-doc-features">
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
              <p class="nds-card-description">The line and its facts are <code class="nds-inline-code lang-html">&lt;span&gt;</code> elements, so the line is valid inside a link or a button.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-text-wrap" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Wrap to Fit</span>
              <p class="nds-card-description">When the facts do not fit on one line, they wrap. Each fact moves down as a whole. Only a fact longer than the whole line wraps inside, and its icon stays beside its first line of text.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-resize-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Icon Size in Buttons</span>
              <p class="nds-card-description">Inside a button or a drawer row, the icon keeps the size of its line. The button's own icon size does not reach it.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-paragraph" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Own Text Style</span>
              <p class="nds-card-description">The line sets its own size, weight and color, so it reads as secondary text inside a button, a card or a row.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

<section id="meta-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Keep each fact short: a time, a place, a name or a reference number.
- Use two to four facts in a line. Put longer details in a [Definition List](../components/definition-list).
- Pick an icon that names the fact, such as a clock for a time. A reader who sees only the icon must know what the text is.
- Give each icon `aria-hidden="true"`. The text names the fact for screen readers.
- Use the same facts in the same order on every row of a list, so the reader can scan down a column.
- Put the status of the whole item in a [Tag](../components/tag). Use `data-status` on a fact only when that one fact needs attention, such as a late due date.
- Use `nds-sm` in a table cell and `nds-lg` under a page title. Keep the default in list rows and cards.
- Put a link inside a fact, such as an email address, only when the line is not inside a link or a button. A link inside a link is not valid HTML.
- Write a time or a phone number inside `<span dir="ltr">` on an Arabic page, so its digits keep their order.

</div>
  </div>
</section>

<section id="meta-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-meta` | `<span>` | The line: a row of facts that wraps |
| `nds-meta-item` | `<span>` in the line | One fact: an icon and its text, side by side |
| `nds-md` | `.nds-meta` | The same as no size class: 14px text and a 16px icon |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-status` | `.nds-meta-item` | `success`, `info`, `warning`, `error` or `neutral` gives the fact's text and icon the matching color. `critical` gives the error color. A `data-status` on a parent, such as a drawer row, does not color the facts |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

Set these on the line, or on a parent to reach every line inside it.

| Property | Default | Controls |
|---|---|---|
| `--meta-gap` | `var(--spacing-xs) var(--spacing-lg)` | Space between the rows, then between the facts in a row |
| `--meta-color` | `var(--text-secondary-paragraph)` | Text and icon color. A fact with `data-status` keeps its status color |
{: .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="meta-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Student Portal](../examples/student-portal): meta lines on the class, request and exam rows, and above the exam list.
- [Drawer](../components/drawer) and [Date Tile](../components/date-tile): the row that holds the line, and the date at the start of the row.

</div>
  </div>
</section>
