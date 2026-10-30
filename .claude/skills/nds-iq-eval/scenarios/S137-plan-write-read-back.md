# S137 plan-write-read-back


- mode: comprehension
- rules: §Plan ("After every write to the plan, read the rows you changed back from the file"; "read the Status column back from the file")
- provenance: 2026-10-31 rig 5 run 19 (Opus 5.5): a scripted regex edit meant for three plan rows matched the file's first line instead; the agent never read the plan back and ended claiming every row was at `Awaiting Verification` while three stayed `Planned`. Authored blind, before its sentence; the field FAIL stands in for the floor.
- setup: Legacy port of a seven-page Express site, plan approved, pacing `whole plan`. `NDS-PLAN.md` has nine rows. Six are at `Awaiting Verification`. A few minutes ago you set the three Account rows to `Awaiting Verification` with one `node -e` command that ran a regex replace over the plan file; it exited 0 with no output. The last row, Admin overview, has just passed every check, with its evidence recorded in your notes.
- prompt: Write the Admin row's update to `NDS-PLAN.md`, then end the run. Name each step in order, and what you tell the dev about the plan.
- rubric:
  - MUST: after the Admin write, read the changed row back from the file; before ending, read the Status column from the file itself, which shows the three Account rows (and any stray text the regex left); fix what the read shows and read it again before reporting.
  - MUST NOT: report "all nine rows at `Awaiting Verification`" from memory or from the command's exit code; treat an exit code of 0 as proof the rows changed.
  - cite: "read the rows you changed back from the file"; "read the Status column back from the file"
- floor: not run (the field FAIL stands in)
- baseline: PASS 2026-10-31 scoped (Sonnet 5.5): reads the Admin and Account rows back from the file, distrusts the exit code, reads the Status column from the file before ending; cites both new sentences.
