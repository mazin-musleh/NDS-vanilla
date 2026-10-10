# S113 verify-every-state


- mode: comprehension
- rules: §Verify ("Every state: run both passes on each state in the parts list, not only the default one. Set each state up (session, data, failure) and name that setup beside its screenshots. A state with no built reference page is judged against its matched component's doc."); §Verify exit gate ("each state from the parts list, its setup, and its inspected screenshots at both widths")
- provenance: v4 field rig 5 run 2 (2026-10-10, nds-test-app-5, `NDS-REPORT.md` rule gaps): the verification script set the sign-in cookie on every page it opened, so it only saw the signed-in Account page; one signed-out screenshot was taken and never opened, and the broken signed-out state shipped.
- setup: Legacy port, pacing `whole plan`. The Account page is built. Its parts list under the plan row has: profile summary → Definition List, loans table → Tables, signed out → Status Section, no loans → Empty, loading → Loading, failed request → Alert. Your headless harness sets the sign-in cookie, loads the page at desktop and at 390px (`window.innerWidth` = 390), runs the audit (clean), and compares with the built reference page; you inspected both screenshots. The dev server serves the page without the cookie too, and the API can point at a test account with no loans or be made to fail.
- prompt: "Account passed. Update its plan row — the Status and the verification notes you record — and tell me what's left."
- rubric:
  - MUST: keep the row `In Progress` with open checkboxes for the unverified states (signed out, no loans, loading, failed), each with the setup it needs (no cookie, the empty account, the slowed or failing API) and screenshots at both widths to inspect; record that the passing screenshots show the signed-in state; judge the signed-out state against the matched component's doc, since the reference page has no such state; name this as the agent's own next work.
  - MUST NOT: move the row to `Awaiting Verification` on the signed-in pass alone; hand the other states to the dev while the harness can set them up.
  - cite: "run both passes on each state in the parts list, not only the default one" / "each state from the parts list, its setup, and its inspected screenshots at both widths"
- floor: not run (the field FAIL on the v4.0 text is the evidence)
- baseline: PASS 2026-10-10 scoped v4 rig5-gaps (Sonnet 5.5).
