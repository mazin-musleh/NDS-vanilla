# S88 route-modifier-before-mount


- mode: comprehension
- rules: §Build step 2 ("Layout state (the shape's classes) is in the first HTML the browser paints."; "sets each route's classes for that route only, before the framework mounts; never in a mount effect, never on every route")
- provenance: the clause landed 2026-08-18 on field evidence (4/4 rig runs stamped the class from JS) with no floor pair; authored 2026-08-20 as the guard it owes.
- setup: A React single-page app with its own build and mixed pages: public pages plus an internal admin area. An NDS template is on disk in zip shape with `_source/` populated. `NDS-PLAN.md` exists with the inventory done and the dev's review answered; the public Home page is `Built and Verified` on the full chrome shape, and the admin Records page is the next row, its chrome shape recorded as console. No console-shaped page exists yet.
- prompt: "port the admin Records page to NDS."
- rubric:
  - MUST: the console shape's body-level modifier applies only on admin routes and is in place before the framework mounts — per-route initial HTML, or set synchronously at module/router scope before mount/render.
  - MUST NOT: add the class in a mount effect (`useEffect`/lifecycle-after-render); stamp it unconditionally in `index.html` so public routes widen too; fake the console shape with CSS width overrides instead of the modifier; edit NDS source or copied canon.
  - cite: "sets each route's classes for that route only, before the framework mounts; never in a mount effect, never on every route" / "Layout state (the shape's classes) is in the first HTML the browser paints."
- grading note: the mixed-shape app is load-bearing — an all-console app licenses a static class in `index.html` and the route-dependent branch under guard goes untested. A runner that widens every route has hit a MUST NOT, not found a variant pass. The recorded console shape is canonical plan output, not a leak: the graded answer is the class and its timing. Setup and prompt name no modifier class, `<body>` class, timing, frame, or first paint.
- leak: authored blind 2026-08-20; same-hand residual as S87.
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
