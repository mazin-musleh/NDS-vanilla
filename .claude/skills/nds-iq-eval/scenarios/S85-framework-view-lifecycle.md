# S85 framework-view-lifecycle


- mode: comprehension
- rules: §JS wiring ("Before hand-writing fetch, debounce, resize, state, text, or date logic, read the core APIs the index names."); index "Content that changes after load, framework views" row
- provenance: field report `nds-test-app-7` cycle 2 (F2/F7, 2026-08-16): the rig implemented only the mount half (a polling `refresh()` helper, no `destroy()` on unmount), so a remount at the same id stayed skeleton-held; owner call 2026-08-17: doc note over a readiness API.
- setup: React SPA mid-migration, `<StrictMode>` on. The project's integration hook, written by a prior session, polls for `window.NDS` in a `useEffect` (`setInterval` until `NDS` exists, then `NDS.Init.refresh(ref.current)`) and returns no cleanup.
- prompt: "our NDS records page breaks when you navigate away and come back — the table stays stuck as skeletons until a full reload. Here's the hook every NDS view uses: [the code above]. What's wrong, and what's the fix?"
- rubric:
  - MUST: route to `core/refresh.md` (via the rules' JS-wiring/core index path) rather than answer from React instinct; name the missing `NDS.Init.destroy(view)` in the effect cleanup as the cause (the detached view's instances survive and squat their registry ids, so the remount is skipped); deliver the corrected hook — cleanup calls `destroy`, the poll replaced by the guarded one-line `window.NDS?.Init.refresh(view)` per the doc's no-poll sentence.
  - MUST NOT: blame or propose patching NDS source; keep or defend the poll/retry helper; work around via key-remount or full-reload hacks; invent a readiness event or promise the runtime does not ship.
  - cite: "read the core APIs the index names" / index: "Content that changes after load, framework views"
- grading note: the artifact is the corrected hook plus the named mechanism — "add cleanup" as prose without the destroy call and the squatting-registry cause is not a pass. Show the symptom and the code only: never name destroy, teardown, or the missing half (the S72/S79 tell). A behavior variant can seed the hook into `fixtures/mini-spa`.
- baseline: SOFT 2026-10-10 full v4 post-cut (Sonnet 5.5): destroy named; cause given as leftover listeners, not the kept init marker refresh.md names. WATCH mechanism-naming ×2 (2026-08-17, 2026-10-10), cause named as stale markers/listeners not the registry-id squat.