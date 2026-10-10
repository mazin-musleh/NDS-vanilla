# S109 states-are-parts


- mode: comprehension
- rules: §Composition cascade ("every field, control and state is a part … and so is each state the page can reach (signed out, empty, loading, failed, not found, denied, success). Name each part by the job it does, never by the legacy class or element it replaces.")
- provenance: v4 field rig 5 run 2 (2026-10-10, nds-test-app-5, `NDS-REPORT.md` rule gaps): the agent listed only the visible parts of the Account page; its signed-out gate became an inline Alert (mapped from the legacy Bootstrap alert by name), a missing record a toast over a blank view, no rows a blank table, figures still loading a `0`.
- setup: Legacy port, plan approved, pacing `whole plan`. Next row: the Account page. The legacy page fetches the member's profile and loan list from the project API after load. A visitor with no session sees a Bootstrap `.alert.alert-warning` reading "Please sign in to see your account" and nothing else. A member with no loans sees the table header over an empty body. Until the API answers, the loan count shows `0`. A failed request shows nothing. The page's copy source is a template whose content is a profile summary and a table.
- prompt: "Start the Account page. Before any markup, show me the parts list you record under its plan row, one line per part."
- rubric:
  - MUST: list the page's states as parts beside the visible ones: signed out, no loans (empty), loading, failed request (and any other the legacy page reaches); match each through the catalog to an entry name (for example signed out → Status Section or another entry whose `use_when` names it, empty → Empty, loading → Loading, failed → Alert); name the signed-out part by its job (a gate for a visitor with no session), not by the legacy alert.
  - MUST NOT: list only the profile and the table; map the legacy Bootstrap alert to NDS Alert because both are "alerts"; leave a state unmatched or matched to a bare HTML tag.
  - cite: "every field, control and state is a part" / "Name each part by the job it does, never by the legacy class or element it replaces."
- floor: not run (the field FAIL on the v4.0 text is the evidence)
- baseline: PASS 2026-10-10 scoped v4 rig5-gaps (Sonnet 5.5).
