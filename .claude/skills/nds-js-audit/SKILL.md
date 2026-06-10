---
name: nds-js-audit
description: Audit NDS source JS for DRY/KISS violations, scalability and maintainability risks, performance issues, client-side security risks, architectural design (scheduling, memory, DOM API choice, complexity, in-file DRY, KISS), and cross-file pattern consistency. Covers listener/observer pooling via nds-core.js (NDS.onResize, NDS.onIntersect, NDS.onElementResize, NDS.onDOMAdd, NDS.onAttrChange, NDS.debounce), throttling of scroll/resize handlers, NDS.State and NDS.Status reuse, NDS.breakpoints reuse, cross-file detection of repeated helper functions that should be promoted to nds-core.js, component contract conformance (factory vs singleton shape via NDS.{Name}.init/reinit/create), dead defensive guards inside loader-registered components, common web-security sinks (innerHTML XSS, eval/new Function, target="_blank" tabnabbing, postMessage origin checks, untrusted URLs), and architectural review (JSA rules covering unbounded caches/maps, scheduling-primitive choice, polyfill fidelity, DOM API choice, mixed-concern functions, in-file repeated blocks, interaction-handler INP cost, and forced layout reads at init). Use this skill for "audit the JS", "audit performance", "audit security", "audit the architecture", "improve INP", "lower init cost", "optimize listeners", "check nds-core usage", "find functions that should live in core", "find unthrottled scroll handlers", "find heavy interaction handlers", "find forced layout reads in init", "find XSS risks", "find unbounded caches", "find mixed-concern functions", "make all components follow the same pattern", "check component consistency", or any JS source-code quality pass on `_js/`. NOT for SCSS/CSS audits, documentation page audits (use nds-doc), or UX copy review.
argument-hint: "[target] [optional: rule-group]"
---

# NDS JS Audit

Apply this skill to: `$ARGUMENTS`

This skill audits the NDS JavaScript source — the files in `_js/` — against the conventions already codified in `CLAUDE.md` and the shared-utility contract published by `_js/nds-core.js`. It reports real duplication, real performance risk, and real maintainability drag, then applies fixes only after the user approves the report. It is the code-quality counterpart to `nds-doc` (which audits documentation).

> **THIS SKILL WILL BURN YOUR TOKENS FAST.** A full-scope run reads every `_js/nds-*.js` file, applies all four catalogs against each, and spawns per-file review agents during Phase 5/6. Narrow the scope whenever you can:
> - `/nds-js-audit <filename> [rule-group]` — single-file pass against one component (e.g. `/nds-js-audit nds-modal.js architecture`). ~15–25k tokens — a dedicated deep-read agent runs per single-file pass (see Phase 3), which is where the architectural deep-reads pay off. Omit the rule-group to run all four. Best fit for a newly-added component before merging.
> - `/nds-js-audit js <rule-group>` — full-tree pass for one rule group (`performance` / `dry` / `security` / `architecture`). ~30–60k tokens. The release-prep / refactor-window shape. Full-tree `architecture` runs only the greppable JSA rules; deep-read JSA rules are skipped with a mandatory banner.

---

## Mindset

Audit like a staff engineer doing code review before a release. Favor concrete, actionable findings over theoretical cleanliness. Flag real duplication and real performance risk; do not manufacture issues to pad the report. When a rule is qualitative (JSD-05 promotion candidates), require at least two call sites and meaningful body overlap before flagging. If a finding cannot be explained in one sentence with a specific fix, it is not a finding. Prefer the highest-leverage recommendation over the longest list.

The goal is a report a developer can act on in the next hour, not a lint dump they will close and forget.

The rule catalog is a living document — surface gaps and dead rules during the audit (Phase 3 tracks them, Phase 7 applies catalog edits) so the skill sharpens rather than silently shrinks.

---

## Response style

Reports are scannable, not prose. **This section overrides any verbosity in the Phase 4 template examples below — when they differ, follow this.**

- **Recommendation-first, always.** Open every report with ONE line: `<N HIGH / N MED / N LOW, or "Clean">  →  Recommended: <action> (<≤12-word why>)`. Never bury the recommendation; never end a report without one.
- **Tables only for short text and comparisons — never for long findings.** A table is the right shape when every cell is a short phrase: the Per-group results grid, severity counts, a side-by-side comparison. The moment a cell needs more than one short line, a table becomes unreadable (wrapped paragraphs crammed into a column). So: findings whose whole `Finding → fix` fits on ONE short line may share a compact `| Sev | Rule | Location | Finding → fix |` table; but any finding that needs more — every HIGH, every `tradeoff` carrying `Proposed solution:` / `Benefit vs cost:`, anything multi-sentence, or a long location list — drops to a per-finding **block** instead: `### {file}` then `- L{n} [{rule}] {finding}` with indented `Type:` / `Fix:` / detail lines, exactly as the Phase 4 template shows. Don't force long text into a grid; pick the format that stays readable.
- **Disclosures are one line, not banner blocks.** Collapse every skip/coverage note to a single line, e.g. `Skipped: JSD-05 (cross-tree, single-file mode).`
- **Omit empty sections.** No "Gaps observed: none" headers. Drop "Why it matters" unless the risk is non-obvious in one glance.
- **End with a numbered Next Step** where item 1 IS the recommended action; close with "Reply with a number."
- **Numbered-reply discipline** — applies to **EVERY block that offers the user a choice**: the no-args menu, the Phase 4 Next Step, Phase 6 per-file prompts, Phase 7, the end-of-batch summary, AND any closing "open / optional / your call" block (authorizing a surfaced-but-blocked evolve candidate, committing, running a behavior check, etc.). **If you offer even ONE actionable option, present the options as a NUMBERED list — never as prose bullets or a "your call" list** (that prose-bullet closing is the exact failure mode this rule kills). Every primary acceptance path gets a number, *including the recommended action itself* — never omit it on the grounds that the user already sees it as the recommendation. Renumber to drop options that are no-ops on this run. Literal filter commands (`fix HIGH`, `fix _js/nds-foo.js`) sit below the numbered block as filters, not inside it. Never close with "reply with the literal action or a number."

Target: a report a reader skims in ~15 seconds with the decision obvious. Prefer the shortest version that stays actionable. The same applies to fix-phase replies and the `## Catalog evolved` block — lead with what happened and the next step, not a recap.

---

## Auto-drive

Default to advancing, not asking. Run the obvious next step automatically and report what you did. Pause ONLY at these three points — everywhere else, proceed:

1. **Before applying any code fix** — Phase 5 needs ONE explicit go (`fix all` / `fix <scope>` / a number). After that go, the batch runs file-by-file to completion **without per-file `next` prompts**.
2. **On a regression** — an agent-review FAIL or a `regression in {file}` report stops the run for revert.
3. **Before a git commit** — never auto-commit; propose the message and wait.

Catalog/persona self-evolution is NOT a pause point — Phase 7 auto-applies concrete rule refinements at run end and reports the diff (the user reverts via git if they disagree). Read-only / reversible steps (running the audit, emitting the report, `save`-ing it on request) take the recommended action without an extra confirmation round-trip. When nothing is ambiguous, do it and say so — don't stop to ask permission for the step you already recommended.

**Live behavior verification (Puppeteer) is NEVER auto-run.** The static review is the automatic Phase 6 gate; the live browser drive is always the user's choice — the skill offers `verify in browser` (skill drives it) vs a manual review the user performs, states a risk-based recommendation, and drives the browser ONLY on an explicit `verify in browser`. Auto-advance through a clean fix batch still applies (static review + rebundle are the gate); behavior verification rides alongside as an offered option, not a blocker.

---

## Phase 1: RESOLVE

Parse `$ARGUMENTS` into a mode and (optionally) a rule-group filter.

### No arguments — show menu and stop

If `$ARGUMENTS` is empty, **do not run the audit**. Instead, print this menu and wait for the user to reply with a choice:

```
NDS JS Audit — for best results run each group in separate sessions:

  1  js performance        Performance rules only (JSP)
  2  js dry                DRY/KISS rules only (JSD)
  3  js security           Security rules only (JSS)
  4  js architecture       Architecture rules only (JSA)
  0  exit

Reply with a number, or type the scope directly.

For a single-file audit (e.g. a newly-added component before merging),
type the filename directly — no menu needed. Omit the rule-group to run all four:
  /nds-js-audit nds-accessibility.js              (all four groups → one consolidated report)
  /nds-js-audit nds-accessibility.js performance  (one group)
  /nds-js-audit nds-accessibility.js architecture (all JSA rules, including deep-read sub-shapes)
```

Accept `0` or `exit` as "end here, nothing runs".

Do not begin Phase 2 or any file reads until the user responds.

### Mode selection (first argument)

| `$1` | Files in scope | Rule groups run |
|---|---|---|
| `js` | All `_js/nds-*.js` except `nds-core.js`, `nds-loader.js`, `nds-showcase.js` | Always paired with a rule-group filter (`performance` / `dry` / `security` / `architecture`); see below. In `architecture` mode, deep-read JSA rules are **skipped with a banner** — see "JSA deep-read rules in full-tree mode" below |
| **filename** (e.g. `nds-accessibility.js`, `_js/nds-accessibility.js`, `nds-accessibility`, `accessibility`) | One file: the resolved target | A rule-group filter (`performance` / `dry` / `security` / `architecture`), or `all`. **When the rule-group is omitted, default to `all`** — single-file `all` is cheap, so run it instead of prompting. In `dry` (and the dry portion of `all`), JSD-05 is **skipped with a banner**. `architecture` (and the architecture portion of `all`) runs every JSA rule, greppable AND deep-read. |

**File resolution.** When `$1` doesn't match a known mode token (`js`), treat it as a filename and try these in order: (1) literal `_js/$1` if `$1` already starts with `nds-` and ends in `.js`; (2) `_js/$1` if it ends in `.js`; (3) `_js/$1.js` if it starts with `nds-`; (4) `_js/nds-$1.js` for the bare-name form. Stop at the first existing file. If none exist, reply: *"Couldn't resolve `<filename>` to a file in `_js/`. Tried: `_js/<X>.js`, `_js/nds-<X>.js`. Pass the filename as it appears in `_js/`."* and stop.

**Excluded-file rejection.** If the resolved file is `nds-showcase.js` or any `.min.js`, reply: *"`<file>` is excluded from audits — see the 'Excluded files' section below for why."* and stop. Don't attempt a partial audit on a hard-excluded file.

**Direct-named core/loader advisory.** If the resolved file is `nds-core.js` or `nds-loader.js`, proceed with the single-file audit but print this one-line advisory at the top of the Phase 4 report (above the Summary block): *"Auditing `<file>` directly — note: the rule catalog is derived from core's patterns, so findings should be read as 'is this pattern still right for this file' rather than as automatic regressions."* These two files are excluded from full-tree `js` mode (the bulk run would treat the catalog's source-of-truth as a violation target), but single-file mode IS supported for deliberate review. For `architecture` single-file runs on these two files, **JSA's deep-read rules are the primary value** — the catalog's pattern rules typically pass cleanly on core/loader, but JSA surfaces design-tradeoff observations (scheduling choice, polyfill fidelity, unbounded caches) that the per-pattern catalog can't generalize.

Unfiltered four-group runs in **full-tree `js` mode** are not supported — sweeping all four catalogs across 40+ files in one pass is too expensive for routine use; run one rule group at a time. **Single-file `all` IS supported** (e.g. `/nds-js-audit nds-foo.js all`): four catalogs against one file is cheap (~15–25k tokens), and it emits one consolidated report. If the user passes `all` with `js` (full-tree), reject: *"Full-tree `all` isn't supported — run one rule group at a time (`js performance` / `js dry` / `js security` / `js architecture`). For an all-groups sweep, target a single file: `/nds-js-audit nds-<file>.js all`."* See the `all` row in the rule-group filter table below.

**SCSS auditing is not supported.** If the user passes `scss` or any path ending in `.scss`, stop and reply: *"SCSS auditing isn't covered by this skill — refactor `.scss` files manually against the conventions in `CLAUDE.md`. If you want to migrate JS work into CSS (the JSA-18 case: JS that re-implements what CSS expresses natively), audit the JS file instead — `/nds-js-audit nds-<name>.js architecture` — and a JSA-18 actionable finding can apply the SCSS edit as part of the same fix batch."* Do not run partial rules on an SCSS file. (`all` is no longer rejected here — in single-file mode it runs all four JS catalogs; see the `all` row below. Only `js all` is rejected, per the full-tree note above.)

**Strict scope constraint.** Only JSP, JSD, JSS, and JSA rules run. No SCSS-scoped rule groups exist in this catalog.

### Rule-group filter (second argument)

`$2` selects which rule group runs:

| `$2` | Rule groups included |
|---|---|
| `performance` | JSP |
| `dry` | JSD |
| `security` | JSS |
| `architecture` | JSA |
| `all` (**single-file only**) | JSP + JSD + JSS + JSA against the one file → one consolidated report |

**If `$2` is missing:** single-file mode defaults to `all` and runs immediately (single-file `all` is cheap — don't prompt for a group). Full-tree `js` mode has no default — show the Phase 1 menu and wait. `all` is valid in single-file mode only; in full-tree `js` it's rejected (see the full-tree note above).

**Single-file `all` — consolidated report.** Run each group's Phase 3 analysis against the one file, then emit ONE Phase 4 report (not four): a `## Per-group results` table (one row per group: clean / N findings), findings merged and grouped by severity exactly as the normal report does (rule IDs disambiguate the group), and every applicable single-file banner shown once (the JSD-05 single-file skip banner for the dry portion; no JSA deep-read banner since single-file runs them all). Compute the Recommended action over the merged finding set using the same Phase 4 table. Phase 5 fixes and Phase 7 evolve work identically on the merged set. This is the same shape as running the four groups back-to-back, collapsed into a single pass and a single report.

### Cross-tree rules in single-file mode

Single-file `dry` runs every JSD rule **except JSD-05** — JSD-05 compares helper bodies across all of `_js/` and needs the full tree; the report shows the JSD-05 skip banner (Phase 4) in its place. **JSD-15 runs in single-file mode** by reading the canonicals in `PERSONA.md` (sibling file) and applying each entry's "Audit behavior" check against the target — a deterministic per-file check with no corpus re-tally (see the JSD-15 row in `RULES-JSD.md`). Every other JSD rule is a per-file check and runs normally.

### JSA deep-read rules in full-tree mode

Full-tree `architecture` runs only the greppable JSA rules (JSA-01, -02, -04, -05, -06, -07, -16); the deep-read rules (JSA-03, -08 through -15, -17, -18, -19) are skipped and the report shows the JSA deep-read banner (Phase 4). Single-file `architecture` runs every JSA rule — the per-file deep reads (complexity, in-file duplication, mixed-concern structure, INP cost, CSS-subsumption) are where deep-reads earn their keep, and the single-file budget allows them.

### Excluded files

Two tiers — direct-named single-file audits behave differently from full-tree `js` mode for the first tier.

**Excluded from full-tree `js` mode only (auditable when directly named in single-file mode):**

- `_js/nds-core.js` — not included in full-tree runs because its patterns ARE the rule catalog; bulk-running the catalog against its source-of-truth produces noise. Single-file audits ARE supported (e.g., `/nds-js-audit nds-core.js performance`) for deliberate review of the helper surface itself — read findings as "is this pattern still right for this file" rather than as automatic regressions. Phase 5 also edits core when applying a JSD-05 promotion candidate via the `promote <api-name>` command — see "Applying promotion candidates" in Phase 5. Plain fix batches against components (`fix all`, `fix HIGH`, `fix <file>`) never touch core.
- `_js/nds-loader.js` — not included in full-tree runs because the loader has its own ordering rules outside the per-component JSP/JSD/JSS catalog. Single-file audits ARE supported when the user is intentionally tuning the loader; same advisory applies.

**Excluded always (no direct-named carve-out):**

- `_js/nds-showcase.js` — demo-page wiring, not a shipped component (its SCSS counterpart `_sass/_showcase.scss` is likewise Tier-1-excluded in `nds-css-audit`).
- Any `.min.js` file.

---

## Phase 2: READ

Source files are the single source of truth. Read them fully, not by skimming.

### MUST read every run

- **The rule catalog for THIS run's scope** — the detection rules live in per-group sibling files (Phase 3 → "Rule catalog"). Read the one(s) matching the run's rule-group filter: `RULES-JSP.md` (`performance`), `RULES-JSD.md` (`dry`), `RULES-JSS.md` (`security`), `RULES-JSA.md` (`architecture`). A run with no rule-group filter reads all four. JSD-15's canonicals are in `PERSONA.md` (read it whenever JSD applies). Read only what the scope needs — loading the unused groups is the token waste the rule-group filter exists to avoid.
- **`_js/nds-core.js`** — the full shared-utility surface. Re-read every run so the rule catalog reflects the current `NDS.*` API (names, arities, return values). Rules JSP-01 through JSP-08, JSD-01 through JSD-04, and JSS fixes that cite helpers (e.g., `NDS.escapeHtml` if/when promoted) all reference specific functions here; if core gains a utility, the skill's recommendation should route to it instead of flagging the pattern as unresolved.
- **At least one JS good-pattern exemplar** — `_js/nds-scroll-more.js` for RAF-throttled scroll + pooled ResizeObserver, `_js/nds-drawer.js` for NDS.State destructuring (`const { add: addState, … } = NDS.State`, ~L77), `_js/nds-modal.js` for NDS.State and backdrop API usage. Recommendations cite these with `file:line` so the user can copy a working pattern rather than invent one. JSA rules reuse the same exemplar set (plus `_js/nds-autocomplete.js:290-312` for size-capped fetch + abort, and `_js/nds-loader.js:415-423` for `MessageChannel`-based microtask yielding).

### MUST read every target file

Read each target file top-to-bottom before running the catalog. Pattern-matching alone misses context (a `setTimeout` inside a `NDS.debounce` callback is not a JSP-07 violation). A full read is what separates this skill from a grep script.

### Split components were removed (2026-06-04) — flag any reintroduction

NDS no longer uses per-component eager-shell + lazy-behavior splits: there are no `nds-X__delegated.js` halves, and `_installBehavior` / `_deferBehavior` / `NDS.loadSplit` / `window.__NDS_SPLIT` no longer exist. The mechanism was built for Filter/Mainnav/Stepper/Pagination and reverted — see `CLAUDE.md` → "JS Bundles & Shrinking the Critical Bundle". The chosen pattern for a `critical` component with init-unnecessary behavior is **cold-init in main**: cheap registration at init, behavior runs on interaction.

**Flag as a regression** any reintroduced `*__delegated.js` file, any reference to `_installBehavior` / `_deferBehavior` / `loadSplit` / `__NDS_SPLIT`, or a `// SPLIT COMPONENT` banner — it contradicts the CLAUDE.md decision. Wholesale de-criticalization (drop `critical: true` + move the whole file to the delegated `@bundles` list, Accordion-style) is NOT a split and remains valid.

---

## Phase 3: ANALYZE

Run the rule catalog (the per-group `RULES-*.md` file(s) read in Phase 2) file-by-file. Each match is recorded as: file, line, rule ID, offending snippet (≤120 characters), suggested fix pointing to the exact `NDS.*` call. Dedupe findings whose line ranges overlap so the same handler is not triple-flagged.

### Track observations for Phase 7

While analyzing, keep a parallel log of two meta-observations so Phase 7 has data to propose catalog edits from:

- **GAP**: a pattern in the current file that looks like a real violation (duplicated across files, obviously inefficient, breaks a CLAUDE.md convention, or opens a web-security sink) but does not match any existing rule ID. Record: file, line, snippet, one-sentence description of what looks wrong, and the rule group it would belong to (JSP, JSD, or JSS) if it existed.
- **SKIP**: a rule match that had to be discarded because the recommended fix does not apply in context. Record: rule ID, file, line, why the fix failed (e.g., "JSP-02 matched but the handler is already RAF-batched via an imported helper"). One-line rationale per skip — do not silently drop.

These logs are additive across the run and feed into the "Gaps observed" and "Dead-rule candidates" sections of the report.

### Rule catalog

The detection rules live in sibling files, one per rule group. Read the file(s) for THIS run's rule-group during Phase 2/3 — a run with no rule-group filter reads all four:

| Group | File | Covers | Rules |
|---|---|---|---|
| JSP | `RULES-JSP.md` | performance — listener/observer pooling, scroll/resize throttling, forced-layout-at-init | 11 |
| JSD | `RULES-JSD.md` | DRY/KISS — cross-file dedup, core promotion (JSD-05), persona conformance (JSD-15 → `PERSONA.md`) | 16 |
| JSS | `RULES-JSS.md` | client-side security sinks — innerHTML XSS, eval, tabnabbing, postMessage origin, untrusted URLs | 6 |
| JSA | `RULES-JSA.md` | architecture — unbounded caches, scheduling choice, complexity, in-file DRY, INP cost, CSS-subsumption, comment hygiene | 19 |

Severity (HIGH / MEDIUM / LOW) drives the order fixes are applied in Phase 5: HIGH (correctness and performance) first, then MEDIUM, then LOW.

### Shared rule conventions (apply to EVERY catalog rule)

- **Annotation exemption (global).** A match is NOT a finding when an inline comment within 3 lines above it names the SPECIFIC reason the pattern is intentional — the constraint or principle it answers to and, where the rule asks, the trusted source or re-activation path. Vague gestures (`// safe`, `// defensive`, `// needed`, `// just in case`) never qualify; the bar is a rationale a future reader can verify. Rule rows state only what THEIR comment must name (e.g. JSS-01: the value's source and why it's safe) and reference this convention as "annotation exemption (global)". Deleting such a comment re-arms the rule it exempts (JSA-19 protects them for exactly this reason).
- **Gap discipline (global).** When a match is plausible but the recommended fix doesn't clearly apply in context — or a deep-read rule can't concretely prove its bar (JSA-14's three invariants, JSA-19's would-a-competent-reader-miss-this test) — record a Gap/SKIP observation, not a finding. Precision over recall: the catalog sharpens by recording uncertainty, not by padding reports.

Agent briefs (Phase 3 / Phase 6) must paste both conventions verbatim — subagents don't read this file.

**JSA `Type:` field.** Every JSA finding carries `Type: actionable` (concrete change, bounded risk — has a `Fix:` line) or `Type: tradeoff` (deliberate design choice no mechanical fix resolves). `fix all` / `fix JSA` apply actionable findings only; tradeoffs are acknowledged, never auto-fixed. A tradeoff with a real high-leverage lever is marked `Type: tradeoff → recommend solving` with `Proposed solution:` + `Benefit vs cost:` lines. Full framing in `RULES-JSA.md`.

**Mode coverage.** Greppable rules run in both full-tree and single-file modes; deep-read rules run in single-file only (full-tree skips them with the Phase 4 banner). The authoritative which-runs-where lists are in Phase 1 (“Cross-tree rules in single-file mode” for JSD-05/JSD-15, “JSA deep-read rules in full-tree mode” for JSA); each `RULES-*.md` row also carries its own `Mode` where it matters.

### Single-file deep-read pass (dedicated agent)

**Single-file mode only.** After the inline catalog pass completes, spawn ONE dedicated deep-read agent (`Agent` tool, `general-purpose` subagent) whose sole job is to re-read the target file end-to-end with fresh context and hunt the rules that reward undivided attention. This is what makes single-file the deepest mode — the inline pass owns the fast greppable rules, the agent owns the architectural deep reads. Full-tree mode does NOT spawn this agent: its budget is committed to breadth, and deep-read rules are banner-skipped there.

**Deep-read scope for the agent:** JSA-03, JSA-08, JSA-09, JSA-10, JSA-11, JSA-12, JSA-13, JSA-14, JSA-15, JSA-17, JSA-18, JSA-19; JSD-14 sub-shapes (a) deep nesting, (b) redundant guards, (d) dead code, (e) unused locals; JSD-16 (frozen disabled-flag dead code); and the context-dependent confirmations for JSS-01 (innerHTML XSS vector) and JSS-04 (postMessage origin allowlist). Restrict the agent to the rule group(s) in scope for this run — on a single-group run with no deep-read rules (e.g. `performance`), skip the agent entirely; on `architecture`, `dry`, `security`, or `all`, run the in-scope deep-read subset.

**Brief template** (self-contained — the agent has no audit context):
1. **Target** — the resolved `_js/nds-<file>.js` path. "Read it top-to-bottom before judging; pattern-matching without the full read misses context."
2. **Rules to apply** — paste the in-scope subset of the deep-read scope above, each with its one-line detection signature and fix (copy from the Phase 3 catalog rows). Include the Shared rule conventions (annotation exemption + gap discipline) and the JSA-14 three-invariant bar verbatim.
3. **Reference anchors** — the Phase 2 good-pattern exemplars (`_js/nds-scroll-more.js`, `_js/nds-drawer.js`, `_js/nds-loader.js:415-423`, `_js/nds-autocomplete.js:290-312`) so fixes cite a real pattern.
4. **Output contract** — return ONLY a findings table: `| Sev | Rule | Location (file:line) | Finding → one-line fix | Type (JSA: actionable/tradeoff) |`, plus a short "Gaps observed" list for shapes no rule covers. No prose, no fabricated findings; two-to-five JSA observations is typical, ten+ signals padding.

**Merge.** Fold the agent's findings into the Phase 4 report, deduped against the inline pass (inline keeps greppable hits; the agent owns the deep-read rows). Tag agent-sourced rows so the merge is auditable (a trailing `(deep-read agent)` marker on the location cell). Apply the same Type/tradeoff and Gap-vs-finding discipline as the inline pass. If the agent returns nothing, say so — a clean deep-read pass is a real result.

### Consumer reach (pre-recommendation)

Before computing the report's Recommended action, compute **consumer reach** for any finding whose fix touches shared surface — a **JSD-05 promotion candidate** (adds a helper to `_js/nds-core.js` and migrates N call sites), or a **JSA/JSD fix that edits a shared helper** (a function grepped into ≥2 files, or any `_js/nds-core.js` / `_js/nds-loader.js` edit). Grep the call sites / dependents and emit a one-line `Reach: N sites — file:line, …`. When reach is broad, **downgrade the Phase 4 Recommended action** from a plain `fix` to "coordinate first — promote via per-candidate approval" (the CSS audit does the same with its Cross-component-reach line). This is a pre-recommendation signal only — it does not change the apply-time `promote` flow. Bounded to the already-cross-file rules: a normal single-file fix (one component, no shared-surface edit) emits no `Reach` line.

---

## Phase 4: REPORT

**STOP. Emit the report. Do not edit any files yet.**

**Skip-banner rule (governs all four banners below).** Show a banner only on the run mode where its rule was actually skipped — JSD-14, JSD-16, and the JSA deep-read rules → full-tree only; JSD-05 → single-file `dry` only. Omit it on any run where the rule was in scope and ran. When a rule WAS skipped, its banner is mandatory — never silently omit it; it converts a misleading "clean" into honest coverage disclosure.

Use this structure verbatim:

```
# Code Audit — {target} ({mode})

**{X HIGH / Y MED / Z LOW, or "Clean"}  →  Recommended: {action}** ({≤12-word why})

## Summary
- Files scanned: N
- Findings: X HIGH / Y MEDIUM / Z LOW
- Rule groups hit: JSP, JSD, JSA (list every group whose rules fired; omit groups with zero findings)

> **JSD-05 (cross-tree promotion candidates) was skipped in single-file mode.**
> To surface helpers in `<target>` that duplicate code in other files, periodically
> run `/nds-js-audit js dry` against the full tree.

> **JSD-14 sub-shapes (a)(b)(d)(e) were not scanned in full-tree mode.**
> Only sub-shape (c) (nested ternary chains ≥ 3 deep) is grep-detectable across
> the tree. Deep nesting, redundant guards, dead code, and unused locals
> require per-file deep reads that exceed the full-tree token budget. To
> surface those sub-shapes in a specific component, run
> `/nds-js-audit nds-<file>.js dry`.

> **JSD-16 (frozen disabled feature flag dead code) was not scanned in full-tree mode.**
> JSD-16 requires whole-file scope analysis (confirming a module-scope const is
> never reassigned anywhere in the file) that is not greppable with a single
> signature. To surface frozen-flag dead code in a specific component, run
> `/nds-js-audit nds-<file>.js dry`.

> **JSA deep-read rules (JSA-03, JSA-08, JSA-09, JSA-10, JSA-11, JSA-12, JSA-13, JSA-14, JSA-15, JSA-17, JSA-18, JSA-19)
> were not scanned in full-tree mode.**
> These rules require per-file analysis (cyclomatic outlier detection, in-file
> repeated-block matching, mixed-concern function structure, unbounded-collection
> scope tracing, leaner-architecture re-shaping, interaction-handler INP-cost tracing, comment-hygiene review) that exceeds the full-tree token budget. To surface those in a
> specific component, run `/nds-js-audit nds-<file>.js architecture`.

## HIGH
### _js/nds-alert.js
- L219 [JSP-01] Raw window scroll listener
  Fix: Replace with RAF-throttled handler; store unsubscribe. See _js/nds-scroll-more.js:140-157.

### _js/nds-accordion.js
- L42 [JSD-01] dataset.state assignment clobbers other state tokens
  Fix: Use NDS.State.set/add/clear instead.

## MEDIUM
### _js/nds-foo.js
- L42 [JSA-13] Mixed-concern function over 150 lines interleaves render, state, IO, event-binding
  Type: actionable
  Why it matters: Future edits to one concern carry regression risk in the others.
  Fix: Extract `_render()`, `_persistState()`, `_fetchPayload()`, `_bindEvents()` and keep the outer function as a thin orchestrator.

- L120 [JSA-09] `requestIdleCallback` polyfill runs idle work as a near-immediate macrotask on Safari <18
  Type: tradeoff
  Why it matters: Idle-tier components don't actually defer on older Safari; they run via `setTimeout(1)` with a fake 50ms deadline.
  Proposed solution: replace the `setTimeout(1)` fallback with a `MessageChannel`-based idle shim that estimates a real deadline (pattern at `_js/nds-loader.js:415-423`).
  Benefit vs cost: [INP + maintainability] LOW benefit — Safari 18 (Sept 2024) ships native rIC, so this only touches shrinking older-Safari traffic, vs [maintainability] the shim adds maintenance surface. Cost > benefit → stay put.
  Rationale for accepting: older-Safari degradation is the documented constraint; the polyfill degrades quietly there.

- L42 [JSA-13] Mixed-concern function over 180 lines wires every per-element listener inline
  Type: tradeoff → recommend solving
  Why it matters: ~10 listeners attached per element scale O(n) and the function is hard to edit safely.
  Proposed solution: event-delegation — one document-level handler set resolving `e.target.closest('.nds-foo')`, installed once; per-element init shrinks to state-sync.
  Benefit vs cost: [init-cost + maintainability] HIGH benefit — O(n×10) listeners → O(1), faster init, dissolves the long-function smell, vs [cross-file-reach] a careful refactor of a critical component. Worth solving → saved as a plan and linked.
  Rationale for accepting: only until the refactor lands; tracked at `~/.claude/plans/<name>.md`.

(JSA findings always carry a `Type:` field — `actionable` (include a `Fix:` line) or
`tradeoff`. A tradeoff includes `Rationale for accepting:`, and — when a real higher-leverage
fix exists — also `Proposed solution:` + `Benefit vs cost:`; if the benefit clearly wins it's
marked `tradeoff → recommend solving`. JSP / JSD / JSS findings do NOT use the Type field;
only catalog findings from JSA do. `fix all` and `fix JSA` apply actionable findings only;
tradeoffs (including `→ recommend solving`) are never auto-fixed — they're surfaced for the
user to decide, and a large solution may be saved as a plan and linked.)

## LOW
(same grouping)

## Promotion candidates (JSD-05)
- NDS.trapFocus(el, opts)
  Sites: _js/nds-modal.js:42-88, _js/nds-drawer.js:131-177
  Reach: 2 call sites + _js/nds-core.js — broad-surface change; recommend coordinating via per-candidate `promote` approval, not a plain `fix`.
  Rationale: both files implement focus containment with near-identical logic; a shared helper would remove ~90 lines of duplication and let future components opt in trivially.

## Gaps observed (no rule matched)
- {file-a}:{line} — {short description of the pattern that looks wrong}. The same shape also appears at {file-b}:{line} and {file-c}:{line}. No existing rule covers it. Proposed: new rule {group}-{next-id} "{short rule name}".
- {file}:{line} — {different gap}. Proposed: {extension of existing rule or brand-new rule}.

## Dead-rule candidates (rule matched but fix did not apply)
- {rule-id} — N matches in {file(s)}, all skipped because {specific reason the recommended fix does not apply in context}. Proposed: {narrow the detection / add an allowlist / delete the rule}.
- {rule-id} — N matches where {different context the rule did not account for}. Proposed: {concrete refinement}.

## Next Step

**Recommended: {action}** — {one-line reason tied to findings}

Other options:

1. `fix all` — apply every catalog finding marked `Type: actionable` (for JSA findings) plus every JSP/JSD/JSS finding in the report. Excludes JSD-05 promotion candidates (those go through `promote <api-name>` with per-candidate approval) and every JSA finding marked `Type: tradeoff` (those are acknowledged, not auto-fixed) — tradeoffs are skipped regardless of severity.
2. `promote <api-name>` — apply one JSD-05 promotion: edit `_js/nds-core.js` to add the proposed helper, migrate every call site listed in the report, and follow the file-by-file rhythm (rebundle + agent review + pause between files). Only offered when the report has "Promotion candidates (JSD-05)" entries.
3. `apply solution` — apply the `Proposed solution:` from a `tradeoff → recommend solving` finding inline (or `save the plan` if it's a larger refactor saved under `~/.claude/plans/`). Only offered when the report has a `tradeoff → recommend solving` finding.
4. `save` — **optional.** Persist this report to `.claude/audit-reports/` for cross-run comparison (the "Diff vs. Run (N−1)" trail) and the cross-session maturity-streak signal the persona ladder reads. Not needed to apply fixes or to evolve within this session — see "Saving the report" below.
5. `skip` — end the audit here; nothing is written, nothing is changed.

(Catalog/persona evolution is no longer a numbered choice — Phase 7 auto-applies any concrete Gap / Dead-rule / Persona-drift refinement at run end and appends a `## Catalog evolved` block to the report. The user reverts via git if they disagree.)

Finer-grained fix filters (type the literal, no number):
- `fix HIGH` / `fix MEDIUM` / `fix LOW` — catalog findings by severity (JSA findings of that severity are included only when `Type: actionable`)
- `fix JSP` / `fix JSD` / `fix JSS` / `fix JSA` — by rule group (`fix JSA` applies every JSA actionable finding regardless of severity; tradeoff findings always skipped)
- `fix <file>` (e.g., `fix _js/nds-alert.js`) — one file only (includes every actionable finding in that file across all four rule groups)
- `fix all then promote <api-name>` — chain a plain fix batch and a promotion application in one session (each still follows its own file-by-file rhythm and user pauses)
```

When emitting the Next Step block at the end of a real report, include only options available for THIS run: omit `promote <api-name>` when there are no JSD-05 promotion candidates; omit `apply solution` when there are no `tradeoff → recommend solving` findings; omit `fix all` on a clean run. Renumber so the user never sees a no-op choice.

Follow **Numbered-reply discipline** (see Response style): every available primary action gets a number including the recommended one, renumber to drop no-op options, and literal filter commands (`fix HIGH`, `fix _js/nds-foo.js`) sit below the numbered block.

### Computing the Recommended action

**`save` is never the recommendation.** It is optional and exists for cross-run comparison and the cross-session maturity-streak signal — not for the work this run enables. Recommend the substantive next step the findings call for; when there is none, recommend `skip` and mention `save` only as the optional way to keep a comparison anchor. Walk top-to-bottom and stop at the first match:

| Run state | Recommended | One-line reason template |
|---|---|---|
| Has "Promotion candidates (JSD-05)" entries | `promote <api>` | "applies the {N} JSD-05 promotion(s) file-by-file with per-candidate approval" |
| Has catalog findings with ≥1 `Type: actionable` (JSA) or any JSP / JSD / JSS finding | `fix all` | "applies the {N} actionable finding(s) file-by-file — narrow with `fix HIGH` / `fix <file>` / `fix JSA`" |
| Has a `tradeoff → recommend solving` finding (any severity) | `apply solution` | "the {N} `recommend solving` tradeoff(s) carry a high-leverage `Proposed solution:` — apply it inline, or `save the plan` for a larger refactor" |
| Phase 7 auto-applied refinements this run AND no findings to act on | `skip` | "the {N} refinement(s) are already applied (see `## Catalog evolved`); keep them or `git checkout` to revert" |
| JSA tradeoff-only findings (all plain-accepted), no other findings | `skip` | "the {N} JSA tradeoff finding(s) document deliberate design choices — nothing to apply" |
| Clean run — zero findings | `skip` | "nothing to fix" |

**When several states match, the substantive action wins** the recommendation (promote > fix > solve), and the no-action rows only fire when no fix/promote/solve action exists. Phrase the reason in plain language tied to THIS run's numbers.

**Appending the optional `save` nudge.** After the recommendation reason, add a short `save` mention only when it would actually pay off — keep it a clause, never the headline:
- If this run auto-applied Phase 7 refinements: "; `save` to persist the `## Catalog evolved` record."
- Else if a prior saved run for this scope exists (a same-`{scope}` file in `.claude/audit-reports/`): "; `save` to extend the comparison trail (Diff vs. Run N−1)."
- Else (no prior saved run): "; `save` if you want a baseline to diff future runs against."
Never frame `save` as something the user *should* do — it is the user's call, and skipping it costs nothing within this session (fixes and same-session evolve do not depend on it).

### Saving the report (optional, user-approved)

**What save is for.** A saved report is a comparison artifact, not a requirement. Its two payoffs are both *across* runs: the "Diff vs. Run (N−1)" section that makes multi-run refinement legible, and the cross-session maturity-streak signal the persona ladder reads (`enforced → settled` after 3 consecutive zero-divergence full-tree runs). Within a single session, neither applying fixes nor Phase 7 evolve depends on a saved file — same-session evolve aggregates the in-conversation reports directly. So never push `save`; offer it, and let the user decide whether the comparison trail is worth keeping.

When the user replies `save` — alone, or combined with another action like `fix HIGH then save` — write the current report verbatim to `.claude/audit-reports/` under one of these patterns:

**Full-tree filename:** `YYYY-MM-DD-nds-js-{category}-audit-run-N.md`
**Single-file filename:** `YYYY-MM-DD-nds-js-{component}-{category}-audit-run-N.md`

- `YYYY-MM-DD` is today's date (the run date, not the save date — they're the same in 99% of cases, but use the date of the audit if they diverge).
- `{category}` is the rule-group filter the run used: `performance` / `dry` / `security` / `architecture`. The Phase 1 rule-group filter maps 1:1 to this slug — `performance` → `performance`, `dry` → `dry`, `security` → `security`, `architecture` → `architecture`. Always lowercased.
- `{component}` (single-file mode only) is the resolved target's stem with the `nds-` prefix stripped: `_js/nds-accessibility.js` → `accessibility`. Lowercased, hyphens preserved (`nds-cooldown-button.js` → `cooldown-button`).
- `N` is the **per-scope save-order index**:
  - **Full-tree:** `(count of existing `*-{category}-audit-run-*.md` files at the full-tree pattern in `.claude/audit-reports/`) + 1`.
  - **Single-file:** `(count of existing `*-{component}-{category}-audit-run-*.md` files in `.claude/audit-reports/`) + 1`. Indexed per-(component, category) so "Run 2 vs Run 1 of accessibility performance" stays diffable independently of any full-tree run that landed between them.
- Index is per-category (and per-component for single-file), not global — comparing apples to apples is what makes "Diff vs. Run (N−1)" useful. Do NOT count `/nds-js-audit` invocations from the conversation that didn't get saved; the index reflects persisted artifacts only.

**Always include a frontmatter-style header** in the saved file so later audits can be diffed meaningfully:

```markdown
# Code Audit — {scope-line} — Run N

**Date:** YYYY-MM-DD
**Rule catalog version:** {single group e.g. "JSA" | combined e.g. "JSP + JSD + JSS + JSA"} (note any post-evolution refinements: "post-evolution: JSD-03 [400,2000] range, JSS-01 allowlist v3, JSA-13 80-line threshold")
**Invocation:** `/nds-js-audit {args}`

## Summary
…
```

`{scope-line}` is `` `_js/` (js mode) `` for full-tree runs, or `` `_js/nds-accessibility.js` (single-file mode) `` (use the actual file path) for single-file runs. Single-file reports MUST also surface the JSD-05 skip banner from Phase 1 verbatim when the run was `dry`.

**Diff-vs-prior section.** If `N ≥ 2`, append a "Diff vs. Run (N−1)" section at the bottom of the file listing what changed between this run and the last saved one: new findings, closed findings, re-classified findings, and any rule evolutions applied between runs. This is what makes multi-run refinement legible across time.

**Never overwrite.** Before writing, `ls .claude/audit-reports/` to confirm the target filename doesn't exist. If it does (e.g., two saves on the same day), bump the `-N` index.

**Writes go only to `.claude/audit-reports/`.** Never save reports inside `_js/`, the project root, or other Jekyll-tracked directories — the `.claude/` tree is outside the site build.

The "Gaps observed" and "Dead-rule candidates" sections are omitted when both logs are empty. Each proposal must be concrete: a specific rule ID to add/narrow/remove, with at least one example finding that motivates it. Hand-wavy proposals ("maybe add a rule for ...") do not belong here.

Findings are grouped by severity first (action priority), then by file (navigation), then by line. Rule IDs in brackets enable filter commands like "fix JSP".

If the run surfaces zero findings in a rule group, omit that section rather than printing an empty header.

---

## Phase 5: FIX (optional, user-approved)

Only enter this phase when the user replies with an explicit fix instruction. Recognized forms:

- `fix HIGH` / `fix MEDIUM` / `fix LOW` — catalog findings by severity (JSA findings at that severity are included only when `Type: actionable`)
- `fix JSP` / `fix JSD` / `fix JSS` / `fix JSA` — catalog findings by rule group. `fix JSA` applies every JSA actionable finding regardless of severity; tradeoff findings are always skipped.
- `fix <file>` — every actionable finding in one file (across JSP/JSD/JSS/JSA; JSA tradeoffs still skipped)
- `fix all` — every catalog finding marked actionable. Excludes JSD-05 promotion candidates (those go through `promote <api-name>`) and every JSA finding marked `Type: tradeoff` (those are acknowledged in the report but never auto-fixed).
- `promote <api-name>` — apply one JSD-05 promotion candidate (edits `_js/nds-core.js` to add the helper, then migrates every listed call site). Covered separately in "Applying promotion candidates" below — the flow diverges from plain fix batches because it spans core plus N files.
- `fix all then promote <api-name>` — chain a plain fix batch and one promotion in a single session. Each segment still follows its own file-by-file rhythm; the user `next`s through both.

**JSA findings follow the same file-by-file rhythm as JSP/JSD/JSS findings.** Each actionable JSA finding has a proposed `Fix:` line in the Phase 4 report; applying it goes through the same Apply → Rebundle → Agent review → Per-file summary → STOP-for-`next` cycle. When a file has findings across multiple rule groups, all in-scope findings (per the user's filter) are addressed in that file's slot before advancing. JSA tradeoff findings are never auto-fixed; they exist in the report to be acknowledged.

### Before applying (safety checkpoint)

Automated refactors carry regression risk. Before starting the first fix batch, tell the user:

> Recommended: create a git checkpoint now so any fix batch can be reverted cleanly — for example `git add -A && git commit -m "checkpoint before nds-js-audit fixes"`. The skill will NOT run git commands; this is your call.

If the user declines or ignores the reminder, proceed — they know their workflow.

### Application order (file-by-file with checkpoints)

Apply fixes **one file at a time**, not one rule group at a time. For each file in the user's batch:

0. **Perf baseline (user-elected — only when the file has a measurable perf finding).** A before/after perf measurement is a Puppeteer browser drive, so — like all live verification — it is **never auto-run**; offer it before editing and capture the baseline only if the user opts in. When the file has an actionable JSP finding or a JSA perf finding whose metric is headless-measurable (`LayoutCount`/`RecalcStyleCount` for JSA-02/JSD-06, JS-heap-across-cycles for JSP-06/JSP-08/JSA-03, handler-invocation-count for JSP-01/JSP-02/JSP-07, longtask/init-time for JSP-10/JSA-01, in-flight-fetch-count for JSA-06), tell the user: *"this fix has a measurable before/after — reply `measure` to capture a baseline now and a delta after, or I'll proceed and report the change as structural."* If they opt in, capture the "before" per `PUPPETEER.md` BEFORE the edit (once the fix rebundles the pre-fix number is gone) and record it for the Phase 6 delta. If they don't, proceed and describe the perf change structurally. Skip the offer entirely for non-perf findings and for perf fixes whose benefit isn't reliably measurable headless (note which, don't fabricate a baseline).
1. Apply every in-scope finding in that file (HIGH → MEDIUM → LOW within the file).
2. Re-run Phase 3 on that file: confirm every targeted finding is resolved and no new findings appeared.
3. Emit the Phase 6 per-file report — including the before/after perf delta for any baseline captured in step 0.
4. **Auto-advance when clean** (Auto-drive rule). If Phase 6's agent review passed with no regression, emit the one-line per-file summary and move straight to the next file — do NOT stop for `next`. **STOP only** on a regression (agent-review FAIL or a `regression in {file}` report) or an explicit `stop`.

A regression is the rollback grain — that's where the user checkpoints and reverts a single file cleanly. Filters (`fix HIGH`, `fix JSP`, etc.) decide which findings are in-scope; the rhythm is the same.

### Out-of-scope modifications

- Fix batches MAY edit `_js/nds-core.js` and `_js/nds-loader.js` when a finding's `Fix:` recommendation routes there. The common case is JSA-05 (drop `critical: true` from a component's registry entry in `_js/nds-loader.js`); JSD-05 promotion candidates also edit core, but they go through the separate `promote <api-name>` flow (see "Applying promotion candidates" below) because they coordinate core + N call sites and need a signature-confirmation step. When a fix touches core or loader as part of a component-file batch, the per-file closing summary MUST list every file edited under the `Cross-file edits` line — the user must never be surprised by a loader/core change. Do NOT make incidental core/loader edits outside a finding's recommendation: a JSP-01 fix in `_js/nds-foo.js` may only touch `_js/nds-foo.js` unless the rule's `Fix:` column explicitly routes elsewhere. Direct-named single-file audits of `_js/nds-core.js` or `_js/nds-loader.js` (e.g. `/nds-js-audit nds-core.js performance`) remain the right shape when the AUDITED file is core/loader itself — the carve-out is for deliberate review of those files, not the only path to fixing them.
- Fix batches MAY ALSO edit `_sass/**/*.scss` when a JSA finding's `Fix:` recommendation routes there — the canonical case is JSA-18 (JS work CSS expresses natively). The SCSS edit MUST be named specifically in the `Fix:` line (which file, which selector, what to add or change) and stay narrowly bounded to the migration the rule called out. Respect the SCSS conventions in CLAUDE.md: `@use '../mixins' as *;` at the top of new files, `nds-` prefix on new classes, CSS Logical Properties for direction-aware properties (`margin-inline-start`, `inset-inline-start`, `text-align: start`, etc.), design tokens only (no raw hex or `--colors-*` references). The per-file summary MUST list every `.scss` file edited under `Cross-file edits` — the user must never be surprised by an SCSS change. Do NOT make incidental SCSS edits outside a finding's recommendation, and do NOT generalize this carve-out into a license to audit SCSS: SCSS *auditing* (running rules against `.scss` files) remains out of scope per Non-goals; only SCSS *editing as part of a JSA fix* is permitted here. SCSS edits have no per-fix rebundle step (no equivalent of `js_processor.rb`) — Jekyll re-processes SCSS automatically when the dev server is running.
- Do not run `bundle exec jekyll build` unless the user explicitly asks. The Phase 6 Puppeteer behavior test MAY start `bundle exec jekyll serve` (port 4002) when no server is already running — that test requires a live server, so running the audit's fix phase carries that authorization. Reuse an existing server; don't restart per file. See `PUPPETEER.md`.
- Do not reformat code, adjust whitespace, or rename unrelated identifiers. Keep diffs minimal so the user can verify each change at a glance.

### Applying promotion candidates (JSD-05)

When the user replies `promote <api-name>`, take the named JSD-05 candidate through a mini-batch that spans `_js/nds-core.js` + every call site listed in the Phase 4 report. The scope is larger than a normal fix batch (touches multiple files plus core) and the risk profile is different — a bug in a new core helper breaks every migrated call site at once — so the per-file rhythm is slightly adapted:

1. **Confirm the helper's signature** with the user before touching core. Summarize the API name, parameters, return shape, and any divergence from the original duplicated bodies (callers often have slightly different needs — e.g., one caller wants `respectNav: false`, another needs the raw measurements vs a pre-computed `flipUp`). Proceed only on explicit user approval.
2. **Edit `_js/nds-core.js`** to add the helper. Follow core's existing style: IIFE-scoped section, section-header comment banner (`// ── Name ─────`), usage example inside the comment block, same indent as peer helpers, positioned near structurally-similar helpers (observer-pool helpers near each other, utility fns near each other). Rebundle. Spawn an agent review focused on: (a) does the helper's body cover every caller's needs without forcing behavior change, (b) what migration-time constraints does each caller inherit (ordering, opts, staging), (c) edge cases in the helper itself (null inputs, detached elements, missing ambient state). Pause for user `next` before advancing. This pause is important — it's the cheapest point to revise the signature before N call sites commit to it.
3. **Migrate each call site one at a time.** For each file in the candidate's call-site list: apply the migration, rebundle, run agent review, emit the per-file closing summary (same template as plain fix batches), pause for `next`. Migration-specific agent-review questions to include: (i) semantic equivalence with the pre-migration inline code (produce identical values for every branch — with / without ambient DOM, RTL / LTR, etc.), (ii) any caller-specific parameters the helper requires (e.g., `respectNav: false`), (iii) ordering constraints the caller must preserve around the helper call (e.g., pre-staging DOM via `visibility:hidden;position:fixed` so the helper's measurements are non-zero), (iv) stale references / renamed instance fields from the refactor.
4. **Emit the batch summary** when the last call site migrates. Include: helper added (name + one-line description), call sites migrated, findings resolved (usually none — promotion is a refactor, not a fix; if a JSD-05-adjacent JSD-02/JSP-06 finding on one of the migrated files was folded into the same batch, list that too), and any follow-up the agent review surfaced that was out-of-scope for this batch.

Rollback grain: since promotions span core + N call sites, a regression in any one call site doesn't require reverting core. The user reverts the broken file only; the helper stays in core and the remaining migrated call sites stay migrated. Retry the broken migration later once the user and skill agree on what went wrong.

### Auto-rebundle after each file

Run `ruby _plugins/js_processor.rb` automatically at the end of each file fix — required after any `_js/` change per `CLAUDE.md`. Surface any rebundle errors in the per-file summary; on failure, stop the batch (do not proceed to the next file). Per-file rebundle matches the per-file fix rhythm so the user can test each file before the next lands.

---

## Phase 6: VERIFY

After every file's fixes land, confirm the following on that file before emitting the per-file summary:

- Phase 3 re-runs clean: every targeted finding is gone and no new findings appeared.
- Structural invariants hold: every new `NDS.on*` call stores its unsubscribe handle where teardown can reach it, and the loader registration still works.
- Identifier sanity: any fix that INJECTS new setup code (`new AbortController()`, new declarations, observer scaffolding) must use identifiers that exist in the enclosing scope. A typo (`selectElement._ac` vs `selectInput._ac`) throws at runtime BEFORE the listener attachments that follow — earlier code still ran, but half the component's interactions silently stop responding. After inserting such a block, verify every identifier against the function's parameter list and enclosing `const`/`let`/`var` declarations.
- Rebundle: run `ruby _plugins/js_processor.rb` automatically. Surface its output (bundle sizes or errors) in the per-file summary. If rebundle fails, stop the batch — do not proceed to the next file.
- **Agent review (static review automatic + mandatory; live behavior verification is the user's choice — never auto-driven):** after rebundle succeeds, spawn a review agent via the Agent tool for the **static review** (cheap, read-only — catches typos / semantic drift / call-site breakage). The static review always runs without asking. **Puppeteer is never run automatically.** Live behavior verification is always offered as a user choice — `verify in browser` (the skill drives the component in headless Chrome) OR a manual review the user performs themselves — because some changes are quicker or more meaningful for the user to eyeball than to automate. The skill states a risk-based recommendation but drives the browser only on an explicit `verify in browser`. Wait for the static report before emitting the per-file closing summary; fold it in. If the static review flags a real regression, stop — do not produce a clean summary or advance to the next file.

### Agent review (static automatic; live behavior verification is the user's choice)

After rebundle succeeds, spawn a review agent (`Agent` tool, `general-purpose` subagent) for the **static review** — it catches silent failures the rule catalog can't see (semantic drift, typos in injected setup, call-site breakage, escape-context mismatches). The static review is mandatory, cheap (read-only), and runs without asking.

**Puppeteer is never auto-run.** Live behavior verification is always presented as a choice for the user — the skill never decides to drive the browser on its own:
- `verify in browser` — the skill drives the fixed component in headless Chrome per `PUPPETEER.md`, reproducing the per-rule scenario(s) from "Behavior regression verification (per rule)" below and asserting no console errors.
- **manual review (the user)** — the user exercises the change themselves; the skill hands them the exact per-rule checklist rows so they know precisely what to exercise. Some changes are quicker or more meaningful for the user to eyeball than to automate (a visual variant, a hover/focus nuance, a real-data interaction).

**The skill states a recommendation; the user decides.** Use the risk signal to recommend a path — but NEVER auto-drive the browser:
- **Recommend a behavior check** when the change has runtime behavior a static read can't fully settle: event wiring / teardown (JSP-05 / JSP-06 / JSP-08, JSD-09), DOM construction or structure change (JSS-01, JSA-07, JSA-13), state-machine transitions (JSD-01), navigation / URL / postMessage (JSS-04 / JSS-05), first-paint / CLS / reveal-timing, async / fetch, or any **Medium+** finding in the per-rule table below. Phrase it: *"Recommended: a behavior check for this {risk} change — reply `verify in browser` to have me drive it, or review it manually yourself."*
- **Recommend proceeding (static-only is enough)** when the change is mechanically equivalent AND the static review confirms it: in-file DRY/reduction (JSA-11, JSA-14 actionable), a CSS rule replacing an inline style (JSA-18), dead-guard removal (JSD-08), breakpoint-token swap (JSD-03), comment/naming-only — i.e. **Low** on the per-rule table with no DOM-structure or wiring change. Still list the option: *"Recommended: proceed — static review + compile confirm equivalence; reply `verify in browser` if you'd rather drive it."*

The browser drive runs ONLY on an explicit `verify in browser`. Absent that, behavior verification is the user's (manual) responsibility and the batch proceeds per Auto-drive — the static review + rebundle are the automatic gate. Never present an un-driven, un-reviewed change as "verified by browser"; the per-file summary states exactly which path was taken.

**Single agent, not a workflow.** The static review is ONE agent; a `verify in browser` drive is the same one agent extended with the Puppeteer step (or a follow-up agent on the user's request). Do NOT escalate to a multi-agent workflow to verify a routine fix batch. If a batch is genuinely broad or high-risk enough to want several independent verification perspectives (large promotion across many call sites, a structural refactor spanning files), *recommend* a workflow and let the user opt in — never launch one by default.

**Brief template:**

1. **What changed** — concise before/after snippets with file paths + line numbers.
2. **Reference anchors** — cite `_js/nds-core.js:<line>` for any core helper invoked.
3. **What to verify statically (under 200 words)** — 3–5 specific questions: semantic equivalence, call-site impact, edge cases (null/empty/missing options), escape/boundary semantics, typos / scope issues, plus a one-line catch-all.
4. **Behavior test (Puppeteer — include this step ONLY when the user has elected `verify in browser`; omit it entirely otherwise)** — follow `PUPPETEER.md`: ensure the dev server is up on `http://localhost:4002`, launch the component in headless Chrome via `puppeteer-core`, reproduce the interaction for every rule that fired in this file, and assert the fix works with no console errors. Report each rule as `PASS` / `FAIL` / `not-headless-testable` with the exercised steps. The per-rule scenarios live in the "Behavior regression verification (per rule)" table below — automate the matching row, don't print it. **For perf findings**, also run the "after" measurement from `PUPPETEER.md`'s "Performance measurement (before/after)" section against the same scenario as the pre-edit baseline (the baseline numbers are supplied below in this brief), and report the before/after delta per measured rule — or the honest "structural / within-noise" result when there's no clean delta.
5. **Response format** — direct quoted `file:line` references for static findings; for the behavior test, the per-rule verdict block from `PUPPETEER.md`. Under-200-word cap on the static prose. No vague "looks fine".

**On report:**
- **Clean** → static review found nothing AND, *if the user elected `verify in browser`*, every behavior test returned `PASS` (or a justified `not-headless-testable`). When the user did NOT elect a browser drive, a clean static review + rebundle/compile success (+ a placement grep for CSS edits) IS the clean result — say so explicitly, and record behavior verification as the user's open choice (recommended path named), never as "passed". Add a one-line recap to the per-file summary's "Agent review" and "Behavior verification" lines.
- **Regression found** — a static finding OR any Puppeteer `FAIL` (broken assertion or non-empty console errors) → do NOT emit a clean summary, do NOT advance. Report verbatim (quote the failing assertion / error text), propose follow-up or revert, wait. Overrides auto-`next`.

**Follow-up fixes.** Executable-code follow-ups re-run agent review on the new change. Documentation-only follow-ups (comments, docstrings, naming-in-comments) skip the re-test. Note the follow-up briefly in the summary's `Agent review:` line.

### Behavior regression verification (per rule)

Re-running the rule catalog proves the offending pattern is gone. It does NOT prove the component still works. NDS has no JS unit-test suite, so behavior verification is needed — but **it is always the user's choice**, never auto-driven. This per-rule table is dual-purpose: it is the **scenario source the skill automates when the user replies `verify in browser`** AND the **manual checklist the skill hands the user when they choose to review it themselves**. The `Regression risk` column feeds the skill's *recommendation* (Medium+ → recommend a behavior check; Low → recommend proceeding static-only), not an auto-decision.

For every rule ID that fired in the current file, surface the matching row(s) below in the per-file summary so the user can either ask the skill to drive them (`verify in browser`) or walk them manually. A `not-headless-testable` rule — a UI-shell piece with no demo page (`header`, `footer`, `mainnav`, theme, font-loading) or an interaction gated behind a browser-blocked user gesture — can only be reviewed manually; name why and present its row for the user to confirm. Never present any rule as "passed" unless it was actually driven (by the skill on `verify in browser`) or the user confirmed it.

| Rule | Regression risk | What to verify in the browser |
|---|---|---|
| JSP-01 (pooled resize) | Low — `NDS.onResize` is a transparent wrapper over window resize | Resize the window across breakpoints; the component must still adapt (layout mode switches, recomputed widths, etc.). |
| JSP-02 (RAF scroll throttle) | Low — RAF wrapping is idempotent when the handler is pure | Scroll fast with keyboard and wheel; confirm sticky/reveal behavior still triggers at the right scroll position with no visible lag or missed frames. |
| JSP-03 (NDS.onIntersect) | Low-Medium — pool groups by threshold/rootMargin; behavior is identical for same config | Scroll the element into and out of the viewport at different speeds; the intersection-driven action (counter animation, lazy-reveal, etc.) fires once and does not re-trigger on minor movements. |
| JSP-04 (NDS.onElementResize) | Low-Medium — pooled ResizeObserver fires on same events | Resize the host container (drag splitter, toggle sidebar, rotate device emulator); layout recalculates consistently. |
| JSP-05 (NDS.onDOMAdd/Remove/AttrChange) | **Medium-High** — MutationObserver semantics differ subtly when selector-scoped; fire timing may change | Dynamically add/remove/mutate the observed selector in devtools or via component API (add row to table, inject option into select, toggle attribute); the handler must fire exactly as before. Test edge cases: bulk insertions, removal during iteration. |
| JSP-06 (stored unsubscribe / AbortController) | **Medium** — this rule's fixes INJECT new setup code (`new AbortController()`, per-element guards, etc.) BEFORE the existing `addEventListener` loop. A typo in the injected setup (wrong identifier, wrong property name) throws at runtime and silently detaches nothing — but all subsequent `addEventListener` calls in that function are skipped, and the component's click/keyboard handlers never bind. Symptom: the component opens/closes normally (earlier listeners still work) but keyboard navigation or click-handled actions stop responding. | Two-part check. **(1) Functional smoke test**: exercise at least one primary interaction that flows through the loop — click one of the listener-attached elements AND press one key the handler listens for. If either silently does nothing, open devtools console and look for a `ReferenceError`/`TypeError` thrown during init. **(2) Leak test**: open and close/destroy the component repeatedly (open-close a modal 20x, navigate away and back); no listener leaks (check devtools Memory or listener count in Event Listeners panel). Part 1 catches silent-throw regressions in the injected setup; Part 2 catches the original pooling/teardown bug. |
| JSP-07 (NDS.debounce) | Low — exact delay preserved | Trigger the debounced event rapidly (type fast in a search field, resize rapidly); final callback fires once after the debounce window. |
| JSP-08 (observer teardown) | **Medium** — injecting `.disconnect()` into a teardown path is usually safe, but placement matters: disconnecting BEFORE the rest of teardown runs can race with synchronous DOM reads that depend on observer-driven state. | Re-init or destroy the owning component at least 10x while watching for retained-memory growth in devtools (Performance/Memory tab). Confirm the component still reacts to its observed mutations BEFORE teardown runs (e.g., for a forms msgElement observer, type into the field and verify the success/error placeholder still toggles). |
| JSD-09 (teardown handler storage) | **Low-Medium** — the fix adds new `this.handlers.{name} = ...` assignments; a typo in the key name silently re-creates the same dead-teardown shape. | Confirm the key used in teardown's array EXACTLY matches the key assigned in the binder (copy-paste safe). Exercise the listener's action at least once (click the button, fire the event) and confirm it still fires. Then destroy/re-init the component and confirm the old listener is actually removed (devtools Event Listeners panel). |
| JSD-01 (NDS.State) | **Medium** — `dataset.state = 'open'` clobbers other tokens; `NDS.State.add('open')` merges with existing tokens. Wrong helper silently breaks multi-state components | Exercise every state transition on the demo page (default → hover → pressed → disabled, open → closed → focused, etc.). Confirm the `data-state` attribute holds the right token set at each step (inspect in devtools). Keyboard and pointer paths both. |
| JSD-02 (NDS.Status) | Low — single-value attribute, helper is a direct replacement | Trigger the status-changing action (copy button, form submit); status pill/indicator appears and clears on the expected timeline. |
| JSD-03 (NDS.breakpoints) | Low — pixel values match the tokens | Resize across all breakpoints (mobile / tablet / desktop / large-desktop); responsive behavior switches at the same viewport widths. |
| JSD-04 (NDS.isRTL / NDS.lang) | **Medium** — live getter vs cached read. If a component cached the value and relied on cache, switching to `NDS.isRTL` makes it reactive, which may be the intent or an unintended change | Toggle the direction switcher on a page that uses the component; confirm layout flips cleanly and does not leak into other direction-unrelated features. |
| JSD-05 (promotion candidate) | **Medium-High** — a bug in the new core helper breaks every migrated call site at once. A wrong signature, a missing caller-specific opt (e.g., `respectNav: false`), or a subtle off-by-one in the returned measurements produces semantic drift that only shows up in specific caller contexts. Skipping the "confirm signature before editing core" step compounds this: once N call sites commit to the signature, changing it means migrating them again. | Exercise every migrated component's primary interaction under both ambient conditions the helper's opts cover. For a flip-position promotion: open dropmenu, tooltip, date-picker, and custom-select at both the top and bottom of the viewport; each should flip (or not) identically to the pre-promotion behavior. Test with AND without the ambient element the helper can respect (e.g., with AND without `.nds-main-nav` on the page for nav-aware helpers). For a scroll-close helper: scroll inside and outside the scope element for each component — inside must not close, outside must close. Leak test: open/close each migrated component 20+ times and confirm no document/window listener count growth in devtools Event Listeners panel. |
| JSD-06 (batch reads-before-writes) | Low — refactor preserves behavior when done correctly, but easy to get wrong | Component's animated transitions and measurements must still be visually correct: height animations expand to the right size, position calculations land in the right place. Compare before/after with reduced-motion on and off. |
| JSD-07 (component contract) | **Medium** — refactoring the public shape can break documentation-page JS tabs and consumer integrations | Open the component's doc page and exercise every snippet in the "JS API" tab. Confirm `NDS.{Name}.init()`, `.reinit()`, `.create(el)` all work as documented. |
| JSD-08 (dead defensive guards) | Low — removing `typeof NDS !== 'undefined'` hedges only prunes dead code since the loader guarantees NDS exists. Risk is a missed case where the component actually runs before the loader (module top-level code). | Confirm the guard you removed was inside a method or function invoked after init — not at module top level. Then load any page using the component; no ReferenceError should appear in devtools console. |
| JSS-01 (innerHTML XSS) | **Medium-High** — replacing `innerHTML = template` with `createElement` + `textContent` changes the DOM-construction path. Whitespace inside templates disappears; child-element structure can subtly reorder; event-listener attachment points move. | Exercise every visual variant the affected component supports — every `variant`/`status`/`display` option in one of its factory methods (e.g., `NDS.Alert.create({ variant: 'success' | 'error' | ... })`). Inspect the rendered DOM in devtools and confirm class names, aria attributes, and text content all match the pre-fix version. Then paste an XSS probe string (`<img src=x onerror=alert(1)>`) as the user-facing value: it must render as literal text, not execute. |
| JSS-02 (eval/Function removal) | Low — dynamic code paths are rare in UI; replacements should behave identically. | Trigger the code path that previously built the string: call the feature from the browser console with both a typical value and an unusual one (symbols, empty string, very long string). No syntax errors, no silent noops. |
| JSS-03 (target="_blank" + rel="noopener") | Low — pure attribute addition; no behavior change. | Click the affected link, confirm new tab still opens. In devtools, inspect the rendered `<a>` — the `rel` attribute must contain both `noopener` and `noreferrer`. Open the new tab from the console: `console.log(window.opener)` must return `null`. |
| JSS-04 (postMessage origin check) | **Medium** — if the expected origin list is wrong, legitimate messages get dropped silently. | Identify every page/iframe that sends messages to this handler and confirm its origin is in the allowlist. Trigger one known-good message and verify the handler fires. Then send a message from a different origin (open devtools on a different site and `window.postMessage(...)` to this page) — it must be silently dropped. |
| JSS-05 (URL scheme validation) | **Medium** — wrapping `window.open`/`location.assign` in scheme checks can reject URLs the user legitimately expected to work if the allowlist is too narrow. | Test every share/navigate path the component supports (`http`, `https`, `mailto`, `tel` if applicable) end-to-end. Then try `javascript:alert(1)` as the `data-*` attribute — it must be silently dropped with no script execution and no alert. Confirm no console errors for the blocked case. |
| JSS-06 (prototype-pollution safe-merge) | Low — `safeMerge` is a thin wrapper around `Object.assign` that filters three specific keys (`__proto__`, `constructor`, `prototype`) which never appear in legitimate state shapes. Behavior on any real-world payload is identical to the original Object.assign. | Two-part check. **(1) Rehydration smoke test**: with valid existing state in the writable store, reload the page — every persisted field (modes, settings, etc.) must rehydrate exactly as before; the component looks unchanged. **(2) Poison test**: in devtools, plant `localStorage.setItem('<key>', '{"__proto__":{"polluted":1},"<a-real-field>":"<a-real-value>"}')` (or the equivalent for sessionStorage / cookies depending on the source) and reload — the real-field value still rehydrates AND `({}).polluted` returns `undefined` in the console (no global pollution). If `({}).polluted` returns `1`, the filter didn't run. |
| JSA-* (generic architectural change) | **Medium-High** — JSA fixes are architectural (extract function, replace innerHTML structure, add LRU disposal, reroute scheduling primitive). Regression surface is the affected component as a whole, not just the pattern site. A structural refactor can shift call-site semantics, drop whitespace nodes, change initialization order, or alter event-binding timing in ways the rule's catalog signature doesn't reveal. | Exercise every primary interaction and visible variant of the component. For DOM-structure changes (JSA-07): inspect the rendered DOM in devtools and compare class names, ARIA attributes, child ordering, and text content against the pre-fix version. For caching/disposal fixes (JSA-03): exercise the create→destroy→create cycle 20+ times and confirm no memory growth in devtools Memory panel. For function extraction (JSA-13): confirm every extracted sub-method is reachable on the orchestrator's primary code path; nothing is dead-code'd by the split. |
| JSA-07 (innerHTML → replaceChildren) | **Medium-High** — same risk profile as JSS-01: swapping the DOM-construction path can change whitespace handling, child-element ordering, and event-listener attachment points. The browser's HTML parser normalizes whitespace and creates implicit nodes (e.g., text nodes around block elements) that `createElement` does not. | Inspect the rendered DOM in devtools before and after the fix. Confirm class names, ARIA attributes, child node count, and text content match. If the original template inlined event-listener attributes (`onclick=`), confirm event-binding still fires — `replaceChildren` does not run inline-attribute event handlers the way `innerHTML` parsing does. |
| JSA-13 (mixed-concern function extraction) | **Medium-High** — extracting sub-methods from a >80-line function changes the call graph. A typo in one of the new method names throws at runtime; a missed `this` rebind in an extracted method silently breaks state mutation. The orchestrator's outer flow must still drive every concern in the right order. | Exercise the component's primary interaction that flows through the extracted function end-to-end. Confirm each extracted sub-method is invoked on the right code path (set a breakpoint in each `_render()` / `_persistState()` / etc. and confirm they all hit). Then exercise an edge-case path (error branch, empty state, hidden state) and confirm the same orchestrator flow still works — extraction can accidentally remove a guard or a side effect that was implicit in the straight-line code. |

Include only rows for rules that fired in this fix batch. Do not dump the whole table every time — that trains the user to skip it. For JSA findings, the generic JSA-* row covers any rule without a more specific row; use the specific row when it exists.

### Per-file closing summary

After each file's fixes are applied and the catalog is re-run, emit this and STOP:

```
## {file} — applied {N} fixes
- Findings resolved: {list rule IDs with line numbers}
- Cross-file edits: {list every additional file edited as part of this slot's fixes, with the rule ID that drove each edit — e.g., "`_js/nds-loader.js:158–163` (JSA-05 dropped `critical: true`)". If only `{file}` was touched, write "none". MANDATORY when a fix routes into `_js/nds-core.js` or `_js/nds-loader.js` — the user must see exactly what landed outside the audited file.}
- Findings remaining in this file: {M} (list rule IDs, or "none")
- Regressions introduced: 0 (or list them)
- Rebundle: ran `ruby _plugins/js_processor.rb` — {bundle size line from output}
- Agent review (static): {one-line recap — "clean" OR concise summary of any non-blocking notes; if a regression was found this block wouldn't be emitted at all}
- Behavior verification: {ALWAYS the user's choice — never auto-run. State the recommendation from the risk signal, then the options. Medium+ change → "Recommended: a behavior check — reply `verify in browser` to have me drive it, or review manually (rows below)." Low / mechanically-equivalent → "Recommended: proceed — static review + compile confirm equivalence; `verify in browser` available if you'd rather drive it." If the user already elected `verify in browser` for this slot → surface the driven URL + per-rule verdict instead (e.g. "JSP-02 PASS, JSD-01 PASS; 0 console errors").}
- Perf delta: {ONLY for files with a perf finding — the before/after measurement per measured rule, e.g. "JSP-02: scroll-handler invocations over 100 events — before 100, after 7 (−93%)". Use "structural — not micro-benchmarkable headless" or "no significant change (within noise)" when honest measurement yields no clean delta. Omit this line entirely for files with no perf findings.}

## Behavior checks for this file (your choice — review manually below, or reply `verify in browser`)
Rules fixed: {JSP-02, JSD-01}
These are the exact scenarios for the rules that fired — walk them yourself, OR reply `verify in browser` and I'll drive them in headless Chrome:
- JSP-02: {the interaction + expected outcome, from the per-rule table / PUPPETEER.md}
- JSD-01: {the interaction + expected outcome}
{If the user already elected `verify in browser`:} I drove these in headless Chrome — per-rule verdicts above; rows kept here so you can re-confirm in your own environment.
{If any rule is `not-headless-testable`, list it with the reason — it can only be reviewed manually; present its row for you to confirm, never marked passed.}

Reply with a number OR the literal command:

1. `next` — move on (behavior verification stays your call — use the rows above to review manually).
2. `verify in browser` — have me drive the listed behavior check(s) in headless Chrome now, before moving on.
3. `regression in {file}` (type the literal with what broke) — pause, revert with your IDE's undo/local-history (not git), and re-examine the finding together.
4. `stop` — end the batch here; remaining files keep their existing findings unfixed.
```

Auto-chain to the next file when the static review is clean AND the change is low-risk (static-only recommended) — emit the compact one-line summary (noting `verify in browser` remains available) and continue without waiting (Auto-drive rule). For a **Medium+** change, even when the static review is clean, pause and present the numbered prompt so the user can choose a behavior check (`verify in browser`) or a manual review before advancing — the skill recommends a check but never runs Puppeteer on its own. Also show the numbered prompt on a regression or at end-of-batch. A regression is the checkpoint-and-revert window. If the user reports a regression, do not try to patch around the broken fix. Ask them to revert the file using whichever workflow they use (their IDE's local-history or undo stack, not `git checkout`/`git restore` — their editor version can differ from HEAD), then re-examine the finding together before retrying.

### End-of-batch summary

When the user replies `stop`, or when every file in the batch has been processed, emit:

```
## Code audit batch complete
- Files touched: N
- Total findings resolved: X
- Findings remaining (all files): Y (list rule IDs per file)
- Regressions reported: 0 (or list them)
```

Do not mark the audit complete while findings remain open or regressions exist.

**Closing offer — always NUMBERED (this is exactly where the discipline slips).** After the batch summary, any open follow-on action the user can take — authorizing a Phase 7 candidate that was surfaced-not-auto-applied (a blocked catalog/persona heal), committing, running a behavior check — is presented as a numbered list, never as prose bullets or an "open / optional / your call" block. Even ONE open action gets a number, and the recommended one is itself numbered:

```
Open items — reply with a number:

1. `evolve <RULE>` — authorize the surfaced refinement (e.g. heal the stale `RULES-JSP.md` exemplar). [recommended]
2. commit — I'll propose the message and wait; I never commit unprompted.
0. done — nothing further.
```

---

## Phase 7: EVOLVE (autonomous, runs at run end)

**Runs automatically — no approval prompt.** At the end of any run that surfaced concrete "Gaps observed", "Dead-rule candidates", or "Persona drift" entries — OR any full-tree run, which always reconciles persona bookkeeping — turn them into edits to this `SKILL.md` and/or `PERSONA.md`, apply them, and append a `## Catalog evolved` diff block to the report. The user reverts via git if they disagree (the diff block makes that one command). Self-evolution is not a pause point (see Auto-drive).

**Two kinds of edit — different gates.** Keep them separate; blurring them is the failure mode (a persona that rewrites its *opinions* every run becomes noise):
- **Rule edits** (canonical revision, carve-out, new entry; new/narrowed/deleted catalog rule) — judgments. Gated by the quality bars below.
- **Bookkeeping edits** (adoption re-tally, maturity promotion/demotion, "Last reconciled" date, expiring a resolved motivating finding, healing a drifted file:line citation) — measured facts from the scan the run already performed. **No quality bar** — apply whenever the recorded fact is stale. Reported under a `Bookkeeping reconciled` sub-heading so the change is never silent.

**Three rule sources, two target files:**
- **Gaps observed** → SKILL.md (new catalog rule, or extension of an existing rule).
- **Dead-rule candidates** → SKILL.md (narrow / delete an existing catalog rule).
- **Persona drift** → PERSONA.md (revise a canonical, add a carve-out, add a new entry). Surfaced when a JSD-15 finding's outcome is "revise the canonical" rather than "migrate the file."

**Bookkeeping source (full-tree runs only):** the full-tree JSD-15 classification pass IS the corpus tally. Whatever it computes — per-entry conformance count, zero-divergence status, file:line positions of cited examples — gets written back to the matching PERSONA.md entry's bookkeeping fields. See "Bookkeeping reconciliation" below for the exact rules.

**Quality bars (the safety floor that replaces the old approval gate — apply only edits that clear them):**
- **ADD rule** — requires a motivating finding with ≥2 sites or meaningful body overlap. A one-off shape stays a Gap observation, not a new rule.
- **NARROW / SEVERITY** — requires a specific cited reason (e.g. N consecutive skips in a named file).
- **DELETE rule** — requires the dead-rule evidence bar: zero true-positive matches across the session's emitted/saved runs. Rare by design; when unproven, narrow rather than delete.

A run with only hand-wavy or single-instance candidates auto-applies nothing — it records them in the report's Gaps/Dead-rule sections for a future run to confirm, and omits the `## Catalog evolved` block.

### What each applied edit records

For every edit applied, record the exact change in the `## Catalog evolved` block using these shapes:

```
Edit: ADD rule
  Group: JSP
  ID: JSP-11 (next free ID in group)
  Severity: MEDIUM
  Detect: IntersectionObserver created with `root: null` via a locally-pooled helper — duplicates NDS.onIntersect's viewport pool
  Fix: Route through NDS.onIntersect with matching threshold/rootMargin
  Motivating finding: _js/nds-foo.js:88 and _js/nds-bar.js:142 both wrap viewport IntersectionObservers in a local helper
```

```
Edit: NARROW rule
  ID: JSD-08
  Change: Exempt methods that run at module top level (before the loader lifecycle fires)
  Reason: 5 consecutive skips in _js/nds-foo.js — the guards protect bootstrap code that genuinely runs before nds-loader.js. Keeping the rule as-is trains the skill to ignore JSD-08 wholesale.
```

```
Edit: ADD rule
  Group: JSA
  ID: JSA-14 (next free ID in group)
  Severity: LOW
  Mode: deep-read
  Detect: Modules whose top-level state (module-scope `let`/`const` declarations) exceeds 20 mutable bindings, indicating module-level state machine that should be encapsulated in a singleton or class
  Fix: Encapsulate module state in an object literal or class instance; expose only the documented API surface; private state behind a closure or `#private` field
  Motivating finding: _js/nds-foo.js has 27 module-scope `let` declarations driving cross-method behavior — readers can't tell which functions read or mutate which variables without a top-to-bottom file scan
```

```
Edit: DELETE rule
  ID: (example) JSD-06
  Reason: Zero true-positive matches across the session's runs; read-after-write pattern is already caught by the browser devtools performance panel and does not warrant its own rule.
```

(JSA proposals always include the `Mode:` field — `greppable` or `deep-read` — since JSA rules carry mode-aware coverage that JSP/JSD/JSS don't. JSP/JSD/JSS proposals omit the Mode field.)

### Application

For each applied edit, modify the appropriate file under `.claude/skills/nds-js-audit/` and only that file:

**Catalog edits → the matching `RULES-{group}.md` group file** (`RULES-JSP.md` / `RULES-JSD.md` / `RULES-JSS.md` / `RULES-JSA.md`), NOT SKILL.md — the catalog tables were extracted out of SKILL.md. The cross-references that still live in SKILL.md (the Phase 1 / Phase 4 mode banners) are updated alongside as noted:
- **ADD**: insert the new rule in the correct group file's table, keeping IDs sequential. JSA additions also populate the `Mode` column (`greppable` or `deep-read`) in `RULES-JSA.md`; if the new rule is deep-read, also add its ID to the JSA deep-read banner in Phase 4 and the "JSA deep-read rules in full-tree mode" section in Phase 1 (both in SKILL.md).
- **NARROW / REFINE**: edit the "What to detect" column in the group file, not the rule's identity. Do not change its ID. For JSA rules, also update the `Mode` column if the refinement changes detection method.
- **DELETE**: remove the row and renumber the remaining rules in the group within its `RULES-{group}.md`. If JSD-06 is deleted, JSD-07 becomes JSD-06 across `RULES-JSD.md` (and update the Phase 4 example references in SKILL.md accordingly). For JSA deletions, also remove the ID from the deep-read banner in Phase 4 and the "JSA deep-read rules in full-tree mode" section in Phase 1 (both in SKILL.md) if it appeared there.
- **SEVERITY CHANGE**: update the Severity column only in the group file; do not touch detection or fix text.

**Persona rule edits → PERSONA.md (gated by the quality bars):**
- **REVISE CANONICAL**: edit the entry's "Canonical" field; update "Why this canonical" if the revised choice has a different principle defense; update "Why not the alternatives" if the rejected forms changed; touch "Audit behavior" to match the new canonical. Leave the bookkeeping fields (Maturity / Current adoption / Last reconciled) to the bookkeeping pass — but a canonical revision resets the entry's Maturity to `proposed` (the new canonical is unproven across the corpus) and the next full-tree run re-earns its rung.
- **ADD CARVE-OUT**: append to the entry's "Carve-outs" list with the file:line citation that motivated it.
- **NEW ENTRY**: append a new entry to PERSONA.md using the eight-field shape (Canonical, Why this canonical, Why not the alternatives, Carve-outs, Audit behavior, **Maturity**, Current adoption, Last reconciled). Seed Maturity at `proposed` (or `established` if the new entry already cites ≥2 conforming sites). Renumber subsequent entries if added mid-document.

**Persona bookkeeping edits → PERSONA.md (no quality bar — see "Bookkeeping reconciliation"):**
- **RE-TALLY ADOPTION**: overwrite "Current adoption" with the count the full-tree scan produced and stamp it with today's date.
- **MATURITY**: promote/demote per the ladder rules in "Bookkeeping reconciliation".
- **EXPIRE RESOLVED FINDING**: when an entry's check finds zero divergent sites but the entry still carries a `Motivating finding: file:line`, rewrite that pointer to `Resolved (was the motivating finding): … migrated to <canonical>`.
- **HEAL CITATION**: citations are **symbol-anchored** — the greppable identifier/token (function, field, attribute, comment text) is the authoritative anchor; the line number is a decaying hint. Grep the symbol: still present → rewrite the line hint; gone → the citation is expired (mark it `(citation expired <date> — <symbol> refactored away)` or resolve the motivating example), never trust the bare line.
- **STAMP**: set "Last reconciled" to today's date on every entry the full-tree scan covered.

After applying, append the diff to the report as the `## Catalog evolved` block (covering both files when both were touched):

```
## Catalog evolved (auto-applied this run)
- SKILL.md added: JSP-08 "viewport IntersectionObserver duplication" (MEDIUM)
- SKILL.md narrowed: JSD-08 now exempts module-top-level bootstrap
- PERSONA.md revised: entry 4 canonical changed from "NDS <Name>:" to "[NDS.<Name>]"
- PERSONA.md added carve-out: entry 1, secondary controllers for streaming responses
- Rejected (conflicts with CLAUDE.md): {proposal} — {one-line reason}
- No deletions this round

### Bookkeeping reconciled (no quality bar — measured facts)
- PERSONA.md entry 1: adoption 13/13 → 12/12, stamped 2026-06-04
- PERSONA.md entry 5: expired resolved findings (voice-input _installed→_initDone, swiper data-swiper-initialized→data-nds-swiper-initialized); maturity stays `enforced`
- PERSONA.md entry 7: maturity enforced → settled (3rd consecutive zero-divergence run)
- PERSONA.md entry 1: healed citation L324 → L347 (fetchAbortController moved)
- "Last reconciled" stamped 2026-06-04 on all entries the full-tree scan covered

Revert with `git checkout -- .claude/skills/nds-js-audit/` if you disagree. The next audit run uses the updated rules and canonicals.
```

### Bookkeeping reconciliation (full-tree runs)

The full-tree JSD-15 pass classifies every in-scope file against every persona entry's "Audit behavior" check — that classification IS the tally. After it completes, refresh each entry's bookkeeping fields from it. No quality bar: these are facts, not judgments. Record every change under the `Bookkeeping reconciled` sub-heading.

- **Adoption.** Write `conforming / total` for the entry's concept and stamp today's date. `total` is the count of files the entry's discriminator selected (e.g. files with a primary AbortController, for entry 1), not all 50.
- **Maturity ladder** — move the entry's rung from this run's evidence:
  - `proposed` → `established` once ≥2 conforming sites exist and adoption is measured.
  - `established` → `enforced` once adoption is full (or full-minus-documented-carve-out) and carve-outs are cited.
  - `enforced` → `settled` once **3 consecutive full-tree runs** show 100% adoption with zero divergence. Track the streak via the saved audit-report trail in `.claude/audit-reports/` (count consecutive prior full-tree runs whose report recorded zero divergence for this entry); if the trail is unavailable, hold at `enforced`.
  - Any rung → demote one step the moment a divergence appears (a `settled`/`enforced` entry with a fresh divergent file drops to `enforced`/`established`). A canonical revision resets to `proposed`.
  - A `settled` entry MAY be skipped in the per-run JSD-15 check to save attention — but full-tree runs still spot-scan it cheaply (the discriminator grep) to catch a reintroduced divergence and demote.
- **Expire resolved motivating findings.** If an entry's check returns zero divergent sites yet the entry still names a `Motivating finding: file:line`, rewrite that line to `Resolved (was the motivating finding): <file> migrated <old> → <canonical>`. The rule check itself is never removed — only the stale pointer.
- **Heal citations.** Citations are symbol-anchored: grep the cited symbol/token, not the line. Symbol moved → rewrite the line hint. Symbol gone → mark the citation expired (`(citation expired <date> — <symbol> not found)`) rather than silently trusting it; an expired citation in a carve-out is a candidate Gap for the next run.
- **Stamp.** Set "Last reconciled" to today's date on every entry the scan covered. An entry whose stamp predates the newest commit is the visible signal that it is overdue — never hide staleness by stamping an entry the run did not actually re-scan.

Single-file runs do NOT reconcile bookkeeping (they see one file, not the corpus) — they may still produce rule edits (a JSD-15 finding on that file) and may expire a resolved finding *only* when that one file is the sole site the motivating finding named.

### Guardrails

- **Citation convention (every rule / persona edit).** A citation names `file` + a greppable symbol (function, field, attribute name, quoted comment text); the line number is an optional, decaying hint (`~L812`). A bare `file:line` with no symbol is not a valid citation — it can't be healed after a refactor. Lines drift in days; symbols break only when the code itself is removed, which is exactly when the citation SHOULD break loudly.
- Apply only edits that clear the quality bars above; everything else stays a recorded Gap/Dead-rule candidate for a future run to confirm. The bars — not a user prompt — are the gate. Every applied edit MUST appear in the `## Catalog evolved` block, so the change is never silent.
- Phase 7 edits SKILL.md, the `RULES-*.md` group files, and PERSONA.md only. Phase 5 handles source-code fixes; Phase 7 handles the rule catalog (in the `RULES-*.md` files, plus the mode banners in SKILL.md) and the persona. Never edit other files during Phase 7.
- If a proposed evolution would conflict with the conventions in `CLAUDE.md` (e.g., "weaken JSP-01 to allow raw window resize listeners"), do NOT apply it — record it on the `Rejected (conflicts with CLAUDE.md)` line of the `## Catalog evolved` block with the reason. `CLAUDE.md` is upstream of this skill.
- Preserve each file's structure: SKILL.md keeps frontmatter, mindset, phases, report format, non-goals, and the Rule-catalog pointer + mode banners; each `RULES-{group}.md` keeps its group's rule table + framing; PERSONA.md keeps the eight-field per-entry shape (the five rule fields + Maturity + Current adoption + Last reconciled). Don't invent new top-level sections during an evolution.
- Persona-drift proposals MUST include the divergent file's reasoning (cited inline) so the user can argue the canonical change from data, not from authorial preference. A proposal that says only "the corpus moved" is rejected — corpus movement is a migration target, not a canonical revision.

---

## Non-goals

This skill deliberately does not cover:

- SCSS *auditing*. Running rules against `.scss` files stays out of scope — refactor blast radius (specificity, nesting, state/variant cascade) and token-family gaps make auditing SCSS automatically too risky. SCSS *editing as part of a JSA fix* (the JSA-18 case: JS work CSS expresses natively) IS supported via Phase 5's cross-file edit carve-out — see "Out-of-scope modifications" in Phase 5 for the exact bounds. Standalone SCSS refactors outside a JSA-routed fix stay manual against the conventions in `CLAUDE.md`.
- Documentation page audits — use `nds-doc`.
- Icon, placeholder-text, or sidemenu coverage.
- `_data/content/` YAML demo data.
- UX copy, hero descriptions, or visual design review.
- Replacing eslint. No lint config is authored; the rules are NDS-specific conventions enforced through an agent loop.
- Profiler-driven *detection*. The JSP/JSA catalogs are static-read heuristics — they surface candidates, not hotspots, and don't replace a DevTools Performance / Lighthouse pass. (The Phase 6 perf *verification* is different: a bounded before/after measurement of one applied fix, not a profiler sweep.)
- Including `_js/nds-core.js` or `_js/nds-loader.js` in full-tree `js` runs. Single-file audits on either ARE supported — see the "Excluded files" carve-out in Phase 1.
- Running `bundle exec jekyll build` unless the user explicitly asks. `ruby _plugins/js_processor.rb` runs automatically per-file in Phase 5/6, and the Phase 6 Puppeteer test MAY start/reuse `bundle exec jekyll serve` (port 4002) — see `PUPPETEER.md`.
- Editing files outside the Phase 5 / Phase 7 / audit-reports paths. Phase 5 edits `_js/nds-*.js`, plus `_js/nds-loader.js` / `_js/nds-core.js` only when a finding's `Fix:` routes there (JSA-05 registry edits; `promote <api-name>` candidates), plus `_sass/**/*.scss` only when a JSA finding's `Fix:` routes there (JSA-18 CSS-subsume migrations — see Phase 5 "Out-of-scope modifications" for the bounds). Phase 7 auto-edits this `SKILL.md`, the `RULES-*.md` group files, and `PERSONA.md`. Phase 4 `save` writes (never overwrites) reports in `.claude/audit-reports/`. Nothing else.
