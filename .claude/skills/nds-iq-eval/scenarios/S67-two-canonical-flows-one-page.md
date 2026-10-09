# S67 two-canonical-flows-one-page


- mode: comprehension
- rules: §Composition cascade (parts match through the catalog; "Match by `use_when` across the template, example, and component catalogs, never by title"); red line #3 ("Keep every canonical part, in order."; "Edit a copied script point by point against its source; never rewrite it.")
- provenance: rig 6 (2026-08-14) corrections 2.1+2.2: the agent read `examples/sign-in.md` but never `examples/registration.md`, invented a Tabs switcher, and lost field spacing in a bare `.nds-form`.
- setup: Mature project; chrome `Built and Verified`. The plan's next row is the auth page. The project has its own username/password auth plus account creation, no SSO.
- prompt: "Build the login page — sign-in by default, plus a link that swaps to a create-account form on the same page, no navigation. Sketch the page skeleton first — both forms' wrappers and whatever makes the swap work, not the full fields."
- rubric:
  - MUST: route BOTH flows through the catalog (`Sign In` and `Registration` entries, each via `use_when`); take the swap mechanism from the examples themselves — sibling `.nds-card` blocks toggled with plain `[hidden]` by a small script; keep each form inside its card's content wrapper; trim the SSO path (the project has none, so it would be a dead control) and name the removal to the dev.
  - MUST NOT: reach for Tabs or Content Switcher as the flow switcher; treat the second flow as a design exercise once the first is routed; place a bare `.nds-form` in an unstyled wrapper as the layout container; write new swap JS from scratch; drop the SSO path silently.
  - cite: "list every UI part, and match each against the component catalog" / "Edit a copied script point by point against its source; never rewrite it." / examples script comment: "Plain [hidden] toggling: no NDS component swaps sibling cards"
- grading note: read-dependent (the mechanism lives in the example scripts) — scoped or solo runs only. Prompt gained the skeleton ask 2026-08-20 (SKILL.md's artifact-forcing rule); "the swap" restates the prompt's own world-state, the mechanism stays unnamed.
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE, ordinary judgment; trim candidate once the source is confirmed to carry it.
- baseline: PASS 2026-08-14 scoped (Claude Sonnet 5) — both examples found, [hidden] swap from the example's script. Predates the 2026-08-20 artifact ask; next run re-baselines.
