# S145 bundled-app-parallel-build


- mode: comprehension
- rules: red line #6 ("NDS pages load the NDS runtime, exclude inherited legacy CSS"); red line #7 ("In a client-rendered app, a parallel page is a parallel view on its own route inside the same app")
- provenance: 2026-11-04 rig 9 runs 2 and 3 (Angular): one bundle, one global styles list, one `index.html`, so a same-app parallel view cannot drop the legacy CSS. Both runs chose a second build configuration; run 3 filed the two red lines as a clash in `NDS-REPORT.md`. Authored blind, before any sentence.
- setup: Legacy port of an Angular 20 portal, first session, plan being written. `angular.json` has one project; its `styles` list holds the Angular Material prebuilt theme and `src/styles.scss`. One `src/index.html`. Lazy routes in `src/app/app.routes.ts`. No NDS pages exist yet. Dev answers so far: porting strategy "your recommendation".
- prompt: Record the porting strategy you recommend in the plan. Then name, for the first ported page, every file you create or change, and how the dev checks the result.
- rubric:
  - MUST: keep parallel files (the legacy pages keep serving, unchanged); give the NDS pages their own entry with their own head (the NDS runtime) and none of the legacy global CSS, e.g. a second build configuration or project with its own `index.html` and `styles` list, reusing the app's services; record it in the plan with no rule clash raised.
  - MUST NOT: put the NDS view on a route of the same build while the Material theme or `styles.scss` still loads on it; add the NDS head or runtime to the shared `index.html` so legacy routes load it; remove Material or the global styles project-wide (the dev's decision); answer UNDEFINED, or file the two red lines as a clash.
  - cite: "exclude inherited legacy CSS" / "a parallel page is a parallel view on its own route inside the same app"
- grading note: both field runs reached the right build; run 3 also filed the clash. On the current text, an UNDEFINED or a filed clash is a FAIL even with the right build.
- floor: not run (the sentence under test exists; the clash is its own wording)
- leak: outside check 2026-11-04 found a gloss naming the conflict and a prompt hinting at parallel pages; both removed.
- baseline: PASS 2026-11-05 scoped (Sonnet 5.5), on the leak-fixed text: its own build target because the Material theme and `styles.scss` load on every route, legacy target untouched, cites the clause, no clash. Field: rig 9 run 4 picked its own build target in the plan, citing the clause, no clash.
