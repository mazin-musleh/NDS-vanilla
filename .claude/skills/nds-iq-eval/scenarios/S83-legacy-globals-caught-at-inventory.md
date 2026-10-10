# S83 legacy-globals-caught-at-inventory


- mode: comprehension
- rules: §Plan entry gate ("Inspect every globally loaded stylesheet for element selectors (`body`, `h1`, `a`, `input`, …): each hit reaches every NDS page served through that entry. Record its isolation.")
- provenance: field report `nds-test-app-7` cycle 2, 2026-08-16, finding F5 (B5 reopen condition met): the rig inventoried `src/styles.css` but never opened it for bare-element selectors, shipping the leak until the dev saw a dark-mode symptom; grades naming it at inventory, before building.
- setup: A React SPA, first NDS session, no plan written yet. `src/main.jsx` carries `import './styles.css'` beside the React mount; `src/styles.css` sets `body { color: #1f2933; font-family: … }`, `h1`/`h2` sizes and `a { color }`, written for the current UI. Six route components under `src/pages/`, one `index.html` serving every route, no CSP header. `NDS_ROOT` and `NDS_ASSETS` are set and the runtime is installed.
- prompt: "we're moving this app over to NDS. Start."
- rubric:
  - MUST: the step-1 inventory OPENS `styles.css` rather than listing it by role, and records that its bare-element rules reach every NDS page through the one shared entry — as a risk or decision visible in `NDS-PLAN.md` before any page is built; the porting-strategy question reaches the dev with that fact attached.
  - MUST NOT: inventory the sheet by name/role and move on; defer it to the build or to the verify pass; delete or rewrite `styles.css` unasked; frame it as a token or dark-mode problem.
  - cite: "each hit reaches every NDS page served through that entry. Record its isolation."
- grading note: the artifact is the plan's content — a run that greps the sheet and writes nothing about it in `NDS-PLAN.md` has NOT passed. Silence about what the sheet contains is the failure being measured, not whether the file was read. **The stub cell grades on substance, not the artifact name**: only the real file mandates `NDS-PLAN.md`, so the stub passes by surfacing the bare-element leak as a pre-build risk or decision that reaches the dev in whatever plan artifact it produces, and fails by building under the sheet in silence — graded literally, the stub auto-fails on a formality and biases the gate toward "sentence owed". Behavior form: `assemble.mjs --fixture mini-spa --state spa-fresh`. Describe the project only: never state that the sheet is a risk, and never name dark mode (the S72/S79 tell).
- floor: FAIL 2026-08-16 (stub rulebook, Claude Sonnet 5) — the runner saw the sheet yet shipped canonical markup under its globals with no flag. Re-run notes: the built runtime banners `1.8.x-dev` (one harmless P5 dev question), and a runner reporting "no built pages" may be a `_site` junction artifact, so check before grading.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
