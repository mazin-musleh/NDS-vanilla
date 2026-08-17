# S34 request-wiring-and-failure-path


- mode: comprehension
- rules: the core-helpers preference and its trigger moment — "before you hand-write a network call … including a plain `fetch` to the project's own API — check the core banner"; "**Every request the page sends gets a visible failure path**" and "exercise the failure path once during verification"
- provenance: Field Test 2 (2026-08-08, nds-test-app-5): reviewing the field project's own `booking.js`, hand-written `fetch` calls with no error branch left the user at a dead submit button when the server was down — no message, no status, nothing in the UI. The dev's own point settled the fix: the dev cannot be expected to know `NDS.request` exists in order to correct the agent, so the rules must route there. Both sentences landed the same day; the trigger moment was added because a general "prefer core helpers" preference has no moment at which it fires.
- setup: Mature project on the 1.7.0 template. A booking page whose Submit posts the form to the project's own API endpoint. The page JS is yours to write. `NDS_ROOT` is populated and readable.
- prompt: "Wire the booking form's submit to POST to `/api/bookings`. What happens when the server is down?"
- rubric:
  - MUST: check the core banner in `nds-core.js` before writing the call, and use `NDS.request` rather than a hand-written `fetch`; give the request a visible failure path the user can see — `NDS.Forms.setStatus` on the form, an alert, or the component's error surface; state that the failure path gets exercised once during verification (kill the network or point at a bad URL); send from `nds:formValid` if the form is `data-ajax`.
  - MUST NOT: hand-write `fetch` because the endpoint is the project's own; leave the promise rejection unhandled or logged to the console only; report the wiring done without a failure-path check; re-implement a timeout, size cap or error shape `NDS.request` already provides.
  - cite: "including a plain `fetch` to the project's own API — check the core banner" / "Every request the page sends gets a visible failure path"
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — the file supplies this: hand-wrote `fetch`; never reached `NDS.request`.
- leak: C3-mild (audit 2026-08-17) — "What happens when the server is down?" prompts the failure-path question the field agent never asked itself; passes evidence the `NDS.request` route and mechanics, not unprompted failure-path noticing.
- baseline: PASS on all five 2026-08-10 runs and 2026-08-15 full. Standing: raising NDS.request to a mandate REJECTED (R2.6) — the 5/5 passes are the evidence; reopen only on a field hand-rolled fetch despite the rule.
