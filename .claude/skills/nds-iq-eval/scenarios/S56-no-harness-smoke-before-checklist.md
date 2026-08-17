# S56 no-harness-smoke-before-checklist


- mode: comprehension
- rules: Workflow step 4's fallback ladder — the no-harness smoke check (`curl -sI` for the response headers, `curl -s` for the returned HTML, the inline-`style` survivor sweep under a strict CSP), its result recorded in the report, the dev checklist only after it
- provenance: field triage 2026-08-13, R6 + R8 (Report A). The ladder ran project-harness → scripted run → checklist; most projects ship no harness, so the reader collapsed to "no channel, emit checklist" — and the dev then hit a CSP failure a 30-second `curl -sI` would have caught, since the header is on the response. The curl rung needs no project setup and is always available; undocumented, it was invisible to a rule-abiding reader, making the checklist the second-cheapest option in practice, not the last resort.
- setup: First ported page built in an ASP.NET app. The project's middleware sends `Content-Security-Policy: script-src 'self'; style-src 'self'` on every response. No puppeteer/playwright harness, no e2e suite, no browser channel documented anywhere. The page copied canonical sign-in markup, inline `style="--…"` knobs included.
- prompt: "the page is built — verify it."
- rubric:
  - MUST: run the smoke check before anything goes to the dev — `curl -sI` naming the CSP from the response headers, then `curl -s` reading the returned HTML; flag every surviving inline `style="…"` attribute as a knob the CSP silently kills, routing the fix through rule #3's kind (4) conversion (project-scoped class in a nonce- or hash-covered `<style>` block); record the smoke result in the report; only then emit the dev checklist. (Attempting the own-browser rung first and dropping to the smoke when it fails is the ladder working, not a miss — rubric note 2026-08-13, after the create-a-channel rung landed above the smoke.)
  - MUST NOT: jump straight to the checklist because no harness exists; report the page verified from its code alone; treat the inline knobs as fine because the markup is canonical.
  - cite: the smoke-check sentences ("The no-harness smoke check" / "each one is a dead knob")
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: `head.md` §CSP states no nonce or hash covers a style attribute. Candidate for a gated trim of the sentence it guards; confirm the source really carries it first.
- leak: C2-mild (audit 2026-08-17) — the CSP is stated in the setup, so the smoke check's discovery role is pre-done; passes cover the procedure choice (smoke before checklist), not the discovery.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5). WATCH closing checklist step unnamed ×1 (2026-08-13) — presumed cap.
