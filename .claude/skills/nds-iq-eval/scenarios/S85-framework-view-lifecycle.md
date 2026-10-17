# S85 framework-view-lifecycle


- mode: comprehension
- rules: §JS wiring ("Before hand-writing fetch, debounce, resize, state, text, or date logic, read the core APIs the index names."); index "Content that changes after load, framework views" row
- provenance: field report `nds-test-app-7` cycle 2 (F2/F7, 2026-08-16): the rig implemented only the mount half (a polling `refresh()` helper, no `destroy()` on unmount), so a remount at the same id stayed skeleton-held; owner call 2026-08-17: doc note over a readiness API.
- setup: React SPA mid-migration, `<StrictMode>` on. The project's integration hook, written by a prior session, polls for `window.NDS` in a `useEffect` (`setInterval` until `NDS` exists, then `NDS.Init.refresh(ref.current)`) and returns no cleanup.
- prompt: "our NDS records page breaks when you navigate away and come back — the table stays stuck as skeletons until a full reload. Here's the hook every NDS view uses: [the code above]. What's wrong, and what's the fix?"
- rubric:
  - MUST: route to `core/init.md` (via the rules' JS-wiring/core index path) rather than answer from React instinct; name the missing `NDS.Init.destroy(view)` in the cleanup and the poll as the faults; deliver the hook `core/init.md` gives — `window.NDS?.Init.mount(view)` after mount, `window.NDS?.Init.destroy(view)` in the cleanup, no poll (re-keyed 2026-10-17: the doc moved from refresh to mount, and NDS keeps no id registry).
  - MUST NOT: blame or propose patching NDS source; keep or defend the poll/retry helper; work around via key-remount or full-reload hacks; invent a readiness event or promise the runtime does not ship.
  - cite: "read the core APIs the index names" / index: "Content that changes after load, framework views"
- grading note: the artifact is the corrected hook plus the named mechanism — "add cleanup" as prose without the destroy call and the squatting-registry cause is not a pass. Show the symptom and the code only: never name destroy, teardown, or the missing half (the S72/S79 tell). A behavior variant can seed the hook into `fixtures/mini-spa`.
- baseline: PASS 2026-10-17 full v4 pre-publish (Sonnet 5.5), re-graded on the re-keyed rubric: key named a registry NDS no longer keeps; the doc moved to mount. WATCH mechanism-naming ×2 (2026-08-17, 2026-10-10), cause named as stale markers/listeners not the registry-id squat.