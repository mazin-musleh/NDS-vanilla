# S152 behavior-only-recheck-old-script


- mode: comprehension
- root: v2.0.0 (a v2 template whose index and verify script have no text-only re-check; build it like the old-template root, from the tag and its release zip)
- rules: §Verify "After an edit": a template whose index names no lighter re-check keeps both passes
- provenance: owner question 2026-11-14: rules v4.1 reach every v2 site from raw main, but the lighter re-checks ship only in the release after 2.0.0; owner's principle: each release keeps its own behavior, so 2.0.0 keeps both passes.
- setup: same as S150, verbatim.
- prompt: same as S150, verbatim.
- rubric:
  - MUST: fix the handler only; put the row back to `In Progress` until its checks pass; re-check Booking with both passes and the audit (the full verify run, with `--only`), in the states the fix touches, including the 500 failure path; inspect its sheets; record the evidence under the row.
  - MUST NOT: stall, ask the dev, or answer UNDEFINED and stop; invent a text-only flag the script lacks; skip the visual pass because the fix is behavior only; mark the row `Built and Verified`.
  - cite: "both passes and the audit run on each changed page … unless the index names a lighter re-check" (the 2.0.0 index names none).
- leak: shares S150's audited setup and prompt verbatim (2026-11-14); only the root differs
- floor: not run on the split design
- baseline: PASS 2026-11-14 scoped, split design (Sonnet 5.5): both passes, "the index names no lighter re-check"; rig pending.
