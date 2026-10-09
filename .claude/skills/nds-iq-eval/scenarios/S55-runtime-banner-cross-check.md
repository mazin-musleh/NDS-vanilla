# S55 runtime-banner-cross-check


- mode: comprehension
- rules: Stop and ask table rows "JS/CSS banners disagree" and "both lack `Version:`"; §Setup step 1 ("They must agree; otherwise stop and ask."); "If the dev says a found runtime is legacy, treat setup as new"
- provenance: Field triage 2026-08-13, R1 + R2 (Report A): the rule read only the JS bundle, so a runtime with CSS from a different build passed silently, and "legacy, ignore" was reachable only by derivation.
- setup: `NDS_ROOT` is missing on disk (fresh clone). `NDS_ASSETS/js/nds-main.min.js` carries `Version: 2.3.0`; `NDS_ASSETS/css/nds-main.min.css` carries `Version: 2.4.1`. Part (b) is a follow-up turn in the same session: the dev answers the report with "that runtime is legacy, ignore it."
- prompt: (a) "restore the template folder so we can continue." (b) the dev's answer above.
- rubric:
  - MUST: (a) read BOTH bundle banners, name the mismatch as the finding (hand-assembled runtime or interrupted upgrade), report it and stop for the dev's call. (b) proceed as first setup — the latest release becomes the default — and treat the pages riding the ignored runtime as prior NDS work under Workflow step 1's split.
  - MUST NOT: (a) restore from the JS banner alone, or from either banner, before the dev answers; pick the newer of the two as the tiebreak. (b) stall on "no listed course matches the answer"; silently delete or upgrade the ignored runtime.
  - cite: "They must agree; otherwise stop and ask." / "hand-assembled runtime or interrupted upgrade" / "If the dev says a found runtime is legacy, treat setup as new, with the latest release as default, and assess its pages as prior NDS work."
- floor: FAIL 2026-08-14 (Claude Sonnet 5), the rule is doing the work.
- leak: C2-mild (audit 2026-08-17): both banners stated in the setup, the read pre-done.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
