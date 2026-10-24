# Calendar: one week of events, as a grid or as rows

Owner decisions (2026-10-24): a new component plus an example page · one week, not a month · the weekday buttons filter the calendar's own events, not a separate results list · the week start is a setting, not fixed · shared logic may move out of the existing components and JS as needed.

**Why a component.** The week grid needs CSS that no page should own, and week stepping plus Hijri days need JS that every user of it would copy.

**Not the goal:** a month view, an hour axis (Google-style time slots), multi-day bars, drag to move. Each is a `ponytail:` line in the banner.

---

## Shape

The page writes events as a plain list. With no JS it reads as rows, which serves server pages and screen readers. The script never moves the author's nodes (a framework host owns them): it stamps attributes, and CSS draws both layouts from the same list.

```html
<div class="nds-calendar" data-view="grid">
  <div class="nds-toolbar">start: .nds-calendar-title · end: previous / today / next group, Grid | Rows group (.nds-calendar-views)</div>
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
- **Order:** the author writes events in time order; a day stacks them as written.
- **Day buttons (owner, 2026-10-24):** `nds-btn nds-subtle nds-indicator`, as main nav's links, with main nav's colors: the picked day is main nav's current item (primary fill, oncolor text). Today: `aria-current="date"` and a `--border-primary` border, the Date Picker's ring for today. Not a button group (tried: neither outline nor subtle read right).
- **Both views stay (owner, 2026-10-24):** rows read better, but the grid shows busy and free days at a glance.
- **Grid look:** events are stroke-card surfaces; faint day lines run from the line under the day names; a picked day spans the grid and drops the lines. A grid card keeps its tag floating with a gap under it, steps its padding to `--spacing-sm`, sets its title in SM medium and a default meta in Meta's SM step through the new `meta-sm` mixin (owner, 2026-10-24: a deliberate exception to "never shrink reading text", as a day column is about 120px wide).
- **Empty:** a week or a picked day with no events shows `.nds-calendar-empty`, which wears Empty's `.nds-empty-placeholder` look. Not the Empty script: it counts children, not shown ones, and teaching it that is a workaround (owner, 2026-10-24: reuse only where it fits cleanly).
- **Reuse review (2026-10-24):** Toolbar for the head (clean fit). Not Content Switcher (a tab set of panels), not Date Tile in the day buttons (seven filled boxes), not a Card for grid events (one markup serves both layouts).
- **Second date (owner, 2026-10-24, from the Full Calendar mockup):** `data-calendar-second="hijri|gregory"` adds the other calendar's week under the title (owner: small) and its day number under each day button (aria-hidden; the button's description names that date in full). The calendar writes its dates again when the language pack lands, so Hijri month names show in Arabic. The mockup's month view, category colours, day pop-up and weekend shading were skipped.
- **Width:** the grid needs 860px of calendar; under it the calendar shows rows and hides `.nds-calendar-views`. Under 480px the day buttons show initials.

**State round-trips** (Framework Hosts contract): `data-view` (`grid` | `rows`), `data-week` (any day in the week, `YYYY-MM-DD`), `data-day` (the picked day, or none). The script writes them, and markup or a host can write them back. A host's new `data-week` wins: a picked day outside it drops. A new `data-day` moves to its week. `el.ndsCalendar`, `create(el)` stands alone, and `destroy()` removes every stamp. `refresh()` reads the events again after a host or a server swaps them.

**Entries (owner, 2026-10-24):** the `<li>` list is the only input: a server writes all weeks, or sends one week on `nds:calendar:change` (`nds-loading` on the calendar while it waits, owner 2026-10-24: the Loading spinner. No skeleton: the Drawer's skeleton of the old events drew a week that was not coming and nothing for an empty one, and drawn placeholders of the view were tried and did not look right. The calendar holds the empty message and the announcement; the class or the `loading` token, through `NDS.state.onToggle` as Form does), or an app renders the items; the calendar reads them again by itself. Insert in time order (screen readers read the DOM). The week stays in `?week=` by default, as Filter's state does (owner, 2026-10-24: a setting nobody sees in a preview should be the default); `data-week-param` renames the key, no off switch, as Filter (read once at load, before `data-week`; the opening week drops it; replaceState). Pagination stays opt-in: its fixed `page` key would collide on pages with two paged lists, and it shipped opt-in in v1.12.0. A Filter on the same list (`data-filter-items="li"`, marks in the rows) composes: the empty message ignores `data-filtered` events. With a Filter, show its applied-chips row (`nds-filter-applied`) in the calendar's toolbar, so a filtered-out day explains itself (owner, 2026-10-24). Calendar's own canon stays Filter-free. No JSON API: the doc shows JSON mapped to items.

**Screen readers (2026-10-24):** the grid hides each event's date tile visually only (`label-hidden`), so an event keeps its day. A press on a day or a week button announces the day or the week and its count through `NDS.announce` (debounced 400 ms, so quick presses say the last one; it waits while the calendar has `nds-loading`); script calls stay silent, and the title has no `aria-live`. Spoken dates use NDS.Date's month names, not Intl's Hijri names, which differ by browser. Words: `calendar.events` (plural). An empty week says the page's own `.nds-calendar-empty` text (owner, 2026-10-24: the message stays agnostic; the canon uses Empty's `empty.message`). Arrow keys across the days (owner, 2026-10-24, for consistency with the Date Picker): one Tab stop, arrows and Home/End move. A Hijri date ends in the era word, and spoken days come from `NDS.Date.getDayLabel`, which the Date Picker uses too.

**Event:** `nds:calendar:change` with `{ week, view, day }` after each step, view switch or day pick. A server loads that week's events on it, then calls `refresh()` (NDS = UI + event API).

**Bundle:** main, critical: the grid needs the stamped columns before the reveal, or the rows-to-grid swap shifts the page.

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
3. **Picker class rename** `.nds-calendar-*` → `.nds-date-picker-*`. Checks: `ruby _plugins/js_processor.rb`, `python scripts/check-css.py`, the picker checks from step 1. **Done 2026-10-24:** 11 names in the JS, 12 in the SCSS, nothing else in the repo named them. A Changed line in the changelog, since v1.12.0 shipped them; no Migration row (the script builds them).
4. **Calendar, Phase 1:** `_sass/components/_calendar.scss`, `_js/nds-calendar.js` (banner, PERSONA canon), the `@use` in `nds-main.min.scss`, a loader entry, tested in `playground.md` in both layouts, RTL and LTR, Hijri, a Saturday and a Monday week start, light and dark. **Done 2026-10-24, uncommitted:** main bundle, critical (+1.8 KB gz). Found while building: shared grid rows left gaps under a tall event, so the grid has 1px rows and each event spans its own height (`NDS.onElementResize`, `--_calendar-rows`); grid events take the card surface and border (meta text failed contrast on `--background-neutral-light`); a calendar under 480px shows weekday initials (Arabic short names are whole words); `NDS.Date.readDay` is public; the catalog entry landed here because `check-banners.mjs` fails the build without it, so steps 4 and 5 commit together. Checks: `tmp/calendar/behave.mjs` (day filter, views, steps, host writes, added events, keys, destroy, mount, warning) in Chrome and WebKit, `check-a11y` on the playground 0 findings, `check-css`, the state tails.
5. **Calendar, Phase 2:** `components/calendar.md` through `/nds-doc`, `_data/sidemenu/sidemenu.yml`, `_data/catalog.yml`. **Done 2026-10-24, uncommitted:** two canons (Calendar, With Filter), 12 builder options. A checker agent found the calendar collapsed to 0px in a centering parent (the doc preview): `inline-size: 100%` on the root. A cold-read agent's gaps went into the page (destroy keeps the state attributes, events fire from methods but not at start, `datetime` stays Gregorian, Filter needs `NDS.init.refresh` after a swap).
6. **Example:** dropped for now (owner, 2026-10-24); find a better home later. Tried: a standalone Academic Calendar page (it showed nothing the doc's With Filter canon does not) and a This Week section in the Student Portal (the portal already holds today's classes, exams and key dates, so a third date section unbalanced it). A calendar earns a place where it replaces a list, not where it adds one. Kept from the try: the calendar writes each event's Date Tile from its `datetime` with the NDS.Date helpers, in its calendar and language (owner: the markup's text is the no-script copy; a long month truncates like any long text).
7. **Release checks:** `check-a11y.mjs` on the doc and example pages, `check-data-state-tails.py`, `check-css.py`, `check-js-rules.mjs`, the bundle-once check, WebKit on the calendar pages. **Done 2026-10-24:** all clean. check-a11y on the calendar, Date Picker, Date and playground pages, Chrome and Safari, 0 findings; check-data-state-tails, check-css, check-js-rules and --names (0 findings; the 4 left to verify are judged: a style read on an arrow key, an init loop over few calendars, and two picker loops from July), check-banners, check-i18n, check-docs; check-bundle-once; check-date, check-typing and check-filter-dates in both engines; the calendar harnesses in both engines; run-audit 0 warnings.
8. **Group audit** (`/nds-js-audit @dates architecture`, 2026-10-24): committed in `b500e228`, each fix A/B tested in Chrome (the old bundles fail, the new pass). Calendar: a host's new `data-week` while a day was picked was ignored, so `_readState` now follows the written week; the day buttons name their days from the shown week, since a `data-week-start` changed after load misnamed them on the next refresh. Shared: `data-calendar="gregorian"` (the 1.x name) made Intl throw, so the calendar never built; `NDS.Date` now warns and uses gregory. `readDay` rejects `2026-13-05`. A failed AJAX Filter put back the whole address and dropped `?week=`; it now restores only its own keys. The new seams are in `GROUPS.md` `@dates`.
