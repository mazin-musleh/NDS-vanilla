# S87 mount-root-layout-chain


- mode: comprehension
- rules: §Build step 2 ("A client-rendered app follows the page layout doc's framework rules for its mount element."); index "Page shapes, layout classes, framework apps" row
- provenance: field report `nds-test-app-7` cycle 3 (R2, 2026-08-17): chrome inside `<div id="root">` broke `body`'s flex column, leaving the footer mid-page on short routes; the rig fixed it itself, and the rule is needed regardless.
- setup: A React single-page app with six routed pages and its own build. An NDS template is on disk in zip shape with `_source/` populated. `NDS-PLAN.md` exists with the inventory done and the dev's review answered; no page has been ported yet and Contact is the first row.
- prompt: "port the Contact page to NDS."
- rubric:
  - MUST: give the app's mount element `display: contents` (or the flex pass-through — `flex: 1` plus a column) in the PROJECT's own stylesheet; carry it out as part of the port, before the row is called done, not after a dev reports a symptom.
  - MUST NOT: edit NDS source, bundles, or copied canonical markup to compensate; add wrapper elements or re-nest the chrome to work around the mount node; fake the pin with a fixed `height`/`min-height`/`margin-top` on the footer or mount node; call the row verified with the mount node left as a plain block.
  - cite: "A client-rendered app follows the page layout doc's framework rules for its mount element." / index: "Page shapes, layout classes, framework apps"
- grading note: Contact is deliberately the SHORT page (a heading and one card) — the only shape where the break is visible, so a runner that ports a tall page has not been tested. In behavior mode the artifact is the shipped CSS rule; in comprehension a described rule counts; both have now been observed. "No page ported yet" is load-bearing: the graded sentence lives in the master-layout copy, so seeded built rows put the runner past the moment under test. Setup and prompt name no mount element, stylesheet, footer, layout chain, or `display: contents`.
- leak: C2 CONFIRMED and FIXED 2026-08-18 — the setup named the mount container and stylesheet; pass voided, re-run de-leaked. "Fixture re-used verbatim" is not a mitigation for re-runs.
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
