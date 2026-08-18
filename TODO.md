# TODO — current cycle

Standing file: it always exists. At every release commit, remove the items that release shipped and carry the open ones forward. Never delete the file itself. This is the one open list.

Cleared at the 1.8.1 release (2026-08-18). That release shipped the CSP inline-style fixes, Filter's target-id reclaim, the field-status cut to error and help, the `location.hash` fix, the `lang`/`dir` audit check, the framework-view lifecycle contract, the Page Shell framework-wrapper and modifier-timing notes, and NDS IQ v2.2 — plus all three field reports (`nds-test-app-7` cycles 2 and 3, `sso-rig` cycle 2) worked end to end. Detail is in `CHANGELOG.md`, and each scenario's state is in `.claude/skills/nds-iq-eval/scenarios.md`.

## Open

- [ ] **NDS IQ v3 — full rework, weekend (owner call 2026-08-18).** A mid-cycle §Build consolidation was written and reverted the same sitting (the policy holds rewrites to a cycle boundary); its one correctness fix and F4's modifier clause were kept. One fact worth carrying: five scenarios cite §Build sentences by quote (S44, S53, S77, S81, S87), so any rewrite of that section re-points those `cite:` lines and takes a `full` run — not a sitting.

- [ ] **Guard scenario for the layout-modifier clause.** The clause landed 2026-08-18 on field evidence (4/4 rig runs stamped the class from JS) without a floor pair, so nothing fails if it is trimmed later. S84's behavior run confirmed it works in the route-dependent branch — the runner set `nds-full-width` at module scope and quoted the rule — but that run graded S84, not this. A console-route variant of S87's `mini-spa` setup is the cheap home for it; author the setup blind, naming neither the class nor first paint.

## Standing decisions — do not re-propose without the named evidence

A decision lives with the artifact it governs, not here. An eval decision goes in its scenario's `baseline:` in `scenarios.md`; a grading lesson goes in `SKILL.md`; a decision already stated in source or docs is not restated at all. This section holds only what has no such home, so a full clear at release loses nothing.

- **R20 — two-download `_source/` population STAYS (2026-08-12, user call).** Kept here because it is the one call a reader would otherwise try to re-derive from the release script. The template zip ships no `_source/`; the rules populate it from the same tag's Source code zip. Triage proposed shipping `_source/` in the zip or a companion asset. Rejected: the current shape works against every template version an agent may meet, including releases cut before the rule existed, and it keeps the release script simple. Reopen only on the user's own initiative.

## Watch list — not tasks, things a later run should notice

- **Field triage 2026-08-12, the four items the v0.9 batch deliberately left out.** Each lands only on repeat field evidence, never on the single report that raised it. **R14**, what counts as a gate under gate-by-gate pacing: the file already says "when a step or page completes", which defines it — reopen if a run stalls or over-gates on the boundary. **R15**, a conformance rubric for prior NDS work (which violations force a clean rebuild, which are repair rows): one report read a single non-canonical head as enough to rebuild ten pages, which is defensible, so there is no measured failure yet. **R16**, a git-treatment table for the six artifacts (`NDS-IQ.md`, `.nds/`, `NDS-PLAN.md`, `NDS-REPORT.md`, `NDS_ASSETS`, the anchor file): cheap but unevidenced. **R19**, structured catalog fields (`install_family`, `layout`, `chrome_needs`) so chrome shape filters instead of reading ~90 `use_when` prose lines: land it only if S53 shows the prose match failing.

- **The block sweep script that wrapped everything.** The 1.8.0 cycle unwrapped 82 stray `.nds-block` divs it had left across doc pages — around definition items, around demo cards, and inside `<table>`. All known instances are gone and the built site scans clean. If a future sweep touches markup in bulk, check its output against the parents it wraps, not just the count of files changed.
