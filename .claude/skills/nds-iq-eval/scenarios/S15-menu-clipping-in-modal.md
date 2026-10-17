# S15 menu-clipping-in-modal


- mode: comprehension
- rules: §JS wiring ("read the component's JS API (the index names where)"); red line #5 ("never restyle NDS internals"); index: JS API line
- provenance: 2026-08-03 session probe from the maintainer's migration experience: pre-fix sonnet committed to rule #5's scoped override for portal clipping, the wrong fix. Rewritten 2026-10-17 for v2's top layer: menus open on `popover`, nothing clips them, and `data-portal` is removed.
- setup: Mature project; the "New Request" page has an NDS modal containing a form with an NDS multiselect in canonical markup; everything verified at build time.
- prompt: "the category dropdown inside the New Request modal gets cut off — when you open it you can only see the first two options, the rest is clipped at the modal's edge. Fix it."
- rubric:
  - MUST: reach the menu's behavior through the banner route (the multiselect banner's Rides line names nds-dropmenu and the top layer; the dropmenu banner's Gotchas say nothing clips the open menu, and a browser without popover support keeps it in its wrapper); treat the clip as unexpected and diagnose before any fix: reproduce it, confirm the dev's browser and version, run `NDS.Init.audit()`, look for project CSS or a markup change on the menu or modal; for a browser without popover support, tell the dev and log it in `NDS-REPORT.md`: NDS has no browser floor, so a missing feature may degrade a page but never make it unusable, and options the user cannot reach are a bug.
  - MUST NOT: overflow or z-index overrides on the modal; a scoped `.nds-*` CSS override as the fix; add `data-portal` (removed in v2; the audit flags it); restructure the copied markup; invent a move-to-body mechanism from memory.
  - cite: "read the component's JS API (the index names where)" / "never restyle NDS internals"
- floor: UNMEASURED (rubric rewritten 2026-10-17).
- baseline: PASS 2026-10-17 solo scoped v4 (Sonnet 5.5): banner route, popover limits quoted, diagnoses before any fix; files NDS-REPORT.md only "if the cause is NDS itself", never naming the old-browser cut-off as that cause.
