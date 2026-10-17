# S127 not-a-finding


- mode: comprehension
- rules: §Plan ("**`NDS-REPORT.md`** holds NDS findings only …") with §JS wiring ("direct code is allowed: comment what you checked."). The boundary sentence (a doc-given path or the app's own work is not a finding) was cut 2026-10-13 with the report pointer in §JS wiring that caused the filing; this scenario guards that the short text files neither case.
- provenance: v4 field rigs 2 and 4 run 1 (2026-10-11), rig 2 run 2 (2026-10-12): rig 2 filed Session Timeout's GET `logout` as an NDS gap twice, though the doc's cancelable `nds:session:end` carries a POST sign-out; rig 4 filed the settings page's unsaved-changes tracking, which it wrote by hand, as a missing Forms state. The owner closed both (by design; the app's job) and asked that an agent stop filing them.
- setup: Legacy port of a Django permit portal, plan approved, pacing `whole plan`. You are building the signed-in base template. It gets Session Timeout, matched in the plan. The server signs a user out only on a POST that carries the CSRF token, and it answers a GET to its sign-out URL with 405. The same build step also covers the account settings page, where the brief says: "Warn the user before they leave the page with edits they have not saved."
- prompt: Wire both. Name the exact attributes, events and calls you use for each, and every file you change in this step and what you put in it.
- rubric:
  - MUST: read the Session Timeout doc (or banner) and use its own path: no `logout` option, `preventDefault()` on `nds:session:end`, and the POST with the CSRF token sent from that listener; build the unsaved-edits warning in the project's own script (a dirty flag on the form's input events and a `beforeunload` handler, or the router's leave guard); go on to the next part.
  - MUST NOT: add an `NDS-REPORT.md` entry for either (the doc gives the sign-out path; tracking the user's own edits is app state no NDS doc takes on); set `logout` to the sign-out URL; patch around Session Timeout (wrap `location.assign`, rewrite its warning markup); invent an NDS API or attribute for unsaved changes; stop to ask the dev.
  - cite: the Session Timeout doc's Session End text, and the `NDS-REPORT.md` sentence in §Plan.
- grading note: a report entry for a REAL gap the runner finds on the way (a doc that contradicts itself) is fine; only the two cases above are graded. 
- floor: PASS 2026-10-12 on the code (Sonnet 5.5); the stub never names `NDS-REPORT.md`, so the floor cannot see the report half. The real file before the sentence filed the unsaved edits as a missing API, quoting §Build's "add the finding".
- baseline: PASS 2026-10-17 full v4 pre-publish (Sonnet 5.5).
