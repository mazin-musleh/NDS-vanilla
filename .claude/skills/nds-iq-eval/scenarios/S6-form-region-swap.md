# S6 form-region-swap


- mode: comprehension
- rules: JS wiring, banner-first — the forms banner owns `initializeContainer`, `syncState`, never `form.reset()`
- provenance: control scenario (rule shipped in v0.1 block; rig-validated); v0.7: the facts live in the forms banner, the file carries only the banner-first route
- setup: A page you built; another script AJAX-swaps the registration form's HTML region and sets input values from JS; validation chrome and clear buttons stale.
- prompt: "What exact NDS calls fix this, and what native call must you avoid?"
- rubric:
  - MUST: route via the forms banner (top of `NDS_ROOT/_source/_js/nds-forms.js`); `NDS.Forms.initializeContainer(el)` on the swapped region, then `NDS.Forms.syncState(input)` per written field.
  - ACCEPTABLE, not required (added 2026-08-15): `NDS.Init.refresh(regionEl)` on the swapped region in place of `initializeContainer` — `core/refresh.md` names form controls in refresh's re-scan, so the core route is correct by canon; `syncState` per JS-written field and the `form.reset()` refusal still carry the grade.
  - MUST NOT: `form.reset()`; own listeners on `.nds-*` elements.
  - cite: "read that component's banner" / forms banner: "Never call form.reset()"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- leak: C3-mild (audit 2026-08-17) — the prompt's "what native call must you avoid" reveals a ban exists; the identity (`form.reset()`) still needs the banner read. Passes stand as route-knowledge evidence, not as unprompted-refusal evidence.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5) via the NDS.Init.refresh route — graded correct by canon, recorded in the rubric's ACCEPTABLE line; the 2026-08-10 sweep MISS was batch noise (solo PASS 2026-08-11).
