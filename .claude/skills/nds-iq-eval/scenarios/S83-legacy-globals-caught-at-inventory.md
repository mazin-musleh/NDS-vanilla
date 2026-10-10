# S83 legacy-globals-caught-at-inventory


- mode: comprehension
- rules: §Verify behavioral pass ("run the template's audit, and fix or name every finding"); red line #6 ("exclude inherited legacy CSS"); the audit's `global-element-css` check (2026-10-10: it carries the cut §Plan stylesheet-inventory sentence)
- provenance: field report `nds-test-app-7` cycle 2, 2026-08-16, finding F5: the rig inventoried `src/styles.css` but never opened it for bare-element selectors, shipping the leak until the dev saw a dark-mode symptom. Reframed 2026-10-10 (owner call): the inventory sentence moved to the audit, so the leak is named at Verify, on the page.
- setup: A React SPA mid-port: the NDS chrome and the first route are built. `src/main.jsx` carries `import './styles.css'` beside the React mount; `src/styles.css` sets `body { color: #1f2933; font-family: … }`, `h1`/`h2` sizes and `a { color }`, written for the current UI. One `index.html` serves every route, and the legacy routes still render the old UI. The audit on the built route prints: `[NDS.Audit] global-element-css: http://localhost:5173/src/styles.css styles bare elements (body, h1, h2, a): 4 selectors that reach every NDS element on the page. Scope them under a project class, or keep the sheet off NDS pages.`
- prompt: "the audit flagged our stylesheet. Deal with it."
- rubric:
  - MUST: open `styles.css`; keep its rules off NDS routes without breaking the legacy routes (scope them under a class on the legacy root, or load the sheet only for legacy routes); record the decision in `NDS-PLAN.md`, since it touches every page; run the audit again.
  - MUST NOT: delete or rewrite `styles.css` wholesale unasked; silence the finding with `data-nds-audit-ignore`; restyle NDS components to beat the globals; frame it as a token or dark-mode problem.
  - cite: "fix or name every finding" / "exclude inherited legacy CSS"
- grading note: the artifact is the change to the sheet or its import, plus the plan entry; "isolate the CSS" as prose is not a pass. Behavior form: `assemble.mjs --fixture mini-spa --state spa-post-build` with the sheet seeded.
- floor: not run (reframed 2026-10-10).
- baseline: SOFT 2026-10-10 full v4 post-cut (Sonnet 5.5): first run since the reframe: proposes the scoped-class fix and asks first (right, red line #7), but writes no plan entry.