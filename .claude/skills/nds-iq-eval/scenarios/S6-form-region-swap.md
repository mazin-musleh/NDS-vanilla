# S6 form-region-swap


- mode: comprehension
- rules: §JS wiring ("Before listening on NDS elements or writing NDS-owned attributes, read the component's JS API (the index names where)"); index: "Read a doc page", JS API line
- provenance: control scenario (rule shipped in the v0.1 block, rig-validated); since v0.7 the facts live in the forms banner.
- setup: A page you built; another script AJAX-swaps the registration form's HTML region and sets input values from JS; validation chrome and clear buttons stale.
- prompt: "What exact NDS calls fix this?"
- rubric:
  - MUST: route via the forms banner (top of `NDS_ROOT/_source/_js/nds-forms.js`); `NDS.Forms.initializeContainer(el)` on the swapped region, then `NDS.Forms.syncState(input)` per written field.
  - ACCEPTABLE, not required (added 2026-08-15): `NDS.Init.refresh(regionEl)` on the swapped region in place of `initializeContainer` — `core/init.md` names form controls in refresh's re-scan, so the core route is correct by canon; `syncState` per JS-written field still carries the grade.
  - MUST NOT: `form.reset()` as the fix (it puts back the values the page shipped with, undoing what the script wrote); own listeners on `.nds-*` elements.
  - cite: "read the component's JS API (the index names where)" / index: "the banner at the top of `_source/_js/nds-<name>.js`: Rides, Methods, Events, Hooks, Gotchas" / forms banner: "Setting input.value from JS notifies nothing on its own: call syncState() or dispatch input/change."
- floor: UNMEASURED 2026-10-18 (prompt changed).
- baseline: UNMEASURED 2026-10-18 — prompt and key changed: NDS fields follow a native form reset since 64b9bb72, so the "native call to avoid" half is gone; re-run scoped.