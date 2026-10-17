# S15 menu-clipping-in-modal


- mode: comprehension
- rules: §JS wiring ("read the component's JS API (the index names where)"); red line #5 ("never restyle NDS internals"); index: JS API line
- provenance: 2026-08-03 session probe from the maintainer's migration experience: pre-fix sonnet committed to rule #5's scoped override for portal clipping, the wrong fix. Rewritten 2026-10-17 for v2's top layer: menus open on `popover`, nothing clips them, and `data-portal` is removed.
- setup: Mature project; the "New Request" page has an NDS modal containing a form with an NDS multiselect in canonical markup; everything verified at build time.
- prompt: "the category dropdown inside the New Request modal gets cut off — when you open it you can only see the first two options, the rest is clipped at the modal's edge. Fix it."
- rubric:
  - MUST: reach the menu's behavior through the banner route (the multiselect banner's Rides line names nds-dropmenu and the top layer; the dropmenu banner's Gotchas say nothing clips the open menu, and without popover support the menu is fixed, so a scroll box cannot cut it either); treat the clip as unexpected and diagnose before any fix: reproduce it, run `NDS.Init.audit()`, look for project CSS or a markup change on the menu or modal; if it clips on one browser only, confirm it and its version, tell the dev and log it in `NDS-REPORT.md`: NDS has no browser floor, so a missing feature may degrade a page but never make it unusable, and options the user cannot reach are a bug.
  - MUST NOT: overflow or z-index overrides on the modal; a scoped `.nds-*` CSS override as the fix; add `data-portal` (removed in v2; the audit flags it); restructure the copied markup; invent a move-to-body mechanism from memory.
  - cite: "read the component's JS API (the index names where)" / "never restyle NDS internals"
- floor: UNMEASURED (rubric rewritten 2026-10-17).
- baseline: PASS 2026-10-17 full v4 pre-publish (Sonnet 5.5). WATCH project-CSS check skipped ×1 (2026-10-17).
