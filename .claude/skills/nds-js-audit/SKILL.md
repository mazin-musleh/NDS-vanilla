---
name: nds-js-audit
description: Audit NDS source JS for DRY/KISS violations, scalability and maintainability risks, performance issues, client-side security risks, architectural design (scheduling, memory, DOM API choice, complexity, in-file DRY, KISS), and cross-file pattern consistency. Covers listener/observer pooling via nds-core.js (NDS.onResize, NDS.onIntersect, NDS.onElementResize, NDS.onDOMAdd, NDS.onAttrChange, NDS.debounce), throttling of scroll/resize handlers, NDS.State and NDS.Status reuse, NDS.breakpoints reuse, cross-file detection of repeated helper functions that should be promoted to nds-core.js, component contract conformance (factory vs singleton shape via NDS.{Name}.init/reinit/create), dead defensive guards inside loader-registered components, common web-security sinks (innerHTML XSS, eval/new Function, target="_blank" tabnabbing, postMessage origin checks, untrusted URLs), and architectural review (JSA rules covering unbounded caches/maps, scheduling-primitive choice, polyfill fidelity, DOM API choice, mixed-concern functions, in-file repeated blocks, interaction-handler INP cost, and forced layout reads at init). Use this skill for "audit the JS", "audit performance", "audit security", "audit the architecture", "improve INP", "lower init cost", "optimize listeners", "check nds-core usage", "find functions that should live in core", "find unthrottled scroll handlers", "find heavy interaction handlers", "find forced layout reads in init", "find XSS risks", "find unbounded caches", "find mixed-concern functions", "make all components follow the same pattern", "check component consistency", or any JS source-code quality pass on `_js/`. NOT for SCSS/CSS audits, documentation page audits (use nds-doc), or UX copy review.
argument-hint: "[target] [optional: rule-group]"
---

# NDS JS Audit

Apply this skill to: `$ARGUMENTS`

This skill audits the NDS JavaScript source — the files in `_js/` — against the conventions already codified in `CLAUDE.md` and the shared-utility contract published by `_js/nds-core.js`. It reports real duplication, real performance risk, and real maintainability drag, then applies fixes only after the user approves the report. It is the code-quality counterpart to `nds-doc` (which audits documentation).

> **THIS SKILL WILL BURN YOUR TOKENS FAST.** A full-scope run reads every `_js/nds-*.js` file, applies all four catalogs against each, and spawns per-file review agents during Phase 5/6. Narrow the scope whenever you can:
> - `/nds-js-audit <filename> [rule-group]` — single-file pass against one component (e.g. `/nds-js-audit nds-modal.js architecture`). The cheap mode — a dedicated deep-read agent runs per single-file pass (see Phase 3), which is where the architectural deep-reads pay off. Omit the rule-group to run all four. Best fit for a newly-added component before merging.
> - `/nds-js-audit js <rule-group>` — full-tree pass for one rule group (`performance` / `dry` / `security` / `architecture`). Costs several single-file passes. The release-prep / refactor-window shape. Full-tree `architecture` runs only the greppable JSA rules; deep-read JSA rules are skipped with a mandatory banner.

---

## Mindset

Audit like a staff engineer doing code review before a release. Favor concrete, actionable findings over theoretical cleanliness. Flag real duplication and real performance risk; do not manufacture issues to pad the report. When a rule is qualitative (JSD-05 promotion candidates), require at least two call sites and meaningful body overlap before flagging. If a finding cannot be explained in one sentence with a specific fix, it is not a finding. Prefer the highest-leverage recommendation over the longest list.

The goal is a report a developer can act on in the next hour, not a lint dump they will close and forget.

The rule catalog is a living document — surface gaps and dead rules during the audit (Phase 3 tracks them, Phase 7 surfaces catalog-edit candidates; applying them needs an explicit `evolve` go) so the skill sharpens rather than silently shrinks.

---

## Response style

Reports are scannable, not prose. **This section overrides any verbosity in the Phase 4 template examples below — when they differ, follow this.**

- **Recommendation-first, always.** Open every report with ONE line: `<N HIGH / N MED / N LOW, or "Clean">  →  Recommended: <action> (<≤12-word why>)`. Never bury the recommendation; never end a report without one.
- **Tables only for short text and comparisons — never for long findings.** A table is the right shape when every cell is a short phrase: the Per-group results grid, severity counts, a side-by-side comparison. The moment a cell needs more than one short line, a table becomes unreadable (wrapped paragraphs crammed into a column). So: findings whose whole `Finding → fix` fits on ONE short line may share a compact `| Sev | Rule | Location | Finding → fix |` table; but any finding that needs more — every HIGH, every `tradeoff` carrying `Proposed solution:` / `Benefit vs cost:`, anything multi-sentence, or a long location list — drops to a per-finding **block** instead: `### {file}` then `- L{n} [{rule}] {finding}` with indented `Type:` / `Fix:` / detail lines, exactly as the Phase 4 template shows. Don't force long text into a grid; pick the format that stays readable.
- **Disclosures are one line, not banner blocks.** Collapse every skip/coverage note to a single line, e.g. `Skipped: JSD-05 (cross-tree, single-file mode).`
- **Omit empty sections.** No "Gaps observed: none" headers. Drop "Why it matters" unless the risk is non-obvious in one glance.
- **End with a numbered Next Step** where item 1 IS the recommended action; close with "Reply with a number."
- **Numbered-reply discipline** — applies to **EVERY block that offers the user a choice**: the no-args menu, the Phase 4 Next Step, Phase 6 per-file prompts, Phase 7, the end-of-batch summary, AND any closing "open / optional / your call" block (authorizing surfaced evolve candidates, committing, running a behavior check, etc.). **If you offer even ONE actionable option, present the options as a NUMBERED list — never as prose bullets or a "your call" list** (that prose-bullet closing is the exact failure mode this rule kills). Every primary acceptance path gets a number, *including the recommended action itself* — never omit it on the grounds that the user already sees it as the recommendation. Renumber to drop options that are no-ops on this run. Literal filter commands (`fix HIGH`, `fix _js/nds-foo.js`) sit below the numbered block as filters, not inside it. Never close with "reply with the literal action or a number."

Target: a report a reader skims in ~15 seconds with the decision obvious. Prefer the shortest version that stays actionable. The same applies to fix-phase replies and the `## Catalog evolved` block — lead with what happened and the next step, not a recap.

---

## Auto-drive

Default to advancing, not asking. Run the obvious next step automatically and report what you did. Pause ONLY at these four points — everywhere else, proceed:

1. **Before applying any code fix** — Phase 5 needs ONE explicit go (`fix all` / `fix <scope>` / a number). After that go, the batch runs file-by-file to completion **without per-file `next` prompts**.
2. **On a regression** — an agent-review FAIL or a `regression in {file}` report stops the run for revert.
3. **Before a git commit** — never auto-commit; propose the message and wait.
4. **Before editing the skill's own files** — Phase 7 EVOLVE surfaces catalog/persona refinement candidates at run end; applying them needs ONE explicit go (`evolve` / `evolve <RULE>`). Audit sessions run concurrently and share `.claude/skills/nds-js-audit/` — an unprompted mid-run write from one session clobbers another session's read of the same catalog.

Read-only / reversible steps (running the audit, emitting the report, `save`-ing it on request) take the recommended action without an extra confirmation round-trip. When nothing is ambiguous, do it and say so — don't stop to ask permission for the step you already recommended.

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

Unfiltered four-group runs in **full-tree `js` mode** are not supported — sweeping all four catalogs across 40+ files in one pass is too expensive for routine use; run one rule group at a time. **Single-file `all` IS supported** (e.g. `/nds-js-audit nds-foo.js all`): four catalogs against one file is the cheap mode, and it emits one consolidated report. If the user passes `all` with `js` (full-tree), reject: *"Full-tree `all` isn't supported — run one rule group at a time (`js performance` / `js dry` / `js security` / `js architecture`). For an all-groups sweep, target a single file: `/nds-js-audit nds-<file>.js all`."* See the `all` row in the rule-group filter table below.

**SCSS auditing is not supported.** If the user passes `scss` or any path ending in `.scss`, stop and reply: *"SCSS auditing isn't covered by this skill — refactor `.scss` files manually against the conventions in `CLAUDE.md`. If you want to migrate JS work into CSS (the JSA-15 case: JS that re-implements what CSS expresses natively), audit the JS file instead — `/nds-js-audit nds-<name>.js architecture` — and a JSA-15 actionable finding can apply the SCSS edit as part of the same fix batch."* Do not run partial rules on an SCSS file. (`all` is no longer rejected here — in single-file mode it runs all four JS catalogs; see the `all` row below. Only `js all` is rejected, per the full-tree note above.)

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

**Ponytail overlay.** The ponytail lens (Phase 3) runs on top of whichever groups run — it is not itself a selectable group. Pass a `no-pony` token (e.g. `/nds-js-audit nds-modal.js all no-pony`, or alongside a single group) to suppress it for a pure catalog run.

**Single-file `all` — consolidated report.** Run each group's Phase 3 analysis against the one file, then emit ONE Phase 4 report (not four): a `## Per-group results` table (one row per group: clean / N findings), findings merged and grouped by severity exactly as the normal report does (rule IDs disambiguate the group), and every applicable single-file banner shown once (the JSD-05 single-file skip banner for the dry portion; no JSA deep-read banner since single-file runs them all). Compute the Recommended action over the merged finding set using the same Phase 4 table. Phase 5 fixes and Phase 7 evolve work identically on the merged set. This is the same shape as running the four groups back-to-back, collapsed into a single pass and a single report.

### Cross-tree rules in single-file mode

Single-file `dry` runs every JSD rule **except JSD-05** — JSD-05 compares helper bodies across all of `_js/` and needs the full tree; the report shows the JSD-05 skip banner (Phase 4) in its place. **JSD-15 runs in single-file mode** by reading the canonicals in `PERSONA.md` (sibling file) and applying each entry's "Audit behavior" check against the target — a deterministic per-file check with no corpus re-tally (see the JSD-15 row in `RULES-JSD.md`). Every other JSD rule is a per-file check and runs normally.

### JSA deep-read rules in full-tree mode

Full-tree `architecture` runs only the greppable JSA rules (JSA-01, -02, -04, -05, -06, -13); the deep-read rules (JSA-03, -07 through -12, -14, -15, -16) are skipped and the report shows the JSA deep-read banner (Phase 4). Single-file `architecture` runs every JSA rule — the per-file deep reads (complexity, in-file duplication, mixed-concern structure, INP cost, CSS-subsumption) are where deep-reads earn their keep, and the single-file budget allows them. Full-tree `architecture` also computes the **deep-read triage** (Phase 3) so the skipped coverage converts into ranked single-file targets instead of a bare disclaimer.

### Excluded files

Two tiers — direct-named single-file audits behave differently from full-tree `js` mode for the first tier.

**Excluded from full-tree `js` mode only (auditable when directly named in single-file mode):**

- `_js/nds-core.js` — not included in full-tree runs because its patterns ARE the rule catalog; bulk-running the catalog against its source-of-truth produces noise. Single-file audits ARE supported (e.g., `/nds-js-audit nds-core.js performance`) for deliberate review of the helper surface itself — read findings as "is this pattern still right for this file" rather than as automatic regressions. Phase 5 also edits core when applying a JSD-05 promotion candidate via the `promote <api-name>` command — see "Applying promotion candidates" in `FIX.md`. Plain fix batches against components (`fix all`, `fix HIGH`, `fix <file>`) never touch core.
- `_js/nds-loader.js` — not included in full-tree runs because the loader has its own ordering rules outside the per-component JSP/JSD/JSS catalog. Single-file audits ARE supported when the user is intentionally tuning the loader; same advisory applies.

**Excluded always (no direct-named carve-out):**

- `_js/nds-showcase.js` — demo-page wiring, not a shipped component (its SCSS counterpart `_sass/_showcase.scss` is likewise Tier-1-excluded in `nds-css-audit`).
- Any `.min.js` file.

---

## Phase 2: READ

Source files are the single source of truth. Read them fully, not by skimming.

### MUST read every run

- **The rule catalog for THIS run's scope** — the detection rules live in per-group sibling files (Phase 3 → "Rule catalog"). Read the one(s) matching the run's rule-group filter: `RULES-JSP.md` (`performance`), `RULES-JSD.md` (`dry`), `RULES-JSS.md` (`security`), `RULES-JSA.md` (`architecture`). A run with no rule-group filter reads all four. JSD-15's canonicals are in `PERSONA.md` (read it whenever JSD applies). Read only what the scope needs — loading the unused groups is the token waste the rule-group filter exists to avoid.
- **`PONYTAIL.md`** — the ponytail over-engineering overlay (Phase 3). Read it on every analyze pass UNLESS the run carries a `no-pony` token. It runs after the catalog, within this run's scope, and carries its own carve-outs (reuses the PERSONA.md + deliberate-architecture guardrails).
- **`_js/nds-core.js`** — the full shared-utility surface. Re-read every run so the rule catalog reflects the current `NDS.*` API (names, arities, return values). Rules JSP-01 through JSP-08, JSD-01 through JSD-04, and JSS fixes that cite helpers (e.g., `NDS.escapeHtml` if/when promoted) all reference specific functions here; if core gains a utility, the skill's recommendation should route to it instead of flagging the pattern as unresolved.
- **At least one JS good-pattern exemplar** — `_js/nds-scroll-more.js` for RAF-throttled scroll + pooled ResizeObserver, `_js/nds-drawer.js` for NDS.State destructuring (`const { add: addState, … } = NDS.State`, ~L77), `_js/nds-modal.js` for NDS.State and backdrop API usage. Recommendations cite these with `file:line` so the user can copy a working pattern rather than invent one. JSA rules reuse the same exemplar set (plus `_js/nds-autocomplete.js:290-312` for size-capped fetch + abort, and `_js/nds-loader.js` `yieldToBrowser` (~L423-431) for `MessageChannel`-based microtask yielding).

### MUST read every target file

Read each target file top-to-bottom before running the catalog. Pattern-matching alone misses context (a `setTimeout` inside a `NDS.debounce` callback is not a JSP-07 violation). A full read is what separates this skill from a grep script.

### Split-component regression guard

NDS uses no per-component eager-shell + lazy-behavior splits — the chosen pattern for a `critical` component with init-unnecessary behavior is **cold-init in main** (cheap registration at init, behavior runs on interaction); see `CLAUDE.md` → "JS Bundles & Shrinking the Critical Bundle". **Flag as a regression** any `*__delegated.js` file, any reference to `_installBehavior` / `_deferBehavior` / `loadSplit` / `__NDS_SPLIT`, or a `// SPLIT COMPONENT` banner. Wholesale de-criticalization (drop `critical: true` + move the whole file to the delegated `@bundles` list, Accordion-style) is NOT a split and remains valid.

---

## Phase 3: ANALYZE

Run the rule catalog (the per-group `RULES-*.md` file(s) read in Phase 2) file-by-file. Each match is recorded as: file, line, rule ID, offending snippet (≤120 characters), suggested fix pointing to the exact `NDS.*` call. Dedupe findings whose line ranges overlap so the same handler is not triple-flagged.

### Ponytail overlay (final lens — every run unless `no-pony`)

After the catalog pass completes, apply `PONYTAIL.md` (read in Phase 2) **within this run's resolved scope** — it asks "should this exist at all?", which the perf/DRY/security/architecture rules never ask head-on. Two steps, per that file: (1) **re-tag** each finding already produced with `delete/stdlib/native/yagni/shrink` (a label on the existing row — no new finding, no double-report); (2) **gap-hunt** the small net-new `PONY-STD/-NAT/-YAG/-DEL` set the catalog doesn't cover, scoped to this run (single-file → the target + repo cross-ref for readers; full-tree → the greppable shapes). Honor `PONYTAIL.md`'s carve-outs verbatim — never flag the 3-bundle architecture, pooled core helpers, lifecycle canon, deliberate fidelity shims, the markup contract, or marginal changes to `forms`/`core`/`loader`. **Before any `delete`/`PONY-DEL`/zero-reader `PONY-YAG`, grep the whole repo (incl. `nds-showcase.js` and the component's `.md`) for readers** — the `getFallback` lesson. The single-file deep-read agent runs this lens too: paste `PONYTAIL.md`'s carve-outs into its brief and tag returned rows `PONY-*` + `(deep-read agent)`. PONY findings fold into the Phase 4 report under their severity; print one `Ponytail: <N> cuts (…)` / `Ponytail: none` line below the Summary block. Phase 5 FIX, auto-advance, and Phase 7 EVOLVE treat them like any rule.

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
| JSA | `RULES-JSA.md` | architecture — unbounded caches, scheduling choice, complexity, in-file DRY, INP cost, CSS-subsumption, comment hygiene | 16 |

Severity (HIGH / MEDIUM / LOW) drives the order fixes are applied in Phase 5: HIGH (correctness and performance) first, then MEDIUM, then LOW.

### Shared rule conventions (apply to EVERY catalog rule)

- **Annotation exemption (global).** A match is NOT a finding when an inline comment within 3 lines above it names the SPECIFIC reason the pattern is intentional — the constraint or principle it answers to and, where the rule asks, the trusted source or re-activation path. Vague gestures (`// safe`, `// defensive`, `// needed`, `// just in case`) never qualify; the bar is a rationale a future reader can verify. Rule rows state only what THEIR comment must name (e.g. JSS-01: the value's source and why it's safe) and reference this convention as "annotation exemption (global)". Deleting such a comment re-arms the rule it exempts (JSA-16 protects them for exactly this reason).
- **Gap discipline (global).** When a match is plausible but the recommended fix doesn't clearly apply in context — or a deep-read rule can't concretely prove its bar (JSA-12's three invariants, JSA-16's would-a-competent-reader-miss-this test) — record a Gap/SKIP observation, not a finding. Precision over recall: the catalog sharpens by recording uncertainty, not by padding reports.

Agent briefs (Phase 3 / Phase 6) must paste both conventions verbatim — subagents don't read this file.

**JSA `Type:` field.** Every JSA finding carries `Type: actionable` (concrete change, bounded risk — has a `Fix:` line) or `Type: tradeoff` (deliberate design choice no mechanical fix resolves). `fix all` / `fix JSA` apply actionable findings only; tradeoffs are acknowledged, never auto-fixed. A tradeoff with a real high-leverage lever is marked `Type: tradeoff → recommend solving` with `Proposed solution:` + `Benefit vs cost:` lines. Full framing in `RULES-JSA.md`.

**Mode coverage.** Greppable rules run in both full-tree and single-file modes; deep-read rules run in single-file only (full-tree skips them with the Phase 4 banner). The authoritative which-runs-where lists are in Phase 1 (“Cross-tree rules in single-file mode” for JSD-05/JSD-15, “JSA deep-read rules in full-tree mode” for JSA); each `RULES-*.md` row also carries its own `Mode` where it matters.

### Single-file deep-read pass (dedicated agent)

**Single-file mode only.** After the inline catalog pass completes, spawn ONE dedicated deep-read agent (`Agent` tool, `general-purpose` subagent) whose sole job is to re-read the target file end-to-end with fresh context and hunt the rules that reward undivided attention. This is what makes single-file the deepest mode — the inline pass owns the fast greppable rules, the agent owns the architectural deep reads. Full-tree mode does NOT spawn this agent: its budget is committed to breadth, and deep-read rules are banner-skipped there.

**Deep-read scope for the agent:** JSA-03, JSA-07 through JSA-12, JSA-14, JSA-15, JSA-16; JSD-14 sub-shapes (a) deep nesting, (b) redundant guards, (d) dead code, (e) unused locals; JSD-16 (frozen disabled-flag dead code); and the context-dependent confirmations for JSS-01 (innerHTML XSS vector) and JSS-04 (postMessage origin allowlist). Restrict the agent to the rule group(s) in scope for this run — on a single-group run with no deep-read rules (e.g. `performance`), skip the agent entirely; on `architecture`, `dry`, `security`, or `all`, run the in-scope deep-read subset.

**Brief template** (self-contained — the agent has no audit context):
1. **Target** — the resolved `_js/nds-<file>.js` path. "Read it top-to-bottom before judging; pattern-matching without the full read misses context."
2. **Rules to apply** — name the in-scope rule IDs from the deep-read scope above and direct the agent to **Read the matching rule file(s) itself** (`.claude/skills/nds-js-audit/RULES-JSA.md` / `RULES-JSD.md` / `RULES-JSS.md`, as scoped), applying ONLY the named IDs. Do NOT paste the rule rows into the brief — the rows are multi-KB each, pasting re-emits them as expensive output, and compressing them to one-liners drops the carve-outs that prevent false positives; the file is the full-fidelity source (the JSA-12 three-invariant bar included). Paste verbatim ONLY the Shared rule conventions (annotation exemption + gap discipline) — those live in this file, which the agent does not read.
3. **Reference anchors** — the Phase 2 good-pattern exemplars (`_js/nds-scroll-more.js`, `_js/nds-drawer.js`, `_js/nds-loader.js` `yieldToBrowser` (~L423-431), `_js/nds-autocomplete.js:290-312`) so fixes cite a real pattern.
4. **Output contract** — return ONLY a findings table: `| Sev | Rule | Location (file:line) | Finding → one-line fix | Type (JSA: actionable/tradeoff) |`, plus a short "Gaps observed" list for shapes no rule covers. No prose, no fabricated findings; two-to-five JSA observations is typical, ten+ signals padding.

**Merge.** Fold the agent's findings into the Phase 4 report, deduped against the inline pass (inline keeps greppable hits; the agent owns the deep-read rows). Tag agent-sourced rows so the merge is auditable (a trailing `(deep-read agent)` marker on the location cell). Apply the same Type/tradeoff and Gap-vs-finding discipline as the inline pass. If the agent returns nothing, say so — a clean deep-read pass is a real result.

### Full-tree deep-read triage (`js architecture` only)

Full-tree runs skip the 12 deep-read JSA rules (banner-disclosed in Phase 4). To keep that coverage gap actionable instead of inert, the full-tree `architecture` pass ALSO collects cheap per-file proxies while scanning for the greppable rules — no extra file reads beyond what the run already performs:

- file length, and the approximate span of the longest function — JSA-11 exposure
- interaction-listener attach count (`click` / `input` / `keydown` / `submit` handlers, incl. delegated) — JSA-14 exposure
- document-wide collection fanout (`querySelectorAll` / `NDS.queryAll(document, …)` call count) — JSA-01/-07 exposure
- DOM-construction density (`innerHTML` / `createElement` / `insertAdjacentHTML` sites) — JSA-11/-12 exposure

Rank files on these signals (judgment, not a fixed formula — note WHICH signal drove each pick) and emit the top 3 as the Phase 4 "Deep-read triage" block. A high rank means "most likely to reward a single-file deep-read", never "has findings" — the triage is a pointer, not a verdict.

### Consumer reach (pre-recommendation)

Before computing the report's Recommended action, compute **consumer reach** for any finding whose fix touches shared surface — a **JSD-05 promotion candidate** (adds a helper to `_js/nds-core.js` and migrates N call sites), or a **JSA/JSD fix that edits a shared helper** (a function grepped into ≥2 files, or any `_js/nds-core.js` / `_js/nds-loader.js` edit). Grep the call sites / dependents and emit a one-line `Reach: N sites — file:line, …`. When reach is broad, **downgrade the Phase 4 Recommended action** from a plain `fix` to "coordinate first — promote via per-candidate approval" (the CSS audit does the same with its Cross-component-reach line). This is a pre-recommendation signal only — it does not change the apply-time `promote` flow. Bounded to the already-cross-file rules: a normal single-file fix (one component, no shared-surface edit) emits no `Reach` line.

---

## Phase 4: REPORT

**STOP. Emit the report. Do not edit any files yet.**

**Skip-banner rule (governs all four banners below).** Show a banner only on the run mode where its rule was actually skipped — JSD-14, JSD-16, and the JSA deep-read rules → full-tree only; JSD-05 → single-file `dry` only. Omit it on any run where the rule was in scope and ran. When a rule WAS skipped, its banner is mandatory — never silently omit it; it converts a misleading "clean" into honest coverage disclosure. Each banner is ONE line (per Response style): what was skipped, why, and the command that gets the coverage. On full-tree `architecture` runs, the JSA banner is immediately followed by the **Deep-read triage** block (computed in Phase 3) — the top-3 single-file candidates, each with the signal that drove its rank.

Use this structure verbatim:

```
# Code Audit — {target} ({mode})

**{X HIGH / Y MED / Z LOW, or "Clean"}  →  Recommended: {action}** ({≤12-word why})

## Summary
- Files scanned: N
- Findings: X HIGH / Y MEDIUM / Z LOW
- Rule groups hit: JSP, JSD, JSA (list every group whose rules fired; omit groups with zero findings)

> Skipped: JSD-05 cross-tree promotion scan (single-file mode) — run `/nds-js-audit js dry` to surface promotion candidates across the tree.

> Skipped: JSD-14 sub-shapes (a)(b)(d)(e) (full-tree mode — per-file deep reads; only sub-shape (c) is grep-detectable tree-wide) — run `/nds-js-audit nds-<file>.js dry` for a specific component.

> Skipped: JSD-16 frozen-flag dead code (full-tree mode — needs whole-file scope analysis) — run `/nds-js-audit nds-<file>.js dry` for a specific component.

> Skipped: JSA deep-read rules JSA-03, -07–-12, -14–-16 (full-tree mode — per-file analysis exceeds the full-tree budget) — run `/nds-js-audit nds-<file>.js architecture` for a specific component.
> Deep-read triage (full-tree `architecture` only): 1. `_js/nds-<a>.js` — {driving signals, e.g. "1.9k lines, 31 interaction listeners, ~120-line validateForm"}; 2. `_js/nds-<b>.js` — {…}; 3. `_js/nds-<c>.js` — {…}. Start with `/nds-js-audit nds-<a>.js architecture`.

## HIGH
### _js/nds-alert.js
- L219 [JSP-01] Raw window scroll listener
  Fix: Replace with RAF-throttled handler; store unsubscribe. See _js/nds-scroll-more.js:140-157.

### _js/nds-accordion.js
- L42 [JSD-01] dataset.state assignment clobbers other state tokens
  Fix: Use NDS.State.set/add/clear instead.

## MEDIUM
### _js/nds-foo.js
- L42 [JSA-11] Mixed-concern function over 150 lines interleaves render, state, IO, event-binding
  Type: actionable
  Why it matters: Future edits to one concern carry regression risk in the others.
  Fix: Extract `_render()`, `_persistState()`, `_fetchPayload()`, `_bindEvents()` and keep the outer function as a thin orchestrator.

- L120 [JSA-08] `requestIdleCallback` polyfill runs idle work as a near-immediate macrotask on Safari <18
  Type: tradeoff
  Why it matters: Idle-tier components don't actually defer on older Safari; they run via `setTimeout(1)` with a fake 50ms deadline.
  Proposed solution: replace the `setTimeout(1)` fallback with a `MessageChannel`-based idle shim that estimates a real deadline (pattern at `_js/nds-loader.js` `yieldToBrowser` (~L423-431)).
  Benefit vs cost: [INP + maintainability] LOW benefit — Safari 18 (Sept 2024) ships native rIC, so this only touches shrinking older-Safari traffic, vs [maintainability] the shim adds maintenance surface. Cost > benefit → stay put.
  Rationale for accepting: older-Safari degradation is the documented constraint; the polyfill degrades quietly there.

- L42 [JSA-11] Mixed-concern function over 180 lines wires every per-element listener inline
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
4. `evolve` — apply the surfaced catalog/persona refinement candidates from the `## Catalog evolved — candidates` block (`evolve <RULE>` for one). Only offered when candidates exist; the skill files are untouched until this explicit go.
5. `save` — **optional.** Persist this report to `.claude/audit-reports/` for cross-run comparison (the "Diff vs. Run (N−1)" trail). Not needed to apply fixes or to evolve within this session — see "Saving the report" below.
6. `skip` — end the audit here; nothing is written, nothing is changed.

(Catalog/persona evolution is suggest-only — Phase 7 turns any concrete Gap / Dead-rule / Persona-drift refinement that clears the quality bars into a fully-drafted candidate and appends a `## Catalog evolved — candidates` block to the report. NOTHING is written to the skill files until the user replies `evolve` — concurrent audit sessions share these files, and a mid-run write from one session conflicts with another's run.)

Finer-grained fix filters (type the literal, no number):
- `fix HIGH` / `fix MEDIUM` / `fix LOW` — catalog findings by severity (JSA findings of that severity are included only when `Type: actionable`)
- `fix JSP` / `fix JSD` / `fix JSS` / `fix JSA` — by rule group (`fix JSA` applies every JSA actionable finding regardless of severity; tradeoff findings always skipped)
- `fix <file>` (e.g., `fix _js/nds-alert.js`) — one file only (includes every actionable finding in that file across all four rule groups)
- `fix all then promote <api-name>` — chain a plain fix batch and a promotion application in one session (each still follows its own file-by-file rhythm and user pauses)
```

When emitting the Next Step block at the end of a real report, include only options available for THIS run: omit `promote <api-name>` when there are no JSD-05 promotion candidates; omit `apply solution` when there are no `tradeoff → recommend solving` findings; omit `evolve` when Phase 7 surfaced no candidates; omit `fix all` on a clean run. Renumber so the user never sees a no-op choice.

Follow **Numbered-reply discipline** (see Response style): every available primary action gets a number including the recommended one, renumber to drop no-op options, and literal filter commands (`fix HIGH`, `fix _js/nds-foo.js`) sit below the numbered block.

### Computing the Recommended action

**`save` is never the recommendation.** It is optional and exists for cross-run comparison — not for the work this run enables. Recommend the substantive next step the findings call for; when there is none, recommend `skip` and mention `save` only as the optional way to keep a comparison anchor. Walk top-to-bottom and stop at the first match:

| Run state | Recommended | One-line reason template |
|---|---|---|
| Has "Promotion candidates (JSD-05)" entries | `promote <api>` | "applies the {N} JSD-05 promotion(s) file-by-file with per-candidate approval" |
| Has catalog findings with ≥1 `Type: actionable` (JSA) or any JSP / JSD / JSS finding | `fix all` | "applies the {N} actionable finding(s) file-by-file — narrow with `fix HIGH` / `fix <file>` / `fix JSA`" |
| Has a `tradeoff → recommend solving` finding (any severity) | `apply solution` | "the {N} `recommend solving` tradeoff(s) carry a high-leverage `Proposed solution:` — apply it inline, or `save the plan` for a larger refactor" |
| Phase 7 surfaced refinement candidates AND no findings to act on | `evolve` | "applies the {N} surfaced catalog/persona refinement(s) — skill files stay untouched until you say so" |
| JSA tradeoff-only findings (all plain-accepted), no other findings | `skip` | "the {N} JSA tradeoff finding(s) document deliberate design choices — nothing to apply" |
| Clean run — zero findings | `skip` | "nothing to fix" |

**When several states match, the substantive action wins** the recommendation (promote > fix > solve > evolve), and the no-action rows only fire when no fix/promote/solve/evolve action exists. Phrase the reason in plain language tied to THIS run's numbers.

**Appending the optional `save` nudge.** After the recommendation reason, add a short `save` mention only when it would actually pay off — keep it a clause, never the headline:
- If this run surfaced (or, post-`evolve`, applied) Phase 7 refinements: "; `save` to persist the `## Catalog evolved` record."
- Else if a prior saved run for this scope exists (a same-`{scope}` file in `.claude/audit-reports/`): "; `save` to extend the comparison trail (Diff vs. Run N−1)."
- Else (no prior saved run): "; `save` if you want a baseline to diff future runs against."
Never frame `save` as something the user *should* do — it is the user's call, and skipping it costs nothing within this session (fixes and same-session evolve do not depend on it).

### Saving the report (optional, user-approved)

**What save is for.** A saved report is a comparison artifact, not a requirement. Its payoff is *across* runs: the "Diff vs. Run (N−1)" section that makes multi-run refinement legible. Within a single session, neither applying fixes nor Phase 7 evolve depends on a saved file — same-session evolve aggregates the in-conversation reports directly. So never push `save`; offer it, and let the user decide whether the comparison trail is worth keeping.

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
**Rule catalog version:** {single group e.g. "JSA" | combined e.g. "JSP + JSD + JSS + JSA"} (note any post-evolution refinements: "post-evolution: JSD-03 [400,2000] range, JSS-01 allowlist v3, JSA-11 80-line threshold")
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

## Phase 5: FIX & Phase 6: VERIFY (on explicit fix go — read FIX.md first)

Only entered on an explicit fix instruction (`fix all` / `fix <scope>` / `fix <file>` / `promote <api-name>` / `apply solution` / a Next Step number). **Before applying anything, read `FIX.md` (sibling file) and follow it** — it owns the recognized fix commands, the safety checkpoint, the file-by-file Apply → Rebundle → Agent-review → Per-file-summary rhythm, the JSD-05 promotion flow, out-of-scope modification bounds, the behavior-regression verification table, and the end-of-batch summary. Do not improvise a fix flow from this file alone.

---

## Phase 7: EVOLVE (suggest-only — candidates at run end, applied on explicit `evolve`)

At the end of any run that logged Gap / SKIP / Persona-drift observations — or any full-tree run, which always reconciles persona citation hygiene — **read `EVOLVE.md` (sibling file) and follow it** to turn them into `## Catalog evolved — candidates` entries. A run with none of those observations skips the read entirely. Suggest-only: NOTHING is written to the skill files until the user replies `evolve` / `evolve <RULE>` (Auto-drive pause point 4). EVOLVE.md owns the quality bars, candidate shapes, the concurrent-session merge step, citation hygiene, and the writing guardrails.

---

## Non-goals

This skill deliberately does not cover:

- SCSS *auditing*. Running rules against `.scss` files stays out of scope — refactor blast radius (specificity, nesting, state/variant cascade) and token-family gaps make auditing SCSS automatically too risky. SCSS *editing as part of a JSA fix* (the JSA-15 case: JS work CSS expresses natively) IS supported via Phase 5's cross-file edit carve-out — see "Out-of-scope modifications" in `FIX.md` for the exact bounds. Standalone SCSS refactors outside a JSA-routed fix stay manual against the conventions in `CLAUDE.md`.
- Documentation page audits — use `nds-doc`.
- Icon, placeholder-text, or sidemenu coverage.
- `_data/content/` YAML demo data.
- UX copy, hero descriptions, or visual design review.
- Replacing eslint. No lint config is authored; the rules are NDS-specific conventions enforced through an agent loop.
- Profiler-driven *detection*. The JSP/JSA catalogs are static-read heuristics — they surface candidates, not hotspots, and don't replace a DevTools Performance / Lighthouse pass. (The Phase 6 perf *verification* is different: a bounded before/after measurement of one applied fix, not a profiler sweep.)
- Including `_js/nds-core.js` or `_js/nds-loader.js` in full-tree `js` runs. Single-file audits on either ARE supported — see the "Excluded files" carve-out in Phase 1.
- Running `bundle exec jekyll build` unless the user explicitly asks. `ruby _plugins/js_processor.rb` runs automatically per-file in Phase 5/6, and the Phase 6 Puppeteer test MAY start/reuse `bundle exec jekyll serve` (port 4002) — see `PUPPETEER.md`.
- Editing files outside the Phase 5 / Phase 7 / audit-reports paths. Phase 5 edits `_js/nds-*.js`, plus `_js/nds-loader.js` / `_js/nds-core.js` only when a finding's `Fix:` routes there (JSA-05 registry edits; `promote <api-name>` candidates), plus `_sass/**/*.scss` only when a JSA finding's `Fix:` routes there (JSA-15 CSS-subsume migrations — see `FIX.md` → "Out-of-scope modifications" for the bounds). Phase 7 edits this `SKILL.md`, the `RULES-*.md` group files, and `PERSONA.md` only on an explicit `evolve` go. Phase 4 `save` writes (never overwrites) reports in `.claude/audit-reports/`. Nothing else.
