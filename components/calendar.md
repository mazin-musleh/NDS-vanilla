---
layout: page
title: Calendar
hero_title: Calendar - National Design System
hero_description: "A calendar shows the events of one week or one month: as day columns, as a list, or under a month of days"
breadcrumb: [["Components", "/components/?shelf=Components"]]
lang: en
direction: ltr
since: "1.12.x"
updated: "1.12.x"
last_edit: "27/10/2026 - 01:55 PM"
---

<section id="calendar-overview" class="nds-content-section nds-doc-overview">
  <div class="nds-section-wrapper">
    <div class="nds-section-head">
      <h2 class="nds-section-title">Overview</h2>
    </div>
    <div class="nds-section-body nds-prose" markdown="1">

A calendar is a `.nds-calendar` element with four parts. A [Toolbar](../components/toolbar) holds the shown dates, the buttons that move between weeks or months, and the Grid, Rows and Month switch. `.nds-calendar-days` holds the day buttons, which the script writes. A dot under a day's number marks a day with events, in every view. `.nds-calendar-events` is a [Drawer](../components/drawer) list with one `<li>` per event, and each event has a [Date Tile](../components/date-tile). `.nds-calendar-empty` is the message for a week, a month or a day with no events. The script reads the day of each event from its `<time datetime>`, and shows the events of one week or one month.

Pick another component when:

- the user picks a date: [Date Picker](../components/date-picker)
- the dates have no week or month to move through, such as a list of deadlines: [Drawer](../components/drawer) rows with a [Date Tile](../components/date-tile)
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
<div class="nds-calendar" data-date="2026-10-20">
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
        <button type="button" class="nds-btn nds-md nds-secondary-outline" data-calendar-view="month">
          <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
          <span class="nds-label" data-i18n="calendar.month">Month</span>
        </button>
      </div>
    </div>
  </div>
  <div class="nds-calendar-days" role="group" aria-label="Days" data-i18n-aria-label="calendar.days"></div>
  <div class="nds-drawer nds-divided">
    <ul class="nds-drawer-list nds-calendar-events" aria-label="Training sessions">
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-18T09:00"></time>
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
          <time class="nds-date-tile" datetime="2026-10-18T13:00"></time>
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
          <time class="nds-date-tile" datetime="2026-10-20T10:00"></time>
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
          <time class="nds-date-tile" datetime="2026-10-22T08:30"></time>
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
          <time class="nds-date-tile" datetime="2026-10-22T12:00"></time>
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
          <time class="nds-date-tile" datetime="2026-10-22T15:00"></time>
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
          <time class="nds-date-tile" datetime="2026-10-27T11:00"></time>
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
    <span class="nds-empty-message" data-i18n="empty.message">No content to show</span>
    <span class="nds-empty-message nds-calendar-empty-day" data-i18n="calendar.day_empty" hidden>No events on this day</span>
    <button class="nds-btn nds-md nds-secondary-outline nds-calendar-empty-day" type="button" data-calendar-action="all" hidden>
      <span class="nds-label" data-i18n="calendar.show_all">Show all events</span>
    </button>
  </div>
</div>
</script>
<script type="text/html" id="calendar-filter" data-canon>
<div class="nds-calendar" data-date="2026-10-20">
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
        <button type="button" class="nds-btn nds-md nds-secondary-outline" data-calendar-view="month">
          <i class="hgi hgi-stroke hgi-calendar-03" aria-hidden="true"></i>
          <span class="nds-label" data-i18n="calendar.month">Month</span>
        </button>
      </div>
    </div>
    <div class="nds-filter-applied" data-filter-target="calendar-sessions" data-chip-class="nds-primary" hidden>
      <div class="nds-toolbar-end">
        <span class="nds-label" data-i18n="filter.applied_filters">Applied Filters:</span>
        <div class="nds-chips"></div>
      </div>
    </div>
  </div>
  <div class="nds-calendar-days" role="group" aria-label="Days" data-i18n-aria-label="calendar.days"></div>
  <div class="nds-drawer nds-divided">
    <ul id="calendar-sessions" class="nds-drawer-list nds-calendar-events" aria-label="Training sessions" data-filter-items="li">
      <li>
        <a href="#" class="nds-btn nds-subtle">
          <time class="nds-date-tile" datetime="2026-10-18T09:00"></time>
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
          <time class="nds-date-tile" datetime="2026-10-18T13:00"></time>
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
          <time class="nds-date-tile" datetime="2026-10-20T10:00"></time>
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
          <time class="nds-date-tile" datetime="2026-10-22T08:30"></time>
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
          <time class="nds-date-tile" datetime="2026-10-22T12:00"></time>
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
          <time class="nds-date-tile" datetime="2026-10-22T15:00"></time>
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
          <time class="nds-date-tile" datetime="2026-10-27T11:00"></time>
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
  <div class="nds-empty-placeholder nds-calendar-empty" data-filter-target="calendar-sessions">
    <i class="nds-icon nds-hgi-desert" aria-hidden="true"></i>
    <span class="nds-empty-message" data-i18n="empty.message">No content to show</span>
    <span class="nds-empty-message nds-calendar-empty-day" data-i18n="calendar.day_empty" hidden>No events on this day</span>
    <button class="nds-btn nds-md nds-secondary-outline nds-calendar-empty-day" type="button" data-calendar-action="all" hidden>
      <span class="nds-label" data-i18n="calendar.show_all">Show all events</span>
    </button>
    <span class="nds-empty-message nds-calendar-empty-filtered" data-i18n="filter.no_results_description" hidden>No item matches the current filters.</span>
    <button class="nds-btn nds-md nds-secondary-outline nds-calendar-empty-filtered" type="button" data-filter-action="reset" hidden>
      <span class="nds-label" data-i18n="filter.clear">Clear filters</span>
    </button>
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

Every option goes on `.nds-calendar`, except No view switch, which removes `.nds-calendar-views`. The canon sets `data-date` so that the sample events show: leave it out to open on today.

| Group | Option | Markup | On element | Use |
|---|---|---|---|---|
| Structure | Calendar (default) | — | — | One week of events with step buttons and a Grid, Rows and Month switch |
| Structure | With Filter | canon `#calendar-filter` | — | The same calendar with a [Filter](../components/filter) by event type, and a row of the applied filters. Each event has a tag that names its type |
| View | Grid (default) | — | — | A column per day, so busy and free days show at a glance. A calendar under 860px wide shows Rows |
| View | Rows | `[data-view="rows"]` | `.nds-calendar` | A list of the week's events, with a date tile on each. The full title, time and place show at every width |
| View | Month | `[data-view="month"]` | `.nds-calendar` | A month of day buttons over a list of the month's events. It fits a phone |
| View switch | No view switch | `remove` | `.nds-calendar-views` | Delete the `.nds-calendar-views` group. The calendar then keeps the view in `data-view`, and Grid without it. To offer two views, delete the button of the view you leave out |
| Calendar | Gregorian (default) | — | — | Gregorian dates in the title and on the day buttons |
| Calendar | Hijri | `[data-calendar="hijri"]` | `.nds-calendar` | Hijri dates in the title, on the day buttons, on each event's Date Tile and in what a screen reader hears. The month view shows a Hijri month. Keep `datetime` in Gregorian |
| Second date | Hijri | `[data-calendar-second="hijri"]` | `.nds-calendar:not([data-calendar="hijri"])` | The Hijri dates of the week or month under the title, and each day's Hijri day under its Gregorian one. A screen reader hears both dates |
| Second date | Gregorian | `[data-calendar-second="gregory"]` | `.nds-calendar[data-calendar="hijri"]` | The Gregorian dates of the week or month under the title, and each day's Gregorian day. Use it with the Hijri calendar |
| Week start | Sunday (default) | — | — | The week starts on Sunday |
| Week start | Saturday | `[data-week-start="sat"]` | `.nds-calendar` | The week starts on Saturday |
| Week start | Monday | `[data-week-start="mon"]` | `.nds-calendar` | The week starts on Monday |
| Loading | Loading (hint: A spinner while the events load) | `.nds-loading` | `.nds-calendar` | Shows the [Loading](../components/loading) spinner over the calendar while a server loads a week or a month. Remove the class when the events are in |
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

### Views
{: .nds-block-title}

Grid shows a column for each day, and each day stacks its events. Rows shows the events as one list, each with its date tile. Month shows a month of days over the list. `data-calendar-view="grid"`, `"rows"` and `"month"` on a button switch the view, and the script marks the current one as pressed. When the view changes, the calendar keeps the picked day in view, else today, else the first day shown.

### Month View
{: .nds-block-title}

The month view shows the days of one month as buttons, with the weekday names over them. The month's events show as rows under the days. A dot under a day's number marks a day with events. The first and last rows hold days of the month before and after, in gray. A press on one of them moves to its month and picks the day. A Hijri calendar shows a Hijri month, from its first day to its 29th or 30th.

### Step Buttons
{: .nds-block-title}

`data-calendar-action="prev"` and `"next"` on a button move one week back or forward, or one month in the month view. `"today"` moves to the week or the month of today. The calendar opens on the week or the month of `data-date`, or of today without it. The script writes the first day shown back to `data-date`. A move to another week or month drops the picked day.

### Day Filter
{: .nds-block-title}

A press on a day button shows that day's events only, and a second press shows the week or the month again. In Grid, the day's events take the whole width. When the week, the month or the day has no events, `.nds-calendar-empty` shows in place of the list. A picked day with no events shows the message's `.nds-calendar-empty-day` parts in place of its message: in the canon, "No events on this day" and a Show all events button. `data-calendar-action="all"` on that button shows the whole week or month again, so the picked day is not mistaken for today.

The day buttons are one Tab stop, as the Date Picker's days: the picked day, else today, else the first. The arrow keys move between them, and in the month view Up and Down move one week. Home and End move to the first and the last. A picked day that is also today keeps a ring inside its fill, so today stays in view.

### Week Start and Hijri
{: .nds-block-title}

`data-week-start` sets the first day of the week, and `data-calendar="hijri"` shows Hijri dates. The nearest one wins, on the calendar or on any element around it, such as `<html>`. The [Date Picker](../components/date-picker) reads the same two attributes. On a Hijri calendar, an event's `datetime` stays in Gregorian. See [Date](../core/date).

The script writes each event's Date Tile from its `datetime`: the weekday, the day and the month, in the calendar's calendar and language. The text in your markup is the copy a page without the script shows. A long month name, such as Jumada al-Akhirah, is cut short with an ellipsis, as any text too long for its tile.

`data-calendar-second` adds the dates in the other calendar, in smaller text: the week or the month under the title, and the day number on each day button. Use `hijri` on a Gregorian calendar, or `gregory` on a Hijri one. A screen reader hears both dates in full. A Hijri date ends in the era word (AH, هـ), as in the top bar's date.

### Date and View in the Address
{: .nds-block-title}

The calendar keeps the shown week or month in the address as `?date=2026-10-25`, its first day, as a [Filter](../components/filter) keeps its filters. A reload or a shared link then opens the same week or month. The script reads it once at load, and it wins over `data-date`. When the user goes back to the week or the month the calendar opened on, the script removes `?date=` from the address. The address changes with no new Back-button step, as in [Pagination](../components/pagination). `data-date-param` sets another name: `data-date-param="exam-date"`. Give each calendar on a page its own name.

The view stays in the address the same way, as `?view=month`. The script reads it once at load, and it wins over `data-view`. Back on the view the calendar opened on, the script removes `?view=`. `data-view-param` sets another name.

### Events from a Server
{: .nds-block-title}

The events are the `<li>` items in `.nds-calendar-events`, and nothing else. A server can write the events of many weeks or months at once, and the calendar shows one week or one month. For a long schedule, load what the calendar shows: on `nds:calendar:change`, put `nds-loading` on the `.nds-calendar`, replace the items with the events from `start` to `end`, then remove `nds-loading`. While it loads, the [Loading](../components/loading) spinner shows, and the empty message and the screen reader's count wait. The page opens on the week or the month in `?date=`, so a server that writes one of them reads `?date=` from the request: a shared link then opens with those events. Events from JSON are the same: build an `<li>` for each event, as in the canon, in time order.

### Filter
{: .nds-block-title}

The With Filter structure adds a [Filter](../components/filter) on the events list: `data-filter-items="li"` on the list, and a mark in each event, such as a tag with `data-filter="type"`. The Filter builds its options from the marks. The calendar shows only the events that match, and a day with no match shows the empty message. A filter and a picked day work together: neither clears the other. The dots keep marking every day that has events, filtered or not. When the filter hides every event of the week, the month or the day, the empty message's `.nds-calendar-empty-filtered` parts show in place of its message: in the canon, "No item matches the current filters." and a Clear filters button. The message carries the filter's `data-filter-target`, so the button's `data-filter-action="reset"` clears it. The row of applied filters sits at the bar's end, in a `.nds-toolbar-end`, and removes a filter in one press. When a script replaces the events, call `NDS.init.refresh(list)` so that the Filter reads them too.

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
- The calendar keeps its state in `data-date`, `data-view` and `data-day`. Write them from your state at any time, and the calendar follows. Read them back on `nds:calendar:change`.
- The script never moves the items you render. It writes `data-calendar-day` and a `--_calendar-rows` style on them, and `destroy()` removes both. It also writes the text of each event's Date Tile, which stays after `destroy()`.
- The calendar writes the date to the address with `replaceState`, as a [Filter](../components/filter) does. A router that owns the address keeps the other keys, and reads the date from `?date=` or `data-date`, and the view from `?view=` or `data-view`.

</div>
  </div>
</section>

<section id="calendar-features" class="nds-content-section nds-doc-features">
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
              <span class="nds-card-title">Plain List</span>
              <p class="nds-card-description">The events are a plain list. Before the script starts, or without it, the page shows them as a list of rows.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-refresh" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Events Read Again</span>
              <p class="nds-card-description">When a script adds or removes events, the calendar reads the list again and places each event on its day.</p>
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
              <span class="nds-card-title">Today</span>
              <p class="nds-card-description">Today's day button has a brand primary border, and <code class="nds-inline-code lang-html">aria-current="date"</code> for a screen reader. When it is also the picked day, a ring inside its fill keeps it in view.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-link-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Date in the Address</span>
              <p class="nds-card-description">The week or the month stays in the address as <code class="nds-inline-code lang-html">?date=</code>, and the view as <code class="nds-inline-code lang-html">?view=</code>, so a reload or a shared link opens the same one.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-keyboard" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Keyboard</span>
              <p class="nds-card-description">The day buttons are one Tab stop. The arrow keys move between the days, as in the Date Picker.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-volume-high" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Announced Changes</span>
              <p class="nds-card-description">After a press on a day or a step button, a screen reader hears the day, the week or the month and its number of events, such as "Thursday 22 October 2026: 3 events". An empty week says the text of the empty message.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-accessibility" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Dates for Screen Readers</span>
              <p class="nds-card-description">Each day button holds the full date and its number of events as its description. In Grid, the date tiles are hidden on the screen, but a screen reader still reads each event's date.</p>
            </div>
          </div>
        </li>
        <li class="nds-card nds-horizontal">
          <div class="nds-card-header">
            <div class="nds-card-featured-icon">
              <span class="nds-featured-icon"><i class="hgi hgi-stroke hgi-smart-phone-01" aria-hidden="true"></i></span>
            </div>
          </div>
          <div class="nds-card-content">
            <div class="nds-card-text">
              <span class="nds-card-title">Narrow Calendars</span>
              <p class="nds-card-description">The calendar's own width sets its layout, not the screen's. <code class="nds-inline-code lang-css">--calendar-max-width</code> caps it. Under 860px, Grid shows as Rows and the switch offers Rows and Month. From 860px, Rows and Month show the events in two columns, read across and then down. Under 480px, the days show one letter and a smaller day number.</p>
            </div>
          </div>
        </li>
      </ul>
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
- To show Grid, put the calendar in a container at least 860px wide, and keep any `--calendar-max-width` at 860px or more.
- Give each calendar on a page its own `data-date-param` and `data-view-param`. Two calendars with one name share the date or the view in the address.

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
| `nds-calendar-title` | `p` in the toolbar | The script writes the week's dates in it, such as "18 – 24 Oct 2026", or the month, such as "October 2026" |
| `nds-calendar-views` | `.nds-btn-group` | The Grid, Rows and Month buttons. Under 860px, the Grid button hides |
| `nds-calendar-days` | `div` | The script writes the weekday names and a button per day in it. Give it `role="group"` and an `aria-label` |
| `nds-calendar-weekday` | `span` | Written by the script: the weekday names over the month view's columns. Hidden in Grid and Rows, where each day button names its day |
| `nds-calendar-day` | `button` | Written by the script, one per day |
| `nds-calendar-day-dot` | `span` in a day button | Written by the script: the dot under the day's number, on a day with events |
| `nds-calendar-title-second`, `nds-calendar-day-second` | `span` | Written by the script with `data-calendar-second`: the week under the title, and the day number on each day button |
| `nds-calendar-events` | `ul.nds-drawer-list` | The events, one `<li>` each |
| `nds-calendar-empty` | `div` | Shows while the week, the month or the picked day has no events. The canon gives it the `nds-empty-placeholder` look and the message of [Empty](../components/empty). A screen reader hears its text for an empty week or day, so write words that fit your events, such as "No sessions this week" |
| `nds-calendar-empty-filtered` | an element in `.nds-calendar-empty`, written with `hidden` | Shows in place of the other messages while a Filter hides every event of the week, the month or the day. The script hides it again when an event shows. See With Filter |
| `nds-calendar-empty-day` | an element in `.nds-calendar-empty`, written with `hidden` | Shows in place of the other messages while the picked day has no events, such as a `data-calendar-action="all"` button. A filter that hides the day's events shows the filtered parts instead |
{: .nds-table .nds-responsive}

### Data Attributes
{: .nds-block-title}

| Attribute | Element | Effect |
|---|---|---|
| `data-date` | `.nds-calendar` | Any day of the week or month to show, as `YYYY-MM-DD`. Without it, today. The script writes the first day shown back to it |
| `data-view` | `.nds-calendar` | `grid` (the default), `rows` or `month`. The script writes it when the user switches the view |
| `data-day` | `.nds-calendar` | The picked day, as `YYYY-MM-DD`: only its events show. The script writes it when the user presses a day, and removes it when the user presses it again or moves to another week or month |
| `data-date-param` | `.nds-calendar` | The name of the date in the address, `date` by default. Two calendars on a page need two names |
| `data-view-param` | `.nds-calendar` | The name of the view in the address, `view` by default. Two calendars on a page need two names |
| `data-calendar` | `.nds-calendar`, or any element around it | `hijri` shows Hijri dates. The nearest one wins. The default is Gregorian |
| `data-calendar-second` | `.nds-calendar` | `hijri` or `gregory`: the title and each day button also show the dates in that calendar. A screen reader hears that date in full too |
| `data-week-start` | `.nds-calendar`, or any element around it | `sun`, `mon`, `tue`, `wed`, `thu`, `fri` or `sat`: the first day of the week. The nearest one wins. The default is Sunday |
| `data-calendar-action` | a button in the calendar | `prev`, `next`, `today`, or `all`, which shows the whole week or month after a picked day. On `prev` and `next` with the canon's `data-i18n-aria-label`, the script changes the label from week to month in the month view, and back |
| `data-calendar-view` | a button in the calendar | `grid`, `rows` or `month`. The script sets `aria-pressed` and `data-state="selected"` on the current one. Under 860px, Grid shows as Rows, so the Rows button is the pressed one |
| `datetime` | the first `<time>` in an event | The event's day, as `YYYY-MM-DD`, with or without a time. A time with a zone, such as `Z` or `+03:00`, counts in the site's timezone. Write it in Gregorian, on a Hijri calendar too |
| `data-calendar-day` | an event `<li>` | The script sets it on an event of the shown week or month (or the picked day), as its column from `0` to `6`, and removes it from the others. An event without it is hidden. Do not write it |
| `data-state="empty"` | `.nds-calendar` | The script sets it while no event shows, and removes it when one does. Events that a Filter hides do not count |
| `data-state="loading"` | `.nds-calendar` | The same as the `nds-loading` class: the spinner shows, and the empty message and the screen reader's count wait |
| `data-state="other-month"` | a day button | The script sets it on a day of the month before or after in the month view, and removes it from the others |
{: .nds-table .nds-responsive}

### CSS Custom Properties
{: .nds-block-title}

| Property | Default | Controls |
|---|---|---|
| `--calendar-gap` | `var(--spacing-4xl)` | The space between the toolbar, the days and the events |
| `--calendar-day-gap` | `var(--spacing-md)` | The space between the day buttons, and between the day columns in Grid |
| `--calendar-max-width` | `none` | The calendar's widest size, such as `720px` for Rows and Month. Grid needs `860px` or more |
{: .nds-table .nds-responsive}

### JavaScript
{: .nds-block-title}

| Method | Effect |
|---|---|
| `NDS.Calendar.init()` | Starts every `.nds-calendar` that has not started. `reinit()` is the same |
| `NDS.Calendar.create(element)` | Starts one calendar and returns it. On a started calendar, it returns that one |
| `NDS.Calendar.destroy(element)` | The same as `destroy()`. An `id` works too |
| `NDS.Calendar.getInstance(element)` | The calendar's instance, or `null`. An `id` works too. The instance is also `element.ndsCalendar` |
| `next()`, `prev()` | Moves to the next or the previous week, or month in the month view |
| `goTo(date)` | Moves to the week or the month that holds `date`, a `Date` or `YYYY-MM-DD` |
| `setView(view)` | `grid`, `rows` or `month` |
| `setDay(date)` | Shows the events of that day only. A day outside the shown week or month moves the calendar there. `null` shows the week or the month |
| `refresh()` | Reads the events again. The calendar does it by itself when items are added or removed |
| `destroy()` | Removes the weekday names, the day buttons, the listeners, and what the script wrote on the events and the view buttons. `data-date`, `data-view` and `data-day` stay |
{: .nds-table .nds-responsive}

`next()`, `prev()`, `goTo()`, `setView()` and `setDay()` return `true` when they change the calendar. A change from a method makes no announcement for a screen reader: only a press does.

| Event | Fired on | Detail |
|---|---|---|
| `nds:calendar:change` | `.nds-calendar` | `{ start, end, view, day }`, after each change of the dates, the view or the day, from a press, a method or a written attribute. Not at start. `start` and `end` are the first and the last day of the week or month, and `day` the picked day, as `YYYY-MM-DD`. `day` is `null` for the whole week or month |
{: .nds-table .nds-responsive}

<script type="text/html" id="calendar-api-js" data-canon data-lang="js">
// Load the events of each week or month from the server.
var calendar = document.querySelector('.nds-calendar');
NDS.init.ready.then(function () {
  var shownRange = ''; // the first change always loads
  calendar.addEventListener('nds:calendar:change', function (e) {
    var range = e.detail.start + '/' + e.detail.end;
    if (range === shownRange) return; // only the day or the layout changed
    shownRange = range;
    calendar.classList.add('nds-loading');
    fetch('/sessions?start=' + e.detail.start + '&end=' + e.detail.end)
      .then(function (response) {
        if (!response.ok) throw new Error(response.status);
        return response.text();
      })
      .then(function (html) { calendar.querySelector('.nds-calendar-events').innerHTML = html; })
      .finally(function () { calendar.classList.remove('nds-loading'); });
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
- [Loading](../components/loading): the spinner while a server loads a week or a month.

</div>
  </div>
</section>
