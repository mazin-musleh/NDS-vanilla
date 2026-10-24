# Calendar: one week of events, as a grid or as rows

Owner decisions (2026-10-24): a new component plus an example page · one week, not a month · the weekday buttons filter the calendar's own events, not a separate results list · the week start is a setting, not fixed · shared logic may move out of the existing components and JS as needed.

**Why a component.** The week grid needs CSS that no page should own, and week stepping plus Hijri days need JS that every user of it would copy.

**Not the goal:** a month view, an hour axis (Google-style time slots), multi-day bars, drag to move. Each is a `ponytail:` line in the banner.

---

## Shape

The page writes events as a plain list. With no JS it reads as rows, which serves server pages and screen readers. The script never moves the author's nodes (a framework host owns them): it stamps attributes, and CSS draws both layouts from the same list.

```html
<div class="nds-calendar" data-view="grid">
  <div class="nds-calendar-head">week title · previous / this week / next · Grid | Rows button group</div>
  <div class="nds-calendar-days"><!-- the script writes 7 toggle buttons: "Sun 18" … --></div>
  <ul class="nds-calendar-events">
    <li class="nds-calendar-event">
      <a href="#" class="nds-btn nds-subtle">
        <time class="nds-date-tile" datetime="2026-10-20T09:00">…</time>
        <span class="nds-drawer-item">title · meta (time, place)</span>
      </a>
    </li>
  </ul>
</div>
```

- **The day of an event** is the first `time[datetime]` inside it. The script stamps its column in the shown week (`data-calendar-day="0"`…`"6"`, relative to the week start) and leaves the stamp off events outside the week. CSS hides an event with no stamp.
- **Grid:** the list is a 7-column grid. Each stamp sets `grid-column` (seven fixed rules, not an open-ended loop) and `grid-auto-flow: dense` stacks a day's events in its column. The date tile hides, because the column names the day. The day buttons are the column heads.
- **Rows:** an agenda, one drawer row per event with its date tile (the student portal's "Key dates" look).
- **Day buttons:** `aria-pressed` toggles. A tap shows that day only (the script removes the other stamps). A second tap shows the week. In the grid, a picked day's events span all 7 columns.
- **Narrow:** the root is a named container. Below one width point the grid reflows to rows, and the day buttons stay as the filter strip.
- **Order:** events sort by their `datetime` within a day through CSS `order`, which the script stamps. The DOM order stays as written.
- **Today:** `aria-current="date"` on today's button.
- **Empty:** a week or a picked day with no events shows [Empty](../components/empty.md).

**State round-trips** (Framework Hosts contract): `data-view` (`grid` | `rows`), `data-week` (any day in the week, `YYYY-MM-DD`), `data-day` (the picked day, or none). The script writes them, and markup or a host can write them back. `el.ndsCalendar`, `create(el)` stands alone, and `destroy()` removes every stamp. `refresh()` reads the events again after a host or a server swaps them.

**Event:** `nds:calendar:change` with `{ week, view, day }` after each step, view switch or day pick. A server loads that week's events on it, then calls `refresh()` (NDS = UI + event API).

**Bundle:** delegated if the rows-to-grid swap at init shows no shift. Otherwise either hold the grid region with the `data-nds-loaded` pattern (crit hides it until the init stamp lands) or keep it in main. Measure it, don't guess.

**Words** (`_i18n/` packs): previous week, next week, this week, grid, rows, the empty message. `node scripts/check-i18n.mjs`.

---

## Shared logic moves (core ← base ← component)

`NDS.Date` (core) gains what the picker keeps privately today and the calendar also needs. Names are checked against PERSONA entries 10 and 12 when built:

| New in `NDS.Date` | From |
|---|---|
| day/month/year parts of a Date in a calendar | picker's `toHijri` |
| a Date from parts in a calendar | picker's `fromHijri`, without the stamp (the stamp stays the picker's own) |
| month length in a calendar | picker's `getHijriMonthLength` |
| the nearest `data-week-start` (default Sunday) | new |
| the first day of a date's week, for a week start | new; the picker's grid offset and the calendar's week both use it |
| `getWeekdayNames(lang, weekStart)` rotated | today it is always Sunday first |

**Week start:** `data-week-start` on any element (`<html>` sets the site), nearest wins, like `data-calendar`. Values: `sun mon tue wed thu fri sat`. A bad value warns in the console and falls back to Sunday. The default stays Sunday, so no current page changes.

**Date Picker takes it too:** the weekday header and the grid offset follow `data-week-start`. Check that keyboard moves within the grid (row start and end, up and down a week) still land on the right day with a rotated week.

**Rename for the name:** the picker's generated `.nds-calendar-*` parts become `.nds-date-picker-*`, so `.nds-calendar` is free. The script writes them and no consumer does, so no Migration row (per the migration scope rule). Grep `scripts/`, the docs and `_sass/` for every reference first.

---

## Steps (one commit each, each with its doc lines and its `[Unreleased]` line)

1. **Move the helpers into `NDS.Date`**, and the picker calls them. No behaviour change. Checks: `node scripts/check-date.mjs`, `check-typing.mjs`, `check-filter-dates.mjs`, both engines. **Done 2026-10-24:** `toParts`, `fromParts`, `getMonthLength` (the picker's `D M YYYY` string round-trip is gone, and so is the clock's). All three checks pass, `check-date` in both engines, and a Hijri picker shows the right day count over 24 months.
2. **Week start** in `NDS.Date` and the picker. Docs: `core/date.md`, `components/date-picker.md` (a Data Attributes row, and a builder option if it fits). **Done 2026-10-24:** `getWeekStart(el)`, `getStartOfWeek(date, weekStart)`, `getWeekdayNames(lang, weekStart)`. The picker offsets its 42 cells; Home/End were already index-based. The builder has a Week start group (Sunday, Saturday, Monday).
3. **Picker class rename** `.nds-calendar-*` → `.nds-date-picker-*`. Checks: `ruby _plugins/js_processor.rb`, `python scripts/check-css.py`, the picker checks from step 1.
4. **Calendar, Phase 1:** `_sass/components/_calendar.scss`, `_js/nds-calendar.js` (banner, PERSONA canon), the `@use` in `nds-main.min.scss`, a loader entry, tested in `playground.md` in both layouts, RTL and LTR, Hijri, a Saturday and a Monday week start, light and dark.
5. **Calendar, Phase 2:** `components/calendar.md` through `/nds-doc`, `_data/sidemenu/sidemenu.yml`, `_data/catalog.yml`.
6. **Example:** a weekly class timetable page in `examples/`. The student portal's "Full timetable" link opens it.
7. **Release checks:** `check-a11y.mjs` on the doc and example pages, `check-data-state-tails.py`, `check-css.py`, `check-js-rules.mjs`, the bundle-once check, WebKit on the calendar pages.
