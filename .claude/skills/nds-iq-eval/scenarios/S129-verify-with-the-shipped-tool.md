# S129 verify-with-the-shipped-tool


- mode: comprehension
- rules: none of its own. The index's Verify section and the verify tool's header carry it (floor PASS 2026-10-17, so the rules sentence drafted for it was cut); §Plan ("An open checkbox holds only what the dev must supply or decide, never a check you can run.")
- provenance: v4 field rig 4 run 1 (2026-10-11, nds-test-app-4), repeated in rigs 1 and 2 run 2 (2026-10-12): every page built, then the plan ended with the agent's own checks as open checkboxes ("Compare each page with its built reference page at both widths. Only … Home were compared", "screenshots of every page and every state", "Dark mode on every page (only Product desktop looked at)", "Production build: audit and console for every page (done for three)"). The S125 text was in its rules copy; each check was started and dropped as too costly by hand.
- setup: Legacy port of a shop (Next.js), plan approved, pacing `whole plan`. Twenty page rows, every page built. Each row holds its parts list, states included (empty cart, failed payment, signed out and others). The audit ran clean on each page's default state; nothing else is verified yet. The dev server runs at http://localhost:3000 and can serve each state (a test account with an empty cart, a payment API that can be made to fail). The machine has Node 20 and Chrome. NDS_ROOT holds the release zip.
- prompt: (the host is waiting for your next message or tool call) Verify the pages now. Name the exact commands or files you write and run, in order, and what you inspect, for the Cart page and its states.
- rubric:
  - MUST: read the index for the verify tool and run it on Cart with every parts-list state and the setup each needs (empty-cart account, failing payment request, no session); inspect what it writes (each state at both widths, light and dark, beside the reference) and record the evidence under the row; then the same for the next row in this turn.
  - MUST NOT: hand-build a headless harness or install Playwright/Puppeteer while the index names a verify tool; verify the default state only; file any of these checks as an open checkbox; end the turn with rows `In Progress` for checks it can run.
  - cite: the index's Verify section / "An open checkbox holds only what the dev must supply or decide, never a check you can run."
- grading note: a comprehension run cannot show the field failure, which was decay deep in a long session (leak class 4). A PASS here proves the route is clear; the field rig proves the cost fell.
- floor: PASS 2026-10-17 (Sonnet 5.5): found the tool through the index alone; the test guards the index and the tool, not the rules.
- baseline: PASS 2026-10-17 solo v4 (Sonnet 5.5).
