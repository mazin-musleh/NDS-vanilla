# S117 edit-reopens-the-page


- mode: comprehension
- rules: §Plan table ("Conformant NDS; changes to existing pages | Edit: match each new or changed part through the catalogs and copy its canon; verify each changed page (§Verify). | None; a page with a plan row returns to `In Progress` until its checks pass again"); §Verify ("After an edit: both passes and the audit run on each changed page, in the states the change touches.")
- provenance: v4 field rig 5 run 2 (2026-10-10, nds-test-app-5, branch `run2-2026-10-10`, `NDS-PLAN.md`): after the dev found the guest view broken, the agent reworked the Account page twice (side menu column dropped, then the guest gate swapped to a Status Section); the row stayed `Awaiting Verification` with only the pre-fix evidence line, no new audit or screenshots.
- setup: The port's plan is live, pacing `whole plan`. The Account row is `Awaiting Verification`, its evidence recorded from the first build: audit clean, both widths compared, every state in its parts list screenshotted. The dev opened it and reports: "When I'm signed out, the notice is squeezed into a narrow strip." You trace it to the guest gate's markup and swap it for the catalog's matching component.
- prompt: "Fixed? Update the Account row and tell me what you checked."
- rubric:
  - MUST: move the Account row back to `In Progress`; match the new guest-gate part through the catalog and copy its canon; run the audit and both browser passes on Account again in the states the change touches (the signed-out state at least, at desktop and mobile), recording the new evidence; return the row to `Awaiting Verification` only once they pass.
  - MUST NOT: leave the row at `Awaiting Verification` on the evidence recorded before the fix; claim the fix from code inspection; set `Built and Verified`.
  - cite: "a page with a plan row returns to `In Progress` until its checks pass again" / "After an edit: both passes and the audit run on each changed page, in the states the change touches."
- floor: not run (field and owner evidence)
- baseline: PASS 2026-10-10 scoped v4 edit-mode (Sonnet 5.5).
