---
layout: page
title: Calendar
hero_title: Calendar - National Design System
hero_description: A calendar shows one week of events, as seven day columns or as a list of rows
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "24/10/2026 - 09:17 PM"
---

<section id="calendar-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A calendar is a `.nds-calendar` element with four parts. A [Toolbar](../components/toolbar) holds the week's dates, the buttons that move between weeks, and the Grid and Rows switch. `.nds-calendar-days` is the row of day buttons, which the script writes. `.nds-calendar-events` is a [Drawer](../components/drawer) list with one `<li>` per event, and each event has a [Date Tile](../components/date-tile). `.nds-calendar-empty` is the message for a week or a day with no events. The script reads the day of each event from its `<time datetime>`, and shows the events of one week.

Pick another component when:

- the user picks a date: [Date Picker](../components/date-picker)
- the dates have no week to move through, such as a list of deadlines: [Drawer](../components/drawer) rows with a [Date Tile](../components/date-tile)
- the events are steps in order, such as the history of a request: [Timeline](../components/timeline)

</div>
  </div>
</section>

<section id="calendar-markup" class="nds-content-section nds-doc-markup nds-demo-section">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Markup</h2>
    </div>
    <div class="nds-section-body">
<script type="text/html" id="calendar-week" data-canon data-variants="calendar-variants-table">
<div class="nds-calendar" data-week="2026-10-20">
  <div class="nds-toolbar">
    <div class="nds-toolbar-start">
      <p class="nds-calendar-title"></p>
    </div>
    <div class="nds-toolbar-end">
      <div class="nds-btn-group">
        <button type="button" class="nds-btn nds-md nds-secondary-outline nds-icon-only" data-calendar-action="prev" aria-label="Previous week" data-i18n-aria-label="calendar.previous_week">
          <i class="nds-icon nds-hgi-arrow-prev-02" aria-hidden="true"></i>
        </button>
        <button type="button" class="nds-btn nds-md nds-secondary-outline" data-calendar-action="today">
          <span class="nds-label" data-i18n="calendar.today">Today</span>
        </button>
        <button type="button" class="nds-btn nds-md nds-secondary-outline nds-icon-only" data-calendar-action="next" aria-label="Next week" data-i18n-aria-label="calendar.next_week">
          <i class="nds-icon nds-hgi-arrow-next-02" aria-hidden="true"></i>
        </button>
      </div>
      <div class="nds-btn-group nds-calendar-views">
        <button type="button" class="nds-btn nds-md nds-secondary-outline" data-calendar-view="grid">
          <i class="hgi hgi-stroke hgi-grid-view" aria-hidden="true"></i>
          <span class="nds-label" data-i18n="calendar.grid">Grid</span>
        </button>
        <button type="button" class="nds-btn nds-md nds-secondary-outline" data-calendar-view="rows">
          <i class="hgi hgi-stroke hgi-list-view" aria-hidden="true"></i>
          <span class="nds-label" data-i18n="calendar.rows">Rows</span>
        </button>
      </div>
    </div>
  </div>
  <div class="nds-calendar-days" role="group" aria-label="Days of the week" data-i18n-aria-label="calendar.days_of_the_week"></div>
  <div class="nds-drawer nds-divided">
    <ul class="nds-drawer-list nds-calendar-events" aria-label="Training sessions">
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-18T09:00">
            <span class="nds-date-tile-weekday">Sun</span>
            <span class="nds-date-tile-day">18</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
              <span class="nds-label">Service design workshop</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>9:00 AM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Room 2</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-18T13:00">
            <span class="nds-date-tile-weekday">Sun</span>
            <span class="nds-date-tile-day">18</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
              <span class="nds-label">Product team meeting</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>1:00 PM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Online</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-20T10:00">
            <span class="nds-date-tile-weekday">Tue</span>
            <span class="nds-date-tile-day">20</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
              <span class="nds-label">Web accessibility for developers and designers</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>10:00 AM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Training center</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-22T08:30">
            <span class="nds-date-tile-weekday">Thu</span>
            <span class="nds-date-tile-day">22</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
              <span class="nds-label">Release review</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>8:30 AM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Room 1</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-22T12:00">
            <span class="nds-date-tile-weekday">Thu</span>
            <span class="nds-date-tile-day">22</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
              <span class="nds-label">Open questions session</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>12:00 PM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Online</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-22T15:00">
            <span class="nds-date-tile-weekday">Thu</span>
            <span class="nds-date-tile-day">22</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
              <span class="nds-label">Survey results</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>3:00 PM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Room 3</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-27T11:00">
            <span class="nds-date-tile-weekday">Tue</span>
            <span class="nds-date-tile-day">27</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
              <span class="nds-label">Partner meeting</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>11:00 AM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Room 2</span>
            </span>
          </span>
        </a>
      </li>
    </ul>
  </div>
  <div class="nds-empty-placeholder nds-calendar-empty">
    <i class="nds-icon nds-hgi-desert" aria-hidden="true"></i>
    <span class="nds-empty-message" data-i18n="calendar.no_events">No events</span>
  </div>
</div>
</script>
<script type="text/html" id="calendar-filter" data-canon>
<div class="nds-calendar" data-week="2026-10-20">
  <div class="nds-toolbar">
    <div class="nds-toolbar-start">
      <p class="nds-calendar-title"></p>
    </div>
    <div class="nds-toolbar-end">
      <div class="nds-dropmenu nds-filter" data-filter-target="calendar-sessions">
        <button class="nds-btn nds-md nds-secondary-outline nds-menu-btn nds-filter-btn nds-dropmenu-trigger" type="button">
          <i class="nds-icon nds-hgi-filter" aria-hidden="true"></i>
          <span class="nds-label" data-hidden="sm sr" data-i18n="filter.filter">Filter</span>
        </button>
        <div class="nds-dropmenu-menu" hidden>
          <div class="nds-dropmenu-scroll">
            <div data-filter="type" data-filter-type="checkbox" data-filter-legend="Type"></div>
          </div>
          <div class="nds-dropmenu-footer">
            <hr class="nds-divider">
            <div class="nds-dropmenu-action">
              <button class="nds-btn nds-secondary nds-dropmenu-item" type="button" data-filter-action="clear" data-no-auto-close>
                <span class="nds-label" data-i18n="filter.reset">Reset</span>
              </button>
              <button class="nds-btn nds-primary nds-dropmenu-item" type="button" data-filter-action="apply">
                <span class="nds-label" data-i18n="filter.apply">Apply</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="nds-btn-group">
        <button type="button" class="nds-btn nds-md nds-secondary-outline nds-icon-only" data-calendar-action="prev" aria-label="Previous week" data-i18n-aria-label="calendar.previous_week">
          <i class="nds-icon nds-hgi-arrow-prev-02" aria-hidden="true"></i>
        </button>
        <button type="button" class="nds-btn nds-md nds-secondary-outline" data-calendar-action="today">
          <span class="nds-label" data-i18n="calendar.today">Today</span>
        </button>
        <button type="button" class="nds-btn nds-md nds-secondary-outline nds-icon-only" data-calendar-action="next" aria-label="Next week" data-i18n-aria-label="calendar.next_week">
          <i class="nds-icon nds-hgi-arrow-next-02" aria-hidden="true"></i>
        </button>
      </div>
      <div class="nds-btn-group nds-calendar-views">
        <button type="button" class="nds-btn nds-md nds-secondary-outline" data-calendar-view="grid">
          <i class="hgi hgi-stroke hgi-grid-view" aria-hidden="true"></i>
          <span class="nds-label" data-i18n="calendar.grid">Grid</span>
        </button>
        <button type="button" class="nds-btn nds-md nds-secondary-outline" data-calendar-view="rows">
          <i class="hgi hgi-stroke hgi-list-view" aria-hidden="true"></i>
          <span class="nds-label" data-i18n="calendar.rows">Rows</span>
        </button>
      </div>
    </div>
    <div class="nds-filter-applied" data-filter-target="calendar-sessions" hidden>
      <span class="nds-label" data-i18n="filter.applied_filters">Applied Filters:</span>
      <div class="nds-chips"></div>
    </div>
  </div>
  <div class="nds-calendar-days" role="group" aria-label="Days of the week" data-i18n-aria-label="calendar.days_of_the_week"></div>
  <div class="nds-drawer nds-divided">
    <ul id="calendar-sessions" class="nds-drawer-list nds-calendar-events" aria-label="Training sessions" data-filter-items="li">
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-18T09:00">
            <span class="nds-date-tile-weekday">Sun</span>
            <span class="nds-date-tile-day">18</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
            <span class="nds-tag" data-filter="type">
              <span class="nds-label">Workshop</span>
            </span>
              <span class="nds-label">Service design workshop</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>9:00 AM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Room 2</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-18T13:00">
            <span class="nds-date-tile-weekday">Sun</span>
            <span class="nds-date-tile-day">18</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
            <span class="nds-tag" data-filter="type">
              <span class="nds-label">Meeting</span>
            </span>
              <span class="nds-label">Product team meeting</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>1:00 PM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Online</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-20T10:00">
            <span class="nds-date-tile-weekday">Tue</span>
            <span class="nds-date-tile-day">20</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
            <span class="nds-tag" data-filter="type">
              <span class="nds-label">Course</span>
            </span>
              <span class="nds-label">Web accessibility for developers and designers</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>10:00 AM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Training center</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-22T08:30">
            <span class="nds-date-tile-weekday">Thu</span>
            <span class="nds-date-tile-day">22</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
            <span class="nds-tag" data-filter="type">
              <span class="nds-label">Meeting</span>
            </span>
              <span class="nds-label">Release review</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>8:30 AM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Room 1</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-22T12:00">
            <span class="nds-date-tile-weekday">Thu</span>
            <span class="nds-date-tile-day">22</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
            <span class="nds-tag" data-filter="type">
              <span class="nds-label">Meeting</span>
            </span>
              <span class="nds-label">Open questions session</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>12:00 PM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Online</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-22T15:00">
            <span class="nds-date-tile-weekday">Thu</span>
            <span class="nds-date-tile-day">22</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
            <span class="nds-tag" data-filter="type">
              <span class="nds-label">Meeting</span>
            </span>
              <span class="nds-label">Survey results</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>3:00 PM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Room 3</span>
            </span>
          </span>
        </a>
      </li>
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-27T11:00">
            <span class="nds-date-tile-weekday">Tue</span>
            <span class="nds-date-tile-day">27</span>
            <span class="nds-date-tile-month">Oct</span>
          </time>
          <span class="nds-drawer-item">
            <span class="nds-drawer-item-head">
            <span class="nds-tag" data-filter="type">
              <span class="nds-label">Meeting</span>
            </span>
              <span class="nds-label">Partner meeting</span>
            </span>
            <span class="nds-meta">
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-clock-01" aria-hidden="true"></i>11:00 AM</span>
              <span class="nds-meta-item"><i class="hgi hgi-stroke hgi-location-01" aria-hidden="true"></i>Room 2</span>
            </span>
          </span>
        </a>
      </li>
    </ul>
  </div>
  <div class="nds-empty-placeholder nds-calendar-empty">
    <i class="nds-icon nds-hgi-desert" aria-hidden="true"></i>
    <span class="nds-empty-message" data-i18n="calendar.no_events">No events</span>
  </div>
</div>
</script>
    </div>
  </div>
</section>

<section id="calendar-variants" class="nds-content-section nds-doc-variants" hidden>
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Variants</h2>
    </div>
    <div class="nds-section-body" markdown="1">

Every option goes on `.nds-calendar`, except Loading, which goes on the events' `.nds-drawer`. The canon sets `data-week` so that the sample events show: leave it out to open on this week.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Calendar (default) | — | — | One week of events with week buttons and a Grid and Rows switch |
| Structure | With Filter | canon `#calendar-filter` | — | The same calendar with a [Filter](../components/filter) by event type, and a row of the applied filters. Each event has a tag that names its type |
| View | Grid (default) | — | — | A column per day, so busy and free days show at a glance. A calendar under 860px wide shows Rows |
| View | Rows | `[data-view="rows"]` | `.nds-calendar` | A list of the week's events, with a date tile on each. The full title, time and place show at every width |
| View switch | No view switch | `remove` | `.nds-calendar-views` | Delete the `.nds-calendar-views` group. The calendar then keeps the view in `data-view`, and Grid without it |
| Calendar | Gregorian (default) | — | — | Gregorian dates in the week's title and on the day buttons |
| Calendar | Hijri | `[data-calendar="hijri"]` | `.nds-calendar` | Hijri dates in the week's title, on the day buttons and in what a screen reader hears. Write the date tiles' text in Hijri too, and keep `datetime` in Gregorian |
| Second date | Hijri | `[data-calendar-second="hijri"]` | `.nds-calendar:not([data-calendar="hijri"])` | The week's Hijri dates under the title, and each day's Hijri day under its Gregorian one. A screen reader hears both dates |
| Second date | Gregorian | `[data-calendar-second="gregory"]` | `.nds-calendar[data-calendar="hijri"]` | The week's Gregorian dates under the title, and each day's Gregorian day. Use it with the Hijri calendar |
| Week start | Sunday (default) | — | — | The week starts on Sunday |
| Week start | Saturday | `[data-week-start="sat"]` | `.nds-calendar` | The week starts on Saturday |
| Week start | Monday | `[data-week-start="mon"]` | `.nds-calendar` | The week starts on Monday |
| Address | Week in the address | `[data-week-param]` | `.nds-calendar` | Keeps the week in the address as `?week=2026-10-25`, so a reload or a shared link opens the same week |
| Loading | Loading (hint: Skeleton placeholders while a week loads) | `.nds-loading` | `.nds-drawer` | Shows the events as skeleton bars while a server loads a week. Remove the class when the events are in |
{: #calendar-variants-table .nds-table .nds-responsive}

</div>
  </div>
</section>

<section id="calendar-behavior" class="nds-content-section nds-doc-behavior">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Behavior</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Grid and Rows
{: .nds-block-title}

Grid shows a column for each day, and each day stacks its events. Rows shows the events as one list, each with its date tile. `data-calendar-view="grid"` and `"rows"` on a button switch the view, and the script marks the current one as pressed.

### Week Buttons
{: .nds-block-title}

`data-calendar-action="prev"` and `"next"` on a button move one week back or forward, and `"today"` moves to this week. The calendar opens on the week of `data-week`, or on this week without it. The script writes the week's first day back to `data-week`. A move to another week drops the picked day.

### Day Filter
{: .nds-block-title}

A press on a day button shows that day's events only, and a second press shows the week again. In Grid, the day's events take the whole width. When the week or the day has no events, `.nds-calendar-empty` shows in place of the list.

The day buttons are one Tab stop, as the Date Picker's days: the picked day, else today, else the first. The arrow keys move between them, Home and End to the first and the last. A picked day that is also today keeps a ring inside its fill, so today stays in view.

### Week Start and Hijri
{: .nds-block-title}

`data-week-start` sets the first day of the week, and `data-calendar="hijri"` shows Hijri dates. The nearest one wins, on the calendar or on any element around it, such as `<html>`. The [Date Picker](../components/date-picker) reads the same two attributes. On a Hijri calendar, an event's `datetime` stays in Gregorian, and you write its date tile in Hijri. See [Date](../core/date).

`data-calendar-second` adds the dates in the other calendar, in smaller text: the week under the title, and the day number on each day button. Use `hijri` on a Gregorian calendar, or `gregory` on a Hijri one. A screen reader hears both dates in full. A Hijri date ends in the era word (AH, هـ), as in the top bar's date.

### Week in the Address
{: .nds-block-title}

`data-week-param` keeps the week in the address as `?week=2026-10-25`, the week's first day. The script reads it once at load, and it wins over `data-week`. When the user goes back to the week the calendar opened on, the script removes `?week=` from the address. The address changes with no new Back-button step, as in [Pagination](../components/pagination). To use a name other than `week`, give the attribute a value: `data-week-param="sessions-week"`.

### Events from a Server
{: .nds-block-title}

The events are the `<li>` items in `.nds-calendar-events`, and nothing else. A server can write the events of many weeks at once, and the calendar shows one week. For a long schedule, load one week at a time: on `nds:calendar:change`, put `nds-loading` on the `.nds-drawer`, replace the items with the new week's events, then remove `nds-loading`. While the drawer loads, the old events show as skeleton bars, and the empty message waits. Events from JSON are the same: build an `<li>` for each event, as in the canon, in time order.

### Filter
{: .nds-block-title}

The With Filter structure adds a [Filter](../components/filter) on the events list: `data-filter-items="li"` on the list, and a mark in each event, such as a tag with `data-filter="type"`. The Filter builds its options from the marks. The calendar shows only the events that match, and a day with no match shows the empty message. The row of applied filters removes a filter in one press. When a script replaces the events, call `NDS.init.refresh(list)` so that the Filter reads them too.

</div>
  </div>
</section>

<section id="calendar-frameworks" class="nds-content-section nds-doc-frameworks">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Framework Views</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- After a view mounts a calendar, call `NDS.init.mount(view)`. Before it unmounts one, call `NDS.init.destroy(view)`. See [Init](../core/init).
- Render the events as `<li>` items of the list. When your view adds or removes items, the calendar reads them again by itself.
- Render `.nds-calendar-title` and `.nds-calendar-days` empty. The script writes their content.
- The calendar keeps its state in `data-week`, `data-view` and `data-day`. Write them from your state at any time, and the calendar follows. Read them back on `nds:calendar:change`.
- The script never moves the items you render. It writes `data-calendar-day` and a `--_calendar-rows` style on them, and `destroy()` removes both.

</div>
  </div>
</section>

<section id="calendar-features" class="nds-content-section nds-doc-features">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Built-in Features</h2>
    </div>
    <div class="nds-section-body">
      <div class="nds-definition-list nds-divided nds-grid">
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-code"></i>
            <span class="nds-label">Plain List</span>
          </span>
          <p class="nds-item-desc">The events are a plain list. Before the script starts, or without it, the page shows them as a list of rows.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-refresh"></i>
            <span class="nds-label">Events Read Again</span>
          </span>
          <p class="nds-item-desc">When a script adds or removes events, the calendar reads the list again and places each event on its day.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-calendar-check-in-01"></i>
            <span class="nds-label">Today</span>
          </span>
          <p class="nds-item-desc">Today's day button has a brand primary border, and <code class="nds-inline-code lang-html">aria-current="date"</code> for a screen reader.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-volume-high"></i>
            <span class="nds-label">Announced Changes</span>
          </span>
          <p class="nds-item-desc">After a press on a day or a week button, a screen reader hears the day or the week and its number of events, such as "Thursday 22 October 2026: 3 events".</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-accessibility"></i>
            <span class="nds-label">Dates for Screen Readers</span>
          </span>
          <p class="nds-item-desc">Each day button holds the full date as its description. In Grid, the date tiles are hidden on the screen, but a screen reader still reads each event's date.</p>
        </div>
        <div class="nds-definition-item">
          <span class="nds-item-title">
            <i class="hgi hgi-stroke hgi-smart-phone-01"></i>
            <span class="nds-label">Narrow Calendars</span>
          </span>
          <p class="nds-item-desc">The calendar's own width sets its layout, not the screen's: under 860px it shows Rows, and under 480px the day buttons show one letter.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="calendar-practices" class="nds-content-section nds-doc-practices">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Best Practices</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- Write the events in time order. A day stacks them as written, and a screen reader reads them in that order.
- Put the event's `<time datetime>` first in the event, such as `2026-10-20T10:00`. The script reads the first `<time>` it finds.
- Name the events in the list's `aria-label`, such as "Training sessions".
- Keep event titles short. A Grid column is narrow, and a long title wraps over many lines.
- Show an event that spans days on its first day, and write its last day in the row's text.
- With a Filter, show the row of applied filters. Without it, a day with no match looks empty for no reason.
- To show Grid, put the calendar in a container at least 860px wide.

</div>
  </div>
</section>

<section id="calendar-api" class="nds-content-section nds-doc-api">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">API</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

### Classes
{: .nds-block-title}

| Class | Element | Effect |
|---|---|---|
| `nds-calendar` | `div` | The calendar |
| `nds-calendar-title` | `p` in the toolbar | The script writes the week's dates in it, such as "18 – 24 Oct 2026" |
| `nds-calendar-views` | `.nds-btn-group` | The Grid and Rows buttons. Hidden under 860px |
| `nds-calendar-days` | `div` | The script writes a button per day in it. Give it `role="group"` and an `aria-label` |
| `nds-calendar-day` | `button` | Written by the script, one per day |
| `nds-calendar-events` | `ul.nds-drawer-list` | The events, one `<li>` each |
| `nds-calendar-empty` | `div` | Shows while the week or the picked day has no events. The canon gives it the `nds-empty-placeholder` look of [Empty](../components/empty) |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-week` | `.nds-calendar` | Any day of the week to show, as `YYYY-MM-DD`. Without it, this week. The script writes the week's first day back to it |
| `data-view` | `.nds-calendar` | `grid` (the default) or `rows`. The script writes it when the user switches the view |
| `data-day` | `.nds-calendar` | The picked day, as `YYYY-MM-DD`: only its events show. The script writes it when the user presses a day, and removes it when the user presses it again or moves to another week |
| `data-week-param` | `.nds-calendar` | Keeps the week in the address. The name is `week` by default. A value sets another name |
| `data-calendar` | `.nds-calendar`, or any element around it | `hijri` shows Hijri dates. The nearest one wins. The default is Gregorian |
| `data-calendar-second` | `.nds-calendar` | `hijri` or `gregory`: the title and each day button also show the dates in that calendar. A screen reader hears that date in full too |
| `data-week-start` | `.nds-calendar`, or any element around it | `sun`, `mon`, `tue`, `wed`, `thu`, `fri` or `sat`: the first day of the week. The nearest one wins. The default is Sunday |
| `data-calendar-action` | a button in the calendar | `prev`, `next` or `today` |
| `data-calendar-view` | a button in the calendar | `grid` or `rows`. The script sets `aria-pressed` and `data-state="selected"` on the current one |
| `datetime` | the first `<time>` in an event | The event's day, as `YYYY-MM-DD`, with or without a time. A time with a zone, such as `Z` or `+03:00`, counts in the site's timezone. Write it in Gregorian, on a Hijri calendar too |
| `data-calendar-day` | an event `<li>` | The script sets it on an event of the shown week (or the picked day), as its column from `0` to `6`, and removes it from the others. An event without it is hidden. Do not write it |
| `data-state="empty"` | `.nds-calendar` | The script sets it while no event shows, and removes it when one does. Events that a Filter hides do not count |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--calendar-gap` | `var(--spacing-md)` | The space between the day buttons, and between the events in Grid |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Calendar.init()` | Starts every `.nds-calendar` that has not started. `reinit()` is the same |
| `NDS.Calendar.create(element)` | Starts one calendar and returns it. On a started calendar, it returns that one |
| `NDS.Calendar.destroy(element)` | The same as `destroy()`. An `id` works too |
| `NDS.Calendar.getInstance(element)` | The calendar's instance, or `null`. An `id` works too. The instance is also `element.ndsCalendar` |
| `next()`, `prev()` | Moves to the next or the previous week |
| `goTo(date)` | Moves to the week that holds `date`, a `Date` or `YYYY-MM-DD` |
| `setView(view)` | `grid` or `rows` |
| `setDay(date)` | Shows the events of that day only. A day outside the shown week moves the calendar to its week. `null` shows the week |
| `refresh()` | Reads the events again. The calendar does it by itself when items are added or removed |
| `destroy()` | Removes the day buttons, the listeners, and what the script wrote on the events and the view buttons. `data-week`, `data-view` and `data-day` stay |
{: .nds-table .nds-responsive}

`next()`, `prev()`, `goTo()`, `setView()` and `setDay()` return `true` when they change the calendar. A change from a method makes no announcement for a screen reader: only a press does.

| Event | Fired on | Detail |
|---|---|---|
| `nds:calendar:change` | `.nds-calendar` | `{ week, view, day }`, after each change of the week, the view or the day, from a press, a method or a written attribute. Not at start. `week` is the first day of the week and `day` the picked day, as `YYYY-MM-DD`. `day` is `null` for the whole week |
{: .nds-table .nds-responsive}

<script type="text/html" id="calendar-api-js" data-canon data-lang="js">
// Load the events of each week from the server.
var calendar = document.querySelector('.nds-calendar');
NDS.init.ready.then(function () {
  // Once the calendar starts, data-week holds the first day of the week it shows.
  var shownWeek = calendar.dataset.week;
  calendar.addEventListener('nds:calendar:change', function (e) {
    if (e.detail.week === shownWeek) return; // the view or the day changed, not the week
    shownWeek = e.detail.week;
    var drawer = calendar.querySelector('.nds-drawer');
    drawer.classList.add('nds-loading');
    fetch('/sessions?week=' + e.detail.week)
      .then(function (response) {
        if (!response.ok) throw new Error(response.status);
        return response.text();
      })
      .then(function (html) { calendar.querySelector('.nds-calendar-events').innerHTML = html; })
      .finally(function () { drawer.classList.remove('nds-loading'); });
  });
});
</script>

The full API is in the banner of `_js/nds-calendar.js`.

</div>
  </div>
</section>

<section id="calendar-related" class="nds-content-section nds-doc-related">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Related</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

- [Drawer](../components/drawer), [Date Tile](../components/date-tile) and [Meta](../components/meta): the row of each event, its date and its time and place.
- [Filter](../components/filter): the filter by event type in the With Filter structure.
- [Date](../core/date): the Hijri dates and the first day of the week.
- [Date Picker](../components/date-picker): a field to pick a date, with the same week start.

</div>
  </div>
</section>
