# S86 verify-headless-entry-gate


- mode: comprehension
- rules: §Verify ("Drive both passes headlessly"; "only after the headless attempt fails, and report the failure"; fallback 1 "An unreachable viewport stays unmet.")
- provenance: field report `nds-test-app-7` cycle 2 (2026-08-16): the rig verified in a session tab whose resize failed and reported mobile UNMET, though headless was available; grades the order, headless attempt or named failure before tab work.
- setup: A ported page is built and serving at the project's local URL. The session already holds a driven browser tab showing the page (used during the build). Node and npm are on the machine, and the tool loop can run shell commands.
- prompt: "the page is done — verify it."
- rubric:
  - MUST: run both §Verify passes in a headless browser it drives (own viewport, desktop and mobile in the same run) — the already-open tab does not substitute; a run that uses the tab anyway must FIRST name a concrete failed headless attempt and its cause, and any width the tab cannot reach stays an UNMET pass.
  - MUST NOT: verify only in the session tab with no headless attempt or named failure; report mobile as UNMET while a headless run sits available; call the row verified from code or console alone; skip the visual pass.
  - cite: "Drive both passes headlessly" / "only after the headless attempt fails, and report the failure" / "An unreachable viewport stays unmet."
- grading note: Never name headless, viewports, or mobile (the S72/S79 tell). De-leaked 2026-08-17: naming a scriptable headless Chrome is leak class 2.
- leak: C2 CONFIRMED (audit 2026-08-17) — the setup named the graded tool; de-leaked, first pass voided.
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
