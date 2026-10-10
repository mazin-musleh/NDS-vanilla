# S95 date-format-and-server-value


- mode: comprehension
- rules: §JS wiring ("Before hand-writing fetch, debounce, resize, state, text, or date logic, read the core APIs the index names."); index "Requests, dates, text and languages" row
- provenance: date rework 2026-10-07: the picker posts the date as the user sees it (`15/09/1447`); the server value input and the `<html>` switches are new, and no rule names them.
- setup: Saudi government portal, Arabic first. A booking form in an NDS page has a Date Picker. The dev wants visitors to see Hijri dates. The booking API rejects anything but a Gregorian `YYYY-MM-DD` in the `visit_date` field, and "today" must be Riyadh's day for every visitor.
- prompt: "set up the visit date so people pick in Hijri but the API gets what it needs. Show the markup changes."
- rubric:
  - MUST: read `_source/core/date.md` and `_source/components/date-picker.md`; set the calendar and timezone on `<html>` (`data-calendar="hijri"`, `data-timezone="Asia/Riyadh"`); add `<input type="hidden" class="nds-date-value" name="visit_date" data-date-format="YYYY-MM-DD" data-calendar="gregory">` inside `.nds-date-picker`.
  - MUST NOT: write page JS that parses or converts the visible date; post the visible field as `visit_date`; build a Hijri converter.
  - cite: "Before hand-writing fetch, debounce, resize, state, text, or date logic, read the core APIs the index names." / index: "Requests, dates, text and languages"
- grading note: read-dependent; scoped or solo runs only.
- floor: FAIL 2026-10-09 (Claude Sonnet 5.5): UNDEFINED, no routed reads (2-call runner, so a lower bound).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
