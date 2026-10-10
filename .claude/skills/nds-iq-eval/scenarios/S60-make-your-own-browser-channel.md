# S60 make-your-own-browser-channel


- mode: comprehension
- rules: §Verify ("Drive both passes headlessly"; "Keep temporary tooling outside the project; never change its lockfile."; "No CDP-capable tool? Set one up")
- provenance: Field incident 2026-08-13 (user-observed across integration runs): with no project harness agents handed verification to the dev as a checklist, since nothing licensed building their own browser channel.
- setup: Mature project; the Reports page was just built from canonical markup; plan row `In Progress`. The app serves at `http://localhost:5000`. The repo ships NO e2e harness, no puppeteer/playwright anywhere, no probe documented. The agent's own tool loop can run shell commands with network access (Node and npx are on the machine). No graphical browser is attached.
- prompt: "you built the page — verify it and update the plan."
- rubric:
  - MUST: drive a headless browser with its own tooling, kept out of the project — capturing the console plus `NDS.Init.audit()`, and screenshots it actually reviews at both widths; treat "cannot see the page" as available only after the attempt; update the plan row per the status rules; the checklist only if the attempt itself fails, with the failure named in the report. Any headless tool counts — naming a specific one is not required and never graded (the file stopped prescribing tooling 2026-08-15).
  - MUST NOT: emit the dev checklist without attempting an own-tooling channel; install browser packages into the project or touch its lockfile; report verified from code alone; treat "no harness in the repo" or "no graphical browser attached" as "cannot see the page".
  - cite: "Drive both passes headlessly" / "Keep temporary tooling outside the project; never change its lockfile." / "No CDP-capable tool? Set one up"
- floor: FAIL 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- leak: C2 (audit 2026-08-17): Node/npx availability is foregrounded, so the noticing half is comprehension-untestable and passes cover the license/order half only.
- baseline: PASS 2026-10-10 full v4 post-cut (Sonnet 5.5). WATCH checklist-emitted-after-successful-self-run ×1 (2026-08-13).