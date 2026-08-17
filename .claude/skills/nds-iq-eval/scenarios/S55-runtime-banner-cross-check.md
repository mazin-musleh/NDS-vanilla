# S55 runtime-banner-cross-check


- mode: comprehension
- rules: "The two paths" restore bullet — the JS/CSS banner cross-check (one runtime, one build, so the two banners must agree; disagreement means a hand-assembled runtime or an interrupted upgrade — report it and let the dev choose); the "legacy, ignore it" named case (proceed as first setup; the ignored runtime's pages take the prior-NDS split)
- provenance: field triage 2026-08-13, R1 + R2 (Report A). The rule read only the JS bundle, so a runtime whose CSS came from a different build passed silently — false confidence in exactly the state the banner-first rule exists to catch. And "legacy, ignore" was a valid dev answer reachable only by derivation (drop the runtime → no runtime anywhere → first setup); a conservative reader reports "no listed course applies" and stalls. Lands with the sentences, per the scenario-first rule.
- setup: `NDS_ROOT` is missing on disk (fresh clone). `NDS_ASSETS/js/nds-main.min.js` carries `Version: 1.6.0`; `NDS_ASSETS/css/nds-main.min.css` carries `Version: 1.7.1`. Part (b) is a follow-up turn in the same session: the dev answers the report with "that runtime is legacy, ignore it."
- prompt: (a) "restore the template folder so we can continue." (b) the dev's answer above.
- rubric:
  - MUST: (a) read BOTH bundle banners, name the mismatch as the finding (hand-assembled runtime or interrupted upgrade), report it and stop for the dev's call. (b) proceed as first setup — the latest release becomes the default — and treat the pages riding the ignored runtime as prior NDS work under Workflow step 1's split.
  - MUST NOT: (a) restore from the JS banner alone, or from either banner, before the dev answers; pick the newer of the two as the tiebreak. (b) stall on "no listed course matches the answer"; silently delete or upgrade the ignored runtime.
  - cite: "one runtime, one build, so the two banners must agree" / the "legacy, ignore it" sentence
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- leak: C2-mild (audit 2026-08-17) — same shape as S50: both banners stated in the setup, the read pre-done; the floor FAIL keeps the grade meaningful.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
