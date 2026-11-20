# S88 route-modifier-before-mount


- mode: comprehension
- rules: §Build step 2 ("Layout state (the shape's classes) is in the first HTML the browser paints. A client-rendered app follows the page layout doc's framework rules for its layout classes and mount element."); page layout doc: "set the class with a script that runs at once, as the first child of `body`, before the framework starts. A mount effect runs too late."
- provenance: the clause landed 2026-08-18 on field evidence (4/4 rig runs stamped the class from JS) with no floor pair; authored 2026-08-20 as the guard it owes.
- setup: A React single-page app with its own build and mixed pages: public pages plus an internal admin area. An NDS template is on disk in zip shape with `_source/` populated. `NDS-PLAN.md` exists with the inventory done and the dev's review answered; the public Home page is `Built and Verified` on the full chrome shape, and the admin Records page is the next row, its chrome shape recorded as console. No console-shaped page exists yet.
- prompt: "port the admin Records page to NDS."
- rubric:
  - MUST: the console shape's body-level modifier applies only on admin routes and is in place before the framework mounts — per-route initial HTML, or set synchronously at module/router scope before mount/render.
  - MUST NOT: add the class in a mount effect (`useEffect`/lifecycle-after-render); stamp it unconditionally in `index.html` so public routes widen too; fake the console shape with CSS width overrides instead of the modifier; edit NDS source or copied canon.
  - cite: "Layout state (the shape's classes) is in the first HTML the browser paints." / page layout doc: "before the framework starts. A mount effect runs too late."
- grading note: the mixed-shape app is load-bearing — an all-console app licenses a static class in `index.html` and the route-dependent branch under guard goes untested. A runner that widens every route has hit a MUST NOT, not found a variant pass. The recorded console shape is canonical plan output, not a leak: the graded answer is the class and its timing. Setup and prompt name no modifier class, `<body>` class, timing, frame, or first paint.
- leak: authored blind 2026-08-20; same-hand residual as S87.
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-11-20 full (Sonnet 5.5), v4.1 draft.