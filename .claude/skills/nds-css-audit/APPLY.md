# nds-css-audit — Phase 5: APPLY (read on demand)

Loaded from SKILL.md only when the user picks an apply action. SKILL.md's contracts govern here — suggest-never-auto-apply, Auto-drive pause points, numbered-reply discipline; this file adds the apply + verification procedure only.

---

## Phase 5: APPLY (on user request only)

When the user replies with a number from the Next Step block or types `apply <rule-id>` / `apply <file>:<line>`:

1. Re-read the target file (it may have changed since Phase 3).
2. Locate the finding by file:line.
3. Confirm the snippet still matches; if not, report drift and stop.
4. Apply the rewrite with the `Edit` tool — never bulk `Write`.
5. After each applied edit, report back: `Applied [<rule-id>] at <file>:<line>. Saved ~<N>B (estimated).`
6. If the user replied with `1` (apply top N), proceed file-by-file through the list, reporting after each. Stop on the first edit that fails or where the snippet drifted.

**Never auto-apply.** Always wait for an explicit number or `apply` command.

### Verification after fixes (REQUIRED when Phase 5 applies edits)

Whenever Phase 5 actually applies one or more edits, the post-batch output MUST close with a **Verification** footer telling the user what to check to confirm no regressions. The footer has three tiers — the audit emits all three when it applies edits:

**Tier 1 — Mandatory checks (do these every time):**

The flow BRANCHES on whether the Jekyll dev server is already running. Detect first:

```bash
# Detection (port 4002 is the project default per CLAUDE.md):
curl -sI http://localhost:4002 >/dev/null 2>&1 && echo "serve-active" || echo "serve-not-running"
```

**A. Build succeeds.**

- **If serve-active**: the watcher is already compiling. Don't spawn a second build. Just stash → wait → unstash → wait, and check that the watcher didn't error. Sass errors surface as a build-failure message in the `jekyll serve` terminal AND `_site/assets/css/nds-main.min.css` will retain its prior contents (the watcher won't overwrite with a broken build). If the file's mtime doesn't advance within ~3s after a file change, treat as a build failure: revert the last applied edit, ask the user to read the serve terminal for the Sass error, and stop the batch.
- **If serve-not-running**: explicit build via `bundle exec jekyll build`. Exit code 0 = no Sass syntax errors. If the build fails:
  - The audit reverts the last applied edit, reports the Sass error verbatim, and stops the batch.
  - The user fixes the error or asks the audit to retry; do NOT chain further edits onto a failing file.

**B. Compiled bytes match the estimate.**

- **If serve-active — leverage the running watcher** (fast, ~5–10s end-to-end; no race with `rm -rf _site`):
  ```bash
  # Fixes are currently applied (Phase 5 just edited the source files).
  AFTER=$(wc -c < _site/assets/css/nds-main.min.css)             # record AFTER
  git stash push -m "css-audit-byte-verify-temp" <fix-files>      # revert fixes; watcher rebuilds
  sleep 3                                                          # wait for watcher rebuild
  BEFORE=$(wc -c < _site/assets/css/nds-main.min.css)            # record BEFORE
  git stash pop                                                    # restore fixes; watcher rebuilds again
  sleep 3
  echo "Actual delta: $((BEFORE - AFTER)) B (estimate was <N> B)"
  ```
  If `BEFORE - AFTER` doesn't budge within 3s of either stash, the watcher may have errored — read the serve terminal for the Sass message.

- **If serve-not-running — explicit clean rebuild** (slow, ~60–120s end-to-end; no concurrency risk):
  ```bash
  # Fixes are currently applied.
  AFTER=$(wc -c < _site/assets/css/nds-main.min.css)              # record AFTER if previous build still cached
  git stash push -m "css-audit-byte-verify-temp" <fix-files>       # revert fixes
  rm -rf _site                                                      # defensive: force clean rebuild
  bundle exec jekyll build                                          # rebuild from reverted source
  BEFORE=$(wc -c < _site/assets/css/nds-main.min.css)             # record BEFORE
  git stash pop                                                     # restore fixes
  rm -rf _site && bundle exec jekyll build                          # rebuild again
  AFTER=$(wc -c < _site/assets/css/nds-main.min.css)              # confirm AFTER
  echo "Actual delta: $((BEFORE - AFTER)) B (estimate was <N> B)"
  ```

Delta should match the report's "Compiled CSS bytes saved (est)" within ~15%. If actual delta is >30% off the estimate, the byte-delta framework is mis-calibrated for one or more of the applied rules — flag this in a GAP observation and don't apply further batches until investigated.

**On stash-pop safety in both flows:** if the audit gets interrupted between `git stash push` and `git stash pop`, the user's fixes are recoverable via `git stash list` → `git stash pop stash@{<index named "css-audit-byte-verify-temp">}`. Always include the `-m` tag so the entry is identifiable.

**C. Dead-token consumer re-check (TOK-02 deletions only).**

When the batch applied a TOK-02 dead-token deletion, the skill auto-runs a consumer re-grep as a mandatory gate. This is a deterministic, read-only `Grep` — NOT a live browser drive — so auto-running it is consistent with the static-gate contract (it's the static analog of the JS audit's automatic post-fix review gate). For each deleted token, `Grep` `var\(--<name>` across `_sass/` (Tier 2 + Tier 3), `_includes/`, `_layouts/`, `assets/css/`, the mode-override files (`_variables-dark.scss`, `tokens/_components-dark.scss`, `_variables-a11y.scss`), AND the token NAME as a string across `_js/` (JS `getPropertyValue` readers) — the same consumer set the Phase 3 cross-component scan uses before recommending (the file can drift between recommend and apply). If ANY consumer surfaces: `Edit` the token back, report the surviving consumer `file:line`, and STOP the batch — the same revert-and-stop shape as a Tier 1-A build failure.

**D. Automatic cascade-flip review (cascade-sensitive batches).**

When the applied batch contains a cascade-sensitive rule — SEL-01 / SEL-03, DUPE-01 / DUPE-02 / DUPE-03, or PERF-03 / PERF-04 (the rules whose Tier 2 row already says "verify the cascade winner") — AUTO-run ONE read-only review agent (`Agent` tool, `general-purpose` subagent) after the Tier 1 build/byte gate and before emitting the Tier 2 spot-checks. This is the CSS analog of the JS audit's mandatory post-fix static review: it is auto-run, NOT gated behind a reply (the live visual / `verify in browser` drive in Tier 3 stays the user's offered choice; static analysis is the cheap automatic gate). Brief: the edited selectors with their pre/post resolved-`&`-chains plus the three-file token table; ask only "does any merged, dropped, or extracted selector now win or lose against a specificity-equivalent rule sitting between the merged blocks, or change cascade order?" — the failure the static byte-estimator can't see (the Methodology section's "cascade conflicts whose specificity comes from compile-time expansion" case). Output = a ranked list of cascade-flip SUSPECTS that PRIORITIZES which Tier 2 visual spot-checks below actually matter; it does NOT replace the visual checklist and NEVER drives a browser. If it flags a suspect flip, surface it at the top of the footer; do not silently pass. Skip the agent for a single `apply <rule-id>` of a non-cascade rule (e.g. a lone DEAD-05 fallback removal) — same skip-when-low-risk discipline as the Phase 3 deep-read agent.

**Tier 2 — Per-finding spot-checks (one line per applied finding):**

For every edit the batch applied, the verification footer includes a one-line "Verification:" note telling the user what to check. The line is rule-specific:

| Applied rule | Verification line the footer emits |
|---|---|
| SEL-01 / SEL-02 | Open the component demo page; trigger every state pseudo-class merged into the `:is()` / `:not()` list (hover, focus, etc.) — appearance must be identical. |
| SEL-03 | Specificity dropped from `1,1,0` to `0,1,0`. Grep `.nds-<class>` across the codebase; confirm no other rule was relying on the type-qualified form to win the cascade. **Cross-component check**: list every file that references the class; visual-check each one's affected page after the rebuild. |
| DEAD-01 / DEAD-02 / DEAD-03 / DEAD-05 | Compiled output unchanged at the affected selector. Open the component demo; appearance must be identical. (DEAD-03 trio: also test parent-cascade — render the component inside a wrapper that sets the same `--var` to confirm the cycle-detection fallback still fires.) |
| DEAD-04 | Test in BOTH directions. Toggle `<html dir="ltr">` and `<html dir="rtl">` (or apply / remove the `.ltr` class) — appearance must be correct in each. |
| DUPE-01 / DUPE-03 (in-file merge) | Open the component demo page. The merged rule must come at a position where its cascade outcome matches the unmerged source — if the bodies were identical, this is automatic; if any specificity-equivalent rule sits between them, the merge may have changed the winner. Visual diff vs the previous build. |
| DUPE-02 (cross-file `@extend %placeholder`) | Run a grep for `%<placeholder-name>` across all files that previously held the duplicated body; every call site must `@extend %<name>`. Open one demo page per affected component. |
| PERF-04 (variant-grid restructure) | Full component QA. Open every variant the component supports (e.g., all color × style × dark-mode combinations for cards). Each variant must render identically. If the fix annotated rather than restructured: no visual check needed — confirm the `// PERF-04 complexity-required:` comment landed and reads correctly. |
| TOK-01 / TOK-03 / TOK-06 (token swap / added alias) | Confirm the token's compiled value matches the literal it replaced. Inspect the element in DevTools — the resolved property value must be byte-identical to the pre-swap value. |
| TOK-02 (dead-token deletion) | Covered automatically by **Tier 1-C** (the consumer re-grep + auto-revert runs as a mandatory gate). This row is the manual fallback when the dev server / `Grep` is unavailable: re-run `grep var\(--<name>` across `_sass/`, `_includes/`, `_layouts/`, `assets/css/`, the mode-override files (`_variables-dark.scss` etc.), and the token name across `_js/`; if any hit appears, restore the token. A token re-bound only in a mode-override file is itself now dead — remove those bindings in the same batch. |
| Any rule with Cross-component reach > 0 (per the Phase 3 cross-component scan) | Each consumer file named in the finding's "Cross-component reach:" line must be visually spot-checked on its demo page after the rebuild. If the finding affects a base component (`_buttons.scss`, `_icons.scss`, `_typography.scss`, foundation files), the spot-check covers the top 3 dependent components by usage frequency, not just the audited file. |

**Tier 3 — Optional ground-truth checks (recommended when estimated savings >100B compiled, or when applying ≥5 findings in one batch):**

- **Computed-style + visual diff (`verify in browser` — user-elected).** Reply `verify in browser` and the skill drives `puppeteer-core` (env block + `executablePath` fallback + reuse of the running `:4002` server per the sibling skill's `../nds-js-audit/PUPPETEER.md` — cross-reference that boilerplate, don't duplicate it) to `goto` the affected component demo and, against the git-stashed source (BEFORE) vs the applied fix (AFTER): (1) snapshot `getComputedStyle` for a representative element per affected selector and diff the resolved-style maps, reporting any property whose computed value changed; (2) `page.screenshot` each affected variant (per-variant clips for PERF-04 / multi-variant findings, sourced from the Tier 2 spot-check row) and report a pixel-changed/unchanged verdict per variant. The per-selector element targets come from each finding's affected-selector list (there is no per-rule scenario table as in the JS skill). Reuse the Tier 1 stash → build → unstash mechanic (SCSS has no per-fix rebundle; the Jekyll watcher recompiles). This stays **offered, never auto-run** — a computed-style/screenshot drive is the live equivalent of the JS skill's browser drive (match verification to risk); Tier 1 `wc -c` byte-delta remains the automatic gate. Treat the screenshot verdict as a FLAG for human review, not a hard gate — demo-page anti-aliasing / hinting noise makes pixel-diff softer than a DOM assertion. When `verify in browser` isn't elected (or the dev server / Chrome is unavailable), fall back to the manual version: DevTools → Computed pane snapshot before/after, and a manual screenshot pixel-diff. **DEAD-07 confirmation rides this same drive**: for each unconfirmed DEAD-07 candidate in the report, diff the affected element's computed style with the declaration stashed out vs in, and promote it to a confirmed finding ONLY on a byte-identical resolved value across breakpoints — this is the gate DEAD-07's finding status depends on, not an applied-fix re-check.
- **Compiled CSS diff.** `diff` the `.min.css` before and after. Inspect the affected rules manually to confirm only the intended bytes changed.

The footer is emitted ONLY when Phase 5 actually applied edits. Dry-run reports (Phase 4 alone, no apply commands) do not emit it — there's nothing to verify yet.

The Phase 4 Next Step block should mention this so the user knows what comes after: "Applying any number above will produce a Verification footer at the end of the batch with build, byte-delta, and per-finding spot-checks."

