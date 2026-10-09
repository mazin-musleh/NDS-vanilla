# S94 content-changes-after-load


- mode: comprehension
- rules: §JS wiring (after-load markup follows the docs' guidance); index "Content that changes after load, framework views" row
- provenance: S37 and S85 runs (2026-08-14, 2026-08-18) never named the refresh API, and field rig 7 (2026-08-20) left a late-mounted nav dead; the rules name no lifecycle call.
- setup: React SPA with NDS chrome built and verified. The Orders view renders an NDS table whose rows arrive from an API after the view mounts; the view also unmounts when the user changes route. The table's sort buttons work on first load only when the rows were server-rendered, which they no longer are.
- prompt: "sorting is dead on the Orders table since we moved the rows to the API. Fix it, and tell me exactly which NDS calls go where in the view's lifecycle."
- rubric:
  - MUST: read `_source/core/refresh.md` (and the table banner); after the rows render call `NDS.Init.refresh` on the changed container (or `mount` for a new view); call `NDS.Init.mount(view)` after the view mounts and `NDS.Init.destroy(view)` before it unmounts, per the Framework Views section.
  - MUST NOT: re-run a full page init or reload; hand-wire sort click handlers; add a poll, retry or ready check around the calls.
  - cite: "follows the docs' guidance for content that changes after load" / index: "Content that changes after load, framework views"
- leak: C3 mild — the prompt asks for the lifecycle calls to force an artifact; the graded part is which calls and where.
- floor: FAIL 2026-10-09 (Claude Sonnet 5.5): UNDEFINED, no routed reads (2-call runner, so a lower bound).
- baseline: PASS 2026-10-09 comprehension vs v3.1 (Claude Sonnet 5.5): refresh.md read through the core route; mount, refresh, destroy placed right. No new sentence.
