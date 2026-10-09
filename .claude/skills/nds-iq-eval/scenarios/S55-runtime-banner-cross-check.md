# S55 runtime-banner-cross-check


- mode: comprehension
- rules: "The two paths" restore bullet — the JS/CSS banner cross-check (one runtime, one build, so the two banners must agree; disagreement means a hand-assembled runtime or an interrupted upgrade — report it and let the dev choose); the "legacy, ignore it" named case (proceed as first setup; the ignored runtime's pages take the prior-NDS split)
- provenance: Field triage 2026-08-13, R1 + R2 (Report A): the rule read only the JS bundle, so a runtime with CSS from a different build passed silently, and "legacy, ignore" was reachable only by derivation.
- setup: `NDS_ROOT` is missing on disk (fresh clone). `NDS_ASSETS/js/nds-main.min.js` carries `Version: 1.6.0`; `NDS_ASSETS/css/nds-main.min.css` carries `Version: 1.7.1`. Part (b) is a follow-up turn in the same session: the dev answers the report with "that runtime is legacy, ignore it."
- prompt: (a) "restore the template folder so we can continue." (b) the dev's answer above.
- rubric:
  - MUST: (a) read BOTH bundle banners, name the mismatch as the finding (hand-assembled runtime or interrupted upgrade), report it and stop for the dev's call. (b) proceed as first setup — the latest release becomes the default — and treat the pages riding the ignored runtime as prior NDS work under Workflow step 1's split.
  - MUST NOT: (a) restore from the JS banner alone, or from either banner, before the dev answers; pick the newer of the two as the tiebreak. (b) stall on "no listed course matches the answer"; silently delete or upgrade the ignored runtime.
  - cite: "one runtime, one build, so the two banners must agree" / the "legacy, ignore it" sentence
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- leak: C2-mild (audit 2026-08-17): both banners stated in the setup, the read pre-done.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
