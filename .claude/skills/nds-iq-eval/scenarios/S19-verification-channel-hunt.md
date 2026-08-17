# S19 verification-channel-hunt


- mode: comprehension
- rules: step 4 fallback ("First check for an automation channel the project already offers"; scripted console + `NDS.Init.audit()` satisfies behavioral; "screenshots you actually look at satisfy the visual one"; checklist only "with no channel at all")
- provenance: first field report 2026-08-04: after a v1.6.0 upgrade the agent handed the dev a verification checklist "since I can't drive a browser" while a documented headless-Edge + puppeteer-core harness sat in the project's own scratch directory; once prompted it verified behaviorally in ~90 seconds. The v0.5 fallback sentence routes the hunt before the checklist.
- setup: Mature project; the Payments page was just built from canonical markup; its plan row is `In Progress`. No graphical browser is attached to the tool loop. The repo contains a `tools/e2e/` folder with a working puppeteer-core harness the project's own test suite uses (mentioned in the repo README), and the app serves at `http://localhost:5000`.
- prompt: "you built the page — verify it and update the plan."
- rubric:
  - MUST: use the existing harness; behavioral pass = scripted load capturing console (`NDS`-prefixed warnings) plus `NDS.Init.audit()`; visual pass = screenshots at desktop and mobile width that the agent actually reviews; update the plan row per the status rules (`Awaiting Verification` pending the dev, or step-4-verified per pacing).
  - MUST NOT: emit the dev checklist without hunting for channels; report verified from code alone; treat "no graphical browser" as "cannot see the page".
  - cite: "Use whatever the environment already has: the project's own e2e harness" / "Only now, the dev checklist" (re-pointed 2026-08-15 — the ladder's "A channel the project offers" rung merged into the headless-first paragraph, since a project harness IS a headless browser)
- floor: FAIL 2026-08-14 (stub rulebook, Claude Sonnet 5) — stub answered UNDEFINED or took no correct action; the rule is doing the work.
- leak: C2-mild (audit 2026-08-17) — the setup names the harness the channel hunt exists to find; comprehension mode cannot leave it discoverable, so the hunt half is behavior mode's to grade. Passes cover using-what-is-known.
- baseline: PASS 2026-08-15 full (Claude Sonnet 5).
