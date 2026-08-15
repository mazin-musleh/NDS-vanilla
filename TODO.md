# TODO — current cycle

Standing file: it always exists. At every release commit, remove the items that release shipped and carry the open ones forward. Never delete the file itself. This is the one open list.

Cleared at the 1.8.0 release (2026-08-16). That release shipped `NDS.Init.destroy(container)` and the five component `destroy()` methods behind it, Main Navigation's `reinit()` and its own doc page, the Page Shell reference, NDS IQ v2.0 with the built-page shell copy and the headless-first §Verify, and the `nds-test-app-7` field report closed end to end — all detailed in `CHANGELOG.md`, with each scenario's state in `.claude/skills/nds-iq-eval/scenarios.md`. Nothing from that cycle is carried forward.

## Open

_Nothing carried forward. Open work lives with the artifact it governs — the field report, `scenarios.md`, or git history._

## Standing decisions — do not re-propose without the named evidence

A decision lives with the artifact it governs, not here. An eval decision goes in its scenario's `baseline:` in `scenarios.md`; a grading lesson goes in `SKILL.md`; a decision already stated in source or docs is not restated at all. This section holds only what has no such home, so a full clear at release loses nothing.

- **R20 — two-download `_source/` population STAYS (2026-08-12, user call).** Kept here because it is the one call a reader would otherwise try to re-derive from the release script. The template zip ships no `_source/`; the rules populate it from the same tag's Source code zip. Triage proposed shipping `_source/` in the zip or a companion asset. Rejected: the current shape works against every template version an agent may meet, including releases cut before the rule existed, and it keeps the release script simple. Reopen only on the user's own initiative.

## Watch list — not tasks, things a later run should notice

- **Field triage 2026-08-12, the four items the v0.9 batch deliberately left out.** Each lands only on repeat field evidence, never on the single report that raised it. **R14**, what counts as a gate under gate-by-gate pacing: the file already says "when a step or page completes", which defines it — reopen if a run stalls or over-gates on the boundary. **R15**, a conformance rubric for prior NDS work (which violations force a clean rebuild, which are repair rows): one report read a single non-canonical head as enough to rebuild ten pages, which is defensible, so there is no measured failure yet. **R16**, a git-treatment table for the six artifacts (`NDS-IQ.md`, `.nds/`, `NDS-PLAN.md`, `NDS-REPORT.md`, `NDS_ASSETS`, the anchor file): cheap but unevidenced. **R19**, structured catalog fields (`install_family`, `layout`, `chrome_needs`) so chrome shape filters instead of reading ~90 `use_when` prose lines: land it only if S53 shows the prose match failing.

- **The block sweep script that wrapped everything.** The 1.8.0 cycle unwrapped 82 stray `.nds-block` divs it had left across doc pages — around definition items, around demo cards, and inside `<table>`. All known instances are gone and the built site scans clean. If a future sweep touches markup in bulk, check its output against the parents it wraps, not just the count of files changed.
