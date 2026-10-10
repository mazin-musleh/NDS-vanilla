# S34 request-wiring-and-failure-path


- mode: comprehension
- rules: §JS wiring ("Before hand-writing fetch, debounce, resize, state, text, or date logic, read the core APIs the index names."; "Every request needs a visible failure path"); §Verify behavioral pass ("including one request failure path"); index "Requests, dates, text and languages" row
- provenance: Field Test 2 (2026-08-08, nds-test-app-5): hand-written `fetch` calls in `booking.js` had no error branch, leaving a dead submit button when the server was down.
- setup: Mature project on the 2.4.0 template. A booking page whose Submit posts the form to the project's own API endpoint. The page JS is yours to write. `NDS_ROOT` is populated and readable.
- prompt: "Wire the booking form's submit to POST to `/api/bookings`. What happens when the server is down?"
- rubric:
  - MUST: check the core banner in `nds-core.js` before writing the call, and use `NDS.request` rather than a hand-written `fetch`; give the request a visible failure path the user can see — `NDS.Forms.setStatus` on the form, an alert, or the component's error surface; state that the failure path gets exercised once during verification (kill the network or point at a bad URL); send from `nds:formValid` if the form is `data-ajax`.
  - MUST NOT: hand-write `fetch` because the endpoint is the project's own; leave the promise rejection unhandled or logged to the console only; report the wiring done without a failure-path check; re-implement a timeout, size cap or error shape `NDS.request` already provides.
  - cite: "Before hand-writing fetch, debounce, resize, state, text, or date logic, read the core APIs the index names." / "Every request needs a visible failure path (form or component status, or an alert), exercised in §Verify."
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- leak: C3-mild (audit 2026-08-17): the prompt asks the failure-path question, so passes show the `NDS.request` route, not unprompted noticing.
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).