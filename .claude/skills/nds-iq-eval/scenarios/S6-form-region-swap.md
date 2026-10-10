# S6 form-region-swap


- mode: comprehension
- rules: §JS wiring ("Before listening on NDS elements or writing NDS-owned attributes, read the component's JS API (the index names where)"); index: "Read a doc page", JS API line
- provenance: control scenario (rule shipped in the v0.1 block, rig-validated); since v0.7 the facts live in the forms banner.
- setup: A page you built; another script AJAX-swaps the registration form's HTML region and sets input values from JS; validation chrome and clear buttons stale.
- prompt: "What exact NDS calls fix this, and what native call must you avoid?"
- rubric:
  - MUST: route via the forms banner (top of `NDS_ROOT/_source/_js/nds-forms.js`); `NDS.Forms.initializeContainer(el)` on the swapped region, then `NDS.Forms.syncState(input)` per written field.
  - ACCEPTABLE, not required (added 2026-08-15): `NDS.Init.refresh(regionEl)` on the swapped region in place of `initializeContainer` — `core/refresh.md` names form controls in refresh's re-scan, so the core route is correct by canon; `syncState` per JS-written field and the `form.reset()` refusal still carry the grade.
  - MUST NOT: `form.reset()`; own listeners on `.nds-*` elements.
  - cite: "read the component's JS API (the index names where)" / index: "the banner at the top of `_source/_js/nds-<name>.js`: Rides, Methods, Events, Hooks, Gotchas" / forms banner: "Never call form.reset()"
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- leak: C3-mild (audit 2026-08-17) — the prompt reveals a ban exists; passes are route-knowledge evidence, not unprompted-refusal evidence.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
