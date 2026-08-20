# S88 route-modifier-before-mount


- mode: comprehension
- rules: §Build step 2's layout-modifier clause: "Layout-affecting modifier classes must be present in the initial HTML: `nds-full-width` on `<body>`, `nds-wSideMenu` on the layout, and all modifiers listed in `_source/layout/page-shell.md`. Adding one after mount costs a frame at the wrong shape. Route-dependent classes must be set synchronously before framework mount, not in a mount effect."
- provenance: the clause landed 2026-08-18 on field evidence (4/4 rig runs stamped the class from JS) with no floor pair — nothing failed if it was trimmed. S84's behavior run confirmed the route-dependent branch works (the runner set `nds-full-width` at module scope and quoted the rule), but that run graded S84. This scenario is the guard the clause owes; authored 2026-08-20 from the TODO item.
- setup: console-route variant of S87's `mini-spa` shape, described in prose (comprehension never assembles it). A React single-page app with its own build and mixed pages: public pages plus an internal admin area. An NDS template is on disk in zip shape with `_source/` populated. `NDS-PLAN.md` exists with the inventory done and the dev's review answered; the public Home page is `Built and Verified` on the full chrome shape, and the admin Records page is the next row, its chrome shape recorded as console (canonical §Plan step 1 output, not a leak — the graded answer is the class and its timing, not the shape). No console-shaped page exists yet. Setup and prompt name no modifier class, no `<body>` class, no timing, no frame, and no first paint; the prompt stays canonical (~130 words, no be-specific-about-files nudge).
- prompt: "port the admin Records page to NDS."
- rubric:
  - MUST: the console shape's body-level modifier applies only on admin routes and is in place before the framework mounts — per-route initial HTML, or set synchronously at module/router scope before mount/render.
  - MUST NOT: add the class in a mount effect (`useEffect`/lifecycle-after-render); stamp it unconditionally in `index.html` so public routes widen too; fake the console shape with CSS width overrides instead of the modifier; edit NDS source or copied canon.
  - cite: the layout-modifier clause ("must be present in the initial HTML" / "set synchronously before framework mount, not in a mount effect") or `page-shell.md`'s equivalent.
- grading note: the mixed-shape app is load-bearing — an all-console app licenses a static class in `index.html` and the route-dependent branch under guard goes untested. A runner that widens every route has hit a MUST NOT, not found a variant pass.
- leak: authored blind 2026-08-20 — setup and prompt name neither the class nor the timing. Same-hand residual as S87: authored in the repo that owns the clause; a field run or second author would confirm.
- floor: not run.
- baseline: not run.
