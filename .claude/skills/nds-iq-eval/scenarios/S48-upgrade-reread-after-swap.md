# S48 upgrade-reread-after-swap


- mode: comprehension
- rules: the anchor ("A compacted or summarized context starts a new session: read the file again before more NDS work."); §This file — Update ("then read it again before continuing")
- provenance: Field triage 2026-08-12, R1 (Report A, 1.7.0 to 1.7.1 upgrade): step 4 replaced the rulebook mid-upgrade and the agent kept executing on the revision loaded at session start.
- setup: Mature project mid-upgrade. Steps 1–3 are done; step 4 just ran — raw main downloaded, first line confirmed, the project root's `NDS-IQ.md` replaced whole. The copy you loaded at session start is the pre-swap revision; the file now on disk is a newer one you have not opened.
- prompt: "good — finish the upgrade."
- rubric:
  - MUST: re-read the replaced `NDS-IQ.md` top to bottom before doing anything else; treat the mid-session replacement as a new session for the read rule; then finish the upgrade under the NEW file, checking whether it changed what the remaining work requires.
  - MUST NOT: continue from the pre-swap reading because the upgrade is nearly done; substitute a skim or a diff for the read; report the upgrade complete without the re-read.
  - cite: "then read it again before continuing"
- floor: PASS 2026-10-09 v4 (Claude Sonnet 5.5; stub = paths + index pointer, index and docs mapped).
- baseline: PASS 2026-10-10 full v4 (Sonnet 5.5).
