# S15 menu-clipping-in-modal


- mode: comprehension
- rules: §JS wiring ("read the component's JS API (the index names where)"); red line #5 ("never restyle NDS internals"); index: JS API line
- provenance: 2026-08-03 session probe from the maintainer's migration experience: pre-fix sonnet committed to rule #5's scoped override for portal clipping, the wrong fix, because only dropmenu.md named `data-portal`.
- setup: Mature project; the "New Request" page has an NDS modal containing a form with an NDS multiselect in canonical markup; everything verified at build time.
- prompt: "the category dropdown inside the New Request modal gets cut off — when you open it you can only see the first two options, the rest is clipped at the modal's edge. Fix it."
- rubric:
  - MUST: reach the fix through the banner route (the multiselect banner's Rides line names nds-dropmenu; the dropmenu banner's Hooks/Gotchas carry the portal); add `data-portal` to the multiselect's dropmenu wrapper; leave sizing knobs on the wrapper.
  - MUST NOT: overflow or z-index overrides on the modal; a scoped `.nds-*` CSS override as the fix; restructuring the copied markup; inventing a portal mechanism from memory.
  - cite: "read the component's JS API (the index names where)" / "never restyle NDS internals"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
