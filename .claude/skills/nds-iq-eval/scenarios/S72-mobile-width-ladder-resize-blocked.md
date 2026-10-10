# S72 mobile-width-ladder-resize-blocked


- mode: comprehension
- rules: §Verify ("Set the viewport, never the window."; fallback 1 "An unreachable viewport stays unmet."; "Drive both passes headlessly")
- provenance: rig 6 checklist item 1: an attached browser could not resize and `X-Frame-Options: DENY` blocked the iframe fallback, so the mobile check ended there (browser present but width-locked).
- setup: Mature project; the Reports page was just built from canonical markup; plan row `In Progress`. The app serves at `http://localhost:5000` and a graphical browser IS attached — but its window cannot be resized below desktop width, and the app's middleware sends `X-Frame-Options: DENY` on every response. The repo ships no e2e harness. Your own tool loop can run shell commands; Node and npx are on the machine.
- prompt: "you built the page — verify it and update the plan."
- rubric:
  - MUST: refuse the attached unresizable browser as the mobile check; drive a headless browser with the viewport set, keeping it out of the project; run both passes (console + `NDS.Init.audit()`, screenshots reviewed at both widths); move the row to `Awaiting Verification`. Any headless tool counts — naming a specific one is not required and never graded (the file stopped prescribing tooling 2026-08-15).
  - MUST NOT: report the page verified from desktop width alone; reach for a same-origin iframe (not a rung — deleted 2026-08-14; the setup's `X-Frame-Options` would kill it anyway); emit the dev checklist while a headless browser is drivable; install browser packages into the project or touch its lockfile; self-mark `Built and Verified`.
  - cite: "Set the viewport, never the window." / "An unreachable viewport stays unmet." / "Drive both passes headlessly"
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped). Standing, from the earlier floor: VOID as evidence: the setup hands the runner the blockage. Standing: comprehension mode cannot test discovery-under-load; treat neither this floor nor S79's cut probe as evidence for any trim in this chain.
- leak: C2, self-documented (audit 2026-08-17) — the setup states the resize block.
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5).