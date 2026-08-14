# TODO — current cycle

Standing file: it always exists. At every release commit, remove the items that release shipped and carry the open ones forward. Never delete the file itself. This is the one open list.

Cleared at the 1.7.2 release (2026-08-15). That release shipped the NDS IQ v1.0 rewrite and its v0.9/v0.10 batches, the floor gate and the first net reduction, the filter server-mode work (criteria in the request, coalesced setter re-fetch, form association), the FontLoading and knob-specificity field fixes, the doc corrections for cards/featured-icons/sort/head, and the Custom Select rename — all detailed in `CHANGELOG.md`, with each scenario's state in `.claude/skills/nds-iq-eval/scenarios.md`. Nothing from that cycle is carried forward except the items below.

## Open

- [x] **T3 rules trim — ATTEMPTED AND REJECTED 2026-08-15. The clause stays. Do not re-attempt on the "`ea66d4e5` made it free" argument.** The cut was made (−217 chars), gated, and reverted the same sitting; `_includes/NDS-IQ.md` is unchanged from the 1.7.2 release. Full evidence in S38's baseline. Short version: the point-of-copy comment does ship in all nine carriers now, but two solo sonnet runs showed the agent never opens `sign-in.md` before deciding whether the file is enough — so the comment sits BEHIND that decision while the rules sentence sits in front of it. Without the sentence the runner invented `.nds-content-layout > .nds-main-content` from the generic sections rule and dropped `nds-page-bg`, the three background knobs, `nds-content-wrapper` and `nds-middle` — a sign-in page with no background, uncentered. **Method correction worth carrying: a source fix absorbs a rules sentence only when the agent is guaranteed to READ that source before the moment the rule fires. A floor PASS cannot detect this, because the scenario text itself supplies what the file would have** — which is exactly how run 1 passed before the tell was removed.

- [ ] **S42 behavior re-run — its gate is now open.** The run needs the rules published to raw main, which the 1.7.2 release does. Re-run both parts.

## Standing decisions — do not re-propose without the named evidence

A decision lives with the artifact it governs, not here. An eval decision goes in its scenario's `baseline:` in `scenarios.md`; a grading lesson goes in `SKILL.md`; a decision already stated in source or docs is not restated at all. This section holds only what has no such home, so a full clear at release loses nothing.

- **R20 — two-download `_source/` population STAYS (2026-08-12, user call).** Kept here because it is the one call a reader would otherwise try to re-derive from the release script. The template zip ships no `_source/`; the rules populate it from the same tag's Source code zip. Triage proposed shipping `_source/` in the zip or a companion asset. Rejected: the current shape works against every template version an agent may meet, including releases cut before the rule existed, and it keeps the release script simple. Reopen only on the user's own initiative.

## Watch list — not tasks, things a later run should notice

- **Field triage 2026-08-12, the four items the v0.9 batch deliberately left out.** Each lands only on repeat field evidence, never on the single report that raised it. **R14**, what counts as a gate under gate-by-gate pacing: the file already says "when a step or page completes", which defines it — reopen if a run stalls or over-gates on the boundary. **R15**, a conformance rubric for prior NDS work (which violations force a clean rebuild, which are repair rows): one report read a single non-canonical head as enough to rebuild ten pages, which is defensible, so there is no measured failure yet. **R16**, a git-treatment table for the six artifacts (`NDS-IQ.md`, `.nds/`, `NDS-PLAN.md`, `NDS-REPORT.md`, `NDS_ASSETS`, the anchor file): cheap but unevidenced. **R19**, structured catalog fields (`install_family`, `layout`, `chrome_needs`) so chrome shape filters instead of reading ~90 `use_when` prose lines: land it only if S53 shows the prose match failing.
