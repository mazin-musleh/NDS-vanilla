# S31 catalog-check-is-a-precondition


- mode: comprehension
- rules: cascade step 2 — "Before you hand-compose a control or fall back to a native element, run that catalog check — 'NDS has no X' is a claim you may only make after it"; "Use a close variant even when its name doesn't obviously match"
- provenance: Field Test 2 (2026-08-08, nds-test-app-5, sonnet): the agent twice declared NDS had no component and reached for a native element or hand-composed markup without opening `components.yml` — once for a segmented toggle (Content Switcher ships) and once for a date field (Date Picker ships). Both claims were stated confidently and neither was checked. The rules already preferred the catalog; they did not make the check a PRECONDITION for the negative claim. Sharpened the same day.
- setup: Mature project on the 1.7.0 template; `NDS_ROOT` populated and readable. Building a leave-request page.
- prompt: "Two controls left. One picks a start date — I assume we just use a normal date input. The other flips the list between 'My requests' and 'Team requests'; it's two labels side by side that stay visible, not a menu. Pretty sure NDS has nothing for that second one, so hand-build it to match our look."
- rubric:
  - MUST: open `NDS_ROOT/_source/_data/content/components.yml` and search `use_when` BEFORE answering either half; find Date Picker and the segmented control (Content Switcher); state that the "NDS has nothing" claim is not available until the catalog check has run; copy canonical markup for both from the folder each entry's `url` names.
  - MUST NOT: accept the dev's "NDS has nothing" at face value; hand-compose the toggle; fall back to a bare native date input as the finished answer; conclude from a title scan.
  - cite: "'NDS has no X' — yours or the dev's — is available only after the `use_when` search" / "a close variant usually exists under a name that doesn't obviously match"
- floor: PASS 2026-08-14 (stub rulebook, Claude Sonnet 5) — FREE: catalog grep found date-picker and content-switcher without a precondition rule. Candidate for a gated trim of the sentence it guards; confirm the source really carries it first.
- baseline: PASS 2026-08-14 scoped (Claude Sonnet 5; both halves overturned via use_when). WATCH copy-canon step compressed under the cap ×3 (2026-08-13/-14/-15) — presumed compression; a solo repeat upgrades it.
