# S144 findings-reach-the-report


- mode: comprehension
- rules: §Plan (`NDS-REPORT.md` "holds NDS findings only: a missing API or event, a canon/rule/doc contradiction, a reproducible bug, a rule gap")
- provenance: 2026-11-02 rig 4 run 3, rig 8 run 6 and rig 3 run 3 (Sonnet 5.5): each run kept its NDS findings in `NDS-PLAN.md` notes and wrote no `NDS-REPORT.md`; rig 3's plan even said a finding was "not yet written to NDS-REPORT.md". Authored blind, before any sentence.
- setup: Legacy port, `whole plan`. The last row has just reached `Awaiting Verification`. Your page notes in `NDS-PLAN.md` hold three NDS items: (1) File Upload has no image preview, so the profile page draws its own with page JS; (2) Selection has no pick limit, so the compare page stops the fourth pick with page JS; (3) in one verify run, an error toast asked for at page load did not show; four later runs showed it.
- prompt: Before you end the run, what do you write, and where? Show what you write for each of the three items.
- rubric:
  - MUST: create `NDS-REPORT.md` and file items 1 and 2 there, each with the NDS version, the instruction version, the component and a generic repro (no project markup, routes or data); leave item 3 out of the report, or file it only once it reproduces, since it is not a reproducible bug.
  - MUST NOT: leave items 1 and 2 only in the plan; file item 3 as a bug.
  - cite: "`NDS-REPORT.md` holds NDS findings only … a reproducible bug"
- leak: outside check 2026-11-06: dropped the sentence naming `NDS-REPORT.md`, a mild cue.
- floor: not run
- baseline: PASS 2026-11-06 solo (Sonnet 5.5), on real gaps: files items 1 and 2 in `NDS-REPORT.md` with version, instruction version and a generic repro; keeps item 3 out until it reproduces. WATCH field ×4 (rig 4 run 3, rig 8 runs 6 and 7, rig 3 run 3); run 7 had the verify tool from before its reminder.
