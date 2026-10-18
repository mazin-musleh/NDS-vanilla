# S6 form-region-swap


- mode: comprehension
- rules: §JS wiring ("Before listening on NDS elements or writing NDS-owned attributes, read the component's JS API (the index names where)"); index: "Read a doc page", JS API line
- provenance: control scenario (rule shipped in the v0.1 block, rig-validated); since v0.7 the facts live in the forms banner.
- setup: A page you built; another script AJAX-swaps the registration form's HTML region and sets input values from JS; validation chrome and clear buttons stale.
- prompt: "What exact NDS calls fix this?"
- rubric:
  - MUST: route through the index to the forms facts (the forms banner at the top of `NDS_ROOT/_source/_js/nds-forms.js`, or the Forms doc page) and, for the swap, to `core/init.md`; restart the swapped region with an NDS call, then `NDS.Forms.syncState(input)` (or `NDS.setValue`) per field the script wrote.
  - ACCEPTABLE, any one of: `NDS.Init.destroy(region)` before the swap and `NDS.Init.mount(region)` after it (`core/init.md` HTML Swaps, the documented route); `NDS.Forms.initializeContainer(el)` on the swapped region; `NDS.Init.refresh(regionEl)` (init.md warns it alone can start a second instance on a morph).
  - MUST NOT: `form.reset()` as the fix (it puts back the values the page shipped with, undoing what the script wrote); own listeners on `.nds-*` elements.
  - cite: "read the component's JS API (the index names where)" / index: "the banner at the top of `_source/_js/nds-<name>.js`: Rides, Methods, Events, Hooks, Gotchas" / forms banner: "Setting input.value from JS notifies nothing on its own: call syncState() or dispatch input/change."
- floor: UNMEASURED 2026-10-18 (prompt changed); run before any trim.
- baseline: PASS 2026-10-18 scoped (Sonnet 5.5) — destroy + mount around the swap and `syncState` per written field, routed via the index to init.md and forms.md.